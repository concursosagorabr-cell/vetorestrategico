import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { calculateQuizResult } from '@/lib/quizEngine';
import { sendLeadNotificationEmail } from '@/lib/emailService';
import { getClientIp, rateLimit } from '@/lib/rateLimit';

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const limiter = rateLimit(`quiz:${ip}`, 10, 60000);

  if (!limiter.success) {
    return NextResponse.json(
      { detail: 'Muitas tentativas em curto intervalo. Por favor, aguarde um minuto.' },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const {
      segment,
      company_size,
      main_bottleneck,
      digital_maturity,
      name,
      email,
      phone,
      company_name,
      accepts_lgpd,
    } = body;

    const cleanName = String(name || '').trim();
    const cleanEmail = String(email || '').trim().toLowerCase();
    const cleanPhone = String(phone || '').trim();
    const cleanCompanyName = String(company_name || '').trim();

    if (!segment || !company_size || !main_bottleneck || !digital_maturity || !cleanName || !cleanEmail || !cleanPhone || !cleanCompanyName) {
      return NextResponse.json(
        { detail: 'Todos os campos obrigatórios do diagnóstico devem ser preenchidos.' },
        { status: 422 }
      );
    }

    const result = calculateQuizResult(body);

    const answersPayload = JSON.stringify({
      segment,
      company_size,
      main_bottleneck,
      digital_maturity,
      accepts_lgpd: accepts_lgpd !== false,
    });

    const mainPain = `Gargalo: ${main_bottleneck} | Maturidade: ${digital_maturity}`;
    const recommendation = `${result.recommendation_title} - ${result.priority_action}`;

    const rows = await sql`
      INSERT INTO leads (
        name, email, phone, company_name, company_size, segment,
        main_pain, lead_type, status, quiz_answers, quiz_score,
        quiz_maturity_level, quiz_recommendation, source_url, ip_address,
        created_at, updated_at
      ) VALUES (
        ${cleanName},
        ${cleanEmail},
        ${cleanPhone},
        ${cleanCompanyName},
        ${company_size},
        ${segment},
        ${mainPain},
        'QUIZ',
        'NEW',
        ${answersPayload},
        ${result.opportunity_score},
        ${result.maturity_level},
        ${recommendation},
        '/diagnostico',
        ${ip},
        NOW(),
        NOW()
      )
      RETURNING id;
    `;

    const leadId = rows[0]?.id;
    result.lead_id = leadId;

    sendLeadNotificationEmail(
      {
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        company_name: cleanCompanyName,
        company_size,
        segment,
        main_pain: mainPain,
        quiz_score: result.opportunity_score,
        quiz_maturity_level: result.maturity_level,
        quiz_recommendation: `${result.recommendation_title}: ${result.recommendation_summary}`,
      },
      'Diagnóstico de IA Concluído'
    ).catch((err) => console.error('Erro ao enviar e-mail de diagnóstico:', err));

    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    console.error('Erro interno ao processar diagnóstico de IA:', error);
    return NextResponse.json(
      { detail: 'Ocorreu um erro ao calcular o diagnóstico. Por favor, tente novamente ou fale pelo WhatsApp (11) 95309-9049.' },
      { status: 500 }
    );
  }
}
