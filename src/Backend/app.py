import os
import openai # Correct import for OpenAI
from flask import Flask, render_template, request, jsonify
import random
from dotenv import load_dotenv, find_dotenv

# Initialize Flask app
app = Flask(__name__) 
@app.route('/')
def home():
    return render_template('index.html')


# Load environment variables from .env file
load_dotenv(find_dotenv())
openai.api_key = os.getenv("OPENAI_API_KEY")


# Sample coding questions
questions = [
    "Write a Python function to reverse a string.",
    "Create a Python function to check if a number is prime.",
    "Write a function that takes a list of numbers and returns the sum of all even numbers."
]

# Function to get a random question
def get_random_question():
    return random.choice(questions)

# Route to serve the random coding question
@app.route('/get_random_question', methods=['GET'])
def random_question():
    question = get_random_question()
    return jsonify({'question': question})

# Route to evaluate the answer using OpenAI's GPT API
@app.route('/evaluate_answer', methods=['POST'])
def evaluate_answer():
    data = request.get_json()  # Parse the JSON payload

    # Validate that "question" and "answer" are present
    question = data.get('question')
    answer = data.get('answer')

    if not question or not answer:
        return jsonify({'feedback': 'Both "question" and "answer" fields are required.'}), 400

    # Prepare messages for OpenAI API
    messages = [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": f"Question: {question}\nUser's Answer: {answer}\nEvaluate the response and provide feedback."}
    ]

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=messages,
            max_tokens=200,
            temperature=0.2
        )
        feedback = response['choices'][0]['message']['content'].strip()
        return jsonify({'feedback': feedback})
    except openai.error.AuthenticationError:
        return jsonify({'feedback': 'Authentication error. Please check your API key.'}), 401
    except Exception as e:
        return jsonify({'feedback': f'Error processing request: {str(e)}'}), 500


# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
