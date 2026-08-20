"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { soundFx } from "@/lib/soundEffects";
import { Sparkles, Zap } from "lucide-react";

export interface CinematicVideoProps {
  src: string;
  poster?: string;
  className?: string;
  videoClassName?: string;
  aspectRatio?: "square" | "video" | "portrait" | "auto";
  glowColor?: "emerald" | "cyan" | "gold" | "multi";
  showHud?: boolean;
  hudTitle?: string;
  hudBadge?: string;
  overlayOpacity?: number;
  priority?: boolean;
  children?: React.ReactNode;
}

export const CinematicVideo: React.FC<CinematicVideoProps> = ({
  src,
  poster,
  className = "",
  videoClassName = "",
  aspectRatio = "auto",
  glowColor = "emerald",
  showHud = false,
  hudTitle = "Vetor Engine",
  hudBadge = "4K IA Loop",
  overlayOpacity = 0,
  priority = false,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Guarantee HTML5 video autoplay & muted attributes in React DOM
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video) return;

    const SPEED = 2.2;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.loop = true;
    video.defaultPlaybackRate = SPEED;
    video.playbackRate = SPEED;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("autoplay", "");

    const enforceRate = () => {
      if (video.playbackRate !== SPEED) {
        video.playbackRate = SPEED;
      }
    };

    video.addEventListener("loadedmetadata", enforceRate);
    video.addEventListener("play", enforceRate);
    video.addEventListener("ratechange", enforceRate);
    video.addEventListener("seeked", enforceRate);

    const attemptPlay = () => {
      video.playbackRate = SPEED;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setIsLoaded(true);
          })
          .catch(() => {
            // Autoplay will retry on user interaction / viewport entry
          });
      }
    };

    // Immediate playback attempt
    attemptPlay();

    // IntersectionObserver to pause when off-screen and resume when visible
    if (!container) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.playbackRate = SPEED;
            attemptPlay();
          } else {
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "100px",
      }
    );

    observer.observe(container);

    return () => {
      video.removeEventListener("loadedmetadata", enforceRate);
      video.removeEventListener("play", enforceRate);
      video.removeEventListener("ratechange", enforceRate);
      video.removeEventListener("seeked", enforceRate);
      observer.disconnect();
    };
  }, [src]);

  const getGlowStyles = () => {
    switch (glowColor) {
      case "cyan":
        return "from-cyan-500/20 via-sky-500/10 to-transparent shadow-[0_0_50px_rgba(6,182,212,0.25)]";
      case "gold":
        return "from-amber-500/20 via-yellow-500/10 to-transparent shadow-[0_0_50px_rgba(245,158,11,0.25)]";
      case "multi":
        return "from-emerald-500/20 via-cyan-500/20 to-amber-500/15 shadow-[0_0_60px_rgba(16,185,129,0.25)]";
      case "emerald":
      default:
        return "from-emerald-500/25 via-teal-500/15 to-transparent shadow-[0_0_50px_rgba(16,185,129,0.25)]";
    }
  };

  const getAspectClass = () => {
    switch (aspectRatio) {
      case "square":
        return "aspect-square";
      case "video":
        return "aspect-video";
      case "portrait":
        return "aspect-[4/5]";
      default:
        return "";
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => soundFx.playHover(1800)}
      data-cursor="video"
      className={`cinematic-video-target relative group overflow-hidden rounded-3xl border border-white/20 bg-slate-950/90 backdrop-blur-xl transition-all duration-500 hover:border-emerald-400/50 hover:shadow-2xl ${getAspectClass()} ${className}`}
    >
      {/* Dynamic Ambient Background Glow */}
      <div
        className={`absolute -inset-1 rounded-3xl bg-gradient-to-r ${getGlowStyles()} blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
      />

      {/* Main HTML5 Video Player */}
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload={priority ? "auto" : "metadata"}
        onCanPlay={() => setIsLoaded(true)}
        onLoadedData={() => setIsLoaded(true)}
        onPlaying={() => setIsLoaded(true)}
        onLoadedMetadata={(e) => {
          e.currentTarget.defaultPlaybackRate = 2.2;
          e.currentTarget.playbackRate = 2.2;
        }}
        onPlay={(e) => {
          if (e.currentTarget.playbackRate !== 2.2) {
            e.currentTarget.playbackRate = 2.2;
          }
        }}
        onRateChange={(e) => {
          if (e.currentTarget.playbackRate !== 2.2) {
            e.currentTarget.playbackRate = 2.2;
          }
        }}
        className={`relative z-10 w-full h-full object-cover transform-gpu transition-opacity duration-500 opacity-100 ${videoClassName}`}
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* Static Poster Fallback while loading */}
      {poster && !isLoaded && (
        <div className="absolute inset-0 z-10 w-full h-full pointer-events-none">
          <Image
            src={poster}
            alt="Video preview poster"
            fill
            className="object-cover transition-opacity duration-500"
            priority={priority}
          />
        </div>
      )}

      {/* Optional Dark / Color Tint Overlay */}
      {overlayOpacity > 0 && (
        <div
          className="absolute inset-0 z-10 pointer-events-none bg-slate-950"
          style={{ opacity: overlayOpacity }}
        />
      )}

      {/* Futuristic HUD Overlay (Optional) */}
      {showHud && (
        <div className="absolute inset-0 z-20 pointer-events-none p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/80 border border-emerald-500/40 backdrop-blur-md text-[10px] font-mono font-bold text-emerald-300 shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>LIVE</span>
              <span className="text-slate-500">|</span>
              <span>{hudBadge}</span>
            </div>

            <div className="flex items-center gap-1 text-[10px] font-mono text-slate-300 bg-slate-950/70 px-2 py-0.5 rounded-md border border-slate-800 backdrop-blur-sm">
              <Zap className="w-3 h-3 text-amber-400" />
              <span>IA 60FPS</span>
            </div>
          </div>

          <div className="flex items-end justify-between">
            <div className="text-[11px] font-bold text-white/90 bg-slate-950/85 px-2.5 py-1 rounded-lg border border-slate-800/80 backdrop-blur-sm flex items-center gap-1.5 shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>{hudTitle}</span>
            </div>
          </div>
        </div>
      )}

      {/* Custom Nested Children Elements */}
      {children && <div className="relative z-20">{children}</div>}
    </div>
  );
};
