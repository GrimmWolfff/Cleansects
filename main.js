import './style.css';
import Player from './player';
import Inputhandler from './inputs';
import { Background } from './background';
import { FlyingEnemy, GroundEnemy, ClimbingEnemy } from './enemies';
import UI from './UI';

window.addEventListener('load', () => {
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 1000;
  canvas.height = 500;

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.groundMargin = 80;
      this.speed = 0;
      this.maxSpeed = 3;
      this.background = new Background(this)
      this.player = new Player(this);
      this.input = new Inputhandler();
      this.ui = new UI(this);
      this.enemies = [];
      this.enemyTimer = 0;
      this.enemyInterval = 1000;
      this.fontColor = 'black';
      this.score = 0;
    }
    update(deltaTime) {
      this.background.update();
      this.player.update(this.input.keys, deltaTime);
      
      if(this.enemyTimer > this.enemyInterval) {
        this.addEnemy();
        this.enemyTimer = 0;
      } else {
        this.enemyTimer += deltaTime;
      }
      this.enemies.map(enemy => {
        enemy.update(deltaTime)
      })
    }
    draw(context) {
      this.background.draw(context);
      this.player.draw(context);
      this.enemies.map(enemy => {
        enemy.draw(context)
        if(enemy.markedForDeletion) this.enemies.splice(this.enemies.indexOf(enemy), 1)
      })
      this.ui.draw(context);
    }
    addEnemy() {
      if(this.speed > 0 && Math.random() < 0.5) {
        this.enemies.push(new GroundEnemy(this))
      } else if(this.speed > 0) {
        this.enemies.push(new ClimbingEnemy(this))
      }
      this.enemies.push(new FlyingEnemy(this))
    }
  }
  const game = new Game(canvas.width, canvas.height);

  let lastTime = 0;

  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw(ctx);
    requestAnimationFrame(animate);
  }
  animate(0);
})
