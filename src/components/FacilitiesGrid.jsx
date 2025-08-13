import { useTranslation } from 'react-i18next';

const ICONS = {
  wifi: '📶',
  terrace: '🌅',
  rooftop: '🌅',
  spa: '🧖‍♀️',
  hammam: '🧖',
  restaurant: '🍽️',
  airport: '✈️',
  transfer: '🚖',
  central: '📍',
  location: '📍'
};

export default function FacilitiesGrid() {
  const { t } = useTranslation();
  const items = t('home.facilities.items', { returnObjects: true }) || [];

  return (
    <section className="py-16 bg-sand/30">
      <div className="container mx-auto max-w-[1200px] px-4">
        <h2 className="font-serif text-2xl mb-6">{t('home.facilities.title')}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it, i) => {
            const key = it.label.toLowerCase();
            const icon =
              it.icon ||
              Object.keys(ICONS).find(k => key.includes(k)) &&
              ICONS[Object.keys(ICONS).find(k => key.includes(k))] ||
              '✓';

            return (
              <div
                key={i}
                className="rounded-2xl border border-black/5 bg-white shadow-soft p-4 flex items-center gap-4 hover:shadow-lg transition-shadow"
              >
                <div className="h-12 w-12 rounded-xl bg-mint/80 flex items-center justify-center text-xl">
                  {icon}
                </div>
                <div className="font-medium">{it.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
