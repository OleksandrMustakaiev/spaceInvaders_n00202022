//gui settings
let params={
    numCols:8, //number of colums
    numRows:4  //number of rows
}

//screen
let screenWidth = 500;
let screenHeight = 500;

//strangers settings
let strangers = []; //class stranger
let strangerWidth = 25; //width
let strangerHeight = 25; //height
let strangerVelocity = 1; //speed
//let numCols = 5;
//let numRows = 5;
let hSpace = 30; //space between each alien/stranger - horizontal pos
let vSpace = 30; //space betwwen each alein/stranger - vertical pos
let xOffset = (screenWidth - (params.numCols - 1) * hSpace) / 2; //will create a strangers on the middle of a horizontal
let yOffset = 20; //will create first stranger on 20 y
let shiftDown = 40; //when tell the game is over
let strangerImg; //to add image for strangers

//rocket settings
let rocketWidth = 100;
let rocketHeight = 20;
let rocket; //class rocket

//bomb settings
let bombs = []; //class bomb
let bombWidth = 10;
let bombHeight = 10;
let bombVelocity = 5; //speed of each bomb

let emitters =[]; //class of emitter

var gui; //add gui

function preload() {
    strangerImg = loadImage('assets/spaceInvaders2.png'); //load image of stranger
}

function setup() { //background and rocket
    populateStrangers();

    //gui
    gui = QuickSettings.create(550, 25, "GAME SETTINGS")
    .addRange("Size Of Colums", 3, 10, params.numCols, 1, 
    function(value){
        params.numCols = value;
        strangers=[];
        xOffset = (screenWidth - (params.numCols - 1) * hSpace) / 2;
        populateStrangers();
    })
    .addRange("Size Of Rows", 3, 10, params.numRows, 1, 
    function(value){
        params.numRows = value;
        strangers=[];
        populateStrangers();
    });

    //create rocket
    rocket = new Rocket(screenWidth / 2, screenHeight - rocketHeight / 2);
    createCanvas(screenWidth, screenHeight);
    background(255);
}

function draw() { 
    background(0);
    emitters.forEach(emitter => { //emitter
        emitter.createSparks();
        emitter.update();
        emitter.show();
    });
    rocket.render(); //rocket
    rocket.move();
    let shift = false; //to make game over

    strangers.forEach(stranger => { //to make strangers go down
        stranger.move();
        stranger.render();
        stranger.pos.x >= screenWidth ? shift=true : null;
        stranger.pos.x <= 0 ? shift=true : null;
    });

    if(shift){
        strangers.forEach(stranger=>{
            stranger.shift();
        })
    }

    for (let i = bombs.length - 1; i>=0; i--) { //to make bombs move and show, also splice bomb
        bombs[i].move();
        bombs[i].render();
        for (let j = strangers.length - 1; j >= 0; j--){
            if(bombs[i].hits(strangers[j])) {
                emitters.push(new Emitter(strangers[j].pos.x, strangers[j].pos.y));
                strangers.splice(j, 1);
                bombs.splice(i, 1);
                break
            }
        }
    }


    checkGameStatus()
}

    function checkGameStatus(){
        let gameOver = false;
        strangers.forEach(stranger => { //if strangers reach the end, it will show that the game is over
            if(stranger.pos.y > 400){
                gameOver = true;
            }
        });

        if (gameOver){ //if the game is over (from line 114), it will create a text on the screen saying GAME OVER
            noLoop();
            textSize(120);
            textLeading(110);
            fill(255,0,0);
            textAlign(CENTER, CENTER);
            text("Game\nOver", 250,230);
        }
    }

function keyPressed(){ //to make rocket move by right and left arrow keys
    if (keyCode === RIGHT_ARROW){ //if press right arrow it will move barrel to the right by 0.2
        rocket.barrelAngle += 0.2;
    } else if (keyCode === LEFT_ARROW){ //if press left arrow it will move barrel to the left by 0.2
        rocket.barrelAngle -= 0.2;
    } else if (keyCode === 32){ //if press space on keyboard the bomb will shoot from the barrel
        bombs.push(new Bomb(rocket.pos.x, screenHeight - rocketHeight, rocket.barrelAngle))
    }
}

function populateStrangers(){ //to make more than 1 stranger on the screen
    for(let row = 0; row < params.numRows; row++){
        for(let col = 0; col < params.numCols; col++){
            strangers.push(new Stranger(col * hSpace + xOffset, row*vSpace + yOffset))
        }
    }
}