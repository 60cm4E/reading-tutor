// ===== Confetti & Celebration Animations =====

export function showConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;

  const colors = ['#6C63FF', '#FF6B9D', '#FFB347', '#4ECDC4', '#FFE66D', '#FF6B6B'];
  const shapes = ['■', '●', '▲', '★', '♦'];

  for (let i = 0; i < 50; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.textContent = shapes[Math.floor(Math.random() * shapes.length)];
    piece.style.left = Math.random() * 100 + '%';
    piece.style.color = colors[Math.floor(Math.random() * colors.length)];
    piece.style.fontSize = (Math.random() * 12 + 8) + 'px';
    piece.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
    piece.style.animationDelay = (Math.random() * 0.8) + 's';
    canvas.appendChild(piece);
  }

  setTimeout(() => {
    canvas.innerHTML = '';
  }, 4000);
}

export function showToast(message, duration = 2000) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
}

export function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
