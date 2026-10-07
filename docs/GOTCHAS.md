# N4A — Gotchas (hard-won environment & runtime traps)

> **Repository scope · 2026-10-07:** This is a broader-product research or historical development record. Features, commands, evaluation counts, prices, and status below retain their original context; they are not verification of the landing page included here. Some referenced services, ADRs, source PDFs, and prototypes are not distributed in this repository. See the [documentation guide](README.md) for current scope.

> **status:** live · **authoritative for:** environment, toolchain and runtime traps that cost real
> debugging time and are invisible to a green test suite · **last verified:** 2026-09-25.

> Non-obvious *environment / toolchain / runtime* traps this repo has hit, with the fix and *why*. Pulled
> out of `AGENTS.md` (ADR 0032) so the ground rules stay lean and load light every session — but keep
> this reachable, because each cost real debugging time and is invisible to a green test suite. Add to it
> whenever a new trap bites. (Operational "how to work" rules — verify-card authoring, `uv run`, secrets —
> stay in `AGENTS.md`; this file is environment traps only.)

## Toolchain / build

1. **Extensionless imports for internal TS packages.** Workspace packages are consumed by Next *from
   source* via `transpilePackages` — use extensionless relative imports (`./graph`, not `./graph.js`), or
   Next's webpack can't resolve them.
2. **pnpm 10 blocks native build scripts by default.** Allowlist them in root `package.json`
   `pnpm.onlyBuiltDependencies` (currently `esbuild`, `sharp`, `lefthook`).
3. **Prettier governs code, not the authored Markdown docs** (`**/*.md` is in `.prettierignore`). Don't
   expect `format:check` to touch docs.
4. **ruff's 100-col limit covers Python comments, docstrings, AND string/prompt literals** — and `ruff
   format` does **not** reflow any of them. Wrap them ≤100 cols *as you type*; this bites hardest in
   multi-line prompt f-strings and big seed-data rewrites (ss6 needed a ~32-line E501 cleanup pass). Split
   a long literal into adjacent `"…" "…"` pieces; keep each comment/docstring line short from the start.
4b. **Never run `pnpm build` while `pnpm dev` is serving.** Both write to the same `apps/web/.next`
   directory: the production build clobbers the dev server's asset state, and the live site keeps
   serving HTML whose CSS/JS chunk URLs no longer exist — pages render as raw unstyled HTML while
   still returning 200 (a curl on the page looks "fine"; only fetching the stylesheet reveals it).
   Bit the Dashboard-S3 check run (2026-07-06). Fix: stop dev, `rm -rf apps/web/.next`, restart
   `pnpm dev`. If a check suite must run `pnpm build`, stop the dev server first (or accept the
   restart after). **Or build without stopping it (2026-09-17, rung 11a sign-off):** build a
   scratch WORKTREE of the tree you are about to commit — `git worktree add --detach <scratch> HEAD`,
   `git diff HEAD --binary | git -C <scratch> apply`, copy the untracked files across
   (`git ls-files --others --exclude-standard | tar -cf - -T - | tar -xf - -C <scratch>`), then
   `pnpm install --frozen-lockfile --offline` (~15 s from the pnpm store) and `pnpm build` (~1 min).
   Its `.next` is its own. **Delete it with `cmd /c rmdir /s /q "\\?\<scratch>"` then `git worktree
   prune`** — `git worktree remove --force` fails with *Filename too long* inside pnpm's nested
   `node_modules`, and `rmdir` unlinks a junction without following it (every link pnpm makes there
   points inside the worktree; check before deleting anything that might not).

## Frontend / contract seam

4c. **Pydantic `X | None` fields need Zod `.nullish()`, never `.optional()`.** FastAPI serializes an
   unset optional as an explicit `"field": null`; `.optional()` accepts only *undefined*, so the
   whole `parse()` throws and React Query reports a generic error. Bit twice: the Library DTO era,
   then C6's `WorkbookCell.b` — the excel grid showed "Couldn't load this sheet — is the AI service
   running?" while the endpoint was returning perfect JSON. When a query errors but `curl` looks
   fine, suspect the Zod schema before the network. *(learned C6 verify)*
4d. **Unlayered vendor CSS beats every `@layer` rule, regardless of specificity.** Our globals live
   in `@layer components`, but `@xyflow/react/dist/style.css` is imported unlayered — so any
   property xyflow *also* sets (e.g. `.react-flow__edge { cursor }`) silently wins over ours, no
   matter how specific our selector is. Overrides of properties a vendor stylesheet also sets must
   go in the **unlayered block at the end of `globals.css`**. Rules setting properties the vendor
   doesn't set (colors on RF vars, sizes) are fine inside the layer — which is why only the
   scissors cursor was visibly lost. *(learned C6 verify)*

## Runtime (Windows)

5. **Launch the AI service via `python -m app`, never bare `uvicorn app.main:app`.** uvicorn 0.49
   hardcodes a `ProactorEventLoop` for the single-process case (`asyncio.run(loop_factory=...)` overrides
   any event-loop *policy*, including `app/__init__.py`'s), which psycopg's async ingest pool (ADR 0026)
   can't use: a batch upload 202s, then the background orchestrator silently dies with `PoolTimeout`.
   `--reload` was never affected (its worker already runs on a Selector loop) — which is why this stayed
   invisible until H2 made the async batch path the sole, UI-invoked upload route. `pnpm dev:ai` already
   runs the right command. *(learned H2)*
6. **pytest temp-dir `PermissionError`** (`%LOCALAPPDATA%\Temp\pytest-of-*`): pass `--basetemp=<a
   writable scratch dir>` to `uv run pytest` when it happens — and keep that path **SHORT**
   (e.g. `%LOCALAPPDATA%\Temp\n4a-pt`). A deeply nested basetemp makes the LibreOffice-gated
   Excel tests fail with an empty "recalc failed" warning: `soffice --convert-to` silently
   chokes on long Windows paths, which reads like a code regression but is only the temp dir.
   *(learned C8b checks)*
7. **Excel formulas render as text until LibreOffice is installed** — openpyxl cannot compute and
   *saving* discards any cached values, so without the engine every workbook surface (node preview,
   context projection, `recalc_and_read` — which isn't even registered) shows `=B4*(1+$B$1)` instead
   of numbers, honestly labelled `engine: "cached"`. Install with
   `winget install TheDocumentFoundation.LibreOffice`; detection order is `N4A_SOFFICE_PATH` → PATH →
   the standard install dirs (`app/canvas/excel/recalc.py`), cached per process — **restart `pnpm
   dev:ai` after installing**. Files saved before the install self-heal on their next preview read
   (`heal_cached_file`). *(learned C-tools user verify)*
8. **A CLI whose output contains non-cp1252 characters crashes on the stock Windows console** with
   `UnicodeEncodeError: 'charmap' codec can't encode character …`. The docs are full of `∥`, `→`,
   `·`, `–`, and the 1D locator grammar puts `·` in ordinary output, so this is not exotic: as of 1D,
   `uv run python -m app.ingestion.cli --help` dies on the `∥` in its own help text. Prefix with
   **`PYTHONIOENCODING=utf-8`** (the eval CLI already self-installs a UTF-8 stdout via
   `_force_utf8_stdout()` — other entry points do not). Worth remembering when writing a **verify
   card**: a command that works in your shell can fail in the user's. *(learned 1D verification)*

## Database / schema

8. **Endpoints polled during ingest must use `db.ensure_schema`, not `apply_schema`.** Any endpoint the
   frontend polls while ingesting (`GET /documents`, `GET /graph`) must use `db.ensure_schema`
   (process-idempotent). `apply_schema` re-runs the full DDL every call, and the DDL's
   `AccessExclusiveLock` deadlocks against the parallel pipeline's concurrent document/chunk writes under
   realistic ~1.5s polling. `apply_schema` stays authoritative at startup and in CLIs/tests. *(learned H2)*

9. **Never run two `pytest` processes against the one Postgres — the `DeadlockDetected` looks like a
   code bug.** The DB-guarded suites each `apply_schema` and seed spines, so a second concurrent run
   (e.g. a backgrounded full suite while you re-run one file) deadlocks FK ShareLocks against
   RowExclusiveLocks and fails *unrelated, previously-green* tests. The error names two backend PIDs,
   not two tests, so it reads as a fresh concurrency defect in whatever you just wrote. Let the
   background run finish, then re-run — identical code passes. *(learned 1F-2)*

   **It is not only pytest, and a "read-only" command is not exempt.** At the rung-10b sign-off a
   `backfill --rebuild` **dry run** — which writes nothing — was launched beside a backgrounded full
   suite and took down `test_health` and two `test_parallel` tests with `DeadlockDetected`. The dry
   run still opens a transaction and takes locks while `apply_schema` is running in the other
   process. Three failures, ten minutes to disprove, and the same three pass in isolation. **While a
   suite is running, touch the store with nothing at all** — not a probe, not a dry run, not a
   one-off query. *(re-learned 2026-09-12)* **Nor a browser layout script** — it drives `:8000`,
   which reads and writes the same store: at the 09-30 sign-off `verify-*-layout.mjs` beside the
   sharded suite deadlocked 4 store tests and doubled its time (208 → 459 s). *(re-learned 2026-09-30)*

10. **The async ingestion pool must use `autocommit=True`.** A plain psycopg connection opens an
    implicit transaction on the first read. If that checkout then performs source identification or
    model extraction, every `running` stage and run receipt remains invisible until minutes of provider
    work finishes, the connection stays pinned, and timestamps collapse to the final commit — the UI
    looks stuck on Reading and then jumps straight to Partial. `create_pool()` sets autocommit; use
    explicit `conn.transaction()` for the short atomic run/swap sections. **Restart `pnpm dev:ai` after
    changing this policy** because existing pooled connections retain their original setting.
    *(learned 1F-4 manual verification)*

## Provider SDKs

9. **Every OpenAI reasoning tier has its OWN `reasoning_effort` scale and tool-calling rules — verify
   live before trusting a new tier, never assume the last tier's params carry over.** `gpt-5*` accepts
   `reasoning_effort="minimal"` (needed or the completion budget burns on hidden reasoning and returns
   empty text); the `gpt-5.4*`/`gpt-5.6*` tiers **reject** `"minimal"` (400) and only take
   `none`/`low`/…/`xhigh` — AND on `/v1/chat/completions` they refuse function tools at any effort
   except `'none'`. The second bug meant the already-registered `gpt-5.4-mini` 400'd on **every**
   tool-calling call from the moment it was added (C6) until the C7 live probe stepped onto that tier
   and caught it — 340+ green tests never touched it because nothing offline exercises a real
   reasoning-tier API call. Fix lives in `app/llm/chat.py::OpenAIChatProvider._params` (a `for_tools`
   flag). *(learned C7 live probe; escalation discipline that surfaced it is ADR 0037.)*

10. **`schema.sql` re-adds some CHECK constraints lower in the file — widening an enum in the
    `CREATE TABLE` alone silently does nothing on an existing DB, and adding a NEW
    drop-if-exists/re-add higher up gets overridden by the OLD one below.** The file has
    per-constraint `DROP CONSTRAINT IF EXISTS … ADD CONSTRAINT …` migration blocks (e.g.
    `canvas_nodes_type_check`, `artifacts_kind_check`); the LAST such block in file order wins.
    When a contract enum grows (node types, artifact kinds, authority tiers): grep the constraint
    name and widen the EXISTING re-add block. All unit tests stay green either way — only a live
    `PUT` against a real DB hits the stale constraint (500 `CheckViolation`). *(learned C8c: the
    new `section` node type validated fine and then 500'd on insert.)*

11. **A CORPUS BACKFILL needs a different retry budget than interactive use — the defaults die on a
    429 storm.** `app/llm/retry.py` correctly classifies 429 as transient, but the defaults
    (`llm_retry_max_attempts=3`, base 0.5s, cap 8s) are tuned for a transient blip. A bulk re-ingest
    saturates a **tokens**-per-minute ceiling for minutes at a time, so all three attempts land
    inside the same exhausted window and the document dies mid-pipeline, leaving rows stuck in
    `processing`. `--parallel` makes it worse: it is `ingest_max_concurrent_docs` (4) x
    `llm_max_concurrency` (10). For a backfill over annual reports, throttle AND lengthen:
    ```
    LLM_MAX_CONCURRENCY=2 INGEST_MAX_CONCURRENT_DOCS=1     LLM_RETRY_MAX_ATTEMPTS=10 LLM_RETRY_BASE_DELAY_SECONDS=6 LLM_RETRY_MAX_DELAY_SECONDS=75     uv run python -m app.ingestion.cli --seed-dir "<dir>" --workspace <ws> --to-db --embed --parallel
    ```
    Do **not** raise the defaults to fix this — they are right for interactive use; the backfill is
    the special case. A failed run leaves a partial workspace, so purge before retrying rather than
    re-running on top.

    **And run NOTHING else against the DB while a backfill is in flight.** `pytest` and every eval
    entry point call `apply_schema`, which takes `AccessExclusiveLock`s; the ingest holds
    `AccessShareLock`s on the same tables. That is the deadlock in #6/#7 wearing different clothes,
    and Postgres kills the *ingest*, leaving a document `error` and the rest never started:
    ```
    Process A waits for AccessShareLock on relation X; blocked by process B.
    Process B waits for AccessExclusiveLock on relation Y; blocked by process A.
    ```
    A purge scoped to ONE workspace is worth writing rather than reusing a broader one — a
    successfully-rebuilt workspace must not be collateral damage on the retry.
    *(learned rung 3, 2026-08-11, re-ingesting both foundation workspaces — both traps hit.)*

12. **Never name a module `layout.ts` (or any App Router reserved name: `page`, `layout`, `route`,
    `loading`, `error`, `template`, `default`) inside an `apps/web/app/**` route directory.**
    Next.js treats it as the route's layout component regardless of its exports — `pnpm dev`,
    typecheck, lint and vitest all pass; only `pnpm build` fails, with a misleading type error
    about the default export. Canvas's alignment-snap module lives in `snap.ts` (its layout-ish
    predecessor `tidy.ts` hit this first) for exactly this reason. *(learned C8c.)*

13. **A single-class CSS override of an @xyflow rule loses by import order, silently.**
    `@xyflow/react/dist/style.css` is imported by the canvas COMPONENT, so it lands *after*
    `globals.css` in the bundle; a same-specificity selector (e.g. `.canvas-mm-source { fill }`
    vs xyflow's `.react-flow__minimap-node { fill }`) then loses the tie with zero warning —
    the minimap rendered all-gray while every token was "correctly" declared. Being in
    globals.css's unlayered block is NOT enough — that only settles the @layer contest, not the
    order-of-appearance tiebreak. Scope such overrides under a parent class
    (`.canvas-minimap .canvas-mm-*`) so specificity, not order, decides.
    *(learned C8c-fix: the minimap colors.)*

## Document generation (PyMuPDF)

14. **`pymupdf.Story` silently substitutes a fallback font — and corrupts the text — if
    `user_css` references a `font-family` with no matching `@font-face`.** Building a text-layer
    PDF (e.g. a corpus witness) with `user_css="* { font-family: News; }"` but no
    `@font-face { font-family: News; src: url(...) }` produces a perfectly normal-looking
    3-page PDF — but MuPDF's default font (a) has no ₹ glyph and (b) applies `fi`/`ff`/`fl`
    GSUB ligatures, so "Jefferies" extracts back as "Jeﬀeries" and "office" as "oﬃce." Neither
    error throws; both are invisible until you extract the text and diff it against the source.
    Fix: always pair a `pymupdf.Archive()`-embedded TTF with the matching `@font-face` rule, and
    add `font-variant-ligatures: none` for belt-and-braces. **Verify by round-tripping the exact
    generated file through the real parse path** (not a fresh isolated snippet — an isolated
    repro that happens to include the `@font-face` line will pass while the generator's actual
    CSS, missing it, still corrupts). *(learned 1F-0: the two news-quotation witness PDFs.)*

## Forcing UTF-8 stdout must happen BEFORE `parse_args`, not after

Windows consoles default to cp1252 and these CLIs print `·`, `→` and `₹`. Every CLI already calls
`_force_utf8_stdout()` — but three of them (`app.graph.harvest`, `app.graph.cli`,
`app.retrieval.cli`) called it on the line AFTER `parser.parse_args(...)`. argparse prints `--help`
*during* parsing, so the most basic discoverability action on the project's own platform died with:

```
UnicodeEncodeError: 'charmap' codec can't encode character '→'
```

The command itself worked; only `--help` crashed, which is why it survived so long — nothing in the
test suite runs a CLI's help. Fixed 2026-07-25 by moving the call to the first statement of `main()`
in all three. If you add a CLI, put `_force_utf8_stdout()` above `parse_args`, and remember that a
green test suite will not catch this one.

---

13. **A pytest run reports GREEN while silently losing 127 tests, because the DB container went
    away.** The DB-backed tests `pytest.skip("Postgres not reachable")` per fixture, so a run with
    the container down exits **0** and prints `1043 passed, 127 skipped` — a green that covered
    none of the store. Two ways to land there, both hit on 2026-08-18: **Docker Desktop being
    running is not the container being running** (`docker compose -f infra/docker-compose.yml up -d`
    is a separate step), and a container that was up **exited mid-run** (`docker ps -a` showed
    `Exited (0)` afterwards), so the same suite skipped what it had executed an hour earlier.

    The tell is the **skip count and the wall clock**, not the exit code: with Postgres up the suite
    is **1171 passed / 0 skipped in ~3.5 min**; without it, **~127 skips in ~13 min** (the DB tests
    are the fast ones; the parse-heavy tests dominate when they are all that runs). A 4× slower run
    that "passes" is the signal. Check `database_available()` *after* a long run, not just before —
    and never quote a pass count without its skip count beside it.

## Authoring tool: a bash heredoc is the wrong tool for prose and regexes

Writing repo prose (an ADR, a docstring, a test with real sentences) through a `bash` heredoc fails
in two ways that both look like the *content* is wrong when the **transport** is:

- **Quoted heredoc + em-dashes/arrows/`·`** — the shell can still choke on the payload and report
  `unexpected EOF while looking for matching '` on a line that is plainly balanced. It cost three
  restarts on ADR 0079 and again on `test_finding_projection.py`.
- **Escapes are eaten.** A regex written into a heredoc arrives with `\w` → `w`, so a router pattern
  silently stopped matching. Python then warns `SyntaxWarning: invalid escape sequence '\w'` — that
  warning is the tell, and it is easy to scroll past.

**Use the `Write` / `Edit` tools for any file containing prose, punctuation beyond ASCII, or regex
escapes.** Reserve heredocs for short, ASCII-only, escape-free scripts. The failure mode is
expensive precisely because the file *looks* right afterwards.

**First choice, always (revised 2026-09-24): the `Edit` tool.** It never passes through a shell, so
none of the traps above apply, and it already fails loudly when its anchor does not match. The
patch-script shape below became a habit for EVERY multi-line edit: measured over a month, **~40% of
all characters the agent wrote were scratchpad patch scripts** — each carrying the old AND the new
text as output, at output-token prices, plus a run and often a re-run. Use a script only for a
**bulk, mechanical change across many files or many sites** (a verbatim move, a rename sweep).

**The bulk shape, 2026-09-21: write the PATCH SCRIPT to the scratchpad with `Write`, then run
it.** A bulk multi-site edit is a Python string-replacement script, and every
attempt to inline that script in a heredoc hits one of the three traps above — this session lost
four round trips to a single apostrophe (`Infosys'` inside a `'''…'''` block closed the shell
quote). The shape that works every time:

```bash
# Write tool → <scratchpad>/patch_<thing>.py, containing:
#   p = pathlib.Path("app/…"); s = p.read_text(encoding="utf-8")
#   def sub(old, new):  assert old in s, old[:80];  …        ← the assert is the whole point
#   p.write_text(s, encoding="utf-8", newline="")            ← newline="" keeps LF (GOTCHAS #13)
python "$LOCALAPPDATA/Temp/claude/…/scratchpad/patch_thing.py"
```

Three properties the heredoc route does not have: the **`assert old in s`** turns a silent no-op
into a loud failure (a `str.replace` that matches nothing writes the file unchanged and reports
success); the script is **re-runnable** after you fix one failed anchor, instead of re-typing the
whole payload; and nothing passes through the shell, so apostrophes, em-dashes and `\w` arrive
intact. Two corollaries learned the same day: put the `write_text` AFTER every `sub`, so a failed
anchor aborts before touching the file, and expect anchors to go stale — `ruff format` reflows the
code you are patching, so an anchor copied from before a format run will not match.

**Third variant, 2026-08-30: `\n` inside a QUOTED heredoc still reached Python as a real newline**,
which split a `print("…")` across two physical lines and left an unterminated string literal. The
file looked plausible on `sed -n`, and the tell was `ruff format` reporting *"missing closing quote
in string literal"* — followed by **30 cascading errors** in a file with one real defect, because a
parse failure poisons every downstream rule. So: after any heredoc-authored edit to a `.py` file,
run `uv run ruff check` on it before trusting the change, and read the FIRST error rather than the
count. Escaping the escape (`\\n`) is not a fix — it is another guess about how many layers will
eat it. Write the script to a file with `Write` and run it by path; the two minutes it costs are
cheaper than one mangled patch.

**Fourth variant, 2026-08-31, and the nastiest: it can fail with NO error at all.** A quoted
heredoc carrying `b.replace(b"\x08", b"\\b")` reached Python with the escape eaten, so the
replacement string was a literal backspace and `replace` swapped a byte for itself — valid Python,
exit 0, file byte-identical. The three earlier variants at least announced themselves through
`ruff` or a `SyntaxWarning`; this one produced a clean run and an unchanged file, and the only tell
was that the printed length had not moved. So when a heredoc-authored edit reports success and the
thing it was supposed to change is still there, **suspect the escape before the logic**, and check
`len(before) != len(after)` rather than re-reading and re-running the same script. The reliable fix
is the same one: `Write` the script to a file. (Found while removing a literal backspace from
`LESSONS.md` — a line that exists to warn about literal backspaces.)

**Fifth variant, 2026-09-04 — and it is `python -c`, NOT the heredoc.** The four above all indict
heredocs; this one exonerates them and indicts the alternative people reach for instead. A quoted
heredoc carrying `·` and `—` round-trips those bytes correctly. The same literal passed as
`python -c "...'> **last verified:** 2026-08-02.'..."` does **not**: the argument crosses the
Windows console codepage on its way into the process, `·` arrives mangled, and the `assert old in t`
fails on a string that is character-for-character correct in the file. The tell is a failure message
whose own `repr()` output is mojibake (`# N4A ? Roadmap`) — the diagnostic is being corrupted by the
same layer as the input, so it looks like the file is wrong when it is the argument. **Rule:
`python -c` is for ASCII only.** Anything carrying `·`, `—`, `§`, `→` or `₹` — which is most prose
in this repo — goes in a quoted heredoc or a `Write`-authored file, where the bytes are read from a
UTF-8 file rather than parsed off a command line.

---

## A `cd` in one Bash call does not persist the way you expect — and a wrong-directory grep is SILENT

The working directory carries between calls, so a `cd services/ai` in one command leaves the *next*
command there too — and repo-root-relative paths then resolve to nothing. That is a nuisance for
`sed`, but it is a **correctness hazard for `grep -r`**: searching a directory that does not exist
prints nothing and can exit quietly, which is **byte-identical to "the string is not present."**

Live incident (2026-08-30, rung-6 progress routine): `grep -rn "506" docs/` was run from
`services/ai`, returned nothing, and was very nearly recorded as *"the stale count is already
fixed."* It was not — `docs/decisions/README.md` still carried it, and re-running from the repo root
found it immediately.

**Prefer the `Grep` tool** (it takes an absolute `path` and cannot silently miss), or pass an
explicit absolute/`../..`-anchored path. When a repo-wide grep comes back empty, treat *"did I
search the right root?"* as the first hypothesis, not the last — an absent result should be proven,
never assumed.

## #12 — A pytest run KILLED mid-flight poisons the next one (2026-08-31)

**Symptom.** `tests/test_canvas.py::test_delete_canvas_endpoint_cascades_and_reaps` fails with
`422 … already belongs to another canvas`, reproducibly, alone and in its file — and the same test
passed an hour earlier on the same code. Stashing every local change does not fix it, which is what
makes it look like a pre-existing defect rather than an environment one.

**Cause.** The suite shares one Postgres (GOTCHAS #11 covers *concurrent* runs; this is the sibling
hazard). Tests clean up in teardown, so a run interrupted by Ctrl-C or a task kill leaves its
`ws-test-*` rows behind, and the reference-count guard in `routers/canvas.py` then refuses a
workbook that still belongs to the abandoned canvas.

**Be precise about which row matters** — measured, because the first version of this entry was not.
A clean run leaks **workbooks** too (six, on the 2026-08-31 run that exited 0), and those are
**harmless**: `test_canvas.py` passes 30/30 with them present. It is the orphaned **canvas** — one
was left titled *"Keeper"* — that binds a workbook and trips the guard. So the fix targets canvases
first:

```sql
DELETE FROM canvases  WHERE workspace_id LIKE 'ws-test%';   -- the one that actually breaks a run
DELETE FROM workbooks WHERE workspace_id LIKE 'ws-test%';   -- tidiness; harmless on its own
```

**The habit that avoids it.** Let a suite finish, or clean up after killing one. And when a test
fails "pre-existing", **check the STORE before believing it**: stashing the diff proves the code is
innocent, not that the environment is. That half-ruled-out conclusion is one step from a confident
and wrong "not my regression".

## #13 — Python's `write_text` rewrites the file to CRLF, and three different things break (2026-09-05)

`pathlib.Path.write_text(s)` on Windows opens in text mode, so **every `\n` becomes `\r\n`** — even
when the string came from `read_text()` on an LF file moments earlier. Rung 9's patch scripts used it
throughout and it cost time in three unrelated-looking ways:

1. **A byte budget you cannot hit.** `len(s.encode("utf-8"))` reported 8,188 while `test_docs_drift`
   stat'd 8,319 on disk — one extra byte per line. Eight shave-and-recheck passes on an ADR that was
   already small enough. (`n4a-progress` §2a already says *measure the bytes the GATE measures*; this
   is **why** the two numbers differ.)
2. **Fourteen tracked files silently converted** — and left unswept they COMPOUND: the rung-10
   sign-off found **103**, because each later `write_text` adds to a pile nobody normalised. The
   repo is LF. `git diff` looked normal, but
   `git add` printed `warning: CRLF will be replaced by LF` for every one, and a whole-file ending
   change is the kind of diff that hides a real hunk inside it.
3. **A patch script whose own anchors stopped matching.** A script written LF, then *edited* by a
   second `write_text`, has CRLF inside its multi-line anchor strings — which then never match the
   LF file it is patching. The error reads `anchor not found` and sends you hunting for a typo in
   text that is character-for-character correct.

**Use `write_bytes(s.encode("utf-8"))`, never `write_text`,** for anything in this repo — and after a
scripted doc pass, sweep:

```bash
python -c "
import pathlib, subprocess
# -com: tracked AND untracked. `git diff --name-only` misses a file that is ALREADY CRLF in HEAD
# and unmodified — which is how one session's fourteen files became the next session's 103.
files = subprocess.run(['git','ls-files','-com','--exclude-standard'],
                       capture_output=True,text=True).stdout.split()
for f in files:
    p = pathlib.Path(f)
    if p.is_file() and b'\r\n' in p.read_bytes():
        p.write_bytes(p.read_bytes().replace(b'\r\n', b'\n')); print('normalised', f)
"
```

Confirm sizes with `ls -l`, never with an encode count.

---

## #14 — There is no workspace picker in the app, and every Block L verify step needs one (2026-09-08)

`useWorkspaceId()` returns `null` with **no default**, deliberately (rung 8): a silent fallback onto
`ws-demo` drew a plausible grid over the pre-rung-4 eleven-role ontology with nothing on screen
saying so. The surface that *would* let you choose a workspace is Block P's platform layer — and
**Block P was built in `N4A-Prototype.html`, not in React** (ADR 0069–0075, commit `102c2ef`).

So `/library`, `/graph`, `/evidence` and `/market` are all reachable **only** by hand-typing
`?workspaceId=ws-infosys-foundation` (or `ws-hdfc-foundation`, or `ws-icici-foundation` — the third
issuer). A page opened without it is not broken; it is correctly refusing to guess.

Two consequences, both of which have bitten before in other forms:

- **Every "Verify this slice" card in Block L must print the full URL**, not the route. `LESSONS.md`
  §6 already says to use the real workspace id; this is why it is not optional here.
- **Never verify on `ws-demo`** — but not for the reason this entry first gave.

  > **Corrected 2026-09-11 (rung 10a).** It said `ws-demo` "holds nine issuers, so it is a
  > *mixed-issuer* workspace" and that the grid refuses it with a 503. **Measured: it holds FOUR
  > documents, all filed by HDFC Bank.** One filer, so `resolve_company` resolves it cleanly,
  > `/market/context` prices it and `/evidence` draws a grid. The nine-issuer number is the entity
  > SPINE (78 entity rows), which is a different thing from who FILES — exactly the distinction
  > `filing_issuers` exists to make. A doc that contradicts the code is a bug in the doc.

  The real hazard is the one `SESSION.md` states: `ws-demo` still carries the pre-rung-4 **eleven**
  analytical roles, where every real workspace carries sixteen (`default_axes` reports `roles=11`
  against `roles=16`). So it renders a perfectly plausible brief over a vocabulary the product
  retired, and nothing on screen says so. That is worse than a refusal, because a refusal is
  visible.

---

## #15 — Zustand `persist` has no `.persist` API where there is no storage, and that includes SSR (2026-09-11)

> **Superseded the same day (ADR 0107 D1).** The guard below patched a symptom. Binding the store
> during render was itself the defect — it raised React's *"Cannot update a component (`AskPanel`)
> while rendering a different component (`Brief`)"* when an analyst crossed Library ↔ Graph
> mid-upload — and swapping one store's identity between workspaces also DROPPED in-flight answers.
> The chat store is now keyed BY workspace, hydrates in an effect, and uses no `persist` middleware,
> so this trap no longer exists in this codebase. The entry stays because it still exists in
> zustand: any store that calls `persist`'s API during render, or where storage is blocked, meets it.

**Symptom.** `/library` answers **HTTP 200**, `pnpm build` passes, `tsc` passes, 213 vitest tests
pass — and the page's server HTML contains none of the document. The only evidence is one line in
the dev server's log: `TypeError: Cannot read properties of undefined (reading 'setOptions')`.

**Cause.** `persist` resolves its storage when the middleware is **created**, i.e. at module import.
Finding no `localStorage`, it logs a warning and returns the **unmodified** store — so
`useChatStore.persist` is `undefined`, not a no-op object. Any `useChatStore.persist.setOptions(…)`
or `.rehydrate()` is then a `TypeError`. Rung 10a binds the chat store to a workspace **during
render** (deliberately — an effect runs after paint, which would show one frame of the previous
company's transcript), and render happens on the server too.

**Fix.** Guard on `useChatStore.persist === undefined`, **not** on `typeof window`. The same
condition is reachable in a real browser with site data blocked, so a window check fixes half of it:

```ts
if (typeof window === "undefined" || useChatStore.persist === undefined) return;
```

**Why it is worth an entry.** Nothing in the automated suite could see it. A React error thrown
inside a `<Suspense>` boundary during SSR does not fail the request — Next serves the shell and the
client re-renders, so the page *works* for a human clicking around and is empty to anything reading
the response. The chat store it bit was deleted at rung 16 (the Graph's Ask keeps a session store
with no `persist`); the lesson stands for any persisted store, because what caught it was a person
opening a page.

---

## #16 — A Next dev server that has been hot-edited all session serves 500s that are not yours (2026-09-11)

**Symptom.** One route returns **500** while every other route on the same server returns 200, and
the log shows `Could not find the module "…/next-devtools/…/segment-explorer-node.js#SegmentViewNode"
in the React Client Manifest` followed by `TypeError: __webpack_modules__[moduleId] is not a
function`. Neither message names any file of yours.

**Cause.** Next's dev bundler cache, not the app. It accumulates after a long session of edits —
especially file *deletions* and moves, which is what a surface migration is made of. Caught while
smoke-testing rung 10a: `/library?workspaceId=ws-demo` 500'd and every other workspace on the same
route was fine, which looks exactly like a workspace-specific defect in the page.

**Fix.** Stop the dev server, `rm -rf apps/web/.next`, restart. All eight routes then returned 200
with zero errors in the log, on unchanged code.

**The order matters, and it was broken the same day.** Deleting `.next` while a dev server is still
RUNNING on it does not reset the cache — it turns every route into a 500, and touching a source file
to force a recompile does not bring it back. It happened while smoke-testing the rung-10a audit fixes
against a `pnpm dev` the user had started in their own terminal. Check what owns the port first
(`Get-NetTCPConnection -LocalPort 3000`), and if the server is not yours, ask before touching its
cache — the only repair is a restart.

**Why it is worth an entry.** It mimics a real defect with a per-request shape, and the instinct is
to go looking in the surface. Before debugging any single-route 500 in dev, restart on a clean
`.next` and see whether it survives — and remember that `pnpm build` does **not** share this cache,
so a green build beside a dev 500 is evidence for the cache, not against the defect.

## #17 — `pnpm dev:ai` stops answering after a burst of Python edits, and touching a file does not wake it (2026-09-17)

**Symptom.** Every request to `:8000` hangs — `/health` included — while `pnpm dev` on `:3000`
answers instantly. The Library shows its loading line forever. `netstat -ano | findstr :8000`
shows the port LISTENING on the reloader's pid with a pile of `CLOSE_WAIT` sockets, and the one
worker process under it was spawned at the time of an early edit, long before the latest.

**Cause.** uvicorn's `--reload` on Windows runs the app in a spawned worker. Many saves in quick
succession — a patch script rewriting several modules, then `ruff format` rewriting them again —
left the reloader holding the socket with no worker serving it. Touching a source file afterwards did
not trigger a new worker. Hit while fixing rung 11a's third audit.

**Diagnosed 2026-10-01 (ADR 0147 D5): the saves are the trigger, an OPEN STREAM is the cause.** A
Windows reload sends CTRL_C and then `join()`s the worker with no timeout. Graceful shutdown waits
for every open connection, then awaits `Server.wait_closed()`, which since Python 3.12 waits for
every connection, so even a second CTRL_C cannot free it. The Library's progress stream (SSE) is
open while any document is `processing`. The worker's log says *"Waiting for connections to
close"*. Fixed by `GRACEFUL_SHUTDOWN_S` in `app/__main__.py`, from the next full restart. On a
reloader started before that, end the stuck worker (`Stop-Process -Id <spawn_main pid>`); the
reloader's `join()` returns, and it spawns a fresh worker on the current code.

**Fix.** Restart `pnpm dev:ai` (Ctrl+C, then `pnpm dev:ai`). If the server is not yours, do not
kill it: start a private one — `uv run python -m app --port 8010` in `services/ai` — and point the
page at it. `node scripts/verify-series-layout.mjs --ai http://127.0.0.1:8010` does that by
rewriting the page's API requests in flight, so the running web server needs no restart either.

**Variant: it ANSWERS, with yesterday's code (2026-09-23, rung 13).** A second `pnpm dev:ai` started
beside a stale one does not fail to bind: Windows lets both hold `:8000`, and requests kept reaching
the old worker, spawned hours before the slice's audit changed the wire. No hang this time. Every
door answered 200, and the Timeline card printed a kilobyte of zod issues (`clause` and `asOf`
missing), because each brief client PARSES its answer. Diagnose by process, not by symptom:
`Get-CimInstance Win32_Process -Filter "Name='python.exe'"` lists every `-m app --reload` stack with
its `CreationDate`, and a `spawn_main` worker older than your last Python edit is serving old code.
Kill the stale tree (`taskkill /PID <its uv.exe> /T /F`) and confirm `:8000` has one owner. The page
now says *"answered in a shape this page refuses … restart `pnpm dev:ai`"* instead of the JSON.
**Again, silently (2026-09-24, ADR 0132):** two reloaders (12:19 and 16:31) held `:8000` and BOTH had
stopped respawning — newest workers 17:26 and 17:40, the code they had to serve saved at 17:42–18:25.
An upload was accepted and read with no door 4; only the store showed it. Before trusting a live run,
compare each `spawn_main` worker's `CreationDate` with `Get-ChildItem app -Recurse *.py` mtimes; with no
server to restart, run the endpoint's own pipeline in-process (`ingest_documents_parallel`).

**Guarded since 2026-09-25 (ADR 0134 D1):** `/healthz` reports `codeStale` (a source file saved
after the answering worker loaded), and the Library shows a banner — *"running code older than what
is on disk … restart it before uploading"* — so a stale worker is visible BEFORE an upload, not in
the store after it. A worker from before the guard answers without the field and reads as stale.

**Variant: it ANSWERS, fresh, and every upload fails (2026-10-03, rung 17c).** A dropped PDF failed
3× with *"_parse_and_chunk ended its process without an answer"*. Every `:8000` connection (12 of
12) reached an ORPHANED worker: its reloader was dead, its VS Code terminal was closed, and
`AttachConsole` returned error 233 (a dead console). A multiprocessing child joins its parent's
console in DLL init, so every parse died at birth (`0xC0000142`). The user's fresh `pnpm dev:ai`
had bound beside it and got nothing. `codeStale` was false, because the code was current.
**Guarded since:**
- every child the service starts owns its console (`app/processes.NO_CONSOLE`), and the parse
  runner names the exit code and stderr of a crash (ADR 0135, amended);
- a reload worker exits with its reloader;
- a second `python -m app` refuses a served port, naming the holder by `/healthz`'s `pid`.
  netstat names an orphan's DEAD reloader, which cannot be stopped.

## #18 — A Python edit KILLS a background cascade, and a CLI sweep BLOCKS the reload (2026-09-24)

**Symptom A.** Documents stuck `processing`, then `failed: interrupted by a service restart`, right
after a save to any `.py` under `services/ai` — `tests/` included (`--reload` watches the whole
directory). The company door's re-derivation and a layer retry are background tasks in the worker;
the reload kills them and startup reconciliation marks their layers interrupted.
**Symptom B.** `:8000` hangs for as long as a `app.claims.cli --reresolve` sweep runs. The CLI holds
ONE transaction for the whole sweep (it commits at the end — 25 min for four IDFC documents), and
a reloaded worker's startup `apply_schema` waits on it: `pg_stat_activity` shows the schema script
`active` with `wait_event = relation` beside the CLI's `idle in transaction`.

**Narrowed 2026-09-25:** `pnpm dev:ai` now reloads on `app/` only (`reload_dirs`), so saving a TEST
no longer restarts the worker (effective from the next restart of `pnpm dev:ai`). A save under
`app/` still does. The same reload's startup `apply_schema` deadlocked a long workspace purge once —
a script holding many table locks should retry on `DeadlockDetected`.

**Fix.** Before editing backend code, check nothing is `processing` (`GET /documents`) and no CLI
sweep is open. Stage edits in the scratchpad if one is. For B, let the sweep commit; the blocked
startup then completes on its own.
**Variant: the sweep that "exited 0".** `timeout 1700 uv run python -m app.claims.cli --reresolve …
| tail -15` was killed at the timeout: the pipeline reported TAIL's exit 0, the CLI's buffered
output was lost, and its one transaction rolled back — nothing written. Judge a sweep by the store
(`resolution_runs` with its `sweep_id`), never by an exit code through a pipe; for four documents
prefer the concurrent product cascade (`parallel.rederive_documents`).

## #20 — `documents` is a VIEW: an `UPDATE documents` naming a canvas file silently does nothing (2026-10-03)

**Symptom.** A canvas file stays *Reading* forever, or its stage strip never moves, though the code
"updated the row". **Cause.** Since rung 17c (ADR 0149 D3) the table is `all_documents` and
`documents` is the Library's view (`standing = 'library'`). An `UPDATE`/`DELETE` through the view
whose `WHERE` names a canvas file matches **0 rows** — no error (the CHECK OPTION only refuses a
write that would HIDE its row: an insert with `standing='canvas'`, or an upsert landing on a canvas
file's id). **Rule.** A writer in the ingestion lifecycle (land, reserve, fail, the stage strip,
embed, reconcile) or a read addressed by id inside a workspace names `all_documents`; anything that
LISTS documents keeps `documents`. Add the module to `BASE_TABLE_READERS` in
`app/eval/canvas_files_probe.py`, or G1 fails. A new column on `all_documents` goes ABOVE the view in
`schema.sql` (`SELECT *` is expanded at creation; `test_canvas_files` pins parity). **A view has no
primary key**, so `GROUP BY d.id` no longer makes `d.*` selectable: group (or aggregate) every
column you select or order by — `merge/run.py` raised `GroupingError` until it did (2026-10-05).

## #19 — "AI service not answering" while every door answers: a CPU-bound thread starves the rest (2026-09-25)

**Symptom.** Right after an upload with an annual report, the Library shows *"The AI service is not
answering"*, yet the `pnpm dev:ai` log keeps printing `200 OK` for `/documents`,
`/companies/pending` and the brief. Transcripts sit at **Identifying source** until the reports
finish **Reading**, then everything moves at once. A page refresh changes nothing.

**Cause.** The parse ran in `asyncio.to_thread` — a thread of the SERVICE's process — and held the
GIL for a minute. A thread doing I/O drops the GIL on every syscall and queues to get it back, so
its slowdown scales with how many syscalls it makes: the old `/healthz` (a ~300-file stat scan)
went 20 ms → 13 s, past the page's 8 s timeout; a DB query 1 → 100 ms (so other doors "worked");
the calls' HTTPS model calls crawled. Diagnose by timing, not by status codes: all of a batch's
extractions starting within seconds of each other (`extraction_runs.started_at`) is the tell.

**Fix (ADR 0135).** The parse runs in its own spawned process (`ingestion/isolated.run_isolated`),
and `/healthz` answers from a watcher's snapshot. Any NEW multi-second CPU job in the service goes
through `run_isolated`, never `to_thread`; `uv run python -m app.eval.responsiveness_probe` proves
it (its `--legacy-thread` replay must FAIL).

**And it changed what was STORED.** PyMuPDF's `find_tables()` keeps its state in module globals.
Two parses on concurrent threads read tables differently on ~20% of pages, and the damage PERSISTS:
every later parse in that process — even a lone upload — inherits it until a restart (reproduced
byte for byte against `ws-idfc-test`'s store). Never run two PyMuPDF parses in one process.

**Two traps in the fix itself.** (a) A script that drives the ingest path must guard its entrypoint
(`if __name__ == "__main__":`), or the spawned child re-imports it and re-runs it. (b) On Windows an
orphaned `ProcessPoolExecutor` worker never exits — it holds both ends of its own queue pipes, so
its parent's death is not EOF — and it keeps a pipeline's stdout open (a `| tail` waits forever).
`run_isolated`'s initializer exits the job when its parent dies; a hand-rolled pool has no such
guard. Find strays with `Get-CimInstance Win32_Process -Filter "Name='python.exe'"`: a
`spawn_main(parent_pid=N)` whose N no longer exists is one.
