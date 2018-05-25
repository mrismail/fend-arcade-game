/**
 * Eneny class
 * @param {*} row row position
 * @param {*} col column position
 * @param {*} speed enemy movement speed
 */
var Enemy = function (row, col, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.row = row;
    this.col = col;
    this.speed = speed;
};


/**
 * Update the enemy's position
 * @param {*} dt a time delta between ticks
 */
Enemy.prototype.update = function (dt) {
    let factor = (this.speed * dt) % 5;

    if (this.col + factor > 5) {
        this.col = this.col + factor - 6;
    } else {
        this.col = this.col + factor;
    }
};

/**
 * @description Draw the enemy on the screen
 */
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.col * 101, this.row * 75);
};

/**
 * Player class
 * @param {*} row row position
 * @param {*} col column position
 */
const Player = function (row, col) {
    this.sprite = 'images/char-boy.png';
    this.row = row;
    this.col = col;
    this.score = 0;
    this.lifes = 3;
};

/**
 * @description Update player properties
 */
Player.prototype.update = function () {
    if (this.row == 0) {
        this.handleScore(false);
        congrats.classList.remove("hide");
    }
};

/**
 * @description Render player
 */
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.col * 101, this.row * 80);
};

/**
 * @description Handle input key action
 * @param {*} input key
 */
Player.prototype.handleInput = function (input) {
    if (input == 'left') {
        if (this.col != 0 && this.row != 0) {
            this.col -= 1;
        }
    } else if (input == 'up') {
        if (this.row != 0) {
            this.row -= 1;
        }
    } else if (input == 'right' && this.row != 0) {
        if (this.col != 4) {
            this.col += 1;
        }
    } else if (input == 'down' && this.row != 0) {
        if (this.row != 5) {
            this.row += 1;
        }
    } else if (input == 'reset') {
        if (this.row == 0) {
            this.reset();
        }
    }
};

/**
 * @description Reset player to start position
 */
Player.prototype.startAgain = function () {
    this.row = 5;
    this.col = 2;
};

/**
 * @description handle score manipulation
 * @param {*} isCollision
 */
Player.prototype.handleScore = function (isCollision) {
    if (isCollision) {
        this.score -= 20;
    } else {
        this.score += 40;
    }
};

/**
 * @description Reset all game stats
 */
Player.prototype.reset = function () {
    congrats.classList.add("hide");
    this.startAgain();
    this.score = 0;
    this.lifes = 3;
};


// array of enemies
const allEnemies = [new Enemy(1, 1, 2),
    new Enemy(1, 4, 2),
    new Enemy(1, 2, 3),
    new Enemy(2, 1, 4),
    new Enemy(2, 3, 1),
    new Enemy(3, 2, 2),
    new Enemy(3, 0, 3)
];

// player instance
const player = new Player(5, 2);

const congrats = document.querySelector(".win-panel");

/**
 * @description handle player collision with all enemies
 */
function checkCollisions() {
    for (let i = 0; i < allEnemies.length; i++) {
        if (player.row == Math.round(allEnemies[i].row) &&
            player.col == Math.round(allEnemies[i].col)) {
            player.handleScore(true);
            player.startAgain();
            break;
        }
    }
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'reset'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
