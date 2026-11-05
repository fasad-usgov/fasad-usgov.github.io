/**
 * History of Intervention - Filter Utility Module
 * Handles multi-criteria filtering for historical events and records.
 */

export const Filters = {
  getDecade(dateStr) {
    if (!dateStr) return 'Unknown';
    const year = parseInt(dateStr.substring(0, 4), 10);
    if (isNaN(year)) return 'Unknown';
    return `${Math.floor(year / 10) * 10}s`;
  },

  filterEvents(events, criteria = {}) {
    return events.filter(event => {
      // Decade filter
      if (criteria.decade && criteria.decade !== 'all') {
        const decade = this.getDecade(event.date_start);
        if (decade !== criteria.decade) return false;
      }

      // Region filter
      if (criteria.region && criteria.region !== 'all') {
        if (event.region !== criteria.region) return false;
      }

      // Country filter
      if (criteria.country && criteria.country !== 'all') {
        if (!event.countries || !event.countries.includes(criteria.country)) return false;
      }

      // Topic filter
      if (criteria.topic && criteria.topic !== 'all') {
        if (!event.topics || !event.topics.includes(criteria.topic)) return false;
      }

      // Company filter
      if (criteria.company && criteria.company !== 'all') {
        if (!event.corporate_involvement || !event.corporate_involvement.includes(criteria.company)) return false;
      }

      return true;
    });
  },

  extractUniqueDecades(events) {
    const decades = new Set();
    events.forEach(e => {
      const d = this.getDecade(e.date_start);
      if (d !== 'Unknown') decades.add(d);
    });
    return Array.from(decades).sort();
  },

  extractUniqueRegions(events) {
    const regions = new Set();
    events.forEach(e => {
      if (e.region) regions.add(e.region);
    });
    return Array.from(regions).sort();
  },

  extractUniqueTopics(events) {
    const topics = new Set();
    events.forEach(e => {
      if (Array.isArray(e.topics)) {
        e.topics.forEach(t => topics.add(t));
      }
    });
    return Array.from(topics).sort();
  }
};
