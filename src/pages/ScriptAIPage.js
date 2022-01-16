import React, { useState } from "react";
import { CardLeft, CardRight } from "./components/Card.js";
import "./ScriptAIPage.css";

import axios from 'axios';

function SlideAIPage(props) {
    const [input, setInput] = useState("");
    const [text, setText] = useState("");

    const value = `Lorem ipsum dolor sit amet\n consectetur adipiscing elit.`;
    
    const sendInput = () => { 
        const article = { sentence: input };
        axios.post('http://localhost:5000/getscript', article)
            .then(response => setText(response.data));
    }

    return (
        <div className="pagecontainer">
            <div className="foreground">
                <input placeholder="Input" onChange={e => setInput(e.target.value)}/>
                <button onClick={() => sendInput()}>click me</button>
                
                <style>
                    {`#p-wrap {
                    white-space: pre-line;
                    }`}
                </style>
                {
                    text ?
                    <p id="p-wrap">{text}</p> :
                    <p>Waiting for output...</p>
                }
            </div>
        </div>
    )
}

export default SlideAIPage;