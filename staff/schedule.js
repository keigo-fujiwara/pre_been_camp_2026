// ============================================================
// スタッフ詳細スケジュール描画
// ============================================================
// データの編集 → staff/schedule-data.js
// ============================================================

(function () {
  'use strict';

  function formatTime(time) {
    return time.replace('～', '<br>～');
  }

  function buildRow(item) {
    var note = item.note ? item.note : '&nbsp;';
    return (
      '<tr>' +
      '<td class="time-col">' + formatTime(item.time) + '</td>' +
      '<td class="location-col">' + item.location + '</td>' +
      '<td class="activity-col">' + item.activity + '</td>' +
      '<td class="note-col">' + note + '</td>' +
      '</tr>'
    );
  }

  function renderStaffSchedule() {
    var days = window.STAFF_SCHEDULE_DAYS;
    if (!Array.isArray(days) || days.length === 0) return;

    days.forEach(function (day) {
      var tbody = document.querySelector('[data-staff-schedule-tbody="' + day.id + '"]');
      if (!tbody) return;

      tbody.innerHTML = day.items.map(buildRow).join('');
    });
  }

  renderStaffSchedule();
})();
