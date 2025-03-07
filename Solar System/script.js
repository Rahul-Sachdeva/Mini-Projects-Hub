
function createStars(){
    const container = document.querySelector("body");
    for(let i = 0 ; i < 1000; i++){
        const star = document.createElement("div");
        star.className = "star";
        if(i>900){
            star.style.width = "1px";
            star.style.height = "1px";
        }
        else if(i>880){
            star.style.width = "3px";
            star.style.height = "3px";
        }
        else{
            star.style.width = ".1px";
            star.style.height = ".1px";
        }

        star.style.top = Math.random()*100 + "%";
        star.style.left = Math.random()*100 + "%";

        container.appendChild(star);
    }
}

createStars();


