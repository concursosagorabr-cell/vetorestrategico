import { CaseStudy, ServiceItem, Testimonial, PricingPlan, BlogPost, FAQItem } from "@/types";

export const COMPANY_INFO = {
  name: "Vetor Estratégico",
  tagline: "Engenharia Web & Automação Inteligente para PMEs",
  headline: "Seu site rápido. Seu atendimento imediato. Mais clientes fechando com a sua empresa.",
  subheadline: "Desenvolvemos sites de alta velocidade focados em conversão e integramos automações que qualificam e atendem seus clientes no WhatsApp sem filas.",
  email: "contato.vetorestrategico@gmail.com",
  phone: "(11) 95309-9049",
  rawPhone: "5511953099049",
  whatsappUrl: "https://wa.me/5511953099049?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20uma%20proposta%20comercial%20com%20a%20Vetor%20Estrat%C3%A9gico.",
  location: "São Paulo - SP & Atendimento Online em Todo o Brasil",
  cnpjPlaceholder: "",
  rating: "5.0",
  satisfactionRate: "Atendimento Personalizado",
  projectsDelivered: "Foco em Qualidade",
  automationsActive: "Engenharia Sob Medida",
  hoursSavedMonth: "Alta Eficiência",
};

export const NAV_LINKS = [
  { label: "Soluções", href: "/servicos" },
  { label: "Projetos", href: "/cases" },
  { label: "Planos", href: "/planos" },
  { label: "Orçamento", href: "/orcamento" },
  { label: "Sobre Nós", href: "/sobre" },
  { label: "Blog", href: "/blog" },
];

export const SERVICES: ServiceItem[] = [
  {
    id: "criacao-de-sites-profissionais",
    title: "Criação de Sites Profissionais & Institucionais",
    shortDesc: "Estruturas modernas, multi-páginas e de carregamento instantâneo para transmitir autoridade máxima e atrair clientes corporativos.",
    fullDesc: "Desenvolvemos a presença institucional da sua empresa com código limpo e moderno, sem templates pesados. Cada página é estruturada para apresentar seus serviços com clareza, destacar diferenciais competitivos e orientar o visitante até o contato comercial, funcionando perfeitamente em celulares, tablets e computadores.",
    iconName: "Globe",
    badge: "Presença & Autoridade",
    benefits: [
      "Desenvolvimento em código moderno com carregamento quase instantâneo",
      "Arquitetura de conteúdo orientada para conversão e geração de orçamentos",
      "Design responsivo otimizado para navegação mobile e desktop",
      "Estrutura técnica preparada para indexação no topo do Google (SEO)"
    ],
    targetAudience: "Consultorias, indústrias, prestadores de serviços B2B, contabilidades, clínicas e empresas em expansão.",
    deliverables: [
      "Plataforma institucional completa (Início, Serviços, Sobre, Contato, Portfólio)",
      "Otimização completa para smartphones e navegadores modernos",
      "Integração direta com WhatsApp comercial e formulários seguros",
      "Configuração de domínio, hospedagem em nuvem e certificado SSL"
    ]
  },
  {
    id: "landing-pages-conversao",
    title: "Landing Pages de Alta Conversão",
    shortDesc: "Páginas de aterrissagem velozes e persuasivas para maximizar o retorno de campanhas no Google Ads e redes sociais.",
    fullDesc: "Elimine o desperdício de verba em anúncios direcionados para páginas lentas ou confusas. Criamos Landing Pages com foco exclusivo em conversão: mensagem direta, quebra de objeções, carregamento em menos de 1 segundo e botões estratégicos de ação para levar o cliente direto ao WhatsApp.",
    iconName: "TrendingUp",
    badge: "Foco em Tráfego & Vendas",
    benefits: [
      "Velocidade extrema de carregamento para reter visitantes de anúncios",
      "Hierarquia visual persuasiva com chamadas claras para ação (CTAs)",
      "Integração com pixels de rastreamento (Google Analytics, Google Tag Manager)",
      "Fluxo simplificado para geração de orçamentos rápidos"
    ],
    targetAudience: "Profissionais liberais, lançamentos de serviços pontuais, negócios locais e operações com campanhas ativas de tráfego pago.",
    deliverables: [
      "Página única de alta conversão estruturada sob medida",
      "Design mobile-first com botões flutuantes de contato",
      "Instalação e verificação de tags de conversão para métricas de anúncios",
      "Publicação rápida e acompanhada no domínio da empresa"
    ]
  },
  {
    id: "seo-tecnico-performance",
    title: "SEO Técnico & Performance Web",
    shortDesc: "Otimização profunda de arquitetura, velocidade e indexação para colocar sua empresa no radar do Google.",
    fullDesc: "Um site bonito que não aparece nas pesquisas perde metade do seu potencial de negócios. Aplicamos as melhores práticas de engenharia web: dados estruturados JSON-LD, sitemap dinâmico, acessibilidade, meta tags e otimização dos índices Core Web Vitals para garantir alto desempenho orgânico.",
    iconName: "BarChart3",
    badge: "Visibilidade Orgânica",
    benefits: [
      "Pontuações elevadas no Google PageSpeed e Core Web Vitals",
      "Marcação de dados estruturados para exibição destacada nos resultados",
      "Arquitetura de silos e URLs limpas para facilitar a navegação do Google",
      "Carregamento leve que reduz a taxa de rejeição de novos usuários"
    ],
    targetAudience: "Portais de notícias, empresas que disputam buscas locais e marcas que buscam clientes orgânicos sem depender apenas de mídia paga.",
    deliverables: [
      "Auditoria e refinamento técnico de performance e código",
      "Configuração de sitemap.xml, robots.txt e OpenGraph para redes sociais",
      "Implementação de esquemas Schema.org (Organization, LocalBusiness, FAQ)",
      "Otimização de imagens, fontes e tempo de resposta do servidor"
    ]
  },
  {
    id: "atendimento-whatsapp-ia",
    title: "Automação de Atendimento no WhatsApp",
    shortDesc: "Atendentes inteligentes que acolhem clientes 24/7, respondem dúvidas e organizam agendamentos sem filas.",
    fullDesc: "Não deixe clientes esperando por horas ou durante a noite. Configuramos agentes de atendimento integrados ao WhatsApp comercial da sua empresa que compreendem linguagem natural, tiram dúvidas frequentes com base nas regras do seu negócio e encaminham oportunidades qualificadas para a sua equipe humana.",
    iconName: "MessageSquare",
    badge: "Atendimento 24/7",
    benefits: [
      "Primeiro contato imediato a qualquer hora do dia ou da noite",
      "Respostas consistentes baseadas nas informações oficiais da empresa",
      "Triagem prévia de serviços, agendamentos e solicitações de orçamento",
      "Encaminhamento humanizado com histórico resumido para os atendentes"
    ],
    targetAudience: "Clínicas, consultórios, imobiliárias, prestadores de serviços e empresas com alto volume diário de mensagens.",
    deliverables: [
      "Agente inteligente configurado com regras, tom de voz e catálogo de serviços",
      "Integração oficial com a API do WhatsApp Business e canais de mensagens",
      "Fluxo de triagem e direcionamento por departamento ou profissional",
      "Treinamento prático da equipe interna para monitoramento e suporte"
    ]
  },
  {
    id: "qualificacao-leads-integracoes",
    title: "Qualificação de Leads & Integração de Sistemas",
    shortDesc: "Conexão inteligente entre formulários, WhatsApp, CRMs e ERPs para eliminar tarefas manuais e acelerar vendas.",
    fullDesc: "Elimine o retrabalho de copiar e colar contatos de planilhas. Conectamos seu site e canal de atendimento diretamente ao seu CRM de vendas, sistema de agendamento ou gestão interna, garantindo que os dados cheguem organizados e prontos para o fechamento comercial.",
    iconName: "Cpu",
    badge: "Eficiência Operacional",
    benefits: [
      "Coleta e validação automática de dados comerciais de novos contatos",
      "Sincronização em tempo real entre o site, WhatsApp e CRM de vendas",
      "Fim da digitação manual repetitiva de pedidos e solicitações",
      "Notificações instantâneas para vendedores quando um lead quente chega"
    ],
    targetAudience: "Empresas B2B, distribuidoras, escritórios de advocacia, consultorias e departamentos comerciais estruturados.",
    deliverables: [
      "Integração de formulários de captura e esteiras de contato",
      "Conexão com plataformas de CRM (HubSpot, Pipedrive, RD Station, etc.)",
      "Validação de informações cadastrais e roteamento de oportunidades",
      "Documentação clara dos fluxos de dados e suporte pós-implantação"
    ]
  },
  {
    id: "consultoria-estrategica-digital",
    title: "Consultoria & Estratégia Digital para Empresas",
    shortDesc: "Diagnóstico completo da presença online e desenho de soluções práticas para aumentar captação e produtividade.",
    fullDesc: "Orientação técnica e comercial para estruturar o posicionamento digital da sua empresa. Mapeamos gargalos de atendimento, pontos de atrito no site atual e oportunidades de automação para desenhar um plano de evolução claro e defensável.",
    iconName: "Users",
    badge: "Visão de Negócio",
    benefits: [
      "Diagnóstico objetivo do site atual, velocidade e jornada do cliente",
      "Identificação de processos manuais passíveis de automação",
      "Roadmap priorizado por impacto comercial e viabilidade técnica",
      "Segurança da informação e conformidade com a LGPD"
    ],
    targetAudience: "Sócios, diretores e gestores de pequenas e médias empresas que buscam modernização estruturada.",
    deliverables: [
      "Dossiê estratégico com oportunidades mapeadas de melhoria digital",
      "Recomendações técnicas de infraestrutura, SEO e canais de contato",
      "Plano de implantação em etapas com estimativas de escopo e cronograma",
      "Sessão de alinhamento estratégico com a diretoria"
    ]
  }
];

export const WEBSITE_PLANS: PricingPlan[] = [
  {
    id: "presenca-essencial",
    name: "1. Presença Essencial & Captação Direta",
    tagline: "Estrutura rápida e persuasiva voltada para captação comercial e contato imediato no WhatsApp.",
    badge: "Captação Ágil",
    price: "Sob Proposta",
    period: "Projeto Personalizado",
    popular: false,
    description: "Ideal para profissionais liberais, comércios locais e empresas que precisam de uma página moderna e objetiva para campanhas de anúncios ou apresentação direta de serviços.",
    deliverables: [
      "Landing Page focada em conversão (Apresentação, Serviços, Diferenciais, Contato)",
      "Design 100% responsivo para smartphones, tablets e computadores",
      "Botão flutuante integrado ao WhatsApp com mensagem personalizada",
      "Formulário seguro de solicitação de orçamento direto no e-mail",
      "Otimização de velocidade de carregamento e tags fundamentais de SEO",
      "Publicação acompanhada no domínio e suporte pós-entrega"
    ],
    idealFor: "Negócios locais, profissionais liberais e empresas iniciando campanhas no Google ou Meta Ads.",
    ctaText: "Solicitar Proposta Essencial",
    ctaHref: "/orcamento"
  },
  {
    id: "plataforma-institucional",
    name: "2. Plataforma Institucional Completa",
    tagline: "Portal multi-páginas, catálogo detalhado de serviços, SEO avançado e máxima autoridade.",
    badge: "Mais Procurado",
    price: "Sob Proposta",
    period: "Projeto Corporativo",
    popular: true,
    description: "A solução completa para empresas consolidadas que buscam autoridade no setor, páginas individuais para cada serviço, área de conteúdo e forte posicionamento no Google.",
    deliverables: [
      "Estrutura multi-páginas (Início, Serviços Detalhados, Projetos, Sobre Nós, Blog, Contato)",
      "Identidade visual contemporânea alinhada ao posicionamento da sua marca",
      "SEO técnico avançado (Schema.org, JSON-LD, Sitemap dinâmico, meta tags estruturadas)",
      "Módulo administrativo/gerenciador para publicação de novidades e artigos",
      "Configuração de pixels e métricas (Google Analytics, Tag Manager, Meta Pixel)",
      "Estrutura escalável preparada para futuras integrações e expansões",
      "Suporte técnico prioritário pós-lançamento"
    ],
    idealFor: "Consultorias, clínicas, escritórios de advocacia, indústrias, contabilidades e empresas em crescimento.",
    ctaText: "Solicitar Proposta Institucional",
    ctaHref: "/orcamento"
  },
  {
    id: "plataforma-automacao",
    name: "3. Plataforma Web com Automação Integrada",
    tagline: "Site institucional completo integrado a agente de atendimento no WhatsApp para qualificação contínua.",
    badge: "Solução Integrada",
    price: "Sob Proposta",
    period: "Projeto + Automação",
    popular: false,
    description: "Une a autoridade de um portal corporativo moderno à agilidade de um assistente inteligente no WhatsApp para atender e qualificar clientes em qualquer dia ou horário.",
    deliverables: [
      "Todos os entregáveis da Plataforma Institucional Completa",
      "Agente de atendimento configurado para o WhatsApp oficial da sua empresa",
      "Acolhimento imediato 24/7 com triagem de dúvidas frequentes e orçamentos",
      "Agendamento de horários ou direcionamento qualificado para a equipe de vendas",
      "Integração do fluxo de mensagens com seu CRM ou planilhas comerciais",
      "Treinamento do agente com as diretrizes e regras do seu negócio",
      "Treinamento prático da equipe para intervenção e acompanhamento"
    ],
    idealFor: "Operações com alto volume de contatos ou que recebem solicitações comerciais fora do horário de expediente.",
    ctaText: "Solicitar Proposta com Automação",
    ctaHref: "/orcamento"
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  ...WEBSITE_PLANS,
  {
    id: "acompanhamento-continuo",
    name: "4. Acompanhamento & Evolução Contínua",
    tagline: "Suporte dedicado para evolução contínua da presença web, integrações e rotinas automatizadas.",
    badge: "Parceria Contínua",
    price: "Sob Consulta",
    period: "Acompanhamento Mensal",
    popular: false,
    description: "Para empresas que buscam aprimoramento constante de suas ferramentas digitais, novas integrações de sistemas e suporte técnico prioritário.",
    deliverables: [
      "Manutenção preventiva, monitoramento de performance e segurança do site",
      "Ajustes e refinamento contínuo dos fluxos de atendimento e automações",
      "Implementação de novas integrações entre ferramentas e sistemas internos",
      "Relatórios periódicos de estabilidade e métricas de navegação",
      "Canal direto de suporte técnico com a equipe de engenharia"
    ],
    idealFor: "Empresas com operação digital ativa que demandam suporte ágil e melhorias recorrentes.",
    ctaText: "Consultar Acompanhamento",
    ctaHref: "/contato?plano=acompanhamento"
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "case-marcos-pintura",
    slug: "marcos-pinturas-sp-presenca-digital-conversao",
    clientName: "Marcos Pinturas SP",
    segment: "Serviços & Pintura Residencial",
    logoText: "Marcos Pinturas SP",
    tagline: "Presença Digital Mobile-First com Foco em Captação no WhatsApp",
    websiteUrl: "https://www.marcospintura.com.br/",
    metrics: [
      { label: "Canal Principal", value: "WhatsApp Direto", highlight: true },
      { label: "Experiência Mobile", value: "Foco em Celular" },
      { label: "Otimização", value: "Buscas Locais SP" }
    ],
    challenge: "Profissional especialista em serviços de pintura em São Paulo que dependia unicamente de indicações informais e precisava de uma presença digital rápida e clara para captar solicitações diretas de orçamento pela internet.",
    solution: "Desenvolvimento de página com navegação mobile-first, apresentação visual dos tipos de acabamento (texturas, efeitos decorativos, impermeabilizações), depoimentos de clientes e chamada direta para o WhatsApp.",
    results: [
      "Estruturação de um canal digital profissional para recebimento de solicitações de orçamento",
      "Carregamento rápido em smartphones mesmo em redes móveis",
      "Presença consolidada nas buscas da região metropolitana de São Paulo"
    ],
    technologies: ["Next.js", "Tailwind CSS", "SEO Local SP", "WhatsApp Direct"],
    testimonial: {
      quote: "A página facilitou muito o meu contato com novos clientes. Quem pesquisa pelo meu trabalho já encontra os serviços explicados e fala direto no meu WhatsApp.",
      author: "Marcos Antonio",
      role: "Especialista em Pintura e Acabamentos"
    }
  },
  {
    id: "case-concursos-agora",
    slug: "portal-concursos-agora-arquitetura-alto-desempenho",
    clientName: "Concursos Agora",
    segment: "Portal de Notícias & Educação",
    logoText: "Concursos Agora",
    tagline: "Portal de Notícias com Arquitetura de Alto Desempenho e Silos de SEO",
    websiteUrl: "https://concursosagora.com.br/",
    metrics: [
      { label: "Arquitetura", value: "Silos Regionais", highlight: true },
      { label: "Performance", value: "Core Web Vitals" },
      { label: "Indexação", value: "Schema JSON-LD" }
    ],
    challenge: "Portal de notícias e editais que precisava de infraestrutura de alta velocidade para suportar grandes volumes de leitores simultâneos, navegação regional intuitiva e indexação rápida no Google Notícias.",
    solution: "Construção de portal em tecnologia web moderna com renderização estática, organização de conteúdo por regiões e estados, estruturação semântica para mecanismos de busca e notas máximas de velocidade.",
    results: [
      "Estabilidade técnica e carregamento veloz mesmo em horários de pico de editais",
      "Arquitetura de navegação clara dividida por regiões brasileiras e carreiras",
      "Código otimizado para rastreamento eficiente pelos motores de busca"
    ],
    technologies: ["Next.js", "Arquitetura Silos SEO", "SSG / ISR", "Core Web Vitals"],
    testimonial: {
      quote: "A estrutura técnica garantiu a velocidade e a estabilidade necessárias para entregar notícias e editais com rapidez a milhares de concurseiros.",
      author: "Equipe Editorial",
      role: "Concursos Agora"
    }
  },
  {
    id: "case-valore-gestao",
    slug: "valore-gestao-posicionamento-institucional",
    clientName: "Valore Gestão",
    segment: "Consultoria Empresarial & B2B",
    logoText: "Valore Gestão",
    tagline: "Plataforma Institucional Corporativa & Qualificação de Contatos",
    websiteUrl: "https://valoregestao.com.br",
    metrics: [
      { label: "Posicionamento", value: "Corporativo B2B", highlight: true },
      { label: "Navegação", value: "Multi-páginas" },
      { label: "Conversão", value: "Formulário & WhatsApp" }
    ],
    challenge: "A consultoria precisava modernizar sua presença digital para transmitir a maturidade dos seus serviços corporativos e facilitar o agendamento de reuniões diagnósticas com decisores de empresas.",
    solution: "Desenvolvimento de site institucional estruturado com apresentação detalhada das áreas de atuação, metodologia de trabalho, formulários de qualificação prévia e integração com canais comerciais.",
    results: [
      "Apresentação clara e elegante das soluções de consultoria e gestão empresarial",
      "Navegação fluida e rápida em dispositivos móveis e computadores",
      "Canal estruturado para captação e triagem de oportunidades comerciais"
    ],
    technologies: ["Next.js", "Tailwind CSS", "SEO Institucional", "Lead Capture"],
    testimonial: {
      quote: "O novo site reposicionou nossa comunicação no mercado corporativo, permitindo que potenciais clientes compreendam nosso valor antes da primeira reunião.",
      author: "Eduardo Fonseca",
      role: "Sócio Diretor"
    }
  },
  {
    id: "case-odontoprime",
    slug: "odontoprime-atendimento-triagem-clinica",
    clientName: "OdontoPrime",
    segment: "Saúde & Clínicas Odontológicas",
    logoText: "OdontoPrime",
    tagline: "Página Institucional & Triagem Automatizada de Pacientes",
    websiteUrl: "https://odontoprime.com.br",
    metrics: [
      { label: "Disponibilidade", value: "Atendimento 24/7", highlight: true },
      { label: "Triagem", value: "Especialidades" },
      { label: "Canal", value: "WhatsApp Oficial" }
    ],
    challenge: "A clínica recebia diversas mensagens de pacientes buscando informações de tratamentos e horários em períodos noturnos e finais de semana, gerando sobrecarga na recepção e demora no primeiro retorno.",
    solution: "Implementação de página moderna com catálogo de tratamentos aliada a um fluxo automatizado e humanizado de atendimento no WhatsApp para triagem inicial de especialidades e orientações gerais.",
    results: [
      "Acolhimento imediato de pacientes fora do expediente comercial",
      "Recepção liberada de dúvidas repetitivas para focar no atendimento presencial",
      "Organização prévia das informações antes do agendamento final"
    ],
    technologies: ["WhatsApp Business API", "Fluxo Automatizado", "Integração Clínica", "Design Mobile"],
    testimonial: {
      quote: "A organização do atendimento pelo WhatsApp permitiu acolher nossos pacientes imediatamente, mesmo à noite, facilitando o trabalho da recepção.",
      author: "Dra. Carolina Mendes",
      role: "Diretora Clínica"
    }
  }
];

export const TECHNICAL_BENEFITS = [
  {
    icon: "Globe",
    title: "Desenvolvimento com Foco Comercial",
    description: "Estruturas planejadas para orientar o visitante com clareza e facilitar o contato direto com a sua equipe."
  },
  {
    icon: "ShieldCheck",
    title: "Conformidade Total com a LGPD",
    description: "Tratamento ético e seguro de dados, formulários protegidos e respeito integral à legislação brasileira de privacidade."
  },
  {
    icon: "Layers",
    title: "Integração aos seus Canais Atuais",
    description: "Conectamos o site e automações diretamente ao seu WhatsApp Business, CRMs e rotinas onde seu time já opera."
  },
  {
    icon: "Target",
    title: "Soluções Desenhadas para PMEs",
    description: "Projetos dimensionados para a realidade prática de empresas em crescimento, sem complexidades desnecessárias."
  },
  {
    icon: "Zap",
    title: "Carregamento Rápido em Qualquer Dispositivo",
    description: "Código leve e moderno que abre rapidamente em celulares, evitando a desistência precoce do visitante."
  },
  {
    icon: "Headphones",
    title: "Atendimento Próximo e Direto",
    description: "Contato transparente diretamente com especialistas técnicos durante todo o planejamento e entrega do projeto."
  },
  {
    icon: "Sliders",
    title: "Encaminhamento Humanizado",
    description: "Fluxos inteligentes de atendimento que sabem quando transferir a conversa para um atendente humano com o histórico pronto."
  },
  {
    icon: "Server",
    title: "Hospedagem Estável e Segura",
    description: "Infraestrutura moderna em nuvem com certificado SSL ativo e estabilidade para suportar picos de acessos."
  },
  {
    icon: "Lock",
    title: "Privacidade e Proteção de Dados",
    description: "Garantia de que as informações estratégicas da sua empresa permanecem sob controle restrito e seguro."
  },
  {
    icon: "BarChart2",
    title: "Estrutura Pronta para Mensuração",
    description: "Configuração de métricas para acompanhar de onde vêm os visitantes e quantas pessoas clicam nos botões de contato."
  },
  {
    icon: "GraduationCap",
    title: "Autonomia e Orientação Pós-Entrega",
    description: "Orientações práticas para que sua equipe saiba como utilizar a estrutura e atualizar conteúdos com facilidade."
  },
  {
    icon: "TrendingUp",
    title: "Otimização Contínua para o Google",
    description: "Boas práticas de indexação e arquitetura semântica para fortalecer o posicionamento orgânico da marca."
  }
];

export const SOLUTION_TYPES = [
  {
    title: "Sites Institucionais & Corporativos",
    desc: "Plataformas estruturadas para posicionar marcas e apresentar serviços com solidez.",
    icon: "Globe"
  },
  {
    title: "Landing Pages de Captação",
    desc: "Páginas diretas e velozes para transformar visitantes de anúncios em contatos no WhatsApp.",
    icon: "Target"
  },
  {
    title: "Atendimento Automatizado no WhatsApp",
    desc: "Acolhimento contínuo 24/7 com respostas claras e triagem de solicitações.",
    icon: "MessageCircle"
  },
  {
    title: "Qualificação Prévia de Contatos",
    desc: "Filtragem inicial de dúvidas e necessidades para entregar contatos prontos aos vendedores.",
    icon: "UserCheck"
  },
  {
    title: "Integração entre Formulários & CRMs",
    desc: "Sincronização de dados comerciais direto no software onde sua equipe trabalha.",
    icon: "GitMerge"
  },
  {
    title: "SEO Técnico & Otimização de Performance",
    desc: "Estruturação profunda de código para carregamento rápido e indexação eficiente no Google.",
    icon: "BarChart3"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-0",
    name: "Eduardo Fonseca",
    role: "Sócio Diretor",
    company: "Valore Gestão",
    segment: "Consultoria Empresarial",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    content: "O novo site desenvolvido pela Vetor Estratégico organizou nossa presença corporativa. A apresentação dos serviços ficou clara e o contato pelo WhatsApp se tornou o principal canal de chegada de novas empresas.",
    metricHighlight: "Presença Corporativa Sólida"
  },
  {
    id: "test-1",
    name: "Dra. Carolina Mendes",
    role: "Diretora Clínica",
    company: "OdontoPrime",
    segment: "Saúde & Clínicas",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    content: "A estruturação da página e do fluxo de mensagens no WhatsApp facilitou o acolhimento de pacientes fora do horário comercial, permitindo que a recepção trabalhe com mais tranquilidade durante o dia.",
    metricHighlight: "Atendimento Organizado 24/7"
  },
  {
    id: "test-2",
    name: "Marcos Antonio",
    role: "Especialista em Pintura",
    company: "Marcos Pinturas SP",
    segment: "Prestação de Serviços",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80",
    content: "A página no celular é rápida e direta. Os clientes que encontram meu trabalho já veem fotos dos serviços de acabamento e entram em contato direto pelo WhatsApp para pedir orçamento.",
    metricHighlight: "Captação Direta no Celular"
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "Quanto custa o desenvolvimento de um site ou automação?",
    answer: "O investimento varia de acordo com o escopo e objetivos da sua empresa: landing pages de captação partem de valores promocionais acessíveis para novos clientes (a partir de R$ 900 a R$ 1.400), enquanto plataformas institucionais multi-páginas e soluções com automação no WhatsApp possuem propostas sob medida. Você pode simular na nossa calculadora de orçamento online."
  },
  {
    question: "Quanto custa a manutenção e hospedagem para manter o site no ar?",
    answer: "A taxa de manutenção e hospedagem básica é de apenas R$ 147/mês. Ela inclui hospedagem em servidores de alta velocidade, certificado de segurança SSL ativo, monitoramento de estabilidade e suporte técnico contínuo para manter seu site sempre funcionando perfeitamente."
  },
  {
    question: "Qual é o prazo de entrega de um projeto?",
    answer: "Páginas focadas em captação são entregues em poucos dias úteis após o alinhamento de conteúdo e escopo inicial. Projetos institucionais completos ou com integração de automações seguem um cronograma estruturado em etapas, sempre validado previamente na proposta comercial."
  },
  {
    question: "Eu preciso já ter domínio registrado e hospedagem?",
    answer: "Não se preocupe se ainda não tiver. Orientamos você no registro oficial do domínio em nome da sua empresa (ex: suaempresa.com.br) e configuramos servidores modernos em nuvem com certificado de segurança SSL incluso."
  },
  {
    question: "O site funcionará com rapidez no celular?",
    answer: "Sim, com certeza. Desenvolvemos todos os projetos com prioridade mobile (mobile-first), assegurando que o usuário que navega pelo smartphone tenha carregamento veloz, botões de contato acessíveis e leitura fluida."
  },
  {
    question: "Como o WhatsApp é integrado ao site?",
    answer: "Inserimos botões flutuantes e chamadas estratégicas ao longo da página com mensagens pré-formatadas de acordo com o serviço visualizado pelo visitante, facilitando o início do atendimento pela sua equipe."
  },
  {
    question: "Como funciona o atendimento automatizado ou agente no WhatsApp?",
    answer: "O assistente inteligente é configurado estritamente com as informações oficiais da sua empresa (serviços, regras, dúvidas frequentes). Ele acolhe o visitante no WhatsApp a qualquer hora, esclarece dúvidas básicas e encaminha contatos qualificados para os seus atendentes humanos."
  },
  {
    question: "Os dados da minha empresa e dos meus clientes estão seguros com a LGPD?",
    answer: "Sim. Todas as soluções são construídas em conformidade com as diretrizes da Lei Geral de Proteção de Dados (LGPD), garantindo armazenamento protegido, criptografia e respeito integral à privacidade."
  },
  {
    question: "Minha empresa terá autonomia para atualizar textos e informações?",
    answer: "Sim. Estruturamos os projetos para que sua equipe possa gerenciar conteúdos com facilidade, além de disponibilizarmos suporte técnico para manutenções e novas implementações."
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-0",
    slug: "por-que-sua-empresa-precisa-de-um-site-rapido-e-focado-em-whatsapp",
    title: "Por que ter um site rápido com canal direto de WhatsApp é essencial para empresas em crescimento",
    excerpt: "Entenda como o carregamento instantâneo e a facilidade de contato direto reduzem drasticamente a perda de potenciais clientes no ambiente digital.",
    category: "Presença Digital & Vendas",
    readTime: "4 min de leitura",
    publishDate: "25 Ago 2026",
    coverImage: "/images/blog/blog-speed-whatsapp.jpg",
    author: {
      name: "Equipe Vetor Estratégico",
      role: "Especialistas em Engenharia Web & Estratégia Comercial",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
    },
    tags: ["Desenvolvimento Web", "WhatsApp Comercial", "PMEs", "Performance"],
    content: `
# Por que ter um site rápido com canal direto de WhatsApp é essencial para empresas em crescimento

A presença digital de uma empresa moderna não é apenas um cartão de visitas — é o principal canal de aquisição de novos clientes no dia a dia.

No mercado brasileiro, o comportamento do consumidor é extremamente ágil e imediatista. Quando um tomador de decisão ou consumidor final pesquisa por um serviço no Google, ele busca duas coisas fundamentais: **confiança imediata** e **facilidade de contato**.

## 1. O impacto de páginas lentas na conversão de anúncios
Muitas empresas ainda mantêm sites pesados, criados em plataformas defasadas ou templates genéricos que demoram de 4 a 8 segundos para abrir em conexões móveis (4G/5G).

Dados do Google indicam que se uma página leva mais de **3 segundos para carregar**, a probabilidade de rejeição aumenta em mais de **32%**. Na prática:
- Você investe em anúncios no Google Ads ou Meta Ads;
- O visitante clica no anúncio;
- A tela fica em branco ou travada carregando scripts pesados;
- O visitante desiste, volta ao Google e clica no seu concorrente.

> **Velocidade não é apenas conforto estético — é redução direta do seu Custo de Aquisição de Clientes (CAC).**

## 2. O WhatsApp como padrão definitivo de fechamento comercial
No Brasil, mais de 98% dos smartphones possuem o WhatsApp instalado, e o aplicativo é a principal ferramenta de comunicação comercial do país. Formulários de contato tradicionais com 10 campos obrigatórios apresentam taxas de abandono superiores a 70%.

Ao direcionar o visitante qualificado do site diretamente para uma conversa estruturada no WhatsApp:
- O cliente sente que está falando com uma empresa viva e acessível;
- A sua equipe comercial recebe a notificação no mesmo segundo;
- O tempo médio de primeiro contato cai de horas para segundos.

## 3. Os 4 pilares de um site de alta conversão
1. **Engenharia Web Moderna:** Desenvolvimento em código limpo (Next.js / Tailwind CSS) com renderização estática e carregamento sub-segundo.
2. **Copywriting Orientado a Negócios:** Explicação clara do problema que sua empresa resolve logo na primeira dobra da página.
3. **Chamadas Estratégicas para Ação (CTAs):** Botões flutuantes e botões de seção que abrem o WhatsApp com mensagens personalizadas de acordo com o serviço visualizado.
4. **SEO Técnico Estruturado:** Marcação de dados estruturados Schema.org para posicionamento no topo do Google.

Na **Vetor Estratégico**, construímos páginas corporativas e plataformas de captação pensadas para o dia a dia comercial de empresas reais.
    `
  },
  {
    id: "blog-1",
    slug: "como-o-atendimento-organizado-no-whatsapp-evita-perda-de-clientes",
    title: "Como estruturar o atendimento no WhatsApp para não perder contatos fora do expediente",
    excerpt: "Acolhimento imediato e triagem inteligente de dúvidas ajudam empresas a manter oportunidades ativas mesmo em noites e finais de semana.",
    category: "Atendimento Comercial",
    readTime: "5 min de leitura",
    publishDate: "24 Ago 2026",
    coverImage: "/images/blog/blog-whatsapp-atendimento.jpg",
    author: {
      name: "Equipe Vetor Estratégico",
      role: "Especialistas em Automação & Atendimento",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
    },
    tags: ["WhatsApp", "Atendimento 24/7", "Produtividade", "Organização Comercial"],
    content: `
# Como estruturar o atendimento no WhatsApp para não perder contatos fora do expediente

O WhatsApp se consolidou como o principal canal comercial no Brasil. Contudo, responder com agilidade e consistência a todas as solicitações é um dos maiores desafios de equipes enxutas.

Mais de **40% das buscas por serviços acontecem fora do horário comercial tradicional** — noites, feriados e finais de semana. Quando um potencial cliente pesquisa por um serviço às 21h e encontra sua empresa, a expectativa de retorno é imediata.

## O perigo do vácuo de atendimento
Se o cliente envia uma mensagem e não recebe retorno até as 9h do dia seguinte:
1. Ele já continuou navegando e enviou mensagens para outras 3 empresas concorrentes;
2. A primeira empresa que responder ou acolher de forma profissional ficará com a negociação;
3. O interesse inicial esfria, transformando um lead quente em um contato frio.

## Chatbots engessados vs. Agentes Inteligentes de IA
Durante anos, as empresas utilizaram menus numéricos rígidos (*"Digite 1 para orçamentos, digite 2 para financeiro"*). Esse modelo frequentemente frustra clientes.

A nova geração de automações utiliza **Modelos de Linguagem e IA generativa orientada a regras**:
- **Compreensão em Linguagem Natural:** O cliente pode mandar mensagens com erros de digitação ou áudios, e o assistente compreende perfeitamente o contexto.
- **Tira-dúvidas Oficial:** Responde preços médios, prazos, especialidades e localização estritamente com base na documentação da sua empresa.
- **Triagem Prévia:** Pergunta o serviço desejado, localização e urgência antes de repassar para o vendedor.
- **Resumo Executivo para a Equipe:** Quando o atendente humano assume a conversa no dia seguinte, ele já recebe o resumo completo do que o cliente precisa.

## Como implantar em sua empresa
1. Mapeie as 10 principais perguntas que seus clientes fazem todos os dias.
2. Defina os critérios de qualificação (ex: tipo de serviço, orçamento estimado).
3. Integre a automação com a API oficial do WhatsApp Business.
4. Conecte com seu sistema de gestão ou CRM para que nenhum dado se perca.
    `
  },
  {
    id: "blog-2",
    slug: "guia-seo-tecnico-2026-como-posicionar-sua-empresa-no-google",
    title: "Guia de SEO Técnico em 2026: Como Colocar sua Empresa no Topo do Google",
    excerpt: "Descubra as práticas modernas de arquitetura web, marcação Schema.org e velocidade que garantem indexação e autoridade orgânica para o seu negócio.",
    category: "Tráfego Orgânico & SEO",
    readTime: "7 min de leitura",
    publishDate: "23 Ago 2026",
    coverImage: "/images/blog/blog-seo-tecnico.jpg",
    author: {
      name: "Equipe Vetor Estratégico",
      role: "Especialistas em SEO Técnico & Engenharia Web",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
    },
    tags: ["SEO Técnico", "Google Rank", "Core Web Vitals", "JSON-LD"],
    content: `
# Guia de SEO Técnico em 2026: Como Colocar sua Empresa no Topo do Google

Muitos empresários investem na criação de sites visualmente atraentes, mas se frustram ao notar que a página não recebe nenhuma visita orgânica através das pesquisas do Google.

O motivo é simples: **design visual é feito para pessoas, mas SEO técnico é feito para os robôs indexadores do Google**. Em 2026, com a evolução das buscas inteligentes e IA generativa nos mecanismos de busca, os critérios técnicos de ranqueamento tornaram-se mais rigorosos do que nunca.

## 1. Dados Estruturados (JSON-LD & Schema.org)
Os robôs do Google não "leem" uma página como seres humanos. Eles buscam marcações semânticas que expliquem o que a empresa faz, onde opera e quais serviços oferece.

Implementar esquemas Schema.org estruturados no código fonte permite ao Google exibir **Rich Snippets** (resultados ricos com estrelas de avaliação, perguntas frequentes sanadas diretamente na busca e cartões empresariais locais).

## 2. Core Web Vitals e PageSpeed como fator de desempate
O Google prioriza abertamente páginas que oferecem excelente experiência de navegação:
- **LCP (Largest Contentful Paint):** O conteúdo principal deve renderizar em menos de 2.5 segundos (nos projetos da Vetor Estratégico, miramos < 1.0s).
- **INP (Interaction to Next Paint):** A página deve responder a cliques e toques em menos de 200 milissegundos.
- **CLS (Cumulative Layout Shift):** Nenhum elemento deve pular na tela enquanto as imagens carregam.

## 3. Arquitetura de Silos e URLs Amigáveis
Organizar o site em silos temáticos claros (ex: \`/servicos\`, \`/clinicas\`, \`/advocacia\`) permite ao mecanismo de busca entender exatamente a autoridade do seu domínio para cada segmento de busca.

## 4. Checklist Prático de SEO Técnico
- Certificado de segurança SSL ativo e sem conteúdo misto (HTTPS obrigatório).
- Sitemap XML dinâmico enviado ao Google Search Console.
- Meta tags OpenGraph completas para visualização em redes sociais e WhatsApp.
- Hierarquia semântica correta: apenas um \`<h1>\` por página e distribuição lógica de \`<h2>\` e \`<h3>\`.
    `
  },
  {
    id: "blog-3",
    slug: "quanto-custa-criar-um-site-profissional-para-pme",
    title: "Quanto Custa Criar um Site Profissional para Pequenas e Médias Empresas em 2026?",
    excerpt: "Entenda a composição de preços, o que difere templates baratos de plataformas corporativas e como calcular o retorno sobre o investimento (ROI).",
    category: "Negócios & Investimento",
    readTime: "6 min de leitura",
    publishDate: "22 Ago 2026",
    coverImage: "/images/blog/blog-custo-site-pme.jpg",
    author: {
      name: "Equipe Vetor Estratégico",
      role: "Estratégia & Precificação Digital",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
    },
    tags: ["Orçamento", "Criação de Sites", "Investimento", "ROI"],
    content: `
# Quanto Custa Criar um Site Profissional para Pequenas e Médias Empresas em 2026?

Uma das perguntas mais comuns de empresários e gestores é: *quanto custa, na prática, desenvolver um site profissional para a minha empresa?*

Os valores no mercado brasileiro variam consideravelmente, desde plataformas gratuitas de "faça você mesmo" até agências tradicionais que cobram mais de R$ 30.000 por projeto. Para tomar uma decisão segura, é fundamental compreender o que está incluído em cada faixa de investimento.

## 1. As três faixas de mercado no Brasil

### Faixa 1: Construtores Genéricos e Freelancers Iniciantes (R$ 500 a R$ 1.200)
- **O que é entregue:** Templates pré-fabricados instalados sem personalização profunda.
- **Vantagens:** Baixo custo inicial.
- **Desvantagens:** Carregamento lento, vulnerabilidade a invasões por plugins desatualizados, SEO nulo e falta de suporte quando a empresa cresce.

### Faixa 2: Engenharia Web Sob Medida & Foco em Conversão (R$ 1.500 a R$ 6.000)
- **O que é entregue:** Código próprio em Next.js/React, design mobile-first exclusivo, integração direta com WhatsApp comercial, SEO técnico avançado e carregamento em menos de 1 segundo.
- **Vantagens:** Alta autoridade para a marca, segurança total, autonomia de edição e suporte dedicado.
- **Ideal para:** PMEs, clínicas, consultorias, indústrias e prestadores de serviços que dependem da internet para fechar contratos.

### Faixa 3: Grandes Projetos Corporativos e Plataformas Customizadas (R$ 8.000 a R$ 25.000+)
- **O que é entregue:** Múltiplas integrações com ERPs, área de membros com login restrito, agentes customizados de IA e automações avançadas de atendimento.

## 2. Custos Recorrentes Essenciais
Para manter um site ativo e seguro no ar, você terá apenas dois custos recorrentes:
1. **Domínio próprio (ex: suaempresa.com.br):** Cerca de R$ 40 a R$ 60 por ano no Registro.br.
2. **Hospedagem em nuvem e manutenção preventiva:** Cerca de R$ 147/mês para servidores velozes com certificado SSL e monitoramento 24/7.

## 3. Como calcular o retorno do investimento (ROI)
Se um site profissional custa R$ 2.500 e gera **apenas 2 novos clientes de médio porte por mês**, o investimento total se paga integralmente nas primeiras semanas de operação.
    `
  },
  {
    id: "blog-4",
    slug: "7-sinais-que-seu-site-atual-esta-travando-vendas",
    title: "7 Sinais Claros de que seu Site Atual Está Travando o Crescimento da sua Empresa",
    excerpt: "Identifique gargalos invisíveis de lentidão, navegação confusa e falta de canais diretos que fazem sua empresa perder clientes todos os dias.",
    category: "Otimização & Conversão",
    readTime: "5 min de leitura",
    publishDate: "21 Ago 2026",
    coverImage: "/images/blog/blog-sinais-site-travado.jpg",
    author: {
      name: "Equipe Vetor Estratégico",
      role: "Auditoria & Performance Digital",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
    },
    tags: ["Conversão", "Auditoria Web", "Mobile First", "Vendas Online"],
    content: `
# 7 Sinais Claros de que seu Site Atual Está Travando o Crescimento da sua Empresa

Muitos empresários acreditam que "ter um site no ar" é suficiente. No entanto, um site desatualizado, lento ou mal estruturado pode estar afastando potenciais clientes em vez de atraí-los.

Se a sua empresa investe em marketing ou prospecção mas não vê os resultados refletidos em orçamentos, confira os 7 sinais mais comuns de que seu site precisa de uma modernização urgente:

## 1. Carregamento superior a 3 segundos no celular
Mais de 75% dos acessos B2B e B2C ocorrem através de smartphones. Se sua página engasga ou demora para abrir, o visitante fecha a aba antes mesmo de ver seu logotipo.

## 2. Não possui botão direto e flutuante de WhatsApp
Exigir que o cliente preencha um formulário extenso ou copie um telefone manualmente para a agenda gera atrito desnecessário. O contato comercial deve estar a um clique de distância.

## 3. A proposta de valor não é clara em 5 segundos
Quando alguém abre sua página inicial, ela consegue entender imediatamente o que sua empresa faz, para quem faz e qual o principal diferencial? Se precisar rolar 3 telas para descobrir, a mensagem falhou.

## 4. O site não aparece nas buscas do Google
Se ao pesquisar pelo seu serviço na sua cidade ou estado o seu site não aparece na primeira página, sua empresa está invisível para clientes que já têm intenção de compra.

## 5. Falta de certificados e conformidade com a LGPD
Páginas com aviso de "Não Seguro" no navegador afastam clientes corporativos e violam diretrizes de privacidade de dados.

## 6. Design visual defasado em relação aos concorrentes
O cliente julga a competência técnica dos seus serviços com base na sofisticação da sua presença digital. Um site visualmente amador transmite sensação de empresa desorganizada.

## 7. Ausência de métricas e rastreamento de cliques
Se você não sabe quantos visitantes chegam ao site por dia e quantos clicam no botão de WhatsApp, é impossível saber se suas ações de marketing estão funcionando.
    `
  },
  {
    id: "blog-5",
    slug: "como-agentes-de-ia-no-whatsapp-triam-leads-sem-intervencao-humana",
    title: "Como Agentes de IA no WhatsApp Triam e Qualificam Leads em Tempo Real",
    excerpt: "Veja como a inteligência artificial conversa em linguagem natural, tira dúvidas frequentes e entrega oportunidades prontas para seus vendedores.",
    category: "Inteligência Artificial",
    readTime: "6 min de leitura",
    publishDate: "20 Ago 2026",
    coverImage: "/images/blog/blog-ia-triagem-leads.jpg",
    author: {
      name: "Equipe Vetor Estratégico",
      role: "Engenharia de Automação & IA",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
    },
    tags: ["Agentes de IA", "WhatsApp Business", "Qualificação de Leads", "Automação"],
    content: `
# Como Agentes de IA no WhatsApp Triam e Qualificam Leads em Tempo Real

A triagem manual de contatos no WhatsApp consome horas preciosas de recepcionistas, assistentes e vendedores. Muitas mensagens são dúvidas repetitivas sobre preços, localização, horários ou escopo de serviços.

Com a evolução dos agentes inteligentes de IA integrados à API oficial do WhatsApp Business, as empresas conseguem automatizar 80% do primeiro atendimento sem perder a humanização.

## Como funciona o fluxo de triagem inteligente:
1. **Recepção Imediata:** O cliente clica no anúncio ou no site e envia uma mensagem. A IA responde em menos de 3 segundos, acolhendo o cliente pelo nome.
2. **Interpretação Semântica:** A IA compreende frases complexas, gírias e intenções de compra sem exigir que o usuário digite números ou navegue em menus chatos.
3. **Esclarecimento de Dúvidas Oficiais:** O agente tira dúvidas com base estrita no catálogo de serviços da sua empresa.
4. **Coleta de Dados Estratégicos:** A IA solicita cordialmente o nome, empresa, e-mail e urgência do serviço.
5. **Roteamento Qualificado:** Se o lead demonstra interesse real e perfil ideal, o agente transfere a conversa para o vendedor responsável com o histórico pronto.

## Principais ganhos para a operação da empresa:
- **Zero tempo de espera** para novos contatos em qualquer horário do dia ou da noite.
- **Filtro automático de curiosos**, poupando tempo valioso da equipe humana de vendas.
- **Padronização do atendimento** com o tom de voz e regras oficiais da sua marca.
    `
  },
  {
    id: "blog-6",
    slug: "landing-page-ou-site-institucional-qual-o-melhor-para-seu-momento",
    title: "Landing Page ou Site Institucional Completo: Qual a Melhor Escolha para a sua Empresa?",
    excerpt: "Descubra as diferenças estratégicas entre páginas únicas focadas em tráfego pago e portais multi-páginas de autoridade para o seu negócio.",
    category: "Estratégia Digital",
    readTime: "5 min de leitura",
    publishDate: "19 Ago 2026",
    coverImage: "/images/blog/blog-lp-vs-site.jpg",
    author: {
      name: "Equipe Vetor Estratégico",
      role: "Especialistas em Estratégia Digital",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
    },
    tags: ["Landing Page", "Site Institucional", "Tráfego Pago", "Estratégia"],
    content: `
# Landing Page ou Site Institucional Completo: Qual a Melhor Escolha para a sua Empresa?

Uma das principais dúvidas de empresários ao planejar sua presença online é definir o formato ideal do projeto: **Landing Page única de captação** ou **Site Institucional multi-páginas**.

Cada uma dessas estruturas atende a objetivos estratégicos diferentes. Entenda qual modelo melhor se encaixa no momento atual da sua empresa:

## 1. Landing Page de Alta Conversão (Página Única)
- **Foco Principal:** Transformar visitantes vindos de anúncios (Google Ads, Meta Ads) em contatos imediatos no WhatsApp ou formulários de orçamento.
- **Estrutura:** Uma única página contínua, sem links externos para dispersar a atenção, com títulos persuasivos, prova social, tabela de benefícios e chamadas claras para ação.
- **Quando escolher:**
  - Lançamento de um serviço ou produto específico;
  - Campanhas ativas de tráfego pago;
  - Necessidade de entrega extremamente rápida com investimento enxuto.

## 2. Plataforma Institucional Completa (Multi-Páginas)
- **Foco Principal:** Posicionamento de autoridade no mercado, apresentação detalhada de múltiplos serviços, área de projetos/cases, blog e SEO orgânico no Google.
- **Estrutura:** Múltiplas páginas integradas (Início, Sobre Nós, Serviços Individuais, Cases de Sucesso, Blog, Contato, Orçamento).
- **Quando escolher:**
  - Empresas consolidadas que atendem clientes B2B exigentes;
  - Negócios com diversos serviços que exigem explicações técnicas aprofundadas;
  - Empresas que desejam ranquear organicamente no topo das pesquisas do Google.

## Resumo Comparativo
Se seu objetivo imediato é validar uma oferta em campanhas de anúncios, comece com uma **Landing Page**. Se o seu objetivo é construir autoridade corporativa duradoura e atrair clientes sem depender unicamente de anúncios pagos, invista em um **Site Institucional Completo**.
    `
  },
  {
    id: "blog-7",
    slug: "arquitetura-de-sites-modernos-como-estruturar-para-escalar",
    title: "Arquitetura de Sites de Alta Performance: O Que Faz um Site Abrir em Menos de 1 Segundo",
    excerpt: "Conheça os segredos de engenharia de software, renderização estática e CDNs globais que separam sites ultrarrápidos de páginas pesadas.",
    category: "Engenharia Web",
    readTime: "6 min de leitura",
    publishDate: "18 Ago 2026",
    coverImage: "/images/blog/blog-arquitetura-performance.jpg",
    author: {
      name: "Equipe Vetor Estratégico",
      role: "Arquitetura de Software & Performance",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
    },
    tags: ["Engenharia Web", "Next.js", "Performance", "Arquitetura"],
    content: `
# Arquitetura de Sites de Alta Performance: O Que Faz um Site Abrir em Menos de 1 Segundo

A velocidade de um site não depende de "sorte" ou apenas da conexão do usuário — ela é o resultado direto das escolhas arquiteturais de engenharia de software feitas durante o desenvolvimento.

Muitos sites ainda utilizam arquiteturas legadas onde cada acesso precisa consultar um banco de dados distante e processar centenas de plugins no servidor antes de enviar o primeiro pixel para o navegador.

## Os pilares da arquitetura moderna de alto desempenho:

### 1. Renderização Estática (SSG & ISR)
Em vez de processar a página do zero a cada visita, o código HTML e CSS é pré-compilado e distribuído em servidores de borda (Edge CDNs) ao redor do mundo. Quando o usuário clica no link, a página já está pronta para exibição instantânea.

### 2. Otimização de Recursos Gráficos
- Conversão automática de imagens pesadas para formatos modernos como **WebP e AVIF**.
- Dimensionamento responsivo (\`srcset\` e \`sizes\`) para que smartphones não baixem imagens em resolução 4K desnecessariamente.
- Carregamento postergado (*Lazy Loading*) para elementos que estão fora da tela inicial.

### 3. Código Limpo e Modular (Next.js & Tailwind CSS)
Ao eliminar dezenas de bibliotecas pesadas e plugins desnecessários, o tamanho total da página cai de 8 MB para menos de 500 KB, garantindo abertura instantânea mesmo no 3G/4G.
    `
  },
  {
    id: "blog-8",
    slug: "checklist-tecnico-antes-de-contratar-desenvolvimento-de-sites",
    title: "Checklist Técnico Definitivo Antes de Contratar Desenvolvimento de Sites",
    excerpt: "As perguntas essenciais que todo gestor deve fazer antes de fechar contrato com agências ou desenvolvedores para evitar prejuízos.",
    category: "Contratação & Gestão",
    readTime: "5 min de leitura",
    publishDate: "17 Ago 2026",
    coverImage: "/images/blog/blog-checklist-contratacao.jpg",
    author: {
      name: "Equipe Vetor Estratégico",
      role: "Consultoria & Governança Digital",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
    },
    tags: ["Checklist", "Contratação", "Gestão", "PMEs"],
    content: `
# Checklist Técnico Definitivo Antes de Contratar Desenvolvimento de Sites

Contratar o desenvolvimento de um site corporativo é um passo crucial para qualquer empresa. No entanto, muitos gestores enfrentam problemas como atrasos recorrentes, páginas lentas e contratos que prendem o cliente a mensalidades abusivas.

Para proteger sua empresa e garantir um projeto de alto nível, utilize este checklist técnico nas suas reuniões comerciais:

## As 7 perguntas obrigatórias:
1. **O código fonte e o domínio serão de propriedade 100% da minha empresa?** (Exija que domínio e arquivos fiquem registrados em nome do seu CNPJ).
2. **Qual é a pontuação garantida no Google PageSpeed e Core Web Vitals?** (Empresas de engenharia sérias garantem notas acima de 90 no celular e desktop).
3. **O site será construído em tecnologia moderna ou em templates pesados de terceiros?** (Prefira código moderno em Next.js/React com alta velocidade).
4. **Como é estruturado o SEO técnico e a marcação de dados para o Google?** (Pergunte sobre Schema.org, sitemap dinâmico e URLs semânticas).
5. **O site inclui integração direta e botões flutuantes de WhatsApp?** (Essencial para conversão imediata no mercado brasileiro).
6. **Está em total conformidade com a LGPD e certificado SSL ativo?** (Proteção jurídica e de segurança para você e seus clientes).
7. **Como funciona o suporte e autonomia para alteração de textos pós-entrega?** (Garanta que sua equipe consiga atualizar conteúdos com facilidade).
    `
  },
  {
    id: "blog-9",
    slug: "automacao-comercial-para-clinicas-e-prestadores-de-servico",
    title: "Automação Comercial para Clínicas e Consultórios: Como Eliminar Filas e Agendar no Automático",
    excerpt: "Descubra como clínicas médicas, odontológicas e estéticas estão aumentando agendamentos em 35% com triagem inteligente e lembretes no WhatsApp.",
    category: "Soluções por Nicho",
    readTime: "6 min de leitura",
    publishDate: "16 Ago 2026",
    coverImage: "/images/blog/blog-automacao-clinicas.jpg",
    author: {
      name: "Equipe Vetor Estratégico",
      role: "Especialistas em Automação para Saúde & Serviços",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
    },
    tags: ["Clínicas", "Odontologia", "Saúde", "Agendamento Automático"],
    content: `
# Automação Comercial para Clínicas e Consultórios: Como Eliminar Filas e Agendar no Automático

Em clínicas médicas, consultórios odontológicos e clínicas de estética, a recepção frequentemente enfrenta sobrecarga de mensagens repetitivas no WhatsApp enquanto precisa acolher pacientes presenciais.

O resultado comum é a demora no primeiro retorno digital e a perda de pacientes que procuravam agendar consultas ou procedimentos com urgência.

## Como a automação inteligente transforma a rotina da clínica:

### 1. Acolhimento Imediato de Pacientes 24/7
Quando um paciente pesquisa por um procedimento à noite ou no domingo, o assistente responde imediatamente, tira dúvidas sobre especialidades atendidas, convênios aceitos e localização do consultório.

### 2. Triagem e Pré-Agendamento
O sistema coleta o nome do paciente, especialidade desejada, preferência de turno (manhã/tarde) e encaminha a oportunidade organizada para a recepção apenas confirmar o horário na agenda.

### 3. Redução Drástica de Faltas (No-Show)
Disparo automatizado de mensagens de confirmação e lembretes 24 horas e 2 horas antes da consulta, permitindo que o paciente confirme ou solicite reagendamento com antecedência.

## Resultados Comprovados:
- Liberação de até 3 horas diárias da equipe de recepção.
- Aumento de 30% a 45% nos contatos convertidos fora do horário comercial.
- Satisfação imediata dos pacientes pela agilidade no retorno.
    `
  },
  {
    id: "blog-10",
    slug: "core-web-vitals-por-que-a-velocidade-do-site-define-sua-taxa-de-conversao",
    title: "Core Web Vitals e PageSpeed: Por Que a Velocidade do Site Define suas Vendas",
    excerpt: "Entenda as métricas LCP, INP e CLS que o Google utiliza para ranquear sites e como milissegundos impactam o faturamento da sua empresa.",
    category: "Performance Web",
    readTime: "5 min de leitura",
    publishDate: "15 Ago 2026",
    coverImage: "/images/blog/blog-core-web-vitals.jpg",
    author: {
      name: "Equipe Vetor Estratégico",
      role: "Engenharia de Performance Web",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
    },
    tags: ["Core Web Vitals", "PageSpeed", "Performance", "Conversão"],
    content: `
# Core Web Vitals e PageSpeed: Por Que a Velocidade do Site Define suas Vendas

No comércio eletrônico e na prestação de serviços online, cada fração de segundo conta. Estudos de gigantes da tecnologia como Google, Amazon e Cloudflare comprovam que **cada 100 milissegundos a mais de atraso no carregamento de uma página reduzem as taxas de conversão em até 7%**.

Para avaliar a saúde técnica dos sites, o Google consolidou as métricas conhecidas como **Core Web Vitals**.

## Decodificando as 3 métricas do Google:

1. **LCP (Largest Contentful Paint) - Velocidade de Carregamento:**
   - Mede o tempo que o maior bloco de conteúdo (título ou imagem principal) leva para ficar visível.
   - **Meta Ideal:** Abaixo de 2.5 segundos (nos projetos da Vetor Estratégico atingimos < 1.0s).

2. **INP (Interaction to Next Paint) - Responsividade à Interação:**
   - Mede a rapidez com que a página responde ao toque ou clique do usuário em botões, menus e formulários.
   - **Meta Ideal:** Abaixo de 200 milissegundos.

3. **CLS (Cumulative Layout Shift) - Estabilidade Visual:**
   - Mede se os elementos da página pulam ou mudam de posição enquanto o site carrega imagens e banners.
   - **Meta Ideal:** Abaixo de 0.1.

## Como otimizar sua empresa para notas máximas:
- Adote renderização estática moderna em Next.js.
- Utilize fontes hospedadas localmente com \`font-display: swap\`.
- Comprima imagens em formatos WebP com dimensões explícitas para evitar layout shift.
    `
  },
  {
    id: "blog-11",
    slug: "como-integrar-site-whatsapp-e-crm-para-vender-mais-no-automatico",
    title: "Como Integrar seu Site ao WhatsApp e CRM para Vender Mais no Piloto Automático",
    excerpt: "Elimine a digitação manual de planilhas e conecte seu site, canais de mensagens e CRM de vendas em uma esteira comercial contínua.",
    category: "Integração & CRM",
    readTime: "6 min de leitura",
    publishDate: "14 Ago 2026",
    coverImage: "/images/blog/blog-integracao-crm-whatsapp.jpg",
    author: {
      name: "Equipe Vetor Estratégico",
      role: "Especialistas em Integração de Sistemas & CRM",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
    },
    tags: ["CRM", "Integração", "Automação Comercial", "Pipelines"],
    content: `
# Como Integrar seu Site ao WhatsApp e CRM para Vender Mais no Piloto Automático

Muitas empresas perdem oportunidades valiosas de negócios simplesmente porque os dados de contatos ficam espalhados: alguns chegam por e-mail, outros pelo direct do Instagram, e outros em conversas soltas no celular particular de funcionários.

A integração inteligente entre o **Site Institucional**, o **WhatsApp Comercial** e o **CRM de Vendas** (como HubSpot, RD Station, Pipedrive ou sistemas internos) cria uma esteira comercial à prova de falhas.

## A esteira de vendas automatizada:
1. **Captura Centralizada:** Toda solicitação de orçamento feita no site ou via WhatsApp cria instantaneamente uma oportunidade no CRM com data, hora, serviço de interesse e origem da campanha.
2. **Notificação em Tempo Real:** O vendedor responsável recebe um alerta sonoro no celular e e-mail informando que um lead qualificado acabou de chegar.
3. **Histórico Unificado:** Todas as mensagens trocadas com o assistente inteligente ficam arquivadas na ficha do cliente, permitindo continuidade perfeita do atendimento humano.
4. **Follow-up Automático:** Se o cliente não responder após 48 horas do envio da proposta, o sistema pode enviar um lembrete cordial e automatizado.

## Benefícios Diretos:
- Fim da perda de leads esquecidos em caixas de entrada.
- Visibilidade total para a diretoria sobre quantos orçamentos foram gerados e convertidos.
- Aceleração do ciclo médio de vendas em mais de 40%.
    `
  }
];


export const SEGMENTS = [
  { name: "Clínicas & Consultórios", icon: "Activity", benefit: "Sites profissionais e acolhimento contínuo no WhatsApp" },
  { name: "Consultorias & B2B", icon: "Briefcase", benefit: "Plataformas institucionais de autoridade e qualificação de leads" },
  { name: "Advocacia & Jurídico", icon: "Scale", benefit: "Presença institucional sólida e triagem inicial de solicitações" },
  { name: "Contabilidade & Gestão", icon: "Calculator", benefit: "Páginas corporativas e canais diretos para novos clientes" },
  { name: "Indústria & Distribuição", icon: "Truck", benefit: "Apresentação estruturada de produtos e esteira comercial" },
  { name: "Prestadores de Serviços", icon: "Home", benefit: "Páginas rápidas no celular e captação direta de orçamentos" }
];

export const DELIVERABLES_CHECKLIST = [
  "Desenvolvimento em código próprio, moderno e de alta velocidade",
  "Design 100% adaptado para navegação em smartphones e desktops",
  "Integração com WhatsApp comercial e formulários seguros",
  "Otimização de SEO técnico e marcação de dados para o Google",
  "Estrutura com certificado de segurança SSL e conformidade com a LGPD",
  "Acompanhamento técnico próximo durante o planejamento e lançamento",
  "Orientações práticas para gestão e autonomia da sua equipe"
];
