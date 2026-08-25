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

## 🎯 Funcionalidade Especial: Quiz de Diagnóstico de IA (`/diagnostico`)

O quiz interativo é um motor de geração de leads altamente qualificados:
1. **Etapa 1:** Segmento de atuação da empresa.
2. **Etapa 2:** Porte da equipe.
3. **Etapa 3:** Principal gargalo operacional ou comercial.
4. **Etapa 4:** Grau de maturidade digital atual.
5. **Etapa 5:** Informações de contato e consentimento LGPD.

O backend (`POST /api/quiz`) calcula uma pontuação de oportunidade (0 a 100), estima o volume de horas operacionais recuperáveis por mês e gera um dossiê estratégico com entregáveis recomendados, persistindo o lead automaticamente no banco de dados e notificando o time comercial.

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
