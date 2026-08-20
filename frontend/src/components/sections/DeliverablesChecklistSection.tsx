import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DELIVERABLES_CHECKLIST } from "@/lib/constants";
import { CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

export const DeliverablesChecklistSection: React.FC = () => {
  return (
    <section className="py-16 bg-slate-50/50 border-y border-slate-200/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Garantia de Entrega"
          eyebrowVariant="emerald"
          title="O que você recebe em cada projeto da"
          highlightText="Vetor Estratégico"
          highlightVariant="emerald"
          description="Sem surpresas ou cobranças adicionais ocultas. Nosso escopo de entrega é 100% transparente."
        />

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {DELIVERABLES_CHECKLIST.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3.5 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-emerald-300 transition-colors"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="text-sm font-semibold text-slate-900">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
