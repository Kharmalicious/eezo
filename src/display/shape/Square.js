import Rect from './Rect';

export default class Square extends Rect {

    constructor(props = {}, size = 1) {
        super({
            size: [size, size, 0],
            ...props
        });
        this.name = 'square';
    }

};
