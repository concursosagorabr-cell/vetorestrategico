"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Sparkles,
  ShieldCheck,
  Zap,
  ArrowRight,
  TrendingUp,
  Award,
  Layers,
  PlusCircle,
  Clock,
  HelpCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  DIRECTORY_TOOLS,
  DIRECTORY_CATEGORIES,
  DIRECTORY_NICHES,
} from "@/lib/directoryData";
import { DirectorySearchFilter } from "@/components/directory/DirectorySearchFilter";
import { DirectoryToolCard } from "@/components/directory/DirectoryToolCard";
import { ToolImplementationModal } from "@/components/directory/ToolImplementationModal";
import { DirectoryTool, ToolCategory, ToolNiche, ToolPricingType } from "@/types";

export const DirectoryHubClient: React.FC = () => {
  const searchParams = useSearchParams();
  const initialNiche = (searchParams.get("nicho") as ToolNiche) || "all";
  const initialCategory = (searchParams.get("categoria") as ToolCategory) || "all";
  const initialQuery = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedNiche, setSelectedNiche] = useState<ToolNiche | "all">(initialNiche);
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | "all">(initialCategory);
  const [selectedPricing, setSelectedPricing] = useState<ToolPricingType | "all">("all");
  const [sortBy, setSortBy] = useState<"recommended" | "rating" | "savings" | "name">("recommended");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const [selectedToolForModal, setSelectedToolForModal] = useState<DirectoryTool | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sync URL search params if changed from outside
  useEffect(() => {
    const nicheParam = searchParams.get("nicho") as ToolNiche;
    if (nicheParam && DIRECTORY_NICHES.some((n) => n.id === nicheParam)) {
      setSelectedNiche(nicheParam);
    }
    const catParam = searchParams.get("categoria") as ToolCategory;
    if (catParam && DIRECTORY_CATEGORIES.some((c) => c.id === catParam)) {
      setSelectedCategory(catParam);
    }
  }, [searchParams]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedNiche("all");
    setSelectedCategory("all");
    setSelectedPricing("all");
    setSortBy("recommended");
  };

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedNiche !== "all" ||
    selectedCategory !== "all" ||
    selectedPricing !== "all";

  // Filter & Sort Logic
  const filteredTools = useMemo(() => {
    let result = [...DIRECTORY_TOOLS];

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.shortDesc.toLowerCase().includes(q) ||
          t.tagline.toLowerCase().includes(q) ||
          t.categoryLabel.toLowerCase().includes(q) ||
          t.nicheLabels.some((n) => n.toLowerCase().includes(q)) ||
          t.integrations.some((i) => i.name.toLowerCase().includes(q)) ||
          t.keyFeatures.some((k) => k.toLowerCase().includes(q))
      );
    }

    // Filter by Niche
    if (selectedNiche !== "all") {
      result = result.filter(
        (t) => t.niches.includes(selectedNiche) || t.niches.includes("geral")
      );
    }

    // Filter by Category
    if (selectedCategory !== "all") {
      result = result.filter((t) => t.category === selectedCategory);
    }

    // Filter by Pricing
    if (selectedPricing !== "all") {
      result = result.filter((t) => t.pricingType === selectedPricing);
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === "recommended") {
        // Prioritize sponsored/featured then highest vetor score
        if (a.isSponsored && !b.isSponsored) return -1;
        if (!a.isSponsored && b.isSponsored) return 1;
        return b.vetorScore - a.vetorScore;
      }
      if (sortBy === "rating") {
        return b.rating - a.rating;
      }
      if (sortBy === "savings") {
        return b.estimatedMonthlySavings - a.estimatedMonthlySavings;
      }
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

    return result;
  }, [searchQuery, selectedNiche, selectedCategory, selectedPricing, sortBy]);

  const handleOpenModal = (tool: DirectoryTool) => {
    setSelectedToolForModal(tool);
    setIsModalOpen(true);
  };

  return (
    <div className="py-12 sm:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Hero Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2">
            <Badge variant="emerald" size="md">
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              Diretório Oficial de IA para PMEs
            </Badge>
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              {DIRECTORY_TOOLS.length} Soluções Auditadas
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-text-primary tracking-tight">
            Encontre a Ferramenta de IA Perfeita para o{" "}
            <span className="gradient-text-emerald">Seu Negócio</span>
          </h1>

          <p className="text-sm sm:text-lg text-text-secondary leading-relaxed max-w-3xl mx-auto">
            O primeiro catálogo brasileiro com curadoria técnica independente, comparativo de custos, cálculo de ROI e suporte para implementação chave na mão pela equipe da <strong>Vetor Estratégico</strong>.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link href="/diretorio/cadastrar">
              <Button
                variant="outline"
                size="sm"
                className="text-xs font-bold text-emerald-800 border-emerald-300 hover:bg-emerald-50 flex items-center gap-1.5"
              >
                <PlusCircle className="w-4 h-4 text-emerald-600" />
                Cadastre sua Solução ou Ferramenta
              </Button>
            </Link>
            <Link href="/diagnostico">
              <Button
                variant="outline"
                size="sm"
                className="text-xs font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-1.5"
              >
                <TrendingUp className="w-4 h-4 text-slate-500" />
                Quiz: Qual IA Combina com Minha Empresa?
              </Button>
            </Link>
          </div>
        </div>

        {/* Search & Filter Component */}
        <DirectorySearchFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedNiche={selectedNiche}
          onNicheChange={setSelectedNiche}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedPricing={selectedPricing}
          onPricingChange={setSelectedPricing}
          sortBy={sortBy}
          onSortChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          totalResults={filteredTools.length}
          onResetFilters={handleResetFilters}
          hasActiveFilters={hasActiveFilters}
        />

        {/* Directory Listings */}
        {filteredTools.length > 0 ? (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }
          >
            {filteredTools.map((tool) => (
              <DirectoryToolCard
                key={tool.id}
                tool={tool}
                viewMode={viewMode}
                onOpenImplementationModal={handleOpenModal}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl bg-white border border-slate-200 p-12 text-center shadow-sm space-y-4 max-w-lg mx-auto">
            <div className="w-14 h-14 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center mx-auto">
              <HelpCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Nenhuma ferramenta encontrada
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Tente buscar por termos mais genéricos ou limpe os filtros para visualizar todas as opções do catálogo.
            </p>
            <Button variant="primary" size="sm" onClick={handleResetFilters} className="font-bold">
              Limpar Filtros e Ver Tudo
            </Button>
          </div>
        )}

        {/* Partnership & Directory Submission Banner (Chris Koerner monetization prong) */}
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950 border border-emerald-500/30 p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center justify-center md:justify-start gap-1.5">
              <Award className="w-4 h-4" />
              Para Criadores de Software & Empresas de IA
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Desenvolveu uma Ferramenta de IA ou Automação?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Exponha sua solução para milhares de empresários, clínicas, escritórios de advocacia e gestores que visitam nosso diretório todos os meses em busca de eficiência.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <Link href="/diretorio/cadastrar" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="md"
                className="w-full font-bold shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
              >
                Cadastrar Minha Ferramenta
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* FAQ Section for Directory */}
        <div className="space-y-6 pt-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Perguntas Frequentes sobre o Diretório
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Tudo o que você precisa saber sobre a curadoria, implementação e segurança das ferramentas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-sm">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Como a Vetor avalia as ferramentas listadas?
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Avaliamos 5 pilares: velocidade de resposta, facilidade de uso pela equipe, qualidade do suporte no Brasil, conformidade com a LGPD e relação custo-benefício para pequenas empresas.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-sm">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-600" />
                Posso contratar a Vetor para implementar uma ferramenta?
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Sim! Em qualquer ferramenta listada, você pode clicar em &quot;Implementar&quot; para que nossa equipe cuide de toda a parametrização, integrações com seu CRM/WhatsApp e treinamento da equipe.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-sm">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600" />
                Quanto tempo leva uma implementação padrão?
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                A maioria das soluções é implementada e entra em produção entre 48 horas e 5 dias úteis, com acompanhamento técnico contínuo.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-sm">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-600" />
                Como funcionam os cupons de desconto?
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Negociamos parcerias diretas com os fundadores e plataformas para oferecer descontos exclusivos ou períodos estendidos de teste gratuito para os clientes da Vetor.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Lead Capture Implementation Modal */}
      <ToolImplementationModal
        tool={selectedToolForModal}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
