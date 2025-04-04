import { ResetButton } from '../Controls/ResetButton';
import { PauseButton } from '../Controls/PauseButton';
import p5 from 'p5';

export class ThreeDSimulation {

    constructor(
        container,
        inputs,
        graphs,
        controls,
        attributes,
        isStatic = false, // TODO: Add noReset functionality
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
        this.rotateControl = true;
    }

    setup(stopLoading) { // initialiser

        // init p5 instance
        let p = new p5((p) => {
            p.setup = () => this.simSetup(p, stopLoading);
            p.draw = () => this.simDraw(p);
            p.windowResized = () => this.handleResize(p);
        });

        /* update frame-rate
        setInterval(() => {
            document.getElementById('frame-rate').innerHTML =
                `${p.frameRate().toFixed(2)}/${p.getTargetFrameRate().toFixed(2)} fps`;
        }, 1000);
        */

        // panel selector
        document.getElementById('graphs-selector').addEventListener('click', () => {
            if (this.selected == 'graphs') {
                document.getElementById('graphs-wrapper').style.opacity = 0;
                document.getElementById('graphs-wrapper').style.zIndex = -1;
                document
                    .getElementById('graphs-selector')
                    .classList.remove('btn-toggle--selected');
                this.selected = null;
            } else {
                document.getElementById('graphs-wrapper').style.opacity = 100;
                document.getElementById('graphs-wrapper').style.zIndex = 100;
                document.getElementById('inputs-wrapper').style.display = 'none';
                document
                    .getElementById('graphs-selector')
                    .classList.add('btn-toggle--selected');
                document
                    .getElementById('inputs-selector')
                    .classList.remove('btn-toggle--selected');
                this.selected = 'graphs';
            }
        });

        document.getElementById('inputs-selector').addEventListener('click', () => {
            if (this.selected == 'inputs') {
                document.getElementById('inputs-wrapper').style.display = 'none';
                document
                    .getElementById('inputs-selector')
                    .classList.remove('btn-toggle--selected');
                this.selected = null;
            } else {
                document.getElementById('graphs-wrapper').style.opacity = 0;
                document.getElementById('graphs-wrapper').style.zIndex = -1;
                document.getElementById('inputs-wrapper').style.display = 'flex';
                document
                    .getElementById('inputs-selector')
                    .classList.add('btn-toggle--selected');
                document
                    .getElementById('graphs-selector')
                    .classList.remove('btn-toggle--selected');
                this.selected = 'inputs';
            }
        });

        // prevent rotate when over control or graphs
        document
            .getElementById('inputs-wrapper')
            .addEventListener('mouseenter', () => {
                this.rotateControl = false;
            });

        document
            .getElementById('inputs-wrapper')
            .addEventListener('mouseleave', () => {
                this.rotateControl = true;
            });

        document.getElementById('inputs-wrapper').addEventListener('scroll', () => {
            this.rotateControl = false;
        });

        document
            .getElementById('inputs-wrapper')
            .addEventListener('scrollend', () => {
                this.rotateControl = true;
            });

        document
            .getElementById('graphs-wrapper')
            .addEventListener('mouseenter', () => {
                this.rotateControl = false;
            });

        document
            .getElementById('graphs-wrapper')
            .addEventListener('mouseleave', () => {
                this.rotateControl = true;
            });

        document
            .getElementById('graphs-wrapper')
            .addEventListener('scroll', () => {
                this.rotateControl = false;
        });

        document
            .getElementById('graphs-wrapper')
            .addEventListener('scrollend', () => {
                this.rotateControl = true;
            });

        document.querySelectorAll('input[type="range"]').forEach((slider) => {
            slider.addEventListener('pointerdown', (e) => {
                e.stopPropagation();
                this.rotateControl = false;
            });
            slider.addEventListener('pointerup', (e) => {
                this.rotateControl = true;
            });
        });

        // play / pause simulation based on visibility API
        document.addEventListener('visibilitychange', (e) => {
            if (document.visibilityState == 'visible') {
                this.togglePause(false);
            } else {
                this.togglePause(true);
            }
        });
    }

    simSetup(p, stopLoading) { // 3d sim setup wrapper
        // disable p5 error system
        p.disableFriendlyErrors = true;

        // add basic controls
        this.controlWrapper.innerHTML = '';
        this.runBtn = new ResetButton(
            this.controlWrapper,
            (() => this.simSetup(p, stopLoading)).bind(this),
        );

        // render pause button if simulation is continuous
        if (!this.isStatic) {
            this.pauseBtn = new PauseButton(
                this.controlWrapper,
                this.togglePause.bind(this),
            );
        }

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
        p.frameRate(30);

        // run simulation init code
        this.init(p);

        // disable loading screen
        stopLoading();
    }

    init(p) {
        // initial simulation logic
        throw new Error('init() must be implemented by subclass');
    }

    simDraw(p) { // p5 draw wrapper
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

    handleResize(p) { // resize sketch based on window change
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
