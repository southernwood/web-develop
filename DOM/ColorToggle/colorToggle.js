var button = document.getElementById("colorToggle");

// var isPurple = false;
// button.addEventListener("click", function(){
// 	if (!isPurple) {
// 		document.body.style.background = "purple";
// 	}else {
// 		document.body.style.background = "white";
// 	}
// 	isPurple = !isPurple;
	
// })
button.addEventListener("click", function(){
	document.body.classList.toggle("myStyle");
})