class Bomb{ //bomb or bullet
    constructor(x,y, a){ //constructor of the bomb
        this.pos = createVector(x,y);
        this.angle = a;
    }

    render(){ //to render a bomb
        push();
        translate(this.pos.x, this.pos.y);
        fill(220,20,60);
        ellipse(0, 0, bombWidth, bombHeight);
        pop();
    }

    move(){ //to make bomb move
        this.pos.x += Math.cos(this.angle)*bombVelocity;
        this.pos.y += Math.sin(this.angle)*bombVelocity;
    }

    hits(stranger){ //disappear bomb after it go outside of the background 
        let distance = (p5.Vector.sub(this.pos, stranger.pos)).mag();
        if (distance < bombHeight/2 + strangerHeight/2){
            return true;
        } else {
            return false;
        }
    }
}
