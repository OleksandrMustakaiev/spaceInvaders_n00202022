class Rocket{
    constructor(x,y){ //constructor of the rocket
        this.pos = createVector(x,y);
        this.direction = 1;
        this.barrelAngle = -PI/2;
    }

    render(){ 
        //create rocket to make move left and right (bounce)
        push();
        translate(this.pos.x, this.pos.y);
        fill(25,25,112); //blue
        rectMode(CENTER);
        rect(0, 0, rocketWidth, rocketHeight);

        //create barrel, like aim to shoot
        rotate(this.barrelAngle);
        rectMode(CORNER);
        fill(220, 20, 60); //red
        noStroke();
        rect(-5,-5,40,10);

        pop();
    }

    move(){ //to make rocket move
        if (this.pos.x < 0 || this.pos.x > 500) {
            this.direction *= -1
        }
        this.pos.x += this.direction;
    }

    setDirection(direction){ //direction of the rocket (position)
        this.direction = direction
    }
}
