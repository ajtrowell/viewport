// Viewport class constructor
// Map sim space (in meters) to canvas space (in pixels)
// through a viewport.
// Note: setZoom() and setSizeVector() should BOTH modify this.zoom and
// this.sizeVector to keep them consistent.
function Viewport(positionVector, sizeVector) {
    // Position and Size are in sim space, not canvas pixels.
    // Optional Arguments (with error checking)
    if(positionVector) { // Optional argument
        // DEBUG: Add error checking for p5.vector type
        this.positionVector = positionVector.copy();
    } else {
        this.positionVector = createVector(0,0); // position of viewport center.
    }

    if(sizeVector) { // Optional argument
        // DEBUG: Add error checking for p5.vector type
        this.sizeVector = sizeVector.copy(); // Initialization.
        this.setSizeVector(sizeVector); // Employ aspect ratio correction.
    } else {
        this.sizeVector = createVector(10,10); // x,y
        this.setSizeVector(this.sizeVector.copy()); // Employ aspect ratio correction.
        // DEBUG: Is copy required? ^
    }

    this.zoom;  //pixelsPerMeter
}

Viewport.prototype.setPosition = function(positionVector) {
    this.positionVector = positionVector.copy();
}
Viewport.prototype.setZoom = function(pixelsPerMeter) {
    this.zoom = pixelsPerMeter;
}
Viewport.prototype.setPixelsPerMeter = function(pixelsPerMeter) {
    this.setZoom(pixelsPerMeter);
}
Viewport.prototype.setSizeVector = function(sizeVector) {
    // Ensure render remains square. 
    // Apply consistent zoom (pixelsPerMeter) to both x and y axes.
    // Update this.zoom
    this.sizeVector = sizeVector.copy(); // DEBUG: Needs squarenss checking.
}
Viewport.prototype.setSize= function(widthMeters, heightMeters) {
    this.sizeVector = createVector(widthMeters, heightMeters); 
}
Viewport.prototype.isObjectInView = function(entity) {
    // Given entity is expected to have a positionVector property.
    // Given entity is expected to have a maxExtent() method.
    var maxExtent = entity.maxExtent();
    var isWithinX = (this.positionVector.x - this.sizeVector.x <= entity.positionVector.x + maxExtent) &&
                (entity.positionVector.x - maxExtent <= this.positionVector.x + this.sizeVector.x)
    var isWithinY = (this.positionVector.y - this.sizeVector.y <= entity.positionVector.x + maxExtent) &&
                (entity.positionVector.y - maxExtent <= this.positionVector.y + this.sizeVector.y)
    return isWithinX && isWithinY;
}
Viewport.prototype.render = function(entityArray) {
    // Calls entityArray[i].render() method for each 
    // item in entityArray IF it is within the viewport field of view.
    // Given entity is expected to have a maxExtent() method.
    // Given entity is expected to have a render() method.
    // Given entity is expected to have a positionVector property.
    for(let i = 0; i<entityArray.length; ++i) {
        if( this.isObjectInView(entityArray[i]) ) {
            entityArray[i].render(); // DEBUG: << needs arguments!
        }
    }

}
