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

## Milestone 5.5: The Oligarchic State & Algorithmic Hegemony
- [x] Author comprehensive analytical master page `oligarchy.html` (6 Levers of Control, Algorithmic Citadel, 1973 Castle Bank affair, Gilens-Page empirical study).
- [x] Author historical event dossier for 1973 Castle Bank & Operation Tradewinds (`castle-bank-tradewinds-1973.json`).
- [x] Author verified academic, journalistic, and documentary sources (Jeffrey Winters, Gilens & Page, Shoshana Zuboff, Human Rights Watch, Forbidden Stories, WSJ, Johnny Harris).
- [x] Integrate "Oligarchy State" into universal navigation across all site pages and footers.
- [x] Precache `oligarchy.html` in PWA service worker (`hoi-archive-v1.2.0`).

## Milestone 5.6: The US Military-Industrial Complex (The War Machine)
- [x] Author comprehensive analytical master page `military-industrial-complex.html` (Eisenhower's 1961 Farewell Address, Nye Committee "Merchants of Death", 4 Epochs of Military Capitalism, The Iron Triangle, F-35 Political Engineering across 45+ states, 7 Failed Pentagon Audits & Cost-Plus markups, Global Arms Proliferation & 30-year Maintenance Trap, The Military-Big Tech Complex).
- [x] Author verified historical, official, and academic sources (`source-johnny-harris-war-machine-2024.json`, `source-eisenhower-farewell-address-1961.json`, `source-nye-committee-report-1936.json`, `source-sipri-arms-transfers-2024.json`, `source-pogo-revolving-door-pentagon-2023.json`).
- [x] Interlink corporate defense contractor dossiers (Lockheed Martin, Boeing, RTX/Raytheon, General Dynamics, Northrop Grumman) and event records (Yemen, Gaza, Vietnam, Korea, Iraq).
- [x] Integrate "War Machine" into universal navigation across all site pages and footers.
- [x] Precache `military-industrial-complex.html` in PWA service worker (`hoi-archive-v1.3.0`).


## Milestone 6: Historical Content Expansion (Phases A–D)
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
- [x] 2011 NATO Intervention in Libya (Operation Unified Protector and fall of Gaddafi).
- [ ] 2011 Syrian Uprising and international intervention.
- [ ] 2015 Saudi-led Yemen Campaign and US military backing.
- [x] 2023–Present Gaza War and regional hostilities (including US/UK weapons pipeline, RAF surveillance flights, Big Tech cloud infrastructure [Google/AWS/Microsoft/Palantir], and AI targeting systems [Lavender/The Gospel]).

### Phase C: Global Covert Operations & Interventions
- [x] 1893 Overthrow of the Hawaiian Kingdom (Sanford Dole, sugar planter oligarchy, USS Boston Marines, and 1993 US Apology Resolution).
- [x] 1954 Guatemalan Coup (Operation PBSuccess & United Fruit Company).
- [x] 1960–1961 Congo Coup & Assassination of Patrice Lumumba (CIA, Shinkolobwe uranium, and Mobutu dictatorship).
- [x] 1963 South Vietnamese Coup & Assassination of Ngo Dinh Diem (Cable 243, CIA cash/support, and ARVN junta).
- [x] 1964 Brazilian Coup d'État (Operation Brother Sam, carrier strike group, and 21-year military dictatorship).
- [x] 1964–1975 Vietnam War & Indochina Bombings (chemical defoliation, ecocide, and civilian massacres).
- [x] 1965–1966 Indonesian Mass Killings (CIA kill lists and anti-communist extermination).
- [x] 1973 Chilean Coup (Operation FUBELT, overthrow of Allende, and Pinochet dictatorship).
- [x] 1989 US Invasion of Panama (Operation Just Cause, El Chorrillo leveling, UN GA condemnation, and OAS 2018 ruling).
- [x] 2002–Present Venezuela Interventions & Economic Warfare (coup attempts, oil embargo, and civilian excess mortality).

### Phase D: International Atrocity Crimes, Genocides, and State Terror (Wikipedia Reference Set)
- [ ] 1945 Atomic Bombings of Hiroshima and Nagasaki (civilian devastation, radiation consequences, and international legal/ethical historiography).
- [x] 1950–1953 Korean War Atrocities & Aerial Bombing (No Gun Ri refugee massacre, Bodo League executions under US operational oversight, and 85% urban destruction via napalm/high explosives).
- [ ] 1960–Present United States Embargo Against Cuba (six-decade unilateral economic blockade, food/medicine deprivation, and UN General Assembly condemnation under the Genocide Convention rubric).
- [x] 1968–1973 Expulsion of the Chagossians (joint UK-US forced depopulation of the Chagos Archipelago for the Diego Garcia military base; ICJ advisory opinion).
- [x] 1971 Bangladesh Genocide (complicity; Operation Searchlight, Nixon-Kissinger diplomatic/military support for Pakistan, Task Force 74, and the Blood Telegram).
- [x] 1975–1983 Operation Condor (transnational covert assassination, torture, and state-terror network across South America coordinated with US CIA telecommunications).
- [x] 1975–1999 East Timor Genocide (Indonesian invasion and occupation supported by US weapons, diplomatic shielding at the UN, and 100,000+ civilian deaths).
- [x] 1981–1983 Guatemalan Maya Genocide (scorched-earth Operation Sofía against indigenous Maya-Ixil communities under General Efraín Ríos Montt with US military assistance; 2013 domestic court genocide verdict).
- [ ] 1986–1989 Anfal Campaign against Iraqi Kurds (chemical warfare, Halabja attack, and Ba'athist extermination campaign during US-Iraq agricultural credit and intelligence-sharing partnership).
- [ ] 1987–1989 Isaaq Genocide in Somaliland (Siad Barre regime massacres and aerial bombardment of Hargeisa supported by US military aid and training).
- [ ] 2026 Minab School Attack (air/drone strike investigation in Minab, Hormozgan Province, Iran).

## Milestone 7: PWA Hardening & Publication
- [x] Implement Web App Manifest (`manifest.webmanifest`).
- [x] Implement Service Worker with Cache-First & Stale-While-Revalidate caching.
- [x] Generate SVG icons (192px and 512px).
- [ ] Run automated Lighthouse accessibility and performance audits.
- [ ] Set up GitHub Actions CI workflow for data validation on commit.
