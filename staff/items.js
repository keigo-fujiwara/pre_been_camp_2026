// ============================================
// Staff Items Checklist Management
// ============================================

/**
 * スタッフ持ち物チェックリストの管理
 * localStorageを使用してチェック状態を保存
 */

// ページ読み込み時に初期化
document.addEventListener('DOMContentLoaded', function() {
    initStaffItemsChecklist();
});

/**
 * チェックリストの初期化
 */
function initStaffItemsChecklist() {
    const checkboxes = document.querySelectorAll('.checklist input[type="checkbox"]');
    
    if (checkboxes.length === 0) return;
    
    // 保存されたチェック状態を読み込み
    checkboxes.forEach(checkbox => {
        const itemId = checkbox.getAttribute('data-item');
        const savedState = localStorage.getItem(itemId);
        
        if (savedState === 'true') {
            checkbox.checked = true;
        }
        
        // チェック状態が変更されたら保存
        checkbox.addEventListener('change', function() {
            localStorage.setItem(itemId, this.checked);
            updateProgress();
        });
    });
    
    // 初期進捗状況を表示
    updateProgress();
}

/**
 * チェック進捗状況を更新
 */
function updateProgress() {
    const checkboxes = document.querySelectorAll('.checklist input[type="checkbox"]');
    const checkedCount = document.querySelectorAll('.checklist input[type="checkbox"]:checked').length;
    const totalCount = checkboxes.length;
    const percentage = Math.round((checkedCount / totalCount) * 100);
    
    // 進捗バーがあれば更新（後で追加する場合に備えて）
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    
    if (progressBar) {
        progressBar.style.width = percentage + '%';
    }
    
    if (progressText) {
        progressText.textContent = `${checkedCount} / ${totalCount} (${percentage}%)`;
    }
    
    // コンソールに進捗を表示
    console.log(`チェック進捗: ${checkedCount} / ${totalCount} (${percentage}%)`);
}

/**
 * すべてのチェックをクリア（デバッグ用）
 */
function clearAllChecks() {
    const checkboxes = document.querySelectorAll('.checklist input[type="checkbox"]');
    
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
        const itemId = checkbox.getAttribute('data-item');
        localStorage.removeItem(itemId);
    });
    
    updateProgress();
    console.log('すべてのチェックをクリアしました');
}

// デバッグ用：コンソールからclearAllChecks()を呼び出せるようにグローバルに公開
window.clearAllStaffChecks = clearAllChecks;

