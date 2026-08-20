import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Vetor Estratégico | Criação de Sites & IA para Empresas",
    short_name: "Vetor Estratégico",
    description:
      "Desenvolvimento de sites profissionais de alta performance e automações com IA para captação de clientes.",
    start_url: "/",
    display: "standalone",
    background_color: "#020617",
    theme_color: "#059669",
    icons: [
      {
        src: "/logo.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
