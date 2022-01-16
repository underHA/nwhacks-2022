import React, { useState } from "react";
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
            <form className="script-form">
                <input type="text" id="script-input" name="script-input"/>
                <input type="submit" id="script-submit" value="Generate!"/>
            </form>

            <div className="output-field">
                <p>This is an example output sentence.</p>
            </div>
        </div>
    )
}

export default ScriptAIPage;