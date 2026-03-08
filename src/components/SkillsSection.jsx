import { useState } from 'react';

export default function SkillsSection() {
  const skills = [
    {
      title: "Animation & CGI",
      description: "Bringing ideas to life with motion, from simple edits to complex 3D sequences.",
      videos: [
        { label: "Motion Reel", src: "/video/thumbnail/videoplayback (2).mp4" }
      ]
    },
    {
      title: "Visual Effects",
      description: "Integrating 3D into live-action footage with simulations and post-production.",
      videos: [
        { label: "VFX Shot", src: "/video/thumbnail/videoplayback (3).mp4" }
      ]
    },
    {
      title: "Environment Design",
      description: "Building immersive, visually stunning, and structurally sound digital worlds from scratch.",
      videos: [
        { label: "Environment Test", src: "/video/thumbnail/videoplayback (4).mp4" }
      ]
    }
  ];
  const [activeSkills, setActiveSkills] = useState([]);

  const toggleSkill = (index) => {
    setActiveSkills(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <section className="pt-20 px-6 relative w-full" >
        <div 
        className="absolute bottom-20 left-10 pointer-events-none select-none opacity-5 z-0 transform -rotate-90 origin-bottom-left translate-y-full translate-x-1/4"
      >
        <h1 
          className="text-[8rem] md:text-[10rem] font-bold leading-none"
          style={{ 
            fontFamily: 'var(--font-akira-expanded)',
            WebkitTextStroke: '2px white',
            color: 'transparent'
          }}
        >
          FLICK
        </h1>
      </div>
      <div className="max-w-4xl mx-auto">
        <h2
          className="text-4xl md:text-5xl font-bold text-white mb-12 text-center transition-opacity duration-300 opacity-100"
          style={{ fontFamily: 'var(--font-akira-expanded)' }}
        >
        Expertise
        </h2>
        <div className="border-t border-gray-700">
          {skills.map((skill, index) => {
            const isActive = activeSkills.includes(index);
            return (
              <div key={index} className="border-b border-gray-700">
                <button
                  type="button"
                  onClick={() => toggleSkill(index)}
                  className="w-full py-8 flex items-center gap-6 md:gap-10 text-left"
                  aria-expanded={isActive}
                >
                  <span className="text-gray-400 text-lg md:text-xl w-12">
                    {String(index + 1).padStart(2, "0")}.
                  </span>
                  <span
                    className="flex-1 text-2xl md:text-2xl font-bold text-white uppercase tracking-wide"
                    style={{ fontFamily: 'var(--font-nunito)' }}
                  >
                    {skill.title}
                  </span>
                  <span className="text-white text-2xl md:text-3xl leading-none">
                    {isActive ? "×" : "+"}
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-[max-height,opacity] duration-500 ${isActive ? "max-h-[1200px] opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <div className="pb-8 pl-16 md:pl-24 pr-4 space-y-6">
                    <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                      {skill.description}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {skill.videos.map((video, videoIndex) => (
                        <div
                          key={videoIndex}
                          className="rounded-lg overflow-hidden border border-white/10 bg-white/5"
                        >
                          <video
                            src={video.src}
                            className="w-full h-full object-cover"
                            controls
                            playsInline
                            preload="metadata"
                            autoPlay
                            muted
                          />
                          <div className="px-4 py-3 text-sm text-gray-300">
                            {video.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}