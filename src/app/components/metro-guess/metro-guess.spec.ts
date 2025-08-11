import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetroGuess } from './metro-guess';

describe('MetroGuess', () => {
  let component: MetroGuess;
  let fixture: ComponentFixture<MetroGuess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetroGuess]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetroGuess);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
