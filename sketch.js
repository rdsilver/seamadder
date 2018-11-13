var img;
var startingWidth;
var startingHeight;

function preload() {
  img = loadImage("assets/pearlEarring.jpg");
}

function setup() {
  pixelDensity(1);
  canvas = createCanvas(img.width, img.height);
  canvas.parent('sketch');
  startingWidth = img.width;
  startingHeight = img.height;
}

function draw() {
  scale(startingWidth/img.width, startingHeight/img.height);
  image(img, 0, 0);
  seamAdder();
}