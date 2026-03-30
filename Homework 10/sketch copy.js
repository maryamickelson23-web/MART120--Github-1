var headX = 250;
var headY = 100;
var headDirection = 1;

var bodyX = 200;
var bodyY = 185;
var bodyDirection = 3;

var size = 22;
var count = 0;
var sizeDirection = 2;

function setup() {
  createCanvas(500, 600);
}

createCanvas(500, 600);
function draw()
{
    background(120,45,78);
    textSize(22)
    text("Hello!", 10,60);

    // head
    fill(0, 200, 100);
    circle(headX,headY,175);
    headX+=headDirection;
    if(headX >= 418 || headX <= 82)
    {
        headDirection *= -1;
    }

   
    // eyes
    strokeWeight(10);
    fill(0);
    point(200,75);
    point(285,75);

    // nose
  triangle(245, 90, 250, 80, 255, 90)
    point(245,90);
    
    // mouth
    ellipse(250, 135, 70, 40)

    // hair
    line(130,175,175,50);
    line(325,50,360,175);
    line(170,50,330,50);
  line(130,180,360,180);
    // body
    fill(10, 24, 120);
    rect(200,185,100,150);
    bodyY += bodyDirection;
    if(bodyY <= 0 || bodyY >= 450 )
    {
        bodyDirection *= -1;
    }
    
    // decoration
    fill(200);
    triangle(220,320,250,220,280,320)
    // right arm
    fill(100, 100, 120);
    rect(300,195,50,10);
    // left arm
    rect(150,195,50,10);
    // left leg
    rect(200,335,10,50);
    // right leg
    rect(290,335,10,50);
    
    fill(100);
    textSize(size);
    size+= sizeDirection;
    count++;
    if(count > 5)
    {
        sizeDirection *=-1;
        count = 0;
    }
    text("Mary Mickelson",190,500 );


}