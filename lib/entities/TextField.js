var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Mesh = require("awayjs-display/lib/entities/Mesh");
var Geometry = require("awayjs-core/lib/data/Geometry");
var CurveSubGeometry = require("awayjs-core/lib/data/CurveSubGeometry");
/**
 * The TextField class is used to create display objects for text display and
 * input. <ph outputclass="flexonly">You can use the TextField class to
 * perform low-level text rendering. However, in Flex, you typically use the
 * Label, Text, TextArea, and TextInput controls to process text. <ph
 * outputclass="flashonly">You can give a text field an instance name in the
 * Property inspector and use the methods and properties of the TextField
 * class to manipulate it with ActionScript. TextField instance names are
 * displayed in the Movie Explorer and in the Insert Target Path dialog box in
 * the Actions panel.
 *
 * <p>To create a text field dynamically, use the <code>TextField()</code>
 * constructor.</p>
 *
 * <p>The methods of the TextField class let you set, select, and manipulate
 * text in a dynamic or input text field that you create during authoring or
 * at runtime. </p>
 *
 * <p>ActionScript provides several ways to format your text at runtime. The
 * TextFormat class lets you set character and paragraph formatting for
 * TextField objects. You can apply Cascading Style Sheets(CSS) styles to
 * text fields by using the <code>TextField.styleSheet</code> property and the
 * StyleSheet class. You can use CSS to style built-in HTML tags, define new
 * formatting tags, or apply styles. You can assign HTML formatted text, which
 * optionally uses CSS styles, directly to a text field. HTML text that you
 * assign to a text field can contain embedded media(movie clips, SWF files,
 * GIF files, PNG files, and JPEG files). The text wraps around the embedded
 * media in the same way that a web browser wraps text around media embedded
 * in an HTML document. </p>
 *
 * <p>Flash Player supports a subset of HTML tags that you can use to format
 * text. See the list of supported HTML tags in the description of the
 * <code>htmlText</code> property.</p>
 *
 * @event change                    Dispatched after a control value is
 *                                  modified, unlike the
 *                                  <code>textInput</code> event, which is
 *                                  dispatched before the value is modified.
 *                                  Unlike the W3C DOM Event Model version of
 *                                  the <code>change</code> event, which
 *                                  dispatches the event only after the
 *                                  control loses focus, the ActionScript 3.0
 *                                  version of the <code>change</code> event
 *                                  is dispatched any time the control
 *                                  changes. For example, if a user types text
 *                                  into a text field, a <code>change</code>
 *                                  event is dispatched after every keystroke.
 * @event link                      Dispatched when a user clicks a hyperlink
 *                                  in an HTML-enabled text field, where the
 *                                  URL begins with "event:". The remainder of
 *                                  the URL after "event:" is placed in the
 *                                  text property of the LINK event.
 *
 *                                  <p><b>Note:</b> The default behavior,
 *                                  adding the text to the text field, occurs
 *                                  only when Flash Player generates the
 *                                  event, which in this case happens when a
 *                                  user attempts to input text. You cannot
 *                                  put text into a text field by sending it
 *                                  <code>textInput</code> events.</p>
 * @event scroll                    Dispatched by a TextField object
 *                                  <i>after</i> the user scrolls.
 * @event textInput                 Flash Player dispatches the
 *                                  <code>textInput</code> event when a user
 *                                  enters one or more characters of text.
 *                                  Various text input methods can generate
 *                                  this event, including standard keyboards,
 *                                  input method editors(IMEs), voice or
 *                                  speech recognition systems, and even the
 *                                  act of pasting plain text with no
 *                                  formatting or style information.
 * @event textInteractionModeChange Flash Player dispatches the
 *                                  <code>textInteractionModeChange</code>
 *                                  event when a user changes the interaction
 *                                  mode of a text field. for example on
 *                                  Android, one can toggle from NORMAL mode
 *                                  to SELECTION mode using context menu
 *                                  options
 */
var TextField = (function (_super) {
    __extends(TextField, _super);
    /**
     * Creates a new TextField instance. After you create the TextField instance,
     * call the <code>addChild()</code> or <code>addChildAt()</code> method of
     * the parent DisplayObjectContainer object to add the TextField instance to
     * the display list.
     *
     * <p>The default size for a text field is 100 x 100 pixels.</p>
     */
    function TextField() {
        _super.call(this, new Geometry());
        this._text = "";
    }
    Object.defineProperty(TextField.prototype, "bottomScrollV", {
        /**
         * An integer(1-based index) that indicates the bottommost line that is
         * currently visible in the specified text field. Think of the text field as
         * a window onto a block of text. The <code>scrollV</code> property is the
         * 1-based index of the topmost visible line in the window.
         *
         * <p>All the text between the lines indicated by <code>scrollV</code> and
         * <code>bottomScrollV</code> is currently visible in the text field.</p>
         */
        get: function () {
            return this._bottomScrollV;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "caretIndex", {
        /**
         * The index of the insertion point(caret) position. If no insertion point
         * is displayed, the value is the position the insertion point would be if
         * you restored focus to the field(typically where the insertion point last
         * was, or 0 if the field has not had focus).
         *
         * <p>Selection span indexes are zero-based(for example, the first position
         * is 0, the second position is 1, and so on).</p>
         */
        get: function () {
            return this._caretIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "length", {
        /**
         * The number of characters in a text field. A character such as tab
         * (<code>\t</code>) counts as one character.
         */
        get: function () {
            return this._length;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * The maximum value of <code>scrollH</code>.
     */
    TextField.prototype.maxScrollH = function () {
        return this._maxScrollH;
    };
    /**
     * The maximum value of <code>scrollV</code>.
     */
    TextField.prototype.maxScrollV = function () {
        return this._maxScrollV;
    };
    Object.defineProperty(TextField.prototype, "numLines", {
        /**
         * Defines the number of text lines in a multiline text field. If
         * <code>wordWrap</code> property is set to <code>true</code>, the number of
         * lines increases when text wraps.
         */
        get: function () {
            return this._numLines;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "selectionBeginIndex", {
        /**
         * The zero-based character index value of the first character in the current
         * selection. For example, the first character is 0, the second character is
         * 1, and so on. If no text is selected, this property is the value of
         * <code>caretIndex</code>.
         */
        get: function () {
            return this._selectionBeginIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "selectionEndIndex", {
        /**
         * The zero-based character index value of the last character in the current
         * selection. For example, the first character is 0, the second character is
         * 1, and so on. If no text is selected, this property is the value of
         * <code>caretIndex</code>.
         */
        get: function () {
            return this._selectionEndIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "text", {
        /**
         * A string that is the current text in the text field. Lines are separated
         * by the carriage return character(<code>'\r'</code>, ASCII 13). This
         * property contains unformatted text in the text field, without HTML tags.
         *
         * <p>To get the text in HTML form, use the <code>htmlText</code>
         * property.</p>
         */
        get: function () {
            return this._text;
        },
        set: function (value) {
            if (this._text == value)
                return;
            this._text = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "textHeight", {
        /**
         * The height of the text in pixels.
         */
        get: function () {
            return this._textHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "textInteractionMode", {
        /**
         * The interaction mode property, Default value is
         * TextInteractionMode.NORMAL. On mobile platforms, the normal mode implies
         * that the text can be scrolled but not selected. One can switch to the
         * selectable mode through the in-built context menu on the text field. On
         * Desktop, the normal mode implies that the text is in scrollable as well as
         * selection mode.
         */
        get: function () {
            return this._textInteractionMode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "textWidth", {
        /**
         * The width of the text in pixels.
         */
        get: function () {
            return this._textWidth;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Appends the string specified by the <code>newText</code> parameter to the
     * end of the text of the text field. This method is more efficient than an
     * addition assignment(<code>+=</code>) on a <code>text</code> property
     * (such as <code>someTextField.text += moreText</code>), particularly for a
     * text field that contains a significant amount of content.
     *
     * @param newText The string to append to the existing text.
     */
    TextField.prototype.appendText = function (newText, newFormat) {
        var indices = new Array();
        var positions = new Array();
        var curveData = new Array();
        var uvs = new Array();
        var char_scale = newFormat.size / newFormat.font_table.get_font_em_size();
        var tri_idx_offset = 0;
        var tri_cnt = 0;
        var x_offset = 0;
        var y_offset = 0;
        for (var i = 0; i < newText.length; i++) {
            var this_subGeom = newFormat.font_table.get_subgeo_for_char(newText.charCodeAt(i).toString());
            if (this_subGeom != null) {
                tri_cnt = 0;
                var indices2 = this_subGeom.indices;
                var positions2 = this_subGeom.positions;
                var curveData2 = this_subGeom.curves;
                for (var v = 0; v < indices2.length; v++) {
                    indices.push(indices2[v] + tri_idx_offset);
                    tri_cnt++;
                }
                tri_idx_offset += tri_cnt;
                for (v = 0; v < positions2.length / 3; v++) {
                    positions.push((positions2[v * 3] * char_scale) + x_offset);
                    positions.push((positions2[v * 3 + 1] * char_scale * -1) + y_offset);
                    positions.push(positions2[v * 3 + 2]);
                    curveData.push(curveData2[v * 2]);
                    curveData.push(curveData2[v * 2 + 1]);
                    uvs.push(0.0);
                    uvs.push(0.0);
                }
                x_offset += newFormat.font_table.get_font_em_size() * char_scale;
                //xcount+=newFormat.font_table.get_font_em_size();
                console.log(x_offset);
            }
        }
        var curve_sub_geom = new CurveSubGeometry(true);
        curve_sub_geom.updateIndices(indices);
        curve_sub_geom.updatePositions(positions);
        curve_sub_geom.updateCurves(curveData);
        curve_sub_geom.updateUVs(uvs);
        this.geometry.addSubGeometry(curve_sub_geom);
        this.subMeshes[0].material = newFormat.material;
    };
    /**
     * *tells the Textfield that a paragraph is defined completly.
     * e.g. the textfield will start a new line for future added text.
     */
    TextField.prototype.closeParagraph = function () {
        //TODO
    };
    /**
     * *tells the Textfield that a paragraph is defined completly.
     * e.g. the textfield will start a new line for future added text.
     */
    TextField.prototype.construct_geometry = function () {
        //TODO
    };
    /**
     * Returns a rectangle that is the bounding box of the character.
     *
     * @param charIndex The zero-based index value for the character(for
     *                  example, the first position is 0, the second position is
     *                  1, and so on).
     * @return A rectangle with <code>x</code> and <code>y</code> minimum and
     *         maximum values defining the bounding box of the character.
     */
    TextField.prototype.getCharBoundaries = function (charIndex) {
        return this._charBoundaries;
    };
    /**
     * Returns the zero-based index value of the character at the point specified
     * by the <code>x</code> and <code>y</code> parameters.
     *
     * @param x The <i>x</i> coordinate of the character.
     * @param y The <i>y</i> coordinate of the character.
     * @return The zero-based index value of the character(for example, the
     *         first position is 0, the second position is 1, and so on). Returns
     *         -1 if the point is not over any character.
     */
    TextField.prototype.getCharIndexAtPoint = function (x, y) {
        return this._charIndexAtPoint;
    };
    /**
     * Given a character index, returns the index of the first character in the
     * same paragraph.
     *
     * @param charIndex The zero-based index value of the character(for example,
     *                  the first character is 0, the second character is 1, and
     *                  so on).
     * @return The zero-based index value of the first character in the same
     *         paragraph.
     * @throws RangeError The character index specified is out of range.
     */
    TextField.prototype.getFirstCharInParagraph = function (charIndex /*int*/) {
        return this._firstCharInParagraph;
    };
    /**
     * Returns a DisplayObject reference for the given <code>id</code>, for an
     * image or SWF file that has been added to an HTML-formatted text field by
     * using an <code><img></code> tag. The <code><img></code> tag is in the
     * following format:
     *
     * <p><pre xml:space="preserve"><code> <img src = 'filename.jpg' id =
     * 'instanceName' ></code></pre></p>
     *
     * @param id The <code>id</code> to match(in the <code>id</code> attribute
     *           of the <code><img></code> tag).
     * @return The display object corresponding to the image or SWF file with the
     *         matching <code>id</code> attribute in the <code><img></code> tag
     *         of the text field. For media loaded from an external source, this
     *         object is a Loader object, and, once loaded, the media object is a
     *         child of that Loader object. For media embedded in the SWF file,
     *         it is the loaded object. If no <code><img></code> tag with the
     *         matching <code>id</code> exists, the method returns
     *         <code>null</code>.
     */
    TextField.prototype.getImageReference = function (id) {
        return this._imageReference;
    };
    /**
     * Returns the zero-based index value of the line at the point specified by
     * the <code>x</code> and <code>y</code> parameters.
     *
     * @param x The <i>x</i> coordinate of the line.
     * @param y The <i>y</i> coordinate of the line.
     * @return The zero-based index value of the line(for example, the first
     *         line is 0, the second line is 1, and so on). Returns -1 if the
     *         point is not over any line.
     */
    TextField.prototype.getLineIndexAtPoint = function (x, y) {
        return this._lineIndexAtPoint;
    };
    /**
     * Returns the zero-based index value of the line containing the character
     * specified by the <code>charIndex</code> parameter.
     *
     * @param charIndex The zero-based index value of the character(for example,
     *                  the first character is 0, the second character is 1, and
     *                  so on).
     * @return The zero-based index value of the line.
     * @throws RangeError The character index specified is out of range.
     */
    TextField.prototype.getLineIndexOfChar = function (charIndex /*int*/) {
        return this._lineIndexOfChar;
    };
    /**
     * Returns the number of characters in a specific text line.
     *
     * @param lineIndex The line number for which you want the length.
     * @return The number of characters in the line.
     * @throws RangeError The line number specified is out of range.
     */
    TextField.prototype.getLineLength = function (lineIndex /*int*/) {
        return this._lineLength;
    };
    /**
     * Returns metrics information about a given text line.
     *
     * @param lineIndex The line number for which you want metrics information.
     * @return A TextLineMetrics object.
     * @throws RangeError The line number specified is out of range.
     */
    TextField.prototype.getLineMetrics = function (lineIndex /*int*/) {
        return this._lineMetrics;
    };
    /**
     * Returns the character index of the first character in the line that the
     * <code>lineIndex</code> parameter specifies.
     *
     * @param lineIndex The zero-based index value of the line(for example, the
     *                  first line is 0, the second line is 1, and so on).
     * @return The zero-based index value of the first character in the line.
     * @throws RangeError The line number specified is out of range.
     */
    TextField.prototype.getLineOffset = function (lineIndex /*int*/) {
        return this._lineOffset;
    };
    /**
     * Returns the text of the line specified by the <code>lineIndex</code>
     * parameter.
     *
     * @param lineIndex The zero-based index value of the line(for example, the
     *                  first line is 0, the second line is 1, and so on).
     * @return The text string contained in the specified line.
     * @throws RangeError The line number specified is out of range.
     */
    TextField.prototype.getLineText = function (lineIndex /*int*/) {
        return this._lineText;
    };
    /**
     * Given a character index, returns the length of the paragraph containing
     * the given character. The length is relative to the first character in the
     * paragraph(as returned by <code>getFirstCharInParagraph()</code>), not to
     * the character index passed in.
     *
     * @param charIndex The zero-based index value of the character(for example,
     *                  the first character is 0, the second character is 1, and
     *                  so on).
     * @return Returns the number of characters in the paragraph.
     * @throws RangeError The character index specified is out of range.
     */
    TextField.prototype.getParagraphLength = function (charIndex /*int*/) {
        return this._paragraphLength;
    };
    /**
     * Returns a TextFormat object that contains formatting information for the
     * range of text that the <code>beginIndex</code> and <code>endIndex</code>
     * parameters specify. Only properties that are common to the entire text
     * specified are set in the resulting TextFormat object. Any property that is
     * <i>mixed</i>, meaning that it has different values at different points in
     * the text, has a value of <code>null</code>.
     *
     * <p>If you do not specify values for these parameters, this method is
     * applied to all the text in the text field. </p>
     *
     * <p>The following table describes three possible usages:</p>
     *
     * @return The TextFormat object that represents the formatting properties
     *         for the specified text.
     * @throws RangeError The <code>beginIndex</code> or <code>endIndex</code>
     *                    specified is out of range.
     */
    TextField.prototype.getTextFormat = function (beginIndex, endIndex) {
        if (beginIndex === void 0) { beginIndex = -1; }
        if (endIndex === void 0) { endIndex = -1; }
        return this._textFormat;
    };
    /**
     * Replaces the current selection with the contents of the <code>value</code>
     * parameter. The text is inserted at the position of the current selection,
     * using the current default character format and default paragraph format.
     * The text is not treated as HTML.
     *
     * <p>You can use the <code>replaceSelectedText()</code> method to insert and
     * delete text without disrupting the character and paragraph formatting of
     * the rest of the text.</p>
     *
     * <p><b>Note:</b> This method does not work if a style sheet is applied to
     * the text field.</p>
     *
     * @param value The string to replace the currently selected text.
     * @throws Error This method cannot be used on a text field with a style
     *               sheet.
     */
    TextField.prototype.replaceSelectedText = function (value) {
    };
    /**
     * Replaces the range of characters that the <code>beginIndex</code> and
     * <code>endIndex</code> parameters specify with the contents of the
     * <code>newText</code> parameter. As designed, the text from
     * <code>beginIndex</code> to <code>endIndex-1</code> is replaced.
     *
     * <p><b>Note:</b> This method does not work if a style sheet is applied to
     * the text field.</p>
     *
     * @param beginIndex The zero-based index value for the start position of the
     *                   replacement range.
     * @param endIndex   The zero-based index position of the first character
     *                   after the desired text span.
     * @param newText    The text to use to replace the specified range of
     *                   characters.
     * @throws Error This method cannot be used on a text field with a style
     *               sheet.
     */
    TextField.prototype.replaceText = function (beginIndex /*int*/, endIndex /*int*/, newText) {
    };
    /**
     * Sets as selected the text designated by the index values of the first and
     * last characters, which are specified with the <code>beginIndex</code> and
     * <code>endIndex</code> parameters. If the two parameter values are the
     * same, this method sets the insertion point, as if you set the
     * <code>caretIndex</code> property.
     *
     * @param beginIndex The zero-based index value of the first character in the
     *                   selection(for example, the first character is 0, the
     *                   second character is 1, and so on).
     * @param endIndex   The zero-based index value of the last character in the
     *                   selection.
     */
    TextField.prototype.setSelection = function (beginIndex /*int*/, endIndex /*int*/) {
    };
    /**
     * Applies the text formatting that the <code>format</code> parameter
     * specifies to the specified text in a text field. The value of
     * <code>format</code> must be a TextFormat object that specifies the desired
     * text formatting changes. Only the non-null properties of
     * <code>format</code> are applied to the text field. Any property of
     * <code>format</code> that is set to <code>null</code> is not applied. By
     * default, all of the properties of a newly created TextFormat object are
     * set to <code>null</code>.
     *
     * <p><b>Note:</b> This method does not work if a style sheet is applied to
     * the text field.</p>
     *
     * <p>The <code>setTextFormat()</code> method changes the text formatting
     * applied to a range of characters or to the entire body of text in a text
     * field. To apply the properties of format to all text in the text field, do
     * not specify values for <code>beginIndex</code> and <code>endIndex</code>.
     * To apply the properties of the format to a range of text, specify values
     * for the <code>beginIndex</code> and the <code>endIndex</code> parameters.
     * You can use the <code>length</code> property to determine the index
     * values.</p>
     *
     * <p>The two types of formatting information in a TextFormat object are
     * character level formatting and paragraph level formatting. Each character
     * in a text field can have its own character formatting settings, such as
     * font name, font size, bold, and italic.</p>
     *
     * <p>For paragraphs, the first character of the paragraph is examined for
     * the paragraph formatting settings for the entire paragraph. Examples of
     * paragraph formatting settings are left margin, right margin, and
     * indentation.</p>
     *
     * <p>Any text inserted manually by the user, or replaced by the
     * <code>replaceSelectedText()</code> method, receives the default text field
     * formatting for new text, and not the formatting specified for the text
     * insertion point. To set the default formatting for new text, use
     * <code>defaultTextFormat</code>.</p>
     *
     * @param format A TextFormat object that contains character and paragraph
     *               formatting information.
     * @throws Error      This method cannot be used on a text field with a style
     *                    sheet.
     * @throws RangeError The <code>beginIndex</code> or <code>endIndex</code>
     *                    specified is out of range.
     */
    TextField.prototype.setTextFormat = function (format, beginIndex, endIndex) {
        if (beginIndex === void 0) { beginIndex = -1; }
        if (endIndex === void 0) { endIndex = -1; }
    };
    /**
     * Returns true if an embedded font is available with the specified
     * <code>fontName</code> and <code>fontStyle</code> where
     * <code>Font.fontType</code> is <code>flash.text.FontType.EMBEDDED</code>.
     * Starting with Flash Player 10, two kinds of embedded fonts can appear in a
     * SWF file. Normal embedded fonts are only used with TextField objects. CFF
     * embedded fonts are only used with the flash.text.engine classes. The two
     * types are distinguished by the <code>fontType</code> property of the
     * <code>Font</code> class, as returned by the <code>enumerateFonts()</code>
     * function.
     *
     * <p>TextField cannot use a font of type <code>EMBEDDED_CFF</code>. If
     * <code>embedFonts</code> is set to <code>true</code> and the only font
     * available at run time with the specified name and style is of type
     * <code>EMBEDDED_CFF</code>, Flash Player fails to render the text, as if no
     * embedded font were available with the specified name and style.</p>
     *
     * <p>If both <code>EMBEDDED</code> and <code>EMBEDDED_CFF</code> fonts are
     * available with the same name and style, the <code>EMBEDDED</code> font is
     * selected and text renders with the <code>EMBEDDED</code> font.</p>
     *
     * @param fontName  The name of the embedded font to check.
     * @param fontStyle Specifies the font style to check. Use
     *                  <code>flash.text.FontStyle</code>
     * @return <code>true</code> if a compatible embedded font is available,
     *         otherwise <code>false</code>.
     * @throws ArgumentError The <code>fontStyle</code> specified is not a member
     *                       of <code>flash.text.FontStyle</code>.
     */
    TextField.isFontCompatible = function (fontName, fontStyle) {
        return false;
    };
    return TextField;
})(Mesh);
module.exports = TextField;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9UZXh0RmllbGQudHMiXSwibmFtZXMiOlsiVGV4dEZpZWxkIiwiVGV4dEZpZWxkLmNvbnN0cnVjdG9yIiwiVGV4dEZpZWxkLmJvdHRvbVNjcm9sbFYiLCJUZXh0RmllbGQuY2FyZXRJbmRleCIsIlRleHRGaWVsZC5sZW5ndGgiLCJUZXh0RmllbGQubWF4U2Nyb2xsSCIsIlRleHRGaWVsZC5tYXhTY3JvbGxWIiwiVGV4dEZpZWxkLm51bUxpbmVzIiwiVGV4dEZpZWxkLnNlbGVjdGlvbkJlZ2luSW5kZXgiLCJUZXh0RmllbGQuc2VsZWN0aW9uRW5kSW5kZXgiLCJUZXh0RmllbGQudGV4dCIsIlRleHRGaWVsZC50ZXh0SGVpZ2h0IiwiVGV4dEZpZWxkLnRleHRJbnRlcmFjdGlvbk1vZGUiLCJUZXh0RmllbGQudGV4dFdpZHRoIiwiVGV4dEZpZWxkLmFwcGVuZFRleHQiLCJUZXh0RmllbGQuY2xvc2VQYXJhZ3JhcGgiLCJUZXh0RmllbGQuY29uc3RydWN0X2dlb21ldHJ5IiwiVGV4dEZpZWxkLmdldENoYXJCb3VuZGFyaWVzIiwiVGV4dEZpZWxkLmdldENoYXJJbmRleEF0UG9pbnQiLCJUZXh0RmllbGQuZ2V0Rmlyc3RDaGFySW5QYXJhZ3JhcGgiLCJUZXh0RmllbGQuZ2V0SW1hZ2VSZWZlcmVuY2UiLCJUZXh0RmllbGQuZ2V0TGluZUluZGV4QXRQb2ludCIsIlRleHRGaWVsZC5nZXRMaW5lSW5kZXhPZkNoYXIiLCJUZXh0RmllbGQuZ2V0TGluZUxlbmd0aCIsIlRleHRGaWVsZC5nZXRMaW5lTWV0cmljcyIsIlRleHRGaWVsZC5nZXRMaW5lT2Zmc2V0IiwiVGV4dEZpZWxkLmdldExpbmVUZXh0IiwiVGV4dEZpZWxkLmdldFBhcmFncmFwaExlbmd0aCIsIlRleHRGaWVsZC5nZXRUZXh0Rm9ybWF0IiwiVGV4dEZpZWxkLnJlcGxhY2VTZWxlY3RlZFRleHQiLCJUZXh0RmllbGQucmVwbGFjZVRleHQiLCJUZXh0RmllbGQuc2V0U2VsZWN0aW9uIiwiVGV4dEZpZWxkLnNldFRleHRGb3JtYXQiLCJUZXh0RmllbGQuaXNGb250Q29tcGF0aWJsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBVUEsSUFBTyxJQUFJLFdBQWlCLGtDQUFrQyxDQUFDLENBQUM7QUFDaEUsSUFBTyxRQUFRLFdBQWdCLCtCQUErQixDQUFDLENBQUM7QUFFaEUsSUFBTyxnQkFBZ0IsV0FBZSx1Q0FBdUMsQ0FBQyxDQUFDO0FBSS9FLEFBK0VBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FERztJQUNHLFNBQVM7SUFBU0EsVUFBbEJBLFNBQVNBLFVBQWFBO0lBNmtCM0JBOzs7Ozs7O09BT0dBO0lBQ0hBLFNBcmxCS0EsU0FBU0E7UUF1bEJiQyxrQkFBTUEsSUFBSUEsUUFBUUEsRUFBRUEsQ0FBQ0EsQ0FBQ0E7UUE3a0JmQSxVQUFLQSxHQUFVQSxFQUFFQSxDQUFDQTtJQThrQjFCQSxDQUFDQTtJQTdjREQsc0JBQVdBLG9DQUFhQTtRQVR4QkE7Ozs7Ozs7O1dBUUdBO2FBQ0hBO1lBRUNFLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLGNBQWNBLENBQUNBO1FBQzVCQSxDQUFDQTs7O09BQUFGO0lBV0RBLHNCQUFXQSxpQ0FBVUE7UUFUckJBOzs7Ozs7OztXQVFHQTthQUNIQTtZQUVDRyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQTtRQUN6QkEsQ0FBQ0E7OztPQUFBSDtJQTJHREEsc0JBQVdBLDZCQUFNQTtRQUpqQkE7OztXQUdHQTthQUNIQTtZQUVDSSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQTtRQUNyQkEsQ0FBQ0E7OztPQUFBSjtJQWFEQTs7T0FFR0E7SUFDSUEsOEJBQVVBLEdBQWpCQTtRQUVDSyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQTtJQUN6QkEsQ0FBQ0E7SUFFREw7O09BRUdBO0lBQ0lB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Ozs7Ozs7Ozs7Ozs7Ozs7O09BaUJHQTtJQUNJQSwrQkFBV0EsR0FBbEJBLFVBQW1CQSxVQUFVQSxDQUFRQSxPQUFEQSxBQUFRQSxFQUFFQSxRQUFRQSxDQUFRQSxPQUFEQSxBQUFRQSxFQUFFQSxPQUFjQTtJQUdyRjhCLENBQUNBO0lBRUQ5Qjs7Ozs7Ozs7Ozs7O09BWUdBO0lBQ0lBLGdDQUFZQSxHQUFuQkEsVUFBb0JBLFVBQVVBLENBQVFBLE9BQURBLEFBQVFBLEVBQUVBLFFBQVFBLENBQVFBLE9BQURBLEFBQVFBO0lBR3RFK0IsQ0FBQ0E7SUFFRC9COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTRDR0E7SUFDSUEsaUNBQWFBLEdBQXBCQSxVQUFxQkEsTUFBaUJBLEVBQUVBLFVBQThCQSxFQUFFQSxRQUE0QkE7UUFBNURnQywwQkFBOEJBLEdBQTlCQSxjQUE2QkEsQ0FBQ0E7UUFBRUEsd0JBQTRCQSxHQUE1QkEsWUFBMkJBLENBQUNBO0lBR3BHQSxDQUFDQTtJQUVEaEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0E0QkdBO0lBQ1dBLDBCQUFnQkEsR0FBOUJBLFVBQStCQSxRQUFlQSxFQUFFQSxTQUFnQkE7UUFFL0RpQyxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQTtJQUNkQSxDQUFDQTtJQUNGakMsZ0JBQUNBO0FBQURBLENBdi9CQSxBQXUvQkNBLEVBdi9CdUIsSUFBSSxFQXUvQjNCO0FBRUQsQUFBbUIsaUJBQVYsU0FBUyxDQUFDIiwiZmlsZSI6ImVudGl0aWVzL1RleHRGaWVsZC5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVjdGFuZ2xlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1JlY3RhbmdsZVwiKTtcblxuaW1wb3J0IERpc3BsYXlPYmplY3RcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0Rpc3BsYXlPYmplY3RcIik7XG5pbXBvcnQgQW50aUFsaWFzVHlwZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3RleHQvQW50aUFsaWFzVHlwZVwiKTtcbmltcG9ydCBHcmlkRml0VHlwZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvdGV4dC9HcmlkRml0VHlwZVwiKTtcbmltcG9ydCBUZXh0RmllbGRBdXRvU2l6ZVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi90ZXh0L1RleHRGaWVsZEF1dG9TaXplXCIpO1xuaW1wb3J0IFRleHRGaWVsZFR5cGVcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi90ZXh0L1RleHRGaWVsZFR5cGVcIik7XG5pbXBvcnQgVGV4dEZvcm1hdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvdGV4dC9UZXh0Rm9ybWF0XCIpO1xuaW1wb3J0IFRleHRJbnRlcmFjdGlvbk1vZGVcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvdGV4dC9UZXh0SW50ZXJhY3Rpb25Nb2RlXCIpO1xuaW1wb3J0IFRleHRMaW5lTWV0cmljc1x0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3RleHQvVGV4dExpbmVNZXRyaWNzXCIpO1xuaW1wb3J0IE1lc2hcdFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9NZXNoXCIpO1xuaW1wb3J0IEdlb21ldHJ5XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2RhdGEvR2VvbWV0cnlcIik7XG5pbXBvcnQgU3ViR2VvbWV0cnlCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZGF0YS9TdWJHZW9tZXRyeUJhc2VcIik7XG5pbXBvcnQgQ3VydmVTdWJHZW9tZXRyeVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZGF0YS9DdXJ2ZVN1Ykdlb21ldHJ5XCIpO1xuXG5pbXBvcnQgTWF0cml4M0RcdFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL01hdHJpeDNEXCIpO1xuaW1wb3J0IFZlY3RvcjNEXHRcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9WZWN0b3IzRFwiKTtcbi8qKlxuICogVGhlIFRleHRGaWVsZCBjbGFzcyBpcyB1c2VkIHRvIGNyZWF0ZSBkaXNwbGF5IG9iamVjdHMgZm9yIHRleHQgZGlzcGxheSBhbmRcbiAqIGlucHV0LiA8cGggb3V0cHV0Y2xhc3M9XCJmbGV4b25seVwiPllvdSBjYW4gdXNlIHRoZSBUZXh0RmllbGQgY2xhc3MgdG9cbiAqIHBlcmZvcm0gbG93LWxldmVsIHRleHQgcmVuZGVyaW5nLiBIb3dldmVyLCBpbiBGbGV4LCB5b3UgdHlwaWNhbGx5IHVzZSB0aGVcbiAqIExhYmVsLCBUZXh0LCBUZXh0QXJlYSwgYW5kIFRleHRJbnB1dCBjb250cm9scyB0byBwcm9jZXNzIHRleHQuIDxwaFxuICogb3V0cHV0Y2xhc3M9XCJmbGFzaG9ubHlcIj5Zb3UgY2FuIGdpdmUgYSB0ZXh0IGZpZWxkIGFuIGluc3RhbmNlIG5hbWUgaW4gdGhlXG4gKiBQcm9wZXJ0eSBpbnNwZWN0b3IgYW5kIHVzZSB0aGUgbWV0aG9kcyBhbmQgcHJvcGVydGllcyBvZiB0aGUgVGV4dEZpZWxkXG4gKiBjbGFzcyB0byBtYW5pcHVsYXRlIGl0IHdpdGggQWN0aW9uU2NyaXB0LiBUZXh0RmllbGQgaW5zdGFuY2UgbmFtZXMgYXJlXG4gKiBkaXNwbGF5ZWQgaW4gdGhlIE1vdmllIEV4cGxvcmVyIGFuZCBpbiB0aGUgSW5zZXJ0IFRhcmdldCBQYXRoIGRpYWxvZyBib3ggaW5cbiAqIHRoZSBBY3Rpb25zIHBhbmVsLlxuICpcbiAqIDxwPlRvIGNyZWF0ZSBhIHRleHQgZmllbGQgZHluYW1pY2FsbHksIHVzZSB0aGUgPGNvZGU+VGV4dEZpZWxkKCk8L2NvZGU+XG4gKiBjb25zdHJ1Y3Rvci48L3A+XG4gKlxuICogPHA+VGhlIG1ldGhvZHMgb2YgdGhlIFRleHRGaWVsZCBjbGFzcyBsZXQgeW91IHNldCwgc2VsZWN0LCBhbmQgbWFuaXB1bGF0ZVxuICogdGV4dCBpbiBhIGR5bmFtaWMgb3IgaW5wdXQgdGV4dCBmaWVsZCB0aGF0IHlvdSBjcmVhdGUgZHVyaW5nIGF1dGhvcmluZyBvclxuICogYXQgcnVudGltZS4gPC9wPlxuICpcbiAqIDxwPkFjdGlvblNjcmlwdCBwcm92aWRlcyBzZXZlcmFsIHdheXMgdG8gZm9ybWF0IHlvdXIgdGV4dCBhdCBydW50aW1lLiBUaGVcbiAqIFRleHRGb3JtYXQgY2xhc3MgbGV0cyB5b3Ugc2V0IGNoYXJhY3RlciBhbmQgcGFyYWdyYXBoIGZvcm1hdHRpbmcgZm9yXG4gKiBUZXh0RmllbGQgb2JqZWN0cy4gWW91IGNhbiBhcHBseSBDYXNjYWRpbmcgU3R5bGUgU2hlZXRzKENTUykgc3R5bGVzIHRvXG4gKiB0ZXh0IGZpZWxkcyBieSB1c2luZyB0aGUgPGNvZGU+VGV4dEZpZWxkLnN0eWxlU2hlZXQ8L2NvZGU+IHByb3BlcnR5IGFuZCB0aGVcbiAqIFN0eWxlU2hlZXQgY2xhc3MuIFlvdSBjYW4gdXNlIENTUyB0byBzdHlsZSBidWlsdC1pbiBIVE1MIHRhZ3MsIGRlZmluZSBuZXdcbiAqIGZvcm1hdHRpbmcgdGFncywgb3IgYXBwbHkgc3R5bGVzLiBZb3UgY2FuIGFzc2lnbiBIVE1MIGZvcm1hdHRlZCB0ZXh0LCB3aGljaFxuICogb3B0aW9uYWxseSB1c2VzIENTUyBzdHlsZXMsIGRpcmVjdGx5IHRvIGEgdGV4dCBmaWVsZC4gSFRNTCB0ZXh0IHRoYXQgeW91XG4gKiBhc3NpZ24gdG8gYSB0ZXh0IGZpZWxkIGNhbiBjb250YWluIGVtYmVkZGVkIG1lZGlhKG1vdmllIGNsaXBzLCBTV0YgZmlsZXMsXG4gKiBHSUYgZmlsZXMsIFBORyBmaWxlcywgYW5kIEpQRUcgZmlsZXMpLiBUaGUgdGV4dCB3cmFwcyBhcm91bmQgdGhlIGVtYmVkZGVkXG4gKiBtZWRpYSBpbiB0aGUgc2FtZSB3YXkgdGhhdCBhIHdlYiBicm93c2VyIHdyYXBzIHRleHQgYXJvdW5kIG1lZGlhIGVtYmVkZGVkXG4gKiBpbiBhbiBIVE1MIGRvY3VtZW50LiA8L3A+XG4gKlxuICogPHA+Rmxhc2ggUGxheWVyIHN1cHBvcnRzIGEgc3Vic2V0IG9mIEhUTUwgdGFncyB0aGF0IHlvdSBjYW4gdXNlIHRvIGZvcm1hdFxuICogdGV4dC4gU2VlIHRoZSBsaXN0IG9mIHN1cHBvcnRlZCBIVE1MIHRhZ3MgaW4gdGhlIGRlc2NyaXB0aW9uIG9mIHRoZVxuICogPGNvZGU+aHRtbFRleHQ8L2NvZGU+IHByb3BlcnR5LjwvcD5cbiAqIFxuICogQGV2ZW50IGNoYW5nZSAgICAgICAgICAgICAgICAgICAgRGlzcGF0Y2hlZCBhZnRlciBhIGNvbnRyb2wgdmFsdWUgaXNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGlmaWVkLCB1bmxpa2UgdGhlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT50ZXh0SW5wdXQ8L2NvZGU+IGV2ZW50LCB3aGljaCBpc1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2hlZCBiZWZvcmUgdGhlIHZhbHVlIGlzIG1vZGlmaWVkLlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVW5saWtlIHRoZSBXM0MgRE9NIEV2ZW50IE1vZGVsIHZlcnNpb24gb2ZcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoZSA8Y29kZT5jaGFuZ2U8L2NvZGU+IGV2ZW50LCB3aGljaFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2hlcyB0aGUgZXZlbnQgb25seSBhZnRlciB0aGVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2wgbG9zZXMgZm9jdXMsIHRoZSBBY3Rpb25TY3JpcHQgMy4wXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2ZXJzaW9uIG9mIHRoZSA8Y29kZT5jaGFuZ2U8L2NvZGU+IGV2ZW50XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpcyBkaXNwYXRjaGVkIGFueSB0aW1lIHRoZSBjb250cm9sXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VzLiBGb3IgZXhhbXBsZSwgaWYgYSB1c2VyIHR5cGVzIHRleHRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGludG8gYSB0ZXh0IGZpZWxkLCBhIDxjb2RlPmNoYW5nZTwvY29kZT5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50IGlzIGRpc3BhdGNoZWQgYWZ0ZXIgZXZlcnkga2V5c3Ryb2tlLlxuICogQGV2ZW50IGxpbmsgICAgICAgICAgICAgICAgICAgICAgRGlzcGF0Y2hlZCB3aGVuIGEgdXNlciBjbGlja3MgYSBoeXBlcmxpbmtcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluIGFuIEhUTUwtZW5hYmxlZCB0ZXh0IGZpZWxkLCB3aGVyZSB0aGVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFVSTCBiZWdpbnMgd2l0aCBcImV2ZW50OlwiLiBUaGUgcmVtYWluZGVyIG9mXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGUgVVJMIGFmdGVyIFwiZXZlbnQ6XCIgaXMgcGxhY2VkIGluIHRoZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCBwcm9wZXJ0eSBvZiB0aGUgTElOSyBldmVudC5cbiAqXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD48Yj5Ob3RlOjwvYj4gVGhlIGRlZmF1bHQgYmVoYXZpb3IsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGRpbmcgdGhlIHRleHQgdG8gdGhlIHRleHQgZmllbGQsIG9jY3Vyc1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25seSB3aGVuIEZsYXNoIFBsYXllciBnZW5lcmF0ZXMgdGhlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudCwgd2hpY2ggaW4gdGhpcyBjYXNlIGhhcHBlbnMgd2hlbiBhXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyIGF0dGVtcHRzIHRvIGlucHV0IHRleHQuIFlvdSBjYW5ub3RcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1dCB0ZXh0IGludG8gYSB0ZXh0IGZpZWxkIGJ5IHNlbmRpbmcgaXRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPnRleHRJbnB1dDwvY29kZT4gZXZlbnRzLjwvcD5cbiAqIEBldmVudCBzY3JvbGwgICAgICAgICAgICAgICAgICAgIERpc3BhdGNoZWQgYnkgYSBUZXh0RmllbGQgb2JqZWN0XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aT5hZnRlcjwvaT4gdGhlIHVzZXIgc2Nyb2xscy5cbiAqIEBldmVudCB0ZXh0SW5wdXQgICAgICAgICAgICAgICAgIEZsYXNoIFBsYXllciBkaXNwYXRjaGVzIHRoZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+dGV4dElucHV0PC9jb2RlPiBldmVudCB3aGVuIGEgdXNlclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW50ZXJzIG9uZSBvciBtb3JlIGNoYXJhY3RlcnMgb2YgdGV4dC5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFZhcmlvdXMgdGV4dCBpbnB1dCBtZXRob2RzIGNhbiBnZW5lcmF0ZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyBldmVudCwgaW5jbHVkaW5nIHN0YW5kYXJkIGtleWJvYXJkcyxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0IG1ldGhvZCBlZGl0b3JzKElNRXMpLCB2b2ljZSBvclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BlZWNoIHJlY29nbml0aW9uIHN5c3RlbXMsIGFuZCBldmVuIHRoZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0IG9mIHBhc3RpbmcgcGxhaW4gdGV4dCB3aXRoIG5vXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXR0aW5nIG9yIHN0eWxlIGluZm9ybWF0aW9uLlxuICogQGV2ZW50IHRleHRJbnRlcmFjdGlvbk1vZGVDaGFuZ2UgRmxhc2ggUGxheWVyIGRpc3BhdGNoZXMgdGhlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT50ZXh0SW50ZXJhY3Rpb25Nb2RlQ2hhbmdlPC9jb2RlPlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQgd2hlbiBhIHVzZXIgY2hhbmdlcyB0aGUgaW50ZXJhY3Rpb25cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGUgb2YgYSB0ZXh0IGZpZWxkLiBmb3IgZXhhbXBsZSBvblxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQW5kcm9pZCwgb25lIGNhbiB0b2dnbGUgZnJvbSBOT1JNQUwgbW9kZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gU0VMRUNUSU9OIG1vZGUgdXNpbmcgY29udGV4dCBtZW51XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zXG4gKi9cbmNsYXNzIFRleHRGaWVsZCBleHRlbmRzIE1lc2hcbntcblx0cHJpdmF0ZSBfYm90dG9tU2Nyb2xsVjpudW1iZXI7XG5cdHByaXZhdGUgX2NhcmV0SW5kZXg6bnVtYmVyO1xuXHRwcml2YXRlIF9sZW5ndGg6bnVtYmVyO1xuXHRwcml2YXRlIF9tYXhTY3JvbGxIOm51bWJlcjtcblx0cHJpdmF0ZSBfbWF4U2Nyb2xsVjpudW1iZXI7XG5cdHByaXZhdGUgX251bUxpbmVzOm51bWJlcjtcblx0cHJpdmF0ZSBfc2VsZWN0aW9uQmVnaW5JbmRleDpudW1iZXI7XG5cdHByaXZhdGUgX3NlbGVjdGlvbkVuZEluZGV4Om51bWJlcjtcblx0cHJpdmF0ZSBfdGV4dDpzdHJpbmcgPSBcIlwiO1xuXHRwcml2YXRlIF90ZXh0SGVpZ2h0Om51bWJlcjtcblx0cHJpdmF0ZSBfdGV4dEludGVyYWN0aW9uTW9kZTpUZXh0SW50ZXJhY3Rpb25Nb2RlO1xuXHRwcml2YXRlIF90ZXh0V2lkdGg6bnVtYmVyO1xuXG5cdHByaXZhdGUgX2NoYXJCb3VuZGFyaWVzOlJlY3RhbmdsZTtcblx0cHJpdmF0ZSBfY2hhckluZGV4QXRQb2ludDpudW1iZXI7XG5cdHByaXZhdGUgX2ZpcnN0Q2hhckluUGFyYWdyYXBoOm51bWJlcjtcblx0cHJpdmF0ZSBfaW1hZ2VSZWZlcmVuY2U6RGlzcGxheU9iamVjdFxuXHRwcml2YXRlIF9saW5lSW5kZXhBdFBvaW50Om51bWJlcjtcblx0cHJpdmF0ZSBfbGluZUluZGV4T2ZDaGFyOm51bWJlcjtcblx0cHJpdmF0ZSBfbGluZUxlbmd0aDpudW1iZXI7XG5cdHByaXZhdGUgX2xpbmVNZXRyaWNzOlRleHRMaW5lTWV0cmljcztcblx0cHJpdmF0ZSBfbGluZU9mZnNldDpudW1iZXI7XG5cdHByaXZhdGUgX2xpbmVUZXh0OnN0cmluZztcblx0cHJpdmF0ZSBfcGFyYWdyYXBoTGVuZ3RoOm51bWJlcjtcblx0cHJpdmF0ZSBfdGV4dEZvcm1hdDpUZXh0Rm9ybWF0O1xuXG5cdC8qKlxuXHQgKiBXaGVuIHNldCB0byA8Y29kZT50cnVlPC9jb2RlPiBhbmQgdGhlIHRleHQgZmllbGQgaXMgbm90IGluIGZvY3VzLCBGbGFzaFxuXHQgKiBQbGF5ZXIgaGlnaGxpZ2h0cyB0aGUgc2VsZWN0aW9uIGluIHRoZSB0ZXh0IGZpZWxkIGluIGdyYXkuIFdoZW4gc2V0IHRvXG5cdCAqIDxjb2RlPmZhbHNlPC9jb2RlPiBhbmQgdGhlIHRleHQgZmllbGQgaXMgbm90IGluIGZvY3VzLCBGbGFzaCBQbGF5ZXIgZG9lc1xuXHQgKiBub3QgaGlnaGxpZ2h0IHRoZSBzZWxlY3Rpb24gaW4gdGhlIHRleHQgZmllbGQuXG5cdCAqIFxuXHQgKiBAZGVmYXVsdCBmYWxzZVxuXHQgKi9cblx0cHVibGljIGFsd2F5c1Nob3dTZWxlY3Rpb246Ym9vbGVhblxuXG5cdC8qKlxuXHQgKiBUaGUgdHlwZSBvZiBhbnRpLWFsaWFzaW5nIHVzZWQgZm9yIHRoaXMgdGV4dCBmaWVsZC4gVXNlXG5cdCAqIDxjb2RlPmZsYXNoLnRleHQuQW50aUFsaWFzVHlwZTwvY29kZT4gY29uc3RhbnRzIGZvciB0aGlzIHByb3BlcnR5LiBZb3UgY2FuXG5cdCAqIGNvbnRyb2wgdGhpcyBzZXR0aW5nIG9ubHkgaWYgdGhlIGZvbnQgaXMgZW1iZWRkZWQod2l0aCB0aGVcblx0ICogPGNvZGU+ZW1iZWRGb250czwvY29kZT4gcHJvcGVydHkgc2V0IHRvIDxjb2RlPnRydWU8L2NvZGU+KS4gVGhlIGRlZmF1bHRcblx0ICogc2V0dGluZyBpcyA8Y29kZT5mbGFzaC50ZXh0LkFudGlBbGlhc1R5cGUuTk9STUFMPC9jb2RlPi5cblx0ICpcblx0ICogPHA+VG8gc2V0IHZhbHVlcyBmb3IgdGhpcyBwcm9wZXJ0eSwgdXNlIHRoZSBmb2xsb3dpbmcgc3RyaW5nIHZhbHVlczo8L3A+XG5cdCAqL1xuXHRwdWJsaWMgYW50aUFsaWFzVHlwZTpBbnRpQWxpYXNUeXBlO1xuXG5cdC8qKlxuXHQgKiBDb250cm9scyBhdXRvbWF0aWMgc2l6aW5nIGFuZCBhbGlnbm1lbnQgb2YgdGV4dCBmaWVsZHMuIEFjY2VwdGFibGUgdmFsdWVzXG5cdCAqIGZvciB0aGUgPGNvZGU+VGV4dEZpZWxkQXV0b1NpemU8L2NvZGU+IGNvbnN0YW50czpcblx0ICogPGNvZGU+VGV4dEZpZWxkQXV0b1NpemUuTk9ORTwvY29kZT4odGhlIGRlZmF1bHQpLFxuXHQgKiA8Y29kZT5UZXh0RmllbGRBdXRvU2l6ZS5MRUZUPC9jb2RlPiwgPGNvZGU+VGV4dEZpZWxkQXV0b1NpemUuUklHSFQ8L2NvZGU+LFxuXHQgKiBhbmQgPGNvZGU+VGV4dEZpZWxkQXV0b1NpemUuQ0VOVEVSPC9jb2RlPi5cblx0ICpcblx0ICogPHA+SWYgPGNvZGU+YXV0b1NpemU8L2NvZGU+IGlzIHNldCB0byA8Y29kZT5UZXh0RmllbGRBdXRvU2l6ZS5OT05FPC9jb2RlPlxuXHQgKiAodGhlIGRlZmF1bHQpIG5vIHJlc2l6aW5nIG9jY3Vycy48L3A+XG5cdCAqXG5cdCAqIDxwPklmIDxjb2RlPmF1dG9TaXplPC9jb2RlPiBpcyBzZXQgdG8gPGNvZGU+VGV4dEZpZWxkQXV0b1NpemUuTEVGVDwvY29kZT4sXG5cdCAqIHRoZSB0ZXh0IGlzIHRyZWF0ZWQgYXMgbGVmdC1qdXN0aWZpZWQgdGV4dCwgbWVhbmluZyB0aGF0IHRoZSBsZWZ0IG1hcmdpblxuXHQgKiBvZiB0aGUgdGV4dCBmaWVsZCByZW1haW5zIGZpeGVkIGFuZCBhbnkgcmVzaXppbmcgb2YgYSBzaW5nbGUgbGluZSBvZiB0aGVcblx0ICogdGV4dCBmaWVsZCBpcyBvbiB0aGUgcmlnaHQgbWFyZ2luLiBJZiB0aGUgdGV4dCBpbmNsdWRlcyBhIGxpbmUgYnJlYWsoZm9yXG5cdCAqIGV4YW1wbGUsIDxjb2RlPlwiXFxuXCI8L2NvZGU+IG9yIDxjb2RlPlwiXFxyXCI8L2NvZGU+KSwgdGhlIGJvdHRvbSBpcyBhbHNvXG5cdCAqIHJlc2l6ZWQgdG8gZml0IHRoZSBuZXh0IGxpbmUgb2YgdGV4dC4gSWYgPGNvZGU+d29yZFdyYXA8L2NvZGU+IGlzIGFsc28gc2V0XG5cdCAqIHRvIDxjb2RlPnRydWU8L2NvZGU+LCBvbmx5IHRoZSBib3R0b20gb2YgdGhlIHRleHQgZmllbGQgaXMgcmVzaXplZCBhbmQgdGhlXG5cdCAqIHJpZ2h0IHNpZGUgcmVtYWlucyBmaXhlZC48L3A+XG5cdCAqXG5cdCAqIDxwPklmIDxjb2RlPmF1dG9TaXplPC9jb2RlPiBpcyBzZXQgdG9cblx0ICogPGNvZGU+VGV4dEZpZWxkQXV0b1NpemUuUklHSFQ8L2NvZGU+LCB0aGUgdGV4dCBpcyB0cmVhdGVkIGFzXG5cdCAqIHJpZ2h0LWp1c3RpZmllZCB0ZXh0LCBtZWFuaW5nIHRoYXQgdGhlIHJpZ2h0IG1hcmdpbiBvZiB0aGUgdGV4dCBmaWVsZFxuXHQgKiByZW1haW5zIGZpeGVkIGFuZCBhbnkgcmVzaXppbmcgb2YgYSBzaW5nbGUgbGluZSBvZiB0aGUgdGV4dCBmaWVsZCBpcyBvblxuXHQgKiB0aGUgbGVmdCBtYXJnaW4uIElmIHRoZSB0ZXh0IGluY2x1ZGVzIGEgbGluZSBicmVhayhmb3IgZXhhbXBsZSxcblx0ICogPGNvZGU+XCJcXG5cIiBvciBcIlxcclwiKTwvY29kZT4sIHRoZSBib3R0b20gaXMgYWxzbyByZXNpemVkIHRvIGZpdCB0aGUgbmV4dFxuXHQgKiBsaW5lIG9mIHRleHQuIElmIDxjb2RlPndvcmRXcmFwPC9jb2RlPiBpcyBhbHNvIHNldCB0byA8Y29kZT50cnVlPC9jb2RlPixcblx0ICogb25seSB0aGUgYm90dG9tIG9mIHRoZSB0ZXh0IGZpZWxkIGlzIHJlc2l6ZWQgYW5kIHRoZSBsZWZ0IHNpZGUgcmVtYWluc1xuXHQgKiBmaXhlZC48L3A+XG5cdCAqXG5cdCAqIDxwPklmIDxjb2RlPmF1dG9TaXplPC9jb2RlPiBpcyBzZXQgdG9cblx0ICogPGNvZGU+VGV4dEZpZWxkQXV0b1NpemUuQ0VOVEVSPC9jb2RlPiwgdGhlIHRleHQgaXMgdHJlYXRlZCBhc1xuXHQgKiBjZW50ZXItanVzdGlmaWVkIHRleHQsIG1lYW5pbmcgdGhhdCBhbnkgcmVzaXppbmcgb2YgYSBzaW5nbGUgbGluZSBvZiB0aGVcblx0ICogdGV4dCBmaWVsZCBpcyBlcXVhbGx5IGRpc3RyaWJ1dGVkIHRvIGJvdGggdGhlIHJpZ2h0IGFuZCBsZWZ0IG1hcmdpbnMuIElmXG5cdCAqIHRoZSB0ZXh0IGluY2x1ZGVzIGEgbGluZSBicmVhayhmb3IgZXhhbXBsZSwgPGNvZGU+XCJcXG5cIjwvY29kZT4gb3Jcblx0ICogPGNvZGU+XCJcXHJcIjwvY29kZT4pLCB0aGUgYm90dG9tIGlzIGFsc28gcmVzaXplZCB0byBmaXQgdGhlIG5leHQgbGluZSBvZlxuXHQgKiB0ZXh0LiBJZiA8Y29kZT53b3JkV3JhcDwvY29kZT4gaXMgYWxzbyBzZXQgdG8gPGNvZGU+dHJ1ZTwvY29kZT4sIG9ubHkgdGhlXG5cdCAqIGJvdHRvbSBvZiB0aGUgdGV4dCBmaWVsZCBpcyByZXNpemVkIGFuZCB0aGUgbGVmdCBhbmQgcmlnaHQgc2lkZXMgcmVtYWluXG5cdCAqIGZpeGVkLjwvcD5cblx0ICogXG5cdCAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciBUaGUgPGNvZGU+YXV0b1NpemU8L2NvZGU+IHNwZWNpZmllZCBpcyBub3QgYSBtZW1iZXJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIG9mIGZsYXNoLnRleHQuVGV4dEZpZWxkQXV0b1NpemUuXG5cdCAqL1xuXHRwdWJsaWMgYXV0b1NpemU6VGV4dEZpZWxkQXV0b1NpemU7XG5cblx0LyoqXG5cdCAqIFNwZWNpZmllcyB3aGV0aGVyIHRoZSB0ZXh0IGZpZWxkIGhhcyBhIGJhY2tncm91bmQgZmlsbC4gSWZcblx0ICogPGNvZGU+dHJ1ZTwvY29kZT4sIHRoZSB0ZXh0IGZpZWxkIGhhcyBhIGJhY2tncm91bmQgZmlsbC4gSWZcblx0ICogPGNvZGU+ZmFsc2U8L2NvZGU+LCB0aGUgdGV4dCBmaWVsZCBoYXMgbm8gYmFja2dyb3VuZCBmaWxsLiBVc2UgdGhlXG5cdCAqIDxjb2RlPmJhY2tncm91bmRDb2xvcjwvY29kZT4gcHJvcGVydHkgdG8gc2V0IHRoZSBiYWNrZ3JvdW5kIGNvbG9yIG9mIGFcblx0ICogdGV4dCBmaWVsZC5cblx0ICogXG5cdCAqIEBkZWZhdWx0IGZhbHNlXG5cdCAqL1xuXHRwdWJsaWMgYmFja2dyb3VuZDpib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBUaGUgY29sb3Igb2YgdGhlIHRleHQgZmllbGQgYmFja2dyb3VuZC4gVGhlIGRlZmF1bHQgdmFsdWUgaXNcblx0ICogPGNvZGU+MHhGRkZGRkY8L2NvZGU+KHdoaXRlKS4gVGhpcyBwcm9wZXJ0eSBjYW4gYmUgcmV0cmlldmVkIG9yIHNldCwgZXZlblxuXHQgKiBpZiB0aGVyZSBjdXJyZW50bHkgaXMgbm8gYmFja2dyb3VuZCwgYnV0IHRoZSBjb2xvciBpcyB2aXNpYmxlIG9ubHkgaWYgdGhlXG5cdCAqIHRleHQgZmllbGQgaGFzIHRoZSA8Y29kZT5iYWNrZ3JvdW5kPC9jb2RlPiBwcm9wZXJ0eSBzZXQgdG9cblx0ICogPGNvZGU+dHJ1ZTwvY29kZT4uXG5cdCAqL1xuXHRwdWJsaWMgYmFja2dyb3VuZENvbG9yOm51bWJlciAvKmludCovO1xuXG5cdC8qKlxuXHQgKiBTcGVjaWZpZXMgd2hldGhlciB0aGUgdGV4dCBmaWVsZCBoYXMgYSBib3JkZXIuIElmIDxjb2RlPnRydWU8L2NvZGU+LCB0aGVcblx0ICogdGV4dCBmaWVsZCBoYXMgYSBib3JkZXIuIElmIDxjb2RlPmZhbHNlPC9jb2RlPiwgdGhlIHRleHQgZmllbGQgaGFzIG5vXG5cdCAqIGJvcmRlci4gVXNlIHRoZSA8Y29kZT5ib3JkZXJDb2xvcjwvY29kZT4gcHJvcGVydHkgdG8gc2V0IHRoZSBib3JkZXIgY29sb3IuXG5cdCAqIFxuXHQgKiBAZGVmYXVsdCBmYWxzZVxuXHQgKi9cblx0cHVibGljIGJvcmRlcjpib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBUaGUgY29sb3Igb2YgdGhlIHRleHQgZmllbGQgYm9yZGVyLiBUaGUgZGVmYXVsdCB2YWx1ZSBpc1xuXHQgKiA8Y29kZT4weDAwMDAwMDwvY29kZT4oYmxhY2spLiBUaGlzIHByb3BlcnR5IGNhbiBiZSByZXRyaWV2ZWQgb3Igc2V0LCBldmVuXG5cdCAqIGlmIHRoZXJlIGN1cnJlbnRseSBpcyBubyBib3JkZXIsIGJ1dCB0aGUgY29sb3IgaXMgdmlzaWJsZSBvbmx5IGlmIHRoZSB0ZXh0XG5cdCAqIGZpZWxkIGhhcyB0aGUgPGNvZGU+Ym9yZGVyPC9jb2RlPiBwcm9wZXJ0eSBzZXQgdG8gPGNvZGU+dHJ1ZTwvY29kZT4uXG5cdCAqL1xuXHRwdWJsaWMgYm9yZGVyQ29sb3I6bnVtYmVyIC8qaW50Ki87XG5cblx0LyoqXG5cdCAqIEFuIGludGVnZXIoMS1iYXNlZCBpbmRleCkgdGhhdCBpbmRpY2F0ZXMgdGhlIGJvdHRvbW1vc3QgbGluZSB0aGF0IGlzXG5cdCAqIGN1cnJlbnRseSB2aXNpYmxlIGluIHRoZSBzcGVjaWZpZWQgdGV4dCBmaWVsZC4gVGhpbmsgb2YgdGhlIHRleHQgZmllbGQgYXNcblx0ICogYSB3aW5kb3cgb250byBhIGJsb2NrIG9mIHRleHQuIFRoZSA8Y29kZT5zY3JvbGxWPC9jb2RlPiBwcm9wZXJ0eSBpcyB0aGVcblx0ICogMS1iYXNlZCBpbmRleCBvZiB0aGUgdG9wbW9zdCB2aXNpYmxlIGxpbmUgaW4gdGhlIHdpbmRvdy5cblx0ICpcblx0ICogPHA+QWxsIHRoZSB0ZXh0IGJldHdlZW4gdGhlIGxpbmVzIGluZGljYXRlZCBieSA8Y29kZT5zY3JvbGxWPC9jb2RlPiBhbmRcblx0ICogPGNvZGU+Ym90dG9tU2Nyb2xsVjwvY29kZT4gaXMgY3VycmVudGx5IHZpc2libGUgaW4gdGhlIHRleHQgZmllbGQuPC9wPlxuXHQgKi9cblx0cHVibGljIGdldCBib3R0b21TY3JvbGxWKCk6bnVtYmVyIC8qaW50Ki9cblx0e1xuXHRcdHJldHVybiB0aGlzLl9ib3R0b21TY3JvbGxWO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBpbmRleCBvZiB0aGUgaW5zZXJ0aW9uIHBvaW50KGNhcmV0KSBwb3NpdGlvbi4gSWYgbm8gaW5zZXJ0aW9uIHBvaW50XG5cdCAqIGlzIGRpc3BsYXllZCwgdGhlIHZhbHVlIGlzIHRoZSBwb3NpdGlvbiB0aGUgaW5zZXJ0aW9uIHBvaW50IHdvdWxkIGJlIGlmXG5cdCAqIHlvdSByZXN0b3JlZCBmb2N1cyB0byB0aGUgZmllbGQodHlwaWNhbGx5IHdoZXJlIHRoZSBpbnNlcnRpb24gcG9pbnQgbGFzdFxuXHQgKiB3YXMsIG9yIDAgaWYgdGhlIGZpZWxkIGhhcyBub3QgaGFkIGZvY3VzKS5cblx0ICpcblx0ICogPHA+U2VsZWN0aW9uIHNwYW4gaW5kZXhlcyBhcmUgemVyby1iYXNlZChmb3IgZXhhbXBsZSwgdGhlIGZpcnN0IHBvc2l0aW9uXG5cdCAqIGlzIDAsIHRoZSBzZWNvbmQgcG9zaXRpb24gaXMgMSwgYW5kIHNvIG9uKS48L3A+XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGNhcmV0SW5kZXgoKTpudW1iZXIgLyppbnQqL1xuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2NhcmV0SW5kZXg7XG5cdH1cblxuXHQvKipcblx0ICogQSBCb29sZWFuIHZhbHVlIHRoYXQgc3BlY2lmaWVzIHdoZXRoZXIgZXh0cmEgd2hpdGUgc3BhY2Uoc3BhY2VzLCBsaW5lXG5cdCAqIGJyZWFrcywgYW5kIHNvIG9uKSBpbiBhIHRleHQgZmllbGQgd2l0aCBIVE1MIHRleHQgaXMgcmVtb3ZlZC4gVGhlIGRlZmF1bHRcblx0ICogdmFsdWUgaXMgPGNvZGU+ZmFsc2U8L2NvZGU+LiBUaGUgPGNvZGU+Y29uZGVuc2VXaGl0ZTwvY29kZT4gcHJvcGVydHkgb25seVxuXHQgKiBhZmZlY3RzIHRleHQgc2V0IHdpdGggdGhlIDxjb2RlPmh0bWxUZXh0PC9jb2RlPiBwcm9wZXJ0eSwgbm90IHRoZVxuXHQgKiA8Y29kZT50ZXh0PC9jb2RlPiBwcm9wZXJ0eS4gSWYgeW91IHNldCB0ZXh0IHdpdGggdGhlIDxjb2RlPnRleHQ8L2NvZGU+XG5cdCAqIHByb3BlcnR5LCA8Y29kZT5jb25kZW5zZVdoaXRlPC9jb2RlPiBpcyBpZ25vcmVkLlxuXHQgKlxuXHQgKiA8cD5JZiA8Y29kZT5jb25kZW5zZVdoaXRlPC9jb2RlPiBpcyBzZXQgdG8gPGNvZGU+dHJ1ZTwvY29kZT4sIHVzZSBzdGFuZGFyZFxuXHQgKiBIVE1MIGNvbW1hbmRzIHN1Y2ggYXMgPGNvZGU+PEJSPjwvY29kZT4gYW5kIDxjb2RlPjxQPjwvY29kZT4gdG8gcGxhY2UgbGluZVxuXHQgKiBicmVha3MgaW4gdGhlIHRleHQgZmllbGQuPC9wPlxuXHQgKlxuXHQgKiA8cD5TZXQgdGhlIDxjb2RlPmNvbmRlbnNlV2hpdGU8L2NvZGU+IHByb3BlcnR5IGJlZm9yZSBzZXR0aW5nIHRoZVxuXHQgKiA8Y29kZT5odG1sVGV4dDwvY29kZT4gcHJvcGVydHkuPC9wPlxuXHQgKi9cblx0cHVibGljIGNvbmRlbnNlV2hpdGU6Ym9vbGVhbjtcblxuXHQvKipcblx0ICogU3BlY2lmaWVzIHRoZSBmb3JtYXQgYXBwbGllZCB0byBuZXdseSBpbnNlcnRlZCB0ZXh0LCBzdWNoIGFzIHRleHQgZW50ZXJlZFxuXHQgKiBieSBhIHVzZXIgb3IgdGV4dCBpbnNlcnRlZCB3aXRoIHRoZSA8Y29kZT5yZXBsYWNlU2VsZWN0ZWRUZXh0KCk8L2NvZGU+XG5cdCAqIG1ldGhvZC5cblx0ICpcblx0ICogPHA+PGI+Tm90ZTo8L2I+IFdoZW4gc2VsZWN0aW5nIGNoYXJhY3RlcnMgdG8gYmUgcmVwbGFjZWQgd2l0aFxuXHQgKiA8Y29kZT5zZXRTZWxlY3Rpb24oKTwvY29kZT4gYW5kIDxjb2RlPnJlcGxhY2VTZWxlY3RlZFRleHQoKTwvY29kZT4sIHRoZVxuXHQgKiA8Y29kZT5kZWZhdWx0VGV4dEZvcm1hdDwvY29kZT4gd2lsbCBiZSBhcHBsaWVkIG9ubHkgaWYgdGhlIHRleHQgaGFzIGJlZW5cblx0ICogc2VsZWN0ZWQgdXAgdG8gYW5kIGluY2x1ZGluZyB0aGUgbGFzdCBjaGFyYWN0ZXIuIEhlcmUgaXMgYW4gZXhhbXBsZTo8L3A+XG5cdCAqIDxwcmUgeG1sOnNwYWNlPVwicHJlc2VydmVcIj4gcHVibGljIG15X3R4dDpUZXh0RmllbGQgbmV3IFRleHRGaWVsZCgpO1xuXHQgKiBteV90eHQudGV4dCA9IFwiRmxhc2ggTWFjaW50b3NoIHZlcnNpb25cIjsgcHVibGljIG15X2ZtdDpUZXh0Rm9ybWF0ID0gbmV3XG5cdCAqIFRleHRGb3JtYXQoKTsgbXlfZm10LmNvbG9yID0gMHhGRjAwMDA7IG15X3R4dC5kZWZhdWx0VGV4dEZvcm1hdCA9IG15X2ZtdDtcblx0ICogbXlfdHh0LnNldFNlbGVjdGlvbig2LDE1KTsgLy8gcGFydGlhbCB0ZXh0IHNlbGVjdGVkIC0gZGVmYXVsdFRleHRGb3JtYXRcblx0ICogbm90IGFwcGxpZWQgbXlfdHh0LnNldFNlbGVjdGlvbig2LDIzKTsgLy8gdGV4dCBzZWxlY3RlZCB0byBlbmQgLVxuXHQgKiBkZWZhdWx0VGV4dEZvcm1hdCBhcHBsaWVkIG15X3R4dC5yZXBsYWNlU2VsZWN0ZWRUZXh0KFwiV2luZG93cyB2ZXJzaW9uXCIpO1xuXHQgKiA8L3ByZT5cblx0ICpcblx0ICogPHA+V2hlbiB5b3UgYWNjZXNzIHRoZSA8Y29kZT5kZWZhdWx0VGV4dEZvcm1hdDwvY29kZT4gcHJvcGVydHksIHRoZVxuXHQgKiByZXR1cm5lZCBUZXh0Rm9ybWF0IG9iamVjdCBoYXMgYWxsIG9mIGl0cyBwcm9wZXJ0aWVzIGRlZmluZWQuIE5vIHByb3BlcnR5XG5cdCAqIGlzIDxjb2RlPm51bGw8L2NvZGU+LjwvcD5cblx0ICpcblx0ICogPHA+PGI+Tm90ZTo8L2I+IFlvdSBjYW4ndCBzZXQgdGhpcyBwcm9wZXJ0eSBpZiBhIHN0eWxlIHNoZWV0IGlzIGFwcGxpZWQgdG9cblx0ICogdGhlIHRleHQgZmllbGQuPC9wPlxuXHQgKiBcblx0ICogQHRocm93cyBFcnJvciBUaGlzIG1ldGhvZCBjYW5ub3QgYmUgdXNlZCBvbiBhIHRleHQgZmllbGQgd2l0aCBhIHN0eWxlXG5cdCAqICAgICAgICAgICAgICAgc2hlZXQuXG5cdCAqL1xuXHRwdWJsaWMgZGVmYXVsdFRleHRGb3JtYXQ6VGV4dEZvcm1hdDtcblxuXHQvKipcblx0ICogU3BlY2lmaWVzIHdoZXRoZXIgdGhlIHRleHQgZmllbGQgaXMgYSBwYXNzd29yZCB0ZXh0IGZpZWxkLiBJZiB0aGUgdmFsdWUgb2Zcblx0ICogdGhpcyBwcm9wZXJ0eSBpcyA8Y29kZT50cnVlPC9jb2RlPiwgdGhlIHRleHQgZmllbGQgaXMgdHJlYXRlZCBhcyBhXG5cdCAqIHBhc3N3b3JkIHRleHQgZmllbGQgYW5kIGhpZGVzIHRoZSBpbnB1dCBjaGFyYWN0ZXJzIHVzaW5nIGFzdGVyaXNrcyBpbnN0ZWFkXG5cdCAqIG9mIHRoZSBhY3R1YWwgY2hhcmFjdGVycy4gSWYgPGNvZGU+ZmFsc2U8L2NvZGU+LCB0aGUgdGV4dCBmaWVsZCBpcyBub3Rcblx0ICogdHJlYXRlZCBhcyBhIHBhc3N3b3JkIHRleHQgZmllbGQuIFdoZW4gcGFzc3dvcmQgbW9kZSBpcyBlbmFibGVkLCB0aGUgQ3V0XG5cdCAqIGFuZCBDb3B5IGNvbW1hbmRzIGFuZCB0aGVpciBjb3JyZXNwb25kaW5nIGtleWJvYXJkIHNob3J0Y3V0cyB3aWxsIG5vdFxuXHQgKiBmdW5jdGlvbi4gVGhpcyBzZWN1cml0eSBtZWNoYW5pc20gcHJldmVudHMgYW4gdW5zY3J1cHVsb3VzIHVzZXIgZnJvbSB1c2luZ1xuXHQgKiB0aGUgc2hvcnRjdXRzIHRvIGRpc2NvdmVyIGEgcGFzc3dvcmQgb24gYW4gdW5hdHRlbmRlZCBjb21wdXRlci5cblx0ICogXG5cdCAqIEBkZWZhdWx0IGZhbHNlXG5cdCAqL1xuXHRwdWJsaWMgZGlzcGxheUFzUGFzc3dvcmQ6Ym9vbGVhbjtcblxuXHQvKipcblx0ICogU3BlY2lmaWVzIHdoZXRoZXIgdG8gcmVuZGVyIGJ5IHVzaW5nIGVtYmVkZGVkIGZvbnQgb3V0bGluZXMuIElmXG5cdCAqIDxjb2RlPmZhbHNlPC9jb2RlPiwgRmxhc2ggUGxheWVyIHJlbmRlcnMgdGhlIHRleHQgZmllbGQgYnkgdXNpbmcgZGV2aWNlXG5cdCAqIGZvbnRzLlxuXHQgKlxuXHQgKiA8cD5JZiB5b3Ugc2V0IHRoZSA8Y29kZT5lbWJlZEZvbnRzPC9jb2RlPiBwcm9wZXJ0eSB0byA8Y29kZT50cnVlPC9jb2RlPlxuXHQgKiBmb3IgYSB0ZXh0IGZpZWxkLCB5b3UgbXVzdCBzcGVjaWZ5IGEgZm9udCBmb3IgdGhhdCB0ZXh0IGJ5IHVzaW5nIHRoZVxuXHQgKiA8Y29kZT5mb250PC9jb2RlPiBwcm9wZXJ0eSBvZiBhIFRleHRGb3JtYXQgb2JqZWN0IGFwcGxpZWQgdG8gdGhlIHRleHRcblx0ICogZmllbGQuIElmIHRoZSBzcGVjaWZpZWQgZm9udCBpcyBub3QgZW1iZWRkZWQgaW4gdGhlIFNXRiBmaWxlLCB0aGUgdGV4dCBpc1xuXHQgKiBub3QgZGlzcGxheWVkLjwvcD5cblx0ICogXG5cdCAqIEBkZWZhdWx0IGZhbHNlXG5cdCAqL1xuXHRwdWJsaWMgZW1iZWRGb250czpib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBUaGUgdHlwZSBvZiBncmlkIGZpdHRpbmcgdXNlZCBmb3IgdGhpcyB0ZXh0IGZpZWxkLiBUaGlzIHByb3BlcnR5IGFwcGxpZXNcblx0ICogb25seSBpZiB0aGUgPGNvZGU+Zmxhc2gudGV4dC5BbnRpQWxpYXNUeXBlPC9jb2RlPiBwcm9wZXJ0eSBvZiB0aGUgdGV4dFxuXHQgKiBmaWVsZCBpcyBzZXQgdG8gPGNvZGU+Zmxhc2gudGV4dC5BbnRpQWxpYXNUeXBlLkFEVkFOQ0VEPC9jb2RlPi5cblx0ICpcblx0ICogPHA+VGhlIHR5cGUgb2YgZ3JpZCBmaXR0aW5nIHVzZWQgZGV0ZXJtaW5lcyB3aGV0aGVyIEZsYXNoIFBsYXllciBmb3JjZXNcblx0ICogc3Ryb25nIGhvcml6b250YWwgYW5kIHZlcnRpY2FsIGxpbmVzIHRvIGZpdCB0byBhIHBpeGVsIG9yIHN1YnBpeGVsIGdyaWQsXG5cdCAqIG9yIG5vdCBhdCBhbGwuPC9wPlxuXHQgKlxuXHQgKiA8cD5Gb3IgdGhlIDxjb2RlPmZsYXNoLnRleHQuR3JpZEZpdFR5cGU8L2NvZGU+IHByb3BlcnR5LCB5b3UgY2FuIHVzZSB0aGVcblx0ICogZm9sbG93aW5nIHN0cmluZyB2YWx1ZXM6PC9wPlxuXHQgKiBcblx0ICogQGRlZmF1bHQgcGl4ZWxcblx0ICovXG5cdHB1YmxpYyBncmlkRml0VHlwZTpHcmlkRml0VHlwZTtcblxuXHQvKipcblx0ICogQ29udGFpbnMgdGhlIEhUTUwgcmVwcmVzZW50YXRpb24gb2YgdGhlIHRleHQgZmllbGQgY29udGVudHMuXG5cdCAqXG5cdCAqIDxwPkZsYXNoIFBsYXllciBzdXBwb3J0cyB0aGUgZm9sbG93aW5nIEhUTUwgdGFnczo8L3A+XG5cdCAqXG5cdCAqIDxwPkZsYXNoIFBsYXllciBhbmQgQUlSIGFsc28gc3VwcG9ydCBleHBsaWNpdCBjaGFyYWN0ZXIgY29kZXMsIHN1Y2ggYXNcblx0ICogJiMzODsoQVNDSUkgYW1wZXJzYW5kKSBhbmQgJiN4MjBBQzsoVW5pY29kZSDigqwgc3ltYm9sKS4gPC9wPlxuXHQgKi9cblx0cHVibGljIGh0bWxUZXh0OnN0cmluZztcblxuXHQvKipcblx0ICogVGhlIG51bWJlciBvZiBjaGFyYWN0ZXJzIGluIGEgdGV4dCBmaWVsZC4gQSBjaGFyYWN0ZXIgc3VjaCBhcyB0YWJcblx0ICogKDxjb2RlPlxcdDwvY29kZT4pIGNvdW50cyBhcyBvbmUgY2hhcmFjdGVyLlxuXHQgKi9cblx0cHVibGljIGdldCBsZW5ndGgoKTpudW1iZXIgLyppbnQqL1xuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2xlbmd0aDtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgbWF4aW11bSBudW1iZXIgb2YgY2hhcmFjdGVycyB0aGF0IHRoZSB0ZXh0IGZpZWxkIGNhbiBjb250YWluLCBhc1xuXHQgKiBlbnRlcmVkIGJ5IGEgdXNlci4gQSBzY3JpcHQgY2FuIGluc2VydCBtb3JlIHRleHQgdGhhblxuXHQgKiA8Y29kZT5tYXhDaGFyczwvY29kZT4gYWxsb3dzOyB0aGUgPGNvZGU+bWF4Q2hhcnM8L2NvZGU+IHByb3BlcnR5IGluZGljYXRlc1xuXHQgKiBvbmx5IGhvdyBtdWNoIHRleHQgYSB1c2VyIGNhbiBlbnRlci4gSWYgdGhlIHZhbHVlIG9mIHRoaXMgcHJvcGVydHkgaXNcblx0ICogPGNvZGU+MDwvY29kZT4sIGEgdXNlciBjYW4gZW50ZXIgYW4gdW5saW1pdGVkIGFtb3VudCBvZiB0ZXh0LlxuXHQgKiBcblx0ICogQGRlZmF1bHQgMFxuXHQgKi9cblx0cHVibGljIG1heENoYXJzOm51bWJlciAvKmludCovO1xuXG5cdC8qKlxuXHQgKiBUaGUgbWF4aW11bSB2YWx1ZSBvZiA8Y29kZT5zY3JvbGxIPC9jb2RlPi5cblx0ICovXG5cdHB1YmxpYyBtYXhTY3JvbGxIKCk6bnVtYmVyIC8qaW50Ki9cblx0e1xuXHRcdHJldHVybiB0aGlzLl9tYXhTY3JvbGxIO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBtYXhpbXVtIHZhbHVlIG9mIDxjb2RlPnNjcm9sbFY8L2NvZGU+LlxuXHQgKi9cblx0cHVibGljIG1heFNjcm9sbFYoKTpudW1iZXIgLyppbnQqL1xuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX21heFNjcm9sbFY7XG5cdH1cblxuXHQvKipcblx0ICogQSBCb29sZWFuIHZhbHVlIHRoYXQgaW5kaWNhdGVzIHdoZXRoZXIgRmxhc2ggUGxheWVyIGF1dG9tYXRpY2FsbHkgc2Nyb2xsc1xuXHQgKiBtdWx0aWxpbmUgdGV4dCBmaWVsZHMgd2hlbiB0aGUgdXNlciBjbGlja3MgYSB0ZXh0IGZpZWxkIGFuZCByb2xscyB0aGVcblx0ICogbW91c2Ugd2hlZWwuIEJ5IGRlZmF1bHQsIHRoaXMgdmFsdWUgaXMgPGNvZGU+dHJ1ZTwvY29kZT4uIFRoaXMgcHJvcGVydHkgaXNcblx0ICogdXNlZnVsIGlmIHlvdSB3YW50IHRvIHByZXZlbnQgbW91c2Ugd2hlZWwgc2Nyb2xsaW5nIG9mIHRleHQgZmllbGRzLCBvclxuXHQgKiBpbXBsZW1lbnQgeW91ciBvd24gdGV4dCBmaWVsZCBzY3JvbGxpbmcuXG5cdCAqL1xuXHRwdWJsaWMgbW91c2VXaGVlbEVuYWJsZWQ6Ym9vbGVhbjtcblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHdoZXRoZXIgZmllbGQgaXMgYSBtdWx0aWxpbmUgdGV4dCBmaWVsZC4gSWYgdGhlIHZhbHVlIGlzXG5cdCAqIDxjb2RlPnRydWU8L2NvZGU+LCB0aGUgdGV4dCBmaWVsZCBpcyBtdWx0aWxpbmU7IGlmIHRoZSB2YWx1ZSBpc1xuXHQgKiA8Y29kZT5mYWxzZTwvY29kZT4sIHRoZSB0ZXh0IGZpZWxkIGlzIGEgc2luZ2xlLWxpbmUgdGV4dCBmaWVsZC4gSW4gYSBmaWVsZFxuXHQgKiBvZiB0eXBlIDxjb2RlPlRleHRGaWVsZFR5cGUuSU5QVVQ8L2NvZGU+LCB0aGUgPGNvZGU+bXVsdGlsaW5lPC9jb2RlPiB2YWx1ZVxuXHQgKiBkZXRlcm1pbmVzIHdoZXRoZXIgdGhlIDxjb2RlPkVudGVyPC9jb2RlPiBrZXkgY3JlYXRlcyBhIG5ldyBsaW5lKGEgdmFsdWVcblx0ICogb2YgPGNvZGU+ZmFsc2U8L2NvZGU+LCBhbmQgdGhlIDxjb2RlPkVudGVyPC9jb2RlPiBrZXkgaXMgaWdub3JlZCkuIElmIHlvdVxuXHQgKiBwYXN0ZSB0ZXh0IGludG8gYSA8Y29kZT5UZXh0RmllbGQ8L2NvZGU+IHdpdGggYSA8Y29kZT5tdWx0aWxpbmU8L2NvZGU+XG5cdCAqIHZhbHVlIG9mIDxjb2RlPmZhbHNlPC9jb2RlPiwgbmV3bGluZXMgYXJlIHN0cmlwcGVkIG91dCBvZiB0aGUgdGV4dC5cblx0ICogXG5cdCAqIEBkZWZhdWx0IGZhbHNlXG5cdCAqL1xuXHRwdWJsaWMgbXVsdGlsaW5lOmJvb2xlYW47XG5cblx0LyoqXG5cdCAqIERlZmluZXMgdGhlIG51bWJlciBvZiB0ZXh0IGxpbmVzIGluIGEgbXVsdGlsaW5lIHRleHQgZmllbGQuIElmXG5cdCAqIDxjb2RlPndvcmRXcmFwPC9jb2RlPiBwcm9wZXJ0eSBpcyBzZXQgdG8gPGNvZGU+dHJ1ZTwvY29kZT4sIHRoZSBudW1iZXIgb2Zcblx0ICogbGluZXMgaW5jcmVhc2VzIHdoZW4gdGV4dCB3cmFwcy5cblx0ICovXG5cdHB1YmxpYyBnZXQgbnVtTGluZXMoKTpudW1iZXIgLyppbnQqL1xuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX251bUxpbmVzO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB0aGUgc2V0IG9mIGNoYXJhY3RlcnMgdGhhdCBhIHVzZXIgY2FuIGVudGVyIGludG8gdGhlIHRleHQgZmllbGQuXG5cdCAqIElmIHRoZSB2YWx1ZSBvZiB0aGUgPGNvZGU+cmVzdHJpY3Q8L2NvZGU+IHByb3BlcnR5IGlzIDxjb2RlPm51bGw8L2NvZGU+LFxuXHQgKiB5b3UgY2FuIGVudGVyIGFueSBjaGFyYWN0ZXIuIElmIHRoZSB2YWx1ZSBvZiB0aGUgPGNvZGU+cmVzdHJpY3Q8L2NvZGU+XG5cdCAqIHByb3BlcnR5IGlzIGFuIGVtcHR5IHN0cmluZywgeW91IGNhbm5vdCBlbnRlciBhbnkgY2hhcmFjdGVyLiBJZiB0aGUgdmFsdWVcblx0ICogb2YgdGhlIDxjb2RlPnJlc3RyaWN0PC9jb2RlPiBwcm9wZXJ0eSBpcyBhIHN0cmluZyBvZiBjaGFyYWN0ZXJzLCB5b3UgY2FuXG5cdCAqIGVudGVyIG9ubHkgY2hhcmFjdGVycyBpbiB0aGUgc3RyaW5nIGludG8gdGhlIHRleHQgZmllbGQuIFRoZSBzdHJpbmcgaXNcblx0ICogc2Nhbm5lZCBmcm9tIGxlZnQgdG8gcmlnaHQuIFlvdSBjYW4gc3BlY2lmeSBhIHJhbmdlIGJ5IHVzaW5nIHRoZSBoeXBoZW5cblx0ICogKC0pIGNoYXJhY3Rlci4gT25seSB1c2VyIGludGVyYWN0aW9uIGlzIHJlc3RyaWN0ZWQ7IGEgc2NyaXB0IGNhbiBwdXQgYW55XG5cdCAqIHRleHQgaW50byB0aGUgdGV4dCBmaWVsZC4gPHBoIG91dHB1dGNsYXNzPVwiZmxhc2hvbmx5XCI+VGhpcyBwcm9wZXJ0eSBkb2VzXG5cdCAqIG5vdCBzeW5jaHJvbml6ZSB3aXRoIHRoZSBFbWJlZCBmb250IG9wdGlvbnMgaW4gdGhlIFByb3BlcnR5IGluc3BlY3Rvci5cblx0ICpcblx0ICogPHA+SWYgdGhlIHN0cmluZyBiZWdpbnMgd2l0aCBhIGNhcmV0KF4pIGNoYXJhY3RlciwgYWxsIGNoYXJhY3RlcnMgYXJlXG5cdCAqIGluaXRpYWxseSBhY2NlcHRlZCBhbmQgc3VjY2VlZGluZyBjaGFyYWN0ZXJzIGluIHRoZSBzdHJpbmcgYXJlIGV4Y2x1ZGVkXG5cdCAqIGZyb20gdGhlIHNldCBvZiBhY2NlcHRlZCBjaGFyYWN0ZXJzLiBJZiB0aGUgc3RyaW5nIGRvZXMgbm90IGJlZ2luIHdpdGggYVxuXHQgKiBjYXJldCheKSBjaGFyYWN0ZXIsIG5vIGNoYXJhY3RlcnMgYXJlIGluaXRpYWxseSBhY2NlcHRlZCBhbmQgc3VjY2VlZGluZ1xuXHQgKiBjaGFyYWN0ZXJzIGluIHRoZSBzdHJpbmcgYXJlIGluY2x1ZGVkIGluIHRoZSBzZXQgb2YgYWNjZXB0ZWRcblx0ICogY2hhcmFjdGVycy48L3A+XG5cdCAqXG5cdCAqIDxwPlRoZSBmb2xsb3dpbmcgZXhhbXBsZSBhbGxvd3Mgb25seSB1cHBlcmNhc2UgY2hhcmFjdGVycywgc3BhY2VzLCBhbmRcblx0ICogbnVtYmVycyB0byBiZSBlbnRlcmVkIGludG8gYSB0ZXh0IGZpZWxkOjwvcD5cblx0ICogPHByZSB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiPiBteV90eHQucmVzdHJpY3QgPSBcIkEtWiAwLTlcIjsgPC9wcmU+XG5cdCAqXG5cdCAqIDxwPlRoZSBmb2xsb3dpbmcgZXhhbXBsZSBpbmNsdWRlcyBhbGwgY2hhcmFjdGVycywgYnV0IGV4Y2x1ZGVzIGxvd2VyY2FzZVxuXHQgKiBsZXR0ZXJzOjwvcD5cblx0ICogPHByZSB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiPiBteV90eHQucmVzdHJpY3QgPSBcIl5hLXpcIjsgPC9wcmU+XG5cdCAqXG5cdCAqIDxwPllvdSBjYW4gdXNlIGEgYmFja3NsYXNoIHRvIGVudGVyIGEgXiBvciAtIHZlcmJhdGltLiBUaGUgYWNjZXB0ZWRcblx0ICogYmFja3NsYXNoIHNlcXVlbmNlcyBhcmUgXFwtLCBcXF4gb3IgXFxcXC4gVGhlIGJhY2tzbGFzaCBtdXN0IGJlIGFuIGFjdHVhbFxuXHQgKiBjaGFyYWN0ZXIgaW4gdGhlIHN0cmluZywgc28gd2hlbiBzcGVjaWZpZWQgaW4gQWN0aW9uU2NyaXB0LCBhIGRvdWJsZVxuXHQgKiBiYWNrc2xhc2ggbXVzdCBiZSB1c2VkLiBGb3IgZXhhbXBsZSwgdGhlIGZvbGxvd2luZyBjb2RlIGluY2x1ZGVzIG9ubHkgdGhlXG5cdCAqIGRhc2goLSkgYW5kIGNhcmV0KF4pOjwvcD5cblx0ICogPHByZSB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiPiBteV90eHQucmVzdHJpY3QgPSBcIlxcXFwtXFxcXF5cIjsgPC9wcmU+XG5cdCAqXG5cdCAqIDxwPlRoZSBeIGNhbiBiZSB1c2VkIGFueXdoZXJlIGluIHRoZSBzdHJpbmcgdG8gdG9nZ2xlIGJldHdlZW4gaW5jbHVkaW5nXG5cdCAqIGNoYXJhY3RlcnMgYW5kIGV4Y2x1ZGluZyBjaGFyYWN0ZXJzLiBUaGUgZm9sbG93aW5nIGNvZGUgaW5jbHVkZXMgb25seVxuXHQgKiB1cHBlcmNhc2UgbGV0dGVycywgYnV0IGV4Y2x1ZGVzIHRoZSB1cHBlcmNhc2UgbGV0dGVyIFE6PC9wPlxuXHQgKiA8cHJlIHhtbDpzcGFjZT1cInByZXNlcnZlXCI+IG15X3R4dC5yZXN0cmljdCA9IFwiQS1aXlFcIjsgPC9wcmU+XG5cdCAqXG5cdCAqIDxwPllvdSBjYW4gdXNlIHRoZSA8Y29kZT5cXHU8L2NvZGU+IGVzY2FwZSBzZXF1ZW5jZSB0byBjb25zdHJ1Y3Rcblx0ICogPGNvZGU+cmVzdHJpY3Q8L2NvZGU+IHN0cmluZ3MuIFRoZSBmb2xsb3dpbmcgY29kZSBpbmNsdWRlcyBvbmx5IHRoZVxuXHQgKiBjaGFyYWN0ZXJzIGZyb20gQVNDSUkgMzIoc3BhY2UpIHRvIEFTQ0lJIDEyNih0aWxkZSkuPC9wPlxuXHQgKiA8cHJlIHhtbDpzcGFjZT1cInByZXNlcnZlXCI+IG15X3R4dC5yZXN0cmljdCA9IFwiXFx1MDAyMC1cXHUwMDdFXCI7IDwvcHJlPlxuXHQgKiBcblx0ICogQGRlZmF1bHQgbnVsbFxuXHQgKi9cblx0cHVibGljIHJlc3RyaWN0OnN0cmluZztcblxuXHQvKipcblx0ICogVGhlIGN1cnJlbnQgaG9yaXpvbnRhbCBzY3JvbGxpbmcgcG9zaXRpb24uIElmIHRoZSA8Y29kZT5zY3JvbGxIPC9jb2RlPlxuXHQgKiBwcm9wZXJ0eSBpcyAwLCB0aGUgdGV4dCBpcyBub3QgaG9yaXpvbnRhbGx5IHNjcm9sbGVkLiBUaGlzIHByb3BlcnR5IHZhbHVlXG5cdCAqIGlzIGFuIGludGVnZXIgdGhhdCByZXByZXNlbnRzIHRoZSBob3Jpem9udGFsIHBvc2l0aW9uIGluIHBpeGVscy5cblx0ICpcblx0ICogPHA+VGhlIHVuaXRzIG9mIGhvcml6b250YWwgc2Nyb2xsaW5nIGFyZSBwaXhlbHMsIHdoZXJlYXMgdGhlIHVuaXRzIG9mXG5cdCAqIHZlcnRpY2FsIHNjcm9sbGluZyBhcmUgbGluZXMuIEhvcml6b250YWwgc2Nyb2xsaW5nIGlzIG1lYXN1cmVkIGluIHBpeGVsc1xuXHQgKiBiZWNhdXNlIG1vc3QgZm9udHMgeW91IHR5cGljYWxseSB1c2UgYXJlIHByb3BvcnRpb25hbGx5IHNwYWNlZDsgdGhhdCBpcyxcblx0ICogdGhlIGNoYXJhY3RlcnMgY2FuIGhhdmUgZGlmZmVyZW50IHdpZHRocy4gRmxhc2ggUGxheWVyIHBlcmZvcm1zIHZlcnRpY2FsXG5cdCAqIHNjcm9sbGluZyBieSBsaW5lIGJlY2F1c2UgdXNlcnMgdXN1YWxseSB3YW50IHRvIHNlZSBhIGNvbXBsZXRlIGxpbmUgb2Zcblx0ICogdGV4dCByYXRoZXIgdGhhbiBhIHBhcnRpYWwgbGluZS4gRXZlbiBpZiBhIGxpbmUgdXNlcyBtdWx0aXBsZSBmb250cywgdGhlXG5cdCAqIGhlaWdodCBvZiB0aGUgbGluZSBhZGp1c3RzIHRvIGZpdCB0aGUgbGFyZ2VzdCBmb250IGluIHVzZS48L3A+XG5cdCAqXG5cdCAqIDxwPjxiPk5vdGU6IDwvYj5UaGUgPGNvZGU+c2Nyb2xsSDwvY29kZT4gcHJvcGVydHkgaXMgemVyby1iYXNlZCwgbm90XG5cdCAqIDEtYmFzZWQgbGlrZSB0aGUgPGNvZGU+c2Nyb2xsVjwvY29kZT4gdmVydGljYWwgc2Nyb2xsaW5nIHByb3BlcnR5LjwvcD5cblx0ICovXG5cdHB1YmxpYyBzY3JvbGxIOm51bWJlcjtcblxuXHQvKipcblx0ICogVGhlIHZlcnRpY2FsIHBvc2l0aW9uIG9mIHRleHQgaW4gYSB0ZXh0IGZpZWxkLiBUaGUgPGNvZGU+c2Nyb2xsVjwvY29kZT5cblx0ICogcHJvcGVydHkgaXMgdXNlZnVsIGZvciBkaXJlY3RpbmcgdXNlcnMgdG8gYSBzcGVjaWZpYyBwYXJhZ3JhcGggaW4gYSBsb25nXG5cdCAqIHBhc3NhZ2UsIG9yIGNyZWF0aW5nIHNjcm9sbGluZyB0ZXh0IGZpZWxkcy5cblx0ICpcblx0ICogPHA+VGhlIHVuaXRzIG9mIHZlcnRpY2FsIHNjcm9sbGluZyBhcmUgbGluZXMsIHdoZXJlYXMgdGhlIHVuaXRzIG9mXG5cdCAqIGhvcml6b250YWwgc2Nyb2xsaW5nIGFyZSBwaXhlbHMuIElmIHRoZSBmaXJzdCBsaW5lIGRpc3BsYXllZCBpcyB0aGUgZmlyc3Rcblx0ICogbGluZSBpbiB0aGUgdGV4dCBmaWVsZCwgc2Nyb2xsViBpcyBzZXQgdG8gMShub3QgMCkuIEhvcml6b250YWwgc2Nyb2xsaW5nXG5cdCAqIGlzIG1lYXN1cmVkIGluIHBpeGVscyBiZWNhdXNlIG1vc3QgZm9udHMgYXJlIHByb3BvcnRpb25hbGx5IHNwYWNlZDsgdGhhdFxuXHQgKiBpcywgdGhlIGNoYXJhY3RlcnMgY2FuIGhhdmUgZGlmZmVyZW50IHdpZHRocy4gRmxhc2ggcGVyZm9ybXMgdmVydGljYWxcblx0ICogc2Nyb2xsaW5nIGJ5IGxpbmUgYmVjYXVzZSB1c2VycyB1c3VhbGx5IHdhbnQgdG8gc2VlIGEgY29tcGxldGUgbGluZSBvZlxuXHQgKiB0ZXh0IHJhdGhlciB0aGFuIGEgcGFydGlhbCBsaW5lLiBFdmVuIGlmIHRoZXJlIGFyZSBtdWx0aXBsZSBmb250cyBvbiBhXG5cdCAqIGxpbmUsIHRoZSBoZWlnaHQgb2YgdGhlIGxpbmUgYWRqdXN0cyB0byBmaXQgdGhlIGxhcmdlc3QgZm9udCBpbiB1c2UuPC9wPlxuXHQgKi9cblx0cHVibGljIHNjcm9sbFY6bnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBBIEJvb2xlYW4gdmFsdWUgdGhhdCBpbmRpY2F0ZXMgd2hldGhlciB0aGUgdGV4dCBmaWVsZCBpcyBzZWxlY3RhYmxlLiBUaGVcblx0ICogdmFsdWUgPGNvZGU+dHJ1ZTwvY29kZT4gaW5kaWNhdGVzIHRoYXQgdGhlIHRleHQgaXMgc2VsZWN0YWJsZS4gVGhlXG5cdCAqIDxjb2RlPnNlbGVjdGFibGU8L2NvZGU+IHByb3BlcnR5IGNvbnRyb2xzIHdoZXRoZXIgYSB0ZXh0IGZpZWxkIGlzXG5cdCAqIHNlbGVjdGFibGUsIG5vdCB3aGV0aGVyIGEgdGV4dCBmaWVsZCBpcyBlZGl0YWJsZS4gQSBkeW5hbWljIHRleHQgZmllbGQgY2FuXG5cdCAqIGJlIHNlbGVjdGFibGUgZXZlbiBpZiBpdCBpcyBub3QgZWRpdGFibGUuIElmIGEgZHluYW1pYyB0ZXh0IGZpZWxkIGlzIG5vdFxuXHQgKiBzZWxlY3RhYmxlLCB0aGUgdXNlciBjYW5ub3Qgc2VsZWN0IGl0cyB0ZXh0LlxuXHQgKlxuXHQgKiA8cD5JZiA8Y29kZT5zZWxlY3RhYmxlPC9jb2RlPiBpcyBzZXQgdG8gPGNvZGU+ZmFsc2U8L2NvZGU+LCB0aGUgdGV4dCBpblxuXHQgKiB0aGUgdGV4dCBmaWVsZCBkb2VzIG5vdCByZXNwb25kIHRvIHNlbGVjdGlvbiBjb21tYW5kcyBmcm9tIHRoZSBtb3VzZSBvclxuXHQgKiBrZXlib2FyZCwgYW5kIHRoZSB0ZXh0IGNhbm5vdCBiZSBjb3BpZWQgd2l0aCB0aGUgQ29weSBjb21tYW5kLiBJZlxuXHQgKiA8Y29kZT5zZWxlY3RhYmxlPC9jb2RlPiBpcyBzZXQgdG8gPGNvZGU+dHJ1ZTwvY29kZT4sIHRoZSB0ZXh0IGluIHRoZSB0ZXh0XG5cdCAqIGZpZWxkIGNhbiBiZSBzZWxlY3RlZCB3aXRoIHRoZSBtb3VzZSBvciBrZXlib2FyZCwgYW5kIHRoZSB0ZXh0IGNhbiBiZVxuXHQgKiBjb3BpZWQgd2l0aCB0aGUgQ29weSBjb21tYW5kLiBZb3UgY2FuIHNlbGVjdCB0ZXh0IHRoaXMgd2F5IGV2ZW4gaWYgdGhlXG5cdCAqIHRleHQgZmllbGQgaXMgYSBkeW5hbWljIHRleHQgZmllbGQgaW5zdGVhZCBvZiBhbiBpbnB1dCB0ZXh0IGZpZWxkLiA8L3A+XG5cdCAqIFxuXHQgKiBAZGVmYXVsdCB0cnVlXG5cdCAqL1xuXHRwdWJsaWMgc2VsZWN0YWJsZTpib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBUaGUgemVyby1iYXNlZCBjaGFyYWN0ZXIgaW5kZXggdmFsdWUgb2YgdGhlIGZpcnN0IGNoYXJhY3RlciBpbiB0aGUgY3VycmVudFxuXHQgKiBzZWxlY3Rpb24uIEZvciBleGFtcGxlLCB0aGUgZmlyc3QgY2hhcmFjdGVyIGlzIDAsIHRoZSBzZWNvbmQgY2hhcmFjdGVyIGlzXG5cdCAqIDEsIGFuZCBzbyBvbi4gSWYgbm8gdGV4dCBpcyBzZWxlY3RlZCwgdGhpcyBwcm9wZXJ0eSBpcyB0aGUgdmFsdWUgb2Zcblx0ICogPGNvZGU+Y2FyZXRJbmRleDwvY29kZT4uXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHNlbGVjdGlvbkJlZ2luSW5kZXgoKTpudW1iZXIgLyppbnQqL1xuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3NlbGVjdGlvbkJlZ2luSW5kZXg7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIHplcm8tYmFzZWQgY2hhcmFjdGVyIGluZGV4IHZhbHVlIG9mIHRoZSBsYXN0IGNoYXJhY3RlciBpbiB0aGUgY3VycmVudFxuXHQgKiBzZWxlY3Rpb24uIEZvciBleGFtcGxlLCB0aGUgZmlyc3QgY2hhcmFjdGVyIGlzIDAsIHRoZSBzZWNvbmQgY2hhcmFjdGVyIGlzXG5cdCAqIDEsIGFuZCBzbyBvbi4gSWYgbm8gdGV4dCBpcyBzZWxlY3RlZCwgdGhpcyBwcm9wZXJ0eSBpcyB0aGUgdmFsdWUgb2Zcblx0ICogPGNvZGU+Y2FyZXRJbmRleDwvY29kZT4uXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHNlbGVjdGlvbkVuZEluZGV4KCk6bnVtYmVyIC8qaW50Ki9cblx0e1xuXHRcdHJldHVybiB0aGlzLl9zZWxlY3Rpb25FbmRJbmRleDtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgc2hhcnBuZXNzIG9mIHRoZSBnbHlwaCBlZGdlcyBpbiB0aGlzIHRleHQgZmllbGQuIFRoaXMgcHJvcGVydHkgYXBwbGllc1xuXHQgKiBvbmx5IGlmIHRoZSA8Y29kZT5mbGFzaC50ZXh0LkFudGlBbGlhc1R5cGU8L2NvZGU+IHByb3BlcnR5IG9mIHRoZSB0ZXh0XG5cdCAqIGZpZWxkIGlzIHNldCB0byA8Y29kZT5mbGFzaC50ZXh0LkFudGlBbGlhc1R5cGUuQURWQU5DRUQ8L2NvZGU+LiBUaGUgcmFuZ2Vcblx0ICogZm9yIDxjb2RlPnNoYXJwbmVzczwvY29kZT4gaXMgYSBudW1iZXIgZnJvbSAtNDAwIHRvIDQwMC4gSWYgeW91IGF0dGVtcHQgdG9cblx0ICogc2V0IDxjb2RlPnNoYXJwbmVzczwvY29kZT4gdG8gYSB2YWx1ZSBvdXRzaWRlIHRoYXQgcmFuZ2UsIEZsYXNoIHNldHMgdGhlXG5cdCAqIHByb3BlcnR5IHRvIHRoZSBuZWFyZXN0IHZhbHVlIGluIHRoZSByYW5nZShlaXRoZXIgLTQwMCBvciA0MDApLlxuXHQgKiBcblx0ICogQGRlZmF1bHQgMFxuXHQgKi9cblx0cHVibGljIHNoYXJwbmVzczpudW1iZXI7XG5cblx0LyoqXG5cdCAqIEF0dGFjaGVzIGEgc3R5bGUgc2hlZXQgdG8gdGhlIHRleHQgZmllbGQuIEZvciBpbmZvcm1hdGlvbiBvbiBjcmVhdGluZ1xuXHQgKiBzdHlsZSBzaGVldHMsIHNlZSB0aGUgU3R5bGVTaGVldCBjbGFzcyBhbmQgdGhlIDxpPkFjdGlvblNjcmlwdCAzLjBcblx0ICogRGV2ZWxvcGVyJ3MgR3VpZGU8L2k+LlxuXHQgKlxuXHQgKiA8cD5Zb3UgY2FuIGNoYW5nZSB0aGUgc3R5bGUgc2hlZXQgYXNzb2NpYXRlZCB3aXRoIGEgdGV4dCBmaWVsZCBhdCBhbnlcblx0ICogdGltZS4gSWYgeW91IGNoYW5nZSB0aGUgc3R5bGUgc2hlZXQgaW4gdXNlLCB0aGUgdGV4dCBmaWVsZCBpcyByZWRyYXduIHdpdGhcblx0ICogdGhlIG5ldyBzdHlsZSBzaGVldC4gWW91IGNhbiBzZXQgdGhlIHN0eWxlIHNoZWV0IHRvIDxjb2RlPm51bGw8L2NvZGU+IG9yXG5cdCAqIDxjb2RlPnVuZGVmaW5lZDwvY29kZT4gdG8gcmVtb3ZlIHRoZSBzdHlsZSBzaGVldC4gSWYgdGhlIHN0eWxlIHNoZWV0IGluXG5cdCAqIHVzZSBpcyByZW1vdmVkLCB0aGUgdGV4dCBmaWVsZCBpcyByZWRyYXduIHdpdGhvdXQgYSBzdHlsZSBzaGVldC4gPC9wPlxuXHQgKlxuXHQgKiA8cD48Yj5Ob3RlOjwvYj4gSWYgdGhlIHN0eWxlIHNoZWV0IGlzIHJlbW92ZWQsIHRoZSBjb250ZW50cyBvZiBib3RoXG5cdCAqIDxjb2RlPlRleHRGaWVsZC50ZXh0PC9jb2RlPiBhbmQgPGNvZGU+IFRleHRGaWVsZC5odG1sVGV4dDwvY29kZT4gY2hhbmdlIHRvXG5cdCAqIGluY29ycG9yYXRlIHRoZSBmb3JtYXR0aW5nIHByZXZpb3VzbHkgYXBwbGllZCBieSB0aGUgc3R5bGUgc2hlZXQuIFRvXG5cdCAqIHByZXNlcnZlIHRoZSBvcmlnaW5hbCA8Y29kZT5UZXh0RmllbGQuaHRtbFRleHQ8L2NvZGU+IGNvbnRlbnRzIHdpdGhvdXQgdGhlXG5cdCAqIGZvcm1hdHRpbmcsIHNhdmUgdGhlIHZhbHVlIGluIGEgdmFyaWFibGUgYmVmb3JlIHJlbW92aW5nIHRoZSBzdHlsZVxuXHQgKiBzaGVldC48L3A+XG5cdCAqL1xuXHRwdWJsaWMgc3R5bGVTaGVldDpTdHlsZVNoZWV0O1xuXG5cdC8qKlxuXHQgKiBBIHN0cmluZyB0aGF0IGlzIHRoZSBjdXJyZW50IHRleHQgaW4gdGhlIHRleHQgZmllbGQuIExpbmVzIGFyZSBzZXBhcmF0ZWRcblx0ICogYnkgdGhlIGNhcnJpYWdlIHJldHVybiBjaGFyYWN0ZXIoPGNvZGU+J1xccic8L2NvZGU+LCBBU0NJSSAxMykuIFRoaXNcblx0ICogcHJvcGVydHkgY29udGFpbnMgdW5mb3JtYXR0ZWQgdGV4dCBpbiB0aGUgdGV4dCBmaWVsZCwgd2l0aG91dCBIVE1MIHRhZ3MuXG5cdCAqXG5cdCAqIDxwPlRvIGdldCB0aGUgdGV4dCBpbiBIVE1MIGZvcm0sIHVzZSB0aGUgPGNvZGU+aHRtbFRleHQ8L2NvZGU+XG5cdCAqIHByb3BlcnR5LjwvcD5cblx0ICovXG5cdHB1YmxpYyBnZXQgdGV4dCgpOnN0cmluZ1xuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3RleHQ7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHRleHQodmFsdWU6c3RyaW5nKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3RleHQgPT0gdmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl90ZXh0ID0gdmFsdWU7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIGNvbG9yIG9mIHRoZSB0ZXh0IGluIGEgdGV4dCBmaWVsZCwgaW4gaGV4YWRlY2ltYWwgZm9ybWF0LiBUaGVcblx0ICogaGV4YWRlY2ltYWwgY29sb3Igc3lzdGVtIHVzZXMgc2l4IGRpZ2l0cyB0byByZXByZXNlbnQgY29sb3IgdmFsdWVzLiBFYWNoXG5cdCAqIGRpZ2l0IGhhcyAxNiBwb3NzaWJsZSB2YWx1ZXMgb3IgY2hhcmFjdGVycy4gVGhlIGNoYXJhY3RlcnMgcmFuZ2UgZnJvbSAwLTlcblx0ICogYW5kIHRoZW4gQS1GLiBGb3IgZXhhbXBsZSwgYmxhY2sgaXMgPGNvZGU+MHgwMDAwMDA8L2NvZGU+OyB3aGl0ZSBpc1xuXHQgKiA8Y29kZT4weEZGRkZGRjwvY29kZT4uXG5cdCAqIFxuXHQgKiBAZGVmYXVsdCAwKDB4MDAwMDAwKVxuXHQgKi9cblx0cHVibGljIHRleHRDb2xvcjpudW1iZXIgLyppbnQqLztcblxuXHQvKipcblx0ICogVGhlIGhlaWdodCBvZiB0aGUgdGV4dCBpbiBwaXhlbHMuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHRleHRIZWlnaHQoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl90ZXh0SGVpZ2h0O1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBpbnRlcmFjdGlvbiBtb2RlIHByb3BlcnR5LCBEZWZhdWx0IHZhbHVlIGlzXG5cdCAqIFRleHRJbnRlcmFjdGlvbk1vZGUuTk9STUFMLiBPbiBtb2JpbGUgcGxhdGZvcm1zLCB0aGUgbm9ybWFsIG1vZGUgaW1wbGllc1xuXHQgKiB0aGF0IHRoZSB0ZXh0IGNhbiBiZSBzY3JvbGxlZCBidXQgbm90IHNlbGVjdGVkLiBPbmUgY2FuIHN3aXRjaCB0byB0aGVcblx0ICogc2VsZWN0YWJsZSBtb2RlIHRocm91Z2ggdGhlIGluLWJ1aWx0IGNvbnRleHQgbWVudSBvbiB0aGUgdGV4dCBmaWVsZC4gT25cblx0ICogRGVza3RvcCwgdGhlIG5vcm1hbCBtb2RlIGltcGxpZXMgdGhhdCB0aGUgdGV4dCBpcyBpbiBzY3JvbGxhYmxlIGFzIHdlbGwgYXNcblx0ICogc2VsZWN0aW9uIG1vZGUuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHRleHRJbnRlcmFjdGlvbk1vZGUoKTpUZXh0SW50ZXJhY3Rpb25Nb2RlXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fdGV4dEludGVyYWN0aW9uTW9kZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgd2lkdGggb2YgdGhlIHRleHQgaW4gcGl4ZWxzLlxuXHQgKi9cblx0cHVibGljIGdldCB0ZXh0V2lkdGgoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl90ZXh0V2lkdGg7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIHRoaWNrbmVzcyBvZiB0aGUgZ2x5cGggZWRnZXMgaW4gdGhpcyB0ZXh0IGZpZWxkLiBUaGlzIHByb3BlcnR5IGFwcGxpZXNcblx0ICogb25seSB3aGVuIDxjb2RlPkFudGlBbGlhc1R5cGU8L2NvZGU+IGlzIHNldCB0b1xuXHQgKiA8Y29kZT5BbnRpQWxpYXNUeXBlLkFEVkFOQ0VEPC9jb2RlPi5cblx0ICpcblx0ICogPHA+VGhlIHJhbmdlIGZvciA8Y29kZT50aGlja25lc3M8L2NvZGU+IGlzIGEgbnVtYmVyIGZyb20gLTIwMCB0byAyMDAuIElmXG5cdCAqIHlvdSBhdHRlbXB0IHRvIHNldCA8Y29kZT50aGlja25lc3M8L2NvZGU+IHRvIGEgdmFsdWUgb3V0c2lkZSB0aGF0IHJhbmdlLFxuXHQgKiB0aGUgcHJvcGVydHkgaXMgc2V0IHRvIHRoZSBuZWFyZXN0IHZhbHVlIGluIHRoZSByYW5nZShlaXRoZXIgLTIwMCBvclxuXHQgKiAyMDApLjwvcD5cblx0ICogXG5cdCAqIEBkZWZhdWx0IDBcblx0ICovXG5cdHB1YmxpYyB0aGlja25lc3M6bnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBUaGUgdHlwZSBvZiB0aGUgdGV4dCBmaWVsZC4gRWl0aGVyIG9uZSBvZiB0aGUgZm9sbG93aW5nIFRleHRGaWVsZFR5cGVcblx0ICogY29uc3RhbnRzOiA8Y29kZT5UZXh0RmllbGRUeXBlLkRZTkFNSUM8L2NvZGU+LCB3aGljaCBzcGVjaWZpZXMgYSBkeW5hbWljXG5cdCAqIHRleHQgZmllbGQsIHdoaWNoIGEgdXNlciBjYW5ub3QgZWRpdCwgb3IgPGNvZGU+VGV4dEZpZWxkVHlwZS5JTlBVVDwvY29kZT4sXG5cdCAqIHdoaWNoIHNwZWNpZmllcyBhbiBpbnB1dCB0ZXh0IGZpZWxkLCB3aGljaCBhIHVzZXIgY2FuIGVkaXQuXG5cdCAqIFxuXHQgKiBAZGVmYXVsdCBkeW5hbWljXG5cdCAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciBUaGUgPGNvZGU+dHlwZTwvY29kZT4gc3BlY2lmaWVkIGlzIG5vdCBhIG1lbWJlciBvZlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgZmxhc2gudGV4dC5UZXh0RmllbGRUeXBlLlxuXHQgKi9cblx0cHVibGljIHR5cGU6VGV4dEZpZWxkVHlwZTtcblxuXHQvKipcblx0ICogU3BlY2lmaWVzIHdoZXRoZXIgdG8gY29weSBhbmQgcGFzdGUgdGhlIHRleHQgZm9ybWF0dGluZyBhbG9uZyB3aXRoIHRoZVxuXHQgKiB0ZXh0LiBXaGVuIHNldCB0byA8Y29kZT50cnVlPC9jb2RlPiwgRmxhc2ggUGxheWVyIGNvcGllcyBhbmQgcGFzdGVzXG5cdCAqIGZvcm1hdHRpbmcoc3VjaCBhcyBhbGlnbm1lbnQsIGJvbGQsIGFuZCBpdGFsaWNzKSB3aGVuIHlvdSBjb3B5IGFuZCBwYXN0ZVxuXHQgKiBiZXR3ZWVuIHRleHQgZmllbGRzLiBCb3RoIHRoZSBvcmlnaW4gYW5kIGRlc3RpbmF0aW9uIHRleHQgZmllbGRzIGZvciB0aGVcblx0ICogY29weSBhbmQgcGFzdGUgcHJvY2VkdXJlIG11c3QgaGF2ZSA8Y29kZT51c2VSaWNoVGV4dENsaXBib2FyZDwvY29kZT4gc2V0XG5cdCAqIHRvIDxjb2RlPnRydWU8L2NvZGU+LiBUaGUgZGVmYXVsdCB2YWx1ZSBpcyA8Y29kZT5mYWxzZTwvY29kZT4uXG5cdCAqL1xuXHRwdWJsaWMgdXNlUmljaFRleHRDbGlwYm9hcmQ6Ym9vbGVhbjtcblxuXHQvKipcblx0ICogQSBCb29sZWFuIHZhbHVlIHRoYXQgaW5kaWNhdGVzIHdoZXRoZXIgdGhlIHRleHQgZmllbGQgaGFzIHdvcmQgd3JhcC4gSWZcblx0ICogdGhlIHZhbHVlIG9mIDxjb2RlPndvcmRXcmFwPC9jb2RlPiBpcyA8Y29kZT50cnVlPC9jb2RlPiwgdGhlIHRleHQgZmllbGRcblx0ICogaGFzIHdvcmQgd3JhcDsgaWYgdGhlIHZhbHVlIGlzIDxjb2RlPmZhbHNlPC9jb2RlPiwgdGhlIHRleHQgZmllbGQgZG9lcyBub3Rcblx0ICogaGF2ZSB3b3JkIHdyYXAuIFRoZSBkZWZhdWx0IHZhbHVlIGlzIDxjb2RlPmZhbHNlPC9jb2RlPi5cblx0ICovXG5cdHB1YmxpYyB3b3JkV3JhcDpib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGEgbmV3IFRleHRGaWVsZCBpbnN0YW5jZS4gQWZ0ZXIgeW91IGNyZWF0ZSB0aGUgVGV4dEZpZWxkIGluc3RhbmNlLFxuXHQgKiBjYWxsIHRoZSA8Y29kZT5hZGRDaGlsZCgpPC9jb2RlPiBvciA8Y29kZT5hZGRDaGlsZEF0KCk8L2NvZGU+IG1ldGhvZCBvZlxuXHQgKiB0aGUgcGFyZW50IERpc3BsYXlPYmplY3RDb250YWluZXIgb2JqZWN0IHRvIGFkZCB0aGUgVGV4dEZpZWxkIGluc3RhbmNlIHRvXG5cdCAqIHRoZSBkaXNwbGF5IGxpc3QuXG5cdCAqXG5cdCAqIDxwPlRoZSBkZWZhdWx0IHNpemUgZm9yIGEgdGV4dCBmaWVsZCBpcyAxMDAgeCAxMDAgcGl4ZWxzLjwvcD5cblx0ICovXG5cdGNvbnN0cnVjdG9yKClcblx0e1xuXHRcdHN1cGVyKG5ldyBHZW9tZXRyeSgpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBcHBlbmRzIHRoZSBzdHJpbmcgc3BlY2lmaWVkIGJ5IHRoZSA8Y29kZT5uZXdUZXh0PC9jb2RlPiBwYXJhbWV0ZXIgdG8gdGhlXG5cdCAqIGVuZCBvZiB0aGUgdGV4dCBvZiB0aGUgdGV4dCBmaWVsZC4gVGhpcyBtZXRob2QgaXMgbW9yZSBlZmZpY2llbnQgdGhhbiBhblxuXHQgKiBhZGRpdGlvbiBhc3NpZ25tZW50KDxjb2RlPis9PC9jb2RlPikgb24gYSA8Y29kZT50ZXh0PC9jb2RlPiBwcm9wZXJ0eVxuXHQgKiAoc3VjaCBhcyA8Y29kZT5zb21lVGV4dEZpZWxkLnRleHQgKz0gbW9yZVRleHQ8L2NvZGU+KSwgcGFydGljdWxhcmx5IGZvciBhXG5cdCAqIHRleHQgZmllbGQgdGhhdCBjb250YWlucyBhIHNpZ25pZmljYW50IGFtb3VudCBvZiBjb250ZW50LlxuXHQgKiBcblx0ICogQHBhcmFtIG5ld1RleHQgVGhlIHN0cmluZyB0byBhcHBlbmQgdG8gdGhlIGV4aXN0aW5nIHRleHQuXG5cdCAqL1xuXHRwdWJsaWMgYXBwZW5kVGV4dChuZXdUZXh0OnN0cmluZywgbmV3Rm9ybWF0OlRleHRGb3JtYXQpIHtcblxuXHRcdHZhciBpbmRpY2VzOkFycmF5PG51bWJlcj4gPSBuZXcgQXJyYXk8bnVtYmVyPigpO1xuXHRcdHZhciBwb3NpdGlvbnM6QXJyYXk8bnVtYmVyPiA9IG5ldyBBcnJheTxudW1iZXI+KCk7XG5cdFx0dmFyIGN1cnZlRGF0YTpBcnJheTxudW1iZXI+ID0gbmV3IEFycmF5PG51bWJlcj4oKTtcblx0XHR2YXIgdXZzOkFycmF5PG51bWJlcj4gPSBuZXcgQXJyYXk8bnVtYmVyPigpO1xuXG5cdFx0dmFyIGNoYXJfc2NhbGU6bnVtYmVyPW5ld0Zvcm1hdC5zaXplL25ld0Zvcm1hdC5mb250X3RhYmxlLmdldF9mb250X2VtX3NpemUoKTtcblx0XHR2YXIgdHJpX2lkeF9vZmZzZXQ6bnVtYmVyPTA7XG5cdFx0dmFyIHRyaV9jbnQ6bnVtYmVyPTA7XG5cdFx0dmFyIHhfb2Zmc2V0Om51bWJlcj0wO1xuXHRcdHZhciB5X29mZnNldDpudW1iZXI9MDtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG5ld1RleHQubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciB0aGlzX3N1Ykdlb206Q3VydmVTdWJHZW9tZXRyeSA9IDxDdXJ2ZVN1Ykdlb21ldHJ5PiBuZXdGb3JtYXQuZm9udF90YWJsZS5nZXRfc3ViZ2VvX2Zvcl9jaGFyKG5ld1RleHQuY2hhckNvZGVBdChpKS50b1N0cmluZygpKTtcblx0XHRcdGlmICh0aGlzX3N1Ykdlb20gIT0gbnVsbCkge1xuXHRcdFx0XHR0cmlfY250PTA7XG5cdFx0XHRcdHZhciBpbmRpY2VzMjpBcnJheTxudW1iZXI+ID0gdGhpc19zdWJHZW9tLmluZGljZXM7XG5cdFx0XHRcdHZhciBwb3NpdGlvbnMyOkFycmF5PG51bWJlcj4gPSB0aGlzX3N1Ykdlb20ucG9zaXRpb25zO1xuXHRcdFx0XHR2YXIgY3VydmVEYXRhMjpBcnJheTxudW1iZXI+ID0gdGhpc19zdWJHZW9tLmN1cnZlcztcblx0XHRcdFx0Zm9yICh2YXIgdiA9IDA7IHYgPCBpbmRpY2VzMi5sZW5ndGg7IHYrKykge1xuXHRcdFx0XHRcdGluZGljZXMucHVzaChpbmRpY2VzMlt2XSt0cmlfaWR4X29mZnNldCk7XG5cdFx0XHRcdFx0dHJpX2NudCsrO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRyaV9pZHhfb2Zmc2V0Kz10cmlfY250O1xuXHRcdFx0XHRmb3IgKHYgPSAwOyB2IDwgcG9zaXRpb25zMi5sZW5ndGgvMzsgdisrKSB7XG5cdFx0XHRcdFx0cG9zaXRpb25zLnB1c2goKHBvc2l0aW9uczJbdiozXSpjaGFyX3NjYWxlKSt4X29mZnNldCk7XG5cdFx0XHRcdFx0cG9zaXRpb25zLnB1c2goKHBvc2l0aW9uczJbdiozKzFdKmNoYXJfc2NhbGUqLTEpK3lfb2Zmc2V0KTtcblx0XHRcdFx0XHRwb3NpdGlvbnMucHVzaChwb3NpdGlvbnMyW3YqMysyXSk7XG5cdFx0XHRcdFx0Y3VydmVEYXRhLnB1c2goY3VydmVEYXRhMlt2KjJdKTtcblx0XHRcdFx0XHRjdXJ2ZURhdGEucHVzaChjdXJ2ZURhdGEyW3YqMisxXSk7XG5cdFx0XHRcdFx0dXZzLnB1c2goMC4wKTtcblx0XHRcdFx0XHR1dnMucHVzaCgwLjApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHhfb2Zmc2V0Kz1uZXdGb3JtYXQuZm9udF90YWJsZS5nZXRfZm9udF9lbV9zaXplKCkqY2hhcl9zY2FsZTtcblx0XHRcdFx0Ly94Y291bnQrPW5ld0Zvcm1hdC5mb250X3RhYmxlLmdldF9mb250X2VtX3NpemUoKTtcblx0XHRcdFx0Y29uc29sZS5sb2coeF9vZmZzZXQpO1xuXHRcdFx0XHQvL21hdHJpeC5hcHBlbmRTY2FsZSgwLjEsMC4xLDAuMSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHZhciBjdXJ2ZV9zdWJfZ2VvbTpDdXJ2ZVN1Ykdlb21ldHJ5ID0gbmV3IEN1cnZlU3ViR2VvbWV0cnkodHJ1ZSk7XG5cdFx0Y3VydmVfc3ViX2dlb20udXBkYXRlSW5kaWNlcyhpbmRpY2VzKTtcblx0XHRjdXJ2ZV9zdWJfZ2VvbS51cGRhdGVQb3NpdGlvbnMocG9zaXRpb25zKTtcblx0XHRjdXJ2ZV9zdWJfZ2VvbS51cGRhdGVDdXJ2ZXMoY3VydmVEYXRhKTtcblx0XHRjdXJ2ZV9zdWJfZ2VvbS51cGRhdGVVVnModXZzKTtcblx0XHR0aGlzLmdlb21ldHJ5LmFkZFN1Ykdlb21ldHJ5KGN1cnZlX3N1Yl9nZW9tKTtcblx0XHR0aGlzLnN1Yk1lc2hlc1swXS5tYXRlcmlhbD1uZXdGb3JtYXQubWF0ZXJpYWw7XG5cblx0fVxuXG5cdC8qKlxuXHQgKiAqdGVsbHMgdGhlIFRleHRmaWVsZCB0aGF0IGEgcGFyYWdyYXBoIGlzIGRlZmluZWQgY29tcGxldGx5LlxuXHQgKiBlLmcuIHRoZSB0ZXh0ZmllbGQgd2lsbCBzdGFydCBhIG5ldyBsaW5lIGZvciBmdXR1cmUgYWRkZWQgdGV4dC5cblx0ICovXG5cdHB1YmxpYyBjbG9zZVBhcmFncmFwaCgpXG5cdHtcblx0XHQvL1RPRE9cblx0fVxuXHQvKipcblx0ICogKnRlbGxzIHRoZSBUZXh0ZmllbGQgdGhhdCBhIHBhcmFncmFwaCBpcyBkZWZpbmVkIGNvbXBsZXRseS5cblx0ICogZS5nLiB0aGUgdGV4dGZpZWxkIHdpbGwgc3RhcnQgYSBuZXcgbGluZSBmb3IgZnV0dXJlIGFkZGVkIHRleHQuXG5cdCAqL1xuXHRwdWJsaWMgY29uc3RydWN0X2dlb21ldHJ5KClcblx0e1xuXHRcdC8vVE9ET1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgYSByZWN0YW5nbGUgdGhhdCBpcyB0aGUgYm91bmRpbmcgYm94IG9mIHRoZSBjaGFyYWN0ZXIuXG5cdCAqIFxuXHQgKiBAcGFyYW0gY2hhckluZGV4IFRoZSB6ZXJvLWJhc2VkIGluZGV4IHZhbHVlIGZvciB0aGUgY2hhcmFjdGVyKGZvclxuXHQgKiAgICAgICAgICAgICAgICAgIGV4YW1wbGUsIHRoZSBmaXJzdCBwb3NpdGlvbiBpcyAwLCB0aGUgc2Vjb25kIHBvc2l0aW9uIGlzXG5cdCAqICAgICAgICAgICAgICAgICAgMSwgYW5kIHNvIG9uKS5cblx0ICogQHJldHVybiBBIHJlY3RhbmdsZSB3aXRoIDxjb2RlPng8L2NvZGU+IGFuZCA8Y29kZT55PC9jb2RlPiBtaW5pbXVtIGFuZFxuXHQgKiAgICAgICAgIG1heGltdW0gdmFsdWVzIGRlZmluaW5nIHRoZSBib3VuZGluZyBib3ggb2YgdGhlIGNoYXJhY3Rlci5cblx0ICovXG5cdHB1YmxpYyBnZXRDaGFyQm91bmRhcmllcyhjaGFySW5kZXg6bnVtYmVyKTpSZWN0YW5nbGVcblx0e1xuXHRcdHJldHVybiB0aGlzLl9jaGFyQm91bmRhcmllcztcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSB6ZXJvLWJhc2VkIGluZGV4IHZhbHVlIG9mIHRoZSBjaGFyYWN0ZXIgYXQgdGhlIHBvaW50IHNwZWNpZmllZFxuXHQgKiBieSB0aGUgPGNvZGU+eDwvY29kZT4gYW5kIDxjb2RlPnk8L2NvZGU+IHBhcmFtZXRlcnMuXG5cdCAqIFxuXHQgKiBAcGFyYW0geCBUaGUgPGk+eDwvaT4gY29vcmRpbmF0ZSBvZiB0aGUgY2hhcmFjdGVyLlxuXHQgKiBAcGFyYW0geSBUaGUgPGk+eTwvaT4gY29vcmRpbmF0ZSBvZiB0aGUgY2hhcmFjdGVyLlxuXHQgKiBAcmV0dXJuIFRoZSB6ZXJvLWJhc2VkIGluZGV4IHZhbHVlIG9mIHRoZSBjaGFyYWN0ZXIoZm9yIGV4YW1wbGUsIHRoZVxuXHQgKiAgICAgICAgIGZpcnN0IHBvc2l0aW9uIGlzIDAsIHRoZSBzZWNvbmQgcG9zaXRpb24gaXMgMSwgYW5kIHNvIG9uKS4gUmV0dXJuc1xuXHQgKiAgICAgICAgIC0xIGlmIHRoZSBwb2ludCBpcyBub3Qgb3ZlciBhbnkgY2hhcmFjdGVyLlxuXHQgKi9cblx0cHVibGljIGdldENoYXJJbmRleEF0UG9pbnQoeDpudW1iZXIsIHk6bnVtYmVyKTpudW1iZXIgLyppbnQqL1xuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2NoYXJJbmRleEF0UG9pbnQ7XG5cdH1cblxuXHQvKipcblx0ICogR2l2ZW4gYSBjaGFyYWN0ZXIgaW5kZXgsIHJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBmaXJzdCBjaGFyYWN0ZXIgaW4gdGhlXG5cdCAqIHNhbWUgcGFyYWdyYXBoLlxuXHQgKiBcblx0ICogQHBhcmFtIGNoYXJJbmRleCBUaGUgemVyby1iYXNlZCBpbmRleCB2YWx1ZSBvZiB0aGUgY2hhcmFjdGVyKGZvciBleGFtcGxlLFxuXHQgKiAgICAgICAgICAgICAgICAgIHRoZSBmaXJzdCBjaGFyYWN0ZXIgaXMgMCwgdGhlIHNlY29uZCBjaGFyYWN0ZXIgaXMgMSwgYW5kXG5cdCAqICAgICAgICAgICAgICAgICAgc28gb24pLlxuXHQgKiBAcmV0dXJuIFRoZSB6ZXJvLWJhc2VkIGluZGV4IHZhbHVlIG9mIHRoZSBmaXJzdCBjaGFyYWN0ZXIgaW4gdGhlIHNhbWVcblx0ICogICAgICAgICBwYXJhZ3JhcGguXG5cdCAqIEB0aHJvd3MgUmFuZ2VFcnJvciBUaGUgY2hhcmFjdGVyIGluZGV4IHNwZWNpZmllZCBpcyBvdXQgb2YgcmFuZ2UuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0Rmlyc3RDaGFySW5QYXJhZ3JhcGgoY2hhckluZGV4Om51bWJlciAvKmludCovKTpudW1iZXIgLyppbnQqL1xuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2ZpcnN0Q2hhckluUGFyYWdyYXBoO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgYSBEaXNwbGF5T2JqZWN0IHJlZmVyZW5jZSBmb3IgdGhlIGdpdmVuIDxjb2RlPmlkPC9jb2RlPiwgZm9yIGFuXG5cdCAqIGltYWdlIG9yIFNXRiBmaWxlIHRoYXQgaGFzIGJlZW4gYWRkZWQgdG8gYW4gSFRNTC1mb3JtYXR0ZWQgdGV4dCBmaWVsZCBieVxuXHQgKiB1c2luZyBhbiA8Y29kZT48aW1nPjwvY29kZT4gdGFnLiBUaGUgPGNvZGU+PGltZz48L2NvZGU+IHRhZyBpcyBpbiB0aGVcblx0ICogZm9sbG93aW5nIGZvcm1hdDpcblx0ICpcblx0ICogPHA+PHByZSB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiPjxjb2RlPiA8aW1nIHNyYyA9ICdmaWxlbmFtZS5qcGcnIGlkID1cblx0ICogJ2luc3RhbmNlTmFtZScgPjwvY29kZT48L3ByZT48L3A+XG5cdCAqIFxuXHQgKiBAcGFyYW0gaWQgVGhlIDxjb2RlPmlkPC9jb2RlPiB0byBtYXRjaChpbiB0aGUgPGNvZGU+aWQ8L2NvZGU+IGF0dHJpYnV0ZVxuXHQgKiAgICAgICAgICAgb2YgdGhlIDxjb2RlPjxpbWc+PC9jb2RlPiB0YWcpLlxuXHQgKiBAcmV0dXJuIFRoZSBkaXNwbGF5IG9iamVjdCBjb3JyZXNwb25kaW5nIHRvIHRoZSBpbWFnZSBvciBTV0YgZmlsZSB3aXRoIHRoZVxuXHQgKiAgICAgICAgIG1hdGNoaW5nIDxjb2RlPmlkPC9jb2RlPiBhdHRyaWJ1dGUgaW4gdGhlIDxjb2RlPjxpbWc+PC9jb2RlPiB0YWdcblx0ICogICAgICAgICBvZiB0aGUgdGV4dCBmaWVsZC4gRm9yIG1lZGlhIGxvYWRlZCBmcm9tIGFuIGV4dGVybmFsIHNvdXJjZSwgdGhpc1xuXHQgKiAgICAgICAgIG9iamVjdCBpcyBhIExvYWRlciBvYmplY3QsIGFuZCwgb25jZSBsb2FkZWQsIHRoZSBtZWRpYSBvYmplY3QgaXMgYVxuXHQgKiAgICAgICAgIGNoaWxkIG9mIHRoYXQgTG9hZGVyIG9iamVjdC4gRm9yIG1lZGlhIGVtYmVkZGVkIGluIHRoZSBTV0YgZmlsZSxcblx0ICogICAgICAgICBpdCBpcyB0aGUgbG9hZGVkIG9iamVjdC4gSWYgbm8gPGNvZGU+PGltZz48L2NvZGU+IHRhZyB3aXRoIHRoZVxuXHQgKiAgICAgICAgIG1hdGNoaW5nIDxjb2RlPmlkPC9jb2RlPiBleGlzdHMsIHRoZSBtZXRob2QgcmV0dXJuc1xuXHQgKiAgICAgICAgIDxjb2RlPm51bGw8L2NvZGU+LlxuXHQgKi9cblx0cHVibGljIGdldEltYWdlUmVmZXJlbmNlKGlkOnN0cmluZyk6RGlzcGxheU9iamVjdFxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2ltYWdlUmVmZXJlbmNlO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIHplcm8tYmFzZWQgaW5kZXggdmFsdWUgb2YgdGhlIGxpbmUgYXQgdGhlIHBvaW50IHNwZWNpZmllZCBieVxuXHQgKiB0aGUgPGNvZGU+eDwvY29kZT4gYW5kIDxjb2RlPnk8L2NvZGU+IHBhcmFtZXRlcnMuXG5cdCAqIFxuXHQgKiBAcGFyYW0geCBUaGUgPGk+eDwvaT4gY29vcmRpbmF0ZSBvZiB0aGUgbGluZS5cblx0ICogQHBhcmFtIHkgVGhlIDxpPnk8L2k+IGNvb3JkaW5hdGUgb2YgdGhlIGxpbmUuXG5cdCAqIEByZXR1cm4gVGhlIHplcm8tYmFzZWQgaW5kZXggdmFsdWUgb2YgdGhlIGxpbmUoZm9yIGV4YW1wbGUsIHRoZSBmaXJzdFxuXHQgKiAgICAgICAgIGxpbmUgaXMgMCwgdGhlIHNlY29uZCBsaW5lIGlzIDEsIGFuZCBzbyBvbikuIFJldHVybnMgLTEgaWYgdGhlXG5cdCAqICAgICAgICAgcG9pbnQgaXMgbm90IG92ZXIgYW55IGxpbmUuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0TGluZUluZGV4QXRQb2ludCh4Om51bWJlciwgeTpudW1iZXIpOm51bWJlciAvKmludCovXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fbGluZUluZGV4QXRQb2ludDtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSB6ZXJvLWJhc2VkIGluZGV4IHZhbHVlIG9mIHRoZSBsaW5lIGNvbnRhaW5pbmcgdGhlIGNoYXJhY3RlclxuXHQgKiBzcGVjaWZpZWQgYnkgdGhlIDxjb2RlPmNoYXJJbmRleDwvY29kZT4gcGFyYW1ldGVyLlxuXHQgKiBcblx0ICogQHBhcmFtIGNoYXJJbmRleCBUaGUgemVyby1iYXNlZCBpbmRleCB2YWx1ZSBvZiB0aGUgY2hhcmFjdGVyKGZvciBleGFtcGxlLFxuXHQgKiAgICAgICAgICAgICAgICAgIHRoZSBmaXJzdCBjaGFyYWN0ZXIgaXMgMCwgdGhlIHNlY29uZCBjaGFyYWN0ZXIgaXMgMSwgYW5kXG5cdCAqICAgICAgICAgICAgICAgICAgc28gb24pLlxuXHQgKiBAcmV0dXJuIFRoZSB6ZXJvLWJhc2VkIGluZGV4IHZhbHVlIG9mIHRoZSBsaW5lLlxuXHQgKiBAdGhyb3dzIFJhbmdlRXJyb3IgVGhlIGNoYXJhY3RlciBpbmRleCBzcGVjaWZpZWQgaXMgb3V0IG9mIHJhbmdlLlxuXHQgKi9cblx0cHVibGljIGdldExpbmVJbmRleE9mQ2hhcihjaGFySW5kZXg6bnVtYmVyIC8qaW50Ki8pOm51bWJlciAvKmludCovXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fbGluZUluZGV4T2ZDaGFyO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIG51bWJlciBvZiBjaGFyYWN0ZXJzIGluIGEgc3BlY2lmaWMgdGV4dCBsaW5lLlxuXHQgKiBcblx0ICogQHBhcmFtIGxpbmVJbmRleCBUaGUgbGluZSBudW1iZXIgZm9yIHdoaWNoIHlvdSB3YW50IHRoZSBsZW5ndGguXG5cdCAqIEByZXR1cm4gVGhlIG51bWJlciBvZiBjaGFyYWN0ZXJzIGluIHRoZSBsaW5lLlxuXHQgKiBAdGhyb3dzIFJhbmdlRXJyb3IgVGhlIGxpbmUgbnVtYmVyIHNwZWNpZmllZCBpcyBvdXQgb2YgcmFuZ2UuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0TGluZUxlbmd0aChsaW5lSW5kZXg6bnVtYmVyIC8qaW50Ki8pOm51bWJlciAvKmludCovXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fbGluZUxlbmd0aDtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIG1ldHJpY3MgaW5mb3JtYXRpb24gYWJvdXQgYSBnaXZlbiB0ZXh0IGxpbmUuXG5cdCAqIFxuXHQgKiBAcGFyYW0gbGluZUluZGV4IFRoZSBsaW5lIG51bWJlciBmb3Igd2hpY2ggeW91IHdhbnQgbWV0cmljcyBpbmZvcm1hdGlvbi5cblx0ICogQHJldHVybiBBIFRleHRMaW5lTWV0cmljcyBvYmplY3QuXG5cdCAqIEB0aHJvd3MgUmFuZ2VFcnJvciBUaGUgbGluZSBudW1iZXIgc3BlY2lmaWVkIGlzIG91dCBvZiByYW5nZS5cblx0ICovXG5cdHB1YmxpYyBnZXRMaW5lTWV0cmljcyhsaW5lSW5kZXg6bnVtYmVyIC8qaW50Ki8pOlRleHRMaW5lTWV0cmljc1xuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2xpbmVNZXRyaWNzO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIGNoYXJhY3RlciBpbmRleCBvZiB0aGUgZmlyc3QgY2hhcmFjdGVyIGluIHRoZSBsaW5lIHRoYXQgdGhlXG5cdCAqIDxjb2RlPmxpbmVJbmRleDwvY29kZT4gcGFyYW1ldGVyIHNwZWNpZmllcy5cblx0ICogXG5cdCAqIEBwYXJhbSBsaW5lSW5kZXggVGhlIHplcm8tYmFzZWQgaW5kZXggdmFsdWUgb2YgdGhlIGxpbmUoZm9yIGV4YW1wbGUsIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgIGZpcnN0IGxpbmUgaXMgMCwgdGhlIHNlY29uZCBsaW5lIGlzIDEsIGFuZCBzbyBvbikuXG5cdCAqIEByZXR1cm4gVGhlIHplcm8tYmFzZWQgaW5kZXggdmFsdWUgb2YgdGhlIGZpcnN0IGNoYXJhY3RlciBpbiB0aGUgbGluZS5cblx0ICogQHRocm93cyBSYW5nZUVycm9yIFRoZSBsaW5lIG51bWJlciBzcGVjaWZpZWQgaXMgb3V0IG9mIHJhbmdlLlxuXHQgKi9cblx0cHVibGljIGdldExpbmVPZmZzZXQobGluZUluZGV4Om51bWJlciAvKmludCovKTpudW1iZXIgLyppbnQqL1xuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2xpbmVPZmZzZXQ7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgdGV4dCBvZiB0aGUgbGluZSBzcGVjaWZpZWQgYnkgdGhlIDxjb2RlPmxpbmVJbmRleDwvY29kZT5cblx0ICogcGFyYW1ldGVyLlxuXHQgKiBcblx0ICogQHBhcmFtIGxpbmVJbmRleCBUaGUgemVyby1iYXNlZCBpbmRleCB2YWx1ZSBvZiB0aGUgbGluZShmb3IgZXhhbXBsZSwgdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgZmlyc3QgbGluZSBpcyAwLCB0aGUgc2Vjb25kIGxpbmUgaXMgMSwgYW5kIHNvIG9uKS5cblx0ICogQHJldHVybiBUaGUgdGV4dCBzdHJpbmcgY29udGFpbmVkIGluIHRoZSBzcGVjaWZpZWQgbGluZS5cblx0ICogQHRocm93cyBSYW5nZUVycm9yIFRoZSBsaW5lIG51bWJlciBzcGVjaWZpZWQgaXMgb3V0IG9mIHJhbmdlLlxuXHQgKi9cblx0cHVibGljIGdldExpbmVUZXh0KGxpbmVJbmRleDpudW1iZXIgLyppbnQqLyk6c3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fbGluZVRleHQ7XG5cdH1cblxuXHQvKipcblx0ICogR2l2ZW4gYSBjaGFyYWN0ZXIgaW5kZXgsIHJldHVybnMgdGhlIGxlbmd0aCBvZiB0aGUgcGFyYWdyYXBoIGNvbnRhaW5pbmdcblx0ICogdGhlIGdpdmVuIGNoYXJhY3Rlci4gVGhlIGxlbmd0aCBpcyByZWxhdGl2ZSB0byB0aGUgZmlyc3QgY2hhcmFjdGVyIGluIHRoZVxuXHQgKiBwYXJhZ3JhcGgoYXMgcmV0dXJuZWQgYnkgPGNvZGU+Z2V0Rmlyc3RDaGFySW5QYXJhZ3JhcGgoKTwvY29kZT4pLCBub3QgdG9cblx0ICogdGhlIGNoYXJhY3RlciBpbmRleCBwYXNzZWQgaW4uXG5cdCAqIFxuXHQgKiBAcGFyYW0gY2hhckluZGV4IFRoZSB6ZXJvLWJhc2VkIGluZGV4IHZhbHVlIG9mIHRoZSBjaGFyYWN0ZXIoZm9yIGV4YW1wbGUsXG5cdCAqICAgICAgICAgICAgICAgICAgdGhlIGZpcnN0IGNoYXJhY3RlciBpcyAwLCB0aGUgc2Vjb25kIGNoYXJhY3RlciBpcyAxLCBhbmRcblx0ICogICAgICAgICAgICAgICAgICBzbyBvbikuXG5cdCAqIEByZXR1cm4gUmV0dXJucyB0aGUgbnVtYmVyIG9mIGNoYXJhY3RlcnMgaW4gdGhlIHBhcmFncmFwaC5cblx0ICogQHRocm93cyBSYW5nZUVycm9yIFRoZSBjaGFyYWN0ZXIgaW5kZXggc3BlY2lmaWVkIGlzIG91dCBvZiByYW5nZS5cblx0ICovXG5cdHB1YmxpYyBnZXRQYXJhZ3JhcGhMZW5ndGgoY2hhckluZGV4Om51bWJlciAvKmludCovKTpudW1iZXIgLyppbnQqL1xuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BhcmFncmFwaExlbmd0aDtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGEgVGV4dEZvcm1hdCBvYmplY3QgdGhhdCBjb250YWlucyBmb3JtYXR0aW5nIGluZm9ybWF0aW9uIGZvciB0aGVcblx0ICogcmFuZ2Ugb2YgdGV4dCB0aGF0IHRoZSA8Y29kZT5iZWdpbkluZGV4PC9jb2RlPiBhbmQgPGNvZGU+ZW5kSW5kZXg8L2NvZGU+XG5cdCAqIHBhcmFtZXRlcnMgc3BlY2lmeS4gT25seSBwcm9wZXJ0aWVzIHRoYXQgYXJlIGNvbW1vbiB0byB0aGUgZW50aXJlIHRleHRcblx0ICogc3BlY2lmaWVkIGFyZSBzZXQgaW4gdGhlIHJlc3VsdGluZyBUZXh0Rm9ybWF0IG9iamVjdC4gQW55IHByb3BlcnR5IHRoYXQgaXNcblx0ICogPGk+bWl4ZWQ8L2k+LCBtZWFuaW5nIHRoYXQgaXQgaGFzIGRpZmZlcmVudCB2YWx1ZXMgYXQgZGlmZmVyZW50IHBvaW50cyBpblxuXHQgKiB0aGUgdGV4dCwgaGFzIGEgdmFsdWUgb2YgPGNvZGU+bnVsbDwvY29kZT4uXG5cdCAqXG5cdCAqIDxwPklmIHlvdSBkbyBub3Qgc3BlY2lmeSB2YWx1ZXMgZm9yIHRoZXNlIHBhcmFtZXRlcnMsIHRoaXMgbWV0aG9kIGlzXG5cdCAqIGFwcGxpZWQgdG8gYWxsIHRoZSB0ZXh0IGluIHRoZSB0ZXh0IGZpZWxkLiA8L3A+XG5cdCAqXG5cdCAqIDxwPlRoZSBmb2xsb3dpbmcgdGFibGUgZGVzY3JpYmVzIHRocmVlIHBvc3NpYmxlIHVzYWdlczo8L3A+XG5cdCAqIFxuXHQgKiBAcmV0dXJuIFRoZSBUZXh0Rm9ybWF0IG9iamVjdCB0aGF0IHJlcHJlc2VudHMgdGhlIGZvcm1hdHRpbmcgcHJvcGVydGllc1xuXHQgKiAgICAgICAgIGZvciB0aGUgc3BlY2lmaWVkIHRleHQuXG5cdCAqIEB0aHJvd3MgUmFuZ2VFcnJvciBUaGUgPGNvZGU+YmVnaW5JbmRleDwvY29kZT4gb3IgPGNvZGU+ZW5kSW5kZXg8L2NvZGU+XG5cdCAqICAgICAgICAgICAgICAgICAgICBzcGVjaWZpZWQgaXMgb3V0IG9mIHJhbmdlLlxuXHQgKi9cblx0cHVibGljIGdldFRleHRGb3JtYXQoYmVnaW5JbmRleDpudW1iZXIgLyppbnQqLyA9IC0xLCBlbmRJbmRleDpudW1iZXIgLyppbnQqLyA9IC0xKTpUZXh0Rm9ybWF0XG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fdGV4dEZvcm1hdDtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXBsYWNlcyB0aGUgY3VycmVudCBzZWxlY3Rpb24gd2l0aCB0aGUgY29udGVudHMgb2YgdGhlIDxjb2RlPnZhbHVlPC9jb2RlPlxuXHQgKiBwYXJhbWV0ZXIuIFRoZSB0ZXh0IGlzIGluc2VydGVkIGF0IHRoZSBwb3NpdGlvbiBvZiB0aGUgY3VycmVudCBzZWxlY3Rpb24sXG5cdCAqIHVzaW5nIHRoZSBjdXJyZW50IGRlZmF1bHQgY2hhcmFjdGVyIGZvcm1hdCBhbmQgZGVmYXVsdCBwYXJhZ3JhcGggZm9ybWF0LlxuXHQgKiBUaGUgdGV4dCBpcyBub3QgdHJlYXRlZCBhcyBIVE1MLlxuXHQgKlxuXHQgKiA8cD5Zb3UgY2FuIHVzZSB0aGUgPGNvZGU+cmVwbGFjZVNlbGVjdGVkVGV4dCgpPC9jb2RlPiBtZXRob2QgdG8gaW5zZXJ0IGFuZFxuXHQgKiBkZWxldGUgdGV4dCB3aXRob3V0IGRpc3J1cHRpbmcgdGhlIGNoYXJhY3RlciBhbmQgcGFyYWdyYXBoIGZvcm1hdHRpbmcgb2Zcblx0ICogdGhlIHJlc3Qgb2YgdGhlIHRleHQuPC9wPlxuXHQgKlxuXHQgKiA8cD48Yj5Ob3RlOjwvYj4gVGhpcyBtZXRob2QgZG9lcyBub3Qgd29yayBpZiBhIHN0eWxlIHNoZWV0IGlzIGFwcGxpZWQgdG9cblx0ICogdGhlIHRleHQgZmllbGQuPC9wPlxuXHQgKiBcblx0ICogQHBhcmFtIHZhbHVlIFRoZSBzdHJpbmcgdG8gcmVwbGFjZSB0aGUgY3VycmVudGx5IHNlbGVjdGVkIHRleHQuXG5cdCAqIEB0aHJvd3MgRXJyb3IgVGhpcyBtZXRob2QgY2Fubm90IGJlIHVzZWQgb24gYSB0ZXh0IGZpZWxkIHdpdGggYSBzdHlsZVxuXHQgKiAgICAgICAgICAgICAgIHNoZWV0LlxuXHQgKi9cblx0cHVibGljIHJlcGxhY2VTZWxlY3RlZFRleHQodmFsdWU6c3RyaW5nKVxuXHR7XG5cblx0fVxuXG5cdC8qKlxuXHQgKiBSZXBsYWNlcyB0aGUgcmFuZ2Ugb2YgY2hhcmFjdGVycyB0aGF0IHRoZSA8Y29kZT5iZWdpbkluZGV4PC9jb2RlPiBhbmRcblx0ICogPGNvZGU+ZW5kSW5kZXg8L2NvZGU+IHBhcmFtZXRlcnMgc3BlY2lmeSB3aXRoIHRoZSBjb250ZW50cyBvZiB0aGVcblx0ICogPGNvZGU+bmV3VGV4dDwvY29kZT4gcGFyYW1ldGVyLiBBcyBkZXNpZ25lZCwgdGhlIHRleHQgZnJvbVxuXHQgKiA8Y29kZT5iZWdpbkluZGV4PC9jb2RlPiB0byA8Y29kZT5lbmRJbmRleC0xPC9jb2RlPiBpcyByZXBsYWNlZC5cblx0ICpcblx0ICogPHA+PGI+Tm90ZTo8L2I+IFRoaXMgbWV0aG9kIGRvZXMgbm90IHdvcmsgaWYgYSBzdHlsZSBzaGVldCBpcyBhcHBsaWVkIHRvXG5cdCAqIHRoZSB0ZXh0IGZpZWxkLjwvcD5cblx0ICogXG5cdCAqIEBwYXJhbSBiZWdpbkluZGV4IFRoZSB6ZXJvLWJhc2VkIGluZGV4IHZhbHVlIGZvciB0aGUgc3RhcnQgcG9zaXRpb24gb2YgdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgIHJlcGxhY2VtZW50IHJhbmdlLlxuXHQgKiBAcGFyYW0gZW5kSW5kZXggICBUaGUgemVyby1iYXNlZCBpbmRleCBwb3NpdGlvbiBvZiB0aGUgZmlyc3QgY2hhcmFjdGVyXG5cdCAqICAgICAgICAgICAgICAgICAgIGFmdGVyIHRoZSBkZXNpcmVkIHRleHQgc3Bhbi5cblx0ICogQHBhcmFtIG5ld1RleHQgICAgVGhlIHRleHQgdG8gdXNlIHRvIHJlcGxhY2UgdGhlIHNwZWNpZmllZCByYW5nZSBvZlxuXHQgKiAgICAgICAgICAgICAgICAgICBjaGFyYWN0ZXJzLlxuXHQgKiBAdGhyb3dzIEVycm9yIFRoaXMgbWV0aG9kIGNhbm5vdCBiZSB1c2VkIG9uIGEgdGV4dCBmaWVsZCB3aXRoIGEgc3R5bGVcblx0ICogICAgICAgICAgICAgICBzaGVldC5cblx0ICovXG5cdHB1YmxpYyByZXBsYWNlVGV4dChiZWdpbkluZGV4Om51bWJlciAvKmludCovLCBlbmRJbmRleDpudW1iZXIgLyppbnQqLywgbmV3VGV4dDpzdHJpbmcpXG5cdHtcblxuXHR9XG5cblx0LyoqXG5cdCAqIFNldHMgYXMgc2VsZWN0ZWQgdGhlIHRleHQgZGVzaWduYXRlZCBieSB0aGUgaW5kZXggdmFsdWVzIG9mIHRoZSBmaXJzdCBhbmRcblx0ICogbGFzdCBjaGFyYWN0ZXJzLCB3aGljaCBhcmUgc3BlY2lmaWVkIHdpdGggdGhlIDxjb2RlPmJlZ2luSW5kZXg8L2NvZGU+IGFuZFxuXHQgKiA8Y29kZT5lbmRJbmRleDwvY29kZT4gcGFyYW1ldGVycy4gSWYgdGhlIHR3byBwYXJhbWV0ZXIgdmFsdWVzIGFyZSB0aGVcblx0ICogc2FtZSwgdGhpcyBtZXRob2Qgc2V0cyB0aGUgaW5zZXJ0aW9uIHBvaW50LCBhcyBpZiB5b3Ugc2V0IHRoZVxuXHQgKiA8Y29kZT5jYXJldEluZGV4PC9jb2RlPiBwcm9wZXJ0eS5cblx0ICogXG5cdCAqIEBwYXJhbSBiZWdpbkluZGV4IFRoZSB6ZXJvLWJhc2VkIGluZGV4IHZhbHVlIG9mIHRoZSBmaXJzdCBjaGFyYWN0ZXIgaW4gdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbihmb3IgZXhhbXBsZSwgdGhlIGZpcnN0IGNoYXJhY3RlciBpcyAwLCB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgc2Vjb25kIGNoYXJhY3RlciBpcyAxLCBhbmQgc28gb24pLlxuXHQgKiBAcGFyYW0gZW5kSW5kZXggICBUaGUgemVyby1iYXNlZCBpbmRleCB2YWx1ZSBvZiB0aGUgbGFzdCBjaGFyYWN0ZXIgaW4gdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbi5cblx0ICovXG5cdHB1YmxpYyBzZXRTZWxlY3Rpb24oYmVnaW5JbmRleDpudW1iZXIgLyppbnQqLywgZW5kSW5kZXg6bnVtYmVyIC8qaW50Ki8pXG5cdHtcblxuXHR9XG5cblx0LyoqXG5cdCAqIEFwcGxpZXMgdGhlIHRleHQgZm9ybWF0dGluZyB0aGF0IHRoZSA8Y29kZT5mb3JtYXQ8L2NvZGU+IHBhcmFtZXRlclxuXHQgKiBzcGVjaWZpZXMgdG8gdGhlIHNwZWNpZmllZCB0ZXh0IGluIGEgdGV4dCBmaWVsZC4gVGhlIHZhbHVlIG9mXG5cdCAqIDxjb2RlPmZvcm1hdDwvY29kZT4gbXVzdCBiZSBhIFRleHRGb3JtYXQgb2JqZWN0IHRoYXQgc3BlY2lmaWVzIHRoZSBkZXNpcmVkXG5cdCAqIHRleHQgZm9ybWF0dGluZyBjaGFuZ2VzLiBPbmx5IHRoZSBub24tbnVsbCBwcm9wZXJ0aWVzIG9mXG5cdCAqIDxjb2RlPmZvcm1hdDwvY29kZT4gYXJlIGFwcGxpZWQgdG8gdGhlIHRleHQgZmllbGQuIEFueSBwcm9wZXJ0eSBvZlxuXHQgKiA8Y29kZT5mb3JtYXQ8L2NvZGU+IHRoYXQgaXMgc2V0IHRvIDxjb2RlPm51bGw8L2NvZGU+IGlzIG5vdCBhcHBsaWVkLiBCeVxuXHQgKiBkZWZhdWx0LCBhbGwgb2YgdGhlIHByb3BlcnRpZXMgb2YgYSBuZXdseSBjcmVhdGVkIFRleHRGb3JtYXQgb2JqZWN0IGFyZVxuXHQgKiBzZXQgdG8gPGNvZGU+bnVsbDwvY29kZT4uXG5cdCAqXG5cdCAqIDxwPjxiPk5vdGU6PC9iPiBUaGlzIG1ldGhvZCBkb2VzIG5vdCB3b3JrIGlmIGEgc3R5bGUgc2hlZXQgaXMgYXBwbGllZCB0b1xuXHQgKiB0aGUgdGV4dCBmaWVsZC48L3A+XG5cdCAqXG5cdCAqIDxwPlRoZSA8Y29kZT5zZXRUZXh0Rm9ybWF0KCk8L2NvZGU+IG1ldGhvZCBjaGFuZ2VzIHRoZSB0ZXh0IGZvcm1hdHRpbmdcblx0ICogYXBwbGllZCB0byBhIHJhbmdlIG9mIGNoYXJhY3RlcnMgb3IgdG8gdGhlIGVudGlyZSBib2R5IG9mIHRleHQgaW4gYSB0ZXh0XG5cdCAqIGZpZWxkLiBUbyBhcHBseSB0aGUgcHJvcGVydGllcyBvZiBmb3JtYXQgdG8gYWxsIHRleHQgaW4gdGhlIHRleHQgZmllbGQsIGRvXG5cdCAqIG5vdCBzcGVjaWZ5IHZhbHVlcyBmb3IgPGNvZGU+YmVnaW5JbmRleDwvY29kZT4gYW5kIDxjb2RlPmVuZEluZGV4PC9jb2RlPi5cblx0ICogVG8gYXBwbHkgdGhlIHByb3BlcnRpZXMgb2YgdGhlIGZvcm1hdCB0byBhIHJhbmdlIG9mIHRleHQsIHNwZWNpZnkgdmFsdWVzXG5cdCAqIGZvciB0aGUgPGNvZGU+YmVnaW5JbmRleDwvY29kZT4gYW5kIHRoZSA8Y29kZT5lbmRJbmRleDwvY29kZT4gcGFyYW1ldGVycy5cblx0ICogWW91IGNhbiB1c2UgdGhlIDxjb2RlPmxlbmd0aDwvY29kZT4gcHJvcGVydHkgdG8gZGV0ZXJtaW5lIHRoZSBpbmRleFxuXHQgKiB2YWx1ZXMuPC9wPlxuXHQgKlxuXHQgKiA8cD5UaGUgdHdvIHR5cGVzIG9mIGZvcm1hdHRpbmcgaW5mb3JtYXRpb24gaW4gYSBUZXh0Rm9ybWF0IG9iamVjdCBhcmVcblx0ICogY2hhcmFjdGVyIGxldmVsIGZvcm1hdHRpbmcgYW5kIHBhcmFncmFwaCBsZXZlbCBmb3JtYXR0aW5nLiBFYWNoIGNoYXJhY3RlclxuXHQgKiBpbiBhIHRleHQgZmllbGQgY2FuIGhhdmUgaXRzIG93biBjaGFyYWN0ZXIgZm9ybWF0dGluZyBzZXR0aW5ncywgc3VjaCBhc1xuXHQgKiBmb250IG5hbWUsIGZvbnQgc2l6ZSwgYm9sZCwgYW5kIGl0YWxpYy48L3A+XG5cdCAqXG5cdCAqIDxwPkZvciBwYXJhZ3JhcGhzLCB0aGUgZmlyc3QgY2hhcmFjdGVyIG9mIHRoZSBwYXJhZ3JhcGggaXMgZXhhbWluZWQgZm9yXG5cdCAqIHRoZSBwYXJhZ3JhcGggZm9ybWF0dGluZyBzZXR0aW5ncyBmb3IgdGhlIGVudGlyZSBwYXJhZ3JhcGguIEV4YW1wbGVzIG9mXG5cdCAqIHBhcmFncmFwaCBmb3JtYXR0aW5nIHNldHRpbmdzIGFyZSBsZWZ0IG1hcmdpbiwgcmlnaHQgbWFyZ2luLCBhbmRcblx0ICogaW5kZW50YXRpb24uPC9wPlxuXHQgKlxuXHQgKiA8cD5BbnkgdGV4dCBpbnNlcnRlZCBtYW51YWxseSBieSB0aGUgdXNlciwgb3IgcmVwbGFjZWQgYnkgdGhlXG5cdCAqIDxjb2RlPnJlcGxhY2VTZWxlY3RlZFRleHQoKTwvY29kZT4gbWV0aG9kLCByZWNlaXZlcyB0aGUgZGVmYXVsdCB0ZXh0IGZpZWxkXG5cdCAqIGZvcm1hdHRpbmcgZm9yIG5ldyB0ZXh0LCBhbmQgbm90IHRoZSBmb3JtYXR0aW5nIHNwZWNpZmllZCBmb3IgdGhlIHRleHRcblx0ICogaW5zZXJ0aW9uIHBvaW50LiBUbyBzZXQgdGhlIGRlZmF1bHQgZm9ybWF0dGluZyBmb3IgbmV3IHRleHQsIHVzZVxuXHQgKiA8Y29kZT5kZWZhdWx0VGV4dEZvcm1hdDwvY29kZT4uPC9wPlxuXHQgKiBcblx0ICogQHBhcmFtIGZvcm1hdCBBIFRleHRGb3JtYXQgb2JqZWN0IHRoYXQgY29udGFpbnMgY2hhcmFjdGVyIGFuZCBwYXJhZ3JhcGhcblx0ICogICAgICAgICAgICAgICBmb3JtYXR0aW5nIGluZm9ybWF0aW9uLlxuXHQgKiBAdGhyb3dzIEVycm9yICAgICAgVGhpcyBtZXRob2QgY2Fubm90IGJlIHVzZWQgb24gYSB0ZXh0IGZpZWxkIHdpdGggYSBzdHlsZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgc2hlZXQuXG5cdCAqIEB0aHJvd3MgUmFuZ2VFcnJvciBUaGUgPGNvZGU+YmVnaW5JbmRleDwvY29kZT4gb3IgPGNvZGU+ZW5kSW5kZXg8L2NvZGU+XG5cdCAqICAgICAgICAgICAgICAgICAgICBzcGVjaWZpZWQgaXMgb3V0IG9mIHJhbmdlLlxuXHQgKi9cblx0cHVibGljIHNldFRleHRGb3JtYXQoZm9ybWF0OlRleHRGb3JtYXQsIGJlZ2luSW5kZXg6bnVtYmVyIC8qaW50Ki8gPSAtMSwgZW5kSW5kZXg6bnVtYmVyIC8qaW50Ki8gPSAtMSlcblx0e1xuXG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0cnVlIGlmIGFuIGVtYmVkZGVkIGZvbnQgaXMgYXZhaWxhYmxlIHdpdGggdGhlIHNwZWNpZmllZFxuXHQgKiA8Y29kZT5mb250TmFtZTwvY29kZT4gYW5kIDxjb2RlPmZvbnRTdHlsZTwvY29kZT4gd2hlcmVcblx0ICogPGNvZGU+Rm9udC5mb250VHlwZTwvY29kZT4gaXMgPGNvZGU+Zmxhc2gudGV4dC5Gb250VHlwZS5FTUJFRERFRDwvY29kZT4uXG5cdCAqIFN0YXJ0aW5nIHdpdGggRmxhc2ggUGxheWVyIDEwLCB0d28ga2luZHMgb2YgZW1iZWRkZWQgZm9udHMgY2FuIGFwcGVhciBpbiBhXG5cdCAqIFNXRiBmaWxlLiBOb3JtYWwgZW1iZWRkZWQgZm9udHMgYXJlIG9ubHkgdXNlZCB3aXRoIFRleHRGaWVsZCBvYmplY3RzLiBDRkZcblx0ICogZW1iZWRkZWQgZm9udHMgYXJlIG9ubHkgdXNlZCB3aXRoIHRoZSBmbGFzaC50ZXh0LmVuZ2luZSBjbGFzc2VzLiBUaGUgdHdvXG5cdCAqIHR5cGVzIGFyZSBkaXN0aW5ndWlzaGVkIGJ5IHRoZSA8Y29kZT5mb250VHlwZTwvY29kZT4gcHJvcGVydHkgb2YgdGhlXG5cdCAqIDxjb2RlPkZvbnQ8L2NvZGU+IGNsYXNzLCBhcyByZXR1cm5lZCBieSB0aGUgPGNvZGU+ZW51bWVyYXRlRm9udHMoKTwvY29kZT5cblx0ICogZnVuY3Rpb24uXG5cdCAqXG5cdCAqIDxwPlRleHRGaWVsZCBjYW5ub3QgdXNlIGEgZm9udCBvZiB0eXBlIDxjb2RlPkVNQkVEREVEX0NGRjwvY29kZT4uIElmXG5cdCAqIDxjb2RlPmVtYmVkRm9udHM8L2NvZGU+IGlzIHNldCB0byA8Y29kZT50cnVlPC9jb2RlPiBhbmQgdGhlIG9ubHkgZm9udFxuXHQgKiBhdmFpbGFibGUgYXQgcnVuIHRpbWUgd2l0aCB0aGUgc3BlY2lmaWVkIG5hbWUgYW5kIHN0eWxlIGlzIG9mIHR5cGVcblx0ICogPGNvZGU+RU1CRURERURfQ0ZGPC9jb2RlPiwgRmxhc2ggUGxheWVyIGZhaWxzIHRvIHJlbmRlciB0aGUgdGV4dCwgYXMgaWYgbm9cblx0ICogZW1iZWRkZWQgZm9udCB3ZXJlIGF2YWlsYWJsZSB3aXRoIHRoZSBzcGVjaWZpZWQgbmFtZSBhbmQgc3R5bGUuPC9wPlxuXHQgKlxuXHQgKiA8cD5JZiBib3RoIDxjb2RlPkVNQkVEREVEPC9jb2RlPiBhbmQgPGNvZGU+RU1CRURERURfQ0ZGPC9jb2RlPiBmb250cyBhcmVcblx0ICogYXZhaWxhYmxlIHdpdGggdGhlIHNhbWUgbmFtZSBhbmQgc3R5bGUsIHRoZSA8Y29kZT5FTUJFRERFRDwvY29kZT4gZm9udCBpc1xuXHQgKiBzZWxlY3RlZCBhbmQgdGV4dCByZW5kZXJzIHdpdGggdGhlIDxjb2RlPkVNQkVEREVEPC9jb2RlPiBmb250LjwvcD5cblx0ICogXG5cdCAqIEBwYXJhbSBmb250TmFtZSAgVGhlIG5hbWUgb2YgdGhlIGVtYmVkZGVkIGZvbnQgdG8gY2hlY2suXG5cdCAqIEBwYXJhbSBmb250U3R5bGUgU3BlY2lmaWVzIHRoZSBmb250IHN0eWxlIHRvIGNoZWNrLiBVc2Vcblx0ICogICAgICAgICAgICAgICAgICA8Y29kZT5mbGFzaC50ZXh0LkZvbnRTdHlsZTwvY29kZT5cblx0ICogQHJldHVybiA8Y29kZT50cnVlPC9jb2RlPiBpZiBhIGNvbXBhdGlibGUgZW1iZWRkZWQgZm9udCBpcyBhdmFpbGFibGUsXG5cdCAqICAgICAgICAgb3RoZXJ3aXNlIDxjb2RlPmZhbHNlPC9jb2RlPi5cblx0ICogQHRocm93cyBBcmd1bWVudEVycm9yIFRoZSA8Y29kZT5mb250U3R5bGU8L2NvZGU+IHNwZWNpZmllZCBpcyBub3QgYSBtZW1iZXJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIG9mIDxjb2RlPmZsYXNoLnRleHQuRm9udFN0eWxlPC9jb2RlPi5cblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgaXNGb250Q29tcGF0aWJsZShmb250TmFtZTpzdHJpbmcsIGZvbnRTdHlsZTpzdHJpbmcpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufVxuXG5leHBvcnQgPSBUZXh0RmllbGQ7Il19