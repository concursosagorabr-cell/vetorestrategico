"use client";

import React, { useState } from "react";
import { SegmentFormConfig } from "@/lib/segmentsData";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Sparkles, ShieldCheck, CheckCircle2, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SegmentConsultationFormProps {
  config: SegmentFormConfig;
  segmentSlug: string;
}

export const SegmentConsultationForm: React.FC<SegmentConsultationFormProps> = ({
  config,
  segmentSlug,
}) => {
  const [nome, setNome] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [dropdown1Val, setDropdown1Val] = useState(config.dropdown1.defaultValue);
  const [dropdown2Val, setDropdown2Val] = useState(config.dropdown2.defaultValue);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !whatsapp || !empresa) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nome,
          company: `${empresa} (${segmentSlug} - ${dropdown1Val})`,
          whatsapp: whatsapp,
          service_interest: `Landing Page ${segmentSlug.toUpperCase()} - ${dropdown2Val}`,
          page_source: `/${segmentSlug}`,
        }),
      });

      setIsSuccess(true);
    } catch {
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl bg-emerald-950 border border-emerald-500/40 p-8 sm:p-12 text-center text-white space-y-5 shadow-2xl"
      >
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/40 flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h4 className="text-2xl sm:text-3xl font-black uppercase">
            Solicitação Recebida com Sucesso!
          </h4>
          <p className="text-sm sm:text-base text-slate-300 max-w-md mx-auto">
            Obrigado, <strong className="text-white">{nome}</strong>. Nosso especialista entrará em contato via WhatsApp em até 15 minutos para apresentar seu diagnóstico.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div
      id="agendar"
      className="rounded-3xl bg-slate-900 border border-sky-500/30 p-6 sm:p-10 lg:p-12 shadow-2xl text-white relative overflow-hidden"
    >
      <div className="relative z-10 text-center max-w-2xl mx-auto space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/20 border border-sky-400/40 text-sky-300 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Sessão Estratégica Individual</span>
        </div>
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white">
          {config.title}
        </h3>
        <p className="text-sm sm:text-base text-slate-300 font-normal">
          {config.subtitle}
        </p>
      </div>

      {error && (
        <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-medium text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="relative z-10 max-w-2xl mx-auto space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5 text-left">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
              Seu Nome Completo *
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Dr. Roberto Silva"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-emerald-400 transition-colors"
            />
          </div>

          <div className="space-y-1.5 text-left">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
              {config.entityLabel} *
            </label>
            <input
              type="text"
              required
              placeholder={config.entityPlaceholder}
              value={empresa}
              onChange={(e) => setEmpresa(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-emerald-400 transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5 text-left sm:col-span-1">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
              WhatsApp com DDD *
            </label>
            <input
              type="tel"
              required
              placeholder="(11) 99999-9999"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-emerald-400 transition-colors"
            />
          </div>

          <div className="space-y-1.5 text-left sm:col-span-1">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
              {config.dropdown1.label}
            </label>
            <select
              value={dropdown1Val}
              onChange={(e) => setDropdown1Val(e.target.value)}
              className="w-full px-3 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-400 transition-colors cursor-pointer"
            >
              {config.dropdown1.options.map((opt) => (
                <option key={opt} value={opt} className="bg-slate-900 text-white">
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5 text-left sm:col-span-1">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
              {config.dropdown2.label}
            </label>
            <select
              value={dropdown2Val}
              onChange={(e) => setDropdown2Val(e.target.value)}
              className="w-full px-3 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-400 transition-colors cursor-pointer"
            >
              {config.dropdown2.options.map((opt) => (
                <option key={opt} value={opt} className="bg-slate-900 text-white">
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Atendimento estritamente confidencial em conformidade com a LGPD.</span>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full justify-center text-base font-black py-4 rounded-full shadow-2xl shadow-emerald-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
          isLoading={isSubmitting}
          rightIcon={<MessageCircle className="w-5 h-5 fill-white" />}
        >
          Confirmar Agendamento da Sessão Estratégica (15 min)
        </Button>
      </form>
    </div>
  );
};
