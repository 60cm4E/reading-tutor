// ===== Phase 2: Reading Passage =====
import { tts } from '../tts.js';
import { showConfetti, showToast, delay } from '../utils.js';

export function renderReading(container, ctx) {
  const { navigateTo, store, reading } = ctx;
  const passage = reading.passage;
  let showTranslations = false;
  let currentSentenceIdx = -1;
  let isReadingAll = false;

  function render() {
    container.innerHTML = `
      <div class="reading-screen">
        <div class="reading-title-area">
          <div style="font-size: 2.5rem; margin-bottom: 8px;">${reading.emoji}</div>
          <h2 class="reading-title">${reading.title}</h2>
          <p class="reading-subtitle">${reading.category} · 문장을 터치하면 읽어줘요!</p>
        </div>

        <div class="reading-controls">
          <button class="read-all-btn" id="read-all">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            전체 읽기
          </button>
          <button class="translate-toggle-btn ${showTranslations ? 'active' : ''}" id="toggle-translate">
            🇰🇷 해석 ${showTranslations ? '숨기기' : '보기'}
          </button>
        </div>

        <div class="passage-container" id="passage">
          ${passage.map((sent, i) => `
            <div class="passage-sentence" id="sent-${i}" data-idx="${i}">
              ${sent.en.split(' ').map((word, wi) => `<span class="passage-word" data-word-idx="${wi}">${word}</span>`).join(' ')}
            </div>
            <div class="sentence-translation ${showTranslations ? 'show' : ''}" id="trans-${i}">${sent.ko}</div>
          `).join('')}
        </div>

        <div style="text-align: center; margin-top: 24px;">
          <button class="btn btn-success btn-lg btn-block" id="finish-reading">
            읽기 완료! ✓
          </button>
          <p style="font-size: 0.8rem; color: var(--color-text-light); margin-top: 8px;">따라 말하기 모드: 문장을 길게 누르세요</p>
        </div>
      </div>
    `;

    bindEvents();
  }

  function bindEvents() {
    // Sentence click -> TTS with karaoke
    passage.forEach((sent, i) => {
      const sentEl = document.getElementById(`sent-${i}`);
      if (!sentEl) return;

      sentEl.addEventListener('click', async () => {
        if (isReadingAll) return;
        await readSentenceWithKaraoke(i);
      });

      // Long press -> Shadowing mode
      let longPressTimer;
      sentEl.addEventListener('touchstart', (e) => {
        longPressTimer = setTimeout(() => {
          e.preventDefault();
          openShadowingMode(i);
        }, 600);
      });
      sentEl.addEventListener('touchend', () => clearTimeout(longPressTimer));
      sentEl.addEventListener('touchmove', () => clearTimeout(longPressTimer));

      // Mouse long press
      sentEl.addEventListener('mousedown', () => {
        longPressTimer = setTimeout(() => openShadowingMode(i), 600);
      });
      sentEl.addEventListener('mouseup', () => clearTimeout(longPressTimer));
      sentEl.addEventListener('mouseleave', () => clearTimeout(longPressTimer));
    });

    // Read all
    document.getElementById('read-all')?.addEventListener('click', async () => {
      if (isReadingAll) return;
      isReadingAll = true;
      const btn = document.getElementById('read-all');
      btn.textContent = '⏹ 읽는 중...';

      for (let i = 0; i < passage.length; i++) {
        if (!isReadingAll) break;
        await readSentenceWithKaraoke(i);
        await delay(400);
      }

      isReadingAll = false;
      if (btn) btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg> 전체 읽기`;
    });

    // Toggle translations
    document.getElementById('toggle-translate')?.addEventListener('click', () => {
      showTranslations = !showTranslations;
      document.querySelectorAll('.sentence-translation').forEach(el => {
        el.classList.toggle('show', showTranslations);
      });
      const btn = document.getElementById('toggle-translate');
      btn.classList.toggle('active', showTranslations);
      btn.innerHTML = `🇰🇷 해석 ${showTranslations ? '숨기기' : '보기'}`;
    });

    // Finish
    document.getElementById('finish-reading')?.addEventListener('click', () => {
      tts.stop();
      isReadingAll = false;
      store.markPhaseComplete(reading.id, 'reading');
      store.addStars(2);
      showConfetti();
      showToast('🎉 읽기 완료! ⭐+2');
      setTimeout(() => navigateTo('reading-phases', { reading }), 1500);
    });
  }

  async function readSentenceWithKaraoke(idx) {
    const sent = passage[idx];
    const sentEl = document.getElementById(`sent-${idx}`);
    if (!sentEl) return;

    // Clear previous highlights
    document.querySelectorAll('.passage-sentence').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.passage-word').forEach(el => el.classList.remove('highlight'));

    sentEl.classList.add('active');
    sentEl.scrollIntoView({ behavior: 'smooth', block: 'center' });

    const words = sentEl.querySelectorAll('.passage-word');
    currentSentenceIdx = idx;

    // Karaoke callback
    let lastWordIdx = -1;
    await tts.speakSentenceWithKaraoke(sent.en, (charIndex) => {
      // Find which word this character belongs to
      const textUpToChar = sent.en.substring(0, charIndex);
      const wordIdx = textUpToChar.split(' ').length - 1;

      if (wordIdx !== lastWordIdx && wordIdx < words.length) {
        words.forEach(w => w.classList.remove('highlight'));
        words[wordIdx]?.classList.add('highlight');
        lastWordIdx = wordIdx;
      }
    });

    // Clear highlights after reading
    words.forEach(w => w.classList.remove('highlight'));
  }

  function openShadowingMode(idx) {
    const sent = passage[idx];
    tts.stop();

    const overlay = document.createElement('div');
    overlay.className = 'shadowing-overlay';
    overlay.innerHTML = `
      <div class="shadowing-card">
        <div style="font-size: 0.85rem; color: var(--color-primary); font-weight: 700; margin-bottom: 8px;">🎤 따라 말하기</div>
        <div class="shadowing-sentence">${sent.en}</div>
        <div style="font-size: 0.9rem; color: var(--color-text-light); margin-bottom: 16px;">${sent.ko}</div>
        <div class="shadowing-timer" id="shadow-timer">🔊</div>
        <div class="shadowing-instruction" id="shadow-instruction">먼저 들어보세요</div>
        <div class="shadowing-controls">
          <button class="btn btn-primary" id="shadow-listen">🔊 듣기</button>
          <button class="btn btn-accent" id="shadow-repeat">🎤 따라하기</button>
          <button class="btn btn-secondary" id="shadow-close">닫기</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    // User must click "듣기" button to start (auto-play blocked on mobile)

    document.getElementById('shadow-listen')?.addEventListener('click', () => {
      tts.speakSentence(sent.en);
      document.getElementById('shadow-instruction').textContent = '잘 듣고 있어요...';
    });

    document.getElementById('shadow-repeat')?.addEventListener('click', async () => {
      const timer = document.getElementById('shadow-timer');
      const instruction = document.getElementById('shadow-instruction');

      instruction.textContent = '먼저 한 번 더 들어볼게요...';
      await tts.speakSentence(sent.en);
      await delay(500);

      instruction.textContent = '이제 따라 말해보세요! 🎤';
      timer.classList.add('recording');
      timer.textContent = '3';

      for (let i = 3; i >= 1; i--) {
        timer.textContent = i;
        await delay(1000);
      }

      timer.classList.remove('recording');
      timer.textContent = '👏';
      instruction.textContent = '잘했어요! 다시 들어보세요.';
      await delay(500);
      tts.speakSentence(sent.en);
    });

    document.getElementById('shadow-close')?.addEventListener('click', () => {
      tts.stop();
      overlay.remove();
    });

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        tts.stop();
        overlay.remove();
      }
    });
  }

  render();
}
