import { Button } from "./Button";

export class PauseButton extends Button {

    paused;

    constructor(container, callback, paused=false) {
        if (paused) {
            super(container, callback, 'Play')
            this.button.classList.add('btn-run')
        } else {
            super(container, callback, 'Pause');
            this.button.classList.add('btn-pause')
        }
        this.button.classList.remove('btn-alt')
        this.paused = paused;

        this.button.addEventListener('click', this.onClick.bind(this));
    }

    onClick() {
        this.paused = !this.paused;

        if (this.paused) {
            this.button.innerHTML = 'Play';
            this.button.classList.remove('btn-pause')
            this.button.classList.add('btn-run')
        } else {
            this.button.innerHTML = 'Pause';
            this.button.classList.remove('btn-run')
            this.button.classList.add('btn-pause')
        }
    }

}