const gravity = 0.4;
const fly = -8;
const pipe_Height = 300;
const bird_X = 50;
let bird_1_img, bird_2_img,bird_1,bird_2;
let pipes =[];
let score =0;
const audio = document.getElementById('audio');

function preload(){
    bird_1_img = loadImage('https://image.flaticon.com/icons/svg/528/528076.svg');
    bird_2_img = loadImage('https://image.flaticon.com/icons/svg/1582/1582161.svg');
}

function setup(){
    createCanvas(500, 600);
    bird1= new Bird(bird_1_img);
    bird2= new Bird(bird_2_img);
    pipes.push(new Pipe());
    imageMode(CENTER);
}

function draw(){
    background(255);
    for(let i= pipes.length - 1; i>0; i--){
        const pipe = pipes[i];
        pipe.update();
        pipe.draw();
        if(bird1.hits(pipe) ){
            pipes.splice(0, pipes.length - 1 );
            score = 0;
            bird1.y = random(height);
        }
        if(bird2.hits(pipe)){
            pipes.splice(0, pipes.length - 1 );
            score = 0;
            bird2.y = random(height);
        }
        if(pipe.isOffscreen()){
            pipes.splice(i, 1);

        }
    }
    bird1.update();
    bird1.draw();
    bird2.update();
    bird2.draw();
    if(frameCount % 80 === 0){
        pipes.push(new Pipe());
    }
    fill(50);
    textSize(20);
    text(`Score: ${score}`, width - 90, 30);

}

function keyPressed(){
    if(key ==='j'){
        bird1.fly();
    }
    else if(key === 'k'){
        bird2.fly();
    }
}
class Bird {
    constructor(bird_img){
        this.x = bird_X;
        this.y = Math.random(height);
        this.size = 40;
        this.bird_img = bird_img;
        this.yVelocity = 0;
    }
    update(){
        this.yVelocity +=gravity;
        this.y +=this.yVelocity;
        // TODO: endgame!!
        if (this.y + this.size / 2 > height) {
            this.y = height - this.size / 2;
            this.yVelocity = 0;

        }
        if (this.yVelocity > 10) {
            this.yVelocity = 10;

        }
        if (this.yVelocity < -10) {
            this.yVelocity = -10;
		
        }
    }
    fly(){
        this.yVelocity += fly;

    }
    hits(pipe){
        if(this.y - this.size / 2 < pipe.top || this.y + this.size / 2 > pipe.bottom){
                if(this.x + this.size / 2 > pipe.x && this.x - this.size / 2 < pipe.x + pipe.width){
                    return true;
                }
        }
        return false;


    }
    draw(){
        fill(255, 0, 100);
        noStroke();
        // circle(this.x, this.y, this.size, this.size);
        image(this.bird_img, this.x, this.y, this.size, this.size);
    }
}

class Pipe{
    constructor(){
        this.x = width;
	    this.top = Math.random() * height - 100;
        this.bottom = this.top + pipe_Height;
        this.width = 40;
        this.incrementScore = false;
    }
    update(){
        this.x -= 3;
        if (this.x + this.width / 2 < bird_X){
            if (!this.incrementScore) {
                score++;
                this.incrementScore = true;
                audio.play();
            }
        }
    }
    isOffscreen() {
        return this.x + this.width < 0;
    }
    
    draw() {
        fill('#2ecc71');
        rect(this.x, 0, this.width, this.top);
        rect(this.x, this.bottom, this.width, height);
    }
}

