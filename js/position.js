// position.js — Position estimation engine for Semana Santa Sevilla
// Estimates where a cofradia is on its route based on current time and official schedule.

(function () {
  'use strict';

  /**
   * Parse a time string "HH:MM" into a Date object for the given date string "YYYY-MM-DD".
   * If the hour is less than 8, the time is assumed to be after midnight (next calendar day),
   * since cofradias that end after midnight are still part of the previous liturgical day.
   *
   * @param {string} timeStr - Time in "HH:MM" format
   * @param {string} dateStr - Date in "YYYY-MM-DD" format (the liturgical day)
   * @returns {Date}
   */
  function parseTime(timeStr, dateStr) {
    if (!timeStr || !dateStr) return null;

    var parts = timeStr.split(':');
    var hours = parseInt(parts[0], 10);
    var minutes = parseInt(parts[1], 10);

    if (isNaN(hours) || isNaN(minutes)) return null;

    var dateParts = dateStr.split('-');
    var year = parseInt(dateParts[0], 10);
    var month = parseInt(dateParts[1], 10) - 1; // JS months are 0-indexed
    var day = parseInt(dateParts[2], 10);

    var date = new Date(year, month, day, hours, minutes, 0, 0);

    // Hours before 8:00 are considered next calendar day (after midnight)
    if (hours < 8) {
      date.setDate(date.getDate() + 1);
    }

    return date;
  }

  /**
   * Format a time string to display format (e.g. "17:00h").
   *
   * @param {string} timeStr - Time in "HH:MM" format
   * @returns {string}
   */
  function formatTime(timeStr) {
    if (!timeStr) return '';
    return timeStr + 'h';
  }

  /**
   * Get the fecha (date string) for a given dia id by looking it up in the DIAS array.
   *
   * @param {string} diaId - The dia identifier (e.g. 'domingo-ramos')
   * @returns {string|null} Date string "YYYY-MM-DD" or null if not found
   */
  function getFechaForDia(diaId) {
    if (typeof DIAS === 'undefined') return null;

    for (var i = 0; i < DIAS.length; i++) {
      if (DIAS[i].id === diaId) {
        return DIAS[i].fecha;
      }
    }
    return null;
  }

  /**
   * Compute the Euclidean distance between two [lat, lng] points.
   * Used for interpolation along waypoints (approximate, fine for short distances).
   *
   * @param {number[]} a - [lat, lng]
   * @param {number[]} b - [lat, lng]
   * @returns {number}
   */
  function distance(a, b) {
    var dlat = b[0] - a[0];
    var dlng = b[1] - a[1];
    return Math.sqrt(dlat * dlat + dlng * dlng);
  }

  /**
   * Interpolate a position along an array of waypoints given a progress value 0-1.
   * Progress 0 = first waypoint, progress 1 = last waypoint.
   *
   * @param {number[][]} waypoints - Array of [lat, lng] coordinate pairs
   * @param {number} progress - Value between 0 and 1
   * @returns {number[]|null} Interpolated [lat, lng] or null if no waypoints
   */
  function interpolatePosition(waypoints, progress) {
    if (!waypoints || waypoints.length === 0) return null;
    if (waypoints.length === 1) return [waypoints[0][0], waypoints[0][1]];

    // Clamp progress
    var t = Math.max(0, Math.min(1, progress));

    if (t === 0) return [waypoints[0][0], waypoints[0][1]];
    if (t === 1) {
      var last = waypoints[waypoints.length - 1];
      return [last[0], last[1]];
    }

    // Calculate cumulative segment distances
    var segmentDistances = [];
    var totalDistance = 0;

    for (var i = 1; i < waypoints.length; i++) {
      var d = distance(waypoints[i - 1], waypoints[i]);
      segmentDistances.push(d);
      totalDistance += d;
    }

    if (totalDistance === 0) return [waypoints[0][0], waypoints[0][1]];

    // Find the target distance along the path
    var targetDistance = t * totalDistance;
    var accumulated = 0;

    for (var j = 0; j < segmentDistances.length; j++) {
      var segDist = segmentDistances[j];

      if (accumulated + segDist >= targetDistance) {
        // Interpolate within this segment
        var segProgress = (targetDistance - accumulated) / segDist;
        var from = waypoints[j];
        var to = waypoints[j + 1];

        return [
          from[0] + (to[0] - from[0]) * segProgress,
          from[1] + (to[1] - from[1]) * segProgress
        ];
      }

      accumulated += segDist;
    }

    // Fallback: return last waypoint
    var lastWp = waypoints[waypoints.length - 1];
    return [lastWp[0], lastWp[1]];
  }

  /**
   * Get the current status of a cofradia based on the current time.
   *
   * @param {object} cofradia - Cofradia data object from COFRADIAS array
   * @param {Date} [now] - Optional override for current time (for testing)
   * @returns {object} { status, progress, estimatedPosition, statusText }
   */
  function getStatus(cofradia, now) {
    now = now || new Date();

    var fecha = getFechaForDia(cofradia.dia);

    if (!fecha) {
      return {
        status: 'not_today',
        progress: 0,
        estimatedPosition: null,
        statusText: 'Sin fecha asignada'
      };
    }

    var salida = parseTime(cofradia.horaSalida, fecha);
    var recogida = parseTime(cofradia.horaRecogida, fecha);

    if (!salida || !recogida) {
      return {
        status: 'not_today',
        progress: 0,
        estimatedPosition: null,
        statusText: 'Horario no disponible'
      };
    }

    // If recogida is before or equal to salida, something is off.
    // This shouldn't happen with parseTime's next-day logic, but guard against it.
    if (recogida <= salida) {
      recogida.setDate(recogida.getDate() + 1);
    }

    var nowMs = now.getTime();
    var salidaMs = salida.getTime();
    var recogidaMs = recogida.getTime();

    // Before salida
    if (nowMs < salidaMs) {
      // Check if we are on the right day (within a reasonable window before salida).
      // If the current time is more than 18 hours before salida, it's not today's concern.
      var hoursUntilSalida = (salidaMs - nowMs) / (1000 * 60 * 60);
      if (hoursUntilSalida > 18) {
        return {
          status: 'not_today',
          progress: 0,
          estimatedPosition: null,
          statusText: getDayName(cofradia.dia)
        };
      }

      return {
        status: 'pending',
        progress: 0,
        estimatedPosition: cofradia.coordsTemplo || null,
        statusText: 'Sale a las ' + formatTime(cofradia.horaSalida)
      };
    }

    // After recogida
    if (nowMs >= recogidaMs) {
      // If more than 6 hours after recogida, show as not_today / past
      var hoursAfterRecogida = (nowMs - recogidaMs) / (1000 * 60 * 60);
      if (hoursAfterRecogida > 6) {
        return {
          status: 'not_today',
          progress: 100,
          estimatedPosition: null,
          statusText: 'Recogida completada'
        };
      }

      return {
        status: 'done',
        progress: 100,
        estimatedPosition: cofradia.coordsTemplo || null,
        statusText: 'Recogida a las ' + formatTime(cofradia.horaRecogida)
      };
    }

    // Currently active: between salida and recogida
    var totalDuration = recogidaMs - salidaMs;
    var elapsed = nowMs - salidaMs;
    var progress = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
    var progressFraction = progress / 100;

    var estimatedPosition = interpolatePosition(cofradia.recorrido, progressFraction);

    // Determine if in Carrera Oficial (roughly 40-60% of the route)
    var inCarrera = progressFraction >= 0.40 && progressFraction <= 0.60;

    var status = inCarrera ? 'carrera' : 'active';
    var statusText;

    if (inCarrera) {
      statusText = 'En Carrera Oficial';
    } else {
      statusText = 'En la calle (' + Math.round(progress) + '% del recorrido)';
    }

    return {
      status: status,
      progress: Math.round(progress),
      estimatedPosition: estimatedPosition,
      statusText: statusText
    };
  }

  /**
   * Get the day name from a dia id.
   *
   * @param {string} diaId
   * @returns {string}
   */
  function getDayName(diaId) {
    if (typeof DIAS === 'undefined') return '';

    for (var i = 0; i < DIAS.length; i++) {
      if (DIAS[i].id === diaId) {
        return DIAS[i].nombre;
      }
    }
    return '';
  }

  /**
   * Get a human-readable string describing how long until salida or recogida.
   * Examples: "Sale en 2h 15min", "Recogida en 45min", "En la calle"
   *
   * @param {object} cofradia - Cofradia data object
   * @param {Date} [now] - Optional override for current time
   * @returns {string}
   */
  function getTimeUntil(cofradia, now) {
    now = now || new Date();

    var fecha = getFechaForDia(cofradia.dia);
    if (!fecha) return '';

    var salida = parseTime(cofradia.horaSalida, fecha);
    var recogida = parseTime(cofradia.horaRecogida, fecha);

    if (!salida || !recogida) return '';

    if (recogida <= salida) {
      recogida.setDate(recogida.getDate() + 1);
    }

    var nowMs = now.getTime();
    var salidaMs = salida.getTime();
    var recogidaMs = recogida.getTime();

    if (nowMs < salidaMs) {
      return 'Sale en ' + formatDuration(salidaMs - nowMs);
    }

    if (nowMs >= recogidaMs) {
      return 'Recogida completada';
    }

    // Active: show time until recogida
    return 'Recogida en ' + formatDuration(recogidaMs - nowMs);
  }

  /**
   * Format a duration in milliseconds to a human-readable string.
   * Examples: "2h 15min", "45min", "3h"
   *
   * @param {number} ms - Duration in milliseconds
   * @returns {string}
   */
  function formatDuration(ms) {
    var totalMinutes = Math.round(ms / (1000 * 60));

    if (totalMinutes < 1) return 'menos de 1min';

    var hours = Math.floor(totalMinutes / 60);
    var minutes = totalMinutes % 60;

    if (hours === 0) {
      return minutes + 'min';
    }

    if (minutes === 0) {
      return hours + 'h';
    }

    return hours + 'h ' + minutes + 'min';
  }

  // Expose the public API
  window.PositionEngine = {
    getStatus: getStatus,
    interpolatePosition: interpolatePosition,
    getTimeUntil: getTimeUntil,
    parseTime: parseTime,
    formatTime: formatTime
  };
})();
