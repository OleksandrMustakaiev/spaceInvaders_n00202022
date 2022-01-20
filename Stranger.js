class Stranger{
    constructor(x,y){ //constructor of the stranger
        this.pos = createVector(x,y);
        this.velocity = strangerVelocity; //speed
    }

    render(){ //to make strange visible on screen
        push();
        translate(this.pos.x, this.pos.y);
        image(strangerImg, 0, 0, strangerWidth, strangerHeight);
        pop();
    }

    move(){
        this.pos.x += this.velocity; //to make it move
    }

    shift(){ //to make it go down
        this.pos.y += shiftDown;
        this.velocity *= -1;
    }
}
