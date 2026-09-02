from datetime import datetime

_system_alerts = []

def add_alert(title: str, message: str, level: str = "warning"):
    _system_alerts.insert(0, {
        "id": int(datetime.now().timestamp() * 1000),
        "timestamp": datetime.now().isoformat(),
        "title": title,
        "message": message,
        "level": level
    })
    # Manter maximo de 20 alertas
    while len(_system_alerts) > 20:
        _system_alerts.pop()

def get_alerts():
    return _system_alerts

def clear_alerts():
    _system_alerts.clear()
