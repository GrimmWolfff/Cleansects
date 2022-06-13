import { Standing, Running, Jumping, Falling } from "./playerStates";

export default class Player {
    constructor(game) {
        this.game = game;
        this.width = 100;
        this.height = 91.3;
        this.x = 0;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.vy = 0;
        this.image = document.querySelector('#player');
        this.mass = 2;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 5;
        this.fps = 20;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
        this.speed = 0;
        this.maxSpeed = 10;
        this.states = [new Standing(this), new Running(this), new Jumping(this), new Falling(this)];
        this.currentState = this.states[0];
        this.currentState.enter();
    }
    update(input, deltaTime) {
        this.checkCollision();
        this.currentState.handleInput(input);

        this.x += this.speed;
        if(input.includes('ArrowRight')) {
            this.speed = this.maxSpeed;
        }
        else if(input.includes('ArrowLeft')) {
            this.speed = -this.maxSpeed;
        }
        else this.speed = 0;

        this.y += this.vy;
        if(!this.onGround()) {
            this.vy += this.mass;
        }
        else {
            this.vy = 0;
        }

        if(this.x < 0) this.x = 0;
        else if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;
    
        if(this.y < 0) this.y = 0;
        else if(this.y > this.game.height - this.height) {
            this.y = this.game.height - this.height
        }

        if(this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if(this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;    
        } else {
            this.frameTimer += deltaTime;
        }
    }
    draw(context) {
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }
    onGround() {
        return this.y >= this.game.height - this.height - this.game.groundMargin;
    }
    setState(state, speed) {
        this.currentState = this.states[state];
        this.game.speed = speed * this.game.maxSpeed;
        this.currentState.enter();
    }
    checkCollision() {
        this.game.enemies.map(enemy => {
            if(enemy.x < this.x + this.width && enemy.x + enemy.width > this.x && enemy.y < this.y + this.height && enemy.y + enemy.height > this.y) {
                enemy.markedForDeletion = true;
                this.game.score++;
                localStorage.setItem('Score', this.game.score);
            }
        })
    }
}