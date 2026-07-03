// ============================================================
// 東京・横浜チーム 行き帰りスケジュール（描画）
// ============================================================
// データの編集 → staff/tokyo-travel-data.js
// ============================================================

(function () {
  'use strict';

  function buildTable(section) {
    if (!section || !Array.isArray(section.items)) return '';

    var rows = section.items.map(function (item) {
      var note = item.note
        ? item.note
        : '<span class="travel-note-empty">—</span>';
      return (
        '<tr>' +
        '<td class="travel-time">' + item.time + '</td>' +
        '<td class="travel-detail">' + item.detail + '</td>' +
        '<td class="travel-note">' + note + '</td>' +
        '</tr>'
      );
    }).join('');

    return (
      '<table class="travel-schedule-table">' +
      '<thead><tr>' +
      '<th>時間</th><th>移動詳細</th><th>お願い・ご確認事項</th>' +
      '</tr></thead>' +
      '<tbody>' + rows + '</tbody>' +
      '</table>'
    );
  }

  function renderSection(key) {
    var container = document.querySelector('[data-travel-schedule="' + key + '"]');
    var section = window.TOKYO_TRAVEL_SCHEDULE && window.TOKYO_TRAVEL_SCHEDULE[key];
    if (!container || !section) return;

    var header =
      '<div class="travel-section-header">' +
      '<span class="travel-date">' + section.dateLabel + '</span>' +
      '<span class="travel-direction">' + section.directionLabel + '</span>' +
      '<span class="travel-train">' + section.trainLabel + '</span>' +
      '</div>';

    container.innerHTML = header + buildTable(section);
  }

  function renderAll() {
    renderSection('outbound');
    renderSection('return');
  }

  window.renderTokyoTravelSchedule = renderAll;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderAll);
  } else {
    renderAll();
  }
})();
