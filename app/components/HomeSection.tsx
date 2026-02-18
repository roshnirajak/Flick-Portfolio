"use client";

export default function HomeSection() {
  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
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
  );
}

