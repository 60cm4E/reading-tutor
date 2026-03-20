// ===== Home Screen =====
import { CONTENT_DATA } from '../data.js';
import { keyboard, renderShortcutHints } from '../keyboard.js';

export function renderHome(container, ctx) {
  const { navigateTo, store } = ctx;
  const stars = store.getStars();

  if (ctx.section) {
    // Show readings within a section
    renderSectionDetail(container, ctx);
    return;
  }

  container.innerHTML = `
    <div class="home-screen">
      <div class="home-hero">
        <div class="home-hero-emoji">📚</div>
        <h1 class="home-hero-title">Reading Tutor</h1>
        <p class="home-hero-sub">영어 독해를 시작해볼까요?</p>
      </div>

      <div class="stars-summary">
        <span style="font-size: 1.5rem;">⭐</span>
        <span class="stars-summary-count">${stars}</span>
        <span class="stars-summary-label">개의 별을 모았어요!</span>
      </div>

      <div class="section-list" id="section-list">
        ${CONTENT_DATA.sections.map((section, i) => {
          const totalReadings = section.readings.length;
          const completedReadings = section.readings.filter(r => {
            const phases = store.getCompletedPhases(r.id);
            return phases.vocab && phases.reading && phases.quiz;
          }).length;

          return `
            <div class="section-card" id="section-${section.id}" style="animation-delay: ${i * 0.1 + 0.1}s;">
              <div class="section-card-header">
                <div class="section-card-icon" style="background: ${section.color}20; color: ${section.color};">
                  ${section.emoji}
                </div>
                <div class="section-card-info">
                  <div class="section-card-title">${section.title}</div>
                  <div class="section-card-sub">${section.theme} · ${completedReadings}/${totalReadings} 완료</div>
                </div>
                <div class="section-card-arrow">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                </div>
              </div>
              <div class="progress-bar" style="margin: 0 16px 12px;">
                <div class="progress-bar-fill" style="width: ${totalReadings ? (completedReadings/totalReadings)*100 : 0}%;"></div>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <div class="home-nav-bottom">
        <button class="nav-btn active" id="nav-home">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          홈
        </button>
        <button class="nav-btn" id="nav-admin">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          관리자
        </button>
      </div>

      ${renderShortcutHints([
        { keyLabel: '1~' + CONTENT_DATA.sections.length, description: '섹션 선택' },
      ])}
    </div>
  `;

  // Bind section clicks
  CONTENT_DATA.sections.forEach((section, i) => {
    document.getElementById(`section-${section.id}`)?.addEventListener('click', () => {
      navigateTo('section', { section });
    });
  });

  // Bind nav
  document.getElementById('nav-admin')?.addEventListener('click', () => {
    navigateTo('admin');
  });

  // Keyboard shortcuts
  const shortcuts = [];
  CONTENT_DATA.sections.forEach((section, i) => {
    if (i < 9) {
      shortcuts.push({
        key: String(i + 1),
        action: () => navigateTo('section', { section }),
      });
    }
  });
  keyboard.setShortcuts(shortcuts);
}

function renderSectionDetail(container, ctx) {
  const { navigateTo, store, section } = ctx;

  container.innerHTML = `
    <div class="home-screen">
      <div class="home-hero" style="padding: 20px 0 16px;">
        <div style="font-size: 3rem; margin-bottom: 8px;">${section.emoji}</div>
        <h2 style="font-family: var(--font-en); font-size: 1.4rem; font-weight: 800; color: var(--color-primary);">${section.title}</h2>
        <p style="font-size: 0.85rem; color: var(--color-text-light);">${section.theme}</p>
      </div>

      <div class="reading-list" style="padding: 0;">
        ${section.readings.map((reading, i) => {
          const phases = store.getCompletedPhases(reading.id);
          const allDone = phases.vocab && phases.reading && phases.quiz;

          return `
            <div class="reading-item ${allDone ? 'completed' : ''}" id="reading-${reading.id}" style="animation: fadeInUp 0.4s ease ${i * 0.1}s forwards; opacity: 0;">
              <div class="reading-item-num">${i + 1}</div>
              <div style="flex: 1;">
                <div class="reading-item-title" style="font-family: var(--font-en);">${reading.title}</div>
                <div style="font-size: 0.8rem; color: var(--color-text-light);">${reading.category}</div>
              </div>
              <div style="font-size: 1.6rem;">${reading.emoji}</div>
              <div class="reading-item-status">${allDone ? '✅' : '▶️'}</div>
            </div>
          `;
        }).join('')}
      </div>

      ${renderShortcutHints([
        { keyLabel: '1~' + section.readings.length, description: '읽기 선택' },
      ])}
    </div>
  `;

  section.readings.forEach((reading, i) => {
    document.getElementById(`reading-${reading.id}`)?.addEventListener('click', () => {
      navigateTo('reading-phases', { reading });
    });
  });

  // Keyboard shortcuts
  const shortcuts = [];
  section.readings.forEach((reading, i) => {
    if (i < 9) {
      shortcuts.push({
        key: String(i + 1),
        action: () => navigateTo('reading-phases', { reading }),
      });
    }
  });
  keyboard.setShortcuts(shortcuts);
}
