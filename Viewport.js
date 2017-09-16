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

    if (!this.zoom) {
        this.zoom = 1;  //pixelsPerMeter
    }
}

Viewport.prototype.setPosition = function(positionVector) {
    this.positionVector = positionVector.copy();
}
Viewport.prototype.setZoom = function(pixelsPerMeter) {
    this.zoom = pixelsPerMeter;
    this.sizeVector = createVector(width / pixelsPerMeter, height / pixelsPerMeter);
}
Viewport.prototype.setPixelsPerMeter = function(pixelsPerMeter) {
    this.setZoom(pixelsPerMeter);
}
Viewport.prototype.setSizeVector = function(sizeVector) {
    // sizeVector(x,y) components denote the MINIMUM allowed visible extend 
    // along the given dimention.  This will be achieved while maintaining the 
    // correct aspect ratio.
   
    // Verify that argument is a p5.Vector
    // Ensure render remains square. 
    // Apply consistent zoom (pixelsPerMeter) to both x and y axes.
    // Update this.zoom

    // Calculate new zoom level. Initialize.
    var zoomX = this.zoom;
    var zoomY = this.zoom;
    if (sizeVector.x == 0 && sizeVector.y == 0) {
        // Invalid inputs. Do nothing.
        alert("Error: Invalid inputs to Viewport.setSizeVector()");
    } else if(sizeVector.x != 0 && sizeVector.y == 0) {
        zoomX = width  / sizeVector.x;
        this.setZoom(zoomX);
    } else if(sizeVector.x == 0 && sizeVector.y != 0) {
        zoomY = height / sizeVector.y;
        this.setZoom(zoomY);
    } else {
        zoomX = width  / sizeVector.x;
        zoomY = height / sizeVector.y;

        // Applies the wider of the two zoom levels.
        if(zoomX <= zoomY) {
            this.setZoom(zoomX);
        } else {
            this.setZoom(zoomY);
        }
    }
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
    pixelsPerMeter = this.zoom;
    // Calculate offsets from top left corner:
    pixelOffsetFromTopLeft = createVector(
            this.positionVector.x * pixelsPerMeter - width/2,
            this.positionVector.y * pixelsPerMeter - height/2);
    // Render each entity, if it is in the field of view.
    for(let i = 0; i<entityArray.length; ++i) {
        if( this.isObjectInView(entityArray[i]) ) {
            entityArray[i].render(pixelOffsetFromTopLeft.copy(), pixelsPerMeter); 
        }
    }

}
