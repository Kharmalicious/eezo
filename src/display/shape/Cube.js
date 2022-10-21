import Path from '../../core/Path';
import Rect from './Rect';

export default class Cube extends Rect {

    constructor(props = {}) {
        super({
            size: [1, 1, 1],
            ...props
        });
        this.name = 'cube';
    }

    height(height) {
        this.props.size.z = height;
        this.update();
        return this;
    }

    update() {
        super.update();
        const paths = Path.extrude(this._paths[0], this.props.size.z);
        this.clearPaths();
        this.add(paths);
    }

};
