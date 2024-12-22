import p5 from 'p5';

export class BoxGeometry {
    constructor(w, h, d, c, n) {
        this.w = w;
        this.h = h;
        this.d = d;
        this.c = c;
        this.n = n;
        // normal vectors
        this.normals = [
            new p5.Vector(0, 0, -1),
            new p5.Vector(0, 0, 1),
            new p5.Vector(0, -1, 0),
            new p5.Vector(0, 1, 0),
            new p5.Vector(-1, 0, 0),
            new p5.Vector(1, 0, 0),
        ];
        // compute planes
        this.planes = [];

        for (let i = 0; i < this.normals.length; i++) {
            let n = this.normals[i];

            // compute position vector
            let r;
            if (i < 2) {
                r = p5.Vector.mult(n, this.d / 2);
            } else if (i > 3) {
                r = p5.Vector.mult(n, this.w / 2);
            } else {
                r = p5.Vector.mult(n, this.h / 2);
            }

            let p = p5.Vector.add(this.c, r);

            this.planes.push([p, n]);
        }
    }

    show(p) {
        // draw box geometry
        p.push();
        p.translate(this.c);
        p.stroke(255, 255, 255, 200);
        p.fill(0, 200, 255, 100);
        p.box(this.w, this.h, this.d, 4, 4);
        p.pop();
    }

    isInside(point, UNCERTAINTY) {
        // check if point lies on the surface or inside the geometry
        if (
            point.x >= this.c.x - this.w / 2 - UNCERTAINTY &&
            point.x <= this.c.x + this.w / 2 + UNCERTAINTY &&
            point.y >= this.c.y - this.h / 2 - UNCERTAINTY &&
            point.y <= this.c.y + this.h / 2 + UNCERTAINTY &&
            point.z >= this.c.z - this.d / 2 - UNCERTAINTY &&
            point.z <= this.c.z + this.d / 2 + UNCERTAINTY
        ) {
            return true;
        } else {
            return false;
        }
    }
}
