from serpapi import GoogleSearch
search = GoogleSearch({
    "q": "coffee",
    "location": "Austin,Texas",
    "tbm": "isch",
    "ijn": "0",
    "api_key": "75c0ba8a5c5e8da445ef3b942436587ac95867048b236ed49d7f5b3e86be4579"
  })
result = search.get_dict()

pass

image = result['images_results'][0]['thumbnail']