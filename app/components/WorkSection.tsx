"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import CustomVideoPlayer from "./CustomVideoPlayer";
import { useVideoHover } from "../contexts/VideoHoverContext";

export default function WorkSection() {
  const [hoveredVideoId, setHoveredVideoId] = useState<number | null>(null);
  const [clickedVideoId, setClickedVideoId] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { setVideoHovered } = useVideoHover();

  const videos = [
    {
      id: 1,
      src: "/video/video 1/videoplayback (1).mp4",
      title: "Project 1",
      client: "Client Name",
      description: "This project showcases innovative visual effects and motion graphics. The work involved complex 3D modeling, animation, and compositing techniques.",
      breakdown: [
        { type: "video", src: "/video/video 1/videoplayback (1).mp4" },
      ]
    },
    {
      id: 2,
      src: "/video/video 2/videoplayback (2).mp4",
      title: "Project 2",
      client: "Client Name",
      description: "A creative exploration of environment design and visual storytelling. This project pushed the boundaries of digital art and animation.",
      breakdown: [
        { type: "video", src: "/video/video 2/videoplayback (2).mp4" },
        { type: "video", src: "/video/video 2/videoplayback breakdown (21).mp4" },
        { type: "video", src: "/video/video 2/videoplayback breakdown (22).mp4" },
      ]
    },
    {
      id: 3,
      src: "/video/video 3/videoplayback (3).mp4",
      title: "Project 3",
      client: "Client Name",
      description: "Advanced compositing and visual effects work. This project demonstrates expertise in tracking, matchmoving, and seamless integration.",
      breakdown: [
        { type: "video", src: "/video/video 3/videoplayback (3).mp4" },
        { type: "video", src: "/video/video 3/videoplayback breakdown (31).mp4" },
        { type: "video", src: "/video/video 3/videoplayback breakdown (32).mp4" },
      ]
    },
    {
      id: 4,
      src: "/video/video 4/videoplayback (4).mp4",
      title: "Project 4",
      client: "Client Name",
      description: "Motion graphics and animation project featuring dynamic transitions and creative visual effects.",
      breakdown: [
        { type: "video", src: "/video/video 4/videoplayback (4).mp4" },
        { type: "video", src: "/video/video 4/videoplayback breakdown (41).mp4" },
      ]
    },
    {
      id: 5,
      src: "/video/video 5/videoplayback (5).mp4",
      title: "Project 5",
      client: "Client Name",
      description: "3D modeling and environment design project showcasing detailed world-building and artistic vision.",
      breakdown: [
        { type: "video", src: "/video/video 5/videoplayback (5).mp4" },
        { type: "video", src: "/video/video 5/videoplayback breakdown (51).mp4" },
      ]
    },
    {
      id: 6,
      src: "/video/video 6/videoplayback (6).mp4",
      title: "Project 6",
      client: "Client Name",
      description: "Visual effects and compositing work with focus on realistic integration and seamless blending.",
      breakdown: [
        { type: "video", src: "/video/video 6/videoplayback (6).mp4" },
        { type: "video", src: "/video/video 6/videoplayback breakdown (62).mp4" },
        { type: "video", src: "/video/video 6/videoplayback breakdown (61).mp4" },
      ]
    },
    {
      id: 7,
      src: "/video/video 7/videoplayback (7).mp4",
      title: "Project 7",
      client: "Client Name",
      description: "Creative animation project featuring character design and dynamic motion graphics.",
      breakdown: [
        { type: "video", src: "/video/video 7/videoplayback (7).mp4" },
      ]
    },
    {
      id: 8,
      src: "/video/video 8/videoplayback.mp4",
      title: "Project 8",
      client: "Client Name",
      description: "Advanced visual effects project showcasing technical expertise and creative problem-solving.",
      breakdown: [
        { type: "video", src: "/video/video 8/videoplayback.mp4" },
      ]
    }
  ];

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const handleVideoHover = (videoId: number | null) => {
    if (isMobile) {
      setHoveredVideoId(null);
      setVideoHovered(false);
      return;
    }
    setHoveredVideoId(videoId);
    setVideoHovered(videoId !== null);
  };

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Pause all videos when any video is hovered
  useEffect(() => {
    if (hoveredVideoId) {
      videoRefs.current.forEach((ref) => {
        if (ref) ref.pause();
      });
    } else {
      videoRefs.current.forEach((ref) => {
        if (ref) {
          const playPromise = ref.play();
          if (playPromise !== undefined) {
            playPromise.catch(error => {
              // Autoplay was prevented or interrupted.
              // This is common and can be safely ignored.
            });
          }
        }
      });
    }
  }, [hoveredVideoId]);

  const expandedVideoRef = useRef<HTMLVideoElement>(null);

  // Control expanded video playback
  useEffect(() => {
    if (!hoveredVideoId && expandedVideoRef.current) {
      expandedVideoRef.current.pause();
      expandedVideoRef.current.currentTime = 0;
    }
  }, [hoveredVideoId]);

  const handleNextProject = () => {
    if (clickedVideoId === null) return;
    const currentIndex = videos.findIndex(v => v.id === clickedVideoId);
    if (currentIndex > -1) {
      const nextIndex = (currentIndex + 1) % videos.length;
      setClickedVideoId(videos[nextIndex].id);
    }
  };

  const handlePrevProject = () => {
    if (clickedVideoId === null) return;
    const currentIndex = videos.findIndex(v => v.id === clickedVideoId);
    if (currentIndex > -1) {
      const prevIndex = (currentIndex - 1 + videos.length) % videos.length;
      setClickedVideoId(videos[prevIndex].id);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (clickedVideoId === null) return;
      if (e.key === 'ArrowRight') handleNextProject();
      if (e.key === 'ArrowLeft') handlePrevProject();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [clickedVideoId]);

  return (
    <section
      id="work"
      className="min-h-screen flex items-center justify-center px-6 py-20 relative"
    >
      {/* Expanded video background - only visible when hovering */}
      {hoveredVideoId && !isMobile && (
        <div 
          className="fixed inset-0 z-[30] bg-black pointer-events-none overflow-hidden"
        >
          <video
            ref={expandedVideoRef}
            src={videos.find(v => v.id === hoveredVideoId)?.src}
            className="w-full h-full object-cover"
            style={{ transform: 'scale(1)' }}
            muted
            loop
            playsInline
            onLoadedData={() => {
              if (expandedVideoRef.current && hoveredVideoId) {
                const playPromise = expandedVideoRef.current.play();
                if (playPromise !== undefined) {
                  playPromise.catch((error) => {
                    // Video play was interrupted, ignore the error
                    console.log('Video play interrupted:', error);
                  });
                }
              }
            }}
          />
        </div>
      )}

      <div className="max-w-7xl mx-auto w-full relative z-40">
        <h2 
          className={`text-4xl md:text-5xl font-bold text-white mb-12 text-center transition-opacity duration-300 ${hoveredVideoId ? 'opacity-0' : 'opacity-100'}`}
          style={{ fontFamily: 'var(--font-akira-expanded)' }}
        >
          My Work
        </h2>

        {/* Video grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {videos.map((video, index) => {
            const isHovered = hoveredVideoId === video.id;
            const shouldHide = hoveredVideoId !== null && !isHovered;
            
            return (
              <div 
                key={video.id} 
                className={`group relative overflow-hidden cursor-pointer aspect-video transition-opacity duration-300 ${shouldHide ? 'opacity-0' : isHovered ? 'opacity-30' : 'opacity-100'}`}
                onMouseEnter={() => {
                  handleVideoHover(video.id);
                }}
                onMouseLeave={() => {
                  handleVideoHover(null);
                }}
                onClick={() => {
                  setClickedVideoId(video.id);
                }}
              >
                <video
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
                  src={video.src}
                  className="w-full h-full object-cover"
                  style={{ transform: 'scale(1.5)' }}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-semibold text-white mb-1">{video.title}</h3>
                  {/* <p className="text-sm text-gray-300">{video.client}</p> */}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Project Detail Modal */}
      {clickedVideoId && (
        <div 
          className="fixed inset-0 z-[70] bg-black/95 flex items-center justify-center p-6"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setClickedVideoId(null);
            }
          }}
        >
          {/* Previous Button */}
          <button
            onClick={handlePrevProject}
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-[80] text-white text-3xl md:text-4xl hover:text-gray-300 transition-colors p-2 rounded-full bg-black/20 hover:bg-black/40"
            aria-label="Previous project"
          >
            &#x276E;
          </button>
          {/* Next Button */}
          <button
            onClick={handleNextProject}
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-[80] text-white text-3xl md:text-4xl hover:text-gray-300 transition-colors p-2 rounded-full bg-black/20 hover:bg-black/40"
            aria-label="Next project"
          >
            &#x276F;
          </button>
          <div 
            className="max-w-7xl w-full h-[90vh] bg-dark-grey rounded-lg overflow-hidden flex flex-col"
            style={{ backgroundColor: 'var(--dark-grey)' }}
          >
            {/* Close button */}
            <button
              onClick={() => setClickedVideoId(null)}
              className="absolute top-4 right-4 z-10 text-white text-2xl font-bold hover:text-gray-300 transition-colors"
              aria-label="Close"
            >
              ×
            </button>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 h-full overflow-y-auto modal-scrollbar">
              {/* Left Side - Content */}
              <div className="p-8 md:p-12 flex flex-col">
                <h3 
                  className="text-3xl md:text-2xl font-bold text-white mb-6"
                  style={{ fontFamily: 'var(--font-akira-expanded)' }}
                >
                  {videos.find(v => v.id === clickedVideoId)?.title}
                </h3>
                <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6">
                  {videos.find(v => v.id === clickedVideoId)?.description}
                </p>
                <div className="space-y-4 mb-8">
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">Client</h4>
                    <p className="text-gray-400">{videos.find(v => v.id === clickedVideoId)?.client}</p>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">Services</h4>
                    <p className="text-gray-400">Animation, Visual Effects, Environment Design</p>
                  </div>
                </div>

                {/* First Video - Moved to Left Side */}
                {videos.find(v => v.id === clickedVideoId)?.breakdown[0] && (
                  <div className="w-full mt-auto">
                    {videos.find(v => v.id === clickedVideoId)?.breakdown[0].type === "video" ? (
                      <CustomVideoPlayer
                        src={videos.find(v => v.id === clickedVideoId)?.breakdown[0].src || ""}
                        autoPlay={true}
                        initialVolume={0.2}
                        loop={true}
                      />
                    ) : (
                      <div className="relative w-full aspect-video">
                        <Image
                          src={videos.find(v => v.id === clickedVideoId)?.breakdown[0].src || ""}
                          alt="Project Main View"
                          fill
                          className="rounded-lg object-cover"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Right Side - Breakdown Media */}
              <div className="p-8 md:p-12">
                <h4 
                  className="text-2xl font-bold text-white mb-6"
                  style={{ fontFamily: 'var(--font-akira-expanded)' }}
                >
                  Breakdown
                </h4>
                <div className="space-y-6">
                  {videos.find(v => v.id === clickedVideoId)?.breakdown.slice(1).map((item, index) => (
                    <div key={index} className="w-120">
                      {item.type === "video" ? (
                        <CustomVideoPlayer
                          src={item.src}
                          autoPlay={true} // Autoplay all videos in breakdown
                          initialVolume={0} // Mute subsequent videos
                          loop={true} // Special case: only the first video of project 6 loops
                        />
                      ) : (
                        <div className="relative w-full aspect-video">
                          <Image
                            src={item.src}
                            alt={`Breakdown ${index + 1}`}
                            fill
                            className="rounded-lg object-cover"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
