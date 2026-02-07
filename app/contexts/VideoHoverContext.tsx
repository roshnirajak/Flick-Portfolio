"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface VideoHoverContextType {
  isVideoHovered: boolean;
  setVideoHovered: (hovered: boolean) => void;
}

const VideoHoverContext = createContext<VideoHoverContextType | undefined>(undefined);

export function VideoHoverProvider({ children }: { children: ReactNode }) {
  const [isVideoHovered, setVideoHovered] = useState(false);

  return (
    <VideoHoverContext.Provider value={{ isVideoHovered, setVideoHovered }}>
      {children}
    </VideoHoverContext.Provider>
  );
}

export function useVideoHover() {
  const context = useContext(VideoHoverContext);
  if (context === undefined) {
    throw new Error("useVideoHover must be used within a VideoHoverProvider");
  }
  return context;
}

