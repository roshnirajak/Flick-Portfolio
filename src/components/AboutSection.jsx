import navigationData from "../data/navigation.json";

export default function AboutSection() {
  const { email } = navigationData;

  return (
    <section
      id="about"
      className="relative w-full bg-dark-grey"
      style={{ backgroundColor: 'var(--dark-grey)' }}
    >

      {/* About me - Strip */}
      <div className="relative w-full grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch">
        {/* Image on the left - touches top, bottom, and left */}
        <div className="relative w-full min-h-[200px] md:min-h-[280px]">
          <img
            src="/image/flick.jpg"
            alt="About"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Text on the right */}
        <div className="px-6 py-8 flex flex-col justify-center max-w-2xl mx-auto w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Hi, I'm Surya!
          </h2>
          <div className="space-y-3 text-base md:text-lg text-gray-300">
            <p>
              A Cinematic 3D Generalist with 8+ years of experience in Blender.
            </p>
            <p>
              I create high-quality visuals, combining 3D, real-time rendering, tracking, simulation, and compositing into cohesive final imagery.

            </p>
            <p className="pt-2">
              Email: <a className="text-white hover:underline">{email}</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
