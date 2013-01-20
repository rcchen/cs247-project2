var vy = 10; //Velocity in the y direction
var vx = 0; //Velocity in the x direction
var BALL_HEIGHT=15;
var BALL_WIDTH=15;

//These are actually set in shadowboxing.js when the canvas is initialized
var CANVAS_TOP;
var CANVAS_BOTTOM;
var CANVAS_RIGHT;
var CANVAS_LEFT;
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
			if (isHit($(this))) {
				bounceBall($(this));
			}
		}
	});
}

//Creates a ball at the top of the screen at a random x coordinate
function createBall() {
	var newBall = $("<div></div>");
	newBall.attr("class", "ball");
	newBall.data("vy", vy);
	vx = Math.floor(Math.random()*(10))+1; //random number from 0 to 2
	if (Math.random() > 0.5) {
		vx *=-1;
	}
	newBall.data("vx", vx);
	newBall.css("height", BALL_HEIGHT+"px");
	newBall.css("width", BALL_WIDTH+"px");
	var xCoord = Math.floor(Math.random()*(CANVAS_RIGHT+1)); //random number from 0 to CANVAS_RIGHT
	newBall.css("left", xCoord);
	newBall.css("top", CANVAS_TOP);
	$('body').append(newBall);
}


function bounceBall(ball) {
	var velocity = ball.data("vy");
}


function getCanvasX(ball) {
	return ball.offset().left - CANVAS_LEFT;
}


function getCanvasY(ball) {
	return ball.offset().top - CANVAS_TOP;
}


//Returns true if the ball hit a shadow, false otherwise.
function isHit(ball) {
	var x = getCanvasX(ball);
	var y = getCanvasY(ball);
	var vx = ball.data("vx");
	var vy = ball.data("vy");
	var isHit = false;
	//TODO: make shadow detection more accurate?
	var nw = isShadow(x, y);
	var ne = isShadow(x + BALL_WIDTH, y);
	var se = isShadow(x + BALL_WIDTH, y + BALL_HEIGHT);
	var sw = isShadow(x, y + BALL_HEIGHT);
	if ((ne && nw) || (se && sw)) {
		isHit = true;
		vy*=-1;
	}
	if ((ne && se) || (nw && sw)) {
		isHit = true;
		vx*=-1;
	}
	else if (ne || nw || se || sw) {
		isHit=true;
		vx*=-1;
		vy*=-1;
	}
	ball.data("vx", vx);
	ball.data("vy", vy);
	return isHit;
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

