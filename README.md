# Pitch.ai @ nwHacks 2022
## Inspiration

There are millions of people around the world who have a physical or learning disability which makes creating visual presentations extremely difficult. They may be visually impaired, suffer from ADHD or have disabilities like Parkinsons. For these people, being unable to create presentations isn’t just a hassle. It’s a barrier to learning, a reason for feeling left out, or a career disadvantage in the workplace. That’s why we created **Pitch.ai.**


## What it does

Pitch.ai is a web app which creates visual presentations for you as you present. Once you open the web app, just start talking! Pitch.ai will listen to what you say and in real-time and generate a powerpoint presentation based on the content of your speech, just as if you had a slideshow prepared in advance.

## How we built it

We used a **React** client combined with a **Flask** server to make our API calls. To continuously listen for audio to convert to text, we used a react library called “react-speech-recognition”. Then, we designed an algorithm to detect pauses in the speech in order to separate sentences, which would be sent to the Flask server. 

The Flask server would then use multithreading in order to make several API calls simultaneously. Firstly, the **Monkeylearn** API is used to find the most relevant keyword in the sentence. Then, the keyword is sent to **SerpAPI** in order to find an image to add to the presentation. At the same time, an API call is sent to OpenAPI’s GPT-3 in order to generate a caption to put on the slide. The caption, keyword and image of a single slide deck are all combined into an object to be sent back to the client.

## Challenges we ran into

-Learning how to make dynamic websites
-Optimizing audio processing time
-Increasing efficiency of server


## Accomplishments that we're proud of

-Made an aesthetic user interface
-Distributing work efficiently
-Good organization and integration of many APIs


## What we learned

-Multithreading 
-How to use continuous audio input
-React hooks
-Animations
-Figma

## What's next for Pitch.ai

-Faster and more accurate picture, keyword and caption generation
-”Present mode”
-Integrate a database to save your generated presentation
-Customizable templates for slide structure, color, etc.
-Build our own web scraping API to find images




List of frameworks and technologies
Python
Javascript
React
Flask
Figma
OpenAI
SerpAPI
Monkeylearn
