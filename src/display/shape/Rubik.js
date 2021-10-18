import Color from '../../core/Color';
import Path from '../../core/Path';
import Point from '../../core/Point';
import Shape from '../Shape';

export default class Rubik extends Shape {

    constructor(props = {}, size = 1) {
        super({
            size: [size, size, size],
            ...props
        });
        this.name = 'rubik';
    }

    update() {
        const center = Point.get(this.props.size.mult(.5));

        this.clearPaths();
        // D
        this.add(Path.Rect(this.props.size.x, this.props.size.y, 0xffffff));
        // F
        this.add(Path.Rect(this.props.size.x, this.props.size.y, 0xff0000).rotate(Point.get({ x: 90 }), center));
        // B
        this.add(Path.Rect(this.props.size.x, this.props.size.y, 0xffcc66).rotate(Point.get({ x: -90 }), center));
        // L
        this.add(Path.Rect(this.props.size.x, this.props.size.y, 0x0000ff).rotate(Point.get({ y: 90 }), center));
        // R
        this.add(Path.Rect(this.props.size.x, this.props.size.y, 0x00ff00).rotate(Point.get({ y: -90 }), center));
        // U
        this.add(Path.Rect(this.props.size.x, this.props.size.y, 0xffff00).translate({ z: 1 }, center));
    }

};
