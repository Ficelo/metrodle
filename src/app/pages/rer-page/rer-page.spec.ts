import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RerPage } from './rer-page';

describe('RerPage', () => {
  let component: RerPage;
  let fixture: ComponentFixture<RerPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RerPage],
    }).compileComponents();

    fixture = TestBed.createComponent(RerPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
