"use strict";
var GraphicsFillStyle = (function () {
    function GraphicsFillStyle(color, alpha) {
        if (color === void 0) { color = 0xffffff; }
        if (alpha === void 0) { alpha = 1; }
        this._color = color;
        this._alpha = alpha;
    }
    Object.defineProperty(GraphicsFillStyle.prototype, "data_type", {
        get: function () {
            return GraphicsFillStyle.data_type;
        },
        enumerable: true,
        configurable: true
    });
    GraphicsFillStyle.data_type = "[graphicsdata FillStyle]";
    return GraphicsFillStyle;
}());
exports.GraphicsFillStyle = GraphicsFillStyle;
