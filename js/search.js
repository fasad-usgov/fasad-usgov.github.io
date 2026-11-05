/**
 * History of Intervention - Offline Search Engine
 * Sub-10ms client-side full-text search against the pre-compiled inverted index.
 */

import { App } from './app.js';

export const Search = {
  index: [],
  isLoaded: false,
  loadPromise: null,

  async init(indexPath = 'data/indices/search-index.json') {
    if (this.isLoaded) return;
    if (this.loadPromise) return this.loadPromise;

    this.loadPromise = (async () => {
      try {
        const data = await App.fetchJSON(indexPath);
        if (data && Array.isArray(data)) {
          this.index = data;
          this.isLoaded = true;
        }
      } catch (err) {
        console.error('Failed to load search index:', err);
      }
    })();
    return this.loadPromise;
  },

  tokenize(text) {
    if (!text) return [];
    return text.toLowerCase()
      .split(/[^a-zA-Z0-9]+/)
      .filter(w => w.length >= 2);
  },

  query(searchTerm, filterType = 'all') {
    if (!this.isLoaded || !searchTerm || searchTerm.trim().length === 0) {
      return [];
    }

    const queryTokens = this.tokenize(searchTerm);
    if (queryTokens.length === 0) return [];

    const results = [];

    for (const item of this.index) {
      if (filterType !== 'all' && item.type !== filterType) {
        continue;
      }

      let score = 0;
      const titleLower = item.title.toLowerCase();
      const tokens = item.tokens || [];

      // Check title direct match or contains
      for (const qt of queryTokens) {
        if (titleLower.includes(qt)) {
          score += 10;
        }
        // Check tokens
        const matched = tokens.some(t => t.startsWith(qt) || t.includes(qt));
        if (matched) {
          score += 3;
        }
      }

      if (score > 0) {
        results.push({
          item,
          score
        });
      }
    }

    // Sort by descending relevance score
    results.sort((a, b) => b.score - a.score);
    return results.map(r => r.item);
  },

  highlightMatches(text, queryTokens) {
    if (!text) return '';
    let escaped = App.escapeHTML(text);
    queryTokens.forEach(qt => {
      if (qt.length < 2) return;
      const regex = new RegExp(`(${qt})`, 'gi');
      escaped = escaped.replace(regex, '<mark style="background-color: var(--callout-bg); color: var(--text-accent); font-weight: bold; padding: 0 2px;">$1</mark>');
    });
    return escaped;
  },

  getItemUrl(item, basePath = './') {
    switch (item.type) {
      case 'event':
        return `${basePath}events/?id=${item.id}`;
      case 'company':
        return `${basePath}companies/?id=${item.id}`;
      case 'country':
        return `${basePath}countries/?id=${item.id}`;
      case 'source':
        return `${basePath}sources/?id=${item.id}`;
      default:
        return '#';
    }
  },

  renderSearchResults(results, containerEl, queryTokens = [], basePath = './') {
    if (!containerEl) return;

    if (results.length === 0) {
      containerEl.innerHTML = `
        <div class="callout" style="text-align: center; margin-top: 2rem;">
          <h4>No matching historical records found</h4>
          <p>Try searching for a different country, leader, corporation, operation, or historical decade.</p>
        </div>
      `;
      return;
    }

    const html = results.map(item => {
      const url = this.getItemUrl(item, basePath);
      const highlightedTitle = this.highlightMatches(item.title, queryTokens);
      const highlightedSnippet = this.highlightMatches(item.snippet, queryTokens);
      const typeLabel = item.type.toUpperCase();

      return `
        <article class="card mb-3" style="border-left: 4px solid var(--border-medium);">
          <div class="card-meta">
            <span class="badge ${item.type === 'event' ? 'badge-accent' : ''}">${typeLabel}</span>
            ${item.date ? `<span><strong>Date / Era:</strong> ${App.escapeHTML(item.date)}</span>` : ''}
            ${item.region ? `<span><strong>Region / Location:</strong> ${App.escapeHTML(item.region)}</span>` : ''}
          </div>
          <h3 class="card-title" style="margin-top: 0.2rem;">
            <a href="${url}" style="text-decoration: none;">${highlightedTitle}</a>
          </h3>
          <p class="card-body mb-2">${highlightedSnippet}</p>
          <div>
            <a href="${url}" class="btn btn-sm">Read Documentation &rarr;</a>
          </div>
        </article>
      `;
    }).join('');

    containerEl.innerHTML = `
      <p style="font-family: var(--font-sans); font-size: var(--font-size-xs); color: var(--text-muted); margin-bottom: 1.25rem;">
        Showing <strong>${results.length}</strong> verified historical record(s)
      </p>
      ${html}
    `;
  }
};
