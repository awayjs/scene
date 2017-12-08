"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var graphics_1 = require("@awayjs/graphics");
var PrimitivePrefabBase_1 = require("../prefabs/PrimitivePrefabBase");
/**
 * A Cylinder primitive sprite.
 */
var PrimitiveCylinderPrefab = (function (_super) {
    __extends(PrimitiveCylinderPrefab, _super);
    /**
     * Creates a new Cylinder object.
     * @param topRadius The radius of the top end of the cylinder.
     * @param bottomRadius The radius of the bottom end of the cylinder
     * @param height The radius of the bottom end of the cylinder
     * @param segmentsW Defines the number of horizontal segments that make up the cylinder. Defaults to 16.
     * @param segmentsH Defines the number of vertical segments that make up the cylinder. Defaults to 1.
     * @param topClosed Defines whether the top end of the cylinder is closed (true) or open.
     * @param bottomClosed Defines whether the bottom end of the cylinder is closed (true) or open.
     * @param yUp Defines whether the cone poles should lay on the Y-axis (true) or on the Z-axis (false).
     */
    function PrimitiveCylinderPrefab(material, elementsType, topRadius, bottomRadius, height, segmentsW, segmentsH, topClosed, bottomClosed, surfaceClosed, yUp) {
        if (material === void 0) { material = null; }
        if (elementsType === void 0) { elementsType = "triangle"; }
        if (topRadius === void 0) { topRadius = 50; }
        if (bottomRadius === void 0) { bottomRadius = 50; }
        if (height === void 0) { height = 100; }
        if (segmentsW === void 0) { segmentsW = 16; }
        if (segmentsH === void 0) { segmentsH = 1; }
        if (topClosed === void 0) { topClosed = true; }
        if (bottomClosed === void 0) { bottomClosed = true; }
        if (surfaceClosed === void 0) { surfaceClosed = true; }
        if (yUp === void 0) { yUp = true; }
        var _this = _super.call(this, material, elementsType) || this;
        _this._numVertices = 0;
        _this._topRadius = topRadius;
        _this._pBottomRadius = bottomRadius;
        _this._height = height;
        _this._pSegmentsW = segmentsW;
        _this._pSegmentsH = segmentsH;
        _this._topClosed = topClosed;
        _this._bottomClosed = bottomClosed;
        _this._surfaceClosed = surfaceClosed;
        _this._yUp = yUp;
        return _this;
    }
    Object.defineProperty(PrimitiveCylinderPrefab.prototype, "topRadius", {
        /**
         * The radius of the top end of the cylinder.
         */
        get: function () {
            return this._topRadius;
        },
        set: function (value) {
            this._topRadius = value;
            this._pInvalidatePrimitive();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimitiveCylinderPrefab.prototype, "bottomRadius", {
        /**
         * The radius of the bottom end of the cylinder.
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
    Object.defineProperty(PrimitiveCylinderPrefab.prototype, "height", {
        /**
         * The radius of the top end of the cylinder.
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
    Object.defineProperty(PrimitiveCylinderPrefab.prototype, "segmentsW", {
        /**
         * Defines the number of horizontal segments that make up the cylinder. Defaults to 16.
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
    PrimitiveCylinderPrefab.prototype.setSegmentsW = function (value) {
        this._pSegmentsW = value;
        this._pInvalidatePrimitive();
        this._pInvalidateUVs();
    };
    Object.defineProperty(PrimitiveCylinderPrefab.prototype, "segmentsH", {
        /**
         * Defines the number of vertical segments that make up the cylinder. Defaults to 1.
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
    PrimitiveCylinderPrefab.prototype.setSegmentsH = function (value) {
        this._pSegmentsH = value;
        this._pInvalidatePrimitive();
        this._pInvalidateUVs();
    };
    Object.defineProperty(PrimitiveCylinderPrefab.prototype, "topClosed", {
        /**
         * Defines whether the top end of the cylinder is closed (true) or open.
         */
        get: function () {
            return this._topClosed;
        },
        set: function (value) {
            this._topClosed = value;
            this._pInvalidatePrimitive();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimitiveCylinderPrefab.prototype, "bottomClosed", {
        /**
         * Defines whether the bottom end of the cylinder is closed (true) or open.
         */
        get: function () {
            return this._bottomClosed;
        },
        set: function (value) {
            this._bottomClosed = value;
            this._pInvalidatePrimitive();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimitiveCylinderPrefab.prototype, "yUp", {
        /**
         * Defines whether the cylinder poles should lay on the Y-axis (true) or on the Z-axis (false).
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
    PrimitiveCylinderPrefab.prototype._pBuildGraphics = function (target, elementsType) {
        var indices;
        var positions;
        var normals;
        var tangents;
        var stride;
        var i;
        var j;
        var x;
        var y;
        var z;
        var vidx;
        var fidx;
        var radius;
        var revolutionAngle;
        var dr;
        var latNormElev;
        var latNormBase;
        var numIndices = 0;
        var comp1;
        var comp2;
        var startIndex = 0;
        var nextVertexIndex = 0;
        var centerVertexIndex = 0;
        var t1;
        var t2;
        // reset utility variables
        this._numVertices = 0;
        // evaluate revolution steps
        var revolutionAngleDelta = 2 * Math.PI / this._pSegmentsW;
        if (elementsType == graphics_1.ElementsType.TRIANGLE) {
            var triangleGraphics = target;
            // evaluate target number of vertices, triangles and indices
            if (this._surfaceClosed) {
                this._numVertices += (this._pSegmentsH + 1) * (this._pSegmentsW + 1); // segmentsH + 1 because of closure, segmentsW + 1 because of UV unwrapping
                numIndices += this._pSegmentsH * this._pSegmentsW * 6; // each level has segmentW quads, each of 2 triangles
            }
            if (this._topClosed) {
                this._numVertices += 2 * (this._pSegmentsW + 1); // segmentsW + 1 because of unwrapping
                numIndices += this._pSegmentsW * 3; // one triangle for each segment
            }
            if (this._bottomClosed) {
                this._numVertices += 2 * (this._pSegmentsW + 1);
                numIndices += this._pSegmentsW * 3;
            }
            // need to initialize raw arrays or can be reused?
            if (this._numVertices == triangleGraphics.numVertices) {
                /*triangleGraphics.invalidateIndices();
                triangleGraphics.invalidateVertices(triangleGraphics.positions);
                triangleGraphics.invalidateVertices(triangleGraphics.normals);
                triangleGraphics.invalidateVertices(triangleGraphics.tangents);*/
                triangleGraphics.positions.invalidate();
                triangleGraphics.normals.invalidate();
                triangleGraphics.tangents.invalidate();
                triangleGraphics.indices.invalidate();
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
            // top
            if (this._topClosed && this._topRadius > 0) {
                z = -0.5 * this._height;
                // central vertex
                if (this._yUp) {
                    t1 = 1;
                    t2 = 0;
                    comp1 = -z;
                    comp2 = 0;
                }
                else {
                    t1 = 0;
                    t2 = -1;
                    comp1 = 0;
                    comp2 = z;
                }
                positions[vidx] = 0;
                positions[vidx + 1] = comp1;
                positions[vidx + 2] = comp2;
                normals[vidx] = 0;
                normals[vidx + 1] = t1;
                normals[vidx + 2] = t2;
                tangents[vidx] = 1;
                tangents[vidx + 1] = 0;
                tangents[vidx + 2] = 0;
                vidx += stride;
                nextVertexIndex++;
                for (i = 0; i <= this._pSegmentsW; ++i) {
                    // revolution vertex
                    revolutionAngle = i * revolutionAngleDelta;
                    x = this._topRadius * Math.cos(revolutionAngle);
                    y = this._topRadius * Math.sin(revolutionAngle);
                    if (this._yUp) {
                        comp1 = -z;
                        comp2 = y;
                    }
                    else {
                        comp1 = y;
                        comp2 = z;
                    }
                    if (i == this._pSegmentsW) {
                        positions[vidx] = positions[startIndex + stride];
                        positions[vidx + 1] = positions[startIndex + stride + 1];
                        positions[vidx + 2] = positions[startIndex + stride + 2];
                    }
                    else {
                        positions[vidx] = x;
                        positions[vidx + 1] = comp1;
                        positions[vidx + 2] = comp2;
                    }
                    normals[vidx] = 0;
                    normals[vidx + 1] = t1;
                    normals[vidx + 2] = t2;
                    tangents[vidx] = 1;
                    tangents[vidx + 1] = 0;
                    tangents[vidx + 2] = 0;
                    vidx += stride;
                    if (i > 0) {
                        // add triangle
                        indices[fidx++] = nextVertexIndex - 1;
                        indices[fidx++] = centerVertexIndex;
                        indices[fidx++] = nextVertexIndex;
                    }
                    nextVertexIndex++;
                }
            }
            // bottom
            if (this._bottomClosed && this._pBottomRadius > 0) {
                z = 0.5 * this._height;
                startIndex = nextVertexIndex * stride;
                centerVertexIndex = nextVertexIndex;
                // central vertex
                if (this._yUp) {
                    t1 = -1;
                    t2 = 0;
                    comp1 = -z;
                    comp2 = 0;
                }
                else {
                    t1 = 0;
                    t2 = 1;
                    comp1 = 0;
                    comp2 = z;
                }
                if (i > 0) {
                    positions[vidx] = 0;
                    positions[vidx + 1] = comp1;
                    positions[vidx + 2] = comp2;
                    normals[vidx] = 0;
                    normals[vidx + 1] = t1;
                    normals[vidx + 2] = t2;
                    tangents[vidx] = 1;
                    tangents[vidx + 1] = 0;
                    tangents[vidx + 2] = 0;
                    vidx += stride;
                }
                nextVertexIndex++;
                for (i = 0; i <= this._pSegmentsW; ++i) {
                    // revolution vertex
                    revolutionAngle = i * revolutionAngleDelta;
                    x = this._pBottomRadius * Math.cos(revolutionAngle);
                    y = this._pBottomRadius * Math.sin(revolutionAngle);
                    if (this._yUp) {
                        comp1 = -z;
                        comp2 = y;
                    }
                    else {
                        comp1 = y;
                        comp2 = z;
                    }
                    if (i == this._pSegmentsW) {
                        positions[vidx] = positions[startIndex + stride];
                        positions[vidx + 1] = positions[startIndex + stride + 1];
                        positions[vidx + 2] = positions[startIndex + stride + 2];
                    }
                    else {
                        positions[vidx] = x;
                        positions[vidx + 1] = comp1;
                        positions[vidx + 2] = comp2;
                    }
                    normals[vidx] = 0;
                    normals[vidx + 1] = t1;
                    normals[vidx + 2] = t2;
                    tangents[vidx] = 1;
                    tangents[vidx + 1] = 0;
                    tangents[vidx + 2] = 0;
                    vidx += stride;
                    if (i > 0) {
                        // add triangle
                        indices[fidx++] = nextVertexIndex - 1;
                        indices[fidx++] = nextVertexIndex;
                        indices[fidx++] = centerVertexIndex;
                    }
                    nextVertexIndex++;
                }
            }
            // The normals on the lateral surface all have the same incline, i.e.
            // the "elevation" component (Y or Z depending on yUp) is constant.
            // Same principle goes for the "base" of these vectors, which will be
            // calculated such that a vector [base,elev] will be a unit vector.
            dr = (this._pBottomRadius - this._topRadius);
            latNormElev = dr / this._height;
            latNormBase = (latNormElev == 0) ? 1 : this._height / dr;
            // lateral surface
            if (this._surfaceClosed) {
                var a;
                var b;
                var c;
                var d;
                var na0, na1, naComp1, naComp2;
                for (j = 0; j <= this._pSegmentsH; ++j) {
                    radius = this._topRadius - ((j / this._pSegmentsH) * (this._topRadius - this._pBottomRadius));
                    z = -(this._height / 2) + (j / this._pSegmentsH * this._height);
                    startIndex = nextVertexIndex * stride;
                    for (i = 0; i <= this._pSegmentsW; ++i) {
                        // revolution vertex
                        revolutionAngle = i * revolutionAngleDelta;
                        x = radius * Math.cos(revolutionAngle);
                        y = radius * Math.sin(revolutionAngle);
                        na0 = latNormBase * Math.cos(revolutionAngle);
                        na1 = latNormBase * Math.sin(revolutionAngle);
                        if (this._yUp) {
                            t1 = 0;
                            t2 = -na0;
                            comp1 = -z;
                            comp2 = y;
                            naComp1 = latNormElev;
                            naComp2 = na1;
                        }
                        else {
                            t1 = -na0;
                            t2 = 0;
                            comp1 = y;
                            comp2 = z;
                            naComp1 = na1;
                            naComp2 = latNormElev;
                        }
                        if (i == this._pSegmentsW) {
                            positions[vidx] = positions[startIndex];
                            positions[vidx + 1] = positions[startIndex + 1];
                            positions[vidx + 2] = positions[startIndex + 2];
                            normals[vidx] = na0;
                            normals[vidx + 1] = latNormElev;
                            normals[vidx + 2] = na1;
                            tangents[vidx] = na1;
                            tangents[vidx + 1] = t1;
                            tangents[vidx + 2] = t2;
                        }
                        else {
                            positions[vidx] = x;
                            positions[vidx + 1] = comp1;
                            positions[vidx + 2] = comp2;
                            normals[vidx] = na0;
                            normals[vidx + 1] = naComp1;
                            normals[vidx + 2] = naComp2;
                            tangents[vidx] = -na1;
                            tangents[vidx + 1] = t1;
                            tangents[vidx + 2] = t2;
                        }
                        vidx += stride;
                        // close triangle
                        if (i > 0 && j > 0) {
                            a = nextVertexIndex; // current
                            b = nextVertexIndex - 1; // previous
                            c = b - this._pSegmentsW - 1; // previous of last level
                            d = a - this._pSegmentsW - 1; // current of last level
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
        }
        else if (elementsType == graphics_1.ElementsType.LINE) {
            var lineGraphics = target;
            var numSegments = this._pSegmentsH * this._pSegmentsW * 2 + this._pSegmentsW;
            positions = new Float32Array(numSegments * 6);
            var thickness = new Float32Array(numSegments);
            vidx = 0;
            fidx = 0;
            var _radius = 50;
            for (j = 0; j <= this._pSegmentsH; ++j) {
                radius = this._topRadius - ((j / this._pSegmentsH) * (this._topRadius - this._pBottomRadius));
                z = -(this._height / 2) + (j / this._pSegmentsH * this._height);
                for (i = 0; i <= this._pSegmentsW; ++i) {
                    // revolution vertex
                    revolutionAngle = i * revolutionAngleDelta;
                    x = radius * Math.cos(revolutionAngle);
                    y = radius * Math.sin(revolutionAngle);
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
                            var addx = (j == 1) ? 3 - (6 * (this._pSegmentsW - i) + 12 * i) : 3 - this._pSegmentsW * 12;
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
                    if (i < this._pSegmentsW) {
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
    PrimitiveCylinderPrefab.prototype._pBuildUVs = function (target, elementsType) {
        var i;
        var j;
        var x;
        var y;
        var revolutionAngle;
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
            // evaluate revolution steps
            var revolutionAngleDelta = 2 * Math.PI / this._pSegmentsW;
            // current uv component index
            var index = 0;
            // top
            if (this._topClosed) {
                uvs[index] = 0.5 * this._scaleU; // central vertex
                uvs[index + 1] = 0.5 * this._scaleV;
                index += stride;
                for (i = 0; i <= this._pSegmentsW; ++i) {
                    revolutionAngle = i * revolutionAngleDelta;
                    x = 0.5 + 0.5 * -Math.cos(revolutionAngle);
                    y = 0.5 + 0.5 * Math.sin(revolutionAngle);
                    uvs[index] = x * this._scaleU; // revolution vertex
                    uvs[index + 1] = y * this._scaleV;
                    index += stride;
                }
            }
            // bottom
            if (this._bottomClosed) {
                uvs[index] = 0.5 * this._scaleU; // central vertex
                uvs[index + 1] = 0.5 * this._scaleV;
                index += stride;
                for (i = 0; i <= this._pSegmentsW; ++i) {
                    revolutionAngle = i * revolutionAngleDelta;
                    x = 0.5 + 0.5 * Math.cos(revolutionAngle);
                    y = 0.5 + 0.5 * Math.sin(revolutionAngle);
                    uvs[index] = x * this._scaleU; // revolution vertex
                    uvs[index + 1] = y * this._scaleV;
                    index += stride;
                }
            }
            // lateral surface
            if (this._surfaceClosed) {
                for (j = 0; j <= this._pSegmentsH; ++j) {
                    for (i = 0; i <= this._pSegmentsW; ++i) {
                        // revolution vertex
                        uvs[index] = (i / this._pSegmentsW) * this._scaleU;
                        uvs[index + 1] = (j / this._pSegmentsH) * this._scaleV;
                        index += stride;
                    }
                }
            }
        }
        else if (elementsType == graphics_1.ElementsType.LINE) {
        }
    };
    return PrimitiveCylinderPrefab;
}(PrimitivePrefabBase_1.PrimitivePrefabBase));
exports.PrimitiveCylinderPrefab = PrimitiveCylinderPrefab;
