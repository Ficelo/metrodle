import { Component, output } from '@angular/core';
import { StationMetro } from '../../types/metro/metro-station';
import { StationsService } from '../../services/stations.service';

@Component({
  imports: [],
  selector: 'metrodle-win-screen',
  styleUrl: './win-screen.scss',
  templateUrl: './win-screen.html',
})
export class WinScreen {

  correctStation : StationMetro;
  attempts = 0;

  onClosedUpate = output<boolean>();

  constructor(private stationService: StationsService) {
    this.correctStation = this.stationService.getCorrectMetroStation();
  }

  close() {
    this.onClosedUpate.emit(false);
  }

}
