import React from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { TechnicalBenefitsGrid } from "@/components/sections/TechnicalBenefitsGrid";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { CtaBannerSection } from "@/components/sections/CtaBannerSection";

export default function GenericPage() {
  return (
    <>
      <HeroSection />
      <TechnicalBenefitsGrid />
      <TestimonialsSection />
      <PricingSection />
      <CtaBannerSection />
    </>
  );
}
