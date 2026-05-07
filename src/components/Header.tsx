import { useEffect, useState } from 'react';
import { Link } from 'react-scroll';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const NAV_ITEMS = [
  { to: 'hero', key: 'nav.home' },
  { to: 'about', key: 'nav.about' },
  { to: 'experience', key: 'nav.experience' },
  { to: 'projects', key: 'nav.projects' },
  { to: 'skills', key: 'nav.skills' },
  { to: 'contact', key: 'nav.contact' },
] as const;

const Header = () => {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={[
        'fixed top-0 inset-x-0 z-50 transition-colors duration-300',
        scrolled
          ? 'bg-ink-950/80 backdrop-blur-md border-b border-ink-700/60'
          : 'bg-transparent border-b border-transparent',
      ].join(' ')}
    >
      <div className="container-tight flex items-center justify-between h-16">
        {/* Brand mark */}
        <Link
          to="hero"
          smooth
          className="mono text-sm flex items-center gap-2 cursor-pointer select-none"
        >
          <span className="text-accent">{'>'}</span>
          <span className="text-ink-100">srdjan</span>
          <span className="text-ink-500">.dev</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-7">
            {NAV_ITEMS.map((item, idx) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  smooth
                  spy
                  offset={-72}
                  activeClass="!text-accent"
                  className="mono text-xs text-ink-400 hover:text-ink-100 cursor-pointer transition-colors flex items-center gap-1.5"
                >
                  <span className="text-ink-600">{String(idx + 1).padStart(2, '0')}.</span>
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-2 border border-ink-700 rounded text-ink-300 hover:text-ink-100 hover:border-ink-500 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-ink-700/60 bg-ink-950/95 backdrop-blur">
          <ul className="container-tight py-3 flex flex-col">
            {NAV_ITEMS.map((item, idx) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  smooth
                  spy
                  offset={-72}
                  onClick={() => setMobileOpen(false)}
                  activeClass="!text-accent"
                  className="mono text-sm text-ink-300 hover:text-ink-100 cursor-pointer flex items-center gap-2 py-2.5"
                >
                  <span className="text-ink-600">{String(idx + 1).padStart(2, '0')}.</span>
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
