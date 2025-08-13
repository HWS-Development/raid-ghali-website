import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import RoomQuickView from '../components/RoomQuickView';
import { buildBookingUrl, defaultDates } from '../utils/booking';

// ---------- Local rooms data (no /data folder) ----------
const ROOMS = [
  {
    id: 'suite-terraka',
    name_en: "L'Atelier Suite",
    name_fr: "L'Atelier Suite",
    size_m2: 15,
    capacity: 3,
    bed: '1 twin bed and 1 queen bed',
    images: [
      "/images/rooms/L'Atelier Suite1.jpg",
      "/images/rooms/L'Atelier Suite2.jpg",
      "/images/rooms/L'Atelier Suite3.jpg",
      "/images/rooms/L'Atelier Suite4.jpg",
    ],
    amenities: ['AC', 'Garden view', 'Wi-Fi', 'Patio', 'Pool view'],
    description_en: 'With views of the pool and the patio, this suite offers a seating area, a flat-screen TV and a private bathroom with a shower.',
    description_fr: 'Avec vue sur la piscine et le patio, cette suite dispose d’un coin salon, d’une télévision à écran plat et d’une salle de bains privative avec douche.'
  },
  {
    id: 'deluxe',
    name_en: 'Magenta Suite',
    name_fr: 'Magenta Suite',
    capacity: 4,
    size_m2: 20,
    bed: '2 twin beds and  queen bed',
    images: [
      "/images/rooms/Magenta Suite1.jpg",
      "/images/rooms/Magenta Suite2.jpg",
      "/images/rooms/L'Atelier Suite4.jpg",
      "/images/rooms/Magenta Suite3.jpg",
    ],
    amenities: ['AC', 'Garden view', 'Wi-Fi', 'Patio', 'Pool view'],
    description_en: 'With views of the patio and the pool, this room offers a Berber-style décor, a fireplace and a seating area. The private bathroom includes a shower.',
    description_fr: 'Offrant une vue sur le patio et la piscine, cette chambre présente une décoration de style berbère, une cheminée et un coin salon. La salle de bains privative comprend une douche.'
  },
  {
    id: 'riad-suite',
    name_en: 'Indigo Twin Room',
    name_fr: 'Indigo Twin Room',
    capacity: 2,
    size_m2: 15,
    bed: 'Comfy beds',
    images: [
      "/images/rooms/Indigo Twin Room1.jpg",
      "/images/rooms/Indigo Twin Room2.jpg",
      "/images/rooms/Indigo Twin Room3.jpg",
    ],
    amenities: ['AC', 'Pool view', 'Wi-Fi', 'Patio', 'Private bathroom'],
    description_en: 'With views of the pool and the patio, this room provides access to a balcony with outdoor furniture. It offers a private bathroom with a shower.',
    description_fr: 'Offrant une vue sur la piscine et le patio, cette chambre donne accès à un balcon doté de mobilier d’extérieur. Elle dispose d’une salle de bains privative avec douche.'
  },
  {
    id: 'twin',
    name_en: 'Safran Suite superior',
    name_fr: 'Safran Suite superior',
    capacity: 4,
    size_m2: 30,
    bed: '2 twin beds and 1 queen bed',
    images: [
      "/images/rooms/Safran Suite superior1.jpg",
      "/images/rooms/Safran Suite superior2.jpg",
    ],
    amenities: ['AC', 'Pool view', 'Wi-Fi', 'Patio', 'Bathtub or shower', 'Fireplace'],
    description_en: 'This suite features a large window with moucharabieh, overlooking the pool. It features a private bathroom with a shower, 45 sqm of space, Moroccan-style décor and a flat-screen with satellite channels.',
    description_fr: 'Cette suite dispose d’une grande fenêtre à moucharabieh donnant sur la piscine. Elle comprend une salle de bains privative avec douche, 45 m² d’espace, une décoration de style marocain et une télévision à écran plat recevant les chaînes satellite.'
  },
  {
    id: 'interior',
    name_en: 'Roof Suite',
    name_fr: 'Roof Suite',
    capacity: 5,
    size_m2: 45,
    bed: '3 twin beds & 1 queen bed',
    images: [
      "/images/rooms/Roof Suite1.jpg",
      "/images/rooms/Roof Suite2.jpg",
      "/images/rooms/Roof Suite3.jpg",
    ],
    amenities: ['AC', 'Pool view', 'Wi-Fi', 'Patio', 'Bathtub or shower', 'City view', 'Terrace'],
    description_en: 'This 45 sqm suite features two rooms, a bathroom, air conditioning and satellite TV. It is decorated in a Moroccan style indigo theme.',
    description_fr: 'Cette suite de 45 m² comprend deux pièces, une salle de bains, la climatisation et une télévision par satellite. Elle est décorée dans un style marocain aux tons indigo.'
  },
  {
    id: 'rooftop2',
    name_en: 'Magenta LittleSon Double Room',
    name_fr: 'Magenta LittleSon Double Room',
    capacity: 2,
    size_m2: 12,
    bed: '1 queen bed',
    images: [
      "/images/rooms/Magenta LittleSon Double Room1.jpg",
      "/images/rooms/Magenta LittleSon Double Room2.jpg",
    ],
    amenities: ['AC', 'Wi-Fi', 'Patio', 'Inner courtyard view', 'Bathtub'],
    description_en: 'This luxury double room is connected to the main building by the upstairs hallway, is decorated in Moroccan style following a magenta theme, offers a private bathroom, has air conditioning and satellite TV.',
    description_fr: 'Cette chambre double de luxe, reliée au bâtiment principal par le couloir à l’étage, est décorée dans un style marocain aux tons magenta. Elle dispose d’une salle de bains privative, de la climatisation et d’une télévision par satellite.'
  },
  {
    id: 'rooftop5',
    name_en: 'Double Room',
    name_fr: 'Double Room',
    capacity: 2,
    size_m2: 15,
    bed: '1 full bed',
    images: [
      "/images/rooms/Double Room1.jpg",
      "/images/rooms/Double Room2.jpg",
    ],
    amenities: ['AC', 'Wi-Fi', 'Inner courtyard view'],
    description_en: 'This air-conditioned double room is consisted of of a flat-screen TV with satellite channels and a private bathroom. The unit has 1 bed.',
    description_fr: 'Cette chambre double climatisée comprend une télévision à écran plat avec chaînes satellite ainsi qu’une salle de bains privative. L’hébergement dispose d’un lit.'
  },
  {
    id: 'rooftop3',
    name_en: "L'atelier LittleSon Twin Room",
    name_fr: "L'atelier LittleSon Twin Room",
    capacity: 2,
    size_m2: 12,
    bed: 'Comfy beds',
    images: [
      "/images/rooms/L'atelier LittleSon Twin Room1.jpg",
      "/images/rooms/L'atelier LittleSon Twin Room2.jpg",
      "/images/rooms/L'atelier LittleSon Twin Room3.jpg",
    ],
    amenities: ['AC', 'Wi-Fi', 'Patio', 'Inner courtyard view'],
    description_en: 'This luxury twin room is connected to the main building by the upstairs hallway, is decorated in a Moroccan Berber themes, and features a seating area, private bathroom, has a satellite TV and air conditioning.',
    description_fr: 'Cette chambre double de luxe avec lits jumeaux, reliée au bâtiment principal par le couloir à l’étage, est décorée dans un style marocain berbère. Elle comprend un coin salon, une salle de bains privative, une télévision par satellite et la climatisation.'
  },
  {
    id: 'rooftop1',
    name_en: 'Indigo LittleSon Double Room',
    name_fr: 'Indigo LittleSon Double Room',
    capacity: 2,
    size_m2: 13,
    bed: '1 queen bed',
    images: [
      "/images/rooms/Indigo LittleSon Double Room1.jpg",
      "/images/rooms/Indigo LittleSon Double Room2.jpg",
    ],
    amenities: ['AC', 'Wi-Fi', 'Patio', 'Inner courtyard view'],
    description_en: 'This standard double room is connected to the main building by the upstairs hallway. It is decorated in Moroccan style Berber theme and offers a seating are, private bathroom, has air conditioning and a satellite TV.',
    description_fr: 'Cette chambre double standard, reliée au bâtiment principal par le couloir à l’étage, est décorée dans un style marocain berbère. Elle comprend un coin salon, une salle de bains privative, la climatisation et une télévision par satellite.'
  },
  {
    id: 'rooftop4',
    name_en: 'Suite Room Terrace LittleSon-B',
    name_fr: 'Suite Room Terrace LittleSon-B',
    capacity: 2,
    size_m2: 25,
    bed: '1 queen bed',
    images: [
      "/images/rooms/Suite Room Terrace LittleSon-B1.jpg",
      "/images/rooms/Suite Room Terrace LittleSon-B2.jpg",
    ],
    amenities: ['AC', 'Wi-Fi', 'Terrace', 'Garden view'],
    description_en: 'This suite consists of 1 living room, 1 separate bedroom and 1 bathroom with a shower and free toiletries. Featuring a terrace with garden views, this suite also provides air conditioning and a flat-screen TV with satellite channels. The unit offers 1 bed.',
    description_fr: 'Cette suite se compose d’un salon, d’une chambre séparée et d’une salle de bains avec douche et articles de toilette gratuits. Dotée d’une terrasse offrant une vue sur le jardin, elle comprend également la climatisation et une télévision à écran plat avec chaînes satellite. L’hébergement dispose d’un lit.'
  },
  {
    id: 'rooftop',
    name_en: 'Safran LittleSon Double Room',
    name_fr: 'Safran LittleSon Double Room',
    capacity: 3,
    size_m2: 15,
    bed: '1 twin bed and 1 queen bed',
    images: [
      "/images/rooms/Safran LittleSon Double Room1.jpg",
      "/images/rooms/Safran LittleSon Double Room2.jpg",
      "/images/rooms/Safran LittleSon Double Room3.jpg",
    ],
    amenities: ['AC', 'Wi-Fi', 'Patio', 'Inner courtyard view'],
    description_en: 'This triple room is connected to the main building by an upstairs hallway, is decorated in a Moroccan saffron theme, offers a private bathroom and features air conditioning as well as a satellite TV.',
    description_fr: 'Cette chambre triple, reliée au bâtiment principal par un couloir à l’étage, est décorée dans un thème marocain safran. Elle dispose d’une salle de bains privative, de la climatisation et d’une télévision par satellite.'
  },
  {
    id: 'rooftop6',
    name_en: 'Triple Room - Disability Access',
    name_fr: 'Triple Room - Disability Access',
    capacity: 3,
    size_m2: 20,
    bed: '1 twin bed and 1 full bed',
    images: [
      "/images/rooms/Triple Room - Disability Access1.jpg",
      "/images/rooms/Triple Room - Disability Access2.jpg",
      "/images/rooms/Triple Room - Disability Access3.jpg",
    ],
    amenities: ['AC', 'Wi-Fi', 'Inner courtyard view'],
    description_en: 'This air-conditioned triple room is consisted of of a flat-screen TV with satellite channels and a private bathroom. The unit has 2 beds.',
    description_fr: 'Cette chambre triple climatisée comprend une télévision à écran plat avec chaînes satellite ainsi qu’une salle de bains privative. L’hébergement dispose de deux lits.'
  },
];

// ---------- Small helper components ----------
function Stat({ label, value }) {
  return (
    <div className="text-xs text-gray-600">
      <span className="opacity-70">{label}:</span> <span className="font-medium">{value}</span>
    </div>
  );
}

function ListingCard({ room, index, onView, onBook, t, lang }) {
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
              <Stat label={t('rooms.size')} value={`${room.size_m2}m²`} />
              <Stat label={t('rooms.bed')} value={room.bed} />
              <Stat label={t('rooms.capacity')} value={room.capacity} />
            </div>

            <div className="mt-4 flex gap-3">
                <span
                  onClick={(e) => { e.stopPropagation(); onBook(); }}
                  className="inline-flex items-center text-oasis font-medium hover:underline cursor-pointer w-full pt-4"
                >
                  {t('nav.book')}
                </span>
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

  const onBook = () => {
    const saved = JSON.parse(localStorage.getItem('booking') || '{}');
    const dates =
      !saved.checkin || !saved.checkout
        ? defaultDates()
        : { checkin: saved.checkin, checkout: saved.checkout };

    window.location.assign(
      buildBookingUrl({
        ...dates,
        adults: saved.adults || 2,
        promoCode: saved.promo || ''
      })
    );
  };

  return (
    <div className="pb-16">
      {/* Top banner like old site */}
      <section
        className="h-[200px] md:h-[260px] bg-cover bg-center flex items-end"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1920&auto=format&fit=crop')"
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
            onBook={onBook}
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
