import {Component, Input, OnInit} from '@angular/core';
import {Arret, Guess} from '../../services/station.service';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-metro-guess',
  imports: [
    NgClass
  ],
  templateUrl: './metro-guess.html',
  standalone: true,
  styleUrl: './metro-guess.css'
})
export class MetroGuess implements OnInit{

  @Input() guess! : Guess;

  station! : Arret;

  ngOnInit() {
    this.station = this.guess.station;
    console.log("in guess ");
    console.log(this.station);
  }


}
