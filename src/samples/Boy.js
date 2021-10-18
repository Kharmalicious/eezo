import Token from '../display/Token';

export default class Boy extends Token {

    constructor(props) {
        super({
            fps: 6,
            velocity: .04,
            imagePath: 'img/boy.png',
            renderMiddleFrames: true,
            // wireframe: true,
            ...props
        });

        this.UNIT = 30;

        this.animation.setDefault({ size: [55, 110], offset: [0, 12] });

        this.animation.setDirection(Token.DIR__NN, {
            stand: [{ position: [326, 537] }],
            walk: [
                { position: [326, 536] },
                { position: [262, 536] },
                { position: [326, 536] },
                { position: [390, 536] }
            ]
        });
        this.animation.setDirection(Token.DIR__EE, {
            stand: [{ position: [100, 280] }],
            walk: [
                { position: [100, 280] },
                { position: [36, 280] },
                { position: [100, 280] },
                { position: [162, 280] }
            ]
        });
        this.animation.setDirection(Token.DIR__SS, {
            stand: [{ position: [100, 152] }],
            walk: [
                { position: [100, 152] },
                { position: [36, 152] },
                { position: [100, 152] },
                { position: [162, 152] }
            ]
        });
        this.animation.setDirection(Token.DIR__WW, {
            stand: [{ position: [100, 536] }],
            walk: [
                { position: [100, 536] },
                { position: [36, 536] },
                { position: [100, 536] },
                { position: [162, 536] }
            ]
        });
    }

};
