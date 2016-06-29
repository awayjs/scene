"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AttributesView_1 = require("@awayjs/core/lib/attributes/AttributesView");
var Byte4Attributes_1 = require("@awayjs/core/lib/attributes/Byte4Attributes");
var Float1Attributes_1 = require("@awayjs/core/lib/attributes/Float1Attributes");
var ElementsBase_1 = require("../graphics/ElementsBase");
var ElementsUtils_1 = require("../utils/ElementsUtils");
/**
 * @class LineElements
 */
var LineElements = (function (_super) {
    __extends(LineElements, _super);
    /**
     *
     */
    function LineElements(concatenatedBuffer) {
        if (concatenatedBuffer === void 0) { concatenatedBuffer = null; }
        _super.call(this, concatenatedBuffer);
        this._positions = new AttributesView_1.AttributesView(Float32Array, 6, concatenatedBuffer);
    }
    Object.defineProperty(LineElements.prototype, "assetType", {
        /**
         *
         * @returns {string}
         */
        get: function () {
            return LineElements.assetType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineElements.prototype, "positions", {
        /**
         *
         */
        get: function () {
            return this._positions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineElements.prototype, "thickness", {
        /**
         *
         */
        get: function () {
            return this._thickness;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineElements.prototype, "colors", {
        /**
         *
         */
        get: function () {
            if (!this._colors)
                this.setColors(this._colors);
            return this._colors;
        },
        enumerable: true,
        configurable: true
    });
    LineElements.prototype.getBoxBounds = function (target) {
        if (target === void 0) { target = null; }
        //TODO bounding calculations for lines
        return target;
    };
    LineElements.prototype.getSphereBounds = function (center, target) {
        if (target === void 0) { target = null; }
        //TODO bounding calculations for lines
        return target;
    };
    LineElements.prototype.setPositions = function (values, offset) {
        if (offset === void 0) { offset = 0; }
        if (values instanceof AttributesView_1.AttributesView) {
            this.clearVertices(this._positions);
            this._positions = values;
        }
        else if (values) {
            var i = 0;
            var j = 0;
            var index = 0;
            var positions = new Float32Array(values.length * 4);
            var indices = new Uint16Array(values.length);
            while (i < values.length) {
                if (index / 6 & 1) {
                    positions[index] = values[i + 3];
                    positions[index + 1] = values[i + 4];
                    positions[index + 2] = values[i + 5];
                    positions[index + 3] = values[i];
                    positions[index + 4] = values[i + 1];
                    positions[index + 5] = values[i + 2];
                }
                else {
                    positions[index] = values[i];
                    positions[index + 1] = values[i + 1];
                    positions[index + 2] = values[i + 2];
                    positions[index + 3] = values[i + 3];
                    positions[index + 4] = values[i + 4];
                    positions[index + 5] = values[i + 5];
                }
                index += 6;
                if (++j == 4) {
                    var o = index / 6 - 4;
                    indices.set([o, o + 1, o + 2, o + 3, o + 2, o + 1], i);
                    j = 0;
                    i += 6;
                }
            }
            this._positions.set(positions, offset * 4);
            this.setIndices(indices, offset);
        }
        else {
            this.clearVertices(this._positions);
            this._positions = new AttributesView_1.AttributesView(Float32Array, 6, this._concatenatedBuffer);
        }
        this._numVertices = this._positions.count;
        this.invalidateVertices(this._positions);
        this._verticesDirty[this._positions.id] = false;
    };
    LineElements.prototype.setThickness = function (values, offset) {
        if (offset === void 0) { offset = 0; }
        if (values instanceof Float1Attributes_1.Float1Attributes) {
            this._thickness = values;
        }
        else if (values) {
            if (!this._thickness)
                this._thickness = new Float1Attributes_1.Float1Attributes(this._concatenatedBuffer);
            var i = 0;
            var j = 0;
            var index = 0;
            var thickness = new Float32Array(values.length * 4);
            while (i < values.length) {
                thickness[index] = (Math.floor(0.5 * index + 0.5) & 1) ? -values[i] : values[i];
                if (++j == 4) {
                    j = 0;
                    i++;
                }
                index++;
            }
            this._thickness.set(thickness, offset * 4);
        }
        else if (this._thickness) {
            this._thickness.dispose();
            this._thickness = null;
        }
        this.invalidateVertices(this._thickness);
        this._verticesDirty[this._thickness.id] = false;
    };
    LineElements.prototype.setColors = function (values, offset) {
        if (offset === void 0) { offset = 0; }
        if (values) {
            if (values == this._colors)
                return;
            if (values instanceof Byte4Attributes_1.Byte4Attributes) {
                this.clearVertices(this._colors);
                this._colors = values;
            }
            else {
                if (!this._colors)
                    this._colors = new Byte4Attributes_1.Byte4Attributes(this._concatenatedBuffer);
                var i = 0;
                var j = 0;
                var index = 0;
                var colors = new Uint8Array(values.length * 4);
                while (i < values.length) {
                    if (index / 4 & 1) {
                        colors[index] = values[i + 4];
                        colors[index + 1] = values[i + 5];
                        colors[index + 2] = values[i + 6];
                        colors[index + 3] = values[i + 7];
                    }
                    else {
                        colors[index] = values[i];
                        colors[index + 1] = values[i + 1];
                        colors[index + 2] = values[i + 2];
                        colors[index + 3] = values[i + 3];
                    }
                    if (++j == 4) {
                        j = 0;
                        i += 8;
                    }
                    index += 4;
                }
                this._colors.set(colors, offset * 4);
            }
        }
        else {
            //auto-derive colors
            this._colors = ElementsUtils_1.ElementsUtils.generateColors(this.indices, this._colors, this._concatenatedBuffer, this._numVertices);
        }
        this.invalidateVertices(this._colors);
        this._verticesDirty[this._colors.id] = false;
    };
    /**
     *
     */
    LineElements.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._positions.dispose();
        this._positions = null;
        this._thickness.dispose();
        this._thickness = null;
        this._colors.dispose();
        this._colors = null;
    };
    /**
     * Clones the current object
     * @return An exact duplicate of the current object.
     */
    LineElements.prototype.clone = function () {
        var clone = new LineElements(this._concatenatedBuffer ? this._concatenatedBuffer.clone() : null);
        clone.setIndices(this.indices.clone());
        clone.setPositions(this._positions.clone());
        clone.setThickness(this._thickness.clone());
        clone.setColors(this._colors.clone());
        return clone;
    };
    LineElements.prototype._iTestCollision = function (pickingCollider, material, pickingCollision, count, offset) {
        if (count === void 0) { count = 0; }
        if (offset === void 0) { offset = 0; }
        return pickingCollider.testLineCollision(this, material, pickingCollision, count || this._numVertices, offset);
    };
    LineElements.assetType = "[asset LineElements]";
    return LineElements;
}(ElementsBase_1.ElementsBase));
exports.LineElements = LineElements;
