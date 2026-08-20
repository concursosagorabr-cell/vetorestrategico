import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { AlertTriangle, Clock, XCircle, ArrowRight, Sparkles } from "lucide-react";

export const ProvocativeAlertSection: React.FC = () => {
  const alertSigns = [
    {
      title: "Site lento no celular ou com visual desatualizado",
      desc: "Mais de 70% dos acessos vêm do smartphone. Se o site demora para carregar ou passa aspecto amador, o cliente vai direto para o concorrente.",
    },
    {
      title: "Empresa invisível no Google e dependente 100% de indicação",
      desc: "Sem uma estrutura de alta conversão e SEO técnico, sua empresa deixa de captar clientes qualificados que buscam seus serviços todos os dias.",
    },
    {
      title: "WhatsApp sem resposta imediata fora do horário comercial",
      desc: "Leads que procuram seu serviço à noite ou fim de semana acabam fechando com o primeiro que responder — a menos que você tenha automação inteligente.",
    },
    {
      title: "Dificuldade para fechar contratos de alto valor",
      desc: "Um site institucional premium constrói autoridade imediata de marca, transmitindo confiança para defender preços e margens melhores.",
    },
  ];

  return (
    <section className="py-20 bg-slate-50/50 border-y border-slate-200/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border border-amber-200/80 p-8 sm:p-12 relative overflow-hidden shadow-md">
          {/* Subtle Warning Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 uppercase tracking-wider">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              Sinais de Alerta para o seu Negócio
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight uppercase leading-[1.08]">
              Sua empresa está perdendo clientes por causa de uma{" "}
              <span className="text-amber-600">presença digital fraca</span>?
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Se você identificou 2 ou mais dos sinais abaixo na sua rotina, sua empresa está deixando vendas e autoridade na mesa todos os dias:
            </p>
          </div>

          {/* Grid of Alert Signs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-10">
            {alertSigns.map((sign, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4"
              >
                <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 mt-0.5 border border-red-100">
                  <XCircle className="w-5 h-5" />
                </div>
                <div className="space-y-1 text-left">
                  <h3 className="text-base font-bold text-slate-900">
                    {sign.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {sign.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Action */}
          <div className="text-center pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              href="/orcamento"
              variant="primary"
              size="lg"
              className="text-base font-bold rounded-full px-8 py-4 shadow-lg shadow-emerald-600/25"
              leftIcon={<Sparkles className="w-5 h-5 fill-white text-white" />}
            >
              Planejar Meu Novo Site Agora
            </Button>
            
            <Button
              href="/diagnostico"
              variant="outline"
              size="lg"
              className="text-base font-bold rounded-full px-7 py-4"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Fazer Diagnóstico de IA Gratuito
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
