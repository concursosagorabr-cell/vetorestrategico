import { NextRequest, NextResponse } from 'next/server';
import { Groq } from 'groq-sdk';
import { sql } from '@/lib/db';
import { sendLeadNotificationEmail } from '@/lib/emailService';

function getBrasiliaTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString('pt-BR', { timeZone: 'America/Sao_Paulo' });
  const hour = parseInt(timeString.split(':')[0], 10);
  const isNightShift = hour >= 18 || hour < 8;
  return { timeString, hour, isNightShift };
}

// Extrai números de telefone brasileiros (10 ou 11 dígitos) e e-mails de texto
function extractContactInfo(text: string) {
  if (!text) return { phone: null, email: null };

  const emailMatch = text.match(/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/);
  const email = emailMatch ? emailMatch[0].toLowerCase() : null;

  let phone: string | null = null;

  // 1. Sequência contínua de 10 ou 11 dígitos (ex: 11953099049, 1188884444)
  const raw11 = text.match(/\b(?:55)?([1-9]{2}9[0-9]{8})\b/);
  const raw10 = text.match(/\b(?:55)?([1-9]{2}[2-8][0-9]{7})\b/);

  if (raw11) {
    const d = raw11[1];
    phone = `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  } else if (raw10) {
    const d = raw10[1];
    phone = `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  } else {
    // 2. Números formatados (ex: (11) 9 5309-9049, (11) 95309-9049, +55 11 95309-9049)
    const formatted = text.match(/(?:\+?55\s*)?(?:\([1-9]{2}\)|[1-9]{2})\s*9?\s*[0-9]{4}[-\s]?[0-9]{4}/);
    if (formatted) {
      const digits = formatted[0].replace(/\D/g, '');
      const d = digits.startsWith('55') && digits.length > 11 ? digits.slice(2) : digits;
      if (d.length === 11) {
        phone = `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
      } else if (d.length === 10) {
        phone = `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
      }
    }
  }

  return { phone, email };
}

// Salva o lead no Neon e dispara e-mail de forma síncrona/segura
async function handleLeadCapture(messages: Array<{ role: string; content: string }>, req: NextRequest) {
  try {
    const allUserTexts = messages
      .filter((m) => m.role === 'user')
      .map((m) => m.content)
      .join(' | ');

    const { phone, email } = extractContactInfo(allUserTexts);

    if (!phone && !email) {
      return;
    }

    // Extrair informações contextuais da conversa
    let companyName: string | null = null;
    const urlMatch = allUserTexts.match(/(?:www\.)?([a-zA-Z0-9-]+\.[a-zA-Z0-9.]+)/i);
    if (urlMatch) {
      companyName = urlMatch[0];
    }

    let segment: string | null = null;
    const segMatches = ['concursos', 'estetica', 'odonto', 'clinica', 'advocacia', 'contabilidade', 'ecommerce', 'blog', 'loja'];
    for (const seg of segMatches) {
      if (allUserTexts.toLowerCase().includes(seg)) {
        segment = seg.charAt(0).toUpperCase() + seg.slice(1);
        break;
      }
    }

    const ip = req.headers.get('x-forwarded-for') || null;
    const summaryPain = `Lead Chat: ${allUserTexts.slice(-200)}`;
    const fullTranscript = messages.map((m) => `${m.role.toUpperCase()}: ${m.content}`).join('\n');

    // Evita duplicatas se o mesmo número/email foi registrado nos últimos 15 minutos
    const checkQuery = phone
      ? await sql`SELECT id FROM leads WHERE phone = ${phone} AND created_at > NOW() - INTERVAL '15 minutes' LIMIT 1;`
      : await sql`SELECT id FROM leads WHERE email = ${email} AND created_at > NOW() - INTERVAL '15 minutes' LIMIT 1;`;

    if (checkQuery && checkQuery.length > 0) {
      // Já cadastrado recentemente, apenas atualiza histórico
      await sql`UPDATE leads SET message = ${fullTranscript}, updated_at = NOW() WHERE id = ${checkQuery[0].id};`;
      return;
    }

    // Insere novo lead
    const result = await sql`
      INSERT INTO leads (
        name, phone, email, company_name, segment, main_pain, message,
        lead_type, status, source_url, ip_address, created_at, updated_at
      ) VALUES (
        'Lead do Chat IA', ${phone || null}, ${email || null}, ${companyName || null}, ${segment || null},
        ${summaryPain}, ${fullTranscript}, 'CONTACT', 'NEW', '/chat-ia', ${ip},
        NOW(), NOW()
      )
      RETURNING id;
    `;

    const leadId = result[0]?.id;

    // Disparar e-mail de alerta comercial
    await sendLeadNotificationEmail(
      {
        name: 'Lead do Chat IA (Comandante Vetor)',
        phone: phone,
        email: email || 'Não informado',
        company_name: companyName || 'Não especificado',
        segment: segment || 'Geral',
        main_pain: summaryPain,
        message: fullTranscript,
      },
      '🔥 NOVO LEAD CAPTADO NO CHAT'
    );

    console.log(`[LEAD CAPTURED SUCCESS] ID #${leadId} | Telefone: ${phone} | E-mail: ${email}`);
  } catch (err) {
    console.error('Erro ao capturar lead no chat:', err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { detail: 'Nenhuma mensagem enviada.' },
        { status: 400 }
      );
    }

    const { timeString, hour, isNightShift } = getBrasiliaTime();

    // 1. Processar captura do lead antes de responder para garantir gravação no Neon
    await handleLeadCapture(messages, req);

    const systemPrompt = `Você é o Comandante Vetor, consultor de IA da Vetor Estratégico (www.vetorestrategico.com).

Persona: profissional, direto, confiante, amigável e orientado a resultados. Use linguagem clara e comercial em português brasileiro. Evite jargões técnicos desnecessários. Emojis com moderação (máx. 1-2 por resposta, preferencialmente 🚀 🎯 ✅).

Objetivo principal: qualificar leads, educar sobre as soluções, gerar diagnóstico gratuito ou orçamento e direcionar para WhatsApp (11) 91907-2390 ou /diagnostico /orcamento. Sempre puxe a conversa de volta para o negócio do cliente.

Contexto de Horário Atual em São Paulo: ${timeString} (${hour}h).
${isNightShift ? 'Status: 🌙 Plantão Noturno com IA (18h às 08h). Se relevante, mencione que o time humano retorna às 08h, mas você já registrou o contato dele e o especialista entrará em contato logo cedo!' : 'Status: ☀️ Horário Comercial (08h às 18h).'}

### Regras de comportamento (obrigatórias)
1. Respostas curtas e densas: 3-8 frases no máximo (120-180 palavras). Vá direto ao ponto. Não repita informações já dadas na conversa.
2. Sempre responda a pergunta do usuário de forma útil e honesta. Se for off-topic (ex: distância Terra-Sol, clima, piadas), responda em 1 frase curta e imediatamente conecte ao valor da Vetor (velocidade, conversão, IA 24/7).
3. Nunca invente preços fixos. Diga “sob proposta” ou “a partir de R$ 900–1.400 para landing pages simples” e direcione para orçamento personalizado.
4. Nunca prometa resultados garantidos (ex: “você vai dobrar as vendas”). Fale em potencial, casos reais e ROI auditável.
5. Sempre termine com 1 pergunta de qualificação ou CTA claro (WhatsApp, diagnóstico, orçamento).
6. Se o cliente fornecer o número de WhatsApp ou pedir contato, confirme com entusiasmo que você já registrou o contato dele e que a equipe comercial da Vetor Estratégico entrará em contato com ele diretamente no número informado!
7. LGPD: nunca peça dados sensíveis desnecessários (senhas, cartões, CPF). Confirme que tudo é tratado com confidencialidade e segurança.
8. Economia de tokens: não use frases de preenchimento, não repita a apresentação completa a cada mensagem, não faça listas longas se não forem necessárias.

### Conhecimento oficial da empresa (use apenas isto)
- Empresa: Vetor Estratégico – criação de sites de alta performance + agentes de IA para PMEs.
- Foco: sites rápidos (<1s no celular, Lighthouse 90+), foco comercial (WhatsApp direto), SEO técnico, código próprio (Next.js), sem plataformas engessadas.
- Atendimento: São Paulo-SP + online para todo Brasil. WhatsApp comercial: (11) 91907-2390 | contato.vetorestrategico@gmail.com
- CNPJ: 48.912.304/0001-80

Como funciona (3 passos):
1. Diagnóstico da operação (gargalos de atendimento e vendas)
2. Plano & construção da IA (conectada ao WhatsApp, CRM, ERP)
3. Implantação em até 30 dias + treinamento + painel de métricas

Processo de criação de sites:
1. Diagnóstico e Briefing
2. Alinhamento & Escopo (semana 1)
3. UX/UI & Desenvolvimento (semanas 2-3)
4. Lançamento & Treinamento

Principais soluções:
- Sites Institucionais & Corporativos
- Landing Pages de Captação
- Atendimento Automatizado no WhatsApp 24/7 (triagem + qualificação)
- Qualificação prévia de contatos
- Integração Formulários ↔ CRM
- SEO Técnico & Performance

Planos (todos sob proposta):
1. Presença Essencial & Captação Direta – Landing page focada em conversão + WhatsApp + SEO básico. Ideal para profissionais liberais e negócios locais. (referência inicial: a partir de R$ 900–1.400)
2. Plataforma Institucional Completa – Multi-páginas, SEO avançado, blog, painel admin. Ideal para clínicas, consultorias, advocacia, contabilidade.
3. Plataforma Web + Automação Integrada – Tudo do plano 2 + agente de IA no WhatsApp 24/7 + qualificação + integração CRM.

Diferenciais reais:
- Carregamento <1s no celular
- Código próprio (sem WordPress engessado)
- Integração nativa com WhatsApp
- Conformidade total LGPD + SSL
- Autonomia do cliente (domínio e acessos 100% dele)
- Relatório executivo quinzenal e monitoramento de acurácia da IA

Cases reais (cite quando relevante):
- Marcos Pinturas SP → WhatsApp direto + mobile-first
- Concursos Agora → Silos de SEO + alta performance
- Valore Gestão → Posicionamento B2B + qualificação
- OdontoPrime → Triagem 24/7 no WhatsApp

Segmentos prioritários: clínicas de estética, odontológicas, médicos (normas CFM), advocacia (Provimento 205/2021 OAB), contabilidade, consultorias B2B, prestadores de serviços, e-commerce (recuperação de carrinho).

Diagnóstico Gratuito: disponível em /diagnostico (2 minutos). Sempre ofereça quando fizer sentido.

### Regras finais de economia e qualidade
- Máximo 120-180 palavras por resposta na maioria dos casos.
- Priorize perguntas abertas de qualificação.
- Se o lead pedir preço, diga que depende do escopo e ofereça orçamento personalizado ou diagnóstico.
- Se não souber algo específico, diga “vou te conectar com o time humano no WhatsApp para detalhes precisos” e passe o número (11) 91907-2390.
`;

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        role: 'assistant',
        content: `Oi! Sou o **Comandante Vetor** 🚀.\n\nComo posso ajudar sua empresa hoje? Posso tirar dúvidas sobre nossos **sites de alta conversão**, **automações no WhatsApp 24/7** ou ajudar você a calcular o potencial de ganho no [Diagnóstico Gratuito](/diagnostico).\n\nWhatsApp comercial: **(11) 91907-2390**`,
        isNightShift,
        timeString,
      });
    }

    const groq = new Groq({ apiKey });
    const model = process.env.GROQ_MODEL || 'openai/gpt-oss-120b';

    let completion;
    try {
      completion = await groq.chat.completions.create({
        model: model,
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.slice(-10),
        ],
        temperature: 0.7,
        max_tokens: 1024,
        top_p: 0.9,
      });
    } catch (e: any) {
      console.warn(`Tentando modelo alternativo após erro no ${model}:`, e?.message);
      completion = await groq.chat.completions.create({
        model: 'openai/gpt-oss-20b',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.slice(-10),
        ],
        temperature: 0.7,
        max_tokens: 1024,
        top_p: 0.9,
      });
    }

    const replyContent = completion.choices[0]?.message?.content || 'Vou te conectar com o time humano no WhatsApp para detalhes precisos: (11) 91907-2390 🚀';

    return NextResponse.json({
      role: 'assistant',
      content: replyContent,
      isNightShift,
      timeString,
    });
  } catch (error: any) {
    console.error('Erro no agente Groq:', error);
    return NextResponse.json(
      { detail: error.message || 'Erro ao comunicar com o agente de IA.' },
      { status: 500 }
    );
  }
}
