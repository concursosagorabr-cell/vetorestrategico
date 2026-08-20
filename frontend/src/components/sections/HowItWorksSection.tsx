import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ParallaxLayer } from "@/components/ui/Parallax";
import { Search, Cog, Rocket, ArrowRight } from "lucide-react";

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      step: "01",
      icon: Search,
      title: "Diagnóstico da Operação",
      description: "Identificamos os processos repetitivos e os gargalos de atendimento e vendas que mais drenam tempo e dinheiro da sua empresa.",
      color: "emerald",
      parallaxSpeed: 0.05,
    },
    {
      step: "02",
      icon: Cog,
      title: "Plano & Construção da IA",
      description: "Desenhamos a solução sob medida conectada ao seu WhatsApp, CRM e ERP, com regras de negócio claras e sem termos difíceis.",
      color: "cyan",
      parallaxSpeed: -0.05,
    },
    {
      step: "03",
      icon: Rocket,
      title: "Implantação & Acompanhamento",
      description: "Colocamos o agente em produção em até 30 dias, treinamos sua equipe e fornecemos um painel de métricas para você auditar o ROI.",
      color: "gold",
      parallaxSpeed: 0.08,
    },
  ];

  return (
    <section className="py-20 bg-slate-50/50 border-y border-slate-200/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Como Funciona"
          eyebrowVariant="emerald"
          title="Em apenas 3 passos simples, sua empresa"
          highlightText="operando com IA prática"
          highlightVariant="emerald"
          description="Sem projetos intermináveis e sem complexidade desnecessária. Entregamos soluções funcionais com agilidade."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative items-stretch">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <ParallaxLayer key={item.step} speed={item.parallaxSpeed} className="h-full">
                <div
                  className="h-full relative rounded-3xl bg-white border border-slate-200 p-8 flex flex-col justify-between hover:border-slate-300 shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1"
                >
                  {/* Step Indicator Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                        item.color === "emerald"
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                          : item.color === "cyan"
                          ? "bg-sky-50 text-sky-600 border border-sky-100"
                          : "bg-amber-50 text-amber-700 border border-amber-100"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-black text-slate-200 group-hover:text-slate-300 transition-colors">
                      {item.step}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="space-y-3">
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                      {item.title}
                    </h3>
                    <p className="text-base text-slate-600 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom line accent */}
                  <div
                    className={`mt-6 h-1.5 w-14 rounded-full ${
                      item.color === "emerald"
                        ? "bg-emerald-500"
                        : item.color === "cyan"
                        ? "bg-sky-500"
                        : "bg-amber-500"
                    }`}
                  />
                </div>
              </ParallaxLayer>
            );
          })}
        </div>

        {/* CTA Footer */}
        <div className="mt-12 text-center">
          <Button href="/diagnostico" variant="primary" size="lg" className="rounded-full px-8 py-4 text-base font-bold" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Comece pelo Diagnóstico Gratuito
          </Button>
        </div>
      </div>
    </section>
  );
};
