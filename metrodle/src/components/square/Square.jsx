import "./Square.css"
import { useEffect, useRef } from 'react';
import { getCorrectMetroStation } from "../../services/station";
import { getArrowFromCoords } from "../../helper-functions/geolocation"
import { getArrowFromGuessStatus } from "../../helper-functions/guessValidation";

export const squareTypes = {
    name: "name",
    stationName: "stationName",
    lines: "lines",
    town: "town",
    length: "length",
    date: "date",
    direction: "direction"
}

function getListFromString(list) {
    return list.split(",");
}

function atLeastOneIncluded(list1, list2) {

    for (let elem of list1) {
        if (list2.includes(elem)) {
            return true;
        }
    }
    return false;
}

export function BasicSquare({ text, color, delay }) {

    const pRef = useRef();

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

    return (
        <div className={"flip square " + color} style={{ animationDelay: delay }}>
            < p ref={pRef} > {text}</p >
        </div >
    );

}

export function ArrowSquare({text, status, delay}) {

    const arrowDirection = getArrowFromGuessStatus(status);

    const pRef = useRef();

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

    return (
        <div className={"flip square "} style={{ backgroundImage: `url(/images/arrow_${arrowDirection}.png)`,animationDelay: delay }}>
            < p ref={pRef} > {text}</p >
        </div >
    );

}

export function DirectionSquare({ direction, delay }) {

    // TODO : move to a specific css file
    return (
        <div className="square flip" style={{
            border: "2px solid #9C993C",
            backgroundImage: `url(/images/Point-direction-${direction}.png)`,
            backgroundSize: "100%",
            backgroundPosition: "center",
            animationDelay: delay
        }}></div>
    );

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
    let delay = "0ms"

    switch (type) {
        case squareTypes.name:
            color = "white";
            return (
                <div className={"square " + color} style={{ animationDelay: delay }}>
                    <p ref={pRef}>{text}</p>
                </div >
            );
            break;
        case squareTypes.stationName:
            color = "white";
            break;
        case squareTypes.lines:


            if (getListFromString(text) == correctStation.lines) {
                color = "green";
            } else if (atLeastOneIncluded(getListFromString(text), correctStation.lines)) { // Need a separate function for this
                color = "orange";
            }
            delay = "200ms";
            break;
        case squareTypes.town:
            if (text == correctStation.town) {
                color = "green";
            }
            delay = "400ms";
            break;
        case squareTypes.length:
            if (text == correctStation.name.length) {
                color = "green";
            }
            delay = "600ms";
            break;
        case squareTypes.date:
            if (text == correctStation.opening_date) {
                color = "green";
            }
            delay = "800ms";
            break;
        case squareTypes.direction:

            const direction = getArrowFromCoords(text, correctStation.coords)

            if (direction == "CENTER") {
                delay = "1000ms";
                color = "green";
                text = "";
            } else {
                return (
                    <div className="square flip" style={{
                        border: "2px solid #9C993C",
                        backgroundImage: `url(/images/Point-direction-${direction}.png)`,
                        backgroundSize: "100%",
                        backgroundPosition: "center",
                        animationDelay: "1000ms"
                    }}></div>
                );
            }
            break;
        default:
            color = "black";
            break;
    }


    return (
        <div className={"flip square " + color} style={{ animationDelay: delay }}>
            < p ref={pRef} > {text}</p >
        </div >
    );

}