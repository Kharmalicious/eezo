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

        this._render = { ...this.props };

        this._parent = null;
    }

    set parent(parent) {
        this._parent = parent;
        this.update();
        this.draw();
        this.onAdd();
    }

    get parent() {
        return this._parent;
    }

    get layer() {
        return this.parent?.layer;
    }

    get stage() {
        return this.layer?.stage;
    }

    get depth() {
        return this.renderPosition.depth;
    }

    get renderPosition() {
        return this.parent?.renderPosition?.sum(this.props.position) || this.props.position;
    }

    get renderRotation() {
        return this.parent?.renderRotation?.sum(this.props.rotation) || this.props.rotation;
    }

    get renderScale() {
        return this.parent?.renderScale?.mult(this.props.scale) || this.props.scale;
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
        // console.log('UPDATE', this);
    }

    draw() {
        // console.log('DRAW', this);
    }

    onAdd() {
        // console.log('added to', this.parent);
    }

    step(callback) {
        this._stepCallback = callback;
    }

    clone() {
        return new this.constructor(this.props);
    }

    _stepRender(timestamp) {
        typeof this._stepCallback === 'function' && this._stepCallback(timestamp);
    }

    _setProp(prop, value) {
        this.props[prop] = value;
        this.update();
        this.draw();
        return this;
    }

    _setPoint(prop, ...point) {
        const _point = Point.get(...point);

        if (this.props[prop] instanceof Point) {
            this.props[prop] = this.props[prop].replace(_point);
            this.update();
            this.draw();
        } else {
            throw new Error('FAILURE on _setPoint', this);
        }
        return this;
    }

};
