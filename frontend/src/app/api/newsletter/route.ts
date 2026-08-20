import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, source } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { detail: 'E-mail válido é obrigatório.' },
        { status: 400 }
      );
    }

    const existing = await sql`
      SELECT id, email, is_active FROM newsletter_subscribers WHERE email = ${email} LIMIT 1;
    `;

    if (existing.length > 0) {
      if (!existing[0].is_active) {
        await sql`UPDATE newsletter_subscribers SET is_active = TRUE WHERE id = ${existing[0].id};`;
      }
      return NextResponse.json({
        success: true,
        message: 'E-mail já cadastrado! Você continuará recebendo nossos insights de IA.',
        email,
      });
    }

    await sql`
      INSERT INTO newsletter_subscribers (email, source, is_active, created_at)
      VALUES (${email}, ${source || 'blog_footer'}, TRUE, NOW());
    `;

    return NextResponse.json(
      {
        success: true,
        message: 'Inscrição confirmada com sucesso! Bem-vindo(a) aos insights de IA da Vetor Estratégico.',
        email,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Erro ao assinar newsletter:', error);
    return NextResponse.json(
      { detail: error.message || 'Erro ao assinar newsletter.' },
      { status: 500 }
    );
  }
}
