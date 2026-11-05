/**
 * History of Intervention - Core Application Engine
 * Vanilla ES Module providing routing helpers, offline indicators, theme management,
 * and secure DOM rendering utilities.
 */

import { Storage } from './storage.js';

export const App = {
  version: '1.0.0',
  basePath: '',

  init() {
    this.detectBasePath();
    this.initTheme();
    this.initOfflineBanner();
    this.initServiceWorker();
    this.highlightActiveNav();
    this.initGlobalSearchShortcuts();
  },

  detectBasePath() {
    // Detect if running under GitHub Pages subpath (e.g. /US_IS/ or /history-of-intervention/)
    const path = window.location.pathname;
    if (path.includes('/events/') || path.includes('/countries/') || path.includes('/companies/') || path.includes('/sources/')) {
      this.basePath = '../';
    } else {
      this.basePath = './';
    }
  },

  initTheme() {
    const savedTheme = Storage.getTheme();
    document.documentElement.setAttribute('data-theme', savedTheme);

    const themeSelects = document.querySelectorAll('.theme-select');
    themeSelects.forEach(select => {
      select.value = savedTheme;
      select.addEventListener('change', (e) => {
        const newTheme = e.target.value;
        Storage.setTheme(newTheme);
        themeSelects.forEach(s => s.value = newTheme);
      });
    });
  },

  initOfflineBanner() {
    const banner = document.getElementById('offline-banner');
    if (!banner) return;

    const updateStatus = () => {
      if (navigator.onLine) {
        banner.classList.remove('active');
      } else {
        banner.classList.add('active');
        banner.textContent = 'Archive running offline — browsing cached historical records. External web links are disabled.';
      }
    };

    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);
    updateStatus();
  },

  initServiceWorker() {
    if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
      const swPath = this.basePath === '../' ? '../service-worker.js' : './service-worker.js';
      navigator.serviceWorker.register(swPath)
        .then(registration => {
          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            if (installingWorker) {
              installingWorker.onstatechange = () => {
                if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  this.showUpdatePrompt();
                }
              };
            }
          };
        })
        .catch(err => {
          console.info('Service Worker registration skipped or restricted in current context:', err.message);
        });
    }
  },

  showUpdatePrompt() {
    const banner = document.getElementById('offline-banner');
    if (banner) {
      banner.classList.add('active');
      banner.innerHTML = 'New historical archive records are available. <a href="#" id="sw-refresh-link" style="color: inherit; text-decoration: underline; font-weight: bold;">Click here to refresh</a>.';
      const refreshLink = document.getElementById('sw-refresh-link');
      if (refreshLink) {
        refreshLink.addEventListener('click', (e) => {
          e.preventDefault();
          window.location.reload();
        });
      }
    }
  },

  highlightActiveNav() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;
      if (currentPath.endsWith(href) || (href !== 'index.html' && href !== './' && currentPath.includes(href.replace('.html', '').replace('/', '')))) {
        link.classList.add('active');
      }
    });
  },

  initGlobalSearchShortcuts() {
    window.addEventListener('keydown', (e) => {
      // Shortcut '/' or 'Ctrl+K' / 'Cmd+K' to focus search
      if ((e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) || 
          ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')) {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="search"]');
        if (searchInput) {
          searchInput.focus();
        } else {
          window.location.href = `${this.basePath}search.html`;
        }
      }
    });
  },

  // Safe HTML Escaping Helper to prevent XSS
  escapeHTML(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  },

  // Safe JSON Fetcher with error handling
  async fetchJSON(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to fetch ${url}`);
      }
      return await response.json();
    } catch (err) {
      console.error('Fetch error:', err);
      return null;
    }
  },

  // Query parameter extraction
  getQueryParam(param) {
    const params = new URLSearchParams(window.location.search);
    return params.get(param);
  },

  formatDate(dateStr) {
    if (!dateStr) return 'Undated';
    // Accepts YYYY, YYYY-MM, or YYYY-MM-DD
    const parts = dateStr.split('-');
    if (parts.length === 1) return parts[0];
    const year = parts[0];
    const monthIndex = parseInt(parts[1], 10) - 1;
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month = months[monthIndex] || parts[1];
    if (parts.length === 2) return `${month} ${year}`;
    const day = parseInt(parts[2], 10);
    return `${month} ${day}, ${year}`;
  }
};

// Auto-run on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
