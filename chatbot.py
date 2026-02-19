import openai, os
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

def ask_ai(question, steps=False):
    """
    question: string
    steps: if True, return step-by-step explanation
    """
    system_msg = "You are a helpful AI study assistant for students."
    if steps:
        system_msg += " Break your answer into numbered step-by-step points."

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": system_msg},
            {"role": "user", "content": question}
        ],
        temperature=0.7,
        max_tokens=300
    )
    return response.choices[0].message.content.strip()
