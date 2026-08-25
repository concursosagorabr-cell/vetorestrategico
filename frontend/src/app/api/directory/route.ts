import { NextRequest, NextResponse } from "next/server";
import { DIRECTORY_TOOLS, DIRECTORY_NICHES, DIRECTORY_CATEGORIES } from "@/lib/directoryData";
import { ToolCategory, ToolNiche, ToolPricingType } from "@/types";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").toLowerCase().trim();
  const niche = searchParams.get("nicho") as ToolNiche | null;
  const category = searchParams.get("categoria") as ToolCategory | null;
  const pricing = searchParams.get("preco") as ToolPricingType | null;

  let tools = [...DIRECTORY_TOOLS];

  if (q) {
    tools = tools.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.shortDesc.toLowerCase().includes(q) ||
        t.tagline.toLowerCase().includes(q) ||
        t.nicheLabels.some((n) => n.toLowerCase().includes(q)) ||
        t.integrations.some((i) => i.name.toLowerCase().includes(q))
    );
  }

  if (niche && niche !== "geral") {
    tools = tools.filter((t) => t.niches.includes(niche) || t.niches.includes("geral"));
  }

  if (category) {
    tools = tools.filter((t) => t.category === category);
  }

  if (pricing) {
    tools = tools.filter((t) => t.pricingType === pricing);
  }

  return NextResponse.json({
    total: tools.length,
    tools,
    niches: DIRECTORY_NICHES,
    categories: DIRECTORY_CATEGORIES,
  });
}
