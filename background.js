class Layer {
    constructor(game, width, height, speedModifier, image) {
        this.game = game;
        this.width = width;
        this.height = height;
        this.speedModifier = speedModifier;
        this.image = image;
        this.x = 0;
        this.y = 0;
    }
    update() {
        if(this.x < -this.width) this.x = 0;
        else this.x -= this.game.speed * this.speedModifier;
    }
    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
}

export class Background {
    constructor(game) {
        this.game = game;
        this.width = 1440;
        this.height = 500;
        this.layer1Image = document.querySelector('#layer1'); 
        this.layer2Image = document.querySelector('#layer2'); 
        this.layer3Image = document.querySelector('#layer3'); 
        this.layer4Image = document.querySelector('#layer4'); 
        this.layer5Image = document.querySelector('#layer5'); 
        this.layer1 = new Layer(this.game, this.width, this.height, 0.2, this.layer1Image);
        this.layer2 = new Layer(this.game, this.width, this.height, 0.4, this.layer2Image);
        this.layer3 = new Layer(this.game, this.width, this.height, 0.6, this.layer3Image);
        this.layer4 = new Layer(this.game, this.width, this.height, 0.8, this.layer4Image);
        this.layer5 = new Layer(this.game, this.width, this.height, 1, this.layer5Image);
        this.backgroundLayers = [this.layer1,this.layer2,this.layer3,this.layer4,this.layer5];
    }
    update() {
        this.backgroundLayers.map(layer => {
            layer.update();
        }) 
    }
    draw(context) {
        this.backgroundLayers.map(layer => {
            layer.draw(context);
        }) 
    }
}