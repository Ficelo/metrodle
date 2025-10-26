import "./Guess.css"
import { Square } from "../square/Square.jsx"

export function Guess({station, lines, town, length, date, direction}) {

    // todo change last square when arrow system works

    return (
        <div className='guess'>
            <Square text={station} ></Square>
            <Square text={lines}></Square>
            <Square text={town}></Square>
            <Square text={length}></Square>
            <Square text={date}></Square>
            <Square text={direction}></Square> 
        </div>
    );

}