import Color from './Color';
import Point from './Point';

export default class Path {

    constructor(points = [], color = 0x0, stroke = 0x0) {
        this.points = points;
        this.color = Color.get(color);
        this.stroke = Color.get(stroke);
    }

    get depth() {
        let total = 0;
        for (let point of this.points) {
            total += point.depth;
        }
        return total / (this.points.length || 1);
    }

    add(point) {
        if (point instanceof Array) {
            this.points = this.points.concat(point);
        } else {
            this.points.push(point);
        }
        return this;
    }

    reverse() {
        const points = this.points.slice().reverse();
        return new Path(points, this.color, this.stroke);
    }

    scale(x = 1, y = x, z = x) {
        const points = this.points.map(point => Point.get(x, y, z).mult(point));
        return new Path(points, this.color, this.stroke);
    }

    translate(x = 0, y = 0, z = 0) {
        const points = this.points.map(point => Point.get(x, y, z).sum(point));
        return new Path(points, this.color, this.stroke);
    }

    rotate(rotation, center) {
        const points = this.points
            .map(point => point.rotateX(rotation.x, center))
            .map(point => point.rotateY(rotation.y, center))
            .map(point => point.rotateZ(rotation.z, center));
        return new Path(points, this.color, this.stroke);
    }

    static extrude(path, extrude) {
        const { points, color, stroke } = path;
        const paths = [];

        // top
        const top = path.translate({ z: extrude });

        // sides
        for (let p1, p2, i = 0; i < points.length; i++) {
            // p1 = points[i];
            // p2 = i === points.length - 1 ? points[0] : points[i + 1];
            paths.push(new Path([
                // p1, p2,
                // p2.sum({ z: extrude }),
                // p1.sum({ z: extrude })
                points[i],
                points[(i + 1) % points.length],
                top.points[(i + 1) % points.length],
                top.points[i],
            ], color, stroke));
        }

        // top
        // paths.push(path.translate({ z: extrude }));
        paths.push(top);
        paths.push(path.reverse());

        return paths;
    }

    static isPointInPath(path, point) {
        const { points } = path;
        for (let c = false, i = -1, l = points.length, j = l - 1; ++i < l; j = i) {
            ((points[i].y <= point.y && point.y < points[j].y) || (points[j].y <= point.y && point.y < points[i].y))
                && (point.x < (points[j].x - points[i].x) * (point.y - points[i].y) / (points[j].y - points[i].y) + points[i].x)
                && (c = !c);
        }
        return c;
    }


    // BASIC SHAPES

    static Rect(width = 1, height = 1, color = 0x0, stroke = 0x0) {
        return new Path([
            Point.get(0, 0, 0),
            Point.get(width, 0, 0),
            Point.get(width, height, 0),
            Point.get(0, height, 0)
        ], color, stroke)
    }

    static Circle(size = 1, segments = 20, color = 0x0, stroke = 0x0) {
        const radius = size * .5;
        const center = Point.get(radius, radius);
        const points = [center.sum(
            radius * Math.cos(0),
            radius * Math.sin(0)
        )];

        for (let i = 1; i <= segments; i += 1) {
            points.push(center.sum(
                radius * Math.cos(i * 2 * Math.PI / segments),
                radius * Math.sin(i * 2 * Math.PI / segments)
            ));
        }

        return new Path(points, color, stroke);
    }

}
