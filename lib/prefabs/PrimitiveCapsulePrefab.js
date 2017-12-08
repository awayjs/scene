"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var graphics_1 = require("@awayjs/graphics");
var PrimitivePrefabBase_1 = require("../prefabs/PrimitivePrefabBase");
/**
 * A Capsule primitive sprite.
 */
var PrimitiveCapsulePrefab = (function (_super) {
    __extends(PrimitiveCapsulePrefab, _super);
    /**
     * Creates a new Capsule object.
     * @param radius The radius of the capsule.
     * @param height The height of the capsule.
     * @param segmentsW Defines the number of horizontal segments that make up the capsule. Defaults to 16.
     * @param segmentsH Defines the number of vertical segments that make up the capsule. Defaults to 15. Must be uneven value.
     * @param yUp Defines whether the capsule poles should lay on the Y-axis (true) or on the Z-axis (false).
     */
    function PrimitiveCapsulePrefab(material, elementsType, radius, height, segmentsW, segmentsH, yUp) {
        if (material === void 0) { material = null; }
        if (elementsType === void 0) { elementsType = "triangle"; }
        if (radius === void 0) { radius = 50; }
        if (height === void 0) { height = 100; }
        if (segmentsW === void 0) { segmentsW = 16; }
        if (segmentsH === void 0) { segmentsH = 15; }
        if (yUp === void 0) { yUp = true; }
        var _this = _super.call(this, material, elementsType) || this;
        _this._numVertices = 0;
        _this._radius = radius;
        _this._height = height;
        _this._segmentsW = segmentsW;
        _this._segmentsH = (segmentsH % 2 == 0) ? segmentsH + 1 : segmentsH;
        _this._yUp = yUp;
        return _this;
    }
    Object.defineProperty(PrimitiveCapsulePrefab.prototype, "radius", {
        /**
         * The radius of the capsule.
         */
        get: function () {
            return this._radius;
        },
        set: function (value) {
            this._radius = value;
            this._pInvalidatePrimitive();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimitiveCapsulePrefab.prototype, "height", {
        /**
         * The height of the capsule.
         */
        get: function () {
            return this._height;
        },
        set: function (value) {
            this._height = value;
            this._pInvalidatePrimitive();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimitiveCapsulePrefab.prototype, "segmentsW", {
        /**
         * Defines the number of horizontal segments that make up the capsule. Defaults to 16.
         */
        get: function () {
            return this._segmentsW;
        },
        set: function (value) {
            this._segmentsW = value;
            this._pInvalidatePrimitive();
            this._pInvalidateUVs();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimitiveCapsulePrefab.prototype, "segmentsH", {
        /**
         * Defines the number of vertical segments that make up the capsule. Defaults to 15. Must be uneven.
         */
        get: function () {
            return this._segmentsH;
        },
        set: function (value) {
            this._segmentsH = (value % 2 == 0) ? value + 1 : value;
            this._pInvalidatePrimitive();
            this._pInvalidateUVs();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimitiveCapsulePrefab.prototype, "yUp", {
        /**
         * Defines whether the capsule poles should lay on the Y-axis (true) or on the Z-axis (false).
         */
        get: function () {
            return this._yUp;
        },
        set: function (value) {
            this._yUp = value;
            this._pInvalidatePrimitive();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @inheritDoc
     */
    PrimitiveCapsulePrefab.prototype._pBuildGraphics = function (target, elementsType) {
        var indices;
        var positions;
        var normals;
        var tangents;
        var stride;
        var i;
        var j;
        var triIndex = 0;
        var index = 0;
        var startIndex;
        var comp1, comp2, t1, t2;
        var numIndices = 0;
        if (elementsType == graphics_1.ElementsType.TRIANGLE) {
            var triangleGraphics = target;
            // evaluate target number of vertices, triangles and indices
            this._numVertices = (this._segmentsH + 1) * (this._segmentsW + 1); // segmentsH + 1 because of closure, segmentsW + 1 because of closure
            numIndices = (this._segmentsH - 1) * this._segmentsW * 6; // each level has segmentH quads, each of 2 triangles
            // need to initialize raw arrays or can be reused?
            if (this._numVertices == triangleGraphics.numVertices) {
                triangleGraphics.invalidateIndices();
                triangleGraphics.invalidateVertices(triangleGraphics.positions);
                triangleGraphics.invalidateVertices(triangleGraphics.normals);
                triangleGraphics.invalidateVertices(triangleGraphics.tangents);
            }
            else {
                triangleGraphics.setIndices(new Uint16Array(numIndices));
                triangleGraphics.setPositions(new Float32Array(this._numVertices * 3));
                triangleGraphics.setNormals(new Float32Array(this._numVertices * 3));
                triangleGraphics.setTangents(new Float32Array(this._numVertices * 3));
                this._pInvalidateUVs();
            }
            indices = triangleGraphics.indices.get(triangleGraphics.numElements);
            positions = triangleGraphics.positions.get(this._numVertices);
            normals = triangleGraphics.normals.get(this._numVertices);
            tangents = triangleGraphics.tangents.get(this._numVertices);
            stride = triangleGraphics.concatenatedBuffer.stride / 4;
            for (j = 0; j <= this._segmentsH; ++j) {
                var horangle = Math.PI * j / this._segmentsH;
                var z = -this._radius * Math.cos(horangle);
                var ringradius = this._radius * Math.sin(horangle);
                startIndex = index;
                for (i = 0; i <= this._segmentsW; ++i) {
                    var verangle = 2 * Math.PI * i / this._segmentsW;
                    var x = ringradius * Math.cos(verangle);
                    var offset = j > this._segmentsH / 2 ? this._height / 2 : -this._height / 2;
                    var y = ringradius * Math.sin(verangle);
                    var normLen = 1 / Math.sqrt(x * x + y * y + z * z);
                    var tanLen = Math.sqrt(y * y + x * x);
                    if (this._yUp) {
                        t1 = 0;
                        t2 = tanLen > .007 ? x / tanLen : 0;
                        comp1 = -z;
                        comp2 = y;
                    }
                    else {
                        t1 = tanLen > .007 ? x / tanLen : 0;
                        t2 = 0;
                        comp1 = y;
                        comp2 = z;
                    }
                    if (i == this._segmentsW) {
                        positions[index] = positions[startIndex];
                        positions[index + 1] = positions[startIndex + 1];
                        positions[index + 2] = positions[startIndex + 2];
                        normals[index] = (normals[startIndex] + (x * normLen)) * .5;
                        normals[index + 1] = (normals[startIndex + 1] + (comp1 * normLen)) * .5;
                        normals[index + 2] = (normals[startIndex + 2] + (comp2 * normLen)) * .5;
                        tangents[index] = (tangents[startIndex] + (tanLen > .007 ? -y / tanLen : 1)) * .5;
                        tangents[index + 1] = (tangents[startIndex + 1] + t1) * .5;
                        tangents[index + 2] = (tangents[startIndex + 2] + t2) * .5;
                    }
                    else {
                        // vertex
                        positions[index] = x;
                        positions[index + 1] = (this._yUp) ? comp1 - offset : comp1;
                        positions[index + 2] = (this._yUp) ? comp2 : comp2 + offset;
                        // normal
                        normals[index] = x * normLen;
                        normals[index + 1] = comp1 * normLen;
                        normals[index + 2] = comp2 * normLen;
                        // tangent
                        tangents[index] = tanLen > .007 ? -y / tanLen : 1;
                        tangents[index + 1] = t1;
                        tangents[index + 2] = t2;
                    }
                    if (i > 0 && j > 0) {
                        var a = (this._segmentsW + 1) * j + i;
                        var b = (this._segmentsW + 1) * j + i - 1;
                        var c = (this._segmentsW + 1) * (j - 1) + i - 1;
                        var d = (this._segmentsW + 1) * (j - 1) + i;
                        if (j == this._segmentsH) {
                            positions[index] = positions[startIndex];
                            positions[index + 1] = positions[startIndex + 1];
                            positions[index + 2] = positions[startIndex + 2];
                            indices[triIndex++] = a;
                            indices[triIndex++] = c;
                            indices[triIndex++] = d;
                        }
                        else if (j == 1) {
                            indices[triIndex++] = a;
                            indices[triIndex++] = b;
                            indices[triIndex++] = c;
                        }
                        else {
                            indices[triIndex++] = a;
                            indices[triIndex++] = b;
                            indices[triIndex++] = c;
                            indices[triIndex++] = a;
                            indices[triIndex++] = c;
                            indices[triIndex++] = d;
                        }
                    }
                    index += stride;
                }
            }
        }
        else if (elementsType == graphics_1.ElementsType.LINE) {
        }
    };
    /**
     * @inheritDoc
     */
    PrimitiveCapsulePrefab.prototype._pBuildUVs = function (target, elementsType) {
        var i, j;
        var uvs;
        var stride;
        if (elementsType == graphics_1.ElementsType.TRIANGLE) {
            var triangleGraphics = target;
            // need to initialize raw array or can be reused?
            if (triangleGraphics.uvs && this._numVertices == triangleGraphics.numVertices) {
                triangleGraphics.invalidateVertices(triangleGraphics.uvs);
            }
            else {
                triangleGraphics.setUVs(new Float32Array(this._numVertices * 2));
            }
            uvs = triangleGraphics.uvs.get(this._numVertices);
            stride = triangleGraphics.uvs.stride;
            // current uv component index
            var index = 0;
            // surface
            for (j = 0; j <= this._segmentsH; ++j) {
                for (i = 0; i <= this._segmentsW; ++i) {
                    // revolution vertex
                    uvs[index] = (i / this._segmentsW) * this._scaleU;
                    uvs[index + 1] = (j / this._segmentsH) * this._scaleV;
                    index += stride;
                }
            }
        }
        else if (elementsType == graphics_1.ElementsType.LINE) {
        }
    };
    return PrimitiveCapsulePrefab;
}(PrimitivePrefabBase_1.PrimitivePrefabBase));
exports.PrimitiveCapsulePrefab = PrimitiveCapsulePrefab;
