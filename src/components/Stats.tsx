import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Stats = () => {
  const { t } = useTranslation();

  const stats = [
    { id: 'years', value: t('stats.years.value'), label: t('stats.years.label') },
    { id: 'projects', value: t('stats.projects.value'), label: t('stats.projects.label') },
    { id: 'users', value: t('stats.users.value'), label: t('stats.users.label') },
    { id: 'customers', value: t('stats.customers.value'), label: t('stats.customers.label') },
  ];

  return (
    <section className="relative py-16 border-t border-ink-700/40">
      <div className="container-tight">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-ink-700/40 border-y border-ink-700/40">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="px-5 sm:px-7 py-8 flex flex-col gap-2"
            >
              <div className="label-mono">// {String(i + 1).padStart(2, '0')}</div>
              <div className="text-4xl md:text-5xl font-semibold text-ink-100 tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm text-ink-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
