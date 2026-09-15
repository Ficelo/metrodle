import { Service } from '@angular/core';
import { MetroSave } from '../types/save';

@Service()
export class SaveService {

    metroSaveData : MetroSave = {found: false, date: new Date().toISOString(), guesses: []};
    metroSaveDataString = 'metroSave';

    constructor() {
        this.initializeMetroSave();
    }

    initializeMetroSave() {
        const metroSavedData = localStorage.getItem(this.metroSaveDataString);
        if (metroSavedData) this.metroSaveData = JSON.parse(metroSavedData);
    }

    getMetroSave() : MetroSave {
        return this.metroSaveData;
    }

    setMetroSave(newData : MetroSave) : void {
        this.metroSaveData = newData;
        localStorage.setItem(this.metroSaveDataString, JSON.stringify(this.metroSaveData));
    }

}
