const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const canvasSize = 400;
canvas.width = canvasSize;
canvas.height = canvasSize;

let snake = [
    { x: 160, y: 160 },
    { x: 140, y: 160 },
    { x: 120, y: 160 },
];

let food = { x: 200, y: 200 };
let dx = gridSize;
let dy = 0;
let score = 0;
let changingDirection = false;
let snakeColor = "green";
let bgColor = "white";

document.addEventListener('keydown', changeDirection);

function gameLoop() {
    if (isGameOver()) return;

    setTimeout(() => {
        changingDirection = false;
        clearCanvas();
        moveSnake();
        drawFood();
        drawSnake();
        updateScore();
        gameLoop();
    }, 200);
}

function clearCanvas() {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        generateFood();
    } else {
        snake.pop();
    }
}

function drawSnake() {
    ctx.fillStyle = snakeColor;
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function generateFood() {
    food.x = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
    food.y = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
}

function isGameOver() {
    const head = snake[0];

    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
        alert(`O'yin tugadi! Hisobingiz: ${score}`);
        resetGame();
        return true;
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            alert(`O'yin tugadi! Hisobingiz: ${score}`);
            resetGame();
            return true;
        }
    }
    return false;
}

function changeDirection(event) {
    if (changingDirection) return;
    changingDirection = true;

    if (event.key === 'ArrowUp' && dy === 0) {
        dx = 0;
        dy = -gridSize;
    } else if (event.key === 'ArrowDown' && dy === 0) {
        dx = 0;
        dy = gridSize;
    } else if (event.key === 'ArrowLeft' && dx === 0) {
        dx = -gridSize;
        dy = 0;
    } else if (event.key === 'ArrowRight' && dx === 0) {
        dx = gridSize;
        dy = 0;
    }
}

function resetGame() {
    snake = [
        { x: 160, y: 160 },
        { x: 140, y: 160 },
        { x: 120, y: 160 },
    ];
    food = { x: 200, y: 200 };
    dx = gridSize;
    dy = 0;
    score = 0;
    updateScore();
    gameLoop();
}

function updateScore() {
    document.getElementById('score').innerText = score;
}

function changeSnakeColor() {
    const colors = ["green", "blue", "purple", "orange", "pink"];
    snakeColor = colors[Math.floor(Math.random() * colors.length)];
}

function changeBackgroundColor() {
    const colors = ["white", "lightgray", "lightblue", "lightgreen", "black"];
    bgColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.backgroundColor = bgColor;
}

gameLoop();
