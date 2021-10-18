export default class FPSCounter {

    constructor() {
        this._times = [];
        this._showFPS = false;
        this._callback = null;
    }

    start(callback) {
        this._showFPS = true;
        this._callback = callback;
        this._step();
    }

    stop() {
        this._showFPS = false;
    }

    _step() {
        // https://www.growingwiththeweb.com/2017/12/fast-simple-js-fps-counter.html
        const now = performance.now();
        while (this._times.length && this._times[0] <= now - 1000) {
            this._times.shift();
        }
        this._times.push(now);
        typeof this._callback === 'function' && this._callback(this._times.length);
        this._showFPS && requestAnimationFrame(this._step.bind(this));
    }

};
