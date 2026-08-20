import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Home, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4 text-center bg-background">
      <div className="max-w-md mx-auto space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 mx-auto text-3xl font-black">
          404
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Página Não Encontrada
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            O endereço que você tentou acessar não existe ou foi movido. Explore nossas soluções de IA ou volte para a página inicial.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button href="/" variant="primary" size="md" leftIcon={<Home className="w-4 h-4" />}>
            Página Inicial
          </Button>
          <Button href="/diagnostico" variant="gold" size="md" leftIcon={<Sparkles className="w-4 h-4" />}>
            Diagnóstico de IA
          </Button>
        </div>
      </div>
    </div>
  );
}
