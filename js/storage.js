/**
 * History of Intervention - Storage Module
 * Local client-side storage for theme preferences, offline bookmarks, and reading history
 */

const STORAGE_KEYS = {
  THEME: 'hoi_theme_pref',
  BOOKMARKS: 'hoi_user_bookmarks',
  HISTORY: 'hoi_reading_history'
};

function isLocalStorageAvailable() {
  try {
    const test = '__hoi_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

const storageAvailable = isLocalStorageAvailable();

export const Storage = {
  getTheme() {
    if (!storageAvailable) return 'light';
    return localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
  },

  setTheme(theme) {
    if (!storageAvailable) return;
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    document.documentElement.setAttribute('data-theme', theme);
  },

  getBookmarks() {
    if (!storageAvailable) return [];
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Failed to parse bookmarks from storage:', e);
      return [];
    }
  },

  isBookmarked(id) {
    const bookmarks = this.getBookmarks();
    return bookmarks.some(item => item.id === id);
  },

  toggleBookmark(item) {
    if (!storageAvailable) return false;
    let bookmarks = this.getBookmarks();
    const index = bookmarks.findIndex(b => b.id === item.id);
    let added = false;

    if (index > -1) {
      bookmarks.splice(index, 1);
    } else {
      bookmarks.unshift({
        id: item.id,
        title: item.title,
        type: item.type || 'event',
        url: item.url || window.location.href,
        timestamp: Date.now()
      });
      added = true;
    }

    try {
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks.slice(0, 100)));
    } catch (e) {
      console.warn('Could not save bookmark:', e);
    }
    return added;
  },

  addHistory(entry) {
    if (!storageAvailable || !entry || !entry.id) return;
    try {
      let history = [];
      const raw = localStorage.getItem(STORAGE_KEYS.HISTORY);
      if (raw) history = JSON.parse(raw);

      // Remove previous entry of same id if present
      history = history.filter(h => h.id !== entry.id);

      history.unshift({
        id: entry.id,
        title: entry.title,
        url: entry.url || window.location.href,
        visited_at: Date.now()
      });

      // Keep only last 20 entries
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history.slice(0, 20)));
    } catch (e) {
      console.warn('Could not update history:', e);
    }
  },

  getHistory() {
    if (!storageAvailable) return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.HISTORY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }
};
