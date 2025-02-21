export class CheckBoxInput {
    base;
    input;
    disabled;
    input;

    constructor(base, val, label) {
        this.base = base;
        this.label = label;

        // construct html framework
        let container = document.createElement('div');
        container.classList.add('check-box-input-container');

        let pLabel = document.createElement('p');
        pLabel.innerHTML = label;
        pLabel.classList.add('check-box-input-text');

        this.input = document.createElement('input');
        this.input.type = 'checkbox';
        this.input.checked = val;
        this.input.classList.add('check-box-input-input');

        container.append(this.input, pLabel);

        this.base.appendChild(container);
    }

    get() {
        return this.input.checked;
    }

    set(val) {
        this.input.checked = val;
    }
}
