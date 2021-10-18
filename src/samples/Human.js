import Token from '../display/Token';

export default class Human extends Token {

    constructor(props) {
        super({
            fps: 6,
            velocity: .03,
            imagePath: 'img/walkcycle.png',
            renderMiddleFrames: true,
            // wireframe: true,
            ...props
        });

        this.UNIT = 40;

        this.animation.setDirection(Token.DIR__DEFAULT, {
            stand: [{ position: [174, 180], size: [50, 110], offset: [0, 20] }],
            walk: [
                { position: [224, 210], size: [50, 100], offset: [-2, 12] },
                { position: [274, 242], size: [60, 100], offset: [-2, 14] }
            ]
        });

        this.stand();
    }

};
