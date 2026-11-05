#!/usr/bin/env python3
"""
History of Intervention - Search & Catalog Indexer
Compiles all entity records into a fast, pre-indexed JSON catalog for client-side offline querying.
"""

import os
import json
import re

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, 'data')
INDICES_DIR = os.path.join(DATA_DIR, 'indices')

def tokenize(text):
    if not text:
        return []
    words = re.findall(r'\b[a-zA-Z0-9]{2,}\b', text.lower())
    # Exclude trivial stopwords
    stopwords = {'the', 'and', 'for', 'with', 'that', 'this', 'from', 'was', 'were', 'had', 'been', 'about'}
    return [w for w in words if w not in stopwords]

def build_indices():
    os.makedirs(INDICES_DIR, exist_ok=True)

    events = []
    companies = []
    countries = []
    sources = []
    
    # 1. Read Events
    events_dir = os.path.join(DATA_DIR, 'events')
    if os.path.isdir(events_dir):
        for fname in sorted(os.listdir(events_dir)):
            if fname.endswith('.json') and not fname.startswith('.'):
                with open(os.path.join(events_dir, fname), 'r', encoding='utf-8') as f:
                    events.append(json.load(f))

    # 2. Read Companies
    companies_dir = os.path.join(DATA_DIR, 'companies')
    if os.path.isdir(companies_dir):
        for fname in sorted(os.listdir(companies_dir)):
            if fname.endswith('.json') and not fname.startswith('.'):
                with open(os.path.join(companies_dir, fname), 'r', encoding='utf-8') as f:
                    companies.append(json.load(f))

    # 3. Read Countries
    countries_dir = os.path.join(DATA_DIR, 'countries')
    if os.path.isdir(countries_dir):
        for fname in sorted(os.listdir(countries_dir)):
            if fname.endswith('.json') and not fname.startswith('.'):
                with open(os.path.join(countries_dir, fname), 'r', encoding='utf-8') as f:
                    countries.append(json.load(f))

    # 4. Read Sources
    sources_dir = os.path.join(DATA_DIR, 'sources')
    if os.path.isdir(sources_dir):
        for fname in sorted(os.listdir(sources_dir)):
            if fname.endswith('.json') and not fname.startswith('.'):
                with open(os.path.join(sources_dir, fname), 'r', encoding='utf-8') as f:
                    sources.append(json.load(f))

    # Compile Catalog Manifest
    catalog = {
        "version": "1.0.0",
        "generated_at": "2026-11-05",
        "counts": {
            "events": len(events),
            "companies": len(companies),
            "countries": len(countries),
            "sources": len(sources)
        },
        "events": [
            {
                "id": e["id"],
                "title": e["title"],
                "date_start": e["date_start"],
                "date_end": e["date_end"],
                "era": e.get("era", ""),
                "region": e["region"],
                "countries": e["countries"],
                "topics": e["topics"],
                "summary": e["summary"]
            } for e in events
        ],
        "companies": [
            {
                "id": c["id"],
                "name": c["name"],
                "industry": c["industry"],
                "headquarters": c["headquarters"],
                "operational_role": c["operational_role"]
            } for c in companies
        ],
        "countries": [
            {
                "id": c["id"],
                "name": c["name"],
                "region": c["region"],
                "summary": c["summary"]
            } for c in countries
        ],
        "sources": [
            {
                "id": s["id"],
                "title": s["title"],
                "authors": s["authors"],
                "year": s["year"],
                "type": s["type"]
            } for s in sources
        ]
    }

    catalog_path = os.path.join(INDICES_DIR, 'catalog.json')
    with open(catalog_path, 'w', encoding='utf-8') as f:
        json.dump(catalog, f, indent=2)
    print(f"✅ Generated catalog index at {catalog_path}")

    # Compile Inverted Search Index
    search_records = []
    for e in events:
        search_records.append({
            "id": e["id"],
            "type": "event",
            "title": e["title"],
            "date": e["date_start"],
            "region": e["region"],
            "snippet": e["summary"][:240] + ("..." if len(e["summary"]) > 240 else ""),
            "tokens": list(set(tokenize(e["title"] + " " + e["summary"] + " " + " ".join(e["topics"]) + " " + " ".join(e["countries"]))))
        })

    for c in companies:
        search_records.append({
            "id": c["id"],
            "type": "company",
            "title": c["name"],
            "date": c.get("active_period", ""),
            "region": c.get("headquarters", ""),
            "snippet": c["operational_role"][:240],
            "tokens": list(set(tokenize(c["name"] + " " + " ".join(c.get("historical_names", [])) + " " + c["industry"] + " " + c["documented_activities"])))
        })

    for ctry in countries:
        search_records.append({
            "id": ctry["id"],
            "type": "country",
            "title": ctry["name"],
            "date": "",
            "region": ctry["region"],
            "snippet": ctry["summary"][:240],
            "tokens": list(set(tokenize(ctry["name"] + " " + ctry["region"] + " " + ctry["summary"])))
        })

    for s in sources:
        search_records.append({
            "id": s["id"],
            "type": "source",
            "title": s["title"],
            "date": str(s.get("year", "")),
            "region": s.get("type", ""),
            "snippet": s["summary"][:240],
            "tokens": list(set(tokenize(s["title"] + " " + " ".join(s.get("authors", [])) + " " + s["summary"])))
        })

    search_index_path = os.path.join(INDICES_DIR, 'search-index.json')
    with open(search_index_path, 'w', encoding='utf-8') as f:
        json.dump(search_records, f)
    print(f"✅ Generated inverted search index ({len(search_records)} entries) at {search_index_path}")

if __name__ == '__main__':
    build_indices()
