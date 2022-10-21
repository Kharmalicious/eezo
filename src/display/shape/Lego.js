import Path from '../../core/Path';
import Rect from './Rect';

export default class Lego extends Rect {

    constructor(props = {}) {
        super({
            size: [1, 1, 1],
            ...props
        });
        // this.props.extruded = true;
        this.name = 'lego';
    }

    height(height) {
        this.props.size.z = height;
        this.update();
        return this;
    }

    update() {
        this.clearPaths();

        const radius = .6;
        const circle = Path.Circle(radius, 20, this.props.color, this.props.stroke);

        for (let w = 0, width = Math.floor(this.props.size.x); w < width; w++) {
            for (let h = 0, height = Math.floor(this.props.size.y); h < height; h++) {
                this.add(Path.extrude(circle.translate(
                    (1 - radius) / 2 + w,
                    (1 - radius) / 2 + h,
                    this.props.size.z
                ), 0.2));
            }
        }

        // super.update();
    }

};
