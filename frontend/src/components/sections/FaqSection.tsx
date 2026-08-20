import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AccordionItem } from "@/components/ui/Accordion";
import { FAQS, COMPANY_INFO } from "@/lib/constants";
import { HelpCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const FaqSection: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50/50 border-t border-slate-200/60 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Tire Suas Dúvidas"
          eyebrowVariant="emerald"
          title="Perguntas frequentes sobre"
          highlightText="implantação de IA para PMEs"
          highlightVariant="emerald"
          description="Tudo o que você precisa saber sobre prazos, segurança de dados, custos e integrações."
        />

        <div className="space-y-3">
          {FAQS.map((faq, idx) => (
            <AccordionItem
              key={idx}
              title={faq.question}
              isOpenDefault={idx === 0}
            >
              {faq.answer}
            </AccordionItem>
          ))}
        </div>

        {/* WhatsApp Help CTA Box */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Ainda tem alguma dúvida específica sobre seu negócio?
              </h4>
              <p className="text-xs text-slate-600">
                Fale em tempo real com nosso consultor no WhatsApp e tire todas as suas dúvidas.
              </p>
            </div>
          </div>

          <Button
            href={COMPANY_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            size="sm"
            className="shrink-0"
            leftIcon={<MessageCircle className="w-4 h-4" />}
          >
            Falar no WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
};
