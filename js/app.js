// Enemies our player must avoid
var Enemy = function (row, col, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.row = row;
    this.col = col;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    let factor = (this.speed * dt) % 5;

    if (this.col + factor > 5) {
        this.col = this.col + factor - 6;
    } else {
        this.col = this.col + factor;
    }

    this.checkCollision();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.col * 101, this.row * 75);
};

Enemy.prototype.checkCollision = function () {

    if (Math.round(this.row) == player.row &&
        Math.round(this.col) == player.col) {
        player.handleScore(true);
        player.startAgian();
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function (row, col) {
    this.sprite = 'images/char-boy.png';
    this.row = row;
    this.col = col;
    this.score = 0;
    this.lifes = 3;

    this.update = function () {
        if (this.row == 0) {
            this.handleScore(false);
            this.startAgian();
        } else {
            this.checkCollision();
        }
    };

    this.render = function () {
        ctx.drawImage(Resources.get(this.sprite), this.col * 101, this.row * 80);
    };

    this.handleInput = function (input) {
        if (input == 'left') {
            if (this.col != 0) {
                this.col -= 1;
            }
        } else if (input == 'up') {
            if (this.row != 0) {
                this.row -= 1;
            }
        } else if (input == 'right') {
            if (this.col != 4) {
                this.col += 1;
            }
        } else if (input == 'down') {
            if (this.row != 5) {
                this.row += 1;
            }
        }
    };

    this.startAgian = function () {
        this.row = 5;
        this.col = 2;
    };

    this.handleScore = function (isCollision) {
        if (isCollision) {
            this.score -= 20;
        } else {
            this.score += 40;
        }
    };

    this.checkCollision = function () {
        allEnemies.forEach((enemy) => {
            if (this.row == Math.round(enemy.row) &&
                this.col == Math.round(enemy.col)) {
                this.startAgian();
                this.handleScore(true);
            }
        });
    };
};

const allEnemies = [new Enemy(1, 1, 2),
    new Enemy(1, 4, 2),
    new Enemy(1, 2, 3),
    new Enemy(2, 1, 4),
    new Enemy(2, 3, 1),
    new Enemy(3, 2, 2),
    new Enemy(3, 0, 3)
];

const player = new Player(5, 2);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
