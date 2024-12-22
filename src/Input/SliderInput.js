export class SliderInput {
    base;
    input;
    min;
    max;
    label;
    unit;
    pLabel;

    constructor(base, val, min, max, step, label, unit) {
        this.base = base;
        this.min = min;
        this.max = max;
        this.label = label;
        this.unit = unit;

        let container = document.createElement('div');
        container.classList.add('slider-input-container');

        this.pLabel = document.createElement('p');
        this.pLabel.innerHTML = `${this.label} = ${val.toFixed(2)} ${this.unit}`;

        this.input = document.createElement('input');
        this.input.type = 'range';
        this.input.min = this.min;
        this.input.max = this.max;
        this.input.value = val;
        this.input.step = step;
        this.input.classList.add('slider-input-slider');

        container.append(this.pLabel, this.input);

        this.base.append(container);

        this.input.addEventListener('input', this.update.bind(this));
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
}
