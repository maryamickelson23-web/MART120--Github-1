var headX = 200;
var headY = 200;
var headDirection = 1;

var neckX = 170;
var neckY = 300;
var neckDirection = 3;

var bodyX = 170;
var bodyY = 300;
var bodyDirection = 3;

var size = 22;
var count = 0;
var sizeDirection = 2;

var eyeX = 150;
var eyeY = 200;
var eyeSpeed = 0;
var eye2Y = 200;
var eye2Speed = 0;

var titleSize = 22;
var titleDirection = 0.5;
var titleStepCount = 0;

var noseOffsetX = 0;
var noseOffsetY = 0;
var noseDirX = 2;
var noseDirY = 2;

var eyeColor = 0;
var eye2Color = 0;
var headColor = 0;
var neckColor = 0;
var noseColor = 0;

function setup() {
  createCanvas(400, 400);
  eyeSpeed = random(2, 6);
  eye2Speed = random(2, 6);
}

function draw()
{
  background(220);

  // moving left eye along the x axis at a random speed
  eyeX += eyeSpeed;
  if (eyeX >= width - 15 || eyeX <= 15) {
    eyeSpeed *= -1;
    eyeColor = color(random(255), random(255), random(255));
  }

  // moving right eye along the y axis at a random speed
  eye2Y += eye2Speed;
  if (eye2Y >= height - 15 || eye2Y <= 15) {
    eye2Speed *= -1;
    eye2Color = color(random(255), random(255), random(255));
  }

  //head
  fill(headColor);
  ellipse(headX,headY,200)
  headX+=headDirection;
    if(headX >= 418 || headX <= 82)
    {
        headDirection *= -1;
        headColor = color(random(255), random(255), random(255));
    }

  // eyes
    fill(eyeColor);
    circle(eyeX, eyeY, 30);
    fill(eye2Color);
    circle(250, eye2Y, 30);
  // Style the next points.

  strokeWeight(10.5);
  point(eyeX, eyeY);
  point(250, eye2Y);
  //nose
  noseOffsetX += noseDirX;
  noseOffsetY += noseDirY;
  if (noseOffsetX >= 50 || noseOffsetX <= -50) {
    noseDirX *= -1;
    noseColor = color(random(255), random(255), random(255));
  }
  if (noseOffsetY >= 50 || noseOffsetY <= -50) {
    noseDirY *= -1;
    noseColor = color(random(255), random(255), random(255));
  }
    fill(noseColor);
    triangle(180 + noseOffsetX, 240 + noseOffsetY, 200 + noseOffsetX, 200 + noseOffsetY, 220 + noseOffsetX, 240 + noseOffsetY)
  //smile
  arc(200, 250, 90, 70, HALF_PI, PI)
  arc(200, 250, 90, 70, 0, HALF_PI)
  // hair
    line(90,400,100,150);
  line(340,410,290,140);
  line(100, 150, 280, 150)
  //neck
  fill(neckColor);
  square(170, neckY, 80, 30)
  neckY += neckDirection;
    if(neckY <= 0 || neckY >= 450 )
    {
        neckDirection *= -1;
        neckColor = color(random(255), random(255), random(255));
    }

  
    textSize(22);
    textSize(22);
    text("Mary Mickelson",130,90 );
    titleSize += titleDirection;
    titleStepCount++;
    if (titleStepCount >= 10) {
      titleDirection *= -1;
      titleStepCount = 0;
    }
    textSize(titleSize);
    text("Self Portrait",140, 60);
            }