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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9UZXh0RmllbGQudHMiXSwibmFtZXMiOlsiVGV4dEZpZWxkIiwiVGV4dEZpZWxkLmNvbnN0cnVjdG9yIiwiVGV4dEZpZWxkLmFzc2V0VHlwZSIsIlRleHRGaWVsZC5ib3R0b21TY3JvbGxWIiwiVGV4dEZpZWxkLmNhcmV0SW5kZXgiLCJUZXh0RmllbGQubGVuZ3RoIiwiVGV4dEZpZWxkLm1heFNjcm9sbEgiLCJUZXh0RmllbGQubWF4U2Nyb2xsViIsIlRleHRGaWVsZC5udW1MaW5lcyIsIlRleHRGaWVsZC5zZWxlY3Rpb25CZWdpbkluZGV4IiwiVGV4dEZpZWxkLnNlbGVjdGlvbkVuZEluZGV4IiwiVGV4dEZpZWxkLnRleHQiLCJUZXh0RmllbGQudGV4dEZvcm1hdCIsIlRleHRGaWVsZC50ZXh0SGVpZ2h0IiwiVGV4dEZpZWxkLnRleHRJbnRlcmFjdGlvbk1vZGUiLCJUZXh0RmllbGQudGV4dFdpZHRoIiwiVGV4dEZpZWxkLnJlQ29uc3RydWN0IiwiVGV4dEZpZWxkLmFwcGVuZFRleHQiLCJUZXh0RmllbGQuY2xvc2VQYXJhZ3JhcGgiLCJUZXh0RmllbGQuZ2V0Q2hhckJvdW5kYXJpZXMiLCJUZXh0RmllbGQuZ2V0Q2hhckluZGV4QXRQb2ludCIsIlRleHRGaWVsZC5nZXRGaXJzdENoYXJJblBhcmFncmFwaCIsIlRleHRGaWVsZC5nZXRJbWFnZVJlZmVyZW5jZSIsIlRleHRGaWVsZC5nZXRMaW5lSW5kZXhBdFBvaW50IiwiVGV4dEZpZWxkLmdldExpbmVJbmRleE9mQ2hhciIsIlRleHRGaWVsZC5nZXRMaW5lTGVuZ3RoIiwiVGV4dEZpZWxkLmdldExpbmVNZXRyaWNzIiwiVGV4dEZpZWxkLmdldExpbmVPZmZzZXQiLCJUZXh0RmllbGQuZ2V0TGluZVRleHQiLCJUZXh0RmllbGQuZ2V0UGFyYWdyYXBoTGVuZ3RoIiwiVGV4dEZpZWxkLmdldFRleHRGb3JtYXQiLCJUZXh0RmllbGQucmVwbGFjZVNlbGVjdGVkVGV4dCIsIlRleHRGaWVsZC5yZXBsYWNlVGV4dCIsIlRleHRGaWVsZC5zZXRTZWxlY3Rpb24iLCJUZXh0RmllbGQuc2V0VGV4dEZvcm1hdCIsIlRleHRGaWVsZC5pc0ZvbnRDb21wYXRpYmxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFZQSxJQUFPLElBQUksV0FBaUIsa0NBQWtDLENBQUMsQ0FBQztBQUNoRSxJQUFPLFFBQVEsV0FBZ0IsK0JBQStCLENBQUMsQ0FBQztBQUVoRSxJQUFPLGdCQUFnQixXQUFjLHVDQUF1QyxDQUFDLENBQUM7QUFHOUUsQUErRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQURHO0lBQ0csU0FBUztJQUFTQSxVQUFsQkEsU0FBU0EsVUFBYUE7SUFxbUIzQkE7Ozs7Ozs7T0FPR0E7SUFDSEEsU0E3bUJLQSxTQUFTQTtRQSttQmJDLGtCQUFNQSxJQUFJQSxRQUFRQSxFQUFFQSxDQUFDQSxDQUFDQTtRQW5tQmZBLFVBQUtBLEdBQVVBLEVBQUVBLENBQUNBO0lBb21CMUJBLENBQUNBO0lBN2dCREQsc0JBQVdBLGdDQUFTQTtRQUpwQkE7OztXQUdHQTthQUNIQTtZQUVDRSxNQUFNQSxDQUFDQSxTQUFTQSxDQUFDQSxTQUFTQSxDQUFDQTtRQUM1QkEsQ0FBQ0E7OztPQUFBRjtJQWdEREEsc0JBQVdBLG9DQUFhQTtRQVR4QkE7Ozs7Ozs7O1dBUUdBO2FBQ0hBO1lBRUNHLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLGNBQWNBLENBQUNBO1FBQzVCQSxDQUFDQTs7O09BQUFIO0lBV0RBLHNCQUFXQSxpQ0FBVUE7UUFUckJBOzs7Ozs7OztXQVFHQTthQUNIQTtZQUVDSSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQTtRQUN6QkEsQ0FBQ0E7OztPQUFBSjtJQTJHREEsc0JBQVdBLDZCQUFNQTtRQUpqQkE7OztXQUdHQTthQUNIQTtZQUVDSyxNQUFNQSxDQUFDQSxJQUFJQSxD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MUJBLE1BQU1BLENBQUNBO1FBQ1JBLENBQUNBO1FBQ0RBLEVBQUVBLENBQUFBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLElBQUVBLEVBQUVBLENBQUNBLENBQUFBLENBQUNBO1lBQ2xCQSxNQUFNQSxDQUFDQTtRQUNSQSxDQUFDQTtRQUNEQSxJQUFJQSxPQUFPQSxHQUFpQkEsSUFBSUEsS0FBS0EsRUFBVUEsQ0FBQ0E7UUFDaERBLElBQUlBLFNBQVNBLEdBQWlCQSxJQUFJQSxLQUFLQSxFQUFVQSxDQUFDQTtRQUNsREEsSUFBSUEsU0FBU0EsR0FBaUJBLElBQUlBLEtBQUtBLEVBQVVBLENBQUNBO1FBQ2xEQSxJQUFJQSxHQUFHQSxHQUFpQkEsSUFBSUEsS0FBS0EsRUFBVUEsQ0FBQ0E7UUFFNUNBLElBQUlBLFVBQVVBLEdBQVFBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLElBQUlBLEdBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLFVBQVVBLENBQUNBLGdCQUFnQkEsRUFBRUEsQ0FBQ0E7UUFDM0ZBLElBQUlBLGNBQWNBLEdBQVFBLENBQUNBLENBQUNBO1FBQzVCQSxJQUFJQSxPQUFPQSxHQUFRQSxDQUFDQSxDQUFDQTtRQUNyQkEsSUFBSUEsUUFBUUEsR0FBUUEsQ0FBQ0EsQ0FBQ0E7UUFDdEJBLElBQUlBLFFBQVFBLEdBQVFBLENBQUNBLENBQUNBO1FBQ3RCQSxJQUFJQSxTQUFTQSxHQUFzQkEsSUFBSUEsQ0FBQ0E7UUFDeENBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBLEVBQUVBLEVBQUVBLENBQUNBO1lBRTNDQSxJQUFJQSxTQUFTQSxHQUEyQ0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxRQUFR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emlDdUIsSUFBSSxFQXlpQzNCO0FBRUQsQUFBbUIsaUJBQVYsU0FBUyxDQUFDIiwiZmlsZSI6ImVudGl0aWVzL1RleHRGaWVsZC5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTWF0cml4M0RcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9NYXRyaXgzRFwiKTtcclxuaW1wb3J0IFJlY3RhbmdsZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9SZWN0YW5nbGVcIik7XHJcbmltcG9ydCBWZWN0b3IzRFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1ZlY3RvcjNEXCIpO1xyXG5cclxuaW1wb3J0IERpc3BsYXlPYmplY3RcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0Rpc3BsYXlPYmplY3RcIik7XHJcbmltcG9ydCBBbnRpQWxpYXNUeXBlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvdGV4dC9BbnRpQWxpYXNUeXBlXCIpO1xyXG5pbXBvcnQgR3JpZEZpdFR5cGVcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3RleHQvR3JpZEZpdFR5cGVcIik7XHJcbmltcG9ydCBUZXh0RmllbGRBdXRvU2l6ZVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi90ZXh0L1RleHRGaWVsZEF1dG9TaXplXCIpO1xyXG5pbXBvcnQgVGV4dEZpZWxkVHlwZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3RleHQvVGV4dEZpZWxkVHlwZVwiKTtcclxuaW1wb3J0IFRleHRGb3JtYXRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3RleHQvVGV4dEZvcm1hdFwiKTtcclxuaW1wb3J0IFRleHRJbnRlcmFjdGlvbk1vZGVcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvdGV4dC9UZXh0SW50ZXJhY3Rpb25Nb2RlXCIpO1xyXG5pbXBvcnQgVGV4dExpbmVNZXRyaWNzXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvdGV4dC9UZXh0TGluZU1ldHJpY3NcIik7XHJcbmltcG9ydCBNZXNoXHRcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZW50aXRpZXMvTWVzaFwiKTtcclxuaW1wb3J0IEdlb21ldHJ5XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2RhdGEvR2VvbWV0cnlcIik7XHJcbmltcG9ydCBTdWJHZW9tZXRyeUJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9kYXRhL1N1Ykdlb21ldHJ5QmFzZVwiKTtcclxuaW1wb3J0IEN1cnZlU3ViR2VvbWV0cnlcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9kYXRhL0N1cnZlU3ViR2VvbWV0cnlcIik7XHJcbmltcG9ydCBUZXNzZWxhdGVkRm9udENoYXJcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvdGV4dC9UZXNzZWxhdGVkRm9udENoYXJcIik7XHJcblxyXG4vKipcclxuICogVGhlIFRleHRGaWVsZCBjbGFzcyBpcyB1c2VkIHRvIGNyZWF0ZSBkaXNwbGF5IG9iamVjdHMgZm9yIHRleHQgZGlzcGxheSBhbmRcclxuICogaW5wdXQuIDxwaCBvdXRwdXRjbGFzcz1cImZsZXhvbmx5XCI+WW91IGNhbiB1c2UgdGhlIFRleHRGaWVsZCBjbGFzcyB0b1xyXG4gKiBwZXJmb3JtIGxvdy1sZXZlbCB0ZXh0IHJlbmRlcmluZy4gSG93ZXZlciwgaW4gRmxleCwgeW91IHR5cGljYWxseSB1c2UgdGhlXHJcbiAqIExhYmVsLCBUZXh0LCBUZXh0QXJlYSwgYW5kIFRleHRJbnB1dCBjb250cm9scyB0byBwcm9jZXNzIHRleHQuIDxwaFxyXG4gKiBvdXRwdXRjbGFzcz1cImZsYXNob25seVwiPllvdSBjYW4gZ2l2ZSBhIHRleHQgZmllbGQgYW4gaW5zdGFuY2UgbmFtZSBpbiB0aGVcclxuICogUHJvcGVydHkgaW5zcGVjdG9yIGFuZCB1c2UgdGhlIG1ldGhvZHMgYW5kIHByb3BlcnRpZXMgb2YgdGhlIFRleHRGaWVsZFxyXG4gKiBjbGFzcyB0byBtYW5pcHVsYXRlIGl0IHdpdGggQWN0aW9uU2NyaXB0LiBUZXh0RmllbGQgaW5zdGFuY2UgbmFtZXMgYXJlXHJcbiAqIGRpc3BsYXllZCBpbiB0aGUgTW92aWUgRXhwbG9yZXIgYW5kIGluIHRoZSBJbnNlcnQgVGFyZ2V0IFBhdGggZGlhbG9nIGJveCBpblxyXG4gKiB0aGUgQWN0aW9ucyBwYW5lbC5cclxuICpcclxuICogPHA+VG8gY3JlYXRlIGEgdGV4dCBmaWVsZCBkeW5hbWljYWxseSwgdXNlIHRoZSA8Y29kZT5UZXh0RmllbGQoKTwvY29kZT5cclxuICogY29uc3RydWN0b3IuPC9wPlxyXG4gKlxyXG4gKiA8cD5UaGUgbWV0aG9kcyBvZiB0aGUgVGV4dEZpZWxkIGNsYXNzIGxldCB5b3Ugc2V0LCBzZWxlY3QsIGFuZCBtYW5pcHVsYXRlXHJcbiAqIHRleHQgaW4gYSBkeW5hbWljIG9yIGlucHV0IHRleHQgZmllbGQgdGhhdCB5b3UgY3JlYXRlIGR1cmluZyBhdXRob3Jpbmcgb3JcclxuICogYXQgcnVudGltZS4gPC9wPlxyXG4gKlxyXG4gKiA8cD5BY3Rpb25TY3JpcHQgcHJvdmlkZXMgc2V2ZXJhbCB3YXlzIHRvIGZvcm1hdCB5b3VyIHRleHQgYXQgcnVudGltZS4gVGhlXHJcbiAqIFRleHRGb3JtYXQgY2xhc3MgbGV0cyB5b3Ugc2V0IGNoYXJhY3RlciBhbmQgcGFyYWdyYXBoIGZvcm1hdHRpbmcgZm9yXHJcbiAqIFRleHRGaWVsZCBvYmplY3RzLiBZb3UgY2FuIGFwcGx5IENhc2NhZGluZyBTdHlsZSBTaGVldHMoQ1NTKSBzdHlsZXMgdG9cclxuICogdGV4dCBmaWVsZHMgYnkgdXNpbmcgdGhlIDxjb2RlPlRleHRGaWVsZC5zdHlsZVNoZWV0PC9jb2RlPiBwcm9wZXJ0eSBhbmQgdGhlXHJcbiAqIFN0eWxlU2hlZXQgY2xhc3MuIFlvdSBjYW4gdXNlIENTUyB0byBzdHlsZSBidWlsdC1pbiBIVE1MIHRhZ3MsIGRlZmluZSBuZXdcclxuICogZm9ybWF0dGluZyB0YWdzLCBvciBhcHBseSBzdHlsZXMuIFlvdSBjYW4gYXNzaWduIEhUTUwgZm9ybWF0dGVkIHRleHQsIHdoaWNoXHJcbiAqIG9wdGlvbmFsbHkgdXNlcyBDU1Mgc3R5bGVzLCBkaXJlY3RseSB0byBhIHRleHQgZmllbGQuIEhUTUwgdGV4dCB0aGF0IHlvdVxyXG4gKiBhc3NpZ24gdG8gYSB0ZXh0IGZpZWxkIGNhbiBjb250YWluIGVtYmVkZGVkIG1lZGlhKG1vdmllIGNsaXBzLCBTV0YgZmlsZXMsXHJcbiAqIEdJRiBmaWxlcywgUE5HIGZpbGVzLCBhbmQgSlBFRyBmaWxlcykuIFRoZSB0ZXh0IHdyYXBzIGFyb3VuZCB0aGUgZW1iZWRkZWRcclxuICogbWVkaWEgaW4gdGhlIHNhbWUgd2F5IHRoYXQgYSB3ZWIgYnJvd3NlciB3cmFwcyB0ZXh0IGFyb3VuZCBtZWRpYSBlbWJlZGRlZFxyXG4gKiBpbiBhbiBIVE1MIGRvY3VtZW50LiA8L3A+XHJcbiAqXHJcbiAqIDxwPkZsYXNoIFBsYXllciBzdXBwb3J0cyBhIHN1YnNldCBvZiBIVE1MIHRhZ3MgdGhhdCB5b3UgY2FuIHVzZSB0byBmb3JtYXRcclxuICogdGV4dC4gU2VlIHRoZSBsaXN0IG9mIHN1cHBvcnRlZCBIVE1MIHRhZ3MgaW4gdGhlIGRlc2NyaXB0aW9uIG9mIHRoZVxyXG4gKiA8Y29kZT5odG1sVGV4dDwvY29kZT4gcHJvcGVydHkuPC9wPlxyXG4gKiBcclxuICogQGV2ZW50IGNoYW5nZSAgICAgICAgICAgICAgICAgICAgRGlzcGF0Y2hlZCBhZnRlciBhIGNvbnRyb2wgdmFsdWUgaXNcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kaWZpZWQsIHVubGlrZSB0aGVcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+dGV4dElucHV0PC9jb2RlPiBldmVudCwgd2hpY2ggaXNcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2hlZCBiZWZvcmUgdGhlIHZhbHVlIGlzIG1vZGlmaWVkLlxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBVbmxpa2UgdGhlIFczQyBET00gRXZlbnQgTW9kZWwgdmVyc2lvbiBvZlxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGUgPGNvZGU+Y2hhbmdlPC9jb2RlPiBldmVudCwgd2hpY2hcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2hlcyB0aGUgZXZlbnQgb25seSBhZnRlciB0aGVcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbCBsb3NlcyBmb2N1cywgdGhlIEFjdGlvblNjcmlwdCAzLjBcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmVyc2lvbiBvZiB0aGUgPGNvZGU+Y2hhbmdlPC9jb2RlPiBldmVudFxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpcyBkaXNwYXRjaGVkIGFueSB0aW1lIHRoZSBjb250cm9sXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZXMuIEZvciBleGFtcGxlLCBpZiBhIHVzZXIgdHlwZXMgdGV4dFxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnRvIGEgdGV4dCBmaWVsZCwgYSA8Y29kZT5jaGFuZ2U8L2NvZGU+XHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50IGlzIGRpc3BhdGNoZWQgYWZ0ZXIgZXZlcnkga2V5c3Ryb2tlLlxyXG4gKiBAZXZlbnQgbGluayAgICAgICAgICAgICAgICAgICAgICBEaXNwYXRjaGVkIHdoZW4gYSB1c2VyIGNsaWNrcyBhIGh5cGVybGlua1xyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbiBhbiBIVE1MLWVuYWJsZWQgdGV4dCBmaWVsZCwgd2hlcmUgdGhlXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFVSTCBiZWdpbnMgd2l0aCBcImV2ZW50OlwiLiBUaGUgcmVtYWluZGVyIG9mXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoZSBVUkwgYWZ0ZXIgXCJldmVudDpcIiBpcyBwbGFjZWQgaW4gdGhlXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgcHJvcGVydHkgb2YgdGhlIExJTksgZXZlbnQuXHJcbiAqXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPjxiPk5vdGU6PC9iPiBUaGUgZGVmYXVsdCBiZWhhdmlvcixcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkaW5nIHRoZSB0ZXh0IHRvIHRoZSB0ZXh0IGZpZWxkLCBvY2N1cnNcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25seSB3aGVuIEZsYXNoIFBsYXllciBnZW5lcmF0ZXMgdGhlXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LCB3aGljaCBpbiB0aGlzIGNhc2UgaGFwcGVucyB3aGVuIGFcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlciBhdHRlbXB0cyB0byBpbnB1dCB0ZXh0LiBZb3UgY2Fubm90XHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1dCB0ZXh0IGludG8gYSB0ZXh0IGZpZWxkIGJ5IHNlbmRpbmcgaXRcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+dGV4dElucHV0PC9jb2RlPiBldmVudHMuPC9wPlxyXG4gKiBAZXZlbnQgc2Nyb2xsICAgICAgICAgICAgICAgICAgICBEaXNwYXRjaGVkIGJ5IGEgVGV4dEZpZWxkIG9iamVjdFxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aT5hZnRlcjwvaT4gdGhlIHVzZXIgc2Nyb2xscy5cclxuICogQGV2ZW50IHRleHRJbnB1dCAgICAgICAgICAgICAgICAgRmxhc2ggUGxheWVyIGRpc3BhdGNoZXMgdGhlXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPnRleHRJbnB1dDwvY29kZT4gZXZlbnQgd2hlbiBhIHVzZXJcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW50ZXJzIG9uZSBvciBtb3JlIGNoYXJhY3RlcnMgb2YgdGV4dC5cclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVmFyaW91cyB0ZXh0IGlucHV0IG1ldGhvZHMgY2FuIGdlbmVyYXRlXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMgZXZlbnQsIGluY2x1ZGluZyBzdGFuZGFyZCBrZXlib2FyZHMsXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0IG1ldGhvZCBlZGl0b3JzKElNRXMpLCB2b2ljZSBvclxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGVlY2ggcmVjb2duaXRpb24gc3lzdGVtcywgYW5kIGV2ZW4gdGhlXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdCBvZiBwYXN0aW5nIHBsYWluIHRleHQgd2l0aCBub1xyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXR0aW5nIG9yIHN0eWxlIGluZm9ybWF0aW9uLlxyXG4gKiBAZXZlbnQgdGV4dEludGVyYWN0aW9uTW9kZUNoYW5nZSBGbGFzaCBQbGF5ZXIgZGlzcGF0Y2hlcyB0aGVcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+dGV4dEludGVyYWN0aW9uTW9kZUNoYW5nZTwvY29kZT5cclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQgd2hlbiBhIHVzZXIgY2hhbmdlcyB0aGUgaW50ZXJhY3Rpb25cclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZSBvZiBhIHRleHQgZmllbGQuIGZvciBleGFtcGxlIG9uXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFuZHJvaWQsIG9uZSBjYW4gdG9nZ2xlIGZyb20gTk9STUFMIG1vZGVcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gU0VMRUNUSU9OIG1vZGUgdXNpbmcgY29udGV4dCBtZW51XHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnNcclxuICovXHJcbmNsYXNzIFRleHRGaWVsZCBleHRlbmRzIE1lc2hcclxue1xyXG5cdHB1YmxpYyBzdGF0aWMgYXNzZXRUeXBlOnN0cmluZyA9IFwiW2Fzc2V0IFRleHRGaWVsZF1cIjtcclxuXHJcblx0cHJpdmF0ZSBfYm90dG9tU2Nyb2xsVjpudW1iZXI7XHJcblx0cHJpdmF0ZSBfY2FyZXRJbmRleDpudW1iZXI7XHJcblx0cHJpdmF0ZSBfbGVuZ3RoOm51bWJlcjtcclxuXHRwcml2YXRlIF9tYXhTY3JvbGxIOm51bWJlcjtcclxuXHRwcml2YXRlIF9tYXhTY3JvbGxWOm51bWJlcjtcclxuXHRwcml2YXRlIF9udW1MaW5lczpudW1iZXI7XHJcblx0cHJpdmF0ZSBfc2VsZWN0aW9uQmVnaW5JbmRleDpudW1iZXI7XHJcblx0cHJpdmF0ZSBfc2VsZWN0aW9uRW5kSW5kZXg6bnVtYmVyO1xyXG5cdHByaXZhdGUgX3RleHQ6c3RyaW5nID0gXCJcIjtcclxuXHRwcml2YXRlIF90ZXh0SGVpZ2h0Om51bWJlcjtcclxuXHRwcml2YXRlIF90ZXh0SW50ZXJhY3Rpb25Nb2RlOlRleHRJbnRlcmFjdGlvbk1vZGU7XHJcblx0cHJpdmF0ZSBfdGV4dFdpZHRoOm51bWJlcjtcclxuXHJcblx0cHJpdmF0ZSBfY2hhckJvdW5kYXJpZXM6UmVjdGFuZ2xlO1xyXG5cdHByaXZhdGUgX2NoYXJJbmRleEF0UG9pbnQ6bnVtYmVyO1xyXG5cdHByaXZhdGUgX2ZpcnN0Q2hhckluUGFyYWdyYXBoOm51bWJlcjtcclxuXHRwcml2YXRlIF9pbWFnZVJlZmVyZW5jZTpEaXNwbGF5T2JqZWN0XHJcblx0cHJpdmF0ZSBfbGluZUluZGV4QXRQb2ludDpudW1iZXI7XHJcblx0cHJpdmF0ZSBfbGluZUluZGV4T2ZDaGFyOm51bWJlcjtcclxuXHRwcml2YXRlIF9saW5lTGVuZ3RoOm51bWJlcjtcclxuXHRwcml2YXRlIF9saW5lTWV0cmljczpUZXh0TGluZU1ldHJpY3M7XHJcblx0cHJpdmF0ZSBfbGluZU9mZnNldDpudW1iZXI7XHJcblx0cHJpdmF0ZSBfbGluZVRleHQ6c3RyaW5nO1xyXG5cdHByaXZhdGUgX3BhcmFncmFwaExlbmd0aDpudW1iZXI7XHJcblx0cHJpdmF0ZSBfdGV4dEZvcm1hdDpUZXh0Rm9ybWF0O1xyXG5cclxuXHQvKipcclxuXHQgKiBXaGVuIHNldCB0byA8Y29kZT50cnVlPC9jb2RlPiBhbmQgdGhlIHRleHQgZmllbGQgaXMgbm90IGluIGZvY3VzLCBGbGFzaFxyXG5cdCAqIFBsYXllciBoaWdobGlnaHRzIHRoZSBzZWxlY3Rpb24gaW4gdGhlIHRleHQgZmllbGQgaW4gZ3JheS4gV2hlbiBzZXQgdG9cclxuXHQgKiA8Y29kZT5mYWxzZTwvY29kZT4gYW5kIHRoZSB0ZXh0IGZpZWxkIGlzIG5vdCBpbiBmb2N1cywgRmxhc2ggUGxheWVyIGRvZXNcclxuXHQgKiBub3QgaGlnaGxpZ2h0IHRoZSBzZWxlY3Rpb24gaW4gdGhlIHRleHQgZmllbGQuXHJcblx0ICogXHJcblx0ICogQGRlZmF1bHQgZmFsc2VcclxuXHQgKi9cclxuXHRwdWJsaWMgYWx3YXlzU2hvd1NlbGVjdGlvbjpib29sZWFuXHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSB0eXBlIG9mIGFudGktYWxpYXNpbmcgdXNlZCBmb3IgdGhpcyB0ZXh0IGZpZWxkLiBVc2VcclxuXHQgKiA8Y29kZT5mbGFzaC50ZXh0LkFudGlBbGlhc1R5cGU8L2NvZGU+IGNvbnN0YW50cyBmb3IgdGhpcyBwcm9wZXJ0eS4gWW91IGNhblxyXG5cdCAqIGNvbnRyb2wgdGhpcyBzZXR0aW5nIG9ubHkgaWYgdGhlIGZvbnQgaXMgZW1iZWRkZWQod2l0aCB0aGVcclxuXHQgKiA8Y29kZT5lbWJlZEZvbnRzPC9jb2RlPiBwcm9wZXJ0eSBzZXQgdG8gPGNvZGU+dHJ1ZTwvY29kZT4pLiBUaGUgZGVmYXVsdFxyXG5cdCAqIHNldHRpbmcgaXMgPGNvZGU+Zmxhc2gudGV4dC5BbnRpQWxpYXNUeXBlLk5PUk1BTDwvY29kZT4uXHJcblx0ICpcclxuXHQgKiA8cD5UbyBzZXQgdmFsdWVzIGZvciB0aGlzIHByb3BlcnR5LCB1c2UgdGhlIGZvbGxvd2luZyBzdHJpbmcgdmFsdWVzOjwvcD5cclxuXHQgKi9cclxuXHRwdWJsaWMgYW50aUFsaWFzVHlwZTpBbnRpQWxpYXNUeXBlO1xyXG5cclxuXHQvKipcclxuXHQgKiBDb250cm9scyBhdXRvbWF0aWMgc2l6aW5nIGFuZCBhbGlnbm1lbnQgb2YgdGV4dCBmaWVsZHMuIEFjY2VwdGFibGUgdmFsdWVzXHJcblx0ICogZm9yIHRoZSA8Y29kZT5UZXh0RmllbGRBdXRvU2l6ZTwvY29kZT4gY29uc3RhbnRzOlxyXG5cdCAqIDxjb2RlPlRleHRGaWVsZEF1dG9TaXplLk5PTkU8L2NvZGU+KHRoZSBkZWZhdWx0KSxcclxuXHQgKiA8Y29kZT5UZXh0RmllbGRBdXRvU2l6ZS5MRUZUPC9jb2RlPiwgPGNvZGU+VGV4dEZpZWxkQXV0b1NpemUuUklHSFQ8L2NvZGU+LFxyXG5cdCAqIGFuZCA8Y29kZT5UZXh0RmllbGRBdXRvU2l6ZS5DRU5URVI8L2NvZGU+LlxyXG5cdCAqXHJcblx0ICogPHA+SWYgPGNvZGU+YXV0b1NpemU8L2NvZGU+IGlzIHNldCB0byA8Y29kZT5UZXh0RmllbGRBdXRvU2l6ZS5OT05FPC9jb2RlPlxyXG5cdCAqICh0aGUgZGVmYXVsdCkgbm8gcmVzaXppbmcgb2NjdXJzLjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPklmIDxjb2RlPmF1dG9TaXplPC9jb2RlPiBpcyBzZXQgdG8gPGNvZGU+VGV4dEZpZWxkQXV0b1NpemUuTEVGVDwvY29kZT4sXHJcblx0ICogdGhlIHRleHQgaXMgdHJlYXRlZCBhcyBsZWZ0LWp1c3RpZmllZCB0ZXh0LCBtZWFuaW5nIHRoYXQgdGhlIGxlZnQgbWFyZ2luXHJcblx0ICogb2YgdGhlIHRleHQgZmllbGQgcmVtYWlucyBmaXhlZCBhbmQgYW55IHJlc2l6aW5nIG9mIGEgc2luZ2xlIGxpbmUgb2YgdGhlXHJcblx0ICogdGV4dCBmaWVsZCBpcyBvbiB0aGUgcmlnaHQgbWFyZ2luLiBJZiB0aGUgdGV4dCBpbmNsdWRlcyBhIGxpbmUgYnJlYWsoZm9yXHJcblx0ICogZXhhbXBsZSwgPGNvZGU+XCJcXG5cIjwvY29kZT4gb3IgPGNvZGU+XCJcXHJcIjwvY29kZT4pLCB0aGUgYm90dG9tIGlzIGFsc29cclxuXHQgKiByZXNpemVkIHRvIGZpdCB0aGUgbmV4dCBsaW5lIG9mIHRleHQuIElmIDxjb2RlPndvcmRXcmFwPC9jb2RlPiBpcyBhbHNvIHNldFxyXG5cdCAqIHRvIDxjb2RlPnRydWU8L2NvZGU+LCBvbmx5IHRoZSBib3R0b20gb2YgdGhlIHRleHQgZmllbGQgaXMgcmVzaXplZCBhbmQgdGhlXHJcblx0ICogcmlnaHQgc2lkZSByZW1haW5zIGZpeGVkLjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPklmIDxjb2RlPmF1dG9TaXplPC9jb2RlPiBpcyBzZXQgdG9cclxuXHQgKiA8Y29kZT5UZXh0RmllbGRBdXRvU2l6ZS5SSUdIVDwvY29kZT4sIHRoZSB0ZXh0IGlzIHRyZWF0ZWQgYXNcclxuXHQgKiByaWdodC1qdXN0aWZpZWQgdGV4dCwgbWVhbmluZyB0aGF0IHRoZSByaWdodCBtYXJnaW4gb2YgdGhlIHRleHQgZmllbGRcclxuXHQgKiByZW1haW5zIGZpeGVkIGFuZCBhbnkgcmVzaXppbmcgb2YgYSBzaW5nbGUgbGluZSBvZiB0aGUgdGV4dCBmaWVsZCBpcyBvblxyXG5cdCAqIHRoZSBsZWZ0IG1hcmdpbi4gSWYgdGhlIHRleHQgaW5jbHVkZXMgYSBsaW5lIGJyZWFrKGZvciBleGFtcGxlLFxyXG5cdCAqIDxjb2RlPlwiXFxuXCIgb3IgXCJcXHJcIik8L2NvZGU+LCB0aGUgYm90dG9tIGlzIGFsc28gcmVzaXplZCB0byBmaXQgdGhlIG5leHRcclxuXHQgKiBsaW5lIG9mIHRleHQuIElmIDxjb2RlPndvcmRXcmFwPC9jb2RlPiBpcyBhbHNvIHNldCB0byA8Y29kZT50cnVlPC9jb2RlPixcclxuXHQgKiBvbmx5IHRoZSBib3R0b20gb2YgdGhlIHRleHQgZmllbGQgaXMgcmVzaXplZCBhbmQgdGhlIGxlZnQgc2lkZSByZW1haW5zXHJcblx0ICogZml4ZWQuPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+SWYgPGNvZGU+YXV0b1NpemU8L2NvZGU+IGlzIHNldCB0b1xyXG5cdCAqIDxjb2RlPlRleHRGaWVsZEF1dG9TaXplLkNFTlRFUjwvY29kZT4sIHRoZSB0ZXh0IGlzIHRyZWF0ZWQgYXNcclxuXHQgKiBjZW50ZXItanVzdGlmaWVkIHRleHQsIG1lYW5pbmcgdGhhdCBhbnkgcmVzaXppbmcgb2YgYSBzaW5nbGUgbGluZSBvZiB0aGVcclxuXHQgKiB0ZXh0IGZpZWxkIGlzIGVxdWFsbHkgZGlzdHJpYnV0ZWQgdG8gYm90aCB0aGUgcmlnaHQgYW5kIGxlZnQgbWFyZ2lucy4gSWZcclxuXHQgKiB0aGUgdGV4dCBpbmNsdWRlcyBhIGxpbmUgYnJlYWsoZm9yIGV4YW1wbGUsIDxjb2RlPlwiXFxuXCI8L2NvZGU+IG9yXHJcblx0ICogPGNvZGU+XCJcXHJcIjwvY29kZT4pLCB0aGUgYm90dG9tIGlzIGFsc28gcmVzaXplZCB0byBmaXQgdGhlIG5leHQgbGluZSBvZlxyXG5cdCAqIHRleHQuIElmIDxjb2RlPndvcmRXcmFwPC9jb2RlPiBpcyBhbHNvIHNldCB0byA8Y29kZT50cnVlPC9jb2RlPiwgb25seSB0aGVcclxuXHQgKiBib3R0b20gb2YgdGhlIHRleHQgZmllbGQgaXMgcmVzaXplZCBhbmQgdGhlIGxlZnQgYW5kIHJpZ2h0IHNpZGVzIHJlbWFpblxyXG5cdCAqIGZpeGVkLjwvcD5cclxuXHQgKiBcclxuXHQgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgVGhlIDxjb2RlPmF1dG9TaXplPC9jb2RlPiBzcGVjaWZpZWQgaXMgbm90IGEgbWVtYmVyXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIG9mIGZsYXNoLnRleHQuVGV4dEZpZWxkQXV0b1NpemUuXHJcblx0ICovXHJcblx0cHVibGljIGF1dG9TaXplOlRleHRGaWVsZEF1dG9TaXplO1xyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqIEByZXR1cm5zIHtzdHJpbmd9XHJcblx0ICovXHJcblx0cHVibGljIGdldCBhc3NldFR5cGUoKTpzdHJpbmdcclxuXHR7XHJcblx0XHRyZXR1cm4gVGV4dEZpZWxkLmFzc2V0VHlwZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNwZWNpZmllcyB3aGV0aGVyIHRoZSB0ZXh0IGZpZWxkIGhhcyBhIGJhY2tncm91bmQgZmlsbC4gSWZcclxuXHQgKiA8Y29kZT50cnVlPC9jb2RlPiwgdGhlIHRleHQgZmllbGQgaGFzIGEgYmFja2dyb3VuZCBmaWxsLiBJZlxyXG5cdCAqIDxjb2RlPmZhbHNlPC9jb2RlPiwgdGhlIHRleHQgZmllbGQgaGFzIG5vIGJhY2tncm91bmQgZmlsbC4gVXNlIHRoZVxyXG5cdCAqIDxjb2RlPmJhY2tncm91bmRDb2xvcjwvY29kZT4gcHJvcGVydHkgdG8gc2V0IHRoZSBiYWNrZ3JvdW5kIGNvbG9yIG9mIGFcclxuXHQgKiB0ZXh0IGZpZWxkLlxyXG5cdCAqIFxyXG5cdCAqIEBkZWZhdWx0IGZhbHNlXHJcblx0ICovXHJcblx0cHVibGljIGJhY2tncm91bmQ6Ym9vbGVhbjtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGNvbG9yIG9mIHRoZSB0ZXh0IGZpZWxkIGJhY2tncm91bmQuIFRoZSBkZWZhdWx0IHZhbHVlIGlzXHJcblx0ICogPGNvZGU+MHhGRkZGRkY8L2NvZGU+KHdoaXRlKS4gVGhpcyBwcm9wZXJ0eSBjYW4gYmUgcmV0cmlldmVkIG9yIHNldCwgZXZlblxyXG5cdCAqIGlmIHRoZXJlIGN1cnJlbnRseSBpcyBubyBiYWNrZ3JvdW5kLCBidXQgdGhlIGNvbG9yIGlzIHZpc2libGUgb25seSBpZiB0aGVcclxuXHQgKiB0ZXh0IGZpZWxkIGhhcyB0aGUgPGNvZGU+YmFja2dyb3VuZDwvY29kZT4gcHJvcGVydHkgc2V0IHRvXHJcblx0ICogPGNvZGU+dHJ1ZTwvY29kZT4uXHJcblx0ICovXHJcblx0cHVibGljIGJhY2tncm91bmRDb2xvcjpudW1iZXIgLyppbnQqLztcclxuXHJcblx0LyoqXHJcblx0ICogU3BlY2lmaWVzIHdoZXRoZXIgdGhlIHRleHQgZmllbGQgaGFzIGEgYm9yZGVyLiBJZiA8Y29kZT50cnVlPC9jb2RlPiwgdGhlXHJcblx0ICogdGV4dCBmaWVsZCBoYXMgYSBib3JkZXIuIElmIDxjb2RlPmZhbHNlPC9jb2RlPiwgdGhlIHRleHQgZmllbGQgaGFzIG5vXHJcblx0ICogYm9yZGVyLiBVc2UgdGhlIDxjb2RlPmJvcmRlckNvbG9yPC9jb2RlPiBwcm9wZXJ0eSB0byBzZXQgdGhlIGJvcmRlciBjb2xvci5cclxuXHQgKiBcclxuXHQgKiBAZGVmYXVsdCBmYWxzZVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBib3JkZXI6Ym9vbGVhbjtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGNvbG9yIG9mIHRoZSB0ZXh0IGZpZWxkIGJvcmRlci4gVGhlIGRlZmF1bHQgdmFsdWUgaXNcclxuXHQgKiA8Y29kZT4weDAwMDAwMDwvY29kZT4oYmxhY2spLiBUaGlzIHByb3BlcnR5IGNhbiBiZSByZXRyaWV2ZWQgb3Igc2V0LCBldmVuXHJcblx0ICogaWYgdGhlcmUgY3VycmVudGx5IGlzIG5vIGJvcmRlciwgYnV0IHRoZSBjb2xvciBpcyB2aXNpYmxlIG9ubHkgaWYgdGhlIHRleHRcclxuXHQgKiBmaWVsZCBoYXMgdGhlIDxjb2RlPmJvcmRlcjwvY29kZT4gcHJvcGVydHkgc2V0IHRvIDxjb2RlPnRydWU8L2NvZGU+LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBib3JkZXJDb2xvcjpudW1iZXIgLyppbnQqLztcclxuXHJcblx0LyoqXHJcblx0ICogQW4gaW50ZWdlcigxLWJhc2VkIGluZGV4KSB0aGF0IGluZGljYXRlcyB0aGUgYm90dG9tbW9zdCBsaW5lIHRoYXQgaXNcclxuXHQgKiBjdXJyZW50bHkgdmlzaWJsZSBpbiB0aGUgc3BlY2lmaWVkIHRleHQgZmllbGQuIFRoaW5rIG9mIHRoZSB0ZXh0IGZpZWxkIGFzXHJcblx0ICogYSB3aW5kb3cgb250byBhIGJsb2NrIG9mIHRleHQuIFRoZSA8Y29kZT5zY3JvbGxWPC9jb2RlPiBwcm9wZXJ0eSBpcyB0aGVcclxuXHQgKiAxLWJhc2VkIGluZGV4IG9mIHRoZSB0b3Btb3N0IHZpc2libGUgbGluZSBpbiB0aGUgd2luZG93LlxyXG5cdCAqXHJcblx0ICogPHA+QWxsIHRoZSB0ZXh0IGJldHdlZW4gdGhlIGxpbmVzIGluZGljYXRlZCBieSA8Y29kZT5zY3JvbGxWPC9jb2RlPiBhbmRcclxuXHQgKiA8Y29kZT5ib3R0b21TY3JvbGxWPC9jb2RlPiBpcyBjdXJyZW50bHkgdmlzaWJsZSBpbiB0aGUgdGV4dCBmaWVsZC48L3A+XHJcblx0ICovXHJcblx0cHVibGljIGdldCBib3R0b21TY3JvbGxWKCk6bnVtYmVyIC8qaW50Ki9cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fYm90dG9tU2Nyb2xsVjtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBpbmRleCBvZiB0aGUgaW5zZXJ0aW9uIHBvaW50KGNhcmV0KSBwb3NpdGlvbi4gSWYgbm8gaW5zZXJ0aW9uIHBvaW50XHJcblx0ICogaXMgZGlzcGxheWVkLCB0aGUgdmFsdWUgaXMgdGhlIHBvc2l0aW9uIHRoZSBpbnNlcnRpb24gcG9pbnQgd291bGQgYmUgaWZcclxuXHQgKiB5b3UgcmVzdG9yZWQgZm9jdXMgdG8gdGhlIGZpZWxkKHR5cGljYWxseSB3aGVyZSB0aGUgaW5zZXJ0aW9uIHBvaW50IGxhc3RcclxuXHQgKiB3YXMsIG9yIDAgaWYgdGhlIGZpZWxkIGhhcyBub3QgaGFkIGZvY3VzKS5cclxuXHQgKlxyXG5cdCAqIDxwPlNlbGVjdGlvbiBzcGFuIGluZGV4ZXMgYXJlIHplcm8tYmFzZWQoZm9yIGV4YW1wbGUsIHRoZSBmaXJzdCBwb3NpdGlvblxyXG5cdCAqIGlzIDAsIHRoZSBzZWNvbmQgcG9zaXRpb24gaXMgMSwgYW5kIHNvIG9uKS48L3A+XHJcblx0ICovXHJcblx0cHVibGljIGdldCBjYXJldEluZGV4KCk6bnVtYmVyIC8qaW50Ki9cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fY2FyZXRJbmRleDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEEgQm9vbGVhbiB2YWx1ZSB0aGF0IHNwZWNpZmllcyB3aGV0aGVyIGV4dHJhIHdoaXRlIHNwYWNlKHNwYWNlcywgbGluZVxyXG5cdCAqIGJyZWFrcywgYW5kIHNvIG9uKSBpbiBhIHRleHQgZmllbGQgd2l0aCBIVE1MIHRleHQgaXMgcmVtb3ZlZC4gVGhlIGRlZmF1bHRcclxuXHQgKiB2YWx1ZSBpcyA8Y29kZT5mYWxzZTwvY29kZT4uIFRoZSA8Y29kZT5jb25kZW5zZVdoaXRlPC9jb2RlPiBwcm9wZXJ0eSBvbmx5XHJcblx0ICogYWZmZWN0cyB0ZXh0IHNldCB3aXRoIHRoZSA8Y29kZT5odG1sVGV4dDwvY29kZT4gcHJvcGVydHksIG5vdCB0aGVcclxuXHQgKiA8Y29kZT50ZXh0PC9jb2RlPiBwcm9wZXJ0eS4gSWYgeW91IHNldCB0ZXh0IHdpdGggdGhlIDxjb2RlPnRleHQ8L2NvZGU+XHJcblx0ICogcHJvcGVydHksIDxjb2RlPmNvbmRlbnNlV2hpdGU8L2NvZGU+IGlzIGlnbm9yZWQuXHJcblx0ICpcclxuXHQgKiA8cD5JZiA8Y29kZT5jb25kZW5zZVdoaXRlPC9jb2RlPiBpcyBzZXQgdG8gPGNvZGU+dHJ1ZTwvY29kZT4sIHVzZSBzdGFuZGFyZFxyXG5cdCAqIEhUTUwgY29tbWFuZHMgc3VjaCBhcyA8Y29kZT48QlI+PC9jb2RlPiBhbmQgPGNvZGU+PFA+PC9jb2RlPiB0byBwbGFjZSBsaW5lXHJcblx0ICogYnJlYWtzIGluIHRoZSB0ZXh0IGZpZWxkLjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPlNldCB0aGUgPGNvZGU+Y29uZGVuc2VXaGl0ZTwvY29kZT4gcHJvcGVydHkgYmVmb3JlIHNldHRpbmcgdGhlXHJcblx0ICogPGNvZGU+aHRtbFRleHQ8L2NvZGU+IHByb3BlcnR5LjwvcD5cclxuXHQgKi9cclxuXHRwdWJsaWMgY29uZGVuc2VXaGl0ZTpib29sZWFuO1xyXG5cclxuXHQvKipcclxuXHQgKiBTcGVjaWZpZXMgdGhlIGZvcm1hdCBhcHBsaWVkIHRvIG5ld2x5IGluc2VydGVkIHRleHQsIHN1Y2ggYXMgdGV4dCBlbnRlcmVkXHJcblx0ICogYnkgYSB1c2VyIG9yIHRleHQgaW5zZXJ0ZWQgd2l0aCB0aGUgPGNvZGU+cmVwbGFjZVNlbGVjdGVkVGV4dCgpPC9jb2RlPlxyXG5cdCAqIG1ldGhvZC5cclxuXHQgKlxyXG5cdCAqIDxwPjxiPk5vdGU6PC9iPiBXaGVuIHNlbGVjdGluZyBjaGFyYWN0ZXJzIHRvIGJlIHJlcGxhY2VkIHdpdGhcclxuXHQgKiA8Y29kZT5zZXRTZWxlY3Rpb24oKTwvY29kZT4gYW5kIDxjb2RlPnJlcGxhY2VTZWxlY3RlZFRleHQoKTwvY29kZT4sIHRoZVxyXG5cdCAqIDxjb2RlPmRlZmF1bHRUZXh0Rm9ybWF0PC9jb2RlPiB3aWxsIGJlIGFwcGxpZWQgb25seSBpZiB0aGUgdGV4dCBoYXMgYmVlblxyXG5cdCAqIHNlbGVjdGVkIHVwIHRvIGFuZCBpbmNsdWRpbmcgdGhlIGxhc3QgY2hhcmFjdGVyLiBIZXJlIGlzIGFuIGV4YW1wbGU6PC9wPlxyXG5cdCAqIDxwcmUgeG1sOnNwYWNlPVwicHJlc2VydmVcIj4gcHVibGljIG15X3R4dDpUZXh0RmllbGQgbmV3IFRleHRGaWVsZCgpO1xyXG5cdCAqIG15X3R4dC50ZXh0ID0gXCJGbGFzaCBNYWNpbnRvc2ggdmVyc2lvblwiOyBwdWJsaWMgbXlfZm10OlRleHRGb3JtYXQgPSBuZXdcclxuXHQgKiBUZXh0Rm9ybWF0KCk7IG15X2ZtdC5jb2xvciA9IDB4RkYwMDAwOyBteV90eHQuZGVmYXVsdFRleHRGb3JtYXQgPSBteV9mbXQ7XHJcblx0ICogbXlfdHh0LnNldFNlbGVjdGlvbig2LDE1KTsgLy8gcGFydGlhbCB0ZXh0IHNlbGVjdGVkIC0gZGVmYXVsdFRleHRGb3JtYXRcclxuXHQgKiBub3QgYXBwbGllZCBteV90eHQuc2V0U2VsZWN0aW9uKDYsMjMpOyAvLyB0ZXh0IHNlbGVjdGVkIHRvIGVuZCAtXHJcblx0ICogZGVmYXVsdFRleHRGb3JtYXQgYXBwbGllZCBteV90eHQucmVwbGFjZVNlbGVjdGVkVGV4dChcIldpbmRvd3MgdmVyc2lvblwiKTtcclxuXHQgKiA8L3ByZT5cclxuXHQgKlxyXG5cdCAqIDxwPldoZW4geW91IGFjY2VzcyB0aGUgPGNvZGU+ZGVmYXVsdFRleHRGb3JtYXQ8L2NvZGU+IHByb3BlcnR5LCB0aGVcclxuXHQgKiByZXR1cm5lZCBUZXh0Rm9ybWF0IG9iamVjdCBoYXMgYWxsIG9mIGl0cyBwcm9wZXJ0aWVzIGRlZmluZWQuIE5vIHByb3BlcnR5XHJcblx0ICogaXMgPGNvZGU+bnVsbDwvY29kZT4uPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+PGI+Tm90ZTo8L2I+IFlvdSBjYW4ndCBzZXQgdGhpcyBwcm9wZXJ0eSBpZiBhIHN0eWxlIHNoZWV0IGlzIGFwcGxpZWQgdG9cclxuXHQgKiB0aGUgdGV4dCBmaWVsZC48L3A+XHJcblx0ICogXHJcblx0ICogQHRocm93cyBFcnJvciBUaGlzIG1ldGhvZCBjYW5ub3QgYmUgdXNlZCBvbiBhIHRleHQgZmllbGQgd2l0aCBhIHN0eWxlXHJcblx0ICogICAgICAgICAgICAgICBzaGVldC5cclxuXHQgKi9cclxuXHRwdWJsaWMgZGVmYXVsdFRleHRGb3JtYXQ6VGV4dEZvcm1hdDtcclxuXHJcblx0LyoqXHJcblx0ICogU3BlY2lmaWVzIHdoZXRoZXIgdGhlIHRleHQgZmllbGQgaXMgYSBwYXNzd29yZCB0ZXh0IGZpZWxkLiBJZiB0aGUgdmFsdWUgb2ZcclxuXHQgKiB0aGlzIHByb3BlcnR5IGlzIDxjb2RlPnRydWU8L2NvZGU+LCB0aGUgdGV4dCBmaWVsZCBpcyB0cmVhdGVkIGFzIGFcclxuXHQgKiBwYXNzd29yZCB0ZXh0IGZpZWxkIGFuZCBoaWRlcyB0aGUgaW5wdXQgY2hhcmFjdGVycyB1c2luZyBhc3Rlcmlza3MgaW5zdGVhZFxyXG5cdCAqIG9mIHRoZSBhY3R1YWwgY2hhcmFjdGVycy4gSWYgPGNvZGU+ZmFsc2U8L2NvZGU+LCB0aGUgdGV4dCBmaWVsZCBpcyBub3RcclxuXHQgKiB0cmVhdGVkIGFzIGEgcGFzc3dvcmQgdGV4dCBmaWVsZC4gV2hlbiBwYXNzd29yZCBtb2RlIGlzIGVuYWJsZWQsIHRoZSBDdXRcclxuXHQgKiBhbmQgQ29weSBjb21tYW5kcyBhbmQgdGhlaXIgY29ycmVzcG9uZGluZyBrZXlib2FyZCBzaG9ydGN1dHMgd2lsbCBub3RcclxuXHQgKiBmdW5jdGlvbi4gVGhpcyBzZWN1cml0eSBtZWNoYW5pc20gcHJldmVudHMgYW4gdW5zY3J1cHVsb3VzIHVzZXIgZnJvbSB1c2luZ1xyXG5cdCAqIHRoZSBzaG9ydGN1dHMgdG8gZGlzY292ZXIgYSBwYXNzd29yZCBvbiBhbiB1bmF0dGVuZGVkIGNvbXB1dGVyLlxyXG5cdCAqIFxyXG5cdCAqIEBkZWZhdWx0IGZhbHNlXHJcblx0ICovXHJcblx0cHVibGljIGRpc3BsYXlBc1Bhc3N3b3JkOmJvb2xlYW47XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNwZWNpZmllcyB3aGV0aGVyIHRvIHJlbmRlciBieSB1c2luZyBlbWJlZGRlZCBmb250IG91dGxpbmVzLiBJZlxyXG5cdCAqIDxjb2RlPmZhbHNlPC9jb2RlPiwgRmxhc2ggUGxheWVyIHJlbmRlcnMgdGhlIHRleHQgZmllbGQgYnkgdXNpbmcgZGV2aWNlXHJcblx0ICogZm9udHMuXHJcblx0ICpcclxuXHQgKiA8cD5JZiB5b3Ugc2V0IHRoZSA8Y29kZT5lbWJlZEZvbnRzPC9jb2RlPiBwcm9wZXJ0eSB0byA8Y29kZT50cnVlPC9jb2RlPlxyXG5cdCAqIGZvciBhIHRleHQgZmllbGQsIHlvdSBtdXN0IHNwZWNpZnkgYSBmb250IGZvciB0aGF0IHRleHQgYnkgdXNpbmcgdGhlXHJcblx0ICogPGNvZGU+Zm9udDwvY29kZT4gcHJvcGVydHkgb2YgYSBUZXh0Rm9ybWF0IG9iamVjdCBhcHBsaWVkIHRvIHRoZSB0ZXh0XHJcblx0ICogZmllbGQuIElmIHRoZSBzcGVjaWZpZWQgZm9udCBpcyBub3QgZW1iZWRkZWQgaW4gdGhlIFNXRiBmaWxlLCB0aGUgdGV4dCBpc1xyXG5cdCAqIG5vdCBkaXNwbGF5ZWQuPC9wPlxyXG5cdCAqIFxyXG5cdCAqIEBkZWZhdWx0IGZhbHNlXHJcblx0ICovXHJcblx0cHVibGljIGVtYmVkRm9udHM6Ym9vbGVhbjtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIHR5cGUgb2YgZ3JpZCBmaXR0aW5nIHVzZWQgZm9yIHRoaXMgdGV4dCBmaWVsZC4gVGhpcyBwcm9wZXJ0eSBhcHBsaWVzXHJcblx0ICogb25seSBpZiB0aGUgPGNvZGU+Zmxhc2gudGV4dC5BbnRpQWxpYXNUeXBlPC9jb2RlPiBwcm9wZXJ0eSBvZiB0aGUgdGV4dFxyXG5cdCAqIGZpZWxkIGlzIHNldCB0byA8Y29kZT5mbGFzaC50ZXh0LkFudGlBbGlhc1R5cGUuQURWQU5DRUQ8L2NvZGU+LlxyXG5cdCAqXHJcblx0ICogPHA+VGhlIHR5cGUgb2YgZ3JpZCBmaXR0aW5nIHVzZWQgZGV0ZXJtaW5lcyB3aGV0aGVyIEZsYXNoIFBsYXllciBmb3JjZXNcclxuXHQgKiBzdHJvbmcgaG9yaXpvbnRhbCBhbmQgdmVydGljYWwgbGluZXMgdG8gZml0IHRvIGEgcGl4ZWwgb3Igc3VicGl4ZWwgZ3JpZCxcclxuXHQgKiBvciBub3QgYXQgYWxsLjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPkZvciB0aGUgPGNvZGU+Zmxhc2gudGV4dC5HcmlkRml0VHlwZTwvY29kZT4gcHJvcGVydHksIHlvdSBjYW4gdXNlIHRoZVxyXG5cdCAqIGZvbGxvd2luZyBzdHJpbmcgdmFsdWVzOjwvcD5cclxuXHQgKiBcclxuXHQgKiBAZGVmYXVsdCBwaXhlbFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBncmlkRml0VHlwZTpHcmlkRml0VHlwZTtcclxuXHJcblx0LyoqXHJcblx0ICogQ29udGFpbnMgdGhlIEhUTUwgcmVwcmVzZW50YXRpb24gb2YgdGhlIHRleHQgZmllbGQgY29udGVudHMuXHJcblx0ICpcclxuXHQgKiA8cD5GbGFzaCBQbGF5ZXIgc3VwcG9ydHMgdGhlIGZvbGxvd2luZyBIVE1MIHRhZ3M6PC9wPlxyXG5cdCAqXHJcblx0ICogPHA+Rmxhc2ggUGxheWVyIGFuZCBBSVIgYWxzbyBzdXBwb3J0IGV4cGxpY2l0IGNoYXJhY3RlciBjb2Rlcywgc3VjaCBhc1xyXG5cdCAqICYjMzg7KEFTQ0lJIGFtcGVyc2FuZCkgYW5kICYjeDIwQUM7KFVuaWNvZGUg4oKsIHN5bWJvbCkuIDwvcD5cclxuXHQgKi9cclxuXHRwdWJsaWMgaHRtbFRleHQ6c3RyaW5nO1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgbnVtYmVyIG9mIGNoYXJhY3RlcnMgaW4gYSB0ZXh0IGZpZWxkLiBBIGNoYXJhY3RlciBzdWNoIGFzIHRhYlxyXG5cdCAqICg8Y29kZT5cXHQ8L2NvZGU+KSBjb3VudHMgYXMgb25lIGNoYXJhY3Rlci5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGxlbmd0aCgpOm51bWJlciAvKmludCovXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2xlbmd0aDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBtYXhpbXVtIG51bWJlciBvZiBjaGFyYWN0ZXJzIHRoYXQgdGhlIHRleHQgZmllbGQgY2FuIGNvbnRhaW4sIGFzXHJcblx0ICogZW50ZXJlZCBieSBhIHVzZXIuIEEgc2NyaXB0IGNhbiBpbnNlcnQgbW9yZSB0ZXh0IHRoYW5cclxuXHQgKiA8Y29kZT5tYXhDaGFyczwvY29kZT4gYWxsb3dzOyB0aGUgPGNvZGU+bWF4Q2hhcnM8L2NvZGU+IHByb3BlcnR5IGluZGljYXRlc1xyXG5cdCAqIG9ubHkgaG93IG11Y2ggdGV4dCBhIHVzZXIgY2FuIGVudGVyLiBJZiB0aGUgdmFsdWUgb2YgdGhpcyBwcm9wZXJ0eSBpc1xyXG5cdCAqIDxjb2RlPjA8L2NvZGU+LCBhIHVzZXIgY2FuIGVudGVyIGFuIHVubGltaXRlZCBhbW91bnQgb2YgdGV4dC5cclxuXHQgKiBcclxuXHQgKiBAZGVmYXVsdCAwXHJcblx0ICovXHJcblx0cHVibGljIG1heENoYXJzOm51bWJlciAvKmludCovO1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgbWF4aW11bSB2YWx1ZSBvZiA8Y29kZT5zY3JvbGxIPC9jb2RlPi5cclxuXHQgKi9cclxuXHRwdWJsaWMgbWF4U2Nyb2xsSCgpOm51bWJlciAvKmludCovXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX21heFNjcm9sbEg7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgbWF4aW11bSB2YWx1ZSBvZiA8Y29kZT5zY3JvbGxWPC9jb2RlPi5cclxuXHQgKi9cclxuXHRwdWJsaWMgbWF4U2Nyb2xsVigpOm51bWJlciAvKmludCovXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX21heFNjcm9sbFY7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBIEJvb2xlYW4gdmFsdWUgdGhhdCBpbmRpY2F0ZXMgd2hldGhlciBGbGFzaCBQbGF5ZXIgYXV0b21hdGljYWxseSBzY3JvbGxzXHJcblx0ICogbXVsdGlsaW5lIHRleHQgZmllbGRzIHdoZW4gdGhlIHVzZXIgY2xpY2tzIGEgdGV4dCBmaWVsZCBhbmQgcm9sbHMgdGhlXHJcblx0ICogbW91c2Ugd2hlZWwuIEJ5IGRlZmF1bHQsIHRoaXMgdmFsdWUgaXMgPGNvZGU+dHJ1ZTwvY29kZT4uIFRoaXMgcHJvcGVydHkgaXNcclxuXHQgKiB1c2VmdWwgaWYgeW91IHdhbnQgdG8gcHJldmVudCBtb3VzZSB3aGVlbCBzY3JvbGxpbmcgb2YgdGV4dCBmaWVsZHMsIG9yXHJcblx0ICogaW1wbGVtZW50IHlvdXIgb3duIHRleHQgZmllbGQgc2Nyb2xsaW5nLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBtb3VzZVdoZWVsRW5hYmxlZDpib29sZWFuO1xyXG5cclxuXHQvKipcclxuXHQgKiBJbmRpY2F0ZXMgd2hldGhlciBmaWVsZCBpcyBhIG11bHRpbGluZSB0ZXh0IGZpZWxkLiBJZiB0aGUgdmFsdWUgaXNcclxuXHQgKiA8Y29kZT50cnVlPC9jb2RlPiwgdGhlIHRleHQgZmllbGQgaXMgbXVsdGlsaW5lOyBpZiB0aGUgdmFsdWUgaXNcclxuXHQgKiA8Y29kZT5mYWxzZTwvY29kZT4sIHRoZSB0ZXh0IGZpZWxkIGlzIGEgc2luZ2xlLWxpbmUgdGV4dCBmaWVsZC4gSW4gYSBmaWVsZFxyXG5cdCAqIG9mIHR5cGUgPGNvZGU+VGV4dEZpZWxkVHlwZS5JTlBVVDwvY29kZT4sIHRoZSA8Y29kZT5tdWx0aWxpbmU8L2NvZGU+IHZhbHVlXHJcblx0ICogZGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSA8Y29kZT5FbnRlcjwvY29kZT4ga2V5IGNyZWF0ZXMgYSBuZXcgbGluZShhIHZhbHVlXHJcblx0ICogb2YgPGNvZGU+ZmFsc2U8L2NvZGU+LCBhbmQgdGhlIDxjb2RlPkVudGVyPC9jb2RlPiBrZXkgaXMgaWdub3JlZCkuIElmIHlvdVxyXG5cdCAqIHBhc3RlIHRleHQgaW50byBhIDxjb2RlPlRleHRGaWVsZDwvY29kZT4gd2l0aCBhIDxjb2RlPm11bHRpbGluZTwvY29kZT5cclxuXHQgKiB2YWx1ZSBvZiA8Y29kZT5mYWxzZTwvY29kZT4sIG5ld2xpbmVzIGFyZSBzdHJpcHBlZCBvdXQgb2YgdGhlIHRleHQuXHJcblx0ICogXHJcblx0ICogQGRlZmF1bHQgZmFsc2VcclxuXHQgKi9cclxuXHRwdWJsaWMgbXVsdGlsaW5lOmJvb2xlYW47XHJcblxyXG5cdC8qKlxyXG5cdCAqIERlZmluZXMgdGhlIG51bWJlciBvZiB0ZXh0IGxpbmVzIGluIGEgbXVsdGlsaW5lIHRleHQgZmllbGQuIElmXHJcblx0ICogPGNvZGU+d29yZFdyYXA8L2NvZGU+IHByb3BlcnR5IGlzIHNldCB0byA8Y29kZT50cnVlPC9jb2RlPiwgdGhlIG51bWJlciBvZlxyXG5cdCAqIGxpbmVzIGluY3JlYXNlcyB3aGVuIHRleHQgd3JhcHMuXHJcblx0ICovXHJcblx0cHVibGljIGdldCBudW1MaW5lcygpOm51bWJlciAvKmludCovXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX251bUxpbmVzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSW5kaWNhdGVzIHRoZSBzZXQgb2YgY2hhcmFjdGVycyB0aGF0IGEgdXNlciBjYW4gZW50ZXIgaW50byB0aGUgdGV4dCBmaWVsZC5cclxuXHQgKiBJZiB0aGUgdmFsdWUgb2YgdGhlIDxjb2RlPnJlc3RyaWN0PC9jb2RlPiBwcm9wZXJ0eSBpcyA8Y29kZT5udWxsPC9jb2RlPixcclxuXHQgKiB5b3UgY2FuIGVudGVyIGFueSBjaGFyYWN0ZXIuIElmIHRoZSB2YWx1ZSBvZiB0aGUgPGNvZGU+cmVzdHJpY3Q8L2NvZGU+XHJcblx0ICogcHJvcGVydHkgaXMgYW4gZW1wdHkgc3RyaW5nLCB5b3UgY2Fubm90IGVudGVyIGFueSBjaGFyYWN0ZXIuIElmIHRoZSB2YWx1ZVxyXG5cdCAqIG9mIHRoZSA8Y29kZT5yZXN0cmljdDwvY29kZT4gcHJvcGVydHkgaXMgYSBzdHJpbmcgb2YgY2hhcmFjdGVycywgeW91IGNhblxyXG5cdCAqIGVudGVyIG9ubHkgY2hhcmFjdGVycyBpbiB0aGUgc3RyaW5nIGludG8gdGhlIHRleHQgZmllbGQuIFRoZSBzdHJpbmcgaXNcclxuXHQgKiBzY2FubmVkIGZyb20gbGVmdCB0byByaWdodC4gWW91IGNhbiBzcGVjaWZ5IGEgcmFuZ2UgYnkgdXNpbmcgdGhlIGh5cGhlblxyXG5cdCAqICgtKSBjaGFyYWN0ZXIuIE9ubHkgdXNlciBpbnRlcmFjdGlvbiBpcyByZXN0cmljdGVkOyBhIHNjcmlwdCBjYW4gcHV0IGFueVxyXG5cdCAqIHRleHQgaW50byB0aGUgdGV4dCBmaWVsZC4gPHBoIG91dHB1dGNsYXNzPVwiZmxhc2hvbmx5XCI+VGhpcyBwcm9wZXJ0eSBkb2VzXHJcblx0ICogbm90IHN5bmNocm9uaXplIHdpdGggdGhlIEVtYmVkIGZvbnQgb3B0aW9ucyBpbiB0aGUgUHJvcGVydHkgaW5zcGVjdG9yLlxyXG5cdCAqXHJcblx0ICogPHA+SWYgdGhlIHN0cmluZyBiZWdpbnMgd2l0aCBhIGNhcmV0KF4pIGNoYXJhY3RlciwgYWxsIGNoYXJhY3RlcnMgYXJlXHJcblx0ICogaW5pdGlhbGx5IGFjY2VwdGVkIGFuZCBzdWNjZWVkaW5nIGNoYXJhY3RlcnMgaW4gdGhlIHN0cmluZyBhcmUgZXhjbHVkZWRcclxuXHQgKiBmcm9tIHRoZSBzZXQgb2YgYWNjZXB0ZWQgY2hhcmFjdGVycy4gSWYgdGhlIHN0cmluZyBkb2VzIG5vdCBiZWdpbiB3aXRoIGFcclxuXHQgKiBjYXJldCheKSBjaGFyYWN0ZXIsIG5vIGNoYXJhY3RlcnMgYXJlIGluaXRpYWxseSBhY2NlcHRlZCBhbmQgc3VjY2VlZGluZ1xyXG5cdCAqIGNoYXJhY3RlcnMgaW4gdGhlIHN0cmluZyBhcmUgaW5jbHVkZWQgaW4gdGhlIHNldCBvZiBhY2NlcHRlZFxyXG5cdCAqIGNoYXJhY3RlcnMuPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+VGhlIGZvbGxvd2luZyBleGFtcGxlIGFsbG93cyBvbmx5IHVwcGVyY2FzZSBjaGFyYWN0ZXJzLCBzcGFjZXMsIGFuZFxyXG5cdCAqIG51bWJlcnMgdG8gYmUgZW50ZXJlZCBpbnRvIGEgdGV4dCBmaWVsZDo8L3A+XHJcblx0ICogPHByZSB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiPiBteV90eHQucmVzdHJpY3QgPSBcIkEtWiAwLTlcIjsgPC9wcmU+XHJcblx0ICpcclxuXHQgKiA8cD5UaGUgZm9sbG93aW5nIGV4YW1wbGUgaW5jbHVkZXMgYWxsIGNoYXJhY3RlcnMsIGJ1dCBleGNsdWRlcyBsb3dlcmNhc2VcclxuXHQgKiBsZXR0ZXJzOjwvcD5cclxuXHQgKiA8cHJlIHhtbDpzcGFjZT1cInByZXNlcnZlXCI+IG15X3R4dC5yZXN0cmljdCA9IFwiXmEtelwiOyA8L3ByZT5cclxuXHQgKlxyXG5cdCAqIDxwPllvdSBjYW4gdXNlIGEgYmFja3NsYXNoIHRvIGVudGVyIGEgXiBvciAtIHZlcmJhdGltLiBUaGUgYWNjZXB0ZWRcclxuXHQgKiBiYWNrc2xhc2ggc2VxdWVuY2VzIGFyZSBcXC0sIFxcXiBvciBcXFxcLiBUaGUgYmFja3NsYXNoIG11c3QgYmUgYW4gYWN0dWFsXHJcblx0ICogY2hhcmFjdGVyIGluIHRoZSBzdHJpbmcsIHNvIHdoZW4gc3BlY2lmaWVkIGluIEFjdGlvblNjcmlwdCwgYSBkb3VibGVcclxuXHQgKiBiYWNrc2xhc2ggbXVzdCBiZSB1c2VkLiBGb3IgZXhhbXBsZSwgdGhlIGZvbGxvd2luZyBjb2RlIGluY2x1ZGVzIG9ubHkgdGhlXHJcblx0ICogZGFzaCgtKSBhbmQgY2FyZXQoXik6PC9wPlxyXG5cdCAqIDxwcmUgeG1sOnNwYWNlPVwicHJlc2VydmVcIj4gbXlfdHh0LnJlc3RyaWN0ID0gXCJcXFxcLVxcXFxeXCI7IDwvcHJlPlxyXG5cdCAqXHJcblx0ICogPHA+VGhlIF4gY2FuIGJlIHVzZWQgYW55d2hlcmUgaW4gdGhlIHN0cmluZyB0byB0b2dnbGUgYmV0d2VlbiBpbmNsdWRpbmdcclxuXHQgKiBjaGFyYWN0ZXJzIGFuZCBleGNsdWRpbmcgY2hhcmFjdGVycy4gVGhlIGZvbGxvd2luZyBjb2RlIGluY2x1ZGVzIG9ubHlcclxuXHQgKiB1cHBlcmNhc2UgbGV0dGVycywgYnV0IGV4Y2x1ZGVzIHRoZSB1cHBlcmNhc2UgbGV0dGVyIFE6PC9wPlxyXG5cdCAqIDxwcmUgeG1sOnNwYWNlPVwicHJlc2VydmVcIj4gbXlfdHh0LnJlc3RyaWN0ID0gXCJBLVpeUVwiOyA8L3ByZT5cclxuXHQgKlxyXG5cdCAqIDxwPllvdSBjYW4gdXNlIHRoZSA8Y29kZT5cXHU8L2NvZGU+IGVzY2FwZSBzZXF1ZW5jZSB0byBjb25zdHJ1Y3RcclxuXHQgKiA8Y29kZT5yZXN0cmljdDwvY29kZT4gc3RyaW5ncy4gVGhlIGZvbGxvd2luZyBjb2RlIGluY2x1ZGVzIG9ubHkgdGhlXHJcblx0ICogY2hhcmFjdGVycyBmcm9tIEFTQ0lJIDMyKHNwYWNlKSB0byBBU0NJSSAxMjYodGlsZGUpLjwvcD5cclxuXHQgKiA8cHJlIHhtbDpzcGFjZT1cInByZXNlcnZlXCI+IG15X3R4dC5yZXN0cmljdCA9IFwiXFx1MDAyMC1cXHUwMDdFXCI7IDwvcHJlPlxyXG5cdCAqIFxyXG5cdCAqIEBkZWZhdWx0IG51bGxcclxuXHQgKi9cclxuXHRwdWJsaWMgcmVzdHJpY3Q6c3RyaW5nO1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgY3VycmVudCBob3Jpem9udGFsIHNjcm9sbGluZyBwb3NpdGlvbi4gSWYgdGhlIDxjb2RlPnNjcm9sbEg8L2NvZGU+XHJcblx0ICogcHJvcGVydHkgaXMgMCwgdGhlIHRleHQgaXMgbm90IGhvcml6b250YWxseSBzY3JvbGxlZC4gVGhpcyBwcm9wZXJ0eSB2YWx1ZVxyXG5cdCAqIGlzIGFuIGludGVnZXIgdGhhdCByZXByZXNlbnRzIHRoZSBob3Jpem9udGFsIHBvc2l0aW9uIGluIHBpeGVscy5cclxuXHQgKlxyXG5cdCAqIDxwPlRoZSB1bml0cyBvZiBob3Jpem9udGFsIHNjcm9sbGluZyBhcmUgcGl4ZWxzLCB3aGVyZWFzIHRoZSB1bml0cyBvZlxyXG5cdCAqIHZlcnRpY2FsIHNjcm9sbGluZyBhcmUgbGluZXMuIEhvcml6b250YWwgc2Nyb2xsaW5nIGlzIG1lYXN1cmVkIGluIHBpeGVsc1xyXG5cdCAqIGJlY2F1c2UgbW9zdCBmb250cyB5b3UgdHlwaWNhbGx5IHVzZSBhcmUgcHJvcG9ydGlvbmFsbHkgc3BhY2VkOyB0aGF0IGlzLFxyXG5cdCAqIHRoZSBjaGFyYWN0ZXJzIGNhbiBoYXZlIGRpZmZlcmVudCB3aWR0aHMuIEZsYXNoIFBsYXllciBwZXJmb3JtcyB2ZXJ0aWNhbFxyXG5cdCAqIHNjcm9sbGluZyBieSBsaW5lIGJlY2F1c2UgdXNlcnMgdXN1YWxseSB3YW50IHRvIHNlZSBhIGNvbXBsZXRlIGxpbmUgb2ZcclxuXHQgKiB0ZXh0IHJhdGhlciB0aGFuIGEgcGFydGlhbCBsaW5lLiBFdmVuIGlmIGEgbGluZSB1c2VzIG11bHRpcGxlIGZvbnRzLCB0aGVcclxuXHQgKiBoZWlnaHQgb2YgdGhlIGxpbmUgYWRqdXN0cyB0byBmaXQgdGhlIGxhcmdlc3QgZm9udCBpbiB1c2UuPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+PGI+Tm90ZTogPC9iPlRoZSA8Y29kZT5zY3JvbGxIPC9jb2RlPiBwcm9wZXJ0eSBpcyB6ZXJvLWJhc2VkLCBub3RcclxuXHQgKiAxLWJhc2VkIGxpa2UgdGhlIDxjb2RlPnNjcm9sbFY8L2NvZGU+IHZlcnRpY2FsIHNjcm9sbGluZyBwcm9wZXJ0eS48L3A+XHJcblx0ICovXHJcblx0cHVibGljIHNjcm9sbEg6bnVtYmVyO1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgdmVydGljYWwgcG9zaXRpb24gb2YgdGV4dCBpbiBhIHRleHQgZmllbGQuIFRoZSA8Y29kZT5zY3JvbGxWPC9jb2RlPlxyXG5cdCAqIHByb3BlcnR5IGlzIHVzZWZ1bCBmb3IgZGlyZWN0aW5nIHVzZXJzIHRvIGEgc3BlY2lmaWMgcGFyYWdyYXBoIGluIGEgbG9uZ1xyXG5cdCAqIHBhc3NhZ2UsIG9yIGNyZWF0aW5nIHNjcm9sbGluZyB0ZXh0IGZpZWxkcy5cclxuXHQgKlxyXG5cdCAqIDxwPlRoZSB1bml0cyBvZiB2ZXJ0aWNhbCBzY3JvbGxpbmcgYXJlIGxpbmVzLCB3aGVyZWFzIHRoZSB1bml0cyBvZlxyXG5cdCAqIGhvcml6b250YWwgc2Nyb2xsaW5nIGFyZSBwaXhlbHMuIElmIHRoZSBmaXJzdCBsaW5lIGRpc3BsYXllZCBpcyB0aGUgZmlyc3RcclxuXHQgKiBsaW5lIGluIHRoZSB0ZXh0IGZpZWxkLCBzY3JvbGxWIGlzIHNldCB0byAxKG5vdCAwKS4gSG9yaXpvbnRhbCBzY3JvbGxpbmdcclxuXHQgKiBpcyBtZWFzdXJlZCBpbiBwaXhlbHMgYmVjYXVzZSBtb3N0IGZvbnRzIGFyZSBwcm9wb3J0aW9uYWxseSBzcGFjZWQ7IHRoYXRcclxuXHQgKiBpcywgdGhlIGNoYXJhY3RlcnMgY2FuIGhhdmUgZGlmZmVyZW50IHdpZHRocy4gRmxhc2ggcGVyZm9ybXMgdmVydGljYWxcclxuXHQgKiBzY3JvbGxpbmcgYnkgbGluZSBiZWNhdXNlIHVzZXJzIHVzdWFsbHkgd2FudCB0byBzZWUgYSBjb21wbGV0ZSBsaW5lIG9mXHJcblx0ICogdGV4dCByYXRoZXIgdGhhbiBhIHBhcnRpYWwgbGluZS4gRXZlbiBpZiB0aGVyZSBhcmUgbXVsdGlwbGUgZm9udHMgb24gYVxyXG5cdCAqIGxpbmUsIHRoZSBoZWlnaHQgb2YgdGhlIGxpbmUgYWRqdXN0cyB0byBmaXQgdGhlIGxhcmdlc3QgZm9udCBpbiB1c2UuPC9wPlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzY3JvbGxWOm51bWJlcjtcclxuXHJcblx0LyoqXHJcblx0ICogQSBCb29sZWFuIHZhbHVlIHRoYXQgaW5kaWNhdGVzIHdoZXRoZXIgdGhlIHRleHQgZmllbGQgaXMgc2VsZWN0YWJsZS4gVGhlXHJcblx0ICogdmFsdWUgPGNvZGU+dHJ1ZTwvY29kZT4gaW5kaWNhdGVzIHRoYXQgdGhlIHRleHQgaXMgc2VsZWN0YWJsZS4gVGhlXHJcblx0ICogPGNvZGU+c2VsZWN0YWJsZTwvY29kZT4gcHJvcGVydHkgY29udHJvbHMgd2hldGhlciBhIHRleHQgZmllbGQgaXNcclxuXHQgKiBzZWxlY3RhYmxlLCBub3Qgd2hldGhlciBhIHRleHQgZmllbGQgaXMgZWRpdGFibGUuIEEgZHluYW1pYyB0ZXh0IGZpZWxkIGNhblxyXG5cdCAqIGJlIHNlbGVjdGFibGUgZXZlbiBpZiBpdCBpcyBub3QgZWRpdGFibGUuIElmIGEgZHluYW1pYyB0ZXh0IGZpZWxkIGlzIG5vdFxyXG5cdCAqIHNlbGVjdGFibGUsIHRoZSB1c2VyIGNhbm5vdCBzZWxlY3QgaXRzIHRleHQuXHJcblx0ICpcclxuXHQgKiA8cD5JZiA8Y29kZT5zZWxlY3RhYmxlPC9jb2RlPiBpcyBzZXQgdG8gPGNvZGU+ZmFsc2U8L2NvZGU+LCB0aGUgdGV4dCBpblxyXG5cdCAqIHRoZSB0ZXh0IGZpZWxkIGRvZXMgbm90IHJlc3BvbmQgdG8gc2VsZWN0aW9uIGNvbW1hbmRzIGZyb20gdGhlIG1vdXNlIG9yXHJcblx0ICoga2V5Ym9hcmQsIGFuZCB0aGUgdGV4dCBjYW5ub3QgYmUgY29waWVkIHdpdGggdGhlIENvcHkgY29tbWFuZC4gSWZcclxuXHQgKiA8Y29kZT5zZWxlY3RhYmxlPC9jb2RlPiBpcyBzZXQgdG8gPGNvZGU+dHJ1ZTwvY29kZT4sIHRoZSB0ZXh0IGluIHRoZSB0ZXh0XHJcblx0ICogZmllbGQgY2FuIGJlIHNlbGVjdGVkIHdpdGggdGhlIG1vdXNlIG9yIGtleWJvYXJkLCBhbmQgdGhlIHRleHQgY2FuIGJlXHJcblx0ICogY29waWVkIHdpdGggdGhlIENvcHkgY29tbWFuZC4gWW91IGNhbiBzZWxlY3QgdGV4dCB0aGlzIHdheSBldmVuIGlmIHRoZVxyXG5cdCAqIHRleHQgZmllbGQgaXMgYSBkeW5hbWljIHRleHQgZmllbGQgaW5zdGVhZCBvZiBhbiBpbnB1dCB0ZXh0IGZpZWxkLiA8L3A+XHJcblx0ICogXHJcblx0ICogQGRlZmF1bHQgdHJ1ZVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzZWxlY3RhYmxlOmJvb2xlYW47XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSB6ZXJvLWJhc2VkIGNoYXJhY3RlciBpbmRleCB2YWx1ZSBvZiB0aGUgZmlyc3QgY2hhcmFjdGVyIGluIHRoZSBjdXJyZW50XHJcblx0ICogc2VsZWN0aW9uLiBGb3IgZXhhbXBsZSwgdGhlIGZpcnN0IGNoYXJhY3RlciBpcyAwLCB0aGUgc2Vjb25kIGNoYXJhY3RlciBpc1xyXG5cdCAqIDEsIGFuZCBzbyBvbi4gSWYgbm8gdGV4dCBpcyBzZWxlY3RlZCwgdGhpcyBwcm9wZXJ0eSBpcyB0aGUgdmFsdWUgb2ZcclxuXHQgKiA8Y29kZT5jYXJldEluZGV4PC9jb2RlPi5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHNlbGVjdGlvbkJlZ2luSW5kZXgoKTpudW1iZXIgLyppbnQqL1xyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9zZWxlY3Rpb25CZWdpbkluZGV4O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIHplcm8tYmFzZWQgY2hhcmFjdGVyIGluZGV4IHZhbHVlIG9mIHRoZSBsYXN0IGNoYXJhY3RlciBpbiB0aGUgY3VycmVudFxyXG5cdCAqIHNlbGVjdGlvbi4gRm9yIGV4YW1wbGUsIHRoZSBmaXJzdCBjaGFyYWN0ZXIgaXMgMCwgdGhlIHNlY29uZCBjaGFyYWN0ZXIgaXNcclxuXHQgKiAxLCBhbmQgc28gb24uIElmIG5vIHRleHQgaXMgc2VsZWN0ZWQsIHRoaXMgcHJvcGVydHkgaXMgdGhlIHZhbHVlIG9mXHJcblx0ICogPGNvZGU+Y2FyZXRJbmRleDwvY29kZT4uXHJcblx0ICovXHJcblx0cHVibGljIGdldCBzZWxlY3Rpb25FbmRJbmRleCgpOm51bWJlciAvKmludCovXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3NlbGVjdGlvbkVuZEluZGV4O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIHNoYXJwbmVzcyBvZiB0aGUgZ2x5cGggZWRnZXMgaW4gdGhpcyB0ZXh0IGZpZWxkLiBUaGlzIHByb3BlcnR5IGFwcGxpZXNcclxuXHQgKiBvbmx5IGlmIHRoZSA8Y29kZT5mbGFzaC50ZXh0LkFudGlBbGlhc1R5cGU8L2NvZGU+IHByb3BlcnR5IG9mIHRoZSB0ZXh0XHJcblx0ICogZmllbGQgaXMgc2V0IHRvIDxjb2RlPmZsYXNoLnRleHQuQW50aUFsaWFzVHlwZS5BRFZBTkNFRDwvY29kZT4uIFRoZSByYW5nZVxyXG5cdCAqIGZvciA8Y29kZT5zaGFycG5lc3M8L2NvZGU+IGlzIGEgbnVtYmVyIGZyb20gLTQwMCB0byA0MDAuIElmIHlvdSBhdHRlbXB0IHRvXHJcblx0ICogc2V0IDxjb2RlPnNoYXJwbmVzczwvY29kZT4gdG8gYSB2YWx1ZSBvdXRzaWRlIHRoYXQgcmFuZ2UsIEZsYXNoIHNldHMgdGhlXHJcblx0ICogcHJvcGVydHkgdG8gdGhlIG5lYXJlc3QgdmFsdWUgaW4gdGhlIHJhbmdlKGVpdGhlciAtNDAwIG9yIDQwMCkuXHJcblx0ICogXHJcblx0ICogQGRlZmF1bHQgMFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzaGFycG5lc3M6bnVtYmVyO1xyXG5cclxuXHQvKipcclxuXHQgKiBBdHRhY2hlcyBhIHN0eWxlIHNoZWV0IHRvIHRoZSB0ZXh0IGZpZWxkLiBGb3IgaW5mb3JtYXRpb24gb24gY3JlYXRpbmdcclxuXHQgKiBzdHlsZSBzaGVldHMsIHNlZSB0aGUgU3R5bGVTaGVldCBjbGFzcyBhbmQgdGhlIDxpPkFjdGlvblNjcmlwdCAzLjBcclxuXHQgKiBEZXZlbG9wZXIncyBHdWlkZTwvaT4uXHJcblx0ICpcclxuXHQgKiA8cD5Zb3UgY2FuIGNoYW5nZSB0aGUgc3R5bGUgc2hlZXQgYXNzb2NpYXRlZCB3aXRoIGEgdGV4dCBmaWVsZCBhdCBhbnlcclxuXHQgKiB0aW1lLiBJZiB5b3UgY2hhbmdlIHRoZSBzdHlsZSBzaGVldCBpbiB1c2UsIHRoZSB0ZXh0IGZpZWxkIGlzIHJlZHJhd24gd2l0aFxyXG5cdCAqIHRoZSBuZXcgc3R5bGUgc2hlZXQuIFlvdSBjYW4gc2V0IHRoZSBzdHlsZSBzaGVldCB0byA8Y29kZT5udWxsPC9jb2RlPiBvclxyXG5cdCAqIDxjb2RlPnVuZGVmaW5lZDwvY29kZT4gdG8gcmVtb3ZlIHRoZSBzdHlsZSBzaGVldC4gSWYgdGhlIHN0eWxlIHNoZWV0IGluXHJcblx0ICogdXNlIGlzIHJlbW92ZWQsIHRoZSB0ZXh0IGZpZWxkIGlzIHJlZHJhd24gd2l0aG91dCBhIHN0eWxlIHNoZWV0LiA8L3A+XHJcblx0ICpcclxuXHQgKiA8cD48Yj5Ob3RlOjwvYj4gSWYgdGhlIHN0eWxlIHNoZWV0IGlzIHJlbW92ZWQsIHRoZSBjb250ZW50cyBvZiBib3RoXHJcblx0ICogPGNvZGU+VGV4dEZpZWxkLnRleHQ8L2NvZGU+IGFuZCA8Y29kZT4gVGV4dEZpZWxkLmh0bWxUZXh0PC9jb2RlPiBjaGFuZ2UgdG9cclxuXHQgKiBpbmNvcnBvcmF0ZSB0aGUgZm9ybWF0dGluZyBwcmV2aW91c2x5IGFwcGxpZWQgYnkgdGhlIHN0eWxlIHNoZWV0LiBUb1xyXG5cdCAqIHByZXNlcnZlIHRoZSBvcmlnaW5hbCA8Y29kZT5UZXh0RmllbGQuaHRtbFRleHQ8L2NvZGU+IGNvbnRlbnRzIHdpdGhvdXQgdGhlXHJcblx0ICogZm9ybWF0dGluZywgc2F2ZSB0aGUgdmFsdWUgaW4gYSB2YXJpYWJsZSBiZWZvcmUgcmVtb3ZpbmcgdGhlIHN0eWxlXHJcblx0ICogc2hlZXQuPC9wPlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzdHlsZVNoZWV0OlN0eWxlU2hlZXQ7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEEgc3RyaW5nIHRoYXQgaXMgdGhlIGN1cnJlbnQgdGV4dCBpbiB0aGUgdGV4dCBmaWVsZC4gTGluZXMgYXJlIHNlcGFyYXRlZFxyXG5cdCAqIGJ5IHRoZSBjYXJyaWFnZSByZXR1cm4gY2hhcmFjdGVyKDxjb2RlPidcXHInPC9jb2RlPiwgQVNDSUkgMTMpLiBUaGlzXHJcblx0ICogcHJvcGVydHkgY29udGFpbnMgdW5mb3JtYXR0ZWQgdGV4dCBpbiB0aGUgdGV4dCBmaWVsZCwgd2l0aG91dCBIVE1MIHRhZ3MuXHJcblx0ICpcclxuXHQgKiA8cD5UbyBnZXQgdGhlIHRleHQgaW4gSFRNTCBmb3JtLCB1c2UgdGhlIDxjb2RlPmh0bWxUZXh0PC9jb2RlPlxyXG5cdCAqIHByb3BlcnR5LjwvcD5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHRleHQoKTpzdHJpbmdcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fdGV4dDtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgdGV4dCh2YWx1ZTpzdHJpbmcpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX3RleHQgPT0gdmFsdWUpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl90ZXh0ID0gdmFsdWU7XHJcblx0XHR0aGlzLnJlQ29uc3RydWN0KCk7XHJcblx0fVxyXG5cdHB1YmxpYyBnZXQgdGV4dEZvcm1hdCgpOlRleHRGb3JtYXRcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fdGV4dEZvcm1hdDtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgdGV4dEZvcm1hdCh2YWx1ZTpUZXh0Rm9ybWF0KVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl90ZXh0Rm9ybWF0ID09IHZhbHVlKVxyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR0aGlzLl90ZXh0Rm9ybWF0ID0gdmFsdWU7XHJcblx0XHR0aGlzLnJlQ29uc3RydWN0KCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgY29sb3Igb2YgdGhlIHRleHQgaW4gYSB0ZXh0IGZpZWxkLCBpbiBoZXhhZGVjaW1hbCBmb3JtYXQuIFRoZVxyXG5cdCAqIGhleGFkZWNpbWFsIGNvbG9yIHN5c3RlbSB1c2VzIHNpeCBkaWdpdHMgdG8gcmVwcmVzZW50IGNvbG9yIHZhbHVlcy4gRWFjaFxyXG5cdCAqIGRpZ2l0IGhhcyAxNiBwb3NzaWJsZSB2YWx1ZXMgb3IgY2hhcmFjdGVycy4gVGhlIGNoYXJhY3RlcnMgcmFuZ2UgZnJvbSAwLTlcclxuXHQgKiBhbmQgdGhlbiBBLUYuIEZvciBleGFtcGxlLCBibGFjayBpcyA8Y29kZT4weDAwMDAwMDwvY29kZT47IHdoaXRlIGlzXHJcblx0ICogPGNvZGU+MHhGRkZGRkY8L2NvZGU+LlxyXG5cdCAqIFxyXG5cdCAqIEBkZWZhdWx0IDAoMHgwMDAwMDApXHJcblx0ICovXHJcblx0cHVibGljIHRleHRDb2xvcjpudW1iZXIgLyppbnQqLztcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGhlaWdodCBvZiB0aGUgdGV4dCBpbiBwaXhlbHMuXHJcblx0ICovXHJcblx0cHVibGljIGdldCB0ZXh0SGVpZ2h0KCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3RleHRIZWlnaHQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgaW50ZXJhY3Rpb24gbW9kZSBwcm9wZXJ0eSwgRGVmYXVsdCB2YWx1ZSBpc1xyXG5cdCAqIFRleHRJbnRlcmFjdGlvbk1vZGUuTk9STUFMLiBPbiBtb2JpbGUgcGxhdGZvcm1zLCB0aGUgbm9ybWFsIG1vZGUgaW1wbGllc1xyXG5cdCAqIHRoYXQgdGhlIHRleHQgY2FuIGJlIHNjcm9sbGVkIGJ1dCBub3Qgc2VsZWN0ZWQuIE9uZSBjYW4gc3dpdGNoIHRvIHRoZVxyXG5cdCAqIHNlbGVjdGFibGUgbW9kZSB0aHJvdWdoIHRoZSBpbi1idWlsdCBjb250ZXh0IG1lbnUgb24gdGhlIHRleHQgZmllbGQuIE9uXHJcblx0ICogRGVza3RvcCwgdGhlIG5vcm1hbCBtb2RlIGltcGxpZXMgdGhhdCB0aGUgdGV4dCBpcyBpbiBzY3JvbGxhYmxlIGFzIHdlbGwgYXNcclxuXHQgKiBzZWxlY3Rpb24gbW9kZS5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHRleHRJbnRlcmFjdGlvbk1vZGUoKTpUZXh0SW50ZXJhY3Rpb25Nb2RlXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3RleHRJbnRlcmFjdGlvbk1vZGU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgd2lkdGggb2YgdGhlIHRleHQgaW4gcGl4ZWxzLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgdGV4dFdpZHRoKCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3RleHRXaWR0aDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSB0aGlja25lc3Mgb2YgdGhlIGdseXBoIGVkZ2VzIGluIHRoaXMgdGV4dCBmaWVsZC4gVGhpcyBwcm9wZXJ0eSBhcHBsaWVzXHJcblx0ICogb25seSB3aGVuIDxjb2RlPkFudGlBbGlhc1R5cGU8L2NvZGU+IGlzIHNldCB0b1xyXG5cdCAqIDxjb2RlPkFudGlBbGlhc1R5cGUuQURWQU5DRUQ8L2NvZGU+LlxyXG5cdCAqXHJcblx0ICogPHA+VGhlIHJhbmdlIGZvciA8Y29kZT50aGlja25lc3M8L2NvZGU+IGlzIGEgbnVtYmVyIGZyb20gLTIwMCB0byAyMDAuIElmXHJcblx0ICogeW91IGF0dGVtcHQgdG8gc2V0IDxjb2RlPnRoaWNrbmVzczwvY29kZT4gdG8gYSB2YWx1ZSBvdXRzaWRlIHRoYXQgcmFuZ2UsXHJcblx0ICogdGhlIHByb3BlcnR5IGlzIHNldCB0byB0aGUgbmVhcmVzdCB2YWx1ZSBpbiB0aGUgcmFuZ2UoZWl0aGVyIC0yMDAgb3JcclxuXHQgKiAyMDApLjwvcD5cclxuXHQgKiBcclxuXHQgKiBAZGVmYXVsdCAwXHJcblx0ICovXHJcblx0cHVibGljIHRoaWNrbmVzczpudW1iZXI7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSB0eXBlIG9mIHRoZSB0ZXh0IGZpZWxkLiBFaXRoZXIgb25lIG9mIHRoZSBmb2xsb3dpbmcgVGV4dEZpZWxkVHlwZVxyXG5cdCAqIGNvbnN0YW50czogPGNvZGU+VGV4dEZpZWxkVHlwZS5EWU5BTUlDPC9jb2RlPiwgd2hpY2ggc3BlY2lmaWVzIGEgZHluYW1pY1xyXG5cdCAqIHRleHQgZmllbGQsIHdoaWNoIGEgdXNlciBjYW5ub3QgZWRpdCwgb3IgPGNvZGU+VGV4dEZpZWxkVHlwZS5JTlBVVDwvY29kZT4sXHJcblx0ICogd2hpY2ggc3BlY2lmaWVzIGFuIGlucHV0IHRleHQgZmllbGQsIHdoaWNoIGEgdXNlciBjYW4gZWRpdC5cclxuXHQgKiBcclxuXHQgKiBAZGVmYXVsdCBkeW5hbWljXHJcblx0ICogQHRocm93cyBBcmd1bWVudEVycm9yIFRoZSA8Y29kZT50eXBlPC9jb2RlPiBzcGVjaWZpZWQgaXMgbm90IGEgbWVtYmVyIG9mXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIGZsYXNoLnRleHQuVGV4dEZpZWxkVHlwZS5cclxuXHQgKi9cclxuXHRwdWJsaWMgdHlwZTpUZXh0RmllbGRUeXBlO1xyXG5cclxuXHQvKipcclxuXHQgKiBTcGVjaWZpZXMgd2hldGhlciB0byBjb3B5IGFuZCBwYXN0ZSB0aGUgdGV4dCBmb3JtYXR0aW5nIGFsb25nIHdpdGggdGhlXHJcblx0ICogdGV4dC4gV2hlbiBzZXQgdG8gPGNvZGU+dHJ1ZTwvY29kZT4sIEZsYXNoIFBsYXllciBjb3BpZXMgYW5kIHBhc3Rlc1xyXG5cdCAqIGZvcm1hdHRpbmcoc3VjaCBhcyBhbGlnbm1lbnQsIGJvbGQsIGFuZCBpdGFsaWNzKSB3aGVuIHlvdSBjb3B5IGFuZCBwYXN0ZVxyXG5cdCAqIGJldHdlZW4gdGV4dCBmaWVsZHMuIEJvdGggdGhlIG9yaWdpbiBhbmQgZGVzdGluYXRpb24gdGV4dCBmaWVsZHMgZm9yIHRoZVxyXG5cdCAqIGNvcHkgYW5kIHBhc3RlIHByb2NlZHVyZSBtdXN0IGhhdmUgPGNvZGU+dXNlUmljaFRleHRDbGlwYm9hcmQ8L2NvZGU+IHNldFxyXG5cdCAqIHRvIDxjb2RlPnRydWU8L2NvZGU+LiBUaGUgZGVmYXVsdCB2YWx1ZSBpcyA8Y29kZT5mYWxzZTwvY29kZT4uXHJcblx0ICovXHJcblx0cHVibGljIHVzZVJpY2hUZXh0Q2xpcGJvYXJkOmJvb2xlYW47XHJcblxyXG5cdC8qKlxyXG5cdCAqIEEgQm9vbGVhbiB2YWx1ZSB0aGF0IGluZGljYXRlcyB3aGV0aGVyIHRoZSB0ZXh0IGZpZWxkIGhhcyB3b3JkIHdyYXAuIElmXHJcblx0ICogdGhlIHZhbHVlIG9mIDxjb2RlPndvcmRXcmFwPC9jb2RlPiBpcyA8Y29kZT50cnVlPC9jb2RlPiwgdGhlIHRleHQgZmllbGRcclxuXHQgKiBoYXMgd29yZCB3cmFwOyBpZiB0aGUgdmFsdWUgaXMgPGNvZGU+ZmFsc2U8L2NvZGU+LCB0aGUgdGV4dCBmaWVsZCBkb2VzIG5vdFxyXG5cdCAqIGhhdmUgd29yZCB3cmFwLiBUaGUgZGVmYXVsdCB2YWx1ZSBpcyA8Y29kZT5mYWxzZTwvY29kZT4uXHJcblx0ICovXHJcblx0cHVibGljIHdvcmRXcmFwOmJvb2xlYW47XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYSBuZXcgVGV4dEZpZWxkIGluc3RhbmNlLiBBZnRlciB5b3UgY3JlYXRlIHRoZSBUZXh0RmllbGQgaW5zdGFuY2UsXHJcblx0ICogY2FsbCB0aGUgPGNvZGU+YWRkQ2hpbGQoKTwvY29kZT4gb3IgPGNvZGU+YWRkQ2hpbGRBdCgpPC9jb2RlPiBtZXRob2Qgb2ZcclxuXHQgKiB0aGUgcGFyZW50IERpc3BsYXlPYmplY3RDb250YWluZXIgb2JqZWN0IHRvIGFkZCB0aGUgVGV4dEZpZWxkIGluc3RhbmNlIHRvXHJcblx0ICogdGhlIGRpc3BsYXkgbGlzdC5cclxuXHQgKlxyXG5cdCAqIDxwPlRoZSBkZWZhdWx0IHNpemUgZm9yIGEgdGV4dCBmaWVsZCBpcyAxMDAgeCAxMDAgcGl4ZWxzLjwvcD5cclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcigpXHJcblx0e1xyXG5cdFx0c3VwZXIobmV3IEdlb21ldHJ5KCkpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVjb25zdHJ1Y3RzIHRoZSBHZW9tZXRyeSBmb3IgdGhpcyBUZXh0LWZpZWxkLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyByZUNvbnN0cnVjdCgpIHtcclxuXHJcblx0XHRmb3IgKHZhciBpOm51bWJlcj10aGlzLmdlb21ldHJ5LnN1Ykdlb21ldHJpZXMubGVuZ3RoLTE7IGk+PTA7IGktLSlcclxuXHRcdFx0dGhpcy5nZW9tZXRyeS5yZW1vdmVTdWJHZW9tZXRyeSh0aGlzLmdlb21ldHJ5LnN1Ykdlb21ldHJpZXNbaV0pO1xyXG5cclxuXHRcdGlmKHRoaXMuX3RleHRGb3JtYXQ9PW51bGwpe1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHRpZih0aGlzLl90ZXh0PT1cIlwiKXtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0dmFyIGluZGljZXM6QXJyYXk8bnVtYmVyPiA9IG5ldyBBcnJheTxudW1iZXI+KCk7XHJcblx0XHR2YXIgcG9zaXRpb25zOkFycmF5PG51bWJlcj4gPSBuZXcgQXJyYXk8bnVtYmVyPigpO1xyXG5cdFx0dmFyIGN1cnZlRGF0YTpBcnJheTxudW1iZXI+ID0gbmV3IEFycmF5PG51bWJlcj4oKTtcclxuXHRcdHZhciB1dnM6QXJyYXk8bnVtYmVyPiA9IG5ldyBBcnJheTxudW1iZXI+KCk7XHJcblxyXG5cdFx0dmFyIGNoYXJfc2NhbGU6bnVtYmVyPXRoaXMuX3RleHRGb3JtYXQuc2l6ZS90aGlzLl90ZXh0Rm9ybWF0LmZvbnRfdGFibGUuZ2V0X2ZvbnRfZW1fc2l6ZSgpO1xyXG5cdFx0dmFyIHRyaV9pZHhfb2Zmc2V0Om51bWJlcj0wO1xyXG5cdFx0dmFyIHRyaV9jbnQ6bnVtYmVyPTA7XHJcblx0XHR2YXIgeF9vZmZzZXQ6bnVtYmVyPTA7XHJcblx0XHR2YXIgeV9vZmZzZXQ6bnVtYmVyPTA7XHJcblx0XHR2YXIgcHJldl9jaGFyOlRlc3NlbGF0ZWRGb250Q2hhciA9IG51bGw7XHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMudGV4dC5sZW5ndGg7IGkrKykge1xyXG5cclxuXHRcdFx0dmFyIHRoaXNfY2hhcjpUZXNzZWxhdGVkRm9udENoYXIgPSA8VGVzc2VsYXRlZEZvbnRDaGFyPiB0aGlzLl90ZXh0Rm9ybWF0LmZvbnRfdGFibGUuZ2V0X3N1Ymdlb19mb3JfY2hhcih0aGlzLl90ZXh0LmNoYXJDb2RlQXQoaSkudG9TdHJpbmcoKSk7XHJcblx0XHRcdGlmKHRoaXNfY2hhciE9IG51bGwpIHtcclxuXHRcdFx0XHR2YXIgdGhpc19zdWJHZW9tOkN1cnZlU3ViR2VvbWV0cnkgPSB0aGlzX2NoYXIuc3ViZ2VvbTtcclxuXHRcdFx0XHRpZiAodGhpc19zdWJHZW9tICE9IG51bGwpIHtcclxuXHRcdFx0XHRcdHRyaV9jbnQgPSAwO1xyXG5cdFx0XHRcdFx0dmFyIGluZGljZXMyOkFycmF5PG51bWJlcj4gPSB0aGlzX3N1Ykdlb20uaW5kaWNlcztcclxuXHRcdFx0XHRcdHZhciBwb3NpdGlvbnMyOkFycmF5PG51bWJlcj4gPSB0aGlzX3N1Ykdlb20ucG9zaXRpb25zO1xyXG5cdFx0XHRcdFx0dmFyIGN1cnZlRGF0YTI6QXJyYXk8bnVtYmVyPiA9IHRoaXNfc3ViR2VvbS5jdXJ2ZXM7XHJcblx0XHRcdFx0XHRmb3IgKHZhciB2ID0gMDsgdiA8IGluZGljZXMyLmxlbmd0aDsgdisrKSB7XHJcblx0XHRcdFx0XHRcdGluZGljZXMucHVzaChpbmRpY2VzMlt2XSArIHRyaV9pZHhfb2Zmc2V0KTtcclxuXHRcdFx0XHRcdFx0dHJpX2NudCsrO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0dHJpX2lkeF9vZmZzZXQgKz0gdHJpX2NudDtcclxuXHRcdFx0XHRcdGZvciAodiA9IDA7IHYgPCBwb3NpdGlvbnMyLmxlbmd0aCAvIDM7IHYrKykge1xyXG5cdFx0XHRcdFx0XHRwb3NpdGlvbnMucHVzaCgocG9zaXRpb25zMlt2ICogM10gKiBjaGFyX3NjYWxlKSArIHhfb2Zmc2V0KTtcclxuXHRcdFx0XHRcdFx0cG9zaXRpb25zLnB1c2goKHBvc2l0aW9uczJbdiAqIDMgKyAxXSAqIGNoYXJfc2NhbGUgKiAtMSkgKyB5X29mZnNldCk7XHJcblx0XHRcdFx0XHRcdHBvc2l0aW9ucy5wdXNoKHBvc2l0aW9uczJbdiAqIDMgKyAyXSk7XHJcblx0XHRcdFx0XHRcdGN1cnZlRGF0YS5wdXNoKGN1cnZlRGF0YTJbdiAqIDJdKTtcclxuXHRcdFx0XHRcdFx0Y3VydmVEYXRhLnB1c2goY3VydmVEYXRhMlt2ICogMiArIDFdKTtcclxuXHRcdFx0XHRcdFx0dXZzLnB1c2godGhpcy5fdGV4dEZvcm1hdC51dl92YWx1ZXNbMF0pO1xyXG5cdFx0XHRcdFx0XHR1dnMucHVzaCh0aGlzLl90ZXh0Rm9ybWF0LnV2X3ZhbHVlc1sxXSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHQvLyBmaW5kIGtlcm5pbmcgdmFsdWUgdGhhdCBoYXMgYmVlbiBzZXQgZm9yIHRoaXMgY2hhcl9jb2RlIG9uIHByZXZpb3VzIGNoYXIgKGlmIG5vbiBleGlzdHMsIGtlcm5pbmdfdmFsdWUgd2lsbCBzdGF5IDApXHJcblx0XHRcdFx0XHR2YXIga2VybmluZ192YWx1ZTpudW1iZXI9MDtcclxuXHRcdFx0XHRcdGlmKHByZXZfY2hhciE9bnVsbCl7XHJcblx0XHRcdFx0XHRcdGZvcih2YXIgazpudW1iZXI9MDsgazxwcmV2X2NoYXIua2VybmluZ0NoYXJDb2Rlcy5sZW5ndGg7aysrKXtcclxuXHRcdFx0XHRcdFx0XHRpZihwcmV2X2NoYXIua2VybmluZ0NoYXJDb2Rlc1trXT09dGhpcy5fdGV4dC5jaGFyQ29kZUF0KGkpKXtcclxuXHRcdFx0XHRcdFx0XHRcdGtlcm5pbmdfdmFsdWU9cHJldl9jaGFyLmtlcm5pbmdWYWx1ZXNba107XHJcblx0XHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHhfb2Zmc2V0ICs9ICgodGhpc19jaGFyLmNoYXJfd2lkdGgra2VybmluZ192YWx1ZSkgKiBjaGFyX3NjYWxlKSArIHRoaXMuX3RleHRGb3JtYXQubGV0dGVyU3BhY2luZztcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHQvLyBpZiBubyBjaGFyLWdlb21ldHJ5IHdhcyBmb3VuZCwgd2UgaW5zZXJ0IGEgXCJzcGFjZVwiXHJcblx0XHRcdFx0XHR4X29mZnNldCArPSB0aGlzLl90ZXh0Rm9ybWF0LmZvbnRfdGFibGUuZ2V0X2ZvbnRfZW1fc2l6ZSgpICogY2hhcl9zY2FsZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0Ly8gaWYgbm8gY2hhci1nZW9tZXRyeSB3YXMgZm91bmQsIHdlIGluc2VydCBhIFwic3BhY2VcIlxyXG5cdFx0XHRcdHhfb2Zmc2V0ICs9IHRoaXMuX3RleHRGb3JtYXQuZm9udF90YWJsZS5nZXRfZm9udF9lbV9zaXplKCkgKiBjaGFyX3NjYWxlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHR2YXIgY3VydmVfc3ViX2dlb206Q3VydmVTdWJHZW9tZXRyeSA9IG5ldyBDdXJ2ZVN1Ykdlb21ldHJ5KHRydWUpO1xyXG5cdFx0Y3VydmVfc3ViX2dlb20udXBkYXRlSW5kaWNlcyhpbmRpY2VzKTtcclxuXHRcdGN1cnZlX3N1Yl9nZW9tLnVwZGF0ZVBvc2l0aW9ucyhwb3NpdGlvbnMpO1xyXG5cdFx0Y3VydmVfc3ViX2dlb20udXBkYXRlQ3VydmVzKGN1cnZlRGF0YSk7XHJcblx0XHRjdXJ2ZV9zdWJfZ2VvbS51cGRhdGVVVnModXZzKTtcclxuXHRcdHRoaXMuZ2VvbWV0cnkuYWRkU3ViR2VvbWV0cnkoY3VydmVfc3ViX2dlb20pO1xyXG5cdFx0dGhpcy5zdWJNZXNoZXNbMF0ubWF0ZXJpYWw9dGhpcy5fdGV4dEZvcm1hdC5tYXRlcmlhbDtcclxuXHR9XHJcblx0LyoqXHJcblx0ICogQXBwZW5kcyB0aGUgc3RyaW5nIHNwZWNpZmllZCBieSB0aGUgPGNvZGU+bmV3VGV4dDwvY29kZT4gcGFyYW1ldGVyIHRvIHRoZVxyXG5cdCAqIGVuZCBvZiB0aGUgdGV4dCBvZiB0aGUgdGV4dCBmaWVsZC4gVGhpcyBtZXRob2QgaXMgbW9yZSBlZmZpY2llbnQgdGhhbiBhblxyXG5cdCAqIGFkZGl0aW9uIGFzc2lnbm1lbnQoPGNvZGU+Kz08L2NvZGU+KSBvbiBhIDxjb2RlPnRleHQ8L2NvZGU+IHByb3BlcnR5XHJcblx0ICogKHN1Y2ggYXMgPGNvZGU+c29tZVRleHRGaWVsZC50ZXh0ICs9IG1vcmVUZXh0PC9jb2RlPiksIHBhcnRpY3VsYXJseSBmb3IgYVxyXG5cdCAqIHRleHQgZmllbGQgdGhhdCBjb250YWlucyBhIHNpZ25pZmljYW50IGFtb3VudCBvZiBjb250ZW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG5ld1RleHQgVGhlIHN0cmluZyB0byBhcHBlbmQgdG8gdGhlIGV4aXN0aW5nIHRleHQuXHJcblx0ICovXHJcblx0cHVibGljIGFwcGVuZFRleHQobmV3VGV4dDpzdHJpbmcpIHtcclxuXHRcdHRoaXMuX3RleHQrPW5ld1RleHQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiAqdGVsbHMgdGhlIFRleHRmaWVsZCB0aGF0IGEgcGFyYWdyYXBoIGlzIGRlZmluZWQgY29tcGxldGx5LlxyXG5cdCAqIGUuZy4gdGhlIHRleHRmaWVsZCB3aWxsIHN0YXJ0IGEgbmV3IGxpbmUgZm9yIGZ1dHVyZSBhZGRlZCB0ZXh0LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBjbG9zZVBhcmFncmFwaCgpXHJcblx0e1xyXG5cdFx0Ly9UT0RPXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIGEgcmVjdGFuZ2xlIHRoYXQgaXMgdGhlIGJvdW5kaW5nIGJveCBvZiB0aGUgY2hhcmFjdGVyLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBjaGFySW5kZXggVGhlIHplcm8tYmFzZWQgaW5kZXggdmFsdWUgZm9yIHRoZSBjaGFyYWN0ZXIoZm9yXHJcblx0ICogICAgICAgICAgICAgICAgICBleGFtcGxlLCB0aGUgZmlyc3QgcG9zaXRpb24gaXMgMCwgdGhlIHNlY29uZCBwb3NpdGlvbiBpc1xyXG5cdCAqICAgICAgICAgICAgICAgICAgMSwgYW5kIHNvIG9uKS5cclxuXHQgKiBAcmV0dXJuIEEgcmVjdGFuZ2xlIHdpdGggPGNvZGU+eDwvY29kZT4gYW5kIDxjb2RlPnk8L2NvZGU+IG1pbmltdW0gYW5kXHJcblx0ICogICAgICAgICBtYXhpbXVtIHZhbHVlcyBkZWZpbmluZyB0aGUgYm91bmRpbmcgYm94IG9mIHRoZSBjaGFyYWN0ZXIuXHJcblx0ICovXHJcblx0cHVibGljIGdldENoYXJCb3VuZGFyaWVzKGNoYXJJbmRleDpudW1iZXIpOlJlY3RhbmdsZVxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9jaGFyQm91bmRhcmllcztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIHplcm8tYmFzZWQgaW5kZXggdmFsdWUgb2YgdGhlIGNoYXJhY3RlciBhdCB0aGUgcG9pbnQgc3BlY2lmaWVkXHJcblx0ICogYnkgdGhlIDxjb2RlPng8L2NvZGU+IGFuZCA8Y29kZT55PC9jb2RlPiBwYXJhbWV0ZXJzLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSB4IFRoZSA8aT54PC9pPiBjb29yZGluYXRlIG9mIHRoZSBjaGFyYWN0ZXIuXHJcblx0ICogQHBhcmFtIHkgVGhlIDxpPnk8L2k+IGNvb3JkaW5hdGUgb2YgdGhlIGNoYXJhY3Rlci5cclxuXHQgKiBAcmV0dXJuIFRoZSB6ZXJvLWJhc2VkIGluZGV4IHZhbHVlIG9mIHRoZSBjaGFyYWN0ZXIoZm9yIGV4YW1wbGUsIHRoZVxyXG5cdCAqICAgICAgICAgZmlyc3QgcG9zaXRpb24gaXMgMCwgdGhlIHNlY29uZCBwb3NpdGlvbiBpcyAxLCBhbmQgc28gb24pLiBSZXR1cm5zXHJcblx0ICogICAgICAgICAtMSBpZiB0aGUgcG9pbnQgaXMgbm90IG92ZXIgYW55IGNoYXJhY3Rlci5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0Q2hhckluZGV4QXRQb2ludCh4Om51bWJlciwgeTpudW1iZXIpOm51bWJlciAvKmludCovXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2NoYXJJbmRleEF0UG9pbnQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHaXZlbiBhIGNoYXJhY3RlciBpbmRleCwgcmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIGZpcnN0IGNoYXJhY3RlciBpbiB0aGVcclxuXHQgKiBzYW1lIHBhcmFncmFwaC5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gY2hhckluZGV4IFRoZSB6ZXJvLWJhc2VkIGluZGV4IHZhbHVlIG9mIHRoZSBjaGFyYWN0ZXIoZm9yIGV4YW1wbGUsXHJcblx0ICogICAgICAgICAgICAgICAgICB0aGUgZmlyc3QgY2hhcmFjdGVyIGlzIDAsIHRoZSBzZWNvbmQgY2hhcmFjdGVyIGlzIDEsIGFuZFxyXG5cdCAqICAgICAgICAgICAgICAgICAgc28gb24pLlxyXG5cdCAqIEByZXR1cm4gVGhlIHplcm8tYmFzZWQgaW5kZXggdmFsdWUgb2YgdGhlIGZpcnN0IGNoYXJhY3RlciBpbiB0aGUgc2FtZVxyXG5cdCAqICAgICAgICAgcGFyYWdyYXBoLlxyXG5cdCAqIEB0aHJvd3MgUmFuZ2VFcnJvciBUaGUgY2hhcmFjdGVyIGluZGV4IHNwZWNpZmllZCBpcyBvdXQgb2YgcmFuZ2UuXHJcblx0ICovXHJcblx0cHVibGljIGdldEZpcnN0Q2hhckluUGFyYWdyYXBoKGNoYXJJbmRleDpudW1iZXIgLyppbnQqLyk6bnVtYmVyIC8qaW50Ki9cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fZmlyc3RDaGFySW5QYXJhZ3JhcGg7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIGEgRGlzcGxheU9iamVjdCByZWZlcmVuY2UgZm9yIHRoZSBnaXZlbiA8Y29kZT5pZDwvY29kZT4sIGZvciBhblxyXG5cdCAqIGltYWdlIG9yIFNXRiBmaWxlIHRoYXQgaGFzIGJlZW4gYWRkZWQgdG8gYW4gSFRNTC1mb3JtYXR0ZWQgdGV4dCBmaWVsZCBieVxyXG5cdCAqIHVzaW5nIGFuIDxjb2RlPjxpbWc+PC9jb2RlPiB0YWcuIFRoZSA8Y29kZT48aW1nPjwvY29kZT4gdGFnIGlzIGluIHRoZVxyXG5cdCAqIGZvbGxvd2luZyBmb3JtYXQ6XHJcblx0ICpcclxuXHQgKiA8cD48cHJlIHhtbDpzcGFjZT1cInByZXNlcnZlXCI+PGNvZGU+IDxpbWcgc3JjID0gJ2ZpbGVuYW1lLmpwZycgaWQgPVxyXG5cdCAqICdpbnN0YW5jZU5hbWUnID48L2NvZGU+PC9wcmU+PC9wPlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBpZCBUaGUgPGNvZGU+aWQ8L2NvZGU+IHRvIG1hdGNoKGluIHRoZSA8Y29kZT5pZDwvY29kZT4gYXR0cmlidXRlXHJcblx0ICogICAgICAgICAgIG9mIHRoZSA8Y29kZT48aW1nPjwvY29kZT4gdGFnKS5cclxuXHQgKiBAcmV0dXJuIFRoZSBkaXNwbGF5IG9iamVjdCBjb3JyZXNwb25kaW5nIHRvIHRoZSBpbWFnZSBvciBTV0YgZmlsZSB3aXRoIHRoZVxyXG5cdCAqICAgICAgICAgbWF0Y2hpbmcgPGNvZGU+aWQ8L2NvZGU+IGF0dHJpYnV0ZSBpbiB0aGUgPGNvZGU+PGltZz48L2NvZGU+IHRhZ1xyXG5cdCAqICAgICAgICAgb2YgdGhlIHRleHQgZmllbGQuIEZvciBtZWRpYSBsb2FkZWQgZnJvbSBhbiBleHRlcm5hbCBzb3VyY2UsIHRoaXNcclxuXHQgKiAgICAgICAgIG9iamVjdCBpcyBhIExvYWRlciBvYmplY3QsIGFuZCwgb25jZSBsb2FkZWQsIHRoZSBtZWRpYSBvYmplY3QgaXMgYVxyXG5cdCAqICAgICAgICAgY2hpbGQgb2YgdGhhdCBMb2FkZXIgb2JqZWN0LiBGb3IgbWVkaWEgZW1iZWRkZWQgaW4gdGhlIFNXRiBmaWxlLFxyXG5cdCAqICAgICAgICAgaXQgaXMgdGhlIGxvYWRlZCBvYmplY3QuIElmIG5vIDxjb2RlPjxpbWc+PC9jb2RlPiB0YWcgd2l0aCB0aGVcclxuXHQgKiAgICAgICAgIG1hdGNoaW5nIDxjb2RlPmlkPC9jb2RlPiBleGlzdHMsIHRoZSBtZXRob2QgcmV0dXJuc1xyXG5cdCAqICAgICAgICAgPGNvZGU+bnVsbDwvY29kZT4uXHJcblx0ICovXHJcblx0cHVibGljIGdldEltYWdlUmVmZXJlbmNlKGlkOnN0cmluZyk6RGlzcGxheU9iamVjdFxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9pbWFnZVJlZmVyZW5jZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIHplcm8tYmFzZWQgaW5kZXggdmFsdWUgb2YgdGhlIGxpbmUgYXQgdGhlIHBvaW50IHNwZWNpZmllZCBieVxyXG5cdCAqIHRoZSA8Y29kZT54PC9jb2RlPiBhbmQgPGNvZGU+eTwvY29kZT4gcGFyYW1ldGVycy5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0geCBUaGUgPGk+eDwvaT4gY29vcmRpbmF0ZSBvZiB0aGUgbGluZS5cclxuXHQgKiBAcGFyYW0geSBUaGUgPGk+eTwvaT4gY29vcmRpbmF0ZSBvZiB0aGUgbGluZS5cclxuXHQgKiBAcmV0dXJuIFRoZSB6ZXJvLWJhc2VkIGluZGV4IHZhbHVlIG9mIHRoZSBsaW5lKGZvciBleGFtcGxlLCB0aGUgZmlyc3RcclxuXHQgKiAgICAgICAgIGxpbmUgaXMgMCwgdGhlIHNlY29uZCBsaW5lIGlzIDEsIGFuZCBzbyBvbikuIFJldHVybnMgLTEgaWYgdGhlXHJcblx0ICogICAgICAgICBwb2ludCBpcyBub3Qgb3ZlciBhbnkgbGluZS5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0TGluZUluZGV4QXRQb2ludCh4Om51bWJlciwgeTpudW1iZXIpOm51bWJlciAvKmludCovXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2xpbmVJbmRleEF0UG9pbnQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRoZSB6ZXJvLWJhc2VkIGluZGV4IHZhbHVlIG9mIHRoZSBsaW5lIGNvbnRhaW5pbmcgdGhlIGNoYXJhY3RlclxyXG5cdCAqIHNwZWNpZmllZCBieSB0aGUgPGNvZGU+Y2hhckluZGV4PC9jb2RlPiBwYXJhbWV0ZXIuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIGNoYXJJbmRleCBUaGUgemVyby1iYXNlZCBpbmRleCB2YWx1ZSBvZiB0aGUgY2hhcmFjdGVyKGZvciBleGFtcGxlLFxyXG5cdCAqICAgICAgICAgICAgICAgICAgdGhlIGZpcnN0IGNoYXJhY3RlciBpcyAwLCB0aGUgc2Vjb25kIGNoYXJhY3RlciBpcyAxLCBhbmRcclxuXHQgKiAgICAgICAgICAgICAgICAgIHNvIG9uKS5cclxuXHQgKiBAcmV0dXJuIFRoZSB6ZXJvLWJhc2VkIGluZGV4IHZhbHVlIG9mIHRoZSBsaW5lLlxyXG5cdCAqIEB0aHJvd3MgUmFuZ2VFcnJvciBUaGUgY2hhcmFjdGVyIGluZGV4IHNwZWNpZmllZCBpcyBvdXQgb2YgcmFuZ2UuXHJcblx0ICovXHJcblx0cHVibGljIGdldExpbmVJbmRleE9mQ2hhcihjaGFySW5kZXg6bnVtYmVyIC8qaW50Ki8pOm51bWJlciAvKmludCovXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2xpbmVJbmRleE9mQ2hhcjtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIG51bWJlciBvZiBjaGFyYWN0ZXJzIGluIGEgc3BlY2lmaWMgdGV4dCBsaW5lLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBsaW5lSW5kZXggVGhlIGxpbmUgbnVtYmVyIGZvciB3aGljaCB5b3Ugd2FudCB0aGUgbGVuZ3RoLlxyXG5cdCAqIEByZXR1cm4gVGhlIG51bWJlciBvZiBjaGFyYWN0ZXJzIGluIHRoZSBsaW5lLlxyXG5cdCAqIEB0aHJvd3MgUmFuZ2VFcnJvciBUaGUgbGluZSBudW1iZXIgc3BlY2lmaWVkIGlzIG91dCBvZiByYW5nZS5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0TGluZUxlbmd0aChsaW5lSW5kZXg6bnVtYmVyIC8qaW50Ki8pOm51bWJlciAvKmludCovXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2xpbmVMZW5ndGg7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIG1ldHJpY3MgaW5mb3JtYXRpb24gYWJvdXQgYSBnaXZlbiB0ZXh0IGxpbmUuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIGxpbmVJbmRleCBUaGUgbGluZSBudW1iZXIgZm9yIHdoaWNoIHlvdSB3YW50IG1ldHJpY3MgaW5mb3JtYXRpb24uXHJcblx0ICogQHJldHVybiBBIFRleHRMaW5lTWV0cmljcyBvYmplY3QuXHJcblx0ICogQHRocm93cyBSYW5nZUVycm9yIFRoZSBsaW5lIG51bWJlciBzcGVjaWZpZWQgaXMgb3V0IG9mIHJhbmdlLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXRMaW5lTWV0cmljcyhsaW5lSW5kZXg6bnVtYmVyIC8qaW50Ki8pOlRleHRMaW5lTWV0cmljc1xyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9saW5lTWV0cmljcztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIGNoYXJhY3RlciBpbmRleCBvZiB0aGUgZmlyc3QgY2hhcmFjdGVyIGluIHRoZSBsaW5lIHRoYXQgdGhlXHJcblx0ICogPGNvZGU+bGluZUluZGV4PC9jb2RlPiBwYXJhbWV0ZXIgc3BlY2lmaWVzLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBsaW5lSW5kZXggVGhlIHplcm8tYmFzZWQgaW5kZXggdmFsdWUgb2YgdGhlIGxpbmUoZm9yIGV4YW1wbGUsIHRoZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgZmlyc3QgbGluZSBpcyAwLCB0aGUgc2Vjb25kIGxpbmUgaXMgMSwgYW5kIHNvIG9uKS5cclxuXHQgKiBAcmV0dXJuIFRoZSB6ZXJvLWJhc2VkIGluZGV4IHZhbHVlIG9mIHRoZSBmaXJzdCBjaGFyYWN0ZXIgaW4gdGhlIGxpbmUuXHJcblx0ICogQHRocm93cyBSYW5nZUVycm9yIFRoZSBsaW5lIG51bWJlciBzcGVjaWZpZWQgaXMgb3V0IG9mIHJhbmdlLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXRMaW5lT2Zmc2V0KGxpbmVJbmRleDpudW1iZXIgLyppbnQqLyk6bnVtYmVyIC8qaW50Ki9cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fbGluZU9mZnNldDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIHRleHQgb2YgdGhlIGxpbmUgc3BlY2lmaWVkIGJ5IHRoZSA8Y29kZT5saW5lSW5kZXg8L2NvZGU+XHJcblx0ICogcGFyYW1ldGVyLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBsaW5lSW5kZXggVGhlIHplcm8tYmFzZWQgaW5kZXggdmFsdWUgb2YgdGhlIGxpbmUoZm9yIGV4YW1wbGUsIHRoZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgZmlyc3QgbGluZSBpcyAwLCB0aGUgc2Vjb25kIGxpbmUgaXMgMSwgYW5kIHNvIG9uKS5cclxuXHQgKiBAcmV0dXJuIFRoZSB0ZXh0IHN0cmluZyBjb250YWluZWQgaW4gdGhlIHNwZWNpZmllZCBsaW5lLlxyXG5cdCAqIEB0aHJvd3MgUmFuZ2VFcnJvciBUaGUgbGluZSBudW1iZXIgc3BlY2lmaWVkIGlzIG91dCBvZiByYW5nZS5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0TGluZVRleHQobGluZUluZGV4Om51bWJlciAvKmludCovKTpzdHJpbmdcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fbGluZVRleHQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHaXZlbiBhIGNoYXJhY3RlciBpbmRleCwgcmV0dXJucyB0aGUgbGVuZ3RoIG9mIHRoZSBwYXJhZ3JhcGggY29udGFpbmluZ1xyXG5cdCAqIHRoZSBnaXZlbiBjaGFyYWN0ZXIuIFRoZSBsZW5ndGggaXMgcmVsYXRpdmUgdG8gdGhlIGZpcnN0IGNoYXJhY3RlciBpbiB0aGVcclxuXHQgKiBwYXJhZ3JhcGgoYXMgcmV0dXJuZWQgYnkgPGNvZGU+Z2V0Rmlyc3RDaGFySW5QYXJhZ3JhcGgoKTwvY29kZT4pLCBub3QgdG9cclxuXHQgKiB0aGUgY2hhcmFjdGVyIGluZGV4IHBhc3NlZCBpbi5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gY2hhckluZGV4IFRoZSB6ZXJvLWJhc2VkIGluZGV4IHZhbHVlIG9mIHRoZSBjaGFyYWN0ZXIoZm9yIGV4YW1wbGUsXHJcblx0ICogICAgICAgICAgICAgICAgICB0aGUgZmlyc3QgY2hhcmFjdGVyIGlzIDAsIHRoZSBzZWNvbmQgY2hhcmFjdGVyIGlzIDEsIGFuZFxyXG5cdCAqICAgICAgICAgICAgICAgICAgc28gb24pLlxyXG5cdCAqIEByZXR1cm4gUmV0dXJucyB0aGUgbnVtYmVyIG9mIGNoYXJhY3RlcnMgaW4gdGhlIHBhcmFncmFwaC5cclxuXHQgKiBAdGhyb3dzIFJhbmdlRXJyb3IgVGhlIGNoYXJhY3RlciBpbmRleCBzcGVjaWZpZWQgaXMgb3V0IG9mIHJhbmdlLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXRQYXJhZ3JhcGhMZW5ndGgoY2hhckluZGV4Om51bWJlciAvKmludCovKTpudW1iZXIgLyppbnQqL1xyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9wYXJhZ3JhcGhMZW5ndGg7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIGEgVGV4dEZvcm1hdCBvYmplY3QgdGhhdCBjb250YWlucyBmb3JtYXR0aW5nIGluZm9ybWF0aW9uIGZvciB0aGVcclxuXHQgKiByYW5nZSBvZiB0ZXh0IHRoYXQgdGhlIDxjb2RlPmJlZ2luSW5kZXg8L2NvZGU+IGFuZCA8Y29kZT5lbmRJbmRleDwvY29kZT5cclxuXHQgKiBwYXJhbWV0ZXJzIHNwZWNpZnkuIE9ubHkgcHJvcGVydGllcyB0aGF0IGFyZSBjb21tb24gdG8gdGhlIGVudGlyZSB0ZXh0XHJcblx0ICogc3BlY2lmaWVkIGFyZSBzZXQgaW4gdGhlIHJlc3VsdGluZyBUZXh0Rm9ybWF0IG9iamVjdC4gQW55IHByb3BlcnR5IHRoYXQgaXNcclxuXHQgKiA8aT5taXhlZDwvaT4sIG1lYW5pbmcgdGhhdCBpdCBoYXMgZGlmZmVyZW50IHZhbHVlcyBhdCBkaWZmZXJlbnQgcG9pbnRzIGluXHJcblx0ICogdGhlIHRleHQsIGhhcyBhIHZhbHVlIG9mIDxjb2RlPm51bGw8L2NvZGU+LlxyXG5cdCAqXHJcblx0ICogPHA+SWYgeW91IGRvIG5vdCBzcGVjaWZ5IHZhbHVlcyBmb3IgdGhlc2UgcGFyYW1ldGVycywgdGhpcyBtZXRob2QgaXNcclxuXHQgKiBhcHBsaWVkIHRvIGFsbCB0aGUgdGV4dCBpbiB0aGUgdGV4dCBmaWVsZC4gPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+VGhlIGZvbGxvd2luZyB0YWJsZSBkZXNjcmliZXMgdGhyZWUgcG9zc2libGUgdXNhZ2VzOjwvcD5cclxuXHQgKiBcclxuXHQgKiBAcmV0dXJuIFRoZSBUZXh0Rm9ybWF0IG9iamVjdCB0aGF0IHJlcHJlc2VudHMgdGhlIGZvcm1hdHRpbmcgcHJvcGVydGllc1xyXG5cdCAqICAgICAgICAgZm9yIHRoZSBzcGVjaWZpZWQgdGV4dC5cclxuXHQgKiBAdGhyb3dzIFJhbmdlRXJyb3IgVGhlIDxjb2RlPmJlZ2luSW5kZXg8L2NvZGU+IG9yIDxjb2RlPmVuZEluZGV4PC9jb2RlPlxyXG5cdCAqICAgICAgICAgICAgICAgICAgICBzcGVjaWZpZWQgaXMgb3V0IG9mIHJhbmdlLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXRUZXh0Rm9ybWF0KGJlZ2luSW5kZXg6bnVtYmVyIC8qaW50Ki8gPSAtMSwgZW5kSW5kZXg6bnVtYmVyIC8qaW50Ki8gPSAtMSk6VGV4dEZvcm1hdFxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl90ZXh0Rm9ybWF0O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVwbGFjZXMgdGhlIGN1cnJlbnQgc2VsZWN0aW9uIHdpdGggdGhlIGNvbnRlbnRzIG9mIHRoZSA8Y29kZT52YWx1ZTwvY29kZT5cclxuXHQgKiBwYXJhbWV0ZXIuIFRoZSB0ZXh0IGlzIGluc2VydGVkIGF0IHRoZSBwb3NpdGlvbiBvZiB0aGUgY3VycmVudCBzZWxlY3Rpb24sXHJcblx0ICogdXNpbmcgdGhlIGN1cnJlbnQgZGVmYXVsdCBjaGFyYWN0ZXIgZm9ybWF0IGFuZCBkZWZhdWx0IHBhcmFncmFwaCBmb3JtYXQuXHJcblx0ICogVGhlIHRleHQgaXMgbm90IHRyZWF0ZWQgYXMgSFRNTC5cclxuXHQgKlxyXG5cdCAqIDxwPllvdSBjYW4gdXNlIHRoZSA8Y29kZT5yZXBsYWNlU2VsZWN0ZWRUZXh0KCk8L2NvZGU+IG1ldGhvZCB0byBpbnNlcnQgYW5kXHJcblx0ICogZGVsZXRlIHRleHQgd2l0aG91dCBkaXNydXB0aW5nIHRoZSBjaGFyYWN0ZXIgYW5kIHBhcmFncmFwaCBmb3JtYXR0aW5nIG9mXHJcblx0ICogdGhlIHJlc3Qgb2YgdGhlIHRleHQuPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+PGI+Tm90ZTo8L2I+IFRoaXMgbWV0aG9kIGRvZXMgbm90IHdvcmsgaWYgYSBzdHlsZSBzaGVldCBpcyBhcHBsaWVkIHRvXHJcblx0ICogdGhlIHRleHQgZmllbGQuPC9wPlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSB2YWx1ZSBUaGUgc3RyaW5nIHRvIHJlcGxhY2UgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCB0ZXh0LlxyXG5cdCAqIEB0aHJvd3MgRXJyb3IgVGhpcyBtZXRob2QgY2Fubm90IGJlIHVzZWQgb24gYSB0ZXh0IGZpZWxkIHdpdGggYSBzdHlsZVxyXG5cdCAqICAgICAgICAgICAgICAgc2hlZXQuXHJcblx0ICovXHJcblx0cHVibGljIHJlcGxhY2VTZWxlY3RlZFRleHQodmFsdWU6c3RyaW5nKVxyXG5cdHtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXBsYWNlcyB0aGUgcmFuZ2Ugb2YgY2hhcmFjdGVycyB0aGF0IHRoZSA8Y29kZT5iZWdpbkluZGV4PC9jb2RlPiBhbmRcclxuXHQgKiA8Y29kZT5lbmRJbmRleDwvY29kZT4gcGFyYW1ldGVycyBzcGVjaWZ5IHdpdGggdGhlIGNvbnRlbnRzIG9mIHRoZVxyXG5cdCAqIDxjb2RlPm5ld1RleHQ8L2NvZGU+IHBhcmFtZXRlci4gQXMgZGVzaWduZWQsIHRoZSB0ZXh0IGZyb21cclxuXHQgKiA8Y29kZT5iZWdpbkluZGV4PC9jb2RlPiB0byA8Y29kZT5lbmRJbmRleC0xPC9jb2RlPiBpcyByZXBsYWNlZC5cclxuXHQgKlxyXG5cdCAqIDxwPjxiPk5vdGU6PC9iPiBUaGlzIG1ldGhvZCBkb2VzIG5vdCB3b3JrIGlmIGEgc3R5bGUgc2hlZXQgaXMgYXBwbGllZCB0b1xyXG5cdCAqIHRoZSB0ZXh0IGZpZWxkLjwvcD5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gYmVnaW5JbmRleCBUaGUgemVyby1iYXNlZCBpbmRleCB2YWx1ZSBmb3IgdGhlIHN0YXJ0IHBvc2l0aW9uIG9mIHRoZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgIHJlcGxhY2VtZW50IHJhbmdlLlxyXG5cdCAqIEBwYXJhbSBlbmRJbmRleCAgIFRoZSB6ZXJvLWJhc2VkIGluZGV4IHBvc2l0aW9uIG9mIHRoZSBmaXJzdCBjaGFyYWN0ZXJcclxuXHQgKiAgICAgICAgICAgICAgICAgICBhZnRlciB0aGUgZGVzaXJlZCB0ZXh0IHNwYW4uXHJcblx0ICogQHBhcmFtIG5ld1RleHQgICAgVGhlIHRleHQgdG8gdXNlIHRvIHJlcGxhY2UgdGhlIHNwZWNpZmllZCByYW5nZSBvZlxyXG5cdCAqICAgICAgICAgICAgICAgICAgIGNoYXJhY3RlcnMuXHJcblx0ICogQHRocm93cyBFcnJvciBUaGlzIG1ldGhvZCBjYW5ub3QgYmUgdXNlZCBvbiBhIHRleHQgZmllbGQgd2l0aCBhIHN0eWxlXHJcblx0ICogICAgICAgICAgICAgICBzaGVldC5cclxuXHQgKi9cclxuXHRwdWJsaWMgcmVwbGFjZVRleHQoYmVnaW5JbmRleDpudW1iZXIgLyppbnQqLywgZW5kSW5kZXg6bnVtYmVyIC8qaW50Ki8sIG5ld1RleHQ6c3RyaW5nKVxyXG5cdHtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIGFzIHNlbGVjdGVkIHRoZSB0ZXh0IGRlc2lnbmF0ZWQgYnkgdGhlIGluZGV4IHZhbHVlcyBvZiB0aGUgZmlyc3QgYW5kXHJcblx0ICogbGFzdCBjaGFyYWN0ZXJzLCB3aGljaCBhcmUgc3BlY2lmaWVkIHdpdGggdGhlIDxjb2RlPmJlZ2luSW5kZXg8L2NvZGU+IGFuZFxyXG5cdCAqIDxjb2RlPmVuZEluZGV4PC9jb2RlPiBwYXJhbWV0ZXJzLiBJZiB0aGUgdHdvIHBhcmFtZXRlciB2YWx1ZXMgYXJlIHRoZVxyXG5cdCAqIHNhbWUsIHRoaXMgbWV0aG9kIHNldHMgdGhlIGluc2VydGlvbiBwb2ludCwgYXMgaWYgeW91IHNldCB0aGVcclxuXHQgKiA8Y29kZT5jYXJldEluZGV4PC9jb2RlPiBwcm9wZXJ0eS5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gYmVnaW5JbmRleCBUaGUgemVyby1iYXNlZCBpbmRleCB2YWx1ZSBvZiB0aGUgZmlyc3QgY2hhcmFjdGVyIGluIHRoZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbihmb3IgZXhhbXBsZSwgdGhlIGZpcnN0IGNoYXJhY3RlciBpcyAwLCB0aGVcclxuXHQgKiAgICAgICAgICAgICAgICAgICBzZWNvbmQgY2hhcmFjdGVyIGlzIDEsIGFuZCBzbyBvbikuXHJcblx0ICogQHBhcmFtIGVuZEluZGV4ICAgVGhlIHplcm8tYmFzZWQgaW5kZXggdmFsdWUgb2YgdGhlIGxhc3QgY2hhcmFjdGVyIGluIHRoZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbi5cclxuXHQgKi9cclxuXHRwdWJsaWMgc2V0U2VsZWN0aW9uKGJlZ2luSW5kZXg6bnVtYmVyIC8qaW50Ki8sIGVuZEluZGV4Om51bWJlciAvKmludCovKVxyXG5cdHtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBcHBsaWVzIHRoZSB0ZXh0IGZvcm1hdHRpbmcgdGhhdCB0aGUgPGNvZGU+Zm9ybWF0PC9jb2RlPiBwYXJhbWV0ZXJcclxuXHQgKiBzcGVjaWZpZXMgdG8gdGhlIHNwZWNpZmllZCB0ZXh0IGluIGEgdGV4dCBmaWVsZC4gVGhlIHZhbHVlIG9mXHJcblx0ICogPGNvZGU+Zm9ybWF0PC9jb2RlPiBtdXN0IGJlIGEgVGV4dEZvcm1hdCBvYmplY3QgdGhhdCBzcGVjaWZpZXMgdGhlIGRlc2lyZWRcclxuXHQgKiB0ZXh0IGZvcm1hdHRpbmcgY2hhbmdlcy4gT25seSB0aGUgbm9uLW51bGwgcHJvcGVydGllcyBvZlxyXG5cdCAqIDxjb2RlPmZvcm1hdDwvY29kZT4gYXJlIGFwcGxpZWQgdG8gdGhlIHRleHQgZmllbGQuIEFueSBwcm9wZXJ0eSBvZlxyXG5cdCAqIDxjb2RlPmZvcm1hdDwvY29kZT4gdGhhdCBpcyBzZXQgdG8gPGNvZGU+bnVsbDwvY29kZT4gaXMgbm90IGFwcGxpZWQuIEJ5XHJcblx0ICogZGVmYXVsdCwgYWxsIG9mIHRoZSBwcm9wZXJ0aWVzIG9mIGEgbmV3bHkgY3JlYXRlZCBUZXh0Rm9ybWF0IG9iamVjdCBhcmVcclxuXHQgKiBzZXQgdG8gPGNvZGU+bnVsbDwvY29kZT4uXHJcblx0ICpcclxuXHQgKiA8cD48Yj5Ob3RlOjwvYj4gVGhpcyBtZXRob2QgZG9lcyBub3Qgd29yayBpZiBhIHN0eWxlIHNoZWV0IGlzIGFwcGxpZWQgdG9cclxuXHQgKiB0aGUgdGV4dCBmaWVsZC48L3A+XHJcblx0ICpcclxuXHQgKiA8cD5UaGUgPGNvZGU+c2V0VGV4dEZvcm1hdCgpPC9jb2RlPiBtZXRob2QgY2hhbmdlcyB0aGUgdGV4dCBmb3JtYXR0aW5nXHJcblx0ICogYXBwbGllZCB0byBhIHJhbmdlIG9mIGNoYXJhY3RlcnMgb3IgdG8gdGhlIGVudGlyZSBib2R5IG9mIHRleHQgaW4gYSB0ZXh0XHJcblx0ICogZmllbGQuIFRvIGFwcGx5IHRoZSBwcm9wZXJ0aWVzIG9mIGZvcm1hdCB0byBhbGwgdGV4dCBpbiB0aGUgdGV4dCBmaWVsZCwgZG9cclxuXHQgKiBub3Qgc3BlY2lmeSB2YWx1ZXMgZm9yIDxjb2RlPmJlZ2luSW5kZXg8L2NvZGU+IGFuZCA8Y29kZT5lbmRJbmRleDwvY29kZT4uXHJcblx0ICogVG8gYXBwbHkgdGhlIHByb3BlcnRpZXMgb2YgdGhlIGZvcm1hdCB0byBhIHJhbmdlIG9mIHRleHQsIHNwZWNpZnkgdmFsdWVzXHJcblx0ICogZm9yIHRoZSA8Y29kZT5iZWdpbkluZGV4PC9jb2RlPiBhbmQgdGhlIDxjb2RlPmVuZEluZGV4PC9jb2RlPiBwYXJhbWV0ZXJzLlxyXG5cdCAqIFlvdSBjYW4gdXNlIHRoZSA8Y29kZT5sZW5ndGg8L2NvZGU+IHByb3BlcnR5IHRvIGRldGVybWluZSB0aGUgaW5kZXhcclxuXHQgKiB2YWx1ZXMuPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+VGhlIHR3byB0eXBlcyBvZiBmb3JtYXR0aW5nIGluZm9ybWF0aW9uIGluIGEgVGV4dEZvcm1hdCBvYmplY3QgYXJlXHJcblx0ICogY2hhcmFjdGVyIGxldmVsIGZvcm1hdHRpbmcgYW5kIHBhcmFncmFwaCBsZXZlbCBmb3JtYXR0aW5nLiBFYWNoIGNoYXJhY3RlclxyXG5cdCAqIGluIGEgdGV4dCBmaWVsZCBjYW4gaGF2ZSBpdHMgb3duIGNoYXJhY3RlciBmb3JtYXR0aW5nIHNldHRpbmdzLCBzdWNoIGFzXHJcblx0ICogZm9udCBuYW1lLCBmb250IHNpemUsIGJvbGQsIGFuZCBpdGFsaWMuPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+Rm9yIHBhcmFncmFwaHMsIHRoZSBmaXJzdCBjaGFyYWN0ZXIgb2YgdGhlIHBhcmFncmFwaCBpcyBleGFtaW5lZCBmb3JcclxuXHQgKiB0aGUgcGFyYWdyYXBoIGZvcm1hdHRpbmcgc2V0dGluZ3MgZm9yIHRoZSBlbnRpcmUgcGFyYWdyYXBoLiBFeGFtcGxlcyBvZlxyXG5cdCAqIHBhcmFncmFwaCBmb3JtYXR0aW5nIHNldHRpbmdzIGFyZSBsZWZ0IG1hcmdpbiwgcmlnaHQgbWFyZ2luLCBhbmRcclxuXHQgKiBpbmRlbnRhdGlvbi48L3A+XHJcblx0ICpcclxuXHQgKiA8cD5BbnkgdGV4dCBpbnNlcnRlZCBtYW51YWxseSBieSB0aGUgdXNlciwgb3IgcmVwbGFjZWQgYnkgdGhlXHJcblx0ICogPGNvZGU+cmVwbGFjZVNlbGVjdGVkVGV4dCgpPC9jb2RlPiBtZXRob2QsIHJlY2VpdmVzIHRoZSBkZWZhdWx0IHRleHQgZmllbGRcclxuXHQgKiBmb3JtYXR0aW5nIGZvciBuZXcgdGV4dCwgYW5kIG5vdCB0aGUgZm9ybWF0dGluZyBzcGVjaWZpZWQgZm9yIHRoZSB0ZXh0XHJcblx0ICogaW5zZXJ0aW9uIHBvaW50LiBUbyBzZXQgdGhlIGRlZmF1bHQgZm9ybWF0dGluZyBmb3IgbmV3IHRleHQsIHVzZVxyXG5cdCAqIDxjb2RlPmRlZmF1bHRUZXh0Rm9ybWF0PC9jb2RlPi48L3A+XHJcblx0ICogXHJcblx0ICogQHBhcmFtIGZvcm1hdCBBIFRleHRGb3JtYXQgb2JqZWN0IHRoYXQgY29udGFpbnMgY2hhcmFjdGVyIGFuZCBwYXJhZ3JhcGhcclxuXHQgKiAgICAgICAgICAgICAgIGZvcm1hdHRpbmcgaW5mb3JtYXRpb24uXHJcblx0ICogQHRocm93cyBFcnJvciAgICAgIFRoaXMgbWV0aG9kIGNhbm5vdCBiZSB1c2VkIG9uIGEgdGV4dCBmaWVsZCB3aXRoIGEgc3R5bGVcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgc2hlZXQuXHJcblx0ICogQHRocm93cyBSYW5nZUVycm9yIFRoZSA8Y29kZT5iZWdpbkluZGV4PC9jb2RlPiBvciA8Y29kZT5lbmRJbmRleDwvY29kZT5cclxuXHQgKiAgICAgICAgICAgICAgICAgICAgc3BlY2lmaWVkIGlzIG91dCBvZiByYW5nZS5cclxuXHQgKi9cclxuXHRwdWJsaWMgc2V0VGV4dEZvcm1hdChmb3JtYXQ6VGV4dEZvcm1hdCwgYmVnaW5JbmRleDpudW1iZXIgLyppbnQqLyA9IC0xLCBlbmRJbmRleDpudW1iZXIgLyppbnQqLyA9IC0xKVxyXG5cdHtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRydWUgaWYgYW4gZW1iZWRkZWQgZm9udCBpcyBhdmFpbGFibGUgd2l0aCB0aGUgc3BlY2lmaWVkXHJcblx0ICogPGNvZGU+Zm9udE5hbWU8L2NvZGU+IGFuZCA8Y29kZT5mb250U3R5bGU8L2NvZGU+IHdoZXJlXHJcblx0ICogPGNvZGU+Rm9udC5mb250VHlwZTwvY29kZT4gaXMgPGNvZGU+Zmxhc2gudGV4dC5Gb250VHlwZS5FTUJFRERFRDwvY29kZT4uXHJcblx0ICogU3RhcnRpbmcgd2l0aCBGbGFzaCBQbGF5ZXIgMTAsIHR3byBraW5kcyBvZiBlbWJlZGRlZCBmb250cyBjYW4gYXBwZWFyIGluIGFcclxuXHQgKiBTV0YgZmlsZS4gTm9ybWFsIGVtYmVkZGVkIGZvbnRzIGFyZSBvbmx5IHVzZWQgd2l0aCBUZXh0RmllbGQgb2JqZWN0cy4gQ0ZGXHJcblx0ICogZW1iZWRkZWQgZm9udHMgYXJlIG9ubHkgdXNlZCB3aXRoIHRoZSBmbGFzaC50ZXh0LmVuZ2luZSBjbGFzc2VzLiBUaGUgdHdvXHJcblx0ICogdHlwZXMgYXJlIGRpc3Rpbmd1aXNoZWQgYnkgdGhlIDxjb2RlPmZvbnRUeXBlPC9jb2RlPiBwcm9wZXJ0eSBvZiB0aGVcclxuXHQgKiA8Y29kZT5Gb250PC9jb2RlPiBjbGFzcywgYXMgcmV0dXJuZWQgYnkgdGhlIDxjb2RlPmVudW1lcmF0ZUZvbnRzKCk8L2NvZGU+XHJcblx0ICogZnVuY3Rpb24uXHJcblx0ICpcclxuXHQgKiA8cD5UZXh0RmllbGQgY2Fubm90IHVzZSBhIGZvbnQgb2YgdHlwZSA8Y29kZT5FTUJFRERFRF9DRkY8L2NvZGU+LiBJZlxyXG5cdCAqIDxjb2RlPmVtYmVkRm9udHM8L2NvZGU+IGlzIHNldCB0byA8Y29kZT50cnVlPC9jb2RlPiBhbmQgdGhlIG9ubHkgZm9udFxyXG5cdCAqIGF2YWlsYWJsZSBhdCBydW4gdGltZSB3aXRoIHRoZSBzcGVjaWZpZWQgbmFtZSBhbmQgc3R5bGUgaXMgb2YgdHlwZVxyXG5cdCAqIDxjb2RlPkVNQkVEREVEX0NGRjwvY29kZT4sIEZsYXNoIFBsYXllciBmYWlscyB0byByZW5kZXIgdGhlIHRleHQsIGFzIGlmIG5vXHJcblx0ICogZW1iZWRkZWQgZm9udCB3ZXJlIGF2YWlsYWJsZSB3aXRoIHRoZSBzcGVjaWZpZWQgbmFtZSBhbmQgc3R5bGUuPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+SWYgYm90aCA8Y29kZT5FTUJFRERFRDwvY29kZT4gYW5kIDxjb2RlPkVNQkVEREVEX0NGRjwvY29kZT4gZm9udHMgYXJlXHJcblx0ICogYXZhaWxhYmxlIHdpdGggdGhlIHNhbWUgbmFtZSBhbmQgc3R5bGUsIHRoZSA8Y29kZT5FTUJFRERFRDwvY29kZT4gZm9udCBpc1xyXG5cdCAqIHNlbGVjdGVkIGFuZCB0ZXh0IHJlbmRlcnMgd2l0aCB0aGUgPGNvZGU+RU1CRURERUQ8L2NvZGU+IGZvbnQuPC9wPlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBmb250TmFtZSAgVGhlIG5hbWUgb2YgdGhlIGVtYmVkZGVkIGZvbnQgdG8gY2hlY2suXHJcblx0ICogQHBhcmFtIGZvbnRTdHlsZSBTcGVjaWZpZXMgdGhlIGZvbnQgc3R5bGUgdG8gY2hlY2suIFVzZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgPGNvZGU+Zmxhc2gudGV4dC5Gb250U3R5bGU8L2NvZGU+XHJcblx0ICogQHJldHVybiA8Y29kZT50cnVlPC9jb2RlPiBpZiBhIGNvbXBhdGlibGUgZW1iZWRkZWQgZm9udCBpcyBhdmFpbGFibGUsXHJcblx0ICogICAgICAgICBvdGhlcndpc2UgPGNvZGU+ZmFsc2U8L2NvZGU+LlxyXG5cdCAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciBUaGUgPGNvZGU+Zm9udFN0eWxlPC9jb2RlPiBzcGVjaWZpZWQgaXMgbm90IGEgbWVtYmVyXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIG9mIDxjb2RlPmZsYXNoLnRleHQuRm9udFN0eWxlPC9jb2RlPi5cclxuXHQgKi9cclxuXHRwdWJsaWMgc3RhdGljIGlzRm9udENvbXBhdGlibGUoZm9udE5hbWU6c3RyaW5nLCBmb250U3R5bGU6c3RyaW5nKTpib29sZWFuXHJcblx0e1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0ID0gVGV4dEZpZWxkOyJdfQ==