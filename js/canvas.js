export class HangmanCanvas {
    constructor(canvasEl) {
        this.canvas = canvasEl;
        this.ctx = canvasEl.getContext('2d');
        this.color = '#e0e0e0';
        this.lineWidth = 4;
        this.animationDuration = 300;
        
        this.steps = [
            // 1. Base
            (p) => this._drawLine(50, 320, 250, 320, p),
            // 2. Pole
            (p) => this._drawLine(80, 320, 80, 30, p),
            // 3. Beam
            (p) => this._drawLine(80, 30, 210, 30, p),
            // 4. Rope
            (p) => this._drawLine(210, 30, 210, 60, p),
            // 5. Head
            (p) => this._drawCircle(210, 85, 25, p),
            // 6. Body
            (p) => this._drawLine(210, 110, 210, 200, p),
            // 7. Left arm
            (p) => this._drawLine(210, 140, 170, 180, p),
            // 8. Right arm
            (p) => this._drawLine(210, 140, 250, 180, p),
            // 9. Both legs
            (p) => {
                this._drawLine(210, 200, 170, 270, p);
                this._drawLine(210, 200, 250, 270, p);
            }
        ];
    }
    
    reset() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    drawStep(stepNumber) {
        // stepNumber 1-9
        if (stepNumber < 1 || stepNumber > 9) return;
        const stepFn = this.steps[stepNumber - 1];
        
        let start = null;
        const animate = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / this.animationDuration, 1);
            
            // clear slightly around the new line to prevent aliasing artifacts if needed, or just redraw
            this.ctx.strokeStyle = this.color;
            this.ctx.lineWidth = this.lineWidth;
            this.ctx.lineCap = 'round';
            this.ctx.beginPath();
            stepFn(progress);
            this.ctx.stroke();
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    }
    
    _drawLine(x1, y1, x2, y2, p) {
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x1 + (x2 - x1) * p, y1 + (y2 - y1) * p);
    }
    
    _drawCircle(cx, cy, r, p) {
        this.ctx.arc(cx, cy, r, -0.5 * Math.PI, -0.5 * Math.PI + 2 * Math.PI * p);
    }
}
