import React from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { FeaturedCasesSection } from "@/components/sections/FeaturedCasesSection";
import { ProcessTimelineSection } from "@/components/sections/ProcessTimelineSection";
import { TechnicalBenefitsGrid } from "@/components/sections/TechnicalBenefitsGrid";
import { SolutionTypesGrid } from "@/components/sections/SolutionTypesGrid";
import { DirectorySpotlightSection } from "@/components/sections/DirectorySpotlightSection";
import { TrustDashboardSection } from "@/components/sections/TrustDashboardSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { AboutSnippetSection } from "@/components/sections/AboutSnippetSection";
import { DeliverablesChecklistSection } from "@/components/sections/DeliverablesChecklistSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { ProvocativeAlertSection } from "@/components/sections/ProvocativeAlertSection";
import { SegmentsSection } from "@/components/sections/SegmentsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { ComplementaryServicesSection } from "@/components/sections/ComplementaryServicesSection";
import { BlogHighlightsSection } from "@/components/sections/BlogHighlightsSection";
import { CtaBannerSection } from "@/components/sections/CtaBannerSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HowItWorksSection />
      <div className="section-defer">
        <FeaturedCasesSection />
      </div>
      <div className="section-defer">
        <ProcessTimelineSection />
      </div>
      <div className="section-defer">
        <TechnicalBenefitsGrid />
      </div>
      <div className="section-defer">
        <SolutionTypesGrid />
      </div>
      <div className="section-defer">
        <DirectorySpotlightSection />
      </div>
      <div className="section-defer">
        <TrustDashboardSection />
      </div>
      <div className="section-defer">
        <TestimonialsSection />
      </div>
      <div className="section-defer">
        <AboutSnippetSection />
      </div>
      <div className="section-defer">
        <DeliverablesChecklistSection />
      </div>
      <div className="section-defer">
        <PricingSection />
      </div>
      <div className="section-defer">
        <ProvocativeAlertSection />
      </div>
      <div className="section-defer">
        <SegmentsSection />
      </div>
      <div className="section-defer">
        <FaqSection />
      </div>
      <div className="section-defer">
        <ComplementaryServicesSection />
      </div>
      <div className="section-defer">
        <BlogHighlightsSection />
      </div>
      <div className="section-defer">
        <CtaBannerSection />
      </div>
    </>
  );
}
