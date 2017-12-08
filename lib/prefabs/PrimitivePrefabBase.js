"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core_1 = require("@awayjs/core");
var graphics_1 = require("@awayjs/graphics");
var Sprite_1 = require("../display/Sprite");
var PrefabBase_1 = require("../prefabs/PrefabBase");
/**
 * PrimitivePrefabBase is an abstract base class for polytope prefabs, which are simple pre-built geometric shapes
 */
var PrimitivePrefabBase = (function (_super) {
    __extends(PrimitivePrefabBase, _super);
    /**
     * Creates a new PrimitivePrefabBase object.
     *
     * @param material The material with which to render the object
     */
    function PrimitivePrefabBase(material, elementsType) {
        if (material === void 0) { material = null; }
        if (elementsType === void 0) { elementsType = "triangle"; }
        var _this = _super.call(this) || this;
        _this._primitiveDirty = true;
        _this._uvDirty = true;
        _this._scaleU = 1;
        _this._scaleV = 1;
        _this._material = material;
        _this._elementsType = elementsType;
        if (_this._elementsType == graphics_1.ElementsType.TRIANGLE) {
            var triangleElements = new graphics_1.TriangleElements(new core_1.AttributesBuffer());
            triangleElements.autoDeriveNormals = false;
            triangleElements.autoDeriveTangents = false;
            _this._elements = triangleElements;
        }
        else if (_this._elementsType == graphics_1.ElementsType.LINE) {
            _this._elements = new graphics_1.LineElements(new core_1.AttributesBuffer());
        }
        return _this;
    }
    Object.defineProperty(PrimitivePrefabBase.prototype, "assetType", {
        /**
         *
         */
        get: function () {
            return PrimitivePrefabBase.assetType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimitivePrefabBase.prototype, "elementsType", {
        /**
         *
         */
        get: function () {
            return this._elementsType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimitivePrefabBase.prototype, "material", {
        /**
         * The material with which to render the primitive.
         */
        get: function () {
            return this._material;
        },
        set: function (value) {
            if (value == this._material)
                return;
            this._material = value;
            var len = this._pObjects.length;
            for (var i = 0; i < len; i++)
                this._pObjects[i].material = this._material;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimitivePrefabBase.prototype, "scaleU", {
        get: function () {
            return this._scaleU;
        },
        set: function (value) {
            if (this._scaleU == value)
                return;
            this._scaleU = value;
            this._pInvalidateUVs();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimitivePrefabBase.prototype, "scaleV", {
        get: function () {
            return this._scaleV;
        },
        set: function (value) {
            if (this._scaleV == value)
                return;
            this._scaleV = value;
            this._pInvalidateUVs();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Builds the primitive's geometry when invalid. This method should not be called directly. The calling should
     * be triggered by the invalidateGraphics method (and in turn by updateGraphics).
     */
    PrimitivePrefabBase.prototype._pBuildGraphics = function (target, elementsType) {
        throw new core_1.AbstractMethodError();
    };
    /**
     * Builds the primitive's uv coordinates when invalid. This method should not be called directly. The calling
     * should be triggered by the invalidateUVs method (and in turn by updateUVs).
     */
    PrimitivePrefabBase.prototype._pBuildUVs = function (target, elementsType) {
        throw new core_1.AbstractMethodError();
    };
    /**
     * Invalidates the primitive, causing it to be updated when requested.
     */
    PrimitivePrefabBase.prototype._pInvalidatePrimitive = function () {
        this._primitiveDirty = true;
    };
    /**
     * Invalidates the primitive's uv coordinates, causing them to be updated when requested.
     */
    PrimitivePrefabBase.prototype._pInvalidateUVs = function () {
        this._uvDirty = true;
    };
    /**
     * Updates the geometry when invalid.
     */
    PrimitivePrefabBase.prototype.updateGraphics = function () {
        this._pBuildGraphics(this._elements, this._elementsType);
        this._primitiveDirty = false;
    };
    /**
     * Updates the uv coordinates when invalid.
     */
    PrimitivePrefabBase.prototype.updateUVs = function () {
        this._pBuildUVs(this._elements, this._elementsType);
        this._uvDirty = false;
    };
    PrimitivePrefabBase.prototype._iValidate = function () {
        if (this._primitiveDirty)
            this.updateGraphics();
        if (this._uvDirty)
            this.updateUVs();
    };
    PrimitivePrefabBase.prototype._pCreateObject = function () {
        var sprite = new Sprite_1.Sprite(this._material);
        sprite.graphics.addShape(graphics_1.Shape.getShape(this._elements));
        sprite._iSourcePrefab = this;
        return sprite;
    };
    return PrimitivePrefabBase;
}(PrefabBase_1.PrefabBase));
PrimitivePrefabBase.assetType = "[asset PrimitivePrefab]";
exports.PrimitivePrefabBase = PrimitivePrefabBase;
