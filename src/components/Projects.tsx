import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

type ProjectStatus = 'live' | 'in_progress' | 'archived' | 'nda';
type ProjectKind = 'public' | 'internal';

type Project = {
  id: string;
  kind: ProjectKind;
  status: ProjectStatus;
  stack: string[];
  href?: string;
  repo?: string;
};

const PROJECTS: Project[] = [
  {
    id: 'aiAdvokat',
    kind: 'public',
    status: 'live',
    stack: ['Java', 'Spring Boot', 'React', 'PostgreSQL', 'RabbitMQ', 'RAG', 'Docker', 'Kubernetes', 'Helm'],
    href: 'https://ai-advokat.co',
  },
  {
    id: 'wuonline',
    kind: 'public',
    status: 'live',
    stack: ['Java', 'Spring Boot', 'React', 'PostgreSQL', 'Kafka'],
    href: 'https://wuonline.rs',
  },
  {
    id: 'vaju',
    kind: 'public',
    status: 'live',
    stack: ['Laravel', 'React', 'MongoDB', 'Elasticsearch', 'Kubernetes', 'Helm'],
    href: 'https://vaju.muzej-jugoslavije.org',
  },
  {
    id: 'mod24',
    kind: 'public',
    status: 'live',
    stack: ['Next.js', 'React', 'Vue.js', 'Laravel', 'gRPC', 'RabbitMQ', 'Elasticsearch'],
    href: 'https://www.mod24.com',
  },
  {
    id: 'rexair',
    kind: 'public',
    status: 'live',
    stack: ['Laravel', 'Doctrine ORM', 'MySQL', 'Redis', 'React'],
    href: 'https://www.rexairllc.com',
  },
  {
    id: 'dynamicLife',
    kind: 'public',
    status: 'live',
    stack: ['React Native', 'TypeScript', 'REST API', 'QR / Barcode'],
    href: 'https://dynamiclife.rs',
  },
  {
    id: 'sexsurance',
    kind: 'public',
    status: 'archived',
    stack: ['React Native', 'Expo', 'TypeScript', 'Laravel', 'Doctrine ORM', 'MySQL', 'Redis', 'MinIO / S3', 'Twilio'],
  },
  {
    id: 'trigos',
    kind: 'public',
    status: 'live',
    stack: ['Laravel', 'React', 'MySQL', 'Stripe'],
    href: 'https://demo.trigos.rs',
  },
  {
    id: 'putsvile',
    kind: 'public',
    status: 'live',
    stack: ['Laravel', 'React', 'MySQL'],
    href: 'https://demo.putsvile.rs',
  },
  {
    id: 'mojoff',
    kind: 'public',
    status: 'archived',
    stack: ['Laravel', 'React', 'HLS', 'Video CDN'],
  },
  // Internal — under NDA, intentionally redacted
  {
    id: 'internal1',
    kind: 'internal',
    status: 'nda',
    stack: ['Java', 'Spring Boot', 'PostgreSQL', '████'],
  },
  {
    id: 'internal2',
    kind: 'internal',
    status: 'nda',
    stack: ['Laravel', 'Vue.js', 'RabbitMQ', '████'],
  },
  {
    id: 'internal3',
    kind: 'internal',
    status: 'nda',
    stack: ['Python', 'RAG', 'Vector DB', '████'],
  },
];

const STATUS_STYLES: Record<ProjectStatus, string> = {
  live: 'text-accent border-accent/50',
  in_progress: 'text-yellow-400 border-yellow-500/40',
  archived: 'text-ink-500 border-ink-700',
  nda: 'text-rose-400 border-rose-500/40',
};

const STATUS_DOT: Record<ProjectStatus, string> = {
  live: 'bg-accent animate-pulse',
  in_progress: 'bg-yellow-400',
  archived: 'bg-ink-600',
  nda: 'bg-rose-400',
};

const Projects = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState<ProjectKind>('public');

  const filtered = useMemo(() => PROJECTS.filter((p) => p.kind === tab), [tab]);
  const counts = useMemo(
    () => ({
      public: PROJECTS.filter((p) => p.kind === 'public').length,
      internal: PROJECTS.filter((p) => p.kind === 'internal').length,
    }),
    []
  );

  return (
    <section id="projects" className="relative py-24 sm:py-32 border-t border-ink-700/40">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-10"
        >
          <div className="section-kicker mb-4">
            <span className="text-ink-500">03 //</span> {t('projects.kicker')}
          </div>
          <h2 className="section-title mb-4">{t('projects.title')}</h2>
          <p className="text-ink-400 leading-relaxed">{t('projects.description')}</p>
        </motion.div>

        {/* Tab control */}
        <div className="flex items-center justify-between flex-wrap gap-3 mb-8">
          <div className="inline-flex items-center border border-ink-700 rounded-md overflow-hidden mono text-xs">
            {(['public', 'internal'] as ProjectKind[]).map((k, i) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                className={[
                  'px-4 py-2 inline-flex items-center gap-2 transition-colors',
                  i > 0 ? 'border-l border-ink-700' : '',
                  tab === k
                    ? 'bg-ink-800 text-accent'
                    : 'text-ink-400 hover:text-ink-100 hover:bg-ink-850',
                ].join(' ')}
                aria-pressed={tab === k}
              >
                {k === 'internal' && (
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <rect x="4" y="11" width="16" height="9" rx="1.5" />
                    <path strokeLinecap="round" d="M8 11V7a4 4 0 1 1 8 0v4" />
                  </svg>
                )}
                {t(`projects.tabs.${k}`)}
                <span className="text-ink-600">[{counts[k]}]</span>
              </button>
            ))}
          </div>
          <div className="mono text-[11px] text-ink-500">
            <span className="text-accent">$</span> ls projects/{tab}
          </div>
        </div>

        {/* Internal disclaimer */}
        {tab === 'internal' && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="surface p-4 mb-6 flex items-start gap-3"
          >
            <svg className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            </svg>
            <p className="mono text-xs text-ink-400 leading-relaxed">
              <span className="text-rose-400">[NDA]</span> {t('projects.internalNote')}
            </p>
          </motion.div>
        )}

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.map((p, idx) => {
              const isInternal = p.kind === 'internal';
              return (
                <article
                  key={p.id}
                  className={[
                    'surface surface-hover p-6 flex flex-col group relative overflow-hidden',
                    isInternal ? 'border-dashed' : '',
                  ].join(' ')}
                >
                  {/* corner index */}
                  <span className="absolute top-3 right-4 mono text-[11px] text-ink-600">
                    #{String(idx + 1).padStart(2, '0')}
                  </span>

                  {/* status pill */}
                  <div className="flex items-center gap-2 mb-5">
                    <span
                      className={[
                        'mono text-[10px] uppercase tracking-wider px-2 py-0.5 border rounded inline-flex items-center gap-1.5',
                        STATUS_STYLES[p.status],
                      ].join(' ')}
                    >
                      <span className={['inline-block w-1.5 h-1.5 rounded-full', STATUS_DOT[p.status]].join(' ')} />
                      {t(`projects.status.${p.status}`)}
                    </span>
                    {isInternal && (
                      <span className="mono text-[10px] text-ink-500 inline-flex items-center gap-1">
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                          <rect x="4" y="11" width="16" height="9" rx="1.5" />
                          <path strokeLinecap="round" d="M8 11V7a4 4 0 1 1 8 0v4" />
                        </svg>
                        classified
                      </span>
                    )}
                  </div>

                  <h3
                    className={[
                      'text-xl font-medium mb-2 transition-colors',
                      isInternal ? 'text-ink-300' : 'text-ink-100 group-hover:text-accent',
                    ].join(' ')}
                  >
                    {isInternal && (
                      <span className="mono text-ink-600 mr-2 select-none">██████</span>
                    )}
                    {t(`projects.items.${p.id}.title`)}
                  </h3>
                  <p
                    className={[
                      'text-sm leading-relaxed mb-5 flex-1',
                      isInternal ? 'text-ink-500' : 'text-ink-400',
                    ].join(' ')}
                  >
                    {t(`projects.items.${p.id}.description`)}
                  </p>

                  {/* stack */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {p.stack.map((s, i) => (
                      <span key={`${s}-${i}`} className="chip-static">
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* footer links */}
                  <div className="flex items-center justify-between mono text-xs pt-4 border-t border-ink-700/60">
                    {isInternal ? (
                      <span className="text-ink-600 select-none">— access restricted —</span>
                    ) : p.href ? (
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-accent hover:underline inline-flex items-center gap-1.5"
                      >
                        {t('projects.visit')}
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 3h7v7M10 14L21 3M21 14v7h-7M3 10V3h7" />
                        </svg>
                      </a>
                    ) : (
                      <span className="text-ink-600">— offline —</span>
                    )}
                    {p.repo && (
                      <a
                        href={p.repo}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-ink-400 hover:text-ink-100"
                      >
                        {t('projects.code')}
                      </a>
                    )}
                  </div>

                  {/* Decorative scanline for internal cards */}
                  {isInternal && (
                    <div
                      className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
                      style={{
                        backgroundImage:
                          'repeating-linear-gradient(to bottom, rgba(255,255,255,0.5) 0, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 4px)',
                      }}
                    />
                  )}
                </article>
              );
            })}
          </motion.div>
        </AnimatePresence>

        <p className="mt-10 mono text-xs text-ink-500 text-center">
          {t('projects.more')}
        </p>
      </div>
    </section>
  );
};

export default Projects;
