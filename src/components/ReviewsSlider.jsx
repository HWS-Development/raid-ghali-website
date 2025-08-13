import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function ReviewsSlider({ autoplayMs = 5000 }) {
  const { t } = useTranslation();
  const items = t('home.reviews.items', { returnObjects: true }) || [];
  const [index, setIndex] = useState(0);
  const trackRef = useRef(null);
  const [hover, setHover] = useState(false);

  const next = () => setIndex(i => (i + 1) % items.length);
  const prev = () => setIndex(i => (i - 1 + items.length) % items.length);

  useEffect(() => {
    if (!items.length || hover) return;
    const id = setInterval(next, autoplayMs);
    return () => clearInterval(id);
  }, [autoplayMs, items.length, hover]);

  useEffect(() => {
    if (trackRef.current) trackRef.current.style.transform = `translateX(-${index * 100}%)`;
  }, [index]);

  if (!items.length) return null;

  return (
    <div
      className="relative max-w-[960px] mx-auto"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-soft">
        <div
          ref={trackRef}
          className="flex transition-transform duration-500 ease-out"
          style={{ width: `${items.length * 100}%` }}
          aria-live="polite"
        >
          {items.map((r, i) => (
            <div key={i} className="w-full flex-shrink-0">
              <div className="p-6 md:p-8">
                <div className="text-brass text-xl mb-2">
                  {'★'.repeat(r.stars)}{'☆'.repeat(5 - r.stars)}
                </div>
                <p className="text-lg md:text-xl leading-relaxed">“{r.text}”</p>
                <div className="mt-4 text-sm opacity-70">— {r.name} · {r.source}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Arrows — outside the card so they never cover text */}
      <button
        onClick={prev}
        aria-label="Previous"
        className="hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow-soft items-center justify-center"
      >‹</button>
      <button
        onClick={next}
        aria-label="Next"
        className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow-soft items-center justify-center"
      >›</button>

      {/* Mobile controls below */}
      <div className="mt-4 flex items-center justify-center gap-3 md:hidden">
        <button onClick={prev} className="h-9 w-9 rounded-full bg-white shadow-soft">‹</button>
        <div className="flex gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2.5 w-2.5 rounded-full ${i === index ? 'bg-oasis' : 'bg-oasis/30'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        <button onClick={next} className="h-9 w-9 rounded-full bg-white shadow-soft">›</button>
      </div>

      {/* Dots (desktop) */}
      <div className="mt-4 hidden md:flex justify-center gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2.5 w-2.5 rounded-full ${i === index ? 'bg-oasis' : 'bg-oasis/30'}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
