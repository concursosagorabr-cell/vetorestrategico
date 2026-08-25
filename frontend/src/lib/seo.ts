import { COMPANY_INFO, FAQS, SERVICES } from "@/lib/constants";

export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://vetorestrategico.com.br";

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": COMPANY_INFO.name,
    "alternateName": "Vetor Estratégico Desenvolvimento Web & IA",
    "url": BASE_URL,
    "logo": `${BASE_URL}/logo.png`,
    "image": `${BASE_URL}/logo.png`,
    "description": COMPANY_INFO.subheadline,
    "email": COMPANY_INFO.email,
    "telephone": "+55-11-95309-9049",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "São Paulo",
      "addressRegion": "SP",
      "addressCountry": "BR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-23.550520",
      "longitude": "-46.633308"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "19:00"
      }
    ],
    "areaServed": {
      "@type": "Country",
      "name": "Brazil"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Serviços de Criação de Sites & IA",
      "itemListElement": SERVICES.map((serv, idx) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": serv.title,
          "description": serv.shortDesc
        }
      }))
    },
    "sameAs": [
      "https://www.linkedin.com/company/vetor-estrategico",
      "https://www.instagram.com/vetorestrategico"
    ]
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": COMPANY_INFO.name,
    "url": BASE_URL,
    "description": COMPANY_INFO.headline,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${BASE_URL}/blog?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}

export function generateFaqSchema(customFaqs?: { question: string; answer: string }[]) {
  const faqList = customFaqs && customFaqs.length > 0 ? customFaqs : FAQS;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqList.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${BASE_URL}${item.url}`
    }))
  };
}

export function generateDirectoryItemListSchema(tools: { name: string; slug: string; shortDesc: string; rating: number; startingPrice?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Diretório de Ferramentas e Automações de IA para PMEs | Vetor Estratégico",
    "description": "Catálogo curado e verificado das melhores ferramentas de inteligência artificial, agentes de WhatsApp e automações de processos para empresas.",
    "numberOfItems": tools.length,
    "itemListElement": tools.map((tool, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "SoftwareApplication",
        "name": tool.name,
        "description": tool.shortDesc,
        "url": `${BASE_URL}/diretorio/${tool.slug}`,
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web, Cloud, WhatsApp",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": tool.rating.toString(),
          "bestRating": "5",
          "ratingCount": "30"
        }
      }
    }))
  };
}

export function generateSoftwareApplicationSchema(tool: {
  name: string;
  slug: string;
  shortDesc: string;
  fullDesc: string;
  rating: number;
  reviewsCount: number;
  startingPrice?: string;
  pricingLabel: string;
  categoryLabel: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.name,
    "description": tool.shortDesc,
    "url": `${BASE_URL}/diretorio/${tool.slug}`,
    "applicationCategory": "BusinessApplication",
    "applicationSubCategory": tool.categoryLabel,
    "operatingSystem": "Web, Cloud, WhatsApp Business API",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": tool.rating.toString(),
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": Math.max(tool.reviewsCount, 15).toString()
    },
    "offers": {
      "@type": "Offer",
      "price": tool.startingPrice ? tool.startingPrice.replace(/[^0-9]/g, "") : "0",
      "priceCurrency": "BRL",
      "category": tool.pricingLabel,
      "seller": {
        "@type": "Organization",
        "name": COMPANY_INFO.name,
        "url": BASE_URL
      }
    },
    "provider": {
      "@type": "Organization",
      "name": COMPANY_INFO.name,
      "url": BASE_URL
    }
  };
}
