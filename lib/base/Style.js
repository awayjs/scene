"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EventDispatcher_1 = require("@awayjs/core/lib/events/EventDispatcher");
var StyleEvent_1 = require("../events/StyleEvent");
/**
 *
 */
var Style = (function (_super) {
    __extends(Style, _super);
    function Style() {
        _super.call(this);
        this._samplers = new Object();
        this._images = new Object();
        this._color = 0xFFFFFF;
    }
    Object.defineProperty(Style.prototype, "sampler", {
        get: function () {
            return this._sampler;
        },
        set: function (value) {
            if (this._sampler == value)
                return;
            this._sampler = value;
            this._invalidateProperties();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "image", {
        get: function () {
            return this._image;
        },
        set: function (value) {
            if (this._image == value)
                return;
            this._image = value;
            this._invalidateProperties();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "uvMatrix", {
        get: function () {
            return this._uvMatrix;
        },
        set: function (value) {
            if (this._uvMatrix == value)
                return;
            this._uvMatrix = value;
            this._invalidateProperties();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "color", {
        /**
         * The diffuse reflectivity color of the surface.
         */
        get: function () {
            return this._color;
        },
        set: function (value) {
            if (this._color == value)
                return;
            this._color = value;
            this._invalidateProperties();
        },
        enumerable: true,
        configurable: true
    });
    Style.prototype.getImageAt = function (texture, index) {
        if (index === void 0) { index = 0; }
        return (this._images[texture.id] ? this._images[texture.id][index] : null) || this._image;
    };
    Style.prototype.getSamplerAt = function (texture, index) {
        if (index === void 0) { index = 0; }
        return (this._samplers[texture.id] ? this._samplers[texture.id][index] : null) || this._sampler;
    };
    Style.prototype.addImageAt = function (image, texture, index) {
        if (index === void 0) { index = 0; }
        if (!this._images[texture.id])
            this._images[texture.id] = new Array();
        this._images[texture.id][index] = image;
    };
    Style.prototype.addSamplerAt = function (sampler, texture, index) {
        if (index === void 0) { index = 0; }
        if (!this._samplers[texture.id])
            this._samplers[texture.id] = new Array();
        this._samplers[texture.id][index] = sampler;
        this._invalidateProperties();
    };
    Style.prototype.removeImageAt = function (texture, index) {
        if (index === void 0) { index = 0; }
        if (!this._images[texture.id])
            return;
        this._images[texture.id][index] = null;
        this._invalidateProperties();
    };
    Style.prototype.removeSamplerAt = function (texture, index) {
        if (index === void 0) { index = 0; }
        if (!this._samplers[texture.id])
            return;
        this._samplers[texture.id][index] = null;
        this._invalidateProperties();
    };
    Style.prototype._invalidateProperties = function () {
        this.dispatchEvent(new StyleEvent_1.StyleEvent(StyleEvent_1.StyleEvent.INVALIDATE_PROPERTIES, this));
    };
    return Style;
}(EventDispatcher_1.EventDispatcher));
exports.Style = Style;
