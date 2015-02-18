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
        this._faceTangentsDirty = true;
        this._vertexNormalsDirty = true;
        this._vertexTangentsDirty = true;
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
            return false; //this._autoDeriveUVs;
        },
        set: function (value) {
            //if (this._autoDeriveUVs == value)
            return;
            //this._autoDeriveUVs = value;
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
                    true; //"do nothing";
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
        this._faceTangents = null;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0N1cnZlU3ViR2VvbWV0cnkudHMiXSwibmFtZXMiOlsiQ3VydmVTdWJHZW9tZXRyeSIsIkN1cnZlU3ViR2VvbWV0cnkuY29uc3RydWN0b3IiLCJDdXJ2ZVN1Ykdlb21ldHJ5LnNjYWxlVSIsIkN1cnZlU3ViR2VvbWV0cnkuc2NhbGVWIiwiQ3VydmVTdWJHZW9tZXRyeS51c2VDb25kZW5zZWRJbmRpY2VzIiwiQ3VydmVTdWJHZW9tZXRyeS5fcFVwZGF0ZVN0cmlkZU9mZnNldCIsIkN1cnZlU3ViR2VvbWV0cnkuYXV0b0Rlcml2ZVVWcyIsIkN1cnZlU3ViR2VvbWV0cnkuYXV0b0Rlcml2ZU5vcm1hbHMiLCJDdXJ2ZVN1Ykdlb21ldHJ5LnZlcnRpY2VzIiwiQ3VydmVTdWJHZW9tZXRyeS5wb3NpdGlvbnMiLCJDdXJ2ZVN1Ykdlb21ldHJ5LmN1cnZlcyIsIkN1cnZlU3ViR2VvbWV0cnkuZmFjZU5vcm1hbHMiLCJDdXJ2ZVN1Ykdlb21ldHJ5LnV2cyIsIkN1cnZlU3ViR2VvbWV0cnkudXNlRmFjZVdlaWdodHMiLCJDdXJ2ZVN1Ykdlb21ldHJ5LmNvbmRlbnNlZEluZGV4TG9va1VwIiwiQ3VydmVTdWJHZW9tZXRyeS5nZXRCb3VuZGluZ1Bvc2l0aW9ucyIsIkN1cnZlU3ViR2VvbWV0cnkudXBkYXRlUG9zaXRpb25zIiwiQ3VydmVTdWJHZW9tZXRyeS51cGRhdGVDdXJ2ZXMiLCJDdXJ2ZVN1Ykdlb21ldHJ5LnVwZGF0ZVVWcyIsIkN1cnZlU3ViR2VvbWV0cnkuZGlzcG9zZSIsIkN1cnZlU3ViR2VvbWV0cnkudXBkYXRlSW5kaWNlcyIsIkN1cnZlU3ViR2VvbWV0cnkuY2xvbmUiLCJDdXJ2ZVN1Ykdlb21ldHJ5LnNjYWxlVVYiLCJDdXJ2ZVN1Ykdlb21ldHJ5LnNjYWxlIiwiQ3VydmVTdWJHZW9tZXRyeS5hcHBseVRyYW5zZm9ybWF0aW9uIiwiQ3VydmVTdWJHZW9tZXRyeS51cGRhdGVGYWNlTm9ybWFscyIsIkN1cnZlU3ViR2VvbWV0cnkuX3BOb3RpZnlWZXJ0aWNlc1VwZGF0ZSIsIkN1cnZlU3ViR2VvbWV0cnkubm90aWZ5UG9zaXRpb25zVXBkYXRlIiwiQ3VydmVTdWJHZW9tZXRyeS5ub3RpZnlDdXJ2ZXNVcGRhdGUiLCJDdXJ2ZVN1Ykdlb21ldHJ5Lm5vdGlmeVVWc1VwZGF0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsSUFBTyxRQUFRLFdBQWUsK0JBQStCLENBQUMsQ0FBQztBQUUvRCxJQUFPLGVBQWUsV0FBYSx5Q0FBeUMsQ0FBQyxDQUFDO0FBQzlFLElBQU8sWUFBWSxXQUFpQixzQ0FBc0MsQ0FBQyxDQUFDO0FBQzVFLElBQU8sZ0JBQWdCLFdBQWEsNENBQTRDLENBQUMsQ0FBQztBQUVsRixBQUdBOztHQURHO0lBQ0csZ0JBQWdCO0lBQVNBLFVBQXpCQSxnQkFBZ0JBLFVBQXdCQTtJQThRN0NBOztPQUVHQTtJQUNIQSxTQWpSS0EsZ0JBQWdCQSxDQWlSVEEsa0JBQTBCQTtRQUVyQ0Msa0JBQU1BLGtCQUFrQkEsQ0FBQ0EsQ0FBQ0E7UUF4UW5CQSxvQkFBZUEsR0FBV0EsSUFBSUEsQ0FBQ0E7UUFDL0JBLGlCQUFZQSxHQUFXQSxJQUFJQSxDQUFDQTtRQUM1QkEsc0JBQWlCQSxHQUFXQSxJQUFJQSxDQUFDQTtRQUNqQ0EsdUJBQWtCQSxHQUFXQSxJQUFJQSxDQUFDQTtRQUNsQ0Esd0JBQW1CQSxHQUFXQSxJQUFJQSxDQUFDQTtRQUNuQ0EseUJBQW9CQSxHQUFXQSxJQUFJQSxDQUFDQTtRQUNwQ0EsY0FBU0EsR0FBV0EsSUFBSUEsQ0FBQ0E7UUFDekJBLHVCQUFrQkEsR0FBV0EsSUFBSUEsQ0FBQ0E7UUFDbENBLHVCQUFrQkEsR0FBV0EsSUFBSUEsQ0FBQ0E7UUFDbENBLHVCQUFrQkEsR0FBV0EsSUFBSUEsQ0FBQ0E7UUFZbENBLHVCQUFrQkEsR0FBV0EsSUFBSUEsQ0FBQ0E7UUFDbENBLHVCQUFrQkEsR0FBV0EsS0FBS0EsQ0FBQ0E7UUFDbkNBLG9CQUFlQSxHQUFXQSxLQUFLQSxDQUFDQTtRQUM3QkEsbUJBQWNBLEdBQVdBLEtBQUtBLENBQUNBO1FBTWxDQSxZQUFPQSxHQUFVQSxDQUFDQSxDQUFDQTtRQUNuQkEsWUFBT0EsR0FBVUEsQ0FBQ0EsQ0FBQ0E7UUEyTzFCQSxJQUFJQSxDQUFDQSxjQUFjQSxHQUFHQSxZQUFZQSxDQUFDQTtJQUNwQ0EsQ0FBQ0E7SUFoT0RELHNCQUFXQSxvQ0FBTUE7UUFIakJBOztXQUVHQTthQUNIQTtZQUVDRSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQTtRQUNyQkEsQ0FBQ0E7OztPQUFBRjtJQUtEQSxzQkFBV0Esb0NBQU1BO1FBSGpCQTs7V0FFR0E7YUFDSEE7WUFFQ0csTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7UUFDckJBLENBQUNBOzs7T0FBQUg7SUFPREEsc0JBQVdBLGlEQUFtQkE7UUFMOUJBOzs7O1dBSUdBO2FBQ0hBO1lBRUNJLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLG9CQUFvQkEsQ0FBQ0E7UUFDbENBLENBQUNBO2FBRURKLFVBQStCQSxLQUFhQTtZQUUzQ0ksRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0Esb0JBQW9CQSxJQUFJQSxLQUFLQSxDQUFDQTtnQkFDdENBLE1BQU1BLENBQUNBO1lBRVJBLElBQUlBLENBQUNBLG9CQUFvQkEsR0FBR0EsS0FBS0EsQ0FBQ0E7UUFDbkNBLENBQUNBOzs7T0FSQUo7SUFVTUEsK0NBQW9CQSxHQUEzQkE7UUFFQ0ssRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUM3QkEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxXQUFXQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUVoREEsQUFDQUEsdUJBRHVCQTtZQUN2QkEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxhQUFhQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUNsREEsSUFBSUEsTUFBTUEsR0FBVUEsQ0FBQ0EsQ0FBQ0E7WUFFdEJBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLElBQUlBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO2dCQUMxQkEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxVQUFVQSxDQUFDQSxHQUFHQSxNQUFNQSxDQUFDQTtnQkFDcERBLE1BQU1BLElBQUlBLENBQUNBLENBQUNBO1lBQ2JBLENBQUNBO1lBRURBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLElBQUlBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO2dCQUN2QkEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxPQUFPQSxDQUFDQSxHQUFHQSxNQUFNQSxDQUFDQTtnQkFDakRBLE1BQU1BLElBQUlBLENBQUNBLENBQUNBO1lBQ2JBLENBQUNBO1lBSURBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsR0FBR0EsTUFBTUEsQ0FBQ0E7WUFDckRBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsR0FBR0EsTUFBTUEsQ0FBQ0E7WUFDdkRBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsR0FBR0EsTUFBTUEsQ0FBQ0E7WUFDcERBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsR0FBR0EsTUFBTUEsQ0FBQ0E7WUFFakRBLElBQUlBLEdBQUdBLEdBQVVBLElBQUlBLENBQUNBLGFBQWFBLEdBQUNBLE1BQU1BLENBQUNBO1lBRTNDQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxJQUFJQSxJQUFJQSxDQUFDQTtnQkFDM0JBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLElBQUlBLEtBQUtBLENBQVNBLEdBQUdBLENBQUNBLENBQUNBO1lBQzFDQSxJQUFJQSxDQUFDQSxFQUFF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QSxnQkFBZ0JBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBO1lBRWpGQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxJQUFJQSxJQUFJQSxDQUFDQTtnQkFDM0JBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLElBQUlBLEtBQUtBLENBQVNBLEdBQUdBLENBQUNBLENBQUNBO1lBQzFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxNQUFNQSxJQUFJQSxHQUFHQSxDQUFDQTtnQkFDdENBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLE1BQU1BLEdBQUdBLEdBQUdBLENBQUNBO1lBRTlCQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUNOQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxnQkFBZ0JBLENBQUNBLGFBQWFBLENBQUNBLENBQUNBO1lBQ3ZEQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxnQkFBZ0JBLENBQUNBLGFBQWFBLENBQUNBLENBQUNBO1lBQ3hEQSxTQUFTQSxHQUFHQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQTtZQUU1QkEsT0FBT0EsQ0FBQ0EsR0FBR0EsTUFBTUEsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0E7Z0JBQzFCQSxTQUFTQSxDQUFDQSxLQUFLQSxDQUFDQSxHQUFHQSxNQUFNQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTtnQkFDL0JBLFNBQVNBLENBQUNBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLE1BQU1BLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBO2dCQUNuQ0EsU0FBU0EsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ25DQSxLQUFLQSxJQUFJQSxNQUFNQSxDQUFDQTtZQUNqQkEsQ0FBQ0E7UUFDRkEsQ0FBQ0E7UUFFREEsSUFBSUEsQ0FB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QSxFQUFTQSxDQUFDQTtRQUNwQ0EsSUFBSUEsQ0FBUUEsQ0FBQ0E7UUFFYkEsSUFBSUEsU0FBU0EsR0FBaUJBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBO1FBRTlDQSxJQUFJQSxHQUFHQSxHQUFVQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxNQUFNQSxDQUFDQTtRQUV2Q0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsSUFBSUEsSUFBSUEsQ0FBQ0E7WUFDN0JBLElBQUlBLENBQUNBLFlBQVlBLEdBQUdBLElBQUlBLEtBQUtBLENBQVNBLEdBQUdBLENBQUNBLENBQUNBO1FBRTVDQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxlQUFlQSxJQUFJQSxJQUFJQSxDQUFDQSxZQUFZQSxJQUFJQSxJQUFJQSxDQUFDQTtZQUNyREEsSUFBSUEsQ0FBQ0EsWUFBWUEsR0FBR0EsSUFBSUEsS0FBS0EsQ0FBU0EsR0FBR0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFFOUNBLE9BQU9BLENBQUNBLEdBQUdBLEdBQUdBLEVBQUVBLENBQUNBO1lBQ2hCQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQTtZQUM5QkEsRUFBRUEsR0FBR0EsU0FBU0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7WUFDdEJBLEVBQUVBLEdBQUdBLFNBQVNBLENBQUNBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO1lBQzFCQSxFQUFFQSxHQUFHQSxTQUFTQSxDQUFDQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUMxQkEsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDOUJBLEVBQUVBLEdBQUdBLFNBQVNBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO1lBQ3RCQSxFQUFFQSxHQUFHQSxTQUFTQSxDQUFDQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUMxQkEsRUFBRUEsR0FBR0EsU0FBU0EsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDMUJBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBO1lBQzlCQSxFQUFFQSxHQUFHQSxTQUFTQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtZQUN0QkEsRUFBRUEsR0FBR0EsU0FBU0EsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDMUJBLEVBQUVBLEdBQUdBLFNBQVNBLENBQUNBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO1lBQzFCQSxHQUFHQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxDQUFDQTtZQUNkQSxHQUFHQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxDQUFDQTtZQUNkQSxHQUFHQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxDQUFDQTtZQUNkQSxHQUFHQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxDQUFDQTtZQUNkQSxHQUFHQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxDQUFDQTtZQUNkQSxHQUFHQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxDQUFDQTtZQUNkQSxFQUFFQSxHQUFHQSxHQUFHQSxHQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFDQSxHQUFHQSxDQUFDQTtZQUN2QkEsRUFBRUEsR0FBR0EsR0FBR0EsR0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBQ0EsR0FBR0EsQ0FBQ0E7WUFDdkJBLEVBQUVBLEdBQUdBLEdBQUdBLEdBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUNBLEdBQUdBLENBQUNBO1lBQ3ZCQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxHQUFDQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFDQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFDQSxFQUFFQSxDQUFD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QVdBLEdBQUdBLElBQUlBLGdCQUFnQkEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxnQkFBZ0JBLEVBQUVBLGdCQUFnQkEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7UUFFekdBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBO0lBQ3pDQSxDQUFDQTtJQWx1QlU3Qiw4QkFBYUEsR0FBVUEsV0FBV0EsQ0FBQ0E7SUFDaENBLDJCQUFVQSxHQUFVQSxRQUFRQSxDQUFDQTtJQUNoQ0Esd0JBQU9BLEdBQVVBLEtBQUtBLENBQUNBO0lBRXJDQSw4QkFBOEJBO0lBQ2hCQSxnQ0FBZUEsR0FBVUEsUUFBUUEsQ0FBQ0E7SUFDbENBLDZCQUFZQSxHQUFVQSxRQUFRQSxDQUFDQTtJQUMvQkEsMEJBQVNBLEdBQVVBLFFBQVFBLENBQUNBO0lBNHRCM0NBLHVCQUFDQTtBQUFEQSxDQXJ1QkEsQUFxdUJDQSxFQXJ1QjhCLGVBQWUsRUFxdUI3QztBQUVELEFBQTBCLGlCQUFqQixnQkFBZ0IsQ0FBQyIsImZpbGUiOiJiYXNlL0N1cnZlU3ViR2VvbWV0cnkuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1hdHJpeDNEXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL01hdHJpeDNEXCIpO1xyXG5pbXBvcnQgVmVjdG9yM0RcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vVmVjdG9yM0RcIik7XHJcblxyXG5pbXBvcnQgU3ViR2VvbWV0cnlCYXNlXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvU3ViR2VvbWV0cnlCYXNlXCIpO1xyXG5pbXBvcnQgQ3VydmVTdWJNZXNoXHRcdCAgICBcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0N1cnZlU3ViTWVzaFwiKTtcclxuaW1wb3J0IFN1Ykdlb21ldHJ5RXZlbnRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZXZlbnRzL1N1Ykdlb21ldHJ5RXZlbnRcIik7XHJcblxyXG4vKipcclxuICogQGNsYXNzIGF3YXkuYmFzZS5DdXJ2ZVN1Ykdlb21ldHJ5XHJcbiAqL1xyXG5jbGFzcyBDdXJ2ZVN1Ykdlb21ldHJ5IGV4dGVuZHMgU3ViR2VvbWV0cnlCYXNlXHJcbntcclxuXHRwdWJsaWMgc3RhdGljIFBPU0lUSU9OX0RBVEE6c3RyaW5nID0gXCJwb3NpdGlvbnNcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgQ1VSVkVfREFUQTpzdHJpbmcgPSBcImN1cnZlc1wiO1xyXG5cdHB1YmxpYyBzdGF0aWMgVVZfREFUQTpzdHJpbmcgPSBcInV2c1wiO1xyXG5cclxuXHQvL1RPRE8gLSBtb3ZlIHRoZXNlIHRvIFN0YWdlR0xcclxuXHRwdWJsaWMgc3RhdGljIFBPU0lUSU9OX0ZPUk1BVDpzdHJpbmcgPSBcImZsb2F0M1wiO1xyXG5cdHB1YmxpYyBzdGF0aWMgQ1VSVkVfRk9STUFUOnN0cmluZyA9IFwiZmxvYXQyXCI7XHJcblx0cHVibGljIHN0YXRpYyBVVl9GT1JNQVQ6c3RyaW5nID0gXCJmbG9hdDJcIjtcclxuXHJcblx0cHJpdmF0ZSBfcG9zaXRpb25zRGlydHk6Ym9vbGVhbiA9IHRydWU7XHJcblx0cHJpdmF0ZSBfY3VydmVzRGlydHk6Ym9vbGVhbiA9IHRydWU7XHJcblx0cHJpdmF0ZSBfZmFjZU5vcm1hbHNEaXJ0eTpib29sZWFuID0gdHJ1ZTtcclxuXHRwcml2YXRlIF9mYWNlVGFuZ2VudHNEaXJ0eTpib29sZWFuID0gdHJ1ZTtcclxuXHRwcml2YXRlIF92ZXJ0ZXhOb3JtYWxzRGlydHk6Ym9vbGVhbiA9IHRydWU7XHJcblx0cHJpdmF0ZSBfdmVydGV4VGFuZ2VudHNEaXJ0eTpib29sZWFuID0gdHJ1ZTtcclxuXHRwcml2YXRlIF91dnNEaXJ0eTpib29sZWFuID0gdHJ1ZTtcclxuXHRwcml2YXRlIF9zZWNvbmRhcnlVVnNEaXJ0eTpib29sZWFuID0gdHJ1ZTtcclxuXHRwcml2YXRlIF9qb2ludEluZGljZXNEaXJ0eTpib29sZWFuID0gdHJ1ZTtcclxuXHRwcml2YXRlIF9qb2ludFdlaWdodHNEaXJ0eTpib29sZWFuID0gdHJ1ZTtcclxuXHJcblx0cHJpdmF0ZSBfcG9zaXRpb25zOkFycmF5PG51bWJlcj47XHJcblx0cHJpdmF0ZSBfY3VydmVzOkFycmF5PG51bWJlcj47XHJcblx0cHJpdmF0ZSBfdXZzOkFycmF5PG51bWJlcj47XHJcblxyXG5cclxuXHRwcml2YXRlIF91c2VDb25kZW5zZWRJbmRpY2VzOmJvb2xlYW47XHJcblx0cHJpdmF0ZSBfY29uZGVuc2VkSm9pbnRJbmRpY2VzOkFycmF5PG51bWJlcj47XHJcblx0cHJpdmF0ZSBfY29uZGVuc2VkSW5kZXhMb29rVXA6QXJyYXk8bnVtYmVyPjtcclxuXHJcblxyXG5cdHByaXZhdGUgX2NvbmNhdGVuYXRlQXJyYXlzOmJvb2xlYW4gPSB0cnVlO1xyXG5cdHByaXZhdGUgX2F1dG9EZXJpdmVOb3JtYWxzOmJvb2xlYW4gPSBmYWxzZTtcclxuXHRwcml2YXRlIF91c2VGYWNlV2VpZ2h0czpib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF9hdXRvRGVyaXZlVVZzOmJvb2xlYW4gPSBmYWxzZTtcclxuXHJcblx0cHJpdmF0ZSBfZmFjZU5vcm1hbHM6QXJyYXk8bnVtYmVyPjtcclxuXHRwcml2YXRlIF9mYWNlVGFuZ2VudHM6QXJyYXk8bnVtYmVyPjtcclxuXHRwcml2YXRlIF9mYWNlV2VpZ2h0czpBcnJheTxudW1iZXI+O1xyXG5cclxuXHRwcml2YXRlIF9zY2FsZVU6bnVtYmVyID0gMTtcclxuXHRwcml2YXRlIF9zY2FsZVY6bnVtYmVyID0gMTtcclxuXHJcblx0cHJpdmF0ZSBfcG9zaXRpb25zVXBkYXRlZDpTdWJHZW9tZXRyeUV2ZW50O1xyXG5cdHByaXZhdGUgX2N1cnZlc1VwZGF0ZWQ6U3ViR2VvbWV0cnlFdmVudDtcclxuXHRwcml2YXRlIF90YW5nZW50c1VwZGF0ZWQ6U3ViR2VvbWV0cnlFdmVudDtcclxuXHRwcml2YXRlIF91dnNVcGRhdGVkOlN1Ykdlb21ldHJ5RXZlbnQ7XHJcblx0cHJpdmF0ZSBfc2Vjb25kYXJ5VVZzVXBkYXRlZDpTdWJHZW9tZXRyeUV2ZW50O1xyXG5cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHNjYWxlVSgpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9zY2FsZVU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgc2NhbGVWKCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3NjYWxlVjtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE9mZmVycyB0aGUgb3B0aW9uIG9mIGVuYWJsaW5nIEdQVSBhY2NlbGVyYXRlZCBhbmltYXRpb24gb24gc2tlbGV0b25zIGxhcmdlciB0aGFuIDMyIGpvaW50c1xyXG5cdCAqIGJ5IGNvbmRlbnNpbmcgdGhlIG51bWJlciBvZiBqb2ludCBpbmRleCB2YWx1ZXMgcmVxdWlyZWQgcGVyIG1lc2guIE9ubHkgYXBwbGljYWJsZSB0b1xyXG5cdCAqIHNrZWxldG9uIGFuaW1hdGlvbnMgdGhhdCB1dGlsaXNlIG1vcmUgdGhhbiBvbmUgbWVzaCBvYmplY3QuIERlZmF1bHRzIHRvIGZhbHNlLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgdXNlQ29uZGVuc2VkSW5kaWNlcygpOmJvb2xlYW5cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fdXNlQ29uZGVuc2VkSW5kaWNlcztcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgdXNlQ29uZGVuc2VkSW5kaWNlcyh2YWx1ZTpib29sZWFuKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl91c2VDb25kZW5zZWRJbmRpY2VzID09IHZhbHVlKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fdXNlQ29uZGVuc2VkSW5kaWNlcyA9IHZhbHVlO1xyXG5cdH1cclxuXHJcblx0cHVibGljIF9wVXBkYXRlU3RyaWRlT2Zmc2V0KClcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fY29uY2F0ZW5hdGVBcnJheXMpIHtcclxuXHRcdFx0dGhpcy5fcE9mZnNldFtDdXJ2ZVN1Ykdlb21ldHJ5LlZFUlRFWF9EQVRBXSA9IDA7XHJcblxyXG5cdFx0XHQvL2Fsd2F5cyBoYXZlIHBvc2l0aW9uc1xyXG5cdFx0XHR0aGlzLl9wT2Zmc2V0W0N1cnZlU3ViR2VvbWV0cnkuUE9TSVRJT05fREFUQV0gPSAwO1xyXG5cdFx0XHR2YXIgc3RyaWRlOm51bWJlciA9IDM7XHJcblxyXG5cdFx0XHRpZiAodGhpcy5fY3VydmVzICE9IG51bGwpIHtcclxuXHRcdFx0XHR0aGlzLl9wT2Zmc2V0W0N1cnZlU3ViR2VvbWV0cnkuQ1VSVkVfREFUQV0gPSBzdHJpZGU7XHJcblx0XHRcdFx0c3RyaWRlICs9IDI7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICh0aGlzLl91dnMgIT0gbnVsbCkge1xyXG5cdFx0XHRcdHRoaXMuX3BPZmZzZXRbQ3VydmVTdWJHZW9tZXRyeS5VVl9EQVRBXSA9IHN0cmlkZTtcclxuXHRcdFx0XHRzdHJpZGUgKz0gMjtcclxuXHRcdFx0fVxyXG5cclxuXHJcblxyXG5cdFx0XHR0aGlzLl9wU3RyaWRlW0N1cnZlU3ViR2VvbWV0cnkuVkVSVEVYX0RBVEFdID0gc3RyaWRlO1xyXG5cdFx0XHR0aGlzLl9wU3RyaWRlW0N1cnZlU3ViR2VvbWV0cnkuUE9TSVRJT05fREFUQV0gPSBzdHJpZGU7XHJcblx0XHRcdHRoaXMuX3BTdHJpZGVbQ3VydmVTdWJHZW9tZXRyeS5DVVJWRV9EQVRBXSA9IHN0cmlkZTtcclxuXHRcdFx0dGhpcy5fcFN0cmlkZVtDdXJ2ZVN1Ykdlb21ldHJ5LlVWX0RBVEFdID0gc3RyaWRlO1xyXG5cclxuXHRcdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9wTnVtVmVydGljZXMqc3RyaWRlO1xyXG5cclxuXHRcdFx0aWYgKHRoaXMuX3BWZXJ0aWNlcyA9PSBudWxsKVxyXG5cdFx0XHRcdHRoaXMuX3BWZXJ0aWNlcyA9IG5ldyBBcnJheTxudW1iZXI+KGxlbik7XHJcblx0XHRcdGVsc2UgaWYgKHRoaXMuX3BWZXJ0aWNlcy5sZW5ndGggIT0gbGVuKVxyXG5cdFx0XHRcdHRoaXMuX3BWZXJ0aWNlcy5sZW5ndGggPSBsZW47XHJcblxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5fcE9mZnNldFtDdXJ2ZVN1Ykdlb21ldHJ5LlBPU0lUSU9OX0RBVEFdID0gMDtcclxuXHRcdFx0dGhpcy5fcE9mZnNldFtDdXJ2ZVN1Ykdlb21ldHJ5LkNVUlZFX0RBVEFdID0gMDtcclxuXHRcdFx0dGhpcy5fcE9mZnNldFtDdXJ2ZVN1Ykdlb21ldHJ5LlVWX0RBVEFdID0gMDtcclxuXHJcblxyXG5cdFx0XHR0aGlzLl9wU3RyaWRlW0N1cnZlU3ViR2VvbWV0cnkuUE9TSVRJT05fREFUQV0gPSAzO1xyXG5cdFx0XHR0aGlzLl9wU3RyaWRlW0N1cnZlU3ViR2VvbWV0cnkuQ1VSVkVfREFUQV0gPSAyO1xyXG5cdFx0XHR0aGlzLl9wU3RyaWRlW0N1cnZlU3ViR2VvbWV0cnkuVVZfREFUQV0gPSAyO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX3BTdHJpZGVPZmZzZXREaXJ0eSA9IGZhbHNlO1xyXG5cdH1cclxuXHJcblxyXG5cclxuXHQvKipcclxuXHQgKiBEZWZpbmVzIHdoZXRoZXIgYSBVViBidWZmZXIgc2hvdWxkIGJlIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVkIHRvIGNvbnRhaW4gZHVtbXkgVVYgY29vcmRpbmF0ZXMuXHJcblx0ICogU2V0IHRvIHRydWUgaWYgYSBnZW9tZXRyeSBsYWNrcyBVViBkYXRhIGJ1dCB1c2VzIGEgbWF0ZXJpYWwgdGhhdCByZXF1aXJlcyBpdCwgb3IgbGVhdmUgYXMgZmFsc2VcclxuXHQgKiBpbiBjYXNlcyB3aGVyZSBVViBkYXRhIGlzIGV4cGxpY2l0bHkgZGVmaW5lZCBvciB0aGUgbWF0ZXJpYWwgZG9lcyBub3QgcmVxdWlyZSBVViBkYXRhLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgYXV0b0Rlcml2ZVVWcygpOmJvb2xlYW5cclxuXHR7XHJcblx0XHRyZXR1cm4gZmFsc2U7Ly90aGlzLl9hdXRvRGVyaXZlVVZzO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBhdXRvRGVyaXZlVVZzKHZhbHVlOmJvb2xlYW4pXHJcblx0e1xyXG5cdFx0Ly9pZiAodGhpcy5fYXV0b0Rlcml2ZVVWcyA9PSB2YWx1ZSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdC8vdGhpcy5fYXV0b0Rlcml2ZVVWcyA9IHZhbHVlO1xyXG5cclxuXHRcdGlmICh2YWx1ZSlcclxuXHRcdFx0dGhpcy5ub3RpZnlVVnNVcGRhdGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRydWUgaWYgdGhlIHZlcnRleCBub3JtYWxzIHNob3VsZCBiZSBkZXJpdmVkIGZyb20gdGhlIGdlb21ldHJ5LCBmYWxzZSBpZiB0aGUgdmVydGV4IG5vcm1hbHMgYXJlIHNldFxyXG5cdCAqIGV4cGxpY2l0bHkuXHJcblx0ICovXHJcblx0cHVibGljIGdldCBhdXRvRGVyaXZlTm9ybWFscygpOmJvb2xlYW5cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fYXV0b0Rlcml2ZU5vcm1hbHM7XHJcblx0fVxyXG5cclxuICAgIC8vcmVtb3ZlXHJcblx0cHVibGljIHNldCBhdXRvRGVyaXZlTm9ybWFscyh2YWx1ZTpib29sZWFuKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9hdXRvRGVyaXZlTm9ybWFscyA9PSB2YWx1ZSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX2F1dG9EZXJpdmVOb3JtYWxzID0gdmFsdWU7XHJcblxyXG5cdH1cclxuXHJcblxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgdmVydGljZXMoKTpBcnJheTxudW1iZXI+XHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX3Bvc2l0aW9uc0RpcnR5KVxyXG5cdFx0XHR0aGlzLnVwZGF0ZVBvc2l0aW9ucyh0aGlzLl9wb3NpdGlvbnMpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fY3VydmVzRGlydHkpXHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ3VydmVzKHRoaXMuX2N1cnZlcyk7XHJcblxyXG5cdFx0aWYgKHRoaXMuX3V2c0RpcnR5KVxyXG5cdFx0XHR0aGlzLnVwZGF0ZVVWcyh0aGlzLl91dnMpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLl9wVmVydGljZXM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgcG9zaXRpb25zKCk6QXJyYXk8bnVtYmVyPlxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9wb3NpdGlvbnNEaXJ0eSlcclxuXHRcdFx0dGhpcy51cGRhdGVQb3NpdGlvbnModGhpcy5fcG9zaXRpb25zKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fcG9zaXRpb25zO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGN1cnZlcygpOkFycmF5PG51bWJlcj5cclxuXHR7XHJcblx0XHRpZiAodGhpcy5fY3VydmVzRGlydHkpXHJcblx0XHRcdHRoaXMudXBkYXRlQ3VydmVzKHRoaXMuX2N1cnZlcyk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuX2N1cnZlcztcclxuXHR9XHJcblxyXG5cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIHJhdyBkYXRhIG9mIHRoZSBmYWNlIG5vcm1hbHMsIGluIHRoZSBzYW1lIG9yZGVyIGFzIHRoZSBmYWNlcyBhcmUgbGlzdGVkIGluIHRoZSBpbmRleCBsaXN0LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgZmFjZU5vcm1hbHMoKTpBcnJheTxudW1iZXI+XHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX2ZhY2VOb3JtYWxzRGlydHkpXHJcblx0XHRcdHRoaXMudXBkYXRlRmFjZU5vcm1hbHMoKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fZmFjZU5vcm1hbHM7XHJcblx0fVxyXG5cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHV2cygpOkFycmF5PG51bWJlcj5cclxuXHR7XHJcblx0XHRpZiAodGhpcy5fdXZzRGlydHkpXHJcblx0XHRcdHRoaXMudXBkYXRlVVZzKHRoaXMuX3V2cyk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuX3V2cztcclxuXHR9XHJcblxyXG5cclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqIEluZGljYXRlcyB3aGV0aGVyIG9yIG5vdCB0byB0YWtlIHRoZSBzaXplIG9mIGZhY2VzIGludG8gYWNjb3VudCB3aGVuIGF1dG8tZGVyaXZpbmcgdmVydGV4IG5vcm1hbHMgYW5kIHRhbmdlbnRzLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgdXNlRmFjZVdlaWdodHMoKTpib29sZWFuXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3VzZUZhY2VXZWlnaHRzO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCB1c2VGYWNlV2VpZ2h0cyh2YWx1ZTpib29sZWFuKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl91c2VGYWNlV2VpZ2h0cyA9PSB2YWx1ZSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX3VzZUZhY2VXZWlnaHRzID0gdmFsdWU7XHJcblxyXG5cclxuXHRcdHRoaXMuX2ZhY2VOb3JtYWxzRGlydHkgPSB0cnVlO1xyXG5cdH1cclxuXHJcblxyXG5cdHB1YmxpYyBnZXQgY29uZGVuc2VkSW5kZXhMb29rVXAoKTpBcnJheTxudW1iZXI+XHJcblx0e1xyXG5cclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fY29uZGVuc2VkSW5kZXhMb29rVXA7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGNvbmNhdGVuYXRlZEFycmF5czpib29sZWFuKVxyXG5cdHtcclxuXHRcdHN1cGVyKGNvbmNhdGVuYXRlZEFycmF5cyk7XHJcblxyXG5cdFx0dGhpcy5fcFN1Yk1lc2hDbGFzcyA9IEN1cnZlU3ViTWVzaDtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXRCb3VuZGluZ1Bvc2l0aW9ucygpOkFycmF5PG51bWJlcj5cclxuXHR7XHJcblx0XHRpZiAodGhpcy5fcG9zaXRpb25zRGlydHkpXHJcblx0XHRcdHRoaXMudXBkYXRlUG9zaXRpb25zKHRoaXMuX3Bvc2l0aW9ucyk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuX3Bvc2l0aW9ucztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIHVwZGF0ZVBvc2l0aW9ucyh2YWx1ZXM6QXJyYXk8bnVtYmVyPilcclxuXHR7XHJcblx0XHR2YXIgaTpudW1iZXI7XHJcblx0XHR2YXIgaW5kZXg6bnVtYmVyO1xyXG5cdFx0dmFyIHN0cmlkZTpudW1iZXI7XHJcblx0XHR2YXIgcG9zaXRpb25zOkFycmF5PG51bWJlcj47XHJcblxyXG5cdFx0dGhpcy5fcG9zaXRpb25zID0gdmFsdWVzO1xyXG5cclxuXHRcdGlmICh0aGlzLl9wb3NpdGlvbnMgPT0gbnVsbClcclxuXHRcdFx0dGhpcy5fcG9zaXRpb25zID0gbmV3IEFycmF5PG51bWJlcj4oKTtcclxuXHJcblx0XHR0aGlzLl9wTnVtVmVydGljZXMgPSB0aGlzLl9wb3NpdGlvbnMubGVuZ3RoLzM7XHJcblxyXG5cdFx0aWYgKHRoaXMuX2NvbmNhdGVuYXRlQXJyYXlzKSB7XHJcblx0XHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fcE51bVZlcnRpY2VzKnRoaXMuZ2V0U3RyaWRlKEN1cnZlU3ViR2VvbWV0cnkuVkVSVEVYX0RBVEEpO1xyXG5cclxuXHRcdFx0aWYgKHRoaXMuX3BWZXJ0aWNlcyA9PSBudWxsKVxyXG5cdFx0XHRcdHRoaXMuX3BWZXJ0aWNlcyA9IG5ldyBBcnJheTxudW1iZXI+KGxlbik7XHJcblx0XHRcdGVsc2UgaWYgKHRoaXMuX3BWZXJ0aWNlcy5sZW5ndGggIT0gbGVuKVxyXG5cdFx0XHRcdHRoaXMuX3BWZXJ0aWNlcy5sZW5ndGggPSBsZW47XHJcblxyXG5cdFx0XHRpID0gMDtcclxuXHRcdFx0aW5kZXggPSB0aGlzLmdldE9mZnNldChDdXJ2ZVN1Ykdlb21ldHJ5LlBPU0lUSU9OX0RBVEEpO1xyXG5cdFx0XHRzdHJpZGUgPSB0aGlzLmdldFN0cmlkZShDdXJ2ZVN1Ykdlb21ldHJ5LlBPU0lUSU9OX0RBVEEpO1xyXG5cdFx0XHRwb3NpdGlvbnMgPSB0aGlzLl9wVmVydGljZXM7XHJcblxyXG5cdFx0XHR3aGlsZSAoaSA8IHZhbHVlcy5sZW5ndGgpIHtcclxuXHRcdFx0XHRwb3NpdGlvbnNbaW5kZXhdID0gdmFsdWVzW2krK107XHJcblx0XHRcdFx0cG9zaXRpb25zW2luZGV4ICsgMV0gPSB2YWx1ZXNbaSsrXTtcclxuXHRcdFx0XHRwb3NpdGlvbnNbaW5kZXggKyAyXSA9IHZhbHVlc1tpKytdO1xyXG5cdFx0XHRcdGluZGV4ICs9IHN0cmlkZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMucEludmFsaWRhdGVCb3VuZHMoKTtcclxuXHJcblx0XHR0aGlzLm5vdGlmeVBvc2l0aW9uc1VwZGF0ZSgpO1xyXG5cclxuXHRcdHRoaXMuX3Bvc2l0aW9uc0RpcnR5ID0gZmFsc2U7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBVcGRhdGVzIHRoZSB2ZXJ0ZXggbm9ybWFscyBiYXNlZCBvbiB0aGUgZ2VvbWV0cnkuXHJcblx0ICovXHJcblx0cHVibGljIHVwZGF0ZUN1cnZlcyh2YWx1ZXM6QXJyYXk8bnVtYmVyPilcclxuXHR7XHJcblx0XHR2YXIgaTpudW1iZXI7XHJcblx0XHR2YXIgaW5kZXg6bnVtYmVyO1xyXG5cdFx0dmFyIG9mZnNldDpudW1iZXI7XHJcblx0XHR2YXIgc3RyaWRlOm51bWJlcjtcclxuXHRcdHZhciBjdXJ2ZXM6QXJyYXk8bnVtYmVyPjtcclxuXHJcblx0XHRpZiAodHJ1ZSkge1xyXG5cdFx0XHRpZiAoKHRoaXMuX2N1cnZlcyA9PSBudWxsIHx8IHZhbHVlcyA9PSBudWxsKSAmJiAodGhpcy5fY3VydmVzICE9IG51bGwgfHwgdmFsdWVzICE9IG51bGwpKSB7XHJcblx0XHRcdFx0aWYgKHRoaXMuX2NvbmNhdGVuYXRlQXJyYXlzKVxyXG4gICAgICAgICAgICAgICAgICAgIHRydWU7IC8vXCJkbyBub3RoaW5nXCI7XHJcblx0XHRcdFx0XHQvL3RoaXMuX3BOb3RpZnlDdXJ2ZXNVcGRhdGUoKTtcclxuXHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHR0aGlzLl9wU3RyaWRlT2Zmc2V0RGlydHkgPSB0cnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLl9jdXJ2ZXMgPSB2YWx1ZXM7XHJcblxyXG5cdFx0XHRpZiAodmFsdWVzICE9IG51bGwgJiYgdGhpcy5fY29uY2F0ZW5hdGVBcnJheXMpIHtcclxuXHRcdFx0XHRpID0gMDtcclxuXHRcdFx0XHRpbmRleCA9IHRoaXMuZ2V0T2Zmc2V0KEN1cnZlU3ViR2VvbWV0cnkuQ1VSVkVfREFUQSk7XHJcblx0XHRcdFx0c3RyaWRlID0gdGhpcy5nZXRTdHJpZGUoQ3VydmVTdWJHZW9tZXRyeS5DVVJWRV9EQVRBKTtcclxuICAgICAgICAgICAgICAgIGN1cnZlcyA9IHRoaXMuX3BWZXJ0aWNlcztcclxuXHJcblx0XHRcdFx0d2hpbGUgKGkgPCB2YWx1ZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VydmVzW2luZGV4XSA9IHZhbHVlc1tpKytdO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnZlc1tpbmRleCArIDFdID0gdmFsdWVzW2krK107XHJcblx0XHRcdFx0XHRpbmRleCArPSBzdHJpZGU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHR0aGlzLm5vdGlmeUN1cnZlc1VwZGF0ZSgpO1xyXG5cclxuXHRcdHRoaXMuX2N1cnZlc0RpcnR5ID0gZmFsc2U7XHJcblx0fVxyXG5cclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqIFVwZGF0ZXMgdGhlIHV2cyBiYXNlZCBvbiB0aGUgZ2VvbWV0cnkuXHJcblx0ICovXHJcblx0cHVibGljIHVwZGF0ZVVWcyh2YWx1ZXM6QXJyYXk8bnVtYmVyPilcclxuXHR7XHJcblx0XHR2YXIgaTpudW1iZXI7XHJcblx0XHR2YXIgaW5kZXg6bnVtYmVyO1xyXG5cdFx0dmFyIG9mZnNldDpudW1iZXI7XHJcblx0XHR2YXIgc3RyaWRlOm51bWJlcjtcclxuXHRcdHZhciB1dnM6QXJyYXk8bnVtYmVyPjtcclxuXHJcblx0XHRpZiAoIXRoaXMuX2F1dG9EZXJpdmVVVnMpIHtcclxuXHRcdFx0aWYgKCh0aGlzLl91dnMgPT0gbnVsbCB8fCB2YWx1ZXMgPT0gbnVsbCkgJiYgKHRoaXMuX3V2cyAhPSBudWxsIHx8IHZhbHVlcyAhPSBudWxsKSkge1xyXG5cdFx0XHRcdGlmICh0aGlzLl9jb25jYXRlbmF0ZUFycmF5cylcclxuXHRcdFx0XHRcdHRoaXMuX3BOb3RpZnlWZXJ0aWNlc1VwZGF0ZSgpO1xyXG5cdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdHRoaXMuX3BTdHJpZGVPZmZzZXREaXJ0eSA9IHRydWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMuX3V2cyA9IHZhbHVlcztcclxuXHJcblx0XHRcdGlmICh2YWx1ZXMgIT0gbnVsbCAmJiB0aGlzLl9jb25jYXRlbmF0ZUFycmF5cykge1xyXG5cdFx0XHRcdGkgPSAwO1xyXG5cdFx0XHRcdGluZGV4ID0gdGhpcy5nZXRPZmZzZXQoQ3VydmVTdWJHZW9tZXRyeS5VVl9EQVRBKTtcclxuXHRcdFx0XHRzdHJpZGUgPSB0aGlzLmdldFN0cmlkZShDdXJ2ZVN1Ykdlb21ldHJ5LlVWX0RBVEEpO1xyXG5cdFx0XHRcdHV2cyA9IHRoaXMuX3BWZXJ0aWNlcztcclxuXHJcblx0XHRcdFx0d2hpbGUgKGkgPCB2YWx1ZXMubGVuZ3RoKSB7XHJcblx0XHRcdFx0XHR1dnNbaW5kZXhdID0gdmFsdWVzW2krK107XHJcblx0XHRcdFx0XHR1dnNbaW5kZXggKyAxXSA9IHZhbHVlc1tpKytdO1xyXG5cdFx0XHRcdFx0aW5kZXggKz0gc3RyaWRlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGlmICh0aGlzLl91dnMgPT0gbnVsbCkge1xyXG5cdFx0XHRcdHRoaXMuX3V2cyA9IG5ldyBBcnJheTxudW1iZXI+KHRoaXMuX3Bvc2l0aW9ucy5sZW5ndGgqMi8zKTtcclxuXHJcblx0XHRcdFx0aWYgKHRoaXMuX2NvbmNhdGVuYXRlQXJyYXlzKVxyXG5cdFx0XHRcdFx0dGhpcy5fcE5vdGlmeVZlcnRpY2VzVXBkYXRlKCk7XHJcblx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0dGhpcy5fcFN0cmlkZU9mZnNldERpcnR5ID0gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0b2Zmc2V0ID0gdGhpcy5nZXRPZmZzZXQoQ3VydmVTdWJHZW9tZXRyeS5VVl9EQVRBKTtcclxuXHRcdFx0c3RyaWRlID0gdGhpcy5nZXRTdHJpZGUoQ3VydmVTdWJHZW9tZXRyeS5VVl9EQVRBKTtcclxuXHJcblx0XHRcdC8vYXV0b2Rlcml2ZWQgdXZzXHJcblx0XHRcdHV2cyA9IHRoaXMuX2NvbmNhdGVuYXRlQXJyYXlzPyB0aGlzLl9wVmVydGljZXMgOiB0aGlzLl91dnM7XHJcblxyXG5cdFx0XHRpID0gMDtcclxuXHRcdFx0aW5kZXggPSBvZmZzZXQ7XHJcblx0XHRcdHZhciB1dklkeDpudW1iZXIgPSAwO1xyXG5cclxuXHRcdFx0Ly9jbGVhciB1diB2YWx1ZXNcclxuXHRcdFx0dmFyIGxlblY6bnVtYmVyID0gdXZzLmxlbmd0aDtcclxuXHRcdFx0d2hpbGUgKGluZGV4IDwgbGVuVikge1xyXG5cdFx0XHRcdGlmICh0aGlzLl9jb25jYXRlbmF0ZUFycmF5cykge1xyXG5cdFx0XHRcdFx0dGhpcy5fdXZzW2krK10gPSB1dnNbaW5kZXhdID0gdXZJZHgqLjU7XHJcblx0XHRcdFx0XHR0aGlzLl91dnNbaSsrXSA9IHV2c1tpbmRleCArIDFdID0gMS4wIC0gKHV2SWR4ICYgMSk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHV2c1tpbmRleF0gPSB1dklkeCouNTtcclxuXHRcdFx0XHRcdHV2c1tpbmRleCArIDFdID0gMS4wIC0gKHV2SWR4ICYgMSk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAoKyt1dklkeCA9PSAzKVxyXG5cdFx0XHRcdFx0dXZJZHggPSAwO1xyXG5cclxuXHRcdFx0XHRpbmRleCArPSBzdHJpZGU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLm5vdGlmeVVWc1VwZGF0ZSgpO1xyXG5cclxuXHRcdHRoaXMuX3V2c0RpcnR5ID0gZmFsc2U7XHJcblx0fVxyXG5cclxuXHJcblxyXG5cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZGlzcG9zZSgpXHJcblx0e1xyXG5cdFx0c3VwZXIuZGlzcG9zZSgpO1xyXG5cclxuXHRcdHRoaXMuX3Bvc2l0aW9ucyA9IG51bGw7XHJcblx0XHR0aGlzLl9jdXJ2ZXMgPSBudWxsO1xyXG5cdFx0dGhpcy5fdXZzID0gbnVsbDtcclxuXHJcblx0XHR0aGlzLl9mYWNlTm9ybWFscyA9IG51bGw7XHJcblx0XHR0aGlzLl9mYWNlV2VpZ2h0cyA9IG51bGw7XHJcblx0XHR0aGlzLl9mYWNlVGFuZ2VudHMgPSBudWxsO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVXBkYXRlcyB0aGUgZmFjZSBpbmRpY2VzIG9mIHRoZSBDdXJ2ZVN1Ykdlb21ldHJ5LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGluZGljZXMgVGhlIGZhY2UgaW5kaWNlcyB0byB1cGxvYWQuXHJcblx0ICovXHJcblx0cHVibGljIHVwZGF0ZUluZGljZXMoaW5kaWNlczpBcnJheTxudW1iZXI+KVxyXG5cdHtcclxuXHRcdHN1cGVyLnVwZGF0ZUluZGljZXMoaW5kaWNlcyk7XHJcblxyXG5cdFx0dGhpcy5fZmFjZU5vcm1hbHNEaXJ0eSA9IHRydWU7XHJcblxyXG5cdFx0aWYgKHRoaXMuX2F1dG9EZXJpdmVOb3JtYWxzKVxyXG5cdFx0XHR0aGlzLl92ZXJ0ZXhOb3JtYWxzRGlydHkgPSB0cnVlO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENsb25lcyB0aGUgY3VycmVudCBvYmplY3RcclxuXHQgKiBAcmV0dXJuIEFuIGV4YWN0IGR1cGxpY2F0ZSBvZiB0aGUgY3VycmVudCBvYmplY3QuXHJcblx0ICovXHJcblx0cHVibGljIGNsb25lKCk6Q3VydmVTdWJHZW9tZXRyeVxyXG5cdHtcclxuXHRcdHZhciBjbG9uZTpDdXJ2ZVN1Ykdlb21ldHJ5ID0gbmV3IEN1cnZlU3ViR2VvbWV0cnkodGhpcy5fY29uY2F0ZW5hdGVBcnJheXMpO1xyXG5cdFx0Y2xvbmUudXBkYXRlSW5kaWNlcyh0aGlzLl9wSW5kaWNlcy5jb25jYXQoKSk7XHJcblx0XHRjbG9uZS51cGRhdGVQb3NpdGlvbnModGhpcy5fcG9zaXRpb25zLmNvbmNhdCgpKTtcclxuXHJcblx0XHRpZiAodGhpcy5fY3VydmVzKVxyXG5cdFx0XHRjbG9uZS51cGRhdGVDdXJ2ZXModGhpcy5fY3VydmVzLmNvbmNhdCgpKTtcclxuXHRcdGVsc2VcclxuXHRcdFx0Y2xvbmUudXBkYXRlQ3VydmVzKG51bGwpO1xyXG5cclxuXHRcdGlmICh0aGlzLl91dnMgJiYgIXRoaXMuX2F1dG9EZXJpdmVVVnMpXHJcblx0XHRcdGNsb25lLnVwZGF0ZVVWcyh0aGlzLl91dnMuY29uY2F0KCkpO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHRjbG9uZS51cGRhdGVVVnMobnVsbCk7XHJcblxyXG5cdFx0cmV0dXJuIGNsb25lO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNjYWxlVVYoc2NhbGVVOm51bWJlciA9IDEsIHNjYWxlVjpudW1iZXIgPSAxKVxyXG5cdHtcclxuXHRcdHZhciBpbmRleDpudW1iZXI7XHJcblx0XHR2YXIgb2Zmc2V0Om51bWJlcjtcclxuXHRcdHZhciBzdHJpZGU6bnVtYmVyO1xyXG5cdFx0dmFyIHV2czpBcnJheTxudW1iZXI+O1xyXG5cclxuXHRcdHV2cyA9IHRoaXMuX3V2cztcclxuXHJcblx0XHR2YXIgcmF0aW9VOm51bWJlciA9IHNjYWxlVS90aGlzLl9zY2FsZVU7XHJcblx0XHR2YXIgcmF0aW9WOm51bWJlciA9IHNjYWxlVi90aGlzLl9zY2FsZVY7XHJcblxyXG5cdFx0dGhpcy5fc2NhbGVVID0gc2NhbGVVO1xyXG5cdFx0dGhpcy5fc2NhbGVWID0gc2NhbGVWO1xyXG5cclxuXHRcdHZhciBsZW46bnVtYmVyID0gdXZzLmxlbmd0aDtcclxuXHJcblx0XHRvZmZzZXQgPSAwO1xyXG5cdFx0c3RyaWRlID0gMjtcclxuXHJcblx0XHRpbmRleCA9IG9mZnNldDtcclxuXHJcblx0XHR3aGlsZSAoaW5kZXggPCBsZW4pIHtcclxuXHRcdFx0dXZzW2luZGV4XSAqPSByYXRpb1U7XHJcblx0XHRcdHV2c1tpbmRleCArIDFdICo9IHJhdGlvVjtcclxuXHRcdFx0aW5kZXggKz0gc3RyaWRlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMubm90aWZ5VVZzVXBkYXRlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTY2FsZXMgdGhlIGdlb21ldHJ5LlxyXG5cdCAqIEBwYXJhbSBzY2FsZSBUaGUgYW1vdW50IGJ5IHdoaWNoIHRvIHNjYWxlLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzY2FsZShzY2FsZTpudW1iZXIpXHJcblx0e1xyXG5cdFx0dmFyIGk6bnVtYmVyO1xyXG5cdFx0dmFyIGluZGV4Om51bWJlcjtcclxuXHRcdHZhciBvZmZzZXQ6bnVtYmVyO1xyXG5cdFx0dmFyIHN0cmlkZTpudW1iZXI7XHJcblx0XHR2YXIgcG9zaXRpb25zOkFycmF5PG51bWJlcj47XHJcblxyXG5cdFx0cG9zaXRpb25zID0gdGhpcy5fcG9zaXRpb25zO1xyXG5cclxuXHRcdHZhciBsZW46bnVtYmVyID0gcG9zaXRpb25zLmxlbmd0aDtcclxuXHJcblx0XHRvZmZzZXQgPSAwO1xyXG5cdFx0c3RyaWRlID0gMztcclxuXHJcblx0XHRpID0gMDtcclxuXHRcdGluZGV4ID0gb2Zmc2V0O1xyXG5cdFx0d2hpbGUgKGkgPCBsZW4pIHtcclxuXHRcdFx0cG9zaXRpb25zW2luZGV4XSAqPSBzY2FsZTtcclxuXHRcdFx0cG9zaXRpb25zW2luZGV4ICsgMV0gKj0gc2NhbGU7XHJcblx0XHRcdHBvc2l0aW9uc1tpbmRleCArIDJdICo9IHNjYWxlO1xyXG5cclxuXHRcdFx0aSArPSAzO1xyXG5cdFx0XHRpbmRleCArPSBzdHJpZGU7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5ub3RpZnlQb3NpdGlvbnNVcGRhdGUoKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBhcHBseVRyYW5zZm9ybWF0aW9uKHRyYW5zZm9ybTpNYXRyaXgzRClcclxuXHR7XHJcblx0XHR2YXIgcG9zaXRpb25zOkFycmF5PG51bWJlcj47XHJcblxyXG5cdFx0aWYgKHRoaXMuX2NvbmNhdGVuYXRlQXJyYXlzKSB7XHJcblx0XHRcdHBvc2l0aW9ucyA9IHRoaXMuX3BWZXJ0aWNlcztcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHBvc2l0aW9ucyA9IHRoaXMuX3Bvc2l0aW9ucztcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX3Bvc2l0aW9ucy5sZW5ndGgvMztcclxuXHRcdHZhciBpOm51bWJlcjtcclxuXHRcdHZhciBpMTpudW1iZXI7XHJcblx0XHR2YXIgaTI6bnVtYmVyO1xyXG5cdFx0dmFyIHZlY3RvcjpWZWN0b3IzRCA9IG5ldyBWZWN0b3IzRCgpO1xyXG5cclxuXHRcdHZhciBpbnZUcmFuc3Bvc2U6TWF0cml4M0Q7XHJcblxyXG5cclxuXHJcblx0XHR2YXIgdmkwOm51bWJlciA9IHRoaXMuZ2V0T2Zmc2V0KEN1cnZlU3ViR2VvbWV0cnkuUE9TSVRJT05fREFUQSk7XHJcblx0XHR2YXIgdlN0cmlkZTpudW1iZXIgPSB0aGlzLmdldFN0cmlkZShDdXJ2ZVN1Ykdlb21ldHJ5LlBPU0lUSU9OX0RBVEEpO1xyXG5cclxuXHRcdGZvciAoaSA9IDA7IGkgPCBsZW47ICsraSkge1xyXG5cdFx0XHRpMSA9IHZpMCArIDE7XHJcblx0XHRcdGkyID0gdmkwICsgMjtcclxuXHJcblx0XHRcdC8vIGJha2UgcG9zaXRpb25cclxuXHRcdFx0dmVjdG9yLnggPSBwb3NpdGlvbnNbdmkwXTtcclxuXHRcdFx0dmVjdG9yLnkgPSBwb3NpdGlvbnNbaTFdO1xyXG5cdFx0XHR2ZWN0b3IueiA9IHBvc2l0aW9uc1tpMl07XHJcblx0XHRcdHZlY3RvciA9IHRyYW5zZm9ybS50cmFuc2Zvcm1WZWN0b3IodmVjdG9yKTtcclxuXHRcdFx0cG9zaXRpb25zW3ZpMF0gPSB2ZWN0b3IueDtcclxuXHRcdFx0cG9zaXRpb25zW2kxXSA9IHZlY3Rvci55O1xyXG5cdFx0XHRwb3NpdGlvbnNbaTJdID0gdmVjdG9yLno7XHJcblx0XHRcdHZpMCArPSB2U3RyaWRlO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLm5vdGlmeVBvc2l0aW9uc1VwZGF0ZSgpO1xyXG5cdH1cclxuXHJcblxyXG5cclxuXHQvKipcclxuXHQgKiBVcGRhdGVzIHRoZSBub3JtYWxzIGZvciBlYWNoIGZhY2UuXHJcblx0ICovXHJcblx0cHJpdmF0ZSB1cGRhdGVGYWNlTm9ybWFscygpXHJcblx0e1xyXG5cdFx0dmFyIGk6bnVtYmVyID0gMDtcclxuXHRcdHZhciBqOm51bWJlciA9IDA7XHJcblx0XHR2YXIgazpudW1iZXIgPSAwO1xyXG5cdFx0dmFyIGluZGV4Om51bWJlcjtcclxuXHRcdHZhciBvZmZzZXQ6bnVtYmVyO1xyXG5cdFx0dmFyIHN0cmlkZTpudW1iZXI7XHJcblxyXG5cdFx0dmFyIHgxOm51bWJlciwgeDI6bnVtYmVyLCB4MzpudW1iZXI7XHJcblx0XHR2YXIgeTE6bnVtYmVyLCB5MjpudW1iZXIsIHkzOm51bWJlcjtcclxuXHRcdHZhciB6MTpudW1iZXIsIHoyOm51bWJlciwgejM6bnVtYmVyO1xyXG5cdFx0dmFyIGR4MTpudW1iZXIsIGR5MTpudW1iZXIsIGR6MTpudW1iZXI7XHJcblx0XHR2YXIgZHgyOm51bWJlciwgZHkyOm51bWJlciwgZHoyOm51bWJlcjtcclxuXHRcdHZhciBjeDpudW1iZXIsIGN5Om51bWJlciwgY3o6bnVtYmVyO1xyXG5cdFx0dmFyIGQ6bnVtYmVyO1xyXG5cclxuXHRcdHZhciBwb3NpdGlvbnM6QXJyYXk8bnVtYmVyPiA9IHRoaXMuX3Bvc2l0aW9ucztcclxuXHJcblx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX3BJbmRpY2VzLmxlbmd0aDtcclxuXHJcblx0XHRpZiAodGhpcy5fZmFjZU5vcm1hbHMgPT0gbnVsbClcclxuXHRcdFx0dGhpcy5fZmFjZU5vcm1hbHMgPSBuZXcgQXJyYXk8bnVtYmVyPihsZW4pO1xyXG5cclxuXHRcdGlmICh0aGlzLl91c2VGYWNlV2VpZ2h0cyAmJiB0aGlzLl9mYWNlV2VpZ2h0cyA9PSBudWxsKVxyXG5cdFx0XHR0aGlzLl9mYWNlV2VpZ2h0cyA9IG5ldyBBcnJheTxudW1iZXI+KGxlbi8zKTtcclxuXHJcblx0XHR3aGlsZSAoaSA8IGxlbikge1xyXG5cdFx0XHRpbmRleCA9IHRoaXMuX3BJbmRpY2VzW2krK10qMztcclxuXHRcdFx0eDEgPSBwb3NpdGlvbnNbaW5kZXhdO1xyXG5cdFx0XHR5MSA9IHBvc2l0aW9uc1tpbmRleCArIDFdO1xyXG5cdFx0XHR6MSA9IHBvc2l0aW9uc1tpbmRleCArIDJdO1xyXG5cdFx0XHRpbmRleCA9IHRoaXMuX3BJbmRpY2VzW2krK10qMztcclxuXHRcdFx0eDIgPSBwb3NpdGlvbnNbaW5kZXhdO1xyXG5cdFx0XHR5MiA9IHBvc2l0aW9uc1tpbmRleCArIDFdO1xyXG5cdFx0XHR6MiA9IHBvc2l0aW9uc1tpbmRleCArIDJdO1xyXG5cdFx0XHRpbmRleCA9IHRoaXMuX3BJbmRpY2VzW2krK10qMztcclxuXHRcdFx0eDMgPSBwb3NpdGlvbnNbaW5kZXhdO1xyXG5cdFx0XHR5MyA9IHBvc2l0aW9uc1tpbmRleCArIDFdO1xyXG5cdFx0XHR6MyA9IHBvc2l0aW9uc1tpbmRleCArIDJdO1xyXG5cdFx0XHRkeDEgPSB4MyAtIHgxO1xyXG5cdFx0XHRkeTEgPSB5MyAtIHkxO1xyXG5cdFx0XHRkejEgPSB6MyAtIHoxO1xyXG5cdFx0XHRkeDIgPSB4MiAtIHgxO1xyXG5cdFx0XHRkeTIgPSB5MiAtIHkxO1xyXG5cdFx0XHRkejIgPSB6MiAtIHoxO1xyXG5cdFx0XHRjeCA9IGR6MSpkeTIgLSBkeTEqZHoyO1xyXG5cdFx0XHRjeSA9IGR4MSpkejIgLSBkejEqZHgyO1xyXG5cdFx0XHRjeiA9IGR5MSpkeDIgLSBkeDEqZHkyO1xyXG5cdFx0XHRkID0gTWF0aC5zcXJ0KGN4KmN4ICsgY3kqY3kgKyBjeipjeik7XHJcblx0XHRcdC8vIGxlbmd0aCBvZiBjcm9zcyBwcm9kdWN0ID0gMip0cmlhbmdsZSBhcmVhXHJcblxyXG5cdFx0XHRpZiAodGhpcy5fdXNlRmFjZVdlaWdodHMpIHtcclxuXHRcdFx0XHR2YXIgdzpudW1iZXIgPSBkKjEwMDAwO1xyXG5cclxuXHRcdFx0XHRpZiAodyA8IDEpXHJcblx0XHRcdFx0XHR3ID0gMTtcclxuXHJcblx0XHRcdFx0dGhpcy5fZmFjZVdlaWdodHNbaysrXSA9IHc7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGQgPSAxL2Q7XHJcblxyXG5cdFx0XHR0aGlzLl9mYWNlTm9ybWFsc1tqKytdID0gY3gqZDtcclxuXHRcdFx0dGhpcy5fZmFjZU5vcm1hbHNbaisrXSA9IGN5KmQ7XHJcblx0XHRcdHRoaXMuX2ZhY2VOb3JtYWxzW2orK10gPSBjeipkO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX2ZhY2VOb3JtYWxzRGlydHkgPSBmYWxzZTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBfcE5vdGlmeVZlcnRpY2VzVXBkYXRlKClcclxuXHR7XHJcblx0XHR0aGlzLl9wU3RyaWRlT2Zmc2V0RGlydHkgPSB0cnVlO1xyXG5cclxuXHRcdHRoaXMubm90aWZ5UG9zaXRpb25zVXBkYXRlKCk7XHJcblx0XHR0aGlzLm5vdGlmeUN1cnZlc1VwZGF0ZSgpO1xyXG5cdFx0dGhpcy5ub3RpZnlVVnNVcGRhdGUoKTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgbm90aWZ5UG9zaXRpb25zVXBkYXRlKClcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fcG9zaXRpb25zRGlydHkpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9wb3NpdGlvbnNEaXJ0eSA9IHRydWU7XHJcblxyXG5cdFx0aWYgKCF0aGlzLl9wb3NpdGlvbnNVcGRhdGVkKVxyXG5cdFx0XHR0aGlzLl9wb3NpdGlvbnNVcGRhdGVkID0gbmV3IFN1Ykdlb21ldHJ5RXZlbnQoU3ViR2VvbWV0cnlFdmVudC5WRVJUSUNFU19VUERBVEVELCBDdXJ2ZVN1Ykdlb21ldHJ5LlBPU0lUSU9OX0RBVEEpO1xyXG5cclxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudCh0aGlzLl9wb3NpdGlvbnNVcGRhdGVkKTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgbm90aWZ5Q3VydmVzVXBkYXRlKClcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fY3VydmVzRGlydHkpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9jdXJ2ZXNEaXJ0eSA9IHRydWU7XHJcblxyXG5cdFx0aWYgKCF0aGlzLl9jdXJ2ZXNVcGRhdGVkKVxyXG5cdFx0XHR0aGlzLl9jdXJ2ZXNVcGRhdGVkID0gbmV3IFN1Ykdlb21ldHJ5RXZlbnQoU3ViR2VvbWV0cnlFdmVudC5WRVJUSUNFU19VUERBVEVELCBDdXJ2ZVN1Ykdlb21ldHJ5LkNVUlZFX0RBVEEpO1xyXG5cclxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudCh0aGlzLl9jdXJ2ZXNVcGRhdGVkKTtcclxuXHR9XHJcblxyXG5cclxuXHJcblx0cHJpdmF0ZSBub3RpZnlVVnNVcGRhdGUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3V2c0RpcnR5KVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIHRoaXMuX3V2c0RpcnR5ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLl91dnNVcGRhdGVkKVxyXG4gICAgICAgICAgICB0aGlzLl91dnNVcGRhdGVkID0gbmV3IFN1Ykdlb21ldHJ5RXZlbnQoU3ViR2VvbWV0cnlFdmVudC5WRVJUSUNFU19VUERBVEVELCBDdXJ2ZVN1Ykdlb21ldHJ5LlVWX0RBVEEpO1xyXG5cclxuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQodGhpcy5fdXZzVXBkYXRlZCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCA9IEN1cnZlU3ViR2VvbWV0cnk7Il19