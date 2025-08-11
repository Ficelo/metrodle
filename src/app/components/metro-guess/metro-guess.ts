import {Component, Input, OnInit} from '@angular/core';
import {Arret, Guess} from '../../services/station.service';
import {NgClass} from '@angular/common';
import {AutoFitTextDirective} from '../../directives/auto-fit-text.directive';

@Component({
  selector: 'app-metro-guess',
  imports: [
    NgClass,
    AutoFitTextDirective
  ],
  templateUrl: './metro-guess.html',
  standalone: true,
  styleUrl: './metro-guess.css'
})
export class MetroGuess implements OnInit{
  flipState = false;

  @Input() guess! : Guess;

  station! : Arret;

  ngOnInit() {
    this.station = this.guess.station;
  }


}
