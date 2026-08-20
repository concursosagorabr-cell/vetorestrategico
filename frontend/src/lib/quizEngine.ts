import { QuizSubmissionData, QuizResultData } from '@/types';

export function calculateQuizResult(submission: QuizSubmissionData): QuizResultData {
  let score = 70;
  let baseHours = '30 a 60 horas/mês';

  // 1. Company Size Factor
  const sizeLower = (submission.company_size || '').toLowerCase();
  if (sizeLower.includes('1-5') || sizeLower.includes('1 a 5')) {
    score += 8;
    baseHours = '30 a 60 horas/mês';
  } else if (sizeLower.includes('6-20') || sizeLower.includes('6 a 20')) {
    score += 15;
    baseHours = '70 a 140 horas/mês';
  } else if (sizeLower.includes('21-50') || sizeLower.includes('21 a 50')) {
    score += 20;
    baseHours = '120 a 250 horas/mês';
  } else {
    score += 24;
    baseHours = '200 a 500+ horas/mês';
  }

  // 2. Bottleneck Strategy
  const bottleneckLower = (submission.main_bottleneck || '').toLowerCase();
  let priorityAction = '';
  let recTitle = '';
  let summary = '';
  let deliverables: string[] = [];

  if (bottleneckLower.includes('atendimento') || bottleneckLower.includes('whatsapp')) {
    score += 4;
    priorityAction = 'Agente de Atendimento & Triagem Inteligente no WhatsApp 24/7';
    recTitle = 'Automação Conversacional & Atendimento Ágil com IA';
    summary = `Para a ${submission.company_name} no segmento de ${submission.segment}, a prioridade imediata é eliminar o tempo de espera no primeiro contato, responder dúvidas frequentes instantaneamente e qualificar clientes antes de transferir para a equipe humana.`;
    deliverables = [
      'Agente inteligente no WhatsApp treinado nas regras e produtos da empresa',
      'Triagem automática e agendamento/encaminhamento direto no CRM',
      'Dashboard de conversação e tempo médio de resposta (SLA)',
      'Transbordo humanizado e seguro para atendentes reais',
    ];
  } else if (bottleneckLower.includes('vendas') || bottleneckLower.includes('leads')) {
    score += 5;
    priorityAction = 'Esteira de Qualificação Automática & Nutrição de Leads';
    recTitle = 'Motor de Aceleração Comercial & Conversão de Leads com IA';
    summary = `Identificamos que a ${submission.company_name} pode aumentar a taxa de conversão em até 40% ao responder leads em menos de 60 segundos com IA, filtrando orçamentos desqualificados e entregando apenas oportunidades prontas para fechamento ao time comercial.`;
    deliverables = [
      'Automação de resposta ultra-rápida (Speed to Lead < 1 min)',
      'Pontuação e qualificação preditiva de leads (Lead Scoring com IA)',
      'Integração bidirecional com CRM (HubSpot, RD Station, Pipedrive ou planilha)',
      'Scripts de acompanhamento e recuperação de contatos inativos',
    ];
  } else if (
    bottleneckLower.includes('processos') ||
    bottleneckLower.includes('manuais') ||
    bottleneckLower.includes('equipe')
  ) {
    score += 5;
    priorityAction = 'Automação de Back-office & Extração Inteligente de Documentos (RPA + IA)';
    recTitle = 'Plano de Eficiência Operacional & Redução de Retrabalho';
    summary = `A operação da ${submission.company_name} possui alto potencial de liberação de tempo manual. A combinação de IA generativa com automações de rotina elimina preenchimento repetitivo, conferência de planilhas e digitação de pedidos.`;
    deliverables = [
      'Robôs de automação de fluxo de trabalho (integração entre sistemas legados e cloud)',
      'Processamento e extração automática de dados de PDFs, faturas e contratos',
      'Validação automática de cadastros e conferência fiscal/operacional',
      'Treinamento prático da equipe para uso de copilotos de produtividade',
    ];
  } else {
    score += 3;
    priorityAction = 'Dashboard Inteligente de BI com Consultoria Preditiva';
    recTitle = 'Inteligência de Dados & Tomada de Decisão em Tempo Real';
    summary = `Centralizaremos os dados operacionais da ${submission.company_name} em um painel executivo com insights automáticos gerados por IA sobre margem, tendências de vendas e anomalias de custo.`;
    deliverables = [
      'Conexão de fontes de dados dispersas em um único repositório limpo',
      'Dashboard interativo com indicadores-chave (KPIs) essenciais para PMEs',
      'Alertas preditivos automáticos via WhatsApp/E-mail para os gestores',
      'Relatórios executivos semanais gerados e interpretados por IA',
    ];
  }

  const opportunityScore = Math.min(98, Math.max(75, score));

  // 3. Maturity Classification
  const maturityLower = (submission.digital_maturity || '').toLowerCase();
  let maturityLevel = '';
  if (maturityLower.includes('planilha') || maturityLower.includes('manual')) {
    maturityLevel = 'Estágio Inicial: Alto Potencial de Ganho Imediato (Quick-Wins)';
  } else if (maturityLower.includes('básico') || maturityLower.includes('desconectado')) {
    maturityLevel = 'Estágio de Estruturação: Oportunidade de Integração & Automação';
  } else if (maturityLower.includes('crm') || maturityLower.includes('erp')) {
    maturityLevel = 'Estágio Avançado: Oportunidade de Escala com Agentes Autônomos';
  } else {
    maturityLevel = 'Estágio de Inovação: Oportunidade de IA Preditiva e Personalizada';
  }

  return {
    opportunity_score: opportunityScore,
    maturity_level: maturityLevel,
    estimated_hours_saved_month: baseHours,
    priority_action: priorityAction,
    recommendation_title: recTitle,
    recommendation_summary: summary,
    key_deliverables: deliverables,
  };
}
