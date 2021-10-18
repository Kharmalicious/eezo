import Path from '../../core/Path';
import Point from '../../core/Point';
import Shape from '../Shape';

export default class Circle extends Shape {

    constructor(props = {}, radius = 1, segments = 20) {
        super(props);
        this.props = {
            size: [radius, radius],
            segments,
            ...this.props
        }
        this.name = 'circle';
    }

    size() {
        const p = Point.get(...arguments);
        return this._setPoint('size', p.replace({ x: p.x, y: p.x }));
    }

    radius(radius) {
        this.size(radius, radius);
    }

    segments(segments) {
        return this._setProp('segments', segments);
    }

    update() {
        this.path = Path.Circle(this.props.size.x, this.props.segments, this.props.color, this.props.stroke);
    }

};
