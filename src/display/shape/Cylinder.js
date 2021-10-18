import Circle from './Circle';

export default class Cylinder extends Circle {

    constructor(props = {}, radius = 1, extrude = 1, segments = 20) {
        super({
            size: [radius, radius, extrude],
            ...props
        }, radius, segments);
        this.props.extruded = true;
        this.name = 'cylinder';
    }

    height(height) {
        this.props.size.z = height;
        this.update();
        return this;
    }

};
