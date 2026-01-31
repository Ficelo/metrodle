import "./Guess.css"
import { Square, squareTypes, BasicSquare, ArrowSquare, DirectionSquare } from "../square/Square.jsx"
import {isStationNameCorrect, areLinesCorrect, isTownCorrect, isNameSameLength, isOpeningDateCorrect, getColorFromGuessStatus} from "../../helper-functions/guessValidation.js"
import { getCorrectMetroStation } from "../../services/station.js";
import { getArrowFromCoords } from "../../helper-functions/geolocation.js";
import { formatLinesString } from "../../helper-functions/formatting.js";

export function Guess({station, lines, town, length, date, direction, isName}) {

    return (
        <div className='guess'>
            <Square key={station} text={station} type={(isName) ? squareTypes.name  : squareTypes.stationName} ></Square>
            <Square text={lines.toString()} type={(isName) ? squareTypes.name  : squareTypes.lines}></Square>
            <Square text={town} type={(isName) ? squareTypes.name  : squareTypes.town}></Square>
            <Square text={length} type={(isName) ? squareTypes.name  : squareTypes.length}></Square>
            <Square text={date} type={(isName) ? squareTypes.name  : squareTypes.date}></Square>
            <Square text={direction} type={(isName) ? squareTypes.name  : squareTypes.direction}></Square> 
        </div>
    );

}

export function MetroGuess({station, lines, town, length, date, direction}) {

    const correctStation = getCorrectMetroStation();

    const stationNameStatus = isStationNameCorrect(station, correctStation.name);
    const lineStatus = areLinesCorrect(lines, correctStation.lines);
    const townStatus = isTownCorrect(town, correctStation.town);
    const lengthStatus = isNameSameLength(station, correctStation.name);
    const dateStatus = isOpeningDateCorrect(date, correctStation.opening_date);
    const arrow = getArrowFromCoords(direction, correctStation.coords);

    return (
        <div className='guess'>
            <BasicSquare key={station} text={station} color={getColorFromGuessStatus(stationNameStatus)} delay={"0ms"}></BasicSquare>
            <BasicSquare text={formatLinesString(lines)} color={getColorFromGuessStatus(lineStatus)} delay={"200ms"}></BasicSquare>
            <BasicSquare text={town} color={getColorFromGuessStatus(townStatus)} delay={"400ms"}></BasicSquare>
            <ArrowSquare text={length} status={lengthStatus} color={getColorFromGuessStatus(lengthStatus)} delay={"600ms"}></ArrowSquare>
            <ArrowSquare text={date} status={dateStatus} delay={"800ms"}></ArrowSquare>
            <DirectionSquare direction={arrow} delay={"1000ms"}></DirectionSquare>
        </div>
    );

}