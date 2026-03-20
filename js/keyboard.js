// ===== Keyboard Shortcut Manager =====
// Centralized keyboard shortcut handling for Chromebook physical keyboards

class KeyboardManager {
  constructor() {
    this._handler = null;
    this._shortcuts = [];
    this._boundHandler = this._onKeydown.bind(this);
    document.addEventListener('keydown', this._boundHandler);
  }

  /**
   * Set shortcuts for the current view.
   * Each shortcut: { key, ctrl, shift, description, action, koLabel }
   * key can be: 'ArrowLeft', 'ArrowRight', 'Enter', 'Space', '1'-'4', 'a'-'z', 'Escape', etc.
   */
  setShortcuts(shortcuts) {
    this._shortcuts = shortcuts || [];
  }

  clearShortcuts() {
    this._shortcuts = [];
  }

  getShortcuts() {
    return this._shortcuts;
  }

  _onKeydown(e) {
    // Don't intercept if user is typing in an input field
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) {
      return;
    }

    for (const s of this._shortcuts) {
      const keyMatch = e.key === s.key || e.code === s.key ||
        (s.key === 'Space' && (e.key === ' ' || e.code === 'Space'));

      if (keyMatch) {
        if (s.ctrl && !e.ctrlKey) continue;
        if (s.shift && !e.shiftKey) continue;
        if (!s.ctrl && e.ctrlKey) continue;

        e.preventDefault();
        e.stopPropagation();
        s.action();
        return;
      }
    }
  }

  destroy() {
    document.removeEventListener('keydown', this._boundHandler);
  }
}

export const keyboard = new KeyboardManager();

/**
 * Render a keyboard shortcut hint bar at the bottom of a container.
 * @param {Array} shortcuts - array of { keyLabel, description }
 * @returns {string} HTML string
 */
export function renderShortcutHints(shortcuts) {
  if (!shortcuts || shortcuts.length === 0) return '';
  return `
    <div class="keyboard-hints">
      <div class="keyboard-hints-title">⌨️ 단축키</div>
      <div class="keyboard-hints-list">
        ${shortcuts.map(s => `
          <div class="keyboard-hint-item">
            <kbd>${s.keyLabel}</kbd>
            <span>${s.description}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}
