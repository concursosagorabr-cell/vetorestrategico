import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getClientIp, rateLimit } from '@/lib/rateLimit';

export const dynamic = 'force-dynamic';

function isAuthorized(req: NextRequest): boolean {
  const secretKey = process.env.ADMIN_SECRET_KEY || process.env.ADMIN_PASSWORD;

  if (!secretKey) {
    console.error('AVISO DE SEGURANÇA: ADMIN_SECRET_KEY não definida nas variáveis de ambiente. Acesso bloqueado.');
    return false;
  }

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
  const limiter = rateLimit(`admin_resumes:${ip}`, 40, 60000);

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
        id, name, email, phone, role_interest, experience_level,
        work_model, salary_expectation, linkedin_url, github_portfolio_url,
        summary, skills, submission_type, file_name, file_size_bytes,
        (file_data_base64 IS NOT NULL) AS has_file,
        status, notes, created_at
      FROM resumes
      ORDER BY created_at DESC
      LIMIT 200;
    `;

    return NextResponse.json({ resumes: rows });
  } catch (error: any) {
    console.error('Erro interno ao listar currículos:', error);
    return NextResponse.json(
      { detail: 'Erro interno ao consultar banco de currículos.' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { detail: 'Não autorizado.' },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const idParam = searchParams.get('id');

    if (!idParam) {
      return NextResponse.json(
        { detail: 'ID do currículo é obrigatório.' },
        { status: 400 }
      );
    }

    const id = parseInt(idParam, 10);
    if (isNaN(id)) {
      return NextResponse.json(
        { detail: 'ID inválido.' },
        { status: 400 }
      );
    }

    await sql`
      DELETE FROM resumes
      WHERE id = ${id};
    `;

    return NextResponse.json({ success: true, message: 'Currículo excluído com sucesso.' });
  } catch (error: any) {
    console.error('Erro ao excluir currículo:', error);
    return NextResponse.json(
      { detail: 'Erro ao excluir currículo do banco.' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { detail: 'Não autorizado.' },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const { id, status, notes } = body;

    if (!id) {
      return NextResponse.json(
        { detail: 'ID do currículo é obrigatório.' },
        { status: 400 }
      );
    }

    await sql`
      UPDATE resumes
      SET 
        status = COALESCE(${status}, status),
        notes = COALESCE(${notes}, notes),
        updated_at = NOW()
      WHERE id = ${id};
    `;

    return NextResponse.json({ success: true, message: 'Status atualizado com sucesso.' });
  } catch (error: any) {
    console.error('Erro ao atualizar status do currículo:', error);
    return NextResponse.json(
      { detail: 'Erro ao atualizar dados do currículo.' },
      { status: 500 }
    );
  }
}
