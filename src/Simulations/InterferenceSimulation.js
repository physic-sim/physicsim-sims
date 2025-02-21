import { TwoDSimulation } from './TwoDSimulation';
import { SliderInput } from '../Input/SliderInput';
import { CheckBoxInput } from '../Input/CheckBoxInput';
import p5 from 'p5';
import 'p5/lib/addons/p5.sound'; 

export default class InterferenceSimulation extends TwoDSimulation {
    v = 343; // speed of sound
    sf = 1/100;

    constructor(container, inputs, controls, attributes) {
        super(container, inputs, controls, attributes, false, true);

        // add inputs
        this.useSoundInput = new CheckBoxInput(
            this.inputWrapper,
            false,
            'Play tone'
        );

        this.posInput = new SliderInput(
            this.inputWrapper,
            1,
            0,
            2,
            0.001,
            'Position of Observer',
            '',
            false
        );

        this.lambdaInput = new SliderInput(
            this.inputWrapper,
            1.5,
            0.1,
            11,
            0.1,
            'λ',
            'm'
        );
    }

    init() {
        // initalise simulation
        this.offset = 0;
        this.p = new p5((p) => {
            p.setup = () => this.simSetup(p);
            p.draw = () => this.simDraw(p);
            p.windowResized = () => this.handleResize(p);
        });
    }

    simSetup(p) {
        p.createCanvas(
            window.innerWidth,
            window.innerHeight * 0.5,
            p5.P2D,
            this.container,
        );
        p.background(8, 8, 8);

        // add speakers
        this.src1 = new p5.Vector(
            this.p.width * 0.25,
            window.innerHeight * 0.5 * 0.5,
        );
        this.src2 = new p5.Vector(
            this.p.width * 0.75,
            window.innerHeight * 0.5 * 0.5,
        );
        this.obs = new p5.Vector(
            this.getPosition(),
            window.innerHeight * 0.5 * 0.5,
        );
        
        // give obs velocity
        this.vel = 0.5

        // setup tone generator
        if (this.osc) {
            this.osc.stop();
        }

        this.osc = new p5.Oscillator('sine');
        this.osc.freq(this.v / this.lambdaInput.get());
        this.osc.amp(0.5, 0);
        this.isPlaying = false;
    }

    simDraw(p) {
        p.background(8, 8, 8);
        this.obs = new p5.Vector(this.getPosition(), this.p.height * 0.5);
        this.osc.freq(this.v / this.lambdaInput.get());

        // move observer if configured
        if (this.paused == false) {
            let scale = (this.obs.x + this.vel) / p.width

            if (scale > 1) {
                this.vel = -this.vel
            } else if (scale < 0) {
                this.vel = -this.vel
            }

            this.posInput.set(scale * 2);
            this.obs.x = Math.abs(p.width * scale);
        }

        // calculate path difference and play tune
        let d1 = p5.Vector.dist(this.src1, this.obs) * this.sf;
        let d2 = p5.Vector.dist(this.src2, this.obs) * this.sf;

        let lambda = this.lambdaInput.get();
        let phaseDiff = ((Math.abs(d1 - d2) % lambda) / lambda) * (2 * Math.PI);

        let percievedAmplitude = (1 + p.cos(phaseDiff)) / 2;
        this.osc.amp(percievedAmplitude, 0.1);

        if (this.useSoundInput.get() && this.isPlaying == false) {
            this.isPlaying = true;
            p.userStartAudio();
            this.osc.start();
        } else if (!this.useSoundInput.get() && this.isPlaying == true) {
            this.osc.stop();
            this.isPlaying = false;
        }

        // update attributes
        this.attributeWrapper.innerHTML = `
            Path Difference = ${Math.abs(((d1 - d2) % lambda).toFixed(2))} m <br>
            Phase Difference = ${phaseDiff.toFixed(2)} rad
        `;

        // draw speakers and observers
        this.drawSpeaker(p, this.src1.x, this.src1.y);
        this.drawSpeaker(p, this.src2.x, this.src2.y);
        p.fill(108, 70, 204);
        p.circle(this.obs.x, window.innerHeight * 0.5 * 0.5, 25);
    }

    drawSpeaker(p, x, y) {
        p.noStroke();
        p.fill(0, 0, 0);
        p.circle(
            x,
            y,
            50 +
                5 *
                    p.sin(
                        (p.millis() / 1e5) * (this.v / this.lambdaInput.get()),
                    ),
        );
        p.fill(40, 40, 40);
        p.circle(x, y, 30);
        p.fill(12, 12, 12);
        p.circle(x, y, 10);

        // draw wave fronts
        for (
            let i = 0;
            i < window.innerWidth / this.lambdaInput.get() * this.sf;
            i++
        ) {
            p.noFill();
            p.stroke(
                100,
                100,
                100,
                (i / (window.innerWidth / this.lambdaInput.get() * this.sf)) * 255,
            );
            p.circle(x, y, this.lambdaInput.get() * 1 / this.sf * i);
        }
    }

    getPosition() {
        let x = window.innerWidth * (this.posInput.get() / 2);
        return x;
    }

    handleResize(p) {
        setTimeout(() => this.simSetup(p), 250);
    }
}
