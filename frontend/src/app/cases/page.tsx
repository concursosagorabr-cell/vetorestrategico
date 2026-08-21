import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  ParallaxVectorGrid,
  ParallaxWatermark,
  StrategicVectorMesh,
} from "@/components/ui/Parallax";
import { CASE_STUDIES, COMPANY_INFO } from "@/lib/constants";
import { InteractiveCasesViewer } from "@/components/sections/InteractiveCasesViewer";
import { MessageSquare, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Portfólio de Projetos: Desenvolvimento Web & Automação | Vetor Estratégico",
  description:
    "Explore projetos reais de Criação de Sites, Portais de Conteúdo e Soluções de Automação: Marcos Pinturas SP, Concursos Agora, Valore Gestão e OdontoPrime.",
};

export default function CasesPage() {
  return (
    <div className="py-12 sm:py-20 bg-background relative overflow-hidden">
      {/* Background Vector Grid & Monumental Watermark */}
      <ParallaxVectorGrid theme="light" speed={0.06} />
      <ParallaxWatermark text="CASES REAIS &bull; PORTFÓLIO &bull; RESULTADOS" speed={0.16} direction="right" variant="cyan" />
      <StrategicVectorMesh theme="light" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="cyan" size="md">
            Portfólio &bull; Aplicação Prática
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight uppercase">
            Projetos Criados Para <span className="gradient-text-cyan">Empresas</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Conheça os desafios, a solução técnica desenvolvida e a arquitetura aplicada para clientes de diferentes segmentos de mercado.
          </p>
        </div>

        {/* Dynamic Interactive Cases Viewer */}
        <Suspense fallback={
          <div className="p-12 text-center text-slate-500 font-bold bg-white rounded-3xl border border-slate-200">
            Carregando projetos...
          </div>
        }>
          <InteractiveCasesViewer cases={CASE_STUDIES} />
        </Suspense>

        {/* Bottom CTA Card */}
        <div className="rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 border border-emerald-800/40 p-8 sm:p-12 text-center space-y-6 text-white shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            Pronto para estruturar o projeto da sua empresa?
          </h3>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal">
            Desenvolvemos o site ideal para o momento da sua empresa, com código limpo, SEO para o Google e foco em captação no WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button href="/orcamento" variant="primary" size="lg" className="rounded-full px-8 py-4 font-black">
              Solicitar Proposta
            </Button>
            <Button
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              size="lg"
              className="rounded-full px-8 py-4 font-black bg-slate-900/80 border-slate-700 text-white hover:bg-slate-800"
              leftIcon={<MessageSquare className="w-5 h-5 text-emerald-400" />}
            >
              Falar no WhatsApp: {COMPANY_INFO.phone}
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}
