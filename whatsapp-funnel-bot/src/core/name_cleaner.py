"""
Módulo de Higienização de Nomes e Detecção de Auto-Respostas (Humanizer Engine)
Garante tratamento 100% natural, sem repetições robóticas de títulos de anúncios do Google Maps,
e lida de forma inteligente com auto-respostas e mensagens de ausência do WhatsApp Business.
"""

import re
from typing import Tuple, Optional


def extract_speaker_name(text: str) -> Optional[str]:
    """
    Detecta se a pessoa se apresentou na mensagem (ex: 'Me chamo Suelen', 'sou a Jéssica', 'Sou a Giovanna da DS Clinic', 'Aqui é a Dra. Fabiana').
    """
    if not text:
        return None

    clean_text = " " + text.replace("\n", " ").replace(",", " , ") + " "

    # 1. Padrões com títulos profissionais (ex: "Aqui é a Dra. Fabiana", "Sou o Dr. Carlos", "Dra. Fabiana falando")
    doc_match = re.search(
        r"(?:(?:aqui\s+[eé]\s+(?:a\s+|o\s+)?|sou\s+(?:a\s+|o\s+)?)(Dra?\.?\s+[A-ZÁÉÍÓÚÂÊÔÃÕÇ][a-záéíóúâêôãõç]+|Dr\.?\s+[A-ZÁÉÍÓÚÂÊÔÃÕÇ][a-záéíóúâêôãõç]+)|(Dra?\.?\s+[A-ZÁÉÍÓÚÂÊÔÃÕÇ][a-záéíóúâêôãõç]+|Dr\.?\s+[A-ZÁÉÍÓÚÂÊÔÃÕÇ][a-záéíóúâêôãõç]+)\s+falando)",
        clean_text,
        re.IGNORECASE
    )
    if doc_match:
        val = (doc_match.group(1) or doc_match.group(2)).strip()
        parts = val.split()
        title = parts[0].capitalize()
        if not title.endswith("."):
            title += "."
        name = parts[1].capitalize()
        return f"{title} {name}"

    # 2. Padrões diretos de apresentação
    patterns = [
        r"(?:me\s+chamo|meu\s+nome\s+[eé]|sou\s+(?:o|a)?|aqui\s+[eé]\s+(?:o|a)?)\s+([A-ZÁÉÍÓÚÂÊÔÃÕÇ][a-záéíóúâêôãõç]+)",
        r"(?:atenciosamente|att\.?|abra[cç]os?,?)\s+([A-ZÁÉÍÓÚÂÊÔÃÕÇ][a-záéíóúâêôãõç]+)",
        r"(?:falar\s+com|procure\s+por)\s+([A-ZÁÉÍÓÚÂÊÔÃÕÇ][a-záéíóúâêôãõç]+)",
        r"([A-ZÁÉÍÓÚÂÊÔÃÕÇ][a-záéíóúâêôãõç]+)\s+(?:falando|aqui\b|da\s+recep[cç][aã]o|do\s+atendimento)"
    ]

    stop_words = {
        "assistente", "recepcao", "recepção", "atendente", "doutor", "doutora", "dra", "dr",
        "clinica", "clínica", "studio", "estetica", "estética", "oficina", "loja", "empresa",
        "consultorio", "consultório", "seu", "sua", "voce", "você", "bom", "boa", "ola", "olá", "oi"
    }

    for pat in patterns:
        match = re.search(pat, clean_text, re.IGNORECASE)
        if match:
            found = match.group(1).strip()
            if found.lower() not in stop_words and len(found) >= 2:
                return found.capitalize()

    return None


def extract_location_update(text: str) -> Optional[str]:
    """
    Detecta quando o lead informa ou corrige sua localização/bairro/cidade.
    Ex: 'Nós estamos localizadas na Penha', 'Estamos no Tatuapé', 'Nossa clínica fica em Mogi das Cruzes'.
    """
    if not text:
        return None

    clean_text = " " + text.replace("\n", " ").strip() + " "

    patterns = [
        r"(?:n[óo]s\s+)?estamos\s+localizad[ao]s?\s+(?:em|na|no)\s+([A-ZÁÉÍÓÚÂÊÔÃÕÇa-záéíóúâêôãõç\s\-]+)",
        r"(?:nossa\s+cl[íi]nica|nosso\s+consult[óo]rio|nosso\s+espa[çc]o|nossa\s+empresa|nosso\s+escrit[óo]rio|nossa\s+oficina)\s+fica\s+(?:em|na|no)\s+([A-ZÁÉÍÓÚÂÊÔÃÕÇa-záéíóúâêôãõç\s\-]+)",
        r"(?:estamos|ficamos|atendemos|situados?)\s+(?:em|na|no)\s+([A-ZÁÉÍÓÚÂÊÔÃÕÇa-záéíóúâêôãõç\s\-]+)",
        r"(?:somos\s+de|endere[çc]o\s+[eé]\s+em)\s+([A-ZÁÉÍÓÚÂÊÔÃÕÇa-záéíóúâêôãõç\s\-]+)"
    ]

    for pat in patterns:
        match = re.search(pat, clean_text, re.IGNORECASE)
        if match:
            loc = match.group(1).strip()
            # Remove sufixos de estado como '- SP', ', SP', '/SP'
            loc = re.sub(r"[\s,\-/]+(?:SP|RJ|MG|PR|SC|RS|BA|PE|CE|GO|DF|ES|MT|MS|AM|PA|MA|PB|RN|AL|SE|PI|TO|RO|AC|AP|RR)\b", "", loc, flags=re.IGNORECASE).strip()
            # Remove pontuações residuais
            loc = re.sub(r"[.,!?;:]+$", "", loc).strip()
            # Se a string resultante for válida e não for muito longa nem contiver verbos estranhos
            if 2 <= len(loc) <= 40 and not any(w in loc.lower() for w in ["trabalhamos", "atendemos", "fazemos", "qual", "vocês", "horário", "agendamento"]):
                return " ".join([w.capitalize() if len(w) > 2 and w.lower() not in ["de", "da", "do", "das", "dos", "em", "na", "no"] else w.lower() for w in loc.split()])

    return None


def clean_human_name(raw_name: str, incoming_message: str = "") -> str:
    """
    Transforma nomes poluídos do Google Maps ou de cadastros (ex: 'Dra. Fabiana Oliveira - Harmonização Facial',
    'Estética Kauane Ohana', 'Elizana Romero Estética ( Zana )') em tratamentos humanos naturais (ex: 'Dra. Fabiana', 'Kauane', 'Elizana').
    """
    # 1. Se a mensagem recebida identificou quem está falando (ex: "Me chamo Suelen"), prioriza o atendente
    speaker = extract_speaker_name(incoming_message)
    if speaker:
        return speaker

    if not raw_name or raw_name.strip().lower() in ["cliente", "lead", "null", "none", "contato"]:
        return ""

    name = raw_name.strip()

    # 2. Remove cauda de separadores comuns em raspagem do Google Maps (- Serviço, | Cidade, / Bairro)
    name = re.split(r"\s*[-|–—/]\s*", name)[0].strip()

    # 3. Remove conteúdo entre parênteses ou colchetes (ex: '( Zana )', '[OFICIAL]')
    name = re.sub(r"[\(\[\{].*?[\)\]\}]", "", name).strip()

    # 4. Remove sufixos jurídicos e cadastrais
    legal_suffixes = [r"\bLTDA\b", r"\bME\b", r"\bEPP\b", r"\bMEI\b", r"\bS/A\b", r"\bS/S\b", r"\bEIRELI\b", r"\bCNPJ\b.*", r"\bOFICIAL\b"]
    for suf in legal_suffixes:
        name = re.sub(suf, "", name, flags=re.IGNORECASE).strip()

    # 5. Tratamento de Títulos Profissionais (Dra. / Dr. / Doutor / Doutora)
    title_match = re.search(r"\b(Dra?\.?|Doutor[a]?|Adv\.?|Prof\.?)\s+([A-ZÁÉÍÓÚÂÊÔÃÕÇ][a-záéíóúâêôãõç]+(?:\s+[A-ZÁÉÍÓÚÂÊÔÃÕÇ][a-záéíóúâêôãõç]+)?)", name, re.IGNORECASE)
    if title_match:
        title = title_match.group(1).capitalize()
        if not title.endswith(".") and title.lower() in ["dr", "dra", "adv", "prof"]:
            title += "."
        if title.lower() == "doutora":
            title = "Dra."
        elif title.lower() == "doutor":
            title = "Dr."
        first_last = title_match.group(2).split()
        first = first_last[0].capitalize()
        return f"{title} {first}"

    # 6. Remove prefixos comerciais que precedem o nome da pessoa
    # Ex: "Studio Kauane Ohana" -> "Kauane", "Clínica Carla Teles" -> "Carla", "Espaço Ana Paula" -> "Ana Paula"
    business_prefixes = [
        r"^(?:Est[eé]tica\s+(?:Avan[cç]ada\s+)?(?:E\s+Beleza\s+)?)",
        r"^(?:Studio\s+|Espa[cç]o\s+|Cl[ií]nica\s+|Consult[oó]rio\s+|Ateli[eê]\s+|Sal[aã]o\s+|Centro\s+de\s+Est[eé]tica\s+)",
        r"^(?:Oficina\s+(?:Mec[aâ]nica\s+|do\s+|da\s+|de\s+)?|Auto\s+Mec[aâ]nica\s+|Mec[aâ]nica\s+(?:do\s+|da\s+|de\s+)?|Auto\s+Center\s+)",
        r"^(?:Escrit[oó]rio\s+de\s+Advocacia\s+|Advocacia\s+)",
        r"^(?:Pet\s+Shop\s+|Cl[ií]nica\s+Veterin[aá]ria\s+|Veterin[aá]ria\s+)"
    ]

    for pref in business_prefixes:
        name = re.sub(pref, "", name, flags=re.IGNORECASE).strip()

    # Remove sufixos de segmento (ex: "Elizana Romero Estética" -> "Elizana Romero")
    business_suffixes = [
        r"\s+(?:Est[eé]tica(?:\s+Avan[cç]ada)?|Beauty|Beleza|Hair|Lash|Nails|Sobrancelhas?|Odontologia|Odonto|Mec[aâ]nica|Auto\s+Center|Pet\s+Shop|Advogados?|Advocacia)$"
    ]
    for suf in business_suffixes:
        name = re.sub(suf, "", name, flags=re.IGNORECASE).strip()

    # 7. Se sobrou um nome composto por várias palavras (ex: "Kauane Ohana" ou "Elizana Romero")
    words = name.split()
    if len(words) >= 1:
        first = words[0].capitalize()
        if len(words) >= 2 and words[0].lower() in ["ana", "maria", "joao", "joão"]:
            return f"{first} {words[1].capitalize()}"
        return first

    return name


def detect_auto_reply(text: str) -> Tuple[bool, str]:
    """
    Analisa a mensagem recebida e detecta se é uma auto-resposta / mensagem de ausência do WhatsApp Business.
    Retorna (is_auto_reply, auto_reply_type):
    - type 'scheduling': auto-resposta com link/horário de agendamento (confirma atividade).
    - type 'away': mensagem de ausência / fora do horário de atendimento.
    - type 'none': mensagem humana comum.
    """
    if not text:
        return False, "none"

    txt_lower = text.lower()

    # Indicadores de agendamento online / link direto
    scheduling_indicators = [
        "para agendar seu horário", "para agendamentos", "clicar no link abaixo",
        "tuaagenda.app", "agendamento online", "link de agendamento",
        "consulte nossos horários", "bem-vinda(o) ao studio", "seja bem-vindo(a) ao studio"
    ]
    for ind in scheduling_indicators:
        if ind in txt_lower:
            return True, "scheduling"

    # Indicadores de ausência / fora de expediente
    away_indicators = [
        "não estou disponível no momento", "nao estou disponivel no momento",
        "não estamos disponíveis no momento", "nao estamos disponiveis no momento",
        "assim que possível entraremos em contato", "assim que possivel entraremos em contato",
        "assim que possível responderemos", "assim que possivel responderemos",
        "responderemos assim que possível", "responderemos assim que possivel",
        "deixe sua mensagem", "agradecemos sua mensagem", "agradecemos o seu contato",
        "nosso horário de atendimento é", "nosso horario de atendimento e",
        "atendimento de terça a", "atendimento de segunda a"
    ]
    for ind in away_indicators:
        if ind in txt_lower:
            return True, "away"

    return False, "none"
