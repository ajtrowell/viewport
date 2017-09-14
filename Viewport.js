// Viewport class constructor
// Map sim space (in meters) to canvas space (in pixels)
// through a viewport.
function Viewport() {
    // Position and Size are in sim space, not canvas pixels.
    this.positionVector = createVector(0,0); // position of viewport center.
    this.zoom = //pixelsPerMeter
    this.sizeVector = createVector(10,10); // x,y
}

Viewport.prototype.setPosition = function(postionVector) {
    this.positionVector = positionVector;
}
Viewport.prototype.setZoom = function(pixelsPerMeter) {
    this.zoom = pixelsPerMeter;
}
Viewport.prototype.setPixelsPerMeter = function(pixelsPerMeter) {
    this.setZoom(pixelsPerMeter);
}
Viewport.prototype.setSize = function(sizeVector) {
    // Ensure render remains square. Apply consistent zoom (pixelsPerMeter) 
    // to both x and y axes.
    this.sizeVector = sizeVector; // DEBUG: Needs squarenss checking.
}
Viewport.prototype.isObjectInView = function(entity) {
    // Given entity is expected to have a positionVector property.
    // Given entity is expected to have a maxExtent() method.
    var maxExtent = entity.maxExtent();
    isWithinX = (this.positionVector.x - this.sizeVector.x <= entity.positionVector.x + maxExtent) &&
                (entity.positionVector.x - maxExtent <= this.positionVector.x + this.sizeVector.x)
    isWithinY = (this.positionVector.y - this.sizeVector.y <= entity.positionVector.x + maxExtent) &&
                (entity.positionVector.y - maxExtent <= this.positionVector.y + this.sizeVector.y)
    return isWithinX && isWithinY;
}
Viewport.prototype.render = function(entityArray) {
    // Calls entityArray[i].render() method for each 
    // item in entityArray IF it is within the viewport field of view.
    // Given entity is expected to have a maxExtent() method.
    // Given entity is expected to have a render() method.
    // Given entity is expected to have a positionVector property.
    for(entity in entityArray) {
        if( this.isObjectInView(entity) ) {
            entity.render();
        }
    }

}
