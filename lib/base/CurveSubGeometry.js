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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0N1cnZlU3ViR2VvbWV0cnkudHMiXSwibmFtZXMiOlsiQ3VydmVTdWJHZW9tZXRyeSIsIkN1cnZlU3ViR2VvbWV0cnkuY29uc3RydWN0b3IiLCJDdXJ2ZVN1Ykdlb21ldHJ5LnNjYWxlVSIsIkN1cnZlU3ViR2VvbWV0cnkuc2NhbGVWIiwiQ3VydmVTdWJHZW9tZXRyeS51c2VDb25kZW5zZWRJbmRpY2VzIiwiQ3VydmVTdWJHZW9tZXRyeS5fcFVwZGF0ZVN0cmlkZU9mZnNldCIsIkN1cnZlU3ViR2VvbWV0cnkuYXV0b0Rlcml2ZVVWcyIsIkN1cnZlU3ViR2VvbWV0cnkuYXV0b0Rlcml2ZU5vcm1hbHMiLCJDdXJ2ZVN1Ykdlb21ldHJ5LnZlcnRpY2VzIiwiQ3VydmVTdWJHZW9tZXRyeS5wb3NpdGlvbnMiLCJDdXJ2ZVN1Ykdlb21ldHJ5LmN1cnZlcyIsIkN1cnZlU3ViR2VvbWV0cnkuZmFjZU5vcm1hbHMiLCJDdXJ2ZVN1Ykdlb21ldHJ5LnV2cyIsIkN1cnZlU3ViR2VvbWV0cnkudXNlRmFjZVdlaWdodHMiLCJDdXJ2ZVN1Ykdlb21ldHJ5LmNvbmRlbnNlZEluZGV4TG9va1VwIiwiQ3VydmVTdWJHZW9tZXRyeS5nZXRCb3VuZGluZ1Bvc2l0aW9ucyIsIkN1cnZlU3ViR2VvbWV0cnkudXBkYXRlUG9zaXRpb25zIiwiQ3VydmVTdWJHZW9tZXRyeS51cGRhdGVDdXJ2ZXMiLCJDdXJ2ZVN1Ykdlb21ldHJ5LnVwZGF0ZVVWcyIsIkN1cnZlU3ViR2VvbWV0cnkuZGlzcG9zZSIsIkN1cnZlU3ViR2VvbWV0cnkudXBkYXRlSW5kaWNlcyIsIkN1cnZlU3ViR2VvbWV0cnkuY2xvbmUiLCJDdXJ2ZVN1Ykdlb21ldHJ5LnNjYWxlVVYiLCJDdXJ2ZVN1Ykdlb21ldHJ5LnNjYWxlIiwiQ3VydmVTdWJHZW9tZXRyeS5hcHBseVRyYW5zZm9ybWF0aW9uIiwiQ3VydmVTdWJHZW9tZXRyeS51cGRhdGVGYWNlTm9ybWFscyIsIkN1cnZlU3ViR2VvbWV0cnkuX3BOb3RpZnlWZXJ0aWNlc1VwZGF0ZSIsIkN1cnZlU3ViR2VvbWV0cnkubm90aWZ5UG9zaXRpb25zVXBkYXRlIiwiQ3VydmVTdWJHZW9tZXRyeS5ub3RpZnlDdXJ2ZXNVcGRhdGUiLCJDdXJ2ZVN1Ykdlb21ldHJ5Lm5vdGlmeVVWc1VwZGF0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsSUFBTyxRQUFRLFdBQWUsK0JBQStCLENBQUMsQ0FBQztBQUUvRCxJQUFPLGVBQWUsV0FBYSx5Q0FBeUMsQ0FBQyxDQUFDO0FBQzlFLElBQU8sWUFBWSxXQUFpQixzQ0FBc0MsQ0FBQyxDQUFDO0FBQzVFLElBQU8sZ0JBQWdCLFdBQWEsNENBQTRDLENBQUMsQ0FBQztBQUVsRixBQUdBOztHQURHO0lBQ0csZ0JBQWdCO0lBQVNBLFVBQXpCQSxnQkFBZ0JBLFVBQXdCQTtJQTBRN0NBOztPQUVHQTtJQUNIQSxTQTdRS0EsZ0JBQWdCQSxDQTZRVEEsa0JBQTBCQTtRQUVyQ0Msa0JBQU1BLGtCQUFrQkEsQ0FBQ0EsQ0FBQ0E7UUFwUW5CQSxvQkFBZUEsR0FBV0EsSUFBSUEsQ0FBQ0E7UUFDL0JBLGlCQUFZQSxHQUFXQSxJQUFJQSxDQUFDQTtRQUM1QkEsc0JBQWlCQSxHQUFXQSxJQUFJQSxDQUFDQTtRQUM5QkEsd0JBQW1CQSxHQUFXQSxJQUFJQSxDQUFDQTtRQUN0Q0EsY0FBU0EsR0FBV0EsSUFBSUEsQ0FBQ0E7UUFDekJBLHVCQUFrQkEsR0FBV0EsSUFBSUEsQ0FBQ0E7UUFDbENBLHVCQUFrQkEsR0FBV0EsSUFBSUEsQ0FBQ0E7UUFDbENBLHVCQUFrQkEsR0FBV0EsSUFBSUEsQ0FBQ0E7UUFZbENBLHVCQUFrQkEsR0FBV0EsSUFBSUEsQ0FBQ0E7UUFDbENBLHVCQUFrQkEsR0FBV0EsS0FBS0EsQ0FBQ0E7UUFDbkNBLG9CQUFlQSxHQUFXQSxLQUFLQSxDQUFDQTtRQUM3QkEsbUJBQWNBLEdBQVdBLEtBQUtBLENBQUNBO1FBS2xDQSxZQUFPQSxHQUFVQSxDQUFDQSxDQUFDQTtRQUNuQkEsWUFBT0EsR0FBVUEsQ0FBQ0EsQ0FBQ0E7UUEwTzFCQSxJQUFJQSxDQUFDQSxjQUFjQSxHQUFHQSxZQUFZQSxDQUFDQTtJQUNwQ0EsQ0FBQ0E7SUFoT0RELHNCQUFXQSxvQ0FBTUE7UUFIakJBOztXQUVHQTthQUNIQTtZQUVDRSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQTtRQUNyQkEsQ0FBQ0E7OztPQUFBRjtJQUtEQSxzQkFBV0Esb0NBQU1BO1FBSGpCQTs7V0FFR0E7YUFDSEE7WUFFQ0csTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7UUFDckJBLENBQUNBOzs7T0FBQUg7SUFPREEsc0JBQVdBLGlEQUFtQkE7UUFMOUJBOzs7O1dBSUdBO2FBQ0hBO1lBRUNJLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLG9CQUFvQkEsQ0FBQ0E7UUFDbENBLENBQUNBO2FBRURKLFVBQStCQSxLQUFhQTtZQUUzQ0ksRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0Esb0JBQW9CQSxJQUFJQSxLQUFLQSxDQUFDQTtnQkFDdENBLE1BQU1BLENBQUNBO1lBRVJBLElBQUlBLENBQUNBLG9CQUFvQkEsR0FBR0EsS0FBS0EsQ0FBQ0E7UUFDbkNBLENBQUNBOzs7T0FSQUo7SUFVTUEsK0NBQW9CQSxHQUEzQkE7UUFFQ0ssRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUM3QkEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxXQUFXQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUVoREEsQUFDQUEsdUJBRHVCQTtZQUN2QkEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxhQUFhQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUNsREEsSUFBSUEsTUFBTUEsR0FBVUEsQ0FBQ0EsQ0FBQ0E7WUFFdEJBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLElBQUlBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO2dCQUMxQkEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxVQUFVQSxDQUFDQSxHQUFHQSxNQUFNQSxDQUFDQTtnQkFDcERBLE1BQU1BLElBQUlBLENBQUNBLENBQUNBO1lBQ2JBLENBQUNBO1lBRURBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLElBQUlBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO2dCQUN2QkEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxPQUFPQSxDQUFDQSxHQUFHQSxNQUFNQSxDQUFDQTtnQkFDakRBLE1BQU1BLElBQUlBLENBQUNBLENBQUNBO1lBQ2JBLENBQUNBO1lBSURBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsR0FBR0EsTUFBTUEsQ0FBQ0E7WUFDckRBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsR0FBR0EsTUFBTUEsQ0FBQ0E7WUFDdkRBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsR0FBR0EsTUFBTUEsQ0FBQ0E7WUFDcERBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsR0FBR0EsTUFBTUEsQ0FBQ0E7WUFFakRBLElBQUlBLEdBQUdBLEdBQVVBLElBQUlBLENBQUNBLGFBQWFBLEdBQUNBLE1BQU1BLENBQUNBO1lBRTNDQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxJQUFJQSxJQUFJQSxDQUFDQTtnQkFDM0JBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLElBQUlBLEtBQUtBLENBQVNBLEdBQUdBLENBQUNBLENBQUNBO1lBQzFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxNQUFNQSxJQUFJQSxHQUFHQSxDQUFDQTtnQkFD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RWJBLElBQUlBLFNBQVNBLEdBQWlCQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQTtRQUU5Q0EsSUFBSUEsR0FBR0EsR0FBVUEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsTUFBTUEsQ0FBQ0E7UUFFdkNBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFlBQVlBLElBQUlBLElBQUlBLENBQUNBO1lBQzdCQSxJQUFJQSxDQUFDQSxZQUFZQSxHQUFHQSxJQUFJQSxLQUFLQSxDQUFTQSxHQUFHQSxDQUFDQSxDQUFDQTtRQUU1Q0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsZUFBZUEsSUFBSUEsSUFBSUEsQ0FBQ0EsWUFBWUEsSUFBSUEsSUFBSUEsQ0FBQ0E7WUFDckRBLElBQUlBLENBQUNBLFlBQVlBLEdBQUdBLElBQUlBLEtBQUtBLENBQVNBLEdBQUdBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBO1FBRTlDQSxPQUFPQSxDQUFDQSxHQUFHQSxHQUFHQSxFQUFFQSxDQUFDQTtZQUNoQkEsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDOUJBLEVBQUVBLEdBQUdBLFNBQVNBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO1lBQ3RCQSxFQUFFQSxHQUFHQSxTQUFTQSxDQUFDQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUMxQkEsRUFBRUEsR0FBR0EsU0FBU0EsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDMUJBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBO1lBQzlCQSxFQUFFQSxHQUFHQSxTQUFTQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtZQUN0QkEsRUFBRUEsR0FBR0EsU0FBU0EsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDMUJBLEVBQUVBLEdBQUdBLFNBQVNBLENBQUNBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO1lBQzFCQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQTtZQUM5QkEsRUFBRUEsR0FBR0EsU0FBU0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7WUFDdEJBLEVBQUVBLEdBQUdBLFNBQVNBLENBQUNBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO1lBQzFCQSxFQUFFQSxHQUFHQSxTQUFTQSxDQUFDQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUMxQkEsR0FBR0EsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsQ0FBQ0E7WUFDZEEsR0FBR0EsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsQ0FBQ0E7WUFDZEEsR0FBR0EsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsQ0FBQ0E7WUFDZEEsR0FBR0EsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsQ0FBQ0E7WUFDZEEsR0FBR0EsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsQ0FBQ0E7WUFDZEEsR0FBR0EsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsQ0FBQ0E7WUFDZEEsRUFBRUEsR0FBR0EsR0FBR0EsR0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBQ0EsR0FBR0EsQ0FBQ0E7WUFDdkJBLEVBQUVBLEdBQUdBLEdBQUdBLEdBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUNBLEdBQUdBLENBQUNBO1lBQ3ZCQSxFQUFFQSxHQUFHQSxHQUFHQSxHQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFDQSxHQUFHQSxDQUFDQTtZQUN2QkEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBQ0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBQ0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7WUFDckNBLEFBRUFBLDRDQUY0Q0E7WUFFNUNBLEVBQUVB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Q0EsZ0JBQWdCQSxFQUFFQSxnQkFBZ0JBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO1FBRXpHQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQTtJQUN6Q0EsQ0FBQ0E7SUE1dEJVN0IsOEJBQWFBLEdBQVVBLFdBQVdBLENBQUNBO0lBQ2hDQSwyQkFBVUEsR0FBVUEsUUFBUUEsQ0FBQ0E7SUFDaENBLHdCQUFPQSxHQUFVQSxLQUFLQSxDQUFDQTtJQUVyQ0EsOEJBQThCQTtJQUNoQkEsZ0NBQWVBLEdBQVVBLFFBQVFBLENBQUNBO0lBQ2xDQSw2QkFBWUEsR0FBVUEsUUFBUUEsQ0FBQ0E7SUFDL0JBLDBCQUFTQSxHQUFVQSxRQUFRQSxDQUFDQTtJQXN0QjNDQSx1QkFBQ0E7QUFBREEsQ0EvdEJBLEFBK3RCQ0EsRUEvdEI4QixlQUFlLEVBK3RCN0M7QUFFRCxBQUEwQixpQkFBakIsZ0JBQWdCLENBQUMiLCJmaWxlIjoiYmFzZS9DdXJ2ZVN1Ykdlb21ldHJ5LmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNYXRyaXgzRFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9NYXRyaXgzRFwiKTtcbmltcG9ydCBWZWN0b3IzRFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9WZWN0b3IzRFwiKTtcblxuaW1wb3J0IFN1Ykdlb21ldHJ5QmFzZVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL1N1Ykdlb21ldHJ5QmFzZVwiKTtcbmltcG9ydCBDdXJ2ZVN1Yk1lc2hcdFx0ICAgIFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvQ3VydmVTdWJNZXNoXCIpO1xuaW1wb3J0IFN1Ykdlb21ldHJ5RXZlbnRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZXZlbnRzL1N1Ykdlb21ldHJ5RXZlbnRcIik7XG5cbi8qKlxuICogQGNsYXNzIGF3YXkuYmFzZS5DdXJ2ZVN1Ykdlb21ldHJ5XG4gKi9cbmNsYXNzIEN1cnZlU3ViR2VvbWV0cnkgZXh0ZW5kcyBTdWJHZW9tZXRyeUJhc2Vcbntcblx0cHVibGljIHN0YXRpYyBQT1NJVElPTl9EQVRBOnN0cmluZyA9IFwicG9zaXRpb25zXCI7XG4gICAgcHVibGljIHN0YXRpYyBDVVJWRV9EQVRBOnN0cmluZyA9IFwiY3VydmVzXCI7XG5cdHB1YmxpYyBzdGF0aWMgVVZfREFUQTpzdHJpbmcgPSBcInV2c1wiO1xuXG5cdC8vVE9ETyAtIG1vdmUgdGhlc2UgdG8gU3RhZ2VHTFxuXHRwdWJsaWMgc3RhdGljIFBPU0lUSU9OX0ZPUk1BVDpzdHJpbmcgPSBcImZsb2F0M1wiO1xuXHRwdWJsaWMgc3RhdGljIENVUlZFX0ZPUk1BVDpzdHJpbmcgPSBcImZsb2F0MlwiO1xuXHRwdWJsaWMgc3RhdGljIFVWX0ZPUk1BVDpzdHJpbmcgPSBcImZsb2F0MlwiO1xuXG5cdHByaXZhdGUgX3Bvc2l0aW9uc0RpcnR5OmJvb2xlYW4gPSB0cnVlO1xuXHRwcml2YXRlIF9jdXJ2ZXNEaXJ0eTpib29sZWFuID0gdHJ1ZTtcblx0cHJpdmF0ZSBfZmFjZU5vcm1hbHNEaXJ0eTpib29sZWFuID0gdHJ1ZTtcbiAgICBwcml2YXRlIF92ZXJ0ZXhOb3JtYWxzRGlydHk6Ym9vbGVhbiA9IHRydWU7XG5cdHByaXZhdGUgX3V2c0RpcnR5OmJvb2xlYW4gPSB0cnVlO1xuXHRwcml2YXRlIF9zZWNvbmRhcnlVVnNEaXJ0eTpib29sZWFuID0gdHJ1ZTtcblx0cHJpdmF0ZSBfam9pbnRJbmRpY2VzRGlydHk6Ym9vbGVhbiA9IHRydWU7XG5cdHByaXZhdGUgX2pvaW50V2VpZ2h0c0RpcnR5OmJvb2xlYW4gPSB0cnVlO1xuXG5cdHByaXZhdGUgX3Bvc2l0aW9uczpBcnJheTxudW1iZXI+O1xuXHRwcml2YXRlIF9jdXJ2ZXM6QXJyYXk8bnVtYmVyPjtcblx0cHJpdmF0ZSBfdXZzOkFycmF5PG51bWJlcj47XG5cblxuXHRwcml2YXRlIF91c2VDb25kZW5zZWRJbmRpY2VzOmJvb2xlYW47XG5cdHByaXZhdGUgX2NvbmRlbnNlZEpvaW50SW5kaWNlczpBcnJheTxudW1iZXI+O1xuXHRwcml2YXRlIF9jb25kZW5zZWRJbmRleExvb2tVcDpBcnJheTxudW1iZXI+O1xuXG5cblx0cHJpdmF0ZSBfY29uY2F0ZW5hdGVBcnJheXM6Ym9vbGVhbiA9IHRydWU7XG5cdHByaXZhdGUgX2F1dG9EZXJpdmVOb3JtYWxzOmJvb2xlYW4gPSBmYWxzZTtcblx0cHJpdmF0ZSBfdXNlRmFjZVdlaWdodHM6Ym9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgX2F1dG9EZXJpdmVVVnM6Ym9vbGVhbiA9IGZhbHNlO1xuXG5cdHByaXZhdGUgX2ZhY2VOb3JtYWxzOkFycmF5PG51bWJlcj47XG5cdHByaXZhdGUgX2ZhY2VXZWlnaHRzOkFycmF5PG51bWJlcj47XG5cblx0cHJpdmF0ZSBfc2NhbGVVOm51bWJlciA9IDE7XG5cdHByaXZhdGUgX3NjYWxlVjpudW1iZXIgPSAxO1xuXG5cdHByaXZhdGUgX3Bvc2l0aW9uc1VwZGF0ZWQ6U3ViR2VvbWV0cnlFdmVudDtcblx0cHJpdmF0ZSBfY3VydmVzVXBkYXRlZDpTdWJHZW9tZXRyeUV2ZW50O1xuXHRwcml2YXRlIF91dnNVcGRhdGVkOlN1Ykdlb21ldHJ5RXZlbnQ7XG5cdHByaXZhdGUgX3NlY29uZGFyeVVWc1VwZGF0ZWQ6U3ViR2VvbWV0cnlFdmVudDtcblxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBzY2FsZVUoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9zY2FsZVU7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgc2NhbGVWKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fc2NhbGVWO1xuXHR9XG5cblx0LyoqXG5cdCAqIE9mZmVycyB0aGUgb3B0aW9uIG9mIGVuYWJsaW5nIEdQVSBhY2NlbGVyYXRlZCBhbmltYXRpb24gb24gc2tlbGV0b25zIGxhcmdlciB0aGFuIDMyIGpvaW50c1xuXHQgKiBieSBjb25kZW5zaW5nIHRoZSBudW1iZXIgb2Ygam9pbnQgaW5kZXggdmFsdWVzIHJlcXVpcmVkIHBlciBtZXNoLiBPbmx5IGFwcGxpY2FibGUgdG9cblx0ICogc2tlbGV0b24gYW5pbWF0aW9ucyB0aGF0IHV0aWxpc2UgbW9yZSB0aGFuIG9uZSBtZXNoIG9iamVjdC4gRGVmYXVsdHMgdG8gZmFsc2UuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHVzZUNvbmRlbnNlZEluZGljZXMoKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fdXNlQ29uZGVuc2VkSW5kaWNlcztcblx0fVxuXG5cdHB1YmxpYyBzZXQgdXNlQ29uZGVuc2VkSW5kaWNlcyh2YWx1ZTpib29sZWFuKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3VzZUNvbmRlbnNlZEluZGljZXMgPT0gdmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl91c2VDb25kZW5zZWRJbmRpY2VzID0gdmFsdWU7XG5cdH1cblxuXHRwdWJsaWMgX3BVcGRhdGVTdHJpZGVPZmZzZXQoKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2NvbmNhdGVuYXRlQXJyYXlzKSB7XG5cdFx0XHR0aGlzLl9wT2Zmc2V0W0N1cnZlU3ViR2VvbWV0cnkuVkVSVEVYX0RBVEFdID0gMDtcblxuXHRcdFx0Ly9hbHdheXMgaGF2ZSBwb3NpdGlvbnNcblx0XHRcdHRoaXMuX3BPZmZzZXRbQ3VydmVTdWJHZW9tZXRyeS5QT1NJVElPTl9EQVRBXSA9IDA7XG5cdFx0XHR2YXIgc3RyaWRlOm51bWJlciA9IDM7XG5cblx0XHRcdGlmICh0aGlzLl9jdXJ2ZXMgIT0gbnVsbCkge1xuXHRcdFx0XHR0aGlzLl9wT2Zmc2V0W0N1cnZlU3ViR2VvbWV0cnkuQ1VSVkVfREFUQV0gPSBzdHJpZGU7XG5cdFx0XHRcdHN0cmlkZSArPSAyO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGhpcy5fdXZzICE9IG51bGwpIHtcblx0XHRcdFx0dGhpcy5fcE9mZnNldFtDdXJ2ZVN1Ykdlb21ldHJ5LlVWX0RBVEFdID0gc3RyaWRlO1xuXHRcdFx0XHRzdHJpZGUgKz0gMjtcblx0XHRcdH1cblxuXG5cblx0XHRcdHRoaXMuX3BTdHJpZGVbQ3VydmVTdWJHZW9tZXRyeS5WRVJURVhfREFUQV0gPSBzdHJpZGU7XG5cdFx0XHR0aGlzLl9wU3RyaWRlW0N1cnZlU3ViR2VvbWV0cnkuUE9TSVRJT05fREFUQV0gPSBzdHJpZGU7XG5cdFx0XHR0aGlzLl9wU3RyaWRlW0N1cnZlU3ViR2VvbWV0cnkuQ1VSVkVfREFUQV0gPSBzdHJpZGU7XG5cdFx0XHR0aGlzLl9wU3RyaWRlW0N1cnZlU3ViR2VvbWV0cnkuVVZfREFUQV0gPSBzdHJpZGU7XG5cblx0XHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fcE51bVZlcnRpY2VzKnN0cmlkZTtcblxuXHRcdFx0aWYgKHRoaXMuX3BWZXJ0aWNlcyA9PSBudWxsKVxuXHRcdFx0XHR0aGlzLl9wVmVydGljZXMgPSBuZXcgQXJyYXk8bnVtYmVyPihsZW4pO1xuXHRcdFx0ZWxzZSBpZiAodGhpcy5fcFZlcnRpY2VzLmxlbmd0aCAhPSBsZW4pXG5cdFx0XHRcdHRoaXMuX3BWZXJ0aWNlcy5sZW5ndGggPSBsZW47XG5cblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5fcE9mZnNldFtDdXJ2ZVN1Ykdlb21ldHJ5LlBPU0lUSU9OX0RBVEFdID0gMDtcblx0XHRcdHRoaXMuX3BPZmZzZXRbQ3VydmVTdWJHZW9tZXRyeS5DVVJWRV9EQVRBXSA9IDA7XG5cdFx0XHR0aGlzLl9wT2Zmc2V0W0N1cnZlU3ViR2VvbWV0cnkuVVZfREFUQV0gPSAwO1xuXG5cblx0XHRcdHRoaXMuX3BTdHJpZGVbQ3VydmVTdWJHZW9tZXRyeS5QT1NJVElPTl9EQVRBXSA9IDM7XG5cdFx0XHR0aGlzLl9wU3RyaWRlW0N1cnZlU3ViR2VvbWV0cnkuQ1VSVkVfREFUQV0gPSAyO1xuXHRcdFx0dGhpcy5fcFN0cmlkZVtDdXJ2ZVN1Ykdlb21ldHJ5LlVWX0RBVEFdID0gMjtcblx0XHR9XG5cblx0XHR0aGlzLl9wU3RyaWRlT2Zmc2V0RGlydHkgPSBmYWxzZTtcblx0fVxuXG5cblxuXHQvKipcblx0ICogRGVmaW5lcyB3aGV0aGVyIGEgVVYgYnVmZmVyIHNob3VsZCBiZSBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCB0byBjb250YWluIGR1bW15IFVWIGNvb3JkaW5hdGVzLlxuXHQgKiBTZXQgdG8gdHJ1ZSBpZiBhIGdlb21ldHJ5IGxhY2tzIFVWIGRhdGEgYnV0IHVzZXMgYSBtYXRlcmlhbCB0aGF0IHJlcXVpcmVzIGl0LCBvciBsZWF2ZSBhcyBmYWxzZVxuXHQgKiBpbiBjYXNlcyB3aGVyZSBVViBkYXRhIGlzIGV4cGxpY2l0bHkgZGVmaW5lZCBvciB0aGUgbWF0ZXJpYWwgZG9lcyBub3QgcmVxdWlyZSBVViBkYXRhLlxuXHQgKi9cblx0cHVibGljIGdldCBhdXRvRGVyaXZlVVZzKCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2F1dG9EZXJpdmVVVnM7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGF1dG9EZXJpdmVVVnModmFsdWU6Ym9vbGVhbilcblx0e1xuXHRcdGlmICh0aGlzLl9hdXRvRGVyaXZlVVZzID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fYXV0b0Rlcml2ZVVWcyA9IHZhbHVlO1xuXG5cdFx0aWYgKHZhbHVlKVxuXHRcdFx0dGhpcy5ub3RpZnlVVnNVcGRhdGUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUcnVlIGlmIHRoZSB2ZXJ0ZXggbm9ybWFscyBzaG91bGQgYmUgZGVyaXZlZCBmcm9tIHRoZSBnZW9tZXRyeSwgZmFsc2UgaWYgdGhlIHZlcnRleCBub3JtYWxzIGFyZSBzZXRcblx0ICogZXhwbGljaXRseS5cblx0ICovXG5cdHB1YmxpYyBnZXQgYXV0b0Rlcml2ZU5vcm1hbHMoKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fYXV0b0Rlcml2ZU5vcm1hbHM7XG5cdH1cblxuICAgIC8vcmVtb3ZlXG5cdHB1YmxpYyBzZXQgYXV0b0Rlcml2ZU5vcm1hbHModmFsdWU6Ym9vbGVhbilcblx0e1xuXHRcdGlmICh0aGlzLl9hdXRvRGVyaXZlTm9ybWFscyA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX2F1dG9EZXJpdmVOb3JtYWxzID0gdmFsdWU7XG5cblx0fVxuXG5cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgdmVydGljZXMoKTpBcnJheTxudW1iZXI+XG5cdHtcblx0XHRpZiAodGhpcy5fcG9zaXRpb25zRGlydHkpXG5cdFx0XHR0aGlzLnVwZGF0ZVBvc2l0aW9ucyh0aGlzLl9wb3NpdGlvbnMpO1xuXG4gICAgICAgIGlmICh0aGlzLl9jdXJ2ZXNEaXJ0eSlcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ3VydmVzKHRoaXMuX2N1cnZlcyk7XG5cblx0XHRpZiAodGhpcy5fdXZzRGlydHkpXG5cdFx0XHR0aGlzLnVwZGF0ZVVWcyh0aGlzLl91dnMpO1xuXG5cdFx0cmV0dXJuIHRoaXMuX3BWZXJ0aWNlcztcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBwb3NpdGlvbnMoKTpBcnJheTxudW1iZXI+XG5cdHtcblx0XHRpZiAodGhpcy5fcG9zaXRpb25zRGlydHkpXG5cdFx0XHR0aGlzLnVwZGF0ZVBvc2l0aW9ucyh0aGlzLl9wb3NpdGlvbnMpO1xuXG5cdFx0cmV0dXJuIHRoaXMuX3Bvc2l0aW9ucztcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBjdXJ2ZXMoKTpBcnJheTxudW1iZXI+XG5cdHtcblx0XHRpZiAodGhpcy5fY3VydmVzRGlydHkpXG5cdFx0XHR0aGlzLnVwZGF0ZUN1cnZlcyh0aGlzLl9jdXJ2ZXMpO1xuXG5cdFx0cmV0dXJuIHRoaXMuX2N1cnZlcztcblx0fVxuXG5cblxuXHQvKipcblx0ICogVGhlIHJhdyBkYXRhIG9mIHRoZSBmYWNlIG5vcm1hbHMsIGluIHRoZSBzYW1lIG9yZGVyIGFzIHRoZSBmYWNlcyBhcmUgbGlzdGVkIGluIHRoZSBpbmRleCBsaXN0LlxuXHQgKi9cblx0cHVibGljIGdldCBmYWNlTm9ybWFscygpOkFycmF5PG51bWJlcj5cblx0e1xuXHRcdGlmICh0aGlzLl9mYWNlTm9ybWFsc0RpcnR5KVxuXHRcdFx0dGhpcy51cGRhdGVGYWNlTm9ybWFscygpO1xuXG5cdFx0cmV0dXJuIHRoaXMuX2ZhY2VOb3JtYWxzO1xuXHR9XG5cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgdXZzKCk6QXJyYXk8bnVtYmVyPlxuXHR7XG5cdFx0aWYgKHRoaXMuX3V2c0RpcnR5KVxuXHRcdFx0dGhpcy51cGRhdGVVVnModGhpcy5fdXZzKTtcblxuXHRcdHJldHVybiB0aGlzLl91dnM7XG5cdH1cblxuXG5cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHdoZXRoZXIgb3Igbm90IHRvIHRha2UgdGhlIHNpemUgb2YgZmFjZXMgaW50byBhY2NvdW50IHdoZW4gYXV0by1kZXJpdmluZyB2ZXJ0ZXggbm9ybWFscyBhbmQgdGFuZ2VudHMuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHVzZUZhY2VXZWlnaHRzKCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3VzZUZhY2VXZWlnaHRzO1xuXHR9XG5cblx0cHVibGljIHNldCB1c2VGYWNlV2VpZ2h0cyh2YWx1ZTpib29sZWFuKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3VzZUZhY2VXZWlnaHRzID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fdXNlRmFjZVdlaWdodHMgPSB2YWx1ZTtcblxuXG5cdFx0dGhpcy5fZmFjZU5vcm1hbHNEaXJ0eSA9IHRydWU7XG5cdH1cblxuXG5cdHB1YmxpYyBnZXQgY29uZGVuc2VkSW5kZXhMb29rVXAoKTpBcnJheTxudW1iZXI+XG5cdHtcblxuXG5cdFx0cmV0dXJuIHRoaXMuX2NvbmRlbnNlZEluZGV4TG9va1VwO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRjb25zdHJ1Y3Rvcihjb25jYXRlbmF0ZWRBcnJheXM6Ym9vbGVhbilcblx0e1xuXHRcdHN1cGVyKGNvbmNhdGVuYXRlZEFycmF5cyk7XG5cblx0XHR0aGlzLl9wU3ViTWVzaENsYXNzID0gQ3VydmVTdWJNZXNoO1xuXHR9XG5cblx0cHVibGljIGdldEJvdW5kaW5nUG9zaXRpb25zKCk6QXJyYXk8bnVtYmVyPlxuXHR7XG5cdFx0aWYgKHRoaXMuX3Bvc2l0aW9uc0RpcnR5KVxuXHRcdFx0dGhpcy51cGRhdGVQb3NpdGlvbnModGhpcy5fcG9zaXRpb25zKTtcblxuXHRcdHJldHVybiB0aGlzLl9wb3NpdGlvbnM7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyB1cGRhdGVQb3NpdGlvbnModmFsdWVzOkFycmF5PG51bWJlcj4pXG5cdHtcblx0XHR2YXIgaTpudW1iZXI7XG5cdFx0dmFyIGluZGV4Om51bWJlcjtcblx0XHR2YXIgc3RyaWRlOm51bWJlcjtcblx0XHR2YXIgcG9zaXRpb25zOkFycmF5PG51bWJlcj47XG5cblx0XHR0aGlzLl9wb3NpdGlvbnMgPSB2YWx1ZXM7XG5cblx0XHRpZiAodGhpcy5fcG9zaXRpb25zID09IG51bGwpXG5cdFx0XHR0aGlzLl9wb3NpdGlvbnMgPSBuZXcgQXJyYXk8bnVtYmVyPigpO1xuXG5cdFx0dGhpcy5fcE51bVZlcnRpY2VzID0gdGhpcy5fcG9zaXRpb25zLmxlbmd0aC8zO1xuXG5cdFx0aWYgKHRoaXMuX2NvbmNhdGVuYXRlQXJyYXlzKSB7XG5cdFx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX3BOdW1WZXJ0aWNlcyp0aGlzLmdldFN0cmlkZShDdXJ2ZVN1Ykdlb21ldHJ5LlZFUlRFWF9EQVRBKTtcblxuXHRcdFx0aWYgKHRoaXMuX3BWZXJ0aWNlcyA9PSBudWxsKVxuXHRcdFx0XHR0aGlzLl9wVmVydGljZXMgPSBuZXcgQXJyYXk8bnVtYmVyPihsZW4pO1xuXHRcdFx0ZWxzZSBpZiAodGhpcy5fcFZlcnRpY2VzLmxlbmd0aCAhPSBsZW4pXG5cdFx0XHRcdHRoaXMuX3BWZXJ0aWNlcy5sZW5ndGggPSBsZW47XG5cblx0XHRcdGkgPSAwO1xuXHRcdFx0aW5kZXggPSB0aGlzLmdldE9mZnNldChDdXJ2ZVN1Ykdlb21ldHJ5LlBPU0lUSU9OX0RBVEEpO1xuXHRcdFx0c3RyaWRlID0gdGhpcy5nZXRTdHJpZGUoQ3VydmVTdWJHZW9tZXRyeS5QT1NJVElPTl9EQVRBKTtcblx0XHRcdHBvc2l0aW9ucyA9IHRoaXMuX3BWZXJ0aWNlcztcblxuXHRcdFx0d2hpbGUgKGkgPCB2YWx1ZXMubGVuZ3RoKSB7XG5cdFx0XHRcdHBvc2l0aW9uc1tpbmRleF0gPSB2YWx1ZXNbaSsrXTtcblx0XHRcdFx0cG9zaXRpb25zW2luZGV4ICsgMV0gPSB2YWx1ZXNbaSsrXTtcblx0XHRcdFx0cG9zaXRpb25zW2luZGV4ICsgMl0gPSB2YWx1ZXNbaSsrXTtcblx0XHRcdFx0aW5kZXggKz0gc3RyaWRlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXMucEludmFsaWRhdGVCb3VuZHMoKTtcblxuXHRcdHRoaXMubm90aWZ5UG9zaXRpb25zVXBkYXRlKCk7XG5cblx0XHR0aGlzLl9wb3NpdGlvbnNEaXJ0eSA9IGZhbHNlO1xuXHR9XG5cblx0LyoqXG5cdCAqIFVwZGF0ZXMgdGhlIHZlcnRleCBub3JtYWxzIGJhc2VkIG9uIHRoZSBnZW9tZXRyeS5cblx0ICovXG5cdHB1YmxpYyB1cGRhdGVDdXJ2ZXModmFsdWVzOkFycmF5PG51bWJlcj4pXG5cdHtcblx0XHR2YXIgaTpudW1iZXI7XG5cdFx0dmFyIGluZGV4Om51bWJlcjtcblx0XHR2YXIgb2Zmc2V0Om51bWJlcjtcblx0XHR2YXIgc3RyaWRlOm51bWJlcjtcblx0XHR2YXIgY3VydmVzOkFycmF5PG51bWJlcj47XG5cblx0XHRpZiAodHJ1ZSkge1xuXHRcdFx0aWYgKCh0aGlzLl9jdXJ2ZXMgPT0gbnVsbCB8fCB2YWx1ZXMgPT0gbnVsbCkgJiYgKHRoaXMuX2N1cnZlcyAhPSBudWxsIHx8IHZhbHVlcyAhPSBudWxsKSkge1xuXHRcdFx0XHRpZiAodGhpcy5fY29uY2F0ZW5hdGVBcnJheXMpXG5cdFx0XHRcdFx0dGhpcy5fcE5vdGlmeVZlcnRpY2VzVXBkYXRlKCk7XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHR0aGlzLl9wU3RyaWRlT2Zmc2V0RGlydHkgPSB0cnVlO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLl9jdXJ2ZXMgPSB2YWx1ZXM7XG5cblx0XHRcdGlmICh2YWx1ZXMgIT0gbnVsbCAmJiB0aGlzLl9jb25jYXRlbmF0ZUFycmF5cykge1xuXHRcdFx0XHRpID0gMDtcblx0XHRcdFx0aW5kZXggPSB0aGlzLmdldE9mZnNldChDdXJ2ZVN1Ykdlb21ldHJ5LkNVUlZFX0RBVEEpO1xuXHRcdFx0XHRzdHJpZGUgPSB0aGlzLmdldFN0cmlkZShDdXJ2ZVN1Ykdlb21ldHJ5LkNVUlZFX0RBVEEpO1xuICAgICAgICAgICAgICAgIGN1cnZlcyA9IHRoaXMuX3BWZXJ0aWNlcztcblxuXHRcdFx0XHR3aGlsZSAoaSA8IHZhbHVlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VydmVzW2luZGV4XSA9IHZhbHVlc1tpKytdO1xuICAgICAgICAgICAgICAgICAgICBjdXJ2ZXNbaW5kZXggKyAxXSA9IHZhbHVlc1tpKytdO1xuXHRcdFx0XHRcdGluZGV4ICs9IHN0cmlkZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLm5vdGlmeUN1cnZlc1VwZGF0ZSgpO1xuXG5cdFx0dGhpcy5fY3VydmVzRGlydHkgPSBmYWxzZTtcblx0fVxuXG5cblxuXHQvKipcblx0ICogVXBkYXRlcyB0aGUgdXZzIGJhc2VkIG9uIHRoZSBnZW9tZXRyeS5cblx0ICovXG5cdHB1YmxpYyB1cGRhdGVVVnModmFsdWVzOkFycmF5PG51bWJlcj4pXG5cdHtcblx0XHR2YXIgaTpudW1iZXI7XG5cdFx0dmFyIGluZGV4Om51bWJlcjtcblx0XHR2YXIgb2Zmc2V0Om51bWJlcjtcblx0XHR2YXIgc3RyaWRlOm51bWJlcjtcblx0XHR2YXIgdXZzOkFycmF5PG51bWJlcj47XG5cblx0XHRpZiAoIXRoaXMuX2F1dG9EZXJpdmVVVnMpIHtcblx0XHRcdGlmICgodGhpcy5fdXZzID09IG51bGwgfHwgdmFsdWVzID09IG51bGwpICYmICh0aGlzLl91dnMgIT0gbnVsbCB8fCB2YWx1ZXMgIT0gbnVsbCkpIHtcblx0XHRcdFx0aWYgKHRoaXMuX2NvbmNhdGVuYXRlQXJyYXlzKVxuXHRcdFx0XHRcdHRoaXMuX3BOb3RpZnlWZXJ0aWNlc1VwZGF0ZSgpO1xuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0dGhpcy5fcFN0cmlkZU9mZnNldERpcnR5ID0gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5fdXZzID0gdmFsdWVzO1xuXG5cdFx0XHRpZiAodmFsdWVzICE9IG51bGwgJiYgdGhpcy5fY29uY2F0ZW5hdGVBcnJheXMpIHtcblx0XHRcdFx0aSA9IDA7XG5cdFx0XHRcdGluZGV4ID0gdGhpcy5nZXRPZmZzZXQoQ3VydmVTdWJHZW9tZXRyeS5VVl9EQVRBKTtcblx0XHRcdFx0c3RyaWRlID0gdGhpcy5nZXRTdHJpZGUoQ3VydmVTdWJHZW9tZXRyeS5VVl9EQVRBKTtcblx0XHRcdFx0dXZzID0gdGhpcy5fcFZlcnRpY2VzO1xuXG5cdFx0XHRcdHdoaWxlIChpIDwgdmFsdWVzLmxlbmd0aCkge1xuXHRcdFx0XHRcdHV2c1tpbmRleF0gPSB2YWx1ZXNbaSsrXTtcblx0XHRcdFx0XHR1dnNbaW5kZXggKyAxXSA9IHZhbHVlc1tpKytdO1xuXHRcdFx0XHRcdGluZGV4ICs9IHN0cmlkZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmICh0aGlzLl91dnMgPT0gbnVsbCkge1xuXHRcdFx0XHR0aGlzLl91dnMgPSBuZXcgQXJyYXk8bnVtYmVyPih0aGlzLl9wb3NpdGlvbnMubGVuZ3RoKjIvMyk7XG5cblx0XHRcdFx0aWYgKHRoaXMuX2NvbmNhdGVuYXRlQXJyYXlzKVxuXHRcdFx0XHRcdHRoaXMuX3BOb3RpZnlWZXJ0aWNlc1VwZGF0ZSgpO1xuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0dGhpcy5fcFN0cmlkZU9mZnNldERpcnR5ID0gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0b2Zmc2V0ID0gdGhpcy5nZXRPZmZzZXQoQ3VydmVTdWJHZW9tZXRyeS5VVl9EQVRBKTtcblx0XHRcdHN0cmlkZSA9IHRoaXMuZ2V0U3RyaWRlKEN1cnZlU3ViR2VvbWV0cnkuVVZfREFUQSk7XG5cblx0XHRcdC8vYXV0b2Rlcml2ZWQgdXZzXG5cdFx0XHR1dnMgPSB0aGlzLl9jb25jYXRlbmF0ZUFycmF5cz8gdGhpcy5fcFZlcnRpY2VzIDogdGhpcy5fdXZzO1xuXG5cdFx0XHRpID0gMDtcblx0XHRcdGluZGV4ID0gb2Zmc2V0O1xuXHRcdFx0dmFyIHV2SWR4Om51bWJlciA9IDA7XG5cblx0XHRcdC8vY2xlYXIgdXYgdmFsdWVzXG5cdFx0XHR2YXIgbGVuVjpudW1iZXIgPSB1dnMubGVuZ3RoO1xuXHRcdFx0d2hpbGUgKGluZGV4IDwgbGVuVikge1xuXHRcdFx0XHRpZiAodGhpcy5fY29uY2F0ZW5hdGVBcnJheXMpIHtcblx0XHRcdFx0XHR0aGlzLl91dnNbaSsrXSA9IHV2c1tpbmRleF0gPSB1dklkeCouNTtcblx0XHRcdFx0XHR0aGlzLl91dnNbaSsrXSA9IHV2c1tpbmRleCArIDFdID0gMS4wIC0gKHV2SWR4ICYgMSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dXZzW2luZGV4XSA9IHV2SWR4Ki41O1xuXHRcdFx0XHRcdHV2c1tpbmRleCArIDFdID0gMS4wIC0gKHV2SWR4ICYgMSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoKyt1dklkeCA9PSAzKVxuXHRcdFx0XHRcdHV2SWR4ID0gMDtcblxuXHRcdFx0XHRpbmRleCArPSBzdHJpZGU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpcy5ub3RpZnlVVnNVcGRhdGUoKTtcblxuXHRcdHRoaXMuX3V2c0RpcnR5ID0gZmFsc2U7XG5cdH1cblxuXG5cblxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGRpc3Bvc2UoKVxuXHR7XG5cdFx0c3VwZXIuZGlzcG9zZSgpO1xuXG5cdFx0dGhpcy5fcG9zaXRpb25zID0gbnVsbDtcblx0XHR0aGlzLl9jdXJ2ZXMgPSBudWxsO1xuXHRcdHRoaXMuX3V2cyA9IG51bGw7XG5cblx0XHR0aGlzLl9mYWNlTm9ybWFscyA9IG51bGw7XG5cdFx0dGhpcy5fZmFjZVdlaWdodHMgPSBudWxsO1xuXHR9XG5cblx0LyoqXG5cdCAqIFVwZGF0ZXMgdGhlIGZhY2UgaW5kaWNlcyBvZiB0aGUgQ3VydmVTdWJHZW9tZXRyeS5cblx0ICpcblx0ICogQHBhcmFtIGluZGljZXMgVGhlIGZhY2UgaW5kaWNlcyB0byB1cGxvYWQuXG5cdCAqL1xuXHRwdWJsaWMgdXBkYXRlSW5kaWNlcyhpbmRpY2VzOkFycmF5PG51bWJlcj4pXG5cdHtcblx0XHRzdXBlci51cGRhdGVJbmRpY2VzKGluZGljZXMpO1xuXG5cdFx0dGhpcy5fZmFjZU5vcm1hbHNEaXJ0eSA9IHRydWU7XG5cblx0XHRpZiAodGhpcy5fYXV0b0Rlcml2ZU5vcm1hbHMpXG5cdFx0XHR0aGlzLl92ZXJ0ZXhOb3JtYWxzRGlydHkgPSB0cnVlO1xuXG5cdH1cblxuXHQvKipcblx0ICogQ2xvbmVzIHRoZSBjdXJyZW50IG9iamVjdFxuXHQgKiBAcmV0dXJuIEFuIGV4YWN0IGR1cGxpY2F0ZSBvZiB0aGUgY3VycmVudCBvYmplY3QuXG5cdCAqL1xuXHRwdWJsaWMgY2xvbmUoKTpDdXJ2ZVN1Ykdlb21ldHJ5XG5cdHtcblx0XHR2YXIgY2xvbmU6Q3VydmVTdWJHZW9tZXRyeSA9IG5ldyBDdXJ2ZVN1Ykdlb21ldHJ5KHRoaXMuX2NvbmNhdGVuYXRlQXJyYXlzKTtcblx0XHRjbG9uZS51cGRhdGVJbmRpY2VzKHRoaXMuX3BJbmRpY2VzLmNvbmNhdCgpKTtcblx0XHRjbG9uZS51cGRhdGVQb3NpdGlvbnModGhpcy5fcG9zaXRpb25zLmNvbmNhdCgpKTtcblxuXHRcdGlmICh0aGlzLl9jdXJ2ZXMpXG5cdFx0XHRjbG9uZS51cGRhdGVDdXJ2ZXModGhpcy5fY3VydmVzLmNvbmNhdCgpKTtcblx0XHRlbHNlXG5cdFx0XHRjbG9uZS51cGRhdGVDdXJ2ZXMobnVsbCk7XG5cblx0XHRpZiAodGhpcy5fdXZzICYmICF0aGlzLl9hdXRvRGVyaXZlVVZzKVxuXHRcdFx0Y2xvbmUudXBkYXRlVVZzKHRoaXMuX3V2cy5jb25jYXQoKSk7XG5cdFx0ZWxzZVxuXHRcdFx0Y2xvbmUudXBkYXRlVVZzKG51bGwpO1xuXG5cdFx0cmV0dXJuIGNsb25lO1xuXHR9XG5cblx0cHVibGljIHNjYWxlVVYoc2NhbGVVOm51bWJlciA9IDEsIHNjYWxlVjpudW1iZXIgPSAxKVxuXHR7XG5cdFx0dmFyIGluZGV4Om51bWJlcjtcblx0XHR2YXIgb2Zmc2V0Om51bWJlcjtcblx0XHR2YXIgc3RyaWRlOm51bWJlcjtcblx0XHR2YXIgdXZzOkFycmF5PG51bWJlcj47XG5cblx0XHR1dnMgPSB0aGlzLl91dnM7XG5cblx0XHR2YXIgcmF0aW9VOm51bWJlciA9IHNjYWxlVS90aGlzLl9zY2FsZVU7XG5cdFx0dmFyIHJhdGlvVjpudW1iZXIgPSBzY2FsZVYvdGhpcy5fc2NhbGVWO1xuXG5cdFx0dGhpcy5fc2NhbGVVID0gc2NhbGVVO1xuXHRcdHRoaXMuX3NjYWxlViA9IHNjYWxlVjtcblxuXHRcdHZhciBsZW46bnVtYmVyID0gdXZzLmxlbmd0aDtcblxuXHRcdG9mZnNldCA9IDA7XG5cdFx0c3RyaWRlID0gMjtcblxuXHRcdGluZGV4ID0gb2Zmc2V0O1xuXG5cdFx0d2hpbGUgKGluZGV4IDwgbGVuKSB7XG5cdFx0XHR1dnNbaW5kZXhdICo9IHJhdGlvVTtcblx0XHRcdHV2c1tpbmRleCArIDFdICo9IHJhdGlvVjtcblx0XHRcdGluZGV4ICs9IHN0cmlkZTtcblx0XHR9XG5cblx0XHR0aGlzLm5vdGlmeVVWc1VwZGF0ZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNjYWxlcyB0aGUgZ2VvbWV0cnkuXG5cdCAqIEBwYXJhbSBzY2FsZSBUaGUgYW1vdW50IGJ5IHdoaWNoIHRvIHNjYWxlLlxuXHQgKi9cblx0cHVibGljIHNjYWxlKHNjYWxlOm51bWJlcilcblx0e1xuXHRcdHZhciBpOm51bWJlcjtcblx0XHR2YXIgaW5kZXg6bnVtYmVyO1xuXHRcdHZhciBvZmZzZXQ6bnVtYmVyO1xuXHRcdHZhciBzdHJpZGU6bnVtYmVyO1xuXHRcdHZhciBwb3NpdGlvbnM6QXJyYXk8bnVtYmVyPjtcblxuXHRcdHBvc2l0aW9ucyA9IHRoaXMuX3Bvc2l0aW9ucztcblxuXHRcdHZhciBsZW46bnVtYmVyID0gcG9zaXRpb25zLmxlbmd0aDtcblxuXHRcdG9mZnNldCA9IDA7XG5cdFx0c3RyaWRlID0gMztcblxuXHRcdGkgPSAwO1xuXHRcdGluZGV4ID0gb2Zmc2V0O1xuXHRcdHdoaWxlIChpIDwgbGVuKSB7XG5cdFx0XHRwb3NpdGlvbnNbaW5kZXhdICo9IHNjYWxlO1xuXHRcdFx0cG9zaXRpb25zW2luZGV4ICsgMV0gKj0gc2NhbGU7XG5cdFx0XHRwb3NpdGlvbnNbaW5kZXggKyAyXSAqPSBzY2FsZTtcblxuXHRcdFx0aSArPSAzO1xuXHRcdFx0aW5kZXggKz0gc3RyaWRlO1xuXHRcdH1cblxuXHRcdHRoaXMubm90aWZ5UG9zaXRpb25zVXBkYXRlKCk7XG5cdH1cblxuXHRwdWJsaWMgYXBwbHlUcmFuc2Zvcm1hdGlvbih0cmFuc2Zvcm06TWF0cml4M0QpXG5cdHtcblx0XHR2YXIgcG9zaXRpb25zOkFycmF5PG51bWJlcj47XG5cblx0XHRpZiAodGhpcy5fY29uY2F0ZW5hdGVBcnJheXMpIHtcblx0XHRcdHBvc2l0aW9ucyA9IHRoaXMuX3BWZXJ0aWNlcztcblx0XHR9IGVsc2Uge1xuXHRcdFx0cG9zaXRpb25zID0gdGhpcy5fcG9zaXRpb25zO1xuXHRcdH1cblxuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fcG9zaXRpb25zLmxlbmd0aC8zO1xuXHRcdHZhciBpOm51bWJlcjtcblx0XHR2YXIgaTE6bnVtYmVyO1xuXHRcdHZhciBpMjpudW1iZXI7XG5cdFx0dmFyIHZlY3RvcjpWZWN0b3IzRCA9IG5ldyBWZWN0b3IzRCgpO1xuXG5cdFx0dmFyIGludlRyYW5zcG9zZTpNYXRyaXgzRDtcblxuXG5cblx0XHR2YXIgdmkwOm51bWJlciA9IHRoaXMuZ2V0T2Zmc2V0KEN1cnZlU3ViR2VvbWV0cnkuUE9TSVRJT05fREFUQSk7XG5cdFx0dmFyIHZTdHJpZGU6bnVtYmVyID0gdGhpcy5nZXRTdHJpZGUoQ3VydmVTdWJHZW9tZXRyeS5QT1NJVElPTl9EQVRBKTtcblxuXHRcdGZvciAoaSA9IDA7IGkgPCBsZW47ICsraSkge1xuXHRcdFx0aTEgPSB2aTAgKyAxO1xuXHRcdFx0aTIgPSB2aTAgKyAyO1xuXG5cdFx0XHQvLyBiYWtlIHBvc2l0aW9uXG5cdFx0XHR2ZWN0b3IueCA9IHBvc2l0aW9uc1t2aTBdO1xuXHRcdFx0dmVjdG9yLnkgPSBwb3NpdGlvbnNbaTFdO1xuXHRcdFx0dmVjdG9yLnogPSBwb3NpdGlvbnNbaTJdO1xuXHRcdFx0dmVjdG9yID0gdHJhbnNmb3JtLnRyYW5zZm9ybVZlY3Rvcih2ZWN0b3IpO1xuXHRcdFx0cG9zaXRpb25zW3ZpMF0gPSB2ZWN0b3IueDtcblx0XHRcdHBvc2l0aW9uc1tpMV0gPSB2ZWN0b3IueTtcblx0XHRcdHBvc2l0aW9uc1tpMl0gPSB2ZWN0b3Iuejtcblx0XHRcdHZpMCArPSB2U3RyaWRlO1xuXG5cdFx0fVxuXG5cdFx0dGhpcy5ub3RpZnlQb3NpdGlvbnNVcGRhdGUoKTtcblx0fVxuXG5cblxuXHQvKipcblx0ICogVXBkYXRlcyB0aGUgbm9ybWFscyBmb3IgZWFjaCBmYWNlLlxuXHQgKi9cblx0cHJpdmF0ZSB1cGRhdGVGYWNlTm9ybWFscygpXG5cdHtcblx0XHR2YXIgaTpudW1iZXIgPSAwO1xuXHRcdHZhciBqOm51bWJlciA9IDA7XG5cdFx0dmFyIGs6bnVtYmVyID0gMDtcblx0XHR2YXIgaW5kZXg6bnVtYmVyO1xuXHRcdHZhciBvZmZzZXQ6bnVtYmVyO1xuXHRcdHZhciBzdHJpZGU6bnVtYmVyO1xuXG5cdFx0dmFyIHgxOm51bWJlciwgeDI6bnVtYmVyLCB4MzpudW1iZXI7XG5cdFx0dmFyIHkxOm51bWJlciwgeTI6bnVtYmVyLCB5MzpudW1iZXI7XG5cdFx0dmFyIHoxOm51bWJlciwgejI6bnVtYmVyLCB6MzpudW1iZXI7XG5cdFx0dmFyIGR4MTpudW1iZXIsIGR5MTpudW1iZXIsIGR6MTpudW1iZXI7XG5cdFx0dmFyIGR4MjpudW1iZXIsIGR5MjpudW1iZXIsIGR6MjpudW1iZXI7XG5cdFx0dmFyIGN4Om51bWJlciwgY3k6bnVtYmVyLCBjejpudW1iZXI7XG5cdFx0dmFyIGQ6bnVtYmVyO1xuXG5cdFx0dmFyIHBvc2l0aW9uczpBcnJheTxudW1iZXI+ID0gdGhpcy5fcG9zaXRpb25zO1xuXG5cdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9wSW5kaWNlcy5sZW5ndGg7XG5cblx0XHRpZiAodGhpcy5fZmFjZU5vcm1hbHMgPT0gbnVsbClcblx0XHRcdHRoaXMuX2ZhY2VOb3JtYWxzID0gbmV3IEFycmF5PG51bWJlcj4obGVuKTtcblxuXHRcdGlmICh0aGlzLl91c2VGYWNlV2VpZ2h0cyAmJiB0aGlzLl9mYWNlV2VpZ2h0cyA9PSBudWxsKVxuXHRcdFx0dGhpcy5fZmFjZVdlaWdodHMgPSBuZXcgQXJyYXk8bnVtYmVyPihsZW4vMyk7XG5cblx0XHR3aGlsZSAoaSA8IGxlbikge1xuXHRcdFx0aW5kZXggPSB0aGlzLl9wSW5kaWNlc1tpKytdKjM7XG5cdFx0XHR4MSA9IHBvc2l0aW9uc1tpbmRleF07XG5cdFx0XHR5MSA9IHBvc2l0aW9uc1tpbmRleCArIDFdO1xuXHRcdFx0ejEgPSBwb3NpdGlvbnNbaW5kZXggKyAyXTtcblx0XHRcdGluZGV4ID0gdGhpcy5fcEluZGljZXNbaSsrXSozO1xuXHRcdFx0eDIgPSBwb3NpdGlvbnNbaW5kZXhdO1xuXHRcdFx0eTIgPSBwb3NpdGlvbnNbaW5kZXggKyAxXTtcblx0XHRcdHoyID0gcG9zaXRpb25zW2luZGV4ICsgMl07XG5cdFx0XHRpbmRleCA9IHRoaXMuX3BJbmRpY2VzW2krK10qMztcblx0XHRcdHgzID0gcG9zaXRpb25zW2luZGV4XTtcblx0XHRcdHkzID0gcG9zaXRpb25zW2luZGV4ICsgMV07XG5cdFx0XHR6MyA9IHBvc2l0aW9uc1tpbmRleCArIDJdO1xuXHRcdFx0ZHgxID0geDMgLSB4MTtcblx0XHRcdGR5MSA9IHkzIC0geTE7XG5cdFx0XHRkejEgPSB6MyAtIHoxO1xuXHRcdFx0ZHgyID0geDIgLSB4MTtcblx0XHRcdGR5MiA9IHkyIC0geTE7XG5cdFx0XHRkejIgPSB6MiAtIHoxO1xuXHRcdFx0Y3ggPSBkejEqZHkyIC0gZHkxKmR6Mjtcblx0XHRcdGN5ID0gZHgxKmR6MiAtIGR6MSpkeDI7XG5cdFx0XHRjeiA9IGR5MSpkeDIgLSBkeDEqZHkyO1xuXHRcdFx0ZCA9IE1hdGguc3FydChjeCpjeCArIGN5KmN5ICsgY3oqY3opO1xuXHRcdFx0Ly8gbGVuZ3RoIG9mIGNyb3NzIHByb2R1Y3QgPSAyKnRyaWFuZ2xlIGFyZWFcblxuXHRcdFx0aWYgKHRoaXMuX3VzZUZhY2VXZWlnaHRzKSB7XG5cdFx0XHRcdHZhciB3Om51bWJlciA9IGQqMTAwMDA7XG5cblx0XHRcdFx0aWYgKHcgPCAxKVxuXHRcdFx0XHRcdHcgPSAxO1xuXG5cdFx0XHRcdHRoaXMuX2ZhY2VXZWlnaHRzW2srK10gPSB3O1xuXHRcdFx0fVxuXG5cdFx0XHRkID0gMS9kO1xuXG5cdFx0XHR0aGlzLl9mYWNlTm9ybWFsc1tqKytdID0gY3gqZDtcblx0XHRcdHRoaXMuX2ZhY2VOb3JtYWxzW2orK10gPSBjeSpkO1xuXHRcdFx0dGhpcy5fZmFjZU5vcm1hbHNbaisrXSA9IGN6KmQ7XG5cdFx0fVxuXG5cdFx0dGhpcy5fZmFjZU5vcm1hbHNEaXJ0eSA9IGZhbHNlO1xuXHR9XG5cblx0cHVibGljIF9wTm90aWZ5VmVydGljZXNVcGRhdGUoKVxuXHR7XG5cdFx0dGhpcy5fcFN0cmlkZU9mZnNldERpcnR5ID0gdHJ1ZTtcblxuXHRcdHRoaXMubm90aWZ5UG9zaXRpb25zVXBkYXRlKCk7XG5cdFx0dGhpcy5ub3RpZnlDdXJ2ZXNVcGRhdGUoKTtcblx0XHR0aGlzLm5vdGlmeVVWc1VwZGF0ZSgpO1xuXHR9XG5cblx0cHJpdmF0ZSBub3RpZnlQb3NpdGlvbnNVcGRhdGUoKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3Bvc2l0aW9uc0RpcnR5KVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fcG9zaXRpb25zRGlydHkgPSB0cnVlO1xuXG5cdFx0aWYgKCF0aGlzLl9wb3NpdGlvbnNVcGRhdGVkKVxuXHRcdFx0dGhpcy5fcG9zaXRpb25zVXBkYXRlZCA9IG5ldyBTdWJHZW9tZXRyeUV2ZW50KFN1Ykdlb21ldHJ5RXZlbnQuVkVSVElDRVNfVVBEQVRFRCwgQ3VydmVTdWJHZW9tZXRyeS5QT1NJVElPTl9EQVRBKTtcblxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudCh0aGlzLl9wb3NpdGlvbnNVcGRhdGVkKTtcblx0fVxuXG5cdHByaXZhdGUgbm90aWZ5Q3VydmVzVXBkYXRlKClcblx0e1xuXHRcdGlmICh0aGlzLl9jdXJ2ZXNEaXJ0eSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX2N1cnZlc0RpcnR5ID0gdHJ1ZTtcblxuXHRcdGlmICghdGhpcy5fY3VydmVzVXBkYXRlZClcblx0XHRcdHRoaXMuX2N1cnZlc1VwZGF0ZWQgPSBuZXcgU3ViR2VvbWV0cnlFdmVudChTdWJHZW9tZXRyeUV2ZW50LlZFUlRJQ0VTX1VQREFURUQsIEN1cnZlU3ViR2VvbWV0cnkuQ1VSVkVfREFUQSk7XG5cblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQodGhpcy5fY3VydmVzVXBkYXRlZCk7XG5cdH1cblxuXG5cblx0cHJpdmF0ZSBub3RpZnlVVnNVcGRhdGUoKSB7XG4gICAgICAgIGlmICh0aGlzLl91dnNEaXJ0eSlcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB0aGlzLl91dnNEaXJ0eSA9IHRydWU7XG5cbiAgICAgICAgaWYgKCF0aGlzLl91dnNVcGRhdGVkKVxuICAgICAgICAgICAgdGhpcy5fdXZzVXBkYXRlZCA9IG5ldyBTdWJHZW9tZXRyeUV2ZW50KFN1Ykdlb21ldHJ5RXZlbnQuVkVSVElDRVNfVVBEQVRFRCwgQ3VydmVTdWJHZW9tZXRyeS5VVl9EQVRBKTtcblxuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQodGhpcy5fdXZzVXBkYXRlZCk7XG4gICAgfVxufVxuXG5leHBvcnQgPSBDdXJ2ZVN1Ykdlb21ldHJ5OyJdfQ==