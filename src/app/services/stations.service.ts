import { Service } from '@angular/core';
import { StationMetro } from '../types/metro/metro-station';
import dataMetro from '../data/stations-metro-v1.json';
import { DateResult, LinesResult, NameLengthResult } from '../types/guess.enums';

@Service()
export class StationsService {

    metroStations: StationMetro[] = [];

    constructor() {
        this.initializeMetroStations();
    }

    initializeMetroStations() {
        for (const station of Object.values(dataMetro)) {
            try {
                this.metroStations.push({
                    name: station.name,
                    town: station.town,
                    accessibility: (station.accessibility == "true") ? true : false,
                    audibleSignels: (station.audiblesignals == "true") ? true : false,
                    lines: station.lines,
                    openingDate: station.opening_date,
                    coords: {
                        lon: station.coords.lon,
                        lat: station.coords.lat
                    }
                });
            } catch (error) {
                console.error(`Error processing station data for ${station.name}: ${error}`);
            }
        }
    }

    getMetroStationByName(name: string): StationMetro | undefined {
        return this.metroStations.find(station => station.name.toLowerCase() === name.toLowerCase());
    }

    getCorrectMetroStation() : StationMetro {
        const today = new Date();
        const date = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

        let hash = date;
        hash = ((hash << 5) - hash) + date;
        
        const index = Math.abs(hash) % this.metroStations.length;
        
        return this.metroStations[index];
    }

    isMetroStationCorrect(stationName: string): boolean {
        const correctStation = this.getCorrectMetroStation();
        return correctStation.name.toLowerCase() === stationName.toLowerCase();
    }

    getNameLengthResult(guessName: string, correctName: string) : NameLengthResult {
        if (guessName.length > correctName.length) return NameLengthResult.SHORTER;
        if (guessName.length < correctName.length) return NameLengthResult.LONGER;
        return NameLengthResult.CORRECT;
    }

    getTownResult(guessTown: string, correctTown: string) : boolean {
        return guessTown == correctTown;
    }

    getNameResult(guessName: string, correctName: string) : boolean {
        return guessName == correctName;
    }

    getOpeningDateResult(guessDate: string, correctDate: string) : DateResult {
        const guess = new Date(guessDate);
        const correct = new Date(correctDate);
        if (guess < correct) return DateResult.LATER;
        if (guess > correct) return DateResult.EARLIER;
        return DateResult.CORRECT;
    }

    getLinesResult(guessLines: string[], correctLines: string[]) : LinesResult {
        let same = 0;
        for(let line of guessLines) {
            if(correctLines.includes(line)) same += 1;
        }
        if (same == guessLines.length && same == correctLines.length) return LinesResult.CORRECT;
        if (same >= 1) return LinesResult.PARTIAL;
        return LinesResult.INCORRECT;
    }

    initializeRERStations() {
        // TODO : get the RER data
    }

    getMetroStations(): StationMetro[] {
        return this.metroStations;
    }
}
