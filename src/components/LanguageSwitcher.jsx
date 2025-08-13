import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const toggle = () => i18n.changeLanguage(i18n.language === 'en' ? 'fr' : 'en');

  return (
    <button onClick={toggle} className="btn btn-ghost text-sm" aria-label="Toggle language">
      {i18n.language === 'en' ? 'FR' : 'EN'}
    </button>
  );
}
