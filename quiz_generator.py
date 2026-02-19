from chatbot import ask_ai

def generate_quiz(topic, num_questions=5):
    prompt = f"Create {num_questions} multiple-choice questions for students about: {topic}. Include answer for each."
    return ask_ai(prompt)
