import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { BLOG_POSTS } from "@/lib/constants";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { Clock, ArrowRight, BookOpen, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog & Insights de Inteligência Artificial para PMEs",
  description:
    "Artigos práticos, guias e cases de Inteligência Artificial, automação de WhatsApp, redução de custos e aceleração de vendas para pequenas e médias empresas.",
};

export default function BlogPage() {
  return (
    <div className="py-12 sm:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="emerald" size="md">
            Blog & Insights
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-text-primary tracking-tight">
            Inteligência Artificial aplicada a <span className="gradient-text-emerald">Negócios Reais</span>
          </h1>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
            Conteúdos práticos, guias e tendências para empresários e gestores que querem aumentar a produtividade e faturar mais com IA.
          </p>
        </div>

        {/* Newsletter Box at the Top */}
        <div className="rounded-3xl bg-white border border-emerald-200 p-6 sm:p-8 max-w-4xl mx-auto shadow-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Vetor IA Insights
              </span>
              <h3 className="text-xl font-bold text-slate-900">
                Receba nossa curadoria quinzenal de IA para PMEs
              </h3>
              <p className="text-xs text-slate-600">
                Dicas práticas, novidades e estratégias que você pode aplicar no mesmo dia na sua empresa.
              </p>
            </div>
            <div className="md:w-96">
              <NewsletterForm source="blog_header" />
            </div>
          </div>
        </div>

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-7 flex flex-col justify-between hover:border-emerald-300 shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="emerald" size="sm">
                    {post.category}
                  </Badge>
                  <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>

                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                </Link>

                <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {post.tags.slice(0, 3).map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Author & Read More */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center text-xs font-bold">
                    VE
                  </div>
                  <span className="text-xs text-slate-400 font-medium">
                    {post.publishDate}
                  </span>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="text-xs font-semibold text-emerald-700 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                >
                  Ler Artigo <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
}
