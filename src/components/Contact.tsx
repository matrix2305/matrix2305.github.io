import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const Contact = () => {
  const { t } = useTranslation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const contact = [
    { label: t('contact.emailLabel'), value: 'srki.rado@gmail.com', href: 'mailto:srki.rado@gmail.com' },
    { label: t('contact.phoneLabel'), value: '+381 (0) 63 193 7009', href: 'tel:+381631937009' },
    { label: t('contact.locationLabel'), value: 'Belgrade, Serbia' },
  ];

  const socials = [
    {
      name: 'GitHub',
      href: 'https://github.com/matrix2305',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/sr%C4%91an-radosavljevi%C4%87-33a54b19a/',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!WEB3FORMS_KEY) {
      setStatus('error');
      setErrorMsg(t('contact.form.missingKey'));
      return;
    }

    // Honeypot — if checked by a bot, silently treat as success (don't tip off bots)
    const formEl = e.currentTarget;
    const honeypot = formEl.elements.namedItem('botcheck') as HTMLInputElement | null;
    if (honeypot?.checked) {
      setStatus('success');
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Portfolio — new message from ${name || 'visitor'}`,
          from_name: name || 'Portfolio visitor',
          name,
          email,
          message,
          replyto: email,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data?.success) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus('error');
        setErrorMsg(data?.message || t('contact.form.error'));
      }
    } catch {
      setStatus('error');
      setErrorMsg(t('contact.form.error'));
    }
  };

  const submitting = status === 'submitting';

  return (
    <section id="contact" className="relative py-24 sm:py-32 border-t border-ink-700/40">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-14"
        >
          <div className="section-kicker mb-4">
            <span className="text-ink-500">05 //</span> {t('contact.kicker')}
          </div>
          <h2 className="section-title mb-4">{t('contact.title')}</h2>
          <p className="text-ink-400 leading-relaxed">{t('contact.description')}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Left: contact details */}
          <div className="lg:col-span-2 surface p-6 sm:p-7">
            <div className="label-mono mb-5">contact.json</div>
            <ul className="space-y-4">
              {contact.map((c) => (
                <li key={c.label} className="flex flex-col gap-0.5">
                  <span className="mono text-[11px] uppercase tracking-wider text-ink-500">
                    {c.label}
                  </span>
                  {c.href ? (
                    <a href={c.href} className="text-ink-100 hover:text-accent transition-colors break-all">
                      {c.value}
                    </a>
                  ) : (
                    <span className="text-ink-100">{c.value}</span>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-7 pt-5 border-t border-ink-700/60">
              <div className="label-mono mb-3">socials</div>
              <div className="flex flex-wrap gap-2">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 mono text-xs px-3 py-1.5 border border-ink-700 rounded text-ink-300 hover:text-accent hover:border-accent/60 transition-colors"
                  >
                    {s.icon}
                    {s.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: form */}
          <form
            className="lg:col-span-3 surface p-6 sm:p-7 space-y-5"
            onSubmit={handleSubmit}
          >
            <div className="label-mono">message.txt</div>

            {/* Honeypot — hidden from real users, bots tend to fill */}
            <input
              type="checkbox"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="mono text-[11px] uppercase tracking-wider text-ink-500 block mb-1.5">
                  {t('contact.form.name')}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={submitting}
                />
              </div>
              <div>
                <label htmlFor="email" className="mono text-[11px] uppercase tracking-wider text-ink-500 block mb-1.5">
                  {t('contact.form.email')}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={submitting}
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="mono text-[11px] uppercase tracking-wider text-ink-500 block mb-1.5">
                {t('contact.form.message')}
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                minLength={10}
                placeholder={t('contact.form.placeholder')}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={submitting}
              />
            </div>

            {/* Status feedback */}
            <AnimatePresence mode="wait">
              {(status === 'success' || status === 'error') && (
                <motion.div
                  key={status}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className={[
                    'mono text-xs px-3 py-2 rounded border flex items-start gap-2',
                    status === 'success'
                      ? 'border-accent/40 text-accent bg-accent/[0.06]'
                      : 'border-rose-500/40 text-rose-400 bg-rose-500/[0.06]',
                  ].join(' ')}
                  role="status"
                >
                  <span className="mt-0.5">{status === 'success' ? '✓' : '×'}</span>
                  <span>
                    {status === 'success' ? t('contact.form.success') : errorMsg || t('contact.form.error')}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center justify-between gap-3 pt-1">
              <span className="mono text-[11px] text-ink-500">
                {submitting ? t('contact.form.submitting') : t('contact.form.hint')}
              </span>
              <button
                type="submit"
                className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    {t('contact.form.submitting')}
                    <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
                      <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                  </>
                ) : (
                  <>
                    {t('contact.form.send')}
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
