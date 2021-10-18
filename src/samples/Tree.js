import Point from '../core/Point';
import Sprite from '../display/Sprite';

export default class Tree extends Sprite {

    constructor(props) {
        super({
            physical: true,
            imagePath: 'img/trees.png',
            ...props
        });

        this.UNIT = 40;

        this.addFrame([80, 115], [110, 120], [20, 20]);
        this.addFrame([210, 75], [86, 160], [10, 12]);
        this.addFrame([292, 150], [106, 90], [4, 36]);
        this.addFrame([396, 106], [124, 128], [0, 15]);
        this.addFrame([66, 250], [114, 155], [0, 15]);
        this.addFrame([180, 250], [140, 155], [0, 15]);
        this.addFrame([320, 322], [80, 84], [0, 22]);
        this.addFrame([402, 266], [130, 146], [0, 40]);
    }

    renderRandomTree() {
        const r = parseInt(Math.random() * this._frames.length);
        this.renderFrame(r);
        if (this._current === 2) {
            this.size(Point.get(2, 1));
        }
    }

    positionRandom(min, max) {
        const p = Point.get(
            parseInt(Math.random() * (max.x - min.x)) + min.x,
            parseInt(Math.random() * (max.y - min.y)) + min.y,
            parseInt(Math.random() * (max.z - min.z)) + min.z
        );
        this.position(p);
    }

    // onAdd() {
    //     super.onAdd();
    //     this.renderRandomTree();
    //     const gridSize = 10;
    //     this.positionRandom(Point.get(-gridSize, -gridSize), Point.get(gridSize, gridSize));
    // }

};
