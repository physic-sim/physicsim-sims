import { Simulation } from './Simulation';
import { ValueInput } from '../Input/ValueInput';
import { Button } from '../Controls/Button';
import Chart from 'chart.js/auto';
import p5 from 'p5';

export default class CircularMotionSimulation extends Simulation {
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

    init(p) {
        // add custom btns
        this.toggleFrameRefBtn = new Button(
            this.controlWrapper,
            (() => this.toggleFrameRef(p)).bind(this),
            'Frame Ref.',
        );

        // init data
        this.data.t = [];
        this.data.s = [];
        this.data.v = [];
        this.data.a = [];
        this.start = p.millis();

        // init position
        this.r = Math.abs(this.rInput.get() * this.sf);
        this.mass = Math.abs(this.massInput.get());
        if (this.angularPref) {
            this.v = new p5.Vector(0, 0, this.omegaInput.get() * this.r);
            this.vInput.set((this.v.z / this.sf).toFixed(2));
        } else {
            this.v = new p5.Vector(0, 0, this.vInput.get() * this.sf);
            this.omegaInput.set((this.v.z / this.r).toFixed(2));
        }
        this.c = p.createVector(0, 0, 0);
        this.pos = p.createVector(this.c.x + this.r, 0, 0);
    }

    frame(p) {
        p.ambientLight(200);

        // frame of reference control
        if (this.rotationalRef) {
            this.cam = p.createCamera();
            p.push();
            this.cam.setPosition(this.c.x, this.c.y + 500, this.c.z);
            this.cam.lookAt(this.pos.x, this.pos.y, this.pos.z);
            this.cam.ortho();
            p.pop();
        } else if (this.rotationalRef == false && this.rotateControl) {
            p.perspective(0.4, this.width / this.height, 10, 500000);
            let options = {
                disableTouchActions: false,
                freeRotation: false,
            };
            p.orbitControl(1, 1, 1, options);
        }

        // draw centre
        p.push();
        p.translate(this.c);
        p.stroke(255, 255, 255, 100);
        p.line(-this.r, 0, 0, this.r, 0, 0);
        p.line(0, -10, 0, 0, 10, 0);
        p.line(0, 0, -this.r, 0, 0, this.r);
        p.pop();

        // split velocity into tangential and non-tangential
        let n = p5.Vector.sub(this.c, this.pos);
        n.normalize();

        let vn = p5.Vector.dot(this.v, n);
        let vnv = p5.Vector.mult(n, vn);
        let vpv = p5.Vector.sub(this.v, vnv);

        // calculate centripetal acceleration
        let a = Math.pow(vpv.mag(), 2) / this.r;
        let av = p5.Vector.mult(n, a);
        let avt = p5.Vector.mult(av, 1 / p.getTargetFrameRate());

        // draw arrows
        this.drawArrow(
            p,
            this.pos,
            p5.Vector.mult(av, this.mass / p.getTargetFrameRate()),
            3,
            2,
            [0, 255, 0],
        );
        this.drawArrow(
            p,
            this.pos,
            p5.Vector.mult(vpv, 1 / p.getTargetFrameRate()),
            3,
            10,
            [255, 0, 0],
        );
        this.drawArrow(
            p,
            this.c,
            p5.Vector.add(this.c, p.createVector(this.pos.x, 0, 0)),
            0,
            1,
            [108, 70, 204],
        );

        if (this.rotationalRef) {
            this.drawArrow(
                p,
                this.pos,
                p5.Vector.mult(av, (-1 * this.mass) / p.getTargetFrameRate()),
                3,
                2,
                [0, 255, 0],
            );
        }

        // draw mass
        p.push();
        p.fill(166, 189, 111);
        p.translate(this.pos);
        p.noStroke();
        p.sphere(Math.sqrt(this.mass) * 2, 24, 24);
        p.pop();

        // update position and velocity vectors
        if (!this.paused) {
            this.v.add(avt);
            let vt = p5.Vector.mult(this.v, 1 / p.getTargetFrameRate());
            this.pos.add(vt);
        }

        // update data
        let t = (p.millis() - this.start) * 0.001;

        // keep data to 100 readings
        if (this.data.t.length > 500) {
            this.data.t.shift();
            this.data.s.shift();
            this.data.v.shift();
            this.data.a.shift();
        }

        this.data.t.push(t);
        this.data.s.push(this.pos.x / this.sf);
        this.data.v.push(this.v.x / this.sf);
        this.data.a.push(av.x / this.sf);

        if (this.selected == 'graphs') {
            this.graph();
        }
    }

    drawArrow(p, base, vec, arrowSize, scale, colour) {
        p.push();
        p.translate(base.x, base.y, base.z);
        let dir = vec.copy().normalize();
        let len = vec.mag() * scale;

        // rotate the arrow
        let rotationAxis = p.createVector(0, 1, 0).cross(dir);
        let rotationAngle = p.acos(p.createVector(0, 1, 0).dot(dir));
        p.rotate(rotationAngle, rotationAxis);

        // draw the arrow shaft
        p.fill(colour[0], colour[1], colour[2]);
        p.stroke(colour[0], colour[1], colour[2]);
        p.strokeWeight(2);
        p.line(0, 0, 0, 0, len, 0);

        // draw the arrowhead
        p.translate(0, len, 0);
        p.noStroke();
        p.cone(arrowSize, arrowSize * 2);
        p.pop();
    }

    graph() {
        if (this.paused) return;

        // update datasets
        this.updateChart(this.sChart, this.data.t, this.data.s);
        this.updateChart(this.vChart, this.data.t, this.data.v);
        this.updateChart(this.aChart, this.data.t, this.data.a);
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

    toggleFrameRef(p) {
        this.rotationalRef = !this.rotationalRef;
        // reset camera
        if (!this.rotationalRef) {
            this.cam = p.createCamera();
            this.cam.lookAt(this.c.x, this.c.y, this.c.z);
        }
    }
}
