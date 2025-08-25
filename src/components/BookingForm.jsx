// src/components/BookingForm.jsx
import React, { useEffect, useMemo, useRef, useState, forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { buildBookingUrl, defaultDates } from '../utils/booking';

/* =========================
   Small date utilities
   ========================= */
const fmt = (d) => (d
  ? `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  : '');
const parse = (s) => (s ? new Date(`${s}T00:00:00`) : null);
const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
const sameDay = (a, b) =>
  !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
const between = (d, a, b) => !!a && !!b && d >= a && d <= b;

/* =========================
   Field wrapper (positioned)
   ========================= */
const Field = forwardRef(function Field({ label, children, onClick }, ref) {
  return (
    <label
      ref={ref}
      onClick={onClick}
      className="relative flex items-center gap-3 bg-white/80 rounded-xl border border-black/10 px-3 py-2 cursor-text"
    >
      <div className="text-xs opacity-70 w-20 shrink-0">{label}</div>
      <div className="flex-1">{children}</div>
    </label>
  );
});

/* =========================
   Range calendar popover
   ========================= */
const RangeCalendar = forwardRef(function RangeCalendar(
  { start, end, minDate, onConfirm, onClose, align = 'left' },
  ref
) {
  const [view, setView] = useState(start || new Date());
  const [tmpStart, setTmpStart] = useState(start || null);
  const [tmpEnd, setTmpEnd] = useState(end || null);

  // Close on ESC
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose?.();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const first = new Date(view.getFullYear(), view.getMonth(), 1);
  const startWD = (first.getDay() + 6) % 7; // Monday = 0
  const dim = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
  const grid = [];
  for (let i = 0; i < startWD; i++) grid.push(null);
  for (let d = 1; d <= dim; d++) grid.push(new Date(view.getFullYear(), view.getMonth(), d));

  const clickDay = (d) => {
    if (!d || (minDate && d < minDate)) return;
    if (!tmpStart || (tmpStart && tmpEnd)) { setTmpStart(d); setTmpEnd(null); return; }
    if (d < tmpStart) { setTmpEnd(tmpStart); setTmpStart(d); return; }
    if (sameDay(d, tmpStart)) { setTmpEnd(addDays(d, 1)); return; } // at least 1 night
    setTmpEnd(d);
  };

  const apply = () => {
    if (tmpStart && tmpEnd) onConfirm?.(tmpStart, tmpEnd);
    onClose?.();
  };

  const monthLabel = view.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });

  return (
    <div
      className={`absolute top-9 mt-2 z-[900] ${align === 'right' ? 'right-0' : 'left-0'}`}
      // make clicks inside the popover NOT count as “outside”
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
      ref={ref}
    >
      <div className="w-[310px] rounded-2xl bg-white border border-black/10 shadow-soft p-3">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <button type="button"
            onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))}
            className="px-2 py-1 rounded hover:bg-black/5"
            aria-label="Previous month"
          >
            ‹
          </button>
          <div className="font-medium">{monthLabel}</div>
          <button type="button"
            onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))}
            className="px-2 py-1 rounded hover:bg-black/5"
            aria-label="Next month"
          >
            ›
          </button>
        </div>

        {/* Weekdays */}
        <div className="grid grid-cols-7 text-center text-xs opacity-60 mb-1">
          {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        {/* Days */}
        <div className="grid grid-cols-7 gap-1">
          {grid.map((d, i) => {
            const disabled = !d || (minDate && d < minDate);
            const isStart = d && tmpStart && sameDay(d, tmpStart);
            const isEnd = d && tmpEnd && sameDay(d, tmpEnd);
            const inRange = d && between(d, tmpStart, tmpEnd);
            return (
              <button type="button"
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

        {/* Footer */}
        <div className="mt-3 flex items-center justify-between">
          <div className="text-xs opacity-70">
            {fmt(tmpStart) || '—'} → {fmt(tmpEnd) || '—'}
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={onClose} className="btn btn-ghost px-3 py-1 text-sm">Cancel</button>
            <button type="button"
              onClick={apply}
              disabled={!tmpStart || !tmpEnd}
              className="btn btn-primary px-3 py-1 text-sm disabled:opacity-50"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

/* =========================
   Booking form (exports)
   ========================= */
export default function BookingForm({ className = '' }) {
  const { t } = useTranslation();

  // form state
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const [adults, setAdults] = useState(2);
  const [promo, setPromo] = useState('');
  const [showPromo, setShowPromo] = useState(false);

  // popover state
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState('checkin'); // 'checkin' | 'checkout'

  // refs for outside click
  const checkinRef = useRef(null);
  const checkoutRef = useRef(null);
  const popoverRef = useRef(null);

  // Init defaults / saved
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('booking') || '{}');
    if (saved.checkin && saved.checkout) {
      setCheckin(saved.checkin);
      setCheckout(saved.checkout);
      setAdults(saved.adults ?? 2);
      setPromo(saved.promo ?? '');
    } else {
      const d = defaultDates();
      setCheckin(d.checkin);
      setCheckout(d.checkout);
    }
  }, []);

  // computed
  const todayStr = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const today = useMemo(() => parse(todayStr), [todayStr]);

  // outside click to close
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      const el = e.target;
      const insidePopover = popoverRef.current?.contains(el);
      const insideCheckin = checkinRef.current?.contains(el);
      const insideCheckout = checkoutRef.current?.contains(el);
      if (!insidePopover && !insideCheckin && !insideCheckout) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  // handlers
  const stepAdults = (delta) => () =>
    setAdults((v) => Math.max(1, Math.min(10, parseInt(v || 0, 10) + delta)));

  const submit = (e) => {
    e.preventDefault();
    const payload = { checkin, checkout, adults, promoCode: promo.trim() };
    localStorage.setItem('booking', JSON.stringify({ ...payload, promo: payload.promoCode }));
    window.open(buildBookingUrl(payload), '_blank');
  };

  const openPicker = (which) => { setAnchor(which); setOpen(true); };
  const onConfirmRange = (startDate, endDate) => {
    setCheckin(fmt(startDate));
    setCheckout(fmt(endDate));
    setOpen(false);
  };

  return (
    <form
      id="booking-widget"
      onSubmit={submit}
      className={`relative rounded-2xl bg-white/75 backdrop-blur border border-white/60 shadow-soft ${className}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-[1fr,1fr,auto,auto] gap-3 p-3 md:p-4">
        {/* Check-in */}
        <Field ref={checkinRef} label={t('booking.checkin')} onClick={() => openPicker('checkin')}>
          <input
            type="text"
            readOnly
            value={checkin}
            placeholder={todayStr}
            className="w-full bg-transparent outline-none cursor-pointer"
          />
          {open && anchor === 'checkin' && (
            <RangeCalendar
              ref={popoverRef}
              start={parse(checkin)}
              end={parse(checkout)}
              minDate={today}
              align="left"
              onConfirm={onConfirmRange}
              onClose={() => setOpen(false)}
            />
          )}
        </Field>

        {/* Check-out */}
        <Field ref={checkoutRef} label={t('booking.checkout')} onClick={() => openPicker('checkout')}>
          <input
            type="text"
            readOnly
            value={checkout}
            placeholder={fmt(addDays(today, 1))}
            className="w-full bg-transparent outline-none cursor-pointer"
          />
          {open && anchor === 'checkout' && (
            <RangeCalendar
              ref={popoverRef}
              start={parse(checkin)}
              end={parse(checkout)}
              minDate={today}
              align="right"
              onConfirm={onConfirmRange}
              onClose={() => setOpen(false)}
            />
          )}
        </Field>

        {/* Adults */}
        <div className="flex items-center gap-3 bg-white/80 rounded-xl border border-black/10 px-3 py-2">
          <div className="text-xs opacity-70 w-16">{t('booking.adults')}</div>
          <div className="flex items-center rounded-lg border border-black/10 overflow-hidden">
            <button type="button" onClick={stepAdults(-1)} className="px-2">−</button>
            <input readOnly className="w-10 text-center outline-none" value={adults} />
            <button type="button" onClick={stepAdults(+1)} className="px-2">+</button>
          </div>
        </div>

        {/* Submit */}
        <div className="flex">
          <button className="inline-flex items-center rounded-xl px-5 py-2 bg-oasis text-white text-base md:text-lg shadow-soft hover:brightness-95 w-full">
            {t('booking.check')}
          </button>
        </div>
      </div>

      {/* Promo reveal */}
      <div className="px-4 pb-3">
        {!showPromo ? (
          <button type="button" onClick={() => setShowPromo(true)} className="text-sm text-oasis hover:underline">
            {t('booking.promo')}
          </button>
        ) : (
          <div className="mt-2 flex items-center gap-3">
            <input
              placeholder="PROMO"
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
              className="flex-1 rounded-xl border border-black/10 px-3 py-2"
            />
            <button type="button" onClick={() => setShowPromo(false)} className="btn btn-ghost">×</button>
          </div>
        )}
      </div>
    </form>
  );
}
