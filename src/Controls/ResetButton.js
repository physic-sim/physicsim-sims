import { Button } from './Button';

export class ResetButton extends Button {
    constructor(container, callback) {
        super(container, callback, 'replay', "reset/apply");
        this.button.classList.remove('btn-alt');
        this.button.classList.add('btn-run');
    }
}
