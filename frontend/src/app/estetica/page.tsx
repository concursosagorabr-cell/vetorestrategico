import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SEGMENTS_DATA } from "@/lib/segmentsData";
import { SegmentLandingTemplate } from "@/components/sections/SegmentLandingTemplate";

const segmentData = SEGMENTS_DATA["estetica"];

export const metadata: Metadata = {
  title: segmentData.seo.title,
  description: segmentData.seo.description,
  keywords: segmentData.seo.keywords,
  alternates: {
    canonical: `https://vetorestrategico.com.br/${segmentData.slug}`,
  },
  openGraph: {
    title: segmentData.seo.title,
    description: segmentData.seo.description,
    url: `https://vetorestrategico.com.br/${segmentData.slug}`,
    siteName: "Vetor Estratégico",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/images/mascot/estetica.png",
        width: 800,
        height: 800,
        alt: "Vetor Estratégico para Clínicas de Estética",
      },
    ],
  },
};

export default function EsteticaPage() {
  if (!segmentData) notFound();
  return <SegmentLandingTemplate data={segmentData} />;
}