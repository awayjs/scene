"use strict";
var Image2D_1 = require("@awayjs/core/lib/image/Image2D");
var ByteArray_1 = require("@awayjs/core/lib/utils/ByteArray");
var CastError_1 = require("../errors/CastError");
var Single2DTexture_1 = require("../textures/Single2DTexture");
/**
 * Helper class for casting assets to usable objects
 */
var Cast = (function () {
    function Cast() {
    }
    Cast.string = function (data) {
        if (typeof (data) == 'function')
            data = new data;
        if (typeof (data) == 'string')
            return data;
        return data;
    };
    Cast.byteArray = function (data) {
        if (typeof (data) == 'function')
            data = new data;
        if (data instanceof ByteArray_1.ByteArray)
            return data;
        return data;
    };
    //        public static xml(data:any):XML
    //        {
    //            if (typeof(data) == 'function')
    //                data = new data;
    //
    //            if (data is XML)
    //                return data;
    //
    //            return XML(data);
    //        }
    Cast.isHex = function (str) {
        var length = str.length;
        for (var i = 0; i < length; ++i) {
            if (this._hexChars.indexOf(str.charAt(i)) == -1)
                return false;
        }
        return true;
    };
    Cast.tryColor = function (data) {
        if (typeof (data) == 'number' /*uint*/)
            return Math.floor(data);
        if (typeof (data) == 'string') {
            if (data == "random")
                return Math.floor(Math.random() * 0x1000000);
            if (this._colorNames == null) {
                this._colorNames = new Object();
                this._colorNames["steelblue"] = 0x4682B4;
                this._colorNames["royalblue"] = 0x041690;
                this._colorNames["cornflowerblue"] = 0x6495ED;
                this._colorNames["lightsteelblue"] = 0xB0C4DE;
                this._colorNames["mediumslateblue"] = 0x7B68EE;
                this._colorNames["slateblue"] = 0x6A5ACD;
                this._colorNames["darkslateblue"] = 0x483D8B;
                this._colorNames["midnightblue"] = 0x191970;
                this._colorNames["navy"] = 0x000080;
                this._colorNames["darkblue"] = 0x00008B;
                this._colorNames["mediumblue"] = 0x0000CD;
                this._colorNames["blue"] = 0x0000FF;
                this._colorNames["dodgerblue"] = 0x1E90FF;
                this._colorNames["deepskyblue"] = 0x00BFFF;
                this._colorNames["lightskyblue"] = 0x87CEFA;
                this._colorNames["skyblue"] = 0x87CEEB;
                this._colorNames["lightblue"] = 0xADD8E6;
                this._colorNames["powderblue"] = 0xB0E0E6;
                this._colorNames["azure"] = 0xF0FFFF;
                this._colorNames["lightcyan"] = 0xE0FFFF;
                this._colorNames["paleturquoise"] = 0xAFEEEE;
                this._colorNames["mediumturquoise"] = 0x48D1CC;
                this._colorNames["lightseagreen"] = 0x20B2AA;
                this._colorNames["darkcyan"] = 0x008B8B;
                this._colorNames["teal"] = 0x008080;
                this._colorNames["cadetblue"] = 0x5F9EA0;
                this._colorNames["darkturquoise"] = 0x00CED1;
                this._colorNames["aqua"] = 0x00FFFF;
                this._colorNames["cyan"] = 0x00FFFF;
                this._colorNames["turquoise"] = 0x40E0D0;
                this._colorNames["aquamarine"] = 0x7FFFD4;
                this._colorNames["mediumaquamarine"] = 0x66CDAA;
                this._colorNames["darkseagreen"] = 0x8FBC8F;
                this._colorNames["mediumseagreen"] = 0x3CB371;
                this._colorNames["seagreen"] = 0x2E8B57;
                this._colorNames["darkgreen"] = 0x006400;
                this._colorNames["green"] = 0x008000;
                this._colorNames["forestgreen"] = 0x228B22;
                this._colorNames["limegreen"] = 0x32CD32;
                this._colorNames["lime"] = 0x00FF00;
                this._colorNames["chartreuse"] = 0x7FFF00;
                this._colorNames["lawngreen"] = 0x7CFC00;
                this._colorNames["greenyellow"] = 0xADFF2F;
                this._colorNames["yellowgreen"] = 0x9ACD32;
                this._colorNames["palegreen"] = 0x98FB98;
                this._colorNames["lightgreen"] = 0x90EE90;
                this._colorNames["springgreen"] = 0x00FF7F;
                this._colorNames["mediumspringgreen"] = 0x00FA9A;
                this._colorNames["darkolivegreen"] = 0x556B2F;
                this._colorNames["olivedrab"] = 0x6B8E23;
                this._colorNames["olive"] = 0x808000;
                this._colorNames["darkkhaki"] = 0xBDB76B;
                this._colorNames["darkgoldenrod"] = 0xB8860B;
                this._colorNames["goldenrod"] = 0xDAA520;
                this._colorNames["gold"] = 0xFFD700;
                this._colorNames["yellow"] = 0xFFFF00;
                this._colorNames["khaki"] = 0xF0E68C;
                this._colorNames["palegoldenrod"] = 0xEEE8AA;
                this._colorNames["blanchedalmond"] = 0xFFEBCD;
                this._colorNames["moccasin"] = 0xFFE4B5;
                this._colorNames["wheat"] = 0xF5DEB3;
                this._colorNames["navajowhite"] = 0xFFDEAD;
                this._colorNames["burlywood"] = 0xDEB887;
                this._colorNames["tan"] = 0xD2B48C;
                this._colorNames["rosybrown"] = 0xBC8F8F;
                this._colorNames["sienna"] = 0xA0522D;
                this._colorNames["saddlebrown"] = 0x8B4513;
                this._colorNames["chocolate"] = 0xD2691E;
                this._colorNames["peru"] = 0xCD853F;
                this._colorNames["sandybrown"] = 0xF4A460;
                this._colorNames["darkred"] = 0x8B0000;
                this._colorNames["maroon"] = 0x800000;
                this._colorNames["brown"] = 0xA52A2A;
                this._colorNames["firebrick"] = 0xB22222;
                this._colorNames["indianred"] = 0xCD5C5C;
                this._colorNames["lightcoral"] = 0xF08080;
                this._colorNames["salmon"] = 0xFA8072;
                this._colorNames["darksalmon"] = 0xE9967A;
                this._colorNames["lightsalmon"] = 0xFFA07A;
                this._colorNames["coral"] = 0xFF7F50;
                this._colorNames["tomato"] = 0xFF6347;
                this._colorNames["darkorange"] = 0xFF8C00;
                this._colorNames["orange"] = 0xFFA500;
                this._colorNames["orangered"] = 0xFF4500;
                this._colorNames["crimson"] = 0xDC143C;
                this._colorNames["red"] = 0xFF0000;
                this._colorNames["deeppink"] = 0xFF1493;
                this._colorNames["fuchsia"] = 0xFF00FF;
                this._colorNames["magenta"] = 0xFF00FF;
                this._colorNames["hotpink"] = 0xFF69B4;
                this._colorNames["lightpink"] = 0xFFB6C1;
                this._colorNames["pink"] = 0xFFC0CB;
                this._colorNames["palevioletred"] = 0xDB7093;
                this._colorNames["mediumvioletred"] = 0xC71585;
                this._colorNames["purple"] = 0x800080;
                this._colorNames["darkmagenta"] = 0x8B008B;
                this._colorNames["mediumpurple"] = 0x9370DB;
                this._colorNames["blueviolet"] = 0x8A2BE2;
                this._colorNames["indigo"] = 0x4B0082;
                this._colorNames["darkviolet"] = 0x9400D3;
                this._colorNames["darkorchid"] = 0x9932CC;
                this._colorNames["mediumorchid"] = 0xBA55D3;
                this._colorNames["orchid"] = 0xDA70D6;
                this._colorNames["violet"] = 0xEE82EE;
                this._colorNames["plum"] = 0xDDA0DD;
                this._colorNames["thistle"] = 0xD8BFD8;
                this._colorNames["lavender"] = 0xE6E6FA;
                this._colorNames["ghostwhite"] = 0xF8F8FF;
                this._colorNames["aliceblue"] = 0xF0F8FF;
                this._colorNames["mintcream"] = 0xF5FFFA;
                this._colorNames["honeydew"] = 0xF0FFF0;
                this._colorNames["lightgoldenrodyellow"] = 0xFAFAD2;
                this._colorNames["lemonchiffon"] = 0xFFFACD;
                this._colorNames["cornsilk"] = 0xFFF8DC;
                this._colorNames["lightyellow"] = 0xFFFFE0;
                this._colorNames["ivory"] = 0xFFFFF0;
                this._colorNames["floralwhite"] = 0xFFFAF0;
                this._colorNames["linen"] = 0xFAF0E6;
                this._colorNames["oldlace"] = 0xFDF5E6;
                this._colorNames["antiquewhite"] = 0xFAEBD7;
                this._colorNames["bisque"] = 0xFFE4C4;
                this._colorNames["peachpuff"] = 0xFFDAB9;
                this._colorNames["papayawhip"] = 0xFFEFD5;
                this._colorNames["beige"] = 0xF5F5DC;
                this._colorNames["seashell"] = 0xFFF5EE;
                this._colorNames["lavenderblush"] = 0xFFF0F5;
                this._colorNames["mistyrose"] = 0xFFE4E1;
                this._colorNames["snow"] = 0xFFFAFA;
                this._colorNames["white"] = 0xFFFFFF;
                this._colorNames["whitesmoke"] = 0xF5F5F5;
                this._colorNames["gainsboro"] = 0xDCDCDC;
                this._colorNames["lightgrey"] = 0xD3D3D3;
                this._colorNames["silver"] = 0xC0C0C0;
                this._colorNames["darkgrey"] = 0xA9A9A9;
                this._colorNames["grey"] = 0x808080;
                this._colorNames["lightslategrey"] = 0x778899;
                this._colorNames["slategrey"] = 0x708090;
                this._colorNames["dimgrey"] = 0x696969;
                this._colorNames["darkslategrey"] = 0x2F4F4F;
                this._colorNames["black"] = 0x000000;
                this._colorNames["transparent"] = 0xFF000000;
            }
            if (this._colorNames[data] != null)
                return this._colorNames[data];
            if ((data.length == 6) && this.isHex(data))
                return parseInt("0x" + data);
        }
        return null;
    };
    Cast.color = function (data) {
        var result = this.tryColor(data);
        if (result == null)
            throw new CastError_1.CastError("Can't cast to color: " + data);
        return result;
    };
    Cast.tryClass = function (name) {
        if (this._notClasses[name])
            return name;
        var result = this._classes[name];
        if (result != null)
            return result;
        try {
            result = window[name];
            this._classes[name] = result;
            return result;
        }
        catch (e /*ReferenceError*/) {
        }
        this._notClasses[name] = true;
        return name;
    };
    Cast.image2D = function (data) {
        if (data == null)
            return null;
        if (typeof (data) == 'string')
            data = this.tryClass(data);
        if (typeof (data) == 'function') {
            try {
                data = new data();
            }
            catch (e /*ArgumentError*/) {
                data = new data(0, 0);
            }
        }
        if (data instanceof Image2D_1.Image2D)
            return data;
        if (data instanceof Single2DTexture_1.Single2DTexture)
            data = data.image2D;
        throw new CastError_1.CastError("Can't cast to BitmapImage2D: " + data);
    };
    Cast.bitmapTexture = function (data) {
        if (data == null)
            return null;
        if (typeof (data) == 'string')
            data = this.tryClass(data);
        if (typeof (data) == 'function') {
            try {
                data = new data();
            }
            catch (e /*ArgumentError*/) {
                data = new data(0, 0);
            }
        }
        if (data instanceof Single2DTexture_1.Single2DTexture)
            return data;
        try {
            var bmd = Cast.image2D(data);
            return new Single2DTexture_1.Single2DTexture(bmd);
        }
        catch (e /*CastError*/) {
        }
        throw new CastError_1.CastError("Can't cast to Single2DTexture: " + data);
    };
    Cast._hexChars = "0123456789abcdefABCDEF";
    Cast._notClasses = new Object();
    Cast._classes = new Object();
    return Cast;
}());
exports.Cast = Cast;
