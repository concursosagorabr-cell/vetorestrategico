import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { sendLeadNotificationEmail } from '@/lib/emailService';
import { getClientIp, rateLimit } from '@/lib/rateLimit';

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const limiter = rateLimit(`contact:${ip}`, 10, 60000);

  if (!limiter.success) {
    return NextResponse.json(
      { detail: 'Muitas mensagens enviadas em curto intervalo. Por favor, aguarde um minuto.' },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const { name, email, phone, subject, message, source_url } = body;

    const cleanName = String(name || '').trim();
    const cleanEmail = String(email || '').trim().toLowerCase();
    const cleanMessage = String(message || '').trim();

    if (!cleanName || !cleanEmail || !cleanMessage) {
      return NextResponse.json(
        { detail: 'Nome, e-mail e mensagem são obrigatórios.' },
        { status: 400 }
      );
    }

    const formattedMessage = `[Assunto: ${String(subject || 'Geral').trim()}] ${cleanMessage}`;

    const rows = await sql`
      INSERT INTO leads (
        name, email, phone, message, lead_type, status,
        source_url, ip_address, created_at, updated_at
      ) VALUES (
        ${cleanName},
        ${cleanEmail},
        ${phone ? String(phone).trim() : null},
        ${formattedMessage},
        'CONTACT',
        'NEW',
        ${source_url ? String(source_url).trim() : '/contato'},
        ${ip},
        NOW(),
        NOW()
      )
      RETURNING id;
    `;

    const leadId = rows[0]?.id;

    sendLeadNotificationEmail(
      {
        name: cleanName,
        email: cleanEmail,
        phone,
        main_pain: formattedMessage,
      },
      'Mensagem de Contato'
    ).catch((err) => console.error('Erro ao enviar e-mail de contato:', err));

    return NextResponse.json(
      {
        success: true,
        message: 'Mensagem recebida com sucesso! Nossa equipe retornará em até 2 horas úteis.',
        lead_id: leadId,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Erro interno ao processar formulário de contato:', error);
    return NextResponse.json(
      { detail: 'Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente ou fale pelo WhatsApp (11) 91907-2390.' },
      { status: 500 }
    );
  }
}
