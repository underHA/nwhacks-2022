import React from "react";
import { CardLeft } from "./components/Card.js";
import "./SlideAIPage.css";

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
        "title": "UN SDGs",
        "subtext": "The United Nations Development Programme published a report on the impact of poverty on the lives of children, describing it as “the most important challenge of our time.”",
        "image": "https://i1.wp.com/www.un.org/sustainabledevelopment/wp-content/uploads/2015/12/english_SDG_17goals_poster_all_languages_with_UN_emblem_1.png?fit=728%2C451&ssl=1"
    },
    {
        "id": 2,
        "title": "World Hunger",
        "subtext": "And the world hunger is experienced by young girls particularly. So, it's a very sensitive issue. I'm going to be talking about this for a long time.",
        "image": "https://idsb.tmgrup.com.tr/2015/07/10/GenelBuyuk/1436522982590.jpg"
    },
    {
        "id": 3,
        "title": "Hunger Indices",
        "subtext": "The new index is a compilation of a number of official records from the United Nations and it uses the World Food Program's estimates of hunger.",
        "image": "https://upload.wikimedia.org/wikipedia/commons/8/8f/GHI_2021_-_Mappa.png"
    }]);

    const startListening = () => { SpeechRecognition.startListening({ continuous: true }) };

    // function for sending transcript to backend.
    // Transcript is locally defined. Currently: a string
    const sendTranscript = (array) => { 
        console.log(test)
        // want to show newest parts of transcript array. so, set a new index.
        setTranscriptIndex(array.length - 1);
        setSentTimestamp(Date.now() / 1000);

        // POST request using fetch inside useEffect React hook
        // const article = { title: 'React Hooks POST Request Example' };
        // axios.post('http://localhost:5000/json_example', article);
        const article = { sentence: relevantText };
        axios.post('http://localhost:5000/sentence', article)
            .then(response => setTest(
                test.push({
                    "id": test.length + 1,
                    "title": response.data.title,
                    "subtext": response.data.caption,
                    "image": response.data.image
                })));
        console.log(test)
    }

    // React detects that transcript is changing
    useEffect(() => {
        let array = transcript.split(' ');

        // compare the seconds elapsed from the latest message. if it's a significant pause (2 seconds), send all new text
        // OR: 10 seconds has elapsed.
        if ((Date.now() / 1000) - pauseTimestamp > 2 || (Date.now() / 1000) - sentTimestamp > 10) {
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
        switch (test.length) {
            case 0:
                console.log("Return three blanks");
                break;
            case 1:
                console.log("Return two blanks");
                break;
            case 2:
                console.log("Return one blank");
                break;
            case 3:
                let lastThree = [];
                for (let i = 1; i <= 3; i++) {
                    lastThree.push(test.at(-1*i));
                }

                setCardRenders(lastThree.map((object) => {
                    return <CardLeft id={object.id}
                        title={object.title}
                        subtext={object.subtext}
                        image={object.image}/>
                }));
        }

    }, [test]);

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    /*
    <CardLeft title="UN SDGs"
        subtext="The United Nations Development Programme published a report on the impact of poverty on the lives of children, describing it as “the most important challenge of our time.”"
        image="https://i1.wp.com/www.un.org/sustainabledevelopment/wp-content/uploads/2015/12/english_SDG_17goals_poster_all_languages_with_UN_emblem_1.png?fit=728%2C451&ssl=1"
    />
    <CardRight title="World Hunger"
        subtext="And the world hunger is experienced by young girls particularly. So, it's a very sensitive issue. I'm going to be talking about this for a long time."
        image="https://idsb.tmgrup.com.tr/2015/07/10/GenelBuyuk/1436522982590.jpg"
    />
    <CardLeft title="Hunger Indices"
        subtext="The new index is a compilation of a number of official records from the United Nations and it uses the World Food Program's estimates of hunger."
        image="https://upload.wikimedia.org/wikipedia/commons/8/8f/GHI_2021_-_Mappa.png"
    />
    */
    
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
                    <div className="mute-btt" onClick={listening ? SpeechRecognition.stopListening : startListening}>
                        <img src="https://cdn-icons-png.flaticon.com/512/107/107037.png"
                            style={{width: 20, height: 20}}/>
                        <p>{listening ? 'on' : 'off'}</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SlideAIPage;