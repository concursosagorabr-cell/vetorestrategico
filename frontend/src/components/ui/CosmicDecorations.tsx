"use client";

import React from "react";

interface StarProps {
  size?: number;
  className?: string;
  color?: "gold" | "cyan" | "emerald";
  delay?: number;
  duration?: number;
  style?: React.CSSProperties;
}

export const TwinklingStar: React.FC<StarProps> = ({
  size = 18,
  className = "",
  color = "gold",
  delay = 0,
  duration = 3,
  style,
}) => {
  const colorMap = {
    gold: "text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]",
    cyan: "text-sky-400 fill-sky-400 drop-shadow-[0_0_8px_rgba(14,165,233,0.6)]",
    emerald: "text-emerald-400 fill-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]",
  };

  return (
    <div
      style={{
        ...style,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
      className={`inline-block select-none pointer-events-none animate-twinkle ${className}`}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={colorMap[color]}
      >
        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
      </svg>
    </div>
  );
};

interface FloatingProps {
  children: React.ReactNode;
  yOffset?: number;
  duration?: number;
  delay?: number;
  rotateOffset?: number;
  className?: string;
}

export const FloatingElement: React.FC<FloatingProps> = ({
  children,
  duration = 5,
  delay = 0,
  className = "",
}) => {
  return (
    <div
      style={{
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
      }}
      className={`animate-float ${className}`}
    >
      {children}
    </div>
  );
};

export const OrbitRings: React.FC<{ size?: number; className?: string }> = ({
  size = 300,
  className = "",
}) => {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative flex items-center justify-center pointer-events-none select-none ${className}`}
    >
      <div className="absolute inset-0 rounded-full border border-sky-400/20 border-dashed animate-spin-slow" />
      <div className="absolute inset-6 rounded-full border border-emerald-400/20 animate-spin-slow-reverse" />
      <div className="absolute inset-12 rounded-full border border-amber-400/20 border-dotted animate-spin-slow" />
    </div>
  );
};

