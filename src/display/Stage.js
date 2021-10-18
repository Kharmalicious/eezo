import DisplayObjectContainer from './DisplayObjectContainer';
import Shape from './Shape';
import Bitmap from './Bitmap';
import Point from '../core/Point';
import Label from './Label';
import FPSCounter from '../utils/FPSCounter';
import Light from '../core/Light';

export default class Stage extends DisplayObjectContainer {
    constructor() {
        super();

        this.canvas = document.createElement('canvas');
        this.canvas.style.cssText = 'width: 100%; height: 100%;';
        this.context = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);

        this.size = {
            width: window.innerWidth,
            height: window.innerHeight
        };

        this.imageCache = {};

        this.light = new Light();

        this.canvas.addEventListener('click', this._clickHandler.bind(this));
        window.addEventListener('resize', this._resizeHandler.bind(this));
    }

    // GETTERS

    get layers() {
        return this._children;
    }

    get size() {
        return {
            width: this.canvas.width,
            height: this.canvas.height
        }
    }

    set size({ width, height }) {
        this.canvas.width = width * 2 || this.canvas.width;
        this.canvas.height = height * 2 || this.canvas.height;
    }

    // FPS HANDLER

    showFPS(callback) {
        this.fpsCounter || (this.fpsCounter = new FPSCounter());
        this.fpsCounter.start(callback);
    }

    hideFPS() {
        this.fpsCounter?.stop();
    }

    // IMAGE CACHE
    preloadImage(imagePath) {
        const img = new Image();
        img.onload = event => {
            this.imageCache[imagePath] = event.target;
        };
        img.src = imagePath;
    }

    // ANIMATION

    start() {
        this._playing = true;
        this._startTime = 0;
        requestAnimationFrame(this._step.bind(this))
    }

    stop() {
        this._playing = false;
    }

    _step(timestamp) {
        if (this._startTime === 0) {
            this._startTime = timestamp;
        }
        this.render(timestamp - this._startTime);
        this._playing && requestAnimationFrame(this._step.bind(this));
    }

    // HANDLERS

    _resizeHandler() {
        this.size = {
            width: window.innerWidth,
            height: window.innerHeight
        };
        this.render();
    }

    _clickHandler(event) {
        const mouse = Point.get(event.clientX, event.clientY).mult(2);
        for (let layer of this.layers) {
            const relative = mouse.sub(layer.getOrigin(this.size));
            const position = layer.screenToLayer(relative);
            const tile = layer.getTile(position);
            layer.emit('click', { position, tile });
        }
    }

    // RENDER

    render(timestamp) {
        this.context.clearRect(0, 0, this.size.width, this.size.height);
        for (let layer of this.layers) {
            this._renderChildren(layer.orderedChildren, layer, timestamp);
        }
    }

    _renderChildren(children, layer, timestamp) {
        for (let child of children) {
            if (child instanceof DisplayObjectContainer) {
                this._renderChildren(child.orderedChildren, layer, timestamp);
            } else {
                this._renderChild(child, layer, timestamp);
            }
        }
    }

    _renderChild(child, layer, timestamp) {
        child._stepRender(timestamp);
        const origin = layer.getOrigin(this.size);

        if (child instanceof Shape) {
            for (let path of child.orderedPaths) {
                this._drawPath(path, origin, child.renderPosition, layer);
            }
        } else if (child instanceof Bitmap) {
            this._drawBitmap(child, origin, child.renderPosition, layer);
        } else if (child instanceof Label) {
            this._drawLabel(child, origin, child.renderPosition, layer);
        }

    }

    // DRAW

    _drawPath(path, origin, offset, layer) {
        const { points = [], color, stroke } = path;

        if (!points.length) {
            return null;
        }

        const zero = layer.layerToScreen(offset.sum(points[0])).sum(origin);

        this.context.beginPath();
        this.context.moveTo(zero.x, zero.y);
        for (let point, i = 1, l = points.length; i < l; i++) {
            point = layer.layerToScreen(offset.sum(points[i])).sum(origin);
            this.context.lineTo(point.x, point.y);
        }
        this.context.closePath();

        const _color = color ? this.light.computeColor(color, points) : null;

        this.context.save();
        (stroke || _color) && (this.context.strokeStyle = stroke?.string || _color?.string);
        _color && (this.context.fillStyle = _color?.string);
        this.context.lineWidth = 0;
        this.context.globalAlpha = 1;
        this.context.stroke();
        this.context.fill();
        this.context.restore();
    }

    _drawBitmap(bitmap, origin, offset, layer) {
        const { image, source, destination, props } = bitmap;
        const { size, position, wireframe } = props;
        const _position = layer.layerToScreen(offset.sum([.5, .5])).sum(origin);

        const { x: sw, y: sh } = source.size;
        const { x: sx, y: sy } = source.position;
        const { x: dw, y: dh } = destination.size;
        const { x: dx, y: dy } = destination.position.sum(_position);

        this.context.save();
        this.context.globalAlpha = 1;
        this.context.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
        wireframe && this.context.strokeRect(dx, dy, dw, dh);
        this.context.restore();
    }

    _drawLabel(label, origin, offset, layer) {
        const { position, text, font, baseline, color } = label.props;
        const _position = layer.layerToScreen(offset.sum(position)).sum(origin);

        this.context.save();
        this.context.transform(2, 0, 0, 2, 0, 0);
        this.context.font = font;
        this.context.textBaseline = baseline;
        this.context.globalAlpha = 1;
        this.context.fillStyle = color.string;
        this.context.fillText(text, _position.x, _position.y);
        this.context.restore();
    }

};
