"use client";

import React, { useEffect, useRef } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatCounter } from "@/components/ui/StatCounter";
import {
  BarChart3,
  Activity,
  Clock,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Zap,
} from "lucide-react";

export const TrustDashboardSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
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
      const p = video.play();
      if (p !== undefined) p.catch(() => {});
    };
    attemptPlay();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.playbackRate = SPEED;
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
      video.removeEventListener("ratechange", enforceRate);
      video.removeEventListener("seeked", enforceRate);
      observer.disconnect();
    };
  }, []);

  return (
    <section className="py-20 sm:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
          {/* Section Heading */}
          <SectionHeading
            eyebrow="Engenharia Web & Operação"
            eyebrowVariant="emerald"
            title="Acompanhamento transparente da sua"
            highlightText="presença digital e integrações"
            highlightVariant="emerald"
            description="Estruturas modernas com monitoramento de velocidade, segurança dos dados e atendimento comercial contínuo."
          />

        {/* High-Tech Interactive Dashboard UI Showcase */}
        <div className="rounded-[2.5rem] bg-gradient-to-b from-[#0A192F] to-[#04101E] border border-sky-500/30 p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden text-white">
          {/* Video Background (5% darker & smooth playback) */}
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
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
            className="absolute inset-0 w-full h-full object-cover rounded-[2.5rem] overflow-hidden opacity-65 mix-blend-screen scale-105 transform-gpu pointer-events-none z-0"
          >
            <source src="/Dashboard-Holográfico-3D.mp4" type="video/mp4" />
            <source src="/Dashboard-Hologr%C3%A1fico-3D.mp4" type="video/mp4" />
          </video>

          {/* Gradient Overlay (5% darker) */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#04101E]/80 via-[#04101E]/15 to-[#0A192F]/50 pointer-events-none z-0" />

          {/* Top Bar of the Mock Dashboard */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 shrink-0">
                <Activity className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight">
                    Painel de Operação Digital &bull; Vetor Estratégico
                  </h3>
                  <span className="hidden md:inline-flex text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Online
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 font-normal">
                  Indicadores de infraestrutura, velocidade e atendimento
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Estrutura Ativa
              </span>
            </div>
          </div>

          {/* Metric Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 my-8 relative z-10">
            
            {/* Card 1: Velocidade de Resposta */}
            <div className="card-gpu p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-400/50 hover:bg-white/10 space-y-2 group">
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">Acolhimento WhatsApp</span>
                <Clock className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight">
                Imediato
              </div>
              <div className="pt-1 flex items-center justify-between text-xs text-slate-400 font-medium border-t border-white/5">
                <span>Disponibilidade</span>
                <span className="text-emerald-400 font-bold">24h / 7 dias</span>
              </div>
            </div>

            {/* Card 2: Performance Web */}
            <div className="card-gpu p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-sky-400/50 hover:bg-white/10 space-y-2 group">
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">Carregamento Mobile</span>
                <Zap className="w-4 h-4 text-sky-400" />
              </div>
              <div className="text-3xl sm:text-4xl font-black text-sky-400 tracking-tight">
                &lt; 1 segundo
              </div>
              <div className="pt-1 flex items-center justify-between text-xs text-emerald-400 font-bold border-t border-white/5">
                <span>Lighthouse 90+</span>
                <span className="text-slate-400 font-normal">Core Web Vitals</span>
              </div>
            </div>

            {/* Card 3: Segurança & LGPD */}
            <div className="card-gpu p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/50 hover:bg-white/10 space-y-2 group">
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">Privacidade</span>
                <ShieldCheck className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-3xl sm:text-4xl font-black text-amber-400 tracking-tight">
                100% LGPD
              </div>
              <div className="pt-1 flex items-center justify-between text-xs text-slate-300 font-medium border-t border-white/5">
                <span>Criptografia SSL ativa</span>
              </div>
            </div>

            {/* Card 4: Direcionamento Comercial */}
            <div className="card-gpu p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-400/50 hover:bg-white/10 space-y-2 group">
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">Encaminhamento</span>
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Qualificado
              </div>
              <div className="pt-1 flex items-center justify-between text-xs text-emerald-400 font-bold border-t border-white/5">
                <span>Histórico pronto</span>
                <span className="text-slate-400 font-normal">para o time</span>
              </div>
            </div>

          </div>

          {/* Bottom Trust Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-white/10 text-xs sm:text-sm text-slate-300 font-semibold relative z-10">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Relatório executivo quinzenal enviado aos sócios</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
              <ShieldCheck className="w-5 h-5 text-sky-400 shrink-0" />
              <span>Criptografia ponta a ponta e anonimização LGPD</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
              <TrendingUp className="w-5 h-5 text-amber-400 shrink-0" />
              <span>Monitoramento contínuo de acurácia da IA</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

