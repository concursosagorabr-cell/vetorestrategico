import React from "react";
import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SERVICES, COMPANY_INFO } from "@/lib/constants";
import { LeadForm } from "@/components/forms/LeadForm";
import {
  Globe,
  MessageSquare,
  TrendingUp,
  Cpu,
  BarChart3,
  Users,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Serviços de Criação de Sites & Inteligência Artificial para PMEs | Vetor Estratégico",
  description:
    "Criação de sites de alta conversão sob medida, automação de WhatsApp com IA, qualificação de leads, RPA de back-office e dashboards inteligentes.",
};

const serviceIconMap: Record<string, React.ElementType> = {
  Globe,
  MessageSquare,
  TrendingUp,
  Cpu,
  BarChart3,
  Users,
};

export default function ServicesPage() {
  return (
    <div className="py-12 sm:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="emerald" size="md">
            Nosso Portfólio de Soluções
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-text-primary tracking-tight">
            Criação de Sites & <span className="gradient-text-emerald">Inteligência Artificial</span> focados em ROI
          </h1>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
            Desde um site rápido de alta conversão até automações avançadas de atendimento e processos para acelerar o crescimento da sua empresa.
          </p>
        </div>

        {/* Services Deep Dive List */}
        <div className="space-y-16">
          {SERVICES.map((srv, idx) => {
            const Icon = serviceIconMap[srv.iconName] || Cpu;

            return (
              <div
                key={srv.id}
                id={srv.id}
                className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-10 lg:p-12 scroll-mt-28 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Service Info */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center">
                        <Icon className="w-6 h-6" />
                      </div>
                      <Badge variant="emerald" size="sm">
                        {srv.badge}
                      </Badge>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                      {srv.title}
                    </h2>

                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                      {srv.fullDesc}
                    </p>

                    {/* Target Audience */}
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                      <strong className="text-slate-900 font-bold block mb-0.5">Indicado para:</strong>
                      {srv.targetAudience}
                    </div>

                    {/* Key Benefits */}
                    <div className="space-y-2.5 pt-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                        Principais Benefícios:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {srv.benefits.map((b, bIdx) => (
                          <div key={bIdx} className="flex items-start gap-2 text-xs text-slate-600">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action button */}
                    <div className="pt-4 flex flex-wrap items-center gap-4">
                      <Button href={`/contato?servico=${srv.id}`} variant="primary" size="md">
                        Solicitar Orçamento Deste Serviço
                      </Button>
                      <Button href="/planos" variant="secondary" size="md">
                        Ver Planos e Preços
                      </Button>
                    </div>
                  </div>

                  {/* Deliverables Card on the Right */}
                  <div className="lg:col-span-5 rounded-2xl bg-slate-50 border border-slate-200/80 p-6 space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      O que está incluso na entrega:
                    </h3>

                    <ul className="space-y-3">
                      {srv.deliverables.map((del, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2.5 text-xs text-slate-600">
                          <div className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-100">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </div>
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-4 border-t border-slate-200/80 text-[11px] text-slate-500 flex items-center gap-1.5 font-medium">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Desenvolvimento ágil com suporte pós-lançamento.</span>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Lead Form Section at the Bottom */}
        <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-12 relative shadow-md">
          <SectionHeading
            eyebrow="Solicite uma Proposta"
            eyebrowVariant="gold"
            title="Vamos desenhar o projeto ideal para"
            highlightText="sua empresa?"
            highlightVariant="gold"
            description="Preencha o formulário abaixo para receber uma análise personalizada da nossa equipe técnica em até 2 horas úteis."
          />

          <div className="max-w-3xl mx-auto">
            <LeadForm sourceUrl="/servicos" />
          </div>
        </div>

      </div>
    </div>
  );
}
