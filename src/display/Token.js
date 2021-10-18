import Point from '../core/Point';
import TokenAnimation from '../utils/TokenAnimation';
import Clip from './Clip';

export default class Token extends Clip {

    static TILE__NN = Point.get(0, -1);
    static TILE__EE = Point.get(1, 0);
    static TILE__SS = Point.get(0, 1);
    static TILE__WW = Point.get(-1, 0);
    static TILE__NW = Token.TILE__NN.sum(Token.TILE__WW);
    static TILE__NE = Token.TILE__NN.sum(Token.TILE__EE);
    static TILE__SW = Token.TILE__SS.sum(Token.TILE__WW);
    static TILE__SE = Token.TILE__SS.sum(Token.TILE__EE);

    static ACTION__STAND = 'stand';
    static ACTION__WALK = 'walk';
    static DIR__NW = 'NW';
    static DIR__NN = 'NN';
    static DIR__NE = 'NE';
    static DIR__EE = 'EE';
    static DIR__SE = 'SE';
    static DIR__SS = 'SS';
    static DIR__SW = 'SW';
    static DIR__WW = 'WW';
    static DIR__DEFAULT = Token.DIR__EE;

    constructor(props) {
        super(props);
        this.name = 'token';
        this.props = {
            velocity: 0.1,
            ...this.props
        }

        this.animation = new TokenAnimation();
        this._path = [];

        this.ALIVE = false;
        this.ACTION = Token.ACTION__STAND;
        this.DIR = Token.DIR__DEFAULT;

        this.walk = this.walk.bind(this);
        this.stand = this.stand.bind(this);
    }

    get lastTile() {
        return this._path.length ? this._path[this._path.length - 1] : this.props.position;
    }

    get actions() {
        return Object.keys(this.animation[Token.DIR__DEFAULT]);
    }

    get directions() {
        return Object.keys(this.animation).filter(p => p.substr(0, 1) !== '_');
    }

    onAdd() {
        this.updateFrames();
        super.onAdd();
    }

    renderFrame(frame) {
        super.renderFrame(frame);

        // movement
        if (this.ALIVE && this.ACTION === Token.ACTION__WALK) {
            if (this._path.length) {
                this.position(this._path.shift());
            } else {
                if (this._random) {
                    this.moveToRandom();
                } else {
                    this.stand();
                }
            }
        }
    }

    _getFrames(dir = this.DIR) {

        if (this.animation[dir]?.[this.ACTION]?.length) {
            return this.animation[dir][this.ACTION];
        }

        const def = Array(3).join(dir.substr(0, 1));
        if (this.animation[def]?.[this.ACTION]?.length) {
            return this.animation[def][this.ACTION];
        }

        if (this.animation[Token.DIR__DEFAULT]?.[this.ACTION]?.length) {
            return this.animation[Token.DIR__DEFAULT][this.ACTION];
        }

        throw new Error(`NO ANIMATION DIR:${this.DIR} - ACTION:${this.ACTION}`);
    }

    update() {
        super.update();
        if (this._path.length) {
            const diff = this._path[0].sub(this.props.position).round;

            let X = diff.x >= 0 ? 'E' : 'W';
            let Y = diff.y >= 0 ? 'S' : 'N';
            if (diff.y === 0) {
                Y = X;
            }
            if (diff.x === 0) {
                X = Y;
            }

            const dir = `${Y}${X}`;
            if (this.DIR !== dir) {
                this._frames = this._getFrames(dir);
            }
            this.DIR = dir;
        }
    }

    updateFrames() {
        this._frames = this._getFrames();
    }

    walk() {
        this.ALIVE = true;
        if (this.ACTION !== Token.ACTION__WALK || this._frames.length === 0) {
            this.ACTION = Token.ACTION__WALK;
            this._frames = this._getFrames();
        }
    }
    stand() {
        this.ALIVE = true;
        if (this.ACTION !== Token.ACTION__STAND || this._frames.length === 0) {
            this.ACTION = Token.ACTION__STAND;
            this._frames = this._getFrames();
        }
    }

    moveToTarget(target) {
        console.log('moveToTarget', target);
        if (this.layer._gridpath.isFree(target.x, target.y)) {
            this._path = this._getPath(target, this.props.position);
            this.walk();
        } else {
            console.log('BUSY!!');
        }
    }

    moveToRandom(min = -10, max = 10) {
        this._random = true;
        this.moveToTarget(Point.get(
            parseInt(Math.random() * (max - min)) + min,
            parseInt(Math.random() * (max - min)) + min
        ));
        this.walk();
    }

    moveNorth() {
        this._addTarget(Token.TILE__NN);
        this.walk();
    }
    moveEast() {
        this._addTarget(Token.TILE__EE);
        this.walk();
    }
    moveSouth() {
        this._addTarget(Token.TILE__SS);
        this.walk();
    }
    moveWest() {
        this._addTarget(Token.TILE__WW);
        this.walk();
    }

    _addTarget(target) {
        const _target = this.lastTile.sum(target);
        this._path = this._path.concat(this._getPath(_target, this.lastTile));
    }

    _getPath(target, start) {
        const p1 = start;
        const p2 = target;

        const steps = p1.distance(p2) / this.props.velocity;
        const step = p2.sub(p1).mult(1 / steps);

        const points = [];
        for (var s = 1; s < steps; s++) {
            points.push(p1.sum(step.mult(s)));
        }
        points.push(p2);

        return points;
    }

};
