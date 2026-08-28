"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { COMPANY_INFO } from "@/lib/constants";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Globe,
  Building2,
  User,
  Phone,
  Mail,
  ShieldCheck,
  Check,
  MessageCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BudgetEstimatorProps {
  onComplete?: () => void;
  className?: string;
}

export const BudgetEstimatorQuiz: React.FC<BudgetEstimatorProps> = ({ onComplete, className = "" }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 9;

  // Form State
  const [nome, setNome] = useState("");
  const [nomeError, setNomeError] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [telefone, setTelefone] = useState("");
  const [telefoneError, setTelefoneError] = useState("");

  const [tipoDemanda, setTipoDemanda] = useState<"pj" | "pf">("pj");
  const [situacaoSite, setSituacaoSite] = useState<"novo" | "reformular">("novo");
  const [tipoProjeto, setTipoProjeto] = useState<"lp" | "institucional" | "site_ia" | "custom">("institucional");

  const [features, setFeatures] = useState<string[]>([
    "SEO Otimizado para o Google",
    "Botão WhatsApp & Formulário de Leads",
  ]);

  const [prazo, setPrazo] = useState<"urgente" | "normal" | "planejando">("normal");
  const [feedbackPreco, setFeedbackPreco] = useState<string>("Dentro do que planejava investir");
  const [infoAdicional, setInfoAdicional] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Phone masking
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 11) val = val.slice(0, 11);
    if (val.length > 6) {
      val = `(${val.slice(0, 2)}) ${val.slice(2, 7)}-${val.slice(7)}`;
    } else if (val.length > 2) {
      val = `(${val.slice(0, 2)}) ${val.slice(2)}`;
    }
    setTelefone(val);
    if (telefoneError) setTelefoneError("");
  };

  // Step 1: Validate Name
  const validateAndNextName = () => {
    const clean = nome.trim().toLowerCase();
    if (clean.length < 3 || clean === "teste" || clean === "test" || clean === "asdf" || clean === "aaa" || clean === "abc") {
      setNomeError("⚠️ Esse nome não parece correto, por favor digite seu nome real.");
      return;
    }
    setNomeError("");
    setStep(2);
  };

  // Step 2: Validate Email
  const validateAndNextEmail = () => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email.trim())) {
      setEmailError("⚠️ Por favor, informe um endereço de e-mail válido.");
      return;
    }
    setEmailError("");
    setStep(3);
  };

  // Step 3: Validate Phone
  const validateAndNextPhone = () => {
    const raw = telefone.replace(/\D/g, "");
    if (raw.length < 10) {
      setTelefoneError("⚠️ Por favor, digite um WhatsApp com DDD válido (ex: 11 99999-9999).");
      return;
    }
    setTelefoneError("");
    setStep(4);
  };

  // Toggle Features
  const toggleFeature = (feat: string) => {
    if (features.includes(feat)) {
      setFeatures(features.filter((f) => f !== feat));
    } else {
      setFeatures([...features, feat]);
    }
  };

  // Dynamic Price Range Calculation (Valores promocionais / metade do investimento)
  const calculateEstimate = () => {
    let min = 1100;
    let max = 1700;

    if (tipoProjeto === "lp") {
      min = 900;
      max = 1400;
    } else if (tipoProjeto === "institucional") {
      min = 1600;
      max = 2400;
    } else if (tipoProjeto === "site_ia") {
      min = 2400;
      max = 3900;
    } else if (tipoProjeto === "custom") {
      min = 3250;
      max = 5750;
    }

    if (features.includes("Agente de IA no WhatsApp 24/7") && tipoProjeto !== "site_ia") {
      min += 600;
      max += 900;
    }
    if (features.includes("Integração com CRM / ERP")) {
      min += 250;
      max += 400;
    }
    if (features.includes("Área de Membros / Catálogo")) {
      min += 400;
      max += 750;
    }

    if (prazo === "urgente") {
      min += 200;
      max += 300;
    }

    return { min, max, monthlyMaintenance: 147 };
  };

  const estimate = calculateEstimate();

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    const summaryData = {
      name: nome,
      email: email,
      phone: telefone,
      demand_type: tipoDemanda === "pj" ? "Empresarial (Pessoa Jurídica)" : "Pessoal (Pessoa Física)",
      current_situation: situacaoSite === "novo" ? "Primeiro site" : "Reformulação de site",
      project_type:
        tipoProjeto === "lp"
          ? "Landing Page de Captação"
          : tipoProjeto === "institucional"
          ? "Site Institucional Completo"
          : tipoProjeto === "site_ia"
          ? "Site Institucional + IA WhatsApp"
          : "Portal Corporativo / E-commerce",
      selected_features: features.join(", "),
      timeline: prazo,
      estimated_range: `R$ ${estimate.min.toLocaleString("pt-BR")} a R$ ${estimate.max.toLocaleString("pt-BR")}`,
      monthly_maintenance: `R$ ${estimate.monthlyMaintenance}/mês`,
      price_feedback: feedbackPreco,
      additional_notes: infoAdicional,
      page_source: "/orcamento",
    };

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nome,
          email: email,
          phone: telefone,
          company_name: `${nome} (${summaryData.demand_type})`,
          main_pain: `Orçamento de Site: ${summaryData.project_type} (Estimativa: ${summaryData.estimated_range} + R$ 147/mês manutenção)`,
          message: `Escopo: ${summaryData.project_type} | Situação: ${summaryData.current_situation} | Recursos: ${summaryData.selected_features} | Prazo: ${prazo} | Feedback Preço: ${feedbackPreco} | Manutenção: R$ 147/mês | Obs: ${infoAdicional}`,
          estimated_budget: summaryData.estimated_range,
          source_url: "/orcamento",
        }),
      });
    } catch {
      // Non-blocking fallback
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
      if (onComplete) onComplete();
    }
  };

  const getWhatsAppProposalUrl = () => {
    const msg = `Olá, Equipe Vetor! Meu nome é ${nome}. Acabei de simular o orçamento no site:\n\n` +
      `📌 *Projeto:* ${tipoProjeto === "lp" ? "Landing Page de Captação" : tipoProjeto === "institucional" ? "Site Institucional" : tipoProjeto === "site_ia" ? "Site + Agente de IA" : "Portal Customizado"}\n` +
      `🏢 *Tipo:* ${tipoDemanda === "pj" ? "Pessoa Jurídica / Empresa" : "Pessoa Física"}\n` +
      `⏱️ *Prazo:* ${prazo === "urgente" ? "Urgente (até 15 dias)" : prazo === "normal" ? "Normal (em 30 dias)" : "Planejamento futuro"}\n` +
      `💰 *Investimento estimado:* R$ ${estimate.min.toLocaleString("pt-BR")} a R$ ${estimate.max.toLocaleString("pt-BR")}\n` +
      `🔧 *Manutenção básica:* R$ 147/mês (para manter no ar, seguro e atualizado)\n\n` +
      `Gostaria de formalizar minha proposta personalizada!`;
    return `https://wa.me/${COMPANY_INFO.rawPhone}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className={`w-full max-w-2xl mx-auto rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-10 relative overflow-hidden text-slate-900 ${className}`}>
      
      {!isSubmitted && (
        <div className="mb-8 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span>Calculadora de Orçamento</span>
            <span>Etapa {step} de {totalSteps}</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(step / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block">
                ✦ Proposta Personalizada
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight uppercase">
                Olá! Obrigado por considerar a Vetor Estratégico.
              </h2>
              <p className="text-base sm:text-lg text-slate-600">
                Vou preparar uma proposta personalizada para sua empresa. Qual é seu nome?
              </p>
            </div>

            <div className="space-y-2">
              <input
                type="text"
                autoFocus
                placeholder="Digite seu nome (ex: Marcelo Silva)"
                value={nome}
                onChange={(e) => {
                  setNome(e.target.value);
                  if (nomeError) setNomeError("");
                }}
                onKeyDown={(e) => e.key === "Enter" && validateAndNextName()}
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-slate-200 text-lg font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all shadow-inner"
              />
              {nomeError && (
                <p className="text-xs font-bold text-rose-600 flex items-center gap-1.5">
                  {nomeError}
                </p>
              )}
            </div>

            <Button
              type="button"
              onClick={validateAndNextName}
              variant="primary"
              size="lg"
              className="w-full font-bold text-base py-4 rounded-full shadow-lg shadow-emerald-600/20"
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              Continuar
            </Button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block">
                ✦ Obrigado, {nome.split(" ")[0]}!
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight uppercase">
                Preciso do seu e-mail
              </h2>
              <p className="text-base sm:text-lg text-slate-600">
                Nossa equipe irá analisar seu projeto e enviar a melhor solução para você.
              </p>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Mail className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  autoFocus
                  placeholder="seuemail@empresa.com.br"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError("");
                  }}
                  onKeyDown={(e) => e.key === "Enter" && validateAndNextEmail()}
                  className="w-full pl-12 pr-5 py-4 rounded-2xl bg-slate-50 border-2 border-slate-200 text-lg font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all shadow-inner"
                />
              </div>
              {emailError && (
                <p className="text-xs font-bold text-rose-600 flex items-center gap-1.5">
                  {emailError}
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                onClick={() => setStep(1)}
                variant="secondary"
                size="lg"
                className="rounded-full px-6"
                leftIcon={<ArrowLeft className="w-4 h-4" />}
              >
                Voltar
              </Button>
              <Button
                type="button"
                onClick={validateAndNextEmail}
                variant="primary"
                size="lg"
                className="flex-1 font-bold text-base py-4 rounded-full shadow-lg shadow-emerald-600/20"
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                Continuar
              </Button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block">
                ✦ Contato Direto
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight uppercase">
                Qual é o seu telefone / WhatsApp, {nome.split(" ")[0]}?
              </h2>
              <p className="text-base sm:text-lg text-slate-600">
                Assim podemos ligar ou enviar uma mensagem caso surja alguma dúvida sobre seu orçamento.
              </p>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Phone className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="tel"
                  autoFocus
                  placeholder="(11) 99999-9999"
                  value={telefone}
                  onChange={handlePhoneChange}
                  onKeyDown={(e) => e.key === "Enter" && validateAndNextPhone()}
                  className="w-full pl-12 pr-5 py-4 rounded-2xl bg-slate-50 border-2 border-slate-200 text-lg font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all shadow-inner"
                />
              </div>
              {telefoneError && (
                <p className="text-xs font-bold text-rose-600 flex items-center gap-1.5">
                  {telefoneError}
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                onClick={() => setStep(2)}
                variant="secondary"
                size="lg"
                className="rounded-full px-6"
                leftIcon={<ArrowLeft className="w-4 h-4" />}
              >
                Voltar
              </Button>
              <Button
                type="button"
                onClick={validateAndNextPhone}
                variant="primary"
                size="lg"
                className="flex-1 font-bold text-base py-4 rounded-full shadow-lg shadow-emerald-600/20"
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                Continuar
              </Button>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block">
                ✦ Perfeito {nome.split(" ")[0]}!
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight uppercase">
                É uma demanda empresarial ou pessoal?
              </h2>
              <p className="text-base sm:text-lg text-slate-600">
                Só preciso entender melhor seu projeto para calcular o investimento exato.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3.5">
              <button
                type="button"
                onClick={() => {
                  setTipoDemanda("pj");
                  setStep(5);
                }}
                className={`p-5 rounded-2xl border-2 text-left flex items-center gap-4 transition-all duration-200 group cursor-pointer ${
                  tipoDemanda === "pj"
                    ? "bg-emerald-50/80 border-emerald-500 shadow-md"
                    : "bg-slate-50 border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-emerald-600 shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-base sm:text-lg font-bold text-slate-900">
                    Demanda Empresarial (Pessoa Jurídica / PME / Empresa)
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Para empresas com CNPJ, clínicas, escritórios e comércios que precisam de presença digital sólida.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setTipoDemanda("pf");
                  setStep(5);
                }}
                className={`p-5 rounded-2xl border-2 text-left flex items-center gap-4 transition-all duration-200 group cursor-pointer ${
                  tipoDemanda === "pf"
                    ? "bg-emerald-50/80 border-emerald-500 shadow-md"
                    : "bg-slate-50 border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-sky-600 shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-base sm:text-lg font-bold text-slate-900">
                    Demanda Pessoal (Profissional Liberal / Pessoa Física)
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Para médicos, advogados, consultores ou especialistas autônomos buscando posicionamento profissional.
                  </p>
                </div>
              </button>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                onClick={() => setStep(3)}
                variant="secondary"
                size="lg"
                className="rounded-full px-6"
                leftIcon={<ArrowLeft className="w-4 h-4" />}
              >
                Voltar
              </Button>
            </div>
          </motion.div>
        )}

        {step === 5 && (
          <motion.div
            key="step5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block">
                ✦ Legal, {nome.split(" ")[0]}!
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight uppercase">
                Você já tem um site para o seu projeto ou será o primeiro?
              </h2>
              <p className="text-base sm:text-lg text-slate-600">
                Defina o ponto de partida do seu projeto.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3.5">
              <button
                type="button"
                onClick={() => {
                  setSituacaoSite("novo");
                  setStep(6);
                }}
                className={`p-5 rounded-2xl border-2 text-left flex items-center gap-4 transition-all duration-200 group cursor-pointer ${
                  situacaoSite === "novo"
                    ? "bg-emerald-50/80 border-emerald-500 shadow-md"
                    : "bg-slate-50 border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-emerald-600 shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-base sm:text-lg font-bold text-slate-900">
                    Não tenho site, será o primeiro (Começando do zero)
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Criaremos toda a identidade, estrutura de domínio e páginas de alta conversão.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSituacaoSite("reformular");
                  setStep(6);
                }}
                className={`p-5 rounded-2xl border-2 text-left flex items-center gap-4 transition-all duration-200 group cursor-pointer ${
                  situacaoSite === "reformular"
                    ? "bg-emerald-50/80 border-emerald-500 shadow-md"
                    : "bg-slate-50 border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-sky-600 shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-base sm:text-lg font-bold text-slate-900">
                    Já tenho um site, mas quero reformular e modernizar
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Migração para tecnologia moderna (Next.js), mais velocidade no celular e mais vendas.
                  </p>
                </div>
              </button>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                onClick={() => setStep(4)}
                variant="secondary"
                size="lg"
                className="rounded-full px-6"
                leftIcon={<ArrowLeft className="w-4 h-4" />}
              >
                Voltar
              </Button>
            </div>
          </motion.div>
        )}

        {step === 6 && (
          <motion.div
            key="step6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block">
                ✦ Ótimo, {nome.split(" ")[0]}!
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight uppercase">
                O que descreve melhor sua necessidade?
              </h2>
              <p className="text-base sm:text-lg text-slate-600">
                Trabalhamos de formas diferentes dependendo do momento e objetivo de cada negócio.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {[
                {
                  id: "lp",
                  title: "Quero começar com entrega ágil (Landing Page Express)",
                  desc: "Página única vendedora para colher resultados rapidamente em campanhas de tráfego e WhatsApp.",
                  badge: "Entrega Rápida",
                },
                {
                  id: "institucional",
                  title: "Quero profissionalizar minha presença digital completa (Site Institucional)",
                  desc: "Estrutura com múltiplas páginas, catálogo de serviços, SEO para o topo do Google e autoridade máxima.",
                  badge: "Mais Recomendado",
                },
                {
                  id: "site_ia",
                  title: "Site Institucional + Agente de IA de Atendimento 24/7",
                  desc: "Site completo com atendente inteligente no WhatsApp que qualifica leads e agenda clientes automaticamente.",
                  badge: "Alta Performance",
                },
                {
                  id: "custom",
                  title: "Portal Corporativo / E-commerce / Plataforma Customizada",
                  desc: "Projetos robustos com catálogo de produtos, área de membros ou integrações avançadas de sistemas.",
                  badge: "Enterprise",
                },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setTipoProjeto(item.id as any);
                    setStep(7);
                  }}
                  className={`p-4 sm:p-5 rounded-2xl border-2 text-left flex items-start justify-between gap-4 transition-all duration-200 group cursor-pointer ${
                    tipoProjeto === item.id
                      ? "bg-emerald-50/80 border-emerald-500 shadow-md"
                      : "bg-slate-50 border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {item.title}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <span className="text-[10px] uppercase font-bold px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 shrink-0">
                    {item.badge}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                onClick={() => setStep(5)}
                variant="secondary"
                size="lg"
                className="rounded-full px-6"
                leftIcon={<ArrowLeft className="w-4 h-4" />}
              >
                Voltar
              </Button>
            </div>
          </motion.div>
        )}

        {step === 7 && (
          <motion.div
            key="step7"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block">
                ✦ Recursos &amp; Prazos
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight uppercase">
                Quais recursos adicionais você gostaria de incluir?
              </h2>
              <p className="text-base sm:text-lg text-slate-600">
                Selecione as funcionalidades desejadas (marque quantas quiser):
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                "Agente de IA no WhatsApp 24/7",
                "SEO Otimizado para o Google",
                "Integração com CRM / ERP",
                "Blog Corporativo & Artigos",
                "Área de Membros / Catálogo",
                "Botão WhatsApp & Formulário de Leads",
              ].map((feat) => {
                const isSelected = features.includes(feat);
                return (
                  <button
                    key={feat}
                    type="button"
                    onClick={() => toggleFeature(feat)}
                    className={`p-3.5 rounded-xl border text-left flex items-center gap-3 transition-all text-xs sm:text-sm font-semibold cursor-pointer ${
                      isSelected
                        ? "bg-emerald-50 border-emerald-400 text-emerald-900 shadow-xs"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 border ${
                        isSelected ? "bg-emerald-600 border-emerald-600 text-white" : "border-slate-300 bg-white"
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <span>{feat}</span>
                  </button>
                );
              })}
            </div>

            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                Qual é a sua urgência para o lançamento?
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "urgente", label: "Urgente (até 15 dias)" },
                  { id: "normal", label: "Normal (30 dias)" },
                  { id: "planejando", label: "Nos próximos meses" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPrazo(item.id as any)}
                    className={`p-3 rounded-xl border text-center text-xs font-bold transition-all cursor-pointer ${
                      prazo === item.id
                        ? "bg-emerald-600 border-emerald-600 text-white shadow-xs"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                onClick={() => setStep(6)}
                variant="secondary"
                size="lg"
                className="rounded-full px-6"
                leftIcon={<ArrowLeft className="w-4 h-4" />}
              >
                Voltar
              </Button>
              <Button
                type="button"
                onClick={() => setStep(8)}
                variant="primary"
                size="lg"
                className="flex-1 font-bold text-base py-4 rounded-full shadow-lg shadow-emerald-600/20"
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                Ver Estimativa de Investimento
              </Button>
            </div>
          </motion.div>
        )}

        {step === 8 && (
          <motion.div
            key="step8"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <Badge variant="gold" size="md">
                ✦ Estimativa de Investimento Calculada
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase">
                Resultado para seu projeto, {nome.split(" ")[0]}!
              </h2>
              <p className="text-sm text-slate-600 max-w-lg mx-auto">
                Obrigado pelas respostas! Com essas informações conseguimos te passar uma idéia clara de investimento:
              </p>
            </div>

            {/* Price Box Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0A192F] to-[#04101E] text-white border border-sky-500/30 text-center space-y-4 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <span className="text-xs uppercase tracking-widest font-extrabold text-emerald-400 block">
                Investimento sob medida para o seu projeto
              </span>

              <div className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                R$ {estimate.min.toLocaleString("pt-BR")}{" "}
                <span className="text-slate-400 font-normal text-2xl sm:text-3xl">a</span>{" "}
                R$ {estimate.max.toLocaleString("pt-BR")}
              </div>

              {/* Maintenance Fee Callout */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+ Manutenção e hospedagem básica: apenas R$ 147/mês para mantê-lo no ar e seguro</span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Desenvolvimento em tecnologia moderna de alta velocidade (Next.js), 100% responsivo para celular, com SEO e integração direta ao WhatsApp.
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs text-emerald-300 font-semibold border-t border-white/10">
                <span>💳 Parcelamento em até 12x no cartão</span>
                <span>•</span>
                <span>📄 Boleto bancário disponível</span>
              </div>
            </div>

            {/* Authority Reinforcement */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong>Condições especiais:</strong> Valores promocionais para início de projeto. Ao aprovar sua proposta, sua empresa garante a taxa de manutenção de R$ 147/mês com suporte técnico e estabilidade em nuvem.
              </div>
            </div>

            {/* Client Reaction / Feedback */}
            <div className="space-y-2 text-left">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Sobre essa estimativa de investimentos para ter seu projeto pronto, você diria que:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  "Dentro do que planejava investir",
                  "Não está fora da realidade, mas preciso avaliar melhor",
                  "Gostaria de negociar condições",
                ].map((fb) => (
                  <button
                    key={fb}
                    type="button"
                    onClick={() => setFeedbackPreco(fb)}
                    className={`p-3 rounded-xl border text-center text-xs font-bold transition-all cursor-pointer ${
                      feedbackPreco === fb
                        ? "bg-emerald-600 border-emerald-600 text-white shadow-xs"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {fb}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                onClick={() => setStep(7)}
                variant="secondary"
                size="lg"
                className="rounded-full px-6"
                leftIcon={<ArrowLeft className="w-4 h-4" />}
              >
                Ajustar Escopo
              </Button>
              <Button
                type="button"
                onClick={() => setStep(9)}
                variant="primary"
                size="lg"
                className="flex-1 font-bold text-base py-4 rounded-full shadow-lg shadow-emerald-600/20"
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                Avançar para Conclusão
              </Button>
            </div>
          </motion.div>
        )}

        {step === 9 && !isSubmitted && (
          <motion.div
            key="step9"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block">
                ✦ Quase Pronto!
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight uppercase">
                Por último, gostaria de incluir alguma informação adicional?
              </h2>
              <p className="text-base sm:text-lg text-slate-600">
                Sites de referência, funcionalidades específicas ou detalhes do seu negócio (opcional).
              </p>
            </div>

            <textarea
              rows={3}
              placeholder="Ex: Gostamos do estilo visual do site X, queremos focar em captação de clientes para o serviço Y..."
              value={infoAdicional}
              onChange={(e) => setInfoAdicional(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all shadow-inner"
            />

            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-slate-700 space-y-1">
              <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Resumo da Proposta:
              </div>
              <p>
                <strong>Cliente:</strong> {nome} ({email} | {telefone})
              </p>
              <p>
                <strong>Investimento do Projeto:</strong> R$ {estimate.min.toLocaleString("pt-BR")} a R$ {estimate.max.toLocaleString("pt-BR")}
              </p>
              <p>
                <strong>Manutenção Básica:</strong> R$ 147/mês (hospedagem em nuvem, SSL e suporte)
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                onClick={() => setStep(8)}
                variant="secondary"
                size="lg"
                className="rounded-full px-6"
                leftIcon={<ArrowLeft className="w-4 h-4" />}
              >
                Voltar
              </Button>
              <Button
                type="button"
                onClick={handleFinalSubmit}
                disabled={isSubmitting}
                variant="primary"
                size="lg"
                className="flex-1 font-bold text-base py-4 rounded-full shadow-lg shadow-emerald-600/25"
                leftIcon={<Zap className="w-5 h-5 fill-white text-white" />}
              >
                {isSubmitting ? "Encaminhando dados..." : "Encaminhar Proposta para a Equipe"}
              </Button>
            </div>
          </motion.div>
        )}

        {isSubmitted && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-6 space-y-6"
          >
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 border-2 border-emerald-300 flex items-center justify-center mx-auto text-3xl shadow-lg shadow-emerald-600/20">
              ✓
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight">
                Perfeito, {nome.split(" ")[0]}!
              </h2>
              <p className="text-base sm:text-lg text-slate-600 max-w-md mx-auto">
                Já encaminhei seus dados para nossa equipe. Baseado nas suas respostas, vamos definir a melhor forma de conduzir seu projeto.
              </p>
              <p className="text-xs text-slate-500 font-semibold">
                Você receberá nosso contato em breve por WhatsApp ou e-mail. Obrigado pela confiança!
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2 text-xs sm:text-sm text-slate-700">
              <div className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5 text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Estimativa Enviada com Sucesso:
              </div>
              <p>• <strong>Investimento do Projeto:</strong> R$ {estimate.min.toLocaleString("pt-BR")} a R$ {estimate.max.toLocaleString("pt-BR")}</p>
              <p>• <strong>Manutenção Básica:</strong> R$ 147/mês (hospedagem, segurança e suporte)</p>
              <p>• <strong>Contato Cadastrado:</strong> {telefone} ({email})</p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                href={getWhatsAppProposalUrl()}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="lg"
                className="w-full sm:w-auto text-base font-bold px-8 py-4 rounded-full shadow-lg shadow-emerald-600/30"
                leftIcon={<MessageCircle className="w-5 h-5 fill-white text-white" />}
              >
                Falar com a Equipe no WhatsApp Agora
              </Button>

              <Button
                href="/"
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto text-base font-bold px-6 py-4 rounded-full"
              >
                Voltar à Home
              </Button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
};
