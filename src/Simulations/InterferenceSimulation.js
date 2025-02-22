import { TwoDSimulation } from './TwoDSimulation';
import { SliderInput } from '../Input/SliderInput';
import { CheckBoxInput } from '../Input/CheckBoxInput';
import p5 from 'p5';
import 'p5/lib/addons/p5.sound'; 

export default class InterferenceSimulation extends TwoDSimulation {
    v = 343; // speed of sound
    sf = 1/100;
    isDragging = false;

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
        this.p = new p5((p) => {
            p.setup = () => this.simSetup(p);
            p.draw = () => this.simDraw(p);
            p.windowResized = () => this.handleResize(p);
            p.mouseDragged = () => this.mouseDragged(p);
            p.mouseReleased = () => this.mouseReleased(p);
            p.touchEnded = () => this.mouseReleased(p);
        });

        // prevent scroll when dragging on mobile
        document.addEventListener('touchmove', (e) => {
            if (this.isDragging) {
                e.preventDefault();
            }
        }, { passive: false }) 
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
        p.background(0, 0, 0);

        if (!this.isDragging) {
            this.obs = new p5.Vector(this.getPosition(), this.obs.y);
        } else {
            this.posInput.set(this.obs.x / p.width * 2);
        }

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
        let pathDiff = Math.abs(d1 - d2);
        let phaseDiff = (pathDiff / lambda) * (2 * Math.PI) % (2 * Math.PI);


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
        p.noStroke();
        p.circle(this.obs.x, this.obs.y, 25);
    }

    drawSpeaker(p, x, y) {
        p.noStroke();
        p.fill(35, 35, 35);
        p.circle(
            x,
            y,
            50 +
                5 *
                    p.sin(
                        (p.millis() / 1e5) * (this.v / this.lambdaInput.get()),
                    ),
        );
        p.fill(55, 55, 55);
        p.circle(x, y, 30);
        p.fill(25, 25, 25);
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

    mouseDragged(p) {

        if (!this.isInBounds(p)) {
            return;
        }

        this.isDragging = true;
        document.body.style.overflow = 'hidden';
        this.obs.x = p.mouseX;
        this.obs.y = p.mouseY;

        if (!this.paused) {
            this.togglePause();
            this.pauseBtn.onClick();
            this.pauseBtn.paused = true;
        }
    }

    mouseReleased(p) {
        if (this.isDragging) {
            this.isDragging = false;
            document.body.style.overflowY = 'auto';
        }
    }

    isInBounds(p) {
        if (p.mouseX < 0 || p.mouseX > p.width) {
            return false;
        }

        if (p.mouseY < 0 || p.mouseY > p.height) {
            return false;
        }

        return true;
    }

    getPosition() {
        let x = window.innerWidth * (this.posInput.get() / 2);
        return x;
    }

    handleResize(p) {
        setTimeout(() => this.simSetup(p), 250);
    }
}
