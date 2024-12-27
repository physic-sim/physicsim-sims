import { Simulation } from "./Simulation";
import { ValueInput } from "../Input/ValueInput";
import Chart from 'chart.js/auto';
import p5 from "p5";

export default class CyclotronSimulation extends Simulation {

    historyLimit = 500;
    pauseStart;

    constructor(container, inputs, graphs, controls, attributes) {
        super(container, inputs, graphs, controls, attributes);

        // add inputs
        this.massInput = new ValueInput(this.inputWrapper, 1.7, 'Mass', 'x10<sup>-27</sup>/kg');
        this.chargeInput = new ValueInput(this.inputWrapper, 1.6, 'Charge', 'x10<sup>-19</sup>/kg')
        this.magInput = new ValueInput(this.inputWrapper, 1.2, 'Magnetic Flux Density', 'T');
        this.pdInput = new ValueInput(this.inputWrapper, 10000, 'Potential Difference', 'V');

        // init data and graphs
        this.data = {};
        this.vGraph = this.makeGraph();
        this.pdGraph = this.makeGraph();
        this.sGraph = this.makeGraph();
        this.vChart = this.initChart(
            this.vGraph,
            'Speed-Time',
            'v (m/s)',
        );
        this.pdChart = this.initChart(
            this.pdGraph,
            'Potential-Difference-Time',
            'V (V)',
        );
        this.sChart = this.initChart(
            this.sGraph,
            'Displacement(x)-Time',
            'm',
        )
    }

    init(p) {
        // load inputs & do scaling
        this.m = this.massInput.get();
        this.q = this.chargeInput.get();
        this.B = this.magInput.get();
        this.V = this.pdInput.get() / 100;

        // init data
        this.data.t = [];
        this.data.v = [];
        this.data.pd = [];
        this.data.s = [];
        this.start = p.millis();

        // init sim variables
        this.pos = p.createVector(0, 0, 0);
        this.v = p.createVector(1, 0, 0);
        this.history = [];
    }

    frame(p) {
        if (this.rotateControl) {
            p.orbitControl();
        }

        p.perspective(0.4, this.width / this.height, 10, 500000);

        p.background(0);
    
        let t = (p.millis() - this.start) / 1000; // simulation time
        let T = (2 * Math.PI * this.m) / (this.q * this.B); // cyclotron period
        let gapTime = T / 2; // half-period for electric field
        let n = Math.abs(Math.floor(t / gapTime)); // number of half-cycles

        // calculate speed due to electric field interaction
        let speed = 0;
        
        for (let i = 0; i < n+1; i++) {
            speed = Math.sqrt((Math.pow(speed, 2)) + Math.abs(2*this.q*this.V/this.m));
        }

        if (!this.paused) {
            // update velocity magnitude
            this.v.setMag(speed);

            // magnetic force
            let b = p.createVector(0, this.B, 0);
            let perpendicular = p5.Vector.cross(this.v, b).normalize();
            let aMag = speed * this.B * this.q / this.m;
            let aVec = p5.Vector.mult(perpendicular, aMag / p.frameRate());
            this.v.add(aVec);

            // update position
            this.pos.add(p5.Vector.mult(this.v, 1 / p.frameRate()));

            // update history
            this.history.push(this.pos.copy());
            if (this.history.length > this.historyLimit) {
                this.history.shift();
            }
        }

        // draw history
        this.historyLimit = 10 * p.frameRate();
        p.stroke(200);
        p.strokeWeight(0.25);
        for (let i = 0; i < this.history.length - 1; i++) {
            p.push();
            p.line(this.history[i].x, this.history[i].y, this.history[i].z, this.history[i+1].x, this.history[i+1].y, this.history[i+1].z)
            p.pop();
        }
        
        // draw particle
        p.push();
        p.noStroke();

        if (this.q > 0) {
            p.fill(0, 255, 0);
        } else {
            p.fill(255, 0, 0)
        }
        
        p.translate(this.pos);
        p.sphere(1, 24, 24)
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
            this.data.t.push(time * 1e-8);
            this.data.v.push(this.v.mag() * 1e5);
            let pd = this.V * 100 * p.cos(((2*Math.PI) / T) * (p.millis() - this.start) / 1000)
            this.data.pd.push(pd);
            this.data.s.push(this.pos.x * 1e-3)
        }


        if (this.selected == 'graphs') {
            this.graph();
        }

        this.updateAttributes();
    }

    togglePause() {
        this.paused = !this.paused;

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
			v = ${(this.v.mag().toFixed(0) * 1e5).toFixed(0)} m/s <br>
	  	`;
    }

}