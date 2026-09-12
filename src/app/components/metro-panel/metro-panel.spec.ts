import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MetroPanel } from './metro-panel';

describe('MetroPanel', () => {
  let component: MetroPanel;
  let fixture: ComponentFixture<MetroPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetroPanel],
    }).compileComponents();

    fixture = TestBed.createComponent(MetroPanel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
