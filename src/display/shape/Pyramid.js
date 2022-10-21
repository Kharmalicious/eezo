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
        for (let l = points.length, i = 0; i < l; i++) {
            this.add(new Path([
                points[i],
                points[(i + 1) % points.length],
                vertex
            ], color, stroke));
        }

        // super.update();
    }

};
