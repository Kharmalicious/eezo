import Light from '../core/Light';
import Point from '../core/Point';
import GridPath from '../utils/GridPath';
import DisplayObjectContainer from './DisplayObjectContainer';
import Stage from './Stage';

export default class Layer extends DisplayObjectContainer {

    static ORIGIN__TOP_LEFT = Point.get(0, 0);
    static ORIGIN__TOP_RIGHT = Point.get(1, 0);
    static ORIGIN__TOP_CENTER = Point.get(.5, 0);
    static ORIGIN__BOTTOM_LEFT = Point.get(0, 1);
    static ORIGIN__BOTTOM_RIGHT = Point.get(1, 1);
    static ORIGIN__BOTTOM_CENTER = Point.get(.5, 1);
    static ORIGIN__CENTER_LEFT = Point.get(0, .5);
    static ORIGIN__CENTER_RIGHT = Point.get(1, .5);
    static ORIGIN__CENTER = Point.get(.5, .5);

    static TYPE__2D = '2d';
    static TYPE__ISO = 'iso';

    constructor(origin = Layer.ORIGIN__CENTER, type = Layer.TYPE__2D, unit = 1) {
        super();

        this.ORIGIN = origin;
        this.TYPE = type;
        this.UNIT = unit;

        this._listeners = {};
        this._stage = null;
        this._render = {
            ORIGIN: null
        }
    }

    get layer() {
        return this;
    }

    get stage() {
        return this._stage;
    }

    set stage(stage) {
        this._stage = stage;

        this._render.ORIGIN = this.getOrigin({
            width: stage.canvas.width,
            height: stage.canvas.height
        });

        this.draw();
    }

    addGridPath() {
        this._gridpath = new GridPath(20, 20, [10, 10]);
    }

    // POINT CONVERSION

    getTile(position) {
        const tile = Point.get(position);
        if (tile.x < 0) {
            tile.x = -Math.ceil(tile.x * -1);
        } else {
            tile.x = Math.floor(tile.x);
        }
        if (tile.y < 0) {
            tile.y = -Math.ceil(tile.y * -1);
        } else {
            tile.y = Math.floor(tile.y);
        }
        return tile;
    }

    getOrigin({ width, height }) {
        return Point.get(width, height).mult(this.ORIGIN);
    }

    screenToLayer(point) {
        const _point = point.mult(1 / this.UNIT);
        if (this.TYPE === Layer.TYPE__ISO) {
            return _point.sub(this._render.ORIGIN).toIso();
        }
        return _point.sub(this._render.ORIGIN);
    }

    layerToScreen(point) {
        const _point = point.mult(this.UNIT);
        if (this.TYPE === Layer.TYPE__ISO) {
            return _point.toOrtho().sum(this._render.ORIGIN);
        }
        return _point.sum(this._render.ORIGIN);
    }

    // EVENTS

    subscribe(type, callback) {
        if (typeof callback !== 'function') {
            throw new Error('event callback is not a function');
        }
        if (!this._listeners[type]) {
            this._listeners[type] = [];
        }
        this._listeners[type].push(callback);
    }

    emit(type, data) {
        if (!this._listeners[type]) {
            return null;
        }
        for (let listener of this._listeners[type]) {
            listener(type, data);
        }
    }

    // PROPS

    origin(origin) {
        this.ORIGIN = origin;
        return this;
    }

    type(type) {
        this.TYPE = type;
        return this;
    }

};
