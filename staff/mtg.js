// ============================================
// Staff MTG Page - Toggle Functionality
// ============================================

/**
 * MTGセクションのトグル機能を初期化
 */
function initMTGToggle() {
    const mtgSections = document.querySelectorAll('[data-mtg-section]');
    
    if (mtgSections.length === 0) return;
    
    mtgSections.forEach(section => {
        const header = section.querySelector('.mtg-header');
        const content = section.querySelector('.mtg-content');
        const toggleIcon = section.querySelector('.mtg-toggle-icon');
        
        if (!header || !content || !toggleIcon) return;
        
        // ヘッダーをクリックで開閉
        header.addEventListener('click', function() {
            const isOpen = section.classList.contains('active');
            
            if (isOpen) {
                // 閉じる
                section.classList.remove('active');
                content.style.maxHeight = '0';
                toggleIcon.style.transform = 'rotate(0deg)';
            } else {
                // 開く
                section.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
                toggleIcon.style.transform = 'rotate(180deg)';
            }
        });
    });
}

// ページ読み込み時に初期化
document.addEventListener('DOMContentLoaded', function() {
    initMTGToggle();
});

