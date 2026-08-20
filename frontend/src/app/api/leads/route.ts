import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { sendLeadNotificationEmail } from '@/lib/emailService';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      company_name,
      company_size,
      segment,
      main_pain,
      estimated_budget,
      message,
      source_url,
    } = body;

    if (!name || !email) {
      return NextResponse.json(
        { detail: 'Nome e e-mail são obrigatórios.' },
        { status: 400 }
      );
    }

    const ip = req.headers.get('x-forwarded-for') || null;

    const rows = await sql`
      INSERT INTO leads (
        name, email, phone, company_name, company_size, segment,
        main_pain, estimated_budget, message, lead_type, status,
        source_url, ip_address, created_at, updated_at
      ) VALUES (
        ${name}, ${email}, ${phone || null}, ${company_name || null}, ${company_size || null}, ${segment || null},
        ${main_pain || null}, ${estimated_budget || null}, ${message || null}, 'QUALIFIED', 'NEW',
        ${source_url || null}, ${ip}, NOW(), NOW()
      )
      RETURNING id, name, email, phone, company_name, segment, lead_type, status, created_at;
    `;

    const newLead = rows[0];

    sendLeadNotificationEmail(
      {
        name,
        email,
        phone,
        company_name,
        company_size,
        segment,
        main_pain,
        estimated_budget,
        message,
      },
      'Lead Qualificado Comercial'
    ).catch(console.error);

    return NextResponse.json(newLead, { status: 201 });
  } catch (error: any) {
    console.error('Erro ao registrar lead:', error);
    return NextResponse.json(
      { detail: error.message || 'Erro ao processar lead.' },
      { status: 500 }
    );
  }
}
