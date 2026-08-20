def test_create_qualified_lead(client):
    payload = {
        "name": "Carlos Silva",
        "email": "carlos@empresaexemplo.com.br",
        "phone": "(11) 98765-4321",
        "company_name": "Silva Logística",
        "company_size": "6 a 20 pessoas",
        "segment": "Logística e Distribuição",
        "main_pain": "Gargalo no agendamento e atendimento de WhatsApp dos motoristas e clientes",
        "estimated_budget": "R$ 3.000 a R$ 6.000/mês",
        "source_url": "/contato"
    }
    
    response = client.post("/api/leads", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["id"] is not None
    assert data["name"] == "Carlos Silva"
    assert data["email"] == "carlos@empresaexemplo.com.br"
    assert data["status"] == "new"
    assert data["lead_type"] == "qualified"

def test_create_lead_invalid_email(client):
    payload = {
        "name": "Carlos Silva",
        "email": "email_invalido",
        "phone": "11987654321"
    }
    response = client.post("/api/leads", json=payload)
    assert response.status_code == 422
