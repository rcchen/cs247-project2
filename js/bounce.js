var vy = 10; //Velocity in the y direction
var vx = 0; //Velocity in the x direction
var BALL_HEIGHT=15;
var BALL_WIDTH=15;

//These are actually set in shadowboxing.js when the canvas is initialized
var CANVAS_TOP;
var CANVAS_BOTTOM;
var CANVAS_RIGHT;
var CANVAS_LEFT;

//Moves all balls on the screen
function moveBalls() {
	$(".ball").each(function() {
		var l = $(this).offset().left + $(this).data("vx");
		var t = $(this).offset().top + $(this).data("vy");
		if (l < CANVAS_LEFT || l > CANVAS_RIGHT 
			|| t < CANVAS_TOP || t > CANVAS_BOTTOM) {
			$(this).remove();
		}
		else {
			$(this).offset({top:t, left:l });				
			if (isHit($(this))) {
				console.log("bounce");
			}
		}
	});
}

//Creates a ball at the top of the screen at a random x coordinate
function createBall() {
	var newBall = $("<div></div>");
	newBall.attr("class", "ball");
	newBall.data("vy", vy);
	newBall.data("vx", vx);
	newBall.css("height", BALL_HEIGHT+"px");
	newBall.css("width", BALL_WIDTH+"px");
	var xCoord = Math.floor(Math.random()*(CANVAS_RIGHT+1)); //random number from 0 to CANVAS_RIGHT
	newBall.css("left", xCoord);
	newBall.css("top", CANVAS_TOP);
	$('body').append(newBall);
}

function getCanvasX(ball) {
	return ball.offset().left - CANVAS_LEFT;
}

function getCanvasY(ball) {
	return ball.offset().top - CANVAS_TOP;
}

//Returns true if the ball hit a shadow, false otherwise.
//Updates the ball's data "angle" attribute.
function isHit(ball) {
	var x = getCanvasX(ball);
	var y = getCanvasY(ball);
	if (isShadow(shadow, x, y)) {
		//TODO: update shadow data
		return true;
	}
	return false;
}

function isShadow(shadow, x, y) {
	return false;
}


//Plays a sound based on the ball's attributes
function playSound(ball) {
	//TODO
}

