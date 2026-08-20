"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { FloatingElement, TwinklingStar } from "@/components/ui/CosmicDecorations";
import {
  FileText,
  Palette,
  Layers,
  Video,
  Cpu,
  Zap,
  CheckCircle2,
} from "lucide-react";

export const TechnicalBenefitsGrid: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.loop = true;
    video.playbackRate = 1.25;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("autoplay", "");

    const attemptPlay = () => {
      video.playbackRate = 1.25;
      const p = video.play();
      if (p !== undefined) p.catch(() => {});
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
    return () => observer.disconnect();
  }, []);

  const benefits = [
    {
      icon: FileText,
      title: "Planejamento Estratégico & Conteúdo Comercial",
      desc: "Estruturamos os textos, seções e chamadas para ação com base no perfil do seu cliente, garantindo clareza na proposta de valor e facilidade de contato.",
    },
    {
      icon: Palette,
      title: "Design Visual Exclusivo & Mobile-First",
      desc: "Identidade visual elegante e adaptada para a tela de smartphones e computadores, transmitindo autoridade imediata sem templates genéricos.",
    },
    {
      icon: Layers,
      title: "Integração Direta com WhatsApp & Formulários",
      desc: "Configuração de botões inteligentes e formulários seguros que direcionam contatos qualificados diretamente para o canal comercial da sua equipe.",
    },
    {
      icon: Video,
      title: "Orientação e Autonomia da Equipe",
      desc: "Entregamos orientações práticas para sua equipe administrar e atualizar conteúdos com total segurança, mantendo o domínio em seu nome.",
    },
    {
      icon: Cpu,
      title: "Código Próprio de Alta Velocidade & SEO",
      desc: "Desenvolvimento com código moderno em Next.js, carregamento quase instantâneo e marcação de dados estruturados para o Google.",
    },
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cosmic Container with Neural & AI Video */}
        <div className="relative rounded-[2.5rem] bg-[#07162C] border border-sky-900/50 p-8 sm:p-12 lg:p-16 shadow-2xl text-white overflow-hidden">
          
          {/* Ambient Video Background (Neural Network & AI Connections) */}
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover rounded-[2.5rem] overflow-hidden opacity-70 mix-blend-screen pointer-events-none z-0 scale-105"
          >
            <source src="/Rede-Neural-&-WhatsApp-AI.mp4" type="video/mp4" />
            <source src="/Rede-Neural-%26-WhatsApp-AI.mp4" type="video/mp4" />
          </video>

          {/* Gradient Overlay (Lightened by 10%+) */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#07162C]/75 via-[#07162C]/15 to-[#07162C]/65 z-[1] pointer-events-none" />

          {/* Pure GPU Stars */}
          <TwinklingStar size={22} color="gold" delay={0.5} style={{ position: "absolute", top: "12%", left: "10%", zIndex: 2 }} />
          <TwinklingStar size={16} color="cyan" delay={1.4} style={{ position: "absolute", top: "45%", left: "45%", zIndex: 2 }} />
          <TwinklingStar size={20} color="emerald" delay={0.9} style={{ position: "absolute", bottom: "15%", right: "12%", zIndex: 2 }} />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Mascot with Laptop/Tablet & CTA */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center text-center space-y-6">
              
              <FloatingElement duration={4.8}>
                <div className="relative w-72 h-72 sm:w-88 sm:h-88 flex items-center justify-center group cursor-pointer">
                  <div className="relative w-full h-full drop-shadow-[0_25px_45px_rgba(16,185,129,0.4)] transition-transform duration-500 group-hover:scale-105">
                    <Image
                      src="/images/mascot/balloons.png"
                      alt="Comandante Vetor desenvolvendo no Computador"
                      width={352}
                      height={352}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </FloatingElement>

              <div className="space-y-4 pt-2">
                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white max-w-sm mx-auto">
                  Pronto para estruturar o site da sua empresa?
                </h3>
                
                <Button
                  href="/orcamento"
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto text-base sm:text-lg font-black shadow-2xl shadow-emerald-500/40 rounded-full px-9 py-4.5"
                  leftIcon={<Zap className="w-5 h-5 fill-white text-white" />}
                >
                  Solicitar Proposta
                </Button>
              </div>

            </div>

            {/* Right Column: Structured Benefit Items */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="space-y-2 mb-8 text-left">
                <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-sky-400 block">
                  Engenharia Web de Alto Padrão
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-[1.08]">
                  Como Desenvolvemos Nossos Projetos
                </h2>
              </div>

              <div className="space-y-4">
                {benefits.map((b, idx) => {
                  const Icon = b.icon;
                  return (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-400/50 hover:bg-white/10 transition-all duration-300 backdrop-blur-md flex items-start gap-4 text-left group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                          {b.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                          {b.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
