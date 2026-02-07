import Image from "next/image";
import type { Metadata } from "next";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import navigationData from "../data/navigation.json";

export const metadata: Metadata = {
  title: "About - Flick",
  description: "Learn more about Flick, a passionate visual effects artist and motion graphics designer.",
};

export default function AboutPage() {
  const { email } = navigationData;
  const software = [
    {
      name: "Blender",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Blender_logo_no_text.svg/2503px-Blender_logo_no_text.svg.png",
    },
    {
      name: "Unreal Engine",
      logo: "https://media.ffycdn.net/us/epicgames/jV5j16bL3ZReGzJzvZuZ.png?width={width}",
    },
    {
      name: "After Effects",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Adobe_After_Effects_CC_icon.svg/2101px-Adobe_After_Effects_CC_icon.svg.png",
    },
    {
      name: "Silhouette FX",
      logo: "https://images.surferseo.art/cd6c797b-3d18-419a-a674-a49acf44fd15.png",
    },
    {
      name: "SynthEyes",
      logo: "https://i1.wp.com/www.macbed.com/wp-content/uploads/2025/03/65421.png",
    },
    {
      name: "Marvelous Designer",
      logo: "https://support.marvelousdesigner.com/hc/theming_assets/01JXBQ88WE0VZEY6B2K8RR6G59",
    },
    {
      name: "EmberGen",
      logo: "https://jangafx.com/media/images/logos/embergen.svg",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative w-full min-h-[60vh] flex items-center justify-center px-6 py-20" style={{ backgroundColor: 'var(--dark-grey)' }}>
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative w-full h-[400px] md:h-[500px]">
              <Image
                src="/image/flick.jpg"
                alt="Flick"
                fill
                className="object-cover rounded-lg"
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
                A passionate visual effects artist and motion graphics designer, 
                dedicated to bringing creative visions to life through cutting-edge 
                technology and artistic innovation.
              </p>
              <div className="pt-4">
                <a 
                  href={`mailto:${email}`}
                  className="inline-block px-6 py-3 bg-white text-black font-medium hover:bg-gray-200 transition-colors"
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Content Section */}
      <section className="py-20 px-6" style={{ backgroundColor: 'var(--dark-grey)' }}>
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Story Section */}
          <div>
            <h2 
              className="text-3xl md:text-4xl font-bold text-white mb-6"
              style={{ fontFamily: 'var(--font-nunito)' }}
            >
              My Story
            </h2>
            <div className="space-y-4 text-gray-300 text-base md:text-lg leading-relaxed">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat.
              </p>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt mollit
                anim id est laborum.
              </p>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae vitae
                dicta sunt explicabo.
              </p>
            </div>
          </div>

          {/* Skills & Expertise */}
          <div>
            <h2 
              className="text-3xl md:text-4xl font-bold text-white mb-8"
              style={{ fontFamily: 'var(--font-nunito)' }}
            >
              Skills & Expertise
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  <svg 
                    width="64" 
                    height="64" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="text-white animate-play"
                  >
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-2" style={{ fontFamily: 'var(--font-nunito)' }}>Animation</h3>
              </div>
              <div className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  <svg 
                    width="64" 
                    height="64" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="text-white animate-firework"
                  >
                    {/* Center circle */}
                    <circle cx="12" cy="12" r="2" />
                    {/* Radiating sparks */}
                    <line x1="12" y1="12" x2="12" y2="4" />
                    <line x1="12" y1="12" x2="12" y2="20" />
                    <line x1="12" y1="12" x2="4" y2="12" />
                    <line x1="12" y1="12" x2="20" y2="12" />
                    <line x1="12" y1="12" x2="6" y2="6" />
                    <line x1="12" y1="12" x2="18" y2="18" />
                    <line x1="12" y1="12" x2="18" y2="6" />
                    <line x1="12" y1="12" x2="6" y2="18" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-2" style={{ fontFamily: 'var(--font-nunito)' }}>Visual Effects</h3>
              </div>
              <div className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  <svg 
                    width="64" 
                    height="64" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="text-white animate-float"
                  >
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                    <line x1="12" y1="22.08" x2="12" y2="12" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-2" style={{ fontFamily: 'var(--font-nunito)' }}>Environment Design</h3>
              </div>
            </div>
          </div>

          {/* Software I Use */}
          <div>
            <h2 
              className="text-3xl md:text-4xl font-bold text-white mb-6"
              style={{ fontFamily: 'var(--font-nunito)' }}
            >
              Software I Use
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {software.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-4 border border-gray-700 rounded-lg hover:border-gray-500 transition-colors"
                >
                  <div className="w-16 h-16 mb-3 flex items-center justify-center">
                    <img
                      src={item.logo}
                      alt={item.name}
                      className={`w-full h-full ${
                        item.name === "Silhouette FX"
                          ? "object-cover object-center scale-150"
                          : "object-contain"
                      }`}
                    />
                  </div>
                  <span className="text-gray-300 text-sm text-center">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

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
                <a 
                  href="/#contact"
                  className="inline-block px-8 py-3 bg-white text-black font-medium hover:bg-gray-200 transition-colors"
                >
                  Contact Me
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

