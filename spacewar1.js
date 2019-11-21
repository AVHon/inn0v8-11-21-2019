// this javascript expects something like `turtle.html` in your HTML
const desiredFrameRate = 15; // frames per second
const desiredDelay = 1000 / desiredFrameRate;
let lastFrameTime = 0;

let turtle = new Turtle();

let black = turtle.makeColor(0,0,0);
let white = turtle.makeColor(255,255,255);
let red = turtle.makeColor(255, 0, 0);

let ship = {x: 20, y: 20, angle: 0, speedX: 0, speedY: 0, throttle: 0,
color: turtle.makeColor(60,197,24), turn:0, draw: function(){
	// move and turn the ship
	ship.x += ship.speedX;
	ship.y += ship.speedY;
	ship.angle += ship.turn;

	// keep the ship inside the screen (the turtle's canvas)
	if(ship.x < 0)                    {ship.x += turtle.canvas.width;}
	if(ship.x >= turtle.canvas.width) {ship.x -= turtle.canvas.width;}
	if(ship.y < 0)                    {ship.y += turtle.canvas.height;}
	if(ship.y >= turtle.canvas.height){ship.y -= turtle.canvas.height;}

	turtle.turnTo(ship.angle); // face the way the ship is facing
	turtle.jumpTo(ship.x, ship.y); // go to where the ship is
	
	// the ship has a white outline
	turtle.setColor(turtle.makeColor(255, 255, 255));
	
	// go from the center of the ship to its edge, and draw the outline
	turtle.penUp();
	turtle.move(-3);
	turtle.penDown();
	turtle.turn(120);
	turtle.move(8);
	turtle.turn(-140);
	turtle.move(20);
	turtle.turn(-140);
	turtle.move(20);
	turtle.turn(-140);
	turtle.move(8);
	turtle.turn(-60);
	// that's it -- the outline of the ship has been drawn!
	
	// go back to the middle of the ship
	turtle.penUp();
	turtle.jumpTo(ship.x, ship.y);
	turtle.turnTo(ship.angle);

	// color the inside of the ship. Mind that the color doesn't leak out!
	turtle.setColor(ship.color);
	turtle.pour();

	// make a white mark in the middle of the ship
	turtle.setColor(white);
	turtle.tapPen();
	
	// draw the engine flames, and increase speed
	if(ship.throttle > 0){
		// use trigonometry to calculate how hard the engine pushes left-right and up-down
		ship.speedX += ship.throttle*Math.cos(ship.angle*Math.PI/180);
		ship.speedY -= ship.throttle*Math.sin(ship.angle*Math.PI/180);
		turtle.turn(180); // face the back of the ship
		turtle.move(4); // go to the back of the ship
		turtle.setColor(red);
		turtle.penDown();
		// make the flames waver
		let flameAngle = Math.random()*20 - 10;
		let flameLength = 1 + Math.random() * ship.throttle * 16;
		turtle.turn(flameAngle);
		turtle.move(flameLength); // draw the flames
	}
}};

// controls go in one of these 2 places
document.addEventListener("keydown", function(keyEvent){
	// controls that happen when you press a key
	console.log(keyEvent.key); // prints the name of the pressed key
	if(keyEvent.key == "s"){
		ship.throttle = 0.5; // start firing the engine when "s" is pressed
	} else if(keyEvent.key == "a"){
		ship.turn = 5; // turn counterclockwise (left) with a
	} else if(keyEvent.key == "d"){
		ship.turn = -5; // turn clockwise (right) with d
	}
})

document.addEventListener("keyup", function(keyEvent){
	if(keyEvent.key == "s"){
		ship.throttle = 0; // stop firing the engine when "s" is released
	} else if(keyEvent.key == "a" || keyEvent.key == "d"){
		ship.turn = 0; // stop turning when "a" or "d" is released
	}
})

let gameFrame = function(now) {
	// ask for the web browser to keep the game going
	window.requestAnimationFrame(gameFrame);
	
	// Don't let the frame rate get too high -- be kind to batteries and fans
	if(now < lastFrameTime + desiredDelay){return;}
	lastFrameTime = now;

	// game update and drawing code goes here!
	// fill the window with black
	turtle.setColor(black);
	turtle.clear();

	// draw the outline of the ship
	ship.draw();

	// put pixels on the screen -- must be last!
	turtle.show();
};
window.requestAnimationFrame(gameFrame);
