"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core_1 = require("@awayjs/core");
var BitmapFontChar_1 = require("./BitmapFontChar");
/**
 * GraphicBase wraps a TriangleElements as a scene graph instantiation. A GraphicBase is owned by a Sprite object.
 *
 *
 * @see away.base.TriangleElements
 * @see away.entities.Sprite
 *
 * @class away.base.GraphicBase
 */
var BitmapFontTable = (function (_super) {
    __extends(BitmapFontTable, _super);
    //TODO test shader picking
    //		public get shaderPickingDetails():boolean
    //		{
    //
    //			return this.sourceEntity.shaderPickingDetails;
    //		}
    /**
     * Creates a new TesselatedFont object
     */
    function BitmapFontTable() {
        var _this = _super.call(this) || this;
        _this._font_chars = [];
        _this._materials = [];
        _this._font_chars_dic = new Object();
        _this._ascent = 0;
        _this._descent = 0;
        _this._current_size = 0;
        _this._size_multiply = 0;
        _this._init_size = 0;
        _this._texture_width = 0;
        _this._texture_height = 0;
        _this._adjust_size = 0;
        return _this;
    }
    Object.defineProperty(BitmapFontTable.prototype, "assetType", {
        get: function () {
            return BitmapFontTable.assetType;
        },
        enumerable: true,
        configurable: true
    });
    BitmapFontTable.prototype.initFontSize = function (font_size) {
        if (this.fallbackTable)
            this.fallbackTable.initFontSize(font_size);
        if (this._adjust_size)
            font_size *= this._adjust_size;
        if (this._current_size == font_size)
            return;
        this._current_size = font_size;
        this._size_multiply = font_size / this._init_size;
    };
    BitmapFontTable.prototype.getCharDataCanvas = function (char_code) {
        var this_char = this._font_chars_dic[char_code];
        if (this_char) {
            //console.log("this_char found");
            return [this_char.x, this_char.y, this_char.width, this_char.height, this_char.x_offset * this._size_multiply, this_char.y_offset * this._size_multiply];
        }
        //console.log("this_char not found" + char_code);
        return [];
    };
    BitmapFontTable.prototype.getCharData = function (char_code) {
        var this_char = this._font_chars_dic[char_code];
        if (this_char) {
            var realheight = (this_char.height / this._init_size) * this._current_size;
            var realWidth = (this_char.width / this._init_size) * this._current_size;
            //console.log("this_char found");
            return [this_char.x / this._texture_width, this_char.y / this._texture_height, this_char.width / this._texture_width, this_char.height / this._texture_height, this_char.x_offset * this._size_multiply, this_char.y_offset * this._size_multiply, realheight, realWidth];
        }
        //console.log("this_char not found" + char_code);
        return [];
    };
    BitmapFontTable.prototype.getCharVertCnt = function (char_code) {
        return 6 * 4;
    };
    Object.defineProperty(BitmapFontTable.prototype, "texture_width", {
        get: function () {
            return this._texture_width;
        },
        set: function (value) {
            this._texture_width = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BitmapFontTable.prototype, "texture_height", {
        get: function () {
            return this._texture_height;
        },
        set: function (value) {
            this._texture_height = value;
        },
        enumerable: true,
        configurable: true
    });
    BitmapFontTable.prototype.hasChar = function (char_code) {
        return this._font_chars_dic[char_code] != null;
    };
    BitmapFontTable.prototype.getCharWidth = function (char_code) {
        var this_char = this._font_chars_dic[char_code];
        if (this_char)
            return this._size_multiply * (this_char.x_advance);
        return 0;
    };
    BitmapFontTable.prototype.fillTextRun = function (tf, format, startWord, wordCnt) {
    };
    BitmapFontTable.prototype.getLineHeight = function () {
        return this._current_size;
    };
    /**
     *
     */
    BitmapFontTable.prototype.dispose = function () {
        var len = this._materials.length;
        for (var i = 0; i < len; ++i) {
            this._materials[i].dispose();
        }
        this._materials.length = 0;
        this._font_chars.length = 0;
        this._font_chars_dic = null;
    };
    BitmapFontTable.prototype.addMaterial = function (material) {
        this._materials.push(material);
    };
    BitmapFontTable.prototype.getMaterial = function (idx) {
        if (idx === void 0) { idx = 0; }
        return this._materials[idx];
    };
    Object.defineProperty(BitmapFontTable.prototype, "ascent", {
        get: function () {
            return this._ascent;
        },
        set: function (value) {
            this._ascent = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BitmapFontTable.prototype, "descent", {
        get: function () {
            return this._descent;
        },
        set: function (value) {
            this._descent = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BitmapFontTable.prototype, "offset_x", {
        get: function () {
            return this._offset_x;
        },
        set: function (value) {
            this._offset_x = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BitmapFontTable.prototype, "offset_y", {
        get: function () {
            return this._offset_y;
        },
        set: function (value) {
            this._offset_y = value;
        },
        enumerable: true,
        configurable: true
    });
    BitmapFontTable.prototype.get_font_chars = function () {
        return this._font_chars;
    };
    BitmapFontTable.prototype.get_font_em_size = function () {
        return this._font_em_size;
    };
    BitmapFontTable.prototype.set_whitespace_width = function (value) {
        this._whitespace_width = value;
    };
    BitmapFontTable.prototype.get_whitespace_width = function () {
        return this._whitespace_width;
    };
    BitmapFontTable.prototype.set_font_em_size = function (font_em_size) {
        this._font_em_size = font_em_size;
    };
    /**
     *
     */
    BitmapFontTable.prototype.getChar = function (name) {
        return this._font_chars_dic[name];
    };
    /**
     *
     */
    BitmapFontTable.prototype.setChar = function (id, x, y, width, height, xoff, yoff, xadv, page, channel) {
        var bitmap_font_char = new BitmapFontChar_1.BitmapFontChar(id, x, y, width, height, xoff, yoff, xadv, page, channel);
        this._font_chars.push(bitmap_font_char);
        this._font_chars_dic[id] = bitmap_font_char;
    };
    return BitmapFontTable;
}(core_1.AssetBase));
BitmapFontTable.assetType = "[asset BitmapFontTable]";
exports.BitmapFontTable = BitmapFontTable;
