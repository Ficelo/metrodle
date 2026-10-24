import { Component } from '@angular/core';
import { ColorService } from '../../services/color.service';

@Component({
  imports: [],
  selector: 'metrodle-up-button',
  styleUrl: './up-button.scss',
  templateUrl: './up-button.html',
})
export class UpButton {

  currentLine: string;

  constructor(private colorService: ColorService) {
    this.currentLine = this.colorService.getCurrentMetroLine();
  }

  ngOnInit() {
    this.currentLine = this.colorService.getCurrentMetroLine();
  }

  scrollUp() {
    window.scrollTo({top: 0, behavior: "smooth"});
  }

}
