import { parseDMY } from "./formatting";

export const guessStatuses = {
    correct: "correct",
    partial: "partial",
    incorrect: "incorrect",
    newer: "newer",
    older: "older",
    longer: "longer",
    shorter: "shorter"
}

export function isStationNameCorrect(guess, answer) {

    // Add something to check for partial
    // Ex -> Nanterre université, Nanterra la folie

    if (guess.toLowerCase() === answer.toLowerCase()) {
        return guessStatuses.correct;
    }

    return guessStatuses.incorrect;
}

export function areLinesCorrect(guess, answer) {

    const totalLines = guess.length;
    var correctLines = 0;

    for (var line of guess) {
        if (answer.includes(line)) correctLines += 1
    }

    if (totalLines === correctLines && totalLines === answer.length) return guessStatuses.correct;
    else if (correctLines > 0) return guessStatuses.partial;
    return guessStatuses.incorrect;

}

export function isTownCorrect(guess, answer) {

    if (guess.toLowerCase() === answer.toLowerCase()) {
        return guessStatuses.correct;
    }

    return guessStatuses.incorrect;
}

export function isNameSameLength(guess, answer) {

    if (guess.length === answer.length) {
        return guessStatuses.correct;
    }

    if (guess.length < answer.length) return guessStatuses.longer;
    if (guess.length > answer.length) return guessStatuses.shorter;

    return guessStatuses.incorrect;
}

export function isOpeningDateCorrect(guess, answer) {

    // Might need to swap newer and older depending on feedback

    const guessDate = parseDMY(guess);
    const answerDate = parseDMY(answer);

    if (guessDate === answerDate) return guessStatuses.correct;
    if (guessDate < answerDate) return guessStatuses.newer;
    return guessStatuses.older;
}

export function getColorFromGuessStatus(guessStatus) {
    if (guessStatus === guessStatuses.correct) return "green";
    if (guessStatus === guessStatuses.partial) return "orange";
    if (guessStatus === guessStatuses.longer) return "red";
    if (guessStatus === guessStatuses.shorter) return "red";
    if (guessStatus === guessStatuses.newer) return "red";
    if (guessStatus === guessStatuses.older) return "red";
    return "black";
}

export function getArrowFromGuessStatus(guessStatus) {

    if (guessStatus === guessStatuses.newer || guessStatus === guessStatuses.longer) return "up";
    if (guessStatus === guessStatuses.older || guessStatus === guessStatuses.shorter) return "down";
    return "green";
}