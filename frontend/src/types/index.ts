export interface LeadFormData {
  name: string;
  email: string;
  phone?: string;
  company_name?: string;
  company_size?: string;
  segment?: string;
  main_pain?: string;
  estimated_budget?: string;
  message?: string;
  source_url?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  source_url?: string;
}

export interface QuizSubmissionData {
  segment: string;
  company_size: string;
  main_bottleneck: string;
  digital_maturity: string;
  name: string;
  email: string;
  phone: string;
  company_name: string;
  accepts_lgpd?: boolean;
}

export interface QuizResultData {
  opportunity_score: number;
  maturity_level: string;
  estimated_hours_saved_month: string;
  priority_action: string;
  recommendation_title: string;
  recommendation_summary: string;
  key_deliverables: string[];
  lead_id?: number;
}

export interface CaseStudy {
  id: string;
  slug: string;
  clientName: string;
  segment: string;
  logoText: string;
  tagline: string;
  websiteUrl?: string;
  metrics: {
    label: string;
    value: string;
    highlight?: boolean;
  }[];
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  badge: string;
  benefits: string[];
  targetAudience: string;
  deliverables: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  segment: string;
  rating: number;
  avatarUrl: string;
  content: string;
  metricHighlight: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  badge?: string;
  price: string;
  period: string;
  popular?: boolean;
  description: string;
  deliverables: string[];
  idealFor: string;
  ctaText: string;
  ctaHref: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  publishDate: string;
  author: {
    name: string;
    role: string;
    avatarUrl: string;
  };
  tags: string[];
  coverImage?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export * from "./directory";
