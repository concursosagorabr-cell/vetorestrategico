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
  Scale,
  BookOpen,
} from "lucide-react";
import { motion } from "framer-motion";

export default function AdvocaciaLandingPage() {
  const [advogados, setAdvogados] = useState(2);
  const [ticketHonorario, setTicketHonorario] = useState(4000);

  // Estimativa de contratos jurídicos fechados adicionais por triagem em 6 segundos
  const contratosNovosMes = Math.round(advogados * 2.5);
  const receitaIncremental = contratosNovosMes * ticketHonorario;

  // Form State
  const [formData, setFormData] = useState({
    nome: "",
    escritorio: "",
    whatsapp: "",
    areaAtuacao: "Trabalhista / Previdenciário",
    numAdvogados: "1 a 3 advogados",
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
          company: `${formData.escritorio} (Advocacia - ${formData.areaAtuacao})`,
          whatsapp: formData.whatsapp,
          service_interest: `Landing Page Advocacia - ${formData.numAdvogados}`,
          page_source: "/advocacia",
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
      <section className="relative pt-10 pb-20 md:pt-16 md:pb-28 overflow-hidden bg-gradient-to-b from-sky-50/40 via-white to-white">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 left-10 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

        <TwinklingStar size={24} color="gold" delay={0.2} style={{ position: "absolute", top: "12%", left: "10%" }} />
        <TwinklingStar size={18} color="cyan" delay={1.3} style={{ position: "absolute", top: "26%", right: "12%" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Copy Left */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-200 shadow-xs">
                <span className="text-sky-600 font-bold text-sm">✦</span>
                <span className="text-xs font-bold uppercase tracking-wider text-sky-800">
                  Triagem &amp; Captação Ética com IA para Escritórios de Advocacia
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.08] uppercase">
                Atendimento Ágil &amp; Qualificação Ética com{" "}
                <span className="gradient-text-emerald">Inteligência Artificial</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Agente de Atendimento Jurídico com IA que acolhe mensagens no WhatsApp em 6 segundos, organiza as informações fáticas preliminares e agenda a consulta diretamente com o advogado, <strong>100% em conformidade com o Provimento 205/2021 do CFOAB</strong>.
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
                  leftIcon={<MessageCircle className="w-5 h-5 text-sky-600" />}
                >
                  Falar no WhatsApp
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-slate-600 font-medium">
                <span className="flex items-center gap-1.5 text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Conforme Provimento 205/2021 da OAB
                </span>
                <span className="flex items-center gap-1.5 text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Organização Preliminar de Relato dos Fatos
                </span>
                <span className="flex items-center gap-1.5 text-slate-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Sigilo Profissional e LGPD
                </span>
              </div>
            </div>

            {/* Mascot Right (Transparent PNG) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <FloatingElement yOffset={16} duration={4.5} rotateOffset={2.5}>
                <div className="relative w-72 h-72 sm:w-88 sm:h-88 flex items-center justify-center group cursor-pointer">
                  <div className="absolute inset-4 bg-indigo-400/25 rounded-full blur-3xl pointer-events-none animate-pulse" />
                  <div className="relative w-full h-full drop-shadow-[0_25px_40px_rgba(79,70,229,0.3)] transition-transform duration-500 group-hover:scale-105">
                    <Image
                      src="/images/mascot/advocacia.png"
                      alt="Mascote Vetor Especialista Jurídico"
                      width={352}
                      height={352}
                      className="w-full h-full object-contain"
                      priority
                    />
                  </div>
                  <motion.div
                    animate={{ y: [-4, 4, -4] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-2 -left-2 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-indigo-200 text-xs font-bold text-slate-900 flex items-center gap-2"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-ping" />
                    <span>Triagem &amp; Acolhimento 24/7</span>
                  </motion.div>
                </div>
              </FloatingElement>
            </div>

          </div>
        </div>
      </section>

      {/* 2. OS 4 GARGALOS NO ESCRITÓRIO DE ADVOCACIA */}
      <section className="py-20 bg-slate-50 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-600 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              Gargalos na Rotina Jurídica
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 uppercase">
              Por que advogados competentes gastam horas com quem não vai fechar contrato?
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              O tempo do advogado é o seu ativo mais valioso. Atender pessoas que não possuem direito real ou que buscam consultoria gratuita drena a produtividade do escritório.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center font-black">
                01
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Curiosos sem Caso Jurídico
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Mensagens de pessoas querendo tirar dúvidas superficiais sem intenção de contratar ou com casos fora da área de especialidade do escritório.
              </p>
            </div>

            <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 border border-amber-100 flex items-center justify-center font-black">
                02
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Perda de Leads Qualificados
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Empresas e pessoas com causas de alto valor mandam mensagem enquanto você está em audiência e buscam outro escritório se não tiverem resposta imediata.
              </p>
            </div>

            <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center font-black">
                03
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Lentidão na Coleta de Documentos
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Semanas cobrando comprovantes, carteira de trabalho ou contratos para redigir a petição inicial. Sem fluxo automatizado, a ação atrasa.
              </p>
            </div>

            <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center font-black">
                04
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Falta de Posicionamento Ético
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Dificuldade em construir autoridade digital no Google sem infringir as regras de publicidade e mercantilização da advocacia.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 3. SIMULADOR FINANCEIRO */}
      <section className="py-20 bg-white relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#091829] text-white p-8 sm:p-12 border border-sky-800/60 shadow-2xl space-y-8">
            
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <Badge variant="gold" size="md">
                ✦ Simulação Jurídica
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                Potencial de Novos Contratos por Mês
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Simule o impacto de atender e triar instantaneamente todos os potenciais clientes do seu escritório.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-4">
              
              <div className="space-y-6 bg-white/5 p-6 rounded-2xl border border-white/10">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-bold">
                    <span>Número de Advogados no Escritório:</span>
                    <span className="text-sky-400 font-extrabold">{advogados} advogados</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={advogados}
                    onChange={(e) => setAdvogados(Number(e.target.value))}
                    className="w-full accent-sky-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>1 advogado</span>
                    <span>10 advogados</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-bold">
                    <span>Honorário Inicial / Contrato Médio:</span>
                    <span className="text-amber-400 font-extrabold">R$ {ticketHonorario.toLocaleString("pt-BR")}</span>
                  </div>
                  <input
                    type="range"
                    min="1500"
                    max="15000"
                    step="500"
                    value={ticketHonorario}
                    onChange={(e) => setTicketHonorario(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>R$ 1.500</span>
                    <span>R$ 15.000</span>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-sky-950/50 via-slate-900 to-slate-950 border border-sky-500/40 text-center space-y-4 shadow-xl">
                <span className="text-xs uppercase tracking-wider font-bold text-sky-400 flex items-center justify-center gap-1.5">
                  <TrendingUp className="w-4 h-4" />
                  Estimativa de Casos Triados com Agilidade
                </span>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-sky-400">
                  +{contratosNovosMes} atendimentos
                  <span className="text-xs text-slate-400 font-normal block mt-1">qualificados e organizados por mês</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  O <strong>Agente Jurídico Vetor</strong> acolhe o relato dos fatos, verifica dados cadastrais preliminares e disponibiliza o histórico pronto para análise do advogado responsável.
                </p>
                <div className="text-[10px] text-slate-400 border-t border-white/10 pt-2 text-left leading-normal">
                  ⚖️ <strong>Aviso Ético:</strong> Projeção consultiva baseada em produtividade operacional. Não configura garantia de honorários ou promessa de resultado de qualquer espécie, respeitando o Provimento CFOAB nº 205/2021.
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 4. O SISTEMA VETOR PARA ADVOCACIA */}
      <section className="py-20 bg-slate-50/50 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <Badge variant="cyan" size="md">
              ✦ O Ecossistema Jurídico
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 uppercase">
              Como Funciona o Sistema de IA para Advocacia
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Preservamos a sobriedade e elegância da sua banca jurídica enquanto aceleramos seu processo comercial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 border border-sky-200 flex items-center justify-center">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                1. Site Institucional Sóbrio &amp; Otimizado
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Páginas elegantes por área do Direito (Trabalhista, Tributário, Família, etc.) focadas em autoridade técnica, artigos e conformidade com a OAB.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                2. Agente Jurídico de Triagem 24/7
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Responde em 6 segundos, coleta a narrativa dos fatos, verifica prazos prescricionais preliminares e agenda a consulta consultiva com o advogado.
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
                Podemos estruturar anúncios informativos de busca no Google estritamente dentro do Provimento da OAB ou plugar a IA nas campanhas que seu escritório já roda.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 border border-purple-200 flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                4. Coleta Autônoma de Documentos
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Instrui o cliente sobre quais documentos enviar pelo WhatsApp, valida a legibilidade dos arquivos e organiza tudo na pasta do caso.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 5. CASE REAL */}
      <section className="py-20 bg-white relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-slate-50 border border-slate-200 p-8 sm:p-12 space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div className="space-y-1">
                <Badge variant="cyan" size="sm">Case Auditado &bull; Advocacia Trabalhista &amp; Empresarial</Badge>
                <h3 className="text-2xl font-black text-slate-900 uppercase">
                  Mendes &amp; Vasconcelos Sociedade de Advogados
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500 font-medium">Prazo de Implantação:</span>
                <div className="text-sm font-extrabold text-sky-700">12 dias em produção</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center">
                <div className="text-3xl font-black text-emerald-600">+42</div>
                <div className="text-xs text-slate-600 font-medium mt-1">Contratos fechados em 60 dias</div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center">
                <div className="text-3xl font-black text-sky-600">85 horas</div>
                <div className="text-xs text-slate-600 font-medium mt-1">De triagem economizadas/mês</div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center">
                <div className="text-3xl font-black text-amber-600">100%</div>
                <div className="text-xs text-slate-600 font-medium mt-1">Conformidade com Provimento OAB</div>
              </div>
            </div>

            <blockquote className="p-4 rounded-2xl bg-sky-50/60 border-l-4 border-sky-500 text-xs sm:text-sm text-slate-700 italic">
              &ldquo;Antes da IA, passávamos a manhã inteira no WhatsApp respondendo pessoas que não tinham direito à ação. Agora, a IA faz perguntas preliminares essenciais e só agenda a reunião com quem realmente tem viabilidade jurídica. Nossos advogados aumentaram a produtividade e o faturamento do escritório triplicou.&rdquo;
              <div className="mt-2 not-italic font-bold text-slate-900 text-xs">
                — Dr. Lucas Mendes, Sócio Fundador e Advogado OAB/SP
              </div>
            </blockquote>

          </div>
        </div>
      </section>

      {/* 6. FORMULÁRIO */}
      <section id="agendar" className="py-20 bg-[#07162C] text-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-400 flex items-center justify-center gap-1.5">
              <span>✦</span> SESSÃO ESTRATÉGICA INDIVIDUAL (15 MINUTOS) <span>✦</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase">
              Descubra como colocar o Sistema no seu Escritório
            </h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              Sem pressão de vendas. Vamos mapear o funil de atendimento e apresentar o modelo de qualificação de casos.
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
                  Entraremos em contato pelo WhatsApp para agendar sua reunião estratégica.
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
                      placeholder="Dra. Juliana Prado"
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:border-sky-400 text-sm"
                    />
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-xs font-bold text-slate-200">Nome do Escritório / Banca *</label>
                    <input
                      type="text"
                      required
                      placeholder="Prado &amp; Associados Advocacia"
                      value={formData.escritorio}
                      onChange={(e) => setFormData({ ...formData, escritorio: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:border-sky-400 text-sm"
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
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:border-sky-400 text-sm"
                    />
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-xs font-bold text-slate-200">Principal Área de Atuação</label>
                    <select
                      value={formData.areaAtuacao}
                      onChange={(e) => setFormData({ ...formData, areaAtuacao: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/20 text-white focus:outline-none focus:border-sky-400 text-sm"
                    >
                      <option value="Direito Trabalhista">Direito Trabalhista</option>
                      <option value="Direito Previdenciário">Direito Previdenciário</option>
                      <option value="Direito de Família & Sucessões">Direito de Família &amp; Sucessões</option>
                      <option value="Direito Empresarial & Contratos">Direito Empresarial &amp; Contratos</option>
                      <option value="Direito Tributário">Direito Tributário</option>
                      <option value="Direito Cível / Imobiliário">Direito Cível / Imobiliário</option>
                      <option value="Direito Criminal">Direito Criminal</option>
                    </select>
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
                  🔒 Seus dados estão 100% protegidos. Não compartilhamos informações com terceiros.
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
              Dúvidas de Advogados e Sócios de Bancas
            </h2>
          </div>

          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="text-base font-bold text-slate-900">
                &ldquo;A IA não configura captação indevida ou mercantilização da advocacia?&rdquo;
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Não. A IA atua estritamente como um canal de atendimento receptivo para pessoas que procuraram ativamente o seu escritório, realizando triagem prévia de informações fáticas e agendamento de reuniões, sem promessa de resultado e em total conformidade com o Provimento 205/2021 do CFOAB.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="text-base font-bold text-slate-900">
                &ldquo;A IA pode prestar consultoria jurídica pelo cliente?&rdquo;
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Não. Nossos agentes são parametrizados para não fornecer pareceres ou consultas jurídicas pelo WhatsApp. O papel da IA é exclusivamente acolher o cliente, colher os fatos e conectá-lo ao advogado responsável.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}