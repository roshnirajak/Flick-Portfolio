"use client";

import { useState, useRef, useEffect } from 'react';

interface CustomVideoPlayerProps {
  src: string;
  autoPlay?: boolean;
  initialVolume?: number;
  loop?: boolean;
}

export default function CustomVideoPlayer({ src, autoPlay = false, initialVolume = 0.5, loop = false }: CustomVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [volume, setVolume] = useState(initialVolume);
  const [isMuted, setIsMuted] = useState(initialVolume === 0);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);
  const [isLooping, setIsLooping] = useState(loop);
  const wasPlayingBeforeSeek = useRef(false);
  const [isMobile, setIsMobile] = useState(false);
  let controlsTimeout: NodeJS.Timeout;

  const resetPlayer = () => {
    setProgress(0);
    setCurrentTime(0);
    setDuration(0);
    // Not resetting isLooping, as it's a user preference per video session
    setIsPlaying(autoPlay);
  };

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    resetPlayer();

    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (isSeeking) return;
      if (isNaN(video.duration)) return;
      setCurrentTime(video.currentTime);
      setProgress((video.currentTime / video.duration) * 100);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      video.volume = volume;
      if (autoPlay) {
        video.play().catch(err => console.error("Autoplay failed:", err));
        setIsPlaying(true);
      }
    };

    const handleEnded = () => {
      if (!isLooping) {
        setIsPlaying(false);
        setProgress(100); // Show progress bar as full
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
    };
  }, [src, autoPlay, volume, isLooping, isSeeking]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.loop = isLooping;
    }
  }, [isLooping]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = document.fullscreenElement !== null;
      setIsFullscreen(isCurrentlyFullscreen);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      // No need to remove the vendor-prefixed ones, as they are the same function
    };
  }, [src, autoPlay]);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      if (isMuted) {
        video.volume = volume > 0 ? volume : 0.5;
        setVolume(volume > 0 ? volume : 0.5);
        setIsMuted(false);
      } else {
        video.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const toggleLoop = () => {
    setIsLooping(prev => !prev);
  };

  const handleSeekMouseDown = () => {
    const video = videoRef.current;
    if (!video) return;
    setIsSeeking(true);
    wasPlayingBeforeSeek.current = !video.paused;
    video.pause();
  };

  const handleSeekMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    setIsSeeking(false);
    if (wasPlayingBeforeSeek.current) {
      video.play();
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (video) {
      const newProgress = parseFloat(e.target.value);
      setProgress(newProgress);
      const seekTime = (newProgress / 100) * video.duration;
      video.currentTime = seekTime;
    }
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handleMouseMove = () => {
    setIsControlsVisible(true);
    clearTimeout(controlsTimeout);
    controlsTimeout = setTimeout(() => setIsControlsVisible(false), 4000);
    controlsTimeout = setTimeout(() => setIsControlsVisible(false), 2000);
  };

  const toggleFullscreen = () => {
    const player = playerContainerRef.current;
    if (!player) return;

    if (!document.fullscreenElement) {
      player.requestFullscreen().catch(err => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const handleDoubleClick = () => {
    // This will handle fullscreen toggling
    toggleFullscreen();
  };

  const handleVideoClick = () => {
    // On mobile, a single tap should toggle controls. On desktop, it toggles play/pause.
    if (isMobile) {
      setIsControlsVisible(prev => !prev);
    } else {
      togglePlayPause();
    }
  };

  return (
    <div 
      ref={playerContainerRef}
      className="relative w-full aspect-video group bg-black"
      onMouseMove={!isMobile ? handleMouseMove : undefined}
      onMouseLeave={() => setIsControlsVisible(false)}
    >
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full rounded-lg object-contain"
        onClick={handleVideoClick} // Toggles controls on mobile, play/pause on desktop
        onDoubleClick={handleDoubleClick} // Double click for fullscreen
        playsInline
      />
      <div 
        className={`absolute bottom-0 left-0 right-0 p-2 md:p-4 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 ${isControlsVisible || !isPlaying ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Progress Bar */}
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onMouseDown={handleSeekMouseDown}
          onMouseUp={(e) => handleSeekMouseUp(e as unknown as React.MouseEvent<HTMLInputElement>)}
          onChange={handleProgressChange}
          className="w-full h-1 md:h-1.5 bg-gray-600 rounded-lg appearance-none cursor-pointer range-sm"
        />
        <div className="flex items-center justify-end md:justify-between mt-2 text-white text-xs md:text-sm">
          <div className="hidden md:flex items-center gap-2 md:gap-4">
            {/* Play/Pause Button */}
            <button onClick={togglePlayPause} className="text-2xl md:text-xl cursor-pointer p-2">
              {isPlaying ? '❚❚' : '►'}
            </button>
            {/* Volume Control */}
            <div className="items-center gap-2 hidden md:flex ">
              <button onClick={toggleMute} className="cursor-pointer p-2">
                {isMuted || volume === 0 ? '🔇' : '🔊'}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer range-sm"
              />
            </div>
          </div>
          {/* Time Display */}
          <div className="flex items-center justify-end gap-2 md:gap-4">
            <div className="hidden md:block min-w-[80px] md:min-w-[100px] text-center">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
            {/* Play/Pause Button (Mobile Only) */}
            <button onClick={togglePlayPause} className="text-2xl md:hidden cursor-pointer p-2">
              {isPlaying ? '❚❚' : '►'}
            </button>
            {/* Fullscreen Button */}
            <button onClick={toggleLoop} className={`cursor-pointer p-2 ${isLooping ? 'text-white' : 'text-gray-400'}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 2.1l4 4-4 4" />
                <path d="M3 12.2v-2a4 4 0 0 1 4-4h12" />
                <path d="M7 21.9l-4-4 4-4" />
                <path d="M21 11.8v2a4 4 0 0 1-4 4H5" />
              </svg>
            </button>
            {/* Fullscreen Button */}
            <button onClick={toggleFullscreen} className="text-lg cursor-pointer p-2">
              {isFullscreen ? '⤡' : '⤢'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
