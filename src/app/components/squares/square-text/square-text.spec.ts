import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SquareText } from './square-text';

describe('SquareText', () => {
  let component: SquareText;
  let fixture: ComponentFixture<SquareText>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SquareText],
    }).compileComponents();

    fixture = TestBed.createComponent(SquareText);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
