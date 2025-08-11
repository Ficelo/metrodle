import json
import unicodedata
import re
from math import radians, sin, cos, sqrt, atan2

def normalize_name(name):
    name = ''.join(
        c for c in unicodedata.normalize('NFD', name)
        if unicodedata.category(c) != 'Mn'
    )
    name = re.sub(r"[-–]", " ", name)
    name = re.sub(r"\s+", " ", name).strip().lower()
    return name

def haversine(lat1, lon1, lat2, lon2):
    R = 6371000
    phi1, phi2 = radians(lat1), radians(lat2)
    dphi = radians(lat2 - lat1)
    dlambda = radians(lon2 - lon1)

    a = sin(dphi / 2)**2 + cos(phi1) * cos(phi2) * sin(dlambda / 2)**2
    return 2 * R * atan2(sqrt(a), sqrt(1 - a))

with open("./new.json") as f:
    newData = json.load(f)

with open("./arrets.json") as f:
    data = json.load(f)

STATIONS = {}
coords_map = {}

for station in data:
    if station["arrtype"] == "metro":
        key = normalize_name(station["arrname"])
        STATIONS[key] = {
            "name": station["arrname"],
            "type": station["arrtype"],
            "town": station["arrtown"],
            "accessibility": station["arraccessibility"],
            "audiblesignals": station["arraudiblesignals"]
        }
        coords_map[key] = (
            station["arrgeopoint"]["lat"],
            station["arrgeopoint"]["lon"]
        )

unmatched = []

for station in newData:
    key = normalize_name(station["nom"])

    if key in STATIONS:
        STATIONS[key]["lines"] = station["lignes"]
        continue

    lat = station["geo_point_2d"]["lat"]
    lon = station["geo_point_2d"]["lon"]

    found_key = None
    for k, (lat2, lon2) in coords_map.items():
        if haversine(lat, lon, lat2, lon2) < 50:
            found_key = k
            break

    if found_key:
        STATIONS[found_key]["lines"] = station["lignes"]
    else:
        unmatched.append(station["nom"])


with open("infos-stations.json", "w", encoding="utf-8") as f:
    json.dump(STATIONS, f, ensure_ascii=False, indent=2)

if unmatched:
    print("Unmatched stations:")
    for name in unmatched:
        print(f"  - {name}")
