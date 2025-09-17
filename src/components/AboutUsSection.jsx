import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function AboutUsSection({ className = '' }) {
  const { t } = useTranslation();
  const highlights = t('home.about.highlights', { returnObjects: true }) || [];
  const stats = t('home.about.stats', { returnObjects: true }) || [];

  return (
    <section
      className={`py-16 ${className}`}
      style={{ backgroundColor: 'rgb(223 243 234 / 0.4)' }}
    >
      <div className="container mx-auto max-w-[1200px] px-4">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Text */}
          <div>
            <div className="text-xs uppercase tracking-widest opacity-70">Riad Ghali & SPA</div>
            <h2 className="font-serif text-3xl mt-1">{t('home.about.title')}</h2>
            <p className="opacity-80 mt-3">{t('home.about.intro')}</p>

            <ul className="mt-5 space-y-2">
              {highlights.map((h, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-oasis/15 text-oasis">✓</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex gap-3">
              <Link to="/contact" className="btn btn-primary">{t('home.about.cta_primary')}</Link>
              <Link to="/restaurant-spa" className="btn btn-ghost">{t('home.about.cta_secondary')}</Link>
            </div>
          </div>

          {/* Visual / stats */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <img
                src="/images/spa1.jpeg"
                alt=""
                className="rounded-2xl h-40 md:h-48 w-full object-cover"
                loading="lazy"
              />
              <img
                src="/images/inside.jpg"
                alt=""
                className="rounded-2xl h-40 md:h-48 w-full object-cover"
                loading="lazy"
              />
              <div className="col-span-2 rounded-2xl overflow-hidden border border-black/5 bg-white/90 shadow-soft p-4 md:p-5">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {stats.map((s, i) => (
                    <div key={i} className="text-center">
                      <div className="text-2xl font-serif">{s.value}</div>
                      <div className="text-sm opacity-70">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* soft glow */}
            <div className="pointer-events-none absolute -inset-2 -z-10 blur-2xl bg-gradient-to-br from-terracotta/20 to-oasis/20" />
          </div>
        </div>
      </div>
    </section>
  );
}
