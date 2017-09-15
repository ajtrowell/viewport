// Planet class constructor
// positionVector is a p5.vector designating the center of the planet in 
// game space (meters)
// diameter is the planets diameter, in meters.
function Planet(positionVector, diameter) {
    // Position and Size are in sim space, not canvas pixels.
    // Optional Arguments (with error checking)
    if(positionVector) { // Optional argument
        // DEBUG: Add error checking for p5.vector type
        this.positionVector = positionVector.copy();
    } else {
        this.positionVector = createVector(0,0); // position of viewport center.
    }

    if(diameter) { // Optional argument
        this.diameter = diameter;
    } else {
        this.diameter = 10; // Default diameter.
    }
}
Planet.prototype.maxExtent = function() {
    // Return maximum sim distance from entity 
    // center that it can become visible. Used to 
    // decide how early to render an offscreen entity.
    return this.diameter/2;
}
Planet.prototype.render = function(pixelOffsetFromTopLeft, pixelsPerMeter) {
    // Optional Arguments
    if(pixelOffsetFromTopLeft) { // Optional argument
        // DEBUG: Add error checking for p5.vector type
        // otherwise, do nothing. We have a value.
    } else { // Default value if none was given.
        pixelOffsetFromTopLeft = createVector(0,0);
    }

    // Optional Arguments
    if(!pixelsPerMeter) { // If optional argument not defined:
        pixelsPerMeter = 1;
    }

    // Display
    push()
    fill(10,200,10); // Green
    ellipse(this.positionVector.x*pixelsPerMeter,this.positionVector.y*pixelsPerMeter,
            this.diameter*pixelsPerMeter, this.diameter*pixelsPerMeter);
    pop()
}
Planet.prototype.update = function() {

}
