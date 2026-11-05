# History of Intervention
## Global History, Civilian Consequences, and Corporate Accountability

A free, public, offline-capable historical reference website documenting the foreign policy, military interventions, covert operations, civilian consequences, and corporate relationships of the United States and Israel from 1945 to the present.

---

### Project Mission & Editorial Direction

The **History of Intervention** is an educational, non-commercial digital reference work designed like an open digital history book.

- **Objective Factuality**: Distinguishes strictly between established historical events, documented government and corporate actions, allegations that remain disputed, historiographical debates, and unresolved historical questions.
- **Institutional Focus**: Focuses on the decisions, policies, command structures, and commercial contracts of state agencies, armed forces, and corporations.
- **Rejection of Collective Responsibility**: Strictly rejects portraying Americans, Israelis, Jews, Arabs, Muslims, or any population as collectively responsible for government, military, or corporate actions.
- **Verifiable Primary Documentation**: Built on declassified state archives, official inquiry commissions (e.g. Church Committee, Kahan Commission, Chilcot Report), academic press scholarship, and authenticated international legal rulings.

---

### Zero-Framework Architecture

The project adheres to a strict zero-dependency philosophy:
- **Languages**: Semantic HTML5, Vanilla CSS3 (Custom Properties & Grid/Flexbox), and Vanilla JavaScript (native ES Modules).
- **Frameworks**: 0% React, Vue, Next.js, Angular, or Tailwind CSS.
- **Backend**: 100% static hosting compatible with GitHub Pages.
- **Data Engine**: Relational JSON entities (`data/events/`, `data/companies/`, `data/countries/`, `data/sources/`).
- **Offline PWA**: Native `service-worker.js` with Cache-First static asset caching, Stale-While-Revalidate metadata fetching, and `manifest.webmanifest`.
- **Search**: Inverted client-side full-text search index operating in <10ms without external libraries.

---

### Repository Structure

```text
/
├── index.html                   # Archive homepage with mission & search
├── timeline.html                # Interactive chronological timeline
├── regions.html                 # Regional theaters index
├── countries.html               # Country dossiers index stub
├── companies.html               # Corporate accountability stub
├── sources.html                 # Research library stub
├── search.html                  # Offline full-text search engine
├── about.html                   # Methodology, standards, and contact
├── offline.html                 # Offline fallback page
├── 404.html                     # 404 handler with search suggestions
│
├── events/                      # Dynamic event reader & catalog
│   └── index.html
├── countries/                   # Dynamic country dossier reader
│   └── index.html
├── companies/                   # Dynamic corporate dossier reader
│   └── index.html
├── sources/                     # Dynamic source citation viewer
│   └── index.html
│
├── css/
│   ├── main.css                 # Design tokens, typography, dark/sepia/light modes
│   ├── layout.css               # Responsive grid, timeline axis, sticky sidebar
│   └── print.css                # Academic clean black & white printing
│
├── js/
│   ├── app.js                   # Application router, theme & offline banner
│   ├── storage.js               # Client localStorage bookmarks & history
│   ├── search.js                # Sub-10ms offline inverted search
│   ├── timeline.js              # Chronological visual timeline engine
│   └── filters.js               # Multi-dimensional filtering logic
│
├── data/
│   ├── events/                  # Historical event JSON records
│   ├── companies/               # Corporate accountability JSON records
│   ├── countries/               # Country dossier JSON records
│   ├── sources/                 # Bibliographic source JSON records
│   └── indices/
│       ├── catalog.json         # Pre-compiled catalog manifest
│       └── search-index.json    # Pre-compiled inverted token index
│
├── schemas/                     # JSON schema definitions
├── scripts/
│   ├── validate_data.py         # Relational integrity & schema test suite
│   └── build_search_index.py    # Search index and catalog compiler
├── manifest.webmanifest         # PWA installation manifest
└── service-worker.js            # PWA offline cache manager
```

---

### Local Development & Testing

Since Service Workers and ES Modules require an HTTP server, run Python's built-in server:

```bash
# 1. Start local static server
python3 -m http.server 9898

# 2. Open in your browser:
# http://localhost:9898
```

#### Running Data Validation & Rebuilding Indices

```bash
# Validate schema conformance and relational foreign keys
python3 scripts/validate_data.py

# Recompile the inverted search index and catalog manifest
python3 scripts/build_search_index.py
```

---

### License

- **Code & Design**: Distributed under the [MIT License](LICENSE).
- **Historical Texts & Summaries**: Licensed under [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/).
