import fs from "fs";

function normalizeName(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "")
    .replace(/-/g, "");
}

function saveToFile(data, version=1) {
    const dataS = JSON.stringify(data);
    fs.writeFile(`../data/metro-stations-v${version}.json`, dataS, "utf8", (err) => {
        if (err) {
            console.error("Error while writing file : ", err);
        } else {
            console.log("Stations written to file.")
        }
    });

}

const metroCoords = JSON.parse(fs.readFileSync("../assets/new.json"));
const currentMetro = JSON.parse(fs.readFileSync("../assets/infos-stations-v2.json"));

for(let station of Object.keys(currentMetro)) {

    let stationNameNormalized = normalizeName(currentMetro[station].name);
    let found = false;

    for (let stationWithCoords of metroCoords) {
        if( stationWithCoords && normalizeName(stationWithCoords["nom"]) == stationNameNormalized) {
            currentMetro[station]["coords"] = stationWithCoords["geo_point_2d"];
            found = true;
            break;
        } 
        
        if (!found){
            currentMetro[station]["coords"] = {};
        }
    }

}

saveToFile(currentMetro, 2);
console.log("Written to file");

