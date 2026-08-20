import React from "react";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { PRICING_PLANS } from "@/lib/constants";
import { Check, Sparkles, ArrowRight, ShieldCheck, Globe } from "lucide-react";

export const PricingSection: React.FC = () => {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-accent-emerald/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow="Planos & Preços Transparentes"
          eyebrowVariant="gold"
          title="Criação de Sites & Soluções de IA para o"
          highlightText="momento da sua empresa"
          highlightVariant="gold"
          description="Desde Landing Pages Express até projetos personalizados sob medida e consultoria contínua de IA."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {PRICING_PLANS.slice(0, 3).map((plan) => (
            <div
              key={plan.id}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                plan.popular
                  ? "bg-white border-2 border-emerald-500 shadow-xl shadow-emerald-500/10 lg:-translate-y-2"
                  : "bg-white border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <Badge variant="emerald" size="md" className="shadow-xs font-bold">
                    <Sparkles className="w-3.5 h-3.5 mr-1" />
                    {plan.badge || "Mais Recomendado"}
                  </Badge>
                </div>
              )}

              <div className="space-y-6">
                {/* Plan Header */}
                <div className="space-y-2">
                  {!plan.popular && plan.badge && (
                    <Badge variant="gold" size="sm" className="mb-1">
                      {plan.badge}
                    </Badge>
                  )}
                  <h3 className="text-2xl font-bold text-slate-900">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {plan.tagline}
                  </p>
                </div>

                {/* Price Display */}
                <div className="pb-4 border-b border-slate-100">
                  <div className="text-3xl font-black text-emerald-700">
                    {plan.price}
                  </div>
                  <span className="text-xs text-slate-400 font-medium">
                    {plan.period}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed">
                  {plan.description}
                </p>

                {/* Deliverables List */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-900 block">
                    O que está incluso:
                  </span>
                  <ul className="space-y-2.5 text-xs text-slate-600">
                    {plan.deliverables.slice(0, 5).map((d, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-100">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Ideal For */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600">
                  <strong className="text-slate-900 block mb-0.5 font-bold">Ideal para:</strong>
                  {plan.idealFor}
                </div>
              </div>

              {/* Action CTA */}
              <div className="pt-8 mt-6 border-t border-slate-100">
                <Button
                  href={plan.ctaHref}
                  variant={plan.popular ? "primary" : "secondary"}
                  size="lg"
                  className="w-full justify-center text-sm font-bold"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  {plan.ctaText}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Solution Note */}
        <div className="mt-12 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-center gap-2 font-medium">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Precisa de um site personalizado ou consultoria de IA sob medida?</span>
          </div>
          <Link href="/planos" className="text-emerald-700 underline font-semibold hover:text-emerald-800">
            Veja a tabela comparativa completa de planos e serviços
          </Link>
        </div>
      </div>
    </section>
  );
};
