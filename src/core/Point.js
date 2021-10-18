export default class Point {

    constructor(x = 0, y = 0, z = 0) {
        this.x = parseFloat(x);
        this.y = parseFloat(y);
        this.z = parseFloat(z);
    }

    toOrtho() {
        return Point.get(
            this.x - this.y,
            (this.x + this.y) / 2 - this.z * 1.25
        );
    }

    toIso() {
        return Point.get(
            this.y + (this.x / 2),
            this.y - (this.x / 2)
        );
    }

    get depth() {
        return - (this.x + this.y + this.z * 2);
    }

    get average() {
        return (this.x + this.y + this.z) / 3;
    }

    get array() {
        return [this.x, this.y, this.z];
    }

    get object() {
        return { x: this.x, y: this.y, z: this.z };
    }

    get round() {
        return Point.get(
            Math.round(this.x * 100) / 100,
            Math.round(this.y * 100) / 100,
            Math.round(this.z * 100) / 100
        )
    }

    get abs() {
        return Point.get(
            Math.abs(this.x),
            Math.abs(this.y),
            Math.abs(this.z)
        )
    }

    replace({ x, y, z }) {
        return Point.get(
            x !== undefined ? x : this.x,
            y !== undefined ? y : this.y,
            z !== undefined ? z : this.z
        );
    }

    sum(x = 0, y = 0, z = 0) {
        const { x: _x, y: _y, z: _z } = Point.get(x, y, z);
        return Point.get(
            this.x + _x,
            this.y + _y,
            this.z + _z
        );
    }

    mult(x = 1, y = x, z = x) {
        const { x: _x, y: _y, z: _z } = Point.get(x, y, z);
        return Point.get(
            this.x * _x,
            this.y * _y,
            this.z * _z
        );
    }

    sub(x = 0, y = 0, z = 0) {
        const { x: _x, y: _y, z: _z } = Point.get(x, y, z);
        return this.sum(Point.get(_x, _y, _z).mult(-1));
    }

    distance(x, y, z) {
        const diff = this.sub(Point.get(x, y, z));
        return Math.sqrt(diff.x * diff.x + diff.y * diff.y + diff.z * diff.z);
    }

    equals(point) {
        return (
            this.x === point.x &&
            this.y === point.y &&
            this.z === point.z
        );
    }

    // ROTATION

    rotateX(angle, center = [0, 0]) {
        return this._rotate(angle, Point.get(center), 'x');
    }

    rotateY(angle, center = [0, 0]) {
        return this._rotate(angle, Point.get(center), 'y');
    }

    rotateZ(angle, center = [0, 0]) {
        return this._rotate(angle, Point.get(center), 'z');
    }

    _rotate(angle, center, axis) {
        const { x, y, z } = this._getRotationCoords(axis);

        const x1 = this[x] - center[x];
        const y1 = this[y] - center[y];
        const radians = angle * (Math.PI / 180);
        const x2 = x1 * Math.cos(radians) - y1 * Math.sin(radians);
        const y2 = x1 * Math.sin(radians) + y1 * Math.cos(radians);

        return Point.get({
            [x]: x2 + center[x],
            [y]: y2 + center[y],
            [z]: this[z]
        });
    }

    _getRotationCoords(axis) {
        const xyz = 'xyz';
        const zi = xyz.indexOf(axis);
        const ordered = xyz.substr(zi) + xyz.substr(0, zi);
        return {
            x: ordered.substr(1, 1),
            y: ordered.substr(2, 1),
            z: axis
        }
    }

    // FACTORY

    static get(point) {
        if (typeof point === 'number') {
            return new Point(...arguments);
        }
        if (point instanceof Array) {
            return new Point(...point);
        }
        if (point instanceof Object) {
            return new Point(point.x || 0, point.y || 0, point.z || 0);
        }
    }

}
