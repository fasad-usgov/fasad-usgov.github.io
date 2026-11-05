/**
 * History of Intervention - Timeline Engine
 * Interactive chronological timeline renderer with real-time multi-dimensional filtering.
 */

import { App } from './app.js';
import { Filters } from './filters.js';

export const Timeline = {
  events: [],
  containerEl: null,
  filtersEl: null,
  activeFilters: {
    decade: 'all',
    region: 'all',
    country: 'all',
    topic: 'all'
  },

  async init(containerId, filtersId, catalogPath = 'data/indices/catalog.json') {
    this.containerEl = document.getElementById(containerId);
    this.filtersEl = document.getElementById(filtersId);

    if (!this.containerEl) return;

    try {
      const catalog = await App.fetchJSON(catalogPath);
      if (catalog && catalog.events) {
        // Sort chronologically ascending
        this.events = catalog.events.sort((a, b) => (a.date_start || '').localeCompare(b.date_start || ''));
        this.renderFilters();
        this.renderTimeline();
      }
    } catch (err) {
      console.error('Failed to initialize timeline:', err);
      this.containerEl.innerHTML = `<p class="callout">Error loading historical timeline data.</p>`;
    }
  },

  renderFilters() {
    if (!this.filtersEl) return;

    const decades = Filters.extractUniqueDecades(this.events);
    const regions = Filters.extractUniqueRegions(this.events);
    const topics = Filters.extractUniqueTopics(this.events);

    this.filtersEl.innerHTML = `
      <div style="background-color: var(--bg-card); border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 2rem;">
        <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: flex-end;">
          <div style="flex: 1; min-width: 140px;">
            <label style="display: block; font-family: var(--font-sans); font-size: var(--font-size-xs); font-weight: 600; margin-bottom: 0.35rem;">Decade</label>
            <select id="timeline-filter-decade">
              <option value="all">All Decades (1945–Present)</option>
              ${decades.map(d => `<option value="${d}">${d}</option>`).join('')}
            </select>
          </div>

          <div style="flex: 1; min-width: 140px;">
            <label style="display: block; font-family: var(--font-sans); font-size: var(--font-size-xs); font-weight: 600; margin-bottom: 0.35rem;">Region</label>
            <select id="timeline-filter-region">
              <option value="all">All Regions</option>
              ${regions.map(r => `<option value="${r}">${r}</option>`).join('')}
            </select>
          </div>

          <div style="flex: 1; min-width: 160px;">
            <label style="display: block; font-family: var(--font-sans); font-size: var(--font-size-xs); font-weight: 600; margin-bottom: 0.35rem;">Topic</label>
            <select id="timeline-filter-topic">
              <option value="all">All Topics</option>
              ${topics.map(t => `<option value="${t}">${t}</option>`).join('')}
            </select>
          </div>

          <div>
            <button id="timeline-filter-reset" class="btn btn-sm" type="button">Reset Filters</button>
          </div>
        </div>
      </div>
    `;

    // Bind event listeners
    const decadeSelect = document.getElementById('timeline-filter-decade');
    const regionSelect = document.getElementById('timeline-filter-region');
    const topicSelect = document.getElementById('timeline-filter-topic');
    const resetBtn = document.getElementById('timeline-filter-reset');

    decadeSelect.addEventListener('change', (e) => {
      this.activeFilters.decade = e.target.value;
      this.renderTimeline();
    });

    regionSelect.addEventListener('change', (e) => {
      this.activeFilters.region = e.target.value;
      this.renderTimeline();
    });

    topicSelect.addEventListener('change', (e) => {
      this.activeFilters.topic = e.target.value;
      this.renderTimeline();
    });

    resetBtn.addEventListener('click', () => {
      this.activeFilters = { decade: 'all', region: 'all', country: 'all', topic: 'all' };
      decadeSelect.value = 'all';
      regionSelect.value = 'all';
      topicSelect.value = 'all';
      this.renderTimeline();
    });
  },

  renderTimeline() {
    if (!this.containerEl) return;

    const filtered = Filters.filterEvents(this.events, this.activeFilters);

    if (filtered.length === 0) {
      this.containerEl.innerHTML = `
        <div class="callout" style="text-align: center; margin: 3rem 0;">
          <h4>No historical events match the selected criteria</h4>
          <p>Please adjust or reset the timeline filters above to view other periods.</p>
        </div>
      `;
      return;
    }

    let currentYear = null;
    let html = `
      <div style="font-family: var(--font-sans); font-size: var(--font-size-xs); color: var(--text-muted); margin-bottom: 1.5rem;">
        Displaying <strong>${filtered.length}</strong> historical intervention(s) in chronological sequence.
      </div>
      <div class="timeline-container">
        <div class="timeline-axis"></div>
    `;

    filtered.forEach(event => {
      const year = (event.date_start || '').substring(0, 4);

      if (year !== currentYear) {
        currentYear = year;
        html += `<div class="timeline-year-marker">${App.escapeHTML(year)}</div>`;
      }

      const formattedDate = App.formatDate(event.date_start);
      const url = `${App.basePath}events/?id=${event.id}`;
      const topicBadges = (event.topics || []).slice(0, 3).map(t => `<span class="badge">${App.escapeHTML(t)}</span>`).join(' ');

      html += `
        <div class="timeline-entry">
          <div class="timeline-dot"></div>
          <article class="card" style="border-left: 3px solid var(--text-accent);">
            <div class="card-meta">
              <span><strong>Date:</strong> ${formattedDate}</span>
              <span><strong>Region:</strong> ${App.escapeHTML(event.region)}</span>
              <span><strong>Country:</strong> ${App.escapeHTML((event.countries || []).join(', '))}</span>
            </div>
            <h3 class="card-title">
              <a href="${url}" style="text-decoration: none;">${App.escapeHTML(event.title)}</a>
            </h3>
            <p class="card-body mb-2">${App.escapeHTML(event.summary)}</p>
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
              <div style="display: flex; gap: 0.35rem; flex-wrap: wrap;">
                ${topicBadges}
              </div>
              <a href="${url}" class="btn btn-sm">Read Full Event &rarr;</a>
            </div>
          </article>
        </div>
      `;
    });

    html += `</div>`;
    this.containerEl.innerHTML = html;
  }
};
