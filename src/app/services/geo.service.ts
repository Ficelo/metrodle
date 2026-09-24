import { Service } from '@angular/core';
import { Coords } from '../types/geo';
import { DirectionResult } from '../types/guess.enums';


@Service()
export class GeoService {

    getDirectionBetweenTwoCoords(startingCoords: Coords, endingCoords: Coords) : DirectionResult {

        if (startingCoords.lat === endingCoords.lat && startingCoords.lon === endingCoords.lon) {
            return DirectionResult.CORRECT;
        }

        // Turn into a separate function if needed later idk
        const toRadians = (degrees: number) => degrees * Math.PI / 180;
        const startingLat = toRadians(startingCoords.lat);
        const endingLat = toRadians(endingCoords.lat);
        const deltaLongitude = toRadians(endingCoords.lon - startingCoords.lon);
        const X = Math.cos(endingLat) * Math.sin(deltaLongitude);
        const Y = (Math.cos(startingLat) * Math.sin(endingLat)) - (Math.sin(startingLat) * Math.cos(endingLat) * Math.cos(deltaLongitude));
        const angle = Math.atan2(X, Y);
        const angleDegrees = angle * 180 / Math.PI;
        const normalizedAngle = ((angleDegrees % 360) + 360) % 360;

        if (normalizedAngle < 22.5 || normalizedAngle >= 337.5) return DirectionResult.NORTH;
        if (normalizedAngle < 67.5) return DirectionResult.NORTH_EAST;
        if (normalizedAngle < 112.5) return DirectionResult.EAST;
        if (normalizedAngle < 157.5) return DirectionResult.SOUTH_EAST;
        if (normalizedAngle < 202.5) return DirectionResult.SOUTH;
        if (normalizedAngle < 247.5) return DirectionResult.SOUTH_WEST;
        if (normalizedAngle < 292.5) return DirectionResult.WEST;
        return DirectionResult.NORTH_WEST;
    }

}
