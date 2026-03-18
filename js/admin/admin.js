// ===== Admin Page =====
import { CONTENT_DATA } from '../data.js';
import { showToast } from '../utils.js';

export function renderAdmin(container, ctx) {
  const { navigateTo, store } = ctx;
  const admin = store.getAdmin();

  // Check if logged in (session)
  if (!window._adminLoggedIn) {
    renderLogin(container, ctx);
    return;
  }

  let currentTab = 'students';
  let selectedStudent = null;

  function render() {
    const students = store.getStudents();

    container.innerHTML = `
      <div class="admin-screen">
        <div class="admin-header">
          <div class="admin-title">👨‍🏫 관리자 페이지</div>
        </div>

        <div class="admin-tabs">
          <button class="admin-tab ${currentTab === 'students' ? 'active' : ''}" data-tab="students">학생 관리</button>
          <button class="admin-tab ${currentTab === 'assign' ? 'active' : ''}" data-tab="assign">학습 지정</button>
          <button class="admin-tab ${currentTab === 'reports' ? 'active' : ''}" data-tab="reports">성적표</button>
        </div>

        <div id="tab-content"></div>
      </div>
    `;

    // Tab switching
    container.querySelectorAll('.admin-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        currentTab = tab.dataset.tab;
        render();
      });
    });

    const content = document.getElementById('tab-content');

    switch (currentTab) {
      case 'students':
        renderStudentsTab(content, students);
        break;
      case 'assign':
        renderAssignTab(content, students);
        break;
      case 'reports':
        renderReportsTab(content, students);
        break;
    }
  }

  function renderStudentsTab(container, students) {
    container.innerHTML = `
      <div class="add-student-form">
        <input type="text" id="new-student-name" placeholder="학생 이름 입력" maxlength="20">
        <button class="btn btn-primary" id="add-student">추가</button>
      </div>
      <div class="student-list">
        ${students.length === 0 ? '<p style="text-align: center; color: var(--color-text-light); padding: 32px;">아직 등록된 학생이 없어요</p>' : ''}
        ${students.map(s => `
          <div class="student-card" data-id="${s.id}">
            <div class="student-avatar">${s.name[0]}</div>
            <div class="student-info">
              <div class="student-name">${s.name}</div>
              <div class="student-progress-text">지정된 학습: ${s.assignments.length}개</div>
            </div>
            <div class="student-actions">
              <button class="student-action-btn" data-remove="${s.id}" title="삭제">🗑️</button>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    // Add student
    document.getElementById('add-student')?.addEventListener('click', () => {
      const input = document.getElementById('new-student-name');
      const name = input.value.trim();
      if (name) {
        store.addStudent(name);
        showToast(`${name} 학생이 추가되었습니다!`);
        input.value = '';
        render();
      }
    });

    // Enter key
    document.getElementById('new-student-name')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') document.getElementById('add-student')?.click();
    });

    // Remove student
    container.querySelectorAll('[data-remove]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (confirm('이 학생을 삭제하시겠습니까?')) {
          store.removeStudent(btn.dataset.remove);
          showToast('학생이 삭제되었습니다.');
          render();
        }
      });
    });
  }

  function renderAssignTab(container, students) {
    if (students.length === 0) {
      container.innerHTML = '<p style="text-align: center; color: var(--color-text-light); padding: 32px;">먼저 학생을 등록해주세요.</p>';
      return;
    }

    container.innerHTML = `
      <div style="margin-bottom: 16px;">
        <div style="font-size: 0.85rem; color: var(--color-text-light); margin-bottom: 8px;">학생 선택</div>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          ${students.map(s => `
            <button class="btn ${selectedStudent === s.id ? 'btn-primary' : 'btn-secondary'}" style="padding: 8px 16px; font-size: 0.85rem;" data-select="${s.id}">${s.name}</button>
          `).join('')}
        </div>
      </div>
      <div id="assignment-list"></div>
    `;

    // Select student
    container.querySelectorAll('[data-select]').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedStudent = btn.dataset.select;
        render();
      });
    });

    if (selectedStudent) {
      const student = store.getStudent(selectedStudent);
      const assignList = document.getElementById('assignment-list');

      assignList.innerHTML = CONTENT_DATA.sections.map(section => `
        <div class="assignment-section">
          <div class="assignment-section-title">${section.emoji} ${section.title} — ${section.theme}</div>
          ${section.readings.map(r => {
            const assigned = student.assignments.includes(r.id);
            return `
              <div class="assignment-item" data-reading="${r.id}">
                <div class="assignment-checkbox ${assigned ? 'checked' : ''}">${assigned ? '✓' : ''}</div>
                <div class="assignment-label" style="font-family: var(--font-en);">${r.emoji} ${r.title}</div>
              </div>
            `;
          }).join('')}
        </div>
      `).join('');

      assignList.querySelectorAll('.assignment-item').forEach(item => {
        item.addEventListener('click', () => {
          const readingId = item.dataset.reading;
          const student = store.getStudent(selectedStudent);
          if (student.assignments.includes(readingId)) {
            store.unassignReading(selectedStudent, readingId);
          } else {
            store.assignReading(selectedStudent, readingId);
          }
          render();
        });
      });
    }
  }

  function renderReportsTab(container, students) {
    if (students.length === 0) {
      container.innerHTML = '<p style="text-align: center; color: var(--color-text-light); padding: 32px;">먼저 학생을 등록해주세요.</p>';
      return;
    }

    container.innerHTML = `
      <div class="student-list">
        ${students.map(s => {
          const reportUrl = `${window.location.origin}${window.location.pathname}?report=${s.id}`;
          return `
            <div class="student-card" style="flex-direction: column; align-items: stretch; gap: 12px;">
              <div style="display: flex; align-items: center; gap: 12px;">
                <div class="student-avatar">${s.name[0]}</div>
                <div class="student-info">
                  <div class="student-name">${s.name}</div>
                  <div class="student-progress-text">지정 학습 ${s.assignments.length}개</div>
                </div>
              </div>
              <div style="display: flex; gap: 8px;">
                <button class="btn btn-primary" style="flex: 1; padding: 10px; font-size: 0.85rem;" data-copy="${reportUrl}">📋 링크 복사</button>
                <button class="btn btn-secondary" style="flex: 1; padding: 10px; font-size: 0.85rem;" data-view="${s.id}">👁️ 미리보기</button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    container.querySelectorAll('[data-copy]').forEach(btn => {
      btn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(btn.dataset.copy);
          showToast('링크가 복사되었습니다! 📋');
        } catch {
          // Fallback
          const input = document.createElement('input');
          input.value = btn.dataset.copy;
          document.body.appendChild(input);
          input.select();
          document.execCommand('copy');
          document.body.removeChild(input);
          showToast('링크가 복사되었습니다! 📋');
        }
      });
    });

    container.querySelectorAll('[data-view]').forEach(btn => {
      btn.addEventListener('click', () => {
        navigateTo('report', { studentId: btn.dataset.view });
      });
    });
  }

  render();
}

function renderLogin(container, ctx) {
  const { store } = ctx;

  container.innerHTML = `
    <div class="admin-screen">
      <div class="admin-login">
        <div class="admin-login-icon">🔐</div>
        <h2 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 16px;">관리자 로그인</h2>
        <input type="password" id="admin-pw" placeholder="비밀번호를 입력하세요" autocomplete="off">
        <button class="btn btn-primary btn-block" id="admin-login-btn">로그인</button>
        <p style="font-size: 0.75rem; color: var(--color-text-muted); margin-top: 12px;">기본 비밀번호: 1234</p>
      </div>
    </div>
  `;

  const login = () => {
    const pw = document.getElementById('admin-pw').value;
    if (store.checkAdminPassword(pw)) {
      window._adminLoggedIn = true;
      renderAdmin(container, ctx);
    } else {
      showToast('비밀번호가 틀렸습니다 ❌');
      document.getElementById('admin-pw').value = '';
    }
  };

  document.getElementById('admin-login-btn')?.addEventListener('click', login);
  document.getElementById('admin-pw')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') login();
  });
}
