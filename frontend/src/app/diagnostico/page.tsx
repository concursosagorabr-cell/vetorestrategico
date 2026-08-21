import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { DiagnosticQuiz } from "@/components/forms/DiagnosticQuiz";
import { Sparkles, ShieldCheck, Clock, CheckCircle2, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Diagnóstico Rápido de IA Gratuito para Sua Empresa",
  description:
    "Descubra em 2 minutos quanto tempo e dinheiro sua empresa pode economizar aplicando Inteligência Artificial no atendimento, vendas e rotinas operacionais.",
};

export default function DiagnosticoPage() {
  return (
    <div className="py-12 sm:py-20 bg-background relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-tech-glow pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Page Header with Mascot */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-center md:text-left">
          <div className="relative w-40 h-40 sm:w-52 sm:h-52 shrink-0 flex items-center justify-center">
            <div className="absolute inset-2 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />
            <Image
              src="/images/mascot/diagnostic.png"
              alt="Comandante Vetor Diagnóstico"
              width={208}
              height={208}
              priority
              className="relative w-full h-full object-contain drop-shadow-[0_15px_30px_rgba(217,119,6,0.25)]"
            />
          </div>

          <div className="space-y-3 max-w-xl">
            <Badge variant="gold" size="md">
              ✦ Ferramenta Interativa Gratuita
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15] uppercase">
              Diagnóstico de IA &amp;{" "}
              <span className="gradient-text-emerald">Oportunidade</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Responda 4 perguntas sobre sua operação e descubra instantaneamente sua pontuação de oportunidade, estimativa de horas salvas e o plano de ação recomendado.
            </p>
          </div>
        </div>

        {/* Feature Highlights Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-700 font-medium">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <span>Leva menos de 2 minutos para concluir</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center shrink-0">
              <TrendingUp className="w-4 h-4" />
            </div>
            <span>Cálculo de horas salvas e ROI estimado</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span>100% Gratuito e sem compromisso</span>
          </div>
        </div>

        {/* Interactive Diagnostic Quiz Container */}
        <div>
          <DiagnosticQuiz />
        </div>

        {/* Bottom Trust Note */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-500 font-medium space-y-2">
          <p>
            O diagnóstico da <strong>Vetor Estratégico</strong> avalia gargalos de atendimento e processos operacionais para indicar soluções de automação e desenvolvimento web adequadas ao momento da sua empresa.
          </p>
        </div>

      </div>
    </div>
  );
}
