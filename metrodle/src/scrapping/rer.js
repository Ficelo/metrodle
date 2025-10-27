import puppeteer from "puppeteer";
import fs, { stat } from "fs";

const wikiLink = "https://fr.wikipedia.org/wiki/Liste_des_gares_du_RER_d%27%C3%8Ele-de-France";

function normalizeName(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "")
    .replace(/-/g, "");
}

export async function getAllRERStations() {

    let RERStations = {};

    const browser = await puppeteer.launch({
        headless: true,
    });

    const page = await browser.newPage();

    await page.goto(wikiLink, {waitUntil: 'domcontentloaded'});
    await page.setViewport({width: 1080, height: 1024});

    await page.waitForSelector('.wikitable', {timeout: 10000});

    const tableRows = "tbody tr";
    const rowCount = await page.$$eval(tableRows, (e) => e.length);
    
    if (rowCount == 0) {
        await browser.close();
        console.error(`No elements found with locator ${tableRows}`);
    }

    let stations = [];

    for (let i = 0; i < rowCount; i++) {
    const station = await page.$$eval(
        `${tableRows}:nth-child(${i + 1}) td`,
        (tds) => {
        return tds.map((td, index) => {
            const span = td.querySelector("span[data-sort-value]");
            const value = span
            ? span.getAttribute("data-sort-value").replace(" !", "")
            : td.innerText.trim();

            // If this is the first column, also capture the link (if any)
            if (index === 0) {
            const link = td.querySelector("a");
            if (link) {
                return {
                text: value,
                link: link.href
                };
            }
            }

            return value;
        });
        }
    );

    stations.push(station);
    }


    for(let station of stations) {
        if(station != [] && station[0] != undefined) {
            RERStations[station[0].text.toLowerCase()] = {
                "name" : station[0].text,
                "url" : station[0].link,
                "line" : station[1],
                "zone" : station[3],
                "situation" : station[4],
                "ville" : station[5],
                "correspondance" : station[6],
                "coords" : {},
                "date" : ""
            }
        }
    }

    for( let station of Object.keys(RERStations)) {

        try {
            await page.goto(RERStations[station].url, {waitUntil: 'domcontentloaded'});
            const dates = await page.$$eval(".date-lien", (links) => links.map((link) => {
                return link.getAttribute("data-sort-value");
            }));
            RERStations[station].date = dates[0];
        } catch (err) {
            console.log(`Problème avec ${station} : ${err}`)
        }

        
    }

    const emplacementsIdf = JSON.parse(fs.readFileSync("../assets/emplacement-des-gares-idf.json"));

    // Precompute normalized station name lookup
    const normalizedStations = Object.fromEntries(
    Object.keys(RERStations).map(key => [normalizeName(key), key])
    );

    for (let gare of emplacementsIdf) {
    if (gare["res_com"]?.toUpperCase().includes("RER")) {
        const nomKey = normalizeName(gare["nom_gares"]);

        const matchKey = normalizedStations[nomKey];
            if (matchKey) {
                RERStations[matchKey].coords = gare["geo_point_2d"];
            }   
        }
    }

        await browser.close();

        return RERStations;

    }

function saveToFile(data, version=1) {
    const dataS = JSON.stringify(data);
    fs.writeFile(`../data/rer-stations-v${version}.json`, dataS, "utf8", (err) => {
        if (err) {
            console.error("Error while writing file : ", err);
        } else {
            console.log("Stations written to file.")
        }
    });

}


const stations = await getAllRERStations();
//console.log(stations);
saveToFile(stations, 3);