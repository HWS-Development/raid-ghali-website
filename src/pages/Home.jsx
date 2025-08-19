import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BookingForm from '../components/BookingForm';
import FacilitiesGrid from '../components/FacilitiesGrid';
import ReviewsSlider from '../components/ReviewsSlider';
import LocationSection from '../components/LocationSection';
import RoomQuickView from '../components/RoomQuickView';
import FeaturedPairs from '../components/FeaturedPairs';
import ServicesTeasers from '../components/ServicesTeasers';
import AboutUsSection from '../components/AboutUsSection';
import RoomsTeaser from '../components/RoomsTeaser';


export default function Home() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(null);

  return (
    <>
      {/* Hero + Booking */}
      <section className="relative">
        <div
          className="h-[52vh] md:h-[64vh] bg-center bg-cover"
          style={{ backgroundImage: "url(/images/interior.jpg)" }}
          aria-label="Hero"
        />
        <div className="container mx-auto max-w-[1200px] px-4 -mt-12 md:-mt-16">
          <div className="rounded-2xl p-2 bg-gradient-to-r from-terracotta/30 to-oasis/30">
            <BookingForm className="md:p-1" />
          </div>
        </div>
        <div className="container mx-auto max-w-[1200px] px-4 py-8">
          <h1 className="font-serif text-3xl md:text-4xl">{t('hero.title')}</h1>
        </div>
      </section>

      {/* Rooms teaser */}
      <RoomsTeaser onView={setSelected} seeAllTo="/rooms" />


      <FacilitiesGrid />
      <section className="bg-mint/40 py-16">
        <div className="container mx-auto max-w-[1200px] px-4">
          <div className="flex items-end justify-between mb-6">
            <h2 className="font-serif text-2xl">{t('home.reviews.title')}</h2>
            <span className="chip">{t('home.reviews.average')}: ★★★★★</span>
          </div>
          <ReviewsSlider />
        </div>
      </section>
      <LocationSection />

      {/* Teasers: Restaurant & Spa + Gallery */}
      <ServicesTeasers />
      <AboutUsSection />
      <FeaturedPairs
        limit={2}
        heading={t('discover.title')}
        ctaLink="/discover"
        ctaText={t('common.see_all')}
      />
      {/* Quick-View Modal */}
      {selected && <RoomQuickView room={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
