import React from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaBannerSection } from "@/components/sections/CtaBannerSection";

export default function ConversaoPage() {
  return (
    <>
      <HeroSection />
      <PricingSection />
      <FaqSection />
      <CtaBannerSection />
    </>
  );
}
