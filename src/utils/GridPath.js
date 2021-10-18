import Point from '../core/Point';

export default class GridPath {

    constructor(width, height, origin = [0, 0], grid = []) {
        this._size = { width, height };
        this._grid = grid;
        this._origin = Point.get(origin);

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                this._grid.push(0);
            }
        }

        // console.log('GRID', this._grid);
    }

    clone() {
        return new this.constructor(this._size.width, this._size.height, this._origin, this._grid);
    }

    freeTile(x, y) {
        const p = this._origin.sum(x, y);
        this._grid[this._size.width * p.y + p.x] = 0;
    }

    setTile(x, y) {
        const p = this._origin.sum(x, y);
        this._grid[this._size.width * p.y + p.x] = 1;
    }

    getTile(x, y) {
        const p = this._origin.sum(x, y);
        return this._grid[this._size.width * p.y + p.x];
    }

    isFree(x, y) {
        const p = this._origin.sum(x, y);
        return this._grid[this._size.width * p.y + p.x] === 0;
    }

};
