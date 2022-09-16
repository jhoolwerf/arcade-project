/*
Input: Player hits start on game
    Apple and snake generate
Use WASD or arrow keys to move snake
Snake is updated/grows for each time the snake eats the apple
    Apple generates in a new spot once eaten
    Snake gets longer by removing the tail and adding to the head
Game ends when snake runs into itself or into a wall
Score shows how long the snake was
Reset the game with a button

Bonus:
Change speed
Track stats like max points, avg points, etc. between games
*/

const boardElem = document.getElementById('board');
let snakeBody = [{x: 11, y: 11}]
let move = {x: 0, y: 0};
let apple = {x: 5, y: 5};
let snakeSpeed = 1;
let bodyGrow = 0;
let gameState = false;
let score = document.getElementById('score');

//Listener for starting a game
let gameStart = document.getElementById("game-start").addEventListener("click", () => {
    if (gameState == false) {
        score.innerText = "Score: 0"
        move = {x: 0, y: 0}
        gameState = true
        renderGame();
    } else {
        renderGame();
    }
});


//Function that places the snake on the board
function createSnake(board) {
    board.innerHTML = '';
    snakeBody.forEach(body => {
        const snakeElem = document.createElement('div')
        snakeElem.style.gridRowStart = body.y
        snakeElem.style.gridColumnStart = body.x
        snakeElem.classList.add('snake')
        board.appendChild(snakeElem)
    })
  };

//Function that places the apple on the board
function placeApple() {
    const appleElem = document.createElement('div')
    appleElem.style.gridRowStart = apple.y
    appleElem.style.gridColumnStart = apple.x
    appleElem.classList.add('apple')
    board.appendChild(appleElem)
};

//Function to move snake with player inputs
function moveSnake () {
    window.addEventListener('keydown', function(event) {
        if (event.key === 'w' || event.key === 'ArrowUp') {
            if (move.y === 0) {
            move = {x: 0, y: -1}
            } 
        }
        if (event.key === 's' || event.key === 'ArrowDown') {
            if (move.y === 0) {
            move = {x: 0, y: 1}
            }
        }
        if (event.key === 'a' || event.key === 'ArrowLeft') {
            if (move.x === 0) {
            move = {x: -1, y: 0}
            }
        }
        if (event.key === 'd' || event.key === 'ArrowRight') {
            if (move.x === 0) {
            move = {x: 1, y: 0}
            }
        }
    })
    return move
};

//Function to check if apple and snake intersect
function check(apple, snake) {
    return apple.x === snake.x && apple.y === snake.y
};

//Function to check if snake head and apple intersect
function snakeEat(position, {ignoreHead = false} = {}) {
    return snakeBody.some((segment, index) => {
        if (ignoreHead === true && index === 0) return false
        return check(segment, position)
    })
};

//Function to state where snake head is
function snakeHeadLocation() {
    return snakeBody[0]
};

//Function to add sections to snake body
function addSection() {
    addLength()
    let input = moveSnake()
    for(let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = {...snakeBody[i]}
    }
    snakeBody[0].x += input.x
    snakeBody[0].y += input.y
};

//Function to add count of snake body length
function snakeGrows(rate) {
    bodyGrow += rate
};

//Function to update score function based on snake body length
function addLength() {
    for(let i = 0; i < bodyGrow; i++) {
        updateScore()
        snakeBody.push({...snakeBody[snakeBody.length - 1]})
    }
    bodyGrow = 0
};

//Function to update score
function updateScore() {
    newScore++
    score.innerText = ("Score:" + score)
};

//Function to ensure the apple randomizes inbounds
function inBounds() {
    return (
        apple.x = Math.floor(Math.random() * 21) + 1,
        apple.y = Math.floor(Math.random() * 21 + 1)
    )
};

//Function to pick a new spot for the apple
function replantApple() {
    let replantApple
    while(replantApple == null || snakeEat(replantApple)) {
        replantApple = inBounds()
    }
    return replantApple
};

//Function to check if snake hits wall
function hitWall(check) {
    if (check.x < 1 || check.x > 24 || check.y < 1 || check.y > 24) {
        return true;
    }
};

//Function to check if snake head is intersecting body
function snakeIntersection() {
    return snakeEat(snakeBody[0], {ignoreHead: true})
};

//Function that checks conditions for game to be over
function gameOver() {
    if(hitWall(snakeHeadLocation()) || snakeIntersection()) {
        document.getElementById("game-start").innerText = "Play again?"
        gameState = false;
        restartGame();
    }
}

//Function to restart the game
function restartGame() {
    let snakeBody = [{x: 11, y: 11}]
    let move = {x: 0, y: 0};
    let apple = {x: 5, y: 5};
}

//Function to update game during play
function updateGame() {
    if (snakeEat(apple)) {
        snakeGrows(snakeGrowthRate)
        replantApple()
    }
}

//Function to check state of the board
function renderGame() {
    if (gameState == true) {
        createSnake(board);
        placeApple(board);
        addSection();
        updateGame();
    }
    gameOver();
};