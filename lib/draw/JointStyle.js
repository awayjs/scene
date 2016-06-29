"use strict";
/**
 * The JointStyle class is an enumeration of constant values that specify the
 * joint style to use in drawing lines. These constants are provided for use
 * as values in the <code>joints</code> parameter of the
 * <code>flash.display.Graphics.lineStyle()</code> method. The method supports
 * three types of joints: miter, round, and bevel, as the following example
 * shows:
 */
var JointStyle = (function () {
    function JointStyle() {
    }
    /**
     * Specifies beveled joints in the <code>joints</code> parameter of the
     * <code>flash.display.Graphics.lineStyle()</code> method.
     */
    JointStyle.BEVEL = 2;
    /**
     * Specifies mitered joints in the <code>joints</code> parameter of the
     * <code>flash.display.Graphics.lineStyle()</code> method.
     */
    JointStyle.MITER = 0;
    /**
     * Specifies round joints in the <code>joints</code> parameter of the
     * <code>flash.display.Graphics.lineStyle()</code> method.
     */
    JointStyle.ROUND = 1;
    return JointStyle;
}());
exports.JointStyle = JointStyle;
