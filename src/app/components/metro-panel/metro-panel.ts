import { Component, input } from '@angular/core';
import { MetroGuessResult } from '../../types/metro/metro-guess';
import { StationsService } from '../../services/stations.service';

@Component({
  imports: [],
  selector: 'metrodle-metro-panel',
  styleUrl: './metro-panel.scss',
  templateUrl: './metro-panel.html',
})
export class MetroPanel {

  guess = input.required<MetroGuessResult>();
  try = input.required<number>();

  constructor(private stationService: StationsService) {}

  // TODO : Add some hover explanation for each element

}
