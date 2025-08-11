import { Injectable } from '@angular/core';
import {Guess} from './station.service';

export interface SaveData {
  last_day : string,
  guesses : Guess[]
  found : boolean
}

@Injectable({
  providedIn: 'root'
})
export class SaveService {

  saveData : SaveData;
  saveDataString = "save_data";

  constructor() {

    const saved = localStorage.getItem(this.saveDataString);

    if (saved == null) {
      this.saveData = { last_day: new Date().toISOString(), guesses: [], found: false };
      localStorage.setItem(this.saveDataString, JSON.stringify(this.saveData));
    } else {
      this.saveData = JSON.parse(saved);

      const lastDayDate = new Date(this.saveData.last_day);
      lastDayDate.setHours(0, 0, 0, 0);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (lastDayDate < today) {
        this.saveData.last_day = today.toISOString();
        this.saveData.found = false;
        this.saveData.guesses = [];
        localStorage.setItem(this.saveDataString, JSON.stringify(this.saveData));
      }

    }

  }

  getSaveData() : SaveData {
    return this.saveData;
  }

  setSateData(data : SaveData)  {
    this.saveData = data;
    localStorage.setItem(this.saveDataString, JSON.stringify(this.saveData));
  }

}
