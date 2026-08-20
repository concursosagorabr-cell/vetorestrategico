import { CaseStudy, ServiceItem, Testimonial, PricingPlan, BlogPost, FAQItem } from "@/types";

export const COMPANY_INFO = {
  name: "Vetor Estratégico",
  tagline: "Engenharia Web & Automação Inteligente para PMEs",
  headline: "Seu site rápido. Seu atendimento imediato. Mais clientes fechando com a sua empresa.",
  subheadline: "Desenvolvemos sites de alta velocidade focados em conversão e integramos automações que qualificam e atendem seus clientes no WhatsApp sem filas.",
  email: "contato.vetorestrategico@gmail.com",
  phone: "(11) 91907-2390",
  rawPhone: "5511919072390",
  whatsappUrl: "https://wa.me/5511919072390?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20uma%20proposta%20comercial%20com%20a%20Vetor%20Estrat%C3%A9gico.",
  location: "São Paulo - SP & Atendimento Online em Todo o Brasil",
  cnpjPlaceholder: "48.912.304/0001-85",
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
    answer: "A taxa de manutenção e hospedagem básica é de apenas R$ 99/mês. Ela inclui hospedagem em servidores de alta velocidade, certificado de segurança SSL ativo, monitoramento de estabilidade e suporte técnico contínuo para manter seu site sempre funcionando perfeitamente."
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
    excerpt: "Entenda como o carregamento veloz e a facilidade de contato direto reduzem a perda de potenciais clientes no ambiente digital.",
    content: `
# Por que ter um site rápido com canal direto de WhatsApp é essencial para empresas em crescimento

A presença digital de uma empresa é seu cartão de visitas comercial e atua como a primeira linha de contato com clientes no dia a dia.

## O impacto de páginas lentas
Muitas empresas ainda mantêm sites pesados que demoram segundos para abrir no celular ou que não deixam claro qual é o serviço oferecido. Em um mercado competitivo, a demora no carregamento faz com que o visitante retorne à busca e procure outro prestador de serviço.

## Elementos fundamentais para converter visitantes:
1. **Velocidade de carregamento:** Abertura rápida mesmo em redes móveis 4G/5G.
2. **Mensagem comercial clara:** Explicação objetiva de quais problemas a empresa resolve.
3. **Caminho direto para contato:** Botão visível de WhatsApp para iniciar uma conversa sem atrito.
4. **Estrutura preparada para expansão:** Arquitetura técnica moderna pronta para receber novos serviços ou fluxos de atendimento.

Na **Vetor Estratégico**, construímos páginas institucionais e estruturas de captação pensadas para o dia a dia comercial de empresas reais.
    `,
    category: "Presença Digital & Vendas",
    readTime: "3 min de leitura",
    publishDate: "20 Ago 2026",
    author: {
      name: "Equipe Vetor Estratégico",
      role: "Especialistas em Engenharia Web & Estratégia Comercial",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
    },
    tags: ["Desenvolvimento Web", "WhatsApp Comercial", "PMEs", "Performance"]
  },
  {
    id: "blog-1",
    slug: "como-o-atendimento-organizado-no-whatsapp-evita-perda-de-clientes",
    title: "Como estruturar o atendimento no WhatsApp para não perder contatos fora do expediente",
    excerpt: "Acolhimento imediato e triagem de dúvidas ajudam empresas a manter oportunidades ativas mesmo em noites e finais de semana.",
    content: `
# Como estruturar o atendimento no WhatsApp para não perder contatos fora do expediente

O WhatsApp se consolidou como o principal canal comercial no Brasil. Contudo, responder com agilidade e consistência a todas as solicitações é um desafio comum para equipes enxutas.

## O problema do tempo de espera
Quando um cliente pesquisa por um serviço à noite ou no final de semana, a expectativa por retorno é imediata. Atrasos prolongados no primeiro contato frequentemente levam o cliente a fechar com quem responder primeiro.

## Como a automação inteligente auxilia a equipe:
1. **Acolhimento instantâneo:** Confirmação de recebimento da mensagem e esclarecimento de dúvidas frequentes.
2. **Triagem de necessidades:** Identificação do serviço desejado antes do repasse ao vendedor.
3. **Organização para os atendentes:** A equipe humana inicia o expediente com contatos organizados e categorizados.

Compreenda como aplicar essas soluções na prática conversando com os especialistas da **Vetor Estratégico**.
    `,
    category: "Atendimento Comercial",
    readTime: "4 min de leitura",
    publishDate: "18 Ago 2026",
    author: {
      name: "Equipe Vetor Estratégico",
      role: "Especialistas em Automação & Atendimento",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
    },
    tags: ["WhatsApp", "Atendimento ao Cliente", "Produtividade", "Organização Comercial"]
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
