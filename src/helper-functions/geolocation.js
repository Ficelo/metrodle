export function getArrowFromCoords(guessCoords, correctCoords) {

    if(guessCoords === correctCoords) {
        return "CENTER"
    }

    const toRadiant = (deg) => deg * Math.PI / 180;
    const toDegrees = (rad) => rad * 180 / Math.PI;

    const lat1 = toRadiant(guessCoords.lat);
    const lat2 = toRadiant(correctCoords.lat);
    const deltaLat = toRadiant(correctCoords.lon - guessCoords.lon);

    const x = Math.sin(deltaLat) * Math.cos(lat2);
    const y = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2);
    
    let bearing = toDegrees(Math.atan2(x, y));
    bearing = (bearing + 360) % 360;

    let direction = "";
    if(bearing >= 337.5 || bearing < 22.5) direction = "TOP"
    else if (bearing < 67.5) direction = "TOP-RIGHT"
    else if (bearing < 112.5) direction = "RIGHT"
    else if (bearing < 157.5) direction = "BOTTOM-RIGHT"
    else if (bearing < 202.5) direction = "BOTTOM"
    else if (bearing < 247.5) direction = "BOTTOM-LEFT"
    else if (bearing < 292.5) direction = "LEFT"
    else direction = "TOP-LEFT";

    return direction;
}
