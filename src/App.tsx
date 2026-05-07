import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';
import './i18n';

import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Stats from './components/Stats';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const saved = localStorage.getItem('language') || 'en';
    if (i18n.language !== saved) i18n.changeLanguage(saved);
  }, [i18n]);

  return (
    <div className="font-sans bg-ink-950 text-ink-100 min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Stats />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
