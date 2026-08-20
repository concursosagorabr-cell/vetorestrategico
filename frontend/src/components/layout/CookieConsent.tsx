"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie_consent", "essential_only");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed bottom-4 left-4 right-4 sm:left-6 sm:max-w-md z-50 rounded-2xl bg-white border border-slate-200 p-5 shadow-2xl backdrop-blur-xl"
        role="region"
        aria-label="Consentimento de Cookies e Privacidade"
      >
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 shrink-0 mt-0.5 border border-emerald-100">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-900">
              Privacidade & Dados (LGPD)
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Utilizamos cookies e tecnologias semelhantes para aprimorar sua experiência e analisar o tráfego de acordo com nossa{" "}
              <Link href="/politica-de-privacidade" className="text-emerald-600 font-medium underline hover:text-emerald-700">
                Política de Privacidade
              </Link>.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <Button onClick={handleAccept} variant="primary" size="sm" className="text-xs py-1.5 px-3">
                Aceitar Todos
              </Button>
              <Button onClick={handleDecline} variant="secondary" size="sm" className="text-xs py-1.5 px-3">
                Apenas Essenciais
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
