import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpButton } from './up-button';

describe('UpButton', () => {
  let component: UpButton;
  let fixture: ComponentFixture<UpButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpButton],
    }).compileComponents();

    fixture = TestBed.createComponent(UpButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
