"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PrimitiveCylinderPrefab_1 = require("../prefabs/PrimitiveCylinderPrefab");
/**
 * A UV Cone primitive sprite.
 */
var PrimitiveConePrefab = (function (_super) {
    __extends(PrimitiveConePrefab, _super);
    /**
     * Creates a new Cone object.
     * @param radius The radius of the bottom end of the cone
     * @param height The height of the cone
     * @param segmentsW Defines the number of horizontal segments that make up the cone. Defaults to 16.
     * @param segmentsH Defines the number of vertical segments that make up the cone. Defaults to 1.
     * @param yUp Defines whether the cone poles should lay on the Y-axis (true) or on the Z-axis (false).
     */
    function PrimitiveConePrefab(material, elementsType, radius, height, segmentsW, segmentsH, closed, yUp) {
        if (material === void 0) { material = null; }
        if (elementsType === void 0) { elementsType = "triangle"; }
        if (radius === void 0) { radius = 50; }
        if (height === void 0) { height = 100; }
        if (segmentsW === void 0) { segmentsW = 16; }
        if (segmentsH === void 0) { segmentsH = 1; }
        if (closed === void 0) { closed = true; }
        if (yUp === void 0) { yUp = true; }
        return _super.call(this, material, elementsType, 0, radius, height, segmentsW, segmentsH, false, closed, true, yUp) || this;
    }
    Object.defineProperty(PrimitiveConePrefab.prototype, "radius", {
        /**
         * The radius of the bottom end of the cone.
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
    return PrimitiveConePrefab;
}(PrimitiveCylinderPrefab_1.PrimitiveCylinderPrefab));
exports.PrimitiveConePrefab = PrimitiveConePrefab;
