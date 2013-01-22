var vy = 10; //Velocity in the y direction
var vx = 0; //Velocity in the x direction
var dx = 3; //Amount that velocity changes when hitting ball in same direction
var BALL_HEIGHT=15;
var BALL_WIDTH=15;

//These are actually set in shadowboxing.js when the canvas is initialized
var CANVAS_HEIGHT;
var CANVAS_WIDTH;
var CANVAS_TOP;
var CANVAS_BOTTOM;
var CANVAS_RIGHT;
var CANVAS_LEFT;
var OVERLAY = 255;
var GRAVITY = 2;
var DRAG = 0.5;
var NUM_COLORS = 12;

//Moves all balls on the screen
function moveBalls() {
	$(".ball").each(function() {
		var l = $(this).offset().left + $(this).data("vx");
		var t = $(this).offset().top + $(this).data("vy");
		var vel = getVelocity($(this));
		if(vel>0) {
			incrementVelocity($(this),-DRAG);
		}else {
			incrementVelocity($(this), DRAG);
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
			else {
				incrementVelocity($(this),GRAVITY);
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
	//vx = 0;
	if (Math.random() > 0.5) {
		vx *=-1;
	}
	newBall.data("vx", vx);
	newBall.css("height", BALL_HEIGHT+"px");
	newBall.css("width", BALL_WIDTH+"px");
	var xCoord = Math.floor(Math.random()*(CANVAS_RIGHT+1)); //random number from 0 to CANVAS_RIGHT
	newBall.css("left", xCoord);
	newBall.css("top", CANVAS_TOP + 1);
	var index = Math.floor(xCoord / (CANVAS_WIDTH/(NUM_COLORS-1))) + 1; 
	var color = getColor(index);
	$(newBall).css('background-color', color);
	$('body').append(newBall);
}


function bounceBall(ball) {
	var velocity = ball.data("vy");
	//Change sound
	var sound;
	var offset = ball.offset().left;
	var index = Math.floor(offset / (CANVAS_WIDTH/(NUM_COLORS-1))) + 1; 
	var filename = 'note' + index;
	sound=document.getElementById(filename);
	console.log(filename);
	sound.play();
	//Change color
	var color = getColor(index);
	$(ball).css('background-color', color);
}

function getColor(index) {
	switch(index) {
		case 1: color = "#FF0000";
						return color;
		case 2: color = "#FF0095";
						return color;
		case 3: color = "#D400FF";
						return color;
		case 4: color = "#8C00FF";
						return color;
		case 5: color = "#2600FF";
						return color;
		case 6: color = "#0099FF";
						return color;
		case 7: color = "#00C8FF";
						return color;
		case 8: color = "#00FFD5";
						return color;
		case 9: color = "#00FF6A";
						return color;
		case 10: color = "#B7FF00";
						return color;
		case 11: color = "#FFBB00";
						return color;
		case 12: color = "#FF7700";
						return color;
	}
}

function getCanvasX(ball) {
	return ball.offset().left - CANVAS_LEFT;
}


function getCanvasY(ball) {
	return ball.offset().top - CANVAS_TOP;
}

function incrementVelocity(ball, increment) {
	var vy = $(ball).data("vy");
	vy += increment;
	$(ball).data("vy", vy);
}

function getVelocity(ball) {
	return $(ball).data("vy");
}

function setVelocity(ball, nw, ne, se, sw) {
	var vx = ball.data("vx");
	var vy = ball.data("vy");
	//TODO: make shadow detection more accurate?
	var isSide = false;
	if (se && sw) {	
		isSide=true;
		if (vy > 0) vy*=-1;
		//else vy-=dx;
	}
	else if (ne && nw) {	
		if (vy < 0) vy*=-1;
		//else vy+=dx;
	}
	else if (ne && se) {	
		isSide=true;
		if (vx > 0) vx*=-1;
		//else vx+=dx;
	}
	else if (nw && sw) {	
		isSide=true;
		if (vx < 0) vx*=-1;
		//else vx-=dx;
	}
	if (!isSide) {
		if (se || sw) {	
			if (vy > 0) vy*=-1;
			//else vy-=dx;
		}
		if (ne || nw) {	
			if (vy < 0) vy*=-1;
			//else vy+=dx;
		}
		if (ne || se) {	
			if (vx > 0) vx*=-1;
			else vx-=dx;
		}
		if (nw || sw) {	
			if (vx < 0) vx*=-1;
			else vx+=dx;
		}
	}	
	ball.data("vx", vx);
	ball.data("vy", vy);
}

//Returns true if the ball hit a shadow, false otherwise.
function isHit(ball) {
	var x = getCanvasX(ball);
	var y = getCanvasY(ball);
	var nw = isShadow(x, y);
	var ne = isShadow(x + BALL_WIDTH, y);
	var se = isShadow(x + BALL_WIDTH, y + BALL_HEIGHT);
	var sw = isShadow(x, y + BALL_HEIGHT);
	setVelocity(ball, nw, ne, se, sw);
	return (nw || ne || se || sw) && !(nw && ne && se && sw);
}

function isShadow(x, y) {
	var index = 4 * (x + (y * CANVAS_WIDTH));
		if (shadow.data[index]==0) return false;
		console.log("shadow");
		return true;
}

