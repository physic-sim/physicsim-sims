import { ThreeJsSimulation } from './ThreeJsSimulation';
import { ValueInput } from '../Input/ValueInput';
import { Button } from '../Controls/Button';
import Chart from 'chart.js/auto';
import * as THREE from 'three';

export default class CircularMotionSimulation extends ThreeJsSimulation {
    // simulation constants
    rotationalRef = false;
    angularPref = false;
    sf = 10;

    constructor(container, inputs, graphs, controls, attributes) {
        super(container, inputs, graphs, controls, attributes);

        // add inputs
        this.massInput = new ValueInput(this.inputWrapper, 5, 'Mass', 'kg');
        this.rInput = new ValueInput(this.inputWrapper, 20, 'Radius', 'm');

        let selector = document.createElement('div');
        selector.classList.add('input-selector-wrapper');

        let options = document.createElement('div');
        options.classList.add('input-selector-options');

        this.optionV = document.createElement('div');
        this.optionV.classList.add('input-selector-option');
        this.optionV.classList.add('input-selector-option--selected');
        this.optionV.innerHTML = 'Tangential';
        let onClickV = () => {
            this.toggleInputPref('tangential');
        };
        this.optionV.addEventListener('click', onClickV.bind(this));

        this.optionA = document.createElement('div');
        this.optionA.classList.add('input-selector-option');
        this.optionA.innerHTML = 'Angular';
        let onClickA = () => {
            this.toggleInputPref('angular');
        };
        this.optionA.addEventListener('click', onClickA.bind(this));

        options.append(this.optionV, this.optionA);

        this.wrapperV = document.createElement('div');
        this.vInput = new ValueInput(
            this.wrapperV,
            10,
            'Tangential Velocity',
            'ms<sup>-1</sup>',
        );
        this.wrapperA = document.createElement('div');
        this.omegaInput = new ValueInput(
            this.wrapperA,
            0,
            'Angular Velocity',
            'rads<sup>-1</sup>',
        );
        this.wrapperA.style.display = 'none';

        selector.append(options, this.wrapperV, this.wrapperA);

        this.inputWrapper.append(selector);

        // init data and graphs
        this.data = {};
        this.sGraph = this.makeGraph();
        this.vGraph = this.makeGraph();
        this.aGraph = this.makeGraph();
        this.sChart = this.initChart(
            this.sGraph,
            'Displacement-Time (x-direction)',
            'sₓ (m)',
        );
        this.vChart = this.initChart(
            this.vGraph,
            'Velocity-Time (x-direction)',
            'vₓ (m/s)',
        );
        this.aChart = this.initChart(
            this.aGraph,
            'Acceleration-Time (x-direction)',
            'aₓ (m/s²)',
        );
    }

    simInit() {
        // add custom btns
        this.toggleFrameRefBtn = new Button(
            this.controlWrapper,
            (() => this.toggleFrameRef()).bind(this),
            'switch_camera',
            "camera"
        );

        // init data
        this.data.t = [];
        this.data.s = [];
        this.data.v = [];
        this.data.a = [];
        this.start = performance.now();
        this.pauseStart = 0;
        this.cumulativePause = 0;

        // init position
        this.r = Math.abs(this.rInput.get() * this.sf);
        this.mass = Math.abs(this.massInput.get());
        if (this.angularPref) {
            this.v = new THREE.Vector3(0, 0, this.omegaInput.get() * this.r);
            this.vInput.set((this.v.z / this.sf).toFixed(2));
        } else {
            this.v = new THREE.Vector3(0, 0, this.vInput.get() * this.sf);
            this.omegaInput.set((this.v.z / this.r).toFixed(2));
        }
        this.c = new THREE.Vector3(0, 0, 0);
        this.pos = new THREE.Vector3(this.c.x + this.r, 0, 0);

        // initialise particle geometry
        const particleGeometry = new THREE.SphereGeometry(10 * Math.sqrt(this.mass), 16, 16);
        const particleMaterial = new THREE.MeshBasicMaterial({ 
            color: 0xa6bd6f, 
            transparent: true, 
            opacity: 0.75 
        });
        this.particleMesh = new THREE.Mesh(particleGeometry, particleMaterial);
        this.scene.add(this.particleMesh); 

        // add axis geometry
        const xPoints = [];
        xPoints.push(new THREE.Vector3(-this.r, 0, 0));
        xPoints.push(new THREE.Vector3(this.r, 0, 0));
        const xAxisGeometry = new THREE.BufferGeometry().setFromPoints(xPoints);
        
        const yPoints = [];
        yPoints.push(new THREE.Vector3(0, -this.r, 0));
        yPoints.push(new THREE.Vector3(0, this.r, 0));
        const yAxisGeometry = new THREE.BufferGeometry().setFromPoints(yPoints);
        
        const zPoints = [];
        zPoints.push(new THREE.Vector3(0, 0, -this.r));
        zPoints.push(new THREE.Vector3(0, 0, this.r));
        const zAxisGeometry = new THREE.BufferGeometry().setFromPoints(zPoints);
        
        const axisMaterial = new THREE.LineBasicMaterial({
            color: 0xdddddd,
            transparent: true,
            opacity: 0.5,
        })

        const xAxis = new THREE.Line(xAxisGeometry, axisMaterial);
        const yAxis = new THREE.Line(yAxisGeometry, axisMaterial);
        const zAxis = new THREE.Line(zAxisGeometry, axisMaterial);
        this.scene.add(xAxis);
        this.scene.add(yAxis);
        this.scene.add(zAxis)

        // initiate arrows
        this.displacementArrow = this.drawArrow(
            this.c,
            this.c.clone().add(new THREE.Vector3(this.pos.x, 0, 0)),
            this.r,
            0xa6bd6f,
        );
        this.velocityArrow = this.drawArrow(
            this.pos,
            new THREE.Vector3(0, 0, 0),
            0, 
            0x6c46cc,
        );
        this.accelerationArrow = this.drawArrow(
            this.pos,
            new THREE.Vector3(0, 0, 0),
            0, 
            0x9c6270,
        )
        this.centrifugalArrow = this.drawArrow(
            this.pos,
            new THREE.Vector3(0, 0, 0),
            0,
            0x9c6270
        )

        // calibrate camera        
        this.camera.position.set(this.r * 1.5, this.r * 1.5, this.r * 1.5);
        this.controls.target.set(0, 0, 0);
        this.controls.update();
    }

    simDraw() {
        // frame of reference control
        if (this.rotationalRef) {
            this.scene.add(this.centrifugalArrow)
            this.camera.position.set(this.c.x, this.c.y + 500, this.c.z);
            this.controls.target.set(this.pos.x, this.pos.y, this.pos.z);
            this.controls.update();
        } else {
            this.scene.remove(this.centrifugalArrow);
        }

        // split velocity into tangential and non-tangential
        let n = this.c.clone().sub(this.pos);
        n.normalize();
        let vn = this.v.dot(n);
        let vnv = n.clone().multiplyScalar(vn);
        let vpv = this.v.clone().sub(vnv);

        // calculate centripetal acceleration
        let a = Math.pow(vpv.length(), 2) / this.r;
        let av = n.clone().multiplyScalar(a);
        let avt = av.clone().multiplyScalar(this.deltaT);

        // update arrows  
        this.displacementArrow.position.copy(this.c);
        this.displacementArrow.setDirection(new THREE.Vector3(this.pos.x, 0, 0).normalize())
        this.displacementArrow.setLength(Math.abs(this.pos.x));

        this.velocityArrow.position.copy(this.pos);
        this.velocityArrow.setDirection(vpv.clone().multiplyScalar(this.deltaT).normalize());
        this.velocityArrow.setLength(this.v.length());

        this.accelerationArrow.position.copy(this.pos);
        this.accelerationArrow.setDirection(av.clone().multiplyScalar(this.mass * this.deltaT).normalize());
        this.accelerationArrow.setLength(Math.abs(a) * this.mass / 2)

        if (this.rotationalRef) {
            this.centrifugalArrow.position.copy(this.pos);
            this.centrifugalArrow.setDirection(av.clone().multiplyScalar((-1 * this.mass) * this.deltaT).normalize());
            this.centrifugalArrow.setLength(Math.abs(a) * this.mass / 2)
        }

        // update position and velocity vectors
        if (!this.paused) {
            this.v.add(avt);
            let vt = this.v.clone().multiplyScalar(this.deltaT);
            this.pos.add(vt);
            // update particle position
            this.particleMesh.position.copy(this.pos);

            // update data
            let t = (performance.now() - this.start - this.cumulativePause) * 1e-3;

            // keep data to 200 readings
            if (this.data.t.length > 250) {
                this.data.t.shift();
                this.data.s.shift();
                this.data.v.shift();
                this.data.a.shift();
            }
            this.data.t.push(t);
            this.data.s.push(this.pos.x / this.sf);
            this.data.v.push(this.v.x / this.sf);
            this.data.a.push(av.x / this.sf);
        }

        if (this.selected == 'graphs') {
            this.graph();
        }
    }

    drawArrow(base, vec, length, colour) {
        const arrow = new THREE.ArrowHelper(
            vec.clone().normalize(), 
            base,
            length, 
            colour,
        );
        this.scene.add(arrow);
        return arrow;
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
                                // format x-axis tick values to 2 decimal places
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

    toggleInputPref(setting) {
        if (setting == 'angular' && !this.angularPref) {
            this.angularPref = true;
            this.wrapperA.style.display = 'block';
            this.wrapperV.style.display = 'none';
            this.optionA.classList.add('input-selector-option--selected');
            this.optionV.classList.remove('input-selector-option--selected');
        } else if (setting == 'tangential' && this.angularPref) {
            this.angularPref = false;
            this.wrapperA.style.display = 'none';
            this.wrapperV.style.display = 'block';
            this.optionA.classList.remove('input-selector-option--selected');
            this.optionV.classList.add('input-selector-option--selected');
        }
    }

    toggleFrameRef() {
        this.rotationalRef = !this.rotationalRef;
        // reset camera
        if (!this.rotationalRef) {
            this.controls.target.set(this.c.x, this.c.y, this.c.z);
            this.camera.position.set(this.r * 1.5, this.r * 1.5, this.r * 1.5);
            this.controls.update();
        }
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