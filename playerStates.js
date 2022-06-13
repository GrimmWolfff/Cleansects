const states = {
    STANDING: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3
}

class State {
    constructor(state) {
        this.state = state;
    }
}

export class Standing extends State {
    constructor(player) {
        super('STANDING');
        this.player = player;
    }
    enter() {
        this.player.frameY = 5;
        this.player.maxFrame = 4;
        this.player.frameX = 0;
    }
    handleInput(input) {
        if(input.includes('ArrowRight') || input.includes('ArrowRight')) {
            this.player.setState(states.RUNNING, 1)
        }
    }
}

export class Running extends State {
    constructor(player) {
        super('RUNNING');
        this.player = player;
    }
    enter() {
        this.player.frameY = 3;
        this.player.maxFrame = 6;
        this.player.frameX = 0;
    }
    handleInput(input) {
        if(input.includes('ArrowDown')) {
            this.player.setState(states.STANDING, 0);
        } else if(input.includes('ArrowUp')) {
            this.player.setState(states.JUMPING, 1);
        }
    }
}

export class Jumping extends State {
    constructor(player) {
        super('JUMPING');
        this.player = player;
    }
    enter() {
        if(this.player.onGround()) {
            this.player.vy -= 30;
        }
        this.player.frameY = 1;
        this.player.maxFrame = 6;
        this.player.frameX = 0;

    }
    handleInput(input) {
        if(this.player.vy > 0) {
            this.player.setState(states.FALLING, 1)
        }
    }
}

export class Falling extends State {
    constructor(player) {
        super('FALLING');
        this.player = player;
    }
    enter() {
        this.player.frameY = 2;
        this.player.maxFrame = 6;
        this.player.frameX = 0;
    }
    handleInput(input) {
        if(this.player.onGround() && this.player.speed) {
            this.player.setState(states.RUNNING, 1);
        } else if(this.player.onGround() && !this.player.speed) {
            this.player.setState(states.STANDING, 0)
        }
    }
}
