/**
 * 共通フッターコンポーネント
 *
 * 使い方:
 *   <div id="site-footer"></div>
 *   <script src="（assetsまでの相対パス）/footer.js"></script>
 *
 * 画像パスはこのスクリプトの配置場所から自動解決されるので、
 * ルート/サブディレクトリのどちらから読み込んでも動作する。
 *
 * 文言・年号を変更する場合はこのファイルを編集すれば全ページに反映される。
 */
(function () {
  // 年号などここで一元管理
  const COPYRIGHT_YEAR = 2026;

  // このスクリプト自身のURLを基に assets/ のベースURLを決定。
  // currentScript は defer/async/module 読み込み時に null になり得るのでフォールバック。
  const scriptEl = document.currentScript
    || document.querySelector('script[src$="/footer.js"]');
  const assetsBase = scriptEl ? new URL('.', scriptEl.src).href : '';

  const footerHTML = `
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-character footer-character-left">
          <img src="${assetsBase}fav/dot_girl.svg" alt="" class="footer-character-img">
        </div>
        <div class="footer-main">
          <div class="footer-logo-wrapper">
            <div class="footer-logo">
              <a href="https://logosland.jp/" target="_blank" rel="noopener noreferrer"><span>LOGOS LAND</span> </a><br class="sp-br">
              ×<br class="sp-br">
              <a href="https://be-engineer.tech/" target="_blank" rel="noopener noreferrer"> <span>BeEngineer</span></a>
            </div>
          </div>
          <div class="footer-info">
            京大ITベンチャー発、<br class="sp-br">実践的なチカラを鍛える<br>
            中高生対象の<br class="sp-br">プログラミング塾
          </div>
          <div class="footer-links">
            <span>京大本校</span>
            <span>梅田校</span>
            <span>飯田橋校</span>
            <span>横浜校</span>
            <span>首里校</span>
          </div>
          <div class="footer-copyright">
            © ${COPYRIGHT_YEAR} BeEngineer. All Rights Reserved.
          </div>
        </div>
        <div class="footer-character footer-character-right">
          <img src="${assetsBase}fav/dot_boy.svg" alt="" class="footer-character-img">
        </div>
      </div>
    </footer>
  `;

  function render() {
    const placeholder = document.getElementById('site-footer');
    if (placeholder) {
      placeholder.outerHTML = footerHTML;
    } else {
      console.error('[footer.js] #site-footer が見つかりません。');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
