import "./Guess.css"
import { Square, squareTypes } from "../square/Square.jsx"

export function Guess({station, lines, town, length, date, direction, correctStation, isName}) {

    // TODO : change last square when arrow system works

    return (
        <div className='guess'>
            <Square text={station} correctText={""} type={(isName) ? squareTypes.name  : squareTypes.name} ></Square>
            <Square text={lines} correctText={""} type={(isName) ? squareTypes.name  : squareTypes.lines}></Square>
            <Square text={town} correctText={""} type={(isName) ? squareTypes.name  : squareTypes.town}></Square>
            <Square text={length} correctText={""} type={(isName) ? squareTypes.name  : squareTypes.length}></Square>
            <Square text={date} correctText={""} type={(isName) ? squareTypes.name  : squareTypes.date}></Square>
            <Square text={direction} correctText={""} type={(isName) ? squareTypes.name  : squareTypes.direction}></Square> 
        </div>
    );

}