import re

def fix_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    target = r"- ?? NUNCA faça perguntas passivas de SAC/suporte como: \*'Como posso ajudar\?'\*, \*'Em que posso ser útil\?'\*, \*'Posso esclarecer mais alguma coisa\?'\*, \*'Algo mais\?'\*. O final da mensagem deve ser SEMPRE um CTA comercial de baixo atrito \(\*'Posso preparar o modelo para você ver no celular\?'\*, \*'Faz sentido eu te mandar o link amanhã\?'\*\)."

    replacement = r"- ?? NUNCA faça perguntas passivas de SAC/suporte como: *'Como posso ajudar?'*, *'Em que posso ser útil?'*, *'Posso esclarecer mais alguma coisa?'*, *'Algo mais?'*. O final da mensagem deve ser SEMPRE um CTA comercial de baixo atrito. Se o modelo AINDA NÃO FOI ENVIADO, use: (*'Posso preparar o modelo para você ver no celular?'*, *'Faz sentido eu te mandar o link amanhã?'*). SE O MODELO JÁ FOI ENVIADO, pergunte sobre o feedback ou ofereça ajustes: (*'O que achou do modelo que te enviei?'*, *'Posso ajustar alguma cor ou texto para você ver como fica?'*)."

    content = re.sub(target, replacement, content)
    
    # Also fix heuristics fallback
    target2 = r'            "generated_reply": f"Entendido, \{h_name\}! A grande vantagem é que preparamos a estrutura focada em \{service\} sem você pagar nada adiantado. Você olha no celular e só decide depois de ver funcionando. Faz sentido eu te mandar a prévia amanhã\?"'
    
    replacement2 = '''            "generated_reply": f"Entendido, {h_name}! Como você já está com o link do modelo aí, conseguiu dar uma olhada? Se quiser, posso ajustar qualquer detalhe do visual, textos ou cores para ficar com a cara da sua empresa. O que achou?" if has_sample_sent else f"Entendido, {h_name}! A grande vantagem é que preparamos a estrutura focada em {service} sem você pagar nada adiantado. Você olha no celular e só decide depois de ver funcionando. Faz sentido eu te mandar a prévia amanhã?"'''
    
    content = re.sub(target2, replacement2, content)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

fix_file('src/core/llm_classifier.py')
fix_file('src/core/commercial_agent.py')
print("Done")
