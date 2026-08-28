"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { COMPANY_INFO } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import {
  Menu,
  X,
  Phone,
  Sparkles,
  ArrowRight,
  ChevronDown,
  Sparkle,
  Activity,
  ShoppingBag,
  Scale,
  Calculator,
  Stethoscope,
  Smile,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const NICHE_LINKS = [
  {
    title: "Clínicas de Estética",
    href: "/estetica",
    desc: "Harmonização, Botox, Bioestimuladores & IA",
    icon: Sparkles,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50 border-emerald-200",
    badge: "Alta Procura",
  },
  {
    title: "Consultórios Odonto",
    href: "/odontologia",
    desc: "Implantes, Invisalign & Lentes de Contato",
    icon: Smile,
    color: "text-sky-600",
    bgColor: "bg-sky-50 border-sky-200",
    badge: "Alto Ticket",
  },
  {
    title: "Clínicas & Consultórios",
    href: "/clinicas",
    desc: "Médicos Especialistas & Consultas Particulares",
    icon: Stethoscope,
    color: "text-teal-600",
    bgColor: "bg-teal-50 border-teal-200",
    badge: "CFM / LGPD",
  },
  {
    title: "E-commerce & Varejo",
    href: "/ecommerce",
    desc: "Recuperação de Carrinho & Pix no WhatsApp",
    icon: ShoppingBag,
    color: "text-amber-600",
    bgColor: "bg-amber-50 border-amber-200",
    badge: "+35% Vendas",
  },
  {
    title: "Advocacia & Jurídico",
    href: "/advocacia",
    desc: "Triagem de Casos & Qualificação Ética OAB",
    icon: Scale,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50 border-indigo-200",
    badge: "OAB Ético",
  },
  {
    title: "Contabilidade & Fiscal",
    href: "/contabilidade",
    desc: "Captação de Empresas PJ & Automação Fiscal",
    icon: Calculator,
    color: "text-emerald-700",
    bgColor: "bg-emerald-50 border-emerald-200",
    badge: "Captação PJ",
  },
];

export const NAV_LINKS_BASE = [
  { label: "Serviços", href: "/servicos" },
  { label: "Diretório IA", href: "/diretorio", badge: "Novo" },
  { label: "Portfólio", href: "/cases" },
  { label: "Preços", href: "/planos" },
  { label: "Carreiras", href: "/trabalhe-conosco", badge: "Vagas" },
  { label: "Orçamento", href: "/orcamento" },
  { label: "Sobre", href: "/sobre" },
  { label: "Blog", href: "/blog" },
];

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNichesOpen, setIsNichesOpen] = useState(false);
  const [isMobileNichesOpen, setIsMobileNichesOpen] = useState(true);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on page navigation
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsNichesOpen(false);
  }, [pathname]);

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setIsNichesOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsNichesOpen(false);
    }, 200);
  };

  const isNicheActive = NICHE_LINKS.some(n => pathname === n.href);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs"
          : "bg-white/85 backdrop-blur-xs border-b border-slate-100"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="relative w-11 h-11 rounded-xl bg-slate-950/5 border border-slate-200/80 p-1 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-300 overflow-hidden">
            <Image
              src="/logo.png"
              alt="Logo Vetor Estratégico"
              width={44}
              height={44}
              className="w-full h-full object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 flex items-center gap-1">
              VETOR<span className="text-emerald-600">ESTRATÉGICO</span>
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-slate-500">
              Criação de Sites &amp; IA para PMEs
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
          
          {/* NICHOS INTERACTIVE DROPDOWN */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              className={cn(
                "inline-flex items-center gap-1.5 text-sm xl:text-base font-bold transition-colors duration-200 py-2 group cursor-pointer",
                isNichesOpen || isNicheActive
                  ? "text-emerald-600 font-black"
                  : "text-slate-700 hover:text-slate-950"
              )}
            >
              <span>Nichos</span>
              <ChevronDown
                className={cn(
                  "w-4 h-4 transition-transform duration-200",
                  isNichesOpen ? "rotate-180 text-emerald-600" : "text-slate-400 group-hover:text-slate-600"
                )}
              />
            </button>

            {/* Dropdown Menu Box */}
            <AnimatePresence>
              {isNichesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.18 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 w-[540px] pt-3 z-50 pointer-events-auto"
                >
                  <div className="rounded-2xl bg-white border border-slate-200 shadow-2xl p-4 overflow-hidden space-y-3">
                    
                    <div className="flex items-center justify-between px-2 pb-2 border-b border-slate-100">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Páginas Especializadas de Aquisição
                      </span>
                      <Link
                        href="/servicos"
                        className="text-xs font-bold text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1"
                      >
                        <span>Ver Serviços Gerais</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {NICHE_LINKS.map((niche) => {
                        const Icon = niche.icon;
                        const isCurrent = pathname === niche.href;
                        return (
                          <Link
                            key={niche.href}
                            href={niche.href}
                            className={cn(
                              "p-2.5 rounded-xl border flex items-start gap-3 transition-all duration-150 group",
                              isCurrent
                                ? "bg-emerald-50/70 border-emerald-300"
                                : "bg-white hover:bg-slate-50 border-slate-100 hover:border-slate-300"
                            )}
                          >
                            <div className={cn("w-9 h-9 rounded-lg border flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform", niche.bgColor)}>
                              <Icon className={cn("w-4 h-4", niche.color)} />
                            </div>
                            <div className="space-y-0.5 min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors truncate">
                                  {niche.title}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-500 leading-tight line-clamp-1">
                                {niche.desc}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Standard Navigation Links */}
          {NAV_LINKS_BASE.map((link: any) => {
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm xl:text-base font-bold transition-colors duration-200 relative py-1 inline-flex items-center gap-1",
                  isActive
                    ? "text-emerald-600 font-black"
                    : "text-slate-700 hover:text-slate-950"
                )}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[10px] font-black uppercase px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 tracking-wider">
                    {link.badge}
                  </span>
                )}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Header Right Actions */}
        <div className="hidden lg:flex items-center gap-3 xl:gap-4">
          <a
            href={COMPANY_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs xl:text-sm font-black text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 px-4 py-2 rounded-full transition-all duration-200 shadow-xs"
            title="Atendimento via WhatsApp"
          >
            <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{COMPANY_INFO.phone}</span>
          </a>

          <Button
            href="/orcamento"
            variant="primary"
            size="md"
            className="rounded-full px-6 py-2.5 font-black text-sm xl:text-base shadow-md shadow-emerald-600/25"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Peça um Orçamento
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/diagnostico"
            className="p-2 text-amber-700 bg-amber-50 rounded-lg border border-amber-200"
            aria-label="Diagnóstico de IA"
          >
            <Sparkles className="w-5 h-5" />
          </Link>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 hover:bg-slate-200 transition-colors"
            aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white/98 backdrop-blur-xl border-b border-slate-200 shadow-xl overflow-hidden max-h-[85vh] overflow-y-auto"
          >
            <div className="px-5 py-6 space-y-4">
              
              {/* Mobile Niches Section */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
                  Nichos Atendidos
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {NICHE_LINKS.map((niche) => {
                    const Icon = niche.icon;
                    return (
                      <Link
                        key={niche.href}
                        href={niche.href}
                        className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5 text-xs font-bold text-slate-800"
                      >
                        <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border", niche.bgColor)}>
                          <Icon className={cn("w-3.5 h-3.5", niche.color)} />
                        </div>
                        <span>{niche.title}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1 block mb-2">
                  Menu Principal
                </span>
                <nav className="flex flex-col space-y-1">
                  {NAV_LINKS_BASE.map((link: any) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="px-3 py-2.5 rounded-lg text-sm font-bold text-slate-800 hover:bg-slate-50 flex items-center justify-between"
                    >
                      <span>{link.label}</span>
                      {link.badge && (
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 tracking-wider">
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-3">
                <a
                  href={COMPANY_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-800"
                >
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp: {COMPANY_INFO.phone}</span>
                </a>

                <Button href="/diagnostico" variant="gold" size="md" className="w-full justify-center">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Diagnóstico Gratuito de IA
                </Button>

                <Button href="/contato" variant="primary" size="md" className="w-full justify-center">
                  Fale com um Especialista
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
