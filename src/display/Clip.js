import Sprite from './Sprite';

export default class Clip extends Sprite {

    constructor(props) {
        super(props);
        this.props = {
            fps: 12,
            renderMiddleFrames: false,
            ...this.props
        };

        this.step((timestamp) => {
            if (timestamp && this._frames.length && this.layer) {
                const secs = timestamp / 1000;
                const frame = Math.round(secs * this.props.fps) % this._frames.length;

                if (this.props.renderMiddleFrames || frame != this._current) {
                    this._current = frame;
                    this.renderFrame(frame);
                }
            }
        });
    }

}