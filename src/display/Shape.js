import Color from '../core/Color';
import Path from '../core/Path';
import DisplayObject from './DisplayObject';

export default class Shape extends DisplayObject {

    constructor(props = {}, path = new Path()) {
        super(props);
        this.props = {
            color: null,
            stroke: null,
            wireframe: false,
            extruded: false,
            ...this.props
        };
        this.props.color = Color.get(this.props.color);
        this.props.stroke = Color.get(this.props.stroke || (this.props.wireframe ? 0x0 : null));

        this.path = path;
        this.extraPaths = [];
    }

    get paths() {
        const p = this.extrudePaths.length ? this.extrudePaths : [this.path];
        return p.concat(this.extraPaths)
            .map(path => path
                .rotate(this.props.rotation, this.props.size.mult(.5))
                // .translate(this.renderPosition)
            );
    }

    get orderedPaths() {
        return this.paths.sort((p1, p2) => p2.depth - p1.depth);
    }

    get extrudePaths() {
        return this.props.extruded ? Path.extrude(this.path, this.props.size.z) : [];
    }

    add(path) {
        if (path instanceof Array) {
            this.extraPaths = this.extraPaths.concat(path);
        } else {
            this.extraPaths.push(path);
        }
        return this;
    }

    clearPaths() {
        this.extraPaths = [];
    }

    extrude(extrude) {
        this.props.size.z = extrude;
        return this._setProp('extruded', true);
    }

    stroke(stroke) {
        return this._setProp('stroke', Color.get(stroke));
    }

    color(color) {
        return this._setProp('color', Color.get(color));
    }

};
