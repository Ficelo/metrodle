import { Injectable } from '@angular/core';
import * as arrets from "../../assets/infos-stations-v2.json";

export interface Arret {
  name : string,
  town : string,
  type : string,
  accessibility : string,
  audiblesignals : string,
  lines : string[],
  opening_date : string
}

export interface Guess {
  station : Arret,
  ligne : string,
  ville : boolean,
  name : string,
  opening_date : string,
  correct_town : string
}

@Injectable({
  providedIn: 'root'
})
export class StationService {

  arretsData : Arret[] = [];
  correctArret : Arret;

  constructor() {
    this.arretsData = Object.values(arrets) as Arret[];
    this.correctArret = this.generateStationOfTheDay();
  }

  getCorrectArret() : Arret {
    return this.correctArret;
  }

  getArretsData() : Arret[] {
    return this.arretsData;
  }

  generateStationOfTheDay(): Arret {
    const today = new Date();
    const dateString = today.toISOString().split('T')[0];

    let hash = 0;
    for (let i = 0; i < dateString.length; i++) {
      hash = (hash << 5) - hash + dateString.charCodeAt(i);
      hash |= 0;
    }

    const index = Math.abs(hash) % this.arretsData.length;
    return this.arretsData[index];
  }

}
