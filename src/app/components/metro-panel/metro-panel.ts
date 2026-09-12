import { Component, input } from '@angular/core';
import { StationMetro } from '../../types/metro/metro-station';
import { MetroGuessResult } from '../../types/metro/metro-guess';
import { StationsService } from '../../services/stations.service';

@Component({
  imports: [],
  selector: 'metrodle-metro-panel',
  styleUrl: './metro-panel.scss',
  templateUrl: './metro-panel.html',
})
export class MetroPanel {

  // guess = input<MetroGuessResult>();
  try = 4;
  testStation : StationMetro;

  constructor(private stationService: StationsService) {
    this.testStation = stationService.getCorrectMetroStation();
    // this.testStation.lines = ["4", "6", "12", "13", "14"];
    
  }

}
