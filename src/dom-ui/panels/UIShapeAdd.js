import UIBase from '../core/UIBase';
import Cube from '../../display/shape/Cube';
import Cylinder from '../../display/shape/Cylinder';
import Diamond from '../../display/shape/Diamond';
import Pyramid from '../../display/shape/Pyramid';
import Ramp from '../../display/shape/Ramp';
import Stairs from '../../display/shape/Stairs';
import Lego from '../../display/shape/Lego';
import LegoBrick from '../../display/shape/LegoBrick';

export default class UIShapeAdd extends UIBase {

    constructor() {
        super();

        const shapes = [
            ['Cube', Cube],
            ['Cylinder', Cylinder],
            ['Pyramid', Pyramid],
            ['Diamond', Diamond],
            ['Ramp', Ramp],
            ['Stairs', Stairs],
            ['Lego', Lego],
            ['LegoBrick', LegoBrick],
        ];

        // SELECT
        const select_shape = this.createSelect(shapes.map(o => o[0]));
        this.element.appendChild(select_shape);

        // BUTTON
        const button_add = this.createButton('Add shape');
        button_add.addEventListener('click', (e) => {
            const cls = shapes[select_shape.value][1];
            this.onAdd(e, {
                instance: new cls({ color: 0xcccccc })
            });
        });
        this.element.appendChild(button_add);
    }

    onAdd(event) { }

};
