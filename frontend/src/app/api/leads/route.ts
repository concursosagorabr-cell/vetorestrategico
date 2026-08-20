import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { sendLeadNotificationEmail } from '@/lib/emailService';
import { getClientIp, rateLimit } from '@/lib/rateLimit';

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const limiter = rateLimit(`leads:${ip}`, 10, 60000);

  if (!limiter.success) {
    return NextResponse.json(
      { detail: 'Muitas solicitações em sequência. Por favor, aguarde um minuto antes de enviar novamente.' },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      whatsapp,
      company_name,
      company,
      company_size,
      segment,
      main_pain,
      service_interest,
      estimated_budget,
      message,
      source_url,
      page_source,
    } = body;

    const contactName = String(name || '').trim();
    const contactEmail = String(email || '').trim().toLowerCase();
    const contactPhone = String(phone || whatsapp || '').trim();
    const finalCompanyName = String(company_name || company || '').trim();
    const finalMainPain = String(main_pain || service_interest || message || '').trim();
    const finalSourceUrl = String(source_url || page_source || '/contato').trim();

    if (!contactName || (!contactEmail && !contactPhone)) {
      return NextResponse.json(
        { detail: 'Nome e pelo menos um canal de contato (e-mail ou WhatsApp) são obrigatórios.' },
        { status: 400 }
      );
    }

    const rows = await sql`
      INSERT INTO leads (
        name, email, phone, company_name, company_size, segment,
        main_pain, estimated_budget, message, lead_type, status,
        source_url, ip_address, created_at, updated_at
      ) VALUES (
        ${contactName},
        ${contactEmail || null},
        ${contactPhone || null},
        ${finalCompanyName || null},
        ${company_size || null},
        ${segment || null},
        ${finalMainPain || null},
        ${estimated_budget || null},
        ${message || null},
        'QUALIFIED',
        'NEW',
        ${finalSourceUrl},
        ${ip},
        NOW(),
        NOW()
      )
      RETURNING id, name, email, phone, company_name, segment, lead_type, status, created_at;
    `;

    const newLead = rows[0];

    // Disparo assíncrono de notificação por e-mail (não bloqueia resposta HTTP)
    sendLeadNotificationEmail(
      {
        name: contactName,
        email: contactEmail,
        phone: contactPhone,
        company_name: finalCompanyName,
        company_size,
        segment,
        main_pain: finalMainPain,
        estimated_budget,
        message,
      },
      'Lead Qualificado Comercial'
    ).catch((err) => console.error('Erro ao enviar e-mail de notificação de lead:', err));

    return NextResponse.json(newLead, { status: 201 });
  } catch (error: any) {
    console.error('Erro interno ao registrar lead:', error);
    return NextResponse.json(
      { detail: 'Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente ou entre em contato pelo WhatsApp (11) 91907-2390.' },
      { status: 500 }
    );
  }
}
