import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSegmentIaData, SEGMENTS_DATA } from "@/lib/segmentsData";
import { SegmentLandingTemplate } from "@/components/sections/SegmentLandingTemplate";

export function generateStaticParams() {
  return Object.keys(SEGMENTS_DATA).map((segmento) => ({
    segmento,
  }));
}

export function generateMetadata({ params }: { params: { segmento: string } }): Metadata {
  const data = getSegmentIaData(params.segmento);
  if (!data) return {};
  return {
    title: data.seo.title,
    description: data.seo.description,
    keywords: data.seo.keywords,
  };
}

export default function IaSegmentPage({ params }: { params: { segmento: string } }) {
  const segmentData = getSegmentIaData(params.segmento);
  if (!segmentData) notFound();
  return <SegmentLandingTemplate data={segmentData} />;
}
