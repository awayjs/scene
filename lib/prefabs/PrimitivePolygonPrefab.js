"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PrimitiveCylinderPrefab_1 = require("../prefabs/PrimitiveCylinderPrefab");
/**
 * A UV RegularPolygon primitive sprite.
 */
var PrimitivePolygonPrefab = (function (_super) {
    __extends(PrimitivePolygonPrefab, _super);
    /**
     * Creates a new RegularPolygon disc object.
     * @param radius The radius of the regular polygon
     * @param sides Defines the number of sides of the regular polygon.
     * @param yUp Defines whether the regular polygon should lay on the Y-axis (true) or on the Z-axis (false).
     */
    function PrimitivePolygonPrefab(material, elementsType, radius, sides, yUp) {
        if (material === void 0) { material = null; }
        if (elementsType === void 0) { elementsType = "triangle"; }
        if (radius === void 0) { radius = 100; }
        if (sides === void 0) { sides = 16; }
        if (yUp === void 0) { yUp = true; }
        return _super.call(this, material, elementsType, radius, 0, 0, sides, 1, true, false, false, yUp) || this;
    }
    Object.defineProperty(PrimitivePolygonPrefab.prototype, "radius", {
        /**
         * The radius of the regular polygon.
         */
        get: function () {
            return this._pBottomRadius;
        },
        set: function (value) {
            this._pBottomRadius = value;
            this._pInvalidatePrimitive();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimitivePolygonPrefab.prototype, "sides", {
        /**
         * The number of sides of the regular polygon.
         */
        get: function () {
            return this._pSegmentsW;
        },
        set: function (value) {
            this.setSegmentsW(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimitivePolygonPrefab.prototype, "subdivisions", {
        /**
         * The number of subdivisions from the edge to the center of the regular polygon.
         */
        get: function () {
            return this._pSegmentsH;
        },
        set: function (value) {
            this.setSegmentsH(value);
        },
        enumerable: true,
        configurable: true
    });
    return PrimitivePolygonPrefab;
}(PrimitiveCylinderPrefab_1.PrimitiveCylinderPrefab));
exports.PrimitivePolygonPrefab = PrimitivePolygonPrefab;
