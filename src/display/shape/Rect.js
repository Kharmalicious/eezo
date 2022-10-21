import Path from '../../core/Path';
import Shape from '../Shape';

export default class Rect extends Shape {

    constructor(props = {}, width = 1, height = 1) {
        super({
            size: [width, height, 0],
            ...props
        });
        this.name = 'rect';
    }

    update() {
        // this.path = Path.Rect(this.props.size.x, this.props.size.y, this.props.color, this.props.stroke);
        this.clearPaths();
        this.add(Path.Rect(this.props.size.x, this.props.size.y, this.props.color, this.props.stroke));
        // super.update();
    }

};
