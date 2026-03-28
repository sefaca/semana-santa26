// map.js — Leaflet map module for Semana Santa Sevilla
// Displays cofradias on an interactive map with estimated positions.
// Includes a map panel system (sidebar on desktop, bottom sheet on mobile).

(function () {
  'use strict';

  // ---- Map state ----
  var map = null;
  var markersLayer = null;
  var routePolyline = null;
  var routeBorderPolyline = null;
  var routeStartMarker = null;
  var routeEndMarker = null;
  var backButtonControl = null;
  var carreraOficialLine = null;
  var userMarker = null;
  var initialized = false;
  var currentDayId = null;

  // ---- Panel state ----
  var _showingFromPanel = false;
  var _panelCollapsed = false;

  // ---- Time simulator state ----
  var _timeOffsetMs = 0; // Milliseconds offset from real time (0 = live)

  function getSimulatedNow() {
    return new Date(Date.now() + _timeOffsetMs);
  }

  function isSimulating() {
    return _timeOffsetMs !== 0;
  }

  // ---- DOM references (set on DOMContentLoaded) ----
  var $panel = null;
  var $panelHandle = null;
  var $panelTabs = null;
  var $panelList = null;

  // ---------------------------------------------------------------------------
  // Map core
  // ---------------------------------------------------------------------------

  /**
   * Initialize the Leaflet map in the #map div.
   * Center on Sevilla Cathedral, zoom 14, OpenStreetMap tiles.
   * Only called once (lazy init on first show).
   */
  function initMap() {
    if (initialized) return;

    map = L.map('map', {
      center: [37.3861, -5.9926],
      zoom: 14,
      zoomControl: true
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19
    }).addTo(map);

    // Layer group for cofradia markers
    markersLayer = L.layerGroup().addTo(map);

    // Draw Carrera Oficial as permanent dashed line
    if (typeof CARRERA_OFICIAL !== 'undefined') {
      carreraOficialLine = L.polyline(CARRERA_OFICIAL, {
        color: '#D4A843',
        weight: 2,
        opacity: 0.5,
        dashArray: '8, 6'
      }).addTo(map);
    }

    // Handle location found
    map.on('locationfound', function (e) {
      if (userMarker) {
        map.removeLayer(userMarker);
      }

      userMarker = L.circleMarker(e.latlng, {
        radius: 10,
        color: '#2196F3',
        fillColor: '#2196F3',
        fillOpacity: 0.5,
        weight: 2,
        className: 'user-location-pulse'
      }).addTo(map);

      userMarker.bindPopup('Tu ubicación').openPopup();
      map.setView(e.latlng, 16);
    });

    // Handle location error silently
    map.on('locationerror', function () {
      // Silently ignore - user may have denied location
    });

    initialized = true;
  }

  /**
   * Show the map container, initialize if needed, refresh size, update markers.
   * Renders the panel tabs and list for the given day.
   *
   * @param {string} selectedDayId - The currently selected day ID
   */
  function show(selectedDayId) {
    currentDayId = selectedDayId;

    var container = document.getElementById('map-container');
    if (!container) return;

    container.removeAttribute('hidden');

    if (!initialized) {
      initMap();
    }

    // Leaflet needs a size recalculation after the container becomes visible
    setTimeout(function () {
      if (map) {
        map.invalidateSize();
      }
    }, 100);

    // Update markers for the selected day
    if (selectedDayId) {
      var cofradias = getCofradiasForDay(selectedDayId);
      updateMarkers(cofradias);
    }

    // Render panel tabs and list
    renderPanelTabs(selectedDayId);
    renderPanelList(selectedDayId);

    // Update time display
    updateTimeDisplay();
  }

  /**
   * Hide the map container.
   */
  function hide() {
    var container = document.getElementById('map-container');
    if (container) {
      container.setAttribute('hidden', '');
    }
  }

  /**
   * Check if the map container is currently visible.
   *
   * @returns {boolean}
   */
  function isVisible() {
    var container = document.getElementById('map-container');
    return container && !container.hasAttribute('hidden');
  }

  /**
   * Get cofradias for a given day from the global COFRADIAS array.
   *
   * @param {string} dayId
   * @returns {object[]}
   */
  function getCofradiasForDay(dayId) {
    if (typeof COFRADIAS === 'undefined') return [];

    var result = [];
    for (var i = 0; i < COFRADIAS.length; i++) {
      if (COFRADIAS[i].dia === dayId) {
        result.push(COFRADIAS[i]);
      }
    }
    return result;
  }

  /**
   * Clear existing markers and place new ones for each cofradia.
   * Color and size depend on the cofradia's current status.
   *
   * @param {object[]} cofradias - Array of cofradia data objects
   */
  function updateMarkers(cofradias) {
    if (!markersLayer) return;

    markersLayer.clearLayers();

    if (!cofradias || cofradias.length === 0) return;

    for (var i = 0; i < cofradias.length; i++) {
      var cofradia = cofradias[i];
      var simNow = getSimulatedNow();
      var statusInfo = window.PositionEngine
        ? window.PositionEngine.getStatus(cofradia, simNow)
        : { status: 'pending', estimatedPosition: null, statusText: '' };

      var position = null;
      var markerOptions = {};

      switch (statusInfo.status) {
        case 'active':
        case 'carrera':
          position = statusInfo.estimatedPosition || cofradia.coordsTemplo;
          markerOptions = {
            radius: 8,
            color: '#8B1A1A',
            fillColor: '#8B1A1A',
            fillOpacity: 0.85,
            weight: 2
          };
          break;

        case 'pending':
          position = cofradia.coordsTemplo;
          markerOptions = {
            radius: 6,
            color: '#999999',
            fillColor: '#999999',
            fillOpacity: 0.5,
            weight: 1
          };
          break;

        case 'done':
          position = cofradia.coordsTemplo;
          markerOptions = {
            radius: 6,
            color: '#4CAF50',
            fillColor: '#4CAF50',
            fillOpacity: 0.4,
            weight: 1
          };
          break;

        default:
          // not_today or unknown: skip
          position = cofradia.coordsTemplo;
          markerOptions = {
            radius: 5,
            color: '#CCCCCC',
            fillColor: '#CCCCCC',
            fillOpacity: 0.3,
            weight: 1
          };
          break;
      }

      if (position && position.length === 2) {
        var marker = L.circleMarker(position, markerOptions);
        var popupContent = '<strong>' + escapeHtml(cofradia.nombre) + '</strong>';
        popupContent += '<br>' + escapeHtml(statusInfo.statusText);

        if (cofradia.iglesia) {
          popupContent += '<br><small>' + escapeHtml(cofradia.iglesia) + '</small>';
        }

        marker.bindPopup(popupContent, {
          maxWidth: 220,
          closeButton: true
        });

        markersLayer.addLayer(marker);
      }
    }
  }

  // ---------------------------------------------------------------------------
  // Routing (OSRM)
  // ---------------------------------------------------------------------------

  /**
   * Build OSRM API URL from waypoints (lat,lng arrays).
   * OSRM uses lng,lat order.
   */
  function buildOSRMUrl(waypoints) {
    var coords = waypoints.map(function (p) {
      return p[1] + ',' + p[0]; // lng,lat
    }).join(';');
    return 'https://router.project-osrm.org/route/v1/foot/' + coords
      + '?overview=full&geometries=geojson';
  }

  /**
   * Draw the route on the map (used both for OSRM result and fallback).
   */
  function drawRouteOnMap(latLngs, cofradia) {
    // Draw border/outline polyline (dark navy, thicker)
    routeBorderPolyline = L.polyline(latLngs, {
      color: '#1a1a2e',
      weight: 9,
      opacity: 0.7,
      lineCap: 'round',
      lineJoin: 'round'
    }).addTo(map);

    // Draw main route polyline (bright orange-red, on top)
    routePolyline = L.polyline(latLngs, {
      color: '#FF6B35',
      weight: 5,
      opacity: 0.95,
      lineCap: 'round',
      lineJoin: 'round'
    }).addTo(map);

    // Fit map bounds to the route
    map.fitBounds(routePolyline.getBounds(), { padding: [50, 50] });

    // Start marker (green)
    var startPoint = latLngs[0];
    routeStartMarker = L.marker(startPoint, {
      icon: L.divIcon({
        className: 'route-marker route-marker--start',
        html: '<div style="background:#2E7D32;width:18px;height:18px;border-radius:50%;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.4);"></div>',
        iconSize: [18, 18],
        iconAnchor: [9, 9]
      })
    }).addTo(map);
    routeStartMarker.bindPopup(
      '<strong>Salida</strong><br>' + escapeHtml(cofradia.iglesia) +
      '<br><small>' + (cofradia.horaSalida || '') + 'h</small>'
    );

    // End marker (red) - only if different from start
    var endPoint = latLngs[latLngs.length - 1];
    routeEndMarker = L.marker(endPoint, {
      icon: L.divIcon({
        className: 'route-marker route-marker--end',
        html: '<div style="background:#8B1A1A;width:18px;height:18px;border-radius:50%;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.4);"></div>',
        iconSize: [18, 18],
        iconAnchor: [9, 9]
      })
    }).addTo(map);
    routeEndMarker.bindPopup(
      '<strong>Recogida</strong><br>' + escapeHtml(cofradia.iglesia) +
      '<br><small>' + (cofradia.horaRecogida || '') + 'h</small>'
    );

    // Show estimated position marker if available
    var statusInfo = window.PositionEngine
      ? window.PositionEngine.getStatus(cofradia, getSimulatedNow())
      : null;

    if (statusInfo && statusInfo.estimatedPosition) {
      var posMarker = L.marker(statusInfo.estimatedPosition, {
        icon: L.divIcon({
          className: 'route-marker route-marker--position',
          html: '<div style="background:#D4A843;width:22px;height:22px;border-radius:50%;border:3px solid #fff;box-shadow:0 0 12px rgba(212,168,67,0.6),0 2px 8px rgba(0,0,0,0.4);display:flex;align-items:center;justify-content:center;">'
            + '<div style="width:8px;height:8px;background:#fff;border-radius:50%;"></div></div>',
          iconSize: [22, 22],
          iconAnchor: [11, 11]
        }),
        zIndexOffset: 1000
      });

      posMarker.bindPopup(
        '<strong>' + escapeHtml(cofradia.nombre) + '</strong><br>' +
        escapeHtml(statusInfo.statusText)
      ).openPopup();

      routePolyline._positionMarker = posMarker;
      posMarker.addTo(map);
    }
  }

  /**
   * Draw a cofradia's route on the map.
   * Uses OSRM API for street-level precision, falls back to raw waypoints.
   *
   * @param {object} cofradia - Cofradia data object with recorrido array
   */
  function showRoute(cofradia) {
    clearRoute();

    if (!cofradia || !cofradia.recorrido || cofradia.recorrido.length === 0) return;
    if (!map) return;

    // Mark the corresponding panel item as selected
    panelSelectItem(cofradia.id);

    // Add "Volver" back button immediately
    var BackControl = L.Control.extend({
      options: { position: 'topleft' },
      onAdd: function () {
        var btn = L.DomUtil.create('div', 'leaflet-bar');
        btn.innerHTML = '<span style="margin-right:6px;">\u2190</span> Volver';
        btn.style.cssText = 'background:#2D1B4E;color:#fff;padding:10px 20px;border-radius:10px;'
          + 'cursor:pointer;font-weight:700;font-size:14px;font-family:Inter,sans-serif;'
          + 'box-shadow:0 4px 12px rgba(0,0,0,0.3);user-select:none;'
          + 'transition:background 0.2s ease;';
        btn.addEventListener('mouseenter', function () { btn.style.background = '#D4A843'; btn.style.color = '#2D1B4E'; });
        btn.addEventListener('mouseleave', function () { btn.style.background = '#2D1B4E'; btn.style.color = '#fff'; });
        L.DomEvent.disableClickPropagation(btn);
        btn.addEventListener('click', function () {
          if (_showingFromPanel) {
            // Came from panel click: just clear route, restore markers, keep panel open
            clearRoute();
            if (currentDayId) {
              var cofradias = getCofradiasForDay(currentDayId);
              updateMarkers(cofradias);
            }
          } else {
            // Came from external (modal "Ver en mapa"): close the map entirely
            clearRoute();
            hide();
          }
        });
        return btn;
      }
    });
    backButtonControl = new BackControl();
    map.addControl(backButtonControl);

    // Try OSRM for street-level routing
    var osrmUrl = buildOSRMUrl(cofradia.recorrido);

    fetch(osrmUrl)
      .then(function (res) {
        if (!res.ok) throw new Error('OSRM error');
        return res.json();
      })
      .then(function (data) {
        if (!data.routes || data.routes.length === 0) throw new Error('No route');

        // OSRM returns GeoJSON coordinates as [lng, lat], convert to [lat, lng]
        var coords = data.routes[0].geometry.coordinates;
        var latLngs = coords.map(function (c) { return [c[1], c[0]]; });

        drawRouteOnMap(latLngs, cofradia);
      })
      .catch(function () {
        // Fallback: draw simple waypoints if OSRM fails
        drawRouteOnMap(cofradia.recorrido, cofradia);
      });
  }

  /**
   * Pan the map to specific coordinates.
   *
   * @param {number} lat - Latitude
   * @param {number} lng - Longitude
   * @param {number} [zoom] - Zoom level (default 16)
   */
  function focusOn(lat, lng, zoom) {
    if (!map) return;
    map.setView([lat, lng], zoom || 16);
  }

  /**
   * Remove any drawn route polyline and its position marker.
   * Also clears the panel selected state.
   */
  function clearRoute() {
    if (routePolyline) {
      if (routePolyline._positionMarker) {
        map.removeLayer(routePolyline._positionMarker);
      }
      map.removeLayer(routePolyline);
      routePolyline = null;
    }
    if (routeBorderPolyline) {
      map.removeLayer(routeBorderPolyline);
      routeBorderPolyline = null;
    }
    if (routeStartMarker) {
      map.removeLayer(routeStartMarker);
      routeStartMarker = null;
    }
    if (routeEndMarker) {
      map.removeLayer(routeEndMarker);
      routeEndMarker = null;
    }
    if (backButtonControl) {
      map.removeControl(backButtonControl);
      backButtonControl = null;
    }

    // Clear panel selection
    panelClearSelection();

    // Reset the panel origin flag
    _showingFromPanel = false;
  }

  /**
   * Use the browser's geolocation to find the user and show a marker.
   */
  function locateUser() {
    if (!map) return;
    map.locate({ setView: false, maxZoom: 16 });
  }

  /**
   * Escape HTML entities to prevent XSS in popup content.
   *
   * @param {string} str
   * @returns {string}
   */
  function escapeHtml(str) {
    if (!str) return '';
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // ---------------------------------------------------------------------------
  // Panel: tabs, list, interactions
  // ---------------------------------------------------------------------------

  /**
   * Get today's date string in YYYY-MM-DD format (local time).
   * Used to mark the "today" tab in the panel.
   */
  function getTodayString() {
    var d = new Date();
    var yyyy = d.getFullYear();
    var mm = String(d.getMonth() + 1).padStart(2, '0');
    var dd = String(d.getDate()).padStart(2, '0');
    return yyyy + '-' + mm + '-' + dd;
  }

  /**
   * Render day tab buttons inside #map-panel-tabs.
   * Active tab gets map-panel__tab--active. Today's tab gets map-panel__tab--today.
   *
   * @param {string} selectedDayId - The currently selected day ID
   */
  function renderPanelTabs(selectedDayId) {
    if (!$panelTabs) return;
    if (typeof DIAS === 'undefined') return;

    var todayStr = getTodayString();
    var html = '';

    for (var i = 0; i < DIAS.length; i++) {
      var dia = DIAS[i];
      var classes = 'map-panel__tab';

      if (dia.id === selectedDayId) {
        classes += ' map-panel__tab--active';
      }
      if (dia.fecha === todayStr) {
        classes += ' map-panel__tab--today';
      }

      html += '<button class="' + classes + '" data-day="' + dia.id + '">'
        + escapeHtml(dia.abrev) + '</button>';
    }

    $panelTabs.innerHTML = html;

    // Scroll the active tab into view
    scrollActiveTabIntoView();
  }

  /**
   * Scroll the currently active tab button into view within the tabs container.
   */
  function scrollActiveTabIntoView() {
    if (!$panelTabs) return;

    var activeTab = $panelTabs.querySelector('.map-panel__tab--active');
    if (activeTab) {
      activeTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }

  /**
   * Map a status string to a short user-facing label.
   *
   * @param {string} status - One of: pending, active, carrera, done
   * @returns {string}
   */
  function getShortStatusText(status) {
    switch (status) {
      case 'pending':  return 'En templo';
      case 'active':   return 'En calle';
      case 'carrera':  return 'C. Oficial';
      case 'done':     return 'Recogida';
      default:         return 'En templo';
    }
  }

  /**
   * Render cofradias for the given day inside #map-panel-list.
   * Each item is a clickable button that triggers showRoute.
   *
   * @param {string} dayId - The day ID to render cofradias for
   */
  function renderPanelList(dayId) {
    if (!$panelList) return;

    var cofradias = getCofradiasForDay(dayId);

    if (!cofradias || cofradias.length === 0) {
      $panelList.innerHTML = '<div style="padding:24px;text-align:center;color:#999;font-size:14px;">'
        + 'No hay cofrad\u00edas para este d\u00eda.</div>';
      return;
    }

    var html = '';

    for (var i = 0; i < cofradias.length; i++) {
      var c = cofradias[i];
      var simNow = getSimulatedNow();
      var statusInfo = window.PositionEngine
        ? window.PositionEngine.getStatus(c, simNow)
        : { status: 'pending', progress: 0, statusText: '' };

      var status = statusInfo.status || 'pending';
      var shortText = getShortStatusText(status);

      html += '<button class="map-panel__item map-panel__item--' + escapeHtml(status) + '" data-id="' + escapeHtml(c.id) + '">'
        + '<span class="map-panel__item-dot"></span>'
        + '<div class="map-panel__item-info">'
        +   '<span class="map-panel__item-name">' + escapeHtml(c.nombre) + '</span>'
        +   '<span class="map-panel__item-church">' + escapeHtml(c.iglesia) + '</span>'
        + '</div>'
        + '<div class="map-panel__item-right">'
        +   '<span class="map-panel__item-hours">' + escapeHtml(c.horaSalida || '') + ' - ' + escapeHtml(c.horaRecogida || '') + '</span>'
        +   '<span class="map-panel__item-status">' + escapeHtml(shortText) + '</span>'
        + '</div>'
        + '</button>';
    }

    $panelList.innerHTML = html;
  }

  /**
   * Called when a panel day tab is clicked.
   * Updates currentDayId, renders list, updates map markers, scrolls tab into view.
   *
   * @param {string} dayId - The selected day ID
   */
  function panelSelectDay(dayId) {
    currentDayId = dayId;

    // Clear any active route first
    clearRoute();

    // Re-render tabs with new active state
    renderPanelTabs(dayId);

    // Re-render the cofradias list
    renderPanelList(dayId);

    // Update map markers for the new day
    var cofradias = getCofradiasForDay(dayId);
    updateMarkers(cofradias);
  }

  /**
   * Mark a panel item as selected by cofradia ID, removing selection from others.
   *
   * @param {string} cofradiaId
   */
  function panelSelectItem(cofradiaId) {
    if (!$panelList) return;

    var items = $panelList.querySelectorAll('.map-panel__item');
    for (var i = 0; i < items.length; i++) {
      if (items[i].getAttribute('data-id') === cofradiaId) {
        items[i].classList.add('map-panel__item--selected');
      } else {
        items[i].classList.remove('map-panel__item--selected');
      }
    }
  }

  /**
   * Remove selected state from all panel items.
   */
  function panelClearSelection() {
    if (!$panelList) return;

    var items = $panelList.querySelectorAll('.map-panel__item--selected');
    for (var i = 0; i < items.length; i++) {
      items[i].classList.remove('map-panel__item--selected');
    }
  }

  /**
   * Toggle the panel collapsed/expanded state on mobile.
   * Collapsed = only the header is visible (map-panel--collapsed class).
   */
  function togglePanelCollapsed() {
    if (!$panel) return;

    _panelCollapsed = !_panelCollapsed;

    if (_panelCollapsed) {
      $panel.classList.add('map-panel--collapsed');
    } else {
      $panel.classList.remove('map-panel--collapsed');
    }
  }

  /**
   * Expand the panel if it is currently collapsed.
   */
  function expandPanel() {
    if (!$panel) return;

    if (_panelCollapsed) {
      _panelCollapsed = false;
      $panel.classList.remove('map-panel--collapsed');
    }
  }

  /**
   * Find a cofradia object by its ID from the global COFRADIAS array.
   *
   * @param {string} id
   * @returns {object|null}
   */
  function findCofradiaById(id) {
    if (typeof COFRADIAS === 'undefined') return null;

    for (var i = 0; i < COFRADIAS.length; i++) {
      if (COFRADIAS[i].id === id) {
        return COFRADIAS[i];
      }
    }
    return null;
  }

  // ---------------------------------------------------------------------------
  // Time Simulator
  // ---------------------------------------------------------------------------

  function updateTimeDisplay() {
    var $display = document.getElementById('time-display');
    var $label = document.getElementById('time-label');
    var $reset = document.getElementById('time-reset');
    var $control = document.getElementById('time-control');
    if (!$display) return;

    var simNow = getSimulatedNow();
    var hh = String(simNow.getHours()).padStart(2, '0');
    var mm = String(simNow.getMinutes()).padStart(2, '0');
    $display.textContent = hh + ':' + mm;

    if (isSimulating()) {
      $label.textContent = 'Hora simulada';
      $reset.hidden = false;
      if ($control) $control.classList.add('time-control--simulating');
    } else {
      $label.textContent = 'Hora actual';
      $reset.hidden = true;
      if ($control) $control.classList.remove('time-control--simulating');
    }
  }

  /**
   * Advance (or rewind) to the next half-hour mark (:00 or :30).
   * @param {number} direction - 1 for forward, -1 for backward
   */
  function advanceToNextHalf(direction) {
    var simNow = getSimulatedNow();
    var h = simNow.getHours();
    var m = simNow.getMinutes();

    var target = new Date(simNow);
    target.setSeconds(0, 0);

    if (direction > 0) {
      // Forward: next :00 or :30
      if (m < 30) {
        target.setMinutes(30);
      } else {
        target.setHours(h + 1);
        target.setMinutes(0);
      }
    } else {
      // Backward: previous :00 or :30
      if (m > 30) {
        target.setMinutes(30);
      } else if (m > 0) {
        target.setMinutes(0);
      } else {
        target.setHours(h - 1);
        target.setMinutes(30);
      }
    }

    _timeOffsetMs = target.getTime() - Date.now();
    refreshMapState();
  }

  function resetTime() {
    _timeOffsetMs = 0;
    refreshMapState();
  }

  /**
   * Refresh all map state: markers, panel list, time display.
   * Called after time changes or day changes.
   */
  function refreshMapState() {
    updateTimeDisplay();

    if (currentDayId) {
      renderPanelList(currentDayId);
      var cofradias = getCofradiasForDay(currentDayId);
      updateMarkers(cofradias);
    }
  }

  // ---------------------------------------------------------------------------
  // Event listeners
  // ---------------------------------------------------------------------------

  document.addEventListener('DOMContentLoaded', function () {
    // Cache DOM references
    $panel = document.getElementById('map-panel');
    $panelHandle = document.getElementById('map-panel-handle');
    $panelTabs = document.getElementById('map-panel-tabs');
    $panelList = document.getElementById('map-panel-list');

    // Locate user button
    var btnLocate = document.getElementById('btn-locate');
    if (btnLocate) {
      btnLocate.addEventListener('click', function () {
        locateUser();
      });
    }

    // Close map button
    var btnMapClose = document.getElementById('btn-map-close');
    if (btnMapClose) {
      btnMapClose.addEventListener('click', function () {
        clearRoute();
        hide();
      });
    }

    // Panel handle: toggle collapsed/expanded on mobile
    if ($panelHandle) {
      $panelHandle.addEventListener('click', function () {
        togglePanelCollapsed();
      });
    }

    // Panel tabs: delegate click events
    if ($panelTabs) {
      $panelTabs.addEventListener('click', function (e) {
        var tab = e.target.closest('.map-panel__tab');
        if (!tab) return;

        var dayId = tab.getAttribute('data-day');
        if (dayId) {
          panelSelectDay(dayId);
        }
      });
    }

    // Time simulator buttons
    var btnTimeBack = document.getElementById('time-back');
    var btnTimeForward = document.getElementById('time-forward');
    var btnTimeReset = document.getElementById('time-reset');

    if (btnTimeBack) {
      btnTimeBack.addEventListener('click', function () { advanceToNextHalf(-1); });
    }
    if (btnTimeForward) {
      btnTimeForward.addEventListener('click', function () { advanceToNextHalf(1); });
    }
    if (btnTimeReset) {
      btnTimeReset.addEventListener('click', function () { resetTime(); });
    }

    // Update time display every 30 seconds
    updateTimeDisplay();
    setInterval(function () {
      if (!isSimulating()) updateTimeDisplay();
    }, 30000);

    // Panel list: delegate click events on cofradía items
    if ($panelList) {
      $panelList.addEventListener('click', function (e) {
        var item = e.target.closest('.map-panel__item');
        if (!item) return;

        var cofradiaId = item.getAttribute('data-id');
        if (!cofradiaId) return;

        var cofradia = findCofradiaById(cofradiaId);
        if (!cofradia) return;

        // Mark that this route was triggered from the panel
        _showingFromPanel = true;

        // Expand the panel if it was collapsed (mobile)
        expandPanel();

        // Show the route
        showRoute(cofradia);

        // Briefly scroll the selected item into view
        setTimeout(function () {
          var selected = $panelList.querySelector('.map-panel__item--selected');
          if (selected) {
            selected.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }, 50);
      });
    }
  });

  // ---------------------------------------------------------------------------
  // Public API
  // ---------------------------------------------------------------------------

  window.MapManager = {
    init: initMap,
    show: show,
    hide: hide,
    isVisible: isVisible,
    updateMarkers: updateMarkers,
    showRoute: showRoute,
    focusOn: focusOn,
    clearRoute: clearRoute,
    locateUser: locateUser
  };
})();
