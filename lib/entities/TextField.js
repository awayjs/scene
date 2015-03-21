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
    Object.defineProperty(TextField.prototype, "assetType", {
        /**
         *
         * @returns {string}
         */
        get: function () {
            return TextField.assetType;
        },
        enumerable: true,
        configurable: true
    });
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
            this.reConstruct();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "textFormat", {
        get: function () {
            return this._textFormat;
        },
        set: function (value) {
            if (this._textFormat == value)
                return;
            this._textFormat = value;
            this.reConstruct();
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
     * Reconstructs the Geometry for this Text-field.
     */
    TextField.prototype.reConstruct = function () {
        for (var i = this.geometry.subGeometries.length - 1; i >= 0; i--)
            this.geometry.removeSubGeometry(this.geometry.subGeometries[i]);
        if (this._textFormat == null) {
            return;
        }
        if (this._text == "") {
            return;
        }
        var indices = new Array();
        var positions = new Array();
        var curveData = new Array();
        var uvs = new Array();
        var char_scale = this._textFormat.size / this._textFormat.font_table.get_font_em_size();
        var tri_idx_offset = 0;
        var tri_cnt = 0;
        var x_offset = 0;
        var y_offset = 0;
        var prev_char = null;
        for (var i = 0; i < this.text.length; i++) {
            var this_char = this._textFormat.font_table.get_subgeo_for_char(this._text.charCodeAt(i).toString());
            if (this_char != null) {
                var this_subGeom = this_char.subgeom;
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
                        uvs.push(this._textFormat.uv_values[0]);
                        uvs.push(this._textFormat.uv_values[1]);
                    }
                    // find kerning value that has been set for this char_code on previous char (if non exists, kerning_value will stay 0)
                    var kerning_value = 0;
                    if (prev_char != null) {
                        for (var k = 0; k < prev_char.kerningCharCodes.length; k++) {
                            if (prev_char.kerningCharCodes[k] == this._text.charCodeAt(i)) {
                                kerning_value = prev_char.kerningValues[k];
                                break;
                            }
                        }
                    }
                    x_offset += ((this_char.char_width + kerning_value) * char_scale) + this._textFormat.letterSpacing;
                }
                else {
                    // if no char-geometry was found, we insert a "space"
                    x_offset += this._textFormat.font_table.get_font_em_size() * char_scale;
                }
            }
            else {
                // if no char-geometry was found, we insert a "space"
                x_offset += this._textFormat.font_table.get_font_em_size() * char_scale;
            }
        }
        var curve_sub_geom = new CurveSubGeometry(true);
        curve_sub_geom.updateIndices(indices);
        curve_sub_geom.updatePositions(positions);
        curve_sub_geom.updateCurves(curveData);
        curve_sub_geom.updateUVs(uvs);
        this.geometry.addSubGeometry(curve_sub_geom);
        this.subMeshes[0].material = this._textFormat.material;
    };
    /**
     * Appends the string specified by the <code>newText</code> parameter to the
     * end of the text of the text field. This method is more efficient than an
     * addition assignment(<code>+=</code>) on a <code>text</code> property
     * (such as <code>someTextField.text += moreText</code>), particularly for a
     * text field that contains a significant amount of content.
     *
     * @param newText The string to append to the existing text.
     */
    TextField.prototype.appendText = function (newText) {
        this._text += newText;
    };
    /**
     * *tells the Textfield that a paragraph is defined completly.
     * e.g. the textfield will start a new line for future added text.
     */
    TextField.prototype.closeParagraph = function () {
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
    TextField.assetType = "[asset TextField]";
    return TextField;
})(Mesh);
module.exports = TextField;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9UZXh0RmllbGQudHMiXSwibmFtZXMiOlsiVGV4dEZpZWxkIiwiVGV4dEZpZWxkLmNvbnN0cnVjdG9yIiwiVGV4dEZpZWxkLmFzc2V0VHlwZSIsIlRleHRGaWVsZC5ib3R0b21TY3JvbGxWIiwiVGV4dEZpZWxkLmNhcmV0SW5kZXgiLCJUZXh0RmllbGQubGVuZ3RoIiwiVGV4dEZpZWxkLm1heFNjcm9sbEgiLCJUZXh0RmllbGQubWF4U2Nyb2xsViIsIlRleHRGaWVsZC5udW1MaW5lcyIsIlRleHRGaWVsZC5zZWxlY3Rpb25CZWdpbkluZGV4IiwiVGV4dEZpZWxkLnNlbGVjdGlvbkVuZEluZGV4IiwiVGV4dEZpZWxkLnRleHQiLCJUZXh0RmllbGQudGV4dEZvcm1hdCIsIlRleHRGaWVsZC50ZXh0SGVpZ2h0IiwiVGV4dEZpZWxkLnRleHRJbnRlcmFjdGlvbk1vZGUiLCJUZXh0RmllbGQudGV4dFdpZHRoIiwiVGV4dEZpZWxkLnJlQ29uc3RydWN0IiwiVGV4dEZpZWxkLmFwcGVuZFRleHQiLCJUZXh0RmllbGQuY2xvc2VQYXJhZ3JhcGgiLCJUZXh0RmllbGQuZ2V0Q2hhckJvdW5kYXJpZXMiLCJUZXh0RmllbGQuZ2V0Q2hhckluZGV4QXRQb2ludCIsIlRleHRGaWVsZC5nZXRGaXJzdENoYXJJblBhcmFncmFwaCIsIlRleHRGaWVsZC5nZXRJbWFnZVJlZmVyZW5jZSIsIlRleHRGaWVsZC5nZXRMaW5lSW5kZXhBdFBvaW50IiwiVGV4dEZpZWxkLmdldExpbmVJbmRleE9mQ2hhciIsIlRleHRGaWVsZC5nZXRMaW5lTGVuZ3RoIiwiVGV4dEZpZWxkLmdldExpbmVNZXRyaWNzIiwiVGV4dEZpZWxkLmdldExpbmVPZmZzZXQiLCJUZXh0RmllbGQuZ2V0TGluZVRleHQiLCJUZXh0RmllbGQuZ2V0UGFyYWdyYXBoTGVuZ3RoIiwiVGV4dEZpZWxkLmdldFRleHRGb3JtYXQiLCJUZXh0RmllbGQucmVwbGFjZVNlbGVjdGVkVGV4dCIsIlRleHRGaWVsZC5yZXBsYWNlVGV4dCIsIlRleHRGaWVsZC5zZXRTZWxlY3Rpb24iLCJUZXh0RmllbGQuc2V0VGV4dEZvcm1hdCIsIlRleHRGaWVsZC5pc0ZvbnRDb21wYXRpYmxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFZQSxJQUFPLElBQUksV0FBaUIsa0NBQWtDLENBQUMsQ0FBQztBQUNoRSxJQUFPLFFBQVEsV0FBZ0IsK0JBQStCLENBQUMsQ0FBQztBQUVoRSxJQUFPLGdCQUFnQixXQUFjLHVDQUF1QyxDQUFDLENBQUM7QUFHOUUsQUErRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQURHO0lBQ0csU0FBUztJQUFTQSxVQUFsQkEsU0FBU0EsVUFBYUE7SUFxbUIzQkE7Ozs7Ozs7T0FPR0E7SUFDSEEsU0E3bUJLQSxTQUFTQTtRQSttQmJDLGtCQUFNQSxJQUFJQSxRQUFRQSxFQUFFQSxDQUFDQSxDQUFDQTtRQW5tQmZBLFVBQUtBLEdBQVVBLEVBQUVBLENBQUNBO0lBb21CMUJBLENBQUNBO0lBN2dCREQsc0JBQVdBLGdDQUFTQTtRQUpwQkE7OztXQUdHQTthQUNIQTtZQUVDRSxNQUFNQSxDQUFDQSxTQUFTQSxDQUFDQSxTQUFTQSxDQUFDQTtRQUM1QkEsQ0FBQ0E7OztPQUFBRjtJQWdEREEsc0JBQVdBLG9DQUFhQTtRQVR4QkE7Ozs7Ozs7O1dBUUdBO2FBQ0hBO1lBRUNHLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLGNBQWNBLENBQUNBO1FBQzVCQSxDQUFDQTs7O09BQUFIO0lBV0RBLHNCQUFXQSxpQ0FBVUE7UUFUckJBOzs7Ozs7OztXQVFHQTthQUNIQTtZQUVDSSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQTtRQUN6QkEsQ0FBQ0E7OztPQUFBSjtJQTJHREEsc0JBQVdBLDZCQUFNQTtRQUpqQkE7OztXQUdHQTthQUNIQTtZQUVDSyxNQUFNQSxDQUFDQSxJQUFJQSxD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MUJBLE1BQU1BLENBQUNBO1FBQ1JBLENBQUNBO1FBQ0RBLEVBQUVBLENBQUFBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLElBQUVBLEVBQUVBLENBQUNBLENBQUFBLENBQUNBO1lBQ2xCQSxNQUFNQSxDQUFDQTtRQUNSQSxDQUFDQTtRQUNEQSxJQUFJQSxPQUFPQSxHQUFpQkEsSUFBSUEsS0FBS0EsRUFBVUEsQ0FBQ0E7UUFDaERBLElBQUlBLFNBQVNBLEdBQWlCQSxJQUFJQSxLQUFLQSxFQUFVQSxDQUFDQTtRQUNsREEsSUFBSUEsU0FBU0EsR0FBaUJBLElBQUlBLEtBQUtBLEVBQVVBLENBQUNBO1FBQ2xEQSxJQUFJQSxHQUFHQSxHQUFpQkEsSUFBSUEsS0FBS0EsRUFBVUEsQ0FBQ0E7UUFFNUNBLElBQUlBLFVBQVVBLEdBQVFBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLElBQUlBLEdBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLFVBQVVBLENBQUNBLGdCQUFnQkEsRUFBRUEsQ0FBQ0E7UUFDM0ZBLElBQUlBLGNBQWNBLEdBQVFBLENBQUNBLENBQUNBO1FBQzVCQSxJQUFJQSxPQUFPQSxHQUFRQSxDQUFDQSxDQUFDQTtRQUNyQkEsSUFBSUEsUUFBUUEsR0FBUUEsQ0FBQ0EsQ0FBQ0E7UUFDdEJBLElBQUlBLFFBQVFBLEdBQVFBLENBQUNBLENBQUNBO1FBQ3RCQSxJQUFJQSxTQUFTQSxHQUFzQkEsSUFBSUEsQ0FBQ0E7UUFDeENBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBLEVBQUVBLEVBQUVBLENBQUNBO1lBRTNDQSxJQUFJQSxTQUFTQSxHQUEyQ0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxRQUFR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emlDdUIsSUFBSSxFQXlpQzNCO0FBRUQsQUFBbUIsaUJBQVYsU0FBUyxDQUFDIiwiZmlsZSI6ImVudGl0aWVzL1RleHRGaWVsZC5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTWF0cml4M0RcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9NYXRyaXgzRFwiKTtcbmltcG9ydCBSZWN0YW5nbGVcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vUmVjdGFuZ2xlXCIpO1xuaW1wb3J0IFZlY3RvcjNEXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vVmVjdG9yM0RcIik7XG5cbmltcG9ydCBEaXNwbGF5T2JqZWN0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9EaXNwbGF5T2JqZWN0XCIpO1xuaW1wb3J0IEFudGlBbGlhc1R5cGVcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi90ZXh0L0FudGlBbGlhc1R5cGVcIik7XG5pbXBvcnQgR3JpZEZpdFR5cGVcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3RleHQvR3JpZEZpdFR5cGVcIik7XG5pbXBvcnQgVGV4dEZpZWxkQXV0b1NpemVcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvdGV4dC9UZXh0RmllbGRBdXRvU2l6ZVwiKTtcbmltcG9ydCBUZXh0RmllbGRUeXBlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvdGV4dC9UZXh0RmllbGRUeXBlXCIpO1xuaW1wb3J0IFRleHRGb3JtYXRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3RleHQvVGV4dEZvcm1hdFwiKTtcbmltcG9ydCBUZXh0SW50ZXJhY3Rpb25Nb2RlXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3RleHQvVGV4dEludGVyYWN0aW9uTW9kZVwiKTtcbmltcG9ydCBUZXh0TGluZU1ldHJpY3NcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi90ZXh0L1RleHRMaW5lTWV0cmljc1wiKTtcbmltcG9ydCBNZXNoXHRcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZW50aXRpZXMvTWVzaFwiKTtcbmltcG9ydCBHZW9tZXRyeVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9kYXRhL0dlb21ldHJ5XCIpO1xuaW1wb3J0IFN1Ykdlb21ldHJ5QmFzZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2RhdGEvU3ViR2VvbWV0cnlCYXNlXCIpO1xuaW1wb3J0IEN1cnZlU3ViR2VvbWV0cnlcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9kYXRhL0N1cnZlU3ViR2VvbWV0cnlcIik7XG5pbXBvcnQgVGVzc2VsYXRlZEZvbnRDaGFyXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3RleHQvVGVzc2VsYXRlZEZvbnRDaGFyXCIpO1xuXG4vKipcbiAqIFRoZSBUZXh0RmllbGQgY2xhc3MgaXMgdXNlZCB0byBjcmVhdGUgZGlzcGxheSBvYmplY3RzIGZvciB0ZXh0IGRpc3BsYXkgYW5kXG4gKiBpbnB1dC4gPHBoIG91dHB1dGNsYXNzPVwiZmxleG9ubHlcIj5Zb3UgY2FuIHVzZSB0aGUgVGV4dEZpZWxkIGNsYXNzIHRvXG4gKiBwZXJmb3JtIGxvdy1sZXZlbCB0ZXh0IHJlbmRlcmluZy4gSG93ZXZlciwgaW4gRmxleCwgeW91IHR5cGljYWxseSB1c2UgdGhlXG4gKiBMYWJlbCwgVGV4dCwgVGV4dEFyZWEsIGFuZCBUZXh0SW5wdXQgY29udHJvbHMgdG8gcHJvY2VzcyB0ZXh0LiA8cGhcbiAqIG91dHB1dGNsYXNzPVwiZmxhc2hvbmx5XCI+WW91IGNhbiBnaXZlIGEgdGV4dCBmaWVsZCBhbiBpbnN0YW5jZSBuYW1lIGluIHRoZVxuICogUHJvcGVydHkgaW5zcGVjdG9yIGFuZCB1c2UgdGhlIG1ldGhvZHMgYW5kIHByb3BlcnRpZXMgb2YgdGhlIFRleHRGaWVsZFxuICogY2xhc3MgdG8gbWFuaXB1bGF0ZSBpdCB3aXRoIEFjdGlvblNjcmlwdC4gVGV4dEZpZWxkIGluc3RhbmNlIG5hbWVzIGFyZVxuICogZGlzcGxheWVkIGluIHRoZSBNb3ZpZSBFeHBsb3JlciBhbmQgaW4gdGhlIEluc2VydCBUYXJnZXQgUGF0aCBkaWFsb2cgYm94IGluXG4gKiB0aGUgQWN0aW9ucyBwYW5lbC5cbiAqXG4gKiA8cD5UbyBjcmVhdGUgYSB0ZXh0IGZpZWxkIGR5bmFtaWNhbGx5LCB1c2UgdGhlIDxjb2RlPlRleHRGaWVsZCgpPC9jb2RlPlxuICogY29uc3RydWN0b3IuPC9wPlxuICpcbiAqIDxwPlRoZSBtZXRob2RzIG9mIHRoZSBUZXh0RmllbGQgY2xhc3MgbGV0IHlvdSBzZXQsIHNlbGVjdCwgYW5kIG1hbmlwdWxhdGVcbiAqIHRleHQgaW4gYSBkeW5hbWljIG9yIGlucHV0IHRleHQgZmllbGQgdGhhdCB5b3UgY3JlYXRlIGR1cmluZyBhdXRob3Jpbmcgb3JcbiAqIGF0IHJ1bnRpbWUuIDwvcD5cbiAqXG4gKiA8cD5BY3Rpb25TY3JpcHQgcHJvdmlkZXMgc2V2ZXJhbCB3YXlzIHRvIGZvcm1hdCB5b3VyIHRleHQgYXQgcnVudGltZS4gVGhlXG4gKiBUZXh0Rm9ybWF0IGNsYXNzIGxldHMgeW91IHNldCBjaGFyYWN0ZXIgYW5kIHBhcmFncmFwaCBmb3JtYXR0aW5nIGZvclxuICogVGV4dEZpZWxkIG9iamVjdHMuIFlvdSBjYW4gYXBwbHkgQ2FzY2FkaW5nIFN0eWxlIFNoZWV0cyhDU1MpIHN0eWxlcyB0b1xuICogdGV4dCBmaWVsZHMgYnkgdXNpbmcgdGhlIDxjb2RlPlRleHRGaWVsZC5zdHlsZVNoZWV0PC9jb2RlPiBwcm9wZXJ0eSBhbmQgdGhlXG4gKiBTdHlsZVNoZWV0IGNsYXNzLiBZb3UgY2FuIHVzZSBDU1MgdG8gc3R5bGUgYnVpbHQtaW4gSFRNTCB0YWdzLCBkZWZpbmUgbmV3XG4gKiBmb3JtYXR0aW5nIHRhZ3MsIG9yIGFwcGx5IHN0eWxlcy4gWW91IGNhbiBhc3NpZ24gSFRNTCBmb3JtYXR0ZWQgdGV4dCwgd2hpY2hcbiAqIG9wdGlvbmFsbHkgdXNlcyBDU1Mgc3R5bGVzLCBkaXJlY3RseSB0byBhIHRleHQgZmllbGQuIEhUTUwgdGV4dCB0aGF0IHlvdVxuICogYXNzaWduIHRvIGEgdGV4dCBmaWVsZCBjYW4gY29udGFpbiBlbWJlZGRlZCBtZWRpYShtb3ZpZSBjbGlwcywgU1dGIGZpbGVzLFxuICogR0lGIGZpbGVzLCBQTkcgZmlsZXMsIGFuZCBKUEVHIGZpbGVzKS4gVGhlIHRleHQgd3JhcHMgYXJvdW5kIHRoZSBlbWJlZGRlZFxuICogbWVkaWEgaW4gdGhlIHNhbWUgd2F5IHRoYXQgYSB3ZWIgYnJvd3NlciB3cmFwcyB0ZXh0IGFyb3VuZCBtZWRpYSBlbWJlZGRlZFxuICogaW4gYW4gSFRNTCBkb2N1bWVudC4gPC9wPlxuICpcbiAqIDxwPkZsYXNoIFBsYXllciBzdXBwb3J0cyBhIHN1YnNldCBvZiBIVE1MIHRhZ3MgdGhhdCB5b3UgY2FuIHVzZSB0byBmb3JtYXRcbiAqIHRleHQuIFNlZSB0aGUgbGlzdCBvZiBzdXBwb3J0ZWQgSFRNTCB0YWdzIGluIHRoZSBkZXNjcmlwdGlvbiBvZiB0aGVcbiAqIDxjb2RlPmh0bWxUZXh0PC9jb2RlPiBwcm9wZXJ0eS48L3A+XG4gKiBcbiAqIEBldmVudCBjaGFuZ2UgICAgICAgICAgICAgICAgICAgIERpc3BhdGNoZWQgYWZ0ZXIgYSBjb250cm9sIHZhbHVlIGlzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RpZmllZCwgdW5saWtlIHRoZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+dGV4dElucHV0PC9jb2RlPiBldmVudCwgd2hpY2ggaXNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoZWQgYmVmb3JlIHRoZSB2YWx1ZSBpcyBtb2RpZmllZC5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFVubGlrZSB0aGUgVzNDIERPTSBFdmVudCBNb2RlbCB2ZXJzaW9uIG9mXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGUgPGNvZGU+Y2hhbmdlPC9jb2RlPiBldmVudCwgd2hpY2hcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoZXMgdGhlIGV2ZW50IG9ubHkgYWZ0ZXIgdGhlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sIGxvc2VzIGZvY3VzLCB0aGUgQWN0aW9uU2NyaXB0IDMuMFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmVyc2lvbiBvZiB0aGUgPGNvZGU+Y2hhbmdlPC9jb2RlPiBldmVudFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXMgZGlzcGF0Y2hlZCBhbnkgdGltZSB0aGUgY29udHJvbFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlcy4gRm9yIGV4YW1wbGUsIGlmIGEgdXNlciB0eXBlcyB0ZXh0XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnRvIGEgdGV4dCBmaWVsZCwgYSA8Y29kZT5jaGFuZ2U8L2NvZGU+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudCBpcyBkaXNwYXRjaGVkIGFmdGVyIGV2ZXJ5IGtleXN0cm9rZS5cbiAqIEBldmVudCBsaW5rICAgICAgICAgICAgICAgICAgICAgIERpc3BhdGNoZWQgd2hlbiBhIHVzZXIgY2xpY2tzIGEgaHlwZXJsaW5rXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbiBhbiBIVE1MLWVuYWJsZWQgdGV4dCBmaWVsZCwgd2hlcmUgdGhlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBVUkwgYmVnaW5zIHdpdGggXCJldmVudDpcIi4gVGhlIHJlbWFpbmRlciBvZlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlIFVSTCBhZnRlciBcImV2ZW50OlwiIGlzIHBsYWNlZCBpbiB0aGVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgcHJvcGVydHkgb2YgdGhlIExJTksgZXZlbnQuXG4gKlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+PGI+Tm90ZTo8L2I+IFRoZSBkZWZhdWx0IGJlaGF2aW9yLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkaW5nIHRoZSB0ZXh0IHRvIHRoZSB0ZXh0IGZpZWxkLCBvY2N1cnNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ubHkgd2hlbiBGbGFzaCBQbGF5ZXIgZ2VuZXJhdGVzIHRoZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQsIHdoaWNoIGluIHRoaXMgY2FzZSBoYXBwZW5zIHdoZW4gYVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlciBhdHRlbXB0cyB0byBpbnB1dCB0ZXh0LiBZb3UgY2Fubm90XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdXQgdGV4dCBpbnRvIGEgdGV4dCBmaWVsZCBieSBzZW5kaW5nIGl0XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT50ZXh0SW5wdXQ8L2NvZGU+IGV2ZW50cy48L3A+XG4gKiBAZXZlbnQgc2Nyb2xsICAgICAgICAgICAgICAgICAgICBEaXNwYXRjaGVkIGJ5IGEgVGV4dEZpZWxkIG9iamVjdFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGk+YWZ0ZXI8L2k+IHRoZSB1c2VyIHNjcm9sbHMuXG4gKiBAZXZlbnQgdGV4dElucHV0ICAgICAgICAgICAgICAgICBGbGFzaCBQbGF5ZXIgZGlzcGF0Y2hlcyB0aGVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPnRleHRJbnB1dDwvY29kZT4gZXZlbnQgd2hlbiBhIHVzZXJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudGVycyBvbmUgb3IgbW9yZSBjaGFyYWN0ZXJzIG9mIHRleHQuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBWYXJpb3VzIHRleHQgaW5wdXQgbWV0aG9kcyBjYW4gZ2VuZXJhdGVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMgZXZlbnQsIGluY2x1ZGluZyBzdGFuZGFyZCBrZXlib2FyZHMsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dCBtZXRob2QgZWRpdG9ycyhJTUVzKSwgdm9pY2Ugb3JcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwZWVjaCByZWNvZ25pdGlvbiBzeXN0ZW1zLCBhbmQgZXZlbiB0aGVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdCBvZiBwYXN0aW5nIHBsYWluIHRleHQgd2l0aCBub1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0dGluZyBvciBzdHlsZSBpbmZvcm1hdGlvbi5cbiAqIEBldmVudCB0ZXh0SW50ZXJhY3Rpb25Nb2RlQ2hhbmdlIEZsYXNoIFBsYXllciBkaXNwYXRjaGVzIHRoZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+dGV4dEludGVyYWN0aW9uTW9kZUNoYW5nZTwvY29kZT5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50IHdoZW4gYSB1c2VyIGNoYW5nZXMgdGhlIGludGVyYWN0aW9uXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlIG9mIGEgdGV4dCBmaWVsZC4gZm9yIGV4YW1wbGUgb25cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFuZHJvaWQsIG9uZSBjYW4gdG9nZ2xlIGZyb20gTk9STUFMIG1vZGVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIFNFTEVDVElPTiBtb2RlIHVzaW5nIGNvbnRleHQgbWVudVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uc1xuICovXG5jbGFzcyBUZXh0RmllbGQgZXh0ZW5kcyBNZXNoXG57XG5cdHB1YmxpYyBzdGF0aWMgYXNzZXRUeXBlOnN0cmluZyA9IFwiW2Fzc2V0IFRleHRGaWVsZF1cIjtcblxuXHRwcml2YXRlIF9ib3R0b21TY3JvbGxWOm51bWJlcjtcblx0cHJpdmF0ZSBfY2FyZXRJbmRleDpudW1iZXI7XG5cdHByaXZhdGUgX2xlbmd0aDpudW1iZXI7XG5cdHByaXZhdGUgX21heFNjcm9sbEg6bnVtYmVyO1xuXHRwcml2YXRlIF9tYXhTY3JvbGxWOm51bWJlcjtcblx0cHJpdmF0ZSBfbnVtTGluZXM6bnVtYmVyO1xuXHRwcml2YXRlIF9zZWxlY3Rpb25CZWdpbkluZGV4Om51bWJlcjtcblx0cHJpdmF0ZSBfc2VsZWN0aW9uRW5kSW5kZXg6bnVtYmVyO1xuXHRwcml2YXRlIF90ZXh0OnN0cmluZyA9IFwiXCI7XG5cdHByaXZhdGUgX3RleHRIZWlnaHQ6bnVtYmVyO1xuXHRwcml2YXRlIF90ZXh0SW50ZXJhY3Rpb25Nb2RlOlRleHRJbnRlcmFjdGlvbk1vZGU7XG5cdHByaXZhdGUgX3RleHRXaWR0aDpudW1iZXI7XG5cblx0cHJpdmF0ZSBfY2hhckJvdW5kYXJpZXM6UmVjdGFuZ2xlO1xuXHRwcml2YXRlIF9jaGFySW5kZXhBdFBvaW50Om51bWJlcjtcblx0cHJpdmF0ZSBfZmlyc3RDaGFySW5QYXJhZ3JhcGg6bnVtYmVyO1xuXHRwcml2YXRlIF9pbWFnZVJlZmVyZW5jZTpEaXNwbGF5T2JqZWN0XG5cdHByaXZhdGUgX2xpbmVJbmRleEF0UG9pbnQ6bnVtYmVyO1xuXHRwcml2YXRlIF9saW5lSW5kZXhPZkNoYXI6bnVtYmVyO1xuXHRwcml2YXRlIF9saW5lTGVuZ3RoOm51bWJlcjtcblx0cHJpdmF0ZSBfbGluZU1ldHJpY3M6VGV4dExpbmVNZXRyaWNzO1xuXHRwcml2YXRlIF9saW5lT2Zmc2V0Om51bWJlcjtcblx0cHJpdmF0ZSBfbGluZVRleHQ6c3RyaW5nO1xuXHRwcml2YXRlIF9wYXJhZ3JhcGhMZW5ndGg6bnVtYmVyO1xuXHRwcml2YXRlIF90ZXh0Rm9ybWF0OlRleHRGb3JtYXQ7XG5cblx0LyoqXG5cdCAqIFdoZW4gc2V0IHRvIDxjb2RlPnRydWU8L2NvZGU+IGFuZCB0aGUgdGV4dCBmaWVsZCBpcyBub3QgaW4gZm9jdXMsIEZsYXNoXG5cdCAqIFBsYXllciBoaWdobGlnaHRzIHRoZSBzZWxlY3Rpb24gaW4gdGhlIHRleHQgZmllbGQgaW4gZ3JheS4gV2hlbiBzZXQgdG9cblx0ICogPGNvZGU+ZmFsc2U8L2NvZGU+IGFuZCB0aGUgdGV4dCBmaWVsZCBpcyBub3QgaW4gZm9jdXMsIEZsYXNoIFBsYXllciBkb2VzXG5cdCAqIG5vdCBoaWdobGlnaHQgdGhlIHNlbGVjdGlvbiBpbiB0aGUgdGV4dCBmaWVsZC5cblx0ICogXG5cdCAqIEBkZWZhdWx0IGZhbHNlXG5cdCAqL1xuXHRwdWJsaWMgYWx3YXlzU2hvd1NlbGVjdGlvbjpib29sZWFuXG5cblx0LyoqXG5cdCAqIFRoZSB0eXBlIG9mIGFudGktYWxpYXNpbmcgdXNlZCBmb3IgdGhpcyB0ZXh0IGZpZWxkLiBVc2Vcblx0ICogPGNvZGU+Zmxhc2gudGV4dC5BbnRpQWxpYXNUeXBlPC9jb2RlPiBjb25zdGFudHMgZm9yIHRoaXMgcHJvcGVydHkuIFlvdSBjYW5cblx0ICogY29udHJvbCB0aGlzIHNldHRpbmcgb25seSBpZiB0aGUgZm9udCBpcyBlbWJlZGRlZCh3aXRoIHRoZVxuXHQgKiA8Y29kZT5lbWJlZEZvbnRzPC9jb2RlPiBwcm9wZXJ0eSBzZXQgdG8gPGNvZGU+dHJ1ZTwvY29kZT4pLiBUaGUgZGVmYXVsdFxuXHQgKiBzZXR0aW5nIGlzIDxjb2RlPmZsYXNoLnRleHQuQW50aUFsaWFzVHlwZS5OT1JNQUw8L2NvZGU+LlxuXHQgKlxuXHQgKiA8cD5UbyBzZXQgdmFsdWVzIGZvciB0aGlzIHByb3BlcnR5LCB1c2UgdGhlIGZvbGxvd2luZyBzdHJpbmcgdmFsdWVzOjwvcD5cblx0ICovXG5cdHB1YmxpYyBhbnRpQWxpYXNUeXBlOkFudGlBbGlhc1R5cGU7XG5cblx0LyoqXG5cdCAqIENvbnRyb2xzIGF1dG9tYXRpYyBzaXppbmcgYW5kIGFsaWdubWVudCBvZiB0ZXh0IGZpZWxkcy4gQWNjZXB0YWJsZSB2YWx1ZXNcblx0ICogZm9yIHRoZSA8Y29kZT5UZXh0RmllbGRBdXRvU2l6ZTwvY29kZT4gY29uc3RhbnRzOlxuXHQgKiA8Y29kZT5UZXh0RmllbGRBdXRvU2l6ZS5OT05FPC9jb2RlPih0aGUgZGVmYXVsdCksXG5cdCAqIDxjb2RlPlRleHRGaWVsZEF1dG9TaXplLkxFRlQ8L2NvZGU+LCA8Y29kZT5UZXh0RmllbGRBdXRvU2l6ZS5SSUdIVDwvY29kZT4sXG5cdCAqIGFuZCA8Y29kZT5UZXh0RmllbGRBdXRvU2l6ZS5DRU5URVI8L2NvZGU+LlxuXHQgKlxuXHQgKiA8cD5JZiA8Y29kZT5hdXRvU2l6ZTwvY29kZT4gaXMgc2V0IHRvIDxjb2RlPlRleHRGaWVsZEF1dG9TaXplLk5PTkU8L2NvZGU+XG5cdCAqICh0aGUgZGVmYXVsdCkgbm8gcmVzaXppbmcgb2NjdXJzLjwvcD5cblx0ICpcblx0ICogPHA+SWYgPGNvZGU+YXV0b1NpemU8L2NvZGU+IGlzIHNldCB0byA8Y29kZT5UZXh0RmllbGRBdXRvU2l6ZS5MRUZUPC9jb2RlPixcblx0ICogdGhlIHRleHQgaXMgdHJlYXRlZCBhcyBsZWZ0LWp1c3RpZmllZCB0ZXh0LCBtZWFuaW5nIHRoYXQgdGhlIGxlZnQgbWFyZ2luXG5cdCAqIG9mIHRoZSB0ZXh0IGZpZWxkIHJlbWFpbnMgZml4ZWQgYW5kIGFueSByZXNpemluZyBvZiBhIHNpbmdsZSBsaW5lIG9mIHRoZVxuXHQgKiB0ZXh0IGZpZWxkIGlzIG9uIHRoZSByaWdodCBtYXJnaW4uIElmIHRoZSB0ZXh0IGluY2x1ZGVzIGEgbGluZSBicmVhayhmb3Jcblx0ICogZXhhbXBsZSwgPGNvZGU+XCJcXG5cIjwvY29kZT4gb3IgPGNvZGU+XCJcXHJcIjwvY29kZT4pLCB0aGUgYm90dG9tIGlzIGFsc29cblx0ICogcmVzaXplZCB0byBmaXQgdGhlIG5leHQgbGluZSBvZiB0ZXh0LiBJZiA8Y29kZT53b3JkV3JhcDwvY29kZT4gaXMgYWxzbyBzZXRcblx0ICogdG8gPGNvZGU+dHJ1ZTwvY29kZT4sIG9ubHkgdGhlIGJvdHRvbSBvZiB0aGUgdGV4dCBmaWVsZCBpcyByZXNpemVkIGFuZCB0aGVcblx0ICogcmlnaHQgc2lkZSByZW1haW5zIGZpeGVkLjwvcD5cblx0ICpcblx0ICogPHA+SWYgPGNvZGU+YXV0b1NpemU8L2NvZGU+IGlzIHNldCB0b1xuXHQgKiA8Y29kZT5UZXh0RmllbGRBdXRvU2l6ZS5SSUdIVDwvY29kZT4sIHRoZSB0ZXh0IGlzIHRyZWF0ZWQgYXNcblx0ICogcmlnaHQtanVzdGlmaWVkIHRleHQsIG1lYW5pbmcgdGhhdCB0aGUgcmlnaHQgbWFyZ2luIG9mIHRoZSB0ZXh0IGZpZWxkXG5cdCAqIHJlbWFpbnMgZml4ZWQgYW5kIGFueSByZXNpemluZyBvZiBhIHNpbmdsZSBsaW5lIG9mIHRoZSB0ZXh0IGZpZWxkIGlzIG9uXG5cdCAqIHRoZSBsZWZ0IG1hcmdpbi4gSWYgdGhlIHRleHQgaW5jbHVkZXMgYSBsaW5lIGJyZWFrKGZvciBleGFtcGxlLFxuXHQgKiA8Y29kZT5cIlxcblwiIG9yIFwiXFxyXCIpPC9jb2RlPiwgdGhlIGJvdHRvbSBpcyBhbHNvIHJlc2l6ZWQgdG8gZml0IHRoZSBuZXh0XG5cdCAqIGxpbmUgb2YgdGV4dC4gSWYgPGNvZGU+d29yZFdyYXA8L2NvZGU+IGlzIGFsc28gc2V0IHRvIDxjb2RlPnRydWU8L2NvZGU+LFxuXHQgKiBvbmx5IHRoZSBib3R0b20gb2YgdGhlIHRleHQgZmllbGQgaXMgcmVzaXplZCBhbmQgdGhlIGxlZnQgc2lkZSByZW1haW5zXG5cdCAqIGZpeGVkLjwvcD5cblx0ICpcblx0ICogPHA+SWYgPGNvZGU+YXV0b1NpemU8L2NvZGU+IGlzIHNldCB0b1xuXHQgKiA8Y29kZT5UZXh0RmllbGRBdXRvU2l6ZS5DRU5URVI8L2NvZGU+LCB0aGUgdGV4dCBpcyB0cmVhdGVkIGFzXG5cdCAqIGNlbnRlci1qdXN0aWZpZWQgdGV4dCwgbWVhbmluZyB0aGF0IGFueSByZXNpemluZyBvZiBhIHNpbmdsZSBsaW5lIG9mIHRoZVxuXHQgKiB0ZXh0IGZpZWxkIGlzIGVxdWFsbHkgZGlzdHJpYnV0ZWQgdG8gYm90aCB0aGUgcmlnaHQgYW5kIGxlZnQgbWFyZ2lucy4gSWZcblx0ICogdGhlIHRleHQgaW5jbHVkZXMgYSBsaW5lIGJyZWFrKGZvciBleGFtcGxlLCA8Y29kZT5cIlxcblwiPC9jb2RlPiBvclxuXHQgKiA8Y29kZT5cIlxcclwiPC9jb2RlPiksIHRoZSBib3R0b20gaXMgYWxzbyByZXNpemVkIHRvIGZpdCB0aGUgbmV4dCBsaW5lIG9mXG5cdCAqIHRleHQuIElmIDxjb2RlPndvcmRXcmFwPC9jb2RlPiBpcyBhbHNvIHNldCB0byA8Y29kZT50cnVlPC9jb2RlPiwgb25seSB0aGVcblx0ICogYm90dG9tIG9mIHRoZSB0ZXh0IGZpZWxkIGlzIHJlc2l6ZWQgYW5kIHRoZSBsZWZ0IGFuZCByaWdodCBzaWRlcyByZW1haW5cblx0ICogZml4ZWQuPC9wPlxuXHQgKiBcblx0ICogQHRocm93cyBBcmd1bWVudEVycm9yIFRoZSA8Y29kZT5hdXRvU2l6ZTwvY29kZT4gc3BlY2lmaWVkIGlzIG5vdCBhIG1lbWJlclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgb2YgZmxhc2gudGV4dC5UZXh0RmllbGRBdXRvU2l6ZS5cblx0ICovXG5cdHB1YmxpYyBhdXRvU2l6ZTpUZXh0RmllbGRBdXRvU2l6ZTtcblxuXHQvKipcblx0ICpcblx0ICogQHJldHVybnMge3N0cmluZ31cblx0ICovXG5cdHB1YmxpYyBnZXQgYXNzZXRUeXBlKCk6c3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gVGV4dEZpZWxkLmFzc2V0VHlwZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTcGVjaWZpZXMgd2hldGhlciB0aGUgdGV4dCBmaWVsZCBoYXMgYSBiYWNrZ3JvdW5kIGZpbGwuIElmXG5cdCAqIDxjb2RlPnRydWU8L2NvZGU+LCB0aGUgdGV4dCBmaWVsZCBoYXMgYSBiYWNrZ3JvdW5kIGZpbGwuIElmXG5cdCAqIDxjb2RlPmZhbHNlPC9jb2RlPiwgdGhlIHRleHQgZmllbGQgaGFzIG5vIGJhY2tncm91bmQgZmlsbC4gVXNlIHRoZVxuXHQgKiA8Y29kZT5iYWNrZ3JvdW5kQ29sb3I8L2NvZGU+IHByb3BlcnR5IHRvIHNldCB0aGUgYmFja2dyb3VuZCBjb2xvciBvZiBhXG5cdCAqIHRleHQgZmllbGQuXG5cdCAqIFxuXHQgKiBAZGVmYXVsdCBmYWxzZVxuXHQgKi9cblx0cHVibGljIGJhY2tncm91bmQ6Ym9vbGVhbjtcblxuXHQvKipcblx0ICogVGhlIGNvbG9yIG9mIHRoZSB0ZXh0IGZpZWxkIGJhY2tncm91bmQuIFRoZSBkZWZhdWx0IHZhbHVlIGlzXG5cdCAqIDxjb2RlPjB4RkZGRkZGPC9jb2RlPih3aGl0ZSkuIFRoaXMgcHJvcGVydHkgY2FuIGJlIHJldHJpZXZlZCBvciBzZXQsIGV2ZW5cblx0ICogaWYgdGhlcmUgY3VycmVudGx5IGlzIG5vIGJhY2tncm91bmQsIGJ1dCB0aGUgY29sb3IgaXMgdmlzaWJsZSBvbmx5IGlmIHRoZVxuXHQgKiB0ZXh0IGZpZWxkIGhhcyB0aGUgPGNvZGU+YmFja2dyb3VuZDwvY29kZT4gcHJvcGVydHkgc2V0IHRvXG5cdCAqIDxjb2RlPnRydWU8L2NvZGU+LlxuXHQgKi9cblx0cHVibGljIGJhY2tncm91bmRDb2xvcjpudW1iZXIgLyppbnQqLztcblxuXHQvKipcblx0ICogU3BlY2lmaWVzIHdoZXRoZXIgdGhlIHRleHQgZmllbGQgaGFzIGEgYm9yZGVyLiBJZiA8Y29kZT50cnVlPC9jb2RlPiwgdGhlXG5cdCAqIHRleHQgZmllbGQgaGFzIGEgYm9yZGVyLiBJZiA8Y29kZT5mYWxzZTwvY29kZT4sIHRoZSB0ZXh0IGZpZWxkIGhhcyBub1xuXHQgKiBib3JkZXIuIFVzZSB0aGUgPGNvZGU+Ym9yZGVyQ29sb3I8L2NvZGU+IHByb3BlcnR5IHRvIHNldCB0aGUgYm9yZGVyIGNvbG9yLlxuXHQgKiBcblx0ICogQGRlZmF1bHQgZmFsc2Vcblx0ICovXG5cdHB1YmxpYyBib3JkZXI6Ym9vbGVhbjtcblxuXHQvKipcblx0ICogVGhlIGNvbG9yIG9mIHRoZSB0ZXh0IGZpZWxkIGJvcmRlci4gVGhlIGRlZmF1bHQgdmFsdWUgaXNcblx0ICogPGNvZGU+MHgwMDAwMDA8L2NvZGU+KGJsYWNrKS4gVGhpcyBwcm9wZXJ0eSBjYW4gYmUgcmV0cmlldmVkIG9yIHNldCwgZXZlblxuXHQgKiBpZiB0aGVyZSBjdXJyZW50bHkgaXMgbm8gYm9yZGVyLCBidXQgdGhlIGNvbG9yIGlzIHZpc2libGUgb25seSBpZiB0aGUgdGV4dFxuXHQgKiBmaWVsZCBoYXMgdGhlIDxjb2RlPmJvcmRlcjwvY29kZT4gcHJvcGVydHkgc2V0IHRvIDxjb2RlPnRydWU8L2NvZGU+LlxuXHQgKi9cblx0cHVibGljIGJvcmRlckNvbG9yOm51bWJlciAvKmludCovO1xuXG5cdC8qKlxuXHQgKiBBbiBpbnRlZ2VyKDEtYmFzZWQgaW5kZXgpIHRoYXQgaW5kaWNhdGVzIHRoZSBib3R0b21tb3N0IGxpbmUgdGhhdCBpc1xuXHQgKiBjdXJyZW50bHkgdmlzaWJsZSBpbiB0aGUgc3BlY2lmaWVkIHRleHQgZmllbGQuIFRoaW5rIG9mIHRoZSB0ZXh0IGZpZWxkIGFzXG5cdCAqIGEgd2luZG93IG9udG8gYSBibG9jayBvZiB0ZXh0LiBUaGUgPGNvZGU+c2Nyb2xsVjwvY29kZT4gcHJvcGVydHkgaXMgdGhlXG5cdCAqIDEtYmFzZWQgaW5kZXggb2YgdGhlIHRvcG1vc3QgdmlzaWJsZSBsaW5lIGluIHRoZSB3aW5kb3cuXG5cdCAqXG5cdCAqIDxwPkFsbCB0aGUgdGV4dCBiZXR3ZWVuIHRoZSBsaW5lcyBpbmRpY2F0ZWQgYnkgPGNvZGU+c2Nyb2xsVjwvY29kZT4gYW5kXG5cdCAqIDxjb2RlPmJvdHRvbVNjcm9sbFY8L2NvZGU+IGlzIGN1cnJlbnRseSB2aXNpYmxlIGluIHRoZSB0ZXh0IGZpZWxkLjwvcD5cblx0ICovXG5cdHB1YmxpYyBnZXQgYm90dG9tU2Nyb2xsVigpOm51bWJlciAvKmludCovXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fYm90dG9tU2Nyb2xsVjtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgaW5kZXggb2YgdGhlIGluc2VydGlvbiBwb2ludChjYXJldCkgcG9zaXRpb24uIElmIG5vIGluc2VydGlvbiBwb2ludFxuXHQgKiBpcyBkaXNwbGF5ZWQsIHRoZSB2YWx1ZSBpcyB0aGUgcG9zaXRpb24gdGhlIGluc2VydGlvbiBwb2ludCB3b3VsZCBiZSBpZlxuXHQgKiB5b3UgcmVzdG9yZWQgZm9jdXMgdG8gdGhlIGZpZWxkKHR5cGljYWxseSB3aGVyZSB0aGUgaW5zZXJ0aW9uIHBvaW50IGxhc3Rcblx0ICogd2FzLCBvciAwIGlmIHRoZSBmaWVsZCBoYXMgbm90IGhhZCBmb2N1cykuXG5cdCAqXG5cdCAqIDxwPlNlbGVjdGlvbiBzcGFuIGluZGV4ZXMgYXJlIHplcm8tYmFzZWQoZm9yIGV4YW1wbGUsIHRoZSBmaXJzdCBwb3NpdGlvblxuXHQgKiBpcyAwLCB0aGUgc2Vjb25kIHBvc2l0aW9uIGlzIDEsIGFuZCBzbyBvbikuPC9wPlxuXHQgKi9cblx0cHVibGljIGdldCBjYXJldEluZGV4KCk6bnVtYmVyIC8qaW50Ki9cblx0e1xuXHRcdHJldHVybiB0aGlzLl9jYXJldEluZGV4O1xuXHR9XG5cblx0LyoqXG5cdCAqIEEgQm9vbGVhbiB2YWx1ZSB0aGF0IHNwZWNpZmllcyB3aGV0aGVyIGV4dHJhIHdoaXRlIHNwYWNlKHNwYWNlcywgbGluZVxuXHQgKiBicmVha3MsIGFuZCBzbyBvbikgaW4gYSB0ZXh0IGZpZWxkIHdpdGggSFRNTCB0ZXh0IGlzIHJlbW92ZWQuIFRoZSBkZWZhdWx0XG5cdCAqIHZhbHVlIGlzIDxjb2RlPmZhbHNlPC9jb2RlPi4gVGhlIDxjb2RlPmNvbmRlbnNlV2hpdGU8L2NvZGU+IHByb3BlcnR5IG9ubHlcblx0ICogYWZmZWN0cyB0ZXh0IHNldCB3aXRoIHRoZSA8Y29kZT5odG1sVGV4dDwvY29kZT4gcHJvcGVydHksIG5vdCB0aGVcblx0ICogPGNvZGU+dGV4dDwvY29kZT4gcHJvcGVydHkuIElmIHlvdSBzZXQgdGV4dCB3aXRoIHRoZSA8Y29kZT50ZXh0PC9jb2RlPlxuXHQgKiBwcm9wZXJ0eSwgPGNvZGU+Y29uZGVuc2VXaGl0ZTwvY29kZT4gaXMgaWdub3JlZC5cblx0ICpcblx0ICogPHA+SWYgPGNvZGU+Y29uZGVuc2VXaGl0ZTwvY29kZT4gaXMgc2V0IHRvIDxjb2RlPnRydWU8L2NvZGU+LCB1c2Ugc3RhbmRhcmRcblx0ICogSFRNTCBjb21tYW5kcyBzdWNoIGFzIDxjb2RlPjxCUj48L2NvZGU+IGFuZCA8Y29kZT48UD48L2NvZGU+IHRvIHBsYWNlIGxpbmVcblx0ICogYnJlYWtzIGluIHRoZSB0ZXh0IGZpZWxkLjwvcD5cblx0ICpcblx0ICogPHA+U2V0IHRoZSA8Y29kZT5jb25kZW5zZVdoaXRlPC9jb2RlPiBwcm9wZXJ0eSBiZWZvcmUgc2V0dGluZyB0aGVcblx0ICogPGNvZGU+aHRtbFRleHQ8L2NvZGU+IHByb3BlcnR5LjwvcD5cblx0ICovXG5cdHB1YmxpYyBjb25kZW5zZVdoaXRlOmJvb2xlYW47XG5cblx0LyoqXG5cdCAqIFNwZWNpZmllcyB0aGUgZm9ybWF0IGFwcGxpZWQgdG8gbmV3bHkgaW5zZXJ0ZWQgdGV4dCwgc3VjaCBhcyB0ZXh0IGVudGVyZWRcblx0ICogYnkgYSB1c2VyIG9yIHRleHQgaW5zZXJ0ZWQgd2l0aCB0aGUgPGNvZGU+cmVwbGFjZVNlbGVjdGVkVGV4dCgpPC9jb2RlPlxuXHQgKiBtZXRob2QuXG5cdCAqXG5cdCAqIDxwPjxiPk5vdGU6PC9iPiBXaGVuIHNlbGVjdGluZyBjaGFyYWN0ZXJzIHRvIGJlIHJlcGxhY2VkIHdpdGhcblx0ICogPGNvZGU+c2V0U2VsZWN0aW9uKCk8L2NvZGU+IGFuZCA8Y29kZT5yZXBsYWNlU2VsZWN0ZWRUZXh0KCk8L2NvZGU+LCB0aGVcblx0ICogPGNvZGU+ZGVmYXVsdFRleHRGb3JtYXQ8L2NvZGU+IHdpbGwgYmUgYXBwbGllZCBvbmx5IGlmIHRoZSB0ZXh0IGhhcyBiZWVuXG5cdCAqIHNlbGVjdGVkIHVwIHRvIGFuZCBpbmNsdWRpbmcgdGhlIGxhc3QgY2hhcmFjdGVyLiBIZXJlIGlzIGFuIGV4YW1wbGU6PC9wPlxuXHQgKiA8cHJlIHhtbDpzcGFjZT1cInByZXNlcnZlXCI+IHB1YmxpYyBteV90eHQ6VGV4dEZpZWxkIG5ldyBUZXh0RmllbGQoKTtcblx0ICogbXlfdHh0LnRleHQgPSBcIkZsYXNoIE1hY2ludG9zaCB2ZXJzaW9uXCI7IHB1YmxpYyBteV9mbXQ6VGV4dEZvcm1hdCA9IG5ld1xuXHQgKiBUZXh0Rm9ybWF0KCk7IG15X2ZtdC5jb2xvciA9IDB4RkYwMDAwOyBteV90eHQuZGVmYXVsdFRleHRGb3JtYXQgPSBteV9mbXQ7XG5cdCAqIG15X3R4dC5zZXRTZWxlY3Rpb24oNiwxNSk7IC8vIHBhcnRpYWwgdGV4dCBzZWxlY3RlZCAtIGRlZmF1bHRUZXh0Rm9ybWF0XG5cdCAqIG5vdCBhcHBsaWVkIG15X3R4dC5zZXRTZWxlY3Rpb24oNiwyMyk7IC8vIHRleHQgc2VsZWN0ZWQgdG8gZW5kIC1cblx0ICogZGVmYXVsdFRleHRGb3JtYXQgYXBwbGllZCBteV90eHQucmVwbGFjZVNlbGVjdGVkVGV4dChcIldpbmRvd3MgdmVyc2lvblwiKTtcblx0ICogPC9wcmU+XG5cdCAqXG5cdCAqIDxwPldoZW4geW91IGFjY2VzcyB0aGUgPGNvZGU+ZGVmYXVsdFRleHRGb3JtYXQ8L2NvZGU+IHByb3BlcnR5LCB0aGVcblx0ICogcmV0dXJuZWQgVGV4dEZvcm1hdCBvYmplY3QgaGFzIGFsbCBvZiBpdHMgcHJvcGVydGllcyBkZWZpbmVkLiBObyBwcm9wZXJ0eVxuXHQgKiBpcyA8Y29kZT5udWxsPC9jb2RlPi48L3A+XG5cdCAqXG5cdCAqIDxwPjxiPk5vdGU6PC9iPiBZb3UgY2FuJ3Qgc2V0IHRoaXMgcHJvcGVydHkgaWYgYSBzdHlsZSBzaGVldCBpcyBhcHBsaWVkIHRvXG5cdCAqIHRoZSB0ZXh0IGZpZWxkLjwvcD5cblx0ICogXG5cdCAqIEB0aHJvd3MgRXJyb3IgVGhpcyBtZXRob2QgY2Fubm90IGJlIHVzZWQgb24gYSB0ZXh0IGZpZWxkIHdpdGggYSBzdHlsZVxuXHQgKiAgICAgICAgICAgICAgIHNoZWV0LlxuXHQgKi9cblx0cHVibGljIGRlZmF1bHRUZXh0Rm9ybWF0OlRleHRGb3JtYXQ7XG5cblx0LyoqXG5cdCAqIFNwZWNpZmllcyB3aGV0aGVyIHRoZSB0ZXh0IGZpZWxkIGlzIGEgcGFzc3dvcmQgdGV4dCBmaWVsZC4gSWYgdGhlIHZhbHVlIG9mXG5cdCAqIHRoaXMgcHJvcGVydHkgaXMgPGNvZGU+dHJ1ZTwvY29kZT4sIHRoZSB0ZXh0IGZpZWxkIGlzIHRyZWF0ZWQgYXMgYVxuXHQgKiBwYXNzd29yZCB0ZXh0IGZpZWxkIGFuZCBoaWRlcyB0aGUgaW5wdXQgY2hhcmFjdGVycyB1c2luZyBhc3Rlcmlza3MgaW5zdGVhZFxuXHQgKiBvZiB0aGUgYWN0dWFsIGNoYXJhY3RlcnMuIElmIDxjb2RlPmZhbHNlPC9jb2RlPiwgdGhlIHRleHQgZmllbGQgaXMgbm90XG5cdCAqIHRyZWF0ZWQgYXMgYSBwYXNzd29yZCB0ZXh0IGZpZWxkLiBXaGVuIHBhc3N3b3JkIG1vZGUgaXMgZW5hYmxlZCwgdGhlIEN1dFxuXHQgKiBhbmQgQ29weSBjb21tYW5kcyBhbmQgdGhlaXIgY29ycmVzcG9uZGluZyBrZXlib2FyZCBzaG9ydGN1dHMgd2lsbCBub3Rcblx0ICogZnVuY3Rpb24uIFRoaXMgc2VjdXJpdHkgbWVjaGFuaXNtIHByZXZlbnRzIGFuIHVuc2NydXB1bG91cyB1c2VyIGZyb20gdXNpbmdcblx0ICogdGhlIHNob3J0Y3V0cyB0byBkaXNjb3ZlciBhIHBhc3N3b3JkIG9uIGFuIHVuYXR0ZW5kZWQgY29tcHV0ZXIuXG5cdCAqIFxuXHQgKiBAZGVmYXVsdCBmYWxzZVxuXHQgKi9cblx0cHVibGljIGRpc3BsYXlBc1Bhc3N3b3JkOmJvb2xlYW47XG5cblx0LyoqXG5cdCAqIFNwZWNpZmllcyB3aGV0aGVyIHRvIHJlbmRlciBieSB1c2luZyBlbWJlZGRlZCBmb250IG91dGxpbmVzLiBJZlxuXHQgKiA8Y29kZT5mYWxzZTwvY29kZT4sIEZsYXNoIFBsYXllciByZW5kZXJzIHRoZSB0ZXh0IGZpZWxkIGJ5IHVzaW5nIGRldmljZVxuXHQgKiBmb250cy5cblx0ICpcblx0ICogPHA+SWYgeW91IHNldCB0aGUgPGNvZGU+ZW1iZWRGb250czwvY29kZT4gcHJvcGVydHkgdG8gPGNvZGU+dHJ1ZTwvY29kZT5cblx0ICogZm9yIGEgdGV4dCBmaWVsZCwgeW91IG11c3Qgc3BlY2lmeSBhIGZvbnQgZm9yIHRoYXQgdGV4dCBieSB1c2luZyB0aGVcblx0ICogPGNvZGU+Zm9udDwvY29kZT4gcHJvcGVydHkgb2YgYSBUZXh0Rm9ybWF0IG9iamVjdCBhcHBsaWVkIHRvIHRoZSB0ZXh0XG5cdCAqIGZpZWxkLiBJZiB0aGUgc3BlY2lmaWVkIGZvbnQgaXMgbm90IGVtYmVkZGVkIGluIHRoZSBTV0YgZmlsZSwgdGhlIHRleHQgaXNcblx0ICogbm90IGRpc3BsYXllZC48L3A+XG5cdCAqIFxuXHQgKiBAZGVmYXVsdCBmYWxzZVxuXHQgKi9cblx0cHVibGljIGVtYmVkRm9udHM6Ym9vbGVhbjtcblxuXHQvKipcblx0ICogVGhlIHR5cGUgb2YgZ3JpZCBmaXR0aW5nIHVzZWQgZm9yIHRoaXMgdGV4dCBmaWVsZC4gVGhpcyBwcm9wZXJ0eSBhcHBsaWVzXG5cdCAqIG9ubHkgaWYgdGhlIDxjb2RlPmZsYXNoLnRleHQuQW50aUFsaWFzVHlwZTwvY29kZT4gcHJvcGVydHkgb2YgdGhlIHRleHRcblx0ICogZmllbGQgaXMgc2V0IHRvIDxjb2RlPmZsYXNoLnRleHQuQW50aUFsaWFzVHlwZS5BRFZBTkNFRDwvY29kZT4uXG5cdCAqXG5cdCAqIDxwPlRoZSB0eXBlIG9mIGdyaWQgZml0dGluZyB1c2VkIGRldGVybWluZXMgd2hldGhlciBGbGFzaCBQbGF5ZXIgZm9yY2VzXG5cdCAqIHN0cm9uZyBob3Jpem9udGFsIGFuZCB2ZXJ0aWNhbCBsaW5lcyB0byBmaXQgdG8gYSBwaXhlbCBvciBzdWJwaXhlbCBncmlkLFxuXHQgKiBvciBub3QgYXQgYWxsLjwvcD5cblx0ICpcblx0ICogPHA+Rm9yIHRoZSA8Y29kZT5mbGFzaC50ZXh0LkdyaWRGaXRUeXBlPC9jb2RlPiBwcm9wZXJ0eSwgeW91IGNhbiB1c2UgdGhlXG5cdCAqIGZvbGxvd2luZyBzdHJpbmcgdmFsdWVzOjwvcD5cblx0ICogXG5cdCAqIEBkZWZhdWx0IHBpeGVsXG5cdCAqL1xuXHRwdWJsaWMgZ3JpZEZpdFR5cGU6R3JpZEZpdFR5cGU7XG5cblx0LyoqXG5cdCAqIENvbnRhaW5zIHRoZSBIVE1MIHJlcHJlc2VudGF0aW9uIG9mIHRoZSB0ZXh0IGZpZWxkIGNvbnRlbnRzLlxuXHQgKlxuXHQgKiA8cD5GbGFzaCBQbGF5ZXIgc3VwcG9ydHMgdGhlIGZvbGxvd2luZyBIVE1MIHRhZ3M6PC9wPlxuXHQgKlxuXHQgKiA8cD5GbGFzaCBQbGF5ZXIgYW5kIEFJUiBhbHNvIHN1cHBvcnQgZXhwbGljaXQgY2hhcmFjdGVyIGNvZGVzLCBzdWNoIGFzXG5cdCAqICYjMzg7KEFTQ0lJIGFtcGVyc2FuZCkgYW5kICYjeDIwQUM7KFVuaWNvZGUg4oKsIHN5bWJvbCkuIDwvcD5cblx0ICovXG5cdHB1YmxpYyBodG1sVGV4dDpzdHJpbmc7XG5cblx0LyoqXG5cdCAqIFRoZSBudW1iZXIgb2YgY2hhcmFjdGVycyBpbiBhIHRleHQgZmllbGQuIEEgY2hhcmFjdGVyIHN1Y2ggYXMgdGFiXG5cdCAqICg8Y29kZT5cXHQ8L2NvZGU+KSBjb3VudHMgYXMgb25lIGNoYXJhY3Rlci5cblx0ICovXG5cdHB1YmxpYyBnZXQgbGVuZ3RoKCk6bnVtYmVyIC8qaW50Ki9cblx0e1xuXHRcdHJldHVybiB0aGlzLl9sZW5ndGg7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIG1heGltdW0gbnVtYmVyIG9mIGNoYXJhY3RlcnMgdGhhdCB0aGUgdGV4dCBmaWVsZCBjYW4gY29udGFpbiwgYXNcblx0ICogZW50ZXJlZCBieSBhIHVzZXIuIEEgc2NyaXB0IGNhbiBpbnNlcnQgbW9yZSB0ZXh0IHRoYW5cblx0ICogPGNvZGU+bWF4Q2hhcnM8L2NvZGU+IGFsbG93czsgdGhlIDxjb2RlPm1heENoYXJzPC9jb2RlPiBwcm9wZXJ0eSBpbmRpY2F0ZXNcblx0ICogb25seSBob3cgbXVjaCB0ZXh0IGEgdXNlciBjYW4gZW50ZXIuIElmIHRoZSB2YWx1ZSBvZiB0aGlzIHByb3BlcnR5IGlzXG5cdCAqIDxjb2RlPjA8L2NvZGU+LCBhIHVzZXIgY2FuIGVudGVyIGFuIHVubGltaXRlZCBhbW91bnQgb2YgdGV4dC5cblx0ICogXG5cdCAqIEBkZWZhdWx0IDBcblx0ICovXG5cdHB1YmxpYyBtYXhDaGFyczpudW1iZXIgLyppbnQqLztcblxuXHQvKipcblx0ICogVGhlIG1heGltdW0gdmFsdWUgb2YgPGNvZGU+c2Nyb2xsSDwvY29kZT4uXG5cdCAqL1xuXHRwdWJsaWMgbWF4U2Nyb2xsSCgpOm51bWJlciAvKmludCovXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fbWF4U2Nyb2xsSDtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgbWF4aW11bSB2YWx1ZSBvZiA8Y29kZT5zY3JvbGxWPC9jb2RlPi5cblx0ICovXG5cdHB1YmxpYyBtYXhTY3JvbGxWKCk6bnVtYmVyIC8qaW50Ki9cblx0e1xuXHRcdHJldHVybiB0aGlzLl9tYXhTY3JvbGxWO1xuXHR9XG5cblx0LyoqXG5cdCAqIEEgQm9vbGVhbiB2YWx1ZSB0aGF0IGluZGljYXRlcyB3aGV0aGVyIEZsYXNoIFBsYXllciBhdXRvbWF0aWNhbGx5IHNjcm9sbHNcblx0ICogbXVsdGlsaW5lIHRleHQgZmllbGRzIHdoZW4gdGhlIHVzZXIgY2xpY2tzIGEgdGV4dCBmaWVsZCBhbmQgcm9sbHMgdGhlXG5cdCAqIG1vdXNlIHdoZWVsLiBCeSBkZWZhdWx0LCB0aGlzIHZhbHVlIGlzIDxjb2RlPnRydWU8L2NvZGU+LiBUaGlzIHByb3BlcnR5IGlzXG5cdCAqIHVzZWZ1bCBpZiB5b3Ugd2FudCB0byBwcmV2ZW50IG1vdXNlIHdoZWVsIHNjcm9sbGluZyBvZiB0ZXh0IGZpZWxkcywgb3Jcblx0ICogaW1wbGVtZW50IHlvdXIgb3duIHRleHQgZmllbGQgc2Nyb2xsaW5nLlxuXHQgKi9cblx0cHVibGljIG1vdXNlV2hlZWxFbmFibGVkOmJvb2xlYW47XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB3aGV0aGVyIGZpZWxkIGlzIGEgbXVsdGlsaW5lIHRleHQgZmllbGQuIElmIHRoZSB2YWx1ZSBpc1xuXHQgKiA8Y29kZT50cnVlPC9jb2RlPiwgdGhlIHRleHQgZmllbGQgaXMgbXVsdGlsaW5lOyBpZiB0aGUgdmFsdWUgaXNcblx0ICogPGNvZGU+ZmFsc2U8L2NvZGU+LCB0aGUgdGV4dCBmaWVsZCBpcyBhIHNpbmdsZS1saW5lIHRleHQgZmllbGQuIEluIGEgZmllbGRcblx0ICogb2YgdHlwZSA8Y29kZT5UZXh0RmllbGRUeXBlLklOUFVUPC9jb2RlPiwgdGhlIDxjb2RlPm11bHRpbGluZTwvY29kZT4gdmFsdWVcblx0ICogZGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSA8Y29kZT5FbnRlcjwvY29kZT4ga2V5IGNyZWF0ZXMgYSBuZXcgbGluZShhIHZhbHVlXG5cdCAqIG9mIDxjb2RlPmZhbHNlPC9jb2RlPiwgYW5kIHRoZSA8Y29kZT5FbnRlcjwvY29kZT4ga2V5IGlzIGlnbm9yZWQpLiBJZiB5b3Vcblx0ICogcGFzdGUgdGV4dCBpbnRvIGEgPGNvZGU+VGV4dEZpZWxkPC9jb2RlPiB3aXRoIGEgPGNvZGU+bXVsdGlsaW5lPC9jb2RlPlxuXHQgKiB2YWx1ZSBvZiA8Y29kZT5mYWxzZTwvY29kZT4sIG5ld2xpbmVzIGFyZSBzdHJpcHBlZCBvdXQgb2YgdGhlIHRleHQuXG5cdCAqIFxuXHQgKiBAZGVmYXVsdCBmYWxzZVxuXHQgKi9cblx0cHVibGljIG11bHRpbGluZTpib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBEZWZpbmVzIHRoZSBudW1iZXIgb2YgdGV4dCBsaW5lcyBpbiBhIG11bHRpbGluZSB0ZXh0IGZpZWxkLiBJZlxuXHQgKiA8Y29kZT53b3JkV3JhcDwvY29kZT4gcHJvcGVydHkgaXMgc2V0IHRvIDxjb2RlPnRydWU8L2NvZGU+LCB0aGUgbnVtYmVyIG9mXG5cdCAqIGxpbmVzIGluY3JlYXNlcyB3aGVuIHRleHQgd3JhcHMuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IG51bUxpbmVzKCk6bnVtYmVyIC8qaW50Ki9cblx0e1xuXHRcdHJldHVybiB0aGlzLl9udW1MaW5lcztcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgdGhlIHNldCBvZiBjaGFyYWN0ZXJzIHRoYXQgYSB1c2VyIGNhbiBlbnRlciBpbnRvIHRoZSB0ZXh0IGZpZWxkLlxuXHQgKiBJZiB0aGUgdmFsdWUgb2YgdGhlIDxjb2RlPnJlc3RyaWN0PC9jb2RlPiBwcm9wZXJ0eSBpcyA8Y29kZT5udWxsPC9jb2RlPixcblx0ICogeW91IGNhbiBlbnRlciBhbnkgY2hhcmFjdGVyLiBJZiB0aGUgdmFsdWUgb2YgdGhlIDxjb2RlPnJlc3RyaWN0PC9jb2RlPlxuXHQgKiBwcm9wZXJ0eSBpcyBhbiBlbXB0eSBzdHJpbmcsIHlvdSBjYW5ub3QgZW50ZXIgYW55IGNoYXJhY3Rlci4gSWYgdGhlIHZhbHVlXG5cdCAqIG9mIHRoZSA8Y29kZT5yZXN0cmljdDwvY29kZT4gcHJvcGVydHkgaXMgYSBzdHJpbmcgb2YgY2hhcmFjdGVycywgeW91IGNhblxuXHQgKiBlbnRlciBvbmx5IGNoYXJhY3RlcnMgaW4gdGhlIHN0cmluZyBpbnRvIHRoZSB0ZXh0IGZpZWxkLiBUaGUgc3RyaW5nIGlzXG5cdCAqIHNjYW5uZWQgZnJvbSBsZWZ0IHRvIHJpZ2h0LiBZb3UgY2FuIHNwZWNpZnkgYSByYW5nZSBieSB1c2luZyB0aGUgaHlwaGVuXG5cdCAqICgtKSBjaGFyYWN0ZXIuIE9ubHkgdXNlciBpbnRlcmFjdGlvbiBpcyByZXN0cmljdGVkOyBhIHNjcmlwdCBjYW4gcHV0IGFueVxuXHQgKiB0ZXh0IGludG8gdGhlIHRleHQgZmllbGQuIDxwaCBvdXRwdXRjbGFzcz1cImZsYXNob25seVwiPlRoaXMgcHJvcGVydHkgZG9lc1xuXHQgKiBub3Qgc3luY2hyb25pemUgd2l0aCB0aGUgRW1iZWQgZm9udCBvcHRpb25zIGluIHRoZSBQcm9wZXJ0eSBpbnNwZWN0b3IuXG5cdCAqXG5cdCAqIDxwPklmIHRoZSBzdHJpbmcgYmVnaW5zIHdpdGggYSBjYXJldCheKSBjaGFyYWN0ZXIsIGFsbCBjaGFyYWN0ZXJzIGFyZVxuXHQgKiBpbml0aWFsbHkgYWNjZXB0ZWQgYW5kIHN1Y2NlZWRpbmcgY2hhcmFjdGVycyBpbiB0aGUgc3RyaW5nIGFyZSBleGNsdWRlZFxuXHQgKiBmcm9tIHRoZSBzZXQgb2YgYWNjZXB0ZWQgY2hhcmFjdGVycy4gSWYgdGhlIHN0cmluZyBkb2VzIG5vdCBiZWdpbiB3aXRoIGFcblx0ICogY2FyZXQoXikgY2hhcmFjdGVyLCBubyBjaGFyYWN0ZXJzIGFyZSBpbml0aWFsbHkgYWNjZXB0ZWQgYW5kIHN1Y2NlZWRpbmdcblx0ICogY2hhcmFjdGVycyBpbiB0aGUgc3RyaW5nIGFyZSBpbmNsdWRlZCBpbiB0aGUgc2V0IG9mIGFjY2VwdGVkXG5cdCAqIGNoYXJhY3RlcnMuPC9wPlxuXHQgKlxuXHQgKiA8cD5UaGUgZm9sbG93aW5nIGV4YW1wbGUgYWxsb3dzIG9ubHkgdXBwZXJjYXNlIGNoYXJhY3RlcnMsIHNwYWNlcywgYW5kXG5cdCAqIG51bWJlcnMgdG8gYmUgZW50ZXJlZCBpbnRvIGEgdGV4dCBmaWVsZDo8L3A+XG5cdCAqIDxwcmUgeG1sOnNwYWNlPVwicHJlc2VydmVcIj4gbXlfdHh0LnJlc3RyaWN0ID0gXCJBLVogMC05XCI7IDwvcHJlPlxuXHQgKlxuXHQgKiA8cD5UaGUgZm9sbG93aW5nIGV4YW1wbGUgaW5jbHVkZXMgYWxsIGNoYXJhY3RlcnMsIGJ1dCBleGNsdWRlcyBsb3dlcmNhc2Vcblx0ICogbGV0dGVyczo8L3A+XG5cdCAqIDxwcmUgeG1sOnNwYWNlPVwicHJlc2VydmVcIj4gbXlfdHh0LnJlc3RyaWN0ID0gXCJeYS16XCI7IDwvcHJlPlxuXHQgKlxuXHQgKiA8cD5Zb3UgY2FuIHVzZSBhIGJhY2tzbGFzaCB0byBlbnRlciBhIF4gb3IgLSB2ZXJiYXRpbS4gVGhlIGFjY2VwdGVkXG5cdCAqIGJhY2tzbGFzaCBzZXF1ZW5jZXMgYXJlIFxcLSwgXFxeIG9yIFxcXFwuIFRoZSBiYWNrc2xhc2ggbXVzdCBiZSBhbiBhY3R1YWxcblx0ICogY2hhcmFjdGVyIGluIHRoZSBzdHJpbmcsIHNvIHdoZW4gc3BlY2lmaWVkIGluIEFjdGlvblNjcmlwdCwgYSBkb3VibGVcblx0ICogYmFja3NsYXNoIG11c3QgYmUgdXNlZC4gRm9yIGV4YW1wbGUsIHRoZSBmb2xsb3dpbmcgY29kZSBpbmNsdWRlcyBvbmx5IHRoZVxuXHQgKiBkYXNoKC0pIGFuZCBjYXJldCheKTo8L3A+XG5cdCAqIDxwcmUgeG1sOnNwYWNlPVwicHJlc2VydmVcIj4gbXlfdHh0LnJlc3RyaWN0ID0gXCJcXFxcLVxcXFxeXCI7IDwvcHJlPlxuXHQgKlxuXHQgKiA8cD5UaGUgXiBjYW4gYmUgdXNlZCBhbnl3aGVyZSBpbiB0aGUgc3RyaW5nIHRvIHRvZ2dsZSBiZXR3ZWVuIGluY2x1ZGluZ1xuXHQgKiBjaGFyYWN0ZXJzIGFuZCBleGNsdWRpbmcgY2hhcmFjdGVycy4gVGhlIGZvbGxvd2luZyBjb2RlIGluY2x1ZGVzIG9ubHlcblx0ICogdXBwZXJjYXNlIGxldHRlcnMsIGJ1dCBleGNsdWRlcyB0aGUgdXBwZXJjYXNlIGxldHRlciBROjwvcD5cblx0ICogPHByZSB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiPiBteV90eHQucmVzdHJpY3QgPSBcIkEtWl5RXCI7IDwvcHJlPlxuXHQgKlxuXHQgKiA8cD5Zb3UgY2FuIHVzZSB0aGUgPGNvZGU+XFx1PC9jb2RlPiBlc2NhcGUgc2VxdWVuY2UgdG8gY29uc3RydWN0XG5cdCAqIDxjb2RlPnJlc3RyaWN0PC9jb2RlPiBzdHJpbmdzLiBUaGUgZm9sbG93aW5nIGNvZGUgaW5jbHVkZXMgb25seSB0aGVcblx0ICogY2hhcmFjdGVycyBmcm9tIEFTQ0lJIDMyKHNwYWNlKSB0byBBU0NJSSAxMjYodGlsZGUpLjwvcD5cblx0ICogPHByZSB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiPiBteV90eHQucmVzdHJpY3QgPSBcIlxcdTAwMjAtXFx1MDA3RVwiOyA8L3ByZT5cblx0ICogXG5cdCAqIEBkZWZhdWx0IG51bGxcblx0ICovXG5cdHB1YmxpYyByZXN0cmljdDpzdHJpbmc7XG5cblx0LyoqXG5cdCAqIFRoZSBjdXJyZW50IGhvcml6b250YWwgc2Nyb2xsaW5nIHBvc2l0aW9uLiBJZiB0aGUgPGNvZGU+c2Nyb2xsSDwvY29kZT5cblx0ICogcHJvcGVydHkgaXMgMCwgdGhlIHRleHQgaXMgbm90IGhvcml6b250YWxseSBzY3JvbGxlZC4gVGhpcyBwcm9wZXJ0eSB2YWx1ZVxuXHQgKiBpcyBhbiBpbnRlZ2VyIHRoYXQgcmVwcmVzZW50cyB0aGUgaG9yaXpvbnRhbCBwb3NpdGlvbiBpbiBwaXhlbHMuXG5cdCAqXG5cdCAqIDxwPlRoZSB1bml0cyBvZiBob3Jpem9udGFsIHNjcm9sbGluZyBhcmUgcGl4ZWxzLCB3aGVyZWFzIHRoZSB1bml0cyBvZlxuXHQgKiB2ZXJ0aWNhbCBzY3JvbGxpbmcgYXJlIGxpbmVzLiBIb3Jpem9udGFsIHNjcm9sbGluZyBpcyBtZWFzdXJlZCBpbiBwaXhlbHNcblx0ICogYmVjYXVzZSBtb3N0IGZvbnRzIHlvdSB0eXBpY2FsbHkgdXNlIGFyZSBwcm9wb3J0aW9uYWxseSBzcGFjZWQ7IHRoYXQgaXMsXG5cdCAqIHRoZSBjaGFyYWN0ZXJzIGNhbiBoYXZlIGRpZmZlcmVudCB3aWR0aHMuIEZsYXNoIFBsYXllciBwZXJmb3JtcyB2ZXJ0aWNhbFxuXHQgKiBzY3JvbGxpbmcgYnkgbGluZSBiZWNhdXNlIHVzZXJzIHVzdWFsbHkgd2FudCB0byBzZWUgYSBjb21wbGV0ZSBsaW5lIG9mXG5cdCAqIHRleHQgcmF0aGVyIHRoYW4gYSBwYXJ0aWFsIGxpbmUuIEV2ZW4gaWYgYSBsaW5lIHVzZXMgbXVsdGlwbGUgZm9udHMsIHRoZVxuXHQgKiBoZWlnaHQgb2YgdGhlIGxpbmUgYWRqdXN0cyB0byBmaXQgdGhlIGxhcmdlc3QgZm9udCBpbiB1c2UuPC9wPlxuXHQgKlxuXHQgKiA8cD48Yj5Ob3RlOiA8L2I+VGhlIDxjb2RlPnNjcm9sbEg8L2NvZGU+IHByb3BlcnR5IGlzIHplcm8tYmFzZWQsIG5vdFxuXHQgKiAxLWJhc2VkIGxpa2UgdGhlIDxjb2RlPnNjcm9sbFY8L2NvZGU+IHZlcnRpY2FsIHNjcm9sbGluZyBwcm9wZXJ0eS48L3A+XG5cdCAqL1xuXHRwdWJsaWMgc2Nyb2xsSDpudW1iZXI7XG5cblx0LyoqXG5cdCAqIFRoZSB2ZXJ0aWNhbCBwb3NpdGlvbiBvZiB0ZXh0IGluIGEgdGV4dCBmaWVsZC4gVGhlIDxjb2RlPnNjcm9sbFY8L2NvZGU+XG5cdCAqIHByb3BlcnR5IGlzIHVzZWZ1bCBmb3IgZGlyZWN0aW5nIHVzZXJzIHRvIGEgc3BlY2lmaWMgcGFyYWdyYXBoIGluIGEgbG9uZ1xuXHQgKiBwYXNzYWdlLCBvciBjcmVhdGluZyBzY3JvbGxpbmcgdGV4dCBmaWVsZHMuXG5cdCAqXG5cdCAqIDxwPlRoZSB1bml0cyBvZiB2ZXJ0aWNhbCBzY3JvbGxpbmcgYXJlIGxpbmVzLCB3aGVyZWFzIHRoZSB1bml0cyBvZlxuXHQgKiBob3Jpem9udGFsIHNjcm9sbGluZyBhcmUgcGl4ZWxzLiBJZiB0aGUgZmlyc3QgbGluZSBkaXNwbGF5ZWQgaXMgdGhlIGZpcnN0XG5cdCAqIGxpbmUgaW4gdGhlIHRleHQgZmllbGQsIHNjcm9sbFYgaXMgc2V0IHRvIDEobm90IDApLiBIb3Jpem9udGFsIHNjcm9sbGluZ1xuXHQgKiBpcyBtZWFzdXJlZCBpbiBwaXhlbHMgYmVjYXVzZSBtb3N0IGZvbnRzIGFyZSBwcm9wb3J0aW9uYWxseSBzcGFjZWQ7IHRoYXRcblx0ICogaXMsIHRoZSBjaGFyYWN0ZXJzIGNhbiBoYXZlIGRpZmZlcmVudCB3aWR0aHMuIEZsYXNoIHBlcmZvcm1zIHZlcnRpY2FsXG5cdCAqIHNjcm9sbGluZyBieSBsaW5lIGJlY2F1c2UgdXNlcnMgdXN1YWxseSB3YW50IHRvIHNlZSBhIGNvbXBsZXRlIGxpbmUgb2Zcblx0ICogdGV4dCByYXRoZXIgdGhhbiBhIHBhcnRpYWwgbGluZS4gRXZlbiBpZiB0aGVyZSBhcmUgbXVsdGlwbGUgZm9udHMgb24gYVxuXHQgKiBsaW5lLCB0aGUgaGVpZ2h0IG9mIHRoZSBsaW5lIGFkanVzdHMgdG8gZml0IHRoZSBsYXJnZXN0IGZvbnQgaW4gdXNlLjwvcD5cblx0ICovXG5cdHB1YmxpYyBzY3JvbGxWOm51bWJlcjtcblxuXHQvKipcblx0ICogQSBCb29sZWFuIHZhbHVlIHRoYXQgaW5kaWNhdGVzIHdoZXRoZXIgdGhlIHRleHQgZmllbGQgaXMgc2VsZWN0YWJsZS4gVGhlXG5cdCAqIHZhbHVlIDxjb2RlPnRydWU8L2NvZGU+IGluZGljYXRlcyB0aGF0IHRoZSB0ZXh0IGlzIHNlbGVjdGFibGUuIFRoZVxuXHQgKiA8Y29kZT5zZWxlY3RhYmxlPC9jb2RlPiBwcm9wZXJ0eSBjb250cm9scyB3aGV0aGVyIGEgdGV4dCBmaWVsZCBpc1xuXHQgKiBzZWxlY3RhYmxlLCBub3Qgd2hldGhlciBhIHRleHQgZmllbGQgaXMgZWRpdGFibGUuIEEgZHluYW1pYyB0ZXh0IGZpZWxkIGNhblxuXHQgKiBiZSBzZWxlY3RhYmxlIGV2ZW4gaWYgaXQgaXMgbm90IGVkaXRhYmxlLiBJZiBhIGR5bmFtaWMgdGV4dCBmaWVsZCBpcyBub3Rcblx0ICogc2VsZWN0YWJsZSwgdGhlIHVzZXIgY2Fubm90IHNlbGVjdCBpdHMgdGV4dC5cblx0ICpcblx0ICogPHA+SWYgPGNvZGU+c2VsZWN0YWJsZTwvY29kZT4gaXMgc2V0IHRvIDxjb2RlPmZhbHNlPC9jb2RlPiwgdGhlIHRleHQgaW5cblx0ICogdGhlIHRleHQgZmllbGQgZG9lcyBub3QgcmVzcG9uZCB0byBzZWxlY3Rpb24gY29tbWFuZHMgZnJvbSB0aGUgbW91c2Ugb3Jcblx0ICoga2V5Ym9hcmQsIGFuZCB0aGUgdGV4dCBjYW5ub3QgYmUgY29waWVkIHdpdGggdGhlIENvcHkgY29tbWFuZC4gSWZcblx0ICogPGNvZGU+c2VsZWN0YWJsZTwvY29kZT4gaXMgc2V0IHRvIDxjb2RlPnRydWU8L2NvZGU+LCB0aGUgdGV4dCBpbiB0aGUgdGV4dFxuXHQgKiBmaWVsZCBjYW4gYmUgc2VsZWN0ZWQgd2l0aCB0aGUgbW91c2Ugb3Iga2V5Ym9hcmQsIGFuZCB0aGUgdGV4dCBjYW4gYmVcblx0ICogY29waWVkIHdpdGggdGhlIENvcHkgY29tbWFuZC4gWW91IGNhbiBzZWxlY3QgdGV4dCB0aGlzIHdheSBldmVuIGlmIHRoZVxuXHQgKiB0ZXh0IGZpZWxkIGlzIGEgZHluYW1pYyB0ZXh0IGZpZWxkIGluc3RlYWQgb2YgYW4gaW5wdXQgdGV4dCBmaWVsZC4gPC9wPlxuXHQgKiBcblx0ICogQGRlZmF1bHQgdHJ1ZVxuXHQgKi9cblx0cHVibGljIHNlbGVjdGFibGU6Ym9vbGVhbjtcblxuXHQvKipcblx0ICogVGhlIHplcm8tYmFzZWQgY2hhcmFjdGVyIGluZGV4IHZhbHVlIG9mIHRoZSBmaXJzdCBjaGFyYWN0ZXIgaW4gdGhlIGN1cnJlbnRcblx0ICogc2VsZWN0aW9uLiBGb3IgZXhhbXBsZSwgdGhlIGZpcnN0IGNoYXJhY3RlciBpcyAwLCB0aGUgc2Vjb25kIGNoYXJhY3RlciBpc1xuXHQgKiAxLCBhbmQgc28gb24uIElmIG5vIHRleHQgaXMgc2VsZWN0ZWQsIHRoaXMgcHJvcGVydHkgaXMgdGhlIHZhbHVlIG9mXG5cdCAqIDxjb2RlPmNhcmV0SW5kZXg8L2NvZGU+LlxuXHQgKi9cblx0cHVibGljIGdldCBzZWxlY3Rpb25CZWdpbkluZGV4KCk6bnVtYmVyIC8qaW50Ki9cblx0e1xuXHRcdHJldHVybiB0aGlzLl9zZWxlY3Rpb25CZWdpbkluZGV4O1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSB6ZXJvLWJhc2VkIGNoYXJhY3RlciBpbmRleCB2YWx1ZSBvZiB0aGUgbGFzdCBjaGFyYWN0ZXIgaW4gdGhlIGN1cnJlbnRcblx0ICogc2VsZWN0aW9uLiBGb3IgZXhhbXBsZSwgdGhlIGZpcnN0IGNoYXJhY3RlciBpcyAwLCB0aGUgc2Vjb25kIGNoYXJhY3RlciBpc1xuXHQgKiAxLCBhbmQgc28gb24uIElmIG5vIHRleHQgaXMgc2VsZWN0ZWQsIHRoaXMgcHJvcGVydHkgaXMgdGhlIHZhbHVlIG9mXG5cdCAqIDxjb2RlPmNhcmV0SW5kZXg8L2NvZGU+LlxuXHQgKi9cblx0cHVibGljIGdldCBzZWxlY3Rpb25FbmRJbmRleCgpOm51bWJlciAvKmludCovXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fc2VsZWN0aW9uRW5kSW5kZXg7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIHNoYXJwbmVzcyBvZiB0aGUgZ2x5cGggZWRnZXMgaW4gdGhpcyB0ZXh0IGZpZWxkLiBUaGlzIHByb3BlcnR5IGFwcGxpZXNcblx0ICogb25seSBpZiB0aGUgPGNvZGU+Zmxhc2gudGV4dC5BbnRpQWxpYXNUeXBlPC9jb2RlPiBwcm9wZXJ0eSBvZiB0aGUgdGV4dFxuXHQgKiBmaWVsZCBpcyBzZXQgdG8gPGNvZGU+Zmxhc2gudGV4dC5BbnRpQWxpYXNUeXBlLkFEVkFOQ0VEPC9jb2RlPi4gVGhlIHJhbmdlXG5cdCAqIGZvciA8Y29kZT5zaGFycG5lc3M8L2NvZGU+IGlzIGEgbnVtYmVyIGZyb20gLTQwMCB0byA0MDAuIElmIHlvdSBhdHRlbXB0IHRvXG5cdCAqIHNldCA8Y29kZT5zaGFycG5lc3M8L2NvZGU+IHRvIGEgdmFsdWUgb3V0c2lkZSB0aGF0IHJhbmdlLCBGbGFzaCBzZXRzIHRoZVxuXHQgKiBwcm9wZXJ0eSB0byB0aGUgbmVhcmVzdCB2YWx1ZSBpbiB0aGUgcmFuZ2UoZWl0aGVyIC00MDAgb3IgNDAwKS5cblx0ICogXG5cdCAqIEBkZWZhdWx0IDBcblx0ICovXG5cdHB1YmxpYyBzaGFycG5lc3M6bnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBBdHRhY2hlcyBhIHN0eWxlIHNoZWV0IHRvIHRoZSB0ZXh0IGZpZWxkLiBGb3IgaW5mb3JtYXRpb24gb24gY3JlYXRpbmdcblx0ICogc3R5bGUgc2hlZXRzLCBzZWUgdGhlIFN0eWxlU2hlZXQgY2xhc3MgYW5kIHRoZSA8aT5BY3Rpb25TY3JpcHQgMy4wXG5cdCAqIERldmVsb3BlcidzIEd1aWRlPC9pPi5cblx0ICpcblx0ICogPHA+WW91IGNhbiBjaGFuZ2UgdGhlIHN0eWxlIHNoZWV0IGFzc29jaWF0ZWQgd2l0aCBhIHRleHQgZmllbGQgYXQgYW55XG5cdCAqIHRpbWUuIElmIHlvdSBjaGFuZ2UgdGhlIHN0eWxlIHNoZWV0IGluIHVzZSwgdGhlIHRleHQgZmllbGQgaXMgcmVkcmF3biB3aXRoXG5cdCAqIHRoZSBuZXcgc3R5bGUgc2hlZXQuIFlvdSBjYW4gc2V0IHRoZSBzdHlsZSBzaGVldCB0byA8Y29kZT5udWxsPC9jb2RlPiBvclxuXHQgKiA8Y29kZT51bmRlZmluZWQ8L2NvZGU+IHRvIHJlbW92ZSB0aGUgc3R5bGUgc2hlZXQuIElmIHRoZSBzdHlsZSBzaGVldCBpblxuXHQgKiB1c2UgaXMgcmVtb3ZlZCwgdGhlIHRleHQgZmllbGQgaXMgcmVkcmF3biB3aXRob3V0IGEgc3R5bGUgc2hlZXQuIDwvcD5cblx0ICpcblx0ICogPHA+PGI+Tm90ZTo8L2I+IElmIHRoZSBzdHlsZSBzaGVldCBpcyByZW1vdmVkLCB0aGUgY29udGVudHMgb2YgYm90aFxuXHQgKiA8Y29kZT5UZXh0RmllbGQudGV4dDwvY29kZT4gYW5kIDxjb2RlPiBUZXh0RmllbGQuaHRtbFRleHQ8L2NvZGU+IGNoYW5nZSB0b1xuXHQgKiBpbmNvcnBvcmF0ZSB0aGUgZm9ybWF0dGluZyBwcmV2aW91c2x5IGFwcGxpZWQgYnkgdGhlIHN0eWxlIHNoZWV0LiBUb1xuXHQgKiBwcmVzZXJ2ZSB0aGUgb3JpZ2luYWwgPGNvZGU+VGV4dEZpZWxkLmh0bWxUZXh0PC9jb2RlPiBjb250ZW50cyB3aXRob3V0IHRoZVxuXHQgKiBmb3JtYXR0aW5nLCBzYXZlIHRoZSB2YWx1ZSBpbiBhIHZhcmlhYmxlIGJlZm9yZSByZW1vdmluZyB0aGUgc3R5bGVcblx0ICogc2hlZXQuPC9wPlxuXHQgKi9cblx0cHVibGljIHN0eWxlU2hlZXQ6U3R5bGVTaGVldDtcblxuXHQvKipcblx0ICogQSBzdHJpbmcgdGhhdCBpcyB0aGUgY3VycmVudCB0ZXh0IGluIHRoZSB0ZXh0IGZpZWxkLiBMaW5lcyBhcmUgc2VwYXJhdGVkXG5cdCAqIGJ5IHRoZSBjYXJyaWFnZSByZXR1cm4gY2hhcmFjdGVyKDxjb2RlPidcXHInPC9jb2RlPiwgQVNDSUkgMTMpLiBUaGlzXG5cdCAqIHByb3BlcnR5IGNvbnRhaW5zIHVuZm9ybWF0dGVkIHRleHQgaW4gdGhlIHRleHQgZmllbGQsIHdpdGhvdXQgSFRNTCB0YWdzLlxuXHQgKlxuXHQgKiA8cD5UbyBnZXQgdGhlIHRleHQgaW4gSFRNTCBmb3JtLCB1c2UgdGhlIDxjb2RlPmh0bWxUZXh0PC9jb2RlPlxuXHQgKiBwcm9wZXJ0eS48L3A+XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHRleHQoKTpzdHJpbmdcblx0e1xuXHRcdHJldHVybiB0aGlzLl90ZXh0O1xuXHR9XG5cblx0cHVibGljIHNldCB0ZXh0KHZhbHVlOnN0cmluZylcblx0e1xuXHRcdGlmICh0aGlzLl90ZXh0ID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fdGV4dCA9IHZhbHVlO1xuXHRcdHRoaXMucmVDb25zdHJ1Y3QoKTtcblx0fVxuXHRwdWJsaWMgZ2V0IHRleHRGb3JtYXQoKTpUZXh0Rm9ybWF0XG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fdGV4dEZvcm1hdDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgdGV4dEZvcm1hdCh2YWx1ZTpUZXh0Rm9ybWF0KVxuXHR7XG5cdFx0aWYgKHRoaXMuX3RleHRGb3JtYXQgPT0gdmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cdFx0dGhpcy5fdGV4dEZvcm1hdCA9IHZhbHVlO1xuXHRcdHRoaXMucmVDb25zdHJ1Y3QoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgY29sb3Igb2YgdGhlIHRleHQgaW4gYSB0ZXh0IGZpZWxkLCBpbiBoZXhhZGVjaW1hbCBmb3JtYXQuIFRoZVxuXHQgKiBoZXhhZGVjaW1hbCBjb2xvciBzeXN0ZW0gdXNlcyBzaXggZGlnaXRzIHRvIHJlcHJlc2VudCBjb2xvciB2YWx1ZXMuIEVhY2hcblx0ICogZGlnaXQgaGFzIDE2IHBvc3NpYmxlIHZhbHVlcyBvciBjaGFyYWN0ZXJzLiBUaGUgY2hhcmFjdGVycyByYW5nZSBmcm9tIDAtOVxuXHQgKiBhbmQgdGhlbiBBLUYuIEZvciBleGFtcGxlLCBibGFjayBpcyA8Y29kZT4weDAwMDAwMDwvY29kZT47IHdoaXRlIGlzXG5cdCAqIDxjb2RlPjB4RkZGRkZGPC9jb2RlPi5cblx0ICogXG5cdCAqIEBkZWZhdWx0IDAoMHgwMDAwMDApXG5cdCAqL1xuXHRwdWJsaWMgdGV4dENvbG9yOm51bWJlciAvKmludCovO1xuXG5cdC8qKlxuXHQgKiBUaGUgaGVpZ2h0IG9mIHRoZSB0ZXh0IGluIHBpeGVscy5cblx0ICovXG5cdHB1YmxpYyBnZXQgdGV4dEhlaWdodCgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3RleHRIZWlnaHQ7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIGludGVyYWN0aW9uIG1vZGUgcHJvcGVydHksIERlZmF1bHQgdmFsdWUgaXNcblx0ICogVGV4dEludGVyYWN0aW9uTW9kZS5OT1JNQUwuIE9uIG1vYmlsZSBwbGF0Zm9ybXMsIHRoZSBub3JtYWwgbW9kZSBpbXBsaWVzXG5cdCAqIHRoYXQgdGhlIHRleHQgY2FuIGJlIHNjcm9sbGVkIGJ1dCBub3Qgc2VsZWN0ZWQuIE9uZSBjYW4gc3dpdGNoIHRvIHRoZVxuXHQgKiBzZWxlY3RhYmxlIG1vZGUgdGhyb3VnaCB0aGUgaW4tYnVpbHQgY29udGV4dCBtZW51IG9uIHRoZSB0ZXh0IGZpZWxkLiBPblxuXHQgKiBEZXNrdG9wLCB0aGUgbm9ybWFsIG1vZGUgaW1wbGllcyB0aGF0IHRoZSB0ZXh0IGlzIGluIHNjcm9sbGFibGUgYXMgd2VsbCBhc1xuXHQgKiBzZWxlY3Rpb24gbW9kZS5cblx0ICovXG5cdHB1YmxpYyBnZXQgdGV4dEludGVyYWN0aW9uTW9kZSgpOlRleHRJbnRlcmFjdGlvbk1vZGVcblx0e1xuXHRcdHJldHVybiB0aGlzLl90ZXh0SW50ZXJhY3Rpb25Nb2RlO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSB3aWR0aCBvZiB0aGUgdGV4dCBpbiBwaXhlbHMuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHRleHRXaWR0aCgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3RleHRXaWR0aDtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgdGhpY2tuZXNzIG9mIHRoZSBnbHlwaCBlZGdlcyBpbiB0aGlzIHRleHQgZmllbGQuIFRoaXMgcHJvcGVydHkgYXBwbGllc1xuXHQgKiBvbmx5IHdoZW4gPGNvZGU+QW50aUFsaWFzVHlwZTwvY29kZT4gaXMgc2V0IHRvXG5cdCAqIDxjb2RlPkFudGlBbGlhc1R5cGUuQURWQU5DRUQ8L2NvZGU+LlxuXHQgKlxuXHQgKiA8cD5UaGUgcmFuZ2UgZm9yIDxjb2RlPnRoaWNrbmVzczwvY29kZT4gaXMgYSBudW1iZXIgZnJvbSAtMjAwIHRvIDIwMC4gSWZcblx0ICogeW91IGF0dGVtcHQgdG8gc2V0IDxjb2RlPnRoaWNrbmVzczwvY29kZT4gdG8gYSB2YWx1ZSBvdXRzaWRlIHRoYXQgcmFuZ2UsXG5cdCAqIHRoZSBwcm9wZXJ0eSBpcyBzZXQgdG8gdGhlIG5lYXJlc3QgdmFsdWUgaW4gdGhlIHJhbmdlKGVpdGhlciAtMjAwIG9yXG5cdCAqIDIwMCkuPC9wPlxuXHQgKiBcblx0ICogQGRlZmF1bHQgMFxuXHQgKi9cblx0cHVibGljIHRoaWNrbmVzczpudW1iZXI7XG5cblx0LyoqXG5cdCAqIFRoZSB0eXBlIG9mIHRoZSB0ZXh0IGZpZWxkLiBFaXRoZXIgb25lIG9mIHRoZSBmb2xsb3dpbmcgVGV4dEZpZWxkVHlwZVxuXHQgKiBjb25zdGFudHM6IDxjb2RlPlRleHRGaWVsZFR5cGUuRFlOQU1JQzwvY29kZT4sIHdoaWNoIHNwZWNpZmllcyBhIGR5bmFtaWNcblx0ICogdGV4dCBmaWVsZCwgd2hpY2ggYSB1c2VyIGNhbm5vdCBlZGl0LCBvciA8Y29kZT5UZXh0RmllbGRUeXBlLklOUFVUPC9jb2RlPixcblx0ICogd2hpY2ggc3BlY2lmaWVzIGFuIGlucHV0IHRleHQgZmllbGQsIHdoaWNoIGEgdXNlciBjYW4gZWRpdC5cblx0ICogXG5cdCAqIEBkZWZhdWx0IGR5bmFtaWNcblx0ICogQHRocm93cyBBcmd1bWVudEVycm9yIFRoZSA8Y29kZT50eXBlPC9jb2RlPiBzcGVjaWZpZWQgaXMgbm90IGEgbWVtYmVyIG9mXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBmbGFzaC50ZXh0LlRleHRGaWVsZFR5cGUuXG5cdCAqL1xuXHRwdWJsaWMgdHlwZTpUZXh0RmllbGRUeXBlO1xuXG5cdC8qKlxuXHQgKiBTcGVjaWZpZXMgd2hldGhlciB0byBjb3B5IGFuZCBwYXN0ZSB0aGUgdGV4dCBmb3JtYXR0aW5nIGFsb25nIHdpdGggdGhlXG5cdCAqIHRleHQuIFdoZW4gc2V0IHRvIDxjb2RlPnRydWU8L2NvZGU+LCBGbGFzaCBQbGF5ZXIgY29waWVzIGFuZCBwYXN0ZXNcblx0ICogZm9ybWF0dGluZyhzdWNoIGFzIGFsaWdubWVudCwgYm9sZCwgYW5kIGl0YWxpY3MpIHdoZW4geW91IGNvcHkgYW5kIHBhc3RlXG5cdCAqIGJldHdlZW4gdGV4dCBmaWVsZHMuIEJvdGggdGhlIG9yaWdpbiBhbmQgZGVzdGluYXRpb24gdGV4dCBmaWVsZHMgZm9yIHRoZVxuXHQgKiBjb3B5IGFuZCBwYXN0ZSBwcm9jZWR1cmUgbXVzdCBoYXZlIDxjb2RlPnVzZVJpY2hUZXh0Q2xpcGJvYXJkPC9jb2RlPiBzZXRcblx0ICogdG8gPGNvZGU+dHJ1ZTwvY29kZT4uIFRoZSBkZWZhdWx0IHZhbHVlIGlzIDxjb2RlPmZhbHNlPC9jb2RlPi5cblx0ICovXG5cdHB1YmxpYyB1c2VSaWNoVGV4dENsaXBib2FyZDpib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBBIEJvb2xlYW4gdmFsdWUgdGhhdCBpbmRpY2F0ZXMgd2hldGhlciB0aGUgdGV4dCBmaWVsZCBoYXMgd29yZCB3cmFwLiBJZlxuXHQgKiB0aGUgdmFsdWUgb2YgPGNvZGU+d29yZFdyYXA8L2NvZGU+IGlzIDxjb2RlPnRydWU8L2NvZGU+LCB0aGUgdGV4dCBmaWVsZFxuXHQgKiBoYXMgd29yZCB3cmFwOyBpZiB0aGUgdmFsdWUgaXMgPGNvZGU+ZmFsc2U8L2NvZGU+LCB0aGUgdGV4dCBmaWVsZCBkb2VzIG5vdFxuXHQgKiBoYXZlIHdvcmQgd3JhcC4gVGhlIGRlZmF1bHQgdmFsdWUgaXMgPGNvZGU+ZmFsc2U8L2NvZGU+LlxuXHQgKi9cblx0cHVibGljIHdvcmRXcmFwOmJvb2xlYW47XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYSBuZXcgVGV4dEZpZWxkIGluc3RhbmNlLiBBZnRlciB5b3UgY3JlYXRlIHRoZSBUZXh0RmllbGQgaW5zdGFuY2UsXG5cdCAqIGNhbGwgdGhlIDxjb2RlPmFkZENoaWxkKCk8L2NvZGU+IG9yIDxjb2RlPmFkZENoaWxkQXQoKTwvY29kZT4gbWV0aG9kIG9mXG5cdCAqIHRoZSBwYXJlbnQgRGlzcGxheU9iamVjdENvbnRhaW5lciBvYmplY3QgdG8gYWRkIHRoZSBUZXh0RmllbGQgaW5zdGFuY2UgdG9cblx0ICogdGhlIGRpc3BsYXkgbGlzdC5cblx0ICpcblx0ICogPHA+VGhlIGRlZmF1bHQgc2l6ZSBmb3IgYSB0ZXh0IGZpZWxkIGlzIDEwMCB4IDEwMCBwaXhlbHMuPC9wPlxuXHQgKi9cblx0Y29uc3RydWN0b3IoKVxuXHR7XG5cdFx0c3VwZXIobmV3IEdlb21ldHJ5KCkpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJlY29uc3RydWN0cyB0aGUgR2VvbWV0cnkgZm9yIHRoaXMgVGV4dC1maWVsZC5cblx0ICovXG5cdHB1YmxpYyByZUNvbnN0cnVjdCgpIHtcblxuXHRcdGZvciAodmFyIGk6bnVtYmVyPXRoaXMuZ2VvbWV0cnkuc3ViR2VvbWV0cmllcy5sZW5ndGgtMTsgaT49MDsgaS0tKVxuXHRcdFx0dGhpcy5nZW9tZXRyeS5yZW1vdmVTdWJHZW9tZXRyeSh0aGlzLmdlb21ldHJ5LnN1Ykdlb21ldHJpZXNbaV0pO1xuXG5cdFx0aWYodGhpcy5fdGV4dEZvcm1hdD09bnVsbCl7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGlmKHRoaXMuX3RleHQ9PVwiXCIpe1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHR2YXIgaW5kaWNlczpBcnJheTxudW1iZXI+ID0gbmV3IEFycmF5PG51bWJlcj4oKTtcblx0XHR2YXIgcG9zaXRpb25zOkFycmF5PG51bWJlcj4gPSBuZXcgQXJyYXk8bnVtYmVyPigpO1xuXHRcdHZhciBjdXJ2ZURhdGE6QXJyYXk8bnVtYmVyPiA9IG5ldyBBcnJheTxudW1iZXI+KCk7XG5cdFx0dmFyIHV2czpBcnJheTxudW1iZXI+ID0gbmV3IEFycmF5PG51bWJlcj4oKTtcblxuXHRcdHZhciBjaGFyX3NjYWxlOm51bWJlcj10aGlzLl90ZXh0Rm9ybWF0LnNpemUvdGhpcy5fdGV4dEZvcm1hdC5mb250X3RhYmxlLmdldF9mb250X2VtX3NpemUoKTtcblx0XHR2YXIgdHJpX2lkeF9vZmZzZXQ6bnVtYmVyPTA7XG5cdFx0dmFyIHRyaV9jbnQ6bnVtYmVyPTA7XG5cdFx0dmFyIHhfb2Zmc2V0Om51bWJlcj0wO1xuXHRcdHZhciB5X29mZnNldDpudW1iZXI9MDtcblx0XHR2YXIgcHJldl9jaGFyOlRlc3NlbGF0ZWRGb250Q2hhciA9IG51bGw7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnRleHQubGVuZ3RoOyBpKyspIHtcblxuXHRcdFx0dmFyIHRoaXNfY2hhcjpUZXNzZWxhdGVkRm9udENoYXIgPSA8VGVzc2VsYXRlZEZvbnRDaGFyPiB0aGlzLl90ZXh0Rm9ybWF0LmZvbnRfdGFibGUuZ2V0X3N1Ymdlb19mb3JfY2hhcih0aGlzLl90ZXh0LmNoYXJDb2RlQXQoaSkudG9TdHJpbmcoKSk7XG5cdFx0XHRpZih0aGlzX2NoYXIhPSBudWxsKSB7XG5cdFx0XHRcdHZhciB0aGlzX3N1Ykdlb206Q3VydmVTdWJHZW9tZXRyeSA9IHRoaXNfY2hhci5zdWJnZW9tO1xuXHRcdFx0XHRpZiAodGhpc19zdWJHZW9tICE9IG51bGwpIHtcblx0XHRcdFx0XHR0cmlfY250ID0gMDtcblx0XHRcdFx0XHR2YXIgaW5kaWNlczI6QXJyYXk8bnVtYmVyPiA9IHRoaXNfc3ViR2VvbS5pbmRpY2VzO1xuXHRcdFx0XHRcdHZhciBwb3NpdGlvbnMyOkFycmF5PG51bWJlcj4gPSB0aGlzX3N1Ykdlb20ucG9zaXRpb25zO1xuXHRcdFx0XHRcdHZhciBjdXJ2ZURhdGEyOkFycmF5PG51bWJlcj4gPSB0aGlzX3N1Ykdlb20uY3VydmVzO1xuXHRcdFx0XHRcdGZvciAodmFyIHYgPSAwOyB2IDwgaW5kaWNlczIubGVuZ3RoOyB2KyspIHtcblx0XHRcdFx0XHRcdGluZGljZXMucHVzaChpbmRpY2VzMlt2XSArIHRyaV9pZHhfb2Zmc2V0KTtcblx0XHRcdFx0XHRcdHRyaV9jbnQrKztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dHJpX2lkeF9vZmZzZXQgKz0gdHJpX2NudDtcblx0XHRcdFx0XHRmb3IgKHYgPSAwOyB2IDwgcG9zaXRpb25zMi5sZW5ndGggLyAzOyB2KyspIHtcblx0XHRcdFx0XHRcdHBvc2l0aW9ucy5wdXNoKChwb3NpdGlvbnMyW3YgKiAzXSAqIGNoYXJfc2NhbGUpICsgeF9vZmZzZXQpO1xuXHRcdFx0XHRcdFx0cG9zaXRpb25zLnB1c2goKHBvc2l0aW9uczJbdiAqIDMgKyAxXSAqIGNoYXJfc2NhbGUgKiAtMSkgKyB5X29mZnNldCk7XG5cdFx0XHRcdFx0XHRwb3NpdGlvbnMucHVzaChwb3NpdGlvbnMyW3YgKiAzICsgMl0pO1xuXHRcdFx0XHRcdFx0Y3VydmVEYXRhLnB1c2goY3VydmVEYXRhMlt2ICogMl0pO1xuXHRcdFx0XHRcdFx0Y3VydmVEYXRhLnB1c2goY3VydmVEYXRhMlt2ICogMiArIDFdKTtcblx0XHRcdFx0XHRcdHV2cy5wdXNoKHRoaXMuX3RleHRGb3JtYXQudXZfdmFsdWVzWzBdKTtcblx0XHRcdFx0XHRcdHV2cy5wdXNoKHRoaXMuX3RleHRGb3JtYXQudXZfdmFsdWVzWzFdKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Ly8gZmluZCBrZXJuaW5nIHZhbHVlIHRoYXQgaGFzIGJlZW4gc2V0IGZvciB0aGlzIGNoYXJfY29kZSBvbiBwcmV2aW91cyBjaGFyIChpZiBub24gZXhpc3RzLCBrZXJuaW5nX3ZhbHVlIHdpbGwgc3RheSAwKVxuXHRcdFx0XHRcdHZhciBrZXJuaW5nX3ZhbHVlOm51bWJlcj0wO1xuXHRcdFx0XHRcdGlmKHByZXZfY2hhciE9bnVsbCl7XG5cdFx0XHRcdFx0XHRmb3IodmFyIGs6bnVtYmVyPTA7IGs8cHJldl9jaGFyLmtlcm5pbmdDaGFyQ29kZXMubGVuZ3RoO2srKyl7XG5cdFx0XHRcdFx0XHRcdGlmKHByZXZfY2hhci5rZXJuaW5nQ2hhckNvZGVzW2tdPT10aGlzLl90ZXh0LmNoYXJDb2RlQXQoaSkpe1xuXHRcdFx0XHRcdFx0XHRcdGtlcm5pbmdfdmFsdWU9cHJldl9jaGFyLmtlcm5pbmdWYWx1ZXNba107XG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0eF9vZmZzZXQgKz0gKCh0aGlzX2NoYXIuY2hhcl93aWR0aCtrZXJuaW5nX3ZhbHVlKSAqIGNoYXJfc2NhbGUpICsgdGhpcy5fdGV4dEZvcm1hdC5sZXR0ZXJTcGFjaW5nO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdC8vIGlmIG5vIGNoYXItZ2VvbWV0cnkgd2FzIGZvdW5kLCB3ZSBpbnNlcnQgYSBcInNwYWNlXCJcblx0XHRcdFx0XHR4X29mZnNldCArPSB0aGlzLl90ZXh0Rm9ybWF0LmZvbnRfdGFibGUuZ2V0X2ZvbnRfZW1fc2l6ZSgpICogY2hhcl9zY2FsZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdC8vIGlmIG5vIGNoYXItZ2VvbWV0cnkgd2FzIGZvdW5kLCB3ZSBpbnNlcnQgYSBcInNwYWNlXCJcblx0XHRcdFx0eF9vZmZzZXQgKz0gdGhpcy5fdGV4dEZvcm1hdC5mb250X3RhYmxlLmdldF9mb250X2VtX3NpemUoKSAqIGNoYXJfc2NhbGU7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHZhciBjdXJ2ZV9zdWJfZ2VvbTpDdXJ2ZVN1Ykdlb21ldHJ5ID0gbmV3IEN1cnZlU3ViR2VvbWV0cnkodHJ1ZSk7XG5cdFx0Y3VydmVfc3ViX2dlb20udXBkYXRlSW5kaWNlcyhpbmRpY2VzKTtcblx0XHRjdXJ2ZV9zdWJfZ2VvbS51cGRhdGVQb3NpdGlvbnMocG9zaXRpb25zKTtcblx0XHRjdXJ2ZV9zdWJfZ2VvbS51cGRhdGVDdXJ2ZXMoY3VydmVEYXRhKTtcblx0XHRjdXJ2ZV9zdWJfZ2VvbS51cGRhdGVVVnModXZzKTtcblx0XHR0aGlzLmdlb21ldHJ5LmFkZFN1Ykdlb21ldHJ5KGN1cnZlX3N1Yl9nZW9tKTtcblx0XHR0aGlzLnN1Yk1lc2hlc1swXS5tYXRlcmlhbD10aGlzLl90ZXh0Rm9ybWF0Lm1hdGVyaWFsO1xuXHR9XG5cdC8qKlxuXHQgKiBBcHBlbmRzIHRoZSBzdHJpbmcgc3BlY2lmaWVkIGJ5IHRoZSA8Y29kZT5uZXdUZXh0PC9jb2RlPiBwYXJhbWV0ZXIgdG8gdGhlXG5cdCAqIGVuZCBvZiB0aGUgdGV4dCBvZiB0aGUgdGV4dCBmaWVsZC4gVGhpcyBtZXRob2QgaXMgbW9yZSBlZmZpY2llbnQgdGhhbiBhblxuXHQgKiBhZGRpdGlvbiBhc3NpZ25tZW50KDxjb2RlPis9PC9jb2RlPikgb24gYSA8Y29kZT50ZXh0PC9jb2RlPiBwcm9wZXJ0eVxuXHQgKiAoc3VjaCBhcyA8Y29kZT5zb21lVGV4dEZpZWxkLnRleHQgKz0gbW9yZVRleHQ8L2NvZGU+KSwgcGFydGljdWxhcmx5IGZvciBhXG5cdCAqIHRleHQgZmllbGQgdGhhdCBjb250YWlucyBhIHNpZ25pZmljYW50IGFtb3VudCBvZiBjb250ZW50LlxuXHQgKlxuXHQgKiBAcGFyYW0gbmV3VGV4dCBUaGUgc3RyaW5nIHRvIGFwcGVuZCB0byB0aGUgZXhpc3RpbmcgdGV4dC5cblx0ICovXG5cdHB1YmxpYyBhcHBlbmRUZXh0KG5ld1RleHQ6c3RyaW5nKSB7XG5cdFx0dGhpcy5fdGV4dCs9bmV3VGV4dDtcblx0fVxuXG5cdC8qKlxuXHQgKiAqdGVsbHMgdGhlIFRleHRmaWVsZCB0aGF0IGEgcGFyYWdyYXBoIGlzIGRlZmluZWQgY29tcGxldGx5LlxuXHQgKiBlLmcuIHRoZSB0ZXh0ZmllbGQgd2lsbCBzdGFydCBhIG5ldyBsaW5lIGZvciBmdXR1cmUgYWRkZWQgdGV4dC5cblx0ICovXG5cdHB1YmxpYyBjbG9zZVBhcmFncmFwaCgpXG5cdHtcblx0XHQvL1RPRE9cblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGEgcmVjdGFuZ2xlIHRoYXQgaXMgdGhlIGJvdW5kaW5nIGJveCBvZiB0aGUgY2hhcmFjdGVyLlxuXHQgKiBcblx0ICogQHBhcmFtIGNoYXJJbmRleCBUaGUgemVyby1iYXNlZCBpbmRleCB2YWx1ZSBmb3IgdGhlIGNoYXJhY3Rlcihmb3Jcblx0ICogICAgICAgICAgICAgICAgICBleGFtcGxlLCB0aGUgZmlyc3QgcG9zaXRpb24gaXMgMCwgdGhlIHNlY29uZCBwb3NpdGlvbiBpc1xuXHQgKiAgICAgICAgICAgICAgICAgIDEsIGFuZCBzbyBvbikuXG5cdCAqIEByZXR1cm4gQSByZWN0YW5nbGUgd2l0aCA8Y29kZT54PC9jb2RlPiBhbmQgPGNvZGU+eTwvY29kZT4gbWluaW11bSBhbmRcblx0ICogICAgICAgICBtYXhpbXVtIHZhbHVlcyBkZWZpbmluZyB0aGUgYm91bmRpbmcgYm94IG9mIHRoZSBjaGFyYWN0ZXIuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0Q2hhckJvdW5kYXJpZXMoY2hhckluZGV4Om51bWJlcik6UmVjdGFuZ2xlXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fY2hhckJvdW5kYXJpZXM7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgemVyby1iYXNlZCBpbmRleCB2YWx1ZSBvZiB0aGUgY2hhcmFjdGVyIGF0IHRoZSBwb2ludCBzcGVjaWZpZWRcblx0ICogYnkgdGhlIDxjb2RlPng8L2NvZGU+IGFuZCA8Y29kZT55PC9jb2RlPiBwYXJhbWV0ZXJzLlxuXHQgKiBcblx0ICogQHBhcmFtIHggVGhlIDxpPng8L2k+IGNvb3JkaW5hdGUgb2YgdGhlIGNoYXJhY3Rlci5cblx0ICogQHBhcmFtIHkgVGhlIDxpPnk8L2k+IGNvb3JkaW5hdGUgb2YgdGhlIGNoYXJhY3Rlci5cblx0ICogQHJldHVybiBUaGUgemVyby1iYXNlZCBpbmRleCB2YWx1ZSBvZiB0aGUgY2hhcmFjdGVyKGZvciBleGFtcGxlLCB0aGVcblx0ICogICAgICAgICBmaXJzdCBwb3NpdGlvbiBpcyAwLCB0aGUgc2Vjb25kIHBvc2l0aW9uIGlzIDEsIGFuZCBzbyBvbikuIFJldHVybnNcblx0ICogICAgICAgICAtMSBpZiB0aGUgcG9pbnQgaXMgbm90IG92ZXIgYW55IGNoYXJhY3Rlci5cblx0ICovXG5cdHB1YmxpYyBnZXRDaGFySW5kZXhBdFBvaW50KHg6bnVtYmVyLCB5Om51bWJlcik6bnVtYmVyIC8qaW50Ki9cblx0e1xuXHRcdHJldHVybiB0aGlzLl9jaGFySW5kZXhBdFBvaW50O1xuXHR9XG5cblx0LyoqXG5cdCAqIEdpdmVuIGEgY2hhcmFjdGVyIGluZGV4LCByZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgZmlyc3QgY2hhcmFjdGVyIGluIHRoZVxuXHQgKiBzYW1lIHBhcmFncmFwaC5cblx0ICogXG5cdCAqIEBwYXJhbSBjaGFySW5kZXggVGhlIHplcm8tYmFzZWQgaW5kZXggdmFsdWUgb2YgdGhlIGNoYXJhY3Rlcihmb3IgZXhhbXBsZSxcblx0ICogICAgICAgICAgICAgICAgICB0aGUgZmlyc3QgY2hhcmFjdGVyIGlzIDAsIHRoZSBzZWNvbmQgY2hhcmFjdGVyIGlzIDEsIGFuZFxuXHQgKiAgICAgICAgICAgICAgICAgIHNvIG9uKS5cblx0ICogQHJldHVybiBUaGUgemVyby1iYXNlZCBpbmRleCB2YWx1ZSBvZiB0aGUgZmlyc3QgY2hhcmFjdGVyIGluIHRoZSBzYW1lXG5cdCAqICAgICAgICAgcGFyYWdyYXBoLlxuXHQgKiBAdGhyb3dzIFJhbmdlRXJyb3IgVGhlIGNoYXJhY3RlciBpbmRleCBzcGVjaWZpZWQgaXMgb3V0IG9mIHJhbmdlLlxuXHQgKi9cblx0cHVibGljIGdldEZpcnN0Q2hhckluUGFyYWdyYXBoKGNoYXJJbmRleDpudW1iZXIgLyppbnQqLyk6bnVtYmVyIC8qaW50Ki9cblx0e1xuXHRcdHJldHVybiB0aGlzLl9maXJzdENoYXJJblBhcmFncmFwaDtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGEgRGlzcGxheU9iamVjdCByZWZlcmVuY2UgZm9yIHRoZSBnaXZlbiA8Y29kZT5pZDwvY29kZT4sIGZvciBhblxuXHQgKiBpbWFnZSBvciBTV0YgZmlsZSB0aGF0IGhhcyBiZWVuIGFkZGVkIHRvIGFuIEhUTUwtZm9ybWF0dGVkIHRleHQgZmllbGQgYnlcblx0ICogdXNpbmcgYW4gPGNvZGU+PGltZz48L2NvZGU+IHRhZy4gVGhlIDxjb2RlPjxpbWc+PC9jb2RlPiB0YWcgaXMgaW4gdGhlXG5cdCAqIGZvbGxvd2luZyBmb3JtYXQ6XG5cdCAqXG5cdCAqIDxwPjxwcmUgeG1sOnNwYWNlPVwicHJlc2VydmVcIj48Y29kZT4gPGltZyBzcmMgPSAnZmlsZW5hbWUuanBnJyBpZCA9XG5cdCAqICdpbnN0YW5jZU5hbWUnID48L2NvZGU+PC9wcmU+PC9wPlxuXHQgKiBcblx0ICogQHBhcmFtIGlkIFRoZSA8Y29kZT5pZDwvY29kZT4gdG8gbWF0Y2goaW4gdGhlIDxjb2RlPmlkPC9jb2RlPiBhdHRyaWJ1dGVcblx0ICogICAgICAgICAgIG9mIHRoZSA8Y29kZT48aW1nPjwvY29kZT4gdGFnKS5cblx0ICogQHJldHVybiBUaGUgZGlzcGxheSBvYmplY3QgY29ycmVzcG9uZGluZyB0byB0aGUgaW1hZ2Ugb3IgU1dGIGZpbGUgd2l0aCB0aGVcblx0ICogICAgICAgICBtYXRjaGluZyA8Y29kZT5pZDwvY29kZT4gYXR0cmlidXRlIGluIHRoZSA8Y29kZT48aW1nPjwvY29kZT4gdGFnXG5cdCAqICAgICAgICAgb2YgdGhlIHRleHQgZmllbGQuIEZvciBtZWRpYSBsb2FkZWQgZnJvbSBhbiBleHRlcm5hbCBzb3VyY2UsIHRoaXNcblx0ICogICAgICAgICBvYmplY3QgaXMgYSBMb2FkZXIgb2JqZWN0LCBhbmQsIG9uY2UgbG9hZGVkLCB0aGUgbWVkaWEgb2JqZWN0IGlzIGFcblx0ICogICAgICAgICBjaGlsZCBvZiB0aGF0IExvYWRlciBvYmplY3QuIEZvciBtZWRpYSBlbWJlZGRlZCBpbiB0aGUgU1dGIGZpbGUsXG5cdCAqICAgICAgICAgaXQgaXMgdGhlIGxvYWRlZCBvYmplY3QuIElmIG5vIDxjb2RlPjxpbWc+PC9jb2RlPiB0YWcgd2l0aCB0aGVcblx0ICogICAgICAgICBtYXRjaGluZyA8Y29kZT5pZDwvY29kZT4gZXhpc3RzLCB0aGUgbWV0aG9kIHJldHVybnNcblx0ICogICAgICAgICA8Y29kZT5udWxsPC9jb2RlPi5cblx0ICovXG5cdHB1YmxpYyBnZXRJbWFnZVJlZmVyZW5jZShpZDpzdHJpbmcpOkRpc3BsYXlPYmplY3Rcblx0e1xuXHRcdHJldHVybiB0aGlzLl9pbWFnZVJlZmVyZW5jZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSB6ZXJvLWJhc2VkIGluZGV4IHZhbHVlIG9mIHRoZSBsaW5lIGF0IHRoZSBwb2ludCBzcGVjaWZpZWQgYnlcblx0ICogdGhlIDxjb2RlPng8L2NvZGU+IGFuZCA8Y29kZT55PC9jb2RlPiBwYXJhbWV0ZXJzLlxuXHQgKiBcblx0ICogQHBhcmFtIHggVGhlIDxpPng8L2k+IGNvb3JkaW5hdGUgb2YgdGhlIGxpbmUuXG5cdCAqIEBwYXJhbSB5IFRoZSA8aT55PC9pPiBjb29yZGluYXRlIG9mIHRoZSBsaW5lLlxuXHQgKiBAcmV0dXJuIFRoZSB6ZXJvLWJhc2VkIGluZGV4IHZhbHVlIG9mIHRoZSBsaW5lKGZvciBleGFtcGxlLCB0aGUgZmlyc3Rcblx0ICogICAgICAgICBsaW5lIGlzIDAsIHRoZSBzZWNvbmQgbGluZSBpcyAxLCBhbmQgc28gb24pLiBSZXR1cm5zIC0xIGlmIHRoZVxuXHQgKiAgICAgICAgIHBvaW50IGlzIG5vdCBvdmVyIGFueSBsaW5lLlxuXHQgKi9cblx0cHVibGljIGdldExpbmVJbmRleEF0UG9pbnQoeDpudW1iZXIsIHk6bnVtYmVyKTpudW1iZXIgLyppbnQqL1xuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2xpbmVJbmRleEF0UG9pbnQ7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgemVyby1iYXNlZCBpbmRleCB2YWx1ZSBvZiB0aGUgbGluZSBjb250YWluaW5nIHRoZSBjaGFyYWN0ZXJcblx0ICogc3BlY2lmaWVkIGJ5IHRoZSA8Y29kZT5jaGFySW5kZXg8L2NvZGU+IHBhcmFtZXRlci5cblx0ICogXG5cdCAqIEBwYXJhbSBjaGFySW5kZXggVGhlIHplcm8tYmFzZWQgaW5kZXggdmFsdWUgb2YgdGhlIGNoYXJhY3Rlcihmb3IgZXhhbXBsZSxcblx0ICogICAgICAgICAgICAgICAgICB0aGUgZmlyc3QgY2hhcmFjdGVyIGlzIDAsIHRoZSBzZWNvbmQgY2hhcmFjdGVyIGlzIDEsIGFuZFxuXHQgKiAgICAgICAgICAgICAgICAgIHNvIG9uKS5cblx0ICogQHJldHVybiBUaGUgemVyby1iYXNlZCBpbmRleCB2YWx1ZSBvZiB0aGUgbGluZS5cblx0ICogQHRocm93cyBSYW5nZUVycm9yIFRoZSBjaGFyYWN0ZXIgaW5kZXggc3BlY2lmaWVkIGlzIG91dCBvZiByYW5nZS5cblx0ICovXG5cdHB1YmxpYyBnZXRMaW5lSW5kZXhPZkNoYXIoY2hhckluZGV4Om51bWJlciAvKmludCovKTpudW1iZXIgLyppbnQqL1xuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2xpbmVJbmRleE9mQ2hhcjtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgY2hhcmFjdGVycyBpbiBhIHNwZWNpZmljIHRleHQgbGluZS5cblx0ICogXG5cdCAqIEBwYXJhbSBsaW5lSW5kZXggVGhlIGxpbmUgbnVtYmVyIGZvciB3aGljaCB5b3Ugd2FudCB0aGUgbGVuZ3RoLlxuXHQgKiBAcmV0dXJuIFRoZSBudW1iZXIgb2YgY2hhcmFjdGVycyBpbiB0aGUgbGluZS5cblx0ICogQHRocm93cyBSYW5nZUVycm9yIFRoZSBsaW5lIG51bWJlciBzcGVjaWZpZWQgaXMgb3V0IG9mIHJhbmdlLlxuXHQgKi9cblx0cHVibGljIGdldExpbmVMZW5ndGgobGluZUluZGV4Om51bWJlciAvKmludCovKTpudW1iZXIgLyppbnQqL1xuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2xpbmVMZW5ndGg7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBtZXRyaWNzIGluZm9ybWF0aW9uIGFib3V0IGEgZ2l2ZW4gdGV4dCBsaW5lLlxuXHQgKiBcblx0ICogQHBhcmFtIGxpbmVJbmRleCBUaGUgbGluZSBudW1iZXIgZm9yIHdoaWNoIHlvdSB3YW50IG1ldHJpY3MgaW5mb3JtYXRpb24uXG5cdCAqIEByZXR1cm4gQSBUZXh0TGluZU1ldHJpY3Mgb2JqZWN0LlxuXHQgKiBAdGhyb3dzIFJhbmdlRXJyb3IgVGhlIGxpbmUgbnVtYmVyIHNwZWNpZmllZCBpcyBvdXQgb2YgcmFuZ2UuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0TGluZU1ldHJpY3MobGluZUluZGV4Om51bWJlciAvKmludCovKTpUZXh0TGluZU1ldHJpY3Ncblx0e1xuXHRcdHJldHVybiB0aGlzLl9saW5lTWV0cmljcztcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSBjaGFyYWN0ZXIgaW5kZXggb2YgdGhlIGZpcnN0IGNoYXJhY3RlciBpbiB0aGUgbGluZSB0aGF0IHRoZVxuXHQgKiA8Y29kZT5saW5lSW5kZXg8L2NvZGU+IHBhcmFtZXRlciBzcGVjaWZpZXMuXG5cdCAqIFxuXHQgKiBAcGFyYW0gbGluZUluZGV4IFRoZSB6ZXJvLWJhc2VkIGluZGV4IHZhbHVlIG9mIHRoZSBsaW5lKGZvciBleGFtcGxlLCB0aGVcblx0ICogICAgICAgICAgICAgICAgICBmaXJzdCBsaW5lIGlzIDAsIHRoZSBzZWNvbmQgbGluZSBpcyAxLCBhbmQgc28gb24pLlxuXHQgKiBAcmV0dXJuIFRoZSB6ZXJvLWJhc2VkIGluZGV4IHZhbHVlIG9mIHRoZSBmaXJzdCBjaGFyYWN0ZXIgaW4gdGhlIGxpbmUuXG5cdCAqIEB0aHJvd3MgUmFuZ2VFcnJvciBUaGUgbGluZSBudW1iZXIgc3BlY2lmaWVkIGlzIG91dCBvZiByYW5nZS5cblx0ICovXG5cdHB1YmxpYyBnZXRMaW5lT2Zmc2V0KGxpbmVJbmRleDpudW1iZXIgLyppbnQqLyk6bnVtYmVyIC8qaW50Ki9cblx0e1xuXHRcdHJldHVybiB0aGlzLl9saW5lT2Zmc2V0O1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIHRleHQgb2YgdGhlIGxpbmUgc3BlY2lmaWVkIGJ5IHRoZSA8Y29kZT5saW5lSW5kZXg8L2NvZGU+XG5cdCAqIHBhcmFtZXRlci5cblx0ICogXG5cdCAqIEBwYXJhbSBsaW5lSW5kZXggVGhlIHplcm8tYmFzZWQgaW5kZXggdmFsdWUgb2YgdGhlIGxpbmUoZm9yIGV4YW1wbGUsIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgIGZpcnN0IGxpbmUgaXMgMCwgdGhlIHNlY29uZCBsaW5lIGlzIDEsIGFuZCBzbyBvbikuXG5cdCAqIEByZXR1cm4gVGhlIHRleHQgc3RyaW5nIGNvbnRhaW5lZCBpbiB0aGUgc3BlY2lmaWVkIGxpbmUuXG5cdCAqIEB0aHJvd3MgUmFuZ2VFcnJvciBUaGUgbGluZSBudW1iZXIgc3BlY2lmaWVkIGlzIG91dCBvZiByYW5nZS5cblx0ICovXG5cdHB1YmxpYyBnZXRMaW5lVGV4dChsaW5lSW5kZXg6bnVtYmVyIC8qaW50Ki8pOnN0cmluZ1xuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2xpbmVUZXh0O1xuXHR9XG5cblx0LyoqXG5cdCAqIEdpdmVuIGEgY2hhcmFjdGVyIGluZGV4LCByZXR1cm5zIHRoZSBsZW5ndGggb2YgdGhlIHBhcmFncmFwaCBjb250YWluaW5nXG5cdCAqIHRoZSBnaXZlbiBjaGFyYWN0ZXIuIFRoZSBsZW5ndGggaXMgcmVsYXRpdmUgdG8gdGhlIGZpcnN0IGNoYXJhY3RlciBpbiB0aGVcblx0ICogcGFyYWdyYXBoKGFzIHJldHVybmVkIGJ5IDxjb2RlPmdldEZpcnN0Q2hhckluUGFyYWdyYXBoKCk8L2NvZGU+KSwgbm90IHRvXG5cdCAqIHRoZSBjaGFyYWN0ZXIgaW5kZXggcGFzc2VkIGluLlxuXHQgKiBcblx0ICogQHBhcmFtIGNoYXJJbmRleCBUaGUgemVyby1iYXNlZCBpbmRleCB2YWx1ZSBvZiB0aGUgY2hhcmFjdGVyKGZvciBleGFtcGxlLFxuXHQgKiAgICAgICAgICAgICAgICAgIHRoZSBmaXJzdCBjaGFyYWN0ZXIgaXMgMCwgdGhlIHNlY29uZCBjaGFyYWN0ZXIgaXMgMSwgYW5kXG5cdCAqICAgICAgICAgICAgICAgICAgc28gb24pLlxuXHQgKiBAcmV0dXJuIFJldHVybnMgdGhlIG51bWJlciBvZiBjaGFyYWN0ZXJzIGluIHRoZSBwYXJhZ3JhcGguXG5cdCAqIEB0aHJvd3MgUmFuZ2VFcnJvciBUaGUgY2hhcmFjdGVyIGluZGV4IHNwZWNpZmllZCBpcyBvdXQgb2YgcmFuZ2UuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0UGFyYWdyYXBoTGVuZ3RoKGNoYXJJbmRleDpudW1iZXIgLyppbnQqLyk6bnVtYmVyIC8qaW50Ki9cblx0e1xuXHRcdHJldHVybiB0aGlzLl9wYXJhZ3JhcGhMZW5ndGg7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBhIFRleHRGb3JtYXQgb2JqZWN0IHRoYXQgY29udGFpbnMgZm9ybWF0dGluZyBpbmZvcm1hdGlvbiBmb3IgdGhlXG5cdCAqIHJhbmdlIG9mIHRleHQgdGhhdCB0aGUgPGNvZGU+YmVnaW5JbmRleDwvY29kZT4gYW5kIDxjb2RlPmVuZEluZGV4PC9jb2RlPlxuXHQgKiBwYXJhbWV0ZXJzIHNwZWNpZnkuIE9ubHkgcHJvcGVydGllcyB0aGF0IGFyZSBjb21tb24gdG8gdGhlIGVudGlyZSB0ZXh0XG5cdCAqIHNwZWNpZmllZCBhcmUgc2V0IGluIHRoZSByZXN1bHRpbmcgVGV4dEZvcm1hdCBvYmplY3QuIEFueSBwcm9wZXJ0eSB0aGF0IGlzXG5cdCAqIDxpPm1peGVkPC9pPiwgbWVhbmluZyB0aGF0IGl0IGhhcyBkaWZmZXJlbnQgdmFsdWVzIGF0IGRpZmZlcmVudCBwb2ludHMgaW5cblx0ICogdGhlIHRleHQsIGhhcyBhIHZhbHVlIG9mIDxjb2RlPm51bGw8L2NvZGU+LlxuXHQgKlxuXHQgKiA8cD5JZiB5b3UgZG8gbm90IHNwZWNpZnkgdmFsdWVzIGZvciB0aGVzZSBwYXJhbWV0ZXJzLCB0aGlzIG1ldGhvZCBpc1xuXHQgKiBhcHBsaWVkIHRvIGFsbCB0aGUgdGV4dCBpbiB0aGUgdGV4dCBmaWVsZC4gPC9wPlxuXHQgKlxuXHQgKiA8cD5UaGUgZm9sbG93aW5nIHRhYmxlIGRlc2NyaWJlcyB0aHJlZSBwb3NzaWJsZSB1c2FnZXM6PC9wPlxuXHQgKiBcblx0ICogQHJldHVybiBUaGUgVGV4dEZvcm1hdCBvYmplY3QgdGhhdCByZXByZXNlbnRzIHRoZSBmb3JtYXR0aW5nIHByb3BlcnRpZXNcblx0ICogICAgICAgICBmb3IgdGhlIHNwZWNpZmllZCB0ZXh0LlxuXHQgKiBAdGhyb3dzIFJhbmdlRXJyb3IgVGhlIDxjb2RlPmJlZ2luSW5kZXg8L2NvZGU+IG9yIDxjb2RlPmVuZEluZGV4PC9jb2RlPlxuXHQgKiAgICAgICAgICAgICAgICAgICAgc3BlY2lmaWVkIGlzIG91dCBvZiByYW5nZS5cblx0ICovXG5cdHB1YmxpYyBnZXRUZXh0Rm9ybWF0KGJlZ2luSW5kZXg6bnVtYmVyIC8qaW50Ki8gPSAtMSwgZW5kSW5kZXg6bnVtYmVyIC8qaW50Ki8gPSAtMSk6VGV4dEZvcm1hdFxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3RleHRGb3JtYXQ7XG5cdH1cblxuXHQvKipcblx0ICogUmVwbGFjZXMgdGhlIGN1cnJlbnQgc2VsZWN0aW9uIHdpdGggdGhlIGNvbnRlbnRzIG9mIHRoZSA8Y29kZT52YWx1ZTwvY29kZT5cblx0ICogcGFyYW1ldGVyLiBUaGUgdGV4dCBpcyBpbnNlcnRlZCBhdCB0aGUgcG9zaXRpb24gb2YgdGhlIGN1cnJlbnQgc2VsZWN0aW9uLFxuXHQgKiB1c2luZyB0aGUgY3VycmVudCBkZWZhdWx0IGNoYXJhY3RlciBmb3JtYXQgYW5kIGRlZmF1bHQgcGFyYWdyYXBoIGZvcm1hdC5cblx0ICogVGhlIHRleHQgaXMgbm90IHRyZWF0ZWQgYXMgSFRNTC5cblx0ICpcblx0ICogPHA+WW91IGNhbiB1c2UgdGhlIDxjb2RlPnJlcGxhY2VTZWxlY3RlZFRleHQoKTwvY29kZT4gbWV0aG9kIHRvIGluc2VydCBhbmRcblx0ICogZGVsZXRlIHRleHQgd2l0aG91dCBkaXNydXB0aW5nIHRoZSBjaGFyYWN0ZXIgYW5kIHBhcmFncmFwaCBmb3JtYXR0aW5nIG9mXG5cdCAqIHRoZSByZXN0IG9mIHRoZSB0ZXh0LjwvcD5cblx0ICpcblx0ICogPHA+PGI+Tm90ZTo8L2I+IFRoaXMgbWV0aG9kIGRvZXMgbm90IHdvcmsgaWYgYSBzdHlsZSBzaGVldCBpcyBhcHBsaWVkIHRvXG5cdCAqIHRoZSB0ZXh0IGZpZWxkLjwvcD5cblx0ICogXG5cdCAqIEBwYXJhbSB2YWx1ZSBUaGUgc3RyaW5nIHRvIHJlcGxhY2UgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCB0ZXh0LlxuXHQgKiBAdGhyb3dzIEVycm9yIFRoaXMgbWV0aG9kIGNhbm5vdCBiZSB1c2VkIG9uIGEgdGV4dCBmaWVsZCB3aXRoIGEgc3R5bGVcblx0ICogICAgICAgICAgICAgICBzaGVldC5cblx0ICovXG5cdHB1YmxpYyByZXBsYWNlU2VsZWN0ZWRUZXh0KHZhbHVlOnN0cmluZylcblx0e1xuXG5cdH1cblxuXHQvKipcblx0ICogUmVwbGFjZXMgdGhlIHJhbmdlIG9mIGNoYXJhY3RlcnMgdGhhdCB0aGUgPGNvZGU+YmVnaW5JbmRleDwvY29kZT4gYW5kXG5cdCAqIDxjb2RlPmVuZEluZGV4PC9jb2RlPiBwYXJhbWV0ZXJzIHNwZWNpZnkgd2l0aCB0aGUgY29udGVudHMgb2YgdGhlXG5cdCAqIDxjb2RlPm5ld1RleHQ8L2NvZGU+IHBhcmFtZXRlci4gQXMgZGVzaWduZWQsIHRoZSB0ZXh0IGZyb21cblx0ICogPGNvZGU+YmVnaW5JbmRleDwvY29kZT4gdG8gPGNvZGU+ZW5kSW5kZXgtMTwvY29kZT4gaXMgcmVwbGFjZWQuXG5cdCAqXG5cdCAqIDxwPjxiPk5vdGU6PC9iPiBUaGlzIG1ldGhvZCBkb2VzIG5vdCB3b3JrIGlmIGEgc3R5bGUgc2hlZXQgaXMgYXBwbGllZCB0b1xuXHQgKiB0aGUgdGV4dCBmaWVsZC48L3A+XG5cdCAqIFxuXHQgKiBAcGFyYW0gYmVnaW5JbmRleCBUaGUgemVyby1iYXNlZCBpbmRleCB2YWx1ZSBmb3IgdGhlIHN0YXJ0IHBvc2l0aW9uIG9mIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICByZXBsYWNlbWVudCByYW5nZS5cblx0ICogQHBhcmFtIGVuZEluZGV4ICAgVGhlIHplcm8tYmFzZWQgaW5kZXggcG9zaXRpb24gb2YgdGhlIGZpcnN0IGNoYXJhY3RlclxuXHQgKiAgICAgICAgICAgICAgICAgICBhZnRlciB0aGUgZGVzaXJlZCB0ZXh0IHNwYW4uXG5cdCAqIEBwYXJhbSBuZXdUZXh0ICAgIFRoZSB0ZXh0IHRvIHVzZSB0byByZXBsYWNlIHRoZSBzcGVjaWZpZWQgcmFuZ2Ugb2Zcblx0ICogICAgICAgICAgICAgICAgICAgY2hhcmFjdGVycy5cblx0ICogQHRocm93cyBFcnJvciBUaGlzIG1ldGhvZCBjYW5ub3QgYmUgdXNlZCBvbiBhIHRleHQgZmllbGQgd2l0aCBhIHN0eWxlXG5cdCAqICAgICAgICAgICAgICAgc2hlZXQuXG5cdCAqL1xuXHRwdWJsaWMgcmVwbGFjZVRleHQoYmVnaW5JbmRleDpudW1iZXIgLyppbnQqLywgZW5kSW5kZXg6bnVtYmVyIC8qaW50Ki8sIG5ld1RleHQ6c3RyaW5nKVxuXHR7XG5cblx0fVxuXG5cdC8qKlxuXHQgKiBTZXRzIGFzIHNlbGVjdGVkIHRoZSB0ZXh0IGRlc2lnbmF0ZWQgYnkgdGhlIGluZGV4IHZhbHVlcyBvZiB0aGUgZmlyc3QgYW5kXG5cdCAqIGxhc3QgY2hhcmFjdGVycywgd2hpY2ggYXJlIHNwZWNpZmllZCB3aXRoIHRoZSA8Y29kZT5iZWdpbkluZGV4PC9jb2RlPiBhbmRcblx0ICogPGNvZGU+ZW5kSW5kZXg8L2NvZGU+IHBhcmFtZXRlcnMuIElmIHRoZSB0d28gcGFyYW1ldGVyIHZhbHVlcyBhcmUgdGhlXG5cdCAqIHNhbWUsIHRoaXMgbWV0aG9kIHNldHMgdGhlIGluc2VydGlvbiBwb2ludCwgYXMgaWYgeW91IHNldCB0aGVcblx0ICogPGNvZGU+Y2FyZXRJbmRleDwvY29kZT4gcHJvcGVydHkuXG5cdCAqIFxuXHQgKiBAcGFyYW0gYmVnaW5JbmRleCBUaGUgemVyby1iYXNlZCBpbmRleCB2YWx1ZSBvZiB0aGUgZmlyc3QgY2hhcmFjdGVyIGluIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb24oZm9yIGV4YW1wbGUsIHRoZSBmaXJzdCBjaGFyYWN0ZXIgaXMgMCwgdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgIHNlY29uZCBjaGFyYWN0ZXIgaXMgMSwgYW5kIHNvIG9uKS5cblx0ICogQHBhcmFtIGVuZEluZGV4ICAgVGhlIHplcm8tYmFzZWQgaW5kZXggdmFsdWUgb2YgdGhlIGxhc3QgY2hhcmFjdGVyIGluIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb24uXG5cdCAqL1xuXHRwdWJsaWMgc2V0U2VsZWN0aW9uKGJlZ2luSW5kZXg6bnVtYmVyIC8qaW50Ki8sIGVuZEluZGV4Om51bWJlciAvKmludCovKVxuXHR7XG5cblx0fVxuXG5cdC8qKlxuXHQgKiBBcHBsaWVzIHRoZSB0ZXh0IGZvcm1hdHRpbmcgdGhhdCB0aGUgPGNvZGU+Zm9ybWF0PC9jb2RlPiBwYXJhbWV0ZXJcblx0ICogc3BlY2lmaWVzIHRvIHRoZSBzcGVjaWZpZWQgdGV4dCBpbiBhIHRleHQgZmllbGQuIFRoZSB2YWx1ZSBvZlxuXHQgKiA8Y29kZT5mb3JtYXQ8L2NvZGU+IG11c3QgYmUgYSBUZXh0Rm9ybWF0IG9iamVjdCB0aGF0IHNwZWNpZmllcyB0aGUgZGVzaXJlZFxuXHQgKiB0ZXh0IGZvcm1hdHRpbmcgY2hhbmdlcy4gT25seSB0aGUgbm9uLW51bGwgcHJvcGVydGllcyBvZlxuXHQgKiA8Y29kZT5mb3JtYXQ8L2NvZGU+IGFyZSBhcHBsaWVkIHRvIHRoZSB0ZXh0IGZpZWxkLiBBbnkgcHJvcGVydHkgb2Zcblx0ICogPGNvZGU+Zm9ybWF0PC9jb2RlPiB0aGF0IGlzIHNldCB0byA8Y29kZT5udWxsPC9jb2RlPiBpcyBub3QgYXBwbGllZC4gQnlcblx0ICogZGVmYXVsdCwgYWxsIG9mIHRoZSBwcm9wZXJ0aWVzIG9mIGEgbmV3bHkgY3JlYXRlZCBUZXh0Rm9ybWF0IG9iamVjdCBhcmVcblx0ICogc2V0IHRvIDxjb2RlPm51bGw8L2NvZGU+LlxuXHQgKlxuXHQgKiA8cD48Yj5Ob3RlOjwvYj4gVGhpcyBtZXRob2QgZG9lcyBub3Qgd29yayBpZiBhIHN0eWxlIHNoZWV0IGlzIGFwcGxpZWQgdG9cblx0ICogdGhlIHRleHQgZmllbGQuPC9wPlxuXHQgKlxuXHQgKiA8cD5UaGUgPGNvZGU+c2V0VGV4dEZvcm1hdCgpPC9jb2RlPiBtZXRob2QgY2hhbmdlcyB0aGUgdGV4dCBmb3JtYXR0aW5nXG5cdCAqIGFwcGxpZWQgdG8gYSByYW5nZSBvZiBjaGFyYWN0ZXJzIG9yIHRvIHRoZSBlbnRpcmUgYm9keSBvZiB0ZXh0IGluIGEgdGV4dFxuXHQgKiBmaWVsZC4gVG8gYXBwbHkgdGhlIHByb3BlcnRpZXMgb2YgZm9ybWF0IHRvIGFsbCB0ZXh0IGluIHRoZSB0ZXh0IGZpZWxkLCBkb1xuXHQgKiBub3Qgc3BlY2lmeSB2YWx1ZXMgZm9yIDxjb2RlPmJlZ2luSW5kZXg8L2NvZGU+IGFuZCA8Y29kZT5lbmRJbmRleDwvY29kZT4uXG5cdCAqIFRvIGFwcGx5IHRoZSBwcm9wZXJ0aWVzIG9mIHRoZSBmb3JtYXQgdG8gYSByYW5nZSBvZiB0ZXh0LCBzcGVjaWZ5IHZhbHVlc1xuXHQgKiBmb3IgdGhlIDxjb2RlPmJlZ2luSW5kZXg8L2NvZGU+IGFuZCB0aGUgPGNvZGU+ZW5kSW5kZXg8L2NvZGU+IHBhcmFtZXRlcnMuXG5cdCAqIFlvdSBjYW4gdXNlIHRoZSA8Y29kZT5sZW5ndGg8L2NvZGU+IHByb3BlcnR5IHRvIGRldGVybWluZSB0aGUgaW5kZXhcblx0ICogdmFsdWVzLjwvcD5cblx0ICpcblx0ICogPHA+VGhlIHR3byB0eXBlcyBvZiBmb3JtYXR0aW5nIGluZm9ybWF0aW9uIGluIGEgVGV4dEZvcm1hdCBvYmplY3QgYXJlXG5cdCAqIGNoYXJhY3RlciBsZXZlbCBmb3JtYXR0aW5nIGFuZCBwYXJhZ3JhcGggbGV2ZWwgZm9ybWF0dGluZy4gRWFjaCBjaGFyYWN0ZXJcblx0ICogaW4gYSB0ZXh0IGZpZWxkIGNhbiBoYXZlIGl0cyBvd24gY2hhcmFjdGVyIGZvcm1hdHRpbmcgc2V0dGluZ3MsIHN1Y2ggYXNcblx0ICogZm9udCBuYW1lLCBmb250IHNpemUsIGJvbGQsIGFuZCBpdGFsaWMuPC9wPlxuXHQgKlxuXHQgKiA8cD5Gb3IgcGFyYWdyYXBocywgdGhlIGZpcnN0IGNoYXJhY3RlciBvZiB0aGUgcGFyYWdyYXBoIGlzIGV4YW1pbmVkIGZvclxuXHQgKiB0aGUgcGFyYWdyYXBoIGZvcm1hdHRpbmcgc2V0dGluZ3MgZm9yIHRoZSBlbnRpcmUgcGFyYWdyYXBoLiBFeGFtcGxlcyBvZlxuXHQgKiBwYXJhZ3JhcGggZm9ybWF0dGluZyBzZXR0aW5ncyBhcmUgbGVmdCBtYXJnaW4sIHJpZ2h0IG1hcmdpbiwgYW5kXG5cdCAqIGluZGVudGF0aW9uLjwvcD5cblx0ICpcblx0ICogPHA+QW55IHRleHQgaW5zZXJ0ZWQgbWFudWFsbHkgYnkgdGhlIHVzZXIsIG9yIHJlcGxhY2VkIGJ5IHRoZVxuXHQgKiA8Y29kZT5yZXBsYWNlU2VsZWN0ZWRUZXh0KCk8L2NvZGU+IG1ldGhvZCwgcmVjZWl2ZXMgdGhlIGRlZmF1bHQgdGV4dCBmaWVsZFxuXHQgKiBmb3JtYXR0aW5nIGZvciBuZXcgdGV4dCwgYW5kIG5vdCB0aGUgZm9ybWF0dGluZyBzcGVjaWZpZWQgZm9yIHRoZSB0ZXh0XG5cdCAqIGluc2VydGlvbiBwb2ludC4gVG8gc2V0IHRoZSBkZWZhdWx0IGZvcm1hdHRpbmcgZm9yIG5ldyB0ZXh0LCB1c2Vcblx0ICogPGNvZGU+ZGVmYXVsdFRleHRGb3JtYXQ8L2NvZGU+LjwvcD5cblx0ICogXG5cdCAqIEBwYXJhbSBmb3JtYXQgQSBUZXh0Rm9ybWF0IG9iamVjdCB0aGF0IGNvbnRhaW5zIGNoYXJhY3RlciBhbmQgcGFyYWdyYXBoXG5cdCAqICAgICAgICAgICAgICAgZm9ybWF0dGluZyBpbmZvcm1hdGlvbi5cblx0ICogQHRocm93cyBFcnJvciAgICAgIFRoaXMgbWV0aG9kIGNhbm5vdCBiZSB1c2VkIG9uIGEgdGV4dCBmaWVsZCB3aXRoIGEgc3R5bGVcblx0ICogICAgICAgICAgICAgICAgICAgIHNoZWV0LlxuXHQgKiBAdGhyb3dzIFJhbmdlRXJyb3IgVGhlIDxjb2RlPmJlZ2luSW5kZXg8L2NvZGU+IG9yIDxjb2RlPmVuZEluZGV4PC9jb2RlPlxuXHQgKiAgICAgICAgICAgICAgICAgICAgc3BlY2lmaWVkIGlzIG91dCBvZiByYW5nZS5cblx0ICovXG5cdHB1YmxpYyBzZXRUZXh0Rm9ybWF0KGZvcm1hdDpUZXh0Rm9ybWF0LCBiZWdpbkluZGV4Om51bWJlciAvKmludCovID0gLTEsIGVuZEluZGV4Om51bWJlciAvKmludCovID0gLTEpXG5cdHtcblxuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdHJ1ZSBpZiBhbiBlbWJlZGRlZCBmb250IGlzIGF2YWlsYWJsZSB3aXRoIHRoZSBzcGVjaWZpZWRcblx0ICogPGNvZGU+Zm9udE5hbWU8L2NvZGU+IGFuZCA8Y29kZT5mb250U3R5bGU8L2NvZGU+IHdoZXJlXG5cdCAqIDxjb2RlPkZvbnQuZm9udFR5cGU8L2NvZGU+IGlzIDxjb2RlPmZsYXNoLnRleHQuRm9udFR5cGUuRU1CRURERUQ8L2NvZGU+LlxuXHQgKiBTdGFydGluZyB3aXRoIEZsYXNoIFBsYXllciAxMCwgdHdvIGtpbmRzIG9mIGVtYmVkZGVkIGZvbnRzIGNhbiBhcHBlYXIgaW4gYVxuXHQgKiBTV0YgZmlsZS4gTm9ybWFsIGVtYmVkZGVkIGZvbnRzIGFyZSBvbmx5IHVzZWQgd2l0aCBUZXh0RmllbGQgb2JqZWN0cy4gQ0ZGXG5cdCAqIGVtYmVkZGVkIGZvbnRzIGFyZSBvbmx5IHVzZWQgd2l0aCB0aGUgZmxhc2gudGV4dC5lbmdpbmUgY2xhc3Nlcy4gVGhlIHR3b1xuXHQgKiB0eXBlcyBhcmUgZGlzdGluZ3Vpc2hlZCBieSB0aGUgPGNvZGU+Zm9udFR5cGU8L2NvZGU+IHByb3BlcnR5IG9mIHRoZVxuXHQgKiA8Y29kZT5Gb250PC9jb2RlPiBjbGFzcywgYXMgcmV0dXJuZWQgYnkgdGhlIDxjb2RlPmVudW1lcmF0ZUZvbnRzKCk8L2NvZGU+XG5cdCAqIGZ1bmN0aW9uLlxuXHQgKlxuXHQgKiA8cD5UZXh0RmllbGQgY2Fubm90IHVzZSBhIGZvbnQgb2YgdHlwZSA8Y29kZT5FTUJFRERFRF9DRkY8L2NvZGU+LiBJZlxuXHQgKiA8Y29kZT5lbWJlZEZvbnRzPC9jb2RlPiBpcyBzZXQgdG8gPGNvZGU+dHJ1ZTwvY29kZT4gYW5kIHRoZSBvbmx5IGZvbnRcblx0ICogYXZhaWxhYmxlIGF0IHJ1biB0aW1lIHdpdGggdGhlIHNwZWNpZmllZCBuYW1lIGFuZCBzdHlsZSBpcyBvZiB0eXBlXG5cdCAqIDxjb2RlPkVNQkVEREVEX0NGRjwvY29kZT4sIEZsYXNoIFBsYXllciBmYWlscyB0byByZW5kZXIgdGhlIHRleHQsIGFzIGlmIG5vXG5cdCAqIGVtYmVkZGVkIGZvbnQgd2VyZSBhdmFpbGFibGUgd2l0aCB0aGUgc3BlY2lmaWVkIG5hbWUgYW5kIHN0eWxlLjwvcD5cblx0ICpcblx0ICogPHA+SWYgYm90aCA8Y29kZT5FTUJFRERFRDwvY29kZT4gYW5kIDxjb2RlPkVNQkVEREVEX0NGRjwvY29kZT4gZm9udHMgYXJlXG5cdCAqIGF2YWlsYWJsZSB3aXRoIHRoZSBzYW1lIG5hbWUgYW5kIHN0eWxlLCB0aGUgPGNvZGU+RU1CRURERUQ8L2NvZGU+IGZvbnQgaXNcblx0ICogc2VsZWN0ZWQgYW5kIHRleHQgcmVuZGVycyB3aXRoIHRoZSA8Y29kZT5FTUJFRERFRDwvY29kZT4gZm9udC48L3A+XG5cdCAqIFxuXHQgKiBAcGFyYW0gZm9udE5hbWUgIFRoZSBuYW1lIG9mIHRoZSBlbWJlZGRlZCBmb250IHRvIGNoZWNrLlxuXHQgKiBAcGFyYW0gZm9udFN0eWxlIFNwZWNpZmllcyB0aGUgZm9udCBzdHlsZSB0byBjaGVjay4gVXNlXG5cdCAqICAgICAgICAgICAgICAgICAgPGNvZGU+Zmxhc2gudGV4dC5Gb250U3R5bGU8L2NvZGU+XG5cdCAqIEByZXR1cm4gPGNvZGU+dHJ1ZTwvY29kZT4gaWYgYSBjb21wYXRpYmxlIGVtYmVkZGVkIGZvbnQgaXMgYXZhaWxhYmxlLFxuXHQgKiAgICAgICAgIG90aGVyd2lzZSA8Y29kZT5mYWxzZTwvY29kZT4uXG5cdCAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciBUaGUgPGNvZGU+Zm9udFN0eWxlPC9jb2RlPiBzcGVjaWZpZWQgaXMgbm90IGEgbWVtYmVyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBvZiA8Y29kZT5mbGFzaC50ZXh0LkZvbnRTdHlsZTwvY29kZT4uXG5cdCAqL1xuXHRwdWJsaWMgc3RhdGljIGlzRm9udENvbXBhdGlibGUoZm9udE5hbWU6c3RyaW5nLCBmb250U3R5bGU6c3RyaW5nKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxuZXhwb3J0ID0gVGV4dEZpZWxkOyJdfQ==