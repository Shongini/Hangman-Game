export class SoundManager {
    constructor() {
        this.ctx = null;
        this.muted = true;
        this.initialized = false;
        try {
            const saved = localStorage.getItem('hangman_sound_muted');
            if (saved !== null) this.muted = saved === 'true';
        } catch(e) {}
    }
    
    init() {
        if (this.initialized) return;
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
            this.ctx = new AudioContext();
        }
        this.initialized = true;
    }
    
    playTone(frequency, type, duration, volume = 0.3) {
        if (this.muted || !this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type;
        osc.frequency.value = frequency;
        gain.gain.value = volume;
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
        osc.connect(gain).connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
    }
    
    playCorrect() { this.playTone(800, 'sine', 0.15, 0.2); }
    playWrong() { this.playTone(200, 'square', 0.25, 0.15); }
    playClick() { this.playTone(600, 'sine', 0.05, 0.1); }
    playTick() { this.playTone(1000, 'sine', 0.03, 0.08); }
    
    playWin() {
        if (this.muted || !this.ctx) return;
        [523, 659, 784, 1047].forEach((freq, i) => {
            setTimeout(() => this.playTone(freq, 'sine', 0.3, 0.2), i * 150);
        });
    }
    
    playLose() {
        if (this.muted || !this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(400, this.ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(100, this.ctx.currentTime + 0.8);
        gain.gain.value = 0.15;
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);
        osc.connect(gain).connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.8);
    }
    
    toggleMute() {
        this.muted = !this.muted;
        try { localStorage.setItem('hangman_sound_muted', this.muted); } catch(e) {}
        return this.muted;
    }
    
    isMuted() { return this.muted; }
}
