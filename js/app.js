import { DIFFICULTIES, DRAW_STEPS } from './config.js';
import { Game } from './game.js';
import { HangmanCanvas } from './canvas.js';
import { Timer } from './timer.js';
import { Stats } from './stats.js';
import { SoundManager } from './sound.js';
import { KeyboardHandler } from './keyboard.js';
import { UI } from './ui.js';

class App {
    constructor() {
        this.ui = new UI();
        this.stats = new Stats();
        this.sound = new SoundManager();
        this.game = null;
        this.canvas = null;
        this.timer = null;
        this.keyboard = null;
        this.currentDrawSteps = [];
    }
    
    init() {
        this.canvas = new HangmanCanvas(document.getElementById('hangman-canvas'));
        this.keyboard = new KeyboardHandler({
            onLetter: (letter) => this.handleGuess(letter),
            onEnter: () => this.handleEnter(),
            onEscape: () => this.handleEscape(),
            onHint: () => this.handleHint('reveal')
        });
        
        this.bindEvents();
        this.ui.showScreen('menu');
        this.ui.setSelectedDifficulty('easy');
        this.ui.setSelectedCategory('proverbs');
        this.ui.updateSoundButton(this.sound.isMuted());
    }
    
    bindEvents() {
        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', () => {
                this.sound.init();
                this.sound.playClick();
                this.ui.setSelectedCategory(card.dataset.category);
            });
        });
        
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.sound.playClick();
                this.ui.setSelectedDifficulty(btn.dataset.difficulty);
            });
        });
        
        document.getElementById('btn-start-game').addEventListener('click', () => {
            this.sound.init();
            this.sound.playClick();
            this.startGame();
        });
        
        document.getElementById('keyboard').addEventListener('click', (e) => {
            const key = e.target.closest('.key');
            if (key && !key.classList.contains('key--disabled')) {
                this.sound.init();
                this.handleGuess(key.dataset.letter);
            }
        });
        
        const hintBtns = document.getElementById('hint-buttons');
        if (hintBtns) {
            hintBtns.addEventListener('click', (e) => {
                const btn = e.target.closest('.hint-btn');
                if (btn && !btn.disabled) this.handleHint(btn.dataset.hintType);
            });
        }
        
        document.getElementById('btn-sound-toggle').addEventListener('click', () => {
            this.sound.init();
            const muted = this.sound.toggleMute();
            this.ui.updateSoundButton(muted);
        });
        
        document.getElementById('btn-next-round').addEventListener('click', () => {
            this.sound.playClick();
            this.startGame();
        });
        
        document.getElementById('btn-result-menu').addEventListener('click', () => {
            this.sound.playClick();
            this.goToMenu();
        });
        
        document.getElementById('btn-show-stats').addEventListener('click', () => {
            this.sound.playClick();
            this.showStats();
        });
        
        document.getElementById('btn-stats-back').addEventListener('click', () => {
            this.sound.playClick();
            this.goToMenu();
        });
        
        document.getElementById('btn-stats-reset').addEventListener('click', () => {
            this.sound.playClick();
            if (confirm('Czy na pewno chcesz zresetować statystyki?')) {
                this.stats.reset();
                this.showStats();
            }
        });
        
        document.getElementById('btn-show-help').addEventListener('click', () => {
            this.sound.playClick();
            this.ui.showHelpModal();
        });
        
        document.getElementById('btn-close-help').addEventListener('click', () => {
            this.sound.playClick();
            this.ui.hideHelpModal();
        });
        
        document.getElementById('btn-back-to-menu').addEventListener('click', () => {
            this.sound.playClick();
            this.goToMenu();
        });
    }
    
    startGame() {
        const categoryKey = this.ui.getSelectedCategory();
        if (!categoryKey) { alert('Wybierz kategorię!'); return; }
        
        const difficultyKey = this.ui.getSelectedDifficulty();
        const timerEnabled = this.ui.isTimerEnabled();
        const difficulty = DIFFICULTIES[difficultyKey];
        
        this.game = new Game({ categoryKey, difficultyKey, timerEnabled });
        this.game.start();
        
        this.currentDrawSteps = DRAW_STEPS[difficulty.maxWrong] || DRAW_STEPS[9];
        this.canvas.reset();
        this.ui.resetKeyboard();
        this.ui.showScreen('game');
        this.keyboard.enable();
        
        const state = this.game.getState();
        this.ui.renderWordDisplay(state.maskedWord);
        this.ui.updateGameInfo({ ...state, streak: this.stats.getStats().currentStreak });
        this.ui.updateHints(state.hintsRemaining, difficulty.hints);
        this.ui.updateScore(0);
        
        if (this.timer) this.timer.stop();
        if (timerEnabled) {
            this.timer = new Timer({
                duration: difficulty.timer,
                onTick: (remaining) => {
                    this.ui.updateTimer(remaining);
                    if (remaining <= 10 && remaining > 0) this.sound.playTick();
                },
                onExpire: () => this.endGame(false, true)
            });
            this.timer.start();
            this.ui.updateTimer(difficulty.timer);
        } else {
            this.ui.updateTimer(-1);
        }
    }
    
    handleGuess(letter) {
        if (!this.game || this.game.getState().isFinished) return;
        
        const result = this.game.guess(letter);
        if (!result) return;
        
        this.ui.highlightKey(letter);
        this.ui.markKey(letter, result.hit);
        
        const state = this.game.getState();
        
        if (result.hit) {
            this.sound.playCorrect();
            this.ui.renderWordDisplay(state.maskedWord, result.positions);
        } else {
            this.sound.playWrong();
            const stepIndex = state.wrongGuesses - 1;
            if (stepIndex < this.currentDrawSteps.length) {
                this.canvas.drawStep(this.currentDrawSteps[stepIndex]);
            }
        }
        
        this.ui.updateGameInfo({ ...state, streak: this.stats.getStats().currentStreak });
        this.ui.updateScore(this.game.calculateScore());
        
        if (result.gameOver) {
            this.endGame(result.won, false);
        }
    }
    
    handleHint(type) {
        if (!this.game || this.game.getState().isFinished) return;
        
        const result = this.game.useHint(type);
        if (!result) return;
        
        this.sound.playClick();
        const state = this.game.getState();
        this.ui.updateHints(state.hintsRemaining, this.game.maxHints);
        
        if (type === 'reveal') {
            this.ui.renderWordDisplay(state.maskedWord, result.data.positions);
            if (result.data.letter) this.ui.markKey(result.data.letter, true);
            if (state.isFinished) this.endGame(state.won, false);
        } else if (type === 'clue') {
            alert(`💡 Wskazówka: ${result.data}`);
        } else if (type === 'eliminate') {
            result.data.forEach(l => this.ui.markKey(l, false));
        }
        
        this.ui.updateScore(this.game.calculateScore());
    }
    
    endGame(won, timeout) {
        this.keyboard.disable();
        if (this.timer) this.timer.stop();
        
        const state = this.game.getState();
        const score = won ? this.game.calculateScore() : 0;
        
        this.stats.recordGame({
            word: state.word,
            category: state.categoryName,
            score,
            won,
            time: state.elapsedSeconds
        });
        
        if (won) this.sound.playWin();
        else this.sound.playLose();
        
        setTimeout(() => {
            this.ui.renderResult(
                { ...state, won, timerDuration: DIFFICULTIES[state.difficultyKey]?.timer || 0, maxHints: this.game.maxHints },
                score,
                this.stats.getStats()
            );
            this.ui.showScreen('result');
        }, won ? 500 : 1000);
    }
    
    handleEnter() {
        if (this.game && this.game.getState().isFinished) this.startGame();
    }
    
    handleEscape() {
        this.goToMenu();
    }
    
    goToMenu() {
        if (this.timer) this.timer.stop();
        this.keyboard.disable();
        this.ui.showScreen('menu');
    }
    
    showStats() {
        this.ui.renderStats(this.stats.getStats());
        this.ui.showScreen('stats');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
});
