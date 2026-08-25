"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, CheckCircle2, ShieldCheck, Clock, Send, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DirectoryTool } from "@/types";
import { submitLead } from "@/lib/api";

interface ToolImplementationModalProps {
  tool: DirectoryTool | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ToolImplementationModal: React.FC<ToolImplementationModalProps> = ({
  tool,
  isOpen,
  onClose,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [teamSize, setTeamSize] = useState("2-5 colaboradores");
  const [urgency, setUrgency] = useState("Imediato (esta semana)");
  const [notes, setNotes] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen || !tool) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || (!email && !phone)) {
      setErrorMessage("Por favor, preencha seu nome e pelo menos um canal de contato (WhatsApp ou E-mail).");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      await submitLead({
        name,
        email,
        phone,
        company_name: companyName,
        company_size: teamSize,
        segment: tool.nicheLabels?.[0] || "Diretório de IA",
        main_pain: `Interesse em implementação e configuração da ferramenta: ${tool.name} (${tool.slug}). Urgência: ${urgency}. Mensagem: ${notes}`,
        estimated_budget: "A definir na proposta técnica",
        message: `Solicitação de implementação direta via Diretório de IA. Ferramenta: ${tool.name}. Observações: ${notes}`,
        source_url: `/diretorio/${tool.slug}`,
      });

      setIsSuccess(true);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Ocorreu um erro ao enviar sua solicitação. Tente novamente ou nos chame no WhatsApp.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setErrorMessage("");
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8"
        >
          {/* Close button */}
          <button
            onClick={handleReset}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors z-10"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header Banner */}
          <div className="bg-slate-900 text-white p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Implementação Profissional Vetor Estratégico
              </span>
              <h2 className="text-2xl font-bold text-white">
                Implementar: {tool.name}
              </h2>
              <p className="text-xs text-slate-300">
                Configuração chave na mão, integração com seus sistemas e treinamento da sua equipe em {tool.vetorImplementationHours || "48h a 72h"}.
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            {isSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Solicitação Recebida com Sucesso!
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Um especialista técnico da <strong>Vetor Estratégico</strong> entrará em contato via WhatsApp nas próximas 2 horas úteis para apresentar o escopo e orçamento da implementação de <strong>{tool.name}</strong>.
                </p>
                <div className="pt-4">
                  <Button variant="primary" size="md" onClick={handleReset} className="font-bold">
                    Concluir
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Form fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Seu Nome Completo *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Carlos Silva"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-900"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Nome da Empresa / Clínica</label>
                    <input
                      type="text"
                      placeholder="Ex: Clínica Silva & Associados"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">WhatsApp Comercial *</label>
                    <input
                      type="tel"
                      required
                      placeholder="(11) 99999-9999"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-900"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">E-mail Corporativo</label>
                    <input
                      type="email"
                      placeholder="carlos@empresa.com.br"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Tamanho da Equipe</label>
                    <select
                      value={teamSize}
                      onChange={(e) => setTeamSize(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-900 bg-white"
                    >
                      <option value="1 pessoa (Solo)">1 pessoa (Solo)</option>
                      <option value="2-5 colaboradores">2 a 5 colaboradores</option>
                      <option value="6-15 colaboradores">6 a 15 colaboradores</option>
                      <option value="16-50 colaboradores">16 a 50 colaboradores</option>
                      <option value="Mais de 50 colaboradores">Mais de 50 colaboradores</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Urgência de Início</label>
                    <select
                      value={urgency}
                      onChange={(e) => setUrgency(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-900 bg-white"
                    >
                      <option value="Imediato (esta semana)">Imediato (esta semana)</option>
                      <option value="Próximas 2 semanas">Próximas 2 semanas</option>
                      <option value="Próximo mês">Próximo mês</option>
                      <option value="Pesquisando orçamentos">Pesquisando orçamentos</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Detalhes ou Integrações Desejadas (Opcional)</label>
                  <textarea
                    rows={2}
                    placeholder="Ex: Quero integrar o agente ao meu WhatsApp oficial e ao meu CRM..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-900"
                  />
                </div>

                {/* Trust Badges */}
                <div className="flex items-center justify-between text-[11px] text-slate-500 py-2 border-t border-slate-100">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Dados protegidos (LGPD)
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    Resposta em até 2h
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    Cancelar
                  </button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={isLoading}
                    className="font-bold flex items-center gap-2 shadow-lg shadow-emerald-500/20"
                  >
                    {isLoading ? (
                      "Enviando..."
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Solicitar Proposta Comercial
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
