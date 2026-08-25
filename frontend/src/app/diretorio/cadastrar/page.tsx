import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Sparkles,
  ShieldCheck,
  Award,
  ChevronRight,
  TrendingUp,
  Users,
  Eye,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { ToolSubmissionForm } from "@/components/directory/ToolSubmissionForm";

export const metadata: Metadata = {
  title: "Cadastre sua Ferramenta de IA ou Automação | Parcerias & Destaques",
  description:
    "Anuncie sua solução de IA, SaaS ou robô de automação no Diretório Oficial da Vetor Estratégico. Alcance milhares de empresas, clínicas e escritórios em todo o Brasil.",
  openGraph: {
    title: "Cadastre sua Ferramenta de IA | Diretório Vetor Estratégico",
    description:
      "Gere novos clientes e parcerias para seu software de IA no maior diretório brasileiro de soluções inteligentes para PMEs.",
    url: "https://vetorestrategico.com.br/diretorio/cadastrar",
  },
  alternates: {
    canonical: "https://vetorestrategico.com.br/diretorio/cadastrar",
  },
};

export default function SubmitToolPage() {
  return (
    <div className="py-12 sm:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-emerald-700 transition-colors">Início</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/diretorio" className="hover:text-emerald-700 transition-colors">Diretório de IA</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold">Cadastre sua Solução</span>
        </nav>

        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="emerald" size="md">
            <Sparkles className="w-3.5 h-3.5 mr-1" />
            Parcerias & Listagem de Software
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-text-primary tracking-tight">
            Coloque sua Solução de IA no Radar das{" "}
            <span className="gradient-text-emerald">PMEs Brasileiras</span>
          </h1>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
            Conecte sua ferramenta, chatbot ou SaaS aos decisores de clínicas, escritórios de advocacia, e-commerces e empresas que buscam automação na prática.
          </p>
        </div>

        {/* Benefits Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2 text-center sm:text-left">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto sm:mx-0">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Tráfego Qualificado & SEO</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Ranqueamento no Google em buscas específicas por soluções do seu nicho e tráfego orgânico recorrente.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2 text-center sm:text-left">
            <div className="w-10 h-10 rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center mx-auto sm:mx-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Selo de Auditoria Técnica</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              O selo &quot;Verificado Vetor&quot; atesta a qualidade e segurança da sua ferramenta para empresários e diretores.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2 text-center sm:text-left">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mx-auto sm:mx-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Indicação em Consultorias</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Nossa equipe técnica atua como parceira de implementação da sua plataforma em clientes corporativos.
            </p>
          </div>
        </div>

        {/* Submission Form */}
        <div className="pt-4">
          <ToolSubmissionForm />
        </div>

      </div>
    </div>
  );
}
