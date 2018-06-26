var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var resetButton = document.querySelector(".reset");
var colors = null;
var pickedColor = null;
var numberToGuess = 6;
resetButton.addEventListener("click", init);
init();

var easyButton = document.querySelector("#easy");
var hardButton = document.querySelector("#hard");
easyButton.addEventListener("click", function(){
	numberToGuess = 3
	easyButton.classList.add("selected")
	hardButton.classList.remove("selected")
	for (var i = 3; i < squares.length; i++) {
	    squares[i].style.background = "#232323";
	}
	init()
})
hardButton.addEventListener("click", function(){
    easyButton.classList.remove("selected")
	hardButton.classList.add("selected")
	numberToGuess = 6
	init()
})

function changeColors(color) {
	for (var i = 0; i < numberToGuess; i++) {
		squares[i].style.background = color;
	}
}
function pickColor() {
	var random = Math.floor(Math.random()*colors.length);
	return colors[random];
}
function generateRandomColors(num) {
	var arr = []
	for (var i = 0; i < num; i++) {
		arr.push(randomColor());
	}
	return arr;
}
function randomColor() {
	var r = Math.floor(Math.random()*256);
	var g = Math.floor(Math.random()*256);
	var b = Math.floor(Math.random()*256);
	return "rgb("+r+", "+g+", "+b+")";
}


function init(){
    colors = generateRandomColors(numberToGuess);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    resetButton.textContent = "New Color";
    messageDisplay.textContent = null;
    document.querySelector("h1").style.background = "steelblue"

    for (var i = 0; i < squares.length; i++) {
	    squares[i].style.background = colors[i];
	    squares[i].addEventListener("click", function(){
		    var clickedColor = this.style.background;
		    if (clickedColor == pickedColor) {
			    messageDisplay.textContent = "Correct!";
			    resetButton.textContent = "Play Again?";
			    changeColors(pickedColor);
			    document.querySelector("h1").style.background = clickedColor;
		    } else {
			    this.style.background = "#232323";
			    messageDisplay.textContent = "Try Again";
		    }
	    });
    }
}