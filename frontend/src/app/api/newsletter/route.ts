import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getClientIp, rateLimit } from '@/lib/rateLimit';

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const limiter = rateLimit(`newsletter:${ip}`, 5, 60000);

  if (!limiter.success) {
    return NextResponse.json(
      { detail: 'Muitas tentativas. Por favor, aguarde um minuto.' },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const { email, source } = body;

    const cleanEmail = String(email || '').trim().toLowerCase();

    if (!cleanEmail || !cleanEmail.includes('@') || cleanEmail.length < 5) {
      return NextResponse.json(
        { detail: 'Por favor, informe um endereço de e-mail válido.' },
        { status: 400 }
      );
    }

    const existing = await sql`
      SELECT id, email, is_active FROM newsletter_subscribers WHERE email = ${cleanEmail} LIMIT 1;
    `;

    if (existing.length > 0) {
      if (!existing[0].is_active) {
        await sql`UPDATE newsletter_subscribers SET is_active = TRUE WHERE id = ${existing[0].id};`;
      }
      return NextResponse.json({
        success: true,
        message: 'E-mail já cadastrado! Você continuará recebendo nossos insights de IA.',
        email: cleanEmail,
      });
    }

    await sql`
      INSERT INTO newsletter_subscribers (email, source, is_active, created_at)
      VALUES (${cleanEmail}, ${source ? String(source).trim() : 'blog_footer'}, TRUE, NOW());
    `;

    return NextResponse.json(
      {
        success: true,
        message: 'Inscrição confirmada com sucesso! Bem-vindo(a) aos insights de IA da Vetor Estratégico.',
        email: cleanEmail,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Erro interno ao cadastrar newsletter:', error);
    return NextResponse.json(
      { detail: 'Erro ao processar inscrição na newsletter. Tente novamente mais tarde.' },
      { status: 500 }
    );
  }
}
