# Project Roadmap & Implementation Tasks (TODO)

## Milestone 1: Foundation & Shell
- [x] Establish repository structure and directories.
- [x] Implement `css/main.css` design system (typography, dark/sepia/light modes).
- [x] Implement `css/layout.css` responsive layout, timeline axis, and article split-pane.
- [x] Implement `css/print.css` clean academic printing stylesheet.
- [x] Build core application engine in `js/app.js` and storage in `js/storage.js`.
- [x] Create foundational HTML pages (`index.html`, `timeline.html`, `regions.html`, `about.html`, `search.html`, `offline.html`, `404.html`).

## Milestone 2: Data Schemas & Reference Pilot Events
- [x] Author formal JSON schemas in `schemas/` (`event`, `company`, `country`, `source`).
- [x] Implement Python validation test script (`scripts/validate_data.py`).
- [x] Author pilot event 1: 1953 Iranian Coup (`iran-coup-1953`).
- [x] Author pilot event 2: 1982 Sabra and Shatila Massacre (`sabra-shatila-1982`).
- [x] Author pilot event 3: 2003 Invasion of Iraq (`iraq-invasion-2003`).
- [x] Author initial corporate dossiers (AIOC/BP, Halliburton/KBR, Lockheed Martin).
- [x] Author initial country dossiers (Iran, Iraq, Lebanon, Israel, Palestine, United States).
- [x] Author initial verified sources and official commission reports.

## Milestone 3: Dynamic Reader Engine & Interactive Timeline
- [x] Dynamic article reader in `events/index.html` with URL parameter parsing (`?id=...`).
- [x] Interactive chronology narrative, consequence cards, and verified source citations.
- [x] Chronological timeline engine in `js/timeline.js` with multi-attribute filtering.
- [x] Local bookmarking and reading history persistence.

## Milestone 4: High-Performance Offline Search Engine
- [x] Build-time indexing compiler in `scripts/build_search_index.py`.
- [x] Pre-compiled inverted token index (`data/indices/search-index.json`).
- [x] Client-side sub-10ms search query module in `js/search.js` with highlight rendering.

## Milestone 5: Corporate Accountability & Regional Dossiers
- [x] Corporate dossier reader in `companies/index.html`.
- [x] Country dossier reader in `countries/index.html`.
- [x] Regional index in `regions.html`.
- [x] Research library reader in `sources/index.html`.

## Milestone 6: Phase A & B Historical Content Expansion
### Phase A: Early Cold War and Middle East
- [ ] 1948 Arab-Israeli War and Palestinian displacement (Nakba).
- [x] 1953 Iranian Coup (Operation Ajax).
- [ ] 1956 Suez Crisis (Tripartite Aggression).
- [ ] 1967 Arab-Israeli War (Six-Day War).
- [ ] 1973 Arab-Israeli War (Yom Kippur / October War).
- [ ] 1978–1979 Camp David Accords.
- [ ] 1979 Iranian Revolution and diplomatic aftermath.
- [ ] 1980–1988 Iran-Iraq War and Western intelligence/economic support.
- [ ] 1982 Israeli Invasion of Lebanon.
- [x] 1982 Sabra and Shatila Massacre.
- [ ] 1990–1991 Gulf War (Operation Desert Storm).

### Phase B: Post-Cold War and War on Terror
- [ ] 1991 Gulf War aftermath and no-fly zones.
- [ ] 1990s Iraq economic sanctions regime.
- [ ] 2001 Invasion of Afghanistan.
- [x] 2003 Invasion of Iraq.
- [ ] 2003–2011 Occupation of Iraq and sectarian conflict.
- [ ] 2006 Lebanon War.
- [ ] 2008–2009 Gaza War (Operation Cast Lead).
- [ ] 2011 NATO Intervention in Libya.
- [ ] 2011 Syrian Uprising and international intervention.
- [ ] 2015 Saudi-led Yemen Campaign and US military backing.
- [ ] 2018–2020 US-Iran Escalation and drone strikes.
- [ ] 2023 Gaza War and regional hostilities.

## Milestone 7: PWA Hardening & Publication
- [x] Implement Web App Manifest (`manifest.webmanifest`).
- [x] Implement Service Worker with Cache-First & Stale-While-Revalidate caching.
- [x] Generate SVG icons (192px and 512px).
- [ ] Run automated Lighthouse accessibility and performance audits.
- [ ] Set up GitHub Actions CI workflow for data validation on commit.
