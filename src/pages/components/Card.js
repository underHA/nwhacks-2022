import React from "react";
import "./Card.css";

export function CardLeft(props) {
    return (
        <div className="card-container">
            <img src={props.image} alt="" className="card-image-left"/>
            <div className="text-container">
                <div className="text-sub-container">
                    <p className="card-title-left">{props.title}</p>
                    <p className="card-subtext-left">{props.subtext}</p>
                </div>
            </div>
        </div>
    )
}

/*
export function CardRight(props) {
    return (
        <div className="card-container">
            <div className="text-container">
                <div className="text-sub-container">
                    <p className="card-title-right">{props.title}</p>
                    <p className="card-subtext-right">{props.subtext}</p>
                </div>
            </div>
            <img src={props.image} alt="" className="card-image-right"/>
        </div>
    )
}
*/