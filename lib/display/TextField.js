"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AttributesView_1 = require("@awayjs/core/lib/attributes/AttributesView");
var Float2Attributes_1 = require("@awayjs/core/lib/attributes/Float2Attributes");
var Byte4Attributes_1 = require("@awayjs/core/lib/attributes/Byte4Attributes");
var Matrix_1 = require("@awayjs/core/lib/geom/Matrix");
var ColorTransform_1 = require("@awayjs/core/lib/geom/ColorTransform");
var Sampler2D_1 = require("@awayjs/core/lib/image/Sampler2D");
var HierarchicalProperties_1 = require("../base/HierarchicalProperties");
var Style_1 = require("../base/Style");
var TextFieldType_1 = require("../text/TextFieldType");
var Sprite_1 = require("../display/Sprite");
var TriangleElements_1 = require("../graphics/TriangleElements");
var DefaultMaterialManager_1 = require("../managers/DefaultMaterialManager");
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
        this.type = TextFieldType_1.TextFieldType.STATIC;
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
            value = value.toString();
            if (this._text == value)
                return;
            this._text = value;
            this._textGraphicsDirty = true;
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
            this._textGraphicsDirty = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "graphics", {
        /**
         * The graphics used by the sprite that provides it with its shape.
         */
        get: function () {
            if (this._textGraphicsDirty)
                this.reConstruct();
            return this._graphics;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "textColor", {
        get: function () {
            return this._textColor;
        },
        set: function (value) {
            this._textColor = value;
            if (!this.transform.colorTransform)
                this.transform.colorTransform = new ColorTransform_1.ColorTransform();
            this.transform.colorTransform.color = value;
            this.pInvalidateHierarchicalProperties(HierarchicalProperties_1.HierarchicalProperties.COLOR_TRANSFORM);
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
        set: function (value) {
            this._textWidth = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "textHeight", {
        /**
         * The width of the text in pixels.
         */
        get: function () {
            return this._textHeight;
        },
        set: function (value) {
            this._textHeight = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "isEntity", {
        /**
         *
         */
        get: function () {
            return true; //TODO do this better
        },
        enumerable: true,
        configurable: true
    });
    TextField.prototype.clear = function () {
        _super.prototype.clear.call(this);
        if (this._textElements)
            this._textElements.clear();
    };
    /**
     * @inheritDoc
     */
    TextField.prototype.dispose = function () {
        this.disposeValues();
        TextField._textFields.push(this);
    };
    /**
     * @inheritDoc
     */
    TextField.prototype.disposeValues = function () {
        _super.prototype.disposeValues.call(this);
        this._textFormat = null;
        this._textGraphic = null;
        if (this._textElements) {
            this._textElements.dispose();
            this._textElements = null;
        }
    };
    /**
     * Reconstructs the Graphics for this Text-field.
     */
    TextField.prototype.reConstruct = function () {
        this._textGraphicsDirty = false;
        if (this._textFormat == null)
            return;
        if (this._textGraphic) {
            this._textGraphic.dispose();
            this._textGraphic = null;
            this._textElements.clear();
            this._textElements.dispose();
            this._textElements = null;
        }
        if (this._text == "")
            return;
        var numVertices = 0;
        var elements;
        var char_vertices;
        var thisFormat = this._textFormat.font_table;
        var fallbackFormat = null;
        if (this._textFormat.fallback_font_table)
            fallbackFormat = this._textFormat.fallback_font_table;
        var char_scale = this._textFormat.size / thisFormat.get_font_em_size();
        var y_offset = 0;
        var prev_char = null;
        var j = 0;
        var k = 0;
        var whitespace_width = (thisFormat.get_whitespace_width() * char_scale) + this._textFormat.letterSpacing;
        var textlines = this.text.toString().split("\\n");
        var final_lines_chars = [];
        var final_lines_char_scale = [];
        var final_lines_width = [];
        var final_lines_justify_bool = [];
        var final_isParagraph = [];
        var final_lines_justify = [];
        var maxlineWidth;
        for (var tl = 0; tl < textlines.length; tl++) {
            maxlineWidth = this.textWidth - (4 + this._textFormat.leftMargin + this._textFormat.rightMargin + this._textFormat.indent);
            final_lines_chars.push([]);
            final_lines_char_scale.push([]);
            final_lines_width.push(0);
            final_lines_justify.push(0);
            final_lines_justify_bool.push(false);
            final_isParagraph.push(true);
            var words = textlines[tl].split(" ");
            for (var i = 0; i < words.length; i++) {
                var word_width = 0;
                var word_chars = [];
                var word_chars_scale = [];
                var c_cnt = 0;
                for (var w = 0; w < words[i].length; w++) {
                    char_scale = this._textFormat.size / thisFormat.get_font_em_size();
                    var this_char = thisFormat.getChar(words[i].charCodeAt(w).toString());
                    if (this_char == null) {
                        if (fallbackFormat) {
                            char_scale = this._textFormat.size / fallbackFormat.get_font_em_size();
                            this_char = fallbackFormat.getChar(words[i].charCodeAt(w).toString());
                        }
                    }
                    if (this_char != null) {
                        char_vertices = this_char.fill_data;
                        if (char_vertices != null) {
                            numVertices += char_vertices.count;
                            // find kerning value that has been set for this char_code on previous char (if non exists, kerning_value will stay 0)
                            var kerning_value = 0;
                            if (prev_char != null) {
                                for (var k = 0; k < prev_char.kerningCharCodes.length; k++) {
                                    if (prev_char.kerningCharCodes[k] == words[i].charCodeAt(w)) {
                                        kerning_value = prev_char.kerningValues[k];
                                        break;
                                    }
                                }
                            }
                            word_width += ((2 + this_char.char_width + kerning_value) * char_scale) + this._textFormat.letterSpacing;
                        }
                        else {
                            // if no char-elements was found, we insert a "space"
                            word_width += whitespace_width;
                        }
                    }
                    else {
                        // if no char-elements was found, we insert a "space"
                        //x_offset += thisFormat.get_font_em_size() * char_scale;
                        word_width += whitespace_width;
                    }
                    word_chars_scale[c_cnt] = char_scale;
                    word_chars[c_cnt++] = this_char;
                }
                if (((final_lines_width[final_lines_width.length - 1] + word_width) <= maxlineWidth) || (final_lines_chars[final_lines_chars.length - 1].length == 0)) {
                    // if line can hold this word without breaking the bounds, we can just add all chars
                    for (var fw = 0; fw < word_chars_scale.length; fw++) {
                        final_lines_chars[final_lines_chars.length - 1].push(word_chars[fw]);
                        final_lines_char_scale[final_lines_char_scale.length - 1].push(word_chars_scale[fw]);
                    }
                    final_lines_width[final_lines_width.length - 1] += word_width;
                }
                else {
                    // word does not fit
                    // todo respect autowrapping properties.
                    // right now we just pretend everything has autowrapping and multiline
                    if (final_lines_chars[final_lines_chars.length - 1][final_lines_chars[final_lines_chars.length - 1].length - 1] == null) {
                        final_lines_chars[final_lines_chars.length - 1].pop();
                        final_lines_char_scale[final_lines_char_scale.length - 1].pop();
                        final_lines_width[final_lines_width.length - 1] -= whitespace_width;
                        final_lines_justify[final_lines_justify.length - 1] -= 1;
                    }
                    final_lines_justify_bool[final_lines_justify_bool.length - 1] = true;
                    final_lines_chars.push([]);
                    final_lines_char_scale.push([]);
                    final_lines_width.push(0);
                    final_lines_justify.push(0);
                    final_lines_justify_bool.push(false);
                    final_isParagraph.push(false);
                    for (var fw = 0; fw < word_chars_scale.length; fw++) {
                        final_lines_chars[final_lines_chars.length - 1].push(word_chars[fw]);
                        final_lines_char_scale[final_lines_char_scale.length - 1].push(word_chars_scale[fw]);
                    }
                    final_lines_width[final_lines_width.length - 1] = word_width;
                    maxlineWidth = this.textWidth - (4 + this._textFormat.leftMargin + this._textFormat.rightMargin);
                }
                if (i < (words.length - 1)) {
                    if ((final_lines_width[final_lines_width.length - 1]) <= maxlineWidth) {
                        final_lines_chars[final_lines_chars.length - 1].push(null);
                        final_lines_char_scale[final_lines_char_scale.length - 1].push(char_scale);
                        final_lines_width[final_lines_width.length - 1] += whitespace_width;
                        final_lines_justify[final_lines_justify.length - 1] += 1;
                    }
                }
            }
        }
        y_offset = 2 + (thisFormat.ascent - thisFormat.get_font_em_size()) * char_scale;
        var vertices = new Float32Array(numVertices * 3);
        for (var i = 0; i < final_lines_chars.length; i++) {
            var intent = 0;
            if (final_isParagraph[i]) {
                intent = this._textFormat.indent;
            }
            maxlineWidth = this.textWidth - (4 + this._textFormat.leftMargin + this._textFormat.rightMargin + intent);
            var x_offset = 2 + this._textFormat.leftMargin + intent;
            var justify_addion = 0;
            if (this._textFormat.align == "center") {
                x_offset = 2 + this._textFormat.leftMargin + intent + (maxlineWidth - final_lines_width[i]) / 2;
            }
            else if (this._textFormat.align == "justify") {
                if (final_lines_justify_bool[i]) {
                    justify_addion = ((maxlineWidth) - final_lines_width[i]) / final_lines_justify[i];
                }
            }
            else if (this._textFormat.align == "right") {
                x_offset = (this._textWidth - final_lines_width[i]) - (2 + this._textFormat.rightMargin);
            }
            //console.log("this._textFormat.align="+this._textFormat.align);
            //console.log("this._width="+this._width);
            for (var t = 0; t < final_lines_chars[i].length; t++) {
                var this_char = final_lines_chars[i][t];
                char_scale = final_lines_char_scale[i][t];
                if (this_char != null) {
                    char_vertices = this_char.fill_data;
                    if (char_vertices != null) {
                        var buffer = new Float32Array(char_vertices.buffer);
                        for (var v = 0; v < char_vertices.count; v++) {
                            vertices[j++] = buffer[v * 3] * char_scale + x_offset;
                            vertices[j++] = buffer[v * 3 + 1] * char_scale + y_offset;
                            vertices[j++] = buffer[v * 3 + 2];
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
                        // if no char-elements was found, we insert a "space"
                        x_offset += whitespace_width + justify_addion;
                    }
                }
                else {
                    x_offset += whitespace_width + justify_addion;
                }
            }
            // hack for multiline textfield in icycle.
            y_offset += (thisFormat.ascent + thisFormat.descent) * char_scale;
            //y_offset+=(thisFormat.get_font_em_size()-thisFormat.descent)*char_scale;
            y_offset += this._textFormat.leading;
        }
        var attributesView = new AttributesView_1.AttributesView(Float32Array, 3);
        attributesView.set(vertices);
        var vertexBuffer = attributesView.attributesBuffer;
        attributesView.dispose();
        this._textElements = new TriangleElements_1.TriangleElements(vertexBuffer);
        this._textElements.setPositions(new Float2Attributes_1.Float2Attributes(vertexBuffer));
        this._textElements.setCustomAttributes("curves", new Byte4Attributes_1.Byte4Attributes(vertexBuffer, false));
        this._textGraphic = this._graphics.addGraphic(this._textElements);
        var sampler = new Sampler2D_1.Sampler2D();
        this._textGraphic.style = new Style_1.Style();
        if (this._textFormat.material) {
            this._textGraphic.material = this._textFormat.material;
            this._textGraphic.style.addSamplerAt(sampler, this._textGraphic.material.getTextureAt(0));
            this._textGraphic.material.animateUVs = true;
            this._textGraphic.style.uvMatrix = new Matrix_1.Matrix(0, 0, 0, 0, this._textFormat.uv_values[0], this._textFormat.uv_values[1]);
        }
        else {
            this._textGraphic.material = DefaultMaterialManager_1.DefaultMaterialManager.getDefaultMaterial();
            this._textGraphic.material.bothSides = true;
            //this._textGraphic.material.useColorTransform = true;
            this._textGraphic.material.curves = true;
            this._textGraphic.style.addSamplerAt(sampler, this._textGraphic.material.getTextureAt(0));
            //sampler.imageRect = new Rectangle(0, 0, 0.5, 0.5);
            this._textGraphic.style.uvMatrix = new Matrix_1.Matrix(0, 0, 0, 0, 0.126, 0);
            this._textGraphic.material.animateUVs = true;
        }
        this.material = this._textGraphic.material;
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
    TextField.prototype.clone = function () {
        var newInstance = (TextField._textFields.length) ? TextField._textFields.pop() : new TextField();
        this.copyTo(newInstance);
        return newInstance;
    };
    TextField.prototype.copyTo = function (newInstance) {
        _super.prototype.copyTo.call(this, newInstance);
        newInstance.textWidth = this._textWidth;
        newInstance.textHeight = this._textHeight;
        newInstance.textFormat = this._textFormat;
        //newInstance.textColor = this._textColor;
        newInstance.text = this._text;
    };
    TextField._textFields = new Array();
    TextField.assetType = "[asset TextField]";
    return TextField;
}(Sprite_1.Sprite));
exports.TextField = TextField;
