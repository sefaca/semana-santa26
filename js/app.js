// app.js — Main application logic for Semana Santa Sevilla 2026
// Orchestrates UI rendering, navigation, search, modals, and real-time updates.

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ---------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------

  let currentDayId = null;
  let favoritesOnly = false;
  let mapVisible = false;
  let clockInterval = null;
  let countdownInterval = null;
  let autoRefreshInterval = null;

  // ---------------------------------------------------------------------------
  // DOM References
  // ---------------------------------------------------------------------------

  const $clock = document.getElementById('clock');
  const $tabsScroll = document.querySelector('#tabs .tabs__scroll');
  const $dayTitle = document.getElementById('day-title');
  const $dayCount = document.getElementById('day-count');
  const $cofradiasGrid = document.getElementById('cofradias-grid');
  const $countdownSection = document.getElementById('countdown-section');
  const $countdownTimer = document.getElementById('countdown-timer');
  const $searchOverlay = document.getElementById('search-overlay');
  const $searchInput = document.getElementById('search-input');
  const $searchResults = document.getElementById('search-results');
  const $searchClose = document.getElementById('search-close');
  const $btnSearch = document.getElementById('btn-search');
  const $btnFavorites = document.getElementById('btn-favorites');
  const $btnMapToggle = document.getElementById('btn-map-toggle');
  const $btnMapClose = document.getElementById('btn-map-close');
  const $btnShare = document.getElementById('btn-share');
  const $modalOverlay = document.getElementById('modal-overlay');
  const $modalContent = document.getElementById('modal-content');
  const $modalClose = document.getElementById('modal-close');
  const $mapContainer = document.getElementById('map-container');
  const $weatherContent = document.getElementById('weather-content');

  // ---------------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------------

  /**
   * Get today's date string in YYYY-MM-DD format (local time).
   */
  function getTodayString() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  /**
   * Pad a number to two digits.
   */
  function pad2(n) {
    return String(n).padStart(2, '0');
  }

  /**
   * Determine which DIAS entry matches today, if any.
   * Returns the dia object or null.
   */
  function findTodayDia() {
    const today = getTodayString();
    return DIAS.find(d => d.fecha === today) || null;
  }

  /**
   * Check whether today falls before Semana Santa starts.
   */
  function isBeforeSemanaSanta() {
    const today = getTodayString();
    return today < SEMANA_SANTA_2026.inicio;
  }

  /**
   * Get cofradias for a given day, optionally filtered by favorites.
   */
  function getCofradiasForDay(diaId) {
    let list = COFRADIAS.filter(c => c.dia === diaId);
    if (favoritesOnly && window.FavoritesManager) {
      const favs = window.FavoritesManager.getAll();
      list = list.filter(c => favs.includes(c.id));
    }
    return list;
  }

  /**
   * Find a cofradia by id.
   */
  function findCofradia(id) {
    return COFRADIAS.find(c => c.id === id) || null;
  }

  // ---------------------------------------------------------------------------
  // Clock
  // ---------------------------------------------------------------------------

  function updateClock() {
    const now = new Date();
    $clock.textContent = `${pad2(now.getHours())}:${pad2(now.getMinutes())}:${pad2(now.getSeconds())}`;
  }

  function startClock() {
    updateClock();
    clockInterval = setInterval(updateClock, 1000);
  }

  // ---------------------------------------------------------------------------
  // Countdown
  // ---------------------------------------------------------------------------

  function updateCountdown() {
    const now = new Date();
    const target = new Date(SEMANA_SANTA_2026.inicio + 'T00:00:00');
    const diff = target.getTime() - now.getTime();

    if (diff <= 0) {
      // Semana Santa has started, hide countdown
      $countdownSection.hidden = true;
      if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
      }
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    $countdownTimer.innerHTML = `
      <div class="countdown__unit">
        <span class="countdown__number">${days}</span>
        <span class="countdown__label">d${days !== 1 ? 'ias' : 'ia'}</span>
      </div>
      <div class="countdown__unit">
        <span class="countdown__number">${pad2(hours)}</span>
        <span class="countdown__label">hora${hours !== 1 ? 's' : ''}</span>
      </div>
      <div class="countdown__unit">
        <span class="countdown__number">${pad2(minutes)}</span>
        <span class="countdown__label">min</span>
      </div>
      <div class="countdown__unit">
        <span class="countdown__number">${pad2(seconds)}</span>
        <span class="countdown__label">seg</span>
      </div>
    `;
  }

  function startCountdown() {
    if (!isBeforeSemanaSanta()) return;

    $countdownSection.hidden = false;
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
  }

  // ---------------------------------------------------------------------------
  // Tabs
  // ---------------------------------------------------------------------------

  function renderTabs() {
    const todayStr = getTodayString();

    const tabsHTML = DIAS.map(dia => {
      const isToday = dia.fecha === todayStr;
      const todayClass = isToday ? ' tabs__btn--today' : '';
      return `<button class="tabs__btn${todayClass}" data-day="${dia.id}">${dia.abrev}</button>`;
    }).join('');

    $tabsScroll.innerHTML = tabsHTML;

    // Attach click listeners
    $tabsScroll.querySelectorAll('.tabs__btn').forEach(btn => {
      btn.addEventListener('click', () => {
        selectDay(btn.dataset.day);
      });
    });
  }

  function setActiveTab(diaId) {
    $tabsScroll.querySelectorAll('.tabs__btn').forEach(btn => {
      btn.classList.toggle('tabs__btn--active', btn.dataset.day === diaId);
    });

    // Scroll active tab into view
    const activeBtn = $tabsScroll.querySelector('.tabs__btn--active');
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }

  // ---------------------------------------------------------------------------
  // Card Rendering
  // ---------------------------------------------------------------------------

  function renderCard(cofradia) {
    const statusInfo = window.PositionEngine
      ? window.PositionEngine.getStatus(cofradia)
      : { status: 'pending', progress: 0, statusText: 'Cargando...' };

    const isFav = window.FavoritesManager && window.FavoritesManager.isFavorite(cofradia.id);
    const favClass = isFav ? 'cofradia-card__fav--active' : '';

    return `
      <article class="cofradia-card cofradia-card--${statusInfo.status}" data-id="${cofradia.id}" tabindex="0">
        <div class="cofradia-card__status-bar"></div>
        <div class="cofradia-card__body">
          <div class="cofradia-card__header">
            <h3 class="cofradia-card__name">${cofradia.nombre}</h3>
            <button class="cofradia-card__fav ${favClass}" aria-label="Favorito">&#9733;</button>
          </div>
          <p class="cofradia-card__church">${cofradia.iglesia}</p>
          <p class="cofradia-card__barrio">${cofradia.barrio}</p>
          <div class="cofradia-card__schedule">
            <div class="cofradia-card__time">
              <span class="cofradia-card__time-label">Salida</span>
              <span class="cofradia-card__time-value">${cofradia.horaSalida}</span>
            </div>
            <div class="cofradia-card__time">
              <span class="cofradia-card__time-label">Recogida</span>
              <span class="cofradia-card__time-value">${cofradia.horaRecogida}</span>
            </div>
          </div>
          <div class="cofradia-card__progress">
            <div class="cofradia-card__progress-bar">
              <div class="cofradia-card__progress-fill" style="--progress: ${statusInfo.progress}%"></div>
            </div>
            <span class="cofradia-card__progress-text">${statusInfo.progress}%</span>
          </div>
          <div class="cofradia-card__status-badge status-badge--${statusInfo.status}">
            <span class="status-badge__dot"></span>
            ${statusInfo.statusText}
          </div>
        </div>
      </article>
    `;
  }

  function renderCofradias(diaId) {
    const cofradias = getCofradiasForDay(diaId);

    if (cofradias.length === 0 && favoritesOnly) {
      $cofradiasGrid.innerHTML = `
        <div class="cofradias-grid__empty">
          <p>No tienes cofrad&iacute;as favoritas para este d&iacute;a.</p>
          <p>Pulsa la estrella &#9733; en cualquier cofrad&iacute;a para a&ntilde;adirla.</p>
        </div>
      `;
    } else if (cofradias.length === 0) {
      $cofradiasGrid.innerHTML = `
        <div class="cofradias-grid__empty">
          <p>No hay cofrad&iacute;as programadas para este d&iacute;a.</p>
        </div>
      `;
    } else {
      $cofradiasGrid.innerHTML = cofradias.map(renderCard).join('');
    }

    // Update day count
    const totalForDay = COFRADIAS.filter(c => c.dia === diaId).length;
    if (favoritesOnly) {
      $dayCount.textContent = `${cofradias.length} de ${totalForDay} cofrad\u00EDas (favoritas)`;
    } else {
      $dayCount.textContent = `${totalForDay} cofrad\u00EDa${totalForDay !== 1 ? 's' : ''}`;
    }

    // Attach card event listeners
    attachCardListeners();
  }

  function attachCardListeners() {
    // Card click -> open modal
    $cofradiasGrid.querySelectorAll('.cofradia-card').forEach(card => {
      card.addEventListener('click', (e) => {
        // Don't open modal if the fav button was clicked
        if (e.target.closest('.cofradia-card__fav')) return;
        openModal(card.dataset.id);
      });

      // Keyboard: Enter opens modal
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          openModal(card.dataset.id);
        }
      });
    });

    // Favorite buttons
    $cofradiasGrid.querySelectorAll('.cofradia-card__fav').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = btn.closest('.cofradia-card');
        const cofradiaId = card.dataset.id;
        if (window.FavoritesManager) {
          window.FavoritesManager.toggle(cofradiaId);
        }
        btn.classList.toggle('cofradia-card__fav--active');

        // If we're in favorites-only mode, re-render to remove unfavorited cards
        if (favoritesOnly) {
          renderCofradias(currentDayId);
        }
      });
    });
  }

  // ---------------------------------------------------------------------------
  // Select Day
  // ---------------------------------------------------------------------------

  function selectDay(diaId) {
    currentDayId = diaId;

    // Update tab highlight
    setActiveTab(diaId);

    // Update day title
    const dia = DIAS.find(d => d.id === diaId);
    $dayTitle.textContent = dia ? dia.nombre : '';

    // Render cofradias
    renderCofradias(diaId);

    // Update weather
    updateWeather(diaId);

    // Update map markers if visible
    if (mapVisible && window.MapManager) {
      const cofradias = getCofradiasForDay(diaId);
      window.MapManager.updateMarkers(cofradias);
    }
  }

  // ---------------------------------------------------------------------------
  // Weather
  // ---------------------------------------------------------------------------

  function updateWeather(diaId) {
    if (!window.WeatherService) return;

    const dia = DIAS.find(d => d.id === diaId);
    if (!dia) return;

    const weather = window.WeatherService.getForDate(dia.fecha);
    if (!weather) {
      $weatherContent.innerHTML = '<span class="weather-bar__loading">Meteorolog\u00EDa no disponible</span>';
      return;
    }

    $weatherContent.innerHTML = `
      <span class="weather-bar__icon">${weather.icon || ''}</span>
      <span class="weather-bar__temp">${weather.tempMax || '--'}\u00B0 / ${weather.tempMin || '--'}\u00B0</span>
      <span class="weather-bar__desc">${weather.description || ''}</span>
      ${weather.precipProb ? `<span class="weather-bar__rain">\uD83D\uDCA7 ${weather.precipProb}%</span>` : ''}
    `;
  }

  // ---------------------------------------------------------------------------
  // Search
  // ---------------------------------------------------------------------------

  function openSearch() {
    $searchOverlay.hidden = false;
    $searchInput.value = '';
    $searchResults.innerHTML = '';
    // Use setTimeout to ensure the overlay is visible before focusing
    setTimeout(() => $searchInput.focus(), 50);
  }

  function closeSearch() {
    $searchOverlay.hidden = true;
    $searchInput.value = '';
    $searchResults.innerHTML = '';
  }

  function handleSearchInput() {
    const query = $searchInput.value.trim().toLowerCase();

    if (query.length < 2) {
      $searchResults.innerHTML = '';
      return;
    }

    const matches = COFRADIAS.filter(c =>
      c.nombre.toLowerCase().includes(query) ||
      (c.nombreCompleto && c.nombreCompleto.toLowerCase().includes(query)) ||
      (c.iglesia && c.iglesia.toLowerCase().includes(query)) ||
      (c.barrio && c.barrio.toLowerCase().includes(query))
    );

    if (matches.length === 0) {
      $searchResults.innerHTML = '<div class="search-overlay__empty">No se encontraron resultados</div>';
      return;
    }

    $searchResults.innerHTML = matches.map(c => {
      const dia = DIAS.find(d => d.id === c.dia);
      const diaName = dia ? dia.abrev : '';
      return `
        <button class="search-overlay__result" data-id="${c.id}">
          <span class="search-overlay__result-name">${c.nombre}</span>
          <span class="search-overlay__result-info">${c.iglesia} &mdash; ${diaName}</span>
        </button>
      `;
    }).join('');

    // Attach click listeners to results
    $searchResults.querySelectorAll('.search-overlay__result').forEach(item => {
      item.addEventListener('click', () => {
        const cofradia = findCofradia(item.dataset.id);
        if (cofradia) {
          closeSearch();
          // Switch to that cofradia's day if needed
          if (currentDayId !== cofradia.dia) {
            selectDay(cofradia.dia);
          }
          openModal(cofradia.id);
        }
      });
    });
  }

  // ---------------------------------------------------------------------------
  // Modal
  // ---------------------------------------------------------------------------

  function openModal(cofradiaId) {
    const cofradia = findCofradia(cofradiaId);
    if (!cofradia) return;

    const statusInfo = window.PositionEngine
      ? window.PositionEngine.getStatus(cofradia)
      : { status: 'pending', progress: 0, statusText: '' };

    const timeUntil = window.PositionEngine
      ? window.PositionEngine.getTimeUntil(cofradia)
      : '';

    const dia = DIAS.find(d => d.id === cofradia.dia);
    const diaName = dia ? dia.nombre : '';

    const isFav = window.FavoritesManager && window.FavoritesManager.isFavorite(cofradia.id);
    const favBtnText = isFav ? 'Quitar de favoritos' : 'A\u00F1adir a favoritos';

    $modalContent.innerHTML = `
      <div class="modal__header">
        <h2 class="modal__title" id="modal-title">${cofradia.nombre}</h2>
        ${cofradia.nombreCompleto ? `<p class="modal__subtitle">${cofradia.nombreCompleto}</p>` : ''}
      </div>

      <div class="modal__status">
        <div class="cofradia-card__status-badge status-badge--${statusInfo.status}">
          <span class="status-badge__dot"></span>
          ${statusInfo.statusText}
        </div>
        ${timeUntil ? `<p class="modal__time-until">${timeUntil}</p>` : ''}
      </div>

      <div class="modal__progress">
        <div class="cofradia-card__progress-bar">
          <div class="cofradia-card__progress-fill" style="--progress: ${statusInfo.progress}%"></div>
        </div>
        <span class="cofradia-card__progress-text">${statusInfo.progress}% del recorrido</span>
      </div>

      <div class="modal__details">
        <div class="modal__detail">
          <span class="modal__detail-label">D\u00EDa</span>
          <span class="modal__detail-value">${diaName}</span>
        </div>
        <div class="modal__detail">
          <span class="modal__detail-label">Iglesia</span>
          <span class="modal__detail-value">${cofradia.iglesia}</span>
        </div>
        <div class="modal__detail">
          <span class="modal__detail-label">Barrio</span>
          <span class="modal__detail-value">${cofradia.barrio}</span>
        </div>
        <div class="modal__detail">
          <span class="modal__detail-label">Salida</span>
          <span class="modal__detail-value">${cofradia.horaSalida}h</span>
        </div>
        <div class="modal__detail">
          <span class="modal__detail-label">Recogida</span>
          <span class="modal__detail-value">${cofradia.horaRecogida}h</span>
        </div>
        <div class="modal__detail">
          <span class="modal__detail-label">Pasos</span>
          <span class="modal__detail-value">${cofradia.pasos}</span>
        </div>
      </div>

      ${cofradia.descripcion ? `<p class="modal__description">${cofradia.descripcion}</p>` : ''}

      <div class="modal__actions">
        <button class="modal__btn modal__btn--fav" data-id="${cofradia.id}">
          &#9733; ${favBtnText}
        </button>
        <button class="modal__btn modal__btn--map" data-id="${cofradia.id}">
          Ver en mapa
        </button>
        <button class="modal__btn modal__btn--share" data-id="${cofradia.id}">
          Compartir
        </button>
      </div>
    `;

    $modalOverlay.hidden = false;
    document.body.style.overflow = 'hidden';

    // Attach modal action listeners
    const favBtn = $modalContent.querySelector('.modal__btn--fav');
    if (favBtn) {
      favBtn.addEventListener('click', () => {
        if (window.FavoritesManager) {
          window.FavoritesManager.toggle(cofradia.id);
          const nowFav = window.FavoritesManager.isFavorite(cofradia.id);
          favBtn.innerHTML = `&#9733; ${nowFav ? 'Quitar de favoritos' : 'A\u00F1adir a favoritos'}`;
          // Re-render cards to update star states
          renderCofradias(currentDayId);
        }
      });
    }

    const mapBtn = $modalContent.querySelector('.modal__btn--map');
    if (mapBtn) {
      mapBtn.addEventListener('click', () => {
        closeModal();
        showMap();
        if (window.MapManager && cofradia.recorrido) {
          window.MapManager.showRoute(cofradia);
        }
      });
    }

    const shareBtn = $modalContent.querySelector('.modal__btn--share');
    if (shareBtn) {
      shareBtn.addEventListener('click', () => {
        shareCofradiaDetail(cofradia);
      });
    }
  }

  function closeModal() {
    $modalOverlay.hidden = true;
    document.body.style.overflow = '';
  }

  // ---------------------------------------------------------------------------
  // Map
  // ---------------------------------------------------------------------------

  function showMap() {
    mapVisible = true;
    $mapContainer.hidden = false;
    $btnMapToggle.classList.add('header__btn--active');

    if (window.MapManager) {
      window.MapManager.show();
      const cofradias = getCofradiasForDay(currentDayId);
      window.MapManager.updateMarkers(cofradias);
    }
  }

  function hideMap() {
    mapVisible = false;
    $mapContainer.hidden = true;
    $btnMapToggle.classList.remove('header__btn--active');

    if (window.MapManager) {
      window.MapManager.hide();
    }
  }

  function toggleMap() {
    if (mapVisible) {
      hideMap();
    } else {
      showMap();
    }
  }

  // ---------------------------------------------------------------------------
  // Favorites Toggle
  // ---------------------------------------------------------------------------

  function toggleFavorites() {
    favoritesOnly = !favoritesOnly;
    $btnFavorites.classList.toggle('header__btn--active', favoritesOnly);
    renderCofradias(currentDayId);
  }

  // ---------------------------------------------------------------------------
  // Share
  // ---------------------------------------------------------------------------

  function shareApp() {
    const dia = DIAS.find(d => d.id === currentDayId);
    const dayName = dia ? dia.nombre : 'Semana Santa';
    const shareData = {
      title: 'Semana Santa Sevilla 2026',
      text: `Semana Santa Sevilla 2026 - ${dayName}`,
      url: window.location.href
    };

    if (navigator.share) {
      navigator.share(shareData).catch(() => {
        // User cancelled or error, fail silently
      });
    } else {
      // Fallback: copy URL to clipboard
      copyToClipboard(window.location.href);
    }
  }

  function shareCofradiaDetail(cofradia) {
    const dia = DIAS.find(d => d.id === cofradia.dia);
    const dayName = dia ? dia.nombre : '';
    const shareData = {
      title: `${cofradia.nombre} - Semana Santa Sevilla 2026`,
      text: `${cofradia.nombre} (${dayName}) - Salida: ${cofradia.horaSalida}h desde ${cofradia.iglesia}`,
      url: window.location.href
    };

    if (navigator.share) {
      navigator.share(shareData).catch(() => {});
    } else {
      copyToClipboard(window.location.href);
    }
  }

  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast('Enlace copiado al portapapeles');
      }).catch(() => {
        fallbackCopy(text);
      });
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      showToast('Enlace copiado al portapapeles');
    } catch {
      showToast('No se pudo copiar el enlace');
    }
    document.body.removeChild(textarea);
  }

  function showToast(message) {
    // Create a simple toast notification
    let toast = document.querySelector('.toast');
    if (toast) toast.remove();

    toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.setAttribute('role', 'alert');
    document.body.appendChild(toast);

    // Force reflow then add visible class
    toast.offsetHeight; // eslint-disable-line no-unused-expressions
    toast.classList.add('toast--visible');

    setTimeout(() => {
      toast.classList.remove('toast--visible');
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }

  // ---------------------------------------------------------------------------
  // Auto-refresh
  // ---------------------------------------------------------------------------

  function startAutoRefresh() {
    autoRefreshInterval = setInterval(() => {
      if (currentDayId) {
        renderCofradias(currentDayId);

        // Update map markers if visible
        if (mapVisible && window.MapManager) {
          const cofradias = getCofradiasForDay(currentDayId);
          window.MapManager.updateMarkers(cofradias);
        }
      }
    }, 60000);
  }

  // ---------------------------------------------------------------------------
  // Event Listeners
  // ---------------------------------------------------------------------------

  function setupEventListeners() {
    // Search
    $btnSearch.addEventListener('click', openSearch);
    $searchClose.addEventListener('click', closeSearch);
    $searchInput.addEventListener('input', handleSearchInput);

    // Favorites
    $btnFavorites.addEventListener('click', toggleFavorites);

    // Map toggle
    $btnMapToggle.addEventListener('click', toggleMap);
    if ($btnMapClose) {
      $btnMapClose.addEventListener('click', hideMap);
    }

    // Share
    $btnShare.addEventListener('click', shareApp);

    // Modal close
    $modalClose.addEventListener('click', closeModal);
    $modalOverlay.addEventListener('click', (e) => {
      if (e.target === $modalOverlay) {
        closeModal();
      }
    });

    // Global keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (!$modalOverlay.hidden) {
          closeModal();
        } else if (!$searchOverlay.hidden) {
          closeSearch();
        }
      }
    });

    // Search overlay: prevent scroll-through and close on overlay background click
    $searchOverlay.addEventListener('click', (e) => {
      if (e.target === $searchOverlay) {
        closeSearch();
      }
    });
  }

  // ---------------------------------------------------------------------------
  // Initialization
  // ---------------------------------------------------------------------------

  function detectInitialDay() {
    const todayDia = findTodayDia();

    if (todayDia) {
      return todayDia.id;
    }

    // If we are during Semana Santa but between two day dates
    // (e.g. Madruga and Viernes Santo share the same date),
    // findTodayDia returns the first match, which is fine.

    // If today is after Semana Santa ended, show the last day
    const today = getTodayString();
    if (today > SEMANA_SANTA_2026.fin) {
      return DIAS[DIAS.length - 1].id;
    }

    // Default: first day (Viernes de Dolores)
    return DIAS[0].id;
  }

  function init() {
    // Render tabs
    renderTabs();

    // Detect and select initial day
    const initialDay = detectInitialDay();
    selectDay(initialDay);

    // Start clock
    startClock();

    // Start countdown if before Semana Santa
    startCountdown();

    // Init weather service
    if (window.WeatherService && typeof window.WeatherService.init === 'function') {
      window.WeatherService.init().then(() => {
        updateWeather(currentDayId);
      }).catch(() => {
        // Weather unavailable, fail gracefully
      });
    }

    // Init map manager
    if (window.MapManager && typeof window.MapManager.init === 'function') {
      window.MapManager.init();
    }

    // Set up all event listeners
    setupEventListeners();

    // Start auto-refresh (every 60 seconds)
    startAutoRefresh();
  }

  // Launch
  init();
});
