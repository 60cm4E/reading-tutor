// ===== Phase 3 & 4: Quiz & Review =====
import { showConfetti, showToast, delay } from '../utils.js';
import { playCorrect, playWrong, playStar } from '../sfx.js';

export function renderQuiz(container, ctx) {
  const { navigateTo, store, reading, reviewMode } = ctx;
  const allQuestions = reading.questions;

  let questions;
  if (reviewMode) {
    const wrongIndices = store.getWrongAnswers(reading.id, 'quiz');
    questions = wrongIndices.map(i => ({ ...allQuestions[i], originalIdx: i }));
    if (questions.length === 0) {
      store.markPhaseComplete(reading.id, 'review');
      navigateTo('reading-phases', { reading });
      return;
    }
  } else {
    questions = allQuestions.map((q, i) => ({ ...q, originalIdx: i }));
  }

  let currentIdx = 0;
  let correctCount = 0;
  let wrongIndices = [];
  let hintUsed = {};
  let hintLevel = {};

  function renderQuestion() {
    if (currentIdx >= questions.length) {
      showResults();
      return;
    }

    const q = questions[currentIdx];
    const currentHintLevel = hintLevel[q.originalIdx] || 0;
    let choices = [...q.choices];

    // In review, progressive hint: reduce choices
    if (reviewMode && currentHintLevel >= 2) {
      // Show only 2 choices: correct + 1 wrong
      const correctChoice = q.choices[q.answer];
      const wrongChoices = q.choices.filter((_, i) => i !== q.answer);
      const oneWrong = wrongChoices[Math.floor(Math.random() * wrongChoices.length)];
      choices = [correctChoice, oneWrong].sort(() => Math.random() - 0.5);
    }

    container.innerHTML = `
      <div class="quiz-screen">
        <div style="text-align: center; margin-bottom: 4px;">
          <span class="badge ${reviewMode ? 'badge-accent' : 'badge-primary'}">${reviewMode ? '다시 풀기' : '문제 풀기'}</span>
        </div>
        <div class="progress-bar" style="margin: 0 0 16px;">
          <div class="progress-bar-fill" style="width: ${(currentIdx / questions.length) * 100}%;"></div>
        </div>

        <div class="quiz-question-card">
          <div style="font-size: 0.8rem; color: var(--color-text-light); margin-bottom: 8px;">문제 ${currentIdx + 1} / ${questions.length}</div>
          ${q.excerpt ? `<div class="quiz-passage-excerpt">${q.excerpt}</div>` : ''}
          <div class="quiz-question-text">${q.text}</div>
        </div>

        ${(hintUsed[q.originalIdx] || (reviewMode && currentHintLevel >= 1)) ? `
          <div class="hint-area" id="hint-area">
            <div class="hint-label">💡 힌트</div>
            <div class="hint-text">${q.hint}</div>
            ${q.excerpt && reviewMode && currentHintLevel >= 1 ? `
              <div style="margin-top: 8px; padding: 8px; background: rgba(108,99,255,0.05); border-radius: 8px; font-family: var(--font-en); font-size: 0.9rem;">
                📖 ${q.excerpt}
              </div>
            ` : ''}
          </div>
        ` : `
          <button class="hint-btn" id="show-hint">💡 힌트 보기</button>
        `}

        <div class="choices-grid" id="choices">
          ${choices.map((c, i) => `
            <button class="choice-btn" data-choice="${c}" data-correct="${c === q.choices[q.answer]}">
              <span class="choice-letter">${String.fromCharCode(65 + i)}</span>
              <span>${c}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;

    // Hint
    document.getElementById('show-hint')?.addEventListener('click', () => {
      hintUsed[q.originalIdx] = true;
      renderQuestion();
    });

    // Choice clicks
    const buttons = container.querySelectorAll('.choice-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', async () => {
        buttons.forEach(b => b.disabled = true);
        const isCorrect = btn.dataset.correct === 'true';

        if (isCorrect) {
          btn.classList.add('correct');
          correctCount++;
          playCorrect();
          showToast('🎉 정답이에요!');
          await delay(1200);
          currentIdx++;
          renderQuestion();
        } else {
          btn.classList.add('wrong');
          buttons.forEach(b => {
            if (b.dataset.correct === 'true') b.classList.add('correct');
          });
          if (!reviewMode) wrongIndices.push(q.originalIdx);
          else {
            // In review: increase hint level and re-add to queue
            hintLevel[q.originalIdx] = (hintLevel[q.originalIdx] || 0) + 1;
            if (hintLevel[q.originalIdx] < 3) {
              questions.push(q); // Re-try later
            } else {
              correctCount++; // After 3 tries, just pass
            }
          }
          playWrong();
          showToast(reviewMode ? '힌트를 더 줄게요! 💡' : '다시 풀어볼 수 있어요! 💪');
          await delay(1800);
          currentIdx++;
          renderQuestion();
        }
      });
    });
  }

  function showResults() {
    const total = reviewMode ? questions.length : allQuestions.length;
    const score = Math.round((correctCount / total) * 100);

    if (!reviewMode) {
      store.setScore(reading.id, 'quiz', score);
      store.markPhaseComplete(reading.id, 'quiz');
      store.setWrongAnswers(reading.id, 'quiz', wrongIndices);
      store.addStars(score >= 80 ? 5 : score >= 60 ? 3 : 2);
    } else {
      store.markPhaseComplete(reading.id, 'review');
      store.setWrongAnswers(reading.id, 'quiz', []);
      store.addStars(3);
    }

    showConfetti();
    playStar();

    const emoji = score >= 90 ? '🏆' : score >= 70 ? '🎉' : score >= 50 ? '😊' : '💪';
    const starsEarned = !reviewMode ? (score >= 80 ? 5 : score >= 60 ? 3 : 2) : 3;

    container.innerHTML = `
      <div class="completion-screen">
        <div class="completion-trophy">${emoji}</div>
        <div class="completion-title">${reviewMode ? '복습 완료!' : '문제 풀기 완료!'}</div>
        <div class="completion-message">
          ${reviewMode ? '틀린 문제를 모두 다시 풀었어요!' : `${allQuestions.length}문제 중 ${correctCount}문제 맞혔어요!`}
        </div>

        <div class="completion-stars-earned">
          ${Array(Math.min(starsEarned, 5)).fill(0).map(() => '<span class="star-earned">⭐</span>').join('')}
        </div>

        <div class="completion-score-detail">
          <div class="score-row">
            <span class="score-row-label">정답률</span>
            <span class="score-row-value">${score}%</span>
          </div>
          <div class="score-row">
            <span class="score-row-label">맞힌 문제</span>
            <span class="score-row-value">${correctCount} / ${total}</span>
          </div>
          ${!reviewMode && wrongIndices.length > 0 ? `
            <div class="score-row">
              <span class="score-row-label">틀린 문제</span>
              <span class="score-row-value" style="color: var(--color-danger);">${wrongIndices.length}개</span>
            </div>
          ` : ''}
        </div>

        <div class="completion-actions">
          ${!reviewMode && wrongIndices.length > 0 ? `
            <button class="btn btn-accent btn-block" id="go-review">🔄 틀린 문제 다시 풀기</button>
          ` : ''}
          <button class="btn btn-primary btn-block" id="go-back">돌아가기 🏠</button>
        </div>
      </div>
    `;

    document.getElementById('go-review')?.addEventListener('click', () => {
      navigateTo('review', { reading });
    });

    document.getElementById('go-back')?.addEventListener('click', () => {
      navigateTo('reading-phases', { reading });
    });
  }

  renderQuestion();
}
