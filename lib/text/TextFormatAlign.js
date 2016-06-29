"use strict";
/**
 * The TextFormatAlign class provides values for text alignment in the
 * TextFormat class.
 */
var TextFormatAlign = (function () {
    function TextFormatAlign() {
        /**
         * Constant; centers the text in the text field. Use the syntax
         * <code>TextFormatAlign.CENTER</code>.
         */
        this.CENTER = "center";
        /**
         * Constant; justifies text within the text field. Use the syntax
         * <code>TextFormatAlign.JUSTIFY</code>.
         */
        this.JUSTIFY = "justify";
        /**
         * Constant; aligns text to the left within the text field. Use the syntax
         * <code>TextFormatAlign.LEFT</code>.
         */
        this.LEFT = "left";
        /**
         * Constant; aligns text to the right within the text field. Use the syntax
         * <code>TextFormatAlign.RIGHT</code>.
         */
        this.RIGHT = "right";
    }
    return TextFormatAlign;
}());
exports.TextFormatAlign = TextFormatAlign;
