"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";

export interface ParallaxLayerProps {
  children?: React.ReactNode;
  /** Speed multiplier: negative moves faster upward (foreground), positive lags behind (deep background). Default: -0.2 */
  speed?: number;
  /** Optional subtle rotation multiplier during scroll */
  rotateSpeed?: number;
  /** Optional subtle scale multiplier during scroll (e.g. [1, 1.05]) */
  scaleRange?: [number, number];
  /** Direction of movement */
  direction?: "vertical" | "horizontal";
  /** Optional custom container class name */
  className?: string;
  /** Spring physics damping (higher = smoother, default: 28) */
  damping?: number;
  /** Spring physics stiffness (default: 160) */
  stiffness?: number;
}

/**
 * High-performance GPU-accelerated Parallax Layer
 * Driven by compositor-only translate3d transforms with spring smoothing.
 */
export const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
  children,
  speed = -0.2,
  rotateSpeed = 0,
  scaleRange,
  direction = "vertical",
  className = "",
  damping = 28,
  stiffness = 160,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Calculate distance based on speed multiplier (-200px to +200px range)
  const distance = speed * 250;
  const rawTransform = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "vertical" ? [-distance, distance] : [distance, -distance]
  );
  const smoothTransform = useSpring(rawTransform, { damping, stiffness });

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

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{
        [direction === "vertical" ? "y" : "x"]: smoothTransform,
        rotate: rotateSpeed !== 0 ? smoothRotate : 0,
        scale: scaleRange ? smoothScale : 1,
        willChange: "transform",
      }}
      className={`transform-gpu ${className}`}
    >
      {children}
    </motion.div>
  );
};

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

  const distance = speed * 120;
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
