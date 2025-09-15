import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ContactInfoCard from '../components/ContactInfoCard';


export default function Contact() {
  const { t } = useTranslation();
  const PHONE = '+212667815538';           // TODO: replace if needed
  const EMAIL = 'colbail2016@gmail.com';         // TODO: replace if needed

  const [form, setForm] = useState({ name:'', email:'', phone:'', subject:'', message:'', consent:false, trap:'' });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const onChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = t('contact_page.form.required');
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) e.email = t('contact_page.form.required');
    if (!form.subject.trim()) e.subject = t('contact_page.form.required');
    if (!form.message.trim()) e.message = t('contact_page.form.required');
    if (!form.consent) e.consent = t('contact_page.form.required');
    return e;
    // phone optional
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    if (form.trap) return; // honeypot
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    try {
      setSending(true);
      // TODO: hook up to your backend or email service here.
      await new Promise(r => setTimeout(r, 900));
      setSent(true);
      setForm({ name:'', email:'', phone:'', subject:'', message:'', consent:false, trap:'' });
    } finally {
      setSending(false);
    }
  };

  const label = (id, text, required=false) => (
    <label htmlFor={id} className="text-sm font-medium">
      {text}{required && <span className="text-terracotta"> *</span>}
    </label>
  );

  return (
    <div className="pb-16">
      {/* Hero */}
      <section
        className="relative h-[200px] md:h-[260px] bg-cover bg-center flex items-end"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=1600&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/20 to-transparent" />
        <div className="container mx-auto max-w-[1200px] px-4 pb-5 relative">
          <h1 className="font-serif text-3xl md:text-4xl text-white drop-shadow-[0_1px_8px_rgba(0,0,0,.35)]">
            {t('contact_page.title')}
          </h1>
          <p className="text-white/90 mt-2 max-w-[720px]">{t('contact_page.intro')}</p>
        </div>
      </section>

      {/* Body */}
      <section className="container mx-auto max-w-[1200px] px-4 mt-10 grid md:grid-cols-2 gap-8 items-start">
        {/* Info card */}
        <ContactInfoCard phone={PHONE} email={EMAIL} />

        {/* Form card */}
        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-soft">
          {sent ? (
            <div className="text-center py-10">
              <h3 className="font-serif text-2xl mb-2">{t('contact_page.form.success_title')}</h3>
              <p className="opacity-80">{t('contact_page.form.success_text')}</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              {/* honeypot */}
              <input type="text" name="trap" value={form.trap} onChange={onChange} className="hidden" tabIndex={-1} autoComplete="off" />

              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  {label('name', t('contact_page.form.name'), true)}
                  <input id="name" name="name" value={form.name} onChange={onChange}
                    className={`rounded-xl border px-3 py-2 ${errors.name ? 'border-terracotta' : 'border-black/10'}`} />
                  {errors.name && <div className="text-terracotta text-xs">{errors.name}</div>}
                </div>

                <div className="flex flex-col gap-1">
                  {label('email', t('contact_page.form.email'), true)}
                  <input id="email" name="email" type="email" value={form.email} onChange={onChange}
                    className={`rounded-xl border px-3 py-2 ${errors.email ? 'border-terracotta' : 'border-black/10'}`} />
                  {errors.email && <div className="text-terracotta text-xs">{errors.email}</div>}
                </div>

                <div className="flex flex-col gap-1">
                  {label('phone', t('contact_page.form.phone'))}
                  <input id="phone" name="phone" value={form.phone} onChange={onChange}
                    className="rounded-xl border border-black/10 px-3 py-2" />
                </div>

                <div className="flex flex-col gap-1">
                  {label('subject', t('contact_page.form.subject'), true)}
                  <input id="subject" name="subject" value={form.subject} onChange={onChange}
                    className={`rounded-xl border px-3 py-2 ${errors.subject ? 'border-terracotta' : 'border-black/10'}`} />
                  {errors.subject && <div className="text-terracotta text-xs">{errors.subject}</div>}
                </div>
              </div>

              <div className="flex flex-col gap-1 mt-4">
                {label('message', t('contact_page.form.message'), true)}
                <textarea id="message" name="message" rows={2} value={form.message} onChange={onChange}
                  className={`rounded-xl border px-3 py-2 ${errors.message ? 'border-terracotta' : 'border-black/10'}`} />
                {errors.message && <div className="text-terracotta text-xs">{errors.message}</div>}
              </div>

              <label className="mt-4 flex items-start gap-2 text-sm">
                <input type="checkbox" name="consent" checked={form.consent} onChange={onChange} />
                <span>{t('contact_page.form.consent')}</span>
              </label>
              {errors.consent && <div className="text-terracotta text-xs mt-1">{errors.consent}</div>}

              <div className="mt-5">
                <button disabled={sending} className="btn btn-primary">
                  {sending ? t('contact_page.form.sending') : t('contact_page.form.send')}
                </button>
              </div>

              {/* form-level error helper */}
              {Object.keys(errors).length > 0 && (
                <div className="mt-4 text-terracotta text-sm">
                  <strong>{t('contact_page.form.error_title')}</strong> {t('contact_page.form.error_text')}
                </div>
              )}
            </form>
          )}
        </div>
      </section>

      {/* Map */}
      <section className="container mx-auto max-w-[1200px] px-4 mt-10">
        <div className="rounded-2xl border border-black/10 shadow-soft overflow-hidden bg-white">
          <div className="h-[420px] w-full">
            <iframe
              title="Marrakech Map"
              src="https://www.google.com/maps?q=Riad%20Ghali%20Marrakech&output=embed"
              className="w-full h-full block"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
