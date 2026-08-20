import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        surface: {
          DEFAULT: "#FFFFFF",
          muted: "#F8FAFC",
          elevated: "#FFFFFF",
          border: "#E2E8F0",
        },
        brand: {
          navy: "#0F172A",
          dark: "#020617",
          blue: "#1E3A8A",
          slate: "#334155",
        },
        accent: {
          emerald: {
            DEFAULT: "#059669",
            light: "#10B981",
            dark: "#047857",
            soft: "#ECFDF5",
            glow: "rgba(5, 150, 105, 0.15)",
          },
          cyan: {
            DEFAULT: "#0284C7",
            light: "#0EA5E9",
            dark: "#0369A1",
            soft: "#F0F9FF",
            glow: "rgba(2, 132, 199, 0.15)",
          },
          gold: {
            DEFAULT: "#D97706",
            light: "#F59E0B",
            dark: "#B45309",
            soft: "#FFFBEB",
            glow: "rgba(217, 119, 6, 0.15)",
          }
        },
        text: {
          primary: "#0F172A",
          secondary: "#475569",
          muted: "#64748B",
          dark: "#020617",
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "tech-glow": "radial-gradient(circle at 50% -20%, rgba(5, 150, 105, 0.08), transparent 70%), radial-gradient(circle at 80% 60%, rgba(2, 132, 199, 0.08), transparent 60%)",
        "gold-glow": "radial-gradient(circle at 50% 50%, rgba(217, 119, 6, 0.08), transparent 70%)",
      },
      boxShadow: {
        "emerald-glow": "0 4px 20px -2px rgba(5, 150, 105, 0.25)",
        "cyan-glow": "0 4px 20px -2px rgba(2, 132, 199, 0.25)",
        "gold-glow": "0 4px 20px -2px rgba(217, 119, 6, 0.25)",
        "card-subtle": "0 4px 20px -4px rgba(15, 23, 42, 0.08)",
        "card-elevated": "0 10px 30px -10px rgba(15, 23, 42, 0.12)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        }
      }
    },
  },
  plugins: [],
};
export default config;
