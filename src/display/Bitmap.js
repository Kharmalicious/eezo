import DisplayObject from './DisplayObject';
import Point from '../core/Point';

export default class Bitmap extends DisplayObject {

    constructor(props = {}) {
        super(props);
        this.props = {
            wireframe: false,
            imagePath: null,
            sourceSize: [0, 0],
            sourcePosition: [0, 0],
            destinationSize: null,
            destinationPosition: [0, 0],
            ...this.props
        };
        this.props.sourceSize = Point.get(this.props.sourceSize);
        this.props.sourcePosition = Point.get(this.props.sourcePosition);
        this.props.destinationSize = Point.get(this.props.destinationSize || this.props.sourceSize);
        this.props.destinationPosition = Point.get(this.props.destinationPosition);

        this._loaded = false;
        this.image = new Image();
        this.image.onload = event => {
            if (!this._loaded) {
                this.updateImageSize(event.target);
                this.onLoad(event);
            }
        };
        this.props.imagePath && (this.image.src = this.props.imagePath);
    }

    get source() {
        return {
            size: this.props.sourceSize,
            position: this.props.sourcePosition
        }
    }

    get destination() {
        return {
            size: this.props.destinationSize,
            position: this.props.destinationPosition
        }
    }

    updateImageSize(img) {
        this._loaded = true;
        if (this.props.sourceSize.average === 0) {
            this.props.sourceSize = Point.get(img.naturalWidth, img.naturalHeight);
        }
        if (this.props.destinationSize.average === 0) {
            this.props.destinationSize = this.props.sourceSize;
        }
    }

    onLoad(event) {
    }

    // sourceSize(size) {
    //     return this._setPoint('sourceSize', size);
    // }

    // sourcePosition(position) {
    //     return this._setPoint('sourcePosition', position);
    // }

    // destinationSize(size) {
    //     return this._setPoint('destinationSize', size);
    // }

    // destinationPosition(position) {
    //     return this._setPoint('destinationPosition', position);
    // }

};
