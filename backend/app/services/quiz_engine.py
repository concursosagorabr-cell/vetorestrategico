from typing import Dict, Any, List
from app.schemas.quiz import QuizSubmission, QuizRecommendationResult

def calculate_quiz_result(submission: QuizSubmission) -> QuizRecommendationResult:
    """
    Calculates AI Opportunity Score, estimated hours saved, and tailored recommendation
    for SMBs based on sector, team size, bottleneck, and current digital maturity.
    """
    score = 70  # Baseline
    
    # 1. Company Size Factor (More staff -> higher potential ROI from automation)
    size_lower = submission.company_size.lower()
    if "1-5" in size_lower or "1 a 5" in size_lower:
        score += 8
        base_hours = "30 a 60 horas/mês"
    elif "6-20" in size_lower or "6 a 20" in size_lower:
        score += 15
        base_hours = "70 a 140 horas/mês"
    elif "21-50" in size_lower or "21 a 50" in size_lower:
        score += 20
        base_hours = "120 a 250 horas/mês"
    else:  # 50+
        score += 24
        base_hours = "200 a 500+ horas/mês"
        
    # 2. Bottleneck Strategy
    bottleneck_lower = submission.main_bottleneck.lower()
    
    if "atendimento" in bottleneck_lower or "whatsapp" in bottleneck_lower:
        score += 4
        priority_action = "Agente de Atendimento & Triagem Inteligente no WhatsApp 24/7"
        rec_title = "Automação Conversacional & Atendimento Ágil com IA"
        summary = (
            f"Para a {submission.company_name} no segmento de {submission.segment}, a prioridade imediata "
            "é eliminar o tempo de espera no primeiro contato, responder dúvidas frequentes instantaneamente "
            "e qualificar clientes antes de transferir para a equipe humana."
        )
        deliverables = [
            "Agente inteligente no WhatsApp treinado nas regras e produtos da empresa",
            "Triagem automática e agendamento/encaminhamento direto no CRM",
            "Dashboard de conversação e tempo médio de resposta (SLA)",
            "Transbordo humanizado e seguro para atendentes reais"
        ]
    elif "vendas" in bottleneck_lower or "leads" in bottleneck_lower:
        score += 5
        priority_action = "Esteira de Qualificação Automática & Nutrição de Leads"
        rec_title = "Motor de Aceleração Comercial & Conversão de Leads com IA"
        summary = (
            f"Identificamos que a {submission.company_name} pode aumentar a taxa de conversão em até 40% "
            "ao responder leads em menos de 60 segundos com IA, filtrando orçamentos desqualificados e "
            "entregando apenas oportunidades prontas para fechamento ao time comercial."
        )
        deliverables = [
            "Automação de resposta ultra-rápida (Speed to Lead < 1 min)",
            "Pontuação e qualificação preditiva de leads (Lead Scoring com IA)",
            "Integração bidirecional com CRM (HubSpot, RD Station, Pipedrive ou planilha)",
            "Scripts de acompanhamento e recuperação de contatos inativos"
        ]
    elif "processos" in bottleneck_lower or "manuais" in bottleneck_lower or "equipe" in bottleneck_lower:
        score += 5
        priority_action = "Automação de Back-office & Extração Inteligente de Documentos (RPA + IA)"
        rec_title = "Plano de Eficiência Operacional & Redução de Retrabalho"
        summary = (
            f"A operação da {submission.company_name} possui alto potencial de liberação de tempo manual. "
            "A combinação de IA generativa com automações de rotina elimina preenchimento repetitivo, "
            "conferência de planilhas e digitação de pedidos."
        )
        deliverables = [
            "Robôs de automação de fluxo de trabalho (integração entre sistemas legados e cloud)",
            "Processamento e extração automática de dados de PDFs, faturas e contratos",
            "Validação automática de cadastros e conferência fiscal/operacional",
            "Treinamento prático da equipe para uso de copilotos de produtividade"
        ]
    else:  # Dados ou geral
        score += 3
        priority_action = "Dashboard Inteligente de BI com Consultoria Preditiva"
        rec_title = "Inteligência de Dados & Tomada de Decisão em Tempo Real"
        summary = (
            f"Centralizaremos os dados operacionais da {submission.company_name} em um painel executivo "
            "com insights automáticos gerados por IA sobre margem, tendências de vendas e anomalias de custo."
        )
        deliverables = [
            "Conexão de fontes de dados dispersas em um único repositório limpo",
            "Dashboard interativo com indicadores-chave (KPIs) essenciais para PMEs",
            "Alertas preditivos automáticos via WhatsApp/E-mail para os gestores",
            "Relatórios executivos semanais gerados e interpretados por IA"
        ]
        
    # Cap score between 75 and 98 for realistic business confidence
    opportunity_score = min(98, max(75, score))
    
    # Maturity Classification
    maturity_lower = submission.digital_maturity.lower()
    if "planilha" in maturity_lower or "manual" in maturity_lower:
        maturity_level = "Estágio Inicial: Alto Potencial de Ganho Imediato (Quick-Wins)"
    elif "básico" in maturity_lower or "desconectado" in maturity_lower:
        maturity_level = "Estágio de Estruturação: Oportunidade de Integração & Automação"
    elif "crm" in maturity_lower or "erp" in maturity_lower:
        maturity_level = "Estágio Avançado: Oportunidade de Escala com Agentes Autônomos"
    else:
        maturity_level = "Estágio de Inovação: Oportunidade de IA Preditiva e Personalizada"

    return QuizRecommendationResult(
        opportunity_score=opportunity_score,
        maturity_level=maturity_level,
        estimated_hours_saved_month=base_hours,
        priority_action=priority_action,
        recommendation_title=rec_title,
        recommendation_summary=summary,
        key_deliverables=deliverables,
        lead_id=None
    )
