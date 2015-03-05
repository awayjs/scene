var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var PrimitivePrefabBase = require("awayjs-display/lib/prefabs/PrimitivePrefabBase");
/**
 * A Cube primitive prefab.
 */
var PrimitiveCubePrefab = (function (_super) {
    __extends(PrimitiveCubePrefab, _super);
    /**
     * Creates a new Cube object.
     * @param width The size of the cube along its X-axis.
     * @param height The size of the cube along its Y-axis.
     * @param depth The size of the cube along its Z-axis.
     * @param segmentsW The number of segments that make up the cube along the X-axis.
     * @param segmentsH The number of segments that make up the cube along the Y-axis.
     * @param segmentsD The number of segments that make up the cube along the Z-axis.
     * @param tile6 The type of uv mapping to use. When true, a texture will be subdivided in a 2x3 grid, each used for a single face. When false, the entire image is mapped on each face.
     */
    function PrimitiveCubePrefab(width, height, depth, segmentsW, segmentsH, segmentsD, tile6) {
        if (width === void 0) { width = 100; }
        if (height === void 0) { height = 100; }
        if (depth === void 0) { depth = 100; }
        if (segmentsW === void 0) { segmentsW = 1; }
        if (segmentsH === void 0) { segmentsH = 1; }
        if (segmentsD === void 0) { segmentsD = 1; }
        if (tile6 === void 0) { tile6 = true; }
        _super.call(this);
        this._width = width;
        this._height = height;
        this._depth = depth;
        this._segmentsW = segmentsW;
        this._segmentsH = segmentsH;
        this._segmentsD = segmentsD;
        this._tile6 = tile6;
    }
    Object.defineProperty(PrimitiveCubePrefab.prototype, "width", {
        /**
         * The size of the cube along its X-axis.
         */
        get: function () {
            return this._width;
        },
        set: function (value) {
            this._width = value;
            this._pInvalidateGeometry();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimitiveCubePrefab.prototype, "height", {
        /**
         * The size of the cube along its Y-axis.
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
    Object.defineProperty(PrimitiveCubePrefab.prototype, "depth", {
        /**
         * The size of the cube along its Z-axis.
         */
        get: function () {
            return this._depth;
        },
        set: function (value) {
            this._depth = value;
            this._pInvalidateGeometry();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimitiveCubePrefab.prototype, "tile6", {
        /**
         * The type of uv mapping to use. When false, the entire image is mapped on each face.
         * When true, a texture will be subdivided in a 3x2 grid, each used for a single face.
         * Reading the tiles from left to right, top to bottom they represent the faces of the
         * cube in the following order: bottom, top, back, left, front, right. This creates
         * several shared edges (between the top, front, left and right faces) which simplifies
         * texture painting.
         */
        get: function () {
            return this._tile6;
        },
        set: function (value) {
            this._tile6 = value;
            this._pInvalidateGeometry();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimitiveCubePrefab.prototype, "segmentsW", {
        /**
         * The number of segments that make up the cube along the X-axis. Defaults to 1.
         */
        get: function () {
            return this._segmentsW;
        },
        set: function (value) {
            this._segmentsW = value;
            this._pInvalidateGeometry();
            this._pInvalidateUVs();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimitiveCubePrefab.prototype, "segmentsH", {
        /**
         * The number of segments that make up the cube along the Y-axis. Defaults to 1.
         */
        get: function () {
            return this._segmentsH;
        },
        set: function (value) {
            this._segmentsH = value;
            this._pInvalidateGeometry();
            this._pInvalidateUVs();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimitiveCubePrefab.prototype, "segmentsD", {
        /**
         * The number of segments that make up the cube along the Z-axis. Defaults to 1.
         */
        get: function () {
            return this._segmentsD;
        },
        set: function (value) {
            this._segmentsD = value;
            this._pInvalidateGeometry();
            this._pInvalidateUVs();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @inheritDoc
     */
    PrimitiveCubePrefab.prototype._pBuildGeometry = function (target, geometryType) {
        var indices /*uint*/;
        var positions;
        var normals;
        var tangents;
        var tl, tr, bl, br;
        var i, j, inc = 0;
        var vidx, fidx; // indices
        var hw, hh, hd; // halves
        var dw, dh, dd; // deltas
        var outer_pos;
        var numIndices;
        var numVertices;
        // half cube dimensions
        hw = this._width / 2;
        hh = this._height / 2;
        hd = this._depth / 2;
        if (geometryType == "triangleSubGeometry") {
            var triangleGeometry = target;
            numVertices = ((this._segmentsW + 1) * (this._segmentsH + 1) + (this._segmentsW + 1) * (this._segmentsD + 1) + (this._segmentsH + 1) * (this._segmentsD + 1)) * 2;
            numIndices = ((this._segmentsW * this._segmentsH + this._segmentsW * this._segmentsD + this._segmentsH * this._segmentsD) * 12);
            if (numVertices == triangleGeometry.numVertices && triangleGeometry.indices != null) {
                indices = triangleGeometry.indices;
                positions = triangleGeometry.positions;
                normals = triangleGeometry.vertexNormals;
                tangents = triangleGeometry.vertexTangents;
            }
            else {
                indices = new Array(numIndices);
                positions = new Array(numVertices * 3);
                normals = new Array(numVertices * 3);
                tangents = new Array(numVertices * 3);
                this._pInvalidateUVs();
            }
            vidx = 0;
            fidx = 0;
            // Segment dimensions
            dw = this._width / this._segmentsW;
            dh = this._height / this._segmentsH;
            dd = this._depth / this._segmentsD;
            for (i = 0; i <= this._segmentsW; i++) {
                outer_pos = -hw + i * dw;
                for (j = 0; j <= this._segmentsH; j++) {
                    // front
                    positions[vidx] = outer_pos;
                    positions[vidx + 1] = -hh + j * dh;
                    positions[vidx + 2] = -hd;
                    normals[vidx] = 0;
                    normals[vidx + 1] = 0;
                    normals[vidx + 2] = -1;
                    tangents[vidx] = 1;
                    tangents[vidx + 1] = 0;
                    tangents[vidx + 2] = 0;
                    vidx += 3;
                    // back
                    positions[vidx] = outer_pos;
                    positions[vidx + 1] = -hh + j * dh;
                    positions[vidx + 2] = hd;
                    normals[vidx] = 0;
                    normals[vidx + 1] = 0;
                    normals[vidx + 2] = 1;
                    tangents[vidx] = -1;
                    tangents[vidx + 1] = 0;
                    tangents[vidx + 2] = 0;
                    vidx += 3;
                    if (i && j) {
                        tl = 2 * ((i - 1) * (this._segmentsH + 1) + (j - 1));
                        tr = 2 * (i * (this._segmentsH + 1) + (j - 1));
                        bl = tl + 2;
                        br = tr + 2;
                        indices[fidx++] = tl;
                        indices[fidx++] = bl;
                        indices[fidx++] = br;
                        indices[fidx++] = tl;
                        indices[fidx++] = br;
                        indices[fidx++] = tr;
                        indices[fidx++] = tr + 1;
                        indices[fidx++] = br + 1;
                        indices[fidx++] = bl + 1;
                        indices[fidx++] = tr + 1;
                        indices[fidx++] = bl + 1;
                        indices[fidx++] = tl + 1;
                    }
                }
            }
            inc += 2 * (this._segmentsW + 1) * (this._segmentsH + 1);
            for (i = 0; i <= this._segmentsW; i++) {
                outer_pos = -hw + i * dw;
                for (j = 0; j <= this._segmentsD; j++) {
                    // top
                    positions[vidx] = outer_pos;
                    positions[vidx + 1] = hh;
                    positions[vidx + 2] = -hd + j * dd;
                    normals[vidx] = 0;
                    normals[vidx + 1] = 1;
                    normals[vidx + 2] = 0;
                    tangents[vidx] = 1;
                    tangents[vidx + 1] = 0;
                    tangents[vidx + 2] = 0;
                    vidx += 3;
                    // bottom
                    positions[vidx] = outer_pos;
                    positions[vidx + 1] = -hh;
                    positions[vidx + 2] = -hd + j * dd;
                    normals[vidx] = 0;
                    normals[vidx + 1] = -1;
                    normals[vidx + 2] = 0;
                    tangents[vidx] = 1;
                    tangents[vidx + 1] = 0;
                    tangents[vidx + 2] = 0;
                    vidx += 3;
                    if (i && j) {
                        tl = inc + 2 * ((i - 1) * (this._segmentsD + 1) + (j - 1));
                        tr = inc + 2 * (i * (this._segmentsD + 1) + (j - 1));
                        bl = tl + 2;
                        br = tr + 2;
                        indices[fidx++] = tl;
                        indices[fidx++] = bl;
                        indices[fidx++] = br;
                        indices[fidx++] = tl;
                        indices[fidx++] = br;
                        indices[fidx++] = tr;
                        indices[fidx++] = tr + 1;
                        indices[fidx++] = br + 1;
                        indices[fidx++] = bl + 1;
                        indices[fidx++] = tr + 1;
                        indices[fidx++] = bl + 1;
                        indices[fidx++] = tl + 1;
                    }
                }
            }
            inc += 2 * (this._segmentsW + 1) * (this._segmentsD + 1);
            for (i = 0; i <= this._segmentsD; i++) {
                outer_pos = hd - i * dd;
                for (j = 0; j <= this._segmentsH; j++) {
                    // left
                    positions[vidx] = -hw;
                    positions[vidx + 1] = -hh + j * dh;
                    positions[vidx + 2] = outer_pos;
                    normals[vidx] = -1;
                    normals[vidx + 1] = 0;
                    normals[vidx + 2] = 0;
                    tangents[vidx] = 0;
                    tangents[vidx + 1] = 0;
                    tangents[vidx + 2] = -1;
                    vidx += 3;
                    // right
                    positions[vidx] = hw;
                    positions[vidx + 1] = -hh + j * dh;
                    positions[vidx + 2] = outer_pos;
                    normals[vidx] = 1;
                    normals[vidx + 1] = 0;
                    normals[vidx + 2] = 0;
                    tangents[vidx] = 0;
                    tangents[vidx + 1] = 0;
                    tangents[vidx + 2] = 1;
                    vidx += 3;
                    if (i && j) {
                        tl = inc + 2 * ((i - 1) * (this._segmentsH + 1) + (j - 1));
                        tr = inc + 2 * (i * (this._segmentsH + 1) + (j - 1));
                        bl = tl + 2;
                        br = tr + 2;
                        indices[fidx++] = tl;
                        indices[fidx++] = bl;
                        indices[fidx++] = br;
                        indices[fidx++] = tl;
                        indices[fidx++] = br;
                        indices[fidx++] = tr;
                        indices[fidx++] = tr + 1;
                        indices[fidx++] = br + 1;
                        indices[fidx++] = bl + 1;
                        indices[fidx++] = tr + 1;
                        indices[fidx++] = bl + 1;
                        indices[fidx++] = tl + 1;
                    }
                }
            }
            triangleGeometry.updateIndices(indices);
            triangleGeometry.updatePositions(positions);
            triangleGeometry.updateVertexNormals(normals);
            triangleGeometry.updateVertexTangents(tangents);
        }
        else if (geometryType == "lineSubGeometry") {
            var lineGeometry = target;
            var numSegments = this._segmentsH * 4 + this._segmentsW * 4 + this._segmentsD * 4;
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
            for (i = 0; i < this._segmentsH; ++i) {
                startPositions[vidx] = -hw;
                startPositions[vidx + 1] = i * this._height / this._segmentsH - hh;
                startPositions[vidx + 2] = -hd;
                endPositions[vidx] = hw;
                endPositions[vidx + 1] = i * this._height / this._segmentsH - hh;
                endPositions[vidx + 2] = -hd;
                thickness[fidx++] = 1;
                vidx += 3;
                startPositions[vidx] = -hw;
                startPositions[vidx + 1] = hh - i * this._height / this._segmentsH;
                startPositions[vidx + 2] = hd;
                endPositions[vidx] = hw;
                endPositions[vidx + 1] = hh - i * this._height / this._segmentsH;
                endPositions[vidx + 2] = hd;
                thickness[fidx++] = 1;
                vidx += 3;
            }
            for (i = 0; i < this._segmentsW; ++i) {
                startPositions[vidx] = i * this._width / this._segmentsW - hw;
                startPositions[vidx + 1] = -hh;
                startPositions[vidx + 2] = -hd;
                endPositions[vidx] = i * this._width / this._segmentsW - hw;
                endPositions[vidx + 1] = hh;
                endPositions[vidx + 2] = -hd;
                thickness[fidx++] = 1;
                vidx += 3;
                startPositions[vidx] = hw - i * this._width / this._segmentsW;
                startPositions[vidx + 1] = -hh;
                startPositions[vidx + 2] = hd;
                endPositions[vidx] = hw - i * this._width / this._segmentsW;
                endPositions[vidx + 1] = hh;
                endPositions[vidx + 2] = hd;
                thickness[fidx++] = 1;
                vidx += 3;
            }
            for (i = 0; i < this._segmentsH; ++i) {
                startPositions[vidx] = -hw;
                startPositions[vidx + 1] = i * this._height / this._segmentsH - hh;
                startPositions[vidx + 2] = -hd;
                endPositions[vidx] = -hw;
                endPositions[vidx + 1] = i * this._height / this._segmentsH - hh;
                endPositions[vidx + 2] = hd;
                thickness[fidx++] = 1;
                vidx += 3;
                startPositions[vidx] = hw;
                startPositions[vidx + 1] = hh - i * this._height / this._segmentsH;
                startPositions[vidx + 2] = -hd;
                endPositions[vidx] = hw;
                endPositions[vidx + 1] = hh - i * this._height / this._segmentsH;
                endPositions[vidx + 2] = hd;
                thickness[fidx++] = 1;
                vidx += 3;
            }
            for (i = 0; i < this._segmentsD; ++i) {
                startPositions[vidx] = hw;
                startPositions[vidx + 1] = -hh;
                startPositions[vidx + 2] = i * this._depth / this._segmentsD - hd;
                endPositions[vidx] = hw;
                endPositions[vidx + 1] = hh;
                endPositions[vidx + 2] = i * this._depth / this._segmentsD - hd;
                thickness[fidx++] = 1;
                vidx += 3;
                startPositions[vidx] = -hw;
                startPositions[vidx + 1] = -hh;
                startPositions[vidx + 2] = hd - i * this._depth / this._segmentsD;
                endPositions[vidx] = -hw;
                endPositions[vidx + 1] = hh;
                endPositions[vidx + 2] = hd - i * this._depth / this._segmentsD;
                thickness[fidx++] = 1;
                vidx += 3;
            }
            for (i = 0; i < this._segmentsD; ++i) {
                startPositions[vidx] = -hw;
                startPositions[vidx + 1] = -hh;
                startPositions[vidx + 2] = hd - i * this._depth / this._segmentsD;
                endPositions[vidx] = hw;
                endPositions[vidx + 1] = -hh;
                endPositions[vidx + 2] = hd - i * this._depth / this._segmentsD;
                thickness[fidx++] = 1;
                vidx += 3;
                startPositions[vidx] = -hw;
                startPositions[vidx + 1] = hh;
                startPositions[vidx + 2] = i * this._depth / this._segmentsD - hd;
                endPositions[vidx] = hw;
                endPositions[vidx + 1] = hh;
                endPositions[vidx + 2] = i * this._depth / this._segmentsD - hd;
                thickness[fidx++] = 1;
                vidx += 3;
            }
            for (i = 0; i < this._segmentsW; ++i) {
                startPositions[vidx] = hw - i * this._width / this._segmentsW;
                startPositions[vidx + 1] = -hh;
                startPositions[vidx + 2] = -hd;
                endPositions[vidx] = hw - i * this._width / this._segmentsW;
                endPositions[vidx + 1] = -hh;
                endPositions[vidx + 2] = hd;
                thickness[fidx++] = 1;
                vidx += 3;
                startPositions[vidx] = i * this._width / this._segmentsW - hw;
                startPositions[vidx + 1] = hh;
                startPositions[vidx + 2] = -hd;
                endPositions[vidx] = i * this._width / this._segmentsW - hw;
                endPositions[vidx + 1] = hh;
                endPositions[vidx + 2] = hd;
                thickness[fidx++] = 1;
                vidx += 3;
            }
            // build real data from raw data
            lineGeometry.updatePositions(startPositions, endPositions);
            lineGeometry.updateThickness(thickness);
        }
    };
    /**
     * @inheritDoc
     */
    PrimitiveCubePrefab.prototype._pBuildUVs = function (target, geometryType) {
        var i, j, index;
        var uvs;
        var u_tile_dim, v_tile_dim;
        var u_tile_step, v_tile_step;
        var tl0u, tl0v;
        var tl1u, tl1v;
        var du, dv;
        var numVertices;
        if (geometryType == "triangleSubGeometry") {
            numVertices = ((this._segmentsW + 1) * (this._segmentsH + 1) + (this._segmentsW + 1) * (this._segmentsD + 1) + (this._segmentsH + 1) * (this._segmentsD + 1)) * 2;
            var triangleGeometry = target;
            if (numVertices == triangleGeometry.numVertices && triangleGeometry.uvs != null) {
                uvs = triangleGeometry.uvs;
            }
            else {
                uvs = new Array(numVertices * 2);
            }
            if (this._tile6) {
                u_tile_dim = u_tile_step = 1 / 3;
                v_tile_dim = v_tile_step = 1 / 2;
            }
            else {
                u_tile_dim = v_tile_dim = 1;
                u_tile_step = v_tile_step = 0;
            }
            // Create planes two and two, the same way that they were
            // constructed in the buildGeometry() function. First calculate
            // the top-left UV coordinate for both planes, and then loop
            // over the points, calculating the UVs from these numbers.
            // When tile6 is true, the layout is as follows:
            //       .-----.-----.-----. (1,1)
            //       | Bot |  T  | Bak |
            //       |-----+-----+-----|
            //       |  L  |  F  |  R  |
            // (0,0)'-----'-----'-----'
            index = 0;
            // FRONT / BACK
            tl0u = 1 * u_tile_step;
            tl0v = 1 * v_tile_step;
            tl1u = 2 * u_tile_step;
            tl1v = 0 * v_tile_step;
            du = u_tile_dim / this._segmentsW;
            dv = v_tile_dim / this._segmentsH;
            for (i = 0; i <= this._segmentsW; i++) {
                for (j = 0; j <= this._segmentsH; j++) {
                    uvs[index++] = (tl0u + i * du) * triangleGeometry.scaleU;
                    uvs[index++] = (tl0v + (v_tile_dim - j * dv)) * triangleGeometry.scaleV;
                    uvs[index++] = (tl1u + (u_tile_dim - i * du)) * triangleGeometry.scaleU;
                    uvs[index++] = (tl1v + (v_tile_dim - j * dv)) * triangleGeometry.scaleV;
                }
            }
            // TOP / BOTTOM
            tl0u = 1 * u_tile_step;
            tl0v = 0 * v_tile_step;
            tl1u = 0 * u_tile_step;
            tl1v = 0 * v_tile_step;
            du = u_tile_dim / this._segmentsW;
            dv = v_tile_dim / this._segmentsD;
            for (i = 0; i <= this._segmentsW; i++) {
                for (j = 0; j <= this._segmentsD; j++) {
                    uvs[index++] = (tl0u + i * du) * triangleGeometry.scaleU;
                    uvs[index++] = (tl0v + (v_tile_dim - j * dv)) * triangleGeometry.scaleV;
                    uvs[index++] = (tl1u + i * du) * triangleGeometry.scaleU;
                    uvs[index++] = (tl1v + j * dv) * triangleGeometry.scaleV;
                }
            }
            // LEFT / RIGHT
            tl0u = 0 * u_tile_step;
            tl0v = 1 * v_tile_step;
            tl1u = 2 * u_tile_step;
            tl1v = 1 * v_tile_step;
            du = u_tile_dim / this._segmentsD;
            dv = v_tile_dim / this._segmentsH;
            for (i = 0; i <= this._segmentsD; i++) {
                for (j = 0; j <= this._segmentsH; j++) {
                    uvs[index++] = (tl0u + i * du) * triangleGeometry.scaleU;
                    uvs[index++] = (tl0v + (v_tile_dim - j * dv)) * triangleGeometry.scaleV;
                    uvs[index++] = (tl1u + (u_tile_dim - i * du)) * triangleGeometry.scaleU;
                    uvs[index++] = (tl1v + (v_tile_dim - j * dv)) * triangleGeometry.scaleV;
                }
            }
            triangleGeometry.updateUVs(uvs);
        }
        else if (geometryType == "lineSubGeometry") {
        }
    };
    return PrimitiveCubePrefab;
})(PrimitivePrefabBase);
module.exports = PrimitiveCubePrefab;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9wcmVmYWJzL1ByaW1pdGl2ZUN1YmVQcmVmYWIudHMiXSwibmFtZXMiOlsiUHJpbWl0aXZlQ3ViZVByZWZhYiIsIlByaW1pdGl2ZUN1YmVQcmVmYWIuY29uc3RydWN0b3IiLCJQcmltaXRpdmVDdWJlUHJlZmFiLndpZHRoIiwiUHJpbWl0aXZlQ3ViZVByZWZhYi5oZWlnaHQiLCJQcmltaXRpdmVDdWJlUHJlZmFiLmRlcHRoIiwiUHJpbWl0aXZlQ3ViZVByZWZhYi50aWxlNiIsIlByaW1pdGl2ZUN1YmVQcmVmYWIuc2VnbWVudHNXIiwiUHJpbWl0aXZlQ3ViZVByZWZhYi5zZWdtZW50c0giLCJQcmltaXRpdmVDdWJlUHJlZmFiLnNlZ21lbnRzRCIsIlByaW1pdGl2ZUN1YmVQcmVmYWIuX3BCdWlsZEdlb21ldHJ5IiwiUHJpbWl0aXZlQ3ViZVByZWZhYi5fcEJ1aWxkVVZzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFLQSxJQUFPLG1CQUFtQixXQUFZLGdEQUFnRCxDQUFDLENBQUM7QUFFeEYsQUFHQTs7R0FERztJQUNHLG1CQUFtQjtJQUFTQSxVQUE1QkEsbUJBQW1CQSxVQUE0QkE7SUFXcERBOzs7Ozs7Ozs7T0FTR0E7SUFDSEEsU0FyQktBLG1CQUFtQkEsQ0FxQlpBLEtBQWtCQSxFQUFFQSxNQUFtQkEsRUFBRUEsS0FBa0JBLEVBQUVBLFNBQW9CQSxFQUFFQSxTQUFvQkEsRUFBRUEsU0FBb0JBLEVBQUVBLEtBQW9CQTtRQUFuSkMscUJBQWtCQSxHQUFsQkEsV0FBa0JBO1FBQUVBLHNCQUFtQkEsR0FBbkJBLFlBQW1CQTtRQUFFQSxxQkFBa0JBLEdBQWxCQSxXQUFrQkE7UUFBRUEseUJBQW9CQSxHQUFwQkEsYUFBb0JBO1FBQUVBLHlCQUFvQkEsR0FBcEJBLGFBQW9CQTtRQUFFQSx5QkFBb0JBLEdBQXBCQSxhQUFvQkE7UUFBRUEscUJBQW9CQSxHQUFwQkEsWUFBb0JBO1FBRTlKQSxpQkFBT0EsQ0FBQ0E7UUFFUkEsSUFBSUEs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dkNBLEFBQ0FBLFFBRFFBO29CQUNSQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxTQUFTQSxDQUFDQTtvQkFDNUJBLFNBQVNBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLEdBQUdBLENBQUNBLEdBQUNBLEVBQUVBLENBQUNBO29CQUNqQ0EsU0FBU0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0E7b0JBQzFCQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFDbEJBLE9BQU9BLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO29CQUN0QkEsT0FBT0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ3ZCQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFDbkJBLFFBQVFBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO29CQUN2QkEsUUFBUUEsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBQ3ZCQSxJQUFJQSxJQUFJQSxDQUFDQSxDQUFDQTtvQkFFVkEsQUFDQUEsT0FET0E7b0JBQ1BBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLFNBQVNBLENBQUNBO29CQUM1QkEsU0FBU0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsR0FBR0EsQ0FBQ0EsR0FBQ0EsRUFBRUEsQ0FBQ0E7b0JBQ2pDQSxTQUFTQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTtvQkFDekJBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO29CQUNsQkEsT0FBT0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBQ3RCQSxPQUFPQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFDdEJBLFFBQVFBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO29CQUNwQkEsUUFBUUEsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBQ3ZCQSxRQUFRQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFDdkJBLElBQUlBLElBQUlBLENBQUNBLENBQUNBO29CQUVWQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDWkEsRUFBRUEsR0FBR0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQ2pEQSxFQUFFQSxHQUFHQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDM0NBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBO3dCQUNaQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQTt3QkFFWkEsT0FBT0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7d0JBQ3JCQSxPQUFPQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTt3QkFDckJBLE9BQU9BLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO3dCQUNyQkEsT0FBT0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7d0JBQ3JCQSxPQUFPQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTt3QkFDckJBLE9BQU9BLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO3dCQUNyQkEsT0FBT0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0E7d0JBQ3pCQSxPQUFPQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQTt3QkFDekJBLE9BQU9BLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBO3dCQUN6QkEsT0FBT0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0E7d0JBQ3pCQSxPQUFPQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQTt3QkFDekJBLE9BQU9BLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBO29CQUMxQkEsQ0FBQ0E7Z0JBQ0ZBLENBQUNBO1lBQ0ZBLENBQUNBO1lBRURBLEdBQUdBLElBQUlBLENBQUNBLEdBQUNBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO1lBRXJEQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxVQUFVQSxFQUFFQSxDQUFDQSxFQUFFQSxFQUFFQSxDQUFDQTtnQkFDdkNBLFNBQVNBLEdBQUdBLENBQUNBLEVBQUVBLEdBQUdBLENBQUNBLEdBQUNBLEVBQUVBLENBQUNBO2dCQUV2QkEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsVUFBVUEsRUFBRUEsQ0FBQ0EsRUFBRUEsRUFBRUEsQ0FBQ0E7b0JBQ3ZDQSxBQUNBQSxNQURNQTtvQkFDTkEsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsU0FBU0EsQ0FBQ0E7b0JBQzVCQSxTQUFTQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTtvQkFDekJBLFNBQVNBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLEdBQUdBLENBQUNBLEdBQUNBLEVBQUVBLENBQUNBO29CQUNqQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBQ2xCQSxPQUFPQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFDdEJBLE9BQU9BLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO29CQUN0QkEsUUFBUUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBQ25CQSxRQUFRQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFDdkJBLFFBQVFBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO29CQUN2QkEsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7b0JBRVZBLEFBQ0FBLFNBRFNBO29CQUNUQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxTQUFTQSxDQUFDQTtvQkFDNUJBLFNBQVNBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBO29CQUMxQkEsU0FBU0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsR0FBR0EsQ0FBQ0EsR0FBQ0EsRUFBRUEsQ0FBQ0E7b0JBQ2pDQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFDbEJBLE9BQU9BLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO29CQUN2QkEsT0FBT0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBQ3RCQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFDbkJBLFFBQVFBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO29CQUN2QkEsUUFBUUEsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBQ3ZCQSxJQUFJQSxJQUFJQSxDQUFDQSxDQUFDQTtvQkFFVkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQ1pBLEVBQUVBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO3dCQUN2REEsRUFBRUEsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQ2pEQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQTt3QkFDWkEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0E7d0JBRVpBLE9BQU9BLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO3dCQUNyQkEsT0FBT0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7d0JBQ3JCQSxPQUFPQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTt3QkFDckJBLE9BQU9BLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO3dCQUNyQkEsT0FBT0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7d0JBQ3JCQSxPQUFPQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTt3QkFDckJBLE9BQU9BLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBO3dCQUN6QkEsT0FBT0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0E7d0JBQ3pCQSxPQUFPQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQTt3QkFDekJBLE9BQU9BLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBO3dCQUN6QkEsT0FBT0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0E7d0JBQ3pCQSxPQUFPQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFDMUJBLENBQUNBO2dCQUNGQSxDQUFDQTtZQUNGQSxDQUFDQTtZQUVEQSxHQUFHQSxJQUFJQSxDQUFDQSxHQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUVyREEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsVUFBVUEsRUFBRUEsQ0FBQ0EsRUFBRUEsRUFBRUEsQ0FBQ0E7Z0JBQ3ZDQSxTQUFTQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQSxHQUFDQSxFQUFFQSxDQUFDQTtnQkFFdEJBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLFVBQVVBLEVBQUVBLENBQUNBLEVBQUVBLEVBQUVBLENBQUNBO29CQUN2Q0EsQUFDQUEsT0FET0E7b0JBQ1BBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBO29CQUN0QkEsU0FBU0EsQ0FBQ0EsSUFBSUEsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsR0FBR0EsQ0FBQ0EsR0FBQ0EsRUFBRUEsQ0FBQ0E7b0JBQy9CQSxTQUFTQSxDQUFDQSxJQUFJQSxHQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxTQUFTQSxDQUFDQTtvQkFDOUJBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO29CQUNuQkEsT0FBT0EsQ0FBQ0EsSUFBSUEsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBQ3BCQSxPQUFPQSxDQUFDQSxJQUFJQSxHQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFDcEJBLFFBQVFBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO29CQUNuQkEsUUFBUUEsQ0FBQ0EsSUFBSUEsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBQ3JCQSxRQUFRQSxDQUFDQSxJQUFJQSxHQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDdEJBLElBQUlBLElBQUlBLENBQUNBLENBQUNBO29CQUVWQSxBQUNBQSxRQURRQTtvQkFDUkEsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7b0JBQ3JCQSxTQUFTQSxDQUFDQSxJQUFJQSxHQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxHQUFHQSxDQUFDQSxHQUFDQSxFQUFFQSxDQUFDQTtvQkFDL0JBLFNBQVNBLENBQUNBLElBQUlBLEdBQUNBLENBQUNBLENBQUNBLEdBQUdBLFNBQVNBLENBQUNBO29CQUM5QkEsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBQ2xCQSxPQUFPQSxDQUFDQSxJQUFJQSxHQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFDcEJBLE9BQU9BLENBQUNBLElBQUlBLEdBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO29CQUNwQkEsUUFBUUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBQ25CQSxRQUFRQSxDQUFDQSxJQUFJQSxHQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFDckJBLFFBQVFBLENBQUNBLElBQUlBLEdBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO29CQUNyQkEsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7b0JBRVZBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO3dCQUNaQSxFQUFFQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDdkRBLEVBQUVBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO3dCQUNqREEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0E7d0JBQ1pBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBO3dCQUVaQSxPQUFPQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTt3QkFDckJBLE9BQU9BLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO3dCQUNyQkEsT0FBT0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7d0JBQ3JCQSxPQUFPQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTt3QkFDckJBLE9BQU9BLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO3dCQUNyQkEsT0FBT0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7d0JBQ3JCQSxPQUFPQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQTt3QkFDekJBLE9BQU9BLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBO3dCQUN6QkEsT0FBT0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0E7d0JBQ3pCQSxPQUFPQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQTt3QkFDekJBLE9BQU9BLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNB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LFNBQVNBLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUV0QkEsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7Z0JBRVZBLGNBQWNBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBO2dCQUMzQkEsY0FBY0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0E7Z0JBQy9EQSxjQUFjQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTtnQkFFOUJBLFlBQVlBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO2dCQUN4QkEsWUFBWUEsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0E7Z0JBQzdEQSxZQUFZQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTtnQkFFNUJBLFNBQVNBLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUV0QkEsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDWEEsQ0FBQ0E7WUFFREEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsVUFBVUEsRUFBRUEsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7Z0JBQ3RDQSxjQUFjQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxFQUFFQSxDQUFDQTtnQkFDMURBLGNBQWNBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBO2dCQUMvQkEsY0FBY0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0E7Z0JBRS9CQSxZQUFZQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxFQUFFQSxDQUFDQTtnQkFDeERBLFlBQVlBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO2dCQUM1QkEsWUFBWUEsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0E7Z0JBRTdCQSxTQUFTQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFFdEJBLElBQUlBLElBQUlBLENBQUNBLENBQUNBO2dCQUVWQSxjQUFjQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQTtnQkFDMURBLGNBQWNBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBO2dCQUMvQkEsY0FBY0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7Z0JBRTlCQSxZQUFZQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQTtnQkFDeERBLFlBQVlBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO2dCQUM1QkEsWUFBWUEsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7Z0JBRTVCQSxTQUFTQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFFdEJBLElBQUlBLElBQUlBLENBQUNBLENBQUNBO1lBQ1hBLENBQUNBO1lBR0RBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLFVBQVVBLEVBQUVBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBO2dCQUN0Q0EsY0FBY0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0E7Z0JBQzNCQSxjQUFjQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxHQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxFQUFFQSxDQUFDQTtnQkFDL0RBLGNBQWNBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBO2dCQUUvQkEsWUFBWUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0E7Z0JBQ3pCQSxZQUFZQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxHQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxFQUFFQSxDQUFBQTtnQkFDNURBLFlBQVlBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO2dCQUU1QkEsU0FBU0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBRXRCQSxJQUFJQSxJQUFJQSxDQUFDQSxDQUFDQTtnQkFFVkEsY0FBY0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7Z0JBQzFCQSxjQUFjQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxHQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQTtnQkFDL0RBLGNBQWNBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBO2dCQUUvQkEsWUFBWUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7Z0JBQ3hCQSxZQUFZQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxHQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQTtnQkFDN0RBLFlBQVlBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO2dCQUU1QkEsU0FBU0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBRXRCQSxJQUFJQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUNYQSxDQUFDQTtZQUVEQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxVQUFVQSxFQUFFQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQTtnQkFDdENBLGNBQWNBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLEVBQUVBLENBQUFBO2dCQUN6QkEsY0FBY0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0E7Z0JBQy9CQSxjQUFjQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxFQUFFQSxDQUFDQTtnQkFFOURBLFlBQVlBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO2dCQUN4QkEsWUFBWUEsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7Z0JBQzVCQSxZQUFZQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxFQUFFQSxDQUFDQTtnQkFFNURBLFNBQVNBLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUV0QkEsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7Z0JBRVZBLGNBQWNBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBO2dCQUMzQkEsY0FBY0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0E7Z0JBQy9CQSxjQUFjQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQTtnQkFFOURBLFlBQVlBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBO2dCQUN6QkEsWUFBWUEsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7Z0JBQzVCQSxZQUFZQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQTtnQkFFNURBLFNBQVNBLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUV0QkEsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDWEEsQ0FBQ0E7WUFJREEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsVUFBVUEsRUFBRUEsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7Z0JBQ3RDQSxjQUFjQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQTtnQkFDM0JBLGNBQWNBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBO2dCQUMvQkEsY0FBY0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0E7Z0JBRTlEQSxZQUFZQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTtnQkFDeEJBLFlBQVlBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBO2dCQUM3QkEsWUFBWUEsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0E7Z0JBRTVEQSxTQUFTQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFFdEJBLElBQUlBLElBQUlBLENBQUNBLENBQUNBO2dCQUVWQSxjQUFjQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQTtnQkFDM0JBLGNBQWNBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO2dCQUM5QkEsY0FBY0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsRUFBRUEsQ0FBQ0E7Z0JBRTlEQSxZQUFZQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTtnQkFDeEJBLFlBQVlBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO2dCQUM1QkEsWUFBWUEsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsRUFBRUEsQ0FBQ0E7Z0JBRTVEQSxTQUFTQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFFdEJBLElBQUlBLElBQUlBLENBQUNBLENBQUNBO1lBQ1hBLENBQUNBO1lBRURBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLFVBQVVBLEVBQUVBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBO2dCQUN0Q0EsY0FBY0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0E7Z0JBQzFEQSxjQUFjQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQTtnQkFDL0JBLGNBQWNBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBO2dCQUUvQkEsWUFBWUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0E7Z0JBQ3hEQSxZQUFZQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQTtnQkFDN0JBLFlBQVlBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO2dCQUU1QkEsU0FBU0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBRXRCQSxJQUFJQSxJQUFJQSxDQUFDQSxDQUFDQTtnQkFFVkEsY0FBY0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsRUFBRUEsQ0FBQ0E7Z0JBQzFEQSxjQUFjQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTtnQkFDOUJBLGNBQWNBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBO2dCQUUvQkEsWUFBWUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsRUFBRUEsQ0FBQ0E7Z0JBQ3hEQSxZQUFZQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTtnQkFDNUJBLFlBQVlBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO2dCQUU1QkEsU0FBU0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBRXRCQSxJQUFJQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUNYQSxDQUFDQTtZQUVEQSxBQUNBQSxnQ0FEZ0NBO1lBQ2hDQSxZQUFZQSxDQUFDQSxlQUFlQSxDQUFDQSxjQUFjQSxFQUFFQSxZQUFZQSxDQUFDQSxDQUFDQTtZQUMzREEsWUFBWUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0E7UUFDekNBLENBQUNBO0lBQ0ZBLENBQUNBO0lBRURUOztPQUVHQTtJQUNJQSx3Q0FBVUEsR0FBakJBLFVBQWtCQSxNQUFzQkEsRUFBRUEsWUFBbUJBO1FBRTVEVSxJQUFJQSxDQUFRQSxFQUFFQSxDQUFRQSxFQUFFQSxLQUFZQSxDQUFDQTtRQUNyQ0EsSUFBSUEsR0FBaUJBLENBQUNBO1FBRXRCQSxJQUFJQSxVQUFpQkEsRUFBRUEsVUFBaUJBLENBQUNBO1FBQ3pDQSxJQUFJQSxXQUFrQkEsRUFBRUEsV0FBa0JBLENBQUNBO1FBQzNDQSxJQUFJQSxJQUFXQSxFQUFFQSxJQUFXQSxDQUFDQTtRQUM3QkEsSUFBSUEsSUFBV0EsRUFBRUEsSUFBV0EsQ0FBQ0E7UUFDN0JBLElBQUlBLEVBQVNBLEVBQUVBLEVBQVNBLENBQUNBO1FBQ3pCQSxJQUFJQSxXQUFrQkEsQ0FBQ0E7UUFFdkJBLEVBQUVBLENBQUNBLENBQUNBLFlBQVlBLElBQUlBLHFCQUFxQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFFM0NBLFdBQVdBLEdBQUdBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBO1lBRTFKQSxJQUFJQSxnQkFBZ0JBLEdBQTZDQSxNQUFNQSxDQUFDQTtZQUV4RUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsV0FBV0EsSUFBSUEsZ0JBQWdCQSxDQUFDQSxXQUFXQSxJQUFJQSxnQkFBZ0JBLENBQUNBLEdBQUdBLElBQUlBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO2dCQUNqRkEsR0FBR0EsR0FBR0EsZ0JBQWdCQSxDQUFDQSxHQUFHQSxDQUFDQTtZQUM1QkEsQ0FBQ0E7WUFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ1BBLEdBQUdBLEdBQUdBLElBQUlBLEtBQUtBLENBQVNBLFdBQVdBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ3hDQSxDQUFDQTtZQUVEQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDakJBLFVBQVVBLEdBQUdBLFdBQVdBLEdBQUdBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBO2dCQUMvQkEsVUFBVUEsR0FBR0EsV0FBV0EsR0FBR0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDaENBLENBQUNBO1lBQUNBLElBQUlBLENBQUNBLENBQUNBO2dCQUNQQSxVQUFVQSxHQUFHQSxVQUFVQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFDNUJBLFdBQVdBLEdBQUdBLFdBQVdBLEdBQUdBLENBQUNBLENBQUNBO1lBQy9CQSxDQUFDQTtZQUVEQSxBQVlBQSx5REFaeURBO1lBQ3pEQSwrREFBK0RBO1lBQy9EQSw0REFBNERBO1lBQzVEQSwyREFBMkRBO1lBRTNEQSxnREFBZ0RBO1lBQ2hEQSxrQ0FBa0NBO1lBQ2xDQSw0QkFBNEJBO1lBQzVCQSw0QkFBNEJBO1lBQzVCQSw0QkFBNEJBO1lBQzVCQSwyQkFBMkJBO1lBRTNCQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUVWQSxBQUNBQSxlQURlQTtZQUNmQSxJQUFJQSxHQUFHQSxDQUFDQSxHQUFDQSxXQUFXQSxDQUFDQTtZQUNyQkEsSUFBSUEsR0FBR0EsQ0FBQ0EsR0FBQ0EsV0FBV0EsQ0FBQ0E7WUFDckJBLElBQUlBLEdBQUdBLENBQUNBLEdBQUNBLFdBQVdBLENBQUNBO1lBQ3JCQSxJQUFJQSxHQUFHQSxDQUFDQSxHQUFDQSxXQUFXQSxDQUFDQTtZQUNyQkEsRUFBRUEsR0FBR0EsVUFBVUEsR0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0E7WUFDaENBLEVBQUVBLEdBQUdBLFVBQVVBLEdBQUNBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBO1lBQ2hDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxVQUFVQSxFQUFFQSxDQUFDQSxFQUFFQSxFQUFFQSxDQUFDQTtnQkFDdkNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLFVBQVVBLEVBQUVBLENBQUNBLEVBQUVBLEVBQUVBLENBQUNBO29CQUN2Q0EsR0FBR0EsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBRUEsSUFBSUEsR0FBR0EsQ0FBQ0EsR0FBQ0EsRUFBRUEsQ0FBRUEsR0FBQ0EsZ0JBQWdCQSxDQUFDQSxNQUFNQSxDQUFDQTtvQkFDdkRBLEdBQUdBLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBLEdBQUdBLENBQUVBLElBQUlBLEdBQUdBLENBQUNBLFVBQVVBLEdBQUdBLENBQUNBLEdBQUNBLEVBQUVBLENBQUNBLENBQUNBLEdBQUNBLGdCQUFnQkEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7b0JBRXJFQSxHQUFHQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFFQSxJQUFJQSxHQUFHQSxDQUFDQSxVQUFVQSxHQUFHQSxDQUFDQSxHQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxHQUFDQSxnQkFBZ0JBLENBQUNBLE1BQU1BLENBQUNBO29CQUNyRUEsR0FBR0EsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBRUEsSUFBSUEsR0FBR0EsQ0FBQ0EsVUFBVUEsR0FBR0EsQ0FBQ0EsR0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsZ0JBQWdCQSxDQUFDQSxNQUFNQSxDQUFDQTtnQkFDdEVBLENBQUNBO1lBQ0ZBLENBQUNBO1lBRURBLEFBQ0FBLGVBRGVBO1lBQ2ZBLElBQUlBLEdBQUdBLENBQUNBLEdBQUNBLFdBQVdBLENBQUNBO1lBQ3JCQSxJQUFJQSxHQUFHQSxDQUFDQSxHQUFDQSxXQUFXQSxDQUFDQTtZQUNyQkEsSUFBSUEsR0FBR0EsQ0FBQ0EsR0FBQ0EsV0FBV0EsQ0FBQ0E7WUFDckJBLElBQUlBLEdBQUdBLENBQUNBLEdBQUNBLFdBQVdBLENBQUNBO1lBQ3JCQSxFQUFFQSxHQUFHQSxVQUFVQSxHQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQTtZQUNoQ0EsRUFBRUEsR0FBR0EsVUFBVUEsR0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0E7WUFDaENBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLFVBQVVBLEVBQUVBLENBQUNBLEVBQUVBLEVBQUVBLENBQUNBO2dCQUN2Q0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsVUFBVUEsRUFBRUEsQ0FBQ0EsRUFBRUEsRUFBRUEsQ0FBQ0E7b0JBQ3ZDQSxHQUFHQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFFQSxJQUFJQSxHQUFHQSxDQUFDQSxHQUFDQSxFQUFFQSxDQUFDQSxHQUFDQSxnQkFBZ0JBLENBQUNBLE1BQU1BLENBQUNBO29CQUN0REEsR0FBR0EsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBRUEsSUFBSUEsR0FBR0EsQ0FBQ0EsVUFBVUEsR0FBR0EsQ0FBQ0EsR0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsZ0JBQWdCQSxDQUFDQSxNQUFNQSxDQUFDQTtvQkFFckVBLEdBQUdBLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBLEdBQUdBLENBQUVBLElBQUlBLEdBQUdBLENBQUNBLEdBQUNBLEVBQUVBLENBQUNBLEdBQUNBLGdCQUFnQkEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7b0JBQ3REQSxHQUFHQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFFQSxJQUFJQSxHQUFHQSxDQUFDQSxHQUFDQSxFQUFFQSxDQUFDQSxHQUFDQSxnQkFBZ0JBLENBQUNBLE1BQU1BLENBQUNBO2dCQUN2REEsQ0FBQ0E7WUFDRkEsQ0FBQ0E7WUFFREEsQUFDQUEsZUFEZUE7WUFDZkEsSUFBSUEsR0FBR0EsQ0FBQ0EsR0FBQ0EsV0FBV0EsQ0FBQ0E7WUFDckJBLElBQUlBLEdBQUdBLENBQUNBLEdBQUNBLFdBQVdBLENBQUNBO1lBQ3JCQSxJQUFJQSxHQUFHQSxDQUFDQSxHQUFDQSxXQUFXQSxDQUFDQTtZQUNyQkEsSUFBSUEsR0FBR0EsQ0FBQ0EsR0FBQ0EsV0FBV0EsQ0FBQ0E7WUFDckJBLEVBQUVBLEdBQUdBLFVBQVVBLEdBQUNBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBO1lBQ2hDQSxFQUFFQSxHQUFHQSxVQUFVQSxHQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQTtZQUNoQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsVUFBVUEsRUFBRUEsQ0FBQ0EsRUFBRUEsRUFBRUEsQ0FBQ0E7Z0JBQ3ZDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxVQUFVQSxFQUFFQSxDQUFDQSxFQUFFQSxFQUFFQSxDQUFDQTtvQkFDdkNBLEdBQUdBLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBLEdBQUdBLENBQUVBLElBQUlBLEdBQUdBLENBQUNBLEdBQUNBLEVBQUVBLENBQUNBLEdBQUNBLGdCQUFnQkEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7b0JBQ3REQSxHQUFHQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFFQSxJQUFJQSxHQUFHQSxDQUFDQSxVQUFVQSxHQUFHQSxDQUFDQSxHQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxHQUFDQSxnQkFBZ0JBLENBQUNBLE1BQU1BLENBQUNBO29CQUVyRUEsR0FBR0EsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBRUEsSUFBSUEsR0FBR0EsQ0FBQ0EsVUFBVUEsR0FBR0EsQ0FBQ0EsR0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsZ0JBQWdCQSxDQUFDQSxNQUFNQSxDQUFDQTtvQkFDckVBLEdBQUdBLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBLEdBQUdBLENBQUVBLElBQUlBLEdBQUdBLENBQUNBLFVBQVVBLEdBQUdBLENBQUNBLEdBQUNBLEVBQUVBLENBQUNBLENBQUNBLEdBQUNBLGdCQUFnQkEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7Z0JBQ3RFQSxDQUFDQTtZQUNGQSxDQUFDQTtZQUVEQSxnQkFBZ0JBLENBQUNBLFNBQVNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1FBRWpDQSxDQUFDQTtRQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxZQUFZQSxJQUFJQSxpQkFBaUJBLENBQUNBLENBQUNBLENBQUNBO1FBRS9DQSxDQUFDQTtJQUNGQSxDQUFDQTtJQUNGViwwQkFBQ0E7QUFBREEsQ0FqcEJBLEFBaXBCQ0EsRUFqcEJpQyxtQkFBbUIsRUFpcEJwRDtBQUVELEFBQTZCLGlCQUFwQixtQkFBbUIsQ0FBQyIsImZpbGUiOiJwcmVmYWJzL1ByaW1pdGl2ZUN1YmVQcmVmYWIuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsi77u/aW1wb3J0IElBc3NldFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9JQXNzZXRcIik7XHJcblxyXG5pbXBvcnQgTGluZVN1Ykdlb21ldHJ5XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvTGluZVN1Ykdlb21ldHJ5XCIpO1xyXG5pbXBvcnQgU3ViR2VvbWV0cnlCYXNlXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvU3ViR2VvbWV0cnlCYXNlXCIpO1xyXG5pbXBvcnQgVHJpYW5nbGVTdWJHZW9tZXRyeVx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9UcmlhbmdsZVN1Ykdlb21ldHJ5XCIpO1xyXG5pbXBvcnQgUHJpbWl0aXZlUHJlZmFiQmFzZVx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcHJlZmFicy9QcmltaXRpdmVQcmVmYWJCYXNlXCIpO1xyXG5cclxuLyoqXHJcbiAqIEEgQ3ViZSBwcmltaXRpdmUgcHJlZmFiLlxyXG4gKi9cclxuY2xhc3MgUHJpbWl0aXZlQ3ViZVByZWZhYiBleHRlbmRzIFByaW1pdGl2ZVByZWZhYkJhc2UgaW1wbGVtZW50cyBJQXNzZXRcclxue1xyXG5cdHByaXZhdGUgX3dpZHRoOm51bWJlcjtcclxuXHRwcml2YXRlIF9oZWlnaHQ6bnVtYmVyO1xyXG5cdHByaXZhdGUgX2RlcHRoOm51bWJlcjtcclxuXHRwcml2YXRlIF90aWxlNjpib29sZWFuO1xyXG5cclxuXHRwcml2YXRlIF9zZWdtZW50c1c6bnVtYmVyO1xyXG5cdHByaXZhdGUgX3NlZ21lbnRzSDpudW1iZXI7XHJcblx0cHJpdmF0ZSBfc2VnbWVudHNEOm51bWJlcjtcclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhIG5ldyBDdWJlIG9iamVjdC5cclxuXHQgKiBAcGFyYW0gd2lkdGggVGhlIHNpemUgb2YgdGhlIGN1YmUgYWxvbmcgaXRzIFgtYXhpcy5cclxuXHQgKiBAcGFyYW0gaGVpZ2h0IFRoZSBzaXplIG9mIHRoZSBjdWJlIGFsb25nIGl0cyBZLWF4aXMuXHJcblx0ICogQHBhcmFtIGRlcHRoIFRoZSBzaXplIG9mIHRoZSBjdWJlIGFsb25nIGl0cyBaLWF4aXMuXHJcblx0ICogQHBhcmFtIHNlZ21lbnRzVyBUaGUgbnVtYmVyIG9mIHNlZ21lbnRzIHRoYXQgbWFrZSB1cCB0aGUgY3ViZSBhbG9uZyB0aGUgWC1heGlzLlxyXG5cdCAqIEBwYXJhbSBzZWdtZW50c0ggVGhlIG51bWJlciBvZiBzZWdtZW50cyB0aGF0IG1ha2UgdXAgdGhlIGN1YmUgYWxvbmcgdGhlIFktYXhpcy5cclxuXHQgKiBAcGFyYW0gc2VnbWVudHNEIFRoZSBudW1iZXIgb2Ygc2VnbWVudHMgdGhhdCBtYWtlIHVwIHRoZSBjdWJlIGFsb25nIHRoZSBaLWF4aXMuXHJcblx0ICogQHBhcmFtIHRpbGU2IFRoZSB0eXBlIG9mIHV2IG1hcHBpbmcgdG8gdXNlLiBXaGVuIHRydWUsIGEgdGV4dHVyZSB3aWxsIGJlIHN1YmRpdmlkZWQgaW4gYSAyeDMgZ3JpZCwgZWFjaCB1c2VkIGZvciBhIHNpbmdsZSBmYWNlLiBXaGVuIGZhbHNlLCB0aGUgZW50aXJlIGltYWdlIGlzIG1hcHBlZCBvbiBlYWNoIGZhY2UuXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3Iod2lkdGg6bnVtYmVyID0gMTAwLCBoZWlnaHQ6bnVtYmVyID0gMTAwLCBkZXB0aDpudW1iZXIgPSAxMDAsIHNlZ21lbnRzVzpudW1iZXIgPSAxLCBzZWdtZW50c0g6bnVtYmVyID0gMSwgc2VnbWVudHNEOm51bWJlciA9IDEsIHRpbGU2OmJvb2xlYW4gPSB0cnVlKVxyXG5cdHtcclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdFx0dGhpcy5fd2lkdGggPSB3aWR0aDtcclxuXHRcdHRoaXMuX2hlaWdodCA9IGhlaWdodDtcclxuXHRcdHRoaXMuX2RlcHRoID0gZGVwdGg7XHJcblx0XHR0aGlzLl9zZWdtZW50c1cgPSBzZWdtZW50c1c7XHJcblx0XHR0aGlzLl9zZWdtZW50c0ggPSBzZWdtZW50c0g7XHJcblx0XHR0aGlzLl9zZWdtZW50c0QgPSBzZWdtZW50c0Q7XHJcblx0XHR0aGlzLl90aWxlNiA9IHRpbGU2O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIHNpemUgb2YgdGhlIGN1YmUgYWxvbmcgaXRzIFgtYXhpcy5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHdpZHRoKCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3dpZHRoO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCB3aWR0aCh2YWx1ZTpudW1iZXIpXHJcblx0e1xyXG5cdFx0dGhpcy5fd2lkdGggPSB2YWx1ZTtcclxuXHJcblx0XHR0aGlzLl9wSW52YWxpZGF0ZUdlb21ldHJ5KCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgc2l6ZSBvZiB0aGUgY3ViZSBhbG9uZyBpdHMgWS1heGlzLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgaGVpZ2h0KCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2hlaWdodDtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgaGVpZ2h0KHZhbHVlOm51bWJlcilcclxuXHR7XHJcblx0XHR0aGlzLl9oZWlnaHQgPSB2YWx1ZTtcclxuXHJcblx0XHR0aGlzLl9wSW52YWxpZGF0ZUdlb21ldHJ5KCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgc2l6ZSBvZiB0aGUgY3ViZSBhbG9uZyBpdHMgWi1heGlzLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgZGVwdGgoKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fZGVwdGg7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IGRlcHRoKHZhbHVlOm51bWJlcilcclxuXHR7XHJcblx0XHR0aGlzLl9kZXB0aCA9IHZhbHVlO1xyXG5cclxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlR2VvbWV0cnkoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSB0eXBlIG9mIHV2IG1hcHBpbmcgdG8gdXNlLiBXaGVuIGZhbHNlLCB0aGUgZW50aXJlIGltYWdlIGlzIG1hcHBlZCBvbiBlYWNoIGZhY2UuXHJcblx0ICogV2hlbiB0cnVlLCBhIHRleHR1cmUgd2lsbCBiZSBzdWJkaXZpZGVkIGluIGEgM3gyIGdyaWQsIGVhY2ggdXNlZCBmb3IgYSBzaW5nbGUgZmFjZS5cclxuXHQgKiBSZWFkaW5nIHRoZSB0aWxlcyBmcm9tIGxlZnQgdG8gcmlnaHQsIHRvcCB0byBib3R0b20gdGhleSByZXByZXNlbnQgdGhlIGZhY2VzIG9mIHRoZVxyXG5cdCAqIGN1YmUgaW4gdGhlIGZvbGxvd2luZyBvcmRlcjogYm90dG9tLCB0b3AsIGJhY2ssIGxlZnQsIGZyb250LCByaWdodC4gVGhpcyBjcmVhdGVzXHJcblx0ICogc2V2ZXJhbCBzaGFyZWQgZWRnZXMgKGJldHdlZW4gdGhlIHRvcCwgZnJvbnQsIGxlZnQgYW5kIHJpZ2h0IGZhY2VzKSB3aGljaCBzaW1wbGlmaWVzXHJcblx0ICogdGV4dHVyZSBwYWludGluZy5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHRpbGU2KCk6Ym9vbGVhblxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl90aWxlNjtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgdGlsZTYodmFsdWU6Ym9vbGVhbilcclxuXHR7XHJcblx0XHR0aGlzLl90aWxlNiA9IHZhbHVlO1xyXG5cclxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlR2VvbWV0cnkoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBudW1iZXIgb2Ygc2VnbWVudHMgdGhhdCBtYWtlIHVwIHRoZSBjdWJlIGFsb25nIHRoZSBYLWF4aXMuIERlZmF1bHRzIHRvIDEuXHJcblx0ICovXHJcblx0cHVibGljIGdldCBzZWdtZW50c1coKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fc2VnbWVudHNXO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBzZWdtZW50c1codmFsdWU6bnVtYmVyKVxyXG5cdHtcclxuXHRcdHRoaXMuX3NlZ21lbnRzVyA9IHZhbHVlO1xyXG5cclxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlR2VvbWV0cnkoKTtcclxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlVVZzKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgbnVtYmVyIG9mIHNlZ21lbnRzIHRoYXQgbWFrZSB1cCB0aGUgY3ViZSBhbG9uZyB0aGUgWS1heGlzLiBEZWZhdWx0cyB0byAxLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgc2VnbWVudHNIKCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3NlZ21lbnRzSDtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgc2VnbWVudHNIKHZhbHVlOm51bWJlcilcclxuXHR7XHJcblx0XHR0aGlzLl9zZWdtZW50c0ggPSB2YWx1ZTtcclxuXHJcblx0XHR0aGlzLl9wSW52YWxpZGF0ZUdlb21ldHJ5KCk7XHJcblx0XHR0aGlzLl9wSW52YWxpZGF0ZVVWcygpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIG51bWJlciBvZiBzZWdtZW50cyB0aGF0IG1ha2UgdXAgdGhlIGN1YmUgYWxvbmcgdGhlIFotYXhpcy4gRGVmYXVsdHMgdG8gMS5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHNlZ21lbnRzRCgpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9zZWdtZW50c0Q7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHNlZ21lbnRzRCh2YWx1ZTpudW1iZXIpXHJcblx0e1xyXG5cdFx0dGhpcy5fc2VnbWVudHNEID0gdmFsdWU7XHJcblxyXG5cdFx0dGhpcy5fcEludmFsaWRhdGVHZW9tZXRyeSgpO1xyXG5cdFx0dGhpcy5fcEludmFsaWRhdGVVVnMoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBpbmhlcml0RG9jXHJcblx0ICovXHJcblx0cHVibGljIF9wQnVpbGRHZW9tZXRyeSh0YXJnZXQ6U3ViR2VvbWV0cnlCYXNlLCBnZW9tZXRyeVR5cGU6c3RyaW5nKVxyXG5cdHtcclxuXHRcdHZhciBpbmRpY2VzOkFycmF5PG51bWJlcj4gLyp1aW50Ki87XHJcblx0XHR2YXIgcG9zaXRpb25zOkFycmF5PG51bWJlcj47XHJcblx0XHR2YXIgbm9ybWFsczpBcnJheTxudW1iZXI+O1xyXG5cdFx0dmFyIHRhbmdlbnRzOkFycmF5PG51bWJlcj47XHJcblxyXG5cdFx0dmFyIHRsOm51bWJlciwgdHI6bnVtYmVyLCBibDpudW1iZXIsIGJyOm51bWJlcjtcclxuXHRcdHZhciBpOm51bWJlciwgajpudW1iZXIsIGluYzpudW1iZXIgPSAwO1xyXG5cclxuXHRcdHZhciB2aWR4Om51bWJlciwgZmlkeDpudW1iZXI7IC8vIGluZGljZXNcclxuXHRcdHZhciBodzpudW1iZXIsIGhoOm51bWJlciwgaGQ6bnVtYmVyOyAvLyBoYWx2ZXNcclxuXHRcdHZhciBkdzpudW1iZXIsIGRoOm51bWJlciwgZGQ6bnVtYmVyOyAvLyBkZWx0YXNcclxuXHJcblx0XHR2YXIgb3V0ZXJfcG9zOm51bWJlcjtcclxuXHRcdHZhciBudW1JbmRpY2VzOm51bWJlcjtcclxuXHRcdHZhciBudW1WZXJ0aWNlczpudW1iZXI7XHJcblxyXG5cdFx0Ly8gaGFsZiBjdWJlIGRpbWVuc2lvbnNcclxuXHRcdGh3ID0gdGhpcy5fd2lkdGgvMjtcclxuXHRcdGhoID0gdGhpcy5faGVpZ2h0LzI7XHJcblx0XHRoZCA9IHRoaXMuX2RlcHRoLzI7XHJcblxyXG5cdFx0aWYgKGdlb21ldHJ5VHlwZSA9PSBcInRyaWFuZ2xlU3ViR2VvbWV0cnlcIikge1xyXG5cclxuXHRcdFx0dmFyIHRyaWFuZ2xlR2VvbWV0cnk6VHJpYW5nbGVTdWJHZW9tZXRyeSA9IDxUcmlhbmdsZVN1Ykdlb21ldHJ5PiB0YXJnZXQ7XHJcblxyXG5cdFx0XHRudW1WZXJ0aWNlcyA9ICgodGhpcy5fc2VnbWVudHNXICsgMSkqKHRoaXMuX3NlZ21lbnRzSCArIDEpICsgKHRoaXMuX3NlZ21lbnRzVyArIDEpKih0aGlzLl9zZWdtZW50c0QgKyAxKSArICh0aGlzLl9zZWdtZW50c0ggKyAxKSoodGhpcy5fc2VnbWVudHNEICsgMSkpKjI7XHJcblxyXG5cdFx0XHRudW1JbmRpY2VzID0gKCh0aGlzLl9zZWdtZW50c1cqdGhpcy5fc2VnbWVudHNIICsgdGhpcy5fc2VnbWVudHNXKnRoaXMuX3NlZ21lbnRzRCArIHRoaXMuX3NlZ21lbnRzSCp0aGlzLl9zZWdtZW50c0QpKjEyKTtcclxuXHJcblx0XHRcdGlmIChudW1WZXJ0aWNlcyA9PSB0cmlhbmdsZUdlb21ldHJ5Lm51bVZlcnRpY2VzICYmIHRyaWFuZ2xlR2VvbWV0cnkuaW5kaWNlcyAhPSBudWxsKSB7XHJcblx0XHRcdFx0aW5kaWNlcyA9IHRyaWFuZ2xlR2VvbWV0cnkuaW5kaWNlcztcclxuXHRcdFx0XHRwb3NpdGlvbnMgPSB0cmlhbmdsZUdlb21ldHJ5LnBvc2l0aW9ucztcclxuXHRcdFx0XHRub3JtYWxzID0gdHJpYW5nbGVHZW9tZXRyeS52ZXJ0ZXhOb3JtYWxzO1xyXG5cdFx0XHRcdHRhbmdlbnRzID0gdHJpYW5nbGVHZW9tZXRyeS52ZXJ0ZXhUYW5nZW50cztcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRpbmRpY2VzID0gbmV3IEFycmF5PG51bWJlcj4obnVtSW5kaWNlcyk7XHJcblx0XHRcdFx0cG9zaXRpb25zID0gbmV3IEFycmF5PG51bWJlcj4obnVtVmVydGljZXMqMyk7XHJcblx0XHRcdFx0bm9ybWFscyA9IG5ldyBBcnJheTxudW1iZXI+KG51bVZlcnRpY2VzKjMpO1xyXG5cdFx0XHRcdHRhbmdlbnRzID0gbmV3IEFycmF5PG51bWJlcj4obnVtVmVydGljZXMqMyk7XHJcblxyXG5cdFx0XHRcdHRoaXMuX3BJbnZhbGlkYXRlVVZzKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZpZHggPSAwO1xyXG5cdFx0XHRmaWR4ID0gMDtcclxuXHJcblx0XHRcdC8vIFNlZ21lbnQgZGltZW5zaW9uc1xyXG5cdFx0XHRkdyA9IHRoaXMuX3dpZHRoL3RoaXMuX3NlZ21lbnRzVztcclxuXHRcdFx0ZGggPSB0aGlzLl9oZWlnaHQvdGhpcy5fc2VnbWVudHNIO1xyXG5cdFx0XHRkZCA9IHRoaXMuX2RlcHRoL3RoaXMuX3NlZ21lbnRzRDtcclxuXHJcblx0XHRcdGZvciAoaSA9IDA7IGkgPD0gdGhpcy5fc2VnbWVudHNXOyBpKyspIHtcclxuXHRcdFx0XHRvdXRlcl9wb3MgPSAtaHcgKyBpKmR3O1xyXG5cclxuXHRcdFx0XHRmb3IgKGogPSAwOyBqIDw9IHRoaXMuX3NlZ21lbnRzSDsgaisrKSB7XHJcblx0XHRcdFx0XHQvLyBmcm9udFxyXG5cdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHhdID0gb3V0ZXJfcG9zO1xyXG5cdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHggKyAxXSA9IC1oaCArIGoqZGg7XHJcblx0XHRcdFx0XHRwb3NpdGlvbnNbdmlkeCArIDJdID0gLWhkO1xyXG5cdFx0XHRcdFx0bm9ybWFsc1t2aWR4XSA9IDA7XHJcblx0XHRcdFx0XHRub3JtYWxzW3ZpZHggKyAxXSA9IDA7XHJcblx0XHRcdFx0XHRub3JtYWxzW3ZpZHggKyAyXSA9IC0xO1xyXG5cdFx0XHRcdFx0dGFuZ2VudHNbdmlkeF0gPSAxO1xyXG5cdFx0XHRcdFx0dGFuZ2VudHNbdmlkeCArIDFdID0gMDtcclxuXHRcdFx0XHRcdHRhbmdlbnRzW3ZpZHggKyAyXSA9IDA7XHJcblx0XHRcdFx0XHR2aWR4ICs9IDM7XHJcblxyXG5cdFx0XHRcdFx0Ly8gYmFja1xyXG5cdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHhdID0gb3V0ZXJfcG9zO1xyXG5cdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHggKyAxXSA9IC1oaCArIGoqZGg7XHJcblx0XHRcdFx0XHRwb3NpdGlvbnNbdmlkeCArIDJdID0gaGQ7XHJcblx0XHRcdFx0XHRub3JtYWxzW3ZpZHhdID0gMDtcclxuXHRcdFx0XHRcdG5vcm1hbHNbdmlkeCArIDFdID0gMDtcclxuXHRcdFx0XHRcdG5vcm1hbHNbdmlkeCArIDJdID0gMTtcclxuXHRcdFx0XHRcdHRhbmdlbnRzW3ZpZHhdID0gLTE7XHJcblx0XHRcdFx0XHR0YW5nZW50c1t2aWR4ICsgMV0gPSAwO1xyXG5cdFx0XHRcdFx0dGFuZ2VudHNbdmlkeCArIDJdID0gMDtcclxuXHRcdFx0XHRcdHZpZHggKz0gMztcclxuXHJcblx0XHRcdFx0XHRpZiAoaSAmJiBqKSB7XHJcblx0XHRcdFx0XHRcdHRsID0gMiooKGkgLSAxKSoodGhpcy5fc2VnbWVudHNIICsgMSkgKyAoaiAtIDEpKTtcclxuXHRcdFx0XHRcdFx0dHIgPSAyKihpKih0aGlzLl9zZWdtZW50c0ggKyAxKSArIChqIC0gMSkpO1xyXG5cdFx0XHRcdFx0XHRibCA9IHRsICsgMjtcclxuXHRcdFx0XHRcdFx0YnIgPSB0ciArIDI7XHJcblxyXG5cdFx0XHRcdFx0XHRpbmRpY2VzW2ZpZHgrK10gPSB0bDtcclxuXHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gYmw7XHJcblx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IGJyO1xyXG5cdFx0XHRcdFx0XHRpbmRpY2VzW2ZpZHgrK10gPSB0bDtcclxuXHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gYnI7XHJcblx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IHRyO1xyXG5cdFx0XHRcdFx0XHRpbmRpY2VzW2ZpZHgrK10gPSB0ciArIDE7XHJcblx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IGJyICsgMTtcclxuXHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gYmwgKyAxO1xyXG5cdFx0XHRcdFx0XHRpbmRpY2VzW2ZpZHgrK10gPSB0ciArIDE7XHJcblx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IGJsICsgMTtcclxuXHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gdGwgKyAxO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aW5jICs9IDIqKHRoaXMuX3NlZ21lbnRzVyArIDEpKih0aGlzLl9zZWdtZW50c0ggKyAxKTtcclxuXHJcblx0XHRcdGZvciAoaSA9IDA7IGkgPD0gdGhpcy5fc2VnbWVudHNXOyBpKyspIHtcclxuXHRcdFx0XHRvdXRlcl9wb3MgPSAtaHcgKyBpKmR3O1xyXG5cclxuXHRcdFx0XHRmb3IgKGogPSAwOyBqIDw9IHRoaXMuX3NlZ21lbnRzRDsgaisrKSB7XHJcblx0XHRcdFx0XHQvLyB0b3BcclxuXHRcdFx0XHRcdHBvc2l0aW9uc1t2aWR4XSA9IG91dGVyX3BvcztcclxuXHRcdFx0XHRcdHBvc2l0aW9uc1t2aWR4ICsgMV0gPSBoaDtcclxuXHRcdFx0XHRcdHBvc2l0aW9uc1t2aWR4ICsgMl0gPSAtaGQgKyBqKmRkO1xyXG5cdFx0XHRcdFx0bm9ybWFsc1t2aWR4XSA9IDA7XHJcblx0XHRcdFx0XHRub3JtYWxzW3ZpZHggKyAxXSA9IDE7XHJcblx0XHRcdFx0XHRub3JtYWxzW3ZpZHggKyAyXSA9IDA7XHJcblx0XHRcdFx0XHR0YW5nZW50c1t2aWR4XSA9IDE7XHJcblx0XHRcdFx0XHR0YW5nZW50c1t2aWR4ICsgMV0gPSAwO1xyXG5cdFx0XHRcdFx0dGFuZ2VudHNbdmlkeCArIDJdID0gMDtcclxuXHRcdFx0XHRcdHZpZHggKz0gMztcclxuXHJcblx0XHRcdFx0XHQvLyBib3R0b21cclxuXHRcdFx0XHRcdHBvc2l0aW9uc1t2aWR4XSA9IG91dGVyX3BvcztcclxuXHRcdFx0XHRcdHBvc2l0aW9uc1t2aWR4ICsgMV0gPSAtaGg7XHJcblx0XHRcdFx0XHRwb3NpdGlvbnNbdmlkeCArIDJdID0gLWhkICsgaipkZDtcclxuXHRcdFx0XHRcdG5vcm1hbHNbdmlkeF0gPSAwO1xyXG5cdFx0XHRcdFx0bm9ybWFsc1t2aWR4ICsgMV0gPSAtMTtcclxuXHRcdFx0XHRcdG5vcm1hbHNbdmlkeCArIDJdID0gMDtcclxuXHRcdFx0XHRcdHRhbmdlbnRzW3ZpZHhdID0gMTtcclxuXHRcdFx0XHRcdHRhbmdlbnRzW3ZpZHggKyAxXSA9IDA7XHJcblx0XHRcdFx0XHR0YW5nZW50c1t2aWR4ICsgMl0gPSAwO1xyXG5cdFx0XHRcdFx0dmlkeCArPSAzO1xyXG5cclxuXHRcdFx0XHRcdGlmIChpICYmIGopIHtcclxuXHRcdFx0XHRcdFx0dGwgPSBpbmMgKyAyKigoaSAtIDEpKih0aGlzLl9zZWdtZW50c0QgKyAxKSArIChqIC0gMSkpO1xyXG5cdFx0XHRcdFx0XHR0ciA9IGluYyArIDIqKGkqKHRoaXMuX3NlZ21lbnRzRCArIDEpICsgKGogLSAxKSk7XHJcblx0XHRcdFx0XHRcdGJsID0gdGwgKyAyO1xyXG5cdFx0XHRcdFx0XHRiciA9IHRyICsgMjtcclxuXHJcblx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IHRsO1xyXG5cdFx0XHRcdFx0XHRpbmRpY2VzW2ZpZHgrK10gPSBibDtcclxuXHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gYnI7XHJcblx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IHRsO1xyXG5cdFx0XHRcdFx0XHRpbmRpY2VzW2ZpZHgrK10gPSBicjtcclxuXHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gdHI7XHJcblx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IHRyICsgMTtcclxuXHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gYnIgKyAxO1xyXG5cdFx0XHRcdFx0XHRpbmRpY2VzW2ZpZHgrK10gPSBibCArIDE7XHJcblx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IHRyICsgMTtcclxuXHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gYmwgKyAxO1xyXG5cdFx0XHRcdFx0XHRpbmRpY2VzW2ZpZHgrK10gPSB0bCArIDE7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpbmMgKz0gMioodGhpcy5fc2VnbWVudHNXICsgMSkqKHRoaXMuX3NlZ21lbnRzRCArIDEpO1xyXG5cclxuXHRcdFx0Zm9yIChpID0gMDsgaSA8PSB0aGlzLl9zZWdtZW50c0Q7IGkrKykge1xyXG5cdFx0XHRcdG91dGVyX3BvcyA9IGhkIC0gaSpkZDtcclxuXHJcblx0XHRcdFx0Zm9yIChqID0gMDsgaiA8PSB0aGlzLl9zZWdtZW50c0g7IGorKykge1xyXG5cdFx0XHRcdFx0Ly8gbGVmdFxyXG5cdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHhdID0gLWh3O1xyXG5cdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHgrMV0gPSAtaGggKyBqKmRoO1xyXG5cdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHgrMl0gPSBvdXRlcl9wb3M7XHJcblx0XHRcdFx0XHRub3JtYWxzW3ZpZHhdID0gLTE7XHJcblx0XHRcdFx0XHRub3JtYWxzW3ZpZHgrMV0gPSAwO1xyXG5cdFx0XHRcdFx0bm9ybWFsc1t2aWR4KzJdID0gMDtcclxuXHRcdFx0XHRcdHRhbmdlbnRzW3ZpZHhdID0gMDtcclxuXHRcdFx0XHRcdHRhbmdlbnRzW3ZpZHgrMV0gPSAwO1xyXG5cdFx0XHRcdFx0dGFuZ2VudHNbdmlkeCsyXSA9IC0xO1xyXG5cdFx0XHRcdFx0dmlkeCArPSAzO1xyXG5cclxuXHRcdFx0XHRcdC8vIHJpZ2h0XHJcblx0XHRcdFx0XHRwb3NpdGlvbnNbdmlkeF0gPSBodztcclxuXHRcdFx0XHRcdHBvc2l0aW9uc1t2aWR4KzFdID0gLWhoICsgaipkaDtcclxuXHRcdFx0XHRcdHBvc2l0aW9uc1t2aWR4KzJdID0gb3V0ZXJfcG9zO1xyXG5cdFx0XHRcdFx0bm9ybWFsc1t2aWR4XSA9IDE7XHJcblx0XHRcdFx0XHRub3JtYWxzW3ZpZHgrMV0gPSAwO1xyXG5cdFx0XHRcdFx0bm9ybWFsc1t2aWR4KzJdID0gMDtcclxuXHRcdFx0XHRcdHRhbmdlbnRzW3ZpZHhdID0gMDtcclxuXHRcdFx0XHRcdHRhbmdlbnRzW3ZpZHgrMV0gPSAwO1xyXG5cdFx0XHRcdFx0dGFuZ2VudHNbdmlkeCsyXSA9IDE7XHJcblx0XHRcdFx0XHR2aWR4ICs9IDM7XHJcblxyXG5cdFx0XHRcdFx0aWYgKGkgJiYgaikge1xyXG5cdFx0XHRcdFx0XHR0bCA9IGluYyArIDIqKChpIC0gMSkqKHRoaXMuX3NlZ21lbnRzSCArIDEpICsgKGogLSAxKSk7XHJcblx0XHRcdFx0XHRcdHRyID0gaW5jICsgMiooaSoodGhpcy5fc2VnbWVudHNIICsgMSkgKyAoaiAtIDEpKTtcclxuXHRcdFx0XHRcdFx0YmwgPSB0bCArIDI7XHJcblx0XHRcdFx0XHRcdGJyID0gdHIgKyAyO1xyXG5cclxuXHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gdGw7XHJcblx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IGJsO1xyXG5cdFx0XHRcdFx0XHRpbmRpY2VzW2ZpZHgrK10gPSBicjtcclxuXHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gdGw7XHJcblx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IGJyO1xyXG5cdFx0XHRcdFx0XHRpbmRpY2VzW2ZpZHgrK10gPSB0cjtcclxuXHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gdHIgKyAxO1xyXG5cdFx0XHRcdFx0XHRpbmRpY2VzW2ZpZHgrK10gPSBiciArIDE7XHJcblx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IGJsICsgMTtcclxuXHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gdHIgKyAxO1xyXG5cdFx0XHRcdFx0XHRpbmRpY2VzW2ZpZHgrK10gPSBibCArIDE7XHJcblx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IHRsICsgMTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRyaWFuZ2xlR2VvbWV0cnkudXBkYXRlSW5kaWNlcyhpbmRpY2VzKTtcclxuXHJcblx0XHRcdHRyaWFuZ2xlR2VvbWV0cnkudXBkYXRlUG9zaXRpb25zKHBvc2l0aW9ucyk7XHJcblx0XHRcdHRyaWFuZ2xlR2VvbWV0cnkudXBkYXRlVmVydGV4Tm9ybWFscyhub3JtYWxzKTtcclxuXHRcdFx0dHJpYW5nbGVHZW9tZXRyeS51cGRhdGVWZXJ0ZXhUYW5nZW50cyh0YW5nZW50cyk7XHJcblxyXG5cdFx0fSBlbHNlIGlmIChnZW9tZXRyeVR5cGUgPT0gXCJsaW5lU3ViR2VvbWV0cnlcIikge1xyXG5cdFx0XHR2YXIgbGluZUdlb21ldHJ5OkxpbmVTdWJHZW9tZXRyeSA9IDxMaW5lU3ViR2VvbWV0cnk+IHRhcmdldDtcclxuXHJcblx0XHRcdHZhciBudW1TZWdtZW50czpudW1iZXIgPSB0aGlzLl9zZWdtZW50c0gqNCArICB0aGlzLl9zZWdtZW50c1cqNCArIHRoaXMuX3NlZ21lbnRzRCo0O1xyXG5cdFx0XHR2YXIgc3RhcnRQb3NpdGlvbnM6QXJyYXk8bnVtYmVyPjtcclxuXHRcdFx0dmFyIGVuZFBvc2l0aW9uczpBcnJheTxudW1iZXI+O1xyXG5cdFx0XHR2YXIgdGhpY2tuZXNzOkFycmF5PG51bWJlcj47XHJcblxyXG5cdFx0XHRpZiAobGluZUdlb21ldHJ5LmluZGljZXMgIT0gbnVsbCAmJiBudW1TZWdtZW50cyA9PSBsaW5lR2VvbWV0cnkubnVtU2VnbWVudHMpIHtcclxuXHRcdFx0XHRzdGFydFBvc2l0aW9ucyA9IGxpbmVHZW9tZXRyeS5zdGFydFBvc2l0aW9ucztcclxuXHRcdFx0XHRlbmRQb3NpdGlvbnMgPSBsaW5lR2VvbWV0cnkuZW5kUG9zaXRpb25zO1xyXG5cdFx0XHRcdHRoaWNrbmVzcyA9IGxpbmVHZW9tZXRyeS50aGlja25lc3M7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0c3RhcnRQb3NpdGlvbnMgPSBuZXcgQXJyYXk8bnVtYmVyPihudW1TZWdtZW50cyozKTtcclxuXHRcdFx0XHRlbmRQb3NpdGlvbnMgPSBuZXcgQXJyYXk8bnVtYmVyPihudW1TZWdtZW50cyozKTtcclxuXHRcdFx0XHR0aGlja25lc3MgPSBuZXcgQXJyYXk8bnVtYmVyPihudW1TZWdtZW50cyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZpZHggPSAwO1xyXG5cclxuXHRcdFx0ZmlkeCA9IDA7XHJcblxyXG5cdFx0XHQvL2Zyb250L2JhY2sgZmFjZVxyXG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgdGhpcy5fc2VnbWVudHNIOyArK2kpIHtcclxuXHRcdFx0XHRzdGFydFBvc2l0aW9uc1t2aWR4XSA9IC1odztcclxuXHRcdFx0XHRzdGFydFBvc2l0aW9uc1t2aWR4ICsgMV0gPSBpKnRoaXMuX2hlaWdodC90aGlzLl9zZWdtZW50c0ggLSBoaDtcclxuXHRcdFx0XHRzdGFydFBvc2l0aW9uc1t2aWR4ICsgMl0gPSAtaGQ7XHJcblxyXG5cdFx0XHRcdGVuZFBvc2l0aW9uc1t2aWR4XSA9IGh3O1xyXG5cdFx0XHRcdGVuZFBvc2l0aW9uc1t2aWR4ICsgMV0gPSBpKnRoaXMuX2hlaWdodC90aGlzLl9zZWdtZW50c0ggLSBoaFxyXG5cdFx0XHRcdGVuZFBvc2l0aW9uc1t2aWR4ICsgMl0gPSAtaGQ7XHJcblxyXG5cdFx0XHRcdHRoaWNrbmVzc1tmaWR4KytdID0gMTtcclxuXHJcblx0XHRcdFx0dmlkeCArPSAzO1xyXG5cclxuXHRcdFx0XHRzdGFydFBvc2l0aW9uc1t2aWR4XSA9IC1odztcclxuXHRcdFx0XHRzdGFydFBvc2l0aW9uc1t2aWR4ICsgMV0gPSBoaCAtIGkqdGhpcy5faGVpZ2h0L3RoaXMuX3NlZ21lbnRzSDtcclxuXHRcdFx0XHRzdGFydFBvc2l0aW9uc1t2aWR4ICsgMl0gPSBoZDtcclxuXHJcblx0XHRcdFx0ZW5kUG9zaXRpb25zW3ZpZHhdID0gaHc7XHJcblx0XHRcdFx0ZW5kUG9zaXRpb25zW3ZpZHggKyAxXSA9IGhoIC0gaSp0aGlzLl9oZWlnaHQvdGhpcy5fc2VnbWVudHNIO1xyXG5cdFx0XHRcdGVuZFBvc2l0aW9uc1t2aWR4ICsgMl0gPSBoZDtcclxuXHJcblx0XHRcdFx0dGhpY2tuZXNzW2ZpZHgrK10gPSAxO1xyXG5cclxuXHRcdFx0XHR2aWR4ICs9IDM7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGZvciAoaSA9IDA7IGkgPCB0aGlzLl9zZWdtZW50c1c7ICsraSkge1xyXG5cdFx0XHRcdHN0YXJ0UG9zaXRpb25zW3ZpZHhdID0gaSp0aGlzLl93aWR0aC90aGlzLl9zZWdtZW50c1cgLSBodztcclxuXHRcdFx0XHRzdGFydFBvc2l0aW9uc1t2aWR4ICsgMV0gPSAtaGg7XHJcblx0XHRcdFx0c3RhcnRQb3NpdGlvbnNbdmlkeCArIDJdID0gLWhkO1xyXG5cclxuXHRcdFx0XHRlbmRQb3NpdGlvbnNbdmlkeF0gPSBpKnRoaXMuX3dpZHRoL3RoaXMuX3NlZ21lbnRzVyAtIGh3O1xyXG5cdFx0XHRcdGVuZFBvc2l0aW9uc1t2aWR4ICsgMV0gPSBoaDtcclxuXHRcdFx0XHRlbmRQb3NpdGlvbnNbdmlkeCArIDJdID0gLWhkO1xyXG5cclxuXHRcdFx0XHR0aGlja25lc3NbZmlkeCsrXSA9IDE7XHJcblxyXG5cdFx0XHRcdHZpZHggKz0gMztcclxuXHJcblx0XHRcdFx0c3RhcnRQb3NpdGlvbnNbdmlkeF0gPSBodyAtIGkqdGhpcy5fd2lkdGgvdGhpcy5fc2VnbWVudHNXO1xyXG5cdFx0XHRcdHN0YXJ0UG9zaXRpb25zW3ZpZHggKyAxXSA9IC1oaDtcclxuXHRcdFx0XHRzdGFydFBvc2l0aW9uc1t2aWR4ICsgMl0gPSBoZDtcclxuXHJcblx0XHRcdFx0ZW5kUG9zaXRpb25zW3ZpZHhdID0gaHcgLSBpKnRoaXMuX3dpZHRoL3RoaXMuX3NlZ21lbnRzVztcclxuXHRcdFx0XHRlbmRQb3NpdGlvbnNbdmlkeCArIDFdID0gaGg7XHJcblx0XHRcdFx0ZW5kUG9zaXRpb25zW3ZpZHggKyAyXSA9IGhkO1xyXG5cclxuXHRcdFx0XHR0aGlja25lc3NbZmlkeCsrXSA9IDE7XHJcblxyXG5cdFx0XHRcdHZpZHggKz0gMztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly9sZWZ0L3JpZ2h0IGZhY2VcclxuXHRcdFx0Zm9yIChpID0gMDsgaSA8IHRoaXMuX3NlZ21lbnRzSDsgKytpKSB7XHJcblx0XHRcdFx0c3RhcnRQb3NpdGlvbnNbdmlkeF0gPSAtaHc7XHJcblx0XHRcdFx0c3RhcnRQb3NpdGlvbnNbdmlkeCArIDFdID0gaSp0aGlzLl9oZWlnaHQvdGhpcy5fc2VnbWVudHNIIC0gaGg7XHJcblx0XHRcdFx0c3RhcnRQb3NpdGlvbnNbdmlkeCArIDJdID0gLWhkO1xyXG5cclxuXHRcdFx0XHRlbmRQb3NpdGlvbnNbdmlkeF0gPSAtaHc7XHJcblx0XHRcdFx0ZW5kUG9zaXRpb25zW3ZpZHggKyAxXSA9IGkqdGhpcy5faGVpZ2h0L3RoaXMuX3NlZ21lbnRzSCAtIGhoXHJcblx0XHRcdFx0ZW5kUG9zaXRpb25zW3ZpZHggKyAyXSA9IGhkO1xyXG5cclxuXHRcdFx0XHR0aGlja25lc3NbZmlkeCsrXSA9IDE7XHJcblxyXG5cdFx0XHRcdHZpZHggKz0gMztcclxuXHJcblx0XHRcdFx0c3RhcnRQb3NpdGlvbnNbdmlkeF0gPSBodztcclxuXHRcdFx0XHRzdGFydFBvc2l0aW9uc1t2aWR4ICsgMV0gPSBoaCAtIGkqdGhpcy5faGVpZ2h0L3RoaXMuX3NlZ21lbnRzSDtcclxuXHRcdFx0XHRzdGFydFBvc2l0aW9uc1t2aWR4ICsgMl0gPSAtaGQ7XHJcblxyXG5cdFx0XHRcdGVuZFBvc2l0aW9uc1t2aWR4XSA9IGh3O1xyXG5cdFx0XHRcdGVuZFBvc2l0aW9uc1t2aWR4ICsgMV0gPSBoaCAtIGkqdGhpcy5faGVpZ2h0L3RoaXMuX3NlZ21lbnRzSDtcclxuXHRcdFx0XHRlbmRQb3NpdGlvbnNbdmlkeCArIDJdID0gaGQ7XHJcblxyXG5cdFx0XHRcdHRoaWNrbmVzc1tmaWR4KytdID0gMTtcclxuXHJcblx0XHRcdFx0dmlkeCArPSAzO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgdGhpcy5fc2VnbWVudHNEOyArK2kpIHtcclxuXHRcdFx0XHRzdGFydFBvc2l0aW9uc1t2aWR4XSA9IGh3XHJcblx0XHRcdFx0c3RhcnRQb3NpdGlvbnNbdmlkeCArIDFdID0gLWhoO1xyXG5cdFx0XHRcdHN0YXJ0UG9zaXRpb25zW3ZpZHggKyAyXSA9IGkqdGhpcy5fZGVwdGgvdGhpcy5fc2VnbWVudHNEIC0gaGQ7XHJcblxyXG5cdFx0XHRcdGVuZFBvc2l0aW9uc1t2aWR4XSA9IGh3O1xyXG5cdFx0XHRcdGVuZFBvc2l0aW9uc1t2aWR4ICsgMV0gPSBoaDtcclxuXHRcdFx0XHRlbmRQb3NpdGlvbnNbdmlkeCArIDJdID0gaSp0aGlzLl9kZXB0aC90aGlzLl9zZWdtZW50c0QgLSBoZDtcclxuXHJcblx0XHRcdFx0dGhpY2tuZXNzW2ZpZHgrK10gPSAxO1xyXG5cclxuXHRcdFx0XHR2aWR4ICs9IDM7XHJcblxyXG5cdFx0XHRcdHN0YXJ0UG9zaXRpb25zW3ZpZHhdID0gLWh3O1xyXG5cdFx0XHRcdHN0YXJ0UG9zaXRpb25zW3ZpZHggKyAxXSA9IC1oaDtcclxuXHRcdFx0XHRzdGFydFBvc2l0aW9uc1t2aWR4ICsgMl0gPSBoZCAtIGkqdGhpcy5fZGVwdGgvdGhpcy5fc2VnbWVudHNEO1xyXG5cclxuXHRcdFx0XHRlbmRQb3NpdGlvbnNbdmlkeF0gPSAtaHc7XHJcblx0XHRcdFx0ZW5kUG9zaXRpb25zW3ZpZHggKyAxXSA9IGhoO1xyXG5cdFx0XHRcdGVuZFBvc2l0aW9uc1t2aWR4ICsgMl0gPSBoZCAtIGkqdGhpcy5fZGVwdGgvdGhpcy5fc2VnbWVudHNEO1xyXG5cclxuXHRcdFx0XHR0aGlja25lc3NbZmlkeCsrXSA9IDE7XHJcblxyXG5cdFx0XHRcdHZpZHggKz0gMztcclxuXHRcdFx0fVxyXG5cclxuXHJcblx0XHRcdC8vdG9wL2JvdHRvbSBmYWNlXHJcblx0XHRcdGZvciAoaSA9IDA7IGkgPCB0aGlzLl9zZWdtZW50c0Q7ICsraSkge1xyXG5cdFx0XHRcdHN0YXJ0UG9zaXRpb25zW3ZpZHhdID0gLWh3O1xyXG5cdFx0XHRcdHN0YXJ0UG9zaXRpb25zW3ZpZHggKyAxXSA9IC1oaDtcclxuXHRcdFx0XHRzdGFydFBvc2l0aW9uc1t2aWR4ICsgMl0gPSBoZCAtIGkqdGhpcy5fZGVwdGgvdGhpcy5fc2VnbWVudHNEO1xyXG5cclxuXHRcdFx0XHRlbmRQb3NpdGlvbnNbdmlkeF0gPSBodztcclxuXHRcdFx0XHRlbmRQb3NpdGlvbnNbdmlkeCArIDFdID0gLWhoO1xyXG5cdFx0XHRcdGVuZFBvc2l0aW9uc1t2aWR4ICsgMl0gPSBoZCAtIGkqdGhpcy5fZGVwdGgvdGhpcy5fc2VnbWVudHNEO1xyXG5cclxuXHRcdFx0XHR0aGlja25lc3NbZmlkeCsrXSA9IDE7XHJcblxyXG5cdFx0XHRcdHZpZHggKz0gMztcclxuXHJcblx0XHRcdFx0c3RhcnRQb3NpdGlvbnNbdmlkeF0gPSAtaHc7XHJcblx0XHRcdFx0c3RhcnRQb3NpdGlvbnNbdmlkeCArIDFdID0gaGg7XHJcblx0XHRcdFx0c3RhcnRQb3NpdGlvbnNbdmlkeCArIDJdID0gaSp0aGlzLl9kZXB0aC90aGlzLl9zZWdtZW50c0QgLSBoZDtcclxuXHJcblx0XHRcdFx0ZW5kUG9zaXRpb25zW3ZpZHhdID0gaHc7XHJcblx0XHRcdFx0ZW5kUG9zaXRpb25zW3ZpZHggKyAxXSA9IGhoO1xyXG5cdFx0XHRcdGVuZFBvc2l0aW9uc1t2aWR4ICsgMl0gPSBpKnRoaXMuX2RlcHRoL3RoaXMuX3NlZ21lbnRzRCAtIGhkO1xyXG5cclxuXHRcdFx0XHR0aGlja25lc3NbZmlkeCsrXSA9IDE7XHJcblxyXG5cdFx0XHRcdHZpZHggKz0gMztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Zm9yIChpID0gMDsgaSA8IHRoaXMuX3NlZ21lbnRzVzsgKytpKSB7XHJcblx0XHRcdFx0c3RhcnRQb3NpdGlvbnNbdmlkeF0gPSBodyAtIGkqdGhpcy5fd2lkdGgvdGhpcy5fc2VnbWVudHNXO1xyXG5cdFx0XHRcdHN0YXJ0UG9zaXRpb25zW3ZpZHggKyAxXSA9IC1oaDtcclxuXHRcdFx0XHRzdGFydFBvc2l0aW9uc1t2aWR4ICsgMl0gPSAtaGQ7XHJcblxyXG5cdFx0XHRcdGVuZFBvc2l0aW9uc1t2aWR4XSA9IGh3IC0gaSp0aGlzLl93aWR0aC90aGlzLl9zZWdtZW50c1c7XHJcblx0XHRcdFx0ZW5kUG9zaXRpb25zW3ZpZHggKyAxXSA9IC1oaDtcclxuXHRcdFx0XHRlbmRQb3NpdGlvbnNbdmlkeCArIDJdID0gaGQ7XHJcblxyXG5cdFx0XHRcdHRoaWNrbmVzc1tmaWR4KytdID0gMTtcclxuXHJcblx0XHRcdFx0dmlkeCArPSAzO1xyXG5cclxuXHRcdFx0XHRzdGFydFBvc2l0aW9uc1t2aWR4XSA9IGkqdGhpcy5fd2lkdGgvdGhpcy5fc2VnbWVudHNXIC0gaHc7XHJcblx0XHRcdFx0c3RhcnRQb3NpdGlvbnNbdmlkeCArIDFdID0gaGg7XHJcblx0XHRcdFx0c3RhcnRQb3NpdGlvbnNbdmlkeCArIDJdID0gLWhkO1xyXG5cclxuXHRcdFx0XHRlbmRQb3NpdGlvbnNbdmlkeF0gPSBpKnRoaXMuX3dpZHRoL3RoaXMuX3NlZ21lbnRzVyAtIGh3O1xyXG5cdFx0XHRcdGVuZFBvc2l0aW9uc1t2aWR4ICsgMV0gPSBoaDtcclxuXHRcdFx0XHRlbmRQb3NpdGlvbnNbdmlkeCArIDJdID0gaGQ7XHJcblxyXG5cdFx0XHRcdHRoaWNrbmVzc1tmaWR4KytdID0gMTtcclxuXHJcblx0XHRcdFx0dmlkeCArPSAzO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBidWlsZCByZWFsIGRhdGEgZnJvbSByYXcgZGF0YVxyXG5cdFx0XHRsaW5lR2VvbWV0cnkudXBkYXRlUG9zaXRpb25zKHN0YXJ0UG9zaXRpb25zLCBlbmRQb3NpdGlvbnMpO1xyXG5cdFx0XHRsaW5lR2VvbWV0cnkudXBkYXRlVGhpY2tuZXNzKHRoaWNrbmVzcyk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAaW5oZXJpdERvY1xyXG5cdCAqL1xyXG5cdHB1YmxpYyBfcEJ1aWxkVVZzKHRhcmdldDpTdWJHZW9tZXRyeUJhc2UsIGdlb21ldHJ5VHlwZTpzdHJpbmcpXHJcblx0e1xyXG5cdFx0dmFyIGk6bnVtYmVyLCBqOm51bWJlciwgaW5kZXg6bnVtYmVyO1xyXG5cdFx0dmFyIHV2czpBcnJheTxudW1iZXI+O1xyXG5cclxuXHRcdHZhciB1X3RpbGVfZGltOm51bWJlciwgdl90aWxlX2RpbTpudW1iZXI7XHJcblx0XHR2YXIgdV90aWxlX3N0ZXA6bnVtYmVyLCB2X3RpbGVfc3RlcDpudW1iZXI7XHJcblx0XHR2YXIgdGwwdTpudW1iZXIsIHRsMHY6bnVtYmVyO1xyXG5cdFx0dmFyIHRsMXU6bnVtYmVyLCB0bDF2Om51bWJlcjtcclxuXHRcdHZhciBkdTpudW1iZXIsIGR2Om51bWJlcjtcclxuXHRcdHZhciBudW1WZXJ0aWNlczpudW1iZXI7XHJcblxyXG5cdFx0aWYgKGdlb21ldHJ5VHlwZSA9PSBcInRyaWFuZ2xlU3ViR2VvbWV0cnlcIikge1xyXG5cclxuXHRcdFx0bnVtVmVydGljZXMgPSAoKHRoaXMuX3NlZ21lbnRzVyArIDEpKih0aGlzLl9zZWdtZW50c0ggKyAxKSArICh0aGlzLl9zZWdtZW50c1cgKyAxKSoodGhpcy5fc2VnbWVudHNEICsgMSkgKyAodGhpcy5fc2VnbWVudHNIICsgMSkqKHRoaXMuX3NlZ21lbnRzRCArIDEpKSoyO1xyXG5cclxuXHRcdFx0dmFyIHRyaWFuZ2xlR2VvbWV0cnk6VHJpYW5nbGVTdWJHZW9tZXRyeSA9IDxUcmlhbmdsZVN1Ykdlb21ldHJ5PiB0YXJnZXQ7XHJcblxyXG5cdFx0XHRpZiAobnVtVmVydGljZXMgPT0gdHJpYW5nbGVHZW9tZXRyeS5udW1WZXJ0aWNlcyAmJiB0cmlhbmdsZUdlb21ldHJ5LnV2cyAhPSBudWxsKSB7XHJcblx0XHRcdFx0dXZzID0gdHJpYW5nbGVHZW9tZXRyeS51dnM7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dXZzID0gbmV3IEFycmF5PG51bWJlcj4obnVtVmVydGljZXMqMik7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICh0aGlzLl90aWxlNikge1xyXG5cdFx0XHRcdHVfdGlsZV9kaW0gPSB1X3RpbGVfc3RlcCA9IDEvMztcclxuXHRcdFx0XHR2X3RpbGVfZGltID0gdl90aWxlX3N0ZXAgPSAxLzI7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dV90aWxlX2RpbSA9IHZfdGlsZV9kaW0gPSAxO1xyXG5cdFx0XHRcdHVfdGlsZV9zdGVwID0gdl90aWxlX3N0ZXAgPSAwO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBDcmVhdGUgcGxhbmVzIHR3byBhbmQgdHdvLCB0aGUgc2FtZSB3YXkgdGhhdCB0aGV5IHdlcmVcclxuXHRcdFx0Ly8gY29uc3RydWN0ZWQgaW4gdGhlIGJ1aWxkR2VvbWV0cnkoKSBmdW5jdGlvbi4gRmlyc3QgY2FsY3VsYXRlXHJcblx0XHRcdC8vIHRoZSB0b3AtbGVmdCBVViBjb29yZGluYXRlIGZvciBib3RoIHBsYW5lcywgYW5kIHRoZW4gbG9vcFxyXG5cdFx0XHQvLyBvdmVyIHRoZSBwb2ludHMsIGNhbGN1bGF0aW5nIHRoZSBVVnMgZnJvbSB0aGVzZSBudW1iZXJzLlxyXG5cclxuXHRcdFx0Ly8gV2hlbiB0aWxlNiBpcyB0cnVlLCB0aGUgbGF5b3V0IGlzIGFzIGZvbGxvd3M6XHJcblx0XHRcdC8vICAgICAgIC4tLS0tLS4tLS0tLS4tLS0tLS4gKDEsMSlcclxuXHRcdFx0Ly8gICAgICAgfCBCb3QgfCAgVCAgfCBCYWsgfFxyXG5cdFx0XHQvLyAgICAgICB8LS0tLS0rLS0tLS0rLS0tLS18XHJcblx0XHRcdC8vICAgICAgIHwgIEwgIHwgIEYgIHwgIFIgIHxcclxuXHRcdFx0Ly8gKDAsMCknLS0tLS0nLS0tLS0nLS0tLS0nXHJcblxyXG5cdFx0XHRpbmRleCA9IDA7XHJcblxyXG5cdFx0XHQvLyBGUk9OVCAvIEJBQ0tcclxuXHRcdFx0dGwwdSA9IDEqdV90aWxlX3N0ZXA7XHJcblx0XHRcdHRsMHYgPSAxKnZfdGlsZV9zdGVwO1xyXG5cdFx0XHR0bDF1ID0gMip1X3RpbGVfc3RlcDtcclxuXHRcdFx0dGwxdiA9IDAqdl90aWxlX3N0ZXA7XHJcblx0XHRcdGR1ID0gdV90aWxlX2RpbS90aGlzLl9zZWdtZW50c1c7XHJcblx0XHRcdGR2ID0gdl90aWxlX2RpbS90aGlzLl9zZWdtZW50c0g7XHJcblx0XHRcdGZvciAoaSA9IDA7IGkgPD0gdGhpcy5fc2VnbWVudHNXOyBpKyspIHtcclxuXHRcdFx0XHRmb3IgKGogPSAwOyBqIDw9IHRoaXMuX3NlZ21lbnRzSDsgaisrKSB7XHJcblx0XHRcdFx0XHR1dnNbaW5kZXgrK10gPSAoIHRsMHUgKyBpKmR1ICkqdHJpYW5nbGVHZW9tZXRyeS5zY2FsZVU7XHJcblx0XHRcdFx0XHR1dnNbaW5kZXgrK10gPSAoIHRsMHYgKyAodl90aWxlX2RpbSAtIGoqZHYpKSp0cmlhbmdsZUdlb21ldHJ5LnNjYWxlVjtcclxuXHJcblx0XHRcdFx0XHR1dnNbaW5kZXgrK10gPSAoIHRsMXUgKyAodV90aWxlX2RpbSAtIGkqZHUpKSp0cmlhbmdsZUdlb21ldHJ5LnNjYWxlVTtcclxuXHRcdFx0XHRcdHV2c1tpbmRleCsrXSA9ICggdGwxdiArICh2X3RpbGVfZGltIC0gaipkdikpKnRyaWFuZ2xlR2VvbWV0cnkuc2NhbGVWO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gVE9QIC8gQk9UVE9NXHJcblx0XHRcdHRsMHUgPSAxKnVfdGlsZV9zdGVwO1xyXG5cdFx0XHR0bDB2ID0gMCp2X3RpbGVfc3RlcDtcclxuXHRcdFx0dGwxdSA9IDAqdV90aWxlX3N0ZXA7XHJcblx0XHRcdHRsMXYgPSAwKnZfdGlsZV9zdGVwO1xyXG5cdFx0XHRkdSA9IHVfdGlsZV9kaW0vdGhpcy5fc2VnbWVudHNXO1xyXG5cdFx0XHRkdiA9IHZfdGlsZV9kaW0vdGhpcy5fc2VnbWVudHNEO1xyXG5cdFx0XHRmb3IgKGkgPSAwOyBpIDw9IHRoaXMuX3NlZ21lbnRzVzsgaSsrKSB7XHJcblx0XHRcdFx0Zm9yIChqID0gMDsgaiA8PSB0aGlzLl9zZWdtZW50c0Q7IGorKykge1xyXG5cdFx0XHRcdFx0dXZzW2luZGV4KytdID0gKCB0bDB1ICsgaSpkdSkqdHJpYW5nbGVHZW9tZXRyeS5zY2FsZVU7XHJcblx0XHRcdFx0XHR1dnNbaW5kZXgrK10gPSAoIHRsMHYgKyAodl90aWxlX2RpbSAtIGoqZHYpKSp0cmlhbmdsZUdlb21ldHJ5LnNjYWxlVjtcclxuXHJcblx0XHRcdFx0XHR1dnNbaW5kZXgrK10gPSAoIHRsMXUgKyBpKmR1KSp0cmlhbmdsZUdlb21ldHJ5LnNjYWxlVTtcclxuXHRcdFx0XHRcdHV2c1tpbmRleCsrXSA9ICggdGwxdiArIGoqZHYpKnRyaWFuZ2xlR2VvbWV0cnkuc2NhbGVWO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gTEVGVCAvIFJJR0hUXHJcblx0XHRcdHRsMHUgPSAwKnVfdGlsZV9zdGVwO1xyXG5cdFx0XHR0bDB2ID0gMSp2X3RpbGVfc3RlcDtcclxuXHRcdFx0dGwxdSA9IDIqdV90aWxlX3N0ZXA7XHJcblx0XHRcdHRsMXYgPSAxKnZfdGlsZV9zdGVwO1xyXG5cdFx0XHRkdSA9IHVfdGlsZV9kaW0vdGhpcy5fc2VnbWVudHNEO1xyXG5cdFx0XHRkdiA9IHZfdGlsZV9kaW0vdGhpcy5fc2VnbWVudHNIO1xyXG5cdFx0XHRmb3IgKGkgPSAwOyBpIDw9IHRoaXMuX3NlZ21lbnRzRDsgaSsrKSB7XHJcblx0XHRcdFx0Zm9yIChqID0gMDsgaiA8PSB0aGlzLl9zZWdtZW50c0g7IGorKykge1xyXG5cdFx0XHRcdFx0dXZzW2luZGV4KytdID0gKCB0bDB1ICsgaSpkdSkqdHJpYW5nbGVHZW9tZXRyeS5zY2FsZVU7XHJcblx0XHRcdFx0XHR1dnNbaW5kZXgrK10gPSAoIHRsMHYgKyAodl90aWxlX2RpbSAtIGoqZHYpKSp0cmlhbmdsZUdlb21ldHJ5LnNjYWxlVjtcclxuXHJcblx0XHRcdFx0XHR1dnNbaW5kZXgrK10gPSAoIHRsMXUgKyAodV90aWxlX2RpbSAtIGkqZHUpKSp0cmlhbmdsZUdlb21ldHJ5LnNjYWxlVTtcclxuXHRcdFx0XHRcdHV2c1tpbmRleCsrXSA9ICggdGwxdiArICh2X3RpbGVfZGltIC0gaipkdikpKnRyaWFuZ2xlR2VvbWV0cnkuc2NhbGVWO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dHJpYW5nbGVHZW9tZXRyeS51cGRhdGVVVnModXZzKTtcclxuXHJcblx0XHR9IGVsc2UgaWYgKGdlb21ldHJ5VHlwZSA9PSBcImxpbmVTdWJHZW9tZXRyeVwiKSB7XHJcblx0XHRcdC8vbm90aGluZyB0byBkbyBoZXJlXHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgPSBQcmltaXRpdmVDdWJlUHJlZmFiOyJdfQ==