import Point from './Point';

export default class Vector {

    constructor(i = 0, j = 0, k = 0) {
        this.i = parseFloat(i);
        this.j = parseFloat(j);
        this.k = parseFloat(k);
    }

    magnitude() {
        return Math.sqrt(this.i * this.i + this.j * this.j + this.k * this.k);
    }

    normalize() {
        const magnitude = this.magnitude();

        if (magnitude === 0) {
            return new Vector(0, 0, 0);
        }
        return new Vector(this.i / magnitude, this.j / magnitude, this.k / magnitude);
    }

    static dotProduct(v1, v2) {
        return v1.i * v2.i + v1.j * v2.j + v1.k * v2.k;
    }

    static fromTwoPoints(p1, p2) {
        return new Vector(...Point.get(p1.sum(Point.get(p2).mult(-1))).array);
    }

    static crossProduct(v1, v2) {
        return new Vector(
            v1.j * v2.k - v2.j * v1.k,
            -1 * (v1.i * v2.k - v2.i * v1.k),
            v1.i * v2.j - v2.i * v1.j
        );
    }

    // FACTORY

    static get(vector) {
        if (typeof vector === 'number') {
            return new Vector(...arguments);
        }
        if (vector instanceof Array) {
            return new Vector(...vector);
        }
        if (vector instanceof Object) {
            return new Vector(
                vector.i || vector.x || 0,
                vector.j || vector.y || 0,
                vector.k || vector.z || 0);
        }
    }

};
