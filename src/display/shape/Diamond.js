import Path from '../../core/Path';
import Point from '../../core/Point';
import Shape from '../Shape';

export default class Diamond extends Shape {

    constructor(props = {}, width = 1, height = 1, extrude = 1) {
        super({
            size: [width, height, extrude],
            ...props
        });
        this.name = 'diamond';
    }

    height(height) {
        this.props.size.z = height;
        this.update();
        return this;
    }

    update() {
        const { points } = Path.Rect(this.props.size.x, this.props.size.y).translate({ z: this.props.size.z / 2 });
        const { size, color, stroke } = this.props;

        const vertexTop = Point.get(size.x / 2, size.y / 2, this.props.size.z);
        const vertexBottom = Point.get(size.x / 2, size.y / 2, 0);

        this.clearPaths();
        for (let p1, p2, i = 0; i < points.length; i++) {
            p1 = points[i];
            p2 = i === points.length - 1 ? points[0] : points[i + 1];
            this.add(new Path([
                p1, p2,
                vertexTop
            ], color, stroke));
            this.add(new Path([
                p1, p2,
                vertexBottom
            ], color, stroke).reverse());
        }
    }

};
