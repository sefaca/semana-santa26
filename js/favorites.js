// favorites.js — Favorites system for Semana Santa Sevilla
// Uses localStorage to persist user's favorite cofradias.

(function () {
  'use strict';

  var STORAGE_KEY = 'ss_sevilla_favorites';

  /**
   * Load favorites from localStorage.
   *
   * @returns {string[]} Array of cofradia IDs
   */
  function load() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        var parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      // localStorage unavailable or corrupted data
    }
    return [];
  }

  /**
   * Save favorites array to localStorage.
   *
   * @param {string[]} favorites - Array of cofradia IDs
   */
  function save(favorites) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (e) {
      // localStorage unavailable or quota exceeded
    }
  }

  /**
   * Check if a cofradia is in the favorites list.
   *
   * @param {string} cofradiaId - The cofradia identifier
   * @returns {boolean}
   */
  function isFavorite(cofradiaId) {
    var favorites = load();
    return favorites.indexOf(cofradiaId) !== -1;
  }

  /**
   * Toggle a cofradia's favorite state.
   * Adds if not a favorite, removes if already a favorite.
   *
   * @param {string} cofradiaId - The cofradia identifier
   * @returns {boolean} The new favorite state (true = now a favorite)
   */
  function toggle(cofradiaId) {
    var favorites = load();
    var index = favorites.indexOf(cofradiaId);

    if (index === -1) {
      favorites.push(cofradiaId);
      save(favorites);
      return true;
    } else {
      favorites.splice(index, 1);
      save(favorites);
      return false;
    }
  }

  /**
   * Get all favorited cofradia IDs.
   *
   * @returns {string[]} Array of cofradia IDs
   */
  function getAll() {
    return load();
  }

  /**
   * Get the number of favorited cofradias.
   *
   * @returns {number}
   */
  function count() {
    return load().length;
  }

  // ---- Public API ----

  window.FavoritesManager = {
    isFavorite: isFavorite,
    toggle: toggle,
    getAll: getAll,
    count: count
  };
})();
