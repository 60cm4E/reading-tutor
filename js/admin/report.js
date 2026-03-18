// ===== Report Card Page =====
import { CONTENT_DATA } from '../data.js';

export function renderReport(container, ctx) {
  const { navigateTo, store, studentId } = ctx;
  const student = store.getStudent(studentId);

  if (!student) {
    container.innerHTML = `
      <div style="text-align: center; padding: 60px 20px;">
        <div style="font-size: 3rem; margin-bottom: 16px;">😔</div>
        <h2 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 8px;">학생 정보를 찾을 수 없습니다</h2>
        <p style="color: var(--color-text-light); font-size: 0.9rem;">이 링크가 올바른지 확인해주세요.</p>
      </div>
    `;
    return;
  }

  const allReadings = CONTENT_DATA.sections.flatMap(s => s.readings);
  const assignedReadings = student.assignments.map(aid => allReadings.find(r => r.id === aid)).filter(Boolean);

  container.innerHTML = `
    <div style="max-width: 480px; margin: 0 auto; padding: 20px;">
      <div class="report-card">
        <div class="report-header">
          <div style="font-size: 2.5rem; margin-bottom: 8px;">📋</div>
          <div class="report-student-name">${student.name}</div>
          <div class="report-date">리딩튜터 스타터 · ${new Date().toLocaleDateString('ko-KR')}</div>
        </div>

        <div style="text-align: center; padding: 16px 0;">
          <div style="font-size: 0.85rem; color: var(--color-text-light);">모은 별</div>
          <div style="font-size: 2rem; font-weight: 900; color: var(--color-accent);">⭐ ${store.getStars()}</div>
        </div>

        ${assignedReadings.length === 0 ? `
          <p style="text-align: center; color: var(--color-text-light); padding: 24px;">아직 지정된 학습이 없습니다.</p>
        ` : ''}

        ${assignedReadings.map(reading => {
          const phases = store.getCompletedPhases(reading.id);
          const scores = store.getScores(reading.id);
          const section = CONTENT_DATA.sections.find(s => s.readings.some(r => r.id === reading.id));

          return `
            <div style="margin: 16px 0; padding: 16px; background: var(--color-bg); border-radius: var(--radius-md);">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                <span style="font-size: 1.3rem;">${reading.emoji}</span>
                <div>
                  <div style="font-weight: 700; font-family: var(--font-en);">${reading.title}</div>
                  <div style="font-size: 0.8rem; color: var(--color-text-light);">${section?.title || ''} · ${reading.category}</div>
                </div>
              </div>

              <div class="report-scores">
                <div class="report-score-item">
                  <span class="report-score-label">${phases.vocab ? '✅' : '⬜'} 단어 학습</span>
                  ${scores.vocabMeaning !== undefined ? `
                    <div class="report-score-bar">
                      <div class="report-score-fill" style="width: ${scores.vocabMeaning}%;"></div>
                    </div>
                  ` : '<span style="font-size: 0.8rem; color: var(--color-text-muted);">미완료</span>'}
                </div>
                <div class="report-score-item">
                  <span class="report-score-label">${phases.vocab ? '✅' : '⬜'} 스펠링</span>
                  ${scores.vocabSpelling !== undefined ? `
                    <div class="report-score-bar">
                      <div class="report-score-fill" style="width: ${scores.vocabSpelling}%;"></div>
                    </div>
                  ` : '<span style="font-size: 0.8rem; color: var(--color-text-muted);">미완료</span>'}
                </div>
                <div class="report-score-item">
                  <span class="report-score-label">${phases.sentenceBuild ? '✅' : '⬜'} 문장 만들기</span>
                  <span style="font-size: 0.8rem; color: ${phases.sentenceBuild ? 'var(--color-success)' : 'var(--color-text-muted)'};">${phases.sentenceBuild ? '완료' : '미완료'}</span>
                </div>
                <div class="report-score-item">
                  <span class="report-score-label">${phases.reading ? '✅' : '⬜'} 본문 읽기</span>
                  <span style="font-size: 0.8rem; color: ${phases.reading ? 'var(--color-success)' : 'var(--color-text-muted)'};">${phases.reading ? '완료' : '미완료'}</span>
                </div>
                <div class="report-score-item">
                  <span class="report-score-label">${phases.quiz ? '✅' : '⬜'} 문제 풀기</span>
                  ${scores.quiz !== undefined ? `
                    <div class="report-score-bar">
                      <div class="report-score-fill" style="width: ${scores.quiz}%;"></div>
                    </div>
                  ` : '<span style="font-size: 0.8rem; color: var(--color-text-muted);">미완료</span>'}
                </div>
                <div class="report-score-item">
                  <span class="report-score-label">${phases.review ? '✅' : '⬜'} 복습</span>
                  <span style="font-size: 0.8rem; color: ${phases.review ? 'var(--color-success)' : 'var(--color-text-muted)'};">${phases.review ? '완료' : '미완료'}</span>
                </div>
              </div>
            </div>
          `;
        }).join('')}

        <div style="text-align: center; padding: 16px 0; border-top: 2px solid var(--color-bg); margin-top: 16px;">
          <p style="font-size: 0.8rem; color: var(--color-text-muted);">리딩튜터 스타터 · 자동 생성 성적표</p>
        </div>
      </div>
    </div>
  `;
}
