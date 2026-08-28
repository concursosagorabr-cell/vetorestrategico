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
  FileText,
  Trash2,
  ExternalLink,
  Download,
  Filter,
  Search,
  CheckCircle2,
  Briefcase,
  Layers,
  Eye,
  X,
  Printer,
  ChevronDown,
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

interface Resume {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  role_interest: string;
  experience_level: string | null;
  work_model: string | null;
  salary_expectation: string | null;
  linkedin_url: string | null;
  github_portfolio_url: string | null;
  summary: string | null;
  skills: string | null;
  submission_type: string; // 'PDF_UPLOAD' | 'WEB_FORM'
  file_name: string | null;
  file_size_bytes: number | null;
  has_file: boolean;
  status: string;
  notes: string | null;
  created_at: string;
}

export default function AdminLeadsPage() {
  const [token, setToken] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [inputPassword, setInputPassword] = useState<string>("");
  const [authError, setAuthError] = useState<string | null>(null);

  // Active Tab
  const [activeTab, setActiveTab] = useState<"LEADS" | "RESUMES">("LEADS");

  // Leads state
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [fetchLeadsError, setFetchLeadsError] = useState<string | null>(null);

  // Resumes state
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);
  const [fetchResumesError, setFetchResumesError] = useState<string | null>(null);

  // Filter & Search states for Resumes
  const [resumeTypeFilter, setResumeTypeFilter] = useState<string>("ALL");
  const [resumeSearch, setResumeSearch] = useState<string>("");
  const [selectedResumeModal, setSelectedResumeModal] = useState<Resume | null>(null);

  // Fetch Leads
  const fetchLeads = useCallback(async (authToken: string) => {
    setLoadingLeads(true);
    setFetchLeadsError(null);
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
        throw new Error("Falha ao consultar base de leads.");
      }

      const data = await res.json();
      if (data.leads) {
        setLeads(data.leads);
        setIsAuthenticated(true);
      }
    } catch (e: any) {
      setFetchLeadsError(e.message || "Erro ao conectar ao servidor.");
    } finally {
      setLoadingLeads(false);
    }
  }, []);

  // Fetch Resumes
  const fetchResumes = useCallback(async (authToken: string) => {
    setLoadingResumes(true);
    setFetchResumesError(null);
    try {
      const res = await fetch("/api/admin/resumes", {
        headers: {
          "x-admin-token": authToken,
        },
        cache: "no-store",
      });

      if (res.status === 401) {
        return;
      }

      if (!res.ok) {
        throw new Error("Falha ao consultar banco de currículos.");
      }

      const data = await res.json();
      if (data.resumes) {
        setResumes(data.resumes);
      }
    } catch (e: any) {
      setFetchResumesError(e.message || "Erro ao consultar currículos.");
    } finally {
      setLoadingResumes(false);
    }
  }, []);

  // Fetch all data
  const fetchAllData = useCallback(
    async (authToken: string) => {
      await Promise.all([fetchLeads(authToken), fetchResumes(authToken)]);
    },
    [fetchLeads, fetchResumes]
  );

  useEffect(() => {
    const savedToken = sessionStorage.getItem("vetor_admin_token");
    if (savedToken) {
      setToken(savedToken);
      fetchAllData(savedToken);
    }
  }, [fetchAllData]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPassword.trim()) {
      setAuthError("Por favor, digite a chave de acesso.");
      return;
    }

    setAuthError(null);
    setLoadingLeads(true);

    try {
      const res = await fetch("/api/admin/leads", {
        headers: {
          "x-admin-token": inputPassword.trim(),
        },
        cache: "no-store",
      });

      if (res.status === 401) {
        setAuthError("Chave de acesso administrativo inválida.");
        setLoadingLeads(false);
        return;
      }

      if (!res.ok) {
        throw new Error("Erro ao validar credenciais.");
      }

      const data = await res.json();
      const validToken = inputPassword.trim();
      sessionStorage.setItem("vetor_admin_token", validToken);
      setToken(validToken);
      setLeads(data.leads || []);
      setIsAuthenticated(true);
      setInputPassword("");

      // Fetch resumes as well
      fetchResumes(validToken);
    } catch (err: any) {
      setAuthError(err.message || "Erro ao autenticar.");
    } finally {
      setLoadingLeads(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("vetor_admin_token");
    setToken("");
    setIsAuthenticated(false);
    setLeads([]);
    setResumes([]);
  };

  // Delete Resume Action
  const handleDeleteResume = async (resumeId: number, candidateName: string) => {
    const confirmed = window.confirm(
      `Tem certeza de que deseja excluir permanentemente o currículo de "${candidateName}"?`
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/admin/resumes?id=${resumeId}`, {
        method: "DELETE",
        headers: {
          "x-admin-token": token,
        },
      });

      if (!res.ok) {
        throw new Error("Erro ao excluir currículo.");
      }

      setResumes((prev) => prev.filter((r) => r.id !== resumeId));
      if (selectedResumeModal?.id === resumeId) {
        setSelectedResumeModal(null);
      }
    } catch (err: any) {
      alert(err.message || "Erro ao excluir o currículo.");
    }
  };

  // Update Resume Status
  const handleUpdateResumeStatus = async (resumeId: number, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/resumes", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": token,
        },
        body: JSON.stringify({ id: resumeId, status: newStatus }),
      });

      if (!res.ok) throw new Error("Erro ao atualizar status.");

      setResumes((prev) =>
        prev.map((r) => (r.id === resumeId ? { ...r, status: newStatus } : r))
      );
    } catch (err: any) {
      alert(err.message || "Erro ao atualizar status.");
    }
  };

  // Filtered Resumes
  const filteredResumes = resumes.filter((r) => {
    const matchesType =
      resumeTypeFilter === "ALL" || r.submission_type === resumeTypeFilter;
    const searchLower = resumeSearch.toLowerCase();
    const matchesSearch =
      !resumeSearch ||
      r.name.toLowerCase().includes(searchLower) ||
      r.email.toLowerCase().includes(searchLower) ||
      r.role_interest.toLowerCase().includes(searchLower) ||
      (r.skills && r.skills.toLowerCase().includes(searchLower));
    return matchesType && matchesSearch;
  });

  // Login Screen if not authenticated
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
              disabled={loadingLeads}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm py-3 rounded-xl transition-all shadow-lg shadow-emerald-950/50 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
            >
              {loadingLeads ? (
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
              Painel de Gestão &bull; Vetor Estratégico
              <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Autenticado
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Gestão integrada de leads comerciais e banco de currículos com total sigilo.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => fetchAllData(token)}
              disabled={loadingLeads || loadingResumes}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-emerald-900/30 disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${loadingLeads || loadingResumes ? "animate-spin" : ""}`} />
              Atualizar Dados
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

        {/* Top Module Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-3 p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab("LEADS")}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === "LEADS"
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-950/50"
                : "text-slate-400 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>🎯 Leads Comerciais &amp; Orçamentos</span>
            <span className="px-2 py-0.5 rounded-full text-[11px] bg-black/20 text-white">
              {leads.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("RESUMES")}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === "RESUMES"
                ? "bg-sky-600 text-white shadow-lg shadow-sky-950/50"
                : "text-slate-400 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>📄 Banco de Currículos &amp; Talentos</span>
            <span className="px-2 py-0.5 rounded-full text-[11px] bg-black/20 text-white">
              {resumes.length}
            </span>
          </button>
        </div>

        {/* Errors display */}
        {fetchLeadsError && activeTab === "LEADS" && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-red-300 text-xs font-medium">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{fetchLeadsError}</span>
          </div>
        )}
        {fetchResumesError && activeTab === "RESUMES" && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-red-300 text-xs font-medium">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{fetchResumesError}</span>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 1: LEADS COMERCIAIS */}
        {/* ========================================================================= */}
        {activeTab === "LEADS" && (
          <div className="space-y-6">
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

            {/* Leads Table */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
              {loadingLeads ? (
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
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: BANCO DE CURRÍCULOS & TALENTOS */}
        {/* ========================================================================= */}
        {activeTab === "RESUMES" && (
          <div className="space-y-6">
            
            {/* Resume Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
                <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">Total de Candidatos</span>
                <div className="text-2xl font-black text-white mt-1">{resumes.length}</div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
                <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">Currículos em PDF</span>
                <div className="text-2xl font-black text-emerald-400 mt-1">
                  {resumes.filter((r) => r.submission_type === "PDF_UPLOAD").length}
                </div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
                <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">Formulários Web</span>
                <div className="text-2xl font-black text-sky-400 mt-1">
                  {resumes.filter((r) => r.submission_type === "WEB_FORM").length}
                </div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
                <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">Novos / Em Análise</span>
                <div className="text-2xl font-black text-amber-400 mt-1">
                  {resumes.filter((r) => r.status === "NEW" || r.status === "REVIEWING").length}
                </div>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <span className="text-xs font-bold text-slate-400 flex items-center gap-1 mr-1">
                  <Filter className="w-3.5 h-3.5" /> Classificação:
                </span>

                <button
                  type="button"
                  onClick={() => setResumeTypeFilter("ALL")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    resumeTypeFilter === "ALL"
                      ? "bg-white text-slate-900 shadow-xs"
                      : "bg-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  Todos ({resumes.length})
                </button>

                <button
                  type="button"
                  onClick={() => setResumeTypeFilter("PDF_UPLOAD")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    resumeTypeFilter === "PDF_UPLOAD"
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "bg-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  PDF Upload ({resumes.filter((r) => r.submission_type === "PDF_UPLOAD").length})
                </button>

                <button
                  type="button"
                  onClick={() => setResumeTypeFilter("WEB_FORM")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    resumeTypeFilter === "WEB_FORM"
                      ? "bg-sky-600 text-white shadow-xs"
                      : "bg-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  Formulário Web ({resumes.filter((r) => r.submission_type === "WEB_FORM").length})
                </button>
              </div>

              <div className="relative w-full sm:w-72">
                <input
                  type="text"
                  placeholder="Buscar candidato, vaga, skill..."
                  value={resumeSearch}
                  onChange={(e) => setResumeSearch(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
                />
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Resumes Table */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
              {loadingResumes ? (
                <div className="p-12 text-center text-slate-400 space-y-3">
                  <RefreshCw className="w-8 h-8 mx-auto animate-spin text-sky-400" />
                  <p className="text-sm">Carregando banco de currículos...</p>
                </div>
              ) : filteredResumes.length === 0 ? (
                <div className="p-12 text-center text-slate-400 space-y-2">
                  <p className="text-base font-semibold text-slate-300">Nenhum currículo encontrado com os filtros atuais.</p>
                  <p className="text-xs">Assim que profissionais enviarem candidaturas via Trabalhe Conosco, aparecerão aqui.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950/80 text-slate-400 text-[11px] uppercase tracking-wider border-b border-slate-800">
                      <tr>
                        <th className="py-3.5 px-4">Data</th>
                        <th className="py-3.5 px-4">Candidato</th>
                        <th className="py-3.5 px-4">Vaga &bull; Nível</th>
                        <th className="py-3.5 px-4">Classificação</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4 text-right">Ações &bull; Currículo</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {filteredResumes.map((resume) => {
                        const cleanPhone = resume.phone ? resume.phone.replace(/\D/g, "") : null;
                        const dateFormatted = new Date(resume.created_at).toLocaleString("pt-BR", {
                          timeZone: "America/Sao_Paulo",
                          day: "2-digit",
                          month: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        });

                        const isPdf = resume.submission_type === "PDF_UPLOAD";

                        return (
                          <tr key={resume.id} className="hover:bg-slate-800/40 transition-colors">
                            <td className="py-4 px-4 whitespace-nowrap text-slate-400 font-medium">
                              <div className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5 text-slate-500" />
                                {dateFormatted}
                              </div>
                            </td>

                            <td className="py-4 px-4">
                              <div className="font-bold text-white flex items-center gap-1.5">
                                <User className="w-3.5 h-3.5 text-slate-400" />
                                {resume.name}
                              </div>
                              <div className="flex items-center gap-3 mt-1">
                                {resume.phone && (
                                  <a
                                    href={`https://wa.me/${cleanPhone}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 text-[11px]"
                                  >
                                    <MessageCircle className="w-3 h-3" />
                                    {resume.phone}
                                  </a>
                                )}
                                <a
                                  href={`mailto:${resume.email}`}
                                  className="text-slate-400 hover:text-slate-200 flex items-center gap-1 text-[11px]"
                                >
                                  <Mail className="w-3 h-3 text-slate-500" />
                                  {resume.email}
                                </a>
                              </div>
                              {resume.linkedin_url && (
                                <div className="mt-1">
                                  <a
                                    href={resume.linkedin_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sky-400 hover:text-sky-300 inline-flex items-center gap-1 text-[10px]"
                                  >
                                    <ExternalLink className="w-3 h-3" />
                                    LinkedIn / Portfólio
                                  </a>
                                </div>
                              )}
                            </td>

                            <td className="py-4 px-4">
                              <div className="font-bold text-slate-200">
                                {resume.role_interest}
                              </div>
                              <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1.5">
                                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                                  {resume.experience_level || "Geral"}
                                </span>
                                {resume.work_model && (
                                  <span className="text-slate-500">{resume.work_model}</span>
                                )}
                              </div>
                            </td>

                            <td className="py-4 px-4">
                              <span
                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                                  isPdf
                                    ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                                    : "bg-sky-500/10 text-sky-300 border-sky-500/30"
                                }`}
                              >
                                {isPdf ? (
                                  <>
                                    <FileText className="w-3 h-3" />
                                    PDF Upload
                                  </>
                                ) : (
                                  <>
                                    <Layers className="w-3 h-3" />
                                    Formulário Web
                                  </>
                                )}
                              </span>
                              {resume.file_name && (
                                <div className="text-[10px] text-slate-400 mt-1 truncate max-w-[140px]" title={resume.file_name}>
                                  {resume.file_name}
                                </div>
                              )}
                            </td>

                            <td className="py-4 px-4">
                              <select
                                value={resume.status || "NEW"}
                                onChange={(e) => handleUpdateResumeStatus(resume.id, e.target.value)}
                                className={`text-[11px] font-bold rounded-lg px-2.5 py-1 border bg-slate-950 focus:outline-none transition-colors cursor-pointer ${
                                  resume.status === "NEW"
                                    ? "text-amber-400 border-amber-500/30"
                                    : resume.status === "REVIEWING"
                                    ? "text-sky-400 border-sky-500/30"
                                    : resume.status === "TALENT_POOL"
                                    ? "text-emerald-400 border-emerald-500/30"
                                    : resume.status === "CONTACTED"
                                    ? "text-purple-400 border-purple-500/30"
                                    : "text-slate-400 border-slate-700"
                                }`}
                              >
                                <option value="NEW">🟡 Novo</option>
                                <option value="REVIEWING">🔵 Em Análise</option>
                                <option value="TALENT_POOL">🟢 Banco de Talentos</option>
                                <option value="CONTACTED">🟣 Contatado</option>
                                <option value="REJECTED">⚪ Arquivado</option>
                              </select>
                            </td>

                            <td className="py-4 px-4 text-right whitespace-nowrap">
                              <div className="inline-flex items-center gap-1.5">
                                
                                {/* Botão Abrir/Baixar PDF ou Visualizar Formulário */}
                                {isPdf && resume.has_file ? (
                                  <a
                                    href={`/api/admin/resumes/download?id=${resume.id}&token=${encodeURIComponent(token)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] shadow-sm transition-all"
                                    title="Abrir arquivo PDF do candidato"
                                  >
                                    <Download className="w-3.5 h-3.5" />
                                    Abrir PDF
                                  </a>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => setSelectedResumeModal(resume)}
                                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-[11px] shadow-sm transition-all cursor-pointer"
                                    title="Visualizar ficha de currículo online"
                                  >
                                    <Eye className="w-3.5 h-3.5" />
                                    Ver Ficha
                                  </button>
                                )}

                                {/* WhatsApp direto */}
                                {cleanPhone && (
                                  <a
                                    href={`https://wa.me/${cleanPhone}?text=Ol%C3%A1%20${encodeURIComponent(
                                      resume.name
                                    )}!%20Sou%20da%20equipe%20da%20Vetor%20Estrat%C3%A9gico.%20Recebemos%20sua%20candidatura%20para%20${encodeURIComponent(
                                      resume.role_interest
                                    )}%20e%20gostar%C3%ADamos%20de%20conversar.`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/30 transition-colors"
                                    title="Chamar candidato no WhatsApp"
                                  >
                                    <MessageCircle className="w-3.5 h-3.5" />
                                  </a>
                                )}

                                {/* Botão Excluir */}
                                <button
                                  type="button"
                                  onClick={() => handleDeleteResume(resume.id, resume.name)}
                                  className="p-1.5 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30 transition-colors cursor-pointer"
                                  title="Excluir currículo"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
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
        )}

      </div>

      {/* ========================================================================= */}
      {/* MODAL: VISUALIZAÇÃO COMPLETA DE CURRÍCULO (FORMULÁRIO / FICHA DETALHADA) */}
      {/* ========================================================================= */}
      {selectedResumeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sky-500/20 text-sky-300 border border-sky-500/30 mb-1.5">
                  <Layers className="w-3 h-3" /> Ficha Profissional Estruturada
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  {selectedResumeModal.name}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  {selectedResumeModal.role_interest} &bull; {selectedResumeModal.experience_level || "Geral"}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedResumeModal(null)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="space-y-4 text-xs sm:text-sm">
              
              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">E-mail</span>
                  <a href={`mailto:${selectedResumeModal.email}`} className="text-sky-400 font-semibold hover:underline">
                    {selectedResumeModal.email}
                  </a>
                </div>

                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">WhatsApp</span>
                  <a
                    href={`https://wa.me/${selectedResumeModal.phone?.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 font-semibold hover:underline"
                  >
                    {selectedResumeModal.phone || "Não informado"}
                  </a>
                </div>

                {selectedResumeModal.work_model && (
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Modelo Preferido</span>
                    <span className="text-slate-200 font-medium">{selectedResumeModal.work_model}</span>
                  </div>
                )}

                {selectedResumeModal.salary_expectation && (
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Pretensão</span>
                    <span className="text-emerald-300 font-semibold">{selectedResumeModal.salary_expectation}</span>
                  </div>
                )}
              </div>

              {/* Links */}
              {(selectedResumeModal.linkedin_url || selectedResumeModal.github_portfolio_url) && (
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Links &amp; Portfólio</span>
                  <div className="flex flex-wrap gap-3">
                    {selectedResumeModal.linkedin_url && (
                      <a
                        href={selectedResumeModal.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1.5"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> LinkedIn
                      </a>
                    )}
                    {selectedResumeModal.github_portfolio_url && (
                      <a
                        href={selectedResumeModal.github_portfolio_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1.5"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> GitHub / Portfólio
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Skills */}
              {selectedResumeModal.skills && (
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Habilidades &amp; Tecnologias</span>
                  <div className="text-slate-200 leading-relaxed font-mono text-xs">
                    {selectedResumeModal.skills}
                  </div>
                </div>
              )}

              {/* Summary */}
              {selectedResumeModal.summary && (
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Resumo Profissional &amp; Experiências</span>
                  <p className="text-slate-200 leading-relaxed whitespace-pre-wrap">
                    {selectedResumeModal.summary}
                  </p>
                </div>
              )}

            </div>

            {/* Modal Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" /> Imprimir Ficha
              </button>

              <div className="flex items-center gap-2">
                {selectedResumeModal.phone && (
                  <a
                    href={`https://wa.me/${selectedResumeModal.phone.replace(/\D/g, "")}?text=Ol%C3%A1%20${encodeURIComponent(
                      selectedResumeModal.name
                    )}!%20Sou%20da%20equipe%20da%20Vetor%20Estrat%C3%A9gico.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all"
                  >
                    <MessageCircle className="w-3.5 h-3.5" /> Chamar no WhatsApp
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setSelectedResumeModal(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
                >
                  Fechar
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
