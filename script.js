//board

var blocksize = 25
var rows = 20
var columns = 20
var board
var context
var gameover = false
var scorer
var score = 0

var atrain_x = blocksize * 3
var atrain_y = blocksize * 3
var shadow_x
var shadow_y

var comv_x
var comv_y

var starlight_x 
var starlight_y 
var star = false


var homelander_x
var homelander_y
var home = false
var homeattack = false

var speed_x = 0;
var speed_y = 0;

window.onload = function() {

    board = document.getElementById("board");
    board.height = rows * blocksize;
    board.width = rows * blocksize;
    context = board.getContext("2d");

    scorer = document.getElementById("scorer");

    placev();
    placehome();
    starintervalID = setInterval(placestar, 20000/10);
    homeintervalID = setInterval(placehome, 50000/10);

    document.addEventListener("keydown", changeDirection);
    intervalID = setInterval(update, 1000/10);
}

function update() {

    if(gameover) {
        endgame();
        return;
    }

    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    //A-Train

    context.fillStyle = "darkblue";
    shadow_x = atrain_x;
    shadow_y = atrain_y;
    context.fillRect(shadow_x, shadow_y, blocksize, blocksize);

    context.fillStyle = "blue";
    atrain_x += speed_x * blocksize;
    atrain_y += speed_y * blocksize;
    context.fillRect(atrain_x, atrain_y, blocksize, blocksize);

    //Starlight

    context.fillStyle = "yellow";
    context.fillRect(starlight_x, starlight_y, blocksize, blocksize);

    if(atrain_x==starlight_x && atrain_y==starlight_y) {
        star = true;
        setTimeout(() => { star = false; }, 3000); 
        placestar(); 
    }

    if(star) {
        context.fillStyle = "yellow";
        context.fillRect(0, 0, board.width, board.height);
    }

    //Homelander

    if(homeattack) {
        context.fillStyle = "maroon";
        context.fillRect(homelander_x, 0, blocksize, board.width);
        context.fillRect(0, homelander_y, board.width, blocksize);
    }

    if(home) {
        context.fillStyle = "red";
        context.fillRect(homelander_x, homelander_y, blocksize, blocksize);
        setTimeout(() => { homeattack = true; }, 1000)
        setTimeout(() => {  
            homeattack = false;
            home = false;
        }, 2000);
    }

    if(home) {
        if(atrain_x==homelander_x && atrain_y==homelander_y) {
            gameover = true;
        }
        if(homeattack) {
            if(atrain_x==homelander_x || atrain_y==homelander_y) {
                gameover = true;
            }
        }
    }

    
    //gem

    context.fillStyle = "green";
    context.fillRect(comv_x, comv_y, blocksize, blocksize);

    if(atrain_x==comv_x && atrain_y==comv_y) {
        placev();
        score += 1;
    }

    //score

    scorer.innerHTML = score;

    //wall

    if(atrain_x < 0 || atrain_y < 0 || atrain_x > (columns-1) * blocksize || atrain_y > (rows -1) * blocksize) {
        gameover = true;
    }
}

function placev() {
    comv_x = Math.floor(Math.random() * columns) * blocksize;
    comv_y = Math.floor(Math.random() * rows) * blocksize;
}

function placestar() {
    if(score>=5) {
        starlight_x = Math.floor(Math.random() * columns) * blocksize;
        starlight_y = Math.floor(Math.random() * columns) * blocksize;
    }
}

function placehome() {
    if(score>=10) {
        homelander_x = Math.floor(Math.random() * columns) * blocksize;
        homelander_y = Math.floor(Math.random() * columns) * blocksize;
        home = true;
    }
}

function changeDirection(e) {
    if(e.code=="ArrowUp") {
        speed_x = 0;
        speed_y = -1;
    }

    if(e.code=="ArrowDown") {
        speed_x = 0;
        speed_y = 1;
    }

    if(e.code=="ArrowLeft") {
        speed_x = -1;
        speed_y = 0;
    }

    if(e.code=="ArrowRight") {
        speed_x = 1;
        speed_y = 0;
    }

    if(e.code=="Space") {
        speed_x = 0;
        speed_y = 0;
    }
}

function endgame() {
    clearInterval(intervalID);
    alert("Game Over");
    return;
}