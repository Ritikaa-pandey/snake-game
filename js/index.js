//game constants and variables
let inputDir={x:0, y:0};
const foodSound = new Audio('eat.mp4');
const gameOverSound = new Audio('over.mp4');
const moveSound = new Audio('change.mp4');
let speed=5;
let score=0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}
];
food = {x: 6, y: 7};

//game function 

function main(ctime) {
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed )
    {
        return; 
    }

    lastPaintTime = ctime;
    gameEngine();
}
//snakeArr.forEach((_e, _i) => {})
function isCollide(_snake)
{
    //if you bump into yourself
    for(let i=1; i<snakeArr.length; i++)
    {
        if(_snake[i].x === _snake[0].x  &&  _snake[i].y === _snake[0].y  )
        {
            return true;
        }
    }
    //if you bump into the wall
        if(_snake[0].x >= 18 || _snake[0].x <=0 || _snake[0].y >= 18 || _snake[0].y <=0 )
        {
            return true;
        }
    
    return false;
}
function gameEngine(){
    //part1: updating the snake array and food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        //score += 1;
        //scoreBox.innerHTML="Score: "+ score;
        inputDir={x:0,y:0};
        alert("Game Over. Press Any key to play again");
        snakeArr=[{x:13, y:15}];
        score=0;


    }
    //if you have eaten the food increment the score and regenerate the food again
    if(snakeArr[0].y === food.y && snakeArr[0].x===food.x)
    { 
        foodSound.play();
        score+=1;
        if(score> highscoreVal)
        {
            highscoreVal=score;
            localStorage.setItem("highscore", JSON.stringify(highscoreVal));
            HighscoreBox.innerHTML = "HighScore: " + highscoreVal;
            
        }
        
        scoreBox.innerHTML="Score: "+ score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
         //unsfit will add element to the starting of arrray
        let a= 2;
        let b=16;
        food= {x : Math.round(a + (b-a)*Math.random()) , y : Math.round(a + (b-a)*Math.random())}; //forumla to generate random number between a to b

    }
    //moving the snake to
    for(let i=snakeArr.length - 2; i>=0; i--){
       
        snakeArr[i+1] = {...snakeArr[i]}; //... means creating new object

    }
    snakeArr[0].x +=inputDir.x;
    snakeArr[0].y +=inputDir.y;


    //part2 :display the snake and food
    board.innerHTML=" ";
    snakeArr.forEach((e, _i)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        
        if(_i === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    //display the food element
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}








//main logic
let highscore=localStorage.getItem('highscore');
if(highscore=== null) {
    highscoreVal=0;
    
    localStorage.setItem('highscore', JSON.stringify(highscoreVal));

}
else{
    highscoreVal=JSON.parse(highscore);
    HighscoreBox.innerHTML = "HighScore: " + highscore;
    
}

window.requestAnimationFrame(main);
//whenever someone will press key
window.addEventListener('keydown', e=> {
    inputDir= {x:0, y:1} //start the game, neeche ke taraf aagr koi bhi button press hoga
    moveSound.play();
    switch (e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x= 0;
            inputDir.y= -1;

            break;
        case "ArrowDown":
            console.log("arrowdown");
            inputDir.x=0;
            inputDir.y= 1;
            break;
        case "ArrowRight":
            console.log("arrowright");
            inputDir.x=1 ;
            inputDir.y= 0;

            break;
        case ("ArrowLeft"):
            console.log("arrowleft");
            inputDir.x= -1;
            inputDir.y= 0;

            break;
        default:
            break;

    }

});