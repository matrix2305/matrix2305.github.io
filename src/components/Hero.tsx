import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden"
    >
      {/* Background: faint grid + soft top accent glow */}
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-[0.7]" />
      <div className="absolute inset-x-0 top-0 h-[480px] accent-glow pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 to-transparent pointer-events-none" />

      <div className="container-tight w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: copy */}
          <div className="lg:col-span-7 space-y-7">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="section-kicker"
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              {t('hero.kicker')}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] text-ink-100"
            >
              {t('hero.title')}
              <span className="caret" />
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="text-xl sm:text-2xl text-ink-300 font-normal"
            >
              {t('hero.subtitle')}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-ink-400 max-w-2xl leading-relaxed"
            >
              {t('hero.description')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <Link to="contact" smooth offset={-72} className="btn-primary cursor-pointer">
                {t('hero.cta')}
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
              <Link to="projects" smooth offset={-72} className="btn-ghost cursor-pointer">
                {t('hero.ctaSecondary')}
              </Link>
            </motion.div>

            {/* Quick stack ticker */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-ink-500 mono text-xs"
            >
              <span className="label-mono">stack</span>
              <span className="text-ink-700">/</span>
              {['Java', 'Spring Boot', 'React', 'TypeScript', 'Kafka', 'RabbitMQ', 'PostgreSQL', 'RAG', 'Kubernetes'].map((s, i, arr) => (
                <span key={s} className="flex items-center gap-3">
                  <span className="text-ink-300">{s}</span>
                  {i < arr.length - 1 && <span className="text-ink-700">·</span>}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right: terminal window */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <div className="term-window">
              <div className="term-bar">
                <span className="term-dot bg-red-500/70" />
                <span className="term-dot bg-yellow-500/70" />
                <span className="term-dot bg-green-500/70" />
                <span className="ml-3 mono text-xs text-ink-500">~/srdjan — zsh</span>
              </div>
              <div className="p-5 mono text-[13px] leading-relaxed">
                <div>
                  <span className="text-accent">$</span>{' '}
                  <span className="text-ink-200">whoami</span>
                </div>
                <div className="text-ink-300 pl-3">srdjan_radosavljevic</div>

                <div className="mt-3">
                  <span className="text-accent">$</span>{' '}
                  <span className="text-ink-200">cat profile.json</span>
                </div>
                <pre className="text-ink-300 pl-3 whitespace-pre-wrap">
{`{
  "role":     "AI Product & Software Engineer",
  "founder":  "AI Advokat",
  "location": "Belgrade, RS",
  "shipping": ["SaaS", "AI/RAG", "Event-driven"],
  "stack":    ["Java", "Spring", "React", "Kafka", "RabbitMQ"]
}`}
                </pre>

                <div className="mt-3">
                  <span className="text-accent">$</span>{' '}
                  <span className="text-ink-200">status</span>
                </div>
                <div className="text-ink-300 pl-3">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent mr-2 align-middle animate-pulse" />
                  available for collaboration<span className="caret" />
                </div>
              </div>
            </div>

            {/* Subtle metadata under terminal */}
            <div className="mt-3 flex items-center justify-between mono text-[11px] text-ink-500 px-1">
              <span>~ uptime: 5+ yrs</span>
              <span>build: stable</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
