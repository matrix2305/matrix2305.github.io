import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const HIGHLIGHTS = [
  { key: 'soloShipping', label: 'Solo SaaS shipping' },
  { key: 'legalTech', label: 'Legal-tech domain' },
  { key: 'aiCompliance', label: 'EU AI compliance' },
  { key: 'multiTenant', label: 'Multi-tenant arch' },
] as const;

const About = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="relative py-24 sm:py-32 border-t border-ink-700/40">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <div className="section-kicker mb-4">
            <span className="text-ink-500">01 //</span> {t('about.kicker')}
          </div>
          <h2 className="section-title mb-8">{t('about.title')}</h2>
          <p className="text-lg text-ink-300 leading-relaxed">{t('about.description')}</p>
        </motion.div>

        {/* Highlights grid */}
        <motion.ul
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {HIGHLIGHTS.map((h, i) => (
            <li
              key={h.key}
              className="surface surface-hover p-5 group"
            >
              <div className="mono text-xs text-ink-500 mb-3">
                0{i + 1}
              </div>
              <h3 className="text-ink-100 font-medium mb-1.5 group-hover:text-accent transition-colors">
                {t(`about.highlights.${h.key}.title`, h.label)}
              </h3>
              <p className="text-sm text-ink-400 leading-relaxed">
                {t(`about.highlights.${h.key}.description`)}
              </p>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

export default About;
