import "./MetroPage.css";
import "../../App.css";
import { useState } from "react";
import { Guess } from "../../components/guess/Guess.jsx";
import stationsMetro from "../../data/metro-stations-v1.json";


export function MetroPage({ backColor, color }) {

    const [guesses, setGuesses] = useState([]);
    // TODO : get the save data here when implemented
    const stationsKeys = Object.keys(stationsMetro);
    const possibleStations = Object.keys(stationsMetro).map((key) => stationsMetro[key].name);

    const [inputValue, setInputValue] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    let guessObjects = guesses.map((guess) => {
        return <Guess
            key={guesses.indexOf(guess)}
            station={guess.name}
            lines={guess.lines}
            town={guess.town}
            length={guess.name}
            date={guess.date}
            direction={""} // TODO add direction getting function
            isName={false}
        ></Guess>
    })

    const handleChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        if (value.trim() === "") {
            setSuggestions([]);
        } else {
            const filtered = possibleStations.filter((station) =>
                station.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filtered.slice(0, 10));
        }
    };

    const handleSelectSuggestion = (station) => {
        setInputValue(station);
        setSuggestions([]);
    };

    const handleGuess = () => {
        if (!inputValue) return;
        
        const index = possibleStations.indexOf(inputValue);
        console.log(stationsMetro[stationsKeys[index]]);

        setGuesses([stationsMetro[stationsKeys[index]], ...guesses]);
        console.log(guesses);
        setInputValue("");
        setSuggestions([]);
    };

    return (
        <div className='game-container'>
            <h1 style={{ color: backColor }} className='page-title'>METRODLE</h1>
            <div className='input-container'>
                <input style={{ borderColor: backColor }} onChange={handleChange} value={inputValue} type="text" placeholder="Entrez le nom d'une station" />
                {suggestions.length > 0 && (
                    <ul
                        className="autocomplete-list"
                        style={{
                            position: "absolute",
                            top: "100%",
                            left: 0,
                            width: "100%",
                            backgroundColor: "white",
                            borderRadius: "14px",
                            fontFamily: 'Helvetica Neue',
                            border: `2px solid ${backColor}`,
                            listStyle: "none",
                            margin: "5px 0 0 0",
                            padding: 0,
                            zIndex: 1000,
                            maxHeight: "150px",
                            overflowY: "auto",
                        }}
                    >
                        {suggestions.map((station, i) => (
                            <li
                                key={i}
                                onClick={() => handleSelectSuggestion(station)}
                                style={{
                                    padding: "8px",
                                    cursor: "pointer",
                                    borderBottom: "1px solid #eee",
                                }}
                                onMouseDown={(e) => e.preventDefault()}
                            >
                                {station}
                            </li>
                        ))}
                    </ul>
                )}
                <button style={{ backgroundColor: backColor, color: color }} onClick={handleGuess}>GUESS</button>
            </div>
            <div className="guesses">
                <Guess
                    station="STATION"
                    lines="LIGNES"
                    town={"VILLE"}
                    length={"TAILLE"}
                    date={"DATE"}
                    direction={"DIRECTION"}
                    isName={true}
                ></Guess>
                {guessObjects}
            </div>
        </div>
    );
}