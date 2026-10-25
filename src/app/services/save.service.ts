import { Service } from '@angular/core';
import { MetroSave } from '../types/save';
import { MetroGuessResult } from '../types/metro/metro-guess';
import { StationMetro } from '../types/metro/metro-station';

@Service()
export class SaveService {

    metroSaveData : MetroSave = {found: false, date: new Date().toISOString(), guesses: []};
    metroSaveDataString = 'metroSave';

    constructor() {
        this.initializeMetroSave();
    }

    initializeMetroSave() {
        const metroSavedData = localStorage.getItem(this.metroSaveDataString);
        if (metroSavedData) {

            const savedData = JSON.parse(metroSavedData) as MetroSave;
            const savedDate = new Date(savedData.date);
            const currentDate = new Date();

            if (savedDate.toDateString() === currentDate.toDateString()) {
                this.metroSaveData = savedData;
            }
        }
    }

    getMetroSave() : MetroSave {
        return this.metroSaveData;
    }

    setMetroSave(newData : MetroSave) : void {
        this.metroSaveData = newData;
        this.saveMetroSave();
    }

    saveMetroSave() {
        localStorage.setItem(this.metroSaveDataString, JSON.stringify(this.metroSaveData));
    }

    addMetroGuess(metroGuess: MetroGuessResult) {
        if(metroGuess.name) {
            this.metroSaveData.found = true;
        }
        this.metroSaveData.guesses.unshift(metroGuess);
        this.saveMetroSave();
    }

}
