var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Vector3D = require("awayjs-core/lib/geom/Vector3D");
var SubGeometryBase = require("awayjs-display/lib/base/SubGeometryBase");
var CurveSubMesh = require("awayjs-display/lib/base/CurveSubMesh");
var SubGeometryEvent = require("awayjs-display/lib/events/SubGeometryEvent");
/**
 * @class away.base.CurveSubGeometry
 */
var CurveSubGeometry = (function (_super) {
    __extends(CurveSubGeometry, _super);
    /**
     *
     */
    function CurveSubGeometry(concatenatedArrays) {
        _super.call(this, concatenatedArrays);
        this._positionsDirty = true;
        this._curvesDirty = true;
        this._faceNormalsDirty = true;
        this._vertexNormalsDirty = true;
        this._uvsDirty = true;
        this._secondaryUVsDirty = true;
        this._jointIndicesDirty = true;
        this._jointWeightsDirty = true;
        this._concatenateArrays = true;
        this._autoDeriveNormals = false;
        this._useFaceWeights = false;
        this._autoDeriveUVs = false;
        this._scaleU = 1;
        this._scaleV = 1;
        this._pSubMeshClass = CurveSubMesh;
    }
    Object.defineProperty(CurveSubGeometry.prototype, "scaleU", {
        /**
         *
         */
        get: function () {
            return this._scaleU;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CurveSubGeometry.prototype, "scaleV", {
        /**
         *
         */
        get: function () {
            return this._scaleV;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CurveSubGeometry.prototype, "useCondensedIndices", {
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
        },
        enumerable: true,
        configurable: true
    });
    CurveSubGeometry.prototype._pUpdateStrideOffset = function () {
        if (this._concatenateArrays) {
            this._pOffset[CurveSubGeometry.VERTEX_DATA] = 0;
            //always have positions
            this._pOffset[CurveSubGeometry.POSITION_DATA] = 0;
            var stride = 3;
            if (this._curves != null) {
                this._pOffset[CurveSubGeometry.CURVE_DATA] = stride;
                stride += 2;
            }
            if (this._uvs != null) {
                this._pOffset[CurveSubGeometry.UV_DATA] = stride;
                stride += 2;
            }
            this._pStride[CurveSubGeometry.VERTEX_DATA] = stride;
            this._pStride[CurveSubGeometry.POSITION_DATA] = stride;
            this._pStride[CurveSubGeometry.CURVE_DATA] = stride;
            this._pStride[CurveSubGeometry.UV_DATA] = stride;
            var len = this._pNumVertices * stride;
            if (this._pVertices == null)
                this._pVertices = new Array(len);
            else if (this._pVertices.length != len)
                this._pVertices.length = len;
        }
        else {
            this._pOffset[CurveSubGeometry.POSITION_DATA] = 0;
            this._pOffset[CurveSubGeometry.CURVE_DATA] = 0;
            this._pOffset[CurveSubGeometry.UV_DATA] = 0;
            this._pStride[CurveSubGeometry.POSITION_DATA] = 3;
            this._pStride[CurveSubGeometry.CURVE_DATA] = 2;
            this._pStride[CurveSubGeometry.UV_DATA] = 2;
        }
        this._pStrideOffsetDirty = false;
    };
    Object.defineProperty(CurveSubGeometry.prototype, "autoDeriveUVs", {
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
    Object.defineProperty(CurveSubGeometry.prototype, "autoDeriveNormals", {
        /**
         * True if the vertex normals should be derived from the geometry, false if the vertex normals are set
         * explicitly.
         */
        get: function () {
            return this._autoDeriveNormals;
        },
        //remove
        set: function (value) {
            if (this._autoDeriveNormals == value)
                return;
            this._autoDeriveNormals = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CurveSubGeometry.prototype, "vertices", {
        /**
         *
         */
        get: function () {
            if (this._positionsDirty)
                this.updatePositions(this._positions);
            if (this._curvesDirty)
                this.updateCurves(this._curves);
            if (this._uvsDirty)
                this.updateUVs(this._uvs);
            return this._pVertices;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CurveSubGeometry.prototype, "positions", {
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
    Object.defineProperty(CurveSubGeometry.prototype, "curves", {
        /**
         *
         */
        get: function () {
            if (this._curvesDirty)
                this.updateCurves(this._curves);
            return this._curves;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CurveSubGeometry.prototype, "faceNormals", {
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
    Object.defineProperty(CurveSubGeometry.prototype, "uvs", {
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
    Object.defineProperty(CurveSubGeometry.prototype, "useFaceWeights", {
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
            this._faceNormalsDirty = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CurveSubGeometry.prototype, "condensedIndexLookUp", {
        get: function () {
            return this._condensedIndexLookUp;
        },
        enumerable: true,
        configurable: true
    });
    CurveSubGeometry.prototype.getBoundingPositions = function () {
        if (this._positionsDirty)
            this.updatePositions(this._positions);
        return this._positions;
    };
    /**
     *
     */
    CurveSubGeometry.prototype.updatePositions = function (values) {
        var i;
        var index;
        var stride;
        var positions;
        this._positions = values;
        if (this._positions == null)
            this._positions = new Array();
        this._pNumVertices = this._positions.length / 3;
        if (this._concatenateArrays) {
            var len = this._pNumVertices * this.getStride(CurveSubGeometry.VERTEX_DATA);
            if (this._pVertices == null)
                this._pVertices = new Array(len);
            else if (this._pVertices.length != len)
                this._pVertices.length = len;
            i = 0;
            index = this.getOffset(CurveSubGeometry.POSITION_DATA);
            stride = this.getStride(CurveSubGeometry.POSITION_DATA);
            positions = this._pVertices;
            while (i < values.length) {
                positions[index] = values[i++];
                positions[index + 1] = values[i++];
                positions[index + 2] = values[i++];
                index += stride;
            }
        }
        this.pInvalidateBounds();
        this.notifyPositionsUpdate();
        this._positionsDirty = false;
    };
    /**
     * Updates the vertex normals based on the geometry.
     */
    CurveSubGeometry.prototype.updateCurves = function (values) {
        var i;
        var index;
        var offset;
        var stride;
        var curves;
        if (true) {
            if ((this._curves == null || values == null) && (this._curves != null || values != null)) {
                if (this._concatenateArrays)
                    this._pNotifyVerticesUpdate();
                else
                    this._pStrideOffsetDirty = true;
            }
            this._curves = values;
            if (values != null && this._concatenateArrays) {
                i = 0;
                index = this.getOffset(CurveSubGeometry.CURVE_DATA);
                stride = this.getStride(CurveSubGeometry.CURVE_DATA);
                curves = this._pVertices;
                while (i < values.length) {
                    curves[index] = values[i++];
                    curves[index + 1] = values[i++];
                    index += stride;
                }
            }
        }
        this.notifyCurvesUpdate();
        this._curvesDirty = false;
    };
    /**
     * Updates the uvs based on the geometry.
     */
    CurveSubGeometry.prototype.updateUVs = function (values) {
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
                index = this.getOffset(CurveSubGeometry.UV_DATA);
                stride = this.getStride(CurveSubGeometry.UV_DATA);
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
            offset = this.getOffset(CurveSubGeometry.UV_DATA);
            stride = this.getStride(CurveSubGeometry.UV_DATA);
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
        this.notifyUVsUpdate();
        this._uvsDirty = false;
    };
    /**
     *
     */
    CurveSubGeometry.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._positions = null;
        this._curves = null;
        this._uvs = null;
        this._faceNormals = null;
        this._faceWeights = null;
    };
    /**
     * Updates the face indices of the CurveSubGeometry.
     *
     * @param indices The face indices to upload.
     */
    CurveSubGeometry.prototype.updateIndices = function (indices) {
        _super.prototype.updateIndices.call(this, indices);
        this._faceNormalsDirty = true;
        if (this._autoDeriveNormals)
            this._vertexNormalsDirty = true;
    };
    /**
     * Clones the current object
     * @return An exact duplicate of the current object.
     */
    CurveSubGeometry.prototype.clone = function () {
        var clone = new CurveSubGeometry(this._concatenateArrays);
        clone.updateIndices(this._pIndices.concat());
        clone.updatePositions(this._positions.concat());
        if (this._curves)
            clone.updateCurves(this._curves.concat());
        else
            clone.updateCurves(null);
        if (this._uvs && !this._autoDeriveUVs)
            clone.updateUVs(this._uvs.concat());
        else
            clone.updateUVs(null);
        return clone;
    };
    CurveSubGeometry.prototype.scaleUV = function (scaleU, scaleV) {
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
    CurveSubGeometry.prototype.scale = function (scale) {
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
    CurveSubGeometry.prototype.applyTransformation = function (transform) {
        var positions;
        if (this._concatenateArrays) {
            positions = this._pVertices;
        }
        else {
            positions = this._positions;
        }
        var len = this._positions.length / 3;
        var i;
        var i1;
        var i2;
        var vector = new Vector3D();
        var invTranspose;
        var vi0 = this.getOffset(CurveSubGeometry.POSITION_DATA);
        var vStride = this.getStride(CurveSubGeometry.POSITION_DATA);
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
        }
        this.notifyPositionsUpdate();
    };
    /**
     * Updates the normals for each face.
     */
    CurveSubGeometry.prototype.updateFaceNormals = function () {
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
    CurveSubGeometry.prototype._pNotifyVerticesUpdate = function () {
        this._pStrideOffsetDirty = true;
        this.notifyPositionsUpdate();
        this.notifyCurvesUpdate();
        this.notifyUVsUpdate();
    };
    CurveSubGeometry.prototype.notifyPositionsUpdate = function () {
        if (this._positionsDirty)
            return;
        this._positionsDirty = true;
        if (!this._positionsUpdated)
            this._positionsUpdated = new SubGeometryEvent(SubGeometryEvent.VERTICES_UPDATED, CurveSubGeometry.POSITION_DATA);
        this.dispatchEvent(this._positionsUpdated);
    };
    CurveSubGeometry.prototype.notifyCurvesUpdate = function () {
        if (this._curvesDirty)
            return;
        this._curvesDirty = true;
        if (!this._curvesUpdated)
            this._curvesUpdated = new SubGeometryEvent(SubGeometryEvent.VERTICES_UPDATED, CurveSubGeometry.CURVE_DATA);
        this.dispatchEvent(this._curvesUpdated);
    };
    CurveSubGeometry.prototype.notifyUVsUpdate = function () {
        if (this._uvsDirty)
            return;
        this._uvsDirty = true;
        if (!this._uvsUpdated)
            this._uvsUpdated = new SubGeometryEvent(SubGeometryEvent.VERTICES_UPDATED, CurveSubGeometry.UV_DATA);
        this.dispatchEvent(this._uvsUpdated);
    };
    CurveSubGeometry.POSITION_DATA = "positions";
    CurveSubGeometry.CURVE_DATA = "curves";
    CurveSubGeometry.UV_DATA = "uvs";
    //TODO - move these to StageGL
    CurveSubGeometry.POSITION_FORMAT = "float3";
    CurveSubGeometry.CURVE_FORMAT = "float2";
    CurveSubGeometry.UV_FORMAT = "float2";
    return CurveSubGeometry;
})(SubGeometryBase);
module.exports = CurveSubGeometry;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0N1cnZlU3ViR2VvbWV0cnkudHMiXSwibmFtZXMiOlsiQ3VydmVTdWJHZW9tZXRyeSIsIkN1cnZlU3ViR2VvbWV0cnkuY29uc3RydWN0b3IiLCJDdXJ2ZVN1Ykdlb21ldHJ5LnNjYWxlVSIsIkN1cnZlU3ViR2VvbWV0cnkuc2NhbGVWIiwiQ3VydmVTdWJHZW9tZXRyeS51c2VDb25kZW5zZWRJbmRpY2VzIiwiQ3VydmVTdWJHZW9tZXRyeS5fcFVwZGF0ZVN0cmlkZU9mZnNldCIsIkN1cnZlU3ViR2VvbWV0cnkuYXV0b0Rlcml2ZVVWcyIsIkN1cnZlU3ViR2VvbWV0cnkuYXV0b0Rlcml2ZU5vcm1hbHMiLCJDdXJ2ZVN1Ykdlb21ldHJ5LnZlcnRpY2VzIiwiQ3VydmVTdWJHZW9tZXRyeS5wb3NpdGlvbnMiLCJDdXJ2ZVN1Ykdlb21ldHJ5LmN1cnZlcyIsIkN1cnZlU3ViR2VvbWV0cnkuZmFjZU5vcm1hbHMiLCJDdXJ2ZVN1Ykdlb21ldHJ5LnV2cyIsIkN1cnZlU3ViR2VvbWV0cnkudXNlRmFjZVdlaWdodHMiLCJDdXJ2ZVN1Ykdlb21ldHJ5LmNvbmRlbnNlZEluZGV4TG9va1VwIiwiQ3VydmVTdWJHZW9tZXRyeS5nZXRCb3VuZGluZ1Bvc2l0aW9ucyIsIkN1cnZlU3ViR2VvbWV0cnkudXBkYXRlUG9zaXRpb25zIiwiQ3VydmVTdWJHZW9tZXRyeS51cGRhdGVDdXJ2ZXMiLCJDdXJ2ZVN1Ykdlb21ldHJ5LnVwZGF0ZVVWcyIsIkN1cnZlU3ViR2VvbWV0cnkuZGlzcG9zZSIsIkN1cnZlU3ViR2VvbWV0cnkudXBkYXRlSW5kaWNlcyIsIkN1cnZlU3ViR2VvbWV0cnkuY2xvbmUiLCJDdXJ2ZVN1Ykdlb21ldHJ5LnNjYWxlVVYiLCJDdXJ2ZVN1Ykdlb21ldHJ5LnNjYWxlIiwiQ3VydmVTdWJHZW9tZXRyeS5hcHBseVRyYW5zZm9ybWF0aW9uIiwiQ3VydmVTdWJHZW9tZXRyeS51cGRhdGVGYWNlTm9ybWFscyIsIkN1cnZlU3ViR2VvbWV0cnkuX3BOb3RpZnlWZXJ0aWNlc1VwZGF0ZSIsIkN1cnZlU3ViR2VvbWV0cnkubm90aWZ5UG9zaXRpb25zVXBkYXRlIiwiQ3VydmVTdWJHZW9tZXRyeS5ub3RpZnlDdXJ2ZXNVcGRhdGUiLCJDdXJ2ZVN1Ykdlb21ldHJ5Lm5vdGlmeVVWc1VwZGF0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsSUFBTyxRQUFRLFdBQWUsK0JBQStCLENBQUMsQ0FBQztBQUUvRCxJQUFPLGVBQWUsV0FBYSx5Q0FBeUMsQ0FBQyxDQUFDO0FBQzlFLElBQU8sWUFBWSxXQUFpQixzQ0FBc0MsQ0FBQyxDQUFDO0FBQzVFLElBQU8sZ0JBQWdCLFdBQWEsNENBQTRDLENBQUMsQ0FBQztBQUVsRixBQUdBOztHQURHO0lBQ0csZ0JBQWdCO0lBQVNBLFVBQXpCQSxnQkFBZ0JBLFVBQXdCQTtJQTBRN0NBOztPQUVHQTtJQUNIQSxTQTdRS0EsZ0JBQWdCQSxDQTZRVEEsa0JBQTBCQTtRQUVyQ0Msa0JBQU1BLGtCQUFrQkEsQ0FBQ0EsQ0FBQ0E7UUFwUW5CQSxvQkFBZUEsR0FBV0EsSUFBSUEsQ0FBQ0E7UUFDL0JBLGlCQUFZQSxHQUFXQSxJQUFJQSxDQUFDQTtRQUM1QkEsc0JBQWlCQSxHQUFXQSxJQUFJQSxDQUFDQTtRQUM5QkEsd0JBQW1CQSxHQUFXQSxJQUFJQSxDQUFDQTtRQUN0Q0EsY0FBU0EsR0FBV0EsSUFBSUEsQ0FBQ0E7UUFDekJBLHVCQUFrQkEsR0FBV0EsSUFBSUEsQ0FBQ0E7UUFDbENBLHVCQUFrQkEsR0FBV0EsSUFBSUEsQ0FBQ0E7UUFDbENBLHVCQUFrQkEsR0FBV0EsSUFBSUEsQ0FBQ0E7UUFZbENBLHVCQUFrQkEsR0FBV0EsSUFBSUEsQ0FBQ0E7UUFDbENBLHVCQUFrQkEsR0FBV0EsS0FBS0EsQ0FBQ0E7UUFDbkNBLG9CQUFlQSxHQUFXQSxLQUFLQSxDQUFDQTtRQUM3QkEsbUJBQWNBLEdBQVdBLEtBQUtBLENBQUNBO1FBS2xDQSxZQUFPQSxHQUFVQSxDQUFDQSxDQUFDQTtRQUNuQkEsWUFBT0EsR0FBVUEsQ0FBQ0EsQ0FBQ0E7UUEwTzFCQSxJQUFJQSxDQUFDQSxjQUFjQSxHQUFHQSxZQUFZQSxDQUFDQTtJQUNwQ0EsQ0FBQ0E7SUFoT0RELHNCQUFXQSxvQ0FBTUE7UUFIakJBOztXQUVHQTthQUNIQTtZQUVDRSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQTtRQUNyQkEsQ0FBQ0E7OztPQUFBRjtJQUtEQSxzQkFBV0Esb0NBQU1BO1FBSGpCQTs7V0FFR0E7YUFDSEE7WUFFQ0csTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7UUFDckJBLENBQUNBOzs7T0FBQUg7SUFPREEsc0JBQVdBLGlEQUFtQkE7UUFMOUJBOzs7O1dBSUdBO2FBQ0hBO1lBRUNJLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLG9CQUFvQkEsQ0FBQ0E7UUFDbENBLENBQUNBO2FBRURKLFVBQStCQSxLQUFhQTtZQUUzQ0ksRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0Esb0JBQW9CQSxJQUFJQSxLQUFLQSxDQUFDQTtnQkFDdENBLE1BQU1BLENBQUNBO1lBRVJBLElBQUlBLENBQUNBLG9CQUFvQkEsR0FBR0EsS0FBS0EsQ0FBQ0E7UUFDbkNBLENBQUNBOzs7T0FSQUo7SUFVTUEsK0NBQW9CQSxHQUEzQkE7UUFFQ0ssRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUM3QkEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxXQUFXQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUVoREEsQUFDQUEsdUJBRHVCQTtZQUN2QkEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxhQUFhQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUNsREEsSUFBSUEsTUFBTUEsR0FBVUEsQ0FBQ0EsQ0FBQ0E7WUFFdEJBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLElBQUlBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO2dCQUMxQkEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxVQUFVQSxDQUFDQSxHQUFHQSxNQUFNQSxDQUFDQTtnQkFDcERBLE1BQU1BLElBQUlBLENBQUNBLENBQUNBO1lBQ2JBLENBQUNBO1lBRURBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLElBQUlBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO2dCQUN2QkEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxPQUFPQSxDQUFDQSxHQUFHQSxNQUFNQSxDQUFDQTtnQkFDakRBLE1BQU1BLElBQUlBLENBQUNBLENBQUNBO1lBQ2JBLENBQUNBO1lBSURBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsR0FBR0EsTUFBTUEsQ0FBQ0E7WUFDckRBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsR0FBR0EsTUFBTUEsQ0FBQ0E7WUFDdkRBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsR0FBR0EsTUFBTUEsQ0FBQ0E7WUFDcERBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsR0FBR0EsTUFBTUEsQ0FBQ0E7WUFFakRBLElBQUlBLEdBQUdBLEdBQVVBLElBQUlBLENBQUNBLGFBQWFBLEdBQUNBLE1BQU1BLENBQUNBO1lBRTNDQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxJQUFJQSxJQUFJQSxDQUFDQTtnQkFDM0JBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLElBQUlBLEtBQUtBLENBQVNBLEdBQUdBLENBQUNBLENBQUNBO1lBQzFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxNQUFNQSxJQUFJQSxHQUFHQSxDQUFDQTtnQkFD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RWJBLElBQUlBLFNBQVNBLEdBQWlCQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQTtRQUU5Q0EsSUFBSUEsR0FBR0EsR0FBVUEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsTUFBTUEsQ0FBQ0E7UUFFdkNBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFlBQVlBLElBQUlBLElBQUlBLENBQUNBO1lBQzdCQSxJQUFJQSxDQUFDQSxZQUFZQSxHQUFHQSxJQUFJQSxLQUFLQSxDQUFTQSxHQUFHQSxDQUFDQSxDQUFDQTtRQUU1Q0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsZUFBZUEsSUFBSUEsSUFBSUEsQ0FBQ0EsWUFBWUEsSUFBSUEsSUFBSUEsQ0FBQ0E7WUFDckRBLElBQUlBLENBQUNBLFlBQVlBLEdBQUdBLElBQUlBLEtBQUtBLENBQVNBLEdBQUdBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBO1FBRTlDQSxPQUFPQSxDQUFDQSxHQUFHQSxHQUFHQSxFQUFFQSxDQUFDQTtZQUNoQkEsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDOUJBLEVBQUVBLEdBQUdBLFNBQVNBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO1lBQ3RCQSxFQUFFQSxHQUFHQSxTQUFTQSxDQUFDQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUMxQkEsRUFBRUEsR0FBR0EsU0FBU0EsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDMUJBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBO1lBQzlCQSxFQUFFQSxHQUFHQSxTQUFTQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtZQUN0QkEsRUFBRUEsR0FBR0EsU0FBU0EsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDMUJBLEVBQUVBLEdBQUdBLFNBQVNBLENBQUNBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO1lBQzFCQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQTtZQUM5QkEsRUFBRUEsR0FBR0EsU0FBU0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7WUFDdEJBLEVBQUVBLEdBQUdBLFNBQVNBLENBQUNBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO1lBQzFCQSxFQUFFQSxHQUFHQSxTQUFTQSxDQUFDQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUMxQkEsR0FBR0EsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsQ0FBQ0E7WUFDZEEsR0FBR0EsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsQ0FBQ0E7WUFDZEEsR0FBR0EsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsQ0FBQ0E7WUFDZEEsR0FBR0EsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsQ0FBQ0E7WUFDZEEsR0FBR0EsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsQ0FBQ0E7WUFDZEEsR0FBR0EsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsQ0FBQ0E7WUFDZEEsRUFBRUEsR0FBR0EsR0FBR0EsR0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBQ0EsR0FBR0EsQ0FBQ0E7WUFDdkJBLEVBQUVBLEdBQUdBLEdBQUdBLEdBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUNBLEdBQUdBLENBQUNBO1lBQ3ZCQSxFQUFFQSxHQUFHQSxHQUFHQSxHQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFDQSxHQUFHQSxDQUFDQTtZQUN2QkEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBQ0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBQ0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7WUFDckNBLEFBRUFBLDRDQUY0Q0E7WUFFNUNBLEVBQUVB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Q0EsZ0JBQWdCQSxFQUFFQSxnQkFBZ0JBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO1FBRXpHQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQTtJQUN6Q0EsQ0FBQ0E7SUE1dEJVN0IsOEJBQWFBLEdBQVVBLFdBQVdBLENBQUNBO0lBQ2hDQSwyQkFBVUEsR0FBVUEsUUFBUUEsQ0FBQ0E7SUFDaENBLHdCQUFPQSxHQUFVQSxLQUFLQSxDQUFDQTtJQUVyQ0EsOEJBQThCQTtJQUNoQkEsZ0NBQWVBLEdBQVVBLFFBQVFBLENBQUNBO0lBQ2xDQSw2QkFBWUEsR0FBVUEsUUFBUUEsQ0FBQ0E7SUFDL0JBLDBCQUFTQSxHQUFVQSxRQUFRQSxDQUFDQTtJQXN0QjNDQSx1QkFBQ0E7QUFBREEsQ0EvdEJBLEFBK3RCQ0EsRUEvdEI4QixlQUFlLEVBK3RCN0M7QUFFRCxBQUEwQixpQkFBakIsZ0JBQWdCLENBQUMiLCJmaWxlIjoiYmFzZS9DdXJ2ZVN1Ykdlb21ldHJ5LmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNYXRyaXgzRFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9NYXRyaXgzRFwiKTtcclxuaW1wb3J0IFZlY3RvcjNEXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1ZlY3RvcjNEXCIpO1xyXG5cclxuaW1wb3J0IFN1Ykdlb21ldHJ5QmFzZVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL1N1Ykdlb21ldHJ5QmFzZVwiKTtcclxuaW1wb3J0IEN1cnZlU3ViTWVzaFx0XHQgICAgXHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9DdXJ2ZVN1Yk1lc2hcIik7XHJcbmltcG9ydCBTdWJHZW9tZXRyeUV2ZW50XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2V2ZW50cy9TdWJHZW9tZXRyeUV2ZW50XCIpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBhd2F5LmJhc2UuQ3VydmVTdWJHZW9tZXRyeVxyXG4gKi9cclxuY2xhc3MgQ3VydmVTdWJHZW9tZXRyeSBleHRlbmRzIFN1Ykdlb21ldHJ5QmFzZVxyXG57XHJcblx0cHVibGljIHN0YXRpYyBQT1NJVElPTl9EQVRBOnN0cmluZyA9IFwicG9zaXRpb25zXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIENVUlZFX0RBVEE6c3RyaW5nID0gXCJjdXJ2ZXNcIjtcclxuXHRwdWJsaWMgc3RhdGljIFVWX0RBVEE6c3RyaW5nID0gXCJ1dnNcIjtcclxuXHJcblx0Ly9UT0RPIC0gbW92ZSB0aGVzZSB0byBTdGFnZUdMXHJcblx0cHVibGljIHN0YXRpYyBQT1NJVElPTl9GT1JNQVQ6c3RyaW5nID0gXCJmbG9hdDNcIjtcclxuXHRwdWJsaWMgc3RhdGljIENVUlZFX0ZPUk1BVDpzdHJpbmcgPSBcImZsb2F0MlwiO1xyXG5cdHB1YmxpYyBzdGF0aWMgVVZfRk9STUFUOnN0cmluZyA9IFwiZmxvYXQyXCI7XHJcblxyXG5cdHByaXZhdGUgX3Bvc2l0aW9uc0RpcnR5OmJvb2xlYW4gPSB0cnVlO1xyXG5cdHByaXZhdGUgX2N1cnZlc0RpcnR5OmJvb2xlYW4gPSB0cnVlO1xyXG5cdHByaXZhdGUgX2ZhY2VOb3JtYWxzRGlydHk6Ym9vbGVhbiA9IHRydWU7XHJcbiAgICBwcml2YXRlIF92ZXJ0ZXhOb3JtYWxzRGlydHk6Ym9vbGVhbiA9IHRydWU7XHJcblx0cHJpdmF0ZSBfdXZzRGlydHk6Ym9vbGVhbiA9IHRydWU7XHJcblx0cHJpdmF0ZSBfc2Vjb25kYXJ5VVZzRGlydHk6Ym9vbGVhbiA9IHRydWU7XHJcblx0cHJpdmF0ZSBfam9pbnRJbmRpY2VzRGlydHk6Ym9vbGVhbiA9IHRydWU7XHJcblx0cHJpdmF0ZSBfam9pbnRXZWlnaHRzRGlydHk6Ym9vbGVhbiA9IHRydWU7XHJcblxyXG5cdHByaXZhdGUgX3Bvc2l0aW9uczpBcnJheTxudW1iZXI+O1xyXG5cdHByaXZhdGUgX2N1cnZlczpBcnJheTxudW1iZXI+O1xyXG5cdHByaXZhdGUgX3V2czpBcnJheTxudW1iZXI+O1xyXG5cclxuXHJcblx0cHJpdmF0ZSBfdXNlQ29uZGVuc2VkSW5kaWNlczpib29sZWFuO1xyXG5cdHByaXZhdGUgX2NvbmRlbnNlZEpvaW50SW5kaWNlczpBcnJheTxudW1iZXI+O1xyXG5cdHByaXZhdGUgX2NvbmRlbnNlZEluZGV4TG9va1VwOkFycmF5PG51bWJlcj47XHJcblxyXG5cclxuXHRwcml2YXRlIF9jb25jYXRlbmF0ZUFycmF5czpib29sZWFuID0gdHJ1ZTtcclxuXHRwcml2YXRlIF9hdXRvRGVyaXZlTm9ybWFsczpib29sZWFuID0gZmFsc2U7XHJcblx0cHJpdmF0ZSBfdXNlRmFjZVdlaWdodHM6Ym9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfYXV0b0Rlcml2ZVVWczpib29sZWFuID0gZmFsc2U7XHJcblxyXG5cdHByaXZhdGUgX2ZhY2VOb3JtYWxzOkFycmF5PG51bWJlcj47XHJcblx0cHJpdmF0ZSBfZmFjZVdlaWdodHM6QXJyYXk8bnVtYmVyPjtcclxuXHJcblx0cHJpdmF0ZSBfc2NhbGVVOm51bWJlciA9IDE7XHJcblx0cHJpdmF0ZSBfc2NhbGVWOm51bWJlciA9IDE7XHJcblxyXG5cdHByaXZhdGUgX3Bvc2l0aW9uc1VwZGF0ZWQ6U3ViR2VvbWV0cnlFdmVudDtcclxuXHRwcml2YXRlIF9jdXJ2ZXNVcGRhdGVkOlN1Ykdlb21ldHJ5RXZlbnQ7XHJcblx0cHJpdmF0ZSBfdXZzVXBkYXRlZDpTdWJHZW9tZXRyeUV2ZW50O1xyXG5cdHByaXZhdGUgX3NlY29uZGFyeVVWc1VwZGF0ZWQ6U3ViR2VvbWV0cnlFdmVudDtcclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCBzY2FsZVUoKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fc2NhbGVVO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHNjYWxlVigpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9zY2FsZVY7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBPZmZlcnMgdGhlIG9wdGlvbiBvZiBlbmFibGluZyBHUFUgYWNjZWxlcmF0ZWQgYW5pbWF0aW9uIG9uIHNrZWxldG9ucyBsYXJnZXIgdGhhbiAzMiBqb2ludHNcclxuXHQgKiBieSBjb25kZW5zaW5nIHRoZSBudW1iZXIgb2Ygam9pbnQgaW5kZXggdmFsdWVzIHJlcXVpcmVkIHBlciBtZXNoLiBPbmx5IGFwcGxpY2FibGUgdG9cclxuXHQgKiBza2VsZXRvbiBhbmltYXRpb25zIHRoYXQgdXRpbGlzZSBtb3JlIHRoYW4gb25lIG1lc2ggb2JqZWN0LiBEZWZhdWx0cyB0byBmYWxzZS5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHVzZUNvbmRlbnNlZEluZGljZXMoKTpib29sZWFuXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3VzZUNvbmRlbnNlZEluZGljZXM7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHVzZUNvbmRlbnNlZEluZGljZXModmFsdWU6Ym9vbGVhbilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fdXNlQ29uZGVuc2VkSW5kaWNlcyA9PSB2YWx1ZSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX3VzZUNvbmRlbnNlZEluZGljZXMgPSB2YWx1ZTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBfcFVwZGF0ZVN0cmlkZU9mZnNldCgpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX2NvbmNhdGVuYXRlQXJyYXlzKSB7XHJcblx0XHRcdHRoaXMuX3BPZmZzZXRbQ3VydmVTdWJHZW9tZXRyeS5WRVJURVhfREFUQV0gPSAwO1xyXG5cclxuXHRcdFx0Ly9hbHdheXMgaGF2ZSBwb3NpdGlvbnNcclxuXHRcdFx0dGhpcy5fcE9mZnNldFtDdXJ2ZVN1Ykdlb21ldHJ5LlBPU0lUSU9OX0RBVEFdID0gMDtcclxuXHRcdFx0dmFyIHN0cmlkZTpudW1iZXIgPSAzO1xyXG5cclxuXHRcdFx0aWYgKHRoaXMuX2N1cnZlcyAhPSBudWxsKSB7XHJcblx0XHRcdFx0dGhpcy5fcE9mZnNldFtDdXJ2ZVN1Ykdlb21ldHJ5LkNVUlZFX0RBVEFdID0gc3RyaWRlO1xyXG5cdFx0XHRcdHN0cmlkZSArPSAyO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAodGhpcy5fdXZzICE9IG51bGwpIHtcclxuXHRcdFx0XHR0aGlzLl9wT2Zmc2V0W0N1cnZlU3ViR2VvbWV0cnkuVVZfREFUQV0gPSBzdHJpZGU7XHJcblx0XHRcdFx0c3RyaWRlICs9IDI7XHJcblx0XHRcdH1cclxuXHJcblxyXG5cclxuXHRcdFx0dGhpcy5fcFN0cmlkZVtDdXJ2ZVN1Ykdlb21ldHJ5LlZFUlRFWF9EQVRBXSA9IHN0cmlkZTtcclxuXHRcdFx0dGhpcy5fcFN0cmlkZVtDdXJ2ZVN1Ykdlb21ldHJ5LlBPU0lUSU9OX0RBVEFdID0gc3RyaWRlO1xyXG5cdFx0XHR0aGlzLl9wU3RyaWRlW0N1cnZlU3ViR2VvbWV0cnkuQ1VSVkVfREFUQV0gPSBzdHJpZGU7XHJcblx0XHRcdHRoaXMuX3BTdHJpZGVbQ3VydmVTdWJHZW9tZXRyeS5VVl9EQVRBXSA9IHN0cmlkZTtcclxuXHJcblx0XHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fcE51bVZlcnRpY2VzKnN0cmlkZTtcclxuXHJcblx0XHRcdGlmICh0aGlzLl9wVmVydGljZXMgPT0gbnVsbClcclxuXHRcdFx0XHR0aGlzLl9wVmVydGljZXMgPSBuZXcgQXJyYXk8bnVtYmVyPihsZW4pO1xyXG5cdFx0XHRlbHNlIGlmICh0aGlzLl9wVmVydGljZXMubGVuZ3RoICE9IGxlbilcclxuXHRcdFx0XHR0aGlzLl9wVmVydGljZXMubGVuZ3RoID0gbGVuO1xyXG5cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuX3BPZmZzZXRbQ3VydmVTdWJHZW9tZXRyeS5QT1NJVElPTl9EQVRBXSA9IDA7XHJcblx0XHRcdHRoaXMuX3BPZmZzZXRbQ3VydmVTdWJHZW9tZXRyeS5DVVJWRV9EQVRBXSA9IDA7XHJcblx0XHRcdHRoaXMuX3BPZmZzZXRbQ3VydmVTdWJHZW9tZXRyeS5VVl9EQVRBXSA9IDA7XHJcblxyXG5cclxuXHRcdFx0dGhpcy5fcFN0cmlkZVtDdXJ2ZVN1Ykdlb21ldHJ5LlBPU0lUSU9OX0RBVEFdID0gMztcclxuXHRcdFx0dGhpcy5fcFN0cmlkZVtDdXJ2ZVN1Ykdlb21ldHJ5LkNVUlZFX0RBVEFdID0gMjtcclxuXHRcdFx0dGhpcy5fcFN0cmlkZVtDdXJ2ZVN1Ykdlb21ldHJ5LlVWX0RBVEFdID0gMjtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLl9wU3RyaWRlT2Zmc2V0RGlydHkgPSBmYWxzZTtcclxuXHR9XHJcblxyXG5cclxuXHJcblx0LyoqXHJcblx0ICogRGVmaW5lcyB3aGV0aGVyIGEgVVYgYnVmZmVyIHNob3VsZCBiZSBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCB0byBjb250YWluIGR1bW15IFVWIGNvb3JkaW5hdGVzLlxyXG5cdCAqIFNldCB0byB0cnVlIGlmIGEgZ2VvbWV0cnkgbGFja3MgVVYgZGF0YSBidXQgdXNlcyBhIG1hdGVyaWFsIHRoYXQgcmVxdWlyZXMgaXQsIG9yIGxlYXZlIGFzIGZhbHNlXHJcblx0ICogaW4gY2FzZXMgd2hlcmUgVVYgZGF0YSBpcyBleHBsaWNpdGx5IGRlZmluZWQgb3IgdGhlIG1hdGVyaWFsIGRvZXMgbm90IHJlcXVpcmUgVVYgZGF0YS5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGF1dG9EZXJpdmVVVnMoKTpib29sZWFuXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2F1dG9EZXJpdmVVVnM7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IGF1dG9EZXJpdmVVVnModmFsdWU6Ym9vbGVhbilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fYXV0b0Rlcml2ZVVWcyA9PSB2YWx1ZSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX2F1dG9EZXJpdmVVVnMgPSB2YWx1ZTtcclxuXHJcblx0XHRpZiAodmFsdWUpXHJcblx0XHRcdHRoaXMubm90aWZ5VVZzVXBkYXRlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUcnVlIGlmIHRoZSB2ZXJ0ZXggbm9ybWFscyBzaG91bGQgYmUgZGVyaXZlZCBmcm9tIHRoZSBnZW9tZXRyeSwgZmFsc2UgaWYgdGhlIHZlcnRleCBub3JtYWxzIGFyZSBzZXRcclxuXHQgKiBleHBsaWNpdGx5LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgYXV0b0Rlcml2ZU5vcm1hbHMoKTpib29sZWFuXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2F1dG9EZXJpdmVOb3JtYWxzO1xyXG5cdH1cclxuXHJcbiAgICAvL3JlbW92ZVxyXG5cdHB1YmxpYyBzZXQgYXV0b0Rlcml2ZU5vcm1hbHModmFsdWU6Ym9vbGVhbilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fYXV0b0Rlcml2ZU5vcm1hbHMgPT0gdmFsdWUpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9hdXRvRGVyaXZlTm9ybWFscyA9IHZhbHVlO1xyXG5cclxuXHR9XHJcblxyXG5cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHZlcnRpY2VzKCk6QXJyYXk8bnVtYmVyPlxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9wb3NpdGlvbnNEaXJ0eSlcclxuXHRcdFx0dGhpcy51cGRhdGVQb3NpdGlvbnModGhpcy5fcG9zaXRpb25zKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2N1cnZlc0RpcnR5KVxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUN1cnZlcyh0aGlzLl9jdXJ2ZXMpO1xyXG5cclxuXHRcdGlmICh0aGlzLl91dnNEaXJ0eSlcclxuXHRcdFx0dGhpcy51cGRhdGVVVnModGhpcy5fdXZzKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fcFZlcnRpY2VzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHBvc2l0aW9ucygpOkFycmF5PG51bWJlcj5cclxuXHR7XHJcblx0XHRpZiAodGhpcy5fcG9zaXRpb25zRGlydHkpXHJcblx0XHRcdHRoaXMudXBkYXRlUG9zaXRpb25zKHRoaXMuX3Bvc2l0aW9ucyk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuX3Bvc2l0aW9ucztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCBjdXJ2ZXMoKTpBcnJheTxudW1iZXI+XHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX2N1cnZlc0RpcnR5KVxyXG5cdFx0XHR0aGlzLnVwZGF0ZUN1cnZlcyh0aGlzLl9jdXJ2ZXMpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLl9jdXJ2ZXM7XHJcblx0fVxyXG5cclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSByYXcgZGF0YSBvZiB0aGUgZmFjZSBub3JtYWxzLCBpbiB0aGUgc2FtZSBvcmRlciBhcyB0aGUgZmFjZXMgYXJlIGxpc3RlZCBpbiB0aGUgaW5kZXggbGlzdC5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGZhY2VOb3JtYWxzKCk6QXJyYXk8bnVtYmVyPlxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9mYWNlTm9ybWFsc0RpcnR5KVxyXG5cdFx0XHR0aGlzLnVwZGF0ZUZhY2VOb3JtYWxzKCk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuX2ZhY2VOb3JtYWxzO1xyXG5cdH1cclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCB1dnMoKTpBcnJheTxudW1iZXI+XHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX3V2c0RpcnR5KVxyXG5cdFx0XHR0aGlzLnVwZGF0ZVVWcyh0aGlzLl91dnMpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLl91dnM7XHJcblx0fVxyXG5cclxuXHJcblxyXG5cclxuXHQvKipcclxuXHQgKiBJbmRpY2F0ZXMgd2hldGhlciBvciBub3QgdG8gdGFrZSB0aGUgc2l6ZSBvZiBmYWNlcyBpbnRvIGFjY291bnQgd2hlbiBhdXRvLWRlcml2aW5nIHZlcnRleCBub3JtYWxzIGFuZCB0YW5nZW50cy5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHVzZUZhY2VXZWlnaHRzKCk6Ym9vbGVhblxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl91c2VGYWNlV2VpZ2h0cztcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgdXNlRmFjZVdlaWdodHModmFsdWU6Ym9vbGVhbilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fdXNlRmFjZVdlaWdodHMgPT0gdmFsdWUpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl91c2VGYWNlV2VpZ2h0cyA9IHZhbHVlO1xyXG5cclxuXHJcblx0XHR0aGlzLl9mYWNlTm9ybWFsc0RpcnR5ID0gdHJ1ZTtcclxuXHR9XHJcblxyXG5cclxuXHRwdWJsaWMgZ2V0IGNvbmRlbnNlZEluZGV4TG9va1VwKCk6QXJyYXk8bnVtYmVyPlxyXG5cdHtcclxuXHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuX2NvbmRlbnNlZEluZGV4TG9va1VwO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3Rvcihjb25jYXRlbmF0ZWRBcnJheXM6Ym9vbGVhbilcclxuXHR7XHJcblx0XHRzdXBlcihjb25jYXRlbmF0ZWRBcnJheXMpO1xyXG5cclxuXHRcdHRoaXMuX3BTdWJNZXNoQ2xhc3MgPSBDdXJ2ZVN1Yk1lc2g7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0Qm91bmRpbmdQb3NpdGlvbnMoKTpBcnJheTxudW1iZXI+XHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX3Bvc2l0aW9uc0RpcnR5KVxyXG5cdFx0XHR0aGlzLnVwZGF0ZVBvc2l0aW9ucyh0aGlzLl9wb3NpdGlvbnMpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLl9wb3NpdGlvbnM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyB1cGRhdGVQb3NpdGlvbnModmFsdWVzOkFycmF5PG51bWJlcj4pXHJcblx0e1xyXG5cdFx0dmFyIGk6bnVtYmVyO1xyXG5cdFx0dmFyIGluZGV4Om51bWJlcjtcclxuXHRcdHZhciBzdHJpZGU6bnVtYmVyO1xyXG5cdFx0dmFyIHBvc2l0aW9uczpBcnJheTxudW1iZXI+O1xyXG5cclxuXHRcdHRoaXMuX3Bvc2l0aW9ucyA9IHZhbHVlcztcclxuXHJcblx0XHRpZiAodGhpcy5fcG9zaXRpb25zID09IG51bGwpXHJcblx0XHRcdHRoaXMuX3Bvc2l0aW9ucyA9IG5ldyBBcnJheTxudW1iZXI+KCk7XHJcblxyXG5cdFx0dGhpcy5fcE51bVZlcnRpY2VzID0gdGhpcy5fcG9zaXRpb25zLmxlbmd0aC8zO1xyXG5cclxuXHRcdGlmICh0aGlzLl9jb25jYXRlbmF0ZUFycmF5cykge1xyXG5cdFx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX3BOdW1WZXJ0aWNlcyp0aGlzLmdldFN0cmlkZShDdXJ2ZVN1Ykdlb21ldHJ5LlZFUlRFWF9EQVRBKTtcclxuXHJcblx0XHRcdGlmICh0aGlzLl9wVmVydGljZXMgPT0gbnVsbClcclxuXHRcdFx0XHR0aGlzLl9wVmVydGljZXMgPSBuZXcgQXJyYXk8bnVtYmVyPihsZW4pO1xyXG5cdFx0XHRlbHNlIGlmICh0aGlzLl9wVmVydGljZXMubGVuZ3RoICE9IGxlbilcclxuXHRcdFx0XHR0aGlzLl9wVmVydGljZXMubGVuZ3RoID0gbGVuO1xyXG5cclxuXHRcdFx0aSA9IDA7XHJcblx0XHRcdGluZGV4ID0gdGhpcy5nZXRPZmZzZXQoQ3VydmVTdWJHZW9tZXRyeS5QT1NJVElPTl9EQVRBKTtcclxuXHRcdFx0c3RyaWRlID0gdGhpcy5nZXRTdHJpZGUoQ3VydmVTdWJHZW9tZXRyeS5QT1NJVElPTl9EQVRBKTtcclxuXHRcdFx0cG9zaXRpb25zID0gdGhpcy5fcFZlcnRpY2VzO1xyXG5cclxuXHRcdFx0d2hpbGUgKGkgPCB2YWx1ZXMubGVuZ3RoKSB7XHJcblx0XHRcdFx0cG9zaXRpb25zW2luZGV4XSA9IHZhbHVlc1tpKytdO1xyXG5cdFx0XHRcdHBvc2l0aW9uc1tpbmRleCArIDFdID0gdmFsdWVzW2krK107XHJcblx0XHRcdFx0cG9zaXRpb25zW2luZGV4ICsgMl0gPSB2YWx1ZXNbaSsrXTtcclxuXHRcdFx0XHRpbmRleCArPSBzdHJpZGU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnBJbnZhbGlkYXRlQm91bmRzKCk7XHJcblxyXG5cdFx0dGhpcy5ub3RpZnlQb3NpdGlvbnNVcGRhdGUoKTtcclxuXHJcblx0XHR0aGlzLl9wb3NpdGlvbnNEaXJ0eSA9IGZhbHNlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVXBkYXRlcyB0aGUgdmVydGV4IG5vcm1hbHMgYmFzZWQgb24gdGhlIGdlb21ldHJ5LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyB1cGRhdGVDdXJ2ZXModmFsdWVzOkFycmF5PG51bWJlcj4pXHJcblx0e1xyXG5cdFx0dmFyIGk6bnVtYmVyO1xyXG5cdFx0dmFyIGluZGV4Om51bWJlcjtcclxuXHRcdHZhciBvZmZzZXQ6bnVtYmVyO1xyXG5cdFx0dmFyIHN0cmlkZTpudW1iZXI7XHJcblx0XHR2YXIgY3VydmVzOkFycmF5PG51bWJlcj47XHJcblxyXG5cdFx0aWYgKHRydWUpIHtcclxuXHRcdFx0aWYgKCh0aGlzLl9jdXJ2ZXMgPT0gbnVsbCB8fCB2YWx1ZXMgPT0gbnVsbCkgJiYgKHRoaXMuX2N1cnZlcyAhPSBudWxsIHx8IHZhbHVlcyAhPSBudWxsKSkge1xyXG5cdFx0XHRcdGlmICh0aGlzLl9jb25jYXRlbmF0ZUFycmF5cylcclxuXHRcdFx0XHRcdHRoaXMuX3BOb3RpZnlWZXJ0aWNlc1VwZGF0ZSgpO1xyXG5cdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdHRoaXMuX3BTdHJpZGVPZmZzZXREaXJ0eSA9IHRydWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMuX2N1cnZlcyA9IHZhbHVlcztcclxuXHJcblx0XHRcdGlmICh2YWx1ZXMgIT0gbnVsbCAmJiB0aGlzLl9jb25jYXRlbmF0ZUFycmF5cykge1xyXG5cdFx0XHRcdGkgPSAwO1xyXG5cdFx0XHRcdGluZGV4ID0gdGhpcy5nZXRPZmZzZXQoQ3VydmVTdWJHZW9tZXRyeS5DVVJWRV9EQVRBKTtcclxuXHRcdFx0XHRzdHJpZGUgPSB0aGlzLmdldFN0cmlkZShDdXJ2ZVN1Ykdlb21ldHJ5LkNVUlZFX0RBVEEpO1xyXG4gICAgICAgICAgICAgICAgY3VydmVzID0gdGhpcy5fcFZlcnRpY2VzO1xyXG5cclxuXHRcdFx0XHR3aGlsZSAoaSA8IHZhbHVlcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBjdXJ2ZXNbaW5kZXhdID0gdmFsdWVzW2krK107XHJcbiAgICAgICAgICAgICAgICAgICAgY3VydmVzW2luZGV4ICsgMV0gPSB2YWx1ZXNbaSsrXTtcclxuXHRcdFx0XHRcdGluZGV4ICs9IHN0cmlkZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHRoaXMubm90aWZ5Q3VydmVzVXBkYXRlKCk7XHJcblxyXG5cdFx0dGhpcy5fY3VydmVzRGlydHkgPSBmYWxzZTtcclxuXHR9XHJcblxyXG5cclxuXHJcblx0LyoqXHJcblx0ICogVXBkYXRlcyB0aGUgdXZzIGJhc2VkIG9uIHRoZSBnZW9tZXRyeS5cclxuXHQgKi9cclxuXHRwdWJsaWMgdXBkYXRlVVZzKHZhbHVlczpBcnJheTxudW1iZXI+KVxyXG5cdHtcclxuXHRcdHZhciBpOm51bWJlcjtcclxuXHRcdHZhciBpbmRleDpudW1iZXI7XHJcblx0XHR2YXIgb2Zmc2V0Om51bWJlcjtcclxuXHRcdHZhciBzdHJpZGU6bnVtYmVyO1xyXG5cdFx0dmFyIHV2czpBcnJheTxudW1iZXI+O1xyXG5cclxuXHRcdGlmICghdGhpcy5fYXV0b0Rlcml2ZVVWcykge1xyXG5cdFx0XHRpZiAoKHRoaXMuX3V2cyA9PSBudWxsIHx8IHZhbHVlcyA9PSBudWxsKSAmJiAodGhpcy5fdXZzICE9IG51bGwgfHwgdmFsdWVzICE9IG51bGwpKSB7XHJcblx0XHRcdFx0aWYgKHRoaXMuX2NvbmNhdGVuYXRlQXJyYXlzKVxyXG5cdFx0XHRcdFx0dGhpcy5fcE5vdGlmeVZlcnRpY2VzVXBkYXRlKCk7XHJcblx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0dGhpcy5fcFN0cmlkZU9mZnNldERpcnR5ID0gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5fdXZzID0gdmFsdWVzO1xyXG5cclxuXHRcdFx0aWYgKHZhbHVlcyAhPSBudWxsICYmIHRoaXMuX2NvbmNhdGVuYXRlQXJyYXlzKSB7XHJcblx0XHRcdFx0aSA9IDA7XHJcblx0XHRcdFx0aW5kZXggPSB0aGlzLmdldE9mZnNldChDdXJ2ZVN1Ykdlb21ldHJ5LlVWX0RBVEEpO1xyXG5cdFx0XHRcdHN0cmlkZSA9IHRoaXMuZ2V0U3RyaWRlKEN1cnZlU3ViR2VvbWV0cnkuVVZfREFUQSk7XHJcblx0XHRcdFx0dXZzID0gdGhpcy5fcFZlcnRpY2VzO1xyXG5cclxuXHRcdFx0XHR3aGlsZSAoaSA8IHZhbHVlcy5sZW5ndGgpIHtcclxuXHRcdFx0XHRcdHV2c1tpbmRleF0gPSB2YWx1ZXNbaSsrXTtcclxuXHRcdFx0XHRcdHV2c1tpbmRleCArIDFdID0gdmFsdWVzW2krK107XHJcblx0XHRcdFx0XHRpbmRleCArPSBzdHJpZGU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aWYgKHRoaXMuX3V2cyA9PSBudWxsKSB7XHJcblx0XHRcdFx0dGhpcy5fdXZzID0gbmV3IEFycmF5PG51bWJlcj4odGhpcy5fcG9zaXRpb25zLmxlbmd0aCoyLzMpO1xyXG5cclxuXHRcdFx0XHRpZiAodGhpcy5fY29uY2F0ZW5hdGVBcnJheXMpXHJcblx0XHRcdFx0XHR0aGlzLl9wTm90aWZ5VmVydGljZXNVcGRhdGUoKTtcclxuXHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHR0aGlzLl9wU3RyaWRlT2Zmc2V0RGlydHkgPSB0cnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRvZmZzZXQgPSB0aGlzLmdldE9mZnNldChDdXJ2ZVN1Ykdlb21ldHJ5LlVWX0RBVEEpO1xyXG5cdFx0XHRzdHJpZGUgPSB0aGlzLmdldFN0cmlkZShDdXJ2ZVN1Ykdlb21ldHJ5LlVWX0RBVEEpO1xyXG5cclxuXHRcdFx0Ly9hdXRvZGVyaXZlZCB1dnNcclxuXHRcdFx0dXZzID0gdGhpcy5fY29uY2F0ZW5hdGVBcnJheXM/IHRoaXMuX3BWZXJ0aWNlcyA6IHRoaXMuX3V2cztcclxuXHJcblx0XHRcdGkgPSAwO1xyXG5cdFx0XHRpbmRleCA9IG9mZnNldDtcclxuXHRcdFx0dmFyIHV2SWR4Om51bWJlciA9IDA7XHJcblxyXG5cdFx0XHQvL2NsZWFyIHV2IHZhbHVlc1xyXG5cdFx0XHR2YXIgbGVuVjpudW1iZXIgPSB1dnMubGVuZ3RoO1xyXG5cdFx0XHR3aGlsZSAoaW5kZXggPCBsZW5WKSB7XHJcblx0XHRcdFx0aWYgKHRoaXMuX2NvbmNhdGVuYXRlQXJyYXlzKSB7XHJcblx0XHRcdFx0XHR0aGlzLl91dnNbaSsrXSA9IHV2c1tpbmRleF0gPSB1dklkeCouNTtcclxuXHRcdFx0XHRcdHRoaXMuX3V2c1tpKytdID0gdXZzW2luZGV4ICsgMV0gPSAxLjAgLSAodXZJZHggJiAxKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dXZzW2luZGV4XSA9IHV2SWR4Ki41O1xyXG5cdFx0XHRcdFx0dXZzW2luZGV4ICsgMV0gPSAxLjAgLSAodXZJZHggJiAxKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmICgrK3V2SWR4ID09IDMpXHJcblx0XHRcdFx0XHR1dklkeCA9IDA7XHJcblxyXG5cdFx0XHRcdGluZGV4ICs9IHN0cmlkZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMubm90aWZ5VVZzVXBkYXRlKCk7XHJcblxyXG5cdFx0dGhpcy5fdXZzRGlydHkgPSBmYWxzZTtcclxuXHR9XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBkaXNwb3NlKClcclxuXHR7XHJcblx0XHRzdXBlci5kaXNwb3NlKCk7XHJcblxyXG5cdFx0dGhpcy5fcG9zaXRpb25zID0gbnVsbDtcclxuXHRcdHRoaXMuX2N1cnZlcyA9IG51bGw7XHJcblx0XHR0aGlzLl91dnMgPSBudWxsO1xyXG5cclxuXHRcdHRoaXMuX2ZhY2VOb3JtYWxzID0gbnVsbDtcclxuXHRcdHRoaXMuX2ZhY2VXZWlnaHRzID0gbnVsbDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFVwZGF0ZXMgdGhlIGZhY2UgaW5kaWNlcyBvZiB0aGUgQ3VydmVTdWJHZW9tZXRyeS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBpbmRpY2VzIFRoZSBmYWNlIGluZGljZXMgdG8gdXBsb2FkLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyB1cGRhdGVJbmRpY2VzKGluZGljZXM6QXJyYXk8bnVtYmVyPilcclxuXHR7XHJcblx0XHRzdXBlci51cGRhdGVJbmRpY2VzKGluZGljZXMpO1xyXG5cclxuXHRcdHRoaXMuX2ZhY2VOb3JtYWxzRGlydHkgPSB0cnVlO1xyXG5cclxuXHRcdGlmICh0aGlzLl9hdXRvRGVyaXZlTm9ybWFscylcclxuXHRcdFx0dGhpcy5fdmVydGV4Tm9ybWFsc0RpcnR5ID0gdHJ1ZTtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDbG9uZXMgdGhlIGN1cnJlbnQgb2JqZWN0XHJcblx0ICogQHJldHVybiBBbiBleGFjdCBkdXBsaWNhdGUgb2YgdGhlIGN1cnJlbnQgb2JqZWN0LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBjbG9uZSgpOkN1cnZlU3ViR2VvbWV0cnlcclxuXHR7XHJcblx0XHR2YXIgY2xvbmU6Q3VydmVTdWJHZW9tZXRyeSA9IG5ldyBDdXJ2ZVN1Ykdlb21ldHJ5KHRoaXMuX2NvbmNhdGVuYXRlQXJyYXlzKTtcclxuXHRcdGNsb25lLnVwZGF0ZUluZGljZXModGhpcy5fcEluZGljZXMuY29uY2F0KCkpO1xyXG5cdFx0Y2xvbmUudXBkYXRlUG9zaXRpb25zKHRoaXMuX3Bvc2l0aW9ucy5jb25jYXQoKSk7XHJcblxyXG5cdFx0aWYgKHRoaXMuX2N1cnZlcylcclxuXHRcdFx0Y2xvbmUudXBkYXRlQ3VydmVzKHRoaXMuX2N1cnZlcy5jb25jYXQoKSk7XHJcblx0XHRlbHNlXHJcblx0XHRcdGNsb25lLnVwZGF0ZUN1cnZlcyhudWxsKTtcclxuXHJcblx0XHRpZiAodGhpcy5fdXZzICYmICF0aGlzLl9hdXRvRGVyaXZlVVZzKVxyXG5cdFx0XHRjbG9uZS51cGRhdGVVVnModGhpcy5fdXZzLmNvbmNhdCgpKTtcclxuXHRcdGVsc2VcclxuXHRcdFx0Y2xvbmUudXBkYXRlVVZzKG51bGwpO1xyXG5cclxuXHRcdHJldHVybiBjbG9uZTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzY2FsZVVWKHNjYWxlVTpudW1iZXIgPSAxLCBzY2FsZVY6bnVtYmVyID0gMSlcclxuXHR7XHJcblx0XHR2YXIgaW5kZXg6bnVtYmVyO1xyXG5cdFx0dmFyIG9mZnNldDpudW1iZXI7XHJcblx0XHR2YXIgc3RyaWRlOm51bWJlcjtcclxuXHRcdHZhciB1dnM6QXJyYXk8bnVtYmVyPjtcclxuXHJcblx0XHR1dnMgPSB0aGlzLl91dnM7XHJcblxyXG5cdFx0dmFyIHJhdGlvVTpudW1iZXIgPSBzY2FsZVUvdGhpcy5fc2NhbGVVO1xyXG5cdFx0dmFyIHJhdGlvVjpudW1iZXIgPSBzY2FsZVYvdGhpcy5fc2NhbGVWO1xyXG5cclxuXHRcdHRoaXMuX3NjYWxlVSA9IHNjYWxlVTtcclxuXHRcdHRoaXMuX3NjYWxlViA9IHNjYWxlVjtcclxuXHJcblx0XHR2YXIgbGVuOm51bWJlciA9IHV2cy5sZW5ndGg7XHJcblxyXG5cdFx0b2Zmc2V0ID0gMDtcclxuXHRcdHN0cmlkZSA9IDI7XHJcblxyXG5cdFx0aW5kZXggPSBvZmZzZXQ7XHJcblxyXG5cdFx0d2hpbGUgKGluZGV4IDwgbGVuKSB7XHJcblx0XHRcdHV2c1tpbmRleF0gKj0gcmF0aW9VO1xyXG5cdFx0XHR1dnNbaW5kZXggKyAxXSAqPSByYXRpb1Y7XHJcblx0XHRcdGluZGV4ICs9IHN0cmlkZTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLm5vdGlmeVVWc1VwZGF0ZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2NhbGVzIHRoZSBnZW9tZXRyeS5cclxuXHQgKiBAcGFyYW0gc2NhbGUgVGhlIGFtb3VudCBieSB3aGljaCB0byBzY2FsZS5cclxuXHQgKi9cclxuXHRwdWJsaWMgc2NhbGUoc2NhbGU6bnVtYmVyKVxyXG5cdHtcclxuXHRcdHZhciBpOm51bWJlcjtcclxuXHRcdHZhciBpbmRleDpudW1iZXI7XHJcblx0XHR2YXIgb2Zmc2V0Om51bWJlcjtcclxuXHRcdHZhciBzdHJpZGU6bnVtYmVyO1xyXG5cdFx0dmFyIHBvc2l0aW9uczpBcnJheTxudW1iZXI+O1xyXG5cclxuXHRcdHBvc2l0aW9ucyA9IHRoaXMuX3Bvc2l0aW9ucztcclxuXHJcblx0XHR2YXIgbGVuOm51bWJlciA9IHBvc2l0aW9ucy5sZW5ndGg7XHJcblxyXG5cdFx0b2Zmc2V0ID0gMDtcclxuXHRcdHN0cmlkZSA9IDM7XHJcblxyXG5cdFx0aSA9IDA7XHJcblx0XHRpbmRleCA9IG9mZnNldDtcclxuXHRcdHdoaWxlIChpIDwgbGVuKSB7XHJcblx0XHRcdHBvc2l0aW9uc1tpbmRleF0gKj0gc2NhbGU7XHJcblx0XHRcdHBvc2l0aW9uc1tpbmRleCArIDFdICo9IHNjYWxlO1xyXG5cdFx0XHRwb3NpdGlvbnNbaW5kZXggKyAyXSAqPSBzY2FsZTtcclxuXHJcblx0XHRcdGkgKz0gMztcclxuXHRcdFx0aW5kZXggKz0gc3RyaWRlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMubm90aWZ5UG9zaXRpb25zVXBkYXRlKCk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgYXBwbHlUcmFuc2Zvcm1hdGlvbih0cmFuc2Zvcm06TWF0cml4M0QpXHJcblx0e1xyXG5cdFx0dmFyIHBvc2l0aW9uczpBcnJheTxudW1iZXI+O1xyXG5cclxuXHRcdGlmICh0aGlzLl9jb25jYXRlbmF0ZUFycmF5cykge1xyXG5cdFx0XHRwb3NpdGlvbnMgPSB0aGlzLl9wVmVydGljZXM7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRwb3NpdGlvbnMgPSB0aGlzLl9wb3NpdGlvbnM7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9wb3NpdGlvbnMubGVuZ3RoLzM7XHJcblx0XHR2YXIgaTpudW1iZXI7XHJcblx0XHR2YXIgaTE6bnVtYmVyO1xyXG5cdFx0dmFyIGkyOm51bWJlcjtcclxuXHRcdHZhciB2ZWN0b3I6VmVjdG9yM0QgPSBuZXcgVmVjdG9yM0QoKTtcclxuXHJcblx0XHR2YXIgaW52VHJhbnNwb3NlOk1hdHJpeDNEO1xyXG5cclxuXHJcblxyXG5cdFx0dmFyIHZpMDpudW1iZXIgPSB0aGlzLmdldE9mZnNldChDdXJ2ZVN1Ykdlb21ldHJ5LlBPU0lUSU9OX0RBVEEpO1xyXG5cdFx0dmFyIHZTdHJpZGU6bnVtYmVyID0gdGhpcy5nZXRTdHJpZGUoQ3VydmVTdWJHZW9tZXRyeS5QT1NJVElPTl9EQVRBKTtcclxuXHJcblx0XHRmb3IgKGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcclxuXHRcdFx0aTEgPSB2aTAgKyAxO1xyXG5cdFx0XHRpMiA9IHZpMCArIDI7XHJcblxyXG5cdFx0XHQvLyBiYWtlIHBvc2l0aW9uXHJcblx0XHRcdHZlY3Rvci54ID0gcG9zaXRpb25zW3ZpMF07XHJcblx0XHRcdHZlY3Rvci55ID0gcG9zaXRpb25zW2kxXTtcclxuXHRcdFx0dmVjdG9yLnogPSBwb3NpdGlvbnNbaTJdO1xyXG5cdFx0XHR2ZWN0b3IgPSB0cmFuc2Zvcm0udHJhbnNmb3JtVmVjdG9yKHZlY3Rvcik7XHJcblx0XHRcdHBvc2l0aW9uc1t2aTBdID0gdmVjdG9yLng7XHJcblx0XHRcdHBvc2l0aW9uc1tpMV0gPSB2ZWN0b3IueTtcclxuXHRcdFx0cG9zaXRpb25zW2kyXSA9IHZlY3Rvci56O1xyXG5cdFx0XHR2aTAgKz0gdlN0cmlkZTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5ub3RpZnlQb3NpdGlvbnNVcGRhdGUoKTtcclxuXHR9XHJcblxyXG5cclxuXHJcblx0LyoqXHJcblx0ICogVXBkYXRlcyB0aGUgbm9ybWFscyBmb3IgZWFjaCBmYWNlLlxyXG5cdCAqL1xyXG5cdHByaXZhdGUgdXBkYXRlRmFjZU5vcm1hbHMoKVxyXG5cdHtcclxuXHRcdHZhciBpOm51bWJlciA9IDA7XHJcblx0XHR2YXIgajpudW1iZXIgPSAwO1xyXG5cdFx0dmFyIGs6bnVtYmVyID0gMDtcclxuXHRcdHZhciBpbmRleDpudW1iZXI7XHJcblx0XHR2YXIgb2Zmc2V0Om51bWJlcjtcclxuXHRcdHZhciBzdHJpZGU6bnVtYmVyO1xyXG5cclxuXHRcdHZhciB4MTpudW1iZXIsIHgyOm51bWJlciwgeDM6bnVtYmVyO1xyXG5cdFx0dmFyIHkxOm51bWJlciwgeTI6bnVtYmVyLCB5MzpudW1iZXI7XHJcblx0XHR2YXIgejE6bnVtYmVyLCB6MjpudW1iZXIsIHozOm51bWJlcjtcclxuXHRcdHZhciBkeDE6bnVtYmVyLCBkeTE6bnVtYmVyLCBkejE6bnVtYmVyO1xyXG5cdFx0dmFyIGR4MjpudW1iZXIsIGR5MjpudW1iZXIsIGR6MjpudW1iZXI7XHJcblx0XHR2YXIgY3g6bnVtYmVyLCBjeTpudW1iZXIsIGN6Om51bWJlcjtcclxuXHRcdHZhciBkOm51bWJlcjtcclxuXHJcblx0XHR2YXIgcG9zaXRpb25zOkFycmF5PG51bWJlcj4gPSB0aGlzLl9wb3NpdGlvbnM7XHJcblxyXG5cdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9wSW5kaWNlcy5sZW5ndGg7XHJcblxyXG5cdFx0aWYgKHRoaXMuX2ZhY2VOb3JtYWxzID09IG51bGwpXHJcblx0XHRcdHRoaXMuX2ZhY2VOb3JtYWxzID0gbmV3IEFycmF5PG51bWJlcj4obGVuKTtcclxuXHJcblx0XHRpZiAodGhpcy5fdXNlRmFjZVdlaWdodHMgJiYgdGhpcy5fZmFjZVdlaWdodHMgPT0gbnVsbClcclxuXHRcdFx0dGhpcy5fZmFjZVdlaWdodHMgPSBuZXcgQXJyYXk8bnVtYmVyPihsZW4vMyk7XHJcblxyXG5cdFx0d2hpbGUgKGkgPCBsZW4pIHtcclxuXHRcdFx0aW5kZXggPSB0aGlzLl9wSW5kaWNlc1tpKytdKjM7XHJcblx0XHRcdHgxID0gcG9zaXRpb25zW2luZGV4XTtcclxuXHRcdFx0eTEgPSBwb3NpdGlvbnNbaW5kZXggKyAxXTtcclxuXHRcdFx0ejEgPSBwb3NpdGlvbnNbaW5kZXggKyAyXTtcclxuXHRcdFx0aW5kZXggPSB0aGlzLl9wSW5kaWNlc1tpKytdKjM7XHJcblx0XHRcdHgyID0gcG9zaXRpb25zW2luZGV4XTtcclxuXHRcdFx0eTIgPSBwb3NpdGlvbnNbaW5kZXggKyAxXTtcclxuXHRcdFx0ejIgPSBwb3NpdGlvbnNbaW5kZXggKyAyXTtcclxuXHRcdFx0aW5kZXggPSB0aGlzLl9wSW5kaWNlc1tpKytdKjM7XHJcblx0XHRcdHgzID0gcG9zaXRpb25zW2luZGV4XTtcclxuXHRcdFx0eTMgPSBwb3NpdGlvbnNbaW5kZXggKyAxXTtcclxuXHRcdFx0ejMgPSBwb3NpdGlvbnNbaW5kZXggKyAyXTtcclxuXHRcdFx0ZHgxID0geDMgLSB4MTtcclxuXHRcdFx0ZHkxID0geTMgLSB5MTtcclxuXHRcdFx0ZHoxID0gejMgLSB6MTtcclxuXHRcdFx0ZHgyID0geDIgLSB4MTtcclxuXHRcdFx0ZHkyID0geTIgLSB5MTtcclxuXHRcdFx0ZHoyID0gejIgLSB6MTtcclxuXHRcdFx0Y3ggPSBkejEqZHkyIC0gZHkxKmR6MjtcclxuXHRcdFx0Y3kgPSBkeDEqZHoyIC0gZHoxKmR4MjtcclxuXHRcdFx0Y3ogPSBkeTEqZHgyIC0gZHgxKmR5MjtcclxuXHRcdFx0ZCA9IE1hdGguc3FydChjeCpjeCArIGN5KmN5ICsgY3oqY3opO1xyXG5cdFx0XHQvLyBsZW5ndGggb2YgY3Jvc3MgcHJvZHVjdCA9IDIqdHJpYW5nbGUgYXJlYVxyXG5cclxuXHRcdFx0aWYgKHRoaXMuX3VzZUZhY2VXZWlnaHRzKSB7XHJcblx0XHRcdFx0dmFyIHc6bnVtYmVyID0gZCoxMDAwMDtcclxuXHJcblx0XHRcdFx0aWYgKHcgPCAxKVxyXG5cdFx0XHRcdFx0dyA9IDE7XHJcblxyXG5cdFx0XHRcdHRoaXMuX2ZhY2VXZWlnaHRzW2srK10gPSB3O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRkID0gMS9kO1xyXG5cclxuXHRcdFx0dGhpcy5fZmFjZU5vcm1hbHNbaisrXSA9IGN4KmQ7XHJcblx0XHRcdHRoaXMuX2ZhY2VOb3JtYWxzW2orK10gPSBjeSpkO1xyXG5cdFx0XHR0aGlzLl9mYWNlTm9ybWFsc1tqKytdID0gY3oqZDtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLl9mYWNlTm9ybWFsc0RpcnR5ID0gZmFsc2U7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgX3BOb3RpZnlWZXJ0aWNlc1VwZGF0ZSgpXHJcblx0e1xyXG5cdFx0dGhpcy5fcFN0cmlkZU9mZnNldERpcnR5ID0gdHJ1ZTtcclxuXHJcblx0XHR0aGlzLm5vdGlmeVBvc2l0aW9uc1VwZGF0ZSgpO1xyXG5cdFx0dGhpcy5ub3RpZnlDdXJ2ZXNVcGRhdGUoKTtcclxuXHRcdHRoaXMubm90aWZ5VVZzVXBkYXRlKCk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIG5vdGlmeVBvc2l0aW9uc1VwZGF0ZSgpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX3Bvc2l0aW9uc0RpcnR5KVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fcG9zaXRpb25zRGlydHkgPSB0cnVlO1xyXG5cclxuXHRcdGlmICghdGhpcy5fcG9zaXRpb25zVXBkYXRlZClcclxuXHRcdFx0dGhpcy5fcG9zaXRpb25zVXBkYXRlZCA9IG5ldyBTdWJHZW9tZXRyeUV2ZW50KFN1Ykdlb21ldHJ5RXZlbnQuVkVSVElDRVNfVVBEQVRFRCwgQ3VydmVTdWJHZW9tZXRyeS5QT1NJVElPTl9EQVRBKTtcclxuXHJcblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQodGhpcy5fcG9zaXRpb25zVXBkYXRlZCk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIG5vdGlmeUN1cnZlc1VwZGF0ZSgpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX2N1cnZlc0RpcnR5KVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fY3VydmVzRGlydHkgPSB0cnVlO1xyXG5cclxuXHRcdGlmICghdGhpcy5fY3VydmVzVXBkYXRlZClcclxuXHRcdFx0dGhpcy5fY3VydmVzVXBkYXRlZCA9IG5ldyBTdWJHZW9tZXRyeUV2ZW50KFN1Ykdlb21ldHJ5RXZlbnQuVkVSVElDRVNfVVBEQVRFRCwgQ3VydmVTdWJHZW9tZXRyeS5DVVJWRV9EQVRBKTtcclxuXHJcblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQodGhpcy5fY3VydmVzVXBkYXRlZCk7XHJcblx0fVxyXG5cclxuXHJcblxyXG5cdHByaXZhdGUgbm90aWZ5VVZzVXBkYXRlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl91dnNEaXJ0eSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICB0aGlzLl91dnNEaXJ0eSA9IHRydWU7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5fdXZzVXBkYXRlZClcclxuICAgICAgICAgICAgdGhpcy5fdXZzVXBkYXRlZCA9IG5ldyBTdWJHZW9tZXRyeUV2ZW50KFN1Ykdlb21ldHJ5RXZlbnQuVkVSVElDRVNfVVBEQVRFRCwgQ3VydmVTdWJHZW9tZXRyeS5VVl9EQVRBKTtcclxuXHJcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KHRoaXMuX3V2c1VwZGF0ZWQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgPSBDdXJ2ZVN1Ykdlb21ldHJ5OyJdfQ==