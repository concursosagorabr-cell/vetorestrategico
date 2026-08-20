"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Sparkles, ArrowRight, Clock, CheckCircle2 } from "lucide-react";

export const ExitIntentModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenExitIntent = sessionStorage.getItem("exit_intent_shown");
    if (hasSeenExitIntent) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10 && !sessionStorage.getItem("exit_intent_shown")) {
        setIsOpen(true);
        sessionStorage.setItem("exit_intent_shown", "true");
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} maxWidth="md">
      <div className="text-center space-y-4">
        <div className="mx-auto w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
          <Sparkles className="w-7 h-7 animate-pulse" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
            Antes de ir embora...
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Descubra quanto sua empresa pode economizar com IA
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Responda 4 perguntas rápidas e receba uma estimativa de horas economizadas e o plano de automação ideal para seu segmento.
          </p>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 text-left space-y-2 border border-slate-200 text-xs text-slate-700">
          <div className="flex items-center gap-2 text-emerald-700 font-medium">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>100% Gratuito e sem compromisso comercial</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-700 font-medium">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>Resultado imediato na tela em menos de 2 minutos</span>
          </div>
        </div>

        <div className="pt-2 space-y-2">
          <Button
            href="/diagnostico"
            variant="gold"
            size="lg"
            className="w-full justify-center"
            rightIcon={<ArrowRight className="w-4 h-4" />}
            onClick={handleClose}
          >
            Fazer Diagnóstico Rápido
          </Button>

          <button
            type="button"
            onClick={handleClose}
            className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
          >
            Prefiro continuar navegando no site
          </button>
        </div>
      </div>
    </Modal>
  );
};
