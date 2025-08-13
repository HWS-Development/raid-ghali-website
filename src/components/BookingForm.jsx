import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { buildBookingUrl, defaultDates } from '../utils/booking';

function Field({ label, children }) {
  return (
    <label className="flex items-center gap-3 bg-white/80 rounded-xl border border-black/10 px-3 py-2">
      <div className="text-xs opacity-70 w-20 shrink-0">{label}</div>
      <div className="flex-1">{children}</div>
    </label>
  );
}

export default function BookingForm({ className = '' }) {
  const { t } = useTranslation();
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const [adults, setAdults] = useState(2);
  const [promo, setPromo] = useState('');
  const [showPromo, setShowPromo] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('booking') || '{}');
    if (saved.checkin && saved.checkout) {
      setCheckin(saved.checkin); setCheckout(saved.checkout);
      setAdults(saved.adults ?? 2);
      setPromo(saved.promo ?? '');
    } else {
      const d = defaultDates(); setCheckin(d.checkin); setCheckout(d.checkout);
    }
  }, []);

  const today = useMemo(() => new Date().toISOString().slice(0,10), []);
  const minCheckout = useMemo(() => {
    if (!checkin) return today;
    const d = new Date(checkin); d.setDate(d.getDate() + 1);
    return d.toISOString().slice(0,10);
  }, [checkin, today]);

  const stepAdults = (delta) => () =>
    setAdults(v => Math.max(1, Math.min(10, (parseInt(v || 0, 10) + delta))));

  const submit = (e) => {
    e.preventDefault();
    const payload = { checkin, checkout, adults, promoCode: promo.trim() };
    localStorage.setItem('booking', JSON.stringify({ ...payload, promo: payload.promoCode }));
    window.open(buildBookingUrl(payload), '_blank')
  };

  return (
    <form id="booking-widget" onSubmit={submit}
      className={`rounded-2xl bg-white/75 backdrop-blur border border-white/60 shadow-soft ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-[1fr,1fr,auto,auto] gap-3 p-3 md:p-4">
        <Field label={t('booking.checkin')}>
          <input required type="date" min={today} value={checkin}
                 onChange={e=>setCheckin(e.target.value)}
                 className="w-full bg-transparent outline-none" />
        </Field>

        <Field label={t('booking.checkout')}>
          <input required type="date" min={minCheckout} value={checkout}
                 onChange={e=>setCheckout(e.target.value)}
                 className="w-full bg-transparent outline-none" />
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

        <div className="flex">
          <button className="inline-flex items-center rounded-xl px-5 py-2 bg-oasis text-white text-base md:text-lg shadow-soft hover:brightness-95 w-full">
            {t('booking.check')}
          </button>
        </div>
      </div>

      {/* Promo reveal */}
      <div className="px-4 pb-3">
        {!showPromo ? (
          <button type="button" onClick={()=>setShowPromo(true)} className="text-sm text-oasis hover:underline">
            {t('booking.promo')}
          </button>
        ) : (
          <div className="mt-2 flex items-center gap-3">
            <input placeholder="PROMO" value={promo} onChange={e=>setPromo(e.target.value)}
                   className="flex-1 rounded-xl border border-black/10 px-3 py-2" />
            <button type="button" onClick={()=>setShowPromo(false)} className="btn btn-ghost">×</button>
          </div>
        )}
      </div>
    </form>
  );
}
