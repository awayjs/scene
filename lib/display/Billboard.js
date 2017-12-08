"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core_1 = require("@awayjs/core");
var graphics_1 = require("@awayjs/graphics");
var BoundsType_1 = require("../bounds/BoundsType");
var DisplayObjectContainer_1 = require("./DisplayObjectContainer");
/**
 * The Billboard class represents display objects that represent bitmap images.
 * These can be images that you load with the <code>flash.Assets</code> or
 * <code>flash.display.Loader</code> classes, or they can be images that you
 * create with the <code>Billboard()</code> constructor.
 *
 * <p>The <code>Billboard()</code> constructor allows you to create a Billboard
 * object that contains a reference to a Image2D object. After you create a
 * Billboard object, use the <code>addChild()</code> or <code>addChildAt()</code>
 * method of the parent DisplayObjectContainer instance to place the bitmap on
 * the display list.</p>
 *
 * <p>A Billboard object can share its Image2D reference among several Billboard
 * objects, independent of translation or rotation properties. Because you can
 * create multiple Billboard objects that reference the same Image2D object,
 * multiple display objects can use the same complex Image2D object without
 * incurring the memory overhead of a Image2D object for each display
 * object instance.</p>
 *
 * <p>A Image2D object can be drawn to the screen by a Billboard object in one
 * of two ways: by using the default hardware renderer with a single hardware surface,
 * or by using the slower software renderer when 3D acceleration is not available.</p>
 *
 * <p>If you would prefer to perform a batch rendering command, rather than using a
 * single surface for each Billboard object, you can also draw to the screen using the
 * <code>drawTiles()</code> or <code>drawTriangles()</code> methods which are
 * available to <code>flash.display.Tilesheet</code> and <code>flash.display.Graphics
 * objects.</code></p>
 *
 * <p><b>Note:</b> The Billboard class is not a subclass of the InteractiveObject
 * class, so it cannot dispatch mouse events. However, you can use the
 * <code>addEventListener()</code> method of the display object container that
 * contains the Billboard object.</p>
 */
// todo: billboard needed to extend on DisplayObjectContainer in order for as3web/away3d adapters to compile without errors
// (in away3d Sprite3D extends on ObjectContainer3D)
var Billboard = (function (_super) {
    __extends(Billboard, _super);
    function Billboard(material, pixelSnapping, smoothing) {
        if (pixelSnapping === void 0) { pixelSnapping = "auto"; }
        if (smoothing === void 0) { smoothing = false; }
        var _this = _super.call(this) || this;
        _this._pIsEntity = true;
        _this._onInvalidateTextureDelegate = function (event) { return _this._onInvalidateTexture(event); };
        _this.material = material;
        _this._updateDimensions();
        //default bounds type
        _this._boundsType = BoundsType_1.BoundsType.AXIS_ALIGNED_BOX;
        return _this;
    }
    Object.defineProperty(Billboard.prototype, "assetType", {
        /**
         *
         */
        get: function () {
            return Billboard.assetType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Billboard.prototype, "billboardRect", {
        /**
         *
         */
        get: function () {
            return this._billboardRect;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Billboard.prototype, "billboardHeight", {
        /**
         *
         */
        get: function () {
            return this._billboardHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Billboard.prototype, "billboardWidth", {
        /**
         *
         */
        get: function () {
            return this._billboardWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Billboard.prototype, "material", {
        /**
         *
         */
        get: function () {
            return this._material;
        },
        set: function (value) {
            if (value == this._material)
                return;
            if (this._material) {
                this._material.iRemoveOwner(this);
                this._material.removeEventListener(graphics_1.MaterialEvent.INVALIDATE_TEXTURE, this._onInvalidateTextureDelegate);
            }
            this._material = value;
            if (this._material) {
                this._material.iAddOwner(this);
                this._material.addEventListener(graphics_1.MaterialEvent.INVALIDATE_TEXTURE, this._onInvalidateTextureDelegate);
            }
            this._updateDimensions();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @protected
     */
    Billboard.prototype._pUpdateBoxBounds = function () {
        _super.prototype._pUpdateBoxBounds.call(this);
        this._pBoxBounds.x = 0;
        this._pBoxBounds.y = 0;
        this._pBoxBounds.z = 0;
        this._pBoxBounds.width = this._billboardRect.width;
        this._pBoxBounds.height = this._billboardRect.height;
        this._pBoxBounds.depth = 0;
    };
    Billboard.prototype.clone = function () {
        var newInstance = new Billboard(this.material);
        this.copyTo(newInstance);
        return newInstance;
    };
    Billboard.prototype._acceptTraverser = function (traverser) {
        traverser[Billboard.traverseName](this);
    };
    Billboard.prototype._updateDimensions = function () {
        var texture = this.material.getTextureAt(0);
        var image = texture ? ((this._style ? this._style.getImageAt(texture) : null) || (this.material.style ? this.material.style.getImageAt(texture) : null) || texture.getImageAt(0)) : null;
        if (image) {
            var sampler = ((this._style ? this._style.getSamplerAt(texture) : null) || (this.material.style ? this.material.style.getSamplerAt(texture) : null) || texture.getSamplerAt(0) || graphics_1.DefaultMaterialManager.getDefaultSampler());
            if (sampler.imageRect) {
                this._billboardWidth = sampler.imageRect.width * image.width;
                this._billboardHeight = sampler.imageRect.height * image.height;
            }
            else {
                this._billboardWidth = image.rect.width;
                this._billboardHeight = image.rect.height;
            }
            this._billboardRect = sampler.frameRect || new core_1.Rectangle(0, 0, this._billboardWidth, this._billboardHeight);
        }
        else {
            this._billboardWidth = 1;
            this._billboardHeight = 1;
            this._billboardRect = new core_1.Rectangle(0, 0, 1, 1);
        }
        this._pInvalidateBounds();
        this.invalidateElements();
        if (this._width != null)
            this._setScaleX(this._width / this._billboardRect.width);
        if (this._height != null)
            this._setScaleY(this._height / this._billboardRect.height);
    };
    Billboard.prototype.invalidateElements = function () {
        this.dispatchEvent(new graphics_1.RenderableEvent(graphics_1.RenderableEvent.INVALIDATE_ELEMENTS, this));
    };
    Billboard.prototype.invalidateMaterial = function () {
        this.dispatchEvent(new graphics_1.RenderableEvent(graphics_1.RenderableEvent.INVALIDATE_MATERIAL, this));
    };
    Billboard.prototype._onInvalidateProperties = function (event) {
        if (event === void 0) { event = null; }
        this.invalidateMaterial();
        this._updateDimensions();
    };
    /**
     * @private
     */
    Billboard.prototype._onInvalidateTexture = function (event) {
        this._updateDimensions();
    };
    return Billboard;
}(DisplayObjectContainer_1.DisplayObjectContainer));
Billboard.traverseName = graphics_1.TraverserBase.addRenderableName("applyBillboard");
Billboard.assetType = "[asset Billboard]";
exports.Billboard = Billboard;
