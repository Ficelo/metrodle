import "./Square.css"
import { useEffect, useRef } from 'react';

export function Square({text}) {

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
        <div className='square white'>
            <p ref={pRef}>{text}</p>
        </div>
    );

}

export function ArrowSquare() {

    return (
        <div className='square'>
            
        </div>
    );

}