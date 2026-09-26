/**
 * ProLingo: Web Audio API Sound Synthesizer
 * Produces crisp, delightful Duolingo-style audio feedback without external audio files.
 */

const SoundEngine = {
  ctx: null,
  enabled: true,

  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  },

  resume() {
    try {
      if (this.ctx && this.ctx.state === 'suspended') {
        const p = this.ctx.resume();
        if (p && typeof p.catch === 'function') {
          p.catch(() => {});
        }
      }
    } catch (e) {
      // Audio resume error silently ignored
    }
  },

  playTone(freq, type = 'sine', duration = 0.15, startTime = 0, gainVal = 0.25) {
    if (!this.enabled) return;
    this.init();
    this.resume();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime + startTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(gainVal, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + duration + 0.05);
    } catch (e) {
      console.warn('Audio play error', e);
    }
  },

  // Duolingo-style signature "Correct" bell chord (C5 -> E5 -> G5 -> C6)
  playCorrect() {
    if (!this.enabled) return;
    this.playTone(523.25, 'triangle', 0.2, 0.00, 0.35); // C5
    this.playTone(659.25, 'triangle', 0.25, 0.08, 0.35); // E5
    this.playTone(783.99, 'sine',     0.35, 0.16, 0.40); // G5
    this.playTone(1046.50, 'sine',    0.45, 0.24, 0.30); // C6
  },

  // Soft gentle error sound (descending F#4 -> D4)
  playIncorrect() {
    if (!this.enabled) return;
    this.playTone(369.99, 'sawtooth', 0.18, 0.00, 0.20);
    this.playTone(293.66, 'sawtooth', 0.28, 0.12, 0.20);
  },

  // Option select click / tap
  playTap() {
    if (!this.enabled) return;
    this.playTone(800, 'sine', 0.04, 0, 0.15);
  },

  // Heart lost shatter / drop sound
  playHeartLost() {
    if (!this.enabled) return;
    this.playTone(440, 'triangle', 0.12, 0.00, 0.25);
    this.playTone(330, 'triangle', 0.18, 0.08, 0.25);
    this.playTone(220, 'sine',     0.25, 0.16, 0.20);
  },

  // Gem claim / chest open chime
  playGem() {
    if (!this.enabled) return;
    this.playTone(880, 'sine', 0.15, 0.00, 0.3);
    this.playTone(1320, 'sine', 0.30, 0.10, 0.35);
  },

  // Lesson complete triumphant victory fanfare
  playVictory() {
    if (!this.enabled) return;
    const notes = [
      { f: 523.25, t: 0.00, d: 0.15 }, // C5
      { f: 659.25, t: 0.12, d: 0.15 }, // E5
      { f: 783.99, t: 0.24, d: 0.18 }, // G5
      { f: 1046.5, t: 0.38, d: 0.45 }, // C6
      { f: 1318.5, t: 0.50, d: 0.60 }  // E6
    ];
    notes.forEach(n => this.playTone(n.f, 'triangle', n.d, n.t, 0.35));
  },

  // Streak ignite fire whoosh
  playStreak() {
    if (!this.enabled) return;
    this.playTone(260, 'sawtooth', 0.15, 0.00, 0.2);
    this.playTone(520, 'triangle', 0.25, 0.10, 0.3);
    this.playTone(1040, 'sine', 0.40, 0.22, 0.35);
  },

  // Code runner success
  playCodeRun() {
    if (!this.enabled) return;
    this.playTone(600, 'sine', 0.08, 0.0, 0.2);
    this.playTone(900, 'sine', 0.12, 0.06, 0.25);
  }
};

if (typeof window !== 'undefined') {
  window.SoundEngine = SoundEngine;
}

