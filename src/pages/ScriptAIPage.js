import React from "react";
import { CardLeft, CardRight } from "./components/Card.js";
import "./ScriptAIPage.css";


function SlideAIPage(props) {
    return (
        <div className="pagecontainer">
            <div className="foreground">

                <div className="carddeck-container">
                    <CardLeft title="Script AI."
                        subtext="Generate scripts on the fly, limit's the sky. Don't need to ask why, come try the AI! 🎉"
                        image="https://i1.wp.com/www.un.org/sustainabledevelopment/wp-content/uploads/2015/12/english_SDG_17goals_poster_all_languages_with_UN_emblem_1.png?fit=728%2C451&ssl=1"
                    />
                </div>
            </div>

        </div>
    )
}

export default SlideAIPage;