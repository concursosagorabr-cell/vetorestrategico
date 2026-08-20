import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getClientIp, rateLimit } from '@/lib/rateLimit';

export const dynamic = 'force-dynamic';

function isAuthorized(req: NextRequest): boolean {
  const secretKey = process.env.ADMIN_SECRET_KEY || process.env.ADMIN_PASSWORD || 'vetor_admin_2026_secure';
  
  const tokenHeader = req.headers.get('x-admin-token');
  if (tokenHeader && tokenHeader === secretKey) {
    return true;
  }

  const authHeader = req.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const bearerToken = authHeader.substring(7).trim();
    if (bearerToken === secretKey) {
      return true;
    }
  }

  return false;
}

export async function GET(req: NextRequest) {
  const ip = getClientIp(req);
  const limiter = rateLimit(`admin:${ip}`, 30, 60000);

  if (!limiter.success) {
    return NextResponse.json(
      { detail: 'Muitas tentativas. Por favor, aguarde um minuto.' },
      { status: 429 }
    );
  }

  if (!isAuthorized(req)) {
    return NextResponse.json(
      { detail: 'Não autorizado. Chave de acesso administrativo inválida ou ausente.' },
      { status: 401 }
    );
  }

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
    console.error('Erro interno ao listar leads:', error);
    return NextResponse.json(
      { detail: 'Erro interno ao consultar base de leads.' },
      { status: 500 }
    );
  }
}
