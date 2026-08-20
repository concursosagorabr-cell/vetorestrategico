import React from "react";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { COMPANY_INFO } from "@/lib/constants";
import {
  Compass,
  Zap,
  ShieldCheck,
  Target,
  Code2,
  CheckCircle2,
  MessageSquare,
  Globe,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Sobre a Vetor Estratégico | Engenharia Web & Estratégia Comercial",
  description:
    "Conheça a Vetor Estratégico: unimos engenharia web de alto nível e visão prática de negócios para gerar mais clientes e eficiência para empresas.",
};

export default function AboutPage() {
  const pillars = [
    {
      icon: Target,
      title: "Pragmatismo Comercial",
      desc: "Não desenvolvemos tecnologia por vaidade. Toda página e automação precisa cumprir uma função clara: gerar contatos ou economizar tempo da sua equipe.",
    },
    {
      icon: Code2,
      title: "Engenharia de Alta Performance",
      desc: "Código limpo, moderno e sem construtores visuais pesados. Prioridade máxima em velocidade de carregamento em redes móveis.",
    },
    {
      icon: ShieldCheck,
      title: "Segurança & Conformidade LGPD",
      desc: "Tratamento ético e sigiloso de dados. Formulários protegidos e arquitetura em conformidade integral com a legislação brasileira.",
    },
    {
      icon: Zap,
      title: "Atendimento Próximo & Direto",
      desc: "Comunicação transparente diretamente com quem planeja e executa a solução técnica, com escopo claro e respeito a prazos.",
    },
  ];

  return (
    <div className="py-12 sm:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="emerald" size="md">
            Sobre Nós &bull; Visão & Engenharia
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-text-primary tracking-tight">
            A união entre <span className="gradient-text-emerald">engenharia web</span> e estratégia de negócios
          </h1>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
            Desenvolvemos a presença digital e as rotinas comerciais de empresas que buscam crescer com previsibilidade, velocidade e tecnologia prática.
          </p>
        </div>

        {/* Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Nosso Propósito & Metodologia
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              A <strong>Vetor Estratégico</strong> foi criada para preencher um espaço recorrente no mercado: de um lado, agências que entregam sites visualmente agradáveis mas lentos e sem foco em captação; de outro, soluções de tecnologia excessivamente complexas que não atendem às necessidades reais de uma empresa.
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Atuamos com foco naquilo que realmente move o ponteiro do negócio: <strong>páginas institucionais de alto padrão, carregamento instantâneo no celular, canais diretos de contato no WhatsApp e automações de triagem comercial</strong>.
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Atendemos empresas e profissionais liberais em todo o Brasil a partir de São Paulo, construindo soluções técnicas sob medida e mantendo uma relação de proximidade e transparência em cada projeto entregue.
            </p>
          </div>

          <div className="lg:col-span-5 rounded-3xl bg-white border border-slate-200 p-8 space-y-6 shadow-xl">
            <h3 className="text-lg font-bold text-slate-900 pb-4 border-b border-slate-100 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              Nossos Compromissos Técnicos
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-sm font-bold text-slate-900 block">Performance Mobile-First</span>
                  <span className="text-xs text-slate-500">Páginas leves que abrem em frações de segundo no celular.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-sm font-bold text-slate-900 block">Integração Direta com WhatsApp</span>
                  <span className="text-xs text-slate-500">Facilidade de contato para o cliente e agilidade para sua equipe.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-sm font-bold text-slate-900 block">Conformidade com a LGPD</span>
                  <span className="text-xs text-slate-500">Segurança de dados e respeito total à privacidade do usuário.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-sm font-bold text-slate-900 block">Propriedade Integral do Cliente</span>
                  <span className="text-xs text-slate-500">Domínio, acessos e arquivos são 100% da sua empresa.</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-500 font-medium text-center">
              São Paulo - SP &bull; Atendimento Online para Todo o Brasil
            </div>
          </div>
        </div>

        {/* Pillars Section */}
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <Badge variant="cyan" size="md">
              Diretrizes de Atuação
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Os Princípios que Guiam Nossas Entregas
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="rounded-3xl bg-white border border-slate-200 p-6 space-y-4 hover:border-emerald-300 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 border border-emerald-800/40 p-8 sm:p-12 text-center space-y-6 text-white shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            Quer avaliar o potencial do seu site ou projeto?
          </h3>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            Converse diretamente com nossos especialistas e receba uma avaliação clara e sem compromisso.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/orcamento" variant="primary" size="lg">
              Solicitar Proposta
            </Button>
            <Button
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              size="lg"
              className="bg-slate-900/80 border-slate-700 text-white hover:bg-slate-800"
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
