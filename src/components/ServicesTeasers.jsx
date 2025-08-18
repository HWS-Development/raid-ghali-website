import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function ServicesTeasers() {
  const { t } = useTranslation();

  return (
    <section className="container mx-auto max-w-[1200px] px-4 pb-16">
        <div className="grid md:grid-cols-2 gap-6">
        <Link
          to="/restaurant"
          className="group overflow-hidden rounded-2xl bg-white border border-black/5 shadow-soft hover:shadow-lg transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-oasis/60"
        >
          <img
            alt=""
            className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            src="/images/resto.jpg"
          />
          <div className="p-6">
            <h3 className="font-serif text-xl">{t('home.teasers.restospa_title')}</h3>
            <p className="opacity-80 mt-1">{t('home.teasers.restospa_text')}</p>
          </div>
        </Link>
        
        <Link
          to="/gallery"
          className="group overflow-hidden rounded-2xl bg-white border border-black/5 shadow-soft hover:shadow-lg transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-oasis/60"
        >
          <img
            alt=""
            className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            src="/images/tour.jpg"
          />
          <div className="p-6">
            <h3 className="font-serif text-xl">{t('home.teasers.guide_title')}</h3>
            <p className="opacity-80 mt-1">{t('home.teasers.guide_text')}</p>
          </div>
        </Link>

        </div>
      </section>
  );
}
