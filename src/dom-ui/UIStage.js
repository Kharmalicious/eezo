import UIBase from './core/UIBase';

export default class UIStage extends UIBase {

    constructor(stage) {
        super();
        this.element.style.cssText = 'flex: 1 1 100%';

        this.stage = stage;

        const label = document.createElement('span');
        label.textContent = 'live';

        this.player = document.createElement('input');
        this.player.setAttribute('type', 'checkbox');
        this.player.addEventListener('change', () => {
            this.player.checked ?
                this.stage.start() :
                this.stage.stop();
        });

        this.element.appendChild(label);
        this.element.appendChild(this.player);
    }

};
