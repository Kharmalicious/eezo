import Token from '../../display/Token';
import UIBase from '../core/UIBase';
import UIPoint from '../core/UIPoint';

export default class UISpriteEdit extends UIBase {

    constructor(sprites) {
        super();

        this.sprites = sprites;

        this.currentSprite = null;
        this.selectCurrentSprite = this.createSelect([]);
        this.selectCurrentSprite.addEventListener('change', () => {
            this.updateCurrentSprite();
        });

        this.animation = new UITokenEditAnimation();
        this.animation.onChange = this.updateAnimation.bind(this);
        this.frames = new UISpriteEditRange('frame');
        this.frames.onChange = this.updateFrames.bind(this);
        this.position = new UIPoint('position', 1);
        this.position.onChange = this.updatePosition.bind(this);

        this.element.appendChild(this.selectCurrentSprite);
        this.element.appendChild(this.animation.element);
        this.element.appendChild(this.frames.element);
        this.element.appendChild(this.position.element);
    }

    onEdit() { }

    // SPRITE LIST
    updateSpriteList(options) {
        this.updateSelect(this.selectCurrentSprite, options);
        this.currentSprite || (this.currentSprite = this.sprites[0]);
        this.updateCurrentSprite();
    }

    // CURRENT SPRITE
    updateCurrentSprite() {
        this.currentSprite = this.sprites[this.selectCurrentSprite.value];
        this.updateKnobs();
    }

    // KNOBS
    updateKnobs() {
        this.updateFramesKnobs();
        this.updatePositionKnobs();
        this.updateAnimationKnobs();
    }

    // ANIMATION
    updateAnimation() {
        if (this.currentSprite instanceof Token) {
            const { actions, directions } = this.currentSprite;
            this.currentSprite.ACTION = actions[this.animation.value.action];
            this.currentSprite.DIR = directions[this.animation.value.direction];
            this.currentSprite.updateFrames();
            this.updateFramesKnobs();
            this.updateFrames();
        }
    }
    updateAnimationKnobs() {
        this.animation.update(this.currentSprite);
    }

    // FRAMES
    updateFrames() {
        this.currentSprite?.renderFrame(this.frames.value);
        this.onEdit();
    }
    updateFramesKnobs() {
        this.frames.update({
            value: this.currentSprite._current,
            max: this.currentSprite._frames.length - 1
        })
    }

    //  POSITION
    updatePosition() {
        this.currentSprite?.position(this.position.value);
        this.onEdit();
    }
    updatePositionKnobs() {
        const { x, y, z } = this.currentSprite.props.position;
        this.position.update(x, y, z);
    }

};

class UISpriteEditRange extends UIBase {

    constructor(prop, min = 0, max = 0, step = 1) {
        super();
        this.prop = prop;

        const label = document.createElement('span');
        label.textContent = `${prop}: `;

        this.output = document.createElement('span');

        this.range = this.createRange(min, max, step);
        this.range.addEventListener('change', () => {
            this.output.textContent = this.range.value;
            this.onChange();
        });

        this.element.appendChild(label);
        this.element.appendChild(this.range);
        this.element.appendChild(this.output);
    }

    get value() {
        return Number(this.range.value);
    }

    update({ min, max, step, value }) {
        this.updateRange(this.range, { min, max, step, value });
        this.output.textContent = this.range.value;
    }

}

class UITokenEditAnimation extends UIBase {

    constructor() {
        super();
        const animLabel = document.createElement('span');
        animLabel.textContent = 'animation: ';

        this.action = this.createSelect([]);
        this.action.addEventListener('change', () => {
            this.onChange();
        });

        this.direction = this.createSelect([]);
        this.direction.addEventListener('change', () => {
            this.onChange();
        });

        this.element.appendChild(animLabel);
        this.element.appendChild(this.action);
        this.element.appendChild(this.direction);

    }

    get value() {
        return {
            action: Number(this.action.value),
            direction: Number(this.direction.value)
        };
    }

    update(sprite) {
        if (sprite instanceof Token) {
            const { animation, actions, directions, ACTION, DIR } = sprite;
            this.updateSelect(this.action, animation ? actions : [], actions.indexOf(ACTION));
            this.updateSelect(this.direction, animation ? directions : [], directions.indexOf(DIR));
        } else {
            this.updateSelect(this.action, []);
            this.updateSelect(this.direction, []);
        }
    }

}
