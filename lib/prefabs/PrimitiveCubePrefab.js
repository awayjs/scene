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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9wcmVmYWJzL1ByaW1pdGl2ZUN1YmVQcmVmYWIudHMiXSwibmFtZXMiOlsiUHJpbWl0aXZlQ3ViZVByZWZhYiIsIlByaW1pdGl2ZUN1YmVQcmVmYWIuY29uc3RydWN0b3IiLCJQcmltaXRpdmVDdWJlUHJlZmFiLndpZHRoIiwiUHJpbWl0aXZlQ3ViZVByZWZhYi5oZWlnaHQiLCJQcmltaXRpdmVDdWJlUHJlZmFiLmRlcHRoIiwiUHJpbWl0aXZlQ3ViZVByZWZhYi50aWxlNiIsIlByaW1pdGl2ZUN1YmVQcmVmYWIuc2VnbWVudHNXIiwiUHJpbWl0aXZlQ3ViZVByZWZhYi5zZWdtZW50c0giLCJQcmltaXRpdmVDdWJlUHJlZmFiLnNlZ21lbnRzRCIsIlByaW1pdGl2ZUN1YmVQcmVmYWIuX3BCdWlsZEdlb21ldHJ5IiwiUHJpbWl0aXZlQ3ViZVByZWZhYi5fcEJ1aWxkVVZzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFLQSxJQUFPLG1CQUFtQixXQUFZLGdEQUFnRCxDQUFDLENBQUM7QUFFeEYsQUFHQTs7R0FERztJQUNHLG1CQUFtQjtJQUFTQSxVQUE1QkEsbUJBQW1CQSxVQUE0QkE7SUFXcERBOzs7Ozs7Ozs7T0FTR0E7SUFDSEEsU0FyQktBLG1CQUFtQkEsQ0FxQlpBLEtBQWtCQSxFQUFFQSxNQUFtQkEsRUFBRUEsS0FBa0JBLEVBQUVBLFNBQW9CQSxFQUFFQSxTQUFvQkEsRUFBRUEsU0FBb0JBLEVBQUVBLEtBQW9CQTtRQUFuSkMscUJBQWtCQSxHQUFsQkEsV0FBa0JBO1FBQUVBLHNCQUFtQkEsR0FBbkJBLFlBQW1CQTtRQUFFQSxxQkFBa0JBLEdBQWxCQSxXQUFrQkE7UUFBRUEseUJBQW9CQSxHQUFwQkEsYUFBb0JBO1FBQUVBLHlCQUFvQkEsR0FBcEJBLGFBQW9CQTtRQUFFQSx5QkFBb0JBLEdBQXBCQSxhQUFvQkE7UUFBRUEscUJBQW9CQSxHQUFwQkEsWUFBb0JBO1FBRTlKQSxpQkFBT0EsQ0FBQ0E7UUFFUkEsSUFBSUEs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dkNBLEFBQ0FBLFFBRFFBO29CQUNSQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxTQUFTQSxDQUFDQTtvQkFDNUJBLFNBQVNBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLEdBQUdBLENBQUNBLEdBQUNBLEVBQUVBLENBQUNBO29CQUNqQ0EsU0FBU0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0E7b0JBQzFCQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFDbEJBLE9BQU9BLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO29CQUN0QkEsT0FBT0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ3ZCQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFDbkJBLFFBQVFBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO29CQUN2QkEsUUFBUUEsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBQ3ZCQSxJQUFJQSxJQUFJQSxDQUFDQSxDQUFDQTtvQkFFVkEsQUFDQUEsT0FET0E7b0JBQ1BBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLFNBQVNBLENBQUNBO29CQUM1QkEsU0FBU0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsR0FBR0EsQ0FBQ0EsR0FBQ0EsRUFBRUEsQ0FBQ0E7b0JBQ2pDQSxTQUFTQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTtvQkFDekJBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO29CQUNsQkEsT0FBT0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBQ3RCQSxPQUFPQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFDdEJBLFFBQVFBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO29CQUNwQkEsUUFBUUEsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBQ3ZCQSxRQUFRQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFDdkJBLElBQUlBLElBQUlBLENBQUNBLENBQUNBO29CQUVWQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDWkEsRUFBRUEsR0FBR0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQ2pEQSxFQUFFQSxHQUFHQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDM0NBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBO3dCQUNaQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQTt3QkFFWkEsT0FBT0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7d0JBQ3JCQSxPQUFPQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTt3QkFDckJBLE9BQU9BLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO3dCQUNyQkEsT0FBT0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7d0JBQ3JCQSxPQUFPQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTt3QkFDckJBLE9BQU9BLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO3dCQUNyQkEsT0FBT0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0E7d0JBQ3pCQSxPQUFPQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQTt3QkFDekJBLE9BQU9BLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBO3dCQUN6QkEsT0FBT0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0E7d0JBQ3pCQSxPQUFPQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQTt3QkFDekJBLE9BQU9BLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBO29CQUMxQkEsQ0FBQ0E7Z0JBQ0ZBLENBQUNBO1lBQ0ZBLENBQUNBO1lBRURBLEdBQUdBLElBQUlBLENBQUNBLEdBQUNBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO1lBRXJEQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxVQUFVQSxFQUFFQSxDQUFDQSxFQUFFQSxFQUFFQSxDQUFDQTtnQkFDdkNBLFNBQVNBLEdBQUdBLENBQUNBLEVBQUVBLEdBQUdBLENBQUNBLEdBQUNBLEVBQUVBLENBQUNBO2dCQUV2QkEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsVUFBVUEsRUFBRUEsQ0FBQ0EsRUFBRUEsRUFBRUEsQ0FBQ0E7b0JBQ3ZDQSxBQUNBQSxNQURNQTtvQkFDTkEsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsU0FBU0EsQ0FBQ0E7b0JBQzVCQSxTQUFTQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTtvQkFDekJBLFNBQVNBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLEdBQUdBLENBQUNBLEdBQUNBLEVBQUVBLENBQUNBO29CQUNqQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBQ2xCQSxPQUFPQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFDdEJBLE9BQU9BLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO29CQUN0QkEsUUFBUUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBQ25CQSxRQUFRQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFDdkJBLFFBQVFBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO29CQUN2QkEsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7b0JBRVZBLEFBQ0FBLFNBRFNBO29CQUNUQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxTQUFTQSxDQUFDQTtvQkFDNUJBLFNBQVNBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBO29CQUMxQkEsU0FBU0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsR0FBR0EsQ0FBQ0EsR0FBQ0EsRUFBRUEsQ0FBQ0E7b0JBQ2pDQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFDbEJBLE9BQU9BLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO29CQUN2QkEsT0FBT0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBQ3RCQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFDbkJBLFFBQVFBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO29CQUN2QkEsUUFBUUEsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBQ3ZCQSxJQUFJQSxJQUFJQSxDQUFDQSxDQUFDQTtvQkFFVkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQ1pBLEVBQUVBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO3dCQUN2REEsRUFBRUEsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQ2pEQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQTt3QkFDWkEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0E7d0JBRVpBLE9BQU9BLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO3dCQUNyQkEsT0FBT0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7d0JBQ3JCQSxPQUFPQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTt3QkFDckJBLE9BQU9BLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO3dCQUNyQkEsT0FBT0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7d0JBQ3JCQSxPQUFPQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTt3QkFDckJBLE9BQU9BLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBO3dCQUN6QkEsT0FBT0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0E7d0JBQ3pCQSxPQUFPQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQTt3QkFDekJBLE9BQU9BLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBO3dCQUN6QkEsT0FBT0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0E7d0JBQ3pCQSxPQUFPQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFDMUJBLENBQUNBO2dCQUNGQSxDQUFDQTtZQUNGQSxDQUFDQTtZQUVEQSxHQUFHQSxJQUFJQSxDQUFDQSxHQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUVyREEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsVUFBVUEsRUFBRUEsQ0FBQ0EsRUFBRUEsRUFBRUEsQ0FBQ0E7Z0JBQ3ZDQSxTQUFTQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQSxHQUFDQSxFQUFFQSxDQUFDQTtnQkFFdEJBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLFVBQVVBLEVBQUVBLENBQUNBLEVBQUVBLEVBQUVBLENBQUNBO29CQUN2Q0EsQUFDQUEsT0FET0E7b0JBQ1BBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBO29CQUN0QkEsU0FBU0EsQ0FBQ0EsSUFBSUEsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsR0FBR0EsQ0FBQ0EsR0FBQ0EsRUFBRUEsQ0FBQ0E7b0JBQy9CQSxTQUFTQSxDQUFDQSxJQUFJQSxHQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxTQUFTQSxDQUFDQTtvQkFDOUJBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO29CQUNuQkEsT0FBT0EsQ0FBQ0EsSUFBSUEsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBQ3BCQSxPQUFPQSxDQUFDQSxJQUFJQSxHQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFDcEJBLFFBQVFBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO29CQUNuQkEsUUFBUUEsQ0FBQ0EsSUFBSUEsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBQ3JCQSxRQUFRQSxDQUFDQSxJQUFJQSxHQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDdEJBLElBQUlBLElBQUlBLENBQUNBLENBQUNBO29CQUVWQSxBQUNBQSxRQURRQTtvQkFDUkEsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7b0JBQ3JCQSxTQUFTQSxDQUFDQSxJQUFJQSxHQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxHQUFHQSxDQUFDQSxHQUFDQSxFQUFFQSxDQUFDQTtvQkFDL0JBLFNBQVNBLENBQUNBLElBQUlBLEdBQUNBLENBQUNBLENBQUNBLEdBQUdBLFNBQVNBLENBQUNBO29CQUM5QkEsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBQ2xCQSxPQUFPQSxDQUFDQSxJQUFJQSxHQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFDcEJBLE9BQU9BLENBQUNBLElBQUlBLEdBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO29CQUNwQkEsUUFBUUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBQ25CQSxRQUFRQSxDQUFDQSxJQUFJQSxHQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFDckJBLFFBQVFBLENBQUNBLElBQUlBLEdBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO29CQUNyQkEsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7b0JBRVZBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO3dCQUNaQSxFQUFFQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDdkRBLEVBQUVBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO3dCQUNqREEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0E7d0JBQ1pBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBO3dCQUVaQSxPQUFPQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTt3QkFDckJBLE9BQU9BLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO3dCQUNyQkEsT0FBT0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7d0JBQ3JCQSxPQUFPQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTt3QkFDckJBLE9BQU9BLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO3dCQUNyQkEsT0FBT0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7d0JBQ3JCQSxPQUFPQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQTt3QkFDekJBLE9BQU9BLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBO3dCQUN6QkEsT0FBT0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0E7d0JBQ3pCQSxPQUFPQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQTt3QkFDekJBLE9BQU9BLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNB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LFNBQVNBLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUV0QkEsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7Z0JBRVZBLGNBQWNBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBO2dCQUMzQkEsY0FBY0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0E7Z0JBQy9EQSxjQUFjQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTtnQkFFOUJBLFlBQVlBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO2dCQUN4QkEsWUFBWUEsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0E7Z0JBQzdEQSxZQUFZQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTtnQkFFNUJBLFNBQVNBLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUV0QkEsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDWEEsQ0FBQ0E7WUFFREEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsVUFBVUEsRUFBRUEsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7Z0JBQ3RDQSxjQUFjQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxFQUFFQSxDQUFDQTtnQkFDMURBLGNBQWNBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBO2dCQUMvQkEsY0FBY0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0E7Z0JBRS9CQSxZQUFZQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxFQUFFQSxDQUFDQTtnQkFDeERBLFlBQVlBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO2dCQUM1QkEsWUFBWUEsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0E7Z0JBRTdCQSxTQUFTQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFFdEJBLElBQUlBLElBQUlBLENBQUNBLENBQUNBO2dCQUVWQSxjQUFjQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQTtnQkFDMURBLGNBQWNBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBO2dCQUMvQkEsY0FBY0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7Z0JBRTlCQSxZQUFZQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQTtnQkFDeERBLFlBQVlBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO2dCQUM1QkEsWUFBWUEsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7Z0JBRTVCQSxTQUFTQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFFdEJBLElBQUlBLElBQUlBLENBQUNBLENBQUNBO1lBQ1hBLENBQUNBO1lBR0RBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLFVBQVVBLEVBQUVBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBO2dCQUN0Q0EsY0FBY0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0E7Z0JBQzNCQSxjQUFjQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxHQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxFQUFFQSxDQUFDQTtnQkFDL0RBLGNBQWNBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBO2dCQUUvQkEsWUFBWUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0E7Z0JBQ3pCQSxZQUFZQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxHQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxFQUFFQSxDQUFBQTtnQkFDNURBLFlBQVlBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO2dCQUU1QkEsU0FBU0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBRXRCQSxJQUFJQSxJQUFJQSxDQUFDQSxDQUFDQTtnQkFFVkEsY0FBY0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7Z0JBQzFCQSxjQUFjQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxHQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQTtnQkFDL0RBLGNBQWNBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBO2dCQUUvQkEsWUFBWUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7Z0JBQ3hCQSxZQUFZQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxHQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQTtnQkFDN0RBLFlBQVlBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO2dCQUU1QkEsU0FBU0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBRXRCQSxJQUFJQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUNYQSxDQUFDQTtZQUVEQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxVQUFVQSxFQUFFQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQTtnQkFDdENBLGNBQWNBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLEVBQUVBLENBQUFBO2dCQUN6QkEsY0FBY0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0E7Z0JBQy9CQSxjQUFjQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxFQUFFQSxDQUFDQTtnQkFFOURBLFlBQVlBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO2dCQUN4QkEsWUFBWUEsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7Z0JBQzVCQSxZQUFZQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxFQUFFQSxDQUFDQTtnQkFFNURBLFNBQVNBLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUV0QkEsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7Z0JBRVZBLGNBQWNBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBO2dCQUMzQkEsY0FBY0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0E7Z0JBQy9CQSxjQUFjQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQTtnQkFFOURBLFlBQVlBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBO2dCQUN6QkEsWUFBWUEsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7Z0JBQzVCQSxZQUFZQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQTtnQkFFNURBLFNBQVNBLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUV0QkEsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDWEEsQ0FBQ0E7WUFJREEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsVUFBVUEsRUFBRUEsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7Z0JBQ3RDQSxjQUFjQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQTtnQkFDM0JBLGNBQWNBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBO2dCQUMvQkEsY0FBY0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0E7Z0JBRTlEQSxZQUFZQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTtnQkFDeEJBLFlBQVlBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBO2dCQUM3QkEsWUFBWUEsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0E7Z0JBRTVEQSxTQUFTQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFFdEJBLElBQUlBLElBQUlBLENBQUNBLENBQUNBO2dCQUVWQSxjQUFjQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQTtnQkFDM0JBLGNBQWNBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO2dCQUM5QkEsY0FBY0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsRUFBRUEsQ0FBQ0E7Z0JBRTlEQSxZQUFZQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTtnQkFDeEJBLFlBQVlBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO2dCQUM1QkEsWUFBWUEsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsRUFBRUEsQ0FBQ0E7Z0JBRTVEQSxTQUFTQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFFdEJBLElBQUlBLElBQUlBLENBQUNBLENBQUNBO1lBQ1hBLENBQUNBO1lBRURBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLFVBQVVBLEVBQUVBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBO2dCQUN0Q0EsY0FBY0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0E7Z0JBQzFEQSxjQUFjQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQTtnQkFDL0JBLGNBQWNBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBO2dCQUUvQkEsWUFBWUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0E7Z0JBQ3hEQSxZQUFZQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQTtnQkFDN0JBLFlBQVlBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO2dCQUU1QkEsU0FBU0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBRXRCQSxJQUFJQSxJQUFJQSxDQUFDQSxDQUFDQTtnQkFFVkEsY0FBY0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsRUFBRUEsQ0FBQ0E7Z0JBQzFEQSxjQUFjQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTtnQkFDOUJBLGNBQWNBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBO2dCQUUvQkEsWUFBWUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsRUFBRUEsQ0FBQ0E7Z0JBQ3hEQSxZQUFZQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTtnQkFDNUJBLFlBQVlBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO2dCQUU1QkEsU0FBU0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBRXRCQSxJQUFJQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUNYQSxDQUFDQTtZQUVEQSxBQUNBQSxnQ0FEZ0NBO1lBQ2hDQSxZQUFZQSxDQUFDQSxlQUFlQSxDQUFDQSxjQUFjQSxFQUFFQSxZQUFZQSxDQUFDQSxDQUFDQTtZQUMzREEsWUFBWUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0E7UUFDekNBLENBQUNBO0lBQ0ZBLENBQUNBO0lBRURUOztPQUVHQTtJQUNJQSx3Q0FBVUEsR0FBakJBLFVBQWtCQSxNQUFzQkEsRUFBRUEsWUFBbUJBO1FBRTVEVSxJQUFJQSxDQUFRQSxFQUFFQSxDQUFRQSxFQUFFQSxLQUFZQSxDQUFDQTtRQUNyQ0EsSUFBSUEsR0FBaUJBLENBQUNBO1FBRXRCQSxJQUFJQSxVQUFpQkEsRUFBRUEsVUFBaUJBLENBQUNBO1FBQ3pDQSxJQUFJQSxXQUFrQkEsRUFBRUEsV0FBa0JBLENBQUNBO1FBQzNDQSxJQUFJQSxJQUFXQSxFQUFFQSxJQUFXQSxDQUFDQTtRQUM3QkEsSUFBSUEsSUFBV0EsRUFBRUEsSUFBV0EsQ0FBQ0E7UUFDN0JBLElBQUlBLEVBQVNBLEVBQUVBLEVBQVNBLENBQUNBO1FBQ3pCQSxJQUFJQSxXQUFrQkEsQ0FBQ0E7UUFFdkJBLEVBQUVBLENBQUNBLENBQUNBLFlBQVlBLElBQUlBLHFCQUFxQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFFM0NBLFdBQVdBLEdBQUdBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBO1lBRTFKQSxJQUFJQSxnQkFBZ0JBLEdBQTZDQSxNQUFNQSxDQUFDQTtZQUV4RUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsV0FBV0EsSUFBSUEsZ0JBQWdCQSxDQUFDQSxXQUFXQSxJQUFJQSxnQkFBZ0JBLENBQUNBLEdBQUdBLElBQUlBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO2dCQUNqRkEsR0FBR0EsR0FBR0EsZ0JBQWdCQSxDQUFDQSxHQUFHQSxDQUFDQTtZQUM1QkEsQ0FBQ0E7WUFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ1BBLEdBQUdBLEdBQUdBLElBQUlBLEtBQUtBLENBQVNBLFdBQVdBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ3hDQSxDQUFDQTtZQUVEQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDakJBLFVBQVVBLEdBQUdBLFdBQVdBLEdBQUdBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBO2dCQUMvQkEsVUFBVUEsR0FBR0EsV0FBV0EsR0FBR0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDaENBLENBQUNBO1lBQUNBLElBQUlBLENBQUNBLENBQUNBO2dCQUNQQSxVQUFVQSxHQUFHQSxVQUFVQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFDNUJBLFdBQVdBLEdBQUdBLFdBQVdBLEdBQUdBLENBQUNBLENBQUNBO1lBQy9CQSxDQUFDQTtZQUVEQSxBQVlBQSx5REFaeURBO1lBQ3pEQSwrREFBK0RBO1lBQy9EQSw0REFBNERBO1lBQzVEQSwyREFBMkRBO1lBRTNEQSxnREFBZ0RBO1lBQ2hEQSxrQ0FBa0NBO1lBQ2xDQSw0QkFBNEJBO1lBQzVCQSw0QkFBNEJBO1lBQzVCQSw0QkFBNEJBO1lBQzVCQSwyQkFBMkJBO1lBRTNCQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUVWQSxBQUNBQSxlQURlQTtZQUNmQSxJQUFJQSxHQUFHQSxDQUFDQSxHQUFDQSxXQUFXQSxDQUFDQTtZQUNyQkEsSUFBSUEsR0FBR0EsQ0FBQ0EsR0FBQ0EsV0FBV0EsQ0FBQ0E7WUFDckJBLElBQUlBLEdBQUdBLENBQUNBLEdBQUNBLFdBQVdBLENBQUNBO1lBQ3JCQSxJQUFJQSxHQUFHQSxDQUFDQSxHQUFDQSxXQUFXQSxDQUFDQTtZQUNyQkEsRUFBRUEsR0FBR0EsVUFBVUEsR0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0E7WUFDaENBLEVBQUVBLEdBQUdBLFVBQVVBLEdBQUNBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBO1lBQ2hDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxVQUFVQSxFQUFFQSxDQUFDQSxFQUFFQSxFQUFFQSxDQUFDQTtnQkFDdkNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLFVBQVVBLEVBQUVBLENBQUNBLEVBQUVBLEVBQUVBLENBQUNBO29CQUN2Q0EsR0FBR0EsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBRUEsSUFBSUEsR0FBR0EsQ0FBQ0EsR0FBQ0EsRUFBRUEsQ0FBRUEsR0FBQ0EsZ0JBQWdCQSxDQUFDQSxNQUFNQSxDQUFDQTtvQkFDdkRBLEdBQUdBLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBLEdBQUdBLENBQUVBLElBQUlBLEdBQUdBLENBQUNBLFVBQVVBLEdBQUdBLENBQUNBLEdBQUNBLEVBQUVBLENBQUNBLENBQUNBLEdBQUNBLGdCQUFnQkEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7b0JBRXJFQSxHQUFHQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFFQSxJQUFJQSxHQUFHQSxDQUFDQSxVQUFVQSxHQUFHQSxDQUFDQSxHQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxHQUFDQSxnQkFBZ0JBLENBQUNBLE1BQU1BLENBQUNBO29CQUNyRUEsR0FBR0EsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBRUEsSUFBSUEsR0FBR0EsQ0FBQ0EsVUFBVUEsR0FBR0EsQ0FBQ0EsR0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsZ0JBQWdCQSxDQUFDQSxNQUFNQSxDQUFDQTtnQkFDdEVBLENBQUNBO1lBQ0ZBLENBQUNBO1lBRURBLEFBQ0FBLGVBRGVBO1lBQ2ZBLElBQUlBLEdBQUdBLENBQUNBLEdBQUNBLFdBQVdBLENBQUNBO1lBQ3JCQSxJQUFJQSxHQUFHQSxDQUFDQSxHQUFDQSxXQUFXQSxDQUFDQTtZQUNyQkEsSUFBSUEsR0FBR0EsQ0FBQ0EsR0FBQ0EsV0FBV0EsQ0FBQ0E7WUFDckJBLElBQUlBLEdBQUdBLENBQUNBLEdBQUNBLFdBQVdBLENBQUNBO1lBQ3JCQSxFQUFFQSxHQUFHQSxVQUFVQSxHQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQTtZQUNoQ0EsRUFBRUEsR0FBR0EsVUFBVUEsR0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0E7WUFDaENBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLFVBQVVBLEVBQUVBLENBQUNBLEVBQUVBLEVBQUVBLENBQUNBO2dCQUN2Q0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsVUFBVUEsRUFBRUEsQ0FBQ0EsRUFBRUEsRUFBRUEsQ0FBQ0E7b0JBQ3ZDQSxHQUFHQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFFQSxJQUFJQSxHQUFHQSxDQUFDQSxHQUFDQSxFQUFFQSxDQUFDQSxHQUFDQSxnQkFBZ0JBLENBQUNBLE1BQU1BLENBQUNBO29CQUN0REEsR0FBR0EsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBRUEsSUFBSUEsR0FBR0EsQ0FBQ0EsVUFBVUEsR0FBR0EsQ0FBQ0EsR0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsZ0JBQWdCQSxDQUFDQSxNQUFNQSxDQUFDQTtvQkFFckVBLEdBQUdBLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBLEdBQUdBLENBQUVBLElBQUlBLEdBQUdBLENBQUNBLEdBQUNBLEVBQUVBLENBQUNBLEdBQUNBLGdCQUFnQkEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7b0JBQ3REQSxHQUFHQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFFQSxJQUFJQSxHQUFHQSxDQUFDQSxHQUFDQSxFQUFFQSxDQUFDQSxHQUFDQSxnQkFBZ0JBLENBQUNBLE1BQU1BLENBQUNBO2dCQUN2REEsQ0FBQ0E7WUFDRkEsQ0FBQ0E7WUFFREEsQUFDQUEsZUFEZUE7WUFDZkEsSUFBSUEsR0FBR0EsQ0FBQ0EsR0FBQ0EsV0FBV0EsQ0FBQ0E7WUFDckJBLElBQUlBLEdBQUdBLENBQUNBLEdBQUNBLFdBQVdBLENBQUNBO1lBQ3JCQSxJQUFJQSxHQUFHQSxDQUFDQSxHQUFDQSxXQUFXQSxDQUFDQTtZQUNyQkEsSUFBSUEsR0FBR0EsQ0FBQ0EsR0FBQ0EsV0FBV0EsQ0FBQ0E7WUFDckJBLEVBQUVBLEdBQUdBLFVBQVVBLEdBQUNBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBO1lBQ2hDQSxFQUFFQSxHQUFHQSxVQUFVQSxHQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQTtZQUNoQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsVUFBVUEsRUFBRUEsQ0FBQ0EsRUFBRUEsRUFBRUEsQ0FBQ0E7Z0JBQ3ZDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxVQUFVQSxFQUFFQSxDQUFDQSxFQUFFQSxFQUFFQSxDQUFDQTtvQkFDdkNBLEdBQUdBLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBLEdBQUdBLENBQUVBLElBQUlBLEdBQUdBLENBQUNBLEdBQUNBLEVBQUVBLENBQUNBLEdBQUNBLGdCQUFnQkEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7b0JBQ3REQSxHQUFHQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFFQSxJQUFJQSxHQUFHQSxDQUFDQSxVQUFVQSxHQUFHQSxDQUFDQSxHQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxHQUFDQSxnQkFBZ0JBLENBQUNBLE1BQU1BLENBQUNBO29CQUVyRUEsR0FBR0EsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBRUEsSUFBSUEsR0FBR0EsQ0FBQ0EsVUFBVUEsR0FBR0EsQ0FBQ0EsR0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsZ0JBQWdCQSxDQUFDQSxNQUFNQSxDQUFDQTtvQkFDckVBLEdBQUdBLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBLEdBQUdBLENBQUVBLElBQUlBLEdBQUdBLENBQUNBLFVBQVVBLEdBQUdBLENBQUNBLEdBQUNBLEVBQUVBLENBQUNBLENBQUNBLEdBQUNBLGdCQUFnQkEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7Z0JBQ3RFQSxDQUFDQTtZQUNGQSxDQUFDQTtZQUVEQSxnQkFBZ0JBLENBQUNBLFNBQVNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1FBRWpDQSxDQUFDQTtRQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxZQUFZQSxJQUFJQSxpQkFBaUJBLENBQUNBLENBQUNBLENBQUNBO1FBRS9DQSxDQUFDQTtJQUNGQSxDQUFDQTtJQUNGViwwQkFBQ0E7QUFBREEsQ0FqcEJBLEFBaXBCQ0EsRUFqcEJpQyxtQkFBbUIsRUFpcEJwRDtBQUVELEFBQTZCLGlCQUFwQixtQkFBbUIsQ0FBQyIsImZpbGUiOiJwcmVmYWJzL1ByaW1pdGl2ZUN1YmVQcmVmYWIuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsi77u/aW1wb3J0IElBc3NldFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9JQXNzZXRcIik7XG5cbmltcG9ydCBMaW5lU3ViR2VvbWV0cnlcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZGF0YS9MaW5lU3ViR2VvbWV0cnlcIik7XG5pbXBvcnQgU3ViR2VvbWV0cnlCYXNlXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2RhdGEvU3ViR2VvbWV0cnlCYXNlXCIpO1xuaW1wb3J0IFRyaWFuZ2xlU3ViR2VvbWV0cnlcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2RhdGEvVHJpYW5nbGVTdWJHZW9tZXRyeVwiKTtcbmltcG9ydCBQcmltaXRpdmVQcmVmYWJCYXNlXHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wcmVmYWJzL1ByaW1pdGl2ZVByZWZhYkJhc2VcIik7XG5cbi8qKlxuICogQSBDdWJlIHByaW1pdGl2ZSBwcmVmYWIuXG4gKi9cbmNsYXNzIFByaW1pdGl2ZUN1YmVQcmVmYWIgZXh0ZW5kcyBQcmltaXRpdmVQcmVmYWJCYXNlIGltcGxlbWVudHMgSUFzc2V0XG57XG5cdHByaXZhdGUgX3dpZHRoOm51bWJlcjtcblx0cHJpdmF0ZSBfaGVpZ2h0Om51bWJlcjtcblx0cHJpdmF0ZSBfZGVwdGg6bnVtYmVyO1xuXHRwcml2YXRlIF90aWxlNjpib29sZWFuO1xuXG5cdHByaXZhdGUgX3NlZ21lbnRzVzpudW1iZXI7XG5cdHByaXZhdGUgX3NlZ21lbnRzSDpudW1iZXI7XG5cdHByaXZhdGUgX3NlZ21lbnRzRDpudW1iZXI7XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYSBuZXcgQ3ViZSBvYmplY3QuXG5cdCAqIEBwYXJhbSB3aWR0aCBUaGUgc2l6ZSBvZiB0aGUgY3ViZSBhbG9uZyBpdHMgWC1heGlzLlxuXHQgKiBAcGFyYW0gaGVpZ2h0IFRoZSBzaXplIG9mIHRoZSBjdWJlIGFsb25nIGl0cyBZLWF4aXMuXG5cdCAqIEBwYXJhbSBkZXB0aCBUaGUgc2l6ZSBvZiB0aGUgY3ViZSBhbG9uZyBpdHMgWi1heGlzLlxuXHQgKiBAcGFyYW0gc2VnbWVudHNXIFRoZSBudW1iZXIgb2Ygc2VnbWVudHMgdGhhdCBtYWtlIHVwIHRoZSBjdWJlIGFsb25nIHRoZSBYLWF4aXMuXG5cdCAqIEBwYXJhbSBzZWdtZW50c0ggVGhlIG51bWJlciBvZiBzZWdtZW50cyB0aGF0IG1ha2UgdXAgdGhlIGN1YmUgYWxvbmcgdGhlIFktYXhpcy5cblx0ICogQHBhcmFtIHNlZ21lbnRzRCBUaGUgbnVtYmVyIG9mIHNlZ21lbnRzIHRoYXQgbWFrZSB1cCB0aGUgY3ViZSBhbG9uZyB0aGUgWi1heGlzLlxuXHQgKiBAcGFyYW0gdGlsZTYgVGhlIHR5cGUgb2YgdXYgbWFwcGluZyB0byB1c2UuIFdoZW4gdHJ1ZSwgYSB0ZXh0dXJlIHdpbGwgYmUgc3ViZGl2aWRlZCBpbiBhIDJ4MyBncmlkLCBlYWNoIHVzZWQgZm9yIGEgc2luZ2xlIGZhY2UuIFdoZW4gZmFsc2UsIHRoZSBlbnRpcmUgaW1hZ2UgaXMgbWFwcGVkIG9uIGVhY2ggZmFjZS5cblx0ICovXG5cdGNvbnN0cnVjdG9yKHdpZHRoOm51bWJlciA9IDEwMCwgaGVpZ2h0Om51bWJlciA9IDEwMCwgZGVwdGg6bnVtYmVyID0gMTAwLCBzZWdtZW50c1c6bnVtYmVyID0gMSwgc2VnbWVudHNIOm51bWJlciA9IDEsIHNlZ21lbnRzRDpudW1iZXIgPSAxLCB0aWxlNjpib29sZWFuID0gdHJ1ZSlcblx0e1xuXHRcdHN1cGVyKCk7XG5cblx0XHR0aGlzLl93aWR0aCA9IHdpZHRoO1xuXHRcdHRoaXMuX2hlaWdodCA9IGhlaWdodDtcblx0XHR0aGlzLl9kZXB0aCA9IGRlcHRoO1xuXHRcdHRoaXMuX3NlZ21lbnRzVyA9IHNlZ21lbnRzVztcblx0XHR0aGlzLl9zZWdtZW50c0ggPSBzZWdtZW50c0g7XG5cdFx0dGhpcy5fc2VnbWVudHNEID0gc2VnbWVudHNEO1xuXHRcdHRoaXMuX3RpbGU2ID0gdGlsZTY7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIHNpemUgb2YgdGhlIGN1YmUgYWxvbmcgaXRzIFgtYXhpcy5cblx0ICovXG5cdHB1YmxpYyBnZXQgd2lkdGgoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl93aWR0aDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgd2lkdGgodmFsdWU6bnVtYmVyKVxuXHR7XG5cdFx0dGhpcy5fd2lkdGggPSB2YWx1ZTtcblxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlR2VvbWV0cnkoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgc2l6ZSBvZiB0aGUgY3ViZSBhbG9uZyBpdHMgWS1heGlzLlxuXHQgKi9cblx0cHVibGljIGdldCBoZWlnaHQoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9oZWlnaHQ7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGhlaWdodCh2YWx1ZTpudW1iZXIpXG5cdHtcblx0XHR0aGlzLl9oZWlnaHQgPSB2YWx1ZTtcblxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlR2VvbWV0cnkoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgc2l6ZSBvZiB0aGUgY3ViZSBhbG9uZyBpdHMgWi1heGlzLlxuXHQgKi9cblx0cHVibGljIGdldCBkZXB0aCgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2RlcHRoO1xuXHR9XG5cblx0cHVibGljIHNldCBkZXB0aCh2YWx1ZTpudW1iZXIpXG5cdHtcblx0XHR0aGlzLl9kZXB0aCA9IHZhbHVlO1xuXG5cdFx0dGhpcy5fcEludmFsaWRhdGVHZW9tZXRyeSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSB0eXBlIG9mIHV2IG1hcHBpbmcgdG8gdXNlLiBXaGVuIGZhbHNlLCB0aGUgZW50aXJlIGltYWdlIGlzIG1hcHBlZCBvbiBlYWNoIGZhY2UuXG5cdCAqIFdoZW4gdHJ1ZSwgYSB0ZXh0dXJlIHdpbGwgYmUgc3ViZGl2aWRlZCBpbiBhIDN4MiBncmlkLCBlYWNoIHVzZWQgZm9yIGEgc2luZ2xlIGZhY2UuXG5cdCAqIFJlYWRpbmcgdGhlIHRpbGVzIGZyb20gbGVmdCB0byByaWdodCwgdG9wIHRvIGJvdHRvbSB0aGV5IHJlcHJlc2VudCB0aGUgZmFjZXMgb2YgdGhlXG5cdCAqIGN1YmUgaW4gdGhlIGZvbGxvd2luZyBvcmRlcjogYm90dG9tLCB0b3AsIGJhY2ssIGxlZnQsIGZyb250LCByaWdodC4gVGhpcyBjcmVhdGVzXG5cdCAqIHNldmVyYWwgc2hhcmVkIGVkZ2VzIChiZXR3ZWVuIHRoZSB0b3AsIGZyb250LCBsZWZ0IGFuZCByaWdodCBmYWNlcykgd2hpY2ggc2ltcGxpZmllc1xuXHQgKiB0ZXh0dXJlIHBhaW50aW5nLlxuXHQgKi9cblx0cHVibGljIGdldCB0aWxlNigpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiB0aGlzLl90aWxlNjtcblx0fVxuXG5cdHB1YmxpYyBzZXQgdGlsZTYodmFsdWU6Ym9vbGVhbilcblx0e1xuXHRcdHRoaXMuX3RpbGU2ID0gdmFsdWU7XG5cblx0XHR0aGlzLl9wSW52YWxpZGF0ZUdlb21ldHJ5KCk7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIG51bWJlciBvZiBzZWdtZW50cyB0aGF0IG1ha2UgdXAgdGhlIGN1YmUgYWxvbmcgdGhlIFgtYXhpcy4gRGVmYXVsdHMgdG8gMS5cblx0ICovXG5cdHB1YmxpYyBnZXQgc2VnbWVudHNXKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fc2VnbWVudHNXO1xuXHR9XG5cblx0cHVibGljIHNldCBzZWdtZW50c1codmFsdWU6bnVtYmVyKVxuXHR7XG5cdFx0dGhpcy5fc2VnbWVudHNXID0gdmFsdWU7XG5cblx0XHR0aGlzLl9wSW52YWxpZGF0ZUdlb21ldHJ5KCk7XG5cdFx0dGhpcy5fcEludmFsaWRhdGVVVnMoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgbnVtYmVyIG9mIHNlZ21lbnRzIHRoYXQgbWFrZSB1cCB0aGUgY3ViZSBhbG9uZyB0aGUgWS1heGlzLiBEZWZhdWx0cyB0byAxLlxuXHQgKi9cblx0cHVibGljIGdldCBzZWdtZW50c0goKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9zZWdtZW50c0g7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHNlZ21lbnRzSCh2YWx1ZTpudW1iZXIpXG5cdHtcblx0XHR0aGlzLl9zZWdtZW50c0ggPSB2YWx1ZTtcblxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlR2VvbWV0cnkoKTtcblx0XHR0aGlzLl9wSW52YWxpZGF0ZVVWcygpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBudW1iZXIgb2Ygc2VnbWVudHMgdGhhdCBtYWtlIHVwIHRoZSBjdWJlIGFsb25nIHRoZSBaLWF4aXMuIERlZmF1bHRzIHRvIDEuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHNlZ21lbnRzRCgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3NlZ21lbnRzRDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgc2VnbWVudHNEKHZhbHVlOm51bWJlcilcblx0e1xuXHRcdHRoaXMuX3NlZ21lbnRzRCA9IHZhbHVlO1xuXG5cdFx0dGhpcy5fcEludmFsaWRhdGVHZW9tZXRyeSgpO1xuXHRcdHRoaXMuX3BJbnZhbGlkYXRlVVZzKCk7XG5cdH1cblxuXHQvKipcblx0ICogQGluaGVyaXREb2Ncblx0ICovXG5cdHB1YmxpYyBfcEJ1aWxkR2VvbWV0cnkodGFyZ2V0OlN1Ykdlb21ldHJ5QmFzZSwgZ2VvbWV0cnlUeXBlOnN0cmluZylcblx0e1xuXHRcdHZhciBpbmRpY2VzOkFycmF5PG51bWJlcj4gLyp1aW50Ki87XG5cdFx0dmFyIHBvc2l0aW9uczpBcnJheTxudW1iZXI+O1xuXHRcdHZhciBub3JtYWxzOkFycmF5PG51bWJlcj47XG5cdFx0dmFyIHRhbmdlbnRzOkFycmF5PG51bWJlcj47XG5cblx0XHR2YXIgdGw6bnVtYmVyLCB0cjpudW1iZXIsIGJsOm51bWJlciwgYnI6bnVtYmVyO1xuXHRcdHZhciBpOm51bWJlciwgajpudW1iZXIsIGluYzpudW1iZXIgPSAwO1xuXG5cdFx0dmFyIHZpZHg6bnVtYmVyLCBmaWR4Om51bWJlcjsgLy8gaW5kaWNlc1xuXHRcdHZhciBodzpudW1iZXIsIGhoOm51bWJlciwgaGQ6bnVtYmVyOyAvLyBoYWx2ZXNcblx0XHR2YXIgZHc6bnVtYmVyLCBkaDpudW1iZXIsIGRkOm51bWJlcjsgLy8gZGVsdGFzXG5cblx0XHR2YXIgb3V0ZXJfcG9zOm51bWJlcjtcblx0XHR2YXIgbnVtSW5kaWNlczpudW1iZXI7XG5cdFx0dmFyIG51bVZlcnRpY2VzOm51bWJlcjtcblxuXHRcdC8vIGhhbGYgY3ViZSBkaW1lbnNpb25zXG5cdFx0aHcgPSB0aGlzLl93aWR0aC8yO1xuXHRcdGhoID0gdGhpcy5faGVpZ2h0LzI7XG5cdFx0aGQgPSB0aGlzLl9kZXB0aC8yO1xuXG5cdFx0aWYgKGdlb21ldHJ5VHlwZSA9PSBcInRyaWFuZ2xlU3ViR2VvbWV0cnlcIikge1xuXG5cdFx0XHR2YXIgdHJpYW5nbGVHZW9tZXRyeTpUcmlhbmdsZVN1Ykdlb21ldHJ5ID0gPFRyaWFuZ2xlU3ViR2VvbWV0cnk+IHRhcmdldDtcblxuXHRcdFx0bnVtVmVydGljZXMgPSAoKHRoaXMuX3NlZ21lbnRzVyArIDEpKih0aGlzLl9zZWdtZW50c0ggKyAxKSArICh0aGlzLl9zZWdtZW50c1cgKyAxKSoodGhpcy5fc2VnbWVudHNEICsgMSkgKyAodGhpcy5fc2VnbWVudHNIICsgMSkqKHRoaXMuX3NlZ21lbnRzRCArIDEpKSoyO1xuXG5cdFx0XHRudW1JbmRpY2VzID0gKCh0aGlzLl9zZWdtZW50c1cqdGhpcy5fc2VnbWVudHNIICsgdGhpcy5fc2VnbWVudHNXKnRoaXMuX3NlZ21lbnRzRCArIHRoaXMuX3NlZ21lbnRzSCp0aGlzLl9zZWdtZW50c0QpKjEyKTtcblxuXHRcdFx0aWYgKG51bVZlcnRpY2VzID09IHRyaWFuZ2xlR2VvbWV0cnkubnVtVmVydGljZXMgJiYgdHJpYW5nbGVHZW9tZXRyeS5pbmRpY2VzICE9IG51bGwpIHtcblx0XHRcdFx0aW5kaWNlcyA9IHRyaWFuZ2xlR2VvbWV0cnkuaW5kaWNlcztcblx0XHRcdFx0cG9zaXRpb25zID0gdHJpYW5nbGVHZW9tZXRyeS5wb3NpdGlvbnM7XG5cdFx0XHRcdG5vcm1hbHMgPSB0cmlhbmdsZUdlb21ldHJ5LnZlcnRleE5vcm1hbHM7XG5cdFx0XHRcdHRhbmdlbnRzID0gdHJpYW5nbGVHZW9tZXRyeS52ZXJ0ZXhUYW5nZW50cztcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGluZGljZXMgPSBuZXcgQXJyYXk8bnVtYmVyPihudW1JbmRpY2VzKTtcblx0XHRcdFx0cG9zaXRpb25zID0gbmV3IEFycmF5PG51bWJlcj4obnVtVmVydGljZXMqMyk7XG5cdFx0XHRcdG5vcm1hbHMgPSBuZXcgQXJyYXk8bnVtYmVyPihudW1WZXJ0aWNlcyozKTtcblx0XHRcdFx0dGFuZ2VudHMgPSBuZXcgQXJyYXk8bnVtYmVyPihudW1WZXJ0aWNlcyozKTtcblxuXHRcdFx0XHR0aGlzLl9wSW52YWxpZGF0ZVVWcygpO1xuXHRcdFx0fVxuXG5cdFx0XHR2aWR4ID0gMDtcblx0XHRcdGZpZHggPSAwO1xuXG5cdFx0XHQvLyBTZWdtZW50IGRpbWVuc2lvbnNcblx0XHRcdGR3ID0gdGhpcy5fd2lkdGgvdGhpcy5fc2VnbWVudHNXO1xuXHRcdFx0ZGggPSB0aGlzLl9oZWlnaHQvdGhpcy5fc2VnbWVudHNIO1xuXHRcdFx0ZGQgPSB0aGlzLl9kZXB0aC90aGlzLl9zZWdtZW50c0Q7XG5cblx0XHRcdGZvciAoaSA9IDA7IGkgPD0gdGhpcy5fc2VnbWVudHNXOyBpKyspIHtcblx0XHRcdFx0b3V0ZXJfcG9zID0gLWh3ICsgaSpkdztcblxuXHRcdFx0XHRmb3IgKGogPSAwOyBqIDw9IHRoaXMuX3NlZ21lbnRzSDsgaisrKSB7XG5cdFx0XHRcdFx0Ly8gZnJvbnRcblx0XHRcdFx0XHRwb3NpdGlvbnNbdmlkeF0gPSBvdXRlcl9wb3M7XG5cdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHggKyAxXSA9IC1oaCArIGoqZGg7XG5cdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHggKyAyXSA9IC1oZDtcblx0XHRcdFx0XHRub3JtYWxzW3ZpZHhdID0gMDtcblx0XHRcdFx0XHRub3JtYWxzW3ZpZHggKyAxXSA9IDA7XG5cdFx0XHRcdFx0bm9ybWFsc1t2aWR4ICsgMl0gPSAtMTtcblx0XHRcdFx0XHR0YW5nZW50c1t2aWR4XSA9IDE7XG5cdFx0XHRcdFx0dGFuZ2VudHNbdmlkeCArIDFdID0gMDtcblx0XHRcdFx0XHR0YW5nZW50c1t2aWR4ICsgMl0gPSAwO1xuXHRcdFx0XHRcdHZpZHggKz0gMztcblxuXHRcdFx0XHRcdC8vIGJhY2tcblx0XHRcdFx0XHRwb3NpdGlvbnNbdmlkeF0gPSBvdXRlcl9wb3M7XG5cdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHggKyAxXSA9IC1oaCArIGoqZGg7XG5cdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHggKyAyXSA9IGhkO1xuXHRcdFx0XHRcdG5vcm1hbHNbdmlkeF0gPSAwO1xuXHRcdFx0XHRcdG5vcm1hbHNbdmlkeCArIDFdID0gMDtcblx0XHRcdFx0XHRub3JtYWxzW3ZpZHggKyAyXSA9IDE7XG5cdFx0XHRcdFx0dGFuZ2VudHNbdmlkeF0gPSAtMTtcblx0XHRcdFx0XHR0YW5nZW50c1t2aWR4ICsgMV0gPSAwO1xuXHRcdFx0XHRcdHRhbmdlbnRzW3ZpZHggKyAyXSA9IDA7XG5cdFx0XHRcdFx0dmlkeCArPSAzO1xuXG5cdFx0XHRcdFx0aWYgKGkgJiYgaikge1xuXHRcdFx0XHRcdFx0dGwgPSAyKigoaSAtIDEpKih0aGlzLl9zZWdtZW50c0ggKyAxKSArIChqIC0gMSkpO1xuXHRcdFx0XHRcdFx0dHIgPSAyKihpKih0aGlzLl9zZWdtZW50c0ggKyAxKSArIChqIC0gMSkpO1xuXHRcdFx0XHRcdFx0YmwgPSB0bCArIDI7XG5cdFx0XHRcdFx0XHRiciA9IHRyICsgMjtcblxuXHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gdGw7XG5cdFx0XHRcdFx0XHRpbmRpY2VzW2ZpZHgrK10gPSBibDtcblx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IGJyO1xuXHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gdGw7XG5cdFx0XHRcdFx0XHRpbmRpY2VzW2ZpZHgrK10gPSBicjtcblx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IHRyO1xuXHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gdHIgKyAxO1xuXHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gYnIgKyAxO1xuXHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gYmwgKyAxO1xuXHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gdHIgKyAxO1xuXHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gYmwgKyAxO1xuXHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gdGwgKyAxO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpbmMgKz0gMioodGhpcy5fc2VnbWVudHNXICsgMSkqKHRoaXMuX3NlZ21lbnRzSCArIDEpO1xuXG5cdFx0XHRmb3IgKGkgPSAwOyBpIDw9IHRoaXMuX3NlZ21lbnRzVzsgaSsrKSB7XG5cdFx0XHRcdG91dGVyX3BvcyA9IC1odyArIGkqZHc7XG5cblx0XHRcdFx0Zm9yIChqID0gMDsgaiA8PSB0aGlzLl9zZWdtZW50c0Q7IGorKykge1xuXHRcdFx0XHRcdC8vIHRvcFxuXHRcdFx0XHRcdHBvc2l0aW9uc1t2aWR4XSA9IG91dGVyX3Bvcztcblx0XHRcdFx0XHRwb3NpdGlvbnNbdmlkeCArIDFdID0gaGg7XG5cdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHggKyAyXSA9IC1oZCArIGoqZGQ7XG5cdFx0XHRcdFx0bm9ybWFsc1t2aWR4XSA9IDA7XG5cdFx0XHRcdFx0bm9ybWFsc1t2aWR4ICsgMV0gPSAxO1xuXHRcdFx0XHRcdG5vcm1hbHNbdmlkeCArIDJdID0gMDtcblx0XHRcdFx0XHR0YW5nZW50c1t2aWR4XSA9IDE7XG5cdFx0XHRcdFx0dGFuZ2VudHNbdmlkeCArIDFdID0gMDtcblx0XHRcdFx0XHR0YW5nZW50c1t2aWR4ICsgMl0gPSAwO1xuXHRcdFx0XHRcdHZpZHggKz0gMztcblxuXHRcdFx0XHRcdC8vIGJvdHRvbVxuXHRcdFx0XHRcdHBvc2l0aW9uc1t2aWR4XSA9IG91dGVyX3Bvcztcblx0XHRcdFx0XHRwb3NpdGlvbnNbdmlkeCArIDFdID0gLWhoO1xuXHRcdFx0XHRcdHBvc2l0aW9uc1t2aWR4ICsgMl0gPSAtaGQgKyBqKmRkO1xuXHRcdFx0XHRcdG5vcm1hbHNbdmlkeF0gPSAwO1xuXHRcdFx0XHRcdG5vcm1hbHNbdmlkeCArIDFdID0gLTE7XG5cdFx0XHRcdFx0bm9ybWFsc1t2aWR4ICsgMl0gPSAwO1xuXHRcdFx0XHRcdHRhbmdlbnRzW3ZpZHhdID0gMTtcblx0XHRcdFx0XHR0YW5nZW50c1t2aWR4ICsgMV0gPSAwO1xuXHRcdFx0XHRcdHRhbmdlbnRzW3ZpZHggKyAyXSA9IDA7XG5cdFx0XHRcdFx0dmlkeCArPSAzO1xuXG5cdFx0XHRcdFx0aWYgKGkgJiYgaikge1xuXHRcdFx0XHRcdFx0dGwgPSBpbmMgKyAyKigoaSAtIDEpKih0aGlzLl9zZWdtZW50c0QgKyAxKSArIChqIC0gMSkpO1xuXHRcdFx0XHRcdFx0dHIgPSBpbmMgKyAyKihpKih0aGlzLl9zZWdtZW50c0QgKyAxKSArIChqIC0gMSkpO1xuXHRcdFx0XHRcdFx0YmwgPSB0bCArIDI7XG5cdFx0XHRcdFx0XHRiciA9IHRyICsgMjtcblxuXHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gdGw7XG5cdFx0XHRcdFx0XHRpbmRpY2VzW2ZpZHgrK10gPSBibDtcblx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IGJyO1xuXHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gdGw7XG5cdFx0XHRcdFx0XHRpbmRpY2VzW2ZpZHgrK10gPSBicjtcblx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IHRyO1xuXHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gdHIgKyAxO1xuXHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gYnIgKyAxO1xuXHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gYmwgKyAxO1xuXHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gdHIgKyAxO1xuXHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gYmwgKyAxO1xuXHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gdGwgKyAxO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpbmMgKz0gMioodGhpcy5fc2VnbWVudHNXICsgMSkqKHRoaXMuX3NlZ21lbnRzRCArIDEpO1xuXG5cdFx0XHRmb3IgKGkgPSAwOyBpIDw9IHRoaXMuX3NlZ21lbnRzRDsgaSsrKSB7XG5cdFx0XHRcdG91dGVyX3BvcyA9IGhkIC0gaSpkZDtcblxuXHRcdFx0XHRmb3IgKGogPSAwOyBqIDw9IHRoaXMuX3NlZ21lbnRzSDsgaisrKSB7XG5cdFx0XHRcdFx0Ly8gbGVmdFxuXHRcdFx0XHRcdHBvc2l0aW9uc1t2aWR4XSA9IC1odztcblx0XHRcdFx0XHRwb3NpdGlvbnNbdmlkeCsxXSA9IC1oaCArIGoqZGg7XG5cdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHgrMl0gPSBvdXRlcl9wb3M7XG5cdFx0XHRcdFx0bm9ybWFsc1t2aWR4XSA9IC0xO1xuXHRcdFx0XHRcdG5vcm1hbHNbdmlkeCsxXSA9IDA7XG5cdFx0XHRcdFx0bm9ybWFsc1t2aWR4KzJdID0gMDtcblx0XHRcdFx0XHR0YW5nZW50c1t2aWR4XSA9IDA7XG5cdFx0XHRcdFx0dGFuZ2VudHNbdmlkeCsxXSA9IDA7XG5cdFx0XHRcdFx0dGFuZ2VudHNbdmlkeCsyXSA9IC0xO1xuXHRcdFx0XHRcdHZpZHggKz0gMztcblxuXHRcdFx0XHRcdC8vIHJpZ2h0XG5cdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHhdID0gaHc7XG5cdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHgrMV0gPSAtaGggKyBqKmRoO1xuXHRcdFx0XHRcdHBvc2l0aW9uc1t2aWR4KzJdID0gb3V0ZXJfcG9zO1xuXHRcdFx0XHRcdG5vcm1hbHNbdmlkeF0gPSAxO1xuXHRcdFx0XHRcdG5vcm1hbHNbdmlkeCsxXSA9IDA7XG5cdFx0XHRcdFx0bm9ybWFsc1t2aWR4KzJdID0gMDtcblx0XHRcdFx0XHR0YW5nZW50c1t2aWR4XSA9IDA7XG5cdFx0XHRcdFx0dGFuZ2VudHNbdmlkeCsxXSA9IDA7XG5cdFx0XHRcdFx0dGFuZ2VudHNbdmlkeCsyXSA9IDE7XG5cdFx0XHRcdFx0dmlkeCArPSAzO1xuXG5cdFx0XHRcdFx0aWYgKGkgJiYgaikge1xuXHRcdFx0XHRcdFx0dGwgPSBpbmMgKyAyKigoaSAtIDEpKih0aGlzLl9zZWdtZW50c0ggKyAxKSArIChqIC0gMSkpO1xuXHRcdFx0XHRcdFx0dHIgPSBpbmMgKyAyKihpKih0aGlzLl9zZWdtZW50c0ggKyAxKSArIChqIC0gMSkpO1xuXHRcdFx0XHRcdFx0YmwgPSB0bCArIDI7XG5cdFx0XHRcdFx0XHRiciA9IHRyICsgMjtcblxuXHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gdGw7XG5cdFx0XHRcdFx0XHRpbmRpY2VzW2ZpZHgrK10gPSBibDtcblx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IGJyO1xuXHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gdGw7XG5cdFx0XHRcdFx0XHRpbmRpY2VzW2ZpZHgrK10gPSBicjtcblx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IHRyO1xuXHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gdHIgKyAxO1xuXHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gYnIgKyAxO1xuXHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gYmwgKyAxO1xuXHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gdHIgKyAxO1xuXHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gYmwgKyAxO1xuXHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gdGwgKyAxO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHR0cmlhbmdsZUdlb21ldHJ5LnVwZGF0ZUluZGljZXMoaW5kaWNlcyk7XG5cblx0XHRcdHRyaWFuZ2xlR2VvbWV0cnkudXBkYXRlUG9zaXRpb25zKHBvc2l0aW9ucyk7XG5cdFx0XHR0cmlhbmdsZUdlb21ldHJ5LnVwZGF0ZVZlcnRleE5vcm1hbHMobm9ybWFscyk7XG5cdFx0XHR0cmlhbmdsZUdlb21ldHJ5LnVwZGF0ZVZlcnRleFRhbmdlbnRzKHRhbmdlbnRzKTtcblxuXHRcdH0gZWxzZSBpZiAoZ2VvbWV0cnlUeXBlID09IFwibGluZVN1Ykdlb21ldHJ5XCIpIHtcblx0XHRcdHZhciBsaW5lR2VvbWV0cnk6TGluZVN1Ykdlb21ldHJ5ID0gPExpbmVTdWJHZW9tZXRyeT4gdGFyZ2V0O1xuXG5cdFx0XHR2YXIgbnVtU2VnbWVudHM6bnVtYmVyID0gdGhpcy5fc2VnbWVudHNIKjQgKyAgdGhpcy5fc2VnbWVudHNXKjQgKyB0aGlzLl9zZWdtZW50c0QqNDtcblx0XHRcdHZhciBzdGFydFBvc2l0aW9uczpBcnJheTxudW1iZXI+O1xuXHRcdFx0dmFyIGVuZFBvc2l0aW9uczpBcnJheTxudW1iZXI+O1xuXHRcdFx0dmFyIHRoaWNrbmVzczpBcnJheTxudW1iZXI+O1xuXG5cdFx0XHRpZiAobGluZUdlb21ldHJ5LmluZGljZXMgIT0gbnVsbCAmJiBudW1TZWdtZW50cyA9PSBsaW5lR2VvbWV0cnkubnVtU2VnbWVudHMpIHtcblx0XHRcdFx0c3RhcnRQb3NpdGlvbnMgPSBsaW5lR2VvbWV0cnkuc3RhcnRQb3NpdGlvbnM7XG5cdFx0XHRcdGVuZFBvc2l0aW9ucyA9IGxpbmVHZW9tZXRyeS5lbmRQb3NpdGlvbnM7XG5cdFx0XHRcdHRoaWNrbmVzcyA9IGxpbmVHZW9tZXRyeS50aGlja25lc3M7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRzdGFydFBvc2l0aW9ucyA9IG5ldyBBcnJheTxudW1iZXI+KG51bVNlZ21lbnRzKjMpO1xuXHRcdFx0XHRlbmRQb3NpdGlvbnMgPSBuZXcgQXJyYXk8bnVtYmVyPihudW1TZWdtZW50cyozKTtcblx0XHRcdFx0dGhpY2tuZXNzID0gbmV3IEFycmF5PG51bWJlcj4obnVtU2VnbWVudHMpO1xuXHRcdFx0fVxuXG5cdFx0XHR2aWR4ID0gMDtcblxuXHRcdFx0ZmlkeCA9IDA7XG5cblx0XHRcdC8vZnJvbnQvYmFjayBmYWNlXG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgdGhpcy5fc2VnbWVudHNIOyArK2kpIHtcblx0XHRcdFx0c3RhcnRQb3NpdGlvbnNbdmlkeF0gPSAtaHc7XG5cdFx0XHRcdHN0YXJ0UG9zaXRpb25zW3ZpZHggKyAxXSA9IGkqdGhpcy5faGVpZ2h0L3RoaXMuX3NlZ21lbnRzSCAtIGhoO1xuXHRcdFx0XHRzdGFydFBvc2l0aW9uc1t2aWR4ICsgMl0gPSAtaGQ7XG5cblx0XHRcdFx0ZW5kUG9zaXRpb25zW3ZpZHhdID0gaHc7XG5cdFx0XHRcdGVuZFBvc2l0aW9uc1t2aWR4ICsgMV0gPSBpKnRoaXMuX2hlaWdodC90aGlzLl9zZWdtZW50c0ggLSBoaFxuXHRcdFx0XHRlbmRQb3NpdGlvbnNbdmlkeCArIDJdID0gLWhkO1xuXG5cdFx0XHRcdHRoaWNrbmVzc1tmaWR4KytdID0gMTtcblxuXHRcdFx0XHR2aWR4ICs9IDM7XG5cblx0XHRcdFx0c3RhcnRQb3NpdGlvbnNbdmlkeF0gPSAtaHc7XG5cdFx0XHRcdHN0YXJ0UG9zaXRpb25zW3ZpZHggKyAxXSA9IGhoIC0gaSp0aGlzLl9oZWlnaHQvdGhpcy5fc2VnbWVudHNIO1xuXHRcdFx0XHRzdGFydFBvc2l0aW9uc1t2aWR4ICsgMl0gPSBoZDtcblxuXHRcdFx0XHRlbmRQb3NpdGlvbnNbdmlkeF0gPSBodztcblx0XHRcdFx0ZW5kUG9zaXRpb25zW3ZpZHggKyAxXSA9IGhoIC0gaSp0aGlzLl9oZWlnaHQvdGhpcy5fc2VnbWVudHNIO1xuXHRcdFx0XHRlbmRQb3NpdGlvbnNbdmlkeCArIDJdID0gaGQ7XG5cblx0XHRcdFx0dGhpY2tuZXNzW2ZpZHgrK10gPSAxO1xuXG5cdFx0XHRcdHZpZHggKz0gMztcblx0XHRcdH1cblxuXHRcdFx0Zm9yIChpID0gMDsgaSA8IHRoaXMuX3NlZ21lbnRzVzsgKytpKSB7XG5cdFx0XHRcdHN0YXJ0UG9zaXRpb25zW3ZpZHhdID0gaSp0aGlzLl93aWR0aC90aGlzLl9zZWdtZW50c1cgLSBodztcblx0XHRcdFx0c3RhcnRQb3NpdGlvbnNbdmlkeCArIDFdID0gLWhoO1xuXHRcdFx0XHRzdGFydFBvc2l0aW9uc1t2aWR4ICsgMl0gPSAtaGQ7XG5cblx0XHRcdFx0ZW5kUG9zaXRpb25zW3ZpZHhdID0gaSp0aGlzLl93aWR0aC90aGlzLl9zZWdtZW50c1cgLSBodztcblx0XHRcdFx0ZW5kUG9zaXRpb25zW3ZpZHggKyAxXSA9IGhoO1xuXHRcdFx0XHRlbmRQb3NpdGlvbnNbdmlkeCArIDJdID0gLWhkO1xuXG5cdFx0XHRcdHRoaWNrbmVzc1tmaWR4KytdID0gMTtcblxuXHRcdFx0XHR2aWR4ICs9IDM7XG5cblx0XHRcdFx0c3RhcnRQb3NpdGlvbnNbdmlkeF0gPSBodyAtIGkqdGhpcy5fd2lkdGgvdGhpcy5fc2VnbWVudHNXO1xuXHRcdFx0XHRzdGFydFBvc2l0aW9uc1t2aWR4ICsgMV0gPSAtaGg7XG5cdFx0XHRcdHN0YXJ0UG9zaXRpb25zW3ZpZHggKyAyXSA9IGhkO1xuXG5cdFx0XHRcdGVuZFBvc2l0aW9uc1t2aWR4XSA9IGh3IC0gaSp0aGlzLl93aWR0aC90aGlzLl9zZWdtZW50c1c7XG5cdFx0XHRcdGVuZFBvc2l0aW9uc1t2aWR4ICsgMV0gPSBoaDtcblx0XHRcdFx0ZW5kUG9zaXRpb25zW3ZpZHggKyAyXSA9IGhkO1xuXG5cdFx0XHRcdHRoaWNrbmVzc1tmaWR4KytdID0gMTtcblxuXHRcdFx0XHR2aWR4ICs9IDM7XG5cdFx0XHR9XG5cblx0XHRcdC8vbGVmdC9yaWdodCBmYWNlXG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgdGhpcy5fc2VnbWVudHNIOyArK2kpIHtcblx0XHRcdFx0c3RhcnRQb3NpdGlvbnNbdmlkeF0gPSAtaHc7XG5cdFx0XHRcdHN0YXJ0UG9zaXRpb25zW3ZpZHggKyAxXSA9IGkqdGhpcy5faGVpZ2h0L3RoaXMuX3NlZ21lbnRzSCAtIGhoO1xuXHRcdFx0XHRzdGFydFBvc2l0aW9uc1t2aWR4ICsgMl0gPSAtaGQ7XG5cblx0XHRcdFx0ZW5kUG9zaXRpb25zW3ZpZHhdID0gLWh3O1xuXHRcdFx0XHRlbmRQb3NpdGlvbnNbdmlkeCArIDFdID0gaSp0aGlzLl9oZWlnaHQvdGhpcy5fc2VnbWVudHNIIC0gaGhcblx0XHRcdFx0ZW5kUG9zaXRpb25zW3ZpZHggKyAyXSA9IGhkO1xuXG5cdFx0XHRcdHRoaWNrbmVzc1tmaWR4KytdID0gMTtcblxuXHRcdFx0XHR2aWR4ICs9IDM7XG5cblx0XHRcdFx0c3RhcnRQb3NpdGlvbnNbdmlkeF0gPSBodztcblx0XHRcdFx0c3RhcnRQb3NpdGlvbnNbdmlkeCArIDFdID0gaGggLSBpKnRoaXMuX2hlaWdodC90aGlzLl9zZWdtZW50c0g7XG5cdFx0XHRcdHN0YXJ0UG9zaXRpb25zW3ZpZHggKyAyXSA9IC1oZDtcblxuXHRcdFx0XHRlbmRQb3NpdGlvbnNbdmlkeF0gPSBodztcblx0XHRcdFx0ZW5kUG9zaXRpb25zW3ZpZHggKyAxXSA9IGhoIC0gaSp0aGlzLl9oZWlnaHQvdGhpcy5fc2VnbWVudHNIO1xuXHRcdFx0XHRlbmRQb3NpdGlvbnNbdmlkeCArIDJdID0gaGQ7XG5cblx0XHRcdFx0dGhpY2tuZXNzW2ZpZHgrK10gPSAxO1xuXG5cdFx0XHRcdHZpZHggKz0gMztcblx0XHRcdH1cblxuXHRcdFx0Zm9yIChpID0gMDsgaSA8IHRoaXMuX3NlZ21lbnRzRDsgKytpKSB7XG5cdFx0XHRcdHN0YXJ0UG9zaXRpb25zW3ZpZHhdID0gaHdcblx0XHRcdFx0c3RhcnRQb3NpdGlvbnNbdmlkeCArIDFdID0gLWhoO1xuXHRcdFx0XHRzdGFydFBvc2l0aW9uc1t2aWR4ICsgMl0gPSBpKnRoaXMuX2RlcHRoL3RoaXMuX3NlZ21lbnRzRCAtIGhkO1xuXG5cdFx0XHRcdGVuZFBvc2l0aW9uc1t2aWR4XSA9IGh3O1xuXHRcdFx0XHRlbmRQb3NpdGlvbnNbdmlkeCArIDFdID0gaGg7XG5cdFx0XHRcdGVuZFBvc2l0aW9uc1t2aWR4ICsgMl0gPSBpKnRoaXMuX2RlcHRoL3RoaXMuX3NlZ21lbnRzRCAtIGhkO1xuXG5cdFx0XHRcdHRoaWNrbmVzc1tmaWR4KytdID0gMTtcblxuXHRcdFx0XHR2aWR4ICs9IDM7XG5cblx0XHRcdFx0c3RhcnRQb3NpdGlvbnNbdmlkeF0gPSAtaHc7XG5cdFx0XHRcdHN0YXJ0UG9zaXRpb25zW3ZpZHggKyAxXSA9IC1oaDtcblx0XHRcdFx0c3RhcnRQb3NpdGlvbnNbdmlkeCArIDJdID0gaGQgLSBpKnRoaXMuX2RlcHRoL3RoaXMuX3NlZ21lbnRzRDtcblxuXHRcdFx0XHRlbmRQb3NpdGlvbnNbdmlkeF0gPSAtaHc7XG5cdFx0XHRcdGVuZFBvc2l0aW9uc1t2aWR4ICsgMV0gPSBoaDtcblx0XHRcdFx0ZW5kUG9zaXRpb25zW3ZpZHggKyAyXSA9IGhkIC0gaSp0aGlzLl9kZXB0aC90aGlzLl9zZWdtZW50c0Q7XG5cblx0XHRcdFx0dGhpY2tuZXNzW2ZpZHgrK10gPSAxO1xuXG5cdFx0XHRcdHZpZHggKz0gMztcblx0XHRcdH1cblxuXG5cdFx0XHQvL3RvcC9ib3R0b20gZmFjZVxuXHRcdFx0Zm9yIChpID0gMDsgaSA8IHRoaXMuX3NlZ21lbnRzRDsgKytpKSB7XG5cdFx0XHRcdHN0YXJ0UG9zaXRpb25zW3ZpZHhdID0gLWh3O1xuXHRcdFx0XHRzdGFydFBvc2l0aW9uc1t2aWR4ICsgMV0gPSAtaGg7XG5cdFx0XHRcdHN0YXJ0UG9zaXRpb25zW3ZpZHggKyAyXSA9IGhkIC0gaSp0aGlzLl9kZXB0aC90aGlzLl9zZWdtZW50c0Q7XG5cblx0XHRcdFx0ZW5kUG9zaXRpb25zW3ZpZHhdID0gaHc7XG5cdFx0XHRcdGVuZFBvc2l0aW9uc1t2aWR4ICsgMV0gPSAtaGg7XG5cdFx0XHRcdGVuZFBvc2l0aW9uc1t2aWR4ICsgMl0gPSBoZCAtIGkqdGhpcy5fZGVwdGgvdGhpcy5fc2VnbWVudHNEO1xuXG5cdFx0XHRcdHRoaWNrbmVzc1tmaWR4KytdID0gMTtcblxuXHRcdFx0XHR2aWR4ICs9IDM7XG5cblx0XHRcdFx0c3RhcnRQb3NpdGlvbnNbdmlkeF0gPSAtaHc7XG5cdFx0XHRcdHN0YXJ0UG9zaXRpb25zW3ZpZHggKyAxXSA9IGhoO1xuXHRcdFx0XHRzdGFydFBvc2l0aW9uc1t2aWR4ICsgMl0gPSBpKnRoaXMuX2RlcHRoL3RoaXMuX3NlZ21lbnRzRCAtIGhkO1xuXG5cdFx0XHRcdGVuZFBvc2l0aW9uc1t2aWR4XSA9IGh3O1xuXHRcdFx0XHRlbmRQb3NpdGlvbnNbdmlkeCArIDFdID0gaGg7XG5cdFx0XHRcdGVuZFBvc2l0aW9uc1t2aWR4ICsgMl0gPSBpKnRoaXMuX2RlcHRoL3RoaXMuX3NlZ21lbnRzRCAtIGhkO1xuXG5cdFx0XHRcdHRoaWNrbmVzc1tmaWR4KytdID0gMTtcblxuXHRcdFx0XHR2aWR4ICs9IDM7XG5cdFx0XHR9XG5cblx0XHRcdGZvciAoaSA9IDA7IGkgPCB0aGlzLl9zZWdtZW50c1c7ICsraSkge1xuXHRcdFx0XHRzdGFydFBvc2l0aW9uc1t2aWR4XSA9IGh3IC0gaSp0aGlzLl93aWR0aC90aGlzLl9zZWdtZW50c1c7XG5cdFx0XHRcdHN0YXJ0UG9zaXRpb25zW3ZpZHggKyAxXSA9IC1oaDtcblx0XHRcdFx0c3RhcnRQb3NpdGlvbnNbdmlkeCArIDJdID0gLWhkO1xuXG5cdFx0XHRcdGVuZFBvc2l0aW9uc1t2aWR4XSA9IGh3IC0gaSp0aGlzLl93aWR0aC90aGlzLl9zZWdtZW50c1c7XG5cdFx0XHRcdGVuZFBvc2l0aW9uc1t2aWR4ICsgMV0gPSAtaGg7XG5cdFx0XHRcdGVuZFBvc2l0aW9uc1t2aWR4ICsgMl0gPSBoZDtcblxuXHRcdFx0XHR0aGlja25lc3NbZmlkeCsrXSA9IDE7XG5cblx0XHRcdFx0dmlkeCArPSAzO1xuXG5cdFx0XHRcdHN0YXJ0UG9zaXRpb25zW3ZpZHhdID0gaSp0aGlzLl93aWR0aC90aGlzLl9zZWdtZW50c1cgLSBodztcblx0XHRcdFx0c3RhcnRQb3NpdGlvbnNbdmlkeCArIDFdID0gaGg7XG5cdFx0XHRcdHN0YXJ0UG9zaXRpb25zW3ZpZHggKyAyXSA9IC1oZDtcblxuXHRcdFx0XHRlbmRQb3NpdGlvbnNbdmlkeF0gPSBpKnRoaXMuX3dpZHRoL3RoaXMuX3NlZ21lbnRzVyAtIGh3O1xuXHRcdFx0XHRlbmRQb3NpdGlvbnNbdmlkeCArIDFdID0gaGg7XG5cdFx0XHRcdGVuZFBvc2l0aW9uc1t2aWR4ICsgMl0gPSBoZDtcblxuXHRcdFx0XHR0aGlja25lc3NbZmlkeCsrXSA9IDE7XG5cblx0XHRcdFx0dmlkeCArPSAzO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBidWlsZCByZWFsIGRhdGEgZnJvbSByYXcgZGF0YVxuXHRcdFx0bGluZUdlb21ldHJ5LnVwZGF0ZVBvc2l0aW9ucyhzdGFydFBvc2l0aW9ucywgZW5kUG9zaXRpb25zKTtcblx0XHRcdGxpbmVHZW9tZXRyeS51cGRhdGVUaGlja25lc3ModGhpY2tuZXNzKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQGluaGVyaXREb2Ncblx0ICovXG5cdHB1YmxpYyBfcEJ1aWxkVVZzKHRhcmdldDpTdWJHZW9tZXRyeUJhc2UsIGdlb21ldHJ5VHlwZTpzdHJpbmcpXG5cdHtcblx0XHR2YXIgaTpudW1iZXIsIGo6bnVtYmVyLCBpbmRleDpudW1iZXI7XG5cdFx0dmFyIHV2czpBcnJheTxudW1iZXI+O1xuXG5cdFx0dmFyIHVfdGlsZV9kaW06bnVtYmVyLCB2X3RpbGVfZGltOm51bWJlcjtcblx0XHR2YXIgdV90aWxlX3N0ZXA6bnVtYmVyLCB2X3RpbGVfc3RlcDpudW1iZXI7XG5cdFx0dmFyIHRsMHU6bnVtYmVyLCB0bDB2Om51bWJlcjtcblx0XHR2YXIgdGwxdTpudW1iZXIsIHRsMXY6bnVtYmVyO1xuXHRcdHZhciBkdTpudW1iZXIsIGR2Om51bWJlcjtcblx0XHR2YXIgbnVtVmVydGljZXM6bnVtYmVyO1xuXG5cdFx0aWYgKGdlb21ldHJ5VHlwZSA9PSBcInRyaWFuZ2xlU3ViR2VvbWV0cnlcIikge1xuXG5cdFx0XHRudW1WZXJ0aWNlcyA9ICgodGhpcy5fc2VnbWVudHNXICsgMSkqKHRoaXMuX3NlZ21lbnRzSCArIDEpICsgKHRoaXMuX3NlZ21lbnRzVyArIDEpKih0aGlzLl9zZWdtZW50c0QgKyAxKSArICh0aGlzLl9zZWdtZW50c0ggKyAxKSoodGhpcy5fc2VnbWVudHNEICsgMSkpKjI7XG5cblx0XHRcdHZhciB0cmlhbmdsZUdlb21ldHJ5OlRyaWFuZ2xlU3ViR2VvbWV0cnkgPSA8VHJpYW5nbGVTdWJHZW9tZXRyeT4gdGFyZ2V0O1xuXG5cdFx0XHRpZiAobnVtVmVydGljZXMgPT0gdHJpYW5nbGVHZW9tZXRyeS5udW1WZXJ0aWNlcyAmJiB0cmlhbmdsZUdlb21ldHJ5LnV2cyAhPSBudWxsKSB7XG5cdFx0XHRcdHV2cyA9IHRyaWFuZ2xlR2VvbWV0cnkudXZzO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dXZzID0gbmV3IEFycmF5PG51bWJlcj4obnVtVmVydGljZXMqMik7XG5cdFx0XHR9XG5cblx0XHRcdGlmICh0aGlzLl90aWxlNikge1xuXHRcdFx0XHR1X3RpbGVfZGltID0gdV90aWxlX3N0ZXAgPSAxLzM7XG5cdFx0XHRcdHZfdGlsZV9kaW0gPSB2X3RpbGVfc3RlcCA9IDEvMjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHVfdGlsZV9kaW0gPSB2X3RpbGVfZGltID0gMTtcblx0XHRcdFx0dV90aWxlX3N0ZXAgPSB2X3RpbGVfc3RlcCA9IDA7XG5cdFx0XHR9XG5cblx0XHRcdC8vIENyZWF0ZSBwbGFuZXMgdHdvIGFuZCB0d28sIHRoZSBzYW1lIHdheSB0aGF0IHRoZXkgd2VyZVxuXHRcdFx0Ly8gY29uc3RydWN0ZWQgaW4gdGhlIGJ1aWxkR2VvbWV0cnkoKSBmdW5jdGlvbi4gRmlyc3QgY2FsY3VsYXRlXG5cdFx0XHQvLyB0aGUgdG9wLWxlZnQgVVYgY29vcmRpbmF0ZSBmb3IgYm90aCBwbGFuZXMsIGFuZCB0aGVuIGxvb3Bcblx0XHRcdC8vIG92ZXIgdGhlIHBvaW50cywgY2FsY3VsYXRpbmcgdGhlIFVWcyBmcm9tIHRoZXNlIG51bWJlcnMuXG5cblx0XHRcdC8vIFdoZW4gdGlsZTYgaXMgdHJ1ZSwgdGhlIGxheW91dCBpcyBhcyBmb2xsb3dzOlxuXHRcdFx0Ly8gICAgICAgLi0tLS0tLi0tLS0tLi0tLS0tLiAoMSwxKVxuXHRcdFx0Ly8gICAgICAgfCBCb3QgfCAgVCAgfCBCYWsgfFxuXHRcdFx0Ly8gICAgICAgfC0tLS0tKy0tLS0tKy0tLS0tfFxuXHRcdFx0Ly8gICAgICAgfCAgTCAgfCAgRiAgfCAgUiAgfFxuXHRcdFx0Ly8gKDAsMCknLS0tLS0nLS0tLS0nLS0tLS0nXG5cblx0XHRcdGluZGV4ID0gMDtcblxuXHRcdFx0Ly8gRlJPTlQgLyBCQUNLXG5cdFx0XHR0bDB1ID0gMSp1X3RpbGVfc3RlcDtcblx0XHRcdHRsMHYgPSAxKnZfdGlsZV9zdGVwO1xuXHRcdFx0dGwxdSA9IDIqdV90aWxlX3N0ZXA7XG5cdFx0XHR0bDF2ID0gMCp2X3RpbGVfc3RlcDtcblx0XHRcdGR1ID0gdV90aWxlX2RpbS90aGlzLl9zZWdtZW50c1c7XG5cdFx0XHRkdiA9IHZfdGlsZV9kaW0vdGhpcy5fc2VnbWVudHNIO1xuXHRcdFx0Zm9yIChpID0gMDsgaSA8PSB0aGlzLl9zZWdtZW50c1c7IGkrKykge1xuXHRcdFx0XHRmb3IgKGogPSAwOyBqIDw9IHRoaXMuX3NlZ21lbnRzSDsgaisrKSB7XG5cdFx0XHRcdFx0dXZzW2luZGV4KytdID0gKCB0bDB1ICsgaSpkdSApKnRyaWFuZ2xlR2VvbWV0cnkuc2NhbGVVO1xuXHRcdFx0XHRcdHV2c1tpbmRleCsrXSA9ICggdGwwdiArICh2X3RpbGVfZGltIC0gaipkdikpKnRyaWFuZ2xlR2VvbWV0cnkuc2NhbGVWO1xuXG5cdFx0XHRcdFx0dXZzW2luZGV4KytdID0gKCB0bDF1ICsgKHVfdGlsZV9kaW0gLSBpKmR1KSkqdHJpYW5nbGVHZW9tZXRyeS5zY2FsZVU7XG5cdFx0XHRcdFx0dXZzW2luZGV4KytdID0gKCB0bDF2ICsgKHZfdGlsZV9kaW0gLSBqKmR2KSkqdHJpYW5nbGVHZW9tZXRyeS5zY2FsZVY7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gVE9QIC8gQk9UVE9NXG5cdFx0XHR0bDB1ID0gMSp1X3RpbGVfc3RlcDtcblx0XHRcdHRsMHYgPSAwKnZfdGlsZV9zdGVwO1xuXHRcdFx0dGwxdSA9IDAqdV90aWxlX3N0ZXA7XG5cdFx0XHR0bDF2ID0gMCp2X3RpbGVfc3RlcDtcblx0XHRcdGR1ID0gdV90aWxlX2RpbS90aGlzLl9zZWdtZW50c1c7XG5cdFx0XHRkdiA9IHZfdGlsZV9kaW0vdGhpcy5fc2VnbWVudHNEO1xuXHRcdFx0Zm9yIChpID0gMDsgaSA8PSB0aGlzLl9zZWdtZW50c1c7IGkrKykge1xuXHRcdFx0XHRmb3IgKGogPSAwOyBqIDw9IHRoaXMuX3NlZ21lbnRzRDsgaisrKSB7XG5cdFx0XHRcdFx0dXZzW2luZGV4KytdID0gKCB0bDB1ICsgaSpkdSkqdHJpYW5nbGVHZW9tZXRyeS5zY2FsZVU7XG5cdFx0XHRcdFx0dXZzW2luZGV4KytdID0gKCB0bDB2ICsgKHZfdGlsZV9kaW0gLSBqKmR2KSkqdHJpYW5nbGVHZW9tZXRyeS5zY2FsZVY7XG5cblx0XHRcdFx0XHR1dnNbaW5kZXgrK10gPSAoIHRsMXUgKyBpKmR1KSp0cmlhbmdsZUdlb21ldHJ5LnNjYWxlVTtcblx0XHRcdFx0XHR1dnNbaW5kZXgrK10gPSAoIHRsMXYgKyBqKmR2KSp0cmlhbmdsZUdlb21ldHJ5LnNjYWxlVjtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBMRUZUIC8gUklHSFRcblx0XHRcdHRsMHUgPSAwKnVfdGlsZV9zdGVwO1xuXHRcdFx0dGwwdiA9IDEqdl90aWxlX3N0ZXA7XG5cdFx0XHR0bDF1ID0gMip1X3RpbGVfc3RlcDtcblx0XHRcdHRsMXYgPSAxKnZfdGlsZV9zdGVwO1xuXHRcdFx0ZHUgPSB1X3RpbGVfZGltL3RoaXMuX3NlZ21lbnRzRDtcblx0XHRcdGR2ID0gdl90aWxlX2RpbS90aGlzLl9zZWdtZW50c0g7XG5cdFx0XHRmb3IgKGkgPSAwOyBpIDw9IHRoaXMuX3NlZ21lbnRzRDsgaSsrKSB7XG5cdFx0XHRcdGZvciAoaiA9IDA7IGogPD0gdGhpcy5fc2VnbWVudHNIOyBqKyspIHtcblx0XHRcdFx0XHR1dnNbaW5kZXgrK10gPSAoIHRsMHUgKyBpKmR1KSp0cmlhbmdsZUdlb21ldHJ5LnNjYWxlVTtcblx0XHRcdFx0XHR1dnNbaW5kZXgrK10gPSAoIHRsMHYgKyAodl90aWxlX2RpbSAtIGoqZHYpKSp0cmlhbmdsZUdlb21ldHJ5LnNjYWxlVjtcblxuXHRcdFx0XHRcdHV2c1tpbmRleCsrXSA9ICggdGwxdSArICh1X3RpbGVfZGltIC0gaSpkdSkpKnRyaWFuZ2xlR2VvbWV0cnkuc2NhbGVVO1xuXHRcdFx0XHRcdHV2c1tpbmRleCsrXSA9ICggdGwxdiArICh2X3RpbGVfZGltIC0gaipkdikpKnRyaWFuZ2xlR2VvbWV0cnkuc2NhbGVWO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHRyaWFuZ2xlR2VvbWV0cnkudXBkYXRlVVZzKHV2cyk7XG5cblx0XHR9IGVsc2UgaWYgKGdlb21ldHJ5VHlwZSA9PSBcImxpbmVTdWJHZW9tZXRyeVwiKSB7XG5cdFx0XHQvL25vdGhpbmcgdG8gZG8gaGVyZVxuXHRcdH1cblx0fVxufVxuXG5leHBvcnQgPSBQcmltaXRpdmVDdWJlUHJlZmFiOyJdfQ==