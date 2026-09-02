import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SquareImage } from './square-image';

describe('SquareImage', () => {
  let component: SquareImage;
  let fixture: ComponentFixture<SquareImage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SquareImage],
    }).compileComponents();

    fixture = TestBed.createComponent(SquareImage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
