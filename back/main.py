
from flask import Flask, request

app = Flask(__name__)


@app.route("/")
def initialize_server():
    json_res = {
        "message": "bruh"
    }
    return json_res


@app.route("/recommend_playlist", methods=['POST'])
def get_recommended_playlist():
    req = request.json  # pass this data to ML later on :)
    return req


def main():
    print("bruh")


main()
