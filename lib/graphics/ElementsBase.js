"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AttributesView_1 = require("@awayjs/core/lib/attributes/AttributesView");
var Float3Attributes_1 = require("@awayjs/core/lib/attributes/Float3Attributes");
var Short3Attributes_1 = require("@awayjs/core/lib/attributes/Short3Attributes");
var AbstractMethodError_1 = require("@awayjs/core/lib/errors/AbstractMethodError");
var AssetBase_1 = require("@awayjs/core/lib/library/AssetBase");
var ElementsEvent_1 = require("../events/ElementsEvent");
/**
 * @class away.base.TriangleElements
 */
var ElementsBase = (function (_super) {
    __extends(ElementsBase, _super);
    /**
     *
     */
    function ElementsBase(concatenatedBuffer) {
        if (concatenatedBuffer === void 0) { concatenatedBuffer = null; }
        _super.call(this);
        this._customAttributesNames = new Array();
        this._customAttributes = new Object();
        this._numElements = 0;
        this._numVertices = 0;
        this._verticesDirty = new Object();
        this._invalidateVertices = new Object();
        this._concatenatedBuffer = concatenatedBuffer;
    }
    Object.defineProperty(ElementsBase.prototype, "concatenatedBuffer", {
        get: function () {
            return this._concatenatedBuffer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElementsBase.prototype, "indices", {
        /**
         * The raw index data that define the faces.
         */
        get: function () {
            return this._indices;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     */
    ElementsBase.prototype.getCustomAtributesNames = function () {
        return this._customAttributesNames;
    };
    /**
     *
     */
    ElementsBase.prototype.getCustomAtributes = function (name) {
        return this._customAttributes[name];
    };
    Object.defineProperty(ElementsBase.prototype, "numElements", {
        /**
         * The total amount of triangles in the TriangleElements.
         */
        get: function () {
            return this._numElements;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElementsBase.prototype, "numVertices", {
        get: function () {
            return this._numVertices;
        },
        enumerable: true,
        configurable: true
    });
    ElementsBase.prototype.copyTo = function (elements) {
        if (this.indices)
            elements.setIndices(this.indices.clone());
        for (var name in this._customAttributes)
            elements.setCustomAttributes(name, this.getCustomAtributes(name).clone());
    };
    /**
     *
     */
    ElementsBase.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        if (this._indices) {
            this._indices.dispose();
            this._indices = null;
        }
        for (var name in this._customAttributes) {
            this._customAttributes[name].dispose();
            delete this._customAttributes;
        }
    };
    ElementsBase.prototype.setIndices = function (values, offset) {
        if (offset === void 0) { offset = 0; }
        if (values instanceof Short3Attributes_1.Short3Attributes) {
            if (this._indices)
                this.clearIndices();
            this._indices = values;
        }
        else if (values) {
            if (!this._indices)
                this._indices = new Short3Attributes_1.Short3Attributes();
            this._indices.set(values, offset);
        }
        else if (this._indices) {
            this._indices.dispose();
            this._indices = null;
            this.clearIndices();
        }
        if (this._indices) {
            this._numElements = this._indices.count;
            this.invalidateIndices();
        }
        else {
            this._numElements = 0;
        }
    };
    ElementsBase.prototype.setCustomAttributes = function (name, values, offset) {
        if (offset === void 0) { offset = 0; }
        if (values == this._customAttributes[name])
            return;
        if (values instanceof AttributesView_1.AttributesView) {
            this.clearVertices(this._customAttributes[name]);
            this._customAttributes[name] = values;
        }
        else if (values) {
            if (!this._customAttributes[name])
                this._customAttributes[name] = new Float3Attributes_1.Float3Attributes(this._concatenatedBuffer); //default custom atrributes is Float3
            this._customAttributes[name].set(values, offset);
        }
        else if (this._customAttributes[name]) {
            this.clearVertices(this._customAttributes[name]);
            this._customAttributesNames.splice(this._customAttributesNames.indexOf(name), 1);
            delete this._customAttributes[name];
            return;
        }
        this.invalidateVertices(this._customAttributes[name]);
        this._verticesDirty[this._customAttributes[name].id] = false;
        if (this._customAttributesNames.indexOf(name) == -1)
            this._customAttributesNames.push(name);
    };
    /**
     * Clones the current object
     * @return An exact duplicate of the current object.
     */
    ElementsBase.prototype.clone = function () {
        throw new AbstractMethodError_1.AbstractMethodError();
    };
    ElementsBase.prototype.applyTransformation = function (transform, count, offset) {
        if (count === void 0) { count = 0; }
        if (offset === void 0) { offset = 0; }
        throw new AbstractMethodError_1.AbstractMethodError();
    };
    /**
     * Scales the geometry.
     * @param scale The amount by which to scale.
     */
    ElementsBase.prototype.scale = function (scale, count, offset) {
        if (count === void 0) { count = 0; }
        if (offset === void 0) { offset = 0; }
        throw new AbstractMethodError_1.AbstractMethodError();
    };
    ElementsBase.prototype.scaleUV = function (scaleU, scaleV, count, offset) {
        if (scaleU === void 0) { scaleU = 1; }
        if (scaleV === void 0) { scaleV = 1; }
        if (count === void 0) { count = 0; }
        if (offset === void 0) { offset = 0; }
        throw new AbstractMethodError_1.AbstractMethodError();
    };
    ElementsBase.prototype.getBoxBounds = function (target, count, offset) {
        if (target === void 0) { target = null; }
        if (count === void 0) { count = 0; }
        if (offset === void 0) { offset = 0; }
        throw new AbstractMethodError_1.AbstractMethodError();
    };
    ElementsBase.prototype.getSphereBounds = function (center, target, count, offset) {
        if (target === void 0) { target = null; }
        if (count === void 0) { count = 0; }
        if (offset === void 0) { offset = 0; }
        throw new AbstractMethodError_1.AbstractMethodError();
    };
    ElementsBase.prototype.hitTestPoint = function (x, y, z, box, count, offset) {
        if (count === void 0) { count = 0; }
        if (offset === void 0) { offset = 0; }
        throw new AbstractMethodError_1.AbstractMethodError();
    };
    ElementsBase.prototype.invalidateIndices = function () {
        if (!this._invalidateIndices)
            this._invalidateIndices = new ElementsEvent_1.ElementsEvent(ElementsEvent_1.ElementsEvent.INVALIDATE_INDICES, this._indices);
        this.dispatchEvent(this._invalidateIndices);
    };
    ElementsBase.prototype.clearIndices = function () {
        this.dispatchEvent(new ElementsEvent_1.ElementsEvent(ElementsEvent_1.ElementsEvent.CLEAR_INDICES, this._indices));
    };
    ElementsBase.prototype.invalidateVertices = function (attributesView) {
        if (!attributesView || this._verticesDirty[attributesView.id])
            return;
        this._verticesDirty[attributesView.id] = true;
        if (!this._invalidateVertices[attributesView.id])
            this._invalidateVertices[attributesView.id] = new ElementsEvent_1.ElementsEvent(ElementsEvent_1.ElementsEvent.INVALIDATE_VERTICES, attributesView);
        this.dispatchEvent(this._invalidateVertices[attributesView.id]);
    };
    ElementsBase.prototype.clearVertices = function (attributesView) {
        if (!attributesView)
            return;
        attributesView.dispose();
        this.dispatchEvent(new ElementsEvent_1.ElementsEvent(ElementsEvent_1.ElementsEvent.CLEAR_VERTICES, attributesView));
        this._verticesDirty[attributesView.id] = null;
        this._invalidateVertices[attributesView.id] = null;
    };
    ElementsBase.prototype._iTestCollision = function (pickingCollider, material, pickingCollision, count, offset) {
        if (count === void 0) { count = 0; }
        if (offset === void 0) { offset = 0; }
        throw new AbstractMethodError_1.AbstractMethodError();
    };
    return ElementsBase;
}(AssetBase_1.AssetBase));
exports.ElementsBase = ElementsBase;
