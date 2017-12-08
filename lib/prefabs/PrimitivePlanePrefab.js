"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var graphics_1 = require("@awayjs/graphics");
var PrimitivePrefabBase_1 = require("../prefabs/PrimitivePrefabBase");
/**
 * A Plane primitive sprite.
 */
var PrimitivePlanePrefab = (function (_super) {
    __extends(PrimitivePlanePrefab, _super);
    /**
     * Creates a new Plane object.
     * @param width The width of the plane.
     * @param height The height of the plane.
     * @param segmentsW The number of segments that make up the plane along the X-axis.
     * @param segmentsH The number of segments that make up the plane along the Y or Z-axis.
     * @param yUp Defines whether the normal vector of the plane should point along the Y-axis (true) or Z-axis (false).
     * @param doubleSided Defines whether the plane will be visible from both sides, with correct vertex normals.
     */
    function PrimitivePlanePrefab(material, elementsType, width, height, segmentsW, segmentsH, yUp, doubleSided) {
        if (material === void 0) { material = null; }
        if (elementsType === void 0) { elementsType = "triangle"; }
        if (width === void 0) { width = 100; }
        if (height === void 0) { height = 100; }
        if (segmentsW === void 0) { segmentsW = 1; }
        if (segmentsH === void 0) { segmentsH = 1; }
        if (yUp === void 0) { yUp = true; }
        if (doubleSided === void 0) { doubleSided = false; }
        var _this = _super.call(this, material, elementsType) || this;
        _this._segmentsW = segmentsW;
        _this._segmentsH = segmentsH;
        _this._yUp = yUp;
        _this._width = width;
        _this._height = height;
        _this._doubleSided = doubleSided;
        return _this;
    }
    Object.defineProperty(PrimitivePlanePrefab.prototype, "segmentsW", {
        /**
         * The number of segments that make up the plane along the X-axis. Defaults to 1.
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
    Object.defineProperty(PrimitivePlanePrefab.prototype, "segmentsH", {
        /**
         * The number of segments that make up the plane along the Y or Z-axis, depending on whether yUp is true or
         * false, respectively. Defaults to 1.
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
    Object.defineProperty(PrimitivePlanePrefab.prototype, "yUp", {
        /**
         *  Defines whether the normal vector of the plane should point along the Y-axis (true) or Z-axis (false). Defaults to true.
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
    Object.defineProperty(PrimitivePlanePrefab.prototype, "doubleSided", {
        /**
         * Defines whether the plane will be visible from both sides, with correct vertex normals (as opposed to bothSides on Material). Defaults to false.
         */
        get: function () {
            return this._doubleSided;
        },
        set: function (value) {
            this._doubleSided = value;
            this._pInvalidatePrimitive();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimitivePlanePrefab.prototype, "width", {
        /**
         * The width of the plane.
         */
        get: function () {
            return this._width;
        },
        set: function (value) {
            this._width = value;
            this._pInvalidatePrimitive();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimitivePlanePrefab.prototype, "height", {
        /**
         * The height of the plane.
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
    /**
     * @inheritDoc
     */
    PrimitivePlanePrefab.prototype._pBuildGraphics = function (target, elementsType) {
        var indices;
        var x, y;
        var numIndices;
        var stride;
        var base;
        var tw = this._segmentsW + 1;
        var vidx, fidx; // indices
        var xi;
        var yi;
        if (elementsType == graphics_1.ElementsType.TRIANGLE) {
            var triangleGraphics = target;
            var numVertices = (this._segmentsH + 1) * tw;
            var positions;
            var normals;
            var tangents;
            if (this._doubleSided)
                numVertices *= 2;
            numIndices = this._segmentsH * this._segmentsW * 6;
            if (this._doubleSided)
                numIndices *= 2;
            if (triangleGraphics.indices != null && numIndices == triangleGraphics.indices.length) {
                triangleGraphics.invalidateIndices();
            }
            else {
                triangleGraphics.setIndices(new Uint16Array(numIndices));
                this._pInvalidateUVs();
            }
            indices = triangleGraphics.indices.get(triangleGraphics.numElements);
            if (numVertices == triangleGraphics.numVertices) {
                triangleGraphics.invalidateVertices(triangleGraphics.positions);
                triangleGraphics.invalidateVertices(triangleGraphics.normals);
                triangleGraphics.invalidateVertices(triangleGraphics.tangents);
            }
            else {
                triangleGraphics.setPositions(new Float32Array(numVertices * 3));
                triangleGraphics.setNormals(new Float32Array(numVertices * 3));
                triangleGraphics.setTangents(new Float32Array(numVertices * 3));
                this._pInvalidateUVs();
            }
            positions = triangleGraphics.positions.get(numVertices);
            normals = triangleGraphics.normals.get(numVertices);
            tangents = triangleGraphics.tangents.get(numVertices);
            stride = triangleGraphics.concatenatedBuffer.stride / 4;
            fidx = 0;
            vidx = 0;
            for (yi = 0; yi <= this._segmentsH; ++yi) {
                for (xi = 0; xi <= this._segmentsW; ++xi) {
                    x = (xi / this._segmentsW - .5) * this._width;
                    y = (yi / this._segmentsH - .5) * this._height;
                    positions[vidx] = x;
                    if (this._yUp) {
                        positions[vidx + 1] = 0;
                        positions[vidx + 2] = y;
                    }
                    else {
                        positions[vidx + 1] = y;
                        positions[vidx + 2] = 0;
                    }
                    normals[vidx] = 0;
                    if (this._yUp) {
                        normals[vidx + 1] = 1;
                        normals[vidx + 2] = 0;
                    }
                    else {
                        normals[vidx + 1] = 0;
                        normals[vidx + 2] = -1;
                    }
                    tangents[vidx] = 1;
                    tangents[vidx + 1] = 0;
                    tangents[vidx + 2] = 0;
                    vidx += stride;
                    // add vertex with same position, but with inverted normal & tangent
                    if (this._doubleSided) {
                        for (var i = vidx; i < vidx + 3; ++i) {
                            positions[i] = positions[i - 3];
                            normals[i] = -normals[i - 3];
                            tangents[i] = -tangents[i - 3];
                        }
                        vidx += stride;
                    }
                    if (xi != this._segmentsW && yi != this._segmentsH) {
                        base = xi + yi * tw;
                        var mult = this._doubleSided ? 2 : 1;
                        indices[fidx++] = base * mult;
                        indices[fidx++] = (base + tw) * mult;
                        indices[fidx++] = (base + tw + 1) * mult;
                        indices[fidx++] = base * mult;
                        indices[fidx++] = (base + tw + 1) * mult;
                        indices[fidx++] = (base + 1) * mult;
                        if (this._doubleSided) {
                            indices[fidx++] = (base + tw + 1) * mult + 1;
                            indices[fidx++] = (base + tw) * mult + 1;
                            indices[fidx++] = base * mult + 1;
                            indices[fidx++] = (base + 1) * mult + 1;
                            indices[fidx++] = (base + tw + 1) * mult + 1;
                            indices[fidx++] = base * mult + 1;
                        }
                    }
                }
            }
        }
        else if (elementsType == graphics_1.ElementsType.LINE) {
            var lineGraphics = target;
            var numSegments = (this._segmentsH + 1) + tw;
            var positions;
            var thickness;
            var hw = this._width / 2;
            var hh = this._height / 2;
            positions = new Float32Array(numSegments * 6);
            thickness = new Float32Array(numSegments);
            fidx = 0;
            vidx = 0;
            for (yi = 0; yi <= this._segmentsH; ++yi) {
                positions[vidx++] = -hw;
                positions[vidx++] = 0;
                positions[vidx++] = yi * this._height - hh;
                positions[vidx++] = hw;
                positions[vidx++] = 0;
                positions[vidx++] = yi * this._height - hh;
                thickness[fidx++] = 1;
            }
            for (xi = 0; xi <= this._segmentsW; ++xi) {
                positions[vidx++] = xi * this._width - hw;
                positions[vidx++] = 0;
                positions[vidx++] = -hh;
                positions[vidx++] = xi * this._width - hw;
                positions[vidx++] = 0;
                positions[vidx++] = hh;
                thickness[fidx++] = 1;
            }
            // build real data from raw data
            lineGraphics.setPositions(positions);
            lineGraphics.setThickness(thickness);
        }
    };
    /**
     * @inheritDoc
     */
    PrimitivePlanePrefab.prototype._pBuildUVs = function (target, elementsType) {
        var uvs;
        var stride;
        var numVertices;
        if (elementsType == graphics_1.ElementsType.TRIANGLE) {
            numVertices = (this._segmentsH + 1) * (this._segmentsW + 1);
            if (this._doubleSided)
                numVertices *= 2;
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
            for (var yi = 0; yi <= this._segmentsH; ++yi) {
                for (var xi = 0; xi <= this._segmentsW; ++xi) {
                    uvs[index] = (xi / this._segmentsW) * this._scaleU;
                    uvs[index + 1] = (1 - yi / this._segmentsH) * this._scaleV;
                    index += stride;
                    if (this._doubleSided) {
                        uvs[index] = (xi / this._segmentsW) * this._scaleU;
                        uvs[index + 1] = (1 - yi / this._segmentsH) * this._scaleV;
                        index += stride;
                    }
                }
            }
        }
        else if (elementsType == graphics_1.ElementsType.LINE) {
        }
    };
    return PrimitivePlanePrefab;
}(PrimitivePrefabBase_1.PrimitivePrefabBase));
exports.PrimitivePlanePrefab = PrimitivePlanePrefab;
