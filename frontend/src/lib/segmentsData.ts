export interface SegmentBottleneck {
  title: string;
  desc: string;
}

export interface SegmentPillar {
  title: string;
  desc: string;
}

export interface SegmentMetric {
  value: string;
  label: string;
}

export interface SegmentCaseStudy {
  title: string;
  segment: string;
  timeframe: string;
  metrics: SegmentMetric[];
  testimonial: string;
  author: string;
}

export interface SegmentFaq {
  question: string;
  answer: string;
}

export interface SegmentCalculatorConfig {
  title: string;
  subtitle: string;
  calcType: "advocacia" | "clinicas" | "contabilidade" | "ecommerce" | "estetica" | "odontologia";
  slider1: {
    label: string;
    min: number;
    max: number;
    step: number;
    defaultValue: number;
    unit: string;
    isCurrency?: boolean;
  };
  slider2: {
    label: string;
    min: number;
    max: number;
    step: number;
    defaultValue: number;
    unit: string;
    isCurrency?: boolean;
  };
  output1Label: string;
  output1IsCurrency?: boolean;
  output1Unit?: string;
  output2Label: string;
  output2IsCurrency?: boolean;
  output2Unit?: string;
  disclaimer: string;
}

export interface SegmentFormConfig {
  title: string;
  subtitle: string;
  entityLabel: string;
  entityPlaceholder: string;
  dropdown1: {
    label: string;
    options: string[];
    defaultValue: string;
  };
  dropdown2: {
    label: string;
    options: string[];
    defaultValue: string;
  };
}

export interface SegmentPageData {
  slug: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  hero: {
    badge: string;
    titlePrefix: string;
    titleHighlight: string;
    subtitle: string;
    trustItems: string[];
    mascotImage: string;
    mascotAlt: string;
    mascotBadge: string;
  };
  bottlenecks: {
    eyebrow: string;
    title: string;
    items: SegmentBottleneck[];
  };
  calculator: SegmentCalculatorConfig;
  pillars: {
    eyebrow: string;
    title: string;
    items: SegmentPillar[];
  };
  caseStudy: SegmentCaseStudy;
  form: SegmentFormConfig;
  faqs: {
    eyebrow: string;
    title: string;
    items: SegmentFaq[];
  };
}

export const SEGMENTS_DATA: Record<string, SegmentPageData> = {
  advocacia: {
    slug: "advocacia",
    seo: {
      title: "Sites e IA para Escritórios de Advocacia | Vetor Estratégico",
      description:
        "Criação de sites jurídicos de alta autoridade e agentes de IA no WhatsApp para triagem ética e agendamento de consultas conforme o Provimento 205/2021 da OAB.",
      keywords: [
        "site para advogados",
        "site para escritorio de advocacia",
        "ia juridica whatsapp",
        "triagem de clientes advocacia",
        "marketing juridico etico oab",
        "criacao de sites advocacia",
      ],
    },
    hero: {
      badge: "Triagem & Captação Ética com IA para Escritórios de Advocacia",
      titlePrefix: "Atendimento Ágil & Qualificação Ética com ",
      titleHighlight: "Inteligência Artificial",
      subtitle:
        "Agente de Atendimento Jurídico com IA que acolhe mensagens no WhatsApp em 6 segundos, organiza as informações fáticas preliminares e agenda a consulta diretamente com o advogado, 100% em conformidade com o Provimento 205/2021 do CFOAB.",
      trustItems: [
        "Conforme Provimento 205/2021 da OAB",
        "Organização Preliminar de Relato dos Fatos",
        "Agendamento Seguro sem Assessoria Jurídica Automatizada",
      ],
      mascotImage: "/images/mascot/advocacia.png",
      mascotAlt: "Comandante Vetor Advocacia",
      mascotBadge: "✦ IA Jurídica Ética",
    },
    bottlenecks: {
      eyebrow: "Diagnóstico de Gargalos Jurídicos",
      title: "O que Impede seu Escritório de Fechar Mais Honorários?",
      items: [
        {
          title: "Perda de Contatos Fora do Horário Comercial",
          desc: "Potenciais clientes que buscam ajuda jurídica à noite ou aos finais de semana fecham com o primeiro escritório que responde rapidamente.",
        },
        {
          title: "Tempo Gasto com Atendimento a Curiosos sem Potencial",
          desc: "Advogados e secretárias perdem horas respondendo dúvidas que não se convertem em contratos ou que estão fora da área de atuação do escritório.",
        },
        {
          title: "Lentidão na Coleta de Documentos Iniciais",
          desc: "Dias perdidos em trocas de mensagens desorganizadas para conseguir documentos básicos para ajuizamento ou análise de viabilidade.",
        },
        {
          title: "Falta de Presença Digital que Transmita Alta Autoridade",
          desc: "Sites desatualizados ou lentos que transmitem amadorismo e impedem o escritório de cobrar honorários condizentes com sua excelência técnica.",
        },
      ],
    },
    calculator: {
      title: "Simulador de Retorno: Agilidade na Triagem Jurídica",
      subtitle:
        "Veja a projeção de contratos jurídicos incrementais por mês com acolhimento ágil em 6 segundos.",
      calcType: "advocacia",
      slider1: {
        label: "Número de Advogados no Escritório",
        min: 1,
        max: 10,
        step: 1,
        defaultValue: 2,
        unit: "advogados",
      },
      slider2: {
        label: "Honorário Médio Inicial por Ação / Contrato",
        min: 1500,
        max: 15000,
        step: 500,
        defaultValue: 4000,
        unit: "R$",
        isCurrency: true,
      },
      output1Label: "Contratos Adicionais Estimados/Mês",
      output1Unit: "contratos",
      output2Label: "Receita Incremental Estimada/Mês",
      output2IsCurrency: true,
      disclaimer:
        "Estimativa baseada em taxas médias de recuperação de contatos com resposta imediata (<1 min) vs resposta tardia (>1 hora) em conformidade com o Código de Ética e Disciplina da OAB e Provimento CFOAB nº 205/2021.",
    },
    pillars: {
      eyebrow: "O Ecossistema Vetor para Advocacia",
      title: "Estrutura Completa de Presença & Atendimento Ético",
      items: [
        {
          title: "Site Institucional de Alto Padrão",
          desc: "Design sóbrio, carregamento ultrarrápido e arquitetura orientada à autoridade técnica das áreas de atuação do escritório.",
        },
        {
          title: "Triagem e Acolhimento 24/7 no WhatsApp",
          desc: "Agente de IA acolhe o cidadão, coleta os fatos preliminares e agenda a reunião diretamente na pauta dos advogados.",
        },
        {
          title: "Coleta e Organização de Documentos",
          desc: "Automação segura de recebimento de documentos e envio de checklist preparatório para a primeira consulta.",
        },
        {
          title: "Tráfego Pago & SEO Jurídico Conforme a OAB",
          desc: "Campanhas no Google Ads focadas em intenção de busca, respeitando todas as diretrizes de publicidade da advocacia.",
        },
      ],
    },
    caseStudy: {
      title: "Mendes & Vasconcelos Sociedade de Advogados",
      segment: "Direito Trabalhista & Previdenciário",
      timeframe: "Implantação em 12 dias",
      metrics: [
        { value: "6 seg", label: "Tempo médio de resposta no WhatsApp" },
        { value: "+48%", label: "Aumento em consultas qualificadas agendadas" },
        { value: "100%", label: "Conformidade ética com regras da OAB" },
      ],
      testimonial:
        "Nossos advogados não perdem mais tempo filtrando curiosos no WhatsApp. O agente de IA acolhe o cliente com cordialidade extrema, organiza o relato fático e coloca a consulta direto na nossa agenda.",
      author: "Dr. Rodrigo Mendes • Sócio-Diretor",
    },
    form: {
      title: "Agende uma Sessão Estratégica Gratuita de 15 Minutos",
      subtitle:
        "Demonstraremos na prática como a IA pode acolher e qualificar os contatos do seu escritório de advocacia.",
      entityLabel: "Nome do Escritório de Advocacia",
      entityPlaceholder: "Ex: Mendes & Associados",
      dropdown1: {
        label: "Área de Atuação Principal",
        options: [
          "Trabalhista & Previdenciário",
          "Cível, Família & Sucessões",
          "Empresarial & Tributário",
          "Direito Imobiliário & Contratos",
          "Direito Médico & Saúde",
          "Direito Penal & Criminal",
          "Outra Área",
        ],
        defaultValue: "Trabalhista & Previdenciário",
      },
      dropdown2: {
        label: "Porte da Equipe",
        options: ["1 a 3 advogados", "4 a 10 advogados", "Mais de 10 advogados"],
        defaultValue: "1 a 3 advogados",
      },
    },
    faqs: {
      eyebrow: "Perguntas Frequentes",
      title: "Tire Suas Dúvidas Sobre IA Jurídica",
      items: [
        {
          question: "O uso de IA no WhatsApp respeita o Provimento 205/2021 do CFOAB?",
          answer:
            "Sim, integralmente. A IA atua estritamente no acolhimento, triagem fática preliminar e agendamento. Em nenhuma hipótese presta consultoria jurídica, análise de mérito ou precificação, funções privativas do advogado.",
        },
        {
          question: "Como a IA lida com dados sensíveis de clientes?",
          answer:
            "Todo o fluxo cumpre a LGPD com criptografia ponta a ponta e termos de privacidade explícitos, garantindo sigilo profissional absoluto.",
        },
        {
          question: "Em quanto tempo o sistema fica pronto?",
          answer:
            "O site institucional e o agente de IA configurado para a tese do seu escritório são entregues e validados em média de 10 a 15 dias úteis.",
        },
      ],
    },
  },

  clinicas: {
    slug: "clinicas",
    seo: {
      title: "Sites e IA para Clínicas e Médicos | Vetor Estratégico",
      description:
        "Criação de sites para clínicas médicas e consultórios com atendente de IA no WhatsApp 24/7 para agendamento instantâneo de consultas particulares e confirmação ativa.",
      keywords: [
        "site para clinica medica",
        "site para medicos",
        "agendamento whatsapp clinica",
        "ia para consultorio medico",
        "confirmacao de consulta automatica",
        "marketing medico etico",
      ],
    },
    hero: {
      badge: "Captação & Atendimento com IA para Clínicas e Médicos",
      titlePrefix: "Aumente suas consultas particulares e elimine a ",
      titleHighlight: "Fila no WhatsApp",
      subtitle:
        "Agendamento instantâneo em 6 segundos, triagem inteligente de convênio vs. particular e confirmação ativa de consultas para médicos especialistas e clínicas médicas.",
      trustItems: [
        "SLA de Resposta: 6 segundos",
        "Conformidade com LGPD Médica & CFM",
        "Redução de Faltas (No-Show) em até 65%",
      ],
      mascotImage: "/images/mascot/clinicas.png",
      mascotAlt: "Comandante Vetor Clínicas",
      mascotBadge: "✦ IA Médica 24/7",
    },
    bottlenecks: {
      eyebrow: "Gargalos em Clínicas e Consultórios",
      title: "Onde sua Clínica Está Perdendo Pacientes e Faturamento?",
      items: [
        {
          title: "Demora no Atendimento e Paciente Buscando Concorrente",
          desc: "Pacientes particulares que esperam mais de 10 minutos por uma resposta no WhatsApp procuram outro especialista imediatamente.",
        },
        {
          title: "Alta Taxa de Faltas (No-Show) em Consultas Agendadas",
          desc: "Horários nobres da agenda médica que ficam ociosos porque a recepção não tem tempo de fazer confirmações ativas com antecedência.",
        },
        {
          title: "Recepção Sobrecarregada com Dúvidas Repetitivas",
          desc: "Secretárias gastando mais de 60% do dia respondendo valores de consulta, localização, convênios atendidos e preparo de exames.",
        },
        {
          title: "Dificuldade de Preencher a Agenda em Horários Específicos",
          desc: "Falta de um sistema que ofereça encaixes de última hora para pacientes em lista de espera de forma automatizada.",
        },
      ],
    },
    calculator: {
      title: "Simulador de Perda de Faturamento por No-Show & Demora",
      subtitle:
        "Calcule quanto sua clínica recupera ao automatizar o agendamento e a confirmação ativa.",
      calcType: "clinicas",
      slider1: {
        label: "Número de Médicos / Consultórios Ativos",
        min: 1,
        max: 15,
        step: 1,
        defaultValue: 3,
        unit: "médicos",
      },
      slider2: {
        label: "Valor Médio da Consulta Particular",
        min: 150,
        max: 1500,
        step: 50,
        defaultValue: 450,
        unit: "R$",
        isCurrency: true,
      },
      output1Label: "Consultas Particulares Recuperáveis/Mês",
      output1Unit: "consultas",
      output2Label: "Faturamento Recuperável Estimado/Mês",
      output2IsCurrency: true,
      disclaimer:
        "Cálculo com base em médias de mercado: 8 consultas perdidas/mês por médico (no-show + desistência por demora), com taxa de recuperação de 75% via IA.",
    },
    pillars: {
      eyebrow: "O Sistema Vetor para Clínicas",
      title: "Pilares do Ecossistema Médico Inteligente",
      items: [
        {
          title: "Site Médico Institucional de Alta Conversão",
          desc: "Apresentação impecável do corpo clínico, especialidades, tratamentos e botão direto de agendamento online.",
        },
        {
          title: "Atendente Virtual de IA 24h no WhatsApp",
          desc: "Responde dúvidas sobre preparos, localização, convênios e agenda horários diretamente na grade dos médicos.",
        },
        {
          title: "Confirmação Ativa & Encaixes Automáticos",
          desc: "Envia lembretes humanizados e, em caso de cancelamento, notifica automaticamente a lista de espera para não deixar cadeira vazia.",
        },
        {
          title: "Campanhas no Google para Busca Local de Especialistas",
          desc: "Anúncios para quem procura por consultas particulares na sua região no exato momento da dor ou necessidade.",
        },
      ],
    },
    caseStudy: {
      title: "Clínica Integrada de Cardiologia & Diagnósticos",
      segment: "Cardiologia & Exames Complementares",
      timeframe: "Implantação em 14 dias",
      metrics: [
        { value: "6 seg", label: "Tempo médio de resposta no WhatsApp" },
        { value: "-62%", label: "Redução em faltas (No-Show)" },
        { value: "+37%", label: "Aumento em consultas particulares" },
      ],
      testimonial:
        "Nossa recepção agora foca 100% no acolhimento presencial dos pacientes. A IA cuida do WhatsApp, tira dúvidas de preparo e reduziu nossas faltas drasticamente.",
      author: "Dra. Camila Nogueira • Diretora Clínica",
    },
    form: {
      title: "Agende uma Sessão Estratégica Gratuita de 15 Minutos",
      subtitle:
        "Apresentaremos uma demonstração personalizada do fluxo de agendamento inteligente para sua clínica.",
      entityLabel: "Nome da Clínica ou Consultório",
      entityPlaceholder: "Ex: Clínica CardioMais",
      dropdown1: {
        label: "Especialidade Principal",
        options: [
          "Clínica Médica / Especialidades",
          "Cardiologia & Diagnósticos",
          "Ortopedia & Traumatologia",
          "Dermatologia & Tricologia",
          "Ginecologia & Obstetrícia",
          "Pediatria",
          "Outra Especialidade",
        ],
        defaultValue: "Clínica Médica / Especialidades",
      },
      dropdown2: {
        label: "Faixa de Faturamento Mensal",
        options: [
          "Até R$ 50k/mês",
          "R$ 50k a R$ 150k/mês",
          "R$ 150k a R$ 300k/mês",
          "Acima de R$ 300k/mês",
        ],
        defaultValue: "R$ 50k a R$ 150k/mês",
      },
    },
    faqs: {
      eyebrow: "Perguntas Frequentes",
      title: "Dúvidas Frequentes de Médicos e Gestores de Clínicas",
      items: [
        {
          question: "A IA médica substitui a secretária da clínica?",
          answer:
            "Não, ela atua como um copiloto para a recepção. A IA absorve o volume de dúvidas repetitivas e agendamentos 24 horas por dia, liberando a secretária para um atendimento presencial caloroso e humanizado.",
        },
        {
          question: "O sistema integra com nosso software de prontuário atual?",
          answer:
            "Sim. Integramos via webhook/API com os principais sistemas de gestão médica (Doctoralia, iClinic, Feegow, ClinicWeb, Google Calendar, etc.).",
        },
        {
          question: "A solução cumpre as normas do CFM e LGPD?",
          answer:
            "Sim. A IA não faz diagnósticos nem prescrições. Limita-se ao acolhimento administrativo, agendamento e informações institucionais, com total sigilo de dados de saúde.",
        },
      ],
    },
  },

  contabilidade: {
    slug: "contabilidade",
    seo: {
      title: "Sites e IA para Escritórios de Contabilidade | Vetor Estratégico",
      description:
        "Sites profissionais para contabilidades e BPO financeiro com automação de propostas no WhatsApp, triagem tributária e captação de clientes PJ.",
      keywords: [
        "site para contabilidade",
        "site para escritorios contabeis",
        "ia para contabilidade",
        "captacao de clientes pj contabilidade",
        "proposta rapida abertura de empresa",
        "marketing para contadores",
      ],
    },
    hero: {
      badge: "Captação & Automação Comercial para Escritórios Contábeis",
      titlePrefix: "Capte Empresas e Automatize o Envio de Propostas com ",
      titleHighlight: "Inteligência Artificial",
      subtitle:
        "Site de alta conversão para contabilidades modernas com simulador de custos de abertura de empresa, qualificação de regime tributário e agendamento comercial automático no WhatsApp.",
      trustItems: [
        "Proposta Comercial Gerada em 30 Segundos",
        "Qualificação Automática de Simples, Lucro Presumido e Real",
        "Integração com CRMs e Sistemas Contábeis",
      ],
      mascotImage: "/images/mascot/contabilidade.png",
      mascotAlt: "Comandante Vetor Contabilidade",
      mascotBadge: "✦ IA Contábil Comercial",
    },
    bottlenecks: {
      eyebrow: "Gargalos em Empresas Contábeis",
      title: "Por Que Sua Contabilidade Não Cresce na Velocidade que Poderia?",
      items: [
        {
          title: "Demora no Envio de Propostas Comerciais para PJ",
          desc: "O empresário solicita cotação para troca de contador ou abertura de empresa, mas demora 24h a 48h para receber uma proposta.",
        },
        {
          title: "Falta de Posicionamento para Serviços de Alto Valor",
          desc: "Dificuldade de vender BPO Financeiro, Planejamento Tributário e Consultoria de Gestão porque o site transmite apenas emissão de guias.",
        },
        {
          title: "Equipe Comercial Perdendo Tempo com MEIs sem Perfil",
          desc: "Horas gastas atendendo microempreendedores com expectativas de preço incompatíveis com a estrutura do seu escritório.",
        },
        {
          title: "Dependência Excessiva de Indicações Orgânicas",
          desc: "Falta de uma esteira ativa e previsível de captação digital que atraia novos clientes todo mês pelo Google.",
        },
      ],
    },
    calculator: {
      title: "Simulador de Crescimento de Carteira Contábil",
      subtitle:
        "Projete a receita incremental anual com esteira de proposta rápida para abertura e troca de contador.",
      calcType: "contabilidade",
      slider1: {
        label: "Clientes PJ Atuais na Carteira",
        min: 20,
        max: 300,
        step: 5,
        defaultValue: 60,
        unit: "empresas",
      },
      slider2: {
        label: "Mensalidade Contábil Média (Honorário)",
        min: 400,
        max: 3000,
        step: 50,
        defaultValue: 850,
        unit: "R$",
        isCurrency: true,
      },
      output1Label: "Novos Clientes PJ Estimados/Mês",
      output1Unit: "empresas",
      output2Label: "Faturamento Incremental Anual Estimado",
      output2IsCurrency: true,
      disclaimer:
        "Projeção baseada em taxa de conversão média de 8% da base com campanhas de abertura/migração PJ e proposta comercial instantânea no WhatsApp.",
    },
    pillars: {
      eyebrow: "O Ecossistema Vetor para Contabilidade",
      title: "Estrutura Comercial & Digital para Contabilidades",
      items: [
        {
          title: "Site Institucional Focado em Autoridade PJ",
          desc: "Páginas segmentadas por nicho (médicos, e-commerce, prestadores de serviço) e páginas de BPO Financeiro.",
        },
        {
          title: "Gerador Inteligente de Propostas no WhatsApp",
          desc: "A IA faz perguntas-chave (faturamento estimado, regime atual, número de sócios e funcionários) e entrega a proposta preliminar na hora.",
        },
        {
          title: "Calculadora de Economia Tributária Interativa",
          desc: "Ferramenta no site que atrai empresários mostrando o potencial de redução tributária ao trocar de contador.",
        },
        {
          title: "Campanhas no Google Ads para Abertura & Troca de Contador",
          desc: "Anúncios altamente segmentados para empresários buscando ativamente contabilidade em São Paulo e em todo o Brasil.",
        },
      ],
    },
    caseStudy: {
      title: "Vértice Contabilidade Estratégica & BPO",
      segment: "Contabilidade Consultiva & BPO Financeiro",
      timeframe: "Implantação em 10 dias",
      metrics: [
        { value: "30 seg", label: "Tempo para envio de proposta comercial" },
        { value: "+14", label: "Novos contratos PJ fechados no 1º mês" },
        { value: "R$ 1.150", label: "Ticket médio de honorário conquistado" },
      ],
      testimonial:
        "O gerador de propostas integrado ao WhatsApp mudou nosso jogo comercial. O empresário não espera mais um dia útil: recebe a proposta na hora e agenda reunião com nosso consultor.",
      author: "Marcos Vinícius • Sócio-Fundador",
    },
    form: {
      title: "Agende uma Sessão Estratégica Gratuita de 15 Minutos",
      subtitle:
        "Demonstraremos como transformar o site do seu escritório contábil em uma máquina de novos contratos PJ.",
      entityLabel: "Nome do Escritório Contábil",
      entityPlaceholder: "Ex: Vértice Contabilidade",
      dropdown1: {
        label: "Foco Principal de Atuação",
        options: [
          "Abertura / Troca de Contador PJ",
          "BPO Financeiro & Gestão",
          "Planejamento Tributário & Holding",
          "Contabilidade para Médicos e Clínicas",
          "Contabilidade para E-commerce e Infoprodutos",
          "Contabilidade Geral PME",
        ],
        defaultValue: "Abertura / Troca de Contador PJ",
      },
      dropdown2: {
        label: "Porte Atual da Carteira",
        options: [
          "Até 50 clientes PJ",
          "50 a 150 clientes PJ",
          "150 a 300 clientes PJ",
          "Mais de 300 clientes PJ",
        ],
        defaultValue: "50 a 150 clientes PJ",
      },
    },
    faqs: {
      eyebrow: "Perguntas Frequentes",
      title: "Dúvidas Frequentes de Sócios de Contabilidade",
      items: [
        {
          question: "A IA calcula os impostos automaticamente para o cliente?",
          answer:
            "A IA faz uma estimativa preliminar parametrizada com base nas regras do seu escritório para precificar o honorário contábil. A análise fiscal aprofundada continua sob responsabilidade dos contadores da casa.",
        },
        {
          question: "Como o sistema ajuda a vender BPO Financeiro?",
          answer:
            "Criamos páginas e fluxos específicos que educam o empresário sobre a economia de terceirizar o financeiro (contas a pagar, receber, conciliação e relatórios executivos).",
        },
        {
          question: "Os dados dos leads são integrados ao nosso CRM?",
          answer:
            "Sim. Enviamos os dados qualificados diretamente para RD Station, HubSpot, PipeRun, Bitrix24 ou via Webhook.",
        },
      ],
    },
  },

  ecommerce: {
    slug: "ecommerce",
    seo: {
      title: "Sites e IA para E-commerce e Varejo | Vetor Estratégico",
      description:
        "Lojas virtuais de alta velocidade e agentes de IA no WhatsApp para recuperação de carrinhos abandonados, Pix pendentes e suporte a pedidos 24/7.",
      keywords: [
        "ia para ecommerce",
        "recuperacao de carrinho whatsapp",
        "site rapido para ecommerce",
        "recuperacao de pix pendente",
        "chatbot vendas ecommerce",
        "otimizacao de conversao ecommerce",
      ],
    },
    hero: {
      badge: "Recuperação & Vendas com IA para E-commerce e Lojas",
      titlePrefix: "Recupere Carrinhos e Venda Mais no WhatsApp com ",
      titleHighlight: "Inteligência Artificial",
      subtitle:
        "Lojas virtuais ultrarrápidas com agente de IA integrado que recupera pedidos abandonados, esclarece dúvidas de tamanho/frete e atende o status de entrega 24 horas por dia.",
      trustItems: [
        "Recuperação de até 28% de Carrinhos Abandonados",
        "Suporte a Status de Pedido 24/7 sem Fila",
        "Carregamento Mobile em Menos de 1 Segundo",
      ],
      mascotImage: "/images/mascot/ecommerce.png",
      mascotAlt: "Comandante Vetor E-commerce",
      mascotBadge: "✦ IA Vendedora E-commerce",
    },
    bottlenecks: {
      eyebrow: "Gargalos em E-commerce e Varejo Online",
      title: "Onde Sua Loja Online Está Deixando Dinheiro na Mesa?",
      items: [
        {
          title: "Mais de 70% dos Carrinhos e Pix São Abandonados",
          desc: "Clientes colocam produtos no carrinho, geram Pix e não pagam porque ninguém entra em contato no momento exato da dúvida.",
        },
        {
          title: "SAC Sobrecarregado com 'Onde Está Meu Pedido?'",
          desc: "Atendentes gastam quase todo o tempo consultando código de rastreio nos Correios em vez de focar em vender mais.",
        },
        {
          title: "Site Lento no Celular que Faz o Cliente Desistir",
          desc: "Cada segundo adicional de carregamento no celular reduz a taxa de conversão da loja em até 20%.",
        },
        {
          title: "Dúvidas Pré-Compra Não Respondidas a Tempo",
          desc: "Perguntas simples sobre medidas, tecido, garantia ou prazo de entrega que ficam sem resposta e viram venda perdida.",
        },
      ],
    },
    calculator: {
      title: "Simulador de Receita Recuperada no E-commerce",
      subtitle:
        "Descubra quanto sua loja pode faturar a mais recuperando carrinhos e Pix abandonados via WhatsApp.",
      calcType: "ecommerce",
      slider1: {
        label: "Faturamento Mensal Atual da Loja",
        min: 15000,
        max: 500000,
        step: 5000,
        defaultValue: 80000,
        unit: "R$",
        isCurrency: true,
      },
      slider2: {
        label: "Ticket Médio por Pedido",
        min: 50,
        max: 1000,
        step: 25,
        defaultValue: 250,
        unit: "R$",
        isCurrency: true,
      },
      output1Label: "Pedidos Adicionais Recuperados/Mês",
      output1Unit: "pedidos",
      output2Label: "Receita Adicional Estimada/Mês",
      output2IsCurrency: true,
      disclaimer:
        "Estimativa baseada na recuperação média de 18% da receita bruta perdida em carrinhos e Pix abandonados com abordagem ativa e humanizada por IA.",
    },
    pillars: {
      eyebrow: "O Ecossistema Vetor para E-commerce",
      title: "Tecnologia de Alta Performance para Lojas Virtuais",
      items: [
        {
          title: "Frontend Next.js Ultrarrápido",
          desc: "Navegação instantânea no celular que proporciona a experiência dos maiores e-commerces do mundo.",
        },
        {
          title: "Recuperador Ativo de Carrinhos e Pix no WhatsApp",
          desc: "Abordagem cordial e personalizada em 15 minutos com oferta de cupom ou esclarecimento de dúvidas de frete.",
        },
        {
          title: "Autoatendimento de Rastreamento de Pedidos",
          desc: "O cliente digita o CPF ou número do pedido e recebe o status exato e o link de rastreio em 3 segundos.",
        },
        {
          title: "Vendedor Virtual com Recomendação de Produtos",
          desc: "IA que entende a necessidade do cliente e sugere produtos complementares para aumentar o ticket médio (Cross-sell).",
        },
      ],
    },
    caseStudy: {
      title: "Aura Concept • Moda & Acessórios Premium",
      segment: "Moda Feminina & E-commerce D2C",
      timeframe: "Implantação em 15 dias",
      metrics: [
        { value: "+22.4%", label: "Aumento na receita total da loja" },
        { value: "R$ 38.600", label: "Recuperados em carrinhos no 1º mês" },
        { value: "-80%", label: "Redução de chamados manuais de rastreio" },
      ],
      testimonial:
        "O agente de IA recuperou centenas de carrinhos abandonados já na primeira semana. Os clientes acham que é uma consultora da nossa equipe de tão natural.",
      author: "Juliana Rocha • Co-Fundadora",
    },
    form: {
      title: "Agende uma Sessão Estratégica Gratuita de 15 Minutos",
      subtitle:
        "Analisaremos o funil do seu e-commerce e mostraremos como plugar a IA de recuperação.",
      entityLabel: "Nome da Loja Virtual / Marca",
      entityPlaceholder: "Ex: Aura Concept Moda",
      dropdown1: {
        label: "Plataforma de E-commerce Atual",
        options: [
          "Shopify",
          "Nuvemshop",
          "WooCommerce",
          "VTEX / Tray",
          "Yampi / Cartpanda",
          "Outra Plataforma",
        ],
        defaultValue: "Shopify",
      },
      dropdown2: {
        label: "Faturamento Mensal da Loja",
        options: [
          "Até R$ 30k/mês",
          "R$ 30k a R$ 80k/mês",
          "R$ 80k a R$ 200k/mês",
          "Acima de R$ 200k/mês",
        ],
        defaultValue: "R$ 80k a R$ 200k/mês",
      },
    },
    faqs: {
      eyebrow: "Perguntas Frequentes",
      title: "Dúvidas Frequentes de Donos de E-commerce",
      items: [
        {
          question: "O sistema integra com minha plataforma atual?",
          answer:
            "Sim. Temos integrações prontas com Shopify, Nuvemshop, WooCommerce, Tray, VTEX, Yampi e principais gateways de pagamento.",
        },
        {
          question: "A IA incomoda os clientes com spam?",
          answer:
            "Não. Trabalhamos com regras rígidas de espaçamento de mensagens e tom extremamente consultivo e humanizado, respeitando quem não deseja continuar.",
        },
        {
          question: "Como funciona a consulta de rastreamento?",
          answer:
            "A IA se conecta à API do seu sistema de envio (Melhor Envio, Frenet, Correios, Mandaê) e retorna a localização exata do pacote instantaneamente.",
        },
      ],
    },
  },

  estetica: {
    slug: "estetica",
    seo: {
      title: "Sites e IA para Clínicas de Estética | Vetor Estratégico",
      description:
        "Criação de landing pages de alta conversão para clínicas de estética e harmonização facial com atendente de IA que qualifica leads de anúncios no WhatsApp.",
      keywords: [
        "site para clinica de estetica",
        "landing page harmonizacao facial",
        "ia whatsapp clinica de estetica",
        "qualificacao de leads estetica",
        "agendamento avaliacao estetica",
        "marketing para clinicas de estetica",
      ],
    },
    hero: {
      badge: "Captação & Qualificação para Clínicas de Estética",
      titlePrefix: "Aumente as Avaliações Agendadas e Venda Mais Procedimentos com ",
      titleHighlight: "Inteligência Artificial",
      subtitle:
        "Landing pages elegantes e atendente de IA no WhatsApp que acolhe os leads de anúncios no exato segundo em que clicam, tira dúvidas sobre procedimentos e agenda avaliações com alta taxa de comparecimento.",
      trustItems: [
        "Atendimento em 6 Segundos para Leads de Tráfego Pago",
        "Filtro de Curiosos & Qualificação de Procedimentos",
        "Confirmação Humanizada de Avaliações",
      ],
      mascotImage: "/images/mascot/estetica.png",
      mascotAlt: "Comandante Vetor Estética",
      mascotBadge: "✦ IA para Estética",
    },
    bottlenecks: {
      eyebrow: "Gargalos em Clínicas de Estética",
      title: "Por Que Seus Anúncios Não Estão Virando Procedimentos Fechados?",
      items: [
        {
          title: "Leads do Instagram Esfriam em Poucos Minutos",
          desc: "A paciente vê o anúncio, manda mensagem no WhatsApp e, se demorar mais de 5 minutos para receber atenção, fecha com outra clínica da cidade.",
        },
        {
          title: "Dezenas de Mensagens de Curiosos Perguntando 'Preço?'",
          desc: "Sua equipe passa o dia informando preços sem conseguir conduzir a conversa para uma avaliação presencial de alto valor.",
        },
        {
          title: "Altíssima Taxa de Faltas nas Avaliações Agendadas",
          desc: "Pacientes que marcam a avaliação gratuita ou paga mas não comparecem porque não houve acompanhamento prévio.",
        },
        {
          title: "Página da Clínica Sem Apelo Visual Premium",
          desc: "Sites amadores ou sem foco em conversão que não transmitem o glamour e a sofisticação dos tratamentos oferecidos.",
        },
      ],
    },
    calculator: {
      title: "Simulador de Perda de Faturamento por Demora no WhatsApp",
      subtitle:
        "Veja quanto sua clínica de estética recupera ao responder os leads de anúncios instantaneamente.",
      calcType: "estetica",
      slider1: {
        label: "Leads Recebidos por Dia (Anúncios + Instagram)",
        min: 3,
        max: 50,
        step: 1,
        defaultValue: 10,
        unit: "leads/dia",
      },
      slider2: {
        label: "Ticket Médio dos Procedimentos da Clínica",
        min: 500,
        max: 8000,
        step: 250,
        defaultValue: 1500,
        unit: "R$",
        isCurrency: true,
      },
      output1Label: "Leads Qualificados Recuperados/Mês",
      output1Unit: "leads",
      output2Label: "Faturamento Incremental Estimado/Mês",
      output2IsCurrency: true,
      disclaimer:
        "Estimativa com base em métricas de mercado: 45% dos leads esfriam por demora no primeiro contato; com resposta imediata e agendamento consultivo, calcula-se 25% de conversão em procedimentos.",
    },
    pillars: {
      eyebrow: "O Sistema Vetor para Clínicas de Estética",
      title: "Tecnologia de Encantamento & Conversão em Estética",
      items: [
        {
          title: "Landing Pages de Estética com Visual Premium",
          desc: "Design luxuoso, fotos de alta qualidade, explicação dos tratamentos e depoimentos que constroem desejo imediato.",
        },
        {
          title: "Consultora Virtual de Estética 24h no WhatsApp",
          desc: "Conduz o diálogo com empatia, explica os benefícios do procedimento e direciona a paciente para agendar a avaliação.",
        },
        {
          title: "Régua de Confirmação & Reativação de Pacientes",
          desc: "Mensagens preparatórias que aumentam o comparecimento e campanhas de retorno periódico para manutenção de procedimentos.",
        },
        {
          title: "Anúncios no Meta Ads Focados em Público de Alto Poder Aquisitivo",
          desc: "Segmentação cirúrgica por bairros nobres e interesses de luxo para atrair pacientes que valorizam qualidade.",
        },
      ],
    },
    caseStudy: {
      title: "Clínica Lumina • Estética Avançada & Harmonização",
      segment: "Harmonização Facial & Protocolos Corporais",
      timeframe: "Implantação em 10 dias",
      metrics: [
        { value: "4 seg", label: "Tempo de resposta para novos leads" },
        { value: "+71%", label: "Mais avaliações presenciais agendadas" },
        { value: "R$ 64.000", label: "Faturamento adicional no 1º trimestre" },
      ],
      testimonial:
        "A consultora de IA acolhe as pacientes dos nossos anúncios de Botox e Harmonização com tanta delicadeza que nossa taxa de comparecimento nas avaliações dobrou.",
      author: "Dra. Letícia Santana • Biomédica Esteta",
    },
    form: {
      title: "Agende uma Sessão Estratégica Gratuita de 15 Minutos",
      subtitle:
        "Mostraremos o fluxo exato de atendimento de IA configurado para os procedimentos da sua clínica de estética.",
      entityLabel: "Nome da Clínica de Estética",
      entityPlaceholder: "Ex: Clínica Lumina Estética",
      dropdown1: {
        label: "Principal Procedimento da Clínica",
        options: [
          "Harmonização Facial & Botox",
          "Estética Corporal & Emagrecimento",
          "Depilação a Laser",
          "Tratamentos Capilares & Tricologia",
          "Biomedicina Estética Completa",
          "Cirurgia Plástica",
        ],
        defaultValue: "Harmonização Facial & Botox",
      },
      dropdown2: {
        label: "Faturamento Médio Mensal",
        options: [
          "Até R$ 30k/mês",
          "R$ 30k a R$ 80k/mês",
          "R$ 80k a R$ 150k/mês",
          "Acima de R$ 150k/mês",
        ],
        defaultValue: "R$ 30k a R$ 80k/mês",
      },
    },
    faqs: {
      eyebrow: "Perguntas Frequentes",
      title: "Dúvidas Frequentes de Gestoras de Clínicas de Estética",
      items: [
        {
          question: "A IA consegue explicar os procedimentos com delicadeza?",
          answer:
            "Sim. O tom de voz é totalmente calibrado para o universo da estética: acolhedor, refinado e com foco em elevar a autoestima da paciente.",
        },
        {
          question: "O que a IA responde quando a paciente pergunta o valor?",
          answer:
            "Ela explica com elegância que cada organismo é único e que a legislação de saúde exige uma avaliação presencial para indicar o plano de tratamento ideal, conduzindo ao agendamento.",
        },
        {
          question: "A solução funciona com anúncios no Instagram e Facebook?",
          answer:
            "Perfeitamente. O anúncio direciona a paciente direto para o WhatsApp ou Landing Page, onde a IA inicia o atendimento em menos de 6 segundos.",
        },
      ],
    },
  },

  odontologia: {
    slug: "odontologia",
    seo: {
      title: "Sites e IA para Clínicas Odontológicas e Dentistas | Vetor Estratégico",
      description:
        "Landing pages modernas para clínicas odontológicas e dentistas com atendente de IA no WhatsApp para agendamento de avaliações de implantes, alinhadores e próteses.",
      keywords: [
        "site para dentistas",
        "site para clinica odontologica",
        "ia para consultorio odontologico",
        "captacao de pacientes implantes",
        "agendamento whatsapp dentista",
        "marketing odontologico etico cro",
      ],
    },
    hero: {
      badge: "Captação & Agendamento para Dentistas e Clínicas Odontológicas",
      titlePrefix: "Preencha a Cadeira e Venda Mais Tratamentos de Alto Valor com ",
      titleHighlight: "Inteligência Artificial",
      subtitle:
        "Landing pages de alta conversão para implantes, alinhadores invisíveis e próteses, com atendente de IA no WhatsApp que acolhe os pacientes em 6 segundos e agenda avaliações 24/7.",
      trustItems: [
        "Conformidade com Normas Éticas do CFO / CRO",
        "Atendimento em 6 Segundos para Leads de Google e Instagram",
        "Redução de Horários Ociosos no Consultório",
      ],
      mascotImage: "/images/mascot/odonto.png",
      mascotAlt: "Comandante Vetor Odontologia",
      mascotBadge: "✦ IA Odontológica 24/7",
    },
    bottlenecks: {
      eyebrow: "Gargalos em Consultórios Odontológicos",
      title: "Por Que Sua Clínica Está com Horários Ociosos na Agenda?",
      items: [
        {
          title: "Demora para Responder Pacientes Interessados em Implantes",
          desc: "Pacientes que buscam tratamentos de alto valor entram em contato com várias clínicas e agendam com quem responde primeiro com clareza.",
        },
        {
          title: "Pacientes que Agendam Avaliação e Não Comparecem",
          desc: "Cadeiras vazias geram custos fixos e perda direta de faturamento quando não há confirmação humanizada no dia anterior.",
        },
        {
          title: "Falta de Posicionamento para Tratamentos de Ticket Nobre",
          desc: "Sites desatualizados que atraem apenas consultas básicas de convênio em vez de implantes, próteses e alinhadores invisíveis.",
        },
        {
          title: "Recepção Ocupada com Agendamento Manual e Lembretes",
          desc: "Equipe sobrecarregada que não consegue fazer contato com orçamentos em aberto para fechar o tratamento.",
        },
      ],
    },
    calculator: {
      title: "Simulador de Faturamento Perdido por Cadeira Vazia",
      subtitle:
        "Veja quanto sua clínica odontológica pode recuperar com agendamento ágil e redução de no-show.",
      calcType: "odontologia",
      slider1: {
        label: "Número de Dentistas / Cadeiras no Consultório",
        min: 1,
        max: 10,
        step: 1,
        defaultValue: 2,
        unit: "dentistas",
      },
      slider2: {
        label: "Ticket Médio dos Tratamentos Fechados",
        min: 1000,
        max: 12000,
        step: 500,
        defaultValue: 3500,
        unit: "R$",
        isCurrency: true,
      },
      output1Label: "Avaliações Qualificadas Adicionais/Mês",
      output1Unit: "avaliações",
      output2Label: "Faturamento Incremental Estimado/Mês",
      output2IsCurrency: true,
      disclaimer:
        "Projeção baseada em média de 6 avaliações perdidas/mês por cadeira (falta ou demora no retorno), com 40% de conversão média em tratamentos com acolhimento ágil.",
    },
    pillars: {
      eyebrow: "O Sistema Vetor para Odontologia",
      title: "Tecnologia para Clínicas Odontológicas Modernas",
      items: [
        {
          title: "Landing Pages Focadas em Implantes e Alinhadores",
          desc: "Páginas com explicações claras, depoimentos em vídeo e design que transmite tecnologia e segurança clínica.",
        },
        {
          title: "Atendente Virtual Odontológico no WhatsApp",
          desc: "Tira dúvidas frequentes, explica como funciona a avaliação inicial e agenda o horário diretamente no sistema.",
        },
        {
          title: "Confirmação Ativa de Consultas & Lista de Espera",
          desc: "Lembretes interativos no WhatsApp que reduzem as faltas e preenchem cancelamentos de última hora.",
        },
        {
          title: "Campanhas no Google para Busca Local de Implantes",
          desc: "Anúncios para pacientes que estão buscando dentista na sua região no exato momento da necessidade.",
        },
      ],
    },
    caseStudy: {
      title: "Instituto Odontológico Dr. Fernando Alencar",
      segment: "Implantodontia & Reabilitação Oral",
      timeframe: "Implantação em 12 dias",
      metrics: [
        { value: "5 seg", label: "Tempo de resposta no WhatsApp" },
        { value: "+54%", label: "Mais avaliações de implantes agendadas" },
        { value: "-58%", label: "Redução em cadeiras vazias por falta" },
      ],
      testimonial:
        "O sistema triou perfeitamente os pacientes de implante e prótese. O paciente chega na consulta já ciente de como funciona a avaliação e muito mais propenso a fechar o tratamento.",
      author: "Dr. Fernando Alencar • Responsável Técnico",
    },
    form: {
      title: "Agende uma Sessão Estratégica Gratuita de 15 Minutos",
      subtitle:
        "Demonstraremos na prática o fluxo de agendamento de IA para sua clínica odontológica.",
      entityLabel: "Nome da Clínica ou Consultório",
      entityPlaceholder: "Ex: Instituto Dr. Fernando Alencar",
      dropdown1: {
        label: "Foco Principal dos Tratamentos",
        options: [
          "Implantes & Próteses",
          "Alinhadores Invisíveis & Ortodontia",
          "Facetas de Resina & Lentes de Contato",
          "Endodontia & Clínica Geral",
          "Harmonização Orofacial",
          "Odontopediatria",
        ],
        defaultValue: "Implantes & Próteses",
      },
      dropdown2: {
        label: "Número de Cadeiras / Dentistas",
        options: [
          "1 a 3 dentistas",
          "4 a 7 dentistas",
          "Mais de 7 dentistas / Rede de Clínicas",
        ],
        defaultValue: "1 a 3 dentistas",
      },
    },
    faqs: {
      eyebrow: "Perguntas Frequentes",
      title: "Dúvidas Frequentes de Dentistas e Gestores Odontológicos",
      items: [
        {
          question: "O sistema respeita as regras de publicidade do CRO / CFO?",
          answer:
            "Sim, com rigor absoluto. Os textos, landing pages e mensagens da IA seguem estritamente as diretrizes éticas do Conselho Federal de Odontologia, sem promessas milagrosas nem sensacionalismo.",
        },
        {
          question: "Como a IA lida com pacientes que têm medo de dentista?",
          answer:
            "Ela utiliza uma linguagem empática e acolhedora, explicando que as tecnologias atuais proporcionam tratamentos totalmente indolores e confortáveis.",
        },
        {
          question: "O sistema se integra com nosso software odontológico?",
          answer:
            "Sim. Podemos integrar com Dental Office, Simples Dental, EasyDental, Google Agenda ou via Webhook.",
        },
      ],
    },
  },
};
