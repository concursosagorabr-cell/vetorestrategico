"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { subscribeNewsletter } from "@/lib/api";
import { Mail, CheckCircle2, AlertCircle } from "lucide-react";

interface NewsletterFormProps {
  source?: string;
  className?: string;
}

export const NewsletterForm: React.FC<NewsletterFormProps> = ({
  source = "blog_footer",
  className = "",
}) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setErrorMessage("Por favor, insira um e-mail válido.");
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage(null);
      await subscribeNewsletter(email, source);
      setIsSuccess(true);
      setEmail("");
    } catch (err: any) {
      setErrorMessage(err.message || "Erro ao se inscrever.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex items-center gap-2 text-emerald-800 text-xs sm:text-sm bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl">
        <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
        <span>Inscrição confirmada! Você receberá nossos insights práticos de IA.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-2 ${className}`}>
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Mail className="w-4 h-4" />
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu melhor e-mail corporativo"
            required
            className="w-full rounded-xl bg-white border border-slate-200 pl-10 pr-4 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all shadow-xs"
          />
        </div>
        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isLoading}
          className="shrink-0 text-xs sm:text-sm font-semibold"
        >
          Assinar Grátis
        </Button>
      </div>

      {errorMessage && (
        <div className="flex items-center gap-1.5 text-xs text-red-600 font-medium">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <p className="text-[11px] text-slate-500 font-medium">
        Sem spam. Apenas cases reais e estratégias de IA aplicadas a PMEs.
      </p>
    </form>
  );
};
