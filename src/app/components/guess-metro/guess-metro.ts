import { Component, computed, input } from '@angular/core';
import { Square } from "../square/square";
import { MetroGuessResult } from '../../types/metro/metro-guess';

@Component({
  imports: [Square],
  selector: 'metrodle-guess-metro',
  styleUrl: './guess-metro.scss',
  templateUrl: './guess-metro.html',
})
export class GuessMetro {

  guess = input<MetroGuessResult>();
  station = computed(() => this.guess()?.station);

  stationText : string = 'STATION';
  linesText : string = 'LINES';
  townText : string = 'TOWN';
  lengthText : string = 'LENGTH';
  dateText : string = 'DATE';
  directionText : string = 'DIRECTION';

  ngOnInit() {
    if(this.station()) {
      this.stationText = this.station()!.name;
      this.linesText = this.station()!.lines.toString();
      this.townText = this.station()!.town;
      this.lengthText = this.station()!.name.length.toString();
      this.dateText = this.station()!.openingDate;
    }
  }

}
