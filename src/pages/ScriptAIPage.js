import React from "react";
import "./ScriptAIPage.css";

function ScriptAIPage(props) {
    return (
        <div className="pagecontainer">
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