import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import RoomQuickView from '../components/RoomQuickView';
import ROOMS from '../data/rooms'; 

// ---------- Local rooms data (no /data folder) ----------


// ---------- Small helper components ----------
function Stat({ label, value }) {
  return (
    <div className="text-xs text-gray-600">
      <span className="opacity-70">{label}:</span> <span className="font-medium">{value}</span>
    </div>
  );
}

function ListingCard({ room, index, onView, t, lang }) {
  const name = lang === 'fr' ? room.name_fr : room.name_en;
  const desc = lang === 'fr' ? room.description_fr : room.description_en;

  // alternate the float card side like old site (left/right)
  const floatOnRight = index % 2 === 0;

  return (
    <article className="relative rounded-2xl overflow-hidden shadow-soft bg-white">
      {/* image block */}
      <div className="relative">
        <img
          src={room.images[0]}
          alt={name}
          className="w-full h-[260px] md:h-[320px] object-cover"
        />

        {/* floating info card */}
        <div
          className={[
            'absolute top-6',
            floatOnRight ? 'right-6' : 'left-6',
            'bg-white rounded-xl shadow-soft w-[85%] md:w-[420px] max-w-[90%] border border-black/5'
          ].join(' ')}
        >
          {/* accent bar */}
          <div className="h-1.5 w-16 bg-oasis rounded-tl-xl rounded-tr-xl" />

          <div className="p-4 md:p-5">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-serif text-xl leading-tight">{name}</h3>
            </div>

            <p className="mt-2 text-sm opacity-80 line-clamp-3">{desc}</p>

            <div className="mt-3 grid grid-cols-3 gap-2">
              {room.size_m2 ? <Stat label={t('rooms.size')} value={`${room.size_m2}m²`}/> : ''}
              <Stat label={t('rooms.bed')} value={room.bed} />
              {room.capacity ? <Stat label={t('rooms.capacity')} value={room.capacity} /> : ''}
            </div>

            <div className="mt-4 flex gap-3">
                <a
                href='https://riad-ghali-spa.hotelrunner.com/bv3/search'
                target="_blank"
                  className="inline-flex items-center text-oasis font-medium hover:underline cursor-pointer w-full pt-4"
                >
                  {t('nav.book')}
                </a>
                <span
                  onClick={(e) => { e.stopPropagation(); onView?.(room); }}
                  className="inline-flex items-center text-oasis font-medium hover:underline cursor-pointer justify-end w-full pt-4"
                >
                  {t('rooms.view_room')} →
                </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

// ---------- Page ----------
export default function Rooms() {
  const { t, i18n } = useTranslation();
  const [selected, setSelected] = useState(null);
  const lang = i18n.language === 'fr' ? 'fr' : 'en';

  const rooms = useMemo(() => ROOMS, []);

  return (
    <div className="pb-16">
      {/* Top banner like old site */}
      <section
        className="h-[200px] md:h-[260px] bg-cover bg-center flex items-end"
        style={{
          backgroundImage:
            "url('/images/cover1.jpeg')"
        }}
      >
        <div className="container mx-auto max-w-[1200px] px-4 pb-6">
          <h1 className="font-serif text-3xl md:text-4xl text-white drop-shadow-[0_1px_8px_rgba(0,0,0,.35)]">
            {t('rooms.heading')}
          </h1>
        </div>
      </section>

      {/* List like the old vertical layout */}
      <section className="container mx-auto max-w-[1000px] px-4 mt-10 space-y-10">
        {rooms.map((room, idx) => (
          <ListingCard
            key={room.id}
            room={room}
            index={idx}
            onView={setSelected}
            t={t}
            lang={lang}
          />
        ))}

      </section>

      {/* Quick View modal */}
      {selected && <RoomQuickView room={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
