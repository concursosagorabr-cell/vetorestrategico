import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "emerald" | "cyan" | "gold" | "neutral";
  size?: "sm" | "md";
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "emerald",
  size = "md",
  children,
  ...props
}) => {
  const variantStyles = {
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
    cyan: "bg-sky-50 text-sky-700 border-sky-200",
    gold: "bg-amber-50 text-amber-800 border-amber-200",
    neutral: "bg-slate-100 text-slate-700 border-slate-200",
  };

  const sizeStyles = {
    sm: "text-xs px-2.5 py-0.5 rounded-full",
    md: "text-xs font-medium px-3 py-1 rounded-full",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border backdrop-blur-sm uppercase tracking-wider font-semibold",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
