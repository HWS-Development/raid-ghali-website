import { useEffect, useRef } from 'react';

export default function Lightbox({ items, index, onClose, setIndex }) {
  const closeBtnRef = useRef(null);
  const len = items.length;
  const current = items[index];

  const prev = () => setIndex((index - 1 + len) % len);
  const next = () => setIndex((index + 1) % len);

  // esc/arrow keys + focus on mount
  useEffect(() => {
    closeBtnRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, len]);

  // preload neighbors
  useEffect(() => {
    const a = new Image(); a.src = items[(index + 1) % len]?.src || '';
    const b = new Image(); b.src = items[(index - 1 + len) % len]?.src || '';
  }, [index, len, items]);

  if (!len) return null;

  return (
    <div className="fixed inset-0 z-[70]">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      <div className="absolute inset-0 flex items-center justify-center p-4">
        <figure className="relative max-w-[90vw] max-h-[85vh]">
          <img
            src={current.src}
            alt={current.alt}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-2xl shadow-soft bg-black/20"
          />
          {current.alt && (
            <figcaption className="absolute left-0 right-0 -bottom-12 text-center text-white/90 text-sm">
              {current.alt}
            </figcaption>
          )}
        </figure>

        {/* Controls */}
        <button
          ref={closeBtnRef}
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white text-charcoal shadow-soft"
        >✕</button>

        <button
          onClick={prev}
          aria-label="Previous"
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white text-charcoal shadow-soft items-center justify-center"
        >‹</button>

        <button
          onClick={next}
          aria-label="Next"
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white text-charcoal shadow-soft items-center justify-center"
        >›</button>
      </div>
    </div>
  );
}
