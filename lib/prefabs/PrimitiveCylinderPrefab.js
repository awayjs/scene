var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var PrimitivePrefabBase = require("awayjs-display/lib/prefabs/PrimitivePrefabBase");
/**
 * A Cylinder primitive mesh.
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
    function PrimitiveCylinderPrefab(topRadius, bottomRadius, height, segmentsW, segmentsH, topClosed, bottomClosed, surfaceClosed, yUp) {
        if (topRadius === void 0) { topRadius = 50; }
        if (bottomRadius === void 0) { bottomRadius = 50; }
        if (height === void 0) { height = 100; }
        if (segmentsW === void 0) { segmentsW = 16; }
        if (segmentsH === void 0) { segmentsH = 1; }
        if (topClosed === void 0) { topClosed = true; }
        if (bottomClosed === void 0) { bottomClosed = true; }
        if (surfaceClosed === void 0) { surfaceClosed = true; }
        if (yUp === void 0) { yUp = true; }
        _super.call(this);
        this._numVertices = 0;
        this._topRadius = topRadius;
        this._pBottomRadius = bottomRadius;
        this._height = height;
        this._pSegmentsW = segmentsW;
        this._pSegmentsH = segmentsH;
        this._topClosed = topClosed;
        this._bottomClosed = bottomClosed;
        this._surfaceClosed = surfaceClosed;
        this._yUp = yUp;
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
            this._pInvalidateGeometry();
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
            this._pInvalidateGeometry();
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
            this._pInvalidateGeometry();
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
        this._pInvalidateGeometry();
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
        this._pInvalidateGeometry();
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
            this._pInvalidateGeometry();
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
            this._pInvalidateGeometry();
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
            this._pInvalidateGeometry();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @inheritDoc
     */
    PrimitiveCylinderPrefab.prototype._pBuildGeometry = function (target, geometryType) {
        var indices /*uint*/;
        var positions;
        var normals;
        var tangents;
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
        var t1;
        var t2;
        // reset utility variables
        this._numVertices = 0;
        // evaluate revolution steps
        var revolutionAngleDelta = 2 * Math.PI / this._pSegmentsW;
        if (geometryType == "triangleSubGeometry") {
            var triangleGeometry = target;
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
            if (this._numVertices == triangleGeometry.numVertices) {
                indices = triangleGeometry.indices;
                positions = triangleGeometry.positions;
                normals = triangleGeometry.vertexNormals;
                tangents = triangleGeometry.vertexTangents;
            }
            else {
                indices = new Array(numIndices);
                positions = new Array(this._numVertices * 3);
                normals = new Array(this._numVertices * 3);
                tangents = new Array(this._numVertices * 3);
                this._pInvalidateUVs();
            }
            vidx = 0;
            fidx = 0;
            // top
            if (this._topClosed && this._topRadius > 0) {
                z = -0.5 * this._height;
                for (i = 0; i <= this._pSegmentsW; ++i) {
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
                    vidx += 3;
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
                        positions[vidx] = positions[startIndex + 3];
                        positions[vidx + 1] = positions[startIndex + 4];
                        positions[vidx + 2] = positions[startIndex + 5];
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
                    vidx += 3;
                    if (i > 0) {
                        // add triangle
                        indices[fidx++] = nextVertexIndex;
                        indices[fidx++] = nextVertexIndex + 1;
                        indices[fidx++] = nextVertexIndex + 2;
                        nextVertexIndex += 2;
                    }
                }
                nextVertexIndex += 2;
            }
            // bottom
            if (this._bottomClosed && this._pBottomRadius > 0) {
                z = 0.5 * this._height;
                startIndex = nextVertexIndex * 3;
                for (i = 0; i <= this._pSegmentsW; ++i) {
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
                    positions[vidx] = 0;
                    positions[vidx + 1] = comp1;
                    positions[vidx + 2] = comp2;
                    normals[vidx] = 0;
                    normals[vidx + 1] = t1;
                    normals[vidx + 2] = t2;
                    tangents[vidx] = 1;
                    tangents[vidx + 1] = 0;
                    tangents[vidx + 2] = 0;
                    vidx += 3;
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
                        positions[vidx] = positions[startIndex + 3];
                        positions[vidx + 1] = positions[startIndex + 4];
                        positions[vidx + 2] = positions[startIndex + 5];
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
                    vidx += 3;
                    if (i > 0) {
                        // add triangle
                        indices[fidx++] = nextVertexIndex;
                        indices[fidx++] = nextVertexIndex + 2;
                        indices[fidx++] = nextVertexIndex + 1;
                        nextVertexIndex += 2;
                    }
                }
                nextVertexIndex += 2;
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
                    startIndex = nextVertexIndex * 3;
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
                        vidx += 3;
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
            // build real data from raw data
            triangleGeometry.updateIndices(indices);
            triangleGeometry.updatePositions(positions);
            triangleGeometry.updateVertexNormals(normals);
            triangleGeometry.updateVertexTangents(tangents);
        }
        else if (geometryType == "lineSubGeometry") {
            var lineGeometry = target;
            var numSegments = (this._pSegmentsH + 1) * (this._pSegmentsW) + this._pSegmentsW;
            var startPositions;
            var endPositions;
            var thickness;
            if (lineGeometry.indices != null && numSegments == lineGeometry.numSegments) {
                startPositions = lineGeometry.startPositions;
                endPositions = lineGeometry.endPositions;
                thickness = lineGeometry.thickness;
            }
            else {
                startPositions = new Array(numSegments * 3);
                endPositions = new Array(numSegments * 3);
                thickness = new Array(numSegments);
            }
            vidx = 0;
            fidx = 0;
            for (j = 0; j <= this._pSegmentsH; ++j) {
                radius = this._topRadius - ((j / this._pSegmentsH) * (this._topRadius - this._pBottomRadius));
                z = this._height * (j / this._pSegmentsH - 0.5);
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
                        endPositions[vidx] = x;
                        endPositions[vidx + 1] = comp1;
                        endPositions[vidx + 2] = comp2;
                        thickness[fidx++] = 1;
                        vidx += 3;
                        //vertical lines
                        startPositions[vidx] = endPositions[vidx - this._pSegmentsW * 6];
                        startPositions[vidx + 1] = endPositions[vidx + 1 - this._pSegmentsW * 6];
                        startPositions[vidx + 2] = endPositions[vidx + 2 - this._pSegmentsW * 6];
                        endPositions[vidx] = x;
                        endPositions[vidx + 1] = comp1;
                        endPositions[vidx + 2] = comp2;
                        thickness[fidx++] = 1;
                        vidx += 3;
                    }
                    if (i < this._pSegmentsW) {
                        startPositions[vidx] = x;
                        startPositions[vidx + 1] = comp1;
                        startPositions[vidx + 2] = comp2;
                    }
                }
            }
            // build real data from raw data
            lineGeometry.updatePositions(startPositions, endPositions);
            lineGeometry.updateThickness(thickness);
        }
    };
    /**
     * @inheritDoc
     */
    PrimitiveCylinderPrefab.prototype._pBuildUVs = function (target, geometryType) {
        var i;
        var j;
        var x;
        var y;
        var revolutionAngle;
        var uvs;
        if (geometryType == "triangleSubGeometry") {
            var triangleGeometry = target;
            // need to initialize raw array or can be reused?
            if (triangleGeometry.uvs && this._numVertices == triangleGeometry.numVertices) {
                uvs = triangleGeometry.uvs;
            }
            else {
                uvs = new Array(this._numVertices * 2);
            }
            // evaluate revolution steps
            var revolutionAngleDelta = 2 * Math.PI / this._pSegmentsW;
            // current uv component index
            var index = 0;
            // top
            if (this._topClosed) {
                for (i = 0; i <= this._pSegmentsW; ++i) {
                    revolutionAngle = i * revolutionAngleDelta;
                    x = 0.5 + 0.5 * -Math.cos(revolutionAngle);
                    y = 0.5 + 0.5 * Math.sin(revolutionAngle);
                    uvs[index++] = 0.5 * triangleGeometry.scaleU; // central vertex
                    uvs[index++] = 0.5 * triangleGeometry.scaleV;
                    uvs[index++] = x * triangleGeometry.scaleU; // revolution vertex
                    uvs[index++] = y * triangleGeometry.scaleV;
                }
            }
            // bottom
            if (this._bottomClosed) {
                for (i = 0; i <= this._pSegmentsW; ++i) {
                    revolutionAngle = i * revolutionAngleDelta;
                    x = 0.5 + 0.5 * Math.cos(revolutionAngle);
                    y = 0.5 + 0.5 * Math.sin(revolutionAngle);
                    uvs[index++] = 0.5 * triangleGeometry.scaleU; // central vertex
                    uvs[index++] = 0.5 * triangleGeometry.scaleV;
                    uvs[index++] = x * triangleGeometry.scaleU; // revolution vertex
                    uvs[index++] = y * triangleGeometry.scaleV;
                }
            }
            // lateral surface
            if (this._surfaceClosed) {
                for (j = 0; j <= this._pSegmentsH; ++j) {
                    for (i = 0; i <= this._pSegmentsW; ++i) {
                        // revolution vertex
                        uvs[index++] = (i / this._pSegmentsW) * triangleGeometry.scaleU;
                        uvs[index++] = (j / this._pSegmentsH) * triangleGeometry.scaleV;
                    }
                }
            }
            // build real data from raw data
            triangleGeometry.updateUVs(uvs);
        }
        else if (geometryType == "lineSubGeometry") {
        }
    };
    return PrimitiveCylinderPrefab;
})(PrimitivePrefabBase);
module.exports = PrimitiveCylinderPrefab;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9wcmVmYWJzL1ByaW1pdGl2ZUN5bGluZGVyUHJlZmFiLnRzIl0sIm5hbWVzIjpbIlByaW1pdGl2ZUN5bGluZGVyUHJlZmFiIiwiUHJpbWl0aXZlQ3lsaW5kZXJQcmVmYWIuY29uc3RydWN0b3IiLCJQcmltaXRpdmVDeWxpbmRlclByZWZhYi50b3BSYWRpdXMiLCJQcmltaXRpdmVDeWxpbmRlclByZWZhYi5ib3R0b21SYWRpdXMiLCJQcmltaXRpdmVDeWxpbmRlclByZWZhYi5oZWlnaHQiLCJQcmltaXRpdmVDeWxpbmRlclByZWZhYi5zZWdtZW50c1ciLCJQcmltaXRpdmVDeWxpbmRlclByZWZhYi5zZXRTZWdtZW50c1ciLCJQcmltaXRpdmVDeWxpbmRlclByZWZhYi5zZWdtZW50c0giLCJQcmltaXRpdmVDeWxpbmRlclByZWZhYi5zZXRTZWdtZW50c0giLCJQcmltaXRpdmVDeWxpbmRlclByZWZhYi50b3BDbG9zZWQiLCJQcmltaXRpdmVDeWxpbmRlclByZWZhYi5ib3R0b21DbG9zZWQiLCJQcmltaXRpdmVDeWxpbmRlclByZWZhYi55VXAiLCJQcmltaXRpdmVDeWxpbmRlclByZWZhYi5fcEJ1aWxkR2VvbWV0cnkiLCJQcmltaXRpdmVDeWxpbmRlclByZWZhYi5fcEJ1aWxkVVZzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFLQSxJQUFPLG1CQUFtQixXQUFZLGdEQUFnRCxDQUFDLENBQUM7QUFFeEYsQUFHQTs7R0FERztJQUNHLHVCQUF1QjtJQUFTQSxVQUFoQ0EsdUJBQXVCQSxVQUE0QkE7SUE4SXhEQTs7Ozs7Ozs7OztPQVVHQTtJQUNIQSxTQXpKS0EsdUJBQXVCQSxDQXlKaEJBLFNBQXFCQSxFQUFFQSxZQUF3QkEsRUFBRUEsTUFBbUJBLEVBQUVBLFNBQXFCQSxFQUFFQSxTQUFvQkEsRUFBRUEsU0FBd0JBLEVBQUVBLFlBQTJCQSxFQUFFQSxhQUE0QkEsRUFBRUEsR0FBa0JBO1FBQTFOQyx5QkFBcUJBLEdBQXJCQSxjQUFx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QSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFFakRBLENBQUNBO29CQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTt3QkFDUEEsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7d0JBQ3BCQSxTQUFTQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQTt3QkFDNUJBLFNBQVNBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBO29CQUM3QkEsQ0FBQ0E7b0JBRURBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO29CQUNsQkEsT0FBT0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7b0JBQ3ZCQSxPQUFPQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTtvQkFDdkJBLFFBQVFBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO29CQUNuQkEsUUFBUUEsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBQ3ZCQSxRQUFRQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFDdkJBLElBQUlBLElBQUlBLENBQUNBLENBQUNBO29CQUVWQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDWEEsQUFDQUEsZUFEZUE7d0JBQ2ZBLE9BQU9BLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEdBQUdBLGVBQWVBLENBQUNBO3dCQUNsQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsZUFBZUEsR0FBR0EsQ0FBQ0EsQ0FBQ0E7d0JBQ3RDQSxPQUFPQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFHQSxlQUFlQSxHQUFHQSxDQUFDQSxDQUFDQTt3QkFFdENBLGVBQWVBLElBQUlBLENBQUNBLENBQUNBO29CQUN0QkEsQ0FBQ0E7Z0JBQ0ZBLENBQUNBO2dCQUVEQSxlQUFlQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUN0QkEsQ0FBQ0E7WUFFREEsQUFDQUEsU0FEU0E7WUFDVEEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsSUFBSUEsSUFBSUEsQ0FBQ0EsY0FBY0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBRW5EQSxDQUFDQSxHQUFHQSxHQUFHQSxHQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQTtnQkFFckJBLFVBQVVBLEdBQUdBLGVBQWVBLEdBQUNBLENBQUNBLENBQUNBO2dCQUUvQkEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsV0FBV0EsRUFBRUEsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7b0JBQ3hDQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDZkEsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQ1JBLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBO3dCQUNQQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDWEEsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBQ1hBLENBQUNBO29CQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTt3QkFDUEEsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0E7d0JBQ1BBLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBO3dCQUNQQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQTt3QkFDVkEsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBQ1hBLENBQUNBO29CQUVEQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFDcEJBLFNBQVNBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBO29CQUM1QkEsU0FBU0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0E7b0JBQzVCQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFDbEJBLE9BQU9BLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO29CQUN2QkEsT0FBT0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7b0JBQ3ZCQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFDbkJBLFFBQVFBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO29CQUN2QkEsUUFBUUEsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBQ3ZCQSxJQUFJQSxJQUFJQSxDQUFDQSxDQUFDQTtvQkFFVkEsQUFDQUEsb0JBRG9CQTtvQkFDcEJBLGVBQWVBLEdBQUdBLENBQUNBLEdBQUNBLG9CQUFvQkEsQ0FBQ0E7b0JBQ3pDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxjQUFjQSxHQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxlQUFlQSxDQUFDQSxDQUFDQTtvQkFDbERBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLGNBQWNBLEdBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLGVBQWVBLENBQUNBLENBQUNBO29CQUVsREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQ2ZBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO3dCQUNYQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFDWEEsQ0FBQ0E7b0JBQUNBLElBQUlBLENBQUNBLENBQUNBO3dCQUNQQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQTt3QkFDVkEsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBQ1hBLENBQUNBO29CQUVEQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDM0JBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLFNBQVNBLENBQUNBLFVBQVVBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO3dCQUM1Q0EsU0FBU0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsU0FBU0EsQ0FBQ0EsVUFBVUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQ2hEQSxTQUFTQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxTQUFTQSxDQUFDQSxVQUFVQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDakRBLENBQUNBO29CQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTt3QkFDUEEsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7d0JBQ3BCQSxTQUFTQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQTt3QkFDNUJBLFNBQVNBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBO29CQUM3QkEsQ0FBQ0E7b0JBRURBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO29CQUNsQkEsT0FBT0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7b0JBQ3ZCQSxPQUFPQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTtvQkFDdkJBLFFBQVFBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO29CQUNuQkEsUUFBUUEsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBQ3ZCQSxRQUFRQSxDQUFDQSxJ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R0EsV0FBV0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsZUFBZUEsQ0FBQ0EsQ0FBQ0E7d0JBQzVDQSxHQUFHQSxHQUFHQSxXQUFXQSxHQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxlQUFlQSxDQUFDQSxDQUFDQTt3QkFFNUNBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBOzRCQUNmQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQTs0QkFDUEEsRUFBRUEsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0E7NEJBQ1ZBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBOzRCQUNYQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQTs0QkFDVkEsT0FBT0EsR0FBR0EsV0FBV0EsQ0FBQ0E7NEJBQ3RCQSxPQUFPQSxHQUFHQSxHQUFHQSxDQUFDQTt3QkFFZkEsQ0FBQ0E7d0JBQUNBLElBQUlBLENBQUNBLENBQUNBOzRCQUNQQSxFQUFFQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQTs0QkFDVkEsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0E7NEJBQ1BBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBOzRCQUNWQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQTs0QkFDVkEsT0FBT0EsR0FBR0EsR0FBR0EsQ0FBQ0E7NEJBQ2RBLE9BQU9BLEdBQUdBLFdBQVdBLENBQUNBO3dCQUN2QkEsQ0FBQ0E7d0JBRURBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBLENBQUNBOzRCQUMzQkEsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsU0FBU0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0E7NEJBQ3hDQSxTQUFTQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxTQUFTQSxDQUFDQSxVQUFVQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTs0QkFDaERBLFNBQVNBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLFNBQVNBLENBQUNBLFVBQVVBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBOzRCQUNoREEsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsR0FBR0EsQ0FBQ0E7NEJBQ3BCQSxPQUFPQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxXQUFXQSxDQUFDQTs0QkFDaENBLE9BQU9BLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEdBQUdBLENBQUNBOzRCQUN4QkEsUUFBUUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsR0FBR0EsQ0FBQ0E7NEJBQ3JCQSxRQUFRQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTs0QkFDeEJBLFFBQVFBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO3dCQUN6QkEsQ0FBQ0E7d0JBQUNBLElBQUlBLENBQUNBLENBQUNBOzRCQUNQQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTs0QkFDcEJBLFNBQVNBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBOzRCQUM1QkEsU0FBU0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0E7NEJBQzVCQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxHQUFHQSxDQUFDQTs0QkFDcEJBLE9BQU9BLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLE9BQU9BLENBQUNBOzRCQUM1QkEsT0FBT0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsT0FBT0EsQ0FBQ0E7NEJBQzVCQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQTs0QkFDdEJBLFFBQVFBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdB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RUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQ2ZBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO3dCQUNYQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFDWEEsQ0FBQ0E7b0JBQUNBLElBQUlBLENBQUNBLENBQUNBO3dCQUNQQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQTt3QkFDVkEsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBQ1hBLENBQUNBO29CQUVEQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDWEEsWUFBWUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7d0JBQ3ZCQSxZQUFZQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQTt3QkFDL0JBLFlBQVlBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBO3dCQUUvQkEsU0FBU0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7d0JBRXRCQSxJQUFJQSxJQUFJQSxDQUFDQSxDQUFDQTt3QkFFVkEsQUFDQUEsZ0JBRGdCQTt3QkFDaEJBLGNBQWNBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLFlBQVlBLENBQUNBLElBQUlBLEdBQUdBLElBQUlBLENBQUNBLFdBQVdBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBO3dCQUMvREEsY0FBY0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsWUFBWUEsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsV0FBV0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQ3ZFQSxjQUFjQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxZQUFZQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxXQUFXQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFFdkVBLFlBQVlBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO3dCQUN2QkEsWUFBWUEsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0E7d0JBQy9CQSxZQUFZQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQTt3QkFFL0JBLFNBQVNBLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO3dCQUV0QkEsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7b0JBQ1hBLENBQUNBO29CQUVEQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDMUJBLGNBQWNBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO3dCQUN6QkEsY0FBY0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0E7d0JBQ2pDQSxjQUFjQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQTtvQkFDbENBLENBQUNBO2dCQUNGQSxDQUFDQTtZQUNGQSxDQUFDQTtZQUVEQSxBQUNBQSxnQ0FEZ0NBO1lBQ2hDQSxZQUFZQSxDQUFDQSxlQUFlQSxDQUFDQSxjQUFjQSxFQUFFQSxZQUFZQSxDQUFDQSxDQUFDQTtZQUMzREEsWUFBWUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0E7UUFDekNBLENBQUNBO0lBQ0ZBLENBQUNBO0lBRURaOztPQUVHQTtJQUNJQSw0Q0FBVUEsR0FBakJBLFVBQWtCQSxNQUFzQkEsRUFBRUEsWUFBbUJBO1FBRTVEYSxJQUFJQSxDQUFRQSxDQUFDQTtRQUNiQSxJQUFJQSxDQUFRQSxDQUFDQTtRQUNiQSxJQUFJQSxDQUFRQSxDQUFDQTtRQUNiQSxJQUFJQSxDQUFRQSxDQUFDQTtRQUNiQSxJQUFJQSxlQUFzQkEsQ0FBQ0E7UUFDM0JBLElBQUlBLEdBQWlCQSxDQUFDQTtRQUV0QkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsWUFBWUEsSUFBSUEscUJBQXFCQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUUzQ0EsSUFBSUEsZ0JBQWdCQSxHQUE2Q0EsTUFBTUEsQ0FBQ0E7WUFFeEVBLEFBQ0FBLGlEQURpREE7WUFDakRBLEVBQUVBLENBQUNBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsR0FBR0EsSUFBSUEsSUFBSUEsQ0FBQ0EsWUFBWUEsSUFBSUEsZ0JBQWdCQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDL0VBLEdBQUdBLEdBQUdBLGdCQUFnQkEsQ0FBQ0EsR0FBR0EsQ0FBQ0E7WUFDNUJBLENBQUNBO1lBQUNBLElBQUlBLENBQUNBLENBQUNBO2dCQUNQQSxHQUFHQSxHQUFHQSxJQUFJQSxLQUFLQSxDQUFTQSxJQUFJQSxDQUFDQSxZQUFZQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUM5Q0EsQ0FBQ0E7WUFFREEsQUFDQUEsNEJBRDRCQTtnQkFDeEJBLG9CQUFvQkEsR0FBVUEsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBQ0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0E7WUFFN0RBLEFBQ0FBLDZCQUQ2QkE7Z0JBQ3pCQSxLQUFLQSxHQUFVQSxDQUFDQSxDQUFDQTtZQUVyQkEsQUFDQUEsTUFETUE7WUFDTkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3JCQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxXQUFXQSxFQUFFQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQTtvQkFFeENBLGVBQWVBLEdBQUdBLENBQUNBLEdBQUNBLG9CQUFvQkEsQ0FBQ0E7b0JBQ3pDQSxDQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFFQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxlQUFlQSxDQUFDQSxDQUFDQTtvQkFDMUNBLENBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLGVBQWVBLENBQUNBLENBQUNBO29CQUV4Q0EsR0FBR0EsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0EsR0FBR0EsR0FBR0EsR0FBQ0EsZ0JBQWdCQSxDQUFDQSxNQUFNQSxFQUFFQSxpQkFBaUJBO29CQUM3REEsR0FBR0EsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0EsR0FBR0EsR0FBR0EsR0FBQ0EsZ0JBQWdCQSxDQUFDQSxNQUFNQSxDQUFDQTtvQkFFM0NBLEdBQUdBLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLEdBQUNBLGdCQUFnQkEsQ0FBQ0EsTUFBTUEsRUFBRUEsb0JBQW9CQTtvQkFDOURBLEdBQUdBLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLEdBQUNBLGdCQUFnQkEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7Z0JBQzFDQSxDQUFDQTtZQUNGQSxDQUFDQTtZQUVEQSxBQUNBQSxTQURTQTtZQUNUQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDeEJBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLFdBQVdBLEVBQUVBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBO29CQUV4Q0EsZUFBZUEsR0FBR0EsQ0FBQ0EsR0FBQ0Esb0JBQW9CQSxDQUFDQTtvQkFDekNBLENBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLGVBQWVBLENBQUNBLENBQUNBO29CQUN4Q0EsQ0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsZUFBZUEsQ0FBQ0EsQ0FBQ0E7b0JBRXhDQSxHQUFHQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQSxHQUFHQSxHQUFHQSxHQUFDQSxnQkFBZ0JBLENBQUNBLE1BQU1BLEVBQUVBLGlCQUFpQkE7b0JBQzdEQSxHQUFHQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQSxHQUFHQSxHQUFHQSxHQUFDQSxnQkFBZ0JBLENBQUNBLE1BQU1BLENBQUNBO29CQUUzQ0EsR0FBR0EsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBQ0EsZ0JBQWdCQSxDQUFDQSxNQUFNQSxFQUFFQSxvQkFBb0JBO29CQUM5REEsR0FBR0EsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBQ0EsZ0JBQWdCQSxDQUFDQSxNQUFNQSxDQUFDQTtnQkFDMUNBLENBQUNBO1lBQ0ZBLENBQUNBO1lBRURBLEFBQ0FBLGtCQURrQkE7WUFDbEJBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLGNBQWNBLENBQUNBLENBQUNBLENBQUNBO2dCQUN6QkEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsV0FBV0EsRUFBRUEsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7b0JBQ3hDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxXQUFXQSxFQUFFQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQTt3QkFDeENBLEFBQ0FBLG9CQURvQkE7d0JBQ3BCQSxHQUFHQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFFQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFFQSxHQUFDQSxnQkFBZ0JBLENBQUNBLE1BQU1BLENBQUNBO3dCQUM5REEsR0FBR0EsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBRUEsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBRUEsR0FBQ0EsZ0JBQWdCQSxDQUFDQSxNQUFNQSxDQUFDQTtvQkFDL0RBLENBQUNBO2dCQUNGQSxDQUFDQTtZQUNGQSxDQUFDQTtZQUVEQSxBQUNBQSxnQ0FEZ0NBO1lBQ2hDQSxnQkFBZ0JBLENBQUNBLFNBQVNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1FBRWpDQSxDQUFDQTtRQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxZQUFZQSxJQUFJQSxpQkFBaUJBLENBQUNBLENBQUNBLENBQUNBO1FBRS9DQSxDQUFDQTtJQUNGQSxDQUFDQTtJQUNGYiw4QkFBQ0E7QUFBREEsQ0E1b0JBLEFBNG9CQ0EsRUE1b0JxQyxtQkFBbUIsRUE0b0J4RDtBQUVELEFBQWlDLGlCQUF4Qix1QkFBdUIsQ0FBQyIsImZpbGUiOiJwcmVmYWJzL1ByaW1pdGl2ZUN5bGluZGVyUHJlZmFiLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBJQXNzZXRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvSUFzc2V0XCIpO1xyXG5cclxuaW1wb3J0IExpbmVTdWJHZW9tZXRyeVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0xpbmVTdWJHZW9tZXRyeVwiKTtcclxuaW1wb3J0IFN1Ykdlb21ldHJ5QmFzZVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL1N1Ykdlb21ldHJ5QmFzZVwiKTtcclxuaW1wb3J0IFRyaWFuZ2xlU3ViR2VvbWV0cnlcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvVHJpYW5nbGVTdWJHZW9tZXRyeVwiKTtcclxuaW1wb3J0IFByaW1pdGl2ZVByZWZhYkJhc2VcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3ByZWZhYnMvUHJpbWl0aXZlUHJlZmFiQmFzZVwiKTtcclxuXHJcbi8qKlxyXG4gKiBBIEN5bGluZGVyIHByaW1pdGl2ZSBtZXNoLlxyXG4gKi9cclxuY2xhc3MgUHJpbWl0aXZlQ3lsaW5kZXJQcmVmYWIgZXh0ZW5kcyBQcmltaXRpdmVQcmVmYWJCYXNlIGltcGxlbWVudHMgSUFzc2V0XHJcbntcclxuXHRwdWJsaWMgX3BCb3R0b21SYWRpdXM6bnVtYmVyO1xyXG5cdHB1YmxpYyBfcFNlZ21lbnRzVzpudW1iZXI7XHJcblx0cHVibGljIF9wU2VnbWVudHNIOm51bWJlcjtcclxuXHJcblx0cHJpdmF0ZSBfdG9wUmFkaXVzOm51bWJlcjtcclxuXHRwcml2YXRlIF9oZWlnaHQ6bnVtYmVyO1xyXG5cclxuXHRwcml2YXRlIF90b3BDbG9zZWQ6Ym9vbGVhbjtcclxuXHRwcml2YXRlIF9ib3R0b21DbG9zZWQ6Ym9vbGVhbjtcclxuXHRwcml2YXRlIF9zdXJmYWNlQ2xvc2VkOmJvb2xlYW47XHJcblx0cHJpdmF0ZSBfeVVwOmJvb2xlYW47XHJcblx0cHJpdmF0ZSBfbnVtVmVydGljZXM6bnVtYmVyID0gMDtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIHJhZGl1cyBvZiB0aGUgdG9wIGVuZCBvZiB0aGUgY3lsaW5kZXIuXHJcblx0ICovXHJcblx0cHVibGljIGdldCB0b3BSYWRpdXMoKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fdG9wUmFkaXVzO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCB0b3BSYWRpdXModmFsdWU6bnVtYmVyKVxyXG5cdHtcclxuXHRcdHRoaXMuX3RvcFJhZGl1cyA9IHZhbHVlO1xyXG5cdFx0dGhpcy5fcEludmFsaWRhdGVHZW9tZXRyeSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIHJhZGl1cyBvZiB0aGUgYm90dG9tIGVuZCBvZiB0aGUgY3lsaW5kZXIuXHJcblx0ICovXHJcblx0cHVibGljIGdldCBib3R0b21SYWRpdXMoKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcEJvdHRvbVJhZGl1cztcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgYm90dG9tUmFkaXVzKHZhbHVlOm51bWJlcilcclxuXHR7XHJcblx0XHR0aGlzLl9wQm90dG9tUmFkaXVzID0gdmFsdWU7XHJcblx0XHR0aGlzLl9wSW52YWxpZGF0ZUdlb21ldHJ5KCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgcmFkaXVzIG9mIHRoZSB0b3AgZW5kIG9mIHRoZSBjeWxpbmRlci5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGhlaWdodCgpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9oZWlnaHQ7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IGhlaWdodCh2YWx1ZTpudW1iZXIpXHJcblx0e1xyXG5cdFx0dGhpcy5faGVpZ2h0ID0gdmFsdWU7XHJcblx0XHR0aGlzLl9wSW52YWxpZGF0ZUdlb21ldHJ5KCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEZWZpbmVzIHRoZSBudW1iZXIgb2YgaG9yaXpvbnRhbCBzZWdtZW50cyB0aGF0IG1ha2UgdXAgdGhlIGN5bGluZGVyLiBEZWZhdWx0cyB0byAxNi5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHNlZ21lbnRzVygpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9wU2VnbWVudHNXO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBzZWdtZW50c1codmFsdWU6bnVtYmVyKVxyXG5cdHtcclxuXHRcdHRoaXMuc2V0U2VnbWVudHNXKHZhbHVlKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXRTZWdtZW50c1codmFsdWU6bnVtYmVyKVxyXG5cdHtcclxuXHRcdHRoaXMuX3BTZWdtZW50c1cgPSB2YWx1ZTtcclxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlR2VvbWV0cnkoKTtcclxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlVVZzKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEZWZpbmVzIHRoZSBudW1iZXIgb2YgdmVydGljYWwgc2VnbWVudHMgdGhhdCBtYWtlIHVwIHRoZSBjeWxpbmRlci4gRGVmYXVsdHMgdG8gMS5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHNlZ21lbnRzSCgpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9wU2VnbWVudHNIO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBzZWdtZW50c0godmFsdWU6bnVtYmVyKVxyXG5cdHtcclxuXHJcblx0XHR0aGlzLnNldFNlZ21lbnRzSCh2YWx1ZSlcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0U2VnbWVudHNIKHZhbHVlOm51bWJlcilcclxuXHR7XHJcblx0XHR0aGlzLl9wU2VnbWVudHNIID0gdmFsdWU7XHJcblx0XHR0aGlzLl9wSW52YWxpZGF0ZUdlb21ldHJ5KCk7XHJcblx0XHR0aGlzLl9wSW52YWxpZGF0ZVVWcygpO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIERlZmluZXMgd2hldGhlciB0aGUgdG9wIGVuZCBvZiB0aGUgY3lsaW5kZXIgaXMgY2xvc2VkICh0cnVlKSBvciBvcGVuLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgdG9wQ2xvc2VkKCk6Ym9vbGVhblxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl90b3BDbG9zZWQ7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHRvcENsb3NlZCh2YWx1ZTpib29sZWFuKVxyXG5cdHtcclxuXHRcdHRoaXMuX3RvcENsb3NlZCA9IHZhbHVlO1xyXG5cdFx0dGhpcy5fcEludmFsaWRhdGVHZW9tZXRyeSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRGVmaW5lcyB3aGV0aGVyIHRoZSBib3R0b20gZW5kIG9mIHRoZSBjeWxpbmRlciBpcyBjbG9zZWQgKHRydWUpIG9yIG9wZW4uXHJcblx0ICovXHJcblx0cHVibGljIGdldCBib3R0b21DbG9zZWQoKTpib29sZWFuXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2JvdHRvbUNsb3NlZDtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgYm90dG9tQ2xvc2VkKHZhbHVlOmJvb2xlYW4pXHJcblx0e1xyXG5cdFx0dGhpcy5fYm90dG9tQ2xvc2VkID0gdmFsdWU7XHJcblx0XHR0aGlzLl9wSW52YWxpZGF0ZUdlb21ldHJ5KCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEZWZpbmVzIHdoZXRoZXIgdGhlIGN5bGluZGVyIHBvbGVzIHNob3VsZCBsYXkgb24gdGhlIFktYXhpcyAodHJ1ZSkgb3Igb24gdGhlIFotYXhpcyAoZmFsc2UpLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgeVVwKCk6Ym9vbGVhblxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl95VXA7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHlVcCh2YWx1ZTpib29sZWFuKVxyXG5cdHtcclxuXHRcdHRoaXMuX3lVcCA9IHZhbHVlO1xyXG5cdFx0dGhpcy5fcEludmFsaWRhdGVHZW9tZXRyeSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhIG5ldyBDeWxpbmRlciBvYmplY3QuXHJcblx0ICogQHBhcmFtIHRvcFJhZGl1cyBUaGUgcmFkaXVzIG9mIHRoZSB0b3AgZW5kIG9mIHRoZSBjeWxpbmRlci5cclxuXHQgKiBAcGFyYW0gYm90dG9tUmFkaXVzIFRoZSByYWRpdXMgb2YgdGhlIGJvdHRvbSBlbmQgb2YgdGhlIGN5bGluZGVyXHJcblx0ICogQHBhcmFtIGhlaWdodCBUaGUgcmFkaXVzIG9mIHRoZSBib3R0b20gZW5kIG9mIHRoZSBjeWxpbmRlclxyXG5cdCAqIEBwYXJhbSBzZWdtZW50c1cgRGVmaW5lcyB0aGUgbnVtYmVyIG9mIGhvcml6b250YWwgc2VnbWVudHMgdGhhdCBtYWtlIHVwIHRoZSBjeWxpbmRlci4gRGVmYXVsdHMgdG8gMTYuXHJcblx0ICogQHBhcmFtIHNlZ21lbnRzSCBEZWZpbmVzIHRoZSBudW1iZXIgb2YgdmVydGljYWwgc2VnbWVudHMgdGhhdCBtYWtlIHVwIHRoZSBjeWxpbmRlci4gRGVmYXVsdHMgdG8gMS5cclxuXHQgKiBAcGFyYW0gdG9wQ2xvc2VkIERlZmluZXMgd2hldGhlciB0aGUgdG9wIGVuZCBvZiB0aGUgY3lsaW5kZXIgaXMgY2xvc2VkICh0cnVlKSBvciBvcGVuLlxyXG5cdCAqIEBwYXJhbSBib3R0b21DbG9zZWQgRGVmaW5lcyB3aGV0aGVyIHRoZSBib3R0b20gZW5kIG9mIHRoZSBjeWxpbmRlciBpcyBjbG9zZWQgKHRydWUpIG9yIG9wZW4uXHJcblx0ICogQHBhcmFtIHlVcCBEZWZpbmVzIHdoZXRoZXIgdGhlIGNvbmUgcG9sZXMgc2hvdWxkIGxheSBvbiB0aGUgWS1heGlzICh0cnVlKSBvciBvbiB0aGUgWi1heGlzIChmYWxzZSkuXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IodG9wUmFkaXVzOm51bWJlciA9IDUwLCBib3R0b21SYWRpdXM6bnVtYmVyID0gNTAsIGhlaWdodDpudW1iZXIgPSAxMDAsIHNlZ21lbnRzVzpudW1iZXIgPSAxNiwgc2VnbWVudHNIOm51bWJlciA9IDEsIHRvcENsb3NlZDpib29sZWFuID0gdHJ1ZSwgYm90dG9tQ2xvc2VkOmJvb2xlYW4gPSB0cnVlLCBzdXJmYWNlQ2xvc2VkOmJvb2xlYW4gPSB0cnVlLCB5VXA6Ym9vbGVhbiA9IHRydWUpXHJcblx0e1xyXG5cdFx0c3VwZXIoKTtcclxuXHJcblx0XHR0aGlzLl90b3BSYWRpdXMgPSB0b3BSYWRpdXM7XHJcblx0XHR0aGlzLl9wQm90dG9tUmFkaXVzID0gYm90dG9tUmFkaXVzO1xyXG5cdFx0dGhpcy5faGVpZ2h0ID0gaGVpZ2h0O1xyXG5cdFx0dGhpcy5fcFNlZ21lbnRzVyA9IHNlZ21lbnRzVztcclxuXHRcdHRoaXMuX3BTZWdtZW50c0ggPSBzZWdtZW50c0g7XHJcblx0XHR0aGlzLl90b3BDbG9zZWQgPSB0b3BDbG9zZWQ7XHJcblx0XHR0aGlzLl9ib3R0b21DbG9zZWQgPSBib3R0b21DbG9zZWQ7XHJcblx0XHR0aGlzLl9zdXJmYWNlQ2xvc2VkID0gc3VyZmFjZUNsb3NlZDtcclxuXHRcdHRoaXMuX3lVcCA9IHlVcDtcclxuXHR9XHJcblxyXG5cclxuXHQvKipcclxuXHQgKiBAaW5oZXJpdERvY1xyXG5cdCAqL1xyXG5cdHB1YmxpYyBfcEJ1aWxkR2VvbWV0cnkodGFyZ2V0OlN1Ykdlb21ldHJ5QmFzZSwgZ2VvbWV0cnlUeXBlOnN0cmluZylcclxuXHR7XHJcblx0XHR2YXIgaW5kaWNlczpBcnJheTxudW1iZXI+IC8qdWludCovO1xyXG5cdFx0dmFyIHBvc2l0aW9uczpBcnJheTxudW1iZXI+O1xyXG5cdFx0dmFyIG5vcm1hbHM6QXJyYXk8bnVtYmVyPjtcclxuXHRcdHZhciB0YW5nZW50czpBcnJheTxudW1iZXI+O1xyXG5cclxuXHRcdHZhciBpOm51bWJlcjtcclxuXHRcdHZhciBqOm51bWJlcjtcclxuXHRcdHZhciB4Om51bWJlcjtcclxuXHRcdHZhciB5Om51bWJlcjtcclxuXHRcdHZhciB6Om51bWJlcjtcclxuXHRcdHZhciB2aWR4Om51bWJlcjtcclxuXHRcdHZhciBmaWR4Om51bWJlcjtcclxuXHJcblx0XHR2YXIgcmFkaXVzOm51bWJlcjtcclxuXHRcdHZhciByZXZvbHV0aW9uQW5nbGU6bnVtYmVyO1xyXG5cclxuXHRcdHZhciBkcjpudW1iZXI7XHJcblx0XHR2YXIgbGF0Tm9ybUVsZXY6bnVtYmVyO1xyXG5cdFx0dmFyIGxhdE5vcm1CYXNlOm51bWJlcjtcclxuXHRcdHZhciBudW1JbmRpY2VzOm51bWJlciA9IDA7XHJcblxyXG5cdFx0dmFyIGNvbXAxOm51bWJlcjtcclxuXHRcdHZhciBjb21wMjpudW1iZXI7XHJcblx0XHR2YXIgc3RhcnRJbmRleDpudW1iZXIgPSAwO1xyXG5cdFx0dmFyIG5leHRWZXJ0ZXhJbmRleDpudW1iZXIgPSAwO1xyXG5cclxuXHRcdHZhciB0MTpudW1iZXI7XHJcblx0XHR2YXIgdDI6bnVtYmVyO1xyXG5cclxuXHRcdC8vIHJlc2V0IHV0aWxpdHkgdmFyaWFibGVzXHJcblx0XHR0aGlzLl9udW1WZXJ0aWNlcyA9IDA7XHJcblxyXG5cdFx0Ly8gZXZhbHVhdGUgcmV2b2x1dGlvbiBzdGVwc1xyXG5cdFx0dmFyIHJldm9sdXRpb25BbmdsZURlbHRhOm51bWJlciA9IDIqTWF0aC5QSS90aGlzLl9wU2VnbWVudHNXO1xyXG5cclxuXHRcdGlmIChnZW9tZXRyeVR5cGUgPT0gXCJ0cmlhbmdsZVN1Ykdlb21ldHJ5XCIpIHtcclxuXHJcblx0XHRcdHZhciB0cmlhbmdsZUdlb21ldHJ5OlRyaWFuZ2xlU3ViR2VvbWV0cnkgPSA8VHJpYW5nbGVTdWJHZW9tZXRyeT4gdGFyZ2V0O1xyXG5cclxuXHRcdFx0Ly8gZXZhbHVhdGUgdGFyZ2V0IG51bWJlciBvZiB2ZXJ0aWNlcywgdHJpYW5nbGVzIGFuZCBpbmRpY2VzXHJcblx0XHRcdGlmICh0aGlzLl9zdXJmYWNlQ2xvc2VkKSB7XHJcblx0XHRcdFx0dGhpcy5fbnVtVmVydGljZXMgKz0gKHRoaXMuX3BTZWdtZW50c0ggKyAxKSoodGhpcy5fcFNlZ21lbnRzVyArIDEpOyAvLyBzZWdtZW50c0ggKyAxIGJlY2F1c2Ugb2YgY2xvc3VyZSwgc2VnbWVudHNXICsgMSBiZWNhdXNlIG9mIFVWIHVud3JhcHBpbmdcclxuXHRcdFx0XHRudW1JbmRpY2VzICs9IHRoaXMuX3BTZWdtZW50c0gqdGhpcy5fcFNlZ21lbnRzVyo2OyAvLyBlYWNoIGxldmVsIGhhcyBzZWdtZW50VyBxdWFkcywgZWFjaCBvZiAyIHRyaWFuZ2xlc1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmICh0aGlzLl90b3BDbG9zZWQpIHtcclxuXHRcdFx0XHR0aGlzLl9udW1WZXJ0aWNlcyArPSAyKih0aGlzLl9wU2VnbWVudHNXICsgMSk7IC8vIHNlZ21lbnRzVyArIDEgYmVjYXVzZSBvZiB1bndyYXBwaW5nXHJcblx0XHRcdFx0bnVtSW5kaWNlcyArPSB0aGlzLl9wU2VnbWVudHNXKjM7IC8vIG9uZSB0cmlhbmdsZSBmb3IgZWFjaCBzZWdtZW50XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKHRoaXMuX2JvdHRvbUNsb3NlZCkge1xyXG5cdFx0XHRcdHRoaXMuX251bVZlcnRpY2VzICs9IDIqKHRoaXMuX3BTZWdtZW50c1cgKyAxKTtcclxuXHRcdFx0XHRudW1JbmRpY2VzICs9IHRoaXMuX3BTZWdtZW50c1cqMztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gbmVlZCB0byBpbml0aWFsaXplIHJhdyBhcnJheXMgb3IgY2FuIGJlIHJldXNlZD9cclxuXHRcdFx0aWYgKHRoaXMuX251bVZlcnRpY2VzID09IHRyaWFuZ2xlR2VvbWV0cnkubnVtVmVydGljZXMpIHtcclxuXHRcdFx0XHRpbmRpY2VzID0gdHJpYW5nbGVHZW9tZXRyeS5pbmRpY2VzO1xyXG5cdFx0XHRcdHBvc2l0aW9ucyA9IHRyaWFuZ2xlR2VvbWV0cnkucG9zaXRpb25zO1xyXG5cdFx0XHRcdG5vcm1hbHMgPSB0cmlhbmdsZUdlb21ldHJ5LnZlcnRleE5vcm1hbHM7XHJcblx0XHRcdFx0dGFuZ2VudHMgPSB0cmlhbmdsZUdlb21ldHJ5LnZlcnRleFRhbmdlbnRzO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGluZGljZXMgPSBuZXcgQXJyYXk8bnVtYmVyPihudW1JbmRpY2VzKVxyXG5cdFx0XHRcdHBvc2l0aW9ucyA9IG5ldyBBcnJheTxudW1iZXI+KHRoaXMuX251bVZlcnRpY2VzKjMpO1xyXG5cdFx0XHRcdG5vcm1hbHMgPSBuZXcgQXJyYXk8bnVtYmVyPih0aGlzLl9udW1WZXJ0aWNlcyozKTtcclxuXHRcdFx0XHR0YW5nZW50cyA9IG5ldyBBcnJheTxudW1iZXI+KHRoaXMuX251bVZlcnRpY2VzKjMpO1xyXG5cclxuXHRcdFx0XHR0aGlzLl9wSW52YWxpZGF0ZVVWcygpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2aWR4ID0gMDtcclxuXHRcdFx0ZmlkeCA9IDA7XHJcblxyXG5cdFx0XHQvLyB0b3BcclxuXHRcdFx0aWYgKHRoaXMuX3RvcENsb3NlZCAmJiB0aGlzLl90b3BSYWRpdXMgPiAwKSB7XHJcblxyXG5cdFx0XHRcdHogPSAtMC41KnRoaXMuX2hlaWdodDtcclxuXHJcblx0XHRcdFx0Zm9yIChpID0gMDsgaSA8PSB0aGlzLl9wU2VnbWVudHNXOyArK2kpIHtcclxuXHRcdFx0XHRcdC8vIGNlbnRyYWwgdmVydGV4XHJcblx0XHRcdFx0XHRpZiAodGhpcy5feVVwKSB7XHJcblx0XHRcdFx0XHRcdHQxID0gMTtcclxuXHRcdFx0XHRcdFx0dDIgPSAwO1xyXG5cdFx0XHRcdFx0XHRjb21wMSA9IC16O1xyXG5cdFx0XHRcdFx0XHRjb21wMiA9IDA7XHJcblxyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0dDEgPSAwO1xyXG5cdFx0XHRcdFx0XHR0MiA9IC0xO1xyXG5cdFx0XHRcdFx0XHRjb21wMSA9IDA7XHJcblx0XHRcdFx0XHRcdGNvbXAyID0gejtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRwb3NpdGlvbnNbdmlkeF0gPSAwO1xyXG5cdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHggKyAxXSA9IGNvbXAxO1xyXG5cdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHggKyAyXSA9IGNvbXAyO1xyXG5cdFx0XHRcdFx0bm9ybWFsc1t2aWR4XSA9IDA7XHJcblx0XHRcdFx0XHRub3JtYWxzW3ZpZHggKyAxXSA9IHQxO1xyXG5cdFx0XHRcdFx0bm9ybWFsc1t2aWR4ICsgMl0gPSB0MjtcclxuXHRcdFx0XHRcdHRhbmdlbnRzW3ZpZHhdID0gMTtcclxuXHRcdFx0XHRcdHRhbmdlbnRzW3ZpZHggKyAxXSA9IDA7XHJcblx0XHRcdFx0XHR0YW5nZW50c1t2aWR4ICsgMl0gPSAwO1xyXG5cdFx0XHRcdFx0dmlkeCArPSAzO1xyXG5cclxuXHRcdFx0XHRcdC8vIHJldm9sdXRpb24gdmVydGV4XHJcblx0XHRcdFx0XHRyZXZvbHV0aW9uQW5nbGUgPSBpKnJldm9sdXRpb25BbmdsZURlbHRhO1xyXG5cdFx0XHRcdFx0eCA9IHRoaXMuX3RvcFJhZGl1cypNYXRoLmNvcyhyZXZvbHV0aW9uQW5nbGUpO1xyXG5cdFx0XHRcdFx0eSA9IHRoaXMuX3RvcFJhZGl1cypNYXRoLnNpbihyZXZvbHV0aW9uQW5nbGUpO1xyXG5cclxuXHRcdFx0XHRcdGlmICh0aGlzLl95VXApIHtcclxuXHRcdFx0XHRcdFx0Y29tcDEgPSAtejtcclxuXHRcdFx0XHRcdFx0Y29tcDIgPSB5O1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0Y29tcDEgPSB5O1xyXG5cdFx0XHRcdFx0XHRjb21wMiA9IHo7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0aWYgKGkgPT0gdGhpcy5fcFNlZ21lbnRzVykge1xyXG5cdFx0XHRcdFx0XHRwb3NpdGlvbnNbdmlkeF0gPSBwb3NpdGlvbnNbc3RhcnRJbmRleCArIDNdO1xyXG5cdFx0XHRcdFx0XHRwb3NpdGlvbnNbdmlkeCArIDFdID0gcG9zaXRpb25zW3N0YXJ0SW5kZXggKyA0XTtcclxuXHRcdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHggKyAyXSA9IHBvc2l0aW9uc1tzdGFydEluZGV4ICsgNV07XHJcblxyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHhdID0geDtcclxuXHRcdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHggKyAxXSA9IGNvbXAxO1xyXG5cdFx0XHRcdFx0XHRwb3NpdGlvbnNbdmlkeCArIDJdID0gY29tcDI7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0bm9ybWFsc1t2aWR4XSA9IDA7XHJcblx0XHRcdFx0XHRub3JtYWxzW3ZpZHggKyAxXSA9IHQxO1xyXG5cdFx0XHRcdFx0bm9ybWFsc1t2aWR4ICsgMl0gPSB0MjtcclxuXHRcdFx0XHRcdHRhbmdlbnRzW3ZpZHhdID0gMTtcclxuXHRcdFx0XHRcdHRhbmdlbnRzW3ZpZHggKyAxXSA9IDA7XHJcblx0XHRcdFx0XHR0YW5nZW50c1t2aWR4ICsgMl0gPSAwO1xyXG5cdFx0XHRcdFx0dmlkeCArPSAzO1xyXG5cclxuXHRcdFx0XHRcdGlmIChpID4gMCkge1xyXG5cdFx0XHRcdFx0XHQvLyBhZGQgdHJpYW5nbGVcclxuXHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gbmV4dFZlcnRleEluZGV4O1xyXG5cdFx0XHRcdFx0XHRpbmRpY2VzW2ZpZHgrK10gPSBuZXh0VmVydGV4SW5kZXggKyAxO1xyXG5cdFx0XHRcdFx0XHRpbmRpY2VzW2ZpZHgrK10gPSBuZXh0VmVydGV4SW5kZXggKyAyO1xyXG5cclxuXHRcdFx0XHRcdFx0bmV4dFZlcnRleEluZGV4ICs9IDI7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRuZXh0VmVydGV4SW5kZXggKz0gMjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gYm90dG9tXHJcblx0XHRcdGlmICh0aGlzLl9ib3R0b21DbG9zZWQgJiYgdGhpcy5fcEJvdHRvbVJhZGl1cyA+IDApIHtcclxuXHJcblx0XHRcdFx0eiA9IDAuNSp0aGlzLl9oZWlnaHQ7XHJcblxyXG5cdFx0XHRcdHN0YXJ0SW5kZXggPSBuZXh0VmVydGV4SW5kZXgqMztcclxuXHJcblx0XHRcdFx0Zm9yIChpID0gMDsgaSA8PSB0aGlzLl9wU2VnbWVudHNXOyArK2kpIHtcclxuXHRcdFx0XHRcdGlmICh0aGlzLl95VXApIHtcclxuXHRcdFx0XHRcdFx0dDEgPSAtMTtcclxuXHRcdFx0XHRcdFx0dDIgPSAwO1xyXG5cdFx0XHRcdFx0XHRjb21wMSA9IC16O1xyXG5cdFx0XHRcdFx0XHRjb21wMiA9IDA7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHR0MSA9IDA7XHJcblx0XHRcdFx0XHRcdHQyID0gMTtcclxuXHRcdFx0XHRcdFx0Y29tcDEgPSAwO1xyXG5cdFx0XHRcdFx0XHRjb21wMiA9IHo7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHhdID0gMDtcclxuXHRcdFx0XHRcdHBvc2l0aW9uc1t2aWR4ICsgMV0gPSBjb21wMTtcclxuXHRcdFx0XHRcdHBvc2l0aW9uc1t2aWR4ICsgMl0gPSBjb21wMjtcclxuXHRcdFx0XHRcdG5vcm1hbHNbdmlkeF0gPSAwO1xyXG5cdFx0XHRcdFx0bm9ybWFsc1t2aWR4ICsgMV0gPSB0MTtcclxuXHRcdFx0XHRcdG5vcm1hbHNbdmlkeCArIDJdID0gdDI7XHJcblx0XHRcdFx0XHR0YW5nZW50c1t2aWR4XSA9IDE7XHJcblx0XHRcdFx0XHR0YW5nZW50c1t2aWR4ICsgMV0gPSAwO1xyXG5cdFx0XHRcdFx0dGFuZ2VudHNbdmlkeCArIDJdID0gMDtcclxuXHRcdFx0XHRcdHZpZHggKz0gMztcclxuXHJcblx0XHRcdFx0XHQvLyByZXZvbHV0aW9uIHZlcnRleFxyXG5cdFx0XHRcdFx0cmV2b2x1dGlvbkFuZ2xlID0gaSpyZXZvbHV0aW9uQW5nbGVEZWx0YTtcclxuXHRcdFx0XHRcdHggPSB0aGlzLl9wQm90dG9tUmFkaXVzKk1hdGguY29zKHJldm9sdXRpb25BbmdsZSk7XHJcblx0XHRcdFx0XHR5ID0gdGhpcy5fcEJvdHRvbVJhZGl1cypNYXRoLnNpbihyZXZvbHV0aW9uQW5nbGUpO1xyXG5cclxuXHRcdFx0XHRcdGlmICh0aGlzLl95VXApIHtcclxuXHRcdFx0XHRcdFx0Y29tcDEgPSAtejtcclxuXHRcdFx0XHRcdFx0Y29tcDIgPSB5O1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0Y29tcDEgPSB5O1xyXG5cdFx0XHRcdFx0XHRjb21wMiA9IHo7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0aWYgKGkgPT0gdGhpcy5fcFNlZ21lbnRzVykge1xyXG5cdFx0XHRcdFx0XHRwb3NpdGlvbnNbdmlkeF0gPSBwb3NpdGlvbnNbc3RhcnRJbmRleCArIDNdO1xyXG5cdFx0XHRcdFx0XHRwb3NpdGlvbnNbdmlkeCArIDFdID0gcG9zaXRpb25zW3N0YXJ0SW5kZXggKyA0XTtcclxuXHRcdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHggKyAyXSA9IHBvc2l0aW9uc1tzdGFydEluZGV4ICsgNV07XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRwb3NpdGlvbnNbdmlkeF0gPSB4O1xyXG5cdFx0XHRcdFx0XHRwb3NpdGlvbnNbdmlkeCArIDFdID0gY29tcDE7XHJcblx0XHRcdFx0XHRcdHBvc2l0aW9uc1t2aWR4ICsgMl0gPSBjb21wMjtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRub3JtYWxzW3ZpZHhdID0gMDtcclxuXHRcdFx0XHRcdG5vcm1hbHNbdmlkeCArIDFdID0gdDE7XHJcblx0XHRcdFx0XHRub3JtYWxzW3ZpZHggKyAyXSA9IHQyO1xyXG5cdFx0XHRcdFx0dGFuZ2VudHNbdmlkeF0gPSAxO1xyXG5cdFx0XHRcdFx0dGFuZ2VudHNbdmlkeCArIDFdID0gMDtcclxuXHRcdFx0XHRcdHRhbmdlbnRzW3ZpZHggKyAyXSA9IDA7XHJcblx0XHRcdFx0XHR2aWR4ICs9IDM7XHJcblxyXG5cdFx0XHRcdFx0aWYgKGkgPiAwKSB7XHJcblx0XHRcdFx0XHRcdC8vIGFkZCB0cmlhbmdsZVxyXG5cdFx0XHRcdFx0XHRpbmRpY2VzW2ZpZHgrK10gPSBuZXh0VmVydGV4SW5kZXg7XHJcblx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IG5leHRWZXJ0ZXhJbmRleCArIDI7XHJcblx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IG5leHRWZXJ0ZXhJbmRleCArIDE7XHJcblxyXG5cdFx0XHRcdFx0XHRuZXh0VmVydGV4SW5kZXggKz0gMjtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdG5leHRWZXJ0ZXhJbmRleCArPSAyO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBUaGUgbm9ybWFscyBvbiB0aGUgbGF0ZXJhbCBzdXJmYWNlIGFsbCBoYXZlIHRoZSBzYW1lIGluY2xpbmUsIGkuZS5cclxuXHRcdFx0Ly8gdGhlIFwiZWxldmF0aW9uXCIgY29tcG9uZW50IChZIG9yIFogZGVwZW5kaW5nIG9uIHlVcCkgaXMgY29uc3RhbnQuXHJcblx0XHRcdC8vIFNhbWUgcHJpbmNpcGxlIGdvZXMgZm9yIHRoZSBcImJhc2VcIiBvZiB0aGVzZSB2ZWN0b3JzLCB3aGljaCB3aWxsIGJlXHJcblx0XHRcdC8vIGNhbGN1bGF0ZWQgc3VjaCB0aGF0IGEgdmVjdG9yIFtiYXNlLGVsZXZdIHdpbGwgYmUgYSB1bml0IHZlY3Rvci5cclxuXHRcdFx0ZHIgPSAodGhpcy5fcEJvdHRvbVJhZGl1cyAtIHRoaXMuX3RvcFJhZGl1cyk7XHJcblx0XHRcdGxhdE5vcm1FbGV2ID0gZHIvdGhpcy5faGVpZ2h0O1xyXG5cdFx0XHRsYXROb3JtQmFzZSA9IChsYXROb3JtRWxldiA9PSAwKT8gMSA6IHRoaXMuX2hlaWdodC9kcjtcclxuXHJcblx0XHRcdC8vIGxhdGVyYWwgc3VyZmFjZVxyXG5cdFx0XHRpZiAodGhpcy5fc3VyZmFjZUNsb3NlZCkge1xyXG5cdFx0XHRcdHZhciBhOm51bWJlcjtcclxuXHRcdFx0XHR2YXIgYjpudW1iZXI7XHJcblx0XHRcdFx0dmFyIGM6bnVtYmVyO1xyXG5cdFx0XHRcdHZhciBkOm51bWJlcjtcclxuXHRcdFx0XHR2YXIgbmEwOm51bWJlciwgbmExOm51bWJlciwgbmFDb21wMTpudW1iZXIsIG5hQ29tcDI6bnVtYmVyO1xyXG5cclxuXHRcdFx0XHRmb3IgKGogPSAwOyBqIDw9IHRoaXMuX3BTZWdtZW50c0g7ICsraikge1xyXG5cdFx0XHRcdFx0cmFkaXVzID0gdGhpcy5fdG9wUmFkaXVzIC0gKChqL3RoaXMuX3BTZWdtZW50c0gpKih0aGlzLl90b3BSYWRpdXMgLSB0aGlzLl9wQm90dG9tUmFkaXVzKSk7XHJcblx0XHRcdFx0XHR6ID0gLSh0aGlzLl9oZWlnaHQvMikgKyAoai90aGlzLl9wU2VnbWVudHNIKnRoaXMuX2hlaWdodCk7XHJcblxyXG5cdFx0XHRcdFx0c3RhcnRJbmRleCA9IG5leHRWZXJ0ZXhJbmRleCozO1xyXG5cclxuXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPD0gdGhpcy5fcFNlZ21lbnRzVzsgKytpKSB7XHJcblx0XHRcdFx0XHRcdC8vIHJldm9sdXRpb24gdmVydGV4XHJcblx0XHRcdFx0XHRcdHJldm9sdXRpb25BbmdsZSA9IGkqcmV2b2x1dGlvbkFuZ2xlRGVsdGE7XHJcblx0XHRcdFx0XHRcdHggPSByYWRpdXMqTWF0aC5jb3MocmV2b2x1dGlvbkFuZ2xlKTtcclxuXHRcdFx0XHRcdFx0eSA9IHJhZGl1cypNYXRoLnNpbihyZXZvbHV0aW9uQW5nbGUpO1xyXG5cdFx0XHRcdFx0XHRuYTAgPSBsYXROb3JtQmFzZSpNYXRoLmNvcyhyZXZvbHV0aW9uQW5nbGUpO1xyXG5cdFx0XHRcdFx0XHRuYTEgPSBsYXROb3JtQmFzZSpNYXRoLnNpbihyZXZvbHV0aW9uQW5nbGUpO1xyXG5cclxuXHRcdFx0XHRcdFx0aWYgKHRoaXMuX3lVcCkge1xyXG5cdFx0XHRcdFx0XHRcdHQxID0gMDtcclxuXHRcdFx0XHRcdFx0XHR0MiA9IC1uYTA7XHJcblx0XHRcdFx0XHRcdFx0Y29tcDEgPSAtejtcclxuXHRcdFx0XHRcdFx0XHRjb21wMiA9IHk7XHJcblx0XHRcdFx0XHRcdFx0bmFDb21wMSA9IGxhdE5vcm1FbGV2O1xyXG5cdFx0XHRcdFx0XHRcdG5hQ29tcDIgPSBuYTE7XHJcblxyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdHQxID0gLW5hMDtcclxuXHRcdFx0XHRcdFx0XHR0MiA9IDA7XHJcblx0XHRcdFx0XHRcdFx0Y29tcDEgPSB5O1xyXG5cdFx0XHRcdFx0XHRcdGNvbXAyID0gejtcclxuXHRcdFx0XHRcdFx0XHRuYUNvbXAxID0gbmExO1xyXG5cdFx0XHRcdFx0XHRcdG5hQ29tcDIgPSBsYXROb3JtRWxldjtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0aWYgKGkgPT0gdGhpcy5fcFNlZ21lbnRzVykge1xyXG5cdFx0XHRcdFx0XHRcdHBvc2l0aW9uc1t2aWR4XSA9IHBvc2l0aW9uc1tzdGFydEluZGV4XTtcclxuXHRcdFx0XHRcdFx0XHRwb3NpdGlvbnNbdmlkeCArIDFdID0gcG9zaXRpb25zW3N0YXJ0SW5kZXggKyAxXTtcclxuXHRcdFx0XHRcdFx0XHRwb3NpdGlvbnNbdmlkeCArIDJdID0gcG9zaXRpb25zW3N0YXJ0SW5kZXggKyAyXTtcclxuXHRcdFx0XHRcdFx0XHRub3JtYWxzW3ZpZHhdID0gbmEwO1xyXG5cdFx0XHRcdFx0XHRcdG5vcm1hbHNbdmlkeCArIDFdID0gbGF0Tm9ybUVsZXY7XHJcblx0XHRcdFx0XHRcdFx0bm9ybWFsc1t2aWR4ICsgMl0gPSBuYTE7XHJcblx0XHRcdFx0XHRcdFx0dGFuZ2VudHNbdmlkeF0gPSBuYTE7XHJcblx0XHRcdFx0XHRcdFx0dGFuZ2VudHNbdmlkeCArIDFdID0gdDE7XHJcblx0XHRcdFx0XHRcdFx0dGFuZ2VudHNbdmlkeCArIDJdID0gdDI7XHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHhdID0geDtcclxuXHRcdFx0XHRcdFx0XHRwb3NpdGlvbnNbdmlkeCArIDFdID0gY29tcDE7XHJcblx0XHRcdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHggKyAyXSA9IGNvbXAyO1xyXG5cdFx0XHRcdFx0XHRcdG5vcm1hbHNbdmlkeF0gPSBuYTA7XHJcblx0XHRcdFx0XHRcdFx0bm9ybWFsc1t2aWR4ICsgMV0gPSBuYUNvbXAxO1xyXG5cdFx0XHRcdFx0XHRcdG5vcm1hbHNbdmlkeCArIDJdID0gbmFDb21wMjtcclxuXHRcdFx0XHRcdFx0XHR0YW5nZW50c1t2aWR4XSA9IC1uYTE7XHJcblx0XHRcdFx0XHRcdFx0dGFuZ2VudHNbdmlkeCArIDFdID0gdDE7XHJcblx0XHRcdFx0XHRcdFx0dGFuZ2VudHNbdmlkeCArIDJdID0gdDI7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0dmlkeCArPSAzO1xyXG5cclxuXHRcdFx0XHRcdFx0Ly8gY2xvc2UgdHJpYW5nbGVcclxuXHRcdFx0XHRcdFx0aWYgKGkgPiAwICYmIGogPiAwKSB7XHJcblx0XHRcdFx0XHRcdFx0YSA9IG5leHRWZXJ0ZXhJbmRleDsgLy8gY3VycmVudFxyXG5cdFx0XHRcdFx0XHRcdGIgPSBuZXh0VmVydGV4SW5kZXggLSAxOyAvLyBwcmV2aW91c1xyXG5cdFx0XHRcdFx0XHRcdGMgPSBiIC0gdGhpcy5fcFNlZ21lbnRzVyAtIDE7IC8vIHByZXZpb3VzIG9mIGxhc3QgbGV2ZWxcclxuXHRcdFx0XHRcdFx0XHRkID0gYSAtIHRoaXMuX3BTZWdtZW50c1cgLSAxOyAvLyBjdXJyZW50IG9mIGxhc3QgbGV2ZWxcclxuXHJcblx0XHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gYTtcclxuXHRcdFx0XHRcdFx0XHRpbmRpY2VzW2ZpZHgrK10gPSBiO1xyXG5cdFx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IGM7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IGE7XHJcblx0XHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gYztcclxuXHRcdFx0XHRcdFx0XHRpbmRpY2VzW2ZpZHgrK10gPSBkO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRuZXh0VmVydGV4SW5kZXgrKztcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIGJ1aWxkIHJlYWwgZGF0YSBmcm9tIHJhdyBkYXRhXHJcblx0XHRcdHRyaWFuZ2xlR2VvbWV0cnkudXBkYXRlSW5kaWNlcyhpbmRpY2VzKTtcclxuXHJcblx0XHRcdHRyaWFuZ2xlR2VvbWV0cnkudXBkYXRlUG9zaXRpb25zKHBvc2l0aW9ucyk7XHJcblx0XHRcdHRyaWFuZ2xlR2VvbWV0cnkudXBkYXRlVmVydGV4Tm9ybWFscyhub3JtYWxzKTtcclxuXHRcdFx0dHJpYW5nbGVHZW9tZXRyeS51cGRhdGVWZXJ0ZXhUYW5nZW50cyh0YW5nZW50cyk7XHJcblxyXG5cdFx0fSBlbHNlIGlmIChnZW9tZXRyeVR5cGUgPT0gXCJsaW5lU3ViR2VvbWV0cnlcIikge1xyXG5cdFx0XHR2YXIgbGluZUdlb21ldHJ5OkxpbmVTdWJHZW9tZXRyeSA9IDxMaW5lU3ViR2VvbWV0cnk+IHRhcmdldDtcclxuXHJcblx0XHRcdHZhciBudW1TZWdtZW50czpudW1iZXIgPSAodGhpcy5fcFNlZ21lbnRzSCArIDEpKih0aGlzLl9wU2VnbWVudHNXKSArIHRoaXMuX3BTZWdtZW50c1c7XHJcblx0XHRcdHZhciBzdGFydFBvc2l0aW9uczpBcnJheTxudW1iZXI+O1xyXG5cdFx0XHR2YXIgZW5kUG9zaXRpb25zOkFycmF5PG51bWJlcj47XHJcblx0XHRcdHZhciB0aGlja25lc3M6QXJyYXk8bnVtYmVyPjtcclxuXHJcblx0XHRcdGlmIChsaW5lR2VvbWV0cnkuaW5kaWNlcyAhPSBudWxsICYmIG51bVNlZ21lbnRzID09IGxpbmVHZW9tZXRyeS5udW1TZWdtZW50cykge1xyXG5cdFx0XHRcdHN0YXJ0UG9zaXRpb25zID0gbGluZUdlb21ldHJ5LnN0YXJ0UG9zaXRpb25zO1xyXG5cdFx0XHRcdGVuZFBvc2l0aW9ucyA9IGxpbmVHZW9tZXRyeS5lbmRQb3NpdGlvbnM7XHJcblx0XHRcdFx0dGhpY2tuZXNzID0gbGluZUdlb21ldHJ5LnRoaWNrbmVzcztcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRzdGFydFBvc2l0aW9ucyA9IG5ldyBBcnJheTxudW1iZXI+KG51bVNlZ21lbnRzKjMpO1xyXG5cdFx0XHRcdGVuZFBvc2l0aW9ucyA9IG5ldyBBcnJheTxudW1iZXI+KG51bVNlZ21lbnRzKjMpO1xyXG5cdFx0XHRcdHRoaWNrbmVzcyA9IG5ldyBBcnJheTxudW1iZXI+KG51bVNlZ21lbnRzKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmlkeCA9IDA7XHJcblxyXG5cdFx0XHRmaWR4ID0gMDtcclxuXHJcblx0XHRcdC8vaG9yaXpvbmFsIGxpbmVzXHJcblxyXG5cdFx0XHRmb3IgKGogPSAwOyBqIDw9IHRoaXMuX3BTZWdtZW50c0g7ICsraikge1xyXG5cdFx0XHRcdHJhZGl1cyA9IHRoaXMuX3RvcFJhZGl1cyAtICgoai90aGlzLl9wU2VnbWVudHNIKSoodGhpcy5fdG9wUmFkaXVzIC0gdGhpcy5fcEJvdHRvbVJhZGl1cykpO1xyXG5cdFx0XHRcdHogPSB0aGlzLl9oZWlnaHQqKGovdGhpcy5fcFNlZ21lbnRzSCAtIDAuNSk7XHJcblxyXG5cdFx0XHRcdGZvciAoaSA9IDA7IGkgPD0gdGhpcy5fcFNlZ21lbnRzVzsgKytpKSB7XHJcblx0XHRcdFx0XHQvLyByZXZvbHV0aW9uIHZlcnRleFxyXG5cdFx0XHRcdFx0cmV2b2x1dGlvbkFuZ2xlID0gaSpyZXZvbHV0aW9uQW5nbGVEZWx0YTtcclxuXHRcdFx0XHRcdHggPSByYWRpdXMqTWF0aC5jb3MocmV2b2x1dGlvbkFuZ2xlKTtcclxuXHRcdFx0XHRcdHkgPSByYWRpdXMqTWF0aC5zaW4ocmV2b2x1dGlvbkFuZ2xlKTtcclxuXHJcblx0XHRcdFx0XHRpZiAodGhpcy5feVVwKSB7XHJcblx0XHRcdFx0XHRcdGNvbXAxID0gLXo7XHJcblx0XHRcdFx0XHRcdGNvbXAyID0geTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdGNvbXAxID0geTtcclxuXHRcdFx0XHRcdFx0Y29tcDIgPSB6O1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGlmIChpID4gMCkge1xyXG5cdFx0XHRcdFx0XHRlbmRQb3NpdGlvbnNbdmlkeF0gPSB4O1xyXG5cdFx0XHRcdFx0XHRlbmRQb3NpdGlvbnNbdmlkeCArIDFdID0gY29tcDE7XHJcblx0XHRcdFx0XHRcdGVuZFBvc2l0aW9uc1t2aWR4ICsgMl0gPSBjb21wMjtcclxuXHJcblx0XHRcdFx0XHRcdHRoaWNrbmVzc1tmaWR4KytdID0gMTtcclxuXHJcblx0XHRcdFx0XHRcdHZpZHggKz0gMztcclxuXHJcblx0XHRcdFx0XHRcdC8vdmVydGljYWwgbGluZXNcclxuXHRcdFx0XHRcdFx0c3RhcnRQb3NpdGlvbnNbdmlkeF0gPSBlbmRQb3NpdGlvbnNbdmlkeCAtIHRoaXMuX3BTZWdtZW50c1cqNl07XHJcblx0XHRcdFx0XHRcdHN0YXJ0UG9zaXRpb25zW3ZpZHggKyAxXSA9IGVuZFBvc2l0aW9uc1t2aWR4ICsgMSAtIHRoaXMuX3BTZWdtZW50c1cqNl07XHJcblx0XHRcdFx0XHRcdHN0YXJ0UG9zaXRpb25zW3ZpZHggKyAyXSA9IGVuZFBvc2l0aW9uc1t2aWR4ICsgMiAtIHRoaXMuX3BTZWdtZW50c1cqNl07XHJcblxyXG5cdFx0XHRcdFx0XHRlbmRQb3NpdGlvbnNbdmlkeF0gPSB4O1xyXG5cdFx0XHRcdFx0XHRlbmRQb3NpdGlvbnNbdmlkeCArIDFdID0gY29tcDE7XHJcblx0XHRcdFx0XHRcdGVuZFBvc2l0aW9uc1t2aWR4ICsgMl0gPSBjb21wMjtcclxuXHJcblx0XHRcdFx0XHRcdHRoaWNrbmVzc1tmaWR4KytdID0gMTtcclxuXHJcblx0XHRcdFx0XHRcdHZpZHggKz0gMztcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRpZiAoaSA8IHRoaXMuX3BTZWdtZW50c1cpIHtcclxuXHRcdFx0XHRcdFx0c3RhcnRQb3NpdGlvbnNbdmlkeF0gPSB4O1xyXG5cdFx0XHRcdFx0XHRzdGFydFBvc2l0aW9uc1t2aWR4ICsgMV0gPSBjb21wMTtcclxuXHRcdFx0XHRcdFx0c3RhcnRQb3NpdGlvbnNbdmlkeCArIDJdID0gY29tcDI7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBidWlsZCByZWFsIGRhdGEgZnJvbSByYXcgZGF0YVxyXG5cdFx0XHRsaW5lR2VvbWV0cnkudXBkYXRlUG9zaXRpb25zKHN0YXJ0UG9zaXRpb25zLCBlbmRQb3NpdGlvbnMpO1xyXG5cdFx0XHRsaW5lR2VvbWV0cnkudXBkYXRlVGhpY2tuZXNzKHRoaWNrbmVzcyk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAaW5oZXJpdERvY1xyXG5cdCAqL1xyXG5cdHB1YmxpYyBfcEJ1aWxkVVZzKHRhcmdldDpTdWJHZW9tZXRyeUJhc2UsIGdlb21ldHJ5VHlwZTpzdHJpbmcpXHJcblx0e1xyXG5cdFx0dmFyIGk6bnVtYmVyO1xyXG5cdFx0dmFyIGo6bnVtYmVyO1xyXG5cdFx0dmFyIHg6bnVtYmVyO1xyXG5cdFx0dmFyIHk6bnVtYmVyO1xyXG5cdFx0dmFyIHJldm9sdXRpb25BbmdsZTpudW1iZXI7XHJcblx0XHR2YXIgdXZzOkFycmF5PG51bWJlcj47XHJcblxyXG5cdFx0aWYgKGdlb21ldHJ5VHlwZSA9PSBcInRyaWFuZ2xlU3ViR2VvbWV0cnlcIikge1xyXG5cclxuXHRcdFx0dmFyIHRyaWFuZ2xlR2VvbWV0cnk6VHJpYW5nbGVTdWJHZW9tZXRyeSA9IDxUcmlhbmdsZVN1Ykdlb21ldHJ5PiB0YXJnZXQ7XHJcblxyXG5cdFx0XHQvLyBuZWVkIHRvIGluaXRpYWxpemUgcmF3IGFycmF5IG9yIGNhbiBiZSByZXVzZWQ/XHJcblx0XHRcdGlmICh0cmlhbmdsZUdlb21ldHJ5LnV2cyAmJiB0aGlzLl9udW1WZXJ0aWNlcyA9PSB0cmlhbmdsZUdlb21ldHJ5Lm51bVZlcnRpY2VzKSB7XHJcblx0XHRcdFx0dXZzID0gdHJpYW5nbGVHZW9tZXRyeS51dnM7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dXZzID0gbmV3IEFycmF5PG51bWJlcj4odGhpcy5fbnVtVmVydGljZXMqMik7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIGV2YWx1YXRlIHJldm9sdXRpb24gc3RlcHNcclxuXHRcdFx0dmFyIHJldm9sdXRpb25BbmdsZURlbHRhOm51bWJlciA9IDIqTWF0aC5QSS90aGlzLl9wU2VnbWVudHNXO1xyXG5cclxuXHRcdFx0Ly8gY3VycmVudCB1diBjb21wb25lbnQgaW5kZXhcclxuXHRcdFx0dmFyIGluZGV4Om51bWJlciA9IDA7XHJcblxyXG5cdFx0XHQvLyB0b3BcclxuXHRcdFx0aWYgKHRoaXMuX3RvcENsb3NlZCkge1xyXG5cdFx0XHRcdGZvciAoaSA9IDA7IGkgPD0gdGhpcy5fcFNlZ21lbnRzVzsgKytpKSB7XHJcblxyXG5cdFx0XHRcdFx0cmV2b2x1dGlvbkFuZ2xlID0gaSpyZXZvbHV0aW9uQW5nbGVEZWx0YTtcclxuXHRcdFx0XHRcdHggPSAwLjUgKyAwLjUqIC1NYXRoLmNvcyhyZXZvbHV0aW9uQW5nbGUpO1xyXG5cdFx0XHRcdFx0eSA9IDAuNSArIDAuNSpNYXRoLnNpbihyZXZvbHV0aW9uQW5nbGUpO1xyXG5cclxuXHRcdFx0XHRcdHV2c1tpbmRleCsrXSA9IDAuNSp0cmlhbmdsZUdlb21ldHJ5LnNjYWxlVTsgLy8gY2VudHJhbCB2ZXJ0ZXhcclxuXHRcdFx0XHRcdHV2c1tpbmRleCsrXSA9IDAuNSp0cmlhbmdsZUdlb21ldHJ5LnNjYWxlVjtcclxuXHJcblx0XHRcdFx0XHR1dnNbaW5kZXgrK10gPSB4KnRyaWFuZ2xlR2VvbWV0cnkuc2NhbGVVOyAvLyByZXZvbHV0aW9uIHZlcnRleFxyXG5cdFx0XHRcdFx0dXZzW2luZGV4KytdID0geSp0cmlhbmdsZUdlb21ldHJ5LnNjYWxlVjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIGJvdHRvbVxyXG5cdFx0XHRpZiAodGhpcy5fYm90dG9tQ2xvc2VkKSB7XHJcblx0XHRcdFx0Zm9yIChpID0gMDsgaSA8PSB0aGlzLl9wU2VnbWVudHNXOyArK2kpIHtcclxuXHJcblx0XHRcdFx0XHRyZXZvbHV0aW9uQW5nbGUgPSBpKnJldm9sdXRpb25BbmdsZURlbHRhO1xyXG5cdFx0XHRcdFx0eCA9IDAuNSArIDAuNSpNYXRoLmNvcyhyZXZvbHV0aW9uQW5nbGUpO1xyXG5cdFx0XHRcdFx0eSA9IDAuNSArIDAuNSpNYXRoLnNpbihyZXZvbHV0aW9uQW5nbGUpO1xyXG5cclxuXHRcdFx0XHRcdHV2c1tpbmRleCsrXSA9IDAuNSp0cmlhbmdsZUdlb21ldHJ5LnNjYWxlVTsgLy8gY2VudHJhbCB2ZXJ0ZXhcclxuXHRcdFx0XHRcdHV2c1tpbmRleCsrXSA9IDAuNSp0cmlhbmdsZUdlb21ldHJ5LnNjYWxlVjtcclxuXHJcblx0XHRcdFx0XHR1dnNbaW5kZXgrK10gPSB4KnRyaWFuZ2xlR2VvbWV0cnkuc2NhbGVVOyAvLyByZXZvbHV0aW9uIHZlcnRleFxyXG5cdFx0XHRcdFx0dXZzW2luZGV4KytdID0geSp0cmlhbmdsZUdlb21ldHJ5LnNjYWxlVjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIGxhdGVyYWwgc3VyZmFjZVxyXG5cdFx0XHRpZiAodGhpcy5fc3VyZmFjZUNsb3NlZCkge1xyXG5cdFx0XHRcdGZvciAoaiA9IDA7IGogPD0gdGhpcy5fcFNlZ21lbnRzSDsgKytqKSB7XHJcblx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDw9IHRoaXMuX3BTZWdtZW50c1c7ICsraSkge1xyXG5cdFx0XHRcdFx0XHQvLyByZXZvbHV0aW9uIHZlcnRleFxyXG5cdFx0XHRcdFx0XHR1dnNbaW5kZXgrK10gPSAoIGkvdGhpcy5fcFNlZ21lbnRzVyApKnRyaWFuZ2xlR2VvbWV0cnkuc2NhbGVVO1xyXG5cdFx0XHRcdFx0XHR1dnNbaW5kZXgrK10gPSAoIGovdGhpcy5fcFNlZ21lbnRzSCApKnRyaWFuZ2xlR2VvbWV0cnkuc2NhbGVWO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gYnVpbGQgcmVhbCBkYXRhIGZyb20gcmF3IGRhdGFcclxuXHRcdFx0dHJpYW5nbGVHZW9tZXRyeS51cGRhdGVVVnModXZzKTtcclxuXHJcblx0XHR9IGVsc2UgaWYgKGdlb21ldHJ5VHlwZSA9PSBcImxpbmVTdWJHZW9tZXRyeVwiKSB7XHJcblx0XHRcdC8vbm90aGluZyB0byBkbyBoZXJlXHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgPSBQcmltaXRpdmVDeWxpbmRlclByZWZhYjsiXX0=