// weather.js — Weather service for Semana Santa Sevilla
// Uses Open-Meteo free API (no API key needed) for Sevilla forecast.

(function () {
  'use strict';

  var cache = {};
  var currentWeather = null;
  var loaded = false;

  /**
   * WMO weather code to emoji icon mapping.
   *
   * @param {number} code - WMO weather code
   * @returns {string} Emoji representing the weather
   */
  function getWeatherIcon(code) {
    if (code === 0) return '\u2600\uFE0F';                         // Clear sky
    if (code >= 1 && code <= 3) return '\u26C5';                    // Partly cloudy
    if (code >= 45 && code <= 48) return '\uD83C\uDF2B\uFE0F';     // Fog
    if (code >= 51 && code <= 55) return '\uD83C\uDF26\uFE0F';     // Drizzle
    if (code >= 56 && code <= 57) return '\uD83C\uDF27\uFE0F';     // Freezing drizzle
    if (code >= 61 && code <= 67) return '\uD83C\uDF27\uFE0F';     // Rain
    if (code >= 71 && code <= 77) return '\uD83C\uDF28\uFE0F';     // Snow
    if (code >= 80 && code <= 82) return '\uD83C\uDF26\uFE0F';     // Showers
    if (code >= 95 && code <= 99) return '\u26C8\uFE0F';           // Thunderstorm
    return '\u2601\uFE0F';                                          // Default: cloudy
  }

  /**
   * WMO weather code to short Spanish description.
   *
   * @param {number} code - WMO weather code
   * @returns {string} Short weather description in Spanish
   */
  function getDescription(code) {
    if (code === 0) return 'Despejado';
    if (code >= 1 && code <= 2) return 'Poco nuboso';
    if (code === 3) return 'Nuboso';
    if (code >= 45 && code <= 48) return 'Niebla';
    if (code >= 51 && code <= 55) return 'Llovizna';
    if (code >= 56 && code <= 57) return 'Llovizna helada';
    if (code >= 61 && code <= 63) return 'Lluvia';
    if (code >= 64 && code <= 67) return 'Lluvia intensa';
    if (code >= 71 && code <= 75) return 'Nieve';
    if (code >= 76 && code <= 77) return 'Granizo';
    if (code >= 80 && code <= 82) return 'Chubascos';
    if (code >= 95 && code <= 99) return 'Tormenta';
    return 'Variable';
  }

  /**
   * Fetch weather from Open-Meteo: current conditions + daily forecast.
   */
  function init() {
    // Fetch both current weather AND daily forecast in one call
    var url = 'https://api.open-meteo.com/v1/forecast'
      + '?latitude=37.3861&longitude=-5.9926'
      + '&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m'
      + '&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max'
      + '&timezone=Europe/Madrid'
      + '&forecast_days=16';

    return fetch(url)
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Weather API returned ' + response.status);
        }
        return response.json();
      })
      .then(function (data) {
        // Store current real-time conditions
        if (data && data.current) {
          var code = data.current.weather_code;
          currentWeather = {
            temp: Math.round(data.current.temperature_2m),
            humidity: data.current.relative_humidity_2m,
            wind: Math.round(data.current.wind_speed_10m),
            icon: getWeatherIcon(code),
            description: getDescription(code),
            code: code
          };
        }

        // Store daily forecasts
        if (data && data.daily && data.daily.time) {
          var daily = data.daily;
          var dates = daily.time;
          var codes = daily.weather_code;
          var maxTemps = daily.temperature_2m_max;
          var minTemps = daily.temperature_2m_min;
          var precipProbs = daily.precipitation_probability_max;

          for (var i = 0; i < dates.length; i++) {
            cache[dates[i]] = {
              tempMax: Math.round(maxTemps[i]),
              tempMin: Math.round(minTemps[i]),
              precipProb: precipProbs[i] != null ? precipProbs[i] : 0,
              icon: getWeatherIcon(codes[i]),
              description: getDescription(codes[i]),
              code: codes[i]
            };
          }
        }

        loaded = true;
        renderWeatherBar();
      })
      .catch(function () {
        var weatherBar = document.getElementById('weather-bar');
        if (weatherBar) {
          weatherBar.style.display = 'none';
        }
      });
  }

  /**
   * Get weather data for a specific date.
   *
   * @param {string} dateStr - Date in "YYYY-MM-DD" format
   * @returns {object|null} { tempMax, tempMin, precipProb, icon, description } or null
   */
  function getForDate(dateStr) {
    if (!dateStr || !cache[dateStr]) return null;
    return cache[dateStr];
  }

  /**
   * Render the weather bar for the currently selected day.
   * Looks up the selected day from the global DIAS array and active tab.
   */
  function renderWeatherBar() {
    var weatherContent = document.getElementById('weather-content');
    var weatherBar = document.getElementById('weather-bar');

    if (!weatherContent || !weatherBar) return;

    if (!loaded) return;

    // Determine which day is selected
    var dateStr = getSelectedDayDate();

    if (!dateStr) {
      weatherBar.style.display = 'none';
      return;
    }

    var weather = getForDate(dateStr);

    if (!weather) {
      weatherBar.style.display = 'none';
      return;
    }

    weatherBar.style.display = '';

    // Check if selected day is today -> show real current conditions
    var todayStr = getSelectedDayDate();
    var now = new Date();
    var todayDate = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');
    var isToday = (dateStr === todayDate);

    var html = '';

    if (isToday && currentWeather) {
      // Show real-time current weather
      html += '<span class="weather-bar__icon">' + currentWeather.icon + '</span>';
      html += '<span class="weather-bar__temps">';
      html += '<span class="weather-bar__max">' + currentWeather.temp + '\u00B0 ahora</span>';
      html += '</span>';
      html += '<span class="weather-bar__desc">' + currentWeather.description + '</span>';
      html += '<span class="weather-bar__precip">';
      html += '\uD83D\uDCA7 ' + weather.precipProb + '%';
      html += '</span>';
      html += '<span class="weather-bar__temps">';
      html += ' (M\u00E1x ' + weather.tempMax + '\u00B0 / M\u00EDn ' + weather.tempMin + '\u00B0)';
      html += '</span>';
    } else {
      // Show daily forecast for other days
      html += '<span class="weather-bar__icon">' + weather.icon + '</span>';
      html += '<span class="weather-bar__temps">';
      html += '<span class="weather-bar__max">' + weather.tempMax + '\u00B0</span>';
      html += ' / ';
      html += '<span class="weather-bar__min">' + weather.tempMin + '\u00B0</span>';
      html += '</span>';
      html += '<span class="weather-bar__desc">' + weather.description + '</span>';
      html += '<span class="weather-bar__precip">';
      html += '\uD83D\uDCA7 ' + weather.precipProb + '%';
      html += '</span>';
    }

    weatherContent.innerHTML = html;
  }

  /**
   * Get the date string for the currently selected day.
   * Checks for active tab or falls back to today's date.
   *
   * @returns {string|null} Date in "YYYY-MM-DD" format
   */
  function getSelectedDayDate() {
    if (typeof DIAS === 'undefined') return null;

    // Try to find the active tab
    var activeTab = document.querySelector('.tabs__btn--active');
    var selectedDayId = activeTab ? activeTab.getAttribute('data-day') : null;

    if (selectedDayId) {
      for (var i = 0; i < DIAS.length; i++) {
        if (DIAS[i].id === selectedDayId) {
          return DIAS[i].fecha;
        }
      }
    }

    // Fallback: today's date
    var now = new Date();
    var year = now.getFullYear();
    var month = String(now.getMonth() + 1).padStart(2, '0');
    var day = String(now.getDate()).padStart(2, '0');
    return year + '-' + month + '-' + day;
  }

  // ---- Public API ----

  window.WeatherService = {
    init: init,
    getForDate: getForDate,
    renderWeatherBar: renderWeatherBar,
    getWeatherIcon: getWeatherIcon
  };
})();
