"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AttributesView_1 = require("@awayjs/core/lib/attributes/AttributesView");
var Float3Attributes_1 = require("@awayjs/core/lib/attributes/Float3Attributes");
var Float2Attributes_1 = require("@awayjs/core/lib/attributes/Float2Attributes");
var ElementsBase_1 = require("../graphics/ElementsBase");
var ElementsUtils_1 = require("../utils/ElementsUtils");
/**
 * @class away.base.TriangleElements
 */
var TriangleElements = (function (_super) {
    __extends(TriangleElements, _super);
    function TriangleElements() {
        _super.apply(this, arguments);
        this._faceNormalsDirty = true;
        this._faceTangentsDirty = true;
        this._autoDeriveNormals = true;
        this._autoDeriveTangents = true;
        //used for hittesting geometry
        this.hitTestCache = new Object();
    }
    Object.defineProperty(TriangleElements.prototype, "assetType", {
        get: function () {
            return TriangleElements.assetType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TriangleElements.prototype, "useCondensedIndices", {
        /**
         * Offers the option of enabling GPU accelerated animation on skeletons larger than 32 joints
         * by condensing the number of joint index values required per sprite. Only applicable to
         * skeleton animations that utilise more than one sprite object. Defaults to false.
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
    Object.defineProperty(TriangleElements.prototype, "jointsPerVertex", {
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
            if (this._jointIndices)
                this._jointIndices.dimensions = this._jointsPerVertex;
            if (this._jointWeights)
                this._jointWeights.dimensions = this._jointsPerVertex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TriangleElements.prototype, "autoDeriveNormals", {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TriangleElements.prototype, "autoDeriveTangents", {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TriangleElements.prototype, "positions", {
        /**
         *
         */
        get: function () {
            if (!this._positions)
                this.setPositions(new Float3Attributes_1.Float3Attributes(this._concatenatedBuffer));
            return this._positions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TriangleElements.prototype, "normals", {
        /**
         *
         */
        get: function () {
            if (!this._normals || this._verticesDirty[this._normals.id])
                this.setNormals(this._normals);
            return this._normals;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TriangleElements.prototype, "tangents", {
        /**
         *
         */
        get: function () {
            if (!this._tangents || this._verticesDirty[this._tangents.id])
                this.setTangents(this._tangents);
            return this._tangents;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TriangleElements.prototype, "faceNormals", {
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
    Object.defineProperty(TriangleElements.prototype, "faceTangents", {
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
    Object.defineProperty(TriangleElements.prototype, "uvs", {
        /**
         *
         */
        get: function () {
            return this._uvs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TriangleElements.prototype, "jointIndices", {
        /**
         *
         */
        get: function () {
            return this._jointIndices;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TriangleElements.prototype, "jointWeights", {
        /**
         *
         */
        get: function () {
            return this._jointWeights;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TriangleElements.prototype, "condensedIndexLookUp", {
        get: function () {
            return this._condensedIndexLookUp;
        },
        enumerable: true,
        configurable: true
    });
    TriangleElements.prototype.getBoxBounds = function (target, count, offset) {
        if (target === void 0) { target = null; }
        if (count === void 0) { count = 0; }
        if (offset === void 0) { offset = 0; }
        return ElementsUtils_1.ElementsUtils.getTriangleGraphicsBoxBounds(this.positions, target, count || this._numVertices, offset);
    };
    TriangleElements.prototype.getSphereBounds = function (center, target, count, offset) {
        if (target === void 0) { target = null; }
        if (count === void 0) { count = 0; }
        if (offset === void 0) { offset = 0; }
        return ElementsUtils_1.ElementsUtils.getTriangleGraphicsSphereBounds(this.positions, center, target, count || this._numVertices, offset);
    };
    TriangleElements.prototype.hitTestPoint = function (x, y, z, box, count, offset) {
        if (count === void 0) { count = 0; }
        if (offset === void 0) { offset = 0; }
        return ElementsUtils_1.ElementsUtils.hitTestTriangleElements(x, y, 0, box, this, count || this._numVertices, offset);
    };
    TriangleElements.prototype.setPositions = function (values, offset) {
        if (offset === void 0) { offset = 0; }
        if (values == this._positions)
            return;
        if (values instanceof AttributesView_1.AttributesView) {
            this.clearVertices(this._positions);
            this._positions = values;
        }
        else if (values) {
            if (!this._positions)
                this._positions = new Float3Attributes_1.Float3Attributes(this._concatenatedBuffer);
            this._positions.set(values, offset);
        }
        else {
            this.clearVertices(this._positions);
            this._positions = new Float3Attributes_1.Float3Attributes(this._concatenatedBuffer); //positions cannot be null
        }
        this._numVertices = this._positions.count;
        if (this._autoDeriveNormals)
            this.invalidateVertices(this._normals);
        if (this._autoDeriveTangents)
            this.invalidateVertices(this._tangents);
        this.invalidateVertices(this._positions);
        this._verticesDirty[this._positions.id] = false;
    };
    TriangleElements.prototype.setNormals = function (values, offset) {
        if (offset === void 0) { offset = 0; }
        if (!this._autoDeriveNormals) {
            if (values == this._normals)
                return;
            if (values instanceof Float3Attributes_1.Float3Attributes) {
                this.clearVertices(this._normals);
                this._normals = values;
            }
            else if (values) {
                if (!this._normals)
                    this._normals = new Float3Attributes_1.Float3Attributes(this._concatenatedBuffer);
                this._normals.set(values, offset);
            }
            else if (this._normals) {
                this.clearVertices(this._normals);
                this._normals = null;
                return;
            }
        }
        else {
            this._normals = ElementsUtils_1.ElementsUtils.generateNormals(this.indices, this.faceNormals, this._normals, this._concatenatedBuffer);
        }
        this.invalidateVertices(this._normals);
        this._verticesDirty[this._normals.id] = false;
    };
    TriangleElements.prototype.setTangents = function (values, offset) {
        if (offset === void 0) { offset = 0; }
        if (!this._autoDeriveTangents) {
            if (values == this._tangents)
                return;
            if (values instanceof Float3Attributes_1.Float3Attributes) {
                this.clearVertices(this._tangents);
                this._tangents = values;
            }
            else if (values) {
                if (!this._tangents)
                    this._tangents = new Float3Attributes_1.Float3Attributes(this._concatenatedBuffer);
                this._tangents.set(values, offset);
            }
            else if (this._tangents) {
                this.clearVertices(this._tangents);
                this._tangents = null;
                return;
            }
        }
        else {
            this._tangents = ElementsUtils_1.ElementsUtils.generateTangents(this.indices, this.faceTangents, this.faceNormals, this._tangents, this._concatenatedBuffer);
        }
        this.invalidateVertices(this._tangents);
        this._verticesDirty[this._tangents.id] = false;
    };
    TriangleElements.prototype.setUVs = function (values, offset) {
        if (offset === void 0) { offset = 0; }
        if (values == this._uvs)
            return;
        if (values instanceof AttributesView_1.AttributesView) {
            this.clearVertices(this._uvs);
            this._uvs = values;
        }
        else if (values) {
            if (!this._uvs)
                this._uvs = new Float2Attributes_1.Float2Attributes(this._concatenatedBuffer);
            this._uvs.set(values, offset);
        }
        else if (this._uvs) {
            this.clearVertices(this._uvs);
            this._uvs = null;
            return;
        }
        this.invalidateVertices(this._uvs);
        this._verticesDirty[this._uvs.id] = false;
    };
    TriangleElements.prototype.setJointIndices = function (values, offset) {
        if (offset === void 0) { offset = 0; }
        if (values == this._jointIndices)
            return;
        if (values instanceof AttributesView_1.AttributesView) {
            this.clearVertices(this._jointIndices);
            this._jointIndices = values;
        }
        else if (values) {
            if (!this._jointIndices)
                this._jointIndices = new AttributesView_1.AttributesView(Float32Array, this._jointsPerVertex, this._concatenatedBuffer);
            if (this._useCondensedIndices) {
                var i = 0;
                var oldIndex;
                var newIndex = 0;
                var dic = new Object();
                this._condensedIndexLookUp = new Array();
                while (i < values.length) {
                    oldIndex = values[i];
                    // if we encounter a new index, assign it a new condensed index
                    if (dic[oldIndex] == undefined) {
                        dic[oldIndex] = newIndex;
                        this._condensedIndexLookUp[newIndex++] = oldIndex;
                    }
                    //reset value to dictionary lookup
                    values[i++] = dic[oldIndex];
                }
            }
            this._jointIndices.set(values, offset);
        }
        else if (this._jointIndices) {
            this.clearVertices(this._jointIndices);
            this._jointIndices = null;
            return;
        }
        this.invalidateVertices(this._jointIndices);
        this._verticesDirty[this._jointIndices.id] = false;
    };
    TriangleElements.prototype.setJointWeights = function (values, offset) {
        if (offset === void 0) { offset = 0; }
        if (values == this._jointWeights)
            return;
        if (values instanceof AttributesView_1.AttributesView) {
            this.clearVertices(this._jointWeights);
            this._jointWeights = values;
        }
        else if (values) {
            if (!this._jointWeights)
                this._jointWeights = new AttributesView_1.AttributesView(Float32Array, this._jointsPerVertex, this._concatenatedBuffer);
            this._jointWeights.set(values, offset);
        }
        else if (this._jointWeights) {
            this.clearVertices(this._jointWeights);
            this._jointWeights = null;
            return;
        }
        this.invalidateVertices(this._jointWeights);
        this._verticesDirty[this._jointWeights.id] = false;
    };
    /**
     *
     */
    TriangleElements.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        if (this._positions) {
            this._positions.dispose();
            this._positions = null;
        }
        if (this._normals) {
            this._normals.dispose();
            this._normals = null;
        }
        if (this._tangents) {
            this._tangents.dispose();
            this._tangents = null;
        }
        if (this._uvs) {
            this._uvs.dispose();
            this._uvs = null;
        }
        if (this._jointIndices) {
            this._jointIndices.dispose();
            this._jointIndices = null;
        }
        if (this._jointWeights) {
            this._jointWeights.dispose();
            this._jointWeights = null;
        }
        if (this._faceNormals) {
            this._faceNormals.dispose();
            this._faceNormals = null;
        }
        if (this._faceTangents) {
            this._faceTangents.dispose();
            this._faceTangents = null;
        }
    };
    TriangleElements.prototype.setIndices = function (values, offset) {
        if (offset === void 0) { offset = 0; }
        _super.prototype.setIndices.call(this, values, offset);
        this._faceNormalsDirty = true;
        this._faceTangentsDirty = true;
        if (this._autoDeriveNormals)
            this.invalidateVertices(this._normals);
        if (this._autoDeriveTangents)
            this.invalidateVertices(this._tangents);
    };
    TriangleElements.prototype.copyTo = function (elements) {
        _super.prototype.copyTo.call(this, elements);
        //temp disable auto derives
        var autoDeriveNormals = this._autoDeriveNormals;
        var autoDeriveTangents = this._autoDeriveTangents;
        elements.autoDeriveNormals = this._autoDeriveNormals = false;
        elements.autoDeriveTangents = this._autoDeriveTangents = false;
        elements.setPositions(this.positions.clone());
        if (this.normals)
            elements.setNormals(this.normals.clone());
        if (this.tangents)
            elements.setTangents(this.tangents.clone());
        if (this.uvs)
            elements.setUVs(this.uvs.clone());
        elements.jointsPerVertex = this._jointsPerVertex;
        if (this.jointIndices)
            elements.setJointIndices(this.jointIndices.clone());
        if (this.jointWeights)
            elements.setJointWeights(this.jointWeights.clone());
        //return auto derives to cloned values
        elements.autoDeriveNormals = this._autoDeriveNormals = autoDeriveNormals;
        elements.autoDeriveTangents = this._autoDeriveTangents = autoDeriveTangents;
    };
    /**
     * Clones the current object
     * @return An exact duplicate of the current object.
     */
    TriangleElements.prototype.clone = function () {
        var clone = new TriangleElements(this._concatenatedBuffer ? this._concatenatedBuffer.clone() : null);
        this.copyTo(clone);
        return clone;
    };
    TriangleElements.prototype.scaleUV = function (scaleU, scaleV, count, offset) {
        if (scaleU === void 0) { scaleU = 1; }
        if (scaleV === void 0) { scaleV = 1; }
        if (count === void 0) { count = 0; }
        if (offset === void 0) { offset = 0; }
        if (this.uvs)
            ElementsUtils_1.ElementsUtils.scale(scaleU, scaleV, 0, this.uvs, count || this._numVertices, offset);
    };
    /**
     * Scales the geometry.
     * @param scale The amount by which to scale.
     */
    TriangleElements.prototype.scale = function (scale, count, offset) {
        if (count === void 0) { count = 0; }
        if (offset === void 0) { offset = 0; }
        ElementsUtils_1.ElementsUtils.scale(scale, scale, scale, this.positions, count || this._numVertices, offset);
    };
    TriangleElements.prototype.applyTransformation = function (transform, count, offset) {
        if (count === void 0) { count = 0; }
        if (offset === void 0) { offset = 0; }
        ElementsUtils_1.ElementsUtils.applyTransformation(transform, this.positions, this.normals, this.tangents, count || this._numVertices, offset);
    };
    /**
     * Updates the tangents for each face.
     */
    TriangleElements.prototype.updateFaceTangents = function () {
        this._faceTangents = ElementsUtils_1.ElementsUtils.generateFaceTangents(this.indices, this.positions, this.uvs || this.positions, this._faceTangents, this.numElements);
        this._faceTangentsDirty = false;
    };
    /**
     * Updates the normals for each face.
     */
    TriangleElements.prototype.updateFaceNormals = function () {
        this._faceNormals = ElementsUtils_1.ElementsUtils.generateFaceNormals(this.indices, this.positions, this._faceNormals, this.numElements);
        this._faceNormalsDirty = false;
    };
    TriangleElements.prototype._iTestCollision = function (pickingCollider, material, pickingCollision, count, offset) {
        if (count === void 0) { count = 0; }
        if (offset === void 0) { offset = 0; }
        return pickingCollider.testTriangleCollision(this, material, pickingCollision, count || this._numVertices, offset);
    };
    TriangleElements.assetType = "[asset TriangleElements]";
    return TriangleElements;
}(ElementsBase_1.ElementsBase));
exports.TriangleElements = TriangleElements;
