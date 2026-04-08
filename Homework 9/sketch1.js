function setup() {
  createCanvas(400, 400);
}

function draw()
{
background(220);
  //head
  ellipse(200,200,200)
  // eyes
    circle(150,200,30);
    circle(250,200,30);
  // Style the next points.

  strokeWeight(10.5);
  point(150, 200);
  point(250, 200);
  //nose
    triangle(180,240,200,200,220,240)
  //smile
  arc(200, 250, 90, 70, HALF_PI, PI)
  arc(200, 255, 90, 60, 0, HALF_PI)
  // hair
    line(90,400,100,150);
  line(340,410,290,140);
  line(100, 150, 280, 150)
  //neck
  square(170, 300, 80, 30)
  
    textSize(22);
    text("Mary Mickelson",130,90 );
    text("Self Portrait",140, 60);
            }