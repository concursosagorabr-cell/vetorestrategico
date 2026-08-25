"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ShieldCheck,
  Star,
  CheckCircle2,
  XCircle,
  Clock,
  DollarSign,
  ArrowRight,
  ExternalLink,
  Tag,
  Cpu,
  Layers,
  ChevronRight,
  HelpCircle,
  Lock,
  Zap,
  Award,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DirectoryTool } from "@/types";
import { ToolRoiCalculator } from "@/components/directory/ToolRoiCalculator";
import { ToolImplementationModal } from "@/components/directory/ToolImplementationModal";
import { DirectoryToolCard } from "@/components/directory/DirectoryToolCard";

interface ToolDetailClientProps {
  tool: DirectoryTool;
  relatedTools: DirectoryTool[];
}

export const ToolDetailClient: React.FC<ToolDetailClientProps> = ({
  tool,
  relatedTools,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRelatedTool, setSelectedRelatedTool] = useState<DirectoryTool | null>(null);

  const handleOpenMainModal = () => {
    setSelectedRelatedTool(tool);
    setIsModalOpen(true);
  };

  const handleOpenRelatedModal = (t: DirectoryTool) => {
    setSelectedRelatedTool(t);
    setIsModalOpen(true);
  };

  return (
    <div className="py-10 sm:py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Breadcrumb navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium overflow-x-auto pb-1" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-emerald-700 transition-colors">Início</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <Link href="/diretorio" className="hover:text-emerald-700 transition-colors">Diretório de IA</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <Link href={`/diretorio?categoria=${tool.category}`} className="hover:text-emerald-700 transition-colors">{tool.categoryLabel}</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-slate-900 font-bold truncate">{tool.name}</span>
        </nav>

        {/* Hero Card / Tool Spotlight Header */}
        <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-10 shadow-lg relative overflow-hidden space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            
            {/* Left: Logo & Info */}
            <div className="flex items-start gap-5">
              <div
                className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl ${
                  tool.logoBgColor || "bg-emerald-600"
                } text-white flex items-center justify-center font-black text-3xl sm:text-4xl shadow-xl shrink-0`}
              >
                {tool.name.substring(0, 2).toUpperCase()}
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="emerald" size="sm">
                    {tool.categoryLabel}
                  </Badge>

                  {tool.isVerifiedByVetor && (
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Verificado pela Vetor
                    </span>
                  )}

                  {tool.isSponsored && (
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      Destaque
                    </span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {tool.name}
                </h1>
                
                <p className="text-sm sm:text-base text-slate-600 max-w-2xl font-medium">
                  {tool.tagline}
                </p>

                {/* Ratings & Vetor Technical Score */}
                <div className="flex flex-wrap items-center gap-4 pt-2 text-xs">
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-slate-900 text-sm">{tool.rating.toFixed(1)}</span>
                    <span className="text-slate-400 font-normal">({tool.reviewsCount} avaliações)</span>
                  </div>

                  <div className="flex items-center gap-1 bg-emerald-50 text-emerald-900 font-bold px-2.5 py-1 rounded-lg border border-emerald-200">
                    <Award className="w-4 h-4 text-emerald-600" />
                    <span>Nota Vetor: {tool.vetorScore} / 10</span>
                  </div>

                  <span className="text-slate-500 font-medium">
                    Complexidade: <strong className="text-slate-800">{tool.complexityLabel}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Quick Pricing & Direct Action Buttons */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-4 shrink-0 lg:w-80 text-center lg:text-left">
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                  Investimento Médio
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-0.5">
                  {tool.startingPrice || "Sob Consulta"}{" "}
                  <span className="text-xs font-normal text-slate-500">
                    {tool.pricingPeriod || ""}
                  </span>
                </div>
                <span className="text-[11px] text-emerald-700 font-medium flex items-center justify-center lg:justify-start gap-1 mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {tool.pricingLabel}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleOpenMainModal}
                  className="w-full font-bold shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 text-sm"
                >
                  Solicitar Implementação Vetor
                  <ArrowRight className="w-4 h-4" />
                </Button>

                <a
                  href={tool.affiliateUrl || tool.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <Button
                    variant="outline"
                    size="md"
                    className="w-full text-xs font-semibold flex items-center justify-center gap-1.5"
                  >
                    Visitar Site Oficial
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Button>
                </a>
              </div>

              {/* Coupon Box if available */}
              {tool.couponDiscount && (
                <div className="pt-2 border-t border-slate-200 text-left">
                  <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-100 space-y-1">
                    <span className="text-[11px] font-bold text-indigo-900 flex items-center gap-1">
                      <Tag className="w-3 h-3 text-indigo-600" />
                      {tool.couponDiscount}
                    </span>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 text-[11px]">Código do Cupom:</span>
                      <code className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-indigo-200 text-indigo-950">
                        {tool.couponCode}
                      </code>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Niches and Integrations Bar */}
          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
                Nichos Recomendados:
              </span>
              {tool.nicheLabels.map((niche, idx) => (
                <span
                  key={idx}
                  className="text-xs font-semibold px-3 py-1 rounded-xl bg-slate-100 text-slate-800"
                >
                  {niche}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
                Integrações Nativas:
              </span>
              {tool.integrations.map((integ, idx) => (
                <span
                  key={idx}
                  className="text-xs font-semibold px-3 py-1 rounded-xl bg-cyan-50 text-cyan-900 border border-cyan-200"
                >
                  {integ.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Technical Score Breakdown & Analysis Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left 2 Cols: Deep Dive & Specs */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Overview Section */}
            <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Visão Geral & Como Funciona na Prática
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {tool.fullDesc}
              </p>

              {/* Key Features List */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                  Principais Funcionalidades
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {tool.keyFeatures.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pros and Cons Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Pros */}
              <div className="rounded-3xl bg-emerald-50/50 border border-emerald-200 p-6 space-y-3">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-base">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Pontos Fortes (Prós)</span>
                </div>
                <ul className="space-y-2">
                  {tool.pros.map((pro, idx) => (
                    <li key={idx} className="text-xs text-slate-700 flex items-start gap-2 leading-relaxed">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cons */}
              <div className="rounded-3xl bg-rose-50/50 border border-rose-200 p-6 space-y-3">
                <div className="flex items-center gap-2 text-rose-800 font-bold text-base">
                  <XCircle className="w-5 h-5 text-rose-600" />
                  <span>Pontos de Atenção (Contras)</span>
                </div>
                <ul className="space-y-2">
                  {tool.cons.map((con, idx) => (
                    <li key={idx} className="text-xs text-slate-700 flex items-start gap-2 leading-relaxed">
                      <span className="text-rose-600 font-bold">•</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Interactive ROI Calculator */}
            <ToolRoiCalculator
              tool={tool}
              onOpenImplementationModal={handleOpenMainModal}
            />

            {/* Implementation by Vetor Roadmap */}
            <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Chave na Mão
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900">
                    Como a Vetor Estratégico Implementa esta Solução
                  </h3>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  Prazo: {tool.vetorImplementationHours}
                </span>
              </div>

              <div className="space-y-3">
                {tool.vetorDeliverables.map((deliv, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3 text-xs sm:text-sm text-slate-800"
                  >
                    <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                      {idx + 1}
                    </div>
                    <span>{deliv}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-center sm:text-left">
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleOpenMainModal}
                  className="w-full sm:w-auto font-bold flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20"
                >
                  Agendar Reunião Técnica de Implementação
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Pricing Plans Breakdown */}
            <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              <h3 className="text-xl font-extrabold text-slate-900">
                Planos & Preços da Ferramenta
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {tool.pricingPlans.map((plan, idx) => (
                  <div
                    key={idx}
                    className={`rounded-2xl p-5 border flex flex-col justify-between space-y-4 ${
                      plan.highlight
                        ? "border-emerald-400 bg-emerald-50/40 ring-1 ring-emerald-400/30"
                        : "border-slate-200 bg-white"
                    }`}
                  >
                    <div className="space-y-2">
                      {plan.highlight && (
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-600 text-white">
                          Mais Recomendado
                        </span>
                      )}
                      <h4 className="text-base font-bold text-slate-900">{plan.name}</h4>
                      <div className="text-xl font-black text-slate-900">
                        {plan.price}
                      </div>
                      <ul className="space-y-1.5 pt-2">
                        {plan.features.map((feat, fIdx) => (
                          <li key={fIdx} className="text-xs text-slate-600 flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <a
                      href={tool.affiliateUrl || tool.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full"
                    >
                      <Button
                        variant={plan.highlight ? "primary" : "outline"}
                        size="sm"
                        className="w-full text-xs font-bold"
                      >
                        Contratar Direto
                      </Button>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews & Testimonials */}
            {tool.reviews && tool.reviews.length > 0 && (
              <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-extrabold text-slate-900">
                    Depoimentos de Quem Já Utiliza
                  </h3>
                  <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>{tool.rating.toFixed(1)} / 5.0</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {tool.reviews.map((rev, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs font-bold text-slate-900 block">
                            {rev.author}
                          </span>
                          <span className="text-[11px] text-slate-500">
                            {rev.company} • {rev.segment}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400 font-medium">
                          {rev.date}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                        &ldquo;{rev.comment}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tool FAQs */}
            {tool.faqs && tool.faqs.length > 0 && (
              <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
                <h3 className="text-xl font-extrabold text-slate-900">
                  Dúvidas Frequentes sobre {tool.name}
                </h3>
                <div className="space-y-3">
                  {tool.faqs.map((faq, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-1">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                        {faq.question}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed pl-6">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right 1 Col: Score Matrix & Sticky Sidebar */}
          <div className="space-y-6">
            
            {/* Vetor Score Radar Card */}
            <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm space-y-5 sticky top-24">
              <div className="space-y-1 border-b border-slate-100 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Auditoria Técnica Vetor
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  Avaliação por Critérios
                </h3>
              </div>

              {/* Progress Bars */}
              <div className="space-y-3 text-xs">
                <div className="space-y-1">
                  <div className="flex justify-between font-semibold">
                    <span className="text-slate-700">Velocidade & Estabilidade</span>
                    <span className="text-slate-900 font-bold">{tool.scores.velocidade} / 10</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${tool.scores.velocidade * 10}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between font-semibold">
                    <span className="text-slate-700">Facilidade de Uso</span>
                    <span className="text-slate-900 font-bold">{tool.scores.facilidade} / 10</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${tool.scores.facilidade * 10}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between font-semibold">
                    <span className="text-slate-700">Suporte Técnico no Brasil</span>
                    <span className="text-slate-900 font-bold">{tool.scores.suporte} / 10</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${tool.scores.suporte * 10}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between font-semibold">
                    <span className="text-slate-700">Custo-Benefício PME</span>
                    <span className="text-slate-900 font-bold">{tool.scores.custoBeneficio} / 10</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${tool.scores.custoBeneficio * 10}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between font-semibold">
                    <span className="text-slate-700">Segurança & LGPD</span>
                    <span className="text-slate-900 font-bold">{tool.scores.segurancaLgpd} / 10</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${tool.scores.segurancaLgpd * 10}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Sticky CTA */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleOpenMainModal}
                  className="w-full font-bold shadow-lg shadow-emerald-500/20 text-xs"
                >
                  Quero Esta Solução na Minha Empresa
                </Button>
                <Link href="/diretorio" className="block text-center text-xs text-slate-500 hover:text-emerald-700 font-medium">
                  ← Voltar para o Diretório Completo
                </Link>
              </div>

            </div>

          </div>

        </div>

        {/* Related Tools in same niche/category */}
        {relatedTools.length > 0 && (
          <div className="space-y-6 pt-8 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  Soluções Relacionadas & Alternativas
                </h3>
                <p className="text-xs text-slate-500">
                  Outras ferramentas recomendadas para o mesmo segmento ou objetivo operacional.
                </p>
              </div>
              <Link href="/diretorio" className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1">
                Ver todas <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedTools.map((relTool) => (
                <DirectoryToolCard
                  key={relTool.id}
                  tool={relTool}
                  onOpenImplementationModal={handleOpenRelatedModal}
                />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Implementation Lead Capture Modal */}
      <ToolImplementationModal
        tool={selectedRelatedTool || tool}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
