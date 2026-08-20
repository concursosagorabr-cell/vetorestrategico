import React from "react";
import Link from "next/link";
import { Database, GraduationCap, Share2, Wrench, Shield, ArrowRight } from "lucide-react";

export const ComplementaryServicesSection: React.FC = () => {
  const complementary = [
    {
      title: "Consultoria & Higienização de Dados",
      desc: "Limpeza e estruturação de bases de clientes e produtos para garantir acurácia máxima da IA.",
      icon: Database,
    },
    {
      title: "Treinamentos In-Company",
      desc: "Capacitação prática da sua equipe em engenharia de prompt e uso de copilotos de produtividade.",
      icon: GraduationCap,
    },
    {
      title: "Automação de Marketing & Nutrição",
      desc: "Esteiras inteligentes de e-mail e WhatsApp para reativar clientes inativos e nutrir novos contatos.",
      icon: Share2,
    },
    {
      title: "Integrações Personalizadas",
      desc: "Conexão de APIs sob medida para sistemas legados, ERPs locais e bancos de dados específicos.",
      icon: Wrench,
    },
    {
      title: "Monitoramento & Suporte Contínuo",
      desc: "Acompanhamento proativo de acurácia, refinamento de respostas e suporte técnico prioritário.",
      icon: Shield,
    },
  ];

  return (
    <section className="py-16 bg-slate-50/50 relative border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
            Serviços Complementares
          </span>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">
            Suporte de ponta a ponta para a maturidade digital da sua empresa
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {complementary.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between hover:border-sky-300 shadow-xs hover:shadow-md transition-all group"
              >
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-sky-50 group-hover:text-sky-600 transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
