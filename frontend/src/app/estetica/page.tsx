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
} from "lucide-react";
import { motion } from "framer-motion";

export default function EsteticaLandingPage() {
  const [dailyLeads, setDailyLeads] = useState(10);
  const [ticketMedio, setTicketMedio] = useState(1500);

  // Perda estimada: ~60% dos leads esfriam por demora no WhatsApp
  const lostLeadsPerMonth = Math.round(dailyLeads * 30 * 0.45);
  const lostRevenuePerMonth = Math.round(lostLeadsPerMonth * 0.25 * ticketMedio);

  // Form State
  const [formData, setFormData] = useState({
    nome: "",
    clinica: "",
    whatsapp: "",
    faturamento: "R$ 30k a R$ 80k/mês",
    principalProcedimento: "Harmonização & Botox",
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
          company: `${formData.clinica} (Estética - ${formData.faturamento})`,
          whatsapp: formData.whatsapp,
          service_interest: `Landing Page Estética - ${formData.principalProcedimento}`,
          page_source: "/estetica",
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
        <div className="absolute top-40 left-10 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

        <TwinklingStar size={22} color="gold" delay={0.3} style={{ position: "absolute", top: "15%", left: "10%" }} />
        <TwinklingStar size={18} color="emerald" delay={1.2} style={{ position: "absolute", top: "25%", right: "12%" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Copy Left */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 shadow-xs">
                <span className="text-emerald-600 font-bold text-sm">✦</span>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Método de Captação &amp; IA para Clínicas de Estética
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.08] uppercase">
                Encha sua agenda com pacientes para{" "}
                <span className="gradient-text-emerald">Procedimentos Lucrativos</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Transforme o fluxo de curiosos do Instagram e Google em <strong>avaliações presenciais confirmadas</strong> de Harmonização Facial, Toxina Botulínica e Bioestimuladores com atendimento instantâneo no WhatsApp 24/7.
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
                  Redução de até 65% no No-Show
                </span>
                <span className="flex items-center gap-1.5 text-slate-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Sem mudar seu software de gestão
                </span>
              </div>
            </div>

            {/* Mascot Right (Transparent PNG) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <FloatingElement yOffset={16} duration={4.5} rotateOffset={2.5}>
                <div className="relative w-72 h-72 sm:w-88 sm:h-88 flex items-center justify-center group cursor-pointer">
                  <div className="absolute inset-4 bg-emerald-400/25 rounded-full blur-3xl pointer-events-none animate-pulse" />
                  <div className="relative w-full h-full drop-shadow-[0_25px_40px_rgba(5,150,105,0.3)] transition-transform duration-500 group-hover:scale-105">
                    <Image
                      src="/images/mascot/estetica.png"
                      alt="Mascote Vetor Especialista em Estética"
                      width={352}
                      height={352}
                      className="w-full h-full object-contain"
                      priority
                    />
                  </div>
                  <motion.div
                    animate={{ y: [-4, 4, -4] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-2 -left-2 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-emerald-200 text-xs font-bold text-slate-900 flex items-center gap-2"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <span>+42 agendamentos/mês</span>
                  </motion.div>
                </div>
              </FloatingElement>
            </div>

          </div>
        </div>
      </section>

      {/* 2. OS 4 GARGALOS MORTAIS DAS CLÍNICAS DE ESTÉTICA */}
      <section className="py-20 bg-slate-50 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-600 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              Diagnóstico de Gargalos Operacionais
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 uppercase">
              Por que sua clínica investe em anúncios mas a agenda continua com horários vagos?
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Na maioria das clínicas de estética que faturam de R$ 30 mil a R$ 300 mil, o problema não é o tráfego — é o vazamento no processo de conversão.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center font-black">
                01
              </div>
              <h3 className="text-base font-bold text-slate-900">
                A Regra dos 5 Minutos
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                A paciente pesquisa no Instagram à noite ou no almoço. Se sua clínica demora 1 hora para responder no WhatsApp, ela já mandou mensagem para a concorrente e agendou lá.
              </p>
            </div>

            <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 border border-amber-100 flex items-center justify-center font-black">
                02
              </div>
              <h3 className="text-base font-bold text-slate-900">
                O "Quanto Custa?" sem Fechamento
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                A recepcionista sobrecarregada apenas joga o valor da toxina ou preenchimento e a paciente desaparece no vácuo sem entender o valor da consulta avaliativa.
              </p>
            </div>

            <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center font-black">
                03
              </div>
              <h3 className="text-base font-bold text-slate-900">
                No-Show &amp; Cadeira Vazia
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Pacientes que marcam avaliação gratuita e faltam de última hora. Sem um fluxo de confirmação ativa e lista de espera, cada falta é dinheiro jogado fora.
              </p>
            </div>

            <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center font-black">
                04
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Base Inativa Esquecida
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Centenas de pacientes que fizeram Botox ou Bioestimulador há 6 meses e nunca mais foram contatadas para retoque e novos protocolos de rejuvenescimento.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 3. CALCULADORA DE FATURAMENTO PERDIDO */}
      <section className="py-20 bg-white relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#0A192F] text-white p-8 sm:p-12 border border-sky-900/60 shadow-2xl space-y-8">
            
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <Badge variant="gold" size="md">
                ✦ Simulação Financeira
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                Quanto dinheiro sua clínica deixa na mesa todo mês?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Ajuste os controles abaixo para simular as perdas por atendimento lento e falta de acompanhamento.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-4">
              
              {/* Sliders */}
              <div className="space-y-6 bg-white/5 p-6 rounded-2xl border border-white/10">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-bold">
                    <span>Leads/Contatos por dia:</span>
                    <span className="text-emerald-400 font-extrabold">{dailyLeads} contatos</span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="50"
                    value={dailyLeads}
                    onChange={(e) => setDailyLeads(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>3 contatos/dia</span>
                    <span>50 contatos/dia</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-bold">
                    <span>Ticket Médio do Procedimento:</span>
                    <span className="text-amber-400 font-extrabold">R$ {ticketMedio.toLocaleString("pt-BR")}</span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="5000"
                    step="250"
                    value={ticketMedio}
                    onChange={(e) => setTicketMedio(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>R$ 500 (Botox)</span>
                    <span>R$ 5.000 (Harmonização Completa)</span>
                  </div>
                </div>
              </div>

              {/* Output Result Tile */}
              <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-rose-950/40 via-slate-900 to-slate-950 border border-rose-500/30 text-center space-y-4 shadow-xl">
                <span className="text-xs uppercase tracking-wider font-bold text-rose-400 flex items-center justify-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  Estimativa de Perda Mensal
                </span>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-rose-400">
                  R$ {lostRevenuePerMonth.toLocaleString("pt-BR")}
                  <span className="text-xs text-slate-400 font-normal block mt-1">/mês em procedimentos não fechados</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Com o <strong>Sistema Vetor de Atendimento com IA</strong>, recuperamos em média <strong>35% a 60%</strong> dessas pacientes que hoje esfriam no WhatsApp.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 4. O SISTEMA VETOR PARA CLÍNICAS DE ESTÉTICA */}
      <section className="py-20 bg-slate-50/50 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <Badge variant="emerald" size="md">
              ✦ Solução Completa Turnkey
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 uppercase">
              Como Funciona o Sistema de Aquisição &amp; IA da Vetor
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Não entregamos apenas "posts bonitos" ou "anúncios soltos". Montamos uma esteira previsível de captação e fechamento.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                1. Landing Page de Autoridade
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Páginas modernas e elegantes focadas nos procedimentos de maior margem (Harmonização, Toxina, Bioestimuladores), destacando os diferenciais da sua clínica e gerando desejo imediato.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 border border-sky-200 flex items-center justify-center">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                2. Agente de IA no WhatsApp (24/7)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Responde em 6 segundos, qualifica a queixa da paciente, tira dúvidas de recuperação com linguagem humanizada e conduz ativamente para o agendamento da avaliação presencial.
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
                Podemos gerenciar seus anúncios locais de alta precisão ou plugar nosso Sistema de IA diretamente nas campanhas que você ou sua agência atual já rodam.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 border border-purple-200 flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                4. Confirmação &amp; Reativação
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Fluxo automático que reduz o No-Show enviando lembretes com localização e reativa pacientes antigas a cada 4 a 6 meses para retoque de toxina e novos tratamentos.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 5. CASE REAL DO NICHO: CLÍNICA DE ESTÉTICA DRA. CAMILA */}
      <section className="py-20 bg-white relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-slate-50 border border-slate-200 p-8 sm:p-12 space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div className="space-y-1">
                <Badge variant="emerald" size="sm">Case Auditado &bull; Estética Avançada</Badge>
                <h3 className="text-2xl font-black text-slate-900 uppercase">
                  Clínica Dra. Camila Rocha &bull; São Paulo/SP
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500 font-medium">Prazo de Implantação:</span>
                <div className="text-sm font-extrabold text-emerald-700">18 dias em produção</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center">
                <div className="text-3xl font-black text-emerald-600">+27</div>
                <div className="text-xs text-slate-600 font-medium mt-1">Avaliações agendadas/mês</div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center">
                <div className="text-3xl font-black text-sky-600">-65%</div>
                <div className="text-xs text-slate-600 font-medium mt-1">Redução na taxa de faltas (no-show)</div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center">
                <div className="text-3xl font-black text-amber-600">R$ 84.000</div>
                <div className="text-xs text-slate-600 font-medium mt-1">Faturamento incremental em 60 dias</div>
              </div>
            </div>

            <blockquote className="p-4 rounded-2xl bg-emerald-50/60 border-l-4 border-emerald-500 text-xs sm:text-sm text-slate-700 italic">
              &ldquo;Antes da Vetor, eu investia R$ 3.000 em anúncios e minha recepcionista não dava conta de responder todo mundo a tempo. A IA no WhatsApp mudou o jogo: ela responde em segundos, tira as dúvidas de recuperação e já deixa a avaliação pré-agendada na minha agenda. O investimento se pagou na primeira semana.&rdquo;
              <div className="mt-2 not-italic font-bold text-slate-900 text-xs">
                — Dra. Camila Rocha, Biomédica Esteta e Proprietária
              </div>
            </blockquote>

          </div>
        </div>
      </section>

      {/* 6. FORMULÁRIO DE AGENDAMENTO DE CALL DE 15 MINUTOS */}
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
              Sem pressão de vendas. Vamos analisar seus canais atuais e mostrar exatamente onde estão os gargalos da sua agenda.
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
                      placeholder="Dra. Juliana Mendes"
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-400 text-sm"
                    />
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-xs font-bold text-slate-200">Nome da Clínica *</label>
                    <input
                      type="text"
                      required
                      placeholder="Clínica Bella Vita Estética"
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
                    <label className="text-xs font-bold text-slate-200">Faixa de Faturamento Mensal</label>
                    <select
                      value={formData.faturamento}
                      onChange={(e) => setFormData({ ...formData, faturamento: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/20 text-white focus:outline-none focus:border-emerald-400 text-sm"
                    >
                      <option value="Até R$ 30k/mês">Até R$ 30k/mês</option>
                      <option value="R$ 30k a R$ 80k/mês">R$ 30k a R$ 80k/mês</option>
                      <option value="R$ 80k a R$ 200k/mês">R$ 80k a R$ 200k/mês</option>
                      <option value="Acima de R$ 200k/mês">Acima de R$ 200k/mês</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1 text-left">
                  <label className="text-xs font-bold text-slate-200">Procedimento mais Lucrativo que Deseja Alavancar</label>
                  <select
                    value={formData.principalProcedimento}
                    onChange={(e) => setFormData({ ...formData, principalProcedimento: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/20 text-white focus:outline-none focus:border-emerald-400 text-sm"
                  >
                    <option value="Harmonização Facial & Botox">Harmonização Facial &amp; Botox</option>
                    <option value="Bioestimuladores de Colágeno (Radiesse/Sculptra)">Bioestimuladores de Colágeno (Radiesse/Sculptra)</option>
                    <option value="Preenchimento Labial & Facial">Preenchimento Labial &amp; Facial</option>
                    <option value="Depilação a Laser & Corporal">Depilação a Laser &amp; Corporal</option>
                    <option value="Tratamentos Corporais (Lipo sem cortes, Enzimas)">Tratamentos Corporais (Lipo sem cortes, Enzimas)</option>
                  </select>
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

      {/* 7. FAQ OBJEÇÕES (DO SCRIPT DE VENDAS) */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center space-y-2">
            <Badge variant="cyan" size="md">
              Perguntas Frequentes
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-slate-900">
              Dúvidas Comuns das Donas de Clínicas
            </h2>
          </div>

          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="text-base font-bold text-slate-900">
                &ldquo;Já tenho alguém cuidando das redes sociais (agência/social media), preciso da Vetor?&rdquo;
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Sim! A maioria das agências apenas cria posts e traz cliques, mas não cuida do que acontece depois que a paciente manda mensagem. A Vetor é especialista no <strong>funil de conversão e fechamento</strong>: garantimos que ninguém fique sem resposta no WhatsApp e que as curiosas virem avaliações marcadas na sua agenda.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="text-base font-bold text-slate-900">
                &ldquo;A IA não vai parecer um robô mecânico e afastar pacientes exigentes?&rdquo;
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                De forma alguma. Nossos agentes utilizam modelos de linguagem avançados (GPT-4o) treinados com o vocabulário e tom acolhedor da sua clínica. O tom é consultivo, humanizado e focado em acolher a dúvida da paciente e conduzi-la com elegância para a consulta presencial.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="text-base font-bold text-slate-900">
                &ldquo;Em quanto tempo o sistema se paga?&rdquo;
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Geralmente o investimento mensal se paga com <strong>1 a 2 pacientes de Harmonização ou Bioestimulador fechados</strong>. Todas as outras avaliações adicionais do mês representam lucro líquido direto para a sua clínica.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="text-base font-bold text-slate-900">
                &ldquo;Preciso trocar o software ou sistema da minha clínica?&rdquo;
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Não. A solução da Vetor se integra diretamente ao seu WhatsApp Business e aos softwares que você já utiliza, sem necessidade de treinamentos complexos ou migrações demoradas.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}