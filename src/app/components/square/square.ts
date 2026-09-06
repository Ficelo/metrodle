import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'metrodle-square',
  styleUrl: './square.scss',
  templateUrl: './square.html',
})
export class Square {

  // TODO : Try to replace the squares with a metro wagon or something

  // this is kinda lame with the "''" maybe find a way to make it nicer
  readonly type = input<'text' | 'image'>('text');
  readonly text = input<string>('');

  readonly imageUrl = input<string>('');
  readonly imageAlt = input<string>('');

}
