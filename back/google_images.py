from serpapi import GoogleSearch
import os


class Images:
    def findImg(word):
        search = GoogleSearch({
            "q": word,
            "location": "Austin,Texas",
            "tbm": "isch",
            "ijn": "0",
            "api_key": os.getenv("SERP_API_KEY")

        })
        result = search.get_dict()
        image = result['images_results'][0]['thumbnail']

        return image
