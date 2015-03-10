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
        var centerVertexIndex = 0;
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
                nextVertexIndex += 1;
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
                        indices[fidx++] = nextVertexIndex - 1;
                        indices[fidx++] = centerVertexIndex;
                        indices[fidx++] = nextVertexIndex;
                    }
                    nextVertexIndex += 1;
                }
            }
            // bottom
            if (this._bottomClosed && this._pBottomRadius > 0) {
                z = 0.5 * this._height;
                startIndex = nextVertexIndex * 3;
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
                    vidx += 3;
                }
                nextVertexIndex += 1;
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
                        indices[fidx++] = nextVertexIndex - 1;
                        indices[fidx++] = nextVertexIndex;
                        indices[fidx++] = centerVertexIndex;
                    }
                    nextVertexIndex += 1;
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
                uvs[index++] = 0.5 * triangleGeometry.scaleU; // central vertex
                uvs[index++] = 0.5 * triangleGeometry.scaleV;
                for (i = 0; i <= this._pSegmentsW; ++i) {
                    revolutionAngle = i * revolutionAngleDelta;
                    x = 0.5 + 0.5 * -Math.cos(revolutionAngle);
                    y = 0.5 + 0.5 * Math.sin(revolutionAngle);
                    uvs[index++] = x * triangleGeometry.scaleU; // revolution vertex
                    uvs[index++] = y * triangleGeometry.scaleV;
                }
            }
            // bottom
            if (this._bottomClosed) {
                uvs[index++] = 0.5 * triangleGeometry.scaleU; // central vertex
                uvs[index++] = 0.5 * triangleGeometry.scaleV;
                for (i = 0; i <= this._pSegmentsW; ++i) {
                    revolutionAngle = i * revolutionAngleDelta;
                    x = 0.5 + 0.5 * Math.cos(revolutionAngle);
                    y = 0.5 + 0.5 * Math.sin(revolutionAngle);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9wcmVmYWJzL1ByaW1pdGl2ZUN5bGluZGVyUHJlZmFiLnRzIl0sIm5hbWVzIjpbIlByaW1pdGl2ZUN5bGluZGVyUHJlZmFiIiwiUHJpbWl0aXZlQ3lsaW5kZXJQcmVmYWIuY29uc3RydWN0b3IiLCJQcmltaXRpdmVDeWxpbmRlclByZWZhYi50b3BSYWRpdXMiLCJQcmltaXRpdmVDeWxpbmRlclByZWZhYi5ib3R0b21SYWRpdXMiLCJQcmltaXRpdmVDeWxpbmRlclByZWZhYi5oZWlnaHQiLCJQcmltaXRpdmVDeWxpbmRlclByZWZhYi5zZWdtZW50c1ciLCJQcmltaXRpdmVDeWxpbmRlclByZWZhYi5zZXRTZWdtZW50c1ciLCJQcmltaXRpdmVDeWxpbmRlclByZWZhYi5zZWdtZW50c0giLCJQcmltaXRpdmVDeWxpbmRlclByZWZhYi5zZXRTZWdtZW50c0giLCJQcmltaXRpdmVDeWxpbmRlclByZWZhYi50b3BDbG9zZWQiLCJQcmltaXRpdmVDeWxpbmRlclByZWZhYi5ib3R0b21DbG9zZWQiLCJQcmltaXRpdmVDeWxpbmRlclByZWZhYi55VXAiLCJQcmltaXRpdmVDeWxpbmRlclByZWZhYi5fcEJ1aWxkR2VvbWV0cnkiLCJQcmltaXRpdmVDeWxpbmRlclByZWZhYi5fcEJ1aWxkVVZzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFLQSxJQUFPLG1CQUFtQixXQUFZLGdEQUFnRCxDQUFDLENBQUM7QUFFeEYsQUFHQTs7R0FERztJQUNHLHVCQUF1QjtJQUFTQSxVQUFoQ0EsdUJBQXVCQSxVQUE0QkE7SUE4SXhEQTs7Ozs7Ozs7OztPQVVHQTtJQUNIQSxTQXpKS0EsdUJBQXVCQSxDQXlKaEJBLFNBQXFCQSxFQUFFQSxZQUF3QkEsRUFBRUEsTUFBbUJBLEVBQUVBLFNBQXFCQSxFQUFFQSxTQUFvQkEsRUFBRUEsU0FBd0JBLEVBQUVBLFlBQTJCQSxFQUFFQSxhQUE0QkEsRUFBRUEsR0FBa0JBO1FBQTFOQyx5QkFBcUJBLEdBQXJCQSxjQUFx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aUJBO2dCQUNqQkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ2ZBLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBO29CQUNQQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFDUEEsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ1hBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBO2dCQUVYQSxDQUFDQTtnQkFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7b0JBQ1BBLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBO29CQUNQQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDUkEsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBQ1ZBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBO2dCQUNYQSxDQUFDQTtnQkFFREEsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3BCQSxTQUFTQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQTtnQkFDNUJBLFNBQVNBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBO2dCQUM1QkEsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2xCQSxPQUFPQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTtnQkFDdkJBLE9BQU9BLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO2dCQUN2QkEsUUFBUUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ25CQSxRQUFRQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFDdkJBLFFBQVFBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dC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QUdBLE1BQU1BLEdBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLGVBQWVBLENBQUNBLENBQUNBO3dCQUNyQ0EsQ0FBQ0EsR0FBR0EsTUFBTUEsR0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsZUFBZUEsQ0FBQ0EsQ0FBQ0E7d0JBQ3JDQSxHQUFHQSxHQUFHQSxXQUFXQSxHQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxlQUFlQSxDQUFDQSxDQUFDQTt3QkFDNUNBLEdBQUdBLEdBQUdBLFdBQVdBLEdBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLGVBQWVBLENBQUNBLENBQUNBO3dCQUU1Q0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7NEJBQ2ZBLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBOzRCQUNQQSxFQUFFQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQTs0QkFDVkEsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7NEJBQ1hBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBOzRCQUNWQSxPQUFPQSxHQUFHQSxXQUFXQSxDQUFDQTs0QkFDdEJBLE9BQU9BLEdBQUdBLEdBQUdBLENBQUNBO3dCQUVmQSxDQUFDQTt3QkFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7NEJBQ1BBLEVBQUVBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBOzRCQUNWQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQTs0QkFDUEEsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7NEJBQ1ZBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBOzRCQUNWQSxPQUFPQSxHQUFHQSxHQUFHQSxDQUFDQTs0QkFDZEEsT0FBT0EsR0FBR0EsV0FBV0EsQ0FBQ0E7d0JBQ3ZCQSxDQUFDQTt3QkFFREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7NEJBQzNCQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxTQUFTQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQTs0QkFDeENBLFNBQVNBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLFNBQVNBLENBQUNBLFVBQVVBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBOzRCQUNoREEsU0FBU0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsU0FBU0EsQ0FBQ0EsVUFBVUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7NEJBQ2hEQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxHQUFHQSxDQUFDQTs0QkFDcEJBLE9BQU9BLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLFdBQVdBLENBQUNBOzRCQUNoQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBR0EsQ0FBQ0E7NEJBQ3hCQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxHQUFHQSxDQUFDQTs0QkFDckJBLFFBQVFBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBOzRCQUN4QkEsUUFBUUEsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7d0JBQ3pCQSxDQUFDQTt3QkFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7NEJBQ1BBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBOzRCQUNwQkEsU0FBU0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0E7NEJBQzVCQSxTQUFTQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQTs0QkFDNUJBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLEdBQUdBLENBQUNBOzRCQUNwQkEsT0FBT0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsT0FBT0EsQ0FBQ0E7NEJBQzVCQSxPQUFPQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxPQUFPQSxDQUFDQTs0QkFDNUJBLFFBQVFBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBOzRCQUN0QkEsUUFBUUEsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7NEJBQ3hCQSxRQUFRQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTt3QkFDekJBLENBQUNBO3dCQUNEQSxJQUFJQSxJQUFJQSxDQUFDQSxDQUFDQTt3QkFFVkEsQUFDQUEsaUJBRGlCQTt3QkFDakJBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBOzRCQUNwQkEsQ0FBQ0EsR0FBR0EsZUFBZUEsRUFBRUEsVUFBVUE7NEJBQy9CQSxDQUFDQSxHQUFHQSxlQUFlQSxHQUFHQSxDQUFDQSxFQUFFQSxXQUFXQTs0QkFDcENBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLFdBQVdBLEdBQUdBLENBQUNBLEVBQUVBLHlCQUF5QkE7NEJBQ3ZEQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxXQUFXQSxHQUFHQSxDQUFDQSxFQUFFQSx3QkFBd0JBOzRCQUV0REEsT0FBT0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7NEJBQ3BCQSxPQUFPQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTs0QkFDcEJBLE9BQU9BLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBOzRCQUVwQkEsT0FBT0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7NEJBQ3BCQSxPQUFPQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTs0QkFD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LENBQUVBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUVBLEdBQUNBLGdCQUFnQkEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7d0JBQzlEQSxHQUFHQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFFQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFFQSxHQUFDQSxnQkFBZ0JBLENBQUNBLE1BQU1BLENBQUNBO29CQUMvREEsQ0FBQ0E7Z0JBQ0ZBLENBQUNBO1lBQ0ZBLENBQUNBO1lBRURBLEFBQ0FBLGdDQURnQ0E7WUFDaENBLGdCQUFnQkEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7UUFFakNBLENBQUNBO1FBQUNBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLFlBQVlBLElBQUlBLGlCQUFpQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFFL0NBLENBQUNBO0lBQ0ZBLENBQUNBO0lBQ0ZiLDhCQUFDQTtBQUFEQSxDQXRwQkEsQUFzcEJDQSxFQXRwQnFDLG1CQUFtQixFQXNwQnhEO0FBRUQsQUFBaUMsaUJBQXhCLHVCQUF1QixDQUFDIiwiZmlsZSI6InByZWZhYnMvUHJpbWl0aXZlQ3lsaW5kZXJQcmVmYWIuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IElBc3NldFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9JQXNzZXRcIik7XHJcblxyXG5pbXBvcnQgTGluZVN1Ykdlb21ldHJ5XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2RhdGEvTGluZVN1Ykdlb21ldHJ5XCIpO1xyXG5pbXBvcnQgU3ViR2VvbWV0cnlCYXNlXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2RhdGEvU3ViR2VvbWV0cnlCYXNlXCIpO1xyXG5pbXBvcnQgVHJpYW5nbGVTdWJHZW9tZXRyeVx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZGF0YS9UcmlhbmdsZVN1Ykdlb21ldHJ5XCIpO1xyXG5pbXBvcnQgUHJpbWl0aXZlUHJlZmFiQmFzZVx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcHJlZmFicy9QcmltaXRpdmVQcmVmYWJCYXNlXCIpO1xyXG5cclxuLyoqXHJcbiAqIEEgQ3lsaW5kZXIgcHJpbWl0aXZlIG1lc2guXHJcbiAqL1xyXG5jbGFzcyBQcmltaXRpdmVDeWxpbmRlclByZWZhYiBleHRlbmRzIFByaW1pdGl2ZVByZWZhYkJhc2UgaW1wbGVtZW50cyBJQXNzZXRcclxue1xyXG5cdHB1YmxpYyBfcEJvdHRvbVJhZGl1czpudW1iZXI7XHJcblx0cHVibGljIF9wU2VnbWVudHNXOm51bWJlcjtcclxuXHRwdWJsaWMgX3BTZWdtZW50c0g6bnVtYmVyO1xyXG5cclxuXHRwcml2YXRlIF90b3BSYWRpdXM6bnVtYmVyO1xyXG5cdHByaXZhdGUgX2hlaWdodDpudW1iZXI7XHJcblxyXG5cdHByaXZhdGUgX3RvcENsb3NlZDpib29sZWFuO1xyXG5cdHByaXZhdGUgX2JvdHRvbUNsb3NlZDpib29sZWFuO1xyXG5cdHByaXZhdGUgX3N1cmZhY2VDbG9zZWQ6Ym9vbGVhbjtcclxuXHRwcml2YXRlIF95VXA6Ym9vbGVhbjtcclxuXHRwcml2YXRlIF9udW1WZXJ0aWNlczpudW1iZXIgPSAwO1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgcmFkaXVzIG9mIHRoZSB0b3AgZW5kIG9mIHRoZSBjeWxpbmRlci5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHRvcFJhZGl1cygpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl90b3BSYWRpdXM7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHRvcFJhZGl1cyh2YWx1ZTpudW1iZXIpXHJcblx0e1xyXG5cdFx0dGhpcy5fdG9wUmFkaXVzID0gdmFsdWU7XHJcblx0XHR0aGlzLl9wSW52YWxpZGF0ZUdlb21ldHJ5KCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgcmFkaXVzIG9mIHRoZSBib3R0b20gZW5kIG9mIHRoZSBjeWxpbmRlci5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGJvdHRvbVJhZGl1cygpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9wQm90dG9tUmFkaXVzO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBib3R0b21SYWRpdXModmFsdWU6bnVtYmVyKVxyXG5cdHtcclxuXHRcdHRoaXMuX3BCb3R0b21SYWRpdXMgPSB2YWx1ZTtcclxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlR2VvbWV0cnkoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSByYWRpdXMgb2YgdGhlIHRvcCBlbmQgb2YgdGhlIGN5bGluZGVyLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgaGVpZ2h0KCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2hlaWdodDtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgaGVpZ2h0KHZhbHVlOm51bWJlcilcclxuXHR7XHJcblx0XHR0aGlzLl9oZWlnaHQgPSB2YWx1ZTtcclxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlR2VvbWV0cnkoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIERlZmluZXMgdGhlIG51bWJlciBvZiBob3Jpem9udGFsIHNlZ21lbnRzIHRoYXQgbWFrZSB1cCB0aGUgY3lsaW5kZXIuIERlZmF1bHRzIHRvIDE2LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgc2VnbWVudHNXKCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BTZWdtZW50c1c7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHNlZ21lbnRzVyh2YWx1ZTpudW1iZXIpXHJcblx0e1xyXG5cdFx0dGhpcy5zZXRTZWdtZW50c1codmFsdWUpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldFNlZ21lbnRzVyh2YWx1ZTpudW1iZXIpXHJcblx0e1xyXG5cdFx0dGhpcy5fcFNlZ21lbnRzVyA9IHZhbHVlO1xyXG5cdFx0dGhpcy5fcEludmFsaWRhdGVHZW9tZXRyeSgpO1xyXG5cdFx0dGhpcy5fcEludmFsaWRhdGVVVnMoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIERlZmluZXMgdGhlIG51bWJlciBvZiB2ZXJ0aWNhbCBzZWdtZW50cyB0aGF0IG1ha2UgdXAgdGhlIGN5bGluZGVyLiBEZWZhdWx0cyB0byAxLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgc2VnbWVudHNIKCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BTZWdtZW50c0g7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHNlZ21lbnRzSCh2YWx1ZTpudW1iZXIpXHJcblx0e1xyXG5cclxuXHRcdHRoaXMuc2V0U2VnbWVudHNIKHZhbHVlKVxyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXRTZWdtZW50c0godmFsdWU6bnVtYmVyKVxyXG5cdHtcclxuXHRcdHRoaXMuX3BTZWdtZW50c0ggPSB2YWx1ZTtcclxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlR2VvbWV0cnkoKTtcclxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlVVZzKCk7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRGVmaW5lcyB3aGV0aGVyIHRoZSB0b3AgZW5kIG9mIHRoZSBjeWxpbmRlciBpcyBjbG9zZWQgKHRydWUpIG9yIG9wZW4uXHJcblx0ICovXHJcblx0cHVibGljIGdldCB0b3BDbG9zZWQoKTpib29sZWFuXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3RvcENsb3NlZDtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgdG9wQ2xvc2VkKHZhbHVlOmJvb2xlYW4pXHJcblx0e1xyXG5cdFx0dGhpcy5fdG9wQ2xvc2VkID0gdmFsdWU7XHJcblx0XHR0aGlzLl9wSW52YWxpZGF0ZUdlb21ldHJ5KCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEZWZpbmVzIHdoZXRoZXIgdGhlIGJvdHRvbSBlbmQgb2YgdGhlIGN5bGluZGVyIGlzIGNsb3NlZCAodHJ1ZSkgb3Igb3Blbi5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGJvdHRvbUNsb3NlZCgpOmJvb2xlYW5cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fYm90dG9tQ2xvc2VkO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBib3R0b21DbG9zZWQodmFsdWU6Ym9vbGVhbilcclxuXHR7XHJcblx0XHR0aGlzLl9ib3R0b21DbG9zZWQgPSB2YWx1ZTtcclxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlR2VvbWV0cnkoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIERlZmluZXMgd2hldGhlciB0aGUgY3lsaW5kZXIgcG9sZXMgc2hvdWxkIGxheSBvbiB0aGUgWS1heGlzICh0cnVlKSBvciBvbiB0aGUgWi1heGlzIChmYWxzZSkuXHJcblx0ICovXHJcblx0cHVibGljIGdldCB5VXAoKTpib29sZWFuXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3lVcDtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgeVVwKHZhbHVlOmJvb2xlYW4pXHJcblx0e1xyXG5cdFx0dGhpcy5feVVwID0gdmFsdWU7XHJcblx0XHR0aGlzLl9wSW52YWxpZGF0ZUdlb21ldHJ5KCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGEgbmV3IEN5bGluZGVyIG9iamVjdC5cclxuXHQgKiBAcGFyYW0gdG9wUmFkaXVzIFRoZSByYWRpdXMgb2YgdGhlIHRvcCBlbmQgb2YgdGhlIGN5bGluZGVyLlxyXG5cdCAqIEBwYXJhbSBib3R0b21SYWRpdXMgVGhlIHJhZGl1cyBvZiB0aGUgYm90dG9tIGVuZCBvZiB0aGUgY3lsaW5kZXJcclxuXHQgKiBAcGFyYW0gaGVpZ2h0IFRoZSByYWRpdXMgb2YgdGhlIGJvdHRvbSBlbmQgb2YgdGhlIGN5bGluZGVyXHJcblx0ICogQHBhcmFtIHNlZ21lbnRzVyBEZWZpbmVzIHRoZSBudW1iZXIgb2YgaG9yaXpvbnRhbCBzZWdtZW50cyB0aGF0IG1ha2UgdXAgdGhlIGN5bGluZGVyLiBEZWZhdWx0cyB0byAxNi5cclxuXHQgKiBAcGFyYW0gc2VnbWVudHNIIERlZmluZXMgdGhlIG51bWJlciBvZiB2ZXJ0aWNhbCBzZWdtZW50cyB0aGF0IG1ha2UgdXAgdGhlIGN5bGluZGVyLiBEZWZhdWx0cyB0byAxLlxyXG5cdCAqIEBwYXJhbSB0b3BDbG9zZWQgRGVmaW5lcyB3aGV0aGVyIHRoZSB0b3AgZW5kIG9mIHRoZSBjeWxpbmRlciBpcyBjbG9zZWQgKHRydWUpIG9yIG9wZW4uXHJcblx0ICogQHBhcmFtIGJvdHRvbUNsb3NlZCBEZWZpbmVzIHdoZXRoZXIgdGhlIGJvdHRvbSBlbmQgb2YgdGhlIGN5bGluZGVyIGlzIGNsb3NlZCAodHJ1ZSkgb3Igb3Blbi5cclxuXHQgKiBAcGFyYW0geVVwIERlZmluZXMgd2hldGhlciB0aGUgY29uZSBwb2xlcyBzaG91bGQgbGF5IG9uIHRoZSBZLWF4aXMgKHRydWUpIG9yIG9uIHRoZSBaLWF4aXMgKGZhbHNlKS5cclxuXHQgKi9cclxuXHRjb25zdHJ1Y3Rvcih0b3BSYWRpdXM6bnVtYmVyID0gNTAsIGJvdHRvbVJhZGl1czpudW1iZXIgPSA1MCwgaGVpZ2h0Om51bWJlciA9IDEwMCwgc2VnbWVudHNXOm51bWJlciA9IDE2LCBzZWdtZW50c0g6bnVtYmVyID0gMSwgdG9wQ2xvc2VkOmJvb2xlYW4gPSB0cnVlLCBib3R0b21DbG9zZWQ6Ym9vbGVhbiA9IHRydWUsIHN1cmZhY2VDbG9zZWQ6Ym9vbGVhbiA9IHRydWUsIHlVcDpib29sZWFuID0gdHJ1ZSlcclxuXHR7XHJcblx0XHRzdXBlcigpO1xyXG5cclxuXHRcdHRoaXMuX3RvcFJhZGl1cyA9IHRvcFJhZGl1cztcclxuXHRcdHRoaXMuX3BCb3R0b21SYWRpdXMgPSBib3R0b21SYWRpdXM7XHJcblx0XHR0aGlzLl9oZWlnaHQgPSBoZWlnaHQ7XHJcblx0XHR0aGlzLl9wU2VnbWVudHNXID0gc2VnbWVudHNXO1xyXG5cdFx0dGhpcy5fcFNlZ21lbnRzSCA9IHNlZ21lbnRzSDtcclxuXHRcdHRoaXMuX3RvcENsb3NlZCA9IHRvcENsb3NlZDtcclxuXHRcdHRoaXMuX2JvdHRvbUNsb3NlZCA9IGJvdHRvbUNsb3NlZDtcclxuXHRcdHRoaXMuX3N1cmZhY2VDbG9zZWQgPSBzdXJmYWNlQ2xvc2VkO1xyXG5cdFx0dGhpcy5feVVwID0geVVwO1xyXG5cdH1cclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqIEBpbmhlcml0RG9jXHJcblx0ICovXHJcblx0cHVibGljIF9wQnVpbGRHZW9tZXRyeSh0YXJnZXQ6U3ViR2VvbWV0cnlCYXNlLCBnZW9tZXRyeVR5cGU6c3RyaW5nKVxyXG5cdHtcclxuXHRcdHZhciBpbmRpY2VzOkFycmF5PG51bWJlcj4gLyp1aW50Ki87XHJcblx0XHR2YXIgcG9zaXRpb25zOkFycmF5PG51bWJlcj47XHJcblx0XHR2YXIgbm9ybWFsczpBcnJheTxudW1iZXI+O1xyXG5cdFx0dmFyIHRhbmdlbnRzOkFycmF5PG51bWJlcj47XHJcblxyXG5cdFx0dmFyIGk6bnVtYmVyO1xyXG5cdFx0dmFyIGo6bnVtYmVyO1xyXG5cdFx0dmFyIHg6bnVtYmVyO1xyXG5cdFx0dmFyIHk6bnVtYmVyO1xyXG5cdFx0dmFyIHo6bnVtYmVyO1xyXG5cdFx0dmFyIHZpZHg6bnVtYmVyO1xyXG5cdFx0dmFyIGZpZHg6bnVtYmVyO1xyXG5cclxuXHRcdHZhciByYWRpdXM6bnVtYmVyO1xyXG5cdFx0dmFyIHJldm9sdXRpb25BbmdsZTpudW1iZXI7XHJcblxyXG5cdFx0dmFyIGRyOm51bWJlcjtcclxuXHRcdHZhciBsYXROb3JtRWxldjpudW1iZXI7XHJcblx0XHR2YXIgbGF0Tm9ybUJhc2U6bnVtYmVyO1xyXG5cdFx0dmFyIG51bUluZGljZXM6bnVtYmVyID0gMDtcclxuXHJcblx0XHR2YXIgY29tcDE6bnVtYmVyO1xyXG5cdFx0dmFyIGNvbXAyOm51bWJlcjtcclxuXHRcdHZhciBzdGFydEluZGV4Om51bWJlciA9IDA7XHJcblx0XHR2YXIgbmV4dFZlcnRleEluZGV4Om51bWJlciA9IDA7XHJcblx0XHR2YXIgY2VudGVyVmVydGV4SW5kZXg6bnVtYmVyID0gMDtcclxuXHJcblx0XHR2YXIgdDE6bnVtYmVyO1xyXG5cdFx0dmFyIHQyOm51bWJlcjtcclxuXHJcblx0XHQvLyByZXNldCB1dGlsaXR5IHZhcmlhYmxlc1xyXG5cdFx0dGhpcy5fbnVtVmVydGljZXMgPSAwO1xyXG5cclxuXHRcdC8vIGV2YWx1YXRlIHJldm9sdXRpb24gc3RlcHNcclxuXHRcdHZhciByZXZvbHV0aW9uQW5nbGVEZWx0YTpudW1iZXIgPSAyKk1hdGguUEkvdGhpcy5fcFNlZ21lbnRzVztcclxuXHJcblx0XHRpZiAoZ2VvbWV0cnlUeXBlID09IFwidHJpYW5nbGVTdWJHZW9tZXRyeVwiKSB7XHJcblxyXG5cdFx0XHR2YXIgdHJpYW5nbGVHZW9tZXRyeTpUcmlhbmdsZVN1Ykdlb21ldHJ5ID0gPFRyaWFuZ2xlU3ViR2VvbWV0cnk+IHRhcmdldDtcclxuXHJcblx0XHRcdC8vIGV2YWx1YXRlIHRhcmdldCBudW1iZXIgb2YgdmVydGljZXMsIHRyaWFuZ2xlcyBhbmQgaW5kaWNlc1xyXG5cdFx0XHRpZiAodGhpcy5fc3VyZmFjZUNsb3NlZCkge1xyXG5cdFx0XHRcdHRoaXMuX251bVZlcnRpY2VzICs9ICh0aGlzLl9wU2VnbWVudHNIICsgMSkqKHRoaXMuX3BTZWdtZW50c1cgKyAxKTsgLy8gc2VnbWVudHNIICsgMSBiZWNhdXNlIG9mIGNsb3N1cmUsIHNlZ21lbnRzVyArIDEgYmVjYXVzZSBvZiBVViB1bndyYXBwaW5nXHJcblx0XHRcdFx0bnVtSW5kaWNlcyArPSB0aGlzLl9wU2VnbWVudHNIKnRoaXMuX3BTZWdtZW50c1cqNjsgLy8gZWFjaCBsZXZlbCBoYXMgc2VnbWVudFcgcXVhZHMsIGVhY2ggb2YgMiB0cmlhbmdsZXNcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAodGhpcy5fdG9wQ2xvc2VkKSB7XHJcblx0XHRcdFx0dGhpcy5fbnVtVmVydGljZXMgKz0gMioodGhpcy5fcFNlZ21lbnRzVyArIDEpOyAvLyBzZWdtZW50c1cgKyAxIGJlY2F1c2Ugb2YgdW53cmFwcGluZ1xyXG5cdFx0XHRcdG51bUluZGljZXMgKz0gdGhpcy5fcFNlZ21lbnRzVyozOyAvLyBvbmUgdHJpYW5nbGUgZm9yIGVhY2ggc2VnbWVudFxyXG5cdFx0XHR9XHJcblx0XHRcdGlmICh0aGlzLl9ib3R0b21DbG9zZWQpIHtcclxuXHRcdFx0XHR0aGlzLl9udW1WZXJ0aWNlcyArPSAyKih0aGlzLl9wU2VnbWVudHNXICsgMSk7XHJcblx0XHRcdFx0bnVtSW5kaWNlcyArPSB0aGlzLl9wU2VnbWVudHNXKjM7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIG5lZWQgdG8gaW5pdGlhbGl6ZSByYXcgYXJyYXlzIG9yIGNhbiBiZSByZXVzZWQ/XHJcblx0XHRcdGlmICh0aGlzLl9udW1WZXJ0aWNlcyA9PSB0cmlhbmdsZUdlb21ldHJ5Lm51bVZlcnRpY2VzKSB7XHJcblx0XHRcdFx0aW5kaWNlcyA9IHRyaWFuZ2xlR2VvbWV0cnkuaW5kaWNlcztcclxuXHRcdFx0XHRwb3NpdGlvbnMgPSB0cmlhbmdsZUdlb21ldHJ5LnBvc2l0aW9ucztcclxuXHRcdFx0XHRub3JtYWxzID0gdHJpYW5nbGVHZW9tZXRyeS52ZXJ0ZXhOb3JtYWxzO1xyXG5cdFx0XHRcdHRhbmdlbnRzID0gdHJpYW5nbGVHZW9tZXRyeS52ZXJ0ZXhUYW5nZW50cztcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRpbmRpY2VzID0gbmV3IEFycmF5PG51bWJlcj4obnVtSW5kaWNlcylcclxuXHRcdFx0XHRwb3NpdGlvbnMgPSBuZXcgQXJyYXk8bnVtYmVyPih0aGlzLl9udW1WZXJ0aWNlcyozKTtcclxuXHRcdFx0XHRub3JtYWxzID0gbmV3IEFycmF5PG51bWJlcj4odGhpcy5fbnVtVmVydGljZXMqMyk7XHJcblx0XHRcdFx0dGFuZ2VudHMgPSBuZXcgQXJyYXk8bnVtYmVyPih0aGlzLl9udW1WZXJ0aWNlcyozKTtcclxuXHJcblx0XHRcdFx0dGhpcy5fcEludmFsaWRhdGVVVnMoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmlkeCA9IDA7XHJcblx0XHRcdGZpZHggPSAwO1xyXG5cclxuXHRcdFx0Ly8gdG9wXHJcblx0XHRcdGlmICh0aGlzLl90b3BDbG9zZWQgJiYgdGhpcy5fdG9wUmFkaXVzID4gMCkge1xyXG5cclxuXHRcdFx0XHR6ID0gLTAuNSp0aGlzLl9oZWlnaHQ7XHJcblxyXG5cdFx0XHRcdC8vIGNlbnRyYWwgdmVydGV4XHJcblx0XHRcdFx0aWYgKHRoaXMuX3lVcCkge1xyXG5cdFx0XHRcdFx0dDEgPSAxO1xyXG5cdFx0XHRcdFx0dDIgPSAwO1xyXG5cdFx0XHRcdFx0Y29tcDEgPSAtejtcclxuXHRcdFx0XHRcdGNvbXAyID0gMDtcclxuXHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHQxID0gMDtcclxuXHRcdFx0XHRcdHQyID0gLTE7XHJcblx0XHRcdFx0XHRjb21wMSA9IDA7XHJcblx0XHRcdFx0XHRjb21wMiA9IHo7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRwb3NpdGlvbnNbdmlkeF0gPSAwO1xyXG5cdFx0XHRcdHBvc2l0aW9uc1t2aWR4ICsgMV0gPSBjb21wMTtcclxuXHRcdFx0XHRwb3NpdGlvbnNbdmlkeCArIDJdID0gY29tcDI7XHJcblx0XHRcdFx0bm9ybWFsc1t2aWR4XSA9IDA7XHJcblx0XHRcdFx0bm9ybWFsc1t2aWR4ICsgMV0gPSB0MTtcclxuXHRcdFx0XHRub3JtYWxzW3ZpZHggKyAyXSA9IHQyO1xyXG5cdFx0XHRcdHRhbmdlbnRzW3ZpZHhdID0gMTtcclxuXHRcdFx0XHR0YW5nZW50c1t2aWR4ICsgMV0gPSAwO1xyXG5cdFx0XHRcdHRhbmdlbnRzW3ZpZHggKyAyXSA9IDA7XHJcblx0XHRcdFx0dmlkeCArPSAzO1xyXG5cclxuXHRcdFx0XHRuZXh0VmVydGV4SW5kZXggKz0gMTtcclxuXHJcblx0XHRcdFx0Zm9yIChpID0gMDsgaSA8PSB0aGlzLl9wU2VnbWVudHNXOyArK2kpIHtcclxuXHJcblx0XHRcdFx0XHQvLyByZXZvbHV0aW9uIHZlcnRleFxyXG5cdFx0XHRcdFx0cmV2b2x1dGlvbkFuZ2xlID0gaSpyZXZvbHV0aW9uQW5nbGVEZWx0YTtcclxuXHRcdFx0XHRcdHggPSB0aGlzLl90b3BSYWRpdXMqTWF0aC5jb3MocmV2b2x1dGlvbkFuZ2xlKTtcclxuXHRcdFx0XHRcdHkgPSB0aGlzLl90b3BSYWRpdXMqTWF0aC5zaW4ocmV2b2x1dGlvbkFuZ2xlKTtcclxuXHJcblx0XHRcdFx0XHRpZiAodGhpcy5feVVwKSB7XHJcblx0XHRcdFx0XHRcdGNvbXAxID0gLXo7XHJcblx0XHRcdFx0XHRcdGNvbXAyID0geTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdGNvbXAxID0geTtcclxuXHRcdFx0XHRcdFx0Y29tcDIgPSB6O1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGlmIChpID09IHRoaXMuX3BTZWdtZW50c1cpIHtcclxuXHRcdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHhdID0gcG9zaXRpb25zW3N0YXJ0SW5kZXggKyAzXTtcclxuXHRcdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHggKyAxXSA9IHBvc2l0aW9uc1tzdGFydEluZGV4ICsgNF07XHJcblx0XHRcdFx0XHRcdHBvc2l0aW9uc1t2aWR4ICsgMl0gPSBwb3NpdGlvbnNbc3RhcnRJbmRleCArIDVdO1xyXG5cclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHBvc2l0aW9uc1t2aWR4XSA9IHg7XHJcblx0XHRcdFx0XHRcdHBvc2l0aW9uc1t2aWR4ICsgMV0gPSBjb21wMTtcclxuXHRcdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHggKyAyXSA9IGNvbXAyO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdG5vcm1hbHNbdmlkeF0gPSAwO1xyXG5cdFx0XHRcdFx0bm9ybWFsc1t2aWR4ICsgMV0gPSB0MTtcclxuXHRcdFx0XHRcdG5vcm1hbHNbdmlkeCArIDJdID0gdDI7XHJcblx0XHRcdFx0XHR0YW5nZW50c1t2aWR4XSA9IDE7XHJcblx0XHRcdFx0XHR0YW5nZW50c1t2aWR4ICsgMV0gPSAwO1xyXG5cdFx0XHRcdFx0dGFuZ2VudHNbdmlkeCArIDJdID0gMDtcclxuXHRcdFx0XHRcdHZpZHggKz0gMztcclxuXHJcblx0XHRcdFx0XHRpZiAoaSA+IDApIHtcclxuXHRcdFx0XHRcdFx0Ly8gYWRkIHRyaWFuZ2xlXHJcblx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IG5leHRWZXJ0ZXhJbmRleCAtIDE7XHJcblx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IGNlbnRlclZlcnRleEluZGV4O1xyXG5cdFx0XHRcdFx0XHRpbmRpY2VzW2ZpZHgrK10gPSBuZXh0VmVydGV4SW5kZXg7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0bmV4dFZlcnRleEluZGV4ICs9IDE7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBib3R0b21cclxuXHRcdFx0aWYgKHRoaXMuX2JvdHRvbUNsb3NlZCAmJiB0aGlzLl9wQm90dG9tUmFkaXVzID4gMCkge1xyXG5cclxuXHRcdFx0XHR6ID0gMC41KnRoaXMuX2hlaWdodDtcclxuXHJcblx0XHRcdFx0c3RhcnRJbmRleCA9IG5leHRWZXJ0ZXhJbmRleCozO1xyXG5cclxuXHRcdFx0XHRjZW50ZXJWZXJ0ZXhJbmRleCA9IG5leHRWZXJ0ZXhJbmRleDtcclxuXHJcblx0XHRcdFx0Ly8gY2VudHJhbCB2ZXJ0ZXhcclxuXHRcdFx0XHRpZiAodGhpcy5feVVwKSB7XHJcblx0XHRcdFx0XHR0MSA9IC0xO1xyXG5cdFx0XHRcdFx0dDIgPSAwO1xyXG5cdFx0XHRcdFx0Y29tcDEgPSAtejtcclxuXHRcdFx0XHRcdGNvbXAyID0gMDtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dDEgPSAwO1xyXG5cdFx0XHRcdFx0dDIgPSAxO1xyXG5cdFx0XHRcdFx0Y29tcDEgPSAwO1xyXG5cdFx0XHRcdFx0Y29tcDIgPSB6O1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKGkgPiAwKSB7XHJcblx0XHRcdFx0XHRwb3NpdGlvbnNbdmlkeF0gPSAwO1xyXG5cdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHggKyAxXSA9IGNvbXAxO1xyXG5cdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHggKyAyXSA9IGNvbXAyO1xyXG5cdFx0XHRcdFx0bm9ybWFsc1t2aWR4XSA9IDA7XHJcblx0XHRcdFx0XHRub3JtYWxzW3ZpZHggKyAxXSA9IHQxO1xyXG5cdFx0XHRcdFx0bm9ybWFsc1t2aWR4ICsgMl0gPSB0MjtcclxuXHRcdFx0XHRcdHRhbmdlbnRzW3ZpZHhdID0gMTtcclxuXHRcdFx0XHRcdHRhbmdlbnRzW3ZpZHggKyAxXSA9IDA7XHJcblx0XHRcdFx0XHR0YW5nZW50c1t2aWR4ICsgMl0gPSAwO1xyXG5cdFx0XHRcdFx0dmlkeCArPSAzO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0bmV4dFZlcnRleEluZGV4ICs9IDE7XHJcblxyXG5cdFx0XHRcdGZvciAoaSA9IDA7IGkgPD0gdGhpcy5fcFNlZ21lbnRzVzsgKytpKSB7XHJcblxyXG5cdFx0XHRcdFx0Ly8gcmV2b2x1dGlvbiB2ZXJ0ZXhcclxuXHRcdFx0XHRcdHJldm9sdXRpb25BbmdsZSA9IGkqcmV2b2x1dGlvbkFuZ2xlRGVsdGE7XHJcblx0XHRcdFx0XHR4ID0gdGhpcy5fcEJvdHRvbVJhZGl1cypNYXRoLmNvcyhyZXZvbHV0aW9uQW5nbGUpO1xyXG5cdFx0XHRcdFx0eSA9IHRoaXMuX3BCb3R0b21SYWRpdXMqTWF0aC5zaW4ocmV2b2x1dGlvbkFuZ2xlKTtcclxuXHJcblx0XHRcdFx0XHRpZiAodGhpcy5feVVwKSB7XHJcblx0XHRcdFx0XHRcdGNvbXAxID0gLXo7XHJcblx0XHRcdFx0XHRcdGNvbXAyID0geTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdGNvbXAxID0geTtcclxuXHRcdFx0XHRcdFx0Y29tcDIgPSB6O1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGlmIChpID09IHRoaXMuX3BTZWdtZW50c1cpIHtcclxuXHRcdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHhdID0gcG9zaXRpb25zW3N0YXJ0SW5kZXggKyAzXTtcclxuXHRcdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHggKyAxXSA9IHBvc2l0aW9uc1tzdGFydEluZGV4ICsgNF07XHJcblx0XHRcdFx0XHRcdHBvc2l0aW9uc1t2aWR4ICsgMl0gPSBwb3NpdGlvbnNbc3RhcnRJbmRleCArIDVdO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHhdID0geDtcclxuXHRcdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHggKyAxXSA9IGNvbXAxO1xyXG5cdFx0XHRcdFx0XHRwb3NpdGlvbnNbdmlkeCArIDJdID0gY29tcDI7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0bm9ybWFsc1t2aWR4XSA9IDA7XHJcblx0XHRcdFx0XHRub3JtYWxzW3ZpZHggKyAxXSA9IHQxO1xyXG5cdFx0XHRcdFx0bm9ybWFsc1t2aWR4ICsgMl0gPSB0MjtcclxuXHRcdFx0XHRcdHRhbmdlbnRzW3ZpZHhdID0gMTtcclxuXHRcdFx0XHRcdHRhbmdlbnRzW3ZpZHggKyAxXSA9IDA7XHJcblx0XHRcdFx0XHR0YW5nZW50c1t2aWR4ICsgMl0gPSAwO1xyXG5cdFx0XHRcdFx0dmlkeCArPSAzO1xyXG5cclxuXHRcdFx0XHRcdGlmIChpID4gMCkge1xyXG5cdFx0XHRcdFx0XHQvLyBhZGQgdHJpYW5nbGVcclxuXHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gbmV4dFZlcnRleEluZGV4IC0gMTtcclxuXHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gbmV4dFZlcnRleEluZGV4O1xyXG5cdFx0XHRcdFx0XHRpbmRpY2VzW2ZpZHgrK10gPSBjZW50ZXJWZXJ0ZXhJbmRleDtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRuZXh0VmVydGV4SW5kZXggKz0gMTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIFRoZSBub3JtYWxzIG9uIHRoZSBsYXRlcmFsIHN1cmZhY2UgYWxsIGhhdmUgdGhlIHNhbWUgaW5jbGluZSwgaS5lLlxyXG5cdFx0XHQvLyB0aGUgXCJlbGV2YXRpb25cIiBjb21wb25lbnQgKFkgb3IgWiBkZXBlbmRpbmcgb24geVVwKSBpcyBjb25zdGFudC5cclxuXHRcdFx0Ly8gU2FtZSBwcmluY2lwbGUgZ29lcyBmb3IgdGhlIFwiYmFzZVwiIG9mIHRoZXNlIHZlY3RvcnMsIHdoaWNoIHdpbGwgYmVcclxuXHRcdFx0Ly8gY2FsY3VsYXRlZCBzdWNoIHRoYXQgYSB2ZWN0b3IgW2Jhc2UsZWxldl0gd2lsbCBiZSBhIHVuaXQgdmVjdG9yLlxyXG5cdFx0XHRkciA9ICh0aGlzLl9wQm90dG9tUmFkaXVzIC0gdGhpcy5fdG9wUmFkaXVzKTtcclxuXHRcdFx0bGF0Tm9ybUVsZXYgPSBkci90aGlzLl9oZWlnaHQ7XHJcblx0XHRcdGxhdE5vcm1CYXNlID0gKGxhdE5vcm1FbGV2ID09IDApPyAxIDogdGhpcy5faGVpZ2h0L2RyO1xyXG5cclxuXHRcdFx0Ly8gbGF0ZXJhbCBzdXJmYWNlXHJcblx0XHRcdGlmICh0aGlzLl9zdXJmYWNlQ2xvc2VkKSB7XHJcblx0XHRcdFx0dmFyIGE6bnVtYmVyO1xyXG5cdFx0XHRcdHZhciBiOm51bWJlcjtcclxuXHRcdFx0XHR2YXIgYzpudW1iZXI7XHJcblx0XHRcdFx0dmFyIGQ6bnVtYmVyO1xyXG5cdFx0XHRcdHZhciBuYTA6bnVtYmVyLCBuYTE6bnVtYmVyLCBuYUNvbXAxOm51bWJlciwgbmFDb21wMjpudW1iZXI7XHJcblxyXG5cdFx0XHRcdGZvciAoaiA9IDA7IGogPD0gdGhpcy5fcFNlZ21lbnRzSDsgKytqKSB7XHJcblx0XHRcdFx0XHRyYWRpdXMgPSB0aGlzLl90b3BSYWRpdXMgLSAoKGovdGhpcy5fcFNlZ21lbnRzSCkqKHRoaXMuX3RvcFJhZGl1cyAtIHRoaXMuX3BCb3R0b21SYWRpdXMpKTtcclxuXHRcdFx0XHRcdHogPSAtKHRoaXMuX2hlaWdodC8yKSArIChqL3RoaXMuX3BTZWdtZW50c0gqdGhpcy5faGVpZ2h0KTtcclxuXHJcblx0XHRcdFx0XHRzdGFydEluZGV4ID0gbmV4dFZlcnRleEluZGV4KjM7XHJcblxyXG5cdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8PSB0aGlzLl9wU2VnbWVudHNXOyArK2kpIHtcclxuXHRcdFx0XHRcdFx0Ly8gcmV2b2x1dGlvbiB2ZXJ0ZXhcclxuXHRcdFx0XHRcdFx0cmV2b2x1dGlvbkFuZ2xlID0gaSpyZXZvbHV0aW9uQW5nbGVEZWx0YTtcclxuXHRcdFx0XHRcdFx0eCA9IHJhZGl1cypNYXRoLmNvcyhyZXZvbHV0aW9uQW5nbGUpO1xyXG5cdFx0XHRcdFx0XHR5ID0gcmFkaXVzKk1hdGguc2luKHJldm9sdXRpb25BbmdsZSk7XHJcblx0XHRcdFx0XHRcdG5hMCA9IGxhdE5vcm1CYXNlKk1hdGguY29zKHJldm9sdXRpb25BbmdsZSk7XHJcblx0XHRcdFx0XHRcdG5hMSA9IGxhdE5vcm1CYXNlKk1hdGguc2luKHJldm9sdXRpb25BbmdsZSk7XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAodGhpcy5feVVwKSB7XHJcblx0XHRcdFx0XHRcdFx0dDEgPSAwO1xyXG5cdFx0XHRcdFx0XHRcdHQyID0gLW5hMDtcclxuXHRcdFx0XHRcdFx0XHRjb21wMSA9IC16O1xyXG5cdFx0XHRcdFx0XHRcdGNvbXAyID0geTtcclxuXHRcdFx0XHRcdFx0XHRuYUNvbXAxID0gbGF0Tm9ybUVsZXY7XHJcblx0XHRcdFx0XHRcdFx0bmFDb21wMiA9IG5hMTtcclxuXHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0dDEgPSAtbmEwO1xyXG5cdFx0XHRcdFx0XHRcdHQyID0gMDtcclxuXHRcdFx0XHRcdFx0XHRjb21wMSA9IHk7XHJcblx0XHRcdFx0XHRcdFx0Y29tcDIgPSB6O1xyXG5cdFx0XHRcdFx0XHRcdG5hQ29tcDEgPSBuYTE7XHJcblx0XHRcdFx0XHRcdFx0bmFDb21wMiA9IGxhdE5vcm1FbGV2O1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAoaSA9PSB0aGlzLl9wU2VnbWVudHNXKSB7XHJcblx0XHRcdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHhdID0gcG9zaXRpb25zW3N0YXJ0SW5kZXhdO1xyXG5cdFx0XHRcdFx0XHRcdHBvc2l0aW9uc1t2aWR4ICsgMV0gPSBwb3NpdGlvbnNbc3RhcnRJbmRleCArIDFdO1xyXG5cdFx0XHRcdFx0XHRcdHBvc2l0aW9uc1t2aWR4ICsgMl0gPSBwb3NpdGlvbnNbc3RhcnRJbmRleCArIDJdO1xyXG5cdFx0XHRcdFx0XHRcdG5vcm1hbHNbdmlkeF0gPSBuYTA7XHJcblx0XHRcdFx0XHRcdFx0bm9ybWFsc1t2aWR4ICsgMV0gPSBsYXROb3JtRWxldjtcclxuXHRcdFx0XHRcdFx0XHRub3JtYWxzW3ZpZHggKyAyXSA9IG5hMTtcclxuXHRcdFx0XHRcdFx0XHR0YW5nZW50c1t2aWR4XSA9IG5hMTtcclxuXHRcdFx0XHRcdFx0XHR0YW5nZW50c1t2aWR4ICsgMV0gPSB0MTtcclxuXHRcdFx0XHRcdFx0XHR0YW5nZW50c1t2aWR4ICsgMl0gPSB0MjtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRwb3NpdGlvbnNbdmlkeF0gPSB4O1xyXG5cdFx0XHRcdFx0XHRcdHBvc2l0aW9uc1t2aWR4ICsgMV0gPSBjb21wMTtcclxuXHRcdFx0XHRcdFx0XHRwb3NpdGlvbnNbdmlkeCArIDJdID0gY29tcDI7XHJcblx0XHRcdFx0XHRcdFx0bm9ybWFsc1t2aWR4XSA9IG5hMDtcclxuXHRcdFx0XHRcdFx0XHRub3JtYWxzW3ZpZHggKyAxXSA9IG5hQ29tcDE7XHJcblx0XHRcdFx0XHRcdFx0bm9ybWFsc1t2aWR4ICsgMl0gPSBuYUNvbXAyO1xyXG5cdFx0XHRcdFx0XHRcdHRhbmdlbnRzW3ZpZHhdID0gLW5hMTtcclxuXHRcdFx0XHRcdFx0XHR0YW5nZW50c1t2aWR4ICsgMV0gPSB0MTtcclxuXHRcdFx0XHRcdFx0XHR0YW5nZW50c1t2aWR4ICsgMl0gPSB0MjtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR2aWR4ICs9IDM7XHJcblxyXG5cdFx0XHRcdFx0XHQvLyBjbG9zZSB0cmlhbmdsZVxyXG5cdFx0XHRcdFx0XHRpZiAoaSA+IDAgJiYgaiA+IDApIHtcclxuXHRcdFx0XHRcdFx0XHRhID0gbmV4dFZlcnRleEluZGV4OyAvLyBjdXJyZW50XHJcblx0XHRcdFx0XHRcdFx0YiA9IG5leHRWZXJ0ZXhJbmRleCAtIDE7IC8vIHByZXZpb3VzXHJcblx0XHRcdFx0XHRcdFx0YyA9IGIgLSB0aGlzLl9wU2VnbWVudHNXIC0gMTsgLy8gcHJldmlvdXMgb2YgbGFzdCBsZXZlbFxyXG5cdFx0XHRcdFx0XHRcdGQgPSBhIC0gdGhpcy5fcFNlZ21lbnRzVyAtIDE7IC8vIGN1cnJlbnQgb2YgbGFzdCBsZXZlbFxyXG5cclxuXHRcdFx0XHRcdFx0XHRpbmRpY2VzW2ZpZHgrK10gPSBhO1xyXG5cdFx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IGI7XHJcblx0XHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gYztcclxuXHJcblx0XHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gYTtcclxuXHRcdFx0XHRcdFx0XHRpbmRpY2VzW2ZpZHgrK10gPSBjO1xyXG5cdFx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IGQ7XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdG5leHRWZXJ0ZXhJbmRleCsrO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gYnVpbGQgcmVhbCBkYXRhIGZyb20gcmF3IGRhdGFcclxuXHRcdFx0dHJpYW5nbGVHZW9tZXRyeS51cGRhdGVJbmRpY2VzKGluZGljZXMpO1xyXG5cclxuXHRcdFx0dHJpYW5nbGVHZW9tZXRyeS51cGRhdGVQb3NpdGlvbnMocG9zaXRpb25zKTtcclxuXHRcdFx0dHJpYW5nbGVHZW9tZXRyeS51cGRhdGVWZXJ0ZXhOb3JtYWxzKG5vcm1hbHMpO1xyXG5cdFx0XHR0cmlhbmdsZUdlb21ldHJ5LnVwZGF0ZVZlcnRleFRhbmdlbnRzKHRhbmdlbnRzKTtcclxuXHJcblx0XHR9IGVsc2UgaWYgKGdlb21ldHJ5VHlwZSA9PSBcImxpbmVTdWJHZW9tZXRyeVwiKSB7XHJcblx0XHRcdHZhciBsaW5lR2VvbWV0cnk6TGluZVN1Ykdlb21ldHJ5ID0gPExpbmVTdWJHZW9tZXRyeT4gdGFyZ2V0O1xyXG5cclxuXHRcdFx0dmFyIG51bVNlZ21lbnRzOm51bWJlciA9ICh0aGlzLl9wU2VnbWVudHNIICsgMSkqKHRoaXMuX3BTZWdtZW50c1cpICsgdGhpcy5fcFNlZ21lbnRzVztcclxuXHRcdFx0dmFyIHN0YXJ0UG9zaXRpb25zOkFycmF5PG51bWJlcj47XHJcblx0XHRcdHZhciBlbmRQb3NpdGlvbnM6QXJyYXk8bnVtYmVyPjtcclxuXHRcdFx0dmFyIHRoaWNrbmVzczpBcnJheTxudW1iZXI+O1xyXG5cclxuXHRcdFx0aWYgKGxpbmVHZW9tZXRyeS5pbmRpY2VzICE9IG51bGwgJiYgbnVtU2VnbWVudHMgPT0gbGluZUdlb21ldHJ5Lm51bVNlZ21lbnRzKSB7XHJcblx0XHRcdFx0c3RhcnRQb3NpdGlvbnMgPSBsaW5lR2VvbWV0cnkuc3RhcnRQb3NpdGlvbnM7XHJcblx0XHRcdFx0ZW5kUG9zaXRpb25zID0gbGluZUdlb21ldHJ5LmVuZFBvc2l0aW9ucztcclxuXHRcdFx0XHR0aGlja25lc3MgPSBsaW5lR2VvbWV0cnkudGhpY2tuZXNzO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHN0YXJ0UG9zaXRpb25zID0gbmV3IEFycmF5PG51bWJlcj4obnVtU2VnbWVudHMqMyk7XHJcblx0XHRcdFx0ZW5kUG9zaXRpb25zID0gbmV3IEFycmF5PG51bWJlcj4obnVtU2VnbWVudHMqMyk7XHJcblx0XHRcdFx0dGhpY2tuZXNzID0gbmV3IEFycmF5PG51bWJlcj4obnVtU2VnbWVudHMpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2aWR4ID0gMDtcclxuXHJcblx0XHRcdGZpZHggPSAwO1xyXG5cclxuXHRcdFx0Ly9ob3Jpem9uYWwgbGluZXNcclxuXHJcblx0XHRcdGZvciAoaiA9IDA7IGogPD0gdGhpcy5fcFNlZ21lbnRzSDsgKytqKSB7XHJcblx0XHRcdFx0cmFkaXVzID0gdGhpcy5fdG9wUmFkaXVzIC0gKChqL3RoaXMuX3BTZWdtZW50c0gpKih0aGlzLl90b3BSYWRpdXMgLSB0aGlzLl9wQm90dG9tUmFkaXVzKSk7XHJcblx0XHRcdFx0eiA9IHRoaXMuX2hlaWdodCooai90aGlzLl9wU2VnbWVudHNIIC0gMC41KTtcclxuXHJcblx0XHRcdFx0Zm9yIChpID0gMDsgaSA8PSB0aGlzLl9wU2VnbWVudHNXOyArK2kpIHtcclxuXHRcdFx0XHRcdC8vIHJldm9sdXRpb24gdmVydGV4XHJcblx0XHRcdFx0XHRyZXZvbHV0aW9uQW5nbGUgPSBpKnJldm9sdXRpb25BbmdsZURlbHRhO1xyXG5cdFx0XHRcdFx0eCA9IHJhZGl1cypNYXRoLmNvcyhyZXZvbHV0aW9uQW5nbGUpO1xyXG5cdFx0XHRcdFx0eSA9IHJhZGl1cypNYXRoLnNpbihyZXZvbHV0aW9uQW5nbGUpO1xyXG5cclxuXHRcdFx0XHRcdGlmICh0aGlzLl95VXApIHtcclxuXHRcdFx0XHRcdFx0Y29tcDEgPSAtejtcclxuXHRcdFx0XHRcdFx0Y29tcDIgPSB5O1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0Y29tcDEgPSB5O1xyXG5cdFx0XHRcdFx0XHRjb21wMiA9IHo7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0aWYgKGkgPiAwKSB7XHJcblx0XHRcdFx0XHRcdGVuZFBvc2l0aW9uc1t2aWR4XSA9IHg7XHJcblx0XHRcdFx0XHRcdGVuZFBvc2l0aW9uc1t2aWR4ICsgMV0gPSBjb21wMTtcclxuXHRcdFx0XHRcdFx0ZW5kUG9zaXRpb25zW3ZpZHggKyAyXSA9IGNvbXAyO1xyXG5cclxuXHRcdFx0XHRcdFx0dGhpY2tuZXNzW2ZpZHgrK10gPSAxO1xyXG5cclxuXHRcdFx0XHRcdFx0dmlkeCArPSAzO1xyXG5cclxuXHRcdFx0XHRcdFx0Ly92ZXJ0aWNhbCBsaW5lc1xyXG5cdFx0XHRcdFx0XHRzdGFydFBvc2l0aW9uc1t2aWR4XSA9IGVuZFBvc2l0aW9uc1t2aWR4IC0gdGhpcy5fcFNlZ21lbnRzVyo2XTtcclxuXHRcdFx0XHRcdFx0c3RhcnRQb3NpdGlvbnNbdmlkeCArIDFdID0gZW5kUG9zaXRpb25zW3ZpZHggKyAxIC0gdGhpcy5fcFNlZ21lbnRzVyo2XTtcclxuXHRcdFx0XHRcdFx0c3RhcnRQb3NpdGlvbnNbdmlkeCArIDJdID0gZW5kUG9zaXRpb25zW3ZpZHggKyAyIC0gdGhpcy5fcFNlZ21lbnRzVyo2XTtcclxuXHJcblx0XHRcdFx0XHRcdGVuZFBvc2l0aW9uc1t2aWR4XSA9IHg7XHJcblx0XHRcdFx0XHRcdGVuZFBvc2l0aW9uc1t2aWR4ICsgMV0gPSBjb21wMTtcclxuXHRcdFx0XHRcdFx0ZW5kUG9zaXRpb25zW3ZpZHggKyAyXSA9IGNvbXAyO1xyXG5cclxuXHRcdFx0XHRcdFx0dGhpY2tuZXNzW2ZpZHgrK10gPSAxO1xyXG5cclxuXHRcdFx0XHRcdFx0dmlkeCArPSAzO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGlmIChpIDwgdGhpcy5fcFNlZ21lbnRzVykge1xyXG5cdFx0XHRcdFx0XHRzdGFydFBvc2l0aW9uc1t2aWR4XSA9IHg7XHJcblx0XHRcdFx0XHRcdHN0YXJ0UG9zaXRpb25zW3ZpZHggKyAxXSA9IGNvbXAxO1xyXG5cdFx0XHRcdFx0XHRzdGFydFBvc2l0aW9uc1t2aWR4ICsgMl0gPSBjb21wMjtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIGJ1aWxkIHJlYWwgZGF0YSBmcm9tIHJhdyBkYXRhXHJcblx0XHRcdGxpbmVHZW9tZXRyeS51cGRhdGVQb3NpdGlvbnMoc3RhcnRQb3NpdGlvbnMsIGVuZFBvc2l0aW9ucyk7XHJcblx0XHRcdGxpbmVHZW9tZXRyeS51cGRhdGVUaGlja25lc3ModGhpY2tuZXNzKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBpbmhlcml0RG9jXHJcblx0ICovXHJcblx0cHVibGljIF9wQnVpbGRVVnModGFyZ2V0OlN1Ykdlb21ldHJ5QmFzZSwgZ2VvbWV0cnlUeXBlOnN0cmluZylcclxuXHR7XHJcblx0XHR2YXIgaTpudW1iZXI7XHJcblx0XHR2YXIgajpudW1iZXI7XHJcblx0XHR2YXIgeDpudW1iZXI7XHJcblx0XHR2YXIgeTpudW1iZXI7XHJcblx0XHR2YXIgcmV2b2x1dGlvbkFuZ2xlOm51bWJlcjtcclxuXHRcdHZhciB1dnM6QXJyYXk8bnVtYmVyPjtcclxuXHJcblx0XHRpZiAoZ2VvbWV0cnlUeXBlID09IFwidHJpYW5nbGVTdWJHZW9tZXRyeVwiKSB7XHJcblxyXG5cdFx0XHR2YXIgdHJpYW5nbGVHZW9tZXRyeTpUcmlhbmdsZVN1Ykdlb21ldHJ5ID0gPFRyaWFuZ2xlU3ViR2VvbWV0cnk+IHRhcmdldDtcclxuXHJcblx0XHRcdC8vIG5lZWQgdG8gaW5pdGlhbGl6ZSByYXcgYXJyYXkgb3IgY2FuIGJlIHJldXNlZD9cclxuXHRcdFx0aWYgKHRyaWFuZ2xlR2VvbWV0cnkudXZzICYmIHRoaXMuX251bVZlcnRpY2VzID09IHRyaWFuZ2xlR2VvbWV0cnkubnVtVmVydGljZXMpIHtcclxuXHRcdFx0XHR1dnMgPSB0cmlhbmdsZUdlb21ldHJ5LnV2cztcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR1dnMgPSBuZXcgQXJyYXk8bnVtYmVyPih0aGlzLl9udW1WZXJ0aWNlcyoyKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gZXZhbHVhdGUgcmV2b2x1dGlvbiBzdGVwc1xyXG5cdFx0XHR2YXIgcmV2b2x1dGlvbkFuZ2xlRGVsdGE6bnVtYmVyID0gMipNYXRoLlBJL3RoaXMuX3BTZWdtZW50c1c7XHJcblxyXG5cdFx0XHQvLyBjdXJyZW50IHV2IGNvbXBvbmVudCBpbmRleFxyXG5cdFx0XHR2YXIgaW5kZXg6bnVtYmVyID0gMDtcclxuXHJcblx0XHRcdC8vIHRvcFxyXG5cdFx0XHRpZiAodGhpcy5fdG9wQ2xvc2VkKSB7XHJcblxyXG5cdFx0XHRcdHV2c1tpbmRleCsrXSA9IDAuNSp0cmlhbmdsZUdlb21ldHJ5LnNjYWxlVTsgLy8gY2VudHJhbCB2ZXJ0ZXhcclxuXHRcdFx0XHR1dnNbaW5kZXgrK10gPSAwLjUqdHJpYW5nbGVHZW9tZXRyeS5zY2FsZVY7XHJcblxyXG5cdFx0XHRcdGZvciAoaSA9IDA7IGkgPD0gdGhpcy5fcFNlZ21lbnRzVzsgKytpKSB7XHJcblxyXG5cdFx0XHRcdFx0cmV2b2x1dGlvbkFuZ2xlID0gaSpyZXZvbHV0aW9uQW5nbGVEZWx0YTtcclxuXHRcdFx0XHRcdHggPSAwLjUgKyAwLjUqIC1NYXRoLmNvcyhyZXZvbHV0aW9uQW5nbGUpO1xyXG5cdFx0XHRcdFx0eSA9IDAuNSArIDAuNSpNYXRoLnNpbihyZXZvbHV0aW9uQW5nbGUpO1xyXG5cclxuXHRcdFx0XHRcdHV2c1tpbmRleCsrXSA9IHgqdHJpYW5nbGVHZW9tZXRyeS5zY2FsZVU7IC8vIHJldm9sdXRpb24gdmVydGV4XHJcblx0XHRcdFx0XHR1dnNbaW5kZXgrK10gPSB5KnRyaWFuZ2xlR2VvbWV0cnkuc2NhbGVWO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gYm90dG9tXHJcblx0XHRcdGlmICh0aGlzLl9ib3R0b21DbG9zZWQpIHtcclxuXHJcblx0XHRcdFx0dXZzW2luZGV4KytdID0gMC41KnRyaWFuZ2xlR2VvbWV0cnkuc2NhbGVVOyAvLyBjZW50cmFsIHZlcnRleFxyXG5cdFx0XHRcdHV2c1tpbmRleCsrXSA9IDAuNSp0cmlhbmdsZUdlb21ldHJ5LnNjYWxlVjtcclxuXHJcblx0XHRcdFx0Zm9yIChpID0gMDsgaSA8PSB0aGlzLl9wU2VnbWVudHNXOyArK2kpIHtcclxuXHJcblx0XHRcdFx0XHRyZXZvbHV0aW9uQW5nbGUgPSBpKnJldm9sdXRpb25BbmdsZURlbHRhO1xyXG5cdFx0XHRcdFx0eCA9IDAuNSArIDAuNSpNYXRoLmNvcyhyZXZvbHV0aW9uQW5nbGUpO1xyXG5cdFx0XHRcdFx0eSA9IDAuNSArIDAuNSpNYXRoLnNpbihyZXZvbHV0aW9uQW5nbGUpO1xyXG5cclxuXHRcdFx0XHRcdHV2c1tpbmRleCsrXSA9IHgqdHJpYW5nbGVHZW9tZXRyeS5zY2FsZVU7IC8vIHJldm9sdXRpb24gdmVydGV4XHJcblx0XHRcdFx0XHR1dnNbaW5kZXgrK10gPSB5KnRyaWFuZ2xlR2VvbWV0cnkuc2NhbGVWO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gbGF0ZXJhbCBzdXJmYWNlXHJcblx0XHRcdGlmICh0aGlzLl9zdXJmYWNlQ2xvc2VkKSB7XHJcblx0XHRcdFx0Zm9yIChqID0gMDsgaiA8PSB0aGlzLl9wU2VnbWVudHNIOyArK2opIHtcclxuXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPD0gdGhpcy5fcFNlZ21lbnRzVzsgKytpKSB7XHJcblx0XHRcdFx0XHRcdC8vIHJldm9sdXRpb24gdmVydGV4XHJcblx0XHRcdFx0XHRcdHV2c1tpbmRleCsrXSA9ICggaS90aGlzLl9wU2VnbWVudHNXICkqdHJpYW5nbGVHZW9tZXRyeS5zY2FsZVU7XHJcblx0XHRcdFx0XHRcdHV2c1tpbmRleCsrXSA9ICggai90aGlzLl9wU2VnbWVudHNIICkqdHJpYW5nbGVHZW9tZXRyeS5zY2FsZVY7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBidWlsZCByZWFsIGRhdGEgZnJvbSByYXcgZGF0YVxyXG5cdFx0XHR0cmlhbmdsZUdlb21ldHJ5LnVwZGF0ZVVWcyh1dnMpO1xyXG5cclxuXHRcdH0gZWxzZSBpZiAoZ2VvbWV0cnlUeXBlID09IFwibGluZVN1Ykdlb21ldHJ5XCIpIHtcclxuXHRcdFx0Ly9ub3RoaW5nIHRvIGRvIGhlcmVcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCA9IFByaW1pdGl2ZUN5bGluZGVyUHJlZmFiOyJdfQ==