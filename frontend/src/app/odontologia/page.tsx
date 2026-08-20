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

export default function OdontologiaLandingPage() {
  const [dentistas, setDentistas] = useState(2);
  const [ticketMedio, setTicketMedio] = useState(3500);

  // Perda estimada de faturamento por cadeira vazia e leads não convertidos
  const avaliacoesPerdidasPorMes = dentistas * 6;
  const lostRevenuePerMonth = Math.round(avaliacoesPerdidasPorMes * 0.4 * ticketMedio);

  // Form State
  const [formData, setFormData] = useState({
    nome: "",
    consultorio: "",
    whatsapp: "",
    numDentistas: "1 a 3 dentistas",
    focoPrincipal: "Implantes & Próteses",
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
          company: `${formData.consultorio} (Odontologia - ${formData.numDentistas})`,
          whatsapp: formData.whatsapp,
          service_interest: `Landing Page Odontologia - ${formData.focoPrincipal}`,
          page_source: "/odontologia",
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
        <div className="absolute top-40 left-10 w-80 h-80 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />

        <TwinklingStar size={24} color="cyan" delay={0.2} style={{ position: "absolute", top: "12%", left: "8%" }} />
        <TwinklingStar size={20} color="gold" delay={1.4} style={{ position: "absolute", top: "28%", right: "10%" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Copy Left */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-200 shadow-xs">
                <span className="text-sky-600 font-bold text-sm">✦</span>
                <span className="text-xs font-bold uppercase tracking-wider text-sky-800">
                  Captação &amp; Atendimento com IA para Consultórios Odontológicos
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.08] uppercase">
                Encha a cadeira com tratamentos de{" "}
                <span className="gradient-text-emerald">Alto Ticket</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Atraia e converta pacientes qualificados para <strong>Implantes Dentários, Alinhadores Invisíveis e Lentes de Contato</strong> com atendimento em 6 segundos no WhatsApp enquanto você está em atendimento clínico.
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
                  Triagem Particular vs Convênio
                </span>
                <span className="flex items-center gap-1.5 text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  SLA de Resposta: 6 segundos
                </span>
                <span className="flex items-center gap-1.5 text-slate-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Sem trocar seu software de clínica (Dentalcorp/EasyDental/Simples Dental)
                </span>
              </div>
            </div>

            {/* Mascot Right (Transparent PNG) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <FloatingElement yOffset={16} duration={4.5} rotateOffset={2.5}>
                <div className="relative w-72 h-72 sm:w-88 sm:h-88 flex items-center justify-center group cursor-pointer">
                  <div className="absolute inset-4 bg-sky-400/25 rounded-full blur-3xl pointer-events-none animate-pulse" />
                  <div className="relative w-full h-full drop-shadow-[0_25px_40px_rgba(2,132,199,0.3)] transition-transform duration-500 group-hover:scale-105">
                    <Image
                      src="/images/mascot/odonto.png"
                      alt="Mascote Vetor Especialista Odontológico"
                      width={352}
                      height={352}
                      className="w-full h-full object-contain"
                      priority
                    />
                  </div>
                  <motion.div
                    animate={{ y: [-4, 4, -4] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-2 -left-2 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-sky-200 text-xs font-bold text-slate-900 flex items-center gap-2"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-ping" />
                    <span>+31 pacientes particulares/mês</span>
                  </motion.div>
                </div>
              </FloatingElement>
            </div>

          </div>
        </div>
      </section>

      {/* 2. OS 4 GARGALOS MORTAIS DO CONSULTÓRIO ODONTOLÓGICO */}
      <section className="py-20 bg-slate-50 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-600 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              Diagnóstico de Gargalos Odontológicos
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 uppercase">
              Por que dentistas qualificados continuam com horários vagos na agenda?
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              O dentista está com a mão na luva operando. A recepcionista está ocupada na recepção. O paciente que chamou no WhatsApp fica horas sem resposta e agenda no consultório ao lado.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center font-black">
                01
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Dentista com Mão na Luva
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Você não pode parar uma cirurgia de implante para responder o celular. Se sua clínica não tem atendimento imediato 24h, o paciente busca outro profissional no Google.
              </p>
            </div>

            <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 border border-amber-100 flex items-center justify-center font-black">
                02
              </div>
              <h3 className="text-base font-bold text-slate-900">
                O "Quanto Custa o Implante?"
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Curiosos mandam mensagem apenas buscando preço. Sem um roteiro consultivo que explique a tecnologia e a necessidade da avaliação tomográfica, o lead vai embora.
              </p>
            </div>

            <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center font-black">
                03
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Falta sem Aviso (No-Show)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Pacientes que marcam avaliação e não comparecem. Uma cadeira de implante ou ortodontia parada por 1 hora custa caro em hora clínica desperdiçada.
              </p>
            </div>

            <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center font-black">
                04
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Pacientes Inativos Esquecidos
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Centenas de fichas de pacientes que fizeram canal ou restauração há 1 ano e nunca mais foram convidados para profilaxia (limpeza) periódica ou alinhadores.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 3. SIMULADOR DE PREJUÍZO POR CADEIRA VAZIA */}
      <section className="py-20 bg-white relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#081B33] text-white p-8 sm:p-12 border border-sky-900/60 shadow-2xl space-y-8">
            
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <Badge variant="gold" size="md">
                ✦ Simulação Odontológica
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                Qual o custo da cadeira vazia na sua clínica?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Calcule o impacto financeiro de avaliações não agendadas e horários ociosos por mês.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-4">
              
              {/* Sliders */}
              <div className="space-y-6 bg-white/5 p-6 rounded-2xl border border-white/10">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-bold">
                    <span>Número de Dentistas / Cadeiras:</span>
                    <span className="text-sky-400 font-extrabold">{dentistas} {dentistas === 1 ? "dentista" : "dentistas"}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={dentistas}
                    onChange={(e) => setDentistas(Number(e.target.value))}
                    className="w-full accent-sky-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>1 consultório</span>
                    <span>5 consultórios</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-bold">
                    <span>Ticket Médio de Tratamento:</span>
                    <span className="text-emerald-400 font-extrabold">R$ {ticketMedio.toLocaleString("pt-BR")}</span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="8000"
                    step="500"
                    value={ticketMedio}
                    onChange={(e) => setTicketMedio(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>R$ 1.000 (Clareamento)</span>
                    <span>R$ 8.000 (Implantes / Invisalign)</span>
                  </div>
                </div>
              </div>

              {/* Output Result Tile */}
              <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-rose-950/40 via-slate-900 to-slate-950 border border-rose-500/30 text-center space-y-4 shadow-xl">
                <span className="text-xs uppercase tracking-wider font-bold text-rose-400 flex items-center justify-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  Impacto Mensal de Cadeira Vazia
                </span>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-rose-400">
                  R$ {lostRevenuePerMonth.toLocaleString("pt-BR")}
                  <span className="text-xs text-slate-400 font-normal block mt-1">/mês em tratamentos de alto ticket perdidos</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  O <strong>Sistema Vetor de IA Odontológica</strong> preenche sua agenda com pacientes pré-qualificados e reduz as faltas para menos de 10%.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 4. O SISTEMA VETOR PARA CONSULTÓRIOS ODONTOLÓGICOS */}
      <section className="py-20 bg-slate-50/50 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <Badge variant="cyan" size="md">
              ✦ O Ecossistema Completo
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 uppercase">
              Como Funciona o Sistema de Aquisição Odonto
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Unimos posicionamento de autoridade, tráfego local de alta intenção e inteligência artificial no WhatsApp para você focar apenas em atender bem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 border border-sky-200 flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                1. Site &amp; SEO Local Forte
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Páginas focadas em Implantes, Alinhadores e Estética Dental com SEO otimizado para sua clínica aparecer no topo quando o paciente busca &ldquo;dentista no [seu bairro]&rdquo;.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                2. Agente de IA Odonto 24/7
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Responde em 6 segundos, faz a triagem (particular ou convênio), esclarece dúvidas com vocabulário clínico simples e agenda a primeira consulta de avaliação.
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
                Podemos criar e gerenciar campanhas de alta intenção para busca no Google ou conectar a IA aos anúncios que sua agência atual já veicula.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 border border-purple-200 flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                4. Confirmação &amp; Lista de Espera
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Sistema que confirma a consulta 24h antes e, caso ocorra desistência, aciona automaticamente pacientes da lista de espera para preencher o horário vago.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 5. CASE REAL DO NICHO: CONSULTÓRIO DR. RAFAEL SILVEIRA */}
      <section className="py-20 bg-white relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-slate-50 border border-slate-200 p-8 sm:p-12 space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div className="space-y-1">
                <Badge variant="cyan" size="sm">Case Auditado &bull; Implantes &amp; Ortodontia</Badge>
                <h3 className="text-2xl font-black text-slate-900 uppercase">
                  Instituto Dr. Rafael Silveira &bull; Curitiba/PR
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500 font-medium">Prazo de Implantação:</span>
                <div className="text-sm font-extrabold text-sky-700">14 dias em produção</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center">
                <div className="text-3xl font-black text-emerald-600">+29</div>
                <div className="text-xs text-slate-600 font-medium mt-1">Avaliações de Implantes &amp; Alinhadores</div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center">
                <div className="text-3xl font-black text-sky-600">8 segundos</div>
                <div className="text-xs text-slate-600 font-medium mt-1">Tempo médio de resposta no WhatsApp</div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center">
                <div className="text-3xl font-black text-amber-600">R$ 112.000</div>
                <div className="text-xs text-slate-600 font-medium mt-1">Tratamentos fechados em 45 dias</div>
              </div>
            </div>

            <blockquote className="p-4 rounded-2xl bg-sky-50/60 border-l-4 border-sky-500 text-xs sm:text-sm text-slate-700 italic">
              &ldquo;Eu sempre tive dificuldade com o WhatsApp porque minha secretária ficava sobrecarregada com guias e telefonemas. A IA da Vetor respondeu às dúvidas dos pacientes sobre implantes com uma naturalidade impressionante, inclusive nos finais de semana. Passamos a fechar pacientes que antes desistiam pela demora no atendimento.&rdquo;
              <div className="mt-2 not-italic font-bold text-slate-900 text-xs">
                — Dr. Rafael Silveira, Implantodontista e Sócio-Diretor
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
              Descubra como colocar o Sistema no seu Consultório
            </h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              Sem pressão de vendas. Vamos analisar a presença digital da sua clínica e apresentar a projeção exata de novos tratamentos para o seu bairro.
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
                      placeholder="Dr. Eduardo Vasconcelos"
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:border-sky-400 text-sm"
                    />
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-xs font-bold text-slate-200">Nome do Consultório / Clínica *</label>
                    <input
                      type="text"
                      required
                      placeholder="Vasconcelos Odontologia Integrada"
                      value={formData.consultorio}
                      onChange={(e) => setFormData({ ...formData, consultorio: e.target.value })}
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
                    <label className="text-xs font-bold text-slate-200">Estrutura de Cadeiras / Dentistas</label>
                    <select
                      value={formData.numDentistas}
                      onChange={(e) => setFormData({ ...formData, numDentistas: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/20 text-white focus:outline-none focus:border-sky-400 text-sm"
                    >
                      <option value="1 consultório / 1 dentista">1 consultório / 1 dentista</option>
                      <option value="2 a 3 dentistas">2 a 3 dentistas</option>
                      <option value="4 ou mais dentistas">4 ou mais dentistas</option>
                      <option value="Rede / Múltiplas unidades">Rede / Múltiplas unidades</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1 text-left">
                  <label className="text-xs font-bold text-slate-200">Tratamento Principal que Deseja Alavancar</label>
                  <select
                    value={formData.focoPrincipal}
                    onChange={(e) => setFormData({ ...formData, focoPrincipal: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/20 text-white focus:outline-none focus:border-sky-400 text-sm"
                  >
                    <option value="Implantes Dentários & Protocolo">Implantes Dentários &amp; Protocolo</option>
                    <option value="Alinhadores Invisíveis (Invisalign)">Alinhadores Invisíveis (Invisalign)</option>
                    <option value="Lentes de Contato & Facetas">Lentes de Contato &amp; Facetas</option>
                    <option value="Ortodontia & Próteses">Ortodontia &amp; Próteses</option>
                    <option value="Clínica Geral & Reabilitação Completa">Clínica Geral &amp; Reabilitação Completa</option>
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
                  🔒 Seus dados estão 100% protegidos. Não compartilhamos informações com terceiros.
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
              Dúvidas Comuns dos Cirurgiões-Dentistas
            </h2>
          </div>

          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="text-base font-bold text-slate-900">
                &ldquo;Minha secretária já atende o WhatsApp, por que preciso de IA?&rdquo;
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                A secretária divide o tempo entre recepcionar pacientes na sala de espera, atender telefone fixo, receber pagamentos e emitir notas. A IA atua como um <strong>braço direito incansável</strong>: responde em 6 segundos nos picos de movimento, à noite e aos finais de semana, entregando para a sua secretária apenas as consultas já qualificadas e pré-agendadas.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="text-base font-bold text-slate-900">
                &ldquo;Atendo convênio e particular, como a IA lida com isso?&rdquo;
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                A IA é configurada com as regras exatas do seu consultório. Se um paciente busca um procedimento que você só atende particular (como Implante ou Invisalign), ela explica o valor do protocolo particular sem gerar frustração e direciona os casos de convênio de acordo com a sua política interna.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="text-base font-bold text-slate-900">
                &ldquo;Já anunciei antes no Google/Meta e só veio curioso sem dinheiro. O que muda?&rdquo;
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                O erro mais comum é anunciar sem segmentação de renda e direcionar o lead para uma conversa fria no WhatsApp sem script de qualificação. Na Vetor, alinhamos anúncios de alta intenção com uma <strong>condução consultiva imediata por IA</strong> que filtra quem tem perfil de compra antes de ocupar o seu tempo de avaliação.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="text-base font-bold text-slate-900">
                &ldquo;Qual o prazo de implantação no meu consultório?&rdquo;
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Em média de <strong>10 a 15 dias corridos</strong> o sistema completo de captação e o Agente de IA já estão configurados, testados e operando no seu WhatsApp oficial.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}