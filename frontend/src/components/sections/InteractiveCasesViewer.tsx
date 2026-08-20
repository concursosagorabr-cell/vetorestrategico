"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CaseStudy } from "@/types";
import {
  CheckCircle2,
  TrendingUp,
  Globe,
  ExternalLink,
  ArrowRight,
  Sparkles,
  Quote,
  Layers,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface InteractiveCasesViewerProps {
  cases: CaseStudy[];
}

export const InteractiveCasesViewer: React.FC<InteractiveCasesViewerProps> = ({ cases }) => {
  const searchParams = useSearchParams();
  const initialCaseParam = searchParams.get("case");

  // Selected Segment Filter
  const [selectedSegment, setSelectedSegment] = useState<string>("todos");

  // Selected Active Case ID
  const [activeCaseId, setActiveCaseId] = useState<string>(() => {
    if (initialCaseParam) {
      const match = cases.find((c) => c.id === initialCaseParam || c.slug === initialCaseParam);
      if (match) return match.id;
    }
    return cases[0]?.id || "";
  });

  // Listen to searchParams changes
  useEffect(() => {
    if (initialCaseParam) {
      const match = cases.find((c) => c.id === initialCaseParam || c.slug === initialCaseParam);
      if (match) {
        setActiveCaseId(match.id);
      }
    }
  }, [initialCaseParam, cases]);

  // Available Segments
  const segments = useMemo(() => {
    const set = new Set<string>();
    cases.forEach((c) => set.add(c.segment));
    return ["todos", ...Array.from(set)];
  }, [cases]);

  // Filtered cases list based on segment
  const filteredCases = useMemo(() => {
    if (selectedSegment === "todos") return cases;
    return cases.filter((c) => c.segment === selectedSegment);
  }, [cases, selectedSegment]);

  // Ensure active case is visible or default to first filtered
  useEffect(() => {
    const isCurrentActiveInFilter = filteredCases.some((c) => c.id === activeCaseId);
    if (!isCurrentActiveInFilter && filteredCases.length > 0) {
      setActiveCaseId(filteredCases[0].id);
    }
  }, [filteredCases, activeCaseId]);

  // Current active case data
  const currentCase = cases.find((c) => c.id === activeCaseId) || cases[0];

  return (
    <div className="space-y-10">
      
      {/* 1. Category / Segment Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
        {segments.map((seg) => (
          <button
            key={seg}
            type="button"
            onClick={() => setSelectedSegment(seg)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
              selectedSegment === seg
                ? "bg-slate-900 text-white shadow-md scale-105"
                : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
            }`}
          >
            {seg === "todos" ? "✦ Todos os Cases" : seg}
          </button>
        ))}
      </div>

      {/* 2. Client Switcher Grid / Cards Carousel */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {filteredCases.map((c) => {
          const isActive = c.id === currentCase.id;
          const topMetric = c.metrics.find((m) => m.highlight) || c.metrics[0];

          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveCaseId(c.id)}
              className={`p-3.5 rounded-2xl text-left border-2 transition-all duration-200 flex flex-col justify-between group cursor-pointer relative overflow-hidden ${
                isActive
                  ? "bg-emerald-50/90 border-emerald-500 shadow-lg shadow-emerald-500/10 scale-[1.02] ring-2 ring-emerald-500/20"
                  : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 shadow-xs"
              }`}
            >
              {isActive && (
                <div className="absolute top-0 right-0 w-8 h-8 bg-emerald-500/10 rounded-bl-xl flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
              )}

              <div className="space-y-1">
                <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400 block truncate">
                  {c.segment}
                </span>
                <div className={`text-xs sm:text-sm font-black truncate ${isActive ? "text-emerald-800" : "text-slate-800 group-hover:text-emerald-700"}`}>
                  {c.clientName}
                </div>
              </div>

              <div className="pt-2.5 mt-2 border-t border-slate-100/80 flex items-center justify-between">
                <span className="text-[11px] font-black text-emerald-600">
                  {topMetric?.value}
                </span>
                <span className="text-[9px] text-slate-400 font-medium">
                  {topMetric?.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. DYNAMIC SPOTLIGHT CASE DETAIL VIEWER */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentCase.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25 }}
          className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-10 lg:p-12 shadow-xl hover:shadow-2xl transition-shadow relative overflow-hidden"
        >
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10">
            
            {/* Left Column: Full Case Story & Results */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Header Badges & Live Website Link */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="text-base sm:text-lg font-black text-slate-900">
                    {currentCase.clientName}
                  </span>
                  <Badge variant="emerald" size="sm" className="font-bold">
                    {currentCase.segment}
                  </Badge>
                </div>

                {currentCase.websiteUrl && (
                  <a
                    href={currentCase.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200 transition-colors"
                  >
                    <Globe className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Visitar Site Oficial</span>
                    <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
                  </a>
                )}
              </div>

              {/* Dynamic Project Title */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                {currentCase.tagline}
              </h2>

              {/* Challenge & Developed Solution */}
              <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <strong className="text-slate-900 font-black flex items-center gap-1.5 text-xs uppercase tracking-wider">
                    <span>🔴 O Desafio do Cliente:</span>
                  </strong>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {currentCase.challenge}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/60 space-y-1">
                  <strong className="text-emerald-900 font-black flex items-center gap-1.5 text-xs uppercase tracking-wider">
                    <span>🟢 A Solução Desenvolvida:</span>
                  </strong>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {currentCase.solution}
                  </p>
                </div>
              </div>

              {/* Audited Impacts Checklist */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>Principais Impactos Auditados:</span>
                </h4>
                <div className="space-y-2.5">
                  {currentCase.results.map((res, rIdx) => (
                    <div key={rIdx} className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span>{res}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Client Testimonial Quote */}
              {currentCase.testimonial && (
                <div className="p-5 rounded-2xl bg-sky-50/70 border border-sky-200/80 text-sm italic text-slate-700 relative">
                  <Quote className="w-6 h-6 text-sky-400/40 absolute top-3 right-3" />
                  <p className="leading-relaxed">&ldquo;{currentCase.testimonial.quote}&rdquo;</p>
                  <div className="mt-3 not-italic font-bold text-slate-900 text-xs">
                    — {currentCase.testimonial.author},{" "}
                    <span className="text-sky-700 font-semibold">{currentCase.testimonial.role}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Big Dynamic Metrics & Action Card */}
            <div className="lg:col-span-5 rounded-3xl bg-slate-50 border border-slate-200 p-6 sm:p-8 space-y-6">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <span className="text-xs font-black uppercase tracking-wider text-slate-700">
                  Destaques Técnicos &amp; Operacionais
                </span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Escopo Entregue
                </span>
              </div>

              {/* Metrics Grid */}
              <div className="space-y-3">
                {currentCase.metrics.map((m, mIdx) => (
                  <div
                    key={mIdx}
                    className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between group hover:border-emerald-300 transition-colors"
                  >
                    <span className="text-xs sm:text-sm text-slate-600 font-semibold">
                      {m.label}
                    </span>
                    <span className={`text-xl sm:text-2xl font-black ${m.highlight ? "text-emerald-600" : "text-slate-900"}`}>
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Tech Stack */}
              <div className="pt-4 border-t border-slate-200 space-y-2.5">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Tecnologias &amp; Entregáveis:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentCase.technologies.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-xs px-3 py-1 rounded-full bg-white text-slate-800 border border-slate-200 font-semibold shadow-xs"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action CTA */}
              <div className="pt-2">
                <Button
                  href={`/orcamento?case=${encodeURIComponent(currentCase.clientName)}`}
                  variant="primary"
                  size="lg"
                  className="w-full justify-center text-sm sm:text-base font-black py-4 rounded-full shadow-lg shadow-emerald-600/20"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Solicitar Proposta para Minha Empresa
                </Button>
              </div>

            </div>

          </div>
        </motion.div>
      </AnimatePresence>

    </div>
  );
};
