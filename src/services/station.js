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

export function setMetroSave(guesses, found) {
    localStorage.setItem('metro-save', JSON.stringify({found : found, date: new Date(), guesses : guesses}));
}

export function getMetroSave() {

    const raw = localStorage.getItem('metro-save');
    if(!raw) return null;

    let save = JSON.parse(raw);
    const today = new Date();

    save.date = new Date(save.date);

    const isSameDay = save.date.getFullYear() === today.getFullYear()
                        && save.date.getMonth() === today.getMonth() 
                        && save.date.getDate() === today.getDate();

    if (!isSameDay) {
        save.found = false;
        save.guesses = [];
    }

    return save;
}