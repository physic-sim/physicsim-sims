import { ValueInput } from '../Input/ValueInput';
import { TwoDSimulation } from './TwoDSimulation';
import Chart from 'chart.js/auto';

export default class NuclearDecaySimulation extends TwoDSimulation {

    constructor(
        container,
        inputs,
        controls,
        attributes,
    ) {
        super(container, inputs, controls, attributes);
        console.log(container);
        // add inputs
        this.nInput = new ValueInput(
            this.inputWrapper,
            1000,
            'N<sub>0</sub>',
            "Number of Nuclei"
        )
        this.lambdaInput = new ValueInput(
            this.inputWrapper,
            0.5,
            'λ',
            '/s<sup>-1</sup> Decay Constant'
        )
        this.dtInput = new ValueInput(
            this.inputWrapper,
            '1',
            'dt',
            '/s Time Interval'
        )
    }

    init() {
        // initialise data and inputs
        this.n = this.nInput.get();
        this.n0 = this.n;
        this.lambda = this.lambdaInput.get();
        this.dt = this.dtInput.get();
        this.t = 0;

        // clear current chart if present
        if (this.chart) {
            this.chart.destroy();
        }

        this.chart = new Chart(
            this.container,
            {
                type: 'line',
                data: {
                    labels: [], // time data
                    datasets: [
                        {
                            label: 'Model',
                            data: [],
                            borderColor: '#a6bd6f',
                            backgroundColor: '#a6bd6f',
                            borderWidth: 1,
                            tension: 0.5, // smooth curve
                            pointRadius: 1,
                        },
                        {
                            label: 'Simulation',
                            data: [],
                            borderColor: '#6c46cc',
                            backgroundColor: '#6c46cc',
                            type: 'line',
                            borderWidth: 1,
                            tension: 0, // smooth curve
                            pointRadius: 1,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: false,
                    scales: {
                        x: {
                            type: 'linear',
                            stacked: true,
                            title: {
                                display: true,
                                text: 't/s',
                                font: { family: 'CMUSerifRoman', size: 14 },
                                color: "#efefef"
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
                                text: 'Number of Nuclei',
                                font: { family: 'CMUSerifRoman', size: 14 },
                                color: "#efefef"
                            },
                        },
                    },
                    plugins: {
                        /*
                        title: {
                            display: true,
                            text: 'Nuclear Decay',
                            font: { family: 'CMUSerifRoman', size: 16 },
                            color: '#fff',
                        },
                        */
                        decimation: {
                            enabled: true,
                            algorithm: 'min-max',
                            samples: 25,
                        },
                        legend: { display: true },
                    },
                    layout: { padding: { right: 20 } },
                    backgroundColor: '#e1e1e1',
                    color: '#fff',
                },
            }
        )


        this.step();
        setInterval(() => {
            this.step();
        }, (this.dt * 1e3));
    }

    step() { // step forward in simulation every dt

        if (this.paused) {
            return;
        }

        this.chart.data.datasets[0].data.push(this.n0 * Math.pow(Math.E, -this.lambda * this.t))
        this.chart.data.datasets[1].data.push(this.n);
        this.chart.data.labels.push(this.t)
        this.chart.update();

        let p = 1 - Math.pow(Math.E, -this.lambda * this.dt); // probability a nulceus will have decayed in dt
        
        // generat random number deduct all that are less than p
        let nTemp = this.n
        for (let i = 0; i < this.n; i++) {
            let ran = Math.random();
            if (ran <= p) {
                nTemp--;
            }
        }

        this.t += this.dt;
        this.n = nTemp;
    }

}