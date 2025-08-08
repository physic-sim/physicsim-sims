import { Button } from './Button';

export class PauseButton extends Button {
    paused;

    constructor(container, callback, paused = false) {
        if (paused) {
            super(container, callback, 'play_arrow', "play");
            this.button.classList.add('btn-run');
        } else {
            super(container, callback, 'pause', "pause");
            this.button.classList.add('btn-pause');
        }
        this.button.classList.remove('btn-alt');
        this.paused = paused;
    }

    pause() {
        this.paused = true;
        this.button.children[0].innerHTML = 'play_arrow';
    }

    play() {
        this.paused = false;
        this.button.children[0].innerHTML = 'pause';
    }
}
