import { ThreeJsSimulation } from './ThreeJsSimulation';
import { ValueInput } from '../Input/ValueInput';
import { VectorInput } from '../Input/VectorInput';
import { SliderInput } from '../Input/SliderInput';
import { Button } from '../Controls/Button';
import Chart from 'chart.js/auto';
import * as THREE from 'three';


export default class CollisionsSimulation extends ThreeJsSimulation {
    // simulation constants
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
            'Coeffecient of Restitution Between Particles',
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

    simInit() {
        // add custom btns
        this.downloadBtn = new Button(
            this.controlWrapper,
            this.download.bind(this),
            'data_table',
            'data'
        );

        // init data
        this.data.particles = [];
        this.data.x = [];
        this.data.y = [];
        this.data.z = [];
        this.start = performance.now();

        // get e input
        this.e = this.eInput.get();

        // get size input
        this.size = this.sizeInput.get() * this.sf;

        // init particles
        this.particleA = new Particle(
            Math.abs(this.massA.get()),
            this.posA.get(),
            this.velA.get(),
            0xaacadb,
            this.scene
        );

        this.particleB = new Particle(
            Math.abs(this.massB.get()),
            this.posB.get(),
            this.velB.get(),
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
            color: 0xdddddd
        })

        const xAxis = new THREE.Line(xAxisGeometry, axisMaterial);
        const yAxis = new THREE.Line(yAxisGeometry, axisMaterial);
        const zAxis = new THREE.Line(zAxisGeometry, axisMaterial);
        this.scene.add(xAxis);
        this.scene.add(yAxis);
        this.scene.add(zAxis)

        // calibrate camera        
        this.camera.position.set(this.size * 1.5, this.size * 1.5, this.size * 1.5);
        this.controls.target.set(0, 0, 0);
        this.controls.update();
    }

    simDraw() {
        // update particles based on playing state
        if (!this.paused) {
            this.particleA.collide(this.particleB, this.e);

            this.particleA.update(this.sf, this.fps);
            this.particleB.update(this.sf, this.fps);

            this.particleA.edges(this.size);
            this.particleB.edges(this.size);
        }

        this.particleA.show();
        this.particleB.show();

        // end simulation when velocity < 0.001
        if (
            this.particleA.velocity.length().toFixed(2) == 0 &&
            this.particleB.velocity.length().toFixed(2) == 0
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
			v<sub>Ax</sub> = ${this.particleA.velocity.x.toFixed(2)} m/s <br>
			v<sub>Ay</sub> = ${this.particleA.velocity.z.toFixed(2)} m/s <br>
			v<sub>Az</sub> = ${-this.particleA.velocity.y.toFixed(2)} m/s <br>
			v<sub>Bx</sub> = ${this.particleB.velocity.x.toFixed(2)} m/s <br>
			v<sub>By</sub> = ${this.particleB.velocity.z.toFixed(2)} m/s <br>
			v<sub>Bz</sub> = ${-this.particleB.velocity.y.toFixed(2)} m/s <br>
	  	`;
    }
}

class Particle {
    constructor(mass, pos, vel, colour, scene) {
        this.position = pos;
        this.velocity = vel;
        this.acceleration = new THREE.Vector3(0, 0, 0);
        this.mass = mass;
        this.r = Math.sqrt(this.mass) * 10;
        this.colour = colour;
        this.scene = scene;
        this.collisions = [];

        // initialise geometry
        const particleGeometry = new THREE.SphereGeometry(this.r, 16, 16);
        const particleMaterial = new THREE.MeshBasicMaterial({ color: this.colour });
        this.particleMesh = new THREE.Mesh(particleGeometry, particleMaterial);
        this.scene.add(this.particleMesh); 
    }

    collide(p, e) {
        // check if collision is to occur
        if (this.position.distanceTo(p.position) <= this.r + p.r) {
            // collision will occur
            let m1 = this.mass;
            let m2 = p.mass;

            let v1 = this.velocity.clone();
            let v2 = p.velocity.clone();

            // delcare vectors normal and tangental to line of collision
            let n = p.position.clone().sub(this.position).normalize();

            const distance = this.position.distanceTo(p.position);
            const overlap = (this.r + p.r) - distance;
            if (overlap > 0) {
                const separation = n.clone().multiplyScalar(overlap * 0.5);
                this.position.sub(separation);
                p.position.add(separation);
            }

            // resolve velocities in n
            let v1n = v1.dot(n);
            let v2n = v2.dot(n);

            let v1nv = n.clone().multiplyScalar(v1n);
            let v2nv = n.clone().multiplyScalar(v2n);

            // subtract original normal velocities
            let v1p = v1.clone().sub(v1nv);
            let v2p = v2.clone().sub(v2nv);

            // compute velocities after
            let v1np =
                (m1 * v1n - m2 * e * v1n + m2 * v2n + m2 * e * v2n) / (m1 + m2);
            let v2np =
                (m2 * v2n - m1 * e * v2n + m1 * v1n + m1 * e * v1n) / (m1 + m2);

            // add new normal velocities
            let v1npv = n.clone().multiplyScalar(v1np);
            let v2npv = n.clone().multiplyScalar(v2np);

            v1p.add(v1npv);
            v2p.add(v2npv);

            this.velocity = v1p;
            p.velocity = v2p;

            // log collisions
            let data = [v1.x * m1, v2.x * m2, v1.y * m1, v2.y * m2, v1.z * m1, v2.z * m2, v1p.x * m1, v2p.x * m2, v1p.y * m1, v2p.y * m2, v1p.z * m1, v2p.z * m2]

            // add collision to each particle history
            this.collisions.push(data);
            p.collisions.push(data)
        }
    }

    update(sf, fps) {
        this.velocity.add(this.acceleration);
        this.position.add(
            this.velocity.clone().multiplyScalar((1 / fps) * sf)
        );
        this.acceleration.multiplyScalar(0);
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

    show() {
        // update particle position
        this.particleMesh.position.x = this.position.x;
        this.particleMesh.position.y = this.position.y;
        this.particleMesh.position.z = this.position.z;
    }
}
