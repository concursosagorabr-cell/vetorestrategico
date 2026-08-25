export type ToolNiche =
  | "clinicas"
  | "odontologia"
  | "estetica"
  | "advocacia"
  | "contabilidade"
  | "ecommerce"
  | "imobiliarias"
  | "vendas-b2b"
  | "geral";

export type ToolCategory =
  | "whatsapp-atendimento"
  | "geracao-leads"
  | "automacao-processos-rpa"
  | "bi-analise-dados"
  | "conteudo-marketing"
  | "agendamento-consultas"
  | "gestao-documental"
  | "integracao-sistemas";

export type ToolPricingType =
  | "gratuito"
  | "freemium"
  | "pme-acessivel"
  | "enterprise"
  | "sob-consulta";

export type ImplementationComplexity =
  | "plug-and-play"
  | "baixa"
  | "media"
  | "assistida-vetor";

export interface ToolIntegration {
  name: string;
  badge: string;
  icon?: string;
}

export interface ToolPricingPlan {
  name: string;
  price: string;
  period: string;
  highlight?: boolean;
  features: string[];
}

export interface ToolReview {
  author: string;
  company: string;
  segment: string;
  rating: number;
  comment: string;
  date: string;
}

export interface ToolFaq {
  question: string;
  answer: string;
}

export interface DirectoryTool {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  shortDesc: string;
  fullDesc: string;
  logoUrl?: string;
  logoBgColor?: string;
  category: ToolCategory;
  categoryLabel: string;
  niches: ToolNiche[];
  nicheLabels: string[];
  pricingType: ToolPricingType;
  pricingLabel: string;
  startingPrice?: string;
  pricingPeriod?: string;
  complexity: ImplementationComplexity;
  complexityLabel: string;
  
  // Scores (0-10)
  rating: number; // 0 to 5 for general rating
  vetorScore: number; // 0 to 10
  scores: {
    velocidade: number;
    facilidade: number;
    suporte: number;
    custoBeneficio: number;
    segurancaLgpd: number;
  };

  // Badges & Flags
  isFeatured?: boolean;
  isVerifiedByVetor?: boolean;
  isSponsored?: boolean;
  isTopChoice?: boolean;
  
  // Pros & Cons
  pros: string[];
  cons: string[];
  
  // Features & Capabilities
  keyFeatures: string[];
  integrations: ToolIntegration[];
  pricingPlans: ToolPricingPlan[];
  
  // ROI Estimates
  estimatedMonthlyHoursSaved: number;
  estimatedMonthlySavings: number;
  paybackPeriodDays: number;
  
  // Affiliate / Partner Links & Coupons
  affiliateUrl: string;
  couponCode?: string;
  couponDiscount?: string;
  websiteUrl: string;
  
  // Implementation by Vetor
  vetorImplementationHours: string;
  vetorDeliverables: string[];
  
  // Reviews & FAQ
  reviewsCount: number;
  reviews: ToolReview[];
  faqs: ToolFaq[];
  
  publishedAt: string;
  updatedAt: string;
}

export interface ToolSubmissionFormData {
  toolName: string;
  websiteUrl: string;
  contactName: string;
  contactEmail: string;
  contactWhatsapp: string;
  category: ToolCategory | string;
  niches: ToolNiche[] | string[];
  pricingType: ToolPricingType | string;
  shortDescription: string;
  fullDescription: string;
  planRequested: "free" | "verified_featured" | "sponsored_partner";
  hasAffiliateProgram?: boolean;
  affiliateCommissionDetails?: string;
  discountCouponForVetorUsers?: string;
  notes?: string;
}
