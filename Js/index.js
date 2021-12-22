let cTool = "pencil";
let canvasBoard = document.querySelector("canvas");
let tool = canvasBoard.getContext("2d");
let body = document.querySelector("body");
canvasBoard.height = 4*window.innerHeight;
canvasBoard.width = window.innerWidth -200;
let undoredoTracker =[];
let trackingIndex = 0;

 // canavas board -> left  point kitna aage  hai 
 let boardLeft = canvasBoard.getBoundingClientRect().left;
 let boardTop = canvasBoard.getBoundingClientRect().top;
 let iX, iY, fX, fY;
 let drawingMode = false;
 body.addEventListener("mousedown", function (e) {
     iX = e.clientX - boardLeft;
     iY = e.clientY - boardTop;
     if (cTool == "pencil" || cTool=="eraser") {
         drawingMode = true;
         tool.beginPath();
         tool.moveTo(iX, iY);
     }
 })
 body.addEventListener("mouseup", function (e) {
     if (cTool == "pencil" || cTool == "eraser") {
         drawingMode = false;
     } else if (cTool == "rect" || cTool == "line") {
         // rect, line
         fX = e.clientX + boardLeft;
         fY = e.clientY - boardTop;
         let width = fX - iX;
         let height = fY - iY;
         if (cTool == "rect") {
             tool.strokeRect(iX, iY, width, height);
         } else if (cTool == "line") {
             tool.beginPath();
             tool.moveTo(iX, iY);
             tool.lineTo(fX, fY);
             tool.stroke();
             console.log("line tool is pending")
         }
     }
    //  for undo redo tracking
    let url = canvasBoard.toDataURL();
    undoredoTracker.push(url);
    trackingIndex = undoredoTracker.length-1;
 })
 body.addEventListener("mousemove", function (e) {
     if (drawingMode == false)
         return;

     fX = e.clientX - boardLeft;
     fY = e.clientY - boardTop;
     tool.lineTo(fX, fY);
     tool.stroke();
     iX = fX;
     iY = fY;
 });

// undo redo operations
let undo = document.querySelector("#undo");
let redo = document.querySelector("#redo");

undo.addEventListener("click",(e)=>{
    // undo krte h to index piche jaega ie dec hoga till > 0
    if(trackingIndex > 0 ){
        trackingIndex--;
    }
    let trackingObj = {
        trackValue : trackingIndex,
        undoredoTracker
    }
    let url = undoredoTracker[trackingIndex]; 
    let img = new Image();  //new image reference obj
    img.src = url;
    // this is basically addeventlistner
    img.onload = (e)=>{
        tool.drawImage(img,0,0,canvasBoard.width,canvasBoard.height);
    };
    // trackerFunction(trackingObj);
});

redo.addEventListener("click",(e)=>{
    // redo krte tym index aage bdhega ie inc hoga upto array length-1
    if(trackingIndex < undoredoTracker.length){
        trackingIndex++;
    }
    let trackingObj = {
        trackValue : trackingIndex,
        undoredoTracker
    }
    let url = undoredoTracker[trackingIndex]; 
    let img = new Image();  //new image reference obj
    img.src = url;
    // this is basically addeventlistner
    img.onload = (e)=>{
        tool.drawImage(img,0,0,canvasBoard.width,canvasBoard.height);
    };
    // trackerFunction(trackingObj);

});

function trackerFunction(trackingObj){
   let trackIndex = trackingObj.trackValue;
    let data = trackingObj.undoredoTracker;
    
    let url = data[trackIndex]; 
    let img = new Image();  //new image reference obj
    img.src = url;
    // this is basically addeventlistner
    img.onload = (e)=>{
        tool.drawImage(img,0,0,canvasBoard.width,canvasBoard.height);
    };
}






//  tool manipulatioon

 let pencil = document.querySelector("#pencil");
 let eraser = document.querySelector("#eraser");
 let rect = document.querySelector("#rect");
 let line = document.querySelector("#line");
 let options = document.querySelectorAll(".container");
 // identify -> click  -> again click
 pencil.addEventListener("click", function (e) {
     if (cTool == "pencil") {
         // second click
         // options show 
         options[0].style.display = "flex";
     }
     else {
         for (let i = 0; i < options.length; i++) {

             options[i].style.display = "none";
         }
         cTool = "pencil";
         tool.strokeStyle = currColor;
         tool.lineWidth = pencilSize;
     }
 })
 eraser.addEventListener("click", function (e) {
     if (cTool == "eraser") {
         // second click
         // options show 
         options[2].style.display = "flex";
     } else {
         // eraser.style.border = "1px solid red";
         // koi aur clicked aur usko options visible to wo remove ho jaaye 
         cTool = "eraser";
         for (let i = 0; i < options.length; i++) {
             options[i].style.display = "none";
         }
         tool.strokeStyle = "white";
         tool.lineWidth = eraserSize;
     }
 });

 rect.addEventListener("click", function (e) {
     if (cTool == "rect") {
         // second click
         // options show 
         options[1].style.display = "flex";
     } else {
         for (let i = 0; i < options.length; i++) {
             options[i].style.display = "none";
         }
         // eraser.style.border = "1px solid red";
         cTool = "rect";
         tool.strokeStyle = currColor;
         tool.lineWidth = rectSize;
     }
 });
 line.addEventListener("click", function (e) {
     if (cTool == "line") {
         // second click
         // options show 
         options[3].style.display = "flex";
     } else {
         for (let i = 0; i < options.length; i++) {
             options[i].style.display = "none";

         }
         // eraser.style.border = "1px solid red";
         cTool = "line";
         tool.strokeStyle = currColor;
         tool.lineWidth = lineSize;
     }
 });
 

 let pencilSize = 5;
 let eraserSize = 5;
 let rectSize = 5;
 let lineSize = 5;
 let sizeBoxArr = document.querySelectorAll(".size-box");
 // console.log(sizeBoxArr.length);
 sizeBoxArr[0].addEventListener("click", function (e) {
     let elems = ["size1", "size2", "size3", "size4"];
     let AlltheClasses = e.target.classList;
     let firstClass = AlltheClasses[0];
     let test = elems.includes(firstClass);
     if (test) {
         if (firstClass == "size1") {
             pencilSize = 5;
         } else if (firstClass == "size2") {
             pencilSize = 10;
         } else if (firstClass == "size3") {
             pencilSize = 15;
         } else if (firstClass == "size4") {
             pencilSize = 20;
         }
     }
     tool.pencilWidth = pencilSize;

 });
 sizeBoxArr[1].addEventListener("click", function (e) {
     let elems = ["size1", "size2", "size3", "size4"];
     let AlltheClasses = e.target.classList;
     let firstClass = AlltheClasses[0];
     let test = elems.includes(firstClass);
     if (test) {
         if (firstClass == "size1") {
             rectSize = 5;
         } else if (firstClass == "size2") {
             rectSize = 10;
         } else if (firstClass == "size3") {
             rectSize = 15;
         } else if (firstClass == "size4") {
             rectSize = 20;
         }
     }
     tool.lineWidth = rectSize;

 });
 sizeBoxArr[2].addEventListener("click", function (e) {
     let elems = ["size1", "size2", "size3", "size4"];
     let AlltheClasses = e.target.classList;
     let firstClass = AlltheClasses[0];
     let test = elems.includes(firstClass);
     if (test) {
         if (firstClass == "size1") {
             eraserSize = 5;
         } else if (firstClass == "size2") {
             eraserSize = 10;
         } else if (firstClass == "size3") {
             eraserSize = 15;
         } else if (firstClass == "size4") {
             eraserSize = 20;
         }
     }
     tool.lineWidth = eraserSize;
 });

 sizeBoxArr[3].addEventListener("click", function (e) {
     let elems = ["size1", "size2", "size3", "size4"];
     let AlltheClasses = e.target.classList;
     let firstClass = AlltheClasses[0];
     let test = elems.includes(firstClass);
     if (test) {
         if (firstClass == "size1") {
             lineSize = 5;
         } else if (firstClass == "size2") {
             lineSize = 10;
         } else if (firstClass == "size3") {
             lineSize = 15;
         } else if (firstClass == "size4") {
             lineSize = 20;
         }
     }
     tool.lineWidth = lineSize;
 }); 
 let currColor = "lightpink";
 let colorBox = document.querySelectorAll(".outer");
 colorBox[0].addEventListener("click",function(e){
     let colour = ["blue","red","green"];
     let Allthecolorclass = e.target.classList;
     let selectedClass = Allthecolorclass[1];
     let testingColor = colour.includes(selectedClass);
     if(testingColor){
         if(selectedClass =="blue"){
             tool.strokeStyle = "lightblue";
         }else if(selectedClass =="green"){
             tool.strokeStyle = "lightgreen";
         }else if(selectedClass == "red"){
             tool.strokeStyle = "lightpink";
         }
     }
 });

 colorBox[1].addEventListener("click",function(e){
     let colour = ["blue","red","green"];
     let Allthecolorclass = e.target.classList;
     let selectedClass = Allthecolorclass[1];
     let testingColor = colour.includes(selectedClass);
     if(testingColor){
         if(selectedClass =="blue"){
             tool.strokeStyle = "lightblue";
         }else if(selectedClass =="green"){
             tool.strokeStyle = "lightgreen";
         }else if(selectedClass == "red"){
             tool.strokeStyle = "lightpink";
         }
     }
 });
 colorBox[2].addEventListener("click",function(e){
     let colour = ["blue","red","green"];
     let Allthecolorclass = e.target.classList;
     let selectedClass = Allthecolorclass[1];
     let testingColor = colour.includes(selectedClass);
     if(testingColor){
         if(selectedClass =="blue"){
             tool.strokeStyle = "lightblue";
         }else if(selectedClass =="green"){
             tool.strokeStyle = "lightgreen";
         }else if(selectedClass == "red"){
             tool.strokeStyle = "lightpink";
         }
     }
 });
