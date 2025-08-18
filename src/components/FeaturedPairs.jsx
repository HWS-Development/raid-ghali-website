import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function FeaturedPairs({ limit, heading, ctaLink, ctaText, className = '' }) {
  const { t } = useTranslation();
  const items = t('home.featured.items', { returnObjects: true }) || [];
  const list = Array.isArray(items) ? (limit ? items.slice(0, limit) : items) : [];

  if (!list.length) return null;

  return ( 
    <section className={`container mx-auto max-w-[1200px] px-4 py-16 ${className}`}>
      {(heading || ctaLink) && (
        <div className="flex items-end justify-between mb-6">
          {heading ? <h2 className="font-serif text-2xl">{heading}</h2> : <span />}
          {ctaLink && (
            <Link to={ctaLink} className="btn btn-ghost">
              {ctaText || t('discover.see_more')}
            </Link>
          )}
        </div>
      )}

      <div className="grid gap-8">
        {list.map((it, idx) => {
          const imgFirstOnDesktop = idx % 2 === 0;
          const isInternal = String(it.href || '').startsWith('/');
          const Tag = isInternal ? Link : 'a';
          const tagProps = isInternal ? { to: it.href } : { href: it.href, target: '_blank', rel: 'noreferrer' };

          return (
            <Tag
              key={it.id}
              {...tagProps}
              className="grid md:grid-cols-2 gap-0 overflow-hidden rounded-2xl border border-black/5 shadow-soft bg-white hover:shadow-lg transition-shadow"
            >
              <div className={`relative h-56 md:h-full ${imgFirstOnDesktop ? '' : 'md:order-2'}`}>
                <img src={it.image} alt={it.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/25 to-transparent" />
                {it.category && <span className="chip absolute left-3 top-3 bg-white/90">{it.category}</span>}
              </div>

              <div className={`p-6 md:p-8 ${imgFirstOnDesktop ? '' : 'md:order-1'}`}>
                <div className="h-1 w-12 bg-oasis rounded-full mb-3" />
                <h3 className="font-serif text-2xl leading-tight">{it.title}</h3>
                {it.text && <p className="mt-2 opacity-80">{it.text}</p>}
                <div className="mt-5 text-oasis font-medium">{/* Learn more cue on hover */}</div>
              </div>
            </Tag>
          );
        })}
      </div>
    </section>
  );
}
