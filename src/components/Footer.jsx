import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Footer() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const goToBooking = () => {
    if (pathname !== '/') navigate('/');
    setTimeout(() => {
      document.getElementById('booking-widget')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 60);
  };

  return (
    <footer className="mt-20">
      {/* CTA band */}
      <div className="container mx-auto max-w-[1200px] px-4 mb-8">
        <div className="relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 -z-10 bg-[url('https://images.unsplash.com/photo-1543340713-8d95c09f3fa8?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
          <div className="bg-oasis/90 text-white p-6 md:p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-serif text-2xl">Riad Ghali & SPA</h3>
              <p className="opacity-90">{t('hero.title')}</p>
            </div>
            <button onClick={goToBooking} className="inline-flex items-center rounded-xl px-5 py-2 bg-white text-oasis shadow-soft hover:brightness-95">
              {t('nav.book')}
            </button>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="bg-oasis text-white pt-10">
        <div className="container mx-auto max-w-[1200px] px-4 grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-serif text-2xl mb-3">Riad Ghali & SPA</h4>
            <p className="opacity-90">Marrakech, Morocco</p>
            <p className="opacity-90 mt-2">+212 667 815 538 • info@riadghali.com</p>
          </div>
          <div>
            <h5 className="font-semibold mb-3">{t('footer.explore')}</h5>
            <ul className="space-y-2 opacity-90">
              <li><Link to="/" className="hover:underline">{t('nav.home')}</Link></li>
              <li><Link to="/rooms" className="hover:underline">{t('nav.rooms')}</Link></li>
              <li><Link to="/restaurant-spa" className="hover:underline">{t('nav.restospa')}</Link></li>
              <li><Link to="/gallery" className="hover:underline">{t('nav.gallery')}</Link></li>
              <li><Link to="/contact" className="hover:underline">{t('nav.contact')}</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-3">{t('footer.get_in_touch')}</h5>
            <ul className="space-y-2 opacity-90">
              <li><a href="tel:+212667815538" className="hover:underline">+212 667 815 538</a></li>
              <li><a href="mailto:info@riadghali.com" className="hover:underline">info@riadghali.com</a></li>
              <li><a href="https://maps.app.goo.gl/6tQ7DNo2KaDV5v9U7" target="_blank" rel="noreferrer" className="hover:underline">Google Maps</a></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto max-w-[1200px] px-4 py-6 mt-8 border-t border-white/10 text-sm opacity-80">
          © {new Date().getFullYear()} Riad Ghali & SPA
        </div>
      </div>
    </footer>
  );
}
