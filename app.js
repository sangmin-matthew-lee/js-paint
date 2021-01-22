const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "2c2c2c"
const CANVAS_SIZE = 700;
//To make sure the size of canvas mulnipulication?
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";                //set the defualt background of canvas
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
ctx.strokeStyle = "INITIAL_COLOR";     //line color
ctx.fillStyle = "INITIAL_COLOR";        
ctx.lineWidth = 2.5;                    //line width

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){              //Not drawing = not clicked
        ctx.beginPath();            //Begin makeing path
        ctx.moveTo(x,y);            //Move path to the (x,y)
    } else{                     //Drawing = clicked
        ctx.lineTo(x,y);            //Create line to (x,y)
        ctx.stroke();               //Stroke the line basically show the line
    }
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    const range = event.target.value;
    ctx.lineWidth = range;
}

function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    }else{
        filling = true;
        mode.innerText = "Paint";
    
    }
}

function handleClickCanvas(){
    if(filling)
    { 
        ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    }
}

function handleContextMenu(event){
    event.preventDefault();
}

function handgleSaveClick(evnet){
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaingJS[EXPORT]";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleClickCanvas);
    canvas.addEventListener("contextmenu", handleContextMenu);  //Prevent click right click
}

Array.from(colors).forEach(color => 
    color.addEventListener("click", handleColorClick));

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", handgleSaveClick);
}