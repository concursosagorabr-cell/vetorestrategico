import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SegmentPageData } from "@/lib/segmentsData";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FloatingElement, TwinklingStar } from "@/components/ui/CosmicDecorations";
import { ParallaxLayer, CosmicParallaxStars, ParallaxWatermark, StrategicVectorMesh } from "@/components/ui/Parallax";
import { SegmentCalculator } from "@/components/sections/SegmentCalculator";
import { SegmentConsultationForm } from "@/components/sections/SegmentConsultationForm";
import { COMPANY_INFO } from "@/lib/constants";
import { generateBreadcrumbSchema, generateFaqSchema } from "@/lib/seo";
import {
  Sparkles,
  Zap,
  Phone,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Clock,
  TrendingUp,
  AlertTriangle,
  Users,
  ShieldCheck,
  ChevronDown,
  Star,
  DollarSign,
  MessageCircle,
  Award,
} from "lucide-react";

interface SegmentLandingTemplateProps {
  data: SegmentPageData;
}

export const SegmentLandingTemplate: React.FC<SegmentLandingTemplateProps> = ({ data }) => {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Início", url: "/" },
    { name: "Segmentos", url: "/#segmentos" },
    { name: data.hero.badge, url: `/${data.slug}` },
  ]);

  const faqSchema = generateFaqSchema(
    data.faqs.items.map((item) => ({
      question: item.question,
      answer: item.answer,
    }))
  );

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-hidden">
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 1. HERO SECTION */}
      <section className="relative pt-10 pb-20 md:pt-16 md:pb-28 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
        <ParallaxWatermark text={data.slug.toUpperCase()} speed={0.15} direction="left" variant="emerald" />
        <StrategicVectorMesh theme="dark" />
        <CosmicParallaxStars />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Copy Left */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 shadow-xs backdrop-blur-md">
                <span className="text-emerald-400 font-bold text-sm">✦</span>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                  {data.hero.badge}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08] uppercase">
                {data.hero.titlePrefix}
                <span className="gradient-text-emerald drop-shadow-[0_0_35px_rgba(16,185,129,0.35)]">
                  {data.hero.titleHighlight}
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
                {data.hero.subtitle}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Button
                  href="#agendar"
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto text-base font-black shadow-2xl shadow-emerald-500/30 px-9 py-4 rounded-full"
                  leftIcon={<Zap className="w-5 h-5 fill-white text-white" />}
                >
                  Agendar Sessão Estratégica (15 min)
                </Button>

                <Button
                  href={COMPANY_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto text-base font-bold px-8 py-4 rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20"
                  leftIcon={<MessageCircle className="w-5 h-5 text-emerald-400" />}
                >
                  Falar no WhatsApp
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-slate-300 font-medium">
                {data.hero.trustItems.map((item, idx) => (
                  <span key={idx} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Mascot Right */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
              <ParallaxLayer speed={-0.12} rotateSpeed={0.02}>
                <FloatingElement duration={4.8}>
                  <div className="relative w-72 h-72 sm:w-88 sm:h-88 flex items-center justify-center group cursor-pointer">
                    <div className="relative w-full h-full drop-shadow-[0_25px_45px_rgba(16,185,129,0.35)] transition-transform duration-500 group-hover:scale-105">
                      <Image
                        src={data.hero.mascotImage}
                        alt={data.hero.mascotAlt}
                        width={352}
                        height={352}
                        priority
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="absolute -top-3 -right-2 bg-slate-900/95 text-white text-xs font-bold px-4 py-2 rounded-2xl shadow-2xl border border-emerald-500/50 flex items-center gap-1.5 animate-bounce">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{data.hero.mascotBadge}</span>
                    </div>
                  </div>
                </FloatingElement>
              </ParallaxLayer>
            </div>

          </div>
        </div>
      </section>

      {/* 2. BOTTLENECKS SECTION */}
      <section className="py-20 bg-slate-50 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-emerald-700">
              {data.bottlenecks.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 uppercase">
              {data.bottlenecks.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.bottlenecks.items.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-400 transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 border border-red-200 flex items-center justify-center font-black text-sm">
                    0{idx + 1}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SIMULATOR SECTION (CLIENT ISLAND) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SegmentCalculator config={data.calculator} />
        </div>
      </section>

      {/* 4. PILLARS / SYSTEM SECTION */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-at-c from-emerald-500/10 via-transparent to-slate-950/80 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-emerald-400">
              {data.pillars.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase">
              {data.pillars.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.pillars.items.map((pillar, idx) => (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:border-emerald-400/50 hover:bg-white/10 transition-all space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-black text-sm">
                  0{idx + 1}
                </div>
                <h3 className="text-base font-bold text-white">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CASE STUDY SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-slate-950 border border-emerald-500/30 p-8 sm:p-12 text-white shadow-2xl space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                  ✦ Case Auditado • {data.caseStudy.segment}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black uppercase text-white">
                  {data.caseStudy.title}
                </h3>
              </div>
              <span className="text-xs font-bold px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shrink-0">
                {data.caseStudy.timeframe}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              {data.caseStudy.metrics.map((metric, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-3xl sm:text-4xl font-black text-emerald-400 mb-1">
                    {metric.value}
                  </div>
                  <div className="text-xs text-slate-300 font-medium">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>

            <blockquote className="border-l-4 border-emerald-400 pl-4 py-1 italic text-slate-300 text-sm sm:text-base leading-relaxed">
              &ldquo;{data.caseStudy.testimonial}&rdquo;
              <footer className="not-italic text-xs font-bold text-emerald-300 mt-2">
                — {data.caseStudy.author}
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* 6. LEAD FORM SECTION (CLIENT ISLAND) */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SegmentConsultationForm config={data.form} segmentSlug={data.slug} />
        </div>
      </section>

      {/* 7. FAQ SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-emerald-700">
              {data.faqs.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 uppercase">
              {data.faqs.title}
            </h2>
          </div>

          <div className="space-y-4">
            {data.faqs.items.map((faq, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2"
              >
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  {faq.question}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
