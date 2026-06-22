export class Timer {
    constructor({ duration, onTick, onExpire }) {
        this.duration = duration;
        this.remaining = duration;
        this.onTick = onTick;
        this.onExpire = onExpire;
        this.intervalId = null;
        this.running = false;
        this.handleVisibility = this.handleVisibility.bind(this);
    }
    
    start() {
        this.remaining = this.duration;
        this.running = true;
        document.addEventListener('visibilitychange', this.handleVisibility);
        this.tick();
    }
    
    tick() {
        if (!this.running) return;
        this.intervalId = setInterval(() => {
            this.remaining--;
            this.onTick(this.remaining);
            if (this.remaining <= 0) {
                this.stop();
                this.onExpire();
            }
        }, 1000);
    }
    
    pause() {
        clearInterval(this.intervalId);
        this.running = false;
    }
    
    resume() {
        if (this.remaining > 0) {
            this.running = true;
            this.tick();
        }
    }
    
    stop() {
        clearInterval(this.intervalId);
        this.running = false;
        document.removeEventListener('visibilitychange', this.handleVisibility);
    }
    
    handleVisibility() {
        if (document.hidden) this.pause();
        else if (this.remaining > 0) this.resume();
    }
}
