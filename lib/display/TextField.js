"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core_1 = require("@awayjs/core");
var graphics_1 = require("@awayjs/graphics");
var HierarchicalProperties_1 = require("../base/HierarchicalProperties");
var AlignmentMode_1 = require("../base/AlignmentMode");
var TesselatedFontTable_1 = require("../text/TesselatedFontTable");
var TextFieldAutoSize_1 = require("../text/TextFieldAutoSize");
var TextFieldType_1 = require("../text/TextFieldType");
var TextFormat_1 = require("../text/TextFormat");
var DisplayObject_1 = require("./DisplayObject");
var TextShape_1 = require("../text/TextShape");
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
        var _this = _super.call(this) || this;
        _this._line_indices = [];
        _this._text = "";
        _this._textDirty = false; // if text is dirty, the text-content or the text-size has changed, and we need to recalculate word-width
        _this._positionsDirty = false; // if formatting is dirty, we need to recalculate text-positions / size
        _this._glyphsDirty = false; // if glyphs are dirty, we need to recollect the glyphdata and build the text-graphics. this should ony be done max once a frame
        _this.chars_codes = []; // stores charcode per char
        _this.chars_width = []; // stores charcode per char
        _this.words = []; // stores offset and length and width for each word
        _this._textRuns_formats = []; // stores textFormat for each textrun
        _this._textRuns_words = []; // stores words-offset, word-count and width for each textrun
        _this._maxWidthLine = 0;
        _this.textShapes = {};
        _this._textColor = -1;
        _this._width = 100;
        _this._height = 100;
        _this._textWidth = 0;
        _this._textHeight = 0;
        _this.type = TextFieldType_1.TextFieldType.STATIC;
        _this._numLines = 0;
        _this.multiline = false;
        _this.selectable = true;
        _this._autoSize = TextFieldAutoSize_1.TextFieldAutoSize.NONE;
        _this._wordWrap = false;
        _this._background = false;
        _this._backgroundColor = 0xffffff;
        _this._border = false;
        _this._borderColor = 0x000000;
        _this._graphics = graphics_1.Graphics.getGraphics(_this); //unique graphics object for each TextField
        return _this;
    }
    TextField.getNewTextField = function () {
        return (TextField._textFields.length) ? TextField._textFields.pop() : new TextField();
    };
    TextField.prototype.getTextShapeForIdentifierAndFormat = function (id, format) {
        if (this.textShapes.hasOwnProperty(id)) {
            return this.textShapes[id];
        }
        this.textShapes[id] = new TextShape_1.TextShape();
        this.textShapes[id].format = format;
        return this.textShapes[id];
    };
    Object.defineProperty(TextField.prototype, "autoSize", {
        get: function () {
            return this._autoSize;
        },
        set: function (value) {
            if (this._autoSize == value)
                return;
            this._autoSize = value;
            this._positionsDirty = true;
            if (this._autoSize != TextFieldAutoSize_1.TextFieldAutoSize.NONE)
                this._pInvalidateBounds();
        },
        enumerable: true,
        configurable: true
    });
    TextField.prototype._pUpdateBoxBounds = function () {
        _super.prototype._pUpdateBoxBounds.call(this);
        this.reConstruct();
        this._pBoxBounds.x = 0;
        this._pBoxBounds.y = 0;
        this._pBoxBounds.width = this._width;
        this._pBoxBounds.height = this._height;
    };
    TextField.prototype.getBox = function (targetCoordinateSpace) {
        if (targetCoordinateSpace === void 0) { targetCoordinateSpace = null; }
        //TODO targetCoordinateSpace
        if (this._boxBoundsInvalid)
            this._pUpdateBoxBounds();
        if (targetCoordinateSpace == null || targetCoordinateSpace == this)
            return this._pBoxBounds;
        if (targetCoordinateSpace == this._pParent) {
            if (this._registrationMatrix3D) {
                if (this._tempTransform == null)
                    this._tempTransform = new core_1.Matrix3D();
                this._tempTransform.copyFrom(this._transform.matrix3D);
                this._tempTransform.prepend(this._registrationMatrix3D);
                if (this.alignmentMode != AlignmentMode_1.AlignmentMode.REGISTRATION_POINT)
                    this._tempTransform.appendTranslation(-this._registrationMatrix3D._rawData[12] * this._transform.scale.x, -this._registrationMatrix3D._rawData[13] * this._transform.scale.y, -this._registrationMatrix3D._rawData[14] * this._transform.scale.z);
                return this._tempTransform.transformBox(this._pBoxBounds);
            }
            return this._transform.matrix3D.transformBox(this._pBoxBounds);
        }
        else
            return targetCoordinateSpace.transform.inverseConcatenatedMatrix3D.transformBox(this.transform.concatenatedMatrix3D.transformBox(this._pBoxBounds));
    };
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
    Object.defineProperty(TextField.prototype, "background", {
        get: function () {
            return this._background;
        },
        set: function (value) {
            this._background = value;
            this._glyphsDirty = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "backgroundColor", {
        get: function () {
            return this._backgroundColor;
        },
        set: function (value) {
            this._backgroundColor = value;
            this._glyphsDirty = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "border", {
        get: function () {
            return this._border;
        },
        set: function (value) {
            this._border = value;
            this._glyphsDirty = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "borderColor", {
        get: function () {
            return this._borderColor;
        },
        set: function (value) {
            this._borderColor = value;
            this._glyphsDirty = true;
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
    Object.defineProperty(TextField.prototype, "defaultTextFormat", {
        get: function () {
            if (this._defaultTextFormat == null) {
                this._defaultTextFormat = new TextFormat_1.TextFormat();
            }
            return this._defaultTextFormat;
        },
        set: function (value) {
            if (this._defaultTextFormat == value)
                return;
            this._defaultTextFormat = value;
            this._textDirty = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "height", {
        /**
         *
         */
        get: function () {
            if (this._autoSize != TextFieldAutoSize_1.TextFieldAutoSize.NONE)
                this.reConstruct();
            return this._height;
        },
        set: function (val) {
            if (this._height == val)
                return;
            if (this._autoSize != TextFieldAutoSize_1.TextFieldAutoSize.NONE)
                return;
            this._height = val;
            this._positionsDirty = true;
            this._pInvalidateBounds();
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
            return this._text.length;
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
            this.reConstruct();
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
            this._textDirty = true;
            if (this._autoSize != TextFieldAutoSize_1.TextFieldAutoSize.NONE)
                this._pInvalidateBounds();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "textFormat", {
        get: function () {
            if (this._textFormat == null) {
                this._textFormat = new TextFormat_1.TextFormat();
            }
            return this._textFormat;
        },
        set: function (value) {
            this._textDirty = true;
            this._textFormat = value;
            //this.reConstruct();
            if (this._autoSize != TextFieldAutoSize_1.TextFieldAutoSize.NONE)
                this._pInvalidateBounds();
        },
        enumerable: true,
        configurable: true
    });
    TextField.prototype._hitTestPointInternal = function (x, y, shapeFlag, masksFlag) {
        if (this._graphics.count) {
            if (this._graphics._hitTestPointInternal(this._tempPoint.x, this._tempPoint.y))
                return true;
        }
        return false;
    };
    /**
     *
     * @param renderer
     *
     * @internal
     */
    TextField.prototype._acceptTraverser = function (traverser) {
        this.reConstruct(true);
        if (this._textFormat && !this._textFormat.font_table.isAsset(TesselatedFontTable_1.TesselatedFontTable) && !this._textFormat.material) {
            var new_ct = this.transform.colorTransform || (this.transform.colorTransform = new core_1.ColorTransform());
            //if(new_ct.color==0xffffff){
            this.transform.colorTransform.color = (this.textColor != null) ? this.textColor : this._textFormat.color;
            this.pInvalidateHierarchicalProperties(HierarchicalProperties_1.HierarchicalProperties.COLOR_TRANSFORM);
        }
        this._graphics.acceptTraverser(traverser);
    };
    Object.defineProperty(TextField.prototype, "scaleX", {
        /**
         * Indicates the horizontal scale(percentage) of the object as applied from
         * the registration point. The default registration point is(0,0). 1.0
         * equals 100% scale.
         *
         * <p>Scaling the local coordinate system changes the <code>x</code> and
         * <code>y</code> property values, which are defined in whole pixels. </p>
         */
        get: function () {
            return this._transform.scale.x;
        },
        set: function (val) {
            this._setScaleX(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "scaleY", {
        /**
         * Indicates the vertical scale(percentage) of an object as applied from the
         * registration point of the object. The default registration point is(0,0).
         * 1.0 is 100% scale.
         *
         * <p>Scaling the local coordinate system changes the <code>x</code> and
         * <code>y</code> property values, which are defined in whole pixels. </p>
         */
        get: function () {
            return this._transform.scale.y;
        },
        set: function (val) {
            this._setScaleY(val);
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
            //this._textFormat.color=value;
            if (this._textFormat && !this._textFormat.font_table.isAsset(TesselatedFontTable_1.TesselatedFontTable) && !this._textFormat.material) {
                if (!this.transform.colorTransform)
                    this.transform.colorTransform = new core_1.ColorTransform();
                this.transform.colorTransform.color = value;
                this.pInvalidateHierarchicalProperties(HierarchicalProperties_1.HierarchicalProperties.COLOR_TRANSFORM);
            }
            else {
                this._glyphsDirty = true;
            }
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
            this.reConstruct();
            return this._textWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "textHeight", {
        /**
         * The width of the text in pixels.
         */
        get: function () {
            this.reConstruct();
            return this._textHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "x", {
        get: function () {
            if (this._autoSize != TextFieldAutoSize_1.TextFieldAutoSize.NONE && !this._wordWrap)
                this.reConstruct();
            return this._transform.position.x;
        },
        set: function (val) {
            if (this._autoSize != TextFieldAutoSize_1.TextFieldAutoSize.NONE && !this._wordWrap)
                this.reConstruct();
            if (this._transform.position.x == val)
                return;
            this._transform.matrix3D._rawData[12] = val;
            this._transform.invalidatePosition();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "width", {
        /**
         *
         */
        get: function () {
            if (this._autoSize != TextFieldAutoSize_1.TextFieldAutoSize.NONE && !this._wordWrap)
                this.reConstruct();
            return this._width;
        },
        set: function (val) {
            if (this._width == val)
                return;
            if (this._autoSize != TextFieldAutoSize_1.TextFieldAutoSize.NONE && !this._wordWrap)
                return;
            this._width = val;
            this._positionsDirty = true;
            this._pInvalidateBounds();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "wordWrap", {
        /**
         * The width of the text in pixels.
         */
        get: function () {
            return this._wordWrap;
        },
        set: function (val) {
            if (this._wordWrap == val)
                return;
            this._wordWrap = val;
            this._positionsDirty = true;
            if (!val)
                this._pInvalidateBounds();
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
        this._textShape = null;
        this._textShape2 = null;
        if (this._textElements) {
            this._textElements.dispose();
            this._textElements = null;
        }
        if (this._textElements2) {
            this._textElements2.dispose();
            this._textElements2 = null;
        }
    };
    /**
     * Reconstructs the Graphics for this Text-field.
     */
    TextField.prototype.reConstruct = function (buildGraphics) {
        if (buildGraphics === void 0) { buildGraphics = false; }
        if (!this._textDirty && !this._positionsDirty && !this._glyphsDirty)
            return;
        // Step1: init text-data
        // this step splits the text into textRuns
        // each textRun spans a range of words that share the same text-format
        // a textRun can not be shared between paragraphs
        // for each word, 5 numbers are stored:
        // 		char-index,
        // 		x-pos,
        // 		y-pos,
        // 		word-width,
        // 		char-count,
        // a whitespace is considered as a word
        if (this._textDirty) {
            this._positionsDirty = true;
            this.chars_codes.length = 0;
            this.chars_width.length = 0;
            this.words.length = 0;
            this._textRuns_words.length = 0;
            this._textRuns_formats.length = 0;
            this._maxWidthLine = 0;
            if (this._text != "" && this._textFormat != null) {
                if (this.multiline) {
                    var paragraphs = this.text.toString().split("\\n");
                    var tl = 0;
                    var tl_len = paragraphs.length;
                    var extra_split;
                    var tl_extra = 0;
                    var tl_extra_len = paragraphs.length;
                    for (tl = 0; tl < tl_len; tl++) {
                        extra_split = paragraphs[tl].split("\n"); //match(/[^\r\n]+/g));
                        if (extra_split) {
                            tl_extra_len = extra_split.length;
                            for (tl_extra = 0; tl_extra < tl_extra_len; tl_extra++) {
                                this.buildParagraph(extra_split[tl_extra]);
                            }
                        }
                        else {
                            this.buildParagraph(paragraphs[tl]);
                        }
                    }
                }
                else {
                    var paragraphs = this.text.toString().split("\\n");
                    var tl = 0;
                    var tl_len = paragraphs.length;
                    for (tl = 0; tl < tl_len; tl++) {
                        this.buildParagraph(paragraphs[tl]);
                    }
                }
            }
        }
        // 	Step 2: positioning the words
        // 	if position is dirty, the text formatting has changed.
        // 	this step will modify the word-data stored in previous step.
        //	for each word, it adjusts the x-pos and y-pos position.
        //	this step also takes care of adjusting the textWidth and textHeight,
        //	if we have AUTOSIZE!=None
        if (this._positionsDirty) {
            this._glyphsDirty = true;
            if (this._text != "" && this._textFormat != null) {
                //console.log("TextField getWordPositions", this.id, this.words);
                this.getWordPositions();
            }
            else {
                // this is empty text, we need to reset the text-size
                this._textWidth = 0;
                this._textHeight = 0;
                if (this._autoSize != TextFieldAutoSize_1.TextFieldAutoSize.NONE) {
                    this._width = 4;
                    this._height = 4;
                    this._pInvalidateBounds();
                }
            }
        }
        this._textDirty = false;
        this._positionsDirty = false;
        if (!buildGraphics)
            return;
        // 	Step 3: building the glyphs
        // 	this step is only done if this function was called when renderer collects the graphics.
        //	only than should the reconstruct function be called with "buildGraphics=true".
        // 	in this step, the text-shapes are cleared,
        //	the data for new text-shapes is collected from the font-tables
        //	and the new text-shapes are created and assigned to the graphics
        if (this._glyphsDirty) {
            //console.log("TextField buildGlyphs", this.id, this.words);
            this.buildGlyphs();
        }
        this._glyphsDirty = false;
    };
    TextField.prototype.buildParagraph = function (paragraphText) {
        // todo: support multiple textFormat per paragraph (multiple textRuns)
        this._textRuns_formats[this._textRuns_formats.length] = this._textFormat;
        this._textRuns_words[this._textRuns_words.length] = this.words.length;
        var c = 0;
        var c_len = paragraphText.length;
        var char_code = 0;
        var char_width = 0;
        var word_cnt = 0;
        var startNewWord = true;
        this._textFormat.font_table.initFontSize(this._textFormat.size);
        // splits the text into words and create the textRuns along the way.
        var linewidh = 0;
        var whitespace_cnt = 0;
        for (c = 0; c < c_len; c++) {
            char_code = paragraphText.charCodeAt(c);
            this.chars_codes[this.chars_codes.length] = char_code;
            char_width = this._textFormat.font_table.getCharWidth(char_code.toString());
            if (char_width <= 0) {
                char_width = this._textFormat.font_table.getCharWidth("32");
            }
            // if this is a letter, and next symbol is a letter, we add the letterSpacing to the letter-width
            if (char_code != 32 && c < c_len - 1) {
                char_width += (paragraphText.charCodeAt(c + 1) == 32) ? 0 : this._textFormat.letterSpacing;
            }
            linewidh += char_width;
            this.chars_width[this.chars_width.length] = char_width;
            if (char_code == 32) {
                whitespace_cnt++;
                // if this is a whitespace, we add a new word,
                this.words[this.words.length] = this.chars_codes.length - 1; //offset into chars
                this.words[this.words.length] = 0; //x-position
                this.words[this.words.length] = 0; //y-position
                this.words[this.words.length] = char_width;
                this.words[this.words.length] = 1;
                word_cnt++;
                // we also make sure to begin a new word for next char (could be whitespace again)
                startNewWord = true;
            }
            else {
                // no whitespace
                if (startNewWord) {
                    // create new word (either this is the first char, or the last char was whitespace)
                    this.words[this.words.length] = this.chars_codes.length - 1;
                    this.words[this.words.length] = 0; //x-position
                    this.words[this.words.length] = 0; //y-position
                    this.words[this.words.length] = char_width;
                    this.words[this.words.length] = 1;
                    word_cnt++;
                }
                else {
                    // update-char length and width of active word.
                    this.words[this.words.length - 2] += char_width;
                    this.words[this.words.length - 1]++;
                }
                startNewWord = false;
            }
        }
        this._textRuns_words[this._textRuns_words.length] = word_cnt;
        this._textRuns_words[this._textRuns_words.length] = linewidh;
        this._textRuns_words[this._textRuns_words.length] = whitespace_cnt;
        if (this._maxWidthLine < linewidh) {
            this._maxWidthLine = linewidh;
        }
    };
    TextField.prototype.getWordPositions = function () {
        /*console.log("this._text", this._text);
        console.log("this._width", this._width);
        console.log("this._height", this._height);*/
        var tr = 0;
        var tr_len = this._textRuns_formats.length;
        var w = 0;
        var w_len = 0;
        var tr_length = 0;
        var additionalWhiteSpace = 0;
        var format;
        var text_width = 0;
        var text_height = 0;
        var indent = 0;
        this._numLines = 0;
        var linecnt = 0;
        var linelength = 0;
        var word_width = 0;
        var lineWordStartIndices = [];
        var lineWordEndIndices = [];
        var lineLength = [];
        var numSpacesPerline = [];
        var offsety = 2;
        // if we have autosize enabled, and no wordWrap, we can adjust the textfield width
        if (this._autoSize != TextFieldAutoSize_1.TextFieldAutoSize.NONE && !this._wordWrap && this._textDirty) {
            var oldSize = this._width;
            this._width = 4 + this._maxWidthLine + this._textFormat.indent + this._textFormat.leftMargin + this._textFormat.rightMargin;
            this._pInvalidateBounds();
            if (this._autoSize == TextFieldAutoSize_1.TextFieldAutoSize.RIGHT) {
                this._transform.matrix3D._rawData[12] -= this._width - oldSize;
                this._transform.invalidatePosition();
            }
            else if (this._autoSize == TextFieldAutoSize_1.TextFieldAutoSize.CENTER) {
                this._transform.matrix3D._rawData[12] -= (this._width - oldSize) / 2;
                this._transform.invalidatePosition();
            }
        }
        var maxLineWidth = this._width - (4 + this._textFormat.indent + this._textFormat.leftMargin + this._textFormat.rightMargin);
        for (tr = 0; tr < tr_len; tr++) {
            format = this._textRuns_formats[tr];
            format.font_table.initFontSize(format.size);
            indent = this._textFormat.indent;
            lineWordStartIndices.length = 1;
            lineWordEndIndices.length = 1;
            lineLength.length = 1;
            numSpacesPerline.length = 1;
            var line_width = 0;
            w_len = this._textRuns_words[(tr * 4)] + (this._textRuns_words[(tr * 4) + 1] * 5);
            tr_length = this._textRuns_words[(tr * 4) + 2];
            //console.log(this._textFieldWidth, tr_length, maxLineWidth);
            if (!this.multiline || tr_length <= maxLineWidth || !this.wordWrap) {
                //if(tr_length<maxLineWidth || !this.wordWrap){
                // this must be a single textline
                //console.log("one line");
                lineWordStartIndices[0] = this._textRuns_words[(tr * 4)];
                lineWordEndIndices[0] = w_len;
                lineLength[0] = tr_length;
                numSpacesPerline[0] = 0;
            }
            else {
                //console.log("split lines");
                linecnt = 0;
                linelength = 0;
                word_width = 0;
                indent = 0;
                lineWordStartIndices[0] = this._textRuns_words[(tr * 4)];
                lineWordEndIndices[0] = 0;
                lineLength[0] = 0;
                numSpacesPerline[0] = 0;
                for (w = this._textRuns_words[(tr * 4)]; w < w_len; w += 5) {
                    word_width = this.words[w + 3];
                    linelength += word_width;
                    if (linelength <= (maxLineWidth - indent) || lineLength[linecnt] == 0) {
                        lineWordEndIndices[linecnt] = w + 5;
                        lineLength[linecnt] += word_width;
                    }
                    else {
                        linelength = word_width;
                        linecnt++;
                        lineWordStartIndices[linecnt] = w;
                        lineWordEndIndices[linecnt] = w + 5;
                        lineLength[linecnt] = word_width;
                        numSpacesPerline[linecnt] = 0;
                        indent = this._textFormat.indent;
                    }
                    if (this.chars_codes[this.words[w]] == 32) {
                        numSpacesPerline[linecnt] += 1;
                    }
                }
            }
            var offsetx = 0;
            var start_idx;
            var start_idx;
            var numSpaces;
            var end_idx;
            var lineSpaceLeft;
            var l;
            var l_cnt = lineWordStartIndices.length;
            this._numLines = l_cnt;
            for (l = 0; l < l_cnt; l++) {
                linelength = lineLength[l];
                start_idx = lineWordStartIndices[l];
                end_idx = lineWordEndIndices[l];
                numSpaces = numSpacesPerline[l];
                lineSpaceLeft = maxLineWidth - linelength;
                /*console.log("lineSpaceLeft", lineSpaceLeft);
                console.log("maxLineWidth", maxLineWidth);
                console.log("linelength", linelength);*/
                additionalWhiteSpace = 0;
                offsetx = 2 + format.leftMargin + format.indent;
                if (format.align == "justify") {
                    if ((l != l_cnt - 1) && lineSpaceLeft > 0 && numSpaces > 0) {
                        // this is a textline that should be justified
                        additionalWhiteSpace = lineSpaceLeft / numSpacesPerline[l];
                    }
                    if (l != 0) {
                        // only first line has indent
                        offsetx -= format.indent;
                    }
                }
                else if (format.align == "center") {
                    offsetx += lineSpaceLeft / 2;
                }
                else if (format.align == "right") {
                    offsetx += lineSpaceLeft;
                }
                line_width = 0;
                line_width += format.leftMargin + format.indent + format.rightMargin;
                for (w = start_idx; w < end_idx; w += 5) {
                    this.words[w + 1] = offsetx;
                    this.words[w + 2] = offsety;
                    offsetx += this.words[w + 3];
                    line_width += this.words[w + 3];
                    if (format.align == "justify" && this.chars_codes[this.words[w]] == 32) {
                        // this is whitepace, we need to add extra space for justified text
                        offsetx += additionalWhiteSpace;
                    }
                }
                offsety += format.font_table.getLineHeight() + format.leading;
                /* enable for icycle:
                if(format.leading==11 && format.font_name=="DayPosterBlack"){
                    offsety+=1.5;
                }*/
                if (line_width > text_width) {
                    text_width = line_width;
                }
            }
        }
        // -2 so this values do not include the left and top border
        this._textWidth = text_width;
        this._textHeight = offsety;
        //console.log(this._textWidth, "/", this._textHeight);
        //this._textWidth+=this._textFormat.indent+ this._textFormat.leftMargin+ this._textFormat.rightMargin;
        // if autosize is enabled, we adjust the textFieldHeight
        if (this.autoSize != TextFieldAutoSize_1.TextFieldAutoSize.NONE) {
            this._height = this._textHeight + 4;
            this._pInvalidateBounds();
        }
    };
    TextField.prototype.buildGlyphs = function () {
        var textShape;
        for (var key in this.textShapes) {
            textShape = this.textShapes[key];
            this._graphics.removeShape(textShape.shape);
            graphics_1.Shape.storeShape(textShape.shape);
            textShape.shape.dispose();
            textShape.shape = null;
            textShape.elements.clear();
            textShape.elements.dispose();
            textShape.elements = null;
            textShape.verts.length = 0;
        }
        this.textShapes = {};
        this._graphics.clear();
        if (this._background || this._border) {
            if (this._background)
                this._graphics.beginFill(this._backgroundColor, 1); //this.background?1:0);
            if (this._border)
                this._graphics.lineStyle(0.1, this._borderColor, 1); //this.borderColor, this.border?1:0);
            this._graphics.drawRect(-1, -1, this._width, this._height);
            this._graphics.endFill();
        }
        var textShape;
        // process all textRuns
        var tr = 0;
        var tr_len = this._textRuns_formats.length;
        for (tr = 0; tr < tr_len; tr++) {
            this._textRuns_formats[tr].font_table.initFontSize(this._textRuns_formats[tr].size);
            this._textRuns_formats[tr].font_table.fillTextRun(this, this._textRuns_formats[tr], this._textRuns_words[(tr * 4)], this._textRuns_words[(tr * 4) + 1]);
        }
        for (var key in this.textShapes) {
            textShape = this.textShapes[key];
            var attr_length = 2; //(tess_fontTable.usesCurves)?3:2;
            var attributesView = new core_1.AttributesView(Float32Array, attr_length);
            attributesView.set(textShape.verts);
            var vertexBuffer = attributesView.attributesBuffer;
            attributesView.dispose();
            textShape.elements = new graphics_1.TriangleElements(vertexBuffer);
            textShape.elements.setPositions(new core_1.Float2Attributes(vertexBuffer));
            //if(tess_fontTable.usesCurves){
            //	this._textElements.setCustomAttributes("curves", new Byte4Attributes(vertexBuffer, false));
            //}
            textShape.shape = this._graphics.addShape(graphics_1.Shape.getShape(textShape.elements));
            var sampler = new graphics_1.Sampler2D();
            textShape.shape.style = new graphics_1.Style();
            if (textShape.format.material && this._textColor == -1) {
                textShape.shape.material = this._textFormat.material;
                textShape.shape.style.addSamplerAt(sampler, textShape.shape.material.getTextureAt(0));
                textShape.shape.material.animateUVs = true;
                textShape.shape.style.uvMatrix = new core_1.Matrix(0, 0, 0, 0, textShape.format.uv_values[0], textShape.format.uv_values[1]);
            }
            else {
                var obj = graphics_1.Graphics.get_material_for_color(this._textColor == -1 ? textShape.format.color : this._textColor, 1);
                textShape.shape.material = obj.material;
                if (obj.colorPos) {
                    textShape.shape.style.addSamplerAt(sampler, textShape.shape.material.getTextureAt(0));
                    textShape.shape.material.animateUVs = true;
                    textShape.shape.style.uvMatrix = new core_1.Matrix(0, 0, 0, 0, obj.colorPos.x, obj.colorPos.y);
                }
            }
        }
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
        this._textDirty = true;
        if (this._autoSize != TextFieldAutoSize_1.TextFieldAutoSize.NONE)
            this._pInvalidateBounds();
    };
    /**
     * *tells the Textfield that a paragraph is defined completly.
     * e.g. the textfield will start a new line for future added text.
     */
    TextField.prototype.closeParagraph = function () {
        this._text += "\n";
        this._textDirty = true;
        //TODO
        if (this._autoSize != TextFieldAutoSize_1.TextFieldAutoSize.NONE)
            this._pInvalidateBounds();
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
        var newInstance = TextField.getNewTextField();
        this.copyTo(newInstance);
        return newInstance;
    };
    TextField.prototype.copyTo = function (newInstance) {
        _super.prototype.copyTo.call(this, newInstance);
        newInstance.width = this._width;
        newInstance.height = this._height;
        newInstance.textFormat = this._textFormat;
        //newInstance.textColor = this._textColor;
        newInstance.text = this._text;
    };
    return TextField;
}(DisplayObject_1.DisplayObject));
TextField._textFields = [];
TextField.assetType = "[asset TextField]";
exports.TextField = TextField;
