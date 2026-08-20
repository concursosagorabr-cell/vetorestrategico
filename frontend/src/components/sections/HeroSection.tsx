"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { FloatingElement, TwinklingStar, OrbitRings } from "@/components/ui/CosmicDecorations";
import { Sparkles, Zap, CheckCircle2, ChevronDown } from "lucide-react";

export const HeroSection: React.FC = () => {
  const bgVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = bgVideoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.loop = true;
    video.defaultPlaybackRate = 1.25;
    video.playbackRate = 1.25;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("autoplay", "");

    const enforceRate = () => {
      if (video.playbackRate !== 1.25) {
        video.playbackRate = 1.25;
      }
    };

    video.addEventListener("loadedmetadata", enforceRate);
    video.addEventListener("play", enforceRate);

    const attemptPlay = () => {
      video.playbackRate = 1.25;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    };
    attemptPlay();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.playbackRate = 1.25;
            attemptPlay();
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(video);
    return () => {
      video.removeEventListener("loadedmetadata", enforceRate);
      video.removeEventListener("play", enforceRate);
      observer.disconnect();
    };
  }, []);

  return (
    <section className="relative pt-8 pb-20 md:pt-14 md:pb-28 overflow-hidden bg-slate-950 text-white min-h-[720px] flex flex-col justify-between">
      {/* 🌌 FULL HERO CINEMATIC VIDEO BACKGROUND */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          ref={bgVideoRef}
          src="/Mascote-Comandante-Vetor.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-55 transform-gpu"
        />

        {/* High-Contrast Gradient Vignette Overlays (Lightened by 10%+) */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950/30 to-slate-950/85" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-slate-950/15 to-slate-950/60" />
      </div>

      {/* Twinkling Cosmic Stars (Pure GPU CSS) */}
      <TwinklingStar size={22} color="gold" delay={0.2} style={{ position: "absolute", top: "12%", left: "12%" }} />
      <TwinklingStar size={16} color="cyan" delay={1.2} style={{ position: "absolute", top: "24%", left: "28%" }} />
      <TwinklingStar size={20} color="emerald" delay={0.7} style={{ position: "absolute", top: "18%", right: "22%" }} />
      <TwinklingStar size={24} color="gold" delay={1.8} style={{ position: "absolute", top: "34%", right: "8%" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Main Hero 3-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
          
          {/* Left Decorative Column: Cosmic Planet */}
          <div className="hidden lg:flex lg:col-span-3 flex-col items-center justify-center relative">
            <FloatingElement duration={5.5}>
              <div className="relative w-60 h-60 flex items-center justify-center group">
                <OrbitRings size={240} className="absolute inset-0 text-sky-400/40" />
                
                <div className="relative w-48 h-48 drop-shadow-[0_20px_35px_rgba(2,132,199,0.35)] transition-transform duration-500 group-hover:scale-105">
                  <Image
                    src="/images/mascot/planet.png"
                    alt="Planeta Vetor Cósmico"
                    width={192}
                    height={192}
                    className="w-full h-full object-contain"
                    priority
                  />
                </div>

                {/* Micro floating badge */}
                <div className="absolute -bottom-3 -left-2 bg-slate-900/95 px-3.5 py-1.5 rounded-full border border-emerald-500/30 shadow-xl text-[11px] font-bold text-slate-200 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Alta Performance &amp; SEO
                </div>
              </div>
            </FloatingElement>
          </div>

          {/* Center Column: Core Value Proposition */}
          <div className="lg:col-span-6 text-center space-y-6">
            
            {/* Top Eyebrow Badge with cute astronaut avatar */}
            <div className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-full bg-slate-900/90 border border-emerald-500/40 shadow-lg shadow-emerald-950/40">
              <div className="w-6 h-6 rounded-full overflow-hidden border border-emerald-400/60 shrink-0 bg-emerald-500/20">
                <Image
                  src="/images/mascot/avatar.png"
                  alt="Comandante Vetor"
                  width={24}
                  height={24}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-emerald-300">
                Agência de Criação de Sites &amp; IA para Empresas
              </span>
            </div>

            {/* Main Headline with High-Impact Typography */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08] uppercase">
              Desenvolvimento de Sites <br />
              <span className="gradient-text-emerald drop-shadow-[0_0_35px_rgba(16,185,129,0.35)]">Para Empresas</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-sm sm:text-lg lg:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
              Criação de sites profissionais com foco em geração de leads, SEO e alta conversão no WhatsApp, além de agentes de IA para acelerar o seu negócio.
            </p>

            {/* Action CTA Buttons */}
            <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Button
                href="/orcamento"
                variant="primary"
                size="lg"
                className="w-full sm:w-auto text-base sm:text-lg font-black shadow-2xl shadow-emerald-600/40 hover:shadow-emerald-500/60 hover:scale-105 active:scale-95 px-9 py-4 sm:py-4.5 rounded-full transition-all duration-200"
                leftIcon={<Zap className="w-5 h-5 fill-white text-white" />}
              >
                Solicitar Proposta
              </Button>

              <Button
                href="/diagnostico"
                variant="gold"
                size="lg"
                className="w-full sm:w-auto text-base sm:text-lg font-bold px-8 py-4 sm:py-4.5 rounded-full hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shadow-amber-500/30"
                leftIcon={<Sparkles className="w-5 h-5 fill-white text-white" />}
              >
                Diagnóstico de IA
              </Button>
            </div>

            {/* Microcopy of Confidence & Region */}
            <div className="pt-2 flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-300 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300">Atendimento sob medida em São Paulo e online para todo o Brasil</span>
            </div>

          </div>

          {/* Right Decorative Column: Mascot "Comandante Vetor" (Desktop) */}
          <div className="hidden lg:flex lg:col-span-3 flex-col items-center justify-center relative">
            <FloatingElement duration={4.5}>
              <div className="relative w-72 h-72 sm:w-84 sm:h-84 flex items-center justify-center group cursor-pointer">
                
                {/* Orbit Ring behind mascot */}
                <OrbitRings size={320} className="absolute inset-0 text-emerald-400/30 pointer-events-none" />

                {/* Mascot Image */}
                <div className="relative w-full h-full drop-shadow-[0_25px_45px_rgba(16,185,129,0.4)] transition-transform duration-500 group-hover:scale-105">
                  <Image
                    src="/images/mascot/hero.png"
                    alt="Mascote Vetor Estratégico"
                    width={336}
                    height={336}
                    className="w-full h-full object-contain"
                    priority
                  />
                </div>

                {/* Floating Speech Bubble Top */}
                <div className="absolute -top-2 -right-1 bg-slate-900/95 text-white text-xs font-bold px-3.5 py-1.5 rounded-2xl shadow-2xl border border-emerald-500/50 flex items-center gap-1.5">
                  <span className="text-emerald-400">⚡</span>
                  <span>Soluções para PMEs</span>
                </div>

              </div>
            </FloatingElement>
          </div>

        </div>

        {/* Technical Value Pillars Strip (Authentic & Professional) */}
        <div className="mt-14 pt-10 border-t border-slate-800/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col items-center justify-center gap-1">
              <span className="text-emerald-400 font-extrabold text-sm">✓ Alta Performance</span>
              <span className="text-xs text-slate-400">Carregamento rápido no celular</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col items-center justify-center gap-1">
              <span className="text-emerald-400 font-extrabold text-sm">✓ Foco Comercial</span>
              <span className="text-xs text-slate-400">Conexão direta ao WhatsApp</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col items-center justify-center gap-1">
              <span className="text-emerald-400 font-extrabold text-sm">✓ SEO Técnico</span>
              <span className="text-xs text-slate-400">Pronto para o Google</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col items-center justify-center gap-1">
              <span className="text-emerald-400 font-extrabold text-sm">✓ Código Próprio</span>
              <span className="text-xs text-slate-400">Sem plataformas engessadas</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

