import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  ParallaxVectorGrid,
  ParallaxWatermark,
  StrategicVectorMesh,
} from "@/components/ui/Parallax";
import { BLOG_POSTS } from "@/lib/constants";
import { Clock, ArrowRight, BookOpen } from "lucide-react";

export const BlogHighlightsSection: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50/70 border-t border-slate-200/60 relative overflow-hidden">
      {/* Background Vector Grid & Monumental Watermark */}
      <ParallaxVectorGrid theme="light" speed={0.06} />
      <ParallaxWatermark text="CONTEÚDO &bull; INSIGHTS &bull; ARTIGOS" speed={0.16} direction="left" variant="light" />
      <StrategicVectorMesh theme="light" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <SectionHeading
            eyebrow="Conteúdo & Insights"
            eyebrowVariant="emerald"
            title="Artigos práticos para aplicar IA e"
            highlightText="escalar seu negócio"
            highlightVariant="emerald"
            description="Sem jargões acadêmicos. Apenas estratégias, análises e tendências que impactam a receita de PMEs."
            align="left"
            className="mb-0 max-w-2xl"
          />

          <div className="mt-6 md:mt-0">
            <Button href="/blog" variant="outline" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Acessar Todo o Blog
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.slice(0, 3).map((post) => (
            <article
              key={post.id}
              className="rounded-3xl bg-white border border-slate-200 overflow-hidden flex flex-col justify-between hover:border-emerald-300 shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <div>
                {post.coverImage && (
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                <div className="p-6 space-y-3.5">
                  <div className="flex items-center justify-between">
                    <Badge variant="emerald" size="sm">
                      {post.category}
                    </Badge>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 mt-2 flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="text-[11px] text-slate-400 font-medium">
                  {post.publishDate}
                </span>

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
    </section>
  );
};
