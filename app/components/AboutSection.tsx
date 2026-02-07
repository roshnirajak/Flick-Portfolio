import Image from "next/image";
import navigationData from "../data/navigation.json";

export default function AboutSection() {
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
    <section
      id="about"
      className="relative w-full bg-dark-grey"
      style={{ backgroundColor: 'var(--dark-grey)' }}
    >
      {/* Software I Use section - commented out
      <div className="relative w-full grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch bg-black">
        <div className="relative w-full min-h-[200px] md:min-h-[280px]">
          <Image
            src="/image/flick.jpg"
            alt="About"
            fill
            className="object-cover"
          />
        </div>
        <div className="px-6 py-8 flex flex-col justify-center max-w-2xl mx-auto w-full">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
            Software I Use
          </h3>
          <ul className="grid grid-cols-2 gap-4">
            {software.map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-3 text-base md:text-lg text-gray-300"
              >
                <div className="w-6 h-6 flex-shrink-0 overflow-hidden">
                  <img
                    src={item.logo}
                    alt={item.name}
                    className={`w-full h-full ${
                      item.name === "Silhouette FX"
                        ? "object-cover object-center scale-190"
                        : "object-contain"
                    }`}
                  />
                </div>
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      */}

      {/* About me - Strip */}
      <div className="relative w-full grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch">
        {/* Image on the left - touches top, bottom, and left */}
        <div className="relative w-full min-h-[200px] md:min-h-[280px]">
          <Image
            src="/image/flick.jpg"
            alt="About"
            fill
            className="object-cover"
          />
        </div>

        {/* Text on the right */}
        <div className="px-6 py-8 flex flex-col justify-center max-w-2xl mx-auto w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Hi, I'm Surya!
          </h2>
          <div className="space-y-3 text-base md:text-lg text-gray-300">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>
            <p className="pt-2">
              Email: <a href={`mailto:${email}`} className="text-white hover:underline">{email}</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

