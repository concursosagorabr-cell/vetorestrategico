import { NextRequest, NextResponse } from 'next/server';
import { Groq } from 'groq-sdk';

function getBrasiliaTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString('pt-BR', { timeZone: 'America/Sao_Paulo' });
  const hour = parseInt(timeString.split(':')[0], 10);
  const isNightShift = hour >= 18 || hour < 8;
  return { timeString, hour, isNightShift };
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

    const systemPrompt = `Você é o Comandante Vetor, o Consultor Especialista de Inteligência Artificial e Negócios para PMEs da Vetor Estratégico (vetorestrategico.com.br).

INFORMAÇÕES DA EMPRESA:
- Nome: Vetor Estratégico • Criação de Sites de Alta Performance & Soluções de IA para PMEs.
- WhatsApp Comercial: (11) 91907-2390
- E-mail: contato.vetorestrategico@gmail.com
- Localização: Atendimento Online em todo o Brasil (Sede em São Paulo - SP).

PRINCIPAIS SOLUÇÕES:
1. Criação de Sites Ultrarrápidos & Landing Pages de Alta Conversão (Next.js, foco total em mobile e conversão para WhatsApp).
2. Agentes de Atendimento & Triagem Inteligente no WhatsApp 24/7 (não perde vendas à noite ou fins de semana).
3. Esteira de Qualificação Automática e Nutrição de Leads com IA.
4. Automação de Processos de Back-Office & RPA com IA (elimina tarefas manuais e repetitivas).
5. Dashboards Preditivos & BI Inteligente.

CONTEXTO DE HORÁRIO ATUAL:
- Horário atual em São Paulo: ${timeString} (${hour}h).
- Status: ${isNightShift ? 'PLANTÃO NOTURNO COM IA ATIVO (18h às 08h)' : 'HORÁRIO COMERCIAL (08h às 18h)'}.
${isNightShift ? '- Como é fora do horário comercial humano (18h às 08h), informe gentilmente que a equipe humana entrará em contato logo no início da manhã, mas você (IA) está 100% disponível agora para tirar dúvidas, explicar serviços e coletar o contato.' : '- Em horário comercial, o cliente pode falar direto no WhatsApp com a equipe.'}

DIRETRIZES DE RESPOSTA:
- Seja extremamente prestativo, claro, empático e focado no crescimento do negócio do cliente.
- Responda em português brasileiro fluente, de forma concisa e dinâmica (use tópicos e negrito quando útil).
- Se o cliente tiver interesse em saber qual solução é ideal para a empresa dele, recomende fortemente que ele faça o Diagnóstico de Oportunidade com IA gratuito no nosso site na página /diagnostico.
- Se o cliente fornecer nome, e-mail ou WhatsApp, agradeça e confirme que a equipe dará prioridade ao atendimento dele.
`;

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        role: 'assistant',
        content: `Olá! Sou o **Comandante Vetor**, consultor de IA da Vetor Estratégico. 🚀\n\nAtualmente estamos no **${isNightShift ? 'Plantão Noturno com IA (18h às 08h)' : 'Atendimento Online'}**.\n\nPodemos ajudar sua empresa com:\n- 🌐 **Criação de Sites Ultrarrápidos** de Alta Conversão\n- 🤖 **Agentes de Atendimento no WhatsApp 24/7**\n- ⚡ **Automação de Processos com IA**\n\n👉 [Clique aqui para fazer o Diagnóstico de IA Gratuito](/diagnostico) ou fale direto pelo nosso WhatsApp: **(11) 91907-2390**!`,
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

    const replyContent = completion.choices[0]?.message?.content || 'Desculpe, não consegui processar a resposta no momento. Pode nos chamar no WhatsApp (11) 91907-2390!';

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
