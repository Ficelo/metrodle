import { Component, Input } from '@angular/core';

@Component({
  imports: [],
  selector: 'metrodle-square-text',
  styleUrl: './square-text.scss',
  templateUrl: './square-text.html',
})
export class SquareText {

  @Input() text: string = '';

}
