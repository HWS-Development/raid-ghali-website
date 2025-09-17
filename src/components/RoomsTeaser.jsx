import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
export default function RoomsTeaser({  onView, className = '', seeAllTo = '/rooms' }) {
    const rooms = [
        {
            id: 'suite-terraka',
            name_en: "L'Atelier Suite",
            name_fr: "L'Atelier Suite",
            size_m2: 15,
            capacity: 3,
            bed: '1 twin bed and 1 queen bed',
            images: [
            "/images/rooms/L'Atelier Suite1.jpeg",
            "/images/rooms/L'Atelier Suite2.jpeg",
            "/images/rooms/L'Atelier Suite3.jpeg",
            "/images/rooms/L'Atelier Suite4.jpeg",
            ],
            amenities: ['AC', 'Garden view', 'Wi-Fi', 'Patio', 'Pool view'],
            description_en: 'With views of the pool and the patio, this suite offers a seating area, a flat-screen TV and a private bathroom with a shower.',
            description_fr: 'Avec vue sur la piscine et le patio, cette suite dispose d’un coin salon, d’une télévision à écran plat et d’une salle de bains privative avec douche.'
        },
        {
            id: 'interior',
            name_en: 'Roof Suite',
            name_fr: 'Roof Suite',
            capacity: 5,
            size_m2: 45,
            bed: '3 twin beds & 1 queen bed',
            images: [
            "/images/rooms/Roof Suite1.jpeg",
            "/images/rooms/Roof Suite2.jpeg",
            "/images/rooms/Roof Suite3.jpeg",
            ],
            amenities: ['AC', 'Pool view', 'Wi-Fi', 'Patio', 'Bathtub or shower', 'City view', 'Terrace'],
            description_en: 'This 45 sqm suite features two rooms, a bathroom, air conditioning and satellite TV. It is decorated in a Moroccan style indigo theme.',
            description_fr: 'Cette suite de 45 m² comprend deux pièces, une salle de bains, la climatisation et une télévision par satellite. Elle est décorée dans un style marocain aux tons indigo.'
        },
        {
            id: 'rooftop',
            name_en: 'Safran LittleSon Double Room',
            name_fr: 'Safran LittleSon Double Room',
            capacity: 3,
            size_m2: 15,
            bed: '1 twin bed and 1 queen bed',
            images: [
            "/images/rooms/Safran LittleSon Double Room1.jpeg",
            "/images/rooms/Safran LittleSon Double Room2.jpeg",
            "/images/rooms/Safran LittleSon Double Room3.jpeg",
            ],
            amenities: ['AC', 'Wi-Fi', 'Patio', 'Inner courtyard view'],
            description_en: 'This triple room is connected to the main building by an upstairs hallway, is decorated in a Moroccan saffron theme, offers a private bathroom and features air conditioning as well as a satellite TV.',
            description_fr: 'Cette chambre triple, reliée au bâtiment principal par un couloir à l’étage, est décorée dans un thème marocain safran. Elle dispose d’une salle de bains privative, de la climatisation et d’une télévision par satellite.'
        },
        {
            id: 'rooftop1',
            name_en: 'Indigo LittleSon Double Room',
            name_fr: 'Indigo LittleSon Double Room',
            capacity: 2,
            size_m2: 13,
            bed: '1 queen bed',
            images: [
            "/images/rooms/Indigo LittleSon Double Room1.jpeg",
            "/images/rooms/Indigo LittleSon Double Room2.jpeg",
            ],
            amenities: ['AC', 'Wi-Fi', 'Patio', 'Inner courtyard view'],
            description_en: 'This standard double room is connected to the main building by the upstairs hallway. It is decorated in Moroccan style Berber theme and offers a seating are, private bathroom, has air conditioning and a satellite TV.',
            description_fr: 'Cette chambre double standard, reliée au bâtiment principal par le couloir à l’étage, est décorée dans un style marocain berbère. Elle comprend un coin salon, une salle de bains privative, la climatisation et une télévision par satellite.'
        },
        ];
  const { t, i18n } = useTranslation();
  const L = i18n.language === 'fr' ? 'fr' : 'en';

  const label = (r) => (L === 'fr' ? r.name_fr : r.name_en);
  const desc  = (r) => (L === 'fr' ? r.description_fr : r.description_en);

  return (
    <section className={`container mx-auto max-w-[1200px] px-4 py-16 ${className}`}>
      <div className="flex items-end justify-between mb-6">
        <h2 className="font-serif text-2xl">{t('rooms.heading')}</h2>
        <Link to={seeAllTo} className="btn btn-ghost">{t('common.see_all')}</Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {rooms.map((r) => (
          <button
            key={r.id}
            onClick={() => onView?.(r)}
            className="group text-left overflow-hidden rounded-2xl bg-white border border-black/5 shadow-soft hover:shadow-lg transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-oasis/60"
          >
            {/* Image + overlay chips */}
            <div className="relative h-48">
              <img
                src={r.images?.[0]}
                alt={label(r)}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
              {/* subtle gradient bottom for readability */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute left-3 bottom-3 flex gap-2">
                {r.size_m2 ? (
                  <span className="chip bg-white/90 text-sm">{r.size_m2}m²</span>
                ) : null}
                {typeof r.capacity !== 'undefined' ? (
                  <span className="chip bg-white/90 text-sm">{t('rooms.capacity')}: {r.capacity}</span>
                ) : null}
              </div>
            </div>

            {/* Body */}
            <div className="p-5">
              <h3 className="font-serif text-lg md:text-xl leading-snug">{label(r)}</h3>
              {desc(r) ? (
                <p className="mt-1 text-sm opacity-80 line-clamp-2">{desc(r)}</p>
              ) : null}

              <div className="mt-4 ">
                <span className="text-sm opacity-70">
                  {r.bed}
                </span>
                <span
                  onClick={(e) => { e.stopPropagation(); onView?.(r); }}
                  className="inline-flex items-center text-oasis font-medium hover:underline cursor-pointer justify-end w-full pt-4"
                >
                  {t('rooms.view_room')} →
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
