"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core_1 = require("@awayjs/core");
var graphics_1 = require("@awayjs/graphics");
var TesselatedFontChar_1 = require("./TesselatedFontChar");
/**
 * GraphicBase wraps a TriangleElements as a scene graph instantiation. A GraphicBase is owned by a Sprite object.
 *
 *
 * @see away.base.TriangleElements
 * @see away.entities.Sprite
 *
 * @class away.base.GraphicBase
 */
var TesselatedFontTable = (function (_super) {
    __extends(TesselatedFontTable, _super);
    //TODO test shader picking
    //		public get shaderPickingDetails():boolean
    //		{
    //
    //			return this.sourceEntity.shaderPickingDetails;
    //		}
    /**
     * Creates a new TesselatedFont object
     * If a opentype_font object is passed, the chars will get tessellated whenever requested.
     * If no opentype font object is passed, it is expected that tesselated chars
     */
    function TesselatedFontTable(opentype_font) {
        if (opentype_font === void 0) { opentype_font = null; }
        var _this = _super.call(this) || this;
        _this._font_chars = [];
        _this._font_chars_dic = new Object();
        _this._current_size = 0;
        _this._size_multiply = 0;
        _this._ascent = 0;
        _this._descent = 0;
        _this._usesCurves = false;
        if (opentype_font) {
            _this._opentype_font = opentype_font;
            /*
             console.log("head.yMax "+head.yMax);
             console.log("head.yMin "+head.yMin);
             console.log("font.numGlyphs "+font.numGlyphs);
             console.log('Ascender', font.tables.hhea.ascender);
             console.log('Descender', font.tables.hhea.descender);
             console.log('Typo Ascender', font.tables.os2.sTypoAscender);
             console.log('Typo Descender', font.tables.os2.sTypoDescender);
             */
            //this._ascent=this._opentype_font.tables.hhea.ascender;
            //this._descent=this._opentype_font.tables.hhea.descender;
            _this._font_em_size = 72;
            _this._current_size = 0;
            _this._size_multiply = 0;
            return _this;
        }
        return _this;
    }
    TesselatedFontTable.prototype.hasChar = function (char_code) {
        return this._font_chars_dic[char_code] != null;
    };
    TesselatedFontTable.prototype.changeOpenTypeFont = function (newOpenTypeFont, tesselateAllOld) {
        if (tesselateAllOld === void 0) { tesselateAllOld = true; }
        if ((tesselateAllOld) && (this._opentype_font)) {
        }
        // todo: when updating a font we must take care that they are compatible in terms of em_size
        this._opentype_font = newOpenTypeFont;
    };
    TesselatedFontTable.prototype.initFontSize = function (font_size) {
        if (this.fallbackTable)
            this.fallbackTable.initFontSize(font_size);
        if (this._current_size == font_size)
            return;
        this._current_size = font_size;
        this._size_multiply = font_size / this._font_em_size;
        //console.log("text-font-table: ",this._ascent, this._descent, this._font_em_size)
    };
    TesselatedFontTable.prototype.getCharVertCnt = function (char_code) {
        var tesselated_font_char = this._font_chars_dic[char_code];
        if (tesselated_font_char) {
            return tesselated_font_char.fill_data.length;
        }
        return 0;
    };
    TesselatedFontTable.prototype.getCharWidth = function (char_code) {
        if (char_code == "32") {
            return this._whitespace_width * this._size_multiply;
        }
        var tesselated_font_char = this._font_chars_dic[char_code];
        if (tesselated_font_char) {
            return tesselated_font_char.char_width * this._size_multiply;
        }
        if (this.fallbackTable)
            return this.fallbackTable.getCharWidth(char_code);
        return 0;
    };
    Object.defineProperty(TesselatedFontTable.prototype, "usesCurves", {
        get: function () {
            return this._usesCurves;
        },
        enumerable: true,
        configurable: true
    });
    TesselatedFontTable.prototype.getLineHeight = function () {
        var thisLineheighttest = this._current_size * (this._font_em_size / this._ascent);
        if (this.name == "BoldStyle") {
            thisLineheighttest = this._current_size;
        }
        return thisLineheighttest; // sf
        //return (this._ascent+this._descent)*this._size_multiply;	// enable for icycle
    };
    Object.defineProperty(TesselatedFontTable.prototype, "assetType", {
        get: function () {
            return TesselatedFontTable.assetType;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     */
    TesselatedFontTable.prototype.dispose = function () {
    };
    Object.defineProperty(TesselatedFontTable.prototype, "ascent", {
        get: function () {
            return this._ascent;
        },
        set: function (value) {
            this._ascent = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TesselatedFontTable.prototype, "descent", {
        get: function () {
            return this._descent;
        },
        set: function (value) {
            this._descent = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TesselatedFontTable.prototype, "offset_x", {
        get: function () {
            return this._offset_x;
        },
        set: function (value) {
            this._offset_x = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TesselatedFontTable.prototype, "offset_y", {
        get: function () {
            return this._offset_y;
        },
        set: function (value) {
            this._offset_y = value;
        },
        enumerable: true,
        configurable: true
    });
    TesselatedFontTable.prototype.get_font_chars = function () {
        return this._font_chars;
    };
    TesselatedFontTable.prototype.get_font_em_size = function () {
        return this._font_em_size;
    };
    TesselatedFontTable.prototype.set_whitespace_width = function (value) {
        this._whitespace_width = value;
    };
    TesselatedFontTable.prototype.get_whitespace_width = function () {
        return this._whitespace_width;
    };
    TesselatedFontTable.prototype.set_font_em_size = function (font_em_size) {
        this._font_em_size = font_em_size;
    };
    TesselatedFontTable.prototype.fillTextRun = function (tf, format, startWord, wordCnt) {
        var textShape = tf.getTextShapeForIdentifierAndFormat(format.color.toString(), format);
        var charGlyph;
        var w = 0;
        var w_len = startWord + (wordCnt * 5);
        var char_vertices;
        var c = 0;
        var c_len = 0;
        var x = 0;
        var y = 0;
        var startIdx = 0;
        var buffer;
        var v;
        var size_multiply;
        var hack_x_mirror = false;
        // loop over all the words and create the text data for it
        // each word provides its own start-x and start-y values, so we can just ignore whitespace-here
        for (w = startWord; w < w_len; w += 5) {
            startIdx = tf.words[w];
            x = tf.words[w + 1];
            y = tf.words[w + 2] - 2; // -2 for swf adjusting
            if (this.name == "BoldStyle") {
                y -= 0.2 * this.getLineHeight();
            }
            else {
            }
            //todo: this is a temporary fix for sunflower `si` VoltMeter text vertical align
            if (format.font_name == "DJB Get Digital") {
                y -= 2;
            }
            //y=tf.words[w+2]+(this.ascent-this.get_font_em_size())*this._size_multiply; // enable for icycle
            c_len = startIdx + tf.words[w + 4];
            for (c = startIdx; c < c_len; c++) {
                hack_x_mirror = false;
                if (tf.chars_codes[c] == 40) {
                    tf.chars_codes[c] = 41;
                    hack_x_mirror = true;
                }
                if (tf.chars_codes[c] != 32) {
                    charGlyph = this.getChar(tf.chars_codes[c].toString());
                    size_multiply = this._size_multiply;
                    if (!charGlyph && this.fallbackTable) {
                        charGlyph = this.fallbackTable.getChar(tf.chars_codes[c].toString());
                        size_multiply = this.fallbackTable._size_multiply;
                    }
                    if (charGlyph) {
                        char_vertices = charGlyph.fill_data;
                        buffer = new Float32Array(char_vertices.buffer);
                        if (this.usesCurves) {
                            for (v = 0; v < char_vertices.count; v++) {
                                textShape.verts[textShape.verts.length] = buffer[v * 3] * size_multiply + x;
                                textShape.verts[textShape.verts.length] = buffer[v * 3 + 1] * size_multiply + y;
                                textShape.verts[textShape.verts.length] = buffer[v * 3 + 2];
                            }
                        }
                        else {
                            if (hack_x_mirror) {
                                for (v = 0; v < char_vertices.count; v++) {
                                    textShape.verts[textShape.verts.length] = (charGlyph.char_width - buffer[v * 2]) * size_multiply + x;
                                    textShape.verts[textShape.verts.length] = buffer[v * 2 + 1] * size_multiply + y;
                                }
                            }
                            else {
                                for (v = 0; v < char_vertices.count; v++) {
                                    textShape.verts[textShape.verts.length] = buffer[v * 2] * size_multiply + x;
                                    textShape.verts[textShape.verts.length] = buffer[v * 2 + 1] * size_multiply + y;
                                }
                            }
                        }
                        x += charGlyph.char_width * size_multiply;
                    }
                    else {
                        console.log("TesselatedFontTable: Error: char not found in fontTable");
                    }
                }
            }
        }
    };
    /**
     *
     */
    TesselatedFontTable.prototype.getChar = function (name) {
        if (this._font_chars_dic[name] == null) {
            if (this._opentype_font) {
                //console.log("get char for '"+String.fromCharCode(parseInt(name))+"'. char does not exists yet. try creating it from opentype.");
                var thisGlyph = this._opentype_font.charToGlyph(String.fromCharCode(parseInt(name)));
                if (thisGlyph) {
                    //console.log("got the glyph from opentype");
                    if (true) {
                        var thisPath = thisGlyph.getPath();
                        var awayPath = new graphics_1.GraphicsPath();
                        var i = 0;
                        var len = thisPath.commands.length;
                        //awayPath.lineTo(0, 0);
                        //awayPath.moveTo(0,0);//-100);
                        //awayPath.curveTo(100, 250, 200,0);
                        //awayPath.lineTo(150, 100);
                        //awayPath.moveTo(0,20);
                        //awayPath.curveTo(100, 270, 200,20);
                        //awayPath.moveTo(0,-20);
                        //awayPath.moveTo(0,-10);
                        //awayPath.curveTo(100, -110, 200,-10);
                        var startx = 0;
                        var starty = 0;
                        for (i = 0; i < len; i++) {
                            var cmd = thisPath.commands[i];
                            if (cmd.type === 'M') {
                                awayPath.moveTo(cmd.x, cmd.y);
                                startx = cmd.x;
                                starty = cmd.y;
                            }
                            else if (cmd.type === 'L') {
                                awayPath.lineTo(cmd.x, cmd.y);
                            }
                            else if (cmd.type === 'Q') {
                                awayPath.curveTo(cmd.x1, cmd.y1, cmd.x, cmd.y);
                            }
                            else if (cmd.type === 'C') {
                                awayPath.cubicCurveTo(cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y);
                            }
                            else if (cmd.type === 'Z') {
                                awayPath.lineTo(startx, starty);
                            }
                        }
                        awayPath.style = new graphics_1.GraphicsStrokeStyle(0xff0000, 1, 1, graphics_1.JointStyle.MITER, graphics_1.CapsStyle.NONE, 100);
                        var final_vert_list = [];
                        //todo
                        //GraphicsFactoryStrokes.draw_pathes([awayPath], final_vert_list, false);
                        var attributesView = new core_1.AttributesView(Float32Array, 3);
                        attributesView.set(final_vert_list);
                        var attributesBuffer = attributesView.attributesBuffer;
                        attributesView.dispose();
                        var tesselated_font_char = new TesselatedFontChar_1.TesselatedFontChar(attributesBuffer, null);
                        tesselated_font_char.char_width = (thisGlyph.advanceWidth * (1 / thisGlyph.path.unitsPerEm * 72));
                        //console.log("tesselated_font_char.char_width "+tesselated_font_char.char_width);
                        this._font_chars.push(tesselated_font_char);
                        this._font_chars_dic[name] = tesselated_font_char;
                    }
                }
            }
        }
        return this._font_chars_dic[name];
    };
    /**
     *
     */
    TesselatedFontTable.prototype.setChar = function (name, char_width, fills_data, stroke_data, uses_curves) {
        if (fills_data === void 0) { fills_data = null; }
        if (stroke_data === void 0) { stroke_data = null; }
        if (uses_curves === void 0) { uses_curves = false; }
        if ((fills_data == null) && (stroke_data == null))
            throw ("TesselatedFontTable: trying to create a TesselatedFontChar with no data (fills_data and stroke_data is null)");
        if (this._font_chars.length > 0) {
            if (uses_curves != this._usesCurves) {
                throw ("TesselatedFontTable: Can not set different types of graphic-glyphs (curves vs non-cuves) on the same FontTable!");
            }
        }
        else {
            this._usesCurves = uses_curves;
        }
        var tesselated_font_char = new TesselatedFontChar_1.TesselatedFontChar(fills_data, stroke_data);
        tesselated_font_char.char_width = char_width;
        this._font_chars.push(tesselated_font_char);
        this._font_chars_dic[name] = tesselated_font_char;
    };
    TesselatedFontTable.prototype.buildTextRuns = function (textRuns, output_verts) {
        if ((textRuns.length * 2) != (output_verts.length))
            throw ("Invalid data passed to TesselatedFontTable.buildTextRuns(). output_verts.length is not double textRuns.length.");
        var i = 0;
        var font_size = 0;
        var drawMode = 0;
        var charCode = 0;
        var xpos = 0;
        var ypos = 0;
        var runCnt = 0;
        var runLen = 0;
        var vertCnt = 0;
        var len = textRuns.length;
        var textrun;
        var thisChar;
        for (i = 0; i < len; i++) {
            textrun = textRuns[i];
            font_size = textrun[0];
            drawMode = textrun[1];
            ypos = textrun[2];
            runLen = textrun.length;
            for (runCnt = 3; runCnt < runLen; runCnt += 2) {
                charCode = textrun[runCnt];
                xpos = textrun[runCnt + 1];
                thisChar = this.getChar(charCode.toString());
                if ((drawMode == graphics_1.DrawMode.BOTH) || (drawMode == graphics_1.DrawMode.STROKE)) {
                    if (output_verts[i * 2] == null) {
                        throw ("Trying to render strokes for a textrun, but no output_vert list was set for this textrun strokes");
                    }
                }
                if ((drawMode == graphics_1.DrawMode.BOTH) || (drawMode == graphics_1.DrawMode.FILL)) {
                    if (output_verts[i * 2 + 1] == null) {
                        throw ("Trying to render fills for a textrun, but no output_vert list was set for this textrun fills");
                    }
                }
            }
        }
    };
    return TesselatedFontTable;
}(core_1.AssetBase));
TesselatedFontTable.assetType = "[asset TesselatedFontTable]";
exports.TesselatedFontTable = TesselatedFontTable;
