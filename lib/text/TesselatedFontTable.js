"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AssetBase_1 = require("@awayjs/core/lib/library/AssetBase");
var TesselatedFontChar_1 = require("../text/TesselatedFontChar");
var GraphicsPath_1 = require("../draw/GraphicsPath");
var GraphicsFactoryStrokes_1 = require("../draw/GraphicsFactoryStrokes");
var JointStyle_1 = require("../draw/JointStyle");
var CapsStyle_1 = require("../draw/CapsStyle");
var DrawMode_1 = require("../draw/DrawMode");
var GraphicsStrokeStyle_1 = require("../draw/GraphicsStrokeStyle");
var AttributesView_1 = require("@awayjs/core/lib/attributes/AttributesView");
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
        _super.call(this);
        this._font_chars = [];
        this._font_chars_dic = new Object();
        this._current_size = 0;
        this._size_multiply = 0;
        this._ascent = 0;
        this._descent = 0;
        if (opentype_font) {
            this._opentype_font = opentype_font;
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
            this._font_em_size = 72;
            this._current_size = 0;
            this._size_multiply = 0;
            return;
        }
    }
    TesselatedFontTable.prototype.changeOpenTypeFont = function (newOpenTypeFont, tesselateAllOld) {
        if (tesselateAllOld === void 0) { tesselateAllOld = true; }
        if ((tesselateAllOld) && (this._opentype_font)) {
        }
        // todo: when updating a font we must take care that they are compatible in terms of em_size
        this._opentype_font = newOpenTypeFont;
    };
    TesselatedFontTable.prototype.initFontSize = function (font_size) {
        if (this._current_size == font_size)
            return;
        this._current_size = font_size;
        this._size_multiply = font_size / this._font_em_size;
    };
    TesselatedFontTable.prototype.getCharVertCnt = function (char_code) {
        var tesselated_font_char = this._font_chars_dic[char_code];
        if (tesselated_font_char) {
            return tesselated_font_char.fill_data.length;
        }
        return 0;
    };
    TesselatedFontTable.prototype.getCharWidth = function (char_code) {
        var tesselated_font_char = this._font_chars_dic[char_code];
        if (tesselated_font_char) {
            return tesselated_font_char.char_width * this._size_multiply;
        }
        return 0;
    };
    TesselatedFontTable.prototype.getLineHeight = function () {
        return 0;
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
                        var awayPath = new GraphicsPath_1.GraphicsPath();
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
                        awayPath.style = new GraphicsStrokeStyle_1.GraphicsStrokeStyle(0xff0000, 1, 1, JointStyle_1.JointStyle.MITER, CapsStyle_1.CapsStyle.NONE, 100);
                        var final_vert_list = [];
                        GraphicsFactoryStrokes_1.GraphicsFactoryStrokes.draw_pathes([awayPath], final_vert_list);
                        var attributesView = new AttributesView_1.AttributesView(Float32Array, 3);
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
    TesselatedFontTable.prototype.setChar = function (name, char_width, fills_data, stroke_data) {
        if (fills_data === void 0) { fills_data = null; }
        if (stroke_data === void 0) { stroke_data = null; }
        if ((fills_data == null) && (stroke_data == null))
            throw ("TesselatedFontTable: trying to create a TesselatedFontChar with no data (fills_data and stroke_data is null)");
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
                if ((drawMode == DrawMode_1.DrawMode.BOTH) || (drawMode == DrawMode_1.DrawMode.STROKE)) {
                    if (output_verts[i * 2] == null) {
                        throw ("Trying to render strokes for a textrun, but no output_vert list was set for this textrun strokes");
                    }
                }
                if ((drawMode == DrawMode_1.DrawMode.BOTH) || (drawMode == DrawMode_1.DrawMode.FILL)) {
                    if (output_verts[i * 2 + 1] == null) {
                        throw ("Trying to render fills for a textrun, but no output_vert list was set for this textrun fills");
                    }
                }
            }
        }
    };
    TesselatedFontTable.assetType = "[asset TesselatedFontTable]";
    return TesselatedFontTable;
}(AssetBase_1.AssetBase));
exports.TesselatedFontTable = TesselatedFontTable;
