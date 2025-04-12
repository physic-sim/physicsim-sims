import { ThreeDSimulation } from './ThreeDSimulation';
import { ValueInput } from '../Input/ValueInput';
import Chart from 'chart.js/auto';
import p5 from 'p5';

export default class CyclotronSimulation extends ThreeDSimulation {
    historyLimit = 500;
    pauseStart;
    d = 10;
    timeScale = 1

    constructor(container, inputs, graphs, controls, attributes) {
        super(container, inputs, graphs, controls, attributes);

        // add inputs
        this.massInput = new ValueInput(
            this.inputWrapper,
            1.7,
            'Mass',
            'x10<sup>-27</sup>/kg',
        );
        this.chargeInput = new ValueInput(
            this.inputWrapper,
            1.6,
            'Charge',
            'x10<sup>-19</sup>/C',
        );
        this.magInput = new ValueInput(
            this.inputWrapper,
            1.2,
            'Magnetic Flux Density',
            'T',
        );
        this.pdInput = new ValueInput(
            this.inputWrapper,
            100,
            'Potential Difference',
            'V',
        );

        // init data and graphs
        this.data = {};
        this.vGraph = this.makeGraph();
        this.pdGraph = this.makeGraph();
        this.sGraph = this.makeGraph();
        this.vChart = this.initChart(this.vGraph, 'Speed-Time', 'v (m/s)');
        this.pdChart = this.initChart(
            this.pdGraph,
            'Potential-Difference-Time',
            'V (V)',
        );
        this.sChart = this.initChart(this.sGraph, 'Displacement(x)-Time', 'm');
    }

    init(p) {
        // load inputs & do scaling
        this.m = Math.abs(this.massInput.get());
        this.q = this.chargeInput.get();
        this.B = this.magInput.get();
        this.V = this.pdInput.get();

        // init data
        this.data.t = [];
        this.data.v = [];
        this.data.pd = [];
        this.data.s = [];
        this.start = p.millis();

        // init sim variables
        this.pos = p.createVector(-this.d/2, 0, 0);
        this.v = p.createVector(1e-5, 0, 0);
        this.history = [];
    }

    frame(p) {
        if (this.rotateControl) {
            p.orbitControl();
        }

        p.perspective(0.4, this.width / this.height, 10, 500000);

        p.background(0);

        let t = (p.millis() - this.start) / 1000 * this.timeScale; // simulation time
        let T = Math.abs((2 * Math.PI * this.m) / (this.q * this.B)); // cyclotron period
        let gapTime = T / 2; // half-period for electric field
        let n = Math.abs(Math.floor(t / gapTime)) + 1; // number of half-cycles
        let r = t % gapTime; // remainder

        if (!this.paused) {
            // calculate speed due to electric field interaction
            let v0 = this.getSpeed(n - 1);
            let v = this.getSpeed(n);
            let vP = this.getSpeed(n + 1);

            // for first transition
            let deltaV = v - v0;
            let tInE = Math.abs((this.d * this.m * deltaV) / (this.V * this.q));

            // for second transition
            let deltaVP = vP - v;
            let tInEP = Math.abs(
                (this.d * this.m * deltaVP) / (this.V * this.q),
            );

            let speed;

            if (r <= tInE / 2) {
                let sf = r / tInE + 0.5;
                speed = v0 + sf * deltaV;
            } else if (r >= gapTime - tInEP / 2) {
                let sf = (r - (gapTime - tInEP / 2)) / tInEP;
                speed = v + sf * deltaVP;
            } else {
                speed = v;
            }

            // update velocity magnitude
            this.v.setMag(speed);

            // magnetic force
            let b = p.createVector(0, this.B, 0);
            let perpendicular = p5.Vector.cross(this.v, b).normalize();
            let aMag = (speed * this.B * this.q) / this.m;
            let aVec = p5.Vector.mult(
                perpendicular,
                aMag / p.getTargetFrameRate(),
            );
            this.v.add(aVec);

            // update position
            this.pos.add(p5.Vector.mult(this.v, 1 / p.getTargetFrameRate()));

            // update history
            this.history.push(this.pos.copy());
            if (this.history.length > this.historyLimit) {
                this.history.shift();
            }
        }

        // draw history
        this.historyLimit = 20 * p.frameRate();
        p.stroke(200);
        p.strokeWeight(0.25);
        for (let i = 0; i < this.history.length - 3; i += 3) {
            p.push();
            p.line(
                this.history[i].x,
                this.history[i].y,
                this.history[i].z,
                this.history[i + 3].x,
                this.history[i + 3].y,
                this.history[i + 3].z,
            );
            p.pop();
        }

        // draw particle
        p.push();
        p.noStroke();

        if (this.q > 0) {
            p.fill('#a6bd6f');
        } else {
            p.fill('#9c6270');
        }

        p.translate(this.pos);
        p.sphere(1, 24, 24);
        p.pop();

        // add data
        let time = (p.millis() - this.start) * 0.001;

        // keep data to 100 readings
        if (this.data.t.length > 500) {
            this.data.t.shift();
            this.data.v.shift();
            this.data.pd.shift();
            this.data.s.shift();
        }
        if (!this.paused) {
            this.data.t.push(time * 1e-5);
            this.data.v.push(this.v.mag() * 1e5);
            let pd = this.V * p.cos(((2 * Math.PI) / T) * (time));
            this.data.pd.push(pd);
            this.data.s.push(this.pos.x * 1e-3);
        }

        if (this.selected == 'graphs') {
            this.graph();
        }

        this.updateAttributes();
    }

    togglePause(paused = null) {
        if (typeof paused !== Boolean) {
            paused = !this.paused;
        }

        this.paused = paused;

        if (this.paused) {
            this.pauseStart = Date.now();
        } else {
            this.start = this.start + (Date.now() - this.pauseStart);
        }
    }

    graph() {
        if (this.paused) return;

        // update datasets
        this.updateChart(this.vChart, this.data.t, this.data.v);
        this.updateChart(this.pdChart, this.data.t, this.data.pd);
        this.updateChart(this.sChart, this.data.t, this.data.s);
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
                                return value.toFixed(10);
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
			v = ${(this.v.mag()).toExponential(2)} m/s <br>
	  	`;
    }

    getSpeed(n) {
        return Math.sqrt(
            (2 * n * Math.abs(this.V) * Math.abs(this.q)) / this.m
        );
    }
}