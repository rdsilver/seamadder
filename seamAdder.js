// let total = 0;
// let count = 0;

function seamAdder() {
  let shouldRotate = Math.random() > .5;
  if (shouldRotate)
    rotateImage();

  img.loadPixels();

  var seam = getSeamIndex();

  // let a = millis();
  seamRemoveOrAdd(seam);
  // total += millis() - a;
  // count++;

  // if (count == 100)
  //   console.log(total/count);

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
  var currentY = 0
  pixelXY.push([currentX, currentY]);

  while(currentY < img.height) {
    let direction = Math.random();

    if (direction <= .33333)
      currentX--;
    else if (direction >= .66666)
      currentX++;

    pixelXY.push([constrain(currentX, 1, img.width-1), ++currentY]);
  }

  // Need to convert from pixelXY to rgba 
  var rgbaIndexes = []
  for (var i=0;i<pixelXY.length;i++) {
    var x = pixelXY[i][0];
    var y = pixelXY[i][1];
    var index = (x+y*img.width)*4;
    rgbaIndexes.push(index, index+1, index+2, index+3);
  }

  return rgbaIndexes;
}

function seamRemoveOrAdd(seam) {
  img.loadPixels();

  if (frameCount%2==0) {
    newPixelArray = removeSeam(seam, img.pixels);
    img = createImage(img.width-1, img.height);
  } else {
    newPixelArray = addSeam(seam, img.pixels);
    img = createImage(img.width+1, img.height);
  }

  img.loadPixels(newPixelArray);
  for(var i=0;i<newPixelArray.length;i++)  {
      img.pixels[i] = newPixelArray[i];
  }
  
  img.updatePixels();
}

function removeSeam(seam, pixels) {
    for (let i = 0; i < seam.length; i+=4) {
        let dropIndex = seam[i];
        let nextDrop = seam[i + 4];
        pixels.copyWithin(dropIndex - i, dropIndex+4, nextDrop);
    }

    return pixels.subarray(0, pixels.length - seam.length);
}

function addSeam(seam, pixels) {
  var newPixelArray = [];
  var seamIndex = 0;

  for(var i=0;i<pixels.length;i+=4) {
    if (i != seam[seamIndex]) {
      newPixelArray.push(pixels[i], pixels[i+1], pixels[i+2], 255);
    } else {
      newPixelArray.push(pixels[i], pixels[i+1], pixels[i+2], 255, pixels[i], pixels[i+1], pixels[i+2], 255);
      seamIndex+=4;
    }
  }

  return newPixelArray;
}