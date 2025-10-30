import "./Square.css"
import { useEffect, useRef } from 'react';
import { getCorrectMetroStation } from "../../services/station";

export const squareTypes = {
    name: "name",
    lines: "lines",
    town: "town",
    length: "length",
    date: "date",
    direction: "direction"
}

function getArrowFromCoords(guessCoords, correctCoords) {

    const toRadiant = (deg) => deg * Math.PI / 180;
    const toDegrees = (rad) => rad * 180 / Math.PI;

    const lat1 = toRadiant(guessCoords.lat);
    const lat2 = toRadiant(correctCoords.lat);
    const deltaLat = toRadiant(correctCoords.lon - guessCoords.lon);

    const x = Math.sin(deltaLat) * Math.cos(lat2);
    const y = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2);
    
    let bearing = toDegrees(Math.atan2(x, y));
    bearing = (bearing + 360) % 360;

    let direction = "";
    if(bearing >= 337.5 || bearing < 22.5) direction = "TOP"
    else if (bearing < 67.5) direction = "TOP-RIGHT"
    else if (bearing < 112.5) direction = "RIGHT"
    else if (bearing < 157.5) direction = "BOTTOM-RIGHT"
    else if (bearing < 202.5) direction = "BOTTOM"
    else if (bearing < 247.5) direction = "BOTTOM-LEFT"
    else if (bearing < 292.5) direction = "LEFT"
    else direction = "TOP-LEFT";

    return direction;
}

export function Square({ text, type }) {

    const pRef = useRef();
    const correctStation = getCorrectMetroStation();

    useEffect(() => {
        const el = pRef.current;
        if (!el) return;

        let fontSize = 16;
        el.style.fontSize = `${fontSize}px`;

        const parent = el.parentElement;

        while ((el.scrollWidth > parent.clientWidth || el.scrollHeight > parent.clientHeight) && fontSize > 6) {
            fontSize -= 1;
            el.style.fontSize = `${fontSize}px`;
        }
    }, [text]);

    let color = "black";

    switch(type) {
        case squareTypes.name: 
            color = "white";
            break;
        case squareTypes.lines:
            if (text == correctStation.lines) {
                color = "green";
            } else if (correctStation.lines.includes(text)) { // Need a separate function for this
                color = "orange";
            }
            break;
        case squareTypes.town:
            if (text == correctStation.town) {
                color = "green";
            }
            break;
        case squareTypes.length:
            if (text == correctStation.name.length) {
                color = "green";
            }
            break;
        case squareTypes.date:
            if (text == correctStation.opening_date) {
                color = "green";
            }
            break;
        case squareTypes.direction:
            console.log("direction")
            console.log(getArrowFromCoords(text, correctStation.coords));
            return (
                <div className="square" style={{
                    border: "2px solid #9C993C",
                    backgroundImage: `url(/images/Point-direction-${getArrowFromCoords(text, correctStation.coords)}.png)`,
                    backgroundSize: "fill",
                    backgroundPosition : "center"
                }}></div>
            );
            break;
        default:
            color = "black";
            break;
    }


    return (
        <div className={"square " + color}>
            < p ref = { pRef } > { text }</p >
        </div >
    );

}

export function ArrowSquare() {

    return (
        <div className='square'>

        </div>
    );

}