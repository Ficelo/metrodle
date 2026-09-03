import { Component, OnInit } from '@angular/core';
import { StationsService } from '../../services/stations.service';
import { GuessMetro } from "../../components/guess-metro/guess-metro";
import { StationMetro } from '../../types/metro/metro-station';

@Component({
  imports: [GuessMetro],
  selector: 'app-metro-page',
  styleUrl: './metro-page.scss',
  templateUrl: './metro-page.html',
})
export class MetroPage implements OnInit {

  correctStation : StationMetro;

  constructor(private stationService: StationsService) {
    this.correctStation = this.stationService.getCorrectMetroStation();
  }

  ngOnInit() {
    console.log('Correct station:', this.correctStation);
  }
}
