import "./Guess.css"
import { Square, squareTypes } from "../square/Square.jsx"

export function Guess({station, lines, town, length, date, direction, isName}) {

    // TODO : change last square when arrow system works

    return (
        <div className='guess'>
            <Square text={station} type={(isName) ? squareTypes.name  : squareTypes.name} ></Square>
            <Square text={lines} type={(isName) ? squareTypes.name  : squareTypes.lines}></Square>
            <Square text={town} type={(isName) ? squareTypes.name  : squareTypes.town}></Square>
            <Square text={length} type={(isName) ? squareTypes.name  : squareTypes.length}></Square>
            <Square text={date} type={(isName) ? squareTypes.name  : squareTypes.date}></Square>
            <Square text={direction} type={(isName) ? squareTypes.name  : squareTypes.direction}></Square> 
        </div>
    );

}