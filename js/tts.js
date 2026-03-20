// ===== Text-to-Speech Utility =====
// Fixed for mobile browsers: NO setTimeout between user gesture and speak()

class TTSManager {
  constructor() {
    this.synth = window.speechSynthesis;
    this.speaking = false;
    this.currentUtterance = null;
    this.onWordCallback = null;
    this.voices = [];
    this._voiceReady = false;

    // Load voices
    this._loadVoices();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = () => this._loadVoices();
    }

    // Chrome bug workaround: resume every 10s to prevent pause
    setInterval(() => {
      if (this.synth.speaking && !this.synth.paused) {
        this.synth.pause();
        this.synth.resume();
      }
    }, 10000);
  }

  _loadVoices() {
    this.voices = this.synth.getVoices();
    if (this.voices.length > 0) {
      this._voiceReady = true;
    }
  }

  _pickVoice() {
    if (!this._voiceReady) this.voices = this.synth.getVoices();
    if (this.voices.length === 0) return null;
    return this.voices.find(v => v.lang.startsWith('en') && v.name.includes('Google'))
      || this.voices.find(v => v.lang.startsWith('en') && v.name.includes('Microsoft'))
      || this.voices.find(v => v.lang.startsWith('en') && (v.name.includes('Samantha') || v.name.includes('Siri')))
      || this.voices.find(v => v.lang === 'en-US')
      || this.voices.find(v => v.lang.startsWith('en'))
      || null;
  }

  /**
   * CRITICAL: This method must be called SYNCHRONOUSLY from a user gesture handler.
   * Do NOT wrap in setTimeout/Promise.then before calling synth.speak().
   */
  speak(text, options = {}) {
    return new Promise((resolve) => {
      // Cancel previous
      this.synth.cancel();
      this.speaking = false;
      this.currentUtterance = null;

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = options.lang || 'en-US';
      utterance.rate = options.rate || 0.75;
      utterance.pitch = options.pitch || 1.1;
      utterance.volume = options.volume || 1;

      const voice = this._pickVoice();
      if (voice) utterance.voice = voice;

      this.speaking = true;
      this.currentUtterance = utterance;

      utterance.onboundary = (event) => {
        if (event.name === 'word' && this.onWordCallback) {
          this.onWordCallback(event.charIndex, event.charLength || 0);
        }
      };

      utterance.onend = () => {
        this.speaking = false;
        this.currentUtterance = null;
        resolve();
      };

      utterance.onerror = (e) => {
        console.warn('[TTS] error:', e.error);
        this.speaking = false;
        this.currentUtterance = null;
        resolve();
      };

      // Speak immediately — NO setTimeout!
      this.synth.speak(utterance);

      // Safety: resolve after 10s max
      setTimeout(() => {
        if (this.currentUtterance === utterance && this.speaking) {
          if (!this.synth.speaking) {
            this.speaking = false;
            this.currentUtterance = null;
            resolve();
          }
        }
      }, 10000);
    });
  }

  speakWord(word) {
    return this.speak(word, { rate: 0.65, pitch: 1.1 });
  }

  speakPhonicsSound(sound) {
    return this.speak(sound, { rate: 0.45, pitch: 1.0, volume: 1 });
  }

  speakSentence(sentence) {
    return this.speak(sentence, { rate: 0.7, pitch: 1.05 });
  }

  speakSentenceWithKaraoke(sentence, wordCallback) {
    this.onWordCallback = wordCallback;
    return this.speak(sentence, { rate: 0.65, pitch: 1.05 }).then(() => {
      this.onWordCallback = null;
    });
  }

  stop() {
    this.synth.cancel();
    this.speaking = false;
    this.currentUtterance = null;
    this.onWordCallback = null;
  }

  isSpeaking() {
    return this.speaking;
  }
}

export const tts = new TTSManager();
