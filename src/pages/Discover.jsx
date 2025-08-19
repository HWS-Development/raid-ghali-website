import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FeatureList from '../components/FeatureList';
import SpaTreatmentsSection from '../components/SpaTreatmentsSection';
import SectionWaveBottom from '../components/SectionWaveBottom';

export default function Discover() {
  const { t } = useTranslation();
  const features = t('home.featured.items', { returnObjects: true }) || [];
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [location]);
  
  return (
    <div className="pb-16">
      {/* Hero with gentle overlay */}
      <section
        className="relative h-[200px] md:h-[260px] bg-cover bg-center flex items-end"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1920&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/20 to-transparent" />
        <div className="container mx-auto max-w-[1200px] px-4 pb-5 relative">
          <h1 className="font-serif text-3xl md:text-4xl text-white drop-shadow-[0_1px_8px_rgba(0,0,0,.35)]">
            {t('discover.title')}
          </h1>
          <p className="text-white/90 mt-2 max-w-[820px]">{t('discover.intro')}</p>
        </div>
      </section>

      
      {/* TOP BAND: switch to bg-mint/40 and add wave to the next (sand) section */}
      <section className="bg-mint/25 py-12">
        <div className="container mx-auto max-w-[1200px] px-4">
          <FeatureList items={features} />
        </div>
      </section>

      {/* SECOND BAND: sand/25 -> white, add wave to white */}
      <section className="relative bg-mint/40">
      <SpaTreatmentsSection anchorId="spa" showHero={false} className="pt-12 pb-20" />
        {/* curve to page background (white) */}
        <SectionWaveBottom fillClass="text-white" />
      </section>
    </div>
  );
}
