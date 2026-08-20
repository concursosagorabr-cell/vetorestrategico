import React from "react";
import type { Metadata } from "next";
import { COMPANY_INFO } from "@/lib/constants";
import { Badge } from "@/components/ui/Badge";
import { ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Política de Privacidade & LGPD",
  description: "Conheça como a Vetor Estratégico coleta, trata e protege os seus dados pessoais em conformidade com a Lei Geral de Proteção de Dados (LGPD).",
};

export default function PoliticaPrivacidadePage() {
  return (
    <div className="py-12 sm:py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="space-y-3">
          <Badge variant="emerald" size="md">
            Conformidade LGPD
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Política de Privacidade e Proteção de Dados
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-medium">
            Última atualização: Agosto de 2026
          </p>
        </div>

        <div className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed space-y-6">
          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">1. Informações Gerais</h2>
            <p>
              A <strong>Vetor Estratégico</strong> (&ldquo;nós&rdquo; ou &ldquo;empresa&rdquo;) tem o firme compromisso de zelar pela privacidade e pela segurança dos dados pessoais de seus clientes, parceiros e visitantes do site, atuando em rigorosa observância à Lei Geral de Proteção de Dados Pessoais (Lei Federal nº 13.709/2018 - LGPD).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">2. Dados Coletados</h2>
            <p>Coletamos apenas as informações necessárias para fornecer nossos serviços e orçamentos:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Dados de identificação e contato:</strong> Nome, e-mail, telefone/WhatsApp, nome da empresa e segmento de atuação fornecidos voluntariamente através dos formulários de contato, propostas e diagnóstico de IA.</li>
              <li><strong>Dados de navegação técnica:</strong> Endereço IP, tipo de navegador, páginas visualizadas e cookies essenciais para garantir o funcionamento e a segurança do site.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">3. Finalidade do Tratamento</h2>
            <p>Os dados coletados destinam-se exclusivamente a:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Elaborar propostas comerciais e diagnósticos operacionais solicitados pelo usuário;</li>
              <li>Realizar contato consultivo via WhatsApp, telefone ou e-mail sobre nossos serviços de IA;</li>
              <li>Enviar artigos, newsletters e materiais educativos (quando expressamente autorizado pelo usuário);</li>
              <li>Cumprir obrigações legais e regulatórias.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">4. Não Compartilhamento e Segurança com IA</h2>
            <p>
              A Vetor Estratégico <strong>não comercializa nem compartilha</strong> dados de clientes com terceiros. No desenvolvimento e na operação de nossas soluções de Inteligência Artificial, utilizamos canais corporativos e modelos protegidos com garantia contratual de que os dados estratégicos da sua empresa não são utilizados para treinamento de modelos públicos de inteligência artificial de terceiros.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">5. Direitos do Titular de Dados</h2>
            <p>
              Conforme previsto no artigo 18 da LGPD, você pode, a qualquer momento, solicitar a confirmação da existência de tratamento, o acesso, a correção de dados incompletos ou a exclusão definitiva dos seus dados de nossas bases através do e-mail: <a href={`mailto:${COMPANY_INFO.email}`} className="text-emerald-700 underline font-semibold">{COMPANY_INFO.email}</a>.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">6. Contato com o Encarregado (DPO)</h2>
            <p>
              Para dúvidas sobre esta política ou sobre o tratamento dos seus dados, entre em contato diretamente com nossa equipe pelo e-mail: <strong className="text-slate-900 font-bold">{COMPANY_INFO.email}</strong>.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}
