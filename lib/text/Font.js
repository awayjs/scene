"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AssetBase_1 = require("@awayjs/core/lib/library/AssetBase");
var TesselatedFontTable_1 = require("../text/TesselatedFontTable");
var BitmapFontTable_1 = require("../text/BitmapFontTable");
/**
 * Font is a container for FontTables.
 *
 *
 *
 */
var Font = (function (_super) {
    __extends(Font, _super);
    //TODO test shader picking
    //		public get shaderPickingDetails():boolean
    //		{
    //
    //			return this.sourceEntity.shaderPickingDetails;
    //		}
    /**
     * Creates a new TesselatedFont object
     */
    function Font() {
        _super.call(this);
        this._font_styles = [];
    }
    Object.defineProperty(Font.prototype, "font_styles", {
        get: function () {
            return this._font_styles;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Font.prototype, "assetType", {
        /**
         *
         */
        get: function () {
            return Font.assetType;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     */
    Font.prototype.dispose = function () {
    };
    /**
     *Get a font-table for a specific name, or create one if it does not exists.
     */
    Font.prototype.get_font_table = function (style_name, assetType, openTypeFont) {
        if (assetType === void 0) { assetType = TesselatedFontTable_1.TesselatedFontTable.assetType; }
        if (openTypeFont === void 0) { openTypeFont = null; }
        var len = this._font_styles.length;
        for (var i = 0; i < len; ++i) {
            if ((this._font_styles[i].assetType == assetType) && (this._font_styles[i].name == style_name)) {
                // mak
                return this._font_styles[i];
            }
        }
        var font_style = null;
        if (assetType == TesselatedFontTable_1.TesselatedFontTable.assetType) {
            font_style = new TesselatedFontTable_1.TesselatedFontTable(openTypeFont);
        }
        else if (assetType == BitmapFontTable_1.BitmapFontTable.assetType) {
            font_style = new BitmapFontTable_1.BitmapFontTable();
        }
        font_style.name = style_name;
        this._font_styles.push(font_style);
        return font_style;
    };
    Font.assetType = "[asset Font]";
    return Font;
}(AssetBase_1.AssetBase));
exports.Font = Font;
