export class AccurateTimer {
    constructor(intervalMs, onStep) {
        this.interval = intervalMs;
        this.onStep = onStep;

        this._lastTime = null;
        this._accumulator = 0;
        this._running = false;
        this._frameId = null;
    }

    start() {
        this._running = true;
        this._lastTime = null;
        this._accumulator = 0;
        this._frameId = null;
        this._loop = this._loop.bind(this);
        this._frameId = requestAnimationFrame(this._loop);
    }

    stop() {
        this._running = false;
        if(this._frameId) cancelAnimationFrame(this._loop);
    }

    setInterval(newIntervalMs) {
        this.interval = newIntervalMs;
    }

    _loop(timestamp) {
        if(!this._running) return;

        if(this._lastTime == null) {
            this._lastTime = timestamp;
        }

        const delta = timestamp - this._lastTime;
        this._lastTime = timestamp;
        this._accumulator += delta;

        const frameStart = performance.now();
        const timeBudget = 10; // max allocated time per frame in ms

        while(this._accumulator >= this.interval) {
            this.onStep();
            this._accumulator -= this.interval;

            if(performance.now() - frameStart > timeBudget) {
                break;
            }
        }

        this._frameId = requestAnimationFrame(this._loop);
    }
}