var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Mesh = require("awayjs-display/lib/entities/Mesh");
var Geometry = require("awayjs-core/lib/data/Geometry");
var CurveSubGeometry = require("awayjs-core/lib/data/CurveSubGeometry");
var AssetType = require("awayjs-core/lib/library/AssetType");
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
    Object.defineProperty(TextField.prototype, "assetType", {
        get: function () {
            return AssetType.TEXTFIELD;
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
    return TextField;
})(Mesh);
module.exports = TextField;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9UZXh0RmllbGQudHMiXSwibmFtZXMiOlsiVGV4dEZpZWxkIiwiVGV4dEZpZWxkLmNvbnN0cnVjdG9yIiwiVGV4dEZpZWxkLmJvdHRvbVNjcm9sbFYiLCJUZXh0RmllbGQuY2FyZXRJbmRleCIsIlRleHRGaWVsZC5sZW5ndGgiLCJUZXh0RmllbGQubWF4U2Nyb2xsSCIsIlRleHRGaWVsZC5tYXhTY3JvbGxWIiwiVGV4dEZpZWxkLm51bUxpbmVzIiwiVGV4dEZpZWxkLnNlbGVjdGlvbkJlZ2luSW5kZXgiLCJUZXh0RmllbGQuc2VsZWN0aW9uRW5kSW5kZXgiLCJUZXh0RmllbGQudGV4dCIsIlRleHRGaWVsZC50ZXh0Rm9ybWF0IiwiVGV4dEZpZWxkLnRleHRIZWlnaHQiLCJUZXh0RmllbGQudGV4dEludGVyYWN0aW9uTW9kZSIsIlRleHRGaWVsZC50ZXh0V2lkdGgiLCJUZXh0RmllbGQuYXNzZXRUeXBlIiwiVGV4dEZpZWxkLnJlQ29uc3RydWN0IiwiVGV4dEZpZWxkLmFwcGVuZFRleHQiLCJUZXh0RmllbGQuY2xvc2VQYXJhZ3JhcGgiLCJUZXh0RmllbGQuZ2V0Q2hhckJvdW5kYXJpZXMiLCJUZXh0RmllbGQuZ2V0Q2hhckluZGV4QXRQb2ludCIsIlRleHRGaWVsZC5nZXRGaXJzdENoYXJJblBhcmFncmFwaCIsIlRleHRGaWVsZC5nZXRJbWFnZVJlZmVyZW5jZSIsIlRleHRGaWVsZC5nZXRMaW5lSW5kZXhBdFBvaW50IiwiVGV4dEZpZWxkLmdldExpbmVJbmRleE9mQ2hhciIsIlRleHRGaWVsZC5nZXRMaW5lTGVuZ3RoIiwiVGV4dEZpZWxkLmdldExpbmVNZXRyaWNzIiwiVGV4dEZpZWxkLmdldExpbmVPZmZzZXQiLCJUZXh0RmllbGQuZ2V0TGluZVRleHQiLCJUZXh0RmllbGQuZ2V0UGFyYWdyYXBoTGVuZ3RoIiwiVGV4dEZpZWxkLmdldFRleHRGb3JtYXQiLCJUZXh0RmllbGQucmVwbGFjZVNlbGVjdGVkVGV4dCIsIlRleHRGaWVsZC5yZXBsYWNlVGV4dCIsIlRleHRGaWVsZC5zZXRTZWxlY3Rpb24iLCJUZXh0RmllbGQuc2V0VGV4dEZvcm1hdCIsIlRleHRGaWVsZC5pc0ZvbnRDb21wYXRpYmxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFVQSxJQUFPLElBQUksV0FBaUIsa0NBQWtDLENBQUMsQ0FBQztBQUNoRSxJQUFPLFFBQVEsV0FBZ0IsK0JBQStCLENBQUMsQ0FBQztBQUVoRSxJQUFPLGdCQUFnQixXQUFlLHVDQUF1QyxDQUFDLENBQUM7QUFLL0UsSUFBTyxTQUFTLFdBQWUsbUNBQW1DLENBQUMsQ0FBQztBQUNwRSxBQStFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBREc7SUFDRyxTQUFTO0lBQVNBLFVBQWxCQSxTQUFTQSxVQUFhQTtJQXlsQjNCQTs7Ozs7OztPQU9HQTtJQUNIQSxTQWptQktBLFNBQVNBO1FBbW1CYkMsa0JBQU1BLElBQUlBLFFBQVFBLEVBQUVBLENBQUNBLENBQUNBO1FBemxCZkEsVUFBS0EsR0FBVUEsRUFBRUEsQ0FBQ0E7SUEwbEIxQkEsQ0FBQ0E7SUF6ZERELHNCQUFXQSxvQ0FBYUE7UUFUeEJBOzs7Ozs7OztXQVFHQTthQUNIQTtZQUVDRSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQTtRQUM1QkEsQ0FBQ0E7OztPQUFBRjtJQVdEQSxzQkFBV0EsaUNBQVVBO1FBVHJCQTs7Ozs7Ozs7V0FRR0E7YUFDSEE7WUFFQ0csTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0E7UUFDekJBLENBQUNBOzs7T0FBQUg7SUEyR0RBLHNCQUFXQSw2QkFBTUE7UUFKakJBOzs7V0FHR0E7YUFDSEE7WUFFQ0ksTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7UUFDckJBLENBQUNBOzs7T0FBQUo7SUFhREE7O09BRUdBO0lBQ0lBLDhCQUFVQSxHQUFq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Q0FBQ0EsQ0FBQ0EsQ0FBQ0EsUUFBUUEsRUFBRUEsQ0FBQ0EsQ0FBQ0E7WUFDN0lBLEVBQUVBLENBQUFBLENBQUNBLFNBQVNBLElBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO2dCQUNyQkEsSUFBSUEsWUFBWUEsR0FBb0JBLFNBQVNBLENBQUNBLE9BQU9BLENBQUNBO2dCQUN0REEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsWUFBWUEsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQzFCQSxPQUFPQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFDWkEsSUFBSUEsUUFBUUEsR0FBaUJBLFlBQVlBLENBQUNBLE9BQU9BLENBQUNBO29CQUNsREEsSUFBSUEsVUFBVUEsR0FBaUJBLFlBQVlBLENBQUNBLFNBQVNBLENBQUNBO29CQUN0REEsSUFBSUEsVUFBVUEsR0FBaUJBLFlBQVlBLENBQUNBLE1BQU1BLENBQUNBO29CQUNuREEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsUUFBUUEsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0EsRUFBRUEsRUFBRUEsQ0FBQ0E7d0JBQzFDQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxjQUFjQSxDQUFDQSxDQUFDQTt3QkFDM0NBLE9BQU9BLEVBQUVBLENBQUNBO29CQUNYQSxDQUFDQTtvQkFDREEsY0FBY0EsSUFBSUEsT0FBT0EsQ0FBQ0E7b0JBQzFCQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxVQUFVQSxDQUFDQSxNQUFNQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxFQUFFQSxDQUFDQTt3QkFDNUNBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLFVBQVVBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLFVBQVVBLENBQUNBLEdBQUdBLFFBQVFBLENB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M0I7QUFFRCxBQUFtQixpQkFBVixTQUFTLENBQUMiLCJmaWxlIjoiZW50aXRpZXMvVGV4dEZpZWxkLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWN0YW5nbGVcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vUmVjdGFuZ2xlXCIpO1xyXG5cclxuaW1wb3J0IERpc3BsYXlPYmplY3RcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0Rpc3BsYXlPYmplY3RcIik7XHJcbmltcG9ydCBBbnRpQWxpYXNUeXBlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvdGV4dC9BbnRpQWxpYXNUeXBlXCIpO1xyXG5pbXBvcnQgR3JpZEZpdFR5cGVcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3RleHQvR3JpZEZpdFR5cGVcIik7XHJcbmltcG9ydCBUZXh0RmllbGRBdXRvU2l6ZVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi90ZXh0L1RleHRGaWVsZEF1dG9TaXplXCIpO1xyXG5pbXBvcnQgVGV4dEZpZWxkVHlwZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3RleHQvVGV4dEZpZWxkVHlwZVwiKTtcclxuaW1wb3J0IFRleHRGb3JtYXRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3RleHQvVGV4dEZvcm1hdFwiKTtcclxuaW1wb3J0IFRleHRJbnRlcmFjdGlvbk1vZGVcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvdGV4dC9UZXh0SW50ZXJhY3Rpb25Nb2RlXCIpO1xyXG5pbXBvcnQgVGV4dExpbmVNZXRyaWNzXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvdGV4dC9UZXh0TGluZU1ldHJpY3NcIik7XHJcbmltcG9ydCBNZXNoXHRcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZW50aXRpZXMvTWVzaFwiKTtcclxuaW1wb3J0IEdlb21ldHJ5XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2RhdGEvR2VvbWV0cnlcIik7XHJcbmltcG9ydCBTdWJHZW9tZXRyeUJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9kYXRhL1N1Ykdlb21ldHJ5QmFzZVwiKTtcclxuaW1wb3J0IEN1cnZlU3ViR2VvbWV0cnlcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2RhdGEvQ3VydmVTdWJHZW9tZXRyeVwiKTtcclxuaW1wb3J0IFRlc3NlbGF0ZWRGb250Q2hhclx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi90ZXh0L1Rlc3NlbGF0ZWRGb250Q2hhclwiKTtcclxuXHJcbmltcG9ydCBNYXRyaXgzRFx0XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vTWF0cml4M0RcIik7XHJcbmltcG9ydCBWZWN0b3IzRFx0XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vVmVjdG9yM0RcIik7XHJcbmltcG9ydCBBc3NldFR5cGVcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvQXNzZXRUeXBlXCIpO1xyXG4vKipcclxuICogVGhlIFRleHRGaWVsZCBjbGFzcyBpcyB1c2VkIHRvIGNyZWF0ZSBkaXNwbGF5IG9iamVjdHMgZm9yIHRleHQgZGlzcGxheSBhbmRcclxuICogaW5wdXQuIDxwaCBvdXRwdXRjbGFzcz1cImZsZXhvbmx5XCI+WW91IGNhbiB1c2UgdGhlIFRleHRGaWVsZCBjbGFzcyB0b1xyXG4gKiBwZXJmb3JtIGxvdy1sZXZlbCB0ZXh0IHJlbmRlcmluZy4gSG93ZXZlciwgaW4gRmxleCwgeW91IHR5cGljYWxseSB1c2UgdGhlXHJcbiAqIExhYmVsLCBUZXh0LCBUZXh0QXJlYSwgYW5kIFRleHRJbnB1dCBjb250cm9scyB0byBwcm9jZXNzIHRleHQuIDxwaFxyXG4gKiBvdXRwdXRjbGFzcz1cImZsYXNob25seVwiPllvdSBjYW4gZ2l2ZSBhIHRleHQgZmllbGQgYW4gaW5zdGFuY2UgbmFtZSBpbiB0aGVcclxuICogUHJvcGVydHkgaW5zcGVjdG9yIGFuZCB1c2UgdGhlIG1ldGhvZHMgYW5kIHByb3BlcnRpZXMgb2YgdGhlIFRleHRGaWVsZFxyXG4gKiBjbGFzcyB0byBtYW5pcHVsYXRlIGl0IHdpdGggQWN0aW9uU2NyaXB0LiBUZXh0RmllbGQgaW5zdGFuY2UgbmFtZXMgYXJlXHJcbiAqIGRpc3BsYXllZCBpbiB0aGUgTW92aWUgRXhwbG9yZXIgYW5kIGluIHRoZSBJbnNlcnQgVGFyZ2V0IFBhdGggZGlhbG9nIGJveCBpblxyXG4gKiB0aGUgQWN0aW9ucyBwYW5lbC5cclxuICpcclxuICogPHA+VG8gY3JlYXRlIGEgdGV4dCBmaWVsZCBkeW5hbWljYWxseSwgdXNlIHRoZSA8Y29kZT5UZXh0RmllbGQoKTwvY29kZT5cclxuICogY29uc3RydWN0b3IuPC9wPlxyXG4gKlxyXG4gKiA8cD5UaGUgbWV0aG9kcyBvZiB0aGUgVGV4dEZpZWxkIGNsYXNzIGxldCB5b3Ugc2V0LCBzZWxlY3QsIGFuZCBtYW5pcHVsYXRlXHJcbiAqIHRleHQgaW4gYSBkeW5hbWljIG9yIGlucHV0IHRleHQgZmllbGQgdGhhdCB5b3UgY3JlYXRlIGR1cmluZyBhdXRob3Jpbmcgb3JcclxuICogYXQgcnVudGltZS4gPC9wPlxyXG4gKlxyXG4gKiA8cD5BY3Rpb25TY3JpcHQgcHJvdmlkZXMgc2V2ZXJhbCB3YXlzIHRvIGZvcm1hdCB5b3VyIHRleHQgYXQgcnVudGltZS4gVGhlXHJcbiAqIFRleHRGb3JtYXQgY2xhc3MgbGV0cyB5b3Ugc2V0IGNoYXJhY3RlciBhbmQgcGFyYWdyYXBoIGZvcm1hdHRpbmcgZm9yXHJcbiAqIFRleHRGaWVsZCBvYmplY3RzLiBZb3UgY2FuIGFwcGx5IENhc2NhZGluZyBTdHlsZSBTaGVldHMoQ1NTKSBzdHlsZXMgdG9cclxuICogdGV4dCBmaWVsZHMgYnkgdXNpbmcgdGhlIDxjb2RlPlRleHRGaWVsZC5zdHlsZVNoZWV0PC9jb2RlPiBwcm9wZXJ0eSBhbmQgdGhlXHJcbiAqIFN0eWxlU2hlZXQgY2xhc3MuIFlvdSBjYW4gdXNlIENTUyB0byBzdHlsZSBidWlsdC1pbiBIVE1MIHRhZ3MsIGRlZmluZSBuZXdcclxuICogZm9ybWF0dGluZyB0YWdzLCBvciBhcHBseSBzdHlsZXMuIFlvdSBjYW4gYXNzaWduIEhUTUwgZm9ybWF0dGVkIHRleHQsIHdoaWNoXHJcbiAqIG9wdGlvbmFsbHkgdXNlcyBDU1Mgc3R5bGVzLCBkaXJlY3RseSB0byBhIHRleHQgZmllbGQuIEhUTUwgdGV4dCB0aGF0IHlvdVxyXG4gKiBhc3NpZ24gdG8gYSB0ZXh0IGZpZWxkIGNhbiBjb250YWluIGVtYmVkZGVkIG1lZGlhKG1vdmllIGNsaXBzLCBTV0YgZmlsZXMsXHJcbiAqIEdJRiBmaWxlcywgUE5HIGZpbGVzLCBhbmQgSlBFRyBmaWxlcykuIFRoZSB0ZXh0IHdyYXBzIGFyb3VuZCB0aGUgZW1iZWRkZWRcclxuICogbWVkaWEgaW4gdGhlIHNhbWUgd2F5IHRoYXQgYSB3ZWIgYnJvd3NlciB3cmFwcyB0ZXh0IGFyb3VuZCBtZWRpYSBlbWJlZGRlZFxyXG4gKiBpbiBhbiBIVE1MIGRvY3VtZW50LiA8L3A+XHJcbiAqXHJcbiAqIDxwPkZsYXNoIFBsYXllciBzdXBwb3J0cyBhIHN1YnNldCBvZiBIVE1MIHRhZ3MgdGhhdCB5b3UgY2FuIHVzZSB0byBmb3JtYXRcclxuICogdGV4dC4gU2VlIHRoZSBsaXN0IG9mIHN1cHBvcnRlZCBIVE1MIHRhZ3MgaW4gdGhlIGRlc2NyaXB0aW9uIG9mIHRoZVxyXG4gKiA8Y29kZT5odG1sVGV4dDwvY29kZT4gcHJvcGVydHkuPC9wPlxyXG4gKiBcclxuICogQGV2ZW50IGNoYW5nZSAgICAgICAgICAgICAgICAgICAgRGlzcGF0Y2hlZCBhZnRlciBhIGNvbnRyb2wgdmFsdWUgaXNcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kaWZpZWQsIHVubGlrZSB0aGVcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+dGV4dElucHV0PC9jb2RlPiBldmVudCwgd2hpY2ggaXNcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2hlZCBiZWZvcmUgdGhlIHZhbHVlIGlzIG1vZGlmaWVkLlxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBVbmxpa2UgdGhlIFczQyBET00gRXZlbnQgTW9kZWwgdmVyc2lvbiBvZlxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGUgPGNvZGU+Y2hhbmdlPC9jb2RlPiBldmVudCwgd2hpY2hcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2hlcyB0aGUgZXZlbnQgb25seSBhZnRlciB0aGVcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbCBsb3NlcyBmb2N1cywgdGhlIEFjdGlvblNjcmlwdCAzLjBcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmVyc2lvbiBvZiB0aGUgPGNvZGU+Y2hhbmdlPC9jb2RlPiBldmVudFxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpcyBkaXNwYXRjaGVkIGFueSB0aW1lIHRoZSBjb250cm9sXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZXMuIEZvciBleGFtcGxlLCBpZiBhIHVzZXIgdHlwZXMgdGV4dFxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnRvIGEgdGV4dCBmaWVsZCwgYSA8Y29kZT5jaGFuZ2U8L2NvZGU+XHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50IGlzIGRpc3BhdGNoZWQgYWZ0ZXIgZXZlcnkga2V5c3Ryb2tlLlxyXG4gKiBAZXZlbnQgbGluayAgICAgICAgICAgICAgICAgICAgICBEaXNwYXRjaGVkIHdoZW4gYSB1c2VyIGNsaWNrcyBhIGh5cGVybGlua1xyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbiBhbiBIVE1MLWVuYWJsZWQgdGV4dCBmaWVsZCwgd2hlcmUgdGhlXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFVSTCBiZWdpbnMgd2l0aCBcImV2ZW50OlwiLiBUaGUgcmVtYWluZGVyIG9mXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoZSBVUkwgYWZ0ZXIgXCJldmVudDpcIiBpcyBwbGFjZWQgaW4gdGhlXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgcHJvcGVydHkgb2YgdGhlIExJTksgZXZlbnQuXHJcbiAqXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPjxiPk5vdGU6PC9iPiBUaGUgZGVmYXVsdCBiZWhhdmlvcixcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkaW5nIHRoZSB0ZXh0IHRvIHRoZSB0ZXh0IGZpZWxkLCBvY2N1cnNcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25seSB3aGVuIEZsYXNoIFBsYXllciBnZW5lcmF0ZXMgdGhlXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LCB3aGljaCBpbiB0aGlzIGNhc2UgaGFwcGVucyB3aGVuIGFcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlciBhdHRlbXB0cyB0byBpbnB1dCB0ZXh0LiBZb3UgY2Fubm90XHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1dCB0ZXh0IGludG8gYSB0ZXh0IGZpZWxkIGJ5IHNlbmRpbmcgaXRcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+dGV4dElucHV0PC9jb2RlPiBldmVudHMuPC9wPlxyXG4gKiBAZXZlbnQgc2Nyb2xsICAgICAgICAgICAgICAgICAgICBEaXNwYXRjaGVkIGJ5IGEgVGV4dEZpZWxkIG9iamVjdFxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aT5hZnRlcjwvaT4gdGhlIHVzZXIgc2Nyb2xscy5cclxuICogQGV2ZW50IHRleHRJbnB1dCAgICAgICAgICAgICAgICAgRmxhc2ggUGxheWVyIGRpc3BhdGNoZXMgdGhlXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPnRleHRJbnB1dDwvY29kZT4gZXZlbnQgd2hlbiBhIHVzZXJcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW50ZXJzIG9uZSBvciBtb3JlIGNoYXJhY3RlcnMgb2YgdGV4dC5cclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVmFyaW91cyB0ZXh0IGlucHV0IG1ldGhvZHMgY2FuIGdlbmVyYXRlXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMgZXZlbnQsIGluY2x1ZGluZyBzdGFuZGFyZCBrZXlib2FyZHMsXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0IG1ldGhvZCBlZGl0b3JzKElNRXMpLCB2b2ljZSBvclxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGVlY2ggcmVjb2duaXRpb24gc3lzdGVtcywgYW5kIGV2ZW4gdGhlXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdCBvZiBwYXN0aW5nIHBsYWluIHRleHQgd2l0aCBub1xyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXR0aW5nIG9yIHN0eWxlIGluZm9ybWF0aW9uLlxyXG4gKiBAZXZlbnQgdGV4dEludGVyYWN0aW9uTW9kZUNoYW5nZSBGbGFzaCBQbGF5ZXIgZGlzcGF0Y2hlcyB0aGVcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+dGV4dEludGVyYWN0aW9uTW9kZUNoYW5nZTwvY29kZT5cclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQgd2hlbiBhIHVzZXIgY2hhbmdlcyB0aGUgaW50ZXJhY3Rpb25cclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZSBvZiBhIHRleHQgZmllbGQuIGZvciBleGFtcGxlIG9uXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFuZHJvaWQsIG9uZSBjYW4gdG9nZ2xlIGZyb20gTk9STUFMIG1vZGVcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gU0VMRUNUSU9OIG1vZGUgdXNpbmcgY29udGV4dCBtZW51XHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnNcclxuICovXHJcbmNsYXNzIFRleHRGaWVsZCBleHRlbmRzIE1lc2hcclxue1xyXG5cdHByaXZhdGUgX2JvdHRvbVNjcm9sbFY6bnVtYmVyO1xyXG5cdHByaXZhdGUgX2NhcmV0SW5kZXg6bnVtYmVyO1xyXG5cdHByaXZhdGUgX2xlbmd0aDpudW1iZXI7XHJcblx0cHJpdmF0ZSBfbWF4U2Nyb2xsSDpudW1iZXI7XHJcblx0cHJpdmF0ZSBfbWF4U2Nyb2xsVjpudW1iZXI7XHJcblx0cHJpdmF0ZSBfbnVtTGluZXM6bnVtYmVyO1xyXG5cdHByaXZhdGUgX3NlbGVjdGlvbkJlZ2luSW5kZXg6bnVtYmVyO1xyXG5cdHByaXZhdGUgX3NlbGVjdGlvbkVuZEluZGV4Om51bWJlcjtcclxuXHRwcml2YXRlIF90ZXh0OnN0cmluZyA9IFwiXCI7XHJcblx0cHJpdmF0ZSBfdGV4dEhlaWdodDpudW1iZXI7XHJcblx0cHJpdmF0ZSBfdGV4dEludGVyYWN0aW9uTW9kZTpUZXh0SW50ZXJhY3Rpb25Nb2RlO1xyXG5cdHByaXZhdGUgX3RleHRXaWR0aDpudW1iZXI7XHJcblxyXG5cdHByaXZhdGUgX2NoYXJCb3VuZGFyaWVzOlJlY3RhbmdsZTtcclxuXHRwcml2YXRlIF9jaGFySW5kZXhBdFBvaW50Om51bWJlcjtcclxuXHRwcml2YXRlIF9maXJzdENoYXJJblBhcmFncmFwaDpudW1iZXI7XHJcblx0cHJpdmF0ZSBfaW1hZ2VSZWZlcmVuY2U6RGlzcGxheU9iamVjdFxyXG5cdHByaXZhdGUgX2xpbmVJbmRleEF0UG9pbnQ6bnVtYmVyO1xyXG5cdHByaXZhdGUgX2xpbmVJbmRleE9mQ2hhcjpudW1iZXI7XHJcblx0cHJpdmF0ZSBfbGluZUxlbmd0aDpudW1iZXI7XHJcblx0cHJpdmF0ZSBfbGluZU1ldHJpY3M6VGV4dExpbmVNZXRyaWNzO1xyXG5cdHByaXZhdGUgX2xpbmVPZmZzZXQ6bnVtYmVyO1xyXG5cdHByaXZhdGUgX2xpbmVUZXh0OnN0cmluZztcclxuXHRwcml2YXRlIF9wYXJhZ3JhcGhMZW5ndGg6bnVtYmVyO1xyXG5cdHByaXZhdGUgX3RleHRGb3JtYXQ6VGV4dEZvcm1hdDtcclxuXHJcblx0LyoqXHJcblx0ICogV2hlbiBzZXQgdG8gPGNvZGU+dHJ1ZTwvY29kZT4gYW5kIHRoZSB0ZXh0IGZpZWxkIGlzIG5vdCBpbiBmb2N1cywgRmxhc2hcclxuXHQgKiBQbGF5ZXIgaGlnaGxpZ2h0cyB0aGUgc2VsZWN0aW9uIGluIHRoZSB0ZXh0IGZpZWxkIGluIGdyYXkuIFdoZW4gc2V0IHRvXHJcblx0ICogPGNvZGU+ZmFsc2U8L2NvZGU+IGFuZCB0aGUgdGV4dCBmaWVsZCBpcyBub3QgaW4gZm9jdXMsIEZsYXNoIFBsYXllciBkb2VzXHJcblx0ICogbm90IGhpZ2hsaWdodCB0aGUgc2VsZWN0aW9uIGluIHRoZSB0ZXh0IGZpZWxkLlxyXG5cdCAqIFxyXG5cdCAqIEBkZWZhdWx0IGZhbHNlXHJcblx0ICovXHJcblx0cHVibGljIGFsd2F5c1Nob3dTZWxlY3Rpb246Ym9vbGVhblxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgdHlwZSBvZiBhbnRpLWFsaWFzaW5nIHVzZWQgZm9yIHRoaXMgdGV4dCBmaWVsZC4gVXNlXHJcblx0ICogPGNvZGU+Zmxhc2gudGV4dC5BbnRpQWxpYXNUeXBlPC9jb2RlPiBjb25zdGFudHMgZm9yIHRoaXMgcHJvcGVydHkuIFlvdSBjYW5cclxuXHQgKiBjb250cm9sIHRoaXMgc2V0dGluZyBvbmx5IGlmIHRoZSBmb250IGlzIGVtYmVkZGVkKHdpdGggdGhlXHJcblx0ICogPGNvZGU+ZW1iZWRGb250czwvY29kZT4gcHJvcGVydHkgc2V0IHRvIDxjb2RlPnRydWU8L2NvZGU+KS4gVGhlIGRlZmF1bHRcclxuXHQgKiBzZXR0aW5nIGlzIDxjb2RlPmZsYXNoLnRleHQuQW50aUFsaWFzVHlwZS5OT1JNQUw8L2NvZGU+LlxyXG5cdCAqXHJcblx0ICogPHA+VG8gc2V0IHZhbHVlcyBmb3IgdGhpcyBwcm9wZXJ0eSwgdXNlIHRoZSBmb2xsb3dpbmcgc3RyaW5nIHZhbHVlczo8L3A+XHJcblx0ICovXHJcblx0cHVibGljIGFudGlBbGlhc1R5cGU6QW50aUFsaWFzVHlwZTtcclxuXHJcblx0LyoqXHJcblx0ICogQ29udHJvbHMgYXV0b21hdGljIHNpemluZyBhbmQgYWxpZ25tZW50IG9mIHRleHQgZmllbGRzLiBBY2NlcHRhYmxlIHZhbHVlc1xyXG5cdCAqIGZvciB0aGUgPGNvZGU+VGV4dEZpZWxkQXV0b1NpemU8L2NvZGU+IGNvbnN0YW50czpcclxuXHQgKiA8Y29kZT5UZXh0RmllbGRBdXRvU2l6ZS5OT05FPC9jb2RlPih0aGUgZGVmYXVsdCksXHJcblx0ICogPGNvZGU+VGV4dEZpZWxkQXV0b1NpemUuTEVGVDwvY29kZT4sIDxjb2RlPlRleHRGaWVsZEF1dG9TaXplLlJJR0hUPC9jb2RlPixcclxuXHQgKiBhbmQgPGNvZGU+VGV4dEZpZWxkQXV0b1NpemUuQ0VOVEVSPC9jb2RlPi5cclxuXHQgKlxyXG5cdCAqIDxwPklmIDxjb2RlPmF1dG9TaXplPC9jb2RlPiBpcyBzZXQgdG8gPGNvZGU+VGV4dEZpZWxkQXV0b1NpemUuTk9ORTwvY29kZT5cclxuXHQgKiAodGhlIGRlZmF1bHQpIG5vIHJlc2l6aW5nIG9jY3Vycy48L3A+XHJcblx0ICpcclxuXHQgKiA8cD5JZiA8Y29kZT5hdXRvU2l6ZTwvY29kZT4gaXMgc2V0IHRvIDxjb2RlPlRleHRGaWVsZEF1dG9TaXplLkxFRlQ8L2NvZGU+LFxyXG5cdCAqIHRoZSB0ZXh0IGlzIHRyZWF0ZWQgYXMgbGVmdC1qdXN0aWZpZWQgdGV4dCwgbWVhbmluZyB0aGF0IHRoZSBsZWZ0IG1hcmdpblxyXG5cdCAqIG9mIHRoZSB0ZXh0IGZpZWxkIHJlbWFpbnMgZml4ZWQgYW5kIGFueSByZXNpemluZyBvZiBhIHNpbmdsZSBsaW5lIG9mIHRoZVxyXG5cdCAqIHRleHQgZmllbGQgaXMgb24gdGhlIHJpZ2h0IG1hcmdpbi4gSWYgdGhlIHRleHQgaW5jbHVkZXMgYSBsaW5lIGJyZWFrKGZvclxyXG5cdCAqIGV4YW1wbGUsIDxjb2RlPlwiXFxuXCI8L2NvZGU+IG9yIDxjb2RlPlwiXFxyXCI8L2NvZGU+KSwgdGhlIGJvdHRvbSBpcyBhbHNvXHJcblx0ICogcmVzaXplZCB0byBmaXQgdGhlIG5leHQgbGluZSBvZiB0ZXh0LiBJZiA8Y29kZT53b3JkV3JhcDwvY29kZT4gaXMgYWxzbyBzZXRcclxuXHQgKiB0byA8Y29kZT50cnVlPC9jb2RlPiwgb25seSB0aGUgYm90dG9tIG9mIHRoZSB0ZXh0IGZpZWxkIGlzIHJlc2l6ZWQgYW5kIHRoZVxyXG5cdCAqIHJpZ2h0IHNpZGUgcmVtYWlucyBmaXhlZC48L3A+XHJcblx0ICpcclxuXHQgKiA8cD5JZiA8Y29kZT5hdXRvU2l6ZTwvY29kZT4gaXMgc2V0IHRvXHJcblx0ICogPGNvZGU+VGV4dEZpZWxkQXV0b1NpemUuUklHSFQ8L2NvZGU+LCB0aGUgdGV4dCBpcyB0cmVhdGVkIGFzXHJcblx0ICogcmlnaHQtanVzdGlmaWVkIHRleHQsIG1lYW5pbmcgdGhhdCB0aGUgcmlnaHQgbWFyZ2luIG9mIHRoZSB0ZXh0IGZpZWxkXHJcblx0ICogcmVtYWlucyBmaXhlZCBhbmQgYW55IHJlc2l6aW5nIG9mIGEgc2luZ2xlIGxpbmUgb2YgdGhlIHRleHQgZmllbGQgaXMgb25cclxuXHQgKiB0aGUgbGVmdCBtYXJnaW4uIElmIHRoZSB0ZXh0IGluY2x1ZGVzIGEgbGluZSBicmVhayhmb3IgZXhhbXBsZSxcclxuXHQgKiA8Y29kZT5cIlxcblwiIG9yIFwiXFxyXCIpPC9jb2RlPiwgdGhlIGJvdHRvbSBpcyBhbHNvIHJlc2l6ZWQgdG8gZml0IHRoZSBuZXh0XHJcblx0ICogbGluZSBvZiB0ZXh0LiBJZiA8Y29kZT53b3JkV3JhcDwvY29kZT4gaXMgYWxzbyBzZXQgdG8gPGNvZGU+dHJ1ZTwvY29kZT4sXHJcblx0ICogb25seSB0aGUgYm90dG9tIG9mIHRoZSB0ZXh0IGZpZWxkIGlzIHJlc2l6ZWQgYW5kIHRoZSBsZWZ0IHNpZGUgcmVtYWluc1xyXG5cdCAqIGZpeGVkLjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPklmIDxjb2RlPmF1dG9TaXplPC9jb2RlPiBpcyBzZXQgdG9cclxuXHQgKiA8Y29kZT5UZXh0RmllbGRBdXRvU2l6ZS5DRU5URVI8L2NvZGU+LCB0aGUgdGV4dCBpcyB0cmVhdGVkIGFzXHJcblx0ICogY2VudGVyLWp1c3RpZmllZCB0ZXh0LCBtZWFuaW5nIHRoYXQgYW55IHJlc2l6aW5nIG9mIGEgc2luZ2xlIGxpbmUgb2YgdGhlXHJcblx0ICogdGV4dCBmaWVsZCBpcyBlcXVhbGx5IGRpc3RyaWJ1dGVkIHRvIGJvdGggdGhlIHJpZ2h0IGFuZCBsZWZ0IG1hcmdpbnMuIElmXHJcblx0ICogdGhlIHRleHQgaW5jbHVkZXMgYSBsaW5lIGJyZWFrKGZvciBleGFtcGxlLCA8Y29kZT5cIlxcblwiPC9jb2RlPiBvclxyXG5cdCAqIDxjb2RlPlwiXFxyXCI8L2NvZGU+KSwgdGhlIGJvdHRvbSBpcyBhbHNvIHJlc2l6ZWQgdG8gZml0IHRoZSBuZXh0IGxpbmUgb2ZcclxuXHQgKiB0ZXh0LiBJZiA8Y29kZT53b3JkV3JhcDwvY29kZT4gaXMgYWxzbyBzZXQgdG8gPGNvZGU+dHJ1ZTwvY29kZT4sIG9ubHkgdGhlXHJcblx0ICogYm90dG9tIG9mIHRoZSB0ZXh0IGZpZWxkIGlzIHJlc2l6ZWQgYW5kIHRoZSBsZWZ0IGFuZCByaWdodCBzaWRlcyByZW1haW5cclxuXHQgKiBmaXhlZC48L3A+XHJcblx0ICogXHJcblx0ICogQHRocm93cyBBcmd1bWVudEVycm9yIFRoZSA8Y29kZT5hdXRvU2l6ZTwvY29kZT4gc3BlY2lmaWVkIGlzIG5vdCBhIG1lbWJlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBvZiBmbGFzaC50ZXh0LlRleHRGaWVsZEF1dG9TaXplLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBhdXRvU2l6ZTpUZXh0RmllbGRBdXRvU2l6ZTtcclxuXHJcblx0LyoqXHJcblx0ICogU3BlY2lmaWVzIHdoZXRoZXIgdGhlIHRleHQgZmllbGQgaGFzIGEgYmFja2dyb3VuZCBmaWxsLiBJZlxyXG5cdCAqIDxjb2RlPnRydWU8L2NvZGU+LCB0aGUgdGV4dCBmaWVsZCBoYXMgYSBiYWNrZ3JvdW5kIGZpbGwuIElmXHJcblx0ICogPGNvZGU+ZmFsc2U8L2NvZGU+LCB0aGUgdGV4dCBmaWVsZCBoYXMgbm8gYmFja2dyb3VuZCBmaWxsLiBVc2UgdGhlXHJcblx0ICogPGNvZGU+YmFja2dyb3VuZENvbG9yPC9jb2RlPiBwcm9wZXJ0eSB0byBzZXQgdGhlIGJhY2tncm91bmQgY29sb3Igb2YgYVxyXG5cdCAqIHRleHQgZmllbGQuXHJcblx0ICogXHJcblx0ICogQGRlZmF1bHQgZmFsc2VcclxuXHQgKi9cclxuXHRwdWJsaWMgYmFja2dyb3VuZDpib29sZWFuO1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgY29sb3Igb2YgdGhlIHRleHQgZmllbGQgYmFja2dyb3VuZC4gVGhlIGRlZmF1bHQgdmFsdWUgaXNcclxuXHQgKiA8Y29kZT4weEZGRkZGRjwvY29kZT4od2hpdGUpLiBUaGlzIHByb3BlcnR5IGNhbiBiZSByZXRyaWV2ZWQgb3Igc2V0LCBldmVuXHJcblx0ICogaWYgdGhlcmUgY3VycmVudGx5IGlzIG5vIGJhY2tncm91bmQsIGJ1dCB0aGUgY29sb3IgaXMgdmlzaWJsZSBvbmx5IGlmIHRoZVxyXG5cdCAqIHRleHQgZmllbGQgaGFzIHRoZSA8Y29kZT5iYWNrZ3JvdW5kPC9jb2RlPiBwcm9wZXJ0eSBzZXQgdG9cclxuXHQgKiA8Y29kZT50cnVlPC9jb2RlPi5cclxuXHQgKi9cclxuXHRwdWJsaWMgYmFja2dyb3VuZENvbG9yOm51bWJlciAvKmludCovO1xyXG5cclxuXHQvKipcclxuXHQgKiBTcGVjaWZpZXMgd2hldGhlciB0aGUgdGV4dCBmaWVsZCBoYXMgYSBib3JkZXIuIElmIDxjb2RlPnRydWU8L2NvZGU+LCB0aGVcclxuXHQgKiB0ZXh0IGZpZWxkIGhhcyBhIGJvcmRlci4gSWYgPGNvZGU+ZmFsc2U8L2NvZGU+LCB0aGUgdGV4dCBmaWVsZCBoYXMgbm9cclxuXHQgKiBib3JkZXIuIFVzZSB0aGUgPGNvZGU+Ym9yZGVyQ29sb3I8L2NvZGU+IHByb3BlcnR5IHRvIHNldCB0aGUgYm9yZGVyIGNvbG9yLlxyXG5cdCAqIFxyXG5cdCAqIEBkZWZhdWx0IGZhbHNlXHJcblx0ICovXHJcblx0cHVibGljIGJvcmRlcjpib29sZWFuO1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgY29sb3Igb2YgdGhlIHRleHQgZmllbGQgYm9yZGVyLiBUaGUgZGVmYXVsdCB2YWx1ZSBpc1xyXG5cdCAqIDxjb2RlPjB4MDAwMDAwPC9jb2RlPihibGFjaykuIFRoaXMgcHJvcGVydHkgY2FuIGJlIHJldHJpZXZlZCBvciBzZXQsIGV2ZW5cclxuXHQgKiBpZiB0aGVyZSBjdXJyZW50bHkgaXMgbm8gYm9yZGVyLCBidXQgdGhlIGNvbG9yIGlzIHZpc2libGUgb25seSBpZiB0aGUgdGV4dFxyXG5cdCAqIGZpZWxkIGhhcyB0aGUgPGNvZGU+Ym9yZGVyPC9jb2RlPiBwcm9wZXJ0eSBzZXQgdG8gPGNvZGU+dHJ1ZTwvY29kZT4uXHJcblx0ICovXHJcblx0cHVibGljIGJvcmRlckNvbG9yOm51bWJlciAvKmludCovO1xyXG5cclxuXHQvKipcclxuXHQgKiBBbiBpbnRlZ2VyKDEtYmFzZWQgaW5kZXgpIHRoYXQgaW5kaWNhdGVzIHRoZSBib3R0b21tb3N0IGxpbmUgdGhhdCBpc1xyXG5cdCAqIGN1cnJlbnRseSB2aXNpYmxlIGluIHRoZSBzcGVjaWZpZWQgdGV4dCBmaWVsZC4gVGhpbmsgb2YgdGhlIHRleHQgZmllbGQgYXNcclxuXHQgKiBhIHdpbmRvdyBvbnRvIGEgYmxvY2sgb2YgdGV4dC4gVGhlIDxjb2RlPnNjcm9sbFY8L2NvZGU+IHByb3BlcnR5IGlzIHRoZVxyXG5cdCAqIDEtYmFzZWQgaW5kZXggb2YgdGhlIHRvcG1vc3QgdmlzaWJsZSBsaW5lIGluIHRoZSB3aW5kb3cuXHJcblx0ICpcclxuXHQgKiA8cD5BbGwgdGhlIHRleHQgYmV0d2VlbiB0aGUgbGluZXMgaW5kaWNhdGVkIGJ5IDxjb2RlPnNjcm9sbFY8L2NvZGU+IGFuZFxyXG5cdCAqIDxjb2RlPmJvdHRvbVNjcm9sbFY8L2NvZGU+IGlzIGN1cnJlbnRseSB2aXNpYmxlIGluIHRoZSB0ZXh0IGZpZWxkLjwvcD5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGJvdHRvbVNjcm9sbFYoKTpudW1iZXIgLyppbnQqL1xyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9ib3R0b21TY3JvbGxWO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGluZGV4IG9mIHRoZSBpbnNlcnRpb24gcG9pbnQoY2FyZXQpIHBvc2l0aW9uLiBJZiBubyBpbnNlcnRpb24gcG9pbnRcclxuXHQgKiBpcyBkaXNwbGF5ZWQsIHRoZSB2YWx1ZSBpcyB0aGUgcG9zaXRpb24gdGhlIGluc2VydGlvbiBwb2ludCB3b3VsZCBiZSBpZlxyXG5cdCAqIHlvdSByZXN0b3JlZCBmb2N1cyB0byB0aGUgZmllbGQodHlwaWNhbGx5IHdoZXJlIHRoZSBpbnNlcnRpb24gcG9pbnQgbGFzdFxyXG5cdCAqIHdhcywgb3IgMCBpZiB0aGUgZmllbGQgaGFzIG5vdCBoYWQgZm9jdXMpLlxyXG5cdCAqXHJcblx0ICogPHA+U2VsZWN0aW9uIHNwYW4gaW5kZXhlcyBhcmUgemVyby1iYXNlZChmb3IgZXhhbXBsZSwgdGhlIGZpcnN0IHBvc2l0aW9uXHJcblx0ICogaXMgMCwgdGhlIHNlY29uZCBwb3NpdGlvbiBpcyAxLCBhbmQgc28gb24pLjwvcD5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGNhcmV0SW5kZXgoKTpudW1iZXIgLyppbnQqL1xyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9jYXJldEluZGV4O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQSBCb29sZWFuIHZhbHVlIHRoYXQgc3BlY2lmaWVzIHdoZXRoZXIgZXh0cmEgd2hpdGUgc3BhY2Uoc3BhY2VzLCBsaW5lXHJcblx0ICogYnJlYWtzLCBhbmQgc28gb24pIGluIGEgdGV4dCBmaWVsZCB3aXRoIEhUTUwgdGV4dCBpcyByZW1vdmVkLiBUaGUgZGVmYXVsdFxyXG5cdCAqIHZhbHVlIGlzIDxjb2RlPmZhbHNlPC9jb2RlPi4gVGhlIDxjb2RlPmNvbmRlbnNlV2hpdGU8L2NvZGU+IHByb3BlcnR5IG9ubHlcclxuXHQgKiBhZmZlY3RzIHRleHQgc2V0IHdpdGggdGhlIDxjb2RlPmh0bWxUZXh0PC9jb2RlPiBwcm9wZXJ0eSwgbm90IHRoZVxyXG5cdCAqIDxjb2RlPnRleHQ8L2NvZGU+IHByb3BlcnR5LiBJZiB5b3Ugc2V0IHRleHQgd2l0aCB0aGUgPGNvZGU+dGV4dDwvY29kZT5cclxuXHQgKiBwcm9wZXJ0eSwgPGNvZGU+Y29uZGVuc2VXaGl0ZTwvY29kZT4gaXMgaWdub3JlZC5cclxuXHQgKlxyXG5cdCAqIDxwPklmIDxjb2RlPmNvbmRlbnNlV2hpdGU8L2NvZGU+IGlzIHNldCB0byA8Y29kZT50cnVlPC9jb2RlPiwgdXNlIHN0YW5kYXJkXHJcblx0ICogSFRNTCBjb21tYW5kcyBzdWNoIGFzIDxjb2RlPjxCUj48L2NvZGU+IGFuZCA8Y29kZT48UD48L2NvZGU+IHRvIHBsYWNlIGxpbmVcclxuXHQgKiBicmVha3MgaW4gdGhlIHRleHQgZmllbGQuPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+U2V0IHRoZSA8Y29kZT5jb25kZW5zZVdoaXRlPC9jb2RlPiBwcm9wZXJ0eSBiZWZvcmUgc2V0dGluZyB0aGVcclxuXHQgKiA8Y29kZT5odG1sVGV4dDwvY29kZT4gcHJvcGVydHkuPC9wPlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBjb25kZW5zZVdoaXRlOmJvb2xlYW47XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNwZWNpZmllcyB0aGUgZm9ybWF0IGFwcGxpZWQgdG8gbmV3bHkgaW5zZXJ0ZWQgdGV4dCwgc3VjaCBhcyB0ZXh0IGVudGVyZWRcclxuXHQgKiBieSBhIHVzZXIgb3IgdGV4dCBpbnNlcnRlZCB3aXRoIHRoZSA8Y29kZT5yZXBsYWNlU2VsZWN0ZWRUZXh0KCk8L2NvZGU+XHJcblx0ICogbWV0aG9kLlxyXG5cdCAqXHJcblx0ICogPHA+PGI+Tm90ZTo8L2I+IFdoZW4gc2VsZWN0aW5nIGNoYXJhY3RlcnMgdG8gYmUgcmVwbGFjZWQgd2l0aFxyXG5cdCAqIDxjb2RlPnNldFNlbGVjdGlvbigpPC9jb2RlPiBhbmQgPGNvZGU+cmVwbGFjZVNlbGVjdGVkVGV4dCgpPC9jb2RlPiwgdGhlXHJcblx0ICogPGNvZGU+ZGVmYXVsdFRleHRGb3JtYXQ8L2NvZGU+IHdpbGwgYmUgYXBwbGllZCBvbmx5IGlmIHRoZSB0ZXh0IGhhcyBiZWVuXHJcblx0ICogc2VsZWN0ZWQgdXAgdG8gYW5kIGluY2x1ZGluZyB0aGUgbGFzdCBjaGFyYWN0ZXIuIEhlcmUgaXMgYW4gZXhhbXBsZTo8L3A+XHJcblx0ICogPHByZSB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiPiBwdWJsaWMgbXlfdHh0OlRleHRGaWVsZCBuZXcgVGV4dEZpZWxkKCk7XHJcblx0ICogbXlfdHh0LnRleHQgPSBcIkZsYXNoIE1hY2ludG9zaCB2ZXJzaW9uXCI7IHB1YmxpYyBteV9mbXQ6VGV4dEZvcm1hdCA9IG5ld1xyXG5cdCAqIFRleHRGb3JtYXQoKTsgbXlfZm10LmNvbG9yID0gMHhGRjAwMDA7IG15X3R4dC5kZWZhdWx0VGV4dEZvcm1hdCA9IG15X2ZtdDtcclxuXHQgKiBteV90eHQuc2V0U2VsZWN0aW9uKDYsMTUpOyAvLyBwYXJ0aWFsIHRleHQgc2VsZWN0ZWQgLSBkZWZhdWx0VGV4dEZvcm1hdFxyXG5cdCAqIG5vdCBhcHBsaWVkIG15X3R4dC5zZXRTZWxlY3Rpb24oNiwyMyk7IC8vIHRleHQgc2VsZWN0ZWQgdG8gZW5kIC1cclxuXHQgKiBkZWZhdWx0VGV4dEZvcm1hdCBhcHBsaWVkIG15X3R4dC5yZXBsYWNlU2VsZWN0ZWRUZXh0KFwiV2luZG93cyB2ZXJzaW9uXCIpO1xyXG5cdCAqIDwvcHJlPlxyXG5cdCAqXHJcblx0ICogPHA+V2hlbiB5b3UgYWNjZXNzIHRoZSA8Y29kZT5kZWZhdWx0VGV4dEZvcm1hdDwvY29kZT4gcHJvcGVydHksIHRoZVxyXG5cdCAqIHJldHVybmVkIFRleHRGb3JtYXQgb2JqZWN0IGhhcyBhbGwgb2YgaXRzIHByb3BlcnRpZXMgZGVmaW5lZC4gTm8gcHJvcGVydHlcclxuXHQgKiBpcyA8Y29kZT5udWxsPC9jb2RlPi48L3A+XHJcblx0ICpcclxuXHQgKiA8cD48Yj5Ob3RlOjwvYj4gWW91IGNhbid0IHNldCB0aGlzIHByb3BlcnR5IGlmIGEgc3R5bGUgc2hlZXQgaXMgYXBwbGllZCB0b1xyXG5cdCAqIHRoZSB0ZXh0IGZpZWxkLjwvcD5cclxuXHQgKiBcclxuXHQgKiBAdGhyb3dzIEVycm9yIFRoaXMgbWV0aG9kIGNhbm5vdCBiZSB1c2VkIG9uIGEgdGV4dCBmaWVsZCB3aXRoIGEgc3R5bGVcclxuXHQgKiAgICAgICAgICAgICAgIHNoZWV0LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBkZWZhdWx0VGV4dEZvcm1hdDpUZXh0Rm9ybWF0O1xyXG5cclxuXHQvKipcclxuXHQgKiBTcGVjaWZpZXMgd2hldGhlciB0aGUgdGV4dCBmaWVsZCBpcyBhIHBhc3N3b3JkIHRleHQgZmllbGQuIElmIHRoZSB2YWx1ZSBvZlxyXG5cdCAqIHRoaXMgcHJvcGVydHkgaXMgPGNvZGU+dHJ1ZTwvY29kZT4sIHRoZSB0ZXh0IGZpZWxkIGlzIHRyZWF0ZWQgYXMgYVxyXG5cdCAqIHBhc3N3b3JkIHRleHQgZmllbGQgYW5kIGhpZGVzIHRoZSBpbnB1dCBjaGFyYWN0ZXJzIHVzaW5nIGFzdGVyaXNrcyBpbnN0ZWFkXHJcblx0ICogb2YgdGhlIGFjdHVhbCBjaGFyYWN0ZXJzLiBJZiA8Y29kZT5mYWxzZTwvY29kZT4sIHRoZSB0ZXh0IGZpZWxkIGlzIG5vdFxyXG5cdCAqIHRyZWF0ZWQgYXMgYSBwYXNzd29yZCB0ZXh0IGZpZWxkLiBXaGVuIHBhc3N3b3JkIG1vZGUgaXMgZW5hYmxlZCwgdGhlIEN1dFxyXG5cdCAqIGFuZCBDb3B5IGNvbW1hbmRzIGFuZCB0aGVpciBjb3JyZXNwb25kaW5nIGtleWJvYXJkIHNob3J0Y3V0cyB3aWxsIG5vdFxyXG5cdCAqIGZ1bmN0aW9uLiBUaGlzIHNlY3VyaXR5IG1lY2hhbmlzbSBwcmV2ZW50cyBhbiB1bnNjcnVwdWxvdXMgdXNlciBmcm9tIHVzaW5nXHJcblx0ICogdGhlIHNob3J0Y3V0cyB0byBkaXNjb3ZlciBhIHBhc3N3b3JkIG9uIGFuIHVuYXR0ZW5kZWQgY29tcHV0ZXIuXHJcblx0ICogXHJcblx0ICogQGRlZmF1bHQgZmFsc2VcclxuXHQgKi9cclxuXHRwdWJsaWMgZGlzcGxheUFzUGFzc3dvcmQ6Ym9vbGVhbjtcclxuXHJcblx0LyoqXHJcblx0ICogU3BlY2lmaWVzIHdoZXRoZXIgdG8gcmVuZGVyIGJ5IHVzaW5nIGVtYmVkZGVkIGZvbnQgb3V0bGluZXMuIElmXHJcblx0ICogPGNvZGU+ZmFsc2U8L2NvZGU+LCBGbGFzaCBQbGF5ZXIgcmVuZGVycyB0aGUgdGV4dCBmaWVsZCBieSB1c2luZyBkZXZpY2VcclxuXHQgKiBmb250cy5cclxuXHQgKlxyXG5cdCAqIDxwPklmIHlvdSBzZXQgdGhlIDxjb2RlPmVtYmVkRm9udHM8L2NvZGU+IHByb3BlcnR5IHRvIDxjb2RlPnRydWU8L2NvZGU+XHJcblx0ICogZm9yIGEgdGV4dCBmaWVsZCwgeW91IG11c3Qgc3BlY2lmeSBhIGZvbnQgZm9yIHRoYXQgdGV4dCBieSB1c2luZyB0aGVcclxuXHQgKiA8Y29kZT5mb250PC9jb2RlPiBwcm9wZXJ0eSBvZiBhIFRleHRGb3JtYXQgb2JqZWN0IGFwcGxpZWQgdG8gdGhlIHRleHRcclxuXHQgKiBmaWVsZC4gSWYgdGhlIHNwZWNpZmllZCBmb250IGlzIG5vdCBlbWJlZGRlZCBpbiB0aGUgU1dGIGZpbGUsIHRoZSB0ZXh0IGlzXHJcblx0ICogbm90IGRpc3BsYXllZC48L3A+XHJcblx0ICogXHJcblx0ICogQGRlZmF1bHQgZmFsc2VcclxuXHQgKi9cclxuXHRwdWJsaWMgZW1iZWRGb250czpib29sZWFuO1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgdHlwZSBvZiBncmlkIGZpdHRpbmcgdXNlZCBmb3IgdGhpcyB0ZXh0IGZpZWxkLiBUaGlzIHByb3BlcnR5IGFwcGxpZXNcclxuXHQgKiBvbmx5IGlmIHRoZSA8Y29kZT5mbGFzaC50ZXh0LkFudGlBbGlhc1R5cGU8L2NvZGU+IHByb3BlcnR5IG9mIHRoZSB0ZXh0XHJcblx0ICogZmllbGQgaXMgc2V0IHRvIDxjb2RlPmZsYXNoLnRleHQuQW50aUFsaWFzVHlwZS5BRFZBTkNFRDwvY29kZT4uXHJcblx0ICpcclxuXHQgKiA8cD5UaGUgdHlwZSBvZiBncmlkIGZpdHRpbmcgdXNlZCBkZXRlcm1pbmVzIHdoZXRoZXIgRmxhc2ggUGxheWVyIGZvcmNlc1xyXG5cdCAqIHN0cm9uZyBob3Jpem9udGFsIGFuZCB2ZXJ0aWNhbCBsaW5lcyB0byBmaXQgdG8gYSBwaXhlbCBvciBzdWJwaXhlbCBncmlkLFxyXG5cdCAqIG9yIG5vdCBhdCBhbGwuPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+Rm9yIHRoZSA8Y29kZT5mbGFzaC50ZXh0LkdyaWRGaXRUeXBlPC9jb2RlPiBwcm9wZXJ0eSwgeW91IGNhbiB1c2UgdGhlXHJcblx0ICogZm9sbG93aW5nIHN0cmluZyB2YWx1ZXM6PC9wPlxyXG5cdCAqIFxyXG5cdCAqIEBkZWZhdWx0IHBpeGVsXHJcblx0ICovXHJcblx0cHVibGljIGdyaWRGaXRUeXBlOkdyaWRGaXRUeXBlO1xyXG5cclxuXHQvKipcclxuXHQgKiBDb250YWlucyB0aGUgSFRNTCByZXByZXNlbnRhdGlvbiBvZiB0aGUgdGV4dCBmaWVsZCBjb250ZW50cy5cclxuXHQgKlxyXG5cdCAqIDxwPkZsYXNoIFBsYXllciBzdXBwb3J0cyB0aGUgZm9sbG93aW5nIEhUTUwgdGFnczo8L3A+XHJcblx0ICpcclxuXHQgKiA8cD5GbGFzaCBQbGF5ZXIgYW5kIEFJUiBhbHNvIHN1cHBvcnQgZXhwbGljaXQgY2hhcmFjdGVyIGNvZGVzLCBzdWNoIGFzXHJcblx0ICogJiMzODsoQVNDSUkgYW1wZXJzYW5kKSBhbmQgJiN4MjBBQzsoVW5pY29kZSDigqwgc3ltYm9sKS4gPC9wPlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBodG1sVGV4dDpzdHJpbmc7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBudW1iZXIgb2YgY2hhcmFjdGVycyBpbiBhIHRleHQgZmllbGQuIEEgY2hhcmFjdGVyIHN1Y2ggYXMgdGFiXHJcblx0ICogKDxjb2RlPlxcdDwvY29kZT4pIGNvdW50cyBhcyBvbmUgY2hhcmFjdGVyLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgbGVuZ3RoKCk6bnVtYmVyIC8qaW50Ki9cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fbGVuZ3RoO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIG1heGltdW0gbnVtYmVyIG9mIGNoYXJhY3RlcnMgdGhhdCB0aGUgdGV4dCBmaWVsZCBjYW4gY29udGFpbiwgYXNcclxuXHQgKiBlbnRlcmVkIGJ5IGEgdXNlci4gQSBzY3JpcHQgY2FuIGluc2VydCBtb3JlIHRleHQgdGhhblxyXG5cdCAqIDxjb2RlPm1heENoYXJzPC9jb2RlPiBhbGxvd3M7IHRoZSA8Y29kZT5tYXhDaGFyczwvY29kZT4gcHJvcGVydHkgaW5kaWNhdGVzXHJcblx0ICogb25seSBob3cgbXVjaCB0ZXh0IGEgdXNlciBjYW4gZW50ZXIuIElmIHRoZSB2YWx1ZSBvZiB0aGlzIHByb3BlcnR5IGlzXHJcblx0ICogPGNvZGU+MDwvY29kZT4sIGEgdXNlciBjYW4gZW50ZXIgYW4gdW5saW1pdGVkIGFtb3VudCBvZiB0ZXh0LlxyXG5cdCAqIFxyXG5cdCAqIEBkZWZhdWx0IDBcclxuXHQgKi9cclxuXHRwdWJsaWMgbWF4Q2hhcnM6bnVtYmVyIC8qaW50Ki87XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBtYXhpbXVtIHZhbHVlIG9mIDxjb2RlPnNjcm9sbEg8L2NvZGU+LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBtYXhTY3JvbGxIKCk6bnVtYmVyIC8qaW50Ki9cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fbWF4U2Nyb2xsSDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBtYXhpbXVtIHZhbHVlIG9mIDxjb2RlPnNjcm9sbFY8L2NvZGU+LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBtYXhTY3JvbGxWKCk6bnVtYmVyIC8qaW50Ki9cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fbWF4U2Nyb2xsVjtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEEgQm9vbGVhbiB2YWx1ZSB0aGF0IGluZGljYXRlcyB3aGV0aGVyIEZsYXNoIFBsYXllciBhdXRvbWF0aWNhbGx5IHNjcm9sbHNcclxuXHQgKiBtdWx0aWxpbmUgdGV4dCBmaWVsZHMgd2hlbiB0aGUgdXNlciBjbGlja3MgYSB0ZXh0IGZpZWxkIGFuZCByb2xscyB0aGVcclxuXHQgKiBtb3VzZSB3aGVlbC4gQnkgZGVmYXVsdCwgdGhpcyB2YWx1ZSBpcyA8Y29kZT50cnVlPC9jb2RlPi4gVGhpcyBwcm9wZXJ0eSBpc1xyXG5cdCAqIHVzZWZ1bCBpZiB5b3Ugd2FudCB0byBwcmV2ZW50IG1vdXNlIHdoZWVsIHNjcm9sbGluZyBvZiB0ZXh0IGZpZWxkcywgb3JcclxuXHQgKiBpbXBsZW1lbnQgeW91ciBvd24gdGV4dCBmaWVsZCBzY3JvbGxpbmcuXHJcblx0ICovXHJcblx0cHVibGljIG1vdXNlV2hlZWxFbmFibGVkOmJvb2xlYW47XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluZGljYXRlcyB3aGV0aGVyIGZpZWxkIGlzIGEgbXVsdGlsaW5lIHRleHQgZmllbGQuIElmIHRoZSB2YWx1ZSBpc1xyXG5cdCAqIDxjb2RlPnRydWU8L2NvZGU+LCB0aGUgdGV4dCBmaWVsZCBpcyBtdWx0aWxpbmU7IGlmIHRoZSB2YWx1ZSBpc1xyXG5cdCAqIDxjb2RlPmZhbHNlPC9jb2RlPiwgdGhlIHRleHQgZmllbGQgaXMgYSBzaW5nbGUtbGluZSB0ZXh0IGZpZWxkLiBJbiBhIGZpZWxkXHJcblx0ICogb2YgdHlwZSA8Y29kZT5UZXh0RmllbGRUeXBlLklOUFVUPC9jb2RlPiwgdGhlIDxjb2RlPm11bHRpbGluZTwvY29kZT4gdmFsdWVcclxuXHQgKiBkZXRlcm1pbmVzIHdoZXRoZXIgdGhlIDxjb2RlPkVudGVyPC9jb2RlPiBrZXkgY3JlYXRlcyBhIG5ldyBsaW5lKGEgdmFsdWVcclxuXHQgKiBvZiA8Y29kZT5mYWxzZTwvY29kZT4sIGFuZCB0aGUgPGNvZGU+RW50ZXI8L2NvZGU+IGtleSBpcyBpZ25vcmVkKS4gSWYgeW91XHJcblx0ICogcGFzdGUgdGV4dCBpbnRvIGEgPGNvZGU+VGV4dEZpZWxkPC9jb2RlPiB3aXRoIGEgPGNvZGU+bXVsdGlsaW5lPC9jb2RlPlxyXG5cdCAqIHZhbHVlIG9mIDxjb2RlPmZhbHNlPC9jb2RlPiwgbmV3bGluZXMgYXJlIHN0cmlwcGVkIG91dCBvZiB0aGUgdGV4dC5cclxuXHQgKiBcclxuXHQgKiBAZGVmYXVsdCBmYWxzZVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBtdWx0aWxpbmU6Ym9vbGVhbjtcclxuXHJcblx0LyoqXHJcblx0ICogRGVmaW5lcyB0aGUgbnVtYmVyIG9mIHRleHQgbGluZXMgaW4gYSBtdWx0aWxpbmUgdGV4dCBmaWVsZC4gSWZcclxuXHQgKiA8Y29kZT53b3JkV3JhcDwvY29kZT4gcHJvcGVydHkgaXMgc2V0IHRvIDxjb2RlPnRydWU8L2NvZGU+LCB0aGUgbnVtYmVyIG9mXHJcblx0ICogbGluZXMgaW5jcmVhc2VzIHdoZW4gdGV4dCB3cmFwcy5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IG51bUxpbmVzKCk6bnVtYmVyIC8qaW50Ki9cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fbnVtTGluZXM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJbmRpY2F0ZXMgdGhlIHNldCBvZiBjaGFyYWN0ZXJzIHRoYXQgYSB1c2VyIGNhbiBlbnRlciBpbnRvIHRoZSB0ZXh0IGZpZWxkLlxyXG5cdCAqIElmIHRoZSB2YWx1ZSBvZiB0aGUgPGNvZGU+cmVzdHJpY3Q8L2NvZGU+IHByb3BlcnR5IGlzIDxjb2RlPm51bGw8L2NvZGU+LFxyXG5cdCAqIHlvdSBjYW4gZW50ZXIgYW55IGNoYXJhY3Rlci4gSWYgdGhlIHZhbHVlIG9mIHRoZSA8Y29kZT5yZXN0cmljdDwvY29kZT5cclxuXHQgKiBwcm9wZXJ0eSBpcyBhbiBlbXB0eSBzdHJpbmcsIHlvdSBjYW5ub3QgZW50ZXIgYW55IGNoYXJhY3Rlci4gSWYgdGhlIHZhbHVlXHJcblx0ICogb2YgdGhlIDxjb2RlPnJlc3RyaWN0PC9jb2RlPiBwcm9wZXJ0eSBpcyBhIHN0cmluZyBvZiBjaGFyYWN0ZXJzLCB5b3UgY2FuXHJcblx0ICogZW50ZXIgb25seSBjaGFyYWN0ZXJzIGluIHRoZSBzdHJpbmcgaW50byB0aGUgdGV4dCBmaWVsZC4gVGhlIHN0cmluZyBpc1xyXG5cdCAqIHNjYW5uZWQgZnJvbSBsZWZ0IHRvIHJpZ2h0LiBZb3UgY2FuIHNwZWNpZnkgYSByYW5nZSBieSB1c2luZyB0aGUgaHlwaGVuXHJcblx0ICogKC0pIGNoYXJhY3Rlci4gT25seSB1c2VyIGludGVyYWN0aW9uIGlzIHJlc3RyaWN0ZWQ7IGEgc2NyaXB0IGNhbiBwdXQgYW55XHJcblx0ICogdGV4dCBpbnRvIHRoZSB0ZXh0IGZpZWxkLiA8cGggb3V0cHV0Y2xhc3M9XCJmbGFzaG9ubHlcIj5UaGlzIHByb3BlcnR5IGRvZXNcclxuXHQgKiBub3Qgc3luY2hyb25pemUgd2l0aCB0aGUgRW1iZWQgZm9udCBvcHRpb25zIGluIHRoZSBQcm9wZXJ0eSBpbnNwZWN0b3IuXHJcblx0ICpcclxuXHQgKiA8cD5JZiB0aGUgc3RyaW5nIGJlZ2lucyB3aXRoIGEgY2FyZXQoXikgY2hhcmFjdGVyLCBhbGwgY2hhcmFjdGVycyBhcmVcclxuXHQgKiBpbml0aWFsbHkgYWNjZXB0ZWQgYW5kIHN1Y2NlZWRpbmcgY2hhcmFjdGVycyBpbiB0aGUgc3RyaW5nIGFyZSBleGNsdWRlZFxyXG5cdCAqIGZyb20gdGhlIHNldCBvZiBhY2NlcHRlZCBjaGFyYWN0ZXJzLiBJZiB0aGUgc3RyaW5nIGRvZXMgbm90IGJlZ2luIHdpdGggYVxyXG5cdCAqIGNhcmV0KF4pIGNoYXJhY3Rlciwgbm8gY2hhcmFjdGVycyBhcmUgaW5pdGlhbGx5IGFjY2VwdGVkIGFuZCBzdWNjZWVkaW5nXHJcblx0ICogY2hhcmFjdGVycyBpbiB0aGUgc3RyaW5nIGFyZSBpbmNsdWRlZCBpbiB0aGUgc2V0IG9mIGFjY2VwdGVkXHJcblx0ICogY2hhcmFjdGVycy48L3A+XHJcblx0ICpcclxuXHQgKiA8cD5UaGUgZm9sbG93aW5nIGV4YW1wbGUgYWxsb3dzIG9ubHkgdXBwZXJjYXNlIGNoYXJhY3RlcnMsIHNwYWNlcywgYW5kXHJcblx0ICogbnVtYmVycyB0byBiZSBlbnRlcmVkIGludG8gYSB0ZXh0IGZpZWxkOjwvcD5cclxuXHQgKiA8cHJlIHhtbDpzcGFjZT1cInByZXNlcnZlXCI+IG15X3R4dC5yZXN0cmljdCA9IFwiQS1aIDAtOVwiOyA8L3ByZT5cclxuXHQgKlxyXG5cdCAqIDxwPlRoZSBmb2xsb3dpbmcgZXhhbXBsZSBpbmNsdWRlcyBhbGwgY2hhcmFjdGVycywgYnV0IGV4Y2x1ZGVzIGxvd2VyY2FzZVxyXG5cdCAqIGxldHRlcnM6PC9wPlxyXG5cdCAqIDxwcmUgeG1sOnNwYWNlPVwicHJlc2VydmVcIj4gbXlfdHh0LnJlc3RyaWN0ID0gXCJeYS16XCI7IDwvcHJlPlxyXG5cdCAqXHJcblx0ICogPHA+WW91IGNhbiB1c2UgYSBiYWNrc2xhc2ggdG8gZW50ZXIgYSBeIG9yIC0gdmVyYmF0aW0uIFRoZSBhY2NlcHRlZFxyXG5cdCAqIGJhY2tzbGFzaCBzZXF1ZW5jZXMgYXJlIFxcLSwgXFxeIG9yIFxcXFwuIFRoZSBiYWNrc2xhc2ggbXVzdCBiZSBhbiBhY3R1YWxcclxuXHQgKiBjaGFyYWN0ZXIgaW4gdGhlIHN0cmluZywgc28gd2hlbiBzcGVjaWZpZWQgaW4gQWN0aW9uU2NyaXB0LCBhIGRvdWJsZVxyXG5cdCAqIGJhY2tzbGFzaCBtdXN0IGJlIHVzZWQuIEZvciBleGFtcGxlLCB0aGUgZm9sbG93aW5nIGNvZGUgaW5jbHVkZXMgb25seSB0aGVcclxuXHQgKiBkYXNoKC0pIGFuZCBjYXJldCheKTo8L3A+XHJcblx0ICogPHByZSB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiPiBteV90eHQucmVzdHJpY3QgPSBcIlxcXFwtXFxcXF5cIjsgPC9wcmU+XHJcblx0ICpcclxuXHQgKiA8cD5UaGUgXiBjYW4gYmUgdXNlZCBhbnl3aGVyZSBpbiB0aGUgc3RyaW5nIHRvIHRvZ2dsZSBiZXR3ZWVuIGluY2x1ZGluZ1xyXG5cdCAqIGNoYXJhY3RlcnMgYW5kIGV4Y2x1ZGluZyBjaGFyYWN0ZXJzLiBUaGUgZm9sbG93aW5nIGNvZGUgaW5jbHVkZXMgb25seVxyXG5cdCAqIHVwcGVyY2FzZSBsZXR0ZXJzLCBidXQgZXhjbHVkZXMgdGhlIHVwcGVyY2FzZSBsZXR0ZXIgUTo8L3A+XHJcblx0ICogPHByZSB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiPiBteV90eHQucmVzdHJpY3QgPSBcIkEtWl5RXCI7IDwvcHJlPlxyXG5cdCAqXHJcblx0ICogPHA+WW91IGNhbiB1c2UgdGhlIDxjb2RlPlxcdTwvY29kZT4gZXNjYXBlIHNlcXVlbmNlIHRvIGNvbnN0cnVjdFxyXG5cdCAqIDxjb2RlPnJlc3RyaWN0PC9jb2RlPiBzdHJpbmdzLiBUaGUgZm9sbG93aW5nIGNvZGUgaW5jbHVkZXMgb25seSB0aGVcclxuXHQgKiBjaGFyYWN0ZXJzIGZyb20gQVNDSUkgMzIoc3BhY2UpIHRvIEFTQ0lJIDEyNih0aWxkZSkuPC9wPlxyXG5cdCAqIDxwcmUgeG1sOnNwYWNlPVwicHJlc2VydmVcIj4gbXlfdHh0LnJlc3RyaWN0ID0gXCJcXHUwMDIwLVxcdTAwN0VcIjsgPC9wcmU+XHJcblx0ICogXHJcblx0ICogQGRlZmF1bHQgbnVsbFxyXG5cdCAqL1xyXG5cdHB1YmxpYyByZXN0cmljdDpzdHJpbmc7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBjdXJyZW50IGhvcml6b250YWwgc2Nyb2xsaW5nIHBvc2l0aW9uLiBJZiB0aGUgPGNvZGU+c2Nyb2xsSDwvY29kZT5cclxuXHQgKiBwcm9wZXJ0eSBpcyAwLCB0aGUgdGV4dCBpcyBub3QgaG9yaXpvbnRhbGx5IHNjcm9sbGVkLiBUaGlzIHByb3BlcnR5IHZhbHVlXHJcblx0ICogaXMgYW4gaW50ZWdlciB0aGF0IHJlcHJlc2VudHMgdGhlIGhvcml6b250YWwgcG9zaXRpb24gaW4gcGl4ZWxzLlxyXG5cdCAqXHJcblx0ICogPHA+VGhlIHVuaXRzIG9mIGhvcml6b250YWwgc2Nyb2xsaW5nIGFyZSBwaXhlbHMsIHdoZXJlYXMgdGhlIHVuaXRzIG9mXHJcblx0ICogdmVydGljYWwgc2Nyb2xsaW5nIGFyZSBsaW5lcy4gSG9yaXpvbnRhbCBzY3JvbGxpbmcgaXMgbWVhc3VyZWQgaW4gcGl4ZWxzXHJcblx0ICogYmVjYXVzZSBtb3N0IGZvbnRzIHlvdSB0eXBpY2FsbHkgdXNlIGFyZSBwcm9wb3J0aW9uYWxseSBzcGFjZWQ7IHRoYXQgaXMsXHJcblx0ICogdGhlIGNoYXJhY3RlcnMgY2FuIGhhdmUgZGlmZmVyZW50IHdpZHRocy4gRmxhc2ggUGxheWVyIHBlcmZvcm1zIHZlcnRpY2FsXHJcblx0ICogc2Nyb2xsaW5nIGJ5IGxpbmUgYmVjYXVzZSB1c2VycyB1c3VhbGx5IHdhbnQgdG8gc2VlIGEgY29tcGxldGUgbGluZSBvZlxyXG5cdCAqIHRleHQgcmF0aGVyIHRoYW4gYSBwYXJ0aWFsIGxpbmUuIEV2ZW4gaWYgYSBsaW5lIHVzZXMgbXVsdGlwbGUgZm9udHMsIHRoZVxyXG5cdCAqIGhlaWdodCBvZiB0aGUgbGluZSBhZGp1c3RzIHRvIGZpdCB0aGUgbGFyZ2VzdCBmb250IGluIHVzZS48L3A+XHJcblx0ICpcclxuXHQgKiA8cD48Yj5Ob3RlOiA8L2I+VGhlIDxjb2RlPnNjcm9sbEg8L2NvZGU+IHByb3BlcnR5IGlzIHplcm8tYmFzZWQsIG5vdFxyXG5cdCAqIDEtYmFzZWQgbGlrZSB0aGUgPGNvZGU+c2Nyb2xsVjwvY29kZT4gdmVydGljYWwgc2Nyb2xsaW5nIHByb3BlcnR5LjwvcD5cclxuXHQgKi9cclxuXHRwdWJsaWMgc2Nyb2xsSDpudW1iZXI7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSB2ZXJ0aWNhbCBwb3NpdGlvbiBvZiB0ZXh0IGluIGEgdGV4dCBmaWVsZC4gVGhlIDxjb2RlPnNjcm9sbFY8L2NvZGU+XHJcblx0ICogcHJvcGVydHkgaXMgdXNlZnVsIGZvciBkaXJlY3RpbmcgdXNlcnMgdG8gYSBzcGVjaWZpYyBwYXJhZ3JhcGggaW4gYSBsb25nXHJcblx0ICogcGFzc2FnZSwgb3IgY3JlYXRpbmcgc2Nyb2xsaW5nIHRleHQgZmllbGRzLlxyXG5cdCAqXHJcblx0ICogPHA+VGhlIHVuaXRzIG9mIHZlcnRpY2FsIHNjcm9sbGluZyBhcmUgbGluZXMsIHdoZXJlYXMgdGhlIHVuaXRzIG9mXHJcblx0ICogaG9yaXpvbnRhbCBzY3JvbGxpbmcgYXJlIHBpeGVscy4gSWYgdGhlIGZpcnN0IGxpbmUgZGlzcGxheWVkIGlzIHRoZSBmaXJzdFxyXG5cdCAqIGxpbmUgaW4gdGhlIHRleHQgZmllbGQsIHNjcm9sbFYgaXMgc2V0IHRvIDEobm90IDApLiBIb3Jpem9udGFsIHNjcm9sbGluZ1xyXG5cdCAqIGlzIG1lYXN1cmVkIGluIHBpeGVscyBiZWNhdXNlIG1vc3QgZm9udHMgYXJlIHByb3BvcnRpb25hbGx5IHNwYWNlZDsgdGhhdFxyXG5cdCAqIGlzLCB0aGUgY2hhcmFjdGVycyBjYW4gaGF2ZSBkaWZmZXJlbnQgd2lkdGhzLiBGbGFzaCBwZXJmb3JtcyB2ZXJ0aWNhbFxyXG5cdCAqIHNjcm9sbGluZyBieSBsaW5lIGJlY2F1c2UgdXNlcnMgdXN1YWxseSB3YW50IHRvIHNlZSBhIGNvbXBsZXRlIGxpbmUgb2ZcclxuXHQgKiB0ZXh0IHJhdGhlciB0aGFuIGEgcGFydGlhbCBsaW5lLiBFdmVuIGlmIHRoZXJlIGFyZSBtdWx0aXBsZSBmb250cyBvbiBhXHJcblx0ICogbGluZSwgdGhlIGhlaWdodCBvZiB0aGUgbGluZSBhZGp1c3RzIHRvIGZpdCB0aGUgbGFyZ2VzdCBmb250IGluIHVzZS48L3A+XHJcblx0ICovXHJcblx0cHVibGljIHNjcm9sbFY6bnVtYmVyO1xyXG5cclxuXHQvKipcclxuXHQgKiBBIEJvb2xlYW4gdmFsdWUgdGhhdCBpbmRpY2F0ZXMgd2hldGhlciB0aGUgdGV4dCBmaWVsZCBpcyBzZWxlY3RhYmxlLiBUaGVcclxuXHQgKiB2YWx1ZSA8Y29kZT50cnVlPC9jb2RlPiBpbmRpY2F0ZXMgdGhhdCB0aGUgdGV4dCBpcyBzZWxlY3RhYmxlLiBUaGVcclxuXHQgKiA8Y29kZT5zZWxlY3RhYmxlPC9jb2RlPiBwcm9wZXJ0eSBjb250cm9scyB3aGV0aGVyIGEgdGV4dCBmaWVsZCBpc1xyXG5cdCAqIHNlbGVjdGFibGUsIG5vdCB3aGV0aGVyIGEgdGV4dCBmaWVsZCBpcyBlZGl0YWJsZS4gQSBkeW5hbWljIHRleHQgZmllbGQgY2FuXHJcblx0ICogYmUgc2VsZWN0YWJsZSBldmVuIGlmIGl0IGlzIG5vdCBlZGl0YWJsZS4gSWYgYSBkeW5hbWljIHRleHQgZmllbGQgaXMgbm90XHJcblx0ICogc2VsZWN0YWJsZSwgdGhlIHVzZXIgY2Fubm90IHNlbGVjdCBpdHMgdGV4dC5cclxuXHQgKlxyXG5cdCAqIDxwPklmIDxjb2RlPnNlbGVjdGFibGU8L2NvZGU+IGlzIHNldCB0byA8Y29kZT5mYWxzZTwvY29kZT4sIHRoZSB0ZXh0IGluXHJcblx0ICogdGhlIHRleHQgZmllbGQgZG9lcyBub3QgcmVzcG9uZCB0byBzZWxlY3Rpb24gY29tbWFuZHMgZnJvbSB0aGUgbW91c2Ugb3JcclxuXHQgKiBrZXlib2FyZCwgYW5kIHRoZSB0ZXh0IGNhbm5vdCBiZSBjb3BpZWQgd2l0aCB0aGUgQ29weSBjb21tYW5kLiBJZlxyXG5cdCAqIDxjb2RlPnNlbGVjdGFibGU8L2NvZGU+IGlzIHNldCB0byA8Y29kZT50cnVlPC9jb2RlPiwgdGhlIHRleHQgaW4gdGhlIHRleHRcclxuXHQgKiBmaWVsZCBjYW4gYmUgc2VsZWN0ZWQgd2l0aCB0aGUgbW91c2Ugb3Iga2V5Ym9hcmQsIGFuZCB0aGUgdGV4dCBjYW4gYmVcclxuXHQgKiBjb3BpZWQgd2l0aCB0aGUgQ29weSBjb21tYW5kLiBZb3UgY2FuIHNlbGVjdCB0ZXh0IHRoaXMgd2F5IGV2ZW4gaWYgdGhlXHJcblx0ICogdGV4dCBmaWVsZCBpcyBhIGR5bmFtaWMgdGV4dCBmaWVsZCBpbnN0ZWFkIG9mIGFuIGlucHV0IHRleHQgZmllbGQuIDwvcD5cclxuXHQgKiBcclxuXHQgKiBAZGVmYXVsdCB0cnVlXHJcblx0ICovXHJcblx0cHVibGljIHNlbGVjdGFibGU6Ym9vbGVhbjtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIHplcm8tYmFzZWQgY2hhcmFjdGVyIGluZGV4IHZhbHVlIG9mIHRoZSBmaXJzdCBjaGFyYWN0ZXIgaW4gdGhlIGN1cnJlbnRcclxuXHQgKiBzZWxlY3Rpb24uIEZvciBleGFtcGxlLCB0aGUgZmlyc3QgY2hhcmFjdGVyIGlzIDAsIHRoZSBzZWNvbmQgY2hhcmFjdGVyIGlzXHJcblx0ICogMSwgYW5kIHNvIG9uLiBJZiBubyB0ZXh0IGlzIHNlbGVjdGVkLCB0aGlzIHByb3BlcnR5IGlzIHRoZSB2YWx1ZSBvZlxyXG5cdCAqIDxjb2RlPmNhcmV0SW5kZXg8L2NvZGU+LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgc2VsZWN0aW9uQmVnaW5JbmRleCgpOm51bWJlciAvKmludCovXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3NlbGVjdGlvbkJlZ2luSW5kZXg7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgemVyby1iYXNlZCBjaGFyYWN0ZXIgaW5kZXggdmFsdWUgb2YgdGhlIGxhc3QgY2hhcmFjdGVyIGluIHRoZSBjdXJyZW50XHJcblx0ICogc2VsZWN0aW9uLiBGb3IgZXhhbXBsZSwgdGhlIGZpcnN0IGNoYXJhY3RlciBpcyAwLCB0aGUgc2Vjb25kIGNoYXJhY3RlciBpc1xyXG5cdCAqIDEsIGFuZCBzbyBvbi4gSWYgbm8gdGV4dCBpcyBzZWxlY3RlZCwgdGhpcyBwcm9wZXJ0eSBpcyB0aGUgdmFsdWUgb2ZcclxuXHQgKiA8Y29kZT5jYXJldEluZGV4PC9jb2RlPi5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHNlbGVjdGlvbkVuZEluZGV4KCk6bnVtYmVyIC8qaW50Ki9cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fc2VsZWN0aW9uRW5kSW5kZXg7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgc2hhcnBuZXNzIG9mIHRoZSBnbHlwaCBlZGdlcyBpbiB0aGlzIHRleHQgZmllbGQuIFRoaXMgcHJvcGVydHkgYXBwbGllc1xyXG5cdCAqIG9ubHkgaWYgdGhlIDxjb2RlPmZsYXNoLnRleHQuQW50aUFsaWFzVHlwZTwvY29kZT4gcHJvcGVydHkgb2YgdGhlIHRleHRcclxuXHQgKiBmaWVsZCBpcyBzZXQgdG8gPGNvZGU+Zmxhc2gudGV4dC5BbnRpQWxpYXNUeXBlLkFEVkFOQ0VEPC9jb2RlPi4gVGhlIHJhbmdlXHJcblx0ICogZm9yIDxjb2RlPnNoYXJwbmVzczwvY29kZT4gaXMgYSBudW1iZXIgZnJvbSAtNDAwIHRvIDQwMC4gSWYgeW91IGF0dGVtcHQgdG9cclxuXHQgKiBzZXQgPGNvZGU+c2hhcnBuZXNzPC9jb2RlPiB0byBhIHZhbHVlIG91dHNpZGUgdGhhdCByYW5nZSwgRmxhc2ggc2V0cyB0aGVcclxuXHQgKiBwcm9wZXJ0eSB0byB0aGUgbmVhcmVzdCB2YWx1ZSBpbiB0aGUgcmFuZ2UoZWl0aGVyIC00MDAgb3IgNDAwKS5cclxuXHQgKiBcclxuXHQgKiBAZGVmYXVsdCAwXHJcblx0ICovXHJcblx0cHVibGljIHNoYXJwbmVzczpudW1iZXI7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEF0dGFjaGVzIGEgc3R5bGUgc2hlZXQgdG8gdGhlIHRleHQgZmllbGQuIEZvciBpbmZvcm1hdGlvbiBvbiBjcmVhdGluZ1xyXG5cdCAqIHN0eWxlIHNoZWV0cywgc2VlIHRoZSBTdHlsZVNoZWV0IGNsYXNzIGFuZCB0aGUgPGk+QWN0aW9uU2NyaXB0IDMuMFxyXG5cdCAqIERldmVsb3BlcidzIEd1aWRlPC9pPi5cclxuXHQgKlxyXG5cdCAqIDxwPllvdSBjYW4gY2hhbmdlIHRoZSBzdHlsZSBzaGVldCBhc3NvY2lhdGVkIHdpdGggYSB0ZXh0IGZpZWxkIGF0IGFueVxyXG5cdCAqIHRpbWUuIElmIHlvdSBjaGFuZ2UgdGhlIHN0eWxlIHNoZWV0IGluIHVzZSwgdGhlIHRleHQgZmllbGQgaXMgcmVkcmF3biB3aXRoXHJcblx0ICogdGhlIG5ldyBzdHlsZSBzaGVldC4gWW91IGNhbiBzZXQgdGhlIHN0eWxlIHNoZWV0IHRvIDxjb2RlPm51bGw8L2NvZGU+IG9yXHJcblx0ICogPGNvZGU+dW5kZWZpbmVkPC9jb2RlPiB0byByZW1vdmUgdGhlIHN0eWxlIHNoZWV0LiBJZiB0aGUgc3R5bGUgc2hlZXQgaW5cclxuXHQgKiB1c2UgaXMgcmVtb3ZlZCwgdGhlIHRleHQgZmllbGQgaXMgcmVkcmF3biB3aXRob3V0IGEgc3R5bGUgc2hlZXQuIDwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPjxiPk5vdGU6PC9iPiBJZiB0aGUgc3R5bGUgc2hlZXQgaXMgcmVtb3ZlZCwgdGhlIGNvbnRlbnRzIG9mIGJvdGhcclxuXHQgKiA8Y29kZT5UZXh0RmllbGQudGV4dDwvY29kZT4gYW5kIDxjb2RlPiBUZXh0RmllbGQuaHRtbFRleHQ8L2NvZGU+IGNoYW5nZSB0b1xyXG5cdCAqIGluY29ycG9yYXRlIHRoZSBmb3JtYXR0aW5nIHByZXZpb3VzbHkgYXBwbGllZCBieSB0aGUgc3R5bGUgc2hlZXQuIFRvXHJcblx0ICogcHJlc2VydmUgdGhlIG9yaWdpbmFsIDxjb2RlPlRleHRGaWVsZC5odG1sVGV4dDwvY29kZT4gY29udGVudHMgd2l0aG91dCB0aGVcclxuXHQgKiBmb3JtYXR0aW5nLCBzYXZlIHRoZSB2YWx1ZSBpbiBhIHZhcmlhYmxlIGJlZm9yZSByZW1vdmluZyB0aGUgc3R5bGVcclxuXHQgKiBzaGVldC48L3A+XHJcblx0ICovXHJcblx0cHVibGljIHN0eWxlU2hlZXQ6U3R5bGVTaGVldDtcclxuXHJcblx0LyoqXHJcblx0ICogQSBzdHJpbmcgdGhhdCBpcyB0aGUgY3VycmVudCB0ZXh0IGluIHRoZSB0ZXh0IGZpZWxkLiBMaW5lcyBhcmUgc2VwYXJhdGVkXHJcblx0ICogYnkgdGhlIGNhcnJpYWdlIHJldHVybiBjaGFyYWN0ZXIoPGNvZGU+J1xccic8L2NvZGU+LCBBU0NJSSAxMykuIFRoaXNcclxuXHQgKiBwcm9wZXJ0eSBjb250YWlucyB1bmZvcm1hdHRlZCB0ZXh0IGluIHRoZSB0ZXh0IGZpZWxkLCB3aXRob3V0IEhUTUwgdGFncy5cclxuXHQgKlxyXG5cdCAqIDxwPlRvIGdldCB0aGUgdGV4dCBpbiBIVE1MIGZvcm0sIHVzZSB0aGUgPGNvZGU+aHRtbFRleHQ8L2NvZGU+XHJcblx0ICogcHJvcGVydHkuPC9wPlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgdGV4dCgpOnN0cmluZ1xyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl90ZXh0O1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCB0ZXh0KHZhbHVlOnN0cmluZylcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fdGV4dCA9PSB2YWx1ZSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0dGhpcy5fdGV4dCA9IHZhbHVlO1xyXG5cdFx0dGhpcy5yZUNvbnN0cnVjdCgpO1xyXG5cdH1cclxuXHRwdWJsaWMgZ2V0IHRleHRGb3JtYXQoKTpUZXh0Rm9ybWF0XHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3RleHRGb3JtYXQ7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHRleHRGb3JtYXQodmFsdWU6VGV4dEZvcm1hdClcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fdGV4dEZvcm1hdCA9PSB2YWx1ZSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0dGhpcy5fdGV4dEZvcm1hdCA9IHZhbHVlO1xyXG5cdFx0dGhpcy5yZUNvbnN0cnVjdCgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGNvbG9yIG9mIHRoZSB0ZXh0IGluIGEgdGV4dCBmaWVsZCwgaW4gaGV4YWRlY2ltYWwgZm9ybWF0LiBUaGVcclxuXHQgKiBoZXhhZGVjaW1hbCBjb2xvciBzeXN0ZW0gdXNlcyBzaXggZGlnaXRzIHRvIHJlcHJlc2VudCBjb2xvciB2YWx1ZXMuIEVhY2hcclxuXHQgKiBkaWdpdCBoYXMgMTYgcG9zc2libGUgdmFsdWVzIG9yIGNoYXJhY3RlcnMuIFRoZSBjaGFyYWN0ZXJzIHJhbmdlIGZyb20gMC05XHJcblx0ICogYW5kIHRoZW4gQS1GLiBGb3IgZXhhbXBsZSwgYmxhY2sgaXMgPGNvZGU+MHgwMDAwMDA8L2NvZGU+OyB3aGl0ZSBpc1xyXG5cdCAqIDxjb2RlPjB4RkZGRkZGPC9jb2RlPi5cclxuXHQgKiBcclxuXHQgKiBAZGVmYXVsdCAwKDB4MDAwMDAwKVxyXG5cdCAqL1xyXG5cdHB1YmxpYyB0ZXh0Q29sb3I6bnVtYmVyIC8qaW50Ki87XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBoZWlnaHQgb2YgdGhlIHRleHQgaW4gcGl4ZWxzLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgdGV4dEhlaWdodCgpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl90ZXh0SGVpZ2h0O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGludGVyYWN0aW9uIG1vZGUgcHJvcGVydHksIERlZmF1bHQgdmFsdWUgaXNcclxuXHQgKiBUZXh0SW50ZXJhY3Rpb25Nb2RlLk5PUk1BTC4gT24gbW9iaWxlIHBsYXRmb3JtcywgdGhlIG5vcm1hbCBtb2RlIGltcGxpZXNcclxuXHQgKiB0aGF0IHRoZSB0ZXh0IGNhbiBiZSBzY3JvbGxlZCBidXQgbm90IHNlbGVjdGVkLiBPbmUgY2FuIHN3aXRjaCB0byB0aGVcclxuXHQgKiBzZWxlY3RhYmxlIG1vZGUgdGhyb3VnaCB0aGUgaW4tYnVpbHQgY29udGV4dCBtZW51IG9uIHRoZSB0ZXh0IGZpZWxkLiBPblxyXG5cdCAqIERlc2t0b3AsIHRoZSBub3JtYWwgbW9kZSBpbXBsaWVzIHRoYXQgdGhlIHRleHQgaXMgaW4gc2Nyb2xsYWJsZSBhcyB3ZWxsIGFzXHJcblx0ICogc2VsZWN0aW9uIG1vZGUuXHJcblx0ICovXHJcblx0cHVibGljIGdldCB0ZXh0SW50ZXJhY3Rpb25Nb2RlKCk6VGV4dEludGVyYWN0aW9uTW9kZVxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl90ZXh0SW50ZXJhY3Rpb25Nb2RlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIHdpZHRoIG9mIHRoZSB0ZXh0IGluIHBpeGVscy5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHRleHRXaWR0aCgpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl90ZXh0V2lkdGg7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgdGhpY2tuZXNzIG9mIHRoZSBnbHlwaCBlZGdlcyBpbiB0aGlzIHRleHQgZmllbGQuIFRoaXMgcHJvcGVydHkgYXBwbGllc1xyXG5cdCAqIG9ubHkgd2hlbiA8Y29kZT5BbnRpQWxpYXNUeXBlPC9jb2RlPiBpcyBzZXQgdG9cclxuXHQgKiA8Y29kZT5BbnRpQWxpYXNUeXBlLkFEVkFOQ0VEPC9jb2RlPi5cclxuXHQgKlxyXG5cdCAqIDxwPlRoZSByYW5nZSBmb3IgPGNvZGU+dGhpY2tuZXNzPC9jb2RlPiBpcyBhIG51bWJlciBmcm9tIC0yMDAgdG8gMjAwLiBJZlxyXG5cdCAqIHlvdSBhdHRlbXB0IHRvIHNldCA8Y29kZT50aGlja25lc3M8L2NvZGU+IHRvIGEgdmFsdWUgb3V0c2lkZSB0aGF0IHJhbmdlLFxyXG5cdCAqIHRoZSBwcm9wZXJ0eSBpcyBzZXQgdG8gdGhlIG5lYXJlc3QgdmFsdWUgaW4gdGhlIHJhbmdlKGVpdGhlciAtMjAwIG9yXHJcblx0ICogMjAwKS48L3A+XHJcblx0ICogXHJcblx0ICogQGRlZmF1bHQgMFxyXG5cdCAqL1xyXG5cdHB1YmxpYyB0aGlja25lc3M6bnVtYmVyO1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgdHlwZSBvZiB0aGUgdGV4dCBmaWVsZC4gRWl0aGVyIG9uZSBvZiB0aGUgZm9sbG93aW5nIFRleHRGaWVsZFR5cGVcclxuXHQgKiBjb25zdGFudHM6IDxjb2RlPlRleHRGaWVsZFR5cGUuRFlOQU1JQzwvY29kZT4sIHdoaWNoIHNwZWNpZmllcyBhIGR5bmFtaWNcclxuXHQgKiB0ZXh0IGZpZWxkLCB3aGljaCBhIHVzZXIgY2Fubm90IGVkaXQsIG9yIDxjb2RlPlRleHRGaWVsZFR5cGUuSU5QVVQ8L2NvZGU+LFxyXG5cdCAqIHdoaWNoIHNwZWNpZmllcyBhbiBpbnB1dCB0ZXh0IGZpZWxkLCB3aGljaCBhIHVzZXIgY2FuIGVkaXQuXHJcblx0ICogXHJcblx0ICogQGRlZmF1bHQgZHluYW1pY1xyXG5cdCAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciBUaGUgPGNvZGU+dHlwZTwvY29kZT4gc3BlY2lmaWVkIGlzIG5vdCBhIG1lbWJlciBvZlxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBmbGFzaC50ZXh0LlRleHRGaWVsZFR5cGUuXHJcblx0ICovXHJcblx0cHVibGljIHR5cGU6VGV4dEZpZWxkVHlwZTtcclxuXHJcblx0LyoqXHJcblx0ICogU3BlY2lmaWVzIHdoZXRoZXIgdG8gY29weSBhbmQgcGFzdGUgdGhlIHRleHQgZm9ybWF0dGluZyBhbG9uZyB3aXRoIHRoZVxyXG5cdCAqIHRleHQuIFdoZW4gc2V0IHRvIDxjb2RlPnRydWU8L2NvZGU+LCBGbGFzaCBQbGF5ZXIgY29waWVzIGFuZCBwYXN0ZXNcclxuXHQgKiBmb3JtYXR0aW5nKHN1Y2ggYXMgYWxpZ25tZW50LCBib2xkLCBhbmQgaXRhbGljcykgd2hlbiB5b3UgY29weSBhbmQgcGFzdGVcclxuXHQgKiBiZXR3ZWVuIHRleHQgZmllbGRzLiBCb3RoIHRoZSBvcmlnaW4gYW5kIGRlc3RpbmF0aW9uIHRleHQgZmllbGRzIGZvciB0aGVcclxuXHQgKiBjb3B5IGFuZCBwYXN0ZSBwcm9jZWR1cmUgbXVzdCBoYXZlIDxjb2RlPnVzZVJpY2hUZXh0Q2xpcGJvYXJkPC9jb2RlPiBzZXRcclxuXHQgKiB0byA8Y29kZT50cnVlPC9jb2RlPi4gVGhlIGRlZmF1bHQgdmFsdWUgaXMgPGNvZGU+ZmFsc2U8L2NvZGU+LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyB1c2VSaWNoVGV4dENsaXBib2FyZDpib29sZWFuO1xyXG5cclxuXHQvKipcclxuXHQgKiBBIEJvb2xlYW4gdmFsdWUgdGhhdCBpbmRpY2F0ZXMgd2hldGhlciB0aGUgdGV4dCBmaWVsZCBoYXMgd29yZCB3cmFwLiBJZlxyXG5cdCAqIHRoZSB2YWx1ZSBvZiA8Y29kZT53b3JkV3JhcDwvY29kZT4gaXMgPGNvZGU+dHJ1ZTwvY29kZT4sIHRoZSB0ZXh0IGZpZWxkXHJcblx0ICogaGFzIHdvcmQgd3JhcDsgaWYgdGhlIHZhbHVlIGlzIDxjb2RlPmZhbHNlPC9jb2RlPiwgdGhlIHRleHQgZmllbGQgZG9lcyBub3RcclxuXHQgKiBoYXZlIHdvcmQgd3JhcC4gVGhlIGRlZmF1bHQgdmFsdWUgaXMgPGNvZGU+ZmFsc2U8L2NvZGU+LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyB3b3JkV3JhcDpib29sZWFuO1xyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGEgbmV3IFRleHRGaWVsZCBpbnN0YW5jZS4gQWZ0ZXIgeW91IGNyZWF0ZSB0aGUgVGV4dEZpZWxkIGluc3RhbmNlLFxyXG5cdCAqIGNhbGwgdGhlIDxjb2RlPmFkZENoaWxkKCk8L2NvZGU+IG9yIDxjb2RlPmFkZENoaWxkQXQoKTwvY29kZT4gbWV0aG9kIG9mXHJcblx0ICogdGhlIHBhcmVudCBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIG9iamVjdCB0byBhZGQgdGhlIFRleHRGaWVsZCBpbnN0YW5jZSB0b1xyXG5cdCAqIHRoZSBkaXNwbGF5IGxpc3QuXHJcblx0ICpcclxuXHQgKiA8cD5UaGUgZGVmYXVsdCBzaXplIGZvciBhIHRleHQgZmllbGQgaXMgMTAwIHggMTAwIHBpeGVscy48L3A+XHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoKVxyXG5cdHtcclxuXHRcdHN1cGVyKG5ldyBHZW9tZXRyeSgpKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXQgYXNzZXRUeXBlKCk6c3RyaW5nXHJcblx0e1xyXG5cdFx0cmV0dXJuIEFzc2V0VHlwZS5URVhURklFTEQ7XHJcblx0fVxyXG5cdC8qKlxyXG5cdCAqIFJlY29uc3RydWN0cyB0aGUgR2VvbWV0cnkgZm9yIHRoaXMgVGV4dC1maWVsZC5cclxuXHQgKi9cclxuXHRwdWJsaWMgcmVDb25zdHJ1Y3QoKSB7XHJcblxyXG5cdFx0Zm9yICh2YXIgaTpudW1iZXI9dGhpcy5nZW9tZXRyeS5zdWJHZW9tZXRyaWVzLmxlbmd0aC0xOyBpPj0wOyBpLS0pXHJcblx0XHRcdHRoaXMuZ2VvbWV0cnkucmVtb3ZlU3ViR2VvbWV0cnkodGhpcy5nZW9tZXRyeS5zdWJHZW9tZXRyaWVzW2ldKTtcclxuXHJcblx0XHRpZih0aGlzLl90ZXh0Rm9ybWF0PT1udWxsKXtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0aWYodGhpcy5fdGV4dD09XCJcIil7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdHZhciBpbmRpY2VzOkFycmF5PG51bWJlcj4gPSBuZXcgQXJyYXk8bnVtYmVyPigpO1xyXG5cdFx0dmFyIHBvc2l0aW9uczpBcnJheTxudW1iZXI+ID0gbmV3IEFycmF5PG51bWJlcj4oKTtcclxuXHRcdHZhciBjdXJ2ZURhdGE6QXJyYXk8bnVtYmVyPiA9IG5ldyBBcnJheTxudW1iZXI+KCk7XHJcblx0XHR2YXIgdXZzOkFycmF5PG51bWJlcj4gPSBuZXcgQXJyYXk8bnVtYmVyPigpO1xyXG5cclxuXHRcdHZhciBjaGFyX3NjYWxlOm51bWJlcj10aGlzLl90ZXh0Rm9ybWF0LnNpemUvdGhpcy5fdGV4dEZvcm1hdC5mb250X3RhYmxlLmdldF9mb250X2VtX3NpemUoKTtcclxuXHRcdHZhciB0cmlfaWR4X29mZnNldDpudW1iZXI9MDtcclxuXHRcdHZhciB0cmlfY250Om51bWJlcj0wO1xyXG5cdFx0dmFyIHhfb2Zmc2V0Om51bWJlcj0wO1xyXG5cdFx0dmFyIHlfb2Zmc2V0Om51bWJlcj0wO1xyXG5cdFx0dmFyIHByZXZfY2hhcjpUZXNzZWxhdGVkRm9udENoYXIgPSBudWxsO1xyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnRleHQubGVuZ3RoOyBpKyspIHtcclxuXHJcblx0XHRcdHZhciB0aGlzX2NoYXI6VGVzc2VsYXRlZEZvbnRDaGFyID0gPFRlc3NlbGF0ZWRGb250Q2hhcj4gdGhpcy5fdGV4dEZvcm1hdC5mb250X3RhYmxlLmdldF9zdWJnZW9fZm9yX2NoYXIodGhpcy5fdGV4dC5jaGFyQ29kZUF0KGkpLnRvU3RyaW5nKCkpO1xyXG5cdFx0XHRpZih0aGlzX2NoYXIhPSBudWxsKSB7XHJcblx0XHRcdFx0dmFyIHRoaXNfc3ViR2VvbTpDdXJ2ZVN1Ykdlb21ldHJ5ID0gdGhpc19jaGFyLnN1Ymdlb207XHJcblx0XHRcdFx0aWYgKHRoaXNfc3ViR2VvbSAhPSBudWxsKSB7XHJcblx0XHRcdFx0XHR0cmlfY250ID0gMDtcclxuXHRcdFx0XHRcdHZhciBpbmRpY2VzMjpBcnJheTxudW1iZXI+ID0gdGhpc19zdWJHZW9tLmluZGljZXM7XHJcblx0XHRcdFx0XHR2YXIgcG9zaXRpb25zMjpBcnJheTxudW1iZXI+ID0gdGhpc19zdWJHZW9tLnBvc2l0aW9ucztcclxuXHRcdFx0XHRcdHZhciBjdXJ2ZURhdGEyOkFycmF5PG51bWJlcj4gPSB0aGlzX3N1Ykdlb20uY3VydmVzO1xyXG5cdFx0XHRcdFx0Zm9yICh2YXIgdiA9IDA7IHYgPCBpbmRpY2VzMi5sZW5ndGg7IHYrKykge1xyXG5cdFx0XHRcdFx0XHRpbmRpY2VzLnB1c2goaW5kaWNlczJbdl0gKyB0cmlfaWR4X29mZnNldCk7XHJcblx0XHRcdFx0XHRcdHRyaV9jbnQrKztcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHRyaV9pZHhfb2Zmc2V0ICs9IHRyaV9jbnQ7XHJcblx0XHRcdFx0XHRmb3IgKHYgPSAwOyB2IDwgcG9zaXRpb25zMi5sZW5ndGggLyAzOyB2KyspIHtcclxuXHRcdFx0XHRcdFx0cG9zaXRpb25zLnB1c2goKHBvc2l0aW9uczJbdiAqIDNdICogY2hhcl9zY2FsZSkgKyB4X29mZnNldCk7XHJcblx0XHRcdFx0XHRcdHBvc2l0aW9ucy5wdXNoKChwb3NpdGlvbnMyW3YgKiAzICsgMV0gKiBjaGFyX3NjYWxlICogLTEpICsgeV9vZmZzZXQpO1xyXG5cdFx0XHRcdFx0XHRwb3NpdGlvbnMucHVzaChwb3NpdGlvbnMyW3YgKiAzICsgMl0pO1xyXG5cdFx0XHRcdFx0XHRjdXJ2ZURhdGEucHVzaChjdXJ2ZURhdGEyW3YgKiAyXSk7XHJcblx0XHRcdFx0XHRcdGN1cnZlRGF0YS5wdXNoKGN1cnZlRGF0YTJbdiAqIDIgKyAxXSk7XHJcblx0XHRcdFx0XHRcdHV2cy5wdXNoKHRoaXMuX3RleHRGb3JtYXQudXZfdmFsdWVzWzBdKTtcclxuXHRcdFx0XHRcdFx0dXZzLnB1c2godGhpcy5fdGV4dEZvcm1hdC51dl92YWx1ZXNbMV0pO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Ly8gZmluZCBrZXJuaW5nIHZhbHVlIHRoYXQgaGFzIGJlZW4gc2V0IGZvciB0aGlzIGNoYXJfY29kZSBvbiBwcmV2aW91cyBjaGFyIChpZiBub24gZXhpc3RzLCBrZXJuaW5nX3ZhbHVlIHdpbGwgc3RheSAwKVxyXG5cdFx0XHRcdFx0dmFyIGtlcm5pbmdfdmFsdWU6bnVtYmVyPTA7XHJcblx0XHRcdFx0XHRpZihwcmV2X2NoYXIhPW51bGwpe1xyXG5cdFx0XHRcdFx0XHRmb3IodmFyIGs6bnVtYmVyPTA7IGs8cHJldl9jaGFyLmtlcm5pbmdDaGFyQ29kZXMubGVuZ3RoO2srKyl7XHJcblx0XHRcdFx0XHRcdFx0aWYocHJldl9jaGFyLmtlcm5pbmdDaGFyQ29kZXNba109PXRoaXMuX3RleHQuY2hhckNvZGVBdChpKSl7XHJcblx0XHRcdFx0XHRcdFx0XHRrZXJuaW5nX3ZhbHVlPXByZXZfY2hhci5rZXJuaW5nVmFsdWVzW2tdO1xyXG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR4X29mZnNldCArPSAoKHRoaXNfY2hhci5jaGFyX3dpZHRoK2tlcm5pbmdfdmFsdWUpICogY2hhcl9zY2FsZSkgKyB0aGlzLl90ZXh0Rm9ybWF0LmxldHRlclNwYWNpbmc7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0Ly8gaWYgbm8gY2hhci1nZW9tZXRyeSB3YXMgZm91bmQsIHdlIGluc2VydCBhIFwic3BhY2VcIlxyXG5cdFx0XHRcdFx0eF9vZmZzZXQgKz0gdGhpcy5fdGV4dEZvcm1hdC5mb250X3RhYmxlLmdldF9mb250X2VtX3NpemUoKSAqIGNoYXJfc2NhbGU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdC8vIGlmIG5vIGNoYXItZ2VvbWV0cnkgd2FzIGZvdW5kLCB3ZSBpbnNlcnQgYSBcInNwYWNlXCJcclxuXHRcdFx0XHR4X29mZnNldCArPSB0aGlzLl90ZXh0Rm9ybWF0LmZvbnRfdGFibGUuZ2V0X2ZvbnRfZW1fc2l6ZSgpICogY2hhcl9zY2FsZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0dmFyIGN1cnZlX3N1Yl9nZW9tOkN1cnZlU3ViR2VvbWV0cnkgPSBuZXcgQ3VydmVTdWJHZW9tZXRyeSh0cnVlKTtcclxuXHRcdGN1cnZlX3N1Yl9nZW9tLnVwZGF0ZUluZGljZXMoaW5kaWNlcyk7XHJcblx0XHRjdXJ2ZV9zdWJfZ2VvbS51cGRhdGVQb3NpdGlvbnMocG9zaXRpb25zKTtcclxuXHRcdGN1cnZlX3N1Yl9nZW9tLnVwZGF0ZUN1cnZlcyhjdXJ2ZURhdGEpO1xyXG5cdFx0Y3VydmVfc3ViX2dlb20udXBkYXRlVVZzKHV2cyk7XHJcblx0XHR0aGlzLmdlb21ldHJ5LmFkZFN1Ykdlb21ldHJ5KGN1cnZlX3N1Yl9nZW9tKTtcclxuXHRcdHRoaXMuc3ViTWVzaGVzWzBdLm1hdGVyaWFsPXRoaXMuX3RleHRGb3JtYXQubWF0ZXJpYWw7XHJcblx0fVxyXG5cdC8qKlxyXG5cdCAqIEFwcGVuZHMgdGhlIHN0cmluZyBzcGVjaWZpZWQgYnkgdGhlIDxjb2RlPm5ld1RleHQ8L2NvZGU+IHBhcmFtZXRlciB0byB0aGVcclxuXHQgKiBlbmQgb2YgdGhlIHRleHQgb2YgdGhlIHRleHQgZmllbGQuIFRoaXMgbWV0aG9kIGlzIG1vcmUgZWZmaWNpZW50IHRoYW4gYW5cclxuXHQgKiBhZGRpdGlvbiBhc3NpZ25tZW50KDxjb2RlPis9PC9jb2RlPikgb24gYSA8Y29kZT50ZXh0PC9jb2RlPiBwcm9wZXJ0eVxyXG5cdCAqIChzdWNoIGFzIDxjb2RlPnNvbWVUZXh0RmllbGQudGV4dCArPSBtb3JlVGV4dDwvY29kZT4pLCBwYXJ0aWN1bGFybHkgZm9yIGFcclxuXHQgKiB0ZXh0IGZpZWxkIHRoYXQgY29udGFpbnMgYSBzaWduaWZpY2FudCBhbW91bnQgb2YgY29udGVudC5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gbmV3VGV4dCBUaGUgc3RyaW5nIHRvIGFwcGVuZCB0byB0aGUgZXhpc3RpbmcgdGV4dC5cclxuXHQgKi9cclxuXHRwdWJsaWMgYXBwZW5kVGV4dChuZXdUZXh0OnN0cmluZykge1xyXG5cdFx0dGhpcy5fdGV4dCs9bmV3VGV4dDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqICp0ZWxscyB0aGUgVGV4dGZpZWxkIHRoYXQgYSBwYXJhZ3JhcGggaXMgZGVmaW5lZCBjb21wbGV0bHkuXHJcblx0ICogZS5nLiB0aGUgdGV4dGZpZWxkIHdpbGwgc3RhcnQgYSBuZXcgbGluZSBmb3IgZnV0dXJlIGFkZGVkIHRleHQuXHJcblx0ICovXHJcblx0cHVibGljIGNsb3NlUGFyYWdyYXBoKClcclxuXHR7XHJcblx0XHQvL1RPRE9cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgYSByZWN0YW5nbGUgdGhhdCBpcyB0aGUgYm91bmRpbmcgYm94IG9mIHRoZSBjaGFyYWN0ZXIuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIGNoYXJJbmRleCBUaGUgemVyby1iYXNlZCBpbmRleCB2YWx1ZSBmb3IgdGhlIGNoYXJhY3Rlcihmb3JcclxuXHQgKiAgICAgICAgICAgICAgICAgIGV4YW1wbGUsIHRoZSBmaXJzdCBwb3NpdGlvbiBpcyAwLCB0aGUgc2Vjb25kIHBvc2l0aW9uIGlzXHJcblx0ICogICAgICAgICAgICAgICAgICAxLCBhbmQgc28gb24pLlxyXG5cdCAqIEByZXR1cm4gQSByZWN0YW5nbGUgd2l0aCA8Y29kZT54PC9jb2RlPiBhbmQgPGNvZGU+eTwvY29kZT4gbWluaW11bSBhbmRcclxuXHQgKiAgICAgICAgIG1heGltdW0gdmFsdWVzIGRlZmluaW5nIHRoZSBib3VuZGluZyBib3ggb2YgdGhlIGNoYXJhY3Rlci5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0Q2hhckJvdW5kYXJpZXMoY2hhckluZGV4Om51bWJlcik6UmVjdGFuZ2xlXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2NoYXJCb3VuZGFyaWVzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgemVyby1iYXNlZCBpbmRleCB2YWx1ZSBvZiB0aGUgY2hhcmFjdGVyIGF0IHRoZSBwb2ludCBzcGVjaWZpZWRcclxuXHQgKiBieSB0aGUgPGNvZGU+eDwvY29kZT4gYW5kIDxjb2RlPnk8L2NvZGU+IHBhcmFtZXRlcnMuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHggVGhlIDxpPng8L2k+IGNvb3JkaW5hdGUgb2YgdGhlIGNoYXJhY3Rlci5cclxuXHQgKiBAcGFyYW0geSBUaGUgPGk+eTwvaT4gY29vcmRpbmF0ZSBvZiB0aGUgY2hhcmFjdGVyLlxyXG5cdCAqIEByZXR1cm4gVGhlIHplcm8tYmFzZWQgaW5kZXggdmFsdWUgb2YgdGhlIGNoYXJhY3Rlcihmb3IgZXhhbXBsZSwgdGhlXHJcblx0ICogICAgICAgICBmaXJzdCBwb3NpdGlvbiBpcyAwLCB0aGUgc2Vjb25kIHBvc2l0aW9uIGlzIDEsIGFuZCBzbyBvbikuIFJldHVybnNcclxuXHQgKiAgICAgICAgIC0xIGlmIHRoZSBwb2ludCBpcyBub3Qgb3ZlciBhbnkgY2hhcmFjdGVyLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXRDaGFySW5kZXhBdFBvaW50KHg6bnVtYmVyLCB5Om51bWJlcik6bnVtYmVyIC8qaW50Ki9cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fY2hhckluZGV4QXRQb2ludDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdpdmVuIGEgY2hhcmFjdGVyIGluZGV4LCByZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgZmlyc3QgY2hhcmFjdGVyIGluIHRoZVxyXG5cdCAqIHNhbWUgcGFyYWdyYXBoLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBjaGFySW5kZXggVGhlIHplcm8tYmFzZWQgaW5kZXggdmFsdWUgb2YgdGhlIGNoYXJhY3Rlcihmb3IgZXhhbXBsZSxcclxuXHQgKiAgICAgICAgICAgICAgICAgIHRoZSBmaXJzdCBjaGFyYWN0ZXIgaXMgMCwgdGhlIHNlY29uZCBjaGFyYWN0ZXIgaXMgMSwgYW5kXHJcblx0ICogICAgICAgICAgICAgICAgICBzbyBvbikuXHJcblx0ICogQHJldHVybiBUaGUgemVyby1iYXNlZCBpbmRleCB2YWx1ZSBvZiB0aGUgZmlyc3QgY2hhcmFjdGVyIGluIHRoZSBzYW1lXHJcblx0ICogICAgICAgICBwYXJhZ3JhcGguXHJcblx0ICogQHRocm93cyBSYW5nZUVycm9yIFRoZSBjaGFyYWN0ZXIgaW5kZXggc3BlY2lmaWVkIGlzIG91dCBvZiByYW5nZS5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0Rmlyc3RDaGFySW5QYXJhZ3JhcGgoY2hhckluZGV4Om51bWJlciAvKmludCovKTpudW1iZXIgLyppbnQqL1xyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9maXJzdENoYXJJblBhcmFncmFwaDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgYSBEaXNwbGF5T2JqZWN0IHJlZmVyZW5jZSBmb3IgdGhlIGdpdmVuIDxjb2RlPmlkPC9jb2RlPiwgZm9yIGFuXHJcblx0ICogaW1hZ2Ugb3IgU1dGIGZpbGUgdGhhdCBoYXMgYmVlbiBhZGRlZCB0byBhbiBIVE1MLWZvcm1hdHRlZCB0ZXh0IGZpZWxkIGJ5XHJcblx0ICogdXNpbmcgYW4gPGNvZGU+PGltZz48L2NvZGU+IHRhZy4gVGhlIDxjb2RlPjxpbWc+PC9jb2RlPiB0YWcgaXMgaW4gdGhlXHJcblx0ICogZm9sbG93aW5nIGZvcm1hdDpcclxuXHQgKlxyXG5cdCAqIDxwPjxwcmUgeG1sOnNwYWNlPVwicHJlc2VydmVcIj48Y29kZT4gPGltZyBzcmMgPSAnZmlsZW5hbWUuanBnJyBpZCA9XHJcblx0ICogJ2luc3RhbmNlTmFtZScgPjwvY29kZT48L3ByZT48L3A+XHJcblx0ICogXHJcblx0ICogQHBhcmFtIGlkIFRoZSA8Y29kZT5pZDwvY29kZT4gdG8gbWF0Y2goaW4gdGhlIDxjb2RlPmlkPC9jb2RlPiBhdHRyaWJ1dGVcclxuXHQgKiAgICAgICAgICAgb2YgdGhlIDxjb2RlPjxpbWc+PC9jb2RlPiB0YWcpLlxyXG5cdCAqIEByZXR1cm4gVGhlIGRpc3BsYXkgb2JqZWN0IGNvcnJlc3BvbmRpbmcgdG8gdGhlIGltYWdlIG9yIFNXRiBmaWxlIHdpdGggdGhlXHJcblx0ICogICAgICAgICBtYXRjaGluZyA8Y29kZT5pZDwvY29kZT4gYXR0cmlidXRlIGluIHRoZSA8Y29kZT48aW1nPjwvY29kZT4gdGFnXHJcblx0ICogICAgICAgICBvZiB0aGUgdGV4dCBmaWVsZC4gRm9yIG1lZGlhIGxvYWRlZCBmcm9tIGFuIGV4dGVybmFsIHNvdXJjZSwgdGhpc1xyXG5cdCAqICAgICAgICAgb2JqZWN0IGlzIGEgTG9hZGVyIG9iamVjdCwgYW5kLCBvbmNlIGxvYWRlZCwgdGhlIG1lZGlhIG9iamVjdCBpcyBhXHJcblx0ICogICAgICAgICBjaGlsZCBvZiB0aGF0IExvYWRlciBvYmplY3QuIEZvciBtZWRpYSBlbWJlZGRlZCBpbiB0aGUgU1dGIGZpbGUsXHJcblx0ICogICAgICAgICBpdCBpcyB0aGUgbG9hZGVkIG9iamVjdC4gSWYgbm8gPGNvZGU+PGltZz48L2NvZGU+IHRhZyB3aXRoIHRoZVxyXG5cdCAqICAgICAgICAgbWF0Y2hpbmcgPGNvZGU+aWQ8L2NvZGU+IGV4aXN0cywgdGhlIG1ldGhvZCByZXR1cm5zXHJcblx0ICogICAgICAgICA8Y29kZT5udWxsPC9jb2RlPi5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0SW1hZ2VSZWZlcmVuY2UoaWQ6c3RyaW5nKTpEaXNwbGF5T2JqZWN0XHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2ltYWdlUmVmZXJlbmNlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgemVyby1iYXNlZCBpbmRleCB2YWx1ZSBvZiB0aGUgbGluZSBhdCB0aGUgcG9pbnQgc3BlY2lmaWVkIGJ5XHJcblx0ICogdGhlIDxjb2RlPng8L2NvZGU+IGFuZCA8Y29kZT55PC9jb2RlPiBwYXJhbWV0ZXJzLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSB4IFRoZSA8aT54PC9pPiBjb29yZGluYXRlIG9mIHRoZSBsaW5lLlxyXG5cdCAqIEBwYXJhbSB5IFRoZSA8aT55PC9pPiBjb29yZGluYXRlIG9mIHRoZSBsaW5lLlxyXG5cdCAqIEByZXR1cm4gVGhlIHplcm8tYmFzZWQgaW5kZXggdmFsdWUgb2YgdGhlIGxpbmUoZm9yIGV4YW1wbGUsIHRoZSBmaXJzdFxyXG5cdCAqICAgICAgICAgbGluZSBpcyAwLCB0aGUgc2Vjb25kIGxpbmUgaXMgMSwgYW5kIHNvIG9uKS4gUmV0dXJucyAtMSBpZiB0aGVcclxuXHQgKiAgICAgICAgIHBvaW50IGlzIG5vdCBvdmVyIGFueSBsaW5lLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXRMaW5lSW5kZXhBdFBvaW50KHg6bnVtYmVyLCB5Om51bWJlcik6bnVtYmVyIC8qaW50Ki9cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fbGluZUluZGV4QXRQb2ludDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIHplcm8tYmFzZWQgaW5kZXggdmFsdWUgb2YgdGhlIGxpbmUgY29udGFpbmluZyB0aGUgY2hhcmFjdGVyXHJcblx0ICogc3BlY2lmaWVkIGJ5IHRoZSA8Y29kZT5jaGFySW5kZXg8L2NvZGU+IHBhcmFtZXRlci5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gY2hhckluZGV4IFRoZSB6ZXJvLWJhc2VkIGluZGV4IHZhbHVlIG9mIHRoZSBjaGFyYWN0ZXIoZm9yIGV4YW1wbGUsXHJcblx0ICogICAgICAgICAgICAgICAgICB0aGUgZmlyc3QgY2hhcmFjdGVyIGlzIDAsIHRoZSBzZWNvbmQgY2hhcmFjdGVyIGlzIDEsIGFuZFxyXG5cdCAqICAgICAgICAgICAgICAgICAgc28gb24pLlxyXG5cdCAqIEByZXR1cm4gVGhlIHplcm8tYmFzZWQgaW5kZXggdmFsdWUgb2YgdGhlIGxpbmUuXHJcblx0ICogQHRocm93cyBSYW5nZUVycm9yIFRoZSBjaGFyYWN0ZXIgaW5kZXggc3BlY2lmaWVkIGlzIG91dCBvZiByYW5nZS5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0TGluZUluZGV4T2ZDaGFyKGNoYXJJbmRleDpudW1iZXIgLyppbnQqLyk6bnVtYmVyIC8qaW50Ki9cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fbGluZUluZGV4T2ZDaGFyO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGNoYXJhY3RlcnMgaW4gYSBzcGVjaWZpYyB0ZXh0IGxpbmUuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIGxpbmVJbmRleCBUaGUgbGluZSBudW1iZXIgZm9yIHdoaWNoIHlvdSB3YW50IHRoZSBsZW5ndGguXHJcblx0ICogQHJldHVybiBUaGUgbnVtYmVyIG9mIGNoYXJhY3RlcnMgaW4gdGhlIGxpbmUuXHJcblx0ICogQHRocm93cyBSYW5nZUVycm9yIFRoZSBsaW5lIG51bWJlciBzcGVjaWZpZWQgaXMgb3V0IG9mIHJhbmdlLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXRMaW5lTGVuZ3RoKGxpbmVJbmRleDpudW1iZXIgLyppbnQqLyk6bnVtYmVyIC8qaW50Ki9cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fbGluZUxlbmd0aDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgbWV0cmljcyBpbmZvcm1hdGlvbiBhYm91dCBhIGdpdmVuIHRleHQgbGluZS5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gbGluZUluZGV4IFRoZSBsaW5lIG51bWJlciBmb3Igd2hpY2ggeW91IHdhbnQgbWV0cmljcyBpbmZvcm1hdGlvbi5cclxuXHQgKiBAcmV0dXJuIEEgVGV4dExpbmVNZXRyaWNzIG9iamVjdC5cclxuXHQgKiBAdGhyb3dzIFJhbmdlRXJyb3IgVGhlIGxpbmUgbnVtYmVyIHNwZWNpZmllZCBpcyBvdXQgb2YgcmFuZ2UuXHJcblx0ICovXHJcblx0cHVibGljIGdldExpbmVNZXRyaWNzKGxpbmVJbmRleDpudW1iZXIgLyppbnQqLyk6VGV4dExpbmVNZXRyaWNzXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2xpbmVNZXRyaWNzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgY2hhcmFjdGVyIGluZGV4IG9mIHRoZSBmaXJzdCBjaGFyYWN0ZXIgaW4gdGhlIGxpbmUgdGhhdCB0aGVcclxuXHQgKiA8Y29kZT5saW5lSW5kZXg8L2NvZGU+IHBhcmFtZXRlciBzcGVjaWZpZXMuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIGxpbmVJbmRleCBUaGUgemVyby1iYXNlZCBpbmRleCB2YWx1ZSBvZiB0aGUgbGluZShmb3IgZXhhbXBsZSwgdGhlXHJcblx0ICogICAgICAgICAgICAgICAgICBmaXJzdCBsaW5lIGlzIDAsIHRoZSBzZWNvbmQgbGluZSBpcyAxLCBhbmQgc28gb24pLlxyXG5cdCAqIEByZXR1cm4gVGhlIHplcm8tYmFzZWQgaW5kZXggdmFsdWUgb2YgdGhlIGZpcnN0IGNoYXJhY3RlciBpbiB0aGUgbGluZS5cclxuXHQgKiBAdGhyb3dzIFJhbmdlRXJyb3IgVGhlIGxpbmUgbnVtYmVyIHNwZWNpZmllZCBpcyBvdXQgb2YgcmFuZ2UuXHJcblx0ICovXHJcblx0cHVibGljIGdldExpbmVPZmZzZXQobGluZUluZGV4Om51bWJlciAvKmludCovKTpudW1iZXIgLyppbnQqL1xyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9saW5lT2Zmc2V0O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgdGV4dCBvZiB0aGUgbGluZSBzcGVjaWZpZWQgYnkgdGhlIDxjb2RlPmxpbmVJbmRleDwvY29kZT5cclxuXHQgKiBwYXJhbWV0ZXIuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIGxpbmVJbmRleCBUaGUgemVyby1iYXNlZCBpbmRleCB2YWx1ZSBvZiB0aGUgbGluZShmb3IgZXhhbXBsZSwgdGhlXHJcblx0ICogICAgICAgICAgICAgICAgICBmaXJzdCBsaW5lIGlzIDAsIHRoZSBzZWNvbmQgbGluZSBpcyAxLCBhbmQgc28gb24pLlxyXG5cdCAqIEByZXR1cm4gVGhlIHRleHQgc3RyaW5nIGNvbnRhaW5lZCBpbiB0aGUgc3BlY2lmaWVkIGxpbmUuXHJcblx0ICogQHRocm93cyBSYW5nZUVycm9yIFRoZSBsaW5lIG51bWJlciBzcGVjaWZpZWQgaXMgb3V0IG9mIHJhbmdlLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXRMaW5lVGV4dChsaW5lSW5kZXg6bnVtYmVyIC8qaW50Ki8pOnN0cmluZ1xyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9saW5lVGV4dDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdpdmVuIGEgY2hhcmFjdGVyIGluZGV4LCByZXR1cm5zIHRoZSBsZW5ndGggb2YgdGhlIHBhcmFncmFwaCBjb250YWluaW5nXHJcblx0ICogdGhlIGdpdmVuIGNoYXJhY3Rlci4gVGhlIGxlbmd0aCBpcyByZWxhdGl2ZSB0byB0aGUgZmlyc3QgY2hhcmFjdGVyIGluIHRoZVxyXG5cdCAqIHBhcmFncmFwaChhcyByZXR1cm5lZCBieSA8Y29kZT5nZXRGaXJzdENoYXJJblBhcmFncmFwaCgpPC9jb2RlPiksIG5vdCB0b1xyXG5cdCAqIHRoZSBjaGFyYWN0ZXIgaW5kZXggcGFzc2VkIGluLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBjaGFySW5kZXggVGhlIHplcm8tYmFzZWQgaW5kZXggdmFsdWUgb2YgdGhlIGNoYXJhY3Rlcihmb3IgZXhhbXBsZSxcclxuXHQgKiAgICAgICAgICAgICAgICAgIHRoZSBmaXJzdCBjaGFyYWN0ZXIgaXMgMCwgdGhlIHNlY29uZCBjaGFyYWN0ZXIgaXMgMSwgYW5kXHJcblx0ICogICAgICAgICAgICAgICAgICBzbyBvbikuXHJcblx0ICogQHJldHVybiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgY2hhcmFjdGVycyBpbiB0aGUgcGFyYWdyYXBoLlxyXG5cdCAqIEB0aHJvd3MgUmFuZ2VFcnJvciBUaGUgY2hhcmFjdGVyIGluZGV4IHNwZWNpZmllZCBpcyBvdXQgb2YgcmFuZ2UuXHJcblx0ICovXHJcblx0cHVibGljIGdldFBhcmFncmFwaExlbmd0aChjaGFySW5kZXg6bnVtYmVyIC8qaW50Ki8pOm51bWJlciAvKmludCovXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BhcmFncmFwaExlbmd0aDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgYSBUZXh0Rm9ybWF0IG9iamVjdCB0aGF0IGNvbnRhaW5zIGZvcm1hdHRpbmcgaW5mb3JtYXRpb24gZm9yIHRoZVxyXG5cdCAqIHJhbmdlIG9mIHRleHQgdGhhdCB0aGUgPGNvZGU+YmVnaW5JbmRleDwvY29kZT4gYW5kIDxjb2RlPmVuZEluZGV4PC9jb2RlPlxyXG5cdCAqIHBhcmFtZXRlcnMgc3BlY2lmeS4gT25seSBwcm9wZXJ0aWVzIHRoYXQgYXJlIGNvbW1vbiB0byB0aGUgZW50aXJlIHRleHRcclxuXHQgKiBzcGVjaWZpZWQgYXJlIHNldCBpbiB0aGUgcmVzdWx0aW5nIFRleHRGb3JtYXQgb2JqZWN0LiBBbnkgcHJvcGVydHkgdGhhdCBpc1xyXG5cdCAqIDxpPm1peGVkPC9pPiwgbWVhbmluZyB0aGF0IGl0IGhhcyBkaWZmZXJlbnQgdmFsdWVzIGF0IGRpZmZlcmVudCBwb2ludHMgaW5cclxuXHQgKiB0aGUgdGV4dCwgaGFzIGEgdmFsdWUgb2YgPGNvZGU+bnVsbDwvY29kZT4uXHJcblx0ICpcclxuXHQgKiA8cD5JZiB5b3UgZG8gbm90IHNwZWNpZnkgdmFsdWVzIGZvciB0aGVzZSBwYXJhbWV0ZXJzLCB0aGlzIG1ldGhvZCBpc1xyXG5cdCAqIGFwcGxpZWQgdG8gYWxsIHRoZSB0ZXh0IGluIHRoZSB0ZXh0IGZpZWxkLiA8L3A+XHJcblx0ICpcclxuXHQgKiA8cD5UaGUgZm9sbG93aW5nIHRhYmxlIGRlc2NyaWJlcyB0aHJlZSBwb3NzaWJsZSB1c2FnZXM6PC9wPlxyXG5cdCAqIFxyXG5cdCAqIEByZXR1cm4gVGhlIFRleHRGb3JtYXQgb2JqZWN0IHRoYXQgcmVwcmVzZW50cyB0aGUgZm9ybWF0dGluZyBwcm9wZXJ0aWVzXHJcblx0ICogICAgICAgICBmb3IgdGhlIHNwZWNpZmllZCB0ZXh0LlxyXG5cdCAqIEB0aHJvd3MgUmFuZ2VFcnJvciBUaGUgPGNvZGU+YmVnaW5JbmRleDwvY29kZT4gb3IgPGNvZGU+ZW5kSW5kZXg8L2NvZGU+XHJcblx0ICogICAgICAgICAgICAgICAgICAgIHNwZWNpZmllZCBpcyBvdXQgb2YgcmFuZ2UuXHJcblx0ICovXHJcblx0cHVibGljIGdldFRleHRGb3JtYXQoYmVnaW5JbmRleDpudW1iZXIgLyppbnQqLyA9IC0xLCBlbmRJbmRleDpudW1iZXIgLyppbnQqLyA9IC0xKTpUZXh0Rm9ybWF0XHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3RleHRGb3JtYXQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXBsYWNlcyB0aGUgY3VycmVudCBzZWxlY3Rpb24gd2l0aCB0aGUgY29udGVudHMgb2YgdGhlIDxjb2RlPnZhbHVlPC9jb2RlPlxyXG5cdCAqIHBhcmFtZXRlci4gVGhlIHRleHQgaXMgaW5zZXJ0ZWQgYXQgdGhlIHBvc2l0aW9uIG9mIHRoZSBjdXJyZW50IHNlbGVjdGlvbixcclxuXHQgKiB1c2luZyB0aGUgY3VycmVudCBkZWZhdWx0IGNoYXJhY3RlciBmb3JtYXQgYW5kIGRlZmF1bHQgcGFyYWdyYXBoIGZvcm1hdC5cclxuXHQgKiBUaGUgdGV4dCBpcyBub3QgdHJlYXRlZCBhcyBIVE1MLlxyXG5cdCAqXHJcblx0ICogPHA+WW91IGNhbiB1c2UgdGhlIDxjb2RlPnJlcGxhY2VTZWxlY3RlZFRleHQoKTwvY29kZT4gbWV0aG9kIHRvIGluc2VydCBhbmRcclxuXHQgKiBkZWxldGUgdGV4dCB3aXRob3V0IGRpc3J1cHRpbmcgdGhlIGNoYXJhY3RlciBhbmQgcGFyYWdyYXBoIGZvcm1hdHRpbmcgb2ZcclxuXHQgKiB0aGUgcmVzdCBvZiB0aGUgdGV4dC48L3A+XHJcblx0ICpcclxuXHQgKiA8cD48Yj5Ob3RlOjwvYj4gVGhpcyBtZXRob2QgZG9lcyBub3Qgd29yayBpZiBhIHN0eWxlIHNoZWV0IGlzIGFwcGxpZWQgdG9cclxuXHQgKiB0aGUgdGV4dCBmaWVsZC48L3A+XHJcblx0ICogXHJcblx0ICogQHBhcmFtIHZhbHVlIFRoZSBzdHJpbmcgdG8gcmVwbGFjZSB0aGUgY3VycmVudGx5IHNlbGVjdGVkIHRleHQuXHJcblx0ICogQHRocm93cyBFcnJvciBUaGlzIG1ldGhvZCBjYW5ub3QgYmUgdXNlZCBvbiBhIHRleHQgZmllbGQgd2l0aCBhIHN0eWxlXHJcblx0ICogICAgICAgICAgICAgICBzaGVldC5cclxuXHQgKi9cclxuXHRwdWJsaWMgcmVwbGFjZVNlbGVjdGVkVGV4dCh2YWx1ZTpzdHJpbmcpXHJcblx0e1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlcGxhY2VzIHRoZSByYW5nZSBvZiBjaGFyYWN0ZXJzIHRoYXQgdGhlIDxjb2RlPmJlZ2luSW5kZXg8L2NvZGU+IGFuZFxyXG5cdCAqIDxjb2RlPmVuZEluZGV4PC9jb2RlPiBwYXJhbWV0ZXJzIHNwZWNpZnkgd2l0aCB0aGUgY29udGVudHMgb2YgdGhlXHJcblx0ICogPGNvZGU+bmV3VGV4dDwvY29kZT4gcGFyYW1ldGVyLiBBcyBkZXNpZ25lZCwgdGhlIHRleHQgZnJvbVxyXG5cdCAqIDxjb2RlPmJlZ2luSW5kZXg8L2NvZGU+IHRvIDxjb2RlPmVuZEluZGV4LTE8L2NvZGU+IGlzIHJlcGxhY2VkLlxyXG5cdCAqXHJcblx0ICogPHA+PGI+Tm90ZTo8L2I+IFRoaXMgbWV0aG9kIGRvZXMgbm90IHdvcmsgaWYgYSBzdHlsZSBzaGVldCBpcyBhcHBsaWVkIHRvXHJcblx0ICogdGhlIHRleHQgZmllbGQuPC9wPlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBiZWdpbkluZGV4IFRoZSB6ZXJvLWJhc2VkIGluZGV4IHZhbHVlIGZvciB0aGUgc3RhcnQgcG9zaXRpb24gb2YgdGhlXHJcblx0ICogICAgICAgICAgICAgICAgICAgcmVwbGFjZW1lbnQgcmFuZ2UuXHJcblx0ICogQHBhcmFtIGVuZEluZGV4ICAgVGhlIHplcm8tYmFzZWQgaW5kZXggcG9zaXRpb24gb2YgdGhlIGZpcnN0IGNoYXJhY3RlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgIGFmdGVyIHRoZSBkZXNpcmVkIHRleHQgc3Bhbi5cclxuXHQgKiBAcGFyYW0gbmV3VGV4dCAgICBUaGUgdGV4dCB0byB1c2UgdG8gcmVwbGFjZSB0aGUgc3BlY2lmaWVkIHJhbmdlIG9mXHJcblx0ICogICAgICAgICAgICAgICAgICAgY2hhcmFjdGVycy5cclxuXHQgKiBAdGhyb3dzIEVycm9yIFRoaXMgbWV0aG9kIGNhbm5vdCBiZSB1c2VkIG9uIGEgdGV4dCBmaWVsZCB3aXRoIGEgc3R5bGVcclxuXHQgKiAgICAgICAgICAgICAgIHNoZWV0LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyByZXBsYWNlVGV4dChiZWdpbkluZGV4Om51bWJlciAvKmludCovLCBlbmRJbmRleDpudW1iZXIgLyppbnQqLywgbmV3VGV4dDpzdHJpbmcpXHJcblx0e1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgYXMgc2VsZWN0ZWQgdGhlIHRleHQgZGVzaWduYXRlZCBieSB0aGUgaW5kZXggdmFsdWVzIG9mIHRoZSBmaXJzdCBhbmRcclxuXHQgKiBsYXN0IGNoYXJhY3RlcnMsIHdoaWNoIGFyZSBzcGVjaWZpZWQgd2l0aCB0aGUgPGNvZGU+YmVnaW5JbmRleDwvY29kZT4gYW5kXHJcblx0ICogPGNvZGU+ZW5kSW5kZXg8L2NvZGU+IHBhcmFtZXRlcnMuIElmIHRoZSB0d28gcGFyYW1ldGVyIHZhbHVlcyBhcmUgdGhlXHJcblx0ICogc2FtZSwgdGhpcyBtZXRob2Qgc2V0cyB0aGUgaW5zZXJ0aW9uIHBvaW50LCBhcyBpZiB5b3Ugc2V0IHRoZVxyXG5cdCAqIDxjb2RlPmNhcmV0SW5kZXg8L2NvZGU+IHByb3BlcnR5LlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBiZWdpbkluZGV4IFRoZSB6ZXJvLWJhc2VkIGluZGV4IHZhbHVlIG9mIHRoZSBmaXJzdCBjaGFyYWN0ZXIgaW4gdGhlXHJcblx0ICogICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uKGZvciBleGFtcGxlLCB0aGUgZmlyc3QgY2hhcmFjdGVyIGlzIDAsIHRoZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgIHNlY29uZCBjaGFyYWN0ZXIgaXMgMSwgYW5kIHNvIG9uKS5cclxuXHQgKiBAcGFyYW0gZW5kSW5kZXggICBUaGUgemVyby1iYXNlZCBpbmRleCB2YWx1ZSBvZiB0aGUgbGFzdCBjaGFyYWN0ZXIgaW4gdGhlXHJcblx0ICogICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzZXRTZWxlY3Rpb24oYmVnaW5JbmRleDpudW1iZXIgLyppbnQqLywgZW5kSW5kZXg6bnVtYmVyIC8qaW50Ki8pXHJcblx0e1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFwcGxpZXMgdGhlIHRleHQgZm9ybWF0dGluZyB0aGF0IHRoZSA8Y29kZT5mb3JtYXQ8L2NvZGU+IHBhcmFtZXRlclxyXG5cdCAqIHNwZWNpZmllcyB0byB0aGUgc3BlY2lmaWVkIHRleHQgaW4gYSB0ZXh0IGZpZWxkLiBUaGUgdmFsdWUgb2ZcclxuXHQgKiA8Y29kZT5mb3JtYXQ8L2NvZGU+IG11c3QgYmUgYSBUZXh0Rm9ybWF0IG9iamVjdCB0aGF0IHNwZWNpZmllcyB0aGUgZGVzaXJlZFxyXG5cdCAqIHRleHQgZm9ybWF0dGluZyBjaGFuZ2VzLiBPbmx5IHRoZSBub24tbnVsbCBwcm9wZXJ0aWVzIG9mXHJcblx0ICogPGNvZGU+Zm9ybWF0PC9jb2RlPiBhcmUgYXBwbGllZCB0byB0aGUgdGV4dCBmaWVsZC4gQW55IHByb3BlcnR5IG9mXHJcblx0ICogPGNvZGU+Zm9ybWF0PC9jb2RlPiB0aGF0IGlzIHNldCB0byA8Y29kZT5udWxsPC9jb2RlPiBpcyBub3QgYXBwbGllZC4gQnlcclxuXHQgKiBkZWZhdWx0LCBhbGwgb2YgdGhlIHByb3BlcnRpZXMgb2YgYSBuZXdseSBjcmVhdGVkIFRleHRGb3JtYXQgb2JqZWN0IGFyZVxyXG5cdCAqIHNldCB0byA8Y29kZT5udWxsPC9jb2RlPi5cclxuXHQgKlxyXG5cdCAqIDxwPjxiPk5vdGU6PC9iPiBUaGlzIG1ldGhvZCBkb2VzIG5vdCB3b3JrIGlmIGEgc3R5bGUgc2hlZXQgaXMgYXBwbGllZCB0b1xyXG5cdCAqIHRoZSB0ZXh0IGZpZWxkLjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPlRoZSA8Y29kZT5zZXRUZXh0Rm9ybWF0KCk8L2NvZGU+IG1ldGhvZCBjaGFuZ2VzIHRoZSB0ZXh0IGZvcm1hdHRpbmdcclxuXHQgKiBhcHBsaWVkIHRvIGEgcmFuZ2Ugb2YgY2hhcmFjdGVycyBvciB0byB0aGUgZW50aXJlIGJvZHkgb2YgdGV4dCBpbiBhIHRleHRcclxuXHQgKiBmaWVsZC4gVG8gYXBwbHkgdGhlIHByb3BlcnRpZXMgb2YgZm9ybWF0IHRvIGFsbCB0ZXh0IGluIHRoZSB0ZXh0IGZpZWxkLCBkb1xyXG5cdCAqIG5vdCBzcGVjaWZ5IHZhbHVlcyBmb3IgPGNvZGU+YmVnaW5JbmRleDwvY29kZT4gYW5kIDxjb2RlPmVuZEluZGV4PC9jb2RlPi5cclxuXHQgKiBUbyBhcHBseSB0aGUgcHJvcGVydGllcyBvZiB0aGUgZm9ybWF0IHRvIGEgcmFuZ2Ugb2YgdGV4dCwgc3BlY2lmeSB2YWx1ZXNcclxuXHQgKiBmb3IgdGhlIDxjb2RlPmJlZ2luSW5kZXg8L2NvZGU+IGFuZCB0aGUgPGNvZGU+ZW5kSW5kZXg8L2NvZGU+IHBhcmFtZXRlcnMuXHJcblx0ICogWW91IGNhbiB1c2UgdGhlIDxjb2RlPmxlbmd0aDwvY29kZT4gcHJvcGVydHkgdG8gZGV0ZXJtaW5lIHRoZSBpbmRleFxyXG5cdCAqIHZhbHVlcy48L3A+XHJcblx0ICpcclxuXHQgKiA8cD5UaGUgdHdvIHR5cGVzIG9mIGZvcm1hdHRpbmcgaW5mb3JtYXRpb24gaW4gYSBUZXh0Rm9ybWF0IG9iamVjdCBhcmVcclxuXHQgKiBjaGFyYWN0ZXIgbGV2ZWwgZm9ybWF0dGluZyBhbmQgcGFyYWdyYXBoIGxldmVsIGZvcm1hdHRpbmcuIEVhY2ggY2hhcmFjdGVyXHJcblx0ICogaW4gYSB0ZXh0IGZpZWxkIGNhbiBoYXZlIGl0cyBvd24gY2hhcmFjdGVyIGZvcm1hdHRpbmcgc2V0dGluZ3MsIHN1Y2ggYXNcclxuXHQgKiBmb250IG5hbWUsIGZvbnQgc2l6ZSwgYm9sZCwgYW5kIGl0YWxpYy48L3A+XHJcblx0ICpcclxuXHQgKiA8cD5Gb3IgcGFyYWdyYXBocywgdGhlIGZpcnN0IGNoYXJhY3RlciBvZiB0aGUgcGFyYWdyYXBoIGlzIGV4YW1pbmVkIGZvclxyXG5cdCAqIHRoZSBwYXJhZ3JhcGggZm9ybWF0dGluZyBzZXR0aW5ncyBmb3IgdGhlIGVudGlyZSBwYXJhZ3JhcGguIEV4YW1wbGVzIG9mXHJcblx0ICogcGFyYWdyYXBoIGZvcm1hdHRpbmcgc2V0dGluZ3MgYXJlIGxlZnQgbWFyZ2luLCByaWdodCBtYXJnaW4sIGFuZFxyXG5cdCAqIGluZGVudGF0aW9uLjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPkFueSB0ZXh0IGluc2VydGVkIG1hbnVhbGx5IGJ5IHRoZSB1c2VyLCBvciByZXBsYWNlZCBieSB0aGVcclxuXHQgKiA8Y29kZT5yZXBsYWNlU2VsZWN0ZWRUZXh0KCk8L2NvZGU+IG1ldGhvZCwgcmVjZWl2ZXMgdGhlIGRlZmF1bHQgdGV4dCBmaWVsZFxyXG5cdCAqIGZvcm1hdHRpbmcgZm9yIG5ldyB0ZXh0LCBhbmQgbm90IHRoZSBmb3JtYXR0aW5nIHNwZWNpZmllZCBmb3IgdGhlIHRleHRcclxuXHQgKiBpbnNlcnRpb24gcG9pbnQuIFRvIHNldCB0aGUgZGVmYXVsdCBmb3JtYXR0aW5nIGZvciBuZXcgdGV4dCwgdXNlXHJcblx0ICogPGNvZGU+ZGVmYXVsdFRleHRGb3JtYXQ8L2NvZGU+LjwvcD5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gZm9ybWF0IEEgVGV4dEZvcm1hdCBvYmplY3QgdGhhdCBjb250YWlucyBjaGFyYWN0ZXIgYW5kIHBhcmFncmFwaFxyXG5cdCAqICAgICAgICAgICAgICAgZm9ybWF0dGluZyBpbmZvcm1hdGlvbi5cclxuXHQgKiBAdGhyb3dzIEVycm9yICAgICAgVGhpcyBtZXRob2QgY2Fubm90IGJlIHVzZWQgb24gYSB0ZXh0IGZpZWxkIHdpdGggYSBzdHlsZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICBzaGVldC5cclxuXHQgKiBAdGhyb3dzIFJhbmdlRXJyb3IgVGhlIDxjb2RlPmJlZ2luSW5kZXg8L2NvZGU+IG9yIDxjb2RlPmVuZEluZGV4PC9jb2RlPlxyXG5cdCAqICAgICAgICAgICAgICAgICAgICBzcGVjaWZpZWQgaXMgb3V0IG9mIHJhbmdlLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzZXRUZXh0Rm9ybWF0KGZvcm1hdDpUZXh0Rm9ybWF0LCBiZWdpbkluZGV4Om51bWJlciAvKmludCovID0gLTEsIGVuZEluZGV4Om51bWJlciAvKmludCovID0gLTEpXHJcblx0e1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdHJ1ZSBpZiBhbiBlbWJlZGRlZCBmb250IGlzIGF2YWlsYWJsZSB3aXRoIHRoZSBzcGVjaWZpZWRcclxuXHQgKiA8Y29kZT5mb250TmFtZTwvY29kZT4gYW5kIDxjb2RlPmZvbnRTdHlsZTwvY29kZT4gd2hlcmVcclxuXHQgKiA8Y29kZT5Gb250LmZvbnRUeXBlPC9jb2RlPiBpcyA8Y29kZT5mbGFzaC50ZXh0LkZvbnRUeXBlLkVNQkVEREVEPC9jb2RlPi5cclxuXHQgKiBTdGFydGluZyB3aXRoIEZsYXNoIFBsYXllciAxMCwgdHdvIGtpbmRzIG9mIGVtYmVkZGVkIGZvbnRzIGNhbiBhcHBlYXIgaW4gYVxyXG5cdCAqIFNXRiBmaWxlLiBOb3JtYWwgZW1iZWRkZWQgZm9udHMgYXJlIG9ubHkgdXNlZCB3aXRoIFRleHRGaWVsZCBvYmplY3RzLiBDRkZcclxuXHQgKiBlbWJlZGRlZCBmb250cyBhcmUgb25seSB1c2VkIHdpdGggdGhlIGZsYXNoLnRleHQuZW5naW5lIGNsYXNzZXMuIFRoZSB0d29cclxuXHQgKiB0eXBlcyBhcmUgZGlzdGluZ3Vpc2hlZCBieSB0aGUgPGNvZGU+Zm9udFR5cGU8L2NvZGU+IHByb3BlcnR5IG9mIHRoZVxyXG5cdCAqIDxjb2RlPkZvbnQ8L2NvZGU+IGNsYXNzLCBhcyByZXR1cm5lZCBieSB0aGUgPGNvZGU+ZW51bWVyYXRlRm9udHMoKTwvY29kZT5cclxuXHQgKiBmdW5jdGlvbi5cclxuXHQgKlxyXG5cdCAqIDxwPlRleHRGaWVsZCBjYW5ub3QgdXNlIGEgZm9udCBvZiB0eXBlIDxjb2RlPkVNQkVEREVEX0NGRjwvY29kZT4uIElmXHJcblx0ICogPGNvZGU+ZW1iZWRGb250czwvY29kZT4gaXMgc2V0IHRvIDxjb2RlPnRydWU8L2NvZGU+IGFuZCB0aGUgb25seSBmb250XHJcblx0ICogYXZhaWxhYmxlIGF0IHJ1biB0aW1lIHdpdGggdGhlIHNwZWNpZmllZCBuYW1lIGFuZCBzdHlsZSBpcyBvZiB0eXBlXHJcblx0ICogPGNvZGU+RU1CRURERURfQ0ZGPC9jb2RlPiwgRmxhc2ggUGxheWVyIGZhaWxzIHRvIHJlbmRlciB0aGUgdGV4dCwgYXMgaWYgbm9cclxuXHQgKiBlbWJlZGRlZCBmb250IHdlcmUgYXZhaWxhYmxlIHdpdGggdGhlIHNwZWNpZmllZCBuYW1lIGFuZCBzdHlsZS48L3A+XHJcblx0ICpcclxuXHQgKiA8cD5JZiBib3RoIDxjb2RlPkVNQkVEREVEPC9jb2RlPiBhbmQgPGNvZGU+RU1CRURERURfQ0ZGPC9jb2RlPiBmb250cyBhcmVcclxuXHQgKiBhdmFpbGFibGUgd2l0aCB0aGUgc2FtZSBuYW1lIGFuZCBzdHlsZSwgdGhlIDxjb2RlPkVNQkVEREVEPC9jb2RlPiBmb250IGlzXHJcblx0ICogc2VsZWN0ZWQgYW5kIHRleHQgcmVuZGVycyB3aXRoIHRoZSA8Y29kZT5FTUJFRERFRDwvY29kZT4gZm9udC48L3A+XHJcblx0ICogXHJcblx0ICogQHBhcmFtIGZvbnROYW1lICBUaGUgbmFtZSBvZiB0aGUgZW1iZWRkZWQgZm9udCB0byBjaGVjay5cclxuXHQgKiBAcGFyYW0gZm9udFN0eWxlIFNwZWNpZmllcyB0aGUgZm9udCBzdHlsZSB0byBjaGVjay4gVXNlXHJcblx0ICogICAgICAgICAgICAgICAgICA8Y29kZT5mbGFzaC50ZXh0LkZvbnRTdHlsZTwvY29kZT5cclxuXHQgKiBAcmV0dXJuIDxjb2RlPnRydWU8L2NvZGU+IGlmIGEgY29tcGF0aWJsZSBlbWJlZGRlZCBmb250IGlzIGF2YWlsYWJsZSxcclxuXHQgKiAgICAgICAgIG90aGVyd2lzZSA8Y29kZT5mYWxzZTwvY29kZT4uXHJcblx0ICogQHRocm93cyBBcmd1bWVudEVycm9yIFRoZSA8Y29kZT5mb250U3R5bGU8L2NvZGU+IHNwZWNpZmllZCBpcyBub3QgYSBtZW1iZXJcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgb2YgPGNvZGU+Zmxhc2gudGV4dC5Gb250U3R5bGU8L2NvZGU+LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzdGF0aWMgaXNGb250Q29tcGF0aWJsZShmb250TmFtZTpzdHJpbmcsIGZvbnRTdHlsZTpzdHJpbmcpOmJvb2xlYW5cclxuXHR7XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgPSBUZXh0RmllbGQ7Il19