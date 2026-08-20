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
  ShoppingBag,
  ShoppingCart,
} from "lucide-react";
import { motion } from "framer-motion";

export default function EcommerceLandingPage() {
  const [faturamentoAtual, setFaturamentoAtual] = useState(80000);
  const [ticketMedio, setTicketMedio] = useState(250);

  // Estimativa de 15% a 25% de receita adicional com recuperação de carrinhos e Pix
  const receitaRecuperavel = Math.round(faturamentoAtual * 0.18);

  // Form State
  const [formData, setFormData] = useState({
    nome: "",
    loja: "",
    whatsapp: "",
    plataforma: "Shopify / Nuvemshop / WooCommerce",
    faturamento: "R$ 50k a R$ 200k/mês",
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
          company: `${formData.loja} (E-commerce - ${formData.plataforma})`,
          whatsapp: formData.whatsapp,
          service_interest: `Landing Page E-commerce - ${formData.faturamento}`,
          page_source: "/ecommerce",
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
      <section className="relative pt-10 pb-20 md:pt-16 md:pb-28 overflow-hidden bg-gradient-to-b from-amber-50/40 via-white to-white">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 left-10 w-80 h-80 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />

        <TwinklingStar size={24} color="gold" delay={0.2} style={{ position: "absolute", top: "12%", left: "10%" }} />
        <TwinklingStar size={18} color="emerald" delay={1.3} style={{ position: "absolute", top: "26%", right: "12%" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Copy Left */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 shadow-xs">
                <span className="text-amber-600 font-bold text-sm">✦</span>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                  Automação &amp; IA para E-commerce e Varejo
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.08] uppercase">
                Recupere até 35% das vendas perdidas no{" "}
                <span className="gradient-text-emerald">WhatsApp com IA</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Transforme carrinhos abandonados, Pix não pagos e dúvidas de clientes em faturamento no piloto automático com Agentes de Vendas integrados à sua loja virtual.
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
                  leftIcon={<MessageCircle className="w-5 h-5 text-amber-600" />}
                >
                  Falar no WhatsApp
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-slate-600 font-medium">
                <span className="flex items-center gap-1.5 text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Shopify, Nuvemshop, WooCommerce, Yampi
                </span>
                <span className="flex items-center gap-1.5 text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Recuperação Humanizada com IA
                </span>
                <span className="flex items-center gap-1.5 text-slate-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Rastreio e Pós-venda 24/7
                </span>
              </div>
            </div>

            {/* Mascot Right (Transparent PNG) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <FloatingElement yOffset={16} duration={4.5} rotateOffset={2.5}>
                <div className="relative w-72 h-72 sm:w-88 sm:h-88 flex items-center justify-center group cursor-pointer">
                  <div className="absolute inset-4 bg-amber-400/25 rounded-full blur-3xl pointer-events-none animate-pulse" />
                  <div className="relative w-full h-full drop-shadow-[0_25px_40px_rgba(217,119,6,0.3)] transition-transform duration-500 group-hover:scale-105">
                    <Image
                      src="/images/mascot/ecommerce.png"
                      alt="Mascote Vetor Especialista em E-commerce"
                      width={352}
                      height={352}
                      className="w-full h-full object-contain"
                      priority
                    />
                  </div>
                  <motion.div
                    animate={{ y: [-4, 4, -4] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-2 -left-2 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-amber-200 text-xs font-bold text-slate-900 flex items-center gap-2"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
                    <span>+35% carrinhos recuperados</span>
                  </motion.div>
                </div>
              </FloatingElement>
            </div>

          </div>
        </div>
      </section>

      {/* 2. OS 4 GARGALOS NO E-COMMERCE */}
      <section className="py-20 bg-slate-50 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-600 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              Gargalos no Funil de Vendas Online
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 uppercase">
              Por que 70% dos visitantes saem da sua loja sem finalizar o pedido?
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              O tráfego está cada vez mais caro. Se sua loja não aborda o cliente de forma persuasiva e rápida no WhatsApp, seu lucro fica no checkout abandonado.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center font-black">
                01
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Carrinho Abandonado
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                O cliente adiciona produtos, trava no frete ou na forma de pagamento e sai da loja. E-mails de recuperação têm taxa de abertura menor que 15%.
              </p>
            </div>

            <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 border border-amber-100 flex items-center justify-center font-black">
                02
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Pix e Boletos Pendentes
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Quase 40% dos Pix gerados não são pagos por distração do comprador. Sem um lembrete persuasivo e imediato no WhatsApp, a venda é perdida.
              </p>
            </div>

            <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center font-black">
                03
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Dúvidas Pré-Compra
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Clientes perguntam sobre prazo de entrega, tabela de medidas ou compatibilidade. Se o suporte demora 10 minutos para responder, ele compra em outro site.
              </p>
            </div>

            <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center font-black">
                04
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Falta de Recompra (LTV)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Sua loja gasta para adquirir o cliente mas nunca mais o convida para uma segunda compra no momento exato em que ele precisa de reposição.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 3. SIMULADOR FINANCEIRO */}
      <section className="py-20 bg-white relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#17140B] text-white p-8 sm:p-12 border border-amber-800/60 shadow-2xl space-y-8">
            
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <Badge variant="gold" size="md">
                ✦ Simulação E-commerce
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                Quanto sua loja pode recuperar todo mês?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Calcule a receita incremental gerada por recuperação de carrinhos e Pix no WhatsApp.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-4">
              
              <div className="space-y-6 bg-white/5 p-6 rounded-2xl border border-white/10">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-bold">
                    <span>Faturamento Mensal Atual:</span>
                    <span className="text-amber-400 font-extrabold">R$ {faturamentoAtual.toLocaleString("pt-BR")}</span>
                  </div>
                  <input
                    type="range"
                    min="20000"
                    max="500000"
                    step="10000"
                    value={faturamentoAtual}
                    onChange={(e) => setFaturamentoAtual(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>R$ 20.000/mês</span>
                    <span>R$ 500.000/mês</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-bold">
                    <span>Ticket Médio da Loja:</span>
                    <span className="text-emerald-400 font-extrabold">R$ {ticketMedio.toLocaleString("pt-BR")}</span>
                  </div>
                  <input
                    type="range"
                    min="80"
                    max="1000"
                    step="20"
                    value={ticketMedio}
                    onChange={(e) => setTicketMedio(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>R$ 80</span>
                    <span>R$ 1.000</span>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-emerald-950/50 via-slate-900 to-slate-950 border border-emerald-500/40 text-center space-y-4 shadow-xl">
                <span className="text-xs uppercase tracking-wider font-bold text-emerald-400 flex items-center justify-center gap-1.5">
                  <TrendingUp className="w-4 h-4" />
                  Receita Incremental Estimada
                </span>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-emerald-400">
                  +R$ {receitaRecuperavel.toLocaleString("pt-BR")}
                  <span className="text-xs text-slate-400 font-normal block mt-1">/mês adicionados ao seu caixa</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Utilizamos gatilhos inteligentes de escassez, cupom relâmpago e quebra de dúvidas para converter até <strong>35% dos checkouts abandonados</strong>.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 4. O SISTEMA VETOR PARA E-COMMERCE */}
      <section className="py-20 bg-slate-50/50 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <Badge variant="gold" size="md">
              ✦ O Ecossistema de Vendas
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 uppercase">
              Como Funciona o Sistema de IA para E-commerce
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Conectamos nossa tecnologia à sua plataforma existente em menos de 48 horas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center">
                <ShoppingCart className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                1. Recuperador Ativo de Carrinhos
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Mensagens personalizadas com a foto e nome do produto abandonado no WhatsApp em até 10 minutos após o abandono, oferecendo suporte e incentivos.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                2. Vendedor Virtual IA 24/7
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Agente inteligente que conhece todo o catálogo da sua loja, recomenda produtos complementares (upsell) e tira dúvidas técnicas em tempo real.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 border border-sky-200 flex items-center justify-center">
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
                Podemos criar e escalar campanhas de performance com alto ROAS ou plugar a automação de conversão nas campanhas que sua equipe já gerencia.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 border border-purple-200 flex items-center justify-center">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                4. Rastreio &amp; Motor de Recompra
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Notificações de envio e rastreamento direto no WhatsApp e ofertas de recompra programadas conforme o ciclo de vida de cada produto.
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
                <Badge variant="gold" size="sm">Case Auditado &bull; Moda &amp; Calçados</Badge>
                <h3 className="text-2xl font-black text-slate-900 uppercase">
                  Bella Shoes &amp; Moda Feminina
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500 font-medium">Plataforma:</span>
                <div className="text-sm font-extrabold text-amber-700">Shopify + Nuvemshop</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center">
                <div className="text-3xl font-black text-emerald-600">R$ 142.000</div>
                <div className="text-xs text-slate-600 font-medium mt-1">Recuperados em 60 dias</div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center">
                <div className="text-3xl font-black text-sky-600">34%</div>
                <div className="text-xs text-slate-600 font-medium mt-1">Conversão de Pix pendentes</div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center">
                <div className="text-3xl font-black text-amber-600">11.4x</div>
                <div className="text-xs text-slate-600 font-medium mt-1">Retorno sobre o Investimento (ROAS)</div>
              </div>
            </div>

            <blockquote className="p-4 rounded-2xl bg-amber-50/60 border-l-4 border-amber-500 text-xs sm:text-sm text-slate-700 italic">
              &ldquo;Antes da Vetor, tentávamos recuperar carrinhos só com e-mails automáticos e tínhamos quase zero retorno. Quando colocamos a IA no WhatsApp com áudios humanizados e links de checkout rápido, nosso faturamento subiu mais de 20% no primeiro mês sem gastar R$ 1 a mais em anúncios.&rdquo;
              <div className="mt-2 not-italic font-bold text-slate-900 text-xs">
                — Rodrigo Almeida, Head de Growth &amp; E-commerce
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
              Descubra como colocar o Sistema na sua Loja
            </h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              Sem pressão de vendas. Vamos auditar a taxa de conversão do seu checkout e apresentar o plano de recuperação.
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
                  Nosso especialista em e-commerce entrará em contato pelo WhatsApp para agendar sua sessão.
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
                      placeholder="Marcos Silveira"
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-400 text-sm"
                    />
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-xs font-bold text-slate-200">Nome da Loja Virtual / Site *</label>
                    <input
                      type="text"
                      required
                      placeholder="www.sualoja.com.br"
                      value={formData.loja}
                      onChange={(e) => setFormData({ ...formData, loja: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-400 text-sm"
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
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-400 text-sm"
                    />
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-xs font-bold text-slate-200">Plataforma de E-commerce</label>
                    <select
                      value={formData.plataforma}
                      onChange={(e) => setFormData({ ...formData, plataforma: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/20 text-white focus:outline-none focus:border-amber-400 text-sm"
                    >
                      <option value="Shopify">Shopify</option>
                      <option value="Nuvemshop">Nuvemshop</option>
                      <option value="WooCommerce">WooCommerce</option>
                      <option value="VTEX">VTEX</option>
                      <option value="Yampi / CartPanda">Yampi / CartPanda</option>
                      <option value="Outra Plataforma">Outra Plataforma</option>
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
            <Badge variant="gold" size="md">
              Perguntas Frequentes
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-slate-900">
              Dúvidas de Quem Vende Online
            </h2>
          </div>

          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="text-base font-bold text-slate-900">
                &ldquo;As mensagens no WhatsApp não correm risco de banimento de número?&rdquo;
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Não! Trabalhamos exclusivamente através da <strong>API Oficial do WhatsApp (Meta Cloud API / BSP)</strong> com templates aprovados pela Meta e respeito às políticas de opt-in, garantindo 100% de segurança para o número da sua marca.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="text-base font-bold text-slate-900">
                &ldquo;Preciso contratar programador para instalar?&rdquo;
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Não. Nossa equipe realiza toda a integração técnica com a sua plataforma (Shopify, Nuvemshop, WooCommerce, etc.) e entrega o sistema pronto e testado em funcionamento.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}