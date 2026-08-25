"use client";

import React from "react";
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  X,
  Sparkles,
  ArrowUpDown,
  Filter,
} from "lucide-react";
import {
  DIRECTORY_CATEGORIES,
  DIRECTORY_NICHES,
  DIRECTORY_PRICING_FILTERS,
} from "@/lib/directoryData";
import { ToolCategory, ToolNiche, ToolPricingType } from "@/types";

interface DirectorySearchFilterProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedNiche: ToolNiche | "all";
  onNicheChange: (n: ToolNiche | "all") => void;
  selectedCategory: ToolCategory | "all";
  onCategoryChange: (c: ToolCategory | "all") => void;
  selectedPricing: ToolPricingType | "all";
  onPricingChange: (p: ToolPricingType | "all") => void;
  sortBy: "recommended" | "rating" | "savings" | "name";
  onSortChange: (s: "recommended" | "rating" | "savings" | "name") => void;
  viewMode: "grid" | "list";
  onViewModeChange: (m: "grid" | "list") => void;
  totalResults: number;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
}

export const DirectorySearchFilter: React.FC<DirectorySearchFilterProps> = ({
  searchQuery,
  onSearchChange,
  selectedNiche,
  onNicheChange,
  selectedCategory,
  onCategoryChange,
  selectedPricing,
  onPricingChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  totalResults,
  onResetFilters,
  hasActiveFilters,
}) => {
  return (
    <div className="space-y-6">
      {/* Top Search Bar & View/Sort Controls */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-md space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar por ferramenta, nicho, recurso ou integração (ex: WhatsApp, Clínicas, OAB, Pix, Make)..."
              className="w-full pl-10 pr-10 py-3 rounded-2xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all shadow-inner bg-slate-50/50"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full"
                aria-label="Limpar busca"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 md:w-56">
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value as any)}
                aria-label="Ordenar ferramentas"
                className="w-full px-3.5 py-3 rounded-2xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none cursor-pointer pr-9"
              >
                <option value="recommended">⭐ Destaques & Nota Vetor</option>
                <option value="rating">🌟 Mais Bem Avaliados</option>
                <option value="savings">💰 Maior Economia / ROI</option>
                <option value="name">🔤 Ordem Alfabética</option>
              </select>
              <ArrowUpDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200 shrink-0">
              <button
                onClick={() => onViewModeChange("grid")}
                className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all ${
                  viewMode === "grid"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
                title="Visualização em Grade"
                aria-label="Visualização em Grade"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => onViewModeChange("list")}
                className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all ${
                  viewMode === "list"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
                title="Visualização em Lista"
                aria-label="Visualização em Lista"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Niche Navigation Pills (The Filter Gap Solution) */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between gap-2 pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-emerald-600" />
              Filtrar por Nicho / Segmento
            </span>
            {hasActiveFilters && (
              <button
                onClick={onResetFilters}
                className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1 hover:underline"
              >
                <X className="w-3.5 h-3.5" />
                Limpar Todos os Filtros
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
            <button
              onClick={() => onNicheChange("all")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedNiche === "all"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20 scale-105"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Todos os Nichos
            </button>
            {DIRECTORY_NICHES.filter((n) => n.id !== "geral").map((niche) => (
              <button
                key={niche.id}
                onClick={() => onNicheChange(niche.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedNiche === niche.id
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20 scale-105"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {niche.label}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Chips */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-1.5">
            Objetivo:
          </span>
          <button
            onClick={() => onCategoryChange("all")}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
              selectedCategory === "all"
                ? "bg-slate-900 text-white font-bold"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Todas as Categorias
          </button>
          {DIRECTORY_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                selectedCategory === cat.id
                  ? "bg-slate-900 text-white font-bold"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Pricing filter row */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-1.5">
              Investimento:
            </span>
            <button
              onClick={() => onPricingChange("all")}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                selectedPricing === "all"
                  ? "bg-emerald-100 text-emerald-900 font-bold border border-emerald-300"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Todos os Preços
            </button>
            {DIRECTORY_PRICING_FILTERS.map((pf) => (
              <button
                key={pf.id}
                onClick={() => onPricingChange(pf.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                  selectedPricing === pf.id
                    ? "bg-emerald-100 text-emerald-900 font-bold border border-emerald-300"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {pf.label}
              </button>
            ))}
          </div>

          <div className="text-xs font-semibold text-slate-500">
            Mostrando <strong className="text-slate-900">{totalResults}</strong> soluções encontradas
          </div>
        </div>
      </div>
    </div>
  );
};
