def test_submit_directory_tool_success(client):
    payload = {
        "toolName": "AutoFlow IA",
        "websiteUrl": "https://autoflow.ai",
        "contactName": "Juliana Costa",
        "contactEmail": "juliana@autoflow.ai",
        "contactWhatsapp": "11988887777",
        "category": "whatsapp-atendimento",
        "niches": ["clinicas", "odontologia"],
        "pricingType": "pme-acessivel",
        "shortDescription": "Agente autônomo para agendamento de consultas médicas e recall",
        "fullDescription": "Integração nativa com Doctoralia e iClinic, disparo de lembretes e botões de confirmação.",
        "planRequested": "verified_featured",
        "hasAffiliateProgram": True,
        "affiliateCommissionDetails": "20% recorrente",
        "discountCouponForVetorUsers": "VETOR20",
        "notes": "Prontos para homologação técnica"
    }

    response = client.post("/api/directory/submit", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["success"] is True
    assert data["tool_name"] == "AutoFlow IA"
    assert data["plan_requested"] == "verified_featured"

def test_submit_directory_tool_invalid_email(client):
    payload = {
        "toolName": "AutoFlow IA",
        "websiteUrl": "https://autoflow.ai",
        "contactName": "Juliana Costa",
        "contactEmail": "email_invalido",
        "contactWhatsapp": "11988887777",
        "shortDescription": "Agente autônomo para clínicas"
    }

    response = client.post("/api/directory/submit", json=payload)
    assert response.status_code == 422
