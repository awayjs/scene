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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9wcmVmYWJzL3ByaW1pdGl2ZWN5bGluZGVycHJlZmFiLnRzIl0sIm5hbWVzIjpbIlByaW1pdGl2ZUN5bGluZGVyUHJlZmFiIiwiUHJpbWl0aXZlQ3lsaW5kZXJQcmVmYWIuY29uc3RydWN0b3IiLCJQcmltaXRpdmVDeWxpbmRlclByZWZhYi50b3BSYWRpdXMiLCJQcmltaXRpdmVDeWxpbmRlclByZWZhYi5ib3R0b21SYWRpdXMiLCJQcmltaXRpdmVDeWxpbmRlclByZWZhYi5oZWlnaHQiLCJQcmltaXRpdmVDeWxpbmRlclByZWZhYi5zZWdtZW50c1ciLCJQcmltaXRpdmVDeWxpbmRlclByZWZhYi5zZXRTZWdtZW50c1ciLCJQcmltaXRpdmVDeWxpbmRlclByZWZhYi5zZWdtZW50c0giLCJQcmltaXRpdmVDeWxpbmRlclByZWZhYi5zZXRTZWdtZW50c0giLCJQcmltaXRpdmVDeWxpbmRlclByZWZhYi50b3BDbG9zZWQiLCJQcmltaXRpdmVDeWxpbmRlclByZWZhYi5ib3R0b21DbG9zZWQiLCJQcmltaXRpdmVDeWxpbmRlclByZWZhYi55VXAiLCJQcmltaXRpdmVDeWxpbmRlclByZWZhYi5fcEJ1aWxkR2VvbWV0cnkiLCJQcmltaXRpdmVDeWxpbmRlclByZWZhYi5fcEJ1aWxkVVZzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFLQSxJQUFPLG1CQUFtQixXQUFZLGdEQUFnRCxDQUFDLENBQUM7QUFFeEYsQUFHQTs7R0FERztJQUNHLHVCQUF1QjtJQUFTQSxVQUFoQ0EsdUJBQXVCQSxVQUE0QkE7SUE4SXhEQTs7Ozs7Ozs7OztPQVVHQTtJQUNIQSxTQXpKS0EsdUJBQXVCQSxDQXlKaEJBLFNBQXFCQSxFQUFFQSxZQUF3QkEsRUFBRUEsTUFBbUJBLEVBQUVBLFNBQXFCQSxFQUFFQSxTQUFvQkEsRUFBRUEsU0FBd0JBLEVBQUVBLFlBQTJCQSxFQUFFQSxhQUE0QkEsRUFBRUEsR0FBa0JBO1FBQTFOQyx5QkFBcUJBLEdBQXJCQSxjQUFx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QSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFFakRBLENBQUNBO29CQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTt3QkFDUEEsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7d0JBQ3BCQSxTQUFTQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQTt3QkFDNUJBLFNBQVNBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBO29CQUM3QkEsQ0FBQ0E7b0JBRURBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO29CQUNsQkEsT0FBT0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7b0JBQ3ZCQSxPQUFPQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTtvQkFDdkJBLFFBQVFBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO29CQUNuQkEsUUFBUUEsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBQ3ZCQSxRQUFRQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFDdkJBLElBQUlBLElBQUlBLENBQUNBLENBQUNBO29CQUVWQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDWEEsQUFDQUEsZUFEZUE7d0JBQ2ZBLE9BQU9BLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEdBQUdBLGVBQWVBLENBQUNBO3dCQUNsQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsZUFBZUEsR0FBR0EsQ0FBQ0EsQ0FBQ0E7d0JBQ3RDQSxPQUFPQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFHQSxlQUFlQSxHQUFHQSxDQUFDQSxDQUFDQTt3QkFFdENBLGVBQWVBLElBQUlBLENBQUNBLENBQUNBO29CQUN0QkEsQ0FBQ0E7Z0JBQ0ZBLENBQUNBO2dCQUVEQSxlQUFlQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUN0QkEsQ0FBQ0E7WUFFREEsQUFDQUEsU0FEU0E7WUFDVEEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsSUFBSUEsSUFBSUEsQ0FBQ0EsY0FBY0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBRW5EQSxDQUFDQSxHQUFHQSxHQUFHQSxHQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQTtnQkFFckJBLFVBQVVBLEdBQUdBLGVBQWVBLEdBQUNBLENBQUNBLENBQUNBO2dCQUUvQkEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsV0FBV0EsRUFBRUEsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7b0JBQ3hDQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDZkEsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQ1JBLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBO3dCQUNQQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDWEEsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBQ1hBLENBQUNBO29CQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTt3QkFDUEEsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0E7d0JBQ1BBLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBO3dCQUNQQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQTt3QkFDVkEsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBQ1hBLENBQUNBO29CQUVEQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFDcEJBLFNBQVNBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBO29CQUM1QkEsU0FBU0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0E7b0JBQzVCQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFDbEJBLE9BQU9BLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO29CQUN2QkEsT0FBT0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7b0JBQ3ZCQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFDbkJBLFFBQVFBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO29CQUN2QkEsUUFBUUEsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBQ3ZCQSxJQUFJQSxJQUFJQSxDQUFDQSxDQUFDQTtvQkFFVkEsQUFDQUEsb0JBRG9CQTtvQkFDcEJBLGVBQWVBLEdBQUdBLENBQUNBLEdBQUNBLG9CQUFvQkEsQ0FBQ0E7b0JBQ3pDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxjQUFjQSxHQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxlQUFlQSxDQUFDQSxDQUFDQTtvQkFDbERBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLGNBQWNBLEdBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLGVBQWVBLENBQUNBLENBQUNBO29CQUVsREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQ2ZBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO3dCQUNYQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFDWEEsQ0FBQ0E7b0JBQUNBLElBQUlBLENBQUNBLENBQUNBO3dCQUNQQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQTt3QkFDVkEsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBQ1hBLENBQUNBO29CQUVEQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDM0JBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLFNBQVNBLENBQUNBLFVBQVVBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO3dCQUM1Q0EsU0FBU0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsU0FBU0EsQ0FBQ0EsVUFBVUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQ2hEQSxTQUFTQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxTQUFTQSxDQUFDQSxVQUFVQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDakRBLENBQUNBO29CQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTt3QkFDUEEsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7d0JBQ3BCQSxTQUFTQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQTt3QkFDNUJBLFNBQVNBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBO29CQUM3QkEsQ0FBQ0E7b0JBRURBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO29CQUNsQkEsT0FBT0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7b0JBQ3ZCQSxPQUFPQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTtvQkFDdkJBLFFBQVFBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO29CQUNuQkEsUUFBUUEsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBQ3ZCQSxRQUFRQSxDQUFDQSxJ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R0EsV0FBV0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsZUFBZUEsQ0FBQ0EsQ0FBQ0E7d0JBQzVDQSxHQUFHQSxHQUFHQSxXQUFXQSxHQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxlQUFlQSxDQUFDQSxDQUFDQTt3QkFFNUNBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBOzRCQUNmQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQTs0QkFDUEEsRUFBRUEsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0E7NEJBQ1ZBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBOzRCQUNYQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQTs0QkFDVkEsT0FBT0EsR0FBR0EsV0FBV0EsQ0FBQ0E7NEJBQ3RCQSxPQUFPQSxHQUFHQSxHQUFHQSxDQUFDQTt3QkFFZkEsQ0FBQ0E7d0JBQUNBLElBQUlBLENBQUNBLENBQUNBOzRCQUNQQSxFQUFFQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQTs0QkFDVkEsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0E7NEJBQ1BBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBOzRCQUNWQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQTs0QkFDVkEsT0FBT0EsR0FBR0EsR0FBR0EsQ0FBQ0E7NEJBQ2RBLE9BQU9BLEdBQUdBLFdBQVdBLENBQUNBO3dCQUN2QkEsQ0FBQ0E7d0JBRURBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBLENBQUNBOzRCQUMzQkEsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsU0FBU0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0E7NEJBQ3hDQSxTQUFTQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxTQUFTQSxDQUFDQSxVQUFVQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTs0QkFDaERBLFNBQVNBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLFNBQVNBLENBQUNBLFVBQVVBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBOzRCQUNoREEsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsR0FBR0EsQ0FBQ0E7NEJBQ3BCQSxPQUFPQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxXQUFXQSxDQUFDQTs0QkFDaENBLE9BQU9BLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEdBQUdBLENBQUNBOzRCQUN4QkEsUUFBUUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsR0FBR0EsQ0FBQ0E7NEJBQ3JCQSxRQUFRQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTs0QkFDeEJBLFFBQVFBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO3dCQUN6QkEsQ0FBQ0E7d0JBQUNBLElBQUlBLENBQUNBLENBQUNBOzRCQUNQQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTs0QkFDcEJBLFNBQVNBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBOzRCQUM1QkEsU0FBU0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0E7NEJBQzVCQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxHQUFHQSxDQUFDQTs0QkFDcEJBLE9BQU9BLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLE9BQU9BLENBQUNBOzRCQUM1QkEsT0FBT0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsT0FBT0EsQ0FBQ0E7NEJBQzVCQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQTs0QkFDdEJBLFFBQVFBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdB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RUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQ2ZBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO3dCQUNYQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFDWEEsQ0FBQ0E7b0JBQUNBLElBQUlBLENBQUNBLENBQUNBO3dCQUNQQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQTt3QkFDVkEsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBQ1hBLENBQUNBO29CQUVEQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDWEEsWUFBWUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7d0JBQ3ZCQSxZQUFZQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQTt3QkFDL0JBLFlBQVlBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBO3dCQUUvQkEsU0FBU0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7d0JBRXRCQSxJQUFJQSxJQUFJQSxDQUFDQSxDQUFDQTt3QkFFVkEsQUFDQUEsZ0JBRGdCQTt3QkFDaEJBLGNBQWNBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLFlBQVlBLENBQUNBLElBQUlBLEdBQUdBLElBQUlBLENBQUNBLFdBQVdBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBO3dCQUMvREEsY0FBY0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsWUFBWUEsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsV0FBV0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQ3ZFQSxjQUFjQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxZQUFZQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxHQUFHQSxJQUFJQSxD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V0FBV0EsQ0FBRUEsR0FBQ0EsZ0JBQWdCQSxDQUFDQSxNQUFNQSxDQUFDQTtvQkFDL0RBLENBQUNBO2dCQUNGQSxDQUFDQTtZQUNGQSxDQUFDQTtZQUVEQSxBQUNBQSxnQ0FEZ0NBO1lBQ2hDQSxnQkFBZ0JBLENBQUNBLFNBQVNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1FBRWpDQSxDQUFDQTtRQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxZQUFZQSxJQUFJQSxpQkFBaUJBLENBQUNBLENBQUNBLENBQUNBO1FBRS9DQSxDQUFDQTtJQUNGQSxDQUFDQTtJQUNGYiw4QkFBQ0E7QUFBREEsQ0E1b0JBLEFBNG9CQ0EsRUE1b0JxQyxtQkFBbUIsRUE0b0J4RDtBQUVELEFBQWlDLGlCQUF4Qix1QkFBdUIsQ0FBQyIsImZpbGUiOiJwcmVmYWJzL1ByaW1pdGl2ZUN5bGluZGVyUHJlZmFiLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBJQXNzZXRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvSUFzc2V0XCIpO1xuXG5pbXBvcnQgTGluZVN1Ykdlb21ldHJ5XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvTGluZVN1Ykdlb21ldHJ5XCIpO1xuaW1wb3J0IFN1Ykdlb21ldHJ5QmFzZVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL1N1Ykdlb21ldHJ5QmFzZVwiKTtcbmltcG9ydCBUcmlhbmdsZVN1Ykdlb21ldHJ5XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL1RyaWFuZ2xlU3ViR2VvbWV0cnlcIik7XG5pbXBvcnQgUHJpbWl0aXZlUHJlZmFiQmFzZVx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcHJlZmFicy9QcmltaXRpdmVQcmVmYWJCYXNlXCIpO1xuXG4vKipcbiAqIEEgQ3lsaW5kZXIgcHJpbWl0aXZlIG1lc2guXG4gKi9cbmNsYXNzIFByaW1pdGl2ZUN5bGluZGVyUHJlZmFiIGV4dGVuZHMgUHJpbWl0aXZlUHJlZmFiQmFzZSBpbXBsZW1lbnRzIElBc3NldFxue1xuXHRwdWJsaWMgX3BCb3R0b21SYWRpdXM6bnVtYmVyO1xuXHRwdWJsaWMgX3BTZWdtZW50c1c6bnVtYmVyO1xuXHRwdWJsaWMgX3BTZWdtZW50c0g6bnVtYmVyO1xuXG5cdHByaXZhdGUgX3RvcFJhZGl1czpudW1iZXI7XG5cdHByaXZhdGUgX2hlaWdodDpudW1iZXI7XG5cblx0cHJpdmF0ZSBfdG9wQ2xvc2VkOmJvb2xlYW47XG5cdHByaXZhdGUgX2JvdHRvbUNsb3NlZDpib29sZWFuO1xuXHRwcml2YXRlIF9zdXJmYWNlQ2xvc2VkOmJvb2xlYW47XG5cdHByaXZhdGUgX3lVcDpib29sZWFuO1xuXHRwcml2YXRlIF9udW1WZXJ0aWNlczpudW1iZXIgPSAwO1xuXG5cdC8qKlxuXHQgKiBUaGUgcmFkaXVzIG9mIHRoZSB0b3AgZW5kIG9mIHRoZSBjeWxpbmRlci5cblx0ICovXG5cdHB1YmxpYyBnZXQgdG9wUmFkaXVzKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fdG9wUmFkaXVzO1xuXHR9XG5cblx0cHVibGljIHNldCB0b3BSYWRpdXModmFsdWU6bnVtYmVyKVxuXHR7XG5cdFx0dGhpcy5fdG9wUmFkaXVzID0gdmFsdWU7XG5cdFx0dGhpcy5fcEludmFsaWRhdGVHZW9tZXRyeSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSByYWRpdXMgb2YgdGhlIGJvdHRvbSBlbmQgb2YgdGhlIGN5bGluZGVyLlxuXHQgKi9cblx0cHVibGljIGdldCBib3R0b21SYWRpdXMoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wQm90dG9tUmFkaXVzO1xuXHR9XG5cblx0cHVibGljIHNldCBib3R0b21SYWRpdXModmFsdWU6bnVtYmVyKVxuXHR7XG5cdFx0dGhpcy5fcEJvdHRvbVJhZGl1cyA9IHZhbHVlO1xuXHRcdHRoaXMuX3BJbnZhbGlkYXRlR2VvbWV0cnkoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgcmFkaXVzIG9mIHRoZSB0b3AgZW5kIG9mIHRoZSBjeWxpbmRlci5cblx0ICovXG5cdHB1YmxpYyBnZXQgaGVpZ2h0KCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5faGVpZ2h0O1xuXHR9XG5cblx0cHVibGljIHNldCBoZWlnaHQodmFsdWU6bnVtYmVyKVxuXHR7XG5cdFx0dGhpcy5faGVpZ2h0ID0gdmFsdWU7XG5cdFx0dGhpcy5fcEludmFsaWRhdGVHZW9tZXRyeSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIERlZmluZXMgdGhlIG51bWJlciBvZiBob3Jpem9udGFsIHNlZ21lbnRzIHRoYXQgbWFrZSB1cCB0aGUgY3lsaW5kZXIuIERlZmF1bHRzIHRvIDE2LlxuXHQgKi9cblx0cHVibGljIGdldCBzZWdtZW50c1coKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wU2VnbWVudHNXO1xuXHR9XG5cblx0cHVibGljIHNldCBzZWdtZW50c1codmFsdWU6bnVtYmVyKVxuXHR7XG5cdFx0dGhpcy5zZXRTZWdtZW50c1codmFsdWUpO1xuXHR9XG5cblx0cHVibGljIHNldFNlZ21lbnRzVyh2YWx1ZTpudW1iZXIpXG5cdHtcblx0XHR0aGlzLl9wU2VnbWVudHNXID0gdmFsdWU7XG5cdFx0dGhpcy5fcEludmFsaWRhdGVHZW9tZXRyeSgpO1xuXHRcdHRoaXMuX3BJbnZhbGlkYXRlVVZzKCk7XG5cdH1cblxuXHQvKipcblx0ICogRGVmaW5lcyB0aGUgbnVtYmVyIG9mIHZlcnRpY2FsIHNlZ21lbnRzIHRoYXQgbWFrZSB1cCB0aGUgY3lsaW5kZXIuIERlZmF1bHRzIHRvIDEuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHNlZ21lbnRzSCgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BTZWdtZW50c0g7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHNlZ21lbnRzSCh2YWx1ZTpudW1iZXIpXG5cdHtcblxuXHRcdHRoaXMuc2V0U2VnbWVudHNIKHZhbHVlKVxuXG5cdH1cblxuXHRwdWJsaWMgc2V0U2VnbWVudHNIKHZhbHVlOm51bWJlcilcblx0e1xuXHRcdHRoaXMuX3BTZWdtZW50c0ggPSB2YWx1ZTtcblx0XHR0aGlzLl9wSW52YWxpZGF0ZUdlb21ldHJ5KCk7XG5cdFx0dGhpcy5fcEludmFsaWRhdGVVVnMoKTtcblxuXHR9XG5cblx0LyoqXG5cdCAqIERlZmluZXMgd2hldGhlciB0aGUgdG9wIGVuZCBvZiB0aGUgY3lsaW5kZXIgaXMgY2xvc2VkICh0cnVlKSBvciBvcGVuLlxuXHQgKi9cblx0cHVibGljIGdldCB0b3BDbG9zZWQoKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fdG9wQ2xvc2VkO1xuXHR9XG5cblx0cHVibGljIHNldCB0b3BDbG9zZWQodmFsdWU6Ym9vbGVhbilcblx0e1xuXHRcdHRoaXMuX3RvcENsb3NlZCA9IHZhbHVlO1xuXHRcdHRoaXMuX3BJbnZhbGlkYXRlR2VvbWV0cnkoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBEZWZpbmVzIHdoZXRoZXIgdGhlIGJvdHRvbSBlbmQgb2YgdGhlIGN5bGluZGVyIGlzIGNsb3NlZCAodHJ1ZSkgb3Igb3Blbi5cblx0ICovXG5cdHB1YmxpYyBnZXQgYm90dG9tQ2xvc2VkKCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2JvdHRvbUNsb3NlZDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgYm90dG9tQ2xvc2VkKHZhbHVlOmJvb2xlYW4pXG5cdHtcblx0XHR0aGlzLl9ib3R0b21DbG9zZWQgPSB2YWx1ZTtcblx0XHR0aGlzLl9wSW52YWxpZGF0ZUdlb21ldHJ5KCk7XG5cdH1cblxuXHQvKipcblx0ICogRGVmaW5lcyB3aGV0aGVyIHRoZSBjeWxpbmRlciBwb2xlcyBzaG91bGQgbGF5IG9uIHRoZSBZLWF4aXMgKHRydWUpIG9yIG9uIHRoZSBaLWF4aXMgKGZhbHNlKS5cblx0ICovXG5cdHB1YmxpYyBnZXQgeVVwKCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3lVcDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgeVVwKHZhbHVlOmJvb2xlYW4pXG5cdHtcblx0XHR0aGlzLl95VXAgPSB2YWx1ZTtcblx0XHR0aGlzLl9wSW52YWxpZGF0ZUdlb21ldHJ5KCk7XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlcyBhIG5ldyBDeWxpbmRlciBvYmplY3QuXG5cdCAqIEBwYXJhbSB0b3BSYWRpdXMgVGhlIHJhZGl1cyBvZiB0aGUgdG9wIGVuZCBvZiB0aGUgY3lsaW5kZXIuXG5cdCAqIEBwYXJhbSBib3R0b21SYWRpdXMgVGhlIHJhZGl1cyBvZiB0aGUgYm90dG9tIGVuZCBvZiB0aGUgY3lsaW5kZXJcblx0ICogQHBhcmFtIGhlaWdodCBUaGUgcmFkaXVzIG9mIHRoZSBib3R0b20gZW5kIG9mIHRoZSBjeWxpbmRlclxuXHQgKiBAcGFyYW0gc2VnbWVudHNXIERlZmluZXMgdGhlIG51bWJlciBvZiBob3Jpem9udGFsIHNlZ21lbnRzIHRoYXQgbWFrZSB1cCB0aGUgY3lsaW5kZXIuIERlZmF1bHRzIHRvIDE2LlxuXHQgKiBAcGFyYW0gc2VnbWVudHNIIERlZmluZXMgdGhlIG51bWJlciBvZiB2ZXJ0aWNhbCBzZWdtZW50cyB0aGF0IG1ha2UgdXAgdGhlIGN5bGluZGVyLiBEZWZhdWx0cyB0byAxLlxuXHQgKiBAcGFyYW0gdG9wQ2xvc2VkIERlZmluZXMgd2hldGhlciB0aGUgdG9wIGVuZCBvZiB0aGUgY3lsaW5kZXIgaXMgY2xvc2VkICh0cnVlKSBvciBvcGVuLlxuXHQgKiBAcGFyYW0gYm90dG9tQ2xvc2VkIERlZmluZXMgd2hldGhlciB0aGUgYm90dG9tIGVuZCBvZiB0aGUgY3lsaW5kZXIgaXMgY2xvc2VkICh0cnVlKSBvciBvcGVuLlxuXHQgKiBAcGFyYW0geVVwIERlZmluZXMgd2hldGhlciB0aGUgY29uZSBwb2xlcyBzaG91bGQgbGF5IG9uIHRoZSBZLWF4aXMgKHRydWUpIG9yIG9uIHRoZSBaLWF4aXMgKGZhbHNlKS5cblx0ICovXG5cdGNvbnN0cnVjdG9yKHRvcFJhZGl1czpudW1iZXIgPSA1MCwgYm90dG9tUmFkaXVzOm51bWJlciA9IDUwLCBoZWlnaHQ6bnVtYmVyID0gMTAwLCBzZWdtZW50c1c6bnVtYmVyID0gMTYsIHNlZ21lbnRzSDpudW1iZXIgPSAxLCB0b3BDbG9zZWQ6Ym9vbGVhbiA9IHRydWUsIGJvdHRvbUNsb3NlZDpib29sZWFuID0gdHJ1ZSwgc3VyZmFjZUNsb3NlZDpib29sZWFuID0gdHJ1ZSwgeVVwOmJvb2xlYW4gPSB0cnVlKVxuXHR7XG5cdFx0c3VwZXIoKTtcblxuXHRcdHRoaXMuX3RvcFJhZGl1cyA9IHRvcFJhZGl1cztcblx0XHR0aGlzLl9wQm90dG9tUmFkaXVzID0gYm90dG9tUmFkaXVzO1xuXHRcdHRoaXMuX2hlaWdodCA9IGhlaWdodDtcblx0XHR0aGlzLl9wU2VnbWVudHNXID0gc2VnbWVudHNXO1xuXHRcdHRoaXMuX3BTZWdtZW50c0ggPSBzZWdtZW50c0g7XG5cdFx0dGhpcy5fdG9wQ2xvc2VkID0gdG9wQ2xvc2VkO1xuXHRcdHRoaXMuX2JvdHRvbUNsb3NlZCA9IGJvdHRvbUNsb3NlZDtcblx0XHR0aGlzLl9zdXJmYWNlQ2xvc2VkID0gc3VyZmFjZUNsb3NlZDtcblx0XHR0aGlzLl95VXAgPSB5VXA7XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBAaW5oZXJpdERvY1xuXHQgKi9cblx0cHVibGljIF9wQnVpbGRHZW9tZXRyeSh0YXJnZXQ6U3ViR2VvbWV0cnlCYXNlLCBnZW9tZXRyeVR5cGU6c3RyaW5nKVxuXHR7XG5cdFx0dmFyIGluZGljZXM6QXJyYXk8bnVtYmVyPiAvKnVpbnQqLztcblx0XHR2YXIgcG9zaXRpb25zOkFycmF5PG51bWJlcj47XG5cdFx0dmFyIG5vcm1hbHM6QXJyYXk8bnVtYmVyPjtcblx0XHR2YXIgdGFuZ2VudHM6QXJyYXk8bnVtYmVyPjtcblxuXHRcdHZhciBpOm51bWJlcjtcblx0XHR2YXIgajpudW1iZXI7XG5cdFx0dmFyIHg6bnVtYmVyO1xuXHRcdHZhciB5Om51bWJlcjtcblx0XHR2YXIgejpudW1iZXI7XG5cdFx0dmFyIHZpZHg6bnVtYmVyO1xuXHRcdHZhciBmaWR4Om51bWJlcjtcblxuXHRcdHZhciByYWRpdXM6bnVtYmVyO1xuXHRcdHZhciByZXZvbHV0aW9uQW5nbGU6bnVtYmVyO1xuXG5cdFx0dmFyIGRyOm51bWJlcjtcblx0XHR2YXIgbGF0Tm9ybUVsZXY6bnVtYmVyO1xuXHRcdHZhciBsYXROb3JtQmFzZTpudW1iZXI7XG5cdFx0dmFyIG51bUluZGljZXM6bnVtYmVyID0gMDtcblxuXHRcdHZhciBjb21wMTpudW1iZXI7XG5cdFx0dmFyIGNvbXAyOm51bWJlcjtcblx0XHR2YXIgc3RhcnRJbmRleDpudW1iZXIgPSAwO1xuXHRcdHZhciBuZXh0VmVydGV4SW5kZXg6bnVtYmVyID0gMDtcblxuXHRcdHZhciB0MTpudW1iZXI7XG5cdFx0dmFyIHQyOm51bWJlcjtcblxuXHRcdC8vIHJlc2V0IHV0aWxpdHkgdmFyaWFibGVzXG5cdFx0dGhpcy5fbnVtVmVydGljZXMgPSAwO1xuXG5cdFx0Ly8gZXZhbHVhdGUgcmV2b2x1dGlvbiBzdGVwc1xuXHRcdHZhciByZXZvbHV0aW9uQW5nbGVEZWx0YTpudW1iZXIgPSAyKk1hdGguUEkvdGhpcy5fcFNlZ21lbnRzVztcblxuXHRcdGlmIChnZW9tZXRyeVR5cGUgPT0gXCJ0cmlhbmdsZVN1Ykdlb21ldHJ5XCIpIHtcblxuXHRcdFx0dmFyIHRyaWFuZ2xlR2VvbWV0cnk6VHJpYW5nbGVTdWJHZW9tZXRyeSA9IDxUcmlhbmdsZVN1Ykdlb21ldHJ5PiB0YXJnZXQ7XG5cblx0XHRcdC8vIGV2YWx1YXRlIHRhcmdldCBudW1iZXIgb2YgdmVydGljZXMsIHRyaWFuZ2xlcyBhbmQgaW5kaWNlc1xuXHRcdFx0aWYgKHRoaXMuX3N1cmZhY2VDbG9zZWQpIHtcblx0XHRcdFx0dGhpcy5fbnVtVmVydGljZXMgKz0gKHRoaXMuX3BTZWdtZW50c0ggKyAxKSoodGhpcy5fcFNlZ21lbnRzVyArIDEpOyAvLyBzZWdtZW50c0ggKyAxIGJlY2F1c2Ugb2YgY2xvc3VyZSwgc2VnbWVudHNXICsgMSBiZWNhdXNlIG9mIFVWIHVud3JhcHBpbmdcblx0XHRcdFx0bnVtSW5kaWNlcyArPSB0aGlzLl9wU2VnbWVudHNIKnRoaXMuX3BTZWdtZW50c1cqNjsgLy8gZWFjaCBsZXZlbCBoYXMgc2VnbWVudFcgcXVhZHMsIGVhY2ggb2YgMiB0cmlhbmdsZXNcblx0XHRcdH1cblx0XHRcdGlmICh0aGlzLl90b3BDbG9zZWQpIHtcblx0XHRcdFx0dGhpcy5fbnVtVmVydGljZXMgKz0gMioodGhpcy5fcFNlZ21lbnRzVyArIDEpOyAvLyBzZWdtZW50c1cgKyAxIGJlY2F1c2Ugb2YgdW53cmFwcGluZ1xuXHRcdFx0XHRudW1JbmRpY2VzICs9IHRoaXMuX3BTZWdtZW50c1cqMzsgLy8gb25lIHRyaWFuZ2xlIGZvciBlYWNoIHNlZ21lbnRcblx0XHRcdH1cblx0XHRcdGlmICh0aGlzLl9ib3R0b21DbG9zZWQpIHtcblx0XHRcdFx0dGhpcy5fbnVtVmVydGljZXMgKz0gMioodGhpcy5fcFNlZ21lbnRzVyArIDEpO1xuXHRcdFx0XHRudW1JbmRpY2VzICs9IHRoaXMuX3BTZWdtZW50c1cqMztcblx0XHRcdH1cblxuXHRcdFx0Ly8gbmVlZCB0byBpbml0aWFsaXplIHJhdyBhcnJheXMgb3IgY2FuIGJlIHJldXNlZD9cblx0XHRcdGlmICh0aGlzLl9udW1WZXJ0aWNlcyA9PSB0cmlhbmdsZUdlb21ldHJ5Lm51bVZlcnRpY2VzKSB7XG5cdFx0XHRcdGluZGljZXMgPSB0cmlhbmdsZUdlb21ldHJ5LmluZGljZXM7XG5cdFx0XHRcdHBvc2l0aW9ucyA9IHRyaWFuZ2xlR2VvbWV0cnkucG9zaXRpb25zO1xuXHRcdFx0XHRub3JtYWxzID0gdHJpYW5nbGVHZW9tZXRyeS52ZXJ0ZXhOb3JtYWxzO1xuXHRcdFx0XHR0YW5nZW50cyA9IHRyaWFuZ2xlR2VvbWV0cnkudmVydGV4VGFuZ2VudHM7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpbmRpY2VzID0gbmV3IEFycmF5PG51bWJlcj4obnVtSW5kaWNlcylcblx0XHRcdFx0cG9zaXRpb25zID0gbmV3IEFycmF5PG51bWJlcj4odGhpcy5fbnVtVmVydGljZXMqMyk7XG5cdFx0XHRcdG5vcm1hbHMgPSBuZXcgQXJyYXk8bnVtYmVyPih0aGlzLl9udW1WZXJ0aWNlcyozKTtcblx0XHRcdFx0dGFuZ2VudHMgPSBuZXcgQXJyYXk8bnVtYmVyPih0aGlzLl9udW1WZXJ0aWNlcyozKTtcblxuXHRcdFx0XHR0aGlzLl9wSW52YWxpZGF0ZVVWcygpO1xuXHRcdFx0fVxuXG5cdFx0XHR2aWR4ID0gMDtcblx0XHRcdGZpZHggPSAwO1xuXG5cdFx0XHQvLyB0b3Bcblx0XHRcdGlmICh0aGlzLl90b3BDbG9zZWQgJiYgdGhpcy5fdG9wUmFkaXVzID4gMCkge1xuXG5cdFx0XHRcdHogPSAtMC41KnRoaXMuX2hlaWdodDtcblxuXHRcdFx0XHRmb3IgKGkgPSAwOyBpIDw9IHRoaXMuX3BTZWdtZW50c1c7ICsraSkge1xuXHRcdFx0XHRcdC8vIGNlbnRyYWwgdmVydGV4XG5cdFx0XHRcdFx0aWYgKHRoaXMuX3lVcCkge1xuXHRcdFx0XHRcdFx0dDEgPSAxO1xuXHRcdFx0XHRcdFx0dDIgPSAwO1xuXHRcdFx0XHRcdFx0Y29tcDEgPSAtejtcblx0XHRcdFx0XHRcdGNvbXAyID0gMDtcblxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR0MSA9IDA7XG5cdFx0XHRcdFx0XHR0MiA9IC0xO1xuXHRcdFx0XHRcdFx0Y29tcDEgPSAwO1xuXHRcdFx0XHRcdFx0Y29tcDIgPSB6O1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHBvc2l0aW9uc1t2aWR4XSA9IDA7XG5cdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHggKyAxXSA9IGNvbXAxO1xuXHRcdFx0XHRcdHBvc2l0aW9uc1t2aWR4ICsgMl0gPSBjb21wMjtcblx0XHRcdFx0XHRub3JtYWxzW3ZpZHhdID0gMDtcblx0XHRcdFx0XHRub3JtYWxzW3ZpZHggKyAxXSA9IHQxO1xuXHRcdFx0XHRcdG5vcm1hbHNbdmlkeCArIDJdID0gdDI7XG5cdFx0XHRcdFx0dGFuZ2VudHNbdmlkeF0gPSAxO1xuXHRcdFx0XHRcdHRhbmdlbnRzW3ZpZHggKyAxXSA9IDA7XG5cdFx0XHRcdFx0dGFuZ2VudHNbdmlkeCArIDJdID0gMDtcblx0XHRcdFx0XHR2aWR4ICs9IDM7XG5cblx0XHRcdFx0XHQvLyByZXZvbHV0aW9uIHZlcnRleFxuXHRcdFx0XHRcdHJldm9sdXRpb25BbmdsZSA9IGkqcmV2b2x1dGlvbkFuZ2xlRGVsdGE7XG5cdFx0XHRcdFx0eCA9IHRoaXMuX3RvcFJhZGl1cypNYXRoLmNvcyhyZXZvbHV0aW9uQW5nbGUpO1xuXHRcdFx0XHRcdHkgPSB0aGlzLl90b3BSYWRpdXMqTWF0aC5zaW4ocmV2b2x1dGlvbkFuZ2xlKTtcblxuXHRcdFx0XHRcdGlmICh0aGlzLl95VXApIHtcblx0XHRcdFx0XHRcdGNvbXAxID0gLXo7XG5cdFx0XHRcdFx0XHRjb21wMiA9IHk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGNvbXAxID0geTtcblx0XHRcdFx0XHRcdGNvbXAyID0gejtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoaSA9PSB0aGlzLl9wU2VnbWVudHNXKSB7XG5cdFx0XHRcdFx0XHRwb3NpdGlvbnNbdmlkeF0gPSBwb3NpdGlvbnNbc3RhcnRJbmRleCArIDNdO1xuXHRcdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHggKyAxXSA9IHBvc2l0aW9uc1tzdGFydEluZGV4ICsgNF07XG5cdFx0XHRcdFx0XHRwb3NpdGlvbnNbdmlkeCArIDJdID0gcG9zaXRpb25zW3N0YXJ0SW5kZXggKyA1XTtcblxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRwb3NpdGlvbnNbdmlkeF0gPSB4O1xuXHRcdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHggKyAxXSA9IGNvbXAxO1xuXHRcdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHggKyAyXSA9IGNvbXAyO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdG5vcm1hbHNbdmlkeF0gPSAwO1xuXHRcdFx0XHRcdG5vcm1hbHNbdmlkeCArIDFdID0gdDE7XG5cdFx0XHRcdFx0bm9ybWFsc1t2aWR4ICsgMl0gPSB0Mjtcblx0XHRcdFx0XHR0YW5nZW50c1t2aWR4XSA9IDE7XG5cdFx0XHRcdFx0dGFuZ2VudHNbdmlkeCArIDFdID0gMDtcblx0XHRcdFx0XHR0YW5nZW50c1t2aWR4ICsgMl0gPSAwO1xuXHRcdFx0XHRcdHZpZHggKz0gMztcblxuXHRcdFx0XHRcdGlmIChpID4gMCkge1xuXHRcdFx0XHRcdFx0Ly8gYWRkIHRyaWFuZ2xlXG5cdFx0XHRcdFx0XHRpbmRpY2VzW2ZpZHgrK10gPSBuZXh0VmVydGV4SW5kZXg7XG5cdFx0XHRcdFx0XHRpbmRpY2VzW2ZpZHgrK10gPSBuZXh0VmVydGV4SW5kZXggKyAxO1xuXHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gbmV4dFZlcnRleEluZGV4ICsgMjtcblxuXHRcdFx0XHRcdFx0bmV4dFZlcnRleEluZGV4ICs9IDI7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0bmV4dFZlcnRleEluZGV4ICs9IDI7XG5cdFx0XHR9XG5cblx0XHRcdC8vIGJvdHRvbVxuXHRcdFx0aWYgKHRoaXMuX2JvdHRvbUNsb3NlZCAmJiB0aGlzLl9wQm90dG9tUmFkaXVzID4gMCkge1xuXG5cdFx0XHRcdHogPSAwLjUqdGhpcy5faGVpZ2h0O1xuXG5cdFx0XHRcdHN0YXJ0SW5kZXggPSBuZXh0VmVydGV4SW5kZXgqMztcblxuXHRcdFx0XHRmb3IgKGkgPSAwOyBpIDw9IHRoaXMuX3BTZWdtZW50c1c7ICsraSkge1xuXHRcdFx0XHRcdGlmICh0aGlzLl95VXApIHtcblx0XHRcdFx0XHRcdHQxID0gLTE7XG5cdFx0XHRcdFx0XHR0MiA9IDA7XG5cdFx0XHRcdFx0XHRjb21wMSA9IC16O1xuXHRcdFx0XHRcdFx0Y29tcDIgPSAwO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR0MSA9IDA7XG5cdFx0XHRcdFx0XHR0MiA9IDE7XG5cdFx0XHRcdFx0XHRjb21wMSA9IDA7XG5cdFx0XHRcdFx0XHRjb21wMiA9IHo7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHhdID0gMDtcblx0XHRcdFx0XHRwb3NpdGlvbnNbdmlkeCArIDFdID0gY29tcDE7XG5cdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHggKyAyXSA9IGNvbXAyO1xuXHRcdFx0XHRcdG5vcm1hbHNbdmlkeF0gPSAwO1xuXHRcdFx0XHRcdG5vcm1hbHNbdmlkeCArIDFdID0gdDE7XG5cdFx0XHRcdFx0bm9ybWFsc1t2aWR4ICsgMl0gPSB0Mjtcblx0XHRcdFx0XHR0YW5nZW50c1t2aWR4XSA9IDE7XG5cdFx0XHRcdFx0dGFuZ2VudHNbdmlkeCArIDFdID0gMDtcblx0XHRcdFx0XHR0YW5nZW50c1t2aWR4ICsgMl0gPSAwO1xuXHRcdFx0XHRcdHZpZHggKz0gMztcblxuXHRcdFx0XHRcdC8vIHJldm9sdXRpb24gdmVydGV4XG5cdFx0XHRcdFx0cmV2b2x1dGlvbkFuZ2xlID0gaSpyZXZvbHV0aW9uQW5nbGVEZWx0YTtcblx0XHRcdFx0XHR4ID0gdGhpcy5fcEJvdHRvbVJhZGl1cypNYXRoLmNvcyhyZXZvbHV0aW9uQW5nbGUpO1xuXHRcdFx0XHRcdHkgPSB0aGlzLl9wQm90dG9tUmFkaXVzKk1hdGguc2luKHJldm9sdXRpb25BbmdsZSk7XG5cblx0XHRcdFx0XHRpZiAodGhpcy5feVVwKSB7XG5cdFx0XHRcdFx0XHRjb21wMSA9IC16O1xuXHRcdFx0XHRcdFx0Y29tcDIgPSB5O1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRjb21wMSA9IHk7XG5cdFx0XHRcdFx0XHRjb21wMiA9IHo7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKGkgPT0gdGhpcy5fcFNlZ21lbnRzVykge1xuXHRcdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHhdID0gcG9zaXRpb25zW3N0YXJ0SW5kZXggKyAzXTtcblx0XHRcdFx0XHRcdHBvc2l0aW9uc1t2aWR4ICsgMV0gPSBwb3NpdGlvbnNbc3RhcnRJbmRleCArIDRdO1xuXHRcdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHggKyAyXSA9IHBvc2l0aW9uc1tzdGFydEluZGV4ICsgNV07XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHBvc2l0aW9uc1t2aWR4XSA9IHg7XG5cdFx0XHRcdFx0XHRwb3NpdGlvbnNbdmlkeCArIDFdID0gY29tcDE7XG5cdFx0XHRcdFx0XHRwb3NpdGlvbnNbdmlkeCArIDJdID0gY29tcDI7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0bm9ybWFsc1t2aWR4XSA9IDA7XG5cdFx0XHRcdFx0bm9ybWFsc1t2aWR4ICsgMV0gPSB0MTtcblx0XHRcdFx0XHRub3JtYWxzW3ZpZHggKyAyXSA9IHQyO1xuXHRcdFx0XHRcdHRhbmdlbnRzW3ZpZHhdID0gMTtcblx0XHRcdFx0XHR0YW5nZW50c1t2aWR4ICsgMV0gPSAwO1xuXHRcdFx0XHRcdHRhbmdlbnRzW3ZpZHggKyAyXSA9IDA7XG5cdFx0XHRcdFx0dmlkeCArPSAzO1xuXG5cdFx0XHRcdFx0aWYgKGkgPiAwKSB7XG5cdFx0XHRcdFx0XHQvLyBhZGQgdHJpYW5nbGVcblx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IG5leHRWZXJ0ZXhJbmRleDtcblx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IG5leHRWZXJ0ZXhJbmRleCArIDI7XG5cdFx0XHRcdFx0XHRpbmRpY2VzW2ZpZHgrK10gPSBuZXh0VmVydGV4SW5kZXggKyAxO1xuXG5cdFx0XHRcdFx0XHRuZXh0VmVydGV4SW5kZXggKz0gMjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRuZXh0VmVydGV4SW5kZXggKz0gMjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gVGhlIG5vcm1hbHMgb24gdGhlIGxhdGVyYWwgc3VyZmFjZSBhbGwgaGF2ZSB0aGUgc2FtZSBpbmNsaW5lLCBpLmUuXG5cdFx0XHQvLyB0aGUgXCJlbGV2YXRpb25cIiBjb21wb25lbnQgKFkgb3IgWiBkZXBlbmRpbmcgb24geVVwKSBpcyBjb25zdGFudC5cblx0XHRcdC8vIFNhbWUgcHJpbmNpcGxlIGdvZXMgZm9yIHRoZSBcImJhc2VcIiBvZiB0aGVzZSB2ZWN0b3JzLCB3aGljaCB3aWxsIGJlXG5cdFx0XHQvLyBjYWxjdWxhdGVkIHN1Y2ggdGhhdCBhIHZlY3RvciBbYmFzZSxlbGV2XSB3aWxsIGJlIGEgdW5pdCB2ZWN0b3IuXG5cdFx0XHRkciA9ICh0aGlzLl9wQm90dG9tUmFkaXVzIC0gdGhpcy5fdG9wUmFkaXVzKTtcblx0XHRcdGxhdE5vcm1FbGV2ID0gZHIvdGhpcy5faGVpZ2h0O1xuXHRcdFx0bGF0Tm9ybUJhc2UgPSAobGF0Tm9ybUVsZXYgPT0gMCk/IDEgOiB0aGlzLl9oZWlnaHQvZHI7XG5cblx0XHRcdC8vIGxhdGVyYWwgc3VyZmFjZVxuXHRcdFx0aWYgKHRoaXMuX3N1cmZhY2VDbG9zZWQpIHtcblx0XHRcdFx0dmFyIGE6bnVtYmVyO1xuXHRcdFx0XHR2YXIgYjpudW1iZXI7XG5cdFx0XHRcdHZhciBjOm51bWJlcjtcblx0XHRcdFx0dmFyIGQ6bnVtYmVyO1xuXHRcdFx0XHR2YXIgbmEwOm51bWJlciwgbmExOm51bWJlciwgbmFDb21wMTpudW1iZXIsIG5hQ29tcDI6bnVtYmVyO1xuXG5cdFx0XHRcdGZvciAoaiA9IDA7IGogPD0gdGhpcy5fcFNlZ21lbnRzSDsgKytqKSB7XG5cdFx0XHRcdFx0cmFkaXVzID0gdGhpcy5fdG9wUmFkaXVzIC0gKChqL3RoaXMuX3BTZWdtZW50c0gpKih0aGlzLl90b3BSYWRpdXMgLSB0aGlzLl9wQm90dG9tUmFkaXVzKSk7XG5cdFx0XHRcdFx0eiA9IC0odGhpcy5faGVpZ2h0LzIpICsgKGovdGhpcy5fcFNlZ21lbnRzSCp0aGlzLl9oZWlnaHQpO1xuXG5cdFx0XHRcdFx0c3RhcnRJbmRleCA9IG5leHRWZXJ0ZXhJbmRleCozO1xuXG5cdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8PSB0aGlzLl9wU2VnbWVudHNXOyArK2kpIHtcblx0XHRcdFx0XHRcdC8vIHJldm9sdXRpb24gdmVydGV4XG5cdFx0XHRcdFx0XHRyZXZvbHV0aW9uQW5nbGUgPSBpKnJldm9sdXRpb25BbmdsZURlbHRhO1xuXHRcdFx0XHRcdFx0eCA9IHJhZGl1cypNYXRoLmNvcyhyZXZvbHV0aW9uQW5nbGUpO1xuXHRcdFx0XHRcdFx0eSA9IHJhZGl1cypNYXRoLnNpbihyZXZvbHV0aW9uQW5nbGUpO1xuXHRcdFx0XHRcdFx0bmEwID0gbGF0Tm9ybUJhc2UqTWF0aC5jb3MocmV2b2x1dGlvbkFuZ2xlKTtcblx0XHRcdFx0XHRcdG5hMSA9IGxhdE5vcm1CYXNlKk1hdGguc2luKHJldm9sdXRpb25BbmdsZSk7XG5cblx0XHRcdFx0XHRcdGlmICh0aGlzLl95VXApIHtcblx0XHRcdFx0XHRcdFx0dDEgPSAwO1xuXHRcdFx0XHRcdFx0XHR0MiA9IC1uYTA7XG5cdFx0XHRcdFx0XHRcdGNvbXAxID0gLXo7XG5cdFx0XHRcdFx0XHRcdGNvbXAyID0geTtcblx0XHRcdFx0XHRcdFx0bmFDb21wMSA9IGxhdE5vcm1FbGV2O1xuXHRcdFx0XHRcdFx0XHRuYUNvbXAyID0gbmExO1xuXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHR0MSA9IC1uYTA7XG5cdFx0XHRcdFx0XHRcdHQyID0gMDtcblx0XHRcdFx0XHRcdFx0Y29tcDEgPSB5O1xuXHRcdFx0XHRcdFx0XHRjb21wMiA9IHo7XG5cdFx0XHRcdFx0XHRcdG5hQ29tcDEgPSBuYTE7XG5cdFx0XHRcdFx0XHRcdG5hQ29tcDIgPSBsYXROb3JtRWxldjtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0aWYgKGkgPT0gdGhpcy5fcFNlZ21lbnRzVykge1xuXHRcdFx0XHRcdFx0XHRwb3NpdGlvbnNbdmlkeF0gPSBwb3NpdGlvbnNbc3RhcnRJbmRleF07XG5cdFx0XHRcdFx0XHRcdHBvc2l0aW9uc1t2aWR4ICsgMV0gPSBwb3NpdGlvbnNbc3RhcnRJbmRleCArIDFdO1xuXHRcdFx0XHRcdFx0XHRwb3NpdGlvbnNbdmlkeCArIDJdID0gcG9zaXRpb25zW3N0YXJ0SW5kZXggKyAyXTtcblx0XHRcdFx0XHRcdFx0bm9ybWFsc1t2aWR4XSA9IG5hMDtcblx0XHRcdFx0XHRcdFx0bm9ybWFsc1t2aWR4ICsgMV0gPSBsYXROb3JtRWxldjtcblx0XHRcdFx0XHRcdFx0bm9ybWFsc1t2aWR4ICsgMl0gPSBuYTE7XG5cdFx0XHRcdFx0XHRcdHRhbmdlbnRzW3ZpZHhdID0gbmExO1xuXHRcdFx0XHRcdFx0XHR0YW5nZW50c1t2aWR4ICsgMV0gPSB0MTtcblx0XHRcdFx0XHRcdFx0dGFuZ2VudHNbdmlkeCArIDJdID0gdDI7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRwb3NpdGlvbnNbdmlkeF0gPSB4O1xuXHRcdFx0XHRcdFx0XHRwb3NpdGlvbnNbdmlkeCArIDFdID0gY29tcDE7XG5cdFx0XHRcdFx0XHRcdHBvc2l0aW9uc1t2aWR4ICsgMl0gPSBjb21wMjtcblx0XHRcdFx0XHRcdFx0bm9ybWFsc1t2aWR4XSA9IG5hMDtcblx0XHRcdFx0XHRcdFx0bm9ybWFsc1t2aWR4ICsgMV0gPSBuYUNvbXAxO1xuXHRcdFx0XHRcdFx0XHRub3JtYWxzW3ZpZHggKyAyXSA9IG5hQ29tcDI7XG5cdFx0XHRcdFx0XHRcdHRhbmdlbnRzW3ZpZHhdID0gLW5hMTtcblx0XHRcdFx0XHRcdFx0dGFuZ2VudHNbdmlkeCArIDFdID0gdDE7XG5cdFx0XHRcdFx0XHRcdHRhbmdlbnRzW3ZpZHggKyAyXSA9IHQyO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0dmlkeCArPSAzO1xuXG5cdFx0XHRcdFx0XHQvLyBjbG9zZSB0cmlhbmdsZVxuXHRcdFx0XHRcdFx0aWYgKGkgPiAwICYmIGogPiAwKSB7XG5cdFx0XHRcdFx0XHRcdGEgPSBuZXh0VmVydGV4SW5kZXg7IC8vIGN1cnJlbnRcblx0XHRcdFx0XHRcdFx0YiA9IG5leHRWZXJ0ZXhJbmRleCAtIDE7IC8vIHByZXZpb3VzXG5cdFx0XHRcdFx0XHRcdGMgPSBiIC0gdGhpcy5fcFNlZ21lbnRzVyAtIDE7IC8vIHByZXZpb3VzIG9mIGxhc3QgbGV2ZWxcblx0XHRcdFx0XHRcdFx0ZCA9IGEgLSB0aGlzLl9wU2VnbWVudHNXIC0gMTsgLy8gY3VycmVudCBvZiBsYXN0IGxldmVsXG5cblx0XHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gYTtcblx0XHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gYjtcblx0XHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gYztcblxuXHRcdFx0XHRcdFx0XHRpbmRpY2VzW2ZpZHgrK10gPSBhO1xuXHRcdFx0XHRcdFx0XHRpbmRpY2VzW2ZpZHgrK10gPSBjO1xuXHRcdFx0XHRcdFx0XHRpbmRpY2VzW2ZpZHgrK10gPSBkO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRuZXh0VmVydGV4SW5kZXgrKztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gYnVpbGQgcmVhbCBkYXRhIGZyb20gcmF3IGRhdGFcblx0XHRcdHRyaWFuZ2xlR2VvbWV0cnkudXBkYXRlSW5kaWNlcyhpbmRpY2VzKTtcblxuXHRcdFx0dHJpYW5nbGVHZW9tZXRyeS51cGRhdGVQb3NpdGlvbnMocG9zaXRpb25zKTtcblx0XHRcdHRyaWFuZ2xlR2VvbWV0cnkudXBkYXRlVmVydGV4Tm9ybWFscyhub3JtYWxzKTtcblx0XHRcdHRyaWFuZ2xlR2VvbWV0cnkudXBkYXRlVmVydGV4VGFuZ2VudHModGFuZ2VudHMpO1xuXG5cdFx0fSBlbHNlIGlmIChnZW9tZXRyeVR5cGUgPT0gXCJsaW5lU3ViR2VvbWV0cnlcIikge1xuXHRcdFx0dmFyIGxpbmVHZW9tZXRyeTpMaW5lU3ViR2VvbWV0cnkgPSA8TGluZVN1Ykdlb21ldHJ5PiB0YXJnZXQ7XG5cblx0XHRcdHZhciBudW1TZWdtZW50czpudW1iZXIgPSAodGhpcy5fcFNlZ21lbnRzSCArIDEpKih0aGlzLl9wU2VnbWVudHNXKSArIHRoaXMuX3BTZWdtZW50c1c7XG5cdFx0XHR2YXIgc3RhcnRQb3NpdGlvbnM6QXJyYXk8bnVtYmVyPjtcblx0XHRcdHZhciBlbmRQb3NpdGlvbnM6QXJyYXk8bnVtYmVyPjtcblx0XHRcdHZhciB0aGlja25lc3M6QXJyYXk8bnVtYmVyPjtcblxuXHRcdFx0aWYgKGxpbmVHZW9tZXRyeS5pbmRpY2VzICE9IG51bGwgJiYgbnVtU2VnbWVudHMgPT0gbGluZUdlb21ldHJ5Lm51bVNlZ21lbnRzKSB7XG5cdFx0XHRcdHN0YXJ0UG9zaXRpb25zID0gbGluZUdlb21ldHJ5LnN0YXJ0UG9zaXRpb25zO1xuXHRcdFx0XHRlbmRQb3NpdGlvbnMgPSBsaW5lR2VvbWV0cnkuZW5kUG9zaXRpb25zO1xuXHRcdFx0XHR0aGlja25lc3MgPSBsaW5lR2VvbWV0cnkudGhpY2tuZXNzO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0c3RhcnRQb3NpdGlvbnMgPSBuZXcgQXJyYXk8bnVtYmVyPihudW1TZWdtZW50cyozKTtcblx0XHRcdFx0ZW5kUG9zaXRpb25zID0gbmV3IEFycmF5PG51bWJlcj4obnVtU2VnbWVudHMqMyk7XG5cdFx0XHRcdHRoaWNrbmVzcyA9IG5ldyBBcnJheTxudW1iZXI+KG51bVNlZ21lbnRzKTtcblx0XHRcdH1cblxuXHRcdFx0dmlkeCA9IDA7XG5cblx0XHRcdGZpZHggPSAwO1xuXG5cdFx0XHQvL2hvcml6b25hbCBsaW5lc1xuXG5cdFx0XHRmb3IgKGogPSAwOyBqIDw9IHRoaXMuX3BTZWdtZW50c0g7ICsraikge1xuXHRcdFx0XHRyYWRpdXMgPSB0aGlzLl90b3BSYWRpdXMgLSAoKGovdGhpcy5fcFNlZ21lbnRzSCkqKHRoaXMuX3RvcFJhZGl1cyAtIHRoaXMuX3BCb3R0b21SYWRpdXMpKTtcblx0XHRcdFx0eiA9IHRoaXMuX2hlaWdodCooai90aGlzLl9wU2VnbWVudHNIIC0gMC41KTtcblxuXHRcdFx0XHRmb3IgKGkgPSAwOyBpIDw9IHRoaXMuX3BTZWdtZW50c1c7ICsraSkge1xuXHRcdFx0XHRcdC8vIHJldm9sdXRpb24gdmVydGV4XG5cdFx0XHRcdFx0cmV2b2x1dGlvbkFuZ2xlID0gaSpyZXZvbHV0aW9uQW5nbGVEZWx0YTtcblx0XHRcdFx0XHR4ID0gcmFkaXVzKk1hdGguY29zKHJldm9sdXRpb25BbmdsZSk7XG5cdFx0XHRcdFx0eSA9IHJhZGl1cypNYXRoLnNpbihyZXZvbHV0aW9uQW5nbGUpO1xuXG5cdFx0XHRcdFx0aWYgKHRoaXMuX3lVcCkge1xuXHRcdFx0XHRcdFx0Y29tcDEgPSAtejtcblx0XHRcdFx0XHRcdGNvbXAyID0geTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Y29tcDEgPSB5O1xuXHRcdFx0XHRcdFx0Y29tcDIgPSB6O1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChpID4gMCkge1xuXHRcdFx0XHRcdFx0ZW5kUG9zaXRpb25zW3ZpZHhdID0geDtcblx0XHRcdFx0XHRcdGVuZFBvc2l0aW9uc1t2aWR4ICsgMV0gPSBjb21wMTtcblx0XHRcdFx0XHRcdGVuZFBvc2l0aW9uc1t2aWR4ICsgMl0gPSBjb21wMjtcblxuXHRcdFx0XHRcdFx0dGhpY2tuZXNzW2ZpZHgrK10gPSAxO1xuXG5cdFx0XHRcdFx0XHR2aWR4ICs9IDM7XG5cblx0XHRcdFx0XHRcdC8vdmVydGljYWwgbGluZXNcblx0XHRcdFx0XHRcdHN0YXJ0UG9zaXRpb25zW3ZpZHhdID0gZW5kUG9zaXRpb25zW3ZpZHggLSB0aGlzLl9wU2VnbWVudHNXKjZdO1xuXHRcdFx0XHRcdFx0c3RhcnRQb3NpdGlvbnNbdmlkeCArIDFdID0gZW5kUG9zaXRpb25zW3ZpZHggKyAxIC0gdGhpcy5fcFNlZ21lbnRzVyo2XTtcblx0XHRcdFx0XHRcdHN0YXJ0UG9zaXRpb25zW3ZpZHggKyAyXSA9IGVuZFBvc2l0aW9uc1t2aWR4ICsgMiAtIHRoaXMuX3BTZWdtZW50c1cqNl07XG5cblx0XHRcdFx0XHRcdGVuZFBvc2l0aW9uc1t2aWR4XSA9IHg7XG5cdFx0XHRcdFx0XHRlbmRQb3NpdGlvbnNbdmlkeCArIDFdID0gY29tcDE7XG5cdFx0XHRcdFx0XHRlbmRQb3NpdGlvbnNbdmlkeCArIDJdID0gY29tcDI7XG5cblx0XHRcdFx0XHRcdHRoaWNrbmVzc1tmaWR4KytdID0gMTtcblxuXHRcdFx0XHRcdFx0dmlkeCArPSAzO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChpIDwgdGhpcy5fcFNlZ21lbnRzVykge1xuXHRcdFx0XHRcdFx0c3RhcnRQb3NpdGlvbnNbdmlkeF0gPSB4O1xuXHRcdFx0XHRcdFx0c3RhcnRQb3NpdGlvbnNbdmlkeCArIDFdID0gY29tcDE7XG5cdFx0XHRcdFx0XHRzdGFydFBvc2l0aW9uc1t2aWR4ICsgMl0gPSBjb21wMjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gYnVpbGQgcmVhbCBkYXRhIGZyb20gcmF3IGRhdGFcblx0XHRcdGxpbmVHZW9tZXRyeS51cGRhdGVQb3NpdGlvbnMoc3RhcnRQb3NpdGlvbnMsIGVuZFBvc2l0aW9ucyk7XG5cdFx0XHRsaW5lR2VvbWV0cnkudXBkYXRlVGhpY2tuZXNzKHRoaWNrbmVzcyk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEBpbmhlcml0RG9jXG5cdCAqL1xuXHRwdWJsaWMgX3BCdWlsZFVWcyh0YXJnZXQ6U3ViR2VvbWV0cnlCYXNlLCBnZW9tZXRyeVR5cGU6c3RyaW5nKVxuXHR7XG5cdFx0dmFyIGk6bnVtYmVyO1xuXHRcdHZhciBqOm51bWJlcjtcblx0XHR2YXIgeDpudW1iZXI7XG5cdFx0dmFyIHk6bnVtYmVyO1xuXHRcdHZhciByZXZvbHV0aW9uQW5nbGU6bnVtYmVyO1xuXHRcdHZhciB1dnM6QXJyYXk8bnVtYmVyPjtcblxuXHRcdGlmIChnZW9tZXRyeVR5cGUgPT0gXCJ0cmlhbmdsZVN1Ykdlb21ldHJ5XCIpIHtcblxuXHRcdFx0dmFyIHRyaWFuZ2xlR2VvbWV0cnk6VHJpYW5nbGVTdWJHZW9tZXRyeSA9IDxUcmlhbmdsZVN1Ykdlb21ldHJ5PiB0YXJnZXQ7XG5cblx0XHRcdC8vIG5lZWQgdG8gaW5pdGlhbGl6ZSByYXcgYXJyYXkgb3IgY2FuIGJlIHJldXNlZD9cblx0XHRcdGlmICh0cmlhbmdsZUdlb21ldHJ5LnV2cyAmJiB0aGlzLl9udW1WZXJ0aWNlcyA9PSB0cmlhbmdsZUdlb21ldHJ5Lm51bVZlcnRpY2VzKSB7XG5cdFx0XHRcdHV2cyA9IHRyaWFuZ2xlR2VvbWV0cnkudXZzO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dXZzID0gbmV3IEFycmF5PG51bWJlcj4odGhpcy5fbnVtVmVydGljZXMqMik7XG5cdFx0XHR9XG5cblx0XHRcdC8vIGV2YWx1YXRlIHJldm9sdXRpb24gc3RlcHNcblx0XHRcdHZhciByZXZvbHV0aW9uQW5nbGVEZWx0YTpudW1iZXIgPSAyKk1hdGguUEkvdGhpcy5fcFNlZ21lbnRzVztcblxuXHRcdFx0Ly8gY3VycmVudCB1diBjb21wb25lbnQgaW5kZXhcblx0XHRcdHZhciBpbmRleDpudW1iZXIgPSAwO1xuXG5cdFx0XHQvLyB0b3Bcblx0XHRcdGlmICh0aGlzLl90b3BDbG9zZWQpIHtcblx0XHRcdFx0Zm9yIChpID0gMDsgaSA8PSB0aGlzLl9wU2VnbWVudHNXOyArK2kpIHtcblxuXHRcdFx0XHRcdHJldm9sdXRpb25BbmdsZSA9IGkqcmV2b2x1dGlvbkFuZ2xlRGVsdGE7XG5cdFx0XHRcdFx0eCA9IDAuNSArIDAuNSogLU1hdGguY29zKHJldm9sdXRpb25BbmdsZSk7XG5cdFx0XHRcdFx0eSA9IDAuNSArIDAuNSpNYXRoLnNpbihyZXZvbHV0aW9uQW5nbGUpO1xuXG5cdFx0XHRcdFx0dXZzW2luZGV4KytdID0gMC41KnRyaWFuZ2xlR2VvbWV0cnkuc2NhbGVVOyAvLyBjZW50cmFsIHZlcnRleFxuXHRcdFx0XHRcdHV2c1tpbmRleCsrXSA9IDAuNSp0cmlhbmdsZUdlb21ldHJ5LnNjYWxlVjtcblxuXHRcdFx0XHRcdHV2c1tpbmRleCsrXSA9IHgqdHJpYW5nbGVHZW9tZXRyeS5zY2FsZVU7IC8vIHJldm9sdXRpb24gdmVydGV4XG5cdFx0XHRcdFx0dXZzW2luZGV4KytdID0geSp0cmlhbmdsZUdlb21ldHJ5LnNjYWxlVjtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBib3R0b21cblx0XHRcdGlmICh0aGlzLl9ib3R0b21DbG9zZWQpIHtcblx0XHRcdFx0Zm9yIChpID0gMDsgaSA8PSB0aGlzLl9wU2VnbWVudHNXOyArK2kpIHtcblxuXHRcdFx0XHRcdHJldm9sdXRpb25BbmdsZSA9IGkqcmV2b2x1dGlvbkFuZ2xlRGVsdGE7XG5cdFx0XHRcdFx0eCA9IDAuNSArIDAuNSpNYXRoLmNvcyhyZXZvbHV0aW9uQW5nbGUpO1xuXHRcdFx0XHRcdHkgPSAwLjUgKyAwLjUqTWF0aC5zaW4ocmV2b2x1dGlvbkFuZ2xlKTtcblxuXHRcdFx0XHRcdHV2c1tpbmRleCsrXSA9IDAuNSp0cmlhbmdsZUdlb21ldHJ5LnNjYWxlVTsgLy8gY2VudHJhbCB2ZXJ0ZXhcblx0XHRcdFx0XHR1dnNbaW5kZXgrK10gPSAwLjUqdHJpYW5nbGVHZW9tZXRyeS5zY2FsZVY7XG5cblx0XHRcdFx0XHR1dnNbaW5kZXgrK10gPSB4KnRyaWFuZ2xlR2VvbWV0cnkuc2NhbGVVOyAvLyByZXZvbHV0aW9uIHZlcnRleFxuXHRcdFx0XHRcdHV2c1tpbmRleCsrXSA9IHkqdHJpYW5nbGVHZW9tZXRyeS5zY2FsZVY7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gbGF0ZXJhbCBzdXJmYWNlXG5cdFx0XHRpZiAodGhpcy5fc3VyZmFjZUNsb3NlZCkge1xuXHRcdFx0XHRmb3IgKGogPSAwOyBqIDw9IHRoaXMuX3BTZWdtZW50c0g7ICsraikge1xuXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPD0gdGhpcy5fcFNlZ21lbnRzVzsgKytpKSB7XG5cdFx0XHRcdFx0XHQvLyByZXZvbHV0aW9uIHZlcnRleFxuXHRcdFx0XHRcdFx0dXZzW2luZGV4KytdID0gKCBpL3RoaXMuX3BTZWdtZW50c1cgKSp0cmlhbmdsZUdlb21ldHJ5LnNjYWxlVTtcblx0XHRcdFx0XHRcdHV2c1tpbmRleCsrXSA9ICggai90aGlzLl9wU2VnbWVudHNIICkqdHJpYW5nbGVHZW9tZXRyeS5zY2FsZVY7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIGJ1aWxkIHJlYWwgZGF0YSBmcm9tIHJhdyBkYXRhXG5cdFx0XHR0cmlhbmdsZUdlb21ldHJ5LnVwZGF0ZVVWcyh1dnMpO1xuXG5cdFx0fSBlbHNlIGlmIChnZW9tZXRyeVR5cGUgPT0gXCJsaW5lU3ViR2VvbWV0cnlcIikge1xuXHRcdFx0Ly9ub3RoaW5nIHRvIGRvIGhlcmVcblx0XHR9XG5cdH1cbn1cblxuZXhwb3J0ID0gUHJpbWl0aXZlQ3lsaW5kZXJQcmVmYWI7Il19