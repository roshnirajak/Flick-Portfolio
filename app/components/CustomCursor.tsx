"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let animationFrameId: number;

    const updateCursor = (e: MouseEvent) => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = requestAnimationFrame(() => {
        if (cursorRef.current) {
          cursorRef.current.style.left = `${e.clientX}px`;
          cursorRef.current.style.top = `${e.clientY}px`;
        }
      });
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Check for hover on links, buttons, and images
    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.tagName === "IMG" ||
        target.closest("a") !== null ||
        target.closest("button") !== null ||
        target.closest("img") !== null ||
        target.style.cursor === "pointer" ||
        window.getComputedStyle(target).cursor === "pointer";

      setIsHovering(isInteractive);
      setIsVisible(isInteractive);
    };

    window.addEventListener("mousemove", updateCursor, { passive: true });
    window.addEventListener("mousemove", checkHover, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      window.removeEventListener("mousemove", updateCursor);
      window.removeEventListener("mousemove", checkHover);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`fixed pointer-events-none z-[9999] ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        left: "0px",
        top: "0px",
        transform: "translate(-50%, -50%)",
        transition: "opacity 0.1s ease-out",
      }}
    >
      <div
        className={`rounded-full transition-all duration-200 ${
          isHovering ? "w-16 h-16" : "w-6 h-6"
        }`}
        style={{
          background: isHovering ? "rgba(255, 255, 255, 0.3)" : "white",
          backdropFilter: isHovering ? "invert(1)" : "none",
          WebkitBackdropFilter: isHovering ? "invert(1)" : "none",
          mixBlendMode: isHovering ? "normal" : "difference",
        }}
      />
    </div>
  );
}

