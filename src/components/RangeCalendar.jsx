// RangeCalendar.jsx (or inline in the same file)
import React, { forwardRef, useEffect, useState } from 'react';

const fmt = (d) => d ? `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}` : '';
const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate()+n); return x; };
const sameDay = (a,b) => !!a && !!b && a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate();
const between = (d, a, b) => !!a && !!b && d >= a && d <= b;

const RangeCalendar = forwardRef(function RangeCalendar(
  { start, end, minDate, onConfirm, onClose, align = 'left' },
  ref // forwarded to the popover panel for outside-click in parent
) {
  const [view, setView] = useState(start || new Date());
  const [tmpStart, setTmpStart] = useState(start || null);
  const [tmpEnd, setTmpEnd] = useState(end || null);

  // Close with ESC
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose?.();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const first = new Date(view.getFullYear(), view.getMonth(), 1);
  const startWD = (first.getDay() + 6) % 7; // Monday=0
  const dim = new Date(view.getFullYear(), view.getMonth()+1, 0).getDate();
  const grid = [];
  for (let i=0;i<startWD;i++) grid.push(null);
  for (let d=1; d<=dim; d++) grid.push(new Date(view.getFullYear(), view.getMonth(), d));

  const clickDay = (d) => {
    if (!d || (minDate && d < minDate)) return;
    if (!tmpStart || (tmpStart && tmpEnd)) { setTmpStart(d); setTmpEnd(null); return; }
    if (d < tmpStart) { setTmpEnd(tmpStart); setTmpStart(d); return; }
    if (sameDay(d, tmpStart)) { setTmpEnd(addDays(d,1)); return; } // at least 1 night
    setTmpEnd(d);
  };

  const apply = () => {
    if (tmpStart && tmpEnd) onConfirm?.(tmpStart, tmpEnd);
    onClose?.();
  };

  const monthLabel = view.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });

  return (
    <div
      className={`absolute top-full mt-2 z-[90] ${align === 'right' ? 'right-0' : 'left-0'}`}
      // prevent bubbling clicks from being seen as "outside" by parent
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
      ref={ref}
    >
      <div className="w-[310px] rounded-2xl bg-white border border-black/10 shadow-soft p-3">
        <div className="flex items-center justify-between mb-2">
          <button onClick={() => setView(new Date(view.getFullYear(), view.getMonth()-1, 1))} className="px-2 py-1 rounded hover:bg-black/5">‹</button>
          <div className="font-medium">{monthLabel}</div>
          <button onClick={() => setView(new Date(view.getFullYear(), view.getMonth()+1, 1))} className="px-2 py-1 rounded hover:bg-black/5">›</button>
        </div>

        <div className="grid grid-cols-7 text-center text-xs opacity-60 mb-1">
          {['Mo','Tu','We','Th','Fr','Sa','Su'].map(d => <div key={d}>{d}</div>)}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {grid.map((d, i) => {
            const disabled = !d || (minDate && d < minDate);
            const isStart = d && tmpStart && sameDay(d, tmpStart);
            const isEnd   = d && tmpEnd && sameDay(d, tmpEnd);
            const inRange = d && between(d, tmpStart, tmpEnd);
            return (
              <button
                key={i}
                disabled={disabled}
                onClick={() => clickDay(d)}
                className={[
                  'h-8 rounded-md text-sm',
                  disabled ? 'opacity-30 cursor-not-allowed' : 'hover:bg-mint/40',
                  isStart || isEnd ? 'bg-oasis text-white hover:!bg-oasis' : '',
                  inRange && !isStart && !isEnd ? 'bg-mint/40' : ''
                ].join(' ')}
              >
                {d ? d.getDate() : ''}
              </button>
            );
          })}
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="text-xs opacity-70">{fmt(tmpStart) || '—'} → {fmt(tmpEnd) || '—'}</div>
          <div className="flex gap-2">
            <button onClick={onClose} className="btn btn-ghost px-3 py-1 text-sm">Cancel</button>
            <button onClick={apply} disabled={!tmpStart || !tmpEnd} className="btn btn-primary px-3 py-1 text-sm disabled:opacity-50">Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default RangeCalendar;
