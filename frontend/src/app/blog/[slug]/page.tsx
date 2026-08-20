import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BLOG_POSTS, COMPANY_INFO } from "@/lib/constants";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { Clock, ArrowLeft, ArrowRight, Share2, Sparkles, MessageCircle, Calendar } from "lucide-react";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) return { title: "Artigo Não Encontrado" };

  return {
    title: `${post.title} | Blog Vetor Estratégico`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishDate,
      authors: [post.author.name],
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishDate,
    author: {
      "@type": "Person",
      name: post.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: COMPANY_INFO.name,
      logo: {
        "@type": "ImageObject",
        url: "https://vetorestrategico.com.br/logo.png",
      },
    },
  };

  return (
    <article className="py-12 sm:py-20 bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Back Link */}
        <div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-500 hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para todos os artigos
          </Link>
        </div>

        {/* Article Header */}
        <header className="space-y-4 pb-8 border-b border-slate-200">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="emerald" size="md">
              {post.category}
            </Badge>
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {post.publishDate}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Author info */}
          <div className="flex items-center gap-3 pt-4">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center font-bold text-sm">
              VE
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 block">
                {post.author.name}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {post.author.role}
              </span>
            </div>
          </div>
        </header>

        {/* Article Body Content */}
        <div className="prose prose-slate max-w-none space-y-6 text-slate-600 leading-relaxed text-sm sm:text-base">
          <div
            dangerouslySetInnerHTML={{
              __html: post.content
                .replace(/\n\n/g, "<br/><br/>")
                .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-slate-900 mt-8 mb-4">$1</h1>')
                .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">$1</h2>')
                .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-slate-900 mt-6 mb-3">$1</h3>')
                .replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900 font-bold">$1</strong>'),
            }}
          />
        </div>

        {/* Article Footer & Tags */}
        <footer className="pt-8 border-t border-slate-200 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Inline Diagnostic Lead Magnet Box */}
          <div className="rounded-2xl bg-slate-50 border border-emerald-200 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Diagnóstico Rápido de IA
              </span>
              <h3 className="text-lg font-bold text-slate-900">
                Quer aplicar essas melhorias na sua empresa?
              </h3>
              <p className="text-xs text-slate-600">
                Calcule a estimativa de horas salvas e receba uma recomendação sob medida.
              </p>
            </div>
            <Button href="/diagnostico" variant="gold" size="md" className="shrink-0">
              Fazer Teste Grátis
            </Button>
          </div>

          {/* Newsletter Box */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-sm">
            <h3 className="text-base font-bold text-slate-900">
              Gostou desse conteúdo? Receba os próximos no seu e-mail
            </h3>
            <NewsletterForm source={`article_${post.slug}`} />
          </div>
        </footer>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="pt-12 border-t border-slate-200 space-y-6">
            <h3 className="text-xl font-bold text-slate-900">
              Outros Artigos Recomendados
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/blog/${rel.slug}`}
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-300 shadow-sm hover:shadow-md transition-all block space-y-2 group"
                >
                  <span className="text-xs text-emerald-700 font-bold">
                    {rel.category}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
                    {rel.title}
                  </h4>
                  <span className="text-xs text-slate-400 font-medium inline-flex items-center gap-1 pt-2">
                    Ler artigo <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </article>
  );
}
