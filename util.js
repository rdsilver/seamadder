function createArray(length) {
  var arr = new Array(length || 0),
      i = length;

  if (arguments.length > 1) {
      var args = Array.prototype.slice.call(arguments, 1);
      while(i--) arr[length-1 - i] = createArray.apply(this, args);
  }

  return arr;
}

function rotatePixelArray(pixelArray,w,h) {
  var rotatedArray = [];

  for (var x=0;x<w;x++) {
    for(var y=0;y<h;y++) {
      index = (x+y*w)*4;
      rotatedArray.push(pixelArray[index]);
      rotatedArray.push(pixelArray[index+1]);
      rotatedArray.push(pixelArray[index+2]);
      rotatedArray.push(pixelArray[index+3]);
    }
  }

  return new Uint8ClampedArray(rotatedArray);
}

function timeTaken(func) {
  func();
}