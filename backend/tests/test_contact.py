def test_submit_contact_form(client):
    payload = {
        "name": "Roberto Albuquerque",
        "email": "roberto@consultoria.com.br",
        "phone": "(11) 97777-8888",
        "subject": "Dúvida sobre plano de IA sob Assinatura",
        "message": "Gostaria de agendar uma reunião de demonstração para entender como funciona a consultoria de IA para nosso time de 15 pessoas."
    }
    
    response = client.post("/api/contact", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["success"] is True
    assert "sucesso" in data["message"].lower()
    assert data["lead_id"] is not None

def test_submit_contact_invalid_message_length(client):
    payload = {
        "name": "Roberto",
        "email": "roberto@consultoria.com.br",
        "message": "Oi"  # too short (< 5 chars)
    }
    response = client.post("/api/contact", json=payload)
    assert response.status_code == 422
