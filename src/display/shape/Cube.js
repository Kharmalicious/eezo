import Rect from './Rect';

export default class Cube extends Rect {

    constructor(props = {}) {
        super({
            size: [1, 1, 1],
            ...props
        });
        this.props.extruded = true;
        this.name = 'cube';
    }

    height(height) {
        this.props.size.z = height;
        this.update();
        return this;
    }

};
