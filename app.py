from flask import Flask, request, jsonify
from flask_cors import CORS
from chatbot import ask_ai
from summarize import summarize

from quiz_generator import generate_quiz

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "AI Study Companion Backend Running!"

@app.route('/ask', methods=['POST'])
def ask():
    data = request.get_json()
    question = data.get("question")
    step = data.get("step_by_step", False)
    if not question:
        return jsonify({"answer": "Please provide a question."})
    try:
        answer = ask_ai(question, steps=step)
        return jsonify({"answer": answer})
    except Exception as e:
        return jsonify({"answer": f"Error: {str(e)}"})

@app.route('/summarize', methods=['POST'])
def summarize_route():
    data = request.get_json()
    text = data.get("text")
    if not text:
        return jsonify({"summary": "No text provided."})
    try:
        summary = summarize(text)
        return jsonify({"summary": summary})
    except Exception as e:
        return jsonify({"summary": f"Error: {str(e)}"})

@app.route('/quiz', methods=['POST'])
def quiz_route():
    data = request.get_json()
    topic = data.get("topic")
    num_questions = data.get("num_questions", 5)
    if not topic:
        return jsonify({"quiz": "No topic provided."})
    try:
        quiz = generate_quiz(topic, num_questions)
        return jsonify({"quiz": quiz})
    except Exception as e:
        return jsonify({"quiz": f"Error: {str(e)}"})

if __name__ == '__main__':
    app.run(debug=True)
