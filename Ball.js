const INIT_VEL = 0.025;
const VEL_INCREASE = 0.00001;

export default class Ball{
    constructor(ballElem){
        this.ballElem = ballElem;
        this.reset();
    }

    get x(){
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--x"));
    }

    set x(value){
        this.ballElem.style.setProperty("--x", value);
    }

    get y(){
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--y"));
    }

    set y(value){
        this.ballElem.style.setProperty("--y", value);
    }

    rect(){
        return this.ballElem.getBoundingClientRect();
    }

    reset(){
        this.x = 50;
        this.y = 50;
        this.dir = {x: 0};
        while (
            Math.abs(this.dir.x <= .2) 
            || Math.abs(this.dir.x >= .9)
        ){
            const heading = randomNumberBetween(0, 2 * Math.PI);
            this.dir = {x: Math.cos(heading), y: Math.sin(heading)};
        }
        this.vel = INIT_VEL;
    }

    update(delta, paddleRects){
        this.x += this.dir.x * this.vel * delta;
        this.y += this.dir.y * this.vel * delta;
        this.vel += VEL_INCREASE * delta;
        const rect = this.rect();
        if (rect.bottom >= window.innerHeight || rect.top <= 0){
            this.dir.y *= -1;
        }
        
        if (paddleRects.some(r => isCollision(r, rect))){
            this.dir.x *= -1;
        } 
    }
}  

function randomNumberBetween(min, max){
    return Math.random() * (max - min) + min;
}

function isCollision(r1, r2){
    return (r1.right >= r2.left && r1.left <= r2.right
        && r1.bottom >= r2.top && r2.bottom >= r1.top);
}