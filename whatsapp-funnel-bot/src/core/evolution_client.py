import os
import logging
import httpx
from typing import Optional, Dict, Any

logger = logging.getLogger(__name__)

class EvolutionClient:
    def __init__(self, base_url: str = None, api_key: str = None, instance_name: str = None):
        self.base_url = base_url or os.getenv("EVOLUTION_API_URL", "http://localhost:8080")
        self.api_key = api_key or os.getenv("EVOLUTION_API_KEY", "")
        self.instance_name = instance_name or os.getenv("EVOLUTION_INSTANCE_NAME", "funnel-bot")
        self.headers = {
            "apikey": self.api_key,
            "Content-Type": "application/json"
        }

    async def create_instance(self) -> bool:
        async with httpx.AsyncClient() as client:
            try:
                resp = await client.post(
                    f"{self.base_url}/instance/create",
                    headers=self.headers,
                    json={
                        "instanceName": self.instance_name,
                        "token": self.instance_name,
                        "qrcode": True,
                        "integration": "WHATSAPP-BAILEYS"
                    }
                )
                if resp.status_code in [200, 201]:
                    logger.info(f"Instância {self.instance_name} criada.")
                    return True
                elif resp.status_code == 400 and "already exists" in resp.text:
                    logger.info(f"Instância {self.instance_name} já existe.")
                    return True
                else:
                    logger.error(f"Erro ao criar instância: {resp.text}")
                    return False
            except Exception as e:
                logger.error(f"Erro de conexão com Evolution API: {e}")
                return False

    async def get_qrcode(self) -> Optional[str]:
        async with httpx.AsyncClient(timeout=20.0) as client:
            try:
                # 1. Tenta obter o QR code diretamente da instância conectando
                resp = await client.get(
                    f"{self.base_url}/instance/connect/{self.instance_name}",
                    headers=self.headers
                )
                
                # Se a instância não existir (404), cria primeiro
                if resp.status_code == 404:
                    create_resp = await client.post(
                        f"{self.base_url}/instance/create",
                        headers=self.headers,
                        json={
                            "instanceName": self.instance_name,
                            "token": self.instance_name,
                            "qrcode": True,
                            "integration": "WHATSAPP-BAILEYS"
                        }
                    )
                    if create_resp.status_code in [200, 201]:
                        c_data = create_resp.json()
                        if isinstance(c_data, dict):
                            qr_obj = c_data.get("qrcode")
                            if isinstance(qr_obj, dict) and qr_obj.get("base64"):
                                return qr_obj["base64"]
                            if c_data.get("base64"):
                                return c_data["base64"]

                    # Tenta conectar novamente após criar
                    resp = await client.get(
                        f"{self.base_url}/instance/connect/{self.instance_name}",
                        headers=self.headers
                    )

                if resp.status_code in [200, 201]:
                    data = resp.json()
                    if isinstance(data, dict):
                        if data.get("base64"):
                            return data["base64"]
                        if isinstance(data.get("qrcode"), dict) and data["qrcode"].get("base64"):
                            return data["qrcode"]["base64"]
                        if isinstance(data.get("qrcode"), str):
                            return data["qrcode"]
                return None
            except Exception as e:
                logger.error(f"Erro ao obter QR Code: {e}")
                return None

    async def get_connection_status(self) -> Dict[str, Any]:
        async with httpx.AsyncClient(timeout=10.0) as client:
            try:
                resp = await client.get(
                    f"{self.base_url}/instance/connectionState/{self.instance_name}",
                    headers=self.headers
                )
                if resp.status_code == 200:
                    data = resp.json()
                    # Normaliza o estado
                    state = "close"
                    if isinstance(data, dict):
                        if "state" in data:
                            state = data["state"]
                        elif "instance" in data and isinstance(data["instance"], dict):
                            state = data["instance"].get("state", "close")
                    return {"state": state, "raw": data}
                elif resp.status_code == 404:
                    return {"state": "not_created"}
                return {"state": "unknown"}
            except Exception as e:
                logger.error(f"Erro ao verificar status: {e}")
                return {"state": "error"}

    async def send_text_message(self, phone: str, text: str) -> bool:
        # Formata o número para o padrão do WhatsApp
        if not phone.endswith("@s.whatsapp.net"):
            number = phone.replace("+", "").replace(" ", "").replace("-", "")
            jid = f"{number}@s.whatsapp.net"
        else:
            jid = phone

        async with httpx.AsyncClient(timeout=30.0) as client:
            try:
                resp = await client.post(
                    f"{self.base_url}/message/sendText/{self.instance_name}",
                    headers=self.headers,
                    json={
                        "number": jid,
                        "text": text,
                        "delay": 1200
                    }
                )
                if resp.status_code == 201:
                    logger.info(f"Mensagem enviada para {phone}")
                    return True
                else:
                    logger.error(f"Erro ao enviar mensagem: {resp.status_code} - {resp.text}")
                    return False
            except Exception as e:
                logger.error(f"Erro ao enviar mensagem para {phone}: {e}")
                return False
