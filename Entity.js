// Plan class constructor
// Abstract class
function Entity(positionVector, type) {
    // set position (in sim space, in meters)
    this.positionVector = createVector(0,0);
}
Entity.prototype.maxExtent = function() {
    // Return maximum sim distance from entity 
    // center that it can become visible. Used to 
    // decide how early to render an offscreen entity.
    return 4.2;
}
Entity.prototype.render = function() {

}
Entity.prototype.update = function() {

}
