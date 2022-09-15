//Input: Player hits start on game
//Apple generates in random spot
//Use WASD or arrow keys to move snake
//Snake is updated/grows for each time the snake eats the apple
    //Apple generates in a new spot once eaten
//Snake gets longer by removing the tail and adding to the head
//Game ends when snake runs into itself or into a wall
//Score shows how long the snake was
//Reset the game with a button

//Change speed
//Track stats like max points, avg points, etc. between games

const boardElem = document.getElementById('board');
const button = document.getElementById('game-start')
let snakeBody = [{ x:11, y: 11}]
let move = {x: 0, y: 0};
let apple = {x: 5, y: 5};
let snakeSpeed = 1;
let bodyGrow = 0;
let gameState = false;
let score = document.getElementById('score');

let start = document.getElementById("game-start").addEventListener("click", (startGame))

function createSnake(board) {
    board.innerHTML = ''
    snakeBody.forEach(body => {
        const snakeElem = document.createElement('div')
        snakeElem.style.gridRowStart = body.y
        snakeElem.style.gridColumnStart = body.x
        snakeElem.classList.add('snake')
        board.appendChild(snakeElem)
    })
  };

function placeApple() {
    const appleElem = document.createElement('div')
    appleElem.style.gridRowStart = apple.y
    appleElem.style.gridColumnStart = apple.x
    appleElem.classList.add('apple')
    board.appendChild(appleElem)
};

function moveSnake () {
    window.addEventListener('keydown', function(event) {
        if (event.key === 'w' || event.key === 'ArrowUp') {
            if (moveDirection.y === 0) {
            moveDirection = {x: 0, y: -1}
            } 
        }
        if (event.key === 's' || event.key === 'ArrowDown') {
            if (moveDirection.y === 0) {
            moveDirection = {x: 0, y: 1}
            }
        }
        if (event.key === 'a' || event.key === 'ArrowLeft') {
            if (moveDirection.x === 0) {
            moveDirection = {x: -1, y: 0}
            }
        }
        if (event.key === 'd' || event.key === 'ArrowRight') {
            if (moveDirection.x === 0) {
            moveDirection = {x: 1, y: 0}
            }
        }
    })
    return moveDirection
};

function moveSnake() {
    addSegment()
    let input = moveSnake()
    for(let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = {...snakeBody[i]}
    }
    snakeBody[0].x += input.x
    snakeBody[0].y += input.y
};

function check(food, snake) {
    return food.x === snake.x && food.y === snake.y
};

function snakeGrows(rate) {
    bodyGrow += rate
};

function addLength() {
    for(let i = 0; i < bodyGrow; i++) {
        updateScore()
        snakeBody.push({...snakeBody[snakeBody.length - 1]})
    }
    bodyGrow = 0
};

function updateScore() {
    newScore++
    score.innerText = ("Score:" + score)
};

function updateGame() {
    if (snakeEat(apple)) {
        snakeGrows(snakeGrowthRate)
    }
}

function renderGame() {
    if (gameState == true) {
        infoText.textContent = "🐍 Good Luck! 🐍"
        createSnake(board);
        placeApple(board);
        moveSnake();
    }
    gameOver();
};

let startGame = document.getElementById("StartGame").addEventListener("click", () => {
    if (gameState == false) {
        score.innerText = "Score: 0"
        moveDirection = {x: 0, y: 0}
        gameBoard.style.borderColor = "darkgray"
        gameState = true
        renderGame();
    } else {
        renderGame();
    }
});