import React from 'react';
import { useRef, useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from 'axios';

const Dictaphone = () => {
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
  const [test, setTest] = useState("");

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
        .then(response => console.log(response.data));
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
    console.log(send);

    // TODO: add a timestamp for last sent as well
    // save a new pauseTimestamp after every transcript update
    setPauseTimestamp(Date.now() / 1000);

  }, [transcript])

  // test use effect
  useEffect(() => {
    // GET request using axios inside useEffect React hook
    axios.get('http://localhost:5000/')
        .then(response => setTest(response.data.message));

  // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);


  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{relevantText}</p>
    </div>
  );
};
export default Dictaphone;