import React from "react";
import { CardLeft } from "./components/Card.js";
import "./SlideAIPage.css";
import Banner from "../banner.png";

import MicOnImg from "../mic-on.png";
import MicOffImg from "../mic-off.png";

import { useRef, useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from 'axios';


function SlideAIPage(props) {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();
    
    const [transcriptArray, setTranscriptArray] = useState([]);
    const [firstTranscriptIndex, setTranscriptIndex] = useState(0);
    const [pauseTimestamp, setPauseTimestamp] = useState(Date.now() / 1000);
    const [sentTimestamp, setSentTimestamp] = useState(Date.now() / 1000);
    const [relevantText, setRelevantText] = useState("");
    const [test, setTest] = useState([{
        "id": 1,
        "title": "What is Pitch.ai?",
        "subtext": "Don't worry about slides; just present! Whether you struggle with computers, want to spice up a Q&A, or just want to mess around, Pitch.ai puts the present back in presentation :)",
        "image": "https://21stcenturyrelocations.com/blogs/wp-content/uploads/2020/12/illustration-with-young-people-talking_52683-29824.jpg"
    },
    {
        "id": 2,
        "title": "How does it work?",
        "subtext": "A custom algorithm segments your speech by topic, then MonkeyLearn API + SerpAPI finds a fitting image. OpenAI's GPT-3 caps it off with a predictive caption!",
        "image": "https://study.com/cimages/videopreview/b5kit2d03m.jpg"
    },
    {
        "id": 3,
        "title": "Just Start Talking",
        "subtext": "As you talk, Pitch.ai will listen and quickly generate slides on-the-fly to match what you are saying. Don't worry! Several AIs make sure that all slides are relevant.",
        "image": "https://www.galchimia.com/wp-content/uploads/2021/06/how-to-crash-your-own-presentation.jpg"
    }]);

    const startListening = () => { SpeechRecognition.startListening({ continuous: true }) };

    // function for sending transcript to backend.
    // Transcript is locally defined. Currently: a string
    const sendTranscript = (array) => { 
        // want to show newest parts of transcript array. so, set a new index.
        setTranscriptIndex(array.length - 1);
        setSentTimestamp(Date.now() / 1000);

        // POST request using fetch inside useEffect React hook
        // const article = { title: 'React Hooks POST Request Example' };
        // axios.post('http://localhost:5000/json_example', article);
        const article = { sentence: relevantText };
        axios.post('http://localhost:5000/sentence', article)
            .then(response => setTest(e => e.concat([{
                "id": e.length + 1,
                "title": response.data.title,
                "subtext": response.data.caption,
                "image": response.data.image
            }])));
    }

    // React detects that transcript is changing
    useEffect(() => {
        let array = transcript.split(' ');

        // compare the seconds elapsed from the latest message. if it's a significant pause (2 seconds), send all new text
        // OR: 10 seconds has elapsed.
        if ((Date.now() / 1000) - pauseTimestamp > 1.5 || (Date.now() / 1000) - sentTimestamp > 10) {
            sendTranscript(array)
            // TODO: check the last send time
        }

        // send is an array
        let send = array.splice(firstTranscriptIndex, array.length);
        // re-init the array after we finish processing
        // TODO: might not need
        setTranscriptArray(array);
        
        setRelevantText(send.join(' '));

        // TODO: add a timestamp for last sent as well
        // save a new pauseTimestamp after every transcript update
        setPauseTimestamp(Date.now() / 1000);

    }, [transcript])

    //Card Updater
    const [cardRenders, setCardRenders] = useState([]);

    useEffect(() => {
        console.log(typeof test)
        console.log(test)
        let lastThree = test.slice(-3);
        // for (let i = 1; i <= 3; i++) {
        //     lastThree.push(test.at(-1*i));
        // }

        setCardRenders(lastThree.map((object) => {
            return <CardLeft id={object.id}
                title={object.title}
                subtext={object.subtext}
                image={object.image}/>
        }));

    }, [test]);

    function drawMic(on) {
        if (on) {
            return <img src={MicOnImg} style={{width: 25, height: 25}}/>
        } else {
            return <img src={MicOffImg} style={{width: 25, height: 25}}/>
        }
    }

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }
    
    return (
        <div className="pagecontainer">
            <div className="foreground">

                <div className="carddeck-container">
                    {cardRenders}
                </div>

                <div className="transcription-n-mute">
                    <div className="transcription-bar">
                        <p>{relevantText}</p>
                    </div>
                    <div className={listening ? "mute-btt" : "mute-btt muted"} onClick={listening ? SpeechRecognition.stopListening : startListening}>
                        {drawMic(listening)}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SlideAIPage;