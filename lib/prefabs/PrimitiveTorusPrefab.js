"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var graphics_1 = require("@awayjs/graphics");
var PrimitivePrefabBase_1 = require("../prefabs/PrimitivePrefabBase");
/**
 * A UV Cylinder primitive sprite.
 */
var PrimitiveTorusPrefab = (function (_super) {
    __extends(PrimitiveTorusPrefab, _super);
    /**
     * Creates a new <code>Torus</code> object.
     * @param radius The radius of the torus.
     * @param tuebRadius The radius of the inner tube of the torus.
     * @param segmentsR Defines the number of horizontal segments that make up the torus.
     * @param segmentsT Defines the number of vertical segments that make up the torus.
     * @param yUp Defines whether the torus poles should lay on the Y-axis (true) or on the Z-axis (false).
     */
    function PrimitiveTorusPrefab(material, elementsType, radius, tubeRadius, segmentsR, segmentsT, yUp) {
        if (material === void 0) { material = null; }
        if (elementsType === void 0) { elementsType = "triangle"; }
        if (radius === void 0) { radius = 50; }
        if (tubeRadius === void 0) { tubeRadius = 50; }
        if (segmentsR === void 0) { segmentsR = 16; }
        if (segmentsT === void 0) { segmentsT = 8; }
        if (yUp === void 0) { yUp = true; }
        var _this = _super.call(this, material, elementsType) || this;
        _this._numVertices = 0;
        _this._radius = radius;
        _this._tubeRadius = tubeRadius;
        _this._segmentsR = segmentsR;
        _this._segmentsT = segmentsT;
        _this._yUp = yUp;
        return _this;
    }
    Object.defineProperty(PrimitiveTorusPrefab.prototype, "radius", {
        /**
         * The radius of the torus.
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
    Object.defineProperty(PrimitiveTorusPrefab.prototype, "tubeRadius", {
        /**
         * The radius of the inner tube of the torus.
         */
        get: function () {
            return this._tubeRadius;
        },
        set: function (value) {
            this._tubeRadius = value;
            this._pInvalidatePrimitive();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimitiveTorusPrefab.prototype, "segmentsR", {
        /**
         * Defines the number of horizontal segments that make up the torus. Defaults to 16.
         */
        get: function () {
            return this._segmentsR;
        },
        set: function (value) {
            this._segmentsR = value;
            this._pInvalidatePrimitive();
            this._pInvalidateUVs();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimitiveTorusPrefab.prototype, "segmentsT", {
        /**
         * Defines the number of vertical segments that make up the torus. Defaults to 8.
         */
        get: function () {
            return this._segmentsT;
        },
        set: function (value) {
            this._segmentsT = value;
            this._pInvalidatePrimitive();
            this._pInvalidateUVs();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimitiveTorusPrefab.prototype, "yUp", {
        /**
         * Defines whether the torus poles should lay on the Y-axis (true) or on the Z-axis (false).
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
    PrimitiveTorusPrefab.prototype._pBuildGraphics = function (target, elementsType) {
        var indices;
        var positions;
        var normals;
        var tangents;
        var stride;
        var i, j;
        var x, y, z, nx, ny, nz, revolutionAngleR, revolutionAngleT;
        var vidx;
        var fidx;
        var numIndices = 0;
        if (elementsType == graphics_1.ElementsType.TRIANGLE) {
            var triangleGraphics = target;
            // evaluate target number of vertices, triangles and indices
            this._numVertices = (this._segmentsT + 1) * (this._segmentsR + 1); // segmentsT + 1 because of closure, segmentsR + 1 because of closure
            numIndices = this._segmentsT * this._segmentsR * 6; // each level has segmentR quads, each of 2 triangles
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
            vidx = 0;
            fidx = 0;
            // evaluate revolution steps
            var revolutionAngleDeltaR = 2 * Math.PI / this._segmentsR;
            var revolutionAngleDeltaT = 2 * Math.PI / this._segmentsT;
            var comp1, comp2;
            var t1, t2, n1, n2;
            var startIndex = 0;
            var nextVertexIndex = 0;
            // surface
            var a, b, c, d, length;
            for (j = 0; j <= this._segmentsT; ++j) {
                startIndex = vidx;
                for (i = 0; i <= this._segmentsR; ++i) {
                    // revolution vertex
                    revolutionAngleR = i * revolutionAngleDeltaR;
                    revolutionAngleT = j * revolutionAngleDeltaT;
                    length = Math.cos(revolutionAngleT);
                    nx = length * Math.cos(revolutionAngleR);
                    ny = length * Math.sin(revolutionAngleR);
                    nz = Math.sin(revolutionAngleT);
                    x = this._radius * Math.cos(revolutionAngleR) + this._tubeRadius * nx;
                    y = this._radius * Math.sin(revolutionAngleR) + this._tubeRadius * ny;
                    z = (j == this._segmentsT) ? 0 : this._tubeRadius * nz;
                    if (this._yUp) {
                        n1 = -nz;
                        n2 = ny;
                        t1 = 0;
                        t2 = (length ? nx / length : x / this._radius);
                        comp1 = -z;
                        comp2 = y;
                    }
                    else {
                        n1 = ny;
                        n2 = nz;
                        t1 = (length ? nx / length : x / this._radius);
                        t2 = 0;
                        comp1 = y;
                        comp2 = z;
                    }
                    if (i == this._segmentsR) {
                        positions[vidx] = x;
                        positions[vidx + 1] = positions[startIndex + 1];
                        positions[vidx + 2] = positions[startIndex + 2];
                    }
                    else {
                        positions[vidx] = x;
                        positions[vidx + 1] = comp1;
                        positions[vidx + 2] = comp2;
                    }
                    normals[vidx] = nx;
                    normals[vidx + 1] = n1;
                    normals[vidx + 2] = n2;
                    tangents[vidx] = -(length ? ny / length : y / this._radius);
                    tangents[vidx + 1] = t1;
                    tangents[vidx + 2] = t2;
                    vidx += stride;
                    // close triangle
                    if (i > 0 && j > 0) {
                        a = nextVertexIndex; // current
                        b = nextVertexIndex - 1; // previous
                        c = b - this._segmentsR - 1; // previous of last level
                        d = a - this._segmentsR - 1; // current of last level
                        indices[fidx++] = a;
                        indices[fidx++] = b;
                        indices[fidx++] = c;
                        indices[fidx++] = a;
                        indices[fidx++] = c;
                        indices[fidx++] = d;
                    }
                    nextVertexIndex++;
                }
            }
        }
        else if (elementsType == graphics_1.ElementsType.LINE) {
        }
    };
    /**
     * @inheritDoc
     */
    PrimitiveTorusPrefab.prototype._pBuildUVs = function (target, elementsType) {
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
            for (j = 0; j <= this._segmentsT; ++j) {
                for (i = 0; i <= this._segmentsR; ++i) {
                    // revolution vertex
                    uvs[index] = (i / this._segmentsR) * this._scaleU;
                    uvs[index + 1] = (j / this._segmentsT) * this._scaleV;
                    index += stride;
                }
            }
        }
        else if (elementsType == graphics_1.ElementsType.LINE) {
        }
    };
    return PrimitiveTorusPrefab;
}(PrimitivePrefabBase_1.PrimitivePrefabBase));
exports.PrimitiveTorusPrefab = PrimitiveTorusPrefab;
