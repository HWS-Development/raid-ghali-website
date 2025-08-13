import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { buildBookingUrl, defaultDates } from '../utils/booking';

export default function RoomQuickView({ room, onClose }) {
  const { t, i18n } = useTranslation();
  const [idx, setIdx] = useState(0);
  const closeBtnRef = useRef(null);

  // Reset carousel index when a different room opens, set focus, and handle keys
  useEffect(() => {
    if (!room) return;
    setIdx(0);
    closeBtnRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.();
      if (e.key === 'ArrowRight') setIdx(i => (i + 1) % (room.images?.length || 1));
      if (e.key === 'ArrowLeft')  setIdx(i => (i - 1 + (room.images?.length || 1)) % (room.images?.length || 1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [room, onClose]);

  if (!room) return null;

  const name = i18n.language === 'fr' ? room.name_fr : room.name_en;
  const desc = i18n.language === 'fr' ? room.description_fr : room.description_en;

  const book = () => {
    const saved = JSON.parse(localStorage.getItem('booking') || '{}');
    const dates = (!saved.checkin || !saved.checkout)
      ? defaultDates()
      : { checkin: saved.checkin, checkout: saved.checkout };

    const url = buildBookingUrl({
      ...dates,
      adults: saved.adults || 2,
      promoCode: saved.promo || ''
    });
    window.location.assign(url);
  };

  const next = () => setIdx(i => (i + 1) % room.images.length);
  const prev = () => setIdx(i => (i - 1 + room.images.length) % room.images.length);

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute inset-x-4 md:inset-x-0 md:left-1/2 md:-translate-x-1/2 top-10 md:top-12 md:w-[840px] bg-white rounded-2xl shadow-soft overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* Carousel */}
          <div className="relative h-60 md:h-full bg-black/5">
            <img src={room.images[idx]} alt={name} className="w-full h-full object-cover" />
            {room.images.length > 1 && (
              <>
                <button onClick={prev} aria-label="Prev"
                  className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 shadow-soft">‹</button>
                <button onClick={next} aria-label="Next"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 shadow-soft">›</button>
              </>
            )}
          </div>

          {/* Info */}
          <div className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-2xl">{name}</h3>
              <button ref={closeBtnRef} onClick={onClose} aria-label={t('common.close')}
                className="rounded-lg px-2 py-1 text-charcoal/70 hover:bg-black/5">✕</button>
            </div>
            <p className="mt-2 opacity-80">{desc}</p>

            <ul className="mt-4 text-sm grid grid-cols-2 gap-2">
              <li><strong>{t('rooms.size')}:</strong> {room.size_m2}m²</li>
              <li><strong>{t('rooms.bed')}:</strong> {room.bed}</li>
              <li><strong>{t('rooms.capacity')}:</strong> {room.capacity}</li>
            </ul>

            <div className="mt-4 flex flex-wrap gap-2">
              {room.amenities?.map(a => <span key={a} className="chip">{a}</span>)}
            </div>

            <div className="mt-6 flex gap-3">
              <button onClick={book} className="btn btn-primary w-full">{t('rooms.book_now')}</button>
              <button onClick={onClose} className="btn btn-ghost w-full">{t('common.close')}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
