import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  DIRECTORY_TOOLS,
  getToolBySlug,
  getRelatedTools,
} from "@/lib/directoryData";
import {
  generateSoftwareApplicationSchema,
  generateBreadcrumbSchema,
  generateFaqSchema,
} from "@/lib/seo";
import { ToolDetailClient } from "./ToolDetailClient";

interface ToolPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return DIRECTORY_TOOLS.map((tool) => ({
    slug: tool.slug,
  }));
}

export function generateMetadata({ params }: ToolPageProps): Metadata {
  const tool = getToolBySlug(params.slug);

  if (!tool) {
    return {
      title: "Ferramenta Não Encontrada | Vetor Estratégico",
    };
  }

  const title = `${tool.name} | Análise Técnica, Preços & ROI para PMEs`;
  const description = `${tool.shortDesc} Confira prós e contras, integrações, planos e como implementar com a Vetor Estratégico.`;

  return {
    title,
    description,
    keywords: [
      tool.name,
      tool.categoryLabel,
      ...tool.nicheLabels,
      "Implementação de IA",
      "Automação PME",
      "Vetor Estratégico",
    ],
    openGraph: {
      title: `${tool.name} | Diretório de IA Vetor Estratégico`,
      description,
      url: `https://vetorestrategico.com.br/diretorio/${tool.slug}`,
      type: "website",
    },
    alternates: {
      canonical: `https://vetorestrategico.com.br/diretorio/${tool.slug}`,
    },
  };
}

export default function ToolDetailPage({ params }: ToolPageProps) {
  const tool = getToolBySlug(params.slug);

  if (!tool) {
    notFound();
  }

  const relatedTools = getRelatedTools(tool, 3);

  // Structured Data Schemas for Google Rich Snippets
  const softwareSchema = generateSoftwareApplicationSchema(tool);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Início", url: "/" },
    { name: "Diretório de IA", url: "/diretorio" },
    { name: tool.name, url: `/diretorio/${tool.slug}` },
  ]);
  const faqSchema = tool.faqs ? generateFaqSchema(tool.faqs) : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <ToolDetailClient tool={tool} relatedTools={relatedTools} />
    </>
  );
}
