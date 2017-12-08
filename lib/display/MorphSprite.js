"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var graphics_1 = require("@awayjs/graphics");
var Sprite_1 = require("./Sprite");
var MorphSprite = (function (_super) {
    __extends(MorphSprite, _super);
    function MorphSprite() {
        return _super.apply(this, arguments) || this;
    }
    //todo: move to colorutils
    MorphSprite.interpolateColor = function (start, end, ratio) {
        var a = (start & 0xff000000) >>> 24;
        var r = (start & 0xff0000) >>> 16;
        var g = (start & 0xff00) >>> 8;
        var b = start & 0xff;
        var a2 = (end & 0xff000000) >>> 24;
        var r2 = (end & 0xff0000) >>> 16;
        var g2 = (end & 0xff00) >>> 8;
        var b2 = end & 0xff;
        var rs = 1 - ratio;
        var re = ratio;
        return (((a * rs + a2 * re) << 24) | ((r * rs + r2 * re) << 16) | ((g * rs + g2 * re) << 8) | (b * rs + b2 * re));
    };
    Object.defineProperty(MorphSprite.prototype, "assetType", {
        get: function () {
            return MorphSprite.assetType;
        },
        enumerable: true,
        configurable: true
    });
    MorphSprite.prototype.reset = function () {
        _super.prototype.reset.call(this);
        this.setRatio(0);
    };
    MorphSprite.prototype.setRatio = function (ratio) {
        if (!this.ratioCache)
            this.ratioCache = {};
        var lookupRatio = Math.round(ratio * 0xffffff).toString();
        if (this.ratioCache[lookupRatio]) {
            this.graphics.clear();
            this.graphics.copyFrom(this.ratioCache[lookupRatio]);
            return;
        }
        if (this.start.length != this.end.length) {
            throw ("Error in morph data - different number of pathes");
        }
        var len = this.start.length;
        var ratioStart = 1 - ratio;
        var ratioEnd = ratio;
        var newGraphics = new graphics_1.Graphics();
        var newPath;
        var startPath;
        var endPath;
        for (var i = 0; i < len; i++) {
            newPath = new graphics_1.GraphicsPath();
            startPath = this.start[i];
            endPath = this.end[i];
            if (startPath.style.data_type != endPath.style.data_type) {
                throw ("Error in morph data - different styles of pathes");
            }
            switch (startPath.style.data_type) {
                case graphics_1.GraphicsFillStyle.data_type:
                    var alpha = ratioStart * startPath.style.alpha + ratioEnd * endPath.style.alpha;
                    var color = MorphSprite.interpolateColor(startPath.style.color, endPath.style.color, ratio);
                    newPath.style = new graphics_1.GraphicsFillStyle(color, alpha);
                    break;
                case graphics_1.GradientFillStyle.data_type:
                    var newColors = [];
                    var newRatios = [];
                    var newAlphas = [];
                    var startStyle = startPath.style;
                    var endStyle = endPath.style;
                    var clen = startStyle.colors.length;
                    for (var c = 0; c < clen; c++) {
                        newColors[newColors.length] = MorphSprite.interpolateColor(startStyle.colors[c], endStyle.colors[c], ratio);
                        newAlphas[newAlphas.length] = ratioStart * startStyle.alphas[c] + ratioEnd * endStyle.alphas[c];
                        newRatios[newRatios.length] = ratioStart * startStyle.ratios[c] + ratioEnd * endStyle.ratios[c];
                    }
                    //todo: interpolate uvtransform
                    var transform = startStyle.matrix;
                    newPath.style = new graphics_1.GradientFillStyle(startStyle.type, newColors, newAlphas, newRatios, transform, startStyle.spreadMethod, startStyle.interpolationMethod, startStyle.focalPointRatio);
                    break;
                case graphics_1.BitmapFillStyle.data_type:
                    //newPath.style=new BitmapFillStyle();
                    break;
                case graphics_1.GraphicsStrokeStyle.data_type:
                    var startStrokeStyle = startPath.style;
                    var endSStroketyle = endPath.style;
                    var alpha = ratioStart * startStrokeStyle.alpha + ratioEnd * endSStroketyle.alpha;
                    var color = MorphSprite.interpolateColor(startStrokeStyle.color, endSStroketyle.color, ratio);
                    var thickness = ratioStart * startStrokeStyle.thickness + ratioEnd * endSStroketyle.thickness;
                    ;
                    newPath.style = new graphics_1.GraphicsStrokeStyle(color, alpha, thickness, startStrokeStyle.jointstyle, startStrokeStyle.capstyle, startStrokeStyle.miter_limit, startStrokeStyle.scaleMode);
                    break;
            }
            var startDataCnt = 0;
            var endDataCnt = 0;
            var startLastX = 0;
            var startLastY = 0;
            var endLastX = 0;
            var endLastY = 0;
            var len_contours = startPath._commands.length;
            startPath = this.start[0];
            endPath = this.end[0];
            if (endPath._commands.length != len_contours) {
                throw ("Error in morph data - different number of contour");
            }
            for (var c = 0; c < len_contours; c++) {
                var startCmds = startPath._commands[c];
                var startData = startPath._data[c];
                var endCmds = endPath._commands[c];
                var endData = endPath._data[c];
                var len_cmds = startCmds.length;
                if (endCmds.length != len_cmds) {
                    throw ("Error in morph data - different number of commands in contour");
                }
                //console.log("start", startData);
                //console.log("end", endData);
                for (var c2 = 0; c2 < len_cmds; c2++) {
                    switch (startCmds[c2]) {
                        case graphics_1.GraphicsPathCommand.MOVE_TO:
                            if (endCmds[c2] != graphics_1.GraphicsPathCommand.MOVE_TO) {
                                throw ("Error in morph data - both shapes must start with Move too command");
                            }
                            startLastX = startData[startDataCnt++];
                            startLastY = startData[startDataCnt++];
                            endLastX = endData[endDataCnt++];
                            endLastY = endData[endDataCnt++];
                            newPath.moveTo(ratioStart * startLastX + ratioEnd * endLastX, ratioStart * startLastY + ratioEnd * endLastY);
                            break;
                        case graphics_1.GraphicsPathCommand.LINE_TO:
                            if (endCmds[c2] == graphics_1.GraphicsPathCommand.LINE_TO) {
                                startLastX = startData[startDataCnt++];
                                startLastY = startData[startDataCnt++];
                                endLastX = endData[endDataCnt++];
                                endLastY = endData[endDataCnt++];
                                newPath.lineTo(ratioStart * startLastX + ratioEnd * endLastX, ratioStart * startLastY + ratioEnd * endLastY);
                            }
                            else if (endCmds[c2] == graphics_1.GraphicsPathCommand.CURVE_TO) {
                                var ctrX = startLastX + (startData[startDataCnt++] - startLastX) / 2;
                                var ctrY = startLastY + (startData[startDataCnt++] - startLastY) / 2;
                                newPath.curveTo(ratioStart * ctrX + ratioEnd * endData[endDataCnt++], ratioStart * ctrY + ratioEnd * endData[endDataCnt++], ratioStart * startData[startDataCnt - 2] + ratioEnd * endData[endDataCnt++], ratioStart * startData[startDataCnt - 1] + ratioEnd * endData[endDataCnt++]);
                                startLastX = startData[startDataCnt - 2];
                                startLastY = startData[startDataCnt - 1];
                                endLastX = endData[endDataCnt - 2];
                                endLastY = endData[endDataCnt - 1];
                            }
                            break;
                        case graphics_1.GraphicsPathCommand.CURVE_TO:
                            if (endCmds[c2] == graphics_1.GraphicsPathCommand.LINE_TO) {
                                var ctrX = endLastX + (endData[endDataCnt++] - endLastX) / 2;
                                var ctrY = endLastY + (endData[endDataCnt++] - endLastY) / 2;
                                newPath.curveTo(ratioStart * startData[startDataCnt++] + ratioEnd * ctrX, ratioStart * startData[startDataCnt++] + ratioEnd * ctrY, ratioStart * startData[startDataCnt++] + ratioEnd * endData[endDataCnt - 2], ratioStart * startData[startDataCnt++] + ratioEnd * endData[endDataCnt - 1]);
                                startLastX = startData[startDataCnt - 2];
                                startLastY = startData[startDataCnt - 1];
                                endLastX = endData[endDataCnt - 2];
                                endLastY = endData[endDataCnt - 1];
                            }
                            else if (endCmds[c2] == graphics_1.GraphicsPathCommand.CURVE_TO) {
                                newPath.curveTo(ratioStart * startData[startDataCnt++] + ratioEnd * endData[endDataCnt++], ratioStart * startData[startDataCnt++] + ratioEnd * endData[endDataCnt++], ratioStart * startData[startDataCnt++] + ratioEnd * endData[endDataCnt++], ratioStart * startData[startDataCnt++] + ratioEnd * endData[endDataCnt++]);
                                startLastX = startData[startDataCnt - 2];
                                startLastY = startData[startDataCnt - 1];
                                endLastX = endData[endDataCnt - 2];
                                endLastY = endData[endDataCnt - 1];
                            }
                            break;
                    }
                }
            }
            newGraphics.add_queued_path(newPath);
        }
        /*
        var newPath:GraphicsPath=new GraphicsPath();
        newPath.moveTo(50,50);
        newPath.lineTo(50,100);
        newPath.lineTo(100,100);
        newPath.lineTo(100,50);
        newPath.lineTo(50,50);
        newPath.style=this.end[0].style;
        newGraphics.add_queued_path(newPath);
        */
        newGraphics.endFill();
        this.graphics.clear();
        this.graphics.copyFrom(newGraphics);
        this.ratioCache[lookupRatio] = newGraphics;
    };
    MorphSprite.prototype.clone = function () {
        var newInstance = (MorphSprite._morphSprites.length) ? MorphSprite._morphSprites.pop() : new MorphSprite();
        this.copyTo(newInstance);
        return newInstance;
    };
    MorphSprite.prototype.copyTo = function (sprite, cloneShapes) {
        if (cloneShapes === void 0) { cloneShapes = false; }
        _super.prototype.copyTo.call(this, sprite, cloneShapes);
        sprite.start = this.start.splice(0);
        sprite.end = this.end.splice(0);
    };
    return MorphSprite;
}(Sprite_1.Sprite));
MorphSprite.assetType = "[asset MorphSprite]";
MorphSprite._morphSprites = new Array();
exports.MorphSprite = MorphSprite;
