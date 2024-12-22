import { NumInput } from './NumInput';

export class ValueInput {
    base;
    val;
    label;
    unit;

    constructor(base, val, label, unit, disabled = false, onClick = null) {
        this.base = base;
        this.label = label;
        this.unit = unit;

        // construct html framework
        let container = document.createElement('div');
        container.classList.add('value-input-container');

        let pLabel = document.createElement('p');
        pLabel.innerHTML = this.label;
        pLabel.classList.add('value-input-text');

        let pEqual = document.createElement('p');
        pEqual.innerHTML = '=';
        pLabel.classList.add('value-input-text');

        let pUnit = document.createElement('p');
        pUnit.innerHTML = this.unit;
        pUnit.classList.add('value-input-text');

        container.append(pLabel, pEqual);

        this.val = new NumInput(container, val, disabled, onClick);

        container.append(pUnit);

        this.base.appendChild(container);
    }

    get() {
        return this.val.get();
    }

    set(val) {
        this.val.set(val);
    }

    toggleDisable() {
        this.val.toggleDisable();
    }
}
