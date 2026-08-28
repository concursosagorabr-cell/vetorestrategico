"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  ParallaxVideoBackground,
  CosmicParallaxStars,
  ParallaxWatermark,
  StrategicVectorMesh,
} from "@/components/ui/Parallax";
import {
  BarChart3,
  Activity,
  Clock,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Zap,
  Lock,
  ExternalLink,
  Sparkles,
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
          eyebrow="Transparência Radical & Dados Reais"
          eyebrowVariant="emerald"
          title="Acesso direto aos painéis da Vercel e"
          highlightText="Google Analytics para os clientes"
          highlightVariant="emerald"
          description="Não dizemos apenas que funciona: liberamos os painéis oficiais para você auditar diretamente os visitantes, acessos e o desempenho mês a mês por conta própria."
        />

        {/* High-Tech Interactive Dashboard UI Showcase */}
        <div className="rounded-[2.5rem] bg-gradient-to-b from-[#0A192F] to-[#04101E] border border-sky-500/30 p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden text-white">
          {/* Video Background with Subtle Parallax */}
          <ParallaxVideoBackground speed={-0.08}>
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="none"
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
              className="w-full h-full object-cover opacity-65 mix-blend-screen scale-105 transform-gpu pointer-events-none"
            >
              <source src="/dashboard-holografico-3d.mp4" type="video/mp4" />
            </video>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#04101E]/80 via-[#04101E]/15 to-[#0A192F]/50 pointer-events-none" />
          </ParallaxVideoBackground>

          {/* Monumental Watermark & Vector Meshes */}
          <ParallaxWatermark text="AUDITORIA REAL &bull; VERCEL &bull; ANALYTICS" speed={0.15} direction="right" variant="cyan" />
          <StrategicVectorMesh theme="dark" />

          {/* Cosmic Starfield */}
          <CosmicParallaxStars />

          {/* Top Bar of the Mock Dashboard */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 shrink-0">
                <BarChart3 className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight">
                    Painel Aberto ao Cliente &bull; Vercel &amp; Google Analytics
                  </h3>
                  <span className="hidden md:inline-flex text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Acesso Direto
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 font-normal">
                  Acompanhamento transparente de visitantes, visualizações e velocidade em tempo real
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Painéis Auditáveis
              </span>
            </div>
          </div>

          {/* Metric Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 my-8 relative z-10">
            
            {/* Card 1: Visitantes Orgânicos */}
            <div className="card-gpu p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-400/50 hover:bg-white/10 space-y-2 group">
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">Tráfego no 1º Mês</span>
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight">
                +2.105
              </div>
              <div className="pt-1 flex items-center justify-between text-xs text-slate-400 font-medium border-t border-white/5">
                <span>Visitantes Únicos</span>
                <span className="text-emerald-400 font-bold">100% Orgânico</span>
              </div>
            </div>

            {/* Card 2: Visualizações de Páginas */}
            <div className="card-gpu p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-sky-400/50 hover:bg-white/10 space-y-2 group">
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">Páginas Vistas</span>
                <Zap className="w-4 h-4 text-sky-400" />
              </div>
              <div className="text-3xl sm:text-4xl font-black text-sky-400 tracking-tight">
                +4.081
              </div>
              <div className="pt-1 flex items-center justify-between text-xs text-emerald-400 font-bold border-t border-white/5">
                <span>Pageviews no Mês</span>
                <span className="text-slate-400 font-normal">Sem Anúncios</span>
              </div>
            </div>

            {/* Card 3: Protótipo Antes de Pagar */}
            <div className="card-gpu p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/50 hover:bg-white/10 space-y-2 group">
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">Avaliação Prévia</span>
                <ShieldCheck className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-3xl sm:text-4xl font-black text-amber-400 tracking-tight">
                Risco Zero
              </div>
              <div className="pt-1 flex items-center justify-between text-xs text-slate-300 font-medium border-t border-white/5">
                <span>Protótipo antes do pagamento</span>
              </div>
            </div>

            {/* Card 4: Sem Fidelidade nem Multas */}
            <div className="card-gpu p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-400/50 hover:bg-white/10 space-y-2 group">
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">Liberdade Total</span>
                <Lock className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Sem Fidelidade
              </div>
              <div className="pt-1 flex items-center justify-between text-xs text-emerald-400 font-bold border-t border-white/5">
                <span>Cancele a qualquer momento</span>
                <span className="text-slate-400 font-normal">sem multa</span>
              </div>
            </div>

          </div>

          {/* Real Analytics Case Showcase Box */}
          <div className="my-8 p-6 sm:p-8 rounded-3xl bg-slate-950/70 border border-white/10 relative z-10 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <h4 className="text-base sm:text-lg font-black text-white uppercase tracking-tight">
                    Case Real: Portal Concursos Agora &bull; Auditoria de Tráfego Orgânico
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Projeto construído do zero na prática em menos de 30 dias — dados reais auditáveis diretamente no painel da Vercel.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/30">
                  concursosagora.com.br
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 rounded-2xl overflow-hidden border border-slate-700/60 shadow-2xl bg-slate-900 group">
                <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span className="font-mono">Vercel Analytics &bull; Last 30 Days (Production)</span>
                  <span className="text-emerald-400 font-bold">100% Orgânico</span>
                </div>
                <div className="relative aspect-video sm:aspect-[21/9] w-full overflow-hidden bg-slate-950">
                  <Image
                    src="/images/cases/concursosagora-analytics.png"
                    alt="Gráfico real da Vercel Analytics mostrando mais de 2.105 visitantes únicos e 4.081 visualizações de páginas em 30 dias"
                    width={900}
                    height={400}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              </div>

              <div className="lg:col-span-4 space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                  <strong className="text-white font-bold block flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    Por que isso importa para sua empresa?
                  </strong>
                  <p className="text-slate-300 leading-relaxed font-normal">
                    Você não precisa confiar apenas na nossa palavra. Liberamos os acessos aos painéis oficiais para que sua equipe acompanhe o crescimento dos acessos mês a mês.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1.5">
                  <strong className="text-emerald-300 font-bold block">
                    Garantia de Risco Zero
                  </strong>
                  <p className="text-slate-300 leading-relaxed font-normal">
                    Criamos o protótipo para você avaliar antes de qualquer pagamento. O valor da criação só é pago se você realmente aprovar a proposta.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Trust Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-white/10 text-xs sm:text-sm text-slate-300 font-semibold relative z-10">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Protótipo apresentado antes de qualquer cobrança</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
              <BarChart3 className="w-5 h-5 text-sky-400 shrink-0" />
              <span>Acesso direto aos painéis da Vercel e Google Analytics</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
              <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
              <span>Sem fidelidade: cancele quando quiser sem multa</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

