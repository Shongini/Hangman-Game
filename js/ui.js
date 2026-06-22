export class UI {
    constructor() {
        this.screens = {
            menu: document.getElementById('screen-menu'),
            game: document.getElementById('screen-game'),
            result: document.getElementById('screen-result'),
            stats: document.getElementById('screen-stats')
        };
    }
    
    showScreen(name) {
        Object.values(this.screens).forEach(s => {
            if(s) s.classList.remove('screen--active');
        });
        if(this.screens[name]) this.screens[name].classList.add('screen--active');
    }
    
    renderWordDisplay(maskedWord, revealedPositions = []) {
        const container = document.getElementById('word-display');
        container.innerHTML = '';
        for (let i = 0; i < maskedWord.length; i++) {
            const span = document.createElement('span');
            const char = maskedWord[i];
            span.className = 'word-letter';
            if (char === ' ') {
                span.classList.add('word-letter--space');
                span.textContent = ' ';
            } else if (char !== '_') {
                span.classList.add('word-letter--revealed');
                span.textContent = char;
                if (revealedPositions.includes(i)) {
                    span.style.animationDelay = `${(i % 5) * 50}ms`;
                }
            } else {
                span.textContent = '_';
            }
            container.appendChild(span);
        }
    }
    
    markKey(letter, correct) {
        const key = document.querySelector(`.key[data-letter="${letter}"]`);
        if (!key) return;
        key.classList.add(correct ? 'key--correct' : 'key--wrong');
        key.classList.add('key--disabled');
    }
    
    resetKeyboard() {
        document.querySelectorAll('.key').forEach(k => {
            k.className = 'key';
        });
    }
    
    highlightKey(letter) {
        const key = document.querySelector(`.key[data-letter="${letter}"]`);
        if (key) {
            key.style.transform = 'scale(0.9)';
            setTimeout(() => key.style.transform = '', 150);
        }
    }
    
    updateTimer(seconds) {
        const el = document.getElementById('game-timer-display');
        if (seconds < 0) {
            el.textContent = '--:--';
            el.className = '';
            return;
        }
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        el.textContent = `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
        el.classList.toggle('timer--warning', seconds <= 30 && seconds > 10);
        el.classList.toggle('timer--danger', seconds <= 10);
        el.classList.toggle('timer--pulse', seconds <= 10);
    }
    
    updateScore(score) {
        document.getElementById('game-score-display').textContent = `${score} pkt`;
    }
    
    updateGameInfo(state) {
        document.getElementById('game-category-display').textContent = `${state.categoryIcon} ${state.categoryName}`;
        document.getElementById('wrong-count-display').textContent = state.wrongGuesses;
        document.getElementById('max-wrong-display').textContent = state.maxWrong;
        const streakEl = document.getElementById('streak-display');
        if(streakEl) streakEl.textContent = state.streak || 0;
    }
    
    updateHints(remaining, max) {
        document.querySelectorAll('.hint-btn').forEach((btn, i) => {
            btn.classList.toggle('hint-btn--used', i >= remaining);
            btn.disabled = i >= remaining;
        });
    }
    
    renderResult(state, score, stats) {
        const isWin = state.won;
        const isTimeout = !state.won && state.elapsedSeconds >= state.timerDuration && state.timerDuration > 0;
        
        document.getElementById('result-icon').textContent = isWin ? '🏆' : (isTimeout ? '⏰' : '💀');
        document.getElementById('result-title').textContent = isWin ? 'BRAWO!' : (isTimeout ? 'CZAS MINĄŁ!' : 'PRZEGRAŁEŚ!');
        document.getElementById('result-word-display').textContent = state.word;
        document.getElementById('result-category-display').textContent = `${state.categoryIcon} ${state.categoryName}`;
        
        const elapsed = state.elapsedSeconds;
        document.getElementById('result-time-display').textContent = `${Math.floor(elapsed/60)}:${String(elapsed%60).padStart(2,'0')}`;
        document.getElementById('result-errors-display').textContent = `${state.wrongGuesses}/${state.maxWrong}`;
        document.getElementById('result-hints-display').textContent = `${state.maxHints - state.hintsRemaining} użyte`;
        document.getElementById('result-score-display').textContent = `★ ${score} pkt ★`;
        document.getElementById('result-streak-display').textContent = `${stats.currentStreak} 🔥`;
        
        if (isWin) this.showConfetti();
        else this.showScreenShake();
    }
    
    renderStats(stats) {
        document.getElementById('stats-total').textContent = stats.totalGames;
        document.getElementById('stats-wins').textContent = stats.wins;
        document.getElementById('stats-losses').textContent = stats.losses;
        const winRate = stats.totalGames > 0 ? Math.round((stats.wins / stats.totalGames) * 100) : 0;
        document.getElementById('stats-win-rate-text').textContent = `${winRate}%`;
        const bar = document.getElementById('stats-win-rate-bar');
        if (bar) bar.style.width = `${winRate}%`;
        document.getElementById('stats-best-score').textContent = stats.bestScore;
        document.getElementById('stats-total-score').textContent = stats.totalScore;
        document.getElementById('stats-best-streak').textContent = stats.bestStreak;
        document.getElementById('stats-current-streak').textContent = stats.currentStreak;
        
        const list = document.getElementById('stats-history-list');
        list.innerHTML = '';
        stats.history.forEach(h => {
            const item = document.createElement('div');
            item.style.display = 'flex';
            item.style.justifyContent = 'space-between';
            item.style.padding = '5px 0';
            item.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
            item.innerHTML = `
                <span>${h.won ? '✅' : '❌'} <strong>${h.word}</strong> (${h.category})</span>
                <span>${h.score} pkt</span>
            `;
            list.appendChild(item);
        });
    }
    
    showConfetti() {
        const container = document.getElementById('confetti-container');
        container.innerHTML = '';
        const colors = ['#6c5ce7', '#a29bfe', '#00e676', '#ffab40', '#ff5252', '#00bcd4'];
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'confetti-particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.animationDelay = `${Math.random() * 2}s`;
            particle.style.animationDuration = `${2 + Math.random() * 3}s`;
            container.appendChild(particle);
        }
        setTimeout(() => container.innerHTML = '', 5000);
    }
    
    showScreenShake() {
        document.body.classList.add('screen-shake');
        setTimeout(() => document.body.classList.remove('screen-shake'), 500);
    }
    
    showHelpModal() { document.getElementById('modal-help').classList.add('modal--active'); }
    hideHelpModal() { document.getElementById('modal-help').classList.remove('modal--active'); }
    
    updateSoundButton(muted) {
        document.getElementById('btn-sound-toggle').textContent = muted ? '🔇' : '🔊';
    }
    
    setSelectedCategory(categoryKey) {
        document.querySelectorAll('.category-card').forEach(c => c.classList.remove('category-card--selected'));
        const card = document.querySelector(`.category-card[data-category="${categoryKey}"]`);
        if (card) card.classList.add('category-card--selected');
    }
    
    setSelectedDifficulty(difficultyKey) {
        document.querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('difficulty-btn--selected'));
        const btn = document.querySelector(`.difficulty-btn[data-difficulty="${difficultyKey}"]`);
        if (btn) btn.classList.add('difficulty-btn--selected');
    }
    
    getSelectedCategory() {
        return document.querySelector('.category-card--selected')?.dataset.category || null;
    }
    
    getSelectedDifficulty() {
        return document.querySelector('.difficulty-btn--selected')?.dataset.difficulty || 'easy';
    }
    
    isTimerEnabled() {
        return document.getElementById('timer-toggle')?.checked ?? true;
    }
}
