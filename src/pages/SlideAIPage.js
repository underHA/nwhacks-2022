import React from "react";
import { CardLeft, CardRight } from "./components/Card.js";
import Background from "./background.png";
import "./SlideAIPage.css";

function SlideAIPage(props) {
    return (
        <div className="pagecontainer" style={{backgroundImage: Background}}>
            <div className="foreground">
                <div className="menu-bar">
                    <p>Slide AI</p>
                    <p>Script AI</p>
                </div>

                <div className="carddeck-container">
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
                </div>

                <div className="transcription-n-mute">
                    <div className="transcription-bar"></div>
                    <div className="mute-btt">
                        <img src="https://cdn-icons-png.flaticon.com/512/107/107037.png"
                        style={{width: 30, height: 30}}/>
                    </div>
                </div>
            </div>

            <img src={Background}/>

        </div>
    )
}

export default SlideAIPage;