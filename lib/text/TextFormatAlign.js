"use strict";
/**
 * The TextFormatAlign class provides values for text alignment in the
 * TextFormat class.
 */
var TextFormatAlign = (function () {
    function TextFormatAlign() {
    }
    return TextFormatAlign;
}());
/**
 * Constant; centers the text in the text field. Use the syntax
 * <code>TextFormatAlign.CENTER</code>.
 */
TextFormatAlign.CENTER = "center";
/**
 * Constant; justifies text within the text field. Use the syntax
 * <code>TextFormatAlign.JUSTIFY</code>.
 */
TextFormatAlign.JUSTIFY = "justify";
/**
 * Constant; aligns text to the left within the text field. Use the syntax
 * <code>TextFormatAlign.LEFT</code>.
 */
TextFormatAlign.LEFT = "left";
/**
 * Constant; aligns text to the right within the text field. Use the syntax
 * <code>TextFormatAlign.RIGHT</code>.
 */
TextFormatAlign.RIGHT = "right";
exports.TextFormatAlign = TextFormatAlign;
