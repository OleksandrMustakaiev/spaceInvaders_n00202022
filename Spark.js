class Spark {
    constructor(x, y) { //constructor of each spark
        this.pos = createVector(x, y);
        this.velocity = p5.Vector.random2D();
        this.velocity.mult(random(-2.5, 2.5))
        this.acc = createVector(0,0);
        this.r = 2;
        this.lifetime = 255;
    }

    isFinished(){ //to make life time to dissapear
        return (this.lifetime < 0)
    }

    applyForce(force){
        this.acc.add(force);
    }

    update() {
        this.velocity.add(this.acc);
        this.pos.add(this.velocity);
        this.acc.set(0,0);
        this.lifetime -= 7;
    }

    render() { //to make visible each spark
        noStroke();
        fill(255,192,0, this.lifetime); //spark
        stroke(255,0,0, this.lifetime); //stroke of each spark
        ellipse(this.pos.x, this.pos.y, this.r * 2)
    }

    edges() {
        if (this.pos.y >= height - this.r) {
            this.pos.y = height - this.r;
            this.velocity.y *= -1
        } else if (this.pos.y <= 0 + this.r) {
            this.pos.y = 0 + this.r;
            this.velocity.y *= -1
        }
    }
}