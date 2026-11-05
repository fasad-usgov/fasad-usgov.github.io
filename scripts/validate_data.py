#!/usr/bin/env python3
"""
History of Intervention - Data Integrity & Relational Validator
Validates schema conformance and verifies all relational foreign keys across JSON datasets.
"""

import os
import sys
import json
import re

DATA_DIR = os.path.join(os.path.dirname(__file__), '..', 'data')

def load_json_files(subfolder):
    folder_path = os.path.join(DATA_DIR, subfolder)
    items = {}
    if not os.path.isdir(folder_path):
        return items
    for fname in os.listdir(folder_path):
        if fname.endswith('.json') and not fname.startswith('.'):
            fpath = os.path.join(folder_path, fname)
            try:
                with open(fpath, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    item_id = data.get('id') or fname.replace('.json', '')
                    items[item_id] = (fpath, data)
            except Exception as e:
                print(f"❌ Error parsing JSON in {fpath}: {e}")
                sys.exit(1)
    return items

def validate_all():
    errors = []
    
    events = load_json_files('events')
    companies = load_json_files('companies')
    countries = load_json_files('countries')
    sources = load_json_files('sources')
    
    print(f"🔍 Validating Dataset:")
    print(f"   • Events: {len(events)}")
    print(f"   • Companies: {len(companies)}")
    print(f"   • Countries: {len(countries)}")
    print(f"   • Sources: {len(sources)}")
    print("-" * 50)

    # 1. Validate Events
    required_event_fields = [
        "id", "title", "date_start", "date_end", "era", "region",
        "countries", "topics", "summary", "background", "chronology",
        "actors", "documented_consequences", "disputed_aspects",
        "corporate_involvement", "related_events", "sources", "last_updated"
    ]
    
    for event_id, (fpath, event) in events.items():
        for req in required_event_fields:
            if req not in event:
                errors.append(f"Event '{event_id}' missing required field: '{req}'")
        
        # Check date formats
        for date_key in ["date_start", "date_end"]:
            val = event.get(date_key, "")
            if val and not re.match(r"^\d{4}(-\d{2}(-\d{2})?)?$", val):
                errors.append(f"Event '{event_id}' invalid date format for '{date_key}': '{val}'")

        # Check chronology items
        for idx, step in enumerate(event.get("chronology", [])):
            if not isinstance(step, dict) or not all(k in step for k in ["date", "headline", "detail"]):
                errors.append(f"Event '{event_id}' chronology item {idx} missing date, headline, or detail")

        # Check relational foreign keys
        for src in event.get("sources", []):
            if src not in sources:
                errors.append(f"Event '{event_id}' references unknown source '{src}'")

        for corp in event.get("corporate_involvement", []):
            if corp not in companies:
                errors.append(f"Event '{event_id}' references unknown company '{corp}'")

        for rel in event.get("related_events", []):
            if rel not in events:
                errors.append(f"Event '{event_id}' references unknown related_event '{rel}'")

    # 2. Validate Companies
    required_company_fields = [
        "id", "name", "historical_names", "headquarters", "industry",
        "active_period", "operational_role", "government_liaisons",
        "documented_activities", "documented_consequences", "associated_events", "sources"
    ]
    for comp_id, (fpath, comp) in companies.items():
        for req in required_company_fields:
            if req not in comp:
                errors.append(f"Company '{comp_id}' missing required field: '{req}'")
        for ev in comp.get("associated_events", []):
            if ev not in events:
                errors.append(f"Company '{comp_id}' references unknown associated_event '{ev}'")
        for src in comp.get("sources", []):
            if src not in sources:
                errors.append(f"Company '{comp_id}' references unknown source '{src}'")

    # 3. Validate Countries
    required_country_fields = [
        "id", "name", "region", "summary", "historical_context",
        "key_operations", "primary_institutions_involved", "corporate_presence"
    ]
    for ctry_id, (fpath, ctry) in countries.items():
        for req in required_country_fields:
            if req not in ctry:
                errors.append(f"Country '{ctry_id}' missing required field: '{req}'")
        for op in ctry.get("key_operations", []):
            if op not in events:
                errors.append(f"Country '{ctry_id}' references unknown key_operation '{op}'")

    # 4. Validate Sources
    required_source_fields = [
        "id", "title", "authors", "year", "type", "publisher_or_archive",
        "summary", "url", "cited_in"
    ]
    for src_id, (fpath, src) in sources.items():
        for req in required_source_fields:
            if req not in src:
                errors.append(f"Source '{src_id}' missing required field: '{req}'")
        for ev in src.get("cited_in", []):
            if ev not in events:
                errors.append(f"Source '{src_id}' references unknown cited_in event '{ev}'")

    if errors:
        print(f"❌ Validation FAILED with {len(errors)} error(s):")
        for err in errors:
            print(f"  • {err}")
        sys.exit(1)
    else:
        print("✅ All datasets validated successfully! Schema and relational integrity 100% sound.")
        sys.exit(0)

if __name__ == '__main__':
    validate_all()
