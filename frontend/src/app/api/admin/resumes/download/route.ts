import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export const dynamic = 'force-dynamic';

function isAuthorized(req: NextRequest): boolean {
  const secretKey = process.env.ADMIN_SECRET_KEY || process.env.ADMIN_PASSWORD;

  if (!secretKey) return false;

  const tokenHeader = req.headers.get('x-admin-token');
  if (tokenHeader && tokenHeader === secretKey) return true;

  const authHeader = req.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const bearerToken = authHeader.substring(7).trim();
    if (bearerToken === secretKey) return true;
  }

  // Permite token via searchParams para download direto no navegador (nova aba)
  const tokenQuery = req.nextUrl.searchParams.get('token');
  if (tokenQuery && tokenQuery === secretKey) return true;

  return false;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { detail: 'Acesso não autorizado ao arquivo.' },
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
      return NextResponse.json({ detail: 'ID inválido.' }, { status: 400 });
    }

    const rows = await sql`
      SELECT id, name, file_name, file_data_base64, submission_type
      FROM resumes
      WHERE id = ${id}
      LIMIT 1;
    `;

    if (!rows || rows.length === 0) {
      return NextResponse.json({ detail: 'Currículo não encontrado.' }, { status: 404 });
    }

    const resume = rows[0];

    if (!resume.file_data_base64) {
      return NextResponse.json(
        { detail: 'Este currículo foi enviado via formulário web estruturado e não possui arquivo PDF anexado.' },
        { status: 400 }
      );
    }

    const pdfBuffer = Buffer.from(resume.file_data_base64, 'base64');
    const safeFileName = (resume.file_name || `curriculo-${resume.name.replace(/\s+/g, '-').toLowerCase()}.pdf`).replace(/[^\w.-]/g, '_');

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${safeFileName}"`,
        'Content-Length': pdfBuffer.length.toString(),
        'Cache-Control': 'private, no-cache, no-store, must-revalidate',
      },
    });
  } catch (error: any) {
    console.error('Erro ao servir arquivo PDF do currículo:', error);
    return NextResponse.json(
      { detail: 'Erro interno ao processar o arquivo PDF.' },
      { status: 500 }
    );
  }
}
