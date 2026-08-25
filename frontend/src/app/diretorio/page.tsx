import React, { Suspense } from "react";
import type { Metadata } from "next";
import { DIRECTORY_TOOLS } from "@/lib/directoryData";
import { generateDirectoryItemListSchema } from "@/lib/seo";
import { DirectoryHubClient } from "./DirectoryHubClient";

export const metadata: Metadata = {
  title: "Diretório de Ferramentas de IA & Automações para Empresas",
  description:
    "Catálogo curado e verificado das melhores ferramentas de inteligência artificial, agentes de atendimento no WhatsApp, automações de processos (RPA) e integrações para PMEs.",
  keywords: [
    "Diretório de IA",
    "Ferramentas de IA para Empresas",
    "Agentes de WhatsApp Inteligente",
    "Automação de Processos RPA",
    "IA para Clínicas",
    "IA para Advocacia",
    "IA para Contabilidade",
    "IA para E-commerce",
    "Vetor Estratégico",
  ],
  openGraph: {
    title: "Diretório de Ferramentas de IA & Automações para Empresas | Vetor Estratégico",
    description:
      "Pesquise, compare e implemente as ferramentas de IA e automações mais eficientes para clínicas, escritórios, e-commerces e PMEs.",
    url: "https://vetorestrategico.com.br/diretorio",
  },
  alternates: {
    canonical: "https://vetorestrategico.com.br/diretorio",
  },
};

export default function DirectoryPage() {
  const directorySchema = generateDirectoryItemListSchema(DIRECTORY_TOOLS);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(directorySchema) }}
      />
      <Suspense
        fallback={
          <div className="py-24 text-center text-slate-500 min-h-screen flex items-center justify-center">
            <div className="space-y-3">
              <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-sm font-medium">Carregando catálogo de ferramentas de IA...</p>
            </div>
          </div>
        }
      >
        <DirectoryHubClient />
      </Suspense>
    </>
  );
}
