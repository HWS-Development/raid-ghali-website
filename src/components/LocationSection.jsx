import { useTranslation } from 'react-i18next';

export default function LocationSection() {
  const { t } = useTranslation();
  const distances = t('home.location.distances', { returnObjects: true }) || [];

  return (
    <section className="relative py-16">
      <div className="container mx-auto max-w-[1200px] px-4">
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Copy & chips */}
          <div className="card p-6 md:p-8 overflow-hidden rounded-2xl bg-white border border-black/5 shadow-soft hover:shadow-lg transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-oasis/60">
            <h2 className="font-serif text-2xl mb-2">{t('home.location.title')}</h2>
            <p className="opacity-80">{t('home.location.blurb')}</p>
            <div className="mt-6 grid sm:grid-cols-3 gap-4">
              {distances.map((d, i) => (
                <div key={i} className="rounded-2xl bg-mint p-4 text-center">
                  <div className="text-2xl mb-1">{d.icon}</div>
                  <div className="font-semibold">{d.label}</div>
                  <div className="text-sm opacity-70">{d.time}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex gap-3 ">
              <a
                href="https://maps.app.goo.gl/DLEy4QmNjBkdcfMu6"
                target="_blank" rel="noreferrer"
                className="btn btn-ghost"
              >
                {t('home.location.cta_directions')}
              </a>
            </div>
          </div>

          {/* Map frame */}
          <div className="relative overflow-hidden rounded-2xl bg-white border border-black/5 shadow-soft hover:shadow-lg transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-oasis/60">
            <div className="rounded-2xl border border-black/5 shadow-soft overflow-hidden bg-white">
              {/* fixed height to avoid 'cut' look; iframe fills container */}
              <div className="h-[340px] w-full">
              {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3397.2137810517115!2d-7.9932762245444255!3d31.62799657416496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafee42bc84bf99%3A0x71a18ad9e6af51cf!2sRiad%20Ghali%20%26%20spa!5e0!3m2!1sen!2sus!4v1757939710026!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
                <iframe
                  title="Marrakech Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3397.2137810517115!2d-7.9932762245444255!3d31.62799657416496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafee42bc84bf99%3A0x71a18ad9e6af51cf!2sRiad%20Ghali%20%26%20spa!5e0!3m2!1sen!2sus!4v1757939710026!5m2!1sen!2sus"
                  className="w-full h-full block"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
            {/* soft halo */}
            <div className="pointer-events-none absolute -z-10 inset-0 blur-2xl bg-gradient-to-br from-terracotta/20 to-oasis/20"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
