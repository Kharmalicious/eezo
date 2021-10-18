import Point from '../core/Point';
import Bitmap from './Bitmap';

export default class Sprite extends Bitmap {

    constructor(props) {
        super({
            size: [1, 1],
            ...props
        });
        this.props = {
            physical: false,
            ...this.props
        };
        this._frames = [];
        this._current = -1;
        this.UNIT = 1
    }

    onAdd() {
        if (this.layer) {
            const scale = this.layer.UNIT / this.UNIT;
            this.props.scale = Point.get(scale, scale);

            const preloaded = this.layer.stage.imageCache[this.props.imagePath];
            if (preloaded) {
                this.image = preloaded;
                this.updateImageSize(preloaded);
                this.reposition();
            }
        }
        this._frames.length && this.renderFrame(0);
    }

    onLoad() {
        this.reposition();
    }

    reposition() {
        if (this._loaded) {
            // repositions bitmap vertically aligned with position
            this.props.destinationPosition = this.props.destinationPosition
                .sum([-this.destination.size.x / 2, -this.destination.size.y]);
        }
    }

    addFrames(frames) {
        frames.forEach(frame => {
            this.addFrame(frame.position, frame.size, frame.offset);
        });
    }

    addFrame(position, size, offset) {
        this._frames.push({ size, position, offset });
    }

    renderFrame(frame) {
        this._current = frame;
        const { size, position, offset } = this._frames[frame];

        const sizeChanged = size && size !== this.props.sourceSize;
        const positionChanged = position && position !== this.props.sourcePosition;
        const offsetChanged = offset && offset !== this.props.destinationPosition;

        sizeChanged && (this.props.sourceSize = Point.get(size));
        sizeChanged && (this.props.destinationSize = Point.get(size).mult(this.props.scale));
        positionChanged && (this.props.sourcePosition = Point.get(position));
        offsetChanged && (this.props.destinationPosition = Point.get(offset).mult(this.props.scale));
        (offsetChanged || sizeChanged) && this.reposition();
    }

    position() {
        const oldPos = Point.get(this.props.position);
        super.position(...arguments);
        if (this.props.physical) {
            this._setTile(oldPos, 0);
            this._setTile(this.props.position, 1);
        }
        return this;
    }

    _setTile(tile, value) {
        const gp = this.layer._gridpath;
        if (gp) {
            for (let t, x, y = 0; y < this.props.size.y; y++) {
                for (x = 0; x < this.props.size.x; x++) {
                    t = this.layer.getTile(tile.sum(x, y));
                    value ? gp.setTile(t.x, t.y) : gp.freeTile(t.x, t.y);
                }
            }
        }
    }

};
