# Contributing to History of Intervention

Thank you for your interest in contributing to the **History of Intervention** archive. 

This project is dedicated to producing an accurate, non-commercial, verifiable historical reference work. To maintain academic and legal integrity, all contributions must adhere to the standards outlined below.

---

### Core Editorial Standards

1. **Strict Institutional & Policy Focus**:
   - Focus on decisions, orders, military deployments, intelligence operations, and corporate relationships.
   - Never ascribe collective guilt or moral responsibility to any nationality, ethnic group, or religious community.

2. **Verifiable Sources Required**:
   - Every historical claim must be anchored to a documented citation in `data/sources/*.json`.
   - Acceptable source categories:
     - Declassified government archives (e.g. FRUS, FOIA releases).
     - Official commission of inquiry reports (e.g. Church Committee, Kahan Commission, Chilcot Report).
     - Peer-reviewed academic press scholarship (e.g. Oxford, Cambridge, Columbia, Harvard).
     - Authenticated international court rulings (ICJ, ICC).
   - Unverified blogs, partisan propaganda, or uncited editorial claims will be rejected.

3. **Distinguish Facts from Disputed Interpretations**:
   - Clearly delineate established events from contested allegations or differing historiographical interpretations.

---

### Workflow for Adding New Historical Records

#### 1. Adding a New Historical Event
1. Create a new JSON file under `data/events/<event-id>.json`.
2. Follow `schemas/event.schema.json` strictly.
3. Ensure all cited `sources`, `corporate_involvement`, and `related_events` correspond to valid files in their respective folders.

#### 2. Adding a Corporate Accountability Record
1. Create a new JSON file under `data/companies/<company-id>.json`.
2. Follow `schemas/company.schema.json`.
3. Provide concrete evidence of direct contracts, concession agreements, or operational roles.

#### 3. Running Data Validation
Before submitting your changes, run the automated validation test suite:

```bash
python3 scripts/validate_data.py
```

Ensure the output confirms:
```text
✅ All datasets validated successfully! Schema and relational integrity 100% sound.
```

#### 4. Rebuilding Search Indices
After verifying integrity, rebuild the search index and catalog manifest:

```bash
python3 scripts/build_search_index.py
```

Commit the updated JSON files alongside any newly compiled index assets.
