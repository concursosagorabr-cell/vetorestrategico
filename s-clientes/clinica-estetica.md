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
- Stack: HTML5 + CSS3 + JavaScript vanilla, sem framework — prioridade
  máxima em performance (LCP < 2s), conforme seção 6/11 da skill
- Arquivos: `index.html`, `styles.css`, `script.js` (auto-contidos, sem
  dependências externas além de fontes do Google Fonts)
- Responsivo mobile-first (85%+ do tráfego real é mobile)
- Botão flutuante do WhatsApp com link `wa.me` e mensagem pré-preenchida
  pedindo avaliação/agendamento
- JSON-LD Schema.org (`MedicalBusiness` ou `BeautySalon`) com os dados
  fornecidos
- Camada de movimento da seção 3 da skill: scroll-reveal com stagger em
  procedimentos/diferenciais/depoimentos, parallax em camadas no hero
  (respeitando `prefers-reduced-motion`), e o elemento de assinatura definido
  acima — sem empilhar múltiplos efeitos grandes na mesma página
- Ordem de seções da seção 4 da skill: header sticky → hero → procedimentos
  → especialista → diferenciais → depoimentos → localização → footer
- Footer com dados legais (CNPJ, se fornecido) e RT visível, conforme a
  seção 5 (conformidade ética) — sem prometer resultados milagrosos

### Antes de gerar o código
Responda primeiro em texto corrido (ainda sem código):
1. Qual subnicho você identificou e qual direção de paleta escolheu, e por quê.
2. Qual será o elemento de assinatura desta página.
3. Lista de tudo que ficou como placeholder e precisa de confirmação antes de
   publicar.

Só gere o código completo depois que eu confirmar esse plano.

---FIM---