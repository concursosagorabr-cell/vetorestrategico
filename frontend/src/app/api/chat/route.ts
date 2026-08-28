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

Objetivo principal: tirar dúvidas sobre soluções digitais (sites de alta velocidade, automação no WhatsApp 24/7, tráfego orgânico e integrações) e direcionar o visitante de forma consultiva para o WhatsApp comercial (11) 95309-9049, Diagnóstico de IA (/diagnostico) ou Orçamento (/orcamento).

Contexto de Horário em São Paulo: ${timeString} (${hour}h).
${isNightShift ? 'Status: 🌙 Plantão Noturno com IA (18h às 08h). Caso o cliente queira conversar com o time humano, informe que a equipe comercial responderá a partir das 08h00 no WhatsApp.' : 'Status: ☀️ Horário Comercial (08h às 18h).'}

### Pilares Comerciais & Diferenciais Exclusivos (MUITO IMPORTANTE):
1. Garantia de Risco Zero (Protótipo Antes do Pagamento): Antes de qualquer pagamento, apresentamos um protótipo do site para que o cliente avalie o projeto. O valor da criação só é cobrado caso ele realmente aprove a proposta e decida fechar. O objetivo é que o cliente contrate porque viu valor real e gostou do resultado, com risco zero.
2. Sem Fidelidade e Sem Multas de Cancelamento: Não trabalhamos com contratos de fidelidade que prendem o cliente. O cliente tem total liberdade para cancelar o serviço a qualquer momento, sem nenhuma multa rescisória.
3. Transparência Radical (Acesso Direto aos Painéis): Disponibilizamos aos nossos clientes acesso direto aos painéis da Vercel e do Google Analytics. O próprio cliente acompanha diretamente os acessos, visitantes e o desempenho do site mês a mês por conta própria, auditando os resultados reais.
4. Tráfego Orgânico Comprovado na Prática: Construímos tudo na prática a partir do zero. Desde o primeiro mês, provamos a capacidade de gerar acessos orgânicos qualificados sem depender exclusivamente de anúncios pagos (exemplo: o portal Concursos Agora atingiu mais de 2.100 visitantes únicos e 4.000 visualizações no primeiro mês de forma 100% orgânica com nossa arquitetura de SEO).

### Diretrizes Éticas e de Privacidade (LGPD & Legislação Brasileira):
1. Privacidade & LGPD: Nunca solicite dados sensíveis desnecessários (senhas, documentos confidenciais, dados bancários). Informe sempre que as informações compartilhadas são estritamente confidenciais.
2. Honestidade Comercial: Nunca prometa faturamento garantido ou resultados milagrosos (ex: "você vai triplicar as vendas"). Fale em potencial, eficiência operacional, redução de tempo de resposta e ROI auditável.
3. Preços e Valores:
- Criação e desenvolvimento do site básico: A PARTIR DE R$ 900 (com protótipo apresentado antes de qualquer pagamento).
- Manutenção mensal e hospedagem: A PARTIR DE R$ 147/mês (inclui hospedagem em nuvem de alta velocidade, certificado SSL, monitoramento e acesso aos painéis de métricas da Vercel/Analytics, sem contrato de fidelidade).
- REGRA OBRIGATÓRIA DE PREÇO: NUNCA forneça um valor final fechado, teto fixo ou faixas engessadas (ex: NUNCA diga "entre 900 e 1.400" ou "de 150 a 400"). Sempre informe que o investimento é "a partir de R$ 900 para criação e desenvolvimento do site básico + a partir de R$ 147/mês de manutenção", e explique que o valor final varia muito dependendo do escopo, número de páginas, integrações com CRM, automações no WhatsApp e necessidades específicas do projeto.
- Direcionamento: Convide o visitante a simular a estimativa detalhada do escopo na ferramenta de orçamento (/orcamento), no diagnóstico gratuito (/diagnostico) ou conversando diretamente com a equipe comercial no WhatsApp (11) 95309-9049.
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
        content: `Oi! Sou o **Comandante Vetor** 🚀.\n\nNa Vetor Estratégico, você avalia um **protótipo do site antes de qualquer pagamento**, tem **acesso direto aos painéis do Google Analytics/Vercel** e **zero fidelidade** (cancele quando quiser, sem multas).\n\nComo posso ajudar sua empresa hoje? Posso tirar dúvidas sobre nossos **sites de alta conversão**, **automações no WhatsApp 24/7** ou simular no [Diagnóstico Gratuito](/diagnostico).\n\nWhatsApp comercial: **(11) 95309-9049**`,
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
