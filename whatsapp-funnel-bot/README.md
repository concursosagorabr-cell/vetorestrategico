# 📱 WhatsApp Funnel Bot

Sistema completo de automação de WhatsApp para disparo de mensagens em sequência (funil), com classificação automática de respostas via IA e geração de relatórios de positivos/negativos.

## ✨ O que faz

1. **Você fornece um JSON** com contatos e um script de mensagens
2. O sistema **dispara as mensagens automaticamente** via WhatsApp
3. **Aguarda as respostas** dos contatos
4. Usa **IA (Groq ou Ollama)** para classificar cada resposta como:
   - ✅ **Sim** (positivo) → próxima mensagem do script
   - ❌ **Não** (negativo) → mensagem de despedida + lista negativa
   - ❓ **Dúvida** → mensagem de esclarecimento
5. No final, gera **listas separadas** de positivos e negativos

## 🏗️ Arquitetura

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│  Seu JSON   │────▶│  FastAPI     │────▶│ Evolution   │
│  (campanha) │     │  (Python)    │     │  API        │
└─────────────┘     └──────────────┘     └──────┬──────┘
                                                │
                                          ┌─────▼─────┐
                                          │  WhatsApp │
                                          │  Business │
                                          └─────┬─────┘
                                                │
                                          ┌─────▼─────┐
                                          │ Respostas │
                                          └─────┬─────┘
                                                │
┌─────────────┐     ┌──────────────┐     ┌──────▼──────┐
│  Relatório  │◀────│  Dashboard   │◀────│  Webhook    │
│  (JSON)     │     │  (HTML/JS)   │     │  (resposta) │
└─────────────┘     └──────────────┘     └─────────────┘
```

## 🚀 Instalação Rápida

### 1. Clone e configure

```bash
cd whatsapp-funnel-bot
cp .env.example .env
# Edite o .env com suas credenciais
```

### 2. Configure o LLM

**Opção A - Groq (recomendado, rápido):**
- Crie conta em [groq.com](https://groq.com)
- Pegue sua API key gratuita
- No `.env`: `LLM_PROVIDER=groq`, `LLM_API_KEY=sua_chave`

**Opção B - Ollama (local, gratuito):**
```bash
docker run -d -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama
ollama pull llama3.1:8b
```
- No `.env`: `LLM_PROVIDER=ollama`, `LLM_MODEL=llama3.1:8b`

### 3. Suba tudo com Docker

```bash
docker-compose up --build
```

### 4. Conecte o WhatsApp

1. Acesse `http://localhost:8008`
2. Faça login (usuário/senha do `.env`)
3. Vá na aba "Status WhatsApp"
4. Escaneie o QR Code com seu WhatsApp Business

### 5. Crie e inicie uma campanha

1. Na aba "Nova Campanha", clique em "Carregar Exemplo"
2. Edite os contatos (use números reais no formato `5511999999999`)
3. Clique em "Criar Campanha"
4. Na lista de campanhas, clique em "Iniciar"

## 📁 Estrutura do JSON de Campanha (Sites de Alta Performance)

O bot está adaptado para o script de vendas de **Sites de Alta Performance** com inversão de risco e tratamento inteligente de objeções:

```json
{
  "campaign_name": "Prospecção - Sites de Alta Performance (Ferraz de Vasconcelos)",
  "contacts": [
    {
      "name": "Dr. Carlos - Odonto",
      "phone": "5511999990001",
      "service": "Implantes Dentários",
      "city": "Ferraz de Vasconcelos"
    },
    {
      "name": "Marcos Auto Center",
      "phone": "5511999990002",
      "service": "Mecânica e Câmbio Automático",
      "city": "Ferraz de Vasconcelos"
    }
  ],
  "script": [
    {
      "step": 1,
      "name": "Passo 1: Topo de Funil (A Isca)",
      "message": "Oi, bom dia! Sou aqui de {city}. Vocês ainda trabalham com {service}?",
      "wait_for_reply": true,
      "timeout_hours": 24,
      "on_yes": {"next_step": 2},
      "on_no": {"next_step": "end_negative", "message": "Entendido! Muito obrigado pela atenção. Tenha um ótimo dia!"},
      "on_doubt": {"next_step": 1, "message": "Oi! Sou morador aqui de {city} e estava pesquisando empresas de {service}..."}
    },
    {
      "step": 2,
      "name": "Passo 2: Meio de Funil (Pitch 24h & Inversão de Risco)",
      "message": "Maravilha. O motivo da pergunta é que notei que vocês estão sem site no Google... Topo desenhar a página de graça em 24h. Se gostar: R$ 97/mês de manutenção. Risco zero. Posso começar o esboço amanhã?",
      "wait_for_reply": true,
      "timeout_hours": 24,
      "on_yes": {"next_step": "end_positive", "message": "Perfeito, {name}! Já dei início ao protótipo e em até 24h te envio o link!"},
      "on_no": {"next_step": "end_negative", "message": "Sem problemas, {name}! Agradeço muito pelo seu tempo. Abraços!"},
      "on_objection_social_media": {"next_step": 3, "message": "O Instagram é vitrine, mas quem pesquisa {service} em {city} no Google tem urgência... Posso montar o esboço?"},
      "on_objection_budget": {"next_step": 4, "message": "Exatamente por isso assumo 100% do risco. Crio o design sem cobrar nada... Posso começar hoje?"},
      "on_objection_has_website": {"next_step": 5, "message": "Seu site pode estar lento no 3G/4G. Testamos no PageSpeed do Google. Se o meu não for mais rápido, não fechamos. Topa?"}
    },
    {
      "step": 3,
      "name": "Tratativa Objeção 1: Redes Sociais",
      "wait_for_reply": true,
      "on_yes": {"next_step": "end_positive", "message": "Maravilha, {name}! Vou estruturar a página e te envio em 24h."},
      "on_no": {"next_step": "end_negative", "message": "Compreendo perfeitamente, {name}! Sucesso nas vendas!"}
    },
    {
      "step": 4,
      "name": "Tratativa Objeção 2: Orçamento",
      "wait_for_reply": true,
      "on_yes": {"next_step": "end_positive", "message": "Excelente, {name}! Já vou colocar a mão na massa no seu esboço gratuito."},
      "on_no": {"next_step": "end_negative", "message": "Tudo bem, {name}! Sucesso com o negócio!"}
    },
    {
      "step": 5,
      "name": "Tratativa Objeção 3: Já Possui Site",
      "wait_for_reply": true,
      "on_yes": {"next_step": "end_positive", "message": "Fechado, {name}! Vou criar a versão ultra-rápida e em 24h te envio com o teste do Google."},
      "on_no": {"next_step": "end_negative", "message": "Combinado, {name}! Muito obrigado e parabéns pelo site atual."}
    }
  ],
  "settings": {
    "delay_between_contacts_seconds": 30,
    "default_city": "Ferraz de Vasconcelos",
    "default_service": "Serviços Especializados",
    "llm_provider": "groq",
    "llm_model": "llama3-70b-8192"
  }
}
```

### Variáveis dinâmicas suportadas:
- `{name}` - Nome do contato / empresa
- `{phone}` - Telefone do contato
- `{city}` - Cidade da empresa (padrão: "Ferraz de Vasconcelos" ou do contato)
- `{service}` - Serviço/produto da empresa (ex: "Implantes Dentários", "Mecânica Automotiva")
- Qualquer atributo personalizado informado no contato!

### Classificações de IA suportadas pelo LLM:
- `yes` → Lead demonstrou interesse / aceitou avançar
- `no` → Lead recusou / não tem interesse
- `objection_social_media` → Objeção: "Já uso Instagram / WhatsApp"
- `objection_budget` → Objeção: "Estou sem orçamento / Sem dinheiro"
- `objection_has_website` → Objeção: "Já tenho site próprio"
- `doubt` → Dúvidas sobre o funcionamento / quem é você
- `other` → Mensagens não conclusivas

## 📊 Dashboard

Acesse `http://localhost:8008` para:
- Criar e gerenciar campanhas
- Acompanhar status em tempo real
- Ver relatórios de conversão
- Exportar listas de positivos/negativos em JSON

## 🔌 API Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/campaigns` | Cria campanha |
| POST | `/api/campaigns/{id}/start` | Inicia disparo |
| GET | `/api/campaigns` | Lista campanhas |
| GET | `/api/campaigns/{id}/report` | Relatório |
| POST | `/api/campaigns/{id}/export` | Exporta JSON |
| GET | `/api/status` | Status WhatsApp |
| GET | `/api/qrcode` | QR Code para conectar |
| POST | `/webhook/evolution` | Webhook de mensagens |

## ⚠️ Avisos Importantes

1. **Use um número dedicado.** Nunca seu WhatsApp pessoal. O Evolution API usa o protocolo não-oficial do WhatsApp Web (Baileys).
2. **Respeite os delays.** O padrão é 30s entre contatos. Não reduza drasticamente.
3. **Risco de banimento.** A Meta pode restringir números que enviam muitas mensagens automatizadas. Use com moderação.
4. **Não é spam.** Só envie para quem tem relacionamento prévio com você (clientes, leads qualificados).

## 💰 Custo

| Item | Custo |
|------|-------|
| Evolution API (self-hosted) | $0 |
| VPS (Hetzner/DigitalOcean) | ~$6-12/mês |
| Groq API (classificação) | $0 (você já tem tokens) |
| Ollama (local) | $0 |
| **Total** | **~$6-12/mês** |

## 🛠️ Stack Tecnológica

- **Evolution API** — conexão com WhatsApp via Baileys
- **FastAPI** — backend e API REST
- **PostgreSQL** — banco de dados
- **Redis** — cache e filas
- **Groq/Ollama** — classificação de respostas com LLM
- **HTML/CSS/JS** — dashboard simples

## 📄 Licença

Projeto open-source. O Evolution API é Apache 2.0. Use por sua conta e risco.

---

Feito para quem precisa de automação de WhatsApp sem pagar $$$ por plataformas proprietárias.
