import React from "react";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  ParallaxVectorGrid,
  ParallaxWatermark,
  StrategicVectorMesh,
} from "@/components/ui/Parallax";
import { SEGMENTS } from "@/lib/constants";
import {
  Activity,
  ShoppingBag,
  Scale,
  Calculator,
  Truck,
  Home,
  Briefcase,
  ArrowRight,
} from "lucide-react";

const segmentIconMap: Record<string, React.ElementType> = {
  Activity,
  ShoppingBag,
  Scale,
  Calculator,
  Truck,
  Home,
  Briefcase,
};

export const SegmentsSection: React.FC = () => {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background Vector Grid & Monumental Watermark */}
      <ParallaxVectorGrid theme="light" speed={0.06} />
      <ParallaxWatermark text="SEGMENTOS &bull; MERCADOS &bull; RESULTADOS" speed={0.16} direction="right" variant="cyan" />
      <StrategicVectorMesh theme="light" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow="Segmentos de Atuação"
          eyebrowVariant="cyan"
          title="Soluções validadas para os desafios de"
          highlightText="diversos mercados"
          highlightVariant="cyan"
          description="Adaptamos a inteligência às regras, vocabulário e peculiaridades de cada setor de atuação."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {SEGMENTS.map((seg, idx) => {
            const Icon = segmentIconMap[seg.icon] || Briefcase;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-slate-200 p-5 flex items-start gap-4 hover:border-sky-300 hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-11 h-11 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-900">
                    {seg.name}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {seg.benefit}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Special Niche Landing Pages Highlight */}
        <div className="mt-10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Páginas de Aquisição &amp; Funil por Setor
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            
            <Link
              href="/sites-para-estetica"
              className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50/80 to-white border border-emerald-200 flex items-center justify-between hover:shadow-md hover:border-emerald-300 transition-all group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
                  ✦
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wide block">Harmonização &amp; Botox</span>
                  <strong className="text-sm sm:text-base font-black text-slate-900 group-hover:text-emerald-700 transition-colors truncate block">
                    Clínicas de Estética
                  </strong>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-1 transition-transform shrink-0" />
            </Link>

            <Link
              href="/sites-para-odontologia"
              className="p-4 rounded-2xl bg-gradient-to-br from-sky-50/80 to-white border border-sky-200 flex items-center justify-between hover:shadow-md hover:border-sky-300 transition-all group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold shrink-0">
                  🦷
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-sky-700 uppercase tracking-wide block">Implantes &amp; Invisalign</span>
                  <strong className="text-sm sm:text-base font-black text-slate-900 group-hover:text-sky-700 transition-colors truncate block">
                    Consultórios Odonto
                  </strong>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-sky-600 group-hover:translate-x-1 transition-transform shrink-0" />
            </Link>

            <Link
              href="/sites-para-clinicas"
              className="p-4 rounded-2xl bg-gradient-to-br from-teal-50/80 to-white border border-teal-200 flex items-center justify-between hover:shadow-md hover:border-teal-300 transition-all group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold shrink-0">
                  🩺
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wide block">Consultas Particulares</span>
                  <strong className="text-sm sm:text-base font-black text-slate-900 group-hover:text-teal-700 transition-colors truncate block">
                    Clínicas &amp; Médicos
                  </strong>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-teal-600 group-hover:translate-x-1 transition-transform shrink-0" />
            </Link>

            <Link
              href="/sites-para-ecommerce"
              className="p-4 rounded-2xl bg-gradient-to-br from-amber-50/80 to-white border border-amber-200 flex items-center justify-between hover:shadow-md hover:border-amber-300 transition-all group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold shrink-0">
                  🛍️
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wide block">Recuperação de Carrinho</span>
                  <strong className="text-sm sm:text-base font-black text-slate-900 group-hover:text-amber-700 transition-colors truncate block">
                    E-commerce &amp; Varejo
                  </strong>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-amber-600 group-hover:translate-x-1 transition-transform shrink-0" />
            </Link>

            <Link
              href="/sites-para-advocacia"
              className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50/80 to-white border border-indigo-200 flex items-center justify-between hover:shadow-md hover:border-indigo-300 transition-all group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shrink-0">
                  ⚖️
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wide block">Triagem Ética OAB</span>
                  <strong className="text-sm sm:text-base font-black text-slate-900 group-hover:text-indigo-700 transition-colors truncate block">
                    Advocacia &amp; Jurídico
                  </strong>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-indigo-600 group-hover:translate-x-1 transition-transform shrink-0" />
            </Link>

            <Link
              href="/sites-para-contabilidade"
              className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50/80 to-white border border-emerald-300 flex items-center justify-between hover:shadow-md hover:border-emerald-400 transition-all group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold shrink-0">
                  📊
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wide block">Captação PJ &amp; Suporte</span>
                  <strong className="text-sm sm:text-base font-black text-slate-900 group-hover:text-emerald-800 transition-colors truncate block">
                    Contabilidade &amp; Fiscal
                  </strong>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-emerald-700 group-hover:translate-x-1 transition-transform shrink-0" />
            </Link>

          </div>
        </div>

        {/* Action Link */}
        <div className="mt-8 text-center">
          <Link
            href="/cases"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-sky-600 hover:text-sky-700 transition-colors"
          >
            <span>Ver todos os cases e segmentos atendidos</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
