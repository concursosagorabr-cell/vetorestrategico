import React from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaBannerSection } from "@/components/sections/CtaBannerSection";

export default function IaPage() {
  return (
    <>
      <HeroSection />
      <HowItWorksSection />
      <PricingSection />
      <FaqSection />
      <CtaBannerSection />
    </>
  );
}
