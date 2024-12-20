import leftBracket from '../assets/Input/VectorInput/left-vector-bracket.png'
import rightBracket from '../assets/Input/VectorInput/right-vector-bracket.png'
import { NumInput } from './NumInput';
import p5 from 'p5'

export class VectorInput {

    base;
    x;
    y;
    z;
    label;
    unit;

    constructor(base, x, y, z, label, unit, disabled=false, onClick=null) {
        this.base = base;
        this.label = label;
        this.unit = unit;

        // construct html framework
        let container = document.createElement('div');
        container.classList.add('vector-input-container');

        if (onClick !== null) {
            container.addEventListener('click', onClick);
        }

        let pLabel = document.createElement('p');
        pLabel.innerHTML = `${this.label}`;
        pLabel.classList.add('vector-input-label');

        let pEqual = document.createElement('p')
        pEqual.innerHTML = '='
        pLabel.classList.add('vector-input-text')

        let pUnit = document.createElement('p');
        pUnit.innerHTML = unit;
        pUnit.classList.add('vector-input-text');

        let iLeftBracket = document.createElement('img');
        let iRightBracket = document.createElement('img');
        iLeftBracket.classList.add('vector-input-bra')
        iRightBracket.classList.add('vector-input-bra')

        iLeftBracket.src = leftBracket;
        iLeftBracket.draggable = false;
        iRightBracket.src = rightBracket
        iRightBracket.draggable = false;

        let inContainer = document.createElement('div')
        inContainer.classList.add('vector-input-in-container')

        this.x = new NumInput(inContainer, x, disabled);
        this.y = new NumInput(inContainer, y, disabled);
        this.z = new NumInput(inContainer, z, disabled);

        container.append(pLabel, pEqual, iLeftBracket, inContainer, iRightBracket, pUnit);

        base.appendChild(container);
    }

    get() {
        return new p5.Vector(this.x.get(), -this.z.get(), this.y.get());
    }

    set(x, y, z) {
        this.x.set(x);
        this.y.set(y);
        this.z.set(z);
    }

    toggleDisable() {
        this.x.toggleDisable();
        this.y.toggleDisable();
        this.z.toggleDisable();
    }

}