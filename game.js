const container = document.getElementById('container');
const ball = document.getElementById('ball');
const pong = document.getElementById('pong');
let posX = container.offsetWidth / 2 - ball.offsetWidth / 2;
let posY = container.offsetHeight / 2 - ball.offsetHeight / 2;
let velX = Math.random() * 10 - 5;
let velY = Math.random() * 5 + 5;
let count = 0;

let isGameOver = false;

// Set the initial paddle position
let paddleX = container.offsetWidth / 2 - 40;
const paddleY = container.offsetHeight - 20;

// Set the paddle width and height
const paddleWidth = 80;
const paddleHeight = 10;

// Set up variables to track the user input
let touchX = null;
let touchY = null;
let isTouching = false;
let isMovingLeft = false;
let isMovingRight = false;

// Listen for left and right arrow key presses
document.addEventListener("keydown", function (event) {
    if (event.code === "ArrowLeft") {
        // Move the paddle to the left
        isMovingLeft = true;
    } else if (event.code === "ArrowRight") {
        // Move the paddle to the right
        isMovingRight = true;
    }
});

// Listen for left and right arrow key releases
document.addEventListener("keyup", function (event) {
    if (event.code === "ArrowLeft") {
        // Stop moving the paddle to the left
        isMovingLeft = false;
    } else if (event.code === "ArrowRight") {
        // Stop moving the paddle to the right
        isMovingRight = false;
    }
});

// Listen for touch start events on mobile devices
container.addEventListener("touchstart", function (event) {
    // Get the touch coordinates
    touchX = event.touches[0].clientX;
    touchY = event.touches[0].clientY;
    isTouching = true;
});

// Listen for touch move events on mobile devices
container.addEventListener("touchmove", function (event) {
    // Get the touch coordinates
    touchX = event.touches[0].clientX;
    touchY = event.touches[0].clientY;
});

// Listen for touch end events on mobile devices
container.addEventListener("touchend", function (event) {
    // Reset the touch coordinates
    touchX = null;
    touchY = null;
    isTouching = false;
});

function ballMove() {
    if (isGameOver) {
        posX += velX;
        posY += velY;
        ball.style.left = posX + 'px';
        ball.style.top = posY + 'px';
        return;
    }

    posX += velX;
    posY += velY;

    if (posX + ball.offsetWidth > container.offsetWidth || posX < 0) {
        velX *= -1;
    }

    if (posY < 0) {
        velY *= -1;
    }

    // check for collision 
    if (posY + ball.offsetHeight >= paddleY &&
        posY + ball.offsetHeight <= paddleY + paddleHeight &&
        posX + ball.offsetWidth >= paddleX &&
        posX <= paddleX + paddleWidth) {
        velY *= -1;
        count++;
        counter.innerHTML = count;
        if (count == 10) {
            alert('You Won!!!!');
            reset();
        }
    }

    ball.style.left = posX + 'px';
    ball.style.top = posY + 'px';

    // check if the ball has gone below the container
    if (posY + ball.offsetHeight >= container.offsetHeight) {
        // disable collision detection 
        reset();
    }

    // Move the paddle based on user input
    if (isMovingLeft && paddleX > 0) {
        paddleX -= 10;
    } else if (isMovingRight && paddleX < container.offsetWidth - paddleWidth) {
        paddleX += 10;
    } else if (isTouching) {
        // Move the paddle based on touch input
        paddleX = touchX - (paddleWidth / 2);
    }

    // Draw the paddle on the canvas
    pong.style.left = paddleX + 'px';
}
function reset() {
    stopBall();
    isGameOver = true;
    setTimeout(() => {
        // reset game state
        posX = container.offsetWidth / 2 - ball.offsetWidth / 2;
        posY = container.offsetHeight / 2 - ball.offsetHeight / 2;
        velX = Math.random() * 10 - 5;
        velY = Math.random() * 10 - 5;
        isGameOver = false;
        count = 0;
        counter.innerHTML = count;

    }, 1000);
}
function stopBall() {
    // disable collision detection between the ball and the paddle
    pong.style.pointerEvents = 'none';
}

setInterval(ballMove, 10);