import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { BLOG_POSTS, COMPANY_INFO } from "@/lib/constants";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import {
  Clock,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  MessageCircle,
  Calendar,
  Share2,
  Bookmark,
  CheckCircle2,
} from "lucide-react";

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
      images: [
        {
          url: post.coverImage || "/logo.png",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage || "/logo.png"],
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
    image: post.coverImage ? `https://vetorestrategico.com.br${post.coverImage}` : "https://vetorestrategico.com.br/logo.png",
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

  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `Confira este artigo: ${post.title} - https://vetorestrategico.com.br/blog/${post.slug}`
  )}`;

  return (
    <article className="py-12 sm:py-20 bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-500 hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para todos os artigos
          </Link>

          <span className="text-xs text-slate-400 font-medium">
            Blog &bull; {post.category}
          </span>
        </div>

        {/* Article Header */}
        <header className="space-y-6 pb-6 border-b border-slate-200">
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

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            {post.excerpt}
          </p>

          {/* Author & Share Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center font-bold text-sm">
                VE
              </div>
              <div>
                <span className="text-sm font-bold text-slate-900 block">
                  {post.author.name}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {post.author.role}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={whatsappShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-xs font-bold transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                Compartilhar
              </a>
            </div>
          </div>
        </header>

        {/* Hero Cover Image */}
        {post.coverImage && (
          <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-950">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        )}

        {/* Article Body Content */}
        <div className="prose prose-slate max-w-none space-y-6 text-slate-700 leading-relaxed text-base sm:text-lg">
          <div
            dangerouslySetInnerHTML={{
              __html: post.content
                .replace(/\n\n/g, "<br/><br/>")
                .replace(/^# (.*$)/gim, '<h2 class="text-2xl sm:text-3xl font-black text-slate-900 mt-10 mb-4 tracking-tight">$1</h2>')
                .replace(/^## (.*$)/gim, '<h3 class="text-xl sm:text-2xl font-bold text-slate-900 mt-8 mb-3 text-emerald-950">$1</h3>')
                .replace(/^### (.*$)/gim, '<h4 class="text-lg sm:text-xl font-bold text-slate-900 mt-6 mb-2">$1</h4>')
                .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-emerald-500 pl-4 py-2 my-4 bg-emerald-50/50 rounded-r-xl text-slate-800 italic text-base">$1</blockquote>')
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

          {/* Diagnostic Lead Magnet CTA */}
          <div className="rounded-3xl bg-slate-950 border border-emerald-800/40 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-3xl pointer-events-none" />
            <div className="space-y-1 relative z-10">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Diagnóstico Rápido de IA
              </span>
              <h3 className="text-lg sm:text-xl font-black text-white">
                Quer aplicar essas melhorias na sua empresa?
              </h3>
              <p className="text-xs text-slate-400">
                Calcule a estimativa de horas salvas e receba uma recomendação técnica sob medida.
              </p>
            </div>
            <Button href="/diagnostico" variant="primary" size="md" className="shrink-0 relative z-10 font-bold">
              Fazer Teste Grátis
            </Button>
          </div>

          {/* Newsletter Box */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-sm">
            <h3 className="text-base font-bold text-slate-900">
              Gostou desse conteúdo? Receba os próximos artigos no seu e-mail
            </h3>
            <NewsletterForm source={`article_${post.slug}`} />
          </div>
        </footer>

        {/* Related Posts Grid */}
        {relatedPosts.length > 0 && (
          <div className="pt-12 border-t border-slate-200 space-y-6">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              Outros Artigos Recomendados
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/blog/${rel.slug}`}
                  className="rounded-3xl bg-white border border-slate-200 overflow-hidden hover:border-emerald-300 shadow-sm hover:shadow-lg transition-all block group"
                >
                  {rel.coverImage && (
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
                      <Image
                        src={rel.coverImage}
                        alt={rel.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-5 space-y-2">
                    <span className="text-xs text-emerald-700 font-bold">
                      {rel.category}
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
                      {rel.title}
                    </h4>
                    <span className="text-xs text-slate-400 font-medium inline-flex items-center gap-1 pt-2">
                      Ler artigo <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </article>
  );
}

