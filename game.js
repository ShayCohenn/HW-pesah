const canvas = document.getElementById('container');
const ball = document.getElementById('ball');
const pong = document.getElementById('pong');
let pos = 0;

function ballMove() {
    if (parseInt(ball.style.left.substring(0, ball.style.left.length - 2)) < 640) {
        pos++;
        ball.style.left = pos + "px";
    }
}



setInterval(ballMove, 10);