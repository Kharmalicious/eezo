import Color from '../core/Color';
import DisplayObject from './DisplayObject';

export default class Label extends DisplayObject {

    constructor(props) {
        super(props);
        this.props = {
            text: '',
            font: '20px Open Sans',
            align: 'left',
            baseline: 'top',
            color: 0x0,
            ...this.props
        };
        this.props.color = Color.get(this.props.color);
    }

    text(text) {
        return this._setProp('text', text);
    }

    font(font) {
        return this._setProp('font', font);
    }

    align(align) {
        return this._setProp('align', align);
    }

    baseline(baseline) {
        return this._setProp('baseline', baseline);
    }

    color(color) {
        return this._setProp('color', Color.get(color));
    }

};
