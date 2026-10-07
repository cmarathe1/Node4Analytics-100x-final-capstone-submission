import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const git = (...args) => execFileSync('git', ['-c', 'core.excludesFile=', ...args], { cwd: root, encoding: 'utf8' });
const files = [...new Set(git('ls-files', '--cached', '--others', '--exclude-standard', '-z').split('\0').filter(Boolean))];
const published = new Set(files);
const failures = [];
let documents = 0;
let links = 0;

for (const file of files.filter((name) => name.endsWith('.md'))) {
  if (!existsSync(path.join(root, file))) {
    failures.push(`${file}: staged file is missing from the working tree`);
    continue;
  }
  documents += 1;
  const text = readFileSync(path.join(root, file), 'utf8');
  for (const match of text.matchAll(/!?\[[^\]]*\]\(([^)]+)\)/g)) {
    const url = match[1].trim();
    if (/^(?:[a-z][a-z\d+.-]*:|#)/i.test(url)) continue;
    links += 1;
    const target = decodeURIComponent(url.split('#')[0].replace(/^<|>$/g, ''));
    const resolved = path.resolve(root, path.dirname(file), target);
    const relative = path.relative(root, resolved).split(path.sep).join('/');
    const included = published.has(relative) || files.some((name) => name.startsWith(`${relative}/`));
    if (!existsSync(resolved) || !included) failures.push(`${file}: unpublished link ${url}`);
  }
}

const localOnly = [
  'frontend/.env.local', 'frontend/node_modules/example.js', 'frontend/.next/cache/example',
  '.claude/settings.local.json', 'CLAUDE.md.bak', 'data/seed/example.pdf',
  'docs/prototype-update/work/example.html', 'docs/prototype-update/tools/__pycache__/example.pyc',
];
for (const file of localOnly) {
  try { git('check-ignore', '--no-index', '-q', file); }
  catch { failures.push(`local-only path is not ignored: ${file}`); }
}

for (const file of files) {
  if (/(?:^|\/)(?:node_modules|\.next|__pycache__)\/|\.pdf$|\.crdownload$|\.bak$|(?:^|\/)\.env(?!\.example$)/.test(file)) {
    failures.push(`local-only artifact in publication set: ${file}`);
  }
}

const env = readFileSync(path.join(root, 'frontend/.env.example'), 'utf8');
if (/^NEXT_PUBLIC_POSTHOG_KEY=\S+/m.test(env)) failures.push('example analytics key must be blank');
const pkg = JSON.parse(readFileSync(path.join(root, 'frontend/package.json'), 'utf8'));
const lock = JSON.parse(readFileSync(path.join(root, 'frontend/package-lock.json'), 'utf8'));
if (pkg.name !== lock.name || pkg.name !== lock.packages[''].name) failures.push('package/lockfile names differ');

console.log(`Repository: ${documents} Markdown files, ${links} local links, ${localOnly.length} ignore checks`);
if (failures.length) {
  console.error(failures.join('\n'));
  console.error(`FAIL: ${failures.length} findings`);
  process.exitCode = 1;
} else {
  console.log('PASS: linked files are published, local artifacts are excluded, package metadata agrees');
}
