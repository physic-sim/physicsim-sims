import { ResetButton } from "../Controls/ResetButton";
import { PauseButton } from "../Controls/PauseButton";

export class Simulation {

	rotateControl = true;

	constructor(container, inputs, graphs, controls, attributes) {
		// add containers and pause functionality
		this.paused = false;
		this.container = container;
		this.inputWrapper = inputs;
		this.graphWrapper = graphs;
		this.controlWrapper = controls;
		this.attributeWrapper = attributes;
		this.selected = 'graphs';
	}

	setup(p, stopLoading) {
		stopLoading();
		p.frameRate(30)
		// make canvas
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.canvas = p.createCanvas(this.width, this.height, p.WEBGL, this.container);

		this.paused = false;

		// add basic controls
		this.controlWrapper.innerHTML = '';
		this.runBtn = new ResetButton(this.controlWrapper, (() => (this.setup(p))).bind(this));
		this.pauseBtn = new PauseButton(this.controlWrapper, this.togglePause.bind(this))

		this.init(p)
	}

	init(p) {
		// initial simulation logic
		throw new Error('init() must be implemented by subclass')
	}

	draw(p) {
		p.background(0);
		this.frame(p);
	}

	frame(p) {
		// frame simulation logic
		throw new Error('frame() must be implemented by subclass')
	}

	togglePause() {
		this.paused = !this.paused;
	}

	handleResize(p) {
		// resize sketch based on window change
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		p.resizeCanvas(this.width, this.height)
	}

	makeGraph() {
		// return graph div with correct styling
		let element = document.createElement('canvas');
		this.graphWrapper.append(element);
		element.classList.add('graph');
		return element;
	}
}