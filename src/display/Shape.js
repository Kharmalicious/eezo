import Color from '../core/Color';
import Path from '../core/Path';
import Point from '../core/Point';
import DisplayObject from './DisplayObject';

export default class Shape extends DisplayObject {

    constructor(props = {}, path = new Path(), paths = []) {
        super(props);
        this.props = {
            color: null,
            stroke: null,
            wireframe: false,
            ...this.props
        };
        this.props.color = Color.get(this.props.color);
        this.props.stroke = Color.get(this.props.stroke || (this.props.wireframe ? 0x0 : null));

        this._paths = paths;

        this.path = path;
        this.extraPaths = [];
        this._render = {
            paths,
        };
    }

    get paths() {
        return this._paths.map(path => path
            .rotate(this.props.rotation, this.props.size.mult(.5))
            .translate(this.renderPosition)
        );
    }

    get orderedPaths() {
        return this.paths.sort((p1, p2) => p2.depth - p1.depth);
    }

    draw() {
        console.log('drawing', this.name);
        if (this.stage) {
            console.log(' - update render paths');
            this._render = {
                paths: this.orderedPaths.map(path =>
                    new Path(
                        path.points.map(point => this.layer.layerToScreen(point)),
                        path.color && this.stage.light.computeColor(path.color, path.points),
                        path.stroke
                    )
                )
            };
        }
    }

    add(path) {
        if (path instanceof Array) {
            this._paths = this._paths.concat(path);
        } else {
            this._paths.push(path);
        }
        return this;
    }

    clearPaths() {
        this._paths = [];
    }

    stroke(stroke) {
        return this._setProp('stroke', Color.get(stroke));
    }

    color(color) {
        return this._setProp('color', Color.get(color));
    }

    // OVERRIDE set position

    position() {
        const _point = Point.get(...arguments);
        this.props.position = this.props.position.replace(_point);
        this.draw();
        return this;
    }

};
