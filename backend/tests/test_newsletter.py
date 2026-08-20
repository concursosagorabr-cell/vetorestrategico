def test_newsletter_subscription(client):
    payload = {
        "email": "leitor.ia@empresa.com.br",
        "source": "blog_sidebar"
    }
    
    response = client.post("/api/newsletter", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["success"] is True
    assert data["email"] == "leitor.ia@empresa.com.br"
    
    # Test duplicate subscription (should still succeed idempotently)
    response_dup = client.post("/api/newsletter", json=payload)
    assert response_dup.status_code == 201
    data_dup = response_dup.json()
    assert data_dup["success"] is True
    assert "já cadastrado" in data_dup["message"].lower()

def test_newsletter_invalid_email(client):
    payload = {"email": "nao-eh-um-email"}
    response = client.post("/api/newsletter", json=payload)
    assert response.status_code == 422
