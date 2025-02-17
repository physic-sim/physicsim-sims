import { ThreeDSimulation } from "./ThreeDSimulation";
import { ValueInput } from "../Input/ValueInput";
import { SliderInput } from '../Input/SliderInput'
import p5 from 'p5';

export default class ScatteringSimulation extends ThreeDSimulation {

    // physical constants
    me = 9.1093837e-31;
    mp = 1.67262192e-27;
    e = 1.60217663e-19;

    // sim constants
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
            ''
        )

        this.uInput = new ValueInput(
            this.inputWrapper,
            1,
            'Initial Electron Velocity',
            'x10<sup>7</sup>/ms<sup>-1</sup>'
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
        )

    }

    init(p) {
        // load inputs & do scaling
        this.u = this.uInput.get() * 10;
        let protonNumber = Math.floor(Math.abs(this.mInput.get()));
        this.alphas = []
        this.n = this.sizeInput.get();

        // init sim variables
        this.nucleus = new Charge(
            protonNumber * this.mp,
            protonNumber * this.e,
            p.createVector(0, 0, 0),
            p.createVector(0, 0, 0),
            p.createVector(0, 0, 0)
        );

        // add electrons
        let useH = this.h / 6 * this.n;
        let useW = this.w / 6 * this.n;

        for (let i = -useH/2; i <= useH/2; i += (Math.abs(this.h/6))) {
            for (let j = -useW/2; j <= useW/2; j += (Math.abs(this.w/6))) {        
              this.alphas.push(
                new Charge(2*this.mp, 2*this.e, p.createVector(-100, -i, j), p.createVector(this.u, 0, 0), p.createVector(0, 0, 0))
              );
            }
        
        }

        // camera config
        this.cam = p.createCamera();
        this.cam.setPosition(200, 0, 700);
        this.cam.lookAt(0, 0, 0);
    }

    frame(p) {
        if (this.rotateControl) {
            p.orbitControl();
        }

        p.perspective(0.25, this.width / this.height, 10, 500000);

        // draw nucleus
        this.nucleus.draw(p);


        // draw alpha particles and update them
        for (let i = 0; i < this.alphas.length; i++) {
            this.alphas[i].draw(p);

            if (this.nucleus.pos.dist(this.alphas[i].pos) < 10000) {
                this.nucleus.field(this.alphas[i]);
            }

            if (!this.paused) {
                this.alphas[i].update(p);
            }
        }
    }

}


class Charge {

    E0 = 8.85418782e-12;
  
  constructor(m, q, pos, v, a) {
    this.m = m;
    this.q = q;
    this.pos = pos;
    this.v = v;
    this.a = a;
    this.history = [];
  }
  
  update(p) {
    
    this.v.add(this.a);
    this.pos.add(p5.Vector.mult(this.v, 1/p.getTargetFrameRate()))
    this.history.push(this.pos.copy());
    
  }
  
  field(c) {
    
    let force = (1 / (4 * Math.PI * this.E0)) * (this.q * c.q) * (1/Math.pow(this.pos.dist(c.pos), 2));
    let vec = p5.Vector.sub(c.pos, this.pos).normalize();  
    
    let a1 = p5.Vector.mult(vec, (-1 / this.m) * force)
    let a2 = p5.Vector.mult(vec, (1 / c.m) * force);

    this.a = a1;
    c.a = a2;
    
  }
  
  draw(p) {
    
    if (this.q < 0) {
      p.fill(255, 0, 0)
    } else {
      p.fill(0, 255, 0)
    }
  
    p.noStroke()
    p.push();
    p.translate(this.pos);
    p.sphere(Math.sqrt(this.m) * 0.5e13, 24, 24);
    p.pop();
    
    if (this.history.length > 30) {
      this.history.shift();
    }
    
    for (let i = 0; i < this.history.length - 5; i+=4) {
      p.stroke(255, 255, 255, 50 * (i / this.history.length))
      p.strokeWeight(0.5)
      p.push()
      p.line(
        this.history[i].x,
        this.history[i].y,
        this.history[i].z,
        this.history[i+5].x,
        this.history[i+5].y,
        this.history[i+5].z
      )
      p.pop();
    }  
  }
}