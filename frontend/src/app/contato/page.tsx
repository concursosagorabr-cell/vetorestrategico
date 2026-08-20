import React from "react";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { COMPANY_INFO } from "@/lib/constants";
import { LeadForm } from "@/components/forms/LeadForm";
import { ContactForm } from "@/components/forms/ContactForm";
import { Mail, Phone, MapPin, Clock, MessageCircle, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Fale com um Especialista | Contato & Orçamentos",
  description:
    "Solicite um orçamento personalizado ou agende uma reunião estratégica com os consultores de IA da Vetor Estratégico.",
};

export default function ContatoPage({
  searchParams,
}: {
  searchParams?: { plano?: string; servico?: string };
}) {
  const initialPlan = searchParams?.plano || searchParams?.servico;

  return (
    <div className="py-12 sm:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="emerald" size="md">
            Atendimento Consultivo
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-text-primary tracking-tight">
            Fale com um <span className="gradient-text-emerald">Especialista de IA</span>
          </h1>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
            Estamos prontos para entender os desafios da sua empresa e propor a melhor estratégia de automação. Retorno garantido em até 2 horas úteis.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Channels & Guarantee */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900">
                Canais Diretos de Contato
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <a
                  href={COMPANY_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3.5 hover:bg-emerald-100/80 transition-colors block text-left"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5 fill-white" />
                  </div>
                  <div>
                    <span className="font-bold text-emerald-800 block">WhatsApp Comercial</span>
                    <span className="text-slate-900 font-bold">{COMPANY_INFO.phone}</span>
                    <span className="text-[11px] text-slate-500 font-medium block mt-0.5">Resposta em poucos minutos</span>
                  </div>
                </a>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">E-mail para Propostas</span>
                    <a href={`mailto:${COMPANY_INFO.email}`} className="text-slate-900 font-bold hover:text-emerald-700 transition-colors">
                      {COMPANY_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 border border-slate-200 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Atendimento</span>
                    <span className="text-slate-900 font-bold">{COMPANY_INFO.location}</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Horário de Atendimento</span>
                    <span className="text-slate-900 font-bold">Segunda a Sexta: 08h30 às 18h30</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Assurance Box */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Nosso Compromisso</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Não fazemos ligações insistentes nem repassamos seus dados para terceiros. Nosso primeiro contato é sempre um diagnóstico focado na viabilidade técnica do seu projeto.
              </p>
            </div>
          </div>

          {/* Right Column: Lead Form */}
          <div className="lg:col-span-7 rounded-3xl bg-white border border-slate-200 p-6 sm:p-10 shadow-xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Solicitar Orçamento & Proposta
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
              Preencha os campos abaixo para que possamos preparar uma estimativa de investimento e escopo técnico.
            </p>

            <LeadForm initialPlan={initialPlan} sourceUrl="/contato" />
          </div>

        </div>

      </div>
    </div>
  );
}
