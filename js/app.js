let score = 0;

// Class for Character
class Character {
    constructor(x, y, sprite) {
        this.x = x;
        this.y = y;
        this.sprite = sprite;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Create Enemy
class Enemy extends Character {
    constructor(x, y, sprite, speed) {
        super(x, y, sprite);
        this.speed = speed;
    }    

    update(dt) {
        if (this.checkCollision()) {
            console.log('YOU LOSE! Press enter to try again!');
            player.reset();
            this.reset();
        } else {
            this.x += this.speed * dt;
            if (this.x >= 500) {
                this.x = -100;
            }
        }
    }

    reset() {
        this.x = this.x;
        score = 0;
    }
  
    checkCollision() {      
        return (
            player.x < this.x + 80 &&
            player.x + 80 > this.x &&
            player.y < this.y + 60 &&
            60 + player.y > this.y)
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player extends Character {
    constructor(x, y, sprite) {
        super(x, y, sprite);
    }

    update(dt) {
        if(this.y <= 0){
            score += 1;    
            this.reset();
            console.log(`You winn! You is score: ${score}`);
        }
    }

    handleInput(input) {
        if (input === 'up') this.y -= 86;
        if (input === 'down' && this.y <= 380) this.y += 86;
        if (input === 'left' && this.x >= 10) this.x -= 100;
        if (input === 'right' && this.x < 400) this.x += 100;
    }

    reset() {
        this.x = 202;
        this.y = 386;
    }

}



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let player = new Player(202, 386, 'images/char-boy.png');
let allEnemies = [
    new Enemy(500, 60, 'images/enemy-bug.png', 300),
    new Enemy(150, 140, 'images/enemy-bug.png', 180),
    new Enemy(410, 140, 'images/enemy-bug.png', 180),
    new Enemy(100, 220, 'images/enemy-bug.png', 100),
    new Enemy(550, 220, 'images/enemy-bug.png', 100),
    new Enemy(550, 300, 'images/enemy-bug.png', 50)
];

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
