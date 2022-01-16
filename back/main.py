from flask import Flask, request, jsonify
from monkeylearn import MonkeyLearn
import os
import openai
import time
import multiprocessing
openai.api_key = os.getenv("OPENAI_API_KEY")
monkey = MonkeyLearn('63cbd91a9cff8c060a87906440ba92d7c91803b9')
model_id = 'ex_YCya9nrn'

app = Flask(__name__)


def monkey(sentence):
    keywords = monkey.extractors.extract(model_id, [sentence])

    keyword = keywords.body[0]['extractions'][0]['parsed_value']

    print(keyword)


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/completion", methods=['GET', 'POST'])
def complete():
    starttime = time.time()
    req = request.get_json()
    sentence = req['title']
    res = openai.Completion.create(
        engine="ada",
        prompt=sentence,
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

    return textResponse
