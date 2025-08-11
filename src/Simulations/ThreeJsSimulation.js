import { ResetButton } from '../Controls/ResetButton';
import { PauseButton } from '../Controls/PauseButton';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export class ThreeJsSimulation {

    constructor(
        container,
        inputs,
        graphs,
        controls,
        attributes,
        isStatic = false,
    ) {
        // import arguments and sim settings to sim instance
        this.paused = false;
        this.container = container;
        this.inputWrapper = inputs;
        this.graphWrapper = graphs;
        this.controlWrapper = controls;
        this.attributeWrapper = attributes;
        this.selected = 'inputs';
        this.isStatic = isStatic;
        this.rotateControl = true;
    }

    setup(stopLoading) { // initialiser
        // initialise control and graphs seletors
        document.getElementById('graphs-selector').addEventListener('click', () => {
            if (this.selected !== 'graphs') {
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
            if (this.selected !== 'inputs') {
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

        // pause simulation when document is hidden
        document.addEventListener("visibilitychange", (e) => {
            if (document.hidden) {
                if (!this.pausedForVisibility) {
                    this.pausedForVisibility = true;
                    this.prevPauseState = this.paused;
                    this.togglePause(true);
                }
            } else if (this.paused) {
                this.pausedForVisibility = false;
                this.isFirstFrame = true;
                this.togglePause(this.prevPauseState);
            }
        })

       this.simSetup(stopLoading); // run setup of simulation
    }

    simSetup(stopLoading) { // 3d sim setup wrapper
        // clear the scene
        if (this.scene) {
            while (this.scene.children.length > 0) {
                this.scene.remove(this.scene.children[0]);
            }
        }

        // stop old loop
        if (this.renderer) {
            this.renderer.setAnimationLoop(null);
        }

        // add reset button
        this.controlWrapper.innerHTML = '';
        this.runBtn = new ResetButton(
            this.controlWrapper,
            (() => this.simSetup(stopLoading)).bind(this),
        );

        // add pause button if simulation is continuous
        if (!this.isStatic) {
            this.pauseBtn = new PauseButton(
                this.controlWrapper,
                this.togglePause.bind(this),
            );
        }

        // scale
        if (window.innerWidth >= 900) {
            this.width = window.innerWidth * 0.7;
            this.height = window.innerHeight;
        } else {
            this.width  = window.innerWidth;
            this.height = window.innerHeight * 0.6
        }

        // initialise THREE.js scene
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 1e20);

        this.renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('sim-wrapper'), antialias: true });
        this.renderer.setSize(this.width, this.height);
        
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.update();

        // listen to resize events
        window.addEventListener('resize', () => {
            // scale
            if (window.innerWidth >= 900) {
                this.width = window.innerWidth * 0.7;
                this.height = window.innerHeight;
            } else {
                this.width  = window.innerWidth;
                this.height = window.innerHeight * 0.6
            }
            this.renderer.setSize(this.width, this.height);
            this.camera.aspect = this.width / this.height;
            this.camera.updateProjectionMatrix();
        })

        // run simulation init code
        this.simInit();

        // disable loading screen
        stopLoading();


        // time scaling setup
        this.lastTime = performance.now();
        this.deltaTime = 0;
        this.isFirstFrame = true;

        // run simulation
        this.paused = false;
        this.renderer.setAnimationLoop(this.animate.bind(this));
    }
 
    simInit() { // initial sim logic wrapper
        throw new Error('init() must be implemented by subclass');
    }

    simDraw() { // frame simulation logic wrapper
        throw new Error('frame() must be implemented by subclass');
    }

    animate() { // animation loop
        // fps measuring logic
        this.frameCount++;
        const now = performance.now();
        this.deltaT = (now - this.lastTime) * 1e-3;
        this.lastTime = now;

        if (this.isFirstFrame) { // set base lines of first frame for scaling
            this.isFirstFrame = false;
            return;
        }

        this.simDraw(); // run sim draw logic

        // render scene
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }

    togglePause(paused = null) {
        if (typeof paused !== 'boolean') {
            paused = !this.paused;
        }
        
        this.paused = paused;

        if (!this.isStatic) {
            if (this.paused) { this.pauseBtn.pause(); }
            if (!this.paused) { this.pauseBtn.play(); }
        }
    }

    makeGraph() {
        // return graph div with correct styling
        let element = document.createElement('canvas');
        this.graphWrapper.append(element);
        element.classList.add('graph');
        return element;
    }
}
 