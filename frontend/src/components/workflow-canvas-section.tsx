'use client';

import React, { useRef, useState, useCallback, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

/* ================================================================
   Types
   ================================================================ */
type NodeId = 'data' | 'ai' | 'excel' | 'doc';
type Position = { x: number; y: number };
type Positions = Record<NodeId, Position>;
type Msg = { r: 'ai' | 'user'; t: string };

/* ================================================================
   Constants
   ================================================================ */
const CANVAS_W = 1100;
const CANVAS_H = 680;
const CHROME_H = 40;

const INIT_POSITIONS: Positions = {
  data:  { x: 20,  y: 170 },
  ai:    { x: 340, y: 20  },
  excel: { x: 320, y: 365 },
  doc:   { x: 780, y: 100 },
};

const NODE_DIMS: Record<NodeId, { w: number; h: number }> = {
  data:  { w: 260, h: 320 },
  ai:    { w: 300, h: 320 },
  excel: { w: 390, h: 310 },
  doc:   { w: 300, h: 400 },
};

const C = {
  node: '#ffffff',
  border: '#e5e7eb',
  borderHov: '#d1d5db',
  surfaceA: '#f9fafb',
  surfaceB: '#f3f4f6',
  text: '#111827',
  textSec: '#6b7280',
  textMut: '#9ca3af',
  accent: '#111827',
  blue: '#2563eb',
  blueS: '#eff6ff',
  green: '#16a34a',
  greenS: '#f0fdf4',
  violet: '#7c3aed',
  violetS: '#f5f3ff',
  red: '#dc2626',
};

const EDGES: { from: NodeId; to: NodeId; label: string }[] = [
  { from: 'data',  to: 'ai',    label: 'Data access' },
  { from: 'data',  to: 'excel', label: 'Raw data'    },
  { from: 'ai',    to: 'doc',   label: 'Chart'       },
  { from: 'excel', to: 'doc',   label: 'Analysis'    },
];

const SS = [
  { name: 'Equities',    q: [142.3, 156.8, 171.2, 189.4], total: 659.7 },
  { name: 'Fixed Inc.',  q: [89.4,  92.1,  88.7,  95.3],  total: 365.5 },
  { name: 'FX Trading',  q: [67.2,  71.5,  69.8,  74.1],  total: 282.6 },
  { name: 'Derivatives', q: [44.8,  47.2,  51.6,  55.9],  total: 199.5 },
  { name: 'Commodities', q: [29.1,  31.4,  28.9,  33.2],  total: 122.6 },
];

const PIE_DATA = [
  { label: 'Equities',     pct: 38, color: '#111827' },
  { label: 'Fixed Income', pct: 24, color: '#6b7280' },
  { label: 'FX Trading',   pct: 18, color: '#2563eb' },
  { label: 'Derivatives',  pct: 12, color: '#9ca3af' },
  { label: 'Commodities',  pct: 8,  color: '#d1d5db' },
];

/* ================================================================
   Helpers
   ================================================================ */
function getAnchors(positions: Positions) {
  return EDGES.map(({ from, to }) => {
    const fp = positions[from];
    const fd = NODE_DIMS[from];
    const tp = positions[to];
    const td = NODE_DIMS[to];
    const fx = fp.x + fd.w;
    const fy = fp.y + fd.h / 2;
    const tx = tp.x;
    const ty = tp.y + td.h / 2;
    const mx = (fx + tx) / 2;
    const my = (fy + ty) / 2;
    return { d: `M${fx},${fy} C${mx},${fy} ${mx},${ty} ${tx},${ty}`, mx, my };
  });
}

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

function getAIReply(text: string, selRow: number | null): string {
  const lo = text.toLowerCase();
  if (lo.includes('total') || lo.includes('revenue'))
    return 'Total FY2025 revenue is $1,629.9M — up 14.2% YoY. Q4 was the strongest quarter at $447.9M.';
  if (lo.includes('fx'))
    return 'FX Trading reached $282.6M for the year, with Q4 strongest at $74.1M — +10.3% QoQ growth.';
  if (lo.includes('equit'))
    return 'Equities contributed $659.7M, the largest share at 38% of total revenue. Q4 alone was $189.4M.';
  if (lo.includes('chart') || lo.includes('visual') || lo.includes('graph'))
    return 'I can generate a bar chart or trend line for any product. Which segment are you focused on?';
  if (lo.includes('grow') || lo.includes('fast'))
    return 'FX Trading was the fastest-growing segment at +18.6% QoQ in Q4, driven by heightened volatility in EM currencies.';
  if (selRow !== null)
    return `${SS[selRow].name}: $${SS[selRow].total.toFixed(1)}M total. Q4 was $${SS[selRow].q[3].toFixed(1)}M — ${selRow === 0 ? 'the highest-performing segment.' : 'solid performance year-round.'}`;
  return 'Based on the data: Equities leads at 38%, Fixed Income at 22.4%. Want a QoQ trend or year-end summary?';
}

function getDocAIReply(text: string): string {
  const lo = text.toLowerCase();
  if (lo.includes('fx') || lo.includes('trading'))
    return 'Added a new section on FX Trading: "$282.6M full-year, +18.6% QoQ in Q4 driven by EM volatility." I can expand this further.';
  if (lo.includes('chart') || lo.includes('insert'))
    return 'Chart inserted below the Executive Summary. It references Figure 1 from the AI Assistant node.';
  if (lo.includes('summar') || lo.includes('execut'))
    return "I've expanded the Executive Summary with a breakdown by quarter. Want me to add YoY comparisons?";
  if (lo.includes('reference') || lo.includes('source'))
    return 'Added citation: "Revenue Data · B2:F7" and "Excel Model · Sheet 1" to the Sources section.';
  if (lo.includes('expand') || lo.includes('section'))
    return "I've added a Recommendations section with three action items based on the Q4 performance data.";
  return 'I can help you draft, edit, or expand any section. What part of the report would you like to improve?';
}

/* ================================================================
   Port indicator
   ================================================================ */
function Port({ side }: { side: 'left' | 'right' }) {
  return (
    <div
      style={{
        position: 'absolute',
        width: 10,
        height: 10,
        borderRadius: '50%',
        background: '#fff',
        border: '2px solid hsl(214,20%,80%)',
        top: '50%',
        transform: 'translateY(-50%)',
        [side]: -5,
        zIndex: 10,
        boxShadow: '0 1px 4px rgba(0,0,0,0.10)',
        pointerEvents: 'none',
      }}
    />
  );
}

/* ================================================================
   Node header
   ================================================================ */
function NodeHeader({
  icon, iconBg, iconColor, title, sub, pill, onPointerDown, cursor, onOpen,
}: {
  icon: string; iconBg: string; iconColor: string; title: string; sub: string;
  pill?: string; onPointerDown?: React.PointerEventHandler; cursor?: string;
  onOpen?: () => void;
}) {
  return (
    <div
      style={{
        padding: '10px 12px',
        borderBottom: `1px solid ${C.border}`,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        cursor: cursor || 'inherit',
        userSelect: 'none',
        flexShrink: 0,
      }}
      onPointerDown={onPointerDown}
    >
      <div style={{ width: 28, height: 28, borderRadius: 7, background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: iconColor, flexShrink: 0 }}>
        {icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: C.text, lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {title}
        </div>
        <div style={{ fontSize: 10.5, color: C.textSec, lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {sub}
        </div>
      </div>
      {pill && (
        <span style={{ fontSize: 9, fontWeight: 600, padding: '2px 6px', borderRadius: 4, background: C.surfaceB, color: C.textSec, letterSpacing: '0.04em', flexShrink: 0 }}>
          {pill}
        </span>
      )}
      {onOpen && (
        <button
          onPointerDown={e => e.stopPropagation()}
          onClick={e => { e.stopPropagation(); onOpen(); }}
          title="Open file"
          style={{
            width: 26, height: 26, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, color: C.textMut, cursor: 'pointer',
            background: C.surfaceA, border: `1px solid ${C.border}`,
            flexShrink: 0, outline: 'none', transition: 'all 0.12s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = C.borderHov; (e.currentTarget as HTMLElement).style.color = C.text; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = C.border; (e.currentTarget as HTMLElement).style.color = C.textMut; }}
        >
          ↗
        </button>
      )}
    </div>
  );
}

/* ================================================================
   Status dot
   ================================================================ */
function StatusDot() {
  return (
    <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: C.green, animation: 'dotPulse 2.4s ease-in-out infinite', flexShrink: 0 }} />
  );
}

/* ================================================================
   Data Sources Node
   ================================================================ */
const DATA_ITEMS = [
  { name: 'Q1 2025 Earnings Report.pdf', type: 'PDF',  detail: '2.4 MB · Indexed',       ext: '⬚', color: C.red   },
  { name: 'Product Revenue Data.xlsx',   type: 'XLSX', detail: '847 rows · Synced',       ext: '⊞', color: C.green },
  { name: 'Market Analysis Brief',       type: 'KB',   detail: '14 docs · 2,103 vectors', ext: '◈', color: C.blue  },
];

function DataNodeContent() {
  return (
    <div style={{ padding: '8px 10px', fontSize: 11 }}>
      {DATA_ITEMS.map((item, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 0', borderBottom: i < DATA_ITEMS.length - 1 ? `1px solid ${C.border}` : 'none' }}>
          <span style={{ fontSize: 16, color: item.color, flexShrink: 0 }}>{item.ext}</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 500, color: C.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</div>
            <div style={{ fontSize: 10, color: C.textMut }}>{item.type} · {item.detail}</div>
          </div>
          <StatusDot />
        </div>
      ))}
      <div style={{ marginTop: 8, padding: '6px 0', border: `1px dashed ${C.border}`, borderRadius: 6, textAlign: 'center', color: C.textMut, fontSize: 10.5 }}>
        + Add data source
      </div>
      <div style={{ marginTop: 8, padding: '5px 8px', background: C.surfaceA, borderRadius: 6, border: `1px solid ${C.border}`, color: C.textMut, fontSize: 10.5 }}>
        Search knowledge base...
      </div>
    </div>
  );
}

/* ================================================================
   PieChart
   ================================================================ */
function PieChart() {
  const [hovered, setHovered] = useState<number | null>(null);
  const cx = 80, cy = 80, R = 68, ri = 34;

  const slices = useMemo(() => {
    return PIE_DATA.map((d, index) => {
      const cumulative = PIE_DATA.slice(0, index).reduce((sum, item) => sum + item.pct, 0);
      const startAngle = cumulative * 3.6 * (Math.PI / 180);
      const endAngle = (cumulative + d.pct) * 3.6 * (Math.PI / 180);
      const largeArc = d.pct > 50 ? 1 : 0;
      const x1o = cx + R  * Math.cos(startAngle - Math.PI / 2);
      const y1o = cy + R  * Math.sin(startAngle - Math.PI / 2);
      const x2o = cx + R  * Math.cos(endAngle   - Math.PI / 2);
      const y2o = cy + R  * Math.sin(endAngle   - Math.PI / 2);
      const x1i = cx + ri * Math.cos(endAngle   - Math.PI / 2);
      const y1i = cy + ri * Math.sin(endAngle   - Math.PI / 2);
      const x2i = cx + ri * Math.cos(startAngle - Math.PI / 2);
      const y2i = cy + ri * Math.sin(startAngle - Math.PI / 2);
      return { ...d, path: `M${x1o},${y1o} A${R},${R} 0 ${largeArc} 1 ${x2o},${y2o} L${x1i},${y1i} A${ri},${ri} 0 ${largeArc} 0 ${x2i},${y2i} Z` };
    });
  }, []);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 10px' }}>
      <svg width={110} height={110} viewBox="0 0 160 160" style={{ flexShrink: 0 }}>
        {slices.map((s, i) => (
          <path key={i} d={s.path} fill={s.color}
            opacity={hovered !== null && hovered !== i ? 0.4 : 1}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{ transition: 'opacity 0.2s', cursor: 'pointer' }}
          />
        ))}
        <circle cx={cx} cy={cy} r={ri - 2} fill="white" />
        <text x={cx} y={cy - 4} textAnchor="middle" fill={C.textMut} fontSize="8" fontFamily="Inter,sans-serif">Revenue</text>
        <text x={cx} y={cy + 9} textAnchor="middle" fill={C.text} fontSize="10" fontWeight="700" fontFamily="Inter,sans-serif">FY 2025</text>
      </svg>
      <div style={{ fontSize: 10, display: 'flex', flexDirection: 'column', gap: 3 }}>
        {PIE_DATA.map((d, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5, opacity: hovered !== null && hovered !== i ? 0.5 : 1, transition: 'opacity 0.2s' }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, background: d.color, flexShrink: 0, display: 'inline-block' }} />
            <span style={{ color: C.textSec, whiteSpace: 'nowrap' }}>{d.label} {d.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================================================================
   AI Assistant Node (with input)
   ================================================================ */
function AINodeContent() {
  const [input, setInput] = useState('');
  const [aiReply, setAiReply] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    setAiReply(getAIReply(input, null));
    setInput('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', fontSize: 11 }}>
      <div style={{ flex: 1, padding: '8px 10px', overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
          <div style={{ width: 22, height: 22, borderRadius: '50%', background: C.surfaceB, color: C.textSec, fontSize: 8.5, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>JA</div>
          <div style={{ background: C.surfaceA, border: `1px solid ${C.border}`, borderRadius: '3px 8px 8px 8px', padding: '5px 8px', color: C.textSec, lineHeight: 1.45, fontSize: 10.5, flex: 1 }}>
            Create a pie chart showing revenue distribution
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ width: 22, height: 22, borderRadius: 6, background: C.violetS, color: C.violet, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>✦</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ background: C.surfaceA, border: `1px solid ${C.border}`, borderRadius: '3px 8px 8px 8px', padding: '5px 8px', color: C.textSec, lineHeight: 1.45, fontSize: 10.5, marginBottom: 6 }}>
              {aiReply || "Here's the FY 2025 revenue breakdown:"}
            </div>
            {!aiReply && <PieChart />}
          </div>
        </div>
      </div>
      <div
        style={{ padding: '7px 10px', borderTop: `1px solid ${C.border}`, display: 'flex', gap: 5, flexShrink: 0 }}
        onPointerDown={e => e.stopPropagation()}
      >
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder="Ask a follow-up…"
          style={{ flex: 1, background: C.surfaceA, border: `1px solid ${C.border}`, borderRadius: 6, padding: '5px 8px', fontSize: 10.5, color: C.text, outline: 'none' }}
          onFocus={e => (e.target.style.borderColor = C.violet)}
          onBlur={e => (e.target.style.borderColor = C.border)}
        />
        <button
          onClick={sendMessage}
          style={{ width: 28, height: 28, borderRadius: 6, background: input ? C.violet : C.surfaceA, border: `1px solid ${input ? C.violet : C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: input ? '#fff' : C.textMut, cursor: 'pointer', transition: 'all 0.15s', flexShrink: 0, outline: 'none' }}
        >↑</button>
      </div>
    </div>
  );
}

/* ================================================================
   Compact spreadsheet (node view)
   ================================================================ */
function SpreadsheetTable({ selRow, onSelRow }: { selRow?: number | null; onSelRow?: (i: number) => void }) {
  return (
    <div style={{ overflowX: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 10 }}>
        <thead>
          <tr>
            {['', 'Q1', 'Q2', 'Q3', 'Q4', 'Total'].map((h, i) => (
              <th key={i} style={{ padding: '4px 5px', textAlign: i === 0 ? 'left' : 'right', fontWeight: 500, color: C.textMut, borderBottom: `1px solid ${C.border}`, whiteSpace: 'nowrap' }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {SS.map((row, ri) => (
            <tr
              key={ri}
              onClick={() => onSelRow?.(ri)}
              style={{ background: selRow === ri ? C.blueS : ri % 2 === 0 ? '#fff' : C.surfaceA, cursor: onSelRow ? 'pointer' : 'default', transition: 'background 0.1s' }}
            >
              <td style={{ padding: '3px 5px', fontWeight: selRow === ri ? 600 : 400, color: C.text, whiteSpace: 'nowrap' }}>{row.name}</td>
              {row.q.map((v, qi) => (
                <td key={qi} style={{ padding: '3px 5px', textAlign: 'right', color: C.textSec, fontFamily: 'monospace', whiteSpace: 'nowrap' }}>{v.toFixed(1)}</td>
              ))}
              <td style={{ padding: '3px 5px', textAlign: 'right', fontWeight: 600, color: C.text, fontFamily: 'monospace', whiteSpace: 'nowrap' }}>{row.total.toFixed(1)}</td>
            </tr>
          ))}
          <tr style={{ borderTop: `2px solid ${C.border}`, background: C.surfaceA }}>
            <td style={{ padding: '4px 5px', fontWeight: 700, color: C.text, fontSize: 9 }}>TOTAL</td>
            {[372.8, 399.0, 410.2, 447.9].map((t, i) => (
              <td key={i} style={{ padding: '4px 5px', textAlign: 'right', fontWeight: 700, color: C.green, fontFamily: 'monospace', whiteSpace: 'nowrap' }}>{t.toFixed(1)}</td>
            ))}
            <td style={{ padding: '4px 5px', textAlign: 'right', fontWeight: 800, color: C.green, fontFamily: 'monospace', whiteSpace: 'nowrap' }}>1,629.9</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

/* ================================================================
   Excel Node content
   ================================================================ */
function ExcelNodeContent({ onOpen }: { onOpen: () => void }) {
  const [selRow, setSelRow] = useState<number | null>(0);

  return (
    <div style={{ fontSize: 11, display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Formula bar */}
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderBottom: `1px solid ${C.border}`, background: C.surfaceA, flexShrink: 0 }}
        onPointerDown={e => e.stopPropagation()}
      >
        <span style={{ fontSize: 10, fontWeight: 600, color: C.textMut, background: '#fff', border: `1px solid ${C.border}`, borderRadius: 3, padding: '1px 5px' }}>
          {selRow !== null ? `A${selRow + 2}` : 'A1'}
        </span>
        <span style={{ color: C.textSec, fontSize: 10.5 }}>
          {selRow !== null ? SS[selRow].name : 'Product'}
        </span>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4, fontSize: 9.5, color: C.green }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: C.green, animation: 'dotPulse 2s ease-in-out infinite' }} />
          AI
        </div>
      </div>
      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, background: C.surfaceA, flexShrink: 0 }} onPointerDown={e => e.stopPropagation()}>
        {['Revenue', 'Quarterly', 'YoY'].map((tab, i) => (
          <div key={tab} style={{ padding: '4px 10px', fontSize: 10, color: i === 0 ? C.green : C.textMut, fontWeight: i === 0 ? 600 : 400, borderBottom: i === 0 ? `2px solid ${C.green}` : '2px solid transparent', borderRight: `1px solid ${C.border}` }}>
            {tab}
          </div>
        ))}
      </div>
      {/* Table */}
      <div style={{ flex: 1, overflow: 'hidden', padding: '0' }} onPointerDown={e => e.stopPropagation()}>
        <SpreadsheetTable selRow={selRow} onSelRow={setSelRow} />
      </div>
      {/* AI bar */}
      <div style={{ borderTop: `1px solid ${C.border}`, padding: '6px 10px', background: C.surfaceA, flexShrink: 0 }} onPointerDown={e => e.stopPropagation()}>
        {selRow !== null && (
          <div style={{ display: 'flex', gap: 5, marginBottom: 5, alignItems: 'flex-start' }}>
            <span style={{ color: C.green, fontSize: 10, flexShrink: 0 }}>✦</span>
            <p style={{ fontSize: 9.5, color: C.textSec, lineHeight: 1.4 }}>
              <strong style={{ color: C.text }}>{SS[selRow].name}</strong> — ${SS[selRow].total.toFixed(1)}M total.
              Q4 strongest at ${SS[selRow].q[3].toFixed(1)}M.
            </p>
          </div>
        )}
        <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
          <div style={{ width: 18, height: 18, borderRadius: 5, background: C.greenS, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: C.green, flexShrink: 0 }}>✦</div>
          <div style={{ flex: 1, background: '#fff', border: `1px solid ${C.border}`, borderRadius: 6, padding: '4px 8px', fontSize: 10, color: C.textMut, cursor: 'pointer' }} onClick={onOpen}>
            Ask AI about this spreadsheet…
          </div>
          <button
            onClick={onOpen}
            style={{ padding: '4px 9px', borderRadius: 6, background: C.greenS, color: C.green, fontSize: 10, fontWeight: 600, border: `1px solid ${C.green}28`, cursor: 'pointer', whiteSpace: 'nowrap', outline: 'none' }}
          >
            Open full
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   Document Node content
   ================================================================ */
function DocNodeContent({ onOpen }: { onOpen: () => void }) {
  const findings = [
    { label: 'Equities',   value: '$659.7M', note: '38% of total',  color: C.text    },
    { label: 'Fixed Inc.', value: '$365.5M', note: 'Stable +3.2%',  color: C.textSec },
    { label: 'FX Trading', value: '$282.6M', note: '+18.6% QoQ ↑', color: C.green   },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', fontSize: 11 }}>
      <div style={{ flex: 1, overflow: 'hidden', padding: '10px 12px', position: 'relative' }} onPointerDown={e => e.stopPropagation()}>
        <div style={{ fontWeight: 700, fontSize: 14, color: C.text, marginBottom: 2, lineHeight: 1.3 }}>
          Q1 2025 Revenue Analysis
        </div>
        <div style={{ fontSize: 10, color: C.textMut, marginBottom: 8 }}>
          J. Anderson &middot; April 23, 2025
        </div>
        <div style={{ fontSize: 9, fontWeight: 600, color: C.textMut, letterSpacing: '0.06em', marginBottom: 3 }}>
          EXECUTIVE SUMMARY
        </div>
        <div style={{ fontSize: 10.5, color: C.textSec, lineHeight: 1.5, marginBottom: 8 }}>
          Total FY2025 revenue reached $1,629.9M, a 14.2% YoY increase.
          Equities contributed 38% with Q4 the strongest quarter.
        </div>
        {/* Figure chip */}
        <div
          style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 8px', background: C.violetS, borderRadius: 5, fontSize: 9.5, color: C.violet, marginBottom: 8, cursor: 'pointer' }}
          onClick={onOpen}
        >
          <span>&#x25cb;</span>
          <span>Figure 1 &mdash; Revenue Distribution Chart</span>
          <span style={{ fontSize: 8, color: C.textMut }}>↗</span>
        </div>
        <div style={{ fontSize: 9, fontWeight: 600, color: C.textMut, letterSpacing: '0.06em', marginBottom: 4 }}>KEY FINDINGS</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 8 }}>
          {findings.map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 10.5, borderBottom: `1px solid ${C.border}`, paddingBottom: 4 }}>
              <span style={{ fontWeight: 600, color: f.color, width: 60, flexShrink: 0 }}>{f.label}</span>
              <span style={{ fontWeight: 600, color: C.text, fontFamily: 'monospace', width: 56, flexShrink: 0 }}>{f.value}</span>
              <span style={{ color: f.color, fontSize: 9.5 }}>{f.note}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {['Earnings · p.4', 'Revenue Data', 'Market Brief'].map((s) => (
            <span key={s} style={{ fontSize: 9, padding: '2px 6px', background: C.surfaceB, borderRadius: 4, color: C.textMut }}>¶ {s}</span>
          ))}
        </div>
        {/* fade gradient */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 32, background: 'linear-gradient(transparent, #ffffff)', pointerEvents: 'none' }} />
      </div>
      {/* AI bar */}
      <div style={{ borderTop: `1px solid ${C.border}`, padding: '7px 10px', background: C.surfaceA, flexShrink: 0 }} onPointerDown={e => e.stopPropagation()}>
        <div style={{ display: 'flex', gap: 5, alignItems: 'center', marginBottom: 5 }}>
          <span style={{ color: C.textMut, fontSize: 10 }}>✦</span>
          <span style={{ fontSize: 9.5, color: C.textSec }}>Suggestion: add FX Trading section — data available from Excel node.</span>
        </div>
        <div style={{ display: 'flex', gap: 5 }}>
          <div style={{ flex: 1, background: '#fff', border: `1px solid ${C.border}`, borderRadius: 6, padding: '4px 8px', fontSize: 10, color: C.textMut, cursor: 'pointer' }} onClick={onOpen}>
            Ask AI to draft or edit…
          </div>
          <button
            onClick={onOpen}
            style={{ padding: '4px 10px', borderRadius: 6, background: C.surfaceB, color: C.text, fontSize: 10, fontWeight: 600, border: `1px solid ${C.border}`, cursor: 'pointer', whiteSpace: 'nowrap', outline: 'none' }}
          >
            Open full
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   Full spreadsheet table (modal)
   ================================================================ */
function ModalSpreadsheetTable({ selRow, onSelRow }: { selRow: number | null; onSelRow: (i: number) => void }) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
      <colgroup>
        <col style={{ width: 28 }} />
        <col style={{ width: 120 }} />
        <col /><col /><col /><col />
        <col style={{ width: 80 }} />
      </colgroup>
      <thead>
        <tr>
          <th style={{ padding: '7px 10px', background: C.surfaceA, color: C.textMut, fontSize: 10, fontWeight: 600, borderBottom: `1px solid ${C.border}`, textAlign: 'center' }}></th>
          <th style={{ padding: '7px 10px', background: C.surfaceA, color: C.textMut, fontSize: 10, fontWeight: 600, borderBottom: `1px solid ${C.border}`, textAlign: 'left' }}>Product</th>
          {['Q1', 'Q2', 'Q3', 'Q4'].map(h => (
            <th key={h} style={{ padding: '7px 10px', background: C.surfaceA, color: C.textMut, fontSize: 10, fontWeight: 600, borderBottom: `1px solid ${C.border}`, textAlign: 'right' }}>{h}</th>
          ))}
          <th style={{ padding: '7px 10px', background: C.surfaceA, color: C.text, fontSize: 10, fontWeight: 700, borderBottom: `1px solid ${C.border}`, textAlign: 'right' }}>Total</th>
        </tr>
      </thead>
      <tbody>
        {SS.map((row, ri) => (
          <tr
            key={ri}
            onClick={() => onSelRow(ri)}
            style={{ background: selRow === ri ? C.blueS : ri % 2 === 0 ? '#fff' : C.surfaceA, cursor: 'pointer', transition: 'background 0.1s' }}
          >
            <td style={{ padding: '6px 10px', color: C.textMut, fontSize: 10, textAlign: 'center', fontFamily: 'monospace' }}>{ri + 2}</td>
            <td style={{ padding: '6px 10px', fontWeight: selRow === ri ? 600 : 400, color: selRow === ri ? C.text : C.textSec }}>{row.name}</td>
            {row.q.map((v, qi) => (
              <td key={qi} style={{ padding: '6px 10px', textAlign: 'right', color: C.textSec, fontFamily: 'monospace' }}>{v.toFixed(1)}</td>
            ))}
            <td style={{ padding: '6px 10px', textAlign: 'right', fontWeight: 700, color: C.text, fontFamily: 'monospace' }}>{row.total.toFixed(1)}</td>
          </tr>
        ))}
        <tr style={{ borderTop: `2px solid ${C.border}`, background: C.surfaceA }}>
          <td></td>
          <td style={{ padding: '7px 10px', fontWeight: 700, color: C.text, letterSpacing: 0.3, fontSize: 11 }}>TOTAL</td>
          {[372.8, 399.0, 410.2, 447.9].map((v, i) => (
            <td key={i} style={{ padding: '7px 10px', textAlign: 'right', fontWeight: 700, color: C.green, fontFamily: 'monospace' }}>{v.toFixed(1)}</td>
          ))}
          <td style={{ padding: '7px 10px', textAlign: 'right', fontWeight: 800, color: C.green, fontFamily: 'monospace' }}>1,629.9</td>
        </tr>
      </tbody>
    </table>
  );
}

/* ================================================================
   AI Chat Panel (shared by both modals)
   ================================================================ */
function AIChatPanel({
  accentColor, accentBg, initMsg, suggestions, selRow, replyFn,
}: {
  accentColor: string;
  accentBg: string;
  initMsg: string;
  suggestions: string[];
  selRow?: number | null;
  replyFn?: (text: string) => string;
}) {
  const [msgs, setMsgs] = useState<Msg[]>([{ r: 'ai', t: initMsg }]);
  const [q, setQ] = useState('');
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [msgs, typing]);

  const resolve = useCallback((text: string) =>
    replyFn ? replyFn(text) : getAIReply(text, selRow ?? null),
  [replyFn, selRow]);

  const send = useCallback((text: string) => {
    if (!text.trim()) return;
    setMsgs(m => [...m, { r: 'user', t: text }]);
    setQ('');
    setTyping(true);
    setTimeout(() => {
      setMsgs(m => [...m, { r: 'ai', t: resolve(text) }]);
      setTyping(false);
    }, 700 + Math.random() * 300);
  }, [resolve]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#fff' }}>
      {/* Panel header */}
      <div style={{ padding: '11px 14px', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: 7, flexShrink: 0 }}>
        <div style={{ width: 22, height: 22, borderRadius: 6, background: accentBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: accentColor }}>✦</div>
        <span style={{ fontSize: 12, fontWeight: 600, color: C.text }}>AI Assistant</span>
        <span style={{ marginLeft: 'auto', fontSize: 8.5, color: accentColor, fontWeight: 700, padding: '2px 6px', background: accentBg, borderRadius: 99 }}>GPT-4o</span>
      </div>
      {/* Suggestion chips */}
      <div style={{ padding: '8px 10px', borderBottom: `1px solid ${C.border}`, display: 'flex', flexDirection: 'column', gap: 4, flexShrink: 0 }}>
        {suggestions.map((s, i) => (
          <div
            key={i}
            onClick={() => send(s)}
            style={{ padding: '5px 9px', background: C.surfaceA, border: `1px solid ${C.border}`, borderRadius: 6, fontSize: 10, color: C.textSec, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, transition: 'all 0.1s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = accentColor; (e.currentTarget as HTMLElement).style.color = C.text; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = C.border; (e.currentTarget as HTMLElement).style.color = C.textSec; }}
          >
            <span style={{ color: accentColor, fontSize: 9 }}>✦</span>{s}
          </div>
        ))}
      </div>
      {/* Messages */}
      <div ref={scrollRef} style={{ flex: 1, padding: '10px', overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ display: 'flex', gap: 7, alignItems: 'flex-start' }}>
            <div style={{
              width: 20, height: 20, borderRadius: m.r === 'ai' ? 5 : '50%',
              background: m.r === 'ai' ? accentBg : C.surfaceB,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: m.r === 'ai' ? 9 : 8, color: m.r === 'ai' ? accentColor : C.textSec,
              fontWeight: 700, flexShrink: 0, marginTop: 1,
            }}>
              {m.r === 'ai' ? '✦' : 'JA'}
            </div>
            <div style={{
              background: C.surfaceA, border: `1px solid ${C.border}`,
              padding: '7px 10px',
              borderRadius: m.r === 'ai' ? '3px 8px 8px 8px' : '8px 3px 8px 8px',
              fontSize: 10.5, color: C.textSec, lineHeight: 1.58, flex: 1,
            }}>
              {m.t}
            </div>
          </div>
        ))}
        {typing && (
          <div style={{ display: 'flex', gap: 7, alignItems: 'flex-start' }}>
            <div style={{ width: 20, height: 20, borderRadius: 5, background: accentBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: accentColor }}>✦</div>
            <div style={{ background: C.surfaceA, border: `1px solid ${C.border}`, padding: '8px 12px', borderRadius: '3px 8px 8px 8px', display: 'flex', gap: 4, alignItems: 'center' }}>
              {[0, 1, 2].map(j => (
                <div key={j} style={{ width: 4, height: 4, borderRadius: '50%', background: C.textMut, animation: `dotPulse 1s ${j * 0.18}s ease-in-out infinite` }} />
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Input */}
      <div style={{ padding: '9px', borderTop: `1px solid ${C.border}`, background: '#fff', display: 'flex', gap: 6, flexShrink: 0 }}>
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send(q)}
          placeholder="Ask about this file…"
          style={{ flex: 1, background: C.surfaceA, border: `1px solid ${C.border}`, borderRadius: 6, padding: '6px 9px', fontSize: 10.5, color: C.text, outline: 'none' }}
          onFocus={e => (e.target.style.borderColor = accentColor)}
          onBlur={e => (e.target.style.borderColor = C.border)}
        />
        <button
          onClick={() => send(q)}
          style={{ width: 30, height: 30, borderRadius: 7, background: q ? accentColor : '#fff', border: `1px solid ${q ? accentColor : C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: q ? '#fff' : C.textMut, cursor: 'pointer', transition: 'all 0.15s', outline: 'none' }}
        >↑</button>
      </div>
    </div>
  );
}

/* ================================================================
   Excel Modal
   ================================================================ */
function ExcelModal({ onClose }: { onClose: () => void }) {
  const [selRow, setSelRow] = useState<number | null>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const suggestions = ['What is the total revenue?', 'Which product grew fastest?', 'Summarise Q4 performance'];

  return createPortal(
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.25)', zIndex: 9000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 8 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        style={{ width: '92vw', maxWidth: 1140, height: '88vh', background: '#fff', borderRadius: 14, overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 24px 80px rgba(0,0,0,0.18)' }}
      >
        {/* Title bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 16px', borderBottom: `1px solid ${C.border}`, background: '#fff', flexShrink: 0 }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, background: C.greenS, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, color: C.green }}>⊞</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>Revenue_Breakdown_FY2025.xlsx</div>
            <div style={{ fontSize: 9.5, color: C.textMut }}>Sheet: Revenue · 5 rows · Read-only preview</div>
          </div>
          <div style={{ flex: 1 }} />
          <button onClick={onClose} style={{ width: 28, height: 28, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.surfaceA, border: `1px solid ${C.border}`, cursor: 'pointer', fontSize: 15, color: C.textMut, outline: 'none' }}>✕</button>
        </div>
        {/* Ribbon */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 3, padding: '5px 14px', borderBottom: `1px solid ${C.border}`, background: C.surfaceA, flexShrink: 0 }}>
          {['B', 'I', 'U', '$', '%', '∑', '⊞'].map((t, i) => (
            <div key={i} style={{ width: 22, height: 22, borderRadius: 4, background: '#fff', border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: C.textSec, cursor: 'pointer' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = C.surfaceB}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#fff'}
            >{t}</div>
          ))}
          <div style={{ width: 1, height: 16, background: C.border, margin: '0 4px' }} />
          {['Revenue', 'Quarterly', 'YoY Growth', 'Breakdown'].map((tab, i) => (
            <div key={tab} style={{ padding: '3px 10px', fontSize: 10, cursor: 'pointer', borderRadius: 5, background: i === 0 ? C.green + '18' : 'transparent', color: i === 0 ? C.green : C.textMut, fontWeight: i === 0 ? 600 : 400 }}>
              {tab}
            </div>
          ))}
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 10, color: C.green }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.green, animation: 'dotPulse 2s ease-in-out infinite' }} />
            AI analyzing
          </div>
        </div>
        {/* Formula bar */}
        <div style={{ display: 'flex', gap: 0, padding: '4px 14px', borderBottom: `1px solid ${C.border}`, background: '#fff', flexShrink: 0, alignItems: 'center' }}>
          <div style={{ padding: '2px 7px', background: C.surfaceA, border: `1px solid ${C.border}`, borderRadius: '4px 0 0 4px', fontSize: 9.5, color: C.textSec, width: 36, textAlign: 'center', fontFamily: 'monospace', borderRight: 'none' }}>
            {selRow !== null ? `A${selRow + 2}` : '—'}
          </div>
          <div style={{ flex: 1, padding: '2px 9px', background: '#fff', border: `1px solid ${C.border}`, borderRadius: '0 4px 4px 0', fontSize: 9.5, color: C.text, fontFamily: 'monospace' }}>
            {selRow !== null ? SS[selRow].name : 'Select a cell'}
          </div>
        </div>
        {/* Body */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          {/* Spreadsheet */}
          <div style={{ flex: 1, overflow: 'auto' }}>
            <ModalSpreadsheetTable selRow={selRow} onSelRow={setSelRow} />
          </div>
          {/* AI panel */}
          <div style={{ width: 300, borderLeft: `1px solid ${C.border}`, flexShrink: 0 }}>
            <AIChatPanel
              accentColor={C.green}
              accentBg={C.greenS}
              initMsg="I've loaded Revenue_Breakdown_FY2025.xlsx. I can help you analyze, summarize, or transform any of this data. What would you like to know?"
              suggestions={suggestions}
              selRow={selRow}
            />
          </div>
        </div>
      </motion.div>
    </div>,
    document.body
  );
}

/* ================================================================
   Document Modal
   ================================================================ */
function DocModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const suggestions = ['Expand the FX Trading section', 'Add a Recommendations section', 'Improve the Executive Summary'];

  return createPortal(
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.25)', zIndex: 9000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 8 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        style={{ width: '90vw', maxWidth: 1100, height: '88vh', background: '#fff', borderRadius: 14, overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 24px 80px rgba(0,0,0,0.18)' }}
      >
        {/* Title bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 16px', borderBottom: `1px solid ${C.border}`, background: '#fff', flexShrink: 0 }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, background: C.surfaceB, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, color: C.text }}>◎</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>Q1_Revenue_Analysis.docx</div>
            <div style={{ fontSize: 9.5, color: C.textMut }}>Draft · J. Anderson · Edited just now</div>
          </div>
          <div style={{ flex: 1 }} />
          <span style={{ padding: '2px 8px', borderRadius: 99, background: C.surfaceB, color: C.textSec, fontSize: 9, fontWeight: 600 }}>DRAFT</span>
          <button onClick={onClose} style={{ width: 28, height: 28, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.surfaceA, border: `1px solid ${C.border}`, cursor: 'pointer', fontSize: 15, color: C.textMut, outline: 'none', marginLeft: 4 }}>✕</button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          {/* Document */}
          <div style={{ flex: 1, overflow: 'auto', padding: '40px 64px' }}>
            <div style={{ maxWidth: 640, margin: '0 auto' }}>
              <h1 style={{ fontSize: 26, fontWeight: 800, color: C.text, letterSpacing: -0.6, marginBottom: 6 }}>Q1 2025 Revenue Analysis</h1>
              <p style={{ fontSize: 12, color: C.textMut, marginBottom: 32 }}>J. Anderson · April 23, 2025 · Financial Strategy</p>

              <h2 style={{ fontSize: 14, fontWeight: 700, color: C.text, letterSpacing: -0.2, marginBottom: 10, borderBottom: `1px solid ${C.border}`, paddingBottom: 8 }}>Executive Summary</h2>
              <p style={{ fontSize: 13, color: C.textSec, lineHeight: 1.75, marginBottom: 20 }}>
                Total FY2025 revenue reached <strong style={{ color: C.text }}>$1,629.9M</strong>, representing a{' '}
                <strong style={{ color: C.blue }}>14.2% year-over-year increase</strong>. Equities remained the dominant revenue driver,
                contributing 38% of total revenue. Q4 was the strongest quarter across all product lines, with total revenue of{' '}
                <strong style={{ color: C.text }}>$447.9M</strong>.
              </p>

              {/* Figure chip */}
              <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, padding: '10px 14px', background: C.surfaceA, display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, cursor: 'pointer', transition: 'border-color 0.12s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = C.violet + '50'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = C.border}
              >
                <div style={{ width: 36, height: 26, background: C.violetS, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: C.violet }}>⬤</div>
                <div>
                  <div style={{ fontSize: 12, color: C.text, fontWeight: 600 }}>Figure 1 — Revenue Distribution by Product (FY2025)</div>
                  <div style={{ fontSize: 10, color: C.textMut }}>Linked from AI Assistant · Pie chart · Click to preview</div>
                </div>
                <div style={{ marginLeft: 'auto', fontSize: 12, color: C.violet }}>↗</div>
              </div>

              <h2 style={{ fontSize: 14, fontWeight: 700, color: C.text, letterSpacing: -0.2, marginBottom: 10, borderBottom: `1px solid ${C.border}`, paddingBottom: 8 }}>Product Analysis</h2>
              <p style={{ fontSize: 13, color: C.textSec, lineHeight: 1.75, marginBottom: 12 }}>
                <strong style={{ color: C.text }}>Equities</strong> delivered <strong style={{ color: C.text }}>$659.7M</strong> for the full year,
                with Q4 reaching $189.4M — the highest single-quarter result of any segment.
                The consistent quarterly growth trajectory signals continued momentum.
              </p>
              <p style={{ fontSize: 13, color: C.textSec, lineHeight: 1.75, marginBottom: 12 }}>
                <strong style={{ color: C.text }}>FX Trading</strong> emerged as the fastest-growing segment at{' '}
                <strong style={{ color: C.green }}>+18.6% QoQ in Q4</strong>, driven by heightened volatility in emerging market currencies.
                Full-year contribution was $282.6M, representing 17.3% of total revenue.
              </p>
              <p style={{ fontSize: 13, color: C.textSec, lineHeight: 1.75, marginBottom: 24 }}>
                <strong style={{ color: C.text }}>Fixed Income</strong> showed resilient performance at $365.5M despite a slight Q3 dip,
                recovering strongly in Q4 with $95.3M.
              </p>

              {/* Sources */}
              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 16 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: C.textMut, letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 8 }}>Sources</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {['Earnings Report · p.4', 'Revenue Data · B2:F7', 'Market Brief · §3.2', 'Excel Model · Sheet 1'].map((r, i) => (
                    <div key={i} style={{ padding: '3px 9px', borderRadius: 5, background: C.surfaceA, color: C.textSec, fontSize: 10, fontWeight: 500, cursor: 'pointer', border: `1px solid ${C.border}`, transition: 'all 0.1s' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = C.borderHov; (e.currentTarget as HTMLElement).style.color = C.text; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = C.border; (e.currentTarget as HTMLElement).style.color = C.textSec; }}
                    >
                      ¶ {r}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* AI panel */}
          <div style={{ width: 300, borderLeft: `1px solid ${C.border}`, flexShrink: 0 }}>
            <AIChatPanel
              accentColor={C.accent}
              accentBg={C.surfaceB}
              initMsg="I can help you draft, edit, expand sections, or insert references. What would you like to improve in this report?"
              suggestions={suggestions}
              replyFn={getDocAIReply}
            />
          </div>
        </div>
      </motion.div>
    </div>,
    document.body
  );
}

/* ================================================================
   Draggable Node Wrapper
   ================================================================ */
function DraggableNode({
  id, position, dim, dragEnabled, onDrag, children, noLeft, noRight, header, scale,
}: {
  id: NodeId;
  position: Position;
  dim: { w: number; h: number };
  dragEnabled: boolean;
  onDrag: (id: NodeId, pos: Position) => void;
  children: React.ReactNode;
  noLeft?: boolean;
  noRight?: boolean;
  header: React.ReactNode;
  scale: number;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const startPointer = useRef({ x: 0, y: 0 });
  const startPos = useRef({ x: 0, y: 0 });

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!dragEnabled) return;
      e.preventDefault();
      setIsDragging(true);
      startPointer.current = { x: e.clientX, y: e.clientY };
      startPos.current = { x: position.x, y: position.y };
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [dragEnabled, position.x, position.y]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      const dx = (e.clientX - startPointer.current.x) / scale;
      const dy = (e.clientY - startPointer.current.y) / scale;
      onDrag(id, {
        x: clamp(startPos.current.x + dx, 0, CANVAS_W - dim.w),
        y: clamp(startPos.current.y + dy, 0, CANVAS_H - dim.h),
      });
    },
    [isDragging, id, dim.w, dim.h, onDrag, scale]
  );

  const handlePointerUp = useCallback(() => setIsDragging(false), []);

  return (
    <div
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: dim.w,
        height: dim.h,
        zIndex: isDragging ? 50 : 10,
        borderRadius: 12,
        background: C.node,
        border: `1px solid ${isDragging ? C.borderHov : C.border}`,
        boxShadow: isDragging ? '0 20px 48px rgba(0,0,0,0.15)' : '0 1px 4px rgba(0,0,0,0.06)',
        overflow: 'hidden',
        transition: isDragging ? 'none' : 'box-shadow 0.2s',
        touchAction: 'none',
        display: 'flex',
        flexDirection: 'column',
      }}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {!noLeft  && <Port side="left"  />}
      {!noRight && <Port side="right" />}
      <div
        onPointerDown={handlePointerDown}
        style={{ cursor: dragEnabled ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
      >
        {header}
      </div>
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </div>
  );
}

/* ================================================================
   Canvas Edges SVG
   ================================================================ */
function CanvasEdges({
  positions, flowActive, isReducedMotion,
}: {
  positions: Positions;
  flowActive: boolean;
  isReducedMotion: boolean;
}) {
  const anchors = useMemo(() => getAnchors(positions), [positions]);

  return (
    <svg
      width={CANVAS_W}
      height={CANVAS_H}
      style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 5 }}
    >
      {anchors.map((a, i) => (
        <React.Fragment key={i}>
          <path d={a.d} fill="none" stroke="hsl(214,20%,90%)" strokeWidth={2} strokeLinecap="round" />
          <motion.path
            d={a.d}
            fill="none"
            stroke="hsl(196,55%,60%)"
            strokeWidth={2}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={isReducedMotion ? { duration: 0 } : { delay: i * 0.3, duration: 0.7, ease: 'easeOut' }}
          />
          {flowActive && !isReducedMotion && (
            <path d={a.d} fill="none" stroke="hsl(196,55%,38%)" strokeWidth={2} strokeDasharray="4 10" opacity={0.45}
              style={{ animation: 'flowDash 1.8s linear infinite' }}
            />
          )}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={isReducedMotion ? { duration: 0 } : { delay: i * 0.3 + 0.6, duration: 0.3 }}
          >
            <rect x={a.mx - 36} y={a.my - 10} width={72} height={20} rx={10} fill="#fff" stroke="hsl(214,20%,88%)" strokeWidth={1} />
            <text x={a.mx} y={a.my + 3.5} textAnchor="middle" fontSize={9} fill="hsl(222,12%,46%)" fontFamily="Inter, sans-serif">
              {EDGES[i].label}
            </text>
          </motion.g>
        </React.Fragment>
      ))}
    </svg>
  );
}

/* ================================================================
   Browser Chrome
   ================================================================ */
function BrowserChrome() {
  return (
    <div style={{ height: CHROME_H, background: '#f9fafb', borderBottom: '1px solid hsl(214,20%,88%)', display: 'flex', alignItems: 'center', padding: '0 14px', gap: 8 }}>
      <div style={{ display: 'flex', gap: 6 }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
      </div>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <div style={{ background: '#fff', border: '1px solid hsl(214,20%,88%)', borderRadius: 6, padding: '3px 14px', fontSize: 11, color: 'hsl(222,12%,46%)', fontFamily: 'Inter, sans-serif' }}>
          /canvas/revenue-analysis
        </div>
      </div>
      <div style={{ fontSize: 13, color: 'hsl(222,12%,46%)' }}>{'↗'}</div>
    </div>
  );
}

/* ================================================================
   Section Header
   ================================================================ */
function SectionHeader() {
  return (
    <div className="text-center">
      <Badge
        variant="secondary"
        className="rounded-full px-4 py-1.5 text-xs font-medium mb-4"
        style={{ backgroundColor: 'hsl(196 55% 92%)', color: 'hsl(196 55% 38%)', border: '1px solid hsl(196 55% 80%)' }}
      >
        Explore the Workflow
      </Badge>
      <h2
        className="text-3xl sm:text-4xl leading-[1.12] tracking-[-0.015em] mt-4"
        style={{ fontFamily: "var(--font-gloock), 'Gloock', serif", color: 'var(--fq-ink)' }}
      >
        This is how the pieces connect.
      </h2>
      <p className="text-base md:text-lg leading-relaxed mt-4 max-w-[52ch] mx-auto" style={{ color: 'var(--fq-body)' }}>
        Every node on this canvas shares the same research context.
        Pull a source, run a model, draft a report. Nothing disconnected.
      </p>
      <p className="text-sm leading-relaxed mt-3 max-w-[60ch] mx-auto" style={{ color: 'var(--fq-muted)' }}>
        Interactive concept with sample data and responses. Drag nodes and explore the panels.
      </p>
    </div>
  );
}

/* ================================================================
   Canvas Card
   ================================================================ */
function CanvasCard({
  positions, dragEnabled, scale, onDrag, onReset, flowActive, isReducedMotion,
  onOpenExcel, onOpenDoc,
}: {
  positions: Positions;
  dragEnabled: boolean;
  scale: number;
  onDrag: (id: NodeId, pos: Position) => void;
  onReset: () => void;
  flowActive: boolean;
  isReducedMotion: boolean;
  onOpenExcel: () => void;
  onOpenDoc: () => void;
}) {
  return (
    <div style={{
      border: '1px solid hsl(214,20%,88%)',
      borderRadius: 16,
      overflow: 'hidden',
      boxShadow: '0 1px 0 rgba(15,23,42,0.03), 0 12px 40px rgba(15,23,42,0.07)',
      background: '#fafafa',
      position: 'relative',
    }}>
      <BrowserChrome />

      <div style={{
        position: 'relative',
        height: CANVAS_H,
        overflow: 'hidden',
        background: '#fafafa',
        backgroundImage: 'radial-gradient(circle, hsl(214,20%,82%) 1px, transparent 1px)',
        backgroundSize: '22px 22px',
        WebkitMaskImage: 'radial-gradient(ellipse 95% 90% at 50% 50%, black 40%, transparent 95%)',
        maskImage: 'radial-gradient(ellipse 95% 90% at 50% 50%, black 40%, transparent 95%)',
      }}>
        <CanvasEdges positions={positions} flowActive={flowActive} isReducedMotion={isReducedMotion} />

        <DraggableNode id="data" position={positions.data} dim={NODE_DIMS.data}
          dragEnabled={dragEnabled} onDrag={onDrag} scale={scale} noLeft
          header={<NodeHeader icon="◈" iconBg={C.blueS} iconColor={C.blue} title="Data Sources" sub="3 sources · Synced 4 min ago" />}
        >
          <DataNodeContent />
        </DraggableNode>

        <DraggableNode id="ai" position={positions.ai} dim={NODE_DIMS.ai}
          dragEnabled={dragEnabled} onDrag={onDrag} scale={scale}
          header={<NodeHeader icon="✦" iconBg={C.violetS} iconColor={C.violet} title="AI Assistant" sub="Connected · GPT-4o · Data Sources" />}
        >
          <AINodeContent />
        </DraggableNode>

        <DraggableNode id="excel" position={positions.excel} dim={NODE_DIMS.excel}
          dragEnabled={dragEnabled} onDrag={onDrag} scale={scale}
          header={<NodeHeader icon="⊞" iconBg={C.greenS} iconColor={C.green} title="Revenue_Breakdown_FY2025.xlsx" sub="5 sheets · Modified today · Excel 365" onOpen={onOpenExcel} />}
        >
          <ExcelNodeContent onOpen={onOpenExcel} />
        </DraggableNode>

        <DraggableNode id="doc" position={positions.doc} dim={NODE_DIMS.doc}
          dragEnabled={dragEnabled} onDrag={onDrag} scale={scale} noRight
          header={<NodeHeader icon="◎" iconBg={C.surfaceB} iconColor={C.text} title="Q1_Revenue_Analysis.docx" sub="Draft · 4 sections · J. Anderson" pill="DRAFT" onOpen={onOpenDoc} />}
        >
          <DocNodeContent onOpen={onOpenDoc} />
        </DraggableNode>
      </div>

      <AnimatePresence>
        {dragEnabled && !isReducedMotion && (
          <motion.button
            key="reset"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={onReset}
            style={{
              position: 'absolute',
              top: CHROME_H + 12,
              right: 12,
              zIndex: 20,
              padding: '4px 12px',
              borderRadius: 99,
              background: '#fff',
              border: '1px solid hsl(214,20%,88%)',
              fontSize: 11,
              color: 'hsl(222,12%,46%)',
              cursor: 'pointer',
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            }}
          >
            Reset layout
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ================================================================
   Main Section Component
   ================================================================ */
export default function WorkflowCanvasSection() {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<Positions>({ ...INIT_POSITIONS });
  const [scale, setScale] = useState(1);
  const [excelOpen, setExcelOpen] = useState(false);
  const [docOpen, setDocOpen] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setScale(Math.min(1, el.offsetWidth / CANVAS_W));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const isReducedMotion = shouldReduceMotion ?? false;
  const dragEnabled = !isReducedMotion && scale >= 0.65;
  const cardH = CANVAS_H + CHROME_H + 2;

  const handleDrag = useCallback((id: NodeId, pos: Position) => {
    setPositions((prev) => ({ ...prev, [id]: pos }));
  }, []);

  const resetPositions = useCallback(() => {
    setPositions({ ...INIT_POSITIONS });
  }, []);

  const openExcel = useCallback(() => setExcelOpen(true), []);
  const openDoc   = useCallback(() => setDocOpen(true),   []);
  const closeExcel = useCallback(() => setExcelOpen(false), []);
  const closeDoc   = useCallback(() => setDocOpen(false),   []);

  return (
    <section className="py-12 sm:py-16 lg:py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader />
        <div className="mt-8" ref={containerRef}>
          <div style={{ height: cardH * scale, position: 'relative' }}>
            <div style={{
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
              width: CANVAS_W,
              position: 'absolute',
              top: 0,
              left: 0,
            }}>
              <CanvasCard
                positions={positions}
                dragEnabled={dragEnabled}
                scale={scale}
                onDrag={handleDrag}
                onReset={resetPositions}
                flowActive={!isReducedMotion}
                isReducedMotion={isReducedMotion}
                onOpenExcel={openExcel}
                onOpenDoc={openDoc}
              />
            </div>
          </div>
        </div>
        {dragEnabled && (
          <p className="text-sm text-center mt-3" style={{ color: 'var(--fq-muted)' }}>
            Drag any node to explore. Click ↗ on nodes to open the full view.
          </p>
        )}
      </div>

      <AnimatePresence>
        {excelOpen && <ExcelModal onClose={closeExcel} />}
        {docOpen   && <DocModal   onClose={closeDoc}   />}
      </AnimatePresence>
    </section>
  );
}
