import React from "react";
import type { Metadata } from "next";
import { COMPANY_INFO } from "@/lib/constants";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Termos e condições gerais de utilização do site e serviços da Vetor Estratégico.",
};

export default function TermosUsoPage() {
  return (
    <div className="py-12 sm:py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="space-y-3">
          <Badge variant="cyan" size="md">
            Termos & Condições
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Termos de Uso do Website
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-medium">
            Última atualização: Agosto de 2026
          </p>
        </div>

        <div className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed space-y-6">
          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">1. Aceitação dos Termos</h2>
            <p>
              Ao acessar e navegar pelo website da <strong>Vetor Estratégico</strong>, você concorda com os presentes Termos de Uso e com nossa Política de Privacidade. Caso não concorde com algum dos termos, recomendamos a não utilização do portal.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">2. Objeto do Site</h2>
            <p>
              Este website destina-se a fornecer informações institucionais, artigos educativos sobre Inteligência Artificial aplicada a negócios, ferramentas de diagnóstico preliminar e canais para solicitação de orçamentos e contratação de serviços de consultoria e tecnologia.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">3. Propriedade Intelectual</h2>
            <p>
              Todos os textos, marcas, logotipos, ilustrações, códigos e estruturas visuais disponibilizados neste site são de propriedade exclusiva da Vetor Estratégico ou licenciados para seu uso, sendo vedada a reprodução total ou parcial sem autorização prévia por escrito.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">4. Diagnósticos e Estimativas</h2>
            <p>
              As estimativas de economia de horas e pontuações calculadas no Diagnóstico de IA são projeções baseadas em médias históricas e têm caráter informativo e consultivo. O escopo e as métricas contratuais de cada cliente são formalizados através de proposta comercial e contrato de prestação de serviços específico.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">5. Foro e Legislação Aplicável</h2>
            <p>
              Os presentes termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o Foro da Comarca de São Paulo/SP para dirimir quaisquer dúvidas ou litígios decorrentes deste documento.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}
