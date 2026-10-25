import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WinScreen } from './win-screen';

describe('WinScreen', () => {
  let component: WinScreen;
  let fixture: ComponentFixture<WinScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WinScreen],
    }).compileComponents();

    fixture = TestBed.createComponent(WinScreen);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
