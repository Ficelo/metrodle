import { AfterViewInit, Component, OnInit, ViewChild, signal } from '@angular/core';
import { StationsService } from '../../services/stations.service';
import { StationMetro } from '../../types/metro/metro-station';
import { Autocomplete, AutocompleteOption } from "../../components/autocomplete/autocomplete";
import { MetroGuessResult } from '../../types/metro/metro-guess';
import { MetroPanel } from "../../components/metro-panel/metro-panel";
import { MapComponent } from '../../components/map/map';
import { ColorService } from '../../services/color.service';
import { SaveService } from '../../services/save.service';
import { GeoService } from '../../services/geo.service';
import { UpButton } from '../../components/up-button/up-button';

@Component({
  imports: [Autocomplete, MetroPanel, MapComponent, UpButton, UpButton],
  selector: 'app-metro-page',
  styleUrl: './metro-page.scss',
  templateUrl: './metro-page.html',
})
export class MetroPage implements OnInit, AfterViewInit {

  @ViewChild(MapComponent) mapComponent!: MapComponent;
  correctStation : StationMetro;
  stationsMetro: StationMetro[] = [];
  autocompleteOptions = signal<AutocompleteOption[]>([]);
  guesses: MetroGuessResult[] = [];
  currentLine: string;
  

  constructor(
      private stationService: StationsService,
      private colorService: ColorService,
      private saveService: SaveService,
      private geoService: GeoService) {
    this.correctStation = this.stationService.getCorrectMetroStation();
    this.stationsMetro = this.stationService.getMetroStations();
    this.autocompleteOptions.set(this.stationsMetro.map((station, index) => ({
      id: index,
      label: station.name
    })));
    this.currentLine = this.colorService.getCurrentMetroLine();
  }

  ngOnInit() {
    console.log('Correct station:', this.correctStation);
    this.colorService.refreshCurrentMetroLine();
    this.currentLine = this.colorService.getCurrentMetroLine();
    this.guesses = this.saveService.getMetroSave().guesses;
  }

  ngAfterViewInit() {
    for(let guess of this.guesses) {
      this.mapComponent.addStationOnMap(guess.station)
    }
  }

  onMetroSelected(selectedStation: AutocompleteOption) {
    console.log(selectedStation);
    console.log(`${selectedStation.label} is ${this.stationService.isMetroStationCorrect(selectedStation.label) ? 'correct' : 'incorrect'}`);
    this.createMetroGuess(this.stationService.getMetroStationByName(selectedStation.label)!);
  }

  createMetroGuess(selectedStation: StationMetro) {
    this.mapComponent.addStationOnMap(selectedStation);
    const newGuess = {
      station: selectedStation,
      name: this.stationService.getNameResult(selectedStation.name, this.correctStation.name),
      town: this.stationService.getTownResult(selectedStation.town, this.correctStation.town),
      lines: this.stationService.getLinesResult(selectedStation.lines, this.correctStation.lines),
      length: this.stationService.getNameLengthResult(selectedStation.name, this.correctStation.name),
      date: this.stationService.getOpeningDateResult(selectedStation.openingDate, this.correctStation.openingDate),
      direction: this.geoService.getDirectionBetweenTwoCoords(selectedStation.coords, this.correctStation.coords)
    }
    //this.guesses.unshift(newGuess);
    this.saveService.addMetroGuess(newGuess);
  }
}
