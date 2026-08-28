import React from "react";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  ParallaxLayer,
  ParallaxVectorGrid,
  ParallaxWatermark,
  StrategicVectorMesh,
} from "@/components/ui/Parallax";
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
    <div className="py-12 sm:py-20 bg-background relative overflow-hidden">
      {/* Background Vector Grid & Monumental Watermark */}
      <ParallaxVectorGrid theme="light" speed={0.06} />
      <ParallaxWatermark text="SOBRE NÓS &bull; VISÃO &bull; ENGENHARIA" speed={0.16} direction="left" variant="light" />
      <StrategicVectorMesh theme="light" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 relative z-10">
        
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
              A <strong>Vetor Estratégico</strong> foi construída literalmente do zero na prática em menos de 30 dias com um objetivo inequívoco: <strong>provar na prática que engenharia web de alta performance gera tráfego orgânico real desde o primeiro mês, sem depender de anúncios pagos</strong>.
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Diferente do mercado tradicional de agências que promete números sem comprovação, nós <strong>disponibilizamos aos nossos clientes acesso direto aos painéis da Vercel e do Google Analytics</strong>. Você audita os visitantes, visualizações e o desempenho do seu site mês a mês por conta própria.
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Além disso, atuamos com <strong>risco zero</strong>: apresentamos um protótipo navegável do projeto para sua avaliação antes de qualquer pagamento. O valor da criação só é cobrado se você realmente aprovar a proposta e decidir fechar negócio. <strong>Não trabalhamos com contratos de fidelidade ou multas de rescisão</strong> — nosso compromisso é que você continue conosco pela qualidade do resultado e valor gerado no dia a dia.
            </p>
          </div>

          <div className="lg:col-span-5 rounded-3xl bg-white border border-slate-200 p-8 space-y-6 shadow-xl">
            <h3 className="text-lg font-bold text-slate-900 pb-4 border-b border-slate-100 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              Nossos Compromissos de Confiança
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-sm font-bold text-slate-900 block">Protótipo Avaliado Antes do Pagamento</span>
                  <span className="text-xs text-slate-500">Veja seu site funcionando antes de pagar qualquer valor de criação.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-sm font-bold text-slate-900 block">Acesso Direto aos Painéis Vercel &amp; Analytics</span>
                  <span className="text-xs text-slate-500">Acompanhamento transparente de acessos e métricas em tempo real.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-sm font-bold text-slate-900 block">Zero Fidelidade &amp; Sem Multas</span>
                  <span className="text-xs text-slate-500">Liberdade total para cancelar o serviço quando quiser, sem taxas.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-sm font-bold text-slate-900 block">Tráfego Orgânico &amp; Performance (&lt; 1s)</span>
                  <span className="text-xs text-slate-500">Código limpo em Next.js e SEO técnico preparado para o Google.</span>
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
