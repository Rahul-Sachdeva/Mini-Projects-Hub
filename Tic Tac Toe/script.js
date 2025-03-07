console.log("Welcome to Tic Tac Toe");
let music = new Audio("./audio/bg-music.mp3");
let move = new Audio("./audio/move.mp3");
let gamedraw = new Audio("./audio/draw.mp3");
let gamewin1 = new Audio("./audio/win1.mp3");
let gamewin2 = new Audio("./audio/win2.mp3");
let gameover = false;
let turn = "X";
let initialtransform = document.querySelector(".line").style.transform;
// Create a MediaQueryList object
var x = window.matchMedia("screen and (max-width: 950px)")

// Function to Change the Turn
const changeTurn = () => {
    return turn === "X"?"O":"X";
}

// Function to Check for a win
const checkWin = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0,1,2, 0, 5, 0, 30],
        [3,4,5, 0, 15, 0, 30],
        [6,7,8, 0, 25, 0, 30],
        [0,3,6, -10, 15, 90, 30],
        [1,4,7, 0, 15, 90, 30],
        [2,5,8, 10, 15, 90, 30],
        [0,4,8, -6.25, 14.75, 45, 42.4264],
        [2,4,6, -6.25, 14.75, 135, 42.4264]
    ]
    if(x.matches){
        wins = [
            [0,1,2, 0, 9, 0, 60],
            [3,4,5, 0, 29, 0, 60],
            [6,7,8, 0, 49, 0, 60],
            [0,3,6, -20, 30, 90, 60],
            [1,4,7, 0, 30, 90, 60],
            [2,5,8, 20, 30, 90, 60],
            [0,4,8, -12, 29.75, 45, 85],
            [2,4,6, -12, 29.75, 135, 85]
        ]
    }
    wins.forEach(e=>{
        if((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText && boxtext[e[0]].innerText !== "")){
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won";
            gameover = true;
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
            document.querySelector(".line").style.width = `${e[6]}vw`;
            gamewin1.play();
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "200px";
        }
    })
}

// Game Logic
// music.play();
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector(".boxtext");
    element.addEventListener('click', () => {
        if(boxtext.innerText === ''){
            if(!gameover){
                boxtext.innerText = turn;
                turn = changeTurn();
                move.play();
                checkWin();
                if(!gameover){
                    document.getElementsByClassName("info")[0].innerText = "Turn For " + turn;
                }
            }
        }
    })
})

// Add onClick Listener to reset Button
reset.addEventListener('click', ()=> {
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = ""
    });
    gameover=false;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px";
    gamewin1.pause();
    document.getElementsByClassName("info")[0].innerText = "Turn For X";
    turn = "X";
    document.querySelector(".line").style.transform = initialtransform;
    document.querySelector(".line").style.width = "0vw";    
})



