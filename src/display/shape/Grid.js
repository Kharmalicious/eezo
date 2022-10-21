import Shape from '../Shape';
import Path from '../../core/Path';
import Point from '../../core/Point';

export default class Grid extends Shape {

    constructor(size, color = 0x999999) {
        super();
        const min = -size;
        const max = size;
        this.name = 'grid';

        for (let x = min; x <= max; x++) {
            this.add(new Path([
                Point.get(x, min, 0),
                Point.get(x, max, 0)
            ], null, color));
        }
        for (let y = min; y <= max; y++) {
            this.add(new Path([
                Point.get(min, y, 0),
                Point.get(max, y, 0)
            ], null, color));
        }
    }

    /*
    constructor(span, color = 0x999999) {
        super({ color });
        this.min = -span;
        this.max = span;
        this.name = 'grid';
    }

    update() {
        console.log('UPDATE GRID');
        for (let x = this.min; x <= this.max; x++) {
            this.add(new Path([
                Point.get(x, this.min, 0),
                Point.get(x, this.max, 0)
            ], null, this.props.color));
        }
        for (let y = this.min; y <= this.max; y++) {
            this.add(new Path([
                Point.get(this.min, y, 0),
                Point.get(this.max, y, 0)
            ], null, this.props.color));
        }
        super.update();
    }
    */
};
