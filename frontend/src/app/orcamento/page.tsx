import React from "react";
import type { Metadata } from "next";
import { BudgetEstimatorQuiz } from "@/components/forms/BudgetEstimatorQuiz";
import { Badge } from "@/components/ui/Badge";
import { TwinklingStar } from "@/components/ui/CosmicDecorations";
import { ShieldCheck, Clock, CheckCircle2, TrendingUp, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Simulador de Orçamento de Sites & IA | Vetor Estratégico",
  description:
    "Calcule em 2 minutos o investimento estimado para o novo site profissional, landing page ou agente de IA da sua empresa.",
};

export default function OrcamentoPage() {
  return (
    <div className="py-12 sm:py-20 bg-background relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[550px] bg-tech-glow pointer-events-none" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-sky-200/20 rounded-full blur-3xl pointer-events-none" />

      <TwinklingStar size={24} color="gold" delay={0.2} style={{ position: "absolute", top: "10%", left: "10%" }} />
      <TwinklingStar size={18} color="cyan" delay={1.4} style={{ position: "absolute", top: "25%", right: "12%" }} />
      <TwinklingStar size={20} color="emerald" delay={0.8} style={{ position: "absolute", bottom: "15%", left: "8%" }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="gold" size="md">
            ✦ Simulador Online &amp; Proposta Rápida
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.08] uppercase">
            Calcule o Orçamento do <br />
            <span className="gradient-text-gold">Seu Novo Site</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Responda 6 perguntas rápidas sobre seu modelo de negócio e descubra a estimativa de investimento para colocar sua empresa no topo.
          </p>
        </div>

        {/* The Interactive Estimator Quiz */}
        <BudgetEstimatorQuiz />

        {/* Trust Badges Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs text-slate-700 font-medium pt-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <span>Menos de 2 minutos para preencher</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center shrink-0">
              <TrendingUp className="w-4 h-4" />
            </div>
            <span>Valores sob medida para o escopo</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <span>Manutenção básica: R$ 99/mês no ar</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span>Dados protegidos pela LGPD</span>
          </div>
        </div>

      </div>
    </div>
  );
}
