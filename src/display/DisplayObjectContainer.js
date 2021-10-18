import DisplayObject from './DisplayObject';

export default class DisplayObjectContainer extends DisplayObject {

    constructor(props) {
        super(props);
        this._children = [];
    }

    get orderedChildren() {
        return this._children.sort((c1, c2) => c2.depth - c1.depth);
    }

    add(child) {
        if (child instanceof Array) {
            child.forEach(c => this.add(c));
        } else {
            this._addChild(child);
        }
        return this;
    }

    remove(child) {
        if (child instanceof Array) {
            child.forEach(c => this.remove(c));
        } else {
            _removeChild(child);
        }
        return this;
    }

    _addChild(child) {
        if (child instanceof DisplayObject) {
            const index = this._children.indexOf(child);
            if (~index) {
                this._children.splice(index, 1);
            }
            this._children.push(child);
            child.parent = this;
        } else {
            console.log('cant add', child);
        }
    }

    _removeChild(child) {
        const idx = this._children.indexOf(child);
        if (idx > -1) {
            this._children.splice(idx, 1);
            child.parent = null;
        } else {
            console.log('cant remove', child);
        }
    }
};
