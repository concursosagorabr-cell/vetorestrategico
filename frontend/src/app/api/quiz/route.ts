import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { calculateQuizResult } from '@/lib/quizEngine';
import { sendLeadNotificationEmail } from '@/lib/emailService';

export async function POST(req: NextRequest) {
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

    if (!segment || !company_size || !main_bottleneck || !digital_maturity || !name || !email || !phone || !company_name) {
      return NextResponse.json(
        { detail: 'Todos os campos obrigatórios do diagnóstico devem ser preenchidos.' },
        { status: 422 }
      );
    }

    const result = calculateQuizResult(body);
    const ip = req.headers.get('x-forwarded-for') || null;

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
        ${name}, ${email}, ${phone}, ${company_name}, ${company_size}, ${segment},
        ${mainPain}, 'quiz', 'new', ${answersPayload}, ${result.opportunity_score},
        ${result.maturity_level}, ${recommendation}, '/diagnostico', ${ip},
        NOW(), NOW()
      )
      RETURNING id;
    `;

    const leadId = rows[0]?.id;
    result.lead_id = leadId;

    sendLeadNotificationEmail(
      {
        name,
        email,
        phone,
        company_name,
        company_size,
        segment,
        main_pain: mainPain,
        quiz_score: result.opportunity_score,
        quiz_maturity_level: result.maturity_level,
        quiz_recommendation: `${result.recommendation_title}: ${result.recommendation_summary}`,
      },
      'Diagnóstico de IA Concluído'
    ).catch(console.error);

    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    console.error('Erro ao processar diagnóstico de IA:', error);
    return NextResponse.json(
      { detail: error.message || 'Erro ao processar diagnóstico de IA.' },
      { status: 500 }
    );
  }
}
