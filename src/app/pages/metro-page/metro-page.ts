import { Component, OnInit, ViewChild, signal } from '@angular/core';
import { StationsService } from '../../services/stations.service';
import { StationMetro } from '../../types/metro/metro-station';
import { Autocomplete, AutocompleteOption } from "../../components/autocomplete/autocomplete";
import { MetroGuessResult } from '../../types/metro/metro-guess';
import { DateResult, DirectionResult, LinesResult, NameLengthResult } from '../../types/guess.enums';
import { MetroPanel } from "../../components/metro-panel/metro-panel";
import { MapComponent } from '../../components/map/map';

@Component({
  imports: [Autocomplete, MetroPanel, MapComponent],
  selector: 'app-metro-page',
  styleUrl: './metro-page.scss',
  templateUrl: './metro-page.html',
})
export class MetroPage implements OnInit {

  @ViewChild(MapComponent) mapComponent!: MapComponent;
  correctStation : StationMetro;
  stationsMetro: StationMetro[] = [];
  autocompleteOptions = signal<AutocompleteOption[]>([]);
  guesses: MetroGuessResult[] = [];
  

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
    this.createMetroGuess(this.stationService.getMetroStationByName(selectedStation.label)!);
  }

  createMetroGuess(selectedStation: StationMetro) {
    this.mapComponent.addStationOnMap(selectedStation);
    this.guesses.unshift({
      station: selectedStation,
      name: true,
      town: true,
      lines: LinesResult.INCORRECT,
      length: NameLengthResult.SHORTER,
      date: DateResult.LATER,
      direction: DirectionResult.NORTH
    });
  }
}
