import { ThreeDSimulation } from '../ThreeDSimulation';
import { Button } from '../../Controls/Button';
import { SliderInput } from '../../Input/SliderInput';
import { Ray } from './Ray';
import { BoxGeometry } from './BoxGeometry';
import { RayDiagram } from './RayDiagram';
import p5 from 'p5';

export default class SnellsLawSimulation extends ThreeDSimulation {
    UNCERTAINTY = 1e-6;

    constructor(container, inputs, graphs, controls, attributes) {
        super(container, inputs, graphs, controls, attributes, true);

        // add inputs
        this.thetaInput = new SliderInput(
            this.inputWrapper,
            45,
            0,
            360,
            1,
            'θ',
            '°',
            true
        )

        this.phiInput = new SliderInput(
            this.inputWrapper,
            90,
            0,
            360,
            1,
            'φ',
            '°',
            true
        )

        this.posXInput = new SliderInput(
            this.inputWrapper,
            -25,
            -75,
            75,
            0.1,
            'pos<sub>x</sub>',
            ''
        );

        this.posYInput = new SliderInput(
            this.inputWrapper,
            0,
            -75,
            75,
            0.1,
            'pos<sub>y</sub>',
            ''
        );

        this.posZInput = new SliderInput(
            this.inputWrapper,
            25,
            -75,
            75,
            0.1,
            'pos<sub>z</sub>',
            ''
        );

        this.nInput = new SliderInput(
            this.inputWrapper,
            1.30,
            0,
            5.0,
            0.01,
            'Refractive Index',
            ''
        );

        // init data
        this.interactions = [];

        // init table
        this.graphWrapper.style.display = 'block';
        // title table
        let title = document.createElement('h2');
        title.innerHTML = 'Surface Interactions';
        title.classList.add('table-title');
        this.graphWrapper.append(title);
        // table wrapper
        let table = document.createElement('table');
        table.classList.add('table-wrapper');
        // add header
        let head = document.createElement('thead');
        head.classList.add('table-head');
        let headTr = document.createElement('tr');
        let iHead = document.createElement('th');
        iHead.innerHTML = 'i/°';
        iHead.scope = 'col';
        iHead.className = 'table-td';
        let cHead = document.createElement('th');
        cHead.innerHTML = 'c/°';
        cHead.scope = 'col';
        cHead.className = 'table-td';
        let rHead = document.createElement('th');
        rHead.innerHTML = 'r/°';
        rHead.scope = 'col';
        rHead.className = 'table-td';
        let n1Head = document.createElement('th');
        n1Head.innerHTML = 'n1';
        n1Head.scope = 'col';
        n1Head.className = 'table-td';
        let n2Head = document.createElement('th');
        n2Head.innerHTML = 'n2';
        n2Head.scope = 'col';
        n2Head.className = 'table-td';
        headTr.append(iHead, cHead, rHead, n1Head, n2Head);
        head.append(headTr);
        table.append(head);
        this.tbody = document.createElement('tbody');
        this.tbody.classList.add('table-body');
        table.appendChild(this.tbody);
        this.graphWrapper.append(table);

        // title table
        let diagramTitle = document.createElement('h2');
        diagramTitle.innerHTML = 'Ray Diagrams';
        diagramTitle.classList.add('table-title');
        this.graphWrapper.append(diagramTitle);
        // init ray diagrams
        this.rayDiagramWrapper = document.createElement('div');
        this.rayDiagramWrapper.classList.add('diagram-wrapper')
        this.graphWrapper.appendChild(this.rayDiagramWrapper);
        this.rayDiagram = new RayDiagram(this.rayDiagramWrapper);
        this.diagramInput = new SliderInput(
            this.rayDiagramWrapper,
            1,
            1,
            1,
            1,
            'Slide to view different interactions.',
            '',
            false
        )
    }

    init(p) {
        // alter WEBGL
        let gl = p._renderer.GL;
        p._renderer.GL.enable(gl.BLEND);
        p._renderer.GL.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        // add custom btns
        this.downloadBtn = new Button(
            this.controlWrapper,
            this.download.bind(this),
            'data_table',
            'data'
        );

        // load values from ui
        let posX = this.posXInput.get();
        let posY = this.posZInput.get();
        let posZ = this.posYInput.get();

        let theta = this.thetaInput.get() * Math.PI / 180;
        let phi = this.phiInput.get() * Math.PI / 180;

        // init ray & geometry
        this.scene = [];
        this.ray = new Ray(
            p.createVector(posX, -posY, posZ),
            p5.Vector.fromAngles(theta, phi),
            1,
            true,
            10,
        );
        this.scene.push(
            new BoxGeometry(
                75,
                15,
                40,
                p.createVector(0, 0, 0),
                this.nInput.get(),
            )
        );
    }

    frame(p) {
        if (this.rotateControl) {
            p.orbitControl(2.5, 2.5, 2.5);
        }

        p.ambientLight(255);
        p.perspective(0.2, this.width / this.height, 10, 500000);

        // load values from ui
        let posX = this.posXInput.get();
        let posY = this.posZInput.get();
        let posZ = this.posYInput.get();

        let theta = Math.PI - this.thetaInput.get() * Math.PI / 180;
        let phi = Math.PI - this.phiInput.get() * Math.PI / 180;

        let n = this.nInput.get();

        this.scene[0].n = n;

        // prevent point from going into geometry
        let isInGeometry = false;

        for (let i = 0; i < this.scene.length; i++) {
            if (
                this.scene[i].isInside(
                    p.createVector(posX, -posY, posZ),
                    this.UNCERTAINTY,
                )
            ) {
                isInGeometry = true;
            }
        }

        if (!isInGeometry) {
            this.ray.src.x = posX;
            this.ray.src.y = -posY;
            this.ray.src.z = posZ;
        }

        this.ray.dir = p5.Vector.fromAngles(theta, phi)

        this.ray.draw(this.scene, p, this.UNCERTAINTY, 0);

        for (let i = 0; i < this.scene.length; i++) {
            this.scene[i].n = n;
            this.scene[i].show(p);
        }

        // update data
        this.interactions = [];
        let next = this.ray;

        while (next !== null) {
            this.interactions.push(next.data);
            next = next.next;
        }

        // render table of interactions
        if (this.selected == 'graphs') {
            this.tabulate(this.interactions);
            this.diagramInput.changeBounds(1, this.interactions.length - 1)
            this.rayDiagram.update(this.interactions[this.diagramInput.get() - 1])
        }
    }

    tabulate(interactions) {
        this.tbody.innerHTML = ''

        interactions.map((data, _) => {
            // show interaction
            let tr = document.createElement('tr');
            tr.classList.add('table-tr');

            for (let i = 0; i < data.length; i++) {
                let d = data[i];
                let td = document.createElement('td');
                td.classList.add('table-td');

                if (d == '') {
                    td.innerHTML = d;
                } else if (i < 3) {
                    td.innerHTML = (d * (180 / Math.PI)).toFixed(2);
                } else {
                    td.innerHTML = d.toFixed(2);
                }

                tr.appendChild(td);
            }

            this.tbody.appendChild(tr);
        });
    }

    download() {
        let data = this.interactions;
        let headers = 'i/rad, c/rad, r/rad, n1, n2\n';
        let strData = data.map((row) => row.join(',')).join('\n');
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
}

