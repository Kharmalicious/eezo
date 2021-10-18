import UIBase from './core/UIBase';
import UIShapeAdd from './panels/UIShapeAdd';
import UIShapeEdit from './panels/UIShapeEdit';

export default class UIShape extends UIBase {

    constructor(layer) {
        super();
        this.element.style.cssText = 'flex: 1 1 50%';

        this.shapes = [];
        this.layer = layer;

        const shapeEdit = new UIShapeEdit(this.shapes);
        shapeEdit.onEdit = () => this.layer.stage.render();

        const shapeAdd = new UIShapeAdd();
        shapeAdd.onAdd = (e, { instance }) => {
            instance.name = `${instance.name || 'shape'}_${this.shapes.length.toString()}`;
            this.shapes.push(instance);
            this.layer.add(instance);
            this.layer.stage.render();
            shapeEdit.updateShapeList(this.shapes.map(s => s.name));
        }

        this.element.appendChild(shapeAdd.element);
        this.element.appendChild(shapeEdit.element);
    }

};
