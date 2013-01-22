var IMG_SRC  = 'media/rosebowl.jpg';
var OVERLAY  = 255;   // 0 = foreground, 255 = background
var stepCounter = 0;

var stanfordImage;
var imageReady = false;
$(document).ready(function() {
    stanfordImage = new Image();
    stanfordImage.src = IMG_SRC;
    stanfordImage.height = window.innerHeight;
    stanfordImage.width = window.innerWidth;
    stanfordImage.onload = function() {
        imageReady = true;
    }
});

/*
 * In this example, we show you how to overlay the shadow information over
 * an image painted into the canvas. This function is called in a loop
 * by shadowboxing.js. It overrides the default behavior of renderShadow(),
 * which draws the shadow in black on a white canvas.
 */
function renderShadow() {
    if (!background)    // if they haven't captured a background frame
        return;

    // shadow is an array of length 4*numPixels. Each pixel
    // is an [red green blue alpha] of the shadow information.
    // RGB gives you the color, while alpha indicates opacity.
    // Background pixels are white ([255 255 255 0]) and foreground
    // shadow pixels are black ([0 0 0 0]).
    shadow = getShadowData();
    moveBalls(shadow);
    // Drawing from our image onto the canvas
		var pixels = shadow;
    shadowContext.putImageData(pixels, 0, 0);
		if (stepCounter==10) {
			console.log("step counter");
			createBall();
			stepCounter=0;
		}
		stepCounter++;
    // Loop every millisecond. Changing the freq. is a tradeoff between
    // interactivity and performance. Tune to what your machine can support.
    setTimeout(renderShadow, 0);
}