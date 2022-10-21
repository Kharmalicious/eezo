import Path from '../../core/Path';
import Point from '../../core/Point';
import Shape from '../Shape';

export default class Ramp extends Shape {

    static FACE__NN = 180;
    static FACE__EE = -90;
    static FACE__SS = 0;
    static FACE__WW = 90;

    constructor(props) {
        super({
            size: [1, 1, 1],
            ...props
        });
        this.props = {
            direction: Ramp.FACE__SS,
            ...this.props
        };
        this.props.rotation = this.props.rotation.sum(0, 0, this.props.direction);
        this.name = 'ramp';
    }

    update() {
        this.clearPaths();
        const { size, color, stroke } = this.props;

        // base
        this.add(Path.Rect(size.x, size.y, color, stroke));
        // back
        this.add(new Path([
            Point.get(0, 0, 0),
            Point.get(size.x, 0, 0),
            Point.get(size.x, 0, size.z),
            Point.get(0, 0, size.z)
        ], color, stroke));
        // left side
        this.add(new Path([
            Point.get(0, 0, 0),
            Point.get(0, size.y, 0),
            Point.get(0, 0, size.z)
        ], color, stroke).reverse());
        // right side
        this.add(new Path([
            Point.get(size.x, 0, 0),
            Point.get(size.x, size.y, 0),
            Point.get(size.x, 0, size.z)
        ], color, stroke));
        // ramp
        this.add(new Path([
            Point.get(0, size.y, 0),
            Point.get(size.x, size.y, 0),
            Point.get(size.x, 0, size.z),
            Point.get(0, 0, size.z)
        ], color, stroke).reverse());

        // super.update();
    }

};
