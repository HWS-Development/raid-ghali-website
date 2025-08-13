import { useTranslation } from 'react-i18next';

const Icon = ({ children }) => (
  <div className="h-10 w-10 rounded-xl bg-mint/70 flex items-center justify-center text-lg shrink-0">
    {children}
  </div>
);

export default function ContactInfoCard({ phone = '+212667815538', email = 'info@example.com' }) {
  const { t } = useTranslation();
  const addr = t('contact_page.info.address_lines', { returnObjects: true }) || [];
  const hours = t('contact_page.info.hours_lines', { returnObjects: true }) || [];


  return (
    <aside className="rounded-2xl border border-black/10 bg-white shadow-soft overflow-hidden">
      {/* header stripe */}
      <div className="h-1.5 w-full bg-oasis/80" />

      <div className="px-6 space-y-5 py-[45px]">
        {/* Address */}
        <div className="flex items-start gap-3">
          <Icon>📍</Icon>
          <div>
            <div className="text-sm font-medium">{t('contact_page.info.address_title')}</div>
            <div className="opacity-80">
              {addr.map((l, i) => (
                <div key={i}>{l}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start gap-3">
          <Icon>☎️</Icon>
          <div>
            <div className="text-sm font-medium">{t('contact_page.info.phone_title')}</div>
            <a href={`tel:${phone}`} className="text-oasis hover:underline">{phone}</a>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start gap-3">
          <Icon>✉️</Icon>
          <div>
            <div className="text-sm font-medium">{t('contact_page.info.email_title')}</div>
            <a href={`mailto:${email}`} className="text-oasis hover:underline">{email}</a>
          </div>
        </div>

        {/* Hours */}
        <div className="flex items-start gap-3">
          <Icon>🕒</Icon>
          <div>
            <div className="text-sm font-medium">{t('contact_page.info.hours_title')}</div>
            <div className="opacity-80">
              {hours.map((l, i) => (
                <div key={i}>{l}</div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </aside>
  );
}
