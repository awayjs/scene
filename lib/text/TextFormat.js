"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AssetBase_1 = require("@awayjs/core/lib/library/AssetBase");
/**
 * The TextFormat class represents character formatting information. Use the
 * TextFormat class to create specific text formatting for text fields. You
 * can apply text formatting to both static and dynamic text fields. The
 * properties of the TextFormat class apply to device and embedded fonts.
 * However, for embedded fonts, bold and italic text actually require specific
 * fonts. If you want to display bold or italic text with an embedded font,
 * you need to embed the bold and italic variations of that font.
 *
 * <p> You must use the constructor <code>new TextFormat()</code> to create a
 * TextFormat object before setting its properties. When you apply a
 * TextFormat object to a text field using the
 * <code>TextField.defaultTextFormat</code> property or the
 * <code>TextField.setTextFormat()</code> method, only its defined properties
 * are applied. Use the <code>TextField.defaultTextFormat</code> property to
 * apply formatting BEFORE you add text to the <code>TextField</code>, and the
 * <code>setTextFormat()</code> method to add formatting AFTER you add text to
 * the <code>TextField</code>. The TextFormat properties are <code>null</code>
 * by default because if you don't provide values for the properties, Flash
 * Player uses its own default formatting. The default formatting that Flash
 * Player uses for each property(if property's value is <code>null</code>) is
 * as follows:</p>
 *
 * <p>The default formatting for each property is also described in each
 * property description.</p>
 */
var TextFormat = (function (_super) {
    __extends(TextFormat, _super);
    /**
     * Creates a TextFormat object with the specified properties. You can then
     * change the properties of the TextFormat object to change the formatting of
     * text fields.
     *
     * <p>Any parameter may be set to <code>null</code> to indicate that it is
     * not defined. All of the parameters are optional; any omitted parameters
     * are treated as <code>null</code>.</p>
     *
     * @param font        The name of a font for text as a string.
     * @param size        An integer that indicates the size in pixels.
     * @param color       The color of text using this text format. A number
     *                    containing three 8-bit RGB components; for example,
     *                    0xFF0000 is red, and 0x00FF00 is green.
     * @param bold        A Boolean value that indicates whether the text is
     *                    boldface.
     * @param italic      A Boolean value that indicates whether the text is
     *                    italicized.
     * @param underline   A Boolean value that indicates whether the text is
     *                    underlined.
     * @param url         The URL to which the text in this text format
     *                    hyperlinks. If <code>url</code> is an empty string, the
     *                    text does not have a hyperlink.
     * @param target      The target window where the hyperlink is displayed. If
     *                    the target window is an empty string, the text is
     *                    displayed in the default target window
     *                    <code>_self</code>. If the <code>url</code> parameter
     *                    is set to an empty string or to the value
     *                    <code>null</code>, you can get or set this property,
     *                    but the property will have no effect.
     * @param align       The alignment of the paragraph, as a TextFormatAlign
     *                    value.
     * @param leftMargin  Indicates the left margin of the paragraph, in pixels.
     * @param rightMargin Indicates the right margin of the paragraph, in pixels.
     * @param indent      An integer that indicates the indentation from the left
     *                    margin to the first character in the paragraph.
     * @param leading     A number that indicates the amount of leading vertical
     *                    space between lines.
     */
    function TextFormat(font, size, color, bold, italic, underline, url, link_target, align, leftMargin, rightMargin, indent, leading) {
        if (font === void 0) { font = "Times New Roman"; }
        if (size === void 0) { size = 12; }
        if (color === void 0) { color = 0x000000; }
        if (bold === void 0) { bold = false; }
        if (italic === void 0) { italic = false; }
        if (underline === void 0) { underline = false; }
        if (url === void 0) { url = ""; }
        if (link_target === void 0) { link_target = ""; }
        if (align === void 0) { align = "left"; }
        if (leftMargin === void 0) { leftMargin = 0; }
        if (rightMargin === void 0) { rightMargin = 0; }
        if (indent === void 0) { indent = 0; }
        if (leading === void 0) { leading = 0; }
        _super.call(this);
        /**
         * Specifies custom tab stops as an array of non-negative integers. Each tab
         * stop is specified in pixels. If custom tab stops are not specified
         * (<code>null</code>), the default tab stop is 4(average character width).
         */
        //todo: not used with in tesselated-font-table yet
        this.tabStops = [];
        this.font_name = font;
        this.size = size;
        this.bold = bold;
        this.italic = italic;
        this.underline = underline;
        this.url = url;
        this.link_target = link_target;
        this.align = align;
        this.leftMargin = leftMargin;
        this.rightMargin = rightMargin;
        this.indent = indent;
        this.leading = leading;
    }
    Object.defineProperty(TextFormat.prototype, "assetType", {
        /**
         *
         */
        get: function () {
            return TextFormat.assetType;
        },
        enumerable: true,
        configurable: true
    });
    TextFormat.assetType = "[asset TextFormat]";
    return TextFormat;
}(AssetBase_1.AssetBase));
exports.TextFormat = TextFormat;
