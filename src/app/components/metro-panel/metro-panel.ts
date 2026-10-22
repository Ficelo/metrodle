import { Component, input } from '@angular/core';
import { MetroGuessResult } from '../../types/metro/metro-guess';
import { StationsService } from '../../services/stations.service';
import { DateResult, LinesResult } from '../../types/guess.enums';

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

  getDateAnswerText(dateResult: DateResult) {
    switch (dateResult) {
      case DateResult.CORRECT:
        return "Correct";
      case DateResult.EARLIER:
        return "Posterieur";
      case DateResult.LATER:
        return "Antérieur";
      default:
        return "sah jsp";
    }
  } 

  getLinesAnswerText(linesResult: LinesResult) {
    switch (linesResult) {
      case LinesResult.CORRECT:
        return "Correct";
      case LinesResult.INCORRECT:
        return "Incorrect";
      case LinesResult.PARTIAL:
        return "Partial";
      default:
        return "guh"
    }
  }

}
