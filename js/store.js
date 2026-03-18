// ===== State Management (localStorage) =====

const STORAGE_KEY = 'reading-tutor-state';
const ADMIN_KEY = 'reading-tutor-admin';

function getDefaultState() {
  return {
    stars: 0,
    completedPhases: {}, // { readingId: { vocab: true, reading: true, quiz: true, review: true } }
    scores: {}, // { readingId: { vocabMeaning: 80, vocabSpelling: 90, quiz: 75 } }
    wrongAnswers: {}, // { readingId: { quiz: [questionIdx, ...] } }
    learnedWords: [], // list of all learned words
  };
}

function getDefaultAdmin() {
  return {
    password: '1234',
    students: [],
    // student: { id, name, assignments: [readingId, ...], progress: { readingId: {...} } }
  };
}

export const store = {
  _state: null,
  _admin: null,

  getState() {
    if (!this._state) {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        this._state = saved ? { ...getDefaultState(), ...JSON.parse(saved) } : getDefaultState();
      } catch {
        this._state = getDefaultState();
      }
    }
    return this._state;
  },

  save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this._state));
  },

  addStars(count) {
    this.getState().stars += count;
    this.save();
  },

  getStars() {
    return this.getState().stars;
  },

  markPhaseComplete(readingId, phase) {
    const state = this.getState();
    if (!state.completedPhases[readingId]) {
      state.completedPhases[readingId] = {};
    }
    state.completedPhases[readingId][phase] = true;
    this.save();
  },

  isPhaseComplete(readingId, phase) {
    const state = this.getState();
    return state.completedPhases[readingId]?.[phase] || false;
  },

  getCompletedPhases(readingId) {
    return this.getState().completedPhases[readingId] || {};
  },

  setScore(readingId, type, score) {
    const state = this.getState();
    if (!state.scores[readingId]) state.scores[readingId] = {};
    state.scores[readingId][type] = score;
    this.save();
  },

  getScore(readingId, type) {
    return this.getState().scores[readingId]?.[type];
  },

  getScores(readingId) {
    return this.getState().scores[readingId] || {};
  },

  setWrongAnswers(readingId, type, indices) {
    const state = this.getState();
    if (!state.wrongAnswers[readingId]) state.wrongAnswers[readingId] = {};
    state.wrongAnswers[readingId][type] = indices;
    this.save();
  },

  getWrongAnswers(readingId, type) {
    return this.getState().wrongAnswers[readingId]?.[type] || [];
  },

  addLearnedWords(words) {
    const state = this.getState();
    words.forEach(w => {
      if (!state.learnedWords.includes(w.toLowerCase())) {
        state.learnedWords.push(w.toLowerCase());
      }
    });
    this.save();
  },

  isWordPreviouslyLearned(word) {
    return this.getState().learnedWords.includes(word.toLowerCase());
  },

  // Admin
  getAdmin() {
    if (!this._admin) {
      try {
        const saved = localStorage.getItem(ADMIN_KEY);
        this._admin = saved ? { ...getDefaultAdmin(), ...JSON.parse(saved) } : getDefaultAdmin();
      } catch {
        this._admin = getDefaultAdmin();
      }
    }
    return this._admin;
  },

  saveAdmin() {
    localStorage.setItem(ADMIN_KEY, JSON.stringify(this._admin));
  },

  checkAdminPassword(pw) {
    return pw === this.getAdmin().password;
  },

  addStudent(name) {
    const admin = this.getAdmin();
    const id = 'student-' + Date.now();
    admin.students.push({ id, name, assignments: [], progress: {} });
    this.saveAdmin();
    return id;
  },

  removeStudent(id) {
    const admin = this.getAdmin();
    admin.students = admin.students.filter(s => s.id !== id);
    this.saveAdmin();
  },

  getStudents() {
    return this.getAdmin().students;
  },

  getStudent(id) {
    return this.getAdmin().students.find(s => s.id === id);
  },

  assignReading(studentId, readingId) {
    const student = this.getStudent(studentId);
    if (student && !student.assignments.includes(readingId)) {
      student.assignments.push(readingId);
      this.saveAdmin();
    }
  },

  unassignReading(studentId, readingId) {
    const student = this.getStudent(studentId);
    if (student) {
      student.assignments = student.assignments.filter(r => r !== readingId);
      this.saveAdmin();
    }
  },

  updateStudentProgress(studentId, readingId, data) {
    const student = this.getStudent(studentId);
    if (student) {
      student.progress[readingId] = { ...student.progress[readingId], ...data };
      this.saveAdmin();
    }
  },

  generateReportData(studentId) {
    const student = this.getStudent(studentId);
    if (!student) return null;
    return {
      name: student.name,
      assignments: student.assignments,
      progress: student.progress,
      date: new Date().toLocaleDateString('ko-KR'),
    };
  }
};
