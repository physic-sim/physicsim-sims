export class SliderInput {
    base;
    input;
    min;
    max;
    label;
    unit;
    pLabel;

    constructor(base, val, min, max, step, label, unit, update = true) {
        this.base = base;
        this.min = min;
        this.max = max;
        this.label = label;
        this.unit = unit;

        let container = document.createElement('div');
        container.classList.add('slider-input-container');

        this.pLabel = document.createElement('p');
        if (update) {
            this.pLabel.innerHTML = `${this.label} = ${val.toFixed(2)} ${this.unit}`;
        } else {
            this.pLabel.innerHTML = this.label;
        }

        this.input = document.createElement('input');
        this.input.type = 'range';
        this.input.min = this.min;
        this.input.max = this.max;
        this.input.step = step;
        this.input.value = val;
        this.input.classList.add('slider-input-slider');

        container.append(this.pLabel, this.input);

        this.base.append(container);

        if (update) {
            this.input.addEventListener('input', this.update.bind(this));
        }
    }

    get() {
        return parseFloat(this.input.value);
    }

    set(val) {
        this.input.value = val;
    }

    update() {
        this.pLabel.innerHTML = `${this.label} = ${this.get().toFixed(2)} ${this.unit}`;
    }

    changeBounds(min, max) {
        this.min = min;
        this.max = max;
        this.input.min = this.min;
        this.input.max = this.max;
    }
}
