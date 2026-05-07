import { useTranslation } from 'react-i18next';

const LANGS = [
  { code: 'en', label: 'EN' },
  { code: 'sr', label: 'SR' },
] as const;

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  const current = i18n.language?.slice(0, 2) ?? 'en';

  return (
    <div className="mono text-xs flex items-center border border-ink-700 rounded overflow-hidden">
      {LANGS.map((l, i) => (
        <button
          key={l.code}
          onClick={() => changeLanguage(l.code)}
          className={[
            'px-2.5 py-1 transition-colors',
            i > 0 ? 'border-l border-ink-700' : '',
            current === l.code
              ? 'bg-ink-800 text-accent'
              : 'text-ink-400 hover:text-ink-100 hover:bg-ink-850',
          ].join(' ')}
          aria-pressed={current === l.code}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
