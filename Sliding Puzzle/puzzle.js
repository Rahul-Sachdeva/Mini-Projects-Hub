var rows = 3;
var columns = 3;

var currTile;
var otherTile; // Empty Tile

var turns = 0;

// var imgOrder = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
var imgOrder = ["4", "2", "8", "5", "1", "6", "7", "9", "3"];

window.onload = function(){
    for(let r=0; r<rows; r++){
        for(let c=0; c<columns; c++){
            // <img>
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "Images/" + imgOrder.shift() + ".jpg";
            if(tile.src.includes("3.jpg")){
                tile.style.opacity = "0%";
            }

            // Drag Functionality
            tile.addEventListener("dragstart", dragStart); // click an image to drag
            tile.addEventListener("dragover", dragOver);   // moving image around while clicked
            tile.addEventListener("dragenter", dragEnter); // dragging image onto another one
            tile.addEventListener("dragleave", dragLeave); // dragged image leaves another image
            tile.addEventListener("drop", dragDrop);       // drag an image over another image, drop the image
            tile.addEventListener("dragend", dragEnd);     // after drag drog, swap the two tiles
            
            document.getElementById("board").append(tile);
        }
    }
}

function dragStart(){
    currTile = this; // this refers to image tile being dragged
}

function dragOver(e){
    e.preventDefault();
}

function dragEnter(e){
    e.preventDefault();
}

function dragLeave(){

}

function dragDrop(){
    otherTile = this; // this refers to the image tile being dropped on
}

function dragEnd(){
    if(!otherTile.src.includes("3.jpg")){
        return;
    }
    let currCoords = currTile.id.split("-"); // Example: "0-0" -> ["0", "0"];
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = (r==r2) && (c2==c-1);
    let moveRight = (r==r2) && (c2==c+1);
    let moveUp = (r-1==r2) && (c2==c);
    let moveDown = (r+1==r2) && (c2==c);

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if(isAdjacent){
        let currImg = currTile.src;
        let otherImg = otherTile.src;
        
        currTile.src = otherImg;
        otherTile.src = currImg;
        currTile.style.opacity = "0%";
        otherTile.style.opacity = "100%";
        
        turns+=1;
        document.getElementById("turns").innerText = `${turns}`;
    }
}