import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-700/40 py-8 mt-8">
      <div className="container-tight flex flex-col sm:flex-row items-center justify-between gap-3 mono text-xs text-ink-500">
        <div className="flex items-center gap-2">
          <span className="text-accent">{'>'}</span>
          <span>{t('footer.copyright', { year })}</span>
        </div>
        <div className="flex items-center gap-4">
          <span>built with React + Vite</span>
          <span className="text-ink-700">·</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            online
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
