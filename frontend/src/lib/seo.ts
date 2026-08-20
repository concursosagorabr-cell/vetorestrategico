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
    "telephone": "+55-11-91907-2390",
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

export function generateFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
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
