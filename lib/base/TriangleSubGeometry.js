var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Vector3D = require("awayjs-core/lib/geom/Vector3D");
var SubGeometryBase = require("awayjs-display/lib/base/SubGeometryBase");
var TriangleSubMesh = require("awayjs-display/lib/base/TriangleSubMesh");
var SubGeometryEvent = require("awayjs-display/lib/events/SubGeometryEvent");
/**
 * @class away.base.TriangleSubGeometry
 */
var TriangleSubGeometry = (function (_super) {
    __extends(TriangleSubGeometry, _super);
    /**
     *
     */
    function TriangleSubGeometry(concatenatedArrays) {
        _super.call(this, concatenatedArrays);
        this._positionsDirty = true;
        this._faceNormalsDirty = true;
        this._faceTangentsDirty = true;
        this._vertexNormalsDirty = true;
        this._vertexTangentsDirty = true;
        this._uvsDirty = true;
        this._secondaryUVsDirty = true;
        this._jointIndicesDirty = true;
        this._jointWeightsDirty = true;
        this._concatenateArrays = true;
        this._autoDeriveNormals = true;
        this._autoDeriveTangents = true;
        this._autoDeriveUVs = false;
        this._useFaceWeights = false;
        this._scaleU = 1;
        this._scaleV = 1;
        this._pSubMeshClass = TriangleSubMesh;
    }
    Object.defineProperty(TriangleSubGeometry.prototype, "scaleU", {
        /**
         *
         */
        get: function () {
            return this._scaleU;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TriangleSubGeometry.prototype, "scaleV", {
        /**
         *
         */
        get: function () {
            return this._scaleV;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TriangleSubGeometry.prototype, "useCondensedIndices", {
        /**
         * Offers the option of enabling GPU accelerated animation on skeletons larger than 32 joints
         * by condensing the number of joint index values required per mesh. Only applicable to
         * skeleton animations that utilise more than one mesh object. Defaults to false.
         */
        get: function () {
            return this._useCondensedIndices;
        },
        set: function (value) {
            if (this._useCondensedIndices == value)
                return;
            this._useCondensedIndices = value;
            this.notifyJointIndicesUpdate();
        },
        enumerable: true,
        configurable: true
    });
    TriangleSubGeometry.prototype._pUpdateStrideOffset = function () {
        if (this._concatenateArrays) {
            this._pOffset[TriangleSubGeometry.VERTEX_DATA] = 0;
            //always have positions
            this._pOffset[TriangleSubGeometry.POSITION_DATA] = 0;
            var stride = 3;
            if (this._vertexNormals != null) {
                this._pOffset[TriangleSubGeometry.NORMAL_DATA] = stride;
                stride += 3;
            }
            if (this._vertexTangents != null) {
                this._pOffset[TriangleSubGeometry.TANGENT_DATA] = stride;
                stride += 3;
            }
            if (this._uvs != null) {
                this._pOffset[TriangleSubGeometry.UV_DATA] = stride;
                stride += 2;
            }
            if (this._secondaryUVs != null) {
                this._pOffset[TriangleSubGeometry.SECONDARY_UV_DATA] = stride;
                stride += 2;
            }
            if (this._jointIndices != null) {
                this._pOffset[TriangleSubGeometry.JOINT_INDEX_DATA] = stride;
                stride += this._jointsPerVertex;
            }
            if (this._jointWeights != null) {
                this._pOffset[TriangleSubGeometry.JOINT_WEIGHT_DATA] = stride;
                stride += this._jointsPerVertex;
            }
            this._pStride[TriangleSubGeometry.VERTEX_DATA] = stride;
            this._pStride[TriangleSubGeometry.POSITION_DATA] = stride;
            this._pStride[TriangleSubGeometry.NORMAL_DATA] = stride;
            this._pStride[TriangleSubGeometry.TANGENT_DATA] = stride;
            this._pStride[TriangleSubGeometry.UV_DATA] = stride;
            this._pStride[TriangleSubGeometry.SECONDARY_UV_DATA] = stride;
            this._pStride[TriangleSubGeometry.JOINT_INDEX_DATA] = stride;
            this._pStride[TriangleSubGeometry.JOINT_WEIGHT_DATA] = stride;
            var len = this._pNumVertices * stride;
            if (this._pVertices == null)
                this._pVertices = new Array(len);
            else if (this._pVertices.length != len)
                this._pVertices.length = len;
        }
        else {
            this._pOffset[TriangleSubGeometry.POSITION_DATA] = 0;
            this._pOffset[TriangleSubGeometry.NORMAL_DATA] = 0;
            this._pOffset[TriangleSubGeometry.TANGENT_DATA] = 0;
            this._pOffset[TriangleSubGeometry.UV_DATA] = 0;
            this._pOffset[TriangleSubGeometry.SECONDARY_UV_DATA] = 0;
            this._pOffset[TriangleSubGeometry.JOINT_INDEX_DATA] = 0;
            this._pOffset[TriangleSubGeometry.JOINT_WEIGHT_DATA] = 0;
            this._pStride[TriangleSubGeometry.POSITION_DATA] = 3;
            this._pStride[TriangleSubGeometry.NORMAL_DATA] = 3;
            this._pStride[TriangleSubGeometry.TANGENT_DATA] = 3;
            this._pStride[TriangleSubGeometry.UV_DATA] = 2;
            this._pStride[TriangleSubGeometry.SECONDARY_UV_DATA] = 2;
            this._pStride[TriangleSubGeometry.JOINT_INDEX_DATA] = this._jointsPerVertex;
            this._pStride[TriangleSubGeometry.JOINT_WEIGHT_DATA] = this._jointsPerVertex;
        }
        this._pStrideOffsetDirty = false;
    };
    Object.defineProperty(TriangleSubGeometry.prototype, "jointsPerVertex", {
        /**
         *
         */
        get: function () {
            return this._jointsPerVertex;
        },
        set: function (value) {
            if (this._jointsPerVertex == value)
                return;
            this._jointsPerVertex = value;
            this._pStrideOffsetDirty = true;
            if (this._pConcatenateArrays)
                this._pNotifyVerticesUpdate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TriangleSubGeometry.prototype, "autoDeriveUVs", {
        /**
         * Defines whether a UV buffer should be automatically generated to contain dummy UV coordinates.
         * Set to true if a geometry lacks UV data but uses a material that requires it, or leave as false
         * in cases where UV data is explicitly defined or the material does not require UV data.
         */
        get: function () {
            return this._autoDeriveUVs;
        },
        set: function (value) {
            if (this._autoDeriveUVs == value)
                return;
            this._autoDeriveUVs = value;
            if (value)
                this.notifyUVsUpdate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TriangleSubGeometry.prototype, "autoDeriveNormals", {
        /**
         * True if the vertex normals should be derived from the geometry, false if the vertex normals are set
         * explicitly.
         */
        get: function () {
            return this._autoDeriveNormals;
        },
        set: function (value) {
            if (this._autoDeriveNormals == value)
                return;
            this._autoDeriveNormals = value;
            if (value)
                this.notifyNormalsUpdate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TriangleSubGeometry.prototype, "autoDeriveTangents", {
        /**
         * True if the vertex tangents should be derived from the geometry, false if the vertex normals are set
         * explicitly.
         */
        get: function () {
            return this._autoDeriveTangents;
        },
        set: function (value) {
            if (this._autoDeriveTangents == value)
                return;
            this._autoDeriveTangents = value;
            if (value)
                this.notifyTangentsUpdate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TriangleSubGeometry.prototype, "vertices", {
        /**
         *
         */
        get: function () {
            if (this._positionsDirty)
                this.updatePositions(this._positions);
            if (this._vertexNormalsDirty)
                this.updateVertexNormals(this._vertexNormals);
            if (this._vertexTangentsDirty)
                this.updateVertexTangents(this._vertexTangents);
            if (this._uvsDirty)
                this.updateUVs(this._uvs);
            if (this._secondaryUVsDirty)
                this.updateSecondaryUVs(this._secondaryUVs);
            if (this._jointIndicesDirty)
                this.updateJointIndices(this._jointIndices);
            if (this._jointWeightsDirty)
                this.updateJointWeights(this._jointWeights);
            return this._pVertices;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TriangleSubGeometry.prototype, "positions", {
        /**
         *
         */
        get: function () {
            if (this._positionsDirty)
                this.updatePositions(this._positions);
            return this._positions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TriangleSubGeometry.prototype, "vertexNormals", {
        /**
         *
         */
        get: function () {
            if (this._vertexNormalsDirty)
                this.updateVertexNormals(this._vertexNormals);
            return this._vertexNormals;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TriangleSubGeometry.prototype, "vertexTangents", {
        /**
         *
         */
        get: function () {
            if (this._vertexTangentsDirty)
                this.updateVertexTangents(this._vertexTangents);
            return this._vertexTangents;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TriangleSubGeometry.prototype, "faceNormals", {
        /**
         * The raw data of the face normals, in the same order as the faces are listed in the index list.
         */
        get: function () {
            if (this._faceNormalsDirty)
                this.updateFaceNormals();
            return this._faceNormals;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TriangleSubGeometry.prototype, "faceTangents", {
        /**
         * The raw data of the face tangets, in the same order as the faces are listed in the index list.
         */
        get: function () {
            if (this._faceTangentsDirty)
                this.updateFaceTangents();
            return this._faceTangents;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TriangleSubGeometry.prototype, "uvs", {
        /**
         *
         */
        get: function () {
            if (this._uvsDirty)
                this.updateUVs(this._uvs);
            return this._uvs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TriangleSubGeometry.prototype, "secondaryUVs", {
        /**
         *
         */
        get: function () {
            if (this._secondaryUVsDirty)
                this.updateSecondaryUVs(this._secondaryUVs);
            return this._secondaryUVs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TriangleSubGeometry.prototype, "jointIndices", {
        /**
         *
         */
        get: function () {
            if (this._jointIndicesDirty)
                this.updateJointIndices(this._jointIndices);
            if (this._useCondensedIndices)
                return this._condensedJointIndices;
            return this._jointIndices;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TriangleSubGeometry.prototype, "jointWeights", {
        /**
         *
         */
        get: function () {
            if (this._jointWeightsDirty)
                this.updateJointWeights(this._jointWeights);
            return this._jointWeights;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TriangleSubGeometry.prototype, "useFaceWeights", {
        /**
         * Indicates whether or not to take the size of faces into account when auto-deriving vertex normals and tangents.
         */
        get: function () {
            return this._useFaceWeights;
        },
        set: function (value) {
            if (this._useFaceWeights == value)
                return;
            this._useFaceWeights = value;
            if (this._autoDeriveNormals)
                this.notifyNormalsUpdate();
            if (this._autoDeriveTangents)
                this.notifyTangentsUpdate();
            this._faceNormalsDirty = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TriangleSubGeometry.prototype, "numCondensedJoints", {
        get: function () {
            if (this._jointIndicesDirty)
                this.updateJointIndices(this._jointIndices);
            return this._numCondensedJoints;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TriangleSubGeometry.prototype, "condensedIndexLookUp", {
        get: function () {
            if (this._jointIndicesDirty)
                this.updateJointIndices(this._jointIndices);
            return this._condensedIndexLookUp;
        },
        enumerable: true,
        configurable: true
    });
    TriangleSubGeometry.prototype.getBoundingPositions = function () {
        if (this._positionsDirty)
            this.updatePositions(this._positions);
        return this._positions;
    };
    /**
     *
     */
    TriangleSubGeometry.prototype.updatePositions = function (values) {
        var i;
        var index;
        var stride;
        var positions;
        this._positions = values;
        if (this._positions == null)
            this._positions = new Array();
        this._pNumVertices = this._positions.length / 3;
        if (this._concatenateArrays) {
            var len = this._pNumVertices * this.getStride(TriangleSubGeometry.VERTEX_DATA);
            if (this._pVertices == null)
                this._pVertices = new Array(len);
            else if (this._pVertices.length != len)
                this._pVertices.length = len;
            i = 0;
            index = this.getOffset(TriangleSubGeometry.POSITION_DATA);
            stride = this.getStride(TriangleSubGeometry.POSITION_DATA);
            positions = this._pVertices;
            while (i < values.length) {
                positions[index] = values[i++];
                positions[index + 1] = values[i++];
                positions[index + 2] = values[i++];
                index += stride;
            }
        }
        if (this._autoDeriveNormals)
            this.notifyNormalsUpdate();
        if (this._autoDeriveTangents)
            this.notifyTangentsUpdate();
        if (this._autoDeriveUVs)
            this.notifyUVsUpdate();
        this.pInvalidateBounds();
        this.notifyPositionsUpdate();
        this._positionsDirty = false;
    };
    /**
     * Updates the vertex normals based on the geometry.
     */
    TriangleSubGeometry.prototype.updateVertexNormals = function (values) {
        var i;
        var index;
        var offset;
        var stride;
        var normals;
        if (!this._autoDeriveNormals) {
            if ((this._vertexNormals == null || values == null) && (this._vertexNormals != null || values != null)) {
                if (this._concatenateArrays)
                    this._pNotifyVerticesUpdate();
                else
                    this._pStrideOffsetDirty = true;
            }
            this._vertexNormals = values;
            if (values != null && this._concatenateArrays) {
                i = 0;
                index = this.getOffset(TriangleSubGeometry.NORMAL_DATA);
                stride = this.getStride(TriangleSubGeometry.NORMAL_DATA);
                normals = this._pVertices;
                while (i < values.length) {
                    normals[index] = values[i++];
                    normals[index + 1] = values[i++];
                    normals[index + 2] = values[i++];
                    index += stride;
                }
            }
        }
        else {
            if (this._vertexNormals == null) {
                this._vertexNormals = new Array(this._positions.length);
                if (this._concatenateArrays)
                    this._pNotifyVerticesUpdate();
                else
                    this._pStrideOffsetDirty = true;
            }
            if (this._faceNormalsDirty)
                this.updateFaceNormals();
            offset = this.getOffset(TriangleSubGeometry.NORMAL_DATA);
            stride = this.getStride(TriangleSubGeometry.NORMAL_DATA);
            //autoderived normals
            normals = this._concatenateArrays ? this._pVertices : this._vertexNormals;
            var f1 = 0;
            var f2 = 1;
            var f3 = 2;
            index = offset;
            //clear normal values
            var lenV = normals.length;
            while (index < lenV) {
                normals[index] = 0;
                normals[index + 1] = 0;
                normals[index + 2] = 0;
                index += stride;
            }
            var k = 0;
            var lenI = this._pIndices.length;
            var weight;
            i = 0;
            while (i < lenI) {
                weight = this._useFaceWeights ? this._faceWeights[k++] : 1;
                index = offset + this._pIndices[i++] * stride;
                normals[index] += this._faceNormals[f1] * weight;
                normals[index + 1] += this._faceNormals[f2] * weight;
                normals[index + 2] += this._faceNormals[f3] * weight;
                index = offset + this._pIndices[i++] * stride;
                normals[index] += this._faceNormals[f1] * weight;
                normals[index + 1] += this._faceNormals[f2] * weight;
                normals[index + 2] += this._faceNormals[f3] * weight;
                index = offset + this._pIndices[i++] * stride;
                normals[index] += this._faceNormals[f1] * weight;
                normals[index + 1] += this._faceNormals[f2] * weight;
                normals[index + 2] += this._faceNormals[f3] * weight;
                f1 += 3;
                f2 += 3;
                f3 += 3;
            }
            i = 0;
            index = offset;
            while (index < lenV) {
                var vx = normals[index];
                var vy = normals[index + 1];
                var vz = normals[index + 2];
                var d = 1.0 / Math.sqrt(vx * vx + vy * vy + vz * vz);
                if (this._concatenateArrays) {
                    this._vertexNormals[i++] = normals[index] = vx * d;
                    this._vertexNormals[i++] = normals[index + 1] = vy * d;
                    this._vertexNormals[i++] = normals[index + 2] = vz * d;
                }
                else {
                    normals[index] = vx * d;
                    normals[index + 1] = vy * d;
                    normals[index + 2] = vz * d;
                }
                index += stride;
            }
        }
        this.notifyNormalsUpdate();
        this._vertexNormalsDirty = false;
    };
    /**
     * Updates the vertex tangents based on the geometry.
     */
    TriangleSubGeometry.prototype.updateVertexTangents = function (values) {
        var i;
        var index;
        var offset;
        var stride;
        var tangents;
        if (!this._autoDeriveTangents) {
            if ((this._vertexTangents == null || values == null) && (this._vertexTangents != null || values != null)) {
                if (this._concatenateArrays)
                    this._pNotifyVerticesUpdate();
                else
                    this._pStrideOffsetDirty = true;
            }
            this._vertexTangents = values;
            if (values != null && this._concatenateArrays) {
                i = 0;
                index = this.getOffset(TriangleSubGeometry.TANGENT_DATA);
                stride = this.getStride(TriangleSubGeometry.TANGENT_DATA);
                tangents = this._pVertices;
                while (i < values.length) {
                    tangents[index] = values[i++];
                    tangents[index + 1] = values[i++];
                    tangents[index + 2] = values[i++];
                    index += stride;
                }
            }
        }
        else {
            if (this._vertexTangents == null) {
                this._vertexTangents = new Array(this._positions.length);
                if (this._concatenateArrays)
                    this._pNotifyVerticesUpdate();
                else
                    this._pStrideOffsetDirty = true;
            }
            if (this._faceTangentsDirty)
                this.updateFaceTangents();
            offset = this.getOffset(TriangleSubGeometry.TANGENT_DATA);
            stride = this.getStride(TriangleSubGeometry.TANGENT_DATA);
            //autoderived tangents
            tangents = this._concatenateArrays ? this._pVertices : this._vertexTangents;
            index = offset;
            //clear tangent values
            var lenV = tangents.length;
            while (index < lenV) {
                tangents[index] = 0;
                tangents[index + 1] = 0;
                tangents[index + 2] = 0;
                index += stride;
            }
            var k = 0;
            var weight;
            var f1 = 0;
            var f2 = 1;
            var f3 = 2;
            i = 0;
            //collect face tangents
            var lenI = this._pIndices.length;
            while (i < lenI) {
                weight = this._useFaceWeights ? this._faceWeights[k++] : 1;
                index = offset + this._pIndices[i++] * stride;
                tangents[index++] += this._faceTangents[f1] * weight;
                tangents[index++] += this._faceTangents[f2] * weight;
                tangents[index] += this._faceTangents[f3] * weight;
                index = offset + this._pIndices[i++] * stride;
                tangents[index++] += this._faceTangents[f1] * weight;
                tangents[index++] += this._faceTangents[f2] * weight;
                tangents[index] += this._faceTangents[f3] * weight;
                index = offset + this._pIndices[i++] * stride;
                tangents[index++] += this._faceTangents[f1] * weight;
                tangents[index++] += this._faceTangents[f2] * weight;
                tangents[index] += this._faceTangents[f3] * weight;
                f1 += 3;
                f2 += 3;
                f3 += 3;
            }
            i = 0;
            index = offset;
            while (index < lenV) {
                var vx = tangents[index];
                var vy = tangents[index + 1];
                var vz = tangents[index + 2];
                var d = 1.0 / Math.sqrt(vx * vx + vy * vy + vz * vz);
                if (this._concatenateArrays) {
                    this._vertexTangents[i++] = tangents[index] = vx * d;
                    this._vertexTangents[i++] = tangents[index + 1] = vy * d;
                    this._vertexTangents[i++] = tangents[index + 2] = vz * d;
                }
                else {
                    tangents[index] = vx * d;
                    tangents[index + 1] = vy * d;
                    tangents[index + 2] = vz * d;
                }
                index += stride;
            }
        }
        this.notifyTangentsUpdate();
        this._vertexTangentsDirty = false;
    };
    /**
     * Updates the uvs based on the geometry.
     */
    TriangleSubGeometry.prototype.updateUVs = function (values) {
        var i;
        var index;
        var offset;
        var stride;
        var uvs;
        if (!this._autoDeriveUVs) {
            if ((this._uvs == null || values == null) && (this._uvs != null || values != null)) {
                if (this._concatenateArrays)
                    this._pNotifyVerticesUpdate();
                else
                    this._pStrideOffsetDirty = true;
            }
            this._uvs = values;
            if (values != null && this._concatenateArrays) {
                i = 0;
                index = this.getOffset(TriangleSubGeometry.UV_DATA);
                stride = this.getStride(TriangleSubGeometry.UV_DATA);
                uvs = this._pVertices;
                while (i < values.length) {
                    uvs[index] = values[i++];
                    uvs[index + 1] = values[i++];
                    index += stride;
                }
            }
        }
        else {
            if (this._uvs == null) {
                this._uvs = new Array(this._positions.length * 2 / 3);
                if (this._concatenateArrays)
                    this._pNotifyVerticesUpdate();
                else
                    this._pStrideOffsetDirty = true;
            }
            offset = this.getOffset(TriangleSubGeometry.UV_DATA);
            stride = this.getStride(TriangleSubGeometry.UV_DATA);
            //autoderived uvs
            uvs = this._concatenateArrays ? this._pVertices : this._uvs;
            i = 0;
            index = offset;
            var uvIdx = 0;
            //clear uv values
            var lenV = uvs.length;
            while (index < lenV) {
                if (this._concatenateArrays) {
                    this._uvs[i++] = uvs[index] = uvIdx * .5;
                    this._uvs[i++] = uvs[index + 1] = 1.0 - (uvIdx & 1);
                }
                else {
                    uvs[index] = uvIdx * .5;
                    uvs[index + 1] = 1.0 - (uvIdx & 1);
                }
                if (++uvIdx == 3)
                    uvIdx = 0;
                index += stride;
            }
        }
        if (this._autoDeriveTangents)
            this.notifyTangentsUpdate();
        this.notifyUVsUpdate();
        this._uvsDirty = false;
    };
    /**
     * Updates the secondary uvs based on the geometry.
     */
    TriangleSubGeometry.prototype.updateSecondaryUVs = function (values) {
        var i;
        var index;
        var offset;
        var stride;
        var uvs;
        if (this._concatenateArrays && (this._secondaryUVs == null || values == null) && (this._secondaryUVs != null || values != null))
            this._pNotifyVerticesUpdate();
        this._secondaryUVs = values;
        if (values != null && this._concatenateArrays) {
            offset = this.getOffset(TriangleSubGeometry.SECONDARY_UV_DATA);
            stride = this.getStride(TriangleSubGeometry.SECONDARY_UV_DATA);
            i = 0;
            index = offset;
            uvs = this._pVertices;
            while (i < values.length) {
                uvs[index] = values[i++];
                uvs[index + 1] = values[i++];
                index += stride;
            }
        }
        this.notifySecondaryUVsUpdate();
        this._secondaryUVsDirty = false;
    };
    /**
     * Updates the joint indices
     */
    TriangleSubGeometry.prototype.updateJointIndices = function (values) {
        var i;
        var j;
        var index;
        var offset;
        var stride;
        var jointIndices;
        if (this._concatenateArrays && (this._jointIndices == null || values == null) && (this._jointIndices != null || values != null))
            this._pNotifyVerticesUpdate();
        this._jointIndices = values;
        if (values != null) {
            offset = this.getOffset(TriangleSubGeometry.JOINT_INDEX_DATA);
            stride = this.getStride(TriangleSubGeometry.JOINT_INDEX_DATA);
            if (this._useCondensedIndices) {
                i = 0;
                j = 0;
                index = offset;
                jointIndices = this._concatenateArrays ? this._pVertices : this._condensedJointIndices;
                var oldIndex;
                var newIndex = 0;
                var dic = new Object();
                if (!this._concatenateArrays)
                    this._condensedJointIndices = new Array(values.length);
                this._condensedIndexLookUp = new Array();
                while (i < values.length) {
                    for (j = 0; j < this._jointsPerVertex; j++) {
                        oldIndex = values[i++];
                        // if we encounter a new index, assign it a new condensed index
                        if (dic[oldIndex] == undefined) {
                            dic[oldIndex] = newIndex * 3; //3 required for the three vectors that store the matrix
                            this._condensedIndexLookUp[newIndex++] = oldIndex;
                        }
                        jointIndices[index + j] = dic[oldIndex];
                    }
                    index += stride;
                }
                this._numCondensedJoints = newIndex;
            }
            else if (this._concatenateArrays) {
                i = 0;
                index = offset;
                jointIndices = this._pVertices;
                while (i < values.length) {
                    j = 0;
                    while (j < this._jointsPerVertex)
                        jointIndices[index + j++] = values[i++];
                    index += stride;
                }
            }
        }
        this.notifyJointIndicesUpdate();
        this._jointIndicesDirty = false;
    };
    /**
     * Updates the joint weights.
     */
    TriangleSubGeometry.prototype.updateJointWeights = function (values) {
        var i;
        var j;
        var index;
        var offset;
        var stride;
        var jointWeights;
        if (this._concatenateArrays && (this._jointWeights == null || values == null) && (this._jointWeights != null || values != null))
            this._pNotifyVerticesUpdate();
        this._jointWeights = values;
        if (values != null && this._concatenateArrays) {
            offset = this.getOffset(TriangleSubGeometry.JOINT_WEIGHT_DATA);
            stride = this.getStride(TriangleSubGeometry.JOINT_WEIGHT_DATA);
            i = 0;
            index = offset;
            jointWeights = this._pVertices;
            while (i < values.length) {
                j = 0;
                while (j < this._jointsPerVertex)
                    jointWeights[index + j++] = values[i++];
                index += stride;
            }
        }
        this.notifyJointWeightsUpdate();
        this._jointWeightsDirty = false;
    };
    /**
     *
     */
    TriangleSubGeometry.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._positions = null;
        this._vertexNormals = null;
        this._vertexTangents = null;
        this._uvs = null;
        this._secondaryUVs = null;
        this._jointIndices = null;
        this._jointWeights = null;
        this._faceNormals = null;
        this._faceWeights = null;
        this._faceTangents = null;
    };
    /**
     * Updates the face indices of the TriangleSubGeometry.
     *
     * @param indices The face indices to upload.
     */
    TriangleSubGeometry.prototype.updateIndices = function (indices) {
        _super.prototype.updateIndices.call(this, indices);
        this._faceNormalsDirty = true;
        if (this._autoDeriveNormals)
            this._vertexNormalsDirty = true;
        if (this._autoDeriveTangents)
            this._vertexTangentsDirty = true;
        if (this._autoDeriveUVs)
            this._uvsDirty = true;
    };
    /**
     * Clones the current object
     * @return An exact duplicate of the current object.
     */
    TriangleSubGeometry.prototype.clone = function () {
        var clone = new TriangleSubGeometry(this._concatenateArrays);
        clone.updateIndices(this._pIndices.concat());
        clone.updatePositions(this._positions.concat());
        if (this._vertexNormals && !this._autoDeriveNormals)
            clone.updateVertexNormals(this._vertexNormals.concat());
        else
            clone.updateVertexNormals(null);
        if (this._uvs && !this._autoDeriveUVs)
            clone.updateUVs(this._uvs.concat());
        else
            clone.updateUVs(null);
        if (this._vertexTangents && !this._autoDeriveTangents)
            clone.updateVertexTangents(this._vertexTangents.concat());
        else
            clone.updateVertexTangents(null);
        if (this._secondaryUVs)
            clone.updateSecondaryUVs(this._secondaryUVs.concat());
        if (this._jointIndices) {
            clone.jointsPerVertex = this._jointsPerVertex;
            clone.updateJointIndices(this._jointIndices.concat());
        }
        if (this._jointWeights)
            clone.updateJointWeights(this._jointWeights.concat());
        return clone;
    };
    TriangleSubGeometry.prototype.scaleUV = function (scaleU, scaleV) {
        if (scaleU === void 0) { scaleU = 1; }
        if (scaleV === void 0) { scaleV = 1; }
        var index;
        var offset;
        var stride;
        var uvs;
        uvs = this._uvs;
        var ratioU = scaleU / this._scaleU;
        var ratioV = scaleV / this._scaleV;
        this._scaleU = scaleU;
        this._scaleV = scaleV;
        var len = uvs.length;
        offset = 0;
        stride = 2;
        index = offset;
        while (index < len) {
            uvs[index] *= ratioU;
            uvs[index + 1] *= ratioV;
            index += stride;
        }
        this.notifyUVsUpdate();
    };
    /**
     * Scales the geometry.
     * @param scale The amount by which to scale.
     */
    TriangleSubGeometry.prototype.scale = function (scale) {
        var i;
        var index;
        var offset;
        var stride;
        var positions;
        positions = this._positions;
        var len = positions.length;
        offset = 0;
        stride = 3;
        i = 0;
        index = offset;
        while (i < len) {
            positions[index] *= scale;
            positions[index + 1] *= scale;
            positions[index + 2] *= scale;
            i += 3;
            index += stride;
        }
        this.notifyPositionsUpdate();
    };
    TriangleSubGeometry.prototype.applyTransformation = function (transform) {
        var positions;
        var normals;
        var tangents;
        if (this._concatenateArrays) {
            positions = this._pVertices;
            normals = this._pVertices;
            tangents = this._pVertices;
        }
        else {
            positions = this._positions;
            normals = this._vertexNormals;
            tangents = this._vertexTangents;
        }
        var len = this._positions.length / 3;
        var i;
        var i1;
        var i2;
        var vector = new Vector3D();
        var bakeNormals = this._vertexNormals != null;
        var bakeTangents = this._vertexTangents != null;
        var invTranspose;
        if (bakeNormals || bakeTangents) {
            invTranspose = transform.clone();
            invTranspose.invert();
            invTranspose.transpose();
        }
        var vi0 = this.getOffset(TriangleSubGeometry.POSITION_DATA);
        var ni0 = this.getOffset(TriangleSubGeometry.NORMAL_DATA);
        var ti0 = this.getOffset(TriangleSubGeometry.TANGENT_DATA);
        var vStride = this.getStride(TriangleSubGeometry.POSITION_DATA);
        var nStride = this.getStride(TriangleSubGeometry.NORMAL_DATA);
        var tStride = this.getStride(TriangleSubGeometry.TANGENT_DATA);
        for (i = 0; i < len; ++i) {
            i1 = vi0 + 1;
            i2 = vi0 + 2;
            // bake position
            vector.x = positions[vi0];
            vector.y = positions[i1];
            vector.z = positions[i2];
            vector = transform.transformVector(vector);
            positions[vi0] = vector.x;
            positions[i1] = vector.y;
            positions[i2] = vector.z;
            vi0 += vStride;
            // bake normal
            if (bakeNormals) {
                i1 = ni0 + 1;
                i2 = ni0 + 2;
                vector.x = normals[ni0];
                vector.y = normals[i1];
                vector.z = normals[i2];
                vector = invTranspose.deltaTransformVector(vector);
                vector.normalize();
                normals[ni0] = vector.x;
                normals[i1] = vector.y;
                normals[i2] = vector.z;
                ni0 += nStride;
            }
            // bake tangent
            if (bakeTangents) {
                i1 = ti0 + 1;
                i2 = ti0 + 2;
                vector.x = tangents[ti0];
                vector.y = tangents[i1];
                vector.z = tangents[i2];
                vector = invTranspose.deltaTransformVector(vector);
                vector.normalize();
                tangents[ti0] = vector.x;
                tangents[i1] = vector.y;
                tangents[i2] = vector.z;
                ti0 += tStride;
            }
        }
        this.notifyPositionsUpdate();
        this.notifyNormalsUpdate();
        this.notifyTangentsUpdate();
    };
    /**
     * Updates the tangents for each face.
     */
    TriangleSubGeometry.prototype.updateFaceTangents = function () {
        var i = 0;
        var index1;
        var index2;
        var index3;
        var vi;
        var v0;
        var dv1;
        var dv2;
        var denom;
        var x0, y0, z0;
        var dx1, dy1, dz1;
        var dx2, dy2, dz2;
        var cx, cy, cz;
        var positions = this._positions;
        var uvs = this._uvs;
        var len = this._pIndices.length;
        if (this._faceTangents == null)
            this._faceTangents = new Array(len);
        while (i < len) {
            index1 = this._pIndices[i];
            index2 = this._pIndices[i + 1];
            index3 = this._pIndices[i + 2];
            v0 = uvs[index1 * 2 + 1];
            dv1 = uvs[index2 * 2 + 1] - v0;
            dv2 = uvs[index3 * 2 + 1] - v0;
            vi = index1 * 3;
            x0 = positions[vi];
            y0 = positions[vi + 1];
            z0 = positions[vi + 2];
            vi = index2 * 3;
            dx1 = positions[vi] - x0;
            dy1 = positions[vi + 1] - y0;
            dz1 = positions[vi + 2] - z0;
            vi = index3 * 3;
            dx2 = positions[vi] - x0;
            dy2 = positions[vi + 1] - y0;
            dz2 = positions[vi + 2] - z0;
            cx = dv2 * dx1 - dv1 * dx2;
            cy = dv2 * dy1 - dv1 * dy2;
            cz = dv2 * dz1 - dv1 * dz2;
            denom = 1 / Math.sqrt(cx * cx + cy * cy + cz * cz);
            this._faceTangents[i++] = denom * cx;
            this._faceTangents[i++] = denom * cy;
            this._faceTangents[i++] = denom * cz;
        }
        this._faceTangentsDirty = false;
    };
    /**
     * Updates the normals for each face.
     */
    TriangleSubGeometry.prototype.updateFaceNormals = function () {
        var i = 0;
        var j = 0;
        var k = 0;
        var index;
        var offset;
        var stride;
        var x1, x2, x3;
        var y1, y2, y3;
        var z1, z2, z3;
        var dx1, dy1, dz1;
        var dx2, dy2, dz2;
        var cx, cy, cz;
        var d;
        var positions = this._positions;
        var len = this._pIndices.length;
        if (this._faceNormals == null)
            this._faceNormals = new Array(len);
        if (this._useFaceWeights && this._faceWeights == null)
            this._faceWeights = new Array(len / 3);
        while (i < len) {
            index = this._pIndices[i++] * 3;
            x1 = positions[index];
            y1 = positions[index + 1];
            z1 = positions[index + 2];
            index = this._pIndices[i++] * 3;
            x2 = positions[index];
            y2 = positions[index + 1];
            z2 = positions[index + 2];
            index = this._pIndices[i++] * 3;
            x3 = positions[index];
            y3 = positions[index + 1];
            z3 = positions[index + 2];
            dx1 = x3 - x1;
            dy1 = y3 - y1;
            dz1 = z3 - z1;
            dx2 = x2 - x1;
            dy2 = y2 - y1;
            dz2 = z2 - z1;
            cx = dz1 * dy2 - dy1 * dz2;
            cy = dx1 * dz2 - dz1 * dx2;
            cz = dy1 * dx2 - dx1 * dy2;
            d = Math.sqrt(cx * cx + cy * cy + cz * cz);
            // length of cross product = 2*triangle area
            if (this._useFaceWeights) {
                var w = d * 10000;
                if (w < 1)
                    w = 1;
                this._faceWeights[k++] = w;
            }
            d = 1 / d;
            this._faceNormals[j++] = cx * d;
            this._faceNormals[j++] = cy * d;
            this._faceNormals[j++] = cz * d;
        }
        this._faceNormalsDirty = false;
    };
    TriangleSubGeometry.prototype._pNotifyVerticesUpdate = function () {
        this._pStrideOffsetDirty = true;
        this.notifyPositionsUpdate();
        this.notifyNormalsUpdate();
        this.notifyTangentsUpdate();
        this.notifyUVsUpdate();
        this.notifySecondaryUVsUpdate();
        this.notifyJointIndicesUpdate();
        this.notifyJointWeightsUpdate();
    };
    TriangleSubGeometry.prototype.notifyPositionsUpdate = function () {
        if (this._positionsDirty)
            return;
        this._positionsDirty = true;
        if (!this._positionsUpdated)
            this._positionsUpdated = new SubGeometryEvent(SubGeometryEvent.VERTICES_UPDATED, TriangleSubGeometry.POSITION_DATA);
        this.dispatchEvent(this._positionsUpdated);
    };
    TriangleSubGeometry.prototype.notifyNormalsUpdate = function () {
        if (this._vertexNormalsDirty)
            return;
        this._vertexNormalsDirty = true;
        if (!this._normalsUpdated)
            this._normalsUpdated = new SubGeometryEvent(SubGeometryEvent.VERTICES_UPDATED, TriangleSubGeometry.NORMAL_DATA);
        this.dispatchEvent(this._normalsUpdated);
    };
    TriangleSubGeometry.prototype.notifyTangentsUpdate = function () {
        if (this._vertexTangentsDirty)
            return;
        this._vertexTangentsDirty = true;
        if (!this._tangentsUpdated)
            this._tangentsUpdated = new SubGeometryEvent(SubGeometryEvent.VERTICES_UPDATED, TriangleSubGeometry.TANGENT_DATA);
        this.dispatchEvent(this._tangentsUpdated);
    };
    TriangleSubGeometry.prototype.notifyUVsUpdate = function () {
        if (this._uvsDirty)
            return;
        this._uvsDirty = true;
        if (!this._uvsUpdated)
            this._uvsUpdated = new SubGeometryEvent(SubGeometryEvent.VERTICES_UPDATED, TriangleSubGeometry.UV_DATA);
        this.dispatchEvent(this._uvsUpdated);
    };
    TriangleSubGeometry.prototype.notifySecondaryUVsUpdate = function () {
        if (this._secondaryUVsDirty)
            return;
        this._secondaryUVsDirty = true;
        if (!this._secondaryUVsUpdated)
            this._secondaryUVsUpdated = new SubGeometryEvent(SubGeometryEvent.VERTICES_UPDATED, TriangleSubGeometry.SECONDARY_UV_DATA);
        this.dispatchEvent(this._secondaryUVsUpdated);
    };
    TriangleSubGeometry.prototype.notifyJointIndicesUpdate = function () {
        if (this._jointIndicesDirty)
            return;
        this._jointIndicesDirty = true;
        if (!this._jointIndicesUpdated)
            this._jointIndicesUpdated = new SubGeometryEvent(SubGeometryEvent.VERTICES_UPDATED, TriangleSubGeometry.JOINT_INDEX_DATA);
        this.dispatchEvent(this._jointIndicesUpdated);
    };
    TriangleSubGeometry.prototype.notifyJointWeightsUpdate = function () {
        if (this._jointWeightsDirty)
            return;
        this._jointWeightsDirty = true;
        if (!this._jointWeightsUpdated)
            this._jointWeightsUpdated = new SubGeometryEvent(SubGeometryEvent.VERTICES_UPDATED, TriangleSubGeometry.JOINT_WEIGHT_DATA);
        this.dispatchEvent(this._jointWeightsUpdated);
    };
    TriangleSubGeometry.POSITION_DATA = "positions";
    TriangleSubGeometry.NORMAL_DATA = "vertexNormals";
    TriangleSubGeometry.TANGENT_DATA = "vertexTangents";
    TriangleSubGeometry.UV_DATA = "uvs";
    TriangleSubGeometry.SECONDARY_UV_DATA = "secondaryUVs";
    TriangleSubGeometry.JOINT_INDEX_DATA = "jointIndices";
    TriangleSubGeometry.JOINT_WEIGHT_DATA = "jointWeights";
    //TODO - move these to StageGL
    TriangleSubGeometry.POSITION_FORMAT = "float3";
    TriangleSubGeometry.NORMAL_FORMAT = "float3";
    TriangleSubGeometry.TANGENT_FORMAT = "float3";
    TriangleSubGeometry.UV_FORMAT = "float2";
    TriangleSubGeometry.SECONDARY_UV_FORMAT = "float2";
    return TriangleSubGeometry;
})(SubGeometryBase);
module.exports = TriangleSubGeometry;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL1RyaWFuZ2xlU3ViR2VvbWV0cnkudHMiXSwibmFtZXMiOlsiVHJpYW5nbGVTdWJHZW9tZXRyeSIsIlRyaWFuZ2xlU3ViR2VvbWV0cnkuY29uc3RydWN0b3IiLCJUcmlhbmdsZVN1Ykdlb21ldHJ5LnNjYWxlVSIsIlRyaWFuZ2xlU3ViR2VvbWV0cnkuc2NhbGVWIiwiVHJpYW5nbGVTdWJHZW9tZXRyeS51c2VDb25kZW5zZWRJbmRpY2VzIiwiVHJpYW5nbGVTdWJHZW9tZXRyeS5fcFVwZGF0ZVN0cmlkZU9mZnNldCIsIlRyaWFuZ2xlU3ViR2VvbWV0cnkuam9pbnRzUGVyVmVydGV4IiwiVHJpYW5nbGVTdWJHZW9tZXRyeS5hdXRvRGVyaXZlVVZzIiwiVHJpYW5nbGVTdWJHZW9tZXRyeS5hdXRvRGVyaXZlTm9ybWFscyIsIlRyaWFuZ2xlU3ViR2VvbWV0cnkuYXV0b0Rlcml2ZVRhbmdlbnRzIiwiVHJpYW5nbGVTdWJHZW9tZXRyeS52ZXJ0aWNlcyIsIlRyaWFuZ2xlU3ViR2VvbWV0cnkucG9zaXRpb25zIiwiVHJpYW5nbGVTdWJHZW9tZXRyeS52ZXJ0ZXhOb3JtYWxzIiwiVHJpYW5nbGVTdWJHZW9tZXRyeS52ZXJ0ZXhUYW5nZW50cyIsIlRyaWFuZ2xlU3ViR2VvbWV0cnkuZmFjZU5vcm1hbHMiLCJUcmlhbmdsZVN1Ykdlb21ldHJ5LmZhY2VUYW5nZW50cyIsIlRyaWFuZ2xlU3ViR2VvbWV0cnkudXZzIiwiVHJpYW5nbGVTdWJHZW9tZXRyeS5zZWNvbmRhcnlVVnMiLCJUcmlhbmdsZVN1Ykdlb21ldHJ5LmpvaW50SW5kaWNlcyIsIlRyaWFuZ2xlU3ViR2VvbWV0cnkuam9pbnRXZWlnaHRzIiwiVHJpYW5nbGVTdWJHZW9tZXRyeS51c2VGYWNlV2VpZ2h0cyIsIlRyaWFuZ2xlU3ViR2VvbWV0cnkubnVtQ29uZGVuc2VkSm9pbnRzIiwiVHJpYW5nbGVTdWJHZW9tZXRyeS5jb25kZW5zZWRJbmRleExvb2tVcCIsIlRyaWFuZ2xlU3ViR2VvbWV0cnkuZ2V0Qm91bmRpbmdQb3NpdGlvbnMiLCJUcmlhbmdsZVN1Ykdlb21ldHJ5LnVwZGF0ZVBvc2l0aW9ucyIsIlRyaWFuZ2xlU3ViR2VvbWV0cnkudXBkYXRlVmVydGV4Tm9ybWFscyIsIlRyaWFuZ2xlU3ViR2VvbWV0cnkudXBkYXRlVmVydGV4VGFuZ2VudHMiLCJUcmlhbmdsZVN1Ykdlb21ldHJ5LnVwZGF0ZVVWcyIsIlRyaWFuZ2xlU3ViR2VvbWV0cnkudXBkYXRlU2Vjb25kYXJ5VVZzIiwiVHJpYW5nbGVTdWJHZW9tZXRyeS51cGRhdGVKb2ludEluZGljZXMiLCJUcmlhbmdsZVN1Ykdlb21ldHJ5LnVwZGF0ZUpvaW50V2VpZ2h0cyIsIlRyaWFuZ2xlU3ViR2VvbWV0cnkuZGlzcG9zZSIsIlRyaWFuZ2xlU3ViR2VvbWV0cnkudXBkYXRlSW5kaWNlcyIsIlRyaWFuZ2xlU3ViR2VvbWV0cnkuY2xvbmUiLCJUcmlhbmdsZVN1Ykdlb21ldHJ5LnNjYWxlVVYiLCJUcmlhbmdsZVN1Ykdlb21ldHJ5LnNjYWxlIiwiVHJpYW5nbGVTdWJHZW9tZXRyeS5hcHBseVRyYW5zZm9ybWF0aW9uIiwiVHJpYW5nbGVTdWJHZW9tZXRyeS51cGRhdGVGYWNlVGFuZ2VudHMiLCJUcmlhbmdsZVN1Ykdlb21ldHJ5LnVwZGF0ZUZhY2VOb3JtYWxzIiwiVHJpYW5nbGVTdWJHZW9tZXRyeS5fcE5vdGlmeVZlcnRpY2VzVXBkYXRlIiwiVHJpYW5nbGVTdWJHZW9tZXRyeS5ub3RpZnlQb3NpdGlvbnNVcGRhdGUiLCJUcmlhbmdsZVN1Ykdlb21ldHJ5Lm5vdGlmeU5vcm1hbHNVcGRhdGUiLCJUcmlhbmdsZVN1Ykdlb21ldHJ5Lm5vdGlmeVRhbmdlbnRzVXBkYXRlIiwiVHJpYW5nbGVTdWJHZW9tZXRyeS5ub3RpZnlVVnNVcGRhdGUiLCJUcmlhbmdsZVN1Ykdlb21ldHJ5Lm5vdGlmeVNlY29uZGFyeVVWc1VwZGF0ZSIsIlRyaWFuZ2xlU3ViR2VvbWV0cnkubm90aWZ5Sm9pbnRJbmRpY2VzVXBkYXRlIiwiVHJp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RXZDQSxJQUFJQSxDQUFDQSxhQUFhQSxHQUFHQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxNQUFNQSxHQUFDQSxDQUFDQSxDQUFDQTtRQUU5Q0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUM3QkEsSUFBSUEsR0FBR0EsR0FBVUEsSUFBSUEsQ0FBQ0EsYUFBYUEsR0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQTtZQUVwRkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsSUFBSUEsSUFBSUEsQ0FBQ0E7Z0JBQzNCQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxJQUFJQSxLQUFLQSxDQUFTQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUMxQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsTUFBTUEsSUFBSUEsR0FBR0EsQ0FBQ0E7Z0JBQ3RDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxNQUFNQSxHQUFHQSxHQUFHQSxDQUFDQTtZQUU5QkEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDTkEsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFDQTtZQUMxREEsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFDQTtZQUMzREEsU0FBU0EsR0FBR0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0E7WUFFNUJBLE9BQU9BLENBQUNBLEdBQUdBLE1BQU1BLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBO2dCQUMxQkEsU0FBU0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsR0FBR0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7Z0JBQy9CQSxTQUFTQSxDQUFDQSxLQUFLQSxHQUFHQSxD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LENBQUNBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLE1BQU1BLENBQUNBO2dCQUNuREEsT0FBT0EsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsTUFBTUEsQ0FBQ0E7Z0JBQ25EQSxLQUFLQSxHQUFHQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFDQSxNQUFNQSxDQUFDQTtnQkFDNUNBLE9BQU9BLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLE1BQU1BLENBQUNBO2dCQUMvQ0EsT0FBT0EsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsTUFBTUEsQ0FBQ0E7Z0JBQ25EQSxPQUFPQSxDQUFDQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFDQSxNQUFNQSxDQUFDQTtnQkFDbkRBLEtBQUtBLEdBQUdBLE1BQU1BLEdBQUdBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLE1BQU1BLENBQUNBO2dCQUM1Q0EsT0FBT0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsTUFBTUEsQ0FBQ0E7Z0JBQy9DQSxPQUFPQSxDQUFDQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFDQSxNQUFNQSxDQUFDQTtnQkFDbkRBLE9BQU9BLENBQUNBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNB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QUlBLElBQUlBLElBQUlBLE1BQU1BLElBQUlBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUMxR0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQTtvQkFDM0JBLElBQUlBLENBQUNBLHNCQUFzQkEsRUFBRUEsQ0FBQ0E7Z0JBQy9CQSxJQUFJQTtvQkFDSEEsSUFBSUEsQ0FBQ0EsbUJBQW1CQSxHQUFHQSxJQUFJQSxDQUFDQTtZQUNsQ0EsQ0FBQ0E7WUFHREEsSUFBSUEsQ0FBQ0EsZUFBZUEsR0FBR0EsTUFBTUEsQ0FBQ0E7WUFFOUJBLEVBQUVBLENBQUNBLENBQUNBLE1BQU1BLElBQUlBLElBQUlBLElBQUlBLElBQUlBLENBQUNBLGtCQUFrQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQy9DQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFDTkEsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQTtnQkFDekRBLE1BQU1BLEdBQUdBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLG1CQUFtQkEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0E7Z0JBQzFEQSxRQUFRQSxHQUFHQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQTtnQkFFM0JBLE9BQU9BLENBQUNBLEdBQUdBLE1BQU1BLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBO29CQUMxQkEsUUFBUUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsR0FBR0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7b0JBQzlCQSxRQUFRQSxDQUFDQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxNQUFNQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTtvQkFDbENBLFFBQVFBLENBQUNBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLE1BQU1BLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBO29CQUNsQ0EsS0FBS0EsSUFBSUEs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LEVBQUVBLENBQUNBO1lBRTdCQSxFQUFFQSxHQUFHQSxNQUFNQSxHQUFDQSxDQUFDQSxDQUFDQTtZQUNkQSxFQUFFQSxHQUFHQSxTQUFTQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTtZQUNuQkEsRUFBRUEsR0FBR0EsU0FBU0EsQ0FBQ0EsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDdkJBLEVBQUVBLEdBQUdBLFNBQVNBLENBQUNBLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO1lBQ3ZCQSxFQUFFQSxHQUFHQSxNQUFNQSxHQUFDQSxDQUFDQSxDQUFDQTtZQUNkQSxHQUFHQSxHQUFHQSxTQUFTQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTtZQUN6QkEsR0FBR0EsR0FBR0EsU0FBU0EsQ0FBQ0EsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7WUFDN0JBLEdBQUdBLEdBQUdBLFNBQVNBLENBQUNBLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO1lBQzdCQSxFQUFFQSxHQUFHQSxNQUFNQSxHQUFDQSxDQUFDQSxDQUFDQTtZQUNkQSxHQUFHQSxHQUFHQSxTQUFTQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTtZQUN6QkEsR0FBR0EsR0FBR0EsU0FBU0EsQ0FBQ0EsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7WUFDN0JBLEdBQUdBLEdBQUdBLFNBQVNBLENBQUNBLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO1lBRTdCQSxFQUFFQSxHQUFHQSxHQUFHQSxHQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFDQSxHQUFHQSxDQUFDQTtZQUN2QkEsRUFBRUEsR0FBR0EsR0FBR0EsR0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBQ0EsR0FBR0EsQ0FBQ0E7WUFDdkJBLEVBQUVBLEdBQUdBLEdBQUdBLEdBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUNBLEdBQUdBLENBQUNBO1lBQ3ZCQSxLQUFLQSxHQUFHQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxHQUFDQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFDQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTtZQUUzQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsS0FBS0EsR0FBQ0EsRUFBRUEsQ0FBQ0E7WUFDbkNBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLEtBQUtBLEdBQUNBLEVBQUVBLENBQUNBO1lBQ25DQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxLQUFLQSxHQUFDQSxFQUFFQSxDQUFDQTtRQUNwQ0EsQ0FBQ0E7UUFFREEsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxHQUFHQSxLQUFLQSxDQUFDQTtJQUNqQ0EsQ0FBQ0E7SUFFRHJDOztPQUVHQTtJQUNLQSwrQ0FBaUJBLEdBQXpCQTtRQUVDc0MsSUFBSUEsQ0FBQ0EsR0FBVUEsQ0FBQ0EsQ0FBQ0E7UUFDakJBLElBQUlBLENBQUNBLEdBQVVBLENBQUNBLENBQUNBO1FBQ2pCQSxJQUFJQSxDQUFDQSxHQUFVQSxDQUFDQSxDQUFDQTtRQUNqQkEsSUFBSUEsS0FBWUEsQ0FBQ0E7UUFDakJBLElBQUlBLE1BQWFBLENBQUNBO1FBQ2xCQSxJQUFJQSxNQUFhQSxDQUFDQTtRQUVsQkEsSUFBSUEsRUFBU0EsRUFBRUEsRUFBU0EsRUFBRUEsRUFBU0EsQ0FBQ0E7UUFDcENBLElBQUlBLEVBQVNBLEVBQUVBLEVBQVNBLEVBQUVBLEVBQVNBLENBQUNBO1FBQ3BDQSxJQUFJQSxFQUFTQSxFQUFFQSxFQUFTQSxFQUFFQSxFQUFTQSxDQUFDQTtRQUNwQ0EsSUFBSUEsR0FBVUEsRUFBRUEsR0FBVUEsRUFBRUEsR0FBVUEsQ0FBQ0E7UUFDdkNBLElBQUlBLEdBQVVBLEVBQUVBLEdBQVVBLEVBQUVBLEdBQVVBLENBQUNBO1FBQ3ZDQSxJQUFJQSxFQUFTQSxFQUFFQSxFQUFTQSxFQUFFQSxFQUFTQSxDQUFDQTtRQUNwQ0EsSUFBSUEsQ0FBUUEsQ0FBQ0E7UUFFYkEsSUFBSUEsU0FBU0EsR0FBaUJBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBO1FBRTlDQSxJQUFJQSxHQUFHQSxHQUFVQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxNQUFNQSxDQUFDQTtRQUV2Q0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsSUFBSUEsSUFBSUEsQ0FBQ0E7WUFDN0JBLElBQUlBLENBQUNBLFlBQVlBLEdBQUdBLElBQUlBLEtBQUtBLENBQVNBLEdBQUdBLENBQUNBLENBQUNBO1FBRTVDQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxlQUFlQSxJQUFJQSxJQUFJQSxDQUFDQSxZQUFZQSxJQUFJQSxJQUFJQSxDQUFDQTtZQUNyREEsSUFBSUEsQ0FBQ0EsWUFBWUEsR0FBR0EsSUFBSUEsS0FBS0EsQ0FBU0EsR0FBR0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFFOUNBLE9BQU9BLENBQUNBLEdBQUdBLEdBQUdBLEVBQUVBLENBQUNBO1lBQ2hCQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQTtZQUM5QkEsRUFBRUEsR0FBR0EsU0FBU0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7WUFDdEJBLEVBQUVBLEdBQUdBLFNBQVNBLENBQUNBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO1lBQzFCQSxFQUFFQSxHQUFHQSxTQUFTQSxDQUFDQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUMxQkEsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDOUJBLEVBQUVBLEdBQUdBLFNBQVNBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO1lBQ3RCQSxFQUFFQSxHQUFHQSxTQUFTQSxDQUFDQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUMxQkEsRUFBRUEsR0FBR0EsU0FBU0EsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDMUJBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBO1lBQzlCQSxFQUFFQSxHQUFHQSxTQUFTQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtZQUN0QkEsRUFBRUEsR0FBR0EsU0FBU0EsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDMUJBLEVBQUVBLEdBQUdBLFNBQVNBLENBQUNBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO1lBQzFCQSxHQUFHQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxDQUFDQTtZQUNkQSxHQUFHQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxDQUFDQTtZQUNkQSxHQUFHQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxDQUFDQTtZQUNkQSxHQUFHQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxDQUFDQTtZQUNkQSxHQUFHQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxDQUFDQTtZQUNkQSxHQUFHQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxDQUFDQTtZQUNkQSxFQUFFQSxHQUFHQSxHQUFHQSxHQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFDQSxHQUFHQSxDQUFDQTtZQUN2QkEsRUFBRUEsR0FBR0EsR0FBR0EsR0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBQ0EsR0FBR0EsQ0FBQ0E7WUFDdkJBLEVBQUVBLEdBQUdBLEdBQUdBLEdBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUNBLEdBQUdBLENBQUNBO1lBQ3ZCQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxFQUFF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LGdCQUFnQkEsRUFBRUEsbUJBQW1CQSxDQUFDQSxpQkFBaUJBLENBQUNBLENBQUNBO1FBRTVIQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxJQUFJQSxDQUFDQSxvQkFBb0JBLENBQUNBLENBQUNBO0lBQy9DQSxDQUFDQTtJQS81Q2E5QyxpQ0FBYUEsR0FBVUEsV0FBV0EsQ0FBQ0E7SUFDbkNBLCtCQUFXQSxHQUFVQSxlQUFlQSxDQUFDQTtJQUNyQ0EsZ0NBQVlBLEdBQVVBLGdCQUFnQkEsQ0FBQ0E7SUFDdkNBLDJCQUFPQSxHQUFVQSxLQUFLQSxDQUFDQTtJQUN2QkEscUNBQWlCQSxHQUFVQSxjQUFjQSxDQUFDQTtJQUMxQ0Esb0NBQWdCQSxHQUFVQSxjQUFjQSxDQUFDQTtJQUN6Q0EscUNBQWlCQSxHQUFVQSxjQUFjQSxDQUFDQTtJQUV4REEsOEJBQThCQTtJQUNoQkEsbUNBQWVBLEdBQVVBLFFBQVFBLENBQUNBO0lBQ2xDQSxpQ0FBYUEsR0FBVUEsUUFBUUEsQ0FBQ0E7SUFDaENBLGtDQUFjQSxHQUFVQSxRQUFRQSxDQUFDQTtJQUNqQ0EsNkJBQVNBLEdBQVVBLFFBQVFBLENBQUNBO0lBQzVCQSx1Q0FBbUJBLEdBQVVBLFFBQVFBLENBQUNBO0lBbTVDckRBLDBCQUFDQTtBQUFEQSxDQWw2Q0EsQUFrNkNDQSxFQWw2Q2lDLGVBQWUsRUFrNkNoRDtBQUVELEFBQTZCLGlCQUFwQixtQkFBbUIsQ0FBQyIsImZpbGUiOiJiYXNlL1RyaWFuZ2xlU3ViR2VvbWV0cnkuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1hdHJpeDNEXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL01hdHJpeDNEXCIpO1xuaW1wb3J0IFZlY3RvcjNEXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1ZlY3RvcjNEXCIpO1xuXG5pbXBvcnQgU3ViR2VvbWV0cnlCYXNlXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvU3ViR2VvbWV0cnlCYXNlXCIpO1xuaW1wb3J0IFRyaWFuZ2xlU3ViTWVzaFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL1RyaWFuZ2xlU3ViTWVzaFwiKTtcbmltcG9ydCBTdWJHZW9tZXRyeUV2ZW50XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2V2ZW50cy9TdWJHZW9tZXRyeUV2ZW50XCIpO1xuXG4vKipcbiAqIEBjbGFzcyBhd2F5LmJhc2UuVHJpYW5nbGVTdWJHZW9tZXRyeVxuICovXG5jbGFzcyBUcmlhbmdsZVN1Ykdlb21ldHJ5IGV4dGVuZHMgU3ViR2VvbWV0cnlCYXNlXG57XG5cdHB1YmxpYyBzdGF0aWMgUE9TSVRJT05fREFUQTpzdHJpbmcgPSBcInBvc2l0aW9uc1wiO1xuXHRwdWJsaWMgc3RhdGljIE5PUk1BTF9EQVRBOnN0cmluZyA9IFwidmVydGV4Tm9ybWFsc1wiO1xuXHRwdWJsaWMgc3RhdGljIFRBTkdFTlRfREFUQTpzdHJpbmcgPSBcInZlcnRleFRhbmdlbnRzXCI7XG5cdHB1YmxpYyBzdGF0aWMgVVZfREFUQTpzdHJpbmcgPSBcInV2c1wiO1xuXHRwdWJsaWMgc3RhdGljIFNFQ09OREFSWV9VVl9EQVRBOnN0cmluZyA9IFwic2Vjb25kYXJ5VVZzXCI7XG5cdHB1YmxpYyBzdGF0aWMgSk9JTlRfSU5ERVhfREFUQTpzdHJpbmcgPSBcImpvaW50SW5kaWNlc1wiO1xuXHRwdWJsaWMgc3RhdGljIEpPSU5UX1dFSUdIVF9EQVRBOnN0cmluZyA9IFwiam9pbnRXZWlnaHRzXCI7XG5cblx0Ly9UT0RPIC0gbW92ZSB0aGVzZSB0byBTdGFnZUdMXG5cdHB1YmxpYyBzdGF0aWMgUE9TSVRJT05fRk9STUFUOnN0cmluZyA9IFwiZmxvYXQzXCI7XG5cdHB1YmxpYyBzdGF0aWMgTk9STUFMX0ZPUk1BVDpzdHJpbmcgPSBcImZsb2F0M1wiO1xuXHRwdWJsaWMgc3RhdGljIFRBTkdFTlRfRk9STUFUOnN0cmluZyA9IFwiZmxvYXQzXCI7XG5cdHB1YmxpYyBzdGF0aWMgVVZfRk9STUFUOnN0cmluZyA9IFwiZmxvYXQyXCI7XG5cdHB1YmxpYyBzdGF0aWMgU0VDT05EQVJZX1VWX0ZPUk1BVDpzdHJpbmcgPSBcImZsb2F0MlwiO1xuXG5cdHByaXZhdGUgX3Bvc2l0aW9uc0RpcnR5OmJvb2xlYW4gPSB0cnVlO1xuXHRwcml2YXRlIF9mYWNlTm9ybWFsc0RpcnR5OmJvb2xlYW4gPSB0cnVlO1xuXHRwcml2YXRlIF9mYWNlVGFuZ2VudHNEaXJ0eTpib29sZWFuID0gdHJ1ZTtcblx0cHJpdmF0ZSBfdmVydGV4Tm9ybWFsc0RpcnR5OmJvb2xlYW4gPSB0cnVlO1xuXHRwcml2YXRlIF92ZXJ0ZXhUYW5nZW50c0RpcnR5OmJvb2xlYW4gPSB0cnVlO1xuXHRwcml2YXRlIF91dnNEaXJ0eTpib29sZWFuID0gdHJ1ZTtcblx0cHJpdmF0ZSBfc2Vjb25kYXJ5VVZzRGlydHk6Ym9vbGVhbiA9IHRydWU7XG5cdHByaXZhdGUgX2pvaW50SW5kaWNlc0RpcnR5OmJvb2xlYW4gPSB0cnVlO1xuXHRwcml2YXRlIF9qb2ludFdlaWdodHNEaXJ0eTpib29sZWFuID0gdHJ1ZTtcblxuXHRwcml2YXRlIF9wb3NpdGlvbnM6QXJyYXk8bnVtYmVyPjtcblx0cHJpdmF0ZSBfdmVydGV4Tm9ybWFsczpBcnJheTxudW1iZXI+O1xuXHRwcml2YXRlIF92ZXJ0ZXhUYW5nZW50czpBcnJheTxudW1iZXI+O1xuXHRwcml2YXRlIF91dnM6QXJyYXk8bnVtYmVyPjtcblx0cHJpdmF0ZSBfc2Vjb25kYXJ5VVZzOkFycmF5PG51bWJlcj47XG5cdHByaXZhdGUgX2pvaW50SW5kaWNlczpBcnJheTxudW1iZXI+O1xuXHRwcml2YXRlIF9qb2ludFdlaWdodHM6QXJyYXk8bnVtYmVyPjtcblxuXHRwcml2YXRlIF91c2VDb25kZW5zZWRJbmRpY2VzOmJvb2xlYW47XG5cdHByaXZhdGUgX2NvbmRlbnNlZEpvaW50SW5kaWNlczpBcnJheTxudW1iZXI+O1xuXHRwcml2YXRlIF9jb25kZW5zZWRJbmRleExvb2tVcDpBcnJheTxudW1iZXI+O1xuXHRwcml2YXRlIF9udW1Db25kZW5zZWRKb2ludHM6bnVtYmVyO1xuXG5cdHByaXZhdGUgX2pvaW50c1BlclZlcnRleDpudW1iZXI7XG5cblx0cHJpdmF0ZSBfY29uY2F0ZW5hdGVBcnJheXM6Ym9vbGVhbiA9IHRydWU7XG5cdHByaXZhdGUgX2F1dG9EZXJpdmVOb3JtYWxzOmJvb2xlYW4gPSB0cnVlO1xuXHRwcml2YXRlIF9hdXRvRGVyaXZlVGFuZ2VudHM6Ym9vbGVhbiA9IHRydWU7XG5cdHByaXZhdGUgX2F1dG9EZXJpdmVVVnM6Ym9vbGVhbiA9IGZhbHNlO1xuXHRwcml2YXRlIF91c2VGYWNlV2VpZ2h0czpib29sZWFuID0gZmFsc2U7XG5cblx0cHJpdmF0ZSBfZmFjZU5vcm1hbHM6QXJyYXk8bnVtYmVyPjtcblx0cHJpdmF0ZSBfZmFjZVRhbmdlbnRzOkFycmF5PG51bWJlcj47XG5cdHByaXZhdGUgX2ZhY2VXZWlnaHRzOkFycmF5PG51bWJlcj47XG5cblx0cHJpdmF0ZSBfc2NhbGVVOm51bWJlciA9IDE7XG5cdHByaXZhdGUgX3NjYWxlVjpudW1iZXIgPSAxO1xuXG5cdHByaXZhdGUgX3Bvc2l0aW9uc1VwZGF0ZWQ6U3ViR2VvbWV0cnlFdmVudDtcblx0cHJpdmF0ZSBfbm9ybWFsc1VwZGF0ZWQ6U3ViR2VvbWV0cnlFdmVudDtcblx0cHJpdmF0ZSBfdGFuZ2VudHNVcGRhdGVkOlN1Ykdlb21ldHJ5RXZlbnQ7XG5cdHByaXZhdGUgX3V2c1VwZGF0ZWQ6U3ViR2VvbWV0cnlFdmVudDtcblx0cHJpdmF0ZSBfc2Vjb25kYXJ5VVZzVXBkYXRlZDpTdWJHZW9tZXRyeUV2ZW50O1xuXHRwcml2YXRlIF9qb2ludEluZGljZXNVcGRhdGVkOlN1Ykdlb21ldHJ5RXZlbnQ7XG5cdHByaXZhdGUgX2pvaW50V2VpZ2h0c1VwZGF0ZWQ6U3ViR2VvbWV0cnlFdmVudDtcblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgc2NhbGVVKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fc2NhbGVVO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHNjYWxlVigpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3NjYWxlVjtcblx0fVxuXG5cdC8qKlxuXHQgKiBPZmZlcnMgdGhlIG9wdGlvbiBvZiBlbmFibGluZyBHUFUgYWNjZWxlcmF0ZWQgYW5pbWF0aW9uIG9uIHNrZWxldG9ucyBsYXJnZXIgdGhhbiAzMiBqb2ludHNcblx0ICogYnkgY29uZGVuc2luZyB0aGUgbnVtYmVyIG9mIGpvaW50IGluZGV4IHZhbHVlcyByZXF1aXJlZCBwZXIgbWVzaC4gT25seSBhcHBsaWNhYmxlIHRvXG5cdCAqIHNrZWxldG9uIGFuaW1hdGlvbnMgdGhhdCB1dGlsaXNlIG1vcmUgdGhhbiBvbmUgbWVzaCBvYmplY3QuIERlZmF1bHRzIHRvIGZhbHNlLlxuXHQgKi9cblx0cHVibGljIGdldCB1c2VDb25kZW5zZWRJbmRpY2VzKCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3VzZUNvbmRlbnNlZEluZGljZXM7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHVzZUNvbmRlbnNlZEluZGljZXModmFsdWU6Ym9vbGVhbilcblx0e1xuXHRcdGlmICh0aGlzLl91c2VDb25kZW5zZWRJbmRpY2VzID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fdXNlQ29uZGVuc2VkSW5kaWNlcyA9IHZhbHVlO1xuXG5cdFx0dGhpcy5ub3RpZnlKb2ludEluZGljZXNVcGRhdGUoKTtcblx0fVxuXG5cdHB1YmxpYyBfcFVwZGF0ZVN0cmlkZU9mZnNldCgpXG5cdHtcblx0XHRpZiAodGhpcy5fY29uY2F0ZW5hdGVBcnJheXMpIHtcblx0XHRcdHRoaXMuX3BPZmZzZXRbVHJpYW5nbGVTdWJHZW9tZXRyeS5WRVJURVhfREFUQV0gPSAwO1xuXG5cdFx0XHQvL2Fsd2F5cyBoYXZlIHBvc2l0aW9uc1xuXHRcdFx0dGhpcy5fcE9mZnNldFtUcmlhbmdsZVN1Ykdlb21ldHJ5LlBPU0lUSU9OX0RBVEFdID0gMDtcblx0XHRcdHZhciBzdHJpZGU6bnVtYmVyID0gMztcblxuXHRcdFx0aWYgKHRoaXMuX3ZlcnRleE5vcm1hbHMgIT0gbnVsbCkge1xuXHRcdFx0XHR0aGlzLl9wT2Zmc2V0W1RyaWFuZ2xlU3ViR2VvbWV0cnkuTk9STUFMX0RBVEFdID0gc3RyaWRlO1xuXHRcdFx0XHRzdHJpZGUgKz0gMztcblx0XHRcdH1cblxuXHRcdFx0aWYgKHRoaXMuX3ZlcnRleFRhbmdlbnRzICE9IG51bGwpIHtcblx0XHRcdFx0dGhpcy5fcE9mZnNldFtUcmlhbmdsZVN1Ykdlb21ldHJ5LlRBTkdFTlRfREFUQV0gPSBzdHJpZGU7XG5cdFx0XHRcdHN0cmlkZSArPSAzO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGhpcy5fdXZzICE9IG51bGwpIHtcblx0XHRcdFx0dGhpcy5fcE9mZnNldFtUcmlhbmdsZVN1Ykdlb21ldHJ5LlVWX0RBVEFdID0gc3RyaWRlO1xuXHRcdFx0XHRzdHJpZGUgKz0gMjtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHRoaXMuX3NlY29uZGFyeVVWcyAhPSBudWxsKSB7XG5cdFx0XHRcdHRoaXMuX3BPZmZzZXRbVHJpYW5nbGVTdWJHZW9tZXRyeS5TRUNPTkRBUllfVVZfREFUQV0gPSBzdHJpZGU7XG5cdFx0XHRcdHN0cmlkZSArPSAyO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGhpcy5fam9pbnRJbmRpY2VzICE9IG51bGwpIHtcblx0XHRcdFx0dGhpcy5fcE9mZnNldFtUcmlhbmdsZVN1Ykdlb21ldHJ5LkpPSU5UX0lOREVYX0RBVEFdID0gc3RyaWRlO1xuXHRcdFx0XHRzdHJpZGUgKz0gdGhpcy5fam9pbnRzUGVyVmVydGV4O1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGhpcy5fam9pbnRXZWlnaHRzICE9IG51bGwpIHtcblx0XHRcdFx0dGhpcy5fcE9mZnNldFtUcmlhbmdsZVN1Ykdlb21ldHJ5LkpPSU5UX1dFSUdIVF9EQVRBXSA9IHN0cmlkZTtcblx0XHRcdFx0c3RyaWRlICs9IHRoaXMuX2pvaW50c1BlclZlcnRleDtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5fcFN0cmlkZVtUcmlhbmdsZVN1Ykdlb21ldHJ5LlZFUlRFWF9EQVRBXSA9IHN0cmlkZTtcblx0XHRcdHRoaXMuX3BTdHJpZGVbVHJpYW5nbGVTdWJHZW9tZXRyeS5QT1NJVElPTl9EQVRBXSA9IHN0cmlkZTtcblx0XHRcdHRoaXMuX3BTdHJpZGVbVHJpYW5nbGVTdWJHZW9tZXRyeS5OT1JNQUxfREFUQV0gPSBzdHJpZGU7XG5cdFx0XHR0aGlzLl9wU3RyaWRlW1RyaWFuZ2xlU3ViR2VvbWV0cnkuVEFOR0VOVF9EQVRBXSA9IHN0cmlkZTtcblx0XHRcdHRoaXMuX3BTdHJpZGVbVHJpYW5nbGVTdWJHZW9tZXRyeS5VVl9EQVRBXSA9IHN0cmlkZTtcblx0XHRcdHRoaXMuX3BTdHJpZGVbVHJpYW5nbGVTdWJHZW9tZXRyeS5TRUNPTkRBUllfVVZfREFUQV0gPSBzdHJpZGU7XG5cdFx0XHR0aGlzLl9wU3RyaWRlW1RyaWFuZ2xlU3ViR2VvbWV0cnkuSk9JTlRfSU5ERVhfREFUQV0gPSBzdHJpZGU7XG5cdFx0XHR0aGlzLl9wU3RyaWRlW1RyaWFuZ2xlU3ViR2VvbWV0cnkuSk9JTlRfV0VJR0hUX0RBVEFdID0gc3RyaWRlO1xuXG5cdFx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX3BOdW1WZXJ0aWNlcypzdHJpZGU7XG5cblx0XHRcdGlmICh0aGlzLl9wVmVydGljZXMgPT0gbnVsbClcblx0XHRcdFx0dGhpcy5fcFZlcnRpY2VzID0gbmV3IEFycmF5PG51bWJlcj4obGVuKTtcblx0XHRcdGVsc2UgaWYgKHRoaXMuX3BWZXJ0aWNlcy5sZW5ndGggIT0gbGVuKVxuXHRcdFx0XHR0aGlzLl9wVmVydGljZXMubGVuZ3RoID0gbGVuO1xuXG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX3BPZmZzZXRbVHJpYW5nbGVTdWJHZW9tZXRyeS5QT1NJVElPTl9EQVRBXSA9IDA7XG5cdFx0XHR0aGlzLl9wT2Zmc2V0W1RyaWFuZ2xlU3ViR2VvbWV0cnkuTk9STUFMX0RBVEFdID0gMDtcblx0XHRcdHRoaXMuX3BPZmZzZXRbVHJpYW5nbGVTdWJHZW9tZXRyeS5UQU5HRU5UX0RBVEFdID0gMDtcblx0XHRcdHRoaXMuX3BPZmZzZXRbVHJpYW5nbGVTdWJHZW9tZXRyeS5VVl9EQVRBXSA9IDA7XG5cdFx0XHR0aGlzLl9wT2Zmc2V0W1RyaWFuZ2xlU3ViR2VvbWV0cnkuU0VDT05EQVJZX1VWX0RBVEFdID0gMDtcblx0XHRcdHRoaXMuX3BPZmZzZXRbVHJpYW5nbGVTdWJHZW9tZXRyeS5KT0lOVF9JTkRFWF9EQVRBXSA9IDA7XG5cdFx0XHR0aGlzLl9wT2Zmc2V0W1RyaWFuZ2xlU3ViR2VvbWV0cnkuSk9JTlRfV0VJR0hUX0RBVEFdID0gMDtcblxuXHRcdFx0dGhpcy5fcFN0cmlkZVtUcmlhbmdsZVN1Ykdlb21ldHJ5LlBPU0lUSU9OX0RBVEFdID0gMztcblx0XHRcdHRoaXMuX3BTdHJpZGVbVHJpYW5nbGVTdWJHZW9tZXRyeS5OT1JNQUxfREFUQV0gPSAzO1xuXHRcdFx0dGhpcy5fcFN0cmlkZVtUcmlhbmdsZVN1Ykdlb21ldHJ5LlRBTkdFTlRfREFUQV0gPSAzO1xuXHRcdFx0dGhpcy5fcFN0cmlkZVtUcmlhbmdsZVN1Ykdlb21ldHJ5LlVWX0RBVEFdID0gMjtcblx0XHRcdHRoaXMuX3BTdHJpZGVbVHJpYW5nbGVTdWJHZW9tZXRyeS5TRUNPTkRBUllfVVZfREFUQV0gPSAyO1xuXHRcdFx0dGhpcy5fcFN0cmlkZVtUcmlhbmdsZVN1Ykdlb21ldHJ5LkpPSU5UX0lOREVYX0RBVEFdID0gdGhpcy5fam9pbnRzUGVyVmVydGV4O1xuXHRcdFx0dGhpcy5fcFN0cmlkZVtUcmlhbmdsZVN1Ykdlb21ldHJ5LkpPSU5UX1dFSUdIVF9EQVRBXSA9IHRoaXMuX2pvaW50c1BlclZlcnRleDtcblx0XHR9XG5cblx0XHR0aGlzLl9wU3RyaWRlT2Zmc2V0RGlydHkgPSBmYWxzZTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBqb2ludHNQZXJWZXJ0ZXgoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9qb2ludHNQZXJWZXJ0ZXg7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGpvaW50c1BlclZlcnRleCh2YWx1ZTpudW1iZXIpXG5cdHtcblx0XHRpZiAodGhpcy5fam9pbnRzUGVyVmVydGV4ID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fam9pbnRzUGVyVmVydGV4ID0gdmFsdWU7XG5cblx0XHR0aGlzLl9wU3RyaWRlT2Zmc2V0RGlydHkgPSB0cnVlO1xuXG5cdFx0aWYgKHRoaXMuX3BDb25jYXRlbmF0ZUFycmF5cylcblx0XHRcdHRoaXMuX3BOb3RpZnlWZXJ0aWNlc1VwZGF0ZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIERlZmluZXMgd2hldGhlciBhIFVWIGJ1ZmZlciBzaG91bGQgYmUgYXV0b21hdGljYWxseSBnZW5lcmF0ZWQgdG8gY29udGFpbiBkdW1teSBVViBjb29yZGluYXRlcy5cblx0ICogU2V0IHRvIHRydWUgaWYgYSBnZW9tZXRyeSBsYWNrcyBVViBkYXRhIGJ1dCB1c2VzIGEgbWF0ZXJpYWwgdGhhdCByZXF1aXJlcyBpdCwgb3IgbGVhdmUgYXMgZmFsc2Vcblx0ICogaW4gY2FzZXMgd2hlcmUgVVYgZGF0YSBpcyBleHBsaWNpdGx5IGRlZmluZWQgb3IgdGhlIG1hdGVyaWFsIGRvZXMgbm90IHJlcXVpcmUgVVYgZGF0YS5cblx0ICovXG5cdHB1YmxpYyBnZXQgYXV0b0Rlcml2ZVVWcygpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9hdXRvRGVyaXZlVVZzO1xuXHR9XG5cblx0cHVibGljIHNldCBhdXRvRGVyaXZlVVZzKHZhbHVlOmJvb2xlYW4pXG5cdHtcblx0XHRpZiAodGhpcy5fYXV0b0Rlcml2ZVVWcyA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX2F1dG9EZXJpdmVVVnMgPSB2YWx1ZTtcblxuXHRcdGlmICh2YWx1ZSlcblx0XHRcdHRoaXMubm90aWZ5VVZzVXBkYXRlKCk7XG5cdH1cblxuXHQvKipcblx0ICogVHJ1ZSBpZiB0aGUgdmVydGV4IG5vcm1hbHMgc2hvdWxkIGJlIGRlcml2ZWQgZnJvbSB0aGUgZ2VvbWV0cnksIGZhbHNlIGlmIHRoZSB2ZXJ0ZXggbm9ybWFscyBhcmUgc2V0XG5cdCAqIGV4cGxpY2l0bHkuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGF1dG9EZXJpdmVOb3JtYWxzKCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2F1dG9EZXJpdmVOb3JtYWxzO1xuXHR9XG5cblx0cHVibGljIHNldCBhdXRvRGVyaXZlTm9ybWFscyh2YWx1ZTpib29sZWFuKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2F1dG9EZXJpdmVOb3JtYWxzID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fYXV0b0Rlcml2ZU5vcm1hbHMgPSB2YWx1ZTtcblxuXHRcdGlmICh2YWx1ZSlcblx0XHRcdHRoaXMubm90aWZ5Tm9ybWFsc1VwZGF0ZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRydWUgaWYgdGhlIHZlcnRleCB0YW5nZW50cyBzaG91bGQgYmUgZGVyaXZlZCBmcm9tIHRoZSBnZW9tZXRyeSwgZmFsc2UgaWYgdGhlIHZlcnRleCBub3JtYWxzIGFyZSBzZXRcblx0ICogZXhwbGljaXRseS5cblx0ICovXG5cdHB1YmxpYyBnZXQgYXV0b0Rlcml2ZVRhbmdlbnRzKCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2F1dG9EZXJpdmVUYW5nZW50cztcblx0fVxuXG5cdHB1YmxpYyBzZXQgYXV0b0Rlcml2ZVRhbmdlbnRzKHZhbHVlOmJvb2xlYW4pXG5cdHtcblx0XHRpZiAodGhpcy5fYXV0b0Rlcml2ZVRhbmdlbnRzID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fYXV0b0Rlcml2ZVRhbmdlbnRzID0gdmFsdWU7XG5cblx0XHRpZiAodmFsdWUpXG5cdFx0XHR0aGlzLm5vdGlmeVRhbmdlbnRzVXBkYXRlKCk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgdmVydGljZXMoKTpBcnJheTxudW1iZXI+XG5cdHtcblx0XHRpZiAodGhpcy5fcG9zaXRpb25zRGlydHkpXG5cdFx0XHR0aGlzLnVwZGF0ZVBvc2l0aW9ucyh0aGlzLl9wb3NpdGlvbnMpO1xuXG5cdFx0aWYgKHRoaXMuX3ZlcnRleE5vcm1hbHNEaXJ0eSlcblx0XHRcdHRoaXMudXBkYXRlVmVydGV4Tm9ybWFscyh0aGlzLl92ZXJ0ZXhOb3JtYWxzKTtcblxuXHRcdGlmICh0aGlzLl92ZXJ0ZXhUYW5nZW50c0RpcnR5KVxuXHRcdFx0dGhpcy51cGRhdGVWZXJ0ZXhUYW5nZW50cyh0aGlzLl92ZXJ0ZXhUYW5nZW50cyk7XG5cblx0XHRpZiAodGhpcy5fdXZzRGlydHkpXG5cdFx0XHR0aGlzLnVwZGF0ZVVWcyh0aGlzLl91dnMpO1xuXG5cdFx0aWYgKHRoaXMuX3NlY29uZGFyeVVWc0RpcnR5KVxuXHRcdFx0dGhpcy51cGRhdGVTZWNvbmRhcnlVVnModGhpcy5fc2Vjb25kYXJ5VVZzKTtcblxuXHRcdGlmICh0aGlzLl9qb2ludEluZGljZXNEaXJ0eSlcblx0XHRcdHRoaXMudXBkYXRlSm9pbnRJbmRpY2VzKHRoaXMuX2pvaW50SW5kaWNlcyk7XG5cblx0XHRpZiAodGhpcy5fam9pbnRXZWlnaHRzRGlydHkpXG5cdFx0XHR0aGlzLnVwZGF0ZUpvaW50V2VpZ2h0cyh0aGlzLl9qb2ludFdlaWdodHMpO1xuXG5cdFx0cmV0dXJuIHRoaXMuX3BWZXJ0aWNlcztcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBwb3NpdGlvbnMoKTpBcnJheTxudW1iZXI+XG5cdHtcblx0XHRpZiAodGhpcy5fcG9zaXRpb25zRGlydHkpXG5cdFx0XHR0aGlzLnVwZGF0ZVBvc2l0aW9ucyh0aGlzLl9wb3NpdGlvbnMpO1xuXG5cdFx0cmV0dXJuIHRoaXMuX3Bvc2l0aW9ucztcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCB2ZXJ0ZXhOb3JtYWxzKCk6QXJyYXk8bnVtYmVyPlxuXHR7XG5cdFx0aWYgKHRoaXMuX3ZlcnRleE5vcm1hbHNEaXJ0eSlcblx0XHRcdHRoaXMudXBkYXRlVmVydGV4Tm9ybWFscyh0aGlzLl92ZXJ0ZXhOb3JtYWxzKTtcblxuXHRcdHJldHVybiB0aGlzLl92ZXJ0ZXhOb3JtYWxzO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHZlcnRleFRhbmdlbnRzKCk6QXJyYXk8bnVtYmVyPlxuXHR7XG5cdFx0aWYgKHRoaXMuX3ZlcnRleFRhbmdlbnRzRGlydHkpXG5cdFx0XHR0aGlzLnVwZGF0ZVZlcnRleFRhbmdlbnRzKHRoaXMuX3ZlcnRleFRhbmdlbnRzKTtcblxuXHRcdHJldHVybiB0aGlzLl92ZXJ0ZXhUYW5nZW50cztcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgcmF3IGRhdGEgb2YgdGhlIGZhY2Ugbm9ybWFscywgaW4gdGhlIHNhbWUgb3JkZXIgYXMgdGhlIGZhY2VzIGFyZSBsaXN0ZWQgaW4gdGhlIGluZGV4IGxpc3QuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGZhY2VOb3JtYWxzKCk6QXJyYXk8bnVtYmVyPlxuXHR7XG5cdFx0aWYgKHRoaXMuX2ZhY2VOb3JtYWxzRGlydHkpXG5cdFx0XHR0aGlzLnVwZGF0ZUZhY2VOb3JtYWxzKCk7XG5cblx0XHRyZXR1cm4gdGhpcy5fZmFjZU5vcm1hbHM7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIHJhdyBkYXRhIG9mIHRoZSBmYWNlIHRhbmdldHMsIGluIHRoZSBzYW1lIG9yZGVyIGFzIHRoZSBmYWNlcyBhcmUgbGlzdGVkIGluIHRoZSBpbmRleCBsaXN0LlxuXHQgKi9cblx0cHVibGljIGdldCBmYWNlVGFuZ2VudHMoKTpBcnJheTxudW1iZXI+XG5cdHtcblx0XHRpZiAodGhpcy5fZmFjZVRhbmdlbnRzRGlydHkpXG5cdFx0XHR0aGlzLnVwZGF0ZUZhY2VUYW5nZW50cygpO1xuXG5cdFx0cmV0dXJuIHRoaXMuX2ZhY2VUYW5nZW50cztcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCB1dnMoKTpBcnJheTxudW1iZXI+XG5cdHtcblx0XHRpZiAodGhpcy5fdXZzRGlydHkpXG5cdFx0XHR0aGlzLnVwZGF0ZVVWcyh0aGlzLl91dnMpO1xuXG5cdFx0cmV0dXJuIHRoaXMuX3V2cztcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBzZWNvbmRhcnlVVnMoKTpBcnJheTxudW1iZXI+XG5cdHtcblx0XHRpZiAodGhpcy5fc2Vjb25kYXJ5VVZzRGlydHkpXG5cdFx0XHR0aGlzLnVwZGF0ZVNlY29uZGFyeVVWcyh0aGlzLl9zZWNvbmRhcnlVVnMpO1xuXG5cdFx0cmV0dXJuIHRoaXMuX3NlY29uZGFyeVVWcztcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBqb2ludEluZGljZXMoKTpBcnJheTxudW1iZXI+XG5cdHtcblx0XHRpZiAodGhpcy5fam9pbnRJbmRpY2VzRGlydHkpXG5cdFx0XHR0aGlzLnVwZGF0ZUpvaW50SW5kaWNlcyh0aGlzLl9qb2ludEluZGljZXMpO1xuXG5cdFx0aWYgKHRoaXMuX3VzZUNvbmRlbnNlZEluZGljZXMpXG5cdFx0XHRyZXR1cm4gdGhpcy5fY29uZGVuc2VkSm9pbnRJbmRpY2VzO1xuXG5cdFx0cmV0dXJuIHRoaXMuX2pvaW50SW5kaWNlcztcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBqb2ludFdlaWdodHMoKTpBcnJheTxudW1iZXI+XG5cdHtcblx0XHRpZiAodGhpcy5fam9pbnRXZWlnaHRzRGlydHkpXG5cdFx0XHR0aGlzLnVwZGF0ZUpvaW50V2VpZ2h0cyh0aGlzLl9qb2ludFdlaWdodHMpO1xuXG5cdFx0cmV0dXJuIHRoaXMuX2pvaW50V2VpZ2h0cztcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgd2hldGhlciBvciBub3QgdG8gdGFrZSB0aGUgc2l6ZSBvZiBmYWNlcyBpbnRvIGFjY291bnQgd2hlbiBhdXRvLWRlcml2aW5nIHZlcnRleCBub3JtYWxzIGFuZCB0YW5nZW50cy5cblx0ICovXG5cdHB1YmxpYyBnZXQgdXNlRmFjZVdlaWdodHMoKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fdXNlRmFjZVdlaWdodHM7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHVzZUZhY2VXZWlnaHRzKHZhbHVlOmJvb2xlYW4pXG5cdHtcblx0XHRpZiAodGhpcy5fdXNlRmFjZVdlaWdodHMgPT0gdmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl91c2VGYWNlV2VpZ2h0cyA9IHZhbHVlO1xuXG5cdFx0aWYgKHRoaXMuX2F1dG9EZXJpdmVOb3JtYWxzKVxuXHRcdFx0dGhpcy5ub3RpZnlOb3JtYWxzVXBkYXRlKCk7XG5cblx0XHRpZiAodGhpcy5fYXV0b0Rlcml2ZVRhbmdlbnRzKVxuXHRcdFx0dGhpcy5ub3RpZnlUYW5nZW50c1VwZGF0ZSgpO1xuXG5cdFx0dGhpcy5fZmFjZU5vcm1hbHNEaXJ0eSA9IHRydWU7XG5cdH1cblxuXHRwdWJsaWMgZ2V0IG51bUNvbmRlbnNlZEpvaW50cygpOm51bWJlclxuXHR7XG5cdFx0aWYgKHRoaXMuX2pvaW50SW5kaWNlc0RpcnR5KVxuXHRcdFx0dGhpcy51cGRhdGVKb2ludEluZGljZXModGhpcy5fam9pbnRJbmRpY2VzKTtcblxuXHRcdHJldHVybiB0aGlzLl9udW1Db25kZW5zZWRKb2ludHM7XG5cdH1cblxuXHRwdWJsaWMgZ2V0IGNvbmRlbnNlZEluZGV4TG9va1VwKCk6QXJyYXk8bnVtYmVyPlxuXHR7XG5cdFx0aWYgKHRoaXMuX2pvaW50SW5kaWNlc0RpcnR5KVxuXHRcdFx0dGhpcy51cGRhdGVKb2ludEluZGljZXModGhpcy5fam9pbnRJbmRpY2VzKTtcblxuXHRcdHJldHVybiB0aGlzLl9jb25kZW5zZWRJbmRleExvb2tVcDtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0Y29uc3RydWN0b3IoY29uY2F0ZW5hdGVkQXJyYXlzOmJvb2xlYW4pXG5cdHtcblx0XHRzdXBlcihjb25jYXRlbmF0ZWRBcnJheXMpO1xuXG5cdFx0dGhpcy5fcFN1Yk1lc2hDbGFzcyA9IFRyaWFuZ2xlU3ViTWVzaDtcblx0fVxuXG5cdHB1YmxpYyBnZXRCb3VuZGluZ1Bvc2l0aW9ucygpOkFycmF5PG51bWJlcj5cblx0e1xuXHRcdGlmICh0aGlzLl9wb3NpdGlvbnNEaXJ0eSlcblx0XHRcdHRoaXMudXBkYXRlUG9zaXRpb25zKHRoaXMuX3Bvc2l0aW9ucyk7XG5cblx0XHRyZXR1cm4gdGhpcy5fcG9zaXRpb25zO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgdXBkYXRlUG9zaXRpb25zKHZhbHVlczpBcnJheTxudW1iZXI+KVxuXHR7XG5cdFx0dmFyIGk6bnVtYmVyO1xuXHRcdHZhciBpbmRleDpudW1iZXI7XG5cdFx0dmFyIHN0cmlkZTpudW1iZXI7XG5cdFx0dmFyIHBvc2l0aW9uczpBcnJheTxudW1iZXI+O1xuXG5cdFx0dGhpcy5fcG9zaXRpb25zID0gdmFsdWVzO1xuXG5cdFx0aWYgKHRoaXMuX3Bvc2l0aW9ucyA9PSBudWxsKVxuXHRcdFx0dGhpcy5fcG9zaXRpb25zID0gbmV3IEFycmF5PG51bWJlcj4oKTtcblxuXHRcdHRoaXMuX3BOdW1WZXJ0aWNlcyA9IHRoaXMuX3Bvc2l0aW9ucy5sZW5ndGgvMztcblxuXHRcdGlmICh0aGlzLl9jb25jYXRlbmF0ZUFycmF5cykge1xuXHRcdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9wTnVtVmVydGljZXMqdGhpcy5nZXRTdHJpZGUoVHJpYW5nbGVTdWJHZW9tZXRyeS5WRVJURVhfREFUQSk7XG5cblx0XHRcdGlmICh0aGlzLl9wVmVydGljZXMgPT0gbnVsbClcblx0XHRcdFx0dGhpcy5fcFZlcnRpY2VzID0gbmV3IEFycmF5PG51bWJlcj4obGVuKTtcblx0XHRcdGVsc2UgaWYgKHRoaXMuX3BWZXJ0aWNlcy5sZW5ndGggIT0gbGVuKVxuXHRcdFx0XHR0aGlzLl9wVmVydGljZXMubGVuZ3RoID0gbGVuO1xuXG5cdFx0XHRpID0gMDtcblx0XHRcdGluZGV4ID0gdGhpcy5nZXRPZmZzZXQoVHJpYW5nbGVTdWJHZW9tZXRyeS5QT1NJVElPTl9EQVRBKTtcblx0XHRcdHN0cmlkZSA9IHRoaXMuZ2V0U3RyaWRlKFRyaWFuZ2xlU3ViR2VvbWV0cnkuUE9TSVRJT05fREFUQSk7XG5cdFx0XHRwb3NpdGlvbnMgPSB0aGlzLl9wVmVydGljZXM7XG5cblx0XHRcdHdoaWxlIChpIDwgdmFsdWVzLmxlbmd0aCkge1xuXHRcdFx0XHRwb3NpdGlvbnNbaW5kZXhdID0gdmFsdWVzW2krK107XG5cdFx0XHRcdHBvc2l0aW9uc1tpbmRleCArIDFdID0gdmFsdWVzW2krK107XG5cdFx0XHRcdHBvc2l0aW9uc1tpbmRleCArIDJdID0gdmFsdWVzW2krK107XG5cdFx0XHRcdGluZGV4ICs9IHN0cmlkZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAodGhpcy5fYXV0b0Rlcml2ZU5vcm1hbHMpXG5cdFx0XHR0aGlzLm5vdGlmeU5vcm1hbHNVcGRhdGUoKTtcblxuXHRcdGlmICh0aGlzLl9hdXRvRGVyaXZlVGFuZ2VudHMpXG5cdFx0XHR0aGlzLm5vdGlmeVRhbmdlbnRzVXBkYXRlKCk7XG5cblx0XHRpZiAodGhpcy5fYXV0b0Rlcml2ZVVWcylcblx0XHRcdHRoaXMubm90aWZ5VVZzVXBkYXRlKClcblxuXHRcdHRoaXMucEludmFsaWRhdGVCb3VuZHMoKTtcblxuXHRcdHRoaXMubm90aWZ5UG9zaXRpb25zVXBkYXRlKCk7XG5cblx0XHR0aGlzLl9wb3NpdGlvbnNEaXJ0eSA9IGZhbHNlO1xuXHR9XG5cblx0LyoqXG5cdCAqIFVwZGF0ZXMgdGhlIHZlcnRleCBub3JtYWxzIGJhc2VkIG9uIHRoZSBnZW9tZXRyeS5cblx0ICovXG5cdHB1YmxpYyB1cGRhdGVWZXJ0ZXhOb3JtYWxzKHZhbHVlczpBcnJheTxudW1iZXI+KVxuXHR7XG5cdFx0dmFyIGk6bnVtYmVyO1xuXHRcdHZhciBpbmRleDpudW1iZXI7XG5cdFx0dmFyIG9mZnNldDpudW1iZXI7XG5cdFx0dmFyIHN0cmlkZTpudW1iZXI7XG5cdFx0dmFyIG5vcm1hbHM6QXJyYXk8bnVtYmVyPjtcblxuXHRcdGlmICghdGhpcy5fYXV0b0Rlcml2ZU5vcm1hbHMpIHtcblx0XHRcdGlmICgodGhpcy5fdmVydGV4Tm9ybWFscyA9PSBudWxsIHx8IHZhbHVlcyA9PSBudWxsKSAmJiAodGhpcy5fdmVydGV4Tm9ybWFscyAhPSBudWxsIHx8IHZhbHVlcyAhPSBudWxsKSkge1xuXHRcdFx0XHRpZiAodGhpcy5fY29uY2F0ZW5hdGVBcnJheXMpXG5cdFx0XHRcdFx0dGhpcy5fcE5vdGlmeVZlcnRpY2VzVXBkYXRlKCk7XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHR0aGlzLl9wU3RyaWRlT2Zmc2V0RGlydHkgPSB0cnVlO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLl92ZXJ0ZXhOb3JtYWxzID0gdmFsdWVzO1xuXG5cdFx0XHRpZiAodmFsdWVzICE9IG51bGwgJiYgdGhpcy5fY29uY2F0ZW5hdGVBcnJheXMpIHtcblx0XHRcdFx0aSA9IDA7XG5cdFx0XHRcdGluZGV4ID0gdGhpcy5nZXRPZmZzZXQoVHJpYW5nbGVTdWJHZW9tZXRyeS5OT1JNQUxfREFUQSk7XG5cdFx0XHRcdHN0cmlkZSA9IHRoaXMuZ2V0U3RyaWRlKFRyaWFuZ2xlU3ViR2VvbWV0cnkuTk9STUFMX0RBVEEpO1xuXHRcdFx0XHRub3JtYWxzID0gdGhpcy5fcFZlcnRpY2VzO1xuXG5cdFx0XHRcdHdoaWxlIChpIDwgdmFsdWVzLmxlbmd0aCkge1xuXHRcdFx0XHRcdG5vcm1hbHNbaW5kZXhdID0gdmFsdWVzW2krK107XG5cdFx0XHRcdFx0bm9ybWFsc1tpbmRleCArIDFdID0gdmFsdWVzW2krK107XG5cdFx0XHRcdFx0bm9ybWFsc1tpbmRleCArIDJdID0gdmFsdWVzW2krK107XG5cdFx0XHRcdFx0aW5kZXggKz0gc3RyaWRlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmICh0aGlzLl92ZXJ0ZXhOb3JtYWxzID09IG51bGwpIHtcblx0XHRcdFx0dGhpcy5fdmVydGV4Tm9ybWFscyA9IG5ldyBBcnJheTxudW1iZXI+KHRoaXMuX3Bvc2l0aW9ucy5sZW5ndGgpO1xuXG5cdFx0XHRcdGlmICh0aGlzLl9jb25jYXRlbmF0ZUFycmF5cylcblx0XHRcdFx0XHR0aGlzLl9wTm90aWZ5VmVydGljZXNVcGRhdGUoKTtcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHRoaXMuX3BTdHJpZGVPZmZzZXREaXJ0eSA9IHRydWU7XG5cdFx0XHR9XG5cblx0XHRcdGlmICh0aGlzLl9mYWNlTm9ybWFsc0RpcnR5KVxuXHRcdFx0XHR0aGlzLnVwZGF0ZUZhY2VOb3JtYWxzKCk7XG5cblx0XHRcdG9mZnNldCA9IHRoaXMuZ2V0T2Zmc2V0KFRyaWFuZ2xlU3ViR2VvbWV0cnkuTk9STUFMX0RBVEEpO1xuXHRcdFx0c3RyaWRlID0gdGhpcy5nZXRTdHJpZGUoVHJpYW5nbGVTdWJHZW9tZXRyeS5OT1JNQUxfREFUQSk7XG5cblx0XHRcdC8vYXV0b2Rlcml2ZWQgbm9ybWFsc1xuXHRcdFx0bm9ybWFscyA9IHRoaXMuX2NvbmNhdGVuYXRlQXJyYXlzPyB0aGlzLl9wVmVydGljZXMgOiB0aGlzLl92ZXJ0ZXhOb3JtYWxzO1xuXG5cdFx0XHR2YXIgZjE6bnVtYmVyID0gMDtcblx0XHRcdHZhciBmMjpudW1iZXIgPSAxO1xuXHRcdFx0dmFyIGYzOm51bWJlciA9IDI7XG5cblx0XHRcdGluZGV4ID0gb2Zmc2V0O1xuXG5cdFx0XHQvL2NsZWFyIG5vcm1hbCB2YWx1ZXNcblx0XHRcdHZhciBsZW5WOm51bWJlciA9IG5vcm1hbHMubGVuZ3RoO1xuXHRcdFx0d2hpbGUgKGluZGV4IDwgbGVuVikge1xuXHRcdFx0XHRub3JtYWxzW2luZGV4XSA9IDA7XG5cdFx0XHRcdG5vcm1hbHNbaW5kZXggKyAxXSA9IDA7XG5cdFx0XHRcdG5vcm1hbHNbaW5kZXggKyAyXSA9IDA7XG5cdFx0XHRcdGluZGV4ICs9IHN0cmlkZTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIGs6bnVtYmVyID0gMDtcblx0XHRcdHZhciBsZW5JOm51bWJlciA9IHRoaXMuX3BJbmRpY2VzLmxlbmd0aDtcblx0XHRcdHZhciB3ZWlnaHQ6bnVtYmVyO1xuXG5cdFx0XHRpID0gMDtcblxuXHRcdFx0Ly9jb2xsZWN0IGZhY2Ugbm9ybWFsc1xuXHRcdFx0d2hpbGUgKGkgPCBsZW5JKSB7XG5cdFx0XHRcdHdlaWdodCA9IHRoaXMuX3VzZUZhY2VXZWlnaHRzPyB0aGlzLl9mYWNlV2VpZ2h0c1trKytdIDogMTtcblx0XHRcdFx0aW5kZXggPSBvZmZzZXQgKyB0aGlzLl9wSW5kaWNlc1tpKytdKnN0cmlkZTtcblx0XHRcdFx0bm9ybWFsc1tpbmRleF0gKz0gdGhpcy5fZmFjZU5vcm1hbHNbZjFdKndlaWdodDtcblx0XHRcdFx0bm9ybWFsc1tpbmRleCArIDFdICs9IHRoaXMuX2ZhY2VOb3JtYWxzW2YyXSp3ZWlnaHQ7XG5cdFx0XHRcdG5vcm1hbHNbaW5kZXggKyAyXSArPSB0aGlzLl9mYWNlTm9ybWFsc1tmM10qd2VpZ2h0O1xuXHRcdFx0XHRpbmRleCA9IG9mZnNldCArIHRoaXMuX3BJbmRpY2VzW2krK10qc3RyaWRlO1xuXHRcdFx0XHRub3JtYWxzW2luZGV4XSArPSB0aGlzLl9mYWNlTm9ybWFsc1tmMV0qd2VpZ2h0O1xuXHRcdFx0XHRub3JtYWxzW2luZGV4ICsgMV0gKz0gdGhpcy5fZmFjZU5vcm1hbHNbZjJdKndlaWdodDtcblx0XHRcdFx0bm9ybWFsc1tpbmRleCArIDJdICs9IHRoaXMuX2ZhY2VOb3JtYWxzW2YzXSp3ZWlnaHQ7XG5cdFx0XHRcdGluZGV4ID0gb2Zmc2V0ICsgdGhpcy5fcEluZGljZXNbaSsrXSpzdHJpZGU7XG5cdFx0XHRcdG5vcm1hbHNbaW5kZXhdICs9IHRoaXMuX2ZhY2VOb3JtYWxzW2YxXSp3ZWlnaHQ7XG5cdFx0XHRcdG5vcm1hbHNbaW5kZXggKyAxXSArPSB0aGlzLl9mYWNlTm9ybWFsc1tmMl0qd2VpZ2h0O1xuXHRcdFx0XHRub3JtYWxzW2luZGV4ICsgMl0gKz0gdGhpcy5fZmFjZU5vcm1hbHNbZjNdKndlaWdodDtcblx0XHRcdFx0ZjEgKz0gMztcblx0XHRcdFx0ZjIgKz0gMztcblx0XHRcdFx0ZjMgKz0gMztcblx0XHRcdH1cblxuXHRcdFx0aSA9IDA7XG5cdFx0XHRpbmRleCA9IG9mZnNldDtcblxuXHRcdFx0Ly9hdmVyYWdlIG5vcm1hbHMgY29sbGVjdGlvbnNcblx0XHRcdHdoaWxlIChpbmRleCA8IGxlblYpIHtcblx0XHRcdFx0dmFyIHZ4Om51bWJlciA9IG5vcm1hbHNbaW5kZXhdO1xuXHRcdFx0XHR2YXIgdnk6bnVtYmVyID0gbm9ybWFsc1tpbmRleCArIDFdO1xuXHRcdFx0XHR2YXIgdno6bnVtYmVyID0gbm9ybWFsc1tpbmRleCArIDJdO1xuXHRcdFx0XHR2YXIgZDpudW1iZXIgPSAxLjAvTWF0aC5zcXJ0KHZ4KnZ4ICsgdnkqdnkgKyB2eip2eik7XG5cblx0XHRcdFx0aWYgKHRoaXMuX2NvbmNhdGVuYXRlQXJyYXlzKSB7XG5cdFx0XHRcdFx0dGhpcy5fdmVydGV4Tm9ybWFsc1tpKytdID0gbm9ybWFsc1tpbmRleF0gPSB2eCpkO1xuXHRcdFx0XHRcdHRoaXMuX3ZlcnRleE5vcm1hbHNbaSsrXSA9IG5vcm1hbHNbaW5kZXggKyAxXSA9IHZ5KmQ7XG5cdFx0XHRcdFx0dGhpcy5fdmVydGV4Tm9ybWFsc1tpKytdID0gbm9ybWFsc1tpbmRleCArIDJdID0gdnoqZDtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRub3JtYWxzW2luZGV4XSA9IHZ4KmQ7XG5cdFx0XHRcdFx0bm9ybWFsc1tpbmRleCArIDFdID0gdnkqZDtcblx0XHRcdFx0XHRub3JtYWxzW2luZGV4ICsgMl0gPSB2eipkO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aW5kZXggKz0gc3RyaWRlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXMubm90aWZ5Tm9ybWFsc1VwZGF0ZSgpO1xuXG5cdFx0dGhpcy5fdmVydGV4Tm9ybWFsc0RpcnR5ID0gZmFsc2U7XG5cdH1cblxuXHQvKipcblx0ICogVXBkYXRlcyB0aGUgdmVydGV4IHRhbmdlbnRzIGJhc2VkIG9uIHRoZSBnZW9tZXRyeS5cblx0ICovXG5cdHB1YmxpYyB1cGRhdGVWZXJ0ZXhUYW5nZW50cyh2YWx1ZXM6QXJyYXk8bnVtYmVyPilcblx0e1xuXHRcdHZhciBpOm51bWJlcjtcblx0XHR2YXIgaW5kZXg6bnVtYmVyO1xuXHRcdHZhciBvZmZzZXQ6bnVtYmVyO1xuXHRcdHZhciBzdHJpZGU6bnVtYmVyO1xuXHRcdHZhciB0YW5nZW50czpBcnJheTxudW1iZXI+O1xuXG5cdFx0aWYgKCF0aGlzLl9hdXRvRGVyaXZlVGFuZ2VudHMpIHtcblx0XHRcdGlmICgodGhpcy5fdmVydGV4VGFuZ2VudHMgPT0gbnVsbCB8fCB2YWx1ZXMgPT0gbnVsbCkgJiYgKHRoaXMuX3ZlcnRleFRhbmdlbnRzICE9IG51bGwgfHwgdmFsdWVzICE9IG51bGwpKSB7XG5cdFx0XHRcdGlmICh0aGlzLl9jb25jYXRlbmF0ZUFycmF5cylcblx0XHRcdFx0XHR0aGlzLl9wTm90aWZ5VmVydGljZXNVcGRhdGUoKTtcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHRoaXMuX3BTdHJpZGVPZmZzZXREaXJ0eSA9IHRydWU7XG5cdFx0XHR9XG5cblxuXHRcdFx0dGhpcy5fdmVydGV4VGFuZ2VudHMgPSB2YWx1ZXM7XG5cblx0XHRcdGlmICh2YWx1ZXMgIT0gbnVsbCAmJiB0aGlzLl9jb25jYXRlbmF0ZUFycmF5cykge1xuXHRcdFx0XHRpID0gMDtcblx0XHRcdFx0aW5kZXggPSB0aGlzLmdldE9mZnNldChUcmlhbmdsZVN1Ykdlb21ldHJ5LlRBTkdFTlRfREFUQSk7XG5cdFx0XHRcdHN0cmlkZSA9IHRoaXMuZ2V0U3RyaWRlKFRyaWFuZ2xlU3ViR2VvbWV0cnkuVEFOR0VOVF9EQVRBKTtcblx0XHRcdFx0dGFuZ2VudHMgPSB0aGlzLl9wVmVydGljZXM7XG5cblx0XHRcdFx0d2hpbGUgKGkgPCB2YWx1ZXMubGVuZ3RoKSB7XG5cdFx0XHRcdFx0dGFuZ2VudHNbaW5kZXhdID0gdmFsdWVzW2krK107XG5cdFx0XHRcdFx0dGFuZ2VudHNbaW5kZXggKyAxXSA9IHZhbHVlc1tpKytdO1xuXHRcdFx0XHRcdHRhbmdlbnRzW2luZGV4ICsgMl0gPSB2YWx1ZXNbaSsrXTtcblx0XHRcdFx0XHRpbmRleCArPSBzdHJpZGU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKHRoaXMuX3ZlcnRleFRhbmdlbnRzID09IG51bGwpIHtcblx0XHRcdFx0dGhpcy5fdmVydGV4VGFuZ2VudHMgPSBuZXcgQXJyYXk8bnVtYmVyPih0aGlzLl9wb3NpdGlvbnMubGVuZ3RoKTtcblxuXHRcdFx0XHRpZiAodGhpcy5fY29uY2F0ZW5hdGVBcnJheXMpXG5cdFx0XHRcdFx0dGhpcy5fcE5vdGlmeVZlcnRpY2VzVXBkYXRlKCk7XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHR0aGlzLl9wU3RyaWRlT2Zmc2V0RGlydHkgPSB0cnVlO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGhpcy5fZmFjZVRhbmdlbnRzRGlydHkpXG5cdFx0XHRcdHRoaXMudXBkYXRlRmFjZVRhbmdlbnRzKCk7XG5cblx0XHRcdG9mZnNldCA9IHRoaXMuZ2V0T2Zmc2V0KFRyaWFuZ2xlU3ViR2VvbWV0cnkuVEFOR0VOVF9EQVRBKTtcblx0XHRcdHN0cmlkZSA9IHRoaXMuZ2V0U3RyaWRlKFRyaWFuZ2xlU3ViR2VvbWV0cnkuVEFOR0VOVF9EQVRBKTtcblxuXHRcdFx0Ly9hdXRvZGVyaXZlZCB0YW5nZW50c1xuXHRcdFx0dGFuZ2VudHMgPSB0aGlzLl9jb25jYXRlbmF0ZUFycmF5cz8gdGhpcy5fcFZlcnRpY2VzIDogdGhpcy5fdmVydGV4VGFuZ2VudHM7XG5cblx0XHRcdGluZGV4ID0gb2Zmc2V0O1xuXG5cdFx0XHQvL2NsZWFyIHRhbmdlbnQgdmFsdWVzXG5cdFx0XHR2YXIgbGVuVjpudW1iZXIgPSB0YW5nZW50cy5sZW5ndGg7XG5cdFx0XHR3aGlsZSAoaW5kZXggPCBsZW5WKSB7XG5cdFx0XHRcdHRhbmdlbnRzW2luZGV4XSA9IDA7XG5cdFx0XHRcdHRhbmdlbnRzW2luZGV4ICsgMV0gPSAwO1xuXHRcdFx0XHR0YW5nZW50c1tpbmRleCArIDJdID0gMDtcblxuXHRcdFx0XHRpbmRleCArPSBzdHJpZGU7XG5cdFx0XHR9XG5cblx0XHRcdHZhciBrOm51bWJlciA9IDA7XG5cdFx0XHR2YXIgd2VpZ2h0Om51bWJlcjtcblx0XHRcdHZhciBmMTpudW1iZXIgPSAwO1xuXHRcdFx0dmFyIGYyOm51bWJlciA9IDE7XG5cdFx0XHR2YXIgZjM6bnVtYmVyID0gMjtcblxuXHRcdFx0aSA9IDA7XG5cblx0XHRcdC8vY29sbGVjdCBmYWNlIHRhbmdlbnRzXG5cdFx0XHR2YXIgbGVuSTpudW1iZXIgPSB0aGlzLl9wSW5kaWNlcy5sZW5ndGg7XG5cdFx0XHR3aGlsZSAoaSA8IGxlbkkpIHtcblx0XHRcdFx0d2VpZ2h0ID0gdGhpcy5fdXNlRmFjZVdlaWdodHM/IHRoaXMuX2ZhY2VXZWlnaHRzW2srK10gOiAxO1xuXHRcdFx0XHRpbmRleCA9IG9mZnNldCArIHRoaXMuX3BJbmRpY2VzW2krK10qc3RyaWRlO1xuXHRcdFx0XHR0YW5nZW50c1tpbmRleCsrXSArPSB0aGlzLl9mYWNlVGFuZ2VudHNbZjFdKndlaWdodDtcblx0XHRcdFx0dGFuZ2VudHNbaW5kZXgrK10gKz0gdGhpcy5fZmFjZVRhbmdlbnRzW2YyXSp3ZWlnaHQ7XG5cdFx0XHRcdHRhbmdlbnRzW2luZGV4XSArPSB0aGlzLl9mYWNlVGFuZ2VudHNbZjNdKndlaWdodDtcblx0XHRcdFx0aW5kZXggPSBvZmZzZXQgKyB0aGlzLl9wSW5kaWNlc1tpKytdKnN0cmlkZTtcblx0XHRcdFx0dGFuZ2VudHNbaW5kZXgrK10gKz0gdGhpcy5fZmFjZVRhbmdlbnRzW2YxXSp3ZWlnaHQ7XG5cdFx0XHRcdHRhbmdlbnRzW2luZGV4KytdICs9IHRoaXMuX2ZhY2VUYW5nZW50c1tmMl0qd2VpZ2h0O1xuXHRcdFx0XHR0YW5nZW50c1tpbmRleF0gKz0gdGhpcy5fZmFjZVRhbmdlbnRzW2YzXSp3ZWlnaHQ7XG5cdFx0XHRcdGluZGV4ID0gb2Zmc2V0ICsgdGhpcy5fcEluZGljZXNbaSsrXSpzdHJpZGU7XG5cdFx0XHRcdHRhbmdlbnRzW2luZGV4KytdICs9IHRoaXMuX2ZhY2VUYW5nZW50c1tmMV0qd2VpZ2h0O1xuXHRcdFx0XHR0YW5nZW50c1tpbmRleCsrXSArPSB0aGlzLl9mYWNlVGFuZ2VudHNbZjJdKndlaWdodDtcblx0XHRcdFx0dGFuZ2VudHNbaW5kZXhdICs9IHRoaXMuX2ZhY2VUYW5nZW50c1tmM10qd2VpZ2h0O1xuXHRcdFx0XHRmMSArPSAzO1xuXHRcdFx0XHRmMiArPSAzO1xuXHRcdFx0XHRmMyArPSAzO1xuXHRcdFx0fVxuXG5cdFx0XHRpID0gMDtcblx0XHRcdGluZGV4ID0gb2Zmc2V0O1xuXG5cdFx0XHQvL2F2ZXJhZ2UgdGFuZ2VudHMgY29sbGVjdGlvbnNcblx0XHRcdHdoaWxlIChpbmRleCA8IGxlblYpIHtcblx0XHRcdFx0dmFyIHZ4Om51bWJlciA9IHRhbmdlbnRzW2luZGV4XTtcblx0XHRcdFx0dmFyIHZ5Om51bWJlciA9IHRhbmdlbnRzW2luZGV4ICsgMV07XG5cdFx0XHRcdHZhciB2ejpudW1iZXIgPSB0YW5nZW50c1tpbmRleCArIDJdO1xuXHRcdFx0XHR2YXIgZDpudW1iZXIgPSAxLjAvTWF0aC5zcXJ0KHZ4KnZ4ICsgdnkqdnkgKyB2eip2eik7XG5cblx0XHRcdFx0aWYgKHRoaXMuX2NvbmNhdGVuYXRlQXJyYXlzKSB7XG5cdFx0XHRcdFx0dGhpcy5fdmVydGV4VGFuZ2VudHNbaSsrXSA9IHRhbmdlbnRzW2luZGV4XSA9IHZ4KmQ7XG5cdFx0XHRcdFx0dGhpcy5fdmVydGV4VGFuZ2VudHNbaSsrXSA9IHRhbmdlbnRzW2luZGV4ICsgMV0gPSB2eSpkO1xuXHRcdFx0XHRcdHRoaXMuX3ZlcnRleFRhbmdlbnRzW2krK10gPSB0YW5nZW50c1tpbmRleCArIDJdID0gdnoqZDtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0YW5nZW50c1tpbmRleF0gPSB2eCpkO1xuXHRcdFx0XHRcdHRhbmdlbnRzW2luZGV4ICsgMV0gPSB2eSpkO1xuXHRcdFx0XHRcdHRhbmdlbnRzW2luZGV4ICsgMl0gPSB2eipkO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aW5kZXggKz0gc3RyaWRlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXMubm90aWZ5VGFuZ2VudHNVcGRhdGUoKTtcblxuXHRcdHRoaXMuX3ZlcnRleFRhbmdlbnRzRGlydHkgPSBmYWxzZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBVcGRhdGVzIHRoZSB1dnMgYmFzZWQgb24gdGhlIGdlb21ldHJ5LlxuXHQgKi9cblx0cHVibGljIHVwZGF0ZVVWcyh2YWx1ZXM6QXJyYXk8bnVtYmVyPilcblx0e1xuXHRcdHZhciBpOm51bWJlcjtcblx0XHR2YXIgaW5kZXg6bnVtYmVyO1xuXHRcdHZhciBvZmZzZXQ6bnVtYmVyO1xuXHRcdHZhciBzdHJpZGU6bnVtYmVyO1xuXHRcdHZhciB1dnM6QXJyYXk8bnVtYmVyPjtcblxuXHRcdGlmICghdGhpcy5fYXV0b0Rlcml2ZVVWcykge1xuXHRcdFx0aWYgKCh0aGlzLl91dnMgPT0gbnVsbCB8fCB2YWx1ZXMgPT0gbnVsbCkgJiYgKHRoaXMuX3V2cyAhPSBudWxsIHx8IHZhbHVlcyAhPSBudWxsKSkge1xuXHRcdFx0XHRpZiAodGhpcy5fY29uY2F0ZW5hdGVBcnJheXMpXG5cdFx0XHRcdFx0dGhpcy5fcE5vdGlmeVZlcnRpY2VzVXBkYXRlKCk7XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHR0aGlzLl9wU3RyaWRlT2Zmc2V0RGlydHkgPSB0cnVlO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLl91dnMgPSB2YWx1ZXM7XG5cblx0XHRcdGlmICh2YWx1ZXMgIT0gbnVsbCAmJiB0aGlzLl9jb25jYXRlbmF0ZUFycmF5cykge1xuXHRcdFx0XHRpID0gMDtcblx0XHRcdFx0aW5kZXggPSB0aGlzLmdldE9mZnNldChUcmlhbmdsZVN1Ykdlb21ldHJ5LlVWX0RBVEEpO1xuXHRcdFx0XHRzdHJpZGUgPSB0aGlzLmdldFN0cmlkZShUcmlhbmdsZVN1Ykdlb21ldHJ5LlVWX0RBVEEpO1xuXHRcdFx0XHR1dnMgPSB0aGlzLl9wVmVydGljZXM7XG5cblx0XHRcdFx0d2hpbGUgKGkgPCB2YWx1ZXMubGVuZ3RoKSB7XG5cdFx0XHRcdFx0dXZzW2luZGV4XSA9IHZhbHVlc1tpKytdO1xuXHRcdFx0XHRcdHV2c1tpbmRleCArIDFdID0gdmFsdWVzW2krK107XG5cdFx0XHRcdFx0aW5kZXggKz0gc3RyaWRlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKHRoaXMuX3V2cyA9PSBudWxsKSB7XG5cdFx0XHRcdHRoaXMuX3V2cyA9IG5ldyBBcnJheTxudW1iZXI+KHRoaXMuX3Bvc2l0aW9ucy5sZW5ndGgqMi8zKTtcblxuXHRcdFx0XHRpZiAodGhpcy5fY29uY2F0ZW5hdGVBcnJheXMpXG5cdFx0XHRcdFx0dGhpcy5fcE5vdGlmeVZlcnRpY2VzVXBkYXRlKCk7XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHR0aGlzLl9wU3RyaWRlT2Zmc2V0RGlydHkgPSB0cnVlO1xuXHRcdFx0fVxuXG5cdFx0XHRvZmZzZXQgPSB0aGlzLmdldE9mZnNldChUcmlhbmdsZVN1Ykdlb21ldHJ5LlVWX0RBVEEpO1xuXHRcdFx0c3RyaWRlID0gdGhpcy5nZXRTdHJpZGUoVHJpYW5nbGVTdWJHZW9tZXRyeS5VVl9EQVRBKTtcblxuXHRcdFx0Ly9hdXRvZGVyaXZlZCB1dnNcblx0XHRcdHV2cyA9IHRoaXMuX2NvbmNhdGVuYXRlQXJyYXlzPyB0aGlzLl9wVmVydGljZXMgOiB0aGlzLl91dnM7XG5cblx0XHRcdGkgPSAwO1xuXHRcdFx0aW5kZXggPSBvZmZzZXQ7XG5cdFx0XHR2YXIgdXZJZHg6bnVtYmVyID0gMDtcblxuXHRcdFx0Ly9jbGVhciB1diB2YWx1ZXNcblx0XHRcdHZhciBsZW5WOm51bWJlciA9IHV2cy5sZW5ndGg7XG5cdFx0XHR3aGlsZSAoaW5kZXggPCBsZW5WKSB7XG5cdFx0XHRcdGlmICh0aGlzLl9jb25jYXRlbmF0ZUFycmF5cykge1xuXHRcdFx0XHRcdHRoaXMuX3V2c1tpKytdID0gdXZzW2luZGV4XSA9IHV2SWR4Ki41O1xuXHRcdFx0XHRcdHRoaXMuX3V2c1tpKytdID0gdXZzW2luZGV4ICsgMV0gPSAxLjAgLSAodXZJZHggJiAxKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR1dnNbaW5kZXhdID0gdXZJZHgqLjU7XG5cdFx0XHRcdFx0dXZzW2luZGV4ICsgMV0gPSAxLjAgLSAodXZJZHggJiAxKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICgrK3V2SWR4ID09IDMpXG5cdFx0XHRcdFx0dXZJZHggPSAwO1xuXG5cdFx0XHRcdGluZGV4ICs9IHN0cmlkZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAodGhpcy5fYXV0b0Rlcml2ZVRhbmdlbnRzKVxuXHRcdFx0dGhpcy5ub3RpZnlUYW5nZW50c1VwZGF0ZSgpO1xuXG5cdFx0dGhpcy5ub3RpZnlVVnNVcGRhdGUoKTtcblxuXHRcdHRoaXMuX3V2c0RpcnR5ID0gZmFsc2U7XG5cdH1cblxuXHQvKipcblx0ICogVXBkYXRlcyB0aGUgc2Vjb25kYXJ5IHV2cyBiYXNlZCBvbiB0aGUgZ2VvbWV0cnkuXG5cdCAqL1xuXHRwdWJsaWMgdXBkYXRlU2Vjb25kYXJ5VVZzKHZhbHVlczpBcnJheTxudW1iZXI+KVxuXHR7XG5cdFx0dmFyIGk6bnVtYmVyO1xuXHRcdHZhciBpbmRleDpudW1iZXI7XG5cdFx0dmFyIG9mZnNldDpudW1iZXI7XG5cdFx0dmFyIHN0cmlkZTpudW1iZXI7XG5cdFx0dmFyIHV2czpBcnJheTxudW1iZXI+O1xuXG5cdFx0aWYgKHRoaXMuX2NvbmNhdGVuYXRlQXJyYXlzICYmICh0aGlzLl9zZWNvbmRhcnlVVnMgPT0gbnVsbCB8fCB2YWx1ZXMgPT0gbnVsbCkgJiYgKHRoaXMuX3NlY29uZGFyeVVWcyAhPSBudWxsIHx8IHZhbHVlcyAhPSBudWxsKSlcblx0XHRcdHRoaXMuX3BOb3RpZnlWZXJ0aWNlc1VwZGF0ZSgpO1xuXG5cdFx0dGhpcy5fc2Vjb25kYXJ5VVZzID0gdmFsdWVzO1xuXG5cdFx0aWYgKHZhbHVlcyAhPSBudWxsICYmIHRoaXMuX2NvbmNhdGVuYXRlQXJyYXlzKSB7XG5cdFx0XHRvZmZzZXQgPSB0aGlzLmdldE9mZnNldChUcmlhbmdsZVN1Ykdlb21ldHJ5LlNFQ09OREFSWV9VVl9EQVRBKTtcblx0XHRcdHN0cmlkZSA9IHRoaXMuZ2V0U3RyaWRlKFRyaWFuZ2xlU3ViR2VvbWV0cnkuU0VDT05EQVJZX1VWX0RBVEEpO1xuXG5cdFx0XHRpID0gMDtcblx0XHRcdGluZGV4ID0gb2Zmc2V0O1xuXHRcdFx0dXZzID0gdGhpcy5fcFZlcnRpY2VzO1xuXG5cdFx0XHR3aGlsZSAoaSA8IHZhbHVlcy5sZW5ndGgpIHtcblx0XHRcdFx0dXZzW2luZGV4XSA9IHZhbHVlc1tpKytdO1xuXHRcdFx0XHR1dnNbaW5kZXggKyAxXSA9IHZhbHVlc1tpKytdO1xuXHRcdFx0XHRpbmRleCArPSBzdHJpZGU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpcy5ub3RpZnlTZWNvbmRhcnlVVnNVcGRhdGUoKTtcblxuXHRcdHRoaXMuX3NlY29uZGFyeVVWc0RpcnR5ID0gZmFsc2U7XG5cdH1cblxuXHQvKipcblx0ICogVXBkYXRlcyB0aGUgam9pbnQgaW5kaWNlc1xuXHQgKi9cblx0cHVibGljIHVwZGF0ZUpvaW50SW5kaWNlcyh2YWx1ZXM6QXJyYXk8bnVtYmVyPilcblx0e1xuXHRcdHZhciBpOm51bWJlcjtcblx0XHR2YXIgajpudW1iZXI7XG5cdFx0dmFyIGluZGV4Om51bWJlcjtcblx0XHR2YXIgb2Zmc2V0Om51bWJlcjtcblx0XHR2YXIgc3RyaWRlOm51bWJlcjtcblx0XHR2YXIgam9pbnRJbmRpY2VzOkFycmF5PG51bWJlcj47XG5cblx0XHRpZiAodGhpcy5fY29uY2F0ZW5hdGVBcnJheXMgJiYgKHRoaXMuX2pvaW50SW5kaWNlcyA9PSBudWxsIHx8IHZhbHVlcyA9PSBudWxsKSAmJiAodGhpcy5fam9pbnRJbmRpY2VzICE9IG51bGwgfHwgdmFsdWVzICE9IG51bGwpKVxuXHRcdFx0dGhpcy5fcE5vdGlmeVZlcnRpY2VzVXBkYXRlKCk7XG5cblx0XHR0aGlzLl9qb2ludEluZGljZXMgPSB2YWx1ZXM7XG5cblx0XHRpZiAodmFsdWVzICE9IG51bGwpIHtcblx0XHRcdG9mZnNldCA9IHRoaXMuZ2V0T2Zmc2V0KFRyaWFuZ2xlU3ViR2VvbWV0cnkuSk9JTlRfSU5ERVhfREFUQSk7XG5cdFx0XHRzdHJpZGUgPSB0aGlzLmdldFN0cmlkZShUcmlhbmdsZVN1Ykdlb21ldHJ5LkpPSU5UX0lOREVYX0RBVEEpO1xuXHRcdFx0aWYgKHRoaXMuX3VzZUNvbmRlbnNlZEluZGljZXMpIHtcblx0XHRcdFx0aSA9IDA7XG5cdFx0XHRcdGogPSAwO1xuXHRcdFx0XHRpbmRleCA9IG9mZnNldDtcblx0XHRcdFx0am9pbnRJbmRpY2VzID0gdGhpcy5fY29uY2F0ZW5hdGVBcnJheXM/IHRoaXMuX3BWZXJ0aWNlcyA6IHRoaXMuX2NvbmRlbnNlZEpvaW50SW5kaWNlcztcblx0XHRcdFx0dmFyIG9sZEluZGV4Om51bWJlcjtcblx0XHRcdFx0dmFyIG5ld0luZGV4Om51bWJlciA9IDA7XG5cdFx0XHRcdHZhciBkaWM6T2JqZWN0ID0gbmV3IE9iamVjdCgpO1xuXG5cdFx0XHRcdGlmICghdGhpcy5fY29uY2F0ZW5hdGVBcnJheXMpXG5cdFx0XHRcdFx0dGhpcy5fY29uZGVuc2VkSm9pbnRJbmRpY2VzID0gbmV3IEFycmF5PG51bWJlcj4odmFsdWVzLmxlbmd0aCk7XG5cblx0XHRcdFx0dGhpcy5fY29uZGVuc2VkSW5kZXhMb29rVXAgPSBuZXcgQXJyYXk8bnVtYmVyPigpO1xuXG5cdFx0XHRcdHdoaWxlIChpIDwgdmFsdWVzLmxlbmd0aCkge1xuXHRcdFx0XHRcdGZvciAoaiA9IDA7IGogPCB0aGlzLl9qb2ludHNQZXJWZXJ0ZXg7IGorKykge1xuXHRcdFx0XHRcdFx0b2xkSW5kZXggPSB2YWx1ZXNbaSsrXTtcblxuXHRcdFx0XHRcdFx0Ly8gaWYgd2UgZW5jb3VudGVyIGEgbmV3IGluZGV4LCBhc3NpZ24gaXQgYSBuZXcgY29uZGVuc2VkIGluZGV4XG5cdFx0XHRcdFx0XHRpZiAoZGljW29sZEluZGV4XSA9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdFx0ZGljW29sZEluZGV4XSA9IG5ld0luZGV4KjM7IC8vMyByZXF1aXJlZCBmb3IgdGhlIHRocmVlIHZlY3RvcnMgdGhhdCBzdG9yZSB0aGUgbWF0cml4XG5cdFx0XHRcdFx0XHRcdHRoaXMuX2NvbmRlbnNlZEluZGV4TG9va1VwW25ld0luZGV4KytdID0gb2xkSW5kZXg7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRqb2ludEluZGljZXNbaW5kZXggKyBqXSA9IGRpY1tvbGRJbmRleF07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGluZGV4ICs9IHN0cmlkZTtcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLl9udW1Db25kZW5zZWRKb2ludHMgPSBuZXdJbmRleDtcblx0XHRcdH0gZWxzZSBpZiAodGhpcy5fY29uY2F0ZW5hdGVBcnJheXMpIHtcblxuXHRcdFx0XHRpID0gMDtcblx0XHRcdFx0aW5kZXggPSBvZmZzZXQ7XG5cdFx0XHRcdGpvaW50SW5kaWNlcyA9IHRoaXMuX3BWZXJ0aWNlcztcblxuXHRcdFx0XHR3aGlsZSAoaSA8IHZhbHVlcy5sZW5ndGgpIHtcblx0XHRcdFx0XHRqID0gMDtcblx0XHRcdFx0XHR3aGlsZSAoaiA8IHRoaXMuX2pvaW50c1BlclZlcnRleClcblx0XHRcdFx0XHRcdGpvaW50SW5kaWNlc1tpbmRleCArIGorK10gPSB2YWx1ZXNbaSsrXTtcblx0XHRcdFx0XHRpbmRleCArPSBzdHJpZGU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHR0aGlzLm5vdGlmeUpvaW50SW5kaWNlc1VwZGF0ZSgpO1xuXG5cdFx0dGhpcy5fam9pbnRJbmRpY2VzRGlydHkgPSBmYWxzZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBVcGRhdGVzIHRoZSBqb2ludCB3ZWlnaHRzLlxuXHQgKi9cblx0cHVibGljIHVwZGF0ZUpvaW50V2VpZ2h0cyh2YWx1ZXM6QXJyYXk8bnVtYmVyPilcblx0e1xuXHRcdHZhciBpOm51bWJlcjtcblx0XHR2YXIgajpudW1iZXI7XG5cdFx0dmFyIGluZGV4Om51bWJlcjtcblx0XHR2YXIgb2Zmc2V0Om51bWJlcjtcblx0XHR2YXIgc3RyaWRlOm51bWJlcjtcblx0XHR2YXIgam9pbnRXZWlnaHRzOkFycmF5PG51bWJlcj47XG5cblx0XHRpZiAodGhpcy5fY29uY2F0ZW5hdGVBcnJheXMgJiYgKHRoaXMuX2pvaW50V2VpZ2h0cyA9PSBudWxsIHx8IHZhbHVlcyA9PSBudWxsKSAmJiAodGhpcy5fam9pbnRXZWlnaHRzICE9IG51bGwgfHwgdmFsdWVzICE9IG51bGwpKVxuXHRcdFx0dGhpcy5fcE5vdGlmeVZlcnRpY2VzVXBkYXRlKCk7XG5cblx0XHR0aGlzLl9qb2ludFdlaWdodHMgPSB2YWx1ZXM7XG5cblx0XHRpZiAodmFsdWVzICE9IG51bGwgJiYgdGhpcy5fY29uY2F0ZW5hdGVBcnJheXMpIHtcblx0XHRcdG9mZnNldCA9IHRoaXMuZ2V0T2Zmc2V0KFRyaWFuZ2xlU3ViR2VvbWV0cnkuSk9JTlRfV0VJR0hUX0RBVEEpO1xuXHRcdFx0c3RyaWRlID0gdGhpcy5nZXRTdHJpZGUoVHJpYW5nbGVTdWJHZW9tZXRyeS5KT0lOVF9XRUlHSFRfREFUQSk7XG5cblx0XHRcdGkgPSAwO1xuXHRcdFx0aW5kZXggPSBvZmZzZXQ7XG5cdFx0XHRqb2ludFdlaWdodHMgPSB0aGlzLl9wVmVydGljZXM7XG5cblx0XHRcdHdoaWxlIChpIDwgdmFsdWVzLmxlbmd0aCkge1xuXHRcdFx0XHRqID0gMDtcblx0XHRcdFx0d2hpbGUgKGogPCB0aGlzLl9qb2ludHNQZXJWZXJ0ZXgpXG5cdFx0XHRcdFx0am9pbnRXZWlnaHRzW2luZGV4ICsgaisrXSA9IHZhbHVlc1tpKytdO1xuXHRcdFx0XHRpbmRleCArPSBzdHJpZGU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpcy5ub3RpZnlKb2ludFdlaWdodHNVcGRhdGUoKTtcblxuXHRcdHRoaXMuX2pvaW50V2VpZ2h0c0RpcnR5ID0gZmFsc2U7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBkaXNwb3NlKClcblx0e1xuXHRcdHN1cGVyLmRpc3Bvc2UoKTtcblxuXHRcdHRoaXMuX3Bvc2l0aW9ucyA9IG51bGw7XG5cdFx0dGhpcy5fdmVydGV4Tm9ybWFscyA9IG51bGw7XG5cdFx0dGhpcy5fdmVydGV4VGFuZ2VudHMgPSBudWxsO1xuXHRcdHRoaXMuX3V2cyA9IG51bGw7XG5cdFx0dGhpcy5fc2Vjb25kYXJ5VVZzID0gbnVsbDtcblx0XHR0aGlzLl9qb2ludEluZGljZXMgPSBudWxsO1xuXHRcdHRoaXMuX2pvaW50V2VpZ2h0cyA9IG51bGw7XG5cblx0XHR0aGlzLl9mYWNlTm9ybWFscyA9IG51bGw7XG5cdFx0dGhpcy5fZmFjZVdlaWdodHMgPSBudWxsO1xuXHRcdHRoaXMuX2ZhY2VUYW5nZW50cyA9IG51bGw7XG5cdH1cblxuXHQvKipcblx0ICogVXBkYXRlcyB0aGUgZmFjZSBpbmRpY2VzIG9mIHRoZSBUcmlhbmdsZVN1Ykdlb21ldHJ5LlxuXHQgKlxuXHQgKiBAcGFyYW0gaW5kaWNlcyBUaGUgZmFjZSBpbmRpY2VzIHRvIHVwbG9hZC5cblx0ICovXG5cdHB1YmxpYyB1cGRhdGVJbmRpY2VzKGluZGljZXM6QXJyYXk8bnVtYmVyPilcblx0e1xuXHRcdHN1cGVyLnVwZGF0ZUluZGljZXMoaW5kaWNlcyk7XG5cblx0XHR0aGlzLl9mYWNlTm9ybWFsc0RpcnR5ID0gdHJ1ZTtcblxuXHRcdGlmICh0aGlzLl9hdXRvRGVyaXZlTm9ybWFscylcblx0XHRcdHRoaXMuX3ZlcnRleE5vcm1hbHNEaXJ0eSA9IHRydWU7XG5cblx0XHRpZiAodGhpcy5fYXV0b0Rlcml2ZVRhbmdlbnRzKVxuXHRcdFx0dGhpcy5fdmVydGV4VGFuZ2VudHNEaXJ0eSA9IHRydWU7XG5cblx0XHRpZiAodGhpcy5fYXV0b0Rlcml2ZVVWcylcblx0XHRcdHRoaXMuX3V2c0RpcnR5ID0gdHJ1ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDbG9uZXMgdGhlIGN1cnJlbnQgb2JqZWN0XG5cdCAqIEByZXR1cm4gQW4gZXhhY3QgZHVwbGljYXRlIG9mIHRoZSBjdXJyZW50IG9iamVjdC5cblx0ICovXG5cdHB1YmxpYyBjbG9uZSgpOlRyaWFuZ2xlU3ViR2VvbWV0cnlcblx0e1xuXHRcdHZhciBjbG9uZTpUcmlhbmdsZVN1Ykdlb21ldHJ5ID0gbmV3IFRyaWFuZ2xlU3ViR2VvbWV0cnkodGhpcy5fY29uY2F0ZW5hdGVBcnJheXMpO1xuXHRcdGNsb25lLnVwZGF0ZUluZGljZXModGhpcy5fcEluZGljZXMuY29uY2F0KCkpO1xuXHRcdGNsb25lLnVwZGF0ZVBvc2l0aW9ucyh0aGlzLl9wb3NpdGlvbnMuY29uY2F0KCkpO1xuXG5cdFx0aWYgKHRoaXMuX3ZlcnRleE5vcm1hbHMgJiYgIXRoaXMuX2F1dG9EZXJpdmVOb3JtYWxzKVxuXHRcdFx0Y2xvbmUudXBkYXRlVmVydGV4Tm9ybWFscyh0aGlzLl92ZXJ0ZXhOb3JtYWxzLmNvbmNhdCgpKTtcblx0XHRlbHNlXG5cdFx0XHRjbG9uZS51cGRhdGVWZXJ0ZXhOb3JtYWxzKG51bGwpO1xuXG5cdFx0aWYgKHRoaXMuX3V2cyAmJiAhdGhpcy5fYXV0b0Rlcml2ZVVWcylcblx0XHRcdGNsb25lLnVwZGF0ZVVWcyh0aGlzLl91dnMuY29uY2F0KCkpO1xuXHRcdGVsc2Vcblx0XHRcdGNsb25lLnVwZGF0ZVVWcyhudWxsKTtcblxuXHRcdGlmICh0aGlzLl92ZXJ0ZXhUYW5nZW50cyAmJiAhdGhpcy5fYXV0b0Rlcml2ZVRhbmdlbnRzKVxuXHRcdFx0Y2xvbmUudXBkYXRlVmVydGV4VGFuZ2VudHModGhpcy5fdmVydGV4VGFuZ2VudHMuY29uY2F0KCkpO1xuXHRcdGVsc2Vcblx0XHRcdGNsb25lLnVwZGF0ZVZlcnRleFRhbmdlbnRzKG51bGwpO1xuXG5cdFx0aWYgKHRoaXMuX3NlY29uZGFyeVVWcylcblx0XHRcdGNsb25lLnVwZGF0ZVNlY29uZGFyeVVWcyh0aGlzLl9zZWNvbmRhcnlVVnMuY29uY2F0KCkpO1xuXG5cdFx0aWYgKHRoaXMuX2pvaW50SW5kaWNlcykge1xuXHRcdFx0Y2xvbmUuam9pbnRzUGVyVmVydGV4ID0gdGhpcy5fam9pbnRzUGVyVmVydGV4O1xuXHRcdFx0Y2xvbmUudXBkYXRlSm9pbnRJbmRpY2VzKHRoaXMuX2pvaW50SW5kaWNlcy5jb25jYXQoKSk7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX2pvaW50V2VpZ2h0cylcblx0XHRcdGNsb25lLnVwZGF0ZUpvaW50V2VpZ2h0cyh0aGlzLl9qb2ludFdlaWdodHMuY29uY2F0KCkpO1xuXG5cdFx0cmV0dXJuIGNsb25lO1xuXHR9XG5cblx0cHVibGljIHNjYWxlVVYoc2NhbGVVOm51bWJlciA9IDEsIHNjYWxlVjpudW1iZXIgPSAxKVxuXHR7XG5cdFx0dmFyIGluZGV4Om51bWJlcjtcblx0XHR2YXIgb2Zmc2V0Om51bWJlcjtcblx0XHR2YXIgc3RyaWRlOm51bWJlcjtcblx0XHR2YXIgdXZzOkFycmF5PG51bWJlcj47XG5cblx0XHR1dnMgPSB0aGlzLl91dnM7XG5cblx0XHR2YXIgcmF0aW9VOm51bWJlciA9IHNjYWxlVS90aGlzLl9zY2FsZVU7XG5cdFx0dmFyIHJhdGlvVjpudW1iZXIgPSBzY2FsZVYvdGhpcy5fc2NhbGVWO1xuXG5cdFx0dGhpcy5fc2NhbGVVID0gc2NhbGVVO1xuXHRcdHRoaXMuX3NjYWxlViA9IHNjYWxlVjtcblxuXHRcdHZhciBsZW46bnVtYmVyID0gdXZzLmxlbmd0aDtcblxuXHRcdG9mZnNldCA9IDA7XG5cdFx0c3RyaWRlID0gMjtcblxuXHRcdGluZGV4ID0gb2Zmc2V0O1xuXG5cdFx0d2hpbGUgKGluZGV4IDwgbGVuKSB7XG5cdFx0XHR1dnNbaW5kZXhdICo9IHJhdGlvVTtcblx0XHRcdHV2c1tpbmRleCArIDFdICo9IHJhdGlvVjtcblx0XHRcdGluZGV4ICs9IHN0cmlkZTtcblx0XHR9XG5cblx0XHR0aGlzLm5vdGlmeVVWc1VwZGF0ZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNjYWxlcyB0aGUgZ2VvbWV0cnkuXG5cdCAqIEBwYXJhbSBzY2FsZSBUaGUgYW1vdW50IGJ5IHdoaWNoIHRvIHNjYWxlLlxuXHQgKi9cblx0cHVibGljIHNjYWxlKHNjYWxlOm51bWJlcilcblx0e1xuXHRcdHZhciBpOm51bWJlcjtcblx0XHR2YXIgaW5kZXg6bnVtYmVyO1xuXHRcdHZhciBvZmZzZXQ6bnVtYmVyO1xuXHRcdHZhciBzdHJpZGU6bnVtYmVyO1xuXHRcdHZhciBwb3NpdGlvbnM6QXJyYXk8bnVtYmVyPjtcblxuXHRcdHBvc2l0aW9ucyA9IHRoaXMuX3Bvc2l0aW9ucztcblxuXHRcdHZhciBsZW46bnVtYmVyID0gcG9zaXRpb25zLmxlbmd0aDtcblxuXHRcdG9mZnNldCA9IDA7XG5cdFx0c3RyaWRlID0gMztcblxuXHRcdGkgPSAwO1xuXHRcdGluZGV4ID0gb2Zmc2V0O1xuXHRcdHdoaWxlIChpIDwgbGVuKSB7XG5cdFx0XHRwb3NpdGlvbnNbaW5kZXhdICo9IHNjYWxlO1xuXHRcdFx0cG9zaXRpb25zW2luZGV4ICsgMV0gKj0gc2NhbGU7XG5cdFx0XHRwb3NpdGlvbnNbaW5kZXggKyAyXSAqPSBzY2FsZTtcblxuXHRcdFx0aSArPSAzO1xuXHRcdFx0aW5kZXggKz0gc3RyaWRlO1xuXHRcdH1cblxuXHRcdHRoaXMubm90aWZ5UG9zaXRpb25zVXBkYXRlKCk7XG5cdH1cblxuXHRwdWJsaWMgYXBwbHlUcmFuc2Zvcm1hdGlvbih0cmFuc2Zvcm06TWF0cml4M0QpXG5cdHtcblx0XHR2YXIgcG9zaXRpb25zOkFycmF5PG51bWJlcj47XG5cdFx0dmFyIG5vcm1hbHM6QXJyYXk8bnVtYmVyPjtcblx0XHR2YXIgdGFuZ2VudHM6QXJyYXk8bnVtYmVyPjtcblxuXHRcdGlmICh0aGlzLl9jb25jYXRlbmF0ZUFycmF5cykge1xuXHRcdFx0cG9zaXRpb25zID0gdGhpcy5fcFZlcnRpY2VzO1xuXHRcdFx0bm9ybWFscyA9IHRoaXMuX3BWZXJ0aWNlcztcblx0XHRcdHRhbmdlbnRzID0gdGhpcy5fcFZlcnRpY2VzO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRwb3NpdGlvbnMgPSB0aGlzLl9wb3NpdGlvbnM7XG5cdFx0XHRub3JtYWxzID0gdGhpcy5fdmVydGV4Tm9ybWFscztcblx0XHRcdHRhbmdlbnRzID0gdGhpcy5fdmVydGV4VGFuZ2VudHM7XG5cdFx0fVxuXG5cdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9wb3NpdGlvbnMubGVuZ3RoLzM7XG5cdFx0dmFyIGk6bnVtYmVyO1xuXHRcdHZhciBpMTpudW1iZXI7XG5cdFx0dmFyIGkyOm51bWJlcjtcblx0XHR2YXIgdmVjdG9yOlZlY3RvcjNEID0gbmV3IFZlY3RvcjNEKCk7XG5cblx0XHR2YXIgYmFrZU5vcm1hbHM6Ym9vbGVhbiA9IHRoaXMuX3ZlcnRleE5vcm1hbHMgIT0gbnVsbDtcblx0XHR2YXIgYmFrZVRhbmdlbnRzOmJvb2xlYW4gPSB0aGlzLl92ZXJ0ZXhUYW5nZW50cyAhPSBudWxsO1xuXHRcdHZhciBpbnZUcmFuc3Bvc2U6TWF0cml4M0Q7XG5cblx0XHRpZiAoYmFrZU5vcm1hbHMgfHwgYmFrZVRhbmdlbnRzKSB7XG5cdFx0XHRpbnZUcmFuc3Bvc2UgPSB0cmFuc2Zvcm0uY2xvbmUoKTtcblx0XHRcdGludlRyYW5zcG9zZS5pbnZlcnQoKTtcblx0XHRcdGludlRyYW5zcG9zZS50cmFuc3Bvc2UoKTtcblx0XHR9XG5cblx0XHR2YXIgdmkwOm51bWJlciA9IHRoaXMuZ2V0T2Zmc2V0KFRyaWFuZ2xlU3ViR2VvbWV0cnkuUE9TSVRJT05fREFUQSk7XG5cdFx0dmFyIG5pMDpudW1iZXIgPSB0aGlzLmdldE9mZnNldChUcmlhbmdsZVN1Ykdlb21ldHJ5Lk5PUk1BTF9EQVRBKTtcblx0XHR2YXIgdGkwOm51bWJlciA9IHRoaXMuZ2V0T2Zmc2V0KFRyaWFuZ2xlU3ViR2VvbWV0cnkuVEFOR0VOVF9EQVRBKTtcblxuXHRcdHZhciB2U3RyaWRlOm51bWJlciA9IHRoaXMuZ2V0U3RyaWRlKFRyaWFuZ2xlU3ViR2VvbWV0cnkuUE9TSVRJT05fREFUQSk7XG5cdFx0dmFyIG5TdHJpZGU6bnVtYmVyID0gdGhpcy5nZXRTdHJpZGUoVHJpYW5nbGVTdWJHZW9tZXRyeS5OT1JNQUxfREFUQSk7XG5cdFx0dmFyIHRTdHJpZGU6bnVtYmVyID0gdGhpcy5nZXRTdHJpZGUoVHJpYW5nbGVTdWJHZW9tZXRyeS5UQU5HRU5UX0RBVEEpO1xuXG5cdFx0Zm9yIChpID0gMDsgaSA8IGxlbjsgKytpKSB7XG5cdFx0XHRpMSA9IHZpMCArIDE7XG5cdFx0XHRpMiA9IHZpMCArIDI7XG5cblx0XHRcdC8vIGJha2UgcG9zaXRpb25cblx0XHRcdHZlY3Rvci54ID0gcG9zaXRpb25zW3ZpMF07XG5cdFx0XHR2ZWN0b3IueSA9IHBvc2l0aW9uc1tpMV07XG5cdFx0XHR2ZWN0b3IueiA9IHBvc2l0aW9uc1tpMl07XG5cdFx0XHR2ZWN0b3IgPSB0cmFuc2Zvcm0udHJhbnNmb3JtVmVjdG9yKHZlY3Rvcik7XG5cdFx0XHRwb3NpdGlvbnNbdmkwXSA9IHZlY3Rvci54O1xuXHRcdFx0cG9zaXRpb25zW2kxXSA9IHZlY3Rvci55O1xuXHRcdFx0cG9zaXRpb25zW2kyXSA9IHZlY3Rvci56O1xuXHRcdFx0dmkwICs9IHZTdHJpZGU7XG5cblx0XHRcdC8vIGJha2Ugbm9ybWFsXG5cdFx0XHRpZiAoYmFrZU5vcm1hbHMpIHtcblx0XHRcdFx0aTEgPSBuaTAgKyAxO1xuXHRcdFx0XHRpMiA9IG5pMCArIDI7XG5cdFx0XHRcdHZlY3Rvci54ID0gbm9ybWFsc1tuaTBdO1xuXHRcdFx0XHR2ZWN0b3IueSA9IG5vcm1hbHNbaTFdO1xuXHRcdFx0XHR2ZWN0b3IueiA9IG5vcm1hbHNbaTJdO1xuXHRcdFx0XHR2ZWN0b3IgPSBpbnZUcmFuc3Bvc2UuZGVsdGFUcmFuc2Zvcm1WZWN0b3IodmVjdG9yKTtcblx0XHRcdFx0dmVjdG9yLm5vcm1hbGl6ZSgpO1xuXHRcdFx0XHRub3JtYWxzW25pMF0gPSB2ZWN0b3IueDtcblx0XHRcdFx0bm9ybWFsc1tpMV0gPSB2ZWN0b3IueTtcblx0XHRcdFx0bm9ybWFsc1tpMl0gPSB2ZWN0b3Iuejtcblx0XHRcdFx0bmkwICs9IG5TdHJpZGU7XG5cdFx0XHR9XG5cblx0XHRcdC8vIGJha2UgdGFuZ2VudFxuXHRcdFx0aWYgKGJha2VUYW5nZW50cykge1xuXHRcdFx0XHRpMSA9IHRpMCArIDE7XG5cdFx0XHRcdGkyID0gdGkwICsgMjtcblx0XHRcdFx0dmVjdG9yLnggPSB0YW5nZW50c1t0aTBdO1xuXHRcdFx0XHR2ZWN0b3IueSA9IHRhbmdlbnRzW2kxXTtcblx0XHRcdFx0dmVjdG9yLnogPSB0YW5nZW50c1tpMl07XG5cdFx0XHRcdHZlY3RvciA9IGludlRyYW5zcG9zZS5kZWx0YVRyYW5zZm9ybVZlY3Rvcih2ZWN0b3IpO1xuXHRcdFx0XHR2ZWN0b3Iubm9ybWFsaXplKCk7XG5cdFx0XHRcdHRhbmdlbnRzW3RpMF0gPSB2ZWN0b3IueDtcblx0XHRcdFx0dGFuZ2VudHNbaTFdID0gdmVjdG9yLnk7XG5cdFx0XHRcdHRhbmdlbnRzW2kyXSA9IHZlY3Rvci56O1xuXHRcdFx0XHR0aTAgKz0gdFN0cmlkZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR0aGlzLm5vdGlmeVBvc2l0aW9uc1VwZGF0ZSgpO1xuXHRcdHRoaXMubm90aWZ5Tm9ybWFsc1VwZGF0ZSgpO1xuXHRcdHRoaXMubm90aWZ5VGFuZ2VudHNVcGRhdGUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBVcGRhdGVzIHRoZSB0YW5nZW50cyBmb3IgZWFjaCBmYWNlLlxuXHQgKi9cblx0cHJpdmF0ZSB1cGRhdGVGYWNlVGFuZ2VudHMoKVxuXHR7XG5cdFx0dmFyIGk6bnVtYmVyID0gMDtcblx0XHR2YXIgaW5kZXgxOm51bWJlcjtcblx0XHR2YXIgaW5kZXgyOm51bWJlcjtcblx0XHR2YXIgaW5kZXgzOm51bWJlcjtcblx0XHR2YXIgdmk6bnVtYmVyO1xuXHRcdHZhciB2MDpudW1iZXI7XG5cdFx0dmFyIGR2MTpudW1iZXI7XG5cdFx0dmFyIGR2MjpudW1iZXI7XG5cdFx0dmFyIGRlbm9tOm51bWJlcjtcblx0XHR2YXIgeDA6bnVtYmVyLCB5MDpudW1iZXIsIHowOm51bWJlcjtcblx0XHR2YXIgZHgxOm51bWJlciwgZHkxOm51bWJlciwgZHoxOm51bWJlcjtcblx0XHR2YXIgZHgyOm51bWJlciwgZHkyOm51bWJlciwgZHoyOm51bWJlcjtcblx0XHR2YXIgY3g6bnVtYmVyLCBjeTpudW1iZXIsIGN6Om51bWJlcjtcblxuXHRcdHZhciBwb3NpdGlvbnM6QXJyYXk8bnVtYmVyPiA9IHRoaXMuX3Bvc2l0aW9uc1xuXHRcdHZhciB1dnM6QXJyYXk8bnVtYmVyPiA9IHRoaXMuX3V2cztcblxuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fcEluZGljZXMubGVuZ3RoO1xuXG5cdFx0aWYgKHRoaXMuX2ZhY2VUYW5nZW50cyA9PSBudWxsKVxuXHRcdFx0dGhpcy5fZmFjZVRhbmdlbnRzID0gbmV3IEFycmF5PG51bWJlcj4obGVuKTtcblxuXHRcdHdoaWxlIChpIDwgbGVuKSB7XG5cdFx0XHRpbmRleDEgPSB0aGlzLl9wSW5kaWNlc1tpXTtcblx0XHRcdGluZGV4MiA9IHRoaXMuX3BJbmRpY2VzW2kgKyAxXTtcblx0XHRcdGluZGV4MyA9IHRoaXMuX3BJbmRpY2VzW2kgKyAyXTtcblxuXHRcdFx0djAgPSB1dnNbaW5kZXgxKjIgKyAxXTtcblx0XHRcdGR2MSA9IHV2c1tpbmRleDIqMiArIDFdIC0gdjA7XG5cdFx0XHRkdjIgPSB1dnNbaW5kZXgzKjIgKyAxXSAtIHYwO1xuXG5cdFx0XHR2aSA9IGluZGV4MSozO1xuXHRcdFx0eDAgPSBwb3NpdGlvbnNbdmldO1xuXHRcdFx0eTAgPSBwb3NpdGlvbnNbdmkgKyAxXTtcblx0XHRcdHowID0gcG9zaXRpb25zW3ZpICsgMl07XG5cdFx0XHR2aSA9IGluZGV4MiozO1xuXHRcdFx0ZHgxID0gcG9zaXRpb25zW3ZpXSAtIHgwO1xuXHRcdFx0ZHkxID0gcG9zaXRpb25zW3ZpICsgMV0gLSB5MDtcblx0XHRcdGR6MSA9IHBvc2l0aW9uc1t2aSArIDJdIC0gejA7XG5cdFx0XHR2aSA9IGluZGV4MyozO1xuXHRcdFx0ZHgyID0gcG9zaXRpb25zW3ZpXSAtIHgwO1xuXHRcdFx0ZHkyID0gcG9zaXRpb25zW3ZpICsgMV0gLSB5MDtcblx0XHRcdGR6MiA9IHBvc2l0aW9uc1t2aSArIDJdIC0gejA7XG5cblx0XHRcdGN4ID0gZHYyKmR4MSAtIGR2MSpkeDI7XG5cdFx0XHRjeSA9IGR2MipkeTEgLSBkdjEqZHkyO1xuXHRcdFx0Y3ogPSBkdjIqZHoxIC0gZHYxKmR6Mjtcblx0XHRcdGRlbm9tID0gMS9NYXRoLnNxcnQoY3gqY3ggKyBjeSpjeSArIGN6KmN6KTtcblxuXHRcdFx0dGhpcy5fZmFjZVRhbmdlbnRzW2krK10gPSBkZW5vbSpjeDtcblx0XHRcdHRoaXMuX2ZhY2VUYW5nZW50c1tpKytdID0gZGVub20qY3k7XG5cdFx0XHR0aGlzLl9mYWNlVGFuZ2VudHNbaSsrXSA9IGRlbm9tKmN6O1xuXHRcdH1cblxuXHRcdHRoaXMuX2ZhY2VUYW5nZW50c0RpcnR5ID0gZmFsc2U7XG5cdH1cblxuXHQvKipcblx0ICogVXBkYXRlcyB0aGUgbm9ybWFscyBmb3IgZWFjaCBmYWNlLlxuXHQgKi9cblx0cHJpdmF0ZSB1cGRhdGVGYWNlTm9ybWFscygpXG5cdHtcblx0XHR2YXIgaTpudW1iZXIgPSAwO1xuXHRcdHZhciBqOm51bWJlciA9IDA7XG5cdFx0dmFyIGs6bnVtYmVyID0gMDtcblx0XHR2YXIgaW5kZXg6bnVtYmVyO1xuXHRcdHZhciBvZmZzZXQ6bnVtYmVyO1xuXHRcdHZhciBzdHJpZGU6bnVtYmVyO1xuXG5cdFx0dmFyIHgxOm51bWJlciwgeDI6bnVtYmVyLCB4MzpudW1iZXI7XG5cdFx0dmFyIHkxOm51bWJlciwgeTI6bnVtYmVyLCB5MzpudW1iZXI7XG5cdFx0dmFyIHoxOm51bWJlciwgejI6bnVtYmVyLCB6MzpudW1iZXI7XG5cdFx0dmFyIGR4MTpudW1iZXIsIGR5MTpudW1iZXIsIGR6MTpudW1iZXI7XG5cdFx0dmFyIGR4MjpudW1iZXIsIGR5MjpudW1iZXIsIGR6MjpudW1iZXI7XG5cdFx0dmFyIGN4Om51bWJlciwgY3k6bnVtYmVyLCBjejpudW1iZXI7XG5cdFx0dmFyIGQ6bnVtYmVyO1xuXG5cdFx0dmFyIHBvc2l0aW9uczpBcnJheTxudW1iZXI+ID0gdGhpcy5fcG9zaXRpb25zO1xuXG5cdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9wSW5kaWNlcy5sZW5ndGg7XG5cblx0XHRpZiAodGhpcy5fZmFjZU5vcm1hbHMgPT0gbnVsbClcblx0XHRcdHRoaXMuX2ZhY2VOb3JtYWxzID0gbmV3IEFycmF5PG51bWJlcj4obGVuKTtcblxuXHRcdGlmICh0aGlzLl91c2VGYWNlV2VpZ2h0cyAmJiB0aGlzLl9mYWNlV2VpZ2h0cyA9PSBudWxsKVxuXHRcdFx0dGhpcy5fZmFjZVdlaWdodHMgPSBuZXcgQXJyYXk8bnVtYmVyPihsZW4vMyk7XG5cblx0XHR3aGlsZSAoaSA8IGxlbikge1xuXHRcdFx0aW5kZXggPSB0aGlzLl9wSW5kaWNlc1tpKytdKjM7XG5cdFx0XHR4MSA9IHBvc2l0aW9uc1tpbmRleF07XG5cdFx0XHR5MSA9IHBvc2l0aW9uc1tpbmRleCArIDFdO1xuXHRcdFx0ejEgPSBwb3NpdGlvbnNbaW5kZXggKyAyXTtcblx0XHRcdGluZGV4ID0gdGhpcy5fcEluZGljZXNbaSsrXSozO1xuXHRcdFx0eDIgPSBwb3NpdGlvbnNbaW5kZXhdO1xuXHRcdFx0eTIgPSBwb3NpdGlvbnNbaW5kZXggKyAxXTtcblx0XHRcdHoyID0gcG9zaXRpb25zW2luZGV4ICsgMl07XG5cdFx0XHRpbmRleCA9IHRoaXMuX3BJbmRpY2VzW2krK10qMztcblx0XHRcdHgzID0gcG9zaXRpb25zW2luZGV4XTtcblx0XHRcdHkzID0gcG9zaXRpb25zW2luZGV4ICsgMV07XG5cdFx0XHR6MyA9IHBvc2l0aW9uc1tpbmRleCArIDJdO1xuXHRcdFx0ZHgxID0geDMgLSB4MTtcblx0XHRcdGR5MSA9IHkzIC0geTE7XG5cdFx0XHRkejEgPSB6MyAtIHoxO1xuXHRcdFx0ZHgyID0geDIgLSB4MTtcblx0XHRcdGR5MiA9IHkyIC0geTE7XG5cdFx0XHRkejIgPSB6MiAtIHoxO1xuXHRcdFx0Y3ggPSBkejEqZHkyIC0gZHkxKmR6Mjtcblx0XHRcdGN5ID0gZHgxKmR6MiAtIGR6MSpkeDI7XG5cdFx0XHRjeiA9IGR5MSpkeDIgLSBkeDEqZHkyO1xuXHRcdFx0ZCA9IE1hdGguc3FydChjeCpjeCArIGN5KmN5ICsgY3oqY3opO1xuXHRcdFx0Ly8gbGVuZ3RoIG9mIGNyb3NzIHByb2R1Y3QgPSAyKnRyaWFuZ2xlIGFyZWFcblxuXHRcdFx0aWYgKHRoaXMuX3VzZUZhY2VXZWlnaHRzKSB7XG5cdFx0XHRcdHZhciB3Om51bWJlciA9IGQqMTAwMDA7XG5cblx0XHRcdFx0aWYgKHcgPCAxKVxuXHRcdFx0XHRcdHcgPSAxO1xuXG5cdFx0XHRcdHRoaXMuX2ZhY2VXZWlnaHRzW2srK10gPSB3O1xuXHRcdFx0fVxuXG5cdFx0XHRkID0gMS9kO1xuXG5cdFx0XHR0aGlzLl9mYWNlTm9ybWFsc1tqKytdID0gY3gqZDtcblx0XHRcdHRoaXMuX2ZhY2VOb3JtYWxzW2orK10gPSBjeSpkO1xuXHRcdFx0dGhpcy5fZmFjZU5vcm1hbHNbaisrXSA9IGN6KmQ7XG5cdFx0fVxuXG5cdFx0dGhpcy5fZmFjZU5vcm1hbHNEaXJ0eSA9IGZhbHNlO1xuXHR9XG5cblx0cHVibGljIF9wTm90aWZ5VmVydGljZXNVcGRhdGUoKVxuXHR7XG5cdFx0dGhpcy5fcFN0cmlkZU9mZnNldERpcnR5ID0gdHJ1ZTtcblxuXHRcdHRoaXMubm90aWZ5UG9zaXRpb25zVXBkYXRlKCk7XG5cdFx0dGhpcy5ub3RpZnlOb3JtYWxzVXBkYXRlKCk7XG5cdFx0dGhpcy5ub3RpZnlUYW5nZW50c1VwZGF0ZSgpO1xuXHRcdHRoaXMubm90aWZ5VVZzVXBkYXRlKCk7XG5cdFx0dGhpcy5ub3RpZnlTZWNvbmRhcnlVVnNVcGRhdGUoKTtcblx0XHR0aGlzLm5vdGlmeUpvaW50SW5kaWNlc1VwZGF0ZSgpO1xuXHRcdHRoaXMubm90aWZ5Sm9pbnRXZWlnaHRzVXBkYXRlKCk7XG5cdH1cblxuXHRwcml2YXRlIG5vdGlmeVBvc2l0aW9uc1VwZGF0ZSgpXG5cdHtcblx0XHRpZiAodGhpcy5fcG9zaXRpb25zRGlydHkpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9wb3NpdGlvbnNEaXJ0eSA9IHRydWU7XG5cblx0XHRpZiAoIXRoaXMuX3Bvc2l0aW9uc1VwZGF0ZWQpXG5cdFx0XHR0aGlzLl9wb3NpdGlvbnNVcGRhdGVkID0gbmV3IFN1Ykdlb21ldHJ5RXZlbnQoU3ViR2VvbWV0cnlFdmVudC5WRVJUSUNFU19VUERBVEVELCBUcmlhbmdsZVN1Ykdlb21ldHJ5LlBPU0lUSU9OX0RBVEEpO1xuXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KHRoaXMuX3Bvc2l0aW9uc1VwZGF0ZWQpO1xuXHR9XG5cblx0cHJpdmF0ZSBub3RpZnlOb3JtYWxzVXBkYXRlKClcblx0e1xuXHRcdGlmICh0aGlzLl92ZXJ0ZXhOb3JtYWxzRGlydHkpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl92ZXJ0ZXhOb3JtYWxzRGlydHkgPSB0cnVlO1xuXG5cdFx0aWYgKCF0aGlzLl9ub3JtYWxzVXBkYXRlZClcblx0XHRcdHRoaXMuX25vcm1hbHNVcGRhdGVkID0gbmV3IFN1Ykdlb21ldHJ5RXZlbnQoU3ViR2VvbWV0cnlFdmVudC5WRVJUSUNFU19VUERBVEVELCBUcmlhbmdsZVN1Ykdlb21ldHJ5Lk5PUk1BTF9EQVRBKTtcblxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudCh0aGlzLl9ub3JtYWxzVXBkYXRlZCk7XG5cdH1cblxuXHRwcml2YXRlIG5vdGlmeVRhbmdlbnRzVXBkYXRlKClcblx0e1xuXHRcdGlmICh0aGlzLl92ZXJ0ZXhUYW5nZW50c0RpcnR5KVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fdmVydGV4VGFuZ2VudHNEaXJ0eSA9IHRydWU7XG5cblx0XHRpZiAoIXRoaXMuX3RhbmdlbnRzVXBkYXRlZClcblx0XHRcdHRoaXMuX3RhbmdlbnRzVXBkYXRlZCA9IG5ldyBTdWJHZW9tZXRyeUV2ZW50KFN1Ykdlb21ldHJ5RXZlbnQuVkVSVElDRVNfVVBEQVRFRCwgVHJpYW5nbGVTdWJHZW9tZXRyeS5UQU5HRU5UX0RBVEEpO1xuXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KHRoaXMuX3RhbmdlbnRzVXBkYXRlZCk7XG5cdH1cblxuXHRwcml2YXRlIG5vdGlmeVVWc1VwZGF0ZSgpXG5cdHtcblx0XHRpZiAodGhpcy5fdXZzRGlydHkpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl91dnNEaXJ0eSA9IHRydWU7XG5cblx0XHRpZiAoIXRoaXMuX3V2c1VwZGF0ZWQpXG5cdFx0XHR0aGlzLl91dnNVcGRhdGVkID0gbmV3IFN1Ykdlb21ldHJ5RXZlbnQoU3ViR2VvbWV0cnlFdmVudC5WRVJUSUNFU19VUERBVEVELCBUcmlhbmdsZVN1Ykdlb21ldHJ5LlVWX0RBVEEpO1xuXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KHRoaXMuX3V2c1VwZGF0ZWQpO1xuXHR9XG5cblx0cHJpdmF0ZSBub3RpZnlTZWNvbmRhcnlVVnNVcGRhdGUoKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3NlY29uZGFyeVVWc0RpcnR5KVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fc2Vjb25kYXJ5VVZzRGlydHkgPSB0cnVlO1xuXG5cdFx0aWYgKCF0aGlzLl9zZWNvbmRhcnlVVnNVcGRhdGVkKVxuXHRcdFx0dGhpcy5fc2Vjb25kYXJ5VVZzVXBkYXRlZCA9IG5ldyBTdWJHZW9tZXRyeUV2ZW50KFN1Ykdlb21ldHJ5RXZlbnQuVkVSVElDRVNfVVBEQVRFRCwgVHJpYW5nbGVTdWJHZW9tZXRyeS5TRUNPTkRBUllfVVZfREFUQSk7XG5cblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQodGhpcy5fc2Vjb25kYXJ5VVZzVXBkYXRlZCk7XG5cdH1cblxuXHRwcml2YXRlIG5vdGlmeUpvaW50SW5kaWNlc1VwZGF0ZSgpXG5cdHtcblx0XHRpZiAodGhpcy5fam9pbnRJbmRpY2VzRGlydHkpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9qb2ludEluZGljZXNEaXJ0eSA9IHRydWU7XG5cblx0XHRpZiAoIXRoaXMuX2pvaW50SW5kaWNlc1VwZGF0ZWQpXG5cdFx0XHR0aGlzLl9qb2ludEluZGljZXNVcGRhdGVkID0gbmV3IFN1Ykdlb21ldHJ5RXZlbnQoU3ViR2VvbWV0cnlFdmVudC5WRVJUSUNFU19VUERBVEVELCBUcmlhbmdsZVN1Ykdlb21ldHJ5LkpPSU5UX0lOREVYX0RBVEEpO1xuXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KHRoaXMuX2pvaW50SW5kaWNlc1VwZGF0ZWQpO1xuXHR9XG5cblx0cHJpdmF0ZSBub3RpZnlKb2ludFdlaWdodHNVcGRhdGUoKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2pvaW50V2VpZ2h0c0RpcnR5KVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fam9pbnRXZWlnaHRzRGlydHkgPSB0cnVlO1xuXG5cdFx0aWYgKCF0aGlzLl9qb2ludFdlaWdodHNVcGRhdGVkKVxuXHRcdFx0dGhpcy5fam9pbnRXZWlnaHRzVXBkYXRlZCA9IG5ldyBTdWJHZW9tZXRyeUV2ZW50KFN1Ykdlb21ldHJ5RXZlbnQuVkVSVElDRVNfVVBEQVRFRCwgVHJpYW5nbGVTdWJHZW9tZXRyeS5KT0lOVF9XRUlHSFRfREFUQSk7XG5cblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQodGhpcy5fam9pbnRXZWlnaHRzVXBkYXRlZCk7XG5cdH1cbn1cblxuZXhwb3J0ID0gVHJpYW5nbGVTdWJHZW9tZXRyeTsiXX0=