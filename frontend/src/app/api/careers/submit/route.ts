import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { sendResumeNotificationEmail } from '@/lib/emailService';
import { getClientIp, rateLimit } from '@/lib/rateLimit';

export const dynamic = 'force-dynamic';

async function ensureResumesTable() {
  try {
    if (process.env.DATABASE_URL) {
      await sql`
        CREATE TABLE IF NOT EXISTS resumes (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(50),
          role_interest VARCHAR(150) NOT NULL,
          experience_level VARCHAR(50),
          work_model VARCHAR(50),
          salary_expectation VARCHAR(100),
          linkedin_url TEXT,
          github_portfolio_url TEXT,
          summary TEXT,
          skills TEXT,
          submission_type VARCHAR(50) NOT NULL,
          file_name VARCHAR(255),
          file_data_base64 TEXT,
          file_size_bytes INT,
          status VARCHAR(50) DEFAULT 'NEW',
          notes TEXT,
          ip_address VARCHAR(100),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `;
    }
  } catch (err) {
    console.warn('Aviso ao verificar tabela de currículos:', err);
  }
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const limiter = rateLimit(`careers_submit:${ip}`, 5, 60000);

  if (!limiter.success) {
    return NextResponse.json(
      { detail: 'Muitas tentativas em sequência. Por favor, aguarde um minuto antes de enviar novamente.' },
      { status: 429 }
    );
  }

  await ensureResumesTable();

  try {
    const contentType = req.headers.get('content-type') || '';

    let candidateName = '';
    let candidateEmail = '';
    let candidatePhone = '';
    let roleInterest = '';
    let experienceLevel = '';
    let workModel = 'Remoto / PJ';
    let salaryExpectation = '';
    let linkedinUrl = '';
    let githubPortfolioUrl = '';
    let summary = '';
    let skills = '';
    let submissionType = 'WEB_FORM';
    let fileName = '';
    let fileDataBase64 = '';
    let fileSizeBytes = 0;

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();

      candidateName = String(formData.get('name') || '').trim();
      candidateEmail = String(formData.get('email') || '').trim().toLowerCase();
      candidatePhone = String(formData.get('phone') || '').trim();
      roleInterest = String(formData.get('role_interest') || '').trim();
      experienceLevel = String(formData.get('experience_level') || 'Pleno').trim();
      workModel = String(formData.get('work_model') || 'Remoto / PJ').trim();
      salaryExpectation = String(formData.get('salary_expectation') || '').trim();
      linkedinUrl = String(formData.get('linkedin_url') || '').trim();
      githubPortfolioUrl = String(formData.get('github_portfolio_url') || '').trim();
      summary = String(formData.get('summary') || '').trim();
      skills = String(formData.get('skills') || '').trim();

      const file = formData.get('resume_file') as File | null;

      if (!file || file.size === 0) {
        return NextResponse.json(
          { detail: 'Por favor, selecione seu arquivo de currículo em PDF.' },
          { status: 400 }
        );
      }

      // Validação estrita de formato PDF
      const isPdfName = file.name.toLowerCase().endsWith('.pdf');
      const isPdfType = file.type.toLowerCase().includes('pdf') || file.type === 'application/octet-stream';

      if (!isPdfName && !isPdfType) {
        return NextResponse.json(
          { detail: 'Formato inválido. Aceitamos estritamente arquivos em formato PDF (.pdf).' },
          { status: 400 }
        );
      }

      // Limite de 5MB
      const MAX_SIZE = 5 * 1024 * 1024;
      if (file.size > MAX_SIZE) {
        return NextResponse.json(
          { detail: 'O arquivo PDF excede o limite máximo permitido de 5MB.' },
          { status: 400 }
        );
      }

      fileName = file.name;
      fileSizeBytes = file.size;
      submissionType = 'PDF_UPLOAD';

      const arrayBuffer = await file.arrayBuffer();
      fileDataBase64 = Buffer.from(arrayBuffer).toString('base64');
    } else {
      const body = await req.json();

      candidateName = String(body.name || '').trim();
      candidateEmail = String(body.email || '').trim().toLowerCase();
      candidatePhone = String(body.phone || body.whatsapp || '').trim();
      roleInterest = String(body.role_interest || body.role || '').trim();
      experienceLevel = String(body.experience_level || 'Pleno').trim();
      workModel = String(body.work_model || 'Remoto / PJ').trim();
      salaryExpectation = String(body.salary_expectation || '').trim();
      linkedinUrl = String(body.linkedin_url || '').trim();
      githubPortfolioUrl = String(body.github_portfolio_url || body.portfolio || '').trim();
      summary = String(body.summary || body.experience_summary || '').trim();
      skills = String(body.skills || '').trim();
      submissionType = 'WEB_FORM';
    }

    if (!candidateName || !candidateEmail || !roleInterest) {
      return NextResponse.json(
        { detail: 'Nome completo, e-mail e cargo/área de interesse são obrigatórios.' },
        { status: 400 }
      );
    }

    // Persistência no banco de dados
    if (process.env.DATABASE_URL) {
      await sql`
        INSERT INTO resumes (
          name, email, phone, role_interest, experience_level,
          work_model, salary_expectation, linkedin_url, github_portfolio_url,
          summary, skills, submission_type, file_name, file_data_base64,
          file_size_bytes, status, ip_address, created_at, updated_at
        ) VALUES (
          ${candidateName},
          ${candidateEmail},
          ${candidatePhone || null},
          ${roleInterest},
          ${experienceLevel || null},
          ${workModel || null},
          ${salaryExpectation || null},
          ${linkedinUrl || null},
          ${githubPortfolioUrl || null},
          ${summary || null},
          ${skills || null},
          ${submissionType},
          ${fileName || null},
          ${fileDataBase64 || null},
          ${fileSizeBytes || null},
          'NEW',
          ${ip},
          NOW(),
          NOW()
        );
      `;
    }

    // Notificação por e-mail para a equipe
    sendResumeNotificationEmail({
      name: candidateName,
      email: candidateEmail,
      phone: candidatePhone,
      role_interest: roleInterest,
      experience_level: experienceLevel,
      submission_type: submissionType,
      linkedin_url: linkedinUrl || githubPortfolioUrl,
      summary,
      skills,
    }).catch((err) => console.error('Erro ao notificar equipe sobre currículo:', err));

    return NextResponse.json(
      {
        success: true,
        message: 'Currículo enviado com sucesso! Seu perfil foi integrado ao nosso banco de talentos prioritário.',
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Erro interno ao processar candidatura:', error);
    return NextResponse.json(
      { detail: 'Ocorreu um erro ao processar sua candidatura. Por favor, tente novamente ou envie para contato.vetorestrategico@gmail.com' },
      { status: 500 }
    );
  }
}
