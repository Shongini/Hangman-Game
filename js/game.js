import { CATEGORIES, DIFFICULTIES } from './config.js';

export class Game {
    constructor({ categoryKey, difficultyKey, timerEnabled }) {
        if (categoryKey === 'random') {
            const keys = Object.keys(CATEGORIES);
            this.categoryKey = keys[Math.floor(Math.random() * keys.length)];
        } else {
            this.categoryKey = categoryKey;
        }
        
        this.difficultyKey = difficultyKey;
        this.difficulty = DIFFICULTIES[this.difficultyKey];
        
        const category = CATEGORIES[this.categoryKey];
        this.categoryName = category.name;
        this.categoryIcon = category.icon;
        
        const wordIndex = Math.floor(Math.random() * category.words.length);
        this.word = category.words[wordIndex];
        this.clue = category.hints[wordIndex] || "Brak wskazówki";
        
        this.maskedWord = this.word.split('').map(c => c === ' ' ? ' ' : '_').join('');
        
        this.wrongGuesses = 0;
        this.guessedLetters = new Set();
        this.maxHints = this.difficulty.hints;
        this.hintsRemaining = this.maxHints;
        
        this.isFinished = false;
        this.won = false;
        this.startTime = null;
    }
    
    start() {
        this.startTime = Date.now();
        this.isFinished = false;
    }
    
    guess(letter) {
        if (this.isFinished || this.guessedLetters.has(letter)) return null;
        
        this.guessedLetters.add(letter);
        let hit = false;
        const positions = [];
        
        for (let i = 0; i < this.word.length; i++) {
            if (this.word[i] === letter) {
                hit = true;
                positions.push(i);
                this.maskedWord = this.maskedWord.substring(0, i) + letter + this.maskedWord.substring(i + 1);
            }
        }
        
        if (!hit) {
            this.wrongGuesses++;
        }
        
        this.won = this.isWon();
        const lost = this.isLost();
        this.isFinished = this.won || lost;
        
        return { hit, positions, gameOver: this.isFinished, won: this.won };
    }
    
    useHint(type) {
        if (this.hintsRemaining <= 0 || this.isFinished) return null;
        
        this.hintsRemaining--;
        let data = null;
        
        if (type === 'reveal') {
            const unrevealed = [];
            for (let i = 0; i < this.word.length; i++) {
                if (this.word[i] !== ' ' && this.maskedWord[i] === '_') {
                    unrevealed.push({ index: i, letter: this.word[i] });
                }
            }
            if (unrevealed.length > 0) {
                const choice = unrevealed[Math.floor(Math.random() * unrevealed.length)];
                this.guessedLetters.add(choice.letter);
                
                const positions = [];
                for (let i = 0; i < this.word.length; i++) {
                    if (this.word[i] === choice.letter) {
                        positions.push(i);
                        this.maskedWord = this.maskedWord.substring(0, i) + choice.letter + this.maskedWord.substring(i + 1);
                    }
                }
                data = { letter: choice.letter, positions };
                this.won = this.isWon();
                this.isFinished = this.won || this.isLost();
            }
        } else if (type === 'clue') {
            data = this.clue;
        } else if (type === 'eliminate') {
            const lettersToEliminate = [];
            const polishLetters = 'AĄBCĆDEĘFGHIJKLŁMNŃOÓPQRSŚTUVWXYZŻŹ';
            for (const char of polishLetters) {
                if (!this.word.includes(char) && !this.guessedLetters.has(char)) {
                    lettersToEliminate.push(char);
                }
            }
            
            // Shuffle and pick 5
            for (let i = lettersToEliminate.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [lettersToEliminate[i], lettersToEliminate[j]] = [lettersToEliminate[j], lettersToEliminate[i]];
            }
            
            data = lettersToEliminate.slice(0, 5);
            data.forEach(l => this.guessedLetters.add(l));
        }
        
        return { type, data, remaining: this.hintsRemaining };
    }
    
    calculateScore() {
        const elapsed = (Date.now() - this.startTime) / 1000;
        const letterCount = this.word.replace(/ /g, '').length;
        let score = (letterCount * 10) - (this.wrongGuesses * 15);
        if (elapsed < 30) score += 50;
        else if (elapsed < 60) score += 25;
        score -= (this.maxHints - this.hintsRemaining) * 20;
        score = Math.max(0, Math.round(score * this.difficulty.multiplier));
        return score;
    }
    
    getState() {
        return {
            word: this.word,
            maskedWord: this.maskedWord,
            wrongGuesses: this.wrongGuesses,
            maxWrong: this.difficulty.maxWrong,
            guessedLetters: [...this.guessedLetters],
            hintsRemaining: this.hintsRemaining,
            isFinished: this.isFinished,
            won: this.won,
            categoryKey: this.categoryKey,
            categoryName: this.categoryName,
            categoryIcon: this.categoryIcon,
            difficultyKey: this.difficultyKey,
            elapsedSeconds: Math.floor((Date.now() - this.startTime) / 1000)
        };
    }
    
    isWon() { return this.maskedWord === this.word; }
    isLost() { return this.wrongGuesses >= this.difficulty.maxWrong; }
    getWord() { return this.word; }
    getElapsedTime() { return Math.floor((Date.now() - this.startTime) / 1000); }
}
