import DisplayObjectContainer from './DisplayObjectContainer';
import Shape from './Shape';
import Sprite from './Sprite';
import Point from '../core/Point';
import Label from './Label';
import FPSCounter from '../utils/FPSCounter';
import Light from '../core/Light';

export default class Stage {

    static SCREEN_RESOLUTION__DEFAULT = 1;
    static SCREEN_RESOLUTION__RETINA = 2;

    constructor(resolution = Stage.SCREEN_RESOLUTION__DEFAULT) {
        this.layers = [];

        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);

        this.SCREEN_RESOLUTION = resolution;

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

    get size() {
        return {
            width: this.canvas.width,
            height: this.canvas.height
        }
    }

    set size({ width, height }) {
        this.canvas.width = width * this.SCREEN_RESOLUTION || this.canvas.width;
        this.canvas.height = height * this.SCREEN_RESOLUTION || this.canvas.height;
        this.canvas.style.cssText = `width: ${width}px; height: ${height}px;`;
    }

    add(layer) {
        if (layer instanceof Array) {
            layer.forEach(l => this.add(l));
        } else {
            layer.stage = this;
            this.layers.push(layer);
        }
        return this;
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
        // this._playInt = setInterval(() => {
        //     this._step(performance.now());
        // }, 20);
        requestAnimationFrame(this._step.bind(this));
    }

    stop() {
        this._playing = false;
        // clearInterval(this._playInt);
    }

    _step(timestamp) {
        // console.log('stepping');
        if (this._startTime === 0) {
            this._startTime = timestamp;
        }
        this.render(timestamp - this._startTime);
        // this.fpsCounter && this.fpsCounter._step();
        this._playing && requestAnimationFrame(this._step.bind(this));
    }

    // HANDLERS

    _resizeHandler() {
        this.size = {
            width: window.innerWidth,
            height: window.innerHeight
        };
        for (let layer of this.layers) {
            layer.onAdd();
        }
        this._playing || this.render();
    }

    _clickHandler(event) {
        const mouse = Point.get(event.clientX, event.clientY).mult(this.SCREEN_RESOLUTION);
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
            this._renderChildren(layer.orderedChildren, timestamp);
        }
    }

    _renderChildren(children, timestamp) {
        for (let child of children) {
            if (child instanceof DisplayObjectContainer) {
                this._renderChildren(child.orderedChildren, timestamp);
            } else {
                this._renderChild(child, timestamp);
            }
        }
    }

    _renderChild(child, timestamp) {
        child._stepRender(timestamp);

        if (child instanceof Shape) {
            for (let path of child._render.paths) {
                this._drawPath(path);
            }
        } else if (child instanceof Sprite) {
            this._drawBitmap(child._render);
        } else if (child instanceof Label) {
            this._drawLabel(child);
        }
    }

    // DRAW

    _drawPath(path) {
        const { points = [], color, stroke } = path;

        if (!points.length) {
            return null;
        }

        this.context.beginPath();
        this.context.moveTo(points[0].x, points[0].y);
        for (let l = points.length, i = 1; i < l; i++) {
            this.context.lineTo(points[i].x, points[i].y);
        }
        this.context.closePath();

        this.context.save();
        (stroke || color) && (this.context.strokeStyle = stroke?.string || color?.string);
        color && (this.context.fillStyle = color?.string);
        this.context.lineWidth = 0;
        this.context.globalAlpha = 1;
        this.context.stroke();
        this.context.fill();
        this.context.restore();
    }

    _drawBitmap(bitmap) {
        const { wireframe, image, sx, sy, sw, sh, dx, dy, dw, dh } = bitmap;

        this.context.save();
        this.context.globalAlpha = 1;
        this.context.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
        wireframe && this.context.strokeRect(dx, dy, dw, dh);
        this.context.restore();
    }

    _drawLabel(label) {
        const { text, font, baseline, color } = label.props;
        const { position } = label._render;

        this.context.save();
        this.context.transform(2, 0, 0, 2, 0, 0);
        this.context.font = font;
        this.context.textBaseline = baseline;
        this.context.globalAlpha = 1;
        this.context.fillStyle = color.string;
        this.context.fillText(text, position.x, position.y);
        this.context.restore();
    }

};
