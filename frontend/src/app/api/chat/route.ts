import { NextRequest, NextResponse } from 'next/server';
import { Groq } from 'groq-sdk';
import { getClientIp, rateLimit } from '@/lib/rateLimit';

function getBrasiliaTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString('pt-BR', { timeZone: 'America/Sao_Paulo' });
  const hour = parseInt(timeString.split(':')[0], 10);
  const isNightShift = hour >= 18 || hour < 8;
  return { timeString, hour, isNightShift };
}

export async function POST(req: NextRequest) {
  // 1. Rate limiting por IP (15 requisições por minuto)
  const ip = getClientIp(req);
  const limiter = rateLimit(`chat:${ip}`, 15, 60000);

  if (!limiter.success) {
    return NextResponse.json(
      { detail: 'Limite de mensagens atingido. Por favor, aguarde um instante ou fale diretamente no WhatsApp (11) 95309-9049.' },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { detail: 'Nenhuma mensagem enviada.' },
        { status: 400 }
      );
    }

    // Limitar tamanho das mensagens para mitigar ataques de injeção de tokens gigantes
    const sanitizedMessages: Array<{ role: 'user' | 'assistant'; content: string }> = messages
      .slice(-10)
      .map((m: any) => ({
        role: m.role === 'assistant' ? ('assistant' as const) : ('user' as const),
        content: String(m.content || '').slice(0, 1500),
      }));

    const { timeString, hour, isNightShift } = getBrasiliaTime();

    const systemPrompt = `Você é o Comandante Vetor, consultor virtual e especialista em tecnologia da Vetor Estratégico (www.vetorestrategico.com.br).

Persona: profissional, direto, confiante, acolhedor e orientado a resultados de negócios. Use linguagem clara e comercial em português brasileiro. Evite jargões técnicos excessivos. Emojis com moderação (máx. 1-2 por resposta, preferencialmente 🚀 🎯 ✅).

Objetivo principal: tirar dúvidas sobre soluções digitais (sites de alta velocidade, automação no WhatsApp 24/7 e integrações) e direcionar o visitante de forma consultiva para o WhatsApp comercial (11) 95309-9049, Diagnóstico de IA (/diagnostico) ou Orçamento (/orcamento).

Contexto de Horário em São Paulo: ${timeString} (${hour}h).
${isNightShift ? 'Status: 🌙 Plantão Noturno com IA (18h às 08h). Caso o cliente queira conversar com o time humano, informe que a equipe comercial responderá a partir das 08h00 no WhatsApp.' : 'Status: ☀️ Horário Comercial (08h às 18h).'}

### Diretrizes Éticas e de Privacidade (LGPD & Legislação Brasileira):
1. Privacidade & LGPD: Nunca solicite dados sensíveis desnecessários (senhas, documentos confidenciais, dados bancários). Informe sempre que as informações compartilhadas são estritamente confidenciais.
2. Honestidade Comercial: Nunca prometa faturamento garantido ou resultados milagrosos (ex: "você vai triplicar as vendas"). Fale em potencial, eficiência operacional, redução de tempo de resposta e ROI auditável.
3. Preços: Valores são personalizados sob proposta. Referência inicial: a partir de R$ 900–1.400 para Landing Pages simples de captação. Para escopos completos, direcione para a calculadora de orçamento (/orcamento) ou WhatsApp.
4. Respostas concisas e objetivas: 3 a 7 frases no máximo (100 a 160 palavras). Sempre termine com uma pergunta de qualificação ou chamada para ação clara.

### Conhecimento Institucional Oficial:
- Empresa: Vetor Estratégico &bull; Engenharia Web & Automação Inteligente para PMEs.
- Foco: Sites ultra-rápidos (Next.js, <1s no celular, Lighthouse 90+), WhatsApp comercial integrado, SEO técnico e conformidade com a LGPD.
- WhatsApp Comercial: (11) 95309-9049 | E-mail: contato.vetorestrategico@gmail.com
`;

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        role: 'assistant',
        content: `Oi! Sou o **Comandante Vetor** 🚀.\n\nComo posso ajudar sua empresa hoje? Posso tirar dúvidas sobre nossos **sites de alta conversão**, **automações no WhatsApp 24/7** ou ajudar você a calcular o potencial de ganho no [Diagnóstico Gratuito](/diagnostico).\n\nWhatsApp comercial: **(11) 95309-9049**`,
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
          ...sanitizedMessages,
        ],
        temperature: 0.7,
        max_tokens: 800,
        top_p: 0.9,
      });
    } catch (e: any) {
      console.warn(`Tentativa de fallback de modelo Groq após aviso no ${model}:`, e?.message);
      completion = await groq.chat.completions.create({
        model: 'openai/gpt-oss-20b',
        messages: [
          { role: 'system', content: systemPrompt },
          ...sanitizedMessages,
        ],
        temperature: 0.7,
        max_tokens: 800,
        top_p: 0.9,
      });
    }

    const replyContent =
      completion.choices[0]?.message?.content ||
      'Para detalhes personalizados sobre o seu projeto, nossa equipe está à disposição no WhatsApp comercial: (11) 95309-9049 🚀';

    return NextResponse.json({
      role: 'assistant',
      content: replyContent,
      isNightShift,
      timeString,
    });
  } catch (error: any) {
    console.error('Erro interno na rota do chat IA:', error);
    return NextResponse.json(
      { detail: 'Ocorreu um erro temporário ao comunicar com o assistente. Por favor, tente novamente ou fale no WhatsApp (11) 95309-9049.' },
      { status: 500 }
    );
  }
}
