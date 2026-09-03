import { Service } from '@angular/core';
import { StationMetro } from '../types/metro/metro-station';
import dataMetro from '../data/stations-metro-v1.json';

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

    getCorrectMetroStation() : StationMetro {

        const today = new Date();
        const date = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

        let hash = date;
        hash = ((hash << 5) - hash) + date;
        
        const index = Math.abs(hash) % this.metroStations.length;
        
        return this.metroStations[index];
    }

    initializeRERStations() {
        // TODO : get the RER data
    }

    getMetroStations(): StationMetro[] {
        return this.metroStations;
    }
}
