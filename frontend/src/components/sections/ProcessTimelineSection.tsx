"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { FloatingElement, TwinklingStar } from "@/components/ui/CosmicDecorations";
import { Zap } from "lucide-react";

export const ProcessTimelineSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.loop = true;
    video.defaultPlaybackRate = 1.35;
    video.playbackRate = 1.35;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("autoplay", "");

    const enforceRate = () => {
      if (video.playbackRate !== 1.35) {
        video.playbackRate = 1.35;
      }
    };

    video.addEventListener("loadedmetadata", enforceRate);
    video.addEventListener("play", enforceRate);

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
    return () => {
      video.removeEventListener("loadedmetadata", enforceRate);
      video.removeEventListener("play", enforceRate);
      observer.disconnect();
    };
  }, []);

  const steps = [
    {
      number: "01",
      title: "DIAGNÓSTICO E BRIEFING",
      desc: "Entendemos o seu negócio, os objetivos de conversão, seu público-alvo e os gargalos operacionais para desenhar o projeto ideal.",
      badge: "Etapa Inicial",
    },
    {
      number: "02",
      title: "ALINHAMENTO & ESCOPO",
      desc: "Definimos arquitetura de páginas, fluxos de conversão no WhatsApp, regras de automação e cronograma transparente de entregas.",
      badge: "Semana 1",
    },
    {
      number: "03",
      title: "UX/UI & DESENVOLVIMENTO",
      desc: "Criamos o design profissional alinhado à sua marca, com carregamento ultrarrápido, copywriting persuasivo e integrações de IA.",
      badge: "Semana 2 a 3",
    },
    {
      number: "04",
      title: "LANÇAMENTO & TREINAMENTO",
      desc: "Publicação do site com SEO otimizado, agentes de IA ativos 24/7 e treinamento em vídeo para sua equipe gerenciar com total autonomia.",
      badge: "Lançamento",
    },
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cosmic Deep Navy Container */}
        <div className="relative rounded-[2.5rem] bg-[#0A192F] border border-sky-900/60 p-8 sm:p-12 lg:p-16 shadow-2xl overflow-hidden text-white">
          
          {/* Cinematic Ambient Video Background (5% darker & smooth playback) */}
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover rounded-[2.5rem] overflow-hidden opacity-65 mix-blend-screen scale-105 transform-gpu pointer-events-none z-0"
          >
            <source src="/Partículas-de-Fundo-Ambient.mp4" type="video/mp4" />
            <source src="/Part%C3%ADculas-de-Fundo-Ambient.mp4" type="video/mp4" />
          </video>

          {/* Gradient Overlay (5% darker) */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/80 via-[#0A192F]/15 to-[#0A192F]/50 z-[1] pointer-events-none" />

          {/* Cosmic Background Stars (Pure GPU CSS) */}
          <TwinklingStar size={20} color="gold" delay={0.3} style={{ position: "absolute", top: "10%", right: "15%", zIndex: 2 }} />
          <TwinklingStar size={16} color="cyan" delay={1.1} style={{ position: "absolute", bottom: "15%", left: "45%", zIndex: 2 }} />
          <TwinklingStar size={24} color="gold" delay={2.0} style={{ position: "absolute", top: "60%", right: "8%", zIndex: 2 }} />

          {/* Section Header Inside */}
          <div className="relative z-10 text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-sky-400 flex items-center justify-center gap-2">
              <span>✦</span> DO BRIEFING AO LANÇAMENTO <span>✦</span>
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-[1.08]">
              Nosso Processo de Criação de Sites &amp; IA
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 font-normal leading-relaxed">
              Metodologia ágil e sem enrolação para colocar sua empresa no ar com alta performance.
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Steps Column */}
            <div className="lg:col-span-7 space-y-5 relative">
              {steps.map((s) => (
                <div
                  key={s.number}
                  className="card-gpu rounded-2xl bg-white/5 border border-sky-500/20 p-6 sm:p-7 hover:bg-white/10 hover:border-emerald-400/40 group"
                >
                  <div className="flex items-start gap-5">
                    <div className="text-3xl sm:text-4xl font-black text-emerald-400 group-hover:scale-110 transition-transform">
                      {s.number}
                    </div>
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-wide">
                          {s.title}
                        </h3>
                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
                          {s.badge}
                        </span>
                      </div>
                      <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column: Rocket Mascot & Planning Card */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-6">
              
              {/* Floating Rocket Mascot */}
              <FloatingElement duration={4.6}>
                <div className="relative w-72 h-72 sm:w-88 sm:h-88 flex items-center justify-center group cursor-pointer">
                  <div className="relative w-full h-full drop-shadow-[0_25px_45px_rgba(16,185,129,0.35)] transition-transform duration-500 group-hover:scale-105">
                    <Image
                      src="/images/mascot/rocket.png"
                      alt="Comandante Vetor Decolando com Foguete"
                      width={352}
                      height={352}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </FloatingElement>

              {/* Action Callout Box */}
              <div className="w-full text-center space-y-4 pt-2">
                <h4 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                  Vamos planejar o novo site da sua empresa?
                </h4>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Button
                    href="/orcamento"
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto text-base sm:text-lg font-black shadow-2xl shadow-emerald-500/40 rounded-full px-9 py-4.5"
                    leftIcon={<Zap className="w-5 h-5 fill-white text-white" />}
                  >
                    Peça um Orçamento
                  </Button>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

