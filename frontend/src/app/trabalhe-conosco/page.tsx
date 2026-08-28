import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CareerApplicationForm } from "@/components/forms/CareerApplicationForm";
import { CAREER_POSITIONS } from "@/lib/constants";
import {
  ParallaxVectorGrid,
  ParallaxWatermark,
  StrategicVectorMesh,
} from "@/components/ui/Parallax";
import {
  Briefcase,
  Sparkles,
  Zap,
  CheckCircle2,
  Globe2,
  Code2,
  TrendingUp,
  Cpu,
  ShieldCheck,
  ArrowRight,
  HelpCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Trabalhe Conosco | Banco de Talentos & Vagas | Vetor Estratégico",
  description:
    "Faça parte da Vetor Estratégico. Vagas 100% remotas e banco de talentos para Desenvolvedores Next.js, Especialistas em IA, Copywriters e Prospecção Comercial B2B.",
  keywords: [
    "trabalhe conosco vetor estrategico",
    "vagas desenvolvedor nextjs",
    "vagas automacao ia",
    "banco de talentos tecnologia",
    "carreiras desenvolvimento web remoto",
  ],
};

export default function TrabalheConoscoPage() {
  return (
    <div className="py-12 sm:py-20 bg-background relative overflow-hidden">
      {/* Background Ambience */}
      <ParallaxVectorGrid theme="light" speed={0.06} />
      <ParallaxWatermark text="CARREIRAS &bull; TALENTOS &bull; CRESCIMENTO" speed={0.16} direction="left" variant="light" />
      <StrategicVectorMesh theme="light" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 relative z-10">
        
        {/* HERO SECTION */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            Expansão Acelerada &bull; Banco de Talentos Aberto
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-text-primary tracking-tight uppercase leading-[1.1]">
            Construa o Futuro da Web &amp; IA na <span className="gradient-text-emerald">Vetor Estratégico</span>
          </h1>

          <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-3xl mx-auto">
            Com o ritmo acelerado de crescimento e novos contratos corporativos fechados desde as primeiras semanas de operação, estamos montando nosso <strong>banco de talentos prioritário</strong> para profissionais que buscam atuar na vanguarda da engenharia web e inteligência artificial.
          </p>

          {/* Quick Key Highlights */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 shadow-xs">
              <Globe2 className="w-3.5 h-3.5 text-emerald-600" />
              100% Remoto (PJ)
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 shadow-xs">
              <Zap className="w-3.5 h-3.5 text-sky-600" />
              Stack Moderna (Next.js 14 / IA)
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 shadow-xs">
              <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
              Cultura de Alto Impacto
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Autonomia &bull; Zero Burocracia
            </span>
          </div>
        </div>

        {/* WHY WORK WITH US */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Engenharia Sem Gambiarras
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Trabalhamos com código limpo, componentização de alto nível, Next.js App Router, Tailwind CSS e APIs de IA de alta velocidade. Aqui você constrói produtos reais com padrão técnico elevado.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center border border-sky-100">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              IA Aplicada a Negócios Reais
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Desenvolvemos fluxos que convertem clientes e reduzem gargalos operacionais no WhatsApp e na web. Não criamos apenas demos: entregamos sistemas funcionais para empresas em todo o Brasil.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Crescimento Direto &amp; Autonomia
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Acreditamos em liberdade com responsabilidade. Você trabalha de onde quiser, com foco em prazos, clareza nos entregáveis e remuneração alinhada ao valor que gera.
            </p>
          </div>
        </div>

        {/* OPEN POSITIONS & TALENT POOL */}
        <div id="vagas" className="space-y-8 scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <Badge variant="emerald" size="md">
              Oportunidades &amp; Áreas de Atuação
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Vagas em Aberto &bull; Banco de Talentos
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Confira as áreas prioritárias para as quais estamos recrutando e recebendo perfis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CAREER_POSITIONS.map((position) => (
              <div
                key={position.id}
                className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                      {position.department}
                    </span>
                    <Badge variant="emerald" size="sm">
                      {position.badge}
                    </Badge>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-slate-900">
                      {position.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                      <span>{position.type}</span>
                      <span>&bull;</span>
                      <span>{position.level}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {position.shortDesc}
                  </p>

                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-800 block">
                      O que você fará:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {position.responsibilities.map((resp, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-800 block">
                      Requisitos fundamentais:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {position.requirements.map((req, reqIdx) => (
                        <li key={reqIdx} className="flex items-start gap-2">
                          <span className="text-slate-400 font-bold">&bull;</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <a
                    href="#candidatura"
                    className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold transition-all hover:scale-[1.01] active:scale-98"
                  >
                    <span>Candidatar-se para esta vaga</span>
                    <ArrowRight className="w-4 h-4 text-emerald-400" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* APPLICATION FORM SECTION */}
        <div id="candidatura" className="space-y-8 scroll-mt-24 max-w-4xl mx-auto">
          <div className="text-center space-y-2">
            <Badge variant="gold" size="md">
              Envio Direto
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Envie seu Currículo
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
              Envie seu arquivo em <strong>PDF (.pdf)</strong> ou preencha o formulário online estruturado.
            </p>
          </div>

          <CareerApplicationForm />
        </div>

        {/* RECRUITING FAQ */}
        <div className="max-w-3xl mx-auto space-y-6 pt-12 border-t border-slate-200">
          <div className="text-center space-y-1">
            <h3 className="text-xl font-bold text-slate-900 flex items-center justify-center gap-2">
              <HelpCircle className="w-5 h-5 text-emerald-600" />
              Perguntas Frequentes sobre o Banco de Talentos
            </h3>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
              <strong className="text-slate-900 font-bold block">
                Por que a Vetor Estratégico só aceita currículos em PDF?
              </strong>
              <p className="text-slate-600 leading-relaxed font-normal">
                O formato PDF preserva a formatação original em qualquer dispositivo e garante a integridade e segurança dos dados. Caso você não tenha um PDF pronto, disponibilizamos a opção de <em>Preencher Online</em> para enviar todos os dados estruturados de forma imediata.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
              <strong className="text-slate-900 font-bold block">
                Como funciona o modelo de contratação?
              </strong>
              <p className="text-slate-600 leading-relaxed font-normal">
                Atuamos predominantemente no modelo 100% remoto via Pessoa Jurídica (PJ) ou contratos sob demanda de alta flexibilidade, com foco absoluto em entregas de alto padrão.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
              <strong className="text-slate-900 font-bold block">
                Em quanto tempo recebo retorno?
              </strong>
              <p className="text-slate-600 leading-relaxed font-normal">
                Nosso banco de talentos é consultado continuamente a cada novo projeto e demanda corporativa. Quando identificamos aderência ao seu perfil, entramos em contato direto pelo WhatsApp ou e-mail cadastrado para uma conversa técnica.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
