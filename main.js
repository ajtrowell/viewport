// World contains an array of entities to render.
// Each entity must have a 'render()' function
var world = []
var viewport;






function setup() {
  //createCanvas(640,480);
  createCanvasFullScreenFixedResolution(800,600)
  // Set viewport position and size:
  viewport = new Viewport(createVector(0,0), createVector(width,height) );
  world = initializeEntities();
}

function draw() {
    background(0);
    // Center on first planet:
    viewport.positionVector = world[0].positionVector.copy();
    viewport.setZoom(1);
    viewport.setSizeVector(createVector(700,10));
    viewport.render(world);
}




// Keyboard Inputs
function keyPressed() {
  if(keyCode === LEFT_ARROW) {
    world[0].positionVector.add(-5,0);
  } 
  if(keyCode === RIGHT_ARROW) {
    world[0].positionVector.add(5,0);
  }
  if(keyCode === UP_ARROW) {
    viewport.setZoom(viewport.zoom * 1.2);
  }
  if(keyCode === DOWN_ARROW) {
    viewport.setZoom(viewport.zoom / 1.2);
  }
}
function keyReleased() {
  if(keyCode === LEFT_ARROW) {

  } 
  if(keyCode === RIGHT_ARROW) {

  }
  if(keyCode === UP_ARROW) {

  }
  if(keyCode === DOWN_ARROW) {

  }
}




//function windowResized() {
//  if (autoResize) {
//    resizeCanvas(windowWidth, windowHeight);
//  }
//}

function createCanvasFullScreenFixedResolution(maxWidth,maxHeight) {
    // Must be run in the p5.js setup function.
    var widthSetting;
    var heightSetting;

    if( maxWidth/maxHeight >= windowWidth/windowHeight) {
        var heightSetting = maxHeight;
        var widthSetting = heightSetting*windowWidth/windowHeight;
    } else {
        var widthSetting = maxWidth;
        var heightSetting = widthSetting*windowHeight/windowWidth;
    }
    
    widthSetting = Math.round(widthSetting);
    heightSetting = Math.round(heightSetting);

    const canvasElt = createCanvas(widthSetting, heightSetting).elt;
    canvasElt.style.width = '100%', canvasElt.style.height = '100%';
    return canvasElt;
}



function initializeEntities(){
    entityArray = [];
    entityArray.push(new Planet( createVector(150,150), 50)); // Position and diameter.
    entityArray.push(new Planet( createVector(350,200), 80)); // Position and diameter.
    return entityArray;
}

