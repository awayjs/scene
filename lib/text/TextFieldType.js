"use strict";
/**
 * The TextFieldType class is an enumeration of constant values used in setting the
 * <code>type</code> property of the TextField class.
 *
 * @see away.entities.TextField#type
 */
var TextFieldType = (function () {
    function TextFieldType() {
    }
    return TextFieldType;
}());
/**
 * Used to specify a <code>dynamic</code> TextField.
 */
TextFieldType.DYNAMIC = "dynamic";
/**
 * Used to specify an <code>input</code> TextField.
 */
TextFieldType.INPUT = "input";
/**
 * Used to specify an <code>static</code> TextField.
 */
TextFieldType.STATIC = "input";
exports.TextFieldType = TextFieldType;
