"use strict";
var JointStyle_1 = require("../draw/JointStyle");
var CapsStyle_1 = require("../draw/CapsStyle");
var GraphicsStrokeStyle = (function () {
    function GraphicsStrokeStyle(color, alpha, thickness, jointstyle, capstyle, miter_limit) {
        if (color === void 0) { color = 0xffffff; }
        if (alpha === void 0) { alpha = 1; }
        if (thickness === void 0) { thickness = 10; }
        if (jointstyle === void 0) { jointstyle = JointStyle_1.JointStyle.ROUND; }
        if (capstyle === void 0) { capstyle = CapsStyle_1.CapsStyle.SQUARE; }
        if (miter_limit === void 0) { miter_limit = 10; }
        this._color = color;
        this._alpha = alpha;
        this._thickness = thickness;
        this._jointstyle = jointstyle;
        this._capstyle = capstyle;
        this._miter_limit = miter_limit;
    }
    Object.defineProperty(GraphicsStrokeStyle.prototype, "data_type", {
        get: function () {
            return GraphicsStrokeStyle.data_type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphicsStrokeStyle.prototype, "color", {
        get: function () {
            return this._color;
        },
        set: function (value) {
            this._color = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphicsStrokeStyle.prototype, "alpha", {
        get: function () {
            return this._alpha;
        },
        set: function (value) {
            this._alpha = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphicsStrokeStyle.prototype, "half_thickness", {
        get: function () {
            return this._thickness / 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphicsStrokeStyle.prototype, "thickness", {
        get: function () {
            return this._thickness;
        },
        set: function (value) {
            this._thickness = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphicsStrokeStyle.prototype, "jointstyle", {
        get: function () {
            return this._jointstyle;
        },
        set: function (value) {
            this._jointstyle = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphicsStrokeStyle.prototype, "miter_limit", {
        get: function () {
            return this._miter_limit;
        },
        set: function (value) {
            this._miter_limit = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphicsStrokeStyle.prototype, "capstyle", {
        get: function () {
            return this._capstyle;
        },
        set: function (value) {
            this._capstyle = value;
        },
        enumerable: true,
        configurable: true
    });
    GraphicsStrokeStyle.data_type = "[graphicsdata StrokeStyle]";
    return GraphicsStrokeStyle;
}());
exports.GraphicsStrokeStyle = GraphicsStrokeStyle;
