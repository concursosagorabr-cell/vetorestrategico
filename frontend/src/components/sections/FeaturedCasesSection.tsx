"use client";

import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ArrowRight, ExternalLink, Globe } from "lucide-react";
import { motion } from "framer-motion";

export const FeaturedCasesSection: React.FC = () => {
  const showcaseProjects = [
    {
      caseId: "case-marcos-pintura",
      name: "MARCOS PINTURAS SP",
      segment: "SERVIÇOS RESIDENCIAIS",
      url: "marcospintura.com.br",
      fullUrl: "https://www.marcospintura.com.br/",
      title: "Presença Digital Mobile-First com Foco em Captação no WhatsApp",
      highlight: "WhatsApp Direto",
      color: "emerald",
    },
    {
      caseId: "case-concursos-agora",
      name: "CONCURSOS AGORA",
      segment: "PORTAL & EDUCAÇÃO",
      url: "concursosagora.com.br",
      fullUrl: "https://concursosagora.com.br/",
      title: "Portal de Notícias com Arquitetura de Alto Desempenho e Silos de SEO",
      highlight: "Silos de SEO",
      color: "sky",
    },
    {
      caseId: "case-valore-gestao",
      name: "VALORE GESTÃO",
      segment: "CONSULTORIA B2B",
      url: "valoregestao.com.br",
      fullUrl: "https://valoregestao.com.br",
      title: "Plataforma Institucional Corporativa & Qualificação de Contatos",
      highlight: "Posicionamento B2B",
      color: "gold",
    },
    {
      caseId: "case-odontoprime",
      name: "ODONTOPRIME",
      segment: "SAÚDE & CLÍNICAS",
      url: "odontoprime.com.br",
      fullUrl: "https://odontoprime.com.br",
      title: "Página Institucional & Triagem Automatizada no WhatsApp",
      highlight: "Triagem 24/7",
      color: "emerald",
    },
  ];

  return (
    <section className="py-20 bg-slate-50/50 border-y border-slate-200/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="space-y-3 max-w-3xl">
            <Badge variant="cyan" size="md" className="text-xs sm:text-sm font-black uppercase tracking-widest">
              ✦ Projetos Reais &bull; Aplicação Prática
            </Badge>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 uppercase leading-[1.08]">
              Engenharia Web Desenvolvida Para Empresas
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 font-normal leading-relaxed">
              Projetos sob medida com código limpo, carregamento veloz e foco na rotina comercial de cada segmento.
            </p>
          </div>

          <div className="mt-6 md:mt-0">
            <Button href="/cases" variant="outline" size="lg" className="rounded-full px-6 font-bold" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Ver Todos os Projetos
            </Button>
          </div>
        </div>

        {/* Browser Mockup Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {showcaseProjects.map((proj, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1.5"
            >
              <div>
                {/* Browser Top Bar */}
                <div className="bg-slate-100/80 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <a
                    href={proj.fullUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-mono text-slate-500 hover:text-emerald-600 truncate max-w-[150px] flex items-center gap-1 transition-colors"
                    title={`Visitar ${proj.url}`}
                  >
                    <span>{proj.url}</span>
                    <ExternalLink className="w-2.5 h-2.5 shrink-0 opacity-60" />
                  </a>
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                </div>

                {/* Simulated Screen Preview Box */}
                <div className="p-6 space-y-4">
                  
                  {/* Segment Badge */}
                  <span className={`inline-block text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider ${
                    proj.color === "emerald"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : proj.color === "gold"
                      ? "bg-amber-50 text-amber-800 border border-amber-200"
                      : "bg-sky-50 text-sky-700 border border-sky-200"
                  }`}>
                    {proj.segment}
                  </span>

                  {/* Title & Client */}
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight group-hover:text-emerald-600 transition-colors">
                      {proj.name}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-normal line-clamp-2">
                      {proj.title}
                    </p>
                  </div>

                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="px-5 py-3.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                    Destaque Técnico:
                  </span>
                  <span className="text-xs sm:text-sm font-black text-emerald-600">
                    {proj.highlight}
                  </span>
                </div>
                <Link
                  href={`/cases`}
                  className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 transition-all shadow-xs"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
