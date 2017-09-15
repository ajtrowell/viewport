// World contains an array of entities to render.
// Each entity must have a 'render()' function
var world = []
var viewport;




function setup() {
  createCanvas(640,480);
  // Set viewport position and size:
  viewport = new Viewport(createVector(0,0), createVector(width,height) );
  world = initializeEntities();
}

function draw() {
    background(0);
    viewport.render(world);
}




// Keyboard Inputs
function keyPressed() {
  if(keyCode === LEFT_ARROW) {

  } 
  if(keyCode === RIGHT_ARROW) {

  }
  if(keyCode === UP_ARROW) {

  }
  if(keyCode === DOWN_ARROW) {

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


function initializeEntities(){
    entityArray = [];
    entityArray.push(new Planet( createVector(150,150), 50)); // Position and diameter.
    entityArray.push(new Planet( createVector(350,200), 80)); // Position and diameter.
    return entityArray;
}

