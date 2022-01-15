from flask import Flask
from flask import request
from flask import jsonify
import os
import openai
openai.api_key = os.getenv("OPENAI_API_KEY")


app = Flask(__name__)


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/completion", methods=['GET', 'POST'])
def complete():

    req = request.get_json()
    text = req['title']
    res = openai.Completion.create(
        engine="ada",
        prompt=text,
        max_tokens=40
    )
    choices = res.choices[0]
    text = choices['text']
    print(text)

    newText = text[:(text.index('.')+1)]
    print(newText)
    textResponse = {'text': newText}

    return jsonify(
        textResponse
    )
