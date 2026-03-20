// ===== Phase 1: Vocabulary Learning =====
import { tts } from '../tts.js';
import { playCorrect, playWrong, playStar } from '../sfx.js';
import { showConfetti, showToast, shuffleArray, delay } from '../utils.js';
import { getPhonicsForReading } from '../data.js';
import { keyboard, renderShortcutHints } from '../keyboard.js';

export function renderVocab(container, ctx) {
  const { navigateTo, store, reading, subPhase } = ctx;

  // Clean up any previous spelling keydown handler when entering vocab view
  if (window._spellingKeydownHandler) {
    document.removeEventListener('keydown', window._spellingKeydownHandler);
    window._spellingKeydownHandler = null;
  }

  switch (subPhase) {
    case 'phonics':
      renderPhonics(container, ctx);
      break;
    case 'cards':
      renderVocabCards(container, ctx);
      break;
    case 'meaningTest':
      renderMeaningTest(container, ctx);
      break;
    case 'spellingTest':
      renderSpellingTest(container, ctx);
      break;
    case 'sentenceBuild':
      renderSentenceBuild(container, ctx);
      break;
    default:
      renderPhonics(container, ctx);
  }
}

// ===== Phonics Intro =====
function renderPhonics(container, ctx) {
  const { navigateTo, reading } = ctx;
  const phonicsData = getPhonicsForReading(reading);
  let currentIdx = 0;

  function render() {
    const p = phonicsData[currentIdx];
    container.innerHTML = `
      <div class="phonics-screen">
        <div style="text-align: center; margin-bottom: 8px;">
          <span class="badge badge-primary">파닉스 소개</span>
          <span style="font-size: 0.8rem; color: var(--color-text-light); margin-left: 8px;">${currentIdx + 1} / ${phonicsData.length}</span>
        </div>
        <div class="progress-bar" style="margin: 0 0 12px;">
          <div class="progress-bar-fill" style="width: ${((currentIdx + 1) / phonicsData.length) * 100}%;"></div>
        </div>
        <div class="phonics-card-wrapper">
          <div class="phonics-zone phonics-zone-letter" id="zone-letter">
            <div class="phonics-letter">${p.upper}</div>
            <div class="phonics-letter-lower">${p.lower}</div>
            <div class="phonics-sound">${p.sound}</div>
            <button class="phonics-speak-btn phonics-speak-btn-letter" id="speak-letter" aria-label="알파벳 소리 듣기">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 010 7.07"/></svg>
              <span>소리 듣기</span>
            </button>
          </div>
          <div class="phonics-zone phonics-zone-word" id="zone-word">
            <span style="font-size: 0.8rem; color: var(--color-text-light); display: block; margin-bottom: 4px;">예시 단어</span>
            <div class="phonics-example-word">
              ${p.example.split('').map(ch =>
                ch.toLowerCase() === p.letter ? `<mark>${ch}</mark>` : ch
              ).join('')}
            </div>
            <span style="font-size: 0.85rem; color: var(--color-text-light); display: block; margin-top: 4px;">(${p.exampleKo})</span>
            <button class="phonics-speak-btn phonics-speak-btn-word" id="speak-word" aria-label="단어 발음 듣기">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 010 7.07"/></svg>
              <span>단어 발음 듣기</span>
            </button>
          </div>
        </div>
        <div class="phonics-nav">
          ${currentIdx > 0 ? '<button class="btn btn-secondary" id="phonics-prev">◀ 이전</button>' : ''}
          <button class="btn btn-primary" id="phonics-next">${currentIdx < phonicsData.length - 1 ? '다음 ▶' : '단어 학습 시작 📖'}</button>
        </div>
        <div class="phonics-dots">
          ${phonicsData.map((_, i) => `<div class="phonics-dot ${i === currentIdx ? 'active' : ''}"></div>`).join('')}
        </div>
        ${renderShortcutHints([
          { keyLabel: '←', description: '이전' },
          { keyLabel: '→', description: '다음' },
          { keyLabel: 'S', description: '알파벳 소리' },
          { keyLabel: 'W', description: '단어 발음' },
        ])}
      </div>
    `;

    // Letter zone click -> speak phonics sound
    const zoneLetterEl = document.getElementById('zone-letter');
    const speakLetterBtn = document.getElementById('speak-letter');

    function speakLetterSound() {
      speakLetterBtn.classList.add('speaking');
      tts.speakPhonicsSound(p.ttsSound).then(() => speakLetterBtn.classList.remove('speaking'));
    }

    zoneLetterEl?.addEventListener('click', (e) => {
      if (e.target.closest('#speak-letter')) return;
      speakLetterSound();
    });
    speakLetterBtn?.addEventListener('click', speakLetterSound);

    // Word zone click -> speak example word
    const zoneWordEl = document.getElementById('zone-word');
    const speakWordBtn = document.getElementById('speak-word');

    function speakExampleWord() {
      speakWordBtn.classList.add('speaking');
      tts.speakWord(p.example).then(() => speakWordBtn.classList.remove('speaking'));
    }

    zoneWordEl?.addEventListener('click', (e) => {
      if (e.target.closest('#speak-word')) return;
      speakExampleWord();
    });
    speakWordBtn?.addEventListener('click', speakExampleWord);

    function goPrev() {
      if (currentIdx > 0) { currentIdx--; render(); }
    }
    function goNext() {
      if (currentIdx < phonicsData.length - 1) {
        currentIdx++;
        render();
      } else {
        // C8: Mini phonics quiz before moving to cards
        renderPhonicsQuiz(container, ctx, phonicsData);
      }
    }

    document.getElementById('phonics-prev')?.addEventListener('click', goPrev);
    document.getElementById('phonics-next')?.addEventListener('click', goNext);

    // Keyboard shortcuts
    keyboard.setShortcuts([
      { key: 'ArrowLeft', action: goPrev, description: '이전' },
      { key: 'ArrowRight', action: goNext, description: '다음' },
      { key: 'Enter', action: goNext, description: '다음' },
      { key: 's', action: speakLetterSound, description: '알파벳 소리' },
      { key: 'w', action: speakExampleWord, description: '단어 발음' },
      { key: 'Space', action: speakLetterSound, description: '소리 듣기' },
    ]);
  }

  render();
}

// ===== Phonics Mini Quiz (C8) =====
function renderPhonicsQuiz(container, ctx, phonicsData) {
  const { navigateTo, reading } = ctx;
  const quizItems = shuffleArray([...phonicsData]).slice(0, Math.min(3, phonicsData.length));
  let qIdx = 0;
  let score = 0;

  function renderQ() {
    if (qIdx >= quizItems.length) {
      // Quiz done
      container.innerHTML = `
        <div style="text-align: center; padding: 40px 20px;">
          <div style="font-size: 3rem; margin-bottom: 16px;">🎉</div>
          <h2 style="font-weight: 800; color: var(--color-primary);">파닉스 퀴즈 완료!</h2>
          <p style="font-size: 1.1rem; margin: 12px 0;">${score}/${quizItems.length} 정답</p>
          <button class="btn btn-primary" id="go-cards" style="margin-top: 16px;">단어 학습 시작 📖</button>
        </div>
      `;
      document.getElementById('go-cards')?.addEventListener('click', () => {
        navigateTo('vocab', { reading, subPhase: 'cards' });
      });
      keyboard.setShortcuts([{ key: 'Enter', action: () => navigateTo('vocab', { reading, subPhase: 'cards' }) }]);
      return;
    }

    const q = quizItems[qIdx];
    // Generate 3 wrong choices + 1 correct
    const allLetters = phonicsData.map(p => p.upper);
    const wrongChoices = shuffleArray(allLetters.filter(l => l !== q.upper)).slice(0, 3);
    const choices = shuffleArray([q.upper, ...wrongChoices]);

    container.innerHTML = `
      <div style="padding: 20px; text-align: center;">
        <div style="margin-bottom: 8px;">
          <span class="badge badge-primary">파닉스 퀴즈</span>
          <span style="font-size: 0.8rem; color: var(--color-text-light); margin-left: 8px;">${qIdx + 1} / ${quizItems.length}</span>
        </div>
        <div class="progress-bar" style="margin: 0 0 24px;">
          <div class="progress-bar-fill" style="width: ${(qIdx / quizItems.length) * 100}%;"></div>
        </div>
        <p style="font-size: 1.1rem; font-weight: 700; margin-bottom: 16px;">🔊 소리를 듣고 맞는 글자를 고르세요!</p>
        <button class="btn btn-primary" id="play-sound" style="margin-bottom: 24px; font-size: 1.2rem; padding: 12px 32px;">
          🔊 소리 듣기
        </button>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; max-width: 300px; margin: 0 auto;">
          ${choices.map((ch, i) => `
            <button class="btn btn-secondary quiz-letter-btn" id="choice-${i}" data-letter="${ch}" style="font-size: 1.5rem; font-weight: 900; padding: 20px; font-family: var(--font-en);">
              <span class="word-block-num" style="font-size: 0.7rem;">${i + 1}</span> ${ch}
            </button>
          `).join('')}
        </div>
        ${renderShortcutHints([
          { keyLabel: 'Space', description: '소리 듣기' },
          { keyLabel: '1~4', description: '답 선택' },
        ])}
      </div>
    `;

    function playQSound() {
      tts.speakPhonicsSound(q.ttsSound);
    }

    // Auto-play sound
    setTimeout(playQSound, 300);

    document.getElementById('play-sound')?.addEventListener('click', playQSound);

    choices.forEach((ch, i) => {
      document.getElementById(`choice-${i}`)?.addEventListener('click', () => selectAnswer(ch, i));
    });

    function selectAnswer(ch, btnIdx) {
      const btns = document.querySelectorAll('.quiz-letter-btn');
      btns.forEach(b => { b.disabled = true; });

      if (ch === q.upper) {
        score++;
        playCorrect();
        document.getElementById(`choice-${btnIdx}`).style.background = 'var(--color-success)';
        document.getElementById(`choice-${btnIdx}`).style.color = 'white';
        showToast('정답! 🎉');
      } else {
        playWrong();
        document.getElementById(`choice-${btnIdx}`).style.background = 'var(--color-danger)';
        document.getElementById(`choice-${btnIdx}`).style.color = 'white';
        // Highlight correct
        btns.forEach(b => {
          if (b.dataset.letter === q.upper) {
            b.style.background = 'var(--color-success)';
            b.style.color = 'white';
          }
        });
        showToast(`정답은 ${q.upper} 이에요!`);
      }
      setTimeout(() => { qIdx++; renderQ(); }, 1200);
    }

    keyboard.setShortcuts([
      { key: 'Space', action: playQSound },
      { key: '1', action: () => selectAnswer(choices[0], 0) },
      { key: '2', action: () => selectAnswer(choices[1], 1) },
      { key: '3', action: () => selectAnswer(choices[2], 2) },
      { key: '4', action: () => selectAnswer(choices[3], 3) },
    ]);
  }

  renderQ();
}

// ===== Vocabulary Cards =====
function renderVocabCards(container, ctx) {
  const { navigateTo, store, reading } = ctx;
  const vocab = reading.vocabulary;
  const previouslyLearned = store.getState().learnedWords || [];
  let currentIdx = 0;

  function render() {
    const v = vocab[currentIdx];
    const isReview = previouslyLearned.includes(v.word.toLowerCase());

    container.innerHTML = `
      <div class="vocab-screen">
        <div style="text-align: center; margin-bottom: 8px;">
          <span class="badge badge-primary">단어 카드</span>
          <span style="font-size: 0.8rem; color: var(--color-text-light); margin-left: 8px;">${currentIdx + 1} / ${vocab.length}</span>
        </div>
        <div class="progress-bar" style="margin: 0 0 8px;">
          <div class="progress-bar-fill" style="width: ${((currentIdx + 1) / vocab.length) * 100}%;"></div>
        </div>
        <div class="vocab-card" id="vocab-card">
          <div class="vocab-card-image">${v.image}</div>
          <div class="vocab-card-body">
            ${isReview ? '<div class="word-review-badge">🔄 지난번에 배웠던 단어!</div>' : ''}
            <div class="vocab-word">${v.word}</div>
            <div class="vocab-syllable">${v.ipa || ''}</div>
            <div class="vocab-meaning">${v.meaning}</div>
            <button class="vocab-speaker-btn" id="speak-word" aria-label="발음 듣기">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/></svg>
            </button>
          </div>
        </div>
        <div class="vocab-nav">
          ${currentIdx > 0 ? '<button class="btn btn-secondary" id="vocab-prev">◀ 이전</button>' : ''}
          <button class="btn btn-primary" id="vocab-next">${currentIdx < vocab.length - 1 ? '다음 ▶' : '뜻 테스트 시작 ✏️'}</button>
        </div>
        ${renderShortcutHints([
          { keyLabel: '←', description: '이전' },
          { keyLabel: '→', description: '다음' },
          { keyLabel: 'Space', description: '발음 듣기' },
        ])}
      </div>
    `;

    function speakWord() {
      const btn = document.getElementById('speak-word');
      btn.classList.add('speaking');
      tts.speakWord(v.word).then(() => btn.classList.remove('speaking'));
    }

    // TTS
    document.getElementById('speak-word')?.addEventListener('click', speakWord);

    // Card click to hear word
    document.getElementById('vocab-card')?.addEventListener('click', (e) => {
      if (e.target.closest('#speak-word')) return;
      tts.speakWord(v.word);
    });

    function goPrev() {
      if (currentIdx > 0) { currentIdx--; render(); }
    }
    function goNext() {
      if (currentIdx < vocab.length - 1) {
        currentIdx++;
        render();
      } else {
        navigateTo('vocab', { reading, subPhase: 'meaningTest' });
      }
    }

    document.getElementById('vocab-prev')?.addEventListener('click', goPrev);
    document.getElementById('vocab-next')?.addEventListener('click', goNext);

    // Keyboard shortcuts
    keyboard.setShortcuts([
      { key: 'ArrowLeft', action: goPrev, description: '이전' },
      { key: 'ArrowRight', action: goNext, description: '다음' },
      { key: 'Enter', action: goNext, description: '다음' },
      { key: 'Space', action: speakWord, description: '발음 듣기' },
    ]);
  }

  render();
}

// ===== Meaning Test =====
function renderMeaningTest(container, ctx) {
  const { navigateTo, store, reading } = ctx;
  const vocab = reading.vocabulary;
  const allMeanings = vocab.map(v => v.meaning);
  let questions = shuffleArray([...vocab]);
  let wrongQueue = [];
  let currentIdx = 0;
  let totalCorrect = 0;
  let totalAttempted = 0;

  function getChoices(correctMeaning) {
    const others = allMeanings.filter(m => m !== correctMeaning);
    const shuffled = shuffleArray(others).slice(0, 3);
    const choices = shuffleArray([correctMeaning, ...shuffled]);
    return choices;
  }

  function renderQuestion() {
    if (currentIdx >= questions.length) {
      if (wrongQueue.length > 0) {
        showToast(`틀린 단어 ${wrongQueue.length}개를 다시 풀어볼까요? 💪`);
        questions = shuffleArray([...wrongQueue]);
        wrongQueue = [];
        currentIdx = 0;
        renderQuestion();
        return;
      }
      // All done
      const score = Math.round((totalCorrect / totalAttempted) * 100);
      store.setScore(reading.id, 'vocabMeaning', score);
      keyboard.clearShortcuts();
      renderTestComplete(container, ctx, score, '뜻 테스트', () => {
        navigateTo('vocab', { reading, subPhase: 'spellingTest' });
      });
      return;
    }

    const current = questions[currentIdx];
    const choices = getChoices(current.meaning);

    container.innerHTML = `
      <div class="vocab-test-screen">
        <div style="text-align: center; margin-bottom: 4px;">
          <span class="badge badge-primary">뜻 테스트</span>
        </div>
        <div class="progress-bar" style="margin: 0 0 16px;">
          <div class="progress-bar-fill" style="width: ${((currentIdx) / questions.length) * 100}%;"></div>
        </div>
        <div class="test-question-header">
          <div class="test-question-num">${currentIdx + 1} / ${questions.length}</div>
          <div style="font-size: 3rem; margin: 12px 0;">${current.image}</div>
          <div class="test-prompt">${current.word}</div>
          <div class="test-instruction">올바른 뜻을 골라보세요</div>
        </div>
        <div class="choices-grid">
          ${choices.map((c, i) => `
            <button class="choice-btn" data-idx="${i}" data-ans="${c === current.meaning}">
              <span class="choice-letter">${String.fromCharCode(65 + i)}</span>
              <span>${c}</span>
            </button>
          `).join('')}
        </div>
        ${renderShortcutHints([
          { keyLabel: '1~4', description: '답 선택' },
          { keyLabel: 'Space', description: '발음 듣기' },
        ])}
      </div>
    `;

    const buttons = container.querySelectorAll('.choice-btn');
    let answered = false;

    async function selectChoice(idx) {
      if (answered || idx >= buttons.length) return;
      answered = true;
      const btn = buttons[idx];
      buttons.forEach(b => b.disabled = true);
      totalAttempted++;
      const isCorrect = btn.dataset.ans === 'true';

      if (isCorrect) {
        btn.classList.add('correct');
        totalCorrect++;
        showToast('🎉 정답이에요!');
        playCorrect();
        tts.speakWord(current.word);
        await delay(1200);
        currentIdx++;
        renderQuestion();
      } else {
        btn.classList.add('wrong');
        buttons.forEach(b => {
          if (b.dataset.ans === 'true') b.classList.add('correct');
        });
        wrongQueue.push(current);
        playWrong();
        showToast('😢 다시 도전해봐요!');
        await delay(1800);
        currentIdx++;
        renderQuestion();
      }
    }

    buttons.forEach((btn, i) => {
      btn.addEventListener('click', () => selectChoice(i));
    });

    // Keyboard shortcuts
    keyboard.setShortcuts([
      { key: '1', action: () => selectChoice(0) },
      { key: '2', action: () => selectChoice(1) },
      { key: '3', action: () => selectChoice(2) },
      { key: '4', action: () => selectChoice(3) },
      { key: 'a', action: () => selectChoice(0) },
      { key: 'b', action: () => selectChoice(1) },
      { key: 'c', action: () => selectChoice(2) },
      { key: 'd', action: () => selectChoice(3) },
      { key: 'Space', action: () => tts.speakWord(current.word) },
    ]);
  }

  renderQuestion();
}

// ===== Spelling Test =====
function renderSpellingTest(container, ctx) {
  const { navigateTo, store, reading } = ctx;
  const vocab = reading.vocabulary.filter(v => !v.word.includes(' ')); // Skip multi-word
  let questions = shuffleArray([...vocab]);
  let wrongQueue = [];
  let currentIdx = 0;
  let totalCorrect = 0;
  let totalAttempted = 0;
  let hintLevel = {};

  function renderSpelling() {
    if (currentIdx >= questions.length) {
      if (wrongQueue.length > 0) {
        showToast(`틀린 단어 ${wrongQueue.length}개를 다시 풀어볼까요! 힌트를 더 줄게요 💡`);
        wrongQueue.forEach(w => {
          hintLevel[w.word] = (hintLevel[w.word] || 0) + 1;
        });
        questions = shuffleArray([...wrongQueue]);
        wrongQueue = [];
        currentIdx = 0;
        renderSpelling();
        return;
      }
      const score = Math.round((totalCorrect / totalAttempted) * 100);
      store.setScore(reading.id, 'vocabSpelling', score);
      store.markPhaseComplete(reading.id, 'vocab');
      store.addLearnedWords(reading.vocabulary.map(v => v.word));
      store.addStars(3);
      keyboard.clearShortcuts();
      renderTestComplete(container, ctx, score, '스펠링 테스트', () => {
        navigateTo('vocab', { reading, subPhase: 'sentenceBuild' });
      }, true);
      return;
    }

    const current = questions[currentIdx];
    const word = current.word.toLowerCase();
    const hints = hintLevel[current.word] || 0;
    let userInput = [];
    let revealedIndices = [];

    // Progressive hints: reveal letters
    if (hints >= 1) revealedIndices.push(0); // First letter
    if (hints >= 2) revealedIndices.push(word.length - 1); // Last letter
    if (hints >= 3) {
      for (let i = 0; i < Math.ceil(word.length / 2); i++) revealedIndices.push(i);
    }
    revealedIndices = [...new Set(revealedIndices)];

    // Pre-fill hints
    userInput = word.split('').map((ch, i) => revealedIndices.includes(i) ? ch : '');

    function renderInput() {
      const spellingArea = document.getElementById('spelling-area');
      if (!spellingArea) return;

      const activeIdx = userInput.findIndex((ch, i) => ch === '' && !revealedIndices.includes(i));

      spellingArea.innerHTML = `
        <div class="spelling-display">
          ${word.split('').map((ch, i) => {
            const isFilled = userInput[i] !== '';
            const isHint = revealedIndices.includes(i);
            const isActive = i === activeIdx;
            return `<div class="spelling-letter-box ${isFilled ? 'filled' : ''} ${isHint ? 'hint' : ''} ${isActive ? 'active' : ''}">${userInput[i] || ''}</div>`;
          }).join('')}
        </div>
      `;
    }

    container.innerHTML = `
      <div class="vocab-test-screen">
        <div style="text-align: center; margin-bottom: 4px;">
          <span class="badge badge-primary">스펠링 테스트</span>
        </div>
        <div class="progress-bar" style="margin: 0 0 16px;">
          <div class="progress-bar-fill" style="width: ${((currentIdx) / questions.length) * 100}%;"></div>
        </div>
        <div class="test-question-header">
          <div class="test-question-num">${currentIdx + 1} / ${questions.length}</div>
          <div style="font-size: 3rem; margin: 12px 0;">${current.image}</div>
          <div class="test-prompt-ko">${current.meaning}</div>
          <div class="test-instruction">영어 스펠링을 입력하세요</div>
          <button class="vocab-speaker-btn" id="hear-word" style="margin: 8px auto;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 010 7.07"/></svg>
          </button>
        </div>
        <div class="spelling-input-area" id="spelling-area"></div>
        ${hints === 0 ? '<button class="hint-btn" id="get-hint">💡 힌트 보기</button>' : '<div style="text-align: center; font-size: 0.8rem; color: var(--color-accent);">💡 힌트가 표시되었어요!</div>'}
        <div class="virtual-keyboard" id="keyboard">
          <div class="keyboard-row">
            ${['q','w','e','r','t','y','u','i','o','p'].map(k => `<button class="key-btn" data-key="${k}">${k}</button>`).join('')}
          </div>
          <div class="keyboard-row">
            ${['a','s','d','f','g','h','j','k','l'].map(k => `<button class="key-btn" data-key="${k}">${k}</button>`).join('')}
          </div>
          <div class="keyboard-row">
            <button class="key-btn key-wide" id="key-submit">확인</button>
            ${['z','x','c','v','b','n','m'].map(k => `<button class="key-btn" data-key="${k}">${k}</button>`).join('')}
            <button class="key-btn key-backspace" id="key-backspace">⌫</button>
          </div>
        </div>
        ${renderShortcutHints([
          { keyLabel: 'A~Z', description: '글자 입력' },
          { keyLabel: '⌫', description: '지우기' },
          { keyLabel: 'Enter', description: '확인' },
          { keyLabel: 'Space', description: '발음 듣기' },
        ])}
      </div>
    `;

    renderInput();

    // Hear word
    document.getElementById('hear-word')?.addEventListener('click', () => {
      tts.speakWord(current.word);
    });

    // Hint
    document.getElementById('get-hint')?.addEventListener('click', () => {
      hintLevel[current.word] = 1;
      renderSpelling(); // Re-render with hint
    });

    // Keyboard (virtual)
    container.querySelectorAll('.key-btn[data-key]').forEach(key => {
      key.addEventListener('click', () => {
        const nextEmpty = userInput.findIndex((ch, i) => ch === '' && !revealedIndices.includes(i));
        if (nextEmpty !== -1) {
          userInput[nextEmpty] = key.dataset.key;
          renderInput();
        }
      });
    });

    // Backspace
    function doBackspace() {
      for (let i = userInput.length - 1; i >= 0; i--) {
        if (userInput[i] !== '' && !revealedIndices.includes(i)) {
          userInput[i] = '';
          renderInput();
          break;
        }
      }
    }

    document.getElementById('key-backspace')?.addEventListener('click', doBackspace);

    // Submit
    let isSubmitting = false;
    async function doSubmit() {
      if (isSubmitting) return;
      isSubmitting = true;

      const answer = userInput.join('');
      totalAttempted++;

      if (answer === word) {
        totalCorrect++;
        // Show all green
        document.querySelectorAll('.spelling-letter-box').forEach(box => {
          box.classList.add('correct');
        });
        showToast('🎉 정답이에요!');
        playCorrect();
        tts.speakWord(current.word);
        await delay(1200);
        currentIdx++;
        renderSpelling();
      } else {
        document.querySelectorAll('.spelling-letter-box').forEach((box, i) => {
          if (userInput[i] !== word[i]) box.classList.add('wrong');
          else box.classList.add('correct');
        });
        wrongQueue.push(current);
        playWrong();
        showToast('다시 도전해봐요! 💪');
        await delay(1800);
        currentIdx++;
        renderSpelling();
      }
    }

    document.getElementById('key-submit')?.addEventListener('click', doSubmit);

    // Physical keyboard support (for Chromebook / desktop)
    function handleKeydown(e) {
      const key = e.key.toLowerCase();

      // Letter keys a-z
      if (key.length === 1 && key >= 'a' && key <= 'z') {
        e.preventDefault();
        const nextEmpty = userInput.findIndex((ch, i) => ch === '' && !revealedIndices.includes(i));
        if (nextEmpty !== -1) {
          userInput[nextEmpty] = key;
          renderInput();
        }
      }

      // Backspace
      if (e.key === 'Backspace') {
        e.preventDefault();
        doBackspace();
      }

      // Enter = submit
      if (e.key === 'Enter') {
        e.preventDefault();
        doSubmit();
      }

      // Space = hear word
      if (e.key === ' ') {
        e.preventDefault();
        tts.speakWord(current.word);
      }
    }

    // Remove previous listener if any, then add new one
    if (window._spellingKeydownHandler) {
      document.removeEventListener('keydown', window._spellingKeydownHandler);
    }
    window._spellingKeydownHandler = handleKeydown;
    document.addEventListener('keydown', handleKeydown);

    // Clear keyboard manager shortcuts (spelling has its own keydown handler)
    keyboard.clearShortcuts();
  }

  renderSpelling();
}

// ===== Sentence Building =====
function renderSentenceBuild(container, ctx) {
  const { navigateTo, store, reading } = ctx;
  const sentences = reading.sentenceBuilding || [];

  if (sentences.length === 0) {
    store.markPhaseComplete(reading.id, 'sentenceBuild');
    navigateTo('reading-phases', { reading });
    return;
  }

  let currentIdx = 0;
  let selectedWords = [];
  let totalCorrect = 0;

  function render() {
    if (currentIdx >= sentences.length) {
      store.markPhaseComplete(reading.id, 'sentenceBuild');
      store.addStars(2);
      showConfetti();
      keyboard.clearShortcuts();
      container.innerHTML = `
        <div class="completion-screen">
          <div class="completion-trophy">🧩</div>
          <div class="completion-title">문장 만들기 완료!</div>
          <div class="completion-message">${totalCorrect}/${sentences.length} 문장을 맞혔어요!</div>
          <div class="completion-stars-earned">
            <span class="star-earned">⭐</span>
            <span class="star-earned">⭐</span>
          </div>
          <div class="completion-actions">
            <button class="btn btn-primary btn-block" id="go-next">본문 읽기로 가기 📚</button>
          </div>
          ${renderShortcutHints([
            { keyLabel: 'Enter', description: '다음으로' },
          ])}
        </div>
      `;
      const goNextFn = () => navigateTo('reading-phases', { reading });
      document.getElementById('go-next')?.addEventListener('click', goNextFn);
      keyboard.setShortcuts([{ key: 'Enter', action: goNextFn }]);
      return;
    }

    const sent = sentences[currentIdx];
    const shuffledWords = shuffleArray([...sent.words]);
    selectedWords = [];

    renderSentenceUI(sent, shuffledWords);
  }

  function renderSentenceUI(sent, shuffledWords) {
    container.innerHTML = `
      <div class="sentence-build-screen">
        <div style="text-align: center; margin-bottom: 8px;">
          <span class="badge badge-primary">문장 만들기</span>
          <span style="font-size: 0.8rem; color: var(--color-text-light); margin-left: 8px;">${currentIdx + 1} / ${sentences.length}</span>
        </div>
        <div class="progress-bar" style="margin: 0 0 16px;">
          <div class="progress-bar-fill" style="width: ${((currentIdx) / sentences.length) * 100}%;"></div>
        </div>
        <div class="sentence-build-target">
          <div class="sentence-build-ko">${sent.ko}</div>
          <div class="sentence-build-slots" id="slots">
            ${selectedWords.map((w, i) => `<span class="sentence-slot" data-idx="${i}">${w}</span>`).join('')}
          </div>
        </div>
        <div class="sentence-build-words" id="word-blocks">
          ${shuffledWords.map((w, i) => `
            <button class="word-block" data-word="${w}" data-sidx="${i}" id="wb-${i}"><span class="word-block-num">${i + 1}</span>${w}</button>
          `).join('')}
        </div>
        <div style="text-align: center; margin-top: 16px;">
          <button class="btn btn-secondary" id="reset-sentence" style="margin-right: 8px;">🔄 다시하기</button>
          <button class="btn btn-primary" id="check-sentence" ${selectedWords.length < sent.words.length ? 'disabled' : ''}>확인하기 ✓</button>
        </div>
        <div id="sentence-result"></div>
        ${renderShortcutHints([
          { keyLabel: '1~' + shuffledWords.length, description: '단어 선택' },
          { keyLabel: 'Enter', description: '확인' },
          { keyLabel: '⌫', description: '마지막 단어 제거' },
          { keyLabel: 'R', description: '다시하기' },
        ])}
      </div>
    `;

    // Word block clicks - add to slots
    const usedIndices = new Set();
    selectedWords.forEach((w) => {
      for (let i = 0; i < shuffledWords.length; i++) {
        if (shuffledWords[i] === w && !usedIndices.has(i)) {
          usedIndices.add(i);
          break;
        }
      }
    });

    shuffledWords.forEach((w, i) => {
      const btn = document.getElementById(`wb-${i}`);
      if (usedIndices.has(i)) btn.classList.add('used');
      btn?.addEventListener('click', () => {
        if (!usedIndices.has(i)) {
          selectedWords.push(w);
          usedIndices.add(i);
          renderSentenceUI(sent, shuffledWords);
        }
      });
    });

    // Slot clicks - remove from slots
    container.querySelectorAll('.sentence-slot').forEach(slot => {
      slot.addEventListener('click', () => {
        const idx = parseInt(slot.dataset.idx);
        selectedWords.splice(idx, 1);
        renderSentenceUI(sent, shuffledWords);
      });
    });

    // Reset
    function doReset() {
      selectedWords = [];
      renderSentenceUI(sent, shuffledWords);
    }
    document.getElementById('reset-sentence')?.addEventListener('click', doReset);

    // Check
    async function doCheck() {
      if (selectedWords.length < sent.words.length) return;
      const answer = selectedWords.join(' ');
      const correct = sent.words.join(' ');
      const resultDiv = document.getElementById('sentence-result');

      if (answer === correct) {
        totalCorrect++;
        resultDiv.innerHTML = `<div class="sentence-build-result correct"><div style="font-size: 2rem;">🎉</div><div style="font-weight: 700; color: var(--color-success);">정답이에요!</div></div>`;
        playCorrect();
        showToast('🎉 잘했어요!');
        tts.speakSentence(correct);
        await delay(2000);
        currentIdx++;
        render();
      } else {
        resultDiv.innerHTML = `
          <div class="sentence-build-result wrong">
            <div style="font-size: 2rem;">🤔</div>
            <div style="font-weight: 700; color: var(--color-danger); margin-bottom: 8px;">다시 해볼까요?</div>
            <div style="font-size: 0.9rem; color: var(--color-text-light);">정답: <span style="font-family: var(--font-en); font-weight: 700;">${correct}</span></div>
          </div>
        `;
        playWrong();
        await delay(2500);
        selectedWords = [];
        renderSentenceUI(sent, shuffledWords);
      }
    }
    document.getElementById('check-sentence')?.addEventListener('click', doCheck);

    // Remove last word
    function removeLastWord() {
      if (selectedWords.length > 0) {
        selectedWords.pop();
        renderSentenceUI(sent, shuffledWords);
      }
    }

    // Keyboard shortcuts
    const shortcuts = [
      { key: 'Enter', action: doCheck, description: '확인' },
      { key: 'Backspace', action: removeLastWord, description: '마지막 단어 제거' },
      { key: 'r', action: doReset, description: '다시하기' },
    ];
    // Number keys for word selection
    shuffledWords.forEach((w, i) => {
      if (i < 9) {
        shortcuts.push({
          key: String(i + 1),
          action: () => {
            if (!usedIndices.has(i)) {
              selectedWords.push(w);
              usedIndices.add(i);
              renderSentenceUI(sent, shuffledWords);
            }
          }
        });
      }
    });
    keyboard.setShortcuts(shortcuts);
  }

  render();
}

// ===== Test Complete Screen =====
function renderTestComplete(container, ctx, score, testName, onNext, showStars = false) {
  const emoji = score >= 90 ? '🏆' : score >= 70 ? '🎉' : score >= 50 ? '😊' : '💪';
  const message = score >= 90 ? '완벽해요!' : score >= 70 ? '잘했어요!' : score >= 50 ? '좋은 시도예요!' : '다음엔 더 잘할 수 있어요!';

  if (showStars) showConfetti();

  container.innerHTML = `
    <div class="score-result">
      <div class="score-emoji">${emoji}</div>
      <div style="font-size: 1.1rem; font-weight: 700; color: var(--color-text-light); margin-bottom: 4px;">${testName} 결과</div>
      <div class="score-value">${score}%</div>
      <div class="score-label">${message}</div>
      ${showStars ? `
        <div class="completion-stars-earned">
          <span class="star-earned">⭐</span>
          <span class="star-earned">⭐</span>
          <span class="star-earned">⭐</span>
        </div>
      ` : ''}
      <button class="btn btn-primary btn-lg btn-block" id="next-phase" style="margin-top: 16px;">다음으로 ▶</button>
      ${renderShortcutHints([
        { keyLabel: 'Enter', description: '다음으로' },
      ])}
    </div>
  `;

  document.getElementById('next-phase')?.addEventListener('click', onNext);
  keyboard.setShortcuts([{ key: 'Enter', action: onNext }]);
}
