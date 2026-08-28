"use client";

import React, { useState, useRef, useEffect } from "react";
import { CAREER_POSITIONS } from "@/lib/constants";
import {
  FileText,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Sparkles,
  Send,
  User,
  Mail,
  Phone,
  Briefcase,
  Link as LinkIcon,
  X,
  FileCheck,
  Building2,
  Code2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CareerApplicationFormProps {
  initialRole?: string;
}

export const CareerApplicationForm: React.FC<CareerApplicationFormProps> = ({ initialRole }) => {
  const [submissionMode, setSubmissionMode] = useState<"PDF_UPLOAD" | "WEB_FORM">("PDF_UPLOAD");

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [roleInterest, setRoleInterest] = useState(initialRole || "dev-frontend-nextjs");
  const [experienceLevel, setExperienceLevel] = useState("Pleno");
  const [workModel, setWorkModel] = useState("100% Remoto (PJ)");
  const [salaryExpectation, setSalaryExpectation] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [githubPortfolioUrl, setGithubPortfolioUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [skills, setSkills] = useState("");

  // PDF upload state
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Submission statuses
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (initialRole) {
      setRoleInterest(initialRole);
    }
  }, [initialRole]);

  const handleFileChange = (file: File | null) => {
    setFileError(null);
    if (!file) {
      setPdfFile(null);
      return;
    }

    const isPdf = file.name.toLowerCase().endsWith(".pdf") || file.type.toLowerCase().includes("pdf");
    if (!isPdf) {
      setFileError("Formato não aceito. Por favor, envie estritamente arquivos em formato PDF (.pdf).");
      setPdfFile(null);
      return;
    }

    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_SIZE) {
      setFileError("Arquivo muito grande. O tamanho máximo permitido para o PDF é de 5MB.");
      setPdfFile(null);
      return;
    }

    setPdfFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!name.trim()) {
      setErrorMessage("Por favor, informe seu nome completo.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMessage("Por favor, informe um endereço de e-mail válido.");
      return;
    }
    if (!phone.trim()) {
      setErrorMessage("Por favor, informe seu WhatsApp para contato rápido.");
      return;
    }
    if (!roleInterest) {
      setErrorMessage("Por favor, selecione a área ou vaga de seu interesse.");
      return;
    }

    if (submissionMode === "PDF_UPLOAD" && !pdfFile) {
      setErrorMessage("Por favor, anexe seu currículo em formato PDF.");
      return;
    }

    if (submissionMode === "WEB_FORM" && !summary.trim() && !skills.trim()) {
      setErrorMessage("Por favor, descreva brevemente seu resumo profissional e suas principais habilidades.");
      return;
    }

    setLoading(true);

    try {
      const selectedRoleObj = CAREER_POSITIONS.find((p) => p.id === roleInterest);
      const roleTitle = selectedRoleObj ? selectedRoleObj.title : roleInterest;

      let res: Response;

      if (submissionMode === "PDF_UPLOAD" && pdfFile) {
        const formData = new FormData();
        formData.append("name", name.trim());
        formData.append("email", email.trim().toLowerCase());
        formData.append("phone", phone.trim());
        formData.append("role_interest", roleTitle);
        formData.append("experience_level", experienceLevel);
        formData.append("work_model", workModel);
        formData.append("salary_expectation", salaryExpectation.trim());
        formData.append("linkedin_url", linkedinUrl.trim());
        formData.append("github_portfolio_url", githubPortfolioUrl.trim());
        formData.append("summary", summary.trim());
        formData.append("skills", skills.trim());
        formData.append("resume_file", pdfFile);

        res = await fetch("/api/careers/submit", {
          method: "POST",
          body: formData,
        });
      } else {
        res = await fetch("/api/careers/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            phone: phone.trim(),
            role_interest: roleTitle,
            experience_level: experienceLevel,
            work_model: workModel,
            salary_expectation: salaryExpectation.trim(),
            linkedin_url: linkedinUrl.trim(),
            github_portfolio_url: githubPortfolioUrl.trim(),
            summary: summary.trim(),
            skills: skills.trim(),
            submission_type: "WEB_FORM",
          }),
        });
      }

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || "Erro ao processar o envio do currículo.");
      }

      setIsSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || "Ocorreu um erro ao enviar seu currículo. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setPhone("");
    setLinkedinUrl("");
    setGithubPortfolioUrl("");
    setSummary("");
    setSkills("");
    setSalaryExpectation("");
    setPdfFile(null);
    setIsSubmitted(false);
    setErrorMessage(null);
  };

  if (isSubmitted) {
    return (
      <div className="rounded-3xl bg-white border border-emerald-200 p-8 sm:p-12 shadow-2xl text-center space-y-6 max-w-2xl mx-auto">
        <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200 shadow-sm">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
            Currículo Recebido com Sucesso!
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
            Obrigado pelo interesse em fazer parte da <strong>Vetor Estratégico</strong>, <span className="font-bold text-slate-900">{name}</span>. Seu perfil foi integrado com prioridade ao nosso banco de talentos.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 text-left space-y-1.5">
          <strong className="text-slate-900 block font-bold">O que acontece agora?</strong>
          <p>
            Nossa equipe técnica e liderança avalia os currículos conforme o avanço de novos projetos. Entraremos em contato via WhatsApp ou e-mail assim que houver alinhamento com a vaga.
          </p>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all cursor-pointer shadow-md"
          >
            Enviar Outra Candidatura
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-10 shadow-xl relative overflow-hidden">
      
      {/* Top Selector Mode: PDF vs Web Form */}
      <div className="space-y-4 pb-6 border-b border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              Envio de Candidatura &bull; Banco de Talentos
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Escolha como prefere enviar seu perfil para a equipe
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="inline-flex p-1 rounded-2xl bg-slate-100 border border-slate-200 shrink-0">
            <button
              type="button"
              onClick={() => setSubmissionMode("PDF_UPLOAD")}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                submissionMode === "PDF_UPLOAD"
                  ? "bg-white text-emerald-700 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Arquivo PDF</span>
            </button>

            <button
              type="button"
              onClick={() => setSubmissionMode("WEB_FORM")}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                submissionMode === "WEB_FORM"
                  ? "bg-white text-sky-700 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Preencher Online</span>
            </button>
          </div>
        </div>

        {/* Warning Notice about PDF Format */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
          <FileCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <span>
            {submissionMode === "PDF_UPLOAD" ? (
              <>
                <strong>Atenção:</strong> Aceitamos estritamente arquivos em formato <strong>PDF (.pdf até 5MB)</strong>. Caso seu currículo esteja em outro formato, utilize a aba <em>&ldquo;Preencher Online&rdquo;</em>.
              </>
            ) : (
              <>
                <strong>Preenchimento Rápido:</strong> Ideal caso você não tenha seu PDF no dispositivo neste momento. Os dados serão gerados e disponibilizados na íntegra para avaliação técnica.
              </>
            )}
          </span>
        </div>
      </div>

      {errorMessage && (
        <div className="my-4 p-3.5 rounded-2xl bg-red-50 border border-red-200 flex items-center gap-3 text-xs text-red-700 font-medium">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="space-y-6 pt-4">
        
        {/* Basic Personal Data */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Nome Completo *
            </label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="Seu nome e sobrenome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-emerald-500 transition-colors"
              />
              <User className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              E-mail de Contato *
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="seu.email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-emerald-500 transition-colors"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              WhatsApp / Telefone *
            </label>
            <div className="relative">
              <input
                type="tel"
                required
                placeholder="(11) 99999-9999"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-emerald-500 transition-colors"
              />
              <Phone className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Role and Experience selection */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Vaga / Área de Interesse *
            </label>
            <select
              value={roleInterest}
              onChange={(e) => setRoleInterest(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-500 transition-colors"
            >
              {CAREER_POSITIONS.map((pos) => (
                <option key={pos.id} value={pos.id}>
                  {pos.title} ({pos.department})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Nível de Experiência
            </label>
            <select
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-500 transition-colors"
            >
              <option value="Estágio / Júnior">Estágio / Júnior</option>
              <option value="Pleno">Pleno</option>
              <option value="Sênior">Sênior</option>
              <option value="Especialista / Lead">Especialista / Lead</option>
            </select>
          </div>
        </div>

        {/* Online Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Perfil LinkedIn (Opcional)
            </label>
            <div className="relative">
              <input
                type="url"
                placeholder="https://linkedin.com/in/seuperfil"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-emerald-500 transition-colors"
              />
              <LinkIcon className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              GitHub / Portfólio / Site (Opcional)
            </label>
            <div className="relative">
              <input
                type="url"
                placeholder="https://github.com/usuario ou link do portfólio"
                value={githubPortfolioUrl}
                onChange={(e) => setGithubPortfolioUrl(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-emerald-500 transition-colors"
              />
              <Briefcase className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* MODE SPECIFIC SECTIONS */}

        {/* 1. PDF Upload Area */}
        {submissionMode === "PDF_UPLOAD" && (
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Anexar Arquivo do Currículo (Apenas PDF) *
            </label>

            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center transition-all cursor-pointer ${
                isDragging
                  ? "border-emerald-500 bg-emerald-50/50"
                  : pdfFile
                  ? "border-emerald-400 bg-emerald-50/30"
                  : "border-slate-300 hover:border-emerald-400 hover:bg-slate-50/50 bg-slate-50/20"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileChange(e.target.files[0]);
                  }
                }}
              />

              {pdfFile ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-emerald-200 max-w-md mx-auto shadow-xs">
                  <div className="flex items-center gap-3 text-left">
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm font-bold text-slate-900 block truncate max-w-[200px] sm:max-w-xs">
                        {pdfFile.name}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {(pdfFile.size / (1024 * 1024)).toFixed(2)} MB &bull; PDF Válido
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPdfFile(null);
                    }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    title="Remover arquivo"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-slate-800 block">
                      Clique para selecionar ou arraste seu arquivo PDF aqui
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Formato exclusivo: <strong>PDF (.pdf)</strong> &bull; Tamanho máximo: 5MB
                    </span>
                  </div>
                </div>
              )}
            </div>

            {fileError && (
              <p className="text-xs text-red-600 font-medium flex items-center gap-1.5 mt-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {fileError}
              </p>
            )}

            {/* Optional message when sending PDF */}
            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Mensagem ou Apresentação Breve (Opcional)
              </label>
              <textarea
                rows={2}
                placeholder="Conte brevemente por que você gostaria de atuar na Vetor Estratégico..."
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>
        )}

        {/* 2. Structured Web Form Area */}
        {submissionMode === "WEB_FORM" && (
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Resumo da sua Trajetória Profissional & Experiências *
              </label>
              <textarea
                rows={4}
                required
                placeholder="Descreva suas principais experiências anteriores, empresas/projetos onde atuou e resultados que gerou..."
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Principais Tecnologias & Competências Técnicas *
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Next.js, React, TypeScript, Tailwind, Python, n8n, WhatsApp API, Copywriting, etc."
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  Modelo de Trabalho Preferido
                </label>
                <select
                  value={workModel}
                  onChange={(e) => setWorkModel(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-500 transition-colors"
                >
                  <option value="100% Remoto (PJ)">100% Remoto (PJ)</option>
                  <option value="Remoto / Flexível">Remoto / Flexível</option>
                  <option value="Freelancer por Projeto">Freelancer por Projeto</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  Pretensão Salarial / Hora (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ex: R$ 4.000 a R$ 6.000 / mês ou R$ 50/h"
                  value={salaryExpectation}
                  onChange={(e) => setSalaryExpectation(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-4 border-t border-slate-100">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base py-3.5 rounded-full transition-all shadow-lg shadow-emerald-600/25 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-98"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Enviando Candidatura...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Enviar Currículo para o Banco de Talentos
              </>
            )}
          </button>
          <span className="text-[11px] text-slate-400 block text-center mt-2">
            Seus dados são tratados com sigilo profissional em conformidade com a LGPD.
          </span>
        </div>

      </form>
    </div>
  );
};
