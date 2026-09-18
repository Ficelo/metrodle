import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoMapPage } from './info-map-page';

describe('InfoMapPage', () => {
  let component: InfoMapPage;
  let fixture: ComponentFixture<InfoMapPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoMapPage],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoMapPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
