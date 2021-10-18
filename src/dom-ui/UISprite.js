import UIBase from './core/UIBase';
import UISpriteAdd from './panels/UISpriteAdd';
import UISpriteEdit from './panels/UISpriteEdit';

export default class UISprite extends UIBase {

    constructor(layer) {
        super();
        this.element.style.cssText = 'flex: 1 1 50%';

        this.sprites = [];
        this.layer = layer;

        const spriteEdit = new UISpriteEdit(this.sprites);
        spriteEdit.onEdit = () => this.layer.stage.render();

        const spriteAdd = new UISpriteAdd();
        spriteAdd.onAdd = (e, { instance }) => {
            instance.name = `${instance.name || 'sprite'}_${this.sprites.length.toString()}`;
            this.sprites.push(instance);
            this.layer.add(instance);
            this.layer.stage.render();
            spriteEdit.updateSpriteList(this.sprites.map(s => s.name));
        }

        this.element.appendChild(spriteAdd.element);
        this.element.appendChild(spriteEdit.element);
    }

};
