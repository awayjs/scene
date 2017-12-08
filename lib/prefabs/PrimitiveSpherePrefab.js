"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var graphics_1 = require("@awayjs/graphics");
var PrimitivePrefabBase_1 = require("../prefabs/PrimitivePrefabBase");
/**
 * A UV Sphere primitive sprite.
 */
var PrimitiveSpherePrefab = (function (_super) {
    __extends(PrimitiveSpherePrefab, _super);
    /**
     * Creates a new Sphere object.
     *
     * @param radius The radius of the sphere.
     * @param segmentsW Defines the number of horizontal segments that make up the sphere.
     * @param segmentsH Defines the number of vertical segments that make up the sphere.
     * @param yUp Defines whether the sphere poles should lay on the Y-axis (true) or on the Z-axis (false).
     */
    function PrimitiveSpherePrefab(material, elementsType, radius, segmentsW, segmentsH, yUp) {
        if (material === void 0) { material = null; }
        if (elementsType === void 0) { elementsType = "triangle"; }
        if (radius === void 0) { radius = 50; }
        if (segmentsW === void 0) { segmentsW = 16; }
        if (segmentsH === void 0) { segmentsH = 12; }
        if (yUp === void 0) { yUp = true; }
        var _this = _super.call(this, material, elementsType) || this;
        _this._radius = radius;
        _this._segmentsW = segmentsW;
        _this._segmentsH = segmentsH;
        _this._yUp = yUp;
        return _this;
    }
    Object.defineProperty(PrimitiveSpherePrefab.prototype, "radius", {
        /**
         * The radius of the sphere.
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
    Object.defineProperty(PrimitiveSpherePrefab.prototype, "segmentsW", {
        /**
         * Defines the number of horizontal segments that make up the sphere. Defaults to 16.
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
    Object.defineProperty(PrimitiveSpherePrefab.prototype, "segmentsH", {
        /**
         * Defines the number of vertical segments that make up the sphere. Defaults to 12.
         */
        get: function () {
            return this._segmentsH;
        },
        set: function (value) {
            this._segmentsH = value;
            this._pInvalidatePrimitive();
            this._pInvalidateUVs();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimitiveSpherePrefab.prototype, "yUp", {
        /**
         * Defines whether the sphere poles should lay on the Y-axis (true) or on the Z-axis (false).
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
    PrimitiveSpherePrefab.prototype._pBuildGraphics = function (target, elementsType) {
        var indices;
        var positions;
        var normals;
        var tangents;
        var stride;
        var i;
        var j;
        var vidx, fidx; // indices
        var comp1;
        var comp2;
        var numVertices;
        if (elementsType == graphics_1.ElementsType.TRIANGLE) {
            var triangleGraphics = target;
            numVertices = (this._segmentsH + 1) * (this._segmentsW + 1);
            if (numVertices == triangleGraphics.numVertices && triangleGraphics.indices != null) {
                triangleGraphics.invalidateIndices();
                triangleGraphics.invalidateVertices(triangleGraphics.positions);
                triangleGraphics.invalidateVertices(triangleGraphics.normals);
                triangleGraphics.invalidateVertices(triangleGraphics.tangents);
            }
            else {
                triangleGraphics.setIndices(new Uint16Array((this._segmentsH - 1) * this._segmentsW * 6));
                triangleGraphics.setPositions(new Float32Array(numVertices * 3));
                triangleGraphics.setNormals(new Float32Array(numVertices * 3));
                triangleGraphics.setTangents(new Float32Array(numVertices * 3));
                this._pInvalidateUVs();
            }
            indices = triangleGraphics.indices.get(triangleGraphics.numElements);
            positions = triangleGraphics.positions.get(numVertices);
            normals = triangleGraphics.normals.get(numVertices);
            tangents = triangleGraphics.tangents.get(numVertices);
            stride = triangleGraphics.concatenatedBuffer.stride / 4;
            vidx = 0;
            fidx = 0;
            var startIndex;
            var t1;
            var t2;
            for (j = 0; j <= this._segmentsH; ++j) {
                startIndex = vidx;
                var horangle = Math.PI * j / this._segmentsH;
                var z = -this._radius * Math.cos(horangle);
                var ringradius = this._radius * Math.sin(horangle);
                for (i = 0; i <= this._segmentsW; ++i) {
                    var verangle = 2 * Math.PI * i / this._segmentsW;
                    var x = ringradius * Math.cos(verangle);
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
                        positions[vidx] = positions[startIndex];
                        positions[vidx + 1] = positions[startIndex + 1];
                        positions[vidx + 2] = positions[startIndex + 2];
                        normals[vidx] = normals[startIndex] + (x * normLen) * .5;
                        normals[vidx + 1] = normals[startIndex + 1] + (comp1 * normLen) * .5;
                        normals[vidx + 2] = normals[startIndex + 2] + (comp2 * normLen) * .5;
                        tangents[vidx] = tanLen > .007 ? -y / tanLen : 1;
                        tangents[vidx + 1] = t1;
                        tangents[vidx + 2] = t2;
                    }
                    else {
                        positions[vidx] = x;
                        positions[vidx + 1] = comp1;
                        positions[vidx + 2] = comp2;
                        normals[vidx] = x * normLen;
                        normals[vidx + 1] = comp1 * normLen;
                        normals[vidx + 2] = comp2 * normLen;
                        tangents[vidx] = tanLen > .007 ? -y / tanLen : 1;
                        tangents[vidx + 1] = t1;
                        tangents[vidx + 2] = t2;
                    }
                    if (i > 0 && j > 0) {
                        var a = (this._segmentsW + 1) * j + i;
                        var b = (this._segmentsW + 1) * j + i - 1;
                        var c = (this._segmentsW + 1) * (j - 1) + i - 1;
                        var d = (this._segmentsW + 1) * (j - 1) + i;
                        if (j == this._segmentsH) {
                            positions[vidx] = positions[startIndex];
                            positions[vidx + 1] = positions[startIndex + 1];
                            positions[vidx + 2] = positions[startIndex + 2];
                            indices[fidx++] = a;
                            indices[fidx++] = c;
                            indices[fidx++] = d;
                        }
                        else if (j == 1) {
                            indices[fidx++] = a;
                            indices[fidx++] = b;
                            indices[fidx++] = c;
                        }
                        else {
                            indices[fidx++] = a;
                            indices[fidx++] = b;
                            indices[fidx++] = c;
                            indices[fidx++] = a;
                            indices[fidx++] = c;
                            indices[fidx++] = d;
                        }
                    }
                    vidx += stride;
                }
            }
        }
        else if (elementsType == graphics_1.ElementsType.LINE) {
            var lineGraphics = target;
            var numSegments = this._segmentsH * this._segmentsW * 2 + this._segmentsW;
            var positions = new Float32Array(numSegments * 6);
            var thickness = new Float32Array(numSegments);
            vidx = 0;
            fidx = 0;
            for (j = 0; j <= this._segmentsH; ++j) {
                var horangle = Math.PI * j / this._segmentsH;
                var z = -this._radius * Math.cos(horangle);
                var ringradius = this._radius * Math.sin(horangle);
                for (i = 0; i <= this._segmentsW; ++i) {
                    var verangle = 2 * Math.PI * i / this._segmentsW;
                    var x = ringradius * Math.cos(verangle);
                    var y = ringradius * Math.sin(verangle);
                    if (this._yUp) {
                        comp1 = -z;
                        comp2 = y;
                    }
                    else {
                        comp1 = y;
                        comp2 = z;
                    }
                    if (i > 0) {
                        //horizonal lines
                        positions[vidx++] = x;
                        positions[vidx++] = comp1;
                        positions[vidx++] = comp2;
                        thickness[fidx++] = 1;
                        //vertical lines
                        if (j > 0) {
                            var addx = (j == 1) ? 3 - (6 * (this._segmentsW - i) + 12 * i) : 3 - this._segmentsW * 12;
                            positions[vidx] = positions[vidx++ + addx];
                            positions[vidx] = positions[vidx++ + addx];
                            positions[vidx] = positions[vidx++ + addx];
                            positions[vidx++] = x;
                            positions[vidx++] = comp1;
                            positions[vidx++] = comp2;
                            thickness[fidx++] = 1;
                        }
                    }
                    //horizonal lines
                    if (i < this._segmentsW) {
                        positions[vidx++] = x;
                        positions[vidx++] = comp1;
                        positions[vidx++] = comp2;
                    }
                }
            }
            // build real data from raw data
            lineGraphics.setPositions(positions);
            lineGraphics.setThickness(thickness);
        }
    };
    /**
     * @inheritDoc
     */
    PrimitiveSpherePrefab.prototype._pBuildUVs = function (target, elementsType) {
        var i, j;
        var numVertices = (this._segmentsH + 1) * (this._segmentsW + 1);
        var uvs;
        var stride;
        if (elementsType == graphics_1.ElementsType.TRIANGLE) {
            numVertices = (this._segmentsH + 1) * (this._segmentsW + 1);
            var triangleGraphics = target;
            if (triangleGraphics.uvs && numVertices == triangleGraphics.numVertices) {
                triangleGraphics.invalidateVertices(triangleGraphics.uvs);
            }
            else {
                triangleGraphics.setUVs(new Float32Array(numVertices * 2));
            }
            uvs = triangleGraphics.uvs.get(numVertices);
            stride = triangleGraphics.uvs.stride;
            var index = 0;
            for (j = 0; j <= this._segmentsH; ++j) {
                for (i = 0; i <= this._segmentsW; ++i) {
                    uvs[index] = (i / this._segmentsW) * this._scaleU;
                    uvs[index + 1] = (j / this._segmentsH) * this._scaleV;
                    index += stride;
                }
            }
        }
        else if (elementsType == graphics_1.ElementsType.LINE) {
        }
    };
    return PrimitiveSpherePrefab;
}(PrimitivePrefabBase_1.PrimitivePrefabBase));
exports.PrimitiveSpherePrefab = PrimitiveSpherePrefab;
