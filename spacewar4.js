// this javascript expects something like `turtle.html` in your HTML
const desiredFrameRate = 15; // frames per second
const desiredDelay = 1000 / desiredFrameRate;
let lastFrameTime = 0;

let turtle = new Turtle();

let black = turtle.makeColor(0,0,0);
let white = turtle.makeColor(255,255,255);
let red = turtle.makeColor(255, 0, 0);

let blackHole = {x: turtle.canvas.width/2, y: turtle.canvas.height/2};

let drawBlackHole = function(){
	turtle.jumpTo(blackHole.x, blackHole.y);
	turtle.setColor(turtle.makeColor(128,0,128));
	turtle.circle(2+Math.random()*4);
}

let blackHolePull = function(x, y, speedX, speedY){
	let distance = Math.sqrt(Math.pow(x - blackHole.x, 2) + Math.pow(y - blackHole.y, 2));
	let force = Math.min(2, 4 / distance);
	let direction = Math.atan2(blackHole.y - y, x - blackHole.x);
	//console.log(direction*180/Math.PI);
	return {speedX: speedX - Math.cos(direction) * force,
	        speedY: speedY + Math.sin(direction) * force};
}

let missiles = [];

let ship = {x: 20, y: 20, angle: 0, speedX: 0, speedY: 0, throttle: 0,
color: turtle.makeColor(60,197,24), turn:0, firing: false, draw: function(now){
	// be affected by gravity
	let acceleration = blackHolePull(ship.x, ship.y, ship.speedX, ship.speedY);
	ship.speedX = acceleration.speedX;
	ship.speedY = acceleration.speedY;

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

	// fire missile
	if(ship.firing){
		// move to the front of the ship
		turtle.jumpTo(ship.x, ship.y);
		turtle.turnTo(ship.angle);
		turtle.penUp();
		turtle.move(9);
		
		// make a missile
		let missile = ({x: turtle.getX(), y: turtle.getY(),
		                speedX: ship.speedX + Math.cos(ship.angle*Math.PI/180)*4,
		                speedY: ship.speedY - Math.sin(ship.angle*Math.PI/180)*4,
		                born: now});
		missiles.push(missile);
		
		// only fire 1 missile per button press
		ship.firing = false;
	}
}};

let drawMissiles = function(now){
	for(let i=0; i<missiles.length; i++){
		let missile = missiles.shift();
		
		// be affected by gravity
		let acceleration = blackHolePull(missile.x, missile.y, missile.speedX, missile.speedY);
		missile.speedX = acceleration.speedX;
		missile.speedY = acceleration.speedY;
		
		// figure out where the missile is now
		missile.x += missile.speedX;
		missile.y += missile.speedY;

		// keep the missile on the screen
		if(missile.x < 0)                    {missile.x += turtle.canvas.width;}
		if(missile.x >= turtle.canvas.width) {missile.x -= turtle.canvas.width;}
		if(missile.y < 0)                    {missile.y += turtle.canvas.height;}
		if(missile.y >= turtle.canvas.height){missile.y -= turtle.canvas.height;}
		
		// go to where the missile is nows
		turtle.jumpTo(missile.x, missile.y);
		
		// did the missile hit the ship?
		if(turtle.colorsEqual(turtle.getCanvasColor(), ship.color)){
			//alert("The ship got hit by a missile!");
			turtle.setColor(red);
			turtle.circle(5);
			turtle.circle(4);
			turtle.circle(3);
			return;
		}
		// draw the missile
		turtle.setColor(red);
		turtle.tapPen();
		turtle.circle(2);

		// if the missile is too old, it goes away
		if(now - missile.born < 10000){// time is in 1000'ths of a second
			missiles.push(missile);
		} 
	}
}

let stars = []

for(let i = 0; i<100; i++){
	let newStar = {x: Math.random()*turtle.canvas.width,
	               y: Math.random()*turtle.canvas.height};
	stars.push(newStar);
}

let drawStars = function(){
	turtle.setColor(white);
	for(let i=0; i<stars.length; i++){
		let star = stars[i];
		turtle.jumpTo(star.x, star.y);
		if(! turtle.colorsEqual(turtle.getCanvasColor(), ship.color)){
			turtle.tapPen();
		}
	}
}

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
	} else if(keyEvent.key == "w"){
		ship.firing = true;
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
	ship.draw(now);

	// draw the stars
	drawStars();

	// draw the missiles
	drawMissiles(now);

	// draw the black hole
	drawBlackHole();

	// put pixels on the screen -- must be last!
	turtle.show();
};
window.requestAnimationFrame(gameFrame); 
