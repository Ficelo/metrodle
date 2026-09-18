import { Component, OnInit, Signal } from '@angular/core';
import { ColorService } from '../../services/color.service';

@Component({
  imports: [],
  selector: 'metrodle-top-bar',
  styleUrl: './top-bar.scss',
  templateUrl: './top-bar.html',
})
export class TopBar implements OnInit {

  currentLine!: Signal<string>;

  constructor(private colorService: ColorService) {
    // TODO : Adapt this to the specific page when RER and TRAM are added
    this.currentLine = this.colorService.currentMetroLine;
  }

  ngOnInit() {}

}
