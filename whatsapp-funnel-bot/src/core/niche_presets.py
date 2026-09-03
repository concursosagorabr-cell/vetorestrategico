"""
Módulo de Presets e Especialidades de Nicho — IA Multi-Nicho (WhatsApp Funnel Bot)
Framework parametrizado por nicho com arquétipos de vendas, personas, vocabulário e objeções universais.
"""

from typing import Dict, Any, List, Optional

# Biblioteca de Objeções Universais e Respostas-Modelo
UNIVERSAL_OBJECTIONS: Dict[str, str] = {
    "objection_budget": "Por isso mesmo assumo o risco: o {offer} é sem custo. Você só decide depois de ver pronto. Posso começar hoje?",
    "objection_has_solution": "Ótimo que já tem! Muita gente mantém o que já usa, mas vale comparar sem compromisso — posso te mostrar como ficaria com {offer}?",
    "objection_no_time": "Entendo, leva só alguns minutos da sua parte. Eu cuido do resto. Posso te mandar um horário mais tranquilo?",
    "objection_already_uses_alternative": "O {alternative_channel} é ótimo como vitrine, mas quem pesquisa {service} em {city} no Google está com urgência para fechar na hora. Posso te mostrar a diferença sem custo?",
    "objection_trust": "Faz sentido perguntar! Trabalho com captação para {specialty} aqui em {city} e posso te mostrar referências e um modelo funcionando antes de qualquer coisa.",
    "doubt": "É sem pegadinhas: nós preparamos o {offer} sem cobrar nada. Se você aprovar, a manutenção é de {price} com tudo incluso. Se não gostar, não paga nada. Posso preparar a demonstração?"
}

NICHE_PRESETS: Dict[str, Dict[str, Any]] = {
    "estetica": {
        "key": "estetica",
        "niche_id": "estetica",
        "name": "Clínicas de Estética & Beleza",
        "display_name": "Clínicas de Estética & Beleza",
        "description": "Focado em procedimentos de alto valor (harmonização, laser, botox) e clientes que buscam no Google com alta intenção de compra.",
        "default_service": "estética avançada",
        "default_city": "São Paulo",
        "tone": "acolhedor, profissional, sem jargões médicos complexos e sem promessas irrealistas ou citação de preço de procedimentos",
        "pain_point_hook": "clientes pesquisando procedimentos no Google não encontram a clínica no topo da cidade",
        "offer_default": "esboço gratuito de site de alta performance em 24h",
        "price_default": "R$ 147/mês",
        "trust_signal_prompt": "destacar autoridade local, ambiente acolhedor e agendamento direto de avaliações pelo WhatsApp",
        "vocabulary": {
            "client_term": "clientes e pacientes",
            "search_term": "procedimentos estéticos e tratamentos corporais/faciais",
            "benefit": "agenda cheia com procedimentos particulares de alto ticket"
        },
        "ai_persona": (
            "Você é um assistente comercial especializado em captação de clientes para clínicas de estética e centros de beleza. "
            "Você entende a importância de atrair clientes interessados em procedimentos como harmonização facial, depilação a laser, "
            "botox e bioestimuladores no Google com alta intenção de agendamento."
        ),
        "steps": [
            {
                "step": 1,
                "name": "A Isca - Topo de Funil",
                "message": "Oi, bom dia! Sou aqui de {city}. Vocês ainda trabalham com {service}?",
                "wait_for_reply": True,
                "on_greeting": {
                    "next_step": 1,
                    "message": "Olá! Tudo bem? Sou aqui de {city} e gostaria de saber se vocês atendem com {service} por aí?"
                },
                "on_doubt": {
                    "next_step": 1,
                    "message": "Oi! Estou fazendo um levantamento dos melhores especialistas em {service} aqui de {city}. Vocês realizam esse tipo de atendimento?"
                },
                "on_yes": {
                    "next_step": 2,
                    "message": "Maravilha, {name}! O motivo da pergunta é bem direto: notei que vocês são referência em {service} aqui em {city}, mas quando alguém pesquisa no Google, vocês estão sem site no topo. Como o Google é onde as pessoas buscam prontas para agendar, vocês perdem clientes todo dia para a concorrência.\n\nEu criei um modelo de site profissional de alta conversão para o segmento de vocês. Posso personalizar esse esboço para a {name} sem custo nenhum para vocês verem funcionando em 24h? Se não gostarem, vida que segue. Se gostarem, cobramos uma taxa de setup de R$ 147 para colocar no ar e a manutenção é de R$ 147/mês. Faz sentido eu te mandar o link amanhã?"
                },
                "on_ask_identity": {
                    "next_step": 2,
                    "message": "Me chamo {sender_name} da Vetor Estratégico! O motivo do contato é direto: notei que vocês são referência em {service} aqui em {city}, mas quando alguém pesquisa no Google, vocês estão sem site no topo e perdem clientes todo dia para a concorrência.\n\nNós criamos modelos de páginas ultra-rápidas para o segmento de vocês. Posso personalizar esse esboço para a {name} sem custo nenhum para vocês verem funcionando em 24h? Se não gostarem, vida que segue. Se gostarem, cobramos uma taxa de setup de R$ 147 para colocar no ar e a manutenção é de R$ 147/mês. Faz sentido eu te mandar o link amanhã?"
                },
                "on_no": {
                    "next_step": "end_negative",
                    "message": "Entendido! Muito obrigado pela atenção e sucesso nos negócios."
                }
            },
            {
                "step": 2,
                "name": "O Pitch - Inversão de Risco",
                "message": "Maravilha, {name}! Eu montei uma estrutura de site focada em atrair pessoas de {city} que procuram por {service}. Posso te enviar um esboço sem compromisso em 24h?",
                "wait_for_reply": True,
                "on_greeting": {
                    "next_step": 2,
                    "message": "Olá! Posso preparar o modelo da página de {service} para a {name} sem custo para você avaliar em 24h?"
                },
                "on_doubt": {
                    "next_step": 2,
                    "message": "Não tem pegadinha, {name}! Eu monto a página sem você pagar nada adiantado. Se você gostar do resultado profissional, o valor é apenas R$ 147/mês com hospedagem rápida e suporte inclusos. Topa ver a demonstração?"
                },
                "on_yes": {
                    "next_step": "end_positive",
                    "message": "Perfeito, {name}! Vou estruturar a página personalizada da {name} com foco em agendamento de {service}. Em até 24h te envio o link exclusivo aqui no WhatsApp para você ver no celular!"
                },
                "on_no": {
                    "next_step": "end_negative",
                    "message": "Sem problemas! Caso no futuro queiram colocar a {name} no topo do Google em {city}, fico à disposição. Um abraço!"
                },
                "on_objection_social_media": {
                    "next_step": 3,
                    "message": "O Instagram é ótimo para quem já te conhece, {name}! Mas quem acorda querendo fechar {service} urgente busca direto no Google. O site captura esse cliente no momento exato da decisão. Posso te mostrar como fica em 24h sem custo?"
                },
                "on_objection_already_uses_alternative": {
                    "next_step": 3,
                    "message": "As redes sociais são ótimas como vitrine, {name}! Mas quem busca {service} no Google em {city} já está pronto para agendar. Posso montar o modelo sem custo para você ver a diferença?"
                },
                "on_objection_budget": {
                    "next_step": 4,
                    "message": "Te entendo perfeitamente, {name}! Justamente por isso não cobramos nada para criar e colocar no ar. Você só paga a taxa de R$ 147 para colocar no ar e R$ 147/mês se gostar do resultado. Posso te enviar o link pronto para você avaliar?"
                },
                "on_objection_has_website": {
                    "next_step": 5,
                    "message": "Excelente que já possuem, {name}! Mas a maioria dos sites antigos demora para carregar e perde clientes no celular. Quer que eu faça um teste de velocidade gratuito e te mostre o comparativo com nosso modelo de alta conversão?"
                },
                "on_objection_has_solution": {
                    "next_step": 5,
                    "message": "Ótimo que já possuem presença digital, {name}! Nosso modelo carrega em menos de 1 segundo e dobra os agendamentos no WhatsApp. Quer ver o teste comparativo sem compromisso?"
                },
                "on_objection_no_time": {
                    "next_step": 2,
                    "message": "Compreendo, {name}! Da sua parte leva menos de 1 minuto para olhar o link. Eu cuido de todo o desenvolvimento. Posso te mandar o link amanhã quando tiver mais tranquilo?"
                },
                "on_objection_trust": {
                    "next_step": 2,
                    "message": "Totalmente compreensível a cautela! Desenvolvemos páginas focadas em estética em {city} e você poderá ver o protótipo real funcionando antes de tomar qualquer decisão. Posso gerar a prévia?"
                },
                "on_objection_portfolio": {
                    "next_step": 2,
                    "media_path": "assets/concursosagora-analytics.png",
                    "message": "Claro, {name}! www.concursosagora.com.br é uma das páginas que desenvolvemos.\n\nEm menos de um mês conseguimos mais de 2mil acessos para esse site, como você pode ver no print do relatório de tráfego que te enviei acima. O seu site terá painel com login e senha administrativa para você poder acessar e conferir os acessos no seu site quando quiser. Utilizamos ferramentas oficiais do Google Analytics também. Não tem fidelidade, você pode cancelar o serviço quando quiser.\n\nNão criamos sites genéricos em HTML ou WordPress, como a maioria das empresas. Desenvolvemos sites modernos e de alta performance utilizando a tecnologia Next.js, proporcionando mais velocidade, segurança, excelente experiência para o usuário e uma estrutura otimizada para SEO.\n\nSeu site é desenvolvido com tecnologia de ponta para facilitar a indexação e melhorar seu potencial de posicionamento nos mecanismos de busca, como Google e Bing.\n\nPosso personalizar o modelo para a {name} sem custo nenhum para vocês verem funcionando em 24h?"
                },
                "on_ask_whats_included": {
                    "next_step": 2,
                    "message": "Excelente pergunta, {name}! No valor de R$ 147/mês está tudo incluso:\n\n• Desenvolvimento do site moderno e ultra-rápido em tecnologia Next.js\n• Hospedagem de alta velocidade e certificado de segurança SSL inclusos\n• Painel administrativo com login e senha para acompanhar métricas com Google Analytics oficial\n• Botão direto para WhatsApp e agendamentos\n• Suporte contínuo e atualizações\n• Zero contrato de fidelidade (cancele quando quiser)\n\nE você não paga nada adiantado: eu monto a página para você ver funcionando antes de tomar qualquer decisão. Posso gerar o esboço?"
                },
                "on_ask_hosting": {
                    "next_step": 2,
                    "message": "Sim, {name}, exatamente! O valor de R$ 147/mês já é com toda a hospedagem ultra-rápida, certificado de segurança SSL e suporte inclusos.\n\nVocê não precisa pagar nada a mais e nem contratar servidores por fora. E você só paga a mensalidade se aprovar o site funcionando em 24h. Posso preparar a demonstração sem custo?"
                },
                "on_objection_bot": {
                    "next_step": 2,
                    "message": "Totalmente compreensível a cautela, {name}! Me chamo {sender_name} e estou aqui acompanhando o atendimento. Usamos tecnologia para agilizar o contato inicial, mas todo o desenvolvimento, estratégia e suporte do site são feitos por nós de forma 100% personalizada para sua empresa aqui em {city}.\n\nVocê poderá ver e testar o protótipo real funcionando no seu celular antes de qualquer decisão. Posso gerar a prévia gratuita em 24h?"
                },
                "on_ask_identity": {
                    "next_step": 2,
                    "message": "Me chamo {sender_name}! O motivo da pergunta é bem direto: notei que vocês são referência em {service} aqui em {city}, mas quando alguém pesquisa no Google, vocês estão sem site no topo. Como o Google é onde as pessoas buscam prontas para agendar, vocês perdem clientes todo dia para a concorrência.\n\nEu criei um modelo de site profissional de alta conversão para o segmento de vocês. Posso personalizar esse esboço para a {name} sem custo nenhum para vocês verem funcionando em 24h? Se não gostarem, vida que segue. Se gostarem, cobramos uma taxa de setup de R$ 147 para colocar no ar e a manutenção é de R$ 147/mês. Faz sentido eu te mandar o link amanhã?"
                }
            },
            {
                "step": 3,
                "name": "Objeção: Redes Sociais / Alternativas",
                "message": "O Instagram é ótimo como vitrine, {name}! Mas quem busca {service} no Google em {city} já está com intenção clara de agendamento. Posso montar o modelo sem custo para você ver?",
                "wait_for_reply": True,
                "on_yes": {
                    "next_step": "end_positive",
                    "message": "Show de bola, {name}! Em 24h te envio o link funcionando aqui."
                },
                "on_no": {
                    "next_step": "end_negative",
                    "message": "Tranquilo! Se precisar captar mais clientes no Google, estamos à disposição."
                }
            },
            {
                "step": 4,
                "name": "Objeção: Orçamento",
                "message": "Não tem custo de criação, {name}! Você só paga R$ 147/mês se aprovar. Posso gerar o esboço gratuito?",
                "wait_for_reply": True,
                "on_yes": {
                    "next_step": "end_positive",
                    "message": "Excelente! Em 24h te envio a página pronta para teste."
                },
                "on_no": {
                    "next_step": "end_negative",
                    "message": "Compreendido! Desejo muito sucesso para a clínica."
                }
            },
            {
                "step": 5,
                "name": "Objeção: Já tem site / solução",
                "message": "Parabéns por já terem site! O nosso carrega em menos de 1 segundo e dobra os cliques no botão de WhatsApp. Quer ver o teste comparativo sem compromisso?",
                "wait_for_reply": True,
                "on_yes": {
                    "next_step": "end_positive",
                    "message": "Perfeito! Vou rodar o diagnóstico e te mando o resultado em 24h."
                },
                "on_no": {
                    "next_step": "end_negative",
                    "message": "Perfeito! Sucesso com o site atual de vocês."
                }
            }
        ]
    },

    "odontologia": {
        "key": "odontologia",
        "niche_id": "odontologia",
        "name": "Consultórios Odontológicos & Clínicas Dentárias",
        "display_name": "Consultórios Odontológicos",
        "description": "Focado em captação de pacientes particulares para implantes, alinhadores, próteses e tratamentos estéticos dentários.",
        "default_service": "implantes dentários e odontologia especializada",
        "default_city": "São Paulo",
        "tone": "profissional, acolhedor, sóbrio, sem jargões técnicos complexos e sem prometer cura ou citar preço de procedimento",
        "pain_point_hook": "pacientes particulares pesquisando no Google por dentista especializado não encontram o consultório no topo",
        "offer_default": "esboço gratuito de página odontológica em 24h",
        "price_default": "R$ 147/mês",
        "trust_signal_prompt": "destacar autoridade do cirurgião-dentista, conforto no atendimento e agendamento direto de avaliação",
        "vocabulary": {
            "client_term": "pacientes particulares",
            "search_term": "dentistas, implantes e emergências odontológicas",
            "benefit": "atrair pacientes particulares qualificados sem depender apenas de convênios"
        },
        "ai_persona": (
            "Você é um assistente comercial focado em captação de pacientes particulares para consultórios e clínicas odontológicas. "
            "Você compreende a importância de atrair tratamentos de alto valor (implantes, alinhadores invisíveis, próteses, lentes) "
            "e sabe que quem pesquisa dentista no Google tem alta urgência de agendamento."
        ),
        "steps": [
            {
                "step": 1,
                "name": "A Isca - Odontologia",
                "message": "Oi, bom dia! Sou aqui de {city}. Vocês ainda realizam atendimentos de {service} aí no consultório?",
                "wait_for_reply": True,
                "on_greeting": {
                    "next_step": 1,
                    "message": "Olá, tudo bem? Gostaria de saber se vocês atendem pacientes para {service} aqui na região de {city}?"
                },
                "on_doubt": {
                    "next_step": 1,
                    "message": "Oi! Estou mapeando as clínicas odontológicas de referência em {service} aqui em {city}. Vocês realizam esse atendimento particular?"
                },
                "on_yes": {
                    "next_step": 2,
                    "message": "Excelente, {name}! O motivo do contato é que notei que vocês são referência em {service} aqui em {city}, mas quando pacientes buscam por dentistas especializados no Google, o consultório de vocês não aparece com uma página moderna direto para o WhatsApp.\n\nHoje quem busca por {service} no Google quer agilidade e segurança para agendar. Nós desenvolvemos páginas odontológicas de alta velocidade que triplicam o contato de pacientes particulares.\n\nPosso personalizar um modelo exclusivo para a {name} sem custo nenhum para vocês avaliarem em 24h? Se aprovarem e quiserem colocar no ar, cobramos uma taxa de setup de R$ 147 (inclui domínio) e a manutenção é R$ 147/mês. Faz sentido te enviar a prévia amanhã?"
                },
                "on_ask_identity": {
                    "next_step": 2,
                    "message": "Me chamo {sender_name} da Vetor Estratégico! O motivo do contato é bem direto: notei que o consultório de vocês é referência em {service} aqui em {city}, mas quando pacientes buscam por dentistas especializados no Google, vocês estão sem site no topo e perdem pacientes particulares para a concorrência.\n\nNós desenvolvemos páginas odontológicas de alta velocidade para captação direta no WhatsApp. Posso personalizar um modelo exclusivo para a {name} sem custo nenhum para vocês avaliarem em 24h? Se aprovarem e quiserem colocar no ar, cobramos uma taxa de setup de R$ 147 (inclui domínio) e a manutenção é R$ 147/mês. Faz sentido te enviar a prévia amanhã?"
                },
                "on_no": {
                    "next_step": "end_negative",
                    "message": "Entendido, doutor(a)! Agradeço a atenção e desejo sucesso no consultório."
                }
            },
            {
                "step": 2,
                "name": "O Pitch - Pacientes Particulares",
                "message": "Maravilha, {name}! O modelo odontológico destaca a autoridade do consultório, depoimentos e botão direto para agendamento de consultas de {service}. Posso te enviar o link em 24h sem custo?",
                "wait_for_reply": True,
                "on_greeting": {
                    "next_step": 2,
                    "message": "Olá! Posso estruturar a página do consultório com foco em pacientes de {service} para você avaliar em 24h?"
                },
                "on_doubt": {
                    "next_step": 2,
                    "message": "Sem nenhum custo adiantado, {name}! Nós criamos a estrutura pronta. Se você gostar da autoridade e apresentação da clínica, o valor é fixo de R$ 147/mês com hospedagem rápida e suporte inclusos. Posso montar a demonstração?"
                },
                "on_yes": {
                    "next_step": "end_positive",
                    "message": "Perfeito, {name}! Vou montar a página odontológica da {name} com foco na captação de pacientes para {service}. Em até 24h te envio o link exclusivo aqui pelo WhatsApp!"
                },
                "on_no": {
                    "next_step": "end_negative",
                    "message": "Sem problemas! Se precisarem reforçar a captação de pacientes no Google em {city}, contem conosco."
                },
                "on_objection_social_media": {
                    "next_step": 3,
                    "message": "O Instagram é ótimo para reforçar autoridade, {name}! Mas pacientes que precisam de {service} com urgência não rolam o feed: eles vão direto ao Google. Posso te mostrar o modelo em 24h?"
                },
                "on_objection_already_uses_alternative": {
                    "next_step": 3,
                    "message": "As redes sociais ajudam na autoridade, mas no Google o paciente já busca com o objetivo de agendar consulta para {service}. Posso te mandar a demonstração sem custo?"
                },
                "on_objection_budget": {
                    "next_step": 4,
                    "message": "Com apenas 1 consulta ou avaliação fechada você já paga o ano inteiro do site! Além disso, a criação é 100% gratuita. Posso gerar o esboço para vocês verem?"
                },
                "on_objection_has_website": {
                    "next_step": 5,
                    "message": "Ótimo que já têm site! Muitos sites de clínicas demoram para abrir no celular e o paciente desiste. Quer que eu envie um raio-x gratuito da velocidade do site atual de vocês?"
                },
                "on_objection_has_solution": {
                    "next_step": 5,
                    "message": "Excelente que já possuem página! O nosso modelo abre instantaneamente e facilita o clique para o WhatsApp da recepção. Quer comparar sem compromisso?"
                },
                "on_objection_no_time": {
                    "next_step": 2,
                    "message": "Entendo perfeitamente a rotina corrida de consultório, Dr(a). {name}! Eu deixo o modelo 100% pronto e você só clica para ver quando tiver um minuto entre pacientes. Posso preparar?"
                },
                "on_objection_trust": {
                    "next_step": 2,
                    "message": "Total razão em ter cautela! Atuamos com prospecção ética para a área da saúde em {city}. Você receberá o modelo pronto para navegar antes de decidir qualquer coisa. Posso criar a prévia?"
                },
                "on_objection_portfolio": {
                    "next_step": 2,
                    "media_path": "assets/concursosagora-analytics.png",
                    "message": "Claro, {name}! www.concursosagora.com.br é uma das páginas que desenvolvemos.\n\nEm menos de um mês conseguimos mais de 2mil acessos para esse site, como você pode ver no print do relatório de tráfego que te enviei acima. O seu site terá painel com login e senha administrativa para você poder acessar e conferir os acessos no seu site quando quiser. Utilizamos ferramentas oficiais do Google Analytics também. Não tem fidelidade, você pode cancelar o serviço quando quiser.\n\nNão criamos sites genéricos em HTML ou WordPress, como a maioria das empresas. Desenvolvemos sites modernos e de alta performance utilizando a tecnologia Next.js, proporcionando mais velocidade, segurança, excelente experiência para o usuário e uma estrutura otimizada para SEO.\n\nSeu site é desenvolvido com tecnologia de ponta para facilitar a indexação e melhorar seu potencial de posicionamento nos mecanismos de busca, como Google e Bing.\n\nPosso personalizar o modelo para a {name} sem custo nenhum para vocês verem funcionando em 24h?"
                },
                "on_ask_whats_included": {
                    "next_step": 2,
                    "message": "Excelente pergunta, {name}! No valor de R$ 147/mês está tudo incluso:\n\n• Desenvolvimento moderno do site odontológico em tecnologia Next.js\n• Hospedagem ultra-rápida e certificado de segurança SSL inclusos\n• Painel administrativo com login e senha para acompanhar métricas com Google Analytics oficial\n• Botão direto para WhatsApp e agendamentos\n• Suporte contínuo e atualizações\n• Zero contrato de fidelidade (cancele quando quiser)\n\nE você não paga nada adiantado: eu monto a página para você ver funcionando antes de tomar qualquer decisão. Posso gerar o esboço?"
                },
                "on_ask_hosting": {
                    "next_step": 2,
                    "message": "Sim, {name}, exatamente! O valor de R$ 147/mês já é com toda a hospedagem ultra-rápida, certificado de segurança SSL e suporte inclusos.\n\nVocê não precisa pagar nada a mais e nem contratar servidores por fora. E você só paga a mensalidade se aprovar o site funcionando em 24h. Posso preparar a demonstração sem custo?"
                },
                "on_objection_bot": {
                    "next_step": 2,
                    "message": "Totalmente compreensível a cautela, {name}! Me chamo {sender_name} e estou aqui acompanhando o atendimento. Usamos tecnologia para agilizar o contato inicial, mas todo o desenvolvimento, estratégia e suporte do site são feitos por nós de forma 100% personalizada para sua empresa aqui em {city}.\n\nVocê poderá ver e testar o protótipo real funcionando no seu celular antes de qualquer decisão. Posso gerar a prévia gratuita em 24h?"
                },
                "on_ask_identity": {
                    "next_step": 2,
                    "message": "Me chamo {sender_name}! O motivo da pergunta é bem direto: notei que vocês são referência em {service} aqui em {city}, mas quando alguém pesquisa no Google, vocês estão sem site no topo. Como o Google é onde as pessoas buscam prontas para agendar, vocês perdem clientes todo dia para a concorrência.\n\nEu criei um modelo de site profissional de alta conversão para o segmento de vocês. Posso personalizar esse esboço para a {name} sem custo nenhum para vocês verem funcionando em 24h? Se não gostarem, vida que segue. Se gostarem, cobramos uma taxa de setup de R$ 147 para colocar no ar e a manutenção é de R$ 147/mês. Faz sentido eu te mandar o link amanhã?"
                }
            },
            {
                "step": 3,
                "name": "Objeção: Redes Sociais Odonto",
                "message": "Pacientes com intenção de tratamento pesquisam primeiro no Google. Nosso site converte essa busca em agendamentos no seu WhatsApp. Posso preparar a prévia gratuita?",
                "wait_for_reply": True,
                "on_yes": {
                    "next_step": "end_positive",
                    "message": "Excelente, {name}! Em 24h te mando a página personalizada pronta."
                },
                "on_no": {
                    "next_step": "end_negative",
                    "message": "Tudo bem! Sucesso nos atendimentos."
                }
            },
            {
                "step": 4,
                "name": "Objeção: Custo Odonto",
                "message": "Risco zero: você só investe R$ 147/mês se gostar do resultado. Posso preparar a página teste da {name}?",
                "wait_for_reply": True,
                "on_yes": {
                    "next_step": "end_positive",
                    "message": "Maravilha! Te mando o link amanhã pelo WhatsApp."
                },
                "on_no": {
                    "next_step": "end_negative",
                    "message": "Compreendido! Um abraço a toda equipe do consultório."
                }
            },
            {
                "step": 5,
                "name": "Objeção: Já possui site Odonto",
                "message": "Podemos colocar nosso modelo ultra-rápido lado a lado com o atual para você comparar. Posso te enviar?",
                "wait_for_reply": True,
                "on_yes": {
                    "next_step": "end_positive",
                    "message": "Combinado! Em 24h envio o comparativo de desempenho."
                },
                "on_no": {
                    "next_step": "end_negative",
                    "message": "Perfeito! Sucesso com o consultório."
                }
            }
        ]
    },

    "mecanica": {
        "key": "mecanica",
        "niche_id": "mecanica",
        "name": "Oficinas Mecânicas & Auto Centers",
        "display_name": "Oficinas Mecânicas & Auto Centers",
        "description": "Focado em motoristas que precisam de revisão, conserto, suspensão, freios, câmbio ou emergências mecânicas na cidade.",
        "default_service": "manutenção automotiva e mecânica especializada",
        "default_city": "São Paulo",
        "tone": "direto, prático, foco em agilidade e urgência (carro parado é prejuízo para o motorista)",
        "pain_point_hook": "motoristas com o carro quebrado pesquisam oficina mecânica no Google e precisam de orçamento rápido no WhatsApp",
        "offer_default": "esboço gratuito de página de alta conversão para a oficina em 24h",
        "price_default": "R$ 147/mês",
        "trust_signal_prompt": "destacar serviços realizados, rapidez de orçamento e atendimento ágil na oficina",
        "vocabulary": {
            "client_term": "motoristas e proprietários de veículos",
            "search_term": "oficina mecânica, conserto de carro e auto center",
            "benefit": "receber contatos diários de motoristas prontos para fechar orçamento de manutenção"
        },
        "ai_persona": (
            "Você é um assistente comercial prático e direto para oficinas mecânicas e centros automotivos. "
            "Você sabe que motorista com defeito no carro ou precisando de revisão pesquisa oficina no Google e quer saber na hora se a oficina atende pelo WhatsApp."
        ),
        "steps": [
            {
                "step": 1,
                "name": "A Isca - Mecânica",
                "message": "Opa, bom dia! Sou aqui de {city}. Vocês estão pegando serviço de {service} aí na oficina?",
                "wait_for_reply": True,
                "on_greeting": {
                    "next_step": 1,
                    "message": "Opa, tudo bem? Gostaria de saber se vocês realizam manutenção de {service} por aí em {city}?"
                },
                "on_doubt": {
                    "next_step": 1,
                    "message": "Opa! Estou mapeando as oficinas de confiança para {service} em {city}. Vocês estão realizando esse serviço?"
                },
                "on_yes": {
                    "next_step": 2,
                    "message": "Show de bola, {name}! O motivo da pergunta é simples: vi que vocês são uma oficina forte em {service} aqui em {city}, mas quando o motorista pesquisa no Google com o carro quebrado ou precisando de revisão, vocês não estão aparecendo com site rápido no topo.\n\nMotorista pesquisa no Google e quer chamar no WhatsApp na hora. Eu criei um modelo de página para oficina mecânica que triplica esses chamados de orçamento.\n\nPosso montar um esboço exclusivo para a {name} sem custo nenhum para vocês verem funcionando em 24h? Se curtirem e quiserem colocar no ar, cobramos uma taxa de setup de R$ 147 (inclui domínio) e a manutenção é R$ 147/mês. Posso preparar para amanhã?"
                },
                "on_ask_identity": {
                    "next_step": 2,
                    "message": "Me chamo {sender_name} da Vetor Estratégico! O motivo do contato é simples: vi que vocês são uma oficina forte em {service} aqui em {city}, mas quando o motorista pesquisa no Google com o carro quebrado ou precisando de revisão, vocês não estão aparecendo com site rápido no topo e perdem serviços para concorrentes.\n\nEu criei um modelo de página para oficina mecânica que triplica esses chamados de orçamento no WhatsApp. Posso montar um esboço exclusivo para a {name} sem custo nenhum para vocês verem funcionando em 24h? Se curtirem e quiserem colocar no ar, cobramos uma taxa de setup de R$ 147 (inclui domínio) e a manutenção é R$ 147/mês. Posso preparar para amanhã?"
                },
                "on_no": {
                    "next_step": "end_negative",
                    "message": "Beleza! Obrigado pela atenção e bom trabalho na oficina."
                }
            },
            {
                "step": 2,
                "name": "O Pitch - Motoristas no Google",
                "message": "Maravilha, {name}! A página da oficina foca em botão rápido de WhatsApp para cotação de {service} e localização no Google Maps. Posso gerar o esboço gratuito em 24h?",
                "wait_for_reply": True,
                "on_greeting": {
                    "next_step": 2,
                    "message": "Olá! Posso gerar a página de demonstração da oficina para {service} sem custo para você ver em 24h?"
                },
                "on_doubt": {
                    "next_step": 2,
                    "message": "Risco zero, {name}! Eu monto a página sem cobrar nada adiantado. Se você gostar e quiser colocar no ar, a hospedagem e suporte é só R$ 147/mês. Topa dar uma olhada?"
                },
                "on_yes": {
                    "next_step": "end_positive",
                    "message": "Perfeito! Em 24h te mando a página da oficina funcionando."
                },
                "on_no": {
                    "next_step": "end_negative",
                    "message": "Tranquilo! Se precisarem de mais clientes do Google para a oficina em {city}, só chamar."
                },
                "on_objection_social_media": {
                    "next_step": 3,
                    "message": "Motorista que quebrou o carro ou precisa de revisão não vai pro Instagram, {name}: ele joga direto no Google 'oficina mecânica {city}'. A página pesca esse motorista na hora. Posso te mostrar o modelo sem custo?"
                },
                "on_objection_already_uses_alternative": {
                    "next_step": 3,
                    "message": "Rede social é boa para vitrine, mas no momento do conserto o cliente vai direto no Google. Posso te enviar a demonstração sem custo para você ver?"
                },
                "on_objection_budget": {
                    "next_step": 4,
                    "message": "Uma única revisão ou troca de óleo a mais que o Google te trouxer no mês já paga a taxa de R$ 147 com folga! E a criação é de graça. Posso fazer o protótipo?"
                },
                "on_objection_has_website": {
                    "next_step": 5,
                    "message": "Legal que já têm site! Mas muitos sites antigos demoram 8 segundos para abrir no celular e o motorista volta pro Google. Quer ver um teste comparativo grátis?"
                },
                "on_objection_has_solution": {
                    "next_step": 5,
                    "message": "Ótimo que já têm site! Nosso modelo abre instantaneamente e tem botão de WhatsApp direto. Posso mandar uma prévia para você comparar?"
                },
                "on_objection_no_time": {
                    "next_step": 2,
                    "message": "Com certeza a oficina é corrida! Eu deixo a página 100% pronta e te mando o link só para você clicar e ver quando der uma folga. Posso começar?"
                },
                "on_objection_trust": {
                    "next_step": 2,
                    "message": "Faz total sentido! Você não paga nada antes de ver e aprovar o site funcionando no seu celular. Posso montar o modelo para a oficina?"
                },
                "on_objection_portfolio": {
                    "next_step": 2,
                    "media_path": "assets/concursosagora-analytics.png",
                    "message": "Claro, {name}! www.concursosagora.com.br é uma das páginas que desenvolvemos.\n\nEm menos de um mês conseguimos mais de 2mil acessos para esse site, como você pode ver no print do relatório de tráfego que te enviei acima. O seu site terá painel com login e senha administrativa para você poder acessar e conferir os acessos no seu site quando quiser. Utilizamos ferramentas oficiais do Google Analytics também. Não tem fidelidade, você pode cancelar o serviço quando quiser.\n\nNão criamos sites genéricos em HTML ou WordPress, como a maioria das empresas. Desenvolvemos sites modernos e de alta performance utilizando a tecnologia Next.js, proporcionando mais velocidade, segurança, excelente experiência para o usuário e uma estrutura otimizada para SEO.\n\nSeu site é desenvolvido com tecnologia de ponta para facilitar a indexação e melhorar seu potencial de posicionamento nos mecanismos de busca, como Google e Bing.\n\nPosso personalizar o modelo para a {name} sem custo nenhum para vocês verem funcionando em 24h?"
                },
                "on_ask_whats_included": {
                    "next_step": 2,
                    "message": "Excelente pergunta, {name}! No valor de R$ 147/mês está tudo incluso:\n\n• Desenvolvimento moderno do site da oficina em tecnologia Next.js\n• Hospedagem ultra-rápida e certificado de segurança SSL inclusos\n• Painel administrativo com login e senha para acompanhar métricas com Google Analytics oficial\n• Botão direto para WhatsApp e orçamentos rápidos\n• Suporte contínuo e atualizações\n• Zero contrato de fidelidade (cancele quando quiser)\n\nE você não paga nada adiantado: eu monto a página para você ver funcionando antes de tomar qualquer decisão. Posso gerar o esboço?"
                },
                "on_ask_hosting": {
                    "next_step": 2,
                    "message": "Sim, {name}, exatamente! O valor de R$ 147/mês já é com toda a hospedagem ultra-rápida, certificado de segurança SSL e suporte inclusos.\n\nVocê não precisa pagar nada a mais e nem contratar servidores por fora. E você só paga a mensalidade se aprovar o site funcionando em 24h. Posso preparar a demonstração sem custo?"
                },
                "on_objection_bot": {
                    "next_step": 2,
                    "message": "Totalmente compreensível a cautela, {name}! Me chamo {sender_name} e estou aqui acompanhando o atendimento. Usamos tecnologia para agilizar o contato inicial, mas todo o desenvolvimento, estratégia e suporte do site são feitos por nós de forma 100% personalizada para sua empresa aqui em {city}.\n\nVocê poderá ver e testar o protótipo real funcionando no seu celular antes de qualquer decisão. Posso gerar a prévia gratuita em 24h?"
                },
                "on_ask_identity": {
                    "next_step": 2,
                    "message": "Me chamo {sender_name}! O motivo da pergunta é bem direto: notei que vocês são referência em {service} aqui em {city}, mas quando alguém pesquisa no Google, vocês estão sem site no topo. Como o Google é onde as pessoas buscam prontas para agendar, vocês perdem clientes todo dia para a concorrência.\n\nEu criei um modelo de site profissional de alta conversão para o segmento de vocês. Posso personalizar esse esboço para a {name} sem custo nenhum para vocês verem funcionando em 24h? Se não gostarem, vida que segue. Se gostarem, cobramos uma taxa de setup de R$ 147 para colocar no ar e a manutenção é de R$ 147/mês. Faz sentido eu te mandar o link amanhã?"
                }
            },
            {
                "step": 3,
                "name": "Objeção: Redes Sociais Mecânica",
                "message": "Motorista com pressa busca no Google para resolver o problema do carro. Nosso site direciona esse cliente para o seu WhatsApp. Posso mandar a prévia?",
                "wait_for_reply": True,
                "on_yes": {
                    "next_step": "end_positive",
                    "message": "Fechado, {name}! Em 24h envio o link pronto para a oficina."
                },
                "on_no": {
                    "next_step": "end_negative",
                    "message": "Tranquilo! Boas vendas na oficina."
                }
            },
            {
                "step": 4,
                "name": "Objeção: Orçamento Mecânica",
                "message": "Criação 100% sem custo. Você só paga R$ 147/mês se gostar da página. Posso preparar?",
                "wait_for_reply": True,
                "on_yes": {
                    "next_step": "end_positive",
                    "message": "Excelente! Te mando o link amanhã pelo WhatsApp."
                },
                "on_no": {
                    "next_step": "end_negative",
                    "message": "Combinado! Sucesso aí nos serviços."
                }
            },
            {
                "step": 5,
                "name": "Objeção: Já tem site Mecânica",
                "message": "Fazemos o teste de velocidade comparativo sem custo. Se o nosso não for visivelmente mais rápido, vida que segue. Topa ver?",
                "wait_for_reply": True,
                "on_yes": {
                    "next_step": "end_positive",
                    "message": "Perfeito! Em 24h te envio o teste comparativo."
                },
                "on_no": {
                    "next_step": "end_negative",
                    "message": "Valeu, {name}! Um abraço."
                }
            }
        ]
    },

    "veterinaria": {
        "key": "veterinaria",
        "niche_id": "veterinaria",
        "name": "Clínicas Veterinárias & Pet Shops",
        "display_name": "Clínicas Veterinárias & Pet Shops",
        "description": "Focado em tutores de pets que buscam atendimento veterinário, vacinas, cirurgias, emergência 24h e banho/tosa na cidade.",
        "default_service": "atendimento veterinário e cuidados pet",
        "default_city": "São Paulo",
        "tone": "empático, carinhoso com os pets, profissional, focado na segurança e tranquilidade dos tutores",
        "pain_point_hook": "tutores com pet doente ou precisando de vacinas e consultas buscam veterinário de confiança no Google",
        "offer_default": "esboço gratuito de página para a clínica veterinária em 24h",
        "price_default": "R$ 147/mês",
        "trust_signal_prompt": "destacar carinho no cuidado animal, estrutura e facilidade de agendamento",
        "vocabulary": {
            "client_term": "tutores de pets e animais de estimação",
            "search_term": "clínica veterinária, veterinário 24h e vacinação pet",
            "benefit": "atrair tutores que buscam atendimento de confiança para seus pets no Google"
        },
        "ai_persona": (
            "Você é um assistente comercial atencioso e especializado para clínicas veterinárias e pet shops. "
            "Você compreende o amor dos tutores pelos animais e a urgência de encontrar um veterinário de confiança no Google."
        ),
        "steps": [
            {
                "step": 1,
                "name": "A Isca - Veterinária",
                "message": "Oi, bom dia! Sou aqui de {city}. Vocês realizam atendimento de {service} aí na clínica?",
                "wait_for_reply": True,
                "on_greeting": {
                    "next_step": 1,
                    "message": "Olá, tudo bem? Gostaria de saber se vocês atendem com {service} aqui na região de {city}?"
                },
                "on_doubt": {
                    "next_step": 1,
                    "message": "Oi! Estou buscando clínicas de confiança para {service} em {city}. Vocês realizam esse atendimento?"
                },
                "on_yes": {
                    "next_step": 2,
                    "message": "Que ótimo, {name}! O motivo do contato é que vi que vocês cuidam com muito carinho de {service} aqui em {city}, mas quando tutores pesquisam por veterinário no Google, a clínica de vocês não aparece com destaque e botão rápido para o WhatsApp.\n\nTutores que buscam no Google querem falar rápido para agendar consultas e tirar dúvidas sobre seus pets. Nós desenvolvemos páginas veterinárias de alta velocidade que facilitam esse contato.\n\nPosso preparar um esboço sem custo nenhum para a {name} avaliar em 24h? Se aprovarem e quiserem colocar no ar, cobramos uma taxa de setup de R$ 147 (inclui domínio) e a manutenção é R$ 147/mês. Posso te mandar amanhã?"
                },
                "on_ask_identity": {
                    "next_step": 2,
                    "message": "Me chamo {sender_name} da Vetor Estratégico! O motivo do contato é que vi que vocês cuidam com muito carinho de {service} aqui em {city}, mas quando tutores pesquisam por veterinário no Google, a clínica de vocês não aparece com destaque no topo e perdem atendimentos para concorrentes.\n\nNós desenvolvemos páginas veterinárias de alta velocidade que triplicam o contato de tutores no WhatsApp. Posso preparar um esboço sem custo nenhum para a {name} avaliar em 24h? Se aprovarem e quiserem colocar no ar, cobramos uma taxa de setup de R$ 147 (inclui domínio) e a manutenção é R$ 147/mês. Posso te mandar amanhã?"
                },
                "on_no": {
                    "next_step": "end_negative",
                    "message": "Entendido! Agradeço a atenção e desejo muito sucesso para a clínica e aos pets."
                }
            },
            {
                "step": 2,
                "name": "O Pitch - Cuidado com os Pets",
                "message": "Maravilha, {name}! O modelo veterinário transmite total confiança aos tutores de {city}, com destaque para consultas de {service} e agendamento no WhatsApp. Posso te enviar a prévia sem custo em 24h?",
                "wait_for_reply": True,
                "on_greeting": {
                    "next_step": 2,
                    "message": "Olá! Posso estruturar a página da clínica para {service} para você avaliar em 24h?"
                },
                "on_doubt": {
                    "next_step": 2,
                    "message": "Sem custo adiantado, {name}! Nós deixamos tudo pronto. Se gostar do resultado e quiser manter no ar, o valor é só R$ 147/mês com hospedagem rápida e suporte inclusos. Topa ver a prévia?"
                },
                "on_yes": {
                    "next_step": "end_positive",
                    "message": "Perfeito, {name}! Vou estruturar a página da {name} com muito carinho. Em até 24h te envio o link exclusivo aqui no WhatsApp!"
                },
                "on_no": {
                    "next_step": "end_negative",
                    "message": "Sem problemas! Se no futuro quiserem fortalecer a presença no Google em {city}, estamos por aqui."
                },
                "on_objection_social_media": {
                    "next_step": 3,
                    "message": "O Instagram é ótimo para fotos dos pets, {name}! Mas quando o pet passa mal ou precisa de vacina urgente, o tutor vai direto ao Google. Posso te mostrar como fica em 24h?"
                },
                "on_objection_already_uses_alternative": {
                    "next_step": 3,
                    "message": "As redes sociais mostram o dia a dia, mas a busca por veterinário no Google é focada em agendamento imediato. Posso te mandar a demonstração sem custo?"
                },
                "on_objection_budget": {
                    "next_step": 4,
                    "message": "Uma única consulta ou pacote preventivo pago já cobre o custo anual da página! E você não paga nada para criar. Posso gerar o esboço?"
                },
                "on_objection_has_website": {
                    "next_step": 5,
                    "message": "Ótimo que já têm site! Mas páginas pesadas perdem mais da metade dos tutores no celular. Quer ver um teste comparativo gratuito com nosso modelo ultra-rápido?"
                },
                "on_objection_has_solution": {
                    "next_step": 5,
                    "message": "Legal que já possuem site! O nosso carrega em 1 segundo no celular e dobra os cliques no WhatsApp. Quer comparar sem compromisso?"
                },
                "on_objection_no_time": {
                    "next_step": 2,
                    "message": "Com certeza a rotina com os animais é corrida! Eu deixo a página pronta e te mando o link para ver em um minuto de folga. Posso preparar?"
                },
                "on_objection_trust": {
                    "next_step": 2,
                    "message": "Total razão! Desenvolvemos o protótipo real sem nenhum compromisso para você navegar e aprovar antes de qualquer decisão. Posso gerar?"
                },
                "on_objection_portfolio": {
                    "next_step": 2,
                    "media_path": "assets/concursosagora-analytics.png",
                    "message": "Claro, {name}! www.concursosagora.com.br é uma das páginas que desenvolvemos.\n\nEm menos de um mês conseguimos mais de 2mil acessos para esse site, como você pode ver no print do relatório de tráfego que te enviei acima. O seu site terá painel com login e senha administrativa para você poder acessar e conferir os acessos no seu site quando quiser. Utilizamos ferramentas oficiais do Google Analytics também. Não tem fidelidade, você pode cancelar o serviço quando quiser.\n\nNão criamos sites genéricos em HTML ou WordPress, como a maioria das empresas. Desenvolvemos sites modernos e de alta performance utilizando a tecnologia Next.js, proporcionando mais velocidade, segurança, excelente experiência para o usuário e uma estrutura otimizada para SEO.\n\nSeu site é desenvolvido com tecnologia de ponta para facilitar a indexação e melhorar seu potencial de posicionamento nos mecanismos de busca, como Google e Bing.\n\nPosso personalizar o modelo para a {name} sem custo nenhum para vocês verem funcionando em 24h?"
                },
                "on_ask_whats_included": {
                    "next_step": 2,
                    "message": "Excelente pergunta, {name}! No valor de R$ 147/mês está tudo incluso:\n\n• Desenvolvimento moderno do site veterinário em tecnologia Next.js\n• Hospedagem ultra-rápida e certificado de segurança SSL inclusos\n• Painel administrativo com login e senha para acompanhar métricas com Google Analytics oficial\n• Botão direto para WhatsApp e agendamento de consultas\n• Suporte contínuo e atualizações\n• Zero contrato de fidelidade (cancele quando quiser)\n\nE você não paga nada adiantado: eu monto a página para você ver funcionando antes de tomar qualquer decisão. Posso gerar o esboço?"
                },
                "on_ask_hosting": {
                    "next_step": 2,
                    "message": "Sim, {name}, exatamente! O valor de R$ 147/mês já é com toda a hospedagem ultra-rápida, certificado de segurança SSL e suporte inclusos.\n\nVocê não precisa pagar nada a mais e nem contratar servidores por fora. E você só paga a mensalidade se aprovar o site funcionando em 24h. Posso preparar a demonstração sem custo?"
                },
                "on_objection_bot": {
                    "next_step": 2,
                    "message": "Totalmente compreensível a cautela, {name}! Me chamo {sender_name} e estou aqui acompanhando o atendimento. Usamos tecnologia para agilizar o contato inicial, mas todo o desenvolvimento, estratégia e suporte do site são feitos por nós de forma 100% personalizada para sua empresa aqui em {city}.\n\nVocê poderá ver e testar o protótipo real funcionando no seu celular antes de qualquer decisão. Posso gerar a prévia gratuita em 24h?"
                },
                "on_ask_identity": {
                    "next_step": 2,
                    "message": "Me chamo {sender_name}! O motivo da pergunta é bem direto: notei que vocês são referência em {service} aqui em {city}, mas quando alguém pesquisa no Google, vocês estão sem site no topo. Como o Google é onde as pessoas buscam prontas para agendar, vocês perdem clientes todo dia para a concorrência.\n\nEu criei um modelo de site profissional de alta conversão para o segmento de vocês. Posso personalizar esse esboço para a {name} sem custo nenhum para vocês verem funcionando em 24h? Se não gostarem, vida que segue. Se gostarem, cobramos uma taxa de setup de R$ 147 para colocar no ar e a manutenção é de R$ 147/mês. Faz sentido eu te mandar o link amanhã?"
                }
            },
            {
                "step": 3,
                "name": "Objeção: Redes Sociais Vet",
                "message": "Tutores com urgência buscam no Google. Nosso site transforma essa busca em mensagens no WhatsApp da clínica. Posso gerar a prévia?",
                "wait_for_reply": True,
                "on_yes": {
                    "next_step": "end_positive",
                    "message": "Excelente, {name}! Amanhã te envio o link da página."
                },
                "on_no": {
                    "next_step": "end_negative",
                    "message": "Tranquilo! Um abraço para toda a equipe da clínica."
                }
            },
            {
                "step": 4,
                "name": "Objeção: Orçamento Vet",
                "message": "Criação sem custo. Você só investe a taxa de R$ 147 para colocar no ar e R$ 147/mês se gostar da página pronta. Posso preparar?",
                "wait_for_reply": True,
                "on_yes": {
                    "next_step": "end_positive",
                    "message": "Maravilha! Em 24h te envio o link por aqui."
                },
                "on_no": {
                    "next_step": "end_negative",
                    "message": "Compreendido! Sucesso nos atendimentos."
                }
            },
            {
                "step": 5,
                "name": "Objeção: Já tem site Vet",
                "message": "Nosso site carrega em 1 segundo e dobra os cliques no WhatsApp. Quer ver o teste comparativo?",
                "wait_for_reply": True,
                "on_yes": {
                    "next_step": "end_positive",
                    "message": "Combinado! Em 24h envio o comparativo."
                },
                "on_no": {
                    "next_step": "end_negative",
                    "message": "Perfeito! Sucesso com os pets."
                }
            }
        ]
    },

    "advocacia": {
        "key": "advocacia",
        "niche_id": "advocacia",
        "name": "Escritórios de Advocacia & Consultoria Jurídica",
        "display_name": "Escritórios de Advocacia",
        "description": "Focado em clientes com causas especializadas (trabalhista, previdenciário, empresarial, cível, família) buscando autoridade e sobriedade.",
        "default_service": "assessoria jurídica especializada",
        "default_city": "São Paulo",
        "tone": "formal, sóbrio, ético, respeitoso com normas do conselho de classe, sem prometer ganhos de causas ou citar honorários",
        "pain_point_hook": "clientes com problemas jurídicos buscam advogados de autoridade e confiança no Google",
        "offer_default": "esboço gratuito de página institucional de alta autoridade em 24h",
        "price_default": "R$ 147/mês",
        "trust_signal_prompt": "destacar seriedade, áreas de atuação e agilidade de contato institucional via WhatsApp",
        "vocabulary": {
            "client_term": "clientes e demandantes jurídicos",
            "search_term": "advogado trabalhista, assessoria jurídica e consultoria de direito",
            "benefit": "posicionar o escritório com autoridade no Google para consultas qualificadas"
        },
        "ai_persona": (
            "Você é um assistente institucional sóbrio e ético para escritórios de advocacia. "
            "Você compreende o rigor e a seriedade da profissão e sabe que clientes com causas jurídicas buscam autoridade no Google."
        ),
        "steps": [
            {
                "step": 1,
                "name": "A Isca - Advocacia",
                "message": "Olá, bom dia! Sou aqui de {city}. O escritório de vocês atua com causas de {service}?",
                "wait_for_reply": True,
                "on_greeting": {
                    "next_step": 1,
                    "message": "Olá, tudo bem? Gostaria de saber se o escritório presta assessoria jurídica em {service} aqui em {city}?"
                },
                "on_doubt": {
                    "next_step": 1,
                    "message": "Olá! Estou buscando referências jurídicas em {service} aqui na região de {city}. O escritório atende essa área?"
                },
                "on_yes": {
                    "next_step": 2,
                    "message": "Excelente, Dr(a). {name}! O motivo do contato é que notei a sólida atuação de vocês em {city}, mas quando potenciais clientes pesquisam no Google por advogados especializados em {service}, o escritório não possui uma página institucional de alta velocidade otimizada para WhatsApp.\n\nHoje clientes com demandas jurídicas urgentes buscam primeiro no Google por profissionais de confiança.\n\nNós criamos landing pages jurídicas de alta autoridade e sobriedade. Posso estruturar um modelo exclusivo para a {name} sem custo para vocês avaliarem em 24h? Se aprovarem e quiserem colocar no ar, cobramos uma taxa de setup de R$ 147 (inclui domínio) e a manutenção é R$ 147/mês. Faz sentido eu te enviar o link amanhã?"
                },
                "on_ask_identity": {
                    "next_step": 2,
                    "message": "Me chamo {sender_name} da Vetor Estratégico! O motivo do contato é que notei a sólida atuação de vocês em {service} aqui em {city}, mas quando potenciais clientes pesquisam no Google por advogados especializados, o escritório não possui uma página institucional de alta velocidade no topo e perdem clientes para a concorrência.\n\nNós criamos landing pages jurídicas de alta autoridade e sobriedade. Posso estruturar um modelo exclusivo para a {name} sem custo para vocês avaliarem em 24h? Se aprovarem e quiserem colocar no ar, cobramos uma taxa de setup de R$ 147 (inclui domínio) e a manutenção é R$ 147/mês. Faz sentido eu te enviar o link amanhã?"
                },
                "on_no": {
                    "next_step": "end_negative",
                    "message": "Entendido, doutor(a)! Agradeço a atenção e desejo sucesso nos processos."
                }
            },
            {
                "step": 2,
                "name": "O Pitch - Autoridade Jurídica",
                "message": "Maravilha, {name}! A página jurídica destaca as áreas de atuação do escritório em {service}, corpo jurídico e botão direto para consulta pelo WhatsApp. Posso estruturar a prévia sem custo em 24h?",
                "wait_for_reply": True,
                "on_greeting": {
                    "next_step": 2,
                    "message": "Olá! Posso preparar a página institucional de {service} do escritório para você avaliar em 24h?"
                },
                "on_doubt": {
                    "next_step": 2,
                    "message": "Sem adiantamentos, Dr(a). {name}! Nós preparamos a estrutura completa. Se aprovar a qualidade e autoridade transmitida, o plano possui uma taxa de adesão de R$ 147 e mensalidade de R$ 147/mês com hospedagem rápida e suporte inclusos. Topa avaliar a prévia?"
                },
                "on_yes": {
                    "next_step": "end_positive",
                    "message": "Perfeito, Dr(a). {name}! Vou preparar a página do escritório com foco em {service}. Em até 24h te envio o link exclusivo aqui no WhatsApp!"
                },
                "on_no": {
                    "next_step": "end_negative",
                    "message": "Compreendido! Se no futuro quiserem fortalecer o posicionamento digital do escritório no Google em {city}, estamos à disposição."
                },
                "on_objection_social_media": {
                    "next_step": 3,
                    "message": "As redes sociais são ótimas para networking, mas clientes com problemas jurídicos buscam no Google pela autoridade de um site próprio. Posso te enviar a demonstração sem custo?"
                },
                "on_objection_already_uses_alternative": {
                    "next_step": 3,
                    "message": "A indicação e redes sociais são importantes, mas um site institucional sólido no Google atrai clientes com causas imediatas. Posso estruturar a prévia sem compromisso?"
                },
                "on_objection_budget": {
                    "next_step": 4,
                    "message": "Com 1 consulta ou honorário inicial você já cobre com folga todo o custo anual da página. E o esboço é gratuito. Posso gerar para você avaliar?"
                },
                "on_objection_has_website": {
                    "next_step": 5,
                    "message": "Excelente que já possuem presença digital! Mas muitos sites jurídicos antigos demoram no celular e não são adaptados para WhatsApp. Gostaria de ver uma análise de velocidade gratuita?"
                },
                "on_objection_has_solution": {
                    "next_step": 5,
                    "message": "Ótimo que já possuem site! O nosso modelo abre em menos de 1 segundo e tem foco direto em WhatsApp institucional. Quer comparar sem custo?"
                },
                "on_objection_no_time": {
                    "next_step": 2,
                    "message": "Compreendo a intensa rotina forense, Dr(a). {name}! Enviarei o link pronto para que você possa avaliar em apenas 1 minuto quando lhe for conveniente. Posso preparar?"
                },
                "on_objection_trust": {
                    "next_step": 2,
                    "message": "Compreendo perfeitamente o zelo profissional. O protótipo é gerado sem nenhum compromisso ou taxa inicial para sua total apreciação. Posso encaminhar amanhã?"
                },
                "on_objection_portfolio": {
                    "next_step": 2,
                    "media_path": "assets/concursosagora-analytics.png",
                    "message": "Claro, {name}! www.concursosagora.com.br é uma das páginas que desenvolvemos.\n\nEm menos de um mês conseguimos mais de 2mil acessos para esse site, como você pode ver no print do relatório de tráfego que te enviei acima. O seu site terá painel com login e senha administrativa para você poder acessar e conferir os acessos no seu site quando quiser. Utilizamos ferramentas oficiais do Google Analytics também. Não tem fidelidade, você pode cancelar o serviço quando quiser.\n\nNão criamos sites genéricos em HTML ou WordPress, como a maioria das empresas. Desenvolvemos sites modernos e de alta performance utilizando a tecnologia Next.js, proporcionando mais velocidade, segurança, excelente experiência para o usuário e uma estrutura otimizada para SEO.\n\nSeu site é desenvolvido com tecnologia de ponta para facilitar a indexação e melhorar seu potencial de posicionamento nos mecanismos de busca, como Google e Bing.\n\nPosso personalizar o modelo para a {name} sem custo nenhum para vocês verem funcionando em 24h?"
                },
                "on_ask_whats_included": {
                    "next_step": 2,
                    "message": "Excelente pergunta, {name}! No valor de R$ 147/mês está tudo incluso:\n\n• Desenvolvimento moderno de página jurídica institucional em tecnologia Next.js\n• Hospedagem ultra-rápida e certificado de segurança SSL inclusos\n• Painel administrativo com login e senha para acompanhar métricas com Google Analytics oficial\n• Botão direto para WhatsApp institucional\n• Suporte contínuo e atualizações\n• Zero contrato de fidelidade (cancele quando quiser)\n\nE você não paga nada adiantado: eu monto a página para você ver funcionando antes de tomar qualquer decisão. Posso gerar o esboço?"
                },
                "on_ask_hosting": {
                    "next_step": 2,
                    "message": "Sim, {name}, exatamente! O valor de R$ 147/mês já é com toda a hospedagem ultra-rápida, certificado de segurança SSL e suporte inclusos.\n\nVocê não precisa pagar nada a mais e nem contratar servidores por fora. E você só paga a mensalidade se aprovar o site funcionando em 24h. Posso preparar a demonstração sem custo?"
                },
                "on_objection_bot": {
                    "next_step": 2,
                    "message": "Totalmente compreensível a cautela, {name}! Me chamo {sender_name} e estou aqui acompanhando o atendimento. Usamos tecnologia para agilizar o contato inicial, mas todo o desenvolvimento, estratégia e suporte do site são feitos por nós de forma 100% personalizada para sua empresa aqui em {city}.\n\nVocê poderá ver e testar o protótipo real funcionando no seu celular antes de qualquer decisão. Posso gerar a prévia gratuita em 24h?"
                },
                "on_ask_identity": {
                    "next_step": 2,
                    "message": "Me chamo {sender_name}! O motivo da pergunta é bem direto: notei que vocês são referência em {service} aqui em {city}, mas quando alguém pesquisa no Google, vocês estão sem site no topo. Como o Google é onde as pessoas buscam prontas para agendar, vocês perdem clientes todo dia para a concorrência.\n\nEu criei um modelo de site profissional de alta conversão para o segmento de vocês. Posso personalizar esse esboço para a {name} sem custo nenhum para vocês verem funcionando em 24h? Se não gostarem, vida que segue. Se gostarem, cobramos uma taxa de setup de R$ 147 para colocar no ar e a manutenção é de R$ 147/mês. Faz sentido eu te mandar o link amanhã?"
                }
            },
            {
                "step": 3,
                "name": "Objeção: Redes Sociais Advocacia",
                "message": "O Google transmite máxima credibilidade para clientes que buscam assessoria jurídica. Posso preparar a página modelo para você avaliar?",
                "wait_for_reply": True,
                "on_yes": {
                    "next_step": "end_positive",
                    "message": "Show! Em 24h te envio o link da página do escritório."
                },
                "on_no": {
                    "next_step": "end_negative",
                    "message": "Perfeito! Sucesso nas atividades jurídicas."
                }
            },
            {
                "step": 4,
                "name": "Objeção: Orçamento Advocacia",
                "message": "Risco zero, criação gratuita e valor de R$ 147/mês só se você aprovar. Posso gerar o esboço?",
                "wait_for_reply": True,
                "on_yes": {
                    "next_step": "end_positive",
                    "message": "Maravilha! Amanhã te envio o link aqui."
                },
                "on_no": {
                    "next_step": "end_negative",
                    "message": "Entendido! Bom trabalho no escritório."
                }
            },
            {
                "step": 5,
                "name": "Objeção: Já tem site Advocacia",
                "message": "Nossas páginas carregam em menos de 1s e aumentam a conversão de contatos. Posso te enviar o comparativo?",
                "wait_for_reply": True,
                "on_yes": {
                    "next_step": "end_positive",
                    "message": "Combinado! Em 24h envio o comparativo."
                },
                "on_no": {
                    "next_step": "end_negative",
                    "message": "Perfeito! Um abraço."
                }
            }
        ]
    },

    "custom": {
        "key": "custom",
        "niche_id": "custom",
        "name": "Personalizado / Qualquer Nicho",
        "display_name": "Personalizado / Qualquer Segmento",
        "description": "IA adaptativa genérica para qualquer ramo de atividade informado na lista de contatos.",
        "default_service": "serviços especializados",
        "default_city": "São Paulo",
        "tone": "consultivo, direto, profissional e focado em benefícios reais de captação comercial",
        "pain_point_hook": "clientes com alta intenção de compra pesquisam no Google e precisam de contato ágil no WhatsApp",
        "offer_default": "esboço gratuito de página de alta performance em 24h",
        "price_default": "R$ 147/mês",
        "trust_signal_prompt": "destacar rapidez, transparência e risco zero",
        "vocabulary": {
            "client_term": "clientes",
            "search_term": "produtos e serviços locais",
            "benefit": "gerar novos contatos e pedidos comerciais todos os dias"
        },
        "ai_persona": (
            "Você é um consultor comercial adaptativo e focado em captação de clientes para empresas e prestadores de serviços locais. "
            "Seu papel é qualificar o contato com brevidade, empatia e cordialidade."
        ),
        "steps": [
            {
                "step": 1,
                "name": "A Isca - Topo de Funil",
                "message": "Oi, bom dia! Sou aqui de {city}. Vocês ainda trabalham com {service}?",
                "wait_for_reply": True,
                "on_greeting": {
                    "next_step": 1,
                    "message": "Olá! Tudo bem? Gostaria de saber se vocês ainda prestam atendimento de {service} por aí?"
                },
                "on_doubt": {
                    "next_step": 1,
                    "message": "Oi! Sou morador aqui de {city} e estava pesquisando empresas de {service}. Vocês ainda realizam esse atendimento?"
                },
                "on_yes": {
                    "next_step": 2,
                    "message": "Maravilha, {name}! O motivo da pergunta é que notei que vocês estão sem site no Google e estão perdendo clientes por isso. Eu crio sites de alta performance para o seu segmento e topo desenhar a página da sua empresa de graça. Em 24 horas te mando o link do site funcionando.\n\nSe você gostar do resultado, cobramos a taxa de R$ 147 para colocar no ar e a manutenção de R$ 147/mês. Sem contrato de fidelidade e risco zero. Se não quiser ficar com o site, não me paga nada. Posso começar o seu esboço para te mostrar amanhã?"
                },
                "on_ask_identity": {
                    "next_step": 2,
                    "message": "Me chamo {sender_name} da Vetor Estratégico! O motivo do contato é bem direto: notei que vocês atuam com {service} aqui em {city}, mas quando potenciais clientes pesquisam no Google, vocês estão sem site no topo e perdem vendas para concorrentes.\n\nNós criamos modelos de páginas ultra-rápidas focadas em captação no WhatsApp. Posso personalizar um modelo exclusivo para a {name} sem custo nenhum para vocês avaliarem em 24h? Se aprovarem, a taxa para colocar no ar é R$ 147 e a manutenção é R$ 147/mês. Faz sentido eu te mandar o link amanhã?"
                },
                "on_no": {
                    "next_step": "end_negative",
                    "message": "Entendido! Muito obrigado pela atenção. Se precisarem de algo no futuro, estamos à disposição. Tenha um ótimo dia!"
                }
            },
            {
                "step": 2,
                "name": "O Pitch - Inversão de Risco",
                "message": "Maravilha, {name}! Eu crio páginas de alta conversão para atrair clientes de {service} no Google. Posso te enviar um esboço sem compromisso em 24h?",
                "wait_for_reply": True,
                "on_greeting": {
                    "next_step": 2,
                    "message": "Olá! Posso preparar a página de demonstração para a {name} sem custo para você avaliar em 24h?"
                },
                "on_doubt": {
                    "next_step": 2,
                    "message": "É sem pegadinhas: eu faço o esboço do site em 24h sem cobrar nada. Se você amar o resultado, a manutenção e hospedagem é só R$ 147/mês, sem contrato preso. Se não gostar, não paga nada. Posso preparar o protótipo?"
                },
                "on_yes": {
                    "next_step": "end_positive",
                    "message": "Perfeito, {name}! Já vou dar início à estrutura da sua página. Em até 24 horas te envio o link exclusivo por aqui para você testar. Muito obrigado e até já!"
                },
                "on_no": {
                    "next_step": "end_negative",
                    "message": "Sem problemas, {name}! Agradeço muito pelo seu tempo. Se um dia quiser aumentar suas vendas e ser encontrado no Google, estou à disposição. Abraços e boas vendas!"
                },
                "on_objection_social_media": {
                    "next_step": 3,
                    "message": "O Instagram é ótimo como vitrine, mas quem pesquisa {service} em {city} no Google está com o problema na mão, querendo fechar na hora. O site não concorre com sua rede social, ele pesca o cliente que tem urgência. Posso desenhar o esboço sem custo para você ver a diferença?"
                },
                "on_objection_already_uses_alternative": {
                    "next_step": 3,
                    "message": "Canais alternativos são ótimos, mas quem busca no Google em {city} quer contratar na hora. Posso te mostrar a demonstração sem custo para comparar?"
                },
                "on_objection_budget": {
                    "next_step": 4,
                    "message": "Exatamente por isso eu assumo 100% do risco. Crio o design inicial sem te cobrar um centavo. Você só paga a manutenção se colocar no ar. Um único cliente novo que o Google te trouxer já paga essa taxa de R$ 147 com folga. Posso começar o seu esboço para te mostrar amanhã?"
                },
                "on_objection_has_website": {
                    "next_step": 5,
                    "message": "Eu dei uma olhada e notei que ele demora alguns segundos para carregar no 3G/4G. O Google pune sites lentos não recomendando a página. Eu crio uma versão muito mais rápida. A gente joga os dois no PageSpeed Insights (a ferramenta oficial do Google). Se o meu não for visivelmente mais rápido e com nota maior, não fechamos negócio. Topa esse teste sem custo?"
                },
                "on_objection_has_solution": {
                    "next_step": 5,
                    "message": "Ótimo que já têm solução! Mas o nosso modelo carrega em menos de 1 segundo e dobra as mensagens de WhatsApp. Gostaria de ver uma demonstração comparativa sem compromisso?"
                },
                "on_objection_no_time": {
                    "next_step": 2,
                    "message": "Entendo que esteja corrido! Eu deixo a página pronta para você avaliar em apenas 1 minuto quando tiver um tempo livre. Posso começar o protótipo?"
                },
                "on_objection_trust": {
                    "next_step": 2,
                    "message": "Faz total sentido! Você não investe nada antes de ver a página funcionando com seus próprios olhos. Posso montar a demonstração sem custo?"
                },
                "on_objection_portfolio": {
                    "next_step": 2,
                    "media_path": "assets/concursosagora-analytics.png",
                    "message": "Claro, {name}! www.concursosagora.com.br é uma das páginas que desenvolvemos.\n\nEm menos de um mês conseguimos mais de 2mil acessos para esse site, como você pode ver no print do relatório de tráfego que te enviei acima. O seu site terá painel com login e senha administrativa para você poder acessar e conferir os acessos no seu site quando quiser. Utilizamos ferramentas oficiais do Google Analytics também. Não tem fidelidade, você pode cancelar o serviço quando quiser.\n\nNão criamos sites genéricos em HTML ou WordPress, como a maioria das empresas. Desenvolvemos sites modernos e de alta performance utilizando a tecnologia Next.js, proporcionando mais velocidade, segurança, excelente experiência para o usuário e uma estrutura otimizada para SEO.\n\nSeu site é desenvolvido com tecnologia de ponta para facilitar a indexação e melhorar seu potencial de posicionamento nos mecanismos de busca, como Google e Bing.\n\nPosso personalizar o modelo para a {name} sem custo nenhum para vocês verem funcionando em 24h?"
                },
                "on_ask_whats_included": {
                    "next_step": 2,
                    "message": "Excelente pergunta, {name}! No valor de R$ 147/mês está tudo incluso:\n\n• Desenvolvimento do site moderno e ultra-rápido em tecnologia Next.js\n• Hospedagem de alta velocidade e certificado de segurança SSL inclusos\n• Painel administrativo com login e senha para acompanhar métricas com Google Analytics oficial\n• Botão direto para WhatsApp e formulário de conversão\n• Suporte contínuo e atualizações\n• Zero contrato de fidelidade (cancele quando quiser)\n\nE você não paga nada adiantado: eu monto a página para você ver funcionando antes de tomar qualquer decisão. Posso gerar o esboço?"
                },
                "on_ask_hosting": {
                    "next_step": 2,
                    "message": "Sim, {name}, exatamente! O valor de R$ 147/mês já é com toda a hospedagem ultra-rápida, certificado de segurança SSL e suporte inclusos.\n\nVocê não precisa pagar nada a mais e nem contratar servidores por fora. E você só paga a mensalidade se aprovar o site funcionando em 24h. Posso preparar a demonstração sem custo?"
                },
                "on_objection_bot": {
                    "next_step": 2,
                    "message": "Totalmente compreensível a cautela, {name}! Me chamo {sender_name} e estou aqui acompanhando o atendimento. Usamos tecnologia para agilizar o contato inicial, mas todo o desenvolvimento, estratégia e suporte do site são feitos por nós de forma 100% personalizada para sua empresa aqui em {city}.\n\nVocê poderá ver e testar o protótipo real funcionando no seu celular antes de qualquer decisão. Posso gerar a prévia gratuita em 24h?"
                },
                "on_ask_identity": {
                    "next_step": 2,
                    "message": "Me chamo {sender_name}! O motivo da pergunta é bem direto: notei que vocês são referência em {service} aqui em {city}, mas quando alguém pesquisa no Google, vocês estão sem site no topo. Como o Google é onde as pessoas buscam prontas para agendar, vocês perdem clientes todo dia para a concorrência.\n\nEu criei um modelo de site profissional de alta conversão para o segmento de vocês. Posso personalizar esse esboço para a {name} sem custo nenhum para vocês verem funcionando em 24h? Se não gostarem, vida que segue. Se gostarem, cobramos uma taxa de setup de R$ 147 para colocar no ar e a manutenção é de R$ 147/mês. Faz sentido eu te mandar o link amanhã?"
                }
            },
            {
                "step": 3,
                "name": "Passo 3: Objeção de Redes Sociais / Alternativas",
                "message": "O Google pesca o cliente com urgência de fechamento. Posso preparar a página teste sem compromisso?",
                "wait_for_reply": True,
                "on_yes": {
                    "next_step": "end_positive",
                    "message": "Maravilha, {name}! Vou estruturar a página do seu negócio e em 24h te envio o link funcionando. Tenho certeza que vai gostar!"
                },
                "on_no": {
                    "next_step": "end_negative",
                    "message": "Compreendo perfeitamente, {name}! Muito obrigado pela atenção e sucesso nas vendas!"
                }
            },
            {
                "step": 4,
                "name": "Passo 4: Objeção de Orçamento",
                "message": "Risco 100% nosso. Criação gratuita e pagamento só se aprovar. Posso gerar o esboço?",
                "wait_for_reply": True,
                "on_yes": {
                    "next_step": "end_positive",
                    "message": "Excelente, {name}! Já vou colocar a mão na massa no seu esboço gratuito. Em 24h te mando o link por aqui!"
                },
                "on_no": {
                    "next_step": "end_negative",
                    "message": "Tudo bem, {name}! Obrigado pela atenção e sucesso com o negócio!"
                }
            },
            {
                "step": 5,
                "name": "Passo 5: Objeção de Já Possui Site / Solução",
                "message": "Fazemos o teste comparativo de velocidade do Google sem custo. Posso te enviar?",
                "wait_for_reply": True,
                "on_yes": {
                    "next_step": "end_positive",
                    "message": "Fechado, {name}! Vou criar uma versão ultra-rápida e em 24h te envio com o teste comparativo do Google. Até amanhã!"
                },
                "on_no": {
                    "next_step": "end_negative",
                    "message": "Combinado, {name}! Muito obrigado e parabéns pelo site atual. Se precisar de otimizações no futuro, estamos por aqui!"
                }
            }
        ]
    }
}


def normalize_niche_key(key: Optional[str]) -> str:
    """Normaliza o identificador do nicho para as chaves suportadas."""
    if not key:
        return "custom"
    
    k = str(key).lower().strip()
    if any(w in k for w in ["odonto", "dentist", "dente", "ortodon", "implante", "protese", "prótese", "invisalign", "clareamento", "periodon", "endodon"]):
        return "odontologia"
    if any(w in k for w in ["mecanic", "mecânic", "oficina", "auto", "carro", "veiculo", "veículo", "cambio", "câmbio", "suspens", "funilaria", "pneu", "alinhamento", "balanceamento", "injecao", "injeção"]):
        return "mecanica"
    if any(w in k for w in ["vet", "pet", "animal", "bicho", "cachorr", "gato", "canil", "banho e tosa"]):
        return "veterinaria"
    if any(w in k for w in ["advog", "jurid", "juríd", "direito", "advocaci", "escritorio jurid", "oab", "trabalhista", "previdenciario", "previdenciário", "tributario", "tributário"]):
        return "advocacia"
    if any(w in k for w in ["estet", "estét", "beleza", "laser", "botox", "harmoniz", "spa", "salao", "salão", "depila", "depilação", "emagrec", "cabel", "sobrancelha", "unha", "massagem"]):
        return "estetica"
    if any(w in k for w in ["custom", "personaliz", "geral", "outro"]):
        return "custom"
    
    return "custom"


def get_niche_preset(key: Optional[str]) -> Dict[str, Any]:
    """Retorna a configuração completa do nicho."""
    niche_key = normalize_niche_key(key)
    return NICHE_PRESETS.get(niche_key, NICHE_PRESETS["estetica"])


def get_available_niches() -> List[Dict[str, str]]:
    """Retorna a lista de todos os nichos disponíveis para exibição no painel."""
    return [
        {
            "key": v["key"],
            "name": v["name"],
            "description": v["description"],
            "default_service": v["default_service"]
        }
        for v in NICHE_PRESETS.values()
    ]
