import { NextRequest, NextResponse } from "next/server";
import { getClientIp, rateLimit } from "@/lib/rateLimit";
import { sendLeadNotificationEmail } from "@/lib/emailService";
import { sql } from "@/lib/db";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const limiter = rateLimit(`directory_submit:${ip}`, 5, 60000); // 5 submits por min

  if (!limiter.success) {
    return NextResponse.json(
      { detail: "Muitas solicitações em sequência. Por favor, aguarde um minuto antes de enviar novamente." },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const {
      toolName,
      websiteUrl,
      contactName,
      contactEmail,
      contactWhatsapp,
      category,
      niches,
      pricingType,
      shortDescription,
      fullDescription,
      planRequested,
      hasAffiliateProgram,
      affiliateCommissionDetails,
      discountCouponForVetorUsers,
      notes,
    } = body;

    const finalToolName = String(toolName || "").trim();
    const finalWebsiteUrl = String(websiteUrl || "").trim();
    const finalContactName = String(contactName || "").trim();
    const finalContactEmail = String(contactEmail || "").trim().toLowerCase();
    const finalContactPhone = String(contactWhatsapp || "").trim();

    if (!finalToolName || !finalWebsiteUrl || !finalContactEmail || !finalContactName) {
      return NextResponse.json(
        { detail: "Nome da ferramenta, site oficial, seu nome e e-mail são obrigatórios." },
        { status: 400 }
      );
    }

    // Persist as Partner Lead if database is active
    try {
      if (process.env.DATABASE_URL) {
        await sql`
          INSERT INTO leads (
            name, email, phone, company_name, segment,
            main_pain, lead_type, status, source_url, ip_address,
            message, created_at, updated_at
          ) VALUES (
            ${finalContactName},
            ${finalContactEmail},
            ${finalContactPhone || null},
            ${finalToolName},
            ${category || "Diretório de IA"},
            ${`Cadastro no Diretório: Plano ${planRequested || 'free'} | Site: ${finalWebsiteUrl}`},
            'PARTNER',
            'NEW',
            '/diretorio/cadastrar',
            ${ip},
            ${`Plano: ${planRequested}. Nichos: ${JSON.stringify(niches || [])}. Pitch: ${shortDescription}. Cupom: ${discountCouponForVetorUsers || 'N/A'}. Afiliado: ${affiliateCommissionDetails || 'N/A'}. Obs: ${notes || ''}`},
            NOW(),
            NOW()
          );
        `;
      }
    } catch (dbErr) {
      console.warn("Aviso ao persistir parceiro no banco de dados:", dbErr);
    }

    // Send async email notification to commercial team
    sendLeadNotificationEmail(
      {
        name: finalContactName,
        email: finalContactEmail,
        phone: finalContactPhone,
        company_name: `${finalToolName} (${finalWebsiteUrl})`,
        company_size: "Parceiro SaaS / Criador de Software",
        segment: `Diretório IA - ${category || 'Geral'}`,
        main_pain: `Solicitação de Cadastro no Diretório: Plano ${planRequested}. Pitch: ${shortDescription}`,
        estimated_budget: `Plano Solicitado: ${planRequested}`,
        message: `Dados da submissão:
- Ferramenta: ${finalToolName} (${finalWebsiteUrl})
- Contato: ${finalContactName} (${finalContactEmail} / ${finalContactPhone})
- Categoria: ${category}
- Nichos: ${Array.isArray(niches) ? niches.join(', ') : niches}
- Preço: ${pricingType}
- Plano de Listagem: ${planRequested}
- Cupom Usuários Vetor: ${discountCouponForVetorUsers || 'N/A'}
- Afiliados/Comissão: ${affiliateCommissionDetails || 'N/A'}
- Descrição Completa: ${fullDescription || 'N/A'}
- Notas: ${notes || 'N/A'}`,
      },
      "Nova Submissão de Ferramenta no Diretório"
    ).catch((err) => console.error("Erro ao enviar e-mail de notificação de ferramenta:", err));

    return NextResponse.json(
      {
        success: true,
        message: "Proposta de cadastro recebida com sucesso! Entraremos em contato em até 24h.",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Erro interno ao processar cadastro de ferramenta:", error);
    return NextResponse.json(
      { detail: "Ocorreu um erro ao processar sua proposta. Por favor, tente novamente ou entre em contato pelo WhatsApp (11) 95309-9049." },
      { status: 500 }
    );
  }
}
