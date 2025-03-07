// Game Constants
let inputDir = {x: 0, y: 0};
let speed = 5;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15, rotate: 0}
]
let Pscore = 0;
food = {x:6, y:7};

// Game Functions
function main(ctime){
    document.querySelector('.head').style.transform = `rotate(${snakeArr[0].rotate}deg)`;
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snakeArr){
    // if You bump into yourself
    for(let i = 1; i<snakeArr.length; i++){
        if(snakeArr[i].x===snakeArr[0].x && snakeArr[i].y === snakeArr[0].y){
            return true;
        }
    }
    if(snakeArr[0].x>18 || snakeArr[0].x<=0 || snakeArr[0].y>18 || snakeArr[0].y<=0){
        return true;
    }
    return false;
}

function gameEngine(){
    // Part 1: Updating the snake array & Food
    if(isCollide(snakeArr)){
        inputDir = {x: 0, y: 0};
        alert("Game Over. Press any key to Play Again");
        snakeArr = [{x: 13, y: 15}];
        Pscore = 0;
        score.innerHTML="Score: "+Pscore;
        speed = 5;
    }
    
    // If you have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        Pscore+=1;
        score.innerHTML="Score: "+Pscore;
        speed+=0.2;
        console.log("score:", score);
        console.log("hiscoreval:", hiscoreval);
        if(isNaN(hiscoreval) || Pscore>hiscoreval){
            console.log("New high score achieved!");
            hiscoreval=Pscore;
            localStorage.setItem("hiscore", hiscoreval);
            hiscoreBox.innerHTML = "High Score: "+hiscoreval;
        }
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y, rotate: snakeArr[0].rotate});
        document.querySelector('.head').style.transform = `rotate(${snakeArr[0].rotate}deg)`;
        let a = 1;
        let b = 17;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())};
    }

    // Moving the snake
    for(let i=snakeArr.length - 2; i>=0; i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 2: Display the snake and Food
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        // class add for css
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // Display the Food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

// Main logic starts here
let hiscore = localStorage.getItem("hiscore");
let hiscoreval;
console.log(hiscore);

if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", hiscoreval.toString());
} else {
    hiscoreval = parseInt(hiscore);
    if(isNaN(hiscoreval)){
        hiscoreval=0;
    }
    console.log(hiscoreval);
    localStorage.setItem("hiscore", hiscoreval.toString());
}
// Now, you can use hiscoreval variable
hiscoreBox.innerHTML = "High Score: " + hiscoreval;

window.requestAnimationFrame(main);

window.addEventListener('keydown', e => {
    inputDir = {x: 0, y:1} // Start the Game
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            snakeArr[0].rotate = 180;
            console.log(snakeArr[0].rotate);

            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            snakeArr[0].rotate = 0;
            console.log(snakeArr[0].rotate);

            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            snakeArr[0].rotate = 270;
            console.log(snakeArr[0].rotate);

            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            snakeArr[0].rotate = 90;
            console.log(snakeArr[0].rotate);

            inputDir.x = -1;
            inputDir.y = 0;
            break;            
    }
    document.querySelector('.head').style.transform = `rotate(${snakeArr[0].rotate}deg)`;

})




