export default class UIBase {

    constructor(tag = 'div') {
        this.element = document.createElement(tag);
        this.element.style.cssText = 'box-sizing: border-box; padding: 4px;';
    }

    onChange() { }

    createSelect(options = []) {
        const select = document.createElement('select');

        for (let i in options) {
            const opt = document.createElement('option');
            opt.text = options[i];
            opt.value = i;
            select.appendChild(opt);
        }

        return select;
    }

    updateSelect(select, options = [], selectedIndex = null) {
        const selected = select.value;
        while (select.firstChild) {
            select.removeChild(select.lastChild);
        }
        for (let i in options) {
            const opt = document.createElement('option');
            const isSelected = selectedIndex === null ?
                ~~i === options.length - 1 :
                ~~i === selectedIndex;

            opt.text = options[i];
            opt.value = i;
            opt.selected = isSelected;
            select.appendChild(opt);
        }
    }

    createButton(text = 'button') {
        const button = document.createElement('button');
        button.textContent = text
        return button;
    }

    createTextField(type = 'text') {
        const textfield = document.createElement('input');
        textfield.setAttribute('type', type);
        return textfield;
    }

    createRange(min = 0, max = 0, step = 1) {
        const range = document.createElement('input');
        range.setAttribute('type', 'range');
        range.setAttribute('min', min);
        range.setAttribute('max', max);
        range.setAttribute('step', step);
        return range;
    }

    updateRange(range, { min, max, step, value } = {}) {
        typeof min === 'number' && range.setAttribute('min', min);
        typeof max === 'number' && range.setAttribute('max', max);
        typeof step === 'number' && range.setAttribute('step', step);
        typeof value === 'number' && (range.value = value);
    }

    createStepper(step = 1, min = null, max = null) {
        const textfield = document.createElement('input');
        textfield.setAttribute('type', 'number');
        textfield.setAttribute('step', step);
        textfield.style.cssText = 'width: 60px';
        typeof min === 'number' && textfield.setAttribute('min', min);
        typeof max === 'number' && textfield.setAttribute('max', max);
        return textfield;
    }

};
