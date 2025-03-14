import { ResetButton } from '../Controls/ResetButton';
import { PauseButton } from '../Controls/PauseButton';

export class ThreeDSimulation {
    rotateControl = true;

    constructor(
        container,
        inputs,
        graphs,
        controls,
        attributes,
        isStatic = false,
    ) {
        // add containers and pause functionality
        this.paused = false;
        this.container = container;
        this.inputWrapper = inputs;
        this.graphWrapper = graphs;
        this.controlWrapper = controls;
        this.attributeWrapper = attributes;
        this.selected = 'graphs';
        this.isStatic = isStatic;
    }

    setup(p, stopLoading) {
        // disable loading screen
        stopLoading();

        p.frameRate(30);

        // make canvas
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas = p.createCanvas(
            this.width,
            this.height,
            p.WEBGL,
            this.container,
        );

        this.paused = false;

        // add basic controls
        this.controlWrapper.innerHTML = '';
        this.runBtn = new ResetButton(
            this.controlWrapper,
            (() => this.setup(p, stopLoading)).bind(this),
        );

        // render pause button if simulation is continuous
        if (!this.isStatic) {
            this.pauseBtn = new PauseButton(
                this.controlWrapper,
                this.togglePause.bind(this),
            );
        }

        // run simulation init code
        this.init(p);
    }

    init(p) {
        // initial simulation logic
        throw new Error('init() must be implemented by subclass');
    }

    draw(p) {
        p.background(0);
        this.frame(p);
    }

    frame(p) {
        // frame simulation logic
        throw new Error('frame() must be implemented by subclass');
    }

    togglePause(paused = null) {
        if (typeof paused !== Boolean) {
            paused = !this.paused;
        }

        this.paused = paused;
    }

    handleResize(p) {
        // resize sketch based on window change
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        p.resizeCanvas(this.width, this.height);
    }

    makeGraph() {
        // return graph div with correct styling
        let element = document.createElement('canvas');
        this.graphWrapper.append(element);
        element.classList.add('graph');
        return element;
    }
}
