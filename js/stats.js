const STORAGE_KEY = 'hangman_stats_v2';
const MAX_HISTORY = 20;

export class Stats {
    constructor() {
        this.data = { totalGames: 0, wins: 0, losses: 0, currentStreak: 0, bestStreak: 0, bestScore: 0, totalScore: 0, history: [] };
        this.load();
    }
    
    load() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                this.data = { ...this.data, ...JSON.parse(saved) };
            }
        } catch (e) {
            console.error("Error loading stats", e);
        }
    }
    
    save() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
        } catch (e) {
            console.error("Error saving stats", e);
        }
    }
    
    recordGame({ word, category, score, won, time }) {
        this.data.totalGames++;
        if (won) {
            this.data.wins++;
            this.data.currentStreak++;
            this.data.bestStreak = Math.max(this.data.bestStreak, this.data.currentStreak);
        } else {
            this.data.losses++;
            this.data.currentStreak = 0;
        }
        this.data.totalScore += score;
        this.data.bestScore = Math.max(this.data.bestScore, score);
        
        this.data.history.unshift({ word, category, score, won, time, date: new Date().toISOString() });
        if (this.data.history.length > MAX_HISTORY) this.data.history.pop();
        
        this.save();
    }
    
    getStats() { return { ...this.data }; }
    
    reset() {
        this.data = { totalGames: 0, wins: 0, losses: 0, currentStreak: 0, bestStreak: 0, bestScore: 0, totalScore: 0, history: [] };
        this.save();
    }
}
