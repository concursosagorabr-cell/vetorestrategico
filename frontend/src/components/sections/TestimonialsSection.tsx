import React from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  ParallaxLayer,
  ParallaxVectorGrid,
  ParallaxWatermark,
  StrategicVectorMesh,
} from "@/components/ui/Parallax";
import { TESTIMONIALS } from "@/lib/constants";
import { Star, Quote } from "lucide-react";

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50/70 border-t border-slate-200/60 relative overflow-hidden">
      {/* Background Vector Grid & Monumental Watermark */}
      <ParallaxVectorGrid theme="light" speed={0.06} />
      <ParallaxWatermark text="DEPOIMENTOS &bull; AUTORIDADE &bull; CLIENTES" speed={0.16} direction="left" variant="light" />
      <StrategicVectorMesh theme="light" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow="Depoimentos"
          eyebrowVariant="gold"
          title="O que dizem os empresários e diretores que"
          highlightText="transformaram sua operação"
          highlightVariant="gold"
          description="Experiências reais de quem confiou na Vetor Estratégico para aplicar IA no dia a dia da sua empresa."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 flex flex-col justify-between hover:border-amber-300 shadow-sm hover:shadow-md transition-all duration-300 relative group"
            >
              <div className="space-y-4">
                {/* Rating Stars & Metric Tag */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                    {t.metricHighlight}
                  </span>
                </div>

                {/* Content */}
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed italic">
                  &ldquo;{t.content}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-slate-200 shrink-0 bg-slate-100">
                  <Image
                    src={t.avatarUrl}
                    alt={t.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {t.name}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {t.role} &bull; <span className="text-emerald-700 font-semibold">{t.company}</span>
                  </p>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {t.segment}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
