import Color from './Color';
import Vector from './Vector';

export default class Light {

    constructor({ color = 0xdedede, position = [2, -1, 3], colorDifference = 0.2 } = {}) {
        this.color = Color.get(color);
        this.position = Vector.get(position);
        this.colorDifference = colorDifference;
        this.angle = this.position.normalize();
    }

    computeColor(color, points) {
        if (points.length < 3) {
            return color;
        }

        const v1 = Vector.fromTwoPoints(points[1], points[0]);
        const v2 = Vector.fromTwoPoints(points[2], points[1]);
        const normal = Vector.crossProduct(v1, v2).normalize();

        const brightness = Vector.dotProduct(normal, this.angle);
        return color.lighten(brightness * this.colorDifference, this.color);
    }

};
