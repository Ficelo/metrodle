import stationsMetro from "../data/metro-stations-v1.json";


export function getCorrectMetroStation() {

    const today = new Date();
    const dateString = today.toISOString().split('T')[0];

    let hash = 0;
    for(let i = 0; i < dateString.length; i++) {
        hash = (hash << 5) - hash + dateString.charCodeAt(i);
        hash |= 0;
    }

    const index = Math.abs(hash) % Object.keys(stationsMetro).length;
    return stationsMetro[Object.keys(stationsMetro)[index]];
}