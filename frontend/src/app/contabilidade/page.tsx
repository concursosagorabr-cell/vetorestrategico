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
  Calculator,
  FileText,
} from "lucide-react";
import { motion } from "framer-motion";

export default function ContabilidadeLandingPage() {
  const [empresasAtuais, setEmpresasAtuais] = useState(60);
  const [mensalidadeMedia, setMensalidadeMedia] = useState(850);

  // Estimativa de novas empresas captadas por mês com o sistema de proposta rápida
  const novasEmpresasMes = Math.max(3, Math.round(empresasAtuais * 0.08));
  const faturamentoIncrementalAnual = novasEmpresasMes * mensalidadeMedia * 12;

  // Form State
  const [formData, setFormData] = useState({
    nome: "",
    escritorio: "",
    whatsapp: "",
    focoServico: "Abertura / Troca de Contador PJ",
    porteEscritorio: "50 a 150 clientes PJ",
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
          company: `${formData.escritorio} (Contabilidade - ${formData.porteEscritorio})`,
          whatsapp: formData.whatsapp,
          service_interest: `Landing Page Contabilidade - ${formData.focoServico}`,
          page_source: "/contabilidade",
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

        <TwinklingStar size={24} color="emerald" delay={0.2} style={{ position: "absolute", top: "12%", left: "10%" }} />
        <TwinklingStar size={18} color="gold" delay={1.3} style={{ position: "absolute", top: "26%", right: "12%" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Copy Left */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 shadow-xs">
                <span className="text-emerald-600 font-bold text-sm">✦</span>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Captação PJ &amp; Automação de Suporte para Contabilidades
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.08] uppercase">
                Capte novas empresas todo mês e automatize o{" "}
                <span className="gradient-text-emerald">Suporte Fiscal com IA</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Gere propostas comerciais imediatas para abertura e troca de contador, e libere sua equipe de tarefas repetitivas como envio de guias e cobrança de documentos no WhatsApp.
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
                  Triagem de Regime (Simples / Presumido / Real)
                </span>
                <span className="flex items-center gap-1.5 text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Geração Rápida de Propostas no WhatsApp
                </span>
                <span className="flex items-center gap-1.5 text-slate-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Conformidade com CRC &amp; LGPD Fiscal
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
                      src="/images/mascot/contabilidade.png"
                      alt="Mascote Vetor Especialista em Contabilidade"
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
                    <span>+38 contratos PJ captados</span>
                  </motion.div>
                </div>
              </FloatingElement>
            </div>

          </div>
        </div>
      </section>

      {/* 2. OS 4 GARGALOS NO ESCRITÓRIO CONTÁBIL */}
      <section className="py-20 bg-slate-50 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-600 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              Gargalos na Rotina Contábil
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 uppercase">
              Onde seu escritório está travando o crescimento?
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Escritórios que dependem apenas de indicação e perdem tempo enviando guias manualmente no WhatsApp ficam sem fôlego para escalar a carteira de clientes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center font-black">
                01
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Demora no Envio de Propostas
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                O empresário pede orçamento de contabilidade. Se você demora 2 dias para enviar um PDF de proposta, ele já fechou com uma contabilidade digital ágil.
              </p>
            </div>

            <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 border border-amber-100 flex items-center justify-center font-black">
                02
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Envio Repetitivo de 2ª Via de Guias
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Clientes pedindo DAS, FGTS, DARF e folhas de pagamento no WhatsApp o dia todo, interrompendo o foco dos seus analistas fiscais e contábeis.
              </p>
            </div>

            <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center font-black">
                03
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Cobrança de Documentos e Extratos
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Chega o dia 5 do mês e começa a maratona de cobrar extratos bancários (OFX), notas fiscais e comprovantes de despesas para fazer o fechamento contábil.
              </p>
            </div>

            <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center font-black">
                04
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Falta de Venda de BPO Financeiro
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Clientes da sua carteira que contratam consultoria financeira e emissão de notas de terceiros porque seu escritório não tem processo de oferta ativo.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 3. SIMULADOR FINANCEIRO */}
      <section className="py-20 bg-white relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#081F19] text-white p-8 sm:p-12 border border-emerald-800/60 shadow-2xl space-y-8">
            
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <Badge variant="gold" size="md">
                ✦ Projeção de Crescimento Contábil
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                Potencial de Expansão da Carteira PJ
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Simule o impacto de adicionar uma máquina ativa de propostas no seu escritório.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-4">
              
              <div className="space-y-6 bg-white/5 p-6 rounded-2xl border border-white/10">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-bold">
                    <span>Clientes PJ Atuais na Carteira:</span>
                    <span className="text-emerald-400 font-extrabold">{empresasAtuais} empresas</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="300"
                    step="10"
                    value={empresasAtuais}
                    onChange={(e) => setEmpresasAtuais(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>20 clientes</span>
                    <span>300 clientes</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-bold">
                    <span>Honorário Médio Mensal PJ:</span>
                    <span className="text-amber-400 font-extrabold">R$ {mensalidadeMedia.toLocaleString("pt-BR")}</span>
                  </div>
                  <input
                    type="range"
                    min="400"
                    max="3000"
                    step="100"
                    value={mensalidadeMedia}
                    onChange={(e) => setMensalidadeMedia(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>R$ 400 (MEI / Simples)</span>
                    <span>R$ 3.000 (Lucro Presumido / Real)</span>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-emerald-950/50 via-slate-900 to-slate-950 border border-emerald-500/40 text-center space-y-4 shadow-xl">
                <span className="text-xs uppercase tracking-wider font-bold text-emerald-400 flex items-center justify-center gap-1.5">
                  <TrendingUp className="w-4 h-4" />
                  Receita Recorrente Anual Adicional
                </span>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-emerald-400">
                  +R$ {faturamentoIncrementalAnual.toLocaleString("pt-BR")}
                  <span className="text-xs text-slate-400 font-normal block mt-1">/ano em novos honorários mensais recorrentes (MRR)</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Com o <strong>Sistema de Captação Contábil da Vetor</strong>, transformamos empresários que buscam contador no Google em propostas aceitas no WhatsApp.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 4. O SISTEMA VETOR PARA CONTABILIDADE */}
      <section className="py-20 bg-slate-50/50 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <Badge variant="emerald" size="md">
              ✦ O Ecossistema Contábil
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 uppercase">
              Como Funciona o Sistema para Escritórios Contábeis
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Unimos tecnologia de ponta para atrair empresas qualificadas e inteligência artificial para desafogar seu suporte.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                1. Portal Institucional &amp; Proposta Online
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Site moderno com calculadora de honorários e páginas focadas em Abertura de Empresa, Migração de Contador e BPO Financeiro.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 border border-sky-200 flex items-center justify-center">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                2. Agente de IA Comercial &amp; Triagem
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Responde em 6 segundos, coleta dados da empresa (CNAE, faturamento estimado, número de funcionários) e gera a proposta pré-formatada.
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
                Podemos gerenciar campanhas no Google para empresários buscando &ldquo;contador para empresas de TI / médicos / comércio&rdquo; ou plugar a IA no seu tráfego atual.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 border border-purple-200 flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                4. Automação de Suporte &amp; Extratos
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                IA que entrega 2ª via de guias em segundos e faz a régua automática de lembretes para envio de extratos bancários e notas fiscais.
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
                <Badge variant="emerald" size="sm">Case Auditado &bull; Contabilidade &amp; BPO Financeiro</Badge>
                <h3 className="text-2xl font-black text-slate-900 uppercase">
                  Nexus Contabilidade Digital &bull; Belo Horizonte/MG
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500 font-medium">Prazo de Implantação:</span>
                <div className="text-sm font-extrabold text-emerald-700">14 dias corridos</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center">
                <div className="text-3xl font-black text-emerald-600">+38</div>
                <div className="text-xs text-slate-600 font-medium mt-1">Novas empresas PJ em 60 dias</div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center">
                <div className="text-3xl font-black text-sky-600">120 horas</div>
                <div className="text-xs text-slate-600 font-medium mt-1">Economizadas no suporte/mês</div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center">
                <div className="text-3xl font-black text-amber-600">R$ 36.400</div>
                <div className="text-xs text-slate-600 font-medium mt-1">Novo faturamento mensal recorrente (MRR)</div>
              </div>
            </div>

            <blockquote className="p-4 rounded-2xl bg-emerald-50/60 border-l-4 border-emerald-500 text-xs sm:text-sm text-slate-700 italic">
              &ldquo;Antes da Vetor, nossos sócios gastavam mais de 3 horas por dia montando propostas manuais e negociando no WhatsApp. Com o agente de IA da Vetor, o cliente responde 4 perguntas rápidas e já recebe a proposta formatada com tabela de preços em segundos. Nossa taxa de conversão saltou de 14% para 39%.&rdquo;
              <div className="mt-2 not-italic font-bold text-slate-900 text-xs">
                — Carlos Eduardo Maia, Contador e Sócio-Diretor da Nexus
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
              Sem pressão de vendas. Vamos analisar seu modelo comercial e demonstrar a automação de propostas PJ.
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
                  Entraremos em contato pelo WhatsApp em até 15 minutos para agendar sua call.
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
                      placeholder="Contador André Barbosa"
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-400 text-sm"
                    />
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-xs font-bold text-slate-200">Nome do Escritório Contábil *</label>
                    <input
                      type="text"
                      required
                      placeholder="Barbosa Contabilidade &amp; BPO"
                      value={formData.escritorio}
                      onChange={(e) => setFormData({ ...formData, escritorio: e.target.value })}
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
                    <label className="text-xs font-bold text-slate-200">Porte Atual do Escritório</label>
                    <select
                      value={formData.porteEscritorio}
                      onChange={(e) => setFormData({ ...formData, porteEscritorio: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/20 text-white focus:outline-none focus:border-emerald-400 text-sm"
                    >
                      <option value="Até 30 clientes PJ">Até 30 clientes PJ</option>
                      <option value="30 a 80 clientes PJ">30 a 80 clientes PJ</option>
                      <option value="80 a 200 clientes PJ">80 a 200 clientes PJ</option>
                      <option value="Mais de 200 clientes PJ">Mais de 200 clientes PJ</option>
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
              Dúvidas dos Gestores de Contabilidade
            </h2>
          </div>

          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="text-base font-bold text-slate-900">
                &ldquo;Integra com sistemas contábeis como Domínio, Questor, Alterdata ou Omie?&rdquo;
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Sim! Podemos integrar a IA para distribuição de documentos fiscais, sincronização de contatos e alertas automáticos com os principais ERPs e sistemas do mercado contábil.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="text-base font-bold text-slate-900">
                &ldquo;Como a IA calcula o valor da proposta comercial?&rdquo;
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                A IA é treinada com a tabela de honorários e regras comerciais do seu próprio escritório (ex: número de sócios, regime tributário, quantidade de notas e faturamento), gerando uma proposta precisa e personalizada em instantes.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}