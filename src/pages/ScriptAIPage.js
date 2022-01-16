import React, { useState } from "react";
import "./ScriptAIPage.css";

import axios from 'axios';

function ScriptAIPage(props) {
    const [input, setInput] = useState("");
    const [text, setText] = useState("");
    const [waiting, setWaiting] = useState(false);
    
    const sendInput = () => { 
        setText("");
        setWaiting(true);
        const article = { sentence: input };
        axios.post('http://localhost:5000/getscript', article)
            .then(response => {
                setText(response.data)
                setWaiting(false);
            });
    }

    return (
        <div className="pagecontainer">
            <div className="foreground">
                
                <style>
                    {`#p-wrap {
                    white-space: pre-line;
                    }`}
                </style>
                
                <div className="script-form">
                    <input placeholder="What should I make a script about? 💭" onChange={e => setInput(e.target.value)} type="text" id="script-input" name="script-input"/>
                    <button onClick={() => sendInput()} type="submit" id="script-submit">Generate!</button>
                </div>

                <div className="output-field">
                    {
                        text ?
                        <p id="p-wrap">{text}</p> :
                        <p>{ waiting ? "Generating output! Give me a moment... 😉" : "Waiting for input above!"}</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default ScriptAIPage;