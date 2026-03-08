"use client";

import { createContext, useContext, useState } from "react";

const VideoHoverContext = createContext(undefined);

export function VideoHoverProvider({ children }) {
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
