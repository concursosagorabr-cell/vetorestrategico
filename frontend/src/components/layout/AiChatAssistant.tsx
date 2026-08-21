"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Minimize2, Sparkles, MessageCircle, Moon, Sun, ArrowRight } from "lucide-react";
import Link from "next/link";
import { COMPANY_INFO } from "@/lib/constants";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const AiChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isNightShift, setIsNightShift] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Olá! Sou o **Comandante Vetor**, consultor de IA da Vetor Estratégico. 🚀\n\nComo posso ajudar sua empresa hoje? Posso tirar dúvidas sobre nossos **sites de alta conversão**, **automações no WhatsApp 24/7** ou ajudar você a calcular o potencial de ganho com IA.",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const now = new Date();
      const timeString = now.toLocaleTimeString("pt-BR", { timeZone: "America/Sao_Paulo" });
      const hour = parseInt(timeString.split(":")[0], 10);
      setIsNightShift(hour >= 18 || hour < 8);
    } catch {
      const hour = new Date().getHours();
      setIsNightShift(hour >= 18 || hour < 8);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input.trim();
    if (!text || loading) return;

    const userMessage: Message = { role: "user", content: text };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) {
        throw new Error("Falha ao conectar com o agente.");
      }

      const data = await response.json();
      if (data.isNightShift !== undefined) {
        setIsNightShift(data.isNightShift);
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            `Estou com uma instabilidade momentânea na conexão. Por favor, fale diretamente com nossa equipe pelo WhatsApp: **${COMPANY_INFO.phone}**!`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickPills = [
    "Como funciona o Agente no WhatsApp 24/7?",
    "Quanto custa um site ou automação?",
    "Quero fazer o Diagnóstico de IA Grátis",
    "Quais os prazos de entrega?",
  ];

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 left-6 z-50 flex items-center gap-3 pointer-events-auto">
        <motion.button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center gap-2.5 bg-slate-900/90 hover:bg-slate-900 text-white border border-emerald-500/40 px-4 py-3 rounded-full shadow-2xl backdrop-blur-md transition-all group"
          aria-label="Abrir Consultor de IA"
        >
          <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 opacity-40 group-hover:opacity-75 blur-sm transition-all duration-300 animate-pulse" />

          <div className="relative w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center overflow-hidden shrink-0">
            <Image
              src="/images/mascot/avatar.png"
              alt="Comandante Vetor"
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative flex flex-col text-left">
            <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1.5 leading-none">
              {isNightShift ? (
                <>
                  <Moon className="w-3 h-3 text-amber-400 animate-pulse" />
                  Plantão Noturno IA (18h-08h)
                </>
              ) : (
                <>
                  <Sparkles className="w-3 h-3 text-emerald-400" />
                  Consultor de IA Online
                </>
              )}
            </span>
            <span className="text-[12px] font-medium text-slate-200">
              {isOpen ? "Fechar conversa" : "Dúvidas? Fale com a IA"}
            </span>
          </div>
        </motion.button>
      </div>

      {/* Interactive Chat Window Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 left-6 z-50 w-[92vw] sm:w-[400px] h-[520px] max-h-[80vh] bg-slate-950/95 border border-slate-800 text-slate-100 rounded-3xl shadow-2xl backdrop-blur-xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border-b border-slate-800/80 p-3.5 px-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full bg-emerald-500/10 border-2 border-emerald-400/50 p-0.5 overflow-hidden">
                  <Image
                    src="/images/mascot/avatar.png"
                    alt="Comandante Vetor"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-slate-950 rounded-full" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    Comandante Vetor
                    <span className="text-[10px] uppercase tracking-wider bg-emerald-500/20 text-emerald-300 font-semibold px-2 py-0.5 rounded-full border border-emerald-500/30">
                      IA
                    </span>
                  </h4>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1">
                    {isNightShift ? (
                      <span className="text-amber-300 flex items-center gap-1">
                        <Moon className="w-3 h-3" /> Plantão Ativo (18:00 às 08:00)
                      </span>
                    ) : (
                      <span className="text-emerald-400 flex items-center gap-1">
                        <Sun className="w-3 h-3" /> Atendimento Online
                      </span>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-slate-400">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                  aria-label="Minimizar chat"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                  aria-label="Fechar chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Shift Announcement Banner */}
            {isNightShift && (
              <div className="bg-amber-950/40 border-b border-amber-500/20 px-3.5 py-2 text-[11px] text-amber-200/90 flex items-center gap-2">
                <Moon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>
                  <strong>Horário de Plantão:</strong> A equipe humana retorna às 08h00, mas estou aqui para tirar todas as dúvidas!
                </span>
              </div>
            )}

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin scrollbar-thumb-slate-800 text-xs">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 leading-relaxed ${
                      msg.role === "user"
                        ? "bg-emerald-600 text-white rounded-br-none shadow-md shadow-emerald-900/30"
                        : "bg-slate-900 border border-slate-800/80 text-slate-200 rounded-bl-none"
                    }`}
                  >
                    <div className="whitespace-pre-line space-y-1.5">
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-slate-900 border border-slate-800/80 rounded-2xl rounded-bl-none p-3 px-4 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions Pills */}
            {messages.length <= 2 && !loading && (
              <div className="px-3 pb-2 flex flex-wrap gap-1.5">
                {quickPills.map((pill, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSend(pill)}
                    className="text-[11px] bg-slate-900/90 hover:bg-emerald-950/60 hover:text-emerald-300 border border-slate-800 hover:border-emerald-500/40 text-slate-300 px-2.5 py-1 rounded-full transition-all text-left"
                  >
                    {pill}
                  </button>
                ))}
              </div>
            )}

            {/* Input Footer */}
            <div className="p-3 bg-slate-900/80 border-t border-slate-800/80">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Digite sua dúvida ou sobre sua empresa..."
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="p-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:hover:bg-emerald-600 text-white rounded-xl transition-all shadow-md shadow-emerald-900/30 flex items-center justify-center shrink-0"
                  aria-label="Enviar mensagem"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>

              <div className="mt-2 pt-2 border-t border-slate-800/40 flex items-center justify-between text-[10px] text-slate-400">
                <Link
                  href="/diagnostico"
                  onClick={() => setIsOpen(false)}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1 font-medium"
                >
                  🎯 Diagnóstico de IA <ArrowRight className="w-2.5 h-2.5" />
                </Link>
                <a
                  href={COMPANY_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <MessageCircle className="w-3 h-3" /> WhatsApp Direto
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
