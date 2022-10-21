import DisplayObjectContainer from '../DisplayObjectContainer';
import Lego from './Lego';

export default class LegoBrick extends DisplayObjectContainer {

    constructor(props) {
        super({
            size: [1, 1, 1],
            ...props
        });
        this.name = 'legobrick';
    }

    // rotation(rotation) {
    // }

    update() {
        this._children = [];
        for (let w = 0, width = Math.floor(this.props.size.x); w < width; w++) {
            for (let h = 0, height = Math.floor(this.props.size.y); h < height; h++) {
                this.add(new Lego({ position: [w, h], color: 0xcc0000 }));
            }
        }
        super.update();
    }

};
