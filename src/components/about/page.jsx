import Navigation from "../Navbar";
import Footer from "../Footer";
import navigationData from "../../data/navigation.json";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function AboutPage() {
  const { email } = navigationData;
  const navigate = useNavigate();
  const timeline = [
    {
      title: "The Spark: After Effects & Inspiration",
      description: <p>My journey began in After Effects, creating edits and experimenting with ideas. Discovering the Corridor Crew's VFX and CGI breakdowns ignited my passion and pushed me to explore the world of 3D.</p>
    },
    {
      title: "First Steps into 3D with Blender",
      description: <p>I dove into 3D with Blender, embracing the freedom to build anything from scratch and enhance it in post-production. The idea that if something didn't exist, I could simply create it, was empowering.</p>
    },
    {
      title: "Expanding the Toolbox",
      description: <p>Over time, I expanded my skillset by learning software like <b>Unreal Engine</b>, <b>Houdini</b>, and <b>Fusion</b>. Each tool opened up new possibilities, from real-time rendering and simulations to complex procedural workflows.</p>
    },
    {
      title: "A Pivotal Experience at 16",
      description: <p>As the <b>CAD Lead for a NASA HERC team</b>, I designed parts that had to function in the real world. This role taught me about weight distribution, structural integrity, and manufacturability, principles that reshaped how I approach building things, even digitally.</p>
    },
    {
      title: "Today: A Cinematic 3D Generalist",
      description: <p>Currently, I specialize in <b>designing environments, running simulations, and integrating 3D into live-action footage</b>. I have a keen eye for perspective, lighting, and scale, ensuring every detail holds up to scrutiny, both visually and structurally.</p>
    }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "About | Flick VFX";

    const metaDesc = document.querySelector('meta[name="description"]') || document.createElement('meta');
    metaDesc.name = "description";
    metaDesc.content = "Learn about Surya (Flick), a Cinematic 3D Generalist with expertise in Blender, Unreal Engine, and VFX. Discover my journey and skills.";
    if (!metaDesc.parentNode) document.head.appendChild(metaDesc);

    const metaKeywords = document.querySelector('meta[name="keywords"]') || document.createElement('meta');
    metaKeywords.name = "keywords";
    metaKeywords.content = "flick, flick vx studios, flick vfx, vfx artist, about flick, 3d generalist, blender artist, unreal engine artist, vfx portfolio";
    if (!metaKeywords.parentNode) document.head.appendChild(metaKeywords);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navigation />

      {/* Hero Section */}
      <section className="relative w-full min-h-[60vh] flex items-center justify-center px-6 py-28" style={{ backgroundColor: 'var(--dark-grey)' }}>
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative w-full h-[400px] md:h-[500px]">
              <img
                src="/image/flick.jpg"
                alt="Flick"
                className="object-cover rounded-lg w-full h-full absolute inset-0"
              />
            </div>

            {/* Intro Text */}
            <div className="space-y-6">
              <h1
                className="text-4xl md:text-6xl font-bold text-white"
                style={{ fontFamily: 'var(--font-akira-expanded)' }}
              >
                Hi, I'm Surya!
              </h1>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                A passionate visual effects artist and 3D generalist,
                dedicated to bringing creative visions to life through cutting-edge
                technology and artistic innovation.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => navigate('/#contact')}
                  className="inline-block px-6 py-3 bg-white text-black font-medium hover:bg-gray-200 transition-colors"
                >
                  Get in Touch
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Content Section */}
      <section className="relative pt-20 px-6 overflow-hidden" style={{ backgroundColor: 'var(--dark-grey)' }}>
        {/* Background Text 1 */}
        <div 
          className="absolute top-0 right-0 pointer-events-none select-none opacity-5 z-0 transform translate-x-1/1 -translate-y-1/5"
        >
          <h1 
            className="text-[8rem] md:text-[12rem] font-bold leading-none"
            style={{ 
              fontFamily: 'var(--font-akira-expanded)',
              WebkitTextStroke: '2px white',
              color: 'transparent'
            }}
          >
            FLICK
          </h1>
        </div>

        <div className="max-w-4xl mx-auto space-y-32 relative z-10 mb-20">
          {/* Story Section */}
          <div>
            <h2
              className="text-3xl md:text-4xl font-bold text-white mb-8"
              style={{ fontFamily: 'var(--font-nunito)' }}
            >
              My Story
            </h2>
            <div className="relative border-l-2 border-gray-700 ml-3 pl-8 md:ml-6 md:pl-12">
              {timeline.map((item, index) => (
                <div key={index} className="mb-12 relative last:mb-0">
                  <div 
                    className="absolute w-4 h-4 bg-white rounded-full -left-[calc(2rem+0.5rem+1px)] md:-left-[calc(3rem+0.5rem+1px)] top-1.5 border-4" 
                    style={{ borderColor: 'var(--dark-grey)' }}
                  ></div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-nunito)' }}>
                    {item.title}
                  </h3>
                  <div className="text-gray-300 text-base md:text-lg leading-relaxed">
                    {item.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative pb-20 px-6 overflow-hidden" style={{ backgroundColor: 'var(--dark-grey)' }}>
        <div className="max-w-4xl mx-auto">
          {/* Contact CTA */}
          <div className="pt-8 border-t border-gray-700">
            <div className="text-center space-y-4">
              <h2
                className="text-3xl md:text-4xl font-bold text-white"
                style={{ fontFamily: 'var(--font-nunito)' }}
              >
                Let's Work Together
              </h2>
              <p className="text-gray-400 text-lg">
                Have a project in mind? I'd love to hear from you.
              </p>
              <div className="pt-4">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/#contact');
                  }}
                  className="inline-block px-8 py-3 bg-white text-black font-medium hover:bg-gray-200 transition-colors"
                >
                  Contact Me
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
