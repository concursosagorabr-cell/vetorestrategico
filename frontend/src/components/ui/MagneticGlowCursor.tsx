"use client";

import React, { useEffect, useRef, useState } from "react";

export const MagneticGlowCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasTouch =
        window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
      setIsTouchDevice(hasTouch);
      if (hasTouch) return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Instant dot positioning
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Check hover state efficiently
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          "button, a, input, textarea, select, [role='button'], [data-cursor='pointer'], [data-cursor='video']"
        );
        setIsHovered(!!interactive);
      }
    };

    // Smooth lerp on ring cursor
    const loop = () => {
      currentX += (mouseX - currentX) * 0.18;
      currentY += (mouseY - currentY) * 0.18;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Precision Micro-Dot */}
      <div
        ref={dotRef}
        style={{ willChange: "transform" }}
        className={`fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#10b981] transition-opacity duration-150 ${
          isHovered ? "opacity-0 scale-0" : "opacity-100 scale-100"
        }`}
      />

      {/* Sleek Smooth Halo Ring */}
      <div
        ref={cursorRef}
        style={{ willChange: "transform" }}
        className={`fixed top-0 left-0 -ml-4 -mt-4 rounded-full border transition-all duration-200 ${
          isHovered
            ? "w-12 h-12 -ml-6 -mt-6 border-emerald-400/80 bg-emerald-400/10 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
            : "w-8 h-8 border-emerald-400/40 bg-transparent shadow-[0_0_8px_rgba(16,185,129,0.15)]"
        }`}
      />
    </div>
  );
};

