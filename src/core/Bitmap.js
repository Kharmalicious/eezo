import Point from './Point';

export default class Bitmap {

    constructor(props = {}) {
        this.props = {
            wireframe: false,
            imagePath: null,
            size: [0, 0],
            position: [0, 0],
            offset: [0, 0],
            ...props
        };
        this.props.size = Point.get(this.props.size);
        this.props.position = Point.get(this.props.position);
        this.props.offset = Point.get(this.props.offset);

        this._image = new Image();
        this._image.onload = event => {
            this.image(event.target);
            this.onLoad(event);
        };
        this.props.imagePath && (this._image.src = this.props.imagePath);
    }

    image(image) {
        this._image.onload = null;

        if (this.props.size.average === 0) {
            this.props.size = Point.get(image.naturalWidth, image.naturalHeight);
        }
        this._image = image;

        return this;
    }

    size() {
        this.props.size = Point.get(...arguments);
        return this;
    }

    position() {
        this.props.position = Point.get(...arguments);
        return this;
    }

    offset() {
        this.props.offset = Point.get(...arguments);
        return this;
    }

    onLoad(event) {
        // image loaded
    }

};
