import Navbar from './Navbar';
import AboutSection from './AboutSection';
import WorkSection from './WorkSection';
import ContactSection from './ContactSection';
import SkillsSection from './SkillsSection';
import SoftwareSection from './SoftwareSection';
import Footer from './Footer';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from './Loader';

export default function HomePage() {
  const location = useLocation();
  const [loading, setLoading] = useState(!location.hash);
  const [showContent, setShowContent] = useState(false);

  const handleContactClick = (e) => {
    e.preventDefault();
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Scroll smoothly whenever the location.hash changes (including initial load)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hash = location.hash;
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  }, [location.hash]);

  useEffect(() => {
    if (!loading) {
      // Start fade-in animation for content after loader is gone
      const timer = setTimeout(() => setShowContent(true), 50);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  useEffect(() => {
    document.title = "Flick VFX";
    
    const metaDesc = document.querySelector('meta[name="description"]') || document.createElement('meta');
    metaDesc.name = "description";
    metaDesc.content = "Flick - Cinematic 3D Generalist & VFX Artist specializing in environment design, simulations, and animation. Explore my portfolio.";
    if (!metaDesc.parentNode) document.head.appendChild(metaDesc);

    const metaKeywords = document.querySelector('meta[name="keywords"]') || document.createElement('meta');
    metaKeywords.name = "keywords";
    metaKeywords.content = "flick, flick vx studios, flick vfx, vfx artist, 3d generalist, animation, blender, unreal engine, environment design, visual effects";
    if (!metaKeywords.parentNode) document.head.appendChild(metaKeywords);
  }, []);

  if (loading) {
    return <Loader onLoaded={() => setLoading(false)} />;
  }

  return (
    <main className={`bg-black min-h-screen text-white transition-opacity duration-700 ease-in ${showContent ? 'opacity-100' : 'opacity-0'}`}>
      <Navbar />
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
      >
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        style={{ filter: 'blur(3px)', transform: 'scale(1.2)' }}
      >
        <source src="/video/highlight.mp4" type="video/mp4" />
      </video>

      {/* Overlay for better text readability */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10"></div>

      {/* Content */}
      <div className="relative z-20 max-w-4xl mx-auto text-center">
        <h1 
          className="text-6xl md:text-8xl lg:text-9xl font-bold drop-shadow-lg"
          style={{ 
            fontFamily: 'var(--font-akira-expanded)',
            background: '-webkit-linear-gradient(45deg, #fff, #9e9e9e, #0f0f0f, #000)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Flick
        </h1>
        <a
          href="#contact"
          onClick={handleContactClick}
          className="inline-block mt-8 px-6 py-2 bg-stone-50 text-black text-lg md:text-xl font-medium hover:bg-transparent hover:text-white hover:scale-110 transition-all duration-300"
        >
          Hire me
        </a>
      </div>
    </section>

      <AboutSection/>
      <WorkSection />
      <SkillsSection />
      <SoftwareSection withHeading={false} />
      <ContactSection />
      <Footer />
    </main>
  );
}
