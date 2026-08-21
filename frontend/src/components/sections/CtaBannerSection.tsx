"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { TwinklingStar } from "@/components/ui/CosmicDecorations";
import {
  ParallaxLayer,
  CosmicParallaxStars,
  ParallaxWatermark,
  StrategicVectorMesh,
  ParallaxText,
} from "@/components/ui/Parallax";
import { ShieldCheck, Zap, MessageSquare } from "lucide-react";
import { COMPANY_INFO } from "@/lib/constants";

export const CtaBannerSection: React.FC = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2.5rem] bg-gradient-to-br from-[#07162C] via-[#0A192F] to-[#062419] border border-emerald-500/30 p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl">
          
          {/* Parallax Cosmic Background Stars & Watermark */}
          <ParallaxWatermark text="VETOR ESTRATÉGICO &bull; TRANSFORMAÇÃO" speed={0.15} direction="left" variant="emerald" />
          <StrategicVectorMesh theme="dark" />
          <CosmicParallaxStars />

          {/* Parallax Background Glow Nebulae */}
          <ParallaxLayer speed={0.15} className="absolute -top-20 -left-20 pointer-events-none">
            <div className="w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl" />
          </ParallaxLayer>
          <ParallaxLayer speed={-0.15} className="absolute -bottom-20 -right-20 pointer-events-none">
            <div className="w-80 h-80 bg-sky-500/20 rounded-full blur-3xl" />
          </ParallaxLayer>

          <ParallaxLayer speed={0.25} className="absolute top-[15%] left-[8%] pointer-events-none z-10">
            <TwinklingStar size={24} color="gold" delay={0.2} />
          </ParallaxLayer>
          <ParallaxLayer speed={-0.2} className="absolute top-[25%] right-[10%] pointer-events-none z-10">
            <TwinklingStar size={18} color="cyan" delay={1.2} />
          </ParallaxLayer>
          <ParallaxLayer speed={0.3} className="absolute bottom-[20%] left-[15%] pointer-events-none z-10">
            <TwinklingStar size={22} color="emerald" delay={0.7} />
          </ParallaxLayer>

          <div className="max-w-4xl mx-auto space-y-6 relative z-10">
            <ParallaxText speed={-0.06}>
              <span className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-xs sm:text-sm font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-widest">
                Dê o Próximo Passo
              </span>
            </ParallaxText>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.06] uppercase">
              <ParallaxText speed={-0.08} as="span">
                Pronto para modernizar a presença digital e o atendimento da sua empresa?
              </ParallaxText>
            </h2>

            <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
              Converse diretamente com nossos especialistas. Avaliaremos o momento da sua operação e apresentaremos uma proposta sob medida, com escopo claro e prazos definidos.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                href="/orcamento"
                variant="primary"
                size="lg"
                className="w-full sm:w-auto text-base sm:text-lg font-black shadow-2xl shadow-emerald-500/40 rounded-full px-9 py-4.5 hover:scale-105 active:scale-95 transition-all"
                leftIcon={<Zap className="w-5 h-5 fill-white text-white" />}
              >
                Solicitar Proposta Comercial
              </Button>

              <Button
                href={COMPANY_INFO.whatsappUrl}
                variant="outline"
                size="lg"
                target="_blank"
                className="w-full sm:w-auto text-base sm:text-lg font-bold rounded-full px-8 py-4.5 bg-slate-900/80 border-slate-700 text-white hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all"
                leftIcon={<MessageSquare className="w-5 h-5 text-emerald-400" />}
              >
                Falar no WhatsApp: {COMPANY_INFO.phone}
              </Button>
            </div>

            <div className="pt-3 flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-400 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Atendimento ágil &bull; Escopo detalhado &bull; Conformidade com LGPD</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
