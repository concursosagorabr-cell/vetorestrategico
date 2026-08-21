"use client";

import React, { useState } from "react";
import Image from "next/image";
import { COMPANY_INFO } from "@/lib/constants";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const WhatsAppFloatingButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3 pointer-events-auto">
      {/* Balloon Tooltip with Mascot */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="hidden sm:flex items-center gap-3 bg-white border border-emerald-200 text-slate-900 px-4 py-3 rounded-2xl shadow-2xl text-xs font-medium relative max-w-xs"
          >
            <div className="w-11 h-11 rounded-full bg-emerald-50 border-2 border-emerald-400 shrink-0 shadow-sm flex items-center justify-center overflow-hidden">
              <Image
                src="/images/mascot/avatar.png"
                alt="Comandante Vetor"
                width={44}
                height={44}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-emerald-800 text-xs">Vetor Estratégico</span>
              <span className="text-slate-600 text-[11px] leading-tight">
                Olá! Vamos conversar sobre o site ou automação da sua empresa?
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowTooltip(false)}
              className="text-slate-400 hover:text-slate-700 p-0.5 ml-1"
              aria-label="Fechar dica do WhatsApp"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            {/* Arrow */}
            <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-r border-t border-emerald-200 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <a
        href={COMPANY_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 hover:bg-emerald-700 hover:scale-110 active:scale-95 transition-all duration-300"
        aria-label="Falar no WhatsApp"
      >
        {/* Pulse ring */}
        <span className="absolute -inset-1 rounded-full bg-emerald-400/30 animate-ping pointer-events-none" />
        
        {/* Online status indicator */}
        <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full" />

        <MessageCircle className="w-7 h-7 fill-white stroke-white text-white" />
      </a>
    </div>
  );
};
