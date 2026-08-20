import nodemailer from 'nodemailer';

export async function sendLeadNotificationEmail(
  leadData: Record<string, any>,
  subjectPrefix: string = 'Novo Lead'
) {
  const commercialEmail = process.env.COMMERCIAL_EMAIL || 'contato.vetorestrategico@gmail.com';
  const projectName = 'Vetor Estratégico';
  const subject = `[${projectName}] ${subjectPrefix}: ${leadData.name || 'Contato'} - ${leadData.company_name || 'Empresa'}`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            body { font-family: Arial, sans-serif; background-color: #0b0f19; color: #f3f4f6; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background-color: #111827; border: 1px solid #1f2937; border-radius: 12px; padding: 24px; }
            .header { border-bottom: 2px solid #10b981; padding-bottom: 12px; margin-bottom: 20px; }
            .header h2 { color: #10b981; margin: 0; }
            .item { margin-bottom: 12px; }
            .label { font-weight: bold; color: #38bdf8; }
            .value { color: #ffffff; margin-top: 4px; }
            .footer { margin-top: 24px; font-size: 12px; color: #9ca3af; border-top: 1px solid #374151; padding-top: 12px; }
            .badge { display: inline-block; padding: 4px 10px; background-color: #10b981; color: #064e3b; font-weight: bold; border-radius: 6px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>${projectName} - Notificação Comercial</h2>
                <p style="color: #9ca3af; margin-top: 4px;">${subjectPrefix} recebido pelo site oficial</p>
            </div>
            
            <div class="item">
                <div class="label">Nome do Contato:</div>
                <div class="value">${leadData.name || 'Não informado'}</div>
            </div>
            <div class="item">
                <div class="label">E-mail:</div>
                <div class="value"><a href="mailto:${leadData.email}" style="color: #38bdf8;">${leadData.email || 'Não informado'}</a></div>
            </div>
            <div class="item">
                <div class="label">Telefone / WhatsApp:</div>
                <div class="value"><a href="https://wa.me/${String(leadData.phone || '').replace(/\D/g, '')}" style="color: #10b981;">${leadData.phone || 'Não informado'}</a></div>
            </div>
            <div class="item">
                <div class="label">Empresa:</div>
                <div class="value">${leadData.company_name || 'Não informado'} (${leadData.segment || 'Segmento não informado'})</div>
            </div>
            <div class="item">
                <div class="label">Porte da Equipe:</div>
                <div class="value">${leadData.company_size || 'Não informado'}</div>
            </div>
            <div class="item">
                <div class="label">Principal Dor / Objetivo:</div>
                <div class="value">${leadData.main_pain || leadData.message || 'Não especificado'}</div>
            </div>
            ${
              leadData.estimated_budget
                ? `
            <div class="item">
                <div class="label">Orçamento Estimado:</div>
                <div class="value">${leadData.estimated_budget}</div>
            </div>`
                : ''
            }
            ${
              leadData.quiz_score
                ? `
            <div class="item">
                <div class="label">Pontuação de Diagnóstico IA:</div>
                <div class="value"><span class="badge">${leadData.quiz_score}/100</span> - ${leadData.quiz_maturity_level}</div>
            </div>
            <div class="item">
                <div class="label">Recomendação Gerada:</div>
                <div class="value">${leadData.quiz_recommendation}</div>
            </div>`
                : ''
            }
            
            <div class="footer">
                ${projectName} &bull; IA & Negócios para PMEs &bull; <a href="mailto:${commercialEmail}" style="color: #9ca3af;">${commercialEmail}</a>
            </div>
        </div>
    </body>
    </html>
  `;

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
    console.log(`[EMAIL MOCK] Notificação comercial para ${commercialEmail}: Lead ${leadData.name} (${leadData.email})`);
    return true;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL || commercialEmail,
      to: commercialEmail,
      subject,
      html: htmlContent,
    });

    return true;
  } catch (error) {
    console.error('Erro ao enviar e-mail de notificação:', error);
    return false;
  }
}
