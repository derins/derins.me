var c = document.getElementById("c");
var ctx = c.getContext("2d");

//making the canvas full screen
c.height = window.innerHeight;
c.width = window.innerWidth+2000;

var font_size = 10;
var columns = c.width/font_size; //number of columns for the rain
//an array of drops - one per column
var drops = [];
//x below is the x coordinate
//1 = y co-ordinate of the drop(same for every drop initially)
for(var x = 0; x < columns; x++)
	drops[x] = 100;

//drawing the characters
function draw(){
	//Black BG for the canvas
	//translucent BG to show trail
	ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
	ctx.fillRect(0, 0, c.width, c.height);

	ctx.fillStyle = "#0F0"; //green text
	ctx.font = font_size + "px courier";
	//looping over drops
	for(var i = 0; i < drops.length; i++){
		ctx.fillText("DERIN", i*font_size, drops[i]*font_size);
		//sending the drop back to the top randomly after it has crossed the screen
		//adding a randomness to the reset to make the drops scattered on the Y axis
        if(drops[i]*font_size > c.height && Math.random() > 0.975){
    		drops[i] = 0;
        }
    	//incrementing Y coordinate
    	drops[i]++;
	}
}
var x = 0;
var rain = setInterval(draw, 40);

function stopRain(){
    $('#stop-rain').empty();
}

function scrollToName(){
	$('#pg-one').append("<div id='front-page'><br><code>It's time to hack your way in.</code><br><code id='derin'>-DERIN Serbetcioglu</code><br><br><form action='./terminal.html'><code>Nothing makes one feel so strong as a call for help. </code><br><code>-Pope Paul VI</code><br><br><button id='hack'> Click if the instructions are clear </button></form></div>");
    $('html, body').animate({
        scrollTop: $("#front-page").offset().top
    }, 2000);
    setTimeout(stopRain,2000);
}
