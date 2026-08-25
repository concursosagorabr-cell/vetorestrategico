"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  ShieldCheck,
  Star,
  Clock,
  ArrowRight,
  ExternalLink,
  Tag,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Layers,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DirectoryTool } from "@/types";

interface DirectoryToolCardProps {
  tool: DirectoryTool;
  viewMode?: "grid" | "list";
  onOpenImplementationModal?: (tool: DirectoryTool) => void;
}

export const DirectoryToolCard: React.FC<DirectoryToolCardProps> = ({
  tool,
  viewMode = "grid",
  onOpenImplementationModal,
}) => {
  const isFeatured = tool.isFeatured || tool.isTopChoice;

  if (viewMode === "list") {
    return (
      <article
        className={`rounded-3xl bg-white border p-5 sm:p-6 transition-all duration-300 hover:shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group ${
          tool.isSponsored
            ? "border-emerald-300 ring-1 ring-emerald-400/30 bg-gradient-to-r from-emerald-50/40 via-white to-white"
            : isFeatured
            ? "border-slate-300 hover:border-emerald-300 shadow-sm"
            : "border-slate-200 hover:border-slate-300 shadow-sm"
        }`}
      >
        <div className="flex items-start gap-4 flex-1">
          {/* Logo / Avatar */}
          <div
            className={`w-14 h-14 rounded-2xl ${
              tool.logoBgColor || "bg-emerald-600"
            } text-white flex items-center justify-center font-extrabold text-xl shadow-md shrink-0`}
          >
            {tool.name.substring(0, 2).toUpperCase()}
          </div>

          <div className="space-y-2 flex-1">
            {/* Badges & Tags Header */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                {tool.categoryLabel}
              </span>

              {tool.isVerifiedByVetor && (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  Verificado Vetor
                </span>
              )}

              {tool.isSponsored && (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  Destaque
                </span>
              )}

              {tool.couponDiscount && (
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  {tool.couponCode}
                </span>
              )}
            </div>

            {/* Title & Tagline */}
            <div>
              <Link href={`/diretorio/${tool.slug}`}>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors flex items-center gap-2">
                  {tool.name}
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-600" />
                </h3>
              </Link>
              <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                {tool.shortDesc}
              </p>
            </div>

            {/* Integrations & Niches pills */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {tool.nicheLabels?.slice(0, 3).map((niche, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600"
                >
                  {niche}
                </span>
              ))}
              {tool.integrations?.slice(0, 2).map((integ, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-cyan-50 text-cyan-800 border border-cyan-100"
                >
                  {integ.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right action & pricing column */}
        <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
          <div className="text-left md:text-right">
            <div className="flex items-center md:justify-end gap-1.5">
              <div className="flex items-center text-amber-500">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-xs font-bold text-slate-900 ml-1">
                  {tool.rating.toFixed(1)}
                </span>
              </div>
              <span className="text-[11px] text-slate-400">
                (Nota Vetor: <strong className="text-emerald-700">{tool.vetorScore}</strong>)
              </span>
            </div>
            <div className="text-base font-extrabold text-slate-900 mt-0.5">
              {tool.startingPrice || "Sob Consulta"}{" "}
              <span className="text-xs font-normal text-slate-500">
                {tool.pricingPeriod || ""}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href={`/diretorio/${tool.slug}`}>
              <Button variant="outline" size="sm" className="text-xs font-semibold">
                Ver Análise
              </Button>
            </Link>
            {onOpenImplementationModal && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => onOpenImplementationModal(tool)}
                className="text-xs font-bold shadow-md shadow-emerald-500/20"
              >
                Implementar
              </Button>
            )}
          </div>
        </div>
      </article>
    );
  }

  // Default: Grid View
  return (
    <article
      className={`rounded-3xl bg-white border p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl relative group ${
        tool.isSponsored
          ? "border-emerald-300 ring-1 ring-emerald-400/30 shadow-md bg-gradient-to-b from-emerald-50/30 via-white to-white"
          : isFeatured
          ? "border-slate-300 hover:border-emerald-300 shadow-sm"
          : "border-slate-200 hover:border-slate-300 shadow-sm"
      }`}
    >
      {/* Top Badges Row */}
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-2">
          {/* Logo & Category */}
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-2xl ${
                tool.logoBgColor || "bg-emerald-600"
              } text-white flex items-center justify-center font-extrabold text-lg shadow-md shrink-0`}
            >
              {tool.name.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700 block">
                {tool.categoryLabel}
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="flex items-center text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-bold text-slate-800 ml-1">
                    {tool.rating.toFixed(1)}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400">
                  • Nota Vetor: <strong className="text-emerald-700">{tool.vetorScore}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-col items-end gap-1">
            {tool.isVerifiedByVetor && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1 shadow-sm">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                Verificado
              </span>
            )}
            {tool.isSponsored && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 flex items-center gap-1 shadow-sm">
                <Sparkles className="w-3 h-3 text-amber-600" />
                Patrocinado
              </span>
            )}
          </div>
        </div>

        {/* Title and Short Description */}
        <div className="space-y-1.5 pt-1">
          <Link href={`/diretorio/${tool.slug}`}>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors flex items-center justify-between">
              <span>{tool.name}</span>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-600" />
            </h3>
          </Link>
          <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
            {tool.shortDesc}
          </p>
        </div>

        {/* Pros Highlight */}
        <div className="space-y-1.5 pt-2 border-t border-slate-100">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Destaques Comprovados
          </span>
          <ul className="space-y-1">
            {tool.pros.slice(0, 2).map((pro, idx) => (
              <li
                key={idx}
                className="text-xs text-slate-700 flex items-start gap-1.5 line-clamp-1"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Niches & Integrations Chips */}
        <div className="flex flex-wrap gap-1 pt-2">
          {tool.nicheLabels?.slice(0, 2).map((niche, idx) => (
            <span
              key={idx}
              className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700"
            >
              {niche}
            </span>
          ))}
          {tool.integrations?.slice(0, 2).map((integ, idx) => (
            <span
              key={idx}
              className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-cyan-50 text-cyan-800 border border-cyan-100"
            >
              {integ.name}
            </span>
          ))}
        </div>

        {/* ROI / Savings Highlight Bar */}
        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-700">
            <Clock className="w-3.5 h-3.5 text-emerald-600" />
            <span>Poupe <strong>~{tool.estimatedMonthlyHoursSaved}h</strong>/mês</span>
          </div>
          <div className="text-xs font-bold text-emerald-700 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            +R$ {tool.estimatedMonthlySavings.toLocaleString("pt-BR")}/mês
          </div>
        </div>

        {/* Coupon Banner if Available */}
        {tool.couponDiscount && (
          <div className="px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-100 text-[11px] text-indigo-800 flex items-center justify-between">
            <span className="flex items-center gap-1 font-medium">
              <Tag className="w-3 h-3 text-indigo-600" />
              Cupom Exclusivo:
            </span>
            <code className="font-mono font-bold bg-white px-1.5 py-0.5 rounded border border-indigo-200 text-indigo-900">
              {tool.couponCode}
            </code>
          </div>
        )}
      </div>

      {/* Footer / CTA Buttons */}
      <div className="pt-5 mt-5 border-t border-slate-100 space-y-3">
        <div className="flex items-baseline justify-between">
          <span className="text-xs text-slate-500">Investimento Estimado:</span>
          <span className="text-base font-extrabold text-slate-900">
            {tool.startingPrice || "Sob Consulta"}{" "}
            <span className="text-xs font-normal text-slate-500">
              {tool.pricingPeriod || ""}
            </span>
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Link href={`/diretorio/${tool.slug}`} className="w-full">
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs font-semibold flex items-center justify-center gap-1"
            >
              Ver Detalhes
            </Button>
          </Link>
          {onOpenImplementationModal ? (
            <Button
              variant="primary"
              size="sm"
              onClick={() => onOpenImplementationModal(tool)}
              className="w-full text-xs font-bold flex items-center justify-center gap-1 shadow-md shadow-emerald-500/20"
            >
              Implementar
            </Button>
          ) : (
            <Link href={`/diretorio/${tool.slug}`} className="w-full">
              <Button
                variant="primary"
                size="sm"
                className="w-full text-xs font-bold flex items-center justify-center gap-1"
              >
                Implementar
              </Button>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};
