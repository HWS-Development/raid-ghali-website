import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function FeaturedPairs() {
  const { t } = useTranslation();
  const items = t('home.featured.items', { returnObjects: true }) || [];

  if (!items.length) return null;

  return (
    <section className="container mx-auto max-w-[1200px] px-4 py-16">
      <div className="grid gap-8">
        {items.map((it, idx) => {
          const imgFirstOnDesktop = idx % 2 === 0; // alternate like the reference
          return (
            <article
              key={it.id}
              className="grid md:grid-cols-2 gap-0 overflow-hidden rounded-2xl border border-black/5 shadow-soft bg-white"
            >
              {/* Image side */}
              <div className={`relative h-56 md:h-full ${imgFirstOnDesktop ? '' : 'md:order-2'}`}>
                <img
                  src={it.image}
                  alt={it.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/25 to-transparent" />
                <span className="chip absolute left-3 top-3 bg-white/90">{it.category}</span>
              </div>

              {/* Text side */}
              <div className={`p-6 md:p-8 ${imgFirstOnDesktop ? '' : 'md:order-1'}`}>
                <div className="h-1 w-12 bg-oasis rounded-full mb-3" />
                <h3 className="font-serif text-2xl leading-tight">{it.title}</h3>
                {it.text && <p className="mt-2 opacity-80">{it.text}</p>}
                <div className="mt-5">
                  {/* internal Link when href starts with /, otherwise <a> */}
                  {String(it.href || '').startsWith('/') ? (
                    <Link to={it.href} className="inline-flex items-center text-oasis font-medium hover:underline cursor-pointer justify-end w-full pt-4">
                      {t('common.learn_more')}
                    </Link>
                  ) : (
                    <a href={it.href} className="inline-flex items-center text-oasis font-medium hover:underline cursor-pointer justify-end w-full pt-4" target="_blank" rel="noreferrer">
                      {t('common.learn_more')}
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
