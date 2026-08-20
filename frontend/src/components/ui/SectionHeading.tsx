import React from "react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  eyebrowVariant?: "emerald" | "cyan" | "gold";
  title: string;
  highlightText?: string;
  highlightVariant?: "emerald" | "cyan" | "gold";
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  eyebrowVariant = "emerald",
  title,
  highlightText,
  highlightVariant = "emerald",
  description,
  align = "center",
  className,
}) => {
  const alignStyles = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  const highlightStyles = {
    emerald: "gradient-text-emerald",
    cyan: "gradient-text-cyan",
    gold: "gradient-text-gold",
  };

  return (
    <div className={cn("flex flex-col max-w-4xl mb-12 sm:mb-16", alignStyles[align], className)}>
      {eyebrow && (
        <Badge variant={eyebrowVariant} size="md" className="mb-4 text-xs sm:text-sm font-extrabold uppercase tracking-widest">
          {eyebrow}
        </Badge>
      )}

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-900 leading-[1.08]">
        {title}{" "}
        {highlightText && (
          <span className={highlightStyles[highlightVariant]}>{highlightText}</span>
        )}
      </h2>

      {description && (
        <p className="mt-4 text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-3xl font-normal">
          {description}
        </p>
      )}
    </div>
  );
};
