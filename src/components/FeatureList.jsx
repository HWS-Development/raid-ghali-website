import { Link } from 'react-router-dom';

/**
 * FeatureList – Alternating rows, white cards
 * Props: items (array from i18n), className
 */
export default function FeatureList({ items = [], className = '' }) {
  const list = Array.isArray(items) ? items : [];

  if (!list.length) return null;

  return (
    <div className={`grid gap-6 ${className}`}>
      {list.map((it, idx) => {
        const reverse = idx % 2 === 1;
        const isInternal = String(it.href || '').startsWith('/');
        const Tag = isInternal ? Link : 'a';
        const tagProps = isInternal ? { to: it.href } : { href: it.href, target: '_blank', rel: 'noreferrer' };

        return (
          <Tag
            key={it.id || idx}
            {...tagProps}
            className={[
              'grid md:grid-cols-2 overflow-hidden rounded-2xl border border-black/5 bg-white shadow-soft hover:shadow-lg transition-shadow',
              reverse ? 'md:[&>*:first-child]:order-2' : ''
            ].join(' ')}
          >
            {/* Image */}
            <div className="relative h-44 md:h-52">
              <img src={it.image} alt={it.title} className="absolute inset-0 h-full w-full object-cover" />
              {it.category && (
                <span className="chip bg-white/90 absolute left-3 top-3">{it.category}</span>
              )}
            </div>

            {/* Text */}
            <div className="p-6 md:p-8">
              <div className="h-1 w-12 bg-oasis rounded-full mb-3" />
              <h3 className="font-serif text-xl md:text-2xl leading-tight">{it.title}</h3>
              {it.text && <p className="mt-2 opacity-80">{it.text}</p>}
              <div className="mt-4 text-oasis font-medium">
                {/* subtle “learn more” cue via hover, no extra button needed */}
              </div>
            </div>
          </Tag>
        );
      })}
    </div>
  );
}
