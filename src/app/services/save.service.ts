import { Service } from '@angular/core';
import { MetroSave } from '../types/save';
import { MetroGuessResult } from '../types/metro/metro-guess';

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
        this.metroSaveData.guesses.unshift(metroGuess);
        this.saveMetroSave();
    }

}
