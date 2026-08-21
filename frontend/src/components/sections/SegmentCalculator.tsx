"use client";

import React, { useState } from "react";
import { SegmentCalculatorConfig } from "@/lib/segmentsData";
import { formatCurrency } from "@/lib/utils";
import { Sparkles, DollarSign, TrendingUp, AlertTriangle } from "lucide-react";

interface SegmentCalculatorProps {
  config: SegmentCalculatorConfig;
}

const calculateValues = (type: string, v1: number, v2: number) => {
  switch (type) {
    case "advocacia":
      return {
        output1: Math.round(v1 * 2.5),
        output2: Math.round(v1 * 2.5) * v2,
      };
    case "clinicas":
      return {
        output1: Math.round(v1 * 8 * 0.75),
        output2: Math.round(v1 * 8 * 0.75 * v2),
      };
    case "contabilidade": {
      const novos = Math.max(3, Math.round(v1 * 0.08));
      return {
        output1: novos,
        output2: novos * v2 * 12,
      };
    }
    case "ecommerce": {
      const rec = Math.round(v1 * 0.18);
      return {
        output1: Math.round(rec / (v2 || 1)),
        output2: rec,
      };
    }
    case "estetica": {
      const leadsRec = Math.round(v1 * 30 * 0.45);
      return {
        output1: leadsRec,
        output2: Math.round(leadsRec * 0.25 * v2),
      };
    }
    case "odontologia": {
      const avalRec = Math.round(v1 * 6 * 0.4);
      return {
        output1: avalRec,
        output2: Math.round(avalRec * v2),
      };
    }
    default:
      return { output1: v1, output2: v1 * v2 };
  }
};

export const SegmentCalculator: React.FC<SegmentCalculatorProps> = ({ config }) => {
  const [val1, setVal1] = useState(config.slider1.defaultValue);
  const [val2, setVal2] = useState(config.slider2.defaultValue);

  const { output1, output2 } = calculateValues(config.calcType, val1, val2);

  return (
    <div className="relative rounded-3xl bg-slate-950 border border-emerald-500/30 p-6 sm:p-10 lg:p-12 shadow-2xl text-white overflow-hidden">
      {/* Subtle Glow Accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 text-center max-w-3xl mx-auto space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Simulação Interativa de ROI</span>
        </div>
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white uppercase">
          {config.title}
        </h3>
        <p className="text-sm sm:text-base text-slate-300 font-normal">
          {config.subtitle}
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Interactive Range Sliders */}
        <div className="lg:col-span-6 space-y-6 bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
          {/* Slider 1 */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-slate-200">{config.slider1.label}</span>
              <span className="font-black text-emerald-400 text-base">
                {config.slider1.isCurrency ? formatCurrency(val1) : `${val1} ${config.slider1.unit}`}
              </span>
            </div>
            <input
              type="range"
              min={config.slider1.min}
              max={config.slider1.max}
              step={config.slider1.step}
              value={val1}
              onChange={(e) => setVal1(Number(e.target.value))}
              className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer transition-all"
              aria-label={config.slider1.label}
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-medium">
              <span>{config.slider1.isCurrency ? formatCurrency(config.slider1.min) : `${config.slider1.min} ${config.slider1.unit}`}</span>
              <span>{config.slider1.isCurrency ? formatCurrency(config.slider1.max) : `${config.slider1.max} ${config.slider1.unit}`}</span>
            </div>
          </div>

          {/* Slider 2 */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-slate-200">{config.slider2.label}</span>
              <span className="font-black text-sky-400 text-base">
                {config.slider2.isCurrency ? formatCurrency(val2) : `${val2} ${config.slider2.unit}`}
              </span>
            </div>
            <input
              type="range"
              min={config.slider2.min}
              max={config.slider2.max}
              step={config.slider2.step}
              value={val2}
              onChange={(e) => setVal2(Number(e.target.value))}
              className="w-full accent-sky-400 h-2 bg-slate-800 rounded-lg cursor-pointer transition-all"
              aria-label={config.slider2.label}
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-medium">
              <span>{config.slider2.isCurrency ? formatCurrency(config.slider2.min) : `${config.slider2.min} ${config.slider2.unit}`}</span>
              <span>{config.slider2.isCurrency ? formatCurrency(config.slider2.max) : `${config.slider2.max} ${config.slider2.unit}`}</span>
            </div>
          </div>
        </div>

        {/* Right: Calculated Metrics Display */}
        <div className="lg:col-span-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Metric 1 */}
            <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-6 flex flex-col justify-between space-y-3 backdrop-blur-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                {config.output1Label}
              </span>
              <div className="text-3xl sm:text-4xl font-black text-emerald-400">
                {config.output1IsCurrency ? formatCurrency(output1) : output1.toLocaleString("pt-BR")}
                {config.output1Unit && !config.output1IsCurrency && (
                  <span className="text-sm font-normal text-slate-400 ml-1.5">
                    {config.output1Unit}
                  </span>
                )}
              </div>
              <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                Recuperação imediata de demanda
              </span>
            </div>

            {/* Metric 2 */}
            <div className="rounded-2xl bg-sky-500/10 border border-sky-500/30 p-6 flex flex-col justify-between space-y-3 backdrop-blur-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-300">
                {config.output2Label}
              </span>
              <div className="text-3xl sm:text-4xl font-black text-sky-400">
                {config.output2IsCurrency ? formatCurrency(output2) : output2.toLocaleString("pt-BR")}
                {config.output2Unit && !config.output2IsCurrency && (
                  <span className="text-sm font-normal text-slate-400 ml-1.5">
                    {config.output2Unit}
                  </span>
                )}
              </div>
              <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                Impacto direto no resultado
              </span>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-400 flex items-start gap-2.5 leading-relaxed">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>{config.disclaimer}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
