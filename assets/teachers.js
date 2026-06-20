// ============================================================
// 引率講師の紹介（Teachers）データ & 描画スクリプト
// ============================================================
//
// ★★★ 責任者の方へ：ここを編集してください ★★★
//
// 下の TEACHERS データを書き換えるだけで、講師紹介が更新されます。
// （index.html を直接さわる必要はありません）
//
// ■ 全体の形
//   TEACHERS = [ 校舎1, 校舎2, 校舎3, ... ]  ← 校舎ごとのかたまりが並んでいます
//
// ■ 校舎（タブ）の設定項目
//     label   … タブに表示する校舎名（例：「京大本校」）
//     members … その校舎の講師の配列（下記）
//
// ■ 講師カードの設定項目（members の中の { ... } 1つ＝講師1人）
//     name    … 講師の名前（カードのタイトルになります）
//     image   … 顔写真の画像パス。空 "" のままなら画像枠（プレースホルダー）が表示されます
//               例: 'assets/teachers/yamada.jpg'
//     message … 【教えるにあたっての思い】の本文（未入力なら仮テキストが表示されます）
//
// ■ よくある編集
//   ・講師を追加  → members の中に { name:'', image:'', message:'' }, を増やす
//   ・講師を削除  → 不要な { ... } のかたまりを削除
//   ・校舎を追加  → TEACHERS の末尾に { label:'', members:[ ... ] }, を増やす
//   ・順番の変更  → かたまりの並び順を入れ替え
//
// ============================================================

const TEACHERS = [
  // ───────── 校舎1：京大本校 ─────────
  {
    label: '京大本校',
    members: [
      {
        name: '井ノ本 洋斗',
        image: 'assets/teachers/inomoto_portrait.png', // 例: 'assets/teachers/kyodai_01.jpg'。空なら画像枠が表示されます
        message: 'どれだけ価値のあることでも、興味がなければ前向きに勉強するのは難しいものです。なので、学びよりも先に「その先にどんな面白いことが待っているのか」を伝えることにこだわっています。 日本・世界をリードするようなエンジニアがBeEngineerから輩出することが僕の野望です！そのための授業を作っていくので、ついてきてください！',
      },
    ],
  },

  // ───────── 校舎2：梅田校 ─────────
  {
    label: '梅田校',
    members: [
      {
        name: '藤原 圭吾',
        image: 'assets/teachers/fujiwara_portrait.png', // 例: 'assets/teachers/umeda_01.jpg'。空なら画像枠が表示されます
        message: '「ワクワクするもの！」「面白いもの！」を一緒に作れるようになりませんか？そのための「実践的なプログラミング」を楽しく教える・伝えることを意識しています。 BeEngineerを通し、一緒に学んでいきましょう！',
      },
    ],
  },

  // ───────── 校舎3：沖縄首里校 ─────────
  {
    label: '沖縄首里校',
    members: [
      {
        name: '大湾 政志朗',
        image: 'assets/teachers/owan_portrait.png', // 例: 'assets/teachers/shuri_01.jpg'。空なら画像枠が表示されます
        message: 'プログラミングは、教科書を読むよりも一回の『エラー』から学べることの方が多い分野です。私自身も、日々エラーと格闘しながら学んでいます。授業では、『失敗を恐れず、まずは作ってみる』ことを一番大切にします。技術的な正解を求めるだけでなく、試行錯誤しながら自分のアイデアを形にする『実践の楽しさ』を、皆さんと共に探求していきたいです。',
      },
    ],
  },
];

// ============================================================
// ▼▼▼ ここから下は描画処理です（基本的に編集不要） ▼▼▼
// ============================================================

(function () {
  'use strict';

  // HTMLとして安全に表示するためのエスケープ処理
  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // 講師カード1枚分のHTML（名前タイトル＋トグルで開閉）
  function buildTeacherCard(member) {
    var name = escapeHtml(member && member.name ? member.name : '講師名（未設定）');
    var message = escapeHtml(
      member && member.message ? member.message : 'ここに【教えるにあたっての思い】が入ります。（準備中）'
    );

    // 顔写真（未設定ならプレースホルダー枠）
    var imageHtml;
    if (member && member.image) {
      imageHtml =
        '<div class="teacher-photo">' +
        '<img src="' + escapeHtml(member.image) + '" alt="' + name + '" loading="lazy">' +
        '</div>';
    } else {
      imageHtml =
        '<div class="teacher-photo teacher-photo-placeholder">' +
        '<span class="teacher-photo-icon">👤</span>' +
        '<span class="teacher-photo-text">写真を準備中</span>' +
        '</div>';
    }

    return (
      '<div class="teacher-card" data-teacher-card>' +
      '<div class="teacher-card-header" data-teacher-header>' +
      '<span class="teacher-card-name">' + name + '</span>' +
      '<span class="teacher-card-icon">▼</span>' +
      '</div>' +
      '<div class="teacher-card-content">' +
      '<div class="teacher-card-inner">' +
      imageHtml +
      '<div class="teacher-message">' +
      '<h4 class="teacher-message-title">教えるにあたっての思い</h4>' +
      '<p class="teacher-message-text">' + message + '</p>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>'
    );
  }

  function render() {
    var tabsContainer = document.querySelector('[data-teachers-tabs]');
    var panelsContainer = document.querySelector('[data-teachers-panels]');
    if (!tabsContainer || !panelsContainer) return; // 講師セクションが無いページでは何もしない

    if (!Array.isArray(TEACHERS) || TEACHERS.length === 0) {
      panelsContainer.innerHTML = '<p class="teachers-empty">講師情報は準備中です。</p>';
      return;
    }

    var tabsHtml = '';
    var panelsHtml = '';

    TEACHERS.forEach(function (campus, index) {
      var label = escapeHtml(campus && campus.label ? campus.label : '校舎' + (index + 1));
      var isActive = index === 0; // 最初の校舎を初期表示
      var key = 'campus-' + index;

      tabsHtml +=
        '<button class="teachers-tab-btn' + (isActive ? ' active' : '') + '" ' +
        'data-teachers-tab="' + key + '" role="tab" ' +
        'aria-selected="' + (isActive ? 'true' : 'false') + '">' +
        label +
        '</button>';

      var members = (campus && Array.isArray(campus.members)) ? campus.members : [];
      var cardsHtml = members.length
        ? members.map(buildTeacherCard).join('')
        : '<p class="teachers-empty">この校舎の講師情報は準備中です。</p>';

      panelsHtml +=
        '<div class="teachers-panel' + (isActive ? ' active' : '') + '" ' +
        'data-teachers-content="' + key + '" role="tabpanel">' +
        cardsHtml +
        '</div>';
    });

    tabsContainer.innerHTML = tabsHtml;
    panelsContainer.innerHTML = panelsHtml;

    initTabs(tabsContainer, panelsContainer);
    initCardToggles(panelsContainer);
  }

  // 校舎タブの切り替え
  function initTabs(tabsContainer, panelsContainer) {
    var tabButtons = tabsContainer.querySelectorAll('.teachers-tab-btn');
    var panels = panelsContainer.querySelectorAll('[data-teachers-content]');

    tabButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var key = this.getAttribute('data-teachers-tab');

        tabButtons.forEach(function (b) {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        panels.forEach(function (p) {
          p.classList.remove('active');
        });

        this.classList.add('active');
        this.setAttribute('aria-selected', 'true');
        var target = panelsContainer.querySelector('[data-teachers-content="' + key + '"]');
        if (target) target.classList.add('active');
      });
    });
  }

  // 講師カードの開閉トグル（名前タイトルをクリック）
  function initCardToggles(panelsContainer) {
    var cards = panelsContainer.querySelectorAll('[data-teacher-card]');
    cards.forEach(function (card) {
      var header = card.querySelector('[data-teacher-header]');
      if (!header) return;
      header.addEventListener('click', function () {
        card.classList.toggle('active');
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
