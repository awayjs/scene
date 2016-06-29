"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AssetBase_1 = require("@awayjs/core/lib/library/AssetBase");
var BitmapFontChar_1 = require("../text/BitmapFontChar");
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
        _super.call(this);
        this._font_chars = [];
        this._bitmap_pages = [];
        this._font_chars_dic = new Object();
        this._ascent = 0;
        this._descent = 0;
        this._current_size = 0;
        this._size_multiply = 0;
        this._init_size = 0;
    }
    Object.defineProperty(BitmapFontTable.prototype, "assetType", {
        get: function () {
            return BitmapFontTable.assetType;
        },
        enumerable: true,
        configurable: true
    });
    BitmapFontTable.prototype.initFontSize = function (font_size) {
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
            //console.log("this_char found");
            return [this_char.x / 256, this_char.y / 256, this_char.width / 256, this_char.height / 256, this_char.x_offset * this._size_multiply, this_char.y_offset * this._size_multiply];
        }
        //console.log("this_char not found" + char_code);
        return [];
    };
    BitmapFontTable.prototype.getCharVertCnt = function (char_code) {
        return 6 * 4;
    };
    BitmapFontTable.prototype.getCharWidth = function (char_code) {
        var this_char = this._font_chars_dic[char_code];
        if (this_char)
            return this._size_multiply * this_char.x_advance;
        return 0;
    };
    BitmapFontTable.prototype.getLineHeight = function () {
        return this._current_size;
    };
    /**
     *
     */
    BitmapFontTable.prototype.dispose = function () {
    };
    BitmapFontTable.prototype.add_page = function (image) {
        this._bitmap_pages.push(image);
    };
    BitmapFontTable.prototype.get_page = function (idx) {
        if (idx === void 0) { idx = 0; }
        return this._bitmap_pages[idx];
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
    BitmapFontTable.assetType = "[asset BitmapFontTable]";
    return BitmapFontTable;
}(AssetBase_1.AssetBase));
exports.BitmapFontTable = BitmapFontTable;
