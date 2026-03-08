import { useState, useRef, useEffect } from "react";
import { useVideoHover } from "../contexts/VideoHoverContext";

export default function WorkSection() {
  const [hoveredVideoId, setHoveredVideoId] = useState(null);
  const [clickedVideoId, setClickedVideoId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMainVideoLoading, setIsMainVideoLoading] = useState(true);
  const [loadingBreakdownVideos, setLoadingBreakdownVideos] = useState({});
  const fullScreenVideoRef = useRef(null);
  const { setVideoHovered } = useVideoHover();

  const videos = [
    {
      id: 1,
      src: "/video/thumbnail/videoplayback (1).mp4",
      description: "This project showcases innovative visual effects and motion graphics. The work involved complex 3D modeling, animation, and compositing techniques.",
      full_screen_video: "https://rycpkqmkafsnolbnojgg.supabase.co/storage/v1/object/public/portfolio/video%20(1).mp4",
      breakdown: [
        // { type: "video", src: "/video/video 1/videoplayback (1).mp4" },
      ]
    },
    {
      id: 2,
      src: "/video/thumbnail/videoplayback (2).mp4",
      description: "A creative exploration of environment design and visual storytelling. This project pushed the boundaries of digital art and animation.",
      full_screen_video: "https://rycpkqmkafsnolbnojgg.supabase.co/storage/v1/object/public/portfolio/video%20(2).mp4",
      breakdown: [
        { type: "video", src: "/video/breakdown/videoplayback breakdown (21).mp4" },
        { type: "video", src: "/video/breakdown/videoplayback breakdown (22).mp4" },
      ]
    },
    {
      id: 3,
      src: "/video/thumbnail/videoplayback (3).mp4",
      description: "Advanced compositing and visual effects work. This project demonstrates expertise in tracking, matchmoving, and seamless integration.",
      full_screen_video: "https://rycpkqmkafsnolbnojgg.supabase.co/storage/v1/object/public/portfolio/video%20(3).mp4",
      breakdown: [
        { type: "video", src: "/video/breakdown/videoplayback breakdown (31).mp4" },
        { type: "video", src: "/video/breakdown/videoplayback breakdown (32).mp4" },
      ]
    },
    {
      id: 4,
      src: "/video/thumbnail/videoplayback (4).mp4",
      description: "Motion graphics and animation project featuring dynamic transitions and creative visual effects.",
      full_screen_video: "https://rycpkqmkafsnolbnojgg.supabase.co/storage/v1/object/public/portfolio/video%20(4).mp4",
      breakdown: [
        { type: "video", src: "/video/breakdown/videoplayback breakdown (41).mp4" },
      ]
    },
    {
      id: 5,
      src: "/video/thumbnail/videoplayback (5).mp4",
      description: "3D modeling and environment design project showcasing detailed world-building and artistic vision.",
      full_screen_video: "https://rycpkqmkafsnolbnojgg.supabase.co/storage/v1/object/public/portfolio/video%20(5).mp4",
      breakdown: [
        { type: "video", src: "/video/breakdown/videoplayback breakdown (51).mp4" },
      ]
    },
    {
      id: 6,
      src: "/video/thumbnail/videoplayback (6).mp4",
      description: "Visual effects and compositing work with focus on realistic integration and seamless blending.",
      full_screen_video: "https://rycpkqmkafsnolbnojgg.supabase.co/storage/v1/object/public/portfolio/video%20(6).mp4",
      breakdown: [
        { type: "video", src: "/video/breakdown/videoplayback breakdown (62).mp4" },
        { type: "video", src: "/video/breakdown/videoplayback breakdown (61).mp4" },
      ]
    },
    // {
    //   id: 7,
    //   src: "/video/thumbnail/videoplayback (7).mp4",
    //   description: "Creative animation project featuring character design and dynamic motion graphics.",
    //   full_screen_video: "/video/full-screen-video/video (7).mp4",
    //   breakdown: [
    //     { type: "video", src: "/video/video 7/videoplayback (7).mp4" },
    //   ]
    // },
    // {
    //   id: 8,
    //   src: "/video/thumbnail/videoplayback.mp4",
    //   description: "Advanced visual effects project showcasing technical expertise and creative problem-solving.",
    //   full_screen_video: "/video/full-screen-video/video (8).mp4",
    //   breakdown: [
    //     { type: "video", src: "/video/video 8/videoplayback.mp4" },
    //   ]
    // }
  ];

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const handleVideoHover = (videoId) => {
    if (isMobile) {
      setHoveredVideoId(null);
      setVideoHovered(false);
      return;
    }
    setHoveredVideoId(videoId);
    setVideoHovered(videoId !== null);
  };

  const videoRefs = useRef([]);

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

  const expandedVideoRef = useRef(null);

  // Control expanded video playback
  useEffect(() => {
    if (!hoveredVideoId && expandedVideoRef.current) {
      expandedVideoRef.current.pause();
      expandedVideoRef.current.currentTime = 0;
    }
  }, [hoveredVideoId]);



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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {videos.map((video, index) => {
            const isHovered = hoveredVideoId === video.id;
            const shouldHide = hoveredVideoId !== null && !isHovered;

            return (
              <div
                key={video.id}
                className={`group relative overflow-hidden cursor-pointer aspect-video transition-opacity duration-300 ${shouldHide ? 'opacity-0' : isHovered ? 'opacity-5' : 'opacity-100'}`}
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
                {/* <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-semibold text-white mb-1">{video.title}</h3>
                   <p className="text-sm text-gray-300">{video.client}</p> 
                </div> */}
              </div>
            );
          })}
        </div>
      </div>

      {/* Full Screen Video Modal */}
      {clickedVideoId && (
        <div
          className="fixed inset-0 z-[70] bg-black w-screen h-screen overflow-y-scroll no-scrollbar"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setClickedVideoId(null);
            }
          }}
        >
          <style>{`
            .no-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .no-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>
          {/* Video Section */}
          <div className="w-full h-screen flex items-center justify-center relative">
            {isMainVideoLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black z-50">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-gray-600 border-t-white rounded-full animate-spin"></div>
                  <p className="text-white text-lg">Loading video...</p>
                </div>
              </div>
            )}
            <video
              ref={fullScreenVideoRef}
              key={clickedVideoId}
              src={videos.find(v => v.id === clickedVideoId)?.full_screen_video}
              className="w-full h-full object-cover cursor-pointer"
              autoPlay
              loop
              playsInline
              onCanPlay={() => setIsMainVideoLoading(false)}
              onLoadStart={() => setIsMainVideoLoading(true)}
              onClick={(e) => {
                e.stopPropagation();
                if (fullScreenVideoRef.current) {
                  if (fullScreenVideoRef.current.paused) {
                    fullScreenVideoRef.current.play();
                    setIsPlaying(true);
                  } else {
                    fullScreenVideoRef.current.pause();
                    setIsPlaying(false);
                  }
                }
              }}
            />

            {/* Down Arrow Indicator */}
            <div className="absolute bottom-8 left-8 flex flex-col items-center gap-2 animate-bounce">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>

            {/* Close button */}
            <button
              onClick={() => setClickedVideoId(null)}
              className="fixed top-6 right-6 z-[80] p-1 hover:bg-black/40 backdrop-blur-sm text-white transition-all duration-200"
              aria-label="Close"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (fullScreenVideoRef.current) {
                  if (document.fullscreenElement) {
                    document.exitFullscreen();
                  } else {
                    fullScreenVideoRef.current.requestFullscreen();
                  }
                }
              }}
              className="absolute bottom-8 right-8 z-[80] text-white hover:text-gray-300 transition-colors p-2"
              aria-label="Toggle Fullscreen"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8V4m0 0h4m12 0h4m0 0v4m0 8v4m0 0h-4m-12 0H4m0 0v-4"
                />
              </svg>
            </button>
          </div>

          {/* Breakdown Section */}
          <div className="w-full min-h-screen bg-dark-grey p-8 md:p-12" style={{ backgroundColor: 'var(--dark-grey)' }}>
            <h2
              className="text-3xl md:text-4xl font-bold text-white mb-8"
              style={{ fontFamily: 'var(--font-akira-expanded)' }}
            >
              Breakdown
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {videos.find(v => v.id === clickedVideoId)?.breakdown?.map((item, index) => (
                <div key={index} className="relative">
                  {item.type === "video" ? (
                    <div className="relative">
                      {loadingBreakdownVideos[index] && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg z-50">
                          <div className="flex flex-col items-center gap-2">
                            <div className="w-8 h-8 border-3 border-gray-600 border-t-white rounded-full animate-spin"></div>
                            <p className="text-white text-sm">Loading...</p>
                          </div>
                        </div>
                      )}
                      <video
                        src={item.src}
                        className="w-full h-auto object-cover rounded-lg"
                        controls
                        autoPlay
                        playsInline
                        loop
                        muted
                        onCanPlay={() => setLoadingBreakdownVideos(prev => ({ ...prev, [index]: false }))}
                        onLoadStart={() => setLoadingBreakdownVideos(prev => ({ ...prev, [index]: true }))}
                      />
                    </div>
                  ) : (
                    <img
                      src={item.src}
                      alt={`Breakdown ${index + 1}`}
                      className="w-full h-auto object-cover rounded-lg"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
