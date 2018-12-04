function seamAdder() {
  let shouldRotate = Math.random() > .5;
  if (shouldRotate)
    rotateImage();

  img.loadPixels();

  var seam = getSeamIndex();

  console.time();
  removeSeam(seam);
  console.timeEnd();

  if (shouldRotate)
    rotateImage();
}

function rotateImage() {
  img.loadPixels();
  var newPixelArray = rotatePixelArray(img.pixels,img.width,img.height);
  img = createImage(img.height, img.width);
  img.loadPixels();
  for(var i=0;i<img.pixels.length;i++)
    img.pixels[i] = newPixelArray[i];
  img.updatePixels();
}


function getSeamIndex() {
  var pixelXY = [];
  var currentX = Math.floor(Math.random() * img.width);
  var currentY = img.height-1;
  pixelXY.push([currentX, currentY]);

  while(currentY > 0) {
    let direction = Math.random();

    if (direction <= .33333)
      currentX--;
    else if (direction >=  .66666)
      currentX++;

    pixelXY.push([constrain(currentX, 1, img.width-1), --currentY]);
  }
  
  // Need to convert from pixelXY to rgba 
  var rgbaIndexes = []
  for (var i=0;i<pixelXY.length;i++) {
    var x = pixelXY[i][0];
    var y = pixelXY[i][1];
    var index = (x+y*img.width)*4;
    rgbaIndexes.push(index+3, index+2, index+1, index);
  }

  return rgbaIndexes;
}

function removeSeam(seam) {
  img.loadPixels();

  var newPixelArray = createNewPixelArray(seam, img.pixels).reverse();

  if (frameCount % 2 == 0)
    img = createImage(img.width-1, img.height);
  else
    img = createImage(img.width+1, img.height);

  img.loadPixels(newPixelArray);
  for(var i=0;i<newPixelArray.length;i++)  {
      img.pixels[i] = newPixelArray[i];
  }
  
  img.updatePixels();
}

function createNewPixelArray(seam, pixels) {
  var newPixelArray = [];

  for(var i=pixels.length-1;i>=0;i-=4) {
    if (i != seam[0]) {
      newPixelArray.push(255, pixels[i-1], pixels[i-2], pixels[i-3]);
    } else {
      if (frameCount % 2 == 1) {
        newPixelArray.push(255, pixels[i-1], pixels[i-2], pixels[i-3], 255, pixels[i-1], pixels[i-2], pixels[i-3]);
      }
      seam.shift();
      seam.shift();
      seam.shift();
      seam.shift();
    }
  }

  return newPixelArray;
}