"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { submitQuiz } from "@/lib/api";
import { QuizSubmissionData, QuizResultData } from "@/types";
import { COMPANY_INFO } from "@/lib/constants";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Building2,
  Users,
  AlertTriangle,
  Layers,
  Clock,
  TrendingUp,
  MessageCircle,
  ShieldCheck,
  RotateCcw
} from "lucide-react";

const SEGMENT_OPTIONS = [
  { label: "Saúde, Clínicas & Consultórios", desc: "Agendamento, confirmações e triagem de pacientes", icon: "🏥" },
  { label: "E-commerce & Varejo", desc: "Atendimento, status de pedido e recuperação de vendas", icon: "🛍️" },
  { label: "Advocacia & Serviços Jurídicos", desc: "Triagem de prazos, intimações e qualificação", icon: "⚖️" },
  { label: "Contabilidade & Finanças", desc: "Extração de notas fiscais, conciliação e documentos", icon: "📊" },
  { label: "Indústria, Logística & Distribuição", desc: "Speed to lead B2B, pedidos e cotações rápidas", icon: "🏭" },
  { label: "Imobiliária & Construção", desc: "Triagem de locatários, compradores e visitas", icon: "🏢" },
  { label: "Serviços B2B & Consultoria", desc: "Copiloto interno, propostas comerciais e CRM", icon: "💼" },
  { label: "Outro Segmento", desc: "Operação personalizada de PME", icon: "⚡" },
];

const COMPANY_SIZE_OPTIONS = [
  { label: "1 a 5 colaboradores", desc: "Equipe enxuta; donos sobrecarregados com operação" },
  { label: "6 a 20 colaboradores", desc: "Empresa em expansão; gargalos de comunicação e processos" },
  { label: "21 a 50 colaboradores", desc: "Operação estruturada com múltiplos setores e líderes" },
  { label: "Mais de 50 colaboradores", desc: "Média empresa com alta demanda de automação e integração" },
];

const BOTTLENECK_OPTIONS = [
  {
    label: "Atendimento e WhatsApp sobrecarregado",
    desc: "Clientes esperando horas por resposta, mensagens perdidas fora do expediente",
    icon: "💬"
  },
  {
    label: "Demora no retorno e qualificação de leads",
    desc: "Vendedores demoram para contatar orçamentos e perdem vendas para concorrentes",
    icon: "🎯"
  },
  {
    label: "Tarefas manuais e retrabalho de equipe",
    desc: "Digitação repetitiva de notas, relatórios manuais e conciliação em planilhas",
    icon: "📑"
  },
  {
    label: "Dificuldade com dados e relatórios",
    desc: "Falta de visão clara de indicadores, números desorganizados e decisões no 'achismo'",
    icon: "📈"
  },
];

const DIGITAL_MATURITY_OPTIONS = [
  {
    label: "Planilhas e processos manuais",
    desc: "Operação depende de controles no Excel, WhatsApp pessoal e anotações"
  },
  {
    label: "Sistemas básicos desconectados",
    desc: "Usamos software específico, mas as informações não se conversam"
  },
  {
    label: "CRM/ERP estruturado mas sem IA",
    desc: "Processos bem definidos, porém com grande dependência de digitação humana"
  },
  {
    label: "Já testamos ferramentas de IA isoladas",
    desc: "Usamos ChatGPT pontual, mas queremos automações integradas ao negócio"
  },
];

export const DiagnosticQuiz: React.FC = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  // Quiz Form State
  const [segment, setSegment] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [mainBottleneck, setMainBottleneck] = useState("");
  const [digitalMaturity, setDigitalMaturity] = useState("");

  // Contact Info
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");

  // Result state
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<QuizResultData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleNextStep = () => {
    setError(null);
    if (step === 1 && !segment) {
      setError("Selecione o segmento da sua empresa para continuar.");
      return;
    }
    if (step === 2 && !companySize) {
      setError("Selecione o tamanho da sua equipe.");
      return;
    }
    if (step === 3 && !mainBottleneck) {
      setError("Selecione o principal gargalo operacional.");
      return;
    }
    if (step === 4 && !digitalMaturity) {
      setError("Selecione o nível de maturidade digital.");
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setError(null);
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !companyName) {
      setError("Por favor, preencha todos os campos de contato para gerar o resultado.");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const payload: QuizSubmissionData = {
        segment,
        company_size: companySize,
        main_bottleneck: mainBottleneck,
        digital_maturity: digitalMaturity,
        name,
        email,
        phone,
        company_name: companyName,
        accepts_lgpd: true,
      };

      const data = await submitQuiz(payload);
      setResult(data);

      // Trigger Celebration Confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#10B981", "#06B6D4", "#F59E0B"],
        });
      } catch (cErr) {
        // Safe fallback
      }
    } catch (err: any) {
      setError(err.message || "Erro ao processar o diagnóstico. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setSegment("");
    setCompanySize("");
    setMainBottleneck("");
    setDigitalMaturity("");
    setName("");
    setEmail("");
    setPhone("");
    setCompanyName("");
    setResult(null);
    setError(null);
  };

  // Result View
  if (result) {
    const whatsappResultUrl = `https://wa.me/${COMPANY_INFO.rawPhone}?text=Ol%C3%A1%2C%20acabei%20de%20fazer%20o%20Diagn%C3%B3stico%20de%20IA%20da%20${encodeURIComponent(companyName)}%20(Score%3A%20${result.opportunity_score}%2F100)%20e%20gostaria%20de%20agendar%20uma%20reuni%C3%A3o%20para%20conversar%20sobre%20o%20plano%20de%20automa%C3%A7%C3%A3o.`;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="rounded-3xl bg-slate-950 border border-emerald-500/30 p-6 sm:p-10 shadow-2xl relative overflow-hidden"
      >
        {/* 🌌 Quantum Scanning Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onPlay={(e) => {
            e.currentTarget.playbackRate = 1.35;
          }}
          className="absolute inset-0 w-full h-full object-cover opacity-75 mix-blend-screen pointer-events-none z-0 rounded-3xl"
        >
          <source src="/Escaneamento-Quântico.mp4" type="video/mp4" />
          <source src="/Escaneamento-Qu%C3%A2ntico.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-950/15 to-slate-950/45 pointer-events-none z-0 rounded-3xl" />

        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header Result */}
        <div className="text-center space-y-3 pb-8 border-b border-white/10 relative z-10">
          <Badge variant="emerald" size="md">
            Diagnóstico Concluído com Sucesso
          </Badge>

          <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Dossiê de Oportunidade de IA para a{" "}
            <span className="gradient-text-emerald">{companyName}</span>
          </h3>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Com base nos dados fornecidos para o segmento de <strong className="text-white">{segment}</strong>, nossa inteligência calculou o seguinte potencial:
          </p>
        </div>

        {/* Highlight Score & Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-8 relative z-10">
          {/* Score Card */}
          <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-6 flex flex-col items-center justify-center text-center backdrop-blur-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-2">
              Índice de Oportunidade IA
            </span>
            <div className="text-5xl sm:text-6xl font-black text-emerald-400 my-1">
              {result.opportunity_score}
              <span className="text-2xl text-slate-500 font-normal">/100</span>
            </div>
            <span className="text-xs text-slate-400 mt-1 font-medium">
              Altíssimo retorno potencial de investimento
            </span>
          </div>

          {/* Hours Saved Card */}
          <div className="rounded-2xl bg-sky-500/10 border border-sky-500/30 p-6 flex flex-col items-center justify-center text-center backdrop-blur-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-300 mb-2">
              Estimativa de Horas Salvas
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-sky-400 my-2 flex items-center gap-2">
              <Clock className="w-7 h-7 text-sky-400" />
              {result.estimated_hours_saved_month}
            </div>
            <span className="text-xs text-slate-400 mt-1 font-medium">
              Tempo operacional liberado para a equipe
            </span>
          </div>

          {/* Maturity Level */}
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/30 p-6 flex flex-col items-center justify-center text-center backdrop-blur-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-2">
              Classificação Estratégica
            </span>
            <div className="text-base sm:text-lg font-bold text-amber-400 my-2">
              {result.maturity_level}
            </div>
            <span className="text-xs text-slate-400 mt-1 font-medium">
              Foco prioritário em Quick-Wins e ROI rápido
            </span>
          </div>
        </div>

        {/* Strategic Recommendation Details */}
        <div className="rounded-2xl bg-white/5 border border-white/10 p-6 sm:p-8 space-y-6 my-6 backdrop-blur-sm relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Plano Recomendado</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-bold text-white">
              {result.recommendation_title}
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              {result.recommendation_summary}
            </p>
          </div>

          <div className="pt-2">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Principais Entregas Recomendadas para a Operação:
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {result.key_deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-200 font-medium"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
          <Button
            href={whatsappResultUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            size="lg"
            className="w-full sm:w-auto text-sm sm:text-base font-bold shadow-emerald-glow"
            leftIcon={<MessageCircle className="w-5 h-5 fill-white" />}
          >
            Apresentar Diagnóstico ao Consultor no WhatsApp
          </Button>

          <Button
            onClick={handleReset}
            variant="ghost"
            size="sm"
            className="text-xs text-slate-400 hover:text-white"
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            Fazer Novo Diagnóstico
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-10 shadow-xl">
      {/* Progress Header */}
      <div className="mb-8 space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-500">
          <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
            <Sparkles className="w-4 h-4" />
            Etapa {step} de {totalSteps}
          </span>
          <span>{Math.round((step / totalSteps) * 100)}% Concluído</span>
        </div>

        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-emerald-500 via-sky-500 to-amber-500"
            initial={{ width: "20%" }}
            animate={{ width: `${(step / totalSteps) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3 text-red-700 text-xs font-medium">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Step Content */}
      <AnimatePresence mode="wait">
        {/* Step 1: Segment */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                Qual é o segmento de atuação da sua empresa?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Isso nos permite comparar suas métricas com empresas do mesmo setor.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SEGMENT_OPTIONS.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setSegment(item.label)}
                  className={`p-4 rounded-2xl border text-left transition-all duration-200 flex items-start gap-3.5 ${
                    segment === item.label
                      ? "bg-emerald-50 border-emerald-500 shadow-sm"
                      : "bg-slate-50/70 border-slate-200/80 hover:border-slate-300 hover:bg-slate-100/80"
                  }`}
                >
                  <span className="text-2xl shrink-0">{item.icon}</span>
                  <div className="space-y-0.5">
                    <span className="text-sm font-bold text-slate-900 block">
                      {item.label}
                    </span>
                    <span className="text-xs text-slate-600 block">
                      {item.desc}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: Company Size */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                Quantas pessoas trabalham na sua empresa atualmente?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                O porte da equipe ajuda a calcular a escala de horas operacionais recuperáveis.
              </p>
            </div>

            <div className="space-y-3">
              {COMPANY_SIZE_OPTIONS.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setCompanySize(item.label)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between ${
                    companySize === item.label
                      ? "bg-sky-50 border-sky-500 shadow-sm"
                      : "bg-slate-50/70 border-slate-200/80 hover:border-slate-300 hover:bg-slate-100/80"
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="text-sm font-bold text-slate-900 block">
                      {item.label}
                    </span>
                    <span className="text-xs text-slate-600 block">
                      {item.desc}
                    </span>
                  </div>
                  <Users className={`w-5 h-5 ${companySize === item.label ? "text-sky-600" : "text-slate-400"}`} />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 3: Main Bottleneck */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                Qual é o maior gargalo operacional ou de vendas hoje?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Onde sua empresa mais perde tempo, clientes ou dinheiro no dia a dia?
              </p>
            </div>

            <div className="space-y-3">
              {BOTTLENECK_OPTIONS.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setMainBottleneck(item.label)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all duration-200 flex items-start gap-3.5 ${
                    mainBottleneck === item.label
                      ? "bg-amber-50 border-amber-500 shadow-sm"
                      : "bg-slate-50/70 border-slate-200/80 hover:border-slate-300 hover:bg-slate-100/80"
                  }`}
                >
                  <span className="text-2xl shrink-0">{item.icon}</span>
                  <div className="space-y-0.5">
                    <span className="text-sm font-bold text-slate-900 block">
                      {item.label}
                    </span>
                    <span className="text-xs text-slate-600 block">
                      {item.desc}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 4: Digital Maturity */}
        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                Como você descreveria a maturidade tecnológica atual da empresa?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Não existe resposta errada: adequamos a IA à sua infraestrutura atual.
              </p>
            </div>

            <div className="space-y-3">
              {DIGITAL_MATURITY_OPTIONS.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setDigitalMaturity(item.label)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between ${
                    digitalMaturity === item.label
                      ? "bg-emerald-50 border-emerald-500 shadow-sm"
                      : "bg-slate-50/70 border-slate-200/80 hover:border-slate-300 hover:bg-slate-100/80"
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="text-sm font-bold text-slate-900 block">
                      {item.label}
                    </span>
                    <span className="text-xs text-slate-600 block">
                      {item.desc}
                    </span>
                  </div>
                  <Layers className={`w-5 h-5 ${digitalMaturity === item.label ? "text-emerald-600" : "text-slate-400"}`} />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 5: Contact Information & Calculation Submit */}
        {step === 5 && (
          <motion.form
            key="step5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onSubmit={handleFinalSubmit}
            className="space-y-6"
          >
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                Para onde devemos enviar seu diagnóstico completo?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                O resultado aparecerá instantaneamente nesta tela e será enviado também por WhatsApp.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Seu Nome Completo"
                placeholder="Ex: Dra. Mariana Costa"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Input
                label="Nome da Empresa"
                placeholder="Ex: Clínica Odonto Costa"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="E-mail Profissional"
                type="email"
                placeholder="mariana@clinicacosta.com.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                label="WhatsApp com DDD"
                placeholder="(11) 95309-9049"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Conforme a LGPD: seus dados são estritamente confidenciais.</span>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full justify-center text-base font-bold shadow-emerald-glow"
              isLoading={isLoading}
              rightIcon={<Sparkles className="w-4 h-4" />}
            >
              Calcular Diagnóstico & Gerar Dossiê de IA
            </Button>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Navigation Buttons for Steps 1-4 */}
      {step < 5 && (
        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrevStep}
            disabled={step === 1}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-900 disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>

          <Button
            type="button"
            onClick={handleNextStep}
            variant="primary"
            size="md"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Próxima Etapa
          </Button>
        </div>
      )}
    </div>
  );
};
