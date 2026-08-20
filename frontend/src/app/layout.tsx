import type { Metadata } from "next";
import Script from "next/script";
import "@/styles/globals.css";
import { COMPANY_INFO } from "@/lib/constants";
import {
  generateOrganizationSchema,
  generateFaqSchema,
  generateWebSiteSchema,
} from "@/lib/seo";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloatingButton } from "@/components/layout/WhatsAppFloatingButton";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { ExitIntentModal } from "@/components/layout/ExitIntentModal";

export const metadata: Metadata = {
  metadataBase: new URL("https://vetorestrategico.com.br"),
  title: {
    default: "Vetor Estratégico | Criação de Sites de Alta Performance & IA para PMEs",
    template: "%s | Vetor Estratégico",
  },
  description:
    "Desenvolvemos sites profissionais ultrarrápidos e soluções de automação e IA no WhatsApp para empresas que buscam captação de clientes e eficiência operacional.",
  keywords: [
    "Criação de Sites Profissionais",
    "Desenvolvimento de Landing Pages",
    "Sites Institucionais de Alta Velocidade",
    "Automação de Atendimento WhatsApp",
    "Agentes de IA para Empresas",
    "SEO Técnico para Google",
    "Otimização Core Web Vitals",
    "Vetor Estratégico",
    "Engenharia Web São Paulo",
  ],
  authors: [{ name: "Vetor Estratégico", url: "https://vetorestrategico.com.br" }],
  creator: "Vetor Estratégico",
  publisher: "Vetor Estratégico",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://vetorestrategico.com.br",
    title: "Vetor Estratégico | Criação de Sites de Alta Performance & IA para PMEs",
    description:
      "Seu site rápido. Seu atendimento imediato. Mais clientes fechando com a sua empresa. Engenharia web e automação prática.",
    siteName: "Vetor Estratégico",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Vetor Estratégico - Criação de Sites & IA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vetor Estratégico | Criação de Sites de Alta Performance & IA",
    description:
      "Desenvolvemos sites ultrarrápidos e automações de atendimento no WhatsApp para empresas em todo o Brasil.",
    images: ["/logo.png"],
  },
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png" },
      { url: "/logo.png" },
    ],
    shortcut: "/favicon.ico",
  },
  alternates: {
    canonical: "https://vetorestrategico.com.br",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = generateOrganizationSchema();
  const faqSchema = generateFaqSchema();
  const websiteSchema = generateWebSiteSchema();

  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Google Analytics (gtag.js) */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-L9RZP0K6RM"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-L9RZP0K6RM', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        {/* Structured Data (JSON-LD) for Google Rich Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-text-primary antialiased selection:bg-emerald-100 selection:text-emerald-800 font-sans">
        <AnnouncementBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        
        {/* Floating Utilities */}
        <WhatsAppFloatingButton />
        <CookieConsent />
        <ExitIntentModal />
      </body>
    </html>
  );
}
