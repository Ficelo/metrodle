import { Component } from '@angular/core';
import { StationsService } from '../../services/stations.service';
import { GuessMetro } from "../../components/guess-metro/guess-metro";

@Component({
  imports: [GuessMetro],
  selector: 'app-metro-page',
  styleUrl: './metro-page.scss',
  templateUrl: './metro-page.html',
})
export class MetroPage {

  constructor(private stationService: StationsService) {}

}
