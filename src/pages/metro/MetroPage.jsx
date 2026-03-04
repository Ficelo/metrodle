import "./MetroPage.css";
import "../../App.css";
import { useState } from "react";
import { Guess, MetroGuess } from "../../components/guess/MetroGuess.jsx";
import { getCorrectMetroStation, getMetroSave, setMetroSave } from "../../services/station.js";
import stationsMetro from "../../data/metro-stations-v1.json";
import { WinScreen } from "../../components/win-message/WinScreen.jsx";
import { SearchBar } from "../../components/searchbar/SearchBar.jsx";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import { getCityCoords } from "../../helper-functions/geolocation.js";

export function MetroPage({ backColor, color }) {

    const [guesses, setGuesses] = useState((getMetroSave()) ? getMetroSave().guesses : []);
    const [found, setFound] = useState((getMetroSave()) ? getMetroSave().found : false);
    const stationsKeys = Object.keys(stationsMetro);
    const possibleStations = Object.keys(stationsMetro).map((key) => stationsMetro[key].name);

    const [inputValue, setInputValue] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    let guessObjects = guesses.map((guess) => {
        return <MetroGuess
            key={guess.name + guess.opening_date}
            station={guess.name}
            lines={guess.lines}
            town={guess.town}
            length={guess.name.length}
            date={guess.opening_date}
            direction={guess.coords}
            isName={false}
        ></MetroGuess>
    })

    let markers = guesses.map((guess) => {
        return <Marker position={[guess.coords.lat, guess.coords.lon]}>
            <Popup>
                {(guesses.length - guesses.indexOf(guess)) + " : " + guess.name}
            </Popup>
        </Marker>
    });

    const handleGuess = (stationName) => {
        if (!possibleStations.includes(stationName)) return;

        const guessNames = guesses.map((g) => g.name);
        if (guessNames.includes(stationName)) return;

        const index = possibleStations.indexOf(stationName);
        const correct = getCorrectMetroStation();
        const guessedStation = stationsMetro[stationsKeys[index]];

        const newGuesses = [guessedStation, ...guesses];
        const isCorrect = correct === guessedStation;

        setFound(isCorrect);
        setGuesses(newGuesses);
        setMetroSave(newGuesses, isCorrect);
    };

    return (
        <div className='game-container'>
            <h1 style={{ color: backColor }} className='page-title'>METRODLE</h1>
            <div className="map">
                <MapContainer center={[getCityCoords().lon, getCityCoords().lat]} zoom={11} scrollWheelZoom={true} maxZoom={14} minZoom={10}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {markers}
                </MapContainer>

            </div>
            {!found ? (
                <SearchBar
                    possibleStations={possibleStations}
                    onGuess={handleGuess}
                    disabled={found}
                    backColor={backColor}
                    color={color}
                ></SearchBar>
            ) : (
                <WinScreen></WinScreen>
            )}

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