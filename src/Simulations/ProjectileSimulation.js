import { ThreeJsSimulation } from './ThreeJsSimulation';
import { ValueInput } from '../Input/ValueInput';
import { VectorInput } from '../Input/VectorInput';
import { SliderInput } from '../Input/SliderInput';
import Chart from 'chart.js/auto';
import * as THREE from 'three';

export default class ProjectileSimulation extends ThreeJsSimulation {
    // simulation constants
    e = 1;
    G = -9.81;
    size = 250;

    constructor(container, inputs, graphs, controls, attributes) {
        super(container, inputs, graphs, controls, attributes);

        // add inputs
        this.mass = new ValueInput(this.inputWrapper, 2, 'mass', 'kg');

        this.u = new VectorInput(this.inputWrapper, 0, 0, 10, 'u', 'm/s');

        this.s = new VectorInput(this.inputWrapper, 0, 0, 20, 's', 'm');

        this.eInput = new SliderInput(
            this.inputWrapper,
            1,
            0,
            1,
            0.01,
            'Coeffecient of Resitution',
            '',
        );

        this.sizeInput = new SliderInput(
            this.inputWrapper,
            this.size,
            10,
            500,
            1,
            'Simulation Size',
            'm',
        );

        // init data and graphs
        this.data = {};
        this.sGraph = this.makeGraph();
        this.vGraph = this.makeGraph();
        this.aGraph = this.makeGraph();
        this.sChart = this.initChart(
            this.sGraph,
            'Displacement-Time (z-direction)',
            's (m)',
        );
        this.vChart = this.initChart(
            this.vGraph,
            'Velocity-Time (z-direction)',
            'v (m/s)',
        );
        this.aChart = this.initChart(
            this.aGraph,
            'Acceleration-Time (z-direction)',
            'a (m/s²)',
        );
    }

    simInit() {
        this.paused = false;

        // init data
        this.data.t = [];
        this.data.s = [];
        this.data.v = [];
        this.data.a = [];
        this.start = performance.now();
        this.pauseStart = 0;
        this.cumulativePause = 0;

        // get e input
        this.e = this.eInput.get();

        // get size input
        this.size = this.sizeInput.get();

        // init particle
        this.a = new THREE.Vector3(0, this.G, 0);
        this.particle = new Particle(
            Math.abs(this.mass.get()),
            this.s.get(),
            this.u.get(),
            this.a,
            0x9c6270,
            this.scene
        );

        // add axis geometry
        const xPoints = [];
        xPoints.push(new THREE.Vector3(-this.size, 0, 0));
        xPoints.push(new THREE.Vector3(this.size, 0, 0));
        const xAxisGeometry = new THREE.BufferGeometry().setFromPoints(xPoints);
        
        const yPoints = [];
        yPoints.push(new THREE.Vector3(0, -this.size, 0));
        yPoints.push(new THREE.Vector3(0, this.size, 0));
        const yAxisGeometry = new THREE.BufferGeometry().setFromPoints(yPoints);
        
        const zPoints = [];
        zPoints.push(new THREE.Vector3(0, 0, -this.size));
        zPoints.push(new THREE.Vector3(0, 0, this.size));
        const zAxisGeometry = new THREE.BufferGeometry().setFromPoints(zPoints);
        
        const axisMaterial = new THREE.LineBasicMaterial({
            color: 0xdddddd,
            transparent: true,
            opacity: 0.2,
        })

        const xAxis = new THREE.Line(xAxisGeometry, axisMaterial);
        const yAxis = new THREE.Line(yAxisGeometry, axisMaterial);
        const zAxis = new THREE.Line(zAxisGeometry, axisMaterial);
        this.scene.add(xAxis);
        this.scene.add(yAxis);
        this.scene.add(zAxis);

        // calibrate camera        
        this.camera.position.set(this.size, this.size, this.size);
        this.controls.target.set(0, 0, 0);
        this.controls.update();
    }

    simDraw() {
        // update particle based on playing state
        if (!this.paused) {
            this.particle.update(this.e, this.deltaT);
        }

        this.particle.show();

        // pause simulation when particle's y velocity is 0 or falls outside of sim size
        if (this.particle.vel.y == 0) {
            this.togglePause(true);
        }

        if (
            this.particle.pos.x < -this.size ||
            this.particle.pos.x > this.size
        ) {
            this.togglePause(true);
        }

        if (
            this.particle.pos.z < -this.size ||
            this.particle.pos.z > this.size
        ) {
            this.togglePause(true);
        }

        // add data
        let t = (performance.now() - this.start - this.cumulativePause) * 1e-3;

        // keep data to 200 readings
        if (this.data.t.length > 250) {
            this.data.t.shift();
            this.data.s.shift();
            this.data.v.shift();
            this.data.a.shift();
        }

        if (!this.paused) {
            this.data.t.push(t);
            this.data.s.push(this.particle.pos.y);
            this.data.v.push(this.particle.vel.y);
            this.data.a.push(this.particle.a.y);
        }


        this.graph();

        this.updateAttributes();
    }

    graph() {
        if (this.selected == 'graphs') {
            // update datasets
            this.updateChart(this.sChart, this.data.t, this.data.s);
            this.updateChart(this.vChart, this.data.t, this.data.v);
            this.updateChart(this.aChart, this.data.t, this.data.a);
        }
    }

    initChart(canvas, title, yLabel) {
        return new Chart(canvas, {
            type: 'line',
            data: {
                labels: [], // time data
                datasets: [
                    {
                        label: title,
                        data: [], // displacement, velocity, or acceleration data
                        borderColor: '#6c46cc',
                        borderWidth: 1,
                        tension: 0.5, // smooth curve
                        pointRadius: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                animation: false,
                scales: {
                    x: {
                        type: 'linear',
                        title: {
                            display: true,
                            text: 't/s',
                            font: { family: 'CMUSerifRoman', size: 14 },
                        },
                        ticks: {
                            callback: function (value, index, ticks) {
                                // Format x-axis tick values to 2 decimal places
                                return value.toFixed(2);
                            },
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: yLabel,
                            font: { family: 'CMUSerifRoman', size: 14 },
                        },
                    },
                },
                plugins: {
                    title: {
                        display: true,
                        text: title,
                        font: { family: 'CMUSerifRoman', size: 16 },
                        color: '#fff',
                    },
                    decimation: {
                        enabled: true,
                        algorithm: 'min-max',
                        samples: 25,
                    },
                    legend: { display: false },
                },
                layout: { padding: { right: 0 } },
                backgroundColor: '#1e1e1e',
                color: '#fff',
            },
        });
    }

    updateChart(chart, labels, data) {
        chart.data.labels = labels;
        chart.data.datasets[0].data = data;
        chart.update();
    }

    updateAttributes() {
        this.attributeWrapper.innerHTML = `
            s<sub>x</sub> = ${this.particle.pos.x.toFixed(2)} m <br>
			v<sub>x</sub> = ${this.particle.vel.x.toFixed(2)} m/s <br>
			a<sub>x</sub> = ${this.particle.a.x.toFixed(2)} m/s² <br> <br>
            s<sub>y</sub> = ${this.particle.pos.z.toFixed(2)} m <br>
			v<sub>y</sub> = ${this.particle.vel.z.toFixed(2)} m/s <br>
			a<sub>y</sub> = ${this.particle.a.z.toFixed(2)} m/s² <br> <br>
			s<sub>z</sub> = ${this.particle.pos.y.toFixed(2)} m <br>
			v<sub>z</sub> = ${this.particle.vel.y.toFixed(2)} m/s <br>
			a<sub>z</sub> = ${this.particle.a.y.toFixed(2)} m/s² <br>
	  	`;
    }

    togglePause(paused = null) {
        super.togglePause(paused)

        if (this.paused) {
            this.pauseStart = performance.now();
        } else {
            this.cumulativePause += (performance.now() - this.pauseStart);
        }
    }
}

class Particle {
    constructor(mass, position, u, a, colour, scene) {
        this.mass = mass;
        this.pos = position;
        this.vel = u;
        this.a = a;
        this.r = Math.sqrt(mass) * 4;
        this.colour = colour;
        this.scene = scene;

        // initialise geometry
        const particleGeometry = new THREE.SphereGeometry(this.r, 16, 16);
        const particleMaterial = new THREE.MeshBasicMaterial({ 
            color: this.colour, 
            transparent: true, 
            opacity: 0.75 
        });
        this.particleMesh = new THREE.Mesh(particleGeometry, particleMaterial);
        this.scene.add(this.particleMesh); 

        // initialise arrow
        this.arrow = new THREE.ArrowHelper(
            this.vel.clone().normalize(), 
            this.pos,
            this.vel.length(), 
            0xaacadb,
        );
        this.scene.add(this.arrow);
    }

    update(e, deltaT) {
        // massless objects don't experience gravity
        if (this.mass == 0) {
            return;
        }

        // compute new position
        let uT = this.vel.clone().multiplyScalar(deltaT);
        let aTSquared = this.a.clone().multiplyScalar(
            0.5 * Math.pow(deltaT, 2),
        );
        let S = aTSquared.clone().add(uT);
        this.pos.add(S);

        // compute new velocity
        let Adt = this.a.clone().multiplyScalar(deltaT);
        this.vel.add(Adt);

        if (this.pos.y < 0) {
            // calculate velocity when this.pos.y == 0
            let velAt0 = Math.sqrt(
                Math.pow(this.vel.y, 2) - 2 * this.a.y * this.pos.y,
            );
            // prevent ball from going through ground
            this.pos.y = 0;
            this.vel.y = velAt0 * e;
        }
    }

    show() {
        // update position
        this.particleMesh.position.copy(this.pos);

        // update arrow
        this.arrow.position.copy(this.pos);
        this.arrow.setDirection(this.vel.clone().normalize());
        this.arrow.setLength(this.vel.length());
    }
}
