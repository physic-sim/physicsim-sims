import p5 from "p5";

export class RayDiagram {

    constructor(wrapper) {
        this.ctx = document.createElement('canvas')
        this.wrapper = wrapper
        this.wrapper.append(this.ctx)

        // init p5
        this.p = new p5((p) => {
            p.setup = () => this.setup(p);
            p.draw = () => this.draw(p);
            p.windowResized = () => this.handleResize(p);
        });
        
        // get data
        this.data = []
    }

    update(data) {
        this.data = data;
    }

    setup(p) {
        p.createCanvas(this.wrapper.offsetWidth, 400, this.ctx);
        p.frameRate(30)
    }

    draw(p) {
        p.background(255);
        p.strokeWeight(2)
        
        // draw boundary
        p.drawingContext.setLineDash([0, 0]);
        p.line(10, p.height/2, p.width-10, p.height/2)
        
        // draw normal
        p.drawingContext.setLineDash([10, 15]);
        p.line(p.width/2, 20, p.width/2, p.height-20)
        p.drawingContext.setLineDash([0, 0]);

        // draw ns
        if (this.data[3] && this.data[4]) {
            p.strokeWeight(0.5)
            p.text(`n = ${this.data[3].toFixed(2)}`, 10, p.height/2-10)
            p.text(`n = ${this.data[4].toFixed(2)}`, 10, p.height/2+15)
            p.strokeWeight(2)
        }
      
        // draw angle of incidence
        let i = p5.Vector.fromAngle(Math.PI/2 - this.data[0]);
        p.line(p.width/2, p.height/2, p.width/2 - i.x * 100, p.height/2 - i.y * 100)
        p.strokeWeight(0.5)
        p.text('i', p.width/2 - i.x * 100 - 10, p.height/2 - i.y * 100 - 10)
        p.strokeWeight(2)

        // reflection line  
        p.stroke(100)
        p.line(p.width/2, p.height/2, p.width/2 + i.x * 100, p.height/2 - i.y * 100)
        p.stroke(0)
        
        p.strokeWeight(0.5)
        p.text('reflection', p.width/2 + i.x * 100 - 10, p.height/2 - i.y * 100 - 10)
        p.strokeWeight(2)
        
        // draw angle of refraction
        if (this.data[1] === '' || this.data[0] < this.data[1]) { // standard defraction
            let r = p5.Vector.fromAngle(Math.PI/2 - this.data[2]);
            p.line(p.width/2, p.height/2, p.width/2 + r.x * 100, p.height/2 + r.y * 100)
            
            p.strokeWeight(0.5)
            p.text('r', p.width/2 + r.x * 100 + 10, p.height/2 + r.y * 100 + 10)
            p.strokeWeight(2)
            
        } else { // TIR
            p.line(p.width/2, p.height/2, p.width/2 + i.x * 100, p.height/2 - i.y * 100)
        }
    }

    handleResize(p) {
        p.resizeCanvas(this.wrapper.offsetWidth, 400);
    }

}