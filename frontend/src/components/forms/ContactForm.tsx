"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { submitContact } from "@/lib/api";
import { CheckCircle2, AlertCircle, Send, ShieldCheck } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Informe seu nome"),
  email: z.string().email("Informe um e-mail válido"),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(5, "A mensagem deve ter pelo menos 5 caracteres"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export const ContactForm: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      setServerError(null);
      await submitContact({
        ...data,
        source_url: "/contato",
      });
      setIsSuccess(true);
      reset();
    } catch (err: any) {
      setServerError(err.message || "Erro ao enviar mensagem.");
    }
  };

  if (isSuccess) {
    return (
      <div className="rounded-2xl bg-white border border-emerald-300 p-8 text-center space-y-3 shadow-md">
        <div className="w-12 h-12 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-center text-emerald-600 mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h4 className="text-xl font-bold text-slate-900">Mensagem Enviada!</h4>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Recebemos sua mensagem. Um consultor da Vetor Estratégico responderá o mais breve possível.
        </p>
        <div className="pt-2">
          <Button onClick={() => setIsSuccess(false)} variant="outline" size="sm">
            Enviar Outra Mensagem
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {serverError && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-red-300 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Nome"
          placeholder="Seu nome"
          required
          {...register("name")}
          error={errors.name?.message}
        />
        <Input
          label="E-mail"
          type="email"
          placeholder="seu@email.com"
          required
          {...register("email")}
          error={errors.email?.message}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="WhatsApp ou Telefone"
          placeholder="(11) 98765-4321"
          {...register("phone")}
          error={errors.phone?.message}
        />
        <Input
          label="Assunto"
          placeholder="Ex: Dúvida sobre implantação"
          {...register("subject")}
          error={errors.subject?.message}
        />
      </div>

      <Textarea
        label="Mensagem"
        placeholder="Como podemos te ajudar hoje?"
        required
        rows={4}
        {...register("message")}
        error={errors.message?.message}
      />

      <div className="flex items-center gap-2 text-xs text-text-muted">
        <ShieldCheck className="w-3.5 h-3.5 text-accent-emerald shrink-0" />
        <span>Privacidade garantida sob a LGPD.</span>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="md"
        className="w-full justify-center"
        isLoading={isSubmitting}
        rightIcon={<Send className="w-4 h-4" />}
      >
        Enviar Mensagem
      </Button>
    </form>
  );
};
