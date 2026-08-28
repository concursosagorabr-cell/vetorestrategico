import pytest
from src.core.name_cleaner import clean_human_name, detect_auto_reply, extract_speaker_name

def test_clean_human_name_scenarios():
    # Caso 1: Estética Kauane Ohana -> Kauane
    assert clean_human_name("Estética Kauane Ohana") == "Kauane"
    assert clean_human_name("Studio Kauane Ohana") == "Kauane"

    # Caso 2: Dra. Fabiana Oliveira - Harmonização Facial e Saúde Estética -> Dra. Fabiana
    assert clean_human_name("Dra. Fabiana Oliveira - Harmonização Facial e Saúde Estética") == "Dra. Fabiana"
    assert clean_human_name("Clínica Dra Fabiana Oliveira") == "Dra. Fabiana"

    # Caso 3: Elizana Romero Estética ( Zana ) -> Elizana
    assert clean_human_name("Elizana Romero Estética ( Zana )") == "Elizana"

    # Caso 4: Estética Polacci -> Polacci
    assert clean_human_name("Estética Polacci") == "Polacci"

    # Caso 5: Nome composto como Ana Paula
    assert clean_human_name("Espaço Ana Paula Estética") == "Ana Paula"

    # Caso 6: Oficina mecânica
    assert clean_human_name("Auto Mecânica Precision") == "Precision"
    assert clean_human_name("Oficina do Silva") == "Silva"

def test_speaker_extraction_from_message():
    msg1 = "Olà, tudo bem?\nMe chamo Suelen sou assistente da\nClínica da Dra Fabiana Oliveira\n(Especialista em harmonização facial e saúde estética)\nEstamos prontos para te oferecer um atendimento exclusivo!"
    assert extract_speaker_name(msg1) == "Suelen"
    assert clean_human_name("Dra. Fabiana Oliveira - Harmonização", incoming_message=msg1) == "Suelen"

    msg2 = "Olá! Aqui é a Jéssica da recepção, como posso te ajudar?"
    assert extract_speaker_name(msg2) == "Jéssica"
    assert clean_human_name("Clínica Odonto Mais", incoming_message=msg2) == "Jéssica"

def test_auto_reply_detection():
    # Caso Studio Kauane: Agendamento ativo
    msg_kauane = """✨ Olá, seja bem-vinda(o) ao Studio Kauane Ohana ✨
É um prazer receber você por aqui 💖

📅 Para agendar seu horário de forma rápida e prática, é só clicar no link abaixo:
👉 https://studiokauaneohana.tuaagenda.app

⏰ Nosso horário de atendimento: das 8:30h às 20h
e aos sábados das 08h as 19h"""
    is_auto, a_type = detect_auto_reply(msg_kauane)
    assert is_auto is True
    assert a_type == "scheduling"

    # Caso Elizana: Ausência
    msg_elizana = """💆🏻♀️   Elizana Romero Estética ( Zana ) 

👉🏻 ATENDIMENTO EXCLUSIVO  AO  PÚBLICO  FEMININO

☑️ Agradeço seu contato!
Não estou disponível no momento, mas dentro do possível responderei até as 19h."""
    is_auto2, a_type2 = detect_auto_reply(msg_elizana)
    assert is_auto2 is True
    assert a_type2 == "away"

    # Caso Polacci: Ausência
    msg_polacci = "Oi! Seja bem-vinda(o) à Estética Polacci ✨\nPode deixar sua mensagem, assim que possível entraremos em contato. 💖"
    is_auto3, a_type3 = detect_auto_reply(msg_polacci)
    assert is_auto3 is True
    assert a_type3 == "away"

    # Mensagem humana normal
    is_auto4, a_type4 = detect_auto_reply("Olá! Trabalhamos com harmonização sim, pode falar.")
    assert is_auto4 is False
    assert a_type4 == "none"
