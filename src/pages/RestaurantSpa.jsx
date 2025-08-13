import { useTranslation } from 'react-i18next';

function SectionHeader({ overline, title, actions }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 mb-4">
      <div>
        {overline && <div className="text-xs tracking-widest uppercase opacity-60">{overline}</div>}
        <h2 className="font-serif text-2xl">{title}</h2>
      </div>
      {actions}
    </div>
  );
}

function MenuList({ sections }) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {sections.map((sec) => (
        <div key={sec.id} className="rounded-2xl border border-black/10 bg-white/90 p-4 shadow-soft">
          <ul className="space-y-3">
            {sec.items.map((it, i) => (
              <li key={i} className="grid grid-cols-[1fr,auto] gap-4 items-start">
                <div>
                  <div className="font-medium">{it.name}</div>
                  {it.desc && <div className="text-sm opacity-70">{it.desc}</div>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function TreatmentsList({ categories }) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {categories.map((cat) => (
        <div key={cat.id} className="rounded-2xl border border-black/10 bg-white/90 p-4 shadow-soft">
          <ul className="space-y-3">
            {cat.items.map((it, i) => (
              <li key={i} className="grid grid-cols-[1fr,auto] gap-4 items-start">
                <div>
                  <div className="font-medium">{it.name}</div>
                  {it.desc && <div className="text-sm opacity-70">{it.desc}</div>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default function RestaurantSpa() {
  const { t } = useTranslation();
  const tel = '+212667815538';
  const whatsapp = 'https://wa.me/212667815538';

  const menuSections = (t('restospa.menu.sections', { returnObjects: true }) || []).map(s => ({
    ...s, title: s.title, items: s.items
  }));
  const treatmentCats = (t('restospa.treatments.categories', { returnObjects: true }) || []).map(c => ({
    ...c, title: c.title, items: c.items
  }));

  return (
    <div className="pb-12">
      {/* Hero with gradient overlay to reduce white feeling */}
      <section
        className="relative h-[220px] md:h-[280px] bg-cover bg-center flex items-end"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1600&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/20 to-transparent" />
        <div className="container mx-auto max-w-[1200px] px-4 pb-5 relative">
          <h1 className="font-serif text-3xl md:text-4xl text-white drop-shadow-[0_1px_8px_rgba(0,0,0,.35)]">
            {t('restospa.title')}
          </h1>
          <p className="text-white/90 mt-2 max-w-[720px]">{t('restospa.intro')}</p>
          <div className="mt-3 flex gap-2">
            <a href="#restaurant" className="chip bg-white/90">#{t('restospa.labels.restaurant')}</a>
            <a href="#spa" className="chip bg-white/90">#{t('restospa.labels.spa')}</a>
          </div>
        </div>
      </section>

      {/* MENU BAND (mint tint) */}
      <section id="restaurant" className="py-10 bg-mint/25">
        <div className="container mx-auto max-w-[1200px] px-4">
          <SectionHeader
            overline={t('restospa.labels.restaurant')}
            title={t('restospa.labels.menu')}
            actions={
              <div className="flex gap-3">
                <a href={`tel:${tel}`} className="btn btn-primary">{t('restospa.cta.call')}</a>
                <a href={whatsapp} className="btn btn-ghost" target="_blank" rel="noreferrer">
                  {t('restospa.cta.whatsapp')}
                </a>
              </div>
            }
          />
          <div className="rounded-2xl overflow-hidden shadow-soft mb-5 border border-black/10">
            <img
              alt={t('restospa.labels.restaurant')}
              className="h-48 md:h-56 w-full object-cover"
              src="/images/resto2.jpg"
            />
          </div>
          <MenuList sections={menuSections} />
        </div>
      </section>

      {/* SPA BAND (sand tint) */}
      <section id="spa" className="py-10 bg-sand/25">
        <div className="container mx-auto max-w-[1200px] px-4">
          <SectionHeader
            overline={t('restospa.labels.spa')}
            title={t('restospa.labels.treatments')}
            actions={
              <div className="flex gap-3">
                <a href={`tel:${tel}`} className="btn btn-primary">{t('restospa.cta.call')}</a>
                <a href={whatsapp} className="btn btn-ghost" target="_blank" rel="noreferrer">
                  {t('restospa.cta.whatsapp')}
                </a>
              </div>
            }
          />
          <div className="rounded-2xl overflow-hidden shadow-soft mb-5 border border-black/10">
            <img
              alt={t('restospa.labels.spa')}
              className="h-48 md:h-56 w-full object-cover"
              src="/images/spa.jpg"
            />
          </div>
          <TreatmentsList
            categories={treatmentCats}
          />
        </div>
      </section>
    </div>
  );
}
