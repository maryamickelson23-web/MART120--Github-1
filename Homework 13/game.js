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


var shapeXs = [];
var shapeYs = [];
var diameters = [];

var shapeXSpeeds = [];
var shapeYSpeeds = [];

// create a shape when the mouse is clicked
var mouseShapeXs = [];
var mouseShapeYs = [];
var mouseShapeXSpeeds = [];
var mouseShapeYSpeeds = [];

// obstacles
var obstacleXs = [];
var obstacleYs = [];
var obstacleXSpeeds = [];
var obstacleYSpeeds = [];
var obstacleSizes = [];
var obstacleTypes = []; // 0 for rectangle, 1 for triangle
var obstacleColors = []; // array of [r,g,b]

function setup()
{
    createCanvas(500, 600);
    
    // get a random speed when the it first starts
    for (var i = 0; i < 6; i++) {
        shapeXSpeeds[i] = Math.floor(Math.random() * (Math.floor(Math.random() * 5)) + 1);
        shapeYSpeeds[i] = Math.floor(Math.random() * (Math.floor(Math.random() * 5)) + 1);
        shapeXs[i] = getRandomNumber(500);
        shapeYs[i] = getRandomNumber(600);
        diameters[i] = getRandomNumber(30);
    }

    // initialize obstacles
    for (var i = 0; i < 6; i++) {
        obstacleXs.push(Math.floor(Math.random() * 400) + 50); // random x between 50-450
        obstacleYs.push(Math.floor(Math.random() * 500) + 50); // random y between 50-550
        obstacleXSpeeds.push(Math.floor(Math.random() * 4) - 2); // random speed -2 to 2, but not 0
        if (obstacleXSpeeds[i] === 0) obstacleXSpeeds[i] = 1;
        obstacleYSpeeds.push(Math.floor(Math.random() * 4) - 2);
        if (obstacleYSpeeds[i] === 0) obstacleYSpeeds[i] = 1;
        obstacleSizes.push(Math.floor(Math.random() * 60) + 20); // size 20-80
        obstacleTypes.push(Math.floor(Math.random() * 2)); // 0 or 1
        obstacleColors.push([Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)]); // random color
    }

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
     for (var i = 0; i < shapeXs.length; i++) {
        circle(shapeXs[i], shapeYs[i], diameters[i]);

    // move the shape
     shapeXs[i] += shapeXSpeeds[i];
        shapeYs[i] += shapeYSpeeds[i];
        // check to see if the shape has gone out of bounds
        if (shapeXs[i] > width) {
            shapeXs[i] = 0;
        }
        if (shapeXs[i] < 0) {
            shapeXs[i] = width;
        }
        if (shapeYs[i] > height) {
            shapeYs[i] = 0;
        }
        if (shapeYs[i] < 0) {
            shapeYs[i] = height;
        }
    }
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
    for (var i = 0; i < mouseShapeXs.length; i++) {
        mouseShapeXs[i] += mouseShapeXSpeeds[i];
        mouseShapeYs[i] += mouseShapeYSpeeds[i];
        // wrap around
        if (mouseShapeXs[i] > width) mouseShapeXs[i] = 0;
        if (mouseShapeXs[i] < 0) mouseShapeXs[i] = width;
        if (mouseShapeYs[i] > height) mouseShapeYs[i] = 0;
        if (mouseShapeYs[i] < 0) mouseShapeYs[i] = height;
        circle(mouseShapeXs[i], mouseShapeYs[i], 25);
    }
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
    // set random speeds for existing shapes
    for (var i = 0; i < mouseShapeXs.length; i++) {
        mouseShapeXSpeeds[i] = Math.floor(Math.random() * 4) - 2; // -2 to 1
        if (mouseShapeXSpeeds[i] === 0) mouseShapeXSpeeds[i] = 1;
        mouseShapeYSpeeds[i] = Math.floor(Math.random() * 4) - 2;
        if (mouseShapeYSpeeds[i] === 0) mouseShapeYSpeeds[i] = 1;
    }
    // add new shape with zero speed
    mouseShapeXs.push(mouseX);
    mouseShapeYs.push(mouseY);
    mouseShapeXSpeeds.push(0);
    mouseShapeYSpeeds.push(0);
}

function createObstacles()
{
    for (var i = 0; i < obstacleXs.length; i++) {
        fill(obstacleColors[i][0], obstacleColors[i][1], obstacleColors[i][2]);
        if (obstacleTypes[i] === 0) {
            // rectangle obstacle
            rect(obstacleXs[i], obstacleYs[i], obstacleSizes[i], obstacleSizes[i]);
        } else if (obstacleTypes[i] === 1) {
            // triangle obstacle
            triangle(obstacleXs[i], obstacleYs[i], obstacleXs[i] + obstacleSizes[i], obstacleYs[i], obstacleXs[i] + obstacleSizes[i]/2, obstacleYs[i] - obstacleSizes[i]);
        }
    }
}

function moveObstacles()
{
    for (var i = 0; i < obstacleXs.length; i++) {
        // move obstacle in straight line
        obstacleXs[i] += obstacleXSpeeds[i];
        obstacleYs[i] += obstacleYSpeeds[i];
        // wrap around screen
        if (obstacleXs[i] > width) obstacleXs[i] = 0;
        if (obstacleXs[i] < 0) obstacleXs[i] = width;
        if (obstacleYs[i] > height) obstacleYs[i] = 0;
        if (obstacleYs[i] < 0) obstacleYs[i] = height;
    }
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

function getRandomNumber(number) {
    return Math.floor(Math.random() * number) + 10;
}