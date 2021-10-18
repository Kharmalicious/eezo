import Light from '../core/Light';
import Point from '../core/Point';
import GridPath from '../utils/GridPath';
import DisplayObjectContainer from './DisplayObjectContainer';
import Stage from './Stage';

export default class Layer extends DisplayObjectContainer {

    static T = 0;
    static L = 0;
    static B = 1;
    static R = 1;
    static C = .5;
    static ORIGIN__TOP_LEFT = Point.get(Layer.L, Layer.T);
    static ORIGIN__TOP_RIGHT = Point.get(Layer.R, Layer.T);
    static ORIGIN__TOP_CENTER = Point.get(Layer.C, Layer.T);
    static ORIGIN__BOTTOM_LEFT = Point.get(Layer.L, Layer.B);
    static ORIGIN__BOTTOM_RIGHT = Point.get(Layer.R, Layer.B);
    static ORIGIN__BOTTOM_CENTER = Point.get(Layer.C, Layer.B);
    static ORIGIN__CENTER_LEFT = Point.get(Layer.L, Layer.C);
    static ORIGIN__CENTER_RIGHT = Point.get(Layer.R, Layer.C);
    static ORIGIN__CENTER = Point.get(Layer.C, Layer.C);

    static TYPE__2D = '2d';
    static TYPE__ISO = 'iso';

    constructor(origin = Layer.ORIGIN__CENTER, type = Layer.TYPE__2D, unit = 1) {
        super();

        this.ORIGIN = origin;
        this.TYPE = type;
        this.UNIT = unit;

        // this._layer = this;
        this._listeners = {};
        this._nodes = {};
    }

    get layer() {
        return this;
    }

    get stage() {
        if (this._parent instanceof Stage) {
            return this._parent;
        }
        return null;
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
            return _point.toIso();
        }
        return _point;
    }

    layerToScreen(point) {
        const _point = point.mult(this.UNIT);
        if (this.TYPE === Layer.TYPE__ISO) {
            return _point.toOrtho();
        }
        return _point;
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
