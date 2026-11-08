#!/usr/bin/env python3
"""Analyze Pacific Grove property listings and build a structured Sentinel Knowledge Base."""

import csv
import json
import re
from pathlib import Path
from statistics import mean, median

ROOT = Path(__file__).resolve().parent.parent
CSV_PATH = ROOT / "assets" / "data" / "pacific_grove_listings.csv"
OUTPUT_JSON = ROOT / "assets" / "data" / "sentinel_knowledge_base.json"


def clean_int(val, default=0):
    if not val:
        return default
    try:
        return int(float(val))
    except (ValueError, TypeError):
        return default


def clean_float(val, default=0.0):
    if not val:
        return default
    try:
        return float(val)
    except (ValueError, TypeError):
        return default


def extract_license(row):
    lic = (row.get("license") or "").strip()
    if lic:
        return lic
    name = row.get("name", "")
    m = re.search(r"(?:Lic\.?|License|PG\s*Lic(?:ense)?)\s*#?\s*([0-9]{3,5})", name, re.IGNORECASE)
    if m:
        return f"PG License #{m.group(1)}"
    return ""


def categorize_tags(row):
    tags = []
    name = row.get("name", "").lower()
    rt = row.get("room_type", "")
    price = clean_float(row.get("price"))
    min_nights = clean_int(row.get("minimum_nights"))

    if min_nights >= 28:
        tags.append("30-Day Flexible Tenancy")
    else:
        tags.append("Short-Term Vacation")

    if "ocean" in name or "beach" in name or "sea" in name or "waves" in name:
        tags.append("Coastal / Ocean View")
    if "lovers point" in name or "lover's point" in name:
        tags.append("Lovers Point")
    if "asilomar" in name:
        tags.append("Asilomar Corridor")
    if "cannery" in name or "aquarium" in name:
        tags.append("Aquarium & Cannery Row")
    if "downtown" in name or "town" in name:
        tags.append("Downtown Core")
    if "victorian" in name or "historic" in name or "tudor" in name:
        tags.append("Heritage / Victorian Architecture")
    if "pet" in name or "dog" in name:
        tags.append("Pet-Friendly")
    if "hot tub" in name or "sauna" in name:
        tags.append("Wellness & Spa")
    if price >= 900:
        tags.append("Luxury Estate")
    elif price <= 200 and price > 0:
        tags.append("Budget / Value Tier")

    return tags


def main():
    if not CSV_PATH.exists():
        print(f"Error: {CSV_PATH} not found.")
        return

    with open(CSV_PATH, mode="r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        rows = list(reader)

    print(f"Loaded {len(rows)} rows from {CSV_PATH.name}")

    properties = []
    prices = []
    min_nights_list = []
    hosts_dict = {}
    room_types_dict = {}

    for r in rows:
        prop_id = r.get("id", "").strip()
        name = r.get("name", "").strip()
        host_name = r.get("host_name", "").strip() or "Verified Host"
        price = clean_float(r.get("price"))
        min_nights = clean_int(r.get("minimum_nights"), default=1)
        reviews = clean_int(r.get("number_of_reviews"), default=0)
        reviews_per_month = clean_float(r.get("reviews_per_month"), default=0.0)
        availability = clean_int(r.get("availability_365"), default=0)
        room_type = r.get("room_type", "Entire home/apt").strip()
        lat = clean_float(r.get("latitude"))
        lng = clean_float(r.get("longitude"))
        license_str = extract_license(r)
        tags = categorize_tags(r)

        if price > 0:
            prices.append(price)
        min_nights_list.append(min_nights)
        hosts_dict[host_name] = hosts_dict.get(host_name, 0) + 1
        room_types_dict[room_type] = room_types_dict.get(room_type, 0) + 1

        prop_record = {
            "id": prop_id,
            "name": name,
            "host": host_name,
            "host_id": r.get("host_id", ""),
            "room_type": room_type,
            "price_usd": price,
            "monthly_est_usd": int(price * 30) if price > 0 else None,
            "minimum_nights": min_nights,
            "reviews": reviews,
            "reviews_per_month": reviews_per_month,
            "availability_365": availability,
            "occupancy_rate_est": f"{round((365 - availability) / 365 * 100, 1)}%" if availability <= 365 else "N/A",
            "license": license_str,
            "coordinates": {"lat": lat, "lng": lng},
            "tags": tags,
        }
        properties.append(prop_record)

    # Compute macro analytics
    thirty_day_plus = [p for p in properties if p["minimum_nights"] >= 28]
    short_term = [p for p in properties if p["minimum_nights"] < 28]
    luxury = [p for p in properties if (p["price_usd"] or 0) >= 900]
    oceanfront = [p for p in properties if "Coastal / Ocean View" in p["tags"]]

    summary = {
        "market": "Pacific Grove & Monterey Peninsula, CA",
        "total_properties": len(properties),
        "total_hosts": len(hosts_dict),
        "pricing": {
            "currency": "USD",
            "median_nightly": round(median(prices), 2) if prices else 0,
            "mean_nightly": round(mean(prices), 2) if prices else 0,
            "min_nightly": round(min(prices), 2) if prices else 0,
            "max_nightly": round(max(prices), 2) if prices else 0,
            "avg_monthly_midterm": round(mean([p["price_usd"] * 30 for p in thirty_day_plus if p["price_usd"]]), 2) if thirty_day_plus else 0,
        },
        "regulatory_str_split": {
            "thirty_day_plus_flexible": len(thirty_day_plus),
            "short_term_str": len(short_term),
            "str_compliance_ratio": f"{round(len(thirty_day_plus) / len(properties) * 100, 1)}% 30-day covenant compliance"
        },
        "room_type_distribution": room_types_dict,
        "key_operators": sorted(
            [{"host": k, "listings_count": v} for k, v in hosts_dict.items()],
            key=lambda x: x["listings_count"],
            reverse=True
        )[:10],
        "submarket_clusters": {
            "lovers_point": len([p for p in properties if "Lovers Point" in p["tags"]]),
            "asilomar": len([p for p in properties if "Asilomar Corridor" in p["tags"]]),
            "cannery_aquarium": len([p for p in properties if "Aquarium & Cannery Row" in p["tags"]]),
            "downtown": len([p for p in properties if "Downtown Core" in p["tags"]]),
            "coastal_ocean_view": len(oceanfront),
            "luxury_estates": len(luxury),
        }
    }

    knowledge_base = {
        "metadata": {
            "version": "2.0.0",
            "generator": "THATJOINT Autonomous Property Intelligence Engine",
            "dataset": "Pacific Grove Municipal Listing Inventory",
            "record_count": len(properties),
        },
        "summary": summary,
        "properties": properties,
    }

    OUTPUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
        json.dump(knowledge_base, f, indent=2)

    print(f"Generated Knowledge Base JSON: {OUTPUT_JSON} ({OUTPUT_JSON.stat().st_size} bytes)")
    print(f"Summary: {json.dumps(summary, indent=2)}")


if __name__ == "__main__":
    main()
