"use strict";
/**
 * The GradientType class provides values for the <code>type</code> parameter
 * in the <code>beginGradientFill()</code> and
 * <code>lineGradientStyle()</code> methods of the flash.display.Graphics
 * class.
 */
var GradientType = (function () {
    function GradientType() {
    }
    /**
     * Value used to specify a linear gradient fill.
     */
    GradientType.LINEAR = "linear";
    /**
     * Value used to specify a radial gradient fill.
     */
    GradientType.RADIAL = "radial";
    return GradientType;
}());
exports.GradientType = GradientType;
