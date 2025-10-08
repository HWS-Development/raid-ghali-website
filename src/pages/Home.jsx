import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
      <HeroSlider />
      <AboutUsSection />
      <div
      style={{ backgroundColor: 'rgb(223 243 234 / 0.4)' }}>
        
      <FeaturedPairs
        limit={2}
        heading={t('discover.title')}
        ctaLink="/discover"
        ctaText={t('common.see_all')}
      />
      </div>

      {/* Rooms teaser */}
      <RoomsTeaser onView={setSelected} seeAllTo="/rooms" />



      <FacilitiesGrid />
      {/* Teasers: Restaurant & Spa + Gallery */}
      <ServicesTeasers />
      <section
          className="bg-[url('/images/inside.jpg')] bg-fixed bg-center bg-cover bg-no-repeat py-16"
        >
        <div className="container mx-auto max-w-[1200px] px-4">
          <div className="flex items-end justify-between mb-6">
            <h2 className="font-serif text-2xl">{t('home.reviews.title')}</h2>
            <span className="chip">{t('home.reviews.average')}: ★★★★★</span>
          </div>
          <ReviewsSlider />
        </div>
      </section>
      <LocationSection />
      {/* Quick-View Modal */}
      {selected && <RoomQuickView room={selected} onClose={() => setSelected(null)} />}
    </>
  );
}

export function HeroSlider() {
  const images = [
    "/images/interior.jpg",
    "/images/hero-cover2.png",
    "/images/hero-cover3.png",
  ];

  const [index, setIndex] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative">
      {/* === Background Images Slider === */}
      <div className="relative h-[52vh] md:h-[64vh] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="absolute inset-0 bg-center bg-cover"
            style={{ backgroundImage: `url(${images[index]})` }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        </AnimatePresence>
      </div>

      {/* === Booking Form Overlay === */}
      <div className="container mx-auto max-w-[1200px] px-4 -mt-12 md:-mt-16 relative z-10">
        <div className="rounded-2xl p-2 bg-gradient-to-r from-terracotta/30 to-oasis/30 backdrop-blur-sm">
          <BookingForm className="md:p-1" />
        </div>
      </div>
    </section>
  );
}
