import { Component } from '@angular/core';
import { Square } from "../square/square";

@Component({
  imports: [Square],
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
