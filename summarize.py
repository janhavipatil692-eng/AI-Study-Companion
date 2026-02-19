from chatbot import ask_ai

def summarize(text):
    prompt = f"Summarize the following text in simple points:\n{text}"
    return ask_ai(prompt)
