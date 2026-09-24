import { TestBed } from '@angular/core/testing';
import { GeoService } from './geo.service';
import { DirectionResult } from '../types/guess.enums';

describe('GeoService', () => {
  let service: GeoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it.each([
    [{ lon: 0, lat: 0 }, DirectionResult.CORRECT],
    [{ lon: 0, lat: 1 }, DirectionResult.NORTH],
    [{ lon: 1, lat: 1 }, DirectionResult.NORTH_EAST],
    [{ lon: 1, lat: 0 }, DirectionResult.EAST],
    [{ lon: 1, lat: -1 }, DirectionResult.SOUTH_EAST],
    [{ lon: 0, lat: -1 }, DirectionResult.SOUTH],
    [{ lon: -1, lat: -1 }, DirectionResult.SOUTH_WEST],
    [{ lon: -1, lat: 0 }, DirectionResult.WEST],
    [{ lon: -1, lat: 1 }, DirectionResult.NORTH_WEST],
  ])('returns the correct direction for %o', (endingCoords, expectedDirection) => {
    expect(service.getDirectionBetweenTwoCoords({ lon: 0, lat: 0 }, endingCoords)).toBe(expectedDirection);
  });
});
