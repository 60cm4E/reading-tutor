// ===== Main App Router =====
import { CONTENT_DATA } from './data.js';
import { store } from './store.js';
import { renderHome } from './phases/home.js';
import { renderVocab } from './phases/vocab.js';
import { renderReading } from './phases/reading.js';
import { renderQuiz } from './phases/quiz.js';
import { renderAdmin } from './admin/admin.js';
import { renderReport } from './admin/report.js';

const mainContent = document.getElementById('main-content');
const headerTitle = document.getElementById('header-title');
const headerStars = document.getElementById('header-stars');
const btnBack = document.getElementById('btn-back');
const header = document.getElementById('app-header');

let navigationStack = [];
let currentView = null;

function updateStars() {
  headerStars.textContent = store.getStars();
}

function navigateTo(view, params = {}, pushToStack = true) {
  if (pushToStack && currentView) {
    navigationStack.push({ view: currentView.view, params: currentView.params });
  }
  currentView = { view, params };

  // Update header
  btnBack.style.display = navigationStack.length > 0 ? 'flex' : 'none';
  header.classList.remove('hidden');
  updateStars();

  mainContent.innerHTML = '';
  mainContent.className = 'screen-enter';

  switch (view) {
    case 'home':
      headerTitle.textContent = '리딩튜터 스타터';
      btnBack.style.display = 'none';
      navigationStack = [];
      renderHome(mainContent, { navigateTo, store, CONTENT_DATA });
      break;

    case 'section':
      headerTitle.textContent = params.section.title;
      renderHome(mainContent, { navigateTo, store, CONTENT_DATA, section: params.section });
      break;

    case 'reading-phases':
      headerTitle.textContent = params.reading.title;
      renderPhasePicker(mainContent, params);
      break;

    case 'vocab':
      headerTitle.textContent = '단어 학습';
      renderVocab(mainContent, { navigateTo, store, reading: params.reading, subPhase: params.subPhase || 'phonics' });
      break;

    case 'reading':
      headerTitle.textContent = '본문 읽기';
      renderReading(mainContent, { navigateTo, store, reading: params.reading });
      break;

    case 'quiz':
      headerTitle.textContent = '문제 풀기';
      renderQuiz(mainContent, { navigateTo, store, reading: params.reading, reviewMode: false });
      break;

    case 'review':
      headerTitle.textContent = '다시 풀기';
      renderQuiz(mainContent, { navigateTo, store, reading: params.reading, reviewMode: true });
      break;

    case 'admin':
      headerTitle.textContent = '관리자';
      renderAdmin(mainContent, { navigateTo, store, CONTENT_DATA });
      break;

    case 'report':
      header.classList.add('hidden');
      renderReport(mainContent, { navigateTo, store, CONTENT_DATA, studentId: params.studentId });
      break;
  }
}

function goBack() {
  if (navigationStack.length > 0) {
    const prev = navigationStack.pop();
    navigateTo(prev.view, prev.params, false);
  } else {
    navigateTo('home');
  }
}

function renderPhasePicker(container, params) {
  const { reading } = params;
  const completed = store.getCompletedPhases(reading.id);
  const scores = store.getScores(reading.id);
  const wrongQuiz = store.getWrongAnswers(reading.id, 'quiz');

  const phases = [
    { key: 'vocab', label: '단어 학습', emoji: '📖', desc: '파닉스 · 단어 카드 · 뜻 · 스펠링', done: completed.vocab },
    { key: 'reading', label: '본문 읽기', emoji: '📚', desc: '문장을 터치하고 따라 읽기', done: completed.reading },
    { key: 'sentenceBuild', label: '문장 만들기', emoji: '🧩', desc: '단어를 순서대로 배열하기', done: completed.sentenceBuild },
    { key: 'quiz', label: '문제 풀기', emoji: '✏️', desc: '독해 문제 풀어보기', done: completed.quiz },
  ];

  if (wrongQuiz.length > 0 && completed.quiz && !completed.review) {
    phases.push({ key: 'review', label: '다시 풀기', emoji: '🔄', desc: `틀린 문제 ${wrongQuiz.length}개 다시 풀기`, done: completed.review });
  } else if (completed.quiz && completed.review) {
    phases.push({ key: 'review', label: '다시 풀기', emoji: '✅', desc: '모두 완료!', done: true });
  }

  container.innerHTML = `
    <div class="home-screen">
      <div class="home-hero" style="padding: 20px 0 12px">
        <div style="font-size: 3rem; margin-bottom: 8px;">${reading.emoji}</div>
        <h2 style="font-family: var(--font-en); font-size: 1.5rem; font-weight: 800; color: var(--color-primary);">${reading.title}</h2>
        <p style="font-size: 0.85rem; color: var(--color-text-light);">${reading.category}</p>
      </div>
      <div class="phase-indicator">
        ${phases.map((p, i) => `
          <div class="phase-step ${p.done ? 'done' : ''}">${p.done ? '✓' : i + 1}</div>
          ${i < phases.length - 1 ? `<div class="phase-connector ${p.done ? 'done' : ''}"></div>` : ''}
        `).join('')}
      </div>
      <div class="section-list" style="margin-top: 16px;">
        ${phases.map((p, i) => `
          <div class="reading-item" id="phase-${p.key}" style="animation: fadeInUp 0.4s ease ${i * 0.1}s forwards; opacity: 0;">
            <div style="font-size: 1.6rem; width: 44px; text-align: center;">${p.emoji}</div>
            <div style="flex: 1;">
              <div class="reading-item-title">${p.label}</div>
              <div style="font-size: 0.8rem; color: var(--color-text-light);">${p.desc}</div>
              ${scores[p.key === 'quiz' ? 'quiz' : p.key] !== undefined ? `<div class="badge badge-primary" style="margin-top: 4px;">점수: ${scores[p.key === 'quiz' ? 'quiz' : p.key]}%</div>` : ''}
            </div>
            <div class="reading-item-status">${p.done ? '✅' : '▶️'}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // Bind clicks
  phases.forEach(p => {
    document.getElementById(`phase-${p.key}`)?.addEventListener('click', () => {
      switch (p.key) {
        case 'vocab':
          navigateTo('vocab', { reading, subPhase: 'phonics' });
          break;
        case 'sentenceBuild':
          navigateTo('vocab', { reading, subPhase: 'sentenceBuild' });
          break;
        case 'reading':
          navigateTo('reading', { reading });
          break;
        case 'quiz':
          navigateTo('quiz', { reading });
          break;
        case 'review':
          navigateTo('review', { reading });
          break;
      }
    });
  });
}

// Initialize
btnBack.addEventListener('click', goBack);

// Check for report URL
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('report')) {
  navigateTo('report', { studentId: urlParams.get('report') });
} else {
  navigateTo('home');
}
