from asyncio import ALL_COMPLETED
from flask import Flask, request, jsonify
from flask_cors import CORS
from monkeylearn import MonkeyLearn

from google_images import Images
import os
import openai
import time
import concurrent.futures
openai.api_key = os.getenv("OPENAI_API_KEY")


# GET requests will be blocked
app = Flask(__name__)
CORS(app)

monkey = MonkeyLearn(os.getenv("MONKEYLEARN_KEY"))
model_id = os.getenv("MODEL_ID")
sentence = ""
# sentences = []


@app.route("/")
def hello_world():
    return {
        "message": sentence,
        # "stuff": sentences
    }
# GET requests will be blocked


def getImage(sentence):
    keywords = monkey.extractors.extract(model_id, [sentence])
    if not keywords.body:
        print("EMPTY BODY NOOO")

    keyword = keywords.body[0]['extractions'][0]['parsed_value']

    print(keyword)
    image = Images.findImg(keyword)
    return [image, keyword]


def caption(sentence):
    res = openai.Completion.create(
        engine="ada",
        prompt=sentence,
        max_tokens=50
    )
    text = res.choices[0]['text']
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

    return newText


@app.route('/sentence', methods=['POST', 'GET'])
def json_example():
    global sentence, sentences
    request_data = request.get_json()
    sentence = request_data['sentence']
    # sentences.append(sentence)

    # request_data is returned to react

    with concurrent.futures.ThreadPoolExecutor() as executor:
        f1 = executor.submit(getImage, sentence)
        f2 = executor.submit(caption, sentence)

    concurrent.futures.wait([f1, f2], return_when=ALL_COMPLETED)
    print(f1.result())
    serpapi = f1.result()
    image = serpapi[0]
    keyword = serpapi[1].title()
    words = f2.result()

    # Sanitize the output before sending back
    if words[0:1] == ".": 
        words = words[1:].strip()

    # print(f2.result())
    print("done both")
    slide = {'title': keyword, 'image': image, 'caption': words}
    return jsonify(slide)


@app.route('/getscript', methods=['GET', 'POST'])
def generateScript():

    global sentence, sentences
    request_data = request.get_json()
    sentence = f"Write a presentation script about {request_data['sentence']}."

    res = openai.Completion.create(
        engine="davinci-instruct-beta-v3",
        prompt=sentence,
        max_tokens=300
    )
    script = res.choices[0]['text']
    print(script)
    periods = [i for i, x in enumerate(
        script) if x == '.' or x == '!' or x == '?']
    newScript = script[:(periods[-1]+1)].strip()

    return newScript
