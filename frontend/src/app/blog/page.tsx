"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { BLOG_POSTS } from "@/lib/constants";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import {
  Clock,
  ArrowRight,
  Sparkles,
  Search,
  BookOpen,
  Filter,
  Calendar,
  Layers,
  Flame,
} from "lucide-react";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    "Todos",
    "Presença Digital & Vendas",
    "Tráfego Orgânico & SEO",
    "Engenharia Web",
    "Inteligência Artificial",
    "Atendimento Comercial",
    "Negócios & Investimento",
    "Soluções por Nicho",
    "Performance Web",
    "Integração & CRM",
  ];

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory =
        selectedCategory === "Todos" || post.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredPost = filteredPosts[0];
  const gridPosts = filteredPosts.slice(1);

  return (
    <div className="py-12 sm:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="emerald" size="md">
            Blog &bull; Engenharia Web &bull; IA para PMEs
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight uppercase">
            CONTEÚDO PRÁTICO PARA <span className="gradient-text-emerald">ESCALAR SUA EMPRESA</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Guias técnicos, análises de mercado, estratégias de SEO para o Google e automações no WhatsApp para quem busca resultados comerciais concretos.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="space-y-6 max-w-5xl mx-auto">
          {/* Search Input */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquise por temas (ex: SEO, WhatsApp, Custo de Site, Next.js, Conversão)..."
              className="w-full bg-white border border-slate-200 focus:border-emerald-500 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-700 bg-slate-100 px-2 py-1 rounded-md"
              >
                Limpar
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/25 scale-105"
                      : "bg-white border border-slate-200 text-slate-600 hover:border-emerald-300 hover:text-emerald-700 shadow-sm"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* No Posts Found State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16 px-4 bg-white rounded-3xl border border-slate-200 max-w-2xl mx-auto space-y-4">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-xl font-bold text-slate-900">
              Nenhum artigo encontrado
            </h3>
            <p className="text-sm text-slate-500">
              Não encontramos resultados para &quot;{searchQuery}&quot; na categoria selecionada.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("Todos");
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition-colors"
            >
              Ver todos os artigos
            </button>
          </div>
        )}

        {/* Hero Featured Article (Large Banner Card) */}
        {featuredPost && (
          <div className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-lg hover:border-emerald-300 transition-all duration-300 group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              
              {/* Cover Image Col */}
              <div className="lg:col-span-7 relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
                {featuredPost.coverImage && (
                  <Image
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    fill
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                )}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase bg-emerald-600 text-white shadow-lg">
                    <Flame className="w-3.5 h-3.5" /> Destaque
                  </span>
                </div>
              </div>

              {/* Text Info Col */}
              <div className="lg:col-span-5 p-6 sm:p-8 lg:pl-0 space-y-4">
                <div className="flex items-center gap-3">
                  <Badge variant="emerald" size="sm">
                    {featuredPost.category}
                  </Badge>
                  <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {featuredPost.readTime}
                  </span>
                </div>

                <Link href={`/blog/${featuredPost.slug}`}>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 group-hover:text-emerald-700 transition-colors leading-tight">
                    {featuredPost.title}
                  </h2>
                </Link>

                <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 font-normal">
                  {featuredPost.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {featuredPost.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center justify-center text-xs font-bold">
                      VE
                    </div>
                    <span className="text-xs text-slate-500 font-medium">
                      {featuredPost.publishDate}
                    </span>
                  </div>

                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 font-bold text-xs shadow-md shadow-emerald-600/20 transition-all group-hover:translate-x-1"
                  >
                    Ler Artigo Completo <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Remaining Articles Grid */}
        {gridPosts.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-lg font-black uppercase text-slate-900 tracking-tight flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-600" />
                Mais Artigos &amp; Insights ({gridPosts.length})
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {gridPosts.map((post) => (
                <article
                  key={post.id}
                  className="rounded-3xl bg-white border border-slate-200 overflow-hidden flex flex-col justify-between hover:border-emerald-300 shadow-sm hover:shadow-xl transition-all duration-300 group"
                >
                  <div>
                    {/* Cover Thumbnail */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
                      {post.coverImage && (
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-900/90 text-emerald-300 border border-slate-800 backdrop-blur-sm shadow-md">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 space-y-3.5">
                      <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {post.publishDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {post.readTime}
                        </span>
                      </div>

                      <Link href={`/blog/${post.slug}`}>
                        <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
                          {post.title}
                        </h4>
                      </Link>

                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed font-normal">
                        {post.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 pt-1">
                        {post.tags.slice(0, 3).map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="p-6 pt-0 mt-2 flex items-center justify-between border-t border-slate-100 pt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center text-[10px] font-bold">
                        VE
                      </div>
                      <span className="text-[11px] text-slate-500 font-medium">
                        Vetor Estratégico
                      </span>
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-xs font-bold text-emerald-700 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                    >
                      Ler Mais <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Newsletter Box at the Bottom */}
        <div className="rounded-3xl bg-slate-950 border border-emerald-800/40 p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-3xl pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
            <div className="space-y-3 max-w-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Vetor IA Insights &bull; Curadoria Quinzenal
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Receba novidades e estratégias práticas no seu e-mail
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                Junte-se a empresários e gestores que acompanham nossas análises sobre velocidade de sites, SEO técnico e automação no WhatsApp.
              </p>
            </div>

            <div className="w-full lg:w-96 shrink-0">
              <NewsletterForm source="blog_footer" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

