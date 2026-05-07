import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

type ExperienceItem = {
  id: string;
  achievements: string[];
  stack: string[];
};

const ITEMS: ExperienceItem[] = [
  {
    id: 'aiAdvokat',
    achievements: [
      'Launched AI-powered practice management platform for Ex-YU lawyers',
      'Architected scalable microservice architecture with Java/Spring Boot',
      'Integrated RAG-based AI for legal document analysis',
      'Implemented automated workflows with web scraping for Balkan legal data',
      'Onboarded 50+ trial users and secured 5 paying customers in Serbia',
    ],
    stack: ['Java', 'Spring Boot', 'React', 'RAG', 'PostgreSQL', 'RabbitMQ', 'Docker', 'Kubernetes', 'Helm'],
  },
  {
    id: 'tenfore',
    achievements: [
      'Designed high-performance microservices with Spring Boot (30% faster response times)',
      'Built event-driven workflows processing 50k+ messages/minute with Kafka & Axon',
      'Developed React features reducing user onboarding time by 40%',
      'Implemented robust monitoring and observability solutions',
    ],
    stack: ['Spring Boot', 'Kafka', 'Axon', 'React', 'PostgreSQL'],
  },
  {
    id: 'mod24',
    achievements: [
      'Developed multi-platform applications using Vue.js, React, and Next.js (+20% engagement)',
      'Architected Laravel backend services with gRPC and RabbitMQ',
      'Optimized Elasticsearch queries reducing latency from 2s to under 500ms',
      'Led cross-functional teams delivering enterprise solutions',
    ],
    stack: ['Vue.js', 'Next.js', 'Laravel', 'gRPC', 'RabbitMQ', 'Elasticsearch'],
  },
  {
    id: 'infogram',
    achievements: [
      'Applied Domain-Driven Design (DDD) and CQRS patterns',
      'Delivered cross-platform solutions using React and React Native',
      'Led migration of legacy monoliths to modular architectures',
      'Reduced technical debt and improved system maintainability',
    ],
    stack: ['React', 'React Native', 'DDD', 'CQRS'],
  },
];

const Experience = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState<string | null>('aiAdvokat');

  return (
    <section id="experience" className="relative py-24 sm:py-32 border-t border-ink-700/40">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-14"
        >
          <div className="section-kicker mb-4">
            <span className="text-ink-500">02 //</span> {t('experience.kicker')}
          </div>
          <h2 className="section-title mb-4">{t('experience.title')}</h2>
          <p className="text-ink-400 leading-relaxed">{t('experience.description')}</p>
        </motion.div>

        <ol className="relative">
          {/* Vertical rail */}
          <div
            className="absolute left-[7px] top-2 bottom-2 w-px bg-ink-700/60"
            aria-hidden
          />

          {ITEMS.map((exp, idx) => {
            const isOpen = open === exp.id;
            return (
              <motion.li
                key={exp.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="relative pl-8 pb-10 last:pb-0"
              >
                {/* Dot */}
                <span
                  className={[
                    'absolute left-0 top-2 w-3.5 h-3.5 rounded-full border-2 transition-colors',
                    isOpen ? 'bg-accent border-accent' : 'bg-ink-950 border-ink-600',
                  ].join(' ')}
                />

                <div className="surface surface-hover">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : exp.id)}
                    className="w-full text-left p-5 sm:p-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <div className="min-w-0">
                      <div className="mono text-xs text-ink-500 mb-1">
                        {t(`experience.${exp.id}.period`)}
                      </div>
                      <h3 className="text-lg sm:text-xl font-medium text-ink-100">
                        {t(`experience.${exp.id}.role`)}
                        <span className="text-ink-500 font-normal"> @ </span>
                        <span className="text-accent">{t(`experience.${exp.id}.company`)}</span>
                      </h3>
                    </div>
                    <span
                      className={[
                        'mono text-[11px] text-ink-400 border border-ink-700 rounded px-2 py-1 shrink-0 transition-colors',
                        isOpen ? 'border-accent text-accent' : '',
                      ].join(' ')}
                    >
                      {isOpen ? t('experience.collapse') : t('experience.expand')}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden border-t border-ink-700/60"
                      >
                        <div className="p-5 sm:p-6 space-y-5">
                          <p className="text-ink-300 leading-relaxed">
                            {t(`experience.${exp.id}.description`)}
                          </p>

                          <ul className="space-y-2">
                            {exp.achievements.map((a, i) => (
                              <li key={i} className="flex gap-3 text-sm text-ink-300">
                                <span className="text-accent mono mt-0.5">→</span>
                                <span>{a}</span>
                              </li>
                            ))}
                          </ul>

                          <div className="flex flex-wrap gap-2 pt-1">
                            {exp.stack.map((s) => (
                              <span key={s} className="chip-static">{s}</span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default Experience;
