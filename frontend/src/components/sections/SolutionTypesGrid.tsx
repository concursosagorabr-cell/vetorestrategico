"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { SOLUTION_TYPES } from "@/lib/constants";
import {
  Globe,
  MessageCircle,
  UserCheck,
  FileText,
  Bot,
  PieChart,
  GitMerge,
  RefreshCw,
  BookOpen,
  ArrowRight,
  Sparkles,
  Target,
  BarChart3,
} from "lucide-react";

const solutionIconMap: Record<string, React.ElementType> = {
  Globe,
  MessageCircle,
  UserCheck,
  FileText,
  Bot,
  PieChart,
  GitMerge,
  RefreshCw,
  BookOpen,
  Target,
  BarChart3,
};

export const SolutionTypesGrid: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.loop = true;
    video.playbackRate = 1.35;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("autoplay", "");

    const attemptPlay = () => {
      video.playbackRate = 1.35;
      const p = video.play();
      if (p !== undefined) p.catch(() => {});
    };
    attemptPlay();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.playbackRate = 1.35;
            attemptPlay();
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden text-white">
      {/* 🌌 Quantum Scanning Video Ambient Layer (Bright & Vivid) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-75 mix-blend-screen scale-105 transition-opacity duration-700"
        >
          <source src="/Escaneamento-Quântico.mp4" type="video/mp4" />
          <source src="/Escaneamento-Qu%C3%A2ntico.mp4" type="video/mp4" />
        </video>
        {/* Lighter, high-contrast vignette to keep video bright and text readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/55 via-slate-950/15 to-slate-950/65 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-at-c from-emerald-500/15 via-transparent to-slate-950/50 pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-lg shadow-emerald-950/40">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Ecossistema de Soluções Vetor</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase leading-[1.08] drop-shadow-md">
            Soluções Inteligentes Para o <br />
            <span className="gradient-text-emerald drop-shadow-[0_0_35px_rgba(16,185,129,0.4)]">
              Crescimento da Sua Empresa
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed max-w-2xl mx-auto drop-shadow-sm">
            Desde um site institucional veloz e de alta conversão até esteiras automatizadas de atendimento e qualificação de clientes no WhatsApp.
          </p>
        </div>

        {/* 6 Bento-Style High-Performance Glass Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SOLUTION_TYPES.map((sol, idx) => {
            const Icon = solutionIconMap[sol.icon] || Bot;
            return (
              <Link
                key={idx}
                href="/servicos"
                className="rounded-3xl p-7 flex flex-col justify-between group bg-slate-900/80 hover:bg-slate-900/95 border border-white/10 hover:border-emerald-400/60 transition-all duration-300 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:shadow-emerald-950/40 hover:-translate-y-1.5"
              >
                <div className="space-y-4">
                  <div className="w-13 h-13 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-500/25 transition-transform duration-300 shadow-inner">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-black text-white group-hover:text-emerald-300 transition-colors">
                    {sol.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {sol.desc}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-white/10 flex items-center text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition-transform">
                  <span>Conhecer detalhes</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
