"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Search,
  Zap,
  TrendingUp,
  Cpu,
  Layers,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DIRECTORY_TOOLS, DIRECTORY_NICHES } from "@/lib/directoryData";
import { DirectoryToolCard } from "@/components/directory/DirectoryToolCard";
import { ToolImplementationModal } from "@/components/directory/ToolImplementationModal";
import { DirectoryTool } from "@/types";

export const DirectorySpotlightSection: React.FC = () => {
  const [selectedToolForModal, setSelectedToolForModal] = useState<DirectoryTool | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const featuredTools = DIRECTORY_TOOLS.slice(0, 3);

  const handleOpenModal = (tool: DirectoryTool) => {
    setSelectedToolForModal(tool);
    setIsModalOpen(true);
  };

  return (
    <section className="py-20 sm:py-28 bg-slate-900 text-white relative overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <Badge variant="emerald" size="md">
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              Diretório Nacional de IA & Automação
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              As Melhores Ferramentas de IA para o seu{" "}
              <span className="gradient-text-emerald">Modelo de Negócio</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Pesquise, compare e implemente soluções homologadas de atendimento WhatsApp, agentes autônomos e automação de processos (RPA) para PMEs.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link href="/diretorio">
              <Button
                variant="primary"
                size="md"
                className="w-full sm:w-auto font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                Explorar Todas as Ferramentas
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/diretorio/cadastrar">
              <Button
                variant="outline"
                size="md"
                className="w-full sm:w-auto text-xs font-semibold text-slate-300 border-slate-700 hover:bg-slate-800"
              >
                Cadastre sua Solução
              </Button>
            </Link>
          </div>
        </div>

        {/* Niche Navigation Bar */}
        <div className="bg-slate-800/60 p-4 rounded-3xl border border-slate-700/80 backdrop-blur-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              Navegue por Especialidade de Mercado:
            </span>
            <Link
              href="/diretorio"
              className="text-xs text-slate-400 hover:text-emerald-400 font-medium flex items-center gap-1 transition-colors"
            >
              Ver todos os nichos <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
            {DIRECTORY_NICHES.filter((n) => n.id !== "geral").map((niche) => (
              <Link
                key={niche.id}
                href={`/diretorio?nicho=${niche.id}`}
                className="px-3.5 py-1.5 rounded-xl bg-slate-700/60 hover:bg-emerald-600/20 hover:border-emerald-500/40 border border-slate-600/50 text-xs font-semibold text-slate-200 hover:text-emerald-300 whitespace-nowrap transition-all flex items-center gap-1.5"
              >
                {niche.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredTools.map((tool) => (
            <DirectoryToolCard
              key={tool.id}
              tool={tool}
              onOpenImplementationModal={handleOpenModal}
            />
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-950 border border-emerald-500/30 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center justify-center md:justify-start gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              Garantia Técnica Vetor Estratégico
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Não sabe qual ferramenta escolher para o seu momento?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Nossos arquitetos de automação avaliam seus gargalos atuais e recomendam a combinação exata de sistemas com menor custo e maior retorno financeiro.
            </p>
          </div>

          <Link href="/diagnostico" className="shrink-0 w-full md:w-auto">
            <Button
              variant="primary"
              size="lg"
              className="w-full font-bold shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2"
            >
              Fazer Diagnóstico de IA Gratuito
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

      </div>

      {/* Modal for direct lead capture */}
      <ToolImplementationModal
        tool={selectedToolForModal}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};
