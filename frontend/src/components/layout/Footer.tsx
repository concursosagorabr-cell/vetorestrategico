import React from "react";
import Link from "next/link";
import Image from "next/image";
import { COMPANY_INFO, NAV_LINKS, SERVICES, SEGMENTS } from "@/lib/constants";
import { Mail, Phone, MapPin, ShieldCheck, ArrowUpRight, Sparkles } from "lucide-react";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-800 pt-16 pb-12 relative overflow-hidden text-slate-300">
      {/* Background Subtle Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-emerald-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-xl bg-white/10 border border-white/15 p-1 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform overflow-hidden">
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

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Desenvolvimento de sites de alta performance e automações inteligentes para empresas que buscam captação de clientes e eficiência operacional.
            </p>

            <div className="pt-2 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white transition-colors">
                  {COMPANY_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={COMPANY_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  {COMPANY_INFO.phone} (WhatsApp Comercial)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
                <span>{COMPANY_INFO.location}</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                <ShieldCheck className="w-3.5 h-3.5" />
                Conformidade Total com a LGPD
              </span>
            </div>
          </div>

          {/* Col 2: Serviços de IA */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Serviços de IA
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {SERVICES.map((srv) => (
                <li key={srv.id}>
                  <Link
                    href={`/servicos#${srv.id}`}
                    className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
                  >
                    <span>{srv.title.replace("Automação de ", "").replace(" & Treinamento de Equipe em IA", "")}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Segmentos Atendidos */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Soluções por Nicho
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/estetica" className="text-emerald-400 font-bold hover:text-emerald-300 transition-colors flex items-center gap-1">
                  <span>✦</span> Clínicas de Estética
                </Link>
              </li>
              <li>
                <Link href="/odontologia" className="text-sky-400 font-bold hover:text-sky-300 transition-colors flex items-center gap-1">
                  <span>✦</span> Consultórios Odonto
                </Link>
              </li>
              <li>
                <Link href="/clinicas" className="text-teal-400 font-medium hover:text-teal-300 transition-colors flex items-center gap-1">
                  <span>✦</span> Clínicas &amp; Médicos
                </Link>
              </li>
              <li>
                <Link href="/ecommerce" className="text-amber-400 font-medium hover:text-amber-300 transition-colors flex items-center gap-1">
                  <span>✦</span> E-commerce &amp; Varejo
                </Link>
              </li>
              <li>
                <Link href="/advocacia" className="text-indigo-400 font-medium hover:text-indigo-300 transition-colors flex items-center gap-1">
                  <span>✦</span> Advocacia &amp; Jurídico
                </Link>
              </li>
              <li>
                <Link href="/contabilidade" className="text-emerald-300 font-medium hover:text-white transition-colors flex items-center gap-1">
                  <span>✦</span> Contabilidade &amp; Fiscal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Institucional & Ações */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Institucional
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <li>
                <Link href="/orcamento" className="text-emerald-400 font-bold hover:text-emerald-300 transition-colors inline-flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Simulador de Orçamento
                </Link>
              </li>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/diagnostico" className="text-amber-400 font-medium hover:text-amber-300 transition-colors inline-flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Diagnóstico Rápido de IA
                </Link>
              </li>
              <li>
                <Link href="/politica-de-privacidade" className="hover:text-white transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/termos-de-uso" className="hover:text-white transition-colors">
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {currentYear} {COMPANY_INFO.name}. Todos os direitos reservados.: {COMPANY_INFO.cnpjPlaceholder}.
          </div>

          <div className="flex items-center gap-6">
            <span>Desenvolvido com IA de Alto Desempenho</span>
            <a href="#top" className="hover:text-white transition-colors inline-flex items-center gap-1">
              Voltar ao topo <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
