// ============================================================
// お知らせ（News）データ & 描画スクリプト
// ============================================================
//
// ★★★ 責任者の方へ：ここを編集してください ★★★
//
// 下の NEWS_ITEMS 配列を書き換えるだけで、お知らせカードが更新されます。
// （index.html を直接さわる必要はありません）
//
// ・各カードの設定項目：
//     icon        … カード左上のアイコン（絵文字でOK）
//     title       … カードのタイトル
//     description … 短い説明文（未入力なら仮テキストが表示されます）
//     linkLabel   … ボタンの文字（例：「詳細を確認する」）
//     linkUrl     … ボタンのリンク先URL。空 "" のままなら「準備中」表示になります
//     image       … 顔写真などの画像。空 "" のままなら画像枠（プレースホルダー）が表示されます
//                   ※ image 項目を書かないカードは、画像枠なしの通常カードになります
//
// ・ボタンを消したいカード … linkUrl と linkLabel の2行をどちらも削除してください
//                            （両方無いカードは、ボタンが表示されなくなります）
//
// ・カードを増やす  → { ... } のかたまりを , で区切ってコピーして追加
// ・カードを減らす  → 不要な { ... } のかたまりを削除
// ・順番を変える    → { ... } の並び順を入れ替え
//
// ============================================================

const NEWS_ITEMS = [
  // 1. 忘れ物確認
  {
    icon: '🎒',
    title: '忘れ物確認',
    description: '出発前の持ち物チェックについてのお知らせをこちらに掲載します。（ここに本文が入ります）',
    linkLabel: '詳細を確認する',
    linkUrl: '', // 例: '#items' や 'https://...' を入れてください
  },

  // 2. マップの確認
  {
    icon: '🗺️',
    title: 'マップの確認',
    description: '会場のフロアマップ・集合場所についてのお知らせをこちらに掲載します。（ここに本文が入ります）',
    linkLabel: '詳細を確認する',
    linkUrl: '#floormap', // 例: '#floormap' を入れてください
  },

  // 3. 電車の待ち合わせ
  {
    icon: '🚃',
    title: '電車の待ち合わせ',
    description: '集合駅・待ち合わせ時間についてのお知らせをこちらに掲載します。（ここに本文が入ります）',
    linkLabel: '詳細を確認する',
    linkUrl: '', // 例: '#access' を入れてください
  },

  // 4. 集合時間の確認
  {
    icon: '⏰',
    title: '集合時間の確認',
    description: '当日の集合時間についてのお知らせをこちらに掲載します。（ここに本文が入ります）',
    linkLabel: '詳細を確認する',
    linkUrl: '', // 例: '#schedule' を入れてください
  },

  // 5. 引率講師の顔写真（← このカードには画像枠があります）
  {
    icon: '👨‍🏫',
    title: '引率講師の紹介',
    description: '当日の引率講師をご紹介します。写真は後日掲載いたします。（ここに本文が入ります）',
    
    image: '', // 例: 'assets/news/teacher.jpg' を入れてください。空なら画像枠が表示されます
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

  // 1枚分のカードHTMLを組み立てる
  function buildCard(item) {
    var icon = escapeHtml(item.icon || '📌');
    var title = escapeHtml(item.title || 'タイトル未設定');
    var description = escapeHtml(item.description || 'こちらにお知らせ内容が入ります。（準備中）');

    // 画像枠（image プロパティを持つカードのみ）
    var imageHtml = '';
    if (Object.prototype.hasOwnProperty.call(item, 'image')) {
      if (item.image) {
        imageHtml =
          '<div class="news-card-image">' +
          '<img src="' + escapeHtml(item.image) + '" alt="' + title + '" loading="lazy">' +
          '</div>';
      } else {
        // 画像未設定：あとから差し替えやすいプレースホルダー枠
        imageHtml =
          '<div class="news-card-image news-card-image-placeholder">' +
          '<span class="news-card-image-icon">🖼️</span>' +
          '<span class="news-card-image-text">画像を準備中</span>' +
          '</div>';
      }
    }

    // ボタン／リンク欄
    // linkUrl も linkLabel も書かれていないカードは、ボタンを表示しません。
    var hasButton =
      Object.prototype.hasOwnProperty.call(item, 'linkUrl') ||
      Object.prototype.hasOwnProperty.call(item, 'linkLabel');
    var linkAreaHtml = '';
    if (hasButton) {
      var linkLabel = escapeHtml(item.linkLabel || '詳細を確認する');
      var linkHtml;
      if (item.linkUrl) {
        linkHtml = '<a class="news-card-btn" href="' + escapeHtml(item.linkUrl) + '">' + linkLabel + '</a>';
      } else {
        // リンク未設定：見た目が崩れないよう「準備中」のロック表示
        linkHtml = '<span class="news-card-btn news-card-btn-disabled">準備中</span>';
      }
      linkAreaHtml = '<div class="news-card-link-area">' + linkHtml + '</div>';
    }

    return (
      '<article class="news-card">' +
      '<div class="news-card-icon">' + icon + '</div>' +
      imageHtml +
      '<h4 class="news-card-title">' + title + '</h4>' +
      '<p class="news-card-desc">' + description + '</p>' +
      linkAreaHtml +
      '</article>'
    );
  }

  function renderNews() {
    var container = document.querySelector('[data-news-list]');
    if (!container) return; // お知らせセクションが無いページでは何もしない

    if (!Array.isArray(NEWS_ITEMS) || NEWS_ITEMS.length === 0) {
      container.innerHTML =
        '<p class="news-empty">現在、お知らせはありません。</p>';
      return;
    }

    container.innerHTML = NEWS_ITEMS.map(buildCard).join('');
  }

  // お知らせセクションの開閉トグル（上のLINEセクションと同じ挙動）
  function initNewsToggle() {
    var newsBox = document.querySelector('[data-news-toggle]');
    if (!newsBox) return;

    var header = newsBox.querySelector('.news-toggle-header');
    if (!header) return;

    header.addEventListener('click', function () {
      newsBox.classList.toggle('active');
    });
  }

  function init() {
    renderNews();
    initNewsToggle();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
