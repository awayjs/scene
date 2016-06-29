"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ColorTransform_1 = require("@awayjs/core/lib/geom/ColorTransform");
var HierarchicalProperties_1 = require("../base/HierarchicalProperties");
var TextFieldType_1 = require("../text/TextFieldType");
var Sprite_1 = require("../display/Sprite");
/**
 * The TextFieldMultiRender class is used to create display objects for text display and
 * input. <ph outputclass="flexonly">You can use the TextFieldMultiRender class to
 * perform low-level text rendering. However, in Flex, you typically use the
 * Label, Text, TextArea, and TextInput controls to process text. <ph
 * outputclass="flashonly">You can give a text field an instance name in the
 * Property inspector and use the methods and properties of the TextFieldMultiRender
 * class to manipulate it with ActionScript. TextFieldMultiRender instance names are
 * displayed in the Movie Explorer and in the Insert Target Path dialog box in
 * the Actions panel.
 *
 * <p>To create a text field dynamically, use the <code>TextFieldMultiRender()</code>
 * constructor.</p>
 *
 * <p>The methods of the TextFieldMultiRender class let you set, select, and manipulate
 * text in a dynamic or input text field that you create during authoring or
 * at runtime. </p>
 *
 * <p>ActionScript provides several ways to format your text at runtime. The
 * TextFormat class lets you set character and paragraph formatting for
 * TextFieldMultiRender objects. You can apply Cascading Style Sheets(CSS) styles to
 * text fields by using the <code>TextFieldMultiRender.styleSheet</code> property and the
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
 * @event scroll                    Dispatched by a TextFieldMultiRender object
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
var TextFieldMultiRender = (function (_super) {
    __extends(TextFieldMultiRender, _super);
    /**
     * Creates a new TextFieldMultiRender instance. After you create the TextFieldMultiRender instance,
     * call the <code>addChild()</code> or <code>addChildAt()</code> method of
     * the parent DisplayObjectContainer object to add the TextFieldMultiRender instance to
     * the display list.
     *
     * <p>The default size for a text field is 100 x 100 pixels.</p>
     */
    function TextFieldMultiRender() {
        _super.call(this);
        this._explicitFormats = new Array();
        this._explicitFormatsRanges = new Array();
        this._line_indices = new Array();
        this._text = "";
        this.type = TextFieldType_1.TextFieldType.STATIC;
    }
    Object.defineProperty(TextFieldMultiRender.prototype, "assetType", {
        /**
         *
         * @returns {string}
         */
        get: function () {
            return TextFieldMultiRender.assetType;
        },
        enumerable: true,
        configurable: true
    });
    TextFieldMultiRender.prototype.setFormatForRange = function (start, end, format) {
        var i = 0;
        var len = this._explicitFormats.length;
        var is_added = false;
        var new_formatslist = new Array();
        var new_formatsranges = new Array();
        var new_cnt = 0;
        for (i = 0; i < len; i++) {
            if (!is_added) {
                if (this._explicitFormatsRanges[(i * 2)] > start) {
                    is_added = true;
                    new_formatslist[new_cnt] = format;
                    new_formatsranges[new_cnt * 2] = start;
                    new_formatsranges[(new_cnt * 2) + 1] = end;
                    new_cnt++;
                }
            }
            new_formatslist[new_cnt] = this._explicitFormats[i];
            new_formatsranges[new_cnt * 2] = this._explicitFormatsRanges[(i * 2)];
            new_formatsranges[(new_cnt * 2) + 1] = this._explicitFormatsRanges[(i * 2) + 1];
            new_cnt++;
        }
        this._explicitFormats = new_formatslist;
        this._explicitFormatsRanges = new_formatsranges;
    };
    TextFieldMultiRender.prototype.getFormatAtChar = function (char_pos) {
        var i = 0;
        var len = this._explicitFormats.length;
        var active_format = this.textFormat;
        for (i = 0; i < len; i++) {
            if ((this._explicitFormatsRanges[(i * 2)] <= char_pos) && (this._explicitFormatsRanges[(i * 2) + 1] >= char_pos)) {
                active_format = this._explicitFormats[i];
            }
        }
        return active_format;
    };
    Object.defineProperty(TextFieldMultiRender.prototype, "bottomScrollV", {
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
    Object.defineProperty(TextFieldMultiRender.prototype, "caretIndex", {
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
    Object.defineProperty(TextFieldMultiRender.prototype, "length", {
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
    TextFieldMultiRender.prototype.maxScrollH = function () {
        return this._maxScrollH;
    };
    /**
     * The maximum value of <code>scrollV</code>.
     */
    TextFieldMultiRender.prototype.maxScrollV = function () {
        return this._maxScrollV;
    };
    Object.defineProperty(TextFieldMultiRender.prototype, "numLines", {
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
    Object.defineProperty(TextFieldMultiRender.prototype, "selectionBeginIndex", {
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
    Object.defineProperty(TextFieldMultiRender.prototype, "selectionEndIndex", {
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
    Object.defineProperty(TextFieldMultiRender.prototype, "text", {
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
    Object.defineProperty(TextFieldMultiRender.prototype, "textFormat", {
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
    Object.defineProperty(TextFieldMultiRender.prototype, "graphics", {
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
    Object.defineProperty(TextFieldMultiRender.prototype, "textColor", {
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
    Object.defineProperty(TextFieldMultiRender.prototype, "textInteractionMode", {
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
    Object.defineProperty(TextFieldMultiRender.prototype, "textWidth", {
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
    Object.defineProperty(TextFieldMultiRender.prototype, "textHeight", {
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
    Object.defineProperty(TextFieldMultiRender.prototype, "isEntity", {
        /**
         *
         */
        get: function () {
            return true; //TODO do this better
        },
        enumerable: true,
        configurable: true
    });
    TextFieldMultiRender.prototype.clear = function () {
        _super.prototype.clear.call(this);
        if (this._textElements)
            this._textElements.clear();
    };
    /**
     * @inheritDoc
     */
    TextFieldMultiRender.prototype.dispose = function () {
        this.disposeValues();
        TextFieldMultiRender._textFields.push(this);
    };
    /**
     * @inheritDoc
     */
    TextFieldMultiRender.prototype.disposeValues = function () {
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
    TextFieldMultiRender.prototype.reConstruct = function (useCanvas2dhack) {
        /* temporary disabled this...

        this._textGraphicsDirty = false;

        if(this._textFormat == null)
            return;


        if (this._textGraphic) {
            this._textGraphic.dispose();
            this._textGraphic = null;

            this._textElements.clear();
            this._textElements.dispose();
            this._textElements = null;
        }

        if(this._text == "")
            return;

        var activeFormat:TextFormat=null;
        var newFormat:TextFormat=null;

        // split text into lines
        // todo: split at all sorts of linebreaks (incl escaped linebreaks like we do right now)
        var textlines:Array<string> = this.text.toString().split("\\n");
        var maxlineWidth:number=this.textWidth - (4 + this._textFormat.leftMargin + this._textFormat.rightMargin + this._textFormat.indent);

        var tl_char_codes:Array<Array<number>> = [];
        var tl_char_widths:Array<Array<number>> = [];
        var tl_char_formats:Array<Array<TextFormat>> = [];
        var tl_width:Array<number> = [];
        var tl_height:Array<number> = [];
        var tl_cnt:number=0;
        var w:number=0;
        var c:number=0;
        var tl:number=0;
        var words:Array<string>;
        var char_cnt:number=0;
        var char_width:number=0;
        var numVertices:number = 0;
        this._line_indices=[];
        // sort all chars into final lines
        for (tl = 0; tl < textlines.length; tl++) {
            console.log("textline nr: "+tl+" : "+textlines[tl]);
            this._line_indices[tl_cnt]=char_cnt;
            tl_char_codes[tl_cnt]=[];
            tl_char_widths[tl_cnt]=[];
            tl_char_formats[tl_cnt]=[];
            tl_width[tl_cnt]=0;
            tl_height[tl_cnt]=0;
            tl_cnt++;
            words = textlines[tl].split(" ");
            for (w = 0; w < words.length; w++) {
                var word_width:number=0;
                var char_widths:Array<number>=[];
                var char_formats:Array<TextFormat>=[];
                var max_word_height:number=0;
                for (c = 0; c < words[w].length; c++) {
                    newFormat=this.getFormatAtChar(char_cnt);
                    if(newFormat!=activeFormat){
                        activeFormat=newFormat;
                        activeFormat.font_table.initFontSize(activeFormat.size);
                    }
                    char_formats[c]=activeFormat;
                    var lineHeight:number=activeFormat.font_table.getLineHeight();
                    if(lineHeight>max_word_height)max_word_height=lineHeight;

                    char_width = activeFormat.font_table.getCharWidth(words[w].charCodeAt(c).toString());
                    numVertices += activeFormat.font_table.getCharVertCnt(words[w].charCodeAt(c).toString());
                    char_widths[c]=char_width;
                    word_width += char_width;
                    char_cnt++;
                }
                // word fits into line, just add it to the last line
                if((tl_width[tl_cnt-1]+word_width) <= maxlineWidth){
                    if(tl_width[tl_cnt-1]!=0){
                        // there is already a word in this line. we want to add a space
                        tl_char_codes[tl_cnt-1].push(32);
                        //todo: get correct format
                        tl_char_widths[tl_cnt-1].push(activeFormat.font_table.getCharWidth("32"));
                        tl_char_formats[tl_cnt-1].push(activeFormat);
                        tl_width[tl_cnt-1]+=activeFormat.font_table.getCharWidth("32");
                    }
                    for (c = 0; c < words[w].length; c++) {
                        tl_char_codes[tl_cnt-1].push(words[w].charCodeAt(c));
                        tl_char_widths[tl_cnt-1].push(char_widths[c]);
                        tl_char_formats[tl_cnt-1].push(char_formats[c]);
                        tl_width[tl_cnt-1]+=word_width;
                    }
                    if(tl_height[tl_cnt-1]<max_word_height)tl_height[tl_cnt-1]=max_word_height;
                }
                // word does not fit into line, but it is first word added to line, so we add it anyway.
                // todo: respect auto--wrap / multiline settings + optional include 3rd party tool for splitting into sylibils
                else if(tl_width[tl_cnt-1]==0){
                    for (c = 0; c < words[w].length; c++) {
                        tl_char_codes[tl_cnt-1].push(words[w].charCodeAt(c));
                        tl_char_widths[tl_cnt-1].push(char_widths[c]);
                        tl_char_formats[tl_cnt-1].push(char_formats[c]);
                        tl_width[tl_cnt-1]+=word_width;
                    }
                    if(tl_height[tl_cnt-1]<max_word_height)tl_height[tl_cnt-1]=max_word_height;
                }
                // word does not fit, and there are already words on this line
                else{
                    tl_char_codes[tl_cnt]=[];
                    tl_char_widths[tl_cnt]=[];
                    tl_char_formats[tl_cnt]=[];
                    tl_width[tl_cnt]=0;
                    tl_height[tl_cnt]=0;
                    tl_cnt++;
                    for (c = 0; c < words[w].length; c++) {
                        tl_char_codes[tl_cnt-1].push(words[w].charCodeAt(c));
                        tl_char_widths[tl_cnt-1].push(char_widths[c]);
                        tl_char_formats[tl_cnt-1].push(char_formats[c]);
                        tl_width[tl_cnt-1]+=word_width;
                    }
                    if(tl_height[tl_cnt-1]<max_word_height)tl_height[tl_cnt-1]=max_word_height;
                }
            }
        }
        var tl_startx:Array<Array<number> >=[];
        // calculate the final positions of the chars
        for (tl = 0; tl < tl_width.length; tl++) {

            var x_offset:number= 2 + this._textFormat.leftMargin + this._textFormat.indent;
            var justify_addion:number=0;
            if(this._textFormat.align=="center"){
                x_offset=2 + this._textFormat.leftMargin + this._textFormat.indent+(maxlineWidth-tl_width[tl])/2;
            }
            else if(this._textFormat.align=="justify"){
                /*if(final_lines_justify_bool[i]){
                    justify_addion=((maxlineWidth)-final_lines_width[i])/final_lines_justify[i];
                }*/ /*
    }
    else if(this._textFormat.align=="right"){
        x_offset=(this._textWidth-tl_width[tl])-(2 + this._textFormat.rightMargin);
    }
    tl_startx[tl]=[];
    this.textHeight=0;
    for (var c = 0; c < tl_char_codes[tl].length; c++) {
        this.textHeight+=tl_height[tl];
        tl_startx[tl][c]=x_offset;
        x_offset+=tl_char_widths[tl][c];
        // if this is a whitespace, we add the justify additional spacer
        if(tl_char_codes[tl][c]==32){
            x_offset+=justify_addion;
        }
    }
}


//todo: i tried to use the isAsset() function instead of comparing the strings myself, but this didnt seem to work. need to find out why
if(this._textFormat.font_table.assetType==TesselatedFontTable.assetType){
    var tess_fontTable:TesselatedFontTable = <TesselatedFontTable>this._textFormat.font_table;
    var elements:TriangleElements;
    var j:number = 0;
    var k:number = 0;
    var y_offset:number=0;
    var char_scale:number=0;
    var vertices:Float32Array = new Float32Array(numVertices*3);

    for (tl = 0; tl < tl_width.length; tl++) {
        console.log("textline nr: "+tl+" : "+tl_char_codes[tl]);
        //console.log("tl_width = "+tl_width[tl]);
        y_offset+=tl_height[tl];
        for (var c = 0; c < tl_char_codes[tl].length; c++) {
            var this_char:TesselatedFontChar = tess_fontTable.getChar(tl_char_codes[tl][c].toString());
            char_scale = tess_fontTable._size_multiply;
            if (this_char != null) {
                elements = this_char.elements;
                if (elements != null) {
                    var buffer:Float32Array = new Float32Array(elements.concatenatedBuffer.buffer);
                    for (var v:number = 0; v < elements.numVertices; v++) {
                        vertices[j++] = buffer[v*3] * char_scale + tl_startx[tl][c];
                        vertices[j++] = buffer[v*3 + 1] * char_scale + y_offset-tl_height[tl];
                        vertices[j++] = buffer[v*3 + 2];
                    }
                }
            }
        }
    }


    var attributesView:AttributesView = new AttributesView(Float32Array, 3);
    attributesView.set(vertices);
    var vertexBuffer:AttributesBuffer = attributesView.attributesBuffer;
    attributesView.dispose();

    this._textElements = new TriangleElements(vertexBuffer);
    this._textElements.setPositions(new Float2Attributes(vertexBuffer));
    this._textElements.setCustomAttributes("curves", new Byte4Attributes(vertexBuffer, false));

    this._textGraphic = this._graphics.addGraphic(this._textElements);

    this.material = this._textFormat.material;
    var sampler:Sampler2D = new Sampler2D();
    this.style = new Style();
    this.style.addSamplerAt(sampler, this.material.getTextureAt(0));
    this.style.uvMatrix = new Matrix(0,0,0,0, this._textFormat.uv_values[0], this._textFormat.uv_values[1]);
    this.material.animateUVs = true;
}

else if(this._textFormat.font_table.assetType==BitmapFontTable.assetType){
    console.log("contruct bitmap text = "+this._text);
    var bitmap_fontTable:BitmapFontTable = <BitmapFontTable>this._textFormat.font_table;
    if(!useCanvas2dhack){
        var vertices:Float32Array = new Float32Array(numVertices*7);
        var vert_cnt:number=0;
        var y_offset:number=0;//2+(tess_fontTable.ascent-tess_fontTable.get_font_em_size())*char_scale;
        for (tl = 0; tl < tl_width.length; tl++) {
            console.log("textline nr: "+tl+" : "+tl_char_codes[tl]);
            //console.log("tl_width = "+tl_width[tl]);
            y_offset+=tl_height[tl];
            for (var c = 0; c < tl_char_codes[tl].length; c++) {
                //console.log("tl_char_codes[tl] = "+tl_char_codes[tl][c]);
                //console.log("tl_startx[tl] = "+tl_startx[tl][c]);
                //console.log("y_offset = "+y_offset);
                //console.log("vert_cnt = "+vert_cnt);
                var char_data:Array<number>=bitmap_fontTable.getCharData(tl_char_codes[tl][c].toString());

                console.log("char_data = "+char_data);
                vertices[vert_cnt++] = tl_startx[tl][c]+char_data[4];
                vertices[vert_cnt++] = y_offset-tl_height[tl]+char_data[5];
                vertices[vert_cnt++] = char_data[0];
                vertices[vert_cnt++] = char_data[1];

                vertices[vert_cnt++] = tl_startx[tl][c] + tl_char_widths[tl][c]+char_data[4];
                vertices[vert_cnt++] = y_offset -tl_height[tl]+char_data[5];
                vertices[vert_cnt++] = char_data[0] + char_data[2];
                vertices[vert_cnt++] = char_data[1];

                vertices[vert_cnt++] = tl_startx[tl][c] + tl_char_widths[tl][c]+char_data[4];
                vertices[vert_cnt++] = y_offset;
                vertices[vert_cnt++] = char_data[0] + char_data[2];
                vertices[vert_cnt++] = char_data[1] + char_data[3];

                vertices[vert_cnt++] = tl_startx[tl][c] + tl_char_widths[tl][c]+char_data[4];
                vertices[vert_cnt++] = y_offset;
                vertices[vert_cnt++] = char_data[0] + char_data[2];
                vertices[vert_cnt++] = char_data[1] + char_data[3];

                vertices[vert_cnt++] = tl_startx[tl][c]+char_data[4];
                vertices[vert_cnt++] = y_offset;
                vertices[vert_cnt++] = char_data[0];
                vertices[vert_cnt++] = char_data[1] + char_data[3];

                vertices[vert_cnt++] = tl_startx[tl][c]+char_data[4];
                vertices[vert_cnt++] = y_offset -tl_height[tl]+char_data[5];
                vertices[vert_cnt++] = char_data[0];
                vertices[vert_cnt++] = char_data[1];
            }
        }
        var attributesView:AttributesView = new AttributesView(Float32Array, 4);
        attributesView.set(vertices);
        var vertexBuffer:AttributesBuffer = attributesView.attributesBuffer;
        attributesView.dispose();

        this._textElements = new TriangleElements(vertexBuffer);
        this._textElements.setPositions(new Float2Attributes(vertexBuffer));
        //this._textElements.setCustomAttributes("curves", new Byte4Attributes(vertexBuffer, false));
        //this._textElements.setCustomAttributes("curves", new Float3Attributes(vertexBuffer));
        this._textElements.setUVs(new Float2Attributes(vertexBuffer));

        this._textGraphic = this._graphics.addGraphic(this._textElements);

        var basic_mat:BasicMaterial = new BasicMaterial();
        basic_mat.texture = new Single2DTexture(bitmap_fontTable.get_page());
        basic_mat.bothSides = true;
        //basic_mat.preserveAlpha = true;
        basic_mat.alphaBlending = true;
        this.material = <MaterialBase>basic_mat;
        //var sampler:Sampler2D = new Sampler2D();
        //this.style = new Style();
        //this.style.addSamplerAt(sampler, new Single2DTexture(bitmap_fontTable.get_page()));
        //this.style.uvMatrix = new Matrix(0,0,0,0, 0, 0);
        //this.material.animateUVs = true;
    }
    else{

        var canvas:HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("myCanvas");
        if (canvas==null){
            canvas = document.createElement("canvas");
            canvas.id = "myCanvas";
            document.body.appendChild(canvas);

        }
        var ctx = canvas.getContext("2d");
        ctx.canvas.width  = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
        //var transform_mx:Matrix3D=this.transform.matrix3D;
        //ctx.setTransform(transform_mx.a,transform_mx.b,transform_mx.c,transform_mx.d,transform_mx.tx,transform_mx.ty);
        ctx.rect(0, 0, this.textWidth, this.textHeight);
        ctx.fillStyle = "black";
        ctx.fill();
        //ctx.drawImage(bitmap_fontTable.get_page().getCanvas(), 50, 50, 200, 200, 0, 0, 100, 100);
        var y_offset:number=0;//2+(tess_fontTable.ascent-tess_fontTable.get_font_em_size())*char_scale;
        for (tl = 0; tl < tl_width.length; tl++) {
            console.log("textline nr: "+tl+" : "+tl_char_codes[tl]);
            //console.log("tl_width = "+tl_width[tl]);
            y_offset+=tl_height[tl];
            for (var c = 0; c < tl_char_codes[tl].length; c++) {
                var char_data:Array<number>=bitmap_fontTable.getCharDataCanvas(tl_char_codes[tl][c].toString());

                ctx.drawImage(
                    bitmap_fontTable.get_page().getCanvas(),
                    char_data[0], char_data[1],
                    char_data[2], char_data[3],
                    tl_startx[tl][c] + char_data[4], y_offset - tl_height[tl] + char_data[5],
                    tl_char_widths[tl][c], tl_height[tl] - char_data[5]
                );


            }
        }
    }
}

*/
        if (useCanvas2dhack === void 0) { useCanvas2dhack = false; }
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
    TextFieldMultiRender.prototype.appendText = function (newText) {
        this._text += newText;
    };
    /**
     * *tells the Textfield that a paragraph is defined completly.
     * e.g. the textfield will start a new line for future added text.
     */
    TextFieldMultiRender.prototype.closeParagraph = function () {
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
    TextFieldMultiRender.prototype.getCharBoundaries = function (charIndex) {
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
    TextFieldMultiRender.prototype.getCharIndexAtPoint = function (x, y) {
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
    TextFieldMultiRender.prototype.getFirstCharInParagraph = function (charIndex /*int*/) {
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
    TextFieldMultiRender.prototype.getImageReference = function (id) {
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
    TextFieldMultiRender.prototype.getLineIndexAtPoint = function (x, y) {
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
    TextFieldMultiRender.prototype.getLineIndexOfChar = function (charIndex /*int*/) {
        return this._lineIndexOfChar;
    };
    /**
     * Returns the number of characters in a specific text line.
     *
     * @param lineIndex The line number for which you want the length.
     * @return The number of characters in the line.
     * @throws RangeError The line number specified is out of range.
     */
    TextFieldMultiRender.prototype.getLineLength = function (lineIndex /*int*/) {
        return this._lineLength;
    };
    /**
     * Returns metrics information about a given text line.
     *
     * @param lineIndex The line number for which you want metrics information.
     * @return A TextLineMetrics object.
     * @throws RangeError The line number specified is out of range.
     */
    TextFieldMultiRender.prototype.getLineMetrics = function (lineIndex /*int*/) {
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
    TextFieldMultiRender.prototype.getLineOffset = function (lineIndex /*int*/) {
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
    TextFieldMultiRender.prototype.getLineText = function (lineIndex /*int*/) {
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
    TextFieldMultiRender.prototype.getParagraphLength = function (charIndex /*int*/) {
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
    TextFieldMultiRender.prototype.getTextFormat = function (beginIndex, endIndex) {
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
    TextFieldMultiRender.prototype.replaceSelectedText = function (value) {
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
    TextFieldMultiRender.prototype.replaceText = function (beginIndex /*int*/, endIndex /*int*/, newText) {
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
    TextFieldMultiRender.prototype.setSelection = function (beginIndex /*int*/, endIndex /*int*/) {
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
    TextFieldMultiRender.prototype.setTextFormat = function (format, beginIndex, endIndex) {
        if (beginIndex === void 0) { beginIndex = -1; }
        if (endIndex === void 0) { endIndex = -1; }
    };
    /**
     * Returns true if an embedded font is available with the specified
     * <code>fontName</code> and <code>fontStyle</code> where
     * <code>Font.fontType</code> is <code>flash.text.FontType.EMBEDDED</code>.
     * Starting with Flash Player 10, two kinds of embedded fonts can appear in a
     * SWF file. Normal embedded fonts are only used with TextFieldMultiRender objects. CFF
     * embedded fonts are only used with the flash.text.engine classes. The two
     * types are distinguished by the <code>fontType</code> property of the
     * <code>Font</code> class, as returned by the <code>enumerateFonts()</code>
     * function.
     *
     * <p>TextFieldMultiRender cannot use a font of type <code>EMBEDDED_CFF</code>. If
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
    TextFieldMultiRender.isFontCompatible = function (fontName, fontStyle) {
        return false;
    };
    TextFieldMultiRender.prototype.clone = function () {
        var newInstance = (TextFieldMultiRender._textFields.length) ? TextFieldMultiRender._textFields.pop() : new TextFieldMultiRender();
        this.copyTo(newInstance);
        return newInstance;
    };
    TextFieldMultiRender.prototype.copyTo = function (newInstance) {
        _super.prototype.copyTo.call(this, newInstance);
        newInstance.textWidth = this._textWidth;
        newInstance.textHeight = this._textHeight;
        newInstance.textFormat = this._textFormat;
        //newInstance.textColor = this._textColor;
        newInstance.text = this._text;
    };
    TextFieldMultiRender._textFields = new Array();
    TextFieldMultiRender.assetType = "[asset TextFieldMultiRender]";
    return TextFieldMultiRender;
}(Sprite_1.Sprite));
exports.TextFieldMultiRender = TextFieldMultiRender;
