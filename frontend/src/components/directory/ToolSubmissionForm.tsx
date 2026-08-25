"use client";

import React, { useState } from "react";
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Send,
  AlertCircle,
  TrendingUp,
  Tag,
  Star,
  Award,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { DIRECTORY_CATEGORIES, DIRECTORY_NICHES, DIRECTORY_PRICING_FILTERS } from "@/lib/directoryData";
import { ToolSubmissionFormData } from "@/types";

export const ToolSubmissionForm: React.FC = () => {
  const [formData, setFormData] = useState<ToolSubmissionFormData>({
    toolName: "",
    websiteUrl: "",
    contactName: "",
    contactEmail: "",
    contactWhatsapp: "",
    category: "whatsapp-atendimento",
    niches: ["geral"],
    pricingType: "pme-acessivel",
    shortDescription: "",
    fullDescription: "",
    planRequested: "verified_featured",
    hasAffiliateProgram: false,
    affiliateCommissionDetails: "",
    discountCouponForVetorUsers: "",
    notes: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleNicheToggle = (nicheId: string) => {
    setFormData((prev) => {
      const current = Array.isArray(prev.niches) ? prev.niches : [];
      if (current.includes(nicheId as any)) {
        return {
          ...prev,
          niches: current.filter((item) => item !== nicheId),
        };
      } else {
        return {
          ...prev,
          niches: [...current, nicheId as any],
        };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.toolName || !formData.websiteUrl || !formData.contactEmail || !formData.contactName) {
      setErrorMessage("Por favor, preencha todos os campos obrigatórios (*).");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/directory/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || "Erro ao enviar solicitação de cadastro.");
      }

      setIsSuccess(true);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Erro ao processar o formulário. Tente novamente ou nos chame no WhatsApp.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="rounded-3xl bg-white border border-emerald-200 p-8 sm:p-12 text-center shadow-lg max-w-2xl mx-auto space-y-6">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-900">
            Proposta de Cadastro Enviada com Sucesso!
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Recebemos os dados da ferramenta <strong>{formData.toolName}</strong>. Nosso comitê técnico avaliará as funcionalidades e entraremos em contato via WhatsApp e e-mail em até <strong>24 horas úteis</strong> para ativar a listagem.
          </p>
        </div>
        <div className="pt-4">
          <Button
            variant="outline"
            size="md"
            onClick={() => {
              setIsSuccess(false);
              setFormData({
                toolName: "",
                websiteUrl: "",
                contactName: "",
                contactEmail: "",
                contactWhatsapp: "",
                category: "whatsapp-atendimento",
                niches: ["geral"],
                pricingType: "pme-acessivel",
                shortDescription: "",
                fullDescription: "",
                planRequested: "verified_featured",
                hasAffiliateProgram: false,
                affiliateCommissionDetails: "",
                discountCouponForVetorUsers: "",
                notes: "",
              });
            }}
          >
            Cadastrar Outra Solução
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-sm text-red-700 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* 1. Escolha do Modelo de Parceria / Listagem */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="emerald" size="sm">
            Passo 1
          </Badge>
          <h3 className="text-lg font-bold text-slate-900">
            Escolha o Plano de Listagem & Visibilidade
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Grátis */}
          <div
            onClick={() => setFormData({ ...formData, planRequested: "free" })}
            className={`cursor-pointer rounded-2xl p-5 border-2 transition-all duration-200 flex flex-col justify-between ${
              formData.planRequested === "free"
                ? "border-slate-800 bg-slate-50 shadow-md"
                : "border-slate-200 hover:border-slate-300 bg-white"
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase">Básico</span>
                <span className="text-xs font-extrabold text-slate-900">Grátis</span>
              </div>
              <h4 className="text-base font-bold text-slate-900">Listagem Padrão</h4>
              <p className="text-xs text-slate-600">
                Inclusão no diretório orgânico após aprovação da curadoria.
              </p>
              <ul className="text-xs text-slate-600 space-y-1.5 pt-2">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-slate-500 shrink-0" /> Link oficial no perfil
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-slate-500 shrink-0" /> Indexação no Google
                </li>
              </ul>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200 text-center">
              <span className={`text-xs font-bold ${formData.planRequested === "free" ? "text-slate-900" : "text-slate-400"}`}>
                {formData.planRequested === "free" ? "✓ Selecionado" : "Selecionar"}
              </span>
            </div>
          </div>

          {/* Card 2: Destaque & Verificado (Recomendado) */}
          <div
            onClick={() => setFormData({ ...formData, planRequested: "verified_featured" })}
            className={`cursor-pointer rounded-2xl p-5 border-2 transition-all duration-200 flex flex-col justify-between relative ${
              formData.planRequested === "verified_featured"
                ? "border-emerald-500 bg-emerald-50/50 shadow-lg ring-1 ring-emerald-500"
                : "border-slate-200 hover:border-emerald-300 bg-white"
            }`}
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full shadow-sm">
              Mais Procurado
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-700 uppercase flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verificado
                </span>
                <span className="text-xs font-extrabold text-emerald-800">Destaque</span>
              </div>
              <h4 className="text-base font-bold text-slate-900">Selo Verificado Vetor</h4>
              <p className="text-xs text-slate-600">
                Selo de auditoria técnica, topo da categoria e card com borda destacada.
              </p>
              <ul className="text-xs text-slate-700 space-y-1.5 pt-2">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Selo &quot;Verificado Vetor&quot;
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Posicionamento de Topo
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Banner de Cupom Exclusivo
                </li>
              </ul>
            </div>
            <div className="mt-4 pt-3 border-t border-emerald-200 text-center">
              <span className={`text-xs font-bold ${formData.planRequested === "verified_featured" ? "text-emerald-700" : "text-slate-400"}`}>
                {formData.planRequested === "verified_featured" ? "✓ Selecionado" : "Selecionar"}
              </span>
            </div>
          </div>

          {/* Card 3: Parceria Estratégica & Leads */}
          <div
            onClick={() => setFormData({ ...formData, planRequested: "sponsored_partner" })}
            className={`cursor-pointer rounded-2xl p-5 border-2 transition-all duration-200 flex flex-col justify-between ${
              formData.planRequested === "sponsored_partner"
                ? "border-amber-500 bg-amber-50/50 shadow-lg ring-1 ring-amber-500"
                : "border-slate-200 hover:border-amber-300 bg-white"
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-700 uppercase flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" /> Parceiro
                </span>
                <span className="text-xs font-extrabold text-amber-800">Parceria</span>
              </div>
              <h4 className="text-base font-bold text-slate-900">Parceiro Homologado</h4>
              <p className="text-xs text-slate-600">
                Recomendação ativa da sua ferramenta em nossos projetos de consultoria com PMEs.
              </p>
              <ul className="text-xs text-slate-700 space-y-1.5 pt-2">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" /> Indicação direta a clientes
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" /> Co-marketing & Artigo no Blog
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" /> Destaque no Banner da Home
                </li>
              </ul>
            </div>
            <div className="mt-4 pt-3 border-t border-amber-200 text-center">
              <span className={`text-xs font-bold ${formData.planRequested === "sponsored_partner" ? "text-amber-700" : "text-slate-400"}`}>
                {formData.planRequested === "sponsored_partner" ? "✓ Selecionado" : "Selecionar"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Informações da Ferramenta */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Badge variant="emerald" size="sm">
            Passo 2
          </Badge>
          <h3 className="text-lg font-bold text-slate-900">
            Dados da Solução / Ferramenta
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Nome da Ferramenta / Plataforma *</label>
            <input
              type="text"
              required
              placeholder="Ex: WhatsApp Bot IA"
              value={formData.toolName}
              onChange={(e) => setFormData({ ...formData, toolName: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-900"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Site Oficial (URL) *</label>
            <input
              type="url"
              required
              placeholder="https://seusite.com.br"
              value={formData.websiteUrl}
              onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-900"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Categoria Principal *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-900 bg-white"
            >
              {DIRECTORY_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Modelo de Preço *</label>
            <select
              value={formData.pricingType}
              onChange={(e) => setFormData({ ...formData, pricingType: e.target.value as any })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-900 bg-white"
            >
              {DIRECTORY_PRICING_FILTERS.map((pf) => (
                <option key={pf.id} value={pf.id}>
                  {pf.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Nichos Aplicáveis (Multi-select pills) */}
        <div className="space-y-2 pt-2">
          <label className="text-xs font-semibold text-slate-700 block">
            Nichos / Segmentos de Atuação (Selecione todos os aplicáveis):
          </label>
          <div className="flex flex-wrap gap-2">
            {DIRECTORY_NICHES.map((niche) => {
              const isSelected = Array.isArray(formData.niches) && formData.niches.includes(niche.id as any);
              return (
                <button
                  type="button"
                  key={niche.id}
                  onClick={() => handleNicheToggle(niche.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isSelected
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {niche.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-1.5 pt-2">
          <label className="text-xs font-semibold text-slate-700">Resumo da Solução (Pitch curto em 2 linhas) *</label>
          <input
            type="text"
            required
            placeholder="Ex: Agente de IA para WhatsApp que atende pacientes e agenda consultas 24h por dia."
            value={formData.shortDescription}
            onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-900"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Descrição Completa e Diferenciais Técnicos</label>
          <textarea
            rows={3}
            placeholder="Descreva as principais integrações (CRMs, ERPs, WhatsApp), recursos exclusivos e benefícios para pequenas e médias empresas..."
            value={formData.fullDescription}
            onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-900"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Cupom de Desconto para Usuários da Vetor (Opcional)</label>
            <input
              type="text"
              placeholder="Ex: VETOR15 (15% OFF)"
              value={formData.discountCouponForVetorUsers}
              onChange={(e) => setFormData({ ...formData, discountCouponForVetorUsers: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-900"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Programa de Afiliados / Parceria (Opcional)</label>
            <input
              type="text"
              placeholder="Ex: Comissionamento de 20% recorrente"
              value={formData.affiliateCommissionDetails}
              onChange={(e) => setFormData({ ...formData, affiliateCommissionDetails: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-900"
            />
          </div>
        </div>
      </div>

      {/* 3. Dados de Contato do Responsável */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Badge variant="emerald" size="sm">
            Passo 3
          </Badge>
          <h3 className="text-lg font-bold text-slate-900">
            Contato do Responsável / Fundador
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Nome do Contato *</label>
            <input
              type="text"
              required
              placeholder="Ex: Maria Eduarda"
              value={formData.contactName}
              onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-900"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">E-mail Comercial *</label>
            <input
              type="email"
              required
              placeholder="maria@plataforma.com"
              value={formData.contactEmail}
              onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-900"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">WhatsApp de Contato *</label>
            <input
              type="tel"
              required
              placeholder="(11) 98888-8888"
              value={formData.contactWhatsapp}
              onChange={(e) => setFormData({ ...formData, contactWhatsapp: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-900"
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-center pt-2">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isLoading}
          className="w-full sm:w-auto font-bold px-10 shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 mx-auto"
        >
          {isLoading ? (
            "Enviando Proposta..."
          ) : (
            <>
              <Send className="w-4 h-4" />
              Enviar Proposta de Listagem no Diretório
            </>
          )}
        </Button>
        <p className="text-xs text-slate-500 mt-2">
          Análise técnica rápida e retorno em até 24h úteis. Sem fidelidade contratual.
        </p>
      </div>
    </form>
  );
};
