import { ThreeDSimulation } from './ThreeDSimulation';
import { ValueInput } from '../Input/ValueInput';
import { VectorInput } from '../Input/VectorInput';
import { SliderInput } from '../Input/SliderInput';
import Chart from 'chart.js/auto';
import p5 from 'p5';

export default class ProjectileSimulation extends ThreeDSimulation {
    e = 1;
    G = 9.81;
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

    init(p) {
        this.paused = false;

        // init data
        this.data.t = [];
        this.data.s = [];
        this.data.v = [];
        this.data.a = [];
        this.start = p.millis();

        // get e input
        this.e = this.eInput.get();

        // get size input
        this.size = this.sizeInput.get();

        // init particle
        this.a = p.createVector(0, this.G, 0);
        this.particle = new Particle(
            Math.abs(this.mass.get()),
            this.s.get(),
            this.u.get(),
            p.createVector(0, this.G, 0),
        );
    }

    frame(p) {
        if (this.rotateControl) {
            p.orbitControl();
        }
        p.perspective(0.4, this.width / this.height, 10, 500000);
        p.ambientLight(150);

        // draw floor
        p.push();
        p.noStroke();
        p.translate(0, 2, 0);
        p.fill(255, 200, 200, 100);
        p.pop();

        for (let i = 0 - this.size; i <= this.size; i += 20) {
            p.push();
            p.stroke(255, 255, 255, 75);
            p.line(i, 0, -this.size, i, 0, this.size);
            p.line(-this.size, 0, i, this.size, 0, i);
            p.pop();
        }

        // update particle based on playing state
        if (!this.paused) {
            this.particle.update(p, this.e);
        }

        this.particle.show(p);

        // pause simulation when particle's y velocity is 0 or falls outside of sim size
        if (this.particle.vel.y == 0) {
            this.pause = true;
        }

        if (
            this.particle.pos.x < -this.size ||
            this.particle.pos.x > this.size
        ) {
            this.paused = true;
        }

        if (
            this.particle.pos.z < -this.size ||
            this.particle.pos.z > this.size
        ) {
            this.paused = true;
        }

        // add data
        let t = (p.millis() - this.start) * 0.001;

        // keep data to 100 readings
        if (this.data.t.length > 200) {
            this.data.t.shift();
            this.data.s.shift();
            this.data.v.shift();
            this.data.a.shift();
        }

        this.data.t.push(t);
        this.data.s.push(this.particle.pos.y * -1);
        this.data.v.push(this.particle.vel.y * -1);
        this.data.a.push(this.particle.a.y * -1);

        if (this.selected == 'graphs') {
            this.graph();
        }

        this.updateAttributes();
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
            s (x) = ${this.particle.pos.x.toFixed(2)} m <br>
			v (x) = ${this.particle.vel.x.toFixed(2)} m/s <br>
			a (x) = ${this.particle.a.x.toFixed(2)} m/s² <br> <br>
            s (y) = ${this.particle.pos.z.toFixed(2)} m <br>
			v (y) = ${this.particle.vel.z.toFixed(2)} m/s <br>
			a (y) = ${this.particle.a.z.toFixed(2)} m/s² <br> <br>
			s (z) = ${-this.particle.pos.y.toFixed(2)} m <br>
			v (z) = ${-this.particle.vel.y.toFixed(2)} m/s <br>
			a (z) = ${-this.particle.a.y.toFixed(2)} m/s² <br>
	  	`;
    }
}

class Particle {
    constructor(mass, position, u, a) {
        this.mass = mass;
        this.pos = position;
        this.vel = u;
        this.a = a;
        this.r = Math.sqrt(mass) * 4;

        // define particle colour
        this.colourR = 166;
        this.colourG = 189;
        this.colourB = 111;
    }

    update(p, e) {
        // massless objects don't experience gravity
        if (this.mass == 0) {
            return;
        }

        // compute new position
        let uT = p5.Vector.mult(this.vel, 1 / p.getTargetFrameRate());
        let aTSquared = p5.Vector.mult(
            this.a,
            0.5 * Math.pow(1 / p.getTargetFrameRate(), 2),
        );
        let S = p5.Vector.add(uT, aTSquared);
        this.pos.add(S);

        // compute new velocity
        let Adt = p5.Vector.mult(this.a, 1 / p.getTargetFrameRate());
        this.vel.add(Adt);

        if (this.pos.y > 0) {
            // calculate velocity when this.pos.y == 0
            let velAt0 = Math.sqrt(
                Math.pow(this.vel.y, 2) - 2 * this.a.y * this.pos.y,
            );
            // prevent ball from going through ground
            this.pos.y = 0;
            this.vel.y = -velAt0 * e;
        }
    }

    show(p) {
        // draw sphere
        p.push();
        p.translate(this.pos);
        p.noStroke();
        p.fill(this.colourR, this.colourG, this.colourB);
        p.sphere(this.r, 24, 24);
        p.pop();

        // draw velocity arrow
        p.push();
        p.translate(this.pos);
        p.stroke(200, 200, 0);
        p.strokeWeight(1.5);
        p.line(0, 0, 0, this.vel.x, this.vel.y, this.vel.z);
        p.pop();

        p.push();
        p.translate(p5.Vector.add(this.pos, this.vel));
        // rotate cone to be in line with the velocity line
        let n = p5.Vector.normalize(this.vel);

        let xAxis = p.createVector(1, 0, 0);
        let zAxis = p.createVector(0, 0, -1);
        let rotationAxisZ = zAxis.cross(n);
        let angleZ = p.acos(zAxis.dot(n));

        // apply the rotation
        if (rotationAxisZ.mag() > 0) {
            p.rotate(angleZ, rotationAxisZ);
            p.rotate(-p.PI / 2, xAxis);
        }

        p.fill(200, 200, 0);
        p.noStroke();
        p.cone(2, 4, 128, 1, true);
    }
}
