import { ResetButton } from '../Controls/ResetButton';
import { PauseButton } from '../Controls/PauseButton';

export class TwoDSimulation {

    constructor(
        container,
        inputs,
        controls,
        attributes,
        isStatic = false,
    ) {
        // add containers and pause functionality
        this.paused = false;
        this.container = container;
        this.inputWrapper = inputs;
        this.controlWrapper = controls;
        this.attributeWrapper = attributes;
        this.isStatic = isStatic;
    }

    setup(stopLoading) {
        // disable loading screen
        stopLoading();

        // disable pause
        this.paused = false;

        // add basic controls
        this.controlWrapper.innerHTML = '';
        this.runBtn = new ResetButton(
            this.controlWrapper,
            (() => this.setup(stopLoading)).bind(this),
        );

        // render pause button if simulation is continuous
        if (!this.isStatic) {
            this.pauseBtn = new PauseButton(
                this.controlWrapper,
                this.togglePause.bind(this),
            );
        }

        // run simulation init code
        this.init();
    }

    init() {
        // initial simulation logic
        throw new Error('init() must be implemented by subclass');
    }

    togglePause(paused=null) {

        if (typeof(paused) !== Boolean) {
            paused = !this.paused;
        }

        this.paused = paused;
    }
}
