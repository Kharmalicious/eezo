import Color from '../../core/Color';
import UIBase from '../core/UIBase';
import UIPoint from '../core/UIPoint';

export default class UIShapeEdit extends UIBase {

    constructor(shapes) {
        super();

        this.shapes = shapes;

        this.currentShape = null;
        this.selectCurrentShape = this.createSelect([]);
        this.selectCurrentShape.addEventListener('change', () => {
            this.updateCurrentShape();
        });

        this.color = new UIColor();
        this.color.onChange = this.updateColor.bind(this);
        this.size = new UIPoint('size', 0.1, 0.1);
        this.size.onChange = this.updateSize.bind(this);
        this.position = new UIPoint('position', 0.1);
        this.position.onChange = this.updatePosition.bind(this);
        this.rotation = new UIPoint('rotation', 10, 0, 360);
        this.rotation.onChange = this.updateRotation.bind(this);

        this.element.appendChild(this.selectCurrentShape);
        this.element.appendChild(this.color.element);
        this.element.appendChild(this.size.element);
        this.element.appendChild(this.position.element);
        this.element.appendChild(this.rotation.element);
    }

    onEdit() { }

    // SHAPE LIST
    updateShapeList(options) {
        this.updateSelect(this.selectCurrentShape, options);
        this.currentShape || (this.currentShape = this.shapes[0]);
        this.updateCurrentShape();
    }

    // CURRENT SHAPE
    updateCurrentShape() {
        this.currentShape = this.shapes[this.selectCurrentShape.value];
        this.updateKnobs();
    }

    // KNOBS
    updateKnobs() {
        this.updateColorKnobs();
        this.updateSizeKnobs();
        this.updatePositionKnobs();
        this.updateRotationKnobs();
    }

    //  COLOR
    updateColor() {
        this.currentShape?.color(this.color.value);
        this.onEdit();
    }
    updateColorKnobs() {
        const { color } = this.currentShape?.props || {};
        this.color.update(color);
    }

    // SIZE
    updateSize() {
        this.currentShape?.size(this.size.value);
        this.updateSizeKnobs();
        this.onEdit();
    }
    updateSizeKnobs() {
        const { x, y, z } = this.currentShape?.props.size || {};
        this.size.update(x, y, z);
    }

    //  POSITION
    updatePosition() {
        this.currentShape?.position(this.position.value);
        this.onEdit();
    }
    updatePositionKnobs() {
        const { x, y, z } = this.currentShape?.props.position || {};
        this.position.update(x, y, z);
    }

    //  ROTATION
    updateRotation() {
        this.currentShape?.rotation(this.rotation.value);
        this.onEdit();
    }
    updateRotationKnobs() {
        const { x, y, z } = this.currentShape?.props.rotation || {};
        this.rotation.update(x, y, z);
    }

};

class UIColor extends UIBase {

    constructor() {
        super();

        const label = document.createElement('span');
        label.textContent = 'color: ';

        this.color = this.createTextField('text');
        this.color.style.cssText = 'width: 80px';
        this.color.addEventListener('change', () => this.onChange?.());

        const button = this.createButton('random');
        button.addEventListener('click', () => {
            this.color.value = Color.random().string;
            this.onChange();
        });

        this.element.appendChild(label);
        this.element.appendChild(this.color);
        this.element.appendChild(button);
    }

    get value() {
        return parseInt(Number('0x' + this.color.value.substr(1)));
    }

    update(color) {
        this.color.value = color.string;
    }

}
