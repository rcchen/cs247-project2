var vy = 10;
var vx = 0;
var CANVAS_TOP = 0;
var CANVAS_BOTTOM = 500;
var CANVAS_RIGHT = 800;
var CANVAS_LEFT = 0;
var OVERLAY = 255;

//Moves all balls on the screen
function moveBalls() {
	$(".ball").each(function() {
		var l = $(this).offset().left + $(this).data("vx");
		var t = $(this).offset().top + $(this).data("vy");
		if(isShadow($(this).offset().left,$(this).offset().top)){
			console.log('shadow collision');
		}else {
			console.log('false');
		}
		if (l < CANVAS_LEFT || l > CANVAS_RIGHT 
			|| t < CANVAS_TOP || t > CANVAS_BOTTOM) {
			$(this).remove();
		}
		else {
			$(this).offset({top:t, left:l });				
		}
	});
}

//Creates a ball at the top of the screen at a random x coordinate
function createBall() {
	var newBall = $("<div></div>");
	newBall.attr("class", "ball");
	newBall.data("vy", vy);
	newBall.data("vx", vx);
	var xCoord = Math.floor(Math.random()*(CANVAS_RIGHT+1)); //random number from 0 to CANVAS_RIGHT
	newBall.css("left", xCoord);
	$('body').append(newBall);
}

//Returns true if the ball hit a shadow, false otherwise.
//Updates the ball's data "angle" attribute.
function isHit(ball) {
	//TODO
}

//Plays a sound based on the ball's attributes
function playSound(ball) {
	//TODO
}

function isShadow(x, y) {
	var index = 4 * (x + y * CANVAS_RIGHT);
	if (shadow.data[index] == OVERLAY && shadow.data[index+1] == OVERLAY && shadow.data[index+2] == OVERLAY) {
		return false;
	}
	return true;	
}

