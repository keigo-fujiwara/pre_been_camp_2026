// ============================================================
// スケジュール（TOP用）描画スクリプト
// ============================================================
// データの編集 → assets/schedule-data.js
// ============================================================

(function () {
  'use strict';

  function buildDayRow(day) {
    var activeClass = day.active ? ' active' : '';
    var times = day.items.map(function (item) {
      return '<div class="time-slot">' + item.time + '</div>';
    }).join('');
    var locations = day.items.map(function (item) {
      return '<div class="location-item">' + item.location + '</div>';
    }).join('');
    var activities = day.items.map(function (item) {
      return '<div class="activity">' + item.activity + '</div>';
    }).join('');
    var notes = day.items.map(function (item) {
      var note = item.note ? item.note : '&nbsp;';
      return '<div class="note-item">' + note + '</div>';
    }).join('');

    return (
      '<tr class="schedule-row tab-content' + activeClass + '" id="' + day.id + '">' +
      '<td class="schedule-detail">' + times + '</td>' +
      '<td class="schedule-detail schedule-location">' + locations + '</td>' +
      '<td class="schedule-detail">' + activities + '</td>' +
      '<td class="schedule-detail schedule-note">' + notes + '</td>' +
      '</tr>'
    );
  }

  function renderSchedule() {
    var tbody = document.querySelector('[data-schedule-tbody]');
    var days = window.SCHEDULE_DAYS;
    if (!tbody || !Array.isArray(days) || days.length === 0) return false;

    tbody.innerHTML = days.map(buildDayRow).join('');
    return true;
  }

  window.renderCampSchedule = renderSchedule;

  // tbody が存在する時点で即描画（script.js より先に実行される）
  renderSchedule();
})();
