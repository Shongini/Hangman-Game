export class KeyboardHandler {
    constructor({ onLetter, onEnter, onEscape, onHint }) {
        this.onLetter = onLetter;
        this.onEnter = onEnter;
        this.onEscape = onEscape;
        this.onHint = onHint;
        this.enabled = false;
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }
    
    handleKeyDown(e) {
        if (!this.enabled) return;
        const key = e.key.toUpperCase();
        
        if (e.key === 'Enter') { e.preventDefault(); this.onEnter(); return; }
        if (e.key === 'Escape') { e.preventDefault(); this.onEscape(); return; }
        if (e.ctrlKey && key === 'H') { e.preventDefault(); this.onHint(); return; }
        
        const polishLetters = 'AĄBCĆDEĘFGHIJKLŁMNŃOÓPQRSŚTUVWXYZŻŹ';
        if (polishLetters.includes(key) && key.length === 1 && !e.ctrlKey && !e.altKey) {
            // handle altKey for polish diacritics - browser sends Ą when AltGraph+A is pressed on PL keyboard, which is fine
            e.preventDefault();
            this.onLetter(key);
        }
    }
    
    enable() {
        this.enabled = true;
        document.addEventListener('keydown', this.handleKeyDown);
    }
    
    disable() {
        this.enabled = false;
        document.removeEventListener('keydown', this.handleKeyDown);
    }
}
