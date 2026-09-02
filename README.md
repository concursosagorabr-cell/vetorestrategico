# Vetor Estratégico &bull; IA & Negócios para PMEs

Plataforma Web Institucional e Comercial de Alta Conversão da **Vetor Estratégico**, consultoria especializada em implementação de Inteligência Artificial na prática para Pequenas e Médias Empresas (automação de atendimento no WhatsApp, qualificação de leads comerciais, automação de processos de back-office/RPA, dashboards preditivos e capacitação de equipes).

Inspirada no modelo de conversão, hierarquia visual e clareza comercial da referência [upsites.digital](https://upsites.digital/), mas construída com **identidade visual própria e exclusiva** (Dark Navy, Verde Esmeralda, Azul Ciano e Dourado Refinado), arquitetura técnica moderna em **Next.js 14+ (App Router)** e API de alta performance em **Python FastAPI**.

---

## 🚀 Stack Técnica

### **Frontend**
- **Framework:** Next.js 14+ (App Router) com TypeScript
- **Estilização:** Tailwind CSS (tema dark tecnológico com acentos personalizados)
- **Microanimações:** Framer Motion (scroll reveal, modais fluidos, drawer mobile)
- **Formulários:** React Hook Form + validação por schemas Zod
- **Ícones:** Lucide React
- **SEO Técnico:** Metadata API dinâmica, OpenGraph, Twitter Cards, `sitemap.xml`, `robots.txt` e Schema JSON-LD (`Organization`, `FAQPage`, `BreadcrumbList`, `BlogPosting`)
- **Comemoração de Conquista:** Canvas Confetti no cálculo do diagnóstico de IA

### **Backend**
- **Framework:** Python 3.11+ com FastAPI e Uvicorn
- **Validação de Dados:** Pydantic v2 (tipagem estrita em todas as rotas)
- **Banco de Dados:** SQLAlchemy 2.0 ORM (compatível com SQLite local e PostgreSQL em produção)
- **Proteção contra Spam / Abuso:** SlowAPI Rate Limiter
- **Serviço de Notificação:** Envio assíncrono de e-mails em HTML via SMTP com fallback de logs no console
- **Testes Automatizados:** Suíte de testes com `pytest` e `pytest-asyncio`
- **Documentação da API:** Swagger UI interativo em `/docs` e ReDoc em `/redoc`

---

## 📁 Estrutura do Projeto

```text
vetorestrategico/
├── frontend/                     # Aplicação Next.js 14 (App Router)
│   ├── src/
│   │   ├── app/                  # Rotas do App Router
│   │   │   ├── page.tsx          # Home completa (17 seções de conversão)
│   │   │   ├── servicos/page.tsx # Página de Serviços com deep dive nos 5 pilares
│   │   │   ├── cases/page.tsx    # Cases com métricas, desafios e depoimentos
│   │   │   ├── planos/page.tsx   # Tabela comparativa e planos de contratação
│   │   │   ├── sobre/page.tsx    # Sobre nós, manifesto e pilares
│   │   │   ├── blog/             # Blog com busca e newsletter
│   │   │   │   └── [slug]/       # Artigo individual com schema JSON-LD
│   │   │   ├── diagnostico/      # Quiz interativo multi-step de oportunidade de IA
│   │   │   ├── contato/          # Formulário de orçamento e canais diretos
│   │   │   ├── politica-de-privacidade/ # Conformidade total com a LGPD
│   │   │   ├── termos-de-uso/    # Termos de uso
│   │   │   ├── sitemap.ts        # Sitemap dinâmico
│   │   │   ├── robots.ts         # Robots.txt dinâmico
│   │   │   └── layout.tsx        # Layout raiz com fontes, header, footer e modals
│   │   ├── components/
│   │   │   ├── ui/               # Botões, Badges, Cards, Modais, Inputs, Accordions
│   │   │   ├── layout/           # Header, Footer, WhatsApp flutuante, Cookie Consent, Exit Modal
│   │   │   ├── sections/         # 17 seções atômicas de conversão da Home
│   │   │   └── forms/            # LeadForm, ContactForm, NewsletterForm, DiagnosticQuiz
│   │   ├── lib/                  # Constantes (empresa, cases, FAQs, planos), API client e SEO
│   │   ├── types/                # Interfaces TypeScript completas
│   │   └── styles/               # globals.css e tokens de design
│   ├── tailwind.config.ts
│   └── package.json
│
├── backend/                      # API REST em Python FastAPI
│   ├── app/
│   │   ├── api/routes/           # Rotas: /leads, /contact, /quiz, /newsletter, /health
│   │   ├── core/                 # Configurações Pydantic, Database e Rate Limiting
│   │   ├── models/               # Modelos SQLAlchemy (Lead, NewsletterSubscriber)
│   │   ├── schemas/              # Schemas de validação Pydantic v2
│   │   ├── services/             # Email Service e Quiz Scoring Engine
│   │   └── main.py               # Instância FastAPI, CORS e Middlewares
│   ├── tests/                    # Suíte de testes com pytest (100% passando)
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env.example
│
├── docker-compose.yml            # Orquestração completa de containers
└── README.md
```

---

## 🛠️ Como Executar Localmente

### 1. Pré-requisitos
- Node.js 18+ (recomendado 20+)
- Python 3.11+
- Git

---

### 2. Rodando o Backend (FastAPI)

Abra um terminal no diretório do projeto:

```bash
# 1. Acesse o diretório do backend
cd backend

# 2. Crie e ative um ambiente virtual (opcional, mas recomendado)
python -m venv venv
# No Windows:
venv\Scripts\activate
# No Linux/Mac:
source venv/bin/activate

# 3. Instale as dependências
pip install -r requirements.txt

# 4. Inicie o servidor FastAPI
uvicorn app.main:app --reload --port 8006
```

>> python -m venv venv
>> .\venv\Scripts\Activate.ps1
>> 
>> pip install -r requirements.txt
>> uvicorn app.main:app --reload --port 8006
>> python -m uvicorn app.main:app --reload --port 8006

- A API estará rodando em: `http://localhost:8006`
- Documentação interativa Swagger: `http://localhost:8006/docs`
- Health check: `http://localhost:8006/api/health`

#### Executando os Testes do Backend
```bash
python -m pytest backend/tests -v
```

---

### 3. Rodando o Frontend (Next.js)

Em outro terminal:

```bash
# 1. Acesse o diretório do frontend
cd frontend

# 2. Instale os pacotes npm
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

- O website estará disponível em: `http://localhost:3000`

---

### 4. Rodando via Docker Compose (Opcional)

Se preferir rodar todo o ambiente em containers:

```bash
docker-compose up --build
```

---

## 🤖 Agentes de Inteligência Artificial & Como Alterar seus Cérebros

A plataforma conta com um ecossistema de **Agentes de IA Especializados** que trabalham de forma coordenada para atendimento, qualificação de clientes e prospecção ativa. Abaixo está o guia completo de funcionamento e como customizar o cérebro, prompts e regras de cada um.

---

### 1. Comandante Vetor (Agente de Chat do Site & Qualificação Comercial)

#### 🧭 Como Funciona:
- Atua como o consultor virtual 24/7 no site oficial (`AiChatAssistant.tsx`), acolhendo o visitante com linguagem humana, direta e empática.
- **Detecção de Horário & Turno:** Identifica automaticamente o horário de Brasília. No período diurno (08h às 18h) atua como assistente em tempo real; no plantão noturno (18h às 08h) informa que a equipe humana responderá pela manhã.
- **Proteção e Injeção de Contexto:** Sanitiza mensagens do visitante e injeta o histórico recente da conversa.
- **Pilares Invioláveis:** Sempre comunica a garantia de **Risco Zero** (protótipo navegável apresentado antes de qualquer pagamento), **ausência de contratos de fidelidade ou multas**, **transparência radical com acesso direto aos painéis da Vercel/Google Analytics** e **tráfego orgânico comprovado**.
- **Regra Rígida de Preços:** Informa que os valores iniciam *a partir de R$ 900 para criação e a partir de R$ 147/mês para manutenção*, nunca fornecendo faixas fixas fechadas e direcionando para o simulador de orçamento ou WhatsApp.

#### 🧠 Onde fica o Cérebro e Instruções:
- **Arquivo Central do Cérebro:** [`frontend/src/app/api/chat/route.ts`](file:///c:/Users/head_/3D%20Objects/vetorestrategico/frontend/src/app/api/chat/route.ts)
- **Componente Visual & Pílulas Rápidas:** [`frontend/src/components/layout/AiChatAssistant.tsx`](file:///c:/Users/head_/3D%20Objects/vetorestrategico/frontend/src/components/layout/AiChatAssistant.tsx)
- **Variáveis de Ambiente:** `GROQ_API_KEY` e `GROQ_MODEL` no `.env.local` do frontend.

#### ✏️ Como Alterar as Instruções e o Comportamento:
1. Abra `frontend/src/app/api/chat/route.ts`.
2. Localize a constante `systemPrompt`:
   - Para alterar a **persona e tom de voz**: modifique as seções `Persona` e `Objetivo principal`.
   - Para alterar **valores, regras de negócio ou serviços**: ajuste as diretrizes sob `### Pilares Comerciais & Diferenciais Exclusivos` e `### Preços e Valores`.
   - Para alterar o **modelo de IA**: defina a variável `GROQ_MODEL` (ex: `llama-3.3-70b-versatile`, `llama-3.1-8b-instant`, `openai/gpt-oss-120b`).
   - Para calibrar a **criatividade/precisão**: altere os parâmetros `temperature` (recomendado `0.5` a `0.7`) e `max_tokens` na chamada `groq.chat.completions.create`.
3. Para alterar a mensagem inicial de boas-vindas ou os botões de atalho rápido (quick pills), edite as constantes `INITIAL_MESSAGE` e `QUICK_PILLS` em `frontend/src/components/layout/AiChatAssistant.tsx`.

---

### 2. WhatsApp Funnel Bot (Agente Autônomo de Prospecção & Qualificação via WhatsApp)

#### 🧭 Como Funciona:
- Executa prospecção ativa e atendimento automatizado no WhatsApp conectando o **FastAPI + Evolution API (Baileys)** a um motor de raciocínio LLM.
- Dispara sequências cadenciadas com delays de segurança anti-banimento (30 a 45s).
- **Classificador Semântico:** Analisa as respostas do interlocutor e identifica intenções com alta acurácia (`yes`, `no`, `doubt`, `objection_social_media`, `objection_budget`, `objection_has_website`, `away`, `opt_out`).
- **Limpeza de Nomes:** Sanitiza nomes corporativos do Google Maps para nomes humanos acolhedores (ex: *"Dra. Fabiana Oliveira - Harmonização Facial"* ➔ *"Dra. Fabiana"*).
- Trata objeções contextualmente conforme o script do funil e gera listas de leads qualificados.

#### 🧠 Onde fica o Cérebro e Instruções:
- **Prompt Mestre & Classificador:** [`whatsapp-funnel-bot/src/core/llm_classifier.py`](file:///c:/Users/head_/3D%20Objects/vetorestrategico/whatsapp-funnel-bot/src/core/llm_classifier.py)
- **Personas & Presets por Nicho:** [`whatsapp-funnel-bot/src/core/niche_presets.py`](file:///c:/Users/head_/3D%20Objects/vetorestrategico/whatsapp-funnel-bot/src/core/niche_presets.py)
- **Scripts de Funil & Mensagens:** [`whatsapp-funnel-bot/exemplodejson.md`](file:///c:/Users/head_/3D%20Objects/vetorestrategico/whatsapp-funnel-bot/exemplodejson.md) e [`ex-json-whatsapp-funnel-bot.md`](file:///c:/Users/head_/3D%20Objects/vetorestrategico/ex-json-whatsapp-funnel-bot.md)
- **Configurações de Conexão:** `whatsapp-funnel-bot/.env` (`LLM_PROVIDER`, `LLM_MODEL`, `LLM_API_KEY`).

#### ✏️ Como Alterar as Instruções e o Comportamento:
1. **Para alterar o raciocínio da IA ao classificar respostas:**
   - Edite o método `decide_step_action` em `whatsapp-funnel-bot/src/core/llm_classifier.py`.
   - Modifique o `system_prompt` para incluir novas regras de interpretação de mensagens ou novas categorias de objeções.
2. **Para alterar as personas de nichos (Odonto, Estética, Jurídico, etc.):**
   - Edite `whatsapp-funnel-bot/src/core/niche_presets.py` e configure os campos `niche_persona`, `tone` e `common_objections`.
3. **Para alterar o script de mensagens e fluxos de conversa:**
   - Edite o arquivo JSON da campanha na aba **Nova Campanha** do dashboard em `http://localhost:8008` (ou utilize o arquivo `exemplodejson.md` como base), alterando os textos de `{step}`, `on_yes`, `on_no`, `on_doubt` e `on_objection_*`.

---

### 3. Quiz & Motor de Diagnóstico Digital com IA (`/diagnostico`)

#### 🧭 Como Funciona:
- Avalia a maturidade digital de PMEs através de um formulário interativo em 5 etapas.
- Calcula a pontuação de oportunidade (0 a 100), estima o volume de horas operacionais recuperáveis por mês e gera um dossiê com o roadmap de soluções recomendadas.

#### 🧠 Onde fica o Cérebro e Instruções:
- **Lógica de Análise & Recomendações:** [`frontend/src/app/api/quiz/route.ts`](file:///c:/Users/head_/3D%20Objects/vetorestrategico/frontend/src/app/api/quiz/route.ts) e [`backend/app/services/quiz_engine.py`](file:///c:/Users/head_/3D%20Objects/vetorestrategico/backend/app/services/quiz_engine.py).
- **Perguntas e Pesos:** [`frontend/src/lib/constants.ts`](file:///c:/Users/head_/3D%20Objects/vetorestrategico/frontend/src/lib/constants.ts) (`DIAGNOSTIC_QUESTIONS`).

---

## 📋 Informações da Empresa Configuradas

- **Nome da Empresa:** Vetor Estratégico
- **Posicionamento:** IA & Negócios para PMEs
- **E-mail Comercial:** `contato.vetorestrategico@gmail.com`
- **WhatsApp / Telefone Comercial:** `(11) 95309-9049`
- **Região de Atuação:** Atendimento Online em todo o Brasil (Sede em São Paulo - SP)
- **Cores Principais:** Dark Slate `#080C14`, Verde Esmeralda `#10B981`, Azul Ciano `#06B6D4`, Dourado `#F59E0B`.

---

## 🚀 Deploy em Produção

### Frontend (Vercel)
1. Conecte o repositório no dashboard da [Vercel](https://vercel.com).
2. Configure a Root Directory como `frontend`.
3. Adicione as variáveis de ambiente:
   - `NEXT_PUBLIC_API_URL`: URL da sua API em produção (ex: `https://api.vetorestrategico.com.br`)
   - `NEXT_PUBLIC_SITE_URL`: `https://vetorestrategico.com.br`

### Backend (Render, Railway, Fly.io, AWS ou VPS com Docker)
1. Utilize o `Dockerfile` presente em `backend/Dockerfile`.
2. Configure as variáveis de ambiente:
   - `ENVIRONMENT=production`
   - `DATABASE_URL`: URL do PostgreSQL (ex: `postgresql://user:pass@host:5432/vetordb`)
   - `CORS_ORIGINS`: `["https://vetorestrategico.com.br"]`
   - `SMTP_HOST`, `SMTP_USER`, `SMTP_PASSWORD` para envio de notificações por e-mail.

---

## 📄 Licença
Propriedade exclusiva de Vetor Estratégico. Todos os direitos reservados.
