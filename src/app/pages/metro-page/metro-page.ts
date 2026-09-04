import { Component, OnInit, signal } from '@angular/core';
import { StationsService } from '../../services/stations.service';
import { GuessMetro } from "../../components/guess-metro/guess-metro";
import { StationMetro } from '../../types/metro/metro-station';
import { Autocomplete, AutocompleteOption } from "../../components/autocomplete/autocomplete";

@Component({
  imports: [GuessMetro, Autocomplete],
  selector: 'app-metro-page',
  styleUrl: './metro-page.scss',
  templateUrl: './metro-page.html',
})
export class MetroPage implements OnInit {

  correctStation : StationMetro;
  stationsMetro: StationMetro[] = [];
  autocompleteOptions = signal<AutocompleteOption[]>([]);
  guesses: GuessMetro[] = [];

  constructor(private stationService: StationsService) {
    this.correctStation = this.stationService.getCorrectMetroStation();
    this.stationsMetro = this.stationService.getMetroStations();
    this.autocompleteOptions.set(this.stationsMetro.map((station, index) => ({
      id: index,
      label: station.name
    })));

  }

  ngOnInit() {
    console.log('Correct station:', this.correctStation);
  }

  onMetroSelected(selectedStation: AutocompleteOption) {
    console.log(selectedStation);
    console.log(`${selectedStation.label} is ${this.stationService.isMetroStationCorrect(selectedStation.label) ? 'correct' : 'incorrect'}`);
  }
}
