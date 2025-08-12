import json
import pandas as pd
from thefuzz import process
from datetime import datetime

# File paths
json_file = "infos-stations-v1.json"
csv_file = "paris_metro_stations.csv"
output_file = "infos-stations-v2.json"

# Load JSON
with open(json_file, "r", encoding="utf-8") as f:
    stations = json.load(f)

# Load CSV
df = pd.read_csv(csv_file)

# Print actual column names (debug step)
print("CSV columns:", df.columns.tolist())

# Try to guess correct columns
station_col = next((c for c in df.columns if "station" in c.lower()), None)
opened_col = next((c for c in df.columns if "open" in c.lower()), None)

if not station_col or not opened_col:
    raise ValueError("Could not find station or opening date columns in CSV.")

# Remove duplicates and NaN, keeping first occurrence
df = df.dropna(subset=[opened_col])
df = df.drop_duplicates(subset=[station_col])

# Function to clean and format date
def format_date(date_str):
    try:
        date_obj = datetime.strptime(str(date_str).strip(), "%Y-%m-%d")
    except ValueError:
        try:
            date_obj = datetime.strptime(str(date_str).strip(), "%d %B %Y")
        except ValueError:
            try:
                date_obj = datetime.strptime(str(date_str).strip(), "%d %b %Y")
            except ValueError:
                return None
    return date_obj.strftime("%d-%m-%Y")

# Build dictionary from CSV with formatted dates
csv_data = {}
for station_name, date_value in zip(df[station_col], df[opened_col]):
    formatted = format_date(date_value)
    if formatted:
        csv_data[station_name] = formatted

# Fuzzy match and merge
for key, data in stations.items():
    json_name = data["name"]

    # Find best match from CSV
    best_match, score = process.extractOne(json_name, csv_data.keys())

    if score >= 80:
        data["opening_date"] = csv_data[best_match]
        print(f"Matched: {json_name} → {best_match} ({score}%) — {csv_data[best_match]}")
    else:
        print(f"⚠ No good match found for: {json_name}")

# Save updated JSON
with open(output_file, "w", encoding="utf-8") as f:
    json.dump(stations, f, ensure_ascii=False, indent=2)

print(f"\nMerged data saved to {output_file}")
