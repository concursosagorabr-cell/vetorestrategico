"use client";

import React, { useEffect, useState } from "react";
import { MessageCircle, Mail, RefreshCw, Sparkles, Building2, User, Clock, ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Lead {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  company_name: string | null;
  segment: string | null;
  main_pain: string | null;
  message: string | null;
  lead_type: string;
  status: string;
  quiz_score: number | null;
  quiz_maturity_level: string | null;
  source_url: string | null;
  created_at: string;
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/leads", { cache: "no-store" });
      const data = await res.json();
      if (data.leads) {
        setLeads(data.leads);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div className="space-y-1">
            <Link
              href="/"
              className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 font-semibold transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Voltar ao Site
            </Link>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              Painel de Leads &bull; Vetor Estratégico
              <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                Neon DB
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Contatos captados pelo Chat com IA (Comandante Vetor), Diagnóstico de IA e Formulários.
            </p>
          </div>

          <button
            type="button"
            onClick={fetchLeads}
            disabled={loading}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-emerald-900/30 disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Atualizar Leads
          </button>
        </div>

        {/* Counter Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">Total de Leads</span>
            <div className="text-2xl font-black text-white mt-1">{leads.length}</div>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">Origem Chat IA / WhatsApp</span>
            <div className="text-2xl font-black text-emerald-400 mt-1">
              {leads.filter((l) => l.source_url?.includes("chat") || l.lead_type === "CONTACT").length}
            </div>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">Diagnósticos Realizados</span>
            <div className="text-2xl font-black text-amber-400 mt-1">
              {leads.filter((l) => l.lead_type === "QUIZ" || l.quiz_score !== null).length}
            </div>
          </div>
        </div>

        {/* Leads Table / List */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          {loading ? (
            <div className="p-12 text-center text-slate-400 space-y-3">
              <RefreshCw className="w-8 h-8 mx-auto animate-spin text-emerald-400" />
              <p className="text-sm">Carregando contatos do banco de dados Neon...</p>
            </div>
          ) : leads.length === 0 ? (
            <div className="p-12 text-center text-slate-400 space-y-2">
              <p className="text-base font-semibold text-slate-300">Nenhum lead registrado ainda.</p>
              <p className="text-xs">Assim que um cliente conversar no chat ou preencher um formulário, ele aparecerá aqui instantaneamente!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/80 text-slate-400 text-[11px] uppercase tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="py-3.5 px-4">Data / Hora</th>
                    <th className="py-3.5 px-4">Nome &bull; Empresa</th>
                    <th className="py-3.5 px-4">Contato (WhatsApp / E-mail)</th>
                    <th className="py-3.5 px-4">Origem / Tipo</th>
                    <th className="py-3.5 px-4">Necessidade / Mensagem</th>
                    <th className="py-3.5 px-4 text-right">Ação Direta</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {leads.map((lead) => {
                    const cleanPhone = lead.phone ? lead.phone.replace(/\D/g, "") : null;
                    const dateFormatted = new Date(lead.created_at).toLocaleString("pt-BR", {
                      timeZone: "America/Sao_Paulo",
                      day: "2-digit",
                      month: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    });

                    return (
                      <tr key={lead.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-4 px-4 whitespace-nowrap text-slate-400 flex items-center gap-1.5 font-medium">
                          <Clock className="w-3.5 h-3.5 text-slate-500" />
                          {dateFormatted}
                        </td>

                        <td className="py-4 px-4">
                          <div className="font-bold text-white flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-slate-400" />
                            {lead.name}
                          </div>
                          {lead.company_name && (
                            <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                              <Building2 className="w-3 h-3 text-slate-500" />
                              {lead.company_name} {lead.segment ? `(${lead.segment})` : ""}
                            </div>
                          )}
                        </td>

                        <td className="py-4 px-4 space-y-1">
                          {lead.phone ? (
                            <a
                              href={`https://wa.me/${cleanPhone}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              {lead.phone}
                            </a>
                          ) : (
                            <span className="text-slate-500">Sem telefone</span>
                          )}

                          {lead.email && (
                            <a
                              href={`mailto:${lead.email}`}
                              className="text-slate-400 hover:text-slate-200 flex items-center gap-1 text-[11px]"
                            >
                              <Mail className="w-3 h-3 text-slate-500" />
                              {lead.email}
                            </a>
                          )}
                        </td>

                        <td className="py-4 px-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                              lead.lead_type === "QUIZ"
                                ? "bg-amber-500/10 text-amber-300 border-amber-500/30"
                                : lead.source_url?.includes("chat")
                                ? "bg-cyan-500/10 text-cyan-300 border-cyan-500/30"
                                : "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                            }`}
                          >
                            {lead.lead_type === "QUIZ" ? "Diagnóstico IA" : lead.source_url?.includes("chat") ? "Chat IA" : "Formulário"}
                          </span>
                          {lead.quiz_score && (
                            <div className="text-[10px] text-amber-400 font-bold mt-1">
                              Score IA: {lead.quiz_score}/100
                            </div>
                          )}
                        </td>

                        <td className="py-4 px-4 max-w-xs">
                          <div className="text-slate-300 line-clamp-2 leading-relaxed text-[11px]">
                            {lead.main_pain || lead.message || "Sem detalhes"}
                          </div>
                        </td>

                        <td className="py-4 px-4 text-right whitespace-nowrap">
                          {lead.phone ? (
                            <a
                              href={`https://wa.me/${cleanPhone}?text=Ol%C3%A1%20${encodeURIComponent(
                                lead.name === "Lead Chat IA" ? "" : lead.name
                              )}!%20Sou%20da%20equipe%20da%20Vetor%20Estrat%C3%A9gico.%20Vi%20que%20voc%C3%AA%20conversou%20com%20nosso%20consultor%20virtual%20sobre%20solu%C3%A7%C3%B5es%20digitais.`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] px-3.5 py-1.5 rounded-xl transition-all shadow-md shadow-emerald-950/40"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              Chamar no WhatsApp
                            </a>
                          ) : (
                            <span className="text-slate-600 text-[11px]">-</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
