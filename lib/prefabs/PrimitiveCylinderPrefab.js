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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9wcmVmYWJzL1ByaW1pdGl2ZUN5bGluZGVyUHJlZmFiLnRzIl0sIm5hbWVzIjpbIlByaW1pdGl2ZUN5bGluZGVyUHJlZmFiIiwiUHJpbWl0aXZlQ3lsaW5kZXJQcmVmYWIuY29uc3RydWN0b3IiLCJQcmltaXRpdmVDeWxpbmRlclByZWZhYi50b3BSYWRpdXMiLCJQcmltaXRpdmVDeWxpbmRlclByZWZhYi5ib3R0b21SYWRpdXMiLCJQcmltaXRpdmVDeWxpbmRlclByZWZhYi5oZWlnaHQiLCJQcmltaXRpdmVDeWxpbmRlclByZWZhYi5zZWdtZW50c1ciLCJQcmltaXRpdmVDeWxpbmRlclByZWZhYi5zZXRTZWdtZW50c1ciLCJQcmltaXRpdmVDeWxpbmRlclByZWZhYi5zZWdtZW50c0giLCJQcmltaXRpdmVDeWxpbmRlclByZWZhYi5zZXRTZWdtZW50c0giLCJQcmltaXRpdmVDeWxpbmRlclByZWZhYi50b3BDbG9zZWQiLCJQcmltaXRpdmVDeWxpbmRlclByZWZhYi5ib3R0b21DbG9zZWQiLCJQcmltaXRpdmVDeWxpbmRlclByZWZhYi55VXAiLCJQcmltaXRpdmVDeWxpbmRlclByZWZhYi5fcEJ1aWxkR2VvbWV0cnkiLCJQcmltaXRpdmVDeWxpbmRlclByZWZhYi5fcEJ1aWxkVVZzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFLQSxJQUFPLG1CQUFtQixXQUFZLGdEQUFnRCxDQUFDLENBQUM7QUFFeEYsQUFHQTs7R0FERztJQUNHLHVCQUF1QjtJQUFTQSxVQUFoQ0EsdUJBQXVCQSxVQUE0QkE7SUE4SXhEQTs7Ozs7Ozs7OztPQVVHQTtJQUNIQSxTQXpKS0EsdUJBQXVCQSxDQXlKaEJBLFNBQXFCQSxFQUFFQSxZQUF3QkEsRUFBRUEsTUFBbUJBLEVBQUVBLFNBQXFCQSxFQUFFQSxTQUFvQkEsRUFBRUEsU0FBd0JBLEVBQUVBLFlBQTJCQSxFQUFFQSxhQUE0QkEsRUFBRUEsR0FBa0JBO1FBQTFOQyx5QkFBcUJBLEdBQXJCQSxjQUFx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aUJBO2dCQUNqQkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ2ZBLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBO29CQUNQQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFDUEEsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ1hBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBO2dCQUVYQSxDQUFDQTtnQkFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7b0JBQ1BBLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBO29CQUNQQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDUkEsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBQ1ZBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBO2dCQUNYQSxDQUFDQTtnQkFFREEsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3BCQSxTQUFTQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQTtnQkFDNUJBLFNBQVNBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBO2dCQUM1QkEsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2xCQSxPQUFPQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTtnQkFDdkJBLE9BQU9BLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO2dCQUN2QkEsUUFBUUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ25CQSxRQUFRQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFDdkJBLFFBQVFBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dC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QUdBLE1BQU1BLEdBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLGVBQWVBLENBQUNBLENBQUNBO3dCQUNyQ0EsQ0FBQ0EsR0FBR0EsTUFBTUEsR0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsZUFBZUEsQ0FBQ0EsQ0FBQ0E7d0JBQ3JDQSxHQUFHQSxHQUFHQSxXQUFXQSxHQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxlQUFlQSxDQUFDQSxDQUFDQTt3QkFDNUNBLEdBQUdBLEdBQUdBLFdBQVdBLEdBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLGVBQWVBLENBQUNBLENBQUNBO3dCQUU1Q0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7NEJBQ2ZBLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBOzRCQUNQQSxFQUFFQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQTs0QkFDVkEsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7NEJBQ1hBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBOzRCQUNWQSxPQUFPQSxHQUFHQSxXQUFXQSxDQUFDQTs0QkFDdEJBLE9BQU9BLEdBQUdBLEdBQUdBLENBQUNBO3dCQUVmQSxDQUFDQTt3QkFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7NEJBQ1BBLEVBQUVBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBOzRCQUNWQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQTs0QkFDUEEsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7NEJBQ1ZBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBOzRCQUNWQSxPQUFPQSxHQUFHQSxHQUFHQSxDQUFDQTs0QkFDZEEsT0FBT0EsR0FBR0EsV0FBV0EsQ0FBQ0E7d0JBQ3ZCQSxDQUFDQTt3QkFFREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7NEJBQzNCQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxTQUFTQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQTs0QkFDeENBLFNBQVNBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLFNBQVNBLENBQUNBLFVBQVVBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBOzRCQUNoREEsU0FBU0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsU0FBU0EsQ0FBQ0EsVUFBVUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7NEJBQ2hEQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxHQUFHQSxDQUFDQTs0QkFDcEJBLE9BQU9BLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLFdBQVdBLENBQUNBOzRCQUNoQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBR0EsQ0FBQ0E7NEJBQ3hCQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxHQUFHQSxDQUFDQTs0QkFDckJBLFFBQVFBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBOzRCQUN4QkEsUUFBUUEsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7d0JBQ3pCQSxDQUFDQTt3QkFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7NEJBQ1BBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBOzRCQUNwQkEsU0FBU0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0E7NEJBQzVCQSxTQUFTQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQTs0QkFDNUJBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLEdBQUdBLENBQUNBOzRCQUNwQkEsT0FBT0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsT0FBT0EsQ0FBQ0E7NEJBQzVCQSxPQUFPQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxPQUFPQSxDQUFDQTs0QkFDNUJBLFFBQVFBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBOzRCQUN0QkEsUUFBUUEsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7NEJBQ3hCQSxRQUFRQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTt3QkFDekJBLENBQUNBO3dCQUNEQSxJQUFJQSxJQUFJQSxDQUFDQSxDQUFDQTt3QkFFVkEsQUFDQUEsaUJBRGlCQTt3QkFDakJBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBOzRCQUNwQkEsQ0FBQ0EsR0FBR0EsZUFBZUEsRUFBRUEsVUFBVUE7NEJBQy9CQSxDQUFDQSxHQUFHQSxlQUFlQSxHQUFHQSxDQUFDQSxFQUFFQSxXQUFXQTs0QkFDcENBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLFdBQVdBLEdBQUdBLENBQUNBLEVBQUVBLHlCQUF5QkE7NEJBQ3ZEQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxXQUFXQSxHQUFHQSxDQUFDQSxFQUFFQSx3QkFBd0JBOzRCQUV0REEsT0FBT0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7NEJBQ3BCQSxPQUFPQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTs0QkFDcEJBLE9BQU9BLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBOzRCQUVwQkEsT0FBT0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7NEJBQ3BCQSxPQUFPQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTs0QkFD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LENBQUVBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUVBLEdBQUNBLGdCQUFnQkEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7d0JBQzlEQSxHQUFHQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFFQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFFQSxHQUFDQSxnQkFBZ0JBLENBQUNBLE1BQU1BLENBQUNBO29CQUMvREEsQ0FBQ0E7Z0JBQ0ZBLENBQUNBO1lBQ0ZBLENBQUNBO1lBRURBLEFBQ0FBLGdDQURnQ0E7WUFDaENBLGdCQUFnQkEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7UUFFakNBLENBQUNBO1FBQUNBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLFlBQVlBLElBQUlBLGlCQUFpQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFFL0NBLENBQUNBO0lBQ0ZBLENBQUNBO0lBQ0ZiLDhCQUFDQTtBQUFEQSxDQXRwQkEsQUFzcEJDQSxFQXRwQnFDLG1CQUFtQixFQXNwQnhEO0FBRUQsQUFBaUMsaUJBQXhCLHVCQUF1QixDQUFDIiwiZmlsZSI6InByZWZhYnMvUHJpbWl0aXZlQ3lsaW5kZXJQcmVmYWIuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IElBc3NldFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9JQXNzZXRcIik7XG5cbmltcG9ydCBMaW5lU3ViR2VvbWV0cnlcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9MaW5lU3ViR2VvbWV0cnlcIik7XG5pbXBvcnQgU3ViR2VvbWV0cnlCYXNlXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvU3ViR2VvbWV0cnlCYXNlXCIpO1xuaW1wb3J0IFRyaWFuZ2xlU3ViR2VvbWV0cnlcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvVHJpYW5nbGVTdWJHZW9tZXRyeVwiKTtcbmltcG9ydCBQcmltaXRpdmVQcmVmYWJCYXNlXHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wcmVmYWJzL1ByaW1pdGl2ZVByZWZhYkJhc2VcIik7XG5cbi8qKlxuICogQSBDeWxpbmRlciBwcmltaXRpdmUgbWVzaC5cbiAqL1xuY2xhc3MgUHJpbWl0aXZlQ3lsaW5kZXJQcmVmYWIgZXh0ZW5kcyBQcmltaXRpdmVQcmVmYWJCYXNlIGltcGxlbWVudHMgSUFzc2V0XG57XG5cdHB1YmxpYyBfcEJvdHRvbVJhZGl1czpudW1iZXI7XG5cdHB1YmxpYyBfcFNlZ21lbnRzVzpudW1iZXI7XG5cdHB1YmxpYyBfcFNlZ21lbnRzSDpudW1iZXI7XG5cblx0cHJpdmF0ZSBfdG9wUmFkaXVzOm51bWJlcjtcblx0cHJpdmF0ZSBfaGVpZ2h0Om51bWJlcjtcblxuXHRwcml2YXRlIF90b3BDbG9zZWQ6Ym9vbGVhbjtcblx0cHJpdmF0ZSBfYm90dG9tQ2xvc2VkOmJvb2xlYW47XG5cdHByaXZhdGUgX3N1cmZhY2VDbG9zZWQ6Ym9vbGVhbjtcblx0cHJpdmF0ZSBfeVVwOmJvb2xlYW47XG5cdHByaXZhdGUgX251bVZlcnRpY2VzOm51bWJlciA9IDA7XG5cblx0LyoqXG5cdCAqIFRoZSByYWRpdXMgb2YgdGhlIHRvcCBlbmQgb2YgdGhlIGN5bGluZGVyLlxuXHQgKi9cblx0cHVibGljIGdldCB0b3BSYWRpdXMoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl90b3BSYWRpdXM7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHRvcFJhZGl1cyh2YWx1ZTpudW1iZXIpXG5cdHtcblx0XHR0aGlzLl90b3BSYWRpdXMgPSB2YWx1ZTtcblx0XHR0aGlzLl9wSW52YWxpZGF0ZUdlb21ldHJ5KCk7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIHJhZGl1cyBvZiB0aGUgYm90dG9tIGVuZCBvZiB0aGUgY3lsaW5kZXIuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGJvdHRvbVJhZGl1cygpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BCb3R0b21SYWRpdXM7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGJvdHRvbVJhZGl1cyh2YWx1ZTpudW1iZXIpXG5cdHtcblx0XHR0aGlzLl9wQm90dG9tUmFkaXVzID0gdmFsdWU7XG5cdFx0dGhpcy5fcEludmFsaWRhdGVHZW9tZXRyeSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSByYWRpdXMgb2YgdGhlIHRvcCBlbmQgb2YgdGhlIGN5bGluZGVyLlxuXHQgKi9cblx0cHVibGljIGdldCBoZWlnaHQoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9oZWlnaHQ7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGhlaWdodCh2YWx1ZTpudW1iZXIpXG5cdHtcblx0XHR0aGlzLl9oZWlnaHQgPSB2YWx1ZTtcblx0XHR0aGlzLl9wSW52YWxpZGF0ZUdlb21ldHJ5KCk7XG5cdH1cblxuXHQvKipcblx0ICogRGVmaW5lcyB0aGUgbnVtYmVyIG9mIGhvcml6b250YWwgc2VnbWVudHMgdGhhdCBtYWtlIHVwIHRoZSBjeWxpbmRlci4gRGVmYXVsdHMgdG8gMTYuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHNlZ21lbnRzVygpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BTZWdtZW50c1c7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHNlZ21lbnRzVyh2YWx1ZTpudW1iZXIpXG5cdHtcblx0XHR0aGlzLnNldFNlZ21lbnRzVyh2YWx1ZSk7XG5cdH1cblxuXHRwdWJsaWMgc2V0U2VnbWVudHNXKHZhbHVlOm51bWJlcilcblx0e1xuXHRcdHRoaXMuX3BTZWdtZW50c1cgPSB2YWx1ZTtcblx0XHR0aGlzLl9wSW52YWxpZGF0ZUdlb21ldHJ5KCk7XG5cdFx0dGhpcy5fcEludmFsaWRhdGVVVnMoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBEZWZpbmVzIHRoZSBudW1iZXIgb2YgdmVydGljYWwgc2VnbWVudHMgdGhhdCBtYWtlIHVwIHRoZSBjeWxpbmRlci4gRGVmYXVsdHMgdG8gMS5cblx0ICovXG5cdHB1YmxpYyBnZXQgc2VnbWVudHNIKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcFNlZ21lbnRzSDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgc2VnbWVudHNIKHZhbHVlOm51bWJlcilcblx0e1xuXG5cdFx0dGhpcy5zZXRTZWdtZW50c0godmFsdWUpXG5cblx0fVxuXG5cdHB1YmxpYyBzZXRTZWdtZW50c0godmFsdWU6bnVtYmVyKVxuXHR7XG5cdFx0dGhpcy5fcFNlZ21lbnRzSCA9IHZhbHVlO1xuXHRcdHRoaXMuX3BJbnZhbGlkYXRlR2VvbWV0cnkoKTtcblx0XHR0aGlzLl9wSW52YWxpZGF0ZVVWcygpO1xuXG5cdH1cblxuXHQvKipcblx0ICogRGVmaW5lcyB3aGV0aGVyIHRoZSB0b3AgZW5kIG9mIHRoZSBjeWxpbmRlciBpcyBjbG9zZWQgKHRydWUpIG9yIG9wZW4uXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHRvcENsb3NlZCgpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiB0aGlzLl90b3BDbG9zZWQ7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHRvcENsb3NlZCh2YWx1ZTpib29sZWFuKVxuXHR7XG5cdFx0dGhpcy5fdG9wQ2xvc2VkID0gdmFsdWU7XG5cdFx0dGhpcy5fcEludmFsaWRhdGVHZW9tZXRyeSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIERlZmluZXMgd2hldGhlciB0aGUgYm90dG9tIGVuZCBvZiB0aGUgY3lsaW5kZXIgaXMgY2xvc2VkICh0cnVlKSBvciBvcGVuLlxuXHQgKi9cblx0cHVibGljIGdldCBib3R0b21DbG9zZWQoKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fYm90dG9tQ2xvc2VkO1xuXHR9XG5cblx0cHVibGljIHNldCBib3R0b21DbG9zZWQodmFsdWU6Ym9vbGVhbilcblx0e1xuXHRcdHRoaXMuX2JvdHRvbUNsb3NlZCA9IHZhbHVlO1xuXHRcdHRoaXMuX3BJbnZhbGlkYXRlR2VvbWV0cnkoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBEZWZpbmVzIHdoZXRoZXIgdGhlIGN5bGluZGVyIHBvbGVzIHNob3VsZCBsYXkgb24gdGhlIFktYXhpcyAodHJ1ZSkgb3Igb24gdGhlIFotYXhpcyAoZmFsc2UpLlxuXHQgKi9cblx0cHVibGljIGdldCB5VXAoKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5feVVwO1xuXHR9XG5cblx0cHVibGljIHNldCB5VXAodmFsdWU6Ym9vbGVhbilcblx0e1xuXHRcdHRoaXMuX3lVcCA9IHZhbHVlO1xuXHRcdHRoaXMuX3BJbnZhbGlkYXRlR2VvbWV0cnkoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGEgbmV3IEN5bGluZGVyIG9iamVjdC5cblx0ICogQHBhcmFtIHRvcFJhZGl1cyBUaGUgcmFkaXVzIG9mIHRoZSB0b3AgZW5kIG9mIHRoZSBjeWxpbmRlci5cblx0ICogQHBhcmFtIGJvdHRvbVJhZGl1cyBUaGUgcmFkaXVzIG9mIHRoZSBib3R0b20gZW5kIG9mIHRoZSBjeWxpbmRlclxuXHQgKiBAcGFyYW0gaGVpZ2h0IFRoZSByYWRpdXMgb2YgdGhlIGJvdHRvbSBlbmQgb2YgdGhlIGN5bGluZGVyXG5cdCAqIEBwYXJhbSBzZWdtZW50c1cgRGVmaW5lcyB0aGUgbnVtYmVyIG9mIGhvcml6b250YWwgc2VnbWVudHMgdGhhdCBtYWtlIHVwIHRoZSBjeWxpbmRlci4gRGVmYXVsdHMgdG8gMTYuXG5cdCAqIEBwYXJhbSBzZWdtZW50c0ggRGVmaW5lcyB0aGUgbnVtYmVyIG9mIHZlcnRpY2FsIHNlZ21lbnRzIHRoYXQgbWFrZSB1cCB0aGUgY3lsaW5kZXIuIERlZmF1bHRzIHRvIDEuXG5cdCAqIEBwYXJhbSB0b3BDbG9zZWQgRGVmaW5lcyB3aGV0aGVyIHRoZSB0b3AgZW5kIG9mIHRoZSBjeWxpbmRlciBpcyBjbG9zZWQgKHRydWUpIG9yIG9wZW4uXG5cdCAqIEBwYXJhbSBib3R0b21DbG9zZWQgRGVmaW5lcyB3aGV0aGVyIHRoZSBib3R0b20gZW5kIG9mIHRoZSBjeWxpbmRlciBpcyBjbG9zZWQgKHRydWUpIG9yIG9wZW4uXG5cdCAqIEBwYXJhbSB5VXAgRGVmaW5lcyB3aGV0aGVyIHRoZSBjb25lIHBvbGVzIHNob3VsZCBsYXkgb24gdGhlIFktYXhpcyAodHJ1ZSkgb3Igb24gdGhlIFotYXhpcyAoZmFsc2UpLlxuXHQgKi9cblx0Y29uc3RydWN0b3IodG9wUmFkaXVzOm51bWJlciA9IDUwLCBib3R0b21SYWRpdXM6bnVtYmVyID0gNTAsIGhlaWdodDpudW1iZXIgPSAxMDAsIHNlZ21lbnRzVzpudW1iZXIgPSAxNiwgc2VnbWVudHNIOm51bWJlciA9IDEsIHRvcENsb3NlZDpib29sZWFuID0gdHJ1ZSwgYm90dG9tQ2xvc2VkOmJvb2xlYW4gPSB0cnVlLCBzdXJmYWNlQ2xvc2VkOmJvb2xlYW4gPSB0cnVlLCB5VXA6Ym9vbGVhbiA9IHRydWUpXG5cdHtcblx0XHRzdXBlcigpO1xuXG5cdFx0dGhpcy5fdG9wUmFkaXVzID0gdG9wUmFkaXVzO1xuXHRcdHRoaXMuX3BCb3R0b21SYWRpdXMgPSBib3R0b21SYWRpdXM7XG5cdFx0dGhpcy5faGVpZ2h0ID0gaGVpZ2h0O1xuXHRcdHRoaXMuX3BTZWdtZW50c1cgPSBzZWdtZW50c1c7XG5cdFx0dGhpcy5fcFNlZ21lbnRzSCA9IHNlZ21lbnRzSDtcblx0XHR0aGlzLl90b3BDbG9zZWQgPSB0b3BDbG9zZWQ7XG5cdFx0dGhpcy5fYm90dG9tQ2xvc2VkID0gYm90dG9tQ2xvc2VkO1xuXHRcdHRoaXMuX3N1cmZhY2VDbG9zZWQgPSBzdXJmYWNlQ2xvc2VkO1xuXHRcdHRoaXMuX3lVcCA9IHlVcDtcblx0fVxuXG5cblx0LyoqXG5cdCAqIEBpbmhlcml0RG9jXG5cdCAqL1xuXHRwdWJsaWMgX3BCdWlsZEdlb21ldHJ5KHRhcmdldDpTdWJHZW9tZXRyeUJhc2UsIGdlb21ldHJ5VHlwZTpzdHJpbmcpXG5cdHtcblx0XHR2YXIgaW5kaWNlczpBcnJheTxudW1iZXI+IC8qdWludCovO1xuXHRcdHZhciBwb3NpdGlvbnM6QXJyYXk8bnVtYmVyPjtcblx0XHR2YXIgbm9ybWFsczpBcnJheTxudW1iZXI+O1xuXHRcdHZhciB0YW5nZW50czpBcnJheTxudW1iZXI+O1xuXG5cdFx0dmFyIGk6bnVtYmVyO1xuXHRcdHZhciBqOm51bWJlcjtcblx0XHR2YXIgeDpudW1iZXI7XG5cdFx0dmFyIHk6bnVtYmVyO1xuXHRcdHZhciB6Om51bWJlcjtcblx0XHR2YXIgdmlkeDpudW1iZXI7XG5cdFx0dmFyIGZpZHg6bnVtYmVyO1xuXG5cdFx0dmFyIHJhZGl1czpudW1iZXI7XG5cdFx0dmFyIHJldm9sdXRpb25BbmdsZTpudW1iZXI7XG5cblx0XHR2YXIgZHI6bnVtYmVyO1xuXHRcdHZhciBsYXROb3JtRWxldjpudW1iZXI7XG5cdFx0dmFyIGxhdE5vcm1CYXNlOm51bWJlcjtcblx0XHR2YXIgbnVtSW5kaWNlczpudW1iZXIgPSAwO1xuXG5cdFx0dmFyIGNvbXAxOm51bWJlcjtcblx0XHR2YXIgY29tcDI6bnVtYmVyO1xuXHRcdHZhciBzdGFydEluZGV4Om51bWJlciA9IDA7XG5cdFx0dmFyIG5leHRWZXJ0ZXhJbmRleDpudW1iZXIgPSAwO1xuXHRcdHZhciBjZW50ZXJWZXJ0ZXhJbmRleDpudW1iZXIgPSAwO1xuXG5cdFx0dmFyIHQxOm51bWJlcjtcblx0XHR2YXIgdDI6bnVtYmVyO1xuXG5cdFx0Ly8gcmVzZXQgdXRpbGl0eSB2YXJpYWJsZXNcblx0XHR0aGlzLl9udW1WZXJ0aWNlcyA9IDA7XG5cblx0XHQvLyBldmFsdWF0ZSByZXZvbHV0aW9uIHN0ZXBzXG5cdFx0dmFyIHJldm9sdXRpb25BbmdsZURlbHRhOm51bWJlciA9IDIqTWF0aC5QSS90aGlzLl9wU2VnbWVudHNXO1xuXG5cdFx0aWYgKGdlb21ldHJ5VHlwZSA9PSBcInRyaWFuZ2xlU3ViR2VvbWV0cnlcIikge1xuXG5cdFx0XHR2YXIgdHJpYW5nbGVHZW9tZXRyeTpUcmlhbmdsZVN1Ykdlb21ldHJ5ID0gPFRyaWFuZ2xlU3ViR2VvbWV0cnk+IHRhcmdldDtcblxuXHRcdFx0Ly8gZXZhbHVhdGUgdGFyZ2V0IG51bWJlciBvZiB2ZXJ0aWNlcywgdHJpYW5nbGVzIGFuZCBpbmRpY2VzXG5cdFx0XHRpZiAodGhpcy5fc3VyZmFjZUNsb3NlZCkge1xuXHRcdFx0XHR0aGlzLl9udW1WZXJ0aWNlcyArPSAodGhpcy5fcFNlZ21lbnRzSCArIDEpKih0aGlzLl9wU2VnbWVudHNXICsgMSk7IC8vIHNlZ21lbnRzSCArIDEgYmVjYXVzZSBvZiBjbG9zdXJlLCBzZWdtZW50c1cgKyAxIGJlY2F1c2Ugb2YgVVYgdW53cmFwcGluZ1xuXHRcdFx0XHRudW1JbmRpY2VzICs9IHRoaXMuX3BTZWdtZW50c0gqdGhpcy5fcFNlZ21lbnRzVyo2OyAvLyBlYWNoIGxldmVsIGhhcyBzZWdtZW50VyBxdWFkcywgZWFjaCBvZiAyIHRyaWFuZ2xlc1xuXHRcdFx0fVxuXHRcdFx0aWYgKHRoaXMuX3RvcENsb3NlZCkge1xuXHRcdFx0XHR0aGlzLl9udW1WZXJ0aWNlcyArPSAyKih0aGlzLl9wU2VnbWVudHNXICsgMSk7IC8vIHNlZ21lbnRzVyArIDEgYmVjYXVzZSBvZiB1bndyYXBwaW5nXG5cdFx0XHRcdG51bUluZGljZXMgKz0gdGhpcy5fcFNlZ21lbnRzVyozOyAvLyBvbmUgdHJpYW5nbGUgZm9yIGVhY2ggc2VnbWVudFxuXHRcdFx0fVxuXHRcdFx0aWYgKHRoaXMuX2JvdHRvbUNsb3NlZCkge1xuXHRcdFx0XHR0aGlzLl9udW1WZXJ0aWNlcyArPSAyKih0aGlzLl9wU2VnbWVudHNXICsgMSk7XG5cdFx0XHRcdG51bUluZGljZXMgKz0gdGhpcy5fcFNlZ21lbnRzVyozO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBuZWVkIHRvIGluaXRpYWxpemUgcmF3IGFycmF5cyBvciBjYW4gYmUgcmV1c2VkP1xuXHRcdFx0aWYgKHRoaXMuX251bVZlcnRpY2VzID09IHRyaWFuZ2xlR2VvbWV0cnkubnVtVmVydGljZXMpIHtcblx0XHRcdFx0aW5kaWNlcyA9IHRyaWFuZ2xlR2VvbWV0cnkuaW5kaWNlcztcblx0XHRcdFx0cG9zaXRpb25zID0gdHJpYW5nbGVHZW9tZXRyeS5wb3NpdGlvbnM7XG5cdFx0XHRcdG5vcm1hbHMgPSB0cmlhbmdsZUdlb21ldHJ5LnZlcnRleE5vcm1hbHM7XG5cdFx0XHRcdHRhbmdlbnRzID0gdHJpYW5nbGVHZW9tZXRyeS52ZXJ0ZXhUYW5nZW50cztcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGluZGljZXMgPSBuZXcgQXJyYXk8bnVtYmVyPihudW1JbmRpY2VzKVxuXHRcdFx0XHRwb3NpdGlvbnMgPSBuZXcgQXJyYXk8bnVtYmVyPih0aGlzLl9udW1WZXJ0aWNlcyozKTtcblx0XHRcdFx0bm9ybWFscyA9IG5ldyBBcnJheTxudW1iZXI+KHRoaXMuX251bVZlcnRpY2VzKjMpO1xuXHRcdFx0XHR0YW5nZW50cyA9IG5ldyBBcnJheTxudW1iZXI+KHRoaXMuX251bVZlcnRpY2VzKjMpO1xuXG5cdFx0XHRcdHRoaXMuX3BJbnZhbGlkYXRlVVZzKCk7XG5cdFx0XHR9XG5cblx0XHRcdHZpZHggPSAwO1xuXHRcdFx0ZmlkeCA9IDA7XG5cblx0XHRcdC8vIHRvcFxuXHRcdFx0aWYgKHRoaXMuX3RvcENsb3NlZCAmJiB0aGlzLl90b3BSYWRpdXMgPiAwKSB7XG5cblx0XHRcdFx0eiA9IC0wLjUqdGhpcy5faGVpZ2h0O1xuXG5cdFx0XHRcdC8vIGNlbnRyYWwgdmVydGV4XG5cdFx0XHRcdGlmICh0aGlzLl95VXApIHtcblx0XHRcdFx0XHR0MSA9IDE7XG5cdFx0XHRcdFx0dDIgPSAwO1xuXHRcdFx0XHRcdGNvbXAxID0gLXo7XG5cdFx0XHRcdFx0Y29tcDIgPSAwO1xuXG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dDEgPSAwO1xuXHRcdFx0XHRcdHQyID0gLTE7XG5cdFx0XHRcdFx0Y29tcDEgPSAwO1xuXHRcdFx0XHRcdGNvbXAyID0gejtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHBvc2l0aW9uc1t2aWR4XSA9IDA7XG5cdFx0XHRcdHBvc2l0aW9uc1t2aWR4ICsgMV0gPSBjb21wMTtcblx0XHRcdFx0cG9zaXRpb25zW3ZpZHggKyAyXSA9IGNvbXAyO1xuXHRcdFx0XHRub3JtYWxzW3ZpZHhdID0gMDtcblx0XHRcdFx0bm9ybWFsc1t2aWR4ICsgMV0gPSB0MTtcblx0XHRcdFx0bm9ybWFsc1t2aWR4ICsgMl0gPSB0Mjtcblx0XHRcdFx0dGFuZ2VudHNbdmlkeF0gPSAxO1xuXHRcdFx0XHR0YW5nZW50c1t2aWR4ICsgMV0gPSAwO1xuXHRcdFx0XHR0YW5nZW50c1t2aWR4ICsgMl0gPSAwO1xuXHRcdFx0XHR2aWR4ICs9IDM7XG5cblx0XHRcdFx0bmV4dFZlcnRleEluZGV4ICs9IDE7XG5cblx0XHRcdFx0Zm9yIChpID0gMDsgaSA8PSB0aGlzLl9wU2VnbWVudHNXOyArK2kpIHtcblxuXHRcdFx0XHRcdC8vIHJldm9sdXRpb24gdmVydGV4XG5cdFx0XHRcdFx0cmV2b2x1dGlvbkFuZ2xlID0gaSpyZXZvbHV0aW9uQW5nbGVEZWx0YTtcblx0XHRcdFx0XHR4ID0gdGhpcy5fdG9wUmFkaXVzKk1hdGguY29zKHJldm9sdXRpb25BbmdsZSk7XG5cdFx0XHRcdFx0eSA9IHRoaXMuX3RvcFJhZGl1cypNYXRoLnNpbihyZXZvbHV0aW9uQW5nbGUpO1xuXG5cdFx0XHRcdFx0aWYgKHRoaXMuX3lVcCkge1xuXHRcdFx0XHRcdFx0Y29tcDEgPSAtejtcblx0XHRcdFx0XHRcdGNvbXAyID0geTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Y29tcDEgPSB5O1xuXHRcdFx0XHRcdFx0Y29tcDIgPSB6O1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChpID09IHRoaXMuX3BTZWdtZW50c1cpIHtcblx0XHRcdFx0XHRcdHBvc2l0aW9uc1t2aWR4XSA9IHBvc2l0aW9uc1tzdGFydEluZGV4ICsgM107XG5cdFx0XHRcdFx0XHRwb3NpdGlvbnNbdmlkeCArIDFdID0gcG9zaXRpb25zW3N0YXJ0SW5kZXggKyA0XTtcblx0XHRcdFx0XHRcdHBvc2l0aW9uc1t2aWR4ICsgMl0gPSBwb3NpdGlvbnNbc3RhcnRJbmRleCArIDVdO1xuXG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHBvc2l0aW9uc1t2aWR4XSA9IHg7XG5cdFx0XHRcdFx0XHRwb3NpdGlvbnNbdmlkeCArIDFdID0gY29tcDE7XG5cdFx0XHRcdFx0XHRwb3NpdGlvbnNbdmlkeCArIDJdID0gY29tcDI7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0bm9ybWFsc1t2aWR4XSA9IDA7XG5cdFx0XHRcdFx0bm9ybWFsc1t2aWR4ICsgMV0gPSB0MTtcblx0XHRcdFx0XHRub3JtYWxzW3ZpZHggKyAyXSA9IHQyO1xuXHRcdFx0XHRcdHRhbmdlbnRzW3ZpZHhdID0gMTtcblx0XHRcdFx0XHR0YW5nZW50c1t2aWR4ICsgMV0gPSAwO1xuXHRcdFx0XHRcdHRhbmdlbnRzW3ZpZHggKyAyXSA9IDA7XG5cdFx0XHRcdFx0dmlkeCArPSAzO1xuXG5cdFx0XHRcdFx0aWYgKGkgPiAwKSB7XG5cdFx0XHRcdFx0XHQvLyBhZGQgdHJpYW5nbGVcblx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IG5leHRWZXJ0ZXhJbmRleCAtIDE7XG5cdFx0XHRcdFx0XHRpbmRpY2VzW2ZpZHgrK10gPSBjZW50ZXJWZXJ0ZXhJbmRleDtcblx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IG5leHRWZXJ0ZXhJbmRleDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRuZXh0VmVydGV4SW5kZXggKz0gMTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBib3R0b21cblx0XHRcdGlmICh0aGlzLl9ib3R0b21DbG9zZWQgJiYgdGhpcy5fcEJvdHRvbVJhZGl1cyA+IDApIHtcblxuXHRcdFx0XHR6ID0gMC41KnRoaXMuX2hlaWdodDtcblxuXHRcdFx0XHRzdGFydEluZGV4ID0gbmV4dFZlcnRleEluZGV4KjM7XG5cblx0XHRcdFx0Y2VudGVyVmVydGV4SW5kZXggPSBuZXh0VmVydGV4SW5kZXg7XG5cblx0XHRcdFx0Ly8gY2VudHJhbCB2ZXJ0ZXhcblx0XHRcdFx0aWYgKHRoaXMuX3lVcCkge1xuXHRcdFx0XHRcdHQxID0gLTE7XG5cdFx0XHRcdFx0dDIgPSAwO1xuXHRcdFx0XHRcdGNvbXAxID0gLXo7XG5cdFx0XHRcdFx0Y29tcDIgPSAwO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHQxID0gMDtcblx0XHRcdFx0XHR0MiA9IDE7XG5cdFx0XHRcdFx0Y29tcDEgPSAwO1xuXHRcdFx0XHRcdGNvbXAyID0gejtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChpID4gMCkge1xuXHRcdFx0XHRcdHBvc2l0aW9uc1t2aWR4XSA9IDA7XG5cdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHggKyAxXSA9IGNvbXAxO1xuXHRcdFx0XHRcdHBvc2l0aW9uc1t2aWR4ICsgMl0gPSBjb21wMjtcblx0XHRcdFx0XHRub3JtYWxzW3ZpZHhdID0gMDtcblx0XHRcdFx0XHRub3JtYWxzW3ZpZHggKyAxXSA9IHQxO1xuXHRcdFx0XHRcdG5vcm1hbHNbdmlkeCArIDJdID0gdDI7XG5cdFx0XHRcdFx0dGFuZ2VudHNbdmlkeF0gPSAxO1xuXHRcdFx0XHRcdHRhbmdlbnRzW3ZpZHggKyAxXSA9IDA7XG5cdFx0XHRcdFx0dGFuZ2VudHNbdmlkeCArIDJdID0gMDtcblx0XHRcdFx0XHR2aWR4ICs9IDM7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRuZXh0VmVydGV4SW5kZXggKz0gMTtcblxuXHRcdFx0XHRmb3IgKGkgPSAwOyBpIDw9IHRoaXMuX3BTZWdtZW50c1c7ICsraSkge1xuXG5cdFx0XHRcdFx0Ly8gcmV2b2x1dGlvbiB2ZXJ0ZXhcblx0XHRcdFx0XHRyZXZvbHV0aW9uQW5nbGUgPSBpKnJldm9sdXRpb25BbmdsZURlbHRhO1xuXHRcdFx0XHRcdHggPSB0aGlzLl9wQm90dG9tUmFkaXVzKk1hdGguY29zKHJldm9sdXRpb25BbmdsZSk7XG5cdFx0XHRcdFx0eSA9IHRoaXMuX3BCb3R0b21SYWRpdXMqTWF0aC5zaW4ocmV2b2x1dGlvbkFuZ2xlKTtcblxuXHRcdFx0XHRcdGlmICh0aGlzLl95VXApIHtcblx0XHRcdFx0XHRcdGNvbXAxID0gLXo7XG5cdFx0XHRcdFx0XHRjb21wMiA9IHk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGNvbXAxID0geTtcblx0XHRcdFx0XHRcdGNvbXAyID0gejtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoaSA9PSB0aGlzLl9wU2VnbWVudHNXKSB7XG5cdFx0XHRcdFx0XHRwb3NpdGlvbnNbdmlkeF0gPSBwb3NpdGlvbnNbc3RhcnRJbmRleCArIDNdO1xuXHRcdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHggKyAxXSA9IHBvc2l0aW9uc1tzdGFydEluZGV4ICsgNF07XG5cdFx0XHRcdFx0XHRwb3NpdGlvbnNbdmlkeCArIDJdID0gcG9zaXRpb25zW3N0YXJ0SW5kZXggKyA1XTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHhdID0geDtcblx0XHRcdFx0XHRcdHBvc2l0aW9uc1t2aWR4ICsgMV0gPSBjb21wMTtcblx0XHRcdFx0XHRcdHBvc2l0aW9uc1t2aWR4ICsgMl0gPSBjb21wMjtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRub3JtYWxzW3ZpZHhdID0gMDtcblx0XHRcdFx0XHRub3JtYWxzW3ZpZHggKyAxXSA9IHQxO1xuXHRcdFx0XHRcdG5vcm1hbHNbdmlkeCArIDJdID0gdDI7XG5cdFx0XHRcdFx0dGFuZ2VudHNbdmlkeF0gPSAxO1xuXHRcdFx0XHRcdHRhbmdlbnRzW3ZpZHggKyAxXSA9IDA7XG5cdFx0XHRcdFx0dGFuZ2VudHNbdmlkeCArIDJdID0gMDtcblx0XHRcdFx0XHR2aWR4ICs9IDM7XG5cblx0XHRcdFx0XHRpZiAoaSA+IDApIHtcblx0XHRcdFx0XHRcdC8vIGFkZCB0cmlhbmdsZVxuXHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gbmV4dFZlcnRleEluZGV4IC0gMTtcblx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IG5leHRWZXJ0ZXhJbmRleDtcblx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IGNlbnRlclZlcnRleEluZGV4O1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdG5leHRWZXJ0ZXhJbmRleCArPSAxO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIFRoZSBub3JtYWxzIG9uIHRoZSBsYXRlcmFsIHN1cmZhY2UgYWxsIGhhdmUgdGhlIHNhbWUgaW5jbGluZSwgaS5lLlxuXHRcdFx0Ly8gdGhlIFwiZWxldmF0aW9uXCIgY29tcG9uZW50IChZIG9yIFogZGVwZW5kaW5nIG9uIHlVcCkgaXMgY29uc3RhbnQuXG5cdFx0XHQvLyBTYW1lIHByaW5jaXBsZSBnb2VzIGZvciB0aGUgXCJiYXNlXCIgb2YgdGhlc2UgdmVjdG9ycywgd2hpY2ggd2lsbCBiZVxuXHRcdFx0Ly8gY2FsY3VsYXRlZCBzdWNoIHRoYXQgYSB2ZWN0b3IgW2Jhc2UsZWxldl0gd2lsbCBiZSBhIHVuaXQgdmVjdG9yLlxuXHRcdFx0ZHIgPSAodGhpcy5fcEJvdHRvbVJhZGl1cyAtIHRoaXMuX3RvcFJhZGl1cyk7XG5cdFx0XHRsYXROb3JtRWxldiA9IGRyL3RoaXMuX2hlaWdodDtcblx0XHRcdGxhdE5vcm1CYXNlID0gKGxhdE5vcm1FbGV2ID09IDApPyAxIDogdGhpcy5faGVpZ2h0L2RyO1xuXG5cdFx0XHQvLyBsYXRlcmFsIHN1cmZhY2Vcblx0XHRcdGlmICh0aGlzLl9zdXJmYWNlQ2xvc2VkKSB7XG5cdFx0XHRcdHZhciBhOm51bWJlcjtcblx0XHRcdFx0dmFyIGI6bnVtYmVyO1xuXHRcdFx0XHR2YXIgYzpudW1iZXI7XG5cdFx0XHRcdHZhciBkOm51bWJlcjtcblx0XHRcdFx0dmFyIG5hMDpudW1iZXIsIG5hMTpudW1iZXIsIG5hQ29tcDE6bnVtYmVyLCBuYUNvbXAyOm51bWJlcjtcblxuXHRcdFx0XHRmb3IgKGogPSAwOyBqIDw9IHRoaXMuX3BTZWdtZW50c0g7ICsraikge1xuXHRcdFx0XHRcdHJhZGl1cyA9IHRoaXMuX3RvcFJhZGl1cyAtICgoai90aGlzLl9wU2VnbWVudHNIKSoodGhpcy5fdG9wUmFkaXVzIC0gdGhpcy5fcEJvdHRvbVJhZGl1cykpO1xuXHRcdFx0XHRcdHogPSAtKHRoaXMuX2hlaWdodC8yKSArIChqL3RoaXMuX3BTZWdtZW50c0gqdGhpcy5faGVpZ2h0KTtcblxuXHRcdFx0XHRcdHN0YXJ0SW5kZXggPSBuZXh0VmVydGV4SW5kZXgqMztcblxuXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPD0gdGhpcy5fcFNlZ21lbnRzVzsgKytpKSB7XG5cdFx0XHRcdFx0XHQvLyByZXZvbHV0aW9uIHZlcnRleFxuXHRcdFx0XHRcdFx0cmV2b2x1dGlvbkFuZ2xlID0gaSpyZXZvbHV0aW9uQW5nbGVEZWx0YTtcblx0XHRcdFx0XHRcdHggPSByYWRpdXMqTWF0aC5jb3MocmV2b2x1dGlvbkFuZ2xlKTtcblx0XHRcdFx0XHRcdHkgPSByYWRpdXMqTWF0aC5zaW4ocmV2b2x1dGlvbkFuZ2xlKTtcblx0XHRcdFx0XHRcdG5hMCA9IGxhdE5vcm1CYXNlKk1hdGguY29zKHJldm9sdXRpb25BbmdsZSk7XG5cdFx0XHRcdFx0XHRuYTEgPSBsYXROb3JtQmFzZSpNYXRoLnNpbihyZXZvbHV0aW9uQW5nbGUpO1xuXG5cdFx0XHRcdFx0XHRpZiAodGhpcy5feVVwKSB7XG5cdFx0XHRcdFx0XHRcdHQxID0gMDtcblx0XHRcdFx0XHRcdFx0dDIgPSAtbmEwO1xuXHRcdFx0XHRcdFx0XHRjb21wMSA9IC16O1xuXHRcdFx0XHRcdFx0XHRjb21wMiA9IHk7XG5cdFx0XHRcdFx0XHRcdG5hQ29tcDEgPSBsYXROb3JtRWxldjtcblx0XHRcdFx0XHRcdFx0bmFDb21wMiA9IG5hMTtcblxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0dDEgPSAtbmEwO1xuXHRcdFx0XHRcdFx0XHR0MiA9IDA7XG5cdFx0XHRcdFx0XHRcdGNvbXAxID0geTtcblx0XHRcdFx0XHRcdFx0Y29tcDIgPSB6O1xuXHRcdFx0XHRcdFx0XHRuYUNvbXAxID0gbmExO1xuXHRcdFx0XHRcdFx0XHRuYUNvbXAyID0gbGF0Tm9ybUVsZXY7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGlmIChpID09IHRoaXMuX3BTZWdtZW50c1cpIHtcblx0XHRcdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHhdID0gcG9zaXRpb25zW3N0YXJ0SW5kZXhdO1xuXHRcdFx0XHRcdFx0XHRwb3NpdGlvbnNbdmlkeCArIDFdID0gcG9zaXRpb25zW3N0YXJ0SW5kZXggKyAxXTtcblx0XHRcdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHggKyAyXSA9IHBvc2l0aW9uc1tzdGFydEluZGV4ICsgMl07XG5cdFx0XHRcdFx0XHRcdG5vcm1hbHNbdmlkeF0gPSBuYTA7XG5cdFx0XHRcdFx0XHRcdG5vcm1hbHNbdmlkeCArIDFdID0gbGF0Tm9ybUVsZXY7XG5cdFx0XHRcdFx0XHRcdG5vcm1hbHNbdmlkeCArIDJdID0gbmExO1xuXHRcdFx0XHRcdFx0XHR0YW5nZW50c1t2aWR4XSA9IG5hMTtcblx0XHRcdFx0XHRcdFx0dGFuZ2VudHNbdmlkeCArIDFdID0gdDE7XG5cdFx0XHRcdFx0XHRcdHRhbmdlbnRzW3ZpZHggKyAyXSA9IHQyO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHhdID0geDtcblx0XHRcdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHggKyAxXSA9IGNvbXAxO1xuXHRcdFx0XHRcdFx0XHRwb3NpdGlvbnNbdmlkeCArIDJdID0gY29tcDI7XG5cdFx0XHRcdFx0XHRcdG5vcm1hbHNbdmlkeF0gPSBuYTA7XG5cdFx0XHRcdFx0XHRcdG5vcm1hbHNbdmlkeCArIDFdID0gbmFDb21wMTtcblx0XHRcdFx0XHRcdFx0bm9ybWFsc1t2aWR4ICsgMl0gPSBuYUNvbXAyO1xuXHRcdFx0XHRcdFx0XHR0YW5nZW50c1t2aWR4XSA9IC1uYTE7XG5cdFx0XHRcdFx0XHRcdHRhbmdlbnRzW3ZpZHggKyAxXSA9IHQxO1xuXHRcdFx0XHRcdFx0XHR0YW5nZW50c1t2aWR4ICsgMl0gPSB0Mjtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHZpZHggKz0gMztcblxuXHRcdFx0XHRcdFx0Ly8gY2xvc2UgdHJpYW5nbGVcblx0XHRcdFx0XHRcdGlmIChpID4gMCAmJiBqID4gMCkge1xuXHRcdFx0XHRcdFx0XHRhID0gbmV4dFZlcnRleEluZGV4OyAvLyBjdXJyZW50XG5cdFx0XHRcdFx0XHRcdGIgPSBuZXh0VmVydGV4SW5kZXggLSAxOyAvLyBwcmV2aW91c1xuXHRcdFx0XHRcdFx0XHRjID0gYiAtIHRoaXMuX3BTZWdtZW50c1cgLSAxOyAvLyBwcmV2aW91cyBvZiBsYXN0IGxldmVsXG5cdFx0XHRcdFx0XHRcdGQgPSBhIC0gdGhpcy5fcFNlZ21lbnRzVyAtIDE7IC8vIGN1cnJlbnQgb2YgbGFzdCBsZXZlbFxuXG5cdFx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IGE7XG5cdFx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IGI7XG5cdFx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IGM7XG5cblx0XHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gYTtcblx0XHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gYztcblx0XHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gZDtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0bmV4dFZlcnRleEluZGV4Kys7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIGJ1aWxkIHJlYWwgZGF0YSBmcm9tIHJhdyBkYXRhXG5cdFx0XHR0cmlhbmdsZUdlb21ldHJ5LnVwZGF0ZUluZGljZXMoaW5kaWNlcyk7XG5cblx0XHRcdHRyaWFuZ2xlR2VvbWV0cnkudXBkYXRlUG9zaXRpb25zKHBvc2l0aW9ucyk7XG5cdFx0XHR0cmlhbmdsZUdlb21ldHJ5LnVwZGF0ZVZlcnRleE5vcm1hbHMobm9ybWFscyk7XG5cdFx0XHR0cmlhbmdsZUdlb21ldHJ5LnVwZGF0ZVZlcnRleFRhbmdlbnRzKHRhbmdlbnRzKTtcblxuXHRcdH0gZWxzZSBpZiAoZ2VvbWV0cnlUeXBlID09IFwibGluZVN1Ykdlb21ldHJ5XCIpIHtcblx0XHRcdHZhciBsaW5lR2VvbWV0cnk6TGluZVN1Ykdlb21ldHJ5ID0gPExpbmVTdWJHZW9tZXRyeT4gdGFyZ2V0O1xuXG5cdFx0XHR2YXIgbnVtU2VnbWVudHM6bnVtYmVyID0gKHRoaXMuX3BTZWdtZW50c0ggKyAxKSoodGhpcy5fcFNlZ21lbnRzVykgKyB0aGlzLl9wU2VnbWVudHNXO1xuXHRcdFx0dmFyIHN0YXJ0UG9zaXRpb25zOkFycmF5PG51bWJlcj47XG5cdFx0XHR2YXIgZW5kUG9zaXRpb25zOkFycmF5PG51bWJlcj47XG5cdFx0XHR2YXIgdGhpY2tuZXNzOkFycmF5PG51bWJlcj47XG5cblx0XHRcdGlmIChsaW5lR2VvbWV0cnkuaW5kaWNlcyAhPSBudWxsICYmIG51bVNlZ21lbnRzID09IGxpbmVHZW9tZXRyeS5udW1TZWdtZW50cykge1xuXHRcdFx0XHRzdGFydFBvc2l0aW9ucyA9IGxpbmVHZW9tZXRyeS5zdGFydFBvc2l0aW9ucztcblx0XHRcdFx0ZW5kUG9zaXRpb25zID0gbGluZUdlb21ldHJ5LmVuZFBvc2l0aW9ucztcblx0XHRcdFx0dGhpY2tuZXNzID0gbGluZUdlb21ldHJ5LnRoaWNrbmVzcztcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHN0YXJ0UG9zaXRpb25zID0gbmV3IEFycmF5PG51bWJlcj4obnVtU2VnbWVudHMqMyk7XG5cdFx0XHRcdGVuZFBvc2l0aW9ucyA9IG5ldyBBcnJheTxudW1iZXI+KG51bVNlZ21lbnRzKjMpO1xuXHRcdFx0XHR0aGlja25lc3MgPSBuZXcgQXJyYXk8bnVtYmVyPihudW1TZWdtZW50cyk7XG5cdFx0XHR9XG5cblx0XHRcdHZpZHggPSAwO1xuXG5cdFx0XHRmaWR4ID0gMDtcblxuXHRcdFx0Ly9ob3Jpem9uYWwgbGluZXNcblxuXHRcdFx0Zm9yIChqID0gMDsgaiA8PSB0aGlzLl9wU2VnbWVudHNIOyArK2opIHtcblx0XHRcdFx0cmFkaXVzID0gdGhpcy5fdG9wUmFkaXVzIC0gKChqL3RoaXMuX3BTZWdtZW50c0gpKih0aGlzLl90b3BSYWRpdXMgLSB0aGlzLl9wQm90dG9tUmFkaXVzKSk7XG5cdFx0XHRcdHogPSB0aGlzLl9oZWlnaHQqKGovdGhpcy5fcFNlZ21lbnRzSCAtIDAuNSk7XG5cblx0XHRcdFx0Zm9yIChpID0gMDsgaSA8PSB0aGlzLl9wU2VnbWVudHNXOyArK2kpIHtcblx0XHRcdFx0XHQvLyByZXZvbHV0aW9uIHZlcnRleFxuXHRcdFx0XHRcdHJldm9sdXRpb25BbmdsZSA9IGkqcmV2b2x1dGlvbkFuZ2xlRGVsdGE7XG5cdFx0XHRcdFx0eCA9IHJhZGl1cypNYXRoLmNvcyhyZXZvbHV0aW9uQW5nbGUpO1xuXHRcdFx0XHRcdHkgPSByYWRpdXMqTWF0aC5zaW4ocmV2b2x1dGlvbkFuZ2xlKTtcblxuXHRcdFx0XHRcdGlmICh0aGlzLl95VXApIHtcblx0XHRcdFx0XHRcdGNvbXAxID0gLXo7XG5cdFx0XHRcdFx0XHRjb21wMiA9IHk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGNvbXAxID0geTtcblx0XHRcdFx0XHRcdGNvbXAyID0gejtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoaSA+IDApIHtcblx0XHRcdFx0XHRcdGVuZFBvc2l0aW9uc1t2aWR4XSA9IHg7XG5cdFx0XHRcdFx0XHRlbmRQb3NpdGlvbnNbdmlkeCArIDFdID0gY29tcDE7XG5cdFx0XHRcdFx0XHRlbmRQb3NpdGlvbnNbdmlkeCArIDJdID0gY29tcDI7XG5cblx0XHRcdFx0XHRcdHRoaWNrbmVzc1tmaWR4KytdID0gMTtcblxuXHRcdFx0XHRcdFx0dmlkeCArPSAzO1xuXG5cdFx0XHRcdFx0XHQvL3ZlcnRpY2FsIGxpbmVzXG5cdFx0XHRcdFx0XHRzdGFydFBvc2l0aW9uc1t2aWR4XSA9IGVuZFBvc2l0aW9uc1t2aWR4IC0gdGhpcy5fcFNlZ21lbnRzVyo2XTtcblx0XHRcdFx0XHRcdHN0YXJ0UG9zaXRpb25zW3ZpZHggKyAxXSA9IGVuZFBvc2l0aW9uc1t2aWR4ICsgMSAtIHRoaXMuX3BTZWdtZW50c1cqNl07XG5cdFx0XHRcdFx0XHRzdGFydFBvc2l0aW9uc1t2aWR4ICsgMl0gPSBlbmRQb3NpdGlvbnNbdmlkeCArIDIgLSB0aGlzLl9wU2VnbWVudHNXKjZdO1xuXG5cdFx0XHRcdFx0XHRlbmRQb3NpdGlvbnNbdmlkeF0gPSB4O1xuXHRcdFx0XHRcdFx0ZW5kUG9zaXRpb25zW3ZpZHggKyAxXSA9IGNvbXAxO1xuXHRcdFx0XHRcdFx0ZW5kUG9zaXRpb25zW3ZpZHggKyAyXSA9IGNvbXAyO1xuXG5cdFx0XHRcdFx0XHR0aGlja25lc3NbZmlkeCsrXSA9IDE7XG5cblx0XHRcdFx0XHRcdHZpZHggKz0gMztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoaSA8IHRoaXMuX3BTZWdtZW50c1cpIHtcblx0XHRcdFx0XHRcdHN0YXJ0UG9zaXRpb25zW3ZpZHhdID0geDtcblx0XHRcdFx0XHRcdHN0YXJ0UG9zaXRpb25zW3ZpZHggKyAxXSA9IGNvbXAxO1xuXHRcdFx0XHRcdFx0c3RhcnRQb3NpdGlvbnNbdmlkeCArIDJdID0gY29tcDI7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIGJ1aWxkIHJlYWwgZGF0YSBmcm9tIHJhdyBkYXRhXG5cdFx0XHRsaW5lR2VvbWV0cnkudXBkYXRlUG9zaXRpb25zKHN0YXJ0UG9zaXRpb25zLCBlbmRQb3NpdGlvbnMpO1xuXHRcdFx0bGluZUdlb21ldHJ5LnVwZGF0ZVRoaWNrbmVzcyh0aGlja25lc3MpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBAaW5oZXJpdERvY1xuXHQgKi9cblx0cHVibGljIF9wQnVpbGRVVnModGFyZ2V0OlN1Ykdlb21ldHJ5QmFzZSwgZ2VvbWV0cnlUeXBlOnN0cmluZylcblx0e1xuXHRcdHZhciBpOm51bWJlcjtcblx0XHR2YXIgajpudW1iZXI7XG5cdFx0dmFyIHg6bnVtYmVyO1xuXHRcdHZhciB5Om51bWJlcjtcblx0XHR2YXIgcmV2b2x1dGlvbkFuZ2xlOm51bWJlcjtcblx0XHR2YXIgdXZzOkFycmF5PG51bWJlcj47XG5cblx0XHRpZiAoZ2VvbWV0cnlUeXBlID09IFwidHJpYW5nbGVTdWJHZW9tZXRyeVwiKSB7XG5cblx0XHRcdHZhciB0cmlhbmdsZUdlb21ldHJ5OlRyaWFuZ2xlU3ViR2VvbWV0cnkgPSA8VHJpYW5nbGVTdWJHZW9tZXRyeT4gdGFyZ2V0O1xuXG5cdFx0XHQvLyBuZWVkIHRvIGluaXRpYWxpemUgcmF3IGFycmF5IG9yIGNhbiBiZSByZXVzZWQ/XG5cdFx0XHRpZiAodHJpYW5nbGVHZW9tZXRyeS51dnMgJiYgdGhpcy5fbnVtVmVydGljZXMgPT0gdHJpYW5nbGVHZW9tZXRyeS5udW1WZXJ0aWNlcykge1xuXHRcdFx0XHR1dnMgPSB0cmlhbmdsZUdlb21ldHJ5LnV2cztcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHV2cyA9IG5ldyBBcnJheTxudW1iZXI+KHRoaXMuX251bVZlcnRpY2VzKjIpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBldmFsdWF0ZSByZXZvbHV0aW9uIHN0ZXBzXG5cdFx0XHR2YXIgcmV2b2x1dGlvbkFuZ2xlRGVsdGE6bnVtYmVyID0gMipNYXRoLlBJL3RoaXMuX3BTZWdtZW50c1c7XG5cblx0XHRcdC8vIGN1cnJlbnQgdXYgY29tcG9uZW50IGluZGV4XG5cdFx0XHR2YXIgaW5kZXg6bnVtYmVyID0gMDtcblxuXHRcdFx0Ly8gdG9wXG5cdFx0XHRpZiAodGhpcy5fdG9wQ2xvc2VkKSB7XG5cblx0XHRcdFx0dXZzW2luZGV4KytdID0gMC41KnRyaWFuZ2xlR2VvbWV0cnkuc2NhbGVVOyAvLyBjZW50cmFsIHZlcnRleFxuXHRcdFx0XHR1dnNbaW5kZXgrK10gPSAwLjUqdHJpYW5nbGVHZW9tZXRyeS5zY2FsZVY7XG5cblx0XHRcdFx0Zm9yIChpID0gMDsgaSA8PSB0aGlzLl9wU2VnbWVudHNXOyArK2kpIHtcblxuXHRcdFx0XHRcdHJldm9sdXRpb25BbmdsZSA9IGkqcmV2b2x1dGlvbkFuZ2xlRGVsdGE7XG5cdFx0XHRcdFx0eCA9IDAuNSArIDAuNSogLU1hdGguY29zKHJldm9sdXRpb25BbmdsZSk7XG5cdFx0XHRcdFx0eSA9IDAuNSArIDAuNSpNYXRoLnNpbihyZXZvbHV0aW9uQW5nbGUpO1xuXG5cdFx0XHRcdFx0dXZzW2luZGV4KytdID0geCp0cmlhbmdsZUdlb21ldHJ5LnNjYWxlVTsgLy8gcmV2b2x1dGlvbiB2ZXJ0ZXhcblx0XHRcdFx0XHR1dnNbaW5kZXgrK10gPSB5KnRyaWFuZ2xlR2VvbWV0cnkuc2NhbGVWO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIGJvdHRvbVxuXHRcdFx0aWYgKHRoaXMuX2JvdHRvbUNsb3NlZCkge1xuXG5cdFx0XHRcdHV2c1tpbmRleCsrXSA9IDAuNSp0cmlhbmdsZUdlb21ldHJ5LnNjYWxlVTsgLy8gY2VudHJhbCB2ZXJ0ZXhcblx0XHRcdFx0dXZzW2luZGV4KytdID0gMC41KnRyaWFuZ2xlR2VvbWV0cnkuc2NhbGVWO1xuXG5cdFx0XHRcdGZvciAoaSA9IDA7IGkgPD0gdGhpcy5fcFNlZ21lbnRzVzsgKytpKSB7XG5cblx0XHRcdFx0XHRyZXZvbHV0aW9uQW5nbGUgPSBpKnJldm9sdXRpb25BbmdsZURlbHRhO1xuXHRcdFx0XHRcdHggPSAwLjUgKyAwLjUqTWF0aC5jb3MocmV2b2x1dGlvbkFuZ2xlKTtcblx0XHRcdFx0XHR5ID0gMC41ICsgMC41Kk1hdGguc2luKHJldm9sdXRpb25BbmdsZSk7XG5cblx0XHRcdFx0XHR1dnNbaW5kZXgrK10gPSB4KnRyaWFuZ2xlR2VvbWV0cnkuc2NhbGVVOyAvLyByZXZvbHV0aW9uIHZlcnRleFxuXHRcdFx0XHRcdHV2c1tpbmRleCsrXSA9IHkqdHJpYW5nbGVHZW9tZXRyeS5zY2FsZVY7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gbGF0ZXJhbCBzdXJmYWNlXG5cdFx0XHRpZiAodGhpcy5fc3VyZmFjZUNsb3NlZCkge1xuXHRcdFx0XHRmb3IgKGogPSAwOyBqIDw9IHRoaXMuX3BTZWdtZW50c0g7ICsraikge1xuXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPD0gdGhpcy5fcFNlZ21lbnRzVzsgKytpKSB7XG5cdFx0XHRcdFx0XHQvLyByZXZvbHV0aW9uIHZlcnRleFxuXHRcdFx0XHRcdFx0dXZzW2luZGV4KytdID0gKCBpL3RoaXMuX3BTZWdtZW50c1cgKSp0cmlhbmdsZUdlb21ldHJ5LnNjYWxlVTtcblx0XHRcdFx0XHRcdHV2c1tpbmRleCsrXSA9ICggai90aGlzLl9wU2VnbWVudHNIICkqdHJpYW5nbGVHZW9tZXRyeS5zY2FsZVY7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIGJ1aWxkIHJlYWwgZGF0YSBmcm9tIHJhdyBkYXRhXG5cdFx0XHR0cmlhbmdsZUdlb21ldHJ5LnVwZGF0ZVVWcyh1dnMpO1xuXG5cdFx0fSBlbHNlIGlmIChnZW9tZXRyeVR5cGUgPT0gXCJsaW5lU3ViR2VvbWV0cnlcIikge1xuXHRcdFx0Ly9ub3RoaW5nIHRvIGRvIGhlcmVcblx0XHR9XG5cdH1cbn1cblxuZXhwb3J0ID0gUHJpbWl0aXZlQ3lsaW5kZXJQcmVmYWI7Il19