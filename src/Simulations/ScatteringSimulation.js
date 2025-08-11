import { ThreeJsSimulation } from './ThreeJsSimulation';
import { ValueInput } from '../Input/ValueInput';
import { SliderInput } from '../Input/SliderInput';
import * as THREE from 'three';

export default class ScatteringSimulation extends ThreeJsSimulation {
    // physical constants
    me = 9.1093837e-31;
    mp = 1.67262192e-27;
    e = 1.60217663e-19;

    // simulation constants
    n = 4;
    h = 150;
    w = 150;

    constructor(container, inputs, graphs, controls, attributes) {
        super(container, inputs, graphs, controls, attributes);

        // add inputs
        this.mInput = new ValueInput(
            this.inputWrapper,
            79,
            'Proton Number of Nucleus',
            '',
        )

        this.uInput = new ValueInput(
            this.inputWrapper,
            1,
            'Initial Electron Velocity',
            'x10<sup>7</sup>/ms<sup>-1</sup>',
        )

        this.sizeInput = new SliderInput(
            this.inputWrapper,
            this.n,
            0,
            6,
            1,
            'No. Alpha Particles',
            '',
            false
        );

    }

    simInit() {
        // load inputs & do scaling
        this.u = this.uInput.get() * 10;
        let protonNumber = Math.floor(Math.abs(this.mInput.get()));
        this.alphas = [];
        this.n = this.sizeInput.get();

        // init sim variables
        this.nucleus = new Charge(
            protonNumber * this.mp,
            protonNumber * this.e,
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(0, 0, 0),
            this.scene
        );

        // add electrons
        let useH = (this.h / 6) * this.n;
        let useW = (this.w / 6) * this.n;

        for (let i = -useH / 2; i <= useH / 2; i += Math.abs(this.h / 6)) {
            for (let j = -useW / 2; j <= useW / 2; j += Math.abs(this.w / 6)) {
                this.alphas.push(
                    new Charge(2*this.mp, 2*this.e, new THREE.Vector3(-100, -i, j), new THREE.Vector3(this.u, 0, 0), new THREE.Vector3(0, 0, 0), this.scene),
              );
            }
        }

        // calibrate camera        
        this.camera.position.set(100, 0, 0);
        this.controls.target.set(0, 0, 0);
        this.controls.update();
    }

    simDraw() {
        // draw nucleus
        this.nucleus.draw();

        // draw alpha particles and update them
        for (let i = 0; i < this.alphas.length; i++) {
            this.alphas[i].draw();

            if (this.nucleus.pos.distanceTo(this.alphas[i].pos) < 10000) {
                this.nucleus.field(this.alphas[i]);
            }

            if (!this.paused) {
                this.alphas[i].update(this.deltaT);
            }
        }
    }
}

class Charge {
    E0 = 8.85418782e-12;

    constructor(m, q, pos, v, a, scene) {
        this.m = m;
        this.q = q;
        this.pos = pos;
        this.v = v;
        this.a = a;
        this.history = [];
        this.historyLimit = 250;
        this.scene = scene;

        // initialise geometry
        const particleGeometry = new THREE.SphereGeometry(3 * Math.sqrt(this.m) * 0.5e13, 16, 16);
        
        if (this.q > 0) {
            this.colour = 0xa6bd6f;
        } else {
            this.colour = 0x9c6270;
        }
        
        //initialise particle geometry
        const particleMaterial = new THREE.MeshBasicMaterial({ 
                    color: this.colour, 
                    transparent: true, 
                    opacity: 0.75 
                });
        this.particleMesh = new THREE.Mesh(particleGeometry, particleMaterial);
        this.scene.add(this.particleMesh); 

        // history line init
        const initialPoints = new Float32Array(this.historyLimit * 3);
        this.historyGeometry = new THREE.BufferGeometry();
        this.historyGeometry.setAttribute('position', new THREE.BufferAttribute(initialPoints, 3));
        this.historyMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
        this.line = new THREE.Line(this.historyGeometry, this.historyMaterial);
        this.line.frustumCulled = false;
        this.scene.add(this.line);
    }

    update(deltaT) {
        this.v.add(this.a.clone().multiplyScalar(deltaT * 50));
        this.pos.add(this.v.clone().multiplyScalar(deltaT));

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

    }
    
    field(c) {
        let force =
            (1 / (4 * Math.PI * this.E0)) *
            (this.q * c.q) *
            (1 / Math.pow(this.pos.distanceTo(c.pos), 2));
        let vec = c.pos.clone().sub(this.pos).normalize();  
        let a1 = vec.clone().multiplyScalar(-force / this.m);
        let a2 = vec.clone().multiplyScalar(force / c.m);

        this.a = a1;
        c.a = a2;
    }

    draw() {
        this.particleMesh.position.copy(this.pos);

        // update the buffer geometry with all points
        const posAttr = this.historyGeometry.attributes.position;
        for (let i = 0; i < this.history.length; i++) {
            const point = this.history[i];
            posAttr.setXYZ(i, point.x, point.y, point.z);
        }
        posAttr.needsUpdate = true;
    
        this.historyGeometry.setDrawRange(0, this.history.length);
    }
}
