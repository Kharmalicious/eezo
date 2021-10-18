import UIBase from './core/UIBase';
import UIShape from './UIShape';
import UISprite from './UISprite';
import UIStage from './UIStage';

export default class UIContainer extends UIBase {

    constructor(world) {
        super();
        this.element.style.cssText = 'position: fixed; width: 100%; display: flex; flex-wrap: wrap; background-color: #dededede; padding: 8px; box-sizing: border-box; transition: bottom ease-in-out 200ms;';

        this.world = world;

        const ui_toggle = new UIToggle();
        ui_toggle.element.style.cssText = 'position: absolute; top: -30px;';
        ui_toggle.onChange = checked => this.element.style.bottom = `${checked ? 0 : -this.element.clientHeight}px`;
        this.element.appendChild(ui_toggle.element);

        const ui_stage = new UIStage(this.world.stage);
        const ui_shape = new UIShape(this.world);
        const ui_sprite = new UISprite(this.world);
        this.element.appendChild(ui_stage.element);
        this.element.appendChild(ui_shape.element);
        this.element.appendChild(ui_sprite.element);
    }

    init() {
        this.element.style.bottom = `${-this.element.clientHeight}px`;
    }

};

class UIToggle extends UIBase {

    constructor() {
        super('label');

        const toggle = document.createElement('input');
        toggle.setAttribute('type', 'checkbox');
        toggle.addEventListener('change', e => this.onChange(e.target.checked));

        const label = document.createElement('span');
        label.style.cssText = 'margin: 0 4px; font-size: 14px;';
        label.textContent = 'toggle UI';

        this.element.appendChild(toggle);
        this.element.appendChild(label);
    }

}
