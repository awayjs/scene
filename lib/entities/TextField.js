var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var DisplayObject = require("awayjs-display/lib/base/DisplayObject");
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
        _super.call(this);
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
    TextField.prototype.appendText = function (newText) {
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
})(DisplayObject);
module.exports = TextField;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9UZXh0RmllbGQudHMiXSwibmFtZXMiOlsiVGV4dEZpZWxkIiwiVGV4dEZpZWxkLmNvbnN0cnVjdG9yIiwiVGV4dEZpZWxkLmJvdHRvbVNjcm9sbFYiLCJUZXh0RmllbGQuY2FyZXRJbmRleCIsIlRleHRGaWVsZC5sZW5ndGgiLCJUZXh0RmllbGQubWF4U2Nyb2xsSCIsIlRleHRGaWVsZC5tYXhTY3JvbGxWIiwiVGV4dEZpZWxkLm51bUxpbmVzIiwiVGV4dEZpZWxkLnNlbGVjdGlvbkJlZ2luSW5kZXgiLCJUZXh0RmllbGQuc2VsZWN0aW9uRW5kSW5kZXgiLCJUZXh0RmllbGQudGV4dCIsIlRleHRGaWVsZC50ZXh0SGVpZ2h0IiwiVGV4dEZpZWxkLnRleHRJbnRlcmFjdGlvbk1vZGUiLCJUZXh0RmllbGQudGV4dFdpZHRoIiwiVGV4dEZpZWxkLmFwcGVuZFRleHQiLCJUZXh0RmllbGQuZ2V0Q2hhckJvdW5kYXJpZXMiLCJUZXh0RmllbGQuZ2V0Q2hhckluZGV4QXRQb2ludCIsIlRleHRGaWVsZC5nZXRGaXJzdENoYXJJblBhcmFncmFwaCIsIlRleHRGaWVsZC5nZXRJbWFnZVJlZmVyZW5jZSIsIlRleHRGaWVsZC5nZXRMaW5lSW5kZXhBdFBvaW50IiwiVGV4dEZpZWxkLmdldExpbmVJbmRleE9mQ2hhciIsIlRleHRGaWVsZC5nZXRMaW5lTGVuZ3RoIiwiVGV4dEZpZWxkLmdldExpbmVNZXRyaWNzIiwiVGV4dEZpZWxkLmdldExpbmVPZmZzZXQiLCJUZXh0RmllbGQuZ2V0TGluZVRleHQiLCJUZXh0RmllbGQuZ2V0UGFyYWdyYXBoTGVuZ3RoIiwiVGV4dEZpZWxkLmdldFRleHRGb3JtYXQiLCJUZXh0RmllbGQucmVwbGFjZVNlbGVjdGVkVGV4dCIsIlRleHRGaWVsZC5yZXBsYWNlVGV4dCIsIlRleHRGaWVsZC5zZXRTZWxlY3Rpb24iLCJUZXh0RmllbGQuc2V0VGV4dEZvcm1hdCIsIlRleHRGaWVsZC5pc0Zv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O0lBRUQ1Qjs7Ozs7Ozs7Ozs7O09BWUdBO0lBQ0lBLGdDQUFZQSxHQUFuQkEsVUFBb0JBLFVBQVVBLENBQVFBLE9BQURBLEFBQVFBLEVBQUVBLFFBQVFBLENBQVFBLE9BQURBLEFBQVFBO0lBR3RFNkIsQ0FBQ0E7SUFFRDdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTRDR0E7SUFDSUEsaUNBQWFBLEdBQXBCQSxVQUFxQkEsTUFBaUJBLEVBQUVBLFVBQThCQSxFQUFFQSxRQUE0QkE7UUFBNUQ4QiwwQkFBOEJBLEdBQTlCQSxjQUE2QkEsQ0FBQ0E7UUFBRUEsd0JBQTRCQSxHQUE1QkEsWUFBMkJBLENBQUNBO0lBR3BHQSxDQUFDQTtJQUVEOUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0E0QkdBO0lBQ1dBLDBCQUFnQkEsR0FBOUJBLFVBQStCQSxRQUFlQSxFQUFFQSxTQUFnQkE7UUFFL0QrQixNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQTtJQUNkQSxDQUFDQTtJQUNGL0IsZ0JBQUNBO0FBQURBLENBMTdCQSxBQTA3QkNBLEVBMTdCdUIsYUFBYSxFQTA3QnBDO0FBRUQsQUFBbUIsaUJBQVYsU0FBUyxDQUFDIiwiZmlsZSI6ImVudGl0aWVzL1RleHRGaWVsZC5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVjdGFuZ2xlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1JlY3RhbmdsZVwiKTtcclxuXHJcbmltcG9ydCBEaXNwbGF5T2JqZWN0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9EaXNwbGF5T2JqZWN0XCIpO1xyXG5pbXBvcnQgQW50aUFsaWFzVHlwZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3RleHQvQW50aUFsaWFzVHlwZVwiKTtcclxuaW1wb3J0IEdyaWRGaXRUeXBlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi90ZXh0L0dyaWRGaXRUeXBlXCIpO1xyXG5pbXBvcnQgVGV4dEZpZWxkQXV0b1NpemVcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvdGV4dC9UZXh0RmllbGRBdXRvU2l6ZVwiKTtcclxuaW1wb3J0IFRleHRGaWVsZFR5cGVcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi90ZXh0L1RleHRGaWVsZFR5cGVcIik7XHJcbmltcG9ydCBUZXh0Rm9ybWF0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi90ZXh0L1RleHRGb3JtYXRcIik7XHJcbmltcG9ydCBUZXh0SW50ZXJhY3Rpb25Nb2RlXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3RleHQvVGV4dEludGVyYWN0aW9uTW9kZVwiKTtcclxuaW1wb3J0IFRleHRMaW5lTWV0cmljc1x0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3RleHQvVGV4dExpbmVNZXRyaWNzXCIpO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBUZXh0RmllbGQgY2xhc3MgaXMgdXNlZCB0byBjcmVhdGUgZGlzcGxheSBvYmplY3RzIGZvciB0ZXh0IGRpc3BsYXkgYW5kXHJcbiAqIGlucHV0LiA8cGggb3V0cHV0Y2xhc3M9XCJmbGV4b25seVwiPllvdSBjYW4gdXNlIHRoZSBUZXh0RmllbGQgY2xhc3MgdG9cclxuICogcGVyZm9ybSBsb3ctbGV2ZWwgdGV4dCByZW5kZXJpbmcuIEhvd2V2ZXIsIGluIEZsZXgsIHlvdSB0eXBpY2FsbHkgdXNlIHRoZVxyXG4gKiBMYWJlbCwgVGV4dCwgVGV4dEFyZWEsIGFuZCBUZXh0SW5wdXQgY29udHJvbHMgdG8gcHJvY2VzcyB0ZXh0LiA8cGhcclxuICogb3V0cHV0Y2xhc3M9XCJmbGFzaG9ubHlcIj5Zb3UgY2FuIGdpdmUgYSB0ZXh0IGZpZWxkIGFuIGluc3RhbmNlIG5hbWUgaW4gdGhlXHJcbiAqIFByb3BlcnR5IGluc3BlY3RvciBhbmQgdXNlIHRoZSBtZXRob2RzIGFuZCBwcm9wZXJ0aWVzIG9mIHRoZSBUZXh0RmllbGRcclxuICogY2xhc3MgdG8gbWFuaXB1bGF0ZSBpdCB3aXRoIEFjdGlvblNjcmlwdC4gVGV4dEZpZWxkIGluc3RhbmNlIG5hbWVzIGFyZVxyXG4gKiBkaXNwbGF5ZWQgaW4gdGhlIE1vdmllIEV4cGxvcmVyIGFuZCBpbiB0aGUgSW5zZXJ0IFRhcmdldCBQYXRoIGRpYWxvZyBib3ggaW5cclxuICogdGhlIEFjdGlvbnMgcGFuZWwuXHJcbiAqXHJcbiAqIDxwPlRvIGNyZWF0ZSBhIHRleHQgZmllbGQgZHluYW1pY2FsbHksIHVzZSB0aGUgPGNvZGU+VGV4dEZpZWxkKCk8L2NvZGU+XHJcbiAqIGNvbnN0cnVjdG9yLjwvcD5cclxuICpcclxuICogPHA+VGhlIG1ldGhvZHMgb2YgdGhlIFRleHRGaWVsZCBjbGFzcyBsZXQgeW91IHNldCwgc2VsZWN0LCBhbmQgbWFuaXB1bGF0ZVxyXG4gKiB0ZXh0IGluIGEgZHluYW1pYyBvciBpbnB1dCB0ZXh0IGZpZWxkIHRoYXQgeW91IGNyZWF0ZSBkdXJpbmcgYXV0aG9yaW5nIG9yXHJcbiAqIGF0IHJ1bnRpbWUuIDwvcD5cclxuICpcclxuICogPHA+QWN0aW9uU2NyaXB0IHByb3ZpZGVzIHNldmVyYWwgd2F5cyB0byBmb3JtYXQgeW91ciB0ZXh0IGF0IHJ1bnRpbWUuIFRoZVxyXG4gKiBUZXh0Rm9ybWF0IGNsYXNzIGxldHMgeW91IHNldCBjaGFyYWN0ZXIgYW5kIHBhcmFncmFwaCBmb3JtYXR0aW5nIGZvclxyXG4gKiBUZXh0RmllbGQgb2JqZWN0cy4gWW91IGNhbiBhcHBseSBDYXNjYWRpbmcgU3R5bGUgU2hlZXRzKENTUykgc3R5bGVzIHRvXHJcbiAqIHRleHQgZmllbGRzIGJ5IHVzaW5nIHRoZSA8Y29kZT5UZXh0RmllbGQuc3R5bGVTaGVldDwvY29kZT4gcHJvcGVydHkgYW5kIHRoZVxyXG4gKiBTdHlsZVNoZWV0IGNsYXNzLiBZb3UgY2FuIHVzZSBDU1MgdG8gc3R5bGUgYnVpbHQtaW4gSFRNTCB0YWdzLCBkZWZpbmUgbmV3XHJcbiAqIGZvcm1hdHRpbmcgdGFncywgb3IgYXBwbHkgc3R5bGVzLiBZb3UgY2FuIGFzc2lnbiBIVE1MIGZvcm1hdHRlZCB0ZXh0LCB3aGljaFxyXG4gKiBvcHRpb25hbGx5IHVzZXMgQ1NTIHN0eWxlcywgZGlyZWN0bHkgdG8gYSB0ZXh0IGZpZWxkLiBIVE1MIHRleHQgdGhhdCB5b3VcclxuICogYXNzaWduIHRvIGEgdGV4dCBmaWVsZCBjYW4gY29udGFpbiBlbWJlZGRlZCBtZWRpYShtb3ZpZSBjbGlwcywgU1dGIGZpbGVzLFxyXG4gKiBHSUYgZmlsZXMsIFBORyBmaWxlcywgYW5kIEpQRUcgZmlsZXMpLiBUaGUgdGV4dCB3cmFwcyBhcm91bmQgdGhlIGVtYmVkZGVkXHJcbiAqIG1lZGlhIGluIHRoZSBzYW1lIHdheSB0aGF0IGEgd2ViIGJyb3dzZXIgd3JhcHMgdGV4dCBhcm91bmQgbWVkaWEgZW1iZWRkZWRcclxuICogaW4gYW4gSFRNTCBkb2N1bWVudC4gPC9wPlxyXG4gKlxyXG4gKiA8cD5GbGFzaCBQbGF5ZXIgc3VwcG9ydHMgYSBzdWJzZXQgb2YgSFRNTCB0YWdzIHRoYXQgeW91IGNhbiB1c2UgdG8gZm9ybWF0XHJcbiAqIHRleHQuIFNlZSB0aGUgbGlzdCBvZiBzdXBwb3J0ZWQgSFRNTCB0YWdzIGluIHRoZSBkZXNjcmlwdGlvbiBvZiB0aGVcclxuICogPGNvZGU+aHRtbFRleHQ8L2NvZGU+IHByb3BlcnR5LjwvcD5cclxuICogXHJcbiAqIEBldmVudCBjaGFuZ2UgICAgICAgICAgICAgICAgICAgIERpc3BhdGNoZWQgYWZ0ZXIgYSBjb250cm9sIHZhbHVlIGlzXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGlmaWVkLCB1bmxpa2UgdGhlXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPnRleHRJbnB1dDwvY29kZT4gZXZlbnQsIHdoaWNoIGlzXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoZWQgYmVmb3JlIHRoZSB2YWx1ZSBpcyBtb2RpZmllZC5cclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVW5saWtlIHRoZSBXM0MgRE9NIEV2ZW50IE1vZGVsIHZlcnNpb24gb2ZcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlIDxjb2RlPmNoYW5nZTwvY29kZT4gZXZlbnQsIHdoaWNoXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoZXMgdGhlIGV2ZW50IG9ubHkgYWZ0ZXIgdGhlXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2wgbG9zZXMgZm9jdXMsIHRoZSBBY3Rpb25TY3JpcHQgMy4wXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZlcnNpb24gb2YgdGhlIDxjb2RlPmNoYW5nZTwvY29kZT4gZXZlbnRcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXMgZGlzcGF0Y2hlZCBhbnkgdGltZSB0aGUgY29udHJvbFxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VzLiBGb3IgZXhhbXBsZSwgaWYgYSB1c2VyIHR5cGVzIHRleHRcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW50byBhIHRleHQgZmllbGQsIGEgPGNvZGU+Y2hhbmdlPC9jb2RlPlxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudCBpcyBkaXNwYXRjaGVkIGFmdGVyIGV2ZXJ5IGtleXN0cm9rZS5cclxuICogQGV2ZW50IGxpbmsgICAgICAgICAgICAgICAgICAgICAgRGlzcGF0Y2hlZCB3aGVuIGEgdXNlciBjbGlja3MgYSBoeXBlcmxpbmtcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW4gYW4gSFRNTC1lbmFibGVkIHRleHQgZmllbGQsIHdoZXJlIHRoZVxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBVUkwgYmVnaW5zIHdpdGggXCJldmVudDpcIi4gVGhlIHJlbWFpbmRlciBvZlxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGUgVVJMIGFmdGVyIFwiZXZlbnQ6XCIgaXMgcGxhY2VkIGluIHRoZVxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0IHByb3BlcnR5IG9mIHRoZSBMSU5LIGV2ZW50LlxyXG4gKlxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD48Yj5Ob3RlOjwvYj4gVGhlIGRlZmF1bHQgYmVoYXZpb3IsXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZGluZyB0aGUgdGV4dCB0byB0aGUgdGV4dCBmaWVsZCwgb2NjdXJzXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ubHkgd2hlbiBGbGFzaCBQbGF5ZXIgZ2VuZXJhdGVzIHRoZVxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudCwgd2hpY2ggaW4gdGhpcyBjYXNlIGhhcHBlbnMgd2hlbiBhXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXIgYXR0ZW1wdHMgdG8gaW5wdXQgdGV4dC4gWW91IGNhbm5vdFxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdXQgdGV4dCBpbnRvIGEgdGV4dCBmaWVsZCBieSBzZW5kaW5nIGl0XHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPnRleHRJbnB1dDwvY29kZT4gZXZlbnRzLjwvcD5cclxuICogQGV2ZW50IHNjcm9sbCAgICAgICAgICAgICAgICAgICAgRGlzcGF0Y2hlZCBieSBhIFRleHRGaWVsZCBvYmplY3RcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGk+YWZ0ZXI8L2k+IHRoZSB1c2VyIHNjcm9sbHMuXHJcbiAqIEBldmVudCB0ZXh0SW5wdXQgICAgICAgICAgICAgICAgIEZsYXNoIFBsYXllciBkaXNwYXRjaGVzIHRoZVxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT50ZXh0SW5wdXQ8L2NvZGU+IGV2ZW50IHdoZW4gYSB1c2VyXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudGVycyBvbmUgb3IgbW9yZSBjaGFyYWN0ZXJzIG9mIHRleHQuXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFZhcmlvdXMgdGV4dCBpbnB1dCBtZXRob2RzIGNhbiBnZW5lcmF0ZVxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzIGV2ZW50LCBpbmNsdWRpbmcgc3RhbmRhcmQga2V5Ym9hcmRzLFxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dCBtZXRob2QgZWRpdG9ycyhJTUVzKSwgdm9pY2Ugb3JcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BlZWNoIHJlY29nbml0aW9uIHN5c3RlbXMsIGFuZCBldmVuIHRoZVxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Qgb2YgcGFzdGluZyBwbGFpbiB0ZXh0IHdpdGggbm9cclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0dGluZyBvciBzdHlsZSBpbmZvcm1hdGlvbi5cclxuICogQGV2ZW50IHRleHRJbnRlcmFjdGlvbk1vZGVDaGFuZ2UgRmxhc2ggUGxheWVyIGRpc3BhdGNoZXMgdGhlXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPnRleHRJbnRlcmFjdGlvbk1vZGVDaGFuZ2U8L2NvZGU+XHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50IHdoZW4gYSB1c2VyIGNoYW5nZXMgdGhlIGludGVyYWN0aW9uXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGUgb2YgYSB0ZXh0IGZpZWxkLiBmb3IgZXhhbXBsZSBvblxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBbmRyb2lkLCBvbmUgY2FuIHRvZ2dsZSBmcm9tIE5PUk1BTCBtb2RlXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIFNFTEVDVElPTiBtb2RlIHVzaW5nIGNvbnRleHQgbWVudVxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zXHJcbiAqL1xyXG5jbGFzcyBUZXh0RmllbGQgZXh0ZW5kcyBEaXNwbGF5T2JqZWN0XHJcbntcclxuXHRwcml2YXRlIF9ib3R0b21TY3JvbGxWOm51bWJlcjtcclxuXHRwcml2YXRlIF9jYXJldEluZGV4Om51bWJlcjtcclxuXHRwcml2YXRlIF9sZW5ndGg6bnVtYmVyO1xyXG5cdHByaXZhdGUgX21heFNjcm9sbEg6bnVtYmVyO1xyXG5cdHByaXZhdGUgX21heFNjcm9sbFY6bnVtYmVyO1xyXG5cdHByaXZhdGUgX251bUxpbmVzOm51bWJlcjtcclxuXHRwcml2YXRlIF9zZWxlY3Rpb25CZWdpbkluZGV4Om51bWJlcjtcclxuXHRwcml2YXRlIF9zZWxlY3Rpb25FbmRJbmRleDpudW1iZXI7XHJcblx0cHJpdmF0ZSBfdGV4dDpzdHJpbmcgPSBcIlwiO1xyXG5cdHByaXZhdGUgX3RleHRIZWlnaHQ6bnVtYmVyO1xyXG5cdHByaXZhdGUgX3RleHRJbnRlcmFjdGlvbk1vZGU6VGV4dEludGVyYWN0aW9uTW9kZTtcclxuXHRwcml2YXRlIF90ZXh0V2lkdGg6bnVtYmVyO1xyXG5cclxuXHRwcml2YXRlIF9jaGFyQm91bmRhcmllczpSZWN0YW5nbGU7XHJcblx0cHJpdmF0ZSBfY2hhckluZGV4QXRQb2ludDpudW1iZXI7XHJcblx0cHJpdmF0ZSBfZmlyc3RDaGFySW5QYXJhZ3JhcGg6bnVtYmVyO1xyXG5cdHByaXZhdGUgX2ltYWdlUmVmZXJlbmNlOkRpc3BsYXlPYmplY3RcclxuXHRwcml2YXRlIF9saW5lSW5kZXhBdFBvaW50Om51bWJlcjtcclxuXHRwcml2YXRlIF9saW5lSW5kZXhPZkNoYXI6bnVtYmVyO1xyXG5cdHByaXZhdGUgX2xpbmVMZW5ndGg6bnVtYmVyO1xyXG5cdHByaXZhdGUgX2xpbmVNZXRyaWNzOlRleHRMaW5lTWV0cmljcztcclxuXHRwcml2YXRlIF9saW5lT2Zmc2V0Om51bWJlcjtcclxuXHRwcml2YXRlIF9saW5lVGV4dDpzdHJpbmc7XHJcblx0cHJpdmF0ZSBfcGFyYWdyYXBoTGVuZ3RoOm51bWJlcjtcclxuXHRwcml2YXRlIF90ZXh0Rm9ybWF0OlRleHRGb3JtYXQ7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFdoZW4gc2V0IHRvIDxjb2RlPnRydWU8L2NvZGU+IGFuZCB0aGUgdGV4dCBmaWVsZCBpcyBub3QgaW4gZm9jdXMsIEZsYXNoXHJcblx0ICogUGxheWVyIGhpZ2hsaWdodHMgdGhlIHNlbGVjdGlvbiBpbiB0aGUgdGV4dCBmaWVsZCBpbiBncmF5LiBXaGVuIHNldCB0b1xyXG5cdCAqIDxjb2RlPmZhbHNlPC9jb2RlPiBhbmQgdGhlIHRleHQgZmllbGQgaXMgbm90IGluIGZvY3VzLCBGbGFzaCBQbGF5ZXIgZG9lc1xyXG5cdCAqIG5vdCBoaWdobGlnaHQgdGhlIHNlbGVjdGlvbiBpbiB0aGUgdGV4dCBmaWVsZC5cclxuXHQgKiBcclxuXHQgKiBAZGVmYXVsdCBmYWxzZVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBhbHdheXNTaG93U2VsZWN0aW9uOmJvb2xlYW5cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIHR5cGUgb2YgYW50aS1hbGlhc2luZyB1c2VkIGZvciB0aGlzIHRleHQgZmllbGQuIFVzZVxyXG5cdCAqIDxjb2RlPmZsYXNoLnRleHQuQW50aUFsaWFzVHlwZTwvY29kZT4gY29uc3RhbnRzIGZvciB0aGlzIHByb3BlcnR5LiBZb3UgY2FuXHJcblx0ICogY29udHJvbCB0aGlzIHNldHRpbmcgb25seSBpZiB0aGUgZm9udCBpcyBlbWJlZGRlZCh3aXRoIHRoZVxyXG5cdCAqIDxjb2RlPmVtYmVkRm9udHM8L2NvZGU+IHByb3BlcnR5IHNldCB0byA8Y29kZT50cnVlPC9jb2RlPikuIFRoZSBkZWZhdWx0XHJcblx0ICogc2V0dGluZyBpcyA8Y29kZT5mbGFzaC50ZXh0LkFudGlBbGlhc1R5cGUuTk9STUFMPC9jb2RlPi5cclxuXHQgKlxyXG5cdCAqIDxwPlRvIHNldCB2YWx1ZXMgZm9yIHRoaXMgcHJvcGVydHksIHVzZSB0aGUgZm9sbG93aW5nIHN0cmluZyB2YWx1ZXM6PC9wPlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBhbnRpQWxpYXNUeXBlOkFudGlBbGlhc1R5cGU7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnRyb2xzIGF1dG9tYXRpYyBzaXppbmcgYW5kIGFsaWdubWVudCBvZiB0ZXh0IGZpZWxkcy4gQWNjZXB0YWJsZSB2YWx1ZXNcclxuXHQgKiBmb3IgdGhlIDxjb2RlPlRleHRGaWVsZEF1dG9TaXplPC9jb2RlPiBjb25zdGFudHM6XHJcblx0ICogPGNvZGU+VGV4dEZpZWxkQXV0b1NpemUuTk9ORTwvY29kZT4odGhlIGRlZmF1bHQpLFxyXG5cdCAqIDxjb2RlPlRleHRGaWVsZEF1dG9TaXplLkxFRlQ8L2NvZGU+LCA8Y29kZT5UZXh0RmllbGRBdXRvU2l6ZS5SSUdIVDwvY29kZT4sXHJcblx0ICogYW5kIDxjb2RlPlRleHRGaWVsZEF1dG9TaXplLkNFTlRFUjwvY29kZT4uXHJcblx0ICpcclxuXHQgKiA8cD5JZiA8Y29kZT5hdXRvU2l6ZTwvY29kZT4gaXMgc2V0IHRvIDxjb2RlPlRleHRGaWVsZEF1dG9TaXplLk5PTkU8L2NvZGU+XHJcblx0ICogKHRoZSBkZWZhdWx0KSBubyByZXNpemluZyBvY2N1cnMuPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+SWYgPGNvZGU+YXV0b1NpemU8L2NvZGU+IGlzIHNldCB0byA8Y29kZT5UZXh0RmllbGRBdXRvU2l6ZS5MRUZUPC9jb2RlPixcclxuXHQgKiB0aGUgdGV4dCBpcyB0cmVhdGVkIGFzIGxlZnQtanVzdGlmaWVkIHRleHQsIG1lYW5pbmcgdGhhdCB0aGUgbGVmdCBtYXJnaW5cclxuXHQgKiBvZiB0aGUgdGV4dCBmaWVsZCByZW1haW5zIGZpeGVkIGFuZCBhbnkgcmVzaXppbmcgb2YgYSBzaW5nbGUgbGluZSBvZiB0aGVcclxuXHQgKiB0ZXh0IGZpZWxkIGlzIG9uIHRoZSByaWdodCBtYXJnaW4uIElmIHRoZSB0ZXh0IGluY2x1ZGVzIGEgbGluZSBicmVhayhmb3JcclxuXHQgKiBleGFtcGxlLCA8Y29kZT5cIlxcblwiPC9jb2RlPiBvciA8Y29kZT5cIlxcclwiPC9jb2RlPiksIHRoZSBib3R0b20gaXMgYWxzb1xyXG5cdCAqIHJlc2l6ZWQgdG8gZml0IHRoZSBuZXh0IGxpbmUgb2YgdGV4dC4gSWYgPGNvZGU+d29yZFdyYXA8L2NvZGU+IGlzIGFsc28gc2V0XHJcblx0ICogdG8gPGNvZGU+dHJ1ZTwvY29kZT4sIG9ubHkgdGhlIGJvdHRvbSBvZiB0aGUgdGV4dCBmaWVsZCBpcyByZXNpemVkIGFuZCB0aGVcclxuXHQgKiByaWdodCBzaWRlIHJlbWFpbnMgZml4ZWQuPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+SWYgPGNvZGU+YXV0b1NpemU8L2NvZGU+IGlzIHNldCB0b1xyXG5cdCAqIDxjb2RlPlRleHRGaWVsZEF1dG9TaXplLlJJR0hUPC9jb2RlPiwgdGhlIHRleHQgaXMgdHJlYXRlZCBhc1xyXG5cdCAqIHJpZ2h0LWp1c3RpZmllZCB0ZXh0LCBtZWFuaW5nIHRoYXQgdGhlIHJpZ2h0IG1hcmdpbiBvZiB0aGUgdGV4dCBmaWVsZFxyXG5cdCAqIHJlbWFpbnMgZml4ZWQgYW5kIGFueSByZXNpemluZyBvZiBhIHNpbmdsZSBsaW5lIG9mIHRoZSB0ZXh0IGZpZWxkIGlzIG9uXHJcblx0ICogdGhlIGxlZnQgbWFyZ2luLiBJZiB0aGUgdGV4dCBpbmNsdWRlcyBhIGxpbmUgYnJlYWsoZm9yIGV4YW1wbGUsXHJcblx0ICogPGNvZGU+XCJcXG5cIiBvciBcIlxcclwiKTwvY29kZT4sIHRoZSBib3R0b20gaXMgYWxzbyByZXNpemVkIHRvIGZpdCB0aGUgbmV4dFxyXG5cdCAqIGxpbmUgb2YgdGV4dC4gSWYgPGNvZGU+d29yZFdyYXA8L2NvZGU+IGlzIGFsc28gc2V0IHRvIDxjb2RlPnRydWU8L2NvZGU+LFxyXG5cdCAqIG9ubHkgdGhlIGJvdHRvbSBvZiB0aGUgdGV4dCBmaWVsZCBpcyByZXNpemVkIGFuZCB0aGUgbGVmdCBzaWRlIHJlbWFpbnNcclxuXHQgKiBmaXhlZC48L3A+XHJcblx0ICpcclxuXHQgKiA8cD5JZiA8Y29kZT5hdXRvU2l6ZTwvY29kZT4gaXMgc2V0IHRvXHJcblx0ICogPGNvZGU+VGV4dEZpZWxkQXV0b1NpemUuQ0VOVEVSPC9jb2RlPiwgdGhlIHRleHQgaXMgdHJlYXRlZCBhc1xyXG5cdCAqIGNlbnRlci1qdXN0aWZpZWQgdGV4dCwgbWVhbmluZyB0aGF0IGFueSByZXNpemluZyBvZiBhIHNpbmdsZSBsaW5lIG9mIHRoZVxyXG5cdCAqIHRleHQgZmllbGQgaXMgZXF1YWxseSBkaXN0cmlidXRlZCB0byBib3RoIHRoZSByaWdodCBhbmQgbGVmdCBtYXJnaW5zLiBJZlxyXG5cdCAqIHRoZSB0ZXh0IGluY2x1ZGVzIGEgbGluZSBicmVhayhmb3IgZXhhbXBsZSwgPGNvZGU+XCJcXG5cIjwvY29kZT4gb3JcclxuXHQgKiA8Y29kZT5cIlxcclwiPC9jb2RlPiksIHRoZSBib3R0b20gaXMgYWxzbyByZXNpemVkIHRvIGZpdCB0aGUgbmV4dCBsaW5lIG9mXHJcblx0ICogdGV4dC4gSWYgPGNvZGU+d29yZFdyYXA8L2NvZGU+IGlzIGFsc28gc2V0IHRvIDxjb2RlPnRydWU8L2NvZGU+LCBvbmx5IHRoZVxyXG5cdCAqIGJvdHRvbSBvZiB0aGUgdGV4dCBmaWVsZCBpcyByZXNpemVkIGFuZCB0aGUgbGVmdCBhbmQgcmlnaHQgc2lkZXMgcmVtYWluXHJcblx0ICogZml4ZWQuPC9wPlxyXG5cdCAqIFxyXG5cdCAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciBUaGUgPGNvZGU+YXV0b1NpemU8L2NvZGU+IHNwZWNpZmllZCBpcyBub3QgYSBtZW1iZXJcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgb2YgZmxhc2gudGV4dC5UZXh0RmllbGRBdXRvU2l6ZS5cclxuXHQgKi9cclxuXHRwdWJsaWMgYXV0b1NpemU6VGV4dEZpZWxkQXV0b1NpemU7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNwZWNpZmllcyB3aGV0aGVyIHRoZSB0ZXh0IGZpZWxkIGhhcyBhIGJhY2tncm91bmQgZmlsbC4gSWZcclxuXHQgKiA8Y29kZT50cnVlPC9jb2RlPiwgdGhlIHRleHQgZmllbGQgaGFzIGEgYmFja2dyb3VuZCBmaWxsLiBJZlxyXG5cdCAqIDxjb2RlPmZhbHNlPC9jb2RlPiwgdGhlIHRleHQgZmllbGQgaGFzIG5vIGJhY2tncm91bmQgZmlsbC4gVXNlIHRoZVxyXG5cdCAqIDxjb2RlPmJhY2tncm91bmRDb2xvcjwvY29kZT4gcHJvcGVydHkgdG8gc2V0IHRoZSBiYWNrZ3JvdW5kIGNvbG9yIG9mIGFcclxuXHQgKiB0ZXh0IGZpZWxkLlxyXG5cdCAqIFxyXG5cdCAqIEBkZWZhdWx0IGZhbHNlXHJcblx0ICovXHJcblx0cHVibGljIGJhY2tncm91bmQ6Ym9vbGVhbjtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGNvbG9yIG9mIHRoZSB0ZXh0IGZpZWxkIGJhY2tncm91bmQuIFRoZSBkZWZhdWx0IHZhbHVlIGlzXHJcblx0ICogPGNvZGU+MHhGRkZGRkY8L2NvZGU+KHdoaXRlKS4gVGhpcyBwcm9wZXJ0eSBjYW4gYmUgcmV0cmlldmVkIG9yIHNldCwgZXZlblxyXG5cdCAqIGlmIHRoZXJlIGN1cnJlbnRseSBpcyBubyBiYWNrZ3JvdW5kLCBidXQgdGhlIGNvbG9yIGlzIHZpc2libGUgb25seSBpZiB0aGVcclxuXHQgKiB0ZXh0IGZpZWxkIGhhcyB0aGUgPGNvZGU+YmFja2dyb3VuZDwvY29kZT4gcHJvcGVydHkgc2V0IHRvXHJcblx0ICogPGNvZGU+dHJ1ZTwvY29kZT4uXHJcblx0ICovXHJcblx0cHVibGljIGJhY2tncm91bmRDb2xvcjpudW1iZXIgLyppbnQqLztcclxuXHJcblx0LyoqXHJcblx0ICogU3BlY2lmaWVzIHdoZXRoZXIgdGhlIHRleHQgZmllbGQgaGFzIGEgYm9yZGVyLiBJZiA8Y29kZT50cnVlPC9jb2RlPiwgdGhlXHJcblx0ICogdGV4dCBmaWVsZCBoYXMgYSBib3JkZXIuIElmIDxjb2RlPmZhbHNlPC9jb2RlPiwgdGhlIHRleHQgZmllbGQgaGFzIG5vXHJcblx0ICogYm9yZGVyLiBVc2UgdGhlIDxjb2RlPmJvcmRlckNvbG9yPC9jb2RlPiBwcm9wZXJ0eSB0byBzZXQgdGhlIGJvcmRlciBjb2xvci5cclxuXHQgKiBcclxuXHQgKiBAZGVmYXVsdCBmYWxzZVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBib3JkZXI6Ym9vbGVhbjtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGNvbG9yIG9mIHRoZSB0ZXh0IGZpZWxkIGJvcmRlci4gVGhlIGRlZmF1bHQgdmFsdWUgaXNcclxuXHQgKiA8Y29kZT4weDAwMDAwMDwvY29kZT4oYmxhY2spLiBUaGlzIHByb3BlcnR5IGNhbiBiZSByZXRyaWV2ZWQgb3Igc2V0LCBldmVuXHJcblx0ICogaWYgdGhlcmUgY3VycmVudGx5IGlzIG5vIGJvcmRlciwgYnV0IHRoZSBjb2xvciBpcyB2aXNpYmxlIG9ubHkgaWYgdGhlIHRleHRcclxuXHQgKiBmaWVsZCBoYXMgdGhlIDxjb2RlPmJvcmRlcjwvY29kZT4gcHJvcGVydHkgc2V0IHRvIDxjb2RlPnRydWU8L2NvZGU+LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBib3JkZXJDb2xvcjpudW1iZXIgLyppbnQqLztcclxuXHJcblx0LyoqXHJcblx0ICogQW4gaW50ZWdlcigxLWJhc2VkIGluZGV4KSB0aGF0IGluZGljYXRlcyB0aGUgYm90dG9tbW9zdCBsaW5lIHRoYXQgaXNcclxuXHQgKiBjdXJyZW50bHkgdmlzaWJsZSBpbiB0aGUgc3BlY2lmaWVkIHRleHQgZmllbGQuIFRoaW5rIG9mIHRoZSB0ZXh0IGZpZWxkIGFzXHJcblx0ICogYSB3aW5kb3cgb250byBhIGJsb2NrIG9mIHRleHQuIFRoZSA8Y29kZT5zY3JvbGxWPC9jb2RlPiBwcm9wZXJ0eSBpcyB0aGVcclxuXHQgKiAxLWJhc2VkIGluZGV4IG9mIHRoZSB0b3Btb3N0IHZpc2libGUgbGluZSBpbiB0aGUgd2luZG93LlxyXG5cdCAqXHJcblx0ICogPHA+QWxsIHRoZSB0ZXh0IGJldHdlZW4gdGhlIGxpbmVzIGluZGljYXRlZCBieSA8Y29kZT5zY3JvbGxWPC9jb2RlPiBhbmRcclxuXHQgKiA8Y29kZT5ib3R0b21TY3JvbGxWPC9jb2RlPiBpcyBjdXJyZW50bHkgdmlzaWJsZSBpbiB0aGUgdGV4dCBmaWVsZC48L3A+XHJcblx0ICovXHJcblx0cHVibGljIGdldCBib3R0b21TY3JvbGxWKCk6bnVtYmVyIC8qaW50Ki9cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fYm90dG9tU2Nyb2xsVjtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBpbmRleCBvZiB0aGUgaW5zZXJ0aW9uIHBvaW50KGNhcmV0KSBwb3NpdGlvbi4gSWYgbm8gaW5zZXJ0aW9uIHBvaW50XHJcblx0ICogaXMgZGlzcGxheWVkLCB0aGUgdmFsdWUgaXMgdGhlIHBvc2l0aW9uIHRoZSBpbnNlcnRpb24gcG9pbnQgd291bGQgYmUgaWZcclxuXHQgKiB5b3UgcmVzdG9yZWQgZm9jdXMgdG8gdGhlIGZpZWxkKHR5cGljYWxseSB3aGVyZSB0aGUgaW5zZXJ0aW9uIHBvaW50IGxhc3RcclxuXHQgKiB3YXMsIG9yIDAgaWYgdGhlIGZpZWxkIGhhcyBub3QgaGFkIGZvY3VzKS5cclxuXHQgKlxyXG5cdCAqIDxwPlNlbGVjdGlvbiBzcGFuIGluZGV4ZXMgYXJlIHplcm8tYmFzZWQoZm9yIGV4YW1wbGUsIHRoZSBmaXJzdCBwb3NpdGlvblxyXG5cdCAqIGlzIDAsIHRoZSBzZWNvbmQgcG9zaXRpb24gaXMgMSwgYW5kIHNvIG9uKS48L3A+XHJcblx0ICovXHJcblx0cHVibGljIGdldCBjYXJldEluZGV4KCk6bnVtYmVyIC8qaW50Ki9cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fY2FyZXRJbmRleDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEEgQm9vbGVhbiB2YWx1ZSB0aGF0IHNwZWNpZmllcyB3aGV0aGVyIGV4dHJhIHdoaXRlIHNwYWNlKHNwYWNlcywgbGluZVxyXG5cdCAqIGJyZWFrcywgYW5kIHNvIG9uKSBpbiBhIHRleHQgZmllbGQgd2l0aCBIVE1MIHRleHQgaXMgcmVtb3ZlZC4gVGhlIGRlZmF1bHRcclxuXHQgKiB2YWx1ZSBpcyA8Y29kZT5mYWxzZTwvY29kZT4uIFRoZSA8Y29kZT5jb25kZW5zZVdoaXRlPC9jb2RlPiBwcm9wZXJ0eSBvbmx5XHJcblx0ICogYWZmZWN0cyB0ZXh0IHNldCB3aXRoIHRoZSA8Y29kZT5odG1sVGV4dDwvY29kZT4gcHJvcGVydHksIG5vdCB0aGVcclxuXHQgKiA8Y29kZT50ZXh0PC9jb2RlPiBwcm9wZXJ0eS4gSWYgeW91IHNldCB0ZXh0IHdpdGggdGhlIDxjb2RlPnRleHQ8L2NvZGU+XHJcblx0ICogcHJvcGVydHksIDxjb2RlPmNvbmRlbnNlV2hpdGU8L2NvZGU+IGlzIGlnbm9yZWQuXHJcblx0ICpcclxuXHQgKiA8cD5JZiA8Y29kZT5jb25kZW5zZVdoaXRlPC9jb2RlPiBpcyBzZXQgdG8gPGNvZGU+dHJ1ZTwvY29kZT4sIHVzZSBzdGFuZGFyZFxyXG5cdCAqIEhUTUwgY29tbWFuZHMgc3VjaCBhcyA8Y29kZT48QlI+PC9jb2RlPiBhbmQgPGNvZGU+PFA+PC9jb2RlPiB0byBwbGFjZSBsaW5lXHJcblx0ICogYnJlYWtzIGluIHRoZSB0ZXh0IGZpZWxkLjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPlNldCB0aGUgPGNvZGU+Y29uZGVuc2VXaGl0ZTwvY29kZT4gcHJvcGVydHkgYmVmb3JlIHNldHRpbmcgdGhlXHJcblx0ICogPGNvZGU+aHRtbFRleHQ8L2NvZGU+IHByb3BlcnR5LjwvcD5cclxuXHQgKi9cclxuXHRwdWJsaWMgY29uZGVuc2VXaGl0ZTpib29sZWFuO1xyXG5cclxuXHQvKipcclxuXHQgKiBTcGVjaWZpZXMgdGhlIGZvcm1hdCBhcHBsaWVkIHRvIG5ld2x5IGluc2VydGVkIHRleHQsIHN1Y2ggYXMgdGV4dCBlbnRlcmVkXHJcblx0ICogYnkgYSB1c2VyIG9yIHRleHQgaW5zZXJ0ZWQgd2l0aCB0aGUgPGNvZGU+cmVwbGFjZVNlbGVjdGVkVGV4dCgpPC9jb2RlPlxyXG5cdCAqIG1ldGhvZC5cclxuXHQgKlxyXG5cdCAqIDxwPjxiPk5vdGU6PC9iPiBXaGVuIHNlbGVjdGluZyBjaGFyYWN0ZXJzIHRvIGJlIHJlcGxhY2VkIHdpdGhcclxuXHQgKiA8Y29kZT5zZXRTZWxlY3Rpb24oKTwvY29kZT4gYW5kIDxjb2RlPnJlcGxhY2VTZWxlY3RlZFRleHQoKTwvY29kZT4sIHRoZVxyXG5cdCAqIDxjb2RlPmRlZmF1bHRUZXh0Rm9ybWF0PC9jb2RlPiB3aWxsIGJlIGFwcGxpZWQgb25seSBpZiB0aGUgdGV4dCBoYXMgYmVlblxyXG5cdCAqIHNlbGVjdGVkIHVwIHRvIGFuZCBpbmNsdWRpbmcgdGhlIGxhc3QgY2hhcmFjdGVyLiBIZXJlIGlzIGFuIGV4YW1wbGU6PC9wPlxyXG5cdCAqIDxwcmUgeG1sOnNwYWNlPVwicHJlc2VydmVcIj4gcHVibGljIG15X3R4dDpUZXh0RmllbGQgbmV3IFRleHRGaWVsZCgpO1xyXG5cdCAqIG15X3R4dC50ZXh0ID0gXCJGbGFzaCBNYWNpbnRvc2ggdmVyc2lvblwiOyBwdWJsaWMgbXlfZm10OlRleHRGb3JtYXQgPSBuZXdcclxuXHQgKiBUZXh0Rm9ybWF0KCk7IG15X2ZtdC5jb2xvciA9IDB4RkYwMDAwOyBteV90eHQuZGVmYXVsdFRleHRGb3JtYXQgPSBteV9mbXQ7XHJcblx0ICogbXlfdHh0LnNldFNlbGVjdGlvbig2LDE1KTsgLy8gcGFydGlhbCB0ZXh0IHNlbGVjdGVkIC0gZGVmYXVsdFRleHRGb3JtYXRcclxuXHQgKiBub3QgYXBwbGllZCBteV90eHQuc2V0U2VsZWN0aW9uKDYsMjMpOyAvLyB0ZXh0IHNlbGVjdGVkIHRvIGVuZCAtXHJcblx0ICogZGVmYXVsdFRleHRGb3JtYXQgYXBwbGllZCBteV90eHQucmVwbGFjZVNlbGVjdGVkVGV4dChcIldpbmRvd3MgdmVyc2lvblwiKTtcclxuXHQgKiA8L3ByZT5cclxuXHQgKlxyXG5cdCAqIDxwPldoZW4geW91IGFjY2VzcyB0aGUgPGNvZGU+ZGVmYXVsdFRleHRGb3JtYXQ8L2NvZGU+IHByb3BlcnR5LCB0aGVcclxuXHQgKiByZXR1cm5lZCBUZXh0Rm9ybWF0IG9iamVjdCBoYXMgYWxsIG9mIGl0cyBwcm9wZXJ0aWVzIGRlZmluZWQuIE5vIHByb3BlcnR5XHJcblx0ICogaXMgPGNvZGU+bnVsbDwvY29kZT4uPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+PGI+Tm90ZTo8L2I+IFlvdSBjYW4ndCBzZXQgdGhpcyBwcm9wZXJ0eSBpZiBhIHN0eWxlIHNoZWV0IGlzIGFwcGxpZWQgdG9cclxuXHQgKiB0aGUgdGV4dCBmaWVsZC48L3A+XHJcblx0ICogXHJcblx0ICogQHRocm93cyBFcnJvciBUaGlzIG1ldGhvZCBjYW5ub3QgYmUgdXNlZCBvbiBhIHRleHQgZmllbGQgd2l0aCBhIHN0eWxlXHJcblx0ICogICAgICAgICAgICAgICBzaGVldC5cclxuXHQgKi9cclxuXHRwdWJsaWMgZGVmYXVsdFRleHRGb3JtYXQ6VGV4dEZvcm1hdDtcclxuXHJcblx0LyoqXHJcblx0ICogU3BlY2lmaWVzIHdoZXRoZXIgdGhlIHRleHQgZmllbGQgaXMgYSBwYXNzd29yZCB0ZXh0IGZpZWxkLiBJZiB0aGUgdmFsdWUgb2ZcclxuXHQgKiB0aGlzIHByb3BlcnR5IGlzIDxjb2RlPnRydWU8L2NvZGU+LCB0aGUgdGV4dCBmaWVsZCBpcyB0cmVhdGVkIGFzIGFcclxuXHQgKiBwYXNzd29yZCB0ZXh0IGZpZWxkIGFuZCBoaWRlcyB0aGUgaW5wdXQgY2hhcmFjdGVycyB1c2luZyBhc3Rlcmlza3MgaW5zdGVhZFxyXG5cdCAqIG9mIHRoZSBhY3R1YWwgY2hhcmFjdGVycy4gSWYgPGNvZGU+ZmFsc2U8L2NvZGU+LCB0aGUgdGV4dCBmaWVsZCBpcyBub3RcclxuXHQgKiB0cmVhdGVkIGFzIGEgcGFzc3dvcmQgdGV4dCBmaWVsZC4gV2hlbiBwYXNzd29yZCBtb2RlIGlzIGVuYWJsZWQsIHRoZSBDdXRcclxuXHQgKiBhbmQgQ29weSBjb21tYW5kcyBhbmQgdGhlaXIgY29ycmVzcG9uZGluZyBrZXlib2FyZCBzaG9ydGN1dHMgd2lsbCBub3RcclxuXHQgKiBmdW5jdGlvbi4gVGhpcyBzZWN1cml0eSBtZWNoYW5pc20gcHJldmVudHMgYW4gdW5zY3J1cHVsb3VzIHVzZXIgZnJvbSB1c2luZ1xyXG5cdCAqIHRoZSBzaG9ydGN1dHMgdG8gZGlzY292ZXIgYSBwYXNzd29yZCBvbiBhbiB1bmF0dGVuZGVkIGNvbXB1dGVyLlxyXG5cdCAqIFxyXG5cdCAqIEBkZWZhdWx0IGZhbHNlXHJcblx0ICovXHJcblx0cHVibGljIGRpc3BsYXlBc1Bhc3N3b3JkOmJvb2xlYW47XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNwZWNpZmllcyB3aGV0aGVyIHRvIHJlbmRlciBieSB1c2luZyBlbWJlZGRlZCBmb250IG91dGxpbmVzLiBJZlxyXG5cdCAqIDxjb2RlPmZhbHNlPC9jb2RlPiwgRmxhc2ggUGxheWVyIHJlbmRlcnMgdGhlIHRleHQgZmllbGQgYnkgdXNpbmcgZGV2aWNlXHJcblx0ICogZm9udHMuXHJcblx0ICpcclxuXHQgKiA8cD5JZiB5b3Ugc2V0IHRoZSA8Y29kZT5lbWJlZEZvbnRzPC9jb2RlPiBwcm9wZXJ0eSB0byA8Y29kZT50cnVlPC9jb2RlPlxyXG5cdCAqIGZvciBhIHRleHQgZmllbGQsIHlvdSBtdXN0IHNwZWNpZnkgYSBmb250IGZvciB0aGF0IHRleHQgYnkgdXNpbmcgdGhlXHJcblx0ICogPGNvZGU+Zm9udDwvY29kZT4gcHJvcGVydHkgb2YgYSBUZXh0Rm9ybWF0IG9iamVjdCBhcHBsaWVkIHRvIHRoZSB0ZXh0XHJcblx0ICogZmllbGQuIElmIHRoZSBzcGVjaWZpZWQgZm9udCBpcyBub3QgZW1iZWRkZWQgaW4gdGhlIFNXRiBmaWxlLCB0aGUgdGV4dCBpc1xyXG5cdCAqIG5vdCBkaXNwbGF5ZWQuPC9wPlxyXG5cdCAqIFxyXG5cdCAqIEBkZWZhdWx0IGZhbHNlXHJcblx0ICovXHJcblx0cHVibGljIGVtYmVkRm9udHM6Ym9vbGVhbjtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIHR5cGUgb2YgZ3JpZCBmaXR0aW5nIHVzZWQgZm9yIHRoaXMgdGV4dCBmaWVsZC4gVGhpcyBwcm9wZXJ0eSBhcHBsaWVzXHJcblx0ICogb25seSBpZiB0aGUgPGNvZGU+Zmxhc2gudGV4dC5BbnRpQWxpYXNUeXBlPC9jb2RlPiBwcm9wZXJ0eSBvZiB0aGUgdGV4dFxyXG5cdCAqIGZpZWxkIGlzIHNldCB0byA8Y29kZT5mbGFzaC50ZXh0LkFudGlBbGlhc1R5cGUuQURWQU5DRUQ8L2NvZGU+LlxyXG5cdCAqXHJcblx0ICogPHA+VGhlIHR5cGUgb2YgZ3JpZCBmaXR0aW5nIHVzZWQgZGV0ZXJtaW5lcyB3aGV0aGVyIEZsYXNoIFBsYXllciBmb3JjZXNcclxuXHQgKiBzdHJvbmcgaG9yaXpvbnRhbCBhbmQgdmVydGljYWwgbGluZXMgdG8gZml0IHRvIGEgcGl4ZWwgb3Igc3VicGl4ZWwgZ3JpZCxcclxuXHQgKiBvciBub3QgYXQgYWxsLjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPkZvciB0aGUgPGNvZGU+Zmxhc2gudGV4dC5HcmlkRml0VHlwZTwvY29kZT4gcHJvcGVydHksIHlvdSBjYW4gdXNlIHRoZVxyXG5cdCAqIGZvbGxvd2luZyBzdHJpbmcgdmFsdWVzOjwvcD5cclxuXHQgKiBcclxuXHQgKiBAZGVmYXVsdCBwaXhlbFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBncmlkRml0VHlwZTpHcmlkRml0VHlwZTtcclxuXHJcblx0LyoqXHJcblx0ICogQ29udGFpbnMgdGhlIEhUTUwgcmVwcmVzZW50YXRpb24gb2YgdGhlIHRleHQgZmllbGQgY29udGVudHMuXHJcblx0ICpcclxuXHQgKiA8cD5GbGFzaCBQbGF5ZXIgc3VwcG9ydHMgdGhlIGZvbGxvd2luZyBIVE1MIHRhZ3M6PC9wPlxyXG5cdCAqXHJcblx0ICogPHA+Rmxhc2ggUGxheWVyIGFuZCBBSVIgYWxzbyBzdXBwb3J0IGV4cGxpY2l0IGNoYXJhY3RlciBjb2Rlcywgc3VjaCBhc1xyXG5cdCAqICYjMzg7KEFTQ0lJIGFtcGVyc2FuZCkgYW5kICYjeDIwQUM7KFVuaWNvZGUg4oKsIHN5bWJvbCkuIDwvcD5cclxuXHQgKi9cclxuXHRwdWJsaWMgaHRtbFRleHQ6c3RyaW5nO1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgbnVtYmVyIG9mIGNoYXJhY3RlcnMgaW4gYSB0ZXh0IGZpZWxkLiBBIGNoYXJhY3RlciBzdWNoIGFzIHRhYlxyXG5cdCAqICg8Y29kZT5cXHQ8L2NvZGU+KSBjb3VudHMgYXMgb25lIGNoYXJhY3Rlci5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGxlbmd0aCgpOm51bWJlciAvKmludCovXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2xlbmd0aDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBtYXhpbXVtIG51bWJlciBvZiBjaGFyYWN0ZXJzIHRoYXQgdGhlIHRleHQgZmllbGQgY2FuIGNvbnRhaW4sIGFzXHJcblx0ICogZW50ZXJlZCBieSBhIHVzZXIuIEEgc2NyaXB0IGNhbiBpbnNlcnQgbW9yZSB0ZXh0IHRoYW5cclxuXHQgKiA8Y29kZT5tYXhDaGFyczwvY29kZT4gYWxsb3dzOyB0aGUgPGNvZGU+bWF4Q2hhcnM8L2NvZGU+IHByb3BlcnR5IGluZGljYXRlc1xyXG5cdCAqIG9ubHkgaG93IG11Y2ggdGV4dCBhIHVzZXIgY2FuIGVudGVyLiBJZiB0aGUgdmFsdWUgb2YgdGhpcyBwcm9wZXJ0eSBpc1xyXG5cdCAqIDxjb2RlPjA8L2NvZGU+LCBhIHVzZXIgY2FuIGVudGVyIGFuIHVubGltaXRlZCBhbW91bnQgb2YgdGV4dC5cclxuXHQgKiBcclxuXHQgKiBAZGVmYXVsdCAwXHJcblx0ICovXHJcblx0cHVibGljIG1heENoYXJzOm51bWJlciAvKmludCovO1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgbWF4aW11bSB2YWx1ZSBvZiA8Y29kZT5zY3JvbGxIPC9jb2RlPi5cclxuXHQgKi9cclxuXHRwdWJsaWMgbWF4U2Nyb2xsSCgpOm51bWJlciAvKmludCovXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX21heFNjcm9sbEg7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgbWF4aW11bSB2YWx1ZSBvZiA8Y29kZT5zY3JvbGxWPC9jb2RlPi5cclxuXHQgKi9cclxuXHRwdWJsaWMgbWF4U2Nyb2xsVigpOm51bWJlciAvKmludCovXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX21heFNjcm9sbFY7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBIEJvb2xlYW4gdmFsdWUgdGhhdCBpbmRpY2F0ZXMgd2hldGhlciBGbGFzaCBQbGF5ZXIgYXV0b21hdGljYWxseSBzY3JvbGxzXHJcblx0ICogbXVsdGlsaW5lIHRleHQgZmllbGRzIHdoZW4gdGhlIHVzZXIgY2xpY2tzIGEgdGV4dCBmaWVsZCBhbmQgcm9sbHMgdGhlXHJcblx0ICogbW91c2Ugd2hlZWwuIEJ5IGRlZmF1bHQsIHRoaXMgdmFsdWUgaXMgPGNvZGU+dHJ1ZTwvY29kZT4uIFRoaXMgcHJvcGVydHkgaXNcclxuXHQgKiB1c2VmdWwgaWYgeW91IHdhbnQgdG8gcHJldmVudCBtb3VzZSB3aGVlbCBzY3JvbGxpbmcgb2YgdGV4dCBmaWVsZHMsIG9yXHJcblx0ICogaW1wbGVtZW50IHlvdXIgb3duIHRleHQgZmllbGQgc2Nyb2xsaW5nLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBtb3VzZVdoZWVsRW5hYmxlZDpib29sZWFuO1xyXG5cclxuXHQvKipcclxuXHQgKiBJbmRpY2F0ZXMgd2hldGhlciBmaWVsZCBpcyBhIG11bHRpbGluZSB0ZXh0IGZpZWxkLiBJZiB0aGUgdmFsdWUgaXNcclxuXHQgKiA8Y29kZT50cnVlPC9jb2RlPiwgdGhlIHRleHQgZmllbGQgaXMgbXVsdGlsaW5lOyBpZiB0aGUgdmFsdWUgaXNcclxuXHQgKiA8Y29kZT5mYWxzZTwvY29kZT4sIHRoZSB0ZXh0IGZpZWxkIGlzIGEgc2luZ2xlLWxpbmUgdGV4dCBmaWVsZC4gSW4gYSBmaWVsZFxyXG5cdCAqIG9mIHR5cGUgPGNvZGU+VGV4dEZpZWxkVHlwZS5JTlBVVDwvY29kZT4sIHRoZSA8Y29kZT5tdWx0aWxpbmU8L2NvZGU+IHZhbHVlXHJcblx0ICogZGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSA8Y29kZT5FbnRlcjwvY29kZT4ga2V5IGNyZWF0ZXMgYSBuZXcgbGluZShhIHZhbHVlXHJcblx0ICogb2YgPGNvZGU+ZmFsc2U8L2NvZGU+LCBhbmQgdGhlIDxjb2RlPkVudGVyPC9jb2RlPiBrZXkgaXMgaWdub3JlZCkuIElmIHlvdVxyXG5cdCAqIHBhc3RlIHRleHQgaW50byBhIDxjb2RlPlRleHRGaWVsZDwvY29kZT4gd2l0aCBhIDxjb2RlPm11bHRpbGluZTwvY29kZT5cclxuXHQgKiB2YWx1ZSBvZiA8Y29kZT5mYWxzZTwvY29kZT4sIG5ld2xpbmVzIGFyZSBzdHJpcHBlZCBvdXQgb2YgdGhlIHRleHQuXHJcblx0ICogXHJcblx0ICogQGRlZmF1bHQgZmFsc2VcclxuXHQgKi9cclxuXHRwdWJsaWMgbXVsdGlsaW5lOmJvb2xlYW47XHJcblxyXG5cdC8qKlxyXG5cdCAqIERlZmluZXMgdGhlIG51bWJlciBvZiB0ZXh0IGxpbmVzIGluIGEgbXVsdGlsaW5lIHRleHQgZmllbGQuIElmXHJcblx0ICogPGNvZGU+d29yZFdyYXA8L2NvZGU+IHByb3BlcnR5IGlzIHNldCB0byA8Y29kZT50cnVlPC9jb2RlPiwgdGhlIG51bWJlciBvZlxyXG5cdCAqIGxpbmVzIGluY3JlYXNlcyB3aGVuIHRleHQgd3JhcHMuXHJcblx0ICovXHJcblx0cHVibGljIGdldCBudW1MaW5lcygpOm51bWJlciAvKmludCovXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX251bUxpbmVzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSW5kaWNhdGVzIHRoZSBzZXQgb2YgY2hhcmFjdGVycyB0aGF0IGEgdXNlciBjYW4gZW50ZXIgaW50byB0aGUgdGV4dCBmaWVsZC5cclxuXHQgKiBJZiB0aGUgdmFsdWUgb2YgdGhlIDxjb2RlPnJlc3RyaWN0PC9jb2RlPiBwcm9wZXJ0eSBpcyA8Y29kZT5udWxsPC9jb2RlPixcclxuXHQgKiB5b3UgY2FuIGVudGVyIGFueSBjaGFyYWN0ZXIuIElmIHRoZSB2YWx1ZSBvZiB0aGUgPGNvZGU+cmVzdHJpY3Q8L2NvZGU+XHJcblx0ICogcHJvcGVydHkgaXMgYW4gZW1wdHkgc3RyaW5nLCB5b3UgY2Fubm90IGVudGVyIGFueSBjaGFyYWN0ZXIuIElmIHRoZSB2YWx1ZVxyXG5cdCAqIG9mIHRoZSA8Y29kZT5yZXN0cmljdDwvY29kZT4gcHJvcGVydHkgaXMgYSBzdHJpbmcgb2YgY2hhcmFjdGVycywgeW91IGNhblxyXG5cdCAqIGVudGVyIG9ubHkgY2hhcmFjdGVycyBpbiB0aGUgc3RyaW5nIGludG8gdGhlIHRleHQgZmllbGQuIFRoZSBzdHJpbmcgaXNcclxuXHQgKiBzY2FubmVkIGZyb20gbGVmdCB0byByaWdodC4gWW91IGNhbiBzcGVjaWZ5IGEgcmFuZ2UgYnkgdXNpbmcgdGhlIGh5cGhlblxyXG5cdCAqICgtKSBjaGFyYWN0ZXIuIE9ubHkgdXNlciBpbnRlcmFjdGlvbiBpcyByZXN0cmljdGVkOyBhIHNjcmlwdCBjYW4gcHV0IGFueVxyXG5cdCAqIHRleHQgaW50byB0aGUgdGV4dCBmaWVsZC4gPHBoIG91dHB1dGNsYXNzPVwiZmxhc2hvbmx5XCI+VGhpcyBwcm9wZXJ0eSBkb2VzXHJcblx0ICogbm90IHN5bmNocm9uaXplIHdpdGggdGhlIEVtYmVkIGZvbnQgb3B0aW9ucyBpbiB0aGUgUHJvcGVydHkgaW5zcGVjdG9yLlxyXG5cdCAqXHJcblx0ICogPHA+SWYgdGhlIHN0cmluZyBiZWdpbnMgd2l0aCBhIGNhcmV0KF4pIGNoYXJhY3RlciwgYWxsIGNoYXJhY3RlcnMgYXJlXHJcblx0ICogaW5pdGlhbGx5IGFjY2VwdGVkIGFuZCBzdWNjZWVkaW5nIGNoYXJhY3RlcnMgaW4gdGhlIHN0cmluZyBhcmUgZXhjbHVkZWRcclxuXHQgKiBmcm9tIHRoZSBzZXQgb2YgYWNjZXB0ZWQgY2hhcmFjdGVycy4gSWYgdGhlIHN0cmluZyBkb2VzIG5vdCBiZWdpbiB3aXRoIGFcclxuXHQgKiBjYXJldCheKSBjaGFyYWN0ZXIsIG5vIGNoYXJhY3RlcnMgYXJlIGluaXRpYWxseSBhY2NlcHRlZCBhbmQgc3VjY2VlZGluZ1xyXG5cdCAqIGNoYXJhY3RlcnMgaW4gdGhlIHN0cmluZyBhcmUgaW5jbHVkZWQgaW4gdGhlIHNldCBvZiBhY2NlcHRlZFxyXG5cdCAqIGNoYXJhY3RlcnMuPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+VGhlIGZvbGxvd2luZyBleGFtcGxlIGFsbG93cyBvbmx5IHVwcGVyY2FzZSBjaGFyYWN0ZXJzLCBzcGFjZXMsIGFuZFxyXG5cdCAqIG51bWJlcnMgdG8gYmUgZW50ZXJlZCBpbnRvIGEgdGV4dCBmaWVsZDo8L3A+XHJcblx0ICogPHByZSB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiPiBteV90eHQucmVzdHJpY3QgPSBcIkEtWiAwLTlcIjsgPC9wcmU+XHJcblx0ICpcclxuXHQgKiA8cD5UaGUgZm9sbG93aW5nIGV4YW1wbGUgaW5jbHVkZXMgYWxsIGNoYXJhY3RlcnMsIGJ1dCBleGNsdWRlcyBsb3dlcmNhc2VcclxuXHQgKiBsZXR0ZXJzOjwvcD5cclxuXHQgKiA8cHJlIHhtbDpzcGFjZT1cInByZXNlcnZlXCI+IG15X3R4dC5yZXN0cmljdCA9IFwiXmEtelwiOyA8L3ByZT5cclxuXHQgKlxyXG5cdCAqIDxwPllvdSBjYW4gdXNlIGEgYmFja3NsYXNoIHRvIGVudGVyIGEgXiBvciAtIHZlcmJhdGltLiBUaGUgYWNjZXB0ZWRcclxuXHQgKiBiYWNrc2xhc2ggc2VxdWVuY2VzIGFyZSBcXC0sIFxcXiBvciBcXFxcLiBUaGUgYmFja3NsYXNoIG11c3QgYmUgYW4gYWN0dWFsXHJcblx0ICogY2hhcmFjdGVyIGluIHRoZSBzdHJpbmcsIHNvIHdoZW4gc3BlY2lmaWVkIGluIEFjdGlvblNjcmlwdCwgYSBkb3VibGVcclxuXHQgKiBiYWNrc2xhc2ggbXVzdCBiZSB1c2VkLiBGb3IgZXhhbXBsZSwgdGhlIGZvbGxvd2luZyBjb2RlIGluY2x1ZGVzIG9ubHkgdGhlXHJcblx0ICogZGFzaCgtKSBhbmQgY2FyZXQoXik6PC9wPlxyXG5cdCAqIDxwcmUgeG1sOnNwYWNlPVwicHJlc2VydmVcIj4gbXlfdHh0LnJlc3RyaWN0ID0gXCJcXFxcLVxcXFxeXCI7IDwvcHJlPlxyXG5cdCAqXHJcblx0ICogPHA+VGhlIF4gY2FuIGJlIHVzZWQgYW55d2hlcmUgaW4gdGhlIHN0cmluZyB0byB0b2dnbGUgYmV0d2VlbiBpbmNsdWRpbmdcclxuXHQgKiBjaGFyYWN0ZXJzIGFuZCBleGNsdWRpbmcgY2hhcmFjdGVycy4gVGhlIGZvbGxvd2luZyBjb2RlIGluY2x1ZGVzIG9ubHlcclxuXHQgKiB1cHBlcmNhc2UgbGV0dGVycywgYnV0IGV4Y2x1ZGVzIHRoZSB1cHBlcmNhc2UgbGV0dGVyIFE6PC9wPlxyXG5cdCAqIDxwcmUgeG1sOnNwYWNlPVwicHJlc2VydmVcIj4gbXlfdHh0LnJlc3RyaWN0ID0gXCJBLVpeUVwiOyA8L3ByZT5cclxuXHQgKlxyXG5cdCAqIDxwPllvdSBjYW4gdXNlIHRoZSA8Y29kZT5cXHU8L2NvZGU+IGVzY2FwZSBzZXF1ZW5jZSB0byBjb25zdHJ1Y3RcclxuXHQgKiA8Y29kZT5yZXN0cmljdDwvY29kZT4gc3RyaW5ncy4gVGhlIGZvbGxvd2luZyBjb2RlIGluY2x1ZGVzIG9ubHkgdGhlXHJcblx0ICogY2hhcmFjdGVycyBmcm9tIEFTQ0lJIDMyKHNwYWNlKSB0byBBU0NJSSAxMjYodGlsZGUpLjwvcD5cclxuXHQgKiA8cHJlIHhtbDpzcGFjZT1cInByZXNlcnZlXCI+IG15X3R4dC5yZXN0cmljdCA9IFwiXFx1MDAyMC1cXHUwMDdFXCI7IDwvcHJlPlxyXG5cdCAqIFxyXG5cdCAqIEBkZWZhdWx0IG51bGxcclxuXHQgKi9cclxuXHRwdWJsaWMgcmVzdHJpY3Q6c3RyaW5nO1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgY3VycmVudCBob3Jpem9udGFsIHNjcm9sbGluZyBwb3NpdGlvbi4gSWYgdGhlIDxjb2RlPnNjcm9sbEg8L2NvZGU+XHJcblx0ICogcHJvcGVydHkgaXMgMCwgdGhlIHRleHQgaXMgbm90IGhvcml6b250YWxseSBzY3JvbGxlZC4gVGhpcyBwcm9wZXJ0eSB2YWx1ZVxyXG5cdCAqIGlzIGFuIGludGVnZXIgdGhhdCByZXByZXNlbnRzIHRoZSBob3Jpem9udGFsIHBvc2l0aW9uIGluIHBpeGVscy5cclxuXHQgKlxyXG5cdCAqIDxwPlRoZSB1bml0cyBvZiBob3Jpem9udGFsIHNjcm9sbGluZyBhcmUgcGl4ZWxzLCB3aGVyZWFzIHRoZSB1bml0cyBvZlxyXG5cdCAqIHZlcnRpY2FsIHNjcm9sbGluZyBhcmUgbGluZXMuIEhvcml6b250YWwgc2Nyb2xsaW5nIGlzIG1lYXN1cmVkIGluIHBpeGVsc1xyXG5cdCAqIGJlY2F1c2UgbW9zdCBmb250cyB5b3UgdHlwaWNhbGx5IHVzZSBhcmUgcHJvcG9ydGlvbmFsbHkgc3BhY2VkOyB0aGF0IGlzLFxyXG5cdCAqIHRoZSBjaGFyYWN0ZXJzIGNhbiBoYXZlIGRpZmZlcmVudCB3aWR0aHMuIEZsYXNoIFBsYXllciBwZXJmb3JtcyB2ZXJ0aWNhbFxyXG5cdCAqIHNjcm9sbGluZyBieSBsaW5lIGJlY2F1c2UgdXNlcnMgdXN1YWxseSB3YW50IHRvIHNlZSBhIGNvbXBsZXRlIGxpbmUgb2ZcclxuXHQgKiB0ZXh0IHJhdGhlciB0aGFuIGEgcGFydGlhbCBsaW5lLiBFdmVuIGlmIGEgbGluZSB1c2VzIG11bHRpcGxlIGZvbnRzLCB0aGVcclxuXHQgKiBoZWlnaHQgb2YgdGhlIGxpbmUgYWRqdXN0cyB0byBmaXQgdGhlIGxhcmdlc3QgZm9udCBpbiB1c2UuPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+PGI+Tm90ZTogPC9iPlRoZSA8Y29kZT5zY3JvbGxIPC9jb2RlPiBwcm9wZXJ0eSBpcyB6ZXJvLWJhc2VkLCBub3RcclxuXHQgKiAxLWJhc2VkIGxpa2UgdGhlIDxjb2RlPnNjcm9sbFY8L2NvZGU+IHZlcnRpY2FsIHNjcm9sbGluZyBwcm9wZXJ0eS48L3A+XHJcblx0ICovXHJcblx0cHVibGljIHNjcm9sbEg6bnVtYmVyO1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgdmVydGljYWwgcG9zaXRpb24gb2YgdGV4dCBpbiBhIHRleHQgZmllbGQuIFRoZSA8Y29kZT5zY3JvbGxWPC9jb2RlPlxyXG5cdCAqIHByb3BlcnR5IGlzIHVzZWZ1bCBmb3IgZGlyZWN0aW5nIHVzZXJzIHRvIGEgc3BlY2lmaWMgcGFyYWdyYXBoIGluIGEgbG9uZ1xyXG5cdCAqIHBhc3NhZ2UsIG9yIGNyZWF0aW5nIHNjcm9sbGluZyB0ZXh0IGZpZWxkcy5cclxuXHQgKlxyXG5cdCAqIDxwPlRoZSB1bml0cyBvZiB2ZXJ0aWNhbCBzY3JvbGxpbmcgYXJlIGxpbmVzLCB3aGVyZWFzIHRoZSB1bml0cyBvZlxyXG5cdCAqIGhvcml6b250YWwgc2Nyb2xsaW5nIGFyZSBwaXhlbHMuIElmIHRoZSBmaXJzdCBsaW5lIGRpc3BsYXllZCBpcyB0aGUgZmlyc3RcclxuXHQgKiBsaW5lIGluIHRoZSB0ZXh0IGZpZWxkLCBzY3JvbGxWIGlzIHNldCB0byAxKG5vdCAwKS4gSG9yaXpvbnRhbCBzY3JvbGxpbmdcclxuXHQgKiBpcyBtZWFzdXJlZCBpbiBwaXhlbHMgYmVjYXVzZSBtb3N0IGZvbnRzIGFyZSBwcm9wb3J0aW9uYWxseSBzcGFjZWQ7IHRoYXRcclxuXHQgKiBpcywgdGhlIGNoYXJhY3RlcnMgY2FuIGhhdmUgZGlmZmVyZW50IHdpZHRocy4gRmxhc2ggcGVyZm9ybXMgdmVydGljYWxcclxuXHQgKiBzY3JvbGxpbmcgYnkgbGluZSBiZWNhdXNlIHVzZXJzIHVzdWFsbHkgd2FudCB0byBzZWUgYSBjb21wbGV0ZSBsaW5lIG9mXHJcblx0ICogdGV4dCByYXRoZXIgdGhhbiBhIHBhcnRpYWwgbGluZS4gRXZlbiBpZiB0aGVyZSBhcmUgbXVsdGlwbGUgZm9udHMgb24gYVxyXG5cdCAqIGxpbmUsIHRoZSBoZWlnaHQgb2YgdGhlIGxpbmUgYWRqdXN0cyB0byBmaXQgdGhlIGxhcmdlc3QgZm9udCBpbiB1c2UuPC9wPlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzY3JvbGxWOm51bWJlcjtcclxuXHJcblx0LyoqXHJcblx0ICogQSBCb29sZWFuIHZhbHVlIHRoYXQgaW5kaWNhdGVzIHdoZXRoZXIgdGhlIHRleHQgZmllbGQgaXMgc2VsZWN0YWJsZS4gVGhlXHJcblx0ICogdmFsdWUgPGNvZGU+dHJ1ZTwvY29kZT4gaW5kaWNhdGVzIHRoYXQgdGhlIHRleHQgaXMgc2VsZWN0YWJsZS4gVGhlXHJcblx0ICogPGNvZGU+c2VsZWN0YWJsZTwvY29kZT4gcHJvcGVydHkgY29udHJvbHMgd2hldGhlciBhIHRleHQgZmllbGQgaXNcclxuXHQgKiBzZWxlY3RhYmxlLCBub3Qgd2hldGhlciBhIHRleHQgZmllbGQgaXMgZWRpdGFibGUuIEEgZHluYW1pYyB0ZXh0IGZpZWxkIGNhblxyXG5cdCAqIGJlIHNlbGVjdGFibGUgZXZlbiBpZiBpdCBpcyBub3QgZWRpdGFibGUuIElmIGEgZHluYW1pYyB0ZXh0IGZpZWxkIGlzIG5vdFxyXG5cdCAqIHNlbGVjdGFibGUsIHRoZSB1c2VyIGNhbm5vdCBzZWxlY3QgaXRzIHRleHQuXHJcblx0ICpcclxuXHQgKiA8cD5JZiA8Y29kZT5zZWxlY3RhYmxlPC9jb2RlPiBpcyBzZXQgdG8gPGNvZGU+ZmFsc2U8L2NvZGU+LCB0aGUgdGV4dCBpblxyXG5cdCAqIHRoZSB0ZXh0IGZpZWxkIGRvZXMgbm90IHJlc3BvbmQgdG8gc2VsZWN0aW9uIGNvbW1hbmRzIGZyb20gdGhlIG1vdXNlIG9yXHJcblx0ICoga2V5Ym9hcmQsIGFuZCB0aGUgdGV4dCBjYW5ub3QgYmUgY29waWVkIHdpdGggdGhlIENvcHkgY29tbWFuZC4gSWZcclxuXHQgKiA8Y29kZT5zZWxlY3RhYmxlPC9jb2RlPiBpcyBzZXQgdG8gPGNvZGU+dHJ1ZTwvY29kZT4sIHRoZSB0ZXh0IGluIHRoZSB0ZXh0XHJcblx0ICogZmllbGQgY2FuIGJlIHNlbGVjdGVkIHdpdGggdGhlIG1vdXNlIG9yIGtleWJvYXJkLCBhbmQgdGhlIHRleHQgY2FuIGJlXHJcblx0ICogY29waWVkIHdpdGggdGhlIENvcHkgY29tbWFuZC4gWW91IGNhbiBzZWxlY3QgdGV4dCB0aGlzIHdheSBldmVuIGlmIHRoZVxyXG5cdCAqIHRleHQgZmllbGQgaXMgYSBkeW5hbWljIHRleHQgZmllbGQgaW5zdGVhZCBvZiBhbiBpbnB1dCB0ZXh0IGZpZWxkLiA8L3A+XHJcblx0ICogXHJcblx0ICogQGRlZmF1bHQgdHJ1ZVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzZWxlY3RhYmxlOmJvb2xlYW47XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSB6ZXJvLWJhc2VkIGNoYXJhY3RlciBpbmRleCB2YWx1ZSBvZiB0aGUgZmlyc3QgY2hhcmFjdGVyIGluIHRoZSBjdXJyZW50XHJcblx0ICogc2VsZWN0aW9uLiBGb3IgZXhhbXBsZSwgdGhlIGZpcnN0IGNoYXJhY3RlciBpcyAwLCB0aGUgc2Vjb25kIGNoYXJhY3RlciBpc1xyXG5cdCAqIDEsIGFuZCBzbyBvbi4gSWYgbm8gdGV4dCBpcyBzZWxlY3RlZCwgdGhpcyBwcm9wZXJ0eSBpcyB0aGUgdmFsdWUgb2ZcclxuXHQgKiA8Y29kZT5jYXJldEluZGV4PC9jb2RlPi5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHNlbGVjdGlvbkJlZ2luSW5kZXgoKTpudW1iZXIgLyppbnQqL1xyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9zZWxlY3Rpb25CZWdpbkluZGV4O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIHplcm8tYmFzZWQgY2hhcmFjdGVyIGluZGV4IHZhbHVlIG9mIHRoZSBsYXN0IGNoYXJhY3RlciBpbiB0aGUgY3VycmVudFxyXG5cdCAqIHNlbGVjdGlvbi4gRm9yIGV4YW1wbGUsIHRoZSBmaXJzdCBjaGFyYWN0ZXIgaXMgMCwgdGhlIHNlY29uZCBjaGFyYWN0ZXIgaXNcclxuXHQgKiAxLCBhbmQgc28gb24uIElmIG5vIHRleHQgaXMgc2VsZWN0ZWQsIHRoaXMgcHJvcGVydHkgaXMgdGhlIHZhbHVlIG9mXHJcblx0ICogPGNvZGU+Y2FyZXRJbmRleDwvY29kZT4uXHJcblx0ICovXHJcblx0cHVibGljIGdldCBzZWxlY3Rpb25FbmRJbmRleCgpOm51bWJlciAvKmludCovXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3NlbGVjdGlvbkVuZEluZGV4O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIHNoYXJwbmVzcyBvZiB0aGUgZ2x5cGggZWRnZXMgaW4gdGhpcyB0ZXh0IGZpZWxkLiBUaGlzIHByb3BlcnR5IGFwcGxpZXNcclxuXHQgKiBvbmx5IGlmIHRoZSA8Y29kZT5mbGFzaC50ZXh0LkFudGlBbGlhc1R5cGU8L2NvZGU+IHByb3BlcnR5IG9mIHRoZSB0ZXh0XHJcblx0ICogZmllbGQgaXMgc2V0IHRvIDxjb2RlPmZsYXNoLnRleHQuQW50aUFsaWFzVHlwZS5BRFZBTkNFRDwvY29kZT4uIFRoZSByYW5nZVxyXG5cdCAqIGZvciA8Y29kZT5zaGFycG5lc3M8L2NvZGU+IGlzIGEgbnVtYmVyIGZyb20gLTQwMCB0byA0MDAuIElmIHlvdSBhdHRlbXB0IHRvXHJcblx0ICogc2V0IDxjb2RlPnNoYXJwbmVzczwvY29kZT4gdG8gYSB2YWx1ZSBvdXRzaWRlIHRoYXQgcmFuZ2UsIEZsYXNoIHNldHMgdGhlXHJcblx0ICogcHJvcGVydHkgdG8gdGhlIG5lYXJlc3QgdmFsdWUgaW4gdGhlIHJhbmdlKGVpdGhlciAtNDAwIG9yIDQwMCkuXHJcblx0ICogXHJcblx0ICogQGRlZmF1bHQgMFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzaGFycG5lc3M6bnVtYmVyO1xyXG5cclxuXHQvKipcclxuXHQgKiBBdHRhY2hlcyBhIHN0eWxlIHNoZWV0IHRvIHRoZSB0ZXh0IGZpZWxkLiBGb3IgaW5mb3JtYXRpb24gb24gY3JlYXRpbmdcclxuXHQgKiBzdHlsZSBzaGVldHMsIHNlZSB0aGUgU3R5bGVTaGVldCBjbGFzcyBhbmQgdGhlIDxpPkFjdGlvblNjcmlwdCAzLjBcclxuXHQgKiBEZXZlbG9wZXIncyBHdWlkZTwvaT4uXHJcblx0ICpcclxuXHQgKiA8cD5Zb3UgY2FuIGNoYW5nZSB0aGUgc3R5bGUgc2hlZXQgYXNzb2NpYXRlZCB3aXRoIGEgdGV4dCBmaWVsZCBhdCBhbnlcclxuXHQgKiB0aW1lLiBJZiB5b3UgY2hhbmdlIHRoZSBzdHlsZSBzaGVldCBpbiB1c2UsIHRoZSB0ZXh0IGZpZWxkIGlzIHJlZHJhd24gd2l0aFxyXG5cdCAqIHRoZSBuZXcgc3R5bGUgc2hlZXQuIFlvdSBjYW4gc2V0IHRoZSBzdHlsZSBzaGVldCB0byA8Y29kZT5udWxsPC9jb2RlPiBvclxyXG5cdCAqIDxjb2RlPnVuZGVmaW5lZDwvY29kZT4gdG8gcmVtb3ZlIHRoZSBzdHlsZSBzaGVldC4gSWYgdGhlIHN0eWxlIHNoZWV0IGluXHJcblx0ICogdXNlIGlzIHJlbW92ZWQsIHRoZSB0ZXh0IGZpZWxkIGlzIHJlZHJhd24gd2l0aG91dCBhIHN0eWxlIHNoZWV0LiA8L3A+XHJcblx0ICpcclxuXHQgKiA8cD48Yj5Ob3RlOjwvYj4gSWYgdGhlIHN0eWxlIHNoZWV0IGlzIHJlbW92ZWQsIHRoZSBjb250ZW50cyBvZiBib3RoXHJcblx0ICogPGNvZGU+VGV4dEZpZWxkLnRleHQ8L2NvZGU+IGFuZCA8Y29kZT4gVGV4dEZpZWxkLmh0bWxUZXh0PC9jb2RlPiBjaGFuZ2UgdG9cclxuXHQgKiBpbmNvcnBvcmF0ZSB0aGUgZm9ybWF0dGluZyBwcmV2aW91c2x5IGFwcGxpZWQgYnkgdGhlIHN0eWxlIHNoZWV0LiBUb1xyXG5cdCAqIHByZXNlcnZlIHRoZSBvcmlnaW5hbCA8Y29kZT5UZXh0RmllbGQuaHRtbFRleHQ8L2NvZGU+IGNvbnRlbnRzIHdpdGhvdXQgdGhlXHJcblx0ICogZm9ybWF0dGluZywgc2F2ZSB0aGUgdmFsdWUgaW4gYSB2YXJpYWJsZSBiZWZvcmUgcmVtb3ZpbmcgdGhlIHN0eWxlXHJcblx0ICogc2hlZXQuPC9wPlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzdHlsZVNoZWV0OlN0eWxlU2hlZXQ7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEEgc3RyaW5nIHRoYXQgaXMgdGhlIGN1cnJlbnQgdGV4dCBpbiB0aGUgdGV4dCBmaWVsZC4gTGluZXMgYXJlIHNlcGFyYXRlZFxyXG5cdCAqIGJ5IHRoZSBjYXJyaWFnZSByZXR1cm4gY2hhcmFjdGVyKDxjb2RlPidcXHInPC9jb2RlPiwgQVNDSUkgMTMpLiBUaGlzXHJcblx0ICogcHJvcGVydHkgY29udGFpbnMgdW5mb3JtYXR0ZWQgdGV4dCBpbiB0aGUgdGV4dCBmaWVsZCwgd2l0aG91dCBIVE1MIHRhZ3MuXHJcblx0ICpcclxuXHQgKiA8cD5UbyBnZXQgdGhlIHRleHQgaW4gSFRNTCBmb3JtLCB1c2UgdGhlIDxjb2RlPmh0bWxUZXh0PC9jb2RlPlxyXG5cdCAqIHByb3BlcnR5LjwvcD5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHRleHQoKTpzdHJpbmdcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fdGV4dDtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgdGV4dCh2YWx1ZTpzdHJpbmcpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX3RleHQgPT0gdmFsdWUpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl90ZXh0ID0gdmFsdWU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgY29sb3Igb2YgdGhlIHRleHQgaW4gYSB0ZXh0IGZpZWxkLCBpbiBoZXhhZGVjaW1hbCBmb3JtYXQuIFRoZVxyXG5cdCAqIGhleGFkZWNpbWFsIGNvbG9yIHN5c3RlbSB1c2VzIHNpeCBkaWdpdHMgdG8gcmVwcmVzZW50IGNvbG9yIHZhbHVlcy4gRWFjaFxyXG5cdCAqIGRpZ2l0IGhhcyAxNiBwb3NzaWJsZSB2YWx1ZXMgb3IgY2hhcmFjdGVycy4gVGhlIGNoYXJhY3RlcnMgcmFuZ2UgZnJvbSAwLTlcclxuXHQgKiBhbmQgdGhlbiBBLUYuIEZvciBleGFtcGxlLCBibGFjayBpcyA8Y29kZT4weDAwMDAwMDwvY29kZT47IHdoaXRlIGlzXHJcblx0ICogPGNvZGU+MHhGRkZGRkY8L2NvZGU+LlxyXG5cdCAqIFxyXG5cdCAqIEBkZWZhdWx0IDAoMHgwMDAwMDApXHJcblx0ICovXHJcblx0cHVibGljIHRleHRDb2xvcjpudW1iZXIgLyppbnQqLztcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGhlaWdodCBvZiB0aGUgdGV4dCBpbiBwaXhlbHMuXHJcblx0ICovXHJcblx0cHVibGljIGdldCB0ZXh0SGVpZ2h0KCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3RleHRIZWlnaHQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgaW50ZXJhY3Rpb24gbW9kZSBwcm9wZXJ0eSwgRGVmYXVsdCB2YWx1ZSBpc1xyXG5cdCAqIFRleHRJbnRlcmFjdGlvbk1vZGUuTk9STUFMLiBPbiBtb2JpbGUgcGxhdGZvcm1zLCB0aGUgbm9ybWFsIG1vZGUgaW1wbGllc1xyXG5cdCAqIHRoYXQgdGhlIHRleHQgY2FuIGJlIHNjcm9sbGVkIGJ1dCBub3Qgc2VsZWN0ZWQuIE9uZSBjYW4gc3dpdGNoIHRvIHRoZVxyXG5cdCAqIHNlbGVjdGFibGUgbW9kZSB0aHJvdWdoIHRoZSBpbi1idWlsdCBjb250ZXh0IG1lbnUgb24gdGhlIHRleHQgZmllbGQuIE9uXHJcblx0ICogRGVza3RvcCwgdGhlIG5vcm1hbCBtb2RlIGltcGxpZXMgdGhhdCB0aGUgdGV4dCBpcyBpbiBzY3JvbGxhYmxlIGFzIHdlbGwgYXNcclxuXHQgKiBzZWxlY3Rpb24gbW9kZS5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHRleHRJbnRlcmFjdGlvbk1vZGUoKTpUZXh0SW50ZXJhY3Rpb25Nb2RlXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3RleHRJbnRlcmFjdGlvbk1vZGU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgd2lkdGggb2YgdGhlIHRleHQgaW4gcGl4ZWxzLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgdGV4dFdpZHRoKCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3RleHRXaWR0aDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSB0aGlja25lc3Mgb2YgdGhlIGdseXBoIGVkZ2VzIGluIHRoaXMgdGV4dCBmaWVsZC4gVGhpcyBwcm9wZXJ0eSBhcHBsaWVzXHJcblx0ICogb25seSB3aGVuIDxjb2RlPkFudGlBbGlhc1R5cGU8L2NvZGU+IGlzIHNldCB0b1xyXG5cdCAqIDxjb2RlPkFudGlBbGlhc1R5cGUuQURWQU5DRUQ8L2NvZGU+LlxyXG5cdCAqXHJcblx0ICogPHA+VGhlIHJhbmdlIGZvciA8Y29kZT50aGlja25lc3M8L2NvZGU+IGlzIGEgbnVtYmVyIGZyb20gLTIwMCB0byAyMDAuIElmXHJcblx0ICogeW91IGF0dGVtcHQgdG8gc2V0IDxjb2RlPnRoaWNrbmVzczwvY29kZT4gdG8gYSB2YWx1ZSBvdXRzaWRlIHRoYXQgcmFuZ2UsXHJcblx0ICogdGhlIHByb3BlcnR5IGlzIHNldCB0byB0aGUgbmVhcmVzdCB2YWx1ZSBpbiB0aGUgcmFuZ2UoZWl0aGVyIC0yMDAgb3JcclxuXHQgKiAyMDApLjwvcD5cclxuXHQgKiBcclxuXHQgKiBAZGVmYXVsdCAwXHJcblx0ICovXHJcblx0cHVibGljIHRoaWNrbmVzczpudW1iZXI7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSB0eXBlIG9mIHRoZSB0ZXh0IGZpZWxkLiBFaXRoZXIgb25lIG9mIHRoZSBmb2xsb3dpbmcgVGV4dEZpZWxkVHlwZVxyXG5cdCAqIGNvbnN0YW50czogPGNvZGU+VGV4dEZpZWxkVHlwZS5EWU5BTUlDPC9jb2RlPiwgd2hpY2ggc3BlY2lmaWVzIGEgZHluYW1pY1xyXG5cdCAqIHRleHQgZmllbGQsIHdoaWNoIGEgdXNlciBjYW5ub3QgZWRpdCwgb3IgPGNvZGU+VGV4dEZpZWxkVHlwZS5JTlBVVDwvY29kZT4sXHJcblx0ICogd2hpY2ggc3BlY2lmaWVzIGFuIGlucHV0IHRleHQgZmllbGQsIHdoaWNoIGEgdXNlciBjYW4gZWRpdC5cclxuXHQgKiBcclxuXHQgKiBAZGVmYXVsdCBkeW5hbWljXHJcblx0ICogQHRocm93cyBBcmd1bWVudEVycm9yIFRoZSA8Y29kZT50eXBlPC9jb2RlPiBzcGVjaWZpZWQgaXMgbm90IGEgbWVtYmVyIG9mXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIGZsYXNoLnRleHQuVGV4dEZpZWxkVHlwZS5cclxuXHQgKi9cclxuXHRwdWJsaWMgdHlwZTpUZXh0RmllbGRUeXBlO1xyXG5cclxuXHQvKipcclxuXHQgKiBTcGVjaWZpZXMgd2hldGhlciB0byBjb3B5IGFuZCBwYXN0ZSB0aGUgdGV4dCBmb3JtYXR0aW5nIGFsb25nIHdpdGggdGhlXHJcblx0ICogdGV4dC4gV2hlbiBzZXQgdG8gPGNvZGU+dHJ1ZTwvY29kZT4sIEZsYXNoIFBsYXllciBjb3BpZXMgYW5kIHBhc3Rlc1xyXG5cdCAqIGZvcm1hdHRpbmcoc3VjaCBhcyBhbGlnbm1lbnQsIGJvbGQsIGFuZCBpdGFsaWNzKSB3aGVuIHlvdSBjb3B5IGFuZCBwYXN0ZVxyXG5cdCAqIGJldHdlZW4gdGV4dCBmaWVsZHMuIEJvdGggdGhlIG9yaWdpbiBhbmQgZGVzdGluYXRpb24gdGV4dCBmaWVsZHMgZm9yIHRoZVxyXG5cdCAqIGNvcHkgYW5kIHBhc3RlIHByb2NlZHVyZSBtdXN0IGhhdmUgPGNvZGU+dXNlUmljaFRleHRDbGlwYm9hcmQ8L2NvZGU+IHNldFxyXG5cdCAqIHRvIDxjb2RlPnRydWU8L2NvZGU+LiBUaGUgZGVmYXVsdCB2YWx1ZSBpcyA8Y29kZT5mYWxzZTwvY29kZT4uXHJcblx0ICovXHJcblx0cHVibGljIHVzZVJpY2hUZXh0Q2xpcGJvYXJkOmJvb2xlYW47XHJcblxyXG5cdC8qKlxyXG5cdCAqIEEgQm9vbGVhbiB2YWx1ZSB0aGF0IGluZGljYXRlcyB3aGV0aGVyIHRoZSB0ZXh0IGZpZWxkIGhhcyB3b3JkIHdyYXAuIElmXHJcblx0ICogdGhlIHZhbHVlIG9mIDxjb2RlPndvcmRXcmFwPC9jb2RlPiBpcyA8Y29kZT50cnVlPC9jb2RlPiwgdGhlIHRleHQgZmllbGRcclxuXHQgKiBoYXMgd29yZCB3cmFwOyBpZiB0aGUgdmFsdWUgaXMgPGNvZGU+ZmFsc2U8L2NvZGU+LCB0aGUgdGV4dCBmaWVsZCBkb2VzIG5vdFxyXG5cdCAqIGhhdmUgd29yZCB3cmFwLiBUaGUgZGVmYXVsdCB2YWx1ZSBpcyA8Y29kZT5mYWxzZTwvY29kZT4uXHJcblx0ICovXHJcblx0cHVibGljIHdvcmRXcmFwOmJvb2xlYW47XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYSBuZXcgVGV4dEZpZWxkIGluc3RhbmNlLiBBZnRlciB5b3UgY3JlYXRlIHRoZSBUZXh0RmllbGQgaW5zdGFuY2UsXHJcblx0ICogY2FsbCB0aGUgPGNvZGU+YWRkQ2hpbGQoKTwvY29kZT4gb3IgPGNvZGU+YWRkQ2hpbGRBdCgpPC9jb2RlPiBtZXRob2Qgb2ZcclxuXHQgKiB0aGUgcGFyZW50IERpc3BsYXlPYmplY3RDb250YWluZXIgb2JqZWN0IHRvIGFkZCB0aGUgVGV4dEZpZWxkIGluc3RhbmNlIHRvXHJcblx0ICogdGhlIGRpc3BsYXkgbGlzdC5cclxuXHQgKlxyXG5cdCAqIDxwPlRoZSBkZWZhdWx0IHNpemUgZm9yIGEgdGV4dCBmaWVsZCBpcyAxMDAgeCAxMDAgcGl4ZWxzLjwvcD5cclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcigpXHJcblx0e1xyXG5cdFx0c3VwZXIoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFwcGVuZHMgdGhlIHN0cmluZyBzcGVjaWZpZWQgYnkgdGhlIDxjb2RlPm5ld1RleHQ8L2NvZGU+IHBhcmFtZXRlciB0byB0aGVcclxuXHQgKiBlbmQgb2YgdGhlIHRleHQgb2YgdGhlIHRleHQgZmllbGQuIFRoaXMgbWV0aG9kIGlzIG1vcmUgZWZmaWNpZW50IHRoYW4gYW5cclxuXHQgKiBhZGRpdGlvbiBhc3NpZ25tZW50KDxjb2RlPis9PC9jb2RlPikgb24gYSA8Y29kZT50ZXh0PC9jb2RlPiBwcm9wZXJ0eVxyXG5cdCAqIChzdWNoIGFzIDxjb2RlPnNvbWVUZXh0RmllbGQudGV4dCArPSBtb3JlVGV4dDwvY29kZT4pLCBwYXJ0aWN1bGFybHkgZm9yIGFcclxuXHQgKiB0ZXh0IGZpZWxkIHRoYXQgY29udGFpbnMgYSBzaWduaWZpY2FudCBhbW91bnQgb2YgY29udGVudC5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gbmV3VGV4dCBUaGUgc3RyaW5nIHRvIGFwcGVuZCB0byB0aGUgZXhpc3RpbmcgdGV4dC5cclxuXHQgKi9cclxuXHRwdWJsaWMgYXBwZW5kVGV4dChuZXdUZXh0OnN0cmluZylcclxuXHR7XHJcblx0XHQvL1RPRE9cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgYSByZWN0YW5nbGUgdGhhdCBpcyB0aGUgYm91bmRpbmcgYm94IG9mIHRoZSBjaGFyYWN0ZXIuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIGNoYXJJbmRleCBUaGUgemVyby1iYXNlZCBpbmRleCB2YWx1ZSBmb3IgdGhlIGNoYXJhY3Rlcihmb3JcclxuXHQgKiAgICAgICAgICAgICAgICAgIGV4YW1wbGUsIHRoZSBmaXJzdCBwb3NpdGlvbiBpcyAwLCB0aGUgc2Vjb25kIHBvc2l0aW9uIGlzXHJcblx0ICogICAgICAgICAgICAgICAgICAxLCBhbmQgc28gb24pLlxyXG5cdCAqIEByZXR1cm4gQSByZWN0YW5nbGUgd2l0aCA8Y29kZT54PC9jb2RlPiBhbmQgPGNvZGU+eTwvY29kZT4gbWluaW11bSBhbmRcclxuXHQgKiAgICAgICAgIG1heGltdW0gdmFsdWVzIGRlZmluaW5nIHRoZSBib3VuZGluZyBib3ggb2YgdGhlIGNoYXJhY3Rlci5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0Q2hhckJvdW5kYXJpZXMoY2hhckluZGV4Om51bWJlcik6UmVjdGFuZ2xlXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2NoYXJCb3VuZGFyaWVzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgemVyby1iYXNlZCBpbmRleCB2YWx1ZSBvZiB0aGUgY2hhcmFjdGVyIGF0IHRoZSBwb2ludCBzcGVjaWZpZWRcclxuXHQgKiBieSB0aGUgPGNvZGU+eDwvY29kZT4gYW5kIDxjb2RlPnk8L2NvZGU+IHBhcmFtZXRlcnMuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHggVGhlIDxpPng8L2k+IGNvb3JkaW5hdGUgb2YgdGhlIGNoYXJhY3Rlci5cclxuXHQgKiBAcGFyYW0geSBUaGUgPGk+eTwvaT4gY29vcmRpbmF0ZSBvZiB0aGUgY2hhcmFjdGVyLlxyXG5cdCAqIEByZXR1cm4gVGhlIHplcm8tYmFzZWQgaW5kZXggdmFsdWUgb2YgdGhlIGNoYXJhY3Rlcihmb3IgZXhhbXBsZSwgdGhlXHJcblx0ICogICAgICAgICBmaXJzdCBwb3NpdGlvbiBpcyAwLCB0aGUgc2Vjb25kIHBvc2l0aW9uIGlzIDEsIGFuZCBzbyBvbikuIFJldHVybnNcclxuXHQgKiAgICAgICAgIC0xIGlmIHRoZSBwb2ludCBpcyBub3Qgb3ZlciBhbnkgY2hhcmFjdGVyLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXRDaGFySW5kZXhBdFBvaW50KHg6bnVtYmVyLCB5Om51bWJlcik6bnVtYmVyIC8qaW50Ki9cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fY2hhckluZGV4QXRQb2ludDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdpdmVuIGEgY2hhcmFjdGVyIGluZGV4LCByZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgZmlyc3QgY2hhcmFjdGVyIGluIHRoZVxyXG5cdCAqIHNhbWUgcGFyYWdyYXBoLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBjaGFySW5kZXggVGhlIHplcm8tYmFzZWQgaW5kZXggdmFsdWUgb2YgdGhlIGNoYXJhY3Rlcihmb3IgZXhhbXBsZSxcclxuXHQgKiAgICAgICAgICAgICAgICAgIHRoZSBmaXJzdCBjaGFyYWN0ZXIgaXMgMCwgdGhlIHNlY29uZCBjaGFyYWN0ZXIgaXMgMSwgYW5kXHJcblx0ICogICAgICAgICAgICAgICAgICBzbyBvbikuXHJcblx0ICogQHJldHVybiBUaGUgemVyby1iYXNlZCBpbmRleCB2YWx1ZSBvZiB0aGUgZmlyc3QgY2hhcmFjdGVyIGluIHRoZSBzYW1lXHJcblx0ICogICAgICAgICBwYXJhZ3JhcGguXHJcblx0ICogQHRocm93cyBSYW5nZUVycm9yIFRoZSBjaGFyYWN0ZXIgaW5kZXggc3BlY2lmaWVkIGlzIG91dCBvZiByYW5nZS5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0Rmlyc3RDaGFySW5QYXJhZ3JhcGgoY2hhckluZGV4Om51bWJlciAvKmludCovKTpudW1iZXIgLyppbnQqL1xyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9maXJzdENoYXJJblBhcmFncmFwaDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgYSBEaXNwbGF5T2JqZWN0IHJlZmVyZW5jZSBmb3IgdGhlIGdpdmVuIDxjb2RlPmlkPC9jb2RlPiwgZm9yIGFuXHJcblx0ICogaW1hZ2Ugb3IgU1dGIGZpbGUgdGhhdCBoYXMgYmVlbiBhZGRlZCB0byBhbiBIVE1MLWZvcm1hdHRlZCB0ZXh0IGZpZWxkIGJ5XHJcblx0ICogdXNpbmcgYW4gPGNvZGU+PGltZz48L2NvZGU+IHRhZy4gVGhlIDxjb2RlPjxpbWc+PC9jb2RlPiB0YWcgaXMgaW4gdGhlXHJcblx0ICogZm9sbG93aW5nIGZvcm1hdDpcclxuXHQgKlxyXG5cdCAqIDxwPjxwcmUgeG1sOnNwYWNlPVwicHJlc2VydmVcIj48Y29kZT4gPGltZyBzcmMgPSAnZmlsZW5hbWUuanBnJyBpZCA9XHJcblx0ICogJ2luc3RhbmNlTmFtZScgPjwvY29kZT48L3ByZT48L3A+XHJcblx0ICogXHJcblx0ICogQHBhcmFtIGlkIFRoZSA8Y29kZT5pZDwvY29kZT4gdG8gbWF0Y2goaW4gdGhlIDxjb2RlPmlkPC9jb2RlPiBhdHRyaWJ1dGVcclxuXHQgKiAgICAgICAgICAgb2YgdGhlIDxjb2RlPjxpbWc+PC9jb2RlPiB0YWcpLlxyXG5cdCAqIEByZXR1cm4gVGhlIGRpc3BsYXkgb2JqZWN0IGNvcnJlc3BvbmRpbmcgdG8gdGhlIGltYWdlIG9yIFNXRiBmaWxlIHdpdGggdGhlXHJcblx0ICogICAgICAgICBtYXRjaGluZyA8Y29kZT5pZDwvY29kZT4gYXR0cmlidXRlIGluIHRoZSA8Y29kZT48aW1nPjwvY29kZT4gdGFnXHJcblx0ICogICAgICAgICBvZiB0aGUgdGV4dCBmaWVsZC4gRm9yIG1lZGlhIGxvYWRlZCBmcm9tIGFuIGV4dGVybmFsIHNvdXJjZSwgdGhpc1xyXG5cdCAqICAgICAgICAgb2JqZWN0IGlzIGEgTG9hZGVyIG9iamVjdCwgYW5kLCBvbmNlIGxvYWRlZCwgdGhlIG1lZGlhIG9iamVjdCBpcyBhXHJcblx0ICogICAgICAgICBjaGlsZCBvZiB0aGF0IExvYWRlciBvYmplY3QuIEZvciBtZWRpYSBlbWJlZGRlZCBpbiB0aGUgU1dGIGZpbGUsXHJcblx0ICogICAgICAgICBpdCBpcyB0aGUgbG9hZGVkIG9iamVjdC4gSWYgbm8gPGNvZGU+PGltZz48L2NvZGU+IHRhZyB3aXRoIHRoZVxyXG5cdCAqICAgICAgICAgbWF0Y2hpbmcgPGNvZGU+aWQ8L2NvZGU+IGV4aXN0cywgdGhlIG1ldGhvZCByZXR1cm5zXHJcblx0ICogICAgICAgICA8Y29kZT5udWxsPC9jb2RlPi5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0SW1hZ2VSZWZlcmVuY2UoaWQ6c3RyaW5nKTpEaXNwbGF5T2JqZWN0XHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2ltYWdlUmVmZXJlbmNlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgemVyby1iYXNlZCBpbmRleCB2YWx1ZSBvZiB0aGUgbGluZSBhdCB0aGUgcG9pbnQgc3BlY2lmaWVkIGJ5XHJcblx0ICogdGhlIDxjb2RlPng8L2NvZGU+IGFuZCA8Y29kZT55PC9jb2RlPiBwYXJhbWV0ZXJzLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSB4IFRoZSA8aT54PC9pPiBjb29yZGluYXRlIG9mIHRoZSBsaW5lLlxyXG5cdCAqIEBwYXJhbSB5IFRoZSA8aT55PC9pPiBjb29yZGluYXRlIG9mIHRoZSBsaW5lLlxyXG5cdCAqIEByZXR1cm4gVGhlIHplcm8tYmFzZWQgaW5kZXggdmFsdWUgb2YgdGhlIGxpbmUoZm9yIGV4YW1wbGUsIHRoZSBmaXJzdFxyXG5cdCAqICAgICAgICAgbGluZSBpcyAwLCB0aGUgc2Vjb25kIGxpbmUgaXMgMSwgYW5kIHNvIG9uKS4gUmV0dXJucyAtMSBpZiB0aGVcclxuXHQgKiAgICAgICAgIHBvaW50IGlzIG5vdCBvdmVyIGFueSBsaW5lLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXRMaW5lSW5kZXhBdFBvaW50KHg6bnVtYmVyLCB5Om51bWJlcik6bnVtYmVyIC8qaW50Ki9cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fbGluZUluZGV4QXRQb2ludDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIHplcm8tYmFzZWQgaW5kZXggdmFsdWUgb2YgdGhlIGxpbmUgY29udGFpbmluZyB0aGUgY2hhcmFjdGVyXHJcblx0ICogc3BlY2lmaWVkIGJ5IHRoZSA8Y29kZT5jaGFySW5kZXg8L2NvZGU+IHBhcmFtZXRlci5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gY2hhckluZGV4IFRoZSB6ZXJvLWJhc2VkIGluZGV4IHZhbHVlIG9mIHRoZSBjaGFyYWN0ZXIoZm9yIGV4YW1wbGUsXHJcblx0ICogICAgICAgICAgICAgICAgICB0aGUgZmlyc3QgY2hhcmFjdGVyIGlzIDAsIHRoZSBzZWNvbmQgY2hhcmFjdGVyIGlzIDEsIGFuZFxyXG5cdCAqICAgICAgICAgICAgICAgICAgc28gb24pLlxyXG5cdCAqIEByZXR1cm4gVGhlIHplcm8tYmFzZWQgaW5kZXggdmFsdWUgb2YgdGhlIGxpbmUuXHJcblx0ICogQHRocm93cyBSYW5nZUVycm9yIFRoZSBjaGFyYWN0ZXIgaW5kZXggc3BlY2lmaWVkIGlzIG91dCBvZiByYW5nZS5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0TGluZUluZGV4T2ZDaGFyKGNoYXJJbmRleDpudW1iZXIgLyppbnQqLyk6bnVtYmVyIC8qaW50Ki9cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fbGluZUluZGV4T2ZDaGFyO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGNoYXJhY3RlcnMgaW4gYSBzcGVjaWZpYyB0ZXh0IGxpbmUuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIGxpbmVJbmRleCBUaGUgbGluZSBudW1iZXIgZm9yIHdoaWNoIHlvdSB3YW50IHRoZSBsZW5ndGguXHJcblx0ICogQHJldHVybiBUaGUgbnVtYmVyIG9mIGNoYXJhY3RlcnMgaW4gdGhlIGxpbmUuXHJcblx0ICogQHRocm93cyBSYW5nZUVycm9yIFRoZSBsaW5lIG51bWJlciBzcGVjaWZpZWQgaXMgb3V0IG9mIHJhbmdlLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXRMaW5lTGVuZ3RoKGxpbmVJbmRleDpudW1iZXIgLyppbnQqLyk6bnVtYmVyIC8qaW50Ki9cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fbGluZUxlbmd0aDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgbWV0cmljcyBpbmZvcm1hdGlvbiBhYm91dCBhIGdpdmVuIHRleHQgbGluZS5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gbGluZUluZGV4IFRoZSBsaW5lIG51bWJlciBmb3Igd2hpY2ggeW91IHdhbnQgbWV0cmljcyBpbmZvcm1hdGlvbi5cclxuXHQgKiBAcmV0dXJuIEEgVGV4dExpbmVNZXRyaWNzIG9iamVjdC5cclxuXHQgKiBAdGhyb3dzIFJhbmdlRXJyb3IgVGhlIGxpbmUgbnVtYmVyIHNwZWNpZmllZCBpcyBvdXQgb2YgcmFuZ2UuXHJcblx0ICovXHJcblx0cHVibGljIGdldExpbmVNZXRyaWNzKGxpbmVJbmRleDpudW1iZXIgLyppbnQqLyk6VGV4dExpbmVNZXRyaWNzXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2xpbmVNZXRyaWNzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgY2hhcmFjdGVyIGluZGV4IG9mIHRoZSBmaXJzdCBjaGFyYWN0ZXIgaW4gdGhlIGxpbmUgdGhhdCB0aGVcclxuXHQgKiA8Y29kZT5saW5lSW5kZXg8L2NvZGU+IHBhcmFtZXRlciBzcGVjaWZpZXMuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIGxpbmVJbmRleCBUaGUgemVyby1iYXNlZCBpbmRleCB2YWx1ZSBvZiB0aGUgbGluZShmb3IgZXhhbXBsZSwgdGhlXHJcblx0ICogICAgICAgICAgICAgICAgICBmaXJzdCBsaW5lIGlzIDAsIHRoZSBzZWNvbmQgbGluZSBpcyAxLCBhbmQgc28gb24pLlxyXG5cdCAqIEByZXR1cm4gVGhlIHplcm8tYmFzZWQgaW5kZXggdmFsdWUgb2YgdGhlIGZpcnN0IGNoYXJhY3RlciBpbiB0aGUgbGluZS5cclxuXHQgKiBAdGhyb3dzIFJhbmdlRXJyb3IgVGhlIGxpbmUgbnVtYmVyIHNwZWNpZmllZCBpcyBvdXQgb2YgcmFuZ2UuXHJcblx0ICovXHJcblx0cHVibGljIGdldExpbmVPZmZzZXQobGluZUluZGV4Om51bWJlciAvKmludCovKTpudW1iZXIgLyppbnQqL1xyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9saW5lT2Zmc2V0O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgdGV4dCBvZiB0aGUgbGluZSBzcGVjaWZpZWQgYnkgdGhlIDxjb2RlPmxpbmVJbmRleDwvY29kZT5cclxuXHQgKiBwYXJhbWV0ZXIuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIGxpbmVJbmRleCBUaGUgemVyby1iYXNlZCBpbmRleCB2YWx1ZSBvZiB0aGUgbGluZShmb3IgZXhhbXBsZSwgdGhlXHJcblx0ICogICAgICAgICAgICAgICAgICBmaXJzdCBsaW5lIGlzIDAsIHRoZSBzZWNvbmQgbGluZSBpcyAxLCBhbmQgc28gb24pLlxyXG5cdCAqIEByZXR1cm4gVGhlIHRleHQgc3RyaW5nIGNvbnRhaW5lZCBpbiB0aGUgc3BlY2lmaWVkIGxpbmUuXHJcblx0ICogQHRocm93cyBSYW5nZUVycm9yIFRoZSBsaW5lIG51bWJlciBzcGVjaWZpZWQgaXMgb3V0IG9mIHJhbmdlLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXRMaW5lVGV4dChsaW5lSW5kZXg6bnVtYmVyIC8qaW50Ki8pOnN0cmluZ1xyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9saW5lVGV4dDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdpdmVuIGEgY2hhcmFjdGVyIGluZGV4LCByZXR1cm5zIHRoZSBsZW5ndGggb2YgdGhlIHBhcmFncmFwaCBjb250YWluaW5nXHJcblx0ICogdGhlIGdpdmVuIGNoYXJhY3Rlci4gVGhlIGxlbmd0aCBpcyByZWxhdGl2ZSB0byB0aGUgZmlyc3QgY2hhcmFjdGVyIGluIHRoZVxyXG5cdCAqIHBhcmFncmFwaChhcyByZXR1cm5lZCBieSA8Y29kZT5nZXRGaXJzdENoYXJJblBhcmFncmFwaCgpPC9jb2RlPiksIG5vdCB0b1xyXG5cdCAqIHRoZSBjaGFyYWN0ZXIgaW5kZXggcGFzc2VkIGluLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBjaGFySW5kZXggVGhlIHplcm8tYmFzZWQgaW5kZXggdmFsdWUgb2YgdGhlIGNoYXJhY3Rlcihmb3IgZXhhbXBsZSxcclxuXHQgKiAgICAgICAgICAgICAgICAgIHRoZSBmaXJzdCBjaGFyYWN0ZXIgaXMgMCwgdGhlIHNlY29uZCBjaGFyYWN0ZXIgaXMgMSwgYW5kXHJcblx0ICogICAgICAgICAgICAgICAgICBzbyBvbikuXHJcblx0ICogQHJldHVybiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgY2hhcmFjdGVycyBpbiB0aGUgcGFyYWdyYXBoLlxyXG5cdCAqIEB0aHJvd3MgUmFuZ2VFcnJvciBUaGUgY2hhcmFjdGVyIGluZGV4IHNwZWNpZmllZCBpcyBvdXQgb2YgcmFuZ2UuXHJcblx0ICovXHJcblx0cHVibGljIGdldFBhcmFncmFwaExlbmd0aChjaGFySW5kZXg6bnVtYmVyIC8qaW50Ki8pOm51bWJlciAvKmludCovXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BhcmFncmFwaExlbmd0aDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgYSBUZXh0Rm9ybWF0IG9iamVjdCB0aGF0IGNvbnRhaW5zIGZvcm1hdHRpbmcgaW5mb3JtYXRpb24gZm9yIHRoZVxyXG5cdCAqIHJhbmdlIG9mIHRleHQgdGhhdCB0aGUgPGNvZGU+YmVnaW5JbmRleDwvY29kZT4gYW5kIDxjb2RlPmVuZEluZGV4PC9jb2RlPlxyXG5cdCAqIHBhcmFtZXRlcnMgc3BlY2lmeS4gT25seSBwcm9wZXJ0aWVzIHRoYXQgYXJlIGNvbW1vbiB0byB0aGUgZW50aXJlIHRleHRcclxuXHQgKiBzcGVjaWZpZWQgYXJlIHNldCBpbiB0aGUgcmVzdWx0aW5nIFRleHRGb3JtYXQgb2JqZWN0LiBBbnkgcHJvcGVydHkgdGhhdCBpc1xyXG5cdCAqIDxpPm1peGVkPC9pPiwgbWVhbmluZyB0aGF0IGl0IGhhcyBkaWZmZXJlbnQgdmFsdWVzIGF0IGRpZmZlcmVudCBwb2ludHMgaW5cclxuXHQgKiB0aGUgdGV4dCwgaGFzIGEgdmFsdWUgb2YgPGNvZGU+bnVsbDwvY29kZT4uXHJcblx0ICpcclxuXHQgKiA8cD5JZiB5b3UgZG8gbm90IHNwZWNpZnkgdmFsdWVzIGZvciB0aGVzZSBwYXJhbWV0ZXJzLCB0aGlzIG1ldGhvZCBpc1xyXG5cdCAqIGFwcGxpZWQgdG8gYWxsIHRoZSB0ZXh0IGluIHRoZSB0ZXh0IGZpZWxkLiA8L3A+XHJcblx0ICpcclxuXHQgKiA8cD5UaGUgZm9sbG93aW5nIHRhYmxlIGRlc2NyaWJlcyB0aHJlZSBwb3NzaWJsZSB1c2FnZXM6PC9wPlxyXG5cdCAqIFxyXG5cdCAqIEByZXR1cm4gVGhlIFRleHRGb3JtYXQgb2JqZWN0IHRoYXQgcmVwcmVzZW50cyB0aGUgZm9ybWF0dGluZyBwcm9wZXJ0aWVzXHJcblx0ICogICAgICAgICBmb3IgdGhlIHNwZWNpZmllZCB0ZXh0LlxyXG5cdCAqIEB0aHJvd3MgUmFuZ2VFcnJvciBUaGUgPGNvZGU+YmVnaW5JbmRleDwvY29kZT4gb3IgPGNvZGU+ZW5kSW5kZXg8L2NvZGU+XHJcblx0ICogICAgICAgICAgICAgICAgICAgIHNwZWNpZmllZCBpcyBvdXQgb2YgcmFuZ2UuXHJcblx0ICovXHJcblx0cHVibGljIGdldFRleHRGb3JtYXQoYmVnaW5JbmRleDpudW1iZXIgLyppbnQqLyA9IC0xLCBlbmRJbmRleDpudW1iZXIgLyppbnQqLyA9IC0xKTpUZXh0Rm9ybWF0XHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3RleHRGb3JtYXQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXBsYWNlcyB0aGUgY3VycmVudCBzZWxlY3Rpb24gd2l0aCB0aGUgY29udGVudHMgb2YgdGhlIDxjb2RlPnZhbHVlPC9jb2RlPlxyXG5cdCAqIHBhcmFtZXRlci4gVGhlIHRleHQgaXMgaW5zZXJ0ZWQgYXQgdGhlIHBvc2l0aW9uIG9mIHRoZSBjdXJyZW50IHNlbGVjdGlvbixcclxuXHQgKiB1c2luZyB0aGUgY3VycmVudCBkZWZhdWx0IGNoYXJhY3RlciBmb3JtYXQgYW5kIGRlZmF1bHQgcGFyYWdyYXBoIGZvcm1hdC5cclxuXHQgKiBUaGUgdGV4dCBpcyBub3QgdHJlYXRlZCBhcyBIVE1MLlxyXG5cdCAqXHJcblx0ICogPHA+WW91IGNhbiB1c2UgdGhlIDxjb2RlPnJlcGxhY2VTZWxlY3RlZFRleHQoKTwvY29kZT4gbWV0aG9kIHRvIGluc2VydCBhbmRcclxuXHQgKiBkZWxldGUgdGV4dCB3aXRob3V0IGRpc3J1cHRpbmcgdGhlIGNoYXJhY3RlciBhbmQgcGFyYWdyYXBoIGZvcm1hdHRpbmcgb2ZcclxuXHQgKiB0aGUgcmVzdCBvZiB0aGUgdGV4dC48L3A+XHJcblx0ICpcclxuXHQgKiA8cD48Yj5Ob3RlOjwvYj4gVGhpcyBtZXRob2QgZG9lcyBub3Qgd29yayBpZiBhIHN0eWxlIHNoZWV0IGlzIGFwcGxpZWQgdG9cclxuXHQgKiB0aGUgdGV4dCBmaWVsZC48L3A+XHJcblx0ICogXHJcblx0ICogQHBhcmFtIHZhbHVlIFRoZSBzdHJpbmcgdG8gcmVwbGFjZSB0aGUgY3VycmVudGx5IHNlbGVjdGVkIHRleHQuXHJcblx0ICogQHRocm93cyBFcnJvciBUaGlzIG1ldGhvZCBjYW5ub3QgYmUgdXNlZCBvbiBhIHRleHQgZmllbGQgd2l0aCBhIHN0eWxlXHJcblx0ICogICAgICAgICAgICAgICBzaGVldC5cclxuXHQgKi9cclxuXHRwdWJsaWMgcmVwbGFjZVNlbGVjdGVkVGV4dCh2YWx1ZTpzdHJpbmcpXHJcblx0e1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlcGxhY2VzIHRoZSByYW5nZSBvZiBjaGFyYWN0ZXJzIHRoYXQgdGhlIDxjb2RlPmJlZ2luSW5kZXg8L2NvZGU+IGFuZFxyXG5cdCAqIDxjb2RlPmVuZEluZGV4PC9jb2RlPiBwYXJhbWV0ZXJzIHNwZWNpZnkgd2l0aCB0aGUgY29udGVudHMgb2YgdGhlXHJcblx0ICogPGNvZGU+bmV3VGV4dDwvY29kZT4gcGFyYW1ldGVyLiBBcyBkZXNpZ25lZCwgdGhlIHRleHQgZnJvbVxyXG5cdCAqIDxjb2RlPmJlZ2luSW5kZXg8L2NvZGU+IHRvIDxjb2RlPmVuZEluZGV4LTE8L2NvZGU+IGlzIHJlcGxhY2VkLlxyXG5cdCAqXHJcblx0ICogPHA+PGI+Tm90ZTo8L2I+IFRoaXMgbWV0aG9kIGRvZXMgbm90IHdvcmsgaWYgYSBzdHlsZSBzaGVldCBpcyBhcHBsaWVkIHRvXHJcblx0ICogdGhlIHRleHQgZmllbGQuPC9wPlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBiZWdpbkluZGV4IFRoZSB6ZXJvLWJhc2VkIGluZGV4IHZhbHVlIGZvciB0aGUgc3RhcnQgcG9zaXRpb24gb2YgdGhlXHJcblx0ICogICAgICAgICAgICAgICAgICAgcmVwbGFjZW1lbnQgcmFuZ2UuXHJcblx0ICogQHBhcmFtIGVuZEluZGV4ICAgVGhlIHplcm8tYmFzZWQgaW5kZXggcG9zaXRpb24gb2YgdGhlIGZpcnN0IGNoYXJhY3RlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgIGFmdGVyIHRoZSBkZXNpcmVkIHRleHQgc3Bhbi5cclxuXHQgKiBAcGFyYW0gbmV3VGV4dCAgICBUaGUgdGV4dCB0byB1c2UgdG8gcmVwbGFjZSB0aGUgc3BlY2lmaWVkIHJhbmdlIG9mXHJcblx0ICogICAgICAgICAgICAgICAgICAgY2hhcmFjdGVycy5cclxuXHQgKiBAdGhyb3dzIEVycm9yIFRoaXMgbWV0aG9kIGNhbm5vdCBiZSB1c2VkIG9uIGEgdGV4dCBmaWVsZCB3aXRoIGEgc3R5bGVcclxuXHQgKiAgICAgICAgICAgICAgIHNoZWV0LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyByZXBsYWNlVGV4dChiZWdpbkluZGV4Om51bWJlciAvKmludCovLCBlbmRJbmRleDpudW1iZXIgLyppbnQqLywgbmV3VGV4dDpzdHJpbmcpXHJcblx0e1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgYXMgc2VsZWN0ZWQgdGhlIHRleHQgZGVzaWduYXRlZCBieSB0aGUgaW5kZXggdmFsdWVzIG9mIHRoZSBmaXJzdCBhbmRcclxuXHQgKiBsYXN0IGNoYXJhY3RlcnMsIHdoaWNoIGFyZSBzcGVjaWZpZWQgd2l0aCB0aGUgPGNvZGU+YmVnaW5JbmRleDwvY29kZT4gYW5kXHJcblx0ICogPGNvZGU+ZW5kSW5kZXg8L2NvZGU+IHBhcmFtZXRlcnMuIElmIHRoZSB0d28gcGFyYW1ldGVyIHZhbHVlcyBhcmUgdGhlXHJcblx0ICogc2FtZSwgdGhpcyBtZXRob2Qgc2V0cyB0aGUgaW5zZXJ0aW9uIHBvaW50LCBhcyBpZiB5b3Ugc2V0IHRoZVxyXG5cdCAqIDxjb2RlPmNhcmV0SW5kZXg8L2NvZGU+IHByb3BlcnR5LlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBiZWdpbkluZGV4IFRoZSB6ZXJvLWJhc2VkIGluZGV4IHZhbHVlIG9mIHRoZSBmaXJzdCBjaGFyYWN0ZXIgaW4gdGhlXHJcblx0ICogICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uKGZvciBleGFtcGxlLCB0aGUgZmlyc3QgY2hhcmFjdGVyIGlzIDAsIHRoZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgIHNlY29uZCBjaGFyYWN0ZXIgaXMgMSwgYW5kIHNvIG9uKS5cclxuXHQgKiBAcGFyYW0gZW5kSW5kZXggICBUaGUgemVyby1iYXNlZCBpbmRleCB2YWx1ZSBvZiB0aGUgbGFzdCBjaGFyYWN0ZXIgaW4gdGhlXHJcblx0ICogICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzZXRTZWxlY3Rpb24oYmVnaW5JbmRleDpudW1iZXIgLyppbnQqLywgZW5kSW5kZXg6bnVtYmVyIC8qaW50Ki8pXHJcblx0e1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFwcGxpZXMgdGhlIHRleHQgZm9ybWF0dGluZyB0aGF0IHRoZSA8Y29kZT5mb3JtYXQ8L2NvZGU+IHBhcmFtZXRlclxyXG5cdCAqIHNwZWNpZmllcyB0byB0aGUgc3BlY2lmaWVkIHRleHQgaW4gYSB0ZXh0IGZpZWxkLiBUaGUgdmFsdWUgb2ZcclxuXHQgKiA8Y29kZT5mb3JtYXQ8L2NvZGU+IG11c3QgYmUgYSBUZXh0Rm9ybWF0IG9iamVjdCB0aGF0IHNwZWNpZmllcyB0aGUgZGVzaXJlZFxyXG5cdCAqIHRleHQgZm9ybWF0dGluZyBjaGFuZ2VzLiBPbmx5IHRoZSBub24tbnVsbCBwcm9wZXJ0aWVzIG9mXHJcblx0ICogPGNvZGU+Zm9ybWF0PC9jb2RlPiBhcmUgYXBwbGllZCB0byB0aGUgdGV4dCBmaWVsZC4gQW55IHByb3BlcnR5IG9mXHJcblx0ICogPGNvZGU+Zm9ybWF0PC9jb2RlPiB0aGF0IGlzIHNldCB0byA8Y29kZT5udWxsPC9jb2RlPiBpcyBub3QgYXBwbGllZC4gQnlcclxuXHQgKiBkZWZhdWx0LCBhbGwgb2YgdGhlIHByb3BlcnRpZXMgb2YgYSBuZXdseSBjcmVhdGVkIFRleHRGb3JtYXQgb2JqZWN0IGFyZVxyXG5cdCAqIHNldCB0byA8Y29kZT5udWxsPC9jb2RlPi5cclxuXHQgKlxyXG5cdCAqIDxwPjxiPk5vdGU6PC9iPiBUaGlzIG1ldGhvZCBkb2VzIG5vdCB3b3JrIGlmIGEgc3R5bGUgc2hlZXQgaXMgYXBwbGllZCB0b1xyXG5cdCAqIHRoZSB0ZXh0IGZpZWxkLjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPlRoZSA8Y29kZT5zZXRUZXh0Rm9ybWF0KCk8L2NvZGU+IG1ldGhvZCBjaGFuZ2VzIHRoZSB0ZXh0IGZvcm1hdHRpbmdcclxuXHQgKiBhcHBsaWVkIHRvIGEgcmFuZ2Ugb2YgY2hhcmFjdGVycyBvciB0byB0aGUgZW50aXJlIGJvZHkgb2YgdGV4dCBpbiBhIHRleHRcclxuXHQgKiBmaWVsZC4gVG8gYXBwbHkgdGhlIHByb3BlcnRpZXMgb2YgZm9ybWF0IHRvIGFsbCB0ZXh0IGluIHRoZSB0ZXh0IGZpZWxkLCBkb1xyXG5cdCAqIG5vdCBzcGVjaWZ5IHZhbHVlcyBmb3IgPGNvZGU+YmVnaW5JbmRleDwvY29kZT4gYW5kIDxjb2RlPmVuZEluZGV4PC9jb2RlPi5cclxuXHQgKiBUbyBhcHBseSB0aGUgcHJvcGVydGllcyBvZiB0aGUgZm9ybWF0IHRvIGEgcmFuZ2Ugb2YgdGV4dCwgc3BlY2lmeSB2YWx1ZXNcclxuXHQgKiBmb3IgdGhlIDxjb2RlPmJlZ2luSW5kZXg8L2NvZGU+IGFuZCB0aGUgPGNvZGU+ZW5kSW5kZXg8L2NvZGU+IHBhcmFtZXRlcnMuXHJcblx0ICogWW91IGNhbiB1c2UgdGhlIDxjb2RlPmxlbmd0aDwvY29kZT4gcHJvcGVydHkgdG8gZGV0ZXJtaW5lIHRoZSBpbmRleFxyXG5cdCAqIHZhbHVlcy48L3A+XHJcblx0ICpcclxuXHQgKiA8cD5UaGUgdHdvIHR5cGVzIG9mIGZvcm1hdHRpbmcgaW5mb3JtYXRpb24gaW4gYSBUZXh0Rm9ybWF0IG9iamVjdCBhcmVcclxuXHQgKiBjaGFyYWN0ZXIgbGV2ZWwgZm9ybWF0dGluZyBhbmQgcGFyYWdyYXBoIGxldmVsIGZvcm1hdHRpbmcuIEVhY2ggY2hhcmFjdGVyXHJcblx0ICogaW4gYSB0ZXh0IGZpZWxkIGNhbiBoYXZlIGl0cyBvd24gY2hhcmFjdGVyIGZvcm1hdHRpbmcgc2V0dGluZ3MsIHN1Y2ggYXNcclxuXHQgKiBmb250IG5hbWUsIGZvbnQgc2l6ZSwgYm9sZCwgYW5kIGl0YWxpYy48L3A+XHJcblx0ICpcclxuXHQgKiA8cD5Gb3IgcGFyYWdyYXBocywgdGhlIGZpcnN0IGNoYXJhY3RlciBvZiB0aGUgcGFyYWdyYXBoIGlzIGV4YW1pbmVkIGZvclxyXG5cdCAqIHRoZSBwYXJhZ3JhcGggZm9ybWF0dGluZyBzZXR0aW5ncyBmb3IgdGhlIGVudGlyZSBwYXJhZ3JhcGguIEV4YW1wbGVzIG9mXHJcblx0ICogcGFyYWdyYXBoIGZvcm1hdHRpbmcgc2V0dGluZ3MgYXJlIGxlZnQgbWFyZ2luLCByaWdodCBtYXJnaW4sIGFuZFxyXG5cdCAqIGluZGVudGF0aW9uLjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPkFueSB0ZXh0IGluc2VydGVkIG1hbnVhbGx5IGJ5IHRoZSB1c2VyLCBvciByZXBsYWNlZCBieSB0aGVcclxuXHQgKiA8Y29kZT5yZXBsYWNlU2VsZWN0ZWRUZXh0KCk8L2NvZGU+IG1ldGhvZCwgcmVjZWl2ZXMgdGhlIGRlZmF1bHQgdGV4dCBmaWVsZFxyXG5cdCAqIGZvcm1hdHRpbmcgZm9yIG5ldyB0ZXh0LCBhbmQgbm90IHRoZSBmb3JtYXR0aW5nIHNwZWNpZmllZCBmb3IgdGhlIHRleHRcclxuXHQgKiBpbnNlcnRpb24gcG9pbnQuIFRvIHNldCB0aGUgZGVmYXVsdCBmb3JtYXR0aW5nIGZvciBuZXcgdGV4dCwgdXNlXHJcblx0ICogPGNvZGU+ZGVmYXVsdFRleHRGb3JtYXQ8L2NvZGU+LjwvcD5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gZm9ybWF0IEEgVGV4dEZvcm1hdCBvYmplY3QgdGhhdCBjb250YWlucyBjaGFyYWN0ZXIgYW5kIHBhcmFncmFwaFxyXG5cdCAqICAgICAgICAgICAgICAgZm9ybWF0dGluZyBpbmZvcm1hdGlvbi5cclxuXHQgKiBAdGhyb3dzIEVycm9yICAgICAgVGhpcyBtZXRob2QgY2Fubm90IGJlIHVzZWQgb24gYSB0ZXh0IGZpZWxkIHdpdGggYSBzdHlsZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICBzaGVldC5cclxuXHQgKiBAdGhyb3dzIFJhbmdlRXJyb3IgVGhlIDxjb2RlPmJlZ2luSW5kZXg8L2NvZGU+IG9yIDxjb2RlPmVuZEluZGV4PC9jb2RlPlxyXG5cdCAqICAgICAgICAgICAgICAgICAgICBzcGVjaWZpZWQgaXMgb3V0IG9mIHJhbmdlLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzZXRUZXh0Rm9ybWF0KGZvcm1hdDpUZXh0Rm9ybWF0LCBiZWdpbkluZGV4Om51bWJlciAvKmludCovID0gLTEsIGVuZEluZGV4Om51bWJlciAvKmludCovID0gLTEpXHJcblx0e1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdHJ1ZSBpZiBhbiBlbWJlZGRlZCBmb250IGlzIGF2YWlsYWJsZSB3aXRoIHRoZSBzcGVjaWZpZWRcclxuXHQgKiA8Y29kZT5mb250TmFtZTwvY29kZT4gYW5kIDxjb2RlPmZvbnRTdHlsZTwvY29kZT4gd2hlcmVcclxuXHQgKiA8Y29kZT5Gb250LmZvbnRUeXBlPC9jb2RlPiBpcyA8Y29kZT5mbGFzaC50ZXh0LkZvbnRUeXBlLkVNQkVEREVEPC9jb2RlPi5cclxuXHQgKiBTdGFydGluZyB3aXRoIEZsYXNoIFBsYXllciAxMCwgdHdvIGtpbmRzIG9mIGVtYmVkZGVkIGZvbnRzIGNhbiBhcHBlYXIgaW4gYVxyXG5cdCAqIFNXRiBmaWxlLiBOb3JtYWwgZW1iZWRkZWQgZm9udHMgYXJlIG9ubHkgdXNlZCB3aXRoIFRleHRGaWVsZCBvYmplY3RzLiBDRkZcclxuXHQgKiBlbWJlZGRlZCBmb250cyBhcmUgb25seSB1c2VkIHdpdGggdGhlIGZsYXNoLnRleHQuZW5naW5lIGNsYXNzZXMuIFRoZSB0d29cclxuXHQgKiB0eXBlcyBhcmUgZGlzdGluZ3Vpc2hlZCBieSB0aGUgPGNvZGU+Zm9udFR5cGU8L2NvZGU+IHByb3BlcnR5IG9mIHRoZVxyXG5cdCAqIDxjb2RlPkZvbnQ8L2NvZGU+IGNsYXNzLCBhcyByZXR1cm5lZCBieSB0aGUgPGNvZGU+ZW51bWVyYXRlRm9udHMoKTwvY29kZT5cclxuXHQgKiBmdW5jdGlvbi5cclxuXHQgKlxyXG5cdCAqIDxwPlRleHRGaWVsZCBjYW5ub3QgdXNlIGEgZm9udCBvZiB0eXBlIDxjb2RlPkVNQkVEREVEX0NGRjwvY29kZT4uIElmXHJcblx0ICogPGNvZGU+ZW1iZWRGb250czwvY29kZT4gaXMgc2V0IHRvIDxjb2RlPnRydWU8L2NvZGU+IGFuZCB0aGUgb25seSBmb250XHJcblx0ICogYXZhaWxhYmxlIGF0IHJ1biB0aW1lIHdpdGggdGhlIHNwZWNpZmllZCBuYW1lIGFuZCBzdHlsZSBpcyBvZiB0eXBlXHJcblx0ICogPGNvZGU+RU1CRURERURfQ0ZGPC9jb2RlPiwgRmxhc2ggUGxheWVyIGZhaWxzIHRvIHJlbmRlciB0aGUgdGV4dCwgYXMgaWYgbm9cclxuXHQgKiBlbWJlZGRlZCBmb250IHdlcmUgYXZhaWxhYmxlIHdpdGggdGhlIHNwZWNpZmllZCBuYW1lIGFuZCBzdHlsZS48L3A+XHJcblx0ICpcclxuXHQgKiA8cD5JZiBib3RoIDxjb2RlPkVNQkVEREVEPC9jb2RlPiBhbmQgPGNvZGU+RU1CRURERURfQ0ZGPC9jb2RlPiBmb250cyBhcmVcclxuXHQgKiBhdmFpbGFibGUgd2l0aCB0aGUgc2FtZSBuYW1lIGFuZCBzdHlsZSwgdGhlIDxjb2RlPkVNQkVEREVEPC9jb2RlPiBmb250IGlzXHJcblx0ICogc2VsZWN0ZWQgYW5kIHRleHQgcmVuZGVycyB3aXRoIHRoZSA8Y29kZT5FTUJFRERFRDwvY29kZT4gZm9udC48L3A+XHJcblx0ICogXHJcblx0ICogQHBhcmFtIGZvbnROYW1lICBUaGUgbmFtZSBvZiB0aGUgZW1iZWRkZWQgZm9udCB0byBjaGVjay5cclxuXHQgKiBAcGFyYW0gZm9udFN0eWxlIFNwZWNpZmllcyB0aGUgZm9udCBzdHlsZSB0byBjaGVjay4gVXNlXHJcblx0ICogICAgICAgICAgICAgICAgICA8Y29kZT5mbGFzaC50ZXh0LkZvbnRTdHlsZTwvY29kZT5cclxuXHQgKiBAcmV0dXJuIDxjb2RlPnRydWU8L2NvZGU+IGlmIGEgY29tcGF0aWJsZSBlbWJlZGRlZCBmb250IGlzIGF2YWlsYWJsZSxcclxuXHQgKiAgICAgICAgIG90aGVyd2lzZSA8Y29kZT5mYWxzZTwvY29kZT4uXHJcblx0ICogQHRocm93cyBBcmd1bWVudEVycm9yIFRoZSA8Y29kZT5mb250U3R5bGU8L2NvZGU+IHNwZWNpZmllZCBpcyBub3QgYSBtZW1iZXJcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgb2YgPGNvZGU+Zmxhc2gudGV4dC5Gb250U3R5bGU8L2NvZGU+LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzdGF0aWMgaXNGb250Q29tcGF0aWJsZShmb250TmFtZTpzdHJpbmcsIGZvbnRTdHlsZTpzdHJpbmcpOmJvb2xlYW5cclxuXHR7XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgPSBUZXh0RmllbGQ7Il19