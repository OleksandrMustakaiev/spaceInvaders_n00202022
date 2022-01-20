class Emitter{
    constructor(x,y){ //constructor of emitter
        this.position = createVector(x,y);
        this.sparks = []; //called spark class
        this.counter = 0;
    }

    createSparks(){ //will create 20 sparks
    if (this.counter < 20) {
        for(let i=0; i<1; i++){
            this.sparks.push(new Spark(this.position.x, this.position.y));
            this.counter++;
        }
    }
    }

    update(){ //adding gravity to each sparks from 0 to 0.2
        this.sparks.forEach(spark => {
            let gravity = createVector(0,0.2);
            spark.applyForce(gravity);
            spark.update();
        });

        for(let i = this.sparks.length - 1; i >= 0; i--){
            if(this.sparks[i].isFinished()){
            this.sparks.splice(i, 1);
            }
        }
    }

    show(){ //will render sparks on the screen
        this.sparks.forEach(spark => {
            spark.render();
        });
    }
}