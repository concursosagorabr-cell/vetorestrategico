import logging
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from app.core.config import settings

logger = logging.getLogger(__name__)

async def send_lead_notification_email(lead_data: dict, subject_prefix: str = "Novo Lead"):
    """
    Sends an email notification to the commercial team when a new lead is captured.
    Gracefully logs if SMTP is not configured.
    """
    subject = f"[{settings.PROJECT_NAME}] {subject_prefix}: {lead_data.get('name', 'Contato')} - {lead_data.get('company_name', 'Empresa')}"
    
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            body {{ font-family: Arial, sans-serif; background-color: #0b0f19; color: #f3f4f6; padding: 20px; }}
            .container {{ max-width: 600px; margin: 0 auto; background-color: #111827; border: 1px solid #1f2937; border-radius: 12px; padding: 24px; }}
            .header {{ border-bottom: 2px solid #10b981; padding-bottom: 12px; margin-bottom: 20px; }}
            .header h2 {{ color: #10b981; margin: 0; }}
            .item {{ margin-bottom: 12px; }}
            .label {{ font-weight: bold; color: #38bdf8; }}
            .value {{ color: #ffffff; margin-top: 4px; }}
            .footer {{ margin-top: 24px; font-size: 12px; color: #9ca3af; border-top: 1px solid #374151; padding-top: 12px; }}
            .badge {{ display: inline-block; padding: 4px 10px; background-color: #10b981; color: #064e3b; font-weight: bold; border-radius: 6px; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>{settings.PROJECT_NAME} - Notificação Comercial</h2>
                <p style="color: #9ca3af; margin-top: 4px;">{subject_prefix} recebido pelo site oficial</p>
            </div>
            
            <div class="item">
                <div class="label">Nome do Contato:</div>
                <div class="value">{lead_data.get('name', 'Não informado')}</div>
            </div>
            <div class="item">
                <div class="label">E-mail:</div>
                <div class="value"><a href="mailto:{lead_data.get('email')}" style="color: #38bdf8;">{lead_data.get('email', 'Não informado')}</a></div>
            </div>
            <div class="item">
                <div class="label">Telefone / WhatsApp:</div>
                <div class="value"><a href="https://wa.me/{str(lead_data.get('phone', '')).replace('+', '').replace(' ', '').replace('-', '')}" style="color: #10b981;">{lead_data.get('phone', 'Não informado')}</a></div>
            </div>
            <div class="item">
                <div class="label">Empresa:</div>
                <div class="value">{lead_data.get('company_name', 'Não informado')} ({lead_data.get('segment', 'Segmento não informado')})</div>
            </div>
            <div class="item">
                <div class="label">Porte da Equipe:</div>
                <div class="value">{lead_data.get('company_size', 'Não informado')}</div>
            </div>
            <div class="item">
                <div class="label">Principal Dor / Objetivo:</div>
                <div class="value">{lead_data.get('main_pain') or lead_data.get('message') or 'Não especificado'}</div>
            </div>
            {f'''
            <div class="item">
                <div class="label">Orçamento Estimado:</div>
                <div class="value">{lead_data.get('estimated_budget')}</div>
            </div>
            ''' if lead_data.get('estimated_budget') else ''}
            {f'''
            <div class="item">
                <div class="label">Pontuação de Diagnóstico IA:</div>
                <div class="value"><span class="badge">{lead_data.get('quiz_score')}/100</span> - {lead_data.get('quiz_maturity_level')}</div>
            </div>
            <div class="item">
                <div class="label">Recomendação Gerada:</div>
                <div class="value">{lead_data.get('quiz_recommendation')}</div>
            </div>
            ''' if lead_data.get('quiz_score') else ''}
            
            <div class="footer">
                Vetor Estratégico &bull; IA & Negócios para PMEs &bull; <a href="mailto:contato.vetorestrategico@gmail.com" style="color: #9ca3af;">contato.vetorestrategico@gmail.com</a>
            </div>
        </div>
    </body>
    </html>
    """

    if not settings.SMTP_HOST or not settings.SMTP_USER:
        logger.info(f"[EMAIL MOCK - SIMULAÇÃO] Notificação para {settings.COMMERCIAL_EMAIL}:\nAssunto: {subject}\nLead: {lead_data.get('name')} | {lead_data.get('email')} | {lead_data.get('phone')}")
        return True

    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"] = settings.SMTP_FROM_EMAIL
        msg["To"] = settings.COMMERCIAL_EMAIL
        
        part = MIMEText(html_content, "html")
        msg.attach(part)
        
        with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT, timeout=10) as server:
            if settings.SMTP_TLS:
                server.starttls()
            if settings.SMTP_PASSWORD:
                server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
            server.sendmail(settings.SMTP_FROM_EMAIL, [settings.COMMERCIAL_EMAIL], msg.as_string())
        logger.info(f"E-mail de notificação enviado com sucesso para {settings.COMMERCIAL_EMAIL}")
        return True
    except Exception as e:
        logger.error(f"Erro ao enviar e-mail de notificação: {e}")
        return False
