// Game Constants and Variable
let inputDir = {x: 0 , y:0};
const foodsound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');
let lastPaintTime = 0; 
let speed = 5;
let score = 0;
let Highscore = 0;
let SnakeArray = [
    {x : 13 , y : 15}
]
food = {x : 10 , y : 12};







// ************************************     Game Function      ****************************************


function main(ctime){  // ctime == gives current time
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;

    gameEngine();
}


function isCollide(snake){
    //  if you hit yourself
    for(let i = 1; i<SnakeArray.length; ++i){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }

    // if you hit the wall 
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }

}




function gameEngine(){

    // -------------------- part 1 : Updating the snake array and food -------------------------

    if(isCollide(SnakeArray)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x:0 , y:0};
        score = 0;
        alert("Game Over. Please reload to play again!");
        SnakeArray = [{x : 13 , y : 15}];
        musicSound.play();
    }




    // ---------- if you have eaten the food, increment the score and regenerate the food --------


    if(SnakeArray[0].y === food.y && SnakeArray[0].x === food.x){
        foodsound.play();
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore" , JSON.stringify(hiscoreval))
            hiscorebox.innerHTML = "High Score: "+hiscoreval;
        }
        scorebox.innerHTML = "Score: "+ score;
        SnakeArray.unshift({x: SnakeArray[0].x + inputDir.x , y: SnakeArray[0].y + inputDir.y})
        let a = 1; 
        let b = 18;
        food = {x: Math.round(a + (b-a)* Math.random()) , y:Math.round(a + (b-a)* Math.random())};
    }




    // ------------- Moving the Snake ----------------------------------
    for(let i = SnakeArray.length-2; i>= 0; --i){
        musicSound.play();

        SnakeArray[i+1] = {...SnakeArray[i]};
    }
    SnakeArray[0].x += inputDir.x;
    SnakeArray[0].y += inputDir.y;






    // ---------------------- part 2 : display the snake and food -----------------------------



    //  -------------- display the snake --------------------------------------
    board.innerHTML = "" ;
    SnakeArray.forEach((e,index)=>{
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){ // color of head is head and body is come from class snake
            snakeElement.classList.add("head");
        }else{
            snakeElement.classList.add("snake");
        }
        board.appendChild(snakeElement);

    })







    // --------------- display the food -----------------------------
    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}






//  ************************************     Main logic here      ************************************     

var hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore" , JSON.stringify(hiscoreval))
}else{
    hiscoreval = JSON.parse(hiscore);
    hiscorebox.innerHTML = "High Score: "+hiscore;
}


window.requestAnimationFrame(main);
window.addEventListener('keydown' , e=>{
    inputDir = {x:0 , y:1}  // Start the game
    moveSound.play();
    musicSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;


        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    
        default:
            break;
    }
})
