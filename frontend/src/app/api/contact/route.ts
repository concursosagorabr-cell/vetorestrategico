import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { sendLeadNotificationEmail } from '@/lib/emailService';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message, source_url } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { detail: 'Nome, e-mail e mensagem são obrigatórios.' },
        { status: 400 }
      );
    }

    const ip = req.headers.get('x-forwarded-for') || null;
    const formattedMessage = `[Assunto: ${subject || 'Geral'}] ${message}`;

    const rows = await sql`
      INSERT INTO leads (
        name, email, phone, message, lead_type, status,
        source_url, ip_address, created_at, updated_at
      ) VALUES (
        ${name}, ${email}, ${phone || null}, ${formattedMessage}, 'CONTACT', 'NEW',
        ${source_url || null}, ${ip}, NOW(), NOW()
      )
      RETURNING id;
    `;

    const leadId = rows[0]?.id;

    sendLeadNotificationEmail(
      {
        name,
        email,
        phone,
        main_pain: formattedMessage,
      },
      'Mensagem de Contato'
    ).catch(console.error);

    return NextResponse.json(
      {
        success: true,
        message: 'Mensagem recebida com sucesso! Nossa equipe retornará em até 2 horas úteis.',
        lead_id: leadId,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Erro ao enviar contato:', error);
    return NextResponse.json(
      { detail: error.message || 'Erro ao enviar mensagem de contato.' },
      { status: 500 }
    );
  }
}
