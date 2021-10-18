import Shape from '../Shape';
import Path from '../../core/Path';
import Point from '../../core/Point';
import Rect from './Rect';

export default class Pyramid extends Shape {

    constructor(props = {}) {
        super({
            size: [1, 1, 1],
            ...props
        });
        this.name = 'pyramid';
    }

    height(height) {
        this.props.size.z = height;
        this.update();
        return this;
    }

    update() {
        const { size, color, stroke } = this.props;

        const path = Path.Rect(size.x, size.y, color, stroke);
        const { points } = path;

        const vertex = Point.get(size.x / 2, size.y / 2, size.z);

        this.clearPaths();
        this.add(path.reverse());
        for (let p1, p2, i = 0; i < points.length; i++) {
            p1 = points[i];
            p2 = i === points.length - 1 ? points[0] : points[i + 1];
            this.add(new Path([
                p1, p2,
                vertex
            ], color, stroke));
        }
    }

};
