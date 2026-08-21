import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  ParallaxLayer,
  ParallaxVectorGrid,
  ParallaxWatermark,
  StrategicVectorMesh,
} from "@/components/ui/Parallax";
import { ArrowRight, CheckCircle2, ShieldCheck, Compass, Code2 } from "lucide-react";

export const AboutSnippetSection: React.FC = () => {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background Vector Grid & Monumental Watermark */}
      <ParallaxVectorGrid theme="light" speed={0.06} />
      <ParallaxWatermark text="METODOLOGIA &bull; ENGENHARIA &bull; VISÃO" speed={0.16} direction="left" variant="light" />
      <StrategicVectorMesh theme="light" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Story & Principles */}
          <div className="lg:col-span-7 space-y-6">
            <Badge variant="emerald" size="md">
              Sobre a Vetor Estratégico
            </Badge>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Unimos <span className="gradient-text-emerald">engenharia web de alto nível</span> à visão prática de negócios
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              A <strong className="text-slate-900">Vetor Estratégico</strong> foi criada para resolver uma carência comum no mercado: páginas lentas e sem foco comercial de um lado, ou soluções de tecnologia excessivamente complexas do outro.
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Desenvolvemos plataformas web velozes e integrações de atendimento que geram valor direto: <strong className="text-slate-900">mais contatos chegando pelo WhatsApp, menos tempo de espera para o cliente e processos organizados para a sua empresa</strong>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/80 border border-slate-200 shadow-xs">
                <Compass className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-slate-900 block text-sm mb-0.5">Foco Comercial</strong>
                  <span className="text-slate-500">Toda estrutura é planejada para facilitar o contato de quem quer contratar.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/80 border border-slate-200 shadow-xs">
                <Code2 className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-slate-900 block text-sm mb-0.5">Código Próprio & Limpo</strong>
                  <span className="text-slate-500">Sem plataformas engessadas. Carregamento veloz e controle total.</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <Button href="/sobre" variant="secondary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Conheça Nossa Metodologia
              </Button>
            </div>
          </div>

          {/* Right Column: Trust & Commitment Card with Parallax Depth */}
          <div className="lg:col-span-5 relative">
            <ParallaxLayer speed={-0.05}>
              <div className="rounded-3xl bg-white/95 backdrop-blur-xs border border-slate-200 p-8 space-y-6 shadow-xl relative hover:shadow-2xl transition-shadow">
                <h3 className="text-lg font-bold text-slate-900 pb-4 border-b border-slate-100 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  Compromissos de Entrega
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-sm font-bold text-slate-900 block">Escopo e Prazos Transparentes</span>
                      <span className="text-xs text-slate-500">Entregas alinhadas em etapas claras com acompanhamento técnico contínuo.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-sm font-bold text-slate-900 block">Performance Mobile-First</span>
                      <span className="text-xs text-slate-500">Prioridade absoluta na experiência rápida de quem navega pelo smartphone.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-sm font-bold text-slate-900 block">Conformidade com a LGPD</span>
                      <span className="text-xs text-slate-500">Tratamento seguro e sigiloso de todos os dados da sua empresa e clientes.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-sm font-bold text-slate-900 block">Autonomia do Cliente</span>
                      <span className="text-xs text-slate-500">Domínio e acessos 100% de propriedade da sua empresa com suporte dedicado.</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <span className="text-[11px] text-slate-400 block text-center">
                    São Paulo - SP & Atendimento Online em Todo o Brasil
                  </span>
                </div>
              </div>
            </ParallaxLayer>
          </div>
        </div>
      </div>
    </section>
  );
};
