import Point from '../core/Point';

export default class DisplayObject {

    constructor(props = {}) {
        this.props = {
            scale: [1, 1, 1],
            size: [0, 0, 0],
            position: [0, 0, 0],
            rotation: [0, 0, 0],
            alpha: 1,
            ...props
        };
        this.props.scale = Point.get(this.props.scale);
        this.props.size = Point.get(this.props.size);
        this.props.position = Point.get(this.props.position);
        this.props.rotation = Point.get(this.props.rotation);

        // this._render = { ...this.props };

        this._parent = null;
        // this._layer = null;
    }

    set parent(parent) {
        this._parent = parent;
        // this._layer = parent._layer;
        // this._render.position = this.props.position.sum(parent._render.position);
        // this._render.rotation = this.props.rotation.sum(parent._render.rotation);
        // this._render.scale = this.props.scale.mult(parent._render.scale);
        this.onAdd();
        this.update();
    }

    get parent() {
        return this._parent;
    }

    get layer() {
        return this.parent.layer;
    }

    get depth() {
        return this.renderPosition.depth;
        // return this.renderPosition.sum(this.props.size.replace({ z: 0 })).depth;
        // return this.renderPosition.sum(this.props.size.mult(.5)).depth;
    }

    get renderPosition() {
        return this.parent?.renderPosition.sum(this.props.position) || this.props.position;
    }

    get renderRotation() {
        return this.parent?.renderRotation.sum(this.props.rotation) || this.props.rotation;
    }

    get renderScale() {
        return this.parent?.renderScale.mult(this.props.scale) || this.props.scale;
    }

    alpha(alpha) {
        return this._setProp('alpha', alpha);
    }

    size() {
        return this._setPoint('size', ...arguments);
    }

    position() {
        return this._setPoint('position', ...arguments);
    }

    rotation() {
        return this._setPoint('rotation', ...arguments);
    }

    scale() {
        return this._setPoint('size', this.props.size.mult(...arguments));
    }

    translate() {
        return this._setPoint('position', this.props.position.sum(...arguments));
    }

    rotate() {
        return this._setPoint('rotation', this.props.rotation.sum(...arguments));
    }

    update() {
        // console.log('updating', this);
    }

    step(callback) {
        this._stepCallback = callback;
    }

    clone() {
        return new this.constructor(this.props);
    }

    onAdd() {
        // console.log('added to', this.parent);
    }

    _stepRender(timestamp) {
        typeof this._stepCallback === 'function' && this._stepCallback(timestamp);
    }

    _setProp(prop, value) {
        this.props[prop] = value;
        this.update();
        return this;
    }

    _setPoint(prop, ...point) {
        const _point = Point.get(...point);

        if (this.props[prop] instanceof Point) {
            this.props[prop] = this.props[prop].replace(_point);
            this.update();
        } else {
            throw new Error('FAILURE on _setPoint', this);
        }
        return this;
    }

};
