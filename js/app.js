// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png',
    this.x = 1,
    this.y = 0,
    this.speed = 5;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function() {
    this.sprite = 'images/char-boy.png',
    this.x = 5,
    this.y = 2,
    this.score = 0,
    this.lifes = 3,
    this.update = function() {
        //TODO update player properties
    },
    this.render = function() {
        //TODO render player
    },
    this.handleInput = function() {
        //TODO handle input
    },
    this.handleCollision = function() {
        //TODO handle collision
    };
};


// Now instantiate your objects.
const enemy01 = Object.create(Enemy);
const enemy02 = Object.create(Enemy);
const enemy03 = Object.create(Enemy);
const enemy04 = Object.create(Enemy);
const enemy05 = Object.create(Enemy);
const enemy06 = Object.create(Enemy);
const enemy07 = Object.create(Enemy);
// Place all enemy objects in an array called allEnemies
const allEnemies = [enemy01, enemy02, enemy03, enemy04, enemy05, enemy06, enemy07];

// Place the player object in a variable called player
const player = Player;



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
