import Shape from '../Shape';
import Point from '../../core/Point';
import Path from '../../core/Path';

export default class Axis extends Shape {

    constructor(size) {
        super();
        this.name = 'axis';

        this.add([
            new Path([
                Point.get(-size, 0, 0),
                Point.get(size, 0, 0)
            ], null, 0x0000ff),
            new Path([
                Point.get(0, -size, 0),
                Point.get(0, size, 0)
            ], null, 0x00ff00),
            new Path([
                Point.get(0, 0, -size),
                Point.get(0, 0, size)
            ], null, 0xff0000)
        ]);
    }

};
