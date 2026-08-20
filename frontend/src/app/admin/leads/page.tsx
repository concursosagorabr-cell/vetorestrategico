"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  MessageCircle,
  Mail,
  RefreshCw,
  Sparkles,
  Building2,
  User,
  Clock,
  ShieldCheck,
  ArrowLeft,
  Lock,
  LogOut,
  AlertCircle,
  KeyRound,
} from "lucide-react";
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
  const [token, setToken] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [inputPassword, setInputPassword] = useState<string>("");
  const [authError, setAuthError] = useState<string | null>(null);

  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchLeads = useCallback(async (authToken: string) => {
    setLoading(true);
    setFetchError(null);
    try {
      const res = await fetch("/api/admin/leads", {
        headers: {
          "x-admin-token": authToken,
        },
        cache: "no-store",
      });

      if (res.status === 401) {
        setIsAuthenticated(false);
        sessionStorage.removeItem("vetor_admin_token");
        setAuthError("Sessão expirada ou chave administrativa incorreta.");
        return;
      }

      if (!res.ok) {
        throw new Error("Falha ao consultar banco de dados.");
      }

      const data = await res.json();
      if (data.leads) {
        setLeads(data.leads);
        setIsAuthenticated(true);
      }
    } catch (e: any) {
      setFetchError(e.message || "Erro ao conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const savedToken = sessionStorage.getItem("vetor_admin_token");
    if (savedToken) {
      setToken(savedToken);
      fetchLeads(savedToken);
    }
  }, [fetchLeads]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPassword.trim()) {
      setAuthError("Por favor, digite a chave de acesso.");
      return;
    }

    setAuthError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/leads", {
        headers: {
          "x-admin-token": inputPassword.trim(),
        },
        cache: "no-store",
      });

      if (res.status === 401) {
        setAuthError("Chave de acesso administrativo inválida.");
        setLoading(false);
        return;
      }

      if (!res.ok) {
        throw new Error("Erro ao validar credenciais.");
      }

      const data = await res.json();
      sessionStorage.setItem("vetor_admin_token", inputPassword.trim());
      setToken(inputPassword.trim());
      setLeads(data.leads || []);
      setIsAuthenticated(true);
      setInputPassword("");
    } catch (err: any) {
      setAuthError(err.message || "Erro ao autenticar.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("vetor_admin_token");
    setToken("");
    setIsAuthenticated(false);
    setLeads([]);
  };

  // Se não autenticado, renderiza tela de login seguro
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center text-emerald-400 mx-auto">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-black text-white">Acesso Restrito</h1>
            <p className="text-xs text-slate-400">
              Painel de Gestão Comercial &bull; Vetor Estratégico
            </p>
          </div>

          {authError && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2.5 text-red-300 text-xs font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Chave de Acesso Administrativo
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Digite sua chave de segurança..."
                  value={inputPassword}
                  onChange={(e) => setInputPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                  autoFocus
                />
                <KeyRound className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm py-3 rounded-xl transition-all shadow-lg shadow-emerald-950/50 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Verificando...
                </>
              ) : (
                "Entrar no Painel Seguro"
              )}
            </button>
          </form>

          <div className="pt-2 border-t border-slate-800/80 text-center">
            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Voltar à página inicial
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Visualização do Painel Autenticado
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
              <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Autenticado
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Contatos captados com segurança via formulários, diagnóstico e chat autorizado.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => fetchLeads(token)}
              disabled={loading}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-emerald-900/30 disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              Atualizar Leads
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs sm:text-sm font-bold px-3.5 py-2.5 rounded-xl transition-all border border-slate-700 cursor-pointer"
              title="Encerrar sessão"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </div>
        </div>

        {fetchError && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-red-300 text-xs font-medium">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{fetchError}</span>
          </div>
        )}

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
              <p className="text-sm">Carregando contatos seguros...</p>
            </div>
          ) : leads.length === 0 ? (
            <div className="p-12 text-center text-slate-400 space-y-2">
              <p className="text-base font-semibold text-slate-300">Nenhum lead registrado ainda.</p>
              <p className="text-xs">Assim que um cliente enviar uma solicitação, ela aparecerá aqui com total sigilo!</p>
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
                              )}!%20Sou%20da%20equipe%20da%20Vetor%20Estrat%C3%A9gico.%20Vi%20que%20voc%C3%AA%20solicitou%20um%20contato%20sobre%20nossas%20solu%C3%A7%C3%B5es%20digitais.`}
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
