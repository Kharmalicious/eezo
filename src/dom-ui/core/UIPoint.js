import UIBase from './UIBase';

export default class UIPoint extends UIBase {

    constructor(prop, step = 0.1, min = null, max = null) {
        super();
        this.prop = prop;

        const label = document.createElement('span');
        label.textContent = `${prop}: `;

        const label_x = document.createElement('span');
        label_x.textContent = 'x';
        const label_y = document.createElement('span');
        label_y.textContent = 'y';
        const label_z = document.createElement('span');
        label_z.textContent = 'z';

        this.point_x = this.createStepper(step, min, max);
        this.point_x.addEventListener('change', () => this.onChange());
        this.point_y = this.createStepper(step, min, max);
        this.point_y.addEventListener('change', () => this.onChange());
        this.point_z = this.createStepper(step, min, max);
        this.point_z.addEventListener('change', () => this.onChange());

        // const button = this.createButton('set');
        // button.addEventListener('click', () => this.onClick());

        this.element.appendChild(label);
        this.element.appendChild(label_x);
        this.element.appendChild(this.point_x);
        this.element.appendChild(label_y);
        this.element.appendChild(this.point_y);
        this.element.appendChild(label_z);
        this.element.appendChild(this.point_z);
        // this.element.appendChild(button);
    }

    get value() {
        return [
            Number(this.point_x.value),
            Number(this.point_y.value),
            Number(this.point_z.value)
        ]
    }

    update(x, y, z) {
        this.point_x.value = x;
        this.point_y.value = y;
        this.point_z.value = z;
    }

}