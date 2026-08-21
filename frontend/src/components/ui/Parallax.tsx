"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  MotionValue,
} from "framer-motion";

export interface ParallaxLayerProps {
  children?: React.ReactNode;
  /** Speed multiplier: negative moves faster upward (foreground), positive lags behind (deep background). Default: -0.2 */
  speed?: number;
  /** Optional subtle rotation multiplier during scroll */
  rotateSpeed?: number;
  /** Optional subtle scale range during scroll (e.g. [0.95, 1.05]) */
  scaleRange?: [number, number];
  /** Optional opacity range during scroll (e.g. [0.4, 1]) */
  opacityRange?: [number, number];
  /** Direction of movement */
  direction?: "vertical" | "horizontal" | "diagonal";
  /** Optional custom container class name */
  className?: string;
  /** Spring physics damping (higher = smoother, default: 28) */
  damping?: number;
  /** Spring physics stiffness (default: 150) */
  stiffness?: number;
  /** Custom style overrides */
  style?: React.CSSProperties;
}

/**
 * High-performance GPU-accelerated Parallax Layer
 * Driven exclusively by compositor-only translate3d transforms with spring smoothing.
 */
export const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
  children,
  speed = -0.2,
  rotateSpeed = 0,
  scaleRange,
  opacityRange,
  direction = "vertical",
  className = "",
  damping = 28,
  stiffness = 150,
  style = {},
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Calculate distance based on speed multiplier (-250px to +250px range)
  const distance = speed * 250;
  
  const rawY = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "horizontal" ? [0, 0] : [-distance, distance]
  );
  const rawX = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "vertical" ? [0, 0] : [distance * 0.7, -distance * 0.7]
  );

  const smoothY = useSpring(rawY, { damping, stiffness });
  const smoothX = useSpring(rawX, { damping, stiffness });

  // Optional rotation
  const rawRotate = useTransform(
    scrollYProgress,
    [0, 1],
    [-rotateSpeed * 45, rotateSpeed * 45]
  );
  const smoothRotate = useSpring(rawRotate, { damping, stiffness });

  // Optional scale
  const rawScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    scaleRange ? [scaleRange[0], scaleRange[1], scaleRange[0]] : [1, 1, 1]
  );
  const smoothScale = useSpring(rawScale, { damping, stiffness });

  // Optional opacity
  const rawOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    opacityRange ? [opacityRange[0], opacityRange[1], opacityRange[0]] : [1, 1, 1]
  );
  const smoothOpacity = useSpring(rawOpacity, { damping, stiffness });

  if (shouldReduceMotion) {
    return <div className={className} style={style}>{children}</div>;
  }

  const motionStyles: Record<string, MotionValue<number> | number | string | undefined> = {
    ...style,
    willChange: "transform",
  };

  if (direction === "vertical") {
    motionStyles.y = smoothY;
  } else if (direction === "horizontal") {
    motionStyles.x = smoothX;
  } else {
    motionStyles.x = smoothX;
    motionStyles.y = smoothY;
  }

  if (rotateSpeed !== 0) {
    motionStyles.rotate = smoothRotate;
  }
  if (scaleRange) {
    motionStyles.scale = smoothScale;
  }
  if (opacityRange) {
    motionStyles.opacity = smoothOpacity;
  }

  return (
    <motion.div
      ref={ref}
      style={motionStyles as any}
      className={`transform-gpu ${className}`}
    >
      {children}
    </motion.div>
  );
};

/* =========================================================================
   PARALLAX TYPOGRAPHY & WATERMARK COMPONENTS
   ========================================================================= */

export interface ParallaxTextProps {
  children: React.ReactNode;
  speed?: number;
  direction?: "vertical" | "horizontal";
  className?: string;
  as?: "div" | "h1" | "h2" | "h3" | "p" | "span";
}

/**
 * Parallax typography element that smoothly shifts in depth relative to page scroll.
 */
export const ParallaxText: React.FC<ParallaxTextProps> = ({
  children,
  speed = -0.15,
  direction = "vertical",
  className = "",
  as = "div",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const distance = speed * 180;
  const rawShift = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "vertical" ? [-distance, distance] : [distance, -distance]
  );
  const smoothShift = useSpring(rawShift, { damping: 26, stiffness: 140 });

  if (shouldReduceMotion) {
    const Component = as as any;
    return <Component className={className}>{children}</Component>;
  }

  return (
    <motion.div
      ref={ref}
      style={{
        [direction === "vertical" ? "y" : "x"]: smoothShift,
        willChange: "transform",
      }}
      className={`transform-gpu inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
};

export interface ParallaxWatermarkProps {
  text: string;
  speed?: number;
  direction?: "left" | "right" | "up" | "down";
  className?: string;
  variant?: "dark" | "light" | "emerald" | "cyan";
  outline?: boolean;
}

/**
 * Monumental background typography watermark with subtle parallax motion.
 * Provides high-tech depth without hindering foreground reading.
 */
export const ParallaxWatermark: React.FC<ParallaxWatermarkProps> = ({
  text,
  speed = 0.2,
  direction = "left",
  className = "",
  variant = "dark",
  outline = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const distance = speed * 300;
  const rawX = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "left" ? [distance * 0.6, -distance * 0.6] : [-distance * 0.6, distance * 0.6]
  );
  const rawY = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "up" ? [distance * 0.5, -distance * 0.5] : [-distance * 0.5, distance * 0.5]
  );

  const smoothX = useSpring(rawX, { damping: 30, stiffness: 100 });
  const smoothY = useSpring(rawY, { damping: 30, stiffness: 100 });

  const isHorizontal = direction === "left" || direction === "right";

  const variantStyles = {
    dark: outline
      ? "text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.04)] sm:[-webkit-text-stroke:1.5px_rgba(255,255,255,0.06)]"
      : "text-white/[0.03]",
    light: outline
      ? "text-transparent [-webkit-text-stroke:1px_rgba(15,23,42,0.04)] sm:[-webkit-text-stroke:1.5px_rgba(15,23,42,0.06)]"
      : "text-slate-900/[0.03]",
    emerald: outline
      ? "text-transparent [-webkit-text-stroke:1px_rgba(16,185,129,0.08)] sm:[-webkit-text-stroke:1.5px_rgba(16,185,129,0.12)]"
      : "text-emerald-500/[0.05]",
    cyan: outline
      ? "text-transparent [-webkit-text-stroke:1px_rgba(6,182,212,0.08)] sm:[-webkit-text-stroke:1.5px_rgba(6,182,212,0.12)]"
      : "text-cyan-500/[0.05]",
  };

  if (shouldReduceMotion) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0 flex items-center justify-center">
        <span
          className={`font-black uppercase tracking-tighter whitespace-nowrap text-6xl sm:text-8xl lg:text-9xl ${variantStyles[variant]} ${className}`}
        >
          {text}
        </span>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0 flex items-center justify-center"
      aria-hidden="true"
    >
      <motion.div
        style={{
          [isHorizontal ? "x" : "y"]: isHorizontal ? smoothX : smoothY,
          willChange: "transform",
        }}
        className="transform-gpu flex whitespace-nowrap"
      >
        <span
          className={`font-black uppercase tracking-tighter text-6xl sm:text-8xl lg:text-9xl leading-none select-none ${variantStyles[variant]} ${className}`}
        >
          {text}
        </span>
      </motion.div>
    </div>
  );
};

/* =========================================================================
   THEMED STRATEGIC VECTOR & BACKGROUND MOTIFS
   ========================================================================= */

export interface ParallaxVectorGridProps {
  className?: string;
  theme?: "dark" | "light" | "emerald";
  speed?: number;
}

/**
 * Cartesian & Isometric Strategic Vector Grid with Perspective Lines and Depth Drift.
 */
export const ParallaxVectorGrid: React.FC<ParallaxVectorGridProps> = ({
  className = "",
  theme = "dark",
  speed = 0.08,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const distance = speed * 150;
  const rawY = useTransform(scrollYProgress, [0, 1], [-distance, distance]);
  const smoothY = useSpring(rawY, { damping: 32, stiffness: 110 });

  const gridColors = {
    dark: "rgba(255, 255, 255, 0.035)",
    light: "rgba(15, 23, 42, 0.035)",
    emerald: "rgba(16, 185, 129, 0.06)",
  };

  const dotColors = {
    dark: "rgba(16, 185, 129, 0.35)",
    light: "rgba(5, 150, 105, 0.3)",
    emerald: "rgba(16, 185, 129, 0.5)",
  };

  if (shouldReduceMotion) {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${className}`}>
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, ${gridColors[theme]} 1px, transparent 1px),
              linear-gradient(to bottom, ${gridColors[theme]} 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${className}`}
      aria-hidden="true"
    >
      <motion.div
        style={{
          y: smoothY,
          willChange: "transform",
        }}
        className="absolute -inset-16 w-[calc(100%+8rem)] h-[calc(100%+8rem)] transform-gpu"
      >
        {/* Fine Matrix Grid */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, ${gridColors[theme]} 1px, transparent 1px),
              linear-gradient(to bottom, ${gridColors[theme]} 1px, transparent 1px)
            `,
            backgroundSize: "52px 52px",
          }}
        />

        {/* Strategic Crosshair Coordinate Nodes */}
        <div className="absolute top-12 left-16 w-3 h-3 border-l border-t border-emerald-400/40" />
        <div className="absolute top-12 right-16 w-3 h-3 border-r border-t border-emerald-400/40" />
        <div className="absolute bottom-16 left-16 w-3 h-3 border-l border-b border-emerald-400/40" />
        <div className="absolute bottom-16 right-16 w-3 h-3 border-r border-b border-emerald-400/40" />

        {/* Ambient Dot Accents */}
        <div
          className="absolute top-1/4 left-1/3 w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: dotColors[theme] }}
        />
        <div
          className="absolute top-2/3 right-1/4 w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: dotColors[theme] }}
        />
        <div
          className="absolute bottom-1/4 left-1/5 w-1 h-1 rounded-full"
          style={{ backgroundColor: dotColors[theme] }}
        />
      </motion.div>
    </div>
  );
};

export interface StrategicVectorMeshProps {
  className?: string;
  theme?: "dark" | "light";
}

/**
 * Pure SVG strategic vector patterns (arrows, coordinate compasses, radar rings, cyber polygons)
 * positioned in multi-layer parallax planes.
 */
export const StrategicVectorMesh: React.FC<StrategicVectorMeshProps> = ({
  className = "",
  theme = "dark",
}) => {
  const shouldReduceMotion = useReducedMotion();
  const isDark = theme === "dark";

  if (shouldReduceMotion) return null;

  return (
    <div
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 select-none ${className}`}
      aria-hidden="true"
    >
      {/* Deep Background Plane: Subtle Floating Strategic Compass / Ring */}
      <ParallaxLayer speed={0.14} rotateSpeed={0.04} className="absolute -top-10 -right-10 pointer-events-none">
        <svg
          width="320"
          height="320"
          viewBox="0 0 320 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={isDark ? "opacity-15 text-emerald-400" : "opacity-10 text-emerald-600"}
        >
          <circle cx="160" cy="160" r="140" stroke="currentColor" strokeWidth="1" strokeDasharray="6 6" />
          <circle cx="160" cy="160" r="100" stroke="currentColor" strokeWidth="1" />
          <circle cx="160" cy="160" r="60" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="160" y1="10" x2="160" y2="310" stroke="currentColor" strokeWidth="0.75" />
          <line x1="10" y1="160" x2="310" y2="160" stroke="currentColor" strokeWidth="0.75" />
          <polygon points="160,20 166,35 160,30 154,35" fill="currentColor" />
          <polygon points="160,300 166,285 160,290 154,285" fill="currentColor" />
        </svg>
      </ParallaxLayer>

      {/* Midground Plane: Directional Growth Arrow & Vector Angle */}
      <ParallaxLayer speed={-0.16} rotateSpeed={-0.03} className="absolute bottom-8 -left-12 pointer-events-none">
        <svg
          width="260"
          height="260"
          viewBox="0 0 260 260"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={isDark ? "opacity-15 text-sky-400" : "opacity-10 text-sky-600"}
        >
          <path
            d="M20 240 L180 80 L180 180 M180 80 L80 80"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="20" cy="240" r="4" fill="currentColor" />
          <circle cx="180" cy="80" r="5" fill="currentColor" />
        </svg>
      </ParallaxLayer>

      {/* Foreground Subtle Element: Floating Vector Data Brackets */}
      <ParallaxLayer speed={-0.28} className="absolute top-1/2 right-[8%] pointer-events-none">
        <div
          className={`flex flex-col items-center gap-1 font-mono text-[10px] tracking-widest ${
            isDark ? "text-emerald-400/30" : "text-emerald-700/25"
          }`}
        >
          <span className="font-bold">[ VETOR.SYS ]</span>
          <span className="w-12 h-px bg-current" />
          <span>COORD: 23.5505° S</span>
        </div>
      </ParallaxLayer>
    </div>
  );
};

/* =========================================================================
   VIDEO & COSMIC AMBIENT PARALLAX
   ========================================================================= */

export interface ParallaxVideoBackgroundProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}

/**
 * Subtle Parallax Wrapper for Section Video / Canvas Backgrounds
 * Creates a floating deep-space window effect without border clipping.
 */
export const ParallaxVideoBackground: React.FC<ParallaxVideoBackgroundProps> = ({
  children,
  className = "",
  speed = -0.08,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const distance = speed * 140;
  const rawY = useTransform(scrollYProgress, [0, 1], [-distance, distance]);
  const smoothY = useSpring(rawY, { damping: 30, stiffness: 120 });

  if (shouldReduceMotion) {
    return <div className={`absolute inset-0 w-full h-full ${className}`}>{children}</div>;
  }

  return (
    <div ref={ref} className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none ${className}`}>
      <motion.div
        style={{
          y: smoothY,
          scale: 1.08, // Extra margin prevents edge bleed on extreme scrolls
          willChange: "transform",
        }}
        className="absolute inset-0 w-full h-full transform-gpu"
      >
        {children}
      </motion.div>
    </div>
  );
};

export interface CosmicParallaxStarsProps {
  className?: string;
}

/**
 * Multi-Plane Cosmic Starfield Parallax
 * Spawns 3 layers of stars (distant, midground, foreground) that move at distinct scroll velocities.
 */
export const CosmicParallaxStars: React.FC<CosmicParallaxStarsProps> = ({
  className = "",
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return null;

  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 select-none ${className}`}>
      {/* Deep Background Stars (Slow & Subtle) */}
      <ParallaxLayer speed={0.12} className="absolute inset-0 w-full h-full">
        <div className="absolute top-[8%] left-[15%] w-1 h-1 rounded-full bg-cyan-300 opacity-60 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
        <div className="absolute top-[28%] right-[22%] w-1.5 h-1.5 rounded-full bg-emerald-300 opacity-50 shadow-[0_0_10px_rgba(16,185,129,0.7)]" />
        <div className="absolute top-[65%] left-[8%] w-1 h-1 rounded-full bg-amber-300 opacity-50 shadow-[0_0_8px_rgba(245,158,11,0.7)]" />
        <div className="absolute top-[82%] right-[14%] w-1.5 h-1.5 rounded-full bg-sky-300 opacity-55 shadow-[0_0_8px_rgba(56,189,248,0.7)]" />
      </ParallaxLayer>

      {/* Midground Constellation Points */}
      <ParallaxLayer speed={-0.18} className="absolute inset-0 w-full h-full">
        <div className="absolute top-[18%] right-[8%] w-2 h-2 rounded-full bg-emerald-400 opacity-70 shadow-[0_0_12px_rgba(16,185,129,0.9)] animate-pulse" />
        <div className="absolute top-[48%] left-[24%] w-2 h-2 rounded-full bg-cyan-400 opacity-70 shadow-[0_0_12px_rgba(6,182,212,0.9)]" />
        <div className="absolute top-[75%] right-[32%] w-1.5 h-1.5 rounded-full bg-amber-400 opacity-65 shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
      </ParallaxLayer>

      {/* Foreground Bright Sparks (Faster Travel) */}
      <ParallaxLayer speed={-0.35} className="absolute inset-0 w-full h-full">
        <div className="absolute top-[32%] left-[12%] w-2.5 h-2.5 rounded-full bg-white opacity-85 shadow-[0_0_16px_rgba(255,255,255,1)]" />
        <div className="absolute top-[88%] left-[45%] w-2 h-2 rounded-full bg-emerald-300 opacity-80 shadow-[0_0_14px_rgba(16,185,129,1)]" />
      </ParallaxLayer>
    </div>
  );
};

export interface ParallaxCardProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

/**
 * Card container with subtle scroll parallax translation and GPU containment.
 */
export const ParallaxCard: React.FC<ParallaxCardProps> = ({
  children,
  speed = -0.06,
  className = "",
}) => {
  return (
    <ParallaxLayer speed={speed} className={`h-full ${className}`}>
      {children}
    </ParallaxLayer>
  );
};

