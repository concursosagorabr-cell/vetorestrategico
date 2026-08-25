import {
  DirectoryTool,
  ToolCategory,
  ToolNiche,
  ToolPricingType,
} from "@/types";

export const DIRECTORY_CATEGORIES: {
  id: ToolCategory;
  label: string;
  desc: string;
  iconName: string;
  badge: string;
}[] = [
  {
    id: "whatsapp-atendimento",
    label: "Atendimento WhatsApp & SAC",
    desc: "Agentes 24/7 que respondem em linguagem natural, tiram dúvidas e agendam sem filas.",
    iconName: "MessageSquare",
    badge: "Alta Procura",
  },
  {
    id: "geracao-leads",
    label: "Geração & Qualificação de Leads",
    desc: "Motores de captação e filtros inteligentes para entregar leads quentes ao time comercial.",
    iconName: "Target",
    badge: "Mais Vendas",
  },
  {
    id: "automacao-processos-rpa",
    label: "Automação de Processos & RPA",
    desc: "Robôs que eliminam digitação manual, emissão repetitiva de notas e conciliações.",
    iconName: "Cpu",
    badge: "Eficiência",
  },
  {
    id: "agendamento-consultas",
    label: "Agendamento & Confirmação",
    desc: "Sincronização em tempo real de agendas médicas, odontológicas e estéticas com WhatsApp.",
    iconName: "Calendar",
    badge: "-70% Faltas",
  },
  {
    id: "bi-analise-dados",
    label: "BI & Dashboards Preditivos",
    desc: "Visualização clara de métricas, CAC, LTV e projeções de faturamento em tempo real.",
    iconName: "BarChart3",
    badge: "Gestão",
  },
  {
    id: "conteudo-marketing",
    label: "Conteúdo & Marketing com IA",
    desc: "Geração de criativos, posts, copy de anúncios e automação de disparos inteligentes.",
    iconName: "Sparkles",
    badge: "Presença",
  },
  {
    id: "gestao-documental",
    label: "Gestão Documental & Contratos",
    desc: "Leitura automática de PDFs, contratos, certidões e extração inteligente de cláusulas.",
    iconName: "FileText",
    badge: "Jurídico/Fiscal",
  },
  {
    id: "integracao-sistemas",
    label: "Integrações ERP, CRM & Webhooks",
    desc: "Pontes que conectam seu site, WhatsApp, ERP e banco de dados sem esforço manual.",
    iconName: "Network",
    badge: "Conectividade",
  },
];

export const DIRECTORY_NICHES: {
  id: ToolNiche;
  label: string;
  desc: string;
  badge: string;
}[] = [
  { id: "geral", label: "Todos os Nichos", desc: "Soluções versáteis aplicáveis a qualquer modelo de negócio.", badge: "Universal" },
  { id: "clinicas", label: "Clínicas Médicas", desc: "Médicos especialistas, consultas particulares e clínicas multidisciplinares.", badge: "Saúde" },
  { id: "odontologia", label: "Odontologia", desc: "Implantes, alinhadores invisíveis, estética dental e ortodontia.", badge: "Odonto" },
  { id: "estetica", label: "Clínicas de Estética", desc: "Harmonização facial, bioestimuladores, lasers e tratamentos corporais.", badge: "Beleza" },
  { id: "advocacia", label: "Advocacia & Jurídico", desc: "Escritórios cíveis, trabalhistas, previdenciários e empresariais.", badge: "OAB Ético" },
  { id: "contabilidade", label: "Contabilidade & BPO", desc: "Captação PJ, conciliação fiscal e automação de certidões.", badge: "Fiscal" },
  { id: "ecommerce", label: "E-commerce & Varejo", desc: "Recuperação de vendas, WhatsApp marketing e status de frete.", badge: "Vendas" },
  { id: "imobiliarias", label: "Imobiliárias & Corretores", desc: "Qualificação de compradores, locação e match inteligente de imóveis.", badge: "Imóveis" },
  { id: "vendas-b2b", label: "Vendas B2B & Serviços", desc: "Empresas com ciclo comercial consultivo e orçamentos sob medida.", badge: "B2B" },
];

export const DIRECTORY_PRICING_FILTERS: {
  id: ToolPricingType;
  label: string;
}[] = [
  { id: "gratuito", label: "Gratuito / Open Source" },
  { id: "freemium", label: "Freemium" },
  { id: "pme-acessivel", label: "Acessível PME (< R$ 400/mês)" },
  { id: "enterprise", label: "Corporativo / Enterprise" },
  { id: "sob-consulta", label: "Sob Consulta" },
];

export const DIRECTORY_TOOLS: DirectoryTool[] = [
  {
    id: "tool-agente-whatsapp-pro",
    slug: "agente-whatsapp-pro",
    name: "Agente WhatsApp Pro",
    tagline: "Atendimento Inteligente 24/7 com IA Conversacional e Triagem de Leads",
    shortDesc: "Agente de IA treinado com as regras do seu negócio que acolhe clientes no WhatsApp oficial, responde dúvidas, qualifica oportunidades e agenda horários sem intervenção humana.",
    fullDesc: "O Agente WhatsApp Pro é a solução definitiva para eliminar a perda de clientes fora do horário comercial. Integrado diretamente à API Oficial do WhatsApp Business (Meta Cloud API), o agente utiliza modelos de linguagem avançados para conduzir conversas naturais, tirar dúvidas complexas sobre serviços, aplicar filtros de qualificação comercial e direcionar apenas clientes prontos para fechar com a sua equipe humana.",
    logoBgColor: "bg-emerald-500",
    category: "whatsapp-atendimento",
    categoryLabel: "Atendimento WhatsApp & SAC",
    niches: ["clinicas", "odontologia", "estetica", "advocacia", "contabilidade", "ecommerce", "imobiliarias", "vendas-b2b", "geral"],
    nicheLabels: ["Clínicas Médicas", "Odontologia", "Estética", "Advocacia", "Contabilidade", "E-commerce", "Imobiliárias", "Vendas B2B"],
    pricingType: "pme-acessivel",
    pricingLabel: "Acessível PME",
    startingPrice: "R$ 297",
    pricingPeriod: "/mês",
    complexity: "assistida-vetor",
    complexityLabel: "Implementação Assistida Chave na Mão",
    
    rating: 4.9,
    vetorScore: 9.8,
    scores: {
      velocidade: 9.9,
      facilidade: 9.5,
      suporte: 9.8,
      custoBeneficio: 9.9,
      segurancaLgpd: 9.9,
    },
    
    isFeatured: true,
    isVerifiedByVetor: true,
    isSponsored: true,
    isTopChoice: true,
    
    pros: [
      "Tempo de resposta inferior a 3 segundos a qualquer hora do dia ou noite",
      "Qualificação prévia com perguntas estratégicas antes do transbordo humano",
      "Compatível com API Oficial do WhatsApp (risco zero de banimento de chip)",
      "Histórico sincronizado diretamente com CRMs e planilhas em tempo real",
      "Suporte a áudios transcritos e respostas com arquivos PDF e links de pagamento"
    ],
    cons: [
      "Requer configuração inicial de prompts e regras comerciais do negócio",
      "Necessita de número comercial verificado no Meta Business Manager"
    ],
    
    keyFeatures: [
      "Atendimento Humanizado 24 Horas por Dia",
      "Transcrição e Interpretação Automática de Áudios de Clientes",
      "Triagem e Roteamento por Departamento ou Profissional",
      "Integração com Google Agenda, Calendly e Sistemas Especialistas",
      "Envio Automático de Propostas, Catálogos e Pix no Chat",
      "Painel de Monitoramento com Transbordo Humano em 1 Clique"
    ],
    integrations: [
      { name: "WhatsApp Business API", badge: "Oficial Meta" },
      { name: "RD Station CRM", badge: "CRM" },
      { name: "HubSpot", badge: "CRM" },
      { name: "Google Calendar", badge: "Agendas" },
      { name: "Make / n8n", badge: "Webhooks" },
      { name: "Tiny ERP / Bling", badge: "ERPs" }
    ],
    pricingPlans: [
      {
        name: "Plano PME Start",
        price: "R$ 297/mês",
        period: "mensal",
        features: [
          "Até 2.500 conversas ativas/mês",
          "1 Agente Inteligente treinado",
          "Integração oficial WhatsApp",
          "Suporte via chamado e e-mail"
        ]
      },
      {
        name: "Plano Growth",
        price: "R$ 597/mês",
        period: "mensal",
        highlight: true,
        features: [
          "Até 10.000 conversas ativas/mês",
          "Múltiplos agentes (Vendas + Suporte)",
          "Transbordo para até 5 atendentes",
          "Integração com CRM e Google Calendar",
          "Suporte prioritário no WhatsApp"
        ]
      },
      {
        name: "Enterprise Sob Medida",
        price: "Sob Consulta",
        period: "customizado",
        features: [
          "Volume ilimitado de mensagens",
          "Treinamento com base documental interna",
          "SLA de 99.9% e gerente de contas",
          "Integração profunda com ERP corporativo"
        ]
      }
    ],
    
    estimatedMonthlyHoursSaved: 120,
    estimatedMonthlySavings: 4800,
    paybackPeriodDays: 14,
    
    affiliateUrl: "https://vetorestrategico.com.br/orcamento?servico=atendimento-whatsapp-ia",
    couponCode: "VETOR15",
    couponDiscount: "15% de Desconto na Mensalidade",
    websiteUrl: "https://vetorestrategico.com.br/servicos#atendimento-whatsapp",
    
    vetorImplementationHours: "48 a 72 horas",
    vetorDeliverables: [
      "Configuração e verificação do número no WhatsApp Cloud API",
      "Elaboração da base de conhecimento e prompts do robô",
      "Configuração dos gatilhos de transbordo e horários",
      "Integração com CRM ou sistema de agendamento do cliente",
      "Treinamento ao vivo da equipe comercial para operação"
    ],
    
    reviewsCount: 38,
    reviews: [
      {
        author: "Dra. Camila Nogueira",
        company: "Clínica Nogueira Dermatologia",
        segment: "Saúde & Estética",
        rating: 5,
        comment: "O robô atende nossos pacientes às 22h, tira dúvidas sobre procedimentos e já agenda a consulta. Aumentamos as consultas em 42% no primeiro mês.",
        date: "12/07/2026"
      },
      {
        author: "Dr. Marcelo Ramos",
        company: "Ramos & Associados Advocacia",
        segment: "Jurídico",
        rating: 5,
        comment: "A triagem inicial faz as perguntas essenciais da OAB e só passa para o advogado quando o caso é viável. Economizamos dezenas de horas por semana.",
        date: "28/06/2026"
      }
    ],
    faqs: [
      {
        question: "Corre o risco de o meu número do WhatsApp ser banido?",
        answer: "Não. A solução utiliza a API Oficial da Meta (Cloud API), o canal 100% autorizado pela Meta que garante total estabilidade e segurança jurídica."
      },
      {
        question: "Minha equipe pode intervir e falar na conversa a qualquer momento?",
        answer: "Sim! A qualquer momento um atendente humano pode assumir o chat com apenas 1 clique no painel ou aplicativo, pausando a IA temporariamente."
      }
    ],
    publishedAt: "2026-01-10",
    updatedAt: "2026-08-20"
  },
  {
    id: "tool-juridix-ia",
    slug: "juridix-ia",
    name: "Juridix IA & Triagem OAB",
    tagline: "Assistente Jurídico com Triagem Ética de Casos e Resumo de Processos",
    shortDesc: "Solução especializada para escritórios de advocacia que qualifica novos clientes no primeiro contato, coleta documentos básicos e gera relatórios prévios conforme o Código de Ética da OAB.",
    fullDesc: "Desenvolvida com regras estritas de conformidade com a OAB, a Juridix IA atua como uma recepção jurídica digital. Ela interage com o lead, identifica a área do direito (Trabalhista, Cível, Previdenciário, Família, Tributário), reúne os fatos cruciais da demanda e gera um dossiê pronto para a análise do advogado responsável.",
    logoBgColor: "bg-indigo-600",
    category: "gestao-documental",
    categoryLabel: "Gestão Documental & Contratos",
    niches: ["advocacia"],
    nicheLabels: ["Advocacia & Jurídico"],
    pricingType: "pme-acessivel",
    pricingLabel: "Acessível PME",
    startingPrice: "R$ 349",
    pricingPeriod: "/mês",
    complexity: "assistida-vetor",
    complexityLabel: "Implementação Assistida",
    
    rating: 4.8,
    vetorScore: 9.6,
    scores: {
      velocidade: 9.7,
      facilidade: 9.4,
      suporte: 9.6,
      custoBeneficio: 9.7,
      segurancaLgpd: 10.0,
    },
    
    isFeatured: true,
    isVerifiedByVetor: true,
    isSponsored: false,
    isTopChoice: false,
    
    pros: [
      "100% aderente ao Provimento 205/2021 da OAB (sem promessa de resultado)",
      "Coleta segura de documentos com upload criptografado no WhatsApp",
      "Resumos executivos automáticos direto no e-mail do sócio do escritório",
      "Redução de 85% do tempo gasto em atendimentos improdutivos"
    ],
    cons: [
      "Exige definição prévia dos critérios de aceitação de clientes do escritório"
    ],
    
    keyFeatures: [
      "Triagem por Áreas do Direito (Trabalhista, Cível, Previdenciário)",
      "Coleta Automatizada de Comprovantes e Documentos",
      "Geração de Dossiê Inicial do Cliente em PDF",
      "Integração com Softwares Jurídicos (Astrea, ProJuris, SAJ ADV)",
      "Termo de Consentimento LGPD integrado antes da coleta"
    ],
    integrations: [
      { name: "Astrea", badge: "Jurídico" },
      { name: "ProJuris", badge: "Jurídico" },
      { name: "WhatsApp Business API", badge: "Oficial" },
      { name: "Google Drive / OneDrive", badge: "Nuvem" }
    ],
    pricingPlans: [
      {
        name: "Escritório Individual",
        price: "R$ 349/mês",
        period: "mensal",
        features: ["1 Advogado titular", "Até 500 triagens/mês", "Dossiês em PDF por e-mail", "Suporte técnico"]
      },
      {
        name: "Banca Jurídica",
        price: "R$ 690/mês",
        period: "mensal",
        highlight: true,
        features: ["Até 5 advogados", "Triagens ilimitadas", "Integração Astrea/ProJuris", "Roteamento por especialidade", "Suporte prioritário"]
      }
    ],
    
    estimatedMonthlyHoursSaved: 90,
    estimatedMonthlySavings: 5400,
    paybackPeriodDays: 12,
    
    affiliateUrl: "https://vetorestrategico.com.br/orcamento?servico=juridix-ia",
    couponCode: "OABVETOR",
    couponDiscount: "10% de Desconto no Setup",
    websiteUrl: "https://vetorestrategico.com.br/advocacia",
    
    vetorImplementationHours: "3 a 5 dias úteis",
    vetorDeliverables: [
      "Customização dos questionários de triagem por área jurídica",
      "Adequação completa das mensagens ao provimento da OAB",
      "Conexão com CRM ou pasta de arquivos na nuvem do escritório",
      "Treinamento do time de atendimento da banca"
    ],
    
    reviewsCount: 19,
    reviews: [
      {
        author: "Dra. Beatriz Ferraz",
        company: "Ferraz & Toledo Advogados",
        segment: "Direito Trabalhista",
        rating: 5,
        comment: "Antes perdíamos horas conversando com pessoas com dúvidas genéricas. Agora o Juridix filtra tudo e só atendo quem realmente tem processo viável.",
        date: "04/08/2026"
      }
    ],
    faqs: [
      {
        question: "A ferramenta dá parecer jurídico ou conselhos ao cliente?",
        answer: "Não. A ferramenta atua estritamente na acolhida, coleta de informações factuais e agendamento, respeitando as normas éticas da OAB."
      }
    ],
    publishedAt: "2026-02-15",
    updatedAt: "2026-08-18"
  },
  {
    id: "tool-clinibot-saude",
    slug: "clinibot-saude",
    name: "CliniBot Saúde & Confirmação CFM",
    tagline: "Agendamento de Consultas Médicas e Redução de No-Show no WhatsApp",
    shortDesc: "Robô de atendimento para clínicas médicas que sincroniza agendas de múltiplos profissionais, confirma presenças com 24h de antecedência e encaixa pacientes de listas de espera.",
    fullDesc: "O CliniBot Saúde transforma a recepção de clínicas e consultórios médicos. Com integração aos principais prontuários e sistemas médicos do Brasil, ele gerencia a grade de horários, envia lembretes interativos com botões de confirmação no WhatsApp e, caso ocorra uma desistência, aciona automaticamente o próximo paciente da lista de espera.",
    logoBgColor: "bg-teal-600",
    category: "agendamento-consultas",
    categoryLabel: "Agendamento & Confirmação",
    niches: ["clinicas", "odontologia", "estetica"],
    nicheLabels: ["Clínicas Médicas", "Odontologia", "Estética"],
    pricingType: "pme-acessivel",
    pricingLabel: "Acessível PME",
    startingPrice: "R$ 380",
    pricingPeriod: "/mês",
    complexity: "assistida-vetor",
    complexityLabel: "Implementação Assistida",
    
    rating: 4.9,
    vetorScore: 9.7,
    scores: {
      velocidade: 9.8,
      facilidade: 9.6,
      suporte: 9.7,
      custoBeneficio: 9.8,
      segurancaLgpd: 9.9,
    },
    
    isFeatured: true,
    isVerifiedByVetor: true,
    isSponsored: false,
    isTopChoice: false,
    
    pros: [
      "Redução comprovada de até 75% na taxa de faltas (no-show)",
      "Preenchimento instantâneo de horários vagos via lista de espera inteligente",
      "Compatível com prontuários eletrônicos como Doctoralia, iClinic e Feegow",
      "Orientações pré-consulta e preparo de exames enviados automaticamente"
    ],
    cons: [
      "Requer integração com a API do software de agendamento da clínica"
    ],
    
    keyFeatures: [
      "Confirmação Automática de Consultas com Botões 'Sim' / 'Reagendar'",
      "Reagendamento 100% Autônomo pelo Paciente no WhatsApp",
      "Disparo de Instruções Pré-Exame (Jejum, Medicamentos, Documentos)",
      "Gestão de Lista de Espera e Encaixes Automáticos",
      "Pesquisa de Satisfação (NPS) Pós-Consulta Automática"
    ],
    integrations: [
      { name: "iClinic", badge: "Prontuário" },
      { name: "Doctoralia", badge: "Agenda" },
      { name: "Feegow Clinic", badge: "Gestão" },
      { name: "WhatsApp Cloud API", badge: "Oficial" }
    ],
    pricingPlans: [
      {
        name: "Consultório Individual",
        price: "R$ 380/mês",
        period: "mensal",
        features: ["1 Agenda Médica", "Confirmações ilimitadas", "Lista de espera", "Suporte padrão"]
      },
      {
        name: "Clínica Multidisciplinar",
        price: "R$ 750/mês",
        period: "mensal",
        highlight: true,
        features: ["Até 6 Médicos/Agendas", "Sincronização em tempo real", "NPS Pós-Consulta", "Suporte prioritário"]
      }
    ],
    
    estimatedMonthlyHoursSaved: 110,
    estimatedMonthlySavings: 5200,
    paybackPeriodDays: 10,
    
    affiliateUrl: "https://vetorestrategico.com.br/orcamento?servico=clinibot-saude",
    couponCode: "SAUDEVETOR",
    couponDiscount: "10% no Primeiro Trimestre",
    websiteUrl: "https://vetorestrategico.com.br/clinicas",
    
    vetorImplementationHours: "3 a 4 dias úteis",
    vetorDeliverables: [
      "Integração com a agenda ou prontuário eletrônico da clínica",
      "Criação das mensagens de confirmação e políticas de reagendamento",
      "Configuração da régua de disparos automáticos de lembretes",
      "Treinamento das secretárias e recepcionistas"
    ],
    
    reviewsCount: 27,
    reviews: [
      {
        author: "Dr. Paulo Silveira",
        company: "Clínica CardioVida",
        segment: "Cardiologia",
        rating: 5,
        comment: "Nossa taxa de falta caiu de 22% para apenas 4%. O robô avisa o paciente e se ele cancela, a vaga é preenchida em menos de 15 minutos pela lista de espera.",
        date: "19/07/2026"
      }
    ],
    faqs: [
      {
        question: "O paciente precisa baixar algum aplicativo?",
        answer: "Não. Toda a interação acontece diretamente pelo WhatsApp que o paciente já tem instalado no celular."
      }
    ],
    publishedAt: "2026-03-01",
    updatedAt: "2026-08-15"
  },
  {
    id: "tool-odontoflow-ia",
    slug: "odontoflow-ia",
    name: "OdontoFlow IA & Recall",
    tagline: "Captação de Pacientes Particulares de Alto Ticket e Recall Odontológico",
    shortDesc: "Sistema inteligente para consultórios e clínicas de odontologia que qualifica pacientes de alto valor (Implantes, Invisalign, Lentes) e reativa pacientes inativos para limpeza semestral.",
    fullDesc: "O OdontoFlow IA atua nas duas pontas mais lucrativas de um consultório odontológico: na atração de novos tratamentos de alto ticket e na ativação da base já existente. No atendimento inicial, ele esclarece dúvidas sobre alinhadores invisíveis e próteses, enquanto seu módulo de recall envia lembretes personalizados para pacientes que estão há mais de 6 meses sem retorno.",
    logoBgColor: "bg-sky-500",
    category: "geracao-leads",
    categoryLabel: "Geração & Qualificação de Leads",
    niches: ["odontologia", "estetica"],
    nicheLabels: ["Odontologia", "Estética"],
    pricingType: "pme-acessivel",
    pricingLabel: "Acessível PME",
    startingPrice: "R$ 360",
    pricingPeriod: "/mês",
    complexity: "assistida-vetor",
    complexityLabel: "Implementação Assistida",
    
    rating: 4.9,
    vetorScore: 9.6,
    scores: {
      velocidade: 9.7,
      facilidade: 9.5,
      suporte: 9.6,
      custoBeneficio: 9.8,
      segurancaLgpd: 9.8,
    },
    
    isFeatured: false,
    isVerifiedByVetor: true,
    isSponsored: false,
    isTopChoice: false,
    
    pros: [
      "Aumento imediato do faturamento com reativação de base antiga (Recall)",
      "Triagem de interesse em tratamentos estéticos de alta margem",
      "Compatível com Simples Dental, Dental Office e Clinicorp",
      "Régua de pós-atendimento cirúrgico humanizada com IA"
    ],
    cons: [
      "Necessita de base de dados de pacientes higienizada"
    ],
    
    keyFeatures: [
      "Motor de Recall Automático Semestral / Anual",
      "Qualificação de Tratamentos de Alto Valor (Invisalign, Implantes, Facetas)",
      "Acompanhamento Pós-Operatório Automático no WhatsApp",
      "Sincronização com Simples Dental e Dental Office",
      "Coleta de Avaliações 5 Estrelas no Google Meu Negócio"
    ],
    integrations: [
      { name: "Simples Dental", badge: "Odonto" },
      { name: "Clinicorp", badge: "Gestão" },
      { name: "Dental Office", badge: "Software" },
      { name: "Google Meu Negócio", badge: "SEO Local" }
    ],
    pricingPlans: [
      {
        name: "Consultório Solo",
        price: "R$ 360/mês",
        period: "mensal",
        features: ["1 Dentista", "Recall para até 1.000 pacientes", "Qualificação de tratamentos", "Suporte"]
      },
      {
        name: "Clínica Odontológica",
        price: "R$ 690/mês",
        period: "mensal",
        highlight: true,
        features: ["Até 5 Dentistas", "Recall ilimitado", "Pós-operatório automático", "Avaliações Google Meu Negócio"]
      }
    ],
    
    estimatedMonthlyHoursSaved: 80,
    estimatedMonthlySavings: 6500,
    paybackPeriodDays: 8,
    
    affiliateUrl: "https://vetorestrategico.com.br/orcamento?servico=odontoflow-ia",
    couponCode: "ODONTOVETOR",
    couponDiscount: "15% de Desconto no Setup",
    websiteUrl: "https://vetorestrategico.com.br/odontologia",
    
    vetorImplementationHours: "3 a 5 dias úteis",
    vetorDeliverables: [
      "Importação e higienização da base de contatos de pacientes",
      "Construção da régua de mensagens de recall e pós-operatório",
      "Integração com o software odontológico da clínica",
      "Treinamento prático da secretária"
    ],
    
    reviewsCount: 22,
    reviews: [
      {
        author: "Dr. Lucas Meirelles",
        company: "Meirelles Odontologia Estética",
        segment: "Odontologia",
        rating: 5,
        comment: "Reativamos mais de 60 pacientes inativos no primeiro disparo de recall semestral. Pagou a ferramenta do ano inteiro em 15 dias.",
        date: "11/08/2026"
      }
    ],
    faqs: [
      {
        question: "Como funciona a coleta de avaliações no Google?",
        answer: "Após a consulta concluída com sucesso, o robô envia uma mensagem carinhosa perguntando a nota. Se for 5 estrelas, convida o paciente a deixar a avaliação pública no Google com 1 toque."
      }
    ],
    publishedAt: "2026-03-10",
    updatedAt: "2026-08-12"
  },
  {
    id: "tool-fiscalbot-rpa",
    slug: "fiscalbot-rpa",
    name: "FiscalBot RPA & Conciliação SPED",
    tagline: "Automação de Emissão de Notas, Baixa de Guias e Conciliação Fiscal",
    shortDesc: "Robôs inteligentes (RPA) para escritórios de contabilidade e departamentos fiscais que emitem guias, baixam extratos bancários e cruzam dados do SPED sem erro humano.",
    fullDesc: "O FiscalBot RPA elimina mais de 80% do trabalho repetitivo que sobrecarrega os contadores todo início de mês. Ele acessa portais de prefeituras, e-CAC e bancos de forma automatizada e segura, baixando notas fiscais, gerando guias de impostos (DAS, DARF, FGTS) e enviando diretamente aos clientes com protocolos arquivados.",
    logoBgColor: "bg-emerald-600",
    category: "automacao-processos-rpa",
    categoryLabel: "Automação de Processos & RPA",
    niches: ["contabilidade", "vendas-b2b"],
    nicheLabels: ["Contabilidade & BPO", "Vendas B2B"],
    pricingType: "pme-acessivel",
    pricingLabel: "Acessível PME",
    startingPrice: "R$ 490",
    pricingPeriod: "/mês",
    complexity: "assistida-vetor",
    complexityLabel: "Implementação Assistida",
    
    rating: 4.9,
    vetorScore: 9.8,
    scores: {
      velocidade: 10.0,
      facilidade: 9.3,
      suporte: 9.8,
      custoBeneficio: 9.9,
      segurancaLgpd: 9.9,
    },
    
    isFeatured: true,
    isVerifiedByVetor: true,
    isSponsored: false,
    isTopChoice: false,
    
    pros: [
      "Zero multas por atraso de envio de guias e declarações",
      "Execução em lote de centenas de empresas em minutos",
      "Integração nativa com Domínio Sistemas, Questor e Fortes",
      "Disparo automático das guias com código de barras no WhatsApp do cliente"
    ],
    cons: [
      "Requer certificados digitais das empresas (A1) configurados no cofre seguro"
    ],
    
    keyFeatures: [
      "Download Automático de NF-e, NFS-e e CT-e na SEFAZ e Prefeituras",
      "Emissão e Cálculo de Guias DAS / Simples Nacional em Lote",
      "Conciliação de Extratos Bancários OFX com o ERP Contábil",
      "Disparo das Guias com Boleto e Pix pelo WhatsApp do Cliente",
      "Emissão de Certidões Negativas de Débitos (CNDs) Periódicas"
    ],
    integrations: [
      { name: "Domínio Sistemas (Thomson)", badge: "Contábil" },
      { name: "Questor", badge: "Contábil" },
      { name: "e-CAC / Receita Federal", badge: "Governo" },
      { name: "ContaAzul / Omie", badge: "ERP" }
    ],
    pricingPlans: [
      {
        name: "Escritório PME",
        price: "R$ 490/mês",
        period: "mensal",
        features: ["Até 50 empresas clientes", "Emissão DAS + CNDs automáticas", "Envio por e-mail", "Suporte"]
      },
      {
        name: "Contabilidade Digital",
        price: "R$ 980/mês",
        period: "mensal",
        highlight: true,
        features: ["Até 200 empresas clientes", "Robôs ilimitados", "Envio via WhatsApp com Pix", "Conciliação bancária OFX", "Suporte prioritário"]
      }
    ],
    
    estimatedMonthlyHoursSaved: 160,
    estimatedMonthlySavings: 7200,
    paybackPeriodDays: 7,
    
    affiliateUrl: "https://vetorestrategico.com.br/orcamento?servico=fiscalbot-rpa",
    couponCode: "CONTABVETOR",
    couponDiscount: "R$ 200 de Crédito na Implantação",
    websiteUrl: "https://vetorestrategico.com.br/contabilidade",
    
    vetorImplementationHours: "5 a 7 dias úteis",
    vetorDeliverables: [
      "Configuração do cofre de certificados digitais criptografados",
      "Parametrização das rotinas de emissão com o software contábil",
      "Conexão do robô de disparo de mensagens pelo WhatsApp",
      "Testes de homologação com empresas piloto"
    ],
    
    reviewsCount: 31,
    reviews: [
      {
        author: "Rodrigo Mendonça",
        company: "Mendonça Contabilidade & Gestão",
        segment: "Contabilidade",
        rating: 5,
        comment: "Antes passávamos 4 dias inteiros no início do mês apenas emitindo e enviando DAS. O FiscalBot faz tudo na madrugada do dia 1º.",
        date: "02/08/2026"
      }
    ],
    faqs: [
      {
        question: "Como funciona a segurança dos certificados digitais?",
        answer: "Os certificados A1 são armazenados em um cofre em nuvem com criptografia de nível bancário AES-256 e nunca são compartilhados ou expostos."
      }
    ],
    publishedAt: "2026-02-20",
    updatedAt: "2026-08-16"
  },
  {
    id: "tool-cartrecovery-ia",
    slug: "cartrecovery-ia",
    name: "CartRecovery IA & Pix WhatsApp",
    tagline: "Recuperação de Carrinho Abandonado e Boletos Vencidos no E-commerce",
    shortDesc: "Motor de inteligência artificial que aborda clientes que abandonaram compras em e-commerces no WhatsApp, oferecendo chave Pix com 1 clique e cupom personalizado.",
    fullDesc: "Para lojas virtuais, a taxa média de abandono de carrinho supera 70%. O CartRecovery IA monitora a plataforma de e-commerce em tempo real e, 15 minutos após o abandono, inicia uma conversa amigável no WhatsApp, esclarecendo dúvidas sobre frete, oferecendo condições facilitadas e gerando a chave Pix copia e cola instantânea.",
    logoBgColor: "bg-amber-500",
    category: "geracao-leads",
    categoryLabel: "Geração & Qualificação de Leads",
    niches: ["ecommerce"],
    nicheLabels: ["E-commerce & Varejo"],
    pricingType: "pme-acessivel",
    pricingLabel: "Acessível PME",
    startingPrice: "R$ 197",
    pricingPeriod: "/mês",
    complexity: "plug-and-play",
    complexityLabel: "Plug & Play Rápido",
    
    rating: 4.8,
    vetorScore: 9.5,
    scores: {
      velocidade: 9.9,
      facilidade: 9.7,
      suporte: 9.4,
      custoBeneficio: 9.8,
      segurancaLgpd: 9.6,
    },
    
    isFeatured: false,
    isVerifiedByVetor: true,
    isSponsored: false,
    isTopChoice: false,
    
    pros: [
      "Recuperação de 20% a 35% dos carrinhos que seriam perdidos",
      "Geração de Chave Pix Copia e Cola diretamente no chat do WhatsApp",
      "Integração nativa com Shopify, Nuvemshop, WooCommerce e Yampi",
      "Notificação automática do código de rastreamento de frete"
    ],
    cons: [
      "Necessita de fluxo constante de visitantes na loja para maximizar o ROI"
    ],
    
    keyFeatures: [
      "Disparo Inteligente de Recuperação de Carrinho em 15min / 1h / 24h",
      "Recuperação de Boletos e Pix Não Pagos",
      "Negociação Dinâmica de Frete e Cupons com IA",
      "Rastreamento de Encomendas dos Correios e Jadlog no WhatsApp",
      "Dashboard de Vendas Recuperadas em Tempo Real"
    ],
    integrations: [
      { name: "Nuvemshop", badge: "E-commerce" },
      { name: "Shopify", badge: "E-commerce" },
      { name: "WooCommerce", badge: "WordPress" },
      { name: "Yampi", badge: "Checkout" },
      { name: "Mercado Pago", badge: "Pagamentos" }
    ],
    pricingPlans: [
      {
        name: "Starter Shop",
        price: "R$ 197/mês",
        period: "mensal",
        features: ["Até 500 carrinhos recuperáveis", "Chave Pix no WhatsApp", "Suporte padrão"]
      },
      {
        name: "Pro E-commerce",
        price: "R$ 397/mês",
        period: "mensal",
        highlight: true,
        features: ["Carrinhos ilimitados", "Negociação de cupons dinâmicos", "Rastreio de frete integrado", "Suporte prioritário"]
      }
    ],
    
    estimatedMonthlyHoursSaved: 50,
    estimatedMonthlySavings: 8900,
    paybackPeriodDays: 4,
    
    affiliateUrl: "https://vetorestrategico.com.br/orcamento?servico=cartrecovery-ia",
    couponCode: "ECOMMERCE10",
    couponDiscount: "10% de Desconto na Assinatura",
    websiteUrl: "https://vetorestrategico.com.br/ecommerce",
    
    vetorImplementationHours: "24 a 48 horas",
    vetorDeliverables: [
      "Instalação dos webhooks na plataforma de e-commerce",
      "Parametrização das réguas de mensagens de recuperação",
      "Configuração da chave Pix e checkout transparente",
      "Testes de compra simulada ponta a ponta"
    ],
    
    reviewsCount: 44,
    reviews: [
      {
        author: "Renata Vasconcelos",
        company: "Donna Belle Moda Feminina",
        segment: "Moda & E-commerce",
        rating: 5,
        comment: "Recuperamos R$ 14.000 em vendas no primeiro mês que estavam dadas como perdidas. O cliente adora receber o Pix direto no WhatsApp.",
        date: "25/07/2026"
      }
    ],
    faqs: [
      {
        question: "A ferramenta funciona se o cliente não cadastrou e-mail?",
        answer: "Se o cliente inseriu o WhatsApp no checkout ou no pop-up de entrada, a ferramenta já consegue fazer o contato."
      }
    ],
    publishedAt: "2026-01-20",
    updatedAt: "2026-08-10"
  },
  {
    id: "tool-bellezabot-estetica",
    slug: "bellezabot-estetica",
    name: "BellezaBot IA & Harmonização",
    tagline: "Qualificação de Procedimentos Estéticos e Agendamento de Avaliações",
    shortDesc: "Agente inteligente especializado em estética avançada que apresenta portfólios de antes/depois, orienta sobre cuidados pré-procedimento e agenda avaliações com pagamento de sinal.",
    fullDesc: "O BellezaBot foi desenhado especialmente para clínicas de estética e harmonização facial/corporal. Ele tira as dúvidas mais frequentes das clientes sobre Botox, preenchedores, bioestimuladores e lasers, explica a importância da avaliação presencial e possibilita a cobrança da taxa de reserva de horário via Pix.",
    logoBgColor: "bg-pink-500",
    category: "agendamento-consultas",
    categoryLabel: "Agendamento & Confirmação",
    niches: ["estetica", "clinicas", "odontologia"],
    nicheLabels: ["Clínicas de Estética", "Clínicas Médicas", "Odontologia"],
    pricingType: "pme-acessivel",
    pricingLabel: "Acessível PME",
    startingPrice: "R$ 320",
    pricingPeriod: "/mês",
    complexity: "assistida-vetor",
    complexityLabel: "Implementação Assistida",
    
    rating: 4.9,
    vetorScore: 9.7,
    scores: {
      velocidade: 9.8,
      facilidade: 9.7,
      suporte: 9.5,
      custoBeneficio: 9.8,
      segurancaLgpd: 9.8,
    },
    
    isFeatured: false,
    isVerifiedByVetor: true,
    isSponsored: false,
    isTopChoice: false,
    
    pros: [
      "Apresentação elegante do catálogo de procedimentos no WhatsApp",
      "Cobrança de taxa de reserva/sinal para eliminar faltas em horários nobres",
      "Régua de orientações pós-procedimento (o que fazer nas primeiras 48h)",
      "Reativação de pacientes para retoques no tempo correto"
    ],
    cons: [
      "Exige envio de boas fotos institucionais do espaço e dos tratamentos"
    ],
    
    keyFeatures: [
      "Catálogo Interativo de Procedimentos (Botox, Labial, Fios, Corporal)",
      "Agendamento com Pagamento de Sinal via Pix",
      "Guia Pré e Pós-Procedimento em PDF Automático",
      "Lembretes de Retorno e Manutenção Periódica",
      "Integração com Belle Software e Trinks"
    ],
    integrations: [
      { name: "Belle Software", badge: "Estética" },
      { name: "Trinks", badge: "Beleza" },
      { name: "WhatsApp Business API", badge: "Oficial" },
      { name: "Mercado Pago Pix", badge: "Pagamento" }
    ],
    pricingPlans: [
      {
        name: "Studio Estética",
        price: "R$ 320/mês",
        period: "mensal",
        features: ["1 Profissional", "Catálogo inteligente", "Cobrança de sinal Pix", "Suporte"]
      },
      {
        name: "Clínica de Harmonização",
        price: "R$ 580/mês",
        period: "mensal",
        highlight: true,
        features: ["Até 4 Profissionais", "Régua de retoque periódico", "Integração Belle Software", "Suporte prioritário"]
      }
    ],
    
    estimatedMonthlyHoursSaved: 95,
    estimatedMonthlySavings: 6200,
    paybackPeriodDays: 9,
    
    affiliateUrl: "https://vetorestrategico.com.br/orcamento?servico=bellezabot-estetica",
    couponCode: "BELLEZAVETOR",
    couponDiscount: "10% de Desconto na Assinatura",
    websiteUrl: "https://vetorestrategico.com.br/estetica",
    
    vetorImplementationHours: "3 a 4 dias úteis",
    vetorDeliverables: [
      "Cadastro do catálogo de tratamentos e valores de referência",
      "Criação das réguas de pré e pós-atendimento",
      "Configuração do Pix para reserva de horário",
      "Treinamento da recepcionista e esteticistas"
    ],
    
    reviewsCount: 29,
    reviews: [
      {
        author: "Fernanda Duarte",
        company: "Duarte Estética Avançada",
        segment: "Estética",
        rating: 5,
        comment: "O robô fez nossas faltas caírem a quase zero ao cobrar um sinal de R$ 50 para segurar a agenda do botox. As clientes acharam super profissional.",
        date: "08/08/2026"
      }
    ],
    faqs: [
      {
        question: "Como é feita a cobrança do sinal pelo WhatsApp?",
        answer: "O robô gera o QR Code e o código Pix Copia e Cola na hora. Assim que o pagamento cai, o horário é confirmado automaticamente na agenda."
      }
    ],
    publishedAt: "2026-03-15",
    updatedAt: "2026-08-14"
  },
  {
    id: "tool-leadscore-pro",
    slug: "leadscore-pro",
    name: "LeadScore Pro & Enriquecimento B2B",
    tagline: "Qualificação Automática, Enriquecimento com CNPJ e Roteamento de Leads",
    shortDesc: "Ferramenta de inteligência para empresas B2B que pesquisa o CNPJ do cliente no momento da conversão, descobre o faturamento estimado, porte e entrega o lead classificado para o vendedor certo.",
    fullDesc: "Pare de perder tempo com curiosos ou colocar vendedores seniores para atender leads pequenos. O LeadScore Pro analisa os formulários do seu site, consulta a base da Receita Federal e dados públicos em milissegundos, calcula o fit comercial da oportunidade e envia um alerta detalhado no WhatsApp do executivo de contas.",
    logoBgColor: "bg-purple-600",
    category: "geracao-leads",
    categoryLabel: "Geração & Qualificação de Leads",
    niches: ["vendas-b2b", "contabilidade", "geral"],
    nicheLabels: ["Vendas B2B", "Contabilidade", "Todos os Nichos"],
    pricingType: "pme-acessivel",
    pricingLabel: "Acessível PME",
    startingPrice: "R$ 290",
    pricingPeriod: "/mês",
    complexity: "assistida-vetor",
    complexityLabel: "Implementação Assistida",
    
    rating: 4.8,
    vetorScore: 9.5,
    scores: {
      velocidade: 9.9,
      facilidade: 9.4,
      suporte: 9.5,
      custoBeneficio: 9.6,
      segurancaLgpd: 9.9,
    },
    
    isFeatured: false,
    isVerifiedByVetor: true,
    isSponsored: false,
    isTopChoice: false,
    
    pros: [
      "Enriquecimento instantâneo de dados com CNPJ, CNAE e sócios",
      "Cálculo automático de pontuação de oportunidade (Fit Score)",
      "Distribuição de leads entre vendedores (Round Robin)",
      "Alerta imediato no WhatsApp do vendedor quando entra lead qualificado"
    ],
    cons: [
      "Focado em vendas B2B (menos aplicável para vendas diretas B2C)"
    ],
    
    keyFeatures: [
      "Consulta Automática à Base de CNPJs da Receita Federal",
      "Identificação de Ramo de Atuação, Capital Social e Quadro Societário",
      "Pontuação Preditiva do Lead de 0 a 100",
      "Integração com HubSpot, Pipedrive, RD Station e ActiveCampaign",
      "Disparo de Notificações Internas no Slack e WhatsApp"
    ],
    integrations: [
      { name: "RD Station", badge: "CRM" },
      { name: "HubSpot", badge: "CRM" },
      { name: "Pipedrive", badge: "CRM" },
      { name: "Receita Federal", badge: "Dados" }
    ],
    pricingPlans: [
      {
        name: "Plano Comercial PME",
        price: "R$ 290/mês",
        period: "mensal",
        features: ["Até 500 consultas de CNPJ/mês", "Pontuação automática", "Integração com 1 CRM", "Suporte"]
      },
      {
        name: "Scale B2B",
        price: "R$ 580/mês",
        period: "mensal",
        highlight: true,
        features: ["Até 2.000 consultas/mês", "Roteamento inteligente de vendedores", "Alertas no WhatsApp", "Suporte prioritário"]
      }
    ],
    
    estimatedMonthlyHoursSaved: 75,
    estimatedMonthlySavings: 4900,
    paybackPeriodDays: 11,
    
    affiliateUrl: "https://vetorestrategico.com.br/orcamento?servico=leadscore-pro",
    couponCode: "B2BVETOR",
    couponDiscount: "15% de Desconto nos 3 Primeiros Meses",
    websiteUrl: "https://vetorestrategico.com.br/servicos",
    
    vetorImplementationHours: "2 a 3 dias úteis",
    vetorDeliverables: [
      "Conexão do formulário do site com a API de enriquecimento de CNPJ",
      "Definição das regras de pontuação de fit do cliente ideal",
      "Integração com o CRM e configuração do pipeline",
      "Criação dos alertas automáticos no WhatsApp dos vendedores"
    ],
    
    reviewsCount: 16,
    reviews: [
      {
        author: "Gustavo Alvarenga",
        company: "Nexus Soluções Corporativas",
        segment: "Consultoria B2B",
        rating: 5,
        comment: "Nosso time de vendas liga para a empresa sabendo exatamente o faturamento e o tamanho da equipe. A taxa de conversão em reunião subiu 50%.",
        date: "30/07/2026"
      }
    ],
    faqs: [
      {
        question: "Os dados obtidos estão em conformidade com a LGPD?",
        answer: "Sim. A consulta utiliza exclusivamente dados públicos empresariais (Pessoa Jurídica) disponibilizados pela Receita Federal do Brasil."
      }
    ],
    publishedAt: "2026-03-25",
    updatedAt: "2026-08-11"
  },
  {
    id: "tool-make-n8n-hub",
    slug: "make-n8n-hub",
    name: "Make & n8n Enterprise Hub",
    tagline: "Orquestrador Central de Automações, Webhooks e Conexões de Sistemas",
    shortDesc: "Plataforma de automação visual no-code/low-code que conecta o site da sua empresa ao WhatsApp, CRM, ERP, planilhas e e-mails sem necessidade de programação complexa.",
    fullDesc: "O Make e o n8n são as ferramentas padrão ouro para criar automações personalizadas e orquestrar fluxos de trabalho. Eles funcionam como o cérebro central da empresa: quando um cliente preenche um formulário no site, ele é salvo no banco de dados, cadastrado no CRM, notificado no WhatsApp da diretoria e tem uma tarefa aberta no Trello/Notion em menos de 2 segundos.",
    logoBgColor: "bg-blue-600",
    category: "integracao-sistemas",
    categoryLabel: "Integrações ERP, CRM & Webhooks",
    niches: ["geral", "vendas-b2b", "ecommerce", "contabilidade", "clinicas"],
    nicheLabels: ["Todos os Nichos", "Vendas B2B", "E-commerce", "Contabilidade", "Clínicas"],
    pricingType: "freemium",
    pricingLabel: "Freemium / Acessível",
    startingPrice: "R$ 0",
    pricingPeriod: "(Plano Grátis disponível)",
    complexity: "assistida-vetor",
    complexityLabel: "Implementação Assistida pela Vetor",
    
    rating: 4.9,
    vetorScore: 9.9,
    scores: {
      velocidade: 9.9,
      facilidade: 9.2,
      suporte: 9.6,
      custoBeneficio: 10.0,
      segurancaLgpd: 9.8,
    },
    
    isFeatured: true,
    isVerifiedByVetor: true,
    isSponsored: false,
    isTopChoice: true,
    
    pros: [
      "Mais de 1.500 aplicativos e sistemas prontos para conectar",
      "Plano gratuito generoso e custos muito baixos em produção",
      "Possibilidade de criar lógicas condicionais, filtros e loops avançados",
      "Logs detalhados de cada execução para monitoramento total"
    ],
    cons: [
      "Curva de aprendizado moderada para estruturar fluxos muito complexos"
    ],
    
    keyFeatures: [
      "Conexão de Webhooks Instantâneos em Tempo Real",
      "Disparo de Notificações Automáticas no WhatsApp e E-mail",
      "Sincronização Bidirecional entre Planilhas e Bancos de Dados",
      "Tratamento Automático de Erros e Retentativas",
      "Hospedagem em Nuvem ou Servidor Próprio (Self-Hosted n8n)"
    ],
    integrations: [
      { name: "Google Sheets", badge: "Planilhas" },
      { name: "WhatsApp Cloud API", badge: "Mensagens" },
      { name: "RD Station", badge: "CRM" },
      { name: "Notion / Trello", badge: "Produtividade" },
      { name: "PostgreSQL / MySQL", badge: "Banco" }
    ],
    pricingPlans: [
      {
        name: "Plano Free",
        price: "R$ 0",
        period: "gratuito",
        features: ["Até 1.000 operações/mês", "2 cenários ativos", "Conexão com apps básicos", "Comunidade"]
      },
      {
        name: "Core PME",
        price: "R$ 55/mês ($9/mês)",
        period: "mensal",
        highlight: true,
        features: ["10.000 operações/mês", "Cenários ilimitados", "Execução a cada 1 minuto", "Suporte prioritário"]
      }
    ],
    
    estimatedMonthlyHoursSaved: 140,
    estimatedMonthlySavings: 5800,
    paybackPeriodDays: 5,
    
    affiliateUrl: "https://www.make.com/en/register?pc=vetorestrategico",
    couponCode: "VETORMAKE",
    couponDiscount: "1 Mês Grátis no Plano Pro",
    websiteUrl: "https://www.make.com",
    
    vetorImplementationHours: "24 a 72 horas",
    vetorDeliverables: [
      "Mapeamento da arquitetura de dados e sistemas da empresa",
      "Construção de todos os cenários e orquestrações no Make/n8n",
      "Testes de estresse e validação de segurança com chaves criptografadas",
      "Documentação visual e treinamento da equipe interna"
    ],
    
    reviewsCount: 52,
    reviews: [
      {
        author: "Eduardo Fonseca",
        company: "Fonseca Logística",
        segment: "Transporte & Serviços",
        rating: 5,
        comment: "A equipe da Vetor conectou nosso site ao WhatsApp e à planilha financeira em 2 dias. Acabou o trabalho manual de repassar dados.",
        date: "05/08/2026"
      }
    ],
    faqs: [
      {
        question: "Qual a diferença entre Make e n8n?",
        answer: "O Make é uma plataforma 100% gerenciada em nuvem com interface super amigável. O n8n é de código aberto e pode ser hospedado em servidores próprios para dados ultrassensíveis."
      }
    ],
    publishedAt: "2026-01-05",
    updatedAt: "2026-08-22"
  }
];

export function getToolBySlug(slug: string): DirectoryTool | undefined {
  return DIRECTORY_TOOLS.find((tool) => tool.slug === slug);
}

export function getFeaturedTools(): DirectoryTool[] {
  return DIRECTORY_TOOLS.filter((tool) => tool.isFeatured || tool.isTopChoice);
}

export function getToolsByNiche(niche: ToolNiche): DirectoryTool[] {
  if (niche === "geral") return DIRECTORY_TOOLS;
  return DIRECTORY_TOOLS.filter((tool) => tool.niches.includes(niche));
}

export function getToolsByCategory(category: ToolCategory): DirectoryTool[] {
  return DIRECTORY_TOOLS.filter((tool) => tool.category === category);
}

export function getRelatedTools(currentTool: DirectoryTool, limit = 3): DirectoryTool[] {
  return DIRECTORY_TOOLS.filter(
    (tool) =>
      tool.id !== currentTool.id &&
      (tool.category === currentTool.category ||
        tool.niches.some((n) => currentTool.niches.includes(n)))
  ).slice(0, limit);
}
