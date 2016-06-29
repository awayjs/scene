"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Box_1 = require("@awayjs/core/lib/geom/Box");
var AssetBase_1 = require("@awayjs/core/lib/library/AssetBase");
var RenderableEvent_1 = require("../events/RenderableEvent");
var StyleEvent_1 = require("../events/StyleEvent");
/**
 * Graphic wraps a Elements as a scene graph instantiation. A Graphic is owned by a Sprite object.
 *
 *
 * @see away.base.ElementsBase
 * @see away.entities.Sprite
 *
 * @class away.base.Graphic
 */
var Graphic = (function (_super) {
    __extends(Graphic, _super);
    /**
     * Creates a new Graphic object
     */
    function Graphic(index, parent, elements, material, style, count, offset) {
        var _this = this;
        if (material === void 0) { material = null; }
        if (style === void 0) { style = null; }
        if (count === void 0) { count = 0; }
        if (offset === void 0) { offset = 0; }
        _super.call(this);
        this._iIndex = 0;
        this._boxBoundsInvalid = true;
        this._sphereBoundsInvalid = true;
        this._onInvalidatePropertiesDelegate = function (event) { return _this._onInvalidateProperties(event); };
        this._onInvalidateVerticesDelegate = function (event) { return _this._onInvalidateVertices(event); };
        this._iIndex = index;
        this.parent = parent;
        this.elements = elements;
        this.material = material;
        this.style = style;
        this.count = count;
        this.offset = offset;
    }
    Object.defineProperty(Graphic.prototype, "elements", {
        /**
         * The Elements object which provides the geometry data for this Graphic.
         */
        get: function () {
            return this._elements;
        },
        set: function (value) {
            if (this._elements == value)
                return;
            this._elements = value;
            this.invalidateElements();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Graphic.prototype, "assetType", {
        /**
         *
         */
        get: function () {
            return Graphic.assetType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Graphic.prototype, "animator", {
        /**
         *
         */
        get: function () {
            return this.parent.animator;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Graphic.prototype, "material", {
        //TODO test shader picking
        //		public get shaderPickingDetails():boolean
        //		{
        //
        //			return this.sourceEntity.shaderPickingDetails;
        //		}
        /**
         * The material used to render the current TriangleGraphic. If set to null, its parent Sprite's material will be used instead.
         */
        get: function () {
            return this._material || this.parent.material;
        },
        set: function (value) {
            if (this.material)
                this.material.iRemoveOwner(this);
            this._material = value;
            if (this.material)
                this.material.iAddOwner(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Graphic.prototype, "style", {
        /**
         * The style used to render the current TriangleGraphic. If set to null, its parent Sprite's style will be used instead.
         */
        get: function () {
            return this._style || this.parent.style;
        },
        set: function (value) {
            if (this._style == value)
                return;
            if (this._style)
                this._style.removeEventListener(StyleEvent_1.StyleEvent.INVALIDATE_PROPERTIES, this._onInvalidatePropertiesDelegate);
            this._style = value;
            if (this._style)
                this._style.addEventListener(StyleEvent_1.StyleEvent.INVALIDATE_PROPERTIES, this._onInvalidatePropertiesDelegate);
            this.invalidateSurface();
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     */
    Graphic.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.parent.removeGraphic(this);
        this.parent = null;
        Graphic._available.push(this);
    };
    Graphic.prototype.invalidate = function () {
        _super.prototype.invalidate.call(this);
        this._boxBoundsInvalid = true;
        this._sphereBoundsInvalid = true;
    };
    Graphic.prototype.invalidateElements = function () {
        this.dispatchEvent(new RenderableEvent_1.RenderableEvent(RenderableEvent_1.RenderableEvent.INVALIDATE_ELEMENTS, this));
        this._boxBoundsInvalid = true;
        this._sphereBoundsInvalid = true;
    };
    Graphic.prototype.invalidateSurface = function () {
        this.dispatchEvent(new RenderableEvent_1.RenderableEvent(RenderableEvent_1.RenderableEvent.INVALIDATE_SURFACE, this));
    };
    Graphic.prototype._iGetExplicitMaterial = function () {
        return this._material;
    };
    Graphic.prototype._iGetExplicitStyle = function () {
        return this._style;
    };
    Graphic.prototype._onInvalidateProperties = function (event) {
        this.invalidateSurface();
    };
    Graphic.prototype._onInvalidateVertices = function (event) {
        if (event.attributesView != event.target.positions)
            return;
        this.invalidate();
        this.dispatchEvent(event);
    };
    /**
     * //TODO
     *
     * @param shortestCollisionDistance
     * @param findClosest
     * @returns {boolean}
     *
     * @internal
     */
    Graphic.prototype._iTestCollision = function (pickingCollision, pickingCollider) {
        return this._elements._iTestCollision(pickingCollider, this.material, pickingCollision, this.count, this.offset);
    };
    Graphic.prototype.applyTransformation = function (transform) {
        this._elements.applyTransformation(transform, this.count, this.offset);
    };
    Graphic.prototype.hitTestPoint = function (x, y, z) {
        var box;
        //early out for box test
        if (!(box = this.getBoxBounds()).contains(x, y, z))
            return false;
        return this._elements.hitTestPoint(x, y, z, box, this.count, this.offset);
    };
    Graphic.prototype.scale = function (scale) {
        this._elements.scale(scale, this.count, this.offset);
    };
    Graphic.prototype.scaleUV = function (scaleU, scaleV) {
        if (scaleU === void 0) { scaleU = 1; }
        if (scaleV === void 0) { scaleV = 1; }
        this._elements.scaleUV(scaleU, scaleV, this.count, this.offset);
    };
    Graphic.prototype.getBoxBounds = function () {
        if (this._boxBoundsInvalid) {
            this._boxBoundsInvalid = false;
            this._boxBounds = this._elements.getBoxBounds(this._boxBounds || (this._boxBounds = new Box_1.Box()), this.count, this.offset);
        }
        return this._boxBounds;
    };
    Graphic.prototype.getSphereBounds = function (center, target) {
        if (target === void 0) { target = null; }
        return this._elements.getSphereBounds(center, target, this.count, this.offset);
    };
    Graphic._available = new Array();
    Graphic.assetType = "[asset Graphic]";
    return Graphic;
}(AssetBase_1.AssetBase));
exports.Graphic = Graphic;
