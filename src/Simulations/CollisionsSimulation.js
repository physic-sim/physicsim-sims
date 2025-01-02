import { Simulation } from './Simulation';
import { ValueInput } from '../Input/ValueInput';
import { VectorInput } from '../Input/VectorInput';
import { SliderInput } from '../Input/SliderInput';
import { Button } from '../Controls/Button';
import Chart from 'chart.js/auto';
import p5 from 'p5';

export default class CollisionsSimulation extends Simulation {
    size = 10;
    e = 1;
    sf = 10;

    constructor(container, inputs, graphs, controls, attributes) {
        super(container, inputs, graphs, controls, attributes);

        // add inputs
        this.massA = new ValueInput(this.inputWrapper, 0.5, 'mass of A', 'kg');
        this.massB = new ValueInput(this.inputWrapper, 1, 'mass of B', 'kg');

        this.velA = new VectorInput(
            this.inputWrapper,
            2.5,
            0,
            0,
            'v<sub>A</sub>',
            'm/s',
        );
        this.velB = new VectorInput(
            this.inputWrapper,
            -2.5,
            0,
            0,
            'v<sub>B</sub>',
            'm/s',
        );

        this.posA = new VectorInput(
            this.inputWrapper,
            -20,
            0,
            0,
            's<sub>A</sub>',
            'm',
        );
        this.posB = new VectorInput(
            this.inputWrapper,
            20,
            0,
            0,
            's<sub>B</sub>',
            'm',
        );

        this.sizeInput = new SliderInput(
            this.inputWrapper,
            this.size,
            5,
            100,
            1,
            'Simulation Size',
            'm',
        );
        this.eInput = new SliderInput(
            this.inputWrapper,
            1,
            0,
            1,
            0.01,
            'Coeffecient of Resitution',
            '',
        );

        // init data and graphs
        this.data = {};
        this.xGraph = this.makeGraph();
        this.yGraph = this.makeGraph();
        this.zGraph = this.makeGraph();
        this.xChart = this.initChart(
            this.xGraph,
            'Momentum (x) in System',
            'kg/ms⁻¹',
        );
        this.yChart = this.initChart(
            this.yGraph,
            'Momentum (y) in System',
            'kg/ms⁻¹',
        );
        this.zChart = this.initChart(
            this.zGraph,
            'Momentum (z) in System',
            'kg/ms⁻¹',
        );
    }

    init(p) {
        // add custom btns
        this.downloadBtn = new Button(
            this.controlWrapper,
            this.download.bind(this),
            'Data',
        );

        // init data
        this.data.particles = [];
        this.data.x = [];
        this.data.y = [];
        this.data.z = [];
        this.start = p.millis();

        // get e input
        this.e = this.eInput.get();

        // get size input
        this.size = this.sizeInput.get() * this.sf;

        // init particles
        this.particleA = new Particle(
            Math.abs(this.massA.get()),
            this.posA.get(),
            this.velA.get(),
            166,
            189,
            111,
        );
        this.particleB = new Particle(
            Math.abs(this.massB.get()),
            this.posB.get(),
            this.velB.get(),
            156,
            98,
            112,
        );
    }

    frame(p) {
        p.ambientLight(200);

        p.background(0);

        if (this.rotateControl) {
            p.orbitControl();
        }
        p.perspective(0.4, this.width / this.height, 10, 500000);

        p.push();
        p.stroke(255, 255, 255, 75);
        p.line(-this.size, 0, 0, this.size, 0, 0);
        p.line(0, -this.size, 0, 0, this.size, 0);
        p.line(0, 0, -this.size, 0, 0, this.size);
        p.pop();

        // update particles based on playing state
        if (!this.paused) {
            this.particleA.collide(this.particleB, this.e);

            this.particleA.update(p, this.sf);
            this.particleB.update(p, this.sf);

            this.particleA.edges(this.size);
            this.particleB.edges(this.size);
        }

        this.particleA.show(p);
        this.particleB.show(p);

        // end simulation when velocity < 0.001
        if (
            this.particleA.velocity.mag().toFixed(2) == 0 &&
            this.particleB.velocity.mag().toFixed(2) == 0
        ) {
            this.paused = true;
        }

        // add data
        this.data.particles = ['A', 'B', 'Total'];
        this.data.x[0] = this.particleA.velocity.x * this.particleA.mass;
        this.data.x[1] = this.particleB.velocity.x * this.particleB.mass;
        this.data.x[2] = this.data.x[0] + this.data.x[1];

        this.data.y[0] = this.particleA.velocity.z * -1 * this.particleA.mass;
        this.data.y[1] = this.particleB.velocity.z * -1 * this.particleB.mass;
        this.data.y[2] = this.data.y[0] + this.data.y[1];

        this.data.z[0] = this.particleA.velocity.y * this.particleA.mass;
        this.data.z[1] = this.particleB.velocity.y * this.particleB.mass;
        this.data.z[2] = this.data.z[0] + this.data.z[1];

        if (this.selected == 'graphs') {
            this.graph();
        }

        this.updateAttributes();
    }

    graph() {
        if (this.paused) return;

        // update datasets
        this.updateChart(this.xChart, this.data.particles, this.data.x);
        this.updateChart(this.yChart, this.data.particles, this.data.y);
        this.updateChart(this.zChart, this.data.particles, this.data.z);
    }

    initChart(canvas, title, yLabel) {
        return new Chart(canvas, {
            type: 'bar',
            data: {
                labels: [], // time data
                datasets: [
                    {
                        label: title,
                        data: [],
                        borderColor: '#6c46cc',
                        borderWidth: 1,
                        backgroundColor: '#6c46cc',
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                animation: false,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Particle',
                            font: { family: 'CMUSerifRoman', size: 14 },
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

    download() {
        let collisions = this.particleA.collisions;
        let headers =
            'pax, pbx, pay, pby, paz, pbz, pax\', pbx\', pay\', pby\', paz\', pbz\'\n';
        let strData = collisions.map((row) => row.join(',')).join('\n');
        let csvData = headers.concat(strData);
        let blob = new Blob([csvData], { type: 'text/csv' });
        let url = window.URL.createObjectURL(blob);

        let a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', 'data.csv');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    updateAttributes() {
        this.attributeWrapper.innerHTML = `
			v[a] (x) = ${this.particleA.velocity.x.toFixed(2)} m/s <br>
			v[a] (y) = ${this.particleA.velocity.z.toFixed(2)} m/s <br>
			v[a] (z) = ${-this.particleA.velocity.y.toFixed(2)} m/s <br>
			v[b] (x) = ${this.particleB.velocity.x.toFixed(2)} m/s <br>
			v[b] (y) = ${this.particleB.velocity.z.toFixed(2)} m/s <br>
			v[b] (z) = ${-this.particleB.velocity.y.toFixed(2)} m/s <br>
	  	`;
    }
}

class Particle {
    constructor(mass, pos, vel, r, g, b) {
        this.position = pos;
        this.velocity = vel;
        this.acceleration = new p5.Vector(0, 0, 0);
        this.mass = mass;
        this.r = Math.sqrt(this.mass) * 10;
        this.colR = r;
        this.colG = g;
        this.colB = b;
        this.collisions = [];
    }

    collide(p, e) {
        // check if collision is to occur
        if (p5.Vector.dist(this.position, p.position) <= this.r + p.r) {
            // collision will occur
            let m1 = this.mass;
            let m2 = p.mass;

            let v1 = this.velocity;
            let v2 = p.velocity;

            // delcare vectors normal and tangental to line of collision
            let n = p5.Vector.sub(p.position, this.position).normalize();

            // resolve velocities in n
            let v1n = p5.Vector.dot(v1, n);
            let v2n = p5.Vector.dot(v2, n);

            let v1nv = p5.Vector.mult(n, v1n);
            let v2nv = p5.Vector.mult(n, v2n);

            // subtract original normal velocities
            let v1p = p5.Vector.sub(v1, v1nv);
            let v2p = p5.Vector.sub(v2, v2nv);

            // computer velocities after
            let v1np =
                (m1 * v1n - m2 * e * v1n + m2 * v2n + m2 * e * v2n) / (m1 + m2);
            let v2np =
                (m2 * v2n - m1 * e * v2n + m1 * v1n + m1 * e * v1n) / (m1 + m2);

            // add new normal velocities
            let v1npv = p5.Vector.mult(n, v1np);
            let v2npv = p5.Vector.mult(n, v2np);

            v1p.add(v1npv);
            v2p.add(v2npv);

            this.velocity = v1p;
            p.velocity = v2p;
        }
    }

    update(p, sf) {
        this.velocity.add(this.acceleration);
        this.position.add(
            p5.Vector.mult(this.velocity, (1 / p.getTargetFrameRate()) * sf),
        );
        this.acceleration.mult(0);
    }

    edges(size) {
        if (this.position.x > size) {
            this.velocity.x *= -1;
            this.position.x = size;
        } else if (this.position.x < -size) {
            this.velocity.x *= -1;
            this.position.x = -size;
        }

        if (this.position.y > size) {
            this.velocity.y *= -1;
            this.position.y = size;
        } else if (this.position.y < -size) {
            this.velocity.y *= -1;
            this.position.y = -size;
        }

        if (this.position.z > size) {
            this.velocity.z *= -1;
            this.position.z = size;
        } else if (this.position.z < -size) {
            this.velocity.z *= -1;
            this.position.z = -size;
        }
    }

    show(p) {
        p.push();
        p.strokeWeight(0.5);
        p.fill(this.colR, this.colG, this.colB);
        p.translate(this.position.x, this.position.y, this.position.z);
        p.noStroke();
        p.sphere(this.r, 24, 24);
        p.pop();
    }
}
