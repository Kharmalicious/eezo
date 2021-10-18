import Shape from '../Shape';
import Path from '../../core/Path';
import Point from '../../core/Point';

export default class Grid extends Shape {

    constructor(span, color = 0x999999) {
        super();
        const min = -span;
        const max = span;
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

};
