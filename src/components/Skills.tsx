import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const CATEGORIES = [
  { id: 'backend', glyph: '{ }' },
  { id: 'frontend', glyph: '</>' },
  { id: 'ai', glyph: '~/AI' },
  { id: 'data', glyph: 'DB' },
  { id: 'architecture', glyph: '◆' },
  { id: 'devops', glyph: '⌘' },
] as const;

const Skills = () => {
  const { t } = useTranslation();

  return (
    <section id="skills" className="relative py-24 sm:py-32 border-t border-ink-700/40">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-14"
        >
          <div className="section-kicker mb-4">
            <span className="text-ink-500">04 //</span> {t('skills.kicker')}
          </div>
          <h2 className="section-title mb-4">{t('skills.title')}</h2>
          <p className="text-ink-400 leading-relaxed">{t('skills.description')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.map((cat, idx) => {
            const techs = t(`skills.${cat.id}.technologies`, { returnObjects: true }) as string[];
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="surface surface-hover p-5 flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-ink-100 font-medium">
                    {t(`skills.${cat.id}.title`)}
                  </h3>
                  <span className="mono text-[11px] text-ink-500">{cat.glyph}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {techs?.map?.((tech) => (
                    <span key={tech} className="chip">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
