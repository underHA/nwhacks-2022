from flask import Flask
from flask import request
from flask import jsonify
from monkeylearn import MonkeyLearn
import os
import openai
import time
openai.api_key = os.getenv("OPENAI_API_KEY")


app = Flask(__name__)


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/completion", methods=['GET', 'POST'])
def complete():
    starttime = time.time()
    req = request.get_json()
    text = req['title']
    res = openai.Completion.create(
        engine="ada",
        prompt=text,
        max_tokens=50
    )
    choices = res.choices[0]
    text = choices['text']
    print(text)
    newText = ""
    periods = [i for i, x in enumerate(
        text) if x == '.' or x == '!' or x == '?']
    print(periods)
    if len(periods) == 0:
        for i in range(175, 0, -1):
            if text[i] == ' ':
                newText = text[:i]
                break
    elif len(periods) == 1:
        newText = text[:(periods[0]+1)]
    elif periods[1] < 175:
        newText = text[:(periods[1]+1)]
    elif periods[0] > 175 and periods[0] < (periods[1]-periods[0]):
        newText = text[:(periods[0]+1)]
    elif periods[0] > 175 and periods[0] > (periods[1]-periods[0]):
        newText = text[(periods[0]+1):(periods[1]+1)]
    else:
        newText = text[:(periods[0]+1)]

    textResponse = {'text': newText}
    endtime = time.time()
    print("this program took "+str(endtime-starttime) + " seconds to run.")
    return jsonify(
        textResponse
    )
