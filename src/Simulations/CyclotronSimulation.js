import { ThreeJsSimulation } from './ThreeJsSimulation';
import { ValueInput } from '../Input/ValueInput';
import { SliderInput } from '../Input/SliderInput';
import Chart from 'chart.js/auto';
import * as THREE from 'three';

export default class CyclotronSimulation extends ThreeJsSimulation {
    historyLimit = 100;
    pauseStart;
    d = 200;
    deeRadius = 2000;
    timeScale = 1

    constructor(container, inputs, graphs, controls, attributes) {
        super(container, inputs, graphs, controls, attributes);

        // add inputs
        this.massInput = new ValueInput(
            this.inputWrapper,
            1,
            'Mass',
            'x10<sup>-27</sup>/kg',
        );
        this.chargeInput = new ValueInput(
            this.inputWrapper,
            1.6,
            'Charge',
            'x10<sup>-19</sup>/C',
        );
        this.magInput = new SliderInput(
            this.inputWrapper,
            2,
            0,
            3,
            0.5,
            "Magnetic Flux Density",
            "T"
        )
        this.pdInput = new SliderInput(
            this.inputWrapper,
            10,
            0, 
            20, 
            1,
            'Potential Difference',
            'kV',
        );
    }

    simInit() {
        // load inputs & do scaling
        this.m = Math.abs(this.massInput.get());
        this.q = this.chargeInput.get();
        this.B = this.magInput.get() / 2;
        this.V = this.pdInput.get();

        // init sim variables
        this.pos = new THREE.Vector3(0, 0, 0);
        this.v = new THREE.Vector3(0, 0, 0);
        this.history = [];

        // initialise particle geometry
        const particleGeometry = new THREE.SphereGeometry(50, 16, 16);
        let particleColour;

        if (this.q < 0) {
            particleColour = 0xaacadb;
        } else if (this.q > 0) {
            particleColour = 0xa6bd6f;
        } else {
            particleColour = 0x6c46cc;
        }

        const particleMaterial = new THREE.MeshBasicMaterial({ color: particleColour });
        this.particleMesh = new THREE.Mesh(particleGeometry, particleMaterial);
        this.scene.add(this.particleMesh); 

        // cyclotron models
        const dee1Geometry = new THREE.CylinderGeometry(this.deeRadius, this.deeRadius, 100, 32, 1, false, 0, Math.PI);
        const dee2Geometry = new THREE.CylinderGeometry(this.deeRadius, this.deeRadius, 100, 32, 1, false, Math.PI, Math.PI);
        const deeMaterial = new THREE.MeshBasicMaterial({
            color: 0xaacadb,
            transparent: true,
            opacity: 0.25,
            side: THREE.DoubleSide
        })
        const dee1Mesh = new THREE.Mesh(dee1Geometry, deeMaterial);
        const dee2Mesh = new THREE.Mesh(dee2Geometry, deeMaterial);
        
        dee1Mesh.position.set(this.d, 0, 0);
        dee2Mesh.position.set(-this.d, 0, 0);

        this.scene.add(dee1Mesh);
        this.scene.add(dee2Mesh);

        const electricFieldGeometry = new THREE.BoxGeometry(2 * this.d, 100, 2 * this.deeRadius);
        const electricFieldMaterial = new THREE.MeshBasicMaterial({
            color: 0x9c6270,
            transparent: true,
            opacity: 0.25,
            side: THREE.DoubleSide
        })
        const electricFieldMesh = new THREE.Mesh(electricFieldGeometry, electricFieldMaterial);
        this.scene.add(electricFieldMesh);

        // history line init
        const initialPoints = new Float32Array(this.historyLimit * 3);
        this.historyGeometry = new THREE.BufferGeometry();
        this.historyGeometry.setAttribute('position', new THREE.BufferAttribute(initialPoints, 3));
        this.historyMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
        this.line = new THREE.Line(this.historyGeometry, this.historyMaterial);
        this.line.frustumCulled = false;
        this.scene.add(this.line);

        // calibrate camera        
        this.camera.position.set(0, 3000, 0);
        this.controls.target.set(0, 0, 0);
        this.controls.update();
    }

    simDraw() {
        if (!this.paused) {
            // magnetic force in Dees
            if (this.pos.x > -this.deeRadius && this.pos.x < this.deeRadius &&
                this.pos.z < this.deeRadius && this.pos.z > -this.deeRadius
            ) {
                const mag = this.v.length();
                let b = new THREE.Vector3(0, this.B, 0);
                b.cross(this.v).normalize();
                let aMag = (this.v.length() * this.B * this.q) / this.m;
                b.multiplyScalar(aMag / 60);
                this.v.add(b);
                this.v.setLength(mag);
            }
            
            // electrostatic force outside Dees
            if (this.pos.x >= -this.d && this.pos.x <= this.d &&
                this.pos.z <= this.deeRadius && this.pos.z >= -this.deeRadius
            ) {

                if (this.v.x * this.q > 0) {
                    this.V = Math.abs(this.V);
                } else if (this.v.x * this.q < 0) {
                    this.V = -Math.abs(this.V);
                }

                const a =  new THREE.Vector3(this.q * this.V / this.m / 60, 0, 0);
                this.v.add(a);
            }

            // update position
            this.pos.add(this.v);

            // update history
            this.history.push({
                x: this.pos.x,
                y: this.pos.y,
                z: this.pos.z
            });

            // cull history if above limit
            if (this.history.length > this.historyLimit) {
                this.history.shift();
            }
            
            // update the buffer geometry with all points
            const posAttr = this.historyGeometry.attributes.position;
            for (let i = 0; i < this.history.length; i++) {
                const point = this.history[i];
                posAttr.setXYZ(i, point.x, point.y, point.z);
            }
            posAttr.needsUpdate = true;
        
            this.historyGeometry.setDrawRange(0, this.history.length);
        }

        // update particle position
        this.particleMesh.position.x = this.pos.x;
        this.particleMesh.position.y = this.pos.y;
        this.particleMesh.position.z = this.pos.z;

        this.updateAttributes();
    }

    togglePause(paused = null) {
        super.togglePause(paused)

        if (this.paused) {
            this.pauseStart = Date.now();
        } else {
            this.start = this.start + (performance.now() - this.pauseStart);
        }
    }

    updateAttributes() {
        this.attributeWrapper.innerHTML = `
			v = ${(this.v.length() * 316e3).toExponential(2)} m/s <br>
	  	`;
    }
}