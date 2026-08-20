import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  glow?: "emerald" | "cyan" | "gold" | "none";
}

export const Card: React.FC<CardProps> = ({
  className,
  hoverEffect = true,
  glow = "none",
  children,
  ...props
}) => {
  const glowStyles = {
    emerald: "hover:border-emerald-400 hover:shadow-emerald-glow",
    cyan: "hover:border-sky-400 hover:shadow-cyan-glow",
    gold: "hover:border-amber-400 hover:shadow-gold-glow",
    none: "",
  };

  return (
    <div
      className={cn(
        "rounded-2xl bg-white border border-slate-200 p-6 shadow-sm transition-all duration-300",
        hoverEffect && "hover:-translate-y-1 hover:border-slate-300 hover:shadow-md",
        glowStyles[glow],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
