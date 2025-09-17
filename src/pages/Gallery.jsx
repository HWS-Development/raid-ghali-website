import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Lightbox from '../components/Lightbox';

// One global gallery (swap URLs later)
const ALL_IMAGES = [
  // Rooms
  { id: 'r1', cat: 'rooms',  src: "/images/rooms/L'Atelier Suite1.jpg", alt_en: "L'Atelier Suite", alt_fr: "L'Atelier Suite" },
  { id: 'r2', cat: 'rooms',  src: "/images/rooms/L'Atelier Suite2.jpg", alt_en: "L'Atelier Suite", alt_fr: "L'Atelier Suite" },
  { id: 'r3', cat: 'rooms',  src: "/images/rooms/Roof Suite1.jpg", alt_en: "Roof Suite", alt_fr: "Roof Suite" },
  { id: 'r4', cat: 'rooms',  src: "/images/rooms/Roof Suite2.jpg", alt_en: "Roof Suite", alt_fr: "Roof Suite" },
  { id: 'r5', cat: 'rooms',  src: "/images/rooms/Safran LittleSon Double Room1.jpg", alt_en: "Safran LittleSon Double Room", alt_fr: "Safran LittleSon Double Room" },
  { id: 'r6', cat: 'rooms',  src: "/images/rooms/Safran LittleSon Double Room2.jpg", alt_en: "Safran LittleSon Double Room", alt_fr: "Safran LittleSon Double Room" },
  { id: 'r7', cat: 'rooms',  src: "/images/rooms/Indigo LittleSon Double Room1.jpg", alt_en: "Indigo LittleSon Double Room", alt_fr: "Indigo LittleSon Double Room" },
  { id: 'r8', cat: 'rooms',  src: "/images/rooms/Indigo LittleSon Double Room2.jpg", alt_en: "Indigo LittleSon Double Room", alt_fr: "Indigo LittleSon Double Room" },
  { id: 'r9', cat: 'rooms',  src: "/images/rooms/Magenta Suite1.jpg", alt_en: "Magenta Suite", alt_fr: "Magenta Suite" },
  { id: 'r10', cat: 'rooms',  src: "/images/rooms/Magenta Suite2.jpg", alt_en: "Magenta Suite", alt_fr: "Magenta Suite" },
  // Rooftop
  { id: 't1', cat: 'rooftop',src: '/images/resto2.jpg', alt_en: 'Rooftop restaurant', alt_fr: 'Restaurant rooftop' },
  { id: 't2', cat: 'rooftop',src: '/images/resto1.jpg', alt_en: 'Breakfast with a view', alt_fr: 'Petit-déjeuner avec vue' },
  // Spa
  { id: 's1', cat: 'spa',    src: '/images/spa.jpg', alt_en: 'Hammam & spa', alt_fr: 'Hammam & spa' },
  { id: 's2', cat: 'spa',    src: '/images/spa1.jpg', alt_en: 'Relaxing details', alt_fr: 'Détails relaxants' },
  // Extras
  { id: 'x1', cat: 'extra',  src: '/images/inside.jpg', alt_en: 'Interior', alt_fr: 'Suite intérieure' },
  { id: 'x2', cat: 'extra',src: '/images/tour.jpg', alt_en: 'Visite guide', alt_fr: 'Visites guidées' },
  { id: 'x3', cat: 'extra',src: '/images/breakfast.jpg', alt_en: 'Breakfast', alt_fr: 'petit-déjeuner' }
];

export default function Gallery() {
  const { t, i18n } = useTranslation();
  const L = i18n.language === 'fr' ? 'fr' : 'en';

  const FILTERS = ['all', 'rooms', 'rooftop', 'spa', 'extra'];
  const [filter, setFilter] = useState('all');
  const [lbIndex, setLbIndex] = useState(-1); // -1 = closed

  const images = useMemo(() => {
    const list = filter === 'all' ? ALL_IMAGES : ALL_IMAGES.filter(x => x.cat === filter);
    // remap to current-locale alt
    return list.map(x => ({ src: x.src, alt: L === 'fr' ? x.alt_fr : x.alt_en, cat: x.cat }));
  }, [filter, L]);

  const open = (i) => setLbIndex(i);
  const close = () => setLbIndex(-1);

  return (
    <div className="">
      {/* Hero */}
      <section
        className="relative h-[200px] md:h-[260px] bg-cover bg-center flex items-end"
        style={{ backgroundImage: "url('/images/cover4.jpeg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/20 to-transparent" />
        <div className="container mx-auto max-w-[1200px] px-4 pb-5 relative">
          <h1 className="font-serif text-3xl md:text-4xl text-white drop-shadow-[0_1px_8px_rgba(0,0,0,.35)]">
            {t('gallery.title')}
          </h1>

          {/* Filters */}
          <div className="mt-3 flex flex-wrap gap-2">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`chip ${filter === f ? 'bg-oasis text-white' : 'bg-white/90'}`}
              >
                #{t(`gallery.filters.${f}`)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry grid using CSS columns */}
      <section className="container mx-auto max-w-[1200px] px-4 mt-8">
        {images.length === 0 ? (
          <p className="opacity-70">{t('gallery.empty')}</p>
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 [column-fill:_balance]">
            {images.map((img, i) => (
              <figure
                key={`${img.src}-${i}`}
                className="mb-4 break-inside-avoid cursor-zoom-in rounded-2xl overflow-hidden border border-black/5 shadow-soft bg-white"
                onClick={() => open(i)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-auto block"
                />
                {img.alt && <figcaption className="p-2 text-sm opacity-70">{img.alt}</figcaption>}
              </figure>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox */}
      {lbIndex >= 0 && (
        <Lightbox
          items={images}
          index={lbIndex}
          setIndex={setLbIndex}
          onClose={close}
        />
      )}
    </div>
  );
}
