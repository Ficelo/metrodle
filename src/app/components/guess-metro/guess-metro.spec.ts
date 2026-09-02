import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuessMetro } from './guess-metro';

describe('GuessMetro', () => {
  let component: GuessMetro;
  let fixture: ComponentFixture<GuessMetro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuessMetro],
    }).compileComponents();

    fixture = TestBed.createComponent(GuessMetro);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
