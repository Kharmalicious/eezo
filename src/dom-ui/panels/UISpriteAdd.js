import UIBase from '../core/UIBase';
import Tree from '../../samples/Tree';
import Boy from '../../samples/Boy';

export default class UISpriteAdd extends UIBase {

    constructor() {
        super();

        const sprites = [
            ['Tree', Tree],
            ['Boy', Boy]
        ];

        // SELECT
        const select_sprite = this.createSelect(sprites.map(o => o[0]));
        this.element.appendChild(select_sprite);

        // BUTTON
        const button_add = this.createButton('Add sprite');
        button_add.addEventListener('click', (e) => {
            const cls = sprites[select_sprite.value][1];
            this.onAdd(e, {
                instance: new cls({})
            });
        });
        this.element.appendChild(button_add);
    }

    onAdd(event) { }

};
