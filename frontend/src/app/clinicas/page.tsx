"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { COMPANY_INFO } from "@/lib/constants";
import { FloatingElement, TwinklingStar } from "@/components/ui/CosmicDecorations";
import {
  Sparkles,
  Zap,
  Phone,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Clock,
  TrendingUp,
  AlertTriangle,
  Users,
  ShieldCheck,
  ChevronDown,
  Star,
  DollarSign,
  MessageCircle,
  Activity,
} from "lucide-react";
import { motion } from "framer-motion";

export default function ClinicasLandingPage() {
  const [medicos, setMedicos] = useState(3);
  const [valorConsulta, setValorConsulta] = useState(450);

  // Perda estimada por consultas particulares não agendadas e faltas
  const consultasPerdidasMes = medicos * 8;
  const lostRevenuePerMonth = Math.round(consultasPerdidasMes * 0.75 * valorConsulta);

  // Form State
  const [formData, setFormData] = useState({
    nome: "",
    clinica: "",
    whatsapp: "",
    especialidade: "Clínica Médica / Especialidades",
    faturamento: "R$ 50k a R$ 150k/mês",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.nome,
          company: `${formData.clinica} (Médica - ${formData.especialidade})`,
          whatsapp: formData.whatsapp,
          service_interest: `Landing Page Clínicas Médicas - ${formData.faturamento}`,
          page_source: "/clinicas",
        }),
      });
      setIsSuccess(true);
    } catch {
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-10 pb-20 md:pt-16 md:pb-28 overflow-hidden bg-gradient-to-b from-emerald-50/40 via-white to-white">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 left-10 w-80 h-80 bg-sky-200/20 rounded-full blur-3xl pointer-events-none" />

        <TwinklingStar size={24} color="emerald" delay={0.2} style={{ position: "absolute", top: "14%", left: "10%" }} />
        <TwinklingStar size={18} color="gold" delay={1.1} style={{ position: "absolute", top: "25%", right: "12%" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Copy Left */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 shadow-xs">
                <span className="text-emerald-600 font-bold text-sm">✦</span>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Captação &amp; Atendimento com IA para Clínicas e Médicos
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.08] uppercase">
                Aumente suas consultas particulares e elimine a{" "}
                <span className="gradient-text-emerald">Fila no WhatsApp</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Agendamento instantâneo em 6 segundos, triagem inteligente de convênio vs. particular e confirmação ativa de consultas para <strong>médicos especialistas e clínicas médicas</strong>.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Button
                  href="#agendar"
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto text-base font-bold shadow-lg shadow-emerald-600/25 px-8 py-4 rounded-full"
                  leftIcon={<Zap className="w-5 h-5 fill-white text-white" />}
                >
                  Agendar Sessão Estratégica (15 min)
                </Button>

                <Button
                  href={COMPANY_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto text-base font-bold px-7 py-4 rounded-full"
                  leftIcon={<MessageCircle className="w-5 h-5 text-emerald-600" />}
                >
                  Falar no WhatsApp
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-slate-600 font-medium">
                <span className="flex items-center gap-1.5 text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  SLA de Resposta: 6 segundos
                </span>
                <span className="flex items-center gap-1.5 text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Conformidade com LGPD Médica &amp; CFM
                </span>
                <span className="flex items-center gap-1.5 text-slate-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Integração com prontuários e agendas médicas
                </span>
              </div>
            </div>

            {/* Mascot Right (Transparent PNG) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <FloatingElement yOffset={16} duration={4.5} rotateOffset={2.5}>
                <div className="relative w-72 h-72 sm:w-88 sm:h-88 flex items-center justify-center group cursor-pointer">
                  <div className="absolute inset-4 bg-teal-400/25 rounded-full blur-3xl pointer-events-none animate-pulse" />
                  <div className="relative w-full h-full drop-shadow-[0_25px_40px_rgba(13,148,136,0.3)] transition-transform duration-500 group-hover:scale-105">
                    <Image
                      src="/images/mascot/clinicas.png"
                      alt="Mascote Vetor Especialista em Clínicas Médicas"
                      width={352}
                      height={352}
                      className="w-full h-full object-contain"
                      priority
                    />
                  </div>
                  <motion.div
                    animate={{ y: [-4, 4, -4] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-2 -left-2 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-teal-200 text-xs font-bold text-slate-900 flex items-center gap-2"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-ping" />
                    <span>+34 consultas particulares/mês</span>
                  </motion.div>
                </div>
              </FloatingElement>
            </div>

          </div>
        </div>
      </section>

      {/* 2. OS 4 GARGALOS DAS CLÍNICAS MÉDICAS */}
      <section className="py-20 bg-slate-50 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-600 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              Diagnóstico de Gargalos na Recepção
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 uppercase">
              Onde sua clínica está perdendo pacientes todos os dias?
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Pacientes que buscam médicos especialistas valorizam rapidez e acolhimento. A lentidão no atendimento é a principal causa de perda para outras clínicas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center font-black">
                01
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Recepção Sobrecarregada
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                A recepcionista atende telefone fixo, emite guias TISS de convênio e recepciona na sala de espera. O WhatsApp acumula dezenas de mensagens sem resposta rápida.
              </p>
            </div>

            <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 border border-amber-100 flex items-center justify-center font-black">
                02
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Triagem Lenta de Convênios
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Pacientes perguntam sobre planos e coberturas. Sem uma IA que filtre instantaneamente o que é particular e o que é convênio, consultas rentáveis são perdidas.
              </p>
            </div>

            <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center font-black">
                03
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Faltas sem Confirmação Ativa
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Pacientes esquecem o compromisso médico. Sem confirmação automática com link de localização e preparo de exames, o médico fica com a sala vazia.
              </p>
            </div>

            <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center font-black">
                04
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Esquecimento de Retornos
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Pacientes realizam exames laboratoriais ou de imagem e demoram meses para agendar o retorno ou iniciar o tratamento contínuo recomendado.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 3. SIMULADOR FINANCEIRO */}
      <section className="py-20 bg-white relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#071F18] text-white p-8 sm:p-12 border border-emerald-800/60 shadow-2xl space-y-8">
            
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <Badge variant="gold" size="md">
                ✦ Simulação Clínica
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                Qual o custo da ociosidade na sua clínica médica?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Ajuste os parâmetros abaixo para calcular o faturamento não realizado por falta de atendimento ágil.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-4">
              
              <div className="space-y-6 bg-white/5 p-6 rounded-2xl border border-white/10">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-bold">
                    <span>Número de Médicos / Consultórios:</span>
                    <span className="text-emerald-400 font-extrabold">{medicos} médicos</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={medicos}
                    onChange={(e) => setMedicos(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>1 consultório</span>
                    <span>10 consultórios</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-bold">
                    <span>Valor Médio da Consulta Particular:</span>
                    <span className="text-amber-400 font-extrabold">R$ {valorConsulta.toLocaleString("pt-BR")}</span>
                  </div>
                  <input
                    type="range"
                    min="200"
                    max="1500"
                    step="50"
                    value={valorConsulta}
                    onChange={(e) => setValorConsulta(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>R$ 200 (Básica)</span>
                    <span>R$ 1.500 (Especialista / Check-up)</span>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-rose-950/40 via-slate-900 to-slate-950 border border-rose-500/30 text-center space-y-4 shadow-xl">
                <span className="text-xs uppercase tracking-wider font-bold text-rose-400 flex items-center justify-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  Perda Mensal Estimada
                </span>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-rose-400">
                  R$ {lostRevenuePerMonth.toLocaleString("pt-BR")}
                  <span className="text-xs text-slate-400 font-normal block mt-1">/mês em consultas particulares não preenchidas</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Com o <strong>Agente de IA Médico da Vetor</strong>, sua clínica responde em 6 segundos e preenche horários vagos com antecedência.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 4. O SISTEMA VETOR PARA CLÍNICAS MÉDICAS */}
      <section className="py-20 bg-slate-50/50 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <Badge variant="emerald" size="md">
              ✦ Solução Completa Turnkey
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 uppercase">
              Como Funciona o Sistema para Clínicas Médicas
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Estruturamos sua presença digital e atendimento de forma ética, respeitando as normas do CFM e valorizando a autoridade do seu corpo clínico.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                1. Portal Médico de Alta Autoridade
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Site institucional com biografia dos médicos especialistas, corpo clínico, fotos da infraestrutura e botão direto para agendamento online.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 border border-sky-200 flex items-center justify-center">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                2. Agente de IA Médico no WhatsApp
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Atendimento humanizado 24/7 que faz a triagem de especialidade, explica os diferenciais da consulta particular e agenda diretamente no software da clínica.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900">
                  3. Tráfego Google &amp; Meta Ads
                </h3>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                  Opcional
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Podemos gerenciar seus anúncios locais de alta precisão para termos médicos específicos ou integrar nossa IA nas campanhas que sua equipe já executa.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 border border-purple-200 flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                4. Confirmação &amp; Lembrete de Retorno
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Lembretes automáticos com orientações pré-consulta e aviso programado para pacientes que precisam agendar o retorno com exames.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 5. CASE REAL DO NICHO */}
      <section className="py-20 bg-white relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-slate-50 border border-slate-200 p-8 sm:p-12 space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div className="space-y-1">
                <Badge variant="emerald" size="sm">Case Auditado &bull; Clínica Médica Especializada</Badge>
                <h3 className="text-2xl font-black text-slate-900 uppercase">
                  Clínica Médica Integrada &bull; São Paulo/SP
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500 font-medium">Prazo de Implantação:</span>
                <div className="text-sm font-extrabold text-emerald-700">15 dias corridos</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center">
                <div className="text-3xl font-black text-emerald-600">+34</div>
                <div className="text-xs text-slate-600 font-medium mt-1">Consultas particulares novas/mês</div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center">
                <div className="text-3xl font-black text-sky-600">6 segundos</div>
                <div className="text-xs text-slate-600 font-medium mt-1">Tempo de resposta da IA médica</div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center">
                <div className="text-3xl font-black text-amber-600">-70%</div>
                <div className="text-xs text-slate-600 font-medium mt-1">Redução no No-Show</div>
              </div>
            </div>

            <blockquote className="p-4 rounded-2xl bg-emerald-50/60 border-l-4 border-emerald-500 text-xs sm:text-sm text-slate-700 italic">
              &ldquo;Nossa recepção não conseguia dar vazão às centenas de mensagens de WhatsApp. Com a IA da Vetor, os pacientes são triados na hora, recebem as orientações da consulta e agendam de forma 100% autônoma. Nossa secretária agora foca em dar um atendimento VIP presencial aos pacientes.&rdquo;
              <div className="mt-2 not-italic font-bold text-slate-900 text-xs">
                — Dr. Marcelo Fontes, Diretor Clínico e Cardiologista
              </div>
            </blockquote>

          </div>
        </div>
      </section>

      {/* 6. FORMULÁRIO DE AGENDAMENTO DE CALL */}
      <section id="agendar" className="py-20 bg-[#07162C] text-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-400 flex items-center justify-center gap-1.5">
              <span>✦</span> SESSÃO ESTRATÉGICA INDIVIDUAL (15 MINUTOS) <span>✦</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase">
              Descubra como colocar o Sistema na sua Clínica
            </h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              Sem pressão de vendas. Vamos analisar a rotina da sua recepção e mostrar como dobrar a taxa de agendamentos particulares.
            </p>
          </div>

          <div className="rounded-3xl bg-white/5 border border-sky-500/30 p-8 sm:p-10 backdrop-blur-xl shadow-2xl">
            {isSuccess ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto text-2xl">
                  ✓
                </div>
                <h3 className="text-2xl font-black text-white">Solicitação Recebida com Sucesso!</h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Nosso consultor entrará em contato pelo WhatsApp em até 15 minutos para confirmar o melhor horário da sua call.
                </p>
                <div className="pt-4">
                  <Button
                    href={COMPANY_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="primary"
                    size="md"
                    className="rounded-full px-6"
                  >
                    Falar Imediatamente no WhatsApp
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1 text-left">
                    <label className="text-xs font-bold text-slate-200">Seu Nome *</label>
                    <input
                      type="text"
                      required
                      placeholder="Dr. Fernando Martins"
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-400 text-sm"
                    />
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-xs font-bold text-slate-200">Nome da Clínica / Consultório *</label>
                    <input
                      type="text"
                      required
                      placeholder="Clínica Médica Santa Helena"
                      value={formData.clinica}
                      onChange={(e) => setFormData({ ...formData, clinica: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-400 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1 text-left">
                    <label className="text-xs font-bold text-slate-200">WhatsApp Comercial *</label>
                    <input
                      type="tel"
                      required
                      placeholder="(11) 99999-9999"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-400 text-sm"
                    />
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-xs font-bold text-slate-200">Especialidade / Foco</label>
                    <input
                      type="text"
                      placeholder="Ex: Dermatologia, Cardiologia, Ortopedia..."
                      value={formData.especialidade}
                      onChange={(e) => setFormData({ ...formData, especialidade: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-400 text-sm"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full text-base font-bold shadow-lg shadow-emerald-500/30 rounded-full py-4 mt-4"
                  leftIcon={<Zap className="w-5 h-5 fill-white text-white" />}
                >
                  {isSubmitting ? "Enviando solicitação..." : "Agendar Minha Sessão Estratégica (15 min)"}
                </Button>

                <p className="text-[11px] text-center text-slate-400">
                  🔒 Seus dados estão 100% seguros. Não compartilhamos informações com terceiros.
                </p>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* 7. FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center space-y-2">
            <Badge variant="cyan" size="md">
              Perguntas Frequentes
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-slate-900">
              Dúvidas dos Gestores de Clínicas Médicas
            </h2>
          </div>

          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="text-base font-bold text-slate-900">
                &ldquo;A IA respeita as normas éticas do CFM e sigilo médico?&rdquo;
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Sim, com rigor absoluto. O agente de IA atua exclusivamente na triagem administrativa, esclarecimento sobre funcionamento da clínica, valores de consultas particulares, convênios aceitos e agendamento. Ele nunca prescreve nem realiza diagnósticos médicos, estando 100% em conformidade com o CFM e com a LGPD.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="text-base font-bold text-slate-900">
                &ldquo;Integra com nosso software de prontuário e agenda médica?&rdquo;
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Sim! Conseguimos integrar a IA aos principais sistemas médicos do mercado (Doctoralia, iClinic, Feegow, Amplimed, ProDoctor, Google Calendar) para sincronizar horários disponíveis em tempo real.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}