# 📱 WhatsApp Funnel Bot &bull; Agente Autônomo de Prospecção e Qualificação

Sistema completo de automação de WhatsApp para disparo de mensagens em sequência (funil), com **classificador de respostas em tempo real via IA (LLMs)**, tratamento contextual de objeções, limpeza de nomes humanos e geração de relatórios de positivos/negativos.

### 🌟 Principais Recursos
- **Cérebro Duplo (LLM + Heurística)**: Toma decisões baseadas em IA (Groq/OpenAI/Ollama) e possui rede de segurança offline (Heurística) que impede travamentos em caso de falhas da IA ou formato inválido.
- **Painel em Tempo Real (Dashboard)**: Métricas como Taxa de Conversão, Leads Qualificados e Respostas ao Vivo atualizadas automaticamente em background sem necessidade de recarregar a tela (Live Polling).
- **Sistema Integrado de Alertas (Toasts)**: Avisos visuais automáticos informando se a internet caiu, se a Cota da IA foi atingida (Rate Limit), ou falhas no Webhook, mantendo o sistema 100% à prova de falhas.
- **Motor Evolution API + Retries**: Disparo nativo ultra-rápido com fila inteligente e retentativas automáticas contra quedas de sinal.

---

## 🧠 Como Funciona o Cérebro do Agente de IA

O agente não é um chatbot comum baseado em regras rígidas de "se/senão". Ele combina um **Motor de Execução de Funil (Funnel Engine)** com um **Cérebro de Inteligência Artificial (LLM Classifier)** alimentado por modelos como LLaMA 3.3 / GPT via Groq ou Ollama local.

```
                  ┌────────────────────────────────────────────────────────┐
                  │              FLUXO COGNITIVO DO AGENTE                 │
                  └────────────────────────────────────────────────────────┘
                                              │
                      Lead responde mensagem no WhatsApp
                                              │
                                              ▼
                    ┌───────────────────────────────────┐
                    │ 1. Pré-processamento & Sanitização│
                    │ - Detecta auto-respostas/ausência │
                    │ - Limpa nome humano do lead       │
                    │ - Extrai histórico da conversa    │
                    └─────────────────┬─────────────────┘
                                      │
                                      ▼
                    ┌───────────────────────────────────┐
                    │ 2. Cérebro LLM (Classificador)    │
                    │ - Aplica o System Prompt          │
                    │ - Injeta Persona e Nicho do Lead  │
                    │ - Analisa semântica e intenção    │
                    └─────────────────┬─────────────────┘
                                      │
                                      ▼
                    ┌───────────────────────────────────┐
                    │ 3. Decisão & Próximo Passo (JSON) │
                    │ - Classificação (yes, no, dúvida, │
                    │   objeção de preço, redes, etc.)  │
                    │ - Resposta humana sugerida        │
                    │ - Confiança (0.0 a 1.0)           │
                    └─────────────────┬─────────────────┘
                                      │
                                      ▼
                    ┌───────────────────────────────────┐
                    │ 4. Ação do Funil                  │
                    │ - Avança para próximo passo       │
                    │ - Responde dúvida ou objeção      │
                    │ - Finaliza positivo ou negativo   │
                    └───────────────────────────────────┘
```

---

## 🛠️ Onde Fica o Cérebro e Como Alterar as Instruções

O comportamento e a inteligência do agente estão distribuídos em 3 níveis modulares. Você pode alterar desde o prompt central até as instruções específicas de cada nicho ou campanha:

### 1. Cérebro Central & Prompt Mestre da IA
- **Arquivo:** `src/core/llm_classifier.py`
- **O que faz:** Contém a função `decide_step_action()` e o `system_prompt` mestre que orienta a IA sobre como interpretar mensagens, tom de voz, regras de nomes humanos e critérios de classificação.
- **Como alterar:**
  1. Abra `src/core/llm_classifier.py`.
  2. Localize a variável `system_prompt` dentro do método `decide_step_action`.
  3. Modifique as diretrizes de papel, tom de voz, regras de classificação ou adicione novas categorias de respostas.
  4. Ajuste parâmetros de inferência como `temperature` (recomendado `0.2` a `0.4` para máxima precisão classificatória) e `max_tokens`.

### 2. Presets de Nichos e Personas Especializadas
- **Arquivo:** `src/core/niche_presets.py`
- **O que faz:** Define a linguagem, dores e personas para cada segmento de mercado (ex: Clínicas de Estética, Odontologia, E-commerce, Advocacia, Contabilidade).
- **Como alterar:**
  1. Abra `src/core/niche_presets.py`.
  2. Adicione ou edite o dicionário do nicho desejado. Exemplo:
     ```python
     "estetica": {
         "niche_persona": "Você é especialista em captação para clínicas de estética e harmonização.",
         "specialty": "Procedimentos Estéticos & Harmonização",
         "tone": "empático, refinado, direto e comercial",
         "common_objections": ["já uso instagram", "sem orçamento no momento"]
     }
     ```

### 3. Scripts de Campanha, Mensagens e Árvore de Decisão
- **Arquivos:** `exemplodejson.md` e `ex-json-whatsapp-funnel-bot.md` (ou via Dashboard web).
- **O que faz:** Define as mensagens exatas enviadas, tempo de espera, timeouts e o que fazer para cada classificação (`on_yes`, `on_no`, `on_doubt`, `on_objection_*`).
- **Como alterar:**
  - Altere a mensagem de cada passo usando variáveis dinâmicas: `{name}`, `{service}`, `{city}`.
  - Configure ramificações personalizadas para cada tipo de objeção.

---

## ⚙️ Como Alterar o Provedor e o Modelo da LLM

Você pode alternar facilmente entre nuvem ultrarrápida (Groq) e modelos locais rodando no Docker (Ollama) alterando as variáveis no arquivo `.env`:

### Opção A: Groq Cloud (Recomendado — Respostas em < 500ms)
No arquivo `.env`:
```env
LLM_PROVIDER=groq
LLM_MODEL=llama-3.3-70b-versatile
LLM_API_KEY=gsk_sua_chave_groq_aqui
```
*Modelos recomendados na Groq:*
- `llama-3.3-70b-versatile` — Máxima precisão e raciocínio contextual.
- `llama-3.1-8b-instant` — Velocidade extrema e menor consumo de tokens.
- `mixtral-8x7b-32768` — Excelente para textos longos e respostas densas.

### Opção B: Ollama (100% Local e Gratuito)
No arquivo `.env`:
```env
LLM_PROVIDER=ollama
LLM_MODEL=llama3.1:8b
LLM_API_URL=http://localhost:11434
```

---

## 🎯 Categorias de Classificação do Cérebro da IA

O cérebro do agente classifica cada resposta recebida em uma das seguintes categorias estruturadas:

| Classificação | Significado | Ação Típica do Funil |
|---|---|---|
| `yes` | Aceite / Interesse explícito ou mensagem automática de catálogo | Avança para o próximo passo ou fecha positivo |
| `no` | Recusa educada ou desinteresse definitivo | Envia despedida cordial e encerra no negativo |
| `doubt` | Dúvida sobre o que é, quem está falando ou como funciona | Envia esclarecimento contextual e reforça o valor |
| `objection_social_media` | Objeção: *"Já tenho Instagram/WhatsApp, não preciso de site"* | Argumenta sobre a urgência do Google vs vitrine do Instagram |
| `objection_budget` | Objeção: *"Estou sem dinheiro / sem orçamento agora"* | Reforça a garantia de **Risco Zero** (protótipo grátis sem custo prévio) |
| `objection_has_website` | Objeção: *"Já tenho site próprio"* | Propõe teste de velocidade no PageSpeed do Google |
| `away` | Mensagem de ausência / fora do expediente | Não queima o funil; aguarda o retorno humano |
| `opt_out` | Pedido de remoção / *"Não me mande mais mensagens"* | Remove o contato imediatamente da lista |

---

## 🏗️ Arquitetura do Sistema

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

---

## 🚀 Instalação e Inicialização Passo a Passo

### Pré-requisitos
Antes de começar, certifique-se de ter os seguintes programas instalados na sua máquina (Windows, Mac ou Linux):
1. **Docker Desktop**: Essencial para rodar os bancos de dados (PostgreSQL, Redis) e a Evolution API. [Baixar Docker](https://www.docker.com/products/docker-desktop/)
2. **Git**: Para clonar o repositório.
3. *(Opcional)* **Python 3.10+**: Caso queira rodar os testes localmente ou desenvolver sem Docker.

### 1. Preparar o Ambiente
Abra o seu terminal (PowerShell, CMD ou Terminal) e execute:
```bash
# Entre na pasta do projeto
cd whatsapp-funnel-bot

# Copie o arquivo de variáveis de ambiente
cp .env.example .env
```
Abra o arquivo `.env` com um editor de texto (como Bloco de Notas ou VS Code) e coloque a sua **LLM_API_KEY** (da Groq ou OpenAI). O login e senha do painel também estão definidos lá (padrão: `vetor` / `vetor`).

### 2. Rodar o Sistema Completo (Docker) - Recomendado
Com o Docker Desktop aberto e rodando no seu computador, execute no terminal da pasta do projeto:

```powershell
docker-compose up --build -d
```
*O comando `-d` faz o sistema rodar em segundo plano (background).*

Este comando irá baixar e iniciar **5 serviços** automaticamente:
1. `evolution-db` (Banco PostgreSQL da Evolution)
2. `evolution-redis` (Cache da Evolution)
3. `evolution-api` (Motor de conexão oficial com o WhatsApp)
4. `db` (Banco PostgreSQL do Funil e CRM)
5. `app` (Nosso robô Python, Painel Web e Lógica de IA)

### 3. Acessar o Painel e Conectar o WhatsApp
1. Abra seu navegador e acesse o Dashboard: **[http://localhost:8008](http://localhost:8008)**
2. Faça login com o usuário e senha (padrão: `vetor` / `vetor`).
3. Vá na aba **Status WhatsApp**.
4. Abra o WhatsApp no seu celular > Aparelhos Conectados > Conectar um Aparelho.
5. Escaneie o QR Code que aparecer na tela do sistema. Quando ficar verde, está pronto!

### 4. Parar ou Reiniciar o Sistema
Se quiser desligar o robô no fim do dia ou reiniciar após fazer alterações no código:
```powershell
# Para desligar tudo com segurança:
docker-compose down

# Para ver os logs em tempo real (se algo der erro):
docker-compose logs -f app
```

---

## 🛠️ Comandos para Desenvolvedores (Rodar Localmente)

Se você é desenvolvedor e deseja rodar a aplicação Python fora do Docker (para ter live-reload e rodar testes unitários), siga estes passos:

1. **Suba apenas os bancos e a Evolution API via Docker:**
```bash
docker-compose up -d evolution-db evolution-redis evolution-api db
```

2. **Crie um ambiente virtual Python e instale as dependências:**
```bash
python -m venv venv
.\venv\Scripts\activate  # No Windows
pip install -r requirements.txt
pip install pytest pytest-asyncio  # Para rodar os testes
```

3. **Rode o servidor FastAPI localmente:**
```bash
uvicorn src.main:app --host 0.0.0.0 --port 8008 --reload
```

4. **Rodar a Bateria de Testes Anti-Falhas:**
O sistema possui testes rigorosos contra "Alucinação da IA" e quedas de API. Para garantir que nada quebrou após suas modificações, execute:
```bash
python -m pytest tests/ -v
```

---

## 📁 Exemplo Completo de Script de Funil JSON (Vetor Estratégico)

```json
{
  "campaign_name": "Prospecção - Sites de Alta Performance (Risco Zero)",
  "contacts": [
    {
      "name": "Dr. Carlos - Odonto",
      "phone": "5511999990001",
      "service": "Implantes Dentários",
      "city": "São Paulo"
    }
  ],
  "script": [
    {
      "step": 1,
      "name": "Passo 1: Confirmação de Atividade",
      "message": "Oi, bom dia! Sou aqui de {city}. Vocês ainda atendem com {service}?",
      "wait_for_reply": true,
      "timeout_hours": 24,
      "on_yes": {"next_step": 2},
      "on_no": {"next_step": "end_negative", "message": "Entendido! Muito obrigado pela atenção. Tenha um ótimo dia!"},
      "on_doubt": {"next_step": 1, "message": "Oi! Estava pesquisando clínicas de {service} aqui na região..."}
    },
    {
      "step": 2,
      "name": "Passo 2: Pitch com Inversão de Risco & Protótipo Prévia",
      "message": "Maravilha, {name}! Notei que vocês não têm um site rápido posicionado no Google. Eu topo desenhar um protótipo navegável de graça para vocês avaliarem antes de qualquer pagamento. Risco zero. Se aprovarem, a manutenção é a partir de R$ 147/mês sem fidelidade. Posso começar o esboço?",
      "wait_for_reply": true,
      "timeout_hours": 24,
      "on_yes": {"next_step": "end_positive", "message": "Perfeito, {name}! Já dei início ao protótipo e te envio o link para avaliação!"},
      "on_no": {"next_step": "end_negative", "message": "Sem problemas, {name}! Agradeço muito pela atenção."},
      "on_objection_social_media": {"next_step": 3, "message": "O Instagram é ótimo para vitrine, mas quem pesquisa {service} no Google tem urgência de contratar... Posso montar o esboço sem custo?"},
      "on_objection_budget": {"next_step": 4, "message": "Exatamente por isso o risco é zero: crio o protótipo antes e você só paga se aprovar a proposta. Topa avaliar?"}
    }
  ],
  "settings": {
    "delay_between_contacts_seconds": 35,
    "llm_provider": "groq",
    "llm_model": "llama-3.3-70b-versatile"
  }
}
```

---

## ⚠️ Boas Práticas e Segurança

1. **Número Dedicado:** Utilize sempre um chip/número corporativo exclusivo para prospecção ativa.
2. **Delay entre Mensagens:** Mantenha no mínimo 30 a 45 segundos entre contatos para proteger o número contra restrições de tráfego.
3. **Limpeza de Nomes:** Deixe o módulo `name_cleaner.py` ativo para evitar saudações artificiais como *"Olá Clínica Odontológica Sorriso Perfeito LTDA"*.
4. **Respeito a Recusas:** Quando o lead disser `não` ou pedir cancelamento (`opt_out`), o robô encerra educadamente de forma imediata sem insistência.

