"use strict";
/**
 * DrawMode is an enumeration of constant values that specify the
 * DrawMode to use when drawing.
 */
var DrawMode = (function () {
    function DrawMode() {
    }
    /**
     * Used to specify to draw both strokes and fills
     */
    DrawMode.BOTH = 1;
    /**
     * Used to specify to draw strokes only
     */
    DrawMode.STROKE = 0;
    /**
     * Used to specify to draw fills only
     */
    DrawMode.FILL = 2;
    return DrawMode;
}());
exports.DrawMode = DrawMode;
