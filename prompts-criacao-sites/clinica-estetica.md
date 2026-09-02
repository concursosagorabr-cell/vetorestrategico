# Prompt Mestre — Geração de Site para Clínica de Estética (Antigravity)

## Como usar
1. Preencha os campos entre `[ ]`. Os marcados **(opcional)** podem ficar em
   branco sem problema.
2. Se for um **mockup rápido de prospecção** (você só sabe o nome da clínica e
   pouco mais — o cenário típico de "esboço grátis em 24h"), preencha apenas
   o bloco **"Essencial"** e deixe o resto em branco. O prompt já instrui o
   Antigravity a completar o restante com conteúdo placeholder seguro, nunca
   com dados fabricados que pareçam reais.
3. Copie tudo entre `---INÍCIO---` e `---FIM---` e cole no chat do Antigravity,
   dentro do projeto onde o plugin `clinica-estetica` (skill
   `site-clinica-estetica`) já está configurado.
4. Depois que o lead fechar negócio, rode o prompt de novo com os dados reais
   preenchidos para substituir os placeholders antes de publicar de verdade.

---

---INÍCIO---

Você é o(a) diretor(a) de design de um estúdio especializado em sites de
altíssima conversão para clínicas de estética. Utilize integralmente as
diretrizes da skill **site-clinica-estetica** (plugin `clinica-estetica`) já
configurada neste projeto — paletas, estrutura de seções, camada de
movimento/parallax e regras de conformidade ética. Não use o visual genérico
padrão de IA (fundo creme com acento terracota, cards com ícone+título+parágrafo
repetidos sem variação, numeração 01/02/03 decorativa sem significado real);
faça escolhas específicas para esta clínica.

### Sua tarefa
Gerar um site completo de uma página (single-page, navegação por âncoras),
pronto para produção, para a clínica descrita abaixo.

### Essencial
- Nome da clínica: [ ]
- Subnicho: [ ] (harmonização facial / dermatologia clínica / biomedicina
  estética / spa-corporal / outro)
- Cidade/bairro de atuação: [ ]
- WhatsApp para contato (com DDD): [ ]

### Briefing completo (preencha o que tiver)
- Nome do(a) especialista responsável: [ ] (opcional)
- Registro profissional (CRM/CRO/CRBM/CRF) e número: [ ] ⚠️ **nunca inventar**
  — se não for fornecido, deixe o texto "RT: dado pendente de confirmação"
  visível apenas como comentário `<!-- PLACEHOLDER -->` no código, nunca
  publicado como se fosse real
- Formação/diferenciais do especialista: [ ] (opcional)
- Procedimentos oferecidos (liste os principais): [ ] (opcional)
- Diferenciais da clínica: [ ] (opcional)
- Depoimentos reais (cole aqui, se houver): [ ] (opcional)
- Fotos de antes/depois com autorização de uso: [sim / não / não sei]
- Endereço completo: [ ] (opcional)
- Instagram / redes sociais: [ ] (opcional)
- Horário de funcionamento: [ ] (opcional)

**Se algum campo acima ficar em branco:** preencha com conteúdo placeholder
realista e coerente com o subnicho — nunca "Lorem Ipsum", nunca estatísticas
ou números inventados apresentados como reais (ex.: "+2.500 pacientes"), nunca
nome ou registro profissional fictício. Marque cada trecho placeholder com um
comentário `<!-- PLACEHOLDER: substituir por dado real antes de publicar -->`
logo acima do trecho no HTML.

### Direção visual
- Paleta: [ escolha a IA com base no subnicho, seguindo a seção 2 da skill /
  ou force uma direção específica: Light Clean Luxo / Dark Glamour / Clean
  Clinical ]
- Elemento de assinatura desta página: [ a critério do agente, seguindo a
  seção 1 da skill / ou descreva o que você quer: slider antes/depois no
  hero, parallax em camadas, seção de "jornada do tratamento" com pin de
  scroll, etc. ]

### Entregáveis técnicos
- **Stack:** Next.js (App Router, TypeScript, Tailwind CSS) no frontend;
  backend em **Hono** só para o formulário de contato secundário — o CTA
  principal continua sendo o link `wa.me`, sem depender de backend. Tudo
  conforme a seção 6 da skill.
- Server Components por padrão; `"use client"` apenas nos componentes que
  precisam (slider antes/depois, botão magnético, formulário).
- `next/image` (com `priority` no hero) e `next/font/google` — nunca `<img>`
  cru nem `<link>` para fonts.googleapis.com.
- Responsivo mobile-first (85%+ do tráfego real é mobile), LCP < 2s.
- Botão flutuante do WhatsApp com link `wa.me` e mensagem pré-preenchida
  pedindo avaliação/agendamento.
- JSON-LD Schema.org (`MedicalBusiness` ou `BeautySalon`) via
  `<script type="application/ld+json">` em Server Component.
- Camada de movimento da seção 3 da skill: scroll-reveal com stagger em
  procedimentos/diferenciais/depoimentos, parallax em camadas no hero
  (respeitando `prefers-reduced-motion`), e o elemento de assinatura definido
  acima — sem empilhar múltiplos efeitos grandes na mesma página.
- Ordem de seções da seção 4 da skill: header sticky → hero → procedimentos
  → especialista → diferenciais → depoimentos → localização → footer.
- Footer com dados legais (CNPJ, se fornecido) e RT visível, conforme a
  seção 5 (conformidade ética) — sem prometer resultados milagrosos.

### Repositório & Deploy (monorepo Turborepo → Vercel)
Estruture como monorepo, pronto para dois Projetos Vercel separados no mesmo
repositório:
```
clinica-site/
├── apps/
│   ├── web/        # Next.js — o site
│   └── api/         # Hono — POST /lead (formulário de contato)
├── packages/
│   └── shared/       # schema Zod do lead + tipos compartilhados
├── turbo.json
└── package.json       # workspaces
```
- `apps/api`: endpoint `POST /lead` validado com Zod, gravando o lead em
  Postgres serverless (Neon / Vercel Postgres) e disparando e-mail via
  Resend para a clínica. Documente as env vars necessárias
  (`DATABASE_URL`, `RESEND_API_KEY`, e-mail de destino) num `.env.example`
  em cada app — nunca commitar valores reais.
- Ao final, liste os dois comandos/configurações de deploy: Root Directory
  `apps/web` para o projeto do site e Root Directory `apps/api` para o da
  API, com "Include files outside the Root Directory in the Build Step"
  ativado nos dois (necessário por causa de `packages/shared`).

### Antes de gerar o código
Responda primeiro em texto corrido (ainda sem código):
1. Qual subnicho você identificou e qual direção de paleta escolheu, e por quê.
2. Qual será o elemento de assinatura desta página.
3. Árvore de arquivos proposta para o monorepo (`apps/web`, `apps/api`,
   `packages/shared`).
4. Lista de tudo que ficou como placeholder e precisa de confirmação antes de
   publicar.

Só gere o código completo depois que eu confirmar esse plano.

---FIM---


Crie um componente em Next.js com Tailwind CSS que implemente um background de vídeo no estilo 'scrollytelling', com a mesma fluidez e qualidade das landing pages da Apple.

Requisitos técnicos e de layout:
- O vídeo a ser utilizado está na pasta /public e se chama 'dermaroler'.
- Ele deve ficar fixo no background da página (fixed, inset-0, object-cover) ocupando 100% da viewport, com o conteúdo da página rolando por cima dele.
- A reprodução do vídeo (scrubbing) deve estar estritamente vinculada ao progresso do scroll da página: ao rolar para baixo, o vídeo avança; ao rolar para cima, o vídeo retrocede.
- Para garantir a ausência de lag e o efeito "manteiga" da Apple, utilize a biblioteca GSAP junto com o ScrollTrigger, configurando o 'scrub' com suavização (easing). Se preferir, pode implementar uma solução via <canvas> com `requestAnimationFrame`.
- O código deve ser modular, totalmente responsivo e pronto para produção.