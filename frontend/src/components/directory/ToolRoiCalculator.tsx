"use client";

import React, { useState } from "react";
import { Calculator, Sparkles, TrendingUp, Clock, DollarSign, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DirectoryTool } from "@/types";

interface ToolRoiCalculatorProps {
  tool: DirectoryTool;
  onOpenImplementationModal?: () => void;
}

export const ToolRoiCalculator: React.FC<ToolRoiCalculatorProps> = ({
  tool,
  onOpenImplementationModal,
}) => {
  const [teamSize, setTeamSize] = useState<number>(3);
  const [hourlyRate, setHourlyRate] = useState<number>(45); // R$ 45/hora média
  const [efficiencyGain, setEfficiencyGain] = useState<number>(35); // 35% de ganho de tempo

  // Cálculos baseados nos parâmetros e na ferramenta
  const baseHoursPerMonth = 160; // 160h mês por funcionário
  const totalTeamHours = teamSize * baseHoursPerMonth;
  const estimatedHoursSaved = Math.round(totalTeamHours * (efficiencyGain / 100) * 0.4);
  const estimatedMonthlyEconomy = Math.round(estimatedHoursSaved * hourlyRate);
  const toolCostMonthly = tool.startingPrice ? parseInt(tool.startingPrice.replace(/[^0-9]/g, ""), 10) || 350 : 350;
  const netMonthlyProfit = Math.max(0, estimatedMonthlyEconomy - toolCostMonthly);
  const roiPercentage = Math.round((netMonthlyProfit / Math.max(1, toolCostMonthly)) * 100);

  return (
    <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Simulador de Retorno
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Calculadora de ROI: {tool.name}
              </h3>
            </div>
          </div>
          <span className="text-xs text-slate-400 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700 w-fit">
            Estimativa em Tempo Real
          </span>
        </div>

        {/* Sliders Input Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Slider 1: Tamanho da Equipe */}
          <div className="space-y-2 bg-slate-800/50 p-4 rounded-2xl border border-slate-700/60">
            <div className="flex justify-between items-center text-xs text-slate-300">
              <label htmlFor="team-size-slider" className="font-semibold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                Pessoas na Operação
              </label>
              <span className="font-bold text-emerald-400 text-sm">{teamSize} {teamSize === 1 ? 'pessoa' : 'pessoas'}</span>
            </div>
            <input
              id="team-size-slider"
              type="range"
              min="1"
              max="25"
              step="1"
              value={teamSize}
              onChange={(e) => setTeamSize(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <p className="text-[11px] text-slate-400">Equipe que atende ou executa tarefas manuais</p>
          </div>

          {/* Slider 2: Custo Médio por Hora */}
          <div className="space-y-2 bg-slate-800/50 p-4 rounded-2xl border border-slate-700/60">
            <div className="flex justify-between items-center text-xs text-slate-300">
              <label htmlFor="hourly-rate-slider" className="font-semibold flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-cyan-400" />
                Custo da Hora (R$)
              </label>
              <span className="font-bold text-cyan-400 text-sm">R$ {hourlyRate}/hora</span>
            </div>
            <input
              id="hourly-rate-slider"
              type="range"
              min="20"
              max="150"
              step="5"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
            <p className="text-[11px] text-slate-400">Salário + encargos médios da equipe</p>
          </div>

          {/* Slider 3: Ganho de Produtividade */}
          <div className="space-y-2 bg-slate-800/50 p-4 rounded-2xl border border-slate-700/60">
            <div className="flex justify-between items-center text-xs text-slate-300">
              <label htmlFor="efficiency-gain-slider" className="font-semibold flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                Automação Desejada
              </label>
              <span className="font-bold text-emerald-400 text-sm">{efficiencyGain}%</span>
            </div>
            <input
              id="efficiency-gain-slider"
              type="range"
              min="15"
              max="70"
              step="5"
              value={efficiencyGain}
              onChange={(e) => setEfficiencyGain(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <p className="text-[11px] text-slate-400">% de tarefas repetitivas automatizadas</p>
          </div>
        </div>

        {/* Results Metrics Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-950/80 p-5 rounded-2xl border border-emerald-500/20">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-medium">Horas Poupadas / Mês</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-white flex items-baseline gap-1">
              {estimatedHoursSaved} <span className="text-sm font-normal text-emerald-400">horas/mês</span>
            </div>
            <span className="text-[11px] text-slate-400">~{Math.round(estimatedHoursSaved / 8)} dias úteis de trabalho</span>
          </div>

          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-medium">Economia Financeira Líquida</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 flex items-baseline gap-1">
              R$ {netMonthlyProfit.toLocaleString("pt-BR")} <span className="text-sm font-normal text-slate-400">/mês</span>
            </div>
            <span className="text-[11px] text-slate-400">R$ {(netMonthlyProfit * 12).toLocaleString("pt-BR")} por ano</span>
          </div>

          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-medium">Retorno Estimado (ROI)</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 flex items-baseline gap-1">
              +{roiPercentage}% <span className="text-sm font-normal text-slate-400">de ROI</span>
            </div>
            <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Payback em ~{tool.paybackPeriodDays || 10} dias
            </span>
          </div>
        </div>

        {/* Action Button */}
        {onOpenImplementationModal && (
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-400">
              Quer esta economia na prática? Nós configuramos e integramos a solução na sua empresa.
            </p>
            <Button
              variant="primary"
              size="md"
              onClick={onOpenImplementationModal}
              className="w-full sm:w-auto font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              Solicitar Implementação Desta Ferramenta
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
