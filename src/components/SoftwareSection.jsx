export default function SoftwareSection({ withHeading = true }) {
  const software = [
    {
    //   name: "Blender",
      logo: "/image/softwares/Blender.png",
      size: "w-28 h-14 md:w-40 md:h-20",
    },
    {
      name: "Unreal Engine",
      logo: "/image/softwares/Unreal-Engine.webp",
      size: "w-10 h-10 md:w-12 md:h-12"
    },
    {
    //   name: "After Effects",
      logo: "/image/softwares/After-Effects.png",
      size: "w-12 h-12 md:w-18 md:h-18",
    },
    {
      name: "Silhouette FX",
      logo: "/image/softwares/Silhouette-FX.png",
      size: "w-16 h-16 md:w-19 md:h-19",
    },
    {
      name: "SynthEyes",
      logo: "/image/softwares/SynthEyes.png",
      size: "w-16 h-16 md:w-18 md:h-18",
    },
    {
    //   name: "Marvelous Designer",
      logo: "/image/softwares/Marvelous-Designer.png",
      size: "w-28 h-14 md:w-30 md:h-20",
    },
    {
    //   name: "EmberGen",
      logo: "/image/softwares/Embergen.png",
      size: "w-28 h-14 md:w-40 md:h-20",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Text */}

      {withHeading && (
        <div className="max-w-4xl mx-auto px-6 mb-8 relative z-10">
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-8"
            style={{ fontFamily: 'var(--font-nunito)' }}
          >
            Softwares I Use
          </h2>
        </div>
      )}
      
      <div className="py-10 w-full relative z-10">
        <div className="flex flex-wrap items-center justify-around gap-x-10 gap-y-8">
          {software.map((item, index) => (
            <div key={index} className="flex items-center gap-3 text-white/80">
              <div className={`${item.size} flex items-center `}>
                <img
                  src={item.logo}
                  alt={item.name}
                  className={`w-full h-full ${item.name === "Silhouette FX"
                      ? "object-cover object-center scale-150"
                      : "object-contain"
                    }`}
                />
              </div>
              <span className="text-lg md:text-xl font-semibold tracking-wide uppercase">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}