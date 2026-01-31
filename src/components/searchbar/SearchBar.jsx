import { useState } from "react";

export function SearchBar({
    possibleStations,
    onGuess,
    disabled,
    backColor,
    color,
}) {
    const [inputValue, setInputValue] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const handleChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        if (!value.trim()) {
            setSuggestions([]);
            return;
        }

        const filtered = possibleStations
            .filter((station) =>
                station.toLowerCase().includes(value.toLowerCase())
            )
            .slice(0, 10);

        setSuggestions(filtered);
    };

    const handleSelectSuggestion = (station) => {
        setInputValue(station);
        setSuggestions([]);
    };

    const handleSubmit = () => {
        if (!inputValue) return;
        onGuess(inputValue);
        setInputValue("");
        setSuggestions([]);
    };

    return (
        <div className="input-container">
            <input
                disabled={disabled}
                style={{ borderColor: backColor }}
                value={inputValue}
                onChange={handleChange}
                type="text"
                placeholder="Entrez le nom d'une station"
            />

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
                        fontFamily: "Arial",
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
                            key={station}
                            onClick={() => handleSelectSuggestion(station)}
                            onMouseDown={(e) => e.preventDefault()}
                            style={{
                                padding: "8px",
                                cursor: "pointer",
                                borderBottom: "1px solid #eee",
                            }}
                        >
                            {station}
                        </li>
                    ))}
                </ul>
            )}

            <button
                style={{ backgroundColor: backColor, color }}
                onClick={handleSubmit}
                disabled={disabled}
            >
                GUESS
            </button>
        </div>
    );
}
