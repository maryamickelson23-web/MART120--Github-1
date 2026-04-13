// x and y for my character
var characterX = 100;
var characterY = 100;
// define the key codes for each letter
var w = 87; 
var s = 83;
var a = 65;
var d = 68;

// x and y for a shape
var shapeX = 30;
var shapeY = 50;
var shapeXSpeed;
var shapeYSpeed;

// create a shape when the mouse is clicked
var mouseShapeX;
var mouseShapeY;

// obstacles
var obstacle1X = 200;
var obstacle1Y = 200;
var obstacle1XSpeed = 1;
var obstacle1YSpeed = 1;
var obstacle1Size = 50;
var obstacle2X = 300;
var obstacle2Y = 300;
var obstacle2XSpeed = -1;
var obstacle2YSpeed = -1;
var obstacle2Size = 40;

function setup()
{
    createCanvas(500, 600);
    // get a random speed when the it first starts
    shapeXSpeed = Math.floor(Math.random() * (Math.floor(Math.random() * 5)) + 1);
    shapeYSpeed = Math.floor(Math.random() * (Math.floor(Math.random() * 5)) + 1);
    createCharacter(200,350);
}

function draw()
{
    background(120,45,78);
    stroke(0);
    fill(0);
    
    // call createBorders function
    createBorders(15);

    // draw the exit
    createExit();

    //createCharacter(200,350);
    drawCharacter();
    characterMovement();


    // potential enemy
    fill(13,200,14);
    // draw the shape
    circle(shapeX, shapeY, 10);

     // get a random speed when the it first starts
     shapeXSpeed = Math.floor(Math.random() * (Math.floor(Math.random() * 5)) + 1);
     shapeYSpeed = Math.floor(Math.random() * (Math.floor(Math.random() * 5)) + 1);

    // move the shape
    shapeX += shapeXSpeed;
    shapeY += shapeYSpeed;
    // check to see if the shape has gone out of bounds
    if(shapeX > width)
    {
        shapeX = 0;
    }
    if(shapeX < 0)
    {
        shapeX = width;
    }
    if(shapeY > height)
    {
        shapeY = 0;
    }
    if(shapeY < 0)
    {
        shapeY = height;
    }

    // call moveObstacles function
    moveObstacles();

    // call createObstacles function
    createObstacles();

    // check to see if the character has left the exit
    if(characterX > width && characterY > width-50)
    {
        displayWinMessage();
    }

    // create the shape based on the mouse click
    fill(120,130,200);
    circle(mouseShapeX, mouseShapeY, 25);
}

function displayWinMessage()
{
    fill(0);
    stroke(5);
    textSize(26);
    text("You Win!", width/2-50, height/2-50);
}

function characterMovement()
{
    // handle the keys
    if(keyIsDown(w))
    {
        characterY -= 10;   
    }
    if(keyIsDown(s))
    {
        characterY += 10;   
    }
    if(keyIsDown(a))
    {
        characterX -= 10;   
        console.log("movement: " + characterX);
    }
    if(keyIsDown(d))
    {
        characterX += 10;   
    }
}
function createCharacter(x,y)
{
    characterX = x;
    characterY = y;
    console.log(characterX);
    //character
    
   // circle(characterX,characterY,25);
}

function drawCharacter()
{
    fill(23,40,123);
    circle(characterX,characterY,25);
}
function createBorders(thickness)
{
    // top border
    rect(0,0,width,thickness);
    // left border
    rect(0,0,thickness,height);
    // bottom border
    rect(0, height-thickness,width, thickness);
    // right upper border
    rect(width-thickness,0,thickness,height-50);
}

function createExit()
{
    fill(255);
    noStroke();
    textSize(16);
    text("EXIT", width-50, height-50);
}

function mouseClicked()
{
    mouseShapeX = mouseX;
    mouseShapeY = mouseY;
}

function createObstacles()
{
    // rectangle obstacle
    fill(255, 0, 0); // red
    rect(obstacle1X, obstacle1Y, obstacle1Size, obstacle1Size);

    // triangle obstacle
    fill(0, 255, 0); // green
    triangle(obstacle2X, obstacle2Y, obstacle2X + obstacle2Size, obstacle2Y, obstacle2X + obstacle2Size/2, obstacle2Y - obstacle2Size);
}

function moveObstacles()
{
    // move obstacle1 in straight line
    obstacle1X += obstacle1XSpeed;
    obstacle1Y += obstacle1YSpeed;
    // wrap around screen
    if (obstacle1X > width) obstacle1X = 0;
    if (obstacle1X < 0) obstacle1X = width;
    if (obstacle1Y > height) obstacle1Y = 0;
    if (obstacle1Y < 0) obstacle1Y = height;

    // move obstacle2 in straight line
    obstacle2X += obstacle2XSpeed;
    obstacle2Y += obstacle2YSpeed;
    // wrap around screen
    if (obstacle2X > width) obstacle2X = 0;
    if (obstacle2X < 0) obstacle2X = width;
    if (obstacle2Y > height) obstacle2Y = 0;
    if (obstacle2Y < 0) obstacle2Y = height;
}

/*
function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        characterX -= 10;
    } 
    else if (keyCode === RIGHT_ARROW) {
        characterX += 10;
    }
    else if (keyCode === UP_ARROW) {
        characterY -= 10;
    }
    else if (keyCode === DOWN_ARROW) {
        characterY += 10;
    }

  }
  */