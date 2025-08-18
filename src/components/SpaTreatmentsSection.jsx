import { useTranslation } from 'react-i18next';

function TreatmentsList({ categories, durationLabel }) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {categories.map((cat) => (
        <div key={cat.id} className="rounded-2xl border border-black/10 bg-white p-5 shadow-soft">
          <h3 className="font-semibold mb-3">{cat.title}</h3>
          <ul className="space-y-3">
            {cat.items.map((it, i) => (
              <li key={i} className="grid grid-cols-[1fr,auto] gap-4 items-start">
                <div>
                  <div className="font-medium">{it.name}</div>
                  {it.desc && <div className="text-sm opacity-70">{it.desc}</div>}
                  {it.duration && (
                    <div className="text-xs opacity-70 mt-1">
                      {durationLabel}: {it.duration}min
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/** Props: showHero (bool), tel, whatsapp, className */
export default function SpaTreatmentsSection({
    anchorId = 'spa',                // <— NEW
    showHero = true,
    // tel = '+212667815538',
    // whatsapp = 'https://wa.me/212667815538',
    className = ''
  }) {
    const { t } = useTranslation();
    const categories = t('restospa.treatments.categories', { returnObjects: true }) || [];
  
    return (
      <section id={anchorId} className={`py-10 scroll-mt-24 ${className}`}>
      <div className="container mx-auto max-w-[1200px] px-4">
        <div className="flex items-end justify-between mb-4">
          <div>
            <div className="text-xs uppercase tracking-widest opacity-60">{t('restospa.labels.spa')}</div>
            <h2 className="font-serif text-2xl">{t('restospa.labels.treatments')}</h2>
          </div>
        {/*   <div className="flex gap-3">
            <a href={`tel:${tel}`} className="btn btn-primary">{t('restospa.cta.call')}</a>
            <a href={whatsapp} target="_blank" rel="noreferrer" className="btn btn-ghost">
              {t('restospa.cta.whatsapp')}
            </a>
          </div> */}
        </div>

        {showHero && (
          <div className="rounded-2xl overflow-hidden shadow-soft mb-6 border border-black/10">
            <img
              alt={t('restospa.labels.spa')}
              className="h-48 md:h-56 w-full object-cover"
              src="https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1600&auto=format&fit=crop"
            />
          </div>
        )}

        <TreatmentsList categories={categories} durationLabel={t('restospa.labels.duration')} />
      </div>
    </section>
  );
}
