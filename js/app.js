'use strict'

// config default
let config = {
  "player": {
    "initial_X": 202,
    "initial_Y": 386
  }
}

// Default
let score = 0;
let heart = 3;
let record = 0;

// get elements by id
let showScore = document.getElementById('score');
let sessionScore = document.getElementById('session-score');
let showHeart = document.getElementById('heart');
let showRecord = document.getElementById('record');
let modalGameOver = document.getElementById('modal-gameover');
let modalInstructions = document.getElementById('modal-instructions');

// scores innerHtml defaults;
showScore.innerHTML = `${score}`;
sessionScore.innerHTML = `${score}`;
showHeart.innerHTML = `${heart}`;
showRecord.innerHTML = `${record}`;

// Added modalGameOver active
let modalGameOverActive = function () {
  sessionScore.innerHTML = `${score}`;
  showRecord.innerHTML = `${record}`;
  return modalGameOver.classList.contains('active');
} 

// Restart game
let restartGame = function () {
  score = 0;
  heart = 3;
  showScore.innerHTML = `${score}`;
  showHeart.innerHTML = `${heart}`;
  modalGameOver.classList.remove('active');
  modalInstructions.classList.remove('active');
};

// Get modalInstructions active
let modalInstructionsActive = function () {
  return modalInstructions.classList.contains('active');
}
      
// Start game
const startGame = function () {
  modalInstructions.classList.remove('active');
}

// Class for Component
class Component {
  constructor(x, y, sprite) {
    this.posX = [0, 100, 200];
    this.posY = [60, 140, 220, 300];
    this.x = this.posX[Math.floor(Math.random() * this.posX.length)];
    this.y = this.posY[Math.floor(Math.random() * this.posY.length)];
    this.sprite = sprite;
  }

  // Check colission for component
  checkCollision() {      
    return (player.x < this.x + 80 &&
            player.x + 80 > this.x &&
            player.y < this.y + 60 &&
            60 + player.y > this.y)
  }

  // Reset position for component
  resetPosition() {
    this.x = this.posX[Math.floor(Math.random() * this.posX.length)];
    this.y = this.posY[Math.floor(Math.random() * this.posY.length)];
  }

  // Render component
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

// Create Enemies
class Enemy extends Component {
  constructor(x, y, sprite, speed) {
    super(x, y, sprite);
    this.randomSpeed = [180, 300];
    this.speed = this.randomSpeed[Math.floor(Math.random() * this.randomSpeed.length)];
  }    

  update(dt) {

    // checkCollision for enemy
    if (this.checkCollision()) {
        
      // verify for heart player
      if(heart > 1) {
        heart -= 1; 
        console.log('Press enter to try again!');
        showHeart.innerHTML = `${heart}`;
        player.reset();
      } else {
        this.resetGame();
      }

    } else {
      this.x += this.speed * dt;
      if (this.x >= 505) {
        this.reset();
      }
    }
  }

  // Reset enemy
  reset() {
    this.x = -101;
    this.y = this.posY[Math.floor(Math.random() * this.posY.length)];
    this.speed = this.randomSpeed[Math.floor(Math.random() * this.randomSpeed.length)];
  } 
  
  // Reset game when dead;
  resetGame() {
    record = record;
    modalGameOver.classList.add('active');
    showHeart.innerHTML = 0;
    showScore.innerHTML = `${score}`;
    showRecord.innerHTML = `${record}`;
    player.reset();
    this.resetPosition();
  }
}

// Create class Player
class Player extends Component {
  constructor(x, y, sprite) {
    super(x, y, sprite);
    this.x = x;
    this.y = y;
  }

  update(dt) {
    if(this.y <= 0) {
      score += 10;
      if(score > record) {
        record = score;    
        showRecord.innerHTML = `${record}`;
      }
      showScore.innerHTML = `${score}`;
      this.reset();
    }
  }

  // Actions Keyboard of player
  handleInput(input) {
    if(modalGameOverActive() || modalInstructionsActive()) {
      if (input === 'up') 0;
      if (input === 'down') 0;
      if (input === 'left') 0;
      if (input === 'right') 0;
      if (input === 'enter') restartGame();
    } else {
      if (input === 'up' && this.y > 0) this.y -= 86;
      if (input === 'down' && this.y <= 380) this.y += 86;
      if (input === 'left' && this.x >= 10) this.x -= 101;
      if (input === 'right' && this.x < 400) this.x += 101;
    }
  }

  // Reset position player
  reset() {
    this.x = config.player.initial_X;
    this.y = config.player.initial_Y;
  }
}

// Class Gem 
class Gem extends Component {
  constructor(x, y, sprite) {
    super(x, y, sprite);
    this.posX = [0, 101, 202, 303, 404];
    this.posY = [60, 140, 220, 300];
  }

  update(dt) {

    // checkCollision for gem
    if(this.checkCollision()) {
      score += 100;
      if(score > record) {
        record = score;    
        showRecord.innerHTML = `${record}`;
      }
      showScore.innerHTML = `${score}`;
      this.reset();
    }
  };

  // reset gem position
  reset() {
    this.resetPosition();
  }
}

// Instantiate objects player, allEnemies and Gem
let player = new Player(config.player.initial_X, config.player.initial_Y, 'images/char-boy.png');

let allEnemies = [
  new Enemy(500, null, 'images/enemy-bug.png'),
  new Enemy(150, null, 'images/enemy-bug.png'),
  new Enemy(410, null, 'images/enemy-bug.png'),
  new Enemy(100, null, 'images/enemy-bug.png'),
  new Enemy(550, null, 'images/enemy-bug.png')
];

let gem = new Gem(100, 386, 'images/star.png');

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    13: 'enter'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
