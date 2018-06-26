<<<<<<< HEAD
/**
 * Created by sensen on 2017-07-09.
 */
const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');

let baseSize = 5;
ctx.strokeStyle = "blue";
ctx.lineCap = "round";
ctx.lineJoin = "round";
ctx.lineWidth = baseSize;

let timer = new Date();
let lastX = 0;
let lastY = 0;
let isDrawing = false;
let isColorful = false;
let hue = 0;

let rect = canvas.getBoundingClientRect();

function draw(event) {
    if (!isDrawing) return;
    if (isColorful) {
        ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
        hue++;
    }
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    lastX = event.offsetX;
    lastY = event.offsetY;
}

window.addEventListener("mousedown", (event)=>{
    lastX = event.offsetX;
    lastY = event.offsetY;

    if (event.x > rect.left && event.x < rect.right && event.y > rect.top && event.y < rect.bottom) {
        isDrawing = true;
        mousedownTime = Date.now()
    }


});
function onColorChange(event) {
    isColorful = false;
    ctx.strokeStyle = event.target.id;
    isDrawing = false;
}
function onSizeChange(event){
    baseSize = event.target.value;
    ctx.lineWidth = baseSize;
}

function onClearAll() {
    if (window.confirm("Do you want to clear your drawing?")){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

function onSetColorFul(event) {
    isColorful = true;
}

function saveImage() {
    var ua = window.navigator.userAgent;

    if (ua.indexOf("Chrome") > 0) {
        // save image as png
        var link = document.createElement('a');
        link.download = "test.png";
        link.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        link.click();
    }
    else {
        alert("Please use Chrome");
    }
}


window.addEventListener("mousemove", draw);
window.addEventListener("mouseup", ()=> {
    isDrawing = false;
    ctx.lineWidth = baseSize;
});
window.addEventListener("mouseout", ()=> isDrawing = false);
=======
/**
 * Created by sensen on 2017-07-09.
 */
const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');

let baseSize = 5;
ctx.strokeStyle = "blue";
ctx.lineCap = "round";
ctx.lineJoin = "round";
ctx.lineWidth = baseSize;

let timer = new Date();
let lastX = 0;
let lastY = 0;
let isDrawing = false;
let isColorful = false;
let hue = 0;

let rect = canvas.getBoundingClientRect();

function draw(event) {
    if (!isDrawing) return;
    if (isColorful) {
        ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
        hue++;
    }
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    lastX = event.offsetX;
    lastY = event.offsetY;
}

window.addEventListener("mousedown", (event)=>{
    lastX = event.offsetX;
    lastY = event.offsetY;

    if (event.x > rect.left && event.x < rect.right && event.y > rect.top && event.y < rect.bottom) {
        isDrawing = true;
        mousedownTime = Date.now()
    }


});
function onColorChange(event) {
    isColorful = false;
    ctx.strokeStyle = event.target.id;
    isDrawing = false;
}
function onSizeChange(event){
    baseSize = event.target.value;
    ctx.lineWidth = baseSize;
}

function onClearAll() {
    if (window.confirm("Do you want to clear your drawing?")){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

function onSetColorFul(event) {
    isColorful = true;
}

function saveImage() {
    var ua = window.navigator.userAgent;

    if (ua.indexOf("Chrome") > 0) {
        // save image as png
        var link = document.createElement('a');
        link.download = "test.png";
        link.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        link.click();
    }
    else {
        alert("Please use Chrome");
    }
}


window.addEventListener("mousemove", draw);
window.addEventListener("mouseup", ()=> {
    isDrawing = false;
    ctx.lineWidth = baseSize;
});
window.addEventListener("mouseout", ()=> isDrawing = false);
>>>>>>> 288500ca4f16a0dc475471171ae86f593b98798d
