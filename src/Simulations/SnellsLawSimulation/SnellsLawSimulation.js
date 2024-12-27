import { Simulation } from '../Simulation';
import { Button } from '../../Controls/Button';
import { SliderInput } from '../../Input/SliderInput';
import { Ray } from './Ray';
import { BoxGeometry } from './BoxGeometry';

export default class SnellsLawSimulation extends Simulation {
    UNCERTAINTY = 1e-6;

    constructor(container, inputs, graphs, controls, attributes) {
        super(container, inputs, graphs, controls, attributes, true);

        // add inputs
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

        this.dirXInput = new SliderInput(
            this.inputWrapper,
            3,
            -5,
            5,
            0.1,
            'dir<sub>x</sub>',
            ''
        );

        this.dirYInput = new SliderInput(
            this.inputWrapper,
            0,
            -5,
            5,
            0.1,
            'dir<sub>y</sub>',
            ''
        );

        this.dirZInput = new SliderInput(
            this.inputWrapper,
            -3,
            -5,
            5,
            0.1,
            'dir<sub>z</sub>',
            ''
        );

        this.nInput = new SliderInput(
            this.inputWrapper,
            1,
            0,
            5.0,
            0.01,
            'Refractive Index',
            ''
        );

        // init data
        this.interactions = [];
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
            'Data',
        );

        // load values from ui
        let posX = this.posXInput.get();
        let posY = this.posZInput.get();
        let posZ = this.posYInput.get();

        let dirX = this.dirXInput.get();
        let dirY = this.dirZInput.get();
        let dirZ = this.dirYInput.get();

        // init ray & geometry
        this.scene = [];
        this.ray = new Ray(
            p.createVector(posX, -posY, posZ),
            p.createVector(dirX, -dirY, dirZ),
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
            p.orbitControl();
        }

        p.ambientLight(255);
        p.perspective(0.2, this.width / this.height, 10, 500000);

        // load values from ui
        let posX = this.posXInput.get();
        let posY = this.posZInput.get();
        let posZ = this.posYInput.get();

        let dirX = this.dirXInput.get();
        let dirY = this.dirZInput.get();
        let dirZ = this.dirYInput.get();

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

        this.ray.dir.x = dirX;
        this.ray.dir.y = -dirY;
        this.ray.dir.z = dirZ;

        this.ray.dir.normalize();

        this.ray.draw(this.scene, p, this.UNCERTAINTY, 0);

        for (let i = 0; i < this.scene.length; i++) {
            this.scene[i].n = n;
            this.scene[i].show(p);
        }

        // render table of interactions
        if (this.selected == 'graphs') {
            this.interactions = [];
            let next = this.ray;

            while (next !== null) {
                this.interactions.push(next.data);
                next = next.next;
            }

            this.tabulate(this.interactions);
        }
    }

    tabulate(interactions) {
        this.graphWrapper.innerHTML = '';
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
        // add data
        let body = document.createElement('tbody');
        body.classList.add('table-body');
        interactions.map((data, index) => {
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

            body.appendChild(tr);
        });

        table.appendChild(body);
        this.graphWrapper.append(table);
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

/*

let ray;
let scene = []
let interactions = []

const UNCERTAINTY = 1e-6

function setup() {
  let viewWidth;
  let viewHeight;

  if (window.innerWidth < 800) {
    viewWidth = window.innerWidth * 0.9
    viewHeight = window.innerHeight * 0.75;
  } else {
    viewWidth = window.innerWidth * 0.75
    viewHeight = document.getElementById('ctrl').offsetHeight;
  }

  if (viewHeight < window.innerHeight * 0.75) {
    viewHeight = window.innerHeight * 0.75
  }

  createCanvas(viewWidth, viewHeight, WEBGL, document.getElementById('sketch'));
  gl = this._renderer.GL;
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);   
  ray = new Ray(createVector(0, 0, 0), createVector(50, 15, 0), 1, true);
  scene.push(new BoxGeometry(75, 15, 40, createVector(0, 0, 0), 1.5));}

function draw() {
  // disable loading screen on first draw
  pageLoaded()

  background(0);
  ambientLight(255);
  perspective(0.2, (width / height), 10, 500000)
  orbitControl()

  // clear data
  document.getElementById('table-data').innerHTML = '';
  interactions = [];
  
  // load values from ui
  let posX = parseFloat(document.getElementById('posX').value);
  let posY = parseFloat(document.getElementById('posY').value);
  let posZ = parseFloat(document.getElementById('posZ').value);

  let dirX = parseFloat(document.getElementById('dirX').value);
  let dirY = parseFloat(document.getElementById('dirY').value);
  let dirZ = parseFloat(document.getElementById('dirZ').value);

  let n = parseFloat(document.getElementById('n').value);

  // prevent point from going into geometry
  let isInGeometry = false;

  for (let i = 0; i < scene.length; i++) {
    if (scene[i].isInside(createVector(posX, -posY, posZ))) {
      isInGeometry = true;
    }
  }
  
  if (!isInGeometry) {
    ray.src.x = posX;
    ray.src.y = -posY;
    ray.src.z = posZ;
  }

  ray.dir.x = dirX;
  ray.dir.y = -dirY;
  ray.dir.z = dirZ;

  ray.dir.normalize();
  
  ray.draw(scene)
  
  for (let i = 0; i < scene.length; i++) {
    scene[i].n = n;
    scene[i].show();
  }
}

document.getElementById('download').addEventListener('click', () => {
  let data = interactions;
  let headers = 'i/rad, c/rad, r/rad, n1, n2\n'
  let strData = data.map(row => row.join(",")).join("\n");
  let csvData = headers.concat(strData);
  let blob = new Blob([csvData], { type: 'text/csv' });
  let url = window.URL.createObjectURL(blob);

  let a = document.createElement('a')
  a.setAttribute('hidden', '');
  a.setAttribute('href', url);
  a.setAttribute('download', 'data.csv');
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
})

*/
