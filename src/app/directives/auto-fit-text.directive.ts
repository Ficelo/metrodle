import {Directive, ElementRef, Input, SimpleChanges} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appAutoFitTextDirective]'
})
export class AutoFitTextDirective {

  @Input() appAutoFitTextDirective: any;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.fitText();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['appAutoFitText']) {
      setTimeout(() => this.fitText());
    }
  }

  private fitText() {
    const element = this.el.nativeElement as HTMLElement;
    const parent = element.parentElement;
    if (!parent) return;

    element.style.fontSize = '1rem';

    const parentWidth = parent.clientWidth - 8;
    const parentHeight = parent.clientHeight - 8;

    let fontSize = parseFloat(getComputedStyle(element).fontSize);

    while (
      (element.scrollWidth > parentWidth || element.scrollHeight > parentHeight) && fontSize > 8) {
      fontSize -= 1;
      element.style.fontSize = fontSize + 'px';
    }
  }

}
