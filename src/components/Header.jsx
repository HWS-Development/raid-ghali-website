import { useState } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const goToBooking = () => {
    if (pathname !== '/') navigate('/');
    setTimeout(() => {
      document.getElementById('booking-widget')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 60);
  };

  const linkClass = ({ isActive }) =>
    `px-2 py-1 transition hover:text-oasis ${isActive ? 'text-oasis' : 'text-gray-700'}`;

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-black/5">
      <div className="container mx-auto max-w-[1200px] px-4 h-16 flex items-center justify-between">
        <Link to="/" className="font-serif text-xl text-oasis"><img src="/images/riad_ghali_and_spa.png" width={100} alt="" /></Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={linkClass}>{t('nav.home')}</NavLink>
          <NavLink to="/rooms" className={linkClass}>{t('nav.rooms')}</NavLink>
          <NavLink to="/restaurant" className={linkClass}>{t('nav.restospa')}</NavLink>
          <NavLink to="/discover" className={linkClass}>{t('nav.discover')}</NavLink>
          <NavLink to="/gallery" className={linkClass}>{t('nav.gallery')}</NavLink>
          <NavLink to="/contact" className={linkClass}>{t('nav.contact')}</NavLink>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher />
          <button onClick={goToBooking} className="inline-flex items-center rounded-xl px-4 py-2 bg-oasis text-white shadow-soft hover:brightness-95">
            {t('nav.book')}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-2">
          <LanguageSwitcher />
          <button aria-label="Open menu" onClick={() => setOpen(v=>!v)} className="rounded-lg border px-3 py-2">
            ☰
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      {open && (
        <div className="md:hidden border-t border-black/5 bg-white">
          <div className="px-4 py-3 flex flex-col gap-3 max-w-[1200px] mx-auto">
            <NavLink to="/" className={linkClass} onClick={()=>setOpen(false)}>{t('nav.home')}</NavLink>
            <NavLink to="/rooms" className={linkClass} onClick={()=>setOpen(false)}>{t('nav.rooms')}</NavLink>
            <NavLink to="/restaurant" className={linkClass} onClick={()=>setOpen(false)}>{t('nav.restospa')}</NavLink>
            <NavLink to="/discover" className={linkClass} onClick={()=>setOpen(false)}>{t('nav.discover')}</NavLink>
            <NavLink to="/gallery" className={linkClass} onClick={()=>setOpen(false)}>{t('nav.gallery')}</NavLink>
            <NavLink to="/contact" className={linkClass} onClick={()=>setOpen(false)}>{t('nav.contact')}</NavLink>
            <button onClick={() => { setOpen(false); goToBooking(); }} className="mt-1 inline-flex items-center rounded-xl px-4 py-2 bg-oasis text-white">
              {t('nav.book')}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
