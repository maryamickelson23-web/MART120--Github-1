// x and y for my character
var characterX = 100;
var characterY = 100;
// define the key codes for each letter
var w = 87; 
var s = 83;
var a = 65;
var d = 68;

// red triangle characters at the bottom
var redCharacter1X;
var redCharacter1Y;
var redCharacter2X;
var redCharacter2Y;
var redCharacter3X;
var redCharacter3Y;
var redCharacterWidth = 30;
var redCharacterHeight = 40;
var redCharacterSpeed = 1.2;
var caught = false;
var caughtTimer = 0;
var win = false;
var winTimer = 0;
var gameStart = true;
var playerScore = 0;
var triangleScore = 0;
var bonusScore = 0;

// x and y for a shape
var shapeX = 30;
var shapeY = 50;
var shapeXSpeed;
var shapeYSpeed;


var shapeXs = [];
var shapeYs = [];
var diameters = [];

var yellowCircleXs = [];
var yellowCircleYs = [];
var yellowCircleDiameters = [];

var shapeXSpeeds = [];
var shapeYSpeeds = [];




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


    createCharacter(50,50);
    createYellowCircles();

    // Red Triangle positioning
    redCharacter1X = 100;
    redCharacter2X = width - 130;
    redCharacter3X = width / 2 - redCharacterWidth / 2;
    redCharacter1Y = height - 15 - redCharacterHeight - 10;
    redCharacter2Y = height - 15 - redCharacterHeight - 10;
    redCharacter3Y = height - 15 - redCharacterHeight - 10;
}

function draw()
{
    background(120,120,78);

    if (gameStart) {
        fill(255);
        textSize(20);
        textAlign(CENTER, CENTER);
        text("Collect all yellow circles\nand reach the middle before the Enemy catches you!", width/2, height/2 - 10);
        textSize(14);
        text("Press any key or click to start.", width/2, height/2 + 30);
        textAlign(LEFT, BASELINE);
        return;
    }

    stroke(0);
    fill(0);
    
    // call createBorders function
    createBorders(15);

    // draw random yellow circles inside the game border
    fill(255, 204, 0);
    noStroke();
    for (var j = 0; j < yellowCircleXs.length; j++) {
        circle(yellowCircleXs[j], yellowCircleYs[j], yellowCircleDiameters[j]);
    }
    stroke(0);

    // draw the character and handle movement
    drawCharacter();
    if (!caught && !win) {
        characterMovement();
        // move the red triangle characters to chase the movable character
        moveRedTriangles();
    }

    // draw red triangle enemy
    fill(255,0,0);
    triangle(
        redCharacter1X,
        redCharacter1Y + redCharacterHeight,
        redCharacter1X + redCharacterWidth / 2,
        redCharacter1Y,
        redCharacter1X + redCharacterWidth,
        redCharacter1Y + redCharacterHeight
    );
    triangle(
        redCharacter2X,
        redCharacter2Y + redCharacterHeight,
        redCharacter2X + redCharacterWidth / 2,
        redCharacter2Y,
        redCharacter2X + redCharacterWidth,
        redCharacter2Y + redCharacterHeight
    );
    triangle(
        redCharacter3X,
        redCharacter3Y + redCharacterHeight,
        redCharacter3X + redCharacterWidth / 2,
        redCharacter3Y,
        redCharacter3X + redCharacterWidth,
        redCharacter3Y + redCharacterHeight
    );

    // keep the character from touching the outer borders
    var minX = 15 + 13;
    var maxX = width - 15 - 13;
    var minY = 15 + 13;
    var maxY = height - 15 - 13;
    characterX = constrain(characterX, minX, maxX);
    characterY = constrain(characterY, minY, maxY);

    // show score in the upper right
    fill(255);
    textSize(18);
    textAlign(RIGHT, TOP);
    text("Player: " + playerScore, width - 20, 10);
    text("Enemies: " + triangleScore, width - 20, 30);
    textAlign(LEFT, BASELINE);

    // collect bonus points from yellow circles
    if (!caught && !win) {
        checkBonusCollection();
    }

    // restart with updated score only if the character reaches the center black rectangle
    // and has collected all yellow circles
    if (!caught && !win && isCharacterOnCenterBlock() && yellowCircleXs.length === 0) {
        playerScore++;
        win = true;
        winTimer = 120;
    }
    if (win) {
        displayWinMessage();
        winTimer -= 1;
        if (winTimer <= 0) {
            resetGame();
        }
    }

    // show caught message and restart if the red triangles touch the character
    if (!caught && !win && isCharacterCaught()) {
        caught = true;
        caughtTimer = 90;
        triangleScore++;
    }
    if (caught) {
        displayCaughtMessage();
        caughtTimer -= 1;
        if (caughtTimer <= 0) {
            resetGame();
        }
    }

    // potential enemy
    fill(13,200,14);
     for (var i = 0; i < shapeXs.length; i++) {
        circle(shapeXs[i], shapeYs[i], diameters[i]);

        if (!caught) {
            // move the shape
            shapeXs[i] += shapeXSpeeds[i];
            shapeYs[i] += shapeYSpeeds[i];
        }
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

   
}

function displayWinMessage()
{
    fill(0);
    stroke(5);
    textSize(26);
    text("You Win!", width/2-50, height/2-50);
}

function displayCaughtMessage()
{
    fill(0);
    stroke(5);
    textSize(24);
    text("Oh No! You Got Caught!", width/2-170, 40);
}

function isCharacterOnCenterBlock()
{
    var centerSize = 80;
    var centerX = width / 2 - centerSize / 2;
    var centerY = height / 2 - centerSize / 2;
    var buffer = 13;

    return characterX > centerX - buffer &&
           characterX < centerX + centerSize + buffer &&
           characterY > centerY - buffer &&
           characterY < centerY + centerSize + buffer;
}

function isCharacterCaught()
{
    var charRadius = 13;
    var left1 = redCharacter1X - charRadius;
    var right1 = redCharacter1X + redCharacterWidth + charRadius;
    var top1 = redCharacter1Y - charRadius;
    var bottom1 = redCharacter1Y + redCharacterHeight + charRadius;

    var left2 = redCharacter2X - charRadius;
    var right2 = redCharacter2X + redCharacterWidth + charRadius;
    var top2 = redCharacter2Y - charRadius;
    var bottom2 = redCharacter2Y + redCharacterHeight + charRadius;

    var left3 = redCharacter3X - charRadius;
    var right3 = redCharacter3X + redCharacterWidth + charRadius;
    var top3 = redCharacter3Y - charRadius;
    var bottom3 = redCharacter3Y + redCharacterHeight + charRadius;

    return (characterX > left1 && characterX < right1 && characterY > top1 && characterY < bottom1) ||
           (characterX > left2 && characterX < right2 && characterY > top2 && characterY < bottom2) ||
           (characterX > left3 && characterX < right3 && characterY > top3 && characterY < bottom3);
}

function resetGame()
{
    caught = false;
    caughtTimer = 0;
    win = false;
    winTimer = 0;
    createCharacter(50,50);
    createYellowCircles();
    redCharacter1X = 100;
    redCharacter2X = width - 130;
    redCharacter3X = width / 2 - redCharacterWidth / 2;
    redCharacter1Y = height - 15 - redCharacterHeight - 10;
    redCharacter2Y = height - 15 - redCharacterHeight - 10;
    redCharacter3Y = height - 15 - redCharacterHeight - 10;
}

function checkBonusCollection()
{
    var charRadius = 13;
    for (var i = yellowCircleXs.length - 1; i >= 0; i--) {
        var dx = characterX - yellowCircleXs[i];
        var dy = characterY - yellowCircleYs[i];
        var distance = Math.sqrt(dx * dx + dy * dy);
        var circleRadius = yellowCircleDiameters[i] / 2;

        if (distance < charRadius + circleRadius) {
            bonusScore++;
            yellowCircleXs.splice(i, 1);
            yellowCircleYs.splice(i, 1);
            yellowCircleDiameters.splice(i, 1);
        }
    }
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

function moveRedTriangles()
{
    var dx1 = characterX - redCharacter1X;
    var dy1 = characterY - redCharacter1Y;
    var distance1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
    if (distance1 > 0) {
        redCharacter1X += (dx1 / distance1) * redCharacterSpeed;
        redCharacter1Y += (dy1 / distance1) * redCharacterSpeed;
    }

    var dx2 = characterX - redCharacter2X;
    var dy2 = characterY - redCharacter2Y;
    var distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
    if (distance2 > 0) {
        redCharacter2X += (dx2 / distance2) * redCharacterSpeed;
        redCharacter2Y += (dy2 / distance2) * redCharacterSpeed;
    }

    var dx3 = characterX - redCharacter3X;
    var dy3 = characterY - redCharacter3Y;
    var distance3 = Math.sqrt(dx3 * dx3 + dy3 * dy3);
    if (distance3 > 0) {
        redCharacter3X += (dx3 / distance3) * redCharacterSpeed;
        redCharacter3Y += (dy3 / distance3) * redCharacterSpeed;
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

function keyPressed()
{
    if (gameStart) {
        gameStart = false;
    }
}

function mousePressed()
{
    if (gameStart) {
        gameStart = false;
    }
}

function drawCharacter()
{
    fill(23,40,100);
    circle(characterX,characterY,25);
}
function createBorders(thickness)
{
    fill(0,255,0);
    // outer borders
    rect(0,0,width,thickness);
    rect(0,0,thickness,height);
    rect(0, height-thickness,width, thickness);
    rect(width-thickness,0,thickness,height);

    // inner square with openings on left and right sides
    var innerSize = 260;
    var innerX = (width - innerSize) / 2;
    var innerY = (height - innerSize) / 2;
    var gapSize = 100;
    var sideHeight = (innerSize - gapSize) / 2;

    // top inner border
    rect(innerX, innerY, innerSize, thickness);
    // bottom inner border
    rect(innerX, innerY + innerSize - thickness, innerSize, thickness);

    // left inner border segments
    rect(innerX, innerY, thickness, sideHeight);
    rect(innerX, innerY + sideHeight + gapSize, thickness, sideHeight);

    // right inner border segments
    rect(innerX + innerSize - thickness, innerY, thickness, sideHeight);
    rect(innerX + innerSize - thickness, innerY + sideHeight + gapSize, thickness, sideHeight);

    // centered solid black rectangle inside the inner square
    fill(0);
    var centerSize = 80;
    var centerX = width / 2 - centerSize / 2;
    var centerY = height / 2 - centerSize / 2;
    rect(centerX, centerY, centerSize, centerSize);
}

function createYellowCircles()
{
    yellowCircleXs = [];
    yellowCircleYs = [];
    yellowCircleDiameters = [];

    for (var i = 0; i < 3; i++) {
        var diameter = Math.floor(Math.random() * 30) + 20;
        var radius = diameter / 2;
        var minX = 15 + radius;
        var maxX = width - 15 - radius;
        var minY = 15 + radius;
        var maxY = height - 15 - radius;

        yellowCircleDiameters[i] = diameter;
        yellowCircleXs[i] = Math.floor(Math.random() * (maxX - minX)) + minX;
        yellowCircleYs[i] = Math.floor(Math.random() * (maxY - minY)) + minY;
    }
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

function getRandomNumber(number) {
    return Math.floor(Math.random() * number) + 10;
}