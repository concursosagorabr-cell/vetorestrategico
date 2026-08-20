import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const rows = await sql`
      SELECT 
        id, name, email, phone, company_name, segment,
        main_pain, message, lead_type, status, quiz_score,
        quiz_maturity_level, source_url, created_at
      FROM leads
      ORDER BY created_at DESC
      LIMIT 100;
    `;

    return NextResponse.json({ leads: rows });
  } catch (error: any) {
    console.error('Erro ao listar leads:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
