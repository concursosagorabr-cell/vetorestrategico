"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, X, ArrowRight } from "lucide-react";

export const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isDismissed = sessionStorage.getItem("announcement_dismissed");
    if (!isDismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem("announcement_dismissed", "true");
  };

  if (!isVisible) return null;

  return (
    <div className="relative bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-950 text-white px-4 py-2 text-xs sm:text-sm font-medium border-b border-emerald-800/40 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 pr-8 sm:pr-0">
        <span className="flex items-center gap-1.5 text-emerald-300">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span className="hidden md:inline font-bold">Diagnóstico Gratuito:</span>
        </span>
        <span className="text-slate-300">
          Descubra quanto tempo e dinheiro sua empresa pode economizar com IA.
        </span>
        <Link
          href="/diagnostico"
          className="inline-flex items-center gap-1 text-emerald-400 font-semibold hover:underline hover:text-emerald-300 ml-1"
        >
          Fazer teste em 2 min
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <button
        onClick={handleDismiss}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white transition-colors"
        aria-label="Fechar anúncio"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
