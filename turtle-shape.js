let lary = new Turtle();

// make a color with red, green, and blue from 0 to 255
let black = lary.makeColor(0,0,0);
let white = lary.makeColor(255, 255, 255);

// use a color
lary.setColor(white);

// move and turn several times with a "for loop"
let numberOfSides = 6;
for(let index = 0; // done before any looping
    index < numberOfSides; // loop while this is true
    index = index + 1) // do after each loop
{
  lary.move(80);
  lary.turn(360/numberOfSides);
}

// move to the inside of the shape without drawing a line
lary.penUp();
lary.turn(19);
lary.move(30);

// make a color and immediately start using it
lary.setColor(lary.makeColor(128,255,0));

// fill the shape with the new color
lary.pour();

// show the result
lary.show();
