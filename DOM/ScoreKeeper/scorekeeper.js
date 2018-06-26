var score1 = 0;
var score2 = 0;
var winningScore = 5;
var gameOver = false;
var playerOne = document.getElementById("p1");
var playerTwo = document.getElementById("p2");
var reset = document.getElementById("reset");
var numInput = document.querySelector("input");

numInput.addEventListener("change", function(){
	winningScore = numInput.value;
	document.querySelector("p span").textContent = winningScore;
})
playerOne.addEventListener("click", function(){
	if (!gameOver){
	    score1 += 1
	    if (score1 == winningScore) {
		    gameOver = true;
		    document.getElementById("p1Display").classList.add("winner")
	    }
	    document.getElementById("p1Display").textContent = score1;
    }
})
playerTwo.addEventListener("click", function(){
	if (!gameOver) {
		score2 += 1
		if (score2 == winningScore) {
			gameOver = true;
			document.getElementById("p2Display").classList.add("winner")
		}
        document.getElementById("p2Display").textContent = score2;
   }
})
reset.addEventListener("click", function(){
	score1 = score2 = 0;
	gameOver = false;
	document.getElementById("p2Display").classList.remove("winner")
	document.getElementById("p1Display").classList.remove("winner")
	document.getElementById("p1Display").textContent = score1;
	document.getElementById("p2Display").textContent = score2;
});