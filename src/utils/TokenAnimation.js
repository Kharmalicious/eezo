export default class TokenAnimation {

    constructor() {
        this.NW = { stand: [], walk: [] };
        this.NN = { stand: [], walk: [] };
        this.NE = { stand: [], walk: [] };
        this.EE = { stand: [], walk: [] };
        this.SE = { stand: [], walk: [] };
        this.SS = { stand: [], walk: [] };
        this.SW = { stand: [], walk: [] };
        this.WW = { stand: [], walk: [] };
    }

    setDefault({ position, size, offset }) {
        this._frameDefaults = new TokenAnimationFrame({ position, size, offset });
    }

    addFrame(dir, action, frame) {
        this[dir][action].push(new TokenAnimationFrame(frame, this._frameDefaults));
    }

    setFrames(dir, action, frames) {
        frames.forEach(frame => this.addFrame(dir, action, frame));
    }

    setDirection(dir, animation) {
        for (let action in animation) {
            this.setFrames(dir, action, animation[action]);
        }
    }

};

export class TokenAnimationFrame {

    constructor(
        { position, size, offset },
        { position: _position, size: _size, offset: _offset } = {}
    ) {
        this.position = position || _position;
        this.size = size || _size;
        this.offset = offset || _offset;
    }

};
