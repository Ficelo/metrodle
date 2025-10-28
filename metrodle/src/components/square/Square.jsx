import "./Square.css"
import { useEffect, useRef } from 'react';

export const squareTypes = {
    name: "name",
    lines: "lines",
    town: "town",
    length: "length",
    date: "date",
    direction: "direction"
}

export function Square({ text, correctText, type }) {

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

    // temp until I do the actual color logic
    let color = "white";
    if (type != squareTypes.name) {
        if (text != correctText) {
            color = "black";
        }
        if (correctText.includes(text)) {
            color = "orange";
        }
        if (correctText == text) {
            color = "green";
        }
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