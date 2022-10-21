import Point from '../core/Point';
import Bitmap from '../core/Bitmap';
import DisplayObject from './DisplayObject';

export default class Sprite extends DisplayObject {

    constructor(props) {
        super({
            size: [1, 1],
            ...props
        });
        this.props = {
            imagePath: '',
            physical: false,
            ...this.props
        };

        this._bitmap = new Bitmap({
            imagePath: this.props.imagePath
        });
        this._frames = [];
        this._current = -1;
        this._render = {
            wireframe: this._bitmap.props.wireframe,
            origin: null, image: null,
            sx: null, sy: null, sw: null, sh: null,
            dx: null, dy: null, dw: null, dh: null
        };

        this.UNIT = 1
    }

    onAdd() {
        if (this.layer) {
            const scale = this.layer.UNIT / this.UNIT;
            this.props.scale = Point.get(scale, scale);

            const preloaded = this.stage?.imageCache[this.props.imagePath];
            if (preloaded) {
                this._bitmap.image(preloaded);
            }

            this._render.image = this._bitmap._image;
        }
        this._frames.length && this.renderFrame(0);
    }

    update() {
        this._render.origin = this.layer.layerToScreen(this.renderPosition.sum([.5, .5]));
        this.updateOffset();
    }

    updateSize(size = null) {
        size !== null && this._bitmap.size(size);

        const { x: sw, y: sh } = this._bitmap.props.size;
        const { x: dw, y: dh } = this._bitmap.props.size.mult(this.props.scale);
        this._render = {
            ...this._render,
            sw, sh,
            dw, dh
        };
    }

    updatePosition(position = null) {
        position !== null && this._bitmap.position(position);

        const { x: sx, y: sy } = this._bitmap.props.position;
        this._render = {
            ...this._render,
            sx, sy
        };
    }

    updateOffset(offset = null) {
        offset !== null && this._bitmap.offset(offset);

        const { dw, dh } = this._render;
        const position = this._bitmap.props.offset.mult(this.props.scale).sub([dw / 2, dh]);
        const { x: dx, y: dy } = position.sum(this._render.origin);
        this._render = {
            ...this._render,
            dx, dy
        };
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
        const { size: frameSize, position: framePosition, offset: frameOffset } = this._frames[frame];
        const { size: currentSize, position: currentPosition, offset: currentOffset } = this._bitmap.props;

        const sizeChanged = frameSize && !currentSize.equals(frameSize);
        const positionChanged = framePosition && !currentPosition.equals(framePosition);
        const offsetChanged = frameOffset && !currentOffset.equals(frameOffset);

        sizeChanged && this.updateSize(frameSize);
        positionChanged && this.updatePosition(framePosition);
        (sizeChanged || offsetChanged) && this.updateOffset(frameOffset);
    }

    // OVERRIDE set position

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
