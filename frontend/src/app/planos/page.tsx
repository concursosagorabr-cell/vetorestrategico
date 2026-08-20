import React from "react";
import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { WEBSITE_PLANS, PRICING_PLANS } from "@/lib/constants";
import { LeadForm } from "@/components/forms/LeadForm";
import { Check, Sparkles, X, ShieldCheck, ArrowRight, Globe, Bot } from "lucide-react";

export const metadata: Metadata = {
  title: "Modelos de Contratação: Criação de Sites & Automação | Vetor Estratégico",
  description:
    "Confira nossos modelos de contratação: Presença Essencial & Captação Direta, Plataforma Institucional Completa e Soluções com Automação Integrada.",
};

const COMPARISON_FEATURES = [
  { name: "Design Responsivo (Mobile & Desktop)", presencaEssencial: true, plataformaInstitucional: true, plataformaAutomacao: true },
  { name: "Botão WhatsApp & Formulário de Contato", presencaEssencial: true, plataformaInstitucional: true, plataformaAutomacao: true },
  { name: "Otimização de Velocidade (Lighthouse 90+)", presencaEssencial: true, plataformaInstitucional: true, plataformaAutomacao: true },
  { name: "Estrutura Multi-páginas & Blog", presencaEssencial: false, plataformaInstitucional: true, plataformaAutomacao: true },
  { name: "SEO Técnico Avançado (Schema.org / JSON-LD)", presencaEssencial: "Básico", plataformaInstitucional: "Avançado", plataformaAutomacao: "Avançado" },
  { name: "Agente de Atendimento no WhatsApp 24/7", presencaEssencial: false, plataformaInstitucional: "Opcional", plataformaAutomacao: true },
  { name: "Triagem & Qualificação Automática de Leads", presencaEssencial: false, plataformaInstitucional: false, plataformaAutomacao: true },
  { name: "Integração com CRM / Planilhas", presencaEssencial: false, plataformaInstitucional: "Opcional", plataformaAutomacao: true },
  { name: "Conformidade Total com a LGPD", presencaEssencial: true, plataformaInstitucional: true, plataformaAutomacao: true },
  { name: "Suporte Técnico Pós-Entrega", presencaEssencial: "Incluso", plataformaInstitucional: "Prioritário", plataformaAutomacao: "Dedicado" },
];

export default function PricingPage() {
  return (
    <div className="py-12 sm:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="emerald" size="md">
            Modelos de Contratação &bull; Escopo Transparente
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-text-primary tracking-tight uppercase">
            Soluções para a <span className="gradient-text-emerald">Fase Atual</span> da sua Empresa
          </h1>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
            Seja para criar uma página rápida e persuasiva voltada a campanhas ou estruturar uma plataforma corporativa completa com automações integradas.
          </p>
        </div>

        {/* SECTION 1: CRIAÇÃO DE SITES & PLATAFORMAS */}
        <div id="sites" className="space-y-8 scroll-mt-28">
          <div className="flex items-center gap-3 pb-2 border-b border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Opções de Desenvolvimento Web & Automação
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Páginas modernas, código limpo e foco em conversão comercial
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {WEBSITE_PLANS.map((plan, idx) => (
              <div
                key={idx}
                className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  plan.popular
                    ? "bg-white border-2 border-emerald-500 shadow-2xl ring-4 ring-emerald-500/10"
                    : "bg-white border border-slate-200 shadow-md hover:border-slate-300"
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 left-8">
                    <span
                      className={`text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md ${
                        plan.popular
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-900 text-white"
                      }`}
                    >
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="space-y-6">
                  <div className="space-y-2 pt-2">
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {plan.tagline}
                    </p>
                  </div>

                  <div className="py-4 border-y border-slate-100">
                    <div className="text-2xl font-black text-slate-900">
                      {plan.price}
                    </div>
                    <span className="text-xs font-semibold text-emerald-700">
                      {plan.period}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                      O que está incluso:
                    </span>
                    <ul className="space-y-2.5 text-xs text-slate-600">
                      {plan.deliverables.map((d, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2.5">
                          <div className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-100">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600">
                    <strong className="text-slate-900 block mb-0.5 font-bold">Ideal para:</strong>
                    {plan.idealFor}
                  </div>
                </div>

                <div className="pt-8 mt-6 border-t border-slate-100">
                  <Button
                    href={plan.ctaHref}
                    variant={plan.popular ? "primary" : "secondary"}
                    size="lg"
                    className="w-full justify-center text-sm font-bold"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    {plan.ctaText}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Comparison Table */}
        <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-10 space-y-6 shadow-sm">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Comparativo de Entregáveis por Solução
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Entenda os recursos inclusos em cada nível de necessidade.
            </p>
          </div>

          <div className="overflow-x-auto pt-4">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-600">
                  <th className="py-4 px-4 font-bold text-slate-900">Recurso / Entregável</th>
                  <th className="py-4 px-4 text-center font-bold text-emerald-800 bg-emerald-50 rounded-t-xl">
                    Presença Essencial
                  </th>
                  <th className="py-4 px-4 text-center font-bold text-slate-900">
                    Plataforma Institucional
                  </th>
                  <th className="py-4 px-4 text-center font-bold text-sky-800">
                    Com Automação Integrada
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {COMPARISON_FEATURES.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-4 font-medium text-slate-900">
                      {row.name}
                    </td>

                    {/* Presença Essencial */}
                    <td className="py-4 px-4 text-center text-emerald-800 bg-emerald-50/50 font-semibold">
                      {typeof row.presencaEssencial === "boolean" ? (
                        row.presencaEssencial ? (
                          <Check className="w-4 h-4 text-emerald-600 mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-slate-300 mx-auto" />
                        )
                      ) : (
                        <span>{row.presencaEssencial}</span>
                      )}
                    </td>

                    {/* Plataforma Institucional */}
                    <td className="py-4 px-4 text-center text-slate-600">
                      {typeof row.plataformaInstitucional === "boolean" ? (
                        row.plataformaInstitucional ? (
                          <Check className="w-4 h-4 text-emerald-600 mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-slate-300 mx-auto" />
                        )
                      ) : (
                        <span>{row.plataformaInstitucional}</span>
                      )}
                    </td>

                    {/* Com Automação */}
                    <td className="py-4 px-4 text-center text-slate-600">
                      {typeof row.plataformaAutomacao === "boolean" ? (
                        row.plataformaAutomacao ? (
                          <Check className="w-4 h-4 text-sky-600 mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-slate-300 mx-auto" />
                        )
                      ) : (
                        <span>{row.plataformaAutomacao}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Lead Form Section */}
        <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-12 shadow-md">
          <SectionHeading
            eyebrow="Solicite sua Proposta"
            eyebrowVariant="emerald"
            title="Dúvida sobre qual formato escolher?"
            highlightText="Fale com nossos especialistas"
            highlightVariant="emerald"
            description="Apresentamos uma proposta sob medida com escopo claro e prazos definidos para a sua empresa."
          />

          <div className="max-w-3xl mx-auto">
            <LeadForm sourceUrl="/planos" />
          </div>
        </div>

      </div>
    </div>
  );
}
