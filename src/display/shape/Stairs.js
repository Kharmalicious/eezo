import Shape from '../Shape';
import Path from '../../core/Path';
import Point from '../../core/Point';

export default class Stairs extends Shape {

    static FACE__NN = { size: Point.get(0, 1), pos: Point.get(0, 1, 1) };
    static FACE__EE = { size: Point.get(1, 0), pos: Point.get(0, 0, 1) };
    static FACE__SS = { size: Point.get(0, 1), pos: Point.get(0, 0, 1) };
    static FACE__WW = { size: Point.get(1, 0), pos: Point.get(1, 0, 1) };

    static FACE__NW = { size: Point.get(1, 1), pos: Point.get(1, 1, 1) };
    static FACE__SW = { size: Point.get(1, 1), pos: Point.get(1, 0, 1) };
    static FACE__NE = { size: Point.get(1, 1), pos: Point.get(0, 1, 1) };
    static FACE__SE = { size: Point.get(1, 1), pos: Point.get(0, 0, 1) };

    constructor(props) {
        super({
            size: [1, 1, 1],
            ...props
        });
        this.props = {
            steps: 10,
            direction: Stairs.FACE__EE,
            ...this.props
        };
        this.name = 'stairs';
        // this.step(() => this.rotate({ z: 1 }))
    }

    update() {
        this.clearPaths();

        const { size, position, direction, steps, color, stroke } = this.props;
        const step = size.mult(1 / steps);

        this.add(Path.Rect(size.x, size.y, color, stroke));

        for (let s = 0; s < steps; s++) {
            const siz = size.sub(direction.size.mult(step.mult(s))).round;
            const pos = direction.pos.mult(step.mult(s)).round;

            const rect = Path
                .Rect(siz.x, siz.y, color, stroke)
                .translate(pos);

            this.add([rect, ...Path.extrude(rect, step.z)]);
        }
    }

};
