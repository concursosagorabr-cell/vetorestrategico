def test_quiz_calculation_and_lead_generation(client):
    payload = {
        "segment": "Saúde e Clínicas",
        "company_size": "6 a 20 pessoas",
        "main_bottleneck": "Atendimento e agendamentos no WhatsApp sobrecarregados",
        "digital_maturity": "Planilhas e processos manuais",
        "name": "Dra. Mariana Costa",
        "email": "mariana@clinicacosta.com.br",
        "phone": "(11) 91907-2390",
        "company_name": "Clínica Costa Odontologia",
        "accepts_lgpd": True
    }
    
    response = client.post("/api/quiz", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert "opportunity_score" in data
    assert data["opportunity_score"] >= 75
    assert data["opportunity_score"] <= 98
    assert "estimated_hours_saved_month" in data
    assert "Agente de Atendimento" in data["priority_action"] or "WhatsApp" in data["priority_action"]
    assert len(data["key_deliverables"]) >= 3
    assert data["lead_id"] is not None

def test_quiz_missing_fields_validation(client):
    payload = {
        "segment": "Saúde e Clínicas",
        "name": "Dra. Mariana"
        # missing required fields
    }
    response = client.post("/api/quiz", json=payload)
    assert response.status_code == 422
