export default class Color {

    constructor(red = 0, green = 0, blue = 0, alpha = 255) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;

        const hsl = Color.rgbToHsl(red, green, blue);
        this.hue = hsl.h;
        this.saturation = hsl.s;
        this.lightness = hsl.l;
    }

    get hex() {
        const hex = (this.red * 256 * 256 + this.green * 256 + this.blue).toString(16);
        return hex.length === 6 ? hex :
            new Array(6 - hex.length + 1).join('0') + hex;
    }

    get string() {
        return this.alpha === 255 ? `#${this.hex}` :
            `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
    }

    get array() {
        return [this.red, this.green, this.blue];
    }

    get object() {
        return { red: this.red, green: this.green, blue: this.blue };
    }

    get percentage() {
        return Color.mult(this, 1 / 255);
    }

    get rgb() {
        return {
            r: this.red,
            g: this.green,
            b: this.blue
        }
    }

    lighten(percentage, lightColor) {
        const _lightColor = lightColor ? Color.get(lightColor) : Color.get(255, 255, 255);
        const newColor = Color.get(Color.mult(this, _lightColor.percentage));
        newColor.lightness = Math.min(newColor.lightness + percentage, 1);

        return Color.get(
            Color.hslToRgb(newColor.hue, newColor.saturation, newColor.lightness),
            this.a
        );
    };

    static rgbToHsl(red, green, blue) {
        const perc = Color.percentage({ red, green, blue });
        const max = Math.max(perc.red, perc.green, perc.blue);
        const min = Math.min(perc.red, perc.green, perc.blue);
        const ret = { h: 0, s: 0, l: (max + min) / 2 };

        if (max !== min) {
            const diff = max - min;
            ret.s = ret.l > 0.5 ? diff / (2 - max - min) : diff / (max + min);
            switch (max) {
                case perc.red: ret.h = (perc.green - perc.blue) / diff + (perc.green < perc.blue ? 6 : 0); break;
                case perc.green: ret.h = (perc.blue - perc.red) / diff + 2; break;
                case perc.blue: ret.h = (perc.red - perc.green) / diff + 4; break;
            }
            ret.h /= 6;
        }

        return ret;
    }

    static hslToRgb(h = 0, s = 0, l = 1) {
        const perc = { red: l, green: l, blue: l };

        if (s !== 0) {
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            perc.red = Color.hue2rgb(p, q, h + 1 / 3);
            perc.green = Color.hue2rgb(p, q, h);
            perc.blue = Color.hue2rgb(p, q, h - 1 / 3);
        }

        return [parseInt(perc.red * 255), parseInt(perc.green * 255), parseInt(perc.blue * 255)];
    }

    static hue2rgb(p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    }

    static mult(color, num) {
        if (typeof num === 'number') {
            return {
                red: color.red * num,
                green: color.green * num,
                blue: color.blue * num
            }
        }
        return {
            red: color.red * num.red,
            green: color.green * num.green,
            blue: color.blue * num.blue
        }
    }

    static percentage(color) {
        return Color.mult(color, 1 / 255);
    }

    // FACTORY

    static get() {
        if (typeof arguments[0] !== 'number' && !arguments[0]) {
            return null;
        }
        if (arguments.length > 2) {
            return Color.fromArray(arguments);
        } else {
            const color = arguments[0] || 0x0;
            const alpha = arguments[1] || 1;

            if (typeof color === 'number') {
                return Color.fromHex(color, Math.round(alpha * 255));
            }
            if (color instanceof Array) {
                return Color.fromArray(color);
            }
            if (color instanceof Object) {
                return Color.fromObject(color);
            }
        }
        return null;
    }

    static random() {
        return new Color(parseInt(Math.random() * 255), parseInt(Math.random() * 255), parseInt(Math.random() * 255));
    }

    static fromHex(number, alpha) {
        const hex = `000000${number.toString(16)}`.substr(-6);
        const res = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

        return res ?
            new Color(
                parseInt(res[1], 16),
                parseInt(res[2], 16),
                parseInt(res[3], 16),
                alpha
            ) : null;
    }

    static fromArray(array) {
        return new Color(
            array[0] || 0,
            array[1] || 0,
            array[2] || 0,
            array[3] || 255
        );
    }

    static fromObject(object) {
        return new Color(
            object.red || 0,
            object.green || 0,
            object.blue || 0,
            object.alpha || 255
        );
    }

};
