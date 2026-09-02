import { Component } from '@angular/core';
import { SquareText } from "../squares/square-text/square-text";

@Component({
  imports: [SquareText],
  selector: 'metrodle-guess-metro',
  styleUrl: './guess-metro.scss',
  templateUrl: './guess-metro.html',
})
export class GuessMetro {

  stationText: string = 'STATION';
  linesText: string = 'LINES';
  townText: string = 'TOWN';
  lengthText: string = 'LENGTH';
  dateText: string = 'DATE';
  directionText: string = 'DIRECTION';

}
