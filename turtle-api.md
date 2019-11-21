# Turtle Graphics

An implementation of [turtle graphics](https://en.wikipedia.org/wiki/Turtle_graphics) on the HTML5 Canvas in pure Javascript.

## What is a turtle?

You can't draw on your computer screen (not without permanent marker, anyway), so this is a turtle who can do it for you.

The turtle is an imaginary creature who can be told to move in straight lines, and to turn.  
You can tell the turtle to travel certain distances, and turn certain angles, in sequence, to trace any shape you want.

The turtle carries around a pen.
As the turtle crawls around, the pen drags on the canvas, leaving behind lines.

You can tell the turtle to change the color of the pen's ink.  
This does not change the color of already-drawn lines, but new lines will be in the new color.

You can tell the turtle to pick the pen up, so that it does not leave a line behind while moving.  
The pen can be set down later to make new lines somewhere else.

The turtle can also pour ink out of the pen and onto the canvas.  
The ink spreads into a big puddle, replacing whatever color was underneath the turtle.  
This is a nice way to color in shapes once they have been outlined.

You can ask the turtle what the color underneath it is.  
The turtle can also tell you whether any two colors are the same or not.  
This is a good way to tell if you have already drawn something there.

## How to Use Turtles

### Setting up Turtles in pure HTML

In your HTML, have a canvas with `id="turtleCanvas"`.  
Then, paste the contents of `turtle.js` to the top of your javascript.

### Setting up Turtles in jsbin.com

Remove everything from your jsbin's HTML tab.

Copy everything from `turtle.html` and put it into your jsbin's HTML tab.

Write your turtle-using javascript code in your jsbin's Javascript tab.

### Making a turtle draw

Make a `Turtle` object and save it to a variable.

`let larry = new Turtle();`

By default, the turtle is in the middle of the canvas,  
facing to the right, has its pen down, and draws in black.  

Make color objects with `Turtle.makeColor()` and use them with `Turtle.setColor()`.

```
let brightGreen = larry.makeColor(0,255,0);
larry.setColor(brightGreen);
```

or `larry.setColor(larry.makeColor(0,255,0));`

Then, make the turtle do some stuff.

```
larry.move(100);
larry.turn(90);
larry.penUp();
larry.move(100);
larry.circle(30);
larry.pour();
```

Lastly, **you must make the turtle show its results**.

`larry.show()`

## Methods

This is a list of everything a turtle can do.

### Turtle()

Makes, and returns, a new turtle.  
Only works properly if there is a canvas with `id="turtleCanvas"`.

### debug()

Prints the turtle's x and y coordinates,  
angle, and color, and the valid range for each.

### makeColor(red, green, blue)

Given three numbers from 0 to 255,  
returns an object with the red, green, and blue values.  
These kinds of objects are used by `setColor()`.

### setColor(color)

Given a color object like what `makeColor()` makes.  
Sets the color that the turtle draws with.

### getColor()

Returns the turtle's current color as a color object.

### getCanvasColor()

Returns the color of the pixel the turtle is over, as a color object.

### colorsEqual(color1, color2)

Returns `true` if the colors are the same, `false` otherwise.

### penDown()

Calling this method causes the turtle to leave a colored trail when it `move()`s.

### penUp()

Calling this method causes the turtle to leave no trail when it `move()`s.

### tapPen()

Makes a colored dot where the turtle is, without changing whether the pen is up or down.

### show()

Puts the turtle's drawing onto the canvas.  
If this is not called after all drawing, the canvas will be unchanged.

### pour()

Similar to the 'paint bucket' tool in many digital drawing programs.  
Whatever color the turtle is currently over,  
fills the connected area of that color with the turtle's color.  
Useful for coloring in solid outlines.

### clear()

Fills the entire canvas with the turtle's color,  
wiping out any existing drawings.

Good to call at the beginning of your game loop.

### turn(degrees)

Changes which way the turtle is facing.  
Positive angles turn the turtle counterclockwise;  
Negative angles turn it clockwise.  
360 degrees flips the turtle exactly all the way around,  
facing the same way it was before.

### turnTo(degrees)

Sets the turtle's angle.  
Initially, the turtle's angle is 0.  
0 degrees is right, 90 degrees is down, 180 degrees is left, and 270 degrees is up.  
Any number can be used for the angle;  
the turtle will convert it to be between 0 and 360.

### getAngle()

Returns the turtle's angle, between 0 and 360 degrees.

### move(distance)

Makes the turtle move `distance` pixels in its current direction.  
If `penDown()`, draws a line along the way.

### moveTo(x, y)

Makes the turtle move to pixel location (x, y).  
If `penDown()`, draws a line along the way.

### jumpTo(x, y)

Teleports the turtle to be on top of pixel (x, y).  
No trail is left behind, regardless of `penDown()`.

### getLocation()

Returns an object of {x, y} with the turtle's current pixel coordinates.

### getX()

Returns the x location of the turtle.

### getY()

Returns the y location of the turtle.

### circle(radius)

Draws a circle, with the radius specified in pixels, around the turtle.  
The turtle does not change direction or location.  
The circle is drawn regardless of `penDown()`.
