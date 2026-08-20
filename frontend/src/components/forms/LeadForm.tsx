"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { submitLead } from "@/lib/api";
import { CheckCircle2, AlertCircle, ArrowRight, ShieldCheck } from "lucide-react";

const leadSchema = z.object({
  name: z.string().min(2, "Informe seu nome completo"),
  email: z.string().email("Informe um e-mail válido"),
  phone: z.string().min(10, "Informe seu WhatsApp com DDD"),
  company_name: z.string().min(2, "Informe o nome da sua empresa"),
  company_size: z.string().min(1, "Selecione o tamanho da equipe"),
  segment: z.string().min(1, "Selecione o segmento"),
  main_pain: z.string().min(1, "Selecione o principal objetivo ou serviço"),
  estimated_budget: z.string().optional(),
  message: z.string().optional(),
});

type LeadFormValues = z.infer<typeof leadSchema>;

const COMPANY_SIZE_OPTIONS = [
  { value: "1 a 5 colaboradores", label: "1 a 5 colaboradores" },
  { value: "6 a 20 colaboradores", label: "6 a 20 colaboradores" },
  { value: "21 a 50 colaboradores", label: "21 a 50 colaboradores" },
  { value: "Mais de 50 colaboradores", label: "Mais de 50 colaboradores" },
];

const SEGMENT_OPTIONS = [
  { value: "Saúde, Clínicas & Consultórios", label: "Saúde, Clínicas & Consultórios" },
  { value: "E-commerce & Varejo", label: "E-commerce & Varejo" },
  { value: "Advocacia & Serviços Jurídicos", label: "Advocacia & Serviços Jurídicos" },
  { value: "Contabilidade & Finanças", label: "Contabilidade & Finanças" },
  { value: "Indústria, Logística & Distribuição", label: "Indústria, Logística & Distribuição" },
  { value: "Imobiliária & Construção", label: "Imobiliária & Construção" },
  { value: "Serviços B2B & Consultoria", label: "Serviços B2B & Consultoria" },
  { value: "Outro Segmento", label: "Outro Segmento" },
];

const MAIN_PAIN_OPTIONS = [
  { value: "Criação de Landing Page Express de Alta Conversão", label: "Criação de Landing Page Express de Alta Conversão" },
  { value: "Criação de Site Institucional Completo / Elaborado", label: "Criação de Site Institucional Completo / Elaborado" },
  { value: "Atendimento inteligente e agendamento no WhatsApp com IA", label: "Atendimento inteligente e agendamento no WhatsApp com IA" },
  { value: "Demora para qualificar e responder leads de vendas", label: "Demora para qualificar e responder leads de vendas" },
  { value: "Tarefas manuais e digitação repetitiva de documentos (RPA)", label: "Tarefas manuais e digitação repetitiva de documentos (RPA)" },
  { value: "Dificuldade para cruzar dados e gerar relatórios", label: "Dificuldade para cruzar dados e gerar relatórios" },
  { value: "Treinamento da equipe e consultoria em IA", label: "Treinamento da equipe e consultoria em IA" },
];

const BUDGET_OPTIONS = [
  { value: "Até R$ 2.500", label: "Até R$ 2.500 (Landing Page Express / Projeto Inicial)" },
  { value: "R$ 2.500 a R$ 5.000", label: "R$ 2.500 a R$ 5.000 (Site Institucional / Automação IA)" },
  { value: "R$ 5.000 a R$ 10.000", label: "R$ 5.000 a R$ 10.000 (Plataforma Completa / Squad IA)" },
  { value: "Acima de R$ 10.000", label: "Acima de R$ 10.000 (Enterprise Custom)" },
  { value: "Ainda não definido", label: "Ainda não definido" },
];

interface LeadFormProps {
  initialPlan?: string;
  sourceUrl?: string;
}

export const LeadForm: React.FC<LeadFormProps> = ({ initialPlan, sourceUrl = "/contato" }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      message: initialPlan ? `Interesse no plano/serviço: ${initialPlan}` : "",
      main_pain: initialPlan?.includes("presenca-essencial") || initialPlan?.includes("site-expresso")
        ? "Presença Essencial & Captação Direta"
        : initialPlan?.includes("plataforma-institucional") || initialPlan?.includes("site-elaborado")
        ? "Plataforma Institucional Completa"
        : initialPlan?.includes("plataforma-automacao")
        ? "Plataforma Web com Automação Integrada"
        : "",
    },
  });

  const onSubmit = async (data: LeadFormValues) => {
    try {
      setServerError(null);
      await submitLead({
        ...data,
        source_url: sourceUrl,
      });
      setIsSuccess(true);
      reset();
    } catch (err: any) {
      setServerError(err.message || "Ocorreu um erro ao enviar sua solicitação.");
    }
  };

  if (isSuccess) {
    return (
      <div className="rounded-2xl bg-white border border-emerald-300 p-8 sm:p-10 text-center space-y-4 shadow-xl">
        <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-center text-emerald-600 mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900">
          Solicitação Recebida com Sucesso!
        </h3>
        <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
          Nossa equipe analisará sua solicitação e entrará em contato via WhatsApp/E-mail em até 2 horas úteis com os detalhes da proposta.
        </p>
        <div className="pt-4">
          <Button onClick={() => setIsSuccess(false)} variant="outline" size="sm">
            Enviar Outra Solicitação
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {serverError && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-red-300 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Seu Nome Completo"
          placeholder="Ex: Carlos Silva"
          required
          {...register("name")}
          error={errors.name?.message}
        />
        <Input
          label="E-mail Profissional"
          type="email"
          placeholder="carlos@empresa.com.br"
          required
          {...register("email")}
          error={errors.email?.message}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="WhatsApp com DDD"
          placeholder="(11) 98765-4321"
          required
          {...register("phone")}
          error={errors.phone?.message}
        />
        <Input
          label="Nome da Empresa"
          placeholder="Ex: Silva Distribuidora"
          required
          {...register("company_name")}
          error={errors.company_name?.message}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Tamanho da Equipe"
          options={COMPANY_SIZE_OPTIONS}
          required
          {...register("company_size")}
          error={errors.company_size?.message}
        />
        <Select
          label="Segmento da Empresa"
          options={SEGMENT_OPTIONS}
          required
          {...register("segment")}
          error={errors.segment?.message}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Principal Interesse ou Serviço"
          options={MAIN_PAIN_OPTIONS}
          required
          {...register("main_pain")}
          error={errors.main_pain?.message}
        />
        <Select
          label="Faixa de Orçamento Estimada"
          options={BUDGET_OPTIONS}
          placeholder="Selecione (opcional)"
          {...register("estimated_budget")}
          error={errors.estimated_budget?.message}
        />
      </div>

      <Textarea
        label="Detalhes ou Contexto do Projeto (Opcional)"
        placeholder="Conte-nos como podemos ajudar: precisa de uma landing page, portal institucional completo ou automação de atendimento com IA?..."
        {...register("message")}
        error={errors.message?.message}
      />

      <div className="flex items-center gap-2 text-xs text-text-muted">
        <ShieldCheck className="w-4 h-4 text-accent-emerald shrink-0" />
        <span>Seus dados estão protegidos de acordo com a LGPD e nunca serão compartilhados com terceiros.</span>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full justify-center font-bold"
        isLoading={isSubmitting}
        rightIcon={<ArrowRight className="w-4 h-4" />}
      >
        Solicitar Orçamento Personalizado
      </Button>
    </form>
  );
};
