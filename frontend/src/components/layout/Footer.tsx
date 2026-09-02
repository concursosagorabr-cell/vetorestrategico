"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { COMPANY_INFO, NAV_LINKS, SERVICES } from "@/lib/constants";
import {
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  ArrowUpRight,
  Sparkles,
  ArrowRight,
  Lock,
  Zap,
  MessageCircle,
} from "lucide-react";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-300 relative overflow-hidden">
      {/* Top Accent Gradient Border */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-emerald-500/50 via-cyan-500/40 to-transparent" />

      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-96 h-48 bg-emerald-500/10 blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-1/4 translate-x-1/2 w-96 h-48 bg-cyan-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-28 sm:pb-16">
        
        {/* Pre-Footer Action Banner / Frame */}
        <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800/90 shadow-2xl relative overflow-hidden backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-cyan-500/5 pointer-events-none" />
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Engenharia Web &amp; Automação Prática
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Pronto para acelerar a presença digital e eficiência da sua empresa?
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
                Sites ultrarrápidos para o Google e agentes de atendimento no WhatsApp 24/7 sob medida para a sua operação.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/orcamento"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/25 transition-all duration-200 hover:scale-[1.02] active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-emerald-200" />
                Simulador de Orçamento
              </Link>
              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-slate-100 hover:text-white border border-slate-700/80 font-bold text-xs sm:text-sm transition-all duration-200 hover:scale-[1.02] active:scale-95"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                Falar no WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Main 12-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 pb-12 border-b border-slate-800/80">
          
          {/* Col 1: Brand & Bio & Direct Contact Cards (Span 4) */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-xl bg-slate-900 border border-slate-700/80 p-1 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform overflow-hidden">
                <Image
                  src="/logo.png"
                  alt="Logo Vetor Estratégico"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                VETOR<span className="text-emerald-400">ESTRATÉGICO</span>
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Desenvolvimento de sites profissionais de alto desempenho e automações inteligentes para empresas que buscam captação de clientes e eficiência operacional.
            </p>

            {/* Direct Contact Badges */}
            <div className="space-y-2.5 text-xs text-slate-300">
              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/40 hover:bg-slate-900 transition-all group"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-400 group-hover:scale-105 transition-transform">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1.5">
                    WhatsApp Comercial <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                  </span>
                  <span className="font-semibold text-slate-200 group-hover:text-white truncate">
                    {COMPANY_INFO.phone}
                  </span>
                </div>
              </a>

              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/40 hover:bg-slate-900 transition-all group"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-400 group-hover:scale-105 transition-transform">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] uppercase font-bold text-slate-400">
                    E-mail Institucional
                  </span>
                  <span className="font-semibold text-slate-200 group-hover:text-white truncate">
                    {COMPANY_INFO.email}
                  </span>
                </div>
              </a>

              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-900/40 border border-slate-800/60">
                <div className="w-7 h-7 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0 text-sky-400">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] uppercase font-bold text-slate-400">
                    Atuação
                  </span>
                  <span className="font-medium text-slate-300 text-[11px] truncate">
                    {COMPANY_INFO.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Trust and Compliance Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                Conformidade com a LGPD
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-900 text-slate-300 border border-slate-800">
                <Lock className="w-3 h-3 text-sky-400 shrink-0" />
                SSL 256-bit Seguro
              </span>
            </div>
          </div>

          {/* Col 2: Serviços de IA (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full bg-emerald-400" />
              Serviços de IA
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {SERVICES.map((srv) => (
                <li key={srv.id}>
                  <Link
                    href={`/servicos#${srv.id}`}
                    className="hover:text-emerald-400 hover:translate-x-1 transition-all duration-150 inline-flex items-center gap-1.5 group"
                  >
                    <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-emerald-400 transition-colors shrink-0" />
                    <span>{srv.title.replace("Automação de ", "").replace(" & Treinamento de Equipe em IA", "")}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Soluções por Nicho (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full bg-cyan-400" />
              Por Nicho
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/sites-para-estetica" className="hover:text-emerald-300 hover:translate-x-1 transition-all duration-150 inline-flex items-center gap-1.5 text-emerald-400 font-semibold group">
                  <span className="text-[10px]">✦</span> Clínicas de Estética
                </Link>
              </li>
              <li>
                <Link href="/sites-para-odontologia" className="hover:text-sky-300 hover:translate-x-1 transition-all duration-150 inline-flex items-center gap-1.5 text-sky-400 font-semibold group">
                  <span className="text-[10px]">✦</span> Consultórios Odonto
                </Link>
              </li>
              <li>
                <Link href="/sites-para-clinicas" className="hover:text-teal-300 hover:translate-x-1 transition-all duration-150 inline-flex items-center gap-1.5 text-teal-400 font-medium group">
                  <span className="text-[10px]">✦</span> Clínicas &amp; Médicos
                </Link>
              </li>
              <li>
                <Link href="/sites-para-ecommerce" className="hover:text-amber-300 hover:translate-x-1 transition-all duration-150 inline-flex items-center gap-1.5 text-amber-400 font-medium group">
                  <span className="text-[10px]">✦</span> E-commerce &amp; Varejo
                </Link>
              </li>
              <li>
                <Link href="/sites-para-advocacia" className="hover:text-indigo-300 hover:translate-x-1 transition-all duration-150 inline-flex items-center gap-1.5 text-indigo-400 font-medium group">
                  <span className="text-[10px]">✦</span> Advocacia &amp; Jurídico
                </Link>
              </li>
              <li>
                <Link href="/sites-para-contabilidade" className="hover:text-emerald-200 hover:translate-x-1 transition-all duration-150 inline-flex items-center gap-1.5 text-emerald-300 font-medium group">
                  <span className="text-[10px]">✦</span> Contabilidade &amp; Fiscal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Diretório de IA (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-emerald-400" />
                Diretório IA
              </h4>
              <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Novo
              </span>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/diretorio" className="text-emerald-400 font-bold hover:text-emerald-300 hover:translate-x-1 transition-all duration-150 inline-flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  Catálogo Geral
                </Link>
              </li>
              <li>
                <Link href="/diretorio?categoria=whatsapp-atendimento" className="hover:text-white hover:translate-x-1 transition-all duration-150 inline-flex items-center gap-1.5 group">
                  <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-emerald-400 transition-colors shrink-0" />
                  Robôs de WhatsApp
                </Link>
              </li>
              <li>
                <Link href="/diretorio?categoria=automacao-processos-rpa" className="hover:text-white hover:translate-x-1 transition-all duration-150 inline-flex items-center gap-1.5 group">
                  <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-emerald-400 transition-colors shrink-0" />
                  Automação RPA
                </Link>
              </li>
              <li>
                <Link href="/diretorio?categoria=agendamento-consultas" className="hover:text-white hover:translate-x-1 transition-all duration-150 inline-flex items-center gap-1.5 group">
                  <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-emerald-400 transition-colors shrink-0" />
                  Agendamento &amp; Recall
                </Link>
              </li>
              <li className="pt-1">
                <Link href="/diretorio/cadastrar" className="text-amber-400 font-semibold hover:text-amber-300 hover:translate-x-1 transition-all duration-150 inline-flex items-center gap-1">
                  <span>+</span> Cadastrar Solução
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Institucional & Ações (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full bg-slate-400" />
              Institucional
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/orcamento" className="text-emerald-400 font-bold hover:text-emerald-300 hover:translate-x-1 transition-all duration-150 inline-flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  Simulador de Orçamento
                </Link>
              </li>
              <li>
                <Link href="/diagnostico" className="text-amber-400 font-semibold hover:text-amber-300 hover:translate-x-1 transition-all duration-150 inline-flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 shrink-0" />
                  Diagnóstico Rápido IA
                </Link>
              </li>
              {NAV_LINKS.map((link: any) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white hover:translate-x-1 transition-all duration-150 inline-flex items-center gap-1.5 group">
                    <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-emerald-400 transition-colors shrink-0" />
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/politica-de-privacidade" className="hover:text-slate-200 hover:translate-x-1 transition-all duration-150 inline-flex items-center gap-1.5 group text-slate-500">
                  <ArrowRight className="w-3 h-3 text-slate-700 group-hover:text-slate-400 transition-colors shrink-0" />
                  Privacidade &amp; LGPD
                </Link>
              </li>
              <li>
                <Link href="/termos-de-uso" className="hover:text-slate-200 hover:translate-x-1 transition-all duration-150 inline-flex items-center gap-1.5 group text-slate-500">
                  <ArrowRight className="w-3 h-3 text-slate-700 group-hover:text-slate-400 transition-colors shrink-0" />
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Sub-Footer / Bottom Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="text-center sm:text-left space-y-1">
            <p>
              &copy; {currentYear} {COMPANY_INFO.name}. Todos os direitos reservados.
              {COMPANY_INFO.cnpjPlaceholder ? ` • CNPJ: ${COMPANY_INFO.cnpjPlaceholder}` : ""}
            </p>
            <p className="text-[11px] text-slate-600">
              Desenvolvido com Engenharia Web de Alta Performance &amp; Inteligência Artificial.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors cursor-pointer"
              aria-label="Voltar ao topo da página"
            >
              Voltar ao topo <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
